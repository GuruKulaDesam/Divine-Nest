<script>
  import GroceryTracker from "./GroceryTracker.svelte";
  import ChoreManager from "./ChoreManager.svelte";
  import RepairTracker from "./RepairTracker.svelte";
  import EmergencyPanel from "./EmergencyPanel.svelte";
  import PriceTracker from "./PriceTracker.svelte";
  import RoleBasedDashboard from "./RoleBasedDashboard.svelte";
  import RoleSelection from "./RoleSelection.svelte";
  import FestivalPlanner from "./FestivalPlanner.svelte";
  import { userRole, getCurrentRoleDashboard } from "$lib/stores/userRole.js";

  let activeTab = "overview";
  let currentRole;
  let dashboardConfig;

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
    dashboardConfig = getCurrentRoleDashboard();
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "festivals", label: "Festivals", icon: "🪔" },
    { id: "grocery", label: "Grocery & Pantry", icon: "🛒" },
    { id: "chores", label: "Chores & Flow", icon: "🧹" },
    { id: "repairs", label: "Repairs & Maintenance", icon: "🔧" },
    { id: "emergency", label: "Emergency Services", icon: "🚨" },
  ];
</script>

<div class="bg-white rounded-lg shadow-lg p-6">
  <!-- Tab Navigation -->
  <div class="flex flex-wrap gap-2 mb-6 border-b border-orange-200 pb-4">
    {#each tabs as tab}
      <button class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 {activeTab === tab.id ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}" on:click={() => (activeTab = tab.id)}>
        <span class="text-lg">{tab.icon}</span>
        <span class="font-medium">{tab.label}</span>
      </button>
    {/each}
  </div>

  <!-- Tab Content -->
  <div class="min-h-[600px]">
    {#if activeTab === "overview"}
      {#if !currentRole}
        <!-- Role Selection Screen -->
        <div class="text-center py-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Divine Nest</h2>
          <p class="text-gray-600 mb-8">Choose your role in the family to personalize your experience</p>
          <RoleSelection />
        </div>
      {:else}
        <!-- Role-Based Dashboard -->
        <RoleBasedDashboard />
      {/if}
    {:else if activeTab === "festivals"}
      <FestivalPlanner />
    {:else if activeTab === "grocery"}
      <GroceryTracker />
    {:else if activeTab === "chores"}
      <ChoreManager />
    {:else if activeTab === "repairs"}
      <RepairTracker />
    {:else if activeTab === "emergency"}
      <EmergencyPanel />
    {/if}
  </div>
</div>
