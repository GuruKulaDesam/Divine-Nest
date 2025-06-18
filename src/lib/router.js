import { writable, readable } from 'svelte/store';

// Create a writable store for the current route
export const currentRoute = writable('/');

export const route = readable(window.location.pathname, set => {
  const update = () => set(window.location.pathname);
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
      this.navigate(window.location.pathname, false);
    });
    
    // Initialize with current path
    this.navigate(window.location.pathname, false);
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