<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';

  export let placeholder = 'Speak your command...';
  export let onResult: ((result: string) => void) | null = null;

  const dispatch = createEventDispatcher<{ result: string }>();

  let isListening = false;
  let recognition: any = null;
  let isSupported = false;

  // Check if speech recognition is supported
  $: isSupported = typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  function startListening() {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    // Create recognition instance
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US'; // Default to English, could be made configurable

      recognition.onstart = () => {
        isListening = true;
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) {
          onResult(transcript);
        } else {
          dispatch('result', transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
      };

      recognition.onend = () => {
        isListening = false;
      };

      recognition.start();
    }
  }

  function stopListening() {
    if (recognition && isListening) {
      recognition.stop();
    }
  }

  // Cleanup on destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (recognition) {
      recognition.stop();
    }
  });
</script>

<div class="flex items-center gap-2">
  <input
    type="text"
    {placeholder}
    class="input input-bordered flex-1"
    readonly
  />
  <button
    class="btn {isListening ? 'btn-error' : 'btn-primary'}"
    on:click={startListening}
    disabled={!isSupported}
  >
    {#if isListening}
      <Icon icon="heroicons:stop" class="w-5 h-5" />
      Stop
    {:else}
      <Icon icon="heroicons:microphone" class="w-5 h-5" />
      Voice
    {/if}
  </button>
</div>

{#if !isSupported}
  <p class="text-sm text-warning mt-1">
    <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4" />
    Voice input is not supported in this browser
  </p>
{/if}