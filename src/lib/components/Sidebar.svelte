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

  // Main menu items without sub-menus
  $: mainMenuItems = [
    {
      key: "dashboard",
      title: "🏠 Home",
      icon: "heroicons:home",
      path: "/",
      color: "text-blue-400",
      routes: ["/", "/household", "/members", "/inventory", "/vehicles", "/family-calendar-modern", "/family-notes-modern", "/reminders"],
    },
    {
      key: "divinity",
      title: "🕉️ Divinity",
      icon: "heroicons:sparkles",
      path: "/rituals",
      color: "text-orange-600",
      routes: ["/rituals", "/temple", "/festival-calendar", "/mantras", "/tamil-panchangam"],
    },
    {
      key: "contacts",
      title: "📇 Contacts",
      icon: "heroicons:phone",
      path: "/contacts",
      color: "text-green-600",
      routes: ["/contacts", "/emergency", "/vendors", "/directory"],
    },
    {
      key: "food",
      title: "🍛 Food",
      icon: "heroicons:utensils",
      path: "/meals",
      color: "text-orange-500",
      routes: ["/meals", "/recipes", "/grocery", "/pantry", "/kitchen", "/kitchen/dashboard", "/kitchen/pantry", "/kitchen/fresh", "/kitchen/meals", "/kitchen/kids", "/kitchen/recipes", "/kitchen/cleaning", "/kitchen/vendors", "/kitchen/wellness", "/kitchen/festivals"],
    },
    {
      key: "education",
      title: "📚 Education",
      icon: "heroicons:academic-cap",
      path: "/education",
      color: "text-indigo-500",
      routes: ["/education", "/education/dashboard", "/education/students", "/education/curriculum", "/education/planner", "/education/quiz", "/education/assessment", "/education/courses", "/education/mentors", "/education/achievements", "/education/archive", "/library", "/studies", "/learning-goals", "/study-plans"],
    },
    {
      key: "health",
      title: "💚 Health",
      icon: "heroicons:heart",
      path: "/wellness",
      color: "text-green-600",
      routes: ["/wellness", "/health", "/yoga", "/journal", "/hobbies-activities"],
    },
    {
      key: "finances",
      title: "💰 Finances",
      icon: "heroicons:currency-rupee",
      path: "/finances",
      color: "text-emerald-600",
      routes: ["/finances", "/recharges", "/expenses", "/budget", "/insurance", "/investments"],
    },
    {
      key: "issues",
      title: "🚨 Issues",
      icon: "heroicons:exclamation-triangle",
      path: "/emergency",
      color: "text-red-600",
      routes: ["/emergency", "/urgent", "/repairs", "/maintenance", "/requests"],
    },
    {
      key: "memories",
      title: "💭 Memories",
      icon: "heroicons:photo",
      path: "/lifeflow",
      color: "text-blue-500",
      routes: ["/lifeflow", "/family-stories", "/legacy", "/emotions", "/family-governance"],
    },
    {
      key: "travel",
      title: "✈️ Travel",
      icon: "heroicons:map",
      path: "/travel",
      color: "text-emerald-500",
      routes: ["/travel", "/trips", "/leisure", "/community"],
    },
  ];

  // Check if current route belongs to a menu section
  function isMenuActive(menuItem) {
    return menuItem.routes.includes($currentRoute);
  }

  onMount(() => {
    // Component mounted successfully
  });

  function closeSidebar() {
    // Optionally close sidebar on mobile
    isOpen = false;
  }

  // Handle menu item click with animation
  function handleMenuClick(path) {
    navigate(path);
    closeSidebar();
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
    {#each mainMenuItems as menuItem, index}
      <div class="menu-item">
        <a href={menuItem.path} class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 {isMenuActive(menuItem) ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-sidebar hover:bg-white/10 hover:text-sidebar-hover hover:backdrop-blur-sm'}" on:click|preventDefault={() => handleMenuClick(menuItem.path)} use:motionInView={{ animation: "fadeInLeft", delay: index * 0.05 }}>
          <Icon icon={menuItem.icon} class="w-5 h-5 mr-3 {menuItem.color}" />
          {menuItem.title}
          {#if isMenuActive(menuItem)}
            <div class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
          {/if}
        </a>
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
        <button class="p-1.5 rounded-md text-sidebar/60 hover:text-red-400 hover:bg-red-400/20 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-400" on:click={handleLogout} aria-label="Logout">
          <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
        <button class="p-1.5 rounded-md text-sidebar/60 hover:text-sidebar hover:bg-white/10 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary" aria-label="More options">
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
