import { writable, readable } from 'svelte/store';

// Helper function to get the route path
const getRoutePath = () => {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname;
};

// Create a writable store for the current route
export const currentRoute = writable('/');

export const route = readable(getRoutePath(), set => {
  const update = () => set(getRoutePath());
  window.addEventListener('popstate', update);
  return () => window.removeEventListener('popstate', update);
});

// Router class
class Router {
  constructor() {
    this.routes = new Map();
    this.currentComponent = null;
    
    // Listen for browser navigation
    window.addEventListener('popstate', () => {
      this.navigate(getRoutePath(), false);
    });
    
    // Initialize with current path
    this.navigate(getRoutePath(), false);
  }
  
  // Add a route
  add(path, component) {
    this.routes.set(path, component);
  }
  
  // Navigate to a route
  navigate(path, updateHistory = true) {
    if (updateHistory) {
      window.history.pushState({}, '', path);
    }
    
    currentRoute.set(path);
    
    // Find the matching route
    let component = this.routes.get(path);
    
    // If no exact match, try to find a catch-all route
    if (!component) {
      component = this.routes.get('*');
    }
    
    this.currentComponent = component;
  }
  
  // Get current component
  getCurrentComponent() {
    return this.currentComponent;
  }
}

// Create and export router instance
export const router = new Router();

export function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
} 