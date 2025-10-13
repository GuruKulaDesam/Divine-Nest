<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let directory = [];
  let showAddForm = false;
  let editingEntry = null;
  let searchTerm = "";
  let selectedCategory = "";
  let selectedType = "";

  // Form data
  let formData = {
    category: "Emergency",
    type: "Contact",
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    hours: "",
    notes: "",
    is_favorite: false,
    tags: ""
  };

  // Load directory on mount
  onMount(async () => {
    await loadDirectory();
  });

  async function loadDirectory() {
    try {
      directory = await sqliteService.getDirectory();
    } catch (error) {
      console.error("Error loading directory:", error);
    }
  }

  function resetForm() {
    formData = {
      category: "Emergency",
      type: "Contact",
      name: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      website: "",
      hours: "",
      notes: "",
      is_favorite: false,
      tags: ""
    };
  }

  async function saveEntry() {
    try {
      const entryData = {
        ...formData,
        id: editingEntry ? editingEntry.id : crypto.randomUUID(),
        created_at: editingEntry ? editingEntry.created_at : new Date().toISOString(),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      if (editingEntry) {
        await sqliteService.updateDirectoryEntry(entryData);
      } else {
        await sqliteService.saveDirectoryEntry(entryData);
      }

      await loadDirectory();
      showAddForm = false;
      editingEntry = null;
      resetForm();
    } catch (error) {
      console.error("Error saving directory entry:", error);
    }
  }

  function editEntry(entry) {
    editingEntry = entry;
    formData = {
      ...entry,
      tags: entry.tags ? entry.tags.join(', ') : ''
    };
    showAddForm = true;
  }

  async function deleteEntry(entry) {
    if (confirm(`Delete directory entry "${entry.name}"?`)) {
      try {
        await sqliteService.deleteDirectoryEntry(entry.id);
        await loadDirectory();
      } catch (error) {
        console.error("Error deleting directory entry:", error);
      }
    }
  }

  async function toggleFavorite(entry) {
    try {
      const updatedEntry = {
        ...entry,
        is_favorite: !entry.is_favorite
      };
      await sqliteService.updateDirectoryEntry(updatedEntry);
      await loadDirectory();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingEntry = null;
    resetForm();
  }

  // Filter directory based on search and filters
  $: filteredDirectory = directory.filter(entry => {
    const matchesSearch = !searchTerm ||
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    const matchesType = !selectedType || entry.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique values for filters
  $: categories = [...new Set(directory.map(d => d.category))];
  $: types = [...new Set(directory.map(d => d.type))];

  // Group directory by category for display
  $: groupedDirectory = filteredDirectory.reduce((groups, entry) => {
    if (!groups[entry.category]) {
      groups[entry.category] = [];
    }
    groups[entry.category].push(entry);
    return groups;
  }, {});

  // Get icon for category
  function getCategoryIcon(category) {
    switch (category) {
      case 'Emergency': return 'heroicons:exclamation-triangle';
      case 'Medical': return 'heroicons:heart';
      case 'Government': return 'heroicons:building-office';
      case 'Education': return 'heroicons:academic-cap';
      case 'Services': return 'heroicons:wrench-screwdriver';
      case 'Shopping': return 'heroicons:shopping-bag';
      case 'Food': return 'heroicons:building-storefront';
      case 'Transportation': return 'heroicons:truck';
      case 'Entertainment': return 'heroicons:film';
      case 'Religious': return 'heroicons:sparkles';
      case 'Community': return 'heroicons:user-group';
      case 'Personal': return 'heroicons:user';
      default: return 'heroicons:information-circle';
    }
  }

  // Get color for type
  function getTypeColor(type) {
    switch (type) {
      case 'Contact': return 'text-blue-600 bg-blue-100';
      case 'Service': return 'text-green-600 bg-green-100';
      case 'Business': return 'text-purple-600 bg-purple-100';
      case 'Organization': return 'text-orange-600 bg-orange-100';
      case 'Place': return 'text-teal-600 bg-teal-100';
      default: return 'text-base-content bg-base-200';
    }
  }

  // Format contact info for display
  function formatContactInfo(entry) {
    const info = [];
    if (entry.phone) info.push(`📞 ${entry.phone}`);
    if (entry.email) info.push(`✉️ ${entry.email}`);
    if (entry.website) info.push(`🌐 ${entry.website}`);
    return info;
  }
</script>

<svelte:head>
  <title>Directory - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:book-open" class="w-8 h-8" />
          Family Directory
        </h1>
        <p class="text-base-content/70 mt-1">Important contacts, services, and community resources</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingEntry = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Entry
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search directory..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select class="select select-bordered" bind:value={selectedCategory}>
            <option value="">All Categories</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Type</span>
          </label>
          <select class="select select-bordered" bind:value={selectedType}>
            <option value="">All Types</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Directory by Category -->
    {#each Object.entries(groupedDirectory) as [category, categoryEntries]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getCategoryIcon(category)} class="w-6 h-6" />
          {category}
          <span class="badge badge-primary badge-sm">{categoryEntries.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each categoryEntries as entry}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-3">
                    <div class="avatar">
                      <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon icon={getCategoryIcon(entry.category)} class="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <h3 class="card-title text-lg">{entry.name}</h3>
                        {#if entry.is_favorite}
                          <Icon icon="heroicons:star" class="w-5 h-5 text-yellow-500" />
                        {/if}
                      </div>

                      <p class="text-sm text-base-content/70 mb-3">{entry.description}</p>

                      <div class="flex flex-wrap gap-2 mb-3">
                        <span class="badge badge-sm {getTypeColor(entry.type)}">
                          {entry.type}
                        </span>
                        {#if entry.tags && entry.tags.length > 0}
                          {#each entry.tags.slice(0, 2) as tag}
                            <span class="badge badge-outline badge-sm">
                              {tag}
                            </span>
                          {/each}
                          {#if entry.tags.length > 2}
                            <span class="badge badge-outline badge-sm">
                              +{entry.tags.length - 2} more
                            </span>
                          {/if}
                        {/if}
                      </div>

                      <!-- Contact Information -->
                      {#if formatContactInfo(entry).length > 0}
                        <div class="space-y-1 mb-3">
                          {#each formatContactInfo(entry) as info}
                            <p class="text-sm text-base-content/80">{info}</p>
                          {/each}
                        </div>
                      {/if}

                      {#if entry.address}
                        <p class="text-sm text-base-content/80 mb-2">
                          📍 {entry.address}
                        </p>
                      {/if}

                      {#if entry.hours}
                        <p class="text-sm text-base-content/80 mb-2">
                          🕐 {entry.hours}
                        </p>
                      {/if}

                      {#if entry.notes}
                        <p class="text-sm text-base-content/60 italic">
                          "{entry.notes}"
                        </p>
                      {/if}
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                      <li><a on:click={() => toggleFavorite(entry)}>
                        <Icon icon={entry.is_favorite ? 'heroicons:star' : 'heroicons:star'} class="w-4 h-4" />
                        {entry.is_favorite ? 'Remove Favorite' : 'Add Favorite'}
                      </a></li>
                      <li><a on:click={() => editEntry(entry)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteEntry(entry)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="pt-3 border-t border-base-300">
                  <span class="text-xs text-base-content/50">
                    Added {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredDirectory.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:book-open" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No directory entries found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedCategory || selectedType ? "Try adjusting your filters" : "Add your first directory entry to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">
        {editingEntry ? "Edit Directory Entry" : "Add New Directory Entry"}
      </h3>

      <form on:submit|preventDefault={saveEntry} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>Emergency</option>
              <option>Medical</option>
              <option>Government</option>
              <option>Education</option>
              <option>Services</option>
              <option>Shopping</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Entertainment</option>
              <option>Religious</option>
              <option>Community</option>
              <option>Personal</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Contact</option>
              <option>Service</option>
              <option>Business</option>
              <option>Organization</option>
              <option>Place</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Name *</span>
          </label>
          <input
            type="text"
            placeholder="Entry name..."
            class="input input-bordered"
            bind:value={formData.name}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description *</span>
          </label>
          <textarea
            placeholder="Brief description..."
            class="textarea textarea-bordered"
            rows="2"
            bind:value={formData.description}
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Phone</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              class="input input-bordered"
              bind:value={formData.phone}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="contact@example.com"
              class="input input-bordered"
              bind:value={formData.email}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input
            type="text"
            placeholder="Full address..."
            class="input input-bordered"
            bind:value={formData.address}
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Website</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              class="input input-bordered"
              bind:value={formData.website}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Hours</span>
            </label>
            <input
              type="text"
              placeholder="Mon-Fri 9AM-5PM"
              class="input input-bordered"
              bind:value={formData.hours}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Tags</span>
          </label>
          <input
            type="text"
            placeholder="urgent, local, 24/7 (comma separated)"
            class="input input-bordered"
            bind:value={formData.tags}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Additional Notes</span>
          </label>
          <textarea
            placeholder="Any additional information..."
            class="textarea textarea-bordered"
            rows="2"
            bind:value={formData.notes}
          ></textarea>
        </div>

        <div class="form-group">
          <label class="label cursor-pointer">
            <span class="label-text">Mark as Favorite</span>
            <input type="checkbox" class="toggle toggle-primary" bind:checked={formData.is_favorite} />
          </label>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingEntry ? "Update" : "Add"} Entry
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}