<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Icon from '@iconify/svelte';
  import { VoiceController, voiceState } from '$lib/voice/voiceController';

  // Create voice controller instance only on client side
  let voiceController: VoiceController | null = null;

  let showVoiceInterface = false;
  let voiceStatus = '';
  let isListening = false;
  let isActive = false;
  let currentContext = 'home';
  let feedback = '';
  let lastCommand = '';

  // Subscribe to voice state
  const unsubscribe = voiceState.subscribe(state => {
    isListening = state.isListening;
    isActive = state.isActive;
    currentContext = state.currentContext;
    feedback = state.feedback;
    lastCommand = state.lastCommand;

    // Update status message
    if (isActive && isListening) {
      voiceStatus = '🎤 Listening...';
    } else if (isActive && !isListening) {
      voiceStatus = '⏸️ Active (not listening)';
    } else {
      voiceStatus = '🔇 Voice control inactive';
    }
  });

  onMount(() => {
    // Initialize voice controller first
    voiceController = new VoiceController();
    // Auto-start voice control after a brief delay
    setTimeout(() => {
      voiceController.startListening();
      showVoiceInterface = true;
    }, 2000);
  });

  onDestroy(() => {
    unsubscribe();
  });

  function toggleVoiceControl() {
    if (isActive) {
      voiceController.stopListening();
    } else {
      voiceController.startListening();
    }
  }

  function showHelp() {
    voiceController.executeCommand({ action: 'help' }, 'help');
  }

  function getContextIcon(context: string): string {
    const icons: { [key: string]: string } = {
      home: 'heroicons:home',
      tasks: 'heroicons:clipboard-document-list',
      issues: 'heroicons:exclamation-triangle',
      requests: 'heroicons:chat-bubble-left-right',
      alerts: 'heroicons:bell',
      family: 'heroicons:user-group',
      foods: 'heroicons:utensils',
      inventory: 'heroicons:archive-box'
    };
    return icons[context] || 'heroicons:home';
  }

  function getContextName(context: string): string {
    const names: { [key: string]: string } = {
      home: 'Home',
      tasks: 'Tasks',
      issues: 'Issues',
      requests: 'Requests',
      alerts: 'Alerts',
      family: 'Family',
      foods: 'Foods',
      inventory: 'Inventory'
    };
    return names[context] || 'Home';
  }
</script>

<!-- Global Voice Control Overlay -->
{#if showVoiceInterface}
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Main Voice Control Button -->
    <div class="relative">
      <!-- Status Indicator -->
      <div class="absolute -top-2 -right-2 w-4 h-4 rounded-full {isActive ? 'bg-success animate-pulse' : 'bg-base-content/30'} border-2 border-base-100"></div>

      <!-- Main Button -->
      <button
        class="btn btn-circle btn-lg shadow-2xl {isActive ? 'btn-primary' : 'btn-ghost'}"
        on:click={toggleVoiceControl}
        aria-label="Voice Control"
      >
        <Icon
          icon={isListening ? 'heroicons:microphone' : 'heroicons:microphone-slash'}
          class="w-8 h-8 {isListening ? 'animate-pulse text-error' : ''}"
        />
      </button>
    </div>

    <!-- Voice Status Panel -->
    <div class="mt-4 bg-base-100/95 backdrop-blur-md border border-base-300 rounded-2xl shadow-2xl p-4 min-w-80 max-w-sm">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <Icon icon={getContextIcon(currentContext)} class="w-5 h-5 text-primary" />
          <span class="font-semibold text-sm">{getContextName(currentContext)}</span>
        </div>
        <button
          class="btn btn-ghost btn-xs"
          on:click={() => showVoiceInterface = false}
          aria-label="Close voice panel"
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <!-- Status -->
      <div class="text-xs text-base-content/70 mb-2">
        {voiceStatus}
      </div>

      <!-- Current Feedback -->
      {#if feedback}
        <div class="alert alert-info p-2 mb-3">
          <Icon icon="heroicons:chat-bubble-left" class="w-4 h-4" />
          <span class="text-xs">{feedback}</span>
        </div>
      {/if}

      <!-- Last Command -->
      {#if lastCommand}
        <div class="text-xs text-base-content/60 mb-3">
          <strong>Last:</strong> "{lastCommand}"
        </div>
      {/if}

      <!-- Quick Commands -->
      <div class="grid grid-cols-2 gap-2">
        <button
          class="btn btn-outline btn-xs"
          on:click={showHelp}
        >
          <Icon icon="heroicons:question-mark-circle" class="w-4 h-4 mr-1" />
          Help
        </button>
        <button
          class="btn btn-outline btn-xs"
          on:click={() => voiceController.executeCommand({ action: 'navigate', target: '/' }, 'go home')}
        >
          <Icon icon="heroicons:home" class="w-4 h-4 mr-1" />
          Home
        </button>
      </div>

      <!-- Wake Words Reminder -->
      <div class="mt-3 p-2 bg-primary/10 rounded-lg">
        <div class="text-xs font-semibold text-primary mb-1">Wake Words:</div>
        <div class="text-xs text-base-content/70">
          "Hey Home", "Computer", "வீடு", "கேளு"
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Voice Wake Word Detector (Invisible) -->
<div class="fixed inset-0 pointer-events-none z-40">
  <!-- This ensures voice recognition works globally -->
</div>

<style>
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
</style>