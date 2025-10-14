<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { homeSounds } from "$lib/utils/sounds";

  // 12 main tiles for mobile home screen (4x3 grid)
  const homeTiles = [
    {
      id: 'family',
      title: 'Family',
      icon: 'heroicons:users',
      color: 'bg-blue-500',
      path: '/members',
      description: 'Manage family members'
    },
    {
      id: 'tasks',
      title: 'Tasks',
      icon: 'heroicons:check-circle',
      color: 'bg-orange-500',
      path: '/todo',
      description: 'Daily tasks & todos'
    },
    {
      id: 'finances',
      title: 'Finances',
      icon: 'heroicons:currency-rupee',
      color: 'bg-green-500',
      path: '/finances',
      description: 'Budget & expenses'
    },
    {
      id: 'food',
      title: 'Food',
      icon: 'heroicons:cake',
      color: 'bg-pink-500',
      path: '/food',
      description: 'Meals & recipes'
    },
    {
      id: 'health',
      title: 'Health',
      icon: 'heroicons:heart',
      color: 'bg-red-500',
      path: '/health',
      description: 'Wellness & fitness'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: 'heroicons:archive-box',
      color: 'bg-purple-500',
      path: '/inventory',
      description: 'Pantry & supplies'
    },
    {
      id: 'events',
      title: 'Events',
      icon: 'heroicons:calendar-days',
      color: 'bg-indigo-500',
      path: '/events',
      description: 'Calendar & events'
    },
    {
      id: 'issues',
      title: 'Issues',
      icon: 'heroicons:exclamation-triangle',
      color: 'bg-yellow-500',
      path: '/issues',
      description: 'Problems & repairs'
    },
    {
      id: 'culture',
      title: 'Culture',
      icon: 'heroicons:fire',
      color: 'bg-orange-600',
      path: '/culture',
      description: 'Festivals & rituals'
    },
    {
      id: 'education',
      title: 'Education',
      icon: 'heroicons:academic-cap',
      color: 'bg-teal-500',
      path: '/education',
      description: 'Learning & studies'
    },
    {
      id: 'travel',
      title: 'Travel',
      icon: 'heroicons:map',
      color: 'bg-cyan-500',
      path: '/travel',
      description: 'Trips & journeys'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'heroicons:cog-6-tooth',
      color: 'bg-gray-500',
      path: '/settings',
      description: 'App preferences'
    }
  ];

  function navigateToTile(path) {
    homeSounds.playClick();
    goto(path);
  }

  function handleTileHover() {
    homeSounds.playPop();
  }
</script>

<div class="p-4">
  <!-- Welcome Header -->
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
      <span class="text-orange-600">ShivOhm</span> Home
    </h1>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Your family management dashboard
    </p>
  </div>

  <!-- 12-Tile Grid (4 rows, 3 columns) -->
  <div class="grid grid-cols-3 gap-3 max-w-sm mx-auto">
    {#each homeTiles as tile}
      <button
        on:click={() => navigateToTile(tile.path)}
        on:mouseenter={handleTileHover}
        class="aspect-square {tile.color} text-white rounded-2xl p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center"
        aria-label={tile.title}
      >
        <Icon icon={tile.icon} class="w-8 h-8 mb-2" />
        <span class="text-xs font-semibold text-center leading-tight">
          {tile.title}
        </span>
      </button>
    {/each}
  </div>

  <!-- Quick Stats Row -->
  <div class="mt-6 grid grid-cols-3 gap-3 max-w-sm mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-md">
      <div class="text-lg font-bold text-blue-600 dark:text-blue-400">5</div>
      <div class="text-xs text-gray-600 dark:text-gray-400">Tasks Today</div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-md">
      <div class="text-lg font-bold text-green-600 dark:text-green-400">₹2.5k</div>
      <div class="text-xs text-gray-600 dark:text-gray-400">Budget Left</div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-md">
      <div class="text-lg font-bold text-orange-600 dark:text-orange-400">3</div>
      <div class="text-xs text-gray-600 dark:text-gray-400">Alerts</div>
    </div>
  </div>
</div>

<style>
  /* Mobile-optimized tile styling */
  button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Ensure tiles are perfectly square on mobile */
  .aspect-square {
    aspect-ratio: 1;
  }
</style>