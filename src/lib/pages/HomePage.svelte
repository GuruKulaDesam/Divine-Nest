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
  });
</script>

<div class="space-y-8">
  <!-- Page header with enhanced styling -->
  <div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50" use:motionInView={{ animation: "fadeInDown" }}>
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:chart-bar" class="w-full h-full text-primary" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:sparkles" class="w-full h-full text-secondary" />
    </div>

    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">Dashboard</h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">Welcome back! Here's what's happening with your projects today.</p>
      </div>
      <button class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden" use:motionHover>
        <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative flex items-center">
          <div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">
            <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
          </div>
          New Project
        </div>
      </button>
    </div>
  </div>

  <!-- Enhanced Stats grid with gradient backgrounds -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each stats as stat, index}
      <div bind:this={statsElements[index]} class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/50 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm" use:motionHover>
        <!-- Background icon -->
        <div class="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <Icon icon={stat.icon} class="w-full h-full text-primary" />
        </div>

        <!-- Glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

        <div class="relative flex items-center">
          <div class="flex-shrink-0">
            <div class="w-14 h-14 bg-gradient-to-br {iconColors[stat.icon] || 'from-primary/20 to-secondary/20'} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Icon icon={stat.icon} class="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/70 truncate">
              {stat.name}
            </p>
            <p class="text-3xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
              {stat.value}
            </p>
          </div>
        </div>
        <div class="mt-4 relative">
          <span class="inline-flex items-baseline px-3 py-1 rounded-full text-sm font-medium shadow-sm {stat.changeType === 'positive' ? 'bg-success/20 text-success border border-success/30' : 'bg-error/20 text-error border border-error/30'}">
            <Icon icon="heroicons:arrow-trending-up" class="-ml-1 mr-1 flex-shrink-0 self-center h-4 w-4 {stat.changeType === 'positive' ? 'text-success' : 'text-error'}" />
            {stat.change}
          </span>
          <span class="ml-2 text-sm text-base-content/60">from last month</span>
        </div>
      </div>
    {/each}
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

  <!-- Enhanced Quick Actions -->
  <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm" use:motionInView={{ animation: "fadeInUp" }}>
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-28 h-28 opacity-5">
      <Icon icon="heroicons:bolt" class="w-full h-full text-accent" />
    </div>

    <div class="relative mb-6">
      <h2 class="text-2xl font-bold text-base-content">Quick Actions</h2>
      <p class="text-base-content/60 mt-1">Access frequently used features</p>
    </div>

    <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each quickActions as action, index}
        <button bind:this={actionElements[index]} class="group relative overflow-hidden flex items-center p-5 bg-gradient-to-br from-base-200/50 to-base-300/30 border border-base-300/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm" use:motionHover>
          <!-- Background icon -->
          <div class="absolute top-2 right-2 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Icon icon={action.icon} class="w-full h-full text-primary" />
          </div>

          <!-- Glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <div class="relative flex items-center w-full">
            <div class="w-12 h-12 bg-gradient-to-br {iconColors[action.icon] || 'from-primary/20 to-secondary/20'} rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Icon icon={action.icon} class="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="text-left flex-1">
              <p class="text-sm font-semibold text-base-content group-hover:text-primary transition-colors duration-200">
                {action.name}
              </p>
              <p class="text-xs text-base-content/60 mt-1 leading-relaxed">
                {action.description}
              </p>
            </div>
            <Icon icon="heroicons:arrow-right" class="w-4 h-4 text-base-content/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- FamilyWall Quick Widgets -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
    <FamilyCalendar />
    <FamilyTodo />
    <FamilyMap />
    <FamilyNotes />
    <FamilyNotifications />
  </div>
</div>
