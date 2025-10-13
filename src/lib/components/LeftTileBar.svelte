<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { homeSounds } from "$lib/utils/sounds";

  const dispatch = createEventDispatcher();

  // State for which main tile is being hovered
  let hoveredTile = null;
  let hoveredTileElement = null;

  // State for expanded sidebar
  let expandedSidebar = false;
  let currentSection = null;

  // Main navigation tiles - Single column with one-word table names
  const mainTiles = [
    {
      id: "issue",
      label: "Issue",
      icon: "heroicons:exclamation-triangle",
      color: "from-red-500 to-red-600",
      borderColor: "border-red-500/50",
      textColor: "text-red-600 dark:text-red-400",
      description: "Issues and problems",
      subTiles: [
        { label: "Issues", path: "/issues", icon: "heroicons:exclamation-circle" },
      ],
    },
    {
      id: "request",
      label: "Request",
      icon: "heroicons:chat-bubble-left-right",
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500/50",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Service requests",
      subTiles: [
        { label: "Requests", path: "/requests", icon: "heroicons:chat-bubble-left-right" },
      ],
    },
    {
      id: "task",
      label: "Task",
      icon: "heroicons:clipboard-document-check",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Tasks and todos",
      subTiles: [
        { label: "Tasks", path: "/tasks", icon: "heroicons:clipboard-document-check" },
      ],
    },
    {
      id: "alert",
      label: "Alert",
      icon: "heroicons:bell-alert",
      color: "from-yellow-500 to-yellow-600",
      borderColor: "border-yellow-500/50",
      textColor: "text-yellow-600 dark:text-yellow-400",
      description: "Alerts and notifications",
      subTiles: [
        { label: "Alerts", path: "/alerts", icon: "heroicons:bell-alert" },
      ],
    },
    {
      id: "family",
      label: "Family",
      icon: "heroicons:users",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-500/50",
      textColor: "text-purple-600 dark:text-purple-400",
      description: "Family management",
      subTiles: [
        { label: "Family", path: "/family", icon: "heroicons:user-group" },
      ],
    },
    {
      id: "food",
      label: "Food",
      icon: "heroicons:cake",
      color: "from-green-500 to-green-600",
      borderColor: "border-green-500/50",
      textColor: "text-green-600 dark:text-green-400",
      description: "Food and nutrition",
      subTiles: [
        { label: "Foods", path: "/food", icon: "heroicons:cake" },
      ],
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: "heroicons:archive-box",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-cyan-500/50",
      textColor: "text-cyan-600 dark:text-cyan-400",
      description: "Inventory management",
      subTiles: [
        { label: "Inventory", path: "/inventory", icon: "heroicons:archive-box" },
      ],
    },
    {
      id: "activity",
      label: "Activity",
      icon: "heroicons:bolt",
      color: "from-indigo-500 to-indigo-600",
      borderColor: "border-indigo-500/50",
      textColor: "text-indigo-600 dark:text-indigo-400",
      description: "Activities and events",
      subTiles: [
        { label: "Activities", path: "/activities", icon: "heroicons:bolt" },
      ],
    },
    {
      id: "directory",
      label: "Directory",
      icon: "heroicons:building-storefront",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-500/50",
      textColor: "text-pink-600 dark:text-pink-400",
      description: "Directory and contacts",
      subTiles: [
        { label: "Directory", path: "/directory", icon: "heroicons:building-storefront" },
      ],
    },
    {
      id: "expense",
      label: "Expense",
      icon: "heroicons:currency-rupee",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-500/50",
      textColor: "text-emerald-600 dark:text-emerald-400",
      description: "Expenses and finances",
      subTiles: [
        { label: "Expenses", path: "/expenses", icon: "heroicons:receipt-refund" },
      ],
    },
    {
      id: "reward",
      label: "Reward",
      icon: "heroicons:trophy",
      color: "from-amber-500 to-amber-600",
      borderColor: "border-amber-500/50",
      textColor: "text-amber-600 dark:text-amber-400",
      description: "Rewards and achievements",
      subTiles: [
        { label: "Rewards", path: "/rewards", icon: "heroicons:trophy" },
      ],
    },
    {
      id: "asset",
      label: "Asset",
      icon: "heroicons:building-office",
      color: "from-teal-500 to-teal-600",
      borderColor: "border-teal-500/50",
      textColor: "text-teal-600 dark:text-teal-400",
      description: "Assets and property",
      subTiles: [
        { label: "Assets", path: "/assets", icon: "heroicons:building-office" },
      ],
    },
  ];

  // Check if current route belongs to a tile section
  function isTileActive(tile) {
    return tile.subTiles.some((subTile) => $page.url.pathname === subTile.path);
  }

  // Get current section based on active route
  $: currentSectionData = mainTiles.find((tile) => isTileActive(tile));

  // Handle tile click - navigate directly to the first sub-tile
  function handleTileClick(tileId, event) {
    event.preventDefault();
    const tile = mainTiles.find((t) => t.id === tileId);

    if (tile && tile.subTiles.length > 0) {
      // Navigate directly to the first (and usually only) sub-tile
      navigateTo(tile.subTiles[0].path);
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
    // Use goto for proper SvelteKit routing with base path
    goto(path).catch((error) => {
      console.warn("Navigation failed:", error);
    });
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
    const popupWidth = 144; // min-w-36 = 144px
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

<div class="left-tile-bar flex h-screen bg-white dark:bg-gray-900 border-r border-white dark:border-gray-700 z-50 overflow-hidden flex-shrink-0" style="width: 80px;">
  <!-- Main Navigation Tiles -->
  <div class="w-full flex flex-col">
    <div class="p-1">
      <!-- Single Column Main Tiles -->
      <div class="flex flex-col gap-1">
        {#each mainTiles as tile (tile.id)}
          <div class="relative">
            <button class="tile-button group relative w-full aspect-square rounded-xl border-0 transition-all duration-300 hover:shadow-lg hover:scale-105 {currentSection === tile.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100' : ''}" on:mouseenter={(e) => handleTileMouseEnter(tile.id, e)} on:mouseleave={handleTileMouseLeave} on:click={(e) => handleTileClick(tile.id, e)}>
              <div class="absolute inset-0 bg-gradient-to-br {tile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

              <div class="relative flex flex-col items-center justify-center h-full p-0.5">
                <div class="w-4 h-4 mb-0.5 {tile.textColor} group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={tile.icon} class="w-full h-full" />
                </div>
                <div class="text-[8px] font-medium text-base-content group-hover:text-primary transition-colors duration-300 text-center leading-tight">
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
      <div class="w-72 bg-base-100 border-l border-base-300 shadow-2xl flex flex-col max-h-full overflow-hidden">
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
      <div class="fixed z-50 bg-base-100 border border-base-300 rounded-lg shadow-2xl py-2 min-w-48" style="top: {popupPos.top}px; left: {popupPos.left}px;" role="menu" tabindex="-1" on:mouseenter={handlePopupMouseEnter} on:mouseleave={handlePopupMouseLeave}>
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
