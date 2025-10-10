<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import MantraLibrary from "../components/MantraLibrary.svelte";

  let currentTab = "library";
  const tabs = [
    { id: "library", label: "Mantra Library", icon: "heroicons:musical-note" },
    { id: "practice", label: "Practice Session", icon: "heroicons:play" },
    { id: "favorites", label: "Favorites", icon: "heroicons:heart" },
  ];

  onMount(() => {
    document.title = "Mantras - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl text-white">
          <Icon icon="heroicons:musical-note" class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Sacred Mantras</h1>
          <p class="text-gray-600 dark:text-gray-300">Collection of sacred chants and mantras</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-purple-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "library"}
        <MantraLibrary />
      {:else if currentTab === "practice"}
        <div class="text-center py-12">
          <Icon icon="heroicons:play" class="w-16 h-16 mx-auto text-purple-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Practice Session</h3>
          <p class="text-gray-500 dark:text-gray-400">Start a guided mantra practice session</p>
        </div>
      {:else if currentTab === "favorites"}
        <div class="text-center py-12">
          <Icon icon="heroicons:heart" class="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Favorite Mantras</h3>
          <p class="text-gray-500 dark:text-gray-400">Your saved and frequently chanted mantras</p>
        </div>
      {/if}
    </div>
  </div>
</div>
