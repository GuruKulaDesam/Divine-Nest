<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import NoteCardSimple from "$lib/components/NoteCardSimple.svelte";
  import ReminderListSimple from "$lib/components/ReminderListSimple.svelte";
  import EventCalendarSimple from "$lib/components/EventCalendarSimple.svelte";
  import RecordingPanelSimple from "$lib/components/RecordingPanelSimple.svelte";
  import ShivoHUDSimple from "$lib/components/ShivoHUDSimple.svelte";
  import { startSpeechCapture, stopSpeechCapture } from "$lib/voice/speechCapture";
  import { todos, todoActions } from "$lib/stores/todos";
  import { notes, noteActions } from "$lib/stores/notes";
  import { reminders, reminderActions } from "$lib/stores/reminders";
  import { events, eventActions } from "$lib/stores/events";
  import { recordings, recordingActions } from "$lib/stores/recordings";

  let isListening = false;
  let currentTranscript = "";
  let currentEmotion = "neutral";
  let activeTab = "overview";
  let isAwake = false; // AI starts asleep
  let wakeWords = ["சிவோ", "shivo", "hey shivo", "ai", "assistant"]; // Wake words
  let aiVoice = "female"; // Can be "male", "female", or "neutral"

  // Voice command processing
  function processVoiceCommand(text: string) {
    const lowerText = text.toLowerCase().trim();

    // Check for wake words first
    if (!isAwake) {
      const isWakeWord = wakeWords.some((word) => lowerText.includes(word.toLowerCase()));
      if (isWakeWord) {
        isAwake = true;
        speakResponse("வணக்கம்! நான் உங்கள் குடும்ப உதவியாளர். என்ன உதவி வேண்டும்?");
        return;
      } else {
        // Ignore commands when asleep
        return;
      }
    }

    // Process commands only when awake
    // Todo commands
    if (lowerText.includes("add todo") || lowerText.includes("பட்டியல் சேர்")) {
      const todoText = text.replace(/add todo|பட்டியல் சேர்/gi, "").trim();
      if (todoText) {
        todoActions.add({
          title: todoText,
          category: "custom",
          completed: false,
          voiceCreated: true,
        });
        speakResponse(`பட்டியலில் சேர்த்துவிட்டேன்: ${todoText}`);
      }
    }
    // Note commands
    else if (lowerText.includes("note") || lowerText.includes("குறிப்பு")) {
      const noteText = text.replace(/note|குறிப்பு/gi, "").trim();
      if (noteText) {
        noteActions.add({
          content: noteText,
          emotionTag: currentEmotion as "joy" | "stress" | "gratitude" | "neutral",
          voiceCreated: true,
        });
        speakResponse(`குறிப்பு எடுத்துக்கொண்டேன்: ${noteText}`);
      }
    }
    // Reminder commands
    else if (lowerText.includes("remind") || lowerText.includes("நினைவூட்டு")) {
      const reminderText = text.replace(/remind|நினைவூட்டு/gi, "").trim();
      if (reminderText) {
        reminderActions.add({
          message: reminderText,
          time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
          repeat: "none",
          completed: false,
          voiceCreated: true,
        });
        speakResponse(`நினைவூட்டலை அமைத்துவிட்டேன்: ${reminderText}`);
      }
    }
    // Event commands
    else if (lowerText.includes("event") || lowerText.includes("நிகழ்வு")) {
      const eventText = text.replace(/event|நிகழ்வு/gi, "").trim();
      if (eventText) {
        eventActions.add({
          title: eventText,
          date: new Date().toISOString().split("T")[0],
          category: "custom",
          voiceCreated: true,
        });
        speakResponse(`நிகழ்வை சேர்த்துவிட்டேன்: ${eventText}`);
      }
    }
    // Recording commands
    else if (lowerText.includes("record") || lowerText.includes("பதிவு செய்")) {
      startRecording();
      speakResponse("பதிவு செய்யத் தொடங்கினேன்");
    }
    // Status/emotion commands
    else if (lowerText.includes("happy") || lowerText.includes("மகிழ்ச்சி")) {
      currentEmotion = "joy";
      speakResponse("நீங்கள் மகிழ்ச்சியாக இருப்பது நல்லது!");
    } else if (lowerText.includes("stressed") || lowerText.includes("மன அழுத்தம்")) {
      currentEmotion = "stress";
      speakResponse("ஒரு நிமிடம் ஓய்வெடுங்கள். நான் உதவுகிறேன்.");
    } else if (lowerText.includes("sleep") || lowerText.includes("தூங்கு") || lowerText.includes("goodbye") || lowerText.includes("bye")) {
      isAwake = false;
      speakResponse("சரி, நான் தூங்குகிறேன். தேவைப்பட்டால் 'சிவோ' என்று கூப்பிடுங்கள்.");
    } else if (lowerText.includes("status") || lowerText.includes("நிலை")) {
      speakResponse(`நான் ${currentEmotion} உணர்வில் இருக்கிறேன். ${$todos.filter((t) => !t.completed).length} பட்டியல்கள், ${$notes.length} குறிப்புகள், ${$reminders.filter((r) => !r.completed).length} நினைவூட்டல்கள் உள்ளன.`);
    } else {
      // General conversation - only respond helpfully
      speakResponse("என்ன உதவி வேண்டும்? பட்டியல், குறிப்பு, நினைவூட்டல் அல்லது நிகழ்வு சேர்க்கலாம்.");
    }
  }

  function startRecording() {
    // Start voice recording - this would be implemented with actual recording logic
    speakResponse("பதிவு தொடங்கியது. முடிந்ததும் 'பதிவு நிறுத்து' என்று சொல்லுங்கள்.");
  }

  function speakResponse(text: string) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice based on aiVoice setting
      if (aiVoice === "female") {
        utterance.lang = "ta-IN"; // Tamil female voice
        // Try to find a female voice
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find((voice) => voice.lang.includes("ta") && (voice.name.toLowerCase().includes("female") || voice.name.toLowerCase().includes("woman")));
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
      } else if (aiVoice === "male") {
        utterance.lang = "ta-IN"; // Tamil male voice
        const voices = speechSynthesis.getVoices();
        const maleVoice = voices.find((voice) => voice.lang.includes("ta") && (voice.name.toLowerCase().includes("male") || voice.name.toLowerCase().includes("man")));
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
      } else {
        utterance.lang = "ta-IN"; // Default Tamil
      }

      speechSynthesis.speak(utterance);
    }
  }

  function startListening() {
    if (isListening) return;

    isListening = true;
    currentTranscript = "";

    startSpeechCapture({
      lang: "ta-IN",
      onResult: (text) => {
        currentTranscript = text;
        processVoiceCommand(text);
      },
      onError: (error) => {
        console.error("Speech recognition error:", error);
        isListening = false;
      },
      onEnd: () => {
        isListening = false;
      },
    });
  }

  function stopListening() {
    stopSpeechCapture();
    isListening = false;
  }

  onMount(() => {
    // AI starts asleep - only wakes up on wake word
    // No auto-greeting to avoid unnecessary talking
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
  <!-- Header -->
  <div class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <Icon icon="heroicons:sparkles" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
              🧠 சிவோ AI உதவியாளர்
              <span class="text-sm px-2 py-1 rounded-full {isAwake ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}">
                {isAwake ? "எழுந்திருக்கிறது" : "தூங்குகிறது"}
              </span>
            </h1>
            <p class="text-sm text-gray-600">
              {isAwake ? "குரல் கட்டளைகளால் பட்டியல், குறிப்பு, நினைவூட்டல் மற்றும் நிகழ்வுகளை நிர்வகிக்கலாம்" : "'சிவோ' என்று கூப்பிட்டு என்னை எழுப்புங்கள்"}
            </p>
          </div>
        </div>

        <button on:click={isListening ? stopListening : startListening} class="flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all {isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-500 text-white hover:bg-orange-600'}">
          <Icon icon="heroicons:microphone" class="w-5 h-5" />
          {isListening ? "கேட்கிறது..." : "குரல் கட்டளை"}
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Tab Navigation -->
    <div class="flex gap-2 mb-8 overflow-x-auto">
      {#each [{ id: "overview", label: "மேலோட்டம்", icon: "heroicons:home" }, { id: "todos", label: "பட்டியல்", icon: "heroicons:check-circle" }, { id: "notes", label: "குறிப்புகள்", icon: "heroicons:chat-bubble-left" }, { id: "reminders", label: "நினைவூட்டல்கள்", icon: "heroicons:clock" }, { id: "events", label: "நிகழ்வுகள்", icon: "heroicons:calendar" }, { id: "recordings", label: "பதிவுகள்", icon: "heroicons:microphone" }] as tab}
        <button on:click={() => (activeTab = tab.id)} class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors {activeTab === tab.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}">
          <Icon icon={tab.icon} class="w-4 h-4" />
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- Tab Content -->
    {#if activeTab === "overview"}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Quick Stats -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center gap-3 mb-4">
            <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-500" />
            <h3 class="text-lg font-semibold">பட்டியல்</h3>
          </div>
          <p class="text-3xl font-bold text-gray-800">{$todos.filter((t) => !t.completed).length}</p>
          <p class="text-sm text-gray-600">நிறைவேறாத பணிகள்</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center gap-3 mb-4">
            <Icon icon="heroicons:chat-bubble-left" class="w-8 h-8 text-blue-500" />
            <h3 class="text-lg font-semibold">குறிப்புகள்</h3>
          </div>
          <p class="text-3xl font-bold text-gray-800">{$notes.length}</p>
          <p class="text-sm text-gray-600">இன்றைய குறிப்புகள்</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center gap-3 mb-4">
            <Icon icon="heroicons:clock" class="w-8 h-8 text-purple-500" />
            <h3 class="text-lg font-semibold">நினைவூட்டல்கள்</h3>
          </div>
          <p class="text-3xl font-bold text-gray-800">{$reminders.filter((r) => !r.completed).length}</p>
          <p class="text-sm text-gray-600">செயலில் உள்ளவை</p>
        </div>

        <!-- Voice Commands Guide -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
          <h3 class="text-lg font-semibold mb-4">🎙️ குரல் கட்டளைகள்</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <p class="font-medium text-gray-800">பட்டியல்:</p>
              <p class="text-sm text-gray-600">"பட்டியல் சேர் வீடு சுத்தம் செய்"</p>
              <p class="text-sm text-gray-600">"add todo buy groceries"</p>
            </div>
            <div class="space-y-2">
              <p class="font-medium text-gray-800">குறிப்புகள்:</p>
              <p class="text-sm text-gray-600">"குறிப்பு இன்று மழை வரும்"</p>
              <p class="text-sm text-gray-600">"note meeting at 3pm"</p>
            </div>
            <div class="space-y-2">
              <p class="font-medium text-gray-800">நினைவூட்டல்கள்:</p>
              <p class="text-sm text-gray-600">"நினைவூட்டு மருந்து குடி"</p>
              <p class="text-sm text-gray-600">"remind doctor appointment"</p>
            </div>
            <div class="space-y-2">
              <p class="font-medium text-gray-800">உணர்வுகள்:</p>
              <p class="text-sm text-gray-600">"நான் மகிழ்ச்சியாக இருக்கிறேன்"</p>
              <p class="text-sm text-gray-600">"I'm stressed"</p>
            </div>
          </div>
        </div>
      </div>
    {:else if activeTab === "todos"}
      <TodoList />
    {:else if activeTab === "notes"}
      <div class="space-y-4">
        {#each $notes.slice(0, 10) as note}
          <NoteCardSimple {note} />
        {/each}
        {#if $notes.length === 0}
          <p class="text-center text-gray-500 py-8">இன்னும் குறிப்புகள் இல்லை. குரல் கட்டளையால் சேர்க்கலாம்!</p>
        {/if}
      </div>
    {:else if activeTab === "reminders"}
      <ReminderListSimple reminders={$reminders} />
    {:else if activeTab === "events"}
      <EventCalendarSimple events={$events} />
    {:else if activeTab === "recordings"}
      <RecordingPanelSimple recordings={$recordings} />
    {/if}
  </div>

  <!-- Shivo HUD Overlay -->
  <ShivoHUDSimple transcript={currentTranscript} emotion={currentEmotion} />
</div>
