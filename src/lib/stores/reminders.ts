import { writable } from 'svelte/store'
import type { Reminder } from '../models'

// Initialize with sample data
const initialReminders: Reminder[] = [
  {
    id: '1',
    message: 'Call Appa at 5 PM',
    time: '17:00',
    repeat: 'none',
    completed: false,
    voiceCreated: true
  },
  {
    id: '2',
    message: 'Pay water tax (due Oct 15)',
    time: '09:00',
    repeat: 'none',
    completed: false,
    voiceCreated: true
  },
  {
    id: '3',
    message: 'Daily meditation',
    time: '06:00',
    repeat: 'daily',
    completed: false,
    voiceCreated: false
  }
]

export const reminders = writable<Reminder[]>(initialReminders)

export const reminderActions = {
  add: (reminder: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString()
    }
    reminders.update(current => [...current, newReminder])
    return newReminder
  },

  remove: (id: string) => {
    reminders.update(current => current.filter(reminder => reminder.id !== id))
  },

  update: (id: string, updates: Partial<Reminder>) => {
    reminders.update(current =>
      current.map(reminder =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      )
    )
  },

  markCompleted: (id: string) => {
    reminders.update(current =>
      current.map(reminder =>
        reminder.id === id ? { ...reminder, completed: true } : reminder
      )
    )
  },

  toggle: (id: string) => {
    reminders.update(current =>
      current.map(reminder =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    )
  }
}