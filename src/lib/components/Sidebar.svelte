<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _, isLoading } from "svelte-i18n";
  import { generateUserAvatar, generateFallbackAvatar } from "../utils/avatar.js";
  import { users, menuItems } from "../data/dashboard.js";
  import { navigate, currentRoute } from "../router.js";
  import { motionInView, staggerAnimate } from "../utils/motion.js";
  import { theme } from "../stores/theme.js";

  export let isOpen = false;

  let sidebarElement;
  let menuItemsElements = [];
  // Track expanded submenus
  let expandedMenus = {
    home: false,
    projects: false,
    settings: false,
  };

  // Create organized menu sections - simplified to three main sections
  $: menuSections = [
    {
      key: "home",
      title: "Home",
      icon: "heroicons:home",
      items: [
        { path: "/", icon: "heroicons:home", name: "Dashboard", color: "text-blue-400" },
        { path: "/v1-home", icon: "heroicons:home-modern", name: "Family Home", color: "text-orange-500" },
        { path: "/v1-education", icon: "heroicons:academic-cap", name: "Education", color: "text-indigo-500" },
        { path: "/v1-meals", icon: "heroicons:utensils", name: "Meals", color: "text-orange-500" },
        { path: "/v1-recipes", icon: "heroicons:book-open", name: "Recipes", color: "text-red-500" },
        { path: "/v1-rituals", icon: "heroicons:sparkles", name: "Rituals", color: "text-orange-600" },
        { path: "/v1-wellness", icon: "heroicons:heart", name: "Wellness", color: "text-green-600" },
        { path: "/v1-lifeflow", icon: "heroicons:wave-sine", name: "Life Flow", color: "text-blue-500" },
        { path: "/v1-directory", icon: "heroicons:building-storefront", name: "Directory", color: "text-gray-600" },
        { path: "/family-calendar-modern", icon: "heroicons:calendar-days", name: "Calendar", color: "text-violet-400" },
        { path: "/family-notes-modern", icon: "heroicons:document-text", name: "Notes", color: "text-sky-400" },
        { path: "/reminders", icon: "heroicons:bell-alert", name: "Reminders", color: "text-stone-400" },
        { path: "/requests", icon: "heroicons:wrench-screwdriver", name: "Requests", color: "text-amber-500" },
      ],
    },
    {
      key: "projects",
      title: "Projects",
      icon: "heroicons:view-columns",
      items: [
        { path: "/users", icon: "heroicons:users", name: $isLoading ? "Users" : $_("navigation.users"), color: "text-green-400" },
        { path: "/products", icon: "heroicons:cube", name: $isLoading ? "Products" : $_("navigation.products"), color: "text-purple-400" },
        { path: "/analytics", icon: "heroicons:chart-bar", name: $isLoading ? "Analytics" : $_("navigation.analytics"), color: "text-yellow-400" },
        { path: "/charts", icon: "heroicons:presentation-chart-line", name: $isLoading ? "Charts" : $_("navigation.charts"), color: "text-pink-400" },
        { path: "/projects", icon: "heroicons:view-columns", name: $isLoading ? "Projects" : $_("navigation.projects"), color: "text-indigo-400" },
        { path: "/gantt", icon: "heroicons:calendar", name: "Gantt", color: "text-red-400" },
        { path: "/maps", icon: "heroicons:map", name: $isLoading ? "Maps" : $_("navigation.maps"), color: "text-teal-400" },
        { path: "/schedule", icon: "heroicons:calendar-days", name: $isLoading ? "Schedule" : $_("navigation.schedule"), color: "text-orange-400" },
      ],
    },
    {
      key: "settings",
      title: "Settings",
      icon: "heroicons:cog-6-tooth",
      items: [
        { path: "/profile", icon: "heroicons:user-circle", name: $isLoading ? "Profile" : $_("navigation.profile"), color: "text-cyan-400" },
        { path: "/settings", icon: "heroicons:cog-6-tooth", name: $isLoading ? "Settings" : $_("navigation.settings"), color: "text-gray-400" },
      ],
    },
  ];

  onMount(() => {
    // Animate menu items on mount
    if (menuItemsElements.length > 0) {
      staggerAnimate(menuItemsElements, "fadeInLeft", { delay: 0.1 });
    }

    // Auto-expand sections based on current route
    menuSections.forEach((section) => {
      if (section.items.some((item) => item.path === $currentRoute)) {
        expandedMenus[section.key] = true;
      }
    });
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
  function isSubmenuActive(items) {
    if (!items) return false;
    return items.some((item) => item.path === $currentRoute);
  }

  // Add logout function
  function handleLogout() {
    // Close sidebar first
    closeSidebar();

    // Small delay to allow sidebar animation to complete
    setTimeout(() => {
      // Navigate to login page
      navigate("/auth/login");
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
    {#each menuSections as section, sectionIndex}
      <div class="menu-section">
        <button class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 {isSubmenuActive(section.items) ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-sidebar hover:bg-white/10 hover:text-sidebar-hover hover:backdrop-blur-sm'}" on:click={() => toggleSubmenu(section.key)}>
          <div class="flex items-center">
            <Icon icon={section.icon} class="w-5 h-5 mr-3 text-gray-400" />
            {section.title}
          </div>
          <Icon icon={expandedMenus[section.key] ? "heroicons:chevron-down" : "heroicons:chevron-right"} class="w-4 h-4 transition-transform text-sidebar" />
        </button>

        {#if expandedMenus[section.key]}
          <div class="ml-4 pl-4 border-l border-white/20 mt-1 space-y-1">
            {#each section.items as item, itemIndex}
              <a bind:this={menuItemsElements[sectionIndex * 10 + itemIndex]} href={item.path} class="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 {$currentRoute === item.path ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-sidebar hover:bg-white/10 hover:text-sidebar-hover hover:backdrop-blur-sm'}" on:click|preventDefault={() => handleMenuClick(item.path)} use:motionInView={{ animation: "fadeInLeft", delay: (sectionIndex * 10 + itemIndex) * 0.05 }}>
                <Icon icon={item.icon} class="w-4 h-4 mr-3 {item.color}" />
                {item.name}
                {#if $currentRoute === item.path}
                  <div class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {/if}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </nav>

  <!-- User section - always at bottom -->
  <div class="border-t border-white/10 p-4 flex-shrink-0 mt-auto backdrop-blur-sm">
    <div class="flex items-center">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" class="w-10 h-10 rounded-full object-cover bg-white/10 backdrop-blur-sm" />
      <div class="ml-3 flex-1 min-w-0">
        <p class="text-sm font-medium text-sidebar truncate">John Doe</p>
        <p class="text-xs text-sidebar/60 truncate">john.doe@example.com</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="p-1.5 rounded-md text-sidebar/60 hover:text-red-400 hover:bg-red-400/20 transition-all duration-300 backdrop-blur-sm" on:click={handleLogout} title={$_("common.logout")}>
          <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
        <button class="p-1.5 rounded-md text-sidebar/60 hover:text-sidebar hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
          <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Dynamic text colors based on theme */
  :global([data-theme="modern"]) .text-sidebar {
    color: rgba(255, 255, 255, 0.9);
  }

  :global([data-theme="modern"]) .text-sidebar-hover {
    color: rgba(255, 255, 255, 1);
  }

  :global([data-theme="modern"]) .text-sidebar\/60 {
    color: rgba(255, 255, 255, 0.6);
  }

  :global([data-theme="dark"]) .text-sidebar {
    color: rgba(248, 250, 252, 0.9);
  }

  :global([data-theme="dark"]) .text-sidebar-hover {
    color: rgba(248, 250, 252, 1);
  }

  :global([data-theme="dark"]) .text-sidebar\/60 {
    color: rgba(248, 250, 252, 0.6);
  }
</style>
