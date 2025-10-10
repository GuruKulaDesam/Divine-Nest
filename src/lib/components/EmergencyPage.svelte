<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let emergencyAlerts = [];
  let emergencyContacts = [];
  let emergencyProcedures = [];
  let emergencySupplies = [];

  onMount(() => {
    // Emergency Alerts
    emergencyAlerts = [
      {
        id: 1,
        type: "medical",
        title: "Medical Emergency",
        description: "Paati needs immediate medical attention",
        priority: "critical",
        time: "2 minutes ago",
        status: "active"
      },
      {
        id: 2,
        type: "fire",
        title: "Fire Safety Check",
        description: "Monthly fire extinguisher inspection due",
        priority: "high",
        time: "1 hour ago",
        status: "pending"
      }
    ];

    // Emergency Contacts
    emergencyContacts = [
      { name: "Family Doctor", number: "+91-9876543210", type: "Medical" },
      { name: "Local Hospital", number: "108", type: "Emergency" },
      { name: "Police Station", number: "100", type: "Police" },
      { name: "Fire Brigade", number: "101", type: "Fire" }
    ];

    // Emergency Procedures
    emergencyProcedures = [
      {
        title: "Medical Emergency",
        steps: ["Call 108 immediately", "Provide location details", "Stay calm and assist if possible"]
      },
      {
        title: "Fire Emergency",
        steps: ["Evacuate all family members", "Call 101", "Use fire extinguisher if safe"]
      },
      {
        title: "Natural Disaster",
        steps: ["Move to higher ground", "Secure important documents", "Contact emergency services"]
      }
    ];

    // Emergency Supplies
    emergencySupplies = [
      { item: "First Aid Kit", status: "complete", expiry: "2025-12-31" },
      { item: "Fire Extinguisher", status: "needs_check", expiry: "2025-06-15" },
      { item: "Emergency Water", status: "low", expiry: "2025-08-20" },
      { item: "Flashlights", status: "complete", expiry: "2026-01-10" }
    ];
  });

  function getPriorityColor(priority) {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'complete': return 'text-green-600';
      case 'needs_check': return 'text-orange-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }
</script>

<svelte:head>
  <title>Emergency Management - South Indian Family Life App</title>
  <meta name="description" content="Emergency management and response system for family safety" />
</svelte:head>

<div class="max-w-7xl mx-auto p-6 space-y-6">
  <!-- Header -->
  <div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
    <div class="flex items-center gap-3 mb-4">
      <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8" />
      <h1 class="text-2xl font-bold">Emergency Management</h1>
    </div>
    <p class="text-red-100">Stay prepared and respond quickly to emergencies</p>
  </div>

  <!-- Emergency Alerts -->
  {#if emergencyAlerts.length > 0}
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="heroicons:bell-alert" class="w-6 h-6 text-red-600" />
        Active Emergency Alerts
      </h2>
      <div class="space-y-3">
        {#each emergencyAlerts as alert}
          <div class="border rounded-lg p-4 {getPriorityColor(alert.priority)}">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-semibold">{alert.title}</h3>
                <p class="text-sm mt-1">{alert.description}</p>
                <p class="text-xs mt-2 opacity-75">{alert.time}</p>
              </div>
              <div class="flex gap-2">
                <button class="px-3 py-1 bg-white rounded text-sm font-medium hover:bg-gray-50">
                  Respond
                </button>
                <button class="px-3 py-1 bg-white rounded text-sm font-medium hover:bg-gray-50">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Emergency Contacts -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="heroicons:phone" class="w-6 h-6 text-blue-600" />
        Emergency Contacts
      </h2>
      <div class="space-y-3">
        {#each emergencyContacts as contact}
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium">{contact.name}</p>
              <p class="text-sm text-gray-600">{contact.type}</p>
            </div>
            <a href="tel:{contact.number}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Icon icon="heroicons:phone" class="w-4 h-4 inline mr-1" />
              Call
            </a>
          </div>
        {/each}
      </div>
    </div>

    <!-- Emergency Procedures -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="heroicons:document-text" class="w-6 h-6 text-green-600" />
        Emergency Procedures
      </h2>
      <div class="space-y-4">
        {#each emergencyProcedures as procedure}
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-2">{procedure.title}</h3>
            <ol class="list-decimal list-inside space-y-1 text-sm text-gray-700">
              {#each procedure.steps as step}
                <li>{step}</li>
              {/each}
            </ol>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Emergency Supplies -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
      <Icon icon="heroicons:cube" class="w-6 h-6 text-purple-600" />
      Emergency Supplies Status
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each emergencySupplies as supply}
        <div class="border rounded-lg p-4 text-center">
          <div class="text-2xl mb-2">
            {#if supply.status === 'complete'}
              <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-600 mx-auto" />
            {:else if supply.status === 'needs_check'}
              <Icon icon="heroicons:exclamation-circle" class="w-8 h-8 text-orange-600 mx-auto" />
            {:else}
              <Icon icon="heroicons:x-circle" class="w-8 h-8 text-red-600 mx-auto" />
            {/if}
          </div>
          <h3 class="font-medium">{supply.item}</h3>
          <p class="text-sm {getStatusColor(supply.status)} capitalize">{supply.status.replace('_', ' ')}</p>
          <p class="text-xs text-gray-500 mt-1">Expires: {supply.expiry}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button class="p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
        <Icon icon="heroicons:plus" class="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p class="text-sm font-medium text-red-700">Add Alert</p>
      </button>
      <button class="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
        <Icon icon="heroicons:phone" class="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <p class="text-sm font-medium text-blue-700">Add Contact</p>
      </button>
      <button class="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
        <Icon icon="heroicons:document-text" class="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p class="text-sm font-medium text-green-700">Add Procedure</p>
      </button>
      <button class="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
        <Icon icon="heroicons:cube" class="w-8 h-8 text-purple-500 mx-auto mb-2" />
        <p class="text-sm font-medium text-purple-700">Update Supplies</p>
      </button>
    </div>
  </div>
</div>