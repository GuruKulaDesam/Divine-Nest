<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { motionInView } from "../utils/motion.js";

  export let isOpen = true; // Assistant sidebar is always visible on desktop

  // Voice recognition variables
  let isListening = false;
  let transcript = "";
  let confidence = 0;
  let emotion = "😐";
  let currentLanguage = "ta-IN";

  // Tamil voice commands
  const tamilCommands = {
    பட்டியல்: "list",
    சேர்: "add",
    நீக்கு: "delete",
    முடிந்தது: "complete",
    உதவி: "help",
    நிறுத்து: "stop",
    தொடங்கு: "start",
  };

  // Quick actions
  const quickActions = [
    { icon: "heroicons:microphone", label: "Voice Command", action: "voice" },
    { icon: "heroicons:clipboard-document-list", label: "Add Task", action: "task" },
    { icon: "heroicons:bell", label: "Set Reminder", action: "reminder" },
    { icon: "heroicons:calendar", label: "Schedule", action: "schedule" },
  ];

  // Recent activities
  let recentActivities = [
    { time: "2 min ago", action: "Voice command processed", type: "voice" },
    { time: "5 min ago", action: "Task added to board", type: "task" },
    { time: "10 min ago", action: "Reminder set", type: "reminder" },
  ];

  // Start voice recognition
  function startVoiceRecognition() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = currentLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      transcript = "கேட்கிறது...";
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0];
      transcript = result.transcript;
      confidence = Math.round(result.confidence * 100);

      // Simple emotion detection based on keywords
      if (transcript.includes("மகிழ்ச்சி") || transcript.includes("நன்று")) {
        emotion = "😊";
      } else if (transcript.includes("அழுத்தம்") || transcript.includes("சிரமம்")) {
        emotion = "😟";
      } else {
        emotion = "😐";
      }

      // Process Tamil commands
      processTamilCommand(transcript.toLowerCase());

      // Add to recent activities
      recentActivities = [{ time: "Just now", action: `Voice: "${transcript}"`, type: "voice" }, ...recentActivities.slice(0, 4)];
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      transcript = "பிழை: " + event.error;
      isListening = false;
    };

    recognition.onend = () => {
      isListening = false;
    };

    recognition.start();
  }

  // Process Tamil voice commands
  function processTamilCommand(command) {
    // Simple keyword matching for Tamil commands
    if (command.includes("பட்டியல்")) {
      // Navigate to task board
      window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/task-board" } }));
    } else if (command.includes("குரல் பதிவு")) {
      // Navigate to voice log
      window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/voice-log" } }));
    } else if (command.includes("நிகழ்வு")) {
      // Navigate to event feed
      window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/event-feed" } }));
    }
  }

  // Handle quick action
  function handleQuickAction(action) {
    switch (action) {
      case "voice":
        startVoiceRecognition();
        break;
      case "task":
        window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/task-board" } }));
        break;
      case "reminder":
        // Could open a reminder modal or navigate
        break;
      case "schedule":
        window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/schedule" } }));
        break;
    }
  }

  onMount(() => {
    // Auto-start voice recognition for ambient listening (simulated)
    // In a real implementation, this would be continuous ambient listening
  });
</script>

<!-- Right Sidebar for Assistant -->
<div class="hidden lg:block fixed right-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-40 transform transition-transform duration-300 {isOpen ? 'translate-x-0' : 'translate-x-full'}">
  <!-- Header -->
  <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
          <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 class="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">உதவியாளர்</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Voice Assistant</p>
        </div>
      </div>

      <!-- Voice status indicator -->
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full {isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}"></div>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {isListening ? "கேட்கிறது" : "காத்திருக்கிறது"}
        </span>
      </div>
    </div>
  </div>

  <!-- Voice Input Section -->
  <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
      <!-- Voice Button -->
      <div class="flex justify-center mb-4">
        <button class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 {isListening ? 'animate-pulse scale-110' : 'hover:scale-105'}" on:click={startVoiceRecognition} disabled={isListening}>
          <Icon icon="heroicons:microphone" class="w-8 h-8 text-white" />
        </button>
      </div>

      <!-- Transcript Display -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {transcript || "குரல் கட்டளையை சொல்லுங்கள்..."}
        </p>
        {#if confidence > 0}
          <div class="flex items-center justify-center space-x-2">
            <span class="text-2xl">{emotion}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              நம்பகத்தன்மை: {confidence}%
            </span>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">விரைவு செயல்கள்</h3>
    <div class="grid grid-cols-2 gap-3">
      {#each quickActions as action, index}
        <button class="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 hover:scale-105" on:click={() => handleQuickAction(action.action)} use:motionInView={{ animation: "fadeInUp", delay: index * 0.1 }}>
          <Icon icon={action.icon} class="w-5 h-5 text-gray-600 dark:text-gray-300 mb-2 mx-auto" />
          <span class="text-xs text-gray-700 dark:text-gray-200 text-center block">
            {action.label}
          </span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Recent Activities -->
  <div class="flex-1 p-4 overflow-y-auto">
    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">சமீபத்திய செயல்கள்</h3>
    <div class="space-y-3">
      {#each recentActivities as activity, index}
        <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg" use:motionInView={{ animation: "fadeInLeft", delay: index * 0.05 }}>
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              {#if activity.type === "voice"}
                <Icon icon="heroicons:microphone" class="w-4 h-4 text-white" />
              {:else if activity.type === "task"}
                <Icon icon="heroicons:clipboard-document-list" class="w-4 h-4 text-white" />
              {:else}
                <Icon icon="heroicons:bell" class="w-4 h-4 text-white" />
              {/if}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900 dark:text-white truncate">
              {activity.action}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {activity.time}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Footer with navigation links -->
  <div class="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
    <div class="grid grid-cols-2 gap-2">
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant" } }))}> முதன்மை </button>
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/voice-log" } }))}> பதிவு </button>
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/task-board" } }))}> பணிகள் </button>
      <button class="p-2 text-xs text-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" on:click={() => window.dispatchEvent(new CustomEvent("navigate", { detail: { path: "/assistant/event-feed" } }))}> நிகழ்வுகள் </button>
    </div>
  </div>
</div>
