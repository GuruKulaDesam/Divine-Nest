<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { startWakeWordListener } from "$lib/voice/wakeWord";
  import { startSpeechCapture, stopSpeechCapture, isSpeechCapturing } from "$lib/voice/speechCapture";
  import { parseIntent } from "$lib/voice/intentParser";
  import { generateResponse, speak } from "$lib/voice/responseGenerator";
  import { todoActions } from "$lib/stores/todos";
  import { noteActions } from "$lib/stores/notes";
  import { reminderActions } from "$lib/stores/reminders";
  import { eventActions } from "$lib/stores/events";
  import { recordingActions } from "$lib/stores/recordings";

  let isListening = false;
  let currentTranscript = "";
  let lastResponse = "";
  let isWakeWordActive = false;
  let isRecording = false;

  onMount(() => {
    // Start wake word listener
    startWakeWordListener({
      words: ["Shivo", "Nanbaa", "Shakthi", "Bro", "Daisy", "நண்பா", "சிவோ", "சக்தி", "ப்ரோ", "டெய்ஸி"],
      onWake: handleWakeWord,
      continuous: true,
    });
  });

  function handleWakeWord() {
    if (isListening) return;

    isWakeWordActive = true;
    speak("என்ன சொல்லுங்கள்?");

    setTimeout(() => {
      startListening();
    }, 1000);
  }

  function startListening() {
    if (isListening) return;

    isListening = true;
    currentTranscript = "";

    startSpeechCapture({
      lang: "en-IN",
      onResult: handleSpeechResult,
      onError: handleSpeechError,
      onEnd: handleSpeechEnd,
    });
  }

  function stopListening() {
    if (!isListening) return;

    isListening = false;
    stopSpeechCapture();
  }

  function handleSpeechResult(text: string) {
    currentTranscript = text;
    console.log("Speech result:", text);

    // Parse intent and execute action
    const intent = parseIntent(text);
    executeIntent(intent);

    // Generate and speak response
    const response = generateResponse(intent);
    lastResponse = response;
    speak(response);

    // Stop listening after processing
    setTimeout(() => {
      stopListening();
      isWakeWordActive = false;
    }, 2000);
  }

  function handleSpeechError(error: string) {
    console.error("Speech error:", error);
    lastResponse = "மன்னிக்கவும், கேட்க முடியவில்லை.";
    speak(lastResponse);
    stopListening();
    isWakeWordActive = false;
  }

  function handleSpeechEnd() {
    isListening = false;
  }

  function executeIntent(intent: any) {
    switch (intent.type) {
      case "createTodo":
        todoActions.add({
          title: intent.title,
          category: "custom",
          completed: false,
          voiceCreated: true,
        });
        break;

      case "setReminder":
        reminderActions.add({
          message: intent.message,
          time: intent.time,
          repeat: "none",
          completed: false,
          voiceCreated: true,
        });
        break;

      case "createNote":
        noteActions.add({
          content: intent.content,
          emotionTag: "neutral",
          voiceCreated: true,
        });
        break;

      case "setEventReminder":
        eventActions.add({
          title: intent.title,
          date: intent.date,
          category: "custom",
          voiceCreated: true,
        });
        break;

      case "startRecording":
        isRecording = true;
        // In a real implementation, this would start audio recording
        break;

      case "stopRecording":
        if (isRecording) {
          isRecording = false;
          recordingActions.add({
            filePath: `/recordings/recording_${Date.now()}.mp3`,
            startedAt: new Date().toISOString(),
            duration: 30, // Mock duration
            transcription: currentTranscript,
            voiceCreated: true,
          });
        }
        break;
    }
  }

  function toggleManualListening() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }
</script>

<!-- Shivo HUD - Floating Voice Assistant Interface -->
<div class="fixed bottom-6 right-6 z-50">
  <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-sm">
    <!-- Status Indicator -->
    <div class="flex items-center gap-3 mb-3">
      <div class="relative">
        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          {#if isWakeWordActive}
            <Icon icon="heroicons:microphone" class="w-6 h-6 text-white animate-pulse" />
          {:else if isListening}
            <Icon icon="heroicons:microphone" class="w-6 h-6 text-green-300 animate-pulse" />
          {:else if isRecording}
            <Icon icon="heroicons:video-camera" class="w-6 h-6 text-red-400 animate-pulse" />
          {:else}
            <Icon icon="heroicons:sparkles" class="w-6 h-6 text-white" />
          {/if}
        </div>
        {#if isWakeWordActive || isListening}
          <div class="absolute -inset-1 bg-green-400 rounded-full animate-ping opacity-20"></div>
        {/if}
      </div>

      <div class="text-white">
        <h3 class="font-semibold text-sm">Shivo</h3>
        <p class="text-xs opacity-90">
          {#if isWakeWordActive}
            Wake word detected!
          {:else if isListening}
            Listening...
          {:else if isRecording}
            Recording...
          {:else}
            Always here
          {/if}
        </p>
      </div>
    </div>

    <!-- Current Activity -->
    {#if currentTranscript || lastResponse}
      <div class="bg-white/10 rounded-lg p-3 mb-3 max-w-xs">
        {#if currentTranscript}
          <p class="text-white text-sm mb-1">
            <Icon icon="heroicons:chat-bubble-left" class="w-4 h-4 inline mr-1" />
            {currentTranscript}
          </p>
        {/if}
        {#if lastResponse}
          <p class="text-white/80 text-xs italic">
            {lastResponse}
          </p>
        {/if}
      </div>
    {/if}

    <!-- Quick Actions -->
    <div class="flex gap-2">
      <button on:click={toggleManualListening} class="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 text-white text-sm font-medium transition-colors" class:bg-green-500={isListening} class:bg-green-600={isListening}>
        {#if isListening}
          <Icon icon="heroicons:stop" class="w-4 h-4 inline mr-1" />
          Stop
        {:else}
          <Icon icon="heroicons:microphone" class="w-4 h-4 inline mr-1" />
          Listen
        {/if}
      </button>

      {#if isRecording}
        <button on:click={() => executeIntent({ type: "stopRecording" })} class="bg-red-500 hover:bg-red-600 rounded-lg px-3 py-2 text-white text-sm font-medium transition-colors">
          <Icon icon="heroicons:stop" class="w-4 h-4 inline mr-1" />
          Stop Rec
        </button>
      {:else}
        <button on:click={() => executeIntent({ type: "startRecording" })} class="bg-orange-500 hover:bg-orange-600 rounded-lg px-3 py-2 text-white text-sm font-medium transition-colors">
          <Icon icon="heroicons:video-camera" class="w-4 h-4 inline mr-1" />
          Record
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
</style>
