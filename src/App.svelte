<script>
  import { onMount } from 'svelte';
  import DashboardLayout from './lib/components/DashboardLayout.svelte';
  import HomePage from './lib/pages/HomePage.svelte';
  import UsersPage from './lib/pages/UsersPage.svelte';
  import ProductsPage from './lib/pages/ProductsPage.svelte';
  import SettingsPage from './lib/pages/SettingsPage.svelte';
  import AnalyticsPage from './lib/pages/AnalyticsPage.svelte';
  import ProjectManagementPage from './lib/pages/ProjectManagementPage.svelte';
  import ProfilePage from './lib/pages/ProfilePage.svelte';
  import MapsPage from './lib/pages/MapsPage.svelte';
  import SchedulePage from './lib/pages/SchedulePage.svelte';
  import NotFoundPage from './lib/pages/NotFoundPage.svelte';
  import LoginPage from './lib/pages/LoginPage.svelte';
  import LoginV2 from './lib/pages/LoginV2.svelte';
  import LoginV3 from './lib/pages/LoginV3.svelte';
  import RegisterPage from './lib/pages/RegisterPage.svelte';
  import RegisterV2 from './lib/pages/RegisterV2.svelte';
  import RegisterV3 from './lib/pages/RegisterV3.svelte';
  import ChartsPage from './lib/pages/ChartsPage.svelte';
  import GanttPage from './lib/pages/GanttPage.svelte';
  import { currentRoute } from './lib/router.js';
  import { pageTransitions } from './lib/utils/motion.js';
  import { themeActions } from './lib/stores/theme.js';
  import { isLoading } from 'svelte-i18n';
  import { i18nReadyPromise } from './lib/i18n/index.js';

  let current;
  let pageElement;
  let previousRoute = '';
  let appReady = false;
  let showFullPage = false;

  $: {
    // Determine if we should show a full page (without dashboard layout)
    showFullPage = $currentRoute.startsWith('/auth/');
    
    // Update current component based on route
    current = 
      $currentRoute === '/' ? HomePage
      : $currentRoute === '/users' ? UsersPage
      : $currentRoute === '/products' ? ProductsPage
      : $currentRoute === '/settings' ? SettingsPage
      : $currentRoute === '/analytics' ? AnalyticsPage
      : $currentRoute === '/charts' ? ChartsPage
      : $currentRoute === '/projects' ? ProjectManagementPage
      : $currentRoute === '/profile' ? ProfilePage
      : $currentRoute === '/maps' ? MapsPage
      : $currentRoute === '/schedule' ? SchedulePage
      : $currentRoute === '/auth/login' ? LoginPage
      : $currentRoute === '/auth/login-v2' ? LoginV2
      : $currentRoute === '/auth/login-v3' ? LoginV3
      : $currentRoute === '/auth/register' ? RegisterPage
      : $currentRoute === '/auth/register-v2' ? RegisterV2
      : $currentRoute === '/auth/register-v3' ? RegisterV3
      : $currentRoute === '/gantt' ? GanttPage
      : NotFoundPage;
  }

  // Handle page transitions
  $: if ($currentRoute !== previousRoute && pageElement && appReady) {
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
    
    previousRoute = $currentRoute;
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
  {#if showFullPage}
    <div bind:this={pageElement}>
      <svelte:component this={current} />
    </div>
  {:else}
    <DashboardLayout>
      <div bind:this={pageElement} class="page-container scrollable-container">
        <svelte:component this={current} />
      </div>
    </DashboardLayout>
  {/if}
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
