<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _, isLoading } from "svelte-i18n";
  import { generateUserAvatar, generateFallbackAvatar } from "../utils/avatar.js";
  import { users, menuItems } from "../data/dashboard.js";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { motionInView, staggerAnimate } from "../utils/motion.js";
  import { theme } from "../stores/theme.js";

  export let isOpen = false;

  let sidebarElement;

  // Expanded state for sub-menus
  let expandedMenus = {};

  // Main menu items with sub-menus
  $: mainMenuItems = [
    {
      key: "dashboard",
      title: "🏠 Home",
      icon: "heroicons:home",
      path: "/",
      color: "text-blue-400",
      routes: ["/", "/household", "/members", "/family-calendar-modern", "/family-notes-modern", "/reminders"],
      subMenus: [
        { label: "Dashboard", path: "/", icon: "heroicons:home" },
        { label: "Household", path: "/household", icon: "heroicons:squares-2x2" },
        { label: "Family Members", path: "/members", icon: "heroicons:users" },
        { label: "Calendar", path: "/family-calendar-modern", icon: "heroicons:calendar-days" },
        { label: "Notes", path: "/family-notes-modern", icon: "heroicons:document-text" },
        { label: "Reminders", path: "/reminders", icon: "heroicons:bell-alert" },
      ],
    },
    {
      key: "divinity",
      title: "🕉️ Divinity",
      icon: "heroicons:sparkles",
      path: "/tamil-panchangam",
      color: "text-orange-600",
      routes: ["/tamil-panchangam", "/rituals", "/temple", "/festival-calendar", "/mantras"],
      subMenus: [
        { label: "Tamil Panchangam", path: "/tamil-panchangam", icon: "heroicons:sun" },
        { label: "Rituals", path: "/rituals", icon: "heroicons:sparkles" },
        { label: "Temple Visits", path: "/temple", icon: "heroicons:building-storefront" },
        { label: "Festival Calendar", path: "/festival-calendar", icon: "heroicons:calendar" },
        { label: "Mantras", path: "/mantras", icon: "heroicons:musical-note" },
      ],
    },
    {
      key: "contacts",
      title: "📇 Contacts",
      icon: "heroicons:phone",
      path: "/contacts",
      color: "text-green-600",
      routes: ["/contacts", "/emergency", "/vendors", "/directory"],
      subMenus: [
        { label: "Personal Contacts", path: "/contacts", icon: "heroicons:phone" },
        { label: "Emergency Contacts", path: "/emergency", icon: "heroicons:exclamation-triangle" },
        { label: "Vendors & Services", path: "/vendors", icon: "heroicons:wrench" },
        { label: "Service Directory", path: "/directory", icon: "heroicons:building-storefront" },
      ],
    },
    {
      key: "food",
      title: "🍛 Food",
      icon: "heroicons:utensils",
      path: "/meals",
      color: "text-orange-500",
      routes: ["/meals", "/recipes", "/grocery", "/pantry", "/kitchen", "/kitchen/dashboard", "/kitchen/pantry", "/kitchen/fresh", "/kitchen/meals", "/kitchen/kids", "/kitchen/recipes", "/kitchen/cleaning", "/kitchen/vendors", "/kitchen/wellness", "/kitchen/festivals"],
      subMenus: [
        { label: "Meals & Planning", path: "/meals", icon: "heroicons:calendar-days" },
        { label: "Recipes", path: "/recipes", icon: "heroicons:book-open" },
        { label: "Grocery & Pantry", path: "/grocery", icon: "heroicons:shopping-cart" },
        { label: "Pantry Management", path: "/pantry", icon: "heroicons:archive-box" },
        { label: "Kitchen Dashboard", path: "/kitchen", icon: "heroicons:home" },
        { label: "Fresh Items", path: "/kitchen/fresh", icon: "heroicons:leaf" },
        { label: "Kids Meals", path: "/kitchen/kids", icon: "heroicons:user-group" },
        { label: "Cleaning Schedule", path: "/kitchen/cleaning", icon: "heroicons:sparkles" },
        { label: "Kitchen Vendors", path: "/kitchen/vendors", icon: "heroicons:truck" },
        { label: "Wellness Kitchen", path: "/kitchen/wellness", icon: "heroicons:heart" },
        { label: "Festival Foods", path: "/kitchen/festivals", icon: "heroicons:cake" },
      ],
    },
    {
      key: "education",
      title: "📚 Education",
      icon: "heroicons:academic-cap",
      path: "/education",
      color: "text-indigo-500",
      routes: ["/education", "/education/dashboard", "/education/students", "/education/curriculum", "/education/planner", "/education/quiz", "/education/assessment", "/education/courses", "/education/mentors", "/education/achievements", "/education/archive", "/library", "/studies", "/learning-goals", "/study-plans", "/education/grades-tracker"],
      subMenus: [
        { label: "Education Dashboard", path: "/education", icon: "heroicons:academic-cap" },
        { label: "Students", path: "/education/students", icon: "heroicons:users" },
        { label: "Curriculum", path: "/education/curriculum", icon: "heroicons:book-open" },
        { label: "Planner", path: "/education/planner", icon: "heroicons:calendar-days" },
        { label: "Quiz", path: "/education/quiz", icon: "heroicons:question-mark-circle" },
        { label: "Assessment", path: "/education/assessment", icon: "heroicons:clipboard-document-check" },
        { label: "Courses", path: "/education/courses", icon: "heroicons:academic-cap" },
        { label: "Mentors", path: "/education/mentors", icon: "heroicons:user-group" },
        { label: "Achievements", path: "/education/achievements", icon: "heroicons:trophy" },
        { label: "Archive", path: "/education/archive", icon: "heroicons:archive-box" },
        { label: "Family Library", path: "/library", icon: "heroicons:book-open" },
        { label: "Studies & Exams", path: "/studies", icon: "heroicons:pencil" },
        { label: "Learning Goals", path: "/learning-goals", icon: "heroicons:light-bulb" },
        { label: "Study Plans", path: "/study-plans", icon: "heroicons:document-duplicate" },
        { label: "Grades Tracker", path: "/education/grades-tracker", icon: "heroicons:chart-bar" },
      ],
    },
    {
      key: "assistant",
      title: "🤖 Assistant",
      icon: "heroicons:chat-bubble-left-right",
      path: "/assistant",
      color: "text-purple-500",
      routes: ["/assistant", "/assistant/voice-log", "/assistant/task-board", "/assistant/event-feed", "/assistant/auto-checklist", "/assistant/ambient-log"],
      subMenus: [
        { label: "Assistant Dashboard", path: "/assistant", icon: "heroicons:chat-bubble-left-right" },
        { label: "Voice Log", path: "/assistant/voice-log", icon: "heroicons:microphone" },
        { label: "Task Board", path: "/assistant/task-board", icon: "heroicons:clipboard-document-list" },
        { label: "Event Feed", path: "/assistant/event-feed", icon: "heroicons:rss" },
        { label: "Auto Checklist", path: "/assistant/auto-checklist", icon: "heroicons:check-circle" },
        { label: "Ambient Log", path: "/assistant/ambient-log", icon: "heroicons:eye" },
      ],
    },
    {
      key: "shivo-ai",
      title: "🧠 Shivo AI",
      icon: "heroicons:sparkles",
      path: "/shivo-ai",
      color: "text-orange-500",
      routes: ["/shivo-ai"],
      subMenus: [{ label: "AI Assistant", path: "/shivo-ai", icon: "heroicons:sparkles" }],
    },
    {
      key: "shivo-music",
      title: "🎼 Shivo Music",
      icon: "heroicons:musical-note",
      path: "/shivo-music",
      color: "text-pink-500",
      routes: ["/shivo-music"],
      subMenus: [{ label: "Music Companion", path: "/shivo-music", icon: "heroicons:musical-note" }],
    },
    {
      key: "health",
      title: "💚 Health",
      icon: "heroicons:heart",
      path: "/wellness",
      color: "text-green-600",
      routes: ["/wellness", "/health", "/yoga", "/journal", "/hobbies-activities"],
      subMenus: [
        { label: "Wellness Dashboard", path: "/wellness", icon: "heroicons:heart" },
        { label: "Health Tracking", path: "/health", icon: "heroicons:shield-check" },
        { label: "Yoga & Exercise", path: "/yoga", icon: "heroicons:user" },
        { label: "Health Journal", path: "/journal", icon: "heroicons:pencil-square" },
        { label: "Hobbies & Activities", path: "/hobbies-activities", icon: "heroicons:puzzle-piece" },
      ],
    },
    {
      key: "finances",
      title: "💰 Finances",
      icon: "heroicons:currency-rupee",
      path: "/finances",
      color: "text-emerald-600",
      routes: ["/finances", "/recharges", "/expenses", "/budget", "/insurance", "/investments"],
      subMenus: [
        { label: "Finance Dashboard", path: "/finances", icon: "heroicons:currency-rupee" },
        { label: "Recharges", path: "/recharges", icon: "heroicons:device-phone-mobile" },
        { label: "Expenses", path: "/expenses", icon: "heroicons:credit-card" },
        { label: "Budget", path: "/budget", icon: "heroicons:calculator" },
        { label: "Insurance", path: "/insurance", icon: "heroicons:shield-check" },
        { label: "Investments", path: "/investments", icon: "heroicons:chart-line" },
      ],
    },
    {
      key: "assets",
      title: "🏢 Assets",
      icon: "heroicons:building-storefront",
      path: "/assets",
      color: "text-purple-600",
      routes: ["/assets", "/assets/items", "/assets/value", "/assets/maintenance", "/assets/documents", "/inventory", "/vehicles"],
      subMenus: [
        { label: "Asset Overview", path: "/assets", icon: "heroicons:building-storefront" },
        { label: "Asset Items", path: "/assets/items", icon: "heroicons:archive-box" },
        { label: "Asset Value", path: "/assets/value", icon: "heroicons:currency-rupee" },
        { label: "Maintenance", path: "/assets/maintenance", icon: "heroicons:wrench-screwdriver" },
        { label: "Documents", path: "/assets/documents", icon: "heroicons:document-text" },
        { label: "Home Inventory", path: "/inventory", icon: "heroicons:archive-box" },
        { label: "Vehicle Management", path: "/vehicles", icon: "heroicons:truck" },
      ],
    },
    {
      key: "projects",
      title: "📋 Projects",
      icon: "heroicons:clipboard-document-list",
      path: "/projects",
      color: "text-cyan-600",
      routes: ["/projects", "/gantt", "/schedule", "/analytics", "/charts", "/maps"],
      subMenus: [
        { label: "Project Management", path: "/projects", icon: "heroicons:clipboard-document-list" },
        { label: "Gantt Chart", path: "/gantt", icon: "heroicons:chart-bar" },
        { label: "Daily Schedule", path: "/schedule", icon: "heroicons:calendar-days" },
        { label: "Analytics Dashboard", path: "/analytics", icon: "heroicons:chart-bar" },
        { label: "Data Charts", path: "/charts", icon: "heroicons:chart-pie" },
        { label: "Interactive Maps", path: "/maps", icon: "heroicons:map" },
      ],
    },
    {
      key: "issues",
      title: "🚨 Issues",
      icon: "heroicons:exclamation-triangle",
      path: "/issues-emergency",
      color: "text-red-600",
      routes: ["/issues-emergency", "/urgent", "/repairs", "/maintenance", "/upgrades", "/requests"],
      subMenus: [
        { label: "Emergency Situations", path: "/issues-emergency", icon: "heroicons:shield-exclamation" },
        { label: "Urgent Tasks", path: "/urgent", icon: "heroicons:clock" },
        { label: "Repairs", path: "/repairs", icon: "heroicons:wrench-screwdriver" },
        { label: "Maintenance", path: "/maintenance", icon: "heroicons:cog" },
        { label: "Upgrades", path: "/upgrades", icon: "heroicons:arrow-trending-up" },
        { label: "Service Requests", path: "/requests", icon: "heroicons:clipboard-document-list" },
      ],
    },
    {
      key: "memories",
      title: "💭 Memories",
      icon: "heroicons:photo",
      path: "/lifeflow",
      color: "text-blue-500",
      routes: ["/lifeflow", "/family-stories", "/legacy", "/emotions", "/family-governance"],
      subMenus: [
        { label: "Life Flow", path: "/lifeflow", icon: "heroicons:heart" },
        { label: "Family Stories", path: "/family-stories", icon: "heroicons:book-open" },
        { label: "Legacy & Memory", path: "/legacy", icon: "heroicons:archive-box" },
        { label: "Emotions & Feelings", path: "/emotions", icon: "heroicons:face-smile" },
        { label: "Family Governance", path: "/family-governance", icon: "heroicons:scale" },
      ],
    },
    {
      key: "travel",
      title: "✈️ Travel",
      icon: "heroicons:map",
      path: "/travel",
      color: "text-emerald-500",
      routes: ["/travel", "/trips", "/leisure", "/community"],
      subMenus: [
        { label: "Travel Planning", path: "/travel", icon: "heroicons:map-pin" },
        { label: "Trip History", path: "/trips", icon: "heroicons:globe-alt" },
        { label: "Leisure & Outings", path: "/leisure", icon: "heroicons:film" },
        { label: "Community Events", path: "/community", icon: "heroicons:users" },
      ],
    },
  ];

  // Check if current route belongs to a menu section
  function isMenuActive(menuItem) {
    return menuItem.routes.includes($page.url.pathname);
  }

  // Check if a specific sub-menu item is active
  function isSubMenuActive(subMenuPath) {
    return $page.url.pathname === subMenuPath;
  }

  // Toggle expanded state of a menu
  function toggleMenuExpansion(menuKey) {
    expandedMenus[menuKey] = !expandedMenus[menuKey];
    expandedMenus = { ...expandedMenus }; // Trigger reactivity
  }

  // Auto-expand menu if current route belongs to it
  $: {
    mainMenuItems.forEach((menuItem) => {
      if (isMenuActive(menuItem) && !expandedMenus[menuItem.key]) {
        expandedMenus[menuItem.key] = true;
      }
    });
    expandedMenus = { ...expandedMenus };
  }

  onMount(() => {
    // Component mounted successfully
  });

  function closeSidebar() {
    // Keep sidebar open on desktop navigation
    // Only close on mobile if needed
    isOpen = false;
  }

  // Handle menu item click with animation and navigation protection
  function handleMenuClick(path) {
    goto(path);
    // Don't close sidebar on navigation to keep it persistent
  }

  // Handle sub-menu item click
  function handleSubMenuClick(path, menuKey) {
    goto(path);
    // Ensure parent menu stays expanded
    expandedMenus[menuKey] = true;
    expandedMenus = { ...expandedMenus };
  }

  // Add logout function with navigation protection
  function handleLogout() {
    // Close sidebar first
    closeSidebar();

    // Small delay to allow sidebar animation to complete
    setTimeout(() => {
      // Navigate to login page
      goto("/auth/login");
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
        <span class="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse whitespace-nowrap"> Home Maker </span>
      </div>
    </div>
  </div>

  <!-- Navigation section - takes up remaining space -->
  <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
    {#each mainMenuItems as menuItem, index}
      <div class="menu-item">
        <!-- Main menu item -->
        <div
          class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg cursor-pointer {isMenuActive(menuItem) ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'text-sidebar hover:bg-white/10 hover:text-sidebar-hover hover:backdrop-blur-sm'}"
          on:click={() => {
            if (menuItem.subMenus && menuItem.subMenus.length > 0) {
              toggleMenuExpansion(menuItem.key);
            } else {
              handleMenuClick(menuItem.path);
            }
          }}
        >
          <Icon icon={menuItem.icon} class="w-5 h-5 mr-3 {menuItem.color}" />
          <span class="flex-1">{menuItem.title}</span>
          {#if menuItem.subMenus && menuItem.subMenus.length > 0}
            <Icon icon={expandedMenus[menuItem.key] ? "heroicons:chevron-down" : "heroicons:chevron-right"} class="w-4 h-4 ml-2 transition-transform duration-200 {expandedMenus[menuItem.key] ? 'rotate-0' : ''}" />
          {/if}
          {#if isMenuActive(menuItem)}
            <div class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
          {/if}
        </div>

        <!-- Sub-menu items -->
        {#if menuItem.subMenus && menuItem.subMenus.length > 0 && expandedMenus[menuItem.key]}
          <div class="ml-6 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {#each menuItem.subMenus as subMenu}
              <a href={subMenu.path} class="w-full flex items-center px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 {isSubMenuActive(subMenu.path) ? 'bg-white/15 text-white border border-white/30 backdrop-blur-sm' : 'text-sidebar/80 hover:bg-white/5 hover:text-sidebar hover:backdrop-blur-sm'}" on:click|preventDefault={() => handleSubMenuClick(subMenu.path, menuItem.key)}>
                <Icon icon={subMenu.icon} class="w-4 h-4 mr-3 opacity-70" />
                {subMenu.label}
                {#if isSubMenuActive(subMenu.path)}
                  <div class="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
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
        <button class="p-1.5 rounded-md text-sidebar/60 hover:text-red-400 hover:bg-red-400/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-400" on:click={handleLogout} aria-label="Logout">
          <Icon icon="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
        <button class="p-1.5 rounded-md text-sidebar/60 hover:text-sidebar hover:bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary" aria-label="More options">
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
