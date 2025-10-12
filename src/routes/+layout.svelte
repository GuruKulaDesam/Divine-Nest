<script>
  import '../app.css';
  import '$lib/i18n/index.js';
  import DesktopLayout from '$lib/components/DesktopLayout.svelte';
  import MobileLayout from '$lib/components/MobileLayout.svelte';
  import UserSetup from '$lib/components/UserSetup.svelte';
  import { shouldUseDesktopLayout, shouldUseMobileLayout } from '$lib/utils/platform';
  import { base } from '$app/paths';
  import { userProfile } from '$lib/stores/userProfile';

  import { onMount } from 'svelte';
  import { crashAnalytics, setupGlobalErrorHandler } from '$lib/services/crashAnalytics';
  import { performanceMonitor } from '$lib/utils/performance';

  let showUserSetup = false;

  // Check if user setup is needed
  $: showUserSetup = !$userProfile.isSetupComplete;

  function handleSetupComplete() {
    showUserSetup = false;
  }

  onMount(async () => {
    // Initialize crash analytics
    await crashAnalytics.initialize();

    // Setup global error handlers
    setupGlobalErrorHandler();

    // Initialize performance monitoring
    performanceMonitor.initialize();

    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${base}/service-worker.js`)
        .then(registration => {
          console.log('[PWA] Service Worker registered:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  if (confirm('A new version of Home Management Suite is available. Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Handle controller change (when new SW takes control)
          registration.addEventListener('controllerchange', () => {
            console.log('[PWA] Service Worker updated, reloading...');
            window.location.reload();
          });
        })
        .catch(error => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }
  });
</script>

<!-- User Setup Modal -->
{#if showUserSetup}
  <UserSetup on:setupComplete={handleSetupComplete} />
{/if}

{#if shouldUseDesktopLayout()}
  <!-- Desktop/Web Layout - Full featured with sidebar -->
  <DesktopLayout>
    <slot />
  </DesktopLayout>
{:else if shouldUseMobileLayout()}
  <!-- Mobile/Android Layout - Touch optimized -->
  <MobileLayout>
    <slot />
  </MobileLayout>
{:else}
  <!-- Fallback - Default to desktop layout -->
  <DesktopLayout>
    <slot />
  </DesktopLayout>
{/if}