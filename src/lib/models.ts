// Data models for Shivo voice assistant

export interface Todo {
  id: string
  title: string
  category: 'grocery' | 'family' | 'school' | 'custom'
  createdAt: string
  completed: boolean
  voiceCreated?: boolean
}

export interface Note {
  id: string
  content: string
  timestamp: string
  emotionTag?: 'joy' | 'stress' | 'gratitude' | 'neutral'
  voiceCreated?: boolean
}

export interface Reminder {
  id: string
  message: string
  time: string
  repeat?: 'daily' | 'weekly' | 'monthly' | 'none'
  completed?: boolean
  voiceCreated?: boolean
}

export interface Event {
  id: string
  title: string
  date: string
  category: 'festival' | 'school' | 'family' | 'custom'
  voiceCreated?: boolean
}

export interface Recording {
  id: string
  filePath: string
  startedAt: string
  duration: number
  transcription?: string
  voiceCreated?: boolean
}

// Voice intent types
export interface VoiceIntent {
  type: 'createTodo' | 'setReminder' | 'createNote' | 'setEventReminder' | 'startRecording' | 'stopRecording' | 'unknown'
  title?: string
  message?: string
  content?: string
  time?: string
  date?: string
  category?: string
  confidence: number
}