<script>
  import LeftTileBar from "./LeftTileBar.svelte";
  import TopNavigationBar from "./TopNavigationBar.svelte";
  import DashboardTiles from "./DashboardTiles.svelte";
  import FloatingActionButtons from "./FloatingActionButtons.svelte";
  import LayoutSwitcher from "./LayoutSwitcher.svelte";
  import UserLoginModal from "./UserLoginModal.svelte";
  import GestureRecognizer from "./GestureRecognizer.svelte";
  import VoiceDashboardController from "./VoiceDashboardController.svelte";
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

  // Gesture handling functions
  function handleGesture(event) {
    const { type, data } = event.detail;
    console.log('Gesture detected:', type, data);

    switch (type) {
      case 'swipe_up':
        // Navigate to previous section or scroll up
        break;
      case 'swipe_down':
        // Navigate to next section or scroll down
        break;
      case 'swipe_left':
        // Go back in navigation
        goto(-1);
        break;
      case 'swipe_right':
        // Go forward in navigation
        goto(1);
        break;
      case 'tap':
        // Handle tap gestures
        break;
    }
  }

  function handleTap(event) {
    const { count, position } = event.detail;
    console.log('Tap detected:', count, position);

    if (count === 1) {
      // Single tap - could be used for selection
    } else if (count === 2) {
      // Double tap - could activate voice control
      // This would be handled by the VoiceControlOverlay
    } else if (count === 3) {
      // Triple tap - emergency action
      console.log('Emergency gesture detected');
    }
  }

  function handleSwipe(event) {
    const { direction, distance } = event.detail;
    console.log('Swipe detected:', direction, distance);

    // Handle swipe gestures for navigation
    switch (direction) {
      case 'up':
        // Scroll up or navigate to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'down':
        // Scroll down or navigate to bottom
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        break;
      case 'left':
        // Navigate back
        goto(-1);
        break;
      case 'right':
        // Navigate forward
        goto(1);
        break;
    }
  }

  function handleShake(event) {
    const { intensity } = event.detail;
    console.log('Shake detected:', intensity);

    // Shake gesture - could be used for emergency actions
    if (intensity > 20) {
      console.log('Strong shake detected - emergency action');
      // Could trigger emergency contact or reset interface
    }
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
          <!-- Content pages with sub-menu sidebar and breadcrumb -->
          <div class="flex h-full">
            <!-- Sub-menu Sidebar -->
            <div class="w-64 bg-white/20 dark:bg-gray-900/40 border-r border-white/30 dark:border-gray-700/50 flex-shrink-0 shadow-lg backdrop-blur-md">
              <div class="p-4">
                <h3 class="text-lg font-semibold text-base-content mb-4 border-b border-white/20 dark:border-gray-700/30 pb-2">Menu</h3>
                <nav class="space-y-2">
                  <!-- Sub-menu items will be populated based on current section -->
                  {#if currentPath.startsWith('/tasks/')}
                    <a href="/tasks/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/tasks/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/tasks/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/tasks/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/tasks/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/tasks/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/tasks/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/tasks/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/tasks/calendar" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/tasks/calendar' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:calendar" class="w-5 h-5 inline mr-2" />
                      Calendar
                    </a>
                  {:else if currentPath.startsWith('/issues/')}
                    <a href="/issues/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/issues/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/issues/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/issues/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/issues/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/issues/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/issues/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/issues/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/issues/projects" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/issues/projects' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:folder" class="w-5 h-5 inline mr-2" />
                      Projects
                    </a>
                  {:else if currentPath.startsWith('/requests/')}
                    <a href="/requests/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/requests/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/requests/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/requests/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/requests/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/requests/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/requests/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/requests/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/requests/history" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/requests/history' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:clock" class="w-5 h-5 inline mr-2" />
                      History
                    </a>
                  {:else if currentPath.startsWith('/alerts/')}
                    <a href="/alerts/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/alerts/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/alerts/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/alerts/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/alerts/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/alerts/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/alerts/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/alerts/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/alerts/settings" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/alerts/settings' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:cog" class="w-5 h-5 inline mr-2" />
                      Settings
                    </a>
                  {:else if currentPath.startsWith('/family/')}
                    <a href="/family/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/family/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/family/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/family/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/family/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/family/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/family/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/family/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/family/tree" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/family/tree' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:user-group" class="w-5 h-5 inline mr-2" />
                      Tree
                    </a>
                  {:else if currentPath.startsWith('/foods/') || currentPath.startsWith('/food/')}
                    <a href="/foods/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/foods/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/foods/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/foods/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/foods/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/foods/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/foods/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/foods/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/foods/recipes" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/foods/recipes' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:book-open" class="w-5 h-5 inline mr-2" />
                      Recipes
                    </a>
                  {:else if currentPath.startsWith('/inventory/')}
                    <a href="/inventory/dashboard" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/inventory/dashboard' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:chart-bar" class="w-5 h-5 inline mr-2" />
                      Dashboard
                    </a>
                    <a href="/inventory/create" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/inventory/create' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
                      Create
                    </a>
                    <a href="/inventory/review" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/inventory/review' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:eye" class="w-5 h-5 inline mr-2" />
                      Review
                    </a>
                    <a href="/inventory/update" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/inventory/update' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:pencil" class="w-5 h-5 inline mr-2" />
                      Update
                    </a>
                    <a href="/inventory/reports" class="block px-3 py-3 rounded-lg text-sm hover:bg-white/20 dark:hover:bg-gray-700/40 transition-colors font-medium {currentPath === '/inventory/reports' ? 'bg-primary/30 text-primary shadow-md' : 'text-base-content'}">
                      <Icon icon="heroicons:document-chart-bar" class="w-5 h-5 inline mr-2" />
                      Reports
                    </a>
                  {/if}
                </nav>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1 p-8 relative">
              <div class="content-container rounded-[2rem] border-0 p-8 mx-auto max-w-7xl bg-transparent">
                <!-- Breadcrumb Navigation -->
                <div class="flex mb-6 items-center space-x-2 text-sm">
                  <button on:click={() => goto("")} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                    <Icon icon="heroicons:home" class="w-4 h-4" />
                    <span>Home</span>
                  </button>
                  {#if currentPath !== '/'}
                    <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                    {#if currentPath.startsWith('/tasks/')}
                      <button on:click={() => goto('/tasks/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:clipboard-document-list" class="w-4 h-4" />
                        <span>Tasks</span>
                      </button>
                      {#if currentPath !== '/tasks/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else if currentPath.startsWith('/issues/')}
                      <button on:click={() => goto('/issues/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4" />
                        <span>Issues</span>
                      </button>
                      {#if currentPath !== '/issues/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else if currentPath.startsWith('/requests/')}
                      <button on:click={() => goto('/requests/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:chat-bubble-left-right" class="w-4 h-4" />
                        <span>Requests</span>
                      </button>
                      {#if currentPath !== '/requests/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else if currentPath.startsWith('/alerts/')}
                      <button on:click={() => goto('/alerts/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:bell" class="w-4 h-4" />
                        <span>Alerts</span>
                      </button>
                      {#if currentPath !== '/alerts/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else if currentPath.startsWith('/family/')}
                      <button on:click={() => goto('/family/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:user-group" class="w-4 h-4" />
                        <span>Family</span>
                      </button>
                      {#if currentPath !== '/family/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else if currentPath.startsWith('/foods/') || currentPath.startsWith('/food/')}
                      <button on:click={() => goto('/foods/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:utensils" class="w-4 h-4" />
                        <span>Foods</span>
                      </button>
                      {#if currentPath !== '/foods/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else if currentPath.startsWith('/inventory/')}
                      <button on:click={() => goto('/inventory/dashboard')} class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon icon="heroicons:archive-box" class="w-4 h-4" />
                        <span>Inventory</span>
                      </button>
                      {#if currentPath !== '/inventory/dashboard'}
                        <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300 capitalize">
                          {currentPath.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                        </span>
                      {/if}
                    {:else}
                      <span class="text-gray-600 dark:text-gray-300 capitalize">
                        {currentPath.split('/').filter(Boolean).join(' › ') || 'Dashboard'}
                      </span>
                    {/if}
                  {/if}
                </div>

                <!-- Page content -->
                <slot />
              </div>
            </div>
          </div>
        {/if}
      </main>
    </div>
  </div>

  <!-- Floating Action Buttons - Desktop optimized -->
  <FloatingActionButtons on:action={handleRequestsAction} />

  <!-- Voice Dashboard Controller -->
  <VoiceDashboardController />

  <!-- Gesture Recognition System -->
  <GestureRecognizer enabled={true} on:gesture={handleGesture} on:tap={handleTap} on:swipe={handleSwipe} on:shake={handleShake} />

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