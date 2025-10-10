<script>
  import { onMount } from "svelte";
  import HomeDashboard from "$lib/components/HomeDashboard.svelte";
  import { initHomeDB } from "$lib/data/home.js";

  onMount(async () => {
    await initHomeDB();
  });
</script>

<svelte:head>
  <title>Home & Household - South Indian Family Life App</title>
  <meta name="description" content="Manage your South Indian household with grocery tracking, chores, repairs, and emergency services" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-orange-800 mb-2">🏠 Home & Household</h1>
      <p class="text-lg text-orange-600">Managing traditional South Indian family life with care and harmony</p>
    </div>

    <HomeDashboard />
  </div>
</div>
