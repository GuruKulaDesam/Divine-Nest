<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { issues } from '$lib/stores/issues';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let issueStatusChart;
  let categoryChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalIssues = $issues.length;
  $: reportedIssues = $issues.filter(i => i.status === 'Reported').length;
  $: assignedIssues = $issues.filter(i => i.status === 'Assigned').length;
  $: inProgressIssues = $issues.filter(i => i.status === 'In Progress').length;
  $: resolvedIssues = $issues.filter(i => i.status === 'Resolved').length;
  $: resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  // Filter issues by user's applicable roles
  $: userIssues = $issues.filter(issue =>
    issue.applicable_roles.includes($userProfile.role) ||
    issue.applicable_roles.includes('All')
  );

  // Active alerts (urgent issues that need attention)
  $: activeAlerts = userIssues.filter(issue => {
    if (issue.status === 'Resolved') return false;
    return issue.priority === 'Critical' || issue.priority === 'High';
  });

  // Critical issues (emergency category)
  $: criticalIssues = userIssues.filter(issue =>
    issue.category === 'Emergency' && issue.status !== 'Resolved'
  );

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Issue Status Distribution Chart
    const statusCtx = document.getElementById('issueStatusChart');
    if (statusCtx) {
      issueStatusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Reported', 'Assigned', 'In Progress', 'Resolved'],
          datasets: [{
            data: [reportedIssues, assignedIssues, inProgressIssues, resolvedIssues],
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
      const emergencyCount = userIssues.filter(i => i.category === 'Emergency').length;
      const urgentCount = userIssues.filter(i => i.category === 'Urgents').length;
      const repairsCount = userIssues.filter(i => i.category === 'Repairs').length;
      const maintenanceCount = userIssues.filter(i => i.category === 'Maintenance').length;
      const upgradesCount = userIssues.filter(i => i.category === 'Upgrades').length;
      const otherCount = userIssues.filter(i => i.category === 'Other').length;

      categoryChart = new Chart(categoryCtx, {
        type: 'bar',
        data: {
          labels: ['Emergency', 'Urgent', 'Repairs', 'Maintenance', 'Upgrades', 'Other'],
          datasets: [{
            label: 'Issues by Category',
            data: [emergencyCount, urgentCount, repairsCount, maintenanceCount, upgradesCount, otherCount],
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
    // Process voice command for issues
    if (result.toLowerCase().includes('report issue') || result.toLowerCase().includes('create issue')) {
      goto('/issues/create');
    } else if (result.toLowerCase().includes('update issue')) {
      goto('/issues/update');
    }
  }

  function navigateToCreate() {
    goto('/issues/create');
  }

  function navigateToUpdate(issueId) {
    goto(`/issues/update?id=${issueId}`);
  }

  function navigateToReview() {
    goto('/issues/review');
  }
</script>

<svelte:head>
  <title>Issues Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Issues Dashboard</h1>
        <p class="text-base-content/70">Monitor and manage household issues and service requests</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'report issue' or 'update issue'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Report Issue
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

    <!-- Critical Issues Alert -->
    {#if criticalIssues.length > 0}
      <div class="card bg-error/10 border border-error/20">
        <div class="card-body">
          <h3 class="card-title text-error">
            <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
            Critical Issues ({criticalIssues.length})
          </h3>
          <div class="space-y-2">
            {#each criticalIssues as issue}
              <div class="flex items-center justify-between p-3 bg-error/5 rounded-lg cursor-pointer hover:bg-error/10 transition-colors" role="button" tabindex="0" on:click={() => navigateToUpdate(issue.id)} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(issue.id); } }}>
                <div>
                  <p class="font-medium">{issue.description}</p>
                  <p class="text-sm text-base-content/70">Location: {issue.location_address || 'Not specified'}</p>
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
              <p class="text-base-content/70">Total Issues</p>
              <p class="text-2xl font-bold text-primary">{totalIssues}</p>
            </div>
            <Icon icon="heroicons:exclamation-circle" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={() => goto('/issues/update?filter=reported')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto('/issues/update?filter=reported'); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Reported</p>
              <p class="text-2xl font-bold text-warning">{reportedIssues}</p>
            </div>
            <Icon icon="heroicons:document-text" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" role="button" tabindex="0" on:click={() => goto('/issues/update?filter=in-progress')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto('/issues/update?filter=in-progress'); } }}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">In Progress</p>
              <p class="text-2xl font-bold text-info">{inProgressIssues}</p>
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
            High Priority Issues ({activeAlerts.length})
          </h3>
          <div class="space-y-2">
            {#each activeAlerts as alert}
              <div class="flex items-center justify-between p-3 bg-warning/5 rounded-lg cursor-pointer hover:bg-warning/10 transition-colors" role="button" tabindex="0" on:click={() => navigateToUpdate(alert.id)} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(alert.id); } }}>
                <div>
                  <p class="font-medium">{alert.description}</p>
                  <p class="text-sm text-base-content/70">Contact: {alert.contact}</p>
                </div>
                <div class="badge badge-warning">{alert.priority}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Issue Status Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Issue Status Distribution</h3>
          <canvas id="issueStatusChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Category Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Issues by Category</h3>
          <canvas id="categoryChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Issues -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title">Recent Issues</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each userIssues.slice(0, 5) as issue}
                <tr class="cursor-pointer hover" on:click={() => navigateToUpdate(issue.id)}>
                  <td class="font-medium">{issue.description}</td>
                  <td>
                    <div class="badge {issue.category === 'Emergency' ? 'badge-error' : issue.category === 'Urgents' ? 'badge-warning' : 'badge-info'}">
                      {issue.category}
                    </div>
                  </td>
                  <td>
                    <div class="badge {issue.priority === 'Critical' ? 'badge-error' : issue.priority === 'High' ? 'badge-warning' : issue.priority === 'Medium' ? 'badge-info' : 'badge-success'}">
                      {issue.priority}
                    </div>
                  </td>
                  <td>
                    <div class="badge {issue.status === 'Resolved' ? 'badge-success' : issue.status === 'In Progress' ? 'badge-info' : issue.status === 'Assigned' ? 'badge-warning' : 'badge-neutral'}">
                      {issue.status}
                    </div>
                  </td>
                  <td>{issue.contact}</td>
                  <td>
                    <button class="btn btn-ghost btn-xs" on:click|stopPropagation={() => navigateToUpdate(issue.id)}>
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
    <DiscussionForum tableName="issues" recordId="dashboard" />

  </div>
</div>
