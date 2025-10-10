<script>
  import Icon from "@iconify/svelte";
  import { ritualPrompts, foodRecommendations, avoidFoods, tamilWisdom } from "$lib/data/rituals";

  export let cycleDay = 1;

  $: prompt = ritualPrompts[cycleDay] || "உன் உடல் சொல்லும் குரலைக் கேள். அமைதியாக இரு.";
  $: foods = foodRecommendations[cycleDay] || [];
  $: avoid = avoidFoods[cycleDay] || [];

  function getPhase() {
    if (cycleDay <= 5) return "menstrual";
    if (cycleDay <= 13) return "follicular";
    if (cycleDay <= 15) return "ovulation";
    if (cycleDay <= 28) return "luteal";
    return "unknown";
  }

  $: phase = getPhase();
  $: wisdom = tamilWisdom[phase];
</script>

<div class="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg">
  <div class="flex items-center space-x-3 mb-4">
    <Icon icon="heroicons:sparkles" class="w-8 h-8 text-orange-500" />
    <div>
      <h3 class="text-lg font-semibold text-orange-800 dark:text-orange-200">தினசரி வழிகாட்டி</h3>
      <p class="text-sm text-orange-600 dark:text-orange-300">Daily Wisdom</p>
    </div>
  </div>

  <!-- Daily Prompt -->
  <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
    <h4 class="font-medium text-gray-900 dark:text-white mb-2">இன்றைய செய்தி</h4>
    <p class="text-gray-700 dark:text-gray-300 italic">"{prompt}"</p>
  </div>

  <!-- Food Recommendations -->
  {#if foods.length > 0}
    <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
      <h4 class="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center">
        <Icon icon="heroicons:check-circle" class="w-5 h-5 mr-2" />
        பரிந்துரைக்கப்படும் உணவுகள்
      </h4>
      <div class="flex flex-wrap gap-2">
        {#each foods as food}
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {food}
          </span>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Foods to Avoid -->
  {#if avoid.length > 0}
    <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
      <h4 class="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center">
        <Icon icon="heroicons:x-circle" class="w-5 h-5 mr-2" />
        தவிர்க்க வேண்டிய உணவுகள்
      </h4>
      <div class="flex flex-wrap gap-2">
        {#each avoid as food}
          <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            {food}
          </span>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Phase Wisdom -->
  <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
    <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">சுழற்சி ஞானம்</h4>
    <p class="text-purple-700 dark:text-purple-300 text-sm">{wisdom}</p>
  </div>
</div>
