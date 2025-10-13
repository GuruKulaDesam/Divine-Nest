<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { tasks, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let activeTasks = [];
  let overdueTasks = [];
  let todayTasks = [];
  let taskStatusChart;
  let priorityChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalTasks = $tasks.length;
  $: completedTasks = $tasks.filter(t => t.status === 'Completed').length;
  $: pendingTasks = $tasks.filter(t => t.status === 'Pending').length;
  $: inProgressTasks = $tasks.filter(t => t.status === 'In Progress').length;
  $: completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks by user's applicable roles
  $: userTasks = $tasks.filter(task =>
    task.applicable_roles.includes($userProfile.role) ||
    task.applicable_roles.includes('All')
  );

  // Active alerts (overdue or due today)
  $: activeAlerts = userTasks.filter(task => {
    if (!task.alert_enabled || task.status === 'Completed') return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 0; // Overdue or due today
  });

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Task Status Distribution Chart
    const statusCtx = document.getElementById('taskStatusChart');
    if (statusCtx) {
      taskStatusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'In Progress', 'Completed'],
          datasets: [{
            data: [pendingTasks, inProgressTasks, completedTasks],
            backgroundColor: ['#fbbf24', '#3b82f6', '#10b981'],
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
      const highPriority = userTasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;
      const mediumPriority = userTasks.filter(t => t.priority === 'Medium').length;
      const lowPriority = userTasks.filter(t => t.priority === 'Low').length;

      priorityChart = new Chart(priorityCtx, {
        type: 'bar',
        data: {
          labels: ['High/Critical', 'Medium', 'Low'],
          datasets: [{
            label: 'Tasks by Priority',
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
    // Process voice command for tasks
    if (result.toLowerCase().includes('create task')) {
      goto('/tasks/create');
    } else if (result.toLowerCase().includes('update task')) {
      goto('/tasks/update');
    }
  }

  function navigateToCreate() {
    goto('/tasks/create');
  }

  function navigateToUpdate(taskId) {
    goto(`/tasks/update?id=${taskId}`);
  }

  function navigateToReview() {
    goto('/tasks/review');
  }
</script>

<svelte:head>
  <title>Tasks Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Tasks Dashboard</h1>
        <p class="text-base-content/70">Monitor and manage your household tasks</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create task' or 'update task'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
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

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Tasks</p>
              <p class="text-2xl font-bold text-primary">{totalTasks}</p>
            </div>
            <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/tasks/update?filter=pending')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Pending</p>
              <p class="text-2xl font-bold text-warning">{pendingTasks}</p>
            </div>
            <Icon icon="heroicons:clock" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/tasks/update?filter=in-progress')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">In Progress</p>
              <p class="text-2xl font-bold text-info">{inProgressTasks}</p>
            </div>
            <Icon icon="heroicons:arrow-path" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Completion Rate</p>
              <p class="text-2xl font-bold text-success">{completionRate}%</p>
            </div>
            <Icon icon="heroicons:check-circle" class="w-8 h-8 text-success" />
          </div>
        </div>
      </div>
    </div>

    <!-- Active Alerts -->
    {#if activeAlerts.length > 0}
      <div class="card bg-error/10 border border-error/20">
        <div class="card-body">
          <h3 class="card-title text-error">
            <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
            Active Alerts ({activeAlerts.length})
          </h3>
          <div class="space-y-2">
            {#each activeAlerts as alert}
              <div class="flex items-center justify-between p-3 bg-error/5 rounded-lg cursor-pointer hover:bg-error/10 transition-colors" on:click={() => navigateToUpdate(alert.id)}>
                <div>
                  <p class="font-medium">{alert.description}</p>
                  <p class="text-sm text-base-content/70">Due: {new Date(alert.due_date).toLocaleDateString()}</p>
                </div>
                <div class="badge badge-error">{alert.priority}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Task Status Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Task Status Distribution</h3>
          <canvas id="taskStatusChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Priority Chart -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Tasks by Priority</h3>
          <canvas id="priorityChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Tasks -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title">Recent Tasks</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each userTasks.slice(0, 5) as task}
                <tr class="cursor-pointer hover" on:click={() => navigateToUpdate(task.id)}>
                  <td class="font-medium">{task.description}</td>
                  <td>{task.assigned_to}</td>
                  <td>
                    <div class="badge {task.priority === 'Critical' ? 'badge-error' : task.priority === 'High' ? 'badge-warning' : task.priority === 'Medium' ? 'badge-info' : 'badge-success'}">
                      {task.priority}
                    </div>
                  </td>
                  <td>
                    <div class="badge {task.status === 'Completed' ? 'badge-success' : task.status === 'In Progress' ? 'badge-info' : 'badge-warning'}">
                      {task.status}
                    </div>
                  </td>
                  <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</td>
                  <td>
                    <button class="btn btn-ghost btn-xs" on:click|stopPropagation={() => navigateToUpdate(task.id)}>
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
    <DiscussionForum tableName="tasks" recordId="dashboard" />

  </div>
</div>