<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _, isLoading } from "svelte-i18n";
  import { generateUserAvatar, generateFallbackAvatar } from "../utils/avatar.js";
  import { users, menuItems } from "../data/dashboard.js";
  import { navigate, currentRoute } from "../router.js";
  import { motionInView, staggerAnimate } from "../utils/motion.js";

  export let isOpen = false;

  let sidebarElement;
  let menuItemsElements = [];
  // Track expanded submenus
  let expandedMenus = {
    auth: false,
  };

  // Create translated menu items with fallbacks
  $: translatedMenuItems = [
    { path: "/", icon: "heroicons:home", name: $isLoading ? "Home" : $_("navigation.home"), color: "text-blue-400 glow-blue" },
    { path: "/users", icon: "heroicons:users", name: $isLoading ? "Users" : $_("navigation.users"), color: "text-green-400 glow-green" },
    { path: "/products", icon: "heroicons:cube", name: $isLoading ? "Products" : $_("navigation.products"), color: "text-purple-400 glow-purple" },
    { path: "/analytics", icon: "heroicons:chart-bar", name: $isLoading ? "Analytics" : $_("navigation.analytics"), color: "text-yellow-400 glow-yellow" },
    { path: "/charts", icon: "heroicons:presentation-chart-line", name: $isLoading ? "Charts" : $_("navigation.charts"), color: "text-pink-400 glow-pink" },
    { path: "/projects", icon: "heroicons:view-columns", name: $isLoading ? "Projects" : $_("navigation.projects"), color: "text-indigo-400 glow-indigo" },
    { path: "/gantt", icon: "heroicons:calendar", name: $isLoading ? "Gantt" : "Gantt", color: "text-red-400 glow-red" },
    { path: "/maps", icon: "heroicons:map", name: $isLoading ? "Maps" : $_("navigation.maps"), color: "text-teal-400 glow-teal" },
    { path: "/schedule", icon: "heroicons:calendar-days", name: $isLoading ? "Schedule" : $_("navigation.schedule"), color: "text-orange-400 glow-orange" },
    { path: "/profile", icon: "heroicons:user-circle", name: $isLoading ? "Profile" : $_("navigation.profile"), color: "text-cyan-400 glow-cyan" },
    { path: "/settings", icon: "heroicons:cog-6-tooth", name: $isLoading ? "Settings" : $_("navigation.settings"), color: "text-gray-400 glow-gray" },
    { path: "/family-calendar", icon: "heroicons:calendar-days", name: "Family Calendar", color: "text-emerald-400 glow-emerald" },
    { path: "/family-calendar-modern", icon: "heroicons:calendar-days", name: "Calendar (Modern)", color: "text-violet-400 glow-violet" },
    { path: "/family-todo", icon: "heroicons:check-circle", name: "Family To-Do", color: "text-lime-400 glow-lime" },
    { path: "/family-map", icon: "heroicons:map-pin", name: "Family Map", color: "text-rose-400 glow-rose" },
    { path: "/family-notes", icon: "heroicons:document-text", name: "Family Notes", color: "text-amber-400 glow-amber" },
    { path: "/family-notes-modern", icon: "heroicons:document-text", name: "Notes (Modern)", color: "text-sky-400 glow-sky" },
    { path: "/family-notifications", icon: "heroicons:bell", name: "Family Notifications", color: "text-fuchsia-400 glow-fuchsia" },
    { path: "/reminders", icon: "heroicons:bell-alert", name: "Smart Reminders", color: "text-stone-400 glow-stone" },
  ];

  // Create authentication submenu
  $: authSubmenu = {
    title: $isLoading ? "Authentication" : $_("navigation.authentication"),
    icon: "heroicons:lock-closed",
    items: [
      {
        title: $isLoading ? "Login V1" : $_("navigation.login_v1"),
        path: "/auth/login",
        icon: "heroicons:arrow-right-on-rectangle",
      },
      {
        title: $isLoading ? "Login V2" : $_("navigation.login_v2"),
        path: "/auth/login-v2",
        icon: "heroicons:arrow-right-on-rectangle",
      },
      {
        title: $isLoading ? "Login V3" : $_("navigation.login_v3"),
        path: "/auth/login-v3",
        icon: "heroicons:arrow-right-on-rectangle",
      },
      {
        title: $isLoading ? "Register V1" : $_("navigation.register_v1"),
        path: "/auth/register",
        icon: "heroicons:user-plus",
      },
      {
        title: $isLoading ? "Register V2" : $_("navigation.register_v2"),
        path: "/auth/register-v2",
        icon: "heroicons:user-plus",
      },
      {
        title: $isLoading ? "Register V3" : $_("navigation.register_v3"),
        path: "/auth/register-v3",
        icon: "heroicons:user-plus",
      },
    ],
  };

  onMount(() => {
    // Animate menu items on mount
    if (menuItemsElements.length > 0) {
      staggerAnimate(menuItemsElements, "fadeInLeft", { delay: 0.1 });
    }

    // Auto-expand authentication submenu if we're on an auth page
    if ($currentRoute.startsWith("/auth/")) {
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
    return submenu.some((item) => item.path === $currentRoute);
  }

  // Add logout function
  function handleLogout() {
    // Array of login version paths
    const loginPaths = ["/auth/login", "/auth/login-v2", "/auth/login-v3"];

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
  <div class="fixed inset-0 z-40 bg-neutral bg-opacity-75 lg:hidden transition-opacity duration-300" on:click={closeSidebar}></div>
{/if}

<!-- Sidebar -->
<div class="fixed inset-y-0 left-0 z-50 w-64 backdrop-blur-xl bg-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 {isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col h-full border-r border-white/10">
  <!-- Logo section -->
  <div class="flex items-center justify-center h-16 px-6 flex-shrink-0">
    <div class="flex items-center space-x-3">
      <div class="relative">
        <Icon icon="heroicons:home" class="w-6 h-6 text-blue-500 animate-pulse glow-blue" />
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce glow-purple"></div>
      </div>
      <div class="flex items-center">
        <span class="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse whitespace-nowrap"> Home Manager </span>
      </div>
    </div>
  </div>

  <!-- Navigation section - takes up remaining space -->
  <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
    {#each translatedMenuItems as item, index}
      <a bind:this={menuItemsElements[index]} href={item.path} class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 {$currentRoute === item.path ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-white/70 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'}" on:click|preventDefault={() => handleMenuClick(item.path)} use:motionInView={{ animation: "fadeInLeft", delay: index * 0.1 }}>
        <Icon icon={item.icon} class="w-5 h-5 mr-3 {item.color}" />
        {item.name}
        {#if $currentRoute === item.path}
          <div class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
        {/if}
      </a>
    {/each}

    <!-- Authentication submenu -->
    <div class="mt-6">
      <div class="text-xs font-medium text-white/50 uppercase px-4 mb-2">
        {$isLoading ? "Account" : $_("navigation.account")}
      </div>
      <div class="submenu">
        <button class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 {isSubmenuActive(authSubmenu.items) ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-white/70 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'}" on:click={() => toggleSubmenu("auth")}>
          <div class="flex items-center">
            <Icon icon={authSubmenu.icon} class="w-5 h-5 mr-3 text-gray-400 glow-gray" />
            {authSubmenu.title}
          </div>
          <Icon icon={expandedMenus.auth ? "heroicons:chevron-down" : "heroicons:chevron-right"} class="w-4 h-4 transition-transform text-white/70" />
        </button>

        {#if expandedMenus.auth}
          <div class="ml-4 pl-4 border-l border-white/20 mt-1 space-y-1">
            {#each authSubmenu.items as subitem}
              <a href={subitem.path} class="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 {$currentRoute === subitem.path ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-white/70 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'}" on:click|preventDefault={() => handleMenuClick(subitem.path)}>
                <Icon icon={subitem.icon} class="w-4 h-4 mr-3 text-gray-400 glow-gray" />
                {subitem.title}
                {#if $currentRoute === subitem.path}
                  <div class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {/if}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </nav>

  <!-- User section - always at bottom -->
  <div class="border-t border-white/10 p-4 flex-shrink-0 mt-auto backdrop-blur-sm">
    <div class="flex items-center">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" class="w-10 h-10 rounded-full object-cover bg-white/10 backdrop-blur-sm" />
      <div class="ml-3 flex-1 min-w-0">
        <p class="text-sm font-medium text-white truncate">John Doe</p>
        <p class="text-xs text-white/60 truncate">john.doe@example.com</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="p-1.5 rounded-md text-white/60 hover:text-red-400 hover:bg-red-400/20 transition-all duration-300 backdrop-blur-sm" on:click={handleLogout} title={$_("common.logout")}>
          <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
        <button class="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
          <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Glow effects for colorful icons */
  .glow-blue {
    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6));
  }
  .glow-green {
    filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.6));
  }
  .glow-purple {
    filter: drop-shadow(0 0 6px rgba(147, 51, 234, 0.6));
  }
  .glow-yellow {
    filter: drop-shadow(0 0 6px rgba(234, 179, 8, 0.6));
  }
  .glow-pink {
    filter: drop-shadow(0 0 6px rgba(236, 72, 153, 0.6));
  }
  .glow-indigo {
    filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.6));
  }
  .glow-red {
    filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.6));
  }
  .glow-teal {
    filter: drop-shadow(0 0 6px rgba(20, 184, 166, 0.6));
  }
  .glow-orange {
    filter: drop-shadow(0 0 6px rgba(249, 115, 22, 0.6));
  }
  .glow-cyan {
    filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.6));
  }
  .glow-gray {
    filter: drop-shadow(0 0 6px rgba(156, 163, 175, 0.6));
  }
  .glow-emerald {
    filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.6));
  }
  .glow-violet {
    filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.6));
  }
  .glow-lime {
    filter: drop-shadow(0 0 6px rgba(132, 204, 22, 0.6));
  }
  .glow-rose {
    filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.6));
  }
  .glow-amber {
    filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6));
  }
  .glow-sky {
    filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.6));
  }
  .glow-fuchsia {
    filter: drop-shadow(0 0 6px rgba(217, 70, 239, 0.6));
  }
  .glow-stone {
    filter: drop-shadow(0 0 6px rgba(120, 113, 108, 0.6));
  }
</style>
