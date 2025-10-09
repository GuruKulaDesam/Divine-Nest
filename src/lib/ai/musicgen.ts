// Local MusicGen integration using AudioCraft
// Generates music from text prompts without requiring API keys

export interface MusicGenOptions {
  model?: 'small' | 'medium' | 'large'
  duration?: number // in seconds, max 30
}

export async function generateMusic(
  prompt: string,
  options: MusicGenOptions = {}
): Promise<AudioBuffer> {
  const {
    model = 'small',
    duration = 10
  } = options

  try {
    console.log(`Generating music locally: "${prompt}" (${duration}s, ${model} model)`);

    const response = await fetch('http://localhost:3003/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        duration: Math.min(duration, 30), // Local limit
        model
      })
    })

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Local MusicGen API error: ${response.status} - ${errorText}`)
    }

    const audioBlob = await response.blob()

    // Convert blob to AudioBuffer
    const audioBuffer = await decodeAudioBlob(audioBlob)

    console.log('Music generated successfully!');
    return audioBuffer

  } catch (error) {
    console.error('Local MusicGen error:', error)

    // Fallback to Hugging Face API if local server is not available
    console.log('Falling back to Hugging Face API...')
    return generateMusicHuggingFace(prompt, options)
  }
}

// Fallback to Hugging Face API
async function generateMusicHuggingFace(
  prompt: string,
  options: MusicGenOptions = {}
): Promise<AudioBuffer> {
  const {
    model = 'small',
    duration = 10
  } = options

  const huggingFaceToken = import.meta.env.VITE_HUGGINGFACE_TOKEN

  if (!huggingFaceToken) {
    throw new Error('VITE_HUGGINGFACE_TOKEN environment variable is required for fallback')
  }

  try {
    const modelName = model === 'small' ? 'facebook/musicgen-small' :
                     model === 'medium' ? 'facebook/musicgen-medium' :
                     'facebook/musicgen-large'

    const response = await fetch(`https://api-inference.huggingface.co/models/${modelName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${huggingFaceToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          duration: Math.min(duration, 30), // Hugging Face limit
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