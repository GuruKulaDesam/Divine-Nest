// Wake word detection using Web Speech API
// Note: This is a simplified implementation. For production, use Porcupine or TensorFlow Lite

export interface WakeWordConfig {
  words: string[]
  onWake: () => void
  continuous?: boolean
}

let recognition: any = null
let isListening = false

export function startWakeWordListener(config: WakeWordConfig) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Speech recognition not supported in this browser')
    return
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  recognition = new SpeechRecognition()

  recognition.continuous = config.continuous ?? true
  recognition.interimResults = false
  recognition.lang = 'en-IN' // Primary English, will also detect Tamil

  recognition.onresult = (event: any) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()

    // Check if any wake word is detected
    const wakeWordDetected = config.words.some(word =>
      transcript.includes(word.toLowerCase())
    )

    if (wakeWordDetected) {
      console.log('Wake word detected:', transcript)
      config.onWake()
    }
  }

  recognition.onerror = (event: any) => {
    console.error('Wake word recognition error:', event.error)
  }

  recognition.onend = () => {
    if (config.continuous && isListening) {
      // Restart listening if continuous mode
      setTimeout(() => startWakeWordListener(config), 1000)
    }
  }

  isListening = true
  recognition.start()
}

export function stopWakeWordListener() {
  if (recognition && isListening) {
    recognition.stop()
    isListening = false
  }
}