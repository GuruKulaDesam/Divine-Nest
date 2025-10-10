<script>
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion";
  import { _ } from "svelte-i18n";
  import { theme, themeActions, THEMES } from "$lib/stores/theme.js";
  import { background, backgroundActions, BACKGROUNDS } from "$lib/stores/background.js";

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

  // Display Settings - bind to actual theme store
  let displaySettings = {
    language: "en",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    currency: "INR",
  };

  // Background options
  const backgroundOptions = [
    {
      value: BACKGROUNDS.TRANSPARENT,
      label: "Transparent",
      description: "Clean, no background image",
      icon: "heroicons:eye-slash",
      preview: "bg-gray-100 dark:bg-gray-800",
    },
    {
      value: BACKGROUNDS.MOUNTAIN,
      label: "Mountain View",
      description: "Scenic mountain landscape",
      icon: "heroicons:mountain",
      preview: "bg-gradient-to-br from-blue-100 to-green-100",
    },
    {
      value: BACKGROUNDS.NATURE,
      label: "Nature Scene",
      description: "Peaceful natural environment",
      icon: "heroicons:tree",
      preview: "bg-gradient-to-br from-green-100 to-blue-100",
    },
    {
      value: BACKGROUNDS.MINIMAL,
      label: "Minimal",
      description: "Simple, clean design",
      icon: "heroicons:square-3-stack-3d",
      preview: "bg-gray-50 dark:bg-gray-900",
    },
  ];

  // Theme options with descriptions and previews
  const themeOptions = [
    {
      value: THEMES.LIGHT,
      label: "Light",
      description: "Clean and bright interface",
      icon: "heroicons:sun",
      preview: "bg-white border-gray-200 text-gray-900",
    },
    {
      value: THEMES.DARK,
      label: "Dark",
      description: "Easy on the eyes at night",
      icon: "heroicons:moon",
      preview: "bg-gray-900 border-gray-700 text-white",
    },
    {
      value: THEMES.MINIMAL,
      label: "Minimal",
      description: "Simplified, distraction-free design",
      icon: "heroicons:minus",
      preview: "bg-gray-50 border-gray-300 text-gray-800",
    },
    {
      value: THEMES.NATURE,
      label: "Nature",
      description: "Inspired by natural colors",
      icon: "heroicons:leaf",
      preview: "bg-green-50 border-green-200 text-green-800",
    },
    {
      value: "modern",
      label: "Modern",
      description: "Contemporary design with gradients",
      icon: "heroicons:sparkles",
      preview: "bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200 text-purple-800",
    },
    {
      value: "ocean",
      label: "Ocean",
      description: "Calming blue tones",
      icon: "heroicons:cloud",
      preview: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      value: "sunset",
      label: "Sunset",
      description: "Warm orange and pink hues",
      icon: "heroicons:sun",
      preview: "bg-orange-50 border-orange-200 text-orange-800",
    },
    {
      value: "forest",
      label: "Forest",
      description: "Earthy green palette",
      icon: "heroicons:tree",
      preview: "bg-emerald-50 border-emerald-200 text-emerald-800",
    },
  ]; // Timezone options
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
                    <label for="voice-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.voice")}
                    </label>
                    <select id="voice-select" bind:value={aiSettings.voice} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                      <option value="female">{$_("settings.female")}</option>
                      <option value="male">{$_("settings.male")}</option>
                      <option value="neutral">{$_("settings.neutral")}</option>
                    </select>
                  </div>
                  <div>
                    <label for="language-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.language")}
                    </label>
                    <select id="language-select" bind:value={aiSettings.language} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
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
                    <label for="wake-words-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.wake_words_list")}
                    </label>
                    <input id="wake-words-input" type="text" bind:value={aiSettings.wakeWordsString} placeholder={$_("settings.wake_words_placeholder")} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
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
                    <label for="response-style-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {$_("settings.response_style")}
                    </label>
                    <select id="response-style-select" bind:value={aiSettings.responseStyle} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
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
                <label for="full-name-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.full_name")}
                </label>
                <input id="full-name-input" type="text" bind:value={profileSettings.name} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label for="email-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.email")}
                </label>
                <input id="email-input" type="email" bind:value={profileSettings.email} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label for="role-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.role")}
                </label>
                <input id="role-input" type="text" bind:value={profileSettings.role} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label for="timezone-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.timezone")}
                </label>
                <select id="timezone-select" bind:value={profileSettings.timezone} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
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
                <label for="session-timeout-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.session_timeout")}
                </label>
                <select id="session-timeout-select" bind:value={securitySettings.sessionTimeout} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
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
              <!-- Theme Selector -->
              <div class="md:col-span-2">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  {$_("settings.theme")}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {#each themeOptions as themeOption}
                    <button class="relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 {themeOption.preview} {$theme === themeOption.value ? 'ring-2 ring-purple-500 border-purple-500' : 'border-gray-200 dark:border-gray-600'}" on:click={() => themeActions.set(themeOption.value)}>
                      <div class="flex flex-col items-center space-y-3">
                        <Icon icon={themeOption.icon} class="w-8 h-8" />
                        <div class="text-center">
                          <h3 class="font-semibold text-sm">{themeOption.label}</h3>
                          <p class="text-xs opacity-75 mt-1">{themeOption.description}</p>
                        </div>
                      </div>
                      {#if $theme === themeOption.value}
                        <div class="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                          <Icon icon="heroicons:check" class="w-3 h-3 text-white" />
                        </div>
                      {/if}
                    </button>
                  {/each}
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Current theme: <span class="font-medium capitalize">{$theme}</span>
                </p>
              </div>

              <!-- Background Selector -->
              <div class="md:col-span-2">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Background</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {#each backgroundOptions as bgOption}
                    <button class="relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 {bgOption.preview} {$background === bgOption.value ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 dark:border-gray-600'}" on:click={() => backgroundActions.set(bgOption.value)}>
                      <div class="flex flex-col items-center space-y-3">
                        <Icon icon={bgOption.icon} class="w-8 h-8" />
                        <div class="text-center">
                          <h3 class="font-semibold text-sm">{bgOption.label}</h3>
                          <p class="text-xs opacity-75 mt-1">{bgOption.description}</p>
                        </div>
                      </div>
                      {#if $background === bgOption.value}
                        <div class="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Icon icon="heroicons:check" class="w-3 h-3 text-white" />
                        </div>
                      {/if}
                    </button>
                  {/each}
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Current background: <span class="font-medium capitalize">{$background}</span>
                </p>
              </div>

              <div>
                <label for="display-language-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.language")}
                </label>
                <select id="display-language-select" bind:value={displaySettings.language} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  {#each languageOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>

              <div>
                <label for="date-format-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.date_format")}
                </label>
                <select id="date-format-select" bind:value={displaySettings.dateFormat} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label for="time-format-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.time_format")}
                </label>
                <select id="time-format-select" bind:value={displaySettings.timeFormat} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="12h">12 {$_("common.hour")}</option>
                  <option value="24h">24 {$_("common.hour")}</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label for="currency-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {$_("settings.currency")}
                </label>
                <select id="currency-select" bind:value={displaySettings.currency} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
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
