<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let emergencyContacts = [
    { name: "Police", number: "100", type: "Government", available: "24/7" },
    { name: "Fire Brigade", number: "101", type: "Government", available: "24/7" },
    { name: "Ambulance", number: "108", type: "Medical", available: "24/7" },
    { name: "Dr. Rajesh Kumar", number: "+91-98765-43210", type: "Family Doctor", available: "9 AM - 9 PM" },
    { name: "Apollo Hospital", number: "+91-44-2829-3333", type: "Hospital", available: "24/7" },
    { name: "Electricity Board", number: "1912", type: "Utility", available: "24/7" },
    { name: "Gas Cylinder Emergency", number: "1906", type: "Utility", available: "24/7" },
    { name: "Water Board", number: "+91-44-2858-5858", type: "Utility", available: "24/7" },
  ];

  let emergencyRequests = [
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
    },
  ];

  let activeTab = "overview";

  function getPriorityColor(priority) {
    switch (priority) {
      case "urgent": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-green-600 bg-green-50 border-green-200";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "pending": return "text-orange-600 bg-orange-50";
      case "in-progress": return "text-blue-600 bg-blue-50";
      case "completed": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  }

  function reportEmergency() {
    console.log("Reporting new emergency...");
  }

  function callNumber(number) {
    window.open(`tel:${number}`);
  }
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content mb-2">íº¨ Emergency</h1>
        <p class="text-base-content/60">Quick access to emergency contacts and urgent issue management</p>
      </div>
      <button class="btn btn-error btn-lg" on:click={reportEmergency}>
        <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 mr-2" />
        Report Emergency
      </button>
    </div>
  </div>

  <!-- Emergency Alert Banner -->
  {#if emergencyRequests.filter(req => req.status !== 'completed').length > 0}
    <div class="alert alert-error mb-6">
      <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6" />
      <div>
        <h3 class="font-bold">Active Emergency Issues</h3>
        <div class="text-sm">
          {emergencyRequests.filter(req => req.status !== 'completed').length} urgent issues require immediate attention
        </div>
      </div>
    </div>
  {/if}

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Active Emergencies</p>
            <p class="text-2xl font-bold text-red-500">{emergencyRequests.filter(req => req.status !== 'completed').length}</p>
          </div>
          <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Emergency Contacts</p>
            <p class="text-2xl font-bold text-blue-500">{emergencyContacts.length}</p>
          </div>
          <Icon icon="heroicons:phone" class="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">Response Time</p>
            <p class="text-2xl font-bold text-green-500">Under 30 min</p>
          </div>
          <Icon icon="heroicons:clock" class="w-8 h-8 text-green-500" />
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-base-content/60">This Month</p>
            <p class="text-2xl font-bold text-purple-500">3</p>
          </div>
          <Icon icon="heroicons:chart-bar" class="w-8 h-8 text-purple-500" />
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
    <button class="tab {activeTab === 'contacts' ? 'tab-active' : ''}" on:click={() => (activeTab = "contacts")}>
      <Icon icon="heroicons:phone" class="w-4 h-4 mr-2" />
      Emergency Contacts
    </button>
    <button class="tab {activeTab === 'active' ? 'tab-active' : ''}" on:click={() => (activeTab = "active")}>
      <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 mr-2" />
      Active Issues
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Quick Emergency Contacts -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Quick Emergency Contacts</h3>
          <div class="space-y-3">
            {#each emergencyContacts.slice(0, 4) as contact}
              <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div>
                  <p class="font-medium text-base-content">{contact.name}</p>
                  <p class="text-sm text-base-content/60">{contact.type} â€¢ {contact.available}</p>
                </div>
                <button class="btn btn-sm btn-primary" on:click={() => callNumber(contact.number)}>
                  <Icon icon="heroicons:phone" class="w-4 h-4 mr-1" />
                  {contact.number}
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Recent Emergency Issues -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">Recent Emergency Issues</h3>
          <div class="space-y-3">
            {#each emergencyRequests as request}
              <div class="p-3 bg-base-200 rounded-lg border-l-4 {getPriorityColor(request.priority)}">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-medium text-base-content">{request.title}</p>
                    <p class="text-sm text-base-content/60">{request.description}</p>
                    <div class="flex items-center space-x-4 mt-2">
                      <span class="text-xs badge {getStatusColor(request.status)}">{request.status}</span>
                      <span class="text-xs text-base-content/60">ETA: {request.estimatedResolution}</span>
                    </div>
                  </div>
                  <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 text-red-500" />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "contacts"}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each emergencyContacts as contact}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-base-content">{contact.name}</h4>
              <span class="badge badge-outline">{contact.type}</span>
            </div>
            <p class="text-sm text-base-content/60 mb-3">Available: {contact.available}</p>
            <button class="btn btn-primary btn-sm w-full" on:click={() => callNumber(contact.number)}>
              <Icon icon="heroicons:phone" class="w-4 h-4 mr-2" />
              Call {contact.number}
            </button>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "active"}
    <div class="space-y-4">
      {#each emergencyRequests as request}
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h4 class="font-bold text-base-content">{request.title}</h4>
                  <span class="badge {getPriorityColor(request.priority)} badge-sm">{request.priority}</span>
                  <span class="badge {getStatusColor(request.status)} badge-sm">{request.status}</span>
                </div>
                <p class="text-base-content/80 mb-3">{request.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/60">Reported:</span>
                    <p class="font-medium">{request.reportedTime}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">Assigned to:</span>
                    <p class="font-medium">{request.assignedTo}</p>
                  </div>
                  <div>
                    <span class="text-base-content/60">ETA:</span>
                    <p class="font-medium">{request.estimatedResolution}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-2 ml-4">
                <button class="btn btn-sm btn-primary">Update</button>
                <button class="btn btn-sm btn-outline">Contact</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
