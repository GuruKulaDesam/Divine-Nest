<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

  let activeTab = "overview";

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "meals", label: "Meal Planning", icon: "🍽️" },
    { id: "recipes", label: "Recipes", icon: "📖" },
    { id: "kitchen", label: "Kitchen", icon: "🏠" },
    { id: "grocery", label: "Grocery", icon: "🛒" },
  ];

  // Mock data - in a real app, this would come from a database
  const stats = {
    pantryItems: 45,
    lowStockItems: 7,
    plannedMeals: 12,
    recipesCount: 89,
    kitchenTasks: 5,
    expiringSoon: 3
  };

  const recentMeals = [
    { name: "Idli Sambar", date: "Today", rating: 5, type: "Breakfast" },
    { name: "Chicken Biryani", date: "Yesterday", rating: 4, type: "Dinner" },
    { name: "Dosa with Chutney", date: "2 days ago", rating: 5, type: "Breakfast" }
  ];

  const upcomingMeals = [
    { name: "Pongal", day: "Tomorrow", type: "Breakfast" },
    { name: "Fish Curry with Rice", day: "Tomorrow", type: "Dinner" },
    { name: "Vegetable Pulao", day: "Day after", type: "Lunch" }
  ];

  const quickActions = [
    {
      title: "Plan Today's Meals",
      description: "Create meal plan for the day",
      icon: "heroicons:calendar-days",
      action: () => goto("/meals"),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Add Recipe",
      description: "Save a new traditional recipe",
      icon: "heroicons:document-plus",
      action: () => goto("/recipes"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Check Pantry",
      description: "Review grocery inventory",
      icon: "heroicons:archive-box",
      action: () => goto("/pantry"),
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Kitchen Tasks",
      description: "Manage kitchen activities",
      icon: "heroicons:home",
      action: () => goto("/food/kitchen"),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];
</script>

<svelte:head>
  <title>Food Dashboard - South Indian Family Life App</title>
  <meta name="description" content="Manage South Indian cuisine, meal planning, recipes, and kitchen activities" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
          <Icon icon="heroicons:utensils" class="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 class="text-4xl font-bold text-green-800 dark:text-green-200">🍽️ Food & Cuisine</h1>
          <p class="text-lg text-green-600 dark:text-green-400">Traditional South Indian cooking and meal management</p>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      {#each tabs as tab}
        <button
          class="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 {activeTab === tab.id ? 'bg-green-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-slate-700'}"
          on:click={() => (activeTab = tab.id)}
        >
          <span class="text-lg">{tab.icon}</span>
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Tab Content -->
    <div class="min-h-[600px]">
      {#if activeTab === "overview"}
        <!-- Overview Dashboard -->
        <div class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Icon icon="heroicons:archive-box" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Pantry Items</h3>
                  <p class="text-2xl font-bold text-blue-600">{stats.pantryItems}</p>
                  <p class="text-sm text-red-600">{stats.lowStockItems} low stock</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Meal Plans</h3>
                  <p class="text-2xl font-bold text-green-600">{stats.plannedMeals}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">This week</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Icon icon="heroicons:document-text" class="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Recipes</h3>
                  <p class="text-2xl font-bold text-orange-600">{stats.recipesCount}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Saved recipes</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Icon icon="heroicons:home" class="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Kitchen Tasks</h3>
                  <p class="text-2xl font-bold text-purple-600">{stats.kitchenTasks}</p>
                  <p class="text-sm text-yellow-600">{stats.expiringSoon} expiring soon</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {#each quickActions as action}
                <button
                  class="p-4 rounded-lg text-white transition-colors duration-200 flex flex-col items-center gap-3 {action.color}"
                  on:click={action.action}
                >
                  <Icon icon={action.icon} class="w-8 h-8" />
                  <div class="text-center">
                    <div class="font-semibold text-sm">{action.title}</div>
                    <div class="text-xs opacity-90">{action.description}</div>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Meals -->
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Meals</h3>
              <div class="space-y-3">
                {#each recentMeals as meal}
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div class="flex items-center gap-3">
                      <Icon icon="heroicons:star" class="w-5 h-5 text-yellow-500" />
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">{meal.name}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">{meal.type} • {meal.date}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-1">
                      {#each Array(5) as _, i}
                        <Icon
                          icon="heroicons:star"
                          class="w-4 h-4 {i < meal.rating ? 'text-yellow-500' : 'text-gray-300'}"
                        />
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Upcoming Meals -->
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Meals</h3>
              <div class="space-y-3">
                {#each upcomingMeals as meal}
                  <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="flex items-center gap-3">
                      <Icon icon="heroicons:calendar" class="w-5 h-5 text-green-600" />
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">{meal.name}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">{meal.type} • {meal.day}</div>
                      </div>
                    </div>
                    <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

      {:else if activeTab === "meals"}
        <!-- Meal Planning Tab -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="text-center py-12">
            <Icon icon="heroicons:calendar-days" class="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Meal Planning</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Plan traditional South Indian meals for your family</p>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              on:click={() => goto("/meals")}
            >
              Go to Meal Planning
            </button>
          </div>
        </div>

      {:else if activeTab === "recipes"}
        <!-- Recipes Tab -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="text-center py-12">
            <Icon icon="heroicons:document-text" class="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Recipe Collection</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Traditional South Indian recipes and cooking techniques</p>
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              on:click={() => goto("/recipes")}
            >
              Browse Recipes
            </button>
          </div>
        </div>

      {:else if activeTab === "kitchen"}
        <!-- Kitchen Tab -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="text-center py-12">
            <Icon icon="heroicons:home" class="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kitchen Management</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Manage kitchen activities, fresh items, and household meals</p>
            <button
              class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              on:click={() => goto("/food/kitchen")}
            >
              Open Kitchen Dashboard
            </button>
          </div>
        </div>

      {:else if activeTab === "grocery"}
        <!-- Grocery Tab -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="text-center py-12">
            <Icon icon="heroicons:shopping-cart" class="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Grocery Management</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Track pantry inventory and manage shopping lists</p>
            <button
              class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              on:click={() => goto("/pantry")}
            >
              Manage Grocery
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>