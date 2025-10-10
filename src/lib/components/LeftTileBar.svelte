<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { homeSounds } from "$lib/utils/sounds";

  const dispatch = createEventDispatcher();

  // State for which main tile is being hovered
  let hoveredTile = null;
  let hoveredTileElement = null;

  // State for expanded sidebar
  let expandedSidebar = false;
  let currentSection = null;

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
        { label: "Household", path: "/home/household", icon: "heroicons:squares-2x2" },
        { label: "Family Members", path: "/home/members", icon: "heroicons:users" },
        { label: "Calendar", path: "/home/family-calendar-modern", icon: "heroicons:calendar-days" },
        { label: "Notes", path: "/home/family-notes-modern", icon: "heroicons:document-text" },
        { label: "Reminders", path: "/home/reminders", icon: "heroicons:bell-alert" },
        { label: "Personal Contacts", path: "/home/contacts", icon: "heroicons:phone" },
        { label: "Emergency Contacts", path: "/home/contacts/emergency", icon: "heroicons:exclamation-triangle" },
        { label: "Vendors & Services", path: "/home/contacts/vendors", icon: "heroicons:wrench" },
        { label: "Service Directory", path: "/home/contacts/directory", icon: "heroicons:building-storefront" },
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
      routes: ["/divinity", "/divinity/panchangam", "/divinity/rituals", "/divinity/temple", "/divinity/mantras"],
      subTiles: [
        { label: "Dashboard", path: "/divinity", icon: "heroicons:sun" },
        { label: "Panchangam", path: "/divinity/panchangam", icon: "heroicons:sun" },
        { label: "Rituals", path: "/divinity/rituals", icon: "heroicons:sparkles" },
        { label: "Temples", path: "/divinity/temple", icon: "heroicons:building-storefront" },
        { label: "Festivals", path: "/culture/festival-calendar", icon: "heroicons:calendar" },
        { label: "Mantras", path: "/divinity/mantras", icon: "heroicons:musical-note" },
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
        { label: "Dashboard", path: "/food", icon: "heroicons:utensils" },
        { label: "Meals & Planning", path: "/food/meals", icon: "heroicons:calendar-days" },
        { label: "Recipes", path: "/food/recipes", icon: "heroicons:book-open" },
        { label: "Traditional Recipes", path: "/food/recipes/traditional", icon: "heroicons:document-text" },
        { label: "Grocery & Pantry", path: "/food/grocery", icon: "heroicons:shopping-cart" },
        { label: "Pantry Management", path: "/pantry", icon: "heroicons:archive-box" },
        { label: "Kitchen Dashboard", path: "/food/kitchen", icon: "heroicons:home" },
        { label: "Fresh Items", path: "/food/kitchen/fresh", icon: "heroicons:leaf" },
        { label: "Kids Meals", path: "/food/kitchen/kids", icon: "heroicons:user-group" },
        { label: "Kitchen Meals", path: "/food/kitchen/meals", icon: "heroicons:utensils" },
        { label: "Cleaning Schedule", path: "/food/kitchen/cleaning", icon: "heroicons:sparkles" },
        { label: "Kitchen Vendors", path: "/food/kitchen/vendors", icon: "heroicons:truck" },
        { label: "Wellness Kitchen", path: "/food/kitchen/wellness", icon: "heroicons:heart" },
        { label: "Festival Foods", path: "/food/kitchen/festivals", icon: "heroicons:cake" },
      ],
    },
    {
      id: "education",
      label: "Learning",
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
        { label: "Family Library", path: "/education/library", icon: "heroicons:book-open" },
        { label: "Studies & Exams", path: "/education/studies", icon: "heroicons:pencil" },
        { label: "Learning Goals", path: "/education/learning-goals", icon: "heroicons:light-bulb" },
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
        { label: "Shivo Agentic", path: "/shivo-ai/agentic", icon: "heroicons:robot" },
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
        { label: "Health Dashboard", path: "/health", icon: "heroicons:heart" },
        { label: "Wellness Tracking", path: "/health/wellness", icon: "heroicons:shield-check" },
        { label: "Yoga & Exercise", path: "/health/yoga", icon: "heroicons:user" },
        { label: "Health Journal", path: "/health/journal", icon: "heroicons:pencil-square" },
        { label: "Hobbies & Activities", path: "/health/hobbies-activities", icon: "heroicons:puzzle-piece" },
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
        { label: "Recharges", path: "/finances/recharges", icon: "heroicons:device-phone-mobile" },
        { label: "Expenses", path: "/finances/expenses", icon: "heroicons:credit-card" },
        { label: "Budget", path: "/finances/budget", icon: "heroicons:calculator" },
        { label: "Insurance", path: "/finances/insurance", icon: "heroicons:shield-check" },
        { label: "Investments", path: "/finances/investments", icon: "heroicons:chart-line" },
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
      id: "culture",
      label: "Culture",
      icon: "heroicons:globe-asia-australia",
      color: "from-amber-500 to-amber-600",
      borderColor: "border-amber-500/50",
      textColor: "text-amber-600 dark:text-amber-400",
      description: "Traditions & Heritage",
      subTiles: [
        { label: "Culture Dashboard", path: "/culture", icon: "heroicons:globe-asia-australia" },
        { label: "Festival Calendar", path: "/culture/festival-calendar", icon: "heroicons:calendar" },
        { label: "Things to Follow", path: "/culture/things-to-follow", icon: "heroicons:checklist" },
        { label: "Things to Remember", path: "/culture/things-to-remember", icon: "heroicons:light-bulb" },
        { label: "Daily Voice Guide", path: "/culture/daily-voice-guide", icon: "heroicons:microphone" },
        { label: "Lifestyle Guide", path: "/culture/lifestyle-guide", icon: "heroicons:home" },
        { label: "Places to Visit", path: "/culture/places-to-visit", icon: "heroicons:map-pin" },
        { label: "Kolam Patterns", path: "/culture/kolam", icon: "heroicons:sparkles" },
      ],
    },
    {
      id: "travel",
      label: "Travel",
      icon: "heroicons:map",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-cyan-500/50",
      textColor: "text-cyan-600 dark:text-cyan-400",
      description: "Trips & Journeys",
      subTiles: [
        { label: "Travel Dashboard", path: "/travel", icon: "heroicons:map" },
        { label: "Trip History", path: "/travel/trips", icon: "heroicons:calendar-days" },
        { label: "Community", path: "/travel/community", icon: "heroicons:users" },
        { label: "Leisure", path: "/travel/leisure", icon: "heroicons:sparkles" },
      ],
    },
    {
      id: "issues",
      label: "Issues",
      icon: "heroicons:exclamation-triangle",
      color: "from-red-500 to-red-600",
      borderColor: "border-red-500/50",
      textColor: "text-red-600 dark:text-red-400",
      description: "Problems & Maintenance",
      subTiles: [
        { label: "Issues Dashboard", path: "/issues", icon: "heroicons:exclamation-triangle" },
        { label: "Urgent Issues", path: "/issues/urgent", icon: "heroicons:bolt" },
        { label: "Repairs", path: "/issues/repairs", icon: "heroicons:wrench-screwdriver" },
        { label: "Upgrades", path: "/issues/upgrades", icon: "heroicons:arrow-trending-up" },
        { label: "Projects", path: "/issues/projects", icon: "heroicons:clipboard-document-list" },
        { label: "Maintenance", path: "/issues/maintenance", icon: "heroicons:cog" },
        { label: "Requests", path: "/issues/requests", icon: "heroicons:chat-bubble-left-right" },
      ],
    },
    {
      id: "memories",
      label: "Memories",
      icon: "heroicons:photo",
      color: "from-rose-500 to-rose-600",
      borderColor: "border-rose-500/50",
      textColor: "text-rose-600 dark:text-rose-400",
      description: "Family History & Stories",
      subTiles: [
        { label: "Memories Dashboard", path: "/memories", icon: "heroicons:photo" },
        { label: "Family Stories", path: "/memories/family-stories", icon: "heroicons:book-open" },
        { label: "Legacy", path: "/memories/legacy", icon: "heroicons:shield-check" },
        { label: "Family Governance", path: "/memories/family-governance", icon: "heroicons:scale" },
        { label: "Lifeflow", path: "/memories/lifeflow", icon: "heroicons:arrows-right-left" },
      ],
    },
  ];

  // Check if current route belongs to a tile section
  function isTileActive(tile) {
    return tile.subTiles.some((subTile) => $page.url.pathname === subTile.path);
  }

  // Get current section based on active route
  $: currentSectionData = mainTiles.find((tile) => isTileActive(tile));

  // Handle tile click - toggle sidebar expansion
  function handleTileClick(tileId, event) {
    event.preventDefault();
    const tile = mainTiles.find((t) => t.id === tileId);

    if (tile) {
      // If clicking the same tile, toggle sidebar
      if (currentSection === tileId && expandedSidebar) {
        expandedSidebar = false;
        currentSection = null;
      } else {
        // Expand sidebar and set current section
        expandedSidebar = true;
        currentSection = tileId;
      }

      // Play sound
      try {
        homeSounds.playClick();
      } catch (error) {
        console.warn("Sound playback failed:", error);
      }
    }
  }

  // Handle mouse enter on tile
  function handleTileMouseEnter(tileId, event) {
    hoveredTile = tileId;
    hoveredTileElement = event.currentTarget;

    // Play subtle tap sound for tiles with sub-menus
    const tile = mainTiles.find((t) => t.id === tileId);
    if (tile && tile.subTiles.length > 1) {
      try {
        homeSounds.playTap();
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
      homeSounds.playClick();
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

  // Handle hover sound effect
  function handleHover() {
    try {
      homeSounds.playTap();
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
  }

  // Calculate popup position
  function getPopupPosition() {
    if (!hoveredTileElement) return { top: 0, left: 0 };

    const rect = hoveredTileElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popupWidth = 120; // min-w-30 = 120px
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

<div class="left-tile-bar flex h-screen bg-transparent backdrop-blur-sm relative z-10 overflow-hidden flex-shrink-0" style="height: calc(100vh - 80px);">
  <!-- Main Navigation Tiles -->
  <div class="w-12 flex flex-col">
    <div class="p-2">
      <!-- Single Column Main Tiles -->
      <div class="flex flex-col gap-2">
        {#each mainTiles as tile (tile.id)}
          <div class="relative">
            <button class="tile-button group relative w-full aspect-square rounded-xl border-0 transition-all duration-300 hover:shadow-lg hover:scale-105 {currentSection === tile.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100' : ''}" on:mouseenter={(e) => handleTileMouseEnter(tile.id, e)} on:mouseleave={handleTileMouseLeave} on:click={(e) => handleTileClick(tile.id, e)}>
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
  </div>

  <!-- Expanded Sidebar Menu -->
  {#if expandedSidebar && currentSection}
    {@const activeTile = mainTiles.find((t) => t.id === currentSection)}
    {#if activeTile}
      <div class="w-48 bg-base-100/95 backdrop-blur-xl border-l border-base-300/50 shadow-2xl flex flex-col max-h-full overflow-hidden">
        <!-- Header -->
        <div class="p-4 border-b border-base-300/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 {activeTile.textColor}">
                <Icon icon={activeTile.icon} class="w-full h-full" />
              </div>
              <div>
                <h3 class="font-semibold text-base-content text-lg">{activeTile.label}</h3>
                <p class="text-sm text-base-content/70">{activeTile.description}</p>
              </div>
            </div>
            <button
              class="btn btn-ghost btn-sm btn-circle"
              on:click={() => {
                expandedSidebar = false;
                currentSection = null;
              }}
              on:mouseenter={handleHover}
            >
              <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Menu Content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Main Category Button -->
          <div class="p-4">
            <button class="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r {activeTile.color} text-white cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 mb-4" on:click={() => navigateTo(activeTile.subTiles[0].path)} on:mouseenter={handleHover}>
              <Icon icon={activeTile.icon} class="text-lg" />
              <div>
                <div class="font-medium">{activeTile.label} Dashboard</div>
                <div class="text-xs opacity-90">{activeTile.description}</div>
              </div>
            </button>
          </div>

          <!-- Sub-items for current section -->
          <div class="px-4 pb-4">
            <h4 class="text-sm font-medium text-base-content/60 mb-3 uppercase tracking-wide">Navigation</h4>
            <div class="space-y-1">
              {#each activeTile.subTiles as subTile (subTile.path)}
                <button class="w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm transition-colors duration-200 hover:bg-base-200/50 {subTile.path === $page.url.pathname ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary' : 'text-base-content hover:text-primary'}" on:click={() => navigateTo(subTile.path)} on:mouseenter={handleHover}>
                  <div class="w-5 h-5 {activeTile.textColor} flex-shrink-0">
                    <Icon icon={subTile.icon} class="w-full h-full" />
                  </div>
                  <span class="flex-1 truncate">{subTile.label}</span>
                  {#if subTile.path === $page.url.pathname}
                    <Icon icon="heroicons:check" class="w-4 h-4 text-primary flex-shrink-0" />
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}

  <!-- Hover Popup Menu (when sidebar is not expanded) -->
  {#if hoveredTile && !expandedSidebar}
    {@const activeTile = mainTiles.find((t) => t.id === hoveredTile)}
    {#if activeTile && activeTile.subTiles.length > 1}
      {@const popupPos = getPopupPosition()}
      <div class="fixed z-50 bg-base-100/95 backdrop-blur-xl border border-base-300/50 rounded-lg shadow-2xl py-2 min-w-48" style="top: {popupPos.top}px; left: {popupPos.left}px;" role="menu" tabindex="-1" on:mouseenter={handlePopupMouseEnter} on:mouseleave={handlePopupMouseLeave}>
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
