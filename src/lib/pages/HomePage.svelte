<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { generateUserAvatar, generateFallbackAvatar } from "../utils/avatar.js";
  import RevenueChart from "../components/RevenueChart.svelte";
  import { stats, users, quickActions } from "../data/dashboard.js";
  import { motionInView, staggerAnimate, motionHover } from "../utils/motion.js";
  import { sampleData } from "../data/charts.js";
  import FamilyCalendar from "../components/FamilyCalendar.svelte";
  import FamilyTodo from "../components/FamilyTodo.svelte";
  import FamilyMap from "../components/FamilyMap.svelte";
  import FamilyNotes from "../components/FamilyNotes.svelte";
  import FamilyNotifications from "../components/FamilyNotifications.svelte";

  let chart;
  let statsElements = [];
  let activityElements = [];
  let actionElements = [];

  // Revenue filter period: 'weekly', 'monthly', or 'yearly'
  let period = "monthly";

  // Home Management Dashboard Data
  const homeManagementStats = {
    members: {
      total: 6,
      needsAttention: 1, // Paati's medication reminder
      healthAlerts: 1,
      moodChecksDue: 2,
      status: "amber",
    },
    inventory: {
      total: 125,
      lowStock: 8,
      expired: 2,
      needsReorder: 10,
      status: "red",
    },
    vehicles: {
      total: 4,
      serviceDue: 1,
      documentExpiry: 1,
      fuelLow: 2,
      status: "amber",
    },
    expenses: {
      monthlyBudget: 22050,
      actualSpend: 19850,
      savings: 2200,
      overduePayments: 2,
      status: "green",
    },
    property: {
      totalProperties: 1,
      taxesDue: 2,
      maintenanceDue: 1,
      documentsExpiring: 0,
      status: "amber",
    },
  };

  // Today's Priority Tasks
  const priorityTasks = [
    { id: 1, task: "Paati's BP medication reminder", category: "health", priority: "high", module: "members" },
    { id: 2, task: "Reorder rice and dal (low stock)", category: "inventory", priority: "high", module: "inventory" },
    { id: 3, task: "Pay water tax (due Oct 15)", category: "property", priority: "high", module: "property" },
    { id: 4, task: "Bike service due (Hero Splendor)", category: "vehicle", priority: "medium", module: "vehicles" },
    { id: 5, task: "Akka's mood check-in pending", category: "wellness", priority: "medium", module: "members" },
    { id: 6, task: "Diwali shopping budget planning", category: "expenses", priority: "medium", module: "expenses" },
  ];

  // Quick Insights for Housewife Dashboard
  const housewifeDashboard = {
    kitchenStatus: {
      criticalItems: ["Rice (2kg left)", "Dal (1kg left)", "Cooking oil (500ml left)"],
      expiringItems: ["Milk (expires today)", "Bread (expires tomorrow)"],
      status: "needs_attention",
    },
    familyWellness: {
      medicationsDue: ["Paati - BP tablet at 7 AM", "Amma - Thyroid tablet at 6 AM"],
      appointmentsPending: ["Thambi - Dental checkup this week"],
      moodChecks: ["Akka seems stressed about exams", "Thatha enjoyed yesterday's temple visit"],
      status: "good",
    },
    householdTasks: {
      cleaningDue: ["Deep clean pooja room before Diwali", "Pest control due this month"],
      maintenancePending: ["Kitchen tap needs fixing", "AC servicing needed"],
      festivalPrep: ["Diwali decoration shopping", "Sweet preparation planning"],
      status: "planned",
    },
    financialOverview: {
      monthlyBudgetUsed: "90%",
      savingsThisMonth: "₹2,200",
      upcomingBills: ["Electricity bill (₹1,200)", "Mobile recharge (₹500)"],
      status: "healthy",
    },
  };

  function getStatusColor(status) {
    switch (status) {
      case "green":
      case "good":
      case "healthy":
        return "text-green-600 bg-green-100";
      case "amber":
      case "needs_attention":
      case "planned":
        return "text-orange-600 bg-orange-100";
      case "red":
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function getModuleIcon(module) {
    const icons = {
      members: "heroicons:users",
      inventory: "heroicons:archive-box",
      vehicles: "heroicons:truck",
      expenses: "heroicons:banknotes",
      property: "heroicons:building-office",
    };
    return icons[module] || "heroicons:home";
  }

  // Icon background colors for different stat types
  const iconColors = {
    "heroicons:currency-dollar": "from-emerald-500 to-teal-600",
    "heroicons:users": "from-blue-500 to-indigo-600",
    "heroicons:shopping-cart": "from-purple-500 to-pink-600",
    "heroicons:chart-bar": "from-orange-500 to-red-600",
    "heroicons:trending-up": "from-green-500 to-emerald-600",
    "heroicons:fire": "from-red-500 to-pink-600",
    "heroicons:star": "from-yellow-500 to-orange-600",
    "heroicons:heart": "from-pink-500 to-rose-600",
    "heroicons:plus": "from-blue-500 to-indigo-600",
    "heroicons:document-text": "from-purple-500 to-pink-600",
    "heroicons:cog": "from-gray-500 to-slate-600",
    "heroicons:bell": "from-yellow-500 to-orange-600",
    "heroicons:envelope": "from-green-500 to-emerald-600",
    "heroicons:calendar": "from-red-500 to-pink-600",
    "heroicons:user-group": "from-indigo-500 to-purple-600",
    "heroicons:chart-pie": "from-teal-500 to-cyan-600",
    "heroicons:bolt": "from-yellow-400 to-orange-500",
    "mdi:cube-outline": "from-purple-500 to-pink-600",
    "heroicons:archive-box": "from-amber-500 to-orange-600",
    "heroicons:truck": "from-cyan-500 to-blue-600",
    "heroicons:banknotes": "from-green-500 to-emerald-600",
    "heroicons:building-office": "from-gray-500 to-slate-600",
  };

  // Build data for RevenueChart based on selected period
  $: revenueOverviewData = {
    labels: sampleData[period].labels,
    datasets: [
      {
        ...sampleData[period],
        data: sampleData[period].revenue,
        label: "Revenue",
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
      },
      {
        ...sampleData[period],
        data: sampleData[period].sales,
        label: "Sales",
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgb(34, 197, 94)",
      },
    ],
  };

  onMount(() => {
    // Animate stats cards with stagger
    if (statsElements.length > 0) {
      staggerAnimate(statsElements, "fadeInUp", { delay: 0.1 });
    }

    // Animate activity items
    if (activityElements.length > 0) {
      staggerAnimate(activityElements, "fadeInRight", { delay: 0.1 });
    }

    // Animate quick action buttons
    if (actionElements.length > 0) {
      staggerAnimate(actionElements, "scaleIn", { delay: 0.1 });
    }

    document.title = "Home Dashboard - Family Management";
  });
</script>

<div class="space-y-8">
  <!-- Page header with enhanced styling -->
  <div class="relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:home" class="w-full h-full text-blue-600" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:sparkles" class="w-full h-full text-purple-600" />
    </div>

    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">गृह प्रबन्धन | Home Management Dashboard</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-md">Complete overview of family, household, and daily management needs. Today's priorities at a glance.</p>
      </div>
      <div class="flex space-x-2">
        <button class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Icon icon="heroicons:plus" class="w-5 h-5 mr-2 inline" />
          Quick Add
        </button>
      </div>
    </div>
  </div>

  <!-- Home Management Stats Grid -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
    <!-- Family Members -->
    <div class="group relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-md border border-blue-300/50 dark:border-blue-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon icon="heroicons:users" class="w-full h-full text-blue-600" />
      </div>
      <div class="relative flex items-center">
        <div class="flex-shrink-0">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Icon icon="heroicons:users" class="w-7 h-7 text-white" />
          </div>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">{homeManagementStats.members.total}</p>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(homeManagementStats.members.status)}">
              {homeManagementStats.members.needsAttention} Alert
            </span>
          </div>
          <p class="text-sm font-medium text-blue-700 dark:text-blue-300">Family Members</p>
          <p class="text-xs text-blue-600 dark:text-blue-400">{homeManagementStats.members.moodChecksDue} mood checks due</p>
        </div>
      </div>
    </div>

    <!-- Inventory -->
    <div class="group relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-800/20 rounded-2xl shadow-md border border-amber-300/50 dark:border-amber-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon icon="heroicons:archive-box" class="w-full h-full text-amber-600" />
      </div>
      <div class="relative flex items-center">
        <div class="flex-shrink-0">
          <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Icon icon="heroicons:archive-box" class="w-7 h-7 text-white" />
          </div>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-amber-900 dark:text-amber-100">{homeManagementStats.inventory.total}</p>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(homeManagementStats.inventory.status)}">
              {homeManagementStats.inventory.lowStock} Low
            </span>
          </div>
          <p class="text-sm font-medium text-amber-700 dark:text-amber-300">Inventory Items</p>
          <p class="text-xs text-amber-600 dark:text-amber-400">{homeManagementStats.inventory.needsReorder} need reorder</p>
        </div>
      </div>
    </div>

    <!-- Vehicles -->
    <div class="group relative overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/20 dark:to-blue-800/20 rounded-2xl shadow-md border border-cyan-300/50 dark:border-cyan-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon icon="heroicons:truck" class="w-full h-full text-cyan-600" />
      </div>
      <div class="relative flex items-center">
        <div class="flex-shrink-0">
          <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Icon icon="heroicons:truck" class="w-7 h-7 text-white" />
          </div>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-cyan-900 dark:text-cyan-100">{homeManagementStats.vehicles.total}</p>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(homeManagementStats.vehicles.status)}">
              {homeManagementStats.vehicles.serviceDue} Service
            </span>
          </div>
          <p class="text-sm font-medium text-cyan-700 dark:text-cyan-300">Vehicles</p>
          <p class="text-xs text-cyan-600 dark:text-cyan-400">{homeManagementStats.vehicles.fuelLow} need fuel</p>
        </div>
      </div>
    </div>

    <!-- Expenses -->
    <div class="group relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-800/20 rounded-2xl shadow-md border border-green-300/50 dark:border-green-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon icon="heroicons:banknotes" class="w-full h-full text-green-600" />
      </div>
      <div class="relative flex items-center">
        <div class="flex-shrink-0">
          <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Icon icon="heroicons:banknotes" class="w-7 h-7 text-white" />
          </div>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-green-900 dark:text-green-100">₹{(homeManagementStats.expenses.savings / 1000).toFixed(1)}k</p>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(homeManagementStats.expenses.status)}"> Saved </span>
          </div>
          <p class="text-sm font-medium text-green-700 dark:text-green-300">This Month</p>
          <p class="text-xs text-green-600 dark:text-green-400">{homeManagementStats.expenses.overduePayments} bills due</p>
        </div>
      </div>
    </div>

    <!-- Property -->
    <div class="group relative overflow-hidden bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/20 dark:to-slate-700/20 rounded-2xl shadow-md border border-gray-300/50 dark:border-gray-600/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon icon="heroicons:building-office" class="w-full h-full text-gray-600" />
      </div>
      <div class="relative flex items-center">
        <div class="flex-shrink-0">
          <div class="w-14 h-14 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
            <Icon icon="heroicons:building-office" class="w-7 h-7 text-white" />
          </div>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">{homeManagementStats.property.totalProperties}</p>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(homeManagementStats.property.status)}">
              {homeManagementStats.property.taxesDue} Taxes
            </span>
          </div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Property</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">{homeManagementStats.property.maintenanceDue} maintenance due</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Today's Priority Tasks -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Priority Tasks -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 mr-2 text-red-500" />
          Today's Priorities
        </h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">{priorityTasks.length} tasks</span>
      </div>
      <div class="space-y-4">
        {#each priorityTasks as task}
          <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br {iconColors[getModuleIcon(task.module)]} rounded-lg flex items-center justify-center">
                  <Icon icon={getModuleIcon(task.module)} class="w-4 h-4 text-white" />
                </div>
                <span class="font-medium text-gray-900 dark:text-white">{task.task}</span>
              </div>
              <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(task.priority)}">
                {task.priority}
              </span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400 capitalize">{task.category}</span>
              <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium"> Take Action → </button>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Housewife Dashboard -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Icon icon="heroicons:heart" class="w-6 h-6 mr-2 text-pink-500" />
          House Status Overview
        </h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">Quick View</span>
      </div>

      <div class="space-y-4">
        <!-- Kitchen Status -->
        <div class="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-orange-800 dark:text-orange-200 flex items-center">
              <Icon icon="heroicons:fire" class="w-4 h-4 mr-2" />
              Kitchen & Pantry
            </h4>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(housewifeDashboard.kitchenStatus.status)}"> Needs Attention </span>
          </div>
          <div class="space-y-1 text-sm text-orange-700 dark:text-orange-300">
            {#each housewifeDashboard.kitchenStatus.criticalItems.slice(0, 2) as item}
              <div class="flex items-center">
                <Icon icon="heroicons:exclamation-circle" class="w-3 h-3 mr-2 text-red-500" />
                {item}
              </div>
            {/each}
          </div>
        </div>

        <!-- Family Wellness -->
        <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-green-800 dark:text-green-200 flex items-center">
              <Icon icon="heroicons:heart" class="w-4 h-4 mr-2" />
              Family Wellness
            </h4>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(housewifeDashboard.familyWellness.status)}"> Good </span>
          </div>
          <div class="space-y-1 text-sm text-green-700 dark:text-green-300">
            {#each housewifeDashboard.familyWellness.medicationsDue.slice(0, 2) as medication}
              <div class="flex items-center">
                <Icon icon="heroicons:clock" class="w-3 h-3 mr-2 text-orange-500" />
                {medication}
              </div>
            {/each}
          </div>
        </div>

        <!-- Household Tasks -->
        <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-blue-800 dark:text-blue-200 flex items-center">
              <Icon icon="heroicons:wrench-screwdriver" class="w-4 h-4 mr-2" />
              Household Tasks
            </h4>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(housewifeDashboard.householdTasks.status)}"> Planned </span>
          </div>
          <div class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
            {#each housewifeDashboard.householdTasks.cleaningDue.slice(0, 2) as task}
              <div class="flex items-center">
                <Icon icon="heroicons:calendar" class="w-3 h-3 mr-2 text-blue-500" />
                {task}
              </div>
            {/each}
          </div>
        </div>

        <!-- Financial Overview -->
        <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-purple-800 dark:text-purple-200 flex items-center">
              <Icon icon="heroicons:banknotes" class="w-4 h-4 mr-2" />
              Financial Health
            </h4>
            <span class="px-2 py-1 text-xs rounded-full {getStatusColor(housewifeDashboard.financialOverview.status)}"> Healthy </span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm text-purple-700 dark:text-purple-300">
            <div>Budget Used: {housewifeDashboard.financialOverview.monthlyBudgetUsed}</div>
            <div>Savings: {housewifeDashboard.financialOverview.savingsThisMonth}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <Icon icon="heroicons:bolt" class="w-6 h-6 mr-2 text-yellow-500" />
      Quick Actions
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <button class="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:scale-105 transition-transform">
        <Icon icon="heroicons:users" class="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Check Family</span>
      </button>
      <button class="p-4 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-800/20 rounded-xl hover:scale-105 transition-transform">
        <Icon icon="heroicons:archive-box" class="w-8 h-8 mx-auto mb-2 text-amber-600" />
        <span class="text-sm font-medium text-amber-700 dark:text-amber-300">Add Inventory</span>
      </button>
      <button class="p-4 bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/20 dark:to-blue-800/20 rounded-xl hover:scale-105 transition-transform">
        <Icon icon="heroicons:truck" class="w-8 h-8 mx-auto mb-2 text-cyan-600" />
        <span class="text-sm font-medium text-cyan-700 dark:text-cyan-300">Vehicle Check</span>
      </button>
      <button class="p-4 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl hover:scale-105 transition-transform">
        <Icon icon="heroicons:banknotes" class="w-8 h-8 mx-auto mb-2 text-green-600" />
        <span class="text-sm font-medium text-green-700 dark:text-green-300">Track Expense</span>
      </button>
      <button class="p-4 bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/20 dark:to-slate-700/20 rounded-xl hover:scale-105 transition-transform">
        <Icon icon="heroicons:building-office" class="w-8 h-8 mx-auto mb-2 text-gray-600" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Property Tax</span>
      </button>
      <button class="p-4 bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl hover:scale-105 transition-transform">
        <Icon icon="heroicons:calendar" class="w-8 h-8 mx-auto mb-2 text-purple-600" />
        <span class="text-sm font-medium text-purple-700 dark:text-purple-300">Set Reminder</span>
      </button>
    </div>
  </div>

  <!-- Enhanced Charts and activity section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Enhanced Revenue Chart -->
    <div class="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm" use:motionInView={{ animation: "fadeInLeft" }}>
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-24 h-24 opacity-5">
        <Icon icon="heroicons:chart-pie" class="w-full h-full text-primary" />
      </div>

      <div class="relative flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-base-content">Revenue Overview</h2>
          <p class="text-base-content/60 mt-1">Track your financial performance</p>
        </div>
        <div class="flex items-center space-x-1 bg-base-200/50 rounded-xl p-1">
          <button on:click={() => (period = "weekly")} class="px-4 py-2 text-sm rounded-lg transition-all duration-200 {period === 'weekly' ? 'bg-blue-500 text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300'}" use:motionHover> Weekly </button>
          <button on:click={() => (period = "monthly")} class="px-4 py-2 text-sm rounded-lg transition-all duration-200 {period === 'monthly' ? 'bg-green-500 text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300'}" use:motionHover> Monthly </button>
          <button on:click={() => (period = "yearly")} class="px-4 py-2 text-sm rounded-lg transition-all duration-200 {period === 'yearly' ? 'bg-purple-500 text-white shadow-lg' : 'text-base-content/70 hover:bg-base-300'}" use:motionHover> Yearly </button>
        </div>
      </div>
      <RevenueChart data={revenueOverviewData} />
    </div>

    <!-- Enhanced Recent Activity -->
    <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm" use:motionInView={{ animation: "fadeInRight" }}>
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-20 h-20 opacity-5">
        <Icon icon="heroicons:bell" class="w-full h-full text-secondary" />
      </div>

      <div class="relative mb-5">
        <h2 class="text-2xl font-bold text-base-content">Recent Activity</h2>
        <p class="text-base-content/60 mt-1">Latest updates from your team</p>
      </div>

      <div class="relative max-h-80 overflow-y-auto divide-y divide-base-300/50">
        {#each users.recent as activity, index}
          <div bind:this={activityElements[index]} use:motionHover class="flex items-start justify-between p-4 mx-2 transition-all duration-200 hover:bg-base-200/50 hover:rounded-xl group">
            <div class="flex items-start space-x-4">
              <div class="relative">
                <img
                  class="w-10 h-10 rounded-full object-cover bg-base-200 shadow-md group-hover:shadow-lg transition-shadow duration-200"
                  src={generateUserAvatar(activity, "default")}
                  alt={activity.name}
                  on:error={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                      e.target.src = generateFallbackAvatar(activity);
                    }
                  }}
                />
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors duration-200">
                  {activity.name}
                </p>
                <p class="text-sm text-base-content/70 leading-relaxed">
                  {activity.action}
                  <span class="font-medium text-base-content">{activity.item}</span>
                </p>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <p class="text-xs text-base-content/50 whitespace-nowrap">
                {activity.time}
              </p>
              <div class="w-2 h-2 bg-primary/30 rounded-full mt-2 group-hover:bg-primary transition-colors duration-200"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Enhanced Family Widgets for Detailed Management -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Icon icon="heroicons:calendar" class="w-5 h-5 mr-2 text-blue-500" />
        Family Calendar
      </h3>
      <FamilyCalendar />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Icon icon="heroicons:clipboard-document-list" class="w-5 h-5 mr-2 text-green-500" />
        Family Tasks
      </h3>
      <FamilyTodo />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Icon icon="heroicons:map-pin" class="w-5 h-5 mr-2 text-red-500" />
        Family Locations
      </h3>
      <FamilyMap />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Icon icon="heroicons:document-text" class="w-5 h-5 mr-2 text-purple-500" />
        Family Notes
      </h3>
      <FamilyNotes />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Icon icon="heroicons:bell" class="w-5 h-5 mr-2 text-yellow-500" />
        Family Notifications
      </h3>
      <FamilyNotifications />
    </div>
  </div>
</div>
