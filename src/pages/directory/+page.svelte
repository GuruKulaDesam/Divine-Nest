<script>
  import { onMount } from "svelte";
  import { initDirectoryDB } from "$lib/data/directory.js";
  import DirectoryDashboard from "$lib/components/DirectoryDashboard.svelte";

  onMount(async () => {
    await initDirectoryDB();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-base-content mb-2">📇 Directory</h1>
      <p class="text-base-content/70">Family Contacts & Community Resources</p>
    </div>

    <DirectoryDashboard />
  </div>
</div>
