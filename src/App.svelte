<script>
  import { onMount } from 'svelte';
  import DashboardLayout from './lib/components/DashboardLayout.svelte';
  import HomePage from './lib/pages/HomePage.svelte';
  import UsersPage from './lib/components/UsersPage.svelte';
  import ProductsPage from './lib/pages/ProductsPage.svelte';
  import SettingsPage from './lib/pages/SettingsPage.svelte';
  import AnalyticsPage from './lib/pages/AnalyticsPage.svelte';
  import ProjectManagementPage from './lib/pages/ProjectManagementPage.svelte';
  import ProfilePage from './lib/pages/ProfilePage.svelte';
  import MapsPage from './lib/pages/MapsPage.svelte';
  import SchedulePage from './lib/pages/SchedulePage.svelte';
  import NotFoundPage from './lib/pages/NotFoundPage.svelte';
  import { route } from './lib/router.js';
  import { pageTransitions } from './lib/utils/motion.js';
  import { themeActions } from './lib/stores/theme.js';
  import { isLoading } from 'svelte-i18n';
  import { i18nReadyPromise } from './lib/i18n/index.js';

  let current;
  let pageElement;
  let previousRoute = '';
  let appReady = false;

  $: $route, current =
    $route === '/' ? HomePage
    : $route === '/users' ? UsersPage
    : $route === '/products' ? ProductsPage
    : $route === '/settings' ? SettingsPage
    : $route === '/analytics' ? AnalyticsPage
    : $route === '/projects' ? ProjectManagementPage
    : $route === '/profile' ? ProfilePage
    : $route === '/maps' ? MapsPage
    : $route === '/schedule' ? SchedulePage
    : NotFoundPage;

  // Handle page transitions
  $: if ($route !== previousRoute && pageElement && appReady) {
    // Exit animation for previous page
    if (previousRoute) {
      pageTransitions.exit(pageElement);
    }
    
    // Enter animation for new page
    setTimeout(() => {
      if (pageElement) {
        pageTransitions.enter(pageElement);
      }
    }, 100);
    
    previousRoute = $route;
  }
  
  onMount(async () => {
    // Initialize theme system
    themeActions.init();
    
    // Wait for i18n to be ready
    await i18nReadyPromise;
    
    // Mark app as ready
    appReady = true;
    
    // Initial page animation
    setTimeout(() => {
      if (pageElement) {
        pageTransitions.enter(pageElement);
      }
    }, 100);
  });
</script>

{#if !appReady || $isLoading}
  <div class="flex items-center justify-center min-h-screen bg-base-100">
    <div class="text-center">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <p class="mt-4 text-base-content/60">Loading...</p>
    </div>
  </div>
{:else}
  <DashboardLayout>
    <div bind:this={pageElement} class="page-container scrollable-container">
      <svelte:component this={current} />
    </div>
  </DashboardLayout>
{/if}

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  
  .page-container {
    min-height: 100%;
    overflow-x: hidden;
  }
</style>
