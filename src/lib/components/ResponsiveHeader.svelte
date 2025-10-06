<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { currentRoute } from "../router-mobile.js";
  import ThemeToggle from "./ThemeToggle.svelte";
  import NotificationDropdown from "./NotificationDropdown.svelte";
  import { getUnreadNotificationsCount } from "../data/notifications.js";

  const dispatch = createEventDispatcher();

  // Page titles based on routes
  const pageTitles = {
    "/": "Family Dashboard",
    "/household": "Household Management",
    "/members": "Family Members",
    "/inventory": "Home Inventory",
    "/vehicles": "Vehicle Management",
    "/schedule": "Daily Schedule",
    "/reminders": "Smart Reminders",
    "/emergency": "Emergency Contacts",
    "/education": "Education Hub",
    "/study-plans": "Study Plans",
    "/library": "Digital Library",
    "/wellness": "Wellness Center",
    "/kitchen": "Kitchen & Meals",
    "/finances": "Financial Management",
    "/assets": "Asset Management",
    "/travel": "Travel Planning",
    "/contacts": "Contact Directory",
    "/settings": "Settings",
    "/profile": "User Profile",
  };

  // Get current page title
  $: currentPageTitle = pageTitles[$currentRoute] || "Family App";

  // Get breadcrumb navigation
  function getBreadcrumbs(route) {
    const segments = route.split("/").filter(Boolean);
    const breadcrumbs = [{ name: "Home", path: "/" }];

    if (segments.length > 0) {
      const currentSegment = segments[segments.length - 1];
      const title = pageTitles[route] || currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);
      breadcrumbs.push({ name: title, path: route });
    }

    return breadcrumbs;
  }

  $: breadcrumbs = getBreadcrumbs($currentRoute);
  $: unreadCount = getUnreadNotificationsCount();

  function toggleSidebar() {
    dispatch("toggleSidebar");
  }

  function navigateTo(path) {
    dispatch("navigate", { path });
  }
</script>

<!-- Mobile Header -->
<div class="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
  <div class="flex items-center justify-between">
    <!-- Left: Menu Button -->
    <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" on:click={toggleSidebar} aria-label="Open navigation menu">
      <Icon icon="heroicons:bars-3" class="w-6 h-6 text-gray-700 dark:text-gray-300" />
    </button>

    <!-- Center: Page Title -->
    <h1 class="text-lg font-semibold text-gray-900 dark:text-white truncate flex-1 text-center mx-4">
      {currentPageTitle}
    </h1>

    <!-- Right: Actions -->
    <div class="flex items-center space-x-2">
      <NotificationDropdown />
      <ThemeToggle />
    </div>
  </div>
</div>

<!-- Desktop Header -->
<div class="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
  <div class="flex items-center justify-between">
    <!-- Left: Menu Button + Breadcrumbs -->
    <div class="flex items-center space-x-4">
      <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" on:click={toggleSidebar} aria-label="Open navigation menu">
        <Icon icon="heroicons:bars-3" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div class="flex items-center space-x-2">
        {#each breadcrumbs as crumb, index}
          {#if index > 0}
            <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
          {/if}
          {#if crumb.path === $currentRoute}
            <span class="text-gray-900 dark:text-white font-medium">{crumb.name}</span>
          {:else}
            <button class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" on:click={() => navigateTo(crumb.path)}>
              {crumb.name}
            </button>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Right: User Actions -->
    <div class="flex items-center space-x-4">
      <NotificationDropdown />
      <ThemeToggle />

      <!-- User Menu Button -->
      <div class="flex items-center space-x-3">
        <div class="text-right">
          <div class="text-sm font-medium text-gray-900 dark:text-white">Family Admin</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
        </div>
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Ensure proper spacing for mobile header */
  :global(.mobile-header-spacing) {
    padding-top: 4rem;
  }

  @media (min-width: 768px) {
    :global(.mobile-header-spacing) {
      padding-top: 0;
    }
  }
</style>
