<script>
  import { onMount } from "svelte";
  import { db } from "$lib/data/database.js";

  let groceryItems = [];
  let showAddForm = false;
  let searchTerm = "";
  let filterCategory = "all";
  let marketMode = "weekly";

  // Form data
  let newItem = {
    name: "",
    quantity: 1,
    category: "vegetables",
    inStock: true,
  };

  const categories = [
    { value: "vegetables", label: "Vegetables", icon: "🥕" },
    { value: "fruits", label: "Fruits", icon: "🍎" },
    { value: "grains", label: "Grains", icon: "🌾" },
    { value: "spices", label: "Spices", icon: "🌶️" },
    { value: "dairy", label: "Dairy", icon: "🥛" },
    { value: "oils", label: "Oils", icon: "🫒" },
  ];

  onMount(async () => {
    await loadGroceryItems();
  });

  async function loadGroceryItems() {
    groceryItems = await db.groceryItems.toArray();
  }

  async function handleAddItem() {
    if (!newItem.name.trim()) return;

    const item = {
      ...newItem,
      id: Date.now().toString(),
      lastUpdated: new Date(),
      marketMode,
    };

    await db.groceryItems.add(item);
    await loadGroceryItems();

    // Reset form
    newItem = { name: "", quantity: 1, category: "vegetables", inStock: true };
    showAddForm = false;
  }

  async function toggleStockStatus(item) {
    await db.groceryItems.update(item.id, { inStock: !item.inStock, lastUpdated: new Date() });
    await loadGroceryItems();
  }

  async function updateQuantity(item, newQuantity) {
    if (newQuantity < 0) return;
    await db.groceryItems.update(item.id, { quantity: newQuantity, lastUpdated: new Date() });
    await loadGroceryItems();
  }

  async function removeItem(item) {
    if (confirm(`Remove ${item.name} from pantry?`)) {
      await db.groceryItems.delete(item.id);
      await loadGroceryItems();
    }
  }

  $: filteredItems = groceryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  $: lowStockItems = filteredItems.filter((item) => item.quantity <= 2 && item.inStock);
  $: outOfStockItems = filteredItems.filter((item) => !item.inStock);
</script>

<div class="space-y-6">
  <!-- Header with Search and Filters -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-gray-800">🛒 Grocery & Pantry Tracker</h2>
      <p class="text-gray-600">Keep track of household supplies and generate shopping lists</p>
    </div>

    <div class="flex gap-2">
      <select bind:value={marketMode} class="px-3 py-2 border border-gray-300 rounded-lg">
        <option value="weekly">Weekly Market</option>
        <option value="monthly">Monthly Stock</option>
        <option value="festival">Festival Prep</option>
      </select>

      <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
        <span>+</span>
        Add Item
      </button>
    </div>
  </div>

  <!-- Search and Filter Bar -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <input type="text" placeholder="Search pantry items..." bind:value={searchTerm} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
    </div>

    <select bind:value={filterCategory} class="px-4 py-2 border border-gray-300 rounded-lg">
      <option value="all">All Categories</option>
      {#each categories as category}
        <option value={category.value}>{category.icon} {category.label}</option>
      {/each}
    </select>
  </div>

  <!-- Add Item Form -->
  {#if showAddForm}
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h3 class="font-semibold text-orange-800 mb-3">Add New Pantry Item</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Item name" bind:value={newItem.name} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <select bind:value={newItem.category} class="px-3 py-2 border border-gray-300 rounded-lg">
          {#each categories as category}
            <option value={category.value}>{category.icon} {category.label}</option>
          {/each}
        </select>

        <input type="number" placeholder="Quantity" bind:value={newItem.quantity} min="0" step="0.5" class="px-3 py-2 border border-gray-300 rounded-lg" />

        <div class="flex items-center gap-2">
          <input type="checkbox" id="inStock" bind:checked={newItem.inStock} class="rounded" />
          <label for="inStock" class="text-sm">In stock</label>
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={handleAddItem}> Add Item </button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={() => (showAddForm = false)}> Cancel </button>
      </div>
    </div>
  {/if}

  <!-- Alerts -->
  {#if lowStockItems.length > 0}
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-yellow-600">⚠️</span>
        <h3 class="font-semibold text-yellow-800">Low Stock Alert</h3>
      </div>
      <p class="text-yellow-700 text-sm">
        {lowStockItems.length} item{lowStockItems.length > 1 ? "s" : ""} running low: {lowStockItems.map((item) => item.name).join(", ")}
      </p>
    </div>
  {/if}

  {#if outOfStockItems.length > 0}
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-red-600">🚨</span>
        <h3 class="font-semibold text-red-800">Out of Stock</h3>
      </div>
      <p class="text-red-700 text-sm">
        {outOfStockItems.length} item{outOfStockItems.length > 1 ? "s" : ""} need{outOfStockItems.length > 1 ? "" : "s"} restocking: {outOfStockItems.map((item) => item.name).join(", ")}
      </p>
    </div>
  {/if}

  <!-- Grocery Items Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredItems as item}
      <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="text-2xl">
              {categories.find((c) => c.value === item.category)?.icon || "📦"}
            </span>
            <div>
              <h3 class="font-semibold text-gray-800">{item.name}</h3>
              <p class="text-sm text-gray-500 capitalize">{item.category}</p>
            </div>
          </div>

          <button class="text-red-500 hover:text-red-700 p-1" on:click={() => removeItem(item)}> 🗑️ </button>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Quantity:</span>
            <div class="flex items-center gap-2">
              <button class="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-sm" on:click={() => updateQuantity(item, item.quantity - 1)}> - </button>
              <span class="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
              <button class="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-sm" on:click={() => updateQuantity(item, item.quantity + 1)}> + </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Status:</span>
            <button class="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 {item.inStock ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}" on:click={() => toggleStockStatus(item)}>
              {item.inStock ? "✅ In Stock" : "❌ Out of Stock"}
            </button>
          </div>

          <div class="text-xs text-gray-500">
            Updated: {item.lastUpdated.toLocaleDateString()}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12 text-gray-500">
      <div class="text-4xl mb-4">🛒</div>
      <p class="text-lg">No pantry items found</p>
      <p class="text-sm">Add your first item to get started!</p>
    </div>
  {/if}
</div>
