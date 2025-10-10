<script>
  import Icon from "@iconify/svelte";
  import { currentCycleDay, emotionalState } from "$lib/stores/period";
  import { getCyclePhase, getTamilRitualPrompt } from "$lib/utils/predict";

  export let cycleDay = 1;
  export let nextPeriod = null;

  $: phase = getCyclePhase(cycleDay);
  $: ritualPrompt = getTamilRitualPrompt(cycleDay);

  const phaseColors = {
    menstrual: "bg-red-100 text-red-800 border-red-200",
    follicular: "bg-green-100 text-green-800 border-green-200",
    ovulation: "bg-blue-100 text-blue-800 border-blue-200",
    luteal: "bg-purple-100 text-purple-800 border-purple-200",
    unknown: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const phaseNames = {
    menstrual: "மாதவிடாய்",
    follicular: "முளைத்தல்",
    ovulation: "முட்டை விட்டுவிடல்",
    luteal: "சுழற்சி முடிவு",
    unknown: "தெரியாதது",
  };
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">மாதர் விடுமுறை நாள்</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">Period Tracker</p>
    </div>
    <Icon icon="heroicons:heart" class="w-8 h-8 text-pink-500" />
  </div>

  <div class="grid grid-cols-2 gap-4 mb-4">
    <!-- Current Day -->
    <div class="text-center">
      <div class="text-3xl font-bold text-pink-600 dark:text-pink-400">{cycleDay}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">நாள்</div>
    </div>

    <!-- Phase -->
    <div class="text-center">
      <div class="inline-block px-3 py-1 rounded-full text-sm font-medium {phaseColors[phase]}">
        {phaseNames[phase]}
      </div>
    </div>
  </div>

  <!-- Ritual Prompt -->
  <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 mb-4">
    <h4 class="font-medium text-pink-800 dark:text-pink-200 mb-2">இன்றைய வழிகாட்டி</h4>
    <p class="text-sm text-pink-700 dark:text-pink-300">{ritualPrompt}</p>
  </div>

  <!-- Next Period -->
  {#if nextPeriod}
    <div class="text-center">
      <div class="text-sm text-gray-500 dark:text-gray-400">அடுத்த மாதவிடாய்</div>
      <div class="font-medium text-gray-900 dark:text-white">
        {new Date(nextPeriod).toLocaleDateString("ta-IN", { month: "short", day: "numeric" })}
      </div>
    </div>
  {/if}
</div>
