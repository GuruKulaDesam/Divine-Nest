<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let repairRequests = [
    {
      id: 1,
      title: "Kitchen Tap Replacement",
      category: "Plumbing",
      priority: "medium",
      status: "in-progress",
      scheduledDate: "2025-10-08",
      assignedTo: "Kumar Plumbing Services",
      estimatedCost: "₹1,200",
      description: "Replace old kitchen tap with new mixer tap",
      location: "Kitchen",
      contact: "+91-98765-43210",
      progress: 60,
    },
    {
      id: 2,
      title: "Ceiling Fan Repair",
      category: "Electrical",
      priority: "low",
      status: "pending",
      scheduledDate: "2025-10-10",
      assignedTo: "Pending Assignment",
      estimatedCost: "₹800",
      description: "Fan making noise and running slow in bedroom",
      location: "Master Bedroom",
      contact: "",
      progress: 0,
    },
    {
      id: 3,
      title: "Door Lock Repair",
      category: "Hardware",
      priority: "high",
      status: "scheduled",
      scheduledDate: "2025-10-07",
      assignedTo: "SecureFix Services",
      estimatedCost: "₹1,500",
      description: "Main door lock is jammed, key not turning properly",
      location: "Main Entrance",
      contact: "+91-87654-32109",
      progress: 20,
    },
  ];

  let vendors = [
    { name: "Kumar Plumbing Services", category: "Plumbing", rating: 4.5, contact: "+91-98765-43210" },
    { name: "Raman Electricals", category: "Electrical", rating: 4.8, contact: "+91-87654-32109" },
    { name: "SecureFix Services", category: "Hardware", rating: 4.3, contact: "+91-76543-21098" },
    { name: "PaintPro Contractors", category: "Painting", rating: 4.6, contact: "+91-65432-10987" },
  ];

  let activeTab = "overview";
  let showNewRepairForm = false;

  let newRepair = {
    title: "",
    category: "plumbing",
    priority: "medium",
    description: "",
    location: "",
    estimatedCost: "",
    preferredDate: "",
  };

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-50";
      case "scheduled":
        return "text-blue-600 bg-blue-50";
      case "in-progress":
        return "text-purple-600 bg-purple-50";
      case "completed":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  function getCategoryIcon(category) {
    switch (category) {
      case "Plumbing":
        return "heroicons:wrench-screwdriver";
      case "Electrical":
        return "heroicons:bolt";
      case "Hardware":
        return "heroicons:cog-6-tooth";
      case "Painting":
        return "heroicons:paint-brush";
      default:
        return "heroicons:wrench";
    }
  }

  function addRepairRequest() {
    const newId = repairRequests.length + 1;
    repairRequests = [
      ...repairRequests,
      {
        id: newId,
        ...newRepair,
        status: "pending",
        assignedTo: "Pending Assignment",
        contact: "",
        progress: 0,
      },
    ];

    // Reset form
    newRepair = {
      title: "",
      category: "plumbing",
      priority: "medium",
      description: "",
      location: "",
      estimatedCost: "",
      preferredDate: "",
    };

    showNewRepairForm = false;
  }

  function callVendor(contact) {
    window.open(`tel:${contact}`);
  }

  $: stats = {
    total: repairRequests.length,
    pending: repairRequests.filter((r) => r.status === "pending").length,
    scheduled: repairRequests.filter((r) => r.status === "scheduled").length,
    inProgress: repairRequests.filter((r) => r.status === "in-progress").length,
    completed: repairRequests.filter((r) => r.status === "completed").length,
  };
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">🔧 Repairs</h1>
        <p class="text-base-content/60">Track and manage household repair tasks and maintenance requests</p>
      </div>
      <button class="btn btn-primary" on:click={() => (showNewRepairForm = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        Request Repair
      </button>
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Total Repairs</p>
            <p class="text-2xl font-bold text-blue-500">{stats.total}</p>
          </div>
          <Icon icon="heroicons:wrench-screwdriver" class="w-8 h-8 text-blue-500" />
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
            <p class="text-sm text-base-content/60">Scheduled</p>
            <p class="text-2xl font-bold text-blue-500">{stats.scheduled}</p>
          </div>
          <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-blue-500" />
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
          <Icon icon="heroicons:cog-6-tooth" class="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Completed</p>
            <p class="text-2xl font-bold text-green-500">{stats.completed}</p>
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
    <button class="tab {activeTab === 'repairs' ? 'tab-active' : ''}" on:click={() => (activeTab = "repairs")}>
      <Icon icon="heroicons:wrench-screwdriver" class="w-4 h-4 mr-2" />
      All Repairs
    </button>
    <button class="tab {activeTab === 'vendors' ? 'tab-active' : ''}" on:click={() => (activeTab = "vendors")}>
      <Icon icon="heroicons:users" class="w-4 h-4 mr-2" />
      Vendors
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Urgent Repairs -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Urgent Repairs</h3>
          <div class="space-y-3">
            {#each repairRequests.filter((r) => r.priority === "high" || r.status === "in-progress") as repair}
              <div class="p-3 bg-base-200 rounded-lg border-l-4 {getPriorityColor(repair.priority)}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="font-medium text-base-content">{repair.title}</p>
                    <p class="text-sm text-base-content/60">{repair.location} • {repair.category}</p>
                    <div class="flex items-center space-x-2 mt-2">
                      <span class="text-xs badge {getStatusColor(repair.status)}">{repair.status}</span>
                      <span class="text-xs text-base-content/60">{repair.estimatedCost}</span>
                    </div>
                  </div>
                  <Icon icon={getCategoryIcon(repair.category)} class="w-5 h-5 text-base-content/40" />
                </div>
                {#if repair.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{repair.progress}%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value={repair.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Scheduled This Week -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Scheduled This Week</h3>
          <div class="space-y-3">
            {#each repairRequests.filter((r) => r.status === "scheduled") as repair}
              <div class="p-3 bg-base-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-base-content">{repair.title}</p>
                    <p class="text-sm text-base-content/60">{repair.scheduledDate} • {repair.assignedTo}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    {#if repair.contact}
                      <button class="btn btn-xs btn-primary" on:click={() => callVendor(repair.contact)}>
                        <Icon icon="heroicons:phone" class="w-3 h-3" />
                      </button>
                    {/if}
                    <Icon icon={getCategoryIcon(repair.category)} class="w-5 h-5 text-base-content/40" />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "repairs"}
    <div class="space-y-4">
      {#each repairRequests as repair}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <Icon icon={getCategoryIcon(repair.category)} class="w-6 h-6 text-primary" />
                  <h4 class="font-bold text-base-content">{repair.title}</h4>
                  <span class="badge {getPriorityColor(repair.priority)} badge-sm">{repair.priority}</span>
                  <span class="badge {getStatusColor(repair.status)} badge-sm">{repair.status}</span>
                </div>
                <p class="text-base-content/80 mb-3">{repair.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Location:</span>
                    <p class="font-medium">{repair.location}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Scheduled:</span>
                    <p class="font-medium">{repair.scheduledDate}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Assigned to:</span>
                    <p class="font-medium">{repair.assignedTo}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Cost:</span>
                    <p class="font-medium">{repair.estimatedCost}</p>
                  </div>
                </div>
                {#if repair.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{repair.progress}%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value={repair.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-primary">Update</button>
                {#if repair.contact}
                  <button class="btn btn-sm btn-outline" on:click={() => callVendor(repair.contact)}>Contact</button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "vendors"}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each vendors as vendor}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-base-content">{vendor.name}</h4>
              <div class="rating rating-sm">
                <span class="text-sm font-medium">{vendor.rating}</span>
                <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500 ml-1" />
              </div>
            </div>
            <p class="text-sm text-base-content/60 mb-3">{vendor.category} Services</p>
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

<!-- New Repair Request Modal -->
{#if showNewRepairForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Request New Repair</h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Repair Title</span>
          </label>
          <input type="text" placeholder="e.g., Kitchen tap repair" class="input input-bordered" bind:value={newRepair.title} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={newRepair.category}>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hardware">Hardware</option>
              <option value="painting">Painting</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={newRepair.priority}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea class="textarea textarea-bordered" placeholder="Describe the repair needed..." bind:value={newRepair.description}></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input type="text" placeholder="e.g., Kitchen, Bedroom" class="input input-bordered" bind:value={newRepair.location} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Cost</span>
            </label>
            <input type="text" placeholder="e.g., ₹1,500" class="input input-bordered" bind:value={newRepair.estimatedCost} />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Preferred Date</span>
          </label>
          <input type="date" class="input input-bordered" bind:value={newRepair.preferredDate} />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" on:click={() => (showNewRepairForm = false)}>Cancel</button>
        <button class="btn btn-primary" on:click={addRepairRequest}>Submit Request</button>
      </div>
    </div>
  </div>
{/if}
