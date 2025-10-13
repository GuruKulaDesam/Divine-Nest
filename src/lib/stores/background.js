import { writable } from 'svelte/store';
import { secureStorage, StorageKeys } from '../utils/secureStorage.js';

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
  GRADIENT: 'gradient',
  FOREST: 'forest',
  OCEAN: 'ocean',
  SUNSET: 'sunset',
  DAWN: 'dawn',
  NIGHT: 'night',
  DESERT: 'desert',
  SNOW: 'snow',
  AUTUMN: 'autumn'
};

// Initialize with default value for SSR compatibility
export const background = writable(BACKGROUNDS.NATURE);

// Background actions
export const backgroundActions = {
  init: () => {
    if (browser) {
      const stored = secureStorage.getItem(StorageKeys.BACKGROUND, false);
      if (stored && Object.values(BACKGROUNDS).includes(stored)) {
        background.set(stored);
      }
    }
  },
  toggle: () => {
    background.update(current => {
      // Cycle through all backgrounds
      const backgrounds = Object.values(BACKGROUNDS);
      const currentIndex = backgrounds.indexOf(current);
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      const newBackground = backgrounds[nextIndex];

      if (browser) {
        secureStorage.setItem(StorageKeys.BACKGROUND, newBackground, false);
        updateBackground(newBackground);
      }
      return newBackground;
    });
  },

  set: (newBackground) => {
    if (Object.values(BACKGROUNDS).includes(newBackground)) {
      background.set(newBackground);
      if (browser) {
        secureStorage.setItem(StorageKeys.BACKGROUND, newBackground, false);
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
    case BACKGROUNDS.FOREST:
      layout.classList.add('forest-background');
      break;
    case BACKGROUNDS.OCEAN:
      layout.classList.add('ocean-background');
      break;
    case BACKGROUNDS.SUNSET:
      layout.classList.add('sunset-background');
      break;
    case BACKGROUNDS.DAWN:
      layout.classList.add('dawn-background');
      break;
    case BACKGROUNDS.NIGHT:
      layout.classList.add('night-background');
      break;
    case BACKGROUNDS.DESERT:
      layout.classList.add('desert-background');
      break;
    case BACKGROUNDS.SNOW:
      layout.classList.add('snow-background');
      break;
    case BACKGROUNDS.AUTUMN:
      layout.classList.add('autumn-background');
      break;
  }
}