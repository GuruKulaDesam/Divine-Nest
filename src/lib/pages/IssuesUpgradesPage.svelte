<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let upgradeRequests = [
    {
      id: 1,
      title: "Smart Home Security System",
      category: "Security",
      priority: "high",
      status: "in-progress",
      scheduledDate: "2025-10-15",
      assignedTo: "SecureTech Solutions",
      estimatedCost: "₹25,000",
      description: "Install smart cameras, door sensors, and alarm system",
      location: "Entire Home",
      contact: "+91-98765-43210",
      progress: 30,
    },
    {
      id: 2,
      title: "Solar Panel Installation",
      category: "Energy",
      priority: "medium",
      status: "pending",
      scheduledDate: "2025-11-01",
      assignedTo: "Pending Assignment",
      estimatedCost: "₹1,50,000",
      description: "Install 5kW solar panel system with battery backup",
      location: "Roof",
      contact: "",
      progress: 0,
    },
    {
      id: 3,
      title: "Kitchen Appliance Upgrade",
      category: "Appliances",
      priority: "medium",
      status: "scheduled",
      scheduledDate: "2025-10-20",
      assignedTo: "HomeStyle Appliances",
      estimatedCost: "₹45,000",
      description: "Replace old refrigerator and microwave with smart appliances",
      location: "Kitchen",
      contact: "+91-87654-32109",
      progress: 10,
    },
  ];

  let vendors = [
    { name: "SecureTech Solutions", category: "Security", rating: 4.7, contact: "+91-98765-43210" },
    { name: "GreenEnergy Systems", category: "Energy", rating: 4.9, contact: "+91-87654-32109" },
    { name: "HomeStyle Appliances", category: "Appliances", rating: 4.5, contact: "+91-76543-21098" },
    { name: "SmartHome Pros", category: "Automation", rating: 4.6, contact: "+91-65432-10987" },
  ];

  let activeTab = "overview";
  let showNewUpgradeForm = false;

  let newUpgrade = {
    title: "",
    category: "security",
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
      case "Security":
        return "heroicons:shield-check";
      case "Energy":
        return "heroicons:battery-100";
      case "Appliances":
        return "heroicons:home-modern";
      case "Automation":
        return "heroicons:cog-6-tooth";
      default:
        return "heroicons:arrow-trending-up";
    }
  }

  function addUpgradeRequest() {
    const newId = upgradeRequests.length + 1;
    upgradeRequests = [
      ...upgradeRequests,
      {
        id: newId,
        ...newUpgrade,
        status: "pending",
        assignedTo: "Pending Assignment",
        contact: "",
        progress: 0,
      },
    ];

    // Reset form
    newUpgrade = {
      title: "",
      category: "security",
      priority: "medium",
      description: "",
      location: "",
      estimatedCost: "",
      preferredDate: "",
    };

    showNewUpgradeForm = false;
  }

  function callVendor(contact) {
    window.open(`tel:${contact}`);
  }

  $: stats = {
    total: upgradeRequests.length,
    pending: upgradeRequests.filter((r) => r.status === "pending").length,
    scheduled: upgradeRequests.filter((r) => r.status === "scheduled").length,
    inProgress: upgradeRequests.filter((r) => r.status === "in-progress").length,
    completed: upgradeRequests.filter((r) => r.status === "completed").length,
  };
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">⬆️ Upgrades</h1>
        <p class="text-base-content/60">Plan and track home improvement and upgrade projects</p>
      </div>
      <button class="btn btn-primary" on:click={() => (showNewUpgradeForm = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        Request Upgrade
      </button>
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Total Upgrades</p>
            <p class="text-2xl font-bold text-blue-500">{stats.total}</p>
          </div>
          <Icon icon="heroicons:arrow-trending-up" class="w-8 h-8 text-blue-500" />
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
    <button class="tab {activeTab === 'upgrades' ? 'tab-active' : ''}" on:click={() => (activeTab = "upgrades")}>
      <Icon icon="heroicons:arrow-trending-up" class="w-4 h-4 mr-2" />
      All Upgrades
    </button>
    <button class="tab {activeTab === 'vendors' ? 'tab-active' : ''}" on:click={() => (activeTab = "vendors")}>
      <Icon icon="heroicons:users" class="w-4 h-4 mr-2" />
      Vendors
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- High Priority Upgrades -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">High Priority Upgrades</h3>
          <div class="space-y-3">
            {#each upgradeRequests.filter((r) => r.priority === "high" || r.status === "in-progress") as upgrade}
              <div class="p-3 bg-base-200 rounded-lg border-l-4 {getPriorityColor(upgrade.priority)}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="font-medium text-base-content">{upgrade.title}</p>
                    <p class="text-sm text-base-content/60">{upgrade.location} • {upgrade.category}</p>
                    <div class="flex items-center space-x-2 mt-2">
                      <span class="text-xs badge {getStatusColor(upgrade.status)}">{upgrade.status}</span>
                      <span class="text-xs text-base-content/60">{upgrade.estimatedCost}</span>
                    </div>
                  </div>
                  <Icon icon={getCategoryIcon(upgrade.category)} class="w-5 h-5 text-base-content/40" />
                </div>
                {#if upgrade.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{upgrade.progress}%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value={upgrade.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Upcoming Upgrades -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Upcoming Upgrades</h3>
          <div class="space-y-3">
            {#each upgradeRequests.filter((r) => r.status === "scheduled") as upgrade}
              <div class="p-3 bg-base-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-base-content">{upgrade.title}</p>
                    <p class="text-sm text-base-content/60">{upgrade.scheduledDate} • {upgrade.assignedTo}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    {#if upgrade.contact}
                      <button class="btn btn-xs btn-primary" on:click={() => callVendor(upgrade.contact)}>
                        <Icon icon="heroicons:phone" class="w-3 h-3" />
                      </button>
                    {/if}
                    <Icon icon={getCategoryIcon(upgrade.category)} class="w-5 h-5 text-base-content/40" />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "upgrades"}
    <div class="space-y-4">
      {#each upgradeRequests as upgrade}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <Icon icon={getCategoryIcon(upgrade.category)} class="w-6 h-6 text-primary" />
                  <h4 class="font-bold text-base-content">{upgrade.title}</h4>
                  <span class="badge {getPriorityColor(upgrade.priority)} badge-sm">{upgrade.priority}</span>
                  <span class="badge {getStatusColor(upgrade.status)} badge-sm">{upgrade.status}</span>
                </div>
                <p class="text-base-content/80 mb-3">{upgrade.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Location:</span>
                    <p class="font-medium">{upgrade.location}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Scheduled:</span>
                    <p class="font-medium">{upgrade.scheduledDate}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Assigned to:</span>
                    <p class="font-medium">{upgrade.assignedTo}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Cost:</span>
                    <p class="font-medium">{upgrade.estimatedCost}</p>
                  </div>
                </div>
                {#if upgrade.progress > 0}
                  <div class="mt-3">
                    <div class="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{upgrade.progress}%</span>
                    </div>
                    <progress class="progress progress-primary w-full" value={upgrade.progress} max="100"></progress>
                  </div>
                {/if}
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-primary">Update</button>
                {#if upgrade.contact}
                  <button class="btn btn-sm btn-outline" on:click={() => callVendor(upgrade.contact)}>Contact</button>
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

<!-- New Upgrade Request Modal -->
{#if showNewUpgradeForm}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">Request New Upgrade</h3>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Upgrade Title</span>
          </label>
          <input type="text" placeholder="e.g., Smart home security system" class="input input-bordered" bind:value={newUpgrade.title} />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={newUpgrade.category}>
              <option value="security">Security</option>
              <option value="energy">Energy</option>
              <option value="appliances">Appliances</option>
              <option value="automation">Automation</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={newUpgrade.priority}>
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
          <textarea class="textarea textarea-bordered" placeholder="Describe the upgrade needed..." bind:value={newUpgrade.description}></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input type="text" placeholder="e.g., Kitchen, Entire Home" class="input input-bordered" bind:value={newUpgrade.location} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Cost</span>
            </label>
            <input type="text" placeholder="e.g., ₹25,000" class="input input-bordered" bind:value={newUpgrade.estimatedCost} />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Preferred Date</span>
          </label>
          <input type="date" class="input input-bordered" bind:value={newUpgrade.preferredDate} />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" on:click={() => (showNewUpgradeForm = false)}>Cancel</button>
        <button class="btn btn-primary" on:click={addUpgradeRequest}>Submit Request</button>
      </div>
    </div>
  </div>
{/if}
