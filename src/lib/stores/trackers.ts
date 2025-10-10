import { writable } from 'svelte/store'
import type { TrackerEntry } from '$lib/models'

// Tracker data store
export const trackerData = writable<Record<string, TrackerEntry[]>>({})

// Tracker actions
export const trackerActions = {
  // Add entry to a specific tracker
  addEntry: (trackerId: string, entry: Omit<TrackerEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: TrackerEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    trackerData.update(current => ({
      ...current,
      [trackerId]: [...(current[trackerId] || []), newEntry]
    }))

    return newEntry
  },

  // Update entry
  updateEntry: (trackerId: string, entryId: string, updates: Partial<TrackerEntry>) => {
    trackerData.update(current => ({
      ...current,
      [trackerId]: (current[trackerId] || []).map(entry =>
        entry.id === entryId
          ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
          : entry
      )
    }))
  },

  // Remove entry
  removeEntry: (trackerId: string, entryId: string) => {
    trackerData.update(current => ({
      ...current,
      [trackerId]: (current[trackerId] || []).filter(entry => entry.id !== entryId)
    }))
  },

  // Get entries for a tracker
  getEntries: (trackerId: string) => {
    let data: Record<string, TrackerEntry[]> = {}
    trackerData.subscribe(current => data = current)()
    return data[trackerId] || []
  },

  // Get entries filtered by time period
  getEntriesByPeriod: (trackerId: string, period: 'daily' | 'weekly' | 'monthly' | 'other') => {
    const entries = trackerActions.getEntries(trackerId)
    return entries.filter(entry => entry.period === period)
  }
}