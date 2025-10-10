<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let kidsItems = [
    {
      id: 1,
      name: 'Milk',
      tamilName: 'பால்',
      category: 'dairy',
      quantity: 2,
      unit: 'liters',
      expiryDate: '2024-01-15',
      status: 'fresh',
      notes: 'Fresh cow milk'
    },
    {
      id: 2,
      name: 'Bread',
      tamilName: 'ரொட்டி',
      category: 'bakery',
      quantity: 1,
      unit: 'loaf',
      expiryDate: '2024-01-10',
      status: 'expiring',
      notes: 'Whole wheat bread'
    },
    {
      id: 3,
      name: 'Apples',
      tamilName: 'ஆப்பிள்',
      category: 'fruits',
      quantity: 6,
      unit: 'pieces',
      expiryDate: '2024-01-20',
      status: 'fresh',
      notes: 'Red delicious apples'
    }
  ];

  let filteredItems = [...kidsItems];
  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingItem = null;

  let newItem = {
    name: '',
    tamilName: '',
    category: 'dairy',
    quantity: '',
    unit: 'pieces',
    expiryDate: '',
    status: 'fresh',
    notes: ''
  };

  const categories = [
    { id: 'dairy', name: 'Dairy', tamil: 'பால் பொருட்கள்' },
    { id: 'bakery', name: 'Bakery', tamil: 'அப்பம் பொருட்கள்' },
    { id: 'fruits', name: 'Fruits', tamil: 'பழங்கள்' },
    { id: 'vegetables', name: 'Vegetables', tamil: 'காய்கறிகள்' },
    { id: 'snacks', name: 'Snacks', tamil: 'தின்பண்டங்கள்' },
    { id: 'beverages', name: 'Beverages', tamil: 'பானங்கள்' }
  ];

  const statusOptions = [
    { id: 'fresh', name: 'Fresh', color: 'text-green-600' },
    { id: 'expiring', name: 'Expiring Soon', color: 'text-yellow-600' },
    { id: 'expired', name: 'Expired', color: 'text-red-600' }
  ];

  const units = ['pieces', 'kg', 'liters', 'packets', 'bottles', 'cans'];

  $: {
    filteredItems = kidsItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  function addItem() {
    if (!newItem.name.trim()) return;

    const item = {
      ...newItem,
      id: Date.now(),
      quantity: parseFloat(newItem.quantity) || 0
    };

    kidsItems = [...kidsItems, item];

    newItem = {
      name: '',
      tamilName: '',
      category: 'dairy',
      quantity: '',
      unit: 'pieces',
      expiryDate: '',
      status: 'fresh',
      notes: ''
    };

    showAddModal = false;
  }

  function editItem(item) {
    editingItem = { ...item };
    showEditModal = true;
  }

  function updateItem() {
    if (!editingItem.name.trim()) return;

    kidsItems = kidsItems.map(item =>
      item.id === editingItem.id ? { ...editingItem, quantity: parseFloat(editingItem.quantity) || 0 } : item
    );

    showEditModal = false;
    editingItem = null;
  }

  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      kidsItems = kidsItems.filter(item => item.id !== id);
    }
  }

  function getStatusColor(status) {
    const statusOption = statusOptions.find(s => s.id === status);
    return statusOption ? statusOption.color : 'text-gray-600';
  }

  function getDaysUntilExpiry(expiryDate) {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function getExpiryStatus(days) {
    if (days === null) return '';
    if (days < 0) return 'expired';
    if (days <= 3) return 'expiring';
    return 'fresh';
  }

  onMount(() => {
    // Update expiry status based on current date
    kidsItems = kidsItems.map(item => {
      const days = getDaysUntilExpiry(item.expiryDate);
      const status = getExpiryStatus(days);
      return { ...item, status: status || item.status };
    });
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Kids Items</h1>
      <p class="text-base-content/60 mt-1">Manage items for kids - food, snacks, and essentials</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Item
    </button>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:baby" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Items</div>
      <div class="stat-value text-primary">{kidsItems.length}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-green-600">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Fresh Items</div>
      <div class="stat-value text-green-600">{kidsItems.filter(item => item.status === 'fresh').length}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-yellow-600">
        <Icon icon="mdi:clock-alert" class="w-8 h-8" />
      </div>
      <div class="stat-title">Expiring Soon</div>
      <div class="stat-value text-yellow-600">{kidsItems.filter(item => item.status === 'expiring').length}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-red-600">
        <Icon icon="mdi:alert-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Expired Items</div>
      <div class="stat-value text-red-600">{kidsItems.filter(item => item.status === 'expired').length}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-lg p-4 shadow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered w-full">
          <option value="all">All Status</option>
          {#each statusOptions as status}
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
              {#if item.tamilName}
                <p class="text-sm text-base-content/60">{item.tamilName}</p>
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

          <div class="space-y-2 mt-4">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Category:</span>
              <span class="badge badge-outline">
                {categories.find(c => c.id === item.category)?.name || item.category}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Quantity:</span>
              <span class="text-sm">{item.quantity} {item.unit}</span>
            </div>

            {#if item.expiryDate}
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Expiry:</span>
                <span class="text-sm {getStatusColor(item.status)}">
                  {new Date(item.expiryDate).toLocaleDateString()}
                  {#if getDaysUntilExpiry(item.expiryDate) !== null}
                    ({getDaysUntilExpiry(item.expiryDate) < 0 ? 'Expired' : `${getDaysUntilExpiry(item.expiryDate)} days`})
                  {/if}
                </span>
              </div>
            {/if}

            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">Status:</span>
              <span class="badge {item.status === 'fresh' ? 'badge-success' : item.status === 'expiring' ? 'badge-warning' : 'badge-error'}">
                {statusOptions.find(s => s.id === item.status)?.name || item.status}
              </span>
            </div>
          </div>

          {#if item.notes}
            <div class="mt-4 p-3 bg-base-200 rounded-lg">
              <p class="text-sm text-base-content/70">{item.notes}</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:baby" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/60">No items found</h3>
      <p class="text-base-content/40 mt-1">Try adjusting your search or filters</p>
    </div>
  {/if}
</div>

<!-- Add Item Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Add New Item</h3>
          <button
            on:click={() => showAddModal = false}
            class="btn btn-ghost btn-sm"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addItem} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Item Name *</span>
            </label>
            <input
              type="text"
              bind:value={newItem.name}
              placeholder="e.g., Milk"
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
              placeholder="e.g., பால்"
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
                <span class="label-text">Status</span>
              </label>
              <select bind:value={newItem.status} class="select select-bordered w-full">
                {#each statusOptions as status}
                  <option value={status.id}>{status.name}</option>
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
                placeholder="2"
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
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={newItem.notes}
              placeholder="Any additional notes..."
              rows="3"
              class="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div class="flex gap-2 mt-6">
            <button type="submit" class="btn btn-primary flex-1">Add Item</button>
            <button
              type="button"
              on:click={() => showAddModal = false}
              class="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Item Modal -->
{#if showEditModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Edit Item</h3>
          <button
            on:click={() => showEditModal = false}
            class="btn btn-ghost btn-sm"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={updateItem} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Item Name *</span>
            </label>
            <input
              type="text"
              bind:value={editingItem.name}
              placeholder="e.g., Milk"
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
              placeholder="e.g., பால்"
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
                <span class="label-text">Status</span>
              </label>
              <select bind:value={editingItem.status} class="select select-bordered w-full">
                {#each statusOptions as status}
                  <option value={status.id}>{status.name}</option>
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
                placeholder="2"
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
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={editingItem.notes}
              placeholder="Any additional notes..."
              rows="3"
              class="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div class="flex gap-2 mt-6">
            <button type="submit" class="btn btn-primary flex-1">Update Item</button>
            <button
              type="button"
              on:click={() => showEditModal = false}
              class="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}