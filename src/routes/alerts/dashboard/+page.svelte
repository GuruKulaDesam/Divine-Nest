<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { alerts, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let alertTypeChart;
  let priorityChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalAlerts = $alerts.length;
  $: activeAlerts = $alerts.filter(a => a.status === 'Active').length;
  $: reminderAlerts = $alerts.filter(a => a.type === 'Reminder').length;
  $: alarmAlerts = $alerts.filter(a => a.type === 'Alarm').length;
  $: notificationAlerts = $alerts.filter(a => a.type === 'Notification').length;

  // Filter alerts by user's applicable roles
  $: userAlerts = $alerts.filter(alert =>
    alert.applicable_roles.includes($userProfile.role) ||
    alert.applicable_roles.includes('All')
  );

  // Overdue alerts (past trigger time)
  $: overdueAlerts = userAlerts.filter(alert => {
    if (alert.status !== 'Active') return false;
    const triggerDateTime = new Date(`${alert.trigger_date}T${alert.trigger_time}`);
    const now = new Date();
    return triggerDateTime < now;
  });

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Alert Type Distribution Chart
    const typeCtx = document.getElementById('alertTypeChart');
    if (typeCtx) {
      alertTypeChart = new Chart(typeCtx, {
        type: 'doughnut',
        data: {
          labels: ['Reminder', 'Alarm', 'Notification'],
          datasets: [{
            data: [reminderAlerts, alarmAlerts, notificationAlerts],
            backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
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

    // Priority Distribution Chart
    const priorityCtx = document.getElementById('priorityChart');
    if (priorityCtx) {
      const highPriority = userAlerts.filter(a => a.priority === 'High' || a.priority === 'Critical').length;
      const mediumPriority = userAlerts.filter(a => a.priority === 'Medium').length;
      const lowPriority = userAlerts.filter(a => a.priority === 'Low').length;

      priorityChart = new Chart(priorityCtx, {
        type: 'bar',
        data: {
          labels: ['High/Critical', 'Medium', 'Low'],
          datasets: [{
            label: 'Alerts by Priority',
            data: [highPriority, mediumPriority, lowPriority],
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
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
    // Process voice command for alerts
    if (result.toLowerCase().includes('create alert')) {
      goto('/alerts/create');
    } else if (result.toLowerCase().includes('update alert')) {
      goto('/alerts/update');
    } else if (result.toLowerCase().includes('review alerts')) {
      goto('/alerts/review');
    }
  }

  function navigateToCreate() {
    goto('/alerts/create');
  }

  function navigateToReview() {
    goto('/alerts/review');
  }

  function navigateToUpdate() {
    goto('/alerts/update');
  }
</script>

<svelte:head>
  <title>Alerts Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Alerts Dashboard</h1>
        <p class="text-base-content/70">Monitor and manage your household alerts and reminders</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create alert' or 'update alert'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Alert
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

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Alerts</p>
              <p class="text-2xl font-bold text-primary">{totalAlerts}</p>
            </div>
            <Icon icon="heroicons:bell-alert" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/alerts/update?filter=active')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Active Alerts</p>
              <p class="text-2xl font-bold text-success">{activeAlerts}</p>
            </div>
            <Icon icon="heroicons:play-circle" class="w-8 h-8 text-success" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/alerts/update?filter=overdue')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Overdue</p>
              <p class="text-2xl font-bold text-error">{overdueAlerts.length}</p>
            </div>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-error" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Reminders</p>
              <p class="text-2xl font-bold text-info">{reminderAlerts}</p>
            </div>
            <Icon icon="heroicons:clock" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alert Type Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Alert Types</h3>
          <canvas id="alertTypeChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Priority Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Alerts by Priority</h3>
          <canvas id="priorityChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Alerts -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h3 class="card-title">Recent Alerts</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>
            View All
            <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-3">
          {#each userAlerts.slice(0, 5) as alert}
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="avatar placeholder">
                  <div class="bg-primary text-primary-content rounded-full w-8">
                    <span class="text-xs">{alert.type.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p class="font-medium">{alert.title}</p>
                  <p class="text-sm text-base-content/70">{alert.trigger_date} at {alert.trigger_time}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge badge-outline {alert.priority === 'High' || alert.priority === 'Critical' ? 'badge-warning' : 'badge-neutral'}">{alert.priority}</span>
                <span class="badge {alert.status === 'Active' ? 'badge-success' : 'badge-neutral'}">{alert.status}</span>
                {#if alert.sound_enabled}
                  <Icon icon="heroicons:speaker-wave" class="w-4 h-4 text-base-content/60" />
                {/if}
              </div>
            </div>
          {/each}
          {#if userAlerts.length === 0}
            <div class="text-center py-8 text-base-content/70">
              <Icon icon="heroicons:bell-alert" class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No alerts found. Create your first alert!</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="alerts" />

  </div>
</div>