<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';

  export let placeholder = 'Speak your command...';
  export let onResult: ((result: string) => void) | null = null;
  export let wakeWords = ['hey home', 'computer', 'listen', 'வீடு', 'கேளு']; // English and Tamil wake words
  export let autoStart = false; // Start listening automatically

  const dispatch = createEventDispatcher<{ result: string; wakeWord: string }>();

  let isListening = false;
  let isWakeWordMode = true; // Start in wake word detection mode
  let recognition: any = null;
  let isSupported = false;
  let lastWakeWord = '';
  let continuousMode = false;

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
      recognition.continuous = true; // Keep listening continuously
      recognition.interimResults = false;
      recognition.lang = 'en-US'; // Default to English, could be made configurable

      recognition.onstart = () => {
        isListening = true;
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();

        if (isWakeWordMode) {
          // Check for wake words
          const detectedWakeWord = wakeWords.find(word =>
            transcript.includes(word.toLowerCase())
          );

          if (detectedWakeWord) {
            lastWakeWord = detectedWakeWord;
            isWakeWordMode = false;
            continuousMode = true;

            // Provide audio feedback
            speakFeedback(`Listening for commands. Say "stop listening" to end.`);

            // Dispatch wake word detection
            dispatch('result', `Wake word "${detectedWakeWord}" detected. Listening for commands...`);
            return;
          }
        } else if (continuousMode) {
          // Check for stop commands
          if (transcript.includes('stop listening') || transcript.includes('கேளுவதை நிறுத்து')) {
            stopListening();
            speakFeedback('Stopped listening.');
            return;
          }

          // Process command
          if (onResult) {
            onResult(transcript);
          } else {
            dispatch('result', transcript);
          }
        } else {
          // Single command mode
          if (onResult) {
            onResult(transcript);
          } else {
            dispatch('result', transcript);
          }
          stopListening();
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        // Auto-restart in wake word mode after error
        if (isWakeWordMode && autoStart) {
          setTimeout(() => startListening(), 1000);
        }
      };

      recognition.onend = () => {
        isListening = false;
        // Auto-restart in wake word mode
        if (isWakeWordMode && autoStart) {
          setTimeout(() => startListening(), 500);
        } else if (continuousMode) {
          // Stay in command mode briefly, then go back to wake word mode
          setTimeout(() => {
            continuousMode = false;
            isWakeWordMode = true;
            if (autoStart) startListening();
          }, 3000);
        }
      };

      recognition.start();
    }
  }

  function stopListening() {
    if (recognition && isListening) {
      recognition.stop();
      continuousMode = false;
      isWakeWordMode = true;
    }
  }

  function speakFeedback(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Could be made configurable
      utterance.rate = 1.2;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Auto-start listening if enabled
  $: if (autoStart && isSupported && !isListening) {
    startListening();
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
    placeholder={isWakeWordMode ? 'Say "Hey Home" to wake me...' : placeholder}
    class="input input-bordered flex-1 {isListening ? 'input-primary' : ''}"
    readonly
  />

  {#if continuousMode}
    <button
      class="btn btn-error btn-lg gap-2"
      on:click={stopListening}
    >
      <Icon icon="heroicons:stop" class="w-6 h-6" />
      <span>Stop Listening</span>
    </button>
  {:else}
    <button
      class="btn {isListening ? 'btn-success' : 'btn-primary'} btn-lg gap-2"
      on:click={startListening}
      disabled={!isSupported}
    >
      {#if isListening}
        <Icon icon="heroicons:microphone" class="w-6 h-6 animate-pulse" />
        <span>{isWakeWordMode ? 'Listening...' : 'Recording...'}</span>
      {:else}
        <Icon icon="heroicons:microphone" class="w-6 h-6" />
        <span>Voice</span>
      {/if}
    </button>
  {/if}
</div>

{#if lastWakeWord}
  <p class="text-sm text-success mt-1">
    <Icon icon="heroicons:check-circle" class="w-4 h-4" />
    Wake word "{lastWakeWord}" detected - listening for commands
  </p>
{/if}

{#if !isSupported}
  <p class="text-sm text-warning mt-1">
    <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4" />
    Voice input is not supported in this browser
  </p>
{/if}