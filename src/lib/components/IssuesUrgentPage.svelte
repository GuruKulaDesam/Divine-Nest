<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let urgentTasks = [
    {
      id: 1,
      title: "Complete School Admission Forms",
      category: "Education",
      priority: "urgent",
      deadline: "2025-10-08",
      assignedTo: "Appa",
      status: "in-progress",
      description: "Submit admission forms for Akka's college application",
      timeLeft: "2 days",
      progress: 75,
    },
    {
      id: 2,
      title: "Renew Vehicle Insurance",
      category: "Legal",
      priority: "urgent",
      deadline: "2025-10-07",
      assignedTo: "Amma",
      status: "pending",
      description: "Car insurance expires tomorrow, need immediate renewal",
      timeLeft: "1 day",
      progress: 0,
    },
    {
      id: 3,
      title: "Doctor Appointment for Paati",
      category: "Health",
      priority: "high",
      deadline: "2025-10-09",
      assignedTo: "Amma",
      status: "scheduled",
      description: "Regular checkup and medication review",
      timeLeft: "3 days",
      progress: 50,
    },
    {
      id: 4,
      title: "Property Tax Payment",
      category: "Financial",
      priority: "urgent",
      deadline: "2025-10-10",
      assignedTo: "Appa",
      status: "pending",
      description: "Annual property tax due, avoid late fees",
      timeLeft: "4 days",
      progress: 0,
    },
    {
      id: 5,
      title: "Festival Shopping List",
      category: "Cultural",
      priority: "high",
      deadline: "2025-10-12",
      assignedTo: "Amma",
      status: "in-progress",
      description: "Prepare for upcoming Diwali celebrations",
      timeLeft: "6 days",
      progress: 30,
    },
  ];

  let completedTasks = [
    {
      id: 101,
      title: "Gas Cylinder Booking",
      category: "Household",
      completedDate: "2025-10-05",
      completedBy: "Amma",
    },
    {
      id: 102,
      title: "Bank Statement Collection",
      category: "Financial",
      completedDate: "2025-10-04",
      completedBy: "Appa",
    },
  ];

  let activeTab = "active";
  let showNewTaskForm = false;

  let newTask = {
    title: "",
    category: "household",
    priority: "high",
    deadline: "",
    assignedTo: "",
    description: "",
  };

  function getPriorityColor(priority) {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "text-red-600 bg-red-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
      case "scheduled":
        return "text-purple-600 bg-purple-50";
      case "completed":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  function getCategoryIcon(category) {
    switch (category) {
      case "Education":
        return "heroicons:academic-cap";
      case "Legal":
        return "heroicons:scale";
      case "Health":
        return "heroicons:heart";
      case "Financial":
        return "heroicons:banknotes";
      case "Cultural":
        return "heroicons:gift";
      case "Household":
        return "heroicons:home";
      default:
        return "heroicons:clipboard-document-list";
    }
  }

  function calculateTimeLeft(deadline) {
    const today = new Date();
    const due = new Date(deadline);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days left`;
  }

  function addUrgentTask() {
    const newId = urgentTasks.length + 1;
    urgentTasks = [
      ...urgentTasks,
      {
        id: newId,
        ...newTask,
        status: "pending",
        timeLeft: calculateTimeLeft(newTask.deadline),
        progress: 0,
      },
    ];

    // Reset form
    newTask = {
      title: "",
      category: "household",
      priority: "high",
      deadline: "",
      assignedTo: "",
      description: "",
    };

    showNewTaskForm = false;
  }

  function markCompleted(taskId) {
    const task = urgentTasks.find((t) => t.id === taskId);
    if (task) {
      // Move to completed tasks
      completedTasks = [
        ...completedTasks,
        {
          id: task.id,
          title: task.title,
          category: task.category,
          completedDate: new Date().toISOString().split("T")[0],
          completedBy: task.assignedTo,
        },
      ];

      // Remove from urgent tasks
      urgentTasks = urgentTasks.filter((t) => t.id !== taskId);
    }
  }

  function updateProgress(taskId, newProgress) {
    urgentTasks = urgentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, progress: newProgress };
      }
      return task;
    });
  }

  $: stats = {
    total: urgentTasks.length,
    overdue: urgentTasks.filter((t) => t.timeLeft === "Overdue").length,
    today: urgentTasks.filter((t) => t.timeLeft === "Due today").length,
    pending: urgentTasks.filter((t) => t.status === "pending").length,
    inProgress: urgentTasks.filter((t) => t.status === "in-progress").length,
  };

  // Update time left for all tasks
  onMount(() => {
    const interval = setInterval(() => {
      urgentTasks = urgentTasks.map((task) => ({
        ...task,
        timeLeft: calculateTimeLeft(task.deadline),
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  });
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">⚡ Urgent Tasks</h1>
        <p class="text-base-content/60">Time-sensitive tasks that need immediate attention</p>
      </div>
      <button class="btn btn-error" on:click={() => (showNewTaskForm = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        Add Urgent Task
      </button>
    </div>
  </div>

  <!-- Alert for overdue/today tasks -->
  {#if stats.overdue > 0 || stats.today > 0}
    <div class="alert alert-error mb-6">
      <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6" />
      <div>
        <h3 class="font-bold">Critical Tasks Alert</h3>
        <div class="text-sm">
          {#if stats.overdue > 0}{stats.overdue} tasks are overdue{/if}
          {#if stats.overdue > 0 && stats.today > 0}
            and
          {/if}
          {#if stats.today > 0}{stats.today} tasks are due today{/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Active Tasks</p>
            <p class="text-2xl font-bold text-blue-500">{stats.total}</p>
          </div>
          <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Overdue</p>
            <p class="text-2xl font-bold text-red-500">{stats.overdue}</p>
          </div>
          <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Due Today</p>
            <p class="text-2xl font-bold text-orange-500">{stats.today}</p>
          </div>
          <Icon icon="heroicons:clock" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Pending</p>
            <p class="text-2xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <Icon icon="heroicons:pause" class="w-8 h-8 text-yellow-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">In Progress</p>
            <p class="text-2xl font-bold text-purple-500">{stats.inProgress}</p>
          </div>
          <Icon icon="heroicons:arrow-path" class="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'active' ? 'tab-active' : ''}" on:click={() => (activeTab = "active")}>
      <Icon icon="heroicons:bolt" class="w-4 h-4 mr-2" />
      Active Tasks
    </button>
    <button class="tab {activeTab === 'completed' ? 'tab-active' : ''}" on:click={() => (activeTab = "completed")}>
      <Icon icon="heroicons:check-circle" class="w-4 h-4 mr-2" />
      Completed
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "active"}
    <div class="space-y-4">
      {#each urgentTasks.sort((a, b) => {
        // Sort by urgency: overdue, due today, then by deadline
        if (a.timeLeft === "Overdue" && b.timeLeft !== "Overdue") return -1;
        if (b.timeLeft === "Overdue" && a.timeLeft !== "Overdue") return 1;
        if (a.timeLeft === "Due today" && b.timeLeft !== "Due today") return -1;
        if (b.timeLeft === "Due today" && a.timeLeft !== "Due today") return 1;
        return new Date(a.deadline) - new Date(b.deadline);
      }) as task}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <Icon icon={getCategoryIcon(task.category)} class="w-6 h-6 text-primary" />
                  <h4 class="font-bold text-base-content">{task.title}</h4>
                  <span class="badge {getPriorityColor(task.priority)} badge-sm">{task.priority}</span>
                  <span class="badge {getStatusColor(task.status)} badge-sm">{task.status}</span>
                </div>
                <p class="text-base-content/80 mb-3">{task.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <span class="text-base-content/60">Deadline:</span>
                    <p class="font-medium">{task.deadline}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Time Left:</span>
                    <p class="font-medium text-red-600">{task.timeLeft}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Assigned to:</span>
                    <p class="font-medium">{task.assignedTo}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Category:</span>
                    <p class="font-medium">{task.category}</p>
                  </div>
                </div>
                {#if task.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value={task.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-success" on:click={() => markCompleted(task.id)}>
                  <Icon icon="heroicons:check" class="w-4 h-4" />
                  Complete
                </button>
                <div class="dropdown dropdown-end">
                  <label tabindex="0" class="btn btn-sm btn-outline">
                    <Icon icon="heroicons:ellipsis-vertical" class="w-4 h-4" />
                  </label>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button on:click={() => updateProgress(task.id, 25)}>Set 25% Complete</button></li>
                    <li><button on:click={() => updateProgress(task.id, 50)}>Set 50% Complete</button></li>
                    <li><button on:click={() => updateProgress(task.id, 75)}>Set 75% Complete</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "completed"}
    <div class="space-y-4">
      {#each completedTasks.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate)) as task}
        <div class="card bg-base-100 border border-base-300 shadow-sm opacity-75">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon icon={getCategoryIcon(task.category)} class="w-6 h-6 text-green-500" />
                <div>
                  <h4 class="font-bold text-base-content">{task.title}</h4>
                  <p class="text-sm text-base-content/60">
                    Completed on {task.completedDate} by {task.completedBy}
                  </p>
                </div>
              </div>
              <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- New Urgent Task Modal -->
{#if showNewTaskForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Add Urgent Task</h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Task Title</span>
          </label>
          <input type="text" placeholder="e.g., Complete School Admission Forms" class="input input-bordered" bind:value={newTask.title} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={newTask.category}>
              <option value="household">Household</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="financial">Financial</option>
              <option value="legal">Legal</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={newTask.priority}>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea class="textarea textarea-bordered" placeholder="Describe the urgent task..." bind:value={newTask.description}></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Deadline</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={newTask.deadline} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Assigned to</span>
            </label>
            <select class="select select-bordered" bind:value={newTask.assignedTo}>
              <option value="">Select person</option>
              <option value="Appa">Appa</option>
              <option value="Amma">Amma</option>
              <option value="Akka">Akka</option>
              <option value="Paati">Paati</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" on:click={() => (showNewTaskForm = false)}>Cancel</button>
        <button class="btn btn-error" on:click={addUrgentTask}>Add Urgent Task</button>
      </div>
    </div>
  </div>
{/if}
