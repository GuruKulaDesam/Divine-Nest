<script>
  import '../app.css';
  import '$lib/i18n/index.js';
  import DesktopLayout from '$lib/components/DesktopLayout.svelte';
  import MobileLayout from '$lib/components/MobileLayout.svelte';
  import VoiceAssistant from '$lib/components/VoiceAssistant.svelte';
  import { shouldUseDesktopLayout, shouldUseMobileLayout } from '$lib/utils/platform';
  import { viewMode } from '$lib/stores/viewMode';
  import { base } from '$app/paths';
  import { userProfile } from '$lib/stores/userProfile';

  import { onMount } from 'svelte';
  import { crashAnalytics, setupGlobalErrorHandler } from '$lib/services/crashAnalytics';
  import { performanceMonitor } from '$lib/utils/performance';

  // Voice Assistant state
  let showVoiceAssistant = false;
  let conversation = [];
  let isListening = false;

  // Double-tap detection
  let lastTap = 0;
  let tapCount = 0;

  function handleDoubleTap() {
    const currentTime = new Date().getTime();
    const tapGap = currentTime - lastTap;

    if (tapGap < 300 && tapGap > 0) {
      tapCount++;
      if (tapCount === 2) {
        // Double tap detected
        showVoiceAssistant = true;
        tapCount = 0;
      }
    } else {
      tapCount = 1;
    }

    lastTap = currentTime;
  }

  function handleVoiceAssistantClose() {
    showVoiceAssistant = false;
    conversation = [];
    isListening = false;
  }

  // Layout determination - initialized safely for SSR
  let useDesktopLayout = true; // Default to desktop for SSR
  let useMobileLayout = false;

  onMount(async () => {
    // Initialize crash analytics
    await crashAnalytics.initialize();

    // Setup global error handlers
    setupGlobalErrorHandler();

    // Initialize performance monitoring
    performanceMonitor.initialize();

    // Set layout based on platform detection (client-side only)
    useDesktopLayout = shouldUseDesktopLayout();
    useMobileLayout = shouldUseMobileLayout();

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

    // Add double-tap listener to document body
    document.body.addEventListener('touchstart', handleDoubleTap);
    document.body.addEventListener('click', handleDoubleTap);
  });
</script>

{#if useDesktopLayout}
  <!-- Desktop/Web Layout - Full featured with sidebar -->
  <DesktopLayout>
    <slot />
  </DesktopLayout>
{:else if useMobileLayout}
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

<!-- Voice Assistant Overlay -->
<VoiceAssistant
  bind:isVisible={showVoiceAssistant}
  bind:conversation
  bind:isListening
  on:close={handleVoiceAssistantClose}
/>