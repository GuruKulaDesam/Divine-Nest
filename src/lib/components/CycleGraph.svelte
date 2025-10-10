<script>
  import { periodEntries, cycleData } from "$lib/stores/period";
  import { getCurrentCycleDay, predictNextCycle } from "$lib/utils/predict";
  import Icon from "@iconify/svelte";

  $: entries = $periodEntries;
  $: cycle = $cycleData;

  // Calculate cycle days for visualization
  $: cycleDays = Array.from({ length: 28 }, (_, i) => i + 1);

  function getDayStatus(day) {
    const today = new Date();
    const cycleStart = new Date(cycle.lastPeriodStart);
    const dayDate = new Date(cycleStart);
    dayDate.setDate(cycleStart.getDate() + day - 1);

    // Check if this day has an entry
    const entry = entries.find((e) => {
      const entryDate = new Date(e.date);
      return entryDate.toDateString() === dayDate.toDateString();
    });

    if (entry) {
      return {
        hasEntry: true,
        flow: entry.flow,
        symptoms: entry.symptoms,
        mood: entry.mood,
      };
    }

    // Check if it's today
    if (dayDate.toDateString() === today.toDateString()) {
      return { isToday: true };
    }

    // Check if it's predicted period
    const predictedStart = predictNextCycle(cycle);
    if (predictedStart) {
      const predictedEnd = new Date(predictedStart);
      predictedEnd.setDate(predictedStart.getDate() + (cycle.averageLength || 5) - 1);

      if (dayDate >= predictedStart && dayDate <= predictedEnd) {
        return { isPredicted: true };
      }
    }

    return {};
  }

  function getDayColor(day) {
    const status = getDayStatus(day);

    if (status.hasEntry) {
      switch (status.flow) {
        case "heavy":
          return "bg-red-500";
        case "medium":
          return "bg-orange-500";
        case "light":
          return "bg-yellow-500";
        case "spotting":
          return "bg-pink-500";
        default:
          return "bg-gray-400";
      }
    }

    if (status.isPredicted) return "bg-red-200 dark:bg-red-800";
    if (status.isToday) return "bg-blue-500 ring-2 ring-blue-300";

    return "bg-gray-100 dark:bg-gray-700";
  }

  function getDayIcon(day) {
    const status = getDayStatus(day);

    if (status.hasEntry && status.mood) {
      switch (status.mood) {
        case "happy":
          return "heroicons:face-smile";
        case "sad":
          return "heroicons:face-frown";
        case "anxious":
          return "heroicons:exclamation-triangle";
        case "tired":
          return "heroicons:moon";
        case "energetic":
          return "heroicons:bolt";
        default:
          return null;
      }
    }

    if (status.isToday) return "heroicons:star";
    if (status.isPredicted) return "heroicons:question-mark-circle";

    return null;
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
  <div class="flex items-center space-x-3 mb-6">
    <Icon icon="heroicons:chart-bar" class="w-8 h-8 text-purple-500" />
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">சுழற்சி வரைபடம்</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Cycle Visualization</p>
    </div>
  </div>

  <!-- Cycle Grid -->
  <div class="grid grid-cols-7 gap-2 mb-4">
    {#each cycleDays as day}
      {@const status = getDayStatus(day)}
      {@const icon = getDayIcon(day)}
      <button class="w-10 h-10 rounded-full {getDayColor(day)} flex items-center justify-center text-xs font-medium transition-all hover:scale-110 relative" class:ring-2={status.isToday} class:ring-blue-300={status.isToday} title="Day {day}{status.hasEntry ? ' - Entry logged' : status.isPredicted ? ' - Predicted period' : status.isToday ? ' - Today' : ''}">
        {#if icon}
          <Icon {icon} class="w-4 h-4 text-white" />
        {:else}
          {day}
        {/if}

        {#if status.hasEntry && status.symptoms && status.symptoms.length > 0}
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Legend -->
  <div class="flex flex-wrap gap-4 text-sm">
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 bg-red-500 rounded-full"></div>
      <span class="text-gray-700 dark:text-gray-300">கனமான ஓட்டம்</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
      <span class="text-gray-700 dark:text-gray-300">நடுத்தர ஓட்டம்</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
      <span class="text-gray-700 dark:text-gray-300">இலகு ஓட்டம்</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 bg-blue-500 rounded-full ring-2 ring-blue-300"></div>
      <span class="text-gray-700 dark:text-gray-300">இன்று</span>
    </div>
    <div class="flex items-center space-x-2">
      <div class="w-4 h-4 bg-red-200 dark:bg-red-800 rounded-full"></div>
      <span class="text-gray-700 dark:text-gray-300">கணிக்கப்பட்டது</span>
    </div>
  </div>
</div>
