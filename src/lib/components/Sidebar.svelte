<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { _, isLoading } from 'svelte-i18n';
  import { generateUserAvatar, generateFallbackAvatar } from '../utils/avatar.js';
  import { users, menuItems } from '../data/dashboard.js';
  import { navigate, currentRoute } from '../router.js';
  import { motionInView, staggerAnimate } from '../utils/motion.js';
  import ThemeLogo from './ThemeLogo.svelte';
  
  export let isOpen = false;
  
  let sidebarElement;
  let menuItemsElements = [];
  // Track expanded submenus
  let expandedMenus = {
    auth: false
  };
  
  // Create translated menu items with fallbacks
  $: translatedMenuItems = [
    { path: '/', icon: 'heroicons:home', name: $isLoading ? 'Home' : $_('navigation.home') },
    { path: '/users', icon: 'heroicons:users', name: $isLoading ? 'Users' : $_('navigation.users') },
    { path: '/products', icon: 'heroicons:cube', name: $isLoading ? 'Products' : $_('navigation.products') },
    { path: '/analytics', icon: 'heroicons:chart-bar', name: $isLoading ? 'Analytics' : $_('navigation.analytics') },
    { path: '/charts', icon: 'heroicons:presentation-chart-line', name: $isLoading ? 'Charts' : $_('navigation.charts') },
    { path: '/projects', icon: 'heroicons:view-columns', name: $isLoading ? 'Projects' : $_('navigation.projects') },
    { path: '/gantt', icon: 'heroicons:calendar', name: $isLoading ? 'Gantt' : 'Gantt' },
    { path: '/maps', icon: 'heroicons:map', name: $isLoading ? 'Maps' : $_('navigation.maps') },
    { path: '/schedule', icon: 'heroicons:calendar-days', name: $isLoading ? 'Schedule' : $_('navigation.schedule') },
    { path: '/profile', icon: 'heroicons:user-circle', name: $isLoading ? 'Profile' : $_('navigation.profile') },
    { path: '/settings', icon: 'heroicons:cog-6-tooth', name: $isLoading ? 'Settings' : $_('navigation.settings') }
  ];
  
  // Create authentication submenu
  $: authSubmenu = {
    title: $isLoading ? 'Authentication' : $_('navigation.authentication'),
    icon: 'heroicons:lock-closed',
    items: [
      { 
        title: $isLoading ? 'Login V1' : $_('navigation.login_v1'), 
        path: '/auth/login', 
        icon: 'heroicons:arrow-right-on-rectangle' 
      },
      { 
        title: $isLoading ? 'Login V2' : $_('navigation.login_v2'), 
        path: '/auth/login-v2', 
        icon: 'heroicons:arrow-right-on-rectangle' 
      },
      { 
        title: $isLoading ? 'Login V3' : $_('navigation.login_v3'), 
        path: '/auth/login-v3', 
        icon: 'heroicons:arrow-right-on-rectangle' 
      },
      { 
        title: $isLoading ? 'Register V1' : $_('navigation.register_v1'), 
        path: '/auth/register', 
        icon: 'heroicons:user-plus' 
      },
      { 
        title: $isLoading ? 'Register V2' : $_('navigation.register_v2'), 
        path: '/auth/register-v2', 
        icon: 'heroicons:user-plus' 
      },
      { 
        title: $isLoading ? 'Register V3' : $_('navigation.register_v3'), 
        path: '/auth/register-v3', 
        icon: 'heroicons:user-plus' 
      }
    ]
  };
  
  onMount(() => {
    // Animate menu items on mount
    if (menuItemsElements.length > 0) {
      staggerAnimate(menuItemsElements, 'fadeInLeft', { delay: 0.1 });
    }
    
    // Auto-expand authentication submenu if we're on an auth page
    if ($currentRoute.startsWith('/auth/')) {
      expandedMenus.auth = true;
    }
  });
  
  function closeSidebar() {
    // Optionally close sidebar on mobile
    isOpen = false;
  }
  
  // Check if a menu item is active based on current route
  function isActive(itemPath) {
    return $currentRoute === itemPath;
  }
  
  // Handle menu item click with animation
  function handleMenuClick(path) {
    navigate(path);
    closeSidebar();
  }
  
  // Toggle submenu expansion
  function toggleSubmenu(key) {
    expandedMenus[key] = !expandedMenus[key];
  }
  
  // Check if a submenu is active
  function isSubmenuActive(submenu) {
    if (!submenu) return false;
    return submenu.some(item => item.path === $currentRoute);
  }
  
  // Add logout function
  function handleLogout() {
    // Array of login version paths
    const loginPaths = [
      '/auth/login',
      '/auth/login-v2',
      '/auth/login-v3'
    ];
    
    // Get random login path
    const randomIndex = Math.floor(Math.random() * loginPaths.length);
    const randomLoginPath = loginPaths[randomIndex];
    
    // Close sidebar first
    closeSidebar();
    
    // Small delay to allow sidebar animation to complete
    setTimeout(() => {
      // Navigate to random login page
      navigate(randomLoginPath);
    }, 150);
  }
</script>

<!-- Mobile backdrop -->
{#if isOpen}
  <div 
    class="fixed inset-0 z-40 bg-neutral bg-opacity-75 lg:hidden transition-opacity duration-300"
    on:click={closeSidebar}
  ></div>
{/if}

<!-- Sidebar -->
<div class="fixed inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 {isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col h-full">
  <!-- Logo section -->
  <div class="flex items-center justify-center h-16 px-6 border-b border-base-300 flex-shrink-0">
    <ThemeLogo width="w-32" height="h-8" alt="Takeka Logo" />
  </div>
  
  <!-- Navigation section - takes up remaining space -->
  <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
    {#each translatedMenuItems as item, index}
      <a
        bind:this={menuItemsElements[index]}
        href={item.path}
        class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {$currentRoute === item.path ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
        on:click|preventDefault={() => handleMenuClick(item.path)}
        use:motionInView={{ animation: 'fadeInLeft', delay: index * 0.1 }}
      >
        <Icon icon={item.icon} class="w-5 h-5 mr-3" />
        {item.name}
        {#if $currentRoute === item.path}
          <div class="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
        {/if}
      </a>
    {/each}
    
    <!-- Authentication submenu -->
    <div class="mt-6">
      <div class="text-xs font-medium text-base-content/50 uppercase px-4 mb-2">
        {$isLoading ? 'Account' : $_('navigation.account')}
      </div>
      <div class="submenu">
        <button 
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {isSubmenuActive(authSubmenu.items) ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
          on:click={() => toggleSubmenu('auth')}
        >
          <div class="flex items-center">
            <Icon icon={authSubmenu.icon} class="w-5 h-5 mr-3" />
            {authSubmenu.title}
          </div>
          <Icon 
            icon={expandedMenus.auth ? 'heroicons:chevron-down' : 'heroicons:chevron-right'} 
            class="w-4 h-4 transition-transform"
          />
        </button>
        
        {#if expandedMenus.auth}
          <div class="ml-4 pl-4 border-l border-base-300 mt-1 space-y-1">
            {#each authSubmenu.items as subitem}
              <a
                href={subitem.path}
                class="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 {$currentRoute === subitem.path ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
                on:click|preventDefault={() => handleMenuClick(subitem.path)}
              >
                <Icon icon={subitem.icon} class="w-4 h-4 mr-3" />
                {subitem.title}
                {#if $currentRoute === subitem.path}
                  <div class="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                {/if}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </nav>
  
  <!-- User section - always at bottom -->
  <div class="border-t border-base-300 p-4 flex-shrink-0 mt-auto">
    <div class="flex items-center">
      <img 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
        alt="User avatar"
        class="w-10 h-10 rounded-full object-cover bg-base-200"
      >
      <div class="ml-3 flex-1 min-w-0">
        <p class="text-sm font-medium text-base-content truncate">John Doe</p>
        <p class="text-xs text-base-content/60 truncate">john.doe@example.com</p>
      </div>
      <div class="flex items-center gap-2">
        <button 
          class="p-1.5 rounded-md text-base-content/60 hover:text-red-600 hover:bg-red-100 transition-colors"
          on:click={handleLogout}
          title={$_('common.logout')}
        >
          <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
        <button class="p-1.5 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200">
          <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div> 