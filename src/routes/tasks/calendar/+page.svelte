<script>
  import { onMount } from 'svelte';
  import { sqliteService } from '$lib/services/sqliteService';
  import { todos } from '$lib/stores/todos';
  import Icon from '@iconify/svelte';

  let tasks = [];
  let selectedDate = new Date().toISOString().split('T')[0];
  let calendarTasks = [];

  onMount(async () => {
    await loadTasks();
  });

  async function loadTasks() {
    try {
      const allTasks = await sqliteService.getTodos();
      tasks = allTasks || [];
      filterTasksByDate();
    } catch (error) {
      console.error('Error loading tasks:', error);
      tasks = [];
    }
  }

  function filterTasksByDate() {
    calendarTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      return task.dueDate.startsWith(selectedDate);
    });
  }

  $: if (selectedDate) {
    filterTasksByDate();
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-base-content">Task Calendar</h1>
    <div class="flex items-center space-x-4">
      <input
        type="date"
        bind:value={selectedDate}
        class="input input-bordered bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
      />
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each calendarTasks as task}
      <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
        <div class="card-body">
          <h3 class="card-title text-lg">{task.title}</h3>
          <p class="text-sm opacity-70">{task.description || 'No description'}</p>
          <div class="flex items-center justify-between mt-4">
            <span class="badge badge-primary">{task.category || 'General'}</span>
            <span class="text-sm opacity-60">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-sm btn-outline">
              <Icon icon="heroicons:eye" class="w-4 h-4" />
              View
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if calendarTasks.length === 0}
    <div class="text-center py-12">
      <Icon icon="heroicons:calendar-days" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-xl font-semibold text-base-content mb-2">No Tasks for Selected Date</h3>
      <p class="text-gray-600 dark:text-gray-400">Tasks with due dates will appear here.</p>
    </div>
  {/if}
</div>