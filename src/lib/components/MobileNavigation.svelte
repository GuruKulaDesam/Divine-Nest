<script>
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  import { mobileGestures } from "$lib/utils/gestures";

  const dispatch = createEventDispatcher();

  // Mobile navigation categories - simplified for mobile
  const mobileCategories = [
    {
      id: "home",
      title: "Home",
      icon: "heroicons:home",
      path: "/",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "finances",
      title: "Finances",
      icon: "heroicons:currency-rupee",
      path: "/finances",
      color: "text-green-600 dark:text-green-400"
    },
    {
      id: "health",
      title: "Health",
      icon: "heroicons:heart",
      path: "/health",
      color: "text-red-600 dark:text-red-400"
    },
    {
      id: "family",
      title: "Family",
      icon: "heroicons:user-group",
      path: "/members",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      id: "home-management",
      title: "Home",
      icon: "heroicons:home-modern",
      path: "/home",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      id: "assistant",
      title: "AI Assistant",
      icon: "heroicons:chat-bubble-left-right",
      path: "/assistant",
      color: "text-indigo-600 dark:text-indigo-400"
    },
    {
      id: "culture",
      title: "Culture",
      icon: "heroicons:sparkles",
      path: "/culture",
      color: "text-pink-600 dark:text-pink-400"
    },
    {
      id: "education",
      title: "Education",
      icon: "heroicons:academic-cap",
      path: "/education",
      color: "text-teal-600 dark:text-teal-400"
    },
    {
      id: "food",
      title: "Food",
      icon: "heroicons:cake",
      path: "/food",
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      id: "inventory",
      title: "Inventory",
      icon: "heroicons:clipboard-document-list",
      path: "/inventory",
      color: "text-cyan-600 dark:text-cyan-400"
    },
    {
      id: "issues",
      title: "Issues",
      icon: "heroicons:exclamation-triangle",
      path: "/issues",
      color: "text-red-500 dark:text-red-400"
    },
    {
      id: "settings",
      title: "Settings",
      icon: "heroicons:cog-6-tooth",
      path: "/settings",
      color: "text-gray-600 dark:text-gray-400"
    }
  ];

  function handleNavigation(path) {
    dispatch('navigate', { path });
  }
</script>

<div class="mobile-navigation" use:mobileGestures={{
  onSwipeDown: () => dispatch('close'),
  onSwipeUp: () => {/* Allow upward swipe for scrolling */},
  onLongPress: () => dispatch('close')
}}>
  <div class="flex justify-center mb-4">
    <div class="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
  </div>

  <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
    Navigation
  </h3>

  <div class="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
    {#each mobileCategories as category}
      <button
        on:click={() => handleNavigation(category.path)}
        class="flex flex-col items-center space-y-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <Icon icon={category.icon} class="w-6 h-6 {category.color}" />
        </div>
        <span class="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
          {category.title}
        </span>
      </button>
    {/each}
  </div>

  <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
    <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
      Divine Nest - South Indian Family App
    </div>
  </div>
</div>

<style>
  .mobile-navigation {
    max-height: 70vh;
    overflow-y: auto;
  }

  /* Custom scrollbar for mobile menu */
  .mobile-navigation::-webkit-scrollbar {
    width: 4px;
  }

  .mobile-navigation::-webkit-scrollbar-track {
    background: transparent;
  }

  .mobile-navigation::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.3);
    border-radius: 2px;
  }
</style>