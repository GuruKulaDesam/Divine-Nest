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

  let searchTerm = '';
  let cuisineFilter = 'all';
  let categoryFilter = 'all';
  let mealTypeFilter = 'all';
  let difficultyFilter = 'all';
  let sortBy = 'rating';
  let sortOrder = 'desc';
  let voiceResult = '';

  let cuisineChart;
  let ratingChart;

  // Filter and search recipes
  $: filteredRecipes = $foods.filter(recipe => {
    const matchesSearch = !searchTerm ||
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCuisine = cuisineFilter === 'all' || recipe.cuisine === cuisineFilter;
    const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
    const matchesMealType = mealTypeFilter === 'all' || recipe.meal_type === mealTypeFilter;
    const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter;

    return matchesSearch && matchesCuisine && matchesCategory && matchesMealType && matchesDifficulty;
  });

  // Sort recipes
  $: sortedRecipes = [...filteredRecipes].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'rating':
        aVal = a.rating;
        bVal = b.rating;
        break;
      case 'reviews':
        aVal = a.reviews;
        bVal = b.reviews;
        break;
      case 'preparation_time':
        aVal = a.preparation_time;
        bVal = b.preparation_time;
        break;
      case 'created_at':
        aVal = new Date(a.created_at);
        bVal = new Date(b.created_at);
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Analytics
  $: totalRecipes = filteredRecipes.length;
  $: avgRating = filteredRecipes.length > 0 ? (filteredRecipes.reduce((sum, r) => sum + r.rating, 0) / filteredRecipes.length).toFixed(1) : 0;
  $: totalReviews = filteredRecipes.reduce((sum, r) => sum + r.reviews, 0);
  $: mostPopularCuisine = getMostPopularCuisine();
  $: avgPrepTime = filteredRecipes.length > 0 ? Math.round(filteredRecipes.reduce((sum, r) => sum + r.preparation_time, 0) / filteredRecipes.length) : 0;

  function getMostPopularCuisine() {
    const cuisineCount = {};
    filteredRecipes.forEach(recipe => {
      cuisineCount[recipe.cuisine] = (cuisineCount[recipe.cuisine] || 0) + 1;
    });
    return Object.entries(cuisineCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
  }

  onMount(() => {
    initializeCharts();
  });

  function initializeCharts() {
    // Cuisine Distribution Chart
    const cuisineCtx = document.getElementById('cuisineChart');
    if (cuisineCtx) {
      const cuisines = ['South Indian', 'North Indian', 'Hyderabadi', 'Punjabi', 'Bengali', 'Chinese', 'Italian', 'International'];
      const cuisineData = cuisines.map(cuisine =>
        filteredRecipes.filter(recipe => recipe.cuisine === cuisine).length
      );

      cuisineChart = new Chart(cuisineCtx, {
        type: 'pie',
        data: {
          labels: cuisines,
          datasets: [{
            data: cuisineData,
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#6b7280', '#ec4899', '#84cc16'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // Rating Distribution Chart
    const ratingCtx = document.getElementById('ratingChart');
    if (ratingCtx) {
      const ratingRanges = ['5 Stars', '4-4.9', '3-3.9', '2-2.9', '1-1.9'];
      const ratingData = ratingRanges.map(range => {
        switch (range) {
          case '5 Stars': return filteredRecipes.filter(r => r.rating === 5).length;
          case '4-4.9': return filteredRecipes.filter(r => r.rating >= 4 && r.rating < 5).length;
          case '3-3.9': return filteredRecipes.filter(r => r.rating >= 3 && r.rating < 4).length;
          case '2-2.9': return filteredRecipes.filter(r => r.rating >= 2 && r.rating < 3).length;
          case '1-1.9': return filteredRecipes.filter(r => r.rating >= 1 && r.rating < 2).length;
          default: return 0;
        }
      });

      ratingChart = new Chart(ratingCtx, {
        type: 'bar',
        data: {
          labels: ratingRanges,
          datasets: [{
            label: 'Recipes by Rating',
            data: ratingData,
            backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'],
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
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('show south indian') || lowerResult.includes('south indian recipes')) {
      cuisineFilter = 'South Indian';
    } else if (lowerResult.includes('show breakfast') || lowerResult.includes('breakfast recipes')) {
      mealTypeFilter = 'Breakfast';
    } else if (lowerResult.includes('show vegetarian')) {
      // Could filter by dietary tags if implemented
    } else if (lowerResult.includes('search for')) {
      const searchMatch = result.match(/search for (.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    }
  }

  function exportToCSV() {
    const headers = ['Name', 'Cuisine', 'Category', 'Meal Type', 'Difficulty', 'Prep Time', 'Servings', 'Rating', 'Reviews', 'Ingredients', 'Instructions'];
    const csvContent = [
      headers.join(','),
      ...sortedRecipes.map(recipe => [
        `"${recipe.name}"`,
        recipe.cuisine,
        recipe.category,
        recipe.meal_type,
        recipe.difficulty,
        recipe.preparation_time,
        recipe.servings,
        recipe.rating,
        recipe.reviews,
        `"${recipe.ingredients.join('; ')}"`,
        `"${recipe.instructions.replace(/"/g, '""')}"` // Escape quotes
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(sortedRecipes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipes-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToDashboard() {
    goto('/foods/dashboard');
  }

  function navigateToCreate() {
    goto('/foods/create');
  }

  function navigateToUpdate(recipeId) {
    goto(`/foods/update?id=${recipeId}`);
  }
</script>

<svelte:head>
  <title>Review Recipes - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Review Recipes" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Review Recipes</h1>
        <p class="text-base-content/70">Comprehensive view of all recipes with analytics and export</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'show south indian' or 'search for chicken'" />
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

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl">
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

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Average Rating</p>
              <p class="text-2xl font-bold text-warning">{avgRating} ⭐</p>
            </div>
            <Icon icon="heroicons:star" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
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

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Avg Prep Time</p>
              <p class="text-2xl font-bold text-info">{avgPrepTime} min</p>
            </div>
            <Icon icon="heroicons:clock" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Recipes by Cuisine</h3>
          <canvas id="cuisineChart" width="300" height="200"></canvas>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Rating Distribution</h3>
          <canvas id="ratingChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Filters & Search</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              bind:value={searchTerm}
              class="input input-bordered"
              placeholder="Recipe name, ingredients..."
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Cuisine</span>
            </label>
            <select bind:value={cuisineFilter} class="select select-bordered">
              <option value="all">All Cuisines</option>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Hyderabadi">Hyderabadi</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Bengali">Bengali</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="International">International</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={categoryFilter} class="select select-bordered">
              <option value="all">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Main Course">Main Course</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Meal Type</span>
            </label>
            <select bind:value={mealTypeFilter} class="select select-bordered">
              <option value="all">All Meal Types</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Difficulty</span>
            </label>
            <select bind:value={difficultyFilter} class="select select-bordered">
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select bind:value={sortBy} class="select select-bordered">
              <option value="rating">Rating</option>
              <option value="name">Name</option>
              <option value="reviews">Reviews</option>
              <option value="preparation_time">Prep Time</option>
              <option value="created_at">Date Added</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <p class="text-sm text-base-content/70">Showing {sortedRecipes.length} of {totalRecipes} recipes</p>
          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm" on:click={exportToCSV}>
              <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
              Export CSV
            </button>
            <button class="btn btn-outline btn-sm" on:click={exportToJSON}>
              <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
              Export JSON
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each sortedRecipes as recipe}
        <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => navigateToUpdate(recipe.id)} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(recipe.id); } }}>
          <div class="card-body">
            <div class="flex justify-between items-start mb-3">
              <h3 class="card-title text-lg line-clamp-2">{recipe.name}</h3>
              <div class="flex items-center gap-1">
                <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                <span class="text-sm font-medium">{recipe.rating}</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:globe-alt" class="w-4 h-4" />
                <span>{recipe.cuisine}</span>
                <span>•</span>
                <Icon icon="heroicons:clock" class="w-4 h-4" />
                <span>{recipe.preparation_time}min</span>
              </div>

              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:user-group" class="w-4 h-4" />
                <span>{recipe.servings} servings</span>
                <span>•</span>
                <span class="badge badge-xs {recipe.difficulty === 'Easy' ? 'badge-success' : recipe.difficulty === 'Medium' ? 'badge-warning' : 'badge-error'}">
                  {recipe.difficulty}
                </span>
              </div>

              <div class="flex flex-wrap gap-1">
                {#each recipe.dietary_tags.slice(0, 3) as tag}
                  <div class="badge badge-xs badge-outline">{tag}</div>
                {/each}
                {#if recipe.dietary_tags.length > 3}
                  <div class="badge badge-xs badge-outline">+{recipe.dietary_tags.length - 3}</div>
                {/if}
              </div>

              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:chat-bubble-left" class="w-4 h-4" />
                <span>{recipe.reviews} reviews</span>
                {#if recipe.scheduled_for}
                  <span class="text-primary">• Scheduled</span>
                {/if}
                {#if recipe.cooked_at}
                  <span class="text-success">• Cooked</span>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if sortedRecipes.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:document-text" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <p class="text-base-content/70">No recipes found matching your filters</p>
        <button class="btn btn-primary mt-4" on:click={navigateToCreate}>
          Add Your First Recipe
        </button>
      </div>
    {/if}

    <!-- Navigation -->
    <div class="flex justify-center gap-4">
      <button class="btn btn-outline" on:click={navigateToDashboard}>
        <Icon icon="heroicons:home" class="w-4 h-4" />
        Dashboard
      </button>
      <button class="btn btn-outline" on:click={navigateToCreate}>
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        Add Recipe
      </button>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="foods" recordId="review" />

  </div>
</div>