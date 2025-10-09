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

<div class="dashboard-tiles w-full">
  <!-- Dashboard Tiles Grid -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
    {#each activeSubTiles as tile (tile.path)}
      <div class="tile-card group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl {isTileActive(tile.path) ? 'ring-2 ring-blue-500 shadow-lg' : ''}">
        <button class="w-full h-24 bg-gradient-to-br {tile.color} hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden p-3" on:click={() => navigateTo(tile.path)}>
          <div class="absolute inset-0 bg-gradient-to-br {tile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

          <div class="relative flex flex-col items-center justify-center h-full">
            <div class="w-8 h-8 mb-2 text-white group-hover:scale-110 transition-transform duration-300">
              <Icon icon={tile.icon} class="w-full h-full" />
            </div>
            <div class="text-xs font-medium text-white text-center leading-tight group-hover:text-white transition-colors duration-300">
              {tile.label}
            </div>
            {#if isTileActive(tile.path)}
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
            {/if}
          </div>
        </button>
      </div>
    {/each}
  </div>

  <!-- Active Category Info -->
  {#if activeMainTile}
    <div class="px-6 pb-6">
      <div class="text-center">
        <h2 class="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          {activeMainTile.label}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {activeMainTile.description}
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  .tile-card:hover {
    transform: translateY(-2px);
  }

  .tile-card:active {
    transform: translateY(0);
  }
</style>
