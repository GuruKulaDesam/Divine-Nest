<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { wakeOnTapService, type WakeEvent } from "$lib/services/wakeOnTapService";
  import VoiceAssistant from "./VoiceAssistant.svelte";
  import Icon from "@iconify/svelte";

  export let isVisible = false;
  export let wakeEvent: WakeEvent | null = null;

  let voiceAssistantVisible = false;
  let wakeIndicatorVisible = false;
  let wakeTimeout: number | null = null;

  onMount(() => {
    // Start wake-on-tap monitoring
    wakeOnTapService.startMonitoring().catch(error => {
      console.error('Failed to start wake monitoring:', error);
    });

    // Listen for wake events
    wakeOnTapService.addWakeListener(handleWakeEvent);

    // Listen for wake-on-tap custom events
    window.addEventListener('wakeOnTap', handleWakeOnTapEvent as EventListener);
  });

  onDestroy(() => {
    wakeOnTapService.stopMonitoring();
    wakeOnTapService.removeWakeListener(handleWakeEvent);
    window.removeEventListener('wakeOnTap', handleWakeOnTapEvent as EventListener);

    if (wakeTimeout) {
      clearTimeout(wakeTimeout);
    }
  });

  function handleWakeEvent(event: WakeEvent) {
    console.log('Wake event received:', event);
    wakeEvent = event;

    // Show wake indicator
    showWakeIndicator();

    // Trigger voice assistant for proximity wake
    if (event.triggeredBy === 'proximity') {
      voiceAssistantVisible = true;
      isVisible = true;
    }
  }

  function handleWakeOnTapEvent(event: CustomEvent) {
    const wakeData = event.detail as WakeEvent;
    handleWakeEvent(wakeData);
  }

  function showWakeIndicator() {
    wakeIndicatorVisible = true;

    // Hide indicator after 3 seconds
    if (wakeTimeout) {
      clearTimeout(wakeTimeout);
    }

    wakeTimeout = setTimeout(() => {
      wakeIndicatorVisible = false;
    }, 3000) as unknown as number;
  }

  function closeVoiceAssistant() {
    voiceAssistantVisible = false;
    isVisible = false;
  }

  function testWakeOnTap() {
    // For testing purposes - simulate a proximity wake
    const testEvent: WakeEvent = {
      triggeredBy: 'proximity',
      timestamp: Date.now(),
      userRole: 'mother'
    };
    handleWakeEvent(testEvent);
  }
</script>

<!-- Wake Indicator Overlay -->
{#if wakeIndicatorVisible}
  <div class="fixed inset-0 z-50 pointer-events-none">
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
      <Icon icon="mdi:gesture-tap" class="w-5 h-5" />
      <span class="text-sm font-medium">Wake Detected</span>
    </div>
  </div>
{/if}

<!-- Voice Assistant Overlay -->
{#if voiceAssistantVisible}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
    <div class="bg-white rounded-t-3xl w-full max-h-96 overflow-hidden">
      <VoiceAssistant on:close={closeVoiceAssistant} />
    </div>
  </div>
{/if}

<!-- Test Button (only in development) -->
{#if typeof window !== 'undefined' && window.location.hostname === 'localhost'}
  <button
    on:click={testWakeOnTap}
    class="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
    title="Test Wake-on-Tap"
  >
    <Icon icon="mdi:gesture-tap" class="w-6 h-6" />
  </button>
{/if}