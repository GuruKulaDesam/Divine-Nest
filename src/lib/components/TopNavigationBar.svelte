<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";

  const dispatch = createEventDispatcher();

  // Handle actions from right tile bar
  let hoveredTile = null;
  let hoveredTileElement = null;

  // Handle mouse enter on tile
  function handleTileMouseEnter(tileId, event) {
    hoveredTile = tileId;
    hoveredTileElement = event.currentTarget;
  }

  // Handle mouse leave from tile
  function handleTileMouseLeave() {
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

  // Handle sub-tile navigation/action
  function navigateTo(subTile) {
    if (subTile.path) {
      // Use goto for navigation
      import("$app/navigation").then(({ goto }) => goto(subTile.path));
    } else if (subTile.action) {
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
    const popupWidth = 280;
    const popupHeight = 200;

    let top = rect.bottom + 8;
    let left = rect.left - popupWidth / 2 + rect.width / 2;

    // Ensure popup doesn't go off-screen
    if (left < 20) left = 20;
    if (left + popupWidth > viewportWidth - 20) left = viewportWidth - popupWidth - 20;
    if (top + popupHeight > window.innerHeight - 20) top = rect.top - popupHeight - 8;

    return { top, left };
  }

  // Right tile bar tiles (transparent)
  const rightTiles = [
    {
      id: "tasks",
      label: "Tasks",
      icon: "heroicons:clipboard-document-list",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
      subTiles: [
        { label: "Add Task", icon: "heroicons:plus-circle", path: "/todo" },
        { label: "Quick Task", icon: "heroicons:bolt", action: "quick-task" },
        { label: "Task List", icon: "heroicons:clipboard-document-list", path: "/todo" },
      ],
    },
    {
      id: "notes",
      label: "Notes",
      icon: "heroicons:document-text",
      color: "from-green-500 to-green-600",
      textColor: "text-green-600 dark:text-green-400",
      subTiles: [
        { label: "New Note", icon: "heroicons:plus-circle", path: "/family-notes-modern" },
        { label: "Quick Note", icon: "heroicons:pencil-square", action: "quick-note" },
        { label: "Note List", icon: "heroicons:document-text", path: "/family-notes-modern" },
      ],
    },
    {
      id: "reminders",
      label: "Reminders",
      icon: "heroicons:bell-alert",
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600 dark:text-orange-400",
      subTiles: [
        { label: "Add Reminder", icon: "heroicons:plus-circle", path: "/reminders" },
        { label: "Quick Reminder", icon: "heroicons:bell", action: "quick-reminder" },
        { label: "Reminder List", icon: "heroicons:bell-alert", path: "/reminders" },
      ],
    },
    {
      id: "voice-recording",
      label: "Voice",
      icon: "heroicons:microphone",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
      subTiles: [
        { label: "Record Voice", icon: "heroicons:microphone", path: "/recordings" },
        { label: "Voice Notes", icon: "heroicons:musical-note", action: "voice-note" },
        { label: "Voice Commands", icon: "heroicons:chat-bubble-left-right", action: "voice-command" },
      ],
    },
    {
      id: "scheduling",
      label: "Schedule",
      icon: "heroicons:calendar-days",
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      subTiles: [
        { label: "Add Event", icon: "heroicons:plus-circle", path: "/family-calendar-modern" },
        { label: "Quick Schedule", icon: "heroicons:clock", action: "quick-schedule" },
        { label: "Calendar View", icon: "heroicons:calendar-days", path: "/family-calendar-modern" },
      ],
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: "heroicons:sparkles",
      color: "from-pink-500 to-pink-600",
      textColor: "text-pink-600 dark:text-pink-400",
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
      textColor: "text-cyan-600 dark:text-cyan-400",
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
</script>

<div class="outlook-nav w-full bg-transparent backdrop-blur-xl border-0">
  <!-- Main Navigation Container - Full Width -->
  <div class="flex items-center justify-between px-6 py-0 h-16">
    <!-- Left Section: Logo and App Title -->
    <div class="flex items-center space-x-4 h-full">
      <!-- App Title -->
      <div class="flex items-center space-x-1">
        <div class="flex flex-col">
          <span class="text-sm font-medium text-white/80 leading-tight">Gurukuladesam</span>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">Home Manager</span>
        </div>
      </div>
    </div>

    <!-- Right Section: Actions and Right Tile Bar -->
    <div class="flex items-center space-x-2 h-full">
      <!-- Right Tile Bar (Transparent) -->
      <div class="flex items-center space-x-1">
        {#each rightTiles as tile (tile.id)}
          <div class="relative">
            <button class="w-10 h-10 rounded-lg bg-transparent hover:bg-white/10 transition-all duration-200 flex items-center justify-center group" on:mouseenter={(event) => handleTileMouseEnter(tile.id, event)} on:mouseleave={handleTileMouseLeave} aria-label={tile.label}>
              <div class="w-5 h-5 {tile.textColor} group-hover:scale-110 transition-transform duration-200">
                <Icon icon={tile.icon} class="w-full h-full" />
              </div>
              {#if isTileActive(tile)}
                <div class="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              {/if}
            </button>
          </div>
        {/each}
      </div>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-300/30 dark:bg-gray-600/30 mx-1"></div>

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

  <!-- Hover popup for right tiles -->
  {#if hoveredTile && hoveredTileElement}
    {@const tile = rightTiles.find((t) => t.id === hoveredTile)}
    {@const position = getPopupPosition()}
    {#if tile}
      <div class="fixed z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-2xl p-3 w-64" style="top: {position.top}px; left: {position.left}px;" on:mouseenter={handlePopupMouseEnter} on:mouseleave={handlePopupMouseLeave} role="menu" tabindex="-1">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2 pb-2 border-b border-gray-200/50 dark:border-gray-700/50">
          <div class="w-4 h-4 rounded bg-gradient-to-br {tile.color} flex items-center justify-center">
            <Icon icon={tile.icon} class="w-3 h-3 text-white" />
          </div>
          {tile.label}
        </h4>

        <div class="grid grid-cols-2 gap-1">
          {#each tile.subTiles as subTile (subTile.label)}
            <button class="group relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 text-center border border-transparent hover:border-gray-300/50 dark:hover:border-gray-600/50" on:click={() => navigateTo(subTile)} role="menuitem" tabindex="-1">
              <div class="w-5 h-5 mx-auto mb-1 {tile.textColor} group-hover:scale-110 transition-transform duration-200">
                <Icon icon={subTile.icon} class="w-full h-full" />
              </div>
              <div class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 leading-tight">
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
