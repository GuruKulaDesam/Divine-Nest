<script>
  import { onMount } from "svelte";
  import { getAll, addMany, table } from "../utils/dexie-db.js";

  // Type declarations for browser APIs
  let SpeechRecognition;

  // Data
  let notes = [];
  let todoLists = [];
  let newNote = "";
  let newTodoText = "";
  let activeListId = null;
  let noteColor = "#6366f1";
  let noteType = "note";
  let attachments = [];

  // Voice/text recording state
  let recognizing = false;
  let recorder; // MediaRecorder
  let recording = false;
  let recordedBlobs = [];
  let voiceNotes = []; // dataURLs of audio attachments
  let recognitionAvailable = false;
  let recognition;
  let transcriptBuffer = "";
  let search = "";
  let activeTab = "create"; // 'create', 'notes', 'checklists'
  let showVoiceModal = false;

  // small initialization: seed notes/todos if empty
  onMount(async () => {
    notes = await getAll("notes");
    // Clear all existing notes
    if (notes && notes.length > 0) {
      // Remove all notes from database
      notes = [];
    }

    todoLists = await getAll("todo");
    // Clear all existing todo lists
    if (todoLists && todoLists.length > 0) {
      // Remove all todo lists from database
      todoLists = [];
    }

    // Setup speech recognition if available
    SpeechRecognition = /** @type {any} */ (window).SpeechRecognition || /** @type {any} */ (window).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionAvailable = true;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (ev) => {
        let interim = "";
        for (let i = ev.resultIndex; i < ev.results.length; ++i) {
          const res = ev.results[i];
          const t = res[0].transcript;
          if (res.isFinal) {
            transcriptBuffer = transcriptBuffer + " " + t;
            processVoiceTextToNoteOrTodo(t.trim());
          } else {
            interim += t;
          }
        }
        if (interim) newNote = newNote + " " + interim;
      };
      recognition.onend = () => {
        if (transcriptBuffer && transcriptBuffer.trim()) {
          newNote = (newNote + " " + transcriptBuffer).trim();
          transcriptBuffer = "";
        }
        recognizing = false;
      };
      recognition.onerror = (e) => console.warn("Speech recognition error", e);
    }
  });

  function toggleRecognition() {
    if (!recognitionAvailable) {
      alert("Speech recognition not available in this browser");
      return;
    }
    try {
      if (recognizing) {
        recognition.stop();
      } else {
        transcriptBuffer = "";
        recognition.start();
      }
      recognizing = !recognizing;
    } catch (err) {
      console.warn("Recognition toggle failed", err);
      recognizing = false;
    }
  }

  // Add note, create checklist/todo groups automatically if requested
  async function addNote() {
    if (!newNote.trim() && attachments.length === 0 && voiceNotes.length === 0) return;

    const title = newNote.split("\n")[0].slice(0, 60) || "Untitled Note";
    const payload = {
      title,
      body: newNote,
      pinned: false,
      color: noteColor,
      updatedAt: new Date().toISOString(),
      type: noteType,
      attachments: [...attachments, ...voiceNotes],
    };

    // If checklist selected or autodetect finds list-like lines, add to todo store
    const lines = newNote
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const looksLikeChecklist = lines.length > 1 && lines.every((l) => /^[-*•\d]/.test(l) || l.length < 60);

    if (noteType === "checklist" || looksLikeChecklist) {
      const groupId = Date.now();
      await table("todo").add({ id: groupId, text: title || "Checklist", isGroup: true });
      for (const l of lines) {
        const text = l.replace(/^[-*•\s\d\.]+/, "").trim();
        if (text) await table("todo").add({ text, done: false, groupId });
      }
      todoLists = await getAll("todo");
      alert("✅ Checklist created!");
    } else {
      await table("notes").add(payload);
      notes = await getAll("notes");
      alert("✅ Note saved!");
    }

    // reset
    newNote = "";
    attachments = [];
    voiceNotes = [];
    noteType = "note";
  }

  async function togglePinNote(id) {
    const it = await table("notes").get(id);
    if (!it) return;
    await table("notes").update(id, { pinned: !it.pinned, updatedAt: new Date().toISOString() });
    notes = await getAll("notes");
  }

  async function deleteNote(id) {
    if (confirm("Delete this note?")) {
      await table("notes").delete(id);
      notes = await getAll("notes");
    }
  }

  function handleImageFile(e) {
    const input = /** @type {HTMLInputElement} */ (e.target);
    const f = input.files && input.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      attachments = [...attachments, String(reader.result || "")];
    };
    reader.readAsDataURL(f);
  }

  // Voice recording using MediaRecorder
  async function startRecording() {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Audio recording not supported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedBlobs = [];
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size) recordedBlobs.push(ev.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(recordedBlobs, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onload = async () => {
          const dataUrl = String(reader.result || "");
          const title = "🎵 Voice Recording " + new Date().toLocaleTimeString();
          const payload = {
            title,
            body: "[Voice recording - tap play to listen]",
            pinned: false,
            color: "#f59e0b",
            updatedAt: new Date().toISOString(),
            type: "note",
            attachments: [dataUrl],
          };
          await table("notes").add(payload);
          notes = await getAll("notes");
          recording = false;
          alert("🎵 Voice recording saved!");
        };
        reader.readAsDataURL(blob);
      };
      recorder.start();
      recording = true;
    } catch (err) {
      console.error(err);
      alert("Microphone access denied");
    }
  }

  function stopRecording() {
    if (recorder && recorder.state !== "inactive") recorder.stop();
    recording = false;
  }

  // Process recognized text to decide note vs todo list
  async function processVoiceTextToNoteOrTodo(text) {
    if (!text || !text.trim()) return;
    const t = text.trim();
    const todoKeywords = ["buy", "purchase", "get", "call", "remind", "pay", "todo", "task", "add", "need"];
    const looksLikeList = t.split(/\n|,|;| then /i).length > 1 || /\b(?:one|two|three|first|second|next)\b/i.test(t);
    const hasKeyword = todoKeywords.some((k) => new RegExp("\\b" + k + "\\b", "i").test(t));

    if (looksLikeList || hasKeyword) {
      const lines = t
        .split(/\n|,|;| then /i)
        .map((s) => s.trim())
        .filter(Boolean);
      const groupId = Date.now();
      await table("todo").add({ id: groupId, text: lines[0].slice(0, 40) || "Voice checklist", isGroup: true });
      for (const l of lines) {
        const textItem = l.replace(/^\d+\.|[-*\u2022]\s*/g, "").trim();
        if (textItem) await table("todo").add({ text: textItem, done: false, groupId });
      }
      todoLists = await getAll("todo");
      alert("✅ Voice converted to checklist!");
    } else {
      const title = t.split(/\n/)[0].slice(0, 60) || "🎤 Voice Note";
      await table("notes").add({
        title,
        body: t,
        pinned: false,
        color: "#10b981",
        updatedAt: new Date().toISOString(),
        type: "note",
        attachments: [],
      });
      notes = await getAll("notes");
      alert("✅ Voice note saved!");
    }
  }

  function playAttachment(dataUrl) {
    const a = new Audio(dataUrl);
    a.play();
  }

  // toggle checklist/todo done
  async function toggleTodo(id) {
    const it = await table("todo").get(id);
    if (!it) return;
    await table("todo").update(id, { done: !it.done });
    todoLists = await getAll("todo");
  }

  async function addTodoToActive() {
    if (!newTodoText.trim() || !activeListId) return;
    await table("todo").add({ text: newTodoText, done: false, groupId: activeListId });
    todoLists = await getAll("todo");
    newTodoText = "";
  }

  async function deleteChecklist(groupId) {
    if (confirm("Delete this entire checklist?")) {
      await table("todo").where("groupId").equals(groupId).delete();
      await table("todo").delete(groupId);
      todoLists = await getAll("todo");
    }
  }

  function groupedTodos() {
    const map = new Map();
    todoLists.forEach((item) => {
      if (item.isGroup) map.set(item.id, { group: item, items: [] });
    });
    todoLists.forEach((item) => {
      if (item.groupId && map.has(item.groupId)) map.get(item.groupId).items.push(item);
    });
    return Array.from(map.values());
  }

  function filteredNotes() {
    return notes
      .filter((n) => {
        const matchesSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }
</script>

<div class="notes-app min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-5xl font-bold text-white mb-2 drop-shadow-lg">📝 My Notes</h1>
      <p class="text-white/80 text-lg">Create, organize, and remember everything important</p>
    </div>

    <!-- Tab Navigation -->
    <div class="flex justify-center mb-8">
      <div class="bg-white/20 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/30">
        <div class="flex space-x-2">
          <button class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeTab === 'create' ? 'bg-white text-purple-600 shadow-lg' : 'text-white hover:bg-white/20'}" on:click={() => (activeTab = "create")}> ✨ Create </button>
          <button class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeTab === 'notes' ? 'bg-white text-purple-600 shadow-lg' : 'text-white hover:bg-white/20'}" on:click={() => (activeTab = "notes")}>
            📚 My Notes ({notes.length})
          </button>
          <button class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeTab === 'checklists' ? 'bg-white text-purple-600 shadow-lg' : 'text-white hover:bg-white/20'}" on:click={() => (activeTab = "checklists")}>
            ✅ Checklists ({groupedTodos().length})
          </button>
        </div>
      </div>
    </div>

    <!-- Create Tab -->
    {#if activeTab === "create"}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Voice Input Section -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4 text-blue-400 animate-pulse">🎤</div>
            <h2 class="text-2xl font-bold text-white mb-2">Voice Notes</h2>
            <p class="text-white/80">Speak your thoughts or record audio</p>
          </div>

          <div class="space-y-4">
            <div class="flex justify-center gap-4">
              <button class="btn btn-circle btn-lg {recognizing ? 'btn-error' : 'btn-success'} shadow-lg" on:click={toggleRecognition} disabled={!recognitionAvailable}>
                {#if recognizing}
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd"></path>
                  </svg>
                {:else}
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path>
                  </svg>
                {/if}
              </button>
              <button class="btn btn-circle btn-lg btn-warning shadow-lg" on:click={() => (recording ? stopRecording() : startRecording())}>
                {#if recording}
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd"></path>
                  </svg>
                {:else}
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 00-1-1H4zM14 3a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 00-1-1h-1z"></path>
                  </svg>
                {/if}
              </button>
            </div>

            {#if recognizing}
              <div class="alert alert-success shadow-lg">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>Listening... Speak now!</span>
              </div>
            {/if}

            {#if recording}
              <div class="alert alert-warning shadow-lg">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span>Recording audio...</span>
              </div>
            {/if}

            <div class="text-center text-white/60 text-sm">Voice notes are automatically saved as you speak!</div>
          </div>
        </div>

        <!-- Note Editor Section -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">✍️</div>
            <h2 class="text-2xl font-bold text-white mb-2">Write a Note</h2>
            <p class="text-white/80">Type your thoughts or paste content</p>
          </div>

          <div class="space-y-4">
            <div class="flex gap-2 justify-center">
              <input type="radio" name="noteType" value="note" bind:group={noteType} class="radio radio-primary" id="note-radio" />
              <label for="note-radio" class="text-white font-medium">Note</label>
              <input type="radio" name="noteType" value="checklist" bind:group={noteType} class="radio radio-primary ml-4" id="checklist-radio" />
              <label for="checklist-radio" class="text-white font-medium">Checklist</label>
            </div>

            <div class="flex items-center gap-4">
              <label for="color-input" class="text-white font-medium">Color:</label>
              <input type="color" bind:value={noteColor} class="w-12 h-10 rounded-lg border-2 border-white/30" id="color-input" />
            </div>

            <textarea class="textarea textarea-bordered w-full h-40 resize-none bg-white/20 text-white placeholder-white/50 border-white/30" placeholder="Start writing your note... Use - or numbers for checklists" bind:value={newNote}></textarea>

            <div class="flex flex-wrap gap-2 justify-center">
              <label class="btn btn-outline btn-sm text-white border-white/50 hover:bg-white/20">
                <input type="file" accept="image/*" on:change={handleImageFile} class="hidden" />
                <span class="text-green-400">📷</span> Add Image
              </label>
            </div>

            {#if attachments.length > 0}
              <div class="flex flex-wrap gap-2 justify-center">
                {#each attachments as a, i}
                  <button class="relative group" on:click={() => attachments.splice(i, 1)} aria-label="Remove attachment">
                    <img src={a} alt="attachment" class="w-16 h-16 object-cover rounded-lg border-2 border-white/30" />
                    <div class="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center text-white font-bold">×</div>
                  </button>
                {/each}
              </div>
            {/if}

            <div class="text-center">
              <button class="btn btn-primary btn-lg px-8 shadow-lg" on:click={addNote} disabled={!newNote.trim() && attachments.length === 0}> ✨ Save Note </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Notes Tab -->
    {#if activeTab === "notes"}
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold text-white">📚 My Notes</h2>
          <div class="flex items-center gap-4">
            <input class="input input-bordered bg-white/20 text-white placeholder-white/50 border-white/30" placeholder="🔍 Search notes..." bind:value={search} />
          </div>
        </div>

        {#if filteredNotes().length === 0}
          <div class="text-center py-16">
            <div class="text-8xl mb-6">📝</div>
            <h3 class="text-2xl font-bold text-white mb-4">No notes yet!</h3>
            <p class="text-white/80 mb-6">Create your first note using the Create tab above</p>
            <button class="btn btn-primary btn-lg" on:click={() => (activeTab = "create")}> ✨ Create Your First Note </button>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each filteredNotes() as note}
              <div class="card bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style="background-color: {note.color}20; border-color: {note.color}40;">
                <div class="card-body p-6">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="card-title text-lg font-bold text-white line-clamp-2">{note.title}</h3>
                    <div class="dropdown dropdown-end">
                      <button class="btn btn-ghost btn-sm text-white/80 hover:text-white" aria-label="Note options menu">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                      </button>
                      <ul class="dropdown-content menu p-2 shadow bg-white/90 backdrop-blur rounded-box w-48">
                        <li>
                          <button on:click={() => togglePinNote(note.id)} class="text-gray-700 w-full text-left">
                            {#if note.pinned}<span class="text-yellow-400">📌</span> Unpin{:else}<span class="text-blue-400">📌</span> Pin{/if}
                          </button>
                        </li>
                        <li><button on:click={() => deleteNote(note.id)} class="text-red-600 w-full text-left"><span class="text-red-500">🗑️</span> Delete</button></li>
                      </ul>
                    </div>
                  </div>

                  <div class="text-white/90 text-sm line-clamp-4 mb-4 whitespace-pre-wrap">
                    {note.body}
                  </div>

                  {#if note.attachments && note.attachments.length > 0}
                    <div class="flex flex-wrap gap-2 mb-4">
                      {#each note.attachments as a}
                        {#if a.startsWith("data:audio")}
                          <button class="btn btn-circle btn-sm bg-white/20 hover:bg-white/30 border-white/30" on:click={() => playAttachment(a)} aria-label="Play audio attachment">
                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"></path>
                            </svg>
                          </button>
                        {:else}
                          <img src={a} alt="attachment" class="w-12 h-12 object-cover rounded-lg border-2 border-white/30" />
                        {/if}
                      {/each}
                    </div>
                  {/if}

                  <div class="flex justify-between items-center text-xs text-white/60">
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    {#if note.pinned}
                      <span class="text-yellow-400 drop-shadow-lg">📌</span>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Checklists Tab -->
    {#if activeTab === "checklists"}
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold text-white">✅ My Checklists</h2>
          <button class="btn btn-primary" on:click={() => (activeTab = "create")}> ➕ New Checklist </button>
        </div>

        {#if groupedTodos().length === 0}
          <div class="text-center py-16">
            <div class="text-8xl mb-6">📋</div>
            <h3 class="text-2xl font-bold text-white mb-4">No checklists yet!</h3>
            <p class="text-white/80 mb-6">Create checklists by selecting "Checklist" in the Create tab</p>
            <button class="btn btn-primary btn-lg" on:click={() => (activeTab = "create")}> ✨ Create Your First Checklist </button>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each groupedTodos() as group}
              <div class="card bg-white/15 backdrop-blur-sm border border-white/30 shadow-xl">
                <div class="card-body p-6">
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="card-title text-xl font-bold text-white">{group.group.text}</h3>
                    <button class="btn btn-ghost btn-sm text-white/60 hover:text-red-300" on:click={() => deleteChecklist(group.group.id)}> <span class="text-red-400">🗑️</span> </button>
                  </div>

                  <div class="space-y-3 mb-4">
                    {#each group.items as item}
                      <label class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={item.done} on:change={() => toggleTodo(item.id)} class="checkbox checkbox-primary checkbox-lg" />
                        <span class="text-white {item.done ? 'line-through text-white/50' : ''}">
                          {item.text}
                        </span>
                      </label>
                    {/each}
                  </div>

                  <div class="flex items-center justify-between text-sm text-white/80 mb-4">
                    <span>{group.items.filter((i) => i.done).length} / {group.items.length} completed</span>
                    <div class="w-24 bg-white/20 rounded-full h-2">
                      <div class="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300" style="width: {group.items.length > 0 ? (group.items.filter((i) => i.done).length / group.items.length) * 100 : 0}%"></div>
                    </div>
                  </div>

                  <div class="flex gap-2">
                    <input class="input input-bordered input-sm flex-1 bg-white/20 text-white placeholder-white/50 border-white/30" placeholder="Add new item..." bind:value={newTodoText} on:focus={() => (activeListId = group.group.id)} on:keydown={(e) => e.key === "Enter" && addTodoToActive()} />
                    <button
                      class="btn btn-primary btn-sm"
                      on:click={() => {
                        activeListId = group.group.id;
                        addTodoToActive();
                      }}
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .notes-app {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .line-clamp-4 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
  }

  /* Glassmorphism effects */
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
</style>
