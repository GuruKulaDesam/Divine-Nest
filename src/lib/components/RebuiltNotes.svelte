<script>
  import { onMount } from "svelte";
  import { getAll, addMany, table } from "../utils/dexie-db.js";

  let notes = [];
  let composing = "";
  let isRecording = false;
  let recordingTime = 0;
  let recordingInterval;
  let recognition;
  let transcript = "";
  let searchQuery = "";
  let selectedColor = "#6366f1";

  const noteColors = [
    { name: "Blue", value: "#6366f1" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Pink", value: "#ec4899" },
    { name: "Teal", value: "#14b8a6" }
  ];

  onMount(async () => {
    notes = await getAll("notes");
    if (!notes || notes.length === 0) {
      const sample = Array.from({ length: 20 }, (_, i) => ({
        title: `Note ${i + 1}`,
        body: `This is sample note ${i + 1} with some content to demonstrate the modern UI layout.`,
        pinned: Math.random() > 0.8,
        color: noteColors[i % noteColors.length].value,
        updatedAt: new Date().toISOString()
      }));
      await addMany("notes", sample);
      notes = await getAll("notes");
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = /** @type {any} */(window).SpeechRecognition || /** @type {any} */(window).webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          transcript = finalTranscript;
          composing += (composing ? ' ' : '') + finalTranscript;
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecording();
      };
    }
  });

  async function add() {
    if (!composing.trim()) return;
    await table("notes").add({
      title: composing.split("\n")[0].slice(0, 50),
      body: composing,
      pinned: false,
      color: selectedColor,
      updatedAt: new Date().toISOString()
    });
    notes = await getAll("notes");
    composing = "";
    transcript = "";
  }

  async function remove(id) {
    await table("notes").delete(id);
    notes = await getAll("notes");
  }

  async function togglePin(id) {
    const it = await table("notes").get(id);
    if (!it) return;
    await table("notes").update(id, { pinned: !it.pinned, updatedAt: new Date().toISOString() });
    notes = await getAll("notes");
  }

  function startRecording() {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    isRecording = true;
    recordingTime = 0;
    transcript = "";
    composing = composing || "";

    recognition.start();

    recordingInterval = setInterval(() => {
      recordingTime++;
    }, 1000);
  }

  function stopRecording() {
    if (recognition) {
      recognition.stop();
    }
    isRecording = false;
    clearInterval(recordingInterval);
  }

  function clearRecording() {
    stopRecording();
    transcript = "";
  }

  function getFilteredNotes() {
    let filtered = notes;
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  $: filteredNotes = getFilteredNotes();
</script>

<div class="modern-notes-container min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
  <!-- Header Section -->
  <div class="max-w-7xl mx-auto mb-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
        🎙️ Voice Notes
      </h1>
      <p class="text-slate-600 text-lg">Capture your thoughts with voice or text</p>
    </div>

    <!-- Search Bar -->
    <div class="flex justify-center mb-6">
      <div class="relative w-full max-w-md">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search notes..."
          class="w-full pl-12 pr-4 py-3 rounded-full border-2 border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white shadow-lg"
        />
        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
          🔍
        </div>
      </div>
    </div>
  </div>

  <!-- Voice Recording Section - Horizontal Layout -->
  <div class="max-w-4xl mx-auto mb-12">
    <div class="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
      <div class="flex flex-col lg:flex-row items-center gap-6">
        <!-- Voice Recording Controls -->
        <div class="flex-1 w-full lg:w-auto">
          <div class="text-center lg:text-left mb-4">
            <h3 class="text-xl font-semibold text-slate-800 mb-2">Voice Recording</h3>
            <p class="text-slate-600">Speak your thoughts naturally</p>
          </div>

          <div class="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <button
              class="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 {isRecording ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-200'} shadow-lg"
              on:click={isRecording ? stopRecording : startRecording}
            >
              <div class="flex items-center gap-3">
                <div class="text-2xl">
                  {#if isRecording}
                    ⏹️
                  {:else}
                    🎤
                  {/if}
                </div>
                <span class="text-lg">
                  {#if isRecording}
                    Stop Recording ({recordingTime}s)
                  {:else}
                    Start Recording
                  {/if}
                </span>
              </div>

              <!-- Recording Animation -->
              {#if isRecording}
                <div class="absolute inset-0 bg-red-400 opacity-20 animate-pulse"></div>
                <div class="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur opacity-25 animate-pulse"></div>
              {/if}
            </button>

            {#if transcript}
              <button
                class="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200"
                on:click={clearRecording}
              >
                🗑️ Clear
              </button>
            {/if}
          </div>

          <!-- Transcript Display -->
          {#if transcript}
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-blue-600 font-medium">🎯 Transcript:</span>
                <span class="text-sm text-blue-500">Real-time speech to text</span>
              </div>
              <p class="text-slate-700 italic">"{transcript}"</p>
            </div>
          {/if}
        </div>

        <!-- Text Input Section -->
        <div class="flex-1 w-full lg:w-auto">
          <div class="text-center lg:text-left mb-4">
            <h3 class="text-xl font-semibold text-slate-800 mb-2">Text Input</h3>
            <p class="text-slate-600">Or type your note manually</p>
          </div>

          <textarea
            bind:value={composing}
            placeholder="Start typing or use voice recording above..."
            class="w-full h-32 p-4 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none bg-slate-50"
            disabled={isRecording}
          ></textarea>

          <!-- Color Picker -->
          <div class="flex items-center gap-3 mt-4">
            <span class="text-sm font-medium text-slate-600">Color:</span>
            <div class="flex gap-2">
              {#each noteColors as color}
                <button
                  class="w-8 h-8 rounded-full border-4 transition-all duration-200 transform hover:scale-110 {selectedColor === color.value ? 'border-slate-400 shadow-lg' : 'border-white shadow-md'}"
                  style="background-color: {color.value}"
                  on:click={() => selectedColor = color.value}
                  aria-label="Select {color.name} color for note"
                  title="{color.name}"
                ></button>
              {/each}
            </div>
          </div>

          <!-- Add Button -->
          <div class="flex justify-center lg:justify-end mt-4">
            <button
              class="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              on:click={add}
              disabled={!composing.trim() || isRecording}
            >
              ➕ Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Notes Grid - 2 Columns -->
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each filteredNotes as note (note.id)}
        <div
          class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 overflow-hidden"
          style="border-left: 4px solid {note.color}"
        >
          <!-- Note Header -->
          <div class="p-6 pb-3">
            <div class="flex items-start justify-between mb-3">
              <h4 class="font-bold text-lg text-slate-800 line-clamp-1 pr-2">
                {note.title}
              </h4>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  class="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
                  on:click={() => togglePin(note.id)}
                  title={note.pinned ? "Unpin note" : "Pin note"}
                >
                  {#if note.pinned}
                    📌
                  {:else}
                    📍
                  {/if}
                </button>
                <button
                  class="p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                  on:click={() => remove(note.id)}
                  title="Delete note"
                >
                  🗑️
                </button>
              </div>
            </div>

            <!-- Note Content -->
            <div class="text-slate-600 leading-relaxed mb-4 line-clamp-3">
              {note.body}
            </div>

            <!-- Note Footer -->
            <div class="flex items-center justify-between text-sm text-slate-500">
              <div class="flex items-center gap-4">
                {#if note.pinned}
                  <span class="flex items-center gap-1 text-amber-600 font-medium">
                    📌 Pinned
                  </span>
                {/if}
                <span class="flex items-center gap-1">
                  📅 {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div
                class="w-4 h-4 rounded-full shadow-sm"
                style="background-color: {note.color}"
                title="Note color"
              ></div>
            </div>
          </div>

          <!-- Color Accent Bar -->
          <div
            class="h-1 w-full opacity-80"
            style="background-color: {note.color}"
          ></div>
        </div>
      {/each}
    </div>

    <!-- Empty State -->
    {#if filteredNotes.length === 0}
      <div class="text-center py-16">
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-2xl font-semibold text-slate-600 mb-2">
          {searchQuery ? 'No notes found' : 'No notes yet'}
        </h3>
        <p class="text-slate-500 mb-6">
          {searchQuery ? 'Try adjusting your search terms' : 'Start by recording your first voice note or typing one manually'}
        </p>
        {#if !searchQuery}
          <button
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            on:click={startRecording}
          >
            🎤 Create Your First Note
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  /* Modern gradient backgrounds and animations */
  .modern-notes-container {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%);
    min-height: 100vh;
  }

  /* Custom scrollbar */
  .modern-notes-container ::-webkit-scrollbar {
    width: 8px;
  }

  .modern-notes-container ::-webkit-scrollbar-track {
    background: rgba(148, 163, 184, 0.1);
    border-radius: 10px;
  }

  .modern-notes-container ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 10px;
  }

  .modern-notes-container ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
  }

  /* Line clamp utilities */
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .modern-notes-container {
      padding: 1rem;
    }
  }

  @media (max-width: 640px) {
    .modern-notes-container h1 {
      font-size: 2.5rem;
    }
  }

  /* Focus states for accessibility */
  input:focus,
  textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  /* Button hover states */
  button:hover {
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0);
  }
</style>