<script>
  import { onMount } from "svelte";
  import { getRepairTasks, addRepairTask, updateRepairTask, deleteRepairTask } from "$lib/data/home.js";

  let repairTasks = [];
  let showAddForm = false;
  let filterStatus = "all";
  let filterPriority = "all";

  // Form data
  let newTask = {
    issue: "",
    location: "kitchen",
    assignedTo: "appa",
    priority: "medium",
    estimatedCost: 0,
    notes: "",
  };

  const locations = [
    { value: "kitchen", label: "Kitchen", icon: "🍳" },
    { value: "bathroom", label: "Bathroom", icon: "🚿" },
    { value: "living-room", label: "Living Room", icon: "🛋️" },
    { value: "bedroom", label: "Bedroom", icon: "🛏️" },
    { value: "exterior", label: "Exterior", icon: "🏠" },
    { value: "other", label: "Other", icon: "🔧" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
  ];

  const statuses = [
    { value: "pending", label: "Pending", color: "bg-gray-100 text-gray-800" },
    { value: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  ];

  onMount(async () => {
    await loadRepairTasks();
  });

  async function loadRepairTasks() {
    repairTasks = await getRepairTasks();
  }

  async function handleAddTask() {
    if (!newTask.issue.trim()) return;

    const task = {
      ...newTask,
      id: Date.now().toString(),
      status: "pending",
      createdDate: new Date(),
    };

    await addRepairTask(task);
    await loadRepairTasks();

    // Reset form
    newTask = {
      issue: "",
      location: "kitchen",
      assignedTo: "appa",
      priority: "medium",
      estimatedCost: 0,
      notes: "",
    };
    showAddForm = false;
  }

  async function updateTaskStatus(task, newStatus) {
    const updates = { status: newStatus };
    if (newStatus === "completed") {
      updates.completedDate = new Date();
    }
    await updateRepairTask(task.id, updates);
    await loadRepairTasks();
  }

  async function removeTask(task) {
    if (confirm(`Remove repair task "${task.issue}"?`)) {
      await deleteRepairTask(task.id);
      await loadRepairTasks();
    }
  }

  $: filteredTasks = repairTasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  $: pendingTasks = filteredTasks.filter((task) => task.status === "pending");
  $: urgentTasks = filteredTasks.filter((task) => task.priority === "urgent" || task.priority === "high");
</script>

<div class="space-y-6">
  <!-- Header with Stats -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-gray-800">🔧 Repairs & Maintenance</h2>
      <p class="text-gray-600">Track home repairs and maintenance tasks</p>
    </div>

    <div class="flex gap-2">
      {#if urgentTasks.length > 0}
        <div class="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <div class="text-sm text-red-800">
            🚨 {urgentTasks.length} urgent task{urgentTasks.length > 1 ? "s" : ""}
          </div>
        </div>
      {/if}

      <div class="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
        <div class="text-sm text-orange-800">
          📋 {pendingTasks.length} pending
        </div>
      </div>
    </div>
  </div>

  <!-- Filters and Add Button -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex gap-2">
      <select bind:value={filterStatus} class="px-3 py-2 border border-gray-300 rounded-lg">
        <option value="all">All Status</option>
        {#each statuses as status}
          <option value={status.value}>{status.label}</option>
        {/each}
      </select>

      <select bind:value={filterPriority} class="px-3 py-2 border border-gray-300 rounded-lg">
        <option value="all">All Priorities</option>
        {#each priorities as priority}
          <option value={priority.value}>{priority.label}</option>
        {/each}
      </select>
    </div>

    <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <span>+</span>
      Add Repair Task
    </button>
  </div>

  <!-- Add Task Form -->
  {#if showAddForm}
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h3 class="font-semibold text-orange-800 mb-3">Add New Repair Task</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Issue description" bind:value={newTask.issue} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <select bind:value={newTask.location} class="px-3 py-2 border border-gray-300 rounded-lg">
          {#each locations as location}
            <option value={location.value}>{location.icon} {location.label}</option>
          {/each}
        </select>

        <input type="text" placeholder="Assigned to" bind:value={newTask.assignedTo} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <select bind:value={newTask.priority} class="px-3 py-2 border border-gray-300 rounded-lg">
          {#each priorities as priority}
            <option value={priority.value}>{priority.label}</option>
          {/each}
        </select>

        <input type="number" placeholder="Estimated cost (₹)" bind:value={newTask.estimatedCost} min="0" class="px-3 py-2 border border-gray-300 rounded-lg" />

        <textarea placeholder="Additional notes" bind:value={newTask.notes} rows="2" class="px-3 py-2 border border-gray-300 rounded-lg"></textarea>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={handleAddTask}> Add Task </button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={() => (showAddForm = false)}> Cancel </button>
      </div>
    </div>
  {/if}

  <!-- Urgent Tasks Alert -->
  {#if urgentTasks.length > 0}
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-red-600">🚨</span>
        <h3 class="font-semibold text-red-800">Urgent Repairs Needed</h3>
      </div>
      <div class="space-y-2">
        {#each urgentTasks as task}
          <div class="flex items-center justify-between bg-white p-3 rounded border border-red-200">
            <div>
              <span class="font-medium text-red-800">{task.issue}</span>
              <span class="text-sm text-red-600 ml-2">({locations.find((l) => l.value === task.location)?.label})</span>
            </div>
            <span class="px-2 py-1 rounded-full text-xs font-medium {priorities.find((p) => p.value === task.priority)?.color}">
              {priorities.find((p) => p.value === task.priority)?.label}
            </span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Repair Tasks Grid -->
  {#if filteredTasks.length === 0}
    <div class="text-center py-12 text-gray-500">
      <div class="text-4xl mb-4">🔧</div>
      <p class="text-lg">No repair tasks found</p>
      <p class="text-sm">Add your first maintenance task to get started!</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each filteredTasks as task}
        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">
                {locations.find((l) => l.value === task.location)?.icon || "🔧"}
              </span>
              <div>
                <h3 class="font-semibold text-gray-800">{task.issue}</h3>
                <p class="text-sm text-gray-500 capitalize">{task.location.replace("-", " ")}</p>
              </div>
            </div>

            <div class="flex gap-1">
              {#if task.status !== "completed"}
                <button class="text-green-500 hover:text-green-700 p-1" on:click={() => updateTaskStatus(task, "completed")} title="Mark as completed"> ✅ </button>
              {/if}
              <button class="text-red-500 hover:text-red-700 p-1" on:click={() => removeTask(task)}> 🗑️ </button>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Status:</span>
              <span class="px-2 py-1 rounded-full text-xs font-medium {statuses.find((s) => s.value === task.status)?.color}">
                {statuses.find((s) => s.value === task.status)?.label}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Priority:</span>
              <span class="px-2 py-1 rounded-full text-xs font-medium {priorities.find((p) => p.value === task.priority)?.color}">
                {priorities.find((p) => p.value === task.priority)?.label}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Assigned to:</span>
              <span class="font-medium text-gray-800">{task.assignedTo}</span>
            </div>

            {#if task.estimatedCost > 0}
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Estimated cost:</span>
                <span class="font-medium text-green-600">₹{task.estimatedCost}</span>
              </div>
            {/if}

            {#if task.notes}
              <div>
                <span class="text-sm text-gray-600">Notes:</span>
                <p class="text-sm text-gray-700 mt-1">{task.notes}</p>
              </div>
            {/if}

            <div class="text-xs text-gray-500 border-t pt-2">
              Created: {task.createdDate.toLocaleDateString()}
              {#if task.completedDate}
                <br />Completed: {task.completedDate.toLocaleDateString()}
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
