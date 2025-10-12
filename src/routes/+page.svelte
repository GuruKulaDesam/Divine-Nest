<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import MealsPage from "$lib/components/MealsPage.svelte";

  let isSetupComplete = false;

  onMount(() => {
    // Check if household setup is completed
    const householdData = localStorage.getItem('divineNest_household');
    if (!householdData) {
      // Redirect to setup if not completed
      goto('/setup');
    } else {
      isSetupComplete = true;
    }
  });
</script>

{#if isSetupComplete}
  <MealsPage />
{/if}
