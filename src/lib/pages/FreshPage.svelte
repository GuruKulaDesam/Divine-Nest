<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let freshItems = [
    {
      id: 1,
      name: 'Fresh Vegetables',
      tamilName: 'புதிய காய்கறிகள்',
      category: 'vegetables',
      quantity: 25,
      unit: 'kg',
      expiryDate: '2024-01-15',
      location: 'refrigerator',
      status: 'fresh',
      notes: 'Organic vegetables from local farm'
    },
    {
      id: 2,
      name: 'Fresh Fruits',
      tamilName: 'புதிய பழங்கள்',
      category: 'fruits',
      quantity: 15,
      unit: 'kg',
      expiryDate: '2024-01-12',
      location: 'fruit basket',
      status: 'fresh',
      notes: 'Seasonal fruits'
    },
    {
      id: 3,
      name: 'Fresh Milk',
      tamilName: 'புதிய பால்',
      category: 'dairy',
      quantity: 5,
      unit: 'liters',
      expiryDate: '2024-01-10',
      location: 'refrigerator',
      status: 'expiring_soon',
      notes: 'Full cream milk'
    }
  ];

  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedLocation = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingItem = null;

  let newItem = {
    name: '',
    tamilName: '',
    category: 'vegetables',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    location: 'refrigerator',
    status: 'fresh',
    notes: ''
  };

  const categories = [
    { id: 'vegetables', name: 'Vegetables', tamil: 'காய்கறிகள்' },
    { id: 'fruits', name: 'Fruits', tamil: 'பழங்கள்' },
    { id: 'dairy', name: 'Dairy', tamil: 'பால் பொருட்கள்' },
    { id: 'meat', name: 'Meat', tamil: 'இறைச்சி' },
    { id: 'seafood', name: 'Seafood', tamil: 'கடல் உணவு' },
    { id: 'eggs', name: 'Eggs', tamil: 'முட்டைகள்' },
    { id: 'bread', name: 'Bread & Bakery', tamil: 'ரொட்டி மற்றும் பேக்கரி' },
    { id: 'other', name: 'Other', tamil: 'மற்றவை' }
  ];

  const locations = [
    { id: 'refrigerator', name: 'Refrigerator', tamil: 'குளிர்சாதனப் பெட்டி' },
    { id: 'freezer', name: 'Freezer', tamil: 'முட்டைப் பெட்டி' },
    { id: 'pantry', name: 'Pantry', tamil: 'உணவு அறை' },
    { id: 'counter', name: 'Counter', tamil: 'மேசை' },
    { id: 'fruit_basket', name: 'Fruit Basket', tamil: 'பழக் கூடை' }
  ];

  const statuses = [
    { id: 'fresh', name: 'Fresh', color: 'text-green-600 bg-green-100' },
    { id: 'expiring_soon', name: 'Expiring Soon', color: 'text-yellow-600 bg-yellow-100' },
    { id: 'expired', name: 'Expired', color: 'text-red-600 bg-red-100' }
  ];

  const units = ['kg', 'g', 'liters', 'ml', 'pieces', 'dozen', 'packets'];

  $: filteredItems = freshItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  $: stats = {
    total: freshItems.length,
    fresh: freshItems.filter(item => item.status === 'fresh').length,
    expiringSoon: freshItems.filter(item => item.status === 'expiring_soon').length,
    expired: freshItems.filter(item => item.status === 'expired').length
  };

  function addItem() {
    if (!newItem.name.trim()) return;

    const item = {
      ...newItem,
      id: Date.now(),
      quantity: parseFloat(newItem.quantity) || 0
    };

    freshItems = [...freshItems, item];
    resetForm();
    showAddModal = false;
  }

  function editItem(item) {
    editingItem = { ...item };
    showEditModal = true;
  }

  function updateItem() {
    if (!editingItem.name.trim()) return;

    freshItems = freshItems.map(item =>
      item.id === editingItem.id ? { ...editingItem, quantity: parseFloat(editingItem.quantity) || 0 } : item
    );
    showEditModal = false;
    editingItem = null;
  }

  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      freshItems = freshItems.filter(item => item.id !== id);
    }
  }

  function resetForm() {
    newItem = {
      name: '',
      tamilName: '',
      category: 'vegetables',
      quantity: '',
      unit: 'kg',
      expiryDate: '',
      location: 'refrigerator',
      status: 'fresh',
      notes: ''
    };
  }

  function getStatusColor(status) {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'text-gray-600 bg-gray-100';
  }

  function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }

  function getLocationName(locationId) {
    const location = locations.find(l => l.id === locationId);
    return location ? location.name : locationId;
  }
</script>

<svelte:head>
  <title>Fresh Items - Home Manager</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Fresh Items</h1>
      <p class="text-base-content/70 mt-1">Manage fresh groceries and perishable items</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Fresh Item
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:package-variant" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Items</div>
      <div class="stat-value text-primary">{stats.total}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-green-600">
        <Icon icon="mdi:leaf" class="w-8 h-8" />
      </div>
      <div class="stat-title">Fresh</div>
      <div class="stat-value text-green-600">{stats.fresh}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-yellow-600">
        <Icon icon="mdi:clock-outline" class="w-8 h-8" />
      </div>
      <div class="stat-title">Expiring Soon</div>
      <div class="stat-value text-yellow-600">{stats.expiringSoon}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-red-600">
        <Icon icon="mdi:alert-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Expired</div>
      <div class="stat-value text-red-600">{stats.expired}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-4 rounded-box shadow">
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
          class="input input-bordered w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered w-full">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>

      <!-- Location Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Location</span>
        </label>
        <select bind:value={selectedLocation} class="select select-bordered w-full">
          <option value="all">All Locations</option>
          {#each locations as location}
            <option value={location.id}>{location.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered w-full">
          <option value="all">All Status</option>
          {#each statuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Items Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredItems as item (item.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="card-title text-lg">{item.name}</h3>
              <p class="text-sm text-base-content/70">{item.tamilName}</p>
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

          <div class="space-y-2 mt-4">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Quantity:</span>
              <span class="badge badge-outline">{item.quantity} {item.unit}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Category:</span>
              <span class="badge badge-primary">{getCategoryName(item.category)}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Location:</span>
              <span class="badge badge-secondary">{getLocationName(item.location)}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Expiry:</span>
              <span class="text-sm">{item.expiryDate}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Status:</span>
              <span class="badge {getStatusColor(item.status)}">
                {statuses.find(s => s.id === item.status)?.name}
              </span>
            </div>
          </div>

          {#if item.notes}
            <div class="mt-4 p-3 bg-base-200 rounded-lg">
              <p class="text-sm text-base-content/80">{item.notes}</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:package-variant-closed" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/70">No fresh items found</h3>
      <p class="text-base-content/50 mt-1">Try adjusting your filters or add a new item</p>
    </div>
  {/if}
</div>

<!-- Add Modal -->
{#if showAddModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Add Fresh Item</h3>

      <form on:submit|preventDefault={addItem} class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Item Name *</span>
          </label>
          <input
            type="text"
            bind:value={newItem.name}
            placeholder="e.g., Tomatoes"
            class="input input-bordered w-full"
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
            placeholder="e.g., தக்காளி"
            class="input input-bordered w-full"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={newItem.category} class="select select-bordered w-full">
              {#each categories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <select bind:value={newItem.location} class="select select-bordered w-full">
              {#each locations as location}
                <option value={location.id}>{location.name}</option>
              {/each}
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
              placeholder="5"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Unit</span>
            </label>
            <select bind:value={newItem.unit} class="select select-bordered w-full">
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
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select bind:value={newItem.status} class="select select-bordered w-full">
            {#each statuses as status}
              <option value={status.id}>{status.name}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            bind:value={newItem.notes}
            placeholder="Any additional notes..."
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="modal-action">
          <button type="button" on:click={() => { showAddModal = false; resetForm(); }} class="btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Add Item</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Edit Modal -->
{#if showEditModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Edit Fresh Item</h3>

      <form on:submit|preventDefault={updateItem} class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Item Name *</span>
          </label>
          <input
            type="text"
            bind:value={editingItem.name}
            placeholder="e.g., Tomatoes"
            class="input input-bordered w-full"
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
            placeholder="e.g., தக்காளி"
            class="input input-bordered w-full"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={editingItem.category} class="select select-bordered w-full">
              {#each categories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <select bind:value={editingItem.location} class="select select-bordered w-full">
              {#each locations as location}
                <option value={location.id}>{location.name}</option>
              {/each}
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
              placeholder="5"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Unit</span>
            </label>
            <select bind:value={editingItem.unit} class="select select-bordered w-full">
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
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select bind:value={editingItem.status} class="select select-bordered w-full">
            {#each statuses as status}
              <option value={status.id}>{status.name}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            bind:value={editingItem.notes}
            placeholder="Any additional notes..."
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="modal-action">
          <button type="button" on:click={() => { showEditModal = false; editingItem = null; }} class="btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Update Item</button>
        </div>
      </form>
    </div>
  </div>
{/if}