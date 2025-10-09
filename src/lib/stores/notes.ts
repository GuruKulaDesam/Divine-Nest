import { writable } from 'svelte/store'
import type { Note } from '$lib/models'

// Initialize with sample data
const initialNotes: Note[] = [
  {
    id: '1',
    content: 'Amma made sweet pongal today - it was delicious!',
    timestamp: new Date().toISOString(),
    emotionTag: 'joy',
    voiceCreated: true
  },
  {
    id: '2',
    content: 'Need to organize the pooja room before Diwali',
    timestamp: new Date().toISOString(),
    emotionTag: 'gratitude',
    voiceCreated: true
  }
]

export const notes = writable<Note[]>(initialNotes)

export const noteActions = {
  add: (note: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    notes.update(current => [...current, newNote])
    return newNote
  },

  remove: (id: string) => {
    notes.update(current => current.filter(note => note.id !== id))
  },

  update: (id: string, updates: Partial<Note>) => {
    notes.update(current =>
      current.map(note =>
        note.id === id ? { ...note, ...updates } : note
      )
    )
  }
}