<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { cloudSync } from '$lib/services/cloudSync.js';

  let isOnline = navigator.onLine;
  let syncStatus = cloudSync.getSyncStatus();
  let isSyncing = false;
  let statusUpdateInterval;

  onMount(() => {
    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Update sync status periodically
    statusUpdateInterval = setInterval(() => {
      syncStatus = cloudSync.getSyncStatus();
    }, 5000);
  });

  onDestroy(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
    if (statusUpdateInterval) {
      clearInterval(statusUpdateInterval);
    }
  });

  function updateOnlineStatus() {
    isOnline = navigator.onLine;
    syncStatus = cloudSync.getSyncStatus();
  }

  async function handleForceSync() {
    if (!isOnline || isSyncing) return;

    isSyncing = true;
    try {
      await cloudSync.forceSync();
      console.log('Manual sync completed');
      syncStatus = cloudSync.getSyncStatus();
    } catch (error) {
      console.error('Manual sync failed:', error);
    } finally {
      isSyncing = false;
    }
  }

  function handleEmergencyExport() {
    cloudSync.emergencyExport();
  }

  function handleEmergencyImport(event) {
    const file = event.target.files[0];
    if (file) {
      cloudSync.emergencyImport(file);
    }
  }
</script>

<div class="sync-status bg-white rounded-lg border p-4 mb-4">
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center space-x-2">
      <Icon
        icon={isOnline ? "mdi:wifi" : "mdi:wifi-off"}
        class="w-5 h-5 {isOnline ? 'text-green-600' : 'text-red-600'}"
      />
      <h3 class="text-sm font-medium text-gray-800">
        {isOnline ? 'Online' : 'Offline'}
      </h3>
    </div>

    {#if isOnline}
      <button
        on:click={handleForceSync}
        disabled={isSyncing || syncStatus.syncInProgress}
        class="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
      >
        <Icon icon="mdi:sync" class="w-3 h-3" />
        <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
      </button>
    {/if}
  </div>

  <div class="text-xs text-gray-600 space-y-1">
    <div class="flex justify-between">
      <span>Pending Changes:</span>
      <span class="font-medium">{syncStatus.pendingChanges || 0}</span>
    </div>

    {#if !isOnline}
      <div class="text-amber-600 mt-2">
        <Icon icon="mdi:information" class="w-3 h-3 inline mr-1" />
        Working offline - changes will sync when online
      </div>
    {/if}
  </div>

  <!-- Emergency data controls (hidden by default, can be shown in settings) -->
  <div class="mt-3 pt-3 border-t border-gray-200 hidden" id="emergency-controls">
    <div class="text-xs text-gray-500 mb-2">Emergency Data Controls</div>
    <div class="flex space-x-2">
      <button
        on:click={handleEmergencyExport}
        class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        Export Data
      </button>
      <label class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer">
        Import Data
        <input
          type="file"
          accept=".json"
          on:change={handleEmergencyImport}
          class="hidden"
        />
      </label>
    </div>
  </div>
</div>
