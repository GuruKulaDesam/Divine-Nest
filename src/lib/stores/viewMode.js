import { writable } from "svelte/store";
import { browser } from "$app/environment";

// View mode store - can be 'auto', 'mobile', or 'desktop'
export const viewMode = writable("auto");

// Initialize from localStorage if available
if (browser) {
  const saved = localStorage.getItem('layout-preference') || 'auto';
  viewMode.set(saved);
}

// Subscribe to changes and save to localStorage
viewMode.subscribe(value => {
  if (browser) {
    localStorage.setItem('layout-preference', value);
  }
});

// Helper functions
export const viewModeActions = {
  setAuto: () => viewMode.set('auto'),
  setMobile: () => viewMode.set('mobile'),
  setDesktop: () => viewMode.set('desktop'),
  toggle: () => {
    viewMode.update(current => {
      if (current === 'auto') return 'mobile';
      if (current === 'mobile') return 'desktop';
      return 'auto';
    });
  }
};