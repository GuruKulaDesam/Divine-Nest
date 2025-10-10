import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface PeriodEntry {
  id: string;
  date: string;
  cycleDay: number;
  flow: 'light' | 'medium' | 'heavy' | 'spotting';
  symptoms: string[];
  mood: 'calm' | 'irritable' | 'sad' | 'energized' | 'neutral';
  notes: string;
  gratitude: string;
  rituals: string[];
}

export interface CycleData {
  startDate: string;
  averageLength: number;
  lastPeriodDate: string;
  nextPredictedDate: string;
}

const defaultCycleData: CycleData = {
  startDate: '',
  averageLength: 28,
  lastPeriodDate: '',
  nextPredictedDate: ''
};

const defaultEntries: PeriodEntry[] = [];

// Load from localStorage if in browser
function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (!browser) return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Save to localStorage
function saveToStorage<T>(key: string, value: T) {
  if (browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Period entries store
export const periodEntries = writable<PeriodEntry[]>(loadFromStorage('periodEntries', defaultEntries));

// Cycle data store
export const cycleData = writable<CycleData>(loadFromStorage('cycleData', defaultCycleData));

// Current cycle day
export const currentCycleDay = writable<number>(1);

// Emotional state
export const emotionalState = writable<string>('calm');

// Subscribe to changes and save to localStorage
periodEntries.subscribe(value => saveToStorage('periodEntries', value));
cycleData.subscribe(value => saveToStorage('cycleData', value));

// Helper functions
export function addPeriodEntry(entry: Omit<PeriodEntry, 'id'>) {
  const newEntry: PeriodEntry = {
    ...entry,
    id: Date.now().toString()
  };

  periodEntries.update(entries => [...entries, newEntry]);

  // Update cycle data
  cycleData.update(data => {
    if (!data.startDate || new Date(entry.date) < new Date(data.lastPeriodDate)) {
      return {
        ...data,
        startDate: entry.date,
        lastPeriodDate: entry.date
      };
    }
    return {
      ...data,
      lastPeriodDate: entry.date
    };
  });
}

export function updateCyclePredictions() {
  periodEntries.subscribe(entries => {
    if (entries.length < 2) return;

    // Calculate average cycle length
    const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const cycleLengths: number[] = [];

    for (let i = 1; i < sortedEntries.length; i++) {
      const prevDate = new Date(sortedEntries[i-1].date);
      const currDate = new Date(sortedEntries[i].date);
      const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      cycleLengths.push(diffDays);
    }

    if (cycleLengths.length > 0) {
      const avgLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);

      cycleData.update(data => ({
        ...data,
        averageLength: avgLength,
        nextPredictedDate: new Date(
          new Date(sortedEntries[sortedEntries.length - 1].date).getTime() + (avgLength * 24 * 60 * 60 * 1000)
        ).toISOString().split('T')[0]
      }));
    }
  });
}