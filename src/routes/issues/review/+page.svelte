<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { issues } from '$lib/stores/issues';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let searchTerm = '';
  let statusFilter = 'all';
  let priorityFilter = 'all';
  let categoryFilter = 'all';
  let dateFrom = '';
  let dateTo = '';
  let sortBy = 'created_at';
  let sortOrder = 'desc';
  let voiceResult = '';

  // Filter and sort issues
  $: filteredIssues = $issues
    .filter(issue => {
      // Role-based access
      const canSee = issue.applicable_roles.includes($userProfile.role) ||
                     issue.applicable_roles.includes('All');
      if (!canSee) return false;

      // Search filter
      if (searchTerm && !issue.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !issue.contact.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !issue.assigned_to?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && issue.status !== statusFilter) return false;

      // Priority filter
      if (priorityFilter !== 'all' && issue.priority !== priorityFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && issue.category !== categoryFilter) return false;

      // Date range filter
      if (dateFrom && new Date(issue.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(issue.created_at) > new Date(dateTo)) return false;

      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'preferred_resolution_date' && (!aVal || !bVal)) {
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
    total: filteredIssues.length,
    reported: filteredIssues.filter(i => i.status === 'Reported').length,
    assigned: filteredIssues.filter(i => i.status === 'Assigned').length,
    inProgress: filteredIssues.filter(i => i.status === 'In Progress').length,
    resolved: filteredIssues.filter(i => i.status === 'Resolved').length,
    emergency: filteredIssues.filter(i => i.category === 'Emergency').length,
    overdue: filteredIssues.filter(i => {
      if (!i.preferred_resolution_date || i.status === 'Resolved') return false;
      return new Date(i.preferred_resolution_date) < new Date();
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
    } else if (lowerResult.includes('filter') && lowerResult.includes('resolved')) {
      statusFilter = 'Resolved';
    } else if (lowerResult.includes('filter') && lowerResult.includes('emergency')) {
      categoryFilter = 'Emergency';
    } else if (lowerResult.includes('export')) {
      exportToCSV();
    }
  }

  function exportToCSV() {
    const headers = [
      'ID', 'Description', 'Type', 'Category', 'Contact', 'Assigned To', 'Status',
      'Priority', 'Location', 'Preferred Resolution Date', 'Created Date', 'Resolved Date'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredIssues.map(issue => [
        issue.id,
        `"${issue.description.replace(/"/g, '""')}"`,
        issue.type,
        issue.category,
        issue.contact,
        issue.assigned_to || '',
        issue.status,
        issue.priority,
        issue.location_address || '',
        issue.preferred_resolution_date || '',
        issue.created_at,
        issue.resolved_at || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `issues_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(filteredIssues, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `issues_export_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function clearFilters() {
    searchTerm = '';
    statusFilter = 'all';
    priorityFilter = 'all';
    categoryFilter = 'all';
    dateFrom = '';
    dateTo = '';
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Resolved': return 'badge-success';
      case 'In Progress': return 'badge-info';
      case 'Assigned': return 'badge-warning';
      case 'Reported': return 'badge-neutral';
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

  function getCategoryColor(category) {
    switch (category) {
      case 'Emergency': return 'badge-error';
      case 'Urgents': return 'badge-warning';
      case 'Repairs': return 'badge-info';
      case 'Maintenance': return 'badge-success';
      case 'Upgrades': return 'badge-primary';
      case 'Other': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }
</script>

<svelte:head>
  <title>Review Issues - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Review Issues" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Review Issues</h1>
        <p class="text-base-content/70">Comprehensive view of all household issues and service requests</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'search for plumbing' or 'export data'" />
        <button class="btn btn-outline" on:click={exportToCSV}>
          <Icon icon="heroicons:document-arrow-down" class="w-5 h-5" />
          Export CSV
        </button>
        <button class="btn btn-outline" on:click={exportToJSON}>
          <Icon icon="heroicons:code-bracket" class="w-5 h-5" />
          Export JSON
        </button>
      </div>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info mb-4">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Statistics Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-primary">{stats.total}</div>
          <div class="text-sm text-base-content/70">Total Issues</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-warning">{stats.reported}</div>
          <div class="text-sm text-base-content/70">Reported</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-info">{stats.inProgress}</div>
          <div class="text-sm text-base-content/70">In Progress</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-success">{stats.resolved}</div>
          <div class="text-sm text-base-content/70">Resolved</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-error">{stats.emergency}</div>
          <div class="text-sm text-base-content/70">Emergency</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">{stats.overdue}</div>
          <div class="text-sm text-base-content/70">Overdue</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">{stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%</div>
          <div class="text-sm text-base-content/70">Resolution Rate</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search issues..."
              class="input input-bordered"
              bind:value={searchTerm}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select class="select select-bordered" bind:value={statusFilter}>
              <option value="all">All Status</option>
              <option value="Reported">Reported</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={priorityFilter}>
              <option value="all">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={categoryFilter}>
              <option value="all">All Categories</option>
              <option value="Emergency">Emergency</option>
              <option value="Urgents">Urgents</option>
              <option value="Repairs">Repairs</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Upgrades">Upgrades</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">From Date</span>
            </label>
            <input
              type="date"
              class="input input-bordered"
              bind:value={dateFrom}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">To Date</span>
            </label>
            <input
              type="date"
              class="input input-bordered"
              bind:value={dateTo}
            />
          </div>
        </div>

        <div class="flex justify-between items-center mt-4">
          <div class="flex gap-2">
            <select class="select select-bordered select-sm" bind:value={sortBy}>
              <option value="created_at">Sort by Created Date</option>
              <option value="description">Sort by Description</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
              <option value="preferred_resolution_date">Sort by Due Date</option>
            </select>

            <select class="select select-bordered select-sm" bind:value={sortOrder}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <button class="btn btn-ghost btn-sm" on:click={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Issues Table -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredIssues as issue}
                <tr>
                  <td class="font-medium max-w-xs">
                    <div class="truncate" title={issue.description}>
                      {issue.description}
                    </div>
                    {#if issue.sub_category}
                      <div class="text-sm text-base-content/60">{issue.sub_category}</div>
                    {/if}
                  </td>
                  <td>
                    <span class="badge {getCategoryColor(issue.category)}">{issue.category}</span>
                  </td>
                  <td>
                    <span class="badge {getPriorityColor(issue.priority)}">{issue.priority}</span>
                  </td>
                  <td>
                    <span class="badge {getStatusColor(issue.status)}">{issue.status}</span>
                  </td>
                  <td>{issue.contact}</td>
                  <td class="max-w-xs">
                    <div class="truncate" title={issue.location_address}>
                      {issue.location_address || 'Not specified'}
                    </div>
                  </td>
                  <td>{new Date(issue.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      class="btn btn-ghost btn-xs"
                      on:click={() => goto(`/issues/update?id=${issue.id}`)}
                    >
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        {#if filteredIssues.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:exclamation-circle" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-base-content/70">No issues found</h3>
            <p class="text-base-content/50 mt-2">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' || dateFrom || dateTo ?
                "Try adjusting your filters" :
                "No issues have been reported yet"}
            </p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="issues" recordId="review" />

  </div>
</div>