<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { foods } from '$lib/stores/foods';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let mealTypeChart;
  let cuisineChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalRecipes = $foods.length;
  $: scheduledMeals = getScheduledMeals();
  $: recentMeals = getRecentMeals(5);
  $: avgRating = $foods.length > 0 ? ($foods.reduce((sum, food) => sum + food.rating, 0) / $foods.length).toFixed(1) : 0;
  $: totalReviews = $foods.reduce((sum, food) => sum + food.reviews, 0);

  // Today's meal suggestions based on time
  $: todaysSuggestions = getTodaysMealSuggestions();

  function getTodaysMealSuggestions() {
    const now = new Date();
    const hour = now.getHours();
    let mealType = 'Breakfast';

    if (hour >= 12 && hour < 15) mealType = 'Lunch';
    else if (hour >= 15 && hour < 19) mealType = 'Snack';
    else if (hour >= 19 || hour < 6) mealType = 'Dinner';

    return $foods
      .filter(food => food.meal_type === mealType)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  // Popular recipes (high rating + reviews)
  $: popularRecipes = $foods
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, 5);

  // Quick meal prep alerts (meals scheduled within 2 hours)
  $: urgentMeals = scheduledMeals.filter(meal => {
    const scheduledTime = new Date(meal.scheduled_for);
    const now = new Date();
    const timeDiff = scheduledTime - now;
    return timeDiff > 0 && timeDiff <= 2 * 60 * 60 * 1000; // 2 hours
  });

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Meal Type Distribution Chart
    const mealTypeCtx = document.getElementById('mealTypeChart');
    if (mealTypeCtx) {
      const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
      const mealTypeData = mealTypes.map(type =>
        $foods.filter(food => food.meal_type === type).length
      );

      mealTypeChart = new Chart(mealTypeCtx, {
        type: 'doughnut',
        data: {
          labels: mealTypes,
          datasets: [{
            data: mealTypeData,
            backgroundColor: ['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // Cuisine Distribution Chart
    const cuisineCtx = document.getElementById('cuisineChart');
    if (cuisineCtx) {
      const cuisines = ['South Indian', 'North Indian', 'Hyderabadi', 'Punjabi', 'Bengali', 'International'];
      const cuisineData = cuisines.map(cuisine =>
        $foods.filter(food => food.cuisine === cuisine).length
      );

      cuisineChart = new Chart(cuisineCtx, {
        type: 'bar',
        data: {
          labels: cuisines,
          datasets: [{
            label: 'Recipes by Cuisine',
            data: cuisineData,
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#6b7280'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    // Process voice command for foods
    if (result.toLowerCase().includes('add recipe') || result.toLowerCase().includes('create recipe')) {
      goto('/foods/create');
    } else if (result.toLowerCase().includes('schedule meal') || result.toLowerCase().includes('plan meal')) {
      goto('/foods/update');
    } else if (result.toLowerCase().includes('show recipes')) {
      goto('/foods/review');
    }
  }

  function navigateToCreate() {
    goto('/foods/create');
  }

  function navigateToUpdate(recipeId) {
    goto(`/foods/update?id=${recipeId}`);
  }

  function navigateToReview() {
    goto('/foods/review');
  }

  function scheduleMeal(recipeId) {
    // Navigate to update page with scheduling intent
    goto(`/foods/update?id=${recipeId}&action=schedule`);
  }
</script>

<svelte:head>
  <title>Foods Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Foods Dashboard</h1>
        <p class="text-base-content/70">Meal planning, recipes, and nutrition tracking</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'add recipe' or 'schedule meal'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Add Recipe
        </button>
      </div>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Urgent Meal Prep Alerts -->
    {#if urgentMeals.length > 0}
      <div class="card bg-warning/10 border border-warning/20">
        <div class="card-body">
          <h3 class="card-title text-warning">
            <Icon icon="heroicons:clock" class="w-5 h-5" />
            Meal Prep Alerts ({urgentMeals.length})
          </h3>
          <div class="space-y-2">
            {#each urgentMeals as meal}
              <div class="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
                <div>
                  <p class="font-medium">{meal.name}</p>
                  <p class="text-sm text-base-content/70">Scheduled: {new Date(meal.scheduled_for).toLocaleTimeString()}</p>
                </div>
                <div class="flex gap-2">
                  <button class="btn btn-sm btn-warning" on:click={() => navigateToUpdate(meal.id)}>
                    Start Prep
                  </button>
                  <button class="btn btn-sm btn-outline" on:click={() => scheduleMeal(meal.id)}>
                    Reschedule
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Today's Meal Suggestions -->
    {#if todaysSuggestions.length > 0}
      <div class="card bg-success/10 border border-success/20">
        <div class="card-body">
          <h3 class="card-title text-success">
            <Icon icon="heroicons:sparkles" class="w-5 h-5" />
            Today's Meal Suggestions
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {#each todaysSuggestions as suggestion}
              <div class="card bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" on:click={() => navigateToUpdate(suggestion.id)} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(suggestion.id); } }}>
                <div class="card-body">
                  <h4 class="card-title text-lg">{suggestion.name}</h4>
                  <div class="flex items-center gap-2 text-sm text-base-content/70">
                    <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                    <span>{suggestion.rating}</span>
                    <span>•</span>
                    <span>{suggestion.preparation_time}min</span>
                  </div>
                  <p class="text-sm">{suggestion.cuisine} • {suggestion.difficulty}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={navigateToReview} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToReview(); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Recipes</p>
              <p class="text-2xl font-bold text-primary">{totalRecipes}</p>
            </div>
            <Icon icon="heroicons:document-text" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={() => goto('/foods/update?filter=scheduled')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto('/foods/update?filter=scheduled'); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Scheduled Meals</p>
              <p class="text-2xl font-bold text-info">{scheduledMeals.length}</p>
            </div>
            <Icon icon="heroicons:calendar" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={navigateToReview} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToReview(); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Avg Rating</p>
              <p class="text-2xl font-bold text-warning">{avgRating} ⭐</p>
            </div>
            <Icon icon="heroicons:star" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={navigateToReview} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToReview(); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Reviews</p>
              <p class="text-2xl font-bold text-success">{totalReviews}</p>
            </div>
            <Icon icon="heroicons:chat-bubble-left" class="w-8 h-8 text-success" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Meal Type Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Meals by Type</h3>
          <canvas id="mealTypeChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Cuisine Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Recipes by Cuisine</h3>
          <canvas id="cuisineChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Popular Recipes -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title">Popular Recipes</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>View All</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each popularRecipes as recipe}
            <div class="card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors" on:click={() => navigateToUpdate(recipe.id)} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(recipe.id); } }}>
              <div class="card-body">
                <h4 class="card-title text-lg">{recipe.name}</h4>
                <div class="flex items-center gap-2 text-sm">
                  <div class="flex items-center gap-1">
                    <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                    <span>{recipe.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{recipe.reviews} reviews</span>
                </div>
                <p class="text-sm text-base-content/70">{recipe.cuisine} • {recipe.meal_type}</p>
                <div class="flex gap-1 mt-2">
                  {#each recipe.dietary_tags.slice(0, 2) as tag}
                    <div class="badge badge-xs badge-outline">{tag}</div>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Recent Meals -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title">Recent Meals</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Cuisine</th>
                <th>Meal Type</th>
                <th>Cooked At</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each recentMeals as meal}
                <tr class="cursor-pointer hover" on:click={() => navigateToUpdate(meal.id)}>
                  <td class="font-medium">{meal.name}</td>
                  <td>{meal.cuisine}</td>
                  <td>
                    <div class="badge badge-outline">{meal.meal_type}</div>
                  </td>
                  <td>{new Date(meal.cooked_at).toLocaleDateString()}</td>
                  <td>
                    <div class="flex items-center gap-1">
                      <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                      <span>{meal.rating}</span>
                    </div>
                  </td>
                  <td>
                    <button class="btn btn-ghost btn-xs" on:click|stopPropagation={() => navigateToUpdate(meal.id)}>
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="foods" recordId="dashboard" />

  </div>
</div>