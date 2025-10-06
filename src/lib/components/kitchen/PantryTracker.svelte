<script>
  import Icon from "@iconify/svelte";
  import { PantryCategories } from "../../data/kitchenData.js";

  export let selectedProfile = "family";

  let selectedCategory = "staples";
  let showAddItemModal = false;
  let stockFilter = "all"; // all, low, expired

  // Calculate stock status
  function getStockStatus(item) {
    if (item.quantity <= item.minStock * 0.5) return "critical";
    if (item.quantity <= item.minStock) return "low";
    return "good";
  }

  function getStockColor(status) {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "low":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  }

  function isExpiringSoon(expiry) {
    if (!expiry) return false;
    const today = new Date();
    const expiryDate = new Date(expiry);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }

  function isExpired(expiry) {
    if (!expiry) return false;
    const today = new Date();
    const expiryDate = new Date(expiry);
    return expiryDate < today;
  }

  // Filter items based on current filter
  $: filteredItems = PantryCategories[selectedCategory].items.filter((item) => {
    if (stockFilter === "low") {
      return getStockStatus(item) === "low" || getStockStatus(item) === "critical";
    }
    if (stockFilter === "expired") {
      return isExpired(item.expiry) || isExpiringSoon(item.expiry);
    }
    return true;
  });

  // Generate shopping list
  function generateShoppingList() {
    const shoppingList = [];
    Object.values(PantryCategories).forEach((category) => {
      category.items.forEach((item) => {
        if (getStockStatus(item) === "low" || getStockStatus(item) === "critical") {
          shoppingList.push({
            name: item.name,
            tamil: item.tamil,
            category: category.name,
            needed: Math.max(item.minStock * 2 - item.quantity, 0),
            unit: item.unit,
          });
        }
      });
    });
    return shoppingList;
  }

  let shoppingList = generateShoppingList();
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Pantry Tracker</h2>
      <p class="text-gray-600">அடுக்களை கண்காணிப்பு - Ingredient inventory & stock management</p>
    </div>
    <div class="flex space-x-2">
      <button on:click={() => (showAddItemModal = true)} class="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        <span>Add Item</span>
      </button>
      <button class="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        <Icon icon="heroicons:shopping-cart" class="w-4 h-4" />
        <span>Shopping List</span>
      </button>
    </div>
  </div>

  <!-- Filter Tabs -->
  <div class="flex space-x-4 mb-6">
    <button on:click={() => (stockFilter = "all")} class="px-4 py-2 rounded-lg transition-colors {stockFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"> All Items </button>
    <button on:click={() => (stockFilter = "low")} class="px-4 py-2 rounded-lg transition-colors {stockFilter === 'low' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"> Low Stock </button>
    <button on:click={() => (stockFilter = "expired")} class="px-4 py-2 rounded-lg transition-colors {stockFilter === 'expired' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"> Expiring Soon </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Category Sidebar -->
    <div class="lg:col-span-1">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div class="space-y-2">
        {#each Object.entries(PantryCategories) as [key, category]}
          <button on:click={() => (selectedCategory = key)} class="w-full flex items-center space-x-3 p-3 rounded-lg transition-all text-left {selectedCategory === key ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}">
            <Icon icon={category.icon} class="w-5 h-5" />
            <div>
              <div class="font-medium">{category.name}</div>
              <div class="text-xs opacity-75">{category.tamil}</div>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Items Grid -->
    <div class="lg:col-span-3">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each filteredItems as item}
          {@const status = getStockStatus(item)}
          {@const isExpiringSoonItem = isExpiringSoon(item.expiry)}
          {@const isExpiredItem = isExpired(item.expiry)}

          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{item.name}</h4>
                <p class="text-sm text-gray-600">{item.tamil}</p>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-gray-900">{item.quantity}</div>
                <div class="text-sm text-gray-500">{item.unit}</div>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="mb-3">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-gray-600">Stock Level</span>
                <span class="text-xs px-2 py-1 rounded {getStockColor(status)} border">
                  {status.toUpperCase()}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full transition-all {status === 'critical' ? 'bg-red-500' : status === 'low' ? 'bg-orange-500' : 'bg-green-500'}" style="width: {Math.min((item.quantity / (item.minStock * 2)) * 100, 100)}%"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>Min: {item.minStock}{item.unit}</span>
                <span>Current: {item.quantity}{item.unit}</span>
              </div>
            </div>

            <!-- Expiry Info -->
            {#if item.expiry}
              <div class="mb-3">
                <div class="flex items-center space-x-1 text-sm">
                  <Icon icon="heroicons:calendar" class="w-4 h-4" />
                  <span class="text-gray-600">Expires:</span>
                  <span class={isExpiredItem ? "text-red-600 font-semibold" : isExpiringSoonItem ? "text-orange-600 font-medium" : "text-gray-700"}>
                    {new Date(item.expiry).toLocaleDateString("en-IN")}
                  </span>
                </div>
                {#if isExpiredItem}
                  <div class="text-xs text-red-600 mt-1">⚠️ Expired - Replace immediately</div>
                {:else if isExpiringSoonItem}
                  <div class="text-xs text-orange-600 mt-1">⏰ Use soon - Expires in {Math.ceil((new Date(item.expiry) - new Date()) / (1000 * 60 * 60 * 24))} days</div>
                {/if}
              </div>
            {/if}

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button class="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <Icon icon="heroicons:plus" class="w-4 h-4 inline mr-1" />
                Add Stock
              </button>
              <button class="flex-1 px-3 py-2 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                <Icon icon="heroicons:pencil" class="w-4 h-4 inline mr-1" />
                Edit
              </button>
            </div>
          </div>
        {/each}
      </div>

      {#if filteredItems.length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:archive-box" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p class="text-gray-600">
            {#if stockFilter === "low"}
              All items are well stocked! 🎉
            {:else if stockFilter === "expired"}
              No items are expiring soon. Great!
            {:else}
              This category is empty. Add some items to get started.
            {/if}
          </p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Shopping List Sidebar -->
  {#if shoppingList.length > 0}
    <div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h3 class="text-lg font-semibold text-green-900 mb-4 flex items-center">
        <Icon icon="heroicons:shopping-cart" class="w-5 h-5 mr-2" />
        Shopping List
        <span class="text-sm text-green-700 ml-2">खरीदारी सूची</span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each shoppingList as item}
          <div class="flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg">
            <div>
              <div class="font-medium text-green-900">{item.name}</div>
              <div class="text-sm text-green-700">{item.tamil}</div>
              <div class="text-xs text-green-600">{item.category}</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-green-900">{item.needed.toFixed(1)}</div>
              <div class="text-sm text-green-700">{item.unit}</div>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-green-700">
          Total items: {shoppingList.length}
        </div>
        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
            <Icon icon="heroicons:share" class="w-4 h-4 inline mr-1" />
            Share List
          </button>
          <button class="px-4 py-2 bg-white text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors text-sm">
            <Icon icon="heroicons:document-text" class="w-4 h-4 inline mr-1" />
            Print
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
