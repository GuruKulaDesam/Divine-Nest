<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    // Redirect to dashboard as the main entry point
    goto("/activities/dashboard", { replaceState: true });
  });
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="text-center">
    <div class="loading loading-spinner loading-lg text-primary"></div>
    <p class="mt-4 text-base-content/70">Loading Activities Dashboard...</p>
  </div>
</div>
