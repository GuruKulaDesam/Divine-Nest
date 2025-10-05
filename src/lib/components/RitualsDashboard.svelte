<script>
  import { onMount } from "svelte";
  import { getRitualsStats, getTodaysRituals, getUpcomingFestivals, initializeRitualsData } from "../data/rituals.js";
  import RitualTracker from "./RitualTracker.svelte";
  import TemplePlanner from "./TemplePlanner.svelte";
  import FestivalManager from "./FestivalManager.svelte";

  let activeTab = "overview";
  let stats = {};
  let todaysRituals = [];
  let upcomingFestivals = [];

  onMount(async () => {
    await initializeRitualsData();
    await loadData();
  });

  async function loadData() {
    stats = await getRitualsStats();
    todaysRituals = await getTodaysRituals();
    upcomingFestivals = await getUpcomingFestivals();
  }

  function handleTabChange(tab) {
    activeTab = tab;
  }
</script>

<svelte:head>
  <title>Rituals & Spiritual Life - South Indian Family App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-orange-200 dark:border-orange-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-orange-900 dark:text-orange-100">🕉️ Rituals & Spiritual Life</h1>
          <p class="text-orange-700 dark:text-orange-300 mt-1">Preserve and practice South Indian spiritual traditions</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.totalRituals || 0}
          </div>
          <div class="text-sm text-orange-600 dark:text-orange-400">Total Rituals</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Rituals Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-600 dark:text-orange-400">Today's Rituals</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{todaysRituals.length}</p>
          </div>
          <div class="text-3xl">🙏</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Completed: {todaysRituals.filter((r) => r.completed).length}
          </div>
        </div>
      </div>

      <!-- Temple Trips -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-600 dark:text-orange-400">Temple Trips</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTempleTrips || 0}</p>
          </div>
          <div class="text-3xl">🏛️</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Completed: {stats.completedTrips || 0}
          </div>
        </div>
      </div>

      <!-- Festivals -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-600 dark:text-orange-400">Festivals</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFestivals || 0}</p>
          </div>
          <div class="text-3xl">🎉</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Upcoming: {stats.upcomingFestivals || 0}
          </div>
        </div>
      </div>

      <!-- Completion Rate -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-600 dark:text-orange-400">Completion Rate</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalRituals ? Math.round((stats.completedRituals / stats.totalRituals) * 100) : 0}%
            </p>
          </div>
          <div class="text-3xl">📊</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Spiritual practice</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-orange-200 dark:border-orange-800 mb-6">
      <div class="border-b border-orange-200 dark:border-orange-800">
        <nav class="flex space-x-8 px-6">
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'overview' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => handleTabChange("overview")}> Overview </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'rituals' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => handleTabChange("rituals")}> Daily Rituals </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'temples' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => handleTabChange("temples")}> Temple Trips </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'festivals' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => handleTabChange("festivals")}> Festivals </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        {#if activeTab === "overview"}
          <!-- Overview Tab -->
          <div class="space-y-6">
            <!-- Today's Rituals -->
            <div class="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
                Today's Rituals ({todaysRituals.length})
              </h3>
              {#if todaysRituals.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {#each todaysRituals as ritual}
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-medium text-gray-900 dark:text-white">{ritual.name}</h4>
                        <span class="text-sm px-2 py-1 rounded-full {ritual.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                          {ritual.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{ritual.description}</p>
                      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>⏱️ {ritual.duration} min</span>
                        <span class="mx-2">•</span>
                        <span>👥 {ritual.participants.join(", ")}</span>
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-gray-600 dark:text-gray-400">No rituals scheduled for today.</p>
              {/if}
            </div>

            <!-- Upcoming Festivals -->
            <div class="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4">
                Upcoming Festivals ({upcomingFestivals.length})
              </h3>
              {#if upcomingFestivals.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each upcomingFestivals.slice(0, 4) as festival}
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-medium text-gray-900 dark:text-white">{festival.name}</h4>
                        <span class="text-sm text-amber-600 dark:text-amber-400">
                          {new Date(festival.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{festival.significance}</p>
                      <div class="flex flex-wrap gap-1">
                        {#each festival.familyTraditions.slice(0, 3) as tradition}
                          <span class="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full">
                            {tradition}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-gray-600 dark:text-gray-400">No upcoming festivals.</p>
              {/if}
            </div>
          </div>
        {:else if activeTab === "rituals"}
          <RitualTracker on:update={loadData} />
        {:else if activeTab === "temples"}
          <TemplePlanner on:update={loadData} />
        {:else if activeTab === "festivals"}
          <FestivalManager on:update={loadData} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .tab-content {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
