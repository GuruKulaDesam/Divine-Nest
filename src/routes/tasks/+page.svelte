<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let tasks = [];
  let showAddForm = false;
  let editingTask = null;
  let searchTerm = "";
  let selectedType = "";
  let selectedCategory = "";
  let selectedFrequency = "";

  // Form data
  let formData = {
    type: "Duty",
    category: "Household",
    sub_category: "",
    description: "",
    assigned_to: "",
    mandatory: false,
    frequency: "Daily",
    panchangam_link: "",
    time_of_day: "Morning",
    location: "",
    due_date: "",
    alert_type: "ToDo"
  };

  // Load tasks on mount
  onMount(async () => {
    await loadTasks();
  });

  async function loadTasks() {
    try {
      tasks = await sqliteService.getTasks();
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Duty",
      category: "Household",
      sub_category: "",
      description: "",
      assigned_to: "",
      mandatory: false,
      frequency: "Daily",
      panchangam_link: "",
      time_of_day: "Morning",
      location: "",
      due_date: "",
      alert_type: "ToDo"
    };
  }

  async function saveTask() {
    try {
      const taskData = {
        ...formData,
        id: editingTask ? editingTask.id : crypto.randomUUID(),
        created_by: "current_user", // TODO: Get from user context
        created_at: editingTask ? editingTask.created_at : new Date().toISOString()
      };

      if (editingTask) {
        await sqliteService.updateTask(taskData);
      } else {
        await sqliteService.saveTask(taskData);
      }

      await loadTasks();
      showAddForm = false;
      editingTask = null;
      resetForm();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  function editTask(task) {
    editingTask = task;
    formData = { ...task };
    showAddForm = true;
  }

  async function deleteTask(task) {
    if (confirm(`Delete "${task.description}"?`)) {
      try {
        await sqliteService.deleteTask(task.id);
        await loadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingTask = null;
    resetForm();
  }

  // Filter tasks based on search and filters
  $: filteredTasks = tasks.filter(task => {
    const matchesSearch = !searchTerm ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.sub_category && task.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      task.assigned_to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || task.type === selectedType;
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    const matchesFrequency = !selectedFrequency || task.frequency === selectedFrequency;

    return matchesSearch && matchesType && matchesCategory && matchesFrequency;
  });

  // Get unique values for filters
  $: types = [...new Set(tasks.map(t => t.type))];
  $: categories = [...new Set(tasks.map(t => t.category))];
  $: frequencies = [...new Set(tasks.map(t => t.frequency))];

  // Group tasks by category for display
  $: groupedTasks = filteredTasks.reduce((groups, task) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }
    groups[task.category].push(task);
    return groups;
  }, {});
</script>

<svelte:head>
  <title>Tasks - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8" />
          Tasks Management
        </h1>
        <p class="text-base-content/70 mt-1">Manage duties, responsibilities, and rituals</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingTask = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Task
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search tasks..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Type</span>
          </label>
          <select class="select select-bordered" bind:value={selectedType}>
            <option value="">All Types</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select class="select select-bordered" bind:value={selectedCategory}>
            <option value="">All Categories</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Frequency</span>
          </label>
          <select class="select select-bordered" bind:value={selectedFrequency}>
            <option value="">All Frequencies</option>
            {#each frequencies as frequency}
              <option value={frequency}>{frequency}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Tasks by Category -->
    {#each Object.entries(groupedTasks) as [category, categoryTasks]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon="heroicons:tag" class="w-6 h-6" />
          {category}
          <span class="badge badge-primary badge-sm">{categoryTasks.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each categoryTasks as task}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="card-title text-lg">{task.description}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span class="badge badge-primary">{task.type}</span>
                      <span class="badge badge-secondary">{task.frequency}</span>
                      {#if task.mandatory}
                        <span class="badge badge-error">Mandatory</span>
                      {/if}
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editTask(task)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteTask(task)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  {#if task.sub_category}
                    <p class="text-sm">
                      <strong>Sub-category:</strong> {task.sub_category}
                    </p>
                  {/if}

                  <p class="text-sm">
                    <strong>Assigned to:</strong> {task.assigned_to}
                  </p>

                  {#if task.time_of_day}
                    <p class="text-sm">
                      <strong>Time:</strong> {task.time_of_day}
                    </p>
                  {/if}

                  {#if task.location}
                    <p class="text-sm">
                      <strong>Location:</strong> {task.location}
                    </p>
                  {/if}

                  {#if task.due_date}
                    <p class="text-sm">
                      <strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  {/if}

                  <div class="flex justify-between items-center pt-2">
                    <span class="text-sm text-base-content/60">
                      Alert: {task.alert_type}
                    </span>
                    {#if task.panchangam_link}
                      <Icon icon="heroicons:sparkles" class="w-5 h-5 text-purple-500" />
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredTasks.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:clipboard-document-list" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No tasks found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedCategory || selectedFrequency ? "Try adjusting your filters" : "Add your first task to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h3>

      <form on:submit|preventDefault={saveTask} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Duty</option>
              <option>Responsibility</option>
              <option>Ritual</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>Self</option>
              <option>Family</option>
              <option>Parenting</option>
              <option>Education</option>
              <option>Health</option>
              <option>Household</option>
              <option>Spiritual</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sub Category</span>
          </label>
          <input
            type="text"
            placeholder="Specific sub-category..."
            class="input input-bordered"
            bind:value={formData.sub_category}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description *</span>
          </label>
          <textarea
            placeholder="Task description..."
            class="textarea textarea-bordered"
            bind:value={formData.description}
            required
            rows="3"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Assigned To *</span>
            </label>
            <input
              type="text"
              placeholder="Person responsible..."
              class="input input-bordered"
              bind:value={formData.assigned_to}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Frequency *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.frequency} required>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
              <option>Ad-Hoc</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Time of Day</span>
            </label>
            <select class="select select-bordered" bind:value={formData.time_of_day}>
              <option value="">Any Time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Alert Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.alert_type} required>
              <option>ToDo</option>
              <option>SMS</option>
              <option>Alarm</option>
              <option>Notes</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="Where to perform..."
              class="input input-bordered"
              bind:value={formData.location}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Due Date</span>
            </label>
            <input
              type="date"
              class="input input-bordered"
              bind:value={formData.due_date}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Panchangam Link</span>
          </label>
          <input
            type="text"
            placeholder="Link to panchangam reference..."
            class="input input-bordered"
            bind:value={formData.panchangam_link}
          />
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Mandatory Task</span>
            <input
              type="checkbox"
              class="checkbox checkbox-primary"
              bind:checked={formData.mandatory}
            />
          </label>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingTask ? "Update" : "Add"} Task
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}