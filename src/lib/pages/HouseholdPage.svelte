<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let activeTab = "overview";

  // Household data
  let groceryList = [
    { item: "Rice", quantity: "5 kg", category: "Staples", inStock: true },
    { item: "Dal", quantity: "2 kg", category: "Staples", inStock: false },
    { item: "Tomatoes", quantity: "1 kg", category: "Vegetables", inStock: true },
    { item: "Onions", quantity: "2 kg", category: "Vegetables", inStock: true },
  ];

  let chores = [
    { id: 1, task: "Kitchen cleaning", assignedTo: "Amma", completed: true, streak: 7 },
    { id: 2, task: "Sweep courtyard", assignedTo: "Akka", completed: false, streak: 3 },
    { id: 3, task: "Water plants", assignedTo: "Appa", completed: true, streak: 15 },
    { id: 4, task: "Organize library", assignedTo: "Paati", completed: false, streak: 0 },
  ];

  let pantryItems = [
    { name: "Rice", stock: "15 kg", expiry: "2025-12-01", category: "Grains" },
    { name: "Turmeric powder", stock: "200g", expiry: "2025-11-15", category: "Spices" },
    { name: "Coconut oil", stock: "2 bottles", expiry: "2026-01-20", category: "Oils" },
    { name: "Jaggery", stock: "500g", expiry: "2025-10-30", category: "Sweets" },
  ];
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-base-content mb-2">🏠 Household Management</h1>
    <p class="text-base-content/60">Manage grocery, chores, pantry inventory and daily household flow</p>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Pending Grocery</p>
            <p class="text-2xl font-bold text-orange-500">{groceryList.filter((item) => !item.inStock).length}</p>
          </div>
          <Icon icon="heroicons:shopping-cart" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Pending Chores</p>
            <p class="text-2xl font-bold text-blue-500">{chores.filter((chore) => !chore.completed).length}</p>
          </div>
          <Icon icon="heroicons:check-circle" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Pantry Items</p>
            <p class="text-2xl font-bold text-green-500">{pantryItems.length}</p>
          </div>
          <Icon icon="heroicons:archive-box" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Expiring Soon</p>
            <p class="text-2xl font-bold text-red-500">2</p>
          </div>
          <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'overview' ? 'tab-active' : ''}" on:click={() => (activeTab = "overview")}>
      <Icon icon="heroicons:home" class="w-4 h-4 mr-2" />
      Overview
    </button>
    <button class="tab {activeTab === 'grocery' ? 'tab-active' : ''}" on:click={() => (activeTab = "grocery")}>
      <Icon icon="heroicons:shopping-cart" class="w-4 h-4 mr-2" />
      Grocery & Inventory
    </button>
    <button class="tab {activeTab === 'chores' ? 'tab-active' : ''}" on:click={() => (activeTab = "chores")}>
      <Icon icon="heroicons:check-circle" class="w-4 h-4 mr-2" />
      Chores & Flow
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Today's Chores -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Today's Chores</h3>
          <div class="space-y-3">
            {#each chores as chore}
              <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" class="checkbox checkbox-primary" bind:checked={chore.completed} />
                  <div>
                    <p class="font-medium text-base-content">{chore.task}</p>
                    <p class="text-sm text-base-content/60">Assigned to: {chore.assignedTo}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-orange-500">🔥 {chore.streak}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Urgent Grocery -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Urgent Grocery</h3>
          <div class="space-y-3">
            {#each groceryList.filter((item) => !item.inStock) as item}
              <div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p class="font-medium text-red-700">{item.item}</p>
                  <p class="text-sm text-red-500">{item.quantity} - {item.category}</p>
                </div>
                <button class="btn btn-sm btn-primary">Add to Cart</button>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "grocery"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Grocery List -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h3 class="card-title text-base-content">Grocery List</h3>
            <button class="btn btn-sm btn-primary">
              <Icon icon="heroicons:plus" class="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>
          <div class="space-y-3">
            {#each groceryList as item}
              <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" class="checkbox checkbox-primary" bind:checked={item.inStock} />
                  <div>
                    <p class="font-medium text-base-content">{item.item}</p>
                    <p class="text-sm text-base-content/60">{item.quantity} - {item.category}</p>
                  </div>
                </div>
                <span class="badge {item.inStock ? 'badge-success' : 'badge-error'}">
                  {item.inStock ? "In Stock" : "Need to Buy"}
                </span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Pantry Inventory -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Pantry Inventory</h3>
          <div class="space-y-3">
            {#each pantryItems as item}
              <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div>
                  <p class="font-medium text-base-content">{item.name}</p>
                  <p class="text-sm text-base-content/60">{item.stock} - Expires: {item.expiry}</p>
                </div>
                <span class="badge badge-outline">{item.category}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "chores"}
    <div class="space-y-6">
      <!-- Chore Assignment -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h3 class="card-title text-base-content">Chore Assignment & Streaks</h3>
            <button class="btn btn-sm btn-primary">
              <Icon icon="heroicons:plus" class="w-4 h-4 mr-1" />
              Add Chore
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each chores as chore}
              <div class="card bg-base-200 border border-base-300 shadow-sm">
                <div class="card-body p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-3">
                      <input type="checkbox" class="checkbox checkbox-primary" bind:checked={chore.completed} />
                      <div>
                        <h4 class="font-medium text-base-content">{chore.task}</h4>
                        <p class="text-sm text-base-content/60">{chore.assignedTo}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center justify-between">
                    <span class="text-sm text-base-content/60">Streak</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-orange-500">🔥</span>
                      <span class="font-bold text-orange-500">{chore.streak} days</span>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
