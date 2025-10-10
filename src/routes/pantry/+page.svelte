<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "$lib/data/database.js";

  let currentTab = "staples";
  let pantryItems = [];
  let shoppingList = [];
  let showAddItem = false;
  let searchTerm = "";
  let newItem = {
    name: "",
    category: "staples",
    quantity: "",
    unit: "",
    minLevel: "",
    expiryDate: "",
    brand: "",
    cost: "",
    location: "",
  };

  const tabs = [
    { id: "staples", label: "Staples & Grains", icon: "heroicons:archive-box" },
    { id: "spices", label: "Spices & Masalas", icon: "heroicons:fire" },
    { id: "vegetables", label: "Vegetables", icon: "heroicons:leaf" },
    { id: "dairy", label: "Dairy & Pantry", icon: "heroicons:cake" },
    { id: "analytics", label: "Inventory Analytics", icon: "heroicons:chart-bar" },
  ];

  // Sample Tamil household pantry inventory
  let sampleInventory = {
    staples: [
      {
        name: "Idli Rice (Idli Arisi)",
        brand: "Laxmi",
        quantity: "10",
        unit: "kg",
        minLevel: "2",
        currentLevel: "high",
        location: "Top shelf - Kitchen",
        cost: "₹180/kg",
        expiryDate: "2024-12-31",
        lastUpdated: "2024-01-15",
        usage: "High - Daily breakfast",
        culturalNote: "Premium short grain rice for soft idlis",
      },
      {
        name: "Ponni Boiled Rice",
        brand: "Arokya",
        quantity: "25",
        unit: "kg",
        minLevel: "5",
        currentLevel: "high",
        location: "Rice container - Pantry",
        cost: "₹65/kg",
        expiryDate: "2024-10-30",
        lastUpdated: "2024-01-10",
        usage: "High - Daily meals",
        culturalNote: "Tamil Nadu's most loved rice variety",
      },
      {
        name: "Toor Dal (Arhar)",
        brand: "Tata Sampann",
        quantity: "5",
        unit: "kg",
        minLevel: "1",
        currentLevel: "medium",
        location: "Dal container - Pantry",
        cost: "₹140/kg",
        expiryDate: "2024-08-15",
        lastUpdated: "2024-01-12",
        usage: "High - Sambar daily",
        culturalNote: "Essential for Tamil meals - sambar, rasam",
      },
      {
        name: "Urad Dal (Split Black Gram)",
        brand: "Organic",
        quantity: "2",
        unit: "kg",
        minLevel: "0.5",
        currentLevel: "medium",
        location: "Dal shelf - Pantry",
        cost: "₹160/kg",
        expiryDate: "2024-09-20",
        lastUpdated: "2024-01-08",
        usage: "Medium - Idli, vada, payasam",
        culturalNote: "For idli batter and temple vadai",
      },
      {
        name: "Chana Dal (Bengal Gram)",
        brand: "Fortune",
        quantity: "1",
        unit: "kg",
        minLevel: "0.3",
        currentLevel: "low",
        location: "Dal shelf - Pantry",
        cost: "₹120/kg",
        expiryDate: "2024-07-10",
        lastUpdated: "2024-01-05",
        usage: "Low - Weekly kootu",
        culturalNote: "For kootu and sundal",
      },
      {
        name: "Moong Dal (Green Gram)",
        brand: "Organic",
        quantity: "1.5",
        unit: "kg",
        minLevel: "0.5",
        currentLevel: "medium",
        location: "Dal shelf - Pantry",
        cost: "₹150/kg",
        expiryDate: "2024-06-30",
        lastUpdated: "2024-01-07",
        usage: "Medium - Kootu, payasam",
        culturalNote: "Easy to digest - for children and elderly",
      },
    ],
    spices: [
      {
        name: "Sambar Powder",
        brand: "Aachi",
        quantity: "500",
        unit: "grams",
        minLevel: "100",
        currentLevel: "high",
        location: "Spice rack - Level 1",
        cost: "₹120/500g",
        expiryDate: "2024-08-15",
        lastUpdated: "2024-01-12",
        usage: "High - Daily sambar",
        culturalNote: "Essential Tamil spice blend",
      },
      {
        name: "Rasam Powder",
        brand: "MTR",
        quantity: "200",
        unit: "grams",
        minLevel: "50",
        currentLevel: "medium",
        location: "Spice rack - Level 1",
        cost: "₹80/200g",
        expiryDate: "2024-07-20",
        lastUpdated: "2024-01-10",
        usage: "High - Daily rasam",
        culturalNote: "For traditional Tamil rasam",
      },
      {
        name: "Red Chilli Powder",
        brand: "Everest",
        quantity: "500",
        unit: "grams",
        minLevel: "100",
        currentLevel: "high",
        location: "Spice rack - Level 2",
        cost: "₹180/500g",
        expiryDate: "2024-09-30",
        lastUpdated: "2024-01-08",
        usage: "High - Daily cooking",
        culturalNote: "Guntur variety - medium spicy",
      },
      {
        name: "Turmeric Powder",
        brand: "Tata Sampann",
        quantity: "200",
        unit: "grams",
        minLevel: "50",
        currentLevel: "medium",
        location: "Spice rack - Level 2",
        cost: "₹45/200g",
        expiryDate: "2024-06-15",
        lastUpdated: "2024-01-06",
        usage: "High - Daily cooking",
        culturalNote: "Auspicious and medicinal",
      },
      {
        name: "Coriander Powder",
        brand: "MDH",
        quantity: "100",
        unit: "grams",
        minLevel: "30",
        currentLevel: "low",
        location: "Spice rack - Level 2",
        cost: "₹60/100g",
        expiryDate: "2024-05-10",
        lastUpdated: "2024-01-04",
        usage: "Medium - Curries",
        culturalNote: "Fresh ground for best flavor",
      },
      {
        name: "Garam Masala",
        brand: "Homemade",
        quantity: "150",
        unit: "grams",
        minLevel: "50",
        currentLevel: "medium",
        location: "Spice rack - Level 3",
        cost: "₹200/150g",
        expiryDate: "2024-04-30",
        lastUpdated: "2024-01-01",
        usage: "Low - Special dishes",
        culturalNote: "Paati's recipe - cardamom, cinnamon, cloves",
      },
    ],
    vegetables: [
      {
        name: "Onions",
        brand: "Local",
        quantity: "5",
        unit: "kg",
        minLevel: "1",
        currentLevel: "high",
        location: "Vegetable basket",
        cost: "₹40/kg",
        expiryDate: "2024-02-15",
        lastUpdated: "2024-01-12",
        usage: "High - Daily cooking",
        culturalNote: "Bangalore variety - sweet and mild",
      },
      {
        name: "Tomatoes",
        brand: "Local",
        quantity: "2",
        unit: "kg",
        minLevel: "0.5",
        currentLevel: "medium",
        location: "Refrigerator - Vegetable drawer",
        cost: "₹80/kg",
        expiryDate: "2024-02-10",
        lastUpdated: "2024-01-10",
        usage: "High - Rasam, sambar",
        culturalNote: "For daily rasam and cooking",
      },
      {
        name: "Green Chillies",
        brand: "Local",
        quantity: "250",
        unit: "grams",
        minLevel: "100",
        currentLevel: "high",
        location: "Refrigerator - Vegetable drawer",
        cost: "₹120/kg",
        expiryDate: "2024-02-08",
        lastUpdated: "2024-01-08",
        usage: "High - Daily tempering",
        culturalNote: "Medium spicy - good for children",
      },
      {
        name: "Curry Leaves (Karivepaku)",
        brand: "Organic",
        quantity: "2",
        unit: "bunches",
        minLevel: "1",
        currentLevel: "medium",
        location: "Refrigerator - Herb section",
        cost: "₹10/bunch",
        expiryDate: "2024-02-05",
        lastUpdated: "2024-01-05",
        usage: "High - Daily tempering",
        culturalNote: "Essential for South Indian cooking",
      },
      {
        name: "Ginger",
        brand: "Local",
        quantity: "500",
        unit: "grams",
        minLevel: "200",
        currentLevel: "medium",
        location: "Refrigerator - Vegetable drawer",
        cost: "₹200/kg",
        expiryDate: "2024-02-20",
        lastUpdated: "2024-01-07",
        usage: "Medium - Chutneys, tea",
        culturalNote: "Medicinal and flavorful",
      },
    ],
    dairy: [
      {
        name: "Milk",
        brand: "Nandini",
        quantity: "2",
        unit: "liters",
        minLevel: "1",
        currentLevel: "medium",
        location: "Refrigerator - Main shelf",
        cost: "₹56/liter",
        expiryDate: "2024-02-02",
        lastUpdated: "2024-01-15",
        usage: "High - Daily tea, coffee",
        culturalNote: "Full fat for children's growth",
      },
      {
        name: "Curd (Yogurt)",
        brand: "Homemade",
        quantity: "1",
        unit: "liter",
        minLevel: "0.5",
        currentLevel: "medium",
        location: "Refrigerator - Main shelf",
        cost: "₹60/liter",
        expiryDate: "2024-02-05",
        lastUpdated: "2024-01-14",
        usage: "High - Daily meals",
        culturalNote: "Set fresh daily using previous day's curd",
      },
      {
        name: "Coconut Oil",
        brand: "Parachute",
        quantity: "1",
        unit: "liter",
        minLevel: "0.2",
        currentLevel: "high",
        location: "Kitchen shelf",
        cost: "₹380/liter",
        expiryDate: "2024-12-31",
        lastUpdated: "2024-01-10",
        usage: "High - Daily cooking",
        culturalNote: "Cold pressed - for health and flavor",
      },
      {
        name: "Sesame Oil (Nalla Enna)",
        brand: "Idhayam",
        quantity: "500",
        unit: "ml",
        minLevel: "100",
        currentLevel: "medium",
        location: "Kitchen shelf",
        cost: "₹220/500ml",
        expiryDate: "2024-10-15",
        lastUpdated: "2024-01-08",
        usage: "Medium - Special dishes",
        culturalNote: "Traditional oil for temple food",
      },
      {
        name: "Jaggery (Vellam)",
        brand: "Organic",
        quantity: "1",
        unit: "kg",
        minLevel: "0.2",
        currentLevel: "high",
        location: "Pantry - Airtight container",
        cost: "₹120/kg",
        expiryDate: "2024-08-30",
        lastUpdated: "2024-01-05",
        usage: "Low - Sweets, payasam",
        culturalNote: "Pure palm jaggery - better than sugar",
      },
    ],
  };

  function getInventoryByCategory() {
    if (currentTab === "analytics") return [];
    return sampleInventory[currentTab] || [];
  }

  function getFilteredItems() {
    const items = getInventoryByCategory();
    if (!searchTerm) return items;

    return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand.toLowerCase().includes(searchTerm.toLowerCase()) || item.culturalNote.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  function getLevelColor(level) {
    switch (level?.toLowerCase()) {
      case "high":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "low":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  }

  function getUsageColor(usage) {
    const colors = {
      High: "text-red-600 bg-red-100",
      Medium: "text-yellow-600 bg-yellow-100",
      Low: "text-green-600 bg-green-100",
    };
    return colors[usage] || "text-gray-600 bg-gray-100";
  }

  function isExpiringSoon(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7;
  }

  function addToShoppingList(item) {
    const shoppingItem = {
      name: item.name,
      quantity: item.minLevel,
      unit: item.unit,
      priority: item.currentLevel === "low" ? "High" : "Medium",
      addedAt: new Date().toISOString(),
    };
    shoppingList = [...shoppingList, shoppingItem];
  }

  function getAnalytics() {
    const allItems = Object.values(sampleInventory).flat();

    return {
      totalItems: allItems.length,
      lowStockItems: allItems.filter((item) => item.currentLevel === "low").length,
      expiringSoon: allItems.filter((item) => isExpiringSoon(item.expiryDate)).length,
      highUsageItems: allItems.filter((item) => item.usage === "High").length,
      totalValue: allItems.reduce((sum, item) => {
        const cost = parseFloat(item.cost.replace(/[₹,]/g, ""));
        const qty = parseFloat(item.quantity);
        return sum + cost * qty;
      }, 0),
    };
  }

  onMount(() => {
    document.title = "Pantry Inventory - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
            <Icon icon="heroicons:archive-box" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Pantry Inventory</h1>
            <p class="text-gray-600 dark:text-gray-300">भण्डार प्रबन्धन | Smart inventory management for Tamil household</p>
          </div>
        </div>
        <button class="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2" on:click={() => (showAddItem = !showAddItem)}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </div>

      <!-- Inventory Wisdom -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:archive-box" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">गृह व्यवस्था | Household Management</h3>
            <p class="text-white/90">"अन्नं न नष्टं भवेत् | Let no grain be wasted. A well-organized pantry reflects a well-managed home. Traditional wisdom teaches us to store wisely, use mindfully, and waste nothing."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "வீட்டு நிர்வாகம் ஒரு கலை - சேமித்து வைத்து சிக்கனமாக செலவு செய்"</p>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" bind:value={searchTerm} placeholder="Search pantry items, brands, or cultural notes..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-green-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    {#if currentTab === "analytics"}
      <!-- Analytics Dashboard -->
      {@const analytics = getAnalytics()}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Total Items</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalItems}</p>
            </div>
            <Icon icon="heroicons:archive-box" class="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-red-200 dark:border-red-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Low Stock</p>
              <p class="text-2xl font-bold text-red-600">{analytics.lowStockItems}</p>
            </div>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-yellow-200 dark:border-yellow-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Expiring Soon</p>
              <p class="text-2xl font-bold text-yellow-600">{analytics.expiringSoon}</p>
            </div>
            <Icon icon="heroicons:clock" class="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Total Value</p>
              <p class="text-2xl font-bold text-blue-600">₹{analytics.totalValue.toLocaleString()}</p>
            </div>
            <Icon icon="heroicons:currency-rupee" class="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <!-- Usage Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Low Stock Items</h3>
          <div class="space-y-3">
            {#each Object.values(sampleInventory)
              .flat()
              .filter((item) => item.currentLevel === "low") as item}
              <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{item.quantity} {item.unit}</p>
                </div>
                <button class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors" on:click={() => addToShoppingList(item)}> Add to List </button>
              </div>
            {/each}
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Expiring Soon</h3>
          <div class="space-y-3">
            {#each Object.values(sampleInventory)
              .flat()
              .filter((item) => isExpiringSoon(item.expiryDate)) as item}
              <div class="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p class="text-sm text-yellow-600">Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
                </div>
                <span class="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-full">
                  {Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <!-- Item Count -->
      <div class="mb-6">
        <p class="text-gray-600 dark:text-gray-400">
          Showing {getFilteredItems().length} items in {tabs.find((tab) => tab.id === currentTab)?.label}
          {#if searchTerm}for "{searchTerm}"{/if}
        </p>
      </div>

      <!-- Inventory Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each getFilteredItems() as item}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-green-200 dark:border-green-700">
            <!-- Item Header -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.brand}</p>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full {getLevelColor(item.currentLevel)}">
                    {item.currentLevel} stock
                  </span>
                  <span class="px-2 py-1 text-xs font-medium rounded-full {getUsageColor(item.usage.split(' - ')[0])}">
                    {item.usage.split(" - ")[0]} use
                  </span>
                </div>
              </div>
              {#if isExpiringSoon(item.expiryDate)}
                <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-500" />
              {/if}
            </div>

            <!-- Quantity Info -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 text-sm">Current Stock:</span>
                <span class="font-bold text-gray-900 dark:text-white">{item.quantity} {item.unit}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 text-sm">Min Level:</span>
                <span class="font-medium">{item.minLevel} {item.unit}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400 text-sm">Cost:</span>
                <span class="font-medium text-green-600">{item.cost}</span>
              </div>
            </div>

            <!-- Location & Expiry -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm">
                <Icon icon="heroicons:map-pin" class="w-4 h-4 mr-2 text-blue-500" />
                <span class="text-gray-600 dark:text-gray-400">{item.location}</span>
              </div>
              <div class="flex items-center text-sm">
                <Icon icon="heroicons:calendar" class="w-4 h-4 mr-2 text-orange-500" />
                <span class="text-gray-600 dark:text-gray-400">
                  Expires: {new Date(item.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <!-- Cultural Note -->
            <div class="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg mb-4">
              <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-1 flex items-center">
                <Icon icon="heroicons:star" class="w-4 h-4 mr-2" />
                Cultural Note
              </h4>
              <p class="text-sm text-orange-800 dark:text-orange-200">{item.culturalNote}</p>
            </div>

            <!-- Usage Info -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Usage Pattern:</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">{item.usage}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button class="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"> Update Stock </button>
              {#if item.currentLevel === "low"}
                <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm" on:click={() => addToShoppingList(item)}> Shop </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if getFilteredItems().length === 0 && currentTab !== "analytics"}
      <div class="text-center py-12">
        <Icon icon="heroicons:archive-box" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Items Found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          {#if searchTerm}
            No items match your search for "{searchTerm}"
          {:else}
            No items available in this category
          {/if}
        </p>
        {#if searchTerm}
          <button class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors" on:click={() => (searchTerm = "")}> Clear Search </button>
        {/if}
      </div>
    {/if}

    <!-- Inventory Management Tips -->
    <div class="mt-12 p-6 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl">
      <h4 class="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
        <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
        गृह व्यवस्था सूत्र | Household Management Tips
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Storage Wisdom:</h5>
          <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Store rice in airtight containers with neem leaves</li>
            <li>• Keep spices in cool, dry places away from sunlight</li>
            <li>• Use FIFO (First In, First Out) principle</li>
            <li>• Label everything with dates</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Smart Shopping:</h5>
          <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Buy staples in bulk during festivals</li>
            <li>• Check for seasonal price variations</li>
            <li>• Maintain 15-day emergency stock</li>
            <li>• Support local vendors for fresh produce</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-blue-200 dark:bg-blue-800 rounded-lg italic text-blue-800 dark:text-blue-200">"गृहे रम्ये रमन्ते देवा: | Gods reside in a well-organized home. A well-stocked and organized pantry ensures family health and happiness."</blockquote>
    </div>
  </div>
</div>
