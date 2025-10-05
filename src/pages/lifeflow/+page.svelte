<script>
  import { onMount } from "svelte";
  import { initLifeFlowDB } from "$lib/data/lifeflow.js";
  import LifeFlowDashboard from "$lib/components/LifeFlowDashboard.svelte";

  onMount(async () => {
    await initLifeFlowDB();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">🌊 Life Flow</h1>
      <p class="text-slate-600 dark:text-slate-400">Emotional Intelligence & Family Governance</p>
    </div>

    <LifeFlowDashboard />
  </div>
</div>
