<script>
  import TrackerCard from "$lib/components/TrackerCard.svelte";
  import JournalInput from "$lib/components/JournalInput.svelte";
  import RitualPrompt from "$lib/components/RitualPrompt.svelte";
  import CycleGraph from "$lib/components/CycleGraph.svelte";
  import Icon from "@iconify/svelte";
  import { periodEntries, cycleData } from "$lib/stores/period";
  import { getCurrentCycleDay } from "$lib/utils/predict";

  let activeTab = "overview";

  $: currentDay = getCurrentCycleDay($cycleData);
  $: entries = $periodEntries;
  $: cycle = $cycleData;

  const tabs = [
    { id: "overview", label: "கண்ணோட்டம்", icon: "heroicons:home", english: "Overview" },
    { id: "log", label: "பதிவு செய்", icon: "heroicons:plus-circle", english: "Log Entry" },
    { id: "cycle", label: "சுழற்சி", icon: "heroicons:chart-bar", english: "Cycle View" },
    { id: "wisdom", label: "ஞானம்", icon: "heroicons:sparkles", english: "Wisdom" },
  ];
</script>

<svelte:head>
  <title>மாதர் விடுமுறை நாள் - Period Tracker</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-cyan-900">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Icon icon="heroicons:heart" class="w-8 h-8 text-pink-500" />
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">மாதர் விடுமுறை நாள்</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">My Period Tracker</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600 dark:text-gray-400">சுழற்சி நாள்</p>
          <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentDay}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-4 py-6">
    <!-- Tab Navigation -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden">
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        {#each tabs as tab}
          <button class="flex-1 py-4 px-4 text-center transition-all {activeTab === tab.id ? 'bg-purple-50 dark:bg-purple-900/20 border-b-2 border-purple-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}" on:click={() => (activeTab = tab.id)}>
            <Icon icon={tab.icon} class="w-6 h-6 mx-auto mb-1 {activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}" />
            <div class="text-sm font-medium {activeTab === tab.id ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'}">
              {tab.label}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {tab.english}
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      {#if activeTab === "overview"}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrackerCard />
          <RitualPrompt {currentDay} />
        </div>
        <CycleGraph />
      {:else if activeTab === "log"}
        <JournalInput />
      {:else if activeTab === "cycle"}
        <CycleGraph />
      {:else if activeTab === "wisdom"}
        <RitualPrompt {currentDay} />
      {/if}
    </div>
  </div>
</div>
