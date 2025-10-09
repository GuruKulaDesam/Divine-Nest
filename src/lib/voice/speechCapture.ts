// Speech capture using Web Speech API
// Supports Tamil and English recognition

export interface SpeechCaptureOptions {
  lang?: 'en-IN' | 'ta-IN' | 'auto'
  continuous?: boolean
  onResult: (text: string) => void
  onError?: (error: string) => void
  onEnd?: () => void
}

let recognition: any = null
let isCapturing = false

export function startSpeechCapture(options: SpeechCaptureOptions) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    options.onError?.('Speech recognition not supported in this browser')
    return
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  recognition = new SpeechRecognition()

  recognition.continuous = options.continuous ?? false
  recognition.interimResults = false
  recognition.lang = options.lang ?? 'en-IN'

  recognition.onresult = (event: any) => {
    const transcript = event.results[event.results.length - 1][0].transcript
    console.log('Speech captured:', transcript)
    options.onResult(transcript)
  }

  recognition.onerror = (event: any) => {
    console.error('Speech capture error:', event.error)
    options.onError?.(event.error)
  }

  recognition.onend = () => {
    isCapturing = false
    options.onEnd?.()
  }

  isCapturing = true
  recognition.start()
}

export function stopSpeechCapture() {
  if (recognition && isCapturing) {
    recognition.stop()
    isCapturing = false
  }
}

export function isSpeechCapturing() {
  return isCapturing
}