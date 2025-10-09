<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { iosSounds } from "$lib/utils/sounds";

  const dispatch = createEventDispatcher();

  // State for which main tile is being hovered
  let hoveredTile = null;
  let hoveredTileElement = null;

  // Main navigation tiles (single column layout)
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
        { label: "Shivo AI", path: "/shivo-ai", icon: "heroicons:sparkles" },
        { label: "Shivo Music", path: "/shivo-music", icon: "heroicons:musical-note" },
        { label: "Shivo Agentic", path: "/shivo-agentic", icon: "heroicons:robot" },
      ],
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

  // Check if current route belongs to a tile section
  function isTileActive(tile) {
    return tile.subTiles.some((subTile) => $page.url.pathname === subTile.path);
  }

  // Handle mouse enter on tile
  function handleTileMouseEnter(tileId, event) {
    hoveredTile = tileId;
    hoveredTileElement = event.currentTarget;

    // Play subtle tap sound for tiles with sub-menus
    const tile = mainTiles.find((t) => t.id === tileId);
    if (tile && tile.subTiles.length > 1) {
      try {
        iosSounds.playTap();
      } catch (error) {
        console.warn("Sound playback failed:", error);
      }
    }
  }

  // Handle mouse leave from tile - only hide if not hovering over popup
  function handleTileMouseLeave() {
    // Delay hiding to allow mouse to move to popup
    setTimeout(() => {
      if (!isHoveringPopup) {
        hoveredTile = null;
        hoveredTileElement = null;
      }
    }, 100);
  }

  // Track if mouse is over popup
  let isHoveringPopup = false;

  function handlePopupMouseEnter() {
    isHoveringPopup = true;
  }

  function handlePopupMouseLeave() {
    isHoveringPopup = false;
    hoveredTile = null;
    hoveredTileElement = null;
  }

  // Handle sub-tile navigation
  function navigateTo(path) {
    try {
      iosSounds.playClick();
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
    // Try goto first, fallback to window.location
    try {
      goto(path);
    } catch (error) {
      console.warn("goto failed, using window.location:", error);
      if (typeof window !== "undefined") {
        window.location.href = path;
      }
    }
    hoveredTile = null;
    hoveredTileElement = null;
  }

  // Calculate popup position
  function getPopupPosition() {
    if (!hoveredTileElement) return { top: 0, left: 0 };

    const rect = hoveredTileElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popupWidth = 192; // min-w-48 = 192px
    const popupHeight = 200; // approximate height

    // Position popup to the right of the tile by default
    let top = rect.top;
    let left = rect.right + 8;

    // If popup would go off-screen to the right, position it to the left
    if (left + popupWidth > viewportWidth - 20) {
      left = rect.left - popupWidth - 8;
    }

    // Ensure popup doesn't go above viewport
    if (top < 10) top = 10;

    // Ensure popup doesn't go below viewport
    if (top + popupHeight > viewportHeight - 10) {
      top = viewportHeight - popupHeight - 10;
    }

    return { top, left };
  }
</script>

<div class="left-tile-bar flex flex-col w-20 h-screen bg-transparent backdrop-blur-sm relative z-10 overflow-hidden flex-shrink-0" style="height: calc(100vh - 80px);">
  <div class="p-2">
    <div class="logo-container mb-3 flex items-center justify-center">
      <div class="relative">
        <!-- Compact logo for sidebar -->
        <svg width="48" height="48" viewBox="0 0 48 48" class="drop-shadow-sm">
          <defs>
            <linearGradient id="sidebarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ec4899" />
              <stop offset="50%" style="stop-color:#8b5cf6" />
              <stop offset="100%" style="stop-color:#06b6d4" />
            </linearGradient>
            <filter id="sidebarGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Mini lotus flower -->
          <g transform="translate(6, 6)">
            <circle cx="18" cy="18" r="14" fill="url(#sidebarGradient)" opacity="0.2" />
            <circle cx="18" cy="18" r="7" fill="url(#sidebarGradient)" opacity="0.4" />
            <!-- Petals -->
            <ellipse cx="18" cy="4" rx="3" ry="6" fill="url(#sidebarGradient)" opacity="0.6" />
            <ellipse cx="32" cy="18" rx="6" ry="3" fill="url(#sidebarGradient)" opacity="0.6" />
            <ellipse cx="18" cy="32" rx="3" ry="6" fill="url(#sidebarGradient)" opacity="0.6" />
            <ellipse cx="4" cy="18" rx="6" ry="3" fill="url(#sidebarGradient)" opacity="0.6" />
            <!-- Center -->
            <circle cx="18" cy="18" r="2" fill="url(#sidebarGradient)" />
          </g>

          <!-- Tamil "தா" text -->
          <text x="24" y="42" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="url(#sidebarGradient)" text-anchor="middle" filter="url(#sidebarGlow)">தா</text>
        </svg>

        <!-- Tooltip on hover -->
        <div class="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div class="bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <div class="font-bold text-sm">தாய்வழி</div>
            <div class="text-xs opacity-75">Matrilineal Heritage</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Single Column Main Tiles -->
    <div class="flex flex-col gap-2">
      {#each mainTiles as tile (tile.id)}
        <div class="relative">
          <button
            class="tile-button group relative w-full aspect-square rounded-xl border-0 transition-all duration-300 hover:shadow-lg hover:scale-105"
            on:mouseenter={(e) => handleTileMouseEnter(tile.id, e)}
            on:mouseleave={handleTileMouseLeave}
            on:click={() => {
              // If tile has only one sub-item, navigate directly
              if (tile.subTiles.length === 1) {
                navigateTo(tile.subTiles[0].path);
              } else {
                // For tiles with multiple sub-items, navigate to the first one
                navigateTo(tile.subTiles[0].path);
              }
            }}
          >
            <div class="absolute inset-0 bg-gradient-to-br {tile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

            <div class="relative flex flex-col items-center justify-center h-full p-2">
              <div class="w-6 h-6 mb-1 {tile.textColor} group-hover:scale-110 transition-transform duration-300">
                <Icon icon={tile.icon} class="w-full h-full" />
              </div>
              <div class="text-[10px] font-medium text-base-content group-hover:text-primary transition-colors duration-300 text-center leading-tight">
                {tile.label}
              </div>
              {#if isTileActive(tile)}
                <div class="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              {/if}
            </div>
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Hover Popup Menu -->
  {#if hoveredTile}
    {@const activeTile = mainTiles.find((t) => t.id === hoveredTile)}
    {#if activeTile && activeTile.subTiles.length > 1}
      {@const popupPos = getPopupPosition()}
      <div class="fixed z-50 bg-transparent backdrop-blur-xl border-0 rounded-lg shadow-2xl py-2 min-w-48" style="top: {popupPos.top}px; left: {popupPos.left}px;" role="menu" tabindex="-1" on:mouseenter={handlePopupMouseEnter} on:mouseleave={handlePopupMouseLeave}>
        <div class="px-3 py-2 border-b border-base-300/30">
          <h3 class="font-medium text-base-content text-sm flex items-center gap-2">
            <div class="w-4 h-4 {activeTile.textColor}">
              <Icon icon={activeTile.icon} class="w-full h-full" />
            </div>
            {activeTile.label}
          </h3>
        </div>

        <div class="py-1">
          {#each activeTile.subTiles as subTile (subTile.path)}
            <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors duration-150 text-left {subTile.path === $page.url.pathname ? 'bg-primary/10 text-primary font-medium' : ''}" on:click={() => navigateTo(subTile.path)} role="menuitem" tabindex="-1">
              <div class="w-4 h-4 {activeTile.textColor} flex-shrink-0">
                <Icon icon={subTile.icon} class="w-full h-full" />
              </div>
              <span class="flex-1">{subTile.label}</span>
              {#if subTile.path === $page.url.pathname}
                <Icon icon="heroicons:check" class="w-4 h-4 text-primary" />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .tile-card.active {
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-color: hsl(var(--b1));
    --tw-ring-color: hsl(var(--p));
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }

  .tile-card:hover {
    transform: translateY(-2px);
  }
</style>
