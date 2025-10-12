<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { locationService, type LocationData } from "$lib/services/locationService";
  import { regionalDataService, type RegionalData, type EmergencyContact } from "$lib/services/regionalDataService";
  import LocationPermissionRequest from "$lib/components/LocationPermissionRequest.svelte";

  let emergencyContacts: EmergencyContact[] = [];
  let regionalData: RegionalData | null = null;
  let currentLocation: LocationData | null = null;
  let isLoading = true;
  let showPermissionRequest = false;
  let locationError: string | null = null;

  // Static emergency contacts as fallback
  const fallbackContacts: EmergencyContact[] = [
    { id: 'police', name: "Police Control Room", category: 'police', phone: "100", description: "Emergency police services", isEmergency: true },
    { id: 'fire', name: "Fire Brigade", category: 'fire', phone: "101", description: "Fire emergency services", isEmergency: true },
    { id: 'ambulance', name: "Ambulance", category: 'ambulance', phone: "108", description: "Medical emergency ambulance", isEmergency: true },
    { id: 'women_helpline', name: "Women Helpline", category: 'women_helpline', phone: "1091", description: "24/7 support for women in distress", isEmergency: true },
    { id: 'child_helpline', name: "Child Helpline", category: 'child_helpline', phone: "1098", description: "Support for children in need", isEmergency: true },
  ];

  let searchQuery = "";
  let selectedCategory = "all";

  const categories = ["all", "police", "fire", "ambulance", "hospital", "women_helpline", "child_helpline", "disaster_management"];

  onMount(async () => {
    document.title = "Emergency Contacts - Family App";
    await initializeLocationServices();
  });

  async function initializeLocationServices() {
    try {
      isLoading = true;

      // Check location permissions
      const permissions = await locationService.checkPermissions();
      const hasLocationPermission = permissions.location === 'granted' || permissions.coarseLocation === 'granted';

      if (!hasLocationPermission) {
        showPermissionRequest = true;
        emergencyContacts = fallbackContacts;
        isLoading = false;
        return;
      }

      // Get current location
      currentLocation = await locationService.getCurrentLocation();

      // Get regional data based on location
      regionalData = await regionalDataService.getRegionalData(currentLocation);

      if (regionalData) {
        emergencyContacts = regionalData.emergencyContacts;
      } else {
        emergencyContacts = fallbackContacts;
      }

    } catch (error) {
      console.error('Failed to initialize location services:', error);
      locationError = 'Unable to access location services. Showing default emergency contacts.';
      emergencyContacts = fallbackContacts;
    } finally {
      isLoading = false;
    }
  }

  async function handlePermissionGranted() {
    showPermissionRequest = false;
    await initializeLocationServices();
  }

  function handlePermissionDenied() {
    showPermissionRequest = false;
    emergencyContacts = fallbackContacts;
    isLoading = false;
  }

  function getCategoryIcon(category: string): string {
    switch (category) {
      case 'police': return 'mdi:police-badge';
      case 'fire': return 'mdi:fire-truck';
      case 'ambulance': return 'mdi:ambulance';
      case 'hospital': return 'mdi:hospital-building';
      case 'women_helpline': return 'mdi:account-heart';
      case 'child_helpline': return 'mdi:account-child';
      case 'disaster_management': return 'mdi:alert-circle';
      default: return 'mdi:phone';
    }
  }

  function getCategoryColor(category: string): string {
    switch (category) {
      case 'police': return 'text-blue-600 bg-blue-100';
      case 'fire': return 'text-red-600 bg-red-100';
      case 'ambulance': return 'text-green-600 bg-green-100';
      case 'hospital': return 'text-purple-600 bg-purple-100';
      case 'women_helpline': return 'text-pink-600 bg-pink-100';
      case 'child_helpline': return 'text-orange-600 bg-orange-100';
      case 'disaster_management': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  function callNumber(number: string) {
    window.open(`tel:${number}`, "_self");
  }

  $: filteredContacts = emergencyContacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (contact.description && contact.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Location Permission Request Modal -->
    {#if showPermissionRequest}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <LocationPermissionRequest
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        />
      </div>
    {/if}

    <!-- Loading State -->
    {#if isLoading}
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Loading emergency contacts...</p>
        </div>
      </div>
    {:else}
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white">
              <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8" />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Emergency Contacts</h1>
              <p class="text-gray-600 dark:text-gray-300">
                {#if regionalData}
                  {regionalData.city}, {regionalData.state} Emergency Services
                {:else}
                  Local Emergency Services
                {/if}
              </p>
            </div>
          </div>
          <div class="text-right">
            {#if regionalData}
              <p class="text-sm text-gray-500 dark:text-gray-400">Location: {regionalData.city}, {regionalData.state}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">Last updated: {regionalData.lastUpdated.toLocaleDateString()}</p>
            {:else}
              <p class="text-sm text-gray-500 dark:text-gray-400">Location: Default Services</p>
            {/if}
          </div>
        </div>

        {#if locationError}
          <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-sm text-yellow-800">{locationError}</p>
          </div>
        {/if}
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Emergency Contacts</label>
          <input type="text" bind:value={searchQuery} placeholder="Search by name, number, or description..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Category</label>
          <select bind:value={selectedCategory} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            {#each categories as category}
              <option value={category}>{category === "all" ? "All Categories" : category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Emergency Contacts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredContacts as contact (contact.id)}
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 {contact.isEmergency ? 'border-red-500' : 'border-orange-500'}">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 rounded-lg {getCategoryColor(contact.category)}">
                  <Icon icon={getCategoryIcon(contact.category)} class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{contact.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
              </div>
              {#if contact.isEmergency}
                <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Emergency</span>
              {/if}
            </div>

            <div class="space-y-3">
              {#if contact.description}
                <p class="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
              {/if}

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <Icon icon="heroicons:phone" class="w-4 h-4 text-green-500" />
                  <span class="text-lg font-mono font-semibold text-gray-900 dark:text-white">{contact.phone}</span>
                </div>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md" on:click={() => callNumber(contact.phone)}>
                  <Icon icon="heroicons:phone" class="w-4 h-4 inline mr-1" />
                  Call
                </button>
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
    {/if}
  </div>
</div>
