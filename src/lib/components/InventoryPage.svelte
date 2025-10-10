<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let inventory = [
    {
      id: 1,
      name: "Rice (25kg)",
      category: "Groceries",
      quantity: 5,
      unit: "bags",
      minStock: 2,
      location: "Kitchen Storage",
      expiryDate: "2024-06-15",
      supplier: "Local Market",
      cost: 1200
    },
    {
      id: 2,
      name: "Milk (1L)",
      category: "Dairy",
      quantity: 12,
      unit: "packets",
      minStock: 6,
      location: "Refrigerator",
      expiryDate: "2024-01-20",
      supplier: "Amul",
      cost: 60
    },
    {
      id: 3,
      name: "Toilet Paper",
      category: "Household",
      quantity: 3,
      unit: "packs",
      minStock: 5,
      location: "Bathroom Cabinet",
      expiryDate: null,
      supplier: "Big Bazaar",
      cost: 200
    }
  ];

  let newItem = {
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minStock: "",
    location: "",
    expiryDate: "",
    supplier: "",
    cost: ""
  };

  let showAddModal = false;
  let filterCategory = "";
  let searchQuery = "";

  function addItem() {
    // Add item logic here
    showAddModal = false;
  }

  function getCategoryIcon(category) {
    const icons = {
      "Groceries": "heroicons:shopping-bag",
      "Dairy": "heroicons:beaker",
      "Household": "heroicons:home",
      "Electronics": "heroicons:cpu-chip",
      "Clothing": "heroicons:shirt",
      "Books": "heroicons:book-open",
      "Other": "heroicons:ellipsis-horizontal"
    };
    return icons[category] || icons["Other"];
  }

  function getStockStatus(quantity, minStock) {
    if (quantity <= minStock) return "low-stock";
    if (quantity <= minStock * 1.5) return "medium-stock";
    return "good-stock";
  }

  function getStockColor(status) {
    switch (status) {
      case "low-stock": return "text-red-600";
      case "medium-stock": return "text-yellow-600";
      case "good-stock": return "text-green-600";
      default: return "text-gray-600";
    }
  }

  function getStockBadge(status) {
    switch (status) {
      case "low-stock": return "badge-error";
      case "medium-stock": return "badge-warning";
      case "good-stock": return "badge-success";
      default: return "badge-neutral";
    }
  }

  function getTotalValue() {
    return inventory.reduce((total, item) => total + (item.quantity * item.cost), 0);
  }

  function getLowStockItems() {
    return inventory.filter(item => item.quantity <= item.minStock).length;
  }

  $: filteredInventory = inventory.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Inventory Management</h1>
      <p class="text-base-content/70 mt-2">Track household and personal items</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Item
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:cube" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Items</h3>
            <p class="text-2xl font-bold text-blue-600">{inventory.length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Value</h3>
            <p class="text-2xl font-bold text-green-600">₹{getTotalValue().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Low Stock</h3>
            <p class="text-2xl font-bold text-yellow-600">{getLowStockItems()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <Icon icon="heroicons:clock" class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Expiring Soon</h3>
            <p class="text-2xl font-bold text-purple-600">2</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="flex flex-wrap gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select bind:value={filterCategory} class="select select-bordered select-sm">
            <option value="">All Categories</option>
            <option>Groceries</option>
            <option>Dairy</option>
            <option>Household</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            bind:value={searchQuery}
            class="input input-bordered input-sm"
            placeholder="Search items..."
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Inventory Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Min Stock</th>
              <th>Location</th>
              <th>Expiry Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredInventory as item}
              {@const stockStatus = getStockStatus(item.quantity, item.minStock)}
              <tr>
                <td>
                  <div class="flex items-center">
                    <Icon icon={getCategoryIcon(item.category)} class="w-4 h-4 mr-2" />
                    <div>
                      <div class="font-semibold">{item.name}</div>
                      <div class="text-sm text-base-content/70">{item.supplier}</div>
                    </div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td class="font-semibold">
                  {item.quantity} {item.unit}
                </td>
                <td>{item.minStock} {item.unit}</td>
                <td class="text-sm">{item.location}</td>
                <td class="text-sm">
                  {#if item.expiryDate}
                    {item.expiryDate}
                  {:else}
                    <span class="text-base-content/50">N/A</span>
                  {/if}
                </td>
                <td>₹{item.cost}</td>
                <td>
                  <span class="badge {getStockBadge(stockStatus)}">
                    {stockStatus === 'low-stock' ? 'Low Stock' : stockStatus === 'medium-stock' ? 'Medium' : 'Good'}
                  </span>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:eye" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost text-red-600">
                      <Icon icon="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Add Item Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Inventory Item</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addItem} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Item Name</span>
            </label>
            <input type="text" bind:value={newItem.name} class="input input-bordered" placeholder="Rice (25kg)" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={newItem.category} class="select select-bordered" required>
              <option value="">Select Category</option>
              <option>Groceries</option>
              <option>Dairy</option>
              <option>Household</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Other</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Quantity</span>
              </label>
              <input type="number" bind:value={newItem.quantity} class="input input-bordered" placeholder="5" required />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Unit</span>
              </label>
              <input type="text" bind:value={newItem.unit} class="input input-bordered" placeholder="bags, packets, etc." required />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Minimum Stock Level</span>
            </label>
            <input type="number" bind:value={newItem.minStock} class="input input-bordered" placeholder="2" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input type="text" bind:value={newItem.location} class="input input-bordered" placeholder="Kitchen Storage" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Expiry Date (optional)</span>
            </label>
            <input type="date" bind:value={newItem.expiryDate} class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Supplier</span>
            </label>
            <input type="text" bind:value={newItem.supplier} class="input input-bordered" placeholder="Local Market" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Cost per Unit</span>
            </label>
            <input type="number" bind:value={newItem.cost} class="input input-bordered" placeholder="1200" required />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}