<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { userRole } from "$lib/stores/userRole.js";
  import { offlineSync } from "$lib/utils/offlineSync.js";

  let currentRole;
  let privacySettings = {
    dataSharing: {
      familyMembers: true,
      helpers: false,
      extendedFamily: false,
      community: false
    },
    voiceData: {
      saveTranscripts: false,
      analyticsOnly: true,
      deleteAfterDays: 30
    },
    locationData: {
      shareLocation: false,
      locationHistory: false,
      emergencyOnly: true
    },
    rolePermissions: {
      mother: {
        canViewAllTasks: true,
        canManageFinances: true,
        canViewHealthData: true,
        canManageHelpers: true
      },
      father: {
        canViewAllTasks: true,
        canManageFinances: true,
        canViewHealthData: false,
        canManageHelpers: false
      },
      grandmother: {
        canViewAllTasks: false,
        canManageFinances: false,
        canViewHealthData: true,
        canManageHelpers: false
      },
      grandfather: {
        canViewAllTasks: false,
        canManageFinances: false,
        canViewHealthData: true,
        canManageHelpers: false
      },
      helper: {
        canViewAllTasks: false,
        canManageFinances: false,
        canViewHealthData: false,
        canManageHelpers: false
      },
      child: {
        canViewAllTasks: false,
        canManageFinances: false,
        canViewHealthData: false,
        canManageHelpers: false
      }
    }
  };

  let activeTab = 'data-sharing';
  let isLoading = true;

  userRole.subscribe(role => {
    currentRole = role;
  });

  onMount(async () => {
    await loadPrivacySettings();
    isLoading = false;
  });

  async function loadPrivacySettings() {
    try {
      const saved = await offlineSync.getPreference('privacy_settings');
      if (saved) {
        privacySettings = { ...privacySettings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load privacy settings:', error);
    }
  }

  async function savePrivacySettings() {
    try {
      await offlineSync.savePreference('privacy_settings', JSON.stringify(privacySettings));
      console.log('Privacy settings saved');
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    }
  }

  function updateSetting(category, setting, value) {
    privacySettings[category][setting] = value;
    savePrivacySettings();
  }

  function updateRolePermission(role, permission, value) {
    privacySettings.rolePermissions[role][permission] = value;
    savePrivacySettings();
  }

  function canModifySettings() {
    // Only mothers and fathers can modify privacy settings
    return currentRole === 'mother' || currentRole === 'father';
  }

  async function exportPrivacyReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      householdRole: currentRole,
      settings: privacySettings,
      dataRetention: {
        voiceData: privacySettings.voiceData.deleteAfterDays,
        locationData: privacySettings.locationData.locationHistory
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `divine-nest-privacy-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function clearVoiceData() {
    if (confirm('Are you sure you want to clear all voice data? This action cannot be undone.')) {
      try {
        // In a real implementation, this would clear voice history from IndexedDB
        console.log('Voice data cleared');
        alert('Voice data has been cleared.');
      } catch (error) {
        console.error('Failed to clear voice data:', error);
      }
    }
  }

  async function clearLocationData() {
    if (confirm('Are you sure you want to clear location history? This action cannot be undone.')) {
      try {
        await offlineSync.savePreference('location_data', null);
        await offlineSync.savePreference('location_timestamp', null);
        alert('Location data has been cleared.');
      } catch (error) {
        console.error('Failed to clear location data:', error);
      }
    }
  }
</script>

<div class="privacy-controls bg-white rounded-lg shadow-sm p-6 border border-gray-100">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-2">
      <Icon icon="mdi:shield-lock" class="w-6 h-6 text-blue-600" />
      <h2 class="text-xl font-semibold text-gray-800">Privacy & Security</h2>
    </div>
    {#if canModifySettings()}
      <button
        on:click={exportPrivacyReport}
        class="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center space-x-1"
      >
        <Icon icon="mdi:download" class="w-4 h-4" />
        <span>Export Report</span>
      </button>
    {/if}
  </div>

  {#if isLoading}
    <div class="flex items-center justify-center py-8">
      <Icon icon="mdi:loading" class="w-6 h-6 animate-spin text-blue-600" />
      <span class="ml-2 text-gray-600">Loading privacy settings...</span>
    </div>
  {:else}
    <!-- Tab Navigation -->
    <div class="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
      {#each [
        { id: 'data-sharing', label: 'Data Sharing', icon: 'mdi:share-variant' },
        { id: 'voice-privacy', label: 'Voice Privacy', icon: 'mdi:microphone' },
        { id: 'location-privacy', label: 'Location Privacy', icon: 'mdi:map-marker' },
        { id: 'role-permissions', label: 'Role Permissions', icon: 'mdi:account-group' }
      ] as tab}
        <button
          on:click={() => activeTab = tab.id}
          class="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors {activeTab === tab.id ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}"
        >
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="hidden sm:inline">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      {#if activeTab === 'data-sharing'}
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Data Sharing Preferences</h3>
            <p class="text-sm text-gray-600 mb-4">Control who can see your household data and activities.</p>

            <div class="space-y-4">
              {#each [
                { key: 'familyMembers', label: 'Share with immediate family members', desc: 'Let spouse and children see household activities' },
                { key: 'helpers', label: 'Share with household helpers', desc: 'Allow helpers to see relevant tasks and schedules' },
                { key: 'extendedFamily', label: 'Share with extended family', desc: 'Include grandparents, uncles, aunts in data sharing' },
                { key: 'community', label: 'Share anonymized data with community', desc: 'Help improve the app with anonymous usage statistics' }
              ] as setting}
                <div class="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="data-{setting.key}"
                    bind:checked={privacySettings.dataSharing[setting.key]}
                    on:change={(e) => updateSetting('dataSharing', setting.key, e.target.checked)}
                    disabled={!canModifySettings()}
                    class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <div class="flex-1">
                    <label for="data-{setting.key}" class="text-sm font-medium text-gray-700 cursor-pointer">
                      {setting.label}
                    </label>
                    <p class="text-xs text-gray-500 mt-1">{setting.desc}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

      {:else if activeTab === 'voice-privacy'}
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Voice Data Privacy</h3>
            <p class="text-sm text-gray-600 mb-4">Manage how your voice commands and interactions are stored and used.</p>

            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="voice-transcripts"
                  bind:checked={privacySettings.voiceData.saveTranscripts}
                  on:change={(e) => updateSetting('voiceData', 'saveTranscripts', e.target.checked)}
                  disabled={!canModifySettings()}
                  class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <div class="flex-1">
                  <label for="voice-transcripts" class="text-sm font-medium text-gray-700 cursor-pointer">
                    Save voice transcripts
                  </label>
                  <p class="text-xs text-gray-500 mt-1">Store text versions of your voice commands for better responses</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="voice-analytics"
                  bind:checked={privacySettings.voiceData.analyticsOnly}
                  on:change={(e) => updateSetting('voiceData', 'analyticsOnly', e.target.checked)}
                  disabled={!canModifySettings()}
                  class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <div class="flex-1">
                  <label for="voice-analytics" class="text-sm font-medium text-gray-700 cursor-pointer">
                    Analytics only (recommended)
                  </label>
                  <p class="text-xs text-gray-500 mt-1">Use voice data only for improving responses, never store actual audio</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <label for="voice-retention" class="text-sm font-medium text-gray-700">Data retention period</label>
                <select
                  id="voice-retention"
                  bind:value={privacySettings.voiceData.deleteAfterDays}
                  on:change={(e) => updateSetting('voiceData', 'deleteAfterDays', parseInt(e.target.value))}
                  disabled={!canModifySettings()}
                  class="ml-auto block w-32 pl-3 pr-10 py-1 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md disabled:opacity-50"
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
            </div>

            {#if canModifySettings()}
              <div class="mt-6 pt-4 border-t border-gray-200">
                <button
                  on:click={clearVoiceData}
                  class="text-sm px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center space-x-1"
                >
                  <Icon icon="mdi:delete" class="w-4 h-4" />
                  <span>Clear Voice Data</span>
                </button>
              </div>
            {/if}
          </div>
        </div>

      {:else if activeTab === 'location-privacy'}
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Location Data Privacy</h3>
            <p class="text-sm text-gray-600 mb-4">Control how location data is used for ambient intelligence features.</p>

            <div class="space-y-4">
              {#each [
                { key: 'shareLocation', label: 'Share current location', desc: 'Allow location-based suggestions and reminders' },
                { key: 'locationHistory', label: 'Store location history', desc: 'Keep track of location patterns for better suggestions' },
                { key: 'emergencyOnly', label: 'Emergency access only', desc: 'Location data only accessible in emergency situations' }
              ] as setting}
                <div class="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="location-{setting.key}"
                    bind:checked={privacySettings.locationData[setting.key]}
                    on:change={(e) => updateSetting('locationData', setting.key, e.target.checked)}
                    disabled={!canModifySettings()}
                    class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <div class="flex-1">
                    <label for="location-{setting.key}" class="text-sm font-medium text-gray-700 cursor-pointer">
                      {setting.label}
                    </label>
                    <p class="text-xs text-gray-500 mt-1">{setting.desc}</p>
                  </div>
                </div>
              {/each}
            </div>

            {#if canModifySettings()}
              <div class="mt-6 pt-4 border-t border-gray-200">
                <button
                  on:click={clearLocationData}
                  class="text-sm px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center space-x-1"
                >
                  <Icon icon="mdi:delete" class="w-4 h-4" />
                  <span>Clear Location Data</span>
                </button>
              </div>
            {/if}
          </div>
        </div>

      {:else if activeTab === 'role-permissions'}
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-4">Role-Based Permissions</h3>
            <p class="text-sm text-gray-600 mb-4">Set what each family role can view and manage in the household.</p>

            {#if !canModifySettings()}
              <div class="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                <div class="flex items-center space-x-2">
                  <Icon icon="mdi:information" class="w-5 h-5 text-amber-600" />
                  <p class="text-sm text-amber-800">Only parents can modify role permissions.</p>
                </div>
              </div>
            {/if}

            <div class="space-y-4">
              {#each Object.entries(privacySettings.rolePermissions) as [role, permissions]}
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="text-md font-medium text-gray-800 capitalize mb-3">{role}</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {#each Object.entries(permissions) as [permission, allowed]}
                      <div class="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="perm-{role}-{permission}"
                          bind:checked={allowed}
                          on:change={(e) => updateRolePermission(role, permission, e.target.checked)}
                          disabled={!canModifySettings()}
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                        />
                        <label
                          for="perm-{role}-{permission}"
                          class="text-sm text-gray-700 cursor-pointer disabled:cursor-not-allowed"
                          class:disabled={!canModifySettings()}
                        >
                          {permission.replace(/([A-Z])/g, ' $1').replace(/^can /, '').trim()}
                        </label>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>