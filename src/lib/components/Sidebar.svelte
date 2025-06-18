<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';
  import { generateUserAvatar, generateFallbackAvatar } from '../utils/avatar.js';
  import { users, menuItems } from '../data/dashboard.js';
  import { navigate, route } from '../router.js';
  import { motionInView, staggerAnimate } from '../utils/motion.js';
  
  export let isOpen = false;
  
  let sidebarElement;
  let menuItemsElements = [];
  
  // Create translated menu items
  $: translatedMenuItems = [
    { path: '/', icon: 'heroicons:home', name: $_('navigation.home') },
    { path: '/users', icon: 'heroicons:users', name: $_('navigation.users') },
    { path: '/products', icon: 'heroicons:cube', name: $_('navigation.products') },
    { path: '/analytics', icon: 'heroicons:chart-bar', name: $_('navigation.analytics') },
    { path: '/settings', icon: 'heroicons:cog-6-tooth', name: $_('navigation.settings') }
  ];
  
  onMount(() => {
    // Animate menu items on mount
    if (menuItemsElements.length > 0) {
      staggerAnimate(menuItemsElements, 'fadeInLeft', { delay: 0.1 });
    }
  });
  
  function closeSidebar() {
    // Optionally close sidebar on mobile
    isOpen = false;
  }
  
  // Check if a menu item is active based on current route
  function isActive(itemPath) {
    return $route === itemPath;
  }
  
  // Handle menu item click with animation
  function handleMenuClick(path) {
    navigate(path);
    closeSidebar();
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
<div class="fixed inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 {isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col">
  <div class="flex items-center justify-center h-16 px-6 border-b border-base-300 flex-shrink-0">
    <img src="/logo.svg" alt="Logo" class="w-32 h-32">
  </div>
  
  <nav class="flex-1 px-4 py-6 space-y-2 dropdown-scroll">
    {#each translatedMenuItems as item, index}
      <a
        bind:this={menuItemsElements[index]}
        href={item.path}
        class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 {$route === item.path ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
        on:click|preventDefault={() => handleMenuClick(item.path)}
        use:motionInView={{ animation: 'fadeInLeft', delay: index * 0.1 }}
      >
        <Icon icon={item.icon} class="w-5 h-5 mr-3" />
        {item.name}
        {#if $route === item.path}
          <div class="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
        {/if}
      </a>
    {/each}
  </nav>
  
  <!-- User section -->
  <div class="border-t border-base-300 p-4 flex-shrink-0">
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
      <button class="p-1 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200">
        <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
      </button>
    </div>
  </div>
</div> 