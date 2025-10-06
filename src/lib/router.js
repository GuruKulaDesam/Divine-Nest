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
import GanttPage from './pages/GanttPage.svelte';
import FamilyCalendarModernPage from './pages/FamilyCalendarModernPage.svelte';
import FamilyNotesModernPage from './pages/FamilyNotesModernPage.svelte';
import RemindersPage from './pages/RemindersPage.svelte';
import FinancesPageEnhanced from './pages/FinancesPageEnhanced.svelte';
import EducationPage from './pages/EducationPage.svelte';
import KitchenPage from './pages/KitchenPage.svelte';
import TamilPanchangamPage from './pages/TamilPanchangamPage.svelte';
import HobbiesActivitiesPage from './pages/HobbiesActivitiesPage.svelte';

// Additional page imports
import HouseholdPage from './pages/HouseholdPage.svelte';
import ContactsPage from './pages/ContactsPage.svelte';
import IssuesEmergencyPage from './pages/IssuesEmergencyPage.svelte';
import IssuesUrgentPage from './pages/IssuesUrgentPage.svelte';
import IssuesRepairsPage from './pages/IssuesRepairsPage.svelte';
import IssuesMaintenancePage from './pages/IssuesMaintenancePage.svelte';
import RequestsPage from './pages/RequestsPage.svelte';
import HealthPage from './pages/HealthPage.svelte';
import YogaExercisePage from './pages/YogaExercisePage.svelte';
import HealthJournalPage from './pages/HealthJournalPage.svelte';
import TravelPage from './pages/TravelPage.svelte';
import TripHistoryPage from './pages/TripHistoryPage.svelte';
import LeisureCommunityPage from './pages/LeisureCommunityPage.svelte';
import FamilyStoriesPage from './pages/FamilyStoriesPage.svelte';
import LegacyMemoryPage from './pages/LegacyMemoryPage.svelte';
import EmotionsFeelingsPage from './pages/EmotionsFeelingsPage.svelte';
import FamilyGovernancePage from './pages/FamilyGovernancePage.svelte';
import TemplePage from './pages/TemplePage.svelte';
import FestivalCalendarPage from './pages/FestivalCalendarPage.svelte';
import MantrasPage from './pages/MantrasPage.svelte';
import GroceryPage from './pages/GroceryPage.svelte';
import LibraryPage from './pages/LibraryPage.svelte';
import StudiesPage from './pages/StudiesPage.svelte';
import LearningGoalsPage from './pages/LearningGoalsPage.svelte';
import WeatherPage from './pages/WeatherPage.svelte';
import AssetsPage from './pages/AssetsPage.svelte';

// Create stores for routing
const currentRoute = writable(window.location.pathname);
const navigationHistory = writable([]);
const currentComponent = writable(HomePage);

// Define routes
const routes = {
  '/': HomePage,
  '/users': UsersPage,
  '/products': ProductsPage,
  '/analytics': AnalyticsPage,
  '/projects': ProjectManagementPage,
  '/gantt': GanttPage,
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
  '/family-calendar-modern': FamilyCalendarModernPage,
  '/family-notes-modern': FamilyNotesModernPage,
  '/reminders': RemindersPage,
  '/finances': FinancesPageEnhanced,
  '/recharges': FinancesPageEnhanced,
  '/expenses': FinancesPageEnhanced,
  '/budget': FinancesPageEnhanced,
  '/insurance': FinancesPageEnhanced,
  '/family-members': FinancesPageEnhanced,
  '/finance/expenses': FinancesPageEnhanced,
  '/finance/budget': FinancesPageEnhanced,
  '/finance/savings': FinancesPageEnhanced,
  '/finance/wealth': FinancesPageEnhanced,
  '/finance/recharges': FinancesPageEnhanced,
  '/finance/insurance': FinancesPageEnhanced,
  '/finance/property': FinancesPageEnhanced,
  '/finance/milestones': FinancesPageEnhanced,
  '/finance/festivals': FinancesPageEnhanced,
  '/finance/gifts': FinancesPageEnhanced,
  '/finance/vendors': FinancesPageEnhanced,
  '/finance/documents': FinancesPageEnhanced,
  '/finance/resilience': FinancesPageEnhanced,
  '/finance/income': FinancesPageEnhanced,
  '/finance/ai': FinancesPageEnhanced,
  '/education': EducationPage,
  '/education/dashboard': EducationPage,
  '/education/students': EducationPage,
  '/education/curriculum': EducationPage,
  '/education/planner': EducationPage,
  '/education/quiz': EducationPage,
  '/education/assessment': EducationPage,
  '/education/courses': EducationPage,
  '/education/mentors': EducationPage,
  '/education/achievements': EducationPage,
  '/education/archive': EducationPage,
  '/kitchen': KitchenPage,
  '/kitchen/dashboard': KitchenPage,
  '/kitchen/pantry': KitchenPage,
  '/kitchen/fresh': KitchenPage,
  '/kitchen/meals': KitchenPage,
  '/kitchen/kids': KitchenPage,
  '/kitchen/recipes': KitchenPage,
  '/kitchen/cleaning': KitchenPage,
  '/kitchen/vendors': KitchenPage,
  '/kitchen/wellness': KitchenPage,
  '/kitchen/festivals': KitchenPage,
  '/tamil-panchangam': TamilPanchangamPage,
  '/hobbies-activities': HobbiesActivitiesPage,

  // Dashboard/Home routes
  '/household': HouseholdPage,
  '/members': UsersPage,
  '/inventory': ProductsPage,
  '/vehicles': AssetsPage,

  // Divinity routes
  '/rituals': TemplePage,
  '/temple': TemplePage,
  '/festival-calendar': FestivalCalendarPage,
  '/mantras': MantrasPage,

  // Contacts routes
  '/contacts': ContactsPage,
  '/emergency': IssuesEmergencyPage,
  '/vendors': ContactsPage,
  '/directory': ContactsPage,

  // Food routes
  '/meals': KitchenPage,
  '/recipes': KitchenPage,
  '/grocery': GroceryPage,
  '/pantry': KitchenPage,

  // Education routes
  '/library': LibraryPage,
  '/studies': StudiesPage,
  '/learning-goals': LearningGoalsPage,
  '/study-plans': EducationPage,

  // Health routes
  '/wellness': HealthPage,
  '/health': HealthPage,
  '/yoga': YogaExercisePage,
  '/journal': HealthJournalPage,

  // Finances routes
  '/investments': FinancesPageEnhanced,

  // Issues routes
  '/urgent': IssuesUrgentPage,
  '/repairs': IssuesRepairsPage,
  '/maintenance': IssuesMaintenancePage,
  '/requests': RequestsPage,

  // Memories routes
  '/lifeflow': FamilyStoriesPage,
  '/family-stories': FamilyStoriesPage,
  '/legacy': LegacyMemoryPage,
  '/emotions': EmotionsFeelingsPage,
  '/family-governance': FamilyGovernancePage,

  // Travel routes
  '/travel': TravelPage,
  '/trips': TripHistoryPage,
  '/leisure': LeisureCommunityPage,
  '/community': LeisureCommunityPage,

  // Weather route
  '/weather': WeatherPage,

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
    
    currentComponent.set(component);
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
  navigate
};