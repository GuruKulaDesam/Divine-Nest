<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import FestivalManager from "../components/FestivalManager.svelte";

  let currentTab = "calendar";
  const tabs = [
    { id: "calendar", label: "Festival Calendar", icon: "heroicons:calendar" },
    { id: "planning", label: "Festival Planning", icon: "heroicons:sparkles" },
    { id: "traditions", label: "Family Traditions", icon: "heroicons:heart" },
  ];

  onMount(() => {
    document.title = "Festival Calendar - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
          <Icon icon="heroicons:calendar" class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Festival Calendar</h1>
          <p class="text-gray-600 dark:text-gray-300">Plan and celebrate cultural festivals</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "calendar"}
        <FestivalManager />
      {:else if currentTab === "planning"}
        <div class="text-center py-12">
          <Icon icon="heroicons:sparkles" class="w-16 h-16 mx-auto text-orange-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Festival Planning</h3>
          <p class="text-gray-500 dark:text-gray-400">Plan upcoming festivals and celebrations</p>
        </div>
      {:else if currentTab === "traditions"}
        <div class="text-center py-12">
          <Icon icon="heroicons:heart" class="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Family Traditions</h3>
          <p class="text-gray-500 dark:text-gray-400">Document and preserve family traditions</p>
        </div>
      {/if}
    </div>
  </div>
</div>
