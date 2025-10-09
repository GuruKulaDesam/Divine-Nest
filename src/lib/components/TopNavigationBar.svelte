<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";

  const dispatch = createEventDispatcher();

  // Handle actions from ribbon - simplified for always-visible items
  function navigateTo(item) {
    if (item.path) {
      // Use goto for navigation
      import("$app/navigation").then(({ goto }) => goto(item.path));
    } else if (item.action) {
      dispatch("action", { action: item.action, tile: item });
    }
  }

  // Ribbon groups organized like Excel - always visible items
  const ribbonGroups = [
    {
      id: "create",
      label: "Create",
      icon: "heroicons:plus-circle",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
      items: [
        { label: "Task", icon: "heroicons:clipboard-document-list", path: "/todo", shortcut: "Ctrl+T" },
        { label: "Note", icon: "heroicons:document-text", path: "/family-notes-modern", shortcut: "Ctrl+N" },
        { label: "Event", icon: "heroicons:calendar-days", path: "/family-calendar-modern", shortcut: "Ctrl+E" },
        { label: "Reminder", icon: "heroicons:bell-alert", path: "/reminders", shortcut: "Ctrl+R" },
      ],
    },
    {
      id: "voice",
      label: "Voice & AI",
      icon: "heroicons:microphone",
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-600 dark:text-purple-400",
      items: [
        { label: "Record", icon: "heroicons:microphone", path: "/recordings", shortcut: "Ctrl+V" },
        { label: "AI", icon: "heroicons:sparkles", path: "/shivo-ai", shortcut: "Ctrl+A" },
        { label: "Voice Cmd", icon: "heroicons:chat-bubble-left-right", action: "voice-command", shortcut: "Ctrl+Shift+V" },
        { label: "Agentic", icon: "heroicons:robot", path: "/shivo-agentic", shortcut: "Ctrl+Shift+A" },
      ],
    },
    {
      id: "quick-actions",
      label: "Quick Actions",
      icon: "heroicons:bolt",
      color: "from-blue-500 to-cyan-600",
      textColor: "text-blue-600 dark:text-blue-400",
      items: [
        { label: "Quick Task", icon: "heroicons:bolt", action: "quick-task", shortcut: "Ctrl+Q" },
        { label: "Quick Note", icon: "heroicons:pencil-square", action: "quick-note", shortcut: "Ctrl+Shift+N" },
        { label: "Schedule", icon: "heroicons:clock", action: "quick-schedule", shortcut: "Ctrl+Shift+E" },
        { label: "Search", icon: "heroicons:magnifying-glass", action: "search", shortcut: "Ctrl+F" },
      ],
    },
    {
      id: "manage",
      label: "Manage",
      icon: "heroicons:cog-6-tooth",
      color: "from-orange-500 to-red-600",
      textColor: "text-orange-600 dark:text-orange-400",
      items: [
        { label: "Save All", icon: "heroicons:document-check", action: "save-all", shortcut: "Ctrl+S" },
        { label: "Settings", icon: "heroicons:cog-6-tooth", action: "settings", shortcut: "Ctrl+," },
        { label: "Share", icon: "heroicons:share", action: "share-whatsapp", shortcut: "Ctrl+Shift+S" },
        { label: "Export", icon: "heroicons:arrow-down-tray", action: "export-data", shortcut: "Ctrl+E" },
      ],
    },
  ];

  // Check if current route belongs to a group
  function isGroupActive(group) {
    return group.items.some((item) => $page.url.pathname === item.path);
  }

  // Check if item is active
  function isItemActive(item) {
    return $page.url.pathname === item.path;
  }
</script>

<div class="excel-ribbon w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
  <!-- Main Ribbon Container -->
  <div class="flex items-center px-4 py-2 min-h-[60px]">
    <!-- Left Section: Logo and App Title -->
    <div class="flex items-center space-x-4 flex-shrink-0">
      <!-- App Title -->
      <div class="flex items-center space-x-2">
        <div class="flex flex-col">
          <span class="text-sm font-medium bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent leading-tight">தமிழச்சி இல்லம்</span>
          <span class="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">Home Maker</span>
        </div>
      </div>
    </div>

    <!-- Center Section: Excel-like Ribbon Groups - Always Visible -->
    <div class="flex-1 flex justify-center mx-2">
      <div class="flex items-stretch space-x-1 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg p-1 shadow-inner border border-gray-200/50 dark:border-gray-700/50 overflow-x-auto">
        {#each ribbonGroups as group (group.id)}
          <div class="flex items-center space-x-1 px-2 py-1 border-r border-gray-200/30 dark:border-gray-600/30 last:border-r-0">
            <!-- Group Label -->
            <div class="flex flex-col items-center text-center min-w-[60px]">
              <div class="w-3 h-3 {group.textColor} mb-0.5">
                <Icon icon={group.icon} class="w-full h-full" />
              </div>
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400 leading-tight">{group.label}</span>
            </div>

            <!-- Group Items - Always Visible -->
            <div class="flex items-center space-x-0.5 ml-2">
              {#each group.items as item (item.label)}
                <button class="group relative flex flex-col items-center justify-center w-8 h-8 rounded hover:bg-white dark:hover:bg-gray-700 transition-all duration-150 border border-transparent hover:border-gray-300/50 dark:hover:border-gray-600/50 {isItemActive(item) ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800' : ''}" on:click={() => navigateTo(item)} title="{item.label}{item.shortcut ? ` (${item.shortcut})` : ''}" aria-label={item.label}>
                  <div class="w-3 h-3 {group.textColor} group-hover:scale-110 transition-transform duration-200">
                    <Icon icon={item.icon} class="w-full h-full" />
                  </div>
                  {#if isItemActive(item)}
                    <div class="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right Section: User Menu and Minimal Actions -->
    <div class="flex items-center space-x-2 flex-shrink-0">
      <!-- Search Button -->
      <button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105" title="Search (Ctrl+F)" on:click={() => dispatch("action", { action: "search" })}>
        <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
      </button>

      <!-- Settings Button -->
      <button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105" title="Settings (Ctrl+,)" on:click={() => dispatch("action", { action: "settings" })}>
        <Icon icon="heroicons:cog-6-tooth" class="w-5 h-5" />
      </button>

      <!-- User Menu -->
      <div class="relative group">
        <button class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"> U </button>

        <!-- User Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div class="p-3 border-b border-gray-200 dark:border-gray-700">
            <div class="text-sm font-medium text-gray-900 dark:text-white">User Name</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">user@example.com</div>
          </div>
          <div class="py-1">
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"> Profile Settings </button>
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"> Preferences </button>
            <button class="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150" on:click={() => dispatch("action", { action: "logout" })}> Sign Out </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .excel-ribbon {
    position: relative;
    z-index: 10;
    backdrop-filter: blur(8px);
  }

  .excel-ribbon * {
    transition-property: background-color, border-color, color, fill, stroke, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Compact ribbon layout */
  .ribbon-group {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  /* Custom scrollbar for ribbon overflow */
  .excel-ribbon ::-webkit-scrollbar {
    height: 4px;
  }

  .excel-ribbon ::-webkit-scrollbar-track {
    background: transparent;
  }

  .excel-ribbon ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 2px;
  }

  .excel-ribbon ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .ribbon-group {
      min-width: 50px;
    }
  }

  @media (max-width: 768px) {
    .excel-ribbon .flex-1 {
      overflow-x: auto;
      scrollbar-width: thin;
    }
  }
</style>
