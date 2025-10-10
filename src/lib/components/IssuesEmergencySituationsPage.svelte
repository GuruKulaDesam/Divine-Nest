<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let emergencySituations = [
    {
      id: 1,
      title: "Power Outage in Main Hall",
      type: "Electrical",
      priority: "urgent",
      status: "in-progress",
      reportedTime: "2025-10-06 14:30",
      description: "Complete power failure in main hall during pooja time",
      assignedTo: "Raman Electricals",
      estimatedResolution: "2 hours",
      progress: 60,
    },
    {
      id: 2,
      title: "Water Leakage in Kitchen",
      type: "Plumbing",
      priority: "urgent",
      status: "pending",
      reportedTime: "2025-10-06 13:15",
      description: "Heavy water leakage from main pipe under kitchen sink",
      assignedTo: "Pending Assignment",
      estimatedResolution: "4 hours",
      progress: 0,
    },
    {
      id: 3,
      title: "Gas Leak Suspected",
      type: "Gas",
      priority: "critical",
      status: "resolved",
      reportedTime: "2025-10-05 09:45",
      description: "Strong gas smell detected in dining area",
      assignedTo: "Indane Gas Service",
      estimatedResolution: "1 hour",
      progress: 100,
    },
  ];

  let activeTab = "overview";
  let showNewEmergencyForm = false;

  let newEmergency = {
    title: "",
    type: "electrical",
    priority: "urgent",
    description: "",
    location: "",
  };

  function getPriorityColor(priority) {
    switch (priority) {
      case "critical":
        return "text-red-700 bg-red-100 border-red-300";
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
        return "text-orange-600 bg-orange-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
      case "resolved":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case "Electrical":
        return "heroicons:bolt";
      case "Plumbing":
        return "heroicons:wrench-screwdriver";
      case "Gas":
        return "heroicons:fire";
      case "Security":
        return "heroicons:shield-check";
      default:
        return "heroicons:exclamation-triangle";
    }
  }

  function addEmergencySituation() {
    const newId = emergencySituations.length + 1;
    emergencySituations = [
      ...emergencySituations,
      {
        id: newId,
        ...newEmergency,
        status: "pending",
        assignedTo: "Pending Assignment",
        reportedTime: new Date().toISOString().slice(0, 16).replace("T", " "),
        estimatedResolution: "TBD",
        progress: 0,
      },
    ];

    // Reset form
    newEmergency = {
      title: "",
      type: "electrical",
      priority: "urgent",
      description: "",
      location: "",
    };

    showNewEmergencyForm = false;
  }

  function callEmergency(number) {
    window.open(`tel:${number}`);
  }

  $: stats = {
    total: emergencySituations.length,
    pending: emergencySituations.filter((s) => s.status === "pending").length,
    inProgress: emergencySituations.filter((s) => s.status === "in-progress").length,
    resolved: emergencySituations.filter((s) => s.status === "resolved").length,
    critical: emergencySituations.filter((s) => s.priority === "critical" && s.status !== "resolved").length,
  };
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">🚨 Emergency Situations</h1>
        <p class="text-base-content/60">Manage critical emergency issues and urgent situations requiring immediate attention</p>
      </div>
      <button class="btn btn-error" on:click={() => (showNewEmergencyForm = true)}>
        <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
        Report Emergency
      </button>
    </div>
  </div>

  <!-- Critical Alert Banner -->
  {#if stats.critical > 0}
    <div class="alert alert-error mb-6">
      <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6" />
      <div>
        <h3 class="font-bold">CRITICAL SITUATIONS ACTIVE</h3>
        <div class="text-sm">
          {stats.critical} critical emergency situation{stats.critical > 1 ? "s" : ""} require immediate attention
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
            <p class="text-sm text-base-content/60">Total Situations</p>
            <p class="text-2xl font-bold text-red-500">{stats.total}</p>
          </div>
          <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Pending</p>
            <p class="text-2xl font-bold text-orange-500">{stats.pending}</p>
          </div>
          <Icon icon="heroicons:clock" class="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">In Progress</p>
            <p class="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
          </div>
          <Icon icon="heroicons:cog-6-tooth" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Resolved</p>
            <p class="text-2xl font-bold text-green-500">{stats.resolved}</p>
          </div>
          <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Critical</p>
            <p class="text-2xl font-bold text-red-700">{stats.critical}</p>
          </div>
          <Icon icon="heroicons:exclamation-circle" class="w-8 h-8 text-red-700" />
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
    <button class="tab {activeTab === 'situations' ? 'tab-active' : ''}" on:click={() => (activeTab = "situations")}>
      <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 mr-2" />
      All Situations
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Critical Situations -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Critical Situations</h3>
          <div class="space-y-3">
            {#each emergencySituations.filter((s) => s.priority === "critical" && s.status !== "resolved") as situation}
              <div class="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="font-medium text-red-800">{situation.title}</p>
                    <p class="text-sm text-red-600">{situation.type} • {situation.reportedTime}</p>
                    <div class="flex items-center space-x-2 mt-2">
                      <span class="text-xs badge bg-red-100 text-red-800">CRITICAL</span>
                      <span class="text-xs text-red-600">{situation.estimatedResolution}</span>
                    </div>
                  </div>
                  <Icon icon={getTypeIcon(situation.type)} class="w-5 h-5 text-red-500" />
                </div>
                {#if situation.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{situation.progress}%</span>
                    </div>
                    <progress class="progress progress-error w-full" value={situation.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
            {/each}
            {#if emergencySituations.filter((s) => s.priority === "critical" && s.status !== "resolved").length === 0}
              <p class="text-base-content/60 text-center py-4">No critical situations at this time</p>
            {/if}
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Recent Emergency Activity</h3>
          <div class="space-y-3">
            {#each emergencySituations.slice(0, 5) as situation}
              <div class="p-3 bg-base-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-base-content">{situation.title}</p>
                    <p class="text-sm text-base-content/60">{situation.reportedTime} • {situation.assignedTo}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="badge {getStatusColor(situation.status)} badge-sm">{situation.status}</span>
                    <Icon icon={getTypeIcon(situation.type)} class="w-5 h-5 text-base-content/40" />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "situations"}
    <div class="space-y-4">
      {#each emergencySituations as situation}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <Icon icon={getTypeIcon(situation.type)} class="w-6 h-6 text-error" />
                  <h4 class="font-bold text-base-content">{situation.title}</h4>
                  <span class="badge {getPriorityColor(situation.priority)} badge-sm">{situation.priority}</span>
                  <span class="badge {getStatusColor(situation.status)} badge-sm">{situation.status}</span>
                </div>
                <p class="text-base-content/80 mb-3">{situation.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Type:</span>
                    <p class="font-medium">{situation.type}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Reported:</span>
                    <p class="font-medium">{situation.reportedTime}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Assigned to:</span>
                    <p class="font-medium">{situation.assignedTo}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Resolution Time:</span>
                    <p class="font-medium">{situation.estimatedResolution}</p>
                  </div>
                </div>
                {#if situation.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{situation.progress}%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value={situation.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-primary">Update</button>
                {#if situation.assignedTo !== "Pending Assignment"}
                  <button class="btn btn-sm btn-outline">Contact</button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- New Emergency Situation Modal -->
{#if showNewEmergencyForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Report Emergency Situation</h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Situation Title</span>
          </label>
          <input type="text" placeholder="e.g., Power outage in kitchen" class="input input-bordered" bind:value={newEmergency.title} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select class="select select-bordered" bind:value={newEmergency.type}>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="gas">Gas</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={newEmergency.priority}>
              <option value="critical">Critical</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea class="textarea textarea-bordered" placeholder="Describe the emergency situation..." bind:value={newEmergency.description}></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <input type="text" placeholder="e.g., Kitchen, Main Hall, Bedroom" class="input input-bordered" bind:value={newEmergency.location} />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" on:click={() => (showNewEmergencyForm = false)}>Cancel</button>
        <button class="btn btn-error" on:click={addEmergencySituation}>Report Emergency</button>
      </div>
    </div>
  </div>
{/if}
