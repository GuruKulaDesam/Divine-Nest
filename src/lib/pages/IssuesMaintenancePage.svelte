<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let maintenanceTasks = [
    {
      id: 1,
      title: "AC Servicing",
      category: "HVAC",
      frequency: "Quarterly",
      lastDone: "2025-07-15",
      nextDue: "2025-10-15",
      status: "overdue",
      vendor: "CoolAir Services",
      cost: "₹2,500",
      location: "All rooms",
      priority: "high",
    },
    {
      id: 2,
      title: "Water Tank Cleaning",
      category: "Plumbing",
      frequency: "Semi-annually",
      lastDone: "2025-04-01",
      nextDue: "2025-10-01",
      status: "overdue",
      vendor: "AquaClean Services",
      cost: "₹1,800",
      location: "Terrace",
      priority: "high",
    },
    {
      id: 3,
      title: "Electrical Safety Check",
      category: "Electrical",
      frequency: "Annually",
      lastDone: "2025-01-15",
      nextDue: "2026-01-15",
      status: "upcoming",
      vendor: "SafeWire Electricals",
      cost: "₹3,000",
      location: "Entire house",
      priority: "medium",
    },
    {
      id: 4,
      title: "Pest Control",
      category: "Hygiene",
      frequency: "Quarterly",
      lastDone: "2025-09-01",
      nextDue: "2025-12-01",
      status: "scheduled",
      vendor: "BugFree Solutions",
      cost: "₹1,200",
      location: "Entire house",
      priority: "medium",
    },
    {
      id: 5,
      title: "Geyser Maintenance",
      category: "Plumbing",
      frequency: "Annually",
      lastDone: "2025-01-10",
      nextDue: "2026-01-10",
      status: "current",
      vendor: "HotWater Experts",
      cost: "₹800",
      location: "Bathrooms",
      priority: "low",
    },
  ];

  let maintenanceVendors = [
    { name: "CoolAir Services", category: "HVAC", rating: 4.7, contact: "+91-98765-43210", speciality: "AC & Refrigeration" },
    { name: "AquaClean Services", category: "Plumbing", rating: 4.5, contact: "+91-87654-32109", speciality: "Water Systems" },
    { name: "SafeWire Electricals", category: "Electrical", rating: 4.8, contact: "+91-76543-21098", speciality: "Electrical Safety" },
    { name: "BugFree Solutions", category: "Hygiene", rating: 4.4, contact: "+91-65432-10987", speciality: "Pest Control" },
    { name: "HotWater Experts", category: "Plumbing", rating: 4.6, contact: "+91-54321-09876", speciality: "Water Heaters" },
  ];

  let activeTab = "overview";
  let showNewTaskForm = false;

  let newTask = {
    title: "",
    category: "hvac",
    frequency: "quarterly",
    location: "",
    vendor: "",
    cost: "",
    priority: "medium",
    nextDue: "",
  };

  function getStatusColor(status) {
    switch (status) {
      case "overdue":
        return "text-red-600 bg-red-50 border-red-200";
      case "due":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "upcoming":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "scheduled":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "current":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  }

  function getCategoryIcon(category) {
    switch (category) {
      case "HVAC":
        return "heroicons:cpu-chip";
      case "Plumbing":
        return "heroicons:wrench-screwdriver";
      case "Electrical":
        return "heroicons:bolt";
      case "Hygiene":
        return "heroicons:shield-check";
      case "General":
        return "heroicons:home";
      default:
        return "heroicons:cog-6-tooth";
    }
  }

  function calculateDaysUntilDue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function formatDaysText(days) {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `Due in ${days} days`;
  }

  function addMaintenanceTask() {
    const newId = maintenanceTasks.length + 1;
    const today = new Date();
    const daysUntilDue = calculateDaysUntilDue(newTask.nextDue);

    let status = "current";
    if (daysUntilDue < 0) status = "overdue";
    else if (daysUntilDue <= 7) status = "due";
    else if (daysUntilDue <= 30) status = "upcoming";

    maintenanceTasks = [
      ...maintenanceTasks,
      {
        id: newId,
        ...newTask,
        status,
        lastDone: "",
      },
    ];

    // Reset form
    newTask = {
      title: "",
      category: "hvac",
      frequency: "quarterly",
      location: "",
      vendor: "",
      cost: "",
      priority: "medium",
      nextDue: "",
    };

    showNewTaskForm = false;
  }

  function markCompleted(taskId) {
    maintenanceTasks = maintenanceTasks.map((task) => {
      if (task.id === taskId) {
        const today = new Date().toISOString().split("T")[0];
        const nextDue = new Date();

        // Calculate next due date based on frequency
        switch (task.frequency) {
          case "Monthly":
            nextDue.setMonth(nextDue.getMonth() + 1);
            break;
          case "Quarterly":
            nextDue.setMonth(nextDue.getMonth() + 3);
            break;
          case "Semi-annually":
            nextDue.setMonth(nextDue.getMonth() + 6);
            break;
          case "Annually":
            nextDue.setFullYear(nextDue.getFullYear() + 1);
            break;
        }

        return {
          ...task,
          lastDone: today,
          nextDue: nextDue.toISOString().split("T")[0],
          status: "current",
        };
      }
      return task;
    });
  }

  function callVendor(contact) {
    window.open(`tel:${contact}`);
  }

  $: stats = {
    total: maintenanceTasks.length,
    overdue: maintenanceTasks.filter((t) => t.status === "overdue").length,
    due: maintenanceTasks.filter((t) => t.status === "due").length,
    upcoming: maintenanceTasks.filter((t) => t.status === "upcoming").length,
    current: maintenanceTasks.filter((t) => t.status === "current").length,
  };

  $: overdueAndDue = maintenanceTasks.filter((t) => t.status === "overdue" || t.status === "due");
  $: upcomingTasks = maintenanceTasks.filter((t) => t.status === "upcoming" || t.status === "scheduled");
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">⚙️ Maintenance</h1>
        <p class="text-base-content/60">Schedule and track regular household maintenance tasks</p>
      </div>
      <button class="btn btn-primary" on:click={() => (showNewTaskForm = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        Add Task
      </button>
    </div>
  </div>

  <!-- Alert for overdue tasks -->
  {#if stats.overdue > 0}
    <div class="alert alert-warning mb-6">
      <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6" />
      <div>
        <h3 class="font-bold">Maintenance Alert</h3>
        <div class="text-sm">{stats.overdue} maintenance tasks are overdue and need immediate attention</div>
      </div>
    </div>
  {/if}

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Total Tasks</p>
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
            <p class="text-sm text-base-content/60">Due Soon</p>
            <p class="text-2xl font-bold text-orange-500">{stats.due}</p>
          </div>
          <Icon icon="heroicons:clock" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Upcoming</p>
            <p class="text-2xl font-bold text-yellow-500">{stats.upcoming}</p>
          </div>
          <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-yellow-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Current</p>
            <p class="text-2xl font-bold text-green-500">{stats.current}</p>
          </div>
          <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'overview' ? 'tab-active' : ''}" on:click={() => (activeTab = "overview")}>
      <Icon icon="heroicons:home" class="w-4 h-4 mr-2" />
      Overview
    </button>
    <button class="tab {activeTab === 'schedule' ? 'tab-active' : ''}" on:click={() => (activeTab = "schedule")}>
      <Icon icon="heroicons:calendar-days" class="w-4 h-4 mr-2" />
      Maintenance Schedule
    </button>
    <button class="tab {activeTab === 'vendors' ? 'tab-active' : ''}" on:click={() => (activeTab = "vendors")}>
      <Icon icon="heroicons:users" class="w-4 h-4 mr-2" />
      Vendors
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Overdue & Due Tasks -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Needs Attention</h3>
          <div class="space-y-3">
            {#each overdueAndDue as task}
              <div class="p-3 bg-base-200 rounded-lg border-l-4 {getStatusColor(task.status)}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <Icon icon={getCategoryIcon(task.category)} class="w-5 h-5" />
                      <p class="font-medium text-base-content">{task.title}</p>
                      <span class="text-xs {getPriorityColor(task.priority)}">{task.priority}</span>
                    </div>
                    <p class="text-sm text-base-content/60">{task.location} • {task.frequency}</p>
                    <p class="text-sm text-base-content/60">{formatDaysText(calculateDaysUntilDue(task.nextDue))}</p>
                  </div>
                  <button class="btn btn-xs btn-primary" on:click={() => markCompleted(task.id)}> Mark Done </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Upcoming This Month</h3>
          <div class="space-y-3">
            {#each upcomingTasks as task}
              <div class="p-3 bg-base-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="flex items-center space-x-2">
                      <Icon icon={getCategoryIcon(task.category)} class="w-5 h-5" />
                      <p class="font-medium text-base-content">{task.title}</p>
                    </div>
                    <p class="text-sm text-base-content/60">{task.nextDue} • {task.vendor}</p>
                  </div>
                  <span class="text-xs badge {getStatusColor(task.status)}">{task.status}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "schedule"}
    <div class="space-y-4">
      {#each maintenanceTasks as task}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <Icon icon={getCategoryIcon(task.category)} class="w-6 h-6 text-primary" />
                  <h4 class="font-bold text-base-content">{task.title}</h4>
                  <span class="badge {getStatusColor(task.status)} badge-sm">{task.status}</span>
                  <span class="text-sm {getPriorityColor(task.priority)}">{task.priority} priority</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Frequency:</span>
                    <p class="font-medium">{task.frequency}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Last Done:</span>
                    <p class="font-medium">{task.lastDone || "Never"}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Next Due:</span>
                    <p class="font-medium">{task.nextDue}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Vendor:</span>
                    <p class="font-medium">{task.vendor}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Cost:</span>
                    <p class="font-medium">{task.cost}</p>
                  </div>
                </div>
                <div class="mt-2">
                  <span class="text-base-content/60">Location:</span>
                  <span class="ml-2">{task.location}</span>
                </div>
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-primary" on:click={() => markCompleted(task.id)}>Complete</button>
                <button class="btn btn-sm btn-outline">Schedule</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "vendors"}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each maintenanceVendors as vendor}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-base-content">{vendor.name}</h4>
              <div class="rating rating-sm">
                <span class="text-sm font-medium">{vendor.rating}</span>
                <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500 ml-1" />
              </div>
            </div>
            <p class="text-sm text-base-content/60 mb-2">{vendor.speciality}</p>
            <span class="badge badge-outline mb-3">{vendor.category}</span>
            <button class="btn btn-primary btn-sm w-full" on:click={() => callVendor(vendor.contact)}>
              <Icon icon="heroicons:phone" class="w-4 h-4 mr-2" />
              Call {vendor.contact}
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- New Maintenance Task Modal -->
{#if showNewTaskForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Add Maintenance Task</h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Task Title</span>
          </label>
          <input type="text" placeholder="e.g., AC Servicing" class="input input-bordered" bind:value={newTask.title} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={newTask.category}>
              <option value="hvac">HVAC</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hygiene">Hygiene</option>
              <option value="general">General</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Frequency</span>
            </label>
            <select class="select select-bordered" bind:value={newTask.frequency}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi-annually">Semi-annually</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input type="text" placeholder="e.g., All rooms, Kitchen" class="input input-bordered" bind:value={newTask.location} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={newTask.priority}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Vendor</span>
            </label>
            <input type="text" placeholder="Vendor name" class="input input-bordered" bind:value={newTask.vendor} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Cost</span>
            </label>
            <input type="text" placeholder="e.g., ₹2,500" class="input input-bordered" bind:value={newTask.cost} />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Next Due Date</span>
          </label>
          <input type="date" class="input input-bordered" bind:value={newTask.nextDue} />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" on:click={() => (showNewTaskForm = false)}>Cancel</button>
        <button class="btn btn-primary" on:click={addMaintenanceTask}>Add Task</button>
      </div>
    </div>
  </div>
{/if}
