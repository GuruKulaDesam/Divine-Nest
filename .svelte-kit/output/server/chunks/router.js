import { w as writable } from "./index.js";
const lazyPages = {
  HomePage: () => import("./HomePage.js"),
  UsersPage: () => import("./UsersPage.js"),
  ProductsPage: () => import("./ProductsPage.js"),
  AnalyticsPage: () => import("./AnalyticsPage.js"),
  ProjectManagementPage: () => import("./ProjectManagementPage.js"),
  MapsPage: () => import("./MapsPage.js"),
  SchedulePage: () => import("./SchedulePage.js"),
  ProfilePage: () => import("./ProfilePage.js"),
  SettingsPage: () => import("./SettingsPage.js"),
  LoginPage: () => import("./LoginPage.js"),
  LoginV2: () => import("./LoginV2.js"),
  LoginV3: () => import("./LoginV3.js"),
  RegisterPage: () => import("./RegisterPage.js"),
  RegisterV2: () => import("./RegisterV2.js"),
  RegisterV3: () => import("./RegisterV3.js"),
  NotFoundPage: () => import("./NotFoundPage.js"),
  ChartsPage: () => import("./ChartsPage.js"),
  GanttPage: () => import("./GanttPage.js"),
  FamilyCalendarModernPage: () => import("./FamilyCalendarModernPage.js"),
  FamilyNotesModernPage: () => import("./FamilyNotesModernPage.js"),
  RemindersPage: () => import("./RemindersPage.js"),
  FinancesPageEnhanced: () => import("./FinancesPageEnhanced.js"),
  EducationPage: () => import("./EducationPage.js"),
  KitchenPage: () => import("./KitchenPage.js"),
  TamilPanchangamPage: () => import("./TamilPanchangamPage.js"),
  HobbiesActivitiesPage: () => import("./HobbiesActivitiesPage.js"),
  HouseholdPage: () => import("./HouseholdPage.js"),
  ContactsPage: () => import("./ContactsPage.js"),
  EmergencyContactsPage: () => import("./EmergencyContactsPage.js"),
  IssuesEmergencySituationsPage: () => import("./IssuesEmergencySituationsPage.js"),
  IssuesUrgentPage: () => import("./IssuesUrgentPage.js"),
  IssuesRepairsPage: () => import("./IssuesRepairsPage.js"),
  IssuesMaintenancePage: () => import("./IssuesMaintenancePage.js"),
  IssuesUpgradesPage: () => import("./IssuesUpgradesPage.js"),
  RequestsPage: () => import("./RequestsPage.js"),
  HealthPage: () => import("./HealthPage.js"),
  YogaExercisePage: () => import("./YogaExercisePage.js"),
  HealthJournalPage: () => import("./HealthJournalPage.js"),
  TravelPage: () => import("./TravelPage.js"),
  TripHistoryPage: () => import("./TripHistoryPage.js"),
  LeisureCommunityPage: () => import("./LeisureCommunityPage.js"),
  FamilyStoriesPage: () => import("./FamilyStoriesPage.js"),
  LegacyMemoryPage: () => import("./LegacyMemoryPage.js"),
  EmotionsFeelingsPage: () => import("./EmotionsFeelingsPage.js"),
  FamilyGovernancePage: () => import("./FamilyGovernancePage.js"),
  TemplePage: () => import("./TemplePage.js"),
  AssetsPage: () => import("./AssetsPage.js"),
  AssetsItemsPage: () => import("./AssetsItemsPage.js"),
  AssetsValuePage: () => import("./AssetsValuePage.js"),
  AssetsMaintenancePage: () => import("./AssetsMaintenancePage.js"),
  AssetsDocumentsPage: () => import("./AssetsDocumentsPage.js"),
  GroceryPage: () => import("./GroceryPage.js"),
  LibraryPage: () => import("./LibraryPage.js"),
  StudiesPage: () => import("./StudiesPage.js"),
  LearningGoalsPage: () => import("./LearningGoalsPage.js"),
  GradesTrackerPage: () => import("./GradesTrackerPage.js"),
  AssistantPage: () => import("./AssistantPage.js"),
  VoiceLogPage: () => import("./VoiceLogPage.js"),
  TaskBoardPage: () => import("./TaskBoardPage.js"),
  EventFeedPage: () => import("./EventFeedPage.js"),
  AutoChecklistPage: () => import("./AutoChecklistPage.js"),
  AmbientLogPage: () => import("./AmbientLogPage.js"),
  FestivalCalendarPage: () => import("./FestivalCalendarPage.js"),
  MantrasPage: () => import("./MantrasPage.js"),
  WeatherPage: () => import("./WeatherPage.js"),
  ViewModeTestPage: () => import("./ViewModeTestPage.js")
};
const componentCache = /* @__PURE__ */ new Map();
const performanceMetrics = {
  navigationCount: 0,
  totalNavigationTime: 0,
  averageNavigationTime: 0,
  slowestNavigation: 0,
  failedNavigations: 0
};
const currentRoute = writable(window.location.pathname);
const currentComponent = writable(null);
const isNavigating = writable(false);
const navigationQueue = writable([]);
const routes = {
  "/": "HomePage",
  "/users": "UsersPage",
  "/products": "ProductsPage",
  "/analytics": "AnalyticsPage",
  "/projects": "ProjectManagementPage",
  "/gantt": "GanttPage",
  "/maps": "MapsPage",
  "/schedule": "SchedulePage",
  "/profile": "ProfilePage",
  "/settings": "SettingsPage",
  "/view-mode-test": "HomePage",
  "/auth/login": "LoginPage",
  "/auth/login-v2": "LoginV2",
  "/auth/login-v3": "LoginV3",
  "/auth/register": "RegisterPage",
  "/auth/register-v2": "RegisterV2",
  "/auth/register-v3": "RegisterV3",
  "/charts": "ChartsPage",
  "/family-calendar-modern": "FamilyCalendarModernPage",
  "/family-notes-modern": "FamilyNotesModernPage",
  "/reminders": "RemindersPage",
  "/finances": "FinancesPageEnhanced",
  "/recharges": "FinancesPageEnhanced",
  "/expenses": "FinancesPageEnhanced",
  "/budget": "FinancesPageEnhanced",
  "/insurance": "FinancesPageEnhanced",
  "/family-members": "FinancesPageEnhanced",
  "/finance/expenses": "FinancesPageEnhanced",
  "/finance/budget": "FinancesPageEnhanced",
  "/finance/savings": "FinancesPageEnhanced",
  "/finance/wealth": "FinancesPageEnhanced",
  "/finance/recharges": "FinancesPageEnhanced",
  "/finance/insurance": "FinancesPageEnhanced",
  "/finance/property": "FinancesPageEnhanced",
  "/finance/milestones": "FinancesPageEnhanced",
  "/finance/festivals": "FinancesPageEnhanced",
  "/finance/gifts": "FinancesPageEnhanced",
  "/finance/vendors": "FinancesPageEnhanced",
  "/finance/documents": "FinancesPageEnhanced",
  "/finance/resilience": "FinancesPageEnhanced",
  "/finance/income": "FinancesPageEnhanced",
  "/finance/ai": "FinancesPageEnhanced",
  "/education": "EducationPage",
  "/education/dashboard": "EducationPage",
  "/education/students": "EducationPage",
  "/education/curriculum": "EducationPage",
  "/education/planner": "EducationPage",
  "/education/quiz": "EducationPage",
  "/education/assessment": "EducationPage",
  "/education/courses": "EducationPage",
  "/education/mentors": "EducationPage",
  "/education/achievements": "EducationPage",
  "/education/archive": "EducationPage",
  "/education/grades-tracker": "GradesTrackerPage",
  "/assistant": "AssistantPage",
  "/assistant/voice-log": "VoiceLogPage",
  "/assistant/task-board": "TaskBoardPage",
  "/assistant/event-feed": "EventFeedPage",
  "/assistant/auto-checklist": "AutoChecklistPage",
  "/assistant/ambient-log": "AmbientLogPage",
  "/kitchen": "KitchenPage",
  "/kitchen/dashboard": "KitchenPage",
  "/kitchen/pantry": "KitchenPage",
  "/kitchen/fresh": "KitchenPage",
  "/kitchen/meals": "KitchenPage",
  "/kitchen/kids": "KitchenPage",
  "/kitchen/recipes": "KitchenPage",
  "/kitchen/cleaning": "KitchenPage",
  "/kitchen/vendors": "KitchenPage",
  "/kitchen/wellness": "KitchenPage",
  "/kitchen/festivals": "KitchenPage",
  "/tamil-panchangam": "TamilPanchangamPage",
  "/hobbies-activities": "HobbiesActivitiesPage",
  // Dashboard/Home routes
  "/household": "HouseholdPage",
  "/members": "UsersPage",
  "/inventory": "ProductsPage",
  "/vehicles": "AssetsPage",
  // Divinity routes
  "/rituals": "TemplePage",
  "/temple": "TemplePage",
  "/festival-calendar": "FestivalCalendarPage",
  "/mantras": "MantrasPage",
  // Contacts routes
  "/contacts": "ContactsPage",
  "/emergency": "EmergencyContactsPage",
  "/vendors": "ContactsPage",
  "/directory": "ContactsPage",
  // Food routes
  "/meals": "KitchenPage",
  "/recipes": "KitchenPage",
  "/grocery": "GroceryPage",
  "/pantry": "KitchenPage",
  // Education routes
  "/library": "LibraryPage",
  "/studies": "StudiesPage",
  "/learning-goals": "LearningGoalsPage",
  "/study-plans": "EducationPage",
  // Health routes
  "/wellness": "HealthPage",
  "/health": "HealthPage",
  "/yoga": "YogaExercisePage",
  "/journal": "HealthJournalPage",
  // Finances routes
  "/investments": "FinancesPageEnhanced",
  // Assets routes
  "/assets": "AssetsPage",
  "/assets/items": "AssetsItemsPage",
  "/assets/value": "AssetsValuePage",
  "/assets/maintenance": "AssetsMaintenancePage",
  "/assets/documents": "AssetsDocumentsPage",
  // Issues routes
  "/issues-emergency": "IssuesEmergencySituationsPage",
  "/urgent": "IssuesUrgentPage",
  "/repairs": "IssuesRepairsPage",
  "/maintenance": "IssuesMaintenancePage",
  "/upgrades": "IssuesUpgradesPage",
  "/requests": "RequestsPage",
  // Memories routes
  "/lifeflow": "FamilyStoriesPage",
  "/family-stories": "FamilyStoriesPage",
  "/legacy": "LegacyMemoryPage",
  "/emotions": "EmotionsFeelingsPage",
  "/family-governance": "FamilyGovernancePage",
  // Travel routes
  "/travel": "TravelPage",
  "/trips": "TripHistoryPage",
  "/leisure": "LeisureCommunityPage",
  "/community": "LeisureCommunityPage",
  // Weather route
  "/weather": "WeatherPage",
  "*": "NotFoundPage"
};
window.addEventListener("popstate", () => {
  router.navigate(window.location.pathname, false);
});
window.addEventListener("load", () => {
  router.navigate(window.location.pathname, false);
});
class Router {
  constructor() {
    this.routes = /* @__PURE__ */ new Map();
    this.isTransitioning = false;
    this.transitionDuration = 0;
    Object.entries(routes).forEach(([path, componentName]) => {
      this.add(path, componentName);
    });
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname, false);
    });
  }
  // Add a route
  add(path, componentName) {
    this.routes.set(path, componentName);
  }
  // Navigate to a route with lazy loading and performance monitoring
  async navigate(path, updateHistory = true) {
    const startTime = performance.now();
    if (this.isTransitioning) {
      console.log("Navigation in progress, queuing:", path);
      navigationQueue.update((queue) => [...queue, { path, updateHistory }]);
      return;
    }
    this.isTransitioning = true;
    isNavigating.set(true);
    try {
      if (updateHistory) {
        window.history.pushState({}, "", path);
      }
      currentRoute.set(path);
      let componentName = this.routes.get(path);
      if (!componentName) {
        componentName = this.routes.get("*");
      }
      if (componentName && lazyPages[componentName]) {
        try {
          if (componentCache.has(componentName)) {
            currentComponent.set(componentCache.get(componentName));
          } else {
            const module = await lazyPages[componentName]();
            const component = module.default;
            componentCache.set(componentName, component);
            currentComponent.set(component);
          }
        } catch (error) {
          console.error(`Failed to load component ${componentName}:`, error);
          performanceMetrics.failedNavigations++;
          if (componentName !== "NotFoundPage") {
            const module = await lazyPages["NotFoundPage"]();
            currentComponent.set(module.default);
          }
        }
      } else {
        console.warn(`No component found for path: ${path}`);
        try {
          const module = await lazyPages["NotFoundPage"]();
          currentComponent.set(module.default);
        } catch (error) {
          console.error("Failed to load NotFoundPage:", error);
        }
      }
      const endTime = performance.now();
      const navigationTime = endTime - startTime;
      performanceMetrics.navigationCount++;
      performanceMetrics.totalNavigationTime += navigationTime;
      performanceMetrics.averageNavigationTime = performanceMetrics.totalNavigationTime / performanceMetrics.navigationCount;
      performanceMetrics.slowestNavigation = Math.max(performanceMetrics.slowestNavigation, navigationTime);
      console.log(`Navigation to ${path} completed in ${navigationTime.toFixed(2)}ms`);
    } finally {
      this.isTransitioning = false;
      isNavigating.set(false);
      navigationQueue.update((queue) => {
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
const router = new Router();
export {
  currentRoute as c
};
