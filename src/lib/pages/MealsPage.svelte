<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentTab = "today";
  const tabs = [
    { id: "today", label: "Today's Meals", icon: "heroicons:calendar-days" },
    { id: "weekly", label: "Weekly Plan", icon: "heroicons:calendar" },
    { id: "recipes", label: "Recipes", icon: "heroicons:book-open" },
    { id: "nutrition", label: "Nutrition", icon: "heroicons:chart-bar" }
  ];

  let todaysMeals = [];
  let weeklyPlan = [];
  let recipes = [];
  let nutritionData = {};

  onMount(() => {
    // Today's Meals
    todaysMeals = [
      {
        meal: "Breakfast",
        time: "7:30 AM",
        items: ["Idli (3 pieces)", "Sambar", "Coconut Chutney", "Filter Coffee"],
        calories: 450,
        completed: true
      },
      {
        meal: "Lunch",
        time: "12:30 PM",
        items: ["Rice", "Sambar", "Poriyal", "Rasam", "Curd", "Papad"],
        calories: 650,
        completed: false
      },
      {
        meal: "Evening Snacks",
        time: "4:30 PM",
        items: ["Tea", "Murukku", "Banana"],
        calories: 300,
        completed: false
      },
      {
        meal: "Dinner",
        time: "7:30 PM",
        items: ["Chapati (2)", "Paneer Curry", "Rice", "Salad"],
        calories: 700,
        completed: false
      }
    ];

    // Weekly Plan
    weeklyPlan = [
      { day: "Monday", meals: ["Idli", "Rice & Curry", "Chapati"] },
      { day: "Tuesday", meals: ["Dosa", "Biryani", "Paratha"] },
      { day: "Wednesday", meals: ["Pongal", "Rice & Sambar", "Naan"] },
      { day: "Thursday", meals: ["Upma", "Pulav", "Roti"] },
      { day: "Friday", meals: ["Poori", "Chole", "Paratha"] },
      { day: "Saturday", meals: ["Appam", "Fish Curry", "Dosa"] },
      { day: "Sunday", meals: ["Paniyaram", "Rice & Curry", "Chapati"] }
    ];

    // Recipes
    recipes = [
      {
        name: "Traditional Sambar",
        category: "Main Course",
        prepTime: "30 mins",
        servings: 4,
        ingredients: ["Toor dal", "Tamarind", "Vegetables", "Sambar powder"],
        instructions: "Cook dal, prepare tamarind extract, add vegetables and spices..."
      },
      {
        name: "Coconut Chutney",
        category: "Side Dish",
        prepTime: "10 mins",
        servings: 4,
        ingredients: ["Coconut", "Green chilies", "Curry leaves", "Yogurt"],
        instructions: "Grind coconut with chilies and leaves, mix with yogurt..."
      },
      {
        name: "Filter Coffee",
        category: "Beverage",
        prepTime: "5 mins",
        servings: 2,
        ingredients: ["Coffee powder", "Hot water", "Milk", "Sugar"],
        instructions: "Mix coffee decoction with hot milk and sugar..."
      }
    ];

    // Nutrition Data
    nutritionData = {
      today: {
        calories: 2100,
        target: 2200,
        protein: 85,
        carbs: 280,
        fat: 65,
        water: 6
      },
      weekly: {
        averageCalories: 2150,
        target: 2200,
        protein: 82,
        carbs: 275,
        fat: 68
      }
    };
  });

  function markMealComplete(mealIndex) {
    todaysMeals[mealIndex].completed = !todaysMeals[mealIndex].completed;
    todaysMeals = [...todaysMeals];
  }
</script>

<svelte:head>
  <title>Meal Management - South Indian Family Life App</title>
  <meta name="description" content="Plan, track, and manage family meals with traditional South Indian recipes" />
</svelte:head>

<div class="max-w-7xl mx-auto p-6 space-y-6">
  <!-- Header -->
  <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
    <div class="flex items-center gap-3 mb-4">
      <Icon icon="heroicons:fire" class="w-8 h-8" />
      <h1 class="text-2xl font-bold">Meal Management</h1>
    </div>
    <p class="text-orange-100">Plan nutritious meals and preserve traditional South Indian recipes</p>
  </div>

  <!-- Navigation Tabs -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button
          class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors {currentTab === tab.id ? 'bg-orange-100 text-orange-800' : 'text-gray-600 hover:bg-gray-100'}"
          on:click={() => currentTab = tab.id}
        >
          <Icon icon={tab.icon} class="w-5 h-5" />
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- Today's Meals -->
    {#if currentTab === 'today'}
      <div>
        <h2 class="text-xl font-bold mb-4">Today's Meal Plan</h2>
        <div class="space-y-4">
          {#each todaysMeals as meal, index}
            <div class="border rounded-lg p-4 {meal.completed ? 'bg-green-50 border-green-200' : 'bg-white'}">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <h3 class="font-semibold text-lg">{meal.meal}</h3>
                  <span class="text-sm text-gray-600">{meal.time}</span>
                  <span class="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">{meal.calories} cal</span>
                </div>
                <button
                  class="px-3 py-1 rounded {meal.completed ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}"
                  on:click={() => markMealComplete(index)}
                >
                  {meal.completed ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                {#each meal.items as item}
                  <li>{item}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Weekly Plan -->
    {#if currentTab === 'weekly'}
      <div>
        <h2 class="text-xl font-bold mb-4">Weekly Meal Plan</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each weeklyPlan as day}
            <div class="border rounded-lg p-4">
              <h3 class="font-semibold text-lg mb-2">{day.day}</h3>
              <ul class="space-y-1 text-gray-700">
                {#each day.meals as meal}
                  <li class="flex items-center gap-2">
                    <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600" />
                    {meal}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Recipes -->
    {#if currentTab === 'recipes'}
      <div>
        <h2 class="text-xl font-bold mb-4">Traditional Recipes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each recipes as recipe}
            <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 class="font-semibold text-lg mb-2">{recipe.name}</h3>
              <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span class="flex items-center gap-1">
                  <Icon icon="heroicons:clock" class="w-4 h-4" />
                  {recipe.prepTime}
                </span>
                <span class="flex items-center gap-1">
                  <Icon icon="heroicons:user-group" class="w-4 h-4" />
                  {recipe.servings} servings
                </span>
              </div>
              <p class="text-sm text-orange-600 mb-2">{recipe.category}</p>
              <div class="mb-3">
                <p class="font-medium text-sm mb-1">Ingredients:</p>
                <ul class="text-sm text-gray-700 list-disc list-inside">
                  {#each recipe.ingredients.slice(0, 3) as ingredient}
                    <li>{ingredient}</li>
                  {/each}
                  {#if recipe.ingredients.length > 3}
                    <li class="text-gray-500">+{recipe.ingredients.length - 3} more...</li>
                  {/if}
                </ul>
              </div>
              <button class="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                View Recipe
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Nutrition -->
    {#if currentTab === 'nutrition'}
      <div>
        <h2 class="text-xl font-bold mb-4">Nutrition Tracking</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Today's Nutrition -->
          <div class="border rounded-lg p-6">
            <h3 class="font-semibold text-lg mb-4">Today's Intake</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span>Calories</span>
                <span class="font-semibold">{nutritionData.today?.calories || 0} / {nutritionData.today?.target || 0}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-600 h-2 rounded-full" style="width: {((nutritionData.today?.calories || 0) / (nutritionData.today?.target || 0)) * 100}%"></div>
              </div>
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p class="text-2xl font-bold text-blue-600">{nutritionData.today?.protein || 0}g</p>
                  <p class="text-sm text-gray-600">Protein</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-green-600">{nutritionData.today?.carbs || 0}g</p>
                  <p class="text-sm text-gray-600">Carbs</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-purple-600">{nutritionData.today?.fat || 0}g</p>
                  <p class="text-sm text-gray-600">Fat</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Average -->
          <div class="border rounded-lg p-6">
            <h3 class="font-semibold text-lg mb-4">Weekly Average</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span>Average Calories</span>
                <span class="font-semibold">{nutritionData.weekly?.averageCalories || 0} / {nutritionData.weekly?.target || 0}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: {((nutritionData.weekly?.averageCalories || 0) / (nutritionData.weekly?.target || 0)) * 100}%"></div>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">{nutritionData.weekly?.protein || 0}g</p>
                <p class="text-sm text-gray-600">Avg Protein</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>