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

  // Main navigation tiles
  const navigationTiles = [
    {
      id: "dashboard",
      label: "Home",
      icon: "heroicons:home",
      path: "/",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Dashboard & Overview",
    },
    {
      id: "divinity",
      label: "Divinity",
      icon: "heroicons:sparkles",
      path: "/tamil-panchangam",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      description: "Spiritual & Religious",
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: "heroicons:phone",
      path: "/contacts",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "People & Directory",
    },
    {
      id: "food",
      label: "Food",
      icon: "heroicons:cake",
      path: "/meals",
      color: "from-orange-400 to-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      description: "Meals & Recipes",
    },
    {
      id: "education",
      label: "Learn",
      icon: "heroicons:academic-cap",
      path: "/education",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Education & Study",
    },
    {
      id: "health",
      label: "Health",
      icon: "heroicons:heart",
      path: "/wellness",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      description: "Wellness & Fitness",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "heroicons:clipboard-document-list",
      path: "/projects",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Management & Tasks",
    },
    {
      id: "assets",
      label: "Assets",
      icon: "heroicons:building-storefront",
      path: "/assets",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      description: "Property & Vehicles",
    },
    {
      id: "travel",
      label: "Travel",
      icon: "heroicons:map",
      path: "/travel",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      description: "Trips & Journeys",
    },
    {
      id: "memories",
      label: "Memories",
      icon: "heroicons:photo",
      path: "/lifeflow",
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      description: "Stories & Legacy",
    },
  ];

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

  function handleTileClick(path) {
    // Prevent navigation if already in progress
    if ($isNavigating) {
      console.log("Navigation already in progress, ignoring tile click");
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

<!-- Enhanced Header with tile navigation -->
<header class="bg-base-100/30 backdrop-blur-sm shadow-sm border-b border-base-300/50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <!-- Top row: Logo/Title + User actions -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-4">
        <button class="lg:hidden p-2 rounded-md text-base-content/60 hover:text-base-content hover:bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" on:click={toggleSidebar}>
          <Icon icon="heroicons:bars-3" class="w-6 h-6" />
        </button>
        <h1 class="text-xl font-bold text-base-content">Family Management System</h1>
      </div>

      <!-- Right side: Search + Actions -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="hidden md:block">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="heroicons:magnifying-glass" class="w-4 h-4 text-base-content/40" />
            </div>
            <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 text-sm bg-base-200/50 border border-base-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content placeholder-base-content/40 backdrop-blur-sm" />
          </div>
        </div>

        <!-- Language Switcher -->
        <LanguageSwitcher />

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Notifications -->
        <div class="relative notification-menu">
          <button class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200/50 rounded-lg relative transition-colors duration-200 backdrop-blur-sm" on:click={toggleNotificationMenu} use:motionHover>
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
          <button class="p-2 text-base-content/60 hover:text-base-content hover:bg-base-200/50 rounded-lg relative transition-colors duration-200 backdrop-blur-sm" on:click={toggleMessageMenu} use:motionHover>
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
            <button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 backdrop-blur-sm" on:click={toggleUserMenu}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" class="h-8 w-8 rounded-full object-cover bg-base-200" />
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-base-content">John Doe</p>
                <p class="text-xs text-base-content/60">Administrator</p>
              </div>
              <Icon icon="heroicons:chevron-down" class="w-4 h-4 text-base-content/60" />
            </button>
          {:else}
            <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 backdrop-blur-sm" on:click={toggleUserMenu}>
              <Icon icon="heroicons:user-circle" class="w-8 h-8 text-base-content/60" />
              <Icon icon="heroicons:chevron-down" class="w-4 h-4 text-base-content/60" />
            </button>
          {/if}

          {#if userMenuOpen}
            <div bind:this={dropdownElement} class="absolute right-0 mt-2 w-48 bg-base-100/90 backdrop-blur-sm rounded-lg shadow-lg border border-base-300/50 py-1 z-50">
              {#if $isAuthenticated}
                <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200/50 transition-colors duration-200" on:click={handleProfile}>
                  <Icon icon="heroicons:user-circle" class="w-4 h-4 mr-3" />
                  Profile
                </button>
                <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200/50 transition-colors duration-200" on:click={handleSettings}>
                  <Icon icon="heroicons:cog-6-tooth" class="w-4 h-4 mr-3" />
                  Settings
                </button>
                <hr class="border-base-300/50 my-1" />
                <button class="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-base-200/50 transition-colors duration-200" on:click={handleLogout}>
                  <Icon icon="heroicons:arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
                  Sign out
                </button>
              {:else}
                <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200/50 transition-colors duration-200" on:click={handleLogin}>
                  <Icon icon="heroicons:arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
                  Login
                </button>
                <button class="w-full flex items-center px-4 py-2 text-sm text-base-content hover:bg-base-200/50 transition-colors duration-200" on:click={handleRegister}>
                  <Icon icon="heroicons:user-plus" class="w-4 h-4 mr-3" />
                  Register
                </button>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Navigation Tiles Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-3">
      {#each navigationTiles as tile}
        <button class="group relative overflow-hidden rounded-xl {tile.bgColor} border border-base-300/30 hover:border-base-300/60 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm" on:click={() => handleTileClick(tile.path)} use:motionHover>
          <div class="p-4 text-center">
            <!-- Icon with gradient background -->
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br {tile.color} mb-3 shadow-sm">
              <Icon icon={tile.icon} class="w-6 h-6 text-white" />
            </div>

            <!-- Label -->
            <h3 class="text-sm font-semibold text-base-content mb-1">{tile.label}</h3>

            <!-- Description -->
            <p class="text-xs text-base-content/60 leading-tight">{tile.description}</p>

            <!-- Hover effect overlay -->
            <div class="absolute inset-0 bg-gradient-to-br {tile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</header>

<style>
  /* Tile navigation styling */
  header {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* Smooth transitions for interactive elements */
  button {
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    transform: translateY(-1px);
  }

  /* Tile hover effects */
  .tile-button {
    position: relative;
    overflow: hidden;
  }

  .tile-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  .tile-button:hover::before {
    left: 100%;
  }

  /* Responsive grid adjustments */
  @media (max-width: 640px) {
    .grid-cols-2 {
      gap: 0.5rem;
    }
  }
</style>
