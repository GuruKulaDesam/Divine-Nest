<script>
  import GroceryTracker from './GroceryTracker.svelte';
  import ChoreManager from './ChoreManager.svelte';
  import RepairTracker from './RepairTracker.svelte';
  import EmergencyPanel from './EmergencyPanel.svelte';

  let activeTab = 'overview';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'grocery', label: 'Grocery & Pantry', icon: '🛒' },
    { id: 'chores', label: 'Chores & Flow', icon: '🧹' },
    { id: 'repairs', label: 'Repairs & Maintenance', icon: '🔧' },
    { id: 'emergency', label: 'Emergency Services', icon: '🚨' }
  ];
</script>

<div class="bg-white rounded-lg shadow-lg p-6">
  <!-- Tab Navigation -->
  <div class="flex flex-wrap gap-2 mb-6 border-b border-orange-200 pb-4">
    {#each tabs as tab}
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 {activeTab === tab.id ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}"
        on:click={() => activeTab = tab.id}
      >
        <span class="text-lg">{tab.icon}</span>
        <span class="font-medium">{tab.label}</span>
      </button>
    {/each}
  </div>

  <!-- Tab Content -->
  <div class="min-h-[600px]">
    {#if activeTab === 'overview'}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Quick Stats Cards -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div class="flex items-center gap-3">
            <div class="text-2xl">🛒</div>
            <div>
              <h3 class="font-semibold text-blue-800">Pantry Items</h3>
              <p class="text-2xl font-bold text-blue-600">24</p>
              <p class="text-sm text-blue-600">Low stock: 3</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div class="flex items-center gap-3">
            <div class="text-2xl">✅</div>
            <div>
              <h3 class="font-semibold text-green-800">Today's Chores</h3>
              <p class="text-2xl font-bold text-green-600">8/12</p>
              <p class="text-sm text-green-600">Completed</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
          <div class="flex items-center gap-3">
            <div class="text-2xl">🔧</div>
            <div>
              <h3 class="font-semibold text-yellow-800">Pending Repairs</h3>
              <p class="text-2xl font-bold text-yellow-600">2</p>
              <p class="text-sm text-yellow-600">High priority</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <div class="flex items-center gap-3">
            <div class="text-2xl">🚨</div>
            <div>
              <h3 class="font-semibold text-red-800">Emergency Ready</h3>
              <p class="text-2xl font-bold text-red-600">95%</p>
              <p class="text-sm text-red-600">Last checked: Today</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            class="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center gap-3"
            on:click={() => activeTab = 'grocery'}
          >
            <span class="text-2xl">🛒</span>
            <div class="text-left">
              <div class="font-semibold">Add Grocery Item</div>
              <div class="text-sm opacity-90">Update pantry inventory</div>
            </div>
          </button>

          <button
            class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center gap-3"
            on:click={() => activeTab = 'chores'}
          >
            <span class="text-2xl">🧹</span>
            <div class="text-left">
              <div class="font-semibold">Assign Chore</div>
              <div class="text-sm opacity-90">Create family task</div>
            </div>
          </button>

          <button
            class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center gap-3"
            on:click={() => activeTab = 'emergency'}
          >
            <span class="text-2xl">🚨</span>
            <div class="text-left">
              <div class="font-semibold">Emergency Call</div>
              <div class="text-sm opacity-90">Quick access contacts</div>
            </div>
          </button>
        </div>
      </div>

    {:else if activeTab === 'grocery'}
      <GroceryTracker />
    {:else if activeTab === 'chores'}
      <ChoreManager />
    {:else if activeTab === 'repairs'}
      <RepairTracker />
    {:else if activeTab === 'emergency'}
      <EmergencyPanel />
    {/if}
  </div>
</div>