<script>
  import { onMount } from "svelte";
  import MobileFirstLayout from "./lib/components/MobileFirstLayout.svelte";
  import { currentRoute, navigate, router } from "./lib/router.js";
  import { themeActions } from "./lib/stores/theme.js";
  import { i18nReadyPromise } from "./lib/i18n/index.js";
  import LoadingSpinner from "./lib/components/LoadingSpinner.svelte";
  import { initializeDatabase } from "./lib/data/database.js";

  let appReady = false;

  // Handle navigation events
  async function handleNavigate(event) {
    const { path } = event.detail;
    console.log("App - handleNavigate called with path:", path);
    navigate(path);
  }

  // Initialize app
  async function initializeApp() {
    try {
      console.log("Starting app initialization...");

      // Add overall timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          console.warn("App initialization timeout - proceeding anyway");
          reject(new Error("App initialization timeout"));
        }, 10000); // 10 second timeout
      });

      await Promise.race([
        (async () => {
          // Wait for i18n to be ready
          console.log("Waiting for i18n...");
          await i18nReadyPromise;
          console.log("i18n ready");

          // Initialize theme
          console.log("Initializing theme...");
          themeActions.init();
          console.log("Theme initialized");

          // Initialize database
          console.log("Initializing database...");
          await initializeDatabase();
          console.log("Database initialized");

          console.log("App initialization completed");
        })(),
        timeoutPromise,
      ]);

      appReady = true;
    } catch (error) {
      console.error("Error initializing app:", error);
      // Still show app even if init fails
      appReady = true;
    }
  }

  onMount(() => {
    initializeApp();
  });
</script>

{#if !appReady}
  <!-- Loading Screen -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/30 to-purple-50/30 dark:from-gray-900/30 dark:via-purple-900/10 dark:to-blue-900/10 flex items-center justify-center">
    <div class="text-center">
      <LoadingSpinner />
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mt-4">Loading Family App</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Setting up your family management system...</p>
    </div>
  </div>
{:else}
  <!-- Main App with Mobile-First Layout -->
  <MobileFirstLayout on:navigate={handleNavigate} />
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
