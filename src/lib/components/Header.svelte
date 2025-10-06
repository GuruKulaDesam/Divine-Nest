<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { generateUserAvatar, generateFallbackAvatar } from "../utils/avatar.js";
  import { users } from "../data/dashboard.js";
  import { navigate, currentRoute } from "../router.js";
  import { dropdownAnimations, motionHover } from "../utils/motion.js";
  import NotificationDropdown from "./NotificationDropdown.svelte";
  import MessageDropdown from "./MessageDropdown.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import { getUnreadNotificationsCount, getUnreadMessagesCount } from "../data/notifications.js";
  import { _, isLoading } from "svelte-i18n";
  import { isAuthenticated, currentUser, authActions } from "../stores/auth.js";

  export let sidebarOpen = false;

  const dispatch = createEventDispatcher();

  // Generate avatar URL for admin user
  const userAvatar = generateUserAvatar(users.admin, "professional");

  let userMenuOpen = false;
  let notificationMenuOpen = false;
  let messageMenuOpen = false;
  let dropdownElement;

  // Reactive statements for unread counts
  $: unreadNotificationsCount = getUnreadNotificationsCount();
  $: unreadMessagesCount = getUnreadMessagesCount();

  // Function to get current page name based on route
  function getCurrentPageName(route) {
    if ($isLoading) {
      const fallbackMap = {
        "/": "Home",
        "/users": "Users",
        "/products": "Products",
        "/analytics": "Analytics",
        "/settings": "Settings",
        "/maps": "Maps",
        "/schedule": "Schedule",
        "/profile": "Profile",
        "/projects": "Projects",
        "/family-calendar-modern": "Calendars",
        "/family-notes-modern": "Notes",
        "/reminders": "Smart Reminders",
        "/charts": "Charts",
        "/gantt": "Gantt",
      };
      return fallbackMap[route] || "Home";
    }

    const routeMap = {
      "/": $_("navigation.home"),
      "/users": $_("navigation.users"),
      "/products": $_("navigation.products"),
      "/analytics": $_("navigation.analytics"),
      "/settings": $_("navigation.settings"),
      "/maps": $_("navigation.maps"),
      "/schedule": $_("navigation.schedule"),
      "/profile": $_("navigation.profile"),
      "/projects": $_("navigation.projects"),
      "/family-calendar-modern": "Calendars",
      "/family-notes-modern": "Notes",
      "/reminders": "Smart Reminders",
      "/charts": "Charts",
      "/gantt": "Gantt",
    };

    return routeMap[route] || $_("navigation.home");
  }

  // Reactive statement for current page name
  $: currentPageName = getCurrentPageName($currentRoute);

  function toggleSidebar() {
    dispatch("toggleSidebar");
  }

  function toggleUserMenu() {
    userMenuOpen = !userMenuOpen;
    notificationMenuOpen = false;
    messageMenuOpen = false;

    // Use setTimeout to ensure the element is rendered before animating
    setTimeout(() => {
      if (userMenuOpen && dropdownElement) {
        dropdownAnimations.open(dropdownElement);
      } else if (!userMenuOpen && dropdownElement) {
        dropdownAnimations.close(dropdownElement);
      }
    }, 10);
  }

  function toggleNotificationMenu() {
    notificationMenuOpen = !notificationMenuOpen;
    userMenuOpen = false;
    messageMenuOpen = false;
  }

  function toggleMessageMenu() {
    messageMenuOpen = !messageMenuOpen;
    userMenuOpen = false;
    notificationMenuOpen = false;
  }

  function closeUserMenu() {
    if (userMenuOpen && dropdownElement) {
      dropdownAnimations.close(dropdownElement);
    }
    userMenuOpen = false;
  }

  function closeNotificationMenu() {
    notificationMenuOpen = false;
  }

  function closeMessageMenu() {
    messageMenuOpen = false;
  }

  function handleLogout() {
    // Close user menu first
    closeUserMenu();

    // Log out user
    authActions.logout();

    // Small delay to allow menu animation to complete
    setTimeout(() => {
      // Navigate to login page
      navigate("/auth/login");
    }, 150);
  }

  function handleLogin() {
    navigate("/auth/login");
  }

  function handleRegister() {
    navigate("/auth/register");
  }

  function handleProfile() {
    // Navigate to profile page
    navigate("/profile");
    closeUserMenu();
  }

  function handleSettings() {
    // Navigate to settings page
    navigate("/settings");
    closeUserMenu();
  }

  // Close menus when clicking outside
  function handleClickOutside(event) {
    if (userMenuOpen && !event.target.closest(".user-menu")) {
      closeUserMenu();
    }
    if (notificationMenuOpen && !event.target.closest(".notification-menu")) {
      closeNotificationMenu();
    }
    if (messageMenuOpen && !event.target.closest(".message-menu")) {
      closeMessageMenu();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<!-- Header -->
<header class="bg-base-100 shadow-sm border-b border-base-300">
  <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
    <!-- Left side -->
    <div class="flex items-center">
      <button class="lg:hidden p-2 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary" on:click={toggleSidebar} aria-label="Toggle sidebar">
        <Icon icon="heroicons:bars-3" class="w-6 h-6" />
      </button>

      <!-- Breadcrumb -->
      <nav class="hidden md:flex items-center space-x-4 ml-4">
        <div class="flex items-center space-x-2">
          <Icon icon="heroicons:home" class="w-4 h-4 text-base-content/40" />
          <span class="text-sm text-base-content/60">{$_("navigation.home")}</span>
        </div>
        {#if $currentRoute !== "/"}
          <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-base-content/40" />
          <span class="text-sm font-medium text-base-content">{currentPageName}</span>
        {/if}
      </nav>
    </div>

    <!-- Right side -->
    <div class="flex items-center space-x-4">
      <!-- Search -->
      <div class="hidden md:block">
        <div class="relative">
          <label for="header-search" class="sr-only">Search</label>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon="heroicons:magnifying-glass" class="w-4 h-4 text-base-content/40" />
          </div>
          <input id="header-search" type="text" placeholder="Search..." class="pl-10 pr-4 py-2 text-sm bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content placeholder-base-content/40" />
        </div>
      </div>

      <!-- Language Switcher -->
      <LanguageSwitcher />

      <!-- Theme Toggle -->
      <ThemeToggle />

      <!-- Notifications -->
      <div class="relative notification-menu">
        <button class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary" on:click={toggleNotificationMenu} use:motionHover aria-label="Notifications">
          <Icon icon="heroicons:bell" class="w-5 h-5" />
          {#if unreadNotificationsCount > 0}
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadNotificationsCount > 9 ? "9+" : unreadNotificationsCount}
            </span>
          {/if}
        </button>

        {#if notificationMenuOpen}
          <NotificationDropdown isOpen={notificationMenuOpen} onClose={closeNotificationMenu} />
        {/if}
      </div>

      <!-- Messages -->
      <div class="relative message-menu">
        <button class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary" on:click={toggleMessageMenu} use:motionHover aria-label="Messages">
          <Icon icon="heroicons:envelope" class="w-5 h-5" />
          {#if unreadMessagesCount > 0}
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-warning text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadMessagesCount > 9 ? "9+" : unreadMessagesCount}
            </span>
          {/if}
        </button>

        {#if messageMenuOpen}
          <MessageDropdown isOpen={messageMenuOpen} onClose={closeMessageMenu} />
        {/if}
      </div>

      <!-- User menu with Login/Register inside -->
      <div class="relative user-menu">
        {#if $isAuthenticated}
          <!-- Authenticated User menu -->
          <button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200" on:click={toggleUserMenu} aria-label="User menu" aria-expanded={userMenuOpen}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" class="h-8 w-8 rounded-full object-cover bg-base-200" />
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-base-content">John Doe</p>
              <p class="text-xs text-base-content/60">Administrator</p>
            </div>
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 text-base-content/60" />
          </button>
        {:else}
          <!-- Not authenticated - Profile icon with dropdown -->
          <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200" on:click={toggleUserMenu} aria-label="User menu" aria-expanded={userMenuOpen}>
            <Icon icon="heroicons:user-circle" class="w-8 h-8 text-base-content/60" />
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 text-base-content/60" />
          </button>
        {/if}

        <!-- Dropdown menu -->
        {#if userMenuOpen}
          <div bind:this={dropdownElement} class="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 py-1 z-50">
            {#if $isAuthenticated}
              <!-- Authenticated menu items -->
              <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors duration-200" on:click={handleProfile}>
                <Icon icon="heroicons:user-circle" class="w-4 h-4 mr-3" />
                Profile
              </button>
              <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors duration-200" on:click={handleSettings}>
                <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4 mr-3" />
                Settings
              </button>
              <hr class="border-base-300 my-1" />
              <button class="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-base-200 transition-colors duration-200" on:click={handleLogout}>
                <Icon icon="heroicons:arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
                Sign out
              </button>
            {:else}
              <!-- Login/Register menu items -->
              <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors duration-200" on:click={handleLogin}>
                <Icon icon="heroicons:arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
                Login
              </button>
              <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors duration-200" on:click={handleRegister}>
                <Icon icon="heroicons:user-plus" class="w-4 h-4 mr-3" />
                Register
              </button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>
