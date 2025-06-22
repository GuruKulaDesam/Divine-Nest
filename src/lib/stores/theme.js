import { writable } from 'svelte/store';

// Check if we're in a browser environment
const browser = typeof window !== 'undefined';

// Theme options
export const THEMES = {
  LIGHT: 'modern',
  DARK: 'dark'
};

// Get initial theme from localStorage or default to light
function getInitialTheme() {
  if (browser) {
    const stored = localStorage.getItem('theme');
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
  }
  return THEMES.LIGHT;
}

// Create the theme store
export const theme = writable(getInitialTheme());

// Theme actions
export const themeActions = {
  toggle: () => {
    theme.update(current => {
      const newTheme = current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      if (browser) {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      return newTheme;
    });
  },
  
  set: (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      theme.set(newTheme);
      if (browser) {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    }
  },
  
  init: () => {
    if (browser) {
      const current = getInitialTheme();
      document.documentElement.setAttribute('data-theme', current);
      theme.set(current);
      
      // Listen for system theme changes
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
          // Only update if user hasn't manually set a preference
          if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
            themeActions.set(newTheme);
          }
        });
      }
    }
  }
}; 