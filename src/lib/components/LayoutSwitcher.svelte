<script>
  import { shouldUseDesktopLayout, shouldUseMobileLayout } from '$lib/utils/platform';
  import { onMount } from 'svelte';

  let forceLayout = null; // null = auto-detect, 'desktop' = force desktop, 'mobile' = force mobile
  let showSwitcher = false;

  onMount(() => {
    // Load saved preference from localStorage
    const saved = localStorage.getItem('layout-preference');
    if (saved) {
      forceLayout = saved;
    }
  });

  function toggleLayout() {
    if (forceLayout === null) {
      forceLayout = shouldUseDesktopLayout() ? 'mobile' : 'desktop';
    } else if (forceLayout === 'desktop') {
      forceLayout = 'mobile';
    } else {
      forceLayout = null; // back to auto-detect
    }

    // Save preference
    if (forceLayout === null) {
      localStorage.removeItem('layout-preference');
    } else {
      localStorage.setItem('layout-preference', forceLayout);
    }

    // Reload page to apply new layout
    window.location.reload();
  }

  function getCurrentLayout() {
    if (forceLayout === 'desktop') return 'Desktop';
    if (forceLayout === 'mobile') return 'Mobile';
    return 'Auto';
  }

  function getNextLayout() {
    if (forceLayout === null) return 'Desktop';
    if (forceLayout === 'desktop') return 'Mobile';
    return 'Auto';
  }
</script>

<!-- Layout Switcher - Bottom Right Corner -->
<div class="fixed bottom-4 right-4 z-50">
  <button
    on:click={() => showSwitcher = !showSwitcher}
    class="bg-base-100 border border-base-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
    aria-label="Layout switcher"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  </button>

  {#if showSwitcher}
    <div class="absolute bottom-16 right-0 bg-base-100 border border-base-300 rounded-lg shadow-xl p-4 min-w-48 animate-in fade-in slide-in-from-bottom-2">
      <h3 class="font-semibold text-base-content mb-3">Layout Switcher</h3>

      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-base-content/70">Current:</span>
          <span class="font-medium text-base-content">{getCurrentLayout()}</span>
        </div>

        <button
          on:click={toggleLayout}
          class="w-full bg-primary text-primary-content rounded-lg py-2 px-3 text-sm font-medium hover:bg-primary-focus transition-colors"
        >
          Switch to {getNextLayout()}
        </button>

        <div class="text-xs text-base-content/50 mt-2">
          Auto-detects based on device. Manual override persists across sessions.
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .animate-in {
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>