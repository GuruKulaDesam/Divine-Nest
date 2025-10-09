<script>
  import { onMount } from "svelte";
  import { themeActions } from "$lib/stores/theme.js";
  import { initializeDatabase } from "$lib/data/database.js";
  import HomePage from "$lib/pages/HomePage.svelte";

  let appReady = false;
  let appError = null;

  console.log("SvelteKit Home Manager app starting...");

  onMount(async () => {
    try {
      console.log("Initializing theme system...");
      themeActions.init();
      console.log("Theme system initialized");

      console.log("Initializing database...");
      await initializeDatabase();
      console.log("Database initialized");

      appReady = true;
      console.log("Home Manager app ready!");
    } catch (error) {
      console.error("App initialization failed:", error);
      appError = error.message;
    }
  });
</script>

{#if appError}
  <div class="flex items-center justify-center min-h-screen bg-red-50">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Initialization Error</h1>
        <p class="text-gray-600 mb-4">{appError}</p>
        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" on:click={() => window.location.reload()}> Retry </button>
      </div>
    </div>
  </div>
{:else if appReady}
  <HomePage />
{:else}
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
      <div class="text-center">
        <div class="animate-pulse">
          <div class="text-blue-500 text-6xl mb-4">🏠</div>
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Home Manager</h1>
          <p class="text-gray-600 mb-6">Initializing your family dashboard...</p>
          <div class="flex justify-center space-x-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
