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
      const stored = secureStorage.getItem(StorageKeys.BACKGROUND, false);
      if (stored && Object.values(BACKGROUNDS).includes(stored)) {
        background.set(stored);
        updateBackground(stored);
      } else {
        // Default to nature background
        background.set(BACKGROUNDS.NATURE);
        updateBackground(BACKGROUNDS.NATURE);
      }
    }
  }
};

// Update background CSS
function updateBackground(bg) {
  if (!browser) return;

  // Find the background layer element
  const backgroundLayer = document.querySelector('.nature-background') ||
                         document.querySelector('.mountain-background') ||
                         document.querySelector('.minimal-background') ||
                         document.querySelector('[class*="background"]');

  if (!backgroundLayer) {
    console.warn('Background layer not found');
    return;
  }

  // Remove existing background classes
  backgroundLayer.classList.remove(
    'nature-background', 'mountain-background', 'minimal-background',
    'dark-background', 'light-background', 'gradient-background',
    'forest-background', 'ocean-background', 'sunset-background',
    'dawn-background', 'night-background', 'desert-background',
    'snow-background', 'autumn-background'
  );

  // Apply new background based on selection
  switch (bg) {
    case BACKGROUNDS.TRANSPARENT:
      backgroundLayer.style.backgroundImage = 'none';
      backgroundLayer.style.background = 'transparent';
      backgroundLayer.classList.add('transparent-background');
      break;
    case BACKGROUNDS.MOUNTAIN:
      backgroundLayer.classList.add('mountain-background');
      break;
    case BACKGROUNDS.NATURE:
      backgroundLayer.classList.add('nature-background');
      break;
    case BACKGROUNDS.MINIMAL:
      backgroundLayer.classList.add('minimal-background');
      break;
    case BACKGROUNDS.DARK:
      backgroundLayer.classList.add('dark-background');
      break;
    case BACKGROUNDS.LIGHT:
      backgroundLayer.classList.add('light-background');
      break;
    case BACKGROUNDS.GRADIENT:
      backgroundLayer.classList.add('gradient-background');
      break;
    case BACKGROUNDS.FOREST:
      backgroundLayer.classList.add('forest-background');
      break;
    case BACKGROUNDS.OCEAN:
      backgroundLayer.classList.add('ocean-background');
      break;
    case BACKGROUNDS.SUNSET:
      backgroundLayer.classList.add('sunset-background');
      break;
    case BACKGROUNDS.DAWN:
      backgroundLayer.classList.add('dawn-background');
      break;
    case BACKGROUNDS.NIGHT:
      backgroundLayer.classList.add('night-background');
      break;
    case BACKGROUNDS.DESERT:
      backgroundLayer.classList.add('desert-background');
      break;
    case BACKGROUNDS.SNOW:
      backgroundLayer.classList.add('snow-background');
      break;
    case BACKGROUNDS.AUTUMN:
      backgroundLayer.classList.add('autumn-background');
      break;
    default:
      backgroundLayer.classList.add('nature-background');
  }
}