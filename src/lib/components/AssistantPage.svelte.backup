<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { _, isLoading } from "svelte-i18n";
  import { motionInView, staggerAnimate } from "../utils/motion.js";
  import TodoList from "$lib/components/TodoList.svelte";
  import NoteCardSimple from "$lib/components/NoteCardSimple.svelte";
  import ReminderListSimple from "$lib/components/ReminderListSimple.svelte";
  import EventCalendarSimple from "$lib/components/EventCalendarSimple.svelte";
  import RecordingPanelSimple from "$lib/components/RecordingPanelSimple.svelte";
  import ShivoHUDSimple from "$lib/components/ShivoHUDSimple.svelte";
  import { startSpeechCapture, stopSpeechCapture } from "$lib/voice/speechCapture";
  import { generateMusic, buildMusicPrompt, getTemplatePrompt, MusicStyle } from "$lib/ai/musicgen";
  import { playAudio, stopAudio, pauseAudio, resumeAudio, setVolume, isPlaying, recordMicrophoneAudio, blobToAudioBuffer } from "$lib/audio/audioPlayer";
  import { shivoAI, processShivoInteraction, switchShivoRole, getShivoStatus } from "$lib/ai/agents/shivo.js";
  import { agentState } from "$lib/ai/agents/core.js";
  import { todos, todoActions } from "$lib/stores/todos";
  import { notes, noteActions } from "$lib/stores/notes";
  import { reminders, reminderActions } from "$lib/stores/reminders";
  import { events, eventActions } from "$lib/stores/events";
  import { recordings, recordingActions } from "$lib/stores/recordings";

  // Main tabs
  let activeTab = "voice"; // voice, ai, music, agentic

  // Voice recognition state (from original)
  let isListening = false;
  let currentTranscript = "";
  let voiceLogs = [];
  let tasks = [];
  let voiceEvents = [];

  // AI Assistant state (from ShivoAIPage)
  let currentEmotion = "neutral";
  let isAwake = false;
  let wakeWords = ["சிவோ", "shivo", "hey shivo", "ai", "assistant"];
  let aiVoice = "female";

  // Music state (from ShivoMusicPage)
  let status = "🎙️ Shivo is listening...";
  let isGenerating = false;
  let isPlayingMusic = false;
  let volume = 0.8;
  let currentPrompt = "";
  let lastGeneratedPrompt = "";
  let musicPrompt = "";
  let musicGenre = "classical";
  let isGeneratingMusic = false;
  let speechCaptureCleanup = null;

  // Agentic state (from ShivoAgenticPage)
  let currentRole = "family";
  let conversation = [];
  let systemStatus = "initializing";
  let agenticInput = "";
  let agentStats = {
    activeAgents: 0,
    memoryItems: 0,
    plansCreated: 0,
  };

  // AI Chat state
  let aiInput = "";
  let aiMessages = [];
  let aiStats = {
    tasksCompleted: 0,
    conversations: 0,
    learningPoints: 0,
  };

  // Role configurations
  const roles = {
    paati: {
      name: "Paati",
      icon: "heroicons:sparkles",
      color: "emerald",
      description: "Gentle care and spiritual guidance",
      avatar: "👵",
    },
    appa: {
      name: "Appa",
      icon: "heroicons:user",
      color: "blue",
      description: "Practical planning and task management",
      avatar: "👨",
    },
    amma: {
      name: "Amma",
      icon: "heroicons:heart",
      color: "purple",
      description: "Nurturing care and family coordination",
      avatar: "👩",
    },
    kids: {
      name: "Kids",
      icon: "heroicons:star",
      color: "orange",
      description: "Fun learning and playful interactions",
      avatar: "👶",
    },
    family: {
      name: "Family",
      icon: "heroicons:users",
      color: "indigo",
      description: "Complete family AI assistant",
      avatar: "👨‍👩‍👧‍👦",
    },
  };

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

  // Initialize components
  onMount(() => {
    // Initialize speech capture for music
    speechCaptureCleanup = startSpeechCapture((text) => {
      if (activeTab === "music") {
        processMusicVoiceCommand(text);
      } else if (activeTab === "ai") {
        processAIVoiceCommand(text);
      } else if (activeTab === "agentic") {
        processAgenticVoiceCommand(text);
      } else {
        processVoiceCommand(text);
      }
    });
  });

  onDestroy(() => {
    if (speechCaptureCleanup) {
      speechCaptureCleanup();
    }
  });

  // Voice recognition functions (original)
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
  }

  // Tamil intent parser (original)
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

  // AI Voice command processing (from ShivoAIPage)
  function processAIVoiceCommand(text) {
    const lowerText = text.toLowerCase().trim();

    // Check for wake words first
    if (!isAwake) {
      const isWakeWord = wakeWords.some((word) => lowerText.includes(word.toLowerCase()));
      if (isWakeWord) {
        isAwake = true;
        speakResponse("வணக்கம்! நான் உங்கள் குடும்ப உதவியாளர். என்ன உதவி வேண்டும்?");
        return;
      } else {
        return;
      }
    }

    // Process commands
    if (lowerText.includes("add todo") || lowerText.includes("பட்டியல் சேர்")) {
      const todoText = text.replace(/add todo|பட்டியல் சேர்/gi, "").trim();
      if (todoText) {
        todoActions.add({
          title: todoText,
          category: "custom",
          completed: false,
          createdAt: new Date(),
        });
      }
    }
    // Add more AI commands here
  }

  // Music voice command processing (from ShivoMusicPage)
  function processMusicVoiceCommand(text) {
    const lowerText = text.toLowerCase().trim();

    if (lowerText.includes("start humming") || lowerText.includes("record melody")) {
      startHummingRecording();
    } else if (lowerText.includes("stop") || lowerText.includes("pause")) {
      handleStopPlayback();
    } else if (lowerText.includes("play") || lowerText.includes("resume")) {
      handleResumePlayback();
    } else if (lowerText.includes("volume up") || lowerText.includes("louder")) {
      adjustVolume(Math.min(volume + 0.2, 1));
    } else if (lowerText.includes("volume down") || lowerText.includes("quieter")) {
      adjustVolume(Math.max(volume - 0.2, 0));
    } else {
      generateMusicFromPrompt(text);
    }
  }

  // Agentic voice command processing (from ShivoAgenticPage)
  function processAgenticVoiceCommand(text) {
    const timestamp = new Date().toLocaleString();
    conversation = [...conversation, { role: "user", content: text, timestamp }];

    processShivoInteraction(text, currentRole).then((response) => {
      conversation = [...conversation, { role: "assistant", content: response, timestamp: new Date().toLocaleString() }];
    });
  }

  // Music functions (from ShivoMusicPage)
  async function generateMusicFromPrompt(prompt) {
    try {
      isGenerating = true;
      currentPrompt = prompt;
      status = `🎧 Generating music for: "${prompt}"`;

      const enhancedPrompt = buildMusicPrompt(prompt);
      lastGeneratedPrompt = enhancedPrompt;

      const audioBuffer = await generateMusic(enhancedPrompt);
      await playAudio(audioBuffer, {
        volume,
        onEnded: () => {
          isPlayingMusic = false;
          status = "🎵 Music finished playing";
        },
      });

      isPlayingMusic = true;
      status = "🎵 Playing generated music...";
    } catch (error) {
      console.error("Music generation error:", error);
      status = "❌ Error generating music";
    } finally {
      isGenerating = false;
    }
  }

  async function startHummingRecording() {
    try {
      status = "🎤 Recording your melody...";
      const audioBlob = await recordMicrophoneAudio();
      const audioBuffer = await blobToAudioBuffer(audioBlob);
      await playAudio(audioBuffer, { volume });
      status = "🎵 Playing your recorded melody...";
    } catch (error) {
      status = "❌ Recording failed";
    }
  }

  function handleStopPlayback() {
    stopAudio();
    isPlayingMusic = false;
    status = "⏹️ Music stopped";
  }

  function handleResumePlayback() {
    resumeAudio();
    isPlayingMusic = true;
    status = "▶️ Music resumed";
  }

  function adjustVolume(newVolume) {
    volume = newVolume;
    setVolume(newVolume);
    status = `🔊 Volume: ${Math.round(volume * 100)}%`;
  }

  // Agentic functions (from ShivoAgenticPage)
  function switchRole(role) {
    currentRole = role;
    switchShivoRole(role);
    systemStatus = `Switched to ${roles[role].name} mode`;
  }

  function createNote(text) {
    // Implementation for creating notes
  }

  function startPlaylist(text) {
    // Implementation for starting playlist
  }

  function markTaskDone(text) {
    // Implementation for marking tasks done
  }

  function speakResponse(text) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ta-IN";
      utterance.voice = speechSynthesis.getVoices().find((voice) => voice.lang === "ta-IN") || null;
      speechSynthesis.speak(utterance);
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

  // Event logging
  function logEvent(text) {
    const event = {
      type: "voice",
      description: text,
      timestamp: new Date().toLocaleString(),
      triggeredBy: "voice",
    };
    voiceEvents = [event, ...voiceEvents];
  }

  // BLE proximity simulation (for demo)
  function simulateBLETrigger(zone) {
    const event = {
      type: "proximity",
      description: `BLE trigger: ${zone} zone detected`,
      timestamp: new Date().toLocaleString(),
      triggeredBy: "BLE",
    };
    voiceEvents = [event, ...voiceEvents];

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

  // AI Chat function
  async function sendAIMessage() {
    if (!aiInput.trim()) return;

    const userMessage = {
      role: "user",
      content: aiInput,
      timestamp: new Date().toISOString(),
    };

    aiMessages = [...aiMessages, userMessage];
    const currentInput = aiInput;
    aiInput = "";

    try {
      const response = await shivoAI.processMessage(currentInput, currentRole);
      const aiMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      aiMessages = [...aiMessages, aiMessage];
      aiStats.conversations++;
    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your message.",
        timestamp: new Date().toISOString(),
      };
      aiMessages = [...aiMessages, errorMessage];
    }
  }

  // Agentic chat function
  async function sendAgenticMessage() {
    if (!agenticInput.trim()) return;

    const userMessage = {
      role: "user",
      content: agenticInput,
      timestamp: new Date().toISOString(),
    };

    conversation = [...conversation, userMessage];
    const currentInput = agenticInput;
    agenticInput = "";

    try {
      const response = await shivoAI.processMessage(currentInput, currentRole);
      const aiMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      conversation = [...conversation, aiMessage];
      agentStats.conversations++;
    } catch (error) {
      console.error("Agentic chat error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your message.",
        timestamp: new Date().toISOString(),
      };
      conversation = [...conversation, errorMessage];
    }
  }

  // Music generation function
  async function handleGenerateMusic() {
    if (!musicPrompt.trim()) return;

    try {
      isGeneratingMusic = true;
      const enhancedPrompt = `${musicPrompt} in ${musicGenre} style`;
      const audioBuffer = await generateMusic(enhancedPrompt);
      await playAudio(audioBuffer, {
        volume,
        onEnded: () => {
          isGeneratingMusic = false;
        },
      });
    } catch (error) {
      console.error("Music generation error:", error);
      isGeneratingMusic = false;
    }
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
    <!-- Tab Navigation -->
    <div class="mb-8">
      <div class="flex space-x-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50">
        <button class="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 {activeTab === 'voice' ? 'bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}" on:click={() => (activeTab = "voice")}>
          <Icon icon="heroicons:microphone" class="w-5 h-5 inline mr-2" />
          Voice
        </button>
        <button class="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 {activeTab === 'ai' ? 'bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}" on:click={() => (activeTab = "ai")}>
          <Icon icon="heroicons:cpu-chip" class="w-5 h-5 inline mr-2" />
          AI
        </button>
        <button class="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 {activeTab === 'music' ? 'bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}" on:click={() => (activeTab = "music")}>
          <Icon icon="heroicons:musical-note" class="w-5 h-5 inline mr-2" />
          Music
        </button>
        <button class="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 {activeTab === 'agentic' ? 'bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}" on:click={() => (activeTab = "agentic")}>
          <Icon icon="heroicons:user-group" class="w-5 h-5 inline mr-2" />
          Agentic
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    {#if activeTab === "voice"}
      <!-- Voice Tab Content -->
      <div class="space-y-8">
        <!-- Current Transcript -->
        {#if currentTranscript}
          <div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Input</h3>
            <p class="text-gray-700 dark:text-gray-300 text-lg">{currentTranscript}</p>
          </div>
        {/if}

        <!-- Voice Controls -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Voice Recognition -->
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:microphone" class="w-6 h-6 mr-2 text-blue-500" />
              Voice Recognition
            </h3>
            <div class="space-y-4">
              <button class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 {isListening ? 'animate-pulse' : ''}" on:click={toggleListening}>
                {isListening ? "Stop Listening" : "Start Voice Recognition"}
              </button>
              <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                {isListening ? "Listening for voice commands..." : "Click to start voice recognition"}
              </p>
            </div>
          </div>

          <!-- Voice Commands -->
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:command-line" class="w-6 h-6 mr-2 text-green-500" />
              Voice Commands
            </h3>
            <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>• "Add task [task name]" - Create new task</p>
              <p>• "Set reminder [reminder]" - Set reminder</p>
              <p>• "Note [note content]" - Add note</p>
              <p>• "Play music" - Start music</p>
              <p>• "Stop" - Stop current action</p>
            </div>
          </div>
        </div>

        <!-- Recent Voice Logs -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2 text-blue-500" />
            Recent Voice Logs
          </h3>
          <div class="space-y-3 max-h-64 overflow-y-auto">
            {#each voiceLogs.slice(0, 10) as log}
              <div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors">
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
      </div>
    {:else if activeTab === "ai"}
      <!-- AI Tab Content -->
      <div class="space-y-8">
        <!-- AI Status -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:cpu-chip" class="w-6 h-6 mr-2 text-purple-500" />
            AI Assistant Status
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-500">{aiStats.tasksCompleted}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-500">{aiStats.conversations}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Conversations</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-500">{aiStats.learningPoints}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Learning Points</div>
            </div>
          </div>
        </div>

        <!-- AI Chat Interface -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:chat-bubble-left-right" class="w-6 h-6 mr-2 text-blue-500" />
            AI Chat
          </h3>
          <div class="space-y-4">
            <div class="h-64 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg p-4 overflow-y-auto">
              {#each aiMessages as message}
                <div class="mb-3 {message.sender === 'ai' ? 'text-left' : 'text-right'}">
                  <div class="inline-block p-3 rounded-lg {message.sender === 'ai' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100' : 'bg-green-100 dark:bg-green-900/50 text-green-900 dark:text-green-100'}">
                    <p class="text-sm">{message.text}</p>
                    <p class="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              {/each}
            </div>
            <div class="flex space-x-2">
              <input type="text" bind:value={aiInput} placeholder="Ask me anything..." class="flex-1 px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" on:keydown={(e) => e.key === "Enter" && sendAIMessage()} />
              <button class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105" on:click={sendAIMessage}> Send </button>
            </div>
          </div>
        </div>

        <!-- AI Capabilities -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Smart Learning</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Learns from family interactions and preferences</p>
          </div>
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Context Awareness</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Understands family context and relationships</p>
          </div>
        </div>
      </div>
    {:else if activeTab === "music"}
      <!-- Music Tab Content -->
      <div class="space-y-8">
        <!-- Music Generation -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:musical-note" class="w-6 h-6 mr-2 text-pink-500" />
            Music Generation
          </h3>
          <div class="space-y-4">
            <input type="text" bind:value={musicPrompt} placeholder="Describe the music you want to generate..." class="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            <div class="flex space-x-2">
              <select bind:value={musicGenre} class="px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg">
                <option value="classical">Classical</option>
                <option value="jazz">Jazz</option>
                <option value="rock">Rock</option>
                <option value="electronic">Electronic</option>
                <option value="folk">Folk</option>
              </select>
              <button class="flex-1 py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105" on:click={handleGenerateMusic} disabled={isGeneratingMusic}>
                {isGeneratingMusic ? "Generating..." : "Generate Music"}
              </button>
            </div>
          </div>
        </div>

        <!-- Current Music -->
        {#if currentMusic}
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Now Playing</h3>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Icon icon="heroicons:musical-note" class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 dark:text-white">{currentMusic.title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{currentMusic.genre}</p>
              </div>
              <button class="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" on:click={toggleMusicPlayback}>
                <Icon icon={isPlayingMusic ? "heroicons:pause" : "heroicons:play"} class="w-5 h-5" />
              </button>
            </div>
          </div>
        {/if}

        <!-- Music Library -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:queue-list" class="w-6 h-6 mr-2 text-green-500" />
            Music Library
          </h3>
          <div class="space-y-3 max-h-64 overflow-y-auto">
            {#each musicLibrary as track}
              <div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors cursor-pointer" on:click={() => playMusic(track)}>
                <Icon icon="heroicons:musical-note" class="w-5 h-5 text-pink-500" />
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{track.title}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{track.genre} • {track.duration}</p>
                </div>
                {#if currentMusic && currentMusic.id === track.id && isPlayingMusic}
                  <Icon icon="heroicons:waveform" class="w-5 h-5 text-green-500 animate-pulse" />
                {/if}
              </div>
            {/each}
            {#if musicLibrary.length === 0}
              <p class="text-gray-500 dark:text-gray-400 text-center py-4">No music generated yet. Create your first track!</p>
            {/if}
          </div>
        </div>
      </div>
    {:else if activeTab === "agentic"}
      <!-- Agentic Tab Content -->
      <div class="space-y-8">
        <!-- Role Selection -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:user-group" class="w-6 h-6 mr-2 text-indigo-500" />
            AI Family Members
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each Object.entries(familyRoles) as [role, config]}
              <button class="p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 {currentRole === role ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}" on:click={() => switchRole(role)}>
                <div class="text-2xl mb-2">{config.emoji}</div>
                <div class="font-medium text-gray-900 dark:text-white text-sm">{config.name}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{config.personality}</div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Current Role Chat -->
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">{familyRoles[currentRole].emoji}</span>
            Chat with {familyRoles[currentRole].name}
          </h3>
          <div class="space-y-4">
            <div class="h-64 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg p-4 overflow-y-auto">
              {#each agenticMessages as message}
                <div class="mb-3 {message.sender === 'ai' ? 'text-left' : 'text-right'}">
                  <div class="inline-block p-3 rounded-lg {message.sender === 'ai' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100' : 'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100'}">
                    <p class="text-sm">{message.text}</p>
                    <p class="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              {/each}
            </div>
            <div class="flex space-x-2">
              <input type="text" bind:value={agenticInput} placeholder={`Talk to ${familyRoles[currentRole].name}...`} class="flex-1 px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" on:keydown={(e) => e.key === "Enter" && sendAgenticMessage()} />
              <button class="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105" on:click={sendAgenticMessage}> Send </button>
            </div>
          </div>
        </div>

        <!-- Family Activities -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Active Tasks</h3>
            <div class="space-y-2">
              {#each tasks.filter((t) => t.status === "pending").slice(0, 3) as task}
                <div class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" on:change={() => markTaskDone(task.title)} />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{task.title}</span>
                </div>
              {/each}
            </div>
          </div>
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upcoming Events</h3>
            <div class="space-y-2">
              {#each events.slice(0, 3) as event}
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-medium">{event.title}</span>
                  <span class="text-gray-500 dark:text-gray-400 ml-2">{event.date}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}
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

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }

  /* Hide scrollbar by default, show on hover */
  .scroll-container {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  .scroll-container:hover {
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }
</style>
