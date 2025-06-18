<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';
  import { generateUserAvatar, generateFallbackAvatar } from '../utils/avatar.js';
  import RevenueChart from './RevenueChart.svelte';
  import { stats, chartData, users, quickActions } from '../data/dashboard.js';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { dashboardData } from '../data/dashboard.js';

  // Sample recent orders data
  const recentOrders = [
    { id: '1234', customer: 'John Doe', amount: '299.99', date: '2 hours ago' },
    { id: '1235', customer: 'Jane Smith', amount: '199.99', date: '4 hours ago' },
    { id: '1236', customer: 'Mike Johnson', amount: '399.99', date: '6 hours ago' },
    { id: '1237', customer: 'Sarah Wilson', amount: '149.99', date: '8 hours ago' },
    { id: '1238', customer: 'David Brown', amount: '599.99', date: '10 hours ago' }
  ];
</script>

<div class="space-y-8">
  <!-- Welcome Section -->
  <div class="border-b border-base-300 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <h1 class="text-3xl font-bold text-base-content">{$_('dashboard.welcome')}</h1>
    <p class="mt-2 text-base-content/60">{$_('dashboard.overview')}</p>
  </div>
  
  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" use:motionInView={{ animation: 'fadeInUp' }}>
    <!-- Total Revenue -->
    <div class="card p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_('dashboard.total_revenue')}</p>
          <p class="text-2xl font-bold text-base-content">$45,231.89</p>
          <p class="text-sm text-success">+20.1% from last month</p>
        </div>
        <div class="p-3 bg-success/10 rounded-lg">
          <Icon icon="heroicons:currency-dollar" class="w-6 h-6 text-success" />
        </div>
      </div>
    </div>

    <!-- Total Users -->
    <div class="card p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_('dashboard.total_users')}</p>
          <p class="text-2xl font-bold text-base-content">2,350</p>
          <p class="text-sm text-success">+180.1% from last month</p>
        </div>
        <div class="p-3 bg-primary/10 rounded-lg">
          <Icon icon="heroicons:users" class="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>

    <!-- Total Orders -->
    <div class="card p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_('dashboard.total_orders')}</p>
          <p class="text-2xl font-bold text-base-content">12,234</p>
          <p class="text-sm text-success">+19% from last month</p>
        </div>
        <div class="p-3 bg-warning/10 rounded-lg">
          <Icon icon="heroicons:shopping-cart" class="w-6 h-6 text-warning" />
        </div>
      </div>
    </div>

    <!-- Total Products -->
    <div class="card p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_('dashboard.total_products')}</p>
          <p class="text-2xl font-bold text-base-content">573</p>
          <p class="text-sm text-success">+201 from last month</p>
        </div>
        <div class="p-3 bg-info/10 rounded-lg">
          <Icon icon="heroicons:cube" class="w-6 h-6 text-info" />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Charts Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Revenue Chart -->
    <div class="card p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-base-content">{$_('analytics.revenue')} {$_('analytics.overview')}</h2>
        <button class="text-sm text-primary hover:text-primary-focus transition-colors">
          {$_('common.more')}
        </button>
      </div>
      <div class="h-64 bg-base-200 rounded-lg flex items-center justify-center">
        <div class="text-center">
          <Icon icon="heroicons:chart-bar" class="w-12 h-12 text-base-content/40 mx-auto mb-2" />
          <p class="text-base-content/60">Chart will be displayed here</p>
        </div>
      </div>
    </div>
    
    <!-- Recent Orders -->
    <div class="card p-6" use:motionInView={{ animation: 'fadeInRight' }}>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-base-content">{$_('analytics.orders')}</h2>
        <button class="text-sm text-primary hover:text-primary-focus transition-colors">
          {$_('common.more')}
        </button>
      </div>
      <div class="space-y-4">
        {#each recentOrders as order}
          <div class="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-200" use:motionHover>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon icon="heroicons:shopping-bag" class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium text-base-content">#{order.id}</p>
                <p class="text-sm text-base-content/60">{order.customer}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-base-content">${order.amount}</p>
              <p class="text-sm text-base-content/60">{order.date}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Quick actions -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">{$_('common.quick_actions')}</h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each quickActions as action}
        <button class="btn {action.action === 'primary' ? 'btn-primary' : 'btn-secondary'}">
          <Icon icon={action.icon} class="w-5 h-5 mr-2" />
          {action.name}
        </button>
      {/each}
    </div>
  </div>
</div> 