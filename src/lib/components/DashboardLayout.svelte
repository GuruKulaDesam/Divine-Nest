<script>
  import LeftTileBar from "./LeftTileBar.svelte";
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import FloatingActionButtons from "./FloatingActionButtons.svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // Reactive statement for current path
  $: currentPath = $page.url.pathname;

  // Handle actions from the top navigation bar (right tiles)
  function handleTopNavAction(event) {
    const { action, tile } = event.detail;
    console.log(`Action triggered: ${action}`, tile);

    // Here you can implement the logic for each action
    // For example, opening modals, triggering saves, etc.
    switch (action) {
      case "quick-task":
        // Implement quick task logic
        console.log("Quick task action triggered");
        break;
      case "quick-note":
        // Implement quick note logic
        console.log("Quick note action triggered");
        break;
      case "quick-reminder":
        // Implement quick reminder logic
        console.log("Quick reminder action triggered");
        break;
      case "voice-note":
        // Implement voice note logic
        console.log("Voice note action triggered");
        break;
      case "voice-command":
        // Implement voice command logic
        console.log("Voice command action triggered");
        break;
      case "quick-schedule":
        // Implement quick schedule logic
        console.log("Quick schedule action triggered");
        break;
      case "voice-assistant":
        // Implement voice assistant logic
        console.log("Voice assistant action triggered");
        break;
      case "search":
        // Implement search logic
        console.log("Search action triggered");
        break;
      case "save-all":
        // Implement save all logic
        console.log("Save all action triggered");
        break;
      case "settings":
        // Implement settings logic
        console.log("Settings action triggered");
        break;
      case "start-voice-input":
        // Implement voice input start logic
        console.log("Voice input started");
        break;
      case "stop-voice-input":
        // Implement voice input stop logic
        console.log("Voice input stopped");
        break;
      case "open-ai-assistant":
        // Implement AI assistant logic
        console.log("AI assistant opened");
        break;
      case "share-whatsapp":
        // Implement WhatsApp share logic
        console.log("WhatsApp share triggered");
        break;
      case "share-email":
        // Implement email share logic
        console.log("Email share triggered");
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  }
</script>

<div class="flex h-screen bg-base-200 mountain-background" data-theme="modern">
  <!-- Top Navigation Bar - Fixed overlay spanning full width -->
  <div class="fixed top-0 left-0 right-0 z-30">
    <TopNavigationBar on:action={handleTopNavAction} />
  </div>

  <!-- Left Container - Positioned below top nav -->
  <div class="flex-shrink-0 pt-24">
    <LeftTileBar />
  </div>

  <!-- Middle Container -->
  <div class="flex-1 flex flex-col overflow-hidden pt-24">
    <!-- Main content area -->
    <main class="flex-1 scrollable-container bg-transparent">
      {#if currentPath === "/"}
        <!-- Full dashboard layout with sidebar for home page -->
        <DashboardTiles />
      {:else}
        <!-- Content pages with breadcrumb -->
        <div class="p-4 sm:p-6 lg:p-8 relative">
          <div class="content-container rounded-3xl border-0 p-6 sm:p-8">
            <!-- Breadcrumb Navigation -->
            <div class="mb-6 flex items-center space-x-2 text-sm">
              <button on:click={() => goto("/")} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                <Icon icon="heroicons:home" class="w-4 h-4" />
                <span>Home</span>
              </button>
              <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-600 dark:text-gray-300 capitalize">
                {currentPath.split("/").filter(Boolean).join(" › ")}
              </span>
            </div>

            <!-- Page content -->
            <slot />
          </div>
        </div>
      {/if}
    </main>
  </div>

  <!-- Right Container -->
  <div class="flex-shrink-0">
    <!-- Right tile bar functionality moved to TopNavigationBar -->
  </div>

  <!-- Floating Action Buttons -->
  <FloatingActionButtons on:action={handleTopNavAction} />

  <!-- Footer with Gurukulavasam link - Bottom center, smaller -->
  <div class="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
    <a href="https://www.gurukulavasam.org" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-1">
      <span>Gurukulavasam</span>
      <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
    </a>
  </div>
</div>

<style>
  .mountain-background {
    position: relative;
    overflow: hidden;
    background-image: url("/Cover.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .mountain-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3); /* Dark overlay for better text readability */
    z-index: 0;
    pointer-events: none; /* Allow interactions to pass through */
  }

  .content-container {
    min-height: calc(100vh - 200px);
    transition: all 0.3s ease;
    position: relative;
    overflow-y: auto;
    z-index: 1;
  }

  .scrollable-container {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    z-index: 1;
  }

  /* Ensure proper scrolling for the main content */
  .scrollable-container::-webkit-scrollbar {
    width: 6px;
  }

  .scrollable-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollable-container::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 3px;
  }

  .scrollable-container::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
  }
</style>
