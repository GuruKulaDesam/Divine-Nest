import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

// User profile store
export interface UserProfile {
  name: string;
  familyName: string;
  role: string;
  location: string;
  isSetupComplete: boolean;
}

const defaultProfile: UserProfile = {
  name: '',
  familyName: 'Family',
  role: '',
  location: '',
  isSetupComplete: false
};

// Initialize with default values for SSR compatibility
export const userProfile = writable<UserProfile>(defaultProfile);

// Actions for user profile
export const userProfileActions = {
  updateProfile: (profile: Partial<UserProfile>) => {
    if (browser) {
      const current = get(userProfile);
      const updated = { ...current, ...profile };
      userProfile.set(updated);

      // Persist to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updated));
    }
  },

  loadProfile: () => {
    if (browser) {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        try {
          const profile = JSON.parse(stored);
          userProfile.set(profile);
        } catch (error) {
          console.warn('Failed to load user profile from localStorage:', error);
        }
      }
    }
  },

  resetProfile: () => {
    if (browser) {
      userProfile.set(defaultProfile);
      localStorage.removeItem('userProfile');
    }
  }
};

// Load profile on initialization
if (browser) {
  userProfileActions.loadProfile();
}