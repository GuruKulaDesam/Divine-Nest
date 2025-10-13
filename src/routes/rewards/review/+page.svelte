<script>
  import { onMount } from 'svelte';
  import { rewards, rewardActions } from '$lib/stores/rewards';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  let currentUserRole = '';
  let allRewards = [];
  let filteredRewards = [];
  let displayedRewards = [];

  // Filtering and sorting
  let searchTerm = '';
  let selectedType = '';
  let selectedRole = '';
  let selectedPerson = '';
  let dateFrom = '';
  let dateTo = '';
  let sortBy = 'date';
  let sortOrder = 'desc';

  // Pagination
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalPages = 1;

  // Analytics
  let analytics = {
    totalPoints: 0,
    starCount: 0,
    karmaCount: 0,
    uniquePeople: 0,
    averagePoints: 0
  };

  // Voice command handler
  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('filter') || lowerCommand.includes('வடிகட்டு')) {
      // Parse filter commands
      if (lowerCommand.includes('star')) {
        selectedType = 'Star';
      } else if (lowerCommand.includes('karma')) {
        selectedType = 'Karma';
      }

      if (lowerCommand.includes('child')) {
        selectedRole = 'Child';
      } else if (lowerCommand.includes('adult')) {
        selectedRole = 'Adult';
      } else if (lowerCommand.includes('elder')) {
        selectedRole = 'Elder';
      }
    } else if (lowerCommand.includes('sort') || lowerCommand.includes('வரிசை')) {
      if (lowerCommand.includes('points') || lowerCommand.includes('புள்ளிகள்')) {
        sortBy = 'points';
      } else if (lowerCommand.includes('date') || lowerCommand.includes('தேதி')) {
        sortBy = 'date';
      } else if (lowerCommand.includes('person') || lowerCommand.includes('நபர்')) {
        sortBy = 'person';
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
    let filtered = [...allRewards];

    // Role-based filtering
    filtered = filtered.filter(reward => reward.applicable_roles.includes(currentUserRole));

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reward =>
        reward.person.toLowerCase().includes(term) ||
        reward.reason.toLowerCase().includes(term) ||
        reward.type.toLowerCase().includes(term)
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(reward => reward.type === selectedType);
    }

    // Role filter
    if (selectedRole) {
      filtered = filtered.filter(reward => reward.role === selectedRole);
    }

    // Person filter
    if (selectedPerson) {
      filtered = filtered.filter(reward => reward.person === selectedPerson);
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(reward => reward.date >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter(reward => reward.date <= dateTo);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'person':
          aValue = a.person.toLowerCase();
          bValue = b.person.toLowerCase();
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'date':
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    filteredRewards = filtered;

    // Calculate analytics
    calculateAnalytics();

    // Apply pagination
    applyPagination();
  }

  // Calculate analytics
  function calculateAnalytics() {
    analytics = {
      totalPoints: filteredRewards.reduce((sum, reward) => sum + reward.points, 0),
      starCount: filteredRewards.filter(reward => reward.type === 'Star').length,
      karmaCount: filteredRewards.filter(reward => reward.type === 'Karma').length,
      uniquePeople: new Set(filteredRewards.map(reward => reward.person)).size,
      averagePoints: filteredRewards.length > 0
        ? Math.round(filteredRewards.reduce((sum, reward) => sum + reward.points, 0) / filteredRewards.length)
        : 0
    };
  }

  // Apply pagination
  function applyPagination() {
    totalPages = Math.ceil(filteredRewards.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    displayedRewards = filteredRewards.slice(startIndex, endIndex);
  }

  // Handle page change
  function changePage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      applyPagination();
    }
  }

  // Clear all filters
  function clearFilters() {
    searchTerm = '';
    selectedType = '';
    selectedRole = '';
    selectedPerson = '';
    dateFrom = '';
    dateTo = '';
    sortBy = 'date';
    sortOrder = 'desc';
    currentPage = 1;
    applyFiltersAndSorting();
  }

  // Export data
  function handleExport(format) {
    const dataToExport = filteredRewards.map(reward => ({
      Person: reward.person,
      Role: reward.role,
      Type: reward.type,
      Reason: reward.reason,
      Points: reward.points,
      Date: reward.date,
      Created: reward.created_at
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
      a.download = `rewards_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rewards_export_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // Get unique values for filters
  $: uniquePeople = [...new Set(allRewards.map(reward => reward.person))].sort();

  onMount(() => {
    // Subscribe to stores
    const unsubscribeRewards = rewards.subscribe(value => {
      allRewards = value;
      applyFiltersAndSorting();
    });

    const unsubscribeUser = userProfile.subscribe(profile => {
      currentUserRole = profile.role || 'Child';
      applyFiltersAndSorting();
    });

    return () => {
      unsubscribeRewards();
      unsubscribeUser();
    };
  });

  // Reactive statements for filtering
  $: if (searchTerm || selectedType || selectedRole || selectedPerson || dateFrom || dateTo || sortBy || sortOrder) {
    applyFiltersAndSorting();
  }
</script>

<svelte:head>
  <title>Rewards Review - Divine-Nest</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
    <div>
      <h1 class="text-3xl font-bold text-primary">{$_('rewards.review.title')}</h1>
      <p class="text-base-content/70 mt-1">{$_('rewards.review.subtitle')}</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput
        placeholder={$_('rewards.review.voice_placeholder')}
        onResult={handleVoiceCommand}
        className="btn btn-outline btn-primary"
      />

      <a href="/rewards/create" class="btn btn-primary">
        <Icon icon="mdi:plus" class="w-5 h-5" />
        {$_('rewards.review.add_reward')}
      </a>

      <a href="/rewards/dashboard" class="btn btn-outline">
        <Icon icon="mdi:view-dashboard" class="w-5 h-5" />
        {$_('rewards.review.view_dashboard')}
      </a>
    </div>
  </div>

  <!-- Analytics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
    <div class="card bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('rewards.review.total_points')}</h3>
            <p class="text-2xl font-bold">{analytics.totalPoints.toLocaleString()}</p>
          </div>
          <Icon icon="mdi:star" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('rewards.review.star_rewards')}</h3>
            <p class="text-2xl font-bold">{analytics.starCount}</p>
          </div>
          <Icon icon="mdi:star-outline" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('rewards.review.karma_rewards')}</h3>
            <p class="text-2xl font-bold">{analytics.karmaCount}</p>
          </div>
          <Icon icon="mdi:flower" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('rewards.review.unique_people')}</h3>
            <p class="text-2xl font-bold">{analytics.uniquePeople}</p>
          </div>
          <Icon icon="mdi:account-group" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold opacity-90">{$_('rewards.review.average_points')}</h3>
            <p class="text-2xl font-bold">{analytics.averagePoints}</p>
          </div>
          <Icon icon="mdi:chart-line" class="w-8 h-8 opacity-80" />
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
          {$_('rewards.review.filters')}
        </h2>

        <div class="flex gap-2">
          <button class="btn btn-sm btn-outline" on:click={clearFilters}>
            <Icon icon="mdi:filter-off" class="w-4 h-4" />
            {$_('rewards.review.clear_filters')}
          </button>

          <div class="dropdown dropdown-end">
            <button class="btn btn-sm btn-primary">
              <Icon icon="mdi:download" class="w-4 h-4" />
              {$_('rewards.review.export')}
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
            <span class="label-text">{$_('rewards.review.search')}</span>
          </label>
          <input
            type="text"
            bind:value={searchTerm}
            placeholder={$_('rewards.review.search_placeholder')}
            class="input input-bordered input-sm"
          />
        </div>

        <!-- Type Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('rewards.review.type')}</span>
          </label>
          <select bind:value={selectedType} class="select select-bordered select-sm">
            <option value="">{$_('rewards.review.all_types')}</option>
            <option value="Star">⭐ {$_('rewards.review.star')}</option>
            <option value="Karma">🪷 {$_('rewards.review.karma')}</option>
          </select>
        </div>

        <!-- Role Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('rewards.review.role')}</span>
          </label>
          <select bind:value={selectedRole} class="select select-bordered select-sm">
            <option value="">{$_('rewards.review.all_roles')}</option>
            <option value="Child">{$_('rewards.review.child')}</option>
            <option value="Adult">{$_('rewards.review.adult')}</option>
            <option value="Elder">{$_('rewards.review.elder')}</option>
          </select>
        </div>

        <!-- Person Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('rewards.review.person')}</span>
          </label>
          <select bind:value={selectedPerson} class="select select-bordered select-sm">
            <option value="">{$_('rewards.review.all_people')}</option>
            {#each uniquePeople as person}
              <option value={person}>{person}</option>
            {/each}
          </select>
        </div>

        <!-- Date From -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('rewards.review.date_from')}</span>
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
            <span class="label-text">{$_('rewards.review.date_to')}</span>
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
        <span class="text-sm font-semibold">{$_('rewards.review.sort_by')}:</span>
        <select bind:value={sortBy} class="select select-bordered select-sm">
          <option value="date">{$_('rewards.review.sort_date')}</option>
          <option value="person">{$_('rewards.review.sort_person')}</option>
          <option value="points">{$_('rewards.review.sort_points')}</option>
        </select>
        <select bind:value={sortOrder} class="select select-bordered select-sm">
          <option value="desc">{$_('rewards.review.sort_desc')}</option>
          <option value="asc">{$_('rewards.review.sort_asc')}</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Results Summary -->
  <div class="flex items-center justify-between mb-4">
    <p class="text-sm opacity-70">
      {$_('rewards.review.showing')} {displayedRewards.length} {$_('rewards.review.of')} {filteredRewards.length} {$_('rewards.review.rewards')}
    </p>

    <div class="flex items-center gap-2">
      <span class="text-sm">{$_('rewards.review.items_per_page')}:</span>
      <select bind:value={itemsPerPage} class="select select-bordered select-sm" on:change={applyPagination}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  </div>

  <!-- Rewards Table -->
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body p-0">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead class="bg-base-200">
            <tr>
              <th>{$_('rewards.review.table.person')}</th>
              <th>{$_('rewards.review.table.role')}</th>
              <th>{$_('rewards.review.table.type')}</th>
              <th>{$_('rewards.review.table.reason')}</th>
              <th>{$_('rewards.review.table.points')}</th>
              <th>{$_('rewards.review.table.date')}</th>
              <th>{$_('rewards.review.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {#each displayedRewards as reward}
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <div class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content rounded-full w-8 h-8">
                        <span class="text-xs">{reward.person.charAt(0)}</span>
                      </div>
                    </div>
                    <span class="font-medium">{reward.person}</span>
                  </div>
                </td>
                <td>
                  <span class="badge badge-outline">{reward.role}</span>
                </td>
                <td>
                  <span class="badge badge-{reward.type === 'Star' ? 'primary' : 'secondary'}">
                    {reward.type}
                  </span>
                </td>
                <td class="max-w-xs truncate" title={reward.reason}>
                  {reward.reason}
                </td>
                <td class="font-bold text-primary">+{reward.points}</td>
                <td>{new Date(reward.date).toLocaleDateString()}</td>
                <td>
                  <div class="flex gap-1">
                    <a href="/rewards/update/{reward.id}" class="btn btn-sm btn-ghost">
                      <Icon icon="mdi:pencil" class="w-4 h-4" />
                    </a>
                    <button
                      class="btn btn-sm btn-ghost text-error"
                      on:click={() => {
                        if (confirm($_('rewards.review.confirm_delete'))) {
                          rewardActions.delete(reward.id);
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

      {#if displayedRewards.length === 0}
        <div class="text-center py-12">
          <Icon icon="mdi:star-off" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
          <p class="text-lg opacity-70">{$_('rewards.review.no_rewards')}</p>
          <p class="text-sm opacity-50 mb-4">{$_('rewards.review.try_adjusting_filters')}</p>
          <a href="/rewards/create" class="btn btn-primary">
            {$_('rewards.review.add_first_reward')}
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
          {/if}
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
    tableName="rewards_review"
    recordId="general"
    title={$_('rewards.review.discussion_title')}
    placeholder={$_('rewards.review.discussion_placeholder')}
  />
</div>