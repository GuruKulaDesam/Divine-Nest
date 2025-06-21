import { writable, readable } from 'svelte/store';

// Get the base path for GitHub Pages
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    // If we're on GitHub Pages, strip the repo name from the path
    if (path.startsWith('/takeka/')) {
      return '/takeka';
    }
  }
  return '';
};

// Helper function to get the route path without base
const getRoutePath = () => {
  if (typeof window === 'undefined') return '/';
  const basePath = getBasePath();
  const fullPath = window.location.pathname;
  return fullPath.startsWith(basePath) ? fullPath.slice(basePath.length) || '/' : fullPath;
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
    const basePath = getBasePath();
    const fullPath = basePath + (path === '/' ? '' : path);
    
    if (updateHistory) {
      window.history.pushState({}, '', fullPath);
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
  const basePath = getBasePath();
  const fullPath = basePath + (path === '/' ? '' : path);
  window.history.pushState({}, '', fullPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
} 