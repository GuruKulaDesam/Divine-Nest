<script>
  import LeftTileBar from "./LeftTileBar.svelte";
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import FloatingActionButtons from "./FloatingActionButtons.svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { theme, themeActions } from "$lib/stores/theme";
  import { backgroundActions } from "$lib/stores/background";

  // Initialize stores
  themeActions.init();
  backgroundActions.init();

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

<div class="flex h-screen {$theme === 'transparent' ? 'transparent-background' : 'bg-base-200'} nature-background" data-theme={$theme} style="--background-png: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')">
  <!-- Top Navigation Bar - Fixed overlay spanning full width -->
  <div class="fixed top-0 left-0 right-0 z-50">
    <TopNavigationBar on:action={handleTopNavAction} />
  </div>

  <!-- Left Container - Positioned below top nav -->
  <div class="flex-shrink-0 pt-32">
    <LeftTileBar />
  </div>

  <!-- Middle Container -->
  <div class="flex-1 flex flex-col overflow-hidden pt-32">
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
                {currentPath.startsWith("/home/") ? currentPath.replace("/home/", "").split("/").filter(Boolean).join(" › ") : currentPath.split("/").filter(Boolean).join(" › ")}
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
  .nature-background {
    position: relative;
    overflow: hidden;
    background-image: var(--background-png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .nature-background::before {
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

  /* Transparent mode - no overlay, full mountain background visible */
  [data-theme="transparent"] .nature-background::before {
    display: none;
  }

  .content-container {
    min-height: calc(100vh - 200px);
    transition: all 0.3s ease;
    position: relative;
    overflow-y: auto;
    z-index: 1;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 32px;
    box-shadow: 0 20px 40px var(--glass-shadow);
  }

  /* In transparent mode, content containers have light background */
  [data-theme="transparent"] .content-container {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.2);
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

  /* Transparent background class for transparent mode */
  .transparent-background {
    background: transparent !important;
  }

  /* Additional background styles */
  .forest-background {
    background-image: linear-gradient(135deg, #0f5132 0%, #1e3a8a 100%);
  }

  .ocean-background {
    background-image: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%);
  }

  .sunset-background {
    background-image: linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%);
  }

  .dawn-background {
    background-image: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%);
  }

  .night-background {
    background-image: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
  }

  .desert-background {
    background-image: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%);
  }

  .snow-background {
    background-image: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  }

  .autumn-background {
    background-image: linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%);
  }

  .minimal-background {
    background-image: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  }

  .dark-background {
    background-image: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }

  .light-background {
    background-image: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  }

  .gradient-background {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
</style>
