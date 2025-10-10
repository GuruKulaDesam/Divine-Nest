<script>
  import Icon from "@iconify/svelte";
  import { beautyCategories, traditionalRemedies, modernTips, seasonalTips, beautyWisdom } from "$lib/data/beauty";

  let selectedCategory = "skin";
  let selectedSeason = "summer";

  const categories = Object.entries(beautyCategories);
  const seasons = Object.entries(seasonalTips);
</script>

<div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg">
  <div class="flex items-center space-x-3 mb-6">
    <Icon icon="heroicons:sparkles" class="w-8 h-8 text-rose-500" />
    <div>
      <h3 class="text-lg font-semibold text-rose-800 dark:text-rose-200">அழகு வழிகாட்டி</h3>
      <p class="text-sm text-rose-600 dark:text-rose-300">Beauty Guide</p>
    </div>
  </div>

  <!-- Category Tabs -->
  <div class="flex flex-wrap gap-2 mb-6">
    {#each categories as [key, category]}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedCategory === key ? 'bg-rose-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20'}" on:click={() => (selectedCategory = key)}>
        <Icon icon={category.icon} class="w-5 h-5" />
        <div class="text-center">
          <div class="text-sm font-medium">{category.title}</div>
          <div class="text-xs opacity-75">{category.english}</div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Category Content -->
  {#if selectedCategory === "skin" || selectedCategory === "hair"}
    <!-- Traditional Remedies -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">மரபு முறைகள்</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each traditionalRemedies[selectedCategory] as remedy}
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h5 class="font-medium text-gray-900 dark:text-white mb-2">{remedy.name}</h5>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{remedy.english}</p>
            <div class="mb-2">
              <span class="text-xs font-medium text-rose-600 dark:text-rose-400">பொருட்கள்:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                {#each remedy.ingredients as ingredient}
                  <span class="px-2 py-1 bg-rose-100 text-rose-800 rounded text-xs">{ingredient}</span>
                {/each}
              </div>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2"><strong>நன்மை:</strong> {remedy.benefits}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300"><strong>வழிமுறை:</strong> {remedy.instructions}</p>
            <p class="text-xs text-rose-600 dark:text-rose-400 mt-2">சுழற்சி கட்டம்: {remedy.cyclePhase}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Modern Tips -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">நவீன குறிப்புகள்</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each modernTips[selectedCategory] as tip}
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
            <Icon icon={tip.icon} class="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <h5 class="font-medium text-gray-900 dark:text-white mb-2">{tip.title}</h5>
            <p class="text-sm text-gray-700 dark:text-gray-300">{tip.content}</p>
          </div>
        {/each}
      </div>
    </div>
  {:else if selectedCategory === "makeup"}
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">தமிழ் மரபு அலங்காரம்</h4>
      <div class="space-y-4">
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white">கண் மை</h5>
          <p class="text-sm text-gray-700 dark:text-gray-300">கஸ்தூரி மஞ்சள் மற்றும் கற்பூரத்தை கண்களுக்கு பயன்படுத்தலாம்</p>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white">உதடு</h5>
          <p class="text-sm text-gray-700 dark:text-gray-300">இயற்கை எண்ணெய்கள் மற்றும் பீட்ரூட் பவுடரை பயன்படுத்தலாம்</p>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white">முகம்</h5>
          <p class="text-sm text-gray-700 dark:text-gray-300">சந்தனம் மற்றும் குங்குமம் மரபு அலங்காரமாக பயன்படுகிறது</p>
        </div>
      </div>
    </div>
  {:else if selectedCategory === "wellness"}
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">உள் மற்றும் வெளி அழகு</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-3">உள் அழகு</h5>
          <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• தியானம் மற்றும் யோகா செய்யுங்கள்</li>
            <li>• நேர்மறையான எண்ணங்களை வளர்த்துக் கொள்ளுங்கள்</li>
            <li>• உணர்வுகளை வெளிப்படுத்துங்கள்</li>
            <li>• தொண்டு செயல்களில் ஈடுபடுங்கள்</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-3">வெளி அழகு</h5>
          <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• தோல் மற்றும் முடி பராமரிப்பு</li>
            <li>• ஆரோக்கியமான உணவு</li>
            <li>• போதுமான தூக்கம்</li>
            <li>• உடற்பயிற்சி</li>
          </ul>
        </div>
      </div>
    </div>
  {/if}

  <!-- Seasonal Tips -->
  <div class="mt-6">
    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">பருவகால குறிப்புகள்</h4>
    <div class="flex flex-wrap gap-2 mb-4">
      {#each seasons as [key, season]}
        <button class="px-4 py-2 rounded-lg transition-all {selectedSeason === key ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'}" on:click={() => (selectedSeason = key)}>
          {season.title}
        </button>
      {/each}
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h5 class="font-medium text-gray-900 dark:text-white mb-2">{seasonalTips[selectedSeason].title}</h5>
      <ul class="space-y-1">
        {#each seasonalTips[selectedSeason].tips as tip}
          <li class="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <Icon icon="heroicons:check" class="w-4 h-4 text-green-500" />
            <span>{tip}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Beauty Wisdom -->
  <div class="mt-6">
    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">அழகு ஞானம்</h4>
    <div class="space-y-4">
      {#each beautyWisdom as wisdom}
        <div class="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-4">
          <p class="text-gray-900 dark:text-white italic mb-1">"{wisdom.quote}"</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{wisdom.english}</p>
          <p class="text-xs text-rose-600 dark:text-rose-400 mt-1">- {wisdom.author}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
