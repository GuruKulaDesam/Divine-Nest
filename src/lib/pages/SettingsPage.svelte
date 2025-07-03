<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { _ } from 'svelte-i18n';
  
  // Settings state
  let profileSettings = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: $_("users.admin"),
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
    { value: 'light', label: $_("settings.light") },
    { value: 'dark', label: $_("settings.dark") },
    { value: 'auto', label: $_("settings.auto") }
  ];
  
  const timezoneOptions = [
    { value: 'UTC-8', label: $_("settings.pacific_time") },
    { value: 'UTC-7', label: $_("settings.mountain_time") },
    { value: 'UTC-6', label: $_("settings.central_time") },
    { value: 'UTC-5', label: $_("settings.eastern_time") },
    { value: 'UTC+0', label: $_("settings.utc") },
    { value: 'UTC+1', label: $_("settings.central_european_time") }
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
  <!-- Page header with enhanced styling -->
  <div
    class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"
    use:motionInView={{ animation: "fadeInDown" }}
  >
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:cog-6-tooth" class="w-full h-full text-primary" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:adjustments-horizontal" class="w-full h-full text-secondary" />
    </div>

    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">{$_("settings.title")}</h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">{$_("settings.description")}</p>
      </div>
      <div class="flex space-x-3">
        <button 
          class="btn btn-outline shadow-md hover:shadow-lg group relative overflow-hidden"
          on:click={handleReset}
          use:motionHover
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-error to-error/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative flex items-center">
            <div
              class="p-1.5 rounded-lg bg-error-content/20 group-hover:bg-error-content/30 transition-colors duration-300"
            >
              <Icon icon="heroicons:arrow-path" class="w-5 h-5 mr-2" />
            </div>
            {$_("settings.reset")}
          </div>
        </button>
        <button 
          class="btn btn-primary shadow-md hover:shadow-lg group relative overflow-hidden"
          on:click={handleSave}
          use:motionHover
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative flex items-center">
            <div
              class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300"
            >
              <Icon icon="heroicons:check" class="w-4 h-4 mr-2" />
            </div>
            {$_("settings.save_changes")}
          </div>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Settings sections -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Profile Settings -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Profile Information -->
      <div class="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-base-content mb-6 flex items-center">
          <div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3">
            <Icon icon="heroicons:user-circle" class="w-4 h-4 text-primary" />
          </div>
          {$_("settings.profile_information")}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.full_name")}</label>
            <input
              type="text"
              bind:value={profileSettings.name}
              class="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content hover:border-primary/50 transition-colors duration-200"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.email_address")}</label>
            <input
              type="email"
              bind:value={profileSettings.email}
              class="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content hover:border-primary/50 transition-colors duration-200"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.role")}</label>
            <input
              type="text"
              bind:value={profileSettings.role}
              disabled
              class="w-full px-3 py-2 border border-base-300 rounded-lg bg-base-200 text-base-content/60"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.timezone")}</label>
            <div class="relative">
              <button 
                class="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-left bg-base-100 text-base-content hover:border-primary/50 transition-colors duration-200"
                on:click={toggleTimezoneSelect}
              >
                {timezoneOptions.find(opt => opt.value === profileSettings.timezone)?.label || $_("settings.select_timezone")}
                <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-2 inline float-right" />
              </button>
              {#if showTimezoneSelect}
                <div class="absolute top-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 w-full">
                  {#each timezoneOptions as option}
                    <button 
                      class="w-full px-3 py-2 text-left text-sm hover:bg-base-200 {option.value === profileSettings.timezone ? 'bg-primary/10 text-primary' : 'text-base-content'}"
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
      <div class="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-base-content mb-6 flex items-center">
          <div class="w-8 h-8 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
            <Icon icon="heroicons:bell" class="w-4 h-4 text-secondary" />
          </div>
          {$_("settings.notification_preferences")}
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-base-content">{$_("settings.email_notifications")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.email_notifications_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.emailNotifications} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-base-content">{$_("settings.push_notifications")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.push_notifications_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.pushNotifications} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-base-content">{$_("settings.marketing_emails")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.marketing_emails_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.marketingEmails} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-base-content">{$_("settings.security_alerts")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.security_alerts_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={notificationSettings.securityAlerts} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div class="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInLeft' }}>
        <h2 class="text-lg font-semibold text-base-content mb-6 flex items-center">
          <div class="w-8 h-8 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mr-3">
            <Icon icon="heroicons:shield-check" class="w-4 h-4 text-accent" />
          </div>
          {$_("settings.security_settings")}
        </h2>
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-base-content">{$_("settings.two_factor_auth")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.two_factor_auth_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={securitySettings.twoFactorAuth} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.session_timeout")}</label>
            <select
              bind:value={securitySettings.sessionTimeout}
              class="w-full md:w-48 px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content hover:border-primary/50 transition-colors duration-200"
            >
              <option value={15}>15 {$_("settings.minutes")}</option>
              <option value={30}>30 {$_("settings.minutes")}</option>
              <option value={60}>1 {$_("settings.hours")}</option>
              <option value={120}>2 {$_("settings.hours")}</option>
              <option value={480}>8 {$_("settings.hours")}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.password_expiry")}</label>
            <select
              bind:value={securitySettings.passwordExpiry}
              class="w-full md:w-48 px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content hover:border-primary/50 transition-colors duration-200"
            >
              <option value={30}>30 {$_("settings.days")}</option>
              <option value={60}>60 {$_("settings.days")}</option>
              <option value={90}>90 {$_("settings.days")}</option>
              <option value={180}>6 {$_("settings.months")}</option>
              <option value={365}>1 {$_("settings.year")}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Display Settings -->
    <div class="space-y-6">
      <div class="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInRight' }}>
        <h2 class="text-lg font-semibold text-base-content mb-6 flex items-center">
          <div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
            <Icon icon="heroicons:computer-desktop" class="w-4 h-4 text-primary" />
          </div>
          {$_("settings.display_settings")}
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">{$_("settings.theme")}</label>
            <div class="relative">
              <button 
                class="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-left bg-base-100 text-base-content hover:border-primary/50 transition-colors duration-200"
                on:click={toggleThemeSelect}
              >
                {themeOptions.find(opt => opt.value === displaySettings.theme)?.label || $_("settings.select_theme")}
                <Icon icon="heroicons:chevron-down" class="w-4 h-4 ml-2 inline float-right" />
              </button>
              {#if showThemeSelect}
                <div class="absolute top-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 w-full">
                  {#each themeOptions as option}
                    <button 
                      class="w-full px-3 py-2 text-left text-sm hover:bg-base-200 {option.value === displaySettings.theme ? 'bg-primary/10 text-primary' : 'text-base-content'}"
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
              <h3 class="text-sm font-medium text-base-content">{$_("settings.compact_mode")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.compact_mode_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={displaySettings.compactMode} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-base-content">{$_("settings.show_animations")}</h3>
              <p class="text-sm text-base-content/60">{$_("settings.show_animations_desc")}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={displaySettings.showAnimations} class="sr-only peer">
              <div class="w-11 h-6 bg-base-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-base-100 rounded-xl shadow-md border border-base-300 p-6 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInRight' }}>
        <h2 class="text-lg font-semibold text-base-content mb-6 flex items-center">
          <div class="w-8 h-8 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
            <Icon icon="heroicons:bolt" class="w-4 h-4 text-secondary" />
          </div>
          {$_("settings.quick_actions")}
        </h2>
        <div class="space-y-3">
          <button class="w-full flex items-center p-3 text-sm text-base-content hover:bg-primary hover:text-white rounded-lg transition-all duration-200 group" use:motionHover>
            <div class="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
              <Icon icon="heroicons:key" class="w-3 h-3 text-primary group-hover:text-white" />
            </div>
            {$_("settings.change_password")}
          </button>
          <button class="w-full flex items-center p-3 text-sm text-base-content hover:bg-secondary hover:text-white rounded-lg transition-all duration-200 group" use:motionHover>
            <div class="w-6 h-6 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
              <Icon icon="heroicons:device-phone-mobile" class="w-3 h-3 text-secondary group-hover:text-white" />
            </div>
            {$_("settings.manage_devices")}
          </button>
          <button class="w-full flex items-center p-3 text-sm text-base-content hover:bg-accent hover:text-white rounded-lg transition-all duration-200 group" use:motionHover>
            <div class="w-6 h-6 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
              <Icon icon="heroicons:document-text" class="w-3 h-3 text-accent group-hover:text-white" />
            </div>
            {$_("settings.export_data")}
          </button>
          <button class="w-full flex items-center p-3 text-sm text-error hover:bg-error hover:text-white rounded-lg transition-all duration-200 group" use:motionHover>
            <div class="w-6 h-6 bg-gradient-to-br from-error/20 to-error/30 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
              <Icon icon="heroicons:trash" class="w-3 h-3 text-error group-hover:text-white" />
            </div>
            {$_("settings.delete_account")}
          </button>
        </div>
      </div>
    </div>
  </div>
</div> 