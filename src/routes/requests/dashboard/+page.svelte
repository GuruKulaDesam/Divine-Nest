<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { requests } from '$lib/stores/requests';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let requestStatusChart;
  let categoryChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalRequests = $requests.length;
  $: reportedRequests = $requests.filter(r => r.status === 'Reported').length;
  $: assignedRequests = $requests.filter(r => r.status === 'Assigned').length;
  $: inProgressRequests = $requests.filter(r => r.status === 'In Progress').length;
  $: resolvedRequests = $requests.filter(r => r.status === 'Resolved').length;
  $: resolutionRate = totalRequests > 0 ? Math.round((resolvedRequests / totalRequests) * 100) : 0;

  // Filter requests by user's applicable roles
  $: userRequests = $requests.filter(request =>
    request.applicable_roles.includes($userProfile.role) ||
    request.applicable_roles.includes('All')
  );

  // Active alerts (urgent requests that need attention)
  $: activeAlerts = userRequests.filter(request => {
    if (request.status === 'Resolved') return false;
    return request.category === 'Emergency' || request.category === 'Urgents';
  });

  // Emergency requests (emergency category)
  $: emergencyRequests = userRequests.filter(request =>
    request.category === 'Emergency' && request.status !== 'Resolved'
  );

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Request Status Distribution Chart
    const statusCtx = document.getElementById('requestStatusChart');
    if (statusCtx) {
      requestStatusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Reported', 'Assigned', 'In Progress', 'Resolved'],
          datasets: [{
            data: [reportedRequests, assignedRequests, inProgressRequests, resolvedRequests],
            backgroundColor: ['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      const emergencyCount = userRequests.filter(r => r.category === 'Emergency').length;
      const urgentCount = userRequests.filter(r => r.category === 'Urgents').length;
      const repairsCount = userRequests.filter(r => r.category === 'Repairs').length;
      const maintenanceCount = userRequests.filter(r => r.category === 'Maintenance').length;
      const upgradesCount = userRequests.filter(r => r.category === 'Upgrades').length;
      const suggestionCount = userRequests.filter(r => r.category === 'Suggestion').length;

      categoryChart = new Chart(categoryCtx, {
        type: 'bar',
        data: {
          labels: ['Emergency', 'Urgent', 'Repairs', 'Maintenance', 'Upgrades', 'Suggestions'],
          datasets: [{
            label: 'Requests by Category',
            data: [emergencyCount, urgentCount, repairsCount, maintenanceCount, upgradesCount, suggestionCount],
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#6b7280'],
            borderWidth: 1
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
    // Process voice command for requests
    if (result.toLowerCase().includes('submit request') || result.toLowerCase().includes('create request')) {
      goto('/requests/create');
    } else if (result.toLowerCase().includes('update request')) {
      goto('/requests/update');
    }
  }

  function navigateToCreate() {
    goto('/requests/create');
  }

  function navigateToUpdate(requestId) {
    goto(`/requests/update?id=${requestId}`);
  }

  function navigateToReview() {
    goto('/requests/review');
  }
</script>

<svelte:head>
  <title>Requests Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Requests Dashboard</h1>
        <p class="text-base-content/70">Monitor and manage family requests and suggestions</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'submit request' or 'update request'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Submit Request
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

    <!-- Emergency Requests Alert -->
    {#if emergencyRequests.length > 0}
      <div class="card bg-error/10 border border-error/20">
        <div class="card-body">
          <h3 class="card-title text-error">
            <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
            Emergency Requests ({emergencyRequests.length})
          </h3>
          <div class="space-y-2">
            {#each emergencyRequests as request}
              <div class="flex items-center justify-between p-3 bg-error/5 rounded-lg cursor-pointer hover:bg-error/10 transition-colors" role="button" tabindex="0" on:click={() => navigateToUpdate(request.id)} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(request.id); } }}>
                <div>
                  <p class="font-medium">{request.description}</p>
                  <p class="text-sm text-base-content/70">Contact: {request.contact}</p>
                </div>
                <div class="badge badge-error">Emergency</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={navigateToReview} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToReview(); } }}>
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

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={() => goto('/requests/update?filter=reported')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto('/requests/update?filter=reported'); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Reported</p>
              <p class="text-2xl font-bold text-warning">{reportedRequests}</p>
            </div>
            <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={() => goto('/requests/update?filter=in-progress')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto('/requests/update?filter=in-progress'); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">In Progress</p>
              <p class="text-2xl font-bold text-info">{inProgressRequests}</p>
            </div>
            <Icon icon="heroicons:arrow-path" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={navigateToReview} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToReview(); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Resolution Rate</p>
              <p class="text-2xl font-bold text-success">{resolutionRate}%</p>
            </div>
            <Icon icon="heroicons:check-circle" class="w-8 h-8 text-success" />
          </div>
        </div>
      </div>
    </div>

    <!-- Active Alerts -->
    {#if activeAlerts.length > 0}
      <div class="card bg-warning/10 border border-warning/20">
        <div class="card-body">
          <h3 class="card-title text-warning">
            <Icon icon="heroicons:bell-alert" class="w-5 h-5" />
            High Priority Requests ({activeAlerts.length})
          </h3>
          <div class="space-y-2">
            {#each activeAlerts as alert}
              <div class="flex items-center justify-between p-3 bg-warning/5 rounded-lg cursor-pointer hover:bg-warning/10 transition-colors" role="button" tabindex="0" on:click={() => navigateToUpdate(alert.id)} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(alert.id); } }}>
                <div>
                  <p class="font-medium">{alert.description}</p>
                  <p class="text-sm text-base-content/70">Contact: {alert.contact}</p>
                </div>
                <div class="badge badge-warning">{alert.category}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Request Status Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Request Status Distribution</h3>
          <canvas id="requestStatusChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Category Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Requests by Category</h3>
          <canvas id="categoryChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Requests -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title">Recent Requests</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Request</th>
                <th>Category</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Affected</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each userRequests.slice(0, 5) as request}
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
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="requests" recordId="dashboard" />

  </div>
</div>