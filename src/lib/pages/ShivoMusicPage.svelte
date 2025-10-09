<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Icon from '@iconify/svelte'
  import { startSpeechCapture } from '$lib/voice/speechCapture'
  import { generateMusic, buildMusicPrompt, getTemplatePrompt, type MusicStyle } from '$lib/ai/musicgen'
  import { playAudio, stopAudio, pauseAudio, resumeAudio, setVolume, isPlaying, recordMicrophoneAudio, blobToAudioBuffer } from '$lib/audio/audioPlayer'

  let status = '🎙️ Shivo is listening...'
  let isListening = false
  let isGenerating = false
  let isPlayingMusic = false
  let volume = 0.8
  let currentPrompt = ''
  let lastGeneratedPrompt = ''
  let speechCaptureCleanup: (() => void) | null = null

  // Voice command processing
  function processVoiceCommand(text: string) {
    const lowerText = text.toLowerCase().trim()

    if (lowerText.includes('start humming') || lowerText.includes('record melody')) {
      startHummingRecording()
    } else if (lowerText.includes('stop') || lowerText.includes('pause')) {
      handleStopPlayback()
    } else if (lowerText.includes('play') || lowerText.includes('resume')) {
      handleResumePlayback()
    } else if (lowerText.includes('volume up') || lowerText.includes('louder')) {
      adjustVolume(Math.min(volume + 0.2, 1))
    } else if (lowerText.includes('volume down') || lowerText.includes('quieter')) {
      adjustVolume(Math.max(volume - 0.2, 0))
    } else {
      // Generate music from text prompt
      generateMusicFromPrompt(text)
    }
  }

  async function generateMusicFromPrompt(prompt: string) {
    try {
      isGenerating = true
      currentPrompt = prompt
      status = `🎧 Generating music for: "${prompt}"`

      // Build enhanced prompt
      const enhancedPrompt = buildMusicPrompt(prompt)
      lastGeneratedPrompt = enhancedPrompt

      const audioBuffer = await generateMusic(enhancedPrompt)
      await playAudio(audioBuffer, {
        volume,
        onEnded: () => {
          isPlayingMusic = false
          status = '✅ Music playback completed'
        }
      })

      isPlayingMusic = true
      status = '✅ Music playback started'

    } catch (error) {
      console.error('Music generation failed:', error)
      status = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    } finally {
      isGenerating = false
    }
  }

  async function startHummingRecording() {
    try {
      status = '🎤 Recording your melody... (5 seconds)'

      const audioBlob = await recordMicrophoneAudio({
        duration: 5,
        onError: (error) => {
          status = `❌ Recording failed: ${error.message}`
        }
      })

      status = '🎼 Processing your melody...'

      // Convert to audio buffer and use as input for music generation
      const audioBuffer = await blobToAudioBuffer(audioBlob)

      // Generate music based on the recorded melody
      const prompt = 'Build a musical track around this melody, add harmonies and accompaniment'
      await generateMusicFromPrompt(prompt)

    } catch (error) {
      console.error('Humming recording failed:', error)
      status = `❌ Recording failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }

  function handleStopPlayback() {
    stopAudio()
    isPlayingMusic = false
    status = '⏹️ Playback stopped'
  }

  function handleResumePlayback() {
    if (!isPlayingMusic) {
      resumeAudio()
      isPlayingMusic = true
      status = '▶️ Playback resumed'
    }
  }

  function adjustVolume(newVolume: number) {
    volume = newVolume
    setVolume(volume)
    status = `🔊 Volume set to ${Math.round(volume * 100)}%`
  }

  function startVoiceListening() {
    if (isListening) return

    isListening = true
    status = '🎙️ Listening for voice commands...'

    speechCaptureCleanup = startSpeechCapture({
      continuous: true,
      onResult: (text) => {
        console.log('Voice command:', text)
        processVoiceCommand(text)
      },
      onError: (error) => {
        console.error('Speech capture error:', error)
        status = `❌ Speech error: ${error}`
        isListening = false
      },
      onEnd: () => {
        isListening = false
        status = '🎙️ Voice listening stopped'
      }
    })
  }

  function stopVoiceListening() {
    if (speechCaptureCleanup) {
      speechCaptureCleanup()
      speechCaptureCleanup = null
    }
    isListening = false
    status = '🎙️ Voice listening stopped'
  }

  // Template buttons for quick music generation
  const musicTemplates: { key: MusicStyle; label: string; icon: string }[] = [
    { key: 'devotional', label: 'Devotional', icon: 'heroicons:sparkles' },
    { key: 'folk', label: 'Folk', icon: 'heroicons:musical-note' },
    { key: 'ambient', label: 'Ambient', icon: 'heroicons:cloud' },
    { key: 'classical', label: 'Classical', icon: 'heroicons:building-library' },
    { key: 'electronic', label: 'Electronic', icon: 'heroicons:bolt' },
    { key: 'world', label: 'World Music', icon: 'heroicons:globe-asia-australia' }
  ]

  function generateFromTemplate(template: MusicStyle) {
    const prompt = getTemplatePrompt(template)
    generateMusicFromPrompt(prompt)
  }

  onMount(() => {
    // Auto-start voice listening when component mounts
    startVoiceListening()
  })

  onDestroy(() => {
    stopVoiceListening()
    stopAudio()
  })
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">🎼 Shivo Music Companion</h1>
      <p class="text-base-content/70 mt-2">Voice-controlled music generation with AI</p>
    </div>
    <div class="flex gap-3">
      {#if isListening}
        <button
          class="btn btn-error"
          on:click={stopVoiceListening}
        >
          <Icon icon="heroicons:microphone" class="w-5 h-5 mr-2" />
          Stop Listening
        </button>
      {:else}
        <button
          class="btn btn-primary"
          on:click={startVoiceListening}
        >
          <Icon icon="heroicons:microphone" class="w-5 h-5 mr-2" />
          Start Listening
        </button>
      {/if}
    </div>
  </div>

  <!-- Status Display -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-2">Status</h3>
          <p class="text-base-content/80">{status}</p>
          {#if lastGeneratedPrompt}
            <p class="text-sm text-base-content/60 mt-2">
              <strong>Last prompt:</strong> {lastGeneratedPrompt}
            </p>
          {/if}
        </div>
        {#if isGenerating}
          <div class="loading loading-spinner loading-lg text-primary"></div>
        {:else if isPlayingMusic}
          <Icon icon="heroicons:speaker-wave" class="w-8 h-8 text-success" />
        {:else}
          <Icon icon="heroicons:speaker-x-mark" class="w-8 h-8 text-base-content/50" />
        {/if}
      </div>
    </div>
  </div>

  <!-- Voice Commands -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h3 class="font-semibold text-lg mb-4">🎙️ Voice Commands</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-base-200 rounded-lg">
          <h4 class="font-medium mb-2">Music Generation</h4>
          <ul class="text-sm text-base-content/70 space-y-1">
            <li>• "Create a Tamil folk melody"</li>
            <li>• "Make devotional music with flute"</li>
            <li>• "Generate ambient background music"</li>
            <li>• "Play classical orchestral piece"</li>
          </ul>
        </div>
        <div class="p-4 bg-base-200 rounded-lg">
          <h4 class="font-medium mb-2">Controls</h4>
          <ul class="text-sm text-base-content/70 space-y-1">
            <li>• "Start humming" (records melody)</li>
            <li>• "Stop" or "Pause"</li>
            <li>• "Play" or "Resume"</li>
            <li>• "Volume up/down"</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Templates -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h3 class="font-semibold text-lg mb-4">🎵 Quick Templates</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {#each musicTemplates as template}
          <button
            class="btn btn-outline btn-block h-auto py-4"
            on:click={() => generateFromTemplate(template.key)}
            disabled={isGenerating}
          >
            <Icon icon={template.icon} class="w-6 h-6 mb-2" />
            {template.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Manual Controls -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h3 class="font-semibold text-lg mb-4">🎛️ Manual Controls</h3>
      <div class="flex flex-wrap gap-4 items-center">
        <!-- Volume Control -->
        <div class="flex items-center gap-3">
          <Icon icon="heroicons:speaker-wave" class="w-5 h-5" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            bind:value={volume}
            on:input={() => setVolume(volume)}
            class="range range-primary"
          />
          <span class="text-sm font-medium w-12">{Math.round(volume * 100)}%</span>
        </div>

        <!-- Playback Controls -->
        <div class="flex gap-2">
          {#if isPlayingMusic}
            <button class="btn btn-outline" on:click={handleStopPlayback}>
              <Icon icon="heroicons:stop" class="w-5 h-5" />
            </button>
            <button class="btn btn-outline" on:click={pauseAudio}>
              <Icon icon="heroicons:pause" class="w-5 h-5" />
            </button>
          {:else}
            <button class="btn btn-outline" on:click={handleResumePlayback}>
              <Icon icon="heroicons:play" class="w-5 h-5" />
            </button>
          {/if}
        </div>

        <!-- Record Humming -->
        <button
          class="btn btn-secondary"
          on:click={startHummingRecording}
          disabled={isGenerating}
        >
          <Icon icon="heroicons:microphone" class="w-5 h-5 mr-2" />
          Record Melody
        </button>
      </div>
    </div>
  </div>

  <!-- Custom Prompt Input -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h3 class="font-semibold text-lg mb-4">✏️ Custom Prompt</h3>
      <div class="flex gap-3">
        <input
          type="text"
          bind:value={currentPrompt}
          placeholder="Describe the music you want to generate..."
          class="input input-bordered flex-1"
          on:keydown={(e) => {
            if (e.key === 'Enter' && currentPrompt.trim()) {
              generateMusicFromPrompt(currentPrompt)
            }
          }}
        />
        <button
          class="btn btn-primary"
          on:click={() => currentPrompt && generateMusicFromPrompt(currentPrompt)}
          disabled={isGenerating || !currentPrompt.trim()}
        >
          <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-2" />
          Generate
        </button>
      </div>
    </div>
  </div>

  <!-- Sample Prompts -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h3 class="font-semibold text-lg mb-4">💡 Sample Prompts</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each [
          'Shivo, make a Tamil folk melody with ambient pads',
          'Create a devotional tune with flute and tanpura',
          'Generate a chill beat with soft percussion and strings',
          'Classical orchestral piece with piano and strings',
          'Electronic ambient music with synthesizers',
          'World music fusion with traditional instruments'
        ] as prompt}
          <button
            class="btn btn-ghost btn-block justify-start text-left h-auto py-3"
            on:click={() => generateMusicFromPrompt(prompt)}
            disabled={isGenerating}
          >
            <Icon icon="heroicons:chat-bubble-left" class="w-4 h-4 mr-3 flex-shrink-0" />
            <span class="text-sm">{prompt}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>