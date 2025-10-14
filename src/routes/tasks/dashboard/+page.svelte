<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { todos } from '$lib/stores/todos';
  import { discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let activeTasks = [];
  let overdueTasks = [];
  let todayTasks = [];
  let taskStatusChart;
  let priorityChart;
  let voiceResult = '';
  let isLoading = true;

  // Calculate KPIs
  $: totalTasks = $todos.length;
  $: completedTasks = $todos.filter(t => t.status === 'Completed').length;
  $: pendingTasks = $todos.filter(t => t.status === 'Pending').length;
  $: inProgressTasks = $todos.filter(t => t.status === 'In Progress').length;
  $: completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Smart KPIs and insights
  $: overdueTasks = userTasks.filter(task => {
    if (!task.due_date || task.status === 'Completed') return false;
    return new Date(task.due_date) < new Date();
  }).length;

  $: dueTodayTasks = userTasks.filter(task => {
    if (!task.due_date || task.status === 'Completed') return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    return dueDate.toDateString() === today.toDateString();
  }).length;

  $: highPriorityTasks = userTasks.filter(task => task.priority === 'High' && task.status !== 'Completed').length;
  $: productivityScore = calculateProductivityScore();
  $: smartRecommendations = generateSmartRecommendations();

  function calculateProductivityScore() {
    if (totalTasks === 0) return 0;
    let score = completionRate;

    // Bonus for completing high priority tasks
    const highPriorityCompleted = userTasks.filter(task =>
      task.priority === 'High' && task.status === 'Completed'
    ).length;
    score += (highPriorityCompleted / Math.max(highPriorityTasks + highPriorityCompleted, 1)) * 20;

    // Penalty for overdue tasks
    score -= (overdueTasks / totalTasks) * 30;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function generateSmartRecommendations() {
    const recommendations = [];

    if (overdueTasks > 0) {
      recommendations.push({
        type: 'warning',
        icon: 'heroicons:exclamation-triangle',
        title: 'Overdue Tasks',
        message: `You have ${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}. Consider reprioritizing or delegating.`
      });
    }

    if (dueTodayTasks > 0) {
      recommendations.push({
        type: 'info',
        icon: 'heroicons:calendar',
        title: 'Due Today',
        message: `${dueTodayTasks} task${dueTodayTasks > 1 ? 's are' : ' is'} due today. Focus on completing these first.`
      });
    }

    if (highPriorityTasks > 3) {
      recommendations.push({
        type: 'warning',
        icon: 'heroicons:flag',
        title: 'High Priority Backlog',
        message: 'You have many high-priority tasks. Consider breaking them down into smaller, actionable items.'
      });
    }

    if (productivityScore < 50) {
      recommendations.push({
        type: 'success',
        icon: 'heroicons:light-bulb',
        title: 'Productivity Tip',
        message: 'Try the Pomodoro technique: 25 minutes focused work followed by a 5-minute break.'
      });
    }

    if (pendingTasks > completedTasks) {
      recommendations.push({
        type: 'info',
        icon: 'heroicons:chart-bar',
        title: 'Task Balance',
        message: 'You have more pending than completed tasks. Consider completing smaller tasks first for quick wins.'
      });
    }

    return recommendations.slice(0, 3); // Show top 3 recommendations
  }

  // Filter tasks by user's applicable roles
  $: userTasks = $todos.filter(task =>
    !task.applicable_roles ||
    task.applicable_roles.length === 0 ||
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
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initializeCharts();
      isLoading = false;
    }, 100);
  });

  function initializeCharts() {
    try {
      // Destroy existing charts to prevent memory leaks
      if (taskStatusChart) {
        taskStatusChart.destroy();
      }
      if (priorityChart) {
        priorityChart.destroy();
      }

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
    } catch (error) {
      console.error('Error initializing charts:', error);
      isLoading = false;
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

  // Reinitialize charts when data changes
  $: if (!isLoading && (pendingTasks !== undefined || inProgressTasks !== undefined || completedTasks !== undefined)) {
    initializeCharts();
  }
</script>

<svelte:head>
  <title>Tasks Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Tasks Dashboard</h1>
        <p class="text-base-content/70">Monitor and manage your household tasks</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create task' or 'update task'" />
        <button class="btn btn-primary btn-lg gap-3" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus-circle" class="w-8 h-8" />
          <span class="text-lg font-semibold">Create Task</span>
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
      <div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-200" on:click={navigateToReview}>
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

      <div class="card bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-200" on:click={() => goto('/tasks/update?filter=pending')}>
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

      <div class="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-200" on:click={() => goto('/tasks/update?filter=in-progress')}>
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

      <div class="card bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-200" on:click={navigateToReview}>
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

    <!-- Productivity Score & Smart Recommendations -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Productivity Score -->
      <div class="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h3 class="card-title text-white">Productivity Score</h3>
            <Icon icon="heroicons:chart-bar" class="w-8 h-8" />
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2">{productivityScore}</div>
            <div class="text-sm opacity-90">
              {#if productivityScore >= 80}
                Excellent performance! 🎉
              {:else if productivityScore >= 60}
                Good progress, keep it up! 👍
              {:else if productivityScore >= 40}
                Room for improvement 📈
              {:else}
                Let's focus on priorities 🎯
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Smart Recommendations -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title flex items-center gap-2">
              <Icon icon="heroicons:light-bulb" class="w-6 h-6 text-warning" />
              Smart Recommendations
            </h3>
            <div class="space-y-3">
              {#each smartRecommendations as recommendation}
                <div class="alert {recommendation.type === 'warning' ? 'alert-warning' : recommendation.type === 'success' ? 'alert-success' : 'alert-info'}">
                  <Icon icon={recommendation.icon} class="w-5 h-5" />
                  <div>
                    <div class="font-semibold">{recommendation.title}</div>
                    <div class="text-sm">{recommendation.message}</div>
                  </div>
                </div>
              {/each}
              {#if smartRecommendations.length === 0}
                <div class="text-center py-4 text-base-content/60">
                  <Icon icon="heroicons:check-circle" class="w-12 h-12 mx-auto mb-2 text-success" />
                  <p>Great job! Everything looks good. Keep up the excellent work!</p>
                </div>
              {/if}
            </div>
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
      <div class="card bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <div class="card-body">
          <h3 class="card-title text-gray-900 dark:text-white">Task Status Distribution</h3>
          {#if isLoading}
            <div class="flex justify-center items-center h-48">
              <div class="loading loading-spinner loading-lg text-primary"></div>
            </div>
          {:else}
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4">
              <canvas id="taskStatusChart" width="300" height="200"></canvas>
            </div>
          {/if}
        </div>
      </div>

      <!-- Priority Chart -->
      <div class="card bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <div class="card-body">
          <h3 class="card-title text-gray-900 dark:text-white">Tasks by Priority</h3>
          {#if isLoading}
            <div class="flex justify-center items-center h-48">
              <div class="loading loading-spinner loading-lg text-primary"></div>
            </div>
          {:else}
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-4">
              <canvas id="priorityChart" width="300" height="200"></canvas>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Recent Tasks -->
    <div class="card bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h3 class="card-title text-gray-900 dark:text-white">Recent Tasks</h3>
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
                    <button class="btn btn-ghost btn-lg gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30" on:click|stopPropagation={() => navigateToUpdate(task.id)} title="Edit Task">
                      <Icon icon="heroicons:pencil-square" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <span class="text-blue-600 dark:text-blue-400 font-medium">Edit</span>
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