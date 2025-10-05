<script>
  import FamilyCalendarPage from "./lib/pages/FamilyCalendarPage.svelte";
  import FamilyCalendarModernPage from "./lib/pages/FamilyCalendarModernPage.svelte";
  import FamilyTodoPage from "./lib/pages/FamilyTodoPage.svelte";
  import FamilyMapPage from "./lib/pages/FamilyMapPage.svelte";
  import FamilyNotesPage from "./lib/pages/FamilyNotesPage.svelte";
  import FamilyNotesModernPage from "./lib/pages/FamilyNotesModernPage.svelte";
  import FamilyNotificationsPage from "./lib/pages/FamilyNotificationsPage.svelte";
  import RemindersPage from "./lib/pages/RemindersPage.svelte";
  import RequestsPage from "./lib/pages/RequestsPage.svelte";
  import HouseholdPage from "./lib/pages/HouseholdPage.svelte";
  import LibraryPage from "./lib/pages/LibraryPage.svelte";
  import TemplePage from "./lib/pages/TemplePage.svelte";
  import { onMount } from "svelte";
  import DashboardLayout from "./lib/components/DashboardLayout.svelte";
  import UsersPage from "./lib/pages/UsersPage.svelte";
  import ProductsPage from "./lib/pages/ProductsPage.svelte";
  import SettingsPage from "./lib/pages/SettingsPage.svelte";
  import AnalyticsPage from "./lib/pages/AnalyticsPage.svelte";
  import ProjectManagementPage from "./lib/pages/ProjectManagementPage.svelte";
  import ProfilePage from "./lib/pages/ProfilePage.svelte";
  import MapsPage from "./lib/pages/MapsPage.svelte";
  import SchedulePage from "./lib/pages/SchedulePage.svelte";
  import NotFoundPage from "./lib/pages/NotFoundPage.svelte";
  import LoginPage from "./lib/pages/LoginPage.svelte";
  import LoginV2 from "./lib/pages/LoginV2.svelte";
  import LoginV3 from "./lib/pages/LoginV3.svelte";
  import RegisterPage from "./lib/pages/RegisterPage.svelte";
  import RegisterV2 from "./lib/pages/RegisterV2.svelte";
  import RegisterV3 from "./lib/pages/RegisterV3.svelte";
  import ChartsPage from "./lib/pages/ChartsPage.svelte";
  import GanttPage from "./lib/pages/GanttPage.svelte";
  import RitualsDashboard from "./lib/components/RitualsDashboard.svelte";
  import HomePage from "./pages/home/+page.svelte";
  import EducationPage from "./pages/education/+page.svelte";
  import MealsPage from "./pages/meals/+page.svelte";
  import RecipesPage from "./pages/recipes/+page.svelte";
  import RitualsPage from "./pages/rituals/+page.svelte";
  import WellnessPage from "./pages/wellness/+page.svelte";
  import LifeFlowPage from "./pages/lifeflow/+page.svelte";
  import DirectoryPage from "./pages/directory/+page.svelte";
  import { currentRoute } from "./lib/router.js";
  import { pageTransitions } from "./lib/utils/motion.js";
  import { themeActions } from "./lib/stores/theme.js";
  import { isLoading } from "svelte-i18n";
  import { i18nReadyPromise } from "./lib/i18n/index.js";
  import LoadingSpinner from "./lib/components/LoadingSpinner.svelte";
  import { authActions } from "./lib/stores/auth.js";
  import { initializeDatabase } from "./lib/data/database.js";
  import IssuesEmergencyPage from "./lib/pages/IssuesEmergencyPage.svelte";
  import IssuesRepairsPage from "./lib/pages/IssuesRepairsPage.svelte";
  import IssuesMaintenancePage from "./lib/pages/IssuesMaintenancePage.svelte";
  import IssuesUrgentPage from "./lib/pages/IssuesUrgentPage.svelte";
  import TravelPage from "./lib/pages/TravelPage.svelte";

  let current;
  let pageElement;
  let previousRoute = "";
  let appReady = false;
  let showFullPage = false;
  let loading = true;

  $: {
    // Determine if we should show a full page (without dashboard layout)
    showFullPage = $currentRoute.startsWith("/auth/");

    // Route mapping for cleaner organization
    const routes = {
      // Home & Household
      "/": HomePage,
      "/home": HomePage,
      "/household": HouseholdPage,
      "/home-services": HomePage, // Will create later
      "/requests": RequestsPage,

      // Education & Learning
      "/education": EducationPage,
      "/library": LibraryPage,

      // Meals & Kitchen
      "/meals": MealsPage,
      "/recipes": RecipesPage,

      // Rituals & Spiritual
      "/rituals": RitualsPage,
      "/temple": TemplePage,
      "/festival-calendar": RitualsPage, // Will create later

      // Health & Wellness
      "/wellness": WellnessPage,
      "/health": WellnessPage, // Will create later
      "/mantras": WellnessPage, // Will create later
      "/journal": WellnessPage, // Will create later

      // Time & Events
      "/family-calendar-modern": FamilyCalendarModernPage,
      "/events": FamilyCalendarModernPage, // Will create later
      "/time": FamilyCalendarModernPage, // Will create later
      "/family-notes-modern": FamilyNotesModernPage,
      "/reminders": RemindersPage,

      // Travel & Leisure
      "/travel": TravelPage,
      "/trips": TravelPage,
      "/leisure": TravelPage,
      "/community": TravelPage,

      // Life Flow & Memory
      "/lifeflow": LifeFlowPage,
      "/legacy": LifeFlowPage, // Will create later
      "/family-governance": LifeFlowPage, // Will create later

      // Directory & Contacts
      "/directory": DirectoryPage,
      "/contacts": DirectoryPage, // Will create later
      "/vendors": DirectoryPage, // Will create later

      // Issues Management
      "/emergency": IssuesEmergencyPage,
      "/urgent": IssuesUrgentPage,
      "/repairs": IssuesRepairsPage,
      "/maintenance": IssuesMaintenancePage,

      // Legacy routes (keeping for compatibility)
      "/users": UsersPage,
      "/products": ProductsPage,
      "/settings": SettingsPage,
      "/analytics": AnalyticsPage,
      "/charts": ChartsPage,
      "/projects": ProjectManagementPage,
      "/profile": ProfilePage,
      "/maps": MapsPage,
      "/schedule": SchedulePage,
      "/gantt": GanttPage,
      "/family-calendar": FamilyCalendarPage,
      "/family-todo": FamilyTodoPage,
      "/family-map": FamilyMapPage,
      "/family-notes": FamilyNotesPage,
      "/family-notifications": FamilyNotificationsPage,

      // Auth routes
      "/auth/login": LoginPage,
      "/auth/login-v2": LoginV2,
      "/auth/login-v3": LoginV3,
      "/auth/register": RegisterPage,
      "/auth/register-v2": RegisterV2,
      "/auth/register-v3": RegisterV3,
    };

    // Set current component
    current = routes[$currentRoute] || NotFoundPage;
  }

  // Handle page transitions
  $: if ($currentRoute !== previousRoute && pageElement && appReady) {
    $currentRoute === "/"
      ? HomePage
      : $currentRoute === "/users"
        ? UsersPage
        : $currentRoute === "/products"
          ? ProductsPage
          : $currentRoute === "/settings"
            ? SettingsPage
            : $currentRoute === "/analytics"
              ? AnalyticsPage
              : $currentRoute === "/charts"
                ? ChartsPage
                : $currentRoute === "/projects"
                  ? ProjectManagementPage
                  : $currentRoute === "/profile"
                    ? ProfilePage
                    : $currentRoute === "/maps"
                      ? MapsPage
                      : $currentRoute === "/schedule"
                        ? SchedulePage
                        : $currentRoute === "/auth/login"
                          ? LoginPage
                          : $currentRoute === "/auth/login-v2"
                            ? LoginV2
                            : $currentRoute === "/auth/login-v3"
                              ? LoginV3
                              : $currentRoute === "/auth/register"
                                ? RegisterPage
                                : $currentRoute === "/auth/register-v2"
                                  ? RegisterV2
                                  : $currentRoute === "/auth/register-v3"
                                    ? RegisterV3
                                    : $currentRoute === "/gantt"
                                      ? GanttPage
                                      : $currentRoute === "/family-calendar-modern"
                                        ? FamilyCalendarModernPage
                                        : $currentRoute === "/family-calendar"
                                          ? FamilyCalendarPage
                                          : $currentRoute === "/family-todo"
                                            ? FamilyTodoPage
                                            : $currentRoute === "/family-map"
                                              ? FamilyMapPage
                                              : $currentRoute === "/family-notes-modern"
                                                ? FamilyNotesModernPage
                                                : $currentRoute === "/family-notes"
                                                  ? FamilyNotesPage
                                                  : $currentRoute === "/family-notifications"
                                                    ? FamilyNotificationsPage
                                                    : $currentRoute === "/reminders"
                                                      ? RemindersPage
                                                      : NotFoundPage;
  }

  // Handle page transitions
  $: if ($currentRoute !== previousRoute && pageElement && appReady) {
    // Exit animation for previous page
    if (previousRoute) {
      pageTransitions.exit(pageElement);
    }

    // Enter animation for new page
    setTimeout(() => {
      if (pageElement) {
        pageTransitions.enter(pageElement);
      }
    }, 100);

    previousRoute = $currentRoute;
  }

  // Async logic for app readiness
  onMount(async () => {
    // Initialize theme system
    themeActions.init();

    // Initialize auth system
    authActions.init();

    // Initialize unified family database
    await initializeDatabase();

    // Wait for i18n to be ready
    await i18nReadyPromise;

    // Mark app as ready
    appReady = true;

    // Initial page animation
    setTimeout(() => {
      if (pageElement) {
        pageTransitions.enter(pageElement);
      }
    }, 100);
  });

  // Timer for loading spinner (separate, not async)
  onMount(() => {
    const timer = setTimeout(() => {
      loading = false;
    }, 3000);
    return () => clearTimeout(timer);
  });
</script>

{#if loading}
  <LoadingSpinner />
{/if}

{#if !appReady || $isLoading}
  <div class="flex items-center justify-center min-h-screen bg-base-100">
    <div class="text-center">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <p class="mt-4 text-base-content/60">Loading...</p>
    </div>
  </div>
{:else if showFullPage}
  <div bind:this={pageElement}>
    <svelte:component this={current} />
  </div>
{:else}
  <DashboardLayout>
    <div bind:this={pageElement} class="page-container scrollable-container">
      <svelte:component this={current} />
    </div>
  </DashboardLayout>
{/if}

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

  .page-container {
    min-height: 100%;
    overflow-x: hidden;
  }
</style>
