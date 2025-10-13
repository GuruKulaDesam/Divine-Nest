import { writable } from 'svelte/store'
import type { Note } from '$lib/models'

// Initialize with empty array for SSR compatibility
const initialNotes: Note[] = []

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