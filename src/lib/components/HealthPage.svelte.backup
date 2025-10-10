<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

  let healthMetrics = null;
  let loading = true;

  onMount(async () => {
    // Simulate health data loading
    setTimeout(() => {
      healthMetrics = {
        steps: 8420,
        calories: 1850,
        sleep: 7.5,
        water: 6,
        heartRate: 72,
        weight: 65.5,
        bloodPressure: "120/80",
      };
      loading = false;
    }, 1000);
  });

  function navigateToPeriodTracker() {
    goto("/health/period-tracker");
  }

  function navigateToBeautyGuide() {
    goto("/health/beauty-guide");
  }
</script>

<div class="p-6">
  <div class="flex items-center space-x-3 mb-6">
    <Icon icon="heroicons:shield-check" class="w-8 h-8 text-green-500" />
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Health Tracking</h1>
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <!-- Steps -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Steps</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Today's activity</p>
          </div>
          <Icon icon="heroicons:cursor-arrow-rays" class="w-8 h-8 text-blue-500" />
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{healthMetrics.steps.toLocaleString()}</div>
        <div class="text-sm text-green-600 dark:text-green-400">+12% from yesterday</div>
      </div>

      <!-- Calories -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Calories</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Burned today</p>
          </div>
          <Icon icon="heroicons:fire" class="w-8 h-8 text-orange-500" />
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{healthMetrics.calories}</div>
        <div class="text-sm text-green-600 dark:text-green-400">Goal: 2000</div>
      </div>

      <!-- Sleep -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sleep</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Last night</p>
          </div>
          <Icon icon="heroicons:moon" class="w-8 h-8 text-purple-500" />
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{healthMetrics.sleep}h</div>
        <div class="text-sm text-green-600 dark:text-green-400">Excellent quality</div>
      </div>

      <!-- Water -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Water</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Glasses today</p>
          </div>
          <Icon icon="heroicons:beaker" class="w-8 h-8 text-blue-500" />
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{healthMetrics.water}</div>
        <div class="text-sm text-yellow-600 dark:text-yellow-400">Goal: 8 glasses</div>
      </div>

      <!-- Heart Rate -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Heart Rate</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Resting BPM</p>
          </div>
          <Icon icon="heroicons:heart" class="w-8 h-8 text-red-500" />
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{healthMetrics.heartRate}</div>
        <div class="text-sm text-green-600 dark:text-green-400">Normal range</div>
      </div>

      <!-- Weight -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Weight</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Current weight</p>
          </div>
          <Icon icon="heroicons:scale" class="w-8 h-8 text-green-500" />
        </div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{healthMetrics.weight}kg</div>
        <div class="text-sm text-blue-600 dark:text-blue-400">-0.5kg this week</div>
      </div>
    </div>

    <!-- Women's Health Features -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Period Tracker -->
      <button on:click={navigateToPeriodTracker} class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl p-6 text-left transition-all transform hover:scale-105">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:heart" class="w-12 h-12" />
          <div>
            <h3 class="text-xl font-bold mb-1">மாதர் விடுமுறை நாள்</h3>
            <p class="text-sm opacity-90">Period Tracker</p>
            <p class="text-xs opacity-75 mt-2">Track cycles, get insights, and follow traditional wisdom</p>
          </div>
        </div>
      </button>

      <!-- Beauty Guide -->
      <button on:click={navigateToBeautyGuide} class="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl p-6 text-left transition-all transform hover:scale-105">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:sparkles" class="w-12 h-12" />
          <div>
            <h3 class="text-xl font-bold mb-1">அழகு வழிகாட்டி</h3>
            <p class="text-sm opacity-90">Beauty Guide</p>
            <p class="text-xs opacity-75 mt-2">Traditional Tamil beauty wisdom and modern tips</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Health Insights -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Insights</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 dark:text-white mb-2">Blood Pressure</h4>
          <div class="text-2xl font-bold text-green-600">{healthMetrics.bloodPressure}</div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Normal range</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 dark:text-white mb-2">Weekly Goal</h4>
          <div class="text-2xl font-bold text-blue-600">85%</div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Activity completed</p>
        </div>
      </div>
    </div>
  {/if}
</div>
