<script>
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion";
  import { _ } from "svelte-i18n";

  // AI Settings
  let aiSettings = {
    voice: "female", // 'male', 'female', 'neutral'
    wakeWords: ["சிவோ", "shivo", "hey shivo", "ai", "assistant"],
    autoWake: false,
    language: "ta-IN",
    responseStyle: "helpful", // 'helpful', 'concise', 'detailed'
    emotionDetection: true,
  };

  // Computed property for wake words string
  $: aiSettings.wakeWordsString = aiSettings.wakeWords.join(", ");
  $: aiSettings.wakeWords = aiSettings.wakeWordsString ? aiSettings.wakeWordsString.split(",").map((w) => w.trim()) : [];

  // Profile Settings
  let profileSettings = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: $_("users.admin"),
    timezone: "UTC-5",
  };

  // Notification Settings
  let notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    reminderNotifications: true,
    familyUpdates: true,
    systemAlerts: true,
  };

  // Security Settings
  let securitySettings = {
    twoFactorAuth: false,
    biometricAuth: true,
    autoLock: true,
    sessionTimeout: 30, // minutes
    passwordChangeReminder: true,
  };

  // Display Settings
  let displaySettings = {
    theme: "auto", // 'light', 'dark', 'auto'
    language: "en",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    currency: "INR",
  };

  // Timezone options
  const timezoneOptions = [
    { value: "UTC-12", label: "UTC-12 (Baker Island)" },
    { value: "UTC-11", label: "UTC-11 (American Samoa)" },
    { value: "UTC-10", label: "UTC-10 (Hawaii)" },
    { value: "UTC-9", label: "UTC-9 (Alaska)" },
    { value: "UTC-8", label: "UTC-8 (Pacific)" },
    { value: "UTC-7", label: "UTC-7 (Mountain)" },
    { value: "UTC-6", label: "UTC-6 (Central)" },
    { value: "UTC-5", label: "UTC-5 (Eastern)" },
    { value: "UTC-4", label: "UTC-4 (Atlantic)" },
    { value: "UTC-3", label: "UTC-3 (Argentina)" },
    { value: "UTC-2", label: "UTC-2 (South Georgia)" },
    { value: "UTC-1", label: "UTC-1 (Azores)" },
    { value: "UTC+0", label: "UTC+0 (London)" },
    { value: "UTC+1", label: "UTC+1 (Berlin)" },
    { value: "UTC+2", label: "UTC+2 (Cairo)" },
    { value: "UTC+3", label: "UTC+3 (Moscow)" },
    { value: "UTC+4", label: "UTC+4 (Dubai)" },
    { value: "UTC+5", label: "UTC+5 (Karachi)" },
    { value: "UTC+5:30", label: "UTC+5:30 (India)" },
    { value: "UTC+6", label: "UTC+6 (Dhaka)" },
    { value: "UTC+7", label: "UTC+7 (Bangkok)" },
    { value: "UTC+8", label: "UTC+8 (Singapore)" },
    { value: "UTC+9", label: "UTC+9 (Tokyo)" },
    { value: "UTC+10", label: "UTC+10 (Sydney)" },
    { value: "UTC+11", label: "UTC+11 (Solomon Islands)" },
    { value: "UTC+12", label: "UTC+12 (Fiji)" },
  ];

  // Language options
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ta", label: "தமிழ் (Tamil)" },
    { value: "hi", label: "हिंदी (Hindi)" },
    { value: "te", label: "తెలుగు (Telugu)" },
    { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { value: "ml", label: "മലയാളം (Malayalam)" },
  ];

  // Active section
  let activeSection = "ai";

  // Functions
  function saveSettings() {
    // Save settings logic here
    console.log("Settings saved");
  }

  function resetSettings() {
    // Reset to defaults
    console.log("Settings reset");
  }

  function exportSettings() {
    // Export settings as JSON
    const settings = {
      ai: aiSettings,
      profile: profileSettings,
      notifications: notificationSettings,
      security: securitySettings,
      display: displaySettings,
    };

    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "shivo-settings.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  function importSettings() {
    // Import settings from file
    console.log("Import settings");
  }
</script>

<main class="settings-container">
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {$_("settings.title")}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {$_("settings.subtitle")}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <nav class="space-y-2">
            <button class="w-full text-left px-4 py-3 rounded-lg transition-colors {activeSection === 'ai' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}" on:click={() => (activeSection = "ai")}>
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:cpu-chip" class="w-5 h-5" />
                <span>{$_("settings.ai_assistant")}</span>
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg transition-colors {activeSection === 'profile' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}" on:click={() => (activeSection = "profile")}>
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:user" class="w-5 h-5" />
                <span>{$_("settings.profile")}</span>
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg transition-colors {activeSection === 'notifications' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}" on:click={() => (activeSection = "notifications")}>
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:bell" class="w-5 h-5" />
                <span>{$_("settings.notifications")}</span>
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg transition-colors {activeSection === 'security' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}" on:click={() => (activeSection = "security")}>
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:shield-check" class="w-5 h-5" />
                <span>{$_("settings.security")}</span>
              </div>
            </button>

            <button class="w-full text-left px-4 py-3 rounded-lg transition-colors {activeSection === 'display' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}" on:click={() => (activeSection = "display")}>
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:computer-desktop" class="w-5 h-5" />
                <span>{$_("settings.display")}</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <!-- AI Assistant Settings -->
        {#if activeSection === "ai"}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6" use:motionInView>
            <div class="flex items-center space-x-3 mb-6">
              <Icon icon="heroicons:cpu-chip" class="w-6 h-6 text-blue-600" />
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {$_("settings.ai_assistant")}
              </h2>
            </div>

            <div class="space-y-6">
              <!-- Voice Settings -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {$_("settings.voice_settings")}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.voice")}
                    </label>
                    <select bind:value={aiSettings.voice} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="female">{$_("settings.female")}</option>
                      <option value="male">{$_("settings.male")}</option>
                      <option value="neutral">{$_("settings.neutral")}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.language")}
                    </label>
                    <select bind:value={aiSettings.language} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="ta-IN">தமிழ் (Tamil)</option>
                      <option value="en-IN">English (India)</option>
                      <option value="hi-IN">हिंदी (Hindi)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Wake Words -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {$_("settings.wake_words")}
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.wake_words_list")}
                    </label>
                    <input type="text" bind:value={aiSettings.wakeWordsString} placeholder={$_("settings.wake_words_placeholder")} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {$_("settings.wake_words_help")}
                    </p>
                  </div>
                  <div class="flex items-center space-x-3">
                    <input type="checkbox" id="autoWake" bind:checked={aiSettings.autoWake} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="autoWake" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$_("settings.auto_wake")}
                    </label>
                  </div>
                </div>
              </div>

              <!-- Response Settings -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {$_("settings.response_settings")}
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.response_style")}
                    </label>
                    <select bind:value={aiSettings.responseStyle} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="helpful">{$_("settings.helpful")}</option>
                      <option value="concise">{$_("settings.concise")}</option>
                      <option value="detailed">{$_("settings.detailed")}</option>
                    </select>
                  </div>
                  <div class="flex items-center space-x-3">
                    <input type="checkbox" id="emotionDetection" bind:checked={aiSettings.emotionDetection} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="emotionDetection" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$_("settings.emotion_detection")}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Profile Settings -->
        {#if activeSection === "profile"}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6" use:motionInView>
            <div class="flex items-center space-x-3 mb-6">
              <Icon icon="heroicons:user" class="w-6 h-6 text-green-600" />
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {$_("settings.profile")}
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.full_name")}
                </label>
                <input type="text" bind:value={profileSettings.name} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.email")}
                </label>
                <input type="email" bind:value={profileSettings.email} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.role")}
                </label>
                <input type="text" bind:value={profileSettings.role} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.timezone")}
                </label>
                <select bind:value={profileSettings.timezone} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  {#each timezoneOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        {/if}

        <!-- Notification Settings -->
        {#if activeSection === "notifications"}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6" use:motionInView>
            <div class="flex items-center space-x-3 mb-6">
              <Icon icon="heroicons:bell" class="w-6 h-6 text-yellow-600" />
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {$_("settings.notifications")}
              </h2>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.email_notifications")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.email_notifications_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={notificationSettings.emailNotifications} class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.push_notifications")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.push_notifications_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={notificationSettings.pushNotifications} class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.sms_notifications")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.sms_notifications_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={notificationSettings.smsNotifications} class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.reminder_notifications")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.reminder_notifications_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={notificationSettings.reminderNotifications} class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.family_updates")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.family_updates_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={notificationSettings.familyUpdates} class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.system_alerts")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.system_alerts_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={notificationSettings.systemAlerts} class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
            </div>
          </div>
        {/if}

        <!-- Security Settings -->
        {#if activeSection === "security"}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6" use:motionInView>
            <div class="flex items-center space-x-3 mb-6">
              <Icon icon="heroicons:shield-check" class="w-6 h-6 text-red-600" />
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {$_("settings.security")}
              </h2>
            </div>

            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.two_factor_auth")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.two_factor_auth_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={securitySettings.twoFactorAuth} class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.biometric_auth")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.biometric_auth_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={securitySettings.biometricAuth} class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.auto_lock")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.auto_lock_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={securitySettings.autoLock} class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.session_timeout")}
                </label>
                <select bind:value={securitySettings.sessionTimeout} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value={15}>15 {$_("common.minutes")}</option>
                  <option value={30}>30 {$_("common.minutes")}</option>
                  <option value={60}>1 {$_("common.hour")}</option>
                  <option value={120}>2 {$_("common.hours")}</option>
                </select>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    {$_("settings.password_reminder")}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {$_("settings.password_reminder_desc")}
                  </p>
                </div>
                <input type="checkbox" bind:checked={securitySettings.passwordChangeReminder} class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
            </div>
          </div>
        {/if}

        <!-- Display Settings -->
        {#if activeSection === "display"}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6" use:motionInView>
            <div class="flex items-center space-x-3 mb-6">
              <Icon icon="heroicons:computer-desktop" class="w-6 h-6 text-purple-600" />
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {$_("settings.display")}
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.theme")}
                </label>
                <select bind:value={displaySettings.theme} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="light">{$_("settings.light")}</option>
                  <option value="dark">{$_("settings.dark")}</option>
                  <option value="auto">{$_("settings.auto")}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.language")}
                </label>
                <select bind:value={displaySettings.language} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  {#each languageOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.date_format")}
                </label>
                <select bind:value={displaySettings.dateFormat} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.time_format")}
                </label>
                <select bind:value={displaySettings.timeFormat} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="12h">12 {$_("common.hour")}</option>
                  <option value="24h">24 {$_("common.hour")}</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.currency")}
                </label>
                <select bind:value={displaySettings.currency} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="INR">₹ {$_("settings.indian_rupee")}</option>
                  <option value="USD">$ {$_("settings.us_dollar")}</option>
                  <option value="EUR">€ {$_("settings.euro")}</option>
                </select>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 flex flex-wrap gap-4 justify-center" use:motionInView>
      <button on:click={saveSettings} class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium" use:motionHover>
        <Icon icon="heroicons:check" class="w-5 h-5 inline mr-2" />
        {$_("settings.save_settings")}
      </button>

      <button on:click={resetSettings} class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium" use:motionHover>
        <Icon icon="heroicons:arrow-path" class="w-5 h-5 inline mr-2" />
        {$_("settings.reset_settings")}
      </button>

      <button on:click={exportSettings} class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium" use:motionHover>
        <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5 inline mr-2" />
        {$_("settings.export_settings")}
      </button>

      <button on:click={importSettings} class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium" use:motionHover>
        <Icon icon="heroicons:arrow-up-tray" class="w-5 h-5 inline mr-2" />
        {$_("settings.import_settings")}
      </button>
    </div>
  </div>
</main>

<style>
  .settings-container {
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
</style>
