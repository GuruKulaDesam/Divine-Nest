<script>
  import LeftTileBar from "./LeftTileBar.svelte";
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import FloatingActionButtons from "./FloatingActionButtons.svelte";
  import LayoutSwitcher from "./LayoutSwitcher.svelte";
  import UserLoginModal from "./UserLoginModal.svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { theme, themeActions } from "$lib/stores/theme";
  import { backgroundActions } from "$lib/stores/background";
  import { userProfileActions } from "$lib/stores/userProfile";
  import { userRoleActions } from "$lib/stores/userRole";
  import { onMount } from 'svelte';

  // Initialize stores on mount
  onMount(async () => {
    themeActions.init();
    backgroundActions.init();
    userProfileActions.init();
    await userRoleActions.init();
  });

  // Reactive statement for current path
  $: currentPath = $page.url.pathname;

  let showLoginModal = false;

  // Handle actions from floating action buttons (requests)
  function handleRequestsAction(event) {
    console.log('FloatingActionButtons action:', event.detail);
  }

  // Handle actions from the top navigation bar (right tiles)
  function handleTopNavAction(event) {
    const { action, tile } = event.detail;
    console.log(`Action triggered: ${action}`, tile);

    switch (action) {
      case "edit-profile":
        showLoginModal = true;
        break;
      case "quick-task":
        console.log("Quick task action triggered");
        break;
      case "quick-note":
        console.log("Quick note action triggered");
        break;
      case "quick-reminder":
        console.log("Quick reminder action triggered");
        break;
      case "voice-note":
        console.log("Voice note action triggered");
        break;
      case "voice-command":
        console.log("Voice command action triggered");
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  }

  function handleLoginComplete() {
    showLoginModal = false;
  }
</script>

<div class="relative flex h-screen bg-base-200" data-theme={$theme}>
  <!-- Background Layer - Behind everything -->
  <div class="fixed inset-0 {$theme === 'transparent' ? 'transparent-background' : ''} nature-background z-0" style="--background-png: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"></div>

  <!-- Content Layer - Above background -->
  <div class="relative z-10 flex w-full">
    <!-- Requests Dashboard - Fixed overlay spanning full width -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <TopNavigationBar on:action={handleTopNavAction} />
    </div>

    <!-- Left Container - Always visible on desktop -->
    <div class="flex flex-shrink-0 pt-32">
      <LeftTileBar />
    </div>

    <!-- Middle Container -->
    <div class="flex-1 flex flex-col overflow-hidden pt-32">
      <!-- Main content area -->
      <main class="flex-1 scrollable-container bg-white/10 dark:bg-gray-900/20 border-l border-white/20 dark:border-gray-700/30">
        {#if currentPath === "/"}
          <!-- Desktop dashboard with full sidebar -->
          <DashboardTiles />
        {:else}
          <!-- Content pages with breadcrumb -->
          <div class="p-8 relative">
            <div class="content-container rounded-[2rem] border-0 p-8 mx-auto max-w-7xl bg-transparent">
              <!-- Breadcrumb Navigation -->
              <div class="flex mb-6 items-center space-x-2 text-sm">
                <button on:click={() => goto("")} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
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
  </div>

  <!-- Floating Action Buttons - Desktop optimized -->
  <FloatingActionButtons on:action={handleRequestsAction} />

  <!-- Layout Switcher - Bottom Right -->
  <LayoutSwitcher />

  <!-- User Login Modal -->
  {#if showLoginModal}
    <UserLoginModal on:loginComplete={handleLoginComplete} />
  {/if}
</div>

<style>
  /* Desktop-specific styles */
  .scrollable-container {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }

  .scrollable-container::-webkit-scrollbar {
    width: 8px;
  }

  .scrollable-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollable-container::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
  }

  .scrollable-container::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }

  /* Background styles */
  .nature-background {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .mountain-background {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .minimal-background {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%);
    background-attachment: fixed;
  }

  .dark-background {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(31, 41, 55, 0.9) 100%);
    background-attachment: fixed;
  }

  .light-background {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(243, 244, 246, 0.95) 100%);
    background-attachment: fixed;
  }

  .gradient-background {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-attachment: fixed;
  }

  .forest-background {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.2) 100%),
                url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .ocean-background {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(30, 64, 175, 0.2) 100%),
                url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .sunset-background {
    background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(220, 38, 38, 0.2) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .dawn-background {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.2) 100%),
                url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .night-background {
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .desert-background {
    background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(217, 119, 6, 0.2) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .snow-background {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(148, 163, 184, 0.6) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .autumn-background {
    background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(220, 38, 38, 0.2) 100%),
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .transparent-background {
    background: transparent !important;
  }
</style>