<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let cleaningTasks = [
    {
      id: 1,
      title: 'Kitchen Deep Clean',
      category: 'kitchen',
      frequency: 'weekly',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Mom',
      dueDate: '2024-01-15',
      estimatedTime: '2 hours',
      description: 'Deep cleaning of kitchen including appliances, cabinets, and floors'
    },
    {
      id: 2,
      title: 'Bathroom Cleaning',
      category: 'bathroom',
      frequency: 'daily',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Dad',
      dueDate: '2024-01-14',
      estimatedTime: '30 minutes',
      description: 'Regular bathroom cleaning and sanitization'
    },
    {
      id: 3,
      title: 'Living Room Dusting',
      category: 'living',
      frequency: 'weekly',
      priority: 'low',
      status: 'in-progress',
      assignedTo: 'Sister',
      dueDate: '2024-01-16',
      estimatedTime: '45 minutes',
      description: 'Dust furniture, clean surfaces, and vacuum carpets'
    }
  ];

  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedStatus = 'all';
  let selectedPriority = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingTask = null;

  let newTask = {
    title: '',
    category: 'kitchen',
    frequency: 'weekly',
    priority: 'medium',
    assignedTo: '',
    dueDate: '',
    estimatedTime: '',
    description: ''
  };

  const categories = [
    { id: 'kitchen', name: 'Kitchen', icon: 'mdi:chef-hat' },
    { id: 'bathroom', name: 'Bathroom', icon: 'mdi:shower' },
    { id: 'living', name: 'Living Room', icon: 'mdi:sofa' },
    { id: 'bedroom', name: 'Bedroom', icon: 'mdi:bed' },
    { id: 'garden', name: 'Garden', icon: 'mdi:flower' },
    { id: 'general', name: 'General', icon: 'mdi:broom' }
  ];

  const frequencies = ['daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const statuses = ['pending', 'in-progress', 'completed', 'overdue'];

  $: filteredTasks = cleaningTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  $: stats = {
    total: cleaningTasks.length,
    pending: cleaningTasks.filter(t => t.status === 'pending').length,
    inProgress: cleaningTasks.filter(t => t.status === 'in-progress').length,
    completed: cleaningTasks.filter(t => t.status === 'completed').length,
    overdue: cleaningTasks.filter(t => t.status === 'overdue').length
  };

  function getStatusColor(status) {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getCategoryIcon(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : 'mdi:broom';
  }

  function addTask() {
    const task = {
      id: Date.now(),
      ...newTask,
      status: 'pending'
    };
    cleaningTasks = [...cleaningTasks, task];
    resetNewTask();
    showAddModal = false;
  }

  function editTask(task) {
    editingTask = { ...task };
    showEditModal = true;
  }

  function updateTask() {
    const index = cleaningTasks.findIndex(t => t.id === editingTask.id);
    if (index !== -1) {
      cleaningTasks[index] = { ...editingTask };
      cleaningTasks = [...cleaningTasks];
    }
    showEditModal = false;
    editingTask = null;
  }

  function deleteTask(taskId) {
    cleaningTasks = cleaningTasks.filter(t => t.id !== taskId);
  }

  function resetNewTask() {
    newTask = {
      title: '',
      category: 'kitchen',
      frequency: 'weekly',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
      estimatedTime: '',
      description: ''
    };
  }

  function markAsCompleted(taskId) {
    const task = cleaningTasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      cleaningTasks = [...cleaningTasks];
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Cleaning Management</h1>
      <p class="text-base-content/60 mt-1">Keep your home clean and organized</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Cleaning Task
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:broom" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Tasks</div>
      <div class="stat-value text-primary">{stats.total}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-yellow-500">
        <Icon icon="mdi:clock-outline" class="w-8 h-8" />
      </div>
      <div class="stat-title">Pending</div>
      <div class="stat-value text-yellow-500">{stats.pending}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-blue-500">
        <Icon icon="mdi:progress-clock" class="w-8 h-8" />
      </div>
      <div class="stat-title">In Progress</div>
      <div class="stat-value text-blue-500">{stats.inProgress}</div>
    </div>

    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-green-500">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Completed</div>
      <div class="stat-value text-green-500">{stats.completed}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-lg p-6 shadow">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Tasks</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title or description..."
          class="input input-bordered"
        />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered">
          <option value="all">All Status</option>
          {#each statuses as status}
            <option value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          {/each}
        </select>
      </div>

      <!-- Priority Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Priority</span>
        </label>
        <select bind:value={selectedPriority} class="select select-bordered">
          <option value="all">All Priorities</option>
          {#each priorities as priority}
            <option value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Tasks List -->
  <div class="bg-base-100 rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredTasks as task}
            <tr class="hover">
              <td>
                <div class="flex items-center gap-3">
                  <Icon icon={getCategoryIcon(task.category)} class="w-5 h-5 text-primary" />
                  <div>
                    <div class="font-bold">{task.title}</div>
                    <div class="text-sm opacity-70">{task.description}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="badge badge-ghost">
                  {categories.find(c => c.id === task.category)?.name || task.category}
                </div>
              </td>
              <td>
                <div class="badge {getPriorityColor(task.priority)}">
                  {task.priority}
                </div>
              </td>
              <td>
                <div class="badge {getStatusColor(task.status)}">
                  {task.status}
                </div>
              </td>
              <td>{task.assignedTo}</td>
              <td>{task.dueDate}</td>
              <td>
                <div class="dropdown dropdown-left">
                  <button class="btn btn-ghost btn-sm">
                    <Icon icon="mdi:dots-vertical" class="w-4 h-4" />
                  </button>
                  <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a on:click={() => editTask(task)}>Edit</a></li>
                    {#if task.status !== 'completed'}
                      <li><a on:click={() => markAsCompleted(task.id)}>Mark Complete</a></li>
                    {/if}
                    <li><a class="text-error" on:click={() => deleteTask(task.id)}>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if filteredTasks.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:broom" class="w-16 h-16 text-base-content/20 mx-auto mb-4" />
        <p class="text-base-content/60">No cleaning tasks found</p>
      </div>
    {/if}
  </div>
</div>

<!-- Add Task Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
      <div class="p-6">
        <h3 class="font-bold text-lg mb-4">Add Cleaning Task</h3>

        <form on:submit|preventDefault={addTask} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Task Title *</span>
            </label>
            <input
              type="text"
              bind:value={newTask.title}
              placeholder="Enter task title"
              class="input input-bordered"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={newTask.category} class="select select-bordered">
                {#each categories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Priority</span>
              </label>
              <select bind:value={newTask.priority} class="select select-bordered">
                {#each priorities as priority}
                  <option value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Frequency</span>
              </label>
              <select bind:value={newTask.frequency} class="select select-bordered">
                {#each frequencies as frequency}
                  <option value={frequency}>{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Due Date</span>
              </label>
              <input
                type="date"
                bind:value={newTask.dueDate}
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Assigned To</span>
            </label>
            <input
              type="text"
              bind:value={newTask.assignedTo}
              placeholder="Who is responsible?"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Time</span>
            </label>
            <input
              type="text"
              bind:value={newTask.estimatedTime}
              placeholder="e.g., 2 hours, 30 minutes"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newTask.description}
              placeholder="Task details and instructions..."
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button
              type="button"
              on:click={() => { showAddModal = false; resetNewTask(); }}
              class="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Task Modal -->
{#if showEditModal && editingTask}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
      <div class="p-6">
        <h3 class="font-bold text-lg mb-4">Edit Cleaning Task</h3>

        <form on:submit|preventDefault={updateTask} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Task Title *</span>
            </label>
            <input
              type="text"
              bind:value={editingTask.title}
              placeholder="Enter task title"
              class="input input-bordered"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={editingTask.category} class="select select-bordered">
                {#each categories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Priority</span>
              </label>
              <select bind:value={editingTask.priority} class="select select-bordered">
                {#each priorities as priority}
                  <option value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Frequency</span>
              </label>
              <select bind:value={editingTask.frequency} class="select select-bordered">
                {#each frequencies as frequency}
                  <option value={frequency}>{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select bind:value={editingTask.status} class="select select-bordered">
                {#each statuses as status}
                  <option value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Due Date</span>
              </label>
              <input
                type="date"
                bind:value={editingTask.dueDate}
                class="input input-bordered"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Assigned To</span>
              </label>
              <input
                type="text"
                bind:value={editingTask.assignedTo}
                placeholder="Who is responsible?"
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Time</span>
            </label>
            <input
              type="text"
              bind:value={editingTask.estimatedTime}
              placeholder="e.g., 2 hours, 30 minutes"
              class="input input-bordered"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={editingTask.description}
              placeholder="Task details and instructions..."
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button
              type="button"
              on:click={() => { showEditModal = false; editingTask = null; }}
              class="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}