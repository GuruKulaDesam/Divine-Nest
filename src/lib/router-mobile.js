import { writable } from 'svelte/store';

// Create stores for routing
const currentRoute = writable(window.location.pathname);
const navigationHistory = writable([]);
const isLoading = writable(false);

// Route groups for better organization
const routeGroups = {
  // Home & Family
  home: {
    '/': 'home',
    '/household': 'household',
    '/members': 'members',
    '/inventory': 'inventory',
    '/vehicles': 'vehicles',
    '/family-calendar-modern': 'family-calendar-modern',
    '/family-notes-modern': 'family-notes-modern',
    '/reminders': 'reminders',
    '/directory': 'directory',
    '/home-services': 'home-services',
  },

  // Daily Life
  daily: {
    '/schedule': 'schedule',
    '/emergency': 'emergency',
    '/family-notifications': 'family-notifications',
    '/weather': 'weather',
    '/rituals': 'rituals',
    '/lifeflow': 'lifeflow',
  },

  // Learning & Education
  learn: {
    '/education': 'education',
    '/study-plans': 'study-plans',
    '/library': 'library',
    '/learning-goals': 'learning-goals',
    '/education/students': 'education-students',
    '/education/curriculum': 'education-curriculum',
    '/education/planner': 'education-planner',
    '/education/quiz': 'education-quiz',
    '/education/assessment': 'education-assessment',
    '/education/courses': 'education-courses',
    '/education/mentors': 'education-mentors',
    '/education/achievements': 'education-achievements',
  },

  // Health & Care
  care: {
    '/wellness': 'wellness',
    '/kitchen': 'kitchen',
    '/recipes': 'recipes',
    '/yoga': 'yoga',
    '/journal': 'journal',
    '/kitchen/dashboard': 'kitchen-dashboard',
    '/kitchen/pantry': 'kitchen-pantry',
    '/kitchen/meals': 'kitchen-meals',
    '/kitchen/kids': 'kitchen-kids',
    '/kitchen/recipes': 'kitchen-recipes',
    '/kitchen/cleaning': 'kitchen-cleaning',
    '/kitchen/vendors': 'kitchen-vendors',
    '/health': 'health',
    '/health/records': 'health-records',
    '/health/appointments': 'health-appointments',
    '/health/medications': 'health-medications',
    '/health/vitals': 'health-vitals',
    '/health/emergency': 'health-emergency',
    '/health/insurance': 'health-insurance',
    '/health/doctors': 'health-doctors',
    '/health/lab-results': 'health-lab-results',
    '/health/preventive-care': 'health-preventive-care',
    '/health/mental-health': 'health-mental-health',
    '/health/nutrition': 'health-nutrition',
    '/health/fitness': 'health-fitness',
    '/health/sleep': 'health-sleep',
    '/health/habits': 'health-habits',
    '/hobbies-activities': 'hobbies-activities',
  },

  // Management & Finance
  manage: {
    '/finances': 'finances',
    '/assets': 'assets',
    '/travel': 'travel',
    '/contacts': 'contacts',
    '/settings': 'settings',
    '/profile': 'profile',
    '/finance/expenses': 'finance-expenses',
    '/finance/budget': 'finance-budget',
    '/finance/savings': 'finance-savings',
    '/finance/wealth': 'finance-wealth',
    '/assets/items': 'assets-items',
    '/assets/value': 'assets-value',
    '/assets/maintenance': 'assets-maintenance',
    '/assets/documents': 'assets-documents',
    '/trips': 'trips',
    '/leisure': 'leisure',
    '/analytics': 'analytics',
    '/charts': 'charts',
    '/maps': 'maps',
    '/products': 'products',
    '/users': 'users',
    '/project-management': 'project-management',
  },

  // Auth & Special Pages
  auth: {
    '/auth/login': 'auth-login',
    '/auth/login-v2': 'auth-login-v2',
    '/auth/login-v3': 'auth-login-v3',
    '/auth/register': 'auth-register',
    '/auth/register-v2': 'auth-register-v2',
    '/auth/register-v3': 'auth-register-v3',
  },

  // Test & Development Pages
  test: {
    '/test/navigation': 'test-navigation',
    '/test/view-mode': 'view-mode-test',
  }
};

// Flatten all routes for easy lookup
const allRoutes = Object.values(routeGroups).reduce((acc, group) => ({ ...acc, ...group }), {});

// Component cache for better performance
const componentCache = new Map();

// Navigation function with lazy loading
async function navigate(path) {
  console.log('Navigate called with path:', path);
  if (path === getPath()) return;

  try {
    isLoading.set(true);

    // Check if component is cached
    let component = componentCache.get(path);
    console.log('Component in cache:', component);

    if (!component) {
      // Find the route loader
      const routeLoader = allRoutes[path];
      console.log('Route loader found:', routeLoader);
      console.log('Available routes:', Object.keys(allRoutes));

      if (routeLoader) {
        console.log('Route found, returning component identifier:', routeLoader);
        component = routeLoader;
        componentCache.set(path, component);
      }
    }

    if (component) {
      // Update route
      window.history.pushState({}, '', path);
      currentRoute.set(path);

      // Update navigation history
      navigationHistory.update(history => [...history, { path, timestamp: Date.now() }]);

      return component;
    } else {
      // Handle 404
      console.warn(`Route not found: ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`Error loading route ${path}:`, error);
    return null;
  } finally {
    isLoading.set(false);
  }
}

// Helper function to get the route path
function getPath() {
  return window.location.pathname;
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  currentRoute.set(path);
});

// Handle initial load
window.addEventListener('load', () => {
  const path = window.location.pathname;
  currentRoute.set(path);
});

// Get route group for a path
function getRouteGroup(path) {
  for (const [groupName, routes] of Object.entries(routeGroups)) {
    if (routes[path]) {
      return groupName;
    }
  }
  return 'home'; // default
}

// Get all routes in a group
function getRoutesInGroup(groupName) {
  return routeGroups[groupName] || {};
}

// Get navigation suggestions based on current route
function getNavigationSuggestions(currentPath) {
  const currentGroup = getRouteGroup(currentPath);
  const groupRoutes = getRoutesInGroup(currentGroup);

  return Object.keys(groupRoutes).filter(route => route !== currentPath);
}

// Export everything needed
export {
  navigate,
  getPath,
  getRouteGroup,
  getRoutesInGroup,
  getNavigationSuggestions,
  currentRoute,
  navigationHistory,
  isLoading,
  routeGroups,
  allRoutes
};