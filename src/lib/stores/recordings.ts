import { writable } from 'svelte/store'
import type { Recording } from '../models'

// Initialize with sample data
const initialRecordings: Recording[] = [
  {
    id: '1',
    filePath: '/recordings/family_meeting_2025-10-08.mp3',
    startedAt: '2025-10-08T14:30:00Z',
    duration: 180,
    transcription: 'Family meeting discussion about Diwali preparations and school schedules.',
    voiceCreated: true
  }
]

export const recordings = writable<Recording[]>(initialRecordings)

export const recordingActions = {
  add: (recording: Omit<Recording, 'id'>) => {
    const newRecording: Recording = {
      ...recording,
      id: Date.now().toString()
    }
    recordings.update(current => [...current, newRecording])
    return newRecording
  },

  remove: (id: string) => {
    recordings.update(current => current.filter(recording => recording.id !== id))
  },

  update: (id: string, updates: Partial<Recording>) => {
    recordings.update(current =>
      current.map(recording =>
        recording.id === id ? { ...recording, ...updates } : recording
      )
    )
  }
}