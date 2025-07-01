<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { generateUserAvatar, generateFallbackAvatar } from '../utils/avatar.js';
  import RevenueChart from '../components/RevenueChart.svelte';
  import { stats, users, quickActions } from '../data/dashboard.js';
  import { motionInView, staggerAnimate, motionHover } from '../utils/motion.js';
  import { sampleData } from '../data/charts.js';
  
  let chart;
  let statsElements = [];
  let activityElements = [];
  let actionElements = [];
  
  // Revenue filter period: 'weekly', 'monthly', or 'yearly'
  let period = 'monthly';
  // Build data for RevenueChart based on selected period
  $: revenueOverviewData = {
    labels: sampleData[period].labels,
    datasets: [
      { ...sampleData[period], data: sampleData[period].revenue, label: 'Revenue', backgroundColor: 'rgba(59, 130, 246, 0.8)', borderColor: 'rgb(59, 130, 246)' },
      { ...sampleData[period], data: sampleData[period].sales, label: 'Sales', backgroundColor: 'rgba(34, 197, 94, 0.8)', borderColor: 'rgb(34, 197, 94)' }
    ]
  };
  
  onMount(() => {
    // Animate stats cards with stagger
    if (statsElements.length > 0) {
      staggerAnimate(statsElements, 'fadeInUp', { delay: 0.1 });
    }
    
    // Animate activity items
    if (activityElements.length > 0) {
      staggerAnimate(activityElements, 'fadeInRight', { delay: 0.1 });
    }
    
    // Animate quick action buttons
    if (actionElements.length > 0) {
      staggerAnimate(actionElements, 'scaleIn', { delay: 0.1 });
    }
  });
</script>

<div class="space-y-8">
  <!-- Page header -->
  <div class="border-b border-gray-200 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-sm text-gray-600">Welcome back! Here's what's happening with your projects today.</p>
      </div>
      <button class="btn btn-primary" use:motionHover>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        New Project
      </button>
    </div>
  </div>
  
  <!-- Stats grid -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each stats as stat, index}
      <div 
        bind:this={statsElements[index]}
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        use:motionHover
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon icon={stat.icon} class="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            <p class="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium {stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            <Icon icon="heroicons:arrow-trending-up" class="-ml-1 mr-0.5 flex-shrink-0 self-center h-4 w-4 {stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}" />
            {stat.change}
          </span>
          <span class="ml-2 text-sm text-gray-500">from last month</span>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Charts and activity section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Revenue Chart -->
    <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-900">Revenue Overview</h2>
        <div class="flex items-center space-x-2">
          <button on:click={() => period = 'weekly'} class="px-3 py-1 text-sm rounded-lg transition-colors duration-200 {period === 'weekly' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}" use:motionHover>
            Weekly
          </button>
          <button on:click={() => period = 'monthly'} class="px-3 py-1 text-sm rounded-lg transition-colors duration-200 {period === 'monthly' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}" use:motionHover>
            Monthly
          </button>
          <button on:click={() => period = 'yearly'} class="px-3 py-1 text-sm rounded-lg transition-colors duration-200 {period === 'yearly' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}" use:motionHover>
            Yearly
          </button>
        </div>
      </div>
      <RevenueChart data={revenueOverviewData} />
    </div>
    
    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
      <h2 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div class="max-h-80 overflow-y-auto divide-y divide-gray-200">
        {#each users.recent as activity, index}
          <div
            bind:this={activityElements[index]}
            use:motionHover
            class="flex items-start justify-between p-4 mx-2 transition-colors duration-200 hover:bg-gray-50"
          >
            <div class="flex items-start space-x-3">
              <img
                class="w-8 h-8 rounded-full object-cover bg-gray-100"
                src={generateUserAvatar(activity, 'default')}
                alt={activity.name}
                on:error={(e) => {
                  const target = e.target;
                  if (target instanceof HTMLImageElement) {
                    target.src = generateFallbackAvatar(activity);
                  }
                }}
              />
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{activity.name}</p>
                <p class="text-sm text-gray-500">
                  {activity.action} <span class="font-semibold text-gray-900">{activity.item}</span>
                </p>
              </div>
            </div>
            <p class="text-xs text-gray-400 whitespace-nowrap">{activity.time}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Quick Actions -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInUp' }}>
    <h2 class="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each quickActions as action, index}
        <button 
          bind:this={actionElements[index]}
          class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
          use:motionHover
        >
          <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
            <Icon icon={action.icon} class="w-5 h-5 text-primary-600" />
          </div>
          <div class="text-left">
            <p class="text-sm font-medium text-gray-900">{action.name}</p>
            <p class="text-xs text-gray-500">{action.description}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>  