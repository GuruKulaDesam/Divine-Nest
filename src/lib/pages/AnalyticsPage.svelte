<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { createDateRangePicker, melt } from '@melt-ui/svelte';
  import AnalyticsChart from '../components/AnalyticsChart.svelte';
  import { _ } from 'svelte-i18n';
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
      { name: $_("analytics.premium_plan"), sales: 1240, revenue: '$45,200' },
      { name: $_("analytics.basic_plan"), sales: 890, revenue: '$22,300' },
      { name: $_("analytics.enterprise"), sales: 320, revenue: '$58,900' }
    ],
    recentActivity: [
      { action: $_("analytics.new_user_registered"), time: '2 ' + $_("analytics.min_ago"), type: 'user' },
      { action: $_("analytics.payment_received"), time: '5 ' + $_("analytics.min_ago"), type: 'payment' },
      { action: $_("analytics.product_purchased"), time: '8 ' + $_("analytics.min_ago"), type: 'purchase' },
      { action: $_("analytics.support_ticket"), time: '12 ' + $_("analytics.min_ago"), type: 'support' }
    ]
  };
  
  let selectedPeriod = '30d';
  let selectedMetric = 'revenue';
  let showMetricSelect = false;
  let showExportMenu = false;
  
  const metricOptions = [
    { value: 'revenue', label: $_("analytics.revenue") },
    { value: 'users', label: $_("analytics.users") },
    { value: 'conversions', label: $_("analytics.conversions") },
    { value: 'engagement', label: $_("analytics.engagement") }
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
  <div class="border-b border-base-300 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content">{$_("analytics.title")}</h1>
        <p class="mt-2 text-sm text-base-content/60">{$_("analytics.description")}</p>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Date Range Picker using Melt UI -->
        <div class="relative">
          <span use:melt={$label} class="sr-only">Date Range</span>
          <div use:melt={$field} class="flex items-center bg-base-100 border border-base-300 rounded-lg px-3 py-2 min-w-64">
            {#each segmentContentsData.start as seg}
              <div use:melt={$startSegment(seg.part)} class="px-1 text-sm text-base-content">
                {seg.value}
              </div>
            {/each}
            <div aria-hidden="true" class="px-1 text-base-content/40">-</div>
            {#each segmentContentsData.end as seg}
              <div use:melt={$endSegment(seg.part)} class="px-1 text-sm text-base-content">
                {seg.value}
              </div>
            {/each}
            <div class="ml-2">
              <button 
                use:melt={$trigger}
                class="p-1 text-base-content/40 hover:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                use:motionHover
              >
                <Icon icon="heroicons:calendar" class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div use:melt={$content} class="absolute top-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
            <div use:melt={$calendar} class="p-4">
              <header class="flex items-center justify-between mb-4">
                <button 
                  use:melt={$prevButton}
                  class="p-2 text-base-content/40 hover:text-base-content/60 hover:bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Icon icon="heroicons:chevron-left" class="w-4 h-4" />
                </button>
                <div use:melt={$heading} class="text-sm font-medium text-base-content">
                  {headingValueText}
                </div>
                <button 
                  use:melt={$nextButton}
                  class="p-2 text-base-content/40 hover:text-base-content/60 hover:bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                </button>
              </header>
              
              {#each monthsArray as month}
                <table use:melt={$grid} class="w-full">
                  <thead aria-hidden="true">
                    <tr>
                      {#each weekdaysArray as day}
                        <th class="text-xs font-medium text-base-content/60 py-2">
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
                              class="w-8 h-8 flex items-center justify-center text-sm rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
            class="btn btn-primary shadow-lg hover:text-primary-content group"
            on:click={toggleExportMenu}
            use:motionHover
          >
            <div class="p-1 rounded bg-primary-content/10 group-hover:bg-primary-content/20">
              <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4 mr-2" />
            </div>
            {$_("analytics.export_report")}
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-1" />
          </button>
          
          {#if showExportMenu}
            <div class="absolute top-full mt-1 right-0 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 min-w-48">
              <div class="py-1">
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-base-200 text-base-content/70 group"
                  on:click={() => exportData('chart')}
                >
                  <div class="p-1 rounded bg-base-200 group-hover:bg-base-300 inline-block mr-2">
                    <Icon icon="heroicons:chart-bar" class="w-4 h-4" />
                  </div>
                  {$_("analytics.export_chart_data")}
                </button>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-base-200 text-base-content/70 group"
                  on:click={() => exportData('overview')}
                >
                  <div class="p-1 rounded bg-base-200 group-hover:bg-base-300 inline-block mr-2">
                    <Icon icon="heroicons:presentation-chart-line" class="w-4 h-4" />
                  </div>
                  {$_("analytics.export_overview")}
                </button>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-base-200 text-base-content/70 group"
                  on:click={() => exportData('products')}
                >
                  <div class="p-1 rounded bg-base-200 group-hover:bg-base-300 inline-block mr-2">
                    <Icon icon="heroicons:cube" class="w-4 h-4" />
                  </div>
                  {$_("analytics.export_top_products")}
                </button>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-base-200 text-base-content/70 group"
                  on:click={() => exportData('activity')}
                >
                  <div class="p-1 rounded bg-base-200 group-hover:bg-base-300 inline-block mr-2">
                    <Icon icon="heroicons:clock" class="w-4 h-4" />
                  </div>
                  {$_("analytics.export_recent_activity")}
                </button>
                <div class="border-t border-base-300 my-1"></div>
                <button 
                  class="w-full px-4 py-2 text-left text-sm hover:bg-base-200 text-primary font-medium group"
                  on:click={() => exportData('all')}
                >
                  <div class="p-1 rounded bg-primary/10 group-hover:bg-primary/20 inline-block mr-2">
                    <Icon icon="heroicons:document-arrow-down" class="w-4 h-4 text-primary" />
                  </div>
                  {$_("analytics.export_all_data")}
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
    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_("analytics.total_revenue")}</p>
          <p class="text-2xl font-bold text-base-content">{analyticsData.overview.totalRevenue}</p>
          <p class="text-sm text-success">+12.5% {$_("analytics.from_last_month")}</p>
        </div>
        <div class="p-3 bg-success/10 rounded-lg">
          <Icon icon="heroicons:currency-dollar" class="w-6 h-6 text-success" />
        </div>
      </div>
    </div>
    
    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_("analytics.total_users")}</p>
          <p class="text-2xl font-bold text-base-content">{analyticsData.overview.totalUsers}</p>
          <p class="text-sm text-success">+8.2% {$_("analytics.from_last_month")}</p>
        </div>
        <div class="p-3 bg-primary/10 rounded-lg">
          <Icon icon="heroicons:users" class="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
    
    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_("analytics.conversion_rate")}</p>
          <p class="text-2xl font-bold text-base-content">{analyticsData.overview.conversionRate}</p>
          <p class="text-sm text-success">+2.1% {$_("analytics.from_last_month")}</p>
        </div>
        <div class="p-3 bg-secondary/10 rounded-lg">
          <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-secondary" />
        </div>
      </div>
    </div>
    
    <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionHover>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-base-content/60">{$_("analytics.avg_session")}</p>
          <p class="text-2xl font-bold text-base-content">{analyticsData.overview.avgSessionDuration}</p>
          <p class="text-sm text-success">+15.3% {$_("analytics.from_last_month")}</p>
        </div>
        <div class="p-3 bg-accent/10 rounded-lg">
          <Icon icon="heroicons:clock" class="w-6 h-6 text-accent" />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Charts and Data Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Main Chart -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Revenue Trend Chart -->
      <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-base-content">{$_("analytics.revenue_trend")}</h2>
          <!-- Metric selector -->
          <div class="relative metric-selector">
            <button 
              class="px-3 py-1 text-sm font-medium text-base-content/70 bg-base-200 border border-base-300 rounded-lg hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
              on:click={toggleMetricSelect}
            >
              {metricOptions.find(opt => opt.value === selectedMetric)?.label || $_("analytics.revenue")}
              <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-1 inline" />
            </button>
            {#if showMetricSelect}
              <div class="absolute top-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 min-w-32">
                {#each metricOptions as item}
                  <button 
                    class="w-full px-3 py-2 text-left text-sm hover:bg-base-200 {item.value === selectedMetric ? 'bg-primary/10 text-primary' : 'text-base-content/70'}"
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
      <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-base-content mb-6">{$_("analytics.top_products")}</h2>
        <div class="space-y-4">
          {#each analyticsData.topProducts as product, index}
            <div class="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors" use:motionHover>
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <span class="text-sm font-medium text-primary">#{index + 1}</span>
                </div>
                <div>
                  <p class="font-medium text-base-content">{product.name}</p>
                  <p class="text-sm text-base-content/60">{product.sales} {$_("analytics.sales")}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-base-content">{product.revenue}</p>
                <p class="text-sm text-success">+12.5%</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Recent Activity -->
      <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-base-content">{$_("analytics.recent_activity")}</h2>
          <button class="text-sm text-base-content/60 hover:text-base-content/80 transition-colors" use:motionHover>
            {$_("analytics.view_all")} →
          </button>
        </div>
        <div class="space-y-4">
          {#each analyticsData.recentActivity as activity}
            <div class="flex items-center space-x-4 p-3 rounded-lg hover:bg-base-200 transition-colors" use:motionHover>
              <div class="flex-shrink-0">
                {#if activity.type === 'user'}
                  <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon icon="heroicons:user" class="w-5 h-5 text-primary" />
                  </div>
                {:else if activity.type === 'payment'}
                  <div class="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Icon icon="heroicons:credit-card" class="w-5 h-5 text-success" />
                  </div>
                {:else if activity.type === 'purchase'}
                  <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon icon="heroicons:shopping-cart" class="w-5 h-5 text-secondary" />
                  </div>
                {:else if activity.type === 'support'}
                  <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon icon="heroicons:chat-bubble-left-right" class="w-5 h-5 text-accent" />
                  </div>
                {/if}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-base-content mb-0.5">{activity.action}</p>
                <div class="flex items-center space-x-2">
                  <Icon icon="heroicons:clock" class="w-4 h-4 text-base-content/40" />
                  <p class="text-xs text-base-content/60">{activity.time}</p>
                </div>
              </div>
              <div class="flex-shrink-0">
                <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-full hover:bg-base-300 transition-colors">
                  <Icon icon="heroicons:ellipsis-horizontal" class="w-5 h-5" />
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Quick Stats -->
      <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-base-content">{$_("analytics.quick_stats")}</h2>
          <div class="flex items-center space-x-2 text-sm text-base-content/60">
            <Icon icon="heroicons:arrow-path" class="w-4 h-4" />
            <span>{$_("analytics.last_updated")} 5m {$_("analytics.ago")}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <!-- Page Views -->
          <div class="p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors" use:motionHover>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon icon="heroicons:eye" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="text-sm text-base-content/60">{$_("analytics.page_views")}</p>
                  <div class="flex items-center space-x-2">
                    <p class="text-lg font-semibold text-base-content">45.2K</p>
                    <span class="flex items-center text-xs font-medium text-success">
                      <Icon icon="heroicons:arrow-trending-up" class="w-3 h-3 mr-1" />
                      +5.2%
                    </span>
                  </div>
                </div>
              </div>
              <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors">
                <Icon icon="heroicons:chart-bar" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Bounce Rate -->
          <div class="p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors" use:motionHover>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
                  <Icon icon="heroicons:arrow-uturn-left" class="w-5 h-5 text-error" />
                </div>
                <div>
                  <p class="text-sm text-base-content/60">{$_("analytics.bounce_rate")}</p>
                  <div class="flex items-center space-x-2">
                    <p class="text-lg font-semibold text-base-content">32.1%</p>
                    <span class="flex items-center text-xs font-medium text-error">
                      <Icon icon="heroicons:arrow-trending-down" class="w-3 h-3 mr-1" />
                      -2.3%
                    </span>
                  </div>
                </div>
              </div>
              <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors">
                <Icon icon="heroicons:chart-bar" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Average Order Value -->
          <div class="p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors" use:motionHover>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon icon="heroicons:banknotes" class="w-5 h-5 text-success" />
                </div>
                <div>
                  <p class="text-sm text-base-content/60">{$_("analytics.avg_order_value")}</p>
                  <div class="flex items-center space-x-2">
                    <p class="text-lg font-semibold text-base-content">$89.50</p>
                    <span class="flex items-center text-xs font-medium text-success">
                      <Icon icon="heroicons:arrow-trending-up" class="w-3 h-3 mr-1" />
                      +8.1%
                    </span>
                  </div>
                </div>
              </div>
              <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors">
                <Icon icon="heroicons:chart-bar" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Customer Lifetime Value -->
          <div class="p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors" use:motionHover>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon icon="heroicons:user-circle" class="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p class="text-sm text-base-content/60">{$_("analytics.customer_lifetime_value")}</p>
                  <div class="flex items-center space-x-2">
                    <p class="text-lg font-semibold text-base-content">$1,245</p>
                    <span class="flex items-center text-xs font-medium text-success">
                      <Icon icon="heroicons:arrow-trending-up" class="w-3 h-3 mr-1" />
                      +12.3%
                    </span>
                  </div>
                </div>
              </div>
              <button class="p-2 text-base-content/40 hover:text-base-content/60 rounded-lg hover:bg-base-100 transition-colors">
                <Icon icon="heroicons:chart-bar" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<svelte:window on:click={handleClickOutside} /> 