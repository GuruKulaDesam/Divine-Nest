<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { createDateRangePicker, melt } from '@melt-ui/svelte';
  import AnalyticsChart from '../components/AnalyticsChart.svelte';
  import { 
    exportAnalyticsData, 
    exportOverviewData, 
    exportTopProductsData, 
    exportRecentActivityData 
  } from '../utils/export.js';
  
  // Analytics data
  let analyticsData = {
    overview: {
      totalRevenue: '$125,430',
      totalUsers: '45,231',
      conversionRate: '3.24%',
      avgSessionDuration: '2m 34s'
    },
    trends: [
      { month: 'Jan', revenue: 12000, users: 8500, conversions: 320 },
      { month: 'Feb', revenue: 15000, users: 9200, conversions: 380 },
      { month: 'Mar', revenue: 18000, users: 10500, conversions: 420 },
      { month: 'Apr', revenue: 22000, users: 11800, conversions: 480 },
      { month: 'May', revenue: 25000, users: 13200, conversions: 520 },
      { month: 'Jun', revenue: 28000, users: 14500, conversions: 580 }
    ],
    topProducts: [
      { name: 'Premium Plan', sales: 1240, revenue: '$45,200' },
      { name: 'Basic Plan', sales: 890, revenue: '$22,300' },
      { name: 'Enterprise', sales: 320, revenue: '$58,900' }
    ],
    recentActivity: [
      { action: 'New user registered', time: '2 min ago', type: 'user' },
      { action: 'Payment received', time: '5 min ago', type: 'payment' },
      { action: 'Product purchased', time: '8 min ago', type: 'purchase' },
      { action: 'Support ticket', time: '12 min ago', type: 'support' }
    ]
  };
  
  let selectedPeriod = '30d';
  let selectedMetric = 'revenue';
  let showMetricSelect = false;
  let showExportMenu = false;
  
  const metricOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'users', label: 'Users' },
    { value: 'conversions', label: 'Conversions' },
    { value: 'engagement', label: 'Engagement' }
  ];
  
  // Melt UI Date Range Picker
  const {
    elements: {
      calendar,
      cell,
      content,
      field,
      grid,
      heading,
      label,
      nextButton,
      prevButton,
      startSegment,
      endSegment,
      trigger
    },
    states: { months, headingValue, weekdays, segmentContents },
    helpers: { isDateDisabled, isDateUnavailable }
  } = createDateRangePicker();
  
  // Subscribe to stores at the top level to avoid scoped subscription errors
  $: weekdaysArray = $weekdays;
  $: monthsArray = $months;
  $: headingValueText = $headingValue;
  $: segmentContentsData = $segmentContents;
  $: isDateDisabledFn = $isDateDisabled;
  $: isDateUnavailableFn = $isDateUnavailable;
  
  function toggleMetricSelect() {
    showMetricSelect = !showMetricSelect;
  }
  
  function selectMetric(value) {
    selectedMetric = value;
    showMetricSelect = false;
  }

  function toggleExportMenu() {
    showExportMenu = !showExportMenu;
  }

  function exportData(type) {
    switch (type) {
      case 'chart':
        exportAnalyticsData(analyticsData, selectedMetric, 'monthly');
        break;
      case 'overview':
        exportOverviewData(analyticsData.overview);
        break;
      case 'products':
        exportTopProductsData(analyticsData.topProducts);
        break;
      case 'activity':
        exportRecentActivityData(analyticsData.recentActivity);
        break;
      case 'all':
        // Export all data
        exportAnalyticsData(analyticsData, selectedMetric, 'monthly');
        setTimeout(() => exportOverviewData(analyticsData.overview), 100);
        setTimeout(() => exportTopProductsData(analyticsData.topProducts), 200);
        setTimeout(() => exportRecentActivityData(analyticsData.recentActivity), 300);
        break;
    }
    showExportMenu = false;
  }

  // Close menus when clicking outside
  function handleClickOutside(event) {
    if (showMetricSelect && !event.target.closest('.metric-selector')) {
      showMetricSelect = false;
    }
    if (showExportMenu && !event.target.closest('.export-menu')) {
      showExportMenu = false;
    }
  }
</script>

<div class="space-y-8">
  <!-- Page header -->
  <div class="border-b border-gray-200 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
        <p class="mt-2 text-sm text-gray-600">Track your business performance and insights.</p>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Date Range Picker using Melt UI -->
        <div class="relative">
          <span use:melt={$label} class="sr-only">Date Range</span>
          <div use:melt={$field} class="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 min-w-64">
            {#each segmentContentsData.start as seg}
              <div use:melt={$startSegment(seg.part)} class="px-1 text-sm text-gray-900">
                {seg.value}
              </div>
            {/each}
            <div aria-hidden="true" class="px-1 text-gray-400">-</div>
            {#each segmentContentsData.end as seg}
              <div use:melt={$endSegment(seg.part)} class="px-1 text-sm text-gray-900">
                {seg.value}
              </div>
            {/each}
            <div class="ml-2">
              <button 
                use:melt={$trigger}
                class="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                use:motionHover
              >
                <Icon icon="heroicons:calendar" class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div use:melt={$content} class="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div use:melt={$calendar} class="p-4">
              <header class="flex items-center justify-between mb-4">
                <button 
                  use:melt={$prevButton}
                  class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Icon icon="heroicons:chevron-left" class="w-4 h-4" />
                </button>
                <div use:melt={$heading} class="text-sm font-medium text-gray-900">
                  {headingValueText}
                </div>
                <button 
                  use:melt={$nextButton}
                  class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                </button>
              </header>
              
              {#each monthsArray as month}
                <table use:melt={$grid} class="w-full">
                  <thead aria-hidden="true">
                    <tr>
                      {#each weekdaysArray as day}
                        <th class="text-xs font-medium text-gray-500 py-2">
                          {day}
                        </th>
                      {/each}
                    </tr>
                  </thead>
                  <tbody>
                    {#each month.weeks as days}
                      <tr>
                        {#each days as date}
                          <td
                            role="gridcell"
                            aria-disabled={isDateDisabledFn(date) || isDateUnavailableFn(date)}
                            class="p-1"
                          >
                            <div 
                              use:melt={$cell(date, month.value)}
                              class="w-8 h-8 flex items-center justify-center text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {date.day}
                            </div>
                          </td>
                        {/each}
                      </tr>
                    {/each}
                  </tbody>
                </table>
              {/each}
            </div>
          </div>
        </div>
        
        <!-- Export button -->
        <div class="relative export-menu">
          <button 
            class="btn btn-primary"
            on:click={toggleExportMenu}
            use:motionHover
          >
            <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4 mr-2" />
            Export Report
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-1" />
          </button>
          
          {#if showExportMenu}
            <div class="absolute top-full mt-1 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-48">
              <div class="py-1">
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
                  on:click={() => exportData('chart')}
                >
                  <Icon icon="heroicons:chart-bar" class="w-4 h-4 mr-2 inline" />
                  Export Chart Data
                </button>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
                  on:click={() => exportData('overview')}
                >
                  <Icon icon="heroicons:presentation-chart-line" class="w-4 h-4 mr-2 inline" />
                  Export Overview
                </button>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
                  on:click={() => exportData('products')}
                >
                  <Icon icon="heroicons:cube" class="w-4 h-4 mr-2 inline" />
                  Export Top Products
                </button>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
                  on:click={() => exportData('activity')}
                >
                  <Icon icon="heroicons:clock" class="w-4 h-4 mr-2 inline" />
                  Export Recent Activity
                </button>
                <div class="border-t border-gray-200 my-1"></div>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-primary-600 font-medium"
                  on:click={() => exportData('all')}
                >
                  <Icon icon="heroicons:document-arrow-down" class="w-4 h-4 mr-2 inline" />
                  Export All Data
                </button>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Analytics Overview Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Revenue</p>
          <p class="text-2xl font-bold text-gray-900">{analyticsData.overview.totalRevenue}</p>
          <p class="text-sm text-green-600">+12.5% from last month</p>
        </div>
        <div class="p-3 bg-green-100 rounded-lg">
          <Icon icon="heroicons:currency-dollar" class="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Users</p>
          <p class="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers}</p>
          <p class="text-sm text-green-600">+8.2% from last month</p>
        </div>
        <div class="p-3 bg-blue-100 rounded-lg">
          <Icon icon="heroicons:users" class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Conversion Rate</p>
          <p class="text-2xl font-bold text-gray-900">{analyticsData.overview.conversionRate}</p>
          <p class="text-sm text-green-600">+2.1% from last month</p>
        </div>
        <div class="p-3 bg-purple-100 rounded-lg">
          <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Avg Session</p>
          <p class="text-2xl font-bold text-gray-900">{analyticsData.overview.avgSessionDuration}</p>
          <p class="text-sm text-green-600">+15.3% from last month</p>
        </div>
        <div class="p-3 bg-orange-100 rounded-lg">
          <Icon icon="heroicons:clock" class="w-6 h-6 text-orange-600" />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Charts and Data Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Main Chart -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Revenue Trend Chart -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Revenue Trend</h2>
          <!-- Metric selector -->
          <div class="relative metric-selector">
            <button 
              class="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              on:click={toggleMetricSelect}
            >
              {metricOptions.find(opt => opt.value === selectedMetric)?.label || 'Revenue'}
              <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-1 inline" />
            </button>
            {#if showMetricSelect}
              <div class="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-32">
                {#each metricOptions as item}
                  <button 
                    class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 {item.value === selectedMetric ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}"
                    on:click={() => selectMetric(item.value)}
                  >
                    {item.label}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Chart placeholder -->
        <div class="h-64">
          <AnalyticsChart 
            type="line" 
            metric={selectedMetric} 
            period="monthly" 
            height="h-64"
          />
        </div>
      </div>
      
      <!-- Top Products -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Top Products</h2>
        <div class="space-y-4">
          {#each analyticsData.topProducts as product, index}
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg" use:motionHover>
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <span class="text-sm font-medium text-primary-700">#{index + 1}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{product.name}</p>
                  <p class="text-sm text-gray-500">{product.sales} sales</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">{product.revenue}</p>
                <p class="text-sm text-green-600">+12.5%</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div class="space-y-4">
          {#each analyticsData.recentActivity as activity}
            <div class="flex items-start space-x-3" use:motionHover>
              <div class="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{activity.action}</p>
                <p class="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Quick Stats -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Page Views</span>
            <span class="text-sm font-medium text-gray-900">45.2K</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Bounce Rate</span>
            <span class="text-sm font-medium text-gray-900">32.1%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Avg Order Value</span>
            <span class="text-sm font-medium text-gray-900">$89.50</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Customer Lifetime Value</span>
            <span class="text-sm font-medium text-gray-900">$1,245</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<svelte:window on:click={handleClickOutside} /> 