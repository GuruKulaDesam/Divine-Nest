import { writable } from 'svelte/store';

// Check if we're in a browser environment
const browser = typeof window !== 'undefined';

// Background options
export const BACKGROUNDS = {
  TRANSPARENT: 'transparent',
  MOUNTAIN: 'mountain',
  NATURE: 'nature',
  MINIMAL: 'minimal',
  DARK: 'dark',
  LIGHT: 'light',
  GRADIENT: 'gradient'
};

// Get initial background from localStorage or default to mountain
function getInitialBackground() {
  if (browser) {
    const stored = localStorage.getItem('background');
    if (stored && Object.values(BACKGROUNDS).includes(stored)) {
      return stored;
    }
  }
  return BACKGROUNDS.NATURE;
}

// Create the background store
export const background = writable(getInitialBackground());

// Background actions
export const backgroundActions = {
  toggle: () => {
    background.update(current => {
      // Cycle through all backgrounds
      const backgrounds = Object.values(BACKGROUNDS);
      const currentIndex = backgrounds.indexOf(current);
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      const newBackground = backgrounds[nextIndex];

      if (browser) {
        localStorage.setItem('background', newBackground);
        updateBackground(newBackground);
      }
      return newBackground;
    });
  },

  set: (newBackground) => {
    if (Object.values(BACKGROUNDS).includes(newBackground)) {
      background.set(newBackground);
      if (browser) {
        localStorage.setItem('background', newBackground);
        updateBackground(newBackground);
      }
    }
  },

  init: () => {
    if (browser) {
      const current = getInitialBackground();
      background.set(current);
      updateBackground(current);
    }
  }
};

// Update background CSS
function updateBackground(bg) {
  if (!browser) return;

  const body = document.body;
  const layout = document.querySelector('.nature-background') || document.querySelector('.mountain-background') || document.querySelector('.minimal-background');

  if (!layout) return;

  // Remove existing background classes
  layout.classList.remove('bg-transparent', 'mountain-background', 'nature-background', 'minimal-background', 'dark-background', 'light-background', 'gradient-background');

  // Apply new background
  switch (bg) {
    case BACKGROUNDS.TRANSPARENT:
      layout.style.backgroundImage = 'none';
      layout.style.background = 'transparent';
      break;
    case BACKGROUNDS.MOUNTAIN:
      layout.classList.add('mountain-background');
      break;
    case BACKGROUNDS.NATURE:
      layout.classList.add('nature-background');
      break;
    case BACKGROUNDS.MINIMAL:
      layout.classList.add('minimal-background');
      break;
    case BACKGROUNDS.DARK:
      layout.classList.add('dark-background');
      break;
    case BACKGROUNDS.LIGHT:
      layout.classList.add('light-background');
      break;
    case BACKGROUNDS.GRADIENT:
      layout.classList.add('gradient-background');
      break;
  }
}