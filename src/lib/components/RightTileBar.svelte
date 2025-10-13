<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { homeSounds } from "$lib/utils/sounds";

  const dispatch = createEventDispatcher();

  let hoveredTile = null;
  let hoveredTileElement = null;

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

  // Global actions that apply to all pages - Updated with all home management modules
  let mainTiles = [
    {
      id: "critical-urgent",
      label: "Critical & Urgent",
      icon: "heroicons:exclamation-triangle",
      color: "from-red-500 to-red-600",
      borderColor: "border-red-500/50",
      textColor: "text-red-600 dark:text-red-400",
      description: "Immediate attention required",
      subTiles: [
        { label: "Issues", icon: "heroicons:exclamation-circle", path: "/issues" },
        { label: "Requests", icon: "heroicons:chat-bubble-left-right", path: "/requests" },
        { label: "Tasks", icon: "heroicons:clipboard-document-check", path: "/tasks" },
        { label: "Alerts", icon: "heroicons:bell-alert", path: "/alerts" },
      ],
    },
    {
      id: "daily-operations",
      label: "Daily Operations",
      icon: "heroicons:home",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500/50",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Daily household management",
      subTiles: [
        { label: "Foods", icon: "heroicons:cake", path: "/foods" },
        { label: "Inventory", icon: "heroicons:archive-box", path: "/inventory" },
        { label: "Activities", icon: "heroicons:bolt", path: "/activities" },
      ],
    },
    {
      id: "planning-coordination",
      label: "Planning & Coordination",
      icon: "heroicons:calendar",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-500/50",
      textColor: "text-emerald-600 dark:text-emerald-400",
      description: "Weekly & monthly planning",
      subTiles: [
        { label: "Finance", icon: "heroicons:currency-rupee", path: "/finance" },
        { label: "Rewards", icon: "heroicons:trophy", path: "/rewards" },
        { label: "Assets", icon: "heroicons:building-office", path: "/assets" },
      ],
    },
    {
      id: "reference-tools",
      label: "Reference & Tools",
      icon: "heroicons:wrench-screwdriver",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-500/50",
      textColor: "text-purple-600 dark:text-purple-400",
      description: "Tools and reference materials",
      subTiles: [
        { label: "Family", icon: "heroicons:users", path: "/family" },
        { label: "AI Prompts", icon: "heroicons:sparkles", path: "/ai-prompts" },
        { label: "Directory", icon: "heroicons:building-storefront", path: "/directory" },
        { label: "Users", icon: "heroicons:user-group", path: "/users" },
      ],
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: "heroicons:sparkles",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-500/50",
      textColor: "text-pink-600 dark:text-pink-400",
      description: "AI Help & Automation",
      subTiles: [
        { label: "Ask AI", icon: "heroicons:sparkles", path: "/shivo-ai" },
        { label: "Agentic AI", icon: "heroicons:robot", path: "/shivo-agentic" },
        { label: "Voice Assistant", icon: "heroicons:microphone", action: "voice-assistant" },
      ],
    },
    {
      id: "quick-actions",
      label: "Quick Actions",
      icon: "heroicons:bolt",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-cyan-500/50",
      textColor: "text-cyan-600 dark:text-cyan-400",
      description: "Common Actions",
      subTiles: [
        { label: "Search", icon: "heroicons:magnifying-glass", action: "search" },
        { label: "Save All", icon: "heroicons:document-check", action: "save-all" },
        { label: "Settings", icon: "heroicons:cog-6-tooth", action: "settings" },
      ],
    },
  ];

  // Check if current route belongs to a tile section
  function isTileActive(tile) {
    return tile.subTiles.some((subTile) => $page.url.pathname === subTile.path);
  }

  // Handle mouse leave from tile - only hide if not hovering over popup
  function handleTileMouseLeave() {
    console.log("RightTileBar: Mouse leave from tile");
    // Delay hiding to allow mouse to move to popup
    setTimeout(() => {
      if (!isHoveringPopup) {
        console.log("RightTileBar: Hiding popup");
        hoveredTile = null;
        hoveredTileElement = null;
      }
    }, 100);
  }

  // Track if mouse is over popup
  let isHoveringPopup = false;

  function handlePopupMouseEnter() {
    console.log("RightTileBar: Mouse enter popup");
    isHoveringPopup = true;
  }

  function handlePopupMouseLeave() {
    console.log("RightTileBar: Mouse leave popup");
    isHoveringPopup = false;
    hoveredTile = null;
    hoveredTileElement = null;
  }

  // Handle sub-tile navigation/action
  function navigateTo(subTile) {
    try {
      homeSounds.playClick();
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
    if (subTile.path) {
      // Navigate to a page
      goto(subTile.path);
    } else if (subTile.action) {
      // Dispatch action event for parent component to handle
      dispatch("action", { action: subTile.action, tile: subTile });
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
    const popupWidth = 280; // Approximate popup width
    const popupHeight = 200; // Approximate popup height

    // Position popup to the left of the tile by default (since it's a right tile bar)
    let top = rect.top;
    let left = rect.left - popupWidth - 8;

    // If popup would go off-screen to the left, position it to the right
    if (left < 20) {
      left = rect.right + 8;
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

<div class="right-tile-bar flex flex-col min-w-16 h-screen bg-transparent relative z-10 overflow-hidden flex-shrink-0">
  <!-- Collapsed state - just icons -->
  <div class="w-16 p-2 space-y-2">
    {#each mainTiles as tile (tile.id)}
      <div class="tile-card relative group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 {isTileActive(tile) ? 'active' : ''}" class:hovered={hoveredTile === tile.id}>
        <button class="w-full h-12 bg-gradient-to-br {tile.color} hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden" on:mouseenter={(event) => handleTileMouseEnter(tile.id, event)} on:mouseleave={handleTileMouseLeave} aria-label={tile.label}>
          <div class="absolute inset-0 bg-gradient-to-br {tile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

          <div class="relative flex flex-col items-center justify-center h-full p-1">
            <div class="w-5 h-5 mb-0.5 {tile.textColor} group-hover:scale-110 transition-transform duration-300">
              <Icon icon={tile.icon} class="w-full h-full" />
            </div>
            <div class="text-[9px] font-medium text-white group-hover:text-white transition-colors duration-300 text-center leading-tight">
              {tile.label}
            </div>
            {#if isTileActive(tile)}
              <div class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            {/if}
          </div>
        </button>
      </div>
    {/each}
  </div>

  <!-- Hover popup for individual tiles -->
  {#if hoveredTile && hoveredTileElement}
    {@const tile = mainTiles.find((t) => t.id === hoveredTile)}
    {@const position = getPopupPosition()}
    {#if tile}
      <div class="fixed z-50 bg-transparent backdrop-blur-xl border-0 rounded-lg shadow-2xl p-3 w-64" style="top: {position.top}px; left: {position.left}px;" on:mouseenter={handlePopupMouseEnter} on:mouseleave={handlePopupMouseLeave} role="menu" tabindex="-1">
        <h4 class="text-sm font-medium text-base-content mb-3 flex items-center gap-2 pb-2 border-b border-base-300/30">
          <div class="w-4 h-4 rounded bg-gradient-to-br {tile.color} flex items-center justify-center">
            <Icon icon={tile.icon} class="w-3 h-3 text-white" />
          </div>
          {tile.label}
        </h4>

        <div class="grid grid-cols-2 gap-1">
          {#each tile.subTiles as subTile (subTile.label)}
            <button class="group relative p-2 rounded-md hover:bg-base-200 transition-colors duration-150 text-center border border-transparent hover:border-base-300/50" on:click={() => navigateTo(subTile)} role="menuitem" tabindex="-1">
              <div class="w-5 h-5 mx-auto mb-1 {tile.textColor} group-hover:scale-110 transition-transform duration-200">
                <Icon icon={subTile.icon} class="w-full h-full" />
              </div>
              <div class="text-xs font-medium text-base-content group-hover:text-primary transition-colors duration-200 leading-tight">
                {subTile.label}
              </div>
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .action-tile:hover {
    transform: translateY(-1px);
  }

  .action-tile:active {
    transform: translateY(0);
  }
</style>
