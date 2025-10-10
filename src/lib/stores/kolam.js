import { writable } from 'svelte/store';

const initialState = {
  currentPattern: null,
  strokes: [],
  selectedColor: '#8B4513', // Saddle brown
  brushSize: 3,
  symmetryMode: true,
  practiceMode: 'free',
  difficulty: 'beginner',
  progress: {
    sessions: 0,
    totalStrokes: 0,
    completedPatterns: 0,
    timeSpent: 0,
    achievements: [],
    streak: 0
  },
  isDrawing: false,
  showGrid: true,
  showGuidelines: true
};

export const kolamStore = writable(initialState);

// Helper functions for store management
export function addStroke(stroke) {
  kolamStore.update(state => ({
    ...state,
    strokes: [...state.strokes, {
      ...stroke,
      id: Date.now().toString(),
      timestamp: Date.now()
    }],
    progress: {
      ...state.progress,
      totalStrokes: state.progress.totalStrokes + 1
    }
  }));
}

export function clearStrokes() {
  kolamStore.update(state => ({
    ...state,
    strokes: []
  }));
}

export function undoLastStroke() {
  kolamStore.update(state => ({
    ...state,
    strokes: state.strokes.slice(0, -1)
  }));
}

export function setCurrentPattern(pattern) {
  kolamStore.update(state => ({
    ...state,
    currentPattern: pattern,
    strokes: [] // Clear strokes when changing pattern
  }));
}

export function updateProgress(updates) {
  kolamStore.update(state => ({
    ...state,
    progress: { ...state.progress, ...updates }
  }));
}

export function resetKolam() {
  kolamStore.set(initialState);
}