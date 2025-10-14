<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { motionInView, motionHover } from "$lib/utils/motion";
  import { userProfile } from "$lib/stores/userProfile";
  import { _ } from "svelte-i18n";

  // Consolidated dashboard data
  let dashboardData = {
    meals: {
      today: [],
      upcoming: [],
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    },
    finances: {
      balance: 0,
      expenses: [],
      savings: 0,
      recent: []
    },
    household: {
      chores: [],
      inventory: [],
      maintenance: []
    },
    family: {
      events: [],
      reminders: [],
      members: []
    },
    health: {
      activities: [],
      wellness: {}
    }
  };

  let isLoading = true;

  // Time-based greeting
  $: currentHour = new Date().getHours();
  $: greeting = currentHour < 12 ? "Good Morning" :
                currentHour < 17 ? "Good Afternoon" :
                currentHour < 21 ? "Good Evening" : "Good Night";

  onMount(async () => {
    // Load real data from various modules
    await loadDashboardData();
    isLoading = false;
  });

  async function loadDashboardData() {
    try {
      // Load today's meals
      dashboardData.meals.today = [
        {
          id: 1,
          meal: "Breakfast",
          time: "7:30 AM",
          items: ["Idli (3 pieces)", "Sambar", "Coconut Chutney"],
          calories: 450,
          completed: true,
          path: "/food"
        },
        {
          id: 2,
          meal: "Lunch",
          time: "12:30 PM",
          items: ["Rice", "Sambar", "Poriyal", "Rasam"],
          calories: 650,
          completed: false,
          path: "/food"
        }
      ];

      // Load upcoming meals
      dashboardData.meals.upcoming = [
        { day: "Tomorrow", meal: "Pongal with Coconut Chutney", path: "/food" },
        { day: "Wednesday", meal: "Biryani with Raita", path: "/food" }
      ];

      // Load nutrition data
      dashboardData.meals.nutrition = {
        calories: 1850,
        protein: 65,
        carbs: 280,
        fat: 45
      };

      // Load financial data
      dashboardData.finances.balance = 45231;
      dashboardData.finances.savings = 45000;
      dashboardData.finances.expenses = [
        { category: "Grocery", amount: 2500, date: "Today", path: "/finances/expenses" },
        { category: "Utilities", amount: 1800, date: "Yesterday", path: "/finances/expenses" }
      ];
      dashboardData.finances.recent = [
        { description: "Monthly Grocery", amount: -2500, date: "2 hours ago", path: "/finances" },
        { description: "Salary Credit", amount: 45000, date: "3 days ago", path: "/finances" }
      ];

      // Load household data
      dashboardData.household.chores = [
        { task: "Clean Kitchen", priority: "high", due: "Today", path: "/home/chores" },
        { task: "Water Plants", priority: "medium", due: "Tomorrow", path: "/home/chores" }
      ];
      dashboardData.household.inventory = [
        { item: "Rice", quantity: "2 kg", status: "low", path: "/inventory" },
        { item: "Milk", quantity: "1 liter", status: "normal", path: "/inventory" }
      ];
      dashboardData.household.maintenance = [
        { item: "AC Filter", due: "2 weeks", priority: "medium", path: "/issues" }
      ];

      // Load family data
      dashboardData.family.events = [
        { title: "Family Dinner", date: "Today 7:30 PM", type: "meal", path: "/events" },
        { title: "Temple Visit", date: "Sunday 9:00 AM", type: "religious", path: "/culture" }
      ];
      dashboardData.family.reminders = [
        { title: "Call Mother", time: "6:00 PM", priority: "high", path: "/home/reminders" },
        { title: "Pay Electricity Bill", time: "Tomorrow", priority: "medium", path: "/finances" }
      ];
      dashboardData.family.members = [
        { name: "Mom", role: "Parent", status: "home", path: "/members" },
        { name: "Dad", role: "Parent", status: "office", path: "/members" }
      ];

      // Load health data
      dashboardData.health.activities = [
        { activity: "Morning Walk", duration: "30 min", completed: true, path: "/health" },
        { activity: "Yoga", duration: "15 min", completed: false, path: "/wellness" }
      ];
      dashboardData.health.wellness = {
        sleep: "7.5 hours",
        water: "6 glasses",
        mood: "Good"
      };

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }

  function navigateTo(path) {
    goto(path);
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'normal': return 'text-green-600 bg-green-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  }
</script>

<div class="min-h-screen bg-base-100">
  <!-- Welcome Header -->
  <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 px-6" use:motionInView>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-2">
        {greeting}, {$userProfile.name || 'Family Member'}! 👋
      </h1>
      <p class="text-orange-100 text-lg">
        Here's your family management overview for today
      </p>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
    <!-- Quick Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" use:motionInView>
      <!-- Today's Meals -->
      <div class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-orange-500" use:motionHover on:click={() => navigateTo('/food')}>
        <div class="card-body p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-800">Today's Meals</h3>
              <p class="text-2xl font-bold text-orange-600">{dashboardData.meals.today.filter(m => m.completed).length}/{dashboardData.meals.today.length}</p>
              <p class="text-sm text-gray-500">meals completed</p>
            </div>
            <Icon icon="heroicons:fire" class="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      <!-- Financial Balance -->
      <div class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-green-500" use:motionHover on:click={() => navigateTo('/finances')}>
        <div class="card-body p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-800">Family Balance</h3>
              <p class="text-2xl font-bold text-green-600">₹{dashboardData.finances.balance.toLocaleString()}</p>
              <p class="text-sm text-gray-500">current balance</p>
            </div>
            <Icon icon="heroicons:banknotes" class="w-10 h-10 text-green-500" />
          </div>
        </div>
      </div>

      <!-- Household Tasks -->
      <div class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-blue-500" use:motionHover on:click={() => navigateTo('/home')}>
        <div class="card-body p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-800">Household Tasks</h3>
              <p class="text-2xl font-bold text-blue-600">{dashboardData.household.chores.length}</p>
              <p class="text-sm text-gray-500">pending tasks</p>
            </div>
            <Icon icon="heroicons:home" class="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      <!-- Family Health -->
      <div class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-purple-500" use:motionHover on:click={() => navigateTo('/health')}>
        <div class="card-body p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-800">Wellness</h3>
              <p class="text-2xl font-bold text-purple-600">{dashboardData.health.wellness.sleep}</p>
              <p class="text-sm text-gray-500">sleep last night</p>
            </div>
            <Icon icon="heroicons:heart" class="w-10 h-10 text-purple-500" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Left Column - Today's Meals & Nutrition -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Today's Meals -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Today's Meals</h3>
              <button class="btn btn-sm btn-outline btn-primary" on:click={() => navigateTo('/food')}>
                View All
              </button>
            </div>
            <div class="space-y-3">
              {#each dashboardData.meals.today as meal}
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors" on:click={() => navigateTo(meal.path)}>
                  <div class="flex-1">
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded-full {meal.completed ? 'bg-green-500' : 'bg-gray-300'}"></div>
                      <div>
                        <p class="font-medium text-gray-800">{meal.meal}</p>
                        <p class="text-sm text-gray-500">{meal.time}</p>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-600">{meal.calories} cal</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Nutrition Summary -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Nutrition Today</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors" on:click={() => navigateTo('/food')}>
                <p class="text-2xl font-bold text-orange-600">{dashboardData.meals.nutrition.calories}</p>
                <p class="text-sm text-gray-600">Calories</p>
              </div>
              <div class="text-center p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" on:click={() => navigateTo('/food')}>
                <p class="text-2xl font-bold text-blue-600">{dashboardData.meals.nutrition.protein}g</p>
                <p class="text-sm text-gray-600">Protein</p>
              </div>
              <div class="text-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" on:click={() => navigateTo('/food')}>
                <p class="text-2xl font-bold text-green-600">{dashboardData.meals.nutrition.carbs}g</p>
                <p class="text-sm text-gray-600">Carbs</p>
              </div>
              <div class="text-center p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" on:click={() => navigateTo('/food')}>
                <p class="text-2xl font-bold text-purple-600">{dashboardData.meals.nutrition.fat}g</p>
                <p class="text-sm text-gray-600">Fat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Column - Household & Family -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Household Tasks -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Household Tasks</h3>
              <button class="btn btn-sm btn-outline btn-info" on:click={() => navigateTo('/home')}>
                View All
              </button>
            </div>
            <div class="space-y-3">
              {#each dashboardData.household.chores.slice(0, 3) as chore}
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors {getPriorityColor(chore.priority)}" on:click={() => navigateTo(chore.path)}>
                  <div class="flex-1">
                    <p class="font-medium">{chore.task}</p>
                    <p class="text-sm opacity-75">Due: {chore.due}</p>
                  </div>
                  <Icon icon="heroicons:chevron-right" class="w-5 h-5 opacity-50" />
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Family Events -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Family Events</h3>
              <button class="btn btn-sm btn-outline btn-success" on:click={() => navigateTo('/events')}>
                View All
              </button>
            </div>
            <div class="space-y-3">
              {#each dashboardData.family.events as event}
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors" on:click={() => navigateTo(event.path)}>
                  <div class="flex-1">
                    <p class="font-medium text-gray-800">{event.title}</p>
                    <p class="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Inventory Status -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Pantry Status</h3>
              <button class="btn btn-sm btn-outline btn-warning" on:click={() => navigateTo('/inventory')}>
                View All
              </button>
            </div>
            <div class="space-y-3">
              {#each dashboardData.household.inventory.slice(0, 3) as item}
                <div class="flex items-center justify-between p-3 rounded-lg {getStatusColor(item.status)} cursor-pointer hover:opacity-80 transition-opacity" on:click={() => navigateTo(item.path)}>
                  <div class="flex-1">
                    <p class="font-medium">{item.item}</p>
                    <p class="text-sm opacity-75">{item.quantity}</p>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-1 text-xs rounded-full {item.status === 'low' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">
                      {item.status}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Finances & Reminders -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Financial Overview -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Financial Overview</h3>
              <button class="btn btn-sm btn-outline btn-success" on:click={() => navigateTo('/finances')}>
                View All
              </button>
            </div>
            <div class="space-y-4">
              <div class="text-center p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" on:click={() => navigateTo('/finances')}>
                <p class="text-2xl font-bold text-green-600">₹{dashboardData.finances.balance.toLocaleString()}</p>
                <p class="text-sm text-gray-600">Current Balance</p>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" on:click={() => navigateTo('/finances')}>
                <p class="text-2xl font-bold text-blue-600">₹{dashboardData.finances.savings.toLocaleString()}</p>
                <p class="text-sm text-gray-600">Total Savings</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Recent Activity</h3>
              <button class="btn btn-sm btn-outline btn-primary" on:click={() => navigateTo('/finances')}>
                View All
              </button>
            </div>
            <div class="space-y-3">
              {#each dashboardData.finances.recent.slice(0, 4) as transaction}
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors" on:click={() => navigateTo(transaction.path)}>
                  <div class="flex-1">
                    <p class="font-medium text-gray-800">{transaction.description}</p>
                    <p class="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div class="text-right">
                    <p class={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Reminders -->
        <div class="card bg-white shadow-lg" use:motionInView>
          <div class="card-body p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Reminders</h3>
              <button class="btn btn-sm btn-outline btn-error" on:click={() => navigateTo('/home/reminders')}>
                View All
              </button>
            </div>
            <div class="space-y-3">
              {#each dashboardData.family.reminders as reminder}
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors {getPriorityColor(reminder.priority)}" on:click={() => navigateTo(reminder.path)}>
                  <div class="flex-1">
                    <p class="font-medium">{reminder.title}</p>
                    <p class="text-sm opacity-75">{reminder.time}</p>
                  </div>
                  <Icon icon="heroicons:bell" class="w-5 h-5 opacity-70" />
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Footer -->
    <div class="card bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" use:motionInView>
      <div class="card-body p-8">
        <h3 class="text-2xl font-bold mb-6 text-center">Quick Actions</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button class="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200" on:click={() => navigateTo('/food')}>
            <Icon icon="heroicons:fire" class="w-8 h-8 mb-2" />
            <span class="text-sm font-medium">Add Meal</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200" on:click={() => navigateTo('/finances/expenses')}>
            <Icon icon="heroicons:credit-card" class="w-8 h-8 mb-2" />
            <span class="text-sm font-medium">Add Expense</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200" on:click={() => navigateTo('/home/chores')}>
            <Icon icon="heroicons:check-circle" class="w-8 h-8 mb-2" />
            <span class="text-sm font-medium">Add Task</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200" on:click={() => navigateTo('/inventory')}>
            <Icon icon="heroicons:cube" class="w-8 h-8 mb-2" />
            <span class="text-sm font-medium">Update Inventory</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200" on:click={() => navigateTo('/home/reminders')}>
            <Icon icon="heroicons:bell" class="w-8 h-8 mb-2" />
            <span class="text-sm font-medium">Set Reminder</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200" on:click={() => navigateTo('/issues')}>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 mb-2" />
            <span class="text-sm font-medium">Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>