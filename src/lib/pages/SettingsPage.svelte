<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  
  // Settings state
  let profileSettings = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    timezone: 'UTC-5',
    language: 'English'
  };
  
  let notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    weeklyReports: true
  };
  
  let securitySettings = {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true
  };
  
  let displaySettings = {
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
    showAnimations: true
  };
  
  let showThemeSelect = false;
  let showTimezoneSelect = false;
  
  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];
  
  const timezoneOptions = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
    { value: 'UTC-6', label: 'Central Time (UTC-6)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC+0', label: 'UTC' },
    { value: 'UTC+1', label: 'Central European Time (UTC+1)' }
  ];
  
  function toggleThemeSelect() {
    showThemeSelect = !showThemeSelect;
    showTimezoneSelect = false;
  }
  
  function toggleTimezoneSelect() {
    showTimezoneSelect = !showTimezoneSelect;
    showThemeSelect = false;
  }
  
  function selectTheme(value) {
    displaySettings.theme = value;
    showThemeSelect = false;
  }
  
  function selectTimezone(value) {
    profileSettings.timezone = value;
    showTimezoneSelect = false;
  }
  
  function handleSave() {
    // Handle save logic here
    console.log('Settings saved:', { profileSettings, notificationSettings, securitySettings, displaySettings });
  }
  
  function handleReset() {
    // Handle reset logic here
    console.log('Settings reset');
  }
</script>

<div class="space-y-8">
  <!-- Page header -->
  <div class="border-b border-gray-200 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="mt-2 text-sm text-gray-600">Manage your account settings and preferences.</p>
      </div>
      <div class="flex space-x-3">
        <button 
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          on:click={handleReset}
          use:motionHover
        >
          Reset
        </button>
        <button 
          class="btn btn-primary"
          on:click={handleSave}
          use:motionHover
        >
          <Icon icon="heroicons:check" class="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  </div>
  
  <!-- Settings sections -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Profile Settings -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Profile Information -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Icon icon="heroicons:user-circle" class="w-5 h-5 mr-2 text-primary-600" />
          Profile Information
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              bind:value={profileSettings.name}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              bind:value={profileSettings.email}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              bind:value={profileSettings.role}
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <div class="relative">
              <button 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-left bg-white"
                on:click={toggleTimezoneSelect}
              >
                {timezoneOptions.find(opt => opt.value === profileSettings.timezone)?.label || 'Select timezone'}
                <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-2 inline float-right" />
              </button>
              {#if showTimezoneSelect}
                <div class="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-full">
                  {#each timezoneOptions as option}
                    <button 
                      class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 {option.value === profileSettings.timezone ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}"
                      on:click={() => selectTimezone(option.value)}
                    >
                      {option.label}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notification Settings -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Icon icon="heroicons:bell" class="w-5 h-5 mr-2 text-primary-600" />
          Notification Preferences
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p class="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.emailNotifications} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Push Notifications</h3>
              <p class="text-sm text-gray-500">Receive push notifications in browser</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.pushNotifications} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Marketing Emails</h3>
              <p class="text-sm text-gray-500">Receive promotional emails</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.marketingEmails} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Security Alerts</h3>
              <p class="text-sm text-gray-500">Get notified about security events</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.securityAlerts} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Icon icon="heroicons:shield-check" class="w-5 h-5 mr-2 text-primary-600" />
          Security Settings
        </h2>
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
              <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={securitySettings.twoFactorAuth} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <select
              bind:value={securitySettings.sessionTimeout}
              class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
            <select
              bind:value={securitySettings.passwordExpiry}
              class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={180}>6 months</option>
              <option value={365}>1 year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Display Settings -->
    <div class="space-y-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Icon icon="heroicons:computer-desktop" class="w-5 h-5 mr-2 text-primary-600" />
          Display Settings
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <div class="relative">
              <button 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-left bg-white"
                on:click={toggleThemeSelect}
              >
                {themeOptions.find(opt => opt.value === displaySettings.theme)?.label || 'Select theme'}
                <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-2 inline float-right" />
              </button>
              {#if showThemeSelect}
                <div class="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-full">
                  {#each themeOptions as option}
                    <button 
                      class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 {option.value === displaySettings.theme ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}"
                      on:click={() => selectTheme(option.value)}
                    >
                      {option.label}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Compact Mode</h3>
              <p class="text-sm text-gray-500">Reduce spacing for more content</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={displaySettings.compactMode} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Show Animations</h3>
              <p class="text-sm text-gray-500">Enable motion and transitions</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={displaySettings.showAnimations} class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInRight' }}>
        <h2 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Icon icon="heroicons:bolt" class="w-5 h-5 mr-2 text-primary-600" />
          Quick Actions
        </h2>
        <div class="space-y-3">
          <button class="w-full flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200" use:motionHover>
            <Icon icon="heroicons:key" class="w-4 h-4 mr-3 text-gray-400" />
            Change Password
          </button>
          <button class="w-full flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200" use:motionHover>
            <Icon icon="heroicons:device-phone-mobile" class="w-4 h-4 mr-3 text-gray-400" />
            Manage Devices
          </button>
          <button class="w-full flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200" use:motionHover>
            <Icon icon="heroicons:document-text" class="w-4 h-4 mr-3 text-gray-400" />
            Export Data
          </button>
          <button class="w-full flex items-center p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" use:motionHover>
            <Icon icon="heroicons:trash" class="w-4 h-4 mr-3" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</div> 