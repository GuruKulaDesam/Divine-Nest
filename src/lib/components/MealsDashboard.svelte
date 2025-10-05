<script>
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import Icon from "@iconify/svelte";

  import MealPlanner from "./MealPlanner.svelte";
  import RecipeManager from "./RecipeManager.svelte";
  import VoiceRecipeConverter from "./VoiceRecipeConverter.svelte";

  import { initializeMealsData, getMealsStats, getMealPlans, getRecipes } from "../data/meals.js";

  let activeTab = "overview";
  let stats = {};
  let todaysMealPlan = null;
  let recentRecipes = [];

  onMount(async () => {
    await initializeMealsData();
    await loadDashboardData();
  });

  async function loadDashboardData() {
    try {
      stats = await getMealsStats();
      todaysMealPlan = await getMealPlans().then((plans) => {
        const today = new Date();
        return plans.find((plan) => {
          const planDate = new Date(plan.date);
          return planDate.toDateString() === today.toDateString();
        });
      });
      recentRecipes = await getRecipes().then((recipes) => recipes.sort((a, b) => (b.lastUsed || b.createdAt) - (a.lastUsed || a.createdAt)).slice(0, 6));
    } catch (error) {
      console.error("Error loading meals dashboard data:", error);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }

  function getCategoryIcon(category) {
    const icons = {
      vegetarian: "heroicons:leaf",
      "non-vegetarian": "heroicons:fire",
      festival: "heroicons:sparkles",
      traditional: "heroicons:heart",
      modern: "heroicons:cog-6-tooth",
    };
    return icons[category] || "heroicons:utensils";
  }

  function getCategoryColor(category) {
    const colors = {
      vegetarian: "text-green-500",
      "non-vegetarian": "text-red-500",
      festival: "text-purple-500",
      traditional: "text-amber-500",
      modern: "text-blue-500",
    };
    return colors[category] || "text-gray-500";
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" in:fade={{ duration: 500 }}>
      <h1 class="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
        <Icon icon="heroicons:utensils" class="text-orange-600" />
        🍲 Meals, Recipes & Kitchen Life
      </h1>
      <p class="text-gray-600 text-lg">Plan meals, manage recipes, and preserve family cooking traditions</p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8" in:slide={{ duration: 400 }}>
      <div class="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-lg border border-gray-100">
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'overview' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "overview")}>
          <Icon icon="heroicons:home" class="text-lg" />
          Overview
        </button>
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'planner' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "planner")}>
          <Icon icon="heroicons:calendar" class="text-lg" />
          Meal Planner
        </button>
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'recipes' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "recipes")}>
          <Icon icon="heroicons:book-open" class="text-lg" />
          Recipes
        </button>
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'voice' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "voice")}>
          <Icon icon="heroicons:microphone" class="text-lg" />
          Voice Converter
        </button>
      </div>
    </div>

    <!-- Overview Tab -->
    {#if activeTab === "overview"}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Stats Cards -->
        <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:book-open" class="text-orange-500 text-2xl" />
              <span class="text-2xl font-bold text-orange-600">{stats.totalRecipes || 0}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Total Recipes</h3>
            <p class="text-xs text-gray-500 mt-1">Family collection</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:calendar" class="text-green-500 text-2xl" />
              <span class="text-2xl font-bold text-green-600">{stats.totalMealPlans || 0}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Meal Plans</h3>
            <p class="text-xs text-gray-500 mt-1">Planned meals</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:cube" class="text-blue-500 text-2xl" />
              <span class="text-2xl font-bold text-blue-600">{stats.totalIngredients || 0}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Ingredients</h3>
            <p class="text-xs text-gray-500 mt-1">In pantry</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:star" class="text-purple-500 text-2xl" />
              <span class="text-2xl font-bold text-purple-600">{stats.avgRecipeRating ? stats.avgRecipeRating.toFixed(1) : "0.0"}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Avg Rating</h3>
            <p class="text-xs text-gray-500 mt-1">Recipe reviews</p>
          </div>
        </div>

        <!-- Today's Meal Plan -->
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:calendar-days" class="text-orange-500" />
            Today's Meals
          </h3>
          {#if todaysMealPlan}
            <div class="space-y-3">
              <div class="p-3 bg-orange-50 rounded-lg">
                <h4 class="font-medium text-gray-800">Breakfast</h4>
                <p class="text-sm text-orange-700">{todaysMealPlan.meals.breakfast}</p>
              </div>
              <div class="p-3 bg-orange-50 rounded-lg">
                <h4 class="font-medium text-gray-800">Lunch</h4>
                <p class="text-sm text-orange-700">{todaysMealPlan.meals.lunch}</p>
              </div>
              <div class="p-3 bg-orange-50 rounded-lg">
                <h4 class="font-medium text-gray-800">Dinner</h4>
                <p class="text-sm text-orange-700">{todaysMealPlan.meals.dinner}</p>
              </div>
              {#if todaysMealPlan.meals.snacks && todaysMealPlan.meals.snacks.length > 0}
                <div class="p-3 bg-orange-50 rounded-lg">
                  <h4 class="font-medium text-gray-800">Snacks</h4>
                  <p class="text-sm text-orange-700">{todaysMealPlan.meals.snacks.join(", ")}</p>
                </div>
              {/if}
            </div>
          {:else}
            <div class="text-center py-8">
              <Icon icon="heroicons:calendar" class="text-gray-300 text-3xl mx-auto mb-2" />
              <p class="text-gray-500 text-sm">No meal plan for today</p>
              <button class="mt-2 text-orange-500 hover:text-orange-700 text-sm font-medium" on:click={() => (activeTab = "planner")}> Plan today's meals → </button>
            </div>
          {/if}
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Recipes -->
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:clock" class="text-orange-500" />
            Recent Recipes
          </h3>
          <div class="space-y-3">
            {#each recentRecipes.slice(0, 4) as recipe}
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div class="p-2 bg-white rounded-lg">
                  <Icon icon={getCategoryIcon(recipe.category)} class="{getCategoryColor(recipe.category)} text-lg" />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800 text-sm">{recipe.title}</h4>
                  <p class="text-xs text-gray-600">{recipe.prepTime + recipe.cookTime} mins • {recipe.servings} servings</p>
                </div>
                {#if recipe.rating}
                  <div class="flex items-center gap-1">
                    <Icon icon="heroicons:star" class="text-yellow-400 text-sm" />
                    <span class="text-sm font-medium">{recipe.rating}</span>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Recipe Categories -->
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:tag" class="text-green-500" />
            Recipe Categories
          </h3>
          <div class="grid grid-cols-2 gap-3">
            {#each Object.entries(stats.recipesByCategory || {}) as [category, count]}
              <div class="p-3 bg-gray-50 rounded-lg text-center">
                <div class="p-2 bg-white rounded-lg w-fit mx-auto mb-2">
                  <Icon icon={getCategoryIcon(category)} class="{getCategoryColor(category)} text-lg" />
                </div>
                <div class="text-2xl font-bold text-gray-800">{count}</div>
                <div class="text-sm text-gray-600 capitalize">{category}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button class="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-medium transition-colors duration-200 flex items-center gap-3" on:click={() => (activeTab = "planner")}>
          <Icon icon="heroicons:calendar" class="text-xl" />
          <span>Plan Today's Meals</span>
        </button>
        <button class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-medium transition-colors duration-200 flex items-center gap-3" on:click={() => (activeTab = "recipes")}>
          <Icon icon="heroicons:plus" class="text-xl" />
          <span>Add New Recipe</span>
        </button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl font-medium transition-colors duration-200 flex items-center gap-3" on:click={() => (activeTab = "voice")}>
          <Icon icon="heroicons:microphone" class="text-xl" />
          <span>Voice to Recipe</span>
        </button>
      </div>
    {/if}

    <!-- Meal Planner Tab -->
    {#if activeTab === "planner"}
      <MealPlanner {loadDashboardData} />
    {/if}

    <!-- Recipes Tab -->
    {#if activeTab === "recipes"}
      <RecipeManager {loadDashboardData} />
    {/if}

    <!-- Voice Converter Tab -->
    {#if activeTab === "voice"}
      <VoiceRecipeConverter {loadDashboardData} />
    {/if}
  </div>
</div>
