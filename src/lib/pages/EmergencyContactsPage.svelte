<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let emergencyContacts = [
    // Government Emergency Services
    { name: "Police Control Room", number: "100", type: "Government", available: "24/7", location: "Coimbatore" },
    { name: "Fire Brigade", number: "101", type: "Government", available: "24/7", location: "Coimbatore" },
    { name: "Ambulance", number: "108", type: "Medical", available: "24/7", location: "Coimbatore" },
    { name: "Women Helpline", number: "1091", type: "Government", available: "24/7", location: "Coimbatore" },
    { name: "Child Helpline", number: "1098", type: "Government", available: "24/7", location: "Coimbatore" },

    // Local Hospitals - Kovaipudur/Coimbatore
    { name: "Ganga Hospital", number: "+91-422-2485000", type: "Hospital", available: "24/7", location: "Coimbatore" },
    { name: "PSG Hospitals", number: "+91-422-2570170", type: "Hospital", available: "24/7", location: "Coimbatore" },
    { name: "KMCH Hospital", number: "+91-422-4323802", type: "Hospital", available: "24/7", location: "Coimbatore" },
    { name: "Sri Ramakrishna Hospital", number: "+91-422-2563010", type: "Hospital", available: "24/7", location: "Coimbatore" },
    { name: "Kongunad Hospital", number: "+91-422-2314888", type: "Hospital", available: "24/7", location: "Coimbatore" },

    // Local Police Stations - Kovaipudur Area
    { name: "Kovaipudur Police Station", number: "100", type: "Police", available: "24/7", location: "Kovaipudur" },
    { name: "Peelamedu Police Station", number: "100", type: "Police", available: "24/7", location: "Peelamedu" },
    { name: "Saibaba Colony Police Station", number: "100", type: "Police", available: "24/7", location: "Saibaba Colony" },

    // Fire Stations - Local
    { name: "Coimbatore Fire Station", number: "101", type: "Fire", available: "24/7", location: "Coimbatore" },
    { name: "Peelamedu Fire Station", number: "101", type: "Fire", available: "24/7", location: "Peelamedu" },

    // Utility Services
    { name: "TNEB Electricity", number: "1912", type: "Utility", available: "24/7", location: "Coimbatore" },
    { name: "TNEB Emergency", number: "+91-422-2336801", type: "Utility", available: "24/7", location: "Coimbatore" },
    { name: "Water Board", number: "+91-422-2302800", type: "Utility", available: "24/7", location: "Coimbatore" },
    { name: "Gas Emergency", number: "1906", type: "Utility", available: "24/7", location: "Coimbatore" },

    // Local Emergency Services
    { name: "Coimbatore Medical College", number: "+91-422-2301393", type: "Medical", available: "24/7", location: "Coimbatore" },
    { name: "Blood Bank - KMCH", number: "+91-422-2212121", type: "Medical", available: "24/7", location: "Coimbatore" },
    { name: "Poison Control", number: "+91-422-2301393", type: "Medical", available: "24/7", location: "Coimbatore" },

    // Transport Emergency
    { name: "Road Accident Emergency", number: "1073", type: "Transport", available: "24/7", location: "Coimbatore" },
    { name: "Railway Emergency", number: "139", type: "Transport", available: "24/7", location: "Coimbatore" },
  ];

  let searchQuery = "";
  let selectedType = "all";

  const contactTypes = ["all", "Government", "Hospital", "Police", "Fire", "Medical", "Utility", "Transport"];

  $: filteredContacts = emergencyContacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.number.includes(searchQuery) || contact.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || contact.type === selectedType;
    return matchesSearch && matchesType;
  });

  function getTypeIcon(type) {
    const icons = {
      Government: "heroicons:shield-check",
      Hospital: "heroicons:building-office",
      Police: "heroicons:shield-exclamation",
      Fire: "heroicons:fire",
      Medical: "heroicons:heart",
      Utility: "heroicons:wrench-screwdriver",
      Transport: "heroicons:truck",
    };
    return icons[type] || "heroicons:phone";
  }

  function getTypeColor(type) {
    const colors = {
      Government: "text-blue-600 bg-blue-50 border-blue-200",
      Hospital: "text-red-600 bg-red-50 border-red-200",
      Police: "text-blue-700 bg-blue-50 border-blue-300",
      Fire: "text-orange-600 bg-orange-50 border-orange-200",
      Medical: "text-green-600 bg-green-50 border-green-200",
      Utility: "text-purple-600 bg-purple-50 border-purple-200",
      Transport: "text-indigo-600 bg-indigo-50 border-indigo-200",
    };
    return colors[type] || "text-gray-600 bg-gray-50 border-gray-200";
  }

  function callNumber(number) {
    window.open(`tel:${number}`, "_self");
  }

  onMount(() => {
    document.title = "Emergency Contacts - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white">
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Emergency Contacts</h1>
            <p class="text-gray-600 dark:text-gray-300">Kovaipudur & Coimbatore Emergency Services</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500 dark:text-gray-400">Location: Kovaipudur, Coimbatore</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Emergency Contacts</label>
        <input type="text" bind:value={searchQuery} placeholder="Search by name, number, or location..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type</label>
        <select bind:value={selectedType} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
          {#each contactTypes as type}
            <option value={type}>{type === "all" ? "All Types" : type}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Emergency Contacts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredContacts as contact (contact.name)}
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg {getTypeColor(contact.type)}">
                <Icon icon={getTypeIcon(contact.type)} class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{contact.location}</p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:phone" class="w-4 h-4 text-green-500" />
                <span class="text-lg font-mono font-semibold text-gray-900 dark:text-white">{contact.number}</span>
              </div>
              <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md" on:click={() => callNumber(contact.number)}>
                <Icon icon="heroicons:phone" class="w-4 h-4 inline mr-1" />
                Call
              </button>
            </div>

            <div class="flex items-center justify-between text-sm">
              <span class="px-2 py-1 rounded-full text-xs font-medium {getTypeColor(contact.type)}">
                {contact.type}
              </span>
              <span class="text-gray-500 dark:text-gray-400">{contact.available}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredContacts.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:exclamation-triangle" class="w-16 h-16 mx-auto text-red-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No emergency contacts found</h3>
        <p class="text-gray-400 dark:text-gray-500">Try adjusting your search criteria</p>
      </div>
    {/if}

    <!-- Emergency Instructions -->
    <div class="mt-12 bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
      <div class="flex items-center space-x-3 mb-4">
        <Icon icon="heroicons:information-circle" class="w-6 h-6 text-red-600" />
        <h3 class="text-lg font-semibold text-red-800 dark:text-red-200">Emergency Instructions</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700 dark:text-red-300">
        <div>
          <h4 class="font-semibold mb-2">🚨 For Medical Emergency:</h4>
          <ul class="space-y-1">
            <li>• Call 108 (Ambulance) immediately</li>
            <li>• Provide exact location</li>
            <li>• Stay calm and follow instructions</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">🚔 For Police Emergency:</h4>
          <ul class="space-y-1">
            <li>• Call 100 for immediate help</li>
            <li>• Report crime or safety concerns</li>
            <li>• Provide clear description of situation</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">🔥 For Fire Emergency:</h4>
          <ul class="space-y-1">
            <li>• Call 101 immediately</li>
            <li>• Evacuate the building safely</li>
            <li>• Do not use elevators</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">⚡ For Utility Emergency:</h4>
          <ul class="space-y-1">
            <li>• Electricity: 1912</li>
            <li>• Water: Local water board</li>
            <li>• Gas: 1906</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
