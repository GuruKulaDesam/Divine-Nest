<script>
  import { onMount } from "svelte";
  import { currentRoute, navigate } from "../router.js";
  import ResponsiveHeader from "./ResponsiveHeader.svelte";
  import BottomNavigation from "./BottomNavigation.svelte";
  import MobileSidebar from "./MobileSidebar.svelte";
  import Sidebar from "./Sidebar.svelte";
  import TopNavigation from "./TopNavigation.svelte";
  import Icon from "@iconify/svelte";
  import TestPage from "../pages/TestPage.svelte";
  import HomePage from "../pages/HomePage.svelte";
  import SchedulePage from "../pages/SchedulePage.svelte";
  import ViewModeTestPage from "../pages/ViewModeTestPage.svelte";

  import { viewMode } from "../stores/viewMode.js";

  // Component map for conditional rendering
  const componentMap = {
    // Test pages
    test: TestPage,
    "test-navigation": TestPage,
    "view-mode-test": ViewModeTestPage,

    // Home & Family
    home: HomePage,
    household: HomePage,
    members: HomePage,
    inventory: HomePage,
    vehicles: HomePage,
    "family-calendar-modern": HomePage,
    "family-notes-modern": HomePage,
    reminders: HomePage,
    directory: HomePage,
    "home-services": HomePage,

    // Daily Life
    schedule: SchedulePage,
    emergency: SchedulePage,
    "family-notifications": HomePage,
    weather: HomePage,
    rituals: HomePage,
    lifeflow: HomePage,

    // Learning & Education
    education: HomePage,
    "study-plans": HomePage,
    library: HomePage,
    "learning-goals": HomePage,
    "education-students": HomePage,
    "education-curriculum": HomePage,
    "education-planner": HomePage,
    "education-quiz": HomePage,
    "education-assessment": HomePage,
    "education-courses": HomePage,
    "education-mentors": HomePage,
    "education-achievements": HomePage,

    // Health & Care
    wellness: HomePage,
    kitchen: HomePage,
    recipes: HomePage,
    yoga: HomePage,
    journal: HomePage,
    "kitchen-dashboard": HomePage,
    "kitchen-pantry": HomePage,
    "kitchen-meals": HomePage,
    "kitchen-kids": HomePage,
    "kitchen-recipes": HomePage,
    "kitchen-cleaning": HomePage,
    "kitchen-vendors": HomePage,
    health: HomePage,
    "health-records": HomePage,
    "health-appointments": HomePage,
    "health-medications": HomePage,
    "health-vitals": HomePage,
    "health-emergency": HomePage,
    "health-insurance": HomePage,
    "health-doctors": HomePage,
    "health-lab-results": HomePage,
    "health-preventive-care": HomePage,
    "health-mental-health": HomePage,
    "health-nutrition": HomePage,
    "health-fitness": HomePage,
    "health-sleep": HomePage,
    "health-habits": HomePage,
    "hobbies-activities": HomePage,

    // Management & Finance
    finances: HomePage,
    assets: HomePage,
    travel: HomePage,
    contacts: HomePage,
    settings: HomePage,
    profile: HomePage,
    "finance-expenses": HomePage,
    "finance-budget": HomePage,
    "finance-savings": HomePage,
    "finance-wealth": HomePage,
    "assets-items": HomePage,
    "assets-value": HomePage,
    "assets-maintenance": HomePage,
    "assets-documents": HomePage,
    trips: HomePage,
    leisure: HomePage,
    analytics: HomePage,
    charts: HomePage,
    maps: HomePage,
    products: HomePage,
    users: HomePage,
    "project-management": HomePage,

    // Auth pages
    "auth-login": HomePage,
    "auth-login-v2": HomePage,
    "auth-login-v3": HomePage,
    "auth-register": HomePage,
    "auth-register-v2": HomePage,
    "auth-register-v3": HomePage,
  };

  export let currentComponent = null;

  let sidebarOpen = false;
  let activeGroup = "home";
  let pageElement;
  let isMobileDevice = false;

  // Reactive statements
  $: console.log("MobileFirstLayout - currentComponent:", currentComponent, typeof currentComponent);
  $: componentToRender = currentComponent || TestPage;
  $: isMobileView = $viewMode === "auto" ? isMobileDevice : $viewMode === "mobile";

  // Check if device is mobile
  function checkMobileDevice() {
    isMobileDevice = window.innerWidth < 768;
  }

  // Toggle view mode
  function toggleViewMode() {
    viewMode.update((mode) => {
      if (mode === "auto") return "mobile";
      if (mode === "mobile") return "desktop";
      return "auto";
    });
  }

  // Handle navigation events
  function handleNavigate(event) {
    const { path } = event.detail;
    navigate(path);
    sidebarOpen = false;
  }

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function closeSidebar() {
    sidebarOpen = false;
  }

  // Page transition effect
  function handlePageTransition() {
    if (pageElement) {
      pageElement.style.opacity = "0";
      setTimeout(() => {
        if (pageElement) {
          pageElement.style.opacity = "1";
        }
      }, 50);
    }
  }

  $: if (currentComponent) {
    handlePageTransition();
  }

  onMount(() => {
    checkMobileDevice();
    window.addEventListener("resize", checkMobileDevice);
    return () => window.removeEventListener("resize", checkMobileDevice);
  });
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- View Mode Toggle (Top Right) -->
  <div class="fixed top-4 right-4 z-50">
    <button on:click={toggleViewMode} class="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700" title="Toggle View Mode">
      {#if $viewMode === "auto"}
        <Icon icon="heroicons:device-phone-mobile" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Auto</span>
      {:else if $viewMode === "mobile"}
        <Icon icon="heroicons:device-phone-mobile" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</span>
      {:else}
        <Icon icon="heroicons:computer-desktop" class="w-5 h-5 text-green-600 dark:text-green-400" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop</span>
      {/if}
    </button>
  </div>

  {#if isMobileView}
    <!-- MOBILE LAYOUT -->
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Mobile Header -->
      <header class="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-3">
            <button on:click={toggleSidebar} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Icon icon="heroicons:bars-3" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Family App</h1>
          </div>
          <div class="flex items-center gap-2">
            <!-- Mobile header actions can go here -->
          </div>
        </div>
      </header>

      <!-- Mobile Main Content -->
      <main class="pt-16 pb-20 px-4">
        <div bind:this={pageElement} class="transition-opacity duration-200 ease-in-out" style="opacity: 1;">
          <svelte:component this={componentToRender} />
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <BottomNavigation on:navigate={handleNavigate} on:toggleSidebar={toggleSidebar} />

      <!-- Mobile Sidebar Overlay -->
      {#if sidebarOpen}
        <div class="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div class="absolute inset-0 bg-black/50" on:click={closeSidebar} role="button" tabindex="0" aria-label="Close sidebar"></div>
          <MobileSidebar isOpen={sidebarOpen} {activeGroup} on:navigate={handleNavigate} on:close={closeSidebar} />
        </div>
      {/if}
    </div>
  {:else}
    <!-- DESKTOP LAYOUT -->
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Desktop Layout with Sidebar and Top Navigation -->
      <div class="flex h-screen bg-base-200 mountain-background" data-theme="modern">
        <!-- Desktop Sidebar -->
        <Sidebar isOpen={sidebarOpen} on:close={closeSidebar} />

        <!-- Main content area -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Enhanced Header with integrated breadcrumb and navigation -->
          <TopNavigation {sidebarOpen} on:toggleSidebar={toggleSidebar} />

          <!-- Desktop Main Content -->
          <main class="flex-1 scrollable-container bg-transparent">
            <div class="p-4 sm:p-6 lg:p-8">
              <div class="content-container rounded-3xl bg-base-100/90 backdrop-blur-sm shadow-xl border border-white/20 p-6 sm:p-8">
                <div bind:this={pageElement} class="transition-opacity duration-200 ease-in-out" style="opacity: 1;">
                  <svelte:component this={componentToRender} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Global styles for both layouts */
  .transition-all {
    transition: all 0.3s ease;
  }

  .transition-opacity {
    transition: opacity 0.2s ease-in-out;
  }

  /* Smooth transitions */
  main {
    transition:
      margin-left 0.3s ease,
      padding 0.3s ease;
  }
</style>
