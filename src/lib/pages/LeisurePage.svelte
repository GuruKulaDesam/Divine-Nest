<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let leisureItems = [
    {
      id: 1,
      name: 'Evening Walk',
      tamilName: 'மாலை நடை',
      category: 'Exercise',
      duration: '30 minutes',
      frequency: 'Daily',
      location: 'Park',
      status: 'active',
      description: 'Relaxing evening walk in the neighborhood park',
      notes: 'Good for health and mental relaxation'
    },
    {
      id: 2,
      name: 'Reading Books',
      tamilName: 'புத்தகம் படித்தல்',
      category: 'Education',
      duration: '1 hour',
      frequency: 'Daily',
      location: 'Home',
      status: 'active',
      description: 'Reading Tamil literature and educational books',
      notes: 'Focus on Tamil classics and modern literature'
    },
    {
      id: 3,
      name: 'Temple Visit',
      tamilName: 'கோயில் செல்லல்',
      category: 'Spiritual',
      duration: '2 hours',
      frequency: 'Weekly',
      location: 'Local Temple',
      status: 'active',
      description: 'Weekly visit to the local temple for prayers',
      notes: 'Includes puja and community interaction'
    }
  ];

  let filteredItems = [...leisureItems];
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
    duration: '',
    frequency: '',
    location: '',
    status: 'active',
    description: '',
    notes: ''
  };

  const categories = [
    { id: 'all', name: 'All Categories', tamil: 'அனைத்து வகைகளும்' },
    { id: 'exercise', name: 'Exercise', tamil: 'உடற்பயிற்சி' },
    { id: 'education', name: 'Education', tamil: 'கல்வி' },
    { id: 'spiritual', name: 'Spiritual', tamil: 'ஆன்மீகம்' },
    { id: 'social', name: 'Social', tamil: 'சமூகம்' },
    { id: 'entertainment', name: 'Entertainment', tamil: 'பொழுதுபோக்கு' },
    { id: 'hobby', name: 'Hobby', tamil: 'பொழுதுபோக்கு' }
  ];

  const frequencies = [
    'Daily', 'Weekly', 'Monthly', 'Occasional', 'Seasonal'
  ];

  const statuses = [
    { id: 'active', name: 'Active', tamil: 'செயலில்' },
    { id: 'inactive', name: 'Inactive', tamil: 'செயலற்றது' },
    { id: 'completed', name: 'Completed', tamil: 'முடிந்தது' }
  ];

  function filterItems() {
    filteredItems = leisureItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  $: {
    filterItems();
  }

  function addItem() {
    if (!newItem.name.trim()) return;

    const item = {
      ...newItem,
      id: Date.now(),
      name: newItem.name.trim(),
      tamilName: newItem.tamilName.trim(),
      description: newItem.description.trim(),
      notes: newItem.notes.trim()
    };

    leisureItems = [...leisureItems, item];
    resetNewItem();
    showAddModal = false;
  }

  function editItem(item) {
    editingItem = { ...item };
    showEditModal = true;
  }

  function updateItem() {
    if (!editingItem.name.trim()) return;

    leisureItems = leisureItems.map(item =>
      item.id === editingItem.id ? { ...editingItem } : item
    );
    showEditModal = false;
    editingItem = null;
  }

  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this leisure activity?')) {
      leisureItems = leisureItems.filter(item => item.id !== id);
    }
  }

  function resetNewItem() {
    newItem = {
      name: '',
      tamilName: '',
      category: '',
      duration: '',
      frequency: '',
      location: '',
      status: 'active',
      description: '',
      notes: ''
    };
  }

  function getCategoryColor(category) {
    const colors = {
      'Exercise': 'bg-green-100 text-green-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Spiritual': 'bg-purple-100 text-purple-800',
      'Social': 'bg-yellow-100 text-yellow-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Hobby': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }

  function getStatusColor(status) {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  // Statistics
  $: totalItems = leisureItems.length;
  $: activeItems = leisureItems.filter(item => item.status === 'active').length;
  $: completedItems = leisureItems.filter(item => item.status === 'completed').length;
  $: categoryStats = categories.slice(1).map(cat => ({
    name: cat.name,
    count: leisureItems.filter(item => item.category.toLowerCase() === cat.id).length
  }));
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Leisure Activities</h1>
      <p class="text-base-content/70 mt-1">Manage your leisure and recreational activities</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Activity
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:calendar-multiple" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Activities</div>
      <div class="stat-value text-primary">{totalItems}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-success">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active</div>
      <div class="stat-value text-success">{activeItems}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-info">
        <Icon icon="mdi:calendar-check" class="w-8 h-8" />
      </div>
      <div class="stat-title">Completed</div>
      <div class="stat-value text-info">{completedItems}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-warning">
        <Icon icon="mdi:chart-pie" class="w-8 h-8" />
      </div>
      <div class="stat-title">Categories</div>
      <div class="stat-value text-warning">{categoryStats.filter(c => c.count > 0).length}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-lg p-4 shadow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Activities</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name or description..."
          class="input input-bordered w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered w-full">
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
          {#each statuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Activities Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredItems as item (item.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex-1">
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

          <div class="flex flex-wrap gap-2 mt-3">
            <span class="badge {getCategoryColor(item.category)} badge-sm">
              {item.category}
            </span>
            <span class="badge {getStatusColor(item.status)} badge-sm">
              {statuses.find(s => s.id === item.status)?.name}
            </span>
          </div>

          <div class="space-y-2 mt-4 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:clock-outline" class="w-4 h-4 text-base-content/60" />
              <span>{item.duration}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:calendar-refresh" class="w-4 h-4 text-base-content/60" />
              <span>{item.frequency}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:map-marker" class="w-4 h-4 text-base-content/60" />
              <span>{item.location}</span>
            </div>
          </div>

          {#if item.description}
            <p class="text-sm text-base-content/80 mt-3 line-clamp-2">
              {item.description}
            </p>
          {/if}

          {#if item.notes}
            <div class="alert alert-info mt-3 py-2">
              <Icon icon="mdi:information" class="w-4 h-4" />
              <span class="text-xs">{item.notes}</span>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:calendar-blank" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No leisure activities found</h3>
      <p class="text-base-content/50 mt-1">Try adjusting your search or filters</p>
    </div>
  {/if}
</div>

<!-- Add Modal -->
{#if showAddModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Add Leisure Activity</h3>

      <form on:submit|preventDefault={addItem} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Activity Name *</span>
            </label>
            <input
              type="text"
              bind:value={newItem.name}
              placeholder="Enter activity name"
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
              placeholder="தமிழ் பெயர்"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={newItem.category} class="select select-bordered w-full">
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
            <select bind:value={newItem.status} class="select select-bordered w-full">
              {#each statuses as status}
                <option value={status.id}>{status.name}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Duration</span>
            </label>
            <input
              type="text"
              bind:value={newItem.duration}
              placeholder="e.g., 30 minutes, 1 hour"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Frequency</span>
            </label>
            <select bind:value={newItem.frequency} class="select select-bordered w-full">
              <option value="">Select Frequency</option>
              {#each frequencies as freq}
                <option value={freq}>{freq}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <input
            type="text"
            bind:value={newItem.location}
            placeholder="Where do you do this activity?"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            bind:value={newItem.description}
            placeholder="Describe this leisure activity"
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            bind:value={newItem.notes}
            placeholder="Additional notes or reminders"
            rows="2"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={() => { showAddModal = false; resetNewItem(); }}>Cancel</button>
          <button type="submit" class="btn btn-primary">Add Activity</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Edit Modal -->
{#if showEditModal && editingItem}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Edit Leisure Activity</h3>

      <form on:submit|preventDefault={updateItem} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Activity Name *</span>
            </label>
            <input
              type="text"
              bind:value={editingItem.name}
              placeholder="Enter activity name"
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
              placeholder="தமிழ் பெயர்"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={editingItem.category} class="select select-bordered w-full">
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
            <select bind:value={editingItem.status} class="select select-bordered w-full">
              {#each statuses as status}
                <option value={status.id}>{status.name}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Duration</span>
            </label>
            <input
              type="text"
              bind:value={editingItem.duration}
              placeholder="e.g., 30 minutes, 1 hour"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Frequency</span>
            </label>
            <select bind:value={editingItem.frequency} class="select select-bordered w-full">
              <option value="">Select Frequency</option>
              {#each frequencies as freq}
                <option value={freq}>{freq}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <input
            type="text"
            bind:value={editingItem.location}
            placeholder="Where do you do this activity?"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            bind:value={editingItem.description}
            placeholder="Describe this leisure activity"
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            bind:value={editingItem.notes}
            placeholder="Additional notes or reminders"
            rows="2"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={() => { showEditModal = false; editingItem = null; }}>Cancel</button>
          <button type="submit" class="btn btn-primary">Update Activity</button>
        </div>
      </form>
    </div>
  </div>
{/if}