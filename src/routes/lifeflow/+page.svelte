<script>
  import { onMount } from "svelte";
  import { initLifeFlowDB } from "$lib/data/lifeflow.js";
  import LifeFlowDashboard from "$lib/components/LifeFlowDashboard.svelte";

  onMount(async () => {
    await initLifeFlowDB();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-base-content mb-2">🌊 Life Flow</h1>
      <p class="text-base-content/70">Emotional Intelligence & Family Governance</p>
    </div>

    <LifeFlowDashboard />
  </div>
</div>
