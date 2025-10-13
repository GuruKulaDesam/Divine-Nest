<script>
  import { onMount } from 'svelte';
  import { assets, assetActions } from '$lib/stores/assets';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { Icon } from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  let currentUserRole = '';
  let allAssets: any[] = [];
  let filteredAssets: any[] = [];
  let displayedAssets: any[] = [];

  // Filtering and sorting
  let searchTerm = '';
  let selectedCategory = '';
  let selectedLocation = '';
  let selectedOwner = '';
  let dateFrom = '';
  let dateTo = '';
  let sortBy = 'date_added';
  let sortOrder = 'desc';

  // Pagination
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalPages = 1;

  // Analytics
  let analytics = {
    totalAssets: 0,
    uniqueCategories: 0,
    uniqueLocations: 0,
    uniqueOwners: 0,
    recentAdditions: 0
  };

  // Voice command handler
  function handleVoiceCommand(command: string) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('filter') || lowerCommand.includes('வடிகட்டு')) {
      // Parse filter commands
      if (lowerCommand.includes('hardware')) {
        selectedCategory = 'Hardware';
      } else if (lowerCommand.includes('vehicle') || lowerCommand.includes('car')) {
        selectedCategory = 'Vehicles';
      } else if (lowerCommand.includes('jewelry') || lowerCommand.includes('gold')) {
        selectedCategory = 'Valuables';
      } else if (lowerCommand.includes('document')) {
        selectedCategory = 'Documents';
      }
    } else if (lowerCommand.includes('sort') || lowerCommand.includes('வரிசை')) {
      if (lowerCommand.includes('name') || lowerCommand.includes('பெயர்')) {
        sortBy = 'name';
      } else if (lowerCommand.includes('date') || lowerCommand.includes('தேதி')) {
        sortBy = 'date_added';
      } else if (lowerCommand.includes('category') || lowerCommand.includes('வகை')) {
        sortBy = 'category';
      }

      if (lowerCommand.includes('ascending') || lowerCommand.includes('ஏறுவரிசை')) {
        sortOrder = 'asc';
      } else if (lowerCommand.includes('descending') || lowerCommand.includes('இறங்குவரிசை')) {
        sortOrder = 'desc';
      }
    } else if (lowerCommand.includes('export') || lowerCommand.includes('ஏற்றுமதி')) {
      handleExport('csv');
    } else if (lowerCommand.includes('search') || lowerCommand.includes('தேடு')) {
      // Extract search term
      const searchMatch = lowerCommand.match(/(?:search|தேடு)\s+(.+)/);
      if (searchMatch) {
        searchTerm = searchMatch[1];
      }
    }
  }

  // Apply filters and sorting
  function applyFiltersAndSorting() {
    let filtered = [...allAssets];

    // Role-based filtering
    filtered = filtered.filter(asset => asset.applicable_roles.includes(currentUserRole));

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(term) ||
        (asset.description && asset.description.toLowerCase().includes(term)) ||
        asset.category.toLowerCase().includes(term) ||
        (asset.location && asset.location.toLowerCase().includes(term)) ||
        (asset.owner && asset.owner.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(asset => asset.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(asset => asset.location === selectedLocation);
    }

    // Owner filter
    if (selectedOwner) {
      filtered = filtered.filter(asset => asset.owner === selectedOwner);
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(asset => asset.date_added >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter(asset => asset.date_added <= dateTo);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'location':
          aValue = (a.location || '').toLowerCase();
          bValue = (b.location || '').toLowerCase();
          break;
        case 'date_added':
        default:
          aValue = new Date(a.date_added).getTime();
          bValue = new Date(b.date_added).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    filteredAssets = filtered;

    // Calculate analytics
    calculateAnalytics();

    // Apply pagination
    applyPagination();
  }

  // Calculate analytics
  function calculateAnalytics() {
    analytics = {
      totalAssets: filteredAssets.length,
      uniqueCategories: new Set(filteredAssets.map(asset => asset.category)).size,
      uniqueLocations: new Set(filteredAssets.map(asset => asset.location).filter(Boolean)).size,
      uniqueOwners: new Set(filteredAssets.map(asset => asset.owner).filter(Boolean)).size,
      recentAdditions: assetActions.getRecentAssets(30).length
    };
  }

  // Apply pagination
  function applyPagination() {
    totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    displayedAssets = filteredAssets.slice(startIndex, endIndex);
  }

  // Handle page change
  function changePage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      applyPagination();
    }
  }

  // Clear all filters
  function clearFilters() {
    searchTerm = '';
    selectedCategory = '';
    selectedLocation = '';
    selectedOwner = '';
    dateFrom = '';
    dateTo = '';
    sortBy = 'date_added';
    sortOrder = 'desc';
    currentPage = 1;
    applyFiltersAndSorting();
  }

  // Export data
  function handleExport(format: 'csv' | 'json') {
    const dataToExport = filteredAssets.map(asset => ({
      Name: asset.name,
      Category: asset.category,
      SubCategory: asset.sub_category || '',
      Description: asset.description || '',
      Location: asset.location || '',
      Owner: asset.owner || '',
      DateAdded: asset.date_added,
      Tags: asset.tags ? JSON.parse(asset.tags).join(', ') : '',
      Created: asset.created_at
    }));

    if (format === 'csv') {
      const csvContent = [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map(row => Object.values(row).map(value =>
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        ).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assets_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assets_export_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // Get unique values for filters
  $: uniqueCategories = [...new Set(allAssets.map(asset => asset.category))].sort();
  $: uniqueLocations = [...new Set(allAssets.map(asset => asset.location).filter(Boolean))].sort();
  $: uniqueOwners = [...new Set(allAssets.map(asset => asset.owner).filter(Boolean))].sort();

  onMount(() => {
    // Subscribe to stores
    const unsubscribeAssets = assets.subscribe(value => {
      allAssets = value;
      applyFiltersAndSorting();
    });

    const unsubscribeUser = userProfile.subscribe(profile => {
      currentUserRole = profile.role || 'Child';
      applyFiltersAndSorting();
    });

    return () => {
      unsubscribeAssets();
      unsubscribeUser();
    };
  });

  // Reactive statements for filtering
  $: if (searchTerm || selectedCategory || selectedLocation || selectedOwner || dateFrom || dateTo || sortBy || sortOrder) {
    applyFiltersAndSorting();
  }
</script>

<svelte:head>
  <title>Assets Review - Divine-Nest</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
    <div>
      <h1 class="text-3xl font-bold text-primary">{$_('assets.review.title')}</h1>
      <p class="text-base-content/70 mt-1">{$_('assets.review.subtitle')}</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput
        placeholder={$_('assets.review.voice_placeholder')}
        onResult={handleVoiceCommand}
        className="btn btn-outline btn-primary"
      />

      <a href="/assets/create" class="btn btn-primary">
        <Icon icon="mdi:plus" class="w-5 h-5" />
        {$_('assets.review.add_asset')}
      </a>

      <a href="/assets/dashboard" class="btn btn-outline">
        <Icon icon="mdi:view-dashboard" class="w-5 h-5" />
        {$_('assets.review.view_dashboard')}
      </a>
    </div>
  </div>

  <!-- Analytics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
    <div class="card bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('assets.review.total_assets')}</h3>
            <p class="text-2xl font-bold">{analytics.totalAssets}</p>
          </div>
          <Icon icon="mdi:package-variant" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('assets.review.categories')}</h3>
            <p class="text-2xl font-bold">{analytics.uniqueCategories}</p>
          </div>
          <Icon icon="mdi:tag-multiple" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('assets.review.locations')}</h3>
            <p class="text-2xl font-bold">{analytics.uniqueLocations}</p>
          </div>
          <Icon icon="mdi:map-marker-multiple" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('assets.review.owners')}</h3>
            <p class="text-2xl font-bold">{analytics.uniqueOwners}</p>
          </div>
          <Icon icon="mdi:account-group" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('assets.review.recent')}</h3>
            <p class="text-2xl font-bold">{analytics.recentAdditions}</p>
          </div>
          <Icon icon="mdi:clock-outline" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="card bg-base-100 shadow-xl mb-6">
    <div class="card-body">
      <div class="flex items-center justify-between mb-4">
        <h2 class="card-title text-xl">
          <Icon icon="mdi:filter" class="w-6 h-6" />
          {$_('assets.review.filters')}
        </h2>

        <div class="flex gap-2">
          <button class="btn btn-sm btn-outline" on:click={clearFilters}>
            <Icon icon="mdi:filter-off" class="w-4 h-4" />
            {$_('assets.review.clear_filters')}
          </button>

          <div class="dropdown dropdown-end">
            <button class="btn btn-sm btn-primary">
              <Icon icon="mdi:download" class="w-4 h-4" />
              {$_('assets.review.export')}
            </button>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
              <li><a on:click={() => handleExport('csv')}>CSV</a></li>
              <li><a on:click={() => handleExport('json')}>JSON</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('assets.review.search')}</span>
          </label>
          <input
            type="text"
            bind:value={searchTerm}
            placeholder={$_('assets.review.search_placeholder')}
            class="input input-bordered input-sm"
          />
        </div>

        <!-- Category Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('assets.review.category')}</span>
          </label>
          <select bind:value={selectedCategory} class="select select-bordered select-sm">
            <option value="">{$_('assets.review.all_categories')}</option>
            {#each uniqueCategories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>

        <!-- Location Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('assets.review.location')}</span>
          </label>
          <select bind:value={selectedLocation} class="select select-bordered select-sm">
            <option value="">{$_('assets.review.all_locations')}</option>
            {#each uniqueLocations as location}
              <option value={location}>{location}</option>
            {/each}
          </select>
        </div>

        <!-- Owner Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('assets.review.owner')}</span>
          </label>
          <select bind:value={selectedOwner} class="select select-bordered select-sm">
            <option value="">{$_('assets.review.all_owners')}</option>
            {#each uniqueOwners as owner}
              <option value={owner}>{owner}</option>
            {/each}
          </select>
        </div>

        <!-- Date From -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('assets.review.date_from')}</span>
          </label>
          <input
            type="date"
            bind:value={dateFrom}
            class="input input-bordered input-sm"
          />
        </div>

        <!-- Date To -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('assets.review.date_to')}</span>
          </label>
          <input
            type="date"
            bind:value={dateTo}
            class="input input-bordered input-sm"
          />
        </div>
      </div>

      <!-- Sort Options -->
      <div class="flex items-center gap-4 mt-4">
        <span class="text-sm font-semibold">{$_('assets.review.sort_by')}:</span>
        <select bind:value={sortBy} class="select select-bordered select-sm">
          <option value="date_added">{$_('assets.review.sort_date')}</option>
          <option value="name">{$_('assets.review.sort_name')}</option>
          <option value="category">{$_('assets.review.sort_category')}</option>
          <option value="location">{$_('assets.review.sort_location')}</option>
        </select>
        <select bind:value={sortOrder} class="select select-bordered select-sm">
          <option value="desc">{$_('assets.review.sort_desc')}</option>
          <option value="asc">{$_('assets.review.sort_asc')}</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Results Summary -->
  <div class="flex items-center justify-between mb-4">
    <p class="text-sm opacity-70">
      {$_('assets.review.showing')} {displayedAssets.length} {$_('assets.review.of')} {filteredAssets.length} {$_('assets.review.assets')}
    </p>

    <div class="flex items-center gap-2">
      <span class="text-sm">{$_('assets.review.items_per_page')}:</span>
      <select bind:value={itemsPerPage} class="select select-bordered select-sm" on:change={applyPagination}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  </div>

  <!-- Assets Table -->
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-0">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead class="bg-base-200">
            <tr>
              <th>{$_('assets.review.table.name')}</th>
              <th>{$_('assets.review.table.category')}</th>
              <th>{$_('assets.review.table.location')}</th>
              <th>{$_('assets.review.table.owner')}</th>
              <th>{$_('assets.review.table.date_added')}</th>
              <th>{$_('assets.review.table.tags')}</th>
              <th>{$_('assets.review.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {#each displayedAssets as asset}
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <div class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content rounded-full w-8 h-8">
                        <span class="text-xs">{asset.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-semibold">{asset.name}</div>
                      {#if asset.description}
                        <div class="text-sm opacity-70 truncate max-w-xs" title={asset.description}>
                          {asset.description}
                        </div>
                      {/if}
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-outline">{asset.category}</span>
                  {#if asset.sub_category}
                    <div class="text-xs opacity-70 mt-1">{asset.sub_category}</div>
                  {/if}
                </td>
                <td>{asset.location || 'Unknown'}</td>
                <td>{asset.owner || 'Unknown'}</td>
                <td>{new Date(asset.date_added).toLocaleDateString()}</td>
                <td>
                  {#if asset.tags}
                    {@const tags = JSON.parse(asset.tags)}
                    <div class="flex flex-wrap gap-1">
                      {#each tags.slice(0, 2) as tag}
                        <span class="badge badge-xs badge-primary">{tag}</span>
                      {/each}
                      {#if tags.length > 2}
                        <span class="badge badge-xs badge-outline">+{tags.length - 2}</span>
                      {/if}
                    </div>
                  {:else}
                    <span class="text-sm opacity-50">-</span>
                  {/if}
                </td>
                <td>
                  <div class="flex gap-1">
                    <a href="/assets/update/{asset.id}" class="btn btn-sm btn-ghost">
                      <Icon icon="mdi:pencil" class="w-4 h-4" />
                    </a>
                    <button
                      class="btn btn-sm btn-ghost text-error"
                      on:click={() => {
                        if (confirm($_('assets.review.confirm_delete'))) {
                          assetActions.delete(asset.id);
                        }
                      }}
                    >
                      <Icon icon="mdi:delete" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if displayedAssets.length === 0}
        <div class="text-center py-12">
          <Icon icon="mdi:package-variant-closed" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
          <p class="text-lg opacity-70">{$_('assets.review.no_assets')}</p>
          <p class="text-sm opacity-50 mb-4">{$_('assets.review.try_adjusting_filters')}</p>
          <a href="/assets/create" class="btn btn-primary">
            {$_('assets.review.add_first_asset')}
          </a>
        </div>
      {/if}
    </div>
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div class="flex justify-center mt-6">
      <div class="join">
        <button
          class="join-item btn"
          disabled={currentPage === 1}
          on:click={() => changePage(currentPage - 1)}
        >
          <Icon icon="mdi:chevron-left" class="w-4 h-4" />
        </button>

        {#each Array(totalPages) as _, i}
          {#if i + 1 === currentPage || i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
            <button
              class="join-item btn {i + 1 === currentPage ? 'btn-active' : ''}"
              on:click={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          {:else if i + 1 === currentPage - 2 || i + 1 === currentPage + 2}
            <span class="join-item btn btn-disabled">...</span>
          {/else}
        {/each}

        <button
          class="join-item btn"
          disabled={currentPage === totalPages}
          on:click={() => changePage(currentPage + 1)}
        >
          <Icon icon="mdi:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </div>
  {/if}

  <!-- Discussion Forum -->
  <DiscussionForum
    tableName="assets_review"
    recordId="general"
    title={$_('assets.review.discussion_title')}
    placeholder={$_('assets.review.discussion_placeholder')}
  />
</div>