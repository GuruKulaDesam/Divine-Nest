<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";

  const dispatch = createEventDispatcher();

  // State for voice recording
  let isRecording = false;
  let isExpanded = false;

  // Handle voice input
  function handleVoiceInput() {
    isRecording = !isRecording;
    dispatch("action", {
      action: isRecording ? "start-voice-input" : "stop-voice-input",
      type: "voice",
    });
  }

  // Handle AI assistant
  function handleAIAssistant() {
    dispatch("action", {
      action: "open-ai-assistant",
      type: "ai",
    });
  }

  // Handle WhatsApp share
  function handleWhatsAppShare() {
    dispatch("action", {
      action: "share-whatsapp",
      type: "share",
    });
  }

  // Handle email share
  function handleEmailShare() {
    dispatch("action", {
      action: "share-email",
      type: "share",
    });
  }

  // Toggle expanded state
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<!-- Floating Action Buttons - Bottom Right Corner -->
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
  <!-- Expanded buttons -->
  {#if isExpanded}
    <div class="flex flex-col space-y-3 animate-fade-in">
      <!-- AI Assistant Button -->
      <button class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group" on:click={handleAIAssistant} title="AI Assistant">
        <Icon icon="heroicons:sparkles" class="w-6 h-6 group-hover:animate-pulse" />
      </button>

      <!-- WhatsApp Share Button -->
      <button class="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group" on:click={handleWhatsAppShare} title="Share via WhatsApp">
        <Icon icon="logos:whatsapp-icon" class="w-6 h-6" />
      </button>

      <!-- Email Share Button -->
      <button class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group" on:click={handleEmailShare} title="Share via Email">
        <Icon icon="heroicons:envelope" class="w-6 h-6" />
      </button>
    </div>
  {/if}

  <!-- Main Voice Button -->
  <button class="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative" class:ring-4={isRecording} class:ring-red-300={isRecording} class:animate-pulse={isRecording} on:click={handleVoiceInput} title={isRecording ? "Stop Voice Input" : "Start Voice Input"}>
    <Icon icon={isRecording ? "heroicons:stop" : "heroicons:microphone"} class="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />

    <!-- Recording indicator -->
    {#if isRecording}
      <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
      <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
    {/if}
  </button>

  <!-- Expand/Collapse Button -->
  <button class="w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center backdrop-blur-sm" on:click={toggleExpanded} title={isExpanded ? "Collapse" : "Expand"}>
    <Icon icon={isExpanded ? "heroicons:chevron-down" : "heroicons:chevron-up"} class="w-5 h-5 transition-transform duration-200" />
  </button>
</div>

<style>
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Custom pulse animation for recording */
  @keyframes recording-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
  }
</style>
