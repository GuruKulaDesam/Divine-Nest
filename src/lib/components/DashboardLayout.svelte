<script>
  import LeftTileBar from "./LeftTileBar.svelte";
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import FloatingActionButtons from "./FloatingActionButtons.svelte";

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
  <div class="flex-shrink-0 pt-20">
    <LeftTileBar />
  </div>

  <!-- Middle Container -->
  <div class="flex-1 flex flex-col overflow-hidden pt-20">
    <!-- Main content area -->
    <main class="flex-1 scrollable-container bg-transparent">
      <div class="p-4 sm:p-6 lg:p-8 relative">
        <div class="content-container rounded-3xl bg-gray-100 shadow-2xl border-0 p-6 sm:p-8">
          <!-- Dashboard Tiles for current page -->
          <DashboardTiles />
          <slot />
        </div>
      </div>
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
  }

  .mountain-background::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top, rgba(135, 206, 235, 0.3) 0%, transparent 50%), linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
    opacity: 0.5;
    z-index: -1;
  }

  .content-container {
    min-height: calc(100vh - 200px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .content-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 1.5rem;
    z-index: -1;
  }

  .content-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  /* Mountain silhouettes */
  .mountain-background::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(45deg, transparent 30%, #2d3748 30%, #2d3748 35%, transparent 35%), linear-gradient(135deg, transparent 20%, #1a202c 20%, #1a202c 25%, transparent 25%), linear-gradient(90deg, transparent 10%, #0f1419 10%, #0f1419 15%, transparent 15%);
    background-size:
      100% 100%,
      80% 80%,
      60% 60%;
    background-position:
      0% 100%,
      20% 100%,
      40% 100%;
    background-repeat: no-repeat;
    opacity: 0.3;
    z-index: -1;
  }
</style>
