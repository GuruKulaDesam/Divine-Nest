<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let festivals = [
    {
      id: 1,
      name: 'Pongal',
      tamilName: 'பொங்கல்',
      date: '2024-01-14',
      category: 'Harvest',
      description: 'Harvest festival celebrating the sun and new crops',
      traditions: ['Boiling rice', 'Drawing kolam', 'Feeding cows'],
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Deepavali',
      tamilName: 'தீபாவளி',
      date: '2024-10-31',
      category: 'Festival of Lights',
      description: 'Festival of lights celebrating victory of good over evil',
      traditions: ['Lighting lamps', 'Fireworks', 'Sweets distribution'],
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Thai Pongal',
      tamilName: 'தைப்பொங்கல்',
      date: '2024-01-15',
      category: 'Harvest',
      description: 'Second day of Pongal festival',
      traditions: ['Rice boiling', 'Family gatherings', 'Traditional games'],
      status: 'upcoming'
    }
  ];

  let searchQuery = '';
  let selectedCategory = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingFestival = null;

  let newFestival = {
    name: '',
    tamilName: '',
    date: '',
    category: '',
    description: '',
    traditions: [],
    status: 'upcoming'
  };

  let categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'harvest', name: 'Harvest Festivals' },
    { id: 'religious', name: 'Religious Festivals' },
    { id: 'cultural', name: 'Cultural Festivals' },
    { id: 'seasonal', name: 'Seasonal Festivals' }
  ];

  let festivalCategories = [
    'Harvest Festivals',
    'Religious Festivals',
    'Cultural Festivals',
    'Seasonal Festivals',
    'Family Celebrations'
  ];

  let statuses = [
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'completed', name: 'Completed' }
  ];

  $: filteredFestivals = festivals.filter(festival => {
    const matchesSearch = festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         festival.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         festival.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || festival.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  function addFestival() {
    if (newFestival.name && newFestival.date) {
      festivals = [...festivals, {
        ...newFestival,
        id: Date.now(),
        traditions: newFestival.traditions.split(',').map(t => t.trim())
      }];
      newFestival = {
        name: '',
        tamilName: '',
        date: '',
        category: '',
        description: '',
        traditions: [],
        status: 'upcoming'
      };
      showAddModal = false;
    }
  }

  function editFestival(festival) {
    editingFestival = { ...festival, traditions: festival.traditions.join(', ') };
    showEditModal = true;
  }

  function updateFestival() {
    if (editingFestival) {
      festivals = festivals.map(f =>
        f.id === editingFestival.id
          ? { ...editingFestival, traditions: editingFestival.traditions.split(',').map(t => t.trim()) }
          : f
      );
      showEditModal = false;
      editingFestival = null;
    }
  }

  function deleteFestival(id) {
    festivals = festivals.filter(f => f.id !== id);
  }

  function getStatusColor(status) {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getCategoryColor(category) {
    switch (category.toLowerCase()) {
      case 'harvest': return 'bg-amber-100 text-amber-800';
      case 'religious': return 'bg-purple-100 text-purple-800';
      case 'cultural': return 'bg-pink-100 text-pink-800';
      case 'seasonal': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Festivals</h1>
      <p class="text-base-content/70 mt-1">Celebrate and track traditional festivals and celebrations</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Festival
    </button>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:calendar-star" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Festivals</div>
      <div class="stat-value text-primary">{festivals.length}</div>
    </div>
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-blue-500">
        <Icon icon="mdi:clock-outline" class="w-8 h-8" />
      </div>
      <div class="stat-title">Upcoming</div>
      <div class="stat-value text-blue-500">
        {festivals.filter(f => f.status === 'upcoming').length}
      </div>
    </div>
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-green-500">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Completed</div>
      <div class="stat-value text-green-500">
        {festivals.filter(f => f.status === 'completed').length}
      </div>
    </div>
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-purple-500">
        <Icon icon="mdi:firework" class="w-8 h-8" />
      </div>
      <div class="stat-title">This Month</div>
      <div class="stat-value text-purple-500">
        {festivals.filter(f => {
          const festivalDate = new Date(f.date);
          const now = new Date();
          return festivalDate.getMonth() === now.getMonth() &&
                 festivalDate.getFullYear() === now.getFullYear();
        }).length}
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-lg p-4 shadow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Festivals</span>
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
        <select bind:value={selectedCategory} class="select select-bordered w-full">
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Festivals Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredFestivals as festival}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="card-title text-lg">{festival.name}</h3>
              <p class="text-sm text-base-content/70">{festival.tamilName}</p>
            </div>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a on:click={() => editFestival(festival)}>Edit</a></li>
                <li><a class="text-error" on:click={() => deleteFestival(festival.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:calendar" class="w-4 h-4 text-base-content/60" />
              <span class="text-sm">{formatDate(festival.date)}</span>
            </div>

            <div class="flex items-center gap-2">
              <Icon icon="mdi:tag" class="w-4 h-4 text-base-content/60" />
              <span class="badge badge-sm {getCategoryColor(festival.category)}">
                {festival.category}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <Icon icon="mdi:information" class="w-4 h-4 text-base-content/60" />
              <span class="badge badge-sm {getStatusColor(festival.status)}">
                {festival.status}
              </span>
            </div>
          </div>

          <p class="text-sm text-base-content/80 mt-3 line-clamp-2">
            {festival.description}
          </p>

          {#if festival.traditions && festival.traditions.length > 0}
            <div class="mt-3">
              <p class="text-xs font-medium text-base-content/70 mb-1">Traditions:</p>
              <div class="flex flex-wrap gap-1">
                {#each festival.traditions.slice(0, 3) as tradition}
                  <span class="badge badge-xs badge-outline">{tradition}</span>
                {/each}
                {#if festival.traditions.length > 3}
                  <span class="badge badge-xs badge-outline">+{festival.traditions.length - 3}</span>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredFestivals.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:calendar-star" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/70">No festivals found</h3>
      <p class="text-base-content/50 mt-1">Try adjusting your search or filter criteria</p>
    </div>
  {/if}
</div>

<!-- Add Festival Modal -->
{#if showAddModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Add New Festival</h3>

      <form on:submit|preventDefault={addFestival} class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Festival Name *</span>
          </label>
          <input
            type="text"
            bind:value={newFestival.name}
            placeholder="e.g., Pongal"
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
            bind:value={newFestival.tamilName}
            placeholder="e.g., பொங்கல்"
            class="input input-bordered w-full"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Date *</span>
            </label>
            <input
              type="date"
              bind:value={newFestival.date}
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={newFestival.category} class="select select-bordered w-full">
              <option value="">Select Category</option>
              {#each festivalCategories as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            bind:value={newFestival.description}
            placeholder="Brief description of the festival..."
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Traditions (comma separated)</span>
          </label>
          <input
            type="text"
            bind:value={newFestival.traditions}
            placeholder="e.g., Boiling rice, Drawing kolam, Feeding cows"
            class="input input-bordered w-full"
          />
        </div>

        <div class="modal-action">
          <button type="button" on:click={() => showAddModal = false} class="btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Add Festival</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Edit Festival Modal -->
{#if showEditModal && editingFestival}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Edit Festival</h3>

      <form on:submit|preventDefault={updateFestival} class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Festival Name *</span>
          </label>
          <input
            type="text"
            bind:value={editingFestival.name}
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
            bind:value={editingFestival.tamilName}
            class="input input-bordered w-full"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Date *</span>
            </label>
            <input
              type="date"
              bind:value={editingFestival.date}
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select bind:value={editingFestival.status} class="select select-bordered w-full">
              {#each statuses as status}
                <option value={status.id}>{status.name}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select bind:value={editingFestival.category} class="select select-bordered w-full">
            {#each festivalCategories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            bind:value={editingFestival.description}
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Traditions (comma separated)</span>
          </label>
          <input
            type="text"
            bind:value={editingFestival.traditions}
            class="input input-bordered w-full"
          />
        </div>

        <div class="modal-action">
          <button type="button" on:click={() => { showEditModal = false; editingFestival = null; }} class="btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Update Festival</button>
        </div>
      </form>
    </div>
  </div>
{/if}