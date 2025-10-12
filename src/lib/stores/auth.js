import { writable } from 'svelte/store';
import { secureStorage, StorageKeys } from '$lib/utils/secureStorage';

// Simple authentication state management
export const isAuthenticated = writable(false);
export const currentUser = writable(null);

// Authentication actions
export const authActions = {
  login: (userData) => {
    isAuthenticated.set(true);
    currentUser.set(userData);
    secureStorage.setItem(StorageKeys.AUTH_USER, userData, true); // Encrypt sensitive user data
  },

  logout: () => {
    isAuthenticated.set(false);
    currentUser.set(null);
    secureStorage.removeItem(StorageKeys.AUTH_USER);
  },

  init: () => {
    // Check if user is already logged in
    const storedUser = secureStorage.getItem(StorageKeys.AUTH_USER, true); // Decrypt sensitive data
    if (storedUser) {
      try {
        isAuthenticated.set(true);
        currentUser.set(storedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        secureStorage.removeItem(StorageKeys.AUTH_USER);
      }
    }
  }
};