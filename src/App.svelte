<script>
  import { onMount } from "svelte";
  import MobileFirstLayout from "./lib/components/MobileFirstLayout.svelte";
  import { currentRoute, navigate, router, currentComponent } from "./lib/router.js";
  import { themeActions } from "./lib/stores/theme.js";
  import { i18nReadyPromise } from "./lib/i18n/index.js";
  import LoadingSpinner from "./lib/components/LoadingSpinner.svelte";
  import { initializeDatabase } from "./lib/data/database.js";

  let currentComponentValue = null;
  let appReady = false;

  // Get current component from router store
  $: currentComponentValue = $currentComponent;

  // Handle navigation events
  async function handleNavigate(event) {
    const { path } = event.detail;
    console.log("App - handleNavigate called with path:", path);
    navigate(path);
    console.log("App - currentComponent set to:", $currentComponent);
  }

  // Initialize app
  async function initializeApp() {
    try {
      // Wait for i18n to be ready
      await i18nReadyPromise;

      // Initialize theme
      themeActions.init();

      // Initialize database
      await initializeDatabase();

      // Load initial route
      const initialPath = window.location.pathname;
      console.log("Initial path:", initialPath);
      navigate(initialPath);
      console.log("Component loaded:", $currentComponent, typeof $currentComponent);

      appReady = true;
    } catch (error) {
      console.error("Error initializing app:", error);
      appReady = true; // Still show app even if init fails
    }
  }

  onMount(() => {
    initializeApp();
  });
</script>

{#if !appReady}
  <!-- Loading Screen -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
    <div class="text-center">
      <LoadingSpinner />
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mt-4">Loading Family App</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Setting up your family management system...</p>
    </div>
  </div>
{:else}
  <!-- Main App with Mobile-First Layout -->
  <MobileFirstLayout currentComponent={currentComponentValue} on:navigate={handleNavigate} />
{/if}

<style global>
  /* Mobile-first responsive design */
  * {
    box-sizing: border-box;
  }

  /* Ensure proper viewport handling */
  @viewport {
    width: device-width;
    initial-scale: 1;
  }

  /* Hide scrollbars on mobile but keep functionality */
  @media (max-width: 767px) {
    ::-webkit-scrollbar {
      display: none;
    }
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* Prevent zoom on input focus on iOS */
  @media screen and (max-width: 767px) {
    input[type="text"],
    input[type="email"],
    input[type="password"],
    textarea,
    select {
      font-size: 16px;
    }
  }
</style>
