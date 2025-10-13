<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "$lib/data/database.js";

  let currentTab = "kitchen";
  let currentView = "grid";
  let searchTerm = "";
  let showAddItem = false;
  let inventoryItems = [];

  const tabs = [
    { id: "kitchen", label: "Kitchen & Pantry", icon: "heroicons:archive-box" },
    { id: "appliances", label: "Appliances & Tools", icon: "heroicons:wrench-screwdriver" },
    { id: "furniture", label: "Furniture & Fixtures", icon: "heroicons:home" },
    { id: "pooja", label: "Pooja Items", icon: "heroicons:star" },
    { id: "cleaning", label: "Cleaning Supplies", icon: "heroicons:sparkles" },
    { id: "emergency", label: "Emergency Stock", icon: "heroicons:shield-check" },
  ];

  // Comprehensive Home Inventory for South Indian Family
  const inventoryData = {
    kitchen: [
      {
        name: "Ponni Rice",
        category: "kitchen",
        quantity: "25 kg",
        status: "in-stock",
        location: "Rice container - Main pantry",
        lastUpdated: "2024-01-10",
        expiryDate: "2024-10-30",
        cost: "₹1,625",
        supplier: "Local Grocery Store",
        culturalNote: "Tamil Nadu's favorite rice variety for daily meals",
        usage: "High - Daily consumption",
        minLevel: "5 kg",
        maxLevel: "30 kg",
      },
      {
        name: "Toor Dal",
        category: "kitchen",
        quantity: "3 kg",
        status: "in-stock",
        location: "Dal container - Pantry shelf",
        lastUpdated: "2024-01-08",
        expiryDate: "2024-08-15",
        cost: "₹420",
        supplier: "Wholesale Market",
        culturalNote: "Essential for daily sambar and rasam",
        usage: "High - Daily consumption",
        minLevel: "1 kg",
        maxLevel: "5 kg",
      },
      {
        name: "Coconut Oil (Cold Pressed)",
        category: "kitchen",
        quantity: "2 liters",
        status: "in-stock",
        location: "Oil shelf - Kitchen",
        lastUpdated: "2024-01-05",
        expiryDate: "2024-12-31",
        cost: "₹760",
        supplier: "Parachute Brand",
        culturalNote: "Traditional cooking oil for South Indian cuisine",
        usage: "High - Daily cooking",
        minLevel: "500 ml",
        maxLevel: "3 liters",
      },
      {
        name: "Sambar Powder",
        category: "kitchen",
        quantity: "200 grams",
        status: "low",
        location: "Spice rack - Level 1",
        lastUpdated: "2024-01-12",
        expiryDate: "2024-07-20",
        cost: "₹48",
        supplier: "Aachi Brand",
        culturalNote: "Essential spice blend for Tamil sambar",
        usage: "High - Daily sambar",
        minLevel: "100 grams",
        maxLevel: "500 grams",
      },
      {
        name: "Tamarind",
        category: "kitchen",
        quantity: "1 kg",
        status: "in-stock",
        location: "Spice container - Pantry",
        lastUpdated: "2024-01-01",
        expiryDate: "2024-12-31",
        cost: "₹150",
        supplier: "Local Vendor",
        culturalNote: "Souring agent for rasam, sambar, and chutneys",
        usage: "Medium - Regular cooking",
        minLevel: "300 grams",
        maxLevel: "2 kg",
      },
      {
        name: "Jaggery (Palm)",
        category: "kitchen",
        quantity: "500 grams",
        status: "in-stock",
        location: "Sweet shelf - Pantry",
        lastUpdated: "2024-01-03",
        expiryDate: "2024-08-30",
        cost: "₹60",
        supplier: "Organic Store",
        culturalNote: "Natural sweetener for payasam and sweets",
        usage: "Low - Festival cooking",
        minLevel: "200 grams",
        maxLevel: "1 kg",
      },
    ],
    appliances: [
      {
        name: "Wet Grinder (Ultra)",
        category: "appliances",
        quantity: "1 unit",
        status: "in-stock",
        location: "Kitchen counter - Corner",
        lastUpdated: "2024-01-15",
        purchaseDate: "2022-03-15",
        cost: "₹8,500",
        supplier: "Ultra Appliances",
        culturalNote: "Essential for grinding idli/dosa batter and chutneys",
        usage: "High - Daily breakfast prep",
        warranty: "2 years (Active)",
        lastService: "2023-12-10",
      },
      {
        name: "Pressure Cooker (5L)",
        category: "appliances",
        quantity: "2 units",
        status: "in-stock",
        location: "Kitchen shelf - Above stove",
        lastUpdated: "2024-01-10",
        purchaseDate: "2021-08-20",
        cost: "₹3,200",
        supplier: "Hawkins",
        culturalNote: "For cooking rice, dal, and pressure-cooked vegetables",
        usage: "High - Daily cooking",
        warranty: "5 years (Active)",
        lastService: "N/A",
      },
      {
        name: "Ceiling Fan (Bedroom)",
        category: "appliances",
        quantity: "1 unit",
        status: "needs-repair",
        location: "Paati's bedroom",
        lastUpdated: "2024-01-14",
        purchaseDate: "2020-05-10",
        cost: "₹3,500",
        supplier: "Usha",
        culturalNote: "Essential for comfortable sleep in tropical climate",
        usage: "High - Daily use",
        warranty: "2 years (Expired)",
        issueReported: "Making noise, needs bearing replacement",
      },
      {
        name: "Water Purifier (RO)",
        category: "appliances",
        quantity: "1 unit",
        status: "in-stock",
        location: "Kitchen - Wall mounted",
        lastUpdated: "2024-01-08",
        purchaseDate: "2023-01-15",
        cost: "₹12,000",
        supplier: "Kent",
        culturalNote: "Ensures clean drinking water for family health",
        usage: "High - Daily consumption",
        warranty: "3 years (Active)",
        lastService: "2023-11-20",
      },
      {
        name: "Gas Stove (4 Burner)",
        category: "appliances",
        quantity: "1 unit",
        status: "in-stock",
        location: "Kitchen - Main cooking area",
        lastUpdated: "2024-01-05",
        purchaseDate: "2021-12-08",
        cost: "₹6,800",
        supplier: "Glen",
        culturalNote: "Primary cooking appliance for South Indian cuisine",
        usage: "High - Daily cooking",
        warranty: "2 years (Expired)",
        lastService: "2023-10-15",
      },
    ],
    furniture: [
      {
        name: "Teak Wood Cot (Queen)",
        category: "furniture",
        quantity: "1 unit",
        status: "in-stock",
        location: "Master bedroom",
        lastUpdated: "2024-01-01",
        purchaseDate: "2019-06-20",
        cost: "₹45,000",
        supplier: "Local Carpenter",
        culturalNote: "Traditional South Indian bedroom furniture",
        usage: "High - Daily sleep",
        maintenance: "Annual oiling and polishing required",
        condition: "Good",
      },
      {
        name: "Pooja Shelf (Teak)",
        category: "furniture",
        quantity: "1 unit",
        status: "in-stock",
        location: "Pooja room",
        lastUpdated: "2024-01-12",
        purchaseDate: "2020-02-14",
        cost: "₹18,000",
        supplier: "Traditional Furniture Store",
        culturalNote: "Sacred space for daily prayers and idol placement",
        usage: "High - Daily prayers",
        maintenance: "Regular cleaning with turmeric water",
        condition: "Excellent",
      },
      {
        name: "Dining Table (6-seater)",
        category: "furniture",
        quantity: "1 unit",
        status: "in-stock",
        location: "Dining hall",
        lastUpdated: "2024-01-10",
        purchaseDate: "2021-11-25",
        cost: "₹22,000",
        supplier: "Nilkamal",
        culturalNote: "Family gathering space for meals and discussions",
        usage: "High - Daily meals",
        maintenance: "Weekly polishing",
        condition: "Good",
      },
      {
        name: "Sofa Set (3+2)",
        category: "furniture",
        quantity: "1 set",
        status: "in-stock",
        location: "Living room",
        lastUpdated: "2024-01-08",
        purchaseDate: "2022-04-18",
        cost: "₹35,000",
        supplier: "Hometown",
        culturalNote: "Comfortable seating for guests and family relaxation",
        usage: "Medium - Evening and weekends",
        maintenance: "Quarterly deep cleaning",
        condition: "Very Good",
      },
      {
        name: "Study Table",
        category: "furniture",
        quantity: "2 units",
        status: "in-stock",
        location: "Akka & Thambi's rooms",
        lastUpdated: "2024-01-05",
        purchaseDate: "2021-06-10",
        cost: "₹8,000",
        supplier: "Durian",
        culturalNote: "Dedicated study space for children's education",
        usage: "High - Daily studies",
        maintenance: "Regular dusting",
        condition: "Good",
      },
    ],
    pooja: [
      {
        name: "Brass Oil Lamps",
        category: "pooja",
        quantity: "6 units",
        status: "in-stock",
        location: "Pooja shelf - Bottom row",
        lastUpdated: "2024-01-12",
        purchaseDate: "2020-03-25",
        cost: "₹1,200",
        supplier: "Temple Store",
        culturalNote: "Traditional lamps for daily evening prayers",
        usage: "High - Daily prayers",
        maintenance: "Weekly brass polishing",
        spiritualSignificance: "Light dispels darkness - spiritual symbolism",
      },
      {
        name: "Camphor",
        category: "pooja",
        quantity: "100 grams",
        status: "in-stock",
        location: "Pooja shelf - Small container",
        lastUpdated: "2024-01-10",
        expiryDate: "2025-12-31",
        cost: "₹25",
        supplier: "Temple Store",
        culturalNote: "Pure white camphor for arati and prayers",
        usage: "Medium - Daily prayers",
        minLevel: "25 grams",
        spiritualSignificance: "Purification and offering to deities",
      },
      {
        name: "Kumkum & Turmeric",
        category: "pooja",
        quantity: "200 grams each",
        status: "in-stock",
        location: "Pooja shelf - Small boxes",
        lastUpdated: "2024-01-08",
        expiryDate: "2024-12-31",
        cost: "₹40",
        supplier: "Temple Store",
        culturalNote: "Sacred powders for tilaka and deity decoration",
        usage: "Medium - Daily prayers and festivals",
        minLevel: "50 grams each",
        spiritualSignificance: "Auspicious colors for divine blessings",
      },
      {
        name: "Incense Sticks (Agarbatti)",
        category: "pooja",
        quantity: "5 packets",
        status: "in-stock",
        location: "Pooja shelf - Side drawer",
        lastUpdated: "2024-01-05",
        expiryDate: "2025-06-30",
        cost: "₹100",
        supplier: "Cycle Brand",
        culturalNote: "Fragrant incense for creating sacred atmosphere",
        usage: "High - Daily prayers",
        minLevel: "2 packets",
        spiritualSignificance: "Pleasant aroma attracts divine presence",
      },
      {
        name: "Brass Pooja Vessels",
        category: "pooja",
        quantity: "8 pieces",
        status: "in-stock",
        location: "Pooja shelf - Top compartment",
        lastUpdated: "2024-01-01",
        purchaseDate: "2019-08-15",
        cost: "₹2,500",
        supplier: "Traditional Brass Store",
        culturalNote: "Traditional vessels for offerings and prayers",
        usage: "Medium - Weekly detailed pooja",
        maintenance: "Monthly brass cleaning with tamarind",
        spiritualSignificance: "Pure metal for divine offerings",
      },
    ],
    cleaning: [
      {
        name: "Mop & Bucket",
        category: "cleaning",
        quantity: "2 sets",
        status: "in-stock",
        location: "Cleaning cupboard - Utility area",
        lastUpdated: "2024-01-10",
        purchaseDate: "2023-08-20",
        cost: "₹800",
        supplier: "Gala",
        culturalNote: "Daily floor cleaning for home hygiene",
        usage: "High - Daily cleaning",
        maintenance: "Regular cleaning and sun-drying",
        replacement: "Every 6 months",
      },
      {
        name: "Phenyl Concentrate",
        category: "cleaning",
        quantity: "2 liters",
        status: "in-stock",
        location: "Cleaning cupboard - Bottom shelf",
        lastUpdated: "2024-01-08",
        expiryDate: "2025-12-31",
        cost: "₹120",
        supplier: "Lizol",
        culturalNote: "Traditional floor disinfectant for Indian homes",
        usage: "Medium - Weekly floor cleaning",
        minLevel: "500 ml",
        safetyNote: "Keep away from children",
      },
      {
        name: "Detergent Powder",
        category: "cleaning",
        quantity: "2 kg",
        status: "in-stock",
        location: "Washing machine area",
        lastUpdated: "2024-01-05",
        expiryDate: "2025-06-30",
        cost: "₹240",
        supplier: "Ariel",
        culturalNote: "For washing family clothes and linens",
        usage: "High - Daily washing",
        minLevel: "500 grams",
        environmentalNote: "Biodegradable formula preferred",
      },
      {
        name: "Toilet Cleaner",
        category: "cleaning",
        quantity: "3 bottles",
        status: "in-stock",
        location: "Bathroom cleaning shelf",
        lastUpdated: "2024-01-03",
        expiryDate: "2025-03-31",
        cost: "₹180",
        supplier: "Harpic",
        culturalNote: "Essential for bathroom hygiene",
        usage: "Medium - Weekly deep cleaning",
        minLevel: "1 bottle",
        safetyNote: "Wear gloves while using",
      },
      {
        name: "Coconut Coir Broom",
        category: "cleaning",
        quantity: "3 units",
        status: "in-stock",
        location: "Balcony cleaning corner",
        lastUpdated: "2024-01-01",
        purchaseDate: "2023-11-15",
        cost: "₹150",
        supplier: "Local Vendor",
        culturalNote: "Traditional South Indian broom for sweeping",
        usage: "High - Daily sweeping",
        maintenance: "Sun-dry weekly",
        replacement: "Every 3 months",
      },
    ],
    emergency: [
      {
        name: "Emergency Torch",
        category: "emergency",
        quantity: "2 units",
        status: "in-stock",
        location: "Emergency kit - Hall cupboard",
        lastUpdated: "2024-01-12",
        purchaseDate: "2023-05-10",
        cost: "₹400",
        supplier: "Eveready",
        culturalNote: "Essential for power outages during monsoon",
        usage: "Low - Emergency only",
        batteryStatus: "Full charge",
        lastTested: "2024-01-12",
      },
      {
        name: "First Aid Kit",
        category: "emergency",
        quantity: "1 kit",
        status: "in-stock",
        location: "Medicine cabinet - Master bedroom",
        lastUpdated: "2024-01-10",
        expiryDate: "Check individual items",
        cost: "₹800",
        supplier: "Apollo Pharmacy",
        culturalNote: "Basic medical supplies for family emergencies",
        usage: "Low - Emergency only",
        contents: "Bandages, antiseptic, thermometer, basic medicines",
        lastChecked: "2024-01-10",
      },
      {
        name: "Candles",
        category: "emergency",
        quantity: "20 pieces",
        status: "in-stock",
        location: "Emergency kit - Hall cupboard",
        lastUpdated: "2024-01-08",
        expiryDate: "No expiry",
        cost: "₹60",
        supplier: "Local Store",
        culturalNote: "Backup lighting during power cuts",
        usage: "Low - Emergency and festivals",
        safetyNote: "Keep matches separately for safety",
        lastUsed: "2023-12-25",
      },
      {
        name: "Emergency Water Storage",
        category: "emergency",
        quantity: "20 liters",
        status: "in-stock",
        location: "Terrace - Water tank",
        lastUpdated: "2024-01-05",
        cost: "₹0",
        supplier: "Municipal water",
        culturalNote: "Reserve water for supply interruptions",
        usage: "Low - Emergency only",
        maintenance: "Monthly cleaning and refilling",
        lastCleaned: "2024-01-01",
      },
      {
        name: "Emergency Phone Battery Pack",
        category: "emergency",
        quantity: "1 unit",
        status: "in-stock",
        location: "Emergency kit - Hall cupboard",
        lastUpdated: "2024-01-03",
        purchaseDate: "2023-09-20",
        cost: "₹1,200",
        supplier: "MI",
        culturalNote: "Communication backup during emergencies",
        usage: "Low - Emergency only",
        batteryStatus: "80% charge",
        lastCharged: "2024-01-03",
      },
    ],
  };

  function getCurrentItems() {
    const items = inventoryData[currentTab] || [];
    if (!searchTerm) return items;

    return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.culturalNote.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case "in-stock":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "low":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "expired":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "needs-repair":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20";
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
    const level = usage?.split(" - ")[0];
    return colors[level] || "text-gray-600 bg-gray-100";
  }

  function isExpiringSoon(expiryDate) {
    if (!expiryDate || expiryDate === "No expiry" || expiryDate === "Check individual items") return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  }

  function getInventoryStats() {
    const allItems = Object.values(inventoryData).flat();
    return {
      total: allItems.length,
      inStock: allItems.filter((item) => item.status === "in-stock").length,
      lowStock: allItems.filter((item) => item.status === "low").length,
      needsRepair: allItems.filter((item) => item.status === "needs-repair").length,
      expiringSoon: allItems.filter((item) => isExpiringSoon(item.expiryDate)).length,
    };
  }

  onMount(() => {
    document.title = "Home Inventory - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white">
            <Icon icon="heroicons:home" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Home Inventory Management</h1>
            <p class="text-gray-600 dark:text-gray-300">गृह सम्पत्ति | Complete tracking of household items and supplies</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors" on:click={() => (showAddItem = true)}>
            <Icon icon="heroicons:plus" class="w-5 h-5" />
            <span>Add Item</span>
          </button>
          <div class="flex rounded-lg border border-gray-300 dark:border-gray-600">
            <button class="px-3 py-2 {currentView === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600'} rounded-l-lg" on:click={() => (currentView = "grid")}>
              <Icon icon="heroicons:squares-2x2" class="w-4 h-4" />
            </button>
            <button class="px-3 py-2 {currentView === 'list' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600'} rounded-r-lg" on:click={() => (currentView = "list")}>
              <Icon icon="heroicons:list-bullet" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Inventory Philosophy -->
      <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:archive-box" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">गृह व्यवस्था | Household Organization</h3>
            <p class="text-white/90">"यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवता: | Where the household is well-organized and supplies are managed wisely, prosperity and peace reside. Every item has its place and purpose."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "வீட்டு பொருட்கள் ஒழுங்காக இருந்தால் வாழ்க்கை வளம் பெறும்"</p>
          </div>
        </div>
      </div>

      <!-- Inventory Stats -->
      {#if true}
        {@const stats = getInventoryStats()}
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-emerald-600">{stats.total}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-green-600">{stats.inStock}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">In Stock</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Low Stock</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-orange-600">{stats.needsRepair}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Needs Repair</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-red-600">{stats.expiringSoon}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Expiring Soon</div>
          </div>
        </div>
      {/if}

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" bind:value={searchTerm} placeholder="Search inventory items, locations, or cultural notes..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-emerald-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Item Count -->
    <div class="mb-6">
      <p class="text-gray-600 dark:text-gray-400">
        Showing {getCurrentItems().length} items in {tabs.find((tab) => tab.id === currentTab)?.label}
        {#if searchTerm}for "{searchTerm}"{/if}
      </p>
    </div>

    <!-- Inventory Display -->
    {#if currentView === "grid"}
      <!-- Grid View -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each getCurrentItems() as item}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-emerald-200 dark:border-emerald-700">
            <!-- Item Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                <div class="flex items-center space-x-2 mb-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(item.status)}">
                    {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  {#if item.usage}
                    <span class="px-2 py-1 text-xs font-medium rounded-full {getUsageColor(item.usage)}">
                      {item.usage.split(" - ")[0]} use
                    </span>
                  {/if}
                </div>
              </div>
              {#if isExpiringSoon(item.expiryDate)}
                <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-500" />
              {/if}
            </div>

            <!-- Item Details -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Quantity:</span>
                <span class="font-medium">{item.quantity}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Cost:</span>
                <span class="font-medium text-emerald-600">{item.cost}</span>
              </div>
              {#if item.expiryDate && item.expiryDate !== "No expiry"}
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Expires:</span>
                  <span class="font-medium {isExpiringSoon(item.expiryDate) ? 'text-red-600' : ''}">{item.expiryDate}</span>
                </div>
              {/if}
            </div>

            <!-- Location -->
            <div class="mb-4">
              <div class="flex items-center text-sm mb-1">
                <Icon icon="heroicons:map-pin" class="w-4 h-4 mr-2 text-blue-500" />
                <span class="text-gray-600 dark:text-gray-400">Location:</span>
              </div>
              <p class="text-sm font-medium pl-6">{item.location}</p>
            </div>

            <!-- Cultural Note -->
            {#if item.culturalNote}
              <div class="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg mb-4">
                <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-1 flex items-center">
                  <Icon icon="heroicons:star" class="w-4 h-4 mr-2" />
                  Cultural Note
                </h4>
                <p class="text-sm text-orange-800 dark:text-orange-200">{item.culturalNote}</p>
              </div>
            {/if}

            <!-- Additional Info -->
            {#if item.warranty || item.lastService || item.maintenance}
              <div class="mb-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Maintenance Info:</h4>
                <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {#if item.warranty}
                    <div>Warranty: {item.warranty}</div>
                  {/if}
                  {#if item.lastService}
                    <div>Last Service: {item.lastService}</div>
                  {/if}
                  {#if item.maintenance}
                    <div>Maintenance: {item.maintenance}</div>
                  {/if}
                </div>
              </div>
            {/if}

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button class="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"> Update </button>
              {#if item.status === "low"}
                <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"> Restock </button>
              {:else if item.status === "needs-repair"}
                <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"> Repair </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- List View -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-emerald-50 dark:bg-emerald-900/20">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">Item</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">Cost</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
              {#each getCurrentItems() as item}
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{item.culturalNote}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.quantity}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(item.status)}">
                      {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.location}</td>
                  <td class="px-6 py-4 text-sm font-medium text-emerald-600">{item.cost}</td>
                  <td class="px-6 py-4 text-sm">
                    <div class="flex space-x-2">
                      <button class="text-emerald-600 hover:text-emerald-900">Edit</button>
                      {#if item.status === "low"}
                        <button class="text-orange-600 hover:text-orange-900">Restock</button>
                      {:else if item.status === "needs-repair"}
                        <button class="text-red-600 hover:text-red-900">Repair</button>
                      {/if}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}

    {#if getCurrentItems().length === 0}
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
          <button class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors" on:click={() => (searchTerm = "")}> Clear Search </button>
        {/if}
      </div>
    {/if}

    <!-- Inventory Management Tips -->
    <div class="mt-12 p-6 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-xl">
      <h4 class="font-bold text-teal-800 dark:text-teal-200 mb-4 flex items-center">
        <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
        गृह प्रबन्धन सूत्र | Home Management Tips
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-teal-700 dark:text-teal-300 mb-2">Organization Principles:</h5>
          <ul class="text-sm text-teal-700 dark:text-teal-300 space-y-1">
            <li>• Categorize items by usage frequency and type</li>
            <li>• Label everything clearly with Tamil and English</li>
            <li>• Keep similar items together in designated areas</li>
            <li>• Regular audits prevent overstocking and waste</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-teal-700 dark:text-teal-300 mb-2">Maintenance Schedule:</h5>
          <ul class="text-sm text-teal-700 dark:text-teal-300 space-y-1">
            <li>• Weekly: Check expiry dates and low stock items</li>
            <li>• Monthly: Deep clean storage areas and update inventory</li>
            <li>• Quarterly: Service appliances and repair furniture</li>
            <li>• Annually: Replace emergency supplies and review needs</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-teal-200 dark:bg-teal-800 rounded-lg italic text-teal-800 dark:text-teal-200">"स्वच्छता देवत्वस्य मूलम् | Cleanliness and organization are the foundation of divine living. A well-managed home creates harmony and prosperity for the entire family."</blockquote>
    </div>
  </div>
</div>
