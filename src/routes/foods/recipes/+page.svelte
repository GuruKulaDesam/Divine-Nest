<script>
  import { onMount } from 'svelte';
  import { sqliteService } from '$lib/services/sqliteService';
  import Icon from '@iconify/svelte';

  let recipes = [];
  let filteredRecipes = [];
  let searchTerm = '';
  let cuisineFilter = 'all';

  onMount(async () => {
    await loadRecipes();
  });

  async function loadRecipes() {
    try {
      const allRecipes = await sqliteService.getRecipes?.() || [];
      recipes = allRecipes;
      filterRecipes();
    } catch (error) {
      console.error('Error loading recipes:', error);
      recipes = [];
    }
  }

  function filterRecipes() {
    filteredRecipes = recipes.filter(recipe => {
      const matchesSearch = !searchTerm ||
        recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCuisine = cuisineFilter === 'all' || recipe.cuisine === cuisineFilter;

      return matchesSearch && matchesCuisine;
    });
  }

  $: if (searchTerm || cuisineFilter) {
    filterRecipes();
  }

  function getCuisineIcon(cuisine) {
    const icons = {
      'south-indian': '🍛',
      'north-indian': '🍛',
      'chinese': '🥢',
      'italian': '🍝',
      'mexican': '🌮',
      'american': '🍔',
      'thai': '🍜'
    };
    return icons[cuisine] || '🍽️';
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-base-content">Recipes</h1>
    <button class="btn btn-primary">
      <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
      Add Recipe
    </button>
  </div>

  <!-- Filters -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <input
        type="text"
        placeholder="Search recipes..."
        bind:value={searchTerm}
        class="input input-bordered w-full bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
      />
    </div>
    <select
      bind:value={cuisineFilter}
      class="select select-bordered bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
    >
      <option value="all">All Cuisines</option>
      <option value="south-indian">South Indian</option>
      <option value="north-indian">North Indian</option>
      <option value="chinese">Chinese</option>
      <option value="italian">Italian</option>
      <option value="mexican">Mexican</option>
      <option value="american">American</option>
      <option value="thai">Thai</option>
    </select>
  </div>

  <!-- Recipes Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredRecipes as recipe}
      <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="text-2xl">{getCuisineIcon(recipe.cuisine)}</div>
              <div>
                <h3 class="card-title text-lg">{recipe.name || 'Untitled Recipe'}</h3>
                <p class="text-sm opacity-70 capitalize">{recipe.cuisine || 'General'}</p>
              </div>
            </div>
          </div>

          {#if recipe.ingredients}
            <div class="mb-4">
              <h4 class="font-semibold text-sm mb-2">Ingredients:</h4>
              <p class="text-sm opacity-80 line-clamp-3">{recipe.ingredients}</p>
            </div>
          {/if}

          {#if recipe.instructions}
            <div class="mb-4">
              <h4 class="font-semibold text-sm mb-2">Instructions:</h4>
              <p class="text-sm opacity-80 line-clamp-3">{recipe.instructions}</p>
            </div>
          {/if}

          <div class="card-actions justify-end">
            <button class="btn btn-sm btn-outline">
              <Icon icon="heroicons:eye" class="w-4 h-4" />
              View
            </button>
            <button class="btn btn-sm btn-outline">
              <Icon icon="heroicons:pencil" class="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredRecipes.length === 0}
    <div class="text-center py-12">
      <Icon icon="heroicons:book-open" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-xl font-semibold text-base-content mb-2">
        {searchTerm || cuisineFilter !== 'all' ? 'No Recipes Found' : 'No Recipes Yet'}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {searchTerm || cuisineFilter !== 'all'
          ? 'Try adjusting your search or filters.'
          : 'Start building your recipe collection by adding your favorite dishes.'}
      </p>
      {#if !searchTerm && cuisineFilter === 'all'}
        <button class="btn btn-primary">
          <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
          Add First Recipe
        </button>
      {/if}
    </div>
  {/if}

  <!-- Recipe Statistics -->
  {#if recipes.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-primary">
          <Icon icon="heroicons:book-open" class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Recipes</div>
        <div class="stat-value">{recipes.length}</div>
      </div>

      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-secondary">
          <Icon icon="heroicons:globe-americas" class="w-8 h-8" />
        </div>
        <div class="stat-title">Cuisines</div>
        <div class="stat-value">
          {new Set(recipes.map(r => r.cuisine).filter(Boolean)).size}
        </div>
      </div>

      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-accent">
          🍛
        </div>
        <div class="stat-title">South Indian</div>
        <div class="stat-value">
          {recipes.filter(r => r.cuisine === 'south-indian').length}
        </div>
      </div>

      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-info">
          <Icon icon="heroicons:star" class="w-8 h-8" />
        </div>
        <div class="stat-title">Favorites</div>
        <div class="stat-value">
          {recipes.filter(r => r.favorite).length}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>