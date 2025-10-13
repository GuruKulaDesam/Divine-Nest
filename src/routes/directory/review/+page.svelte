<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { directory, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  // Filter and search state
  let searchTerm = '';
  let selectedCategory = '';
  let selectedType = '';
  let showFavoritesOnly = false;
  let sortBy = 'name';
  let sortOrder = 'asc';

  // Export state
  let isExporting = false;

  // Voice command handler
  function handleVoiceCommand(result) {
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('search for') || lowerResult.includes('find')) {
      const searchMatch = result.match(/(?:search for|find)\s+(.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    }

    if (lowerResult.includes('show favorites')) {
      showFavoritesOnly = true;
    }

    if (lowerResult.includes('show all')) {
      showFavoritesOnly = false;
      selectedCategory = '';
      selectedType = '';
    }

    if (lowerResult.includes('emergency')) {
      selectedCategory = 'Emergency';
    }

    if (lowerResult.includes('medical')) {
      selectedCategory = 'Medical';
    }

    if (lowerResult.includes('services')) {
      selectedCategory = 'Services';
    }
  }

  // Filtered and sorted entries
  $: filteredEntries = $directory
    .filter(entry => {
      // Role-based filtering
      if (!entry.applicable_roles?.includes($userProfile.role)) {
        return false;
      }

      // Search term filtering
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const searchableText = `${entry.name} ${entry.description} ${entry.phone} ${entry.email} ${entry.tags}`.toLowerCase();
        if (!searchableText.includes(term)) {
          return false;
        }
      }

      // Category filtering
      if (selectedCategory && entry.category !== selectedCategory) {
        return false;
      }

      // Type filtering
      if (selectedType && entry.type !== selectedType) {
        return false;
      }

      // Favorites filtering
      if (showFavoritesOnly && !entry.is_favorite) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortBy] || '';
      let bVal = b[sortBy] || '';

      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  // Statistics
  $: stats = {
    total: filteredEntries.length,
    emergency: filteredEntries.filter(e => e.category === 'Emergency').length,
    favorites: filteredEntries.filter(e => e.is_favorite).length,
    byCategory: filteredEntries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + 1;
      return acc;
    }, {})
  };

  function editEntry(entry) {
    goto(`/directory/update?id=${entry.id}`);
  }

  function createNew() {
    goto('/directory/create');
  }

  function toggleFavorite(entry) {
    directory.update(current =>
      current.map(e =>
        e.id === entry.id
          ? { ...e, is_favorite: !e.is_favorite, updated_at: new Date().toISOString() }
          : e
      )
    );
  }

  function callPhone(phone) {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  }

  function sendEmail(email) {
    if (email) {
      window.open(`mailto:${email}`, '_self');
    }
  }

  function openWebsite(website) {
    if (website) {
      window.open(website, '_blank');
    }
  }

  function getDirections(address) {
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  }

  async function exportToCSV() {
    isExporting = true;

    try {
      const headers = [
        'Name', 'Category', 'Type', 'Phone', 'Email', 'Address',
        'Website', 'Hours', 'Notes', 'Tags', 'Favorite', 'Created', 'Updated'
      ];

      const csvContent = [
        headers.join(','),
        ...filteredEntries.map(entry => [
          `"${entry.name || ''}"`,
          `"${entry.category || ''}"`,
          `"${entry.type || ''}"`,
          `"${entry.phone || ''}"`,
          `"${entry.email || ''}"`,
          `"${entry.address || ''}"`,
          `"${entry.website || ''}"`,
          `"${entry.hours || ''}"`,
          `"${entry.notes || ''}"`,
          `"${entry.tags || ''}"`,
          entry.is_favorite ? 'Yes' : 'No',
          `"${entry.created_at || ''}"`,
          `"${entry.updated_at || ''}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `directory_entries_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      isExporting = false;
    }
  }

  async function exportToJSON() {
    isExporting = true;

    try {
      const jsonContent = JSON.stringify(filteredEntries, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `directory_entries_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error exporting JSON:', error);
    } finally {
      isExporting = false;
    }
  }

  function clearFilters() {
    searchTerm = '';
    selectedCategory = '';
    selectedType = '';
    showFavoritesOnly = false;
    sortBy = 'name';
    sortOrder = 'asc';
  }
</script>

<svelte:head>
  <title>Directory Review - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Directory Review" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Directory Review</h1>
        <p class="text-base-content/70">Browse and manage all directory entries</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'search for doctor' or 'show favorites'" />
        <button class="btn btn-primary" on:click={createNew}>
          <Icon icon="heroicons:plus" class="w-4 h-4" />
          Add Entry
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon icon="heroicons:document-text" class="w-6 h-6 text-primary" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.total}</div>
              <div class="text-sm text-base-content/70">Total Entries</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-error/10 rounded-lg">
              <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-error" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.emergency}</div>
              <div class="text-sm text-base-content/70">Emergency</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-warning/10 rounded-lg">
              <Icon icon="heroicons:star" class="w-6 h-6 text-warning" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.favorites}</div>
              <div class="text-sm text-base-content/70">Favorites</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-info/10 rounded-lg">
              <Icon icon="heroicons:tag" class="w-6 h-6 text-info" />
            </div>
            <div>
              <div class="text-2xl font-bold">{Object.keys(stats.byCategory).length}</div>
              <div class="text-sm text-base-content/70">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search entries..."
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
              <option value="Emergency">Emergency</option>
              <option value="Family">Family</option>
              <option value="Services">Services</option>
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Government">Government</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select class="select select-bordered" bind:value={selectedType}>
              <option value="">All Types</option>
              <option value="Contact">Contact</option>
              <option value="Service">Service</option>
              <option value="Business">Business</option>
              <option value="Organization">Organization</option>
              <option value="Information">Information</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select class="select select-bordered" bind:value={sortBy}>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="type">Type</option>
              <option value="created_at">Created Date</option>
              <option value="updated_at">Updated Date</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          <label class="label cursor-pointer">
            <input type="checkbox" class="checkbox checkbox-warning" bind:checked={showFavoritesOnly} />
            <span class="label-text ml-2">Favorites Only</span>
          </label>

          <button class="btn btn-sm btn-outline" on:click={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}>
            <Icon icon={sortOrder === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'} class="w-4 h-4" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>

          <button class="btn btn-sm btn-ghost" on:click={clearFilters}>
            <Icon icon="heroicons:x-mark" class="w-4 h-4" />
            Clear Filters
          </button>
        </div>

        <!-- Export Buttons -->
        <div class="flex gap-2">
          <button
            class="btn btn-sm btn-outline"
            disabled={isExporting || filteredEntries.length === 0}
            on:click={exportToCSV}
          >
            {#if isExporting}
              <span class="loading loading-spinner loading-xs"></span>
            {/if}
            Export CSV
          </button>

          <button
            class="btn btn-sm btn-outline"
            disabled={isExporting || filteredEntries.length === 0}
            on:click={exportToJSON}
          >
            {#if isExporting}
              <span class="loading loading-spinner loading-xs"></span>
            {/if}
            Export JSON
          </button>
        </div>
      </div>
    </div>

    <!-- Entries List -->
    <div class="space-y-4">
      {#if filteredEntries.length === 0}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body text-center py-12">
            <Icon icon="heroicons:document-text" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
            <h3 class="text-lg font-semibold">No entries found</h3>
            <p class="text-base-content/70">Try adjusting your filters or create a new entry</p>
            <button class="btn btn-primary mt-4" on:click={createNew}>
              <Icon icon="heroicons:plus" class="w-4 h-4" />
              Add First Entry
            </button>
          </div>
        </div>
      {:else}
        {#each filteredEntries as entry (entry.id)}
          <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div class="card-body">
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-semibold">{entry.name}</h3>
                    {#if entry.is_favorite}
                      <Icon icon="heroicons:star" class="w-5 h-5 text-warning" />
                    {/if}
                  </div>

                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="badge badge-primary">{entry.category}</span>
                    <span class="badge badge-secondary">{entry.type}</span>
                    {#if entry.tags}
                      {#each entry.tags.split(',').map(t => t.trim()) as tag}
                        <span class="badge badge-outline">{tag}</span>
                      {/each}
                    {/if}
                  </div>

                  {#if entry.description}
                    <p class="text-base-content/80 mb-3">{entry.description}</p>
                  {/if}
                </div>

                <div class="flex gap-1">
                  <button
                    class="btn btn-sm btn-circle btn-ghost"
                    on:click={() => toggleFavorite(entry)}
                    class:text-warning={entry.is_favorite}
                  >
                    <Icon icon="heroicons:star" class="w-4 h-4" />
                  </button>

                  <button class="btn btn-sm btn-circle btn-ghost" on:click={() => editEntry(entry)}>
                    <Icon icon="heroicons:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Contact Actions -->
              <div class="flex flex-wrap gap-2 mb-4">
                {#if entry.phone}
                  <button class="btn btn-sm btn-outline" on:click={() => callPhone(entry.phone)}>
                    <Icon icon="heroicons:phone" class="w-4 h-4" />
                    Call
                  </button>
                {/if}

                {#if entry.email}
                  <button class="btn btn-sm btn-outline" on:click={() => sendEmail(entry.email)}>
                    <Icon icon="heroicons:envelope" class="w-4 h-4" />
                    Email
                  </button>
                {/if}

                {#if entry.website}
                  <button class="btn btn-sm btn-outline" on:click={() => openWebsite(entry.website)}>
                    <Icon icon="heroicons:globe-alt" class="w-4 h-4" />
                    Website
                  </button>
                {/if}

                {#if entry.address}
                  <button class="btn btn-sm btn-outline" on:click={() => getDirections(entry.address)}>
                    <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                    Directions
                  </button>
                {/if}
              </div>

              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/70">
                {#if entry.phone}
                  <div><strong>Phone:</strong> {entry.phone}</div>
                {/if}
                {#if entry.email}
                  <div><strong>Email:</strong> {entry.email}</div>
                {/if}
                {#if entry.hours}
                  <div><strong>Hours:</strong> {entry.hours}</div>
                {/if}
                {#if entry.address}
                  <div class="md:col-span-2"><strong>Address:</strong> {entry.address}</div>
                {/if}
                {#if entry.notes}
                  <div class="md:col-span-2"><strong>Notes:</strong> {entry.notes}</div>
                {/if}
              </div>

              <!-- Timestamps -->
              <div class="text-xs text-base-content/50 mt-4 pt-4 border-t">
                Created: {new Date(entry.created_at).toLocaleDateString()}
                {#if entry.updated_at !== entry.created_at}
                  | Updated: {new Date(entry.updated_at).toLocaleDateString()}
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

  </div>
</div>