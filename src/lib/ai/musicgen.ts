// MusicGen integration using Hugging Face API
// Generates music from text prompts

export interface MusicGenOptions {
  model?: 'facebook/musicgen-small' | 'facebook/musicgen-medium' | 'facebook/musicgen-large'
  duration?: number // in seconds, max 30
  temperature?: number // 0.0 to 1.0
}

export async function generateMusic(
  prompt: string,
  options: MusicGenOptions = {}
): Promise<AudioBuffer> {
  const {
    model = 'facebook/musicgen-small',
    duration = 10,
    temperature = 0.7
  } = options

  const huggingFaceToken = import.meta.env.VITE_HUGGINGFACE_TOKEN

  if (!huggingFaceToken) {
    throw new Error('VITE_HUGGINGFACE_TOKEN environment variable is required')
  }

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${huggingFaceToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          duration: Math.min(duration, 30), // Hugging Face limit
          temperature: Math.max(0, Math.min(temperature, 1))
        }
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`MusicGen API error: ${response.status} - ${error}`)
    }

    const audioBlob = await response.blob()

    // Convert blob to AudioBuffer
    const audioBuffer = await decodeAudioBlob(audioBlob)
    return audioBuffer

  } catch (error) {
    console.error('MusicGen generation failed:', error)
    throw error
  }
}

// Helper function to decode audio blob to AudioBuffer
async function decodeAudioBlob(blob: Blob): Promise<AudioBuffer> {
  const arrayBuffer = await blob.arrayBuffer()
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  return audioBuffer
}

// Enhanced prompt builder for better music generation
export function buildMusicPrompt(basePrompt: string, style?: string, mood?: string): string {
  let enhancedPrompt = basePrompt

  if (style) {
    enhancedPrompt += `, ${style} style`
  }

  if (mood) {
    enhancedPrompt += `, ${mood} mood`
  }

  // Add some common enhancements for better results
  enhancedPrompt += ', high quality, professional production'

  return enhancedPrompt
}

// Predefined prompt templates for common requests
export const MUSIC_TEMPLATES = {
  devotional: 'devotional music, spiritual, peaceful, with traditional instruments',
  folk: 'folk music, traditional, acoustic, warm and inviting',
  ambient: 'ambient music, atmospheric, soothing, background music',
  classical: 'classical music, orchestral, elegant, sophisticated',
  electronic: 'electronic music, modern, synthesized, rhythmic',
  world: 'world music, ethnic instruments, cultural, diverse'
} as const

export type MusicStyle = keyof typeof MUSIC_TEMPLATES

export function getTemplatePrompt(style: MusicStyle, customPrompt?: string): string {
  const baseTemplate = MUSIC_TEMPLATES[style]
  if (customPrompt) {
    return `${customPrompt}, ${baseTemplate}`
  }
  return baseTemplate
}