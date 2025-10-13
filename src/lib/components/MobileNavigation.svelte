<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { userRole } from "$lib/stores/userRole.js";
  import { offlineSync } from "$lib/utils/offlineSync.js";
  import RoleBasedMobileDashboard from "./RoleBasedMobileDashboard.svelte";

  let currentRole = null;
  let currentTab = 'home';
  let userLocation = null;
  let isOnline = navigator.onLine;

  // New Table-Driven Navigation Configuration
  const navigationConfig = {
    mother: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'activities', label: 'Activities', icon: 'mdi:bolt', path: '/activities' },
        { id: 'family', label: 'Family', icon: 'mdi:account-group', path: '/family' },
        { id: 'tasks', label: 'Tasks', icon: 'mdi:clipboard-list', path: '/tasks' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    },
    father: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'finance', label: 'Finance', icon: 'mdi:currency-inr', path: '/finance' },
        { id: 'inventory', label: 'Inventory', icon: 'mdi:package-variant', path: '/inventory' },
        { id: 'tasks', label: 'Tasks', icon: 'mdi:clipboard-list', path: '/tasks' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    },
    grandmother: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'alerts', label: 'Alerts', icon: 'mdi:bell-alert', path: '/alerts' },
        { id: 'directory', label: 'Directory', icon: 'mdi:building-storefront', path: '/directory' },
        { id: 'family', label: 'Family', icon: 'mdi:account-group', path: '/family' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    },
    grandfather: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'ai_prompts', label: 'AI Prompts', icon: 'mdi:robot', path: '/ai_prompts' },
        { id: 'directory', label: 'Directory', icon: 'mdi:building-storefront', path: '/directory' },
        { id: 'users', label: 'Users', icon: 'mdi:account-group', path: '/users' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    },
    child: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'tasks', label: 'My Tasks', icon: 'mdi:clipboard-list', path: '/tasks' },
        { id: 'rewards', label: 'Rewards', icon: 'mdi:star', path: '/rewards' },
        { id: 'activities', label: 'Activities', icon: 'mdi:bolt', path: '/activities' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    },
    teenager: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'tasks', label: 'My Tasks', icon: 'mdi:clipboard-list', path: '/tasks' },
        { id: 'rewards', label: 'Rewards', icon: 'mdi:star', path: '/rewards' },
        { id: 'foods', label: 'Foods', icon: 'mdi:food', path: '/foods' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    },
    helper: {
      tabs: [
        { id: 'home', label: 'Home', icon: 'mdi:home', badge: null },
        { id: 'tasks', label: 'My Tasks', icon: 'mdi:clipboard-list', path: '/tasks' },
        { id: 'inventory', label: 'Inventory', icon: 'mdi:package-variant', path: '/inventory' },
        { id: 'alerts', label: 'Alerts', icon: 'mdi:bell-alert', path: '/alerts' },
        { id: 'settings', label: 'Settings', icon: 'mdi:cog', badge: null }
      ]
    }
  };

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
    // Reset to home tab when role changes
    currentTab = 'home';
  });

  onMount(async () => {
    // Get user location for geo-based adjustments
    await getUserLocation();

    // Listen for online/offline changes
    window.addEventListener('online', () => isOnline = true);
    window.addEventListener('offline', () => isOnline = false);
  });

  async function getUserLocation() {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          });
        });

        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        // Cache location
        await offlineSync.savePreference('current_location', JSON.stringify(userLocation));
      } catch (error) {
        console.log('Location access denied, using cached location');
        // Try to use cached location
        const cached = await offlineSync.getPreference('current_location');
        if (cached) {
          userLocation = JSON.parse(cached);
        }
      }
    }
  }

  function switchTab(tabId) {
    currentTab = tabId;
  }

  // Get current navigation config
  $: currentNav = navigationConfig[currentRole] || navigationConfig.mother;

  // Get badge counts (simplified - would be dynamic in real app)
  $: badgeCounts = {
    tasks: 3,
    maintenance: 2,
    rituals: 1,
    medicine: 1,
    chores: 2,
    stars: 5,
    duties: 4,
    messages: 2
  };
</script>

<!-- Mobile Navigation Container -->
<div class="mobile-app-container bg-gray-50 min-h-screen flex flex-col">
  <!-- Main Content Area -->
  <main class="flex-1 overflow-y-auto pb-20">
    <RoleBasedMobileDashboard
      {currentTab}
      {currentRole}
      {userLocation}
      {isOnline}
    />
  </main>

  <!-- Bottom Navigation Bar -->
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div class="flex items-center justify-around px-2 py-2">
      {#each currentNav.tabs as tab}
        <button
          on:click={() => switchTab(tab.id)}
          class="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors relative {currentTab === tab.id ? 'text-blue-600' : 'text-gray-500'}"
        >
          <!-- Badge indicator -->
          {#if tab.badge && badgeCounts[tab.badge] > 0}
            <div class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {badgeCounts[tab.badge]}
            </div>
          {/if}

          <!-- Tab Icon -->
          <Icon
            icon={tab.icon}
            class="w-6 h-6 mb-1 {currentTab === tab.id ? 'text-blue-600' : 'text-gray-500'}"
          />

          <!-- Tab Label -->
          <span class="text-xs font-medium truncate">
            {tab.label}
          </span>

          <!-- Active indicator -->
          {#if currentTab === tab.id}
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Online/Offline indicator -->
    <div class="absolute top-0 right-2 transform -translate-y-full">
      <div class="flex items-center space-x-1 px-2 py-1 bg-white rounded-b-md border border-gray-200 shadow-sm">
        <div class="w-2 h-2 rounded-full {isOnline ? 'bg-green-500' : 'bg-red-500'}"></div>
        <span class="text-xs text-gray-600">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  </nav>
</div>

<style>
  .mobile-app-container {
    /* Ensure content doesn't get hidden behind navigation */
    padding-bottom: 80px;
  }

  /* Custom scrollbar for mobile */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>