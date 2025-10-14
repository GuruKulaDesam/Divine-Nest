<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { requests } from '$lib/stores/requests';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let searchTerm = '';
  let statusFilter = 'all';
  let categoryFilter = 'all';
  let priorityFilter = 'all';
  let sortBy = 'created_at';
  let sortOrder = 'desc';
  let voiceResult = '';

  let statusChart;
  let timelineChart;

  // Filter and search requests
  $: filteredRequests = $requests.filter(request => {
    const matchesSearch = !searchTerm ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contact.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;

    // Role-based filtering
    const matchesRole = request.applicable_roles.includes($userProfile.role) ||
                       request.applicable_roles.includes('All');

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesRole;
  });

  // Sort requests
  $: sortedRequests = [...filteredRequests].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'created_at':
        aVal = new Date(a.created_at);
        bVal = new Date(b.created_at);
        break;
      case 'description':
        aVal = a.description.toLowerCase();
        bVal = b.description.toLowerCase();
        break;
      case 'status':
        aVal = a.status;
        bVal = b.status;
        break;
      case 'priority':
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        aVal = priorityOrder[a.priority] || 0;
        bVal = priorityOrder[b.priority] || 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Analytics
  $: totalRequests = filteredRequests.length;
  $: resolvedRequests = filteredRequests.filter(r => r.status === 'Resolved').length;
  $: avgResolutionTime = calculateAvgResolutionTime();
  $: requestsByMonth = calculateRequestsByMonth();

  function calculateAvgResolutionTime() {
    const resolved = filteredRequests.filter(r => r.resolved_at);
    if (resolved.length === 0) return 0;

    const totalTime = resolved.reduce((sum, r) => {
      const created = new Date(r.created_at);
      const resolved = new Date(r.resolved_at);
      return sum + (resolved - created);
    }, 0);

    return Math.round(totalTime / resolved.length / (1000 * 60 * 60 * 24)); // days
  }

  function calculateRequestsByMonth() {
    const months = {};
    filteredRequests.forEach(request => {
      const month = new Date(request.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      months[month] = (months[month] || 0) + 1;
    });
    return months;
  }

  onMount(() => {
    initializeCharts();
  });

  function initializeCharts() {
    // Status Distribution Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
      const statusCounts = {
        'Reported': filteredRequests.filter(r => r.status === 'Reported').length,
        'Assigned': filteredRequests.filter(r => r.status === 'Assigned').length,
        'In Progress': filteredRequests.filter(r => r.status === 'In Progress').length,
        'Resolved': filteredRequests.filter(r => r.status === 'Resolved').length
      };

      statusChart = new Chart(statusCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(statusCounts),
          datasets: [{
            data: Object.values(statusCounts),
            backgroundColor: ['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // Timeline Chart
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
      timelineChart = new Chart(timelineCtx, {
        type: 'line',
        data: {
          labels: Object.keys(requestsByMonth),
          datasets: [{
            label: 'Requests Created',
            data: Object.values(requestsByMonth),
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f640',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    // Process voice command for filtering/searching
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('show emergency') || lowerResult.includes('emergencies')) {
      categoryFilter = 'Emergency';
    } else if (lowerResult.includes('show resolved')) {
      statusFilter = 'Resolved';
    } else if (lowerResult.includes('show pending')) {
      statusFilter = 'Reported';
    } else if (lowerResult.includes('search for')) {
      const searchMatch = result.match(/search for (.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    }
  }

  function exportToCSV() {
    const headers = ['Description', 'Category', 'Status', 'Priority', 'Contact', 'Created', 'Resolved', 'Assigned To'];
    const csvContent = [
      headers.join(','),
      ...sortedRequests.map(request => [
        `"${request.description}"`,
        request.category,
        request.status,
        request.priority,
        `"${request.contact}"`,
        new Date(request.created_at).toLocaleDateString(),
        request.resolved_at ? new Date(request.resolved_at).toLocaleDateString() : '',
        request.assigned_to || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(sortedRequests, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `requests-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToDashboard() {
    goto('/requests/dashboard');
  }

  function navigateToCreate() {
    goto('/requests/create');
  }

  function navigateToUpdate(requestId) {
    goto(`/requests/update?id=${requestId}`);
  }
</script>

<svelte:head>
  <title>Review Requests - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Review Requests</h1>
        <p class="text-base-content/70">Comprehensive view of all requests with analytics and export</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'show emergencies' or 'search for plumbing'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          New Request
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

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Requests</p>
              <p class="text-2xl font-bold text-primary">{totalRequests}</p>
            </div>
            <Icon icon="heroicons:document-text" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Resolved</p>
              <p class="text-2xl font-bold text-success">{resolvedRequests}</p>
            </div>
            <Icon icon="heroicons:check-circle" class="w-8 h-8 text-success" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Avg Resolution Time</p>
              <p class="text-2xl font-bold text-info">{avgResolutionTime} days</p>
            </div>
            <Icon icon="heroicons:clock" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Resolution Rate</p>
              <p class="text-2xl font-bold text-warning">{totalRequests > 0 ? Math.round((resolvedRequests / totalRequests) * 100) : 0}%</p>
            </div>
            <Icon icon="heroicons:chart-bar" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Status Distribution</h3>
          <canvas id="statusChart" width="300" height="200"></canvas>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Requests Timeline</h3>
          <canvas id="timelineChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Filters & Search</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              bind:value={searchTerm}
              class="input input-bordered"
              placeholder="Search requests..."
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select bind:value={statusFilter} class="select select-bordered">
              <option value="all">All Status</option>
              <option value="Reported">Reported</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={categoryFilter} class="select select-bordered">
              <option value="all">All Categories</option>
              <option value="Emergency">Emergency</option>
              <option value="Urgents">Urgent</option>
              <option value="Repairs">Repairs</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Upgrades">Upgrades</option>
              <option value="Suggestion">Suggestion</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select bind:value={priorityFilter} class="select select-bordered">
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select bind:value={sortBy} class="select select-bordered">
              <option value="created_at">Date Created</option>
              <option value="description">Description</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <p class="text-sm text-base-content/70">Showing {sortedRequests.length} of {totalRequests} requests</p>
          <div class="flex gap-2">
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
      </div>
    </div>

    <!-- Requests Table -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Contact</th>
                <th>Audience</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each sortedRequests as request}
                <tr class="cursor-pointer hover" on:click={() => navigateToUpdate(request.id)}>
                  <td class="font-medium">{request.description}</td>
                  <td>
                    <div class="badge {request.category === 'Emergency' ? 'badge-error' : request.category === 'Urgents' ? 'badge-warning' : request.category === 'Suggestion' ? 'badge-info' : 'badge-success'}">
                      {request.category}
                    </div>
                  </td>
                  <td>
                    <div class="badge {request.status === 'Resolved' ? 'badge-success' : request.status === 'In Progress' ? 'badge-info' : request.status === 'Assigned' ? 'badge-warning' : 'badge-neutral'}">
                      {request.status}
                    </div>
                  </td>
                  <td>
                    <div class="badge badge-outline {request.priority === 'Critical' ? 'badge-error' : request.priority === 'High' ? 'badge-warning' : request.priority === 'Medium' ? 'badge-info' : 'badge-success'}">
                      {request.priority}
                    </div>
                  </td>
                  <td>{request.contact}</td>
                  <td>{request.affected_audience}</td>
                  <td>{new Date(request.created_at).toLocaleDateString()}</td>
                  <td>
                    <button class="btn btn-ghost btn-xs" on:click|stopPropagation={() => navigateToUpdate(request.id)}>
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        {#if sortedRequests.length === 0}
          <div class="text-center py-8">
            <Icon icon="heroicons:document-text" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <p class="text-base-content/70">No requests found matching your filters</p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-center gap-4">
      <button class="btn btn-outline" on:click={navigateToDashboard}>
        <Icon icon="heroicons:home" class="w-4 h-4" />
        Dashboard
      </button>
      <button class="btn btn-outline" on:click={navigateToCreate}>
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        New Request
      </button>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="requests" recordId="review" />

  </div>
</div>