<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const dispatch = createEventDispatcher();

  // Main navigation tiles (same as LeftTileBar)
  const mainTiles = [
    {
      id: "dashboard",
      label: "Home",
      icon: "heroicons:home",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Dashboard & Overview",
      subTiles: [
        { label: "Dashboard", path: "/", icon: "heroicons:home" },
        { label: "Household", path: "/household", icon: "heroicons:squares-2x2" },
        { label: "Family Members", path: "/members", icon: "heroicons:users" },
        { label: "Calendar", path: "/family-calendar-modern", icon: "heroicons:calendar-days" },
        { label: "Notes", path: "/family-notes-modern", icon: "heroicons:document-text" },
        { label: "Reminders", path: "/reminders", icon: "heroicons:bell-alert" },
      ],
    },
    {
      id: "divinity",
      label: "Divinity",
      icon: "heroicons:sparkles",
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500/50",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Spiritual & Religious",
      subTiles: [
        { label: "Tamil Panchangam", path: "/tamil-panchangam", icon: "heroicons:sun" },
        { label: "Rituals", path: "/rituals", icon: "heroicons:sparkles" },
        { label: "Temple Visits", path: "/temple", icon: "heroicons:building-storefront" },
        { label: "Festival Calendar", path: "/festival-calendar", icon: "heroicons:calendar" },
        { label: "Mantras", path: "/mantras", icon: "heroicons:musical-note" },
      ],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: "heroicons:phone",
      color: "from-green-500 to-green-600",
      borderColor: "border-green-500/50",
      textColor: "text-green-600 dark:text-green-400",
      description: "People & Directory",
      subTiles: [
        { label: "Personal Contacts", path: "/contacts", icon: "heroicons:phone" },
        { label: "Emergency Contacts", path: "/emergency", icon: "heroicons:exclamation-triangle" },
        { label: "Vendors & Services", path: "/vendors", icon: "heroicons:wrench" },
        { label: "Service Directory", path: "/directory", icon: "heroicons:building-storefront" },
      ],
    },
    {
      id: "food",
      label: "Food",
      icon: "heroicons:cake",
      color: "from-orange-400 to-orange-500",
      borderColor: "border-orange-400/50",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Meals & Recipes",
      subTiles: [
        { label: "Meals & Planning", path: "/meals", icon: "heroicons:calendar-days" },
        { label: "Recipes", path: "/recipes", icon: "heroicons:book-open" },
        { label: "Grocery & Pantry", path: "/grocery", icon: "heroicons:shopping-cart" },
        { label: "Pantry Management", path: "/pantry", icon: "heroicons:archive-box" },
        { label: "Kitchen Dashboard", path: "/kitchen", icon: "heroicons:home" },
        { label: "Fresh Items", path: "/kitchen/fresh", icon: "heroicons:leaf" },
        { label: "Kids Meals", path: "/kitchen/kids", icon: "heroicons:user-group" },
        { label: "Cleaning Schedule", path: "/kitchen/cleaning", icon: "heroicons:sparkles" },
      ],
    },
    {
      id: "education",
      label: "Learn",
      icon: "heroicons:academic-cap",
      color: "from-indigo-500 to-indigo-600",
      borderColor: "border-indigo-500/50",
      textColor: "text-indigo-600 dark:text-indigo-400",
      description: "Education & Study",
      subTiles: [
        { label: "Education Dashboard", path: "/education", icon: "heroicons:academic-cap" },
        { label: "Students", path: "/education/students", icon: "heroicons:users" },
        { label: "Curriculum", path: "/education/curriculum", icon: "heroicons:book-open" },
        { label: "Planner", path: "/education/planner", icon: "heroicons:calendar-days" },
        { label: "Quiz", path: "/education/quiz", icon: "heroicons:question-mark-circle" },
        { label: "Assessment", path: "/education/assessment", icon: "heroicons:clipboard-document-check" },
        { label: "Courses", path: "/education/courses", icon: "heroicons:academic-cap" },
        { label: "Mentors", path: "/education/mentors", icon: "heroicons:user-group" },
        { label: "Achievements", path: "/education/achievements", icon: "heroicons:trophy" },
        { label: "Family Library", path: "/library", icon: "heroicons:book-open" },
        { label: "Studies & Exams", path: "/studies", icon: "heroicons:pencil" },
        { label: "Learning Goals", path: "/learning-goals", icon: "heroicons:light-bulb" },
      ],
    },
    {
      id: "assistant",
      label: "Assistant",
      icon: "heroicons:chat-bubble-left-right",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-500/50",
      textColor: "text-purple-600 dark:text-purple-400",
      description: "AI & Automation",
      subTiles: [
        { label: "Assistant Dashboard", path: "/assistant", icon: "heroicons:chat-bubble-left-right" },
        { label: "Voice Log", path: "/assistant/voice-log", icon: "heroicons:microphone" },
        { label: "Task Board", path: "/assistant/task-board", icon: "heroicons:clipboard-document-list" },
        { label: "Event Feed", path: "/assistant/event-feed", icon: "heroicons:rss" },
        { label: "Auto Checklist", path: "/assistant/auto-checklist", icon: "heroicons:check-circle" },
        { label: "Ambient Log", path: "/assistant/ambient-log", icon: "heroicons:eye" },
      ],
    },
    {
      id: "shivo-ai",
      label: "Shivo AI",
      icon: "heroicons:sparkles",
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500/50",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "AI Assistant",
      subTiles: [{ label: "AI Assistant", path: "/shivo-ai", icon: "heroicons:sparkles" }],
    },
    {
      id: "shivo-music",
      label: "Shivo Music",
      icon: "heroicons:musical-note",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-500/50",
      textColor: "text-pink-600 dark:text-pink-400",
      description: "Music Companion",
      subTiles: [{ label: "Music Companion", path: "/shivo-music", icon: "heroicons:musical-note" }],
    },
    {
      id: "shivo-agentic",
      label: "Shivo Agentic",
      icon: "heroicons:robot",
      color: "from-violet-500 to-violet-600",
      borderColor: "border-violet-500/50",
      textColor: "text-violet-600 dark:text-violet-400",
      description: "Agentic AI Assistant",
      subTiles: [{ label: "Agentic AI", path: "/shivo-agentic", icon: "heroicons:robot" }],
    },
    {
      id: "health",
      label: "Health",
      icon: "heroicons:heart",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-500/50",
      textColor: "text-pink-600 dark:text-pink-400",
      description: "Wellness & Fitness",
      subTiles: [
        { label: "Wellness Dashboard", path: "/wellness", icon: "heroicons:heart" },
        { label: "Health Tracking", path: "/health", icon: "heroicons:shield-check" },
        { label: "Yoga & Exercise", path: "/yoga", icon: "heroicons:user" },
        { label: "Health Journal", path: "/journal", icon: "heroicons:pencil-square" },
        { label: "Hobbies & Activities", path: "/hobbies-activities", icon: "heroicons:puzzle-piece" },
      ],
    },
    {
      id: "finances",
      label: "Finances",
      icon: "heroicons:currency-rupee",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-500/50",
      textColor: "text-emerald-600 dark:text-emerald-400",
      description: "Money & Budget",
      subTiles: [
        { label: "Finance Dashboard", path: "/finances", icon: "heroicons:currency-rupee" },
        { label: "Recharges", path: "/recharges", icon: "heroicons:device-phone-mobile" },
        { label: "Expenses", path: "/expenses", icon: "heroicons:credit-card" },
        { label: "Budget", path: "/budget", icon: "heroicons:calculator" },
        { label: "Insurance", path: "/insurance", icon: "heroicons:shield-check" },
        { label: "Investments", path: "/investments", icon: "heroicons:chart-line" },
      ],
    },
    {
      id: "assets",
      label: "Assets",
      icon: "heroicons:building-storefront",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-500/50",
      textColor: "text-emerald-600 dark:text-emerald-400",
      description: "Property & Vehicles",
      subTiles: [
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
      id: "projects",
      label: "Projects",
      icon: "heroicons:clipboard-document-list",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-cyan-500/50",
      textColor: "text-cyan-600 dark:text-cyan-400",
      description: "Management & Tasks",
      subTiles: [
        { label: "Project Management", path: "/projects", icon: "heroicons:clipboard-document-list" },
        { label: "Gantt Chart", path: "/gantt", icon: "heroicons:chart-bar" },
        { label: "Daily Schedule", path: "/schedule", icon: "heroicons:calendar-days" },
        { label: "Analytics Dashboard", path: "/analytics", icon: "heroicons:chart-bar" },
        { label: "Data Charts", path: "/charts", icon: "heroicons:chart-pie" },
        { label: "Interactive Maps", path: "/maps", icon: "heroicons:map" },
      ],
    },
  ];

  // Flatten all sub-tiles from main tiles
  const allSubTiles = mainTiles.flatMap((mainTile) =>
    mainTile.subTiles.map((subTile) => ({
      ...subTile,
      color: mainTile.color,
      textColor: mainTile.textColor,
      parentId: mainTile.id,
    }))
  );

  // Get the currently active main tile based on current path
  $: activeMainTile = mainTiles.find((tile) => tile.subTiles.some((subTile) => $page.url.pathname === subTile.path));

  // Get sub-tiles for the active main tile only
  $: activeSubTiles = activeMainTile
    ? activeMainTile.subTiles.map((subTile) => ({
        ...subTile,
        color: activeMainTile.color,
        textColor: activeMainTile.textColor,
        parentId: activeMainTile.id,
      }))
    : [];

  // Check if a tile path is currently active
  function isTileActive(tilePath) {
    return $page.url.pathname === tilePath;
  }

  // Navigate to a tile path
  function navigateTo(path) {
    goto(path);
  }
</script>

<div class="outlook-nav w-full bg-transparent backdrop-blur-xl border-0">
  <!-- Main Navigation Container - Full Width -->
  <div class="flex items-center justify-between px-6 py-0 h-16">
    <!-- Left Section: Logo and Active Category Info -->
    <div class="flex items-center space-x-4 h-full">
      <!-- App Title -->
      <div class="flex items-center space-x-1">
        <div class="flex flex-col">
          <span class="text-sm font-medium text-white/80 leading-tight">Gurukuladesam</span>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">Home Manager</span>
        </div>
      </div>

      <!-- Separator -->
      <div class="h-8 w-px bg-gray-300/50 dark:bg-gray-600/50 mx-2"></div>

      {#if activeMainTile}
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 rounded-lg bg-gradient-to-br {activeMainTile.color} flex items-center justify-center shadow-sm">
            <Icon icon={activeMainTile.icon} class="w-3.5 h-3.5 text-white" />
          </div>
          <div class="hidden sm:block">
            <h2 class="text-sm font-semibold text-gray-900 dark:text-white">{activeMainTile.label}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">{activeMainTile.description}</p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Center Section: Navigation Tabs - Full Height Coverage -->
    <div class="flex-1 flex justify-center h-full">
      <div class="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner h-12">
        {#each activeSubTiles.slice(0, 8) as tile (tile.path)}
          <button class="outlook-nav-tab relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 h-full {isTileActive(tile.path) ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'}" on:click={() => navigateTo(tile.path)}>
            <Icon icon={tile.icon} class="w-4 h-4" />
            <span class="inline">{tile.label}</span>
            {#if isTileActive(tile.path)}
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full"></div>
            {/if}
          </button>
        {/each}

        <!-- More dropdown if there are more than 8 items -->
        {#if activeSubTiles.length > 8}
          <div class="relative">
            <button class="outlook-nav-tab px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 h-full">
              <Icon icon="heroicons:ellipsis-horizontal" class="w-4 h-4" />
            </button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Right Section: Actions -->
    <div class="flex items-center space-x-2 h-full">
      <!-- Search Button -->
      <button class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" title="Search">
        <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
      </button>

      <!-- Settings Button -->
      <button class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" title="Settings">
        <Icon icon="heroicons:cog-6-tooth" class="w-5 h-5" />
      </button>

      <!-- User Menu -->
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">U</div>
    </div>
  </div>

  <!-- Sub-navigation for additional items (if needed) -->
  {#if activeSubTiles.length > 8}
    <div class="border-0 px-6 py-2">
      <div class="flex items-center space-x-2 overflow-x-auto">
        {#each activeSubTiles.slice(8) as tile (tile.path)}
          <button class="flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap {isTileActive(tile.path) ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}" on:click={() => navigateTo(tile.path)}>
            <Icon icon={tile.icon} class="w-4 h-4" />
            <span>{tile.label}</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .outlook-nav {
    position: relative;
    z-index: 10;
    backdrop-filter: blur(8px);
  }

  .outlook-nav-tab {
    position: relative;
    min-width: 0;
    white-space: nowrap;
  }

  .outlook-nav-tab:hover {
    transform: translateY(-1px);
  }

  /* Smooth transitions for theme changes */
  .outlook-nav * {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Custom scrollbar for overflow navigation */
  .outlook-nav ::-webkit-scrollbar {
    height: 4px;
  }

  .outlook-nav ::-webkit-scrollbar-track {
    background: transparent;
  }

  .outlook-nav ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 2px;
  }

  .outlook-nav ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }
</style>
