<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { recordings, recordingActions } from "$lib/stores/recordings";
  import { isListening, startVoiceRecognition, stopVoiceRecognition, transcript } from "$lib/stores/voiceAssistant";

  let isRecording = false;
  let recordingStartTime: number | null = null;
  let recordingDuration = 0;
  let recordingInterval: number | null = null;

  function startRecording() {
    if (isRecording) return;

    isRecording = true;
    recordingStartTime = Date.now();
    recordingDuration = 0;

    recordingInterval = setInterval(() => {
      if (recordingStartTime !== null) {
        recordingDuration = Math.floor((Date.now() - recordingStartTime) / 1000);
      }
    }, 1000);

    // In a real implementation, this would start actual audio recording
    console.log("Recording started...");
  }

  function stopRecording() {
    if (!isRecording) return;

    isRecording = false;
    clearInterval(recordingInterval);

    const duration = recordingDuration;
    recordingStartTime = null;
    recordingDuration = 0;

    // Add recording to store
    recordingActions.add({
      filePath: `/recordings/recording_${Date.now()}.mp3`,
      startedAt: new Date().toISOString(),
      duration: duration,
      transcription: "Recording completed", // In real implementation, this would be transcribed
      voiceCreated: true,
    });

    console.log("Recording stopped...");
  }

  function playRecording(filePath: string) {
    // In a real implementation, this would play the audio file
    console.log("Playing recording:", filePath);
  }

  function removeRecording(id: string) {
    recordingActions.remove(id);
  }

  function formatDuration(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function handleVoiceCommand() {
    if ($isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  }

  onMount(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  });
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="bg-white rounded-xl shadow-lg p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <Icon icon="heroicons:microphone" class="w-8 h-8 text-red-600" />
        <h1 class="text-2xl font-bold text-gray-800">பதிவுகள் (Recordings)</h1>
      </div>
      <div class="flex items-center gap-3">
        <button on:click={handleVoiceCommand} class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors {$isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-red-600 text-white hover:bg-red-700'}">
          <Icon icon="heroicons:microphone" class="w-5 h-5" />
          {$isListening ? "Listening..." : "Voice"}
        </button>
        <div class="text-sm text-gray-500">
          {$recordings.length} recordings
        </div>
      </div>
    </div>

    <!-- Voice Transcript Display -->
    {#if $isListening || $transcript}
      <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <Icon icon="heroicons:microphone" class="w-4 h-4 text-red-600" />
          <span class="text-sm font-medium text-red-800">Voice Command</span>
        </div>
        <p class="text-red-700">{$transcript || "Listening..."}</p>
      </div>
    {/if}

    <!-- Recording Controls -->
    <div class="mb-6 bg-gray-50 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button on:click={isRecording ? stopRecording : startRecording} class="w-16 h-16 rounded-full flex items-center justify-center transition-colors {isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-red-600 hover:bg-red-700'}">
            {#if isRecording}
              <Icon icon="heroicons:stop" class="w-8 h-8 text-white" />
            {:else}
              <Icon icon="heroicons:microphone" class="w-8 h-8 text-white" />
            {/if}
          </button>

          <div>
            <h3 class="font-semibold text-gray-800">
              {isRecording ? "Recording..." : "Start Recording"}
            </h3>
            {#if isRecording}
              <p class="text-sm text-red-600 font-mono">
                {formatDuration(recordingDuration)}
              </p>
            {:else}
              <p class="text-sm text-gray-600">Click to record or say "Shivo, start recording"</p>
            {/if}
          </div>
        </div>

        {#if isRecording}
          <div class="flex items-center gap-2 text-red-600">
            <div class="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium">REC</span>
          </div>
        {/if}
      </div>
    </div>

    <!-- Recordings List -->
    <div class="space-y-3">
      {#each $recordings as recording (recording.id)}
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <!-- Play Button -->
          <button on:click={() => playRecording(recording.filePath)} class="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
            <Icon icon="heroicons:play" class="w-6 h-6 ml-1" />
          </button>

          <!-- Content -->
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-gray-800">
                Recording {new Date(recording.startedAt).toLocaleDateString()}
              </h3>
              {#if recording.voiceCreated}
                <Icon icon="heroicons:microphone" class="w-4 h-4 text-red-500" />
              {/if}
            </div>

            <div class="flex items-center gap-4 mt-1">
              <div class="flex items-center gap-1 text-sm text-gray-600">
                <Icon icon="heroicons:clock" class="w-4 h-4" />
                {formatDuration(recording.duration)}
              </div>

              <div class="text-sm text-gray-500">
                {new Date(recording.startedAt).toLocaleTimeString()}
              </div>
            </div>

            {#if recording.transcription}
              <p class="text-sm text-gray-700 mt-2 italic">
                "{recording.transcription}"
              </p>
            {/if}
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button on:click={() => playRecording(recording.filePath)} class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors" title="Play">
              <Icon icon="heroicons:play" class="w-4 h-4" />
            </button>

            <button on:click={() => removeRecording(recording.id)} class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
              <Icon icon="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      {/each}

      {#if $recordings.length === 0}
        <div class="text-center py-12 text-gray-500">
          <Icon icon="heroicons:microphone" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p class="text-lg font-medium">No recordings yet</p>
          <p class="text-sm">Start your first recording or try saying "Shivo, start recording"</p>
        </div>
      {/if}
    </div>
  </div>
</div>
