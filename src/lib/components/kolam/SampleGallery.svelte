<script>
  import Icon from "@iconify/svelte";
  import { kolamStore } from "$lib/stores/kolam";
  import { traditionalKolamPatterns } from "$lib/data/samples";

  let selectedCategory = "all";
  let searchTerm = "";

  $: filteredPatterns = traditionalKolamPatterns.filter((pattern) => {
    const matchesCategory = selectedCategory === "all" || pattern.category === selectedCategory;
    const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) || pattern.tamilName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function loadPattern(pattern) {
    kolamStore.update((state) => ({
      ...state,
      currentPattern: pattern,
      strokes: [],
      isDrawing: false,
    }));
  }

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
</script>

<div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
  <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
    <Icon icon="heroicons:photo" class="w-5 h-5 mr-2 text-purple-600" />
    Traditional Patterns
  </h3>

  <!-- Filters -->
  <div class="flex flex-wrap gap-2 mb-4">
    <button class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" on:click={() => (selectedCategory = "all")}> All </button>
    <button class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedCategory === 'geometric' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" on:click={() => (selectedCategory = "geometric")}> Geometric </button>
    <button class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedCategory === 'floral' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" on:click={() => (selectedCategory = "floral")}> Floral </button>
    <button class="px-3 py-1 rounded-full text-sm font-medium transition-colors {selectedCategory === 'traditional' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" on:click={() => (selectedCategory = "traditional")}> Traditional </button>
  </div>

  <!-- Search -->
  <div class="relative mb-4">
    <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input type="text" placeholder="Search patterns..." bind:value={searchTerm} class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
  </div>

  <!-- Patterns Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
    {#each filteredPatterns as pattern}
      <button class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer text-left w-full" on:click={() => loadPattern(pattern)} tabindex="0">
        <div class="flex items-start justify-between mb-2">
          <div>
            <h4 class="font-medium text-gray-900">{pattern.name}</h4>
            <p class="text-sm text-gray-600">{pattern.tamilName}</p>
          </div>
          <span class="px-2 py-1 rounded-full text-xs font-medium {getDifficultyColor(pattern.difficulty)}">
            {pattern.difficulty}
          </span>
        </div>

        <div class="w-full h-24 bg-gray-50 rounded border flex items-center justify-center mb-2">
          <div class="text-center text-gray-400">
            <Icon icon="heroicons:photo" class="w-8 h-8 mx-auto mb-1" />
            <div class="text-xs">Pattern Preview</div>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>{pattern.strokes} strokes</span>
          <span>{pattern.category}</span>
        </div>

        {#if $kolamStore.currentPattern?.id === pattern.id}
          <div class="mt-2 flex items-center text-purple-600">
            <Icon icon="heroicons:check-circle" class="w-4 h-4 mr-1" />
            <span class="text-xs font-medium">Selected</span>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  {#if filteredPatterns.length === 0}
    <div class="text-center py-8 text-gray-500">
      <Icon icon="heroicons:exclamation-triangle" class="w-12 h-12 mx-auto mb-2" />
      <p>No patterns found matching your criteria.</p>
    </div>
  {/if}
</div>
