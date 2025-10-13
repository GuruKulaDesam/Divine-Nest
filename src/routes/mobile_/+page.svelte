<script>
  import { onMount } from "svelte";
  import { browser } from '$app/environment';
  import { userRole } from "$lib/stores/userRole.js";
  import { sqliteService } from "$lib/services/sqliteService.js";
  import { sqliteTestSeeder } from "$lib/services/sqliteTestSeeder.js";

  let debugMessages = [];
  let hasErrors = false;
  let sqliteInitialized = false;
  let isPopulating = false;
  let dataSummary = {
    reminders: 0,
    familyMembers: 0,
    groceryItems: 0,
    chores: 0,
    userRole: 'none',
    platform: 'unknown'
  };

  function addDebugMessage(message, isError = false) {
    debugMessages = [...debugMessages, { text: message, isError, timestamp: new Date().toLocaleTimeString() }];
    console.log(message);
    if (isError) hasErrors = true;
  }

  async function testSQLite() {
    if (!browser) return; // Skip on server-side

    try {
      addDebugMessage('Initializing SQLite service...');
      await sqliteService.initialize();
      sqliteInitialized = true;
      addDebugMessage('✅ SQLite service initialized successfully');

      // Test saving and retrieving user role
      addDebugMessage('Testing user role operations...');
      await sqliteService.saveUserRole('mother', 'mother');
      const savedRole = await sqliteService.getUserRole();
      addDebugMessage(`✅ User role saved and retrieved: ${JSON.stringify(savedRole)}`);

      // Update data summary
      await updateDataSummary();

    } catch (error) {
      addDebugMessage(`❌ SQLite test failed: ${error.message}`, true);
      console.error('SQLite test error:', error);
    }
  }

  async function populateTestData() {
    if (isPopulating) return;

    isPopulating = true;
    addDebugMessage('🚀 Starting test data population...');

    try {
      await sqliteTestSeeder.populateAllTestData();
      addDebugMessage('✅ Test data population completed!');

      // Update data summary
      await updateDataSummary();

    } catch (error) {
      addDebugMessage(`❌ Test data population failed: ${error.message}`, true);
      console.error('Test data population error:', error);
    } finally {
      isPopulating = false;
    }
  }

  async function clearTestData() {
    try {
      addDebugMessage('🗑️ Clearing all test data...');
      await sqliteTestSeeder.clearAllTestData();
      addDebugMessage('✅ Test data cleared!');

      // Update data summary
      await updateDataSummary();

    } catch (error) {
      addDebugMessage(`❌ Failed to clear test data: ${error.message}`, true);
      console.error('Clear test data error:', error);
    }
  }

  async function updateDataSummary() {
    if (!browser) return;

    try {
      dataSummary = await sqliteTestSeeder.getDataSummary();
      addDebugMessage(`📊 Data summary updated: ${JSON.stringify(dataSummary)}`);
    } catch (error) {
      addDebugMessage(`❌ Failed to update data summary: ${error.message}`, true);
    }
  }

  onMount(async () => {
    addDebugMessage('Mobile page mounted successfully');

    // Test userRole store import
    addDebugMessage('Testing userRole store import...');
    addDebugMessage('userRole imported: ' + (typeof userRole !== 'undefined'));
    addDebugMessage('userRole type: ' + typeof userRole);

    if (userRole) {
      addDebugMessage('userRole has subscribe: ' + (typeof userRole.subscribe === 'function'));
      addDebugMessage('userRole has set: ' + (typeof userRole.set === 'function'));
      addDebugMessage('userRole has update: ' + (typeof userRole.update === 'function'));
    } else {
      addDebugMessage('userRole is null/undefined!', true);
    }

    // Test SQLite after a short delay
    setTimeout(async () => {
      await testSQLite();
    }, 500);
  });
</script>

<div class="mobile-app min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
  <!-- Debug Panel -->
  <div class="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg max-w-xs max-h-64 overflow-y-auto z-50 text-xs">
    <div class="font-bold mb-2 text-yellow-400">🔧 Home Management Suite Debug v1.1</div>
    <div class="font-bold mb-2">Minimal Test Log:</div>
    {#each debugMessages as msg}
      <div class="mb-1 {msg.isError ? 'text-red-400' : 'text-green-400'}">
        {msg.timestamp}: {msg.text}
      </div>
    {/each}
    {#if hasErrors}
      <div class="mt-2 text-red-400 font-bold">⚠️ ERRORS DETECTED</div>
    {/if}
  </div>

<div class="mobile-app min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
  <!-- Debug Panel -->
  <div class="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg max-w-xs max-h-64 overflow-y-auto z-50 text-xs">
    <div class="font-bold mb-2 text-yellow-400">🔧 Home Management Suite SQLite Debug v1.3</div>
    <div class="font-bold mb-2">Test Log:</div>
    {#each debugMessages as msg}
      <div class="mb-1 {msg.isError ? 'text-red-400' : 'text-green-400'}">
        {msg.timestamp}: {msg.text}
      </div>
    {/each}
    {#if hasErrors}
      <div class="mt-2 text-red-400 font-bold">⚠️ ERRORS DETECTED</div>
    {/if}
  </div>

  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
    <h1 class="text-2xl font-bold text-center mb-4 text-gray-800">SQLite Test Suite</h1>
    <p class="text-center text-gray-600 mb-6">Testing Capacitor SQLite integration with comprehensive test data</p>

    <!-- SQLite Status -->
    <div class="mb-6">
      <div class="flex items-center justify-center mb-4">
        <div class="w-4 h-4 rounded-full {sqliteInitialized ? 'bg-green-500' : 'bg-yellow-500'} mr-2"></div>
        <span class="text-sm font-medium">
          SQLite: {sqliteInitialized ? '✅ Initialized' : '⏳ Initializing...'}
        </span>
      </div>
    </div>

    <!-- Data Summary -->
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 class="font-semibold text-gray-800 mb-3">� Data Summary</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-600">Reminders:</span>
          <span class="font-medium text-blue-600">{dataSummary.reminders}</span>
        </div>
        <div>
          <span class="text-gray-600">Family Members:</span>
          <span class="font-medium text-blue-600">{dataSummary.familyMembers}</span>
        </div>
        <div>
          <span class="text-gray-600">Grocery Items:</span>
          <span class="font-medium text-blue-600">{dataSummary.groceryItems}</span>
        </div>
        <div>
          <span class="text-gray-600">Chores:</span>
          <span class="font-medium text-blue-600">{dataSummary.chores}</span>
        </div>
      </div>
      <div class="mt-3 pt-3 border-t border-gray-200">
        <div class="text-sm">
          <span class="text-gray-600">User Role:</span>
          <span class="font-medium text-purple-600">{dataSummary.userRole}</span>
        </div>
        <div class="text-sm mt-1">
          <span class="text-gray-600">Platform:</span>
          <span class="font-medium text-green-600">{dataSummary.platform}</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3 mb-6">
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors {isPopulating ? 'opacity-50 cursor-not-allowed' : ''}"
        on:click={populateTestData}
        disabled={isPopulating}
      >
        {isPopulating ? '🚀 Populating Test Data...' : '🚀 Populate Test Data'}
      </button>

      <button
        class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        on:click={clearTestData}
      >
        🗑️ Clear Test Data
      </button>

      <button
        class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        on:click={updateDataSummary}
      >
        🔄 Refresh Summary
      </button>
    </div>

    <!-- Platform Info -->
    <div class="bg-blue-50 p-4 rounded-lg mb-6">
      <h3 class="font-semibold text-blue-800 mb-2">📱 Platform Info</h3>
      <div class="text-sm text-blue-700">
        <div>Platform: {typeof window !== 'undefined' && window.navigator ? 'Web Browser' : 'Unknown'}</div>
        <div>Capacitor: {typeof window !== 'undefined' && window.Capacitor ? '✅ Available' : '❌ Not Available'}</div>
        <div>SQLite Plugin: {typeof window !== 'undefined' && window.CapacitorSQLite ? '✅ Available' : '❌ Not Available'}</div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="mt-6 p-4 bg-yellow-50 rounded-lg">
      <h3 class="font-semibold text-yellow-800 mb-2">📋 Test Instructions</h3>
      <ul class="text-sm text-yellow-700 space-y-1">
        <li>• Use "Populate Test Data" to load comprehensive reminder templates</li>
        <li>• Check debug panel for detailed operation results</li>
        <li>• Green messages indicate successful operations</li>
        <li>• Red messages indicate errors that need fixing</li>
        <li>• Data persists across app restarts</li>
      </ul>
    </div>
  </div>
</div>
</div>