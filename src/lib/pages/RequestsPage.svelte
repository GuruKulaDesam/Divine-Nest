<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { requestsDB } from "../data/requests.js";

  // State management
  let activeTab = "dashboard";
  let requests = [];
  let metrics = {
    total: 0,
    emergency: 0,
    inProgress: 0,
    completed: 0,
    avgResolutionTime: 0,
    monthlySpend: 0,
  };

  // Form data for new requests
  let newRequest = {
    title: "",
    type: "maintenance", // emergency, repairs, maintenance, upgrades
    priority: "medium", // low, medium, high, urgent
    description: "",
    location: "",
    estimatedCost: "",
    preferredDate: "",
    contactPerson: "",
    phone: "",
    notes: "",
    photos: [],
    status: "pending",
  };

  // Filters and search
  let filterType = "all";
  let filterStatus = "all";
  let searchTerm = "";
  let showNewRequestForm = false;

  // KPI calculation
  function calculateMetrics() {
    metrics.total = requests.length;
    metrics.emergency = requests.filter((r) => r.priority === "urgent").length;
    metrics.inProgress = requests.filter((r) => r.status === "in-progress").length;
    metrics.completed = requests.filter((r) => r.status === "completed").length;

    // Calculate average resolution time (in days)
    const completedRequests = requests.filter((r) => r.status === "completed");
    if (completedRequests.length > 0) {
      const totalDays = completedRequests.reduce((sum, req) => {
        const created = new Date(req.dateCreated);
        const completed = new Date(req.dateCompleted);
        return sum + Math.ceil((completed - created) / (1000 * 60 * 60 * 24));
      }, 0);
      metrics.avgResolutionTime = Math.round(totalDays / completedRequests.length);
    }

    // Calculate monthly spend
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    metrics.monthlySpend = requests
      .filter((r) => {
        const reqDate = new Date(r.dateCreated);
        return reqDate.getMonth() === currentMonth && reqDate.getFullYear() === currentYear;
      })
      .reduce((sum, req) => sum + (parseFloat(req.actualCost) || 0), 0);
  }

  // Filter requests based on search and filters
  $: filteredRequests = requests.filter((request) => {
    const matchesSearch = searchTerm === "" || request.title.toLowerCase().includes(searchTerm.toLowerCase()) || request.description.toLowerCase().includes(searchTerm.toLowerCase()) || request.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || request.type === filterType;
    const matchesStatus = filterStatus === "all" || request.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Load data on mount
  onMount(async () => {
    try {
      requests = await requestsDB.getAll();
      calculateMetrics();
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  });

  // Create new request
  async function createRequest() {
    try {
      const request = {
        ...newRequest,
        id: Date.now().toString(),
        dateCreated: new Date().toISOString(),
        status: "pending",
      };

      await requestsDB.add(request);
      requests = [...requests, request];
      calculateMetrics();

      // Reset form
      newRequest = {
        title: "",
        type: "maintenance",
        priority: "medium",
        description: "",
        location: "",
        estimatedCost: "",
        preferredDate: "",
        contactPerson: "",
        phone: "",
        notes: "",
        photos: [],
        status: "pending",
      };
      showNewRequestForm = false;
    } catch (error) {
      console.error("Error creating request:", error);
    }
  }

  // Update request status
  async function updateRequestStatus(requestId, newStatus) {
    try {
      const request = requests.find((r) => r.id === requestId);
      if (request) {
        request.status = newStatus;
        if (newStatus === "completed") {
          request.dateCompleted = new Date().toISOString();
        }
        await requestsDB.update(requestId, request);
        requests = [...requests];
        calculateMetrics();
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  }

  // Get priority color
  function getPriorityColor(priority) {
    switch (priority) {
      case "urgent":
        return "text-red-500 bg-red-50 border-red-200";
      case "high":
        return "text-orange-500 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-500 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-500 bg-green-50 border-green-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  }

  // Get status color
  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  // Get type icon
  function getTypeIcon(type) {
    switch (type) {
      case "emergency":
        return "heroicons:exclamation-triangle";
      case "repairs":
        return "heroicons:wrench";
      case "maintenance":
        return "heroicons:cog-6-tooth";
      case "upgrades":
        return "heroicons:arrow-trending-up";
      default:
        return "heroicons:wrench-screwdriver";
    }
  }
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">Home Service Requests</h1>
        <p class="text-base-content/60">Manage emergency repairs, maintenance, and home upgrades</p>
      </div>
      <button class="btn btn-primary" on:click={() => (showNewRequestForm = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        New Request
      </button>
    </div>
  </div>

  <!-- KPI Metrics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Total Requests</p>
            <p class="text-2xl font-bold text-primary">{metrics.total}</p>
          </div>
          <Icon icon="heroicons:clipboard-document-list" class="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Emergency</p>
            <p class="text-2xl font-bold text-error">{metrics.emergency}</p>
          </div>
          <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-error" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">In Progress</p>
            <p class="text-2xl font-bold text-info">{metrics.inProgress}</p>
          </div>
          <Icon icon="heroicons:clock" class="w-8 h-8 text-info" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Completed</p>
            <p class="text-2xl font-bold text-success">{metrics.completed}</p>
          </div>
          <Icon icon="heroicons:check-circle" class="w-8 h-8 text-success" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Avg Resolution</p>
            <p class="text-2xl font-bold text-warning">{metrics.avgResolutionTime}</p>
            <p class="text-xs text-base-content/60">days</p>
          </div>
          <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-warning" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Monthly Spend</p>
            <p class="text-2xl font-bold text-secondary">${metrics.monthlySpend.toFixed(0)}</p>
          </div>
          <Icon icon="heroicons:currency-dollar" class="w-8 h-8 text-secondary" />
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs Navigation -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'dashboard' ? 'tab-active' : ''}" on:click={() => (activeTab = "dashboard")}>
      <Icon icon="heroicons:chart-bar" class="w-4 h-4 mr-2" />
      Dashboard
    </button>
    <button class="tab {activeTab === 'requests' ? 'tab-active' : ''}" on:click={() => (activeTab = "requests")}>
      <Icon icon="heroicons:list-bullet" class="w-4 h-4 mr-2" />
      All Requests
    </button>
    <button class="tab {activeTab === 'emergency' ? 'tab-active' : ''}" on:click={() => (activeTab = "emergency")}>
      <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 mr-2" />
      Emergency
    </button>
    <button class="tab {activeTab === 'maintenance' ? 'tab-active' : ''}" on:click={() => (activeTab = "maintenance")}>
      <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4 mr-2" />
      Maintenance
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "dashboard"}
    <!-- Dashboard View -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Requests -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Recent Requests</h3>
          <div class="space-y-3">
            {#each requests.slice(0, 5) as request}
              <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <Icon icon={getTypeIcon(request.type)} class="w-5 h-5 text-primary" />
                  <div>
                    <p class="font-medium text-base-content">{request.title}</p>
                    <p class="text-sm text-base-content/60">{request.location}</p>
                  </div>
                </div>
                <span class="badge {getStatusColor(request.status)}">{request.status}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Priority Breakdown -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Priority Breakdown</h3>
          <div class="space-y-3">
            {#each ["urgent", "high", "medium", "low"] as priority}
              {@const count = requests.filter((r) => r.priority === priority).length}
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full {priority === 'urgent' ? 'bg-red-500' : priority === 'high' ? 'bg-orange-500' : priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}"></div>
                  <span class="capitalize text-base-content">{priority}</span>
                </div>
                <span class="font-semibold text-base-content">{count}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "requests"}
    <!-- All Requests View -->
    <div class="space-y-6">
      <!-- Search and Filters -->
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-64">
          <input type="text" placeholder="Search requests..." class="input input-bordered w-full" bind:value={searchTerm} />
        </div>
        <select class="select select-bordered" bind:value={filterType}>
          <option value="all">All Types</option>
          <option value="emergency">Emergency</option>
          <option value="repairs">Repairs</option>
          <option value="maintenance">Maintenance</option>
          <option value="upgrades">Upgrades</option>
        </select>
        <select class="select select-bordered" bind:value={filterStatus}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Requests Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredRequests as request}
          <div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
            <div class="card-body">
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-2">
                  <Icon icon={getTypeIcon(request.type)} class="w-5 h-5 text-primary" />
                  <span class="badge badge-outline capitalize">{request.type}</span>
                </div>
                <span class="badge {getPriorityColor(request.priority)} border capitalize">{request.priority}</span>
              </div>

              <h3 class="card-title text-base-content mt-2">{request.title}</h3>
              <p class="text-sm text-base-content/60 mb-2">{request.description}</p>

              <div class="space-y-1 text-sm">
                <div class="flex items-center space-x-2">
                  <Icon icon="heroicons:map-pin" class="w-4 h-4 text-base-content/60" />
                  <span class="text-base-content/60">{request.location}</span>
                </div>
                {#if request.estimatedCost}
                  <div class="flex items-center space-x-2">
                    <Icon icon="heroicons:currency-dollar" class="w-4 h-4 text-base-content/60" />
                    <span class="text-base-content/60">Est. ${request.estimatedCost}</span>
                  </div>
                {/if}
              </div>

              <div class="card-actions justify-between items-center mt-4">
                <span class="badge {getStatusColor(request.status)} capitalize">{request.status}</span>
                <div class="flex space-x-1">
                  {#if request.status === "pending"}
                    <button class="btn btn-sm btn-primary" on:click={() => updateRequestStatus(request.id, "in-progress")}> Start </button>
                  {:else if request.status === "in-progress"}
                    <button class="btn btn-sm btn-success" on:click={() => updateRequestStatus(request.id, "completed")}> Complete </button>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if activeTab === "emergency"}
    <!-- Emergency Requests -->
    <div class="space-y-4">
      {#each requests.filter((r) => r.priority === "urgent") as request}
        <div class="card bg-error/5 border border-error/20 shadow-sm">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-error" />
                <div>
                  <h3 class="font-bold text-error">{request.title}</h3>
                  <p class="text-sm text-base-content/60">{request.description}</p>
                </div>
              </div>
              <span class="badge {getStatusColor(request.status)} capitalize">{request.status}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "maintenance"}
    <!-- Maintenance Schedule -->
    <div class="space-y-4">
      {#each requests.filter((r) => r.type === "maintenance") as request}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:cog-6-tooth" class="w-6 h-6 text-primary" />
                <div>
                  <h3 class="font-bold text-base-content">{request.title}</h3>
                  <p class="text-sm text-base-content/60">{request.description}</p>
                </div>
              </div>
              <span class="badge {getStatusColor(request.status)} capitalize">{request.status}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- New Request Modal -->
{#if showNewRequestForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-3xl">
      <h3 class="font-bold text-lg mb-4">New Service Request</h3>

      <form on:submit|preventDefault={createRequest}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Title</span>
            </label>
            <input type="text" placeholder="Request title" class="input input-bordered" bind:value={newRequest.title} required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select class="select select-bordered" bind:value={newRequest.type}>
              <option value="emergency">Emergency</option>
              <option value="repairs">Repairs</option>
              <option value="maintenance">Maintenance</option>
              <option value="upgrades">Upgrades</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={newRequest.priority}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input type="text" placeholder="Room/Area" class="input input-bordered" bind:value={newRequest.location} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Cost</span>
            </label>
            <input type="number" placeholder="0" class="input input-bordered" bind:value={newRequest.estimatedCost} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Preferred Date</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={newRequest.preferredDate} />
          </div>
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea class="textarea textarea-bordered h-24" placeholder="Describe the issue or request..." bind:value={newRequest.description} required></textarea>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={() => (showNewRequestForm = false)}>Cancel</button>
          <button type="submit" class="btn btn-primary">Create Request</button>
        </div>
      </form>
    </div>
  </div>
{/if}
