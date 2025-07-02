import { writable } from 'svelte/store';
import HomePage from './pages/HomePage.svelte';
import UsersPage from './pages/UsersPage.svelte';
import ProductsPage from './pages/ProductsPage.svelte';
import AnalyticsPage from './pages/AnalyticsPage.svelte';
import ProjectManagementPage from './pages/ProjectManagementPage.svelte';
import MapsPage from './pages/MapsPage.svelte';
import SchedulePage from './pages/SchedulePage.svelte';
import ProfilePage from './pages/ProfilePage.svelte';
import SettingsPage from './pages/SettingsPage.svelte';
import LoginPage from './pages/LoginPage.svelte';
import LoginV2 from './pages/LoginV2.svelte';
import LoginV3 from './pages/LoginV3.svelte';
import RegisterPage from './pages/RegisterPage.svelte';
import RegisterV2 from './pages/RegisterV2.svelte';
import RegisterV3 from './pages/RegisterV3.svelte';
import NotFoundPage from './pages/NotFoundPage.svelte';
import ChartsPage from './pages/ChartsPage.svelte';

// Create stores for routing
const currentRoute = writable(window.location.pathname);
const navigationHistory = writable([]);

// Define routes
const routes = {
  '/': HomePage,
  '/users': UsersPage,
  '/products': ProductsPage,
  '/analytics': AnalyticsPage,
  '/projects': ProjectManagementPage,
  '/maps': MapsPage,
  '/schedule': SchedulePage,
  '/profile': ProfilePage,
  '/settings': SettingsPage,
  '/auth/login': LoginPage,
  '/auth/login-v2': LoginV2,
  '/auth/login-v3': LoginV3,
  '/auth/register': RegisterPage,
  '/auth/register-v2': RegisterV2,
  '/auth/register-v3': RegisterV3,
  '/charts': ChartsPage,
  '*': NotFoundPage
};

// Helper function to get the route path
function getPath() {
  return window.location.pathname;
}

// Navigation function
function navigate(path) {
  if (path === getPath()) return;
  router.navigate(path);
  
  // Update navigation history
  navigationHistory.update(history => [...history, path]);
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  router.navigate(window.location.pathname, false);
});

// Handle initial load
window.addEventListener('load', () => {
  router.navigate(window.location.pathname, false);
});

// Router class
class Router {
  constructor() {
    this.routes = new Map();
    this.currentComponent = null;
    
    // Initialize all routes
    Object.entries(routes).forEach(([path, component]) => {
      this.add(path, component);
    });
    
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

// Create router instance
const router = new Router();

// Export everything needed
export {
  router,
  routes,
  currentRoute,
  navigationHistory,
  navigate
}; 