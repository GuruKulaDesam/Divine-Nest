<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { theme, themeActions, THEMES } from '../stores/theme.js';
  import { motionHover } from '../utils/motion.js';

  let mounted = false;

  onMount(() => {
    // Initialize theme system
    themeActions.init();
    mounted = true;
  });

  function toggleTheme() {
    themeActions.toggle();
  }

  // Get the appropriate icon based on current theme
  $: icon = $theme === THEMES.DARK ? 'heroicons:sun' : 'heroicons:moon';
  $: label = $theme === THEMES.DARK ? 'Switch to light mode' : 'Switch to dark mode';
</script>

<button
  class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden group"
  on:click={toggleTheme}
  use:motionHover
  title={label}
  aria-label={label}
>
  <!-- Background effect -->
  <div class="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300 rounded-lg"></div>
  
  <!-- Icon container with rotation animation -->
  <div class="relative z-10 transition-transform duration-300 ease-in-out {mounted ? 'rotate-0' : 'rotate-180'} group-hover:scale-110">
    <Icon 
      {icon} 
      class="w-5 h-5 transition-all duration-300 ease-in-out" 
    />
  </div>
  
  <!-- Subtle glow effect for dark mode -->
  {#if $theme === THEMES.DARK}
    <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 rounded-lg transition-all duration-300"></div>
  {/if}
</button>

<style>
  /* Custom animation for theme transition */
  button {
    transform-origin: center;
  }
  
  button:active {
    transform: scale(0.95);
  }
  
  /* Smooth icon transition */
  button :global(.iconify) {
    filter: drop-shadow(0 0 0 transparent);
    transition: filter 0.3s ease;
  }
  
  button:hover :global(.iconify) {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  /* Dark mode specific styles */
  [data-theme="dark"] button:hover :global(.iconify) {
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1));
  }
</style> 