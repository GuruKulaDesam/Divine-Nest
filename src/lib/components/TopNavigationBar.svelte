<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { homeSounds } from "$lib/utils/sounds";
  import { theme, themeActions, THEMES } from "$lib/stores/theme";
  import { background, backgroundActions, BACKGROUNDS } from "$lib/stores/background";
  import { userProfile } from "$lib/stores/userProfile";

  // Import logo images
  import Shivohm_Logo_Light from "$lib/assets/images/Shivohm_Logo_Light.png";
  import Shivohm_Logo_Dark from "$lib/assets/images/Shivohm_Logo_Dark.png";
  import Shivohm_Logo_White from "$lib/assets/images/Shivohm_Logo_White.png";

  // Reactive logo based on theme
  $: logoSrc = $theme === THEMES.LIGHT ? Shivohm_Logo_Light :
               $theme === THEMES.DARK ? Shivohm_Logo_Dark :
               $theme === THEMES.TRANSPARENT ? Shivohm_Logo_White :
               Shivohm_Logo_Light; // fallback

  // Time-based greeting
  $: currentHour = new Date().getHours();
  $: timeBasedGreeting = currentHour < 12 ? "Good Morning" :
                        currentHour < 17 ? "Good Afternoon" :
                        "Good Evening";

  const dispatch = createEventDispatcher();

  /* function handleCategoryClick(category) {
    try {
      homeSounds.playClick();
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
    if (category.path) {
      goto(category.path).catch((error) => {
        console.error("Navigation error:", error);
      });
    } else {
      dispatch("action", { action: category.id, category });
    }
  }*/

  // Request categories with their KPIs and routing - compact version for nav bar
  const requestCategories = [
    {
      id: "issues",
      title: "Issues",
      icon: "heroicons:exclamation-triangle",
      color: "from-red-500 to-red-600",
      borderColor: "border-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-700 dark:text-red-300",
      metric: "10",
      path: "/issues",
    },
    {
      id: "requests",
      title: "Requests",
      icon: "heroicons:cog-6-tooth",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      metric: "17",
      path: "/issues/requests",
    },
    {
      id: "expenses",
      title: "Expenses",
      icon: "heroicons:credit-card",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-700 dark:text-emerald-300",
      metric: "₹8.3K",
      path: "/finances/expenses",
    },
    {
      id: "reminders",
      title: "Reminders",
      icon: "heroicons:bell-alert",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      textColor: "text-cyan-700 dark:text-cyan-300",
      metric: "4",
      path: "/home/reminders",
    },
    {
      id: "savings",
      title: "Savings",
      icon: "heroicons:banknotes",
      color: "from-teal-500 to-teal-600",
      borderColor: "border-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      textColor: "text-teal-700 dark:text-teal-300",
      metric: "₹45K",
      path: "/finances",
    },
    {
      id: "tasks",
      title: "Tasks",
      icon: "heroicons:clipboard-document-list",
      color: "from-indigo-500 to-indigo-600",
      borderColor: "border-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      textColor: "text-indigo-700 dark:text-indigo-300",
      metric: "15",
      path: "/assistant/task-board",
    },
    {
      id: "bills",
      title: "Bills",
      icon: "heroicons:currency-rupee",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
      metric: "₹12.5K",
      path: "/finances",
    },
    {
      id: "events",
      title: "Events",
      icon: "heroicons:calendar-days",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      textColor: "text-pink-700 dark:text-pink-300",
      metric: "6",
      path: "/home/family-calendar-modern",
    },
  ];

  function handleCategoryClick(category) {
    console.log("Tile clicked:", category.title, "Path:", category.path);
    try {
      homeSounds.playClick();
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
    if (category.path) {
      console.log("Navigating to:", category.path);
      goto(category.path).catch((error) => {
        console.error("Navigation error:", error);
      });
    } else {
      dispatch("action", { action: category.id, category });
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

<div class="excel-ribbon fixed top-0 left-0 right-0 w-screen bg-white/10 dark:bg-gray-900/20 border-b border-white/20 dark:border-gray-700/30 z-50">
  <!-- Main Ribbon Container -->
  <div class="flex items-center px-6 py-3 min-h-[70px] max-w-full bg-gradient-to-r from-white/5 via-transparent to-white/5">
    <!-- Left Section: Logo and App Title -->
    <div class="flex items-center space-x-4 flex-shrink-0">
      <!-- Logo -->
      <div class="relative flex items-center justify-center w-24 h-24 overflow-hidden -ml-5">
        <img src={logoSrc} alt="ShivohM Logo" class="w-22 h-22 object-contain" />
      </div>

      <!-- App Title - Two rows within logo height -->
      <div class="flex flex-col justify-center h-24">
        <span class="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-900 to-slate-700 dark:from-slate-100 dark:via-white dark:to-slate-200 bg-clip-text text-transparent leading-tight tracking-wide font-sans">{timeBasedGreeting}</span>
        <span class="text-sm font-medium text-slate-600 dark:text-slate-300 leading-tight tracking-wide font-sans">Welcome, {$userProfile?.name || 'Family'}</span>
      </div>
    </div>

    <!-- Center Section: KPI Dashboard Cards -->
    <div class="flex-1 flex justify-center mx-6">
      <div class="flex justify-center gap-4 max-w-full">
        {#each requestCategories as category}
          <button type="button" class="group relative bg-transparent border border-white/30 dark:border-gray-600/50 rounded-lg pt-2.5 pb-3 px-2 aspect-square cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" on:click={() => handleCategoryClick(category)} on:mouseenter={handleHover}>
            <!-- Animated background on hover -->
            <div class="absolute inset-0 bg-gradient-to-br {category.color} opacity-0 group-hover:opacity-20 rounded-md transition-all duration-300 group-hover:animate-pulse"></div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-center w-full">
              <!-- Metric at the top -->
              <div class="mb-2">
                <div class="bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full transition-all duration-300">
                  <span class="text-[19.8px] font-sans font-bold {category.textColor} group-hover:scale-110 transition-transform duration-300" style="font-family: 'Segoe UI', 'Helvetica Neue', 'DIN Alternate', sans-serif;">{category.metric}</span>
                </div>
              </div>

              <!-- Title at the bottom -->
              <div class="mt-2">
                <span class="font-medium text-gray-900 dark:text-white text-xs leading-tight block transition-colors duration-300">{category.title}</span>
              </div>
            </div>

            <!-- Ripple effect on click -->
            <div class="absolute inset-0 bg-gradient-to-br {category.color} opacity-0 group-active:opacity-30 rounded-lg transition-opacity duration-150 pointer-events-none"></div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Right Section: Consolidated Menu -->
    <div class="flex items-center flex-shrink-0">
      <!-- Main Menu Button -->
      <div class="relative group">
        <button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm" title="Menu" on:mouseenter={handleHover}>
          <Icon icon="heroicons:bars-3" class="w-6 h-6" style="color: currentColor; fill: currentColor;" />
        </button>

        <!-- Consolidated Menu Dropdown -->
        <div class="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-gray-800/95 border border-gray-200/60 dark:border-gray-700/60 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm max-h-96 overflow-y-auto">
          <div class="p-3">
            <!-- Search Section -->
            <div class="mb-4">
              <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Quick Actions</div>
              <button
                class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                on:click={() => {
                  homeSounds.playClick();
                  dispatch("action", { action: "search" });
                }}
                on:mouseenter={handleHover}
              >
                <Icon icon="heroicons:magnifying-glass" class="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Search (Ctrl+F)</span>
              </button>
              <button
                class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                on:click={() => {
                  homeSounds.playClick();
                  dispatch("action", { action: "settings" });
                }}
                on:mouseenter={handleHover}
              >
                <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Settings (Ctrl+,)</span>
              </button>
            </div>

            <!-- Theme Section -->
            <div class="mb-4">
              <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Theme</div>
              <div class="grid grid-cols-3 gap-1">
                <button
                  class="flex flex-col items-center gap-1 p-2 rounded-lg text-center text-xs transition-colors duration-200 {$theme === 'light' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    themeActions.set("light");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300"></div>
                  <span>Light</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-2 rounded-lg text-center text-xs transition-colors duration-200 {$theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    themeActions.set("dark");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600"></div>
                  <span>Dark</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-2 rounded-lg text-center text-xs transition-colors duration-200 {$theme === 'transparent' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    themeActions.set("transparent");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-green-400 border border-transparent opacity-80"></div>
                  <span>Glass</span>
                </button>
              </div>
            </div>

            <!-- Background Section -->
            <div class="mb-4">
              <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Background</div>
              <div class="grid grid-cols-4 gap-1">
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'transparent' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("transparent");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-transparent border border-gray-300"></div>
                  <span>Trans</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'nature' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("nature");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border border-gray-300"></div>
                  <span>Nature</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'ocean' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("ocean");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-800 border border-gray-300"></div>
                  <span>Ocean</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'sunset' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("sunset");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 border border-gray-300"></div>
                  <span>Sunset</span>
                </button>
              </div>
              <div class="grid grid-cols-4 gap-1 mt-1">
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'mountain' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("mountain");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-t from-gray-400 to-gray-200 border border-gray-300"></div>
                  <span>Mount</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'forest' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("forest");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-br from-green-600 to-green-800 border border-gray-300"></div>
                  <span>Forest</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'night' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("night");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black border border-gray-300"></div>
                  <span>Night</span>
                </button>
                <button
                  class="flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 {$background === 'gradient' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  on:click={() => {
                    homeSounds.playClick();
                    backgroundActions.set("gradient");
                  }}
                  on:mouseenter={handleHover}
                >
                  <div class="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 border border-gray-300"></div>
                  <span>Grad</span>
                </button>
              </div>
            </div>

            <!-- User Section -->
            <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Account</div>
              <div class="flex items-center gap-3 p-2 mb-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">U</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900 dark:text-white truncate">User Name</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 truncate">user@example.com</div>
                </div>
              </div>
              <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 rounded-lg" on:click={() => homeSounds.playClick()} on:mouseenter={handleHover}>Profile Settings</button>
              <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 rounded-lg" on:click={() => homeSounds.playClick()} on:mouseenter={handleHover}>Preferences</button>
              <button
                class="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-colors duration-150 rounded-lg"
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
