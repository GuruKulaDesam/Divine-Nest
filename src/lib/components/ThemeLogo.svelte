<script>
  import { onMount } from "svelte";
  import { theme, THEMES } from "../stores/theme.js";

  // Import logo images
  import Shivohm_Logo_Light from "$lib/assets/images/Shivohm_Logo_Light.png";
  import Shivohm_Logo_Dark from "$lib/assets/images/Shivohm_Logo_Dark.png";
  import Shivohm_Logo_White from "$lib/assets/images/Shivohm_Logo_White.png";

  // Props for styling
  export let width = "w-32";
  export let height = "h-8";

  let mounted = false;

  // Reactive logo path based on theme
  $: logoSrc = $theme === THEMES.LIGHT ? Shivohm_Logo_Light :
               $theme === THEMES.DARK ? Shivohm_Logo_Dark :
               $theme === THEMES.TRANSPARENT ? Shivohm_Logo_White :
               Shivohm_Logo_Light; // fallback

  onMount(() => {
    mounted = true;
  });

  function handleError(event) {
    console.warn("Logo failed to load:", event.target.src);
    // Fallback to a simple text logo if image fails
    event.target.style.display = "none";
  }
</script>

<div class="flex items-center justify-center {width} {height}">
  {#if mounted}
    <img
      src={logoSrc}
      alt="Shivohm Logo"
      class="object-contain max-w-full max-h-full"
      on:error={handleError}
    />
  {:else}
    <!-- Loading placeholder -->
    <div class="animate-pulse bg-base-300 rounded w-24 h-6"></div>
  {/if}
</div>
