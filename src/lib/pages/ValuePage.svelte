<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let searchTerm = "";
  let selectedCategory = "all";
  let selectedTimeframe = "all";
  let assetValues = [];
  let totalValue = 0;
  let valueChange = 0;
  let valueChangePercent = 0;

  const categories = [
    { id: "real_estate", name: "Real Estate", icon: "heroicons:home", color: "text-blue-600" },
    { id: "vehicles", name: "Vehicles", icon: "heroicons:truck", color: "text-green-600" },
    { id: "investments", name: "Investments", icon: "heroicons:currency-rupee", color: "text-yellow-600" },
    { id: "jewelry", name: "Jewelry & Gold", icon: "heroicons:sparkles", color: "text-purple-600" },
    { id: "electronics", name: "Electronics", icon: "heroicons:device-phone-mobile", color: "text-cyan-600" },
    { id: "furniture", name: "Furniture", icon: "heroicons:home-modern", color: "text-orange-600" },
    { id: "other", name: "Other Assets", icon: "heroicons:question-mark-circle", color: "text-gray-600" }
  ];

  const timeframes = [
    { id: "all", name: "All Time" },
    { id: "year", name: "This Year" },
    { id: "month", name: "This Month" },
    { id: "week", name: "This Week" }
  ];

  onMount(() => {
    // Asset Value Data
    assetValues = [
      {
        id: 1,
        name: "Family Home",
        category: "real_estate",
        currentValue: 8500000,
        purchaseValue: 4500000,
        purchaseDate: "2010-03-15",
        appreciation: 88.9,
        location: "Coimbatore",
        description: "3BHK house with garden"
      },
      {
        id: 2,
        name: "Honda City Car",
        category: "vehicles",
        currentValue: 650000,
        purchaseValue: 850000,
        purchaseDate: "2018-06-20",
        appreciation: -23.5,
        location: "Garage",
        description: "2018 model, well maintained"
      },
      {
        id: 3,
        name: "Gold Jewelry Set",
        category: "jewelry",
        currentValue: 285000,
        purchaseValue: 180000,
        purchaseDate: "2015-08-10",
        appreciation: 58.3,
        location: "Bank Locker",
        description: "Traditional gold jewelry"
      },
      {
        id: 4,
        name: "Samsung 4K TV",
        category: "electronics",
        currentValue: 35000,
        purchaseValue: 65000,
        purchaseDate: "2020-12-01",
        appreciation: -46.2,
        location: "Living Room",
        description: "55 inch 4K Smart TV"
      },
      {
        id: 5,
        name: "Mutual Fund Portfolio",
        category: "investments",
        currentValue: 1250000,
        purchaseValue: 800000,
        purchaseDate: "2019-01-15",
        appreciation: 56.3,
        location: "Bank Account",
        description: "Diversified equity funds"
      },
      {
        id: 6,
        name: "Dining Table Set",
        category: "furniture",
        currentValue: 45000,
        purchaseValue: 75000,
        purchaseDate: "2017-11-25",
        appreciation: -40.0,
        location: "Dining Room",
        description: "Wooden dining set for 6"
      }
    ];

    calculateTotals();
  });

  function calculateTotals() {
    totalValue = assetValues.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalPurchaseValue = assetValues.reduce((sum, asset) => sum + asset.purchaseValue, 0);
    valueChange = totalValue - totalPurchaseValue;
    valueChangePercent = totalPurchaseValue > 0 ? (valueChange / totalPurchaseValue) * 100 : 0;
  }

  $: filteredAssets = assetValues.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  $: categoryTotals = categories.map(category => {
    const categoryAssets = assetValues.filter(asset => asset.category === category.id);
    const currentValue = categoryAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const purchaseValue = categoryAssets.reduce((sum, asset) => sum + asset.purchaseValue, 0);
    const change = currentValue - purchaseValue;
    const changePercent = purchaseValue > 0 ? (change / purchaseValue) * 100 : 0;

    return {
      ...category,
      currentValue,
      purchaseValue,
      change,
      changePercent,
      count: categoryAssets.length
    };
  }).filter(cat => cat.count > 0);

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  function getChangeColor(change) {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  function getChangeIcon(change) {
    return change >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down';
  }
</script>

<svelte:head>
  <title>Asset Value Tracking - South Indian Family Life App</title>
  <meta name="description" content="Track and monitor the value of your family assets over time" />
</svelte:head>

<div class="max-w-7xl mx-auto p-6 space-y-6">
  <!-- Header -->
  <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <Icon icon="heroicons:currency-rupee" class="w-8 h-8" />
        <div>
          <h1 class="text-2xl font-bold">Asset Value Tracking</h1>
          <p class="text-green-100">Monitor your family's wealth and asset appreciation</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold">{formatCurrency(totalValue)}</div>
        <div class="flex items-center gap-2 text-sm">
          <Icon icon={getChangeIcon(valueChange)} class="w-4 h-4" />
          <span class={getChangeColor(valueChange)}>
            {valueChange >= 0 ? '+' : ''}{formatCurrency(valueChange)} ({valueChangePercent >= 0 ? '+' : ''}{valueChangePercent.toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Search and Filters -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search assets..."
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <select
          bind:value={selectedCategory}
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <select
          bind:value={selectedTimeframe}
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {#each timeframes as timeframe}
            <option value={timeframe.id}>{timeframe.name}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Category Filter Buttons -->
    <div class="flex flex-wrap gap-2">
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedCategory === 'all' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        on:click={() => selectedCategory = 'all'}
      >
        All Assets
      </button>
      {#each categories as category}
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 {selectedCategory === category.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => selectedCategory = category.id}
        >
          <Icon icon={category.icon} class="w-4 h-4" />
          {category.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Category Summary -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each categoryTotals as category}
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <Icon icon={category.icon} class="w-6 h-6 {category.color}" />
            <div>
              <h3 class="font-semibold text-gray-900">{category.name}</h3>
              <p class="text-sm text-gray-500">{category.count} assets</p>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Current Value</span>
            <span class="font-semibold text-gray-900">{formatCurrency(category.currentValue)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Purchase Value</span>
            <span class="text-sm text-gray-500">{formatCurrency(category.purchaseValue)}</span>
          </div>
          <div class="flex justify-between items-center pt-2 border-t">
            <span class="text-sm font-medium text-gray-700">Change</span>
            <div class="flex items-center gap-1">
              <Icon icon={getChangeIcon(category.change)} class="w-4 h-4 {getChangeColor(category.change)}" />
              <span class="font-semibold {getChangeColor(category.change)}">
                {category.change >= 0 ? '+' : ''}{category.changePercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Asset Details Table -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Icon icon="heroicons:building-storefront" class="w-6 h-6 text-green-600" />
        Asset Details ({filteredAssets.length})
      </h2>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Value</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appreciation</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredAssets as asset}
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{asset.name}</div>
                  <div class="text-sm text-gray-500">{asset.description}</div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {categories.find(c => c.id === asset.category)?.name}
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">{formatCurrency(asset.currentValue)}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{formatCurrency(asset.purchaseValue)}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <Icon icon={getChangeIcon(asset.appreciation)} class="w-4 h-4 {getChangeColor(asset.appreciation)}" />
                  <span class="text-sm font-medium {getChangeColor(asset.appreciation)}">
                    {asset.appreciation >= 0 ? '+' : ''}{asset.appreciation.toFixed(1)}%
                  </span>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{asset.purchaseDate}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{asset.location}</div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Value Insights -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon icon="heroicons:chart-bar" class="w-5 h-5 text-green-600" />
        Value Distribution
      </h3>
      <div class="space-y-3">
        {#each categoryTotals.sort((a, b) => b.currentValue - a.currentValue) as category}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon icon={category.icon} class="w-4 h-4 {category.color}" />
              <span class="text-sm font-medium">{category.name}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold">{formatCurrency(category.currentValue)}</div>
              <div class="text-xs text-gray-500">{((category.currentValue / totalValue) * 100).toFixed(1)}%</div>
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-green-500 h-2 rounded-full"
              style="width: {totalValue > 0 ? (category.currentValue / totalValue) * 100 : 0}%"
            ></div>
          </div>
        {/each}
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon icon="heroicons:arrow-trending-up" class="w-5 h-5 text-blue-600" />
        Performance Summary
      </h3>
      <div class="space-y-4">
        <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span class="text-sm font-medium text-green-800">Best Performer</span>
          <span class="text-sm font-semibold text-green-800">
            {categoryTotals.reduce((max, cat) => cat.changePercent > max.changePercent ? cat : max, categoryTotals[0])?.name || 'N/A'}
          </span>
        </div>
        <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
          <span class="text-sm font-medium text-red-800">Needs Attention</span>
          <span class="text-sm font-semibold text-red-800">
            {categoryTotals.reduce((min, cat) => cat.changePercent < min.changePercent ? cat : min, categoryTotals[0])?.name || 'N/A'}
          </span>
        </div>
        <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span class="text-sm font-medium text-blue-800">Total Assets</span>
          <span class="text-sm font-semibold text-blue-800">{assetValues.length}</span>
        </div>
        <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
          <span class="text-sm font-medium text-purple-800">Categories</span>
          <span class="text-sm font-semibold text-purple-800">{categoryTotals.length}</span>
        </div>
      </div>
    </div>
  </div>
</div>