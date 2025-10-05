<script>
  import { onMount } from "svelte";
  import { getWellnessStats, getTodaysWellnessActivities, initializeWellnessData } from "../data/wellness.js";
  import HealthTracker from "./HealthTracker.svelte";
  import MantraLibrary from "./MantraLibrary.svelte";
  import YogaManager from "./YogaManager.svelte";
  import JournalManager from "./JournalManager.svelte";

  let activeTab = "overview";
  let stats = {};
  let todaysActivities = {};

  onMount(async () => {
    await initializeWellnessData();
    await loadData();
  });

  async function loadData() {
    stats = await getWellnessStats();
    todaysActivities = await getTodaysWellnessActivities();
  }
</script>

<svelte:head>
  <title>Wellness & Health - South Indian Family App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
  <!-- Header -->
  <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-green-200 dark:border-green-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-green-900 dark:text-green-100">🧘‍♀️ Wellness & Health</h1>
          <p class="text-green-700 dark:text-green-300 mt-1">Nurture body, mind, and spirit with traditional practices</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.totalMantras || 0}
          </div>
          <div class="text-sm text-green-600 dark:text-green-400">Sacred Mantras</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Health Records -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-600 dark:text-green-400">Health Records</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHealthRecords || 0}</p>
          </div>
          <div class="text-3xl">🏥</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Track family wellness</div>
        </div>
      </div>

      <!-- Yoga Sessions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-600 dark:text-green-400">Yoga Sessions</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalYogaSessions || 0}</p>
          </div>
          <div class="text-3xl">🧘‍♀️</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Completed: {stats.completedYogaSessions || 0}
          </div>
        </div>
      </div>

      <!-- Journal Entries -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-600 dark:text-green-400">Journal Entries</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalJournalEntries || 0}</p>
          </div>
          <div class="text-3xl">📓</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Emotional wellness</div>
        </div>
      </div>

      <!-- Meditation -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-600 dark:text-green-400">Meditation</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMeditationSessions || 0}</p>
          </div>
          <div class="text-3xl">🧘‍♂️</div>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Mindful practice</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-200 dark:border-green-800 mb-6">
      <div class="border-b border-green-200 dark:border-green-800">
        <nav class="flex space-x-8 px-6">
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'overview' ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => (activeTab = "overview")}> Overview </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'health' ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => (activeTab = "health")}> Health Tracker </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'mantras' ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => (activeTab = "mantras")}> Sacred Mantras </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'yoga' ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => (activeTab = "yoga")}> Yoga & Meditation </button>
          <button class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'journal' ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" on:click={() => (activeTab = "journal")}> Gratitude Journal </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        {#if activeTab === "overview"}
          <!-- Overview Tab -->
          <div class="space-y-6">
            <!-- Today's Activities -->
            <div class="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">Today's Wellness Activities</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Yoga Sessions -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">🧘‍♀️ Yoga Sessions ({todaysActivities.yogaSessions?.length || 0})</h4>
                  {#if todaysActivities.yogaSessions?.length > 0}
                    <div class="space-y-2">
                      {#each todaysActivities.yogaSessions as session}
                        <div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <div>
                            <span class="font-medium">{session.name}</span>
                            <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">({session.duration} min)</span>
                          </div>
                          <span class="text-sm px-2 py-1 rounded-full {session.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                            {session.completed ? "Done" : "Pending"}
                          </span>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <p class="text-gray-600 dark:text-gray-400">No yoga sessions scheduled for today.</p>
                  {/if}
                </div>

                <!-- Meditation Sessions -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">🧘‍♂️ Meditation ({todaysActivities.meditationSessions?.length || 0})</h4>
                  {#if todaysActivities.meditationSessions?.length > 0}
                    <div class="space-y-2">
                      {#each todaysActivities.meditationSessions as session}
                        <div class="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <div>
                            <span class="font-medium">{session.name}</span>
                            <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">({session.duration} min)</span>
                          </div>
                          <span class="text-sm px-2 py-1 rounded-full {session.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                            {session.completed ? "Done" : "Pending"}
                          </span>
                        </div>
                      {/each}
                    </div>
                  {:else}
                    <p class="text-gray-600 dark:text-gray-400">No meditation sessions scheduled for today.</p>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Wellness Insights -->
            <div class="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Wellness Insights</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div class="text-2xl mb-2">🙏</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{stats.favoriteMantras || 0}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Favorite Mantras</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div class="text-2xl mb-2">📊</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">
                    {stats.avgMoodScore ? stats.avgMoodScore.toFixed(1) : "0"}/5
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Average Mood</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div class="text-2xl mb-2">🎯</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">
                    {stats.completedYogaSessions || 0}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Yoga Completed</div>
                </div>
              </div>
            </div>
          </div>
        {:else if activeTab === "health"}
          <HealthTracker on:update={loadData} />
        {:else if activeTab === "mantras"}
          <MantraLibrary on:update={loadData} />
        {:else if activeTab === "yoga"}
          <YogaManager on:update={loadData} />
        {:else if activeTab === "journal"}
          <JournalManager on:update={loadData} />
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
