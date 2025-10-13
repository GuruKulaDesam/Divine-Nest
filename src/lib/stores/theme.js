import { writable } from 'svelte/store';

// Check if we're in a browser environment
const browser = typeof window !== 'undefined';

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  TRANSPARENT: 'transparent'
};

// Initialize with default value for SSR compatibility
export const theme = writable(THEMES.LIGHT);

// Theme actions
export const themeActions = {
  init: () => {
    if (browser) {
      const stored = localStorage.getItem('theme');
      if (stored && Object.values(THEMES).includes(stored)) {
        theme.set(stored);
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme.set(THEMES.DARK);
          document.documentElement.setAttribute('data-theme', THEMES.DARK);
        } else {
          document.documentElement.setAttribute('data-theme', THEMES.LIGHT);
        }
      }
    }
  },
  toggle: () => {
    theme.update(current => {
      // Cycle through all themes
      const themes = Object.values(THEMES);
      const currentIndex = themes.indexOf(current);
      const nextIndex = (currentIndex + 1) % themes.length;
      const newTheme = themes[nextIndex];
      
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