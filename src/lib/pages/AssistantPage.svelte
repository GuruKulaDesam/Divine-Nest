<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _, isLoading } from "svelte-i18n";
  import { motionInView, staggerAnimate } from "../utils/motion.js";

  // Voice recognition state
  let isListening = false;
  let currentTranscript = "";
  let voiceLogs = [];
  let tasks = [];
  let events = [];

  // Tamil labels
  const taLabels = {
    voiceLog: "குரல் பதிவு",
    taskBoard: "பட்டியல்",
    eventFeed: "நிகழ்வுகள்",
    moodHappy: "😊 மகிழ்ச்சி",
    moodNeutral: "😐 சாதாரணம்",
    moodStressed: "😟 மன அழுத்தம்",
    startListening: "🎙️ கேட்கத் தொடங்கு",
    stopListening: "⏹️ நிறுத்து",
    voiceAssistant: "குரல் உதவியாளர்",
    ambientMode: "சுற்றுச்சூழல் முறை",
  };

  // Voice recognition functions
  function startVoiceRecognition() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "ta-IN"; // Tamil language
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isListening = true;
        currentTranscript = "கேட்கிறது...";
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        currentTranscript = transcript;
        parseTamilIntent(transcript);
      };

      recognition.onend = () => {
        isListening = false;
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        isListening = false;
        currentTranscript = "பிழை ஏற்பட்டது";
      };

      recognition.start();
    } else {
      alert("உங்கள் உலாவி குரல் அங்கீகாரத்தை ஆதரிக்கவில்லை");
    }
  }

  function stopVoiceRecognition() {
    isListening = false;
    // Implementation would stop the recognition
  }

  // Tamil intent parser
  function parseTamilIntent(text) {
    const timestamp = new Date().toLocaleString();

    // Create voice log
    const voiceLog = {
      text: text,
      timestamp: timestamp,
      emotion: detectEmotion(text),
      source: "User",
      language: text.includes("க") ? "ta" : "en",
    };
    voiceLogs = [voiceLog, ...voiceLogs];

    // Parse intents
    if (text.includes("பட்டியல்") || text.includes("list") || text.includes("task")) {
      createTask(text);
    }
    if (text.includes("குறிப்பு") || text.includes("note")) {
      createNote(text);
    }
    if (text.includes("பாடல்") || text.includes("song") || text.includes("play")) {
      startPlaylist(text);
    }
    if (text.includes("முடிந்தது") || text.includes("done")) {
      markTaskDone(text);
    }
    if (text.includes("நிகழ்வு") || text.includes("event")) {
      logEvent(text);
    }
  }

  // Emotion detection (simplified)
  function detectEmotion(text) {
    if (text.includes("மகிழ்ச்சி") || text.includes("நன்றாக") || text.includes("அருமை")) {
      return "😊";
    }
    if (text.includes("அழுத்தம்") || text.includes("கவலை") || text.includes("கடினம்")) {
      return "😟";
    }
    return "😐";
  }

  // Task management
  function createTask(text) {
    const task = {
      title: text,
      assignedTo: "User",
      status: "pending",
      trigger: "voice",
      emotionTag: detectEmotion(text),
      timestamp: new Date().toLocaleString(),
    };
    tasks = [task, ...tasks];
  }

  function markTaskDone(text) {
    // Find and mark task as done
    tasks = tasks.map((task) => {
      if (text.toLowerCase().includes(task.title.toLowerCase().substring(0, 10))) {
        return { ...task, status: "done" };
      }
      return task;
    });
  }

  // Note creation
  function createNote(text) {
    const note = {
      text: text,
      timestamp: new Date().toLocaleString(),
      emotion: detectEmotion(text),
    };
    // Could save to local storage or send to backend
    console.log("Note created:", note);
  }

  // Playlist control
  function startPlaylist(text) {
    // Implementation would start appropriate playlist
    console.log("Starting playlist for:", text);
  }

  // Event logging
  function logEvent(text) {
    const event = {
      type: "voice",
      description: text,
      timestamp: new Date().toLocaleString(),
      triggeredBy: "voice",
    };
    events = [event, ...events];
  }

  // BLE proximity simulation (for demo)
  function simulateBLETrigger(zone) {
    const event = {
      type: "proximity",
      description: `BLE trigger: ${zone} zone detected`,
      timestamp: new Date().toLocaleString(),
      triggeredBy: "BLE",
    };
    events = [event, ...events];

    if (zone === "kitchen") {
      suggestRecipe();
    }
    if (zone === "study") {
      openHomeworkChecklist();
    }
  }

  function suggestRecipe() {
    const suggestion = {
      text: "பொங்கல் சமைக்கலாம்!",
      timestamp: new Date().toLocaleString(),
      emotion: "😊",
    };
    voiceLogs = [suggestion, ...voiceLogs];
  }

  function openHomeworkChecklist() {
    // Implementation would open homework checklist
    console.log("Opening homework checklist");
  }

  onMount(() => {
    // Initialize voice assistant
  });
</script>

<svelte:head>
  <title>🤖 Assistant - Voice-First Tamil Assistant</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
            <Icon icon="heroicons:chat-bubble-left-right" class="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {taLabels.voiceAssistant}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">Voice-first Tamil assistant for your family</p>
          </div>
        </div>

        <!-- Voice Control -->
        <div class="flex items-center space-x-4">
          <button class="px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg {isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'}" on:click={isListening ? stopVoiceRecognition : startVoiceRecognition} use:motionInView={{ animation: "fadeInRight", delay: 0.2 }}>
            <Icon icon={isListening ? "heroicons:stop" : "heroicons:microphone"} class="w-5 h-5 mr-2 inline" />
            {isListening ? taLabels.stopListening : taLabels.startListening}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Current Transcript -->
    {#if currentTranscript}
      <div class="mb-8 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Input</h3>
        <p class="text-gray-700 dark:text-gray-300 text-lg">{currentTranscript}</p>
      </div>
    {/if}

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Voice Log -->
      <a href="/assistant/voice-log" class="group">
        <div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Icon icon="heroicons:chat-bubble-left-right" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{taLabels.voiceLog}</h3>
              <p class="text-gray-600 dark:text-gray-400">Voice interactions & logs</p>
            </div>
          </div>
        </div>
      </a>

      <!-- Task Board -->
      <a href="/assistant/task-board" class="group">
        <div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <Icon icon="heroicons:clipboard-document-list" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{taLabels.taskBoard}</h3>
              <p class="text-gray-600 dark:text-gray-400">Family tasks & checklists</p>
            </div>
          </div>
        </div>
      </a>

      <!-- Event Feed -->
      <a href="/assistant/event-feed" class="group">
        <div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{taLabels.eventFeed}</h3>
              <p class="text-gray-600 dark:text-gray-400">Activity & event logs</p>
            </div>
          </div>
        </div>
      </a>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Voice Logs -->
      <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2 text-blue-500" />
          Recent Voice Logs
        </h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          {#each voiceLogs.slice(0, 5) as log}
            <div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-2xl">{log.emotion}</span>
              <div class="flex-1">
                <p class="text-sm text-gray-900 dark:text-white">{log.text}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</p>
              </div>
            </div>
          {/each}
          {#if voiceLogs.length === 0}
            <p class="text-gray-500 dark:text-gray-400 text-center py-4">No voice logs yet. Start speaking!</p>
          {/if}
        </div>
      </div>

      <!-- Active Tasks -->
      <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon icon="heroicons:clipboard-document-list" class="w-5 h-5 mr-2 text-green-500" />
          Active Tasks
        </h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          {#each tasks.filter((t) => t.status === "pending").slice(0, 5) as task}
            <div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg">
              <input type="checkbox" class="checkbox checkbox-primary" on:change={() => markTaskDone(task.title)} />
              <div class="flex-1">
                <p class="text-sm text-gray-900 dark:text-white">{task.title}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{task.timestamp}</p>
              </div>
              <span class="text-sm">{task.emotionTag}</span>
            </div>
          {/each}
          {#if tasks.filter((t) => t.status === "pending").length === 0}
            <p class="text-gray-500 dark:text-gray-400 text-center py-4">No active tasks. Create one by voice!</p>
          {/if}
        </div>
      </div>
    </div>

    <!-- BLE Proximity Demo -->
    <div class="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Icon icon="heroicons:wifi" class="w-5 h-5 mr-2 text-purple-500" />
        Proximity Triggers (Demo)
      </h3>
      <div class="flex flex-wrap gap-4">
        <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" on:click={() => simulateBLETrigger("kitchen")}> Kitchen Zone </button>
        <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors" on:click={() => simulateBLETrigger("study")}> Study Zone </button>
        <button class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors" on:click={() => simulateBLETrigger("living")}> Living Room </button>
      </div>
    </div>
  </div>
</div>

<style>
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
