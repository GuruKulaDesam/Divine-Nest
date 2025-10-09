import { writable } from 'svelte/store'
import type { Event } from '../models'

// Initialize with sample data
const initialEvents: Event[] = [
  {
    id: '1',
    title: 'School leave on Monday',
    date: '2025-10-14',
    category: 'school',
    voiceCreated: true
  },
  {
    id: '2',
    title: 'Diwali celebrations',
    date: '2025-10-20',
    category: 'festival',
    voiceCreated: false
  },
  {
    id: '3',
    title: 'Family gathering',
    date: '2025-10-25',
    category: 'family',
    voiceCreated: true
  }
]

export const events = writable<Event[]>(initialEvents)

export const eventActions = {
  add: (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    }
    events.update(current => [...current, newEvent])
    return newEvent
  },

  remove: (id: string) => {
    events.update(current => current.filter(event => event.id !== id))
  },

  update: (id: string, updates: Partial<Event>) => {
    events.update(current =>
      current.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    )
  }
}