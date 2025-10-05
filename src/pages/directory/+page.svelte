<script>
  import { onMount } from "svelte";
  import { initDirectoryDB } from "$lib/data/directory.js";
  import DirectoryDashboard from "$lib/components/DirectoryDashboard.svelte";

  onMount(async () => {
    await initDirectoryDB();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">📇 Directory</h1>
      <p class="text-slate-600 dark:text-slate-400">Family Contacts & Community Resources</p>
    </div>

    <DirectoryDashboard />
  </div>
</div>
