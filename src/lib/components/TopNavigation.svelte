<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { generateUserAvatar, generateFallbackAvatar } from "../utils/avatar.js";
  import { users } from "../data/dashboard.js";
  import { navigate, currentRoute, isNavigating } from "../router.js";
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

  // Breadcrumb configurations for different sections
  // Breadcrumb configurations for different sections
  const breadcrumbConfigurations = {
    // Home/Dashboard section
    dashboard: [
      { id: "home", label: "Dashboard", icon: "heroicons:home", path: "/" },
      { id: "household", label: "Household", icon: "heroicons:squares-2x2", path: "/household" },
      { id: "members", label: "Family Members", icon: "heroicons:users", path: "/members" },
      { id: "calendar", label: "Calendar", icon: "heroicons:calendar-days", path: "/family-calendar-modern" },
      { id: "notes", label: "Notes", icon: "heroicons:document-text", path: "/family-notes-modern" },
      { id: "reminders", label: "Reminders", icon: "heroicons:bell-alert", path: "/reminders" },
    ],

    // Divinity section
    divinity: [
      { id: "tamil-panchangam", label: "Tamil Panchangam", icon: "heroicons:sun", path: "/tamil-panchangam" },
      { id: "rituals", label: "Rituals", icon: "heroicons:sparkles", path: "/rituals" },
      { id: "temple", label: "Temple Visits", icon: "heroicons:building-storefront", path: "/temple" },
      { id: "festivals", label: "Festival Calendar", icon: "heroicons:calendar", path: "/festival-calendar" },
      { id: "mantras", label: "Mantras", icon: "heroicons:musical-note", path: "/mantras" },
    ],

    // Contacts section
    contacts: [
      { id: "personal", label: "Personal Contacts", icon: "heroicons:phone", path: "/contacts" },
      { id: "emergency", label: "Emergency Contacts", icon: "heroicons:exclamation-triangle", path: "/emergency" },
      { id: "vendors", label: "Vendors & Services", icon: "heroicons:wrench", path: "/vendors" },
      { id: "directory", label: "Service Directory", icon: "heroicons:building-storefront", path: "/directory" },
    ],

    // Food section
    food: [
      { id: "meals", label: "Meals & Planning", icon: "heroicons:calendar-days", path: "/meals" },
      { id: "recipes", label: "Recipes", icon: "heroicons:book-open", path: "/recipes" },
      { id: "grocery", label: "Grocery & Pantry", icon: "heroicons:shopping-cart", path: "/grocery" },
      { id: "pantry", label: "Pantry Management", icon: "heroicons:archive-box", path: "/pantry" },
      { id: "kitchen", label: "Kitchen Management", icon: "heroicons:home", path: "/kitchen" },
    ],

    // Education section
    education: [
      { id: "dashboard", label: "Education Dashboard", icon: "heroicons:academic-cap", path: "/education" },
      { id: "library", label: "Family Library", icon: "heroicons:book-open", path: "/library" },
      { id: "studies", label: "Studies & Exams", icon: "heroicons:pencil", path: "/studies" },
      { id: "learning", label: "Learning Goals", icon: "heroicons:light-bulb", path: "/learning-goals" },
      { id: "plans", label: "Study Plans", icon: "heroicons:document-duplicate", path: "/study-plans" },
    ],

    // Health section
    health: [
      { id: "wellness", label: "Wellness Dashboard", icon: "heroicons:heart", path: "/wellness" },
      { id: "tracking", label: "Health Tracking", icon: "heroicons:shield-check", path: "/health" },
      { id: "yoga", label: "Yoga & Exercise", icon: "heroicons:user", path: "/yoga" },
      { id: "journal", label: "Health Journal", icon: "heroicons:pencil-square", path: "/journal" },
      { id: "hobbies", label: "Hobbies & Activities", icon: "heroicons:puzzle-piece", path: "/hobbies-activities" },
    ],

    // Assets section
    assets: [
      { id: "overview", label: "Asset Overview", icon: "heroicons:building-storefront", path: "/assets" },
      { id: "items", label: "Asset Items", icon: "heroicons:archive-box", path: "/assets/items" },
      { id: "value", label: "Asset Value", icon: "heroicons:currency-rupee", path: "/assets/value" },
      { id: "maintenance", label: "Maintenance", icon: "heroicons:wrench-screwdriver", path: "/assets/maintenance" },
      { id: "documents", label: "Documents", icon: "heroicons:document-text", path: "/assets/documents" },
      { id: "inventory", label: "Home Inventory", icon: "heroicons:archive-box", path: "/inventory" },
      { id: "vehicles", label: "Vehicle Management", icon: "heroicons:truck", path: "/vehicles" },
    ],

    // Projects section
    projects: [
      { id: "management", label: "Project Management", icon: "heroicons:clipboard-document-list", path: "/projects" },
      { id: "gantt", label: "Gantt Chart", icon: "heroicons:chart-bar", path: "/gantt" },
      { id: "schedule", label: "Daily Schedule", icon: "heroicons:calendar-days", path: "/schedule" },
      { id: "analytics", label: "Analytics Dashboard", icon: "heroicons:chart-bar", path: "/analytics" },
      { id: "charts", label: "Data Charts", icon: "heroicons:chart-pie", path: "/charts" },
      { id: "maps", label: "Interactive Maps", icon: "heroicons:map", path: "/maps" },
    ],

    // Issues section
    issues: [
      { id: "issues-emergency", label: "Emergency Situations", icon: "heroicons:shield-exclamation", path: "/issues-emergency" },
      { id: "urgent", label: "Urgent Tasks", icon: "heroicons:clock", path: "/urgent" },
      { id: "repairs", label: "Repairs", icon: "heroicons:wrench-screwdriver", path: "/repairs" },
      { id: "maintenance", label: "Maintenance", icon: "heroicons:cog", path: "/maintenance" },
      { id: "upgrades", label: "Upgrades", icon: "heroicons:arrow-trending-up", path: "/upgrades" },
      { id: "requests", label: "Service Requests", icon: "heroicons:clipboard-document-list", path: "/requests" },
    ],

    // Memories section
    memories: [
      { id: "lifeflow", label: "Life Flow", icon: "heroicons:heart", path: "/lifeflow" },
      { id: "stories", label: "Family Stories", icon: "heroicons:book-open", path: "/family-stories" },
      { id: "legacy", label: "Legacy & Memory", icon: "heroicons:archive-box", path: "/legacy" },
      { id: "emotions", label: "Emotions & Feelings", icon: "heroicons:face-smile", path: "/emotions" },
      { id: "governance", label: "Family Governance", icon: "heroicons:scale", path: "/family-governance" },
    ],

    // Travel section
    travel: [
      { id: "planning", label: "Travel Planning", icon: "heroicons:map-pin", path: "/travel" },
      { id: "history", label: "Trip History", icon: "heroicons:globe-alt", path: "/trips" },
      { id: "leisure", label: "Leisure & Outings", icon: "heroicons:film", path: "/leisure" },
      { id: "community", label: "Community Events", icon: "heroicons:users", path: "/community" },
    ],
  };

  // Main section information for breadcrumb root
  const sectionInfo = {
    dashboard: { label: "Home", icon: "heroicons:home", color: "text-blue-600" },
    divinity: { label: "Divinity", icon: "heroicons:sparkles", color: "text-orange-600" },
    contacts: { label: "Contacts", icon: "heroicons:phone", color: "text-green-600" },
    food: { label: "Food", icon: "heroicons:cake", color: "text-orange-500" },
    education: { label: "Education", icon: "heroicons:academic-cap", color: "text-indigo-500" },
    health: { label: "Health", icon: "heroicons:heart", color: "text-green-600" },
    assets: { label: "Assets", icon: "heroicons:building-storefront", color: "text-purple-600" },
    projects: { label: "Projects", icon: "heroicons:clipboard-document-list", color: "text-blue-600" },
    issues: { label: "Issues", icon: "heroicons:exclamation-triangle", color: "text-red-600" },
    memories: { label: "Memories", icon: "heroicons:photo", color: "text-blue-500" },
    travel: { label: "Travel", icon: "heroicons:map", color: "text-emerald-500" },
  };

  // Determine which section we're in based on current route
  $: currentSection = getCurrentSection($currentRoute);
  $: currentPage = getCurrentPage($currentRoute);
  $: breadcrumbItems = getBreadcrumbItems(currentSection, currentPage);

  function getCurrentSection(route) {
    // Check each section's routes to find which section the current route belongs to
    const sectionRoutes = {
      dashboard: ["/", "/household", "/members", "/family-calendar-modern", "/family-notes-modern", "/reminders"],
      divinity: ["/rituals", "/temple", "/festival-calendar", "/mantras", "/tamil-panchangam"],
      contacts: ["/contacts", "/emergency", "/vendors", "/directory"],
      food: ["/meals", "/recipes", "/grocery", "/pantry", "/kitchen"],
      education: ["/education", "/library", "/studies", "/learning-goals", "/study-plans"],
      health: ["/wellness", "/health", "/yoga", "/journal", "/hobbies-activities"],
      assets: ["/assets", "/assets/items", "/assets/value", "/assets/maintenance", "/assets/documents", "/inventory", "/vehicles"],
      projects: ["/projects", "/gantt", "/schedule", "/analytics", "/charts", "/maps"],
      issues: ["/issues-emergency", "/urgent", "/repairs", "/maintenance", "/upgrades", "/requests"],
      memories: ["/lifeflow", "/family-stories", "/legacy", "/emotions", "/family-governance"],
      travel: ["/travel", "/trips", "/leisure", "/community"],
    };

    for (const [section, routes] of Object.entries(sectionRoutes)) {
      if (routes.includes(route)) {
        return section;
      }
    }
    return null;
  }

  function getCurrentPage(route) {
    // Find the current page within the current section
    if (!currentSection) return null;

    const sectionPages = breadcrumbConfigurations[currentSection];
    return sectionPages?.find((page) => page.path === route);
  }

  function getBreadcrumbItems(section, currentPage) {
    const items = [];

    // Add section breadcrumb for non-dashboard sections
    if (section && section !== "dashboard") {
      // Always add home as the first breadcrumb for non-dashboard sections
      items.push({
        label: "Home",
        icon: "heroicons:home",
        path: "/",
        isActive: false,
      });

      const sectionData = sectionInfo[section];
      if (sectionData) {
        items.push({
          label: sectionData.label,
          icon: sectionData.icon,
          path: breadcrumbConfigurations[section]?.[0]?.path || "/",
          isActive: false,
          color: sectionData.color,
        });
      }

      // Add current page if it's not the section root
      if (currentPage && currentPage.path !== breadcrumbConfigurations[section]?.[0]?.path) {
        items.push({
          label: currentPage.label,
          icon: currentPage.icon,
          path: currentPage.path,
          isActive: true,
        });
      }
    } else if (section === "dashboard" && currentPage && currentPage.path !== "/") {
      // For dashboard section, show Home -> Current Page
      items.push({
        label: "Home",
        icon: "heroicons:home",
        path: "/",
        isActive: false,
      });

      items.push({
        label: currentPage.label,
        icon: currentPage.icon,
        path: currentPage.path,
        isActive: true,
      });
    }

    return items;
  }

  function isTabActive(tabPath) {
    return $currentRoute === tabPath;
  }

  function handleTabClick(path) {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring tab click");
      return;
    }
    navigate(path);
  }

  function handleBreadcrumbClick(path) {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring breadcrumb click");
      return;
    }
    navigate(path);
  }

  // Header functions
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    // Also dispatch the event for compatibility
    dispatch("toggleSidebar");
  }

  function toggleUserMenu() {
    userMenuOpen = !userMenuOpen;
    notificationMenuOpen = false;
    messageMenuOpen = false;

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
    // Prevent logout if already navigating
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring logout");
      return;
    }
    closeUserMenu();
    authActions.logout();
    setTimeout(() => {
      navigate("/auth/login");
    }, 150);
  }

  function handleLogin() {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring login");
      return;
    }
    navigate("/auth/login");
  }

  function handleRegister() {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring register");
      return;
    }
    navigate("/auth/register");
  }

  function handleProfile() {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring profile");
      return;
    }
    navigate("/profile");
    closeUserMenu();
  }

  function handleSettings() {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring settings");
      return;
    }
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

<!-- Enhanced Header with integrated breadcrumb and navigation -->
<header class="bg-base-100 shadow-sm border-b border-base-300">
  <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
    <!-- Left side: Hamburger + Breadcrumb -->
    <div class="flex items-center flex-1">
      <button class="lg:hidden p-2 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" on:click={toggleSidebar}>
        <Icon icon="heroicons:bars-3" class="w-6 h-6" />
      </button>

      <!-- Enhanced Breadcrumb -->
      <nav class="flex items-center space-x-2 ml-4 flex-1">
        {#if breadcrumbItems.length > 0}
          {#each breadcrumbItems as item, index}
            <div class="flex items-center">
              {#if index > 0}
                <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-base-content/40 mx-2" />
              {/if}

              {#if item.isActive}
                <span class="flex items-center space-x-1 text-sm font-medium text-base-content">
                  <Icon icon={item.icon} class="w-4 h-4 {item.color || 'text-base-content/60'}" />
                  <span>{item.label}</span>
                </span>
              {:else}
                <button class="flex items-center space-x-1 text-sm text-base-content/60 hover:text-base-content transition-colors duration-200" on:click={() => handleBreadcrumbClick(item.path)}>
                  <Icon icon={item.icon} class="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              {/if}
            </div>
          {/each}
        {:else}
          <!-- Default home breadcrumb -->
          <div class="flex items-center space-x-2">
            <Icon icon="heroicons:home" class="w-4 h-4 text-base-content/40" />
            <span class="text-sm text-base-content/60">Home</span>
          </div>
        {/if}
      </nav>
    </div>

    <!-- Right side: Search + Actions -->
    <div class="flex items-center space-x-4">
      <!-- Search -->
      <div class="hidden md:block">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon="heroicons:magnifying-glass" class="w-4 h-4 text-base-content/40" />
          </div>
          <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 text-sm bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content placeholder-base-content/40" />
        </div>
      </div>

      <!-- Language Switcher -->
      <LanguageSwitcher />

      <!-- Theme Toggle -->
      <ThemeToggle />

      <!-- Notifications -->
      <div class="relative notification-menu">
        <button class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg relative transition-colors duration-200" on:click={toggleNotificationMenu} use:motionHover>
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
        <button class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200 rounded-lg relative transition-colors duration-200" on:click={toggleMessageMenu} use:motionHover>
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

      <!-- User menu -->
      <div class="relative user-menu">
        {#if $isAuthenticated}
          <button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200" on:click={toggleUserMenu}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" class="h-8 w-8 rounded-full object-cover bg-base-200" />
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-base-content">John Doe</p>
              <p class="text-xs text-base-content/60">Administrator</p>
            </div>
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 text-base-content/60" />
          </button>
        {:else}
          <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200" on:click={toggleUserMenu}>
            <Icon icon="heroicons:user-circle" class="w-8 h-8 text-base-content/60" />
            <Icon icon="heroicons:chevron-down" class="w-4 h-4 text-base-content/60" />
          </button>
        {/if}

        {#if userMenuOpen}
          <div bind:this={dropdownElement} class="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 py-1 z-50">
            {#if $isAuthenticated}
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

  <!-- Secondary navigation bar for section tabs -->
  {#if currentSection && breadcrumbConfigurations[currentSection]}
    <div class="border-t border-base-300 bg-base-50/50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-1 py-2 overflow-x-auto">
          {#each breadcrumbConfigurations[currentSection] as page}
            <button class="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 {isTabActive(page.path) ? 'bg-primary text-primary-content shadow-sm' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}" on:click={() => handleBreadcrumbClick(page.path)}>
              <Icon icon={page.icon} class="w-4 h-4" />
              <span>{page.label}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Breadcrumb navigation styling */
  nav {
    min-height: 2rem;
  }

  /* Smooth transitions for interactive elements */
  button {
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    transform: translateY(-1px);
  }
</style>
