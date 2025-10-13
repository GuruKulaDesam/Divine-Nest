<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let activeSection = "overview";
  let todaysMeals = [];
  let weeklyPlan = [];
  let recipes = [];
  let nutritionData = {};

  // Calculate current section info
  $: currentSection = MealsSections.find((s) => s.id === activeSection);

  // Meals Sections for navigation
  const MealsSections = [
    {
      id: "overview",
      name: "Meals Overview",
      tamil: "உணவுகள் கண்ணோட்டம்",
      icon: "heroicons:fire",
      color: "orange"
    },
    {
      id: "today",
      name: "Today's Meals",
      tamil: "இன்றைய உணவுகள்",
      icon: "heroicons:calendar-days",
      color: "green"
    },
    {
      id: "weekly",
      name: "Weekly Plan",
      tamil: "வாராந்திர திட்டம்",
      icon: "heroicons:calendar",
      color: "blue"
    },
    {
      id: "recipes",
      name: "Traditional Recipes",
      tamil: "மரபு சமையல்",
      icon: "heroicons:book-open",
      color: "purple"
    },
    {
      id: "nutrition",
      name: "Nutrition Tracking",
      tamil: "ஊட்டச்சத்து கண்காணிப்பு",
      icon: "heroicons:chart-bar",
      color: "red"
    }
  ];

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
      },
      {
        name: "Medu Vada",
        category: "Breakfast",
        prepTime: "45 mins",
        servings: 4,
        ingredients: ["Urad dal", "Onion", "Green chilies", "Curry leaves"],
        instructions: "Soak dal, grind to batter, add spices, deep fry..."
      },
      {
        name: "Rasam",
        category: "Main Course",
        prepTime: "20 mins",
        servings: 4,
        ingredients: ["Tamarind", "Tomatoes", "Rasam powder", "Coriander"],
        instructions: "Extract tamarind juice, add tomatoes and spices, boil..."
      },
      {
        name: "Avial",
        category: "Side Dish",
        prepTime: "25 mins",
        servings: 4,
        ingredients: ["Mixed vegetables", "Coconut", "Curry leaves", "Cumin"],
        instructions: "Cook vegetables, grind coconut mixture, combine..."
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

  function switchSection(sectionId) {
    activeSection = sectionId;
  }

  function markMealComplete(mealIndex) {
    todaysMeals[mealIndex].completed = !todaysMeals[mealIndex].completed;
    todaysMeals = [...todaysMeals];
  }

  // Calculate stats
  $: {
    const completedMeals = todaysMeals.filter(m => m.completed).length;
    const totalMeals = todaysMeals.length;
    const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
    const completedCalories = todaysMeals.filter(m => m.completed).reduce((sum, meal) => sum + meal.calories, 0);
  }
</script>

<!-- Meals & Nutrition Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white dark:bg-transparent rounded-xl shadow-lg p-6 mb-6 border dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
            <Icon icon="heroicons:fire" class="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">���️ Meals & Nutrition</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">உணவுகள் & ஊட்டச்சத்து</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Plan nutritious meals and preserve traditional South Indian recipes</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex space-x-2">
          <button class="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all">
            <Icon icon="heroicons:plus" class="w-5 h-5" />
            <span class="font-medium">Add Meal</span>
          </button>
          <button class="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
            <Icon icon="heroicons:clipboard-document-list" class="w-5 h-5" />
            <span class="font-medium">Weekly Plan</span>
          </button>
        </div>
      </div>

      <!-- Quick Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Today's Meals</p>
              <p class="text-2xl font-bold">{todaysMeals.filter(m => m.completed).length}/{todaysMeals.length}</p>
              <p class="text-xs opacity-75">இன்றைய உணவுகள்</p>
            </div>
            <Icon icon="heroicons:check-circle" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Calories Today</p>
              <p class="text-2xl font-bold">{todaysMeals.filter(m => m.completed).reduce((sum, meal) => sum + meal.calories, 0)}</p>
              <p class="text-xs opacity-75">இன்றைய கலோரிகள்</p>
            </div>
            <Icon icon="heroicons:fire" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Recipes</p>
              <p class="text-2xl font-bold">{recipes.length}</p>
              <p class="text-xs opacity-75">சமையல்</p>
            </div>
            <Icon icon="heroicons:book-open" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Weekly Plans</p>
              <p class="text-2xl font-bold">{weeklyPlan.length}</p>
              <p class="text-xs opacity-75">வாராந்திர திட்டங்கள்</p>
            </div>
            <Icon icon="heroicons:calendar" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-transparent rounded-xl shadow-lg p-6 border dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Icon icon="heroicons:bars-3" class="w-5 h-5 mr-2" />
            Meal Sections
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">பிரிவுகள்</span>
          </h3>

          <nav class="space-y-2">
            {#each MealsSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? `bg-${section.color}-100 dark:bg-${section.color}-900/30 text-${section.color}-700 dark:text-${section.color}-300 border-l-4 border-${section.color}-500` : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{section.name}</p>
                  <p class="text-xs opacity-75 truncate">{section.tamil}</p>
                </div>
                {#if activeSection === section.id}
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                {/if}
              </button>
            {/each}
          </nav>

          <!-- Quick Actions Sidebar -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div class="space-y-2">
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100">
                <Icon icon="heroicons:plus" class="w-4 h-4" />
                <span>Add Recipe</span>
              </button>
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                <Icon icon="heroicons:clipboard-document-list" class="w-4 h-4" />
                <span>Meal Planner</span>
              </button>
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                <Icon icon="heroicons:chart-bar" class="w-4 h-4" />
                <span>Nutrition Log</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <div class="bg-white dark:bg-transparent rounded-xl shadow-lg p-6 border dark:border-gray-700">
          {#if activeSection === "overview"}
            <!-- Overview Dashboard -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Meals Overview</h2>
                <span class="text-sm text-gray-500 dark:text-gray-400">உணவுகள் கண்ணோட்டம்</span>
              </div>

              <!-- Today's Progress -->
              <div class="bg-orange-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-orange-900 mb-3">Today's Meal Progress</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each todaysMeals as meal, index}
                    <div class="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm {meal.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300 dark:border-gray-600'}">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center space-x-3">
                          <Icon icon={meal.completed ? "heroicons:check-circle" : "heroicons:clock"} class="w-6 h-6 {meal.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}" />
                          <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">{meal.meal}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300">{meal.time}</p>
                          </div>
                        </div>
                        <span class="text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded">{meal.calories} cal</span>
                      </div>
                      <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {#each meal.items as item}
                          <li>• {item}</li>
                        {/each}
                      </ul>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Weekly Preview -->
              <div class="bg-blue-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-blue-900 mb-3">This Week's Meals</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-2">
                  {#each weeklyPlan.slice(0, 7) as day}
                    <div class="bg-white dark:bg-gray-800/50 p-3 rounded-lg text-center border dark:border-gray-600">
                      <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{day.day.slice(0, 3)}</h4>
                      <div class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {#each day.meals.slice(0, 2) as meal}
                          <div>{meal}</div>
                        {/each}
                        {#if day.meals.length > 2}
                          <div class="text-gray-400 dark:text-gray-500">+{day.meals.length - 2} more</div>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Popular Recipes -->
              <div class="bg-purple-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-purple-900 mb-3">Featured Recipes</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each recipes.slice(0, 4) as recipe}
                    <div class="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border dark:border-gray-600">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-900 dark:text-white">{recipe.name}</h4>
                        <span class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">{recipe.category}</span>
                      </div>
                      <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span class="flex items-center space-x-1">
                          <Icon icon="heroicons:clock" class="w-4 h-4" />
                          <span>{recipe.prepTime}</span>
                        </span>
                        <span class="flex items-center space-x-1">
                          <Icon icon="heroicons:user-group" class="w-4 h-4" />
                          <span>{recipe.servings} servings</span>
                        </span>
                      </div>
                      <p class="text-xs text-gray-500">{recipe.ingredients.slice(0, 3).join(", ")}{recipe.ingredients.length > 3 ? "..." : ""}</p>
                    </div>
                  {/each}
                </div>
              </div>
            </div>

          {:else if activeSection === "today"}
            <!-- Today's Meals -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Today's Meal Plan</h2>
              <div class="space-y-4">
                {#each todaysMeals as meal, index}
                  <div class="border rounded-lg p-4 {meal.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-600'}">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{meal.meal}</h3>
                        <span class="text-sm text-gray-600 dark:text-gray-300">{meal.time}</span>
                        <span class="text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded">{meal.calories} cal</span>
                      </div>
                      <button
                        class="px-3 py-1 rounded {meal.completed ? 'bg-green-600 dark:bg-green-700 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}"
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

          {:else if activeSection === "weekly"}
            <!-- Weekly Plan -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Weekly Meal Plan</h2>
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

          {:else if activeSection === "recipes"}
            <!-- Recipes -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Traditional Recipes</h2>
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

          {:else if activeSection === "nutrition"}
            <!-- Nutrition -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Nutrition Tracking</h2>
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

          {:else}
            <div class="text-center py-12">
              <Icon icon="heroicons:fire" class="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3>
              <p class="text-gray-600">This meals section is under development.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
