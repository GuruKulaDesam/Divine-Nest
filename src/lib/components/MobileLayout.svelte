<script>
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import MobileNavigation from "./MobileNavigation.svelte";
  import LayoutSwitcher from "./LayoutSwitcher.svelte";
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
        // Could open a quick task modal or navigate to todo page
        break;
      case "quick-note":
        console.log("Mobile quick note action triggered");
        // Could open a quick note modal
        break;
      case "quick-reminder":
        console.log("Mobile quick reminder action triggered");
        // Could open a quick reminder modal
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

  // Handle quick actions from dashboard tiles
  function handleQuickAction(event) {
    const { action, tile } = event.detail;
    console.log(`Mobile Quick Action: ${action} from ${tile}`);
    // Handle quick actions (could show toast, modal, etc.)
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

  // Handle mobile navigation close
  function handleMobileNavClose() {
    showMobileMenu = false;
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
          <MobileNavigation on:navigate={handleMobileNav} on:close={handleMobileNavClose} />
        </div>
      </div>
    {/if}

    <!-- Main Content Area - Mobile optimized -->
    <div class="flex-1 flex flex-col overflow-hidden pt-16">
      <main class="flex-1 mobile-scrollable-container bg-transparent">
        {#if currentPath === "/"}
          <!-- Mobile dashboard - simplified layout -->
          <div class="p-2">
            <DashboardTiles on:action={handleTopNavAction} on:quickAction={handleQuickAction} />
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

    <!-- Mobile Bottom Navigation - 5 Menu Design -->
    <div class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div class="flex justify-around items-center py-2 px-2 safe-area-bottom">
        <!-- Home -->
        <button
          on:click={() => goto("/")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 {$currentPath === '/' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'}"
          aria-label="Home"
        >
          <Icon icon="heroicons:home" class="w-6 h-6" />
          <span class="text-xs font-medium">Home</span>
        </button>

        <!-- Family -->
        <button
          on:click={() => goto("/members")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 {$currentPath.startsWith('/members') || $currentPath.startsWith('/home/members') ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 'text-gray-600 dark:text-gray-400'}"
          aria-label="Family"
        >
          <Icon icon="heroicons:users" class="w-6 h-6" />
          <span class="text-xs font-medium">Family</span>
        </button>

        <!-- Tasks -->
        <button
          on:click={() => goto("/todo")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 {$currentPath.startsWith('/todo') ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' : 'text-gray-600 dark:text-gray-400'}"
          aria-label="Tasks"
        >
          <Icon icon="heroicons:check-circle" class="w-6 h-6" />
          <span class="text-xs font-medium">Tasks</span>
        </button>

        <!-- Assistant -->
        <button
          on:click={() => goto("/assistant")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 {$currentPath.startsWith('/assistant') ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'text-gray-600 dark:text-gray-400'}"
          aria-label="AI Assistant"
        >
          <Icon icon="heroicons:sparkles" class="w-6 h-6" />
          <span class="text-xs font-medium">AI</span>
        </button>

        <!-- Settings -->
        <button
          on:click={() => goto("/settings")}
          class="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 {$currentPath.startsWith('/settings') ? 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50' : 'text-gray-600 dark:text-gray-400'}"
          aria-label="Settings"
        >
          <Icon icon="heroicons:cog-6-tooth" class="w-6 h-6" />
          <span class="text-xs font-medium">Settings</span>
        </button>
      </div>
    </div>

    <!-- Bottom spacing for mobile navigation -->
    <div class="h-16"></div>
  </div>

  <!-- Layout Switcher - Bottom Right -->
  <LayoutSwitcher />
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

  /* Safe area for iPhone notches */
  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }

  /* Enhanced mobile navigation styling */
  .mobile-nav-button {
    position: relative;
    border-radius: 12px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mobile-nav-button:hover {
    transform: scale(1.05);
  }

  .mobile-nav-button:active {
    transform: scale(0.95);
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