<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import DashboardLayout from "../components/DashboardLayout.svelte";

  let currentView = "overview";
  let searchTerm = "";
  let selectedCategory = "all";
  let showAddModal = false;
  let selectedTimeframe = "1y";

  const views = [
    { id: "overview", label: "Portfolio Overview", icon: "heroicons:chart-pie" },
    { id: "valuations", label: "Asset Valuations", icon: "heroicons:currency-rupee" },
    { id: "trends", label: "Value Trends", icon: "heroicons:chart-bar" },
  ];

  const portfolioSummary = {
    totalValue: 2847500,
    purchaseValue: 2156000,
    appreciation: 691500,
    appreciationPercent: 32.1,
    depreciatingAssets: 8,
    appreciatingAssets: 12,
    lastUpdated: "2024-11-15",
  };

  const assetValueData = [
    {
      id: 1,
      name: "Gold Jewelry Collection",
      tamilName: "தங்க நகை சேகரிப்பு",
      category: "jewelry",
      purchaseValue: 450000,
      currentValue: 627000,
      purchaseDate: "2020-03-15",
      lastValuation: "2024-11-01",
      valueChange: 177000,
      changePercent: 39.3,
      trend: "appreciating",
      weight: "125 grams",
      purity: "22K",
      notes: "Traditional South Indian jewelry collection. Market value based on current gold rates.",
      appraisedBy: "Kumar Jewellers",
      nextValuation: "2025-05-01",
    },
    {
      id: 2,
      name: "Honda Activa 6G",
      tamilName: "ஹோண்டா ஆக்டிவா",
      category: "vehicles",
      purchaseValue: 78000,
      currentValue: 52000,
      purchaseDate: "2022-06-10",
      lastValuation: "2024-10-15",
      valueChange: -26000,
      changePercent: -33.3,
      trend: "depreciating",
      model: "2022",
      mileage: "15,432 km",
      condition: "Good",
      notes: "Regular maintenance done. Minor scratches on body.",
      appraisedBy: "Honda Showroom",
      nextValuation: "2025-04-15",
    },
    {
      id: 3,
      name: 'Samsung 55" QLED TV',
      tamilName: "சாம்சங் டிவி",
      category: "electronics",
      purchaseValue: 89000,
      currentValue: 45000,
      purchaseDate: "2021-11-20",
      lastValuation: "2024-11-10",
      valueChange: -44000,
      changePercent: -49.4,
      trend: "depreciating",
      model: "QN55Q70A",
      condition: "Excellent",
      warrantyStatus: "Expired",
      notes: "Minimal usage, excellent picture quality. Warranty expired in 2023.",
      appraisedBy: "Electronics Mart",
      nextValuation: "2025-11-10",
    },
    {
      id: 4,
      name: "Teak Wood Dining Set",
      tamilName: "தேக்கு மர சாப்பாட்டு மேசை",
      category: "furniture",
      purchaseValue: 125000,
      currentValue: 165000,
      purchaseDate: "2019-08-12",
      lastValuation: "2024-09-20",
      valueChange: 40000,
      changePercent: 32.0,
      trend: "appreciating",
      material: "Burma Teak",
      condition: "Excellent",
      age: "5 years",
      notes: "Handcrafted traditional design. Value increased due to teak wood appreciation.",
      appraisedBy: "Antique Furniture Appraisers",
      nextValuation: "2025-09-20",
    },
    {
      id: 5,
      name: "LG Double Door Refrigerator",
      tamilName: "எல்ஜி குளிர்சாதன பெட்டி",
      category: "appliances",
      purchaseValue: 52000,
      currentValue: 28000,
      purchaseDate: "2020-12-05",
      lastValuation: "2024-10-30",
      valueChange: -24000,
      changePercent: -46.2,
      trend: "depreciating",
      model: "GL-T372JDS3",
      capacity: "335L",
      condition: "Good",
      notes: "Working perfectly. Some minor dents on exterior.",
      appraisedBy: "Second Hand Appliances",
      nextValuation: "2025-10-30",
    },
    {
      id: 6,
      name: "Silver Coin Collection",
      tamilName: "வெள்ளி நாணயம் சேகரிப்பு",
      category: "collectibles",
      purchaseValue: 45000,
      currentValue: 58000,
      purchaseDate: "2018-01-15",
      lastValuation: "2024-11-05",
      valueChange: 13000,
      changePercent: 28.9,
      trend: "appreciating",
      weight: "1.2 kg",
      purity: "999 Silver",
      pieces: "24 coins",
      notes: "Mix of commemorative and regular silver coins. Premium for collectible value.",
      appraisedBy: "Numismatic Society",
      nextValuation: "2025-05-05",
    },
  ];

  const categoryStats = [
    { category: "jewelry", totalValue: 685000, count: 3, change: 35.2 },
    { category: "vehicles", totalValue: 152000, count: 2, change: -28.5 },
    { category: "electronics", totalValue: 267000, count: 6, change: -42.3 },
    { category: "furniture", totalValue: 445000, count: 4, change: 18.7 },
    { category: "appliances", totalValue: 156000, count: 5, change: -35.8 },
    { category: "collectibles", totalValue: 138000, count: 3, change: 22.4 },
  ];

  let filteredAssets = assetValueData;
  let newValuation = {
    assetName: "",
    currentValue: "",
    valuationDate: "",
    appraisedBy: "",
    notes: "",
    nextValuation: "",
  };

  $: {
    filteredAssets = assetValueData.filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.tamilName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  onMount(() => {
    document.title = "Asset Value Tracking - Assets Management";
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN");
  }

  function getCategoryIcon(category) {
    const icons = {
      jewelry: "heroicons:sparkles",
      vehicles: "heroicons:truck",
      electronics: "heroicons:computer-desktop",
      furniture: "heroicons:home",
      appliances: "heroicons:cog-6-tooth",
      collectibles: "heroicons:star",
    };
    return icons[category] || "heroicons:cube";
  }

  function getCategoryColor(category) {
    const colors = {
      jewelry: "from-yellow-400 to-orange-500",
      vehicles: "from-blue-500 to-indigo-600",
      electronics: "from-purple-500 to-pink-600",
      furniture: "from-green-500 to-emerald-600",
      appliances: "from-gray-500 to-slate-600",
      collectibles: "from-red-500 to-rose-600",
    };
    return colors[category] || "from-gray-400 to-gray-500";
  }

  function getTrendColor(trend) {
    return trend === "appreciating" ? "text-green-600" : "text-red-600";
  }

  function getTrendIcon(trend) {
    return trend === "appreciating" ? "heroicons:arrow-trending-up" : "heroicons:arrow-trending-down";
  }

  function addValuation() {
    // Add valuation logic would go here
    showAddModal = false;
    // Reset form
    newValuation = {
      assetName: "",
      currentValue: "",
      valuationDate: "",
      appraisedBy: "",
      notes: "",
      nextValuation: "",
    };
  }

  function getTimeUntilNextValuation(nextDate) {
    const today = new Date();
    const next = new Date(nextDate);
    const diffTime = next - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 30) return `${diffDays} days`;
    if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months`;
    return `${Math.ceil(diffDays / 365)} years`;
  }
</script>

<DashboardLayout>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">
          <Icon icon="heroicons:chart-pie" class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Asset Value Tracking</h1>
          <p class="text-gray-600 dark:text-gray-300">Monitor and track your asset portfolio value</p>
        </div>
      </div>
      <button class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        <span>Add Valuation</span>
      </button>
    </div>

    <!-- View Tabs -->
    <div class="flex space-x-2">
      {#each views as view}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-green-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-green-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20'}" on:click={() => (currentView = view.id)}>
          <Icon icon={view.icon} class="w-4 h-4" />
          <span class="font-medium">{view.label}</span>
        </button>
      {/each}
    </div>

    <!-- Portfolio Overview -->
    {#if currentView === "overview"}
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(portfolioSummary.totalValue)}</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Investment</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(portfolioSummary.purchaseValue)}</p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Icon icon="heroicons:shopping-cart" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Net Appreciation</p>
              <p class="text-2xl font-bold text-green-600">{formatCurrency(portfolioSummary.appreciation)}</p>
              <p class="text-sm text-green-600">+{portfolioSummary.appreciationPercent}%</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Icon icon="heroicons:arrow-trending-up" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Appreciating Assets</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{portfolioSummary.appreciatingAssets}/{portfolioSummary.appreciatingAssets + portfolioSummary.depreciatingAssets}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{Math.round((portfolioSummary.appreciatingAssets / (portfolioSummary.appreciatingAssets + portfolioSummary.depreciatingAssets)) * 100)}% of portfolio</p>
            </div>
            <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each categoryStats as category}
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                  <div class="p-2 bg-gradient-to-r {getCategoryColor(category.category)} rounded-lg text-white">
                    <Icon icon={getCategoryIcon(category.category)} class="w-4 h-4" />
                  </div>
                  <span class="font-medium text-gray-900 dark:text-white capitalize">{category.category}</span>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{category.count} items</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(category.totalValue)}</span>
                <span class="text-sm font-medium {category.change > 0 ? 'text-green-600' : 'text-red-600'}">
                  {category.change > 0 ? "+" : ""}{category.change.toFixed(1)}%
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Asset Valuations View -->
    {:else if currentView === "valuations"}
      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Assets</label>
            <div class="relative">
              <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" bind:value={searchTerm} placeholder="Search by asset name..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select bind:value={selectedCategory} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white">
              <option value="all">All Categories</option>
              <option value="jewelry">Jewelry</option>
              <option value="vehicles">Vehicles</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="appliances">Appliances</option>
              <option value="collectibles">Collectibles</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Asset Valuations -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each filteredAssets as asset}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
            <div class="p-6">
              <!-- Asset Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-start space-x-3">
                  <div class="p-3 bg-gradient-to-r {getCategoryColor(asset.category)} rounded-lg text-white">
                    <Icon icon={getCategoryIcon(asset.category)} class="w-6 h-6" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">{asset.name}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{asset.tamilName}</p>
                    <span class="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mt-1 dark:bg-gray-700 dark:text-gray-300 capitalize">
                      {asset.category}
                    </span>
                  </div>
                </div>

                <div class="text-right">
                  <div class="flex items-center space-x-1 {getTrendColor(asset.trend)}">
                    <Icon icon={getTrendIcon(asset.trend)} class="w-4 h-4" />
                    <span class="text-sm font-medium">
                      {asset.changePercent > 0 ? "+" : ""}{asset.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <!-- Value Information -->
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Purchase Value</p>
                    <p class="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(asset.purchaseValue)}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{formatDate(asset.purchaseDate)}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
                    <p class="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(asset.currentValue)}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{formatDate(asset.lastValuation)}</p>
                  </div>
                </div>

                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Value Change</span>
                    <span class="font-medium {asset.valueChange > 0 ? 'text-green-600' : 'text-red-600'}">
                      {asset.valueChange > 0 ? "+" : ""}{formatCurrency(asset.valueChange)}
                    </span>
                  </div>
                </div>

                <!-- Asset Details -->
                <div class="space-y-2 text-sm">
                  {#if asset.weight}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Weight:</span>
                      <span class="text-gray-900 dark:text-white">{asset.weight}</span>
                    </div>
                  {/if}
                  {#if asset.purity}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Purity:</span>
                      <span class="text-gray-900 dark:text-white">{asset.purity}</span>
                    </div>
                  {/if}
                  {#if asset.model}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Model:</span>
                      <span class="text-gray-900 dark:text-white">{asset.model}</span>
                    </div>
                  {/if}
                  {#if asset.condition}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Condition:</span>
                      <span class="text-gray-900 dark:text-white">{asset.condition}</span>
                    </div>
                  {/if}
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Appraised by:</span>
                    <span class="text-gray-900 dark:text-white">{asset.appraisedBy}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Next valuation:</span>
                    <span class="text-gray-900 dark:text-white">{getTimeUntilNextValuation(asset.nextValuation)}</span>
                  </div>
                </div>

                {#if asset.notes}
                  <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-sm text-gray-600 dark:text-gray-400">{asset.notes}</p>
                  </div>
                {/if}
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-2 mt-6">
                <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Update Value </button>
                <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> View History </button>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Value Trends View -->
    {:else if currentView === "trends"}
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Portfolio Value Trends</h3>
          <div class="flex space-x-2">
            {#each [{ id: "1m", label: "1M" }, { id: "3m", label: "3M" }, { id: "6m", label: "6M" }, { id: "1y", label: "1Y" }, { id: "all", label: "All" }] as timeframe}
              <button class="px-3 py-1 text-sm rounded-lg transition-colors duration-200 {selectedTimeframe === timeframe.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}" on:click={() => (selectedTimeframe = timeframe.id)}>
                {timeframe.label}
              </button>
            {/each}
          </div>
        </div>

        <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-center">
            <Icon icon="heroicons:chart-bar" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p class="text-gray-600 dark:text-gray-400">Value trend chart would be displayed here</p>
            <p class="text-sm text-gray-500 dark:text-gray-500">Integration with charting library required</p>
          </div>
        </div>
      </div>

      <!-- Top Performers -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Performers</h3>
          <div class="space-y-3">
            {#each assetValueData
              .filter((a) => a.changePercent > 0)
              .sort((a, b) => b.changePercent - a.changePercent)
              .slice(0, 3) as asset}
              <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-gradient-to-r {getCategoryColor(asset.category)} rounded-lg text-white">
                    <Icon icon={getCategoryIcon(asset.category)} class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{asset.name}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(asset.currentValue)}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-green-600">+{asset.changePercent.toFixed(1)}%</p>
                  <p class="text-sm text-green-600">{formatCurrency(asset.valueChange)}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Underperformers</h3>
          <div class="space-y-3">
            {#each assetValueData
              .filter((a) => a.changePercent < 0)
              .sort((a, b) => a.changePercent - b.changePercent)
              .slice(0, 3) as asset}
              <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-gradient-to-r {getCategoryColor(asset.category)} rounded-lg text-white">
                    <Icon icon={getCategoryIcon(asset.category)} class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{asset.name}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(asset.currentValue)}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-red-600">{asset.changePercent.toFixed(1)}%</p>
                  <p class="text-sm text-red-600">{formatCurrency(asset.valueChange)}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</DashboardLayout>

<!-- Add Valuation Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Valuation</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addValuation} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asset Name *</label>
              <input type="text" bind:value={newValuation.assetName} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Gold Jewelry Collection" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Value (₹) *</label>
              <input type="number" bind:value={newValuation.currentValue} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" placeholder="450000" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valuation Date *</label>
              <input type="date" bind:value={newValuation.valuationDate} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Appraised By *</label>
              <input type="text" bind:value={newValuation.appraisedBy} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Kumar Jewellers" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Next Valuation Date</label>
              <input type="date" bind:value={newValuation.nextValuation} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea bind:value={newValuation.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" placeholder="Any additional notes about the valuation..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"> Add Valuation </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
