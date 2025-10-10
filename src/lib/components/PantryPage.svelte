<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let pantryItems = [
    {
      id: 1,
      name: 'Rice',
      tamilName: 'அரிசி',
      category: 'Grains',
      quantity: 25,
      unit: 'kg',
      expiryDate: '2024-12-31',
      status: 'Available',
      location: 'Kitchen Shelf',
      notes: 'Basmati rice'
    },
    {
      id: 2,
      name: 'Sugar',
      tamilName: 'சர்க்கரை',
      category: 'Sweeteners',
      quantity: 5,
      unit: 'kg',
      expiryDate: '2025-06-30',
      status: 'Low Stock',
      location: 'Pantry',
      notes: 'White sugar'
    }
  ];

  let filteredItems = [...pantryItems];
  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingItem = null;

  let newItem = {
    name: '',
    tamilName: '',
    category: '',
    quantity: '',
    unit: '',
    expiryDate: '',
    location: '',
    notes: ''
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'grains', name: 'Grains' },
    { id: 'spices', name: 'Spices' },
    { id: 'oils', name: 'Oils' },
    { id: 'sweeteners', name: 'Sweeteners' },
    { id: 'canned', name: 'Canned Goods' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'other', name: 'Other' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'available', name: 'Available' },
    { id: 'low-stock', name: 'Low Stock' },
    { id: 'expired', name: 'Expired' },
    { id: 'out-of-stock', name: 'Out of Stock' }
  ];

  const units = ['kg', 'g', 'l', 'ml', 'pieces', 'packets', 'cans', 'bottles'];

  $: {
    filteredItems = pantryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status.toLowerCase().replace(' ', '-') === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'low stock': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'out of stock': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getCategoryColor(category) {
    const colors = {
      'grains': 'bg-amber-100 text-amber-800',
      'spices': 'bg-red-100 text-red-800',
      'oils': 'bg-orange-100 text-orange-800',
      'sweeteners': 'bg-pink-100 text-pink-800',
      'canned': 'bg-blue-100 text-blue-800',
      'beverages': 'bg-cyan-100 text-cyan-800',
      'snacks': 'bg-purple-100 text-purple-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }

  function addItem() {
    if (!newItem.name || !newItem.quantity) return;

    const item = {
      id: Date.now(),
      ...newItem,
      status: newItem.quantity < 2 ? 'Low Stock' : 'Available'
    };

    pantryItems = [...pantryItems, item];
    resetForm();
    showAddModal = false;
  }

  function editItem(item) {
    editingItem = { ...item };
    showEditModal = true;
  }

  function updateItem() {
    if (!editingItem) return;

    pantryItems = pantryItems.map(item =>
      item.id === editingItem.id ? { ...editingItem } : item
    );
    showEditModal = false;
    editingItem = null;
  }

  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this pantry item?')) {
      pantryItems = pantryItems.filter(item => item.id !== id);
    }
  }

  function resetForm() {
    newItem = {
      name: '',
      tamilName: '',
      category: '',
      quantity: '',
      unit: '',
      expiryDate: '',
      location: '',
      notes: ''
    };
  }

  function clearFilters() {
    searchQuery = '';
    selectedCategory = 'all';
    selectedStatus = 'all';
  }

  // Statistics
  $: totalItems = pantryItems.length;
  $: lowStockItems = pantryItems.filter(item => item.status === 'Low Stock').length;
  $: expiredItems = pantryItems.filter(item => new Date(item.expiryDate) < new Date()).length;
  $: totalValue = pantryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Pantry Management</h1>
      <p class="text-base-content/70 mt-1">Manage your household pantry items and inventory</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Item
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:package-variant" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Items</div>
      <div class="stat-value text-primary">{totalItems}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-warning">
        <Icon icon="mdi:alert-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Low Stock</div>
      <div class="stat-value text-warning">{lowStockItems}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-error">
        <Icon icon="mdi:calendar-alert" class="w-8 h-8" />
      </div>
      <div class="stat-title">Expired</div>
      <div class="stat-value text-error">{expiredItems}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-info">
        <Icon icon="mdi:scale-balance" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Quantity</div>
      <div class="stat-value text-info">{totalValue.toFixed(1)}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-4 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Items</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name..."
          class="input input-bordered"
        />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered">
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered">
          {#each statusOptions as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>

      <!-- Clear Filters -->
      <div class="form-control">
        <label class="label">
          <span class="label-text opacity-0">Actions</span>
        </label>
        <button
          on:click={clearFilters}
          class="btn btn-outline btn-block"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>

  <!-- Items Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredItems as item (item.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="card-title text-lg">{item.name}</h3>
              {#if item.tamilName}
                <p class="text-sm text-base-content/70">{item.tamilName}</p>
              {/if}
            </div>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a on:click={() => editItem(item)}>Edit</a></li>
                <li><a class="text-error" on:click={() => deleteItem(item.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="badge {getCategoryColor(item.category)}">{item.category}</span>
              <span class="badge {getStatusColor(item.status)}">{item.status}</span>
            </div>

            <div class="flex justify-between text-sm">
              <span>Quantity:</span>
              <span class="font-semibold">{item.quantity} {item.unit}</span>
            </div>

            <div class="flex justify-between text-sm">
              <span>Expiry:</span>
              <span class="font-semibold">{new Date(item.expiryDate).toLocaleDateString()}</span>
            </div>

            {#if item.location}
              <div class="flex justify-between text-sm">
                <span>Location:</span>
                <span class="font-semibold">{item.location}</span>
              </div>
            {/if}

            {#if item.notes}
              <p class="text-sm text-base-content/70 mt-2">{item.notes}</p>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:package-variant-closed" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No pantry items found</h3>
      <p class="text-base-content/50">Try adjusting your search or filters</p>
    </div>
  {/if}
</div>

<!-- Add Item Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Add Pantry Item</h2>
          <button
            on:click={() => { showAddModal = false; resetForm(); }}
            class="btn btn-ghost btn-sm"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addItem} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Item Name *</span>
              </label>
              <input
                type="text"
                bind:value={newItem.name}
                placeholder="e.g., Rice, Sugar"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input
                type="text"
                bind:value={newItem.tamilName}
                placeholder="e.g., அரிசி, சர்க்கரை"
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={newItem.category} class="select select-bordered">
                <option value="">Select Category</option>
                {#each categories.slice(1) as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select bind:value={newItem.status} class="select select-bordered">
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Expired">Expired</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Quantity *</span>
              </label>
              <input
                type="number"
                bind:value={newItem.quantity}
                placeholder="Enter quantity"
                class="input input-bordered"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Unit</span>
              </label>
              <select bind:value={newItem.unit} class="select select-bordered">
                <option value="">Select Unit</option>
                {#each units as unit}
                  <option value={unit}>{unit}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Expiry Date</span>
            </label>
            <input
              type="date"
              bind:value={newItem.expiryDate}
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              bind:value={newItem.location}
              placeholder="e.g., Kitchen Shelf, Pantry"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={newItem.notes}
              placeholder="Additional notes..."
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              on:click={() => { showAddModal = false; resetForm(); }}
              class="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Item Modal -->
{#if showEditModal && editingItem}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Edit Pantry Item</h2>
          <button
            on:click={() => { showEditModal = false; editingItem = null; }}
            class="btn btn-ghost btn-sm"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={updateItem} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Item Name *</span>
              </label>
              <input
                type="text"
                bind:value={editingItem.name}
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input
                type="text"
                bind:value={editingItem.tamilName}
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={editingItem.category} class="select select-bordered">
                {#each categories.slice(1) as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select bind:value={editingItem.status} class="select select-bordered">
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Expired">Expired</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Quantity *</span>
              </label>
              <input
                type="number"
                bind:value={editingItem.quantity}
                class="input input-bordered"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Unit</span>
              </label>
              <select bind:value={editingItem.unit} class="select select-bordered">
                {#each units as unit}
                  <option value={unit}>{unit}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Expiry Date</span>
            </label>
            <input
              type="date"
              bind:value={editingItem.expiryDate}
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              bind:value={editingItem.location}
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={editingItem.notes}
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              on:click={() => { showEditModal = false; editingItem = null; }}
              class="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}