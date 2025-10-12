<script>
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import MobileNavigation from "./MobileNavigation.svelte";
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

  // Mobile-specific state
  let showMobileMenu = false;

  // Handle actions from the top navigation bar
  function handleTopNavAction(event) {
    const { action, tile } = event.detail;
    console.log(`Mobile Action triggered: ${action}`, tile);

    switch (action) {
      case "quick-task":
        console.log("Mobile quick task action triggered");
        break;
      case "quick-note":
        console.log("Mobile quick note action triggered");
        break;
      case "quick-reminder":
        console.log("Mobile quick reminder action triggered");
        break;
      case "voice-note":
        console.log("Mobile voice note action triggered");
        break;
      case "voice-command":
        console.log("Mobile voice command action triggered");
        break;
      default:
        console.log(`Unknown mobile action: ${action}`);
    }
  }

  // Handle mobile navigation
  function handleMobileNav(event) {
    const { path } = event.detail;
    if (path) {
      goto(path).catch((error) => {
        console.error("Mobile navigation error:", error);
      });
    }
    showMobileMenu = false; // Close menu after navigation
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }
</script>

<div class="relative flex flex-col h-screen bg-base-200" data-theme={$theme}>
  <!-- Background Layer - Optimized for mobile -->
  <div class="fixed inset-0 {$theme === 'transparent' ? 'transparent-background' : ''} nature-background-mobile z-0"></div>

  <!-- Content Layer - Mobile optimized -->
  <div class="relative z-10 flex flex-col w-full h-full">
    <!-- Top Navigation - Mobile optimized -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <TopNavigationBar on:action={handleTopNavAction} />
    </div>

    <!-- Mobile Menu Overlay -->
    {#if showMobileMenu}
      <div class="fixed inset-0 z-40 bg-black bg-opacity-50" on:click={toggleMobileMenu}>
        <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl p-6" on:click|stopPropagation>
          <MobileNavigation on:navigate={handleMobileNav} />
        </div>
      </div>
    {/if}

    <!-- Main Content Area - Mobile optimized -->
    <div class="flex-1 flex flex-col overflow-hidden pt-16">
      <main class="flex-1 mobile-scrollable-container bg-transparent">
        {#if currentPath === "/"}
          <!-- Mobile dashboard - simplified layout -->
          <div class="p-2">
            <DashboardTiles />
          </div>
        {:else}
          <!-- Mobile content pages -->
          <div class="p-2 relative">
            <div class="content-container rounded-lg border-0 p-4 mx-auto max-w-full">
              <!-- Mobile breadcrumb - simplified -->
              <div class="flex items-center space-x-2 text-xs mb-4">
                <button on:click={() => goto("")} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                  <Icon icon="heroicons:home" class="w-3 h-3" />
                  <span>Home</span>
                </button>
                <Icon icon="heroicons:chevron-right" class="w-3 h-3 text-gray-400" />
                <span class="text-gray-600 dark:text-gray-300 capitalize text-xs">
                  {currentPath.startsWith("/home/") ? currentPath.replace("/home/", "").split("/").filter(Boolean).join(" › ") : currentPath.split("/").filter(Boolean).join(" › ")}
                </span>
              </div>

              <!-- Page content - mobile optimized -->
              <slot />
            </div>
          </div>
        {/if}
      </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="flex justify-around items-center py-2 px-4">
        <button
          on:click={() => goto("/")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors {$currentPath === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}"
        >
          <Icon icon="heroicons:home" class="w-5 h-5" />
          <span class="text-xs">Home</span>
        </button>

        <button
          on:click={toggleMobileMenu}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
        >
          <Icon icon="heroicons:bars-3" class="w-5 h-5" />
          <span class="text-xs">Menu</span>
        </button>

        <button
          on:click={() => goto("/assistant")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors {$currentPath.startsWith('/assistant') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}"
        >
          <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5" />
          <span class="text-xs">AI</span>
        </button>

        <button
          on:click={() => goto("/settings")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors {$currentPath.startsWith('/settings') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}"
        >
          <Icon icon="heroicons:cog-6-tooth" class="w-5 h-5" />
          <span class="text-xs">Settings</span>
        </button>
      </div>
    </div>

    <!-- Bottom spacing for mobile navigation -->
    <div class="h-16"></div>
  </div>
</div>

<style>
  /* Mobile-specific styles */
  .mobile-scrollable-container {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Hide scrollbar on mobile */
    -ms-overflow-style: none; /* Hide scrollbar on IE/Edge */
  }

  .mobile-scrollable-container::-webkit-scrollbar {
    display: none; /* Hide scrollbar on WebKit browsers */
  }

  /* Mobile background - optimized for performance */
  .nature-background-mobile {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: scroll; /* Not fixed on mobile for better performance */
  }

  .transparent-background {
    background: transparent !important;
  }

  /* Mobile touch targets - ensure minimum 44px */
  button {
    min-height: 44px;
    min-width: 44px;
  }

  /* Mobile menu animation */
  .mobile-menu-enter {
    transform: translateY(100%);
    opacity: 0;
  }

  .mobile-menu-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 0.3s ease-out;
  }

  .mobile-menu-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-menu-exit-active {
    transform: translateY(100%);
    opacity: 0;
    transition: all 0.3s ease-in;
  }
</style>