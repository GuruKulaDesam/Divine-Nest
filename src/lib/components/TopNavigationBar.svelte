<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import { homeSounds } from "$lib/utils/sounds";
  import { theme, themeActions, THEMES } from "$lib/stores/theme";
  import { background, backgroundActions, BACKGROUNDS } from "$lib/stores/background";

  const dispatch = createEventDispatcher();

  // Handle actions from ribbon - simplified for always-visible items
  function navigateTo(item) {
    homeSounds.playClick();
    if (item.path) {
      // Use goto for navigation
      import("$app/navigation").then(({ goto }) => goto(item.path));
    } else if (item.action) {
      dispatch("action", { action: item.action, tile: item });
    }
  }

  function handleHover() {
    homeSounds.playPop();
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
        { label: "Note", icon: "heroicons:document-text", path: "/home/family-notes-modern", shortcut: "Ctrl+N" },
        { label: "Event", icon: "heroicons:calendar-days", path: "/home/family-calendar-modern", shortcut: "Ctrl+E" },
        { label: "Reminder", icon: "heroicons:bell-alert", path: "/home/reminders", shortcut: "Ctrl+R" },
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

<div class="excel-ribbon fixed top-0 left-0 right-0 w-screen bg-transparent backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm z-50">
  <!-- Main Ribbon Container -->
  <div class="flex items-center px-6 py-2 min-h-[60px] max-w-full">
    <!-- Left Section: Logo and App Title -->
    <div class="flex items-center space-x-4 flex-shrink-0">
      <!-- App Title -->
      <div class="flex items-center space-x-2">
        <!-- Logo Text -->
        <div class="flex flex-col items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-xl shadow-lg p-1">
          <span class="text-xs font-bold text-white leading-tight" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5); font-family: 'Noto Sans Tamil', sans-serif; line-height: 1;">தாய்</span>
          <span class="text-xs font-bold text-white leading-tight" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5); font-family: 'Noto Sans Tamil', sans-serif; line-height: 1;">வழி</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs font-medium bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent leading-tight opacity-80">தமிழச்சி இல்லம்</span>
          <span class="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight opacity-80">Home Maker</span>
        </div>
      </div>
    </div>

    <!-- Center Section: Excel-like Ribbon Groups - Always Visible -->
    <div class="flex-1 flex justify-center mx-4">
      <div class="flex items-stretch overflow-x-auto">
        {#each ribbonGroups as group (group.id)}
          <div class="ribbon-group-separator flex flex-col items-center space-x-1 px-4 py-2 border-r-2 border-gray-300/60 dark:border-gray-600/60 last:border-r-0 relative">
            <!-- Group Label - Small text above -->
            <div class="text-[9px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {group.label}
            </div>

            <!-- Group Items - Always Visible -->
            <div class="flex items-center space-x-0.5">
              {#each group.items as item (item.label)}
                <button class="group relative flex flex-col items-center justify-center w-12 h-10 rounded hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-150 border border-transparent hover:border-gray-300/60 dark:hover:border-gray-600/60 {isItemActive(item) ? 'bg-blue-50/90 dark:bg-blue-900/50 border-blue-200/70 dark:border-blue-800/70' : ''}" on:click={() => navigateTo(item)} on:mouseenter={handleHover} title="{item.label}{item.shortcut ? ` (${item.shortcut})` : ''}" aria-label={item.label}>
                  <div class="w-4 h-4 {group.textColor} group-hover:scale-110 transition-transform duration-200 mb-0.5">
                    <Icon icon={item.icon} class="w-full h-full" />
                  </div>
                  <span class="text-[10px] font-medium text-gray-600 dark:text-gray-400 leading-tight text-center">{item.label.split(" ")[0]}</span>
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
      <button
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
        title="Search (Ctrl+F)"
        on:click={() => {
          homeSounds.playClick();
          dispatch("action", { action: "search" });
        }}
        on:mouseenter={handleHover}
      >
        <Icon icon="heroicons:magnifying-glass" class="w-5 h-5" />
      </button>

      <!-- Theme Toggle Dropdown -->
      <div class="relative group">
        <button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm" title="Theme: {$theme}" on:mouseenter={handleHover}>
          <Icon icon="heroicons:swatch" class="w-5 h-5" />
        </button>

        <!-- Theme Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-gray-800/95 border border-gray-200/60 dark:border-gray-700/60 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm">
          <div class="p-2">
            <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Viewing Mode</div>

            <!-- Light Mode -->
            <button
              class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-colors duration-200 {$theme === 'light' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              on:click={() => {
                homeSounds.playClick();
                themeActions.set("light");
              }}
              on:mouseenter={handleHover}
            >
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 flex-shrink-0"></div>
              <span>Light Mode</span>
              {#if $theme === "light"}
                <Icon icon="heroicons:check" class="w-4 h-4 text-blue-600 dark:text-blue-400 ml-auto flex-shrink-0" />
              {/if}
            </button>

            <!-- Dark Mode -->
            <button
              class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-colors duration-200 {$theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              on:click={() => {
                homeSounds.playClick();
                themeActions.set("dark");
              }}
              on:mouseenter={handleHover}
            >
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-600 flex-shrink-0"></div>
              <span>Dark Mode</span>
              {#if $theme === "dark"}
                <Icon icon="heroicons:check" class="w-4 h-4 text-blue-600 dark:text-blue-400 ml-auto flex-shrink-0" />
              {/if}
            </button>

            <!-- Transparent Mode -->
            <button
              class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-colors duration-200 {$theme === 'transparent' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              on:click={() => {
                homeSounds.playClick();
                themeActions.set("transparent");
              }}
              on:mouseenter={handleHover}
            >
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-green-400 border-2 border-transparent flex-shrink-0 opacity-80"></div>
              <span>Transparent Mode</span>
              {#if $theme === "transparent"}
                <Icon icon="heroicons:check" class="w-4 h-4 text-blue-600 dark:text-blue-400 ml-auto flex-shrink-0" />
              {/if}
            </button>
          </div>
        </div>
      </div>

      <!-- Background Toggle Button -->
      <button
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
        title="Toggle Background ({$background})"
        on:click={() => {
          homeSounds.playClick();
          backgroundActions.toggle();
        }}
        on:mouseenter={handleHover}
      >
        <Icon icon="heroicons:photo" class="w-5 h-5" />
      </button>

      <!-- Settings Button -->
      <button
        class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
        title="Settings (Ctrl+,)"
        on:click={() => {
          homeSounds.playClick();
          dispatch("action", { action: "settings" });
        }}
        on:mouseenter={handleHover}
      >
        <Icon icon="heroicons:cog-6-tooth" class="w-5 h-5" />
      </button>

      <!-- User Menu -->
      <div class="relative group">
        <button class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105" on:mouseenter={handleHover}> U </button>

        <!-- User Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-gray-800/95 border border-gray-200/60 dark:border-gray-700/60 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm">
          <div class="p-3 border-b border-gray-200 dark:border-gray-700">
            <div class="text-sm font-medium text-gray-900 dark:text-white">User Name</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">user@example.com</div>
          </div>
          <div class="py-1">
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150" on:click={() => homeSounds.playClick()} on:mouseenter={handleHover}> Profile Settings </button>
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150" on:click={() => homeSounds.playClick()} on:mouseenter={handleHover}> Preferences </button>
            <button
              class="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-colors duration-150"
              on:click={() => {
                homeSounds.playClick();
                dispatch("action", { action: "logout" });
              }}
              on:mouseenter={handleHover}
            >
              Sign Out
            </button>
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
    background: transparent !important;
  }

  .excel-ribbon * {
    transition-property: background-color, border-color, color, fill, stroke, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Group separators */
  .ribbon-group-separator {
    position: relative;
  }

  .ribbon-group-separator::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    bottom: 20%;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(156, 163, 175, 0.3), transparent);
  }

  .ribbon-group-separator:last-child::after {
    display: none;
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
    background: rgba(156, 163, 175, 0.3);
    border-radius: 2px;
  }

  .excel-ribbon ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.5);
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .ribbon-group {
      min-width: 50px;
    }
  }

  /* Logo visibility based on theme */
  :global(.logo-light) {
    display: block;
  }

  :global(.logo-dark) {
    display: none;
  }

  :global([data-theme="dark"] .logo-light) {
    display: none;
  }

  :global([data-theme="dark"] .logo-dark) {
    display: block;
  }

  @media (max-width: 768px) {
    .excel-ribbon .flex-1 {
      overflow-x: auto;
      scrollbar-width: thin;
    }
  }
</style>
