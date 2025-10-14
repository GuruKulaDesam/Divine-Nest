<script>
  import { onMount } from 'svelte';
  import { sqliteService } from '$lib/services/sqliteService';
  import Icon from '@iconify/svelte';

  let alertSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    categories: {
      urgent: true,
      maintenance: true,
      reminders: true,
      family: true,
      general: false
    }
  };

  onMount(async () => {
    await loadSettings();
  });

  async function loadSettings() {
    try {
      // Load settings from storage
      const saved = localStorage.getItem('alertSettings');
      if (saved) {
        alertSettings = { ...alertSettings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading alert settings:', error);
    }
  }

  async function saveSettings() {
    try {
      localStorage.setItem('alertSettings', JSON.stringify(alertSettings));
      // Show success message
    } catch (error) {
      console.error('Error saving alert settings:', error);
    }
  }

  function handleCategoryChange(category, value) {
    alertSettings.categories[category] = value;
    saveSettings();
  }

  function handleNotificationChange(type, value) {
    alertSettings[type] = value;
    saveSettings();
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-base-content">Alert Settings</h1>
  </div>

  <!-- Notification Preferences -->
  <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">Notification Preferences</h2>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Email Notifications</h3>
            <p class="text-sm opacity-70">Receive alerts via email</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.emailNotifications}
            on:change={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Push Notifications</h3>
            <p class="text-sm opacity-70">Receive push notifications on your device</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.pushNotifications}
            on:change={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">SMS Notifications</h3>
            <p class="text-sm opacity-70">Receive alerts via SMS</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.smsNotifications}
            on:change={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Sound Alerts</h3>
            <p class="text-sm opacity-70">Play sound for notifications</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.soundEnabled}
            on:change={(e) => handleNotificationChange('soundEnabled', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Vibration</h3>
            <p class="text-sm opacity-70">Vibrate device for notifications</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.vibrationEnabled}
            on:change={(e) => handleNotificationChange('vibrationEnabled', e.target.checked)}
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Quiet Hours -->
  <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">Quiet Hours</h2>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Enable Quiet Hours</h3>
            <p class="text-sm opacity-70">Disable notifications during specified hours</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.quietHours.enabled}
            on:change={(e) => {
              alertSettings.quietHours.enabled = e.target.checked;
              saveSettings();
            }}
          />
        </div>

        {#if alertSettings.quietHours.enabled}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label">
                <span class="label-text">Start Time</span>
              </label>
              <input
                type="time"
                class="input input-bordered w-full bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
                bind:value={alertSettings.quietHours.start}
                on:change={saveSettings}
              />
            </div>
            <div>
              <label class="label">
                <span class="label-text">End Time</span>
              </label>
              <input
                type="time"
                class="input input-bordered w-full bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
                bind:value={alertSettings.quietHours.end}
                on:change={saveSettings}
              />
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Alert Categories -->
  <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">Alert Categories</h2>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Urgent Alerts</h3>
            <p class="text-sm opacity-70">Critical system alerts and emergencies</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.categories.urgent}
            on:change={(e) => handleCategoryChange('urgent', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Maintenance Alerts</h3>
            <p class="text-sm opacity-70">Home maintenance and repair reminders</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.categories.maintenance}
            on:change={(e) => handleCategoryChange('maintenance', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Reminders</h3>
            <p class="text-sm opacity-70">Personal and family reminders</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.categories.reminders}
            on:change={(e) => handleCategoryChange('reminders', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">Family Alerts</h3>
            <p class="text-sm opacity-70">Family-related notifications</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.categories.family}
            on:change={(e) => handleCategoryChange('family', e.target.checked)}
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold">General Alerts</h3>
            <p class="text-sm opacity-70">General system notifications</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            bind:checked={alertSettings.categories.general}
            on:change={(e) => handleCategoryChange('general', e.target.checked)}
          />
        </div>
      </div>
    </div>
  </div>
</div>