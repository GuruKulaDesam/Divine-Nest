<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { activities, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let activityTypeChart;
  let categoryChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalActivities = $activities.length;
  $: physicalActivities = $activities.filter(a => a.type === 'Physical').length;
  $: mentalActivities = $activities.filter(a => a.type === 'Mental').length;
  $: socialActivities = $activities.filter(a => a.type === 'Social').length;
  $: learningActivities = $activities.filter(a => a.type === 'Learning').length;

  // Filter activities by user's applicable roles
  $: userActivities = $activities.filter(activity =>
    activity.applicable_roles.includes($userProfile.role) ||
    activity.applicable_roles.includes('All')
  );

  // Active alerts (activities with enabled alerts)
  $: activeAlerts = userActivities.filter(activity => activity.alert_enabled);

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Activity Type Distribution Chart
    const typeCtx = document.getElementById('activityTypeChart');
    if (typeCtx) {
      activityTypeChart = new Chart(typeCtx, {
        type: 'doughnut',
        data: {
          labels: ['Physical', 'Mental', 'Social', 'Learning'],
          datasets: [{
            data: [physicalActivities, mentalActivities, socialActivities, learningActivities],
            backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
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
      const categories = {};
      userActivities.forEach(activity => {
        categories[activity.category] = (categories[activity.category] || 0) + 1;
      });

      categoryChart = new Chart(categoryCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(categories),
          datasets: [{
            label: 'Activities by Category',
            data: Object.values(categories),
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
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
    // Process voice command for activities
    if (result.toLowerCase().includes('create activity')) {
      goto('/activities/create');
    } else if (result.toLowerCase().includes('update activity')) {
      goto('/activities/update');
    } else if (result.toLowerCase().includes('review activities')) {
      goto('/activities/review');
    }
  }

  function navigateToCreate() {
    goto('/activities/create');
  }

  function navigateToReview() {
    goto('/activities/review');
  }

  function navigateToUpdate() {
    goto('/activities/update');
  }
</script>

<svelte:head>
  <title>Activities Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Activities Dashboard</h1>
        <p class="text-base-content/70">Monitor and manage your household activities</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create activity' or 'update activity'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Activity
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
              <p class="text-base-content/70">Total Activities</p>
              <p class="text-2xl font-bold text-primary">{totalActivities}</p>
            </div>
            <Icon icon="heroicons:bolt" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/activities/update?filter=physical')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Physical</p>
              <p class="text-2xl font-bold text-error">{physicalActivities}</p>
            </div>
            <Icon icon="heroicons:heart" class="w-8 h-8 text-error" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/activities/update?filter=learning')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Learning</p>
              <p class="text-2xl font-bold text-warning">{learningActivities}</p>
            </div>
            <Icon icon="heroicons:academic-cap" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Active Alerts</p>
              <p class="text-2xl font-bold text-info">{activeAlerts.length}</p>
            </div>
            <Icon icon="heroicons:bell-alert" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Activity Type Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Activity Types</h3>
          <canvas id="activityTypeChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Category Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Activities by Category</h3>
          <canvas id="categoryChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h3 class="card-title">Recent Activities</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>
            View All
            <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-3">
          {#each userActivities.slice(0, 5) as activity}
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="avatar placeholder">
                  <div class="bg-primary text-primary-content rounded-full w-8">
                    <span class="text-xs">{activity.type.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p class="font-medium">{activity.description}</p>
                  <p class="text-sm text-base-content/70">{activity.category} • {activity.participant}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge badge-outline">{activity.frequency}</span>
                {#if activity.alert_enabled}
                  <Icon icon="heroicons:bell" class="w-4 h-4 text-warning" />
                {/if}
              </div>
            </div>
          {/each}
          {#if userActivities.length === 0}
            <div class="text-center py-8 text-base-content/70">
              <Icon icon="heroicons:bolt" class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No activities found. Create your first activity!</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="activities" />

  </div>
</div>