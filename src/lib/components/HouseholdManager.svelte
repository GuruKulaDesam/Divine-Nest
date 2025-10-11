<script>
  import { onMount } from "svelte";
  import { getGroceryItems, getChores, getRepairTasks, getEmergencyContacts } from "$lib/data/home.js";
  import { base } from "$app/paths";

  let householdStats = {
    totalGroceries: 0,
    lowStockItems: 0,
    pendingChores: 0,
    completedChoresToday: 0,
    pendingRepairs: 0,
    emergencyContacts: 0,
  };

  let recentActivity = [];

  onMount(async () => {
    await loadHouseholdStats();
    await loadRecentActivity();
  });

  async function loadHouseholdStats() {
    const [groceries, chores, repairs, contacts] = await Promise.all([getGroceryItems(), getChores(), getRepairTasks(), getEmergencyContacts()]);

    householdStats = {
      totalGroceries: groceries.length,
      lowStockItems: groceries.filter((g) => g.quantity <= 2 && g.inStock).length,
      pendingChores: chores.filter((c) => !c.completed).length,
      completedChoresToday: chores.filter((c) => {
        const today = new Date().toDateString();
        return c.completed && c.lastCompleted && c.lastCompleted.toDateString() === today;
      }).length,
      pendingRepairs: repairs.filter((r) => r.status !== "completed").length,
      emergencyContacts: contacts.length,
    };
  }

  async function loadRecentActivity() {
    // This would typically fetch from a separate activity log
    // For now, we'll create mock recent activity
    recentActivity = [
      { id: 1, type: "chore", message: 'Amma completed "Morning Pooja"', time: "2 hours ago", icon: "🙏" },
      { id: 2, type: "grocery", message: 'Added "Turmeric" to pantry', time: "4 hours ago", icon: "🛒" },
      { id: 3, type: "repair", message: "Kitchen tap repair marked as in-progress", time: "1 day ago", icon: "🔧" },
      { id: 4, type: "emergency", message: "Added Dr. Rajesh Kumar as primary medical contact", time: "2 days ago", icon: "🏥" },
      { id: 5, type: "chore", message: 'Paati completed "Kitchen Cleaning"', time: "2 days ago", icon: "🧹" },
    ];
  }
</script>

<div class="space-y-8">
  <!-- Household Overview Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Grocery Management -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
      <div class="flex items-center gap-4 mb-4">
        <div class="text-3xl">🛒</div>
        <div>
          <h3 class="text-lg font-semibold text-green-800">Pantry Status</h3>
          <p class="text-green-600">Grocery management</p>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-green-700">Total items:</span>
          <span class="font-semibold text-green-800">{householdStats.totalGroceries}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-green-700">Low stock:</span>
          <span class="font-semibold text-orange-600">{householdStats.lowStockItems}</span>
        </div>
      </div>
    </div>

    <!-- Chore Coordination -->
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
      <div class="flex items-center gap-4 mb-4">
        <div class="text-3xl">🧹</div>
        <div>
          <h3 class="text-lg font-semibold text-blue-800">Family Chores</h3>
          <p class="text-blue-600">Task coordination</p>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-blue-700">Pending:</span>
          <span class="font-semibold text-blue-800">{householdStats.pendingChores}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-blue-700">Completed today:</span>
          <span class="font-semibold text-green-600">{householdStats.completedChoresToday}</span>
        </div>
      </div>
    </div>

    <!-- Maintenance & Repairs -->
    <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
      <div class="flex items-center gap-4 mb-4">
        <div class="text-3xl">🔧</div>
        <div>
          <h3 class="text-lg font-semibold text-orange-800">Maintenance</h3>
          <p class="text-orange-600">Home repairs</p>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-orange-700">Pending repairs:</span>
          <span class="font-semibold text-orange-800">{householdStats.pendingRepairs}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-orange-700">Emergency contacts:</span>
          <span class="font-semibold text-green-600">{householdStats.emergencyContacts}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions Grid -->
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Quick Household Actions</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a href="{base}/home#grocery" class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center">
        <span class="text-2xl">🛒</span>
        <span class="font-semibold">Check Pantry</span>
        <span class="text-sm opacity-90">View grocery inventory</span>
      </a>

      <a href="{base}/home#chores" class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center">
        <span class="text-2xl">🧹</span>
        <span class="font-semibold">Family Chores</span>
        <span class="text-sm opacity-90">Assign & track tasks</span>
      </a>

      <a href="{base}/home#repairs" class="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center">
        <span class="text-2xl">🔧</span>
        <span class="font-semibold">Maintenance</span>
        <span class="text-sm opacity-90">Track repairs</span>
      </a>

      <a href="{base}/home-services" class="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center">
        <span class="text-2xl">🚨</span>
        <span class="font-semibold">Emergency</span>
        <span class="text-sm opacity-90">Quick contacts</span>
      </a>
    </div>
  </div>

  <!-- Recent Household Activity -->
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Recent Household Activity</h2>

    {#if recentActivity.length === 0}
      <div class="text-center py-8 text-gray-500">
        <div class="text-4xl mb-4">📋</div>
        <p>No recent activity</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each recentActivity as activity}
          <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div class="text-2xl">{activity.icon}</div>
            <div class="flex-1">
              <p class="text-gray-800">{activity.message}</p>
              <p class="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Household Tips & Reminders -->
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
    <h2 class="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
      <span>💡</span>
      South Indian Household Tips
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-semibold text-purple-700 mb-2">Daily Rituals</h3>
        <ul class="text-sm text-purple-600 space-y-1">
          <li>• Morning pooja before starting household chores</li>
          <li>• Evening lamp lighting (deeparadhana)</li>
          <li>• Regular kolam drawing at entrance</li>
          <li>• Daily temple bell ringing</li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-purple-700 mb-2">Seasonal Maintenance</h3>
        <ul class="text-sm text-purple-600 space-y-1">
          <li>• Clean water tanks before monsoon</li>
          <li>• Service AC units before summer</li>
          <li>• Check electrical wiring during festivals</li>
          <li>• Pest control before major celebrations</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Family Member Dashboard -->
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Family Member Dashboard</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Amma -->
      <div class="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">👩</span>
          <div>
            <h3 class="font-semibold text-pink-800">Amma</h3>
            <p class="text-sm text-pink-600">Household Manager</p>
          </div>
        </div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-pink-700">Today's chores:</span>
            <span class="font-semibold">3/5</span>
          </div>
          <div class="flex justify-between">
            <span class="text-pink-700">Streak:</span>
            <span class="font-semibold text-orange-600">🔥 15 days</span>
          </div>
        </div>
      </div>

      <!-- Appa -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">👨</span>
          <div>
            <h3 class="font-semibold text-blue-800">Appa</h3>
            <p class="text-sm text-blue-600">Maintenance Lead</p>
          </div>
        </div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-blue-700">Repairs handled:</span>
            <span class="font-semibold">2</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">This month:</span>
            <span class="font-semibold text-green-600">✅</span>
          </div>
        </div>
      </div>

      <!-- Paati -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">👵</span>
          <div>
            <h3 class="font-semibold text-green-800">Paati</h3>
            <p class="text-sm text-green-600">Kitchen Guardian</p>
          </div>
        </div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-green-700">Recipes shared:</span>
            <span class="font-semibold">12</span>
          </div>
          <div class="flex justify-between">
            <span class="text-green-700">Temple visits:</span>
            <span class="font-semibold text-orange-600">📿 8</span>
          </div>
        </div>
      </div>

      <!-- Children -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">👶</span>
          <div>
            <h3 class="font-semibold text-yellow-800">Children</h3>
            <p class="text-sm text-yellow-600">Little Helpers</p>
          </div>
        </div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-yellow-700">Chores completed:</span>
            <span class="font-semibold">6</span>
          </div>
          <div class="flex justify-between">
            <span class="text-yellow-700">Study streak:</span>
            <span class="font-semibold text-blue-600">📚 5 days</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
