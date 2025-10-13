<script lang="ts">
  import { onMount } from 'svelte';
  import { finances, financeActions } from '$lib/stores/finances';
  import { userProfile } from '$lib/stores/userProfile';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';

  let currentUser = '';
  let userRole = 'Parent';

  // Filters and search
  let searchTerm = '';
  let selectedType = '';
  let selectedCategory = '';
  let selectedActor = '';
  let dateFrom = '';
  let dateTo = '';
  let selectedRecurring = '';

  // Sorting
  let sortBy = 'date';
  let sortOrder = 'desc';

  // Pagination
  let currentPage = 1;
  let itemsPerPage = 10;

  // Export
  let isExporting = false;

  // Reactive statements
  $: userRole = $userProfile?.role || 'Parent';
  $: filteredFinances = $finances.filter(finance => {
    // Role-based filtering
    if (!finance.applicable_roles.includes(userRole)) return false;

    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!finance.category.toLowerCase().includes(term) &&
          !finance.sub_category?.toLowerCase().includes(term) &&
          !finance.actor.toLowerCase().includes(term) &&
          !finance.notes?.toLowerCase().includes(term)) {
        return false;
      }
    }

    // Type filter
    if (selectedType && finance.type !== selectedType) return false;

    // Category filter
    if (selectedCategory && finance.category !== selectedCategory) return false;

    // Actor filter
    if (selectedActor && finance.actor !== selectedActor) return false;

    // Recurring filter
    if (selectedRecurring && finance.recurring !== selectedRecurring) return false;

    // Date range filter
    if (dateFrom && finance.date < dateFrom) return false;
    if (dateTo && finance.date > dateTo) return false;

    return true;
  });

  $: sortedFinances = [...filteredFinances].sort((a, b) => {
    let aVal: any, bVal: any;

    switch (sortBy) {
      case 'date':
        aVal = new Date(a.date);
        bVal = new Date(b.date);
        break;
      case 'amount':
        aVal = a.amount;
        bVal = b.amount;
        break;
      case 'category':
        aVal = a.category;
        bVal = b.category;
        break;
      case 'actor':
        aVal = a.actor;
        bVal = b.actor;
        break;
      case 'type':
        aVal = a.type;
        bVal = b.type;
        break;
      default:
        aVal = a.date;
        bVal = b.date;
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  $: paginatedFinances = sortedFinances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  $: totalPages = Math.ceil(sortedFinances.length / itemsPerPage);

  // Analytics
  $: typeBreakdown = filteredFinances.reduce((acc, finance) => {
    acc[finance.type] = (acc[finance.type] || 0) + finance.amount;
    return acc;
  }, {} as Record<string, number>);

  $: categoryBreakdown = filteredFinances.reduce((acc, finance) => {
    acc[finance.category] = (acc[finance.category] || 0) + finance.amount;
    return acc;
  }, {} as Record<string, number>);

  // Unique values for filters
  $: uniqueTypes = [...new Set($finances.map(f => f.type))];
  $: uniqueCategories = [...new Set($finances.map(f => f.category))];
  $: uniqueActors = [...new Set($finances.map(f => f.actor))];
  $: uniqueRecurring = [...new Set($finances.map(f => f.recurring))];

  // Chart data (for future implementation)
  $: typeChartData = {
    labels: Object.keys(typeBreakdown),
    datasets: [{
      data: Object.values(typeBreakdown),
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',   // Expenses - red
        'rgba(34, 197, 94, 0.8)',   // Income - green
        'rgba(59, 130, 246, 0.8)',  // Savings - blue
        'rgba(147, 51, 234, 0.8)'   // Budget - purple
      ],
      borderWidth: 2
    }]
  };

  $: categoryChartData = {
    labels: Object.keys(categoryBreakdown).slice(0, 10), // Top 10 categories
    datasets: [{
      label: 'Amount by Category',
      data: Object.values(categoryBreakdown).slice(0, 10),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderWidth: 1
    }]
  };

  // Voice command handler
  function handleVoiceCommand(command: string) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('filter') && lowerCommand.includes('income')) {
      selectedType = 'Income';
    } else if (lowerCommand.includes('filter') && lowerCommand.includes('expense')) {
      selectedType = 'Expenses';
    } else if (lowerCommand.includes('filter') && lowerCommand.includes('budget')) {
      selectedType = 'Budget';
    } else if (lowerCommand.includes('clear') && lowerCommand.includes('filter')) {
      clearFilters();
    } else if (lowerCommand.includes('export')) {
      handleExport('csv');
    } else if (lowerCommand.includes('search')) {
      // Focus search input
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      searchInput?.focus();
    }
  }

  function clearFilters() {
    searchTerm = '';
    selectedType = '';
    selectedCategory = '';
    selectedActor = '';
    dateFrom = '';
    dateTo = '';
    selectedRecurring = '';
    currentPage = 1;
  }

  function handleSort(field: string) {
    if (sortBy === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = field;
      sortOrder = 'desc';
    }
  }

  async function handleExport(format: 'csv' | 'json') {
    isExporting = true;

    try {
      let data: string;
      let filename: string;
      let mimeType: string;

      if (format === 'csv') {
        // CSV export
        const headers = ['Type', 'Category', 'Sub Category', 'Amount', 'Recurring', 'Date', 'Actor', 'Source', 'Notes'];
        const rows = filteredFinances.map(finance => [
          finance.type,
          finance.category,
          finance.sub_category || '',
          finance.amount,
          finance.recurring,
          finance.date,
          finance.actor,
          finance.source,
          finance.notes || ''
        ]);

        data = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        filename = `finance-records-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      } else {
        // JSON export
        data = JSON.stringify(filteredFinances, null, 2);
        filename = `finance-records-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      }

      // Create and download file
      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      isExporting = false;
    }
  }

  onMount(() => {
    // Get current user
    userProfile.subscribe(profile => {
      currentUser = profile?.name || 'Family Member';
    });
  });
</script>

<svelte:head>
  <title>Finance Records - Divine Nest</title>
  <meta name="description" content="Review and analyze all financial transactions and records" />
</svelte:head>

<div class="min-h-screen bg-base-200">
  <!-- Breadcrumb -->
  <Breadcrumb currentPage="Finance Records" />

  <!-- Header -->
  <div class="bg-base-100 shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-base-content flex items-center gap-2">
            <Icon icon="heroicons:document-text" class="w-8 h-8 text-primary" />
            Finance Records
          </h1>
          <p class="text-base-content/70 mt-1">
            Review and analyze all financial transactions ({filteredFinances.length} records)
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Voice Input -->
          <VoiceInput
            placeholder="Say 'filter income' or 'export csv'..."
            onResult={handleVoiceCommand}
          />

          <!-- Export Dropdown -->
          <div class="dropdown dropdown-end">
            <button class="btn btn-outline" disabled={isExporting}>
              {#if isExporting}
                <span class="loading loading-spinner loading-sm"></span>
                Exporting...
              {:else}
                <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5 mr-2" />
                Export
              {/if}
            </button>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
              <li><button on:click={() => handleExport('csv')}>Export as CSV</button></li>
              <li><button on:click={() => handleExport('json')}>Export as JSON</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8">
    <!-- Analytics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Total Income</p>
              <p class="text-2xl font-bold">₹{typeBreakdown['Income']?.toLocaleString() || 0}</p>
            </div>
            <Icon icon="heroicons:arrow-trending-up" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-100 text-sm font-medium">Total Expenses</p>
              <p class="text-2xl font-bold">₹{typeBreakdown['Expenses']?.toLocaleString() || 0}</p>
            </div>
            <Icon icon="heroicons:arrow-trending-down" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total Savings</p>
              <p class="text-2xl font-bold">₹{typeBreakdown['Savings']?.toLocaleString() || 0}</p>
            </div>
            <Icon icon="heroicons:piggy-bank" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Net Income</p>
              <p class="text-2xl font-bold">₹{((typeBreakdown['Income'] || 0) - (typeBreakdown['Expenses'] || 0) - (typeBreakdown['Savings'] || 0)).toLocaleString()}</p>
            </div>
            <Icon icon="heroicons:calculator" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Type Breakdown -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h3 class="card-title">
            <Icon icon="heroicons:chart-pie" class="w-5 h-5" />
            Financial Breakdown by Type
          </h3>
          <div class="h-64 bg-base-200 rounded-lg flex items-center justify-center">
            <div class="text-center text-base-content/50">
              <Icon icon="heroicons:chart-pie" class="w-12 h-12 mx-auto mb-2" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h3 class="card-title">
            <Icon icon="heroicons:chart-bar" class="w-5 h-5" />
            Top Categories
          </h3>
          <div class="h-64 bg-base-200 rounded-lg flex items-center justify-center">
            <div class="text-center text-base-content/50">
              <Icon icon="heroicons:chart-bar" class="w-12 h-12 mx-auto mb-2" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card bg-base-100 shadow-lg mb-6">
      <div class="card-body">
        <div class="flex flex-col lg:flex-row gap-4 items-end">
          <!-- Search -->
          <div class="form-control flex-1">
            <label class="label" for="search-input">
              <span class="label-text">Search</span>
            </label>
            <input
              id="search-input"
              type="text"
              bind:value={searchTerm}
              placeholder="Search categories, actors, notes..."
              class="input input-bordered"
            />
          </div>

          <!-- Type Filter -->
          <div class="form-control">
            <label class="label" for="type-filter">
              <span class="label-text">Type</span>
            </label>
            <select id="type-filter" bind:value={selectedType} class="select select-bordered">
              <option value="">All Types</option>
              {#each uniqueTypes as type}
                <option value={type}>{type}</option>
              {/each}
            </select>
          </div>

          <!-- Category Filter -->
          <div class="form-control">
            <label class="label" for="category-filter">
              <span class="label-text">Category</span>
            </label>
            <select id="category-filter" bind:value={selectedCategory} class="select select-bordered">
              <option value="">All Categories</option>
              {#each uniqueCategories as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>

          <!-- Date From -->
          <div class="form-control">
            <label class="label" for="date-from">
              <span class="label-text">From Date</span>
            </label>
            <input id="date-from" type="date" bind:value={dateFrom} class="input input-bordered" />
          </div>

          <!-- Date To -->
          <div class="form-control">
            <label class="label" for="date-to">
              <span class="label-text">To Date</span>
            </label>
            <input id="date-to" type="date" bind:value={dateTo} class="input input-bordered" />
          </div>

          <!-- Clear Filters -->
          <button class="btn btn-ghost" on:click={clearFilters}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Records Table -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>
                  <button class="btn btn-ghost btn-xs" on:click={() => handleSort('type')}>
                    Type
                    {#if sortBy === 'type'}
                      <Icon icon={sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} class="w-4 h-4 ml-1" />
                    {/if}
                  </button>
                </th>
                <th>
                  <button class="btn btn-ghost btn-xs" on:click={() => handleSort('category')}>
                    Category
                    {#if sortBy === 'category'}
                      <Icon icon={sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} class="w-4 h-4 ml-1" />
                    {/if}
                  </button>
                </th>
                <th>
                  <button class="btn btn-ghost btn-xs" on:click={() => handleSort('amount')}>
                    Amount
                    {#if sortBy === 'amount'}
                      <Icon icon={sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} class="w-4 h-4 ml-1" />
                    {/if}
                  </button>
                </th>
                <th>
                  <button class="btn btn-ghost btn-xs" on:click={() => handleSort('date')}>
                    Date
                    {#if sortBy === 'date'}
                      <Icon icon={sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} class="w-4 h-4 ml-1" />
                    {/if}
                  </button>
                </th>
                <th>
                  <button class="btn btn-ghost btn-xs" on:click={() => handleSort('actor')}>
                    Actor
                    {#if sortBy === 'actor'}
                      <Icon icon={sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} class="w-4 h-4 ml-1" />
                    {/if}
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each paginatedFinances as finance}
                <tr>
                  <td>
                    <div class="badge badge-outline {finance.type === 'Income' ? 'badge-success' : finance.type === 'Expenses' ? 'badge-error' : finance.type === 'Budget' ? 'badge-info' : 'badge-warning'}">
                      {finance.type}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div class="font-semibold">{finance.category}</div>
                      {#if finance.sub_category}
                        <div class="text-sm text-base-content/70">{finance.sub_category}</div>
                      {/if}
                    </div>
                  </td>
                  <td class="font-semibold text-primary">₹{finance.amount.toLocaleString()}</td>
                  <td>{new Date(finance.date).toLocaleDateString()}</td>
                  <td>{finance.actor}</td>
                  <td>
                    <a href="/finances/update?id={finance.id}" class="btn btn-ghost btn-xs">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        {#if totalPages > 1}
          <div class="flex justify-center mt-6">
            <div class="btn-group">
              <button
                class="btn"
                disabled={currentPage === 1}
                on:click={() => currentPage--}
              >
                «
              </button>

              {#each Array(totalPages) as _, i}
                <button
                  class="btn {currentPage === i + 1 ? 'btn-active' : ''}"
                  on:click={() => currentPage = i + 1}
                >
                  {i + 1}
                </button>
              {/each}

              <button
                class="btn"
                disabled={currentPage === totalPages}
                on:click={() => currentPage++}
              >
                »
              </button>
            </div>
          </div>
        {/if}

        <!-- No Results -->
        {#if filteredFinances.length === 0}
          <div class="text-center py-8">
            <Icon icon="heroicons:document-text" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-base-content/70">No records found</h3>
            <p class="text-base-content/50">Try adjusting your filters or add some finance records.</p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Discussion Forum -->
    <div class="mt-8">
      <DiscussionForum
        tableName="finances"
        recordId="review"
      />
    </div>
  </div>
</div>