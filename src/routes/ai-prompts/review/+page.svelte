<script>
  import { onMount } from 'svelte';
  import { aiPrompts } from '$lib/stores/aiPrompts';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { goto } from '$app/navigation';

  let aiPromptsData = [];
  let filteredPrompts = [];
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalPages = 1;
  let sortBy = 'created_at';
  let sortOrder = 'desc';
  let searchTerm = '';

  // Filter options
  let filters = {
    type: '',
    category: '',
    frequency: '',
    sound_type: '',
    applicable_roles: []
  };

  // Available filter options
  const typeOptions = ['Alert', 'Notes', 'Checklist', 'Query'];
  const categoryOptions = ['SMS', 'Email', 'Phone', 'Calendar Schedule', 'WhatsApp', 'Alarm'];
  const frequencyOptions = ['Once', 'Daily', 'Weekly', 'Monthly', 'Custom'];
  const soundTypeOptions = ['Positive', 'Negative', 'Alarming', 'Pleasant'];
  const roleOptions = ['Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin'];

  // Subscribe to store
  const unsubscribe = aiPrompts.subscribe(data => {
    aiPromptsData = data;
    applyFiltersAndSort();
  });

  function applyFiltersAndSort() {
    let filtered = [...aiPromptsData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(prompt =>
        prompt.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.conditions?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(prompt => prompt.type === filters.type);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(prompt => prompt.category === filters.category);
    }

    // Apply frequency filter
    if (filters.frequency) {
      filtered = filtered.filter(prompt => prompt.frequency === filters.frequency);
    }

    // Apply sound type filter
    if (filters.sound_type) {
      filtered = filtered.filter(prompt => prompt.sound_type === filters.sound_type);
    }

    // Apply role filter
    if (filters.applicable_roles.length > 0) {
      filtered = filtered.filter(prompt =>
        filters.applicable_roles.some(role => prompt.applicable_roles.includes(role))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'created_at') {
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

    filteredPrompts = filtered;
    totalPages = Math.ceil(filtered.length / itemsPerPage);
    currentPage = Math.min(currentPage, totalPages) || 1;
  }

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
      goto('/ai-prompts/create');
    } else if (lowerCommand.includes('filter') || lowerCommand.includes('show')) {
      if (lowerCommand.includes('alert')) {
        filters.type = 'Alert';
      } else if (lowerCommand.includes('notes')) {
        filters.type = 'Notes';
      } else if (lowerCommand.includes('checklist')) {
        filters.type = 'Checklist';
      } else if (lowerCommand.includes('query')) {
        filters.type = 'Query';
      }
      applyFiltersAndSort();
    } else if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      clearFilters();
    } else if (lowerCommand.includes('sort')) {
      if (lowerCommand.includes('name') || lowerCommand.includes('purpose')) {
        sortBy = 'purpose';
      } else if (lowerCommand.includes('type')) {
        sortBy = 'type';
      } else if (lowerCommand.includes('date') || lowerCommand.includes('created')) {
        sortBy = 'created_at';
      }
      applyFiltersAndSort();
    }
  }

  function clearFilters() {
    filters = {
      type: '',
      category: '',
      frequency: '',
      sound_type: '',
      applicable_roles: []
    };
    searchTerm = '';
    currentPage = 1;
    applyFiltersAndSort();
  }

  function toggleRoleFilter(role) {
    if (filters.applicable_roles.includes(role)) {
      filters.applicable_roles = filters.applicable_roles.filter(r => r !== role);
    } else {
      filters.applicable_roles = [...filters.applicable_roles, role];
    }
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
    return filteredPrompts.slice(start, end);
  }

  function exportData(format) {
    const data = filteredPrompts.map(prompt => ({
      ID: prompt.id,
      Type: prompt.type,
      Category: prompt.category,
      Purpose: prompt.purpose,
      'Trigger Time': prompt.trigger_time || 'Not set',
      Frequency: prompt.frequency,
      'Sound Type': prompt.sound_type,
      'Volume Level': prompt.volume_level,
      Conditions: prompt.conditions || '',
      'Applicable Roles': prompt.applicable_roles.join(', '),
      'Created At': new Date(prompt.created_at).toLocaleString()
    }));

    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');

      downloadFile(csv, 'ai-prompts.csv', 'text/csv');
    } else if (format === 'json') {
      downloadFile(JSON.stringify(data, null, 2), 'ai-prompts.json', 'application/json');
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
  <title>AI Prompts Review - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">AI Prompts Review</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">Manage and analyze all AI prompts</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput
        onResult={handleVoiceCommand}
        placeholder="Say 'filter alerts' or 'sort by date'"
      />
      <button
        class="btn btn-primary"
        on:click={() => goto('/ai-prompts/create')}
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Create Prompt
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
            placeholder="Search by purpose or conditions..."
          />
        </div>

        <!-- Type Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Type</span>
          </label>
          <select
            bind:value={filters.type}
            on:change={applyFiltersAndSort}
            class="select select-bordered w-full"
          >
            <option value="">All Types</option>
            {#each typeOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <!-- Category Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Category</span>
          </label>
          <select
            bind:value={filters.category}
            on:change={applyFiltersAndSort}
            class="select select-bordered w-full"
          >
            <option value="">All Categories</option>
            {#each categoryOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <!-- Frequency Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Frequency</span>
          </label>
          <select
            bind:value={filters.frequency}
            on:change={applyFiltersAndSort}
            class="select select-bordered w-full"
          >
            <option value="">All Frequencies</option>
            {#each frequencyOptions as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Role Filters -->
      <div class="mt-4">
        <label class="label">
          <span class="label-text font-medium">Applicable Roles</span>
        </label>
        <div class="flex flex-wrap gap-2">
          {#each roleOptions as role}
            <label class="cursor-pointer flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.applicable_roles.includes(role)}
                on:change={() => toggleRoleFilter(role)}
                class="checkbox checkbox-primary checkbox-sm"
              />
              <span class="text-sm">{role}</span>
            </label>
          {/each}
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
          Showing {filteredPrompts.length} of {aiPromptsData.length} prompts
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
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => changeSort('type')}
                >
                  Type
                  {#if sortBy === 'type'}
                    <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"></path>
                    </svg>
                  {/if}
                </button>
              </th>
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => changeSort('purpose')}
                >
                  Purpose
                  {#if sortBy === 'purpose'}
                    <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}"></path>
                    </svg>
                  {/if}
                </button>
              </th>
              <th>Category</th>
              <th>Frequency</th>
              <th>Trigger Time</th>
              <th>Sound</th>
              <th>Roles</th>
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => changeSort('created_at')}
                >
                  Created
                  {#if sortBy === 'created_at'}
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
            {#each getPaginatedData() as prompt}
              <tr class="hover">
                <td>
                  <span class="badge badge-outline badge-primary">{prompt.type}</span>
                </td>
                <td class="font-medium max-w-xs truncate" title={prompt.purpose}>
                  {prompt.purpose}
                </td>
                <td>{prompt.category}</td>
                <td>
                  <span class="badge badge-outline badge-secondary">{prompt.frequency}</span>
                </td>
                <td>{prompt.trigger_time || 'Not set'}</td>
                <td>
                  <div class="text-sm">
                    <div>{prompt.sound_type}</div>
                    <div class="text-gray-500">{prompt.volume_level}</div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    {#each prompt.applicable_roles.slice(0, 2) as role}
                      <span class="badge badge-xs badge-outline">{role}</span>
                    {/each}
                    {#if prompt.applicable_roles.length > 2}
                      <span class="badge badge-xs badge-outline">+{prompt.applicable_roles.length - 2}</span>
                    {/if}
                  </div>
                </td>
                <td class="text-sm">
                  {new Date(prompt.created_at).toLocaleDateString()}
                </td>
                <td>
                  <div class="flex gap-2">
                    <button
                      class="btn btn-ghost btn-xs"
                      on:click={() => goto(`/ai-prompts/update/${prompt.id}`)}
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      class="btn btn-ghost btn-xs text-red-500"
                      on:click={() => {
                        if (confirm('Delete this AI prompt?')) {
                          aiPrompts.deleteAIPrompt(prompt.id);
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

      {#if filteredPrompts.length === 0}
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No AI Prompts Found</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {searchTerm || Object.values(filters).some(v => v) ? 'Try adjusting your filters or search terms.' : 'Create your first AI prompt to get started.'}
          </p>
          <button
            class="btn btn-primary"
            on:click={() => goto('/ai-prompts/create')}
          >
            Create First Prompt
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
    <DiscussionForum tableName="ai_prompts" recordId="review_page" />
  </div>
</div>