<script>
  import { onMount } from "svelte";
  import EmergencyServices from "$lib/components/EmergencyServices.svelte";
  import { initHomeDB } from "$lib/data/home.js";

  onMount(async () => {
    await initHomeDB();
  });
</script>

<svelte:head>
  <title>Home Services & Emergency - South Indian Family Life App</title>
  <meta name="description" content="Emergency services, medical information vault, and disaster preparedness for South Indian families" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-red-800 mb-2">🚨 Home Services & Emergency</h1>
      <p class="text-lg text-red-600">Emergency preparedness and essential services for your South Indian household</p>
    </div>

    <EmergencyServices />
  </div>
</div>
