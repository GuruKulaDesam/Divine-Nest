<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { currentRoute } from "../router-mobile.js";

  const dispatch = createEventDispatcher();
  export let isOpen = false;
  export let activeGroup = "home";

  // Navigation Groups with Sub-items
  const navigationGroups = {
    home: {
      title: "🏠 Home & Family",
      color: "text-blue-500",
      items: [
        { path: "/", icon: "heroicons:home", name: "Dashboard", description: "Family overview" },
        { path: "/household", icon: "heroicons:home", name: "Household", description: "Home management" },
        { path: "/members", icon: "heroicons:users", name: "Family Members", description: "Member profiles" },
        { path: "/inventory", icon: "heroicons:archive-box", name: "Inventory", description: "Home inventory" },
        { path: "/vehicles", icon: "heroicons:truck", name: "Vehicles", description: "Vehicle management" },
        { path: "/family-calendar-modern", icon: "heroicons:calendar-days", name: "Calendar", description: "Family calendar" },
        { path: "/family-notes-modern", icon: "heroicons:document-text", name: "Notes", description: "Family notes" },
        { path: "/reminders", icon: "heroicons:bell-alert", name: "Reminders", description: "Smart reminders" },
        { path: "/directory", icon: "heroicons:user-group", name: "Directory", description: "Family directory" },
      ],
    },
    daily: {
      title: "📅 Daily Life",
      color: "text-green-500",
      items: [
        { path: "/schedule", icon: "heroicons:calendar-days", name: "Daily Schedule", description: "Family schedule" },
        { path: "/reminders", icon: "heroicons:bell-alert", name: "Reminders", description: "Daily reminders" },
        { path: "/emergency", icon: "heroicons:exclamation-triangle", name: "Emergency", description: "Emergency contacts" },
        { path: "/family-notifications", icon: "heroicons:bell", name: "Notifications", description: "Family alerts" },
        { path: "/weather", icon: "heroicons:cloud", name: "Weather", description: "Weather updates" },
        { path: "/rituals", icon: "heroicons:sparkles", name: "Rituals", description: "Cultural rituals" },
        { path: "/lifeflow", icon: "heroicons:arrows-right-left", name: "Life Flow", description: "Daily routines" },
      ],
    },
    learn: {
      title: "📚 Learning & Education",
      color: "text-purple-500",
      items: [
        { path: "/education", icon: "heroicons:academic-cap", name: "Education Hub", description: "Learning dashboard" },
        { path: "/study-plans", icon: "heroicons:clipboard-document-list", name: "Study Plans", description: "Academic planning" },
        { path: "/library", icon: "heroicons:book-open", name: "Library", description: "Digital library" },
        { path: "/learning-goals", icon: "heroicons:target", name: "Learning Goals", description: "Goal tracking" },
        { path: "/education/students", icon: "heroicons:user-group", name: "Students", description: "Student profiles" },
        { path: "/education/curriculum", icon: "heroicons:book-open", name: "Curriculum", description: "Course tracking" },
        { path: "/education/planner", icon: "heroicons:calendar-days", name: "Study Planner", description: "Academic planning" },
        { path: "/education/quiz", icon: "heroicons:puzzle-piece", name: "Quiz Center", description: "Practice tests" },
        { path: "/education/assessment", icon: "heroicons:chart-bar", name: "Assessments", description: "Progress tracking" },
        { path: "/education/courses", icon: "heroicons:book-open", name: "Courses", description: "Course catalog" },
        { path: "/education/mentors", icon: "heroicons:user-group", name: "Mentors", description: "Academic mentors" },
        { path: "/education/achievements", icon: "heroicons:trophy", name: "Achievements", description: "Academic awards" },
      ],
    },
    care: {
      title: "💚 Health & Wellness",
      color: "text-pink-500",
      items: [
        { path: "/wellness", icon: "heroicons:heart", name: "Wellness Hub", description: "Health dashboard" },
        { path: "/kitchen", icon: "heroicons:home", name: "Kitchen", description: "Meal planning" },
        { path: "/recipes", icon: "heroicons:book-open", name: "Recipes", description: "Recipe collection" },
        { path: "/yoga", icon: "heroicons:user", name: "Yoga & Exercise", description: "Fitness activities" },
        { path: "/journal", icon: "heroicons:pencil-square", name: "Health Journal", description: "Wellness tracking" },
        { path: "/kitchen/pantry", icon: "heroicons:archive-box", name: "Pantry", description: "Food inventory" },
        { path: "/kitchen/meals", icon: "heroicons:calendar-days", name: "Meal Plans", description: "Weekly meals" },
        { path: "/kitchen/kids", icon: "heroicons:user-group", name: "Kids Meals", description: "Children's nutrition" },
        { path: "/kitchen/cleaning", icon: "heroicons:sparkles", name: "Cleaning", description: "Kitchen maintenance" },
        { path: "/kitchen/vendors", icon: "heroicons:truck", name: "Vendors", description: "Food suppliers" },
        { path: "/health/records", icon: "heroicons:document-text", name: "Health Records", description: "Medical history" },
        { path: "/health/appointments", icon: "heroicons:calendar-days", name: "Appointments", description: "Medical appointments" },
        { path: "/health/medications", icon: "heroicons:beaker", name: "Medications", description: "Prescription tracking" },
        { path: "/health/vitals", icon: "heroicons:heart", name: "Vital Signs", description: "Health monitoring" },
        { path: "/health/emergency", icon: "heroicons:exclamation-triangle", name: "Emergency", description: "Health emergencies" },
        { path: "/health/insurance", icon: "heroicons:shield-check", name: "Insurance", description: "Health insurance" },
        { path: "/health/doctors", icon: "heroicons:user-md", name: "Doctors", description: "Healthcare providers" },
        { path: "/health/lab-results", icon: "heroicons:clipboard-document-list", name: "Lab Results", description: "Test results" },
        { path: "/health/preventive-care", icon: "heroicons:shield-check", name: "Preventive Care", description: "Health prevention" },
        { path: "/health/mental-health", icon: "heroicons:brain", name: "Mental Health", description: "Mental wellness" },
        { path: "/health/nutrition", icon: "heroicons:apple", name: "Nutrition", description: "Diet planning" },
        { path: "/health/fitness", icon: "heroicons:bolt", name: "Fitness", description: "Exercise tracking" },
        { path: "/health/sleep", icon: "heroicons:moon", name: "Sleep", description: "Sleep monitoring" },
        { path: "/health/habits", icon: "heroicons:check-circle", name: "Habits", description: "Health habits" },
        { path: "/hobbies-activities", icon: "heroicons:puzzle-piece", name: "Activities", description: "Hobbies & interests" },
      ],
    },
    manage: {
      title: "⚙️ Management & Finance",
      color: "text-orange-500",
      items: [
        { path: "/finances", icon: "heroicons:currency-rupee", name: "Finance Hub", description: "Financial dashboard" },
        { path: "/assets", icon: "heroicons:building-storefront", name: "Assets", description: "Property & valuables" },
        { path: "/travel", icon: "heroicons:map", name: "Travel", description: "Trip planning" },
        { path: "/contacts", icon: "heroicons:phone", name: "Contacts", description: "Address book" },
        { path: "/settings", icon: "heroicons:cog-6-tooth", name: "Settings", description: "App preferences" },
        { path: "/profile", icon: "heroicons:user", name: "Profile", description: "User profile" },
        { path: "/finance/expenses", icon: "heroicons:receipt-percent", name: "Expenses", description: "Expense tracking" },
        { path: "/finance/budget", icon: "heroicons:chart-pie", name: "Budget", description: "Financial planning" },
        { path: "/assets/items", icon: "heroicons:archive-box", name: "Asset Items", description: "Valuable items" },
        { path: "/assets/value", icon: "heroicons:currency-rupee", name: "Asset Value", description: "Asset valuation" },
        { path: "/assets/maintenance", icon: "heroicons:wrench-screwdriver", name: "Maintenance", description: "Asset maintenance" },
        { path: "/assets/documents", icon: "heroicons:document-text", name: "Documents", description: "Asset documents" },
        { path: "/finance/savings", icon: "heroicons:banknotes", name: "Savings", description: "Savings accounts" },
        { path: "/finance/wealth", icon: "heroicons:building-office", name: "Wealth", description: "Wealth management" },
        { path: "/trips", icon: "heroicons:map-pin", name: "Trip History", description: "Past trips" },
        { path: "/leisure", icon: "heroicons:sparkles", name: "Leisure", description: "Entertainment" },
        { path: "/analytics", icon: "heroicons:chart-bar", name: "Analytics", description: "Data insights" },
        { path: "/charts", icon: "heroicons:chart-pie", name: "Charts", description: "Visual analytics" },
        { path: "/maps", icon: "heroicons:map", name: "Maps", description: "Location services" },
        { path: "/products", icon: "heroicons:shopping-bag", name: "Products", description: "Product catalog" },
        { path: "/users", icon: "heroicons:users", name: "Users", description: "User management" },
        { path: "/project-management", icon: "heroicons:clipboard-document-list", name: "Projects", description: "Project tracking" },
      ],
    },
    test: {
      title: "🧪 Testing & Development",
      color: "text-gray-500",
      items: [{ path: "/test/navigation", icon: "heroicons:beaker", name: "Navigation Test", description: "Test navigation functionality" }],
    },
  };

  // Determine active group based on current route
  $: {
    for (const [groupKey, group] of Object.entries(navigationGroups)) {
      const activeItem = group.items.find((item) => item.path === $currentRoute);
      if (activeItem) {
        activeGroup = groupKey;
        break;
      }
    }
  }

  function navigateTo(path) {
    dispatch("navigate", { path });
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      dispatch("close");
    }
  }

  function switchGroup(groupKey) {
    activeGroup = groupKey;
  }

  function closeSidebar() {
    dispatch("close");
  }
</script>

<!-- Overlay for mobile -->
{#if isOpen}
  <div class="fixed inset-0 bg-black/50 z-40 md:hidden" on:click={closeSidebar} transition:fade={{ duration: 200 }}></div>
{/if}

<!-- Sidebar -->
<div class="fixed top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:left-0 right-0 {isOpen ? 'translate-x-0' : 'md:-translate-x-full translate-x-full'}">
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
      {navigationGroups[activeGroup].title}
    </h2>
    <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" on:click={closeSidebar} aria-label="Close navigation">
      <Icon icon="heroicons:x-mark" class="w-5 h-5" />
    </button>
  </div>

  <!-- Group Selector -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <div class="flex space-x-2 overflow-x-auto">
      {#each Object.entries(navigationGroups) as [key, group]}
        <button class="flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all {activeGroup === key ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}" on:click={() => switchGroup(key)}>
          <Icon icon={group.items[0].icon} class="w-4 h-4" />
          <span class="text-sm font-medium">{group.title.split(" ")[1]}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Navigation Items -->
  <div class="flex-1 overflow-y-auto p-4">
    <div class="space-y-2">
      {#each navigationGroups[activeGroup].items as item}
        <button class="w-full flex items-start space-x-3 p-3 rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 {item.path === $currentRoute ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''}" on:click={() => navigateTo(item.path)}>
          <Icon icon={item.icon} class="w-5 h-5 mt-0.5 flex-shrink-0 {item.path === $currentRoute ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}" />
          <div class="flex-1 text-left">
            <div class="font-medium text-gray-900 dark:text-white text-sm">
              {item.name}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {item.description}
            </div>
          </div>
          {#if item.path === $currentRoute}
            <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-blue-500 mt-0.5" />
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>
