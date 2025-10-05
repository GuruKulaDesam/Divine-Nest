import { writable } from 'svelte/store';

// Simple authentication state management
export const isAuthenticated = writable(false);
export const currentUser = writable(null);

// Authentication actions
export const authActions = {
  login: (userData) => {
    isAuthenticated.set(true);
    currentUser.set(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  },
  
  logout: () => {
    isAuthenticated.set(false);
    currentUser.set(null);
    localStorage.removeItem('auth_user');
  },
  
  init: () => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        isAuthenticated.set(true);
        currentUser.set(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }
};