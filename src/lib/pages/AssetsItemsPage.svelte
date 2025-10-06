<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import DashboardLayout from "../components/DashboardLayout.svelte";

  let searchTerm = "";
  let selectedCategory = "all";
  let selectedLocation = "all";
  let showAddModal = false;

  const categories = [
    { id: "furniture", name: "Furniture", icon: "heroicons:home", color: "text-brown-600" },
    { id: "appliances", name: "Appliances", icon: "heroicons:cpu-chip", color: "text-blue-600" },
    { id: "electronics", name: "Electronics", icon: "heroicons:device-phone-mobile", color: "text-purple-600" },
    { id: "kitchenware", name: "Kitchenware", icon: "heroicons:archive-box", color: "text-orange-600" },
    { id: "vehicles", name: "Vehicles", icon: "heroicons:truck", color: "text-cyan-600" },
    { id: "tools", name: "Tools", icon: "heroicons:wrench", color: "text-gray-600" },
    { id: "decor", name: "Decor & Rituals", icon: "heroicons:star", color: "text-yellow-600" },
  ];

  const locations = ["Living Room", "Bedroom", "Kitchen", "Pooja Room", "Terrace", "Garage", "Storage", "Lent Out"];

  const assets = [
    {
      id: 1,
      name: "Samsung Refrigerator",
      tamilName: "குளிர்சாதன பெட்டி",
      category: "appliances",
      location: "Kitchen",
      purchaseDate: "2020-03-15",
      purchasePrice: 45000,
      currentValue: 28000,
      condition: "excellent",
      warranty: "2025-03-15",
      brand: "Samsung",
      model: "RT28A3453S8",
      lastService: "2024-08-15",
      nextService: "2025-02-15",
      image: null,
      notes: "Double door, inverter technology. Very energy efficient.",
    },
    {
      id: 2,
      name: "Teak Wood Dining Table",
      tamilName: "தேக்கு மர உணவு மேசை",
      category: "furniture",
      location: "Living Room",
      purchaseDate: "2018-12-10",
      purchasePrice: 35000,
      currentValue: 32000,
      condition: "good",
      warranty: null,
      brand: "Local Carpenter",
      model: "Custom Made",
      lastService: "2024-06-01",
      nextService: "2025-06-01",
      image: null,
      notes: "Handcrafted by local carpenter. Seats 6 people comfortably.",
    },
    {
      id: 3,
      name: "Honda Activa 6G",
      tamilName: "ஹோண்டா ஆக்டிவா",
      category: "vehicles",
      location: "Garage",
      purchaseDate: "2022-01-20",
      purchasePrice: 75000,
      currentValue: 55000,
      condition: "excellent",
      warranty: "2025-01-20",
      brand: "Honda",
      model: "Activa 6G",
      lastService: "2024-09-15",
      nextService: "2024-12-15",
      image: null,
      notes: "Primary family vehicle. Excellent mileage and reliability.",
    },
    {
      id: 4,
      name: "Brass Pooja Lamp",
      tamilName: "பித்தளை தீபம்",
      category: "decor",
      location: "Pooja Room",
      purchaseDate: "2015-10-20",
      purchasePrice: 2500,
      currentValue: 3500,
      condition: "excellent",
      warranty: null,
      brand: "Traditional",
      model: "Handmade",
      lastService: "2024-10-01",
      nextService: "2024-11-01",
      image: null,
      notes: "Inherited from grandmother. Used in all festivals. Very precious to family.",
    },
  ];

  let filteredAssets = assets;
  let newAsset = {
    name: "",
    tamilName: "",
    category: "",
    location: "",
    purchaseDate: "",
    purchasePrice: "",
    brand: "",
    model: "",
    condition: "good",
    notes: "",
  };

  $: {
    filteredAssets = assets.filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.tamilName.toLowerCase().includes(searchTerm.toLowerCase()) || asset.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;
      const matchesLocation = selectedLocation === "all" || asset.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }

  onMount(() => {
    document.title = "Physical Assets - Assets Management";
  });

  function getConditionColor(condition) {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "poor":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getCategoryInfo(categoryId) {
    return categories.find((cat) => cat.id === categoryId) || { name: "Unknown", icon: "heroicons:question-mark-circle", color: "text-gray-500" };
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function isWarrantyExpiringSoon(warrantyDate) {
    if (!warrantyDate) return false;
    const today = new Date();
    const warranty = new Date(warrantyDate);
    const diffMonths = (warranty.getFullYear() - today.getFullYear()) * 12 + (warranty.getMonth() - today.getMonth());
    return diffMonths <= 3 && diffMonths >= 0;
  }

  function addAsset() {
    // Add asset logic would go here
    showAddModal = false;
    // Reset form
    newAsset = {
      name: "",
      tamilName: "",
      category: "",
      location: "",
      purchaseDate: "",
      purchasePrice: "",
      brand: "",
      model: "",
      condition: "good",
      notes: "",
    };
  }
</script>

<DashboardLayout>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl text-white shadow-lg">
          <Icon icon="heroicons:cube" class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Physical Assets</h1>
          <p class="text-gray-600 dark:text-gray-300">Complete inventory of all household items</p>
        </div>
      </div>
      <button class="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        <span>Add Asset</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Assets</label>
          <div class="relative">
            <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" bind:value={searchTerm} placeholder="Search by name, brand, or Tamil name..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select bind:value={selectedCategory} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
            <option value="all">All Categories</option>
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <select bind:value={selectedLocation} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
            <option value="all">All Locations</option>
            {#each locations as location}
              <option value={location}>{location}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Assets Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredAssets as asset}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
          <!-- Asset Image Placeholder -->
          <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center">
            <div class="text-center">
              <Icon icon={getCategoryInfo(asset.category).icon} class="w-16 h-16 {getCategoryInfo(asset.category).color} mx-auto mb-2" />
              <p class="text-sm text-gray-600 dark:text-gray-400">Photo coming soon</p>
            </div>
          </div>

          <div class="p-6">
            <!-- Asset Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{asset.name}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{asset.tamilName}</p>
                <div class="flex items-center space-x-2 mt-2">
                  <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    {getCategoryInfo(asset.category).name}
                  </span>
                  <span class="px-2 py-1 text-xs font-medium border rounded-full {getConditionColor(asset.condition)}">
                    {asset.condition}
                  </span>
                </div>
              </div>
            </div>

            <!-- Asset Details -->
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Brand:</span>
                <span class="font-medium text-gray-900 dark:text-white">{asset.brand}</span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Location:</span>
                <span class="font-medium text-gray-900 dark:text-white">{asset.location}</span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Purchase:</span>
                <span class="font-medium text-gray-900 dark:text-white">{formatCurrency(asset.purchasePrice)}</span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Current Value:</span>
                <span class="font-medium text-gray-900 dark:text-white">{formatCurrency(asset.currentValue)}</span>
              </div>

              {#if asset.warranty}
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Warranty:</span>
                  <span class="font-medium {isWarrantyExpiringSoon(asset.warranty) ? 'text-orange-600' : 'text-gray-900 dark:text-white'}">
                    {new Date(asset.warranty).toLocaleDateString()}
                    {#if isWarrantyExpiringSoon(asset.warranty)}
                      <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 inline ml-1 text-orange-500" />
                    {/if}
                  </span>
                </div>
              {/if}

              {#if asset.notes}
                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-sm text-gray-600 dark:text-gray-400">{asset.notes}</p>
                </div>
              {/if}
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2 mt-6">
              <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> View Details </button>
              <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Service Log </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredAssets.length === 0}
      <div class="text-center py-12">
        <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4">
          <Icon icon="heroicons:magnifying-glass" class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No assets found</h3>
        <p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
      </div>
    {/if}
  </div>
</DashboardLayout>

<!-- Add Asset Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Asset</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addAsset} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asset Name *</label>
              <input type="text" bind:value={newAsset.name} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Samsung Refrigerator" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tamil Name</label>
              <input type="text" bind:value={newAsset.tamilName} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., குளிர்சாதன பெட்டி" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select bind:value={newAsset.category} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select Category</option>
                {#each categories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
              <select bind:value={newAsset.location} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select Location</option>
                {#each locations as location}
                  <option value={location}>{location}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand *</label>
              <input type="text" bind:value={newAsset.brand} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Samsung, Honda" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model</label>
              <input type="text" bind:value={newAsset.model} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., RT28A3453S8" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purchase Date *</label>
              <input type="date" bind:value={newAsset.purchaseDate} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purchase Price (₹) *</label>
              <input type="number" bind:value={newAsset.purchasePrice} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="45000" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition</label>
              <select bind:value={newAsset.condition} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea bind:value={newAsset.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Any additional notes about this asset..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"> Add Asset </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
