import { writable } from 'svelte/store';

// Lazy-loaded page components for better performance
const lazyPages = {
  HomePage: () => import('./pages/HomePage.svelte'),
  UsersPage: () => import('./pages/UsersPage.svelte'),
  ProductsPage: () => import('./pages/ProductsPage.svelte'),
  AnalyticsPage: () => import('./pages/AnalyticsPage.svelte'),
  ProjectManagementPage: () => import('./pages/ProjectManagementPage.svelte'),
  MapsPage: () => import('./pages/MapsPage.svelte'),
  SchedulePage: () => import('./pages/SchedulePage.svelte'),
  ProfilePage: () => import('./pages/ProfilePage.svelte'),
  SettingsPage: () => import('./pages/SettingsPage.svelte'),
  LoginPage: () => import('./pages/LoginPage.svelte'),
  LoginV2: () => import('./pages/LoginV2.svelte'),
  LoginV3: () => import('./pages/LoginV3.svelte'),
  RegisterPage: () => import('./pages/RegisterPage.svelte'),
  RegisterV2: () => import('./pages/RegisterV2.svelte'),
  RegisterV3: () => import('./pages/RegisterV3.svelte'),
  NotFoundPage: () => import('./pages/NotFoundPage.svelte'),
  ChartsPage: () => import('./pages/ChartsPage.svelte'),
  GanttPage: () => import('./pages/GanttPage.svelte'),
  FamilyCalendarModernPage: () => import('./pages/FamilyCalendarModernPage.svelte'),
  FamilyNotesModernPage: () => import('./pages/FamilyNotesModernPage.svelte'),
  RemindersPage: () => import('./pages/RemindersPage.svelte'),
  FinancesPageEnhanced: () => import('./pages/FinancesPageEnhanced.svelte'),
  EducationPage: () => import('./pages/EducationPage.svelte'),
  KitchenPage: () => import('./pages/KitchenPage.svelte'),
  TamilPanchangamPage: () => import('./pages/TamilPanchangamPage.svelte'),
  HobbiesActivitiesPage: () => import('./pages/HobbiesActivitiesPage.svelte'),
  HouseholdPage: () => import('./pages/HouseholdPage.svelte'),
  ContactsPage: () => import('./pages/ContactsPage.svelte'),
  EmergencyContactsPage: () => import('./pages/EmergencyContactsPage.svelte'),
  IssuesEmergencySituationsPage: () => import('./pages/IssuesEmergencySituationsPage.svelte'),
  IssuesUrgentPage: () => import('./pages/IssuesUrgentPage.svelte'),
  IssuesRepairsPage: () => import('./pages/IssuesRepairsPage.svelte'),
  IssuesMaintenancePage: () => import('./pages/IssuesMaintenancePage.svelte'),
  IssuesUpgradesPage: () => import('./pages/IssuesUpgradesPage.svelte'),
  RequestsPage: () => import('./pages/RequestsPage.svelte'),
  HealthPage: () => import('./pages/HealthPage.svelte'),
  YogaExercisePage: () => import('./pages/YogaExercisePage.svelte'),
  HealthJournalPage: () => import('./pages/HealthJournalPage.svelte'),
  TravelPage: () => import('./pages/TravelPage.svelte'),
  TripHistoryPage: () => import('./pages/TripHistoryPage.svelte'),
  LeisureCommunityPage: () => import('./pages/LeisureCommunityPage.svelte'),
  FamilyStoriesPage: () => import('./pages/FamilyStoriesPage.svelte'),
  LegacyMemoryPage: () => import('./pages/LegacyMemoryPage.svelte'),
  EmotionsFeelingsPage: () => import('./pages/EmotionsFeelingsPage.svelte'),
  FamilyGovernancePage: () => import('./pages/FamilyGovernancePage.svelte'),
  TemplePage: () => import('./pages/TemplePage.svelte'),
  AssetsPage: () => import('./pages/AssetsPage.svelte'),
  AssetsItemsPage: () => import('./pages/AssetsItemsPage.svelte'),
  AssetsValuePage: () => import('./pages/AssetsValuePage.svelte'),
  AssetsMaintenancePage: () => import('./pages/AssetsMaintenancePage.svelte'),
  AssetsDocumentsPage: () => import('./pages/AssetsDocumentsPage.svelte'),
  GroceryPage: () => import('./pages/GroceryPage.svelte'),
  LibraryPage: () => import('./pages/LibraryPage.svelte'),
  StudiesPage: () => import('./pages/StudiesPage.svelte'),
  LearningGoalsPage: () => import('./pages/LearningGoalsPage.svelte'),
  GradesTrackerPage: () => import('./pages/GradesTrackerPage.svelte'),
  AssistantPage: () => import('./pages/AssistantPage.svelte'),
  VoiceLogPage: () => import('./pages/VoiceLogPage.svelte'),
  TaskBoardPage: () => import('./pages/TaskBoardPage.svelte'),
  EventFeedPage: () => import('./pages/EventFeedPage.svelte'),
  AutoChecklistPage: () => import('./pages/AutoChecklistPage.svelte'),
  AmbientLogPage: () => import('./pages/AmbientLogPage.svelte'),
  FestivalCalendarPage: () => import('./pages/FestivalCalendarPage.svelte'),
  MantrasPage: () => import('./pages/MantrasPage.svelte'),
  WeatherPage: () => import('./pages/WeatherPage.svelte'),
  ViewModeTestPage: () => import('./pages/ViewModeTestPage.svelte')
};

// Cache for loaded components
const componentCache = new Map();

// Performance monitoring
const performanceMetrics = {
  navigationCount: 0,
  totalNavigationTime: 0,
  averageNavigationTime: 0,
  slowestNavigation: 0,
  failedNavigations: 0
};

// Create stores for routing
const currentRoute = writable(window.location.pathname);
const navigationHistory = writable([]);
const currentComponent = writable(null); // Start with null for lazy loading
const isNavigating = writable(false);
const navigationQueue = writable([]);

// Define routes
const routes = {
  '/': 'HomePage',
  '/users': 'UsersPage',
  '/products': 'ProductsPage',
  '/analytics': 'AnalyticsPage',
  '/projects': 'ProjectManagementPage',
  '/gantt': 'GanttPage',
  '/maps': 'MapsPage',
  '/schedule': 'SchedulePage',
  '/profile': 'ProfilePage',
  '/settings': 'SettingsPage',
  '/view-mode-test': 'HomePage',
  '/auth/login': 'LoginPage',
  '/auth/login-v2': 'LoginV2',
  '/auth/login-v3': 'LoginV3',
  '/auth/register': 'RegisterPage',
  '/auth/register-v2': 'RegisterV2',
  '/auth/register-v3': 'RegisterV3',
  '/charts': 'ChartsPage',
  '/family-calendar-modern': 'FamilyCalendarModernPage',
  '/family-notes-modern': 'FamilyNotesModernPage',
  '/reminders': 'RemindersPage',
  '/finances': 'FinancesPageEnhanced',
  '/recharges': 'FinancesPageEnhanced',
  '/expenses': 'FinancesPageEnhanced',
  '/budget': 'FinancesPageEnhanced',
  '/insurance': 'FinancesPageEnhanced',
  '/family-members': 'FinancesPageEnhanced',
  '/finance/expenses': 'FinancesPageEnhanced',
  '/finance/budget': 'FinancesPageEnhanced',
  '/finance/savings': 'FinancesPageEnhanced',
  '/finance/wealth': 'FinancesPageEnhanced',
  '/finance/recharges': 'FinancesPageEnhanced',
  '/finance/insurance': 'FinancesPageEnhanced',
  '/finance/property': 'FinancesPageEnhanced',
  '/finance/milestones': 'FinancesPageEnhanced',
  '/finance/festivals': 'FinancesPageEnhanced',
  '/finance/gifts': 'FinancesPageEnhanced',
  '/finance/vendors': 'FinancesPageEnhanced',
  '/finance/documents': 'FinancesPageEnhanced',
  '/finance/resilience': 'FinancesPageEnhanced',
  '/finance/income': 'FinancesPageEnhanced',
  '/finance/ai': 'FinancesPageEnhanced',
  '/education': 'EducationPage',
  '/education/dashboard': 'EducationPage',
  '/education/students': 'EducationPage',
  '/education/curriculum': 'EducationPage',
  '/education/planner': 'EducationPage',
  '/education/quiz': 'EducationPage',
  '/education/assessment': 'EducationPage',
  '/education/courses': 'EducationPage',
  '/education/mentors': 'EducationPage',
  '/education/achievements': 'EducationPage',
  '/education/archive': 'EducationPage',
  '/education/grades-tracker': 'GradesTrackerPage',
  '/assistant': 'AssistantPage',
  '/assistant/voice-log': 'VoiceLogPage',
  '/assistant/task-board': 'TaskBoardPage',
  '/assistant/event-feed': 'EventFeedPage',
  '/assistant/auto-checklist': 'AutoChecklistPage',
  '/assistant/ambient-log': 'AmbientLogPage',
  '/kitchen': 'KitchenPage',
  '/kitchen/dashboard': 'KitchenPage',
  '/kitchen/pantry': 'KitchenPage',
  '/kitchen/fresh': 'KitchenPage',
  '/kitchen/meals': 'KitchenPage',
  '/kitchen/kids': 'KitchenPage',
  '/kitchen/recipes': 'KitchenPage',
  '/kitchen/cleaning': 'KitchenPage',
  '/kitchen/vendors': 'KitchenPage',
  '/kitchen/wellness': 'KitchenPage',
  '/kitchen/festivals': 'KitchenPage',
  '/tamil-panchangam': 'TamilPanchangamPage',
  '/hobbies-activities': 'HobbiesActivitiesPage',

  // Dashboard/Home routes
  '/household': 'HouseholdPage',
  '/members': 'UsersPage',
  '/inventory': 'ProductsPage',
  '/vehicles': 'AssetsPage',

  // Divinity routes
  '/rituals': 'TemplePage',
  '/temple': 'TemplePage',
  '/festival-calendar': 'FestivalCalendarPage',
  '/mantras': 'MantrasPage',

  // Contacts routes
  '/contacts': 'ContactsPage',
  '/emergency': 'EmergencyContactsPage',
  '/vendors': 'ContactsPage',
  '/directory': 'ContactsPage',

  // Food routes
  '/meals': 'KitchenPage',
  '/recipes': 'KitchenPage',
  '/grocery': 'GroceryPage',
  '/pantry': 'KitchenPage',

  // Education routes
  '/library': 'LibraryPage',
  '/studies': 'StudiesPage',
  '/learning-goals': 'LearningGoalsPage',
  '/study-plans': 'EducationPage',

  // Health routes
  '/wellness': 'HealthPage',
  '/health': 'HealthPage',
  '/yoga': 'YogaExercisePage',
  '/journal': 'HealthJournalPage',

  // Finances routes
  '/investments': 'FinancesPageEnhanced',

  // Assets routes
  '/assets': 'AssetsPage',
  '/assets/items': 'AssetsItemsPage',
  '/assets/value': 'AssetsValuePage',
  '/assets/maintenance': 'AssetsMaintenancePage',
  '/assets/documents': 'AssetsDocumentsPage',

  // Issues routes
  '/issues-emergency': 'IssuesEmergencySituationsPage',
  '/urgent': 'IssuesUrgentPage',
  '/repairs': 'IssuesRepairsPage',
  '/maintenance': 'IssuesMaintenancePage',
  '/upgrades': 'IssuesUpgradesPage',
  '/requests': 'RequestsPage',

  // Memories routes
  '/lifeflow': 'FamilyStoriesPage',
  '/family-stories': 'FamilyStoriesPage',
  '/legacy': 'LegacyMemoryPage',
  '/emotions': 'EmotionsFeelingsPage',
  '/family-governance': 'FamilyGovernancePage',

  // Travel routes
  '/travel': 'TravelPage',
  '/trips': 'TripHistoryPage',
  '/leisure': 'LeisureCommunityPage',
  '/community': 'LeisureCommunityPage',

  // Weather route
  '/weather': 'WeatherPage',

  '*': 'NotFoundPage'
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
    this.isTransitioning = false;
    this.transitionDuration = 0; // ms - removed transitions for faster navigation

    // Initialize all routes
    Object.entries(routes).forEach(([path, componentName]) => {
      this.add(path, componentName);
    });

    // Listen for browser navigation
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false);
    });

    // Initialize with current path - don't navigate here, let App.svelte handle it
  }

  // Add a route
  add(path, componentName) {
    this.routes.set(path, componentName);
  }

  // Navigate to a route with lazy loading and performance monitoring
  async navigate(path, updateHistory = true) {
    const startTime = performance.now();
    // Prevent multiple simultaneous navigations
    if (this.isTransitioning) {
      console.log('Navigation in progress, queuing:', path);
      navigationQueue.update(queue => [...queue, { path, updateHistory }]);
      return;
    }

    // Set navigation state
    this.isTransitioning = true;
    isNavigating.set(true);

    try {
      // Immediate navigation without delay
      if (updateHistory) {
        window.history.pushState({}, '', path);
      }

      currentRoute.set(path);

      // Find the matching route
      let componentName = this.routes.get(path);

      // If no exact match, try to find a catch-all route
      if (!componentName) {
        componentName = this.routes.get('*');
      }

      // Load component lazily
      if (componentName && lazyPages[componentName]) {
        try {
          // Check cache first
          if (componentCache.has(componentName)) {
            currentComponent.set(componentCache.get(componentName));
          } else {
            // Load the component dynamically
            const module = await lazyPages[componentName]();
            const component = module.default;
            componentCache.set(componentName, component);
            currentComponent.set(component);
          }
        } catch (error) {
          console.error(`Failed to load component ${componentName}:`, error);
          performanceMetrics.failedNavigations++;
          // Fallback to NotFoundPage
          if (componentName !== 'NotFoundPage') {
            const module = await lazyPages['NotFoundPage']();
            currentComponent.set(module.default);
          }
        }
      } else {
        console.warn(`No component found for path: ${path}`);
        // Fallback to NotFoundPage
        try {
          const module = await lazyPages['NotFoundPage']();
          currentComponent.set(module.default);
        } catch (error) {
          console.error('Failed to load NotFoundPage:', error);
        }
      }

      // Update performance metrics
      const endTime = performance.now();
      const navigationTime = endTime - startTime;
      performanceMetrics.navigationCount++;
      performanceMetrics.totalNavigationTime += navigationTime;
      performanceMetrics.averageNavigationTime = performanceMetrics.totalNavigationTime / performanceMetrics.navigationCount;
      performanceMetrics.slowestNavigation = Math.max(performanceMetrics.slowestNavigation, navigationTime);

      console.log(`Navigation to ${path} completed in ${navigationTime.toFixed(2)}ms`);

    } finally {
      // Reset navigation state immediately
      this.isTransitioning = false;
      isNavigating.set(false);

      // Process queued navigation if any
      navigationQueue.update(queue => {
        if (queue.length > 0) {
          const next = queue.shift();
          setTimeout(() => this.navigate(next.path, next.updateHistory), 0);
        }
        return queue;
      });
    }
  }

  // Check if navigation is in progress
  isCurrentlyNavigating() {
    return this.isTransitioning;
  }

  // Get performance metrics
  getPerformanceMetrics() {
    return { ...performanceMetrics };
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
  currentComponent,
  isNavigating,
  navigationQueue,
  navigate
};