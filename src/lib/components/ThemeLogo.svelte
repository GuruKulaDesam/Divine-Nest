<script>
  import { onMount } from 'svelte';
  import { theme, THEMES } from '../stores/theme.js';

  // Props for styling
  export let width = "w-32";
  export let height = "h-8";
  export let alt = "Logo";
  
  let mounted = false;
  
  // Reactive logo path based on theme
  $: logoSrc = $theme === THEMES.DARK ? '/logo-dark.svg' : '/logo-light.svg';
  
  onMount(() => {
    // Preload both logos for smooth switching
    const preloadLight = new Image();
    const preloadDark = new Image();
    preloadLight.src = '/logo-light.svg';
    preloadDark.src = '/logo-dark.svg';
    
    mounted = true;
  });

  function handleError(event) {
    console.warn('Logo failed to load:', event.target.src);
    // Fallback to a simple text logo if image fails
    event.target.style.display = 'none';
  }
</script>

<div class="flex items-center justify-center {width} {height}">
  {#if mounted}
    <img 
      src={logoSrc} 
      {alt}
      class="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
      loading="eager"
      on:error={handleError}
    />
  {:else}
    <!-- Loading placeholder -->
    <div class="animate-pulse bg-base-300 rounded w-24 h-6"></div>
  {/if}
</div> 