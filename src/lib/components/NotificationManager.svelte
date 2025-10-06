<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { notificationService } from "../services/notificationService.js";
  import { familyMembers } from "../data/family.js";

  let notifications = [];
  let preferences = {};
  let showSettings = false;
  let testMemberId = "";
  let testType = "sms";

  onMount(() => {
    preferences = notificationService.getPreferences();
    loadNotificationHistory();
  });

  function loadNotificationHistory() {
    notifications = notificationService.getNotificationHistory(30);
  }

  function toggleSetting(key) {
    preferences[key] = !preferences[key];
    notificationService.updatePreferences(preferences);
  }

  function updateReminderDays(event) {
    const days = event.target.value
      .split(",")
      .map((d) => parseInt(d.trim()))
      .filter((d) => !isNaN(d));
    preferences.reminderDaysBefore = days;
    notificationService.updatePreferences(preferences);
  }

  async function sendTestNotification() {
    if (!testMemberId) {
      alert("Please select a family member first");
      return;
    }

    try {
      const result = await notificationService.testNotification(parseInt(testMemberId), testType);
      alert(`Test ${testType.toUpperCase()} sent successfully!`);
      loadNotificationHistory();
    } catch (error) {
      alert(`Failed to send test notification: ${error.message}`);
    }
  }

  async function sendFamilyUpdate() {
    try {
      for (const member of familyMembers) {
        await notificationService.sendManualReminder("family_update", [member.id]);
      }
      alert("Family update sent to all members!");
      loadNotificationHistory();
    } catch (error) {
      alert(`Failed to send family update: ${error.message}`);
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString("en-IN");
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Notification Manager</h1>
      <p class="text-gray-600">Manage family reminders and communication preferences</p>
    </div>
    <div class="flex space-x-3">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2" on:click={sendFamilyUpdate}>
        <Icon icon="heroicons:megaphone" class="w-4 h-4" />
        <span>Send Family Update</span>
      </button>
      <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2" on:click={() => (showSettings = !showSettings)}>
        <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4" />
        <span>Settings</span>
      </button>
    </div>
  </div>

  <!-- Notification Preferences -->
  {#if showSettings}
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Notification Preferences</h2>
      </div>
      <div class="p-6 space-y-6">
        <!-- Notification Methods -->
        <div>
          <h3 class="text-md font-medium text-gray-900 mb-4">Notification Methods</h3>
          <div class="space-y-3">
            <label class="flex items-center">
              <input type="checkbox" checked={preferences.enableSMS} on:change={() => toggleSetting("enableSMS")} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">SMS Notifications</div>
                <div class="text-sm text-gray-500">Send payment reminders via SMS</div>
              </div>
            </label>

            <label class="flex items-center">
              <input type="checkbox" checked={preferences.enableWhatsApp} on:change={() => toggleSetting("enableWhatsApp")} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">WhatsApp Messages</div>
                <div class="text-sm text-gray-500">Send detailed reminders via WhatsApp</div>
              </div>
            </label>

            <label class="flex items-center">
              <input type="checkbox" checked={preferences.enablePush} on:change={() => toggleSetting("enablePush")} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">Push Notifications</div>
                <div class="text-sm text-gray-500">Browser/app push notifications</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Reminder Timing -->
        <div>
          <h3 class="text-md font-medium text-gray-900 mb-4">Reminder Timing</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Reminder Days Before Due Date </label>
              <input type="text" value={preferences.reminderDaysBefore?.join(", ") || "7, 3, 1"} on:input={updateReminderDays} placeholder="7, 3, 1" class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <p class="text-sm text-gray-500 mt-1">Comma-separated list of days</p>
            </div>

            <label class="flex items-center">
              <input type="checkbox" checked={preferences.overdueReminders} on:change={() => toggleSetting("overdueReminders")} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">Overdue Reminders</div>
                <div class="text-sm text-gray-500">Send reminders for overdue payments</div>
              </div>
            </label>

            <label class="flex items-center">
              <input type="checkbox" checked={preferences.festivalReminders} on:change={() => toggleSetting("festivalReminders")} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">Festival Reminders</div>
                <div class="text-sm text-gray-500">Send festival preparation reminders</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Test Notifications -->
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">Test Notifications</h2>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Family Member</label>
          <select bind:value={testMemberId} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select member</option>
            {#each familyMembers as member}
              <option value={member.id}>{member.avatar} {member.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
          <select bind:value={testType} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        <div class="flex items-end">
          <button class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" on:click={sendTestNotification}> Send Test </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Notification Status -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white rounded-lg p-6 shadow-sm border border-green-100">
      <div class="flex items-center">
        <div class="p-3 bg-green-100 rounded-lg">
          <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-600">SMS Service</p>
          <p class="text-lg font-bold text-green-600">Active</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border border-green-100">
      <div class="flex items-center">
        <div class="p-3 bg-green-100 rounded-lg">
          <Icon icon="simple-icons:whatsapp" class="w-6 h-6 text-green-600" />
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-600">WhatsApp</p>
          <p class="text-lg font-bold text-green-600">Active</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
      <div class="flex items-center">
        <div class="p-3 bg-blue-100 rounded-lg">
          <Icon icon="heroicons:bell" class="w-6 h-6 text-blue-600" />
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-600">Push Notifications</p>
          <p class="text-lg font-bold text-blue-600">Active</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Notifications -->
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Recent Notifications</h2>
        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium" on:click={loadNotificationHistory}> Refresh </button>
      </div>
    </div>
    <div class="p-6">
      {#if notifications.length === 0}
        <div class="text-center py-8">
          <Icon icon="heroicons:bell-slash" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No recent notifications</h3>
          <p class="text-gray-500">Notification history will appear here</p>
        </div>
      {:else}
        <div class="space-y-3">
          {#each notifications.slice(0, 10) as notification}
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:bell" class="w-5 h-5 text-blue-600" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Notification ID: {notification}</p>
                  <p class="text-xs text-gray-500">Sent successfully</p>
                </div>
              </div>
              <span class="text-xs text-gray-500">
                {formatDate(new Date().toISOString())}
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Festival Reminders -->
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">Upcoming Festival Reminders</h2>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        {#each [{ name: "Diwali", date: "2025-10-31", days: 25, icon: "🪔" }, { name: "Pongal", date: "2026-01-14", days: 100, icon: "🌾" }, { name: "Navaratri", date: "2025-10-03", days: -3, icon: "🕉️" }] as festival}
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <span class="text-2xl">{festival.icon}</span>
              <div>
                <h3 class="font-medium text-gray-900">{festival.name}</h3>
                <p class="text-sm text-gray-500">{festival.date}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium {festival.days < 0 ? 'text-red-600' : festival.days < 7 ? 'text-amber-600' : 'text-green-600'}">
                {festival.days < 0 ? `${Math.abs(festival.days)} days ago` : `${festival.days} days away`}
              </p>
              <p class="text-xs text-gray-500">
                {festival.days >= 0 && festival.days <= 7 ? "Reminder will be sent" : ""}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
