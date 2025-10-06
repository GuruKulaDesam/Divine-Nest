<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "pantry";
  const tabs = [
    { id: "pantry", label: "Pantry Inventory", icon: "heroicons:archive-box" },
    { id: "shopping", label: "Shopping List", icon: "heroicons:shopping-cart" },
    { id: "meal-prep", label: "Meal Prep", icon: "heroicons:calendar-days" },
  ];

  let pantryItems = [];
  let shoppingList = [];
  let searchQuery = "";
  let showAddModal = false;
  let selectedCategory = "all";

  const categories = ["grains", "vegetables", "fruits", "dairy", "spices", "snacks", "beverages", "other"];

  let newItem = {
    name: "",
    category: "grains",
    quantity: "",
    unit: "kg",
    expiryDate: "",
    location: "pantry",
    notes: "",
  };

  $: filteredItems = pantryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  async function loadPantryItems() {
    try {
      pantryItems = (await db.pantryItems?.toArray()) || [];
      shoppingList = (await db.shoppingList?.toArray()) || [];
    } catch (error) {
      console.error("Error loading pantry items:", error);
    }
  }

  async function saveItem() {
    try {
      if (newItem.name && newItem.quantity) {
        await db.pantryItems?.add({
          ...newItem,
          id: Date.now(),
          createdAt: new Date(),
          status: "in-stock",
        });
        await loadPantryItems();
        resetForm();
        showAddModal = false;
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  }

  function resetForm() {
    newItem = {
      name: "",
      category: "grains",
      quantity: "",
      unit: "kg",
      expiryDate: "",
      location: "pantry",
      notes: "",
    };
  }

  function getCategoryIcon(category) {
    const icons = {
      grains: "heroicons:cube",
      vegetables: "heroicons:leaf",
      fruits: "heroicons:heart",
      dairy: "heroicons:beaker",
      spices: "heroicons:sparkles",
      snacks: "heroicons:gift",
      beverages: "heroicons:glass-water",
      other: "heroicons:archive-box",
    };
    return icons[category] || "heroicons:archive-box";
  }

  function getCategoryColor(category) {
    const colors = {
      grains: "text-yellow-500",
      vegetables: "text-green-500",
      fruits: "text-red-500",
      dairy: "text-blue-500",
      spices: "text-orange-500",
      snacks: "text-purple-500",
      beverages: "text-cyan-500",
      other: "text-gray-500",
    };
    return colors[category] || "text-gray-500";
  }

  onMount(() => {
    document.title = "Grocery & Pantry - Family App";
    loadPantryItems();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 dark:from-gray-900 dark:via-green-900/20 dark:to-yellow-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl text-white">
            <Icon icon="heroicons:shopping-cart" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Grocery & Pantry</h1>
            <p class="text-gray-600 dark:text-gray-300">Manage your kitchen inventory and shopping lists</p>
          </div>
        </div>
        <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg" on:click={() => (showAddModal = true)}>
          <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
          Add Item
        </button>
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

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "pantry"}
        <!-- Pantry Inventory -->
        <div class="mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Items</label>
              <input type="text" bind:value={searchQuery} placeholder="Search pantry items..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select bind:value={selectedCategory} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="all">All Categories</option>
                {#each categories as category}
                  <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <!-- Pantry Items Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each filteredItems as item (item.id)}
            <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <Icon icon={getCategoryIcon(item.category)} class="w-5 h-5 {getCategoryColor(item.category)}" />
                  <h3 class="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                </div>
                <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full">
                  {item.status || "in-stock"}
                </span>
              </div>

              <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div class="flex justify-between">
                  <span>Quantity:</span>
                  <span class="font-medium">{item.quantity} {item.unit}</span>
                </div>
                <div class="flex justify-between">
                  <span>Location:</span>
                  <span class="font-medium">{item.location}</span>
                </div>
                {#if item.expiryDate}
                  <div class="flex justify-between">
                    <span>Expires:</span>
                    <span class="font-medium">{new Date(item.expiryDate).toLocaleDateString()}</span>
                  </div>
                {/if}
                {#if item.notes}
                  <div class="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <p class="text-xs">{item.notes}</p>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        {#if filteredItems.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:archive-box" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No pantry items found</h3>
            <p class="text-gray-400 dark:text-gray-500">Add items to track your pantry inventory</p>
          </div>
        {/if}
      {:else if currentTab === "shopping"}
        <div class="text-center py-12">
          <Icon icon="heroicons:shopping-cart" class="w-16 h-16 mx-auto text-green-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Shopping List</h3>
          <p class="text-gray-500 dark:text-gray-400">Create and manage your shopping lists</p>
        </div>
      {:else if currentTab === "meal-prep"}
        <div class="text-center py-12">
          <Icon icon="heroicons:calendar-days" class="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Meal Prep Planning</h3>
          <p class="text-gray-500 dark:text-gray-400">Plan your meals and grocery shopping</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Add Item Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Add Pantry Item</h2>
          <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={saveItem} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name *</label>
            <input type="text" bind:value={newItem.name} placeholder="e.g., Basmati Rice" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select bind:value={newItem.category} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                {#each categories as category}
                  <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <select bind:value={newItem.location} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="pantry">Pantry</option>
                <option value="refrigerator">Refrigerator</option>
                <option value="freezer">Freezer</option>
                <option value="cabinet">Cabinet</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
              <input type="text" bind:value={newItem.quantity} placeholder="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
              <select bind:value={newItem.unit} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="pieces">pieces</option>
                <option value="bottles">bottles</option>
                <option value="packets">packets</option>
                <option value="cans">cans</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
            <input type="date" bind:value={newItem.expiryDate} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
            <textarea bind:value={newItem.notes} placeholder="Any additional notes..." rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"> Add Item </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
