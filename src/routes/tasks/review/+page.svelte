<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { tasks, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let searchTerm = '';
  let statusFilter = 'all';
  let priorityFilter = 'all';
  let dateFrom = '';
  let dateTo = '';
  let sortBy = 'created_at';
  let sortOrder = 'desc';
  let voiceResult = '';

  // Filter and sort tasks
  $: filteredTasks = $tasks
    .filter(task => {
      // Role-based access
      const canSee = task.applicable_roles.includes($userProfile.role) ||
                     task.applicable_roles.includes('All');
      if (!canSee) return false;

      // Search filter
      if (searchTerm && !task.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !task.assigned_to.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && task.status !== statusFilter) return false;

      // Priority filter
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

      // Date range filter
      if (dateFrom && new Date(task.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(task.created_at) > new Date(dateTo)) return false;

      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'due_date' && (!aVal || !bVal)) {
        // Handle null dates
        if (!aVal && !bVal) return 0;
        if (!aVal) return sortOrder === 'asc' ? 1 : -1;
        if (!bVal) return sortOrder === 'asc' ? -1 : 1;
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });

  // Statistics
  $: stats = {
    total: filteredTasks.length,
    completed: filteredTasks.filter(t => t.status === 'Completed').length,
    pending: filteredTasks.filter(t => t.status === 'Pending').length,
    inProgress: filteredTasks.filter(t => t.status === 'In Progress').length,
    overdue: filteredTasks.filter(t => {
      if (!t.due_date || t.status === 'Completed') return false;
      return new Date(t.due_date) < new Date();
    }).length
  };

  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('search') || lowerResult.includes('find')) {
      const searchMatch = result.match(/(?:search|find)\s+(.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    } else if (lowerResult.includes('filter') && lowerResult.includes('completed')) {
      statusFilter = 'Completed';
    } else if (lowerResult.includes('filter') && lowerResult.includes('pending')) {
      statusFilter = 'Pending';
    } else if (lowerResult.includes('export')) {
      exportToCSV();
    }
  }

  function exportToCSV() {
    const headers = [
      'ID', 'Description', 'Type', 'Category', 'Assigned To', 'Status',
      'Priority', 'Due Date', 'Created Date', 'Completed Date'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredTasks.map(task => [
        task.id,
        `"${task.description.replace(/"/g, '""')}"`,
        task.type,
        task.category,
        task.assigned_to,
        task.status,
        task.priority,
        task.due_date || '',
        task.created_at,
        task.completed_at || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tasks_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(filteredTasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `tasks_export_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function clearFilters() {
    searchTerm = '';
    statusFilter = 'all';
    priorityFilter = 'all';
    dateFrom = '';
    dateTo = '';
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Completed': return 'badge-success';
      case 'In Progress': return 'badge-info';
      case 'Pending': return 'badge-warning';
      default: return 'badge-neutral';
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'Critical': return 'badge-error';
      case 'High': return 'badge-warning';
      case 'Medium': return 'badge-info';
      case 'Low': return 'badge-success';
      default: return 'badge-neutral';
    }
  }
</script>

<svelte:head>
  <title>Task History & Review - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Task History & Review</h1>
        <p class="text-base-content/70">Review completed tasks and export data</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'export data' or 'search completed tasks'" />
        <button class="btn btn-primary" on:click={() => goto('/tasks/create')}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Task
        </button>
      </div>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <div class="text-2xl font-bold text-primary">{stats.total}</div>
          <div class="text-sm text-base-content/70">Total Tasks</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <div class="text-2xl font-bold text-success">{stats.completed}</div>
          <div class="text-sm text-base-content/70">Completed</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <div class="text-2xl font-bold text-info">{stats.inProgress}</div>
          <div class="text-sm text-base-content/70">In Progress</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <div class="text-2xl font-bold text-warning">{stats.pending}</div>
          <div class="text-sm text-base-content/70">Pending</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center">
          <div class="text-2xl font-bold text-error">{stats.overdue}</div>
          <div class="text-sm text-base-content/70">Overdue</div>
        </div>
      </div>
    </div>

    <!-- Filters and Export -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h3 class="card-title">Filters & Export</h3>
          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm" on:click={clearFilters}>
              <Icon icon="heroicons:x-mark" class="w-4 h-4" />
              Clear Filters
            </button>
            <button class="btn btn-outline btn-sm" on:click={exportToCSV}>
              <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
              Export CSV
            </button>
            <button class="btn btn-outline btn-sm" on:click={exportToJSON}>
              <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
              Export JSON
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <!-- Search -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              class="input input-bordered input-sm"
              bind:value={searchTerm}
              placeholder="Task description or assignee..."
            />
          </div>

          <!-- Status Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select class="select select-bordered select-sm" bind:value={statusFilter}>
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered select-sm" bind:value={priorityFilter}>
              <option value="all">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <!-- Date From -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">From Date</span>
            </label>
            <input
              type="date"
              class="input input-bordered input-sm"
              bind:value={dateFrom}
            />
          </div>

          <!-- Date To -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">To Date</span>
            </label>
            <input
              type="date"
              class="input input-bordered input-sm"
              bind:value={dateTo}
            />
          </div>

          <!-- Sort -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select class="select select-bordered select-sm" bind:value={sortBy}>
              <option value="created_at">Created Date</option>
              <option value="due_date">Due Date</option>
              <option value="description">Description</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks Table -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h3 class="card-title">Tasks ({filteredTasks.length})</h3>
          <div class="text-sm text-base-content/70">
            Showing {filteredTasks.length} of {$tasks.length} tasks
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredTasks as task}
                <tr class="hover">
                  <td class="max-w-xs">
                    <div class="truncate" title={task.description}>
                      {task.description}
                    </div>
                  </td>
                  <td>{task.type}</td>
                  <td>{task.category}</td>
                  <td>{task.assigned_to}</td>
                  <td>
                    <div class="badge {getStatusColor(task.status)} badge-sm">
                      {task.status}
                    </div>
                  </td>
                  <td>
                    <div class="badge {getPriorityColor(task.priority)} badge-sm">
                      {task.priority}
                    </div>
                  </td>
                  <td>
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                  </td>
                  <td>
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      class="btn btn-ghost btn-xs"
                      on:click={() => goto(`/tasks/update?id=${task.id}`)}
                    >
                      <Icon icon="heroicons:eye" class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        {#if filteredTasks.length === 0}
          <div class="text-center py-8 text-base-content/50">
            No tasks found matching your criteria
          </div>
        {/if}
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="tasks" recordId="review" />

  </div>
</div>