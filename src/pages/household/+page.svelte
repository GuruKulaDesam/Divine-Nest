<script>
  import { onMount } from "svelte";
  import HouseholdManager from "$lib/components/HouseholdManager.svelte";
  import { initHomeDB } from "$lib/data/home.js";

  onMount(async () => {
    await initHomeDB();
  });
</script>

<svelte:head>
  <title>Household Management - South Indian Family Life App</title>
  <meta name="description" content="Detailed household management with family coordination and maintenance tracking" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-orange-800 mb-2">🏠 Household Management</h1>
      <p class="text-lg text-orange-600">Detailed coordination and maintenance of your South Indian household</p>
    </div>

    <HouseholdManager />
  </div>
</div>
