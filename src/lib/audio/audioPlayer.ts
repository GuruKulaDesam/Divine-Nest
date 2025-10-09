// Audio playback utilities using Web Audio API
// Supports playback, volume control, and audio analysis

export interface AudioPlaybackOptions {
  volume?: number // 0.0 to 1.0
  loop?: boolean
  onEnded?: () => void
  onError?: (error: Error) => void
}

class AudioPlayer {
  private audioContext: AudioContext | null = null
  private currentSource: AudioBufferSourceNode | null = null
  private gainNode: GainNode | null = null
  private isPlaying = false
  private currentBuffer: AudioBuffer | null = null

  constructor() {
    this.initializeAudioContext()
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain()
      this.gainNode.connect(this.audioContext.destination)

    } catch (error) {
      console.error('Failed to initialize audio context:', error)
      throw error
    }
  }

  async playAudio(buffer: AudioBuffer, options: AudioPlaybackOptions = {}): Promise<void> {
    if (!this.audioContext || !this.gainNode) {
      await this.initializeAudioContext()
    }

    if (!this.audioContext || !this.gainNode) {
      throw new Error('Audio context not available')
    }

    try {
      // Resume context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      // Stop any currently playing audio
      this.stopAudio()

      // Create new source
      this.currentSource = this.audioContext.createBufferSource()
      this.currentSource.buffer = buffer
      this.currentBuffer = buffer

      // Set volume
      const volume = Math.max(0, Math.min(options.volume ?? 1, 1))
      this.gainNode!.gain.value = volume

      // Connect nodes
      this.currentSource.connect(this.gainNode!)

      // Set up event handlers
      this.currentSource.onended = () => {
        this.isPlaying = false
        options.onEnded?.()
      }

      // Set loop if requested
      if (options.loop) {
        this.currentSource.loop = true
      }

      // Start playback
      this.currentSource.start()
      this.isPlaying = true

    } catch (error) {
      console.error('Audio playback failed:', error)
      this.isPlaying = false
      options.onError?.(error as Error)
      throw error
    }
  }

  stopAudio(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop()
      } catch (error) {
        // Source might already be stopped
      }
      this.currentSource = null
    }
    this.isPlaying = false
  }

  pauseAudio(): void {
    if (this.audioContext && this.isPlaying) {
      this.audioContext.suspend()
      this.isPlaying = false
    }
  }

  resumeAudio(): void {
    if (this.audioContext && !this.isPlaying) {
      this.audioContext.resume()
      this.isPlaying = true
    }
  }

  setVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(volume, 1))
    }
  }

  get isCurrentlyPlaying(): boolean {
    return this.isPlaying
  }

  get currentAudioBuffer(): AudioBuffer | null {
    return this.currentBuffer
  }

  // Get audio duration in seconds
  getDuration(): number {
    return this.currentBuffer?.duration ?? 0
  }

  // Get current playback time (approximate)
  getCurrentTime(): number {
    if (!this.audioContext || !this.currentSource) return 0
    return this.audioContext.currentTime
  }
}

// Singleton instance
let audioPlayerInstance: AudioPlayer | null = null

export function getAudioPlayer(): AudioPlayer {
  if (!audioPlayerInstance) {
    audioPlayerInstance = new AudioPlayer()
  }
  return audioPlayerInstance
}

export async function playAudio(buffer: AudioBuffer, options?: AudioPlaybackOptions): Promise<void> {
  const player = getAudioPlayer()
  return player.playAudio(buffer, options)
}

export function stopAudio(): void {
  const player = getAudioPlayer()
  player.stopAudio()
}

export function pauseAudio(): void {
  const player = getAudioPlayer()
  player.pauseAudio()
}

export function resumeAudio(): void {
  const player = getAudioPlayer()
  player.resumeAudio()
}

export function setVolume(volume: number): void {
  const player = getAudioPlayer()
  player.setVolume(volume)
}

export function isPlaying(): boolean {
  const player = getAudioPlayer()
  return player.isCurrentlyPlaying
}

// Microphone recording for humming input
export interface RecordingOptions {
  duration?: number // in seconds
  onData?: (audioBlob: Blob) => void
  onError?: (error: Error) => void
}

export async function recordMicrophoneAudio(options: RecordingOptions = {}): Promise<Blob> {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        const audioChunks: Blob[] = []

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data)
          options.onData?.(event.data)
        }

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
          resolve(audioBlob)

          // Stop all tracks
          stream.getTracks().forEach(track => track.stop())
        }

        mediaRecorder.onerror = (event) => {
          const error = new Error('Recording failed')
          options.onError?.(error)
          reject(error)
        }

        // Start recording
        mediaRecorder.start()

        // Stop after duration or immediately if no duration specified
        if (options.duration) {
          setTimeout(() => {
            mediaRecorder.stop()
          }, options.duration * 1000)
        }
      })
      .catch(error => {
        console.error('Microphone access denied:', error)
        options.onError?.(error)
        reject(error)
      })
  })
}

// Convert audio blob to AudioBuffer for playback
export async function blobToAudioBuffer(blob: Blob): Promise<AudioBuffer> {
  const arrayBuffer = await blob.arrayBuffer()
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  return audioBuffer
}