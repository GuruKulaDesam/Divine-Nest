<script>
  import { onMount } from 'svelte';
  import { users } from '$lib/stores/users';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { goto } from '$app/navigation';

  let usersData = [];
  let filteredUsers = [];
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalPages = 1;
  let sortBy = 'created_at';
  let sortOrder = 'desc';
  let searchTerm = '';

  // Filter options
  let filters = {
    role: '',
    auth_provider: '',
    location: ''
  };

  // Available filter options
  const roleOptions = ['Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin'];
  const authProviderOptions = ['Google', 'Facebook', 'Manual'];

  // Subscribe to store
  const unsubscribe = users.subscribe(data => {
    usersData = data;
    applyFiltersAndSort();
  });

  function applyFiltersAndSort() {
    let filtered = [...usersData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nick_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Apply auth provider filter
    if (filters.auth_provider) {
      filtered = filtered.filter(user => user.auth_provider === filters.auth_provider);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(user =>
        user.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'created_at' || sortBy === 'joined_date') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    filteredUsers = filtered;
    totalPages = Math.ceil(filtered.length / itemsPerPage);
    currentPage = Math.min(currentPage, totalPages) || 1;
  }

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
      goto('/users/create');
    } else if (lowerCommand.includes('filter') || lowerCommand.includes('show')) {
      if (lowerCommand.includes('family') || lowerCommand.includes('members')) {
        filters.role = 'Father'; // Will show all family roles
        applyFiltersAndSort();
      } else if (lowerCommand.includes('service') || lowerCommand.includes('provider')) {
        filters.role = 'Service Provider';
        applyFiltersAndSort();
      } else if (lowerCommand.includes('guest')) {
        filters.role = 'Guest';
        applyFiltersAndSort();
      } else if (lowerCommand.includes('admin')) {
        filters.role = 'Admin';
        applyFiltersAndSort();
      }
    } else if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      clearFilters();
    } else if (lowerCommand.includes('sort')) {
      if (lowerCommand.includes('name')) {
        sortBy = 'name';
      } else if (lowerCommand.includes('role')) {
        sortBy = 'role';
      } else if (lowerCommand.includes('date') || lowerCommand.includes('joined')) {
        sortBy = 'joined_date';
      }
      applyFiltersAndSort();
    }
  }

  function clearFilters() {
    filters = {
      role: '',
      auth_provider: '',
      location: ''
    };
    searchTerm = '';
    currentPage = 1;
    applyFiltersAndSort();
  }

  function changeSort(field) {
    if (sortBy === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = field;
      sortOrder = 'asc';
    }
    applyFiltersAndSort();
  }

  function getPaginatedData() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.slice(start, end);
  }

  function exportData(format) {
    const data = filteredUsers.map(user => ({
      ID: user.id,
      Name: user.name,
      Nickname: user.nick_name || '',
      Email: user.email,
      Role: user.role,
      Location: user.location || '',
      'Join Date': new Date(user.joined_date).toLocaleDateString(),
      'Auth Provider': user.auth_provider,
      'Created At': new Date(user.created_at).toLocaleString()
    }));

    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');

      downloadFile(csv, 'users.csv', 'text/csv');
    } else if (format === 'json') {
      downloadFile(JSON.stringify(data, null, 2), 'users.json', 'application/json');
    }
  }

  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  onMount(() => {
    applyFiltersAndSort();
  });

  // Cleanup subscription
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:head>
  <title>Users Review - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Users Review</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">Manage all user accounts and permissions</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput
        onResult={handleVoiceCommand}
        placeholder="Say 'filter family members' or 'sort by name'"
      />
      <button
        class="btn btn-primary"
        on:click={() => goto('/users/create')}
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add User
      </button>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="card bg-white dark:bg-gray-800 shadow-lg mb-6">
    <div class="card-body">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="form-control flex-1">
          <label class="label">
            <span class="label-text font-medium">Search</span>
          </label>
          <input
            type="text"
            bind:value={searchTerm}
            on:input={applyFiltersAndSort}
            class="input input-bordered w-full"
            placeholder="Search by name, nickname, email, or location..."
          />
        </div>

        <!-- Role Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Role</span>
          </label>
          <select
            bind:value={filters.role}
            on:change={applyFiltersAndSort}
            class="select select-bordered w-full"
          >
            <option value="">All Roles</option>
            {#each roleOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <!-- Auth Provider Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Auth Provider</span>
          </label>
          <select
            bind:value={filters.auth_provider}
            on:change={applyFiltersAndSort}
            class="select select-bordered w-full"
          >
            <option value="">All Providers</option>
            {#each authProviderOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <!-- Location Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Location</span>
          </label>
          <input
            type="text"
            bind:value={filters.location}
            on:input={applyFiltersAndSort}
            class="input input-bordered w-full"
            placeholder="Filter by location..."
          />
        </div>
      </div>

      <!-- Clear Filters -->
      <div class="flex justify-between items-center mt-4">
        <button
          class="btn btn-outline btn-sm"
          on:click={clearFilters}
        >
          Clear All Filters
        </button>

        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredUsers.length} of {usersData.length} users
        </div>
      </div>
    </div>
  </div>

  <!-- Export and Actions -->
  <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
    <div class="flex gap-2">
      <button
        class="btn btn-outline btn-sm"
        on:click={() => exportData('csv')}
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Export CSV
      </button>
      <button
        class="btn btn-outline btn-sm"
        on:click={() => exportData('json')}
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Export JSON
      </button>
    </div>

    <div class="flex items-center gap-4">
      <label class="label">
        <span class="label-text">Items per page:</span>
      </label>
      <select
        bind:value={itemsPerPage}
        on:change={() => {
          currentPage = 1;
          applyFiltersAndSort();
        }}
        class="select select-bordered select-sm"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  </div>

  <!-- Data Table -->
  <div class="card bg-white dark:bg-gray-800 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => changeSort('name')}
                >
                  Name
                  {#if sortBy === 'name'}
                    <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"></path>
                    </svg>
                  {/if}
                </button>
              </th>
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => changeSort('role')}
                >
                  Role
                  {#if sortBy === 'role'}
                    <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"></path>
                    </svg>
                  {/if}
                </button>
              </th>
              <th>Email</th>
              <th>Location</th>
              <th>Auth Provider</th>
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => changeSort('joined_date')}
                >
                  Joined
                  {#if sortBy === 'joined_date'}
                    <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"></path>
                    </svg>
                  {/if}
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each getPaginatedData() as user}
              <tr class="hover">
                <td>
                  {#if user.picture_url}
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                        <img src={user.picture_url} alt={user.name} />
                      </div>
                    </div>
                  {:else}
                    <div class="avatar placeholder">
                      <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span class="text-sm">{user.name.charAt(0)}</span>
                      </div>
                    </div>
                  {/if}
                </td>
                <td>
                  <div>
                    <div class="font-medium">{user.name}</div>
                    {#if user.nick_name}
                      <div class="text-sm text-gray-500">"{user.nick_name}"</div>
                    {/if}
                  </div>
                </td>
                <td>
                  <span class="badge badge-outline badge-primary">{user.role}</span>
                </td>
                <td class="text-sm">{user.email}</td>
                <td>{user.location || 'Not specified'}</td>
                <td>
                  <span class="badge badge-outline badge-secondary">{user.auth_provider}</span>
                </td>
                <td class="text-sm">
                  {new Date(user.joined_date).toLocaleDateString()}
                </td>
                <td>
                  <div class="flex gap-2">
                    <button
                      class="btn btn-ghost btn-xs"
                      on:click={() => goto(`/users/update/${user.id}`)}
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      class="btn btn-ghost btn-xs text-red-500"
                      on:click={() => {
                        if (confirm('Delete this user?')) {
                          users.deleteUser(user.id);
                        }
                      }}
                      title="Delete"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if filteredUsers.length === 0}
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Users Found</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {searchTerm || Object.values(filters).some(v => v) ? 'Try adjusting your filters or search terms.' : 'Create your first user to get started.'}
          </p>
          <button
            class="btn btn-primary"
            on:click={() => goto('/users/create')}
          >
            Add First User
          </button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div class="flex justify-center mt-6">
      <div class="btn-group">
        <button
          class="btn btn-outline"
          disabled={currentPage === 1}
          on:click={() => {
            currentPage--;
            applyFiltersAndSort();
          }}
        >
          Previous
        </button>

        {#each Array(totalPages) as _, i}
          <button
            class="btn {currentPage === i + 1 ? 'btn-active' : 'btn-outline'}"
            on:click={() => {
              currentPage = i + 1;
              applyFiltersAndSort();
            }}
          >
            {i + 1}
          </button>
        {/each}

        <button
          class="btn btn-outline"
          disabled={currentPage === totalPages}
          on:click={() => {
            currentPage++;
            applyFiltersAndSort();
          }}
        >
          Next
        </button>
      </div>
    </div>
  {/if}

  <!-- Discussion Forum -->
  <div class="mt-8">
    <DiscussionForum tableName="users" recordId="review_page" />
  </div>
</div>