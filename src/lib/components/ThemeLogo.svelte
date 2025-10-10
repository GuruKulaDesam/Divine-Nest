<script>
  import { onMount } from "svelte";
  import { theme, THEMES } from "../stores/theme.js";

  // Props for styling
  export let width = "w-32";
  export let height = "h-8";

  let mounted = false;

  // Reactive logo path based on theme
  // $: logoSrc = $theme === THEMES.DARK ? "/logo-dark.svg" : "/logo-light.svg";

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
    <div class="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-xl shadow-lg px-2 py-1">
      <span class="text-sm font-bold text-white leading-tight" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5); font-family: 'Noto Sans Tamil', sans-serif; line-height: 1;">தாய்</span>
      <span class="text-sm font-bold text-white leading-tight" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5); font-family: 'Noto Sans Tamil', sans-serif; line-height: 1;">வழி</span>
    </div>
  {:else}
    <!-- Loading placeholder -->
    <div class="animate-pulse bg-base-300 rounded w-24 h-6"></div>
  {/if}
</div>
