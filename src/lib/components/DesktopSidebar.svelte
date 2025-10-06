<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { currentRoute } from "../router-mobile.js";

  const dispatch = createEventDispatcher();
  export let isOpen = false;

  // Flatten all navigation items for desktop sidebar
  const allMenuItems = [
    // Home & Family
    { path: "/", icon: "heroicons:home", name: "Dashboard", description: "Family overview", group: "🏠 Home & Family" },
    { path: "/household", icon: "heroicons:home", name: "Household", description: "Home management", group: "🏠 Home & Family" },
    { path: "/members", icon: "heroicons:users", name: "Family Members", description: "Member profiles", group: "🏠 Home & Family" },
    { path: "/inventory", icon: "heroicons:archive-box", name: "Inventory", description: "Home inventory", group: "🏠 Home & Family" },
    { path: "/vehicles", icon: "heroicons:truck", name: "Vehicles", description: "Vehicle management", group: "🏠 Home & Family" },
    { path: "/family-calendar-modern", icon: "heroicons:calendar-days", name: "Calendar", description: "Family calendar", group: "🏠 Home & Family" },
    { path: "/family-notes-modern", icon: "heroicons:document-text", name: "Notes", description: "Family notes", group: "🏠 Home & Family" },
    { path: "/reminders", icon: "heroicons:bell-alert", name: "Reminders", description: "Smart reminders", group: "🏠 Home & Family" },
    { path: "/directory", icon: "heroicons:user-group", name: "Directory", description: "Family directory", group: "🏠 Home & Family" },

    // Daily Life
    { path: "/schedule", icon: "heroicons:calendar-days", name: "Daily Schedule", description: "Family schedule", group: "📅 Daily Life" },
    { path: "/emergency", icon: "heroicons:exclamation-triangle", name: "Emergency", description: "Emergency contacts", group: "📅 Daily Life" },
    { path: "/family-notifications", icon: "heroicons:bell", name: "Notifications", description: "Family alerts", group: "📅 Daily Life" },
    { path: "/weather", icon: "heroicons:cloud", name: "Weather", description: "Weather updates", group: "📅 Daily Life" },
    { path: "/rituals", icon: "heroicons:sparkles", name: "Rituals", description: "Cultural rituals", group: "📅 Daily Life" },
    { path: "/lifeflow", icon: "heroicons:arrows-right-left", name: "Life Flow", description: "Daily routines", group: "📅 Daily Life" },

    // Learning & Education
    { path: "/education", icon: "heroicons:academic-cap", name: "Education Hub", description: "Learning dashboard", group: "📚 Learning & Education" },
    { path: "/study-plans", icon: "heroicons:clipboard-document-list", name: "Study Plans", description: "Academic planning", group: "📚 Learning & Education" },
    { path: "/library", icon: "heroicons:book-open", name: "Library", description: "Digital library", group: "📚 Learning & Education" },
    { path: "/learning-goals", icon: "heroicons:target", name: "Learning Goals", description: "Goal tracking", group: "📚 Learning & Education" },
    { path: "/education/students", icon: "heroicons:user-group", name: "Students", description: "Student profiles", group: "📚 Learning & Education" },
    { path: "/education/curriculum", icon: "heroicons:book-open", name: "Curriculum", description: "Course tracking", group: "📚 Learning & Education" },
    { path: "/education/planner", icon: "heroicons:calendar-days", name: "Study Planner", description: "Academic planning", group: "📚 Learning & Education" },
    { path: "/education/quiz", icon: "heroicons:puzzle-piece", name: "Quiz Center", description: "Practice tests", group: "📚 Learning & Education" },
    { path: "/education/assessment", icon: "heroicons:chart-bar", name: "Assessments", description: "Progress tracking", group: "📚 Learning & Education" },
    { path: "/education/courses", icon: "heroicons:book-open", name: "Courses", description: "Course catalog", group: "📚 Learning & Education" },
    { path: "/education/mentors", icon: "heroicons:user-group", name: "Mentors", description: "Academic mentors", group: "📚 Learning & Education" },
    { path: "/education/achievements", icon: "heroicons:trophy", name: "Achievements", description: "Academic awards", group: "📚 Learning & Education" },

    // Health & Wellness
    { path: "/wellness", icon: "heroicons:heart", name: "Wellness Hub", description: "Health dashboard", group: "💚 Health & Wellness" },
    { path: "/kitchen", icon: "heroicons:home", name: "Kitchen", description: "Meal planning", group: "💚 Health & Wellness" },
    { path: "/recipes", icon: "heroicons:book-open", name: "Recipes", description: "Recipe collection", group: "💚 Health & Wellness" },
    { path: "/yoga", icon: "heroicons:user", name: "Yoga & Exercise", description: "Fitness activities", group: "💚 Health & Wellness" },
    { path: "/journal", icon: "heroicons:pencil-square", name: "Health Journal", description: "Wellness tracking", group: "💚 Health & Wellness" },
    { path: "/kitchen/pantry", icon: "heroicons:archive-box", name: "Pantry", description: "Food inventory", group: "💚 Health & Wellness" },
    { path: "/kitchen/meals", icon: "heroicons:calendar-days", name: "Meal Plans", description: "Weekly meals", group: "💚 Health & Wellness" },
    { path: "/kitchen/kids", icon: "heroicons:user-group", name: "Kids Meals", description: "Children's nutrition", group: "💚 Health & Wellness" },
    { path: "/kitchen/cleaning", icon: "heroicons:sparkles", name: "Cleaning", description: "Kitchen maintenance", group: "💚 Health & Wellness" },
    { path: "/kitchen/vendors", icon: "heroicons:truck", name: "Vendors", description: "Food suppliers", group: "💚 Health & Wellness" },
    { path: "/health/records", icon: "heroicons:document-text", name: "Health Records", description: "Medical history", group: "💚 Health & Wellness" },
    { path: "/health/appointments", icon: "heroicons:calendar-days", name: "Appointments", description: "Medical appointments", group: "💚 Health & Wellness" },
    { path: "/health/medications", icon: "heroicons:beaker", name: "Medications", description: "Prescription tracking", group: "💚 Health & Wellness" },
    { path: "/health/vitals", icon: "heroicons:heart", name: "Vital Signs", description: "Health monitoring", group: "💚 Health & Wellness" },
    { path: "/health/emergency", icon: "heroicons:exclamation-triangle", name: "Emergency", description: "Health emergencies", group: "💚 Health & Wellness" },
    { path: "/health/insurance", icon: "heroicons:shield-check", name: "Insurance", description: "Health insurance", group: "💚 Health & Wellness" },
    { path: "/health/doctors", icon: "heroicons:user-md", name: "Doctors", description: "Healthcare providers", group: "💚 Health & Wellness" },
    { path: "/health/lab-results", icon: "heroicons:clipboard-document-list", name: "Lab Results", description: "Test results", group: "💚 Health & Wellness" },
    { path: "/health/preventive-care", icon: "heroicons:shield-check", name: "Preventive Care", description: "Health prevention", group: "💚 Health & Wellness" },
    { path: "/health/mental-health", icon: "heroicons:brain", name: "Mental Health", description: "Mental wellness", group: "💚 Health & Wellness" },
    { path: "/health/nutrition", icon: "heroicons:apple", name: "Nutrition", description: "Diet planning", group: "💚 Health & Wellness" },
    { path: "/health/fitness", icon: "heroicons:bolt", name: "Fitness", description: "Exercise tracking", group: "💚 Health & Wellness" },
    { path: "/health/sleep", icon: "heroicons:moon", name: "Sleep", description: "Sleep monitoring", group: "💚 Health & Wellness" },
    { path: "/health/habits", icon: "heroicons:check-circle", name: "Habits", description: "Health habits", group: "💚 Health & Wellness" },
    { path: "/hobbies-activities", icon: "heroicons:puzzle-piece", name: "Activities", description: "Hobbies & interests", group: "💚 Health & Wellness" },

    // Management & Finance
    { path: "/finances", icon: "heroicons:currency-rupee", name: "Finance Hub", description: "Financial dashboard", group: "⚙️ Management & Finance" },
    { path: "/assets", icon: "heroicons:building-storefront", name: "Assets", description: "Property & valuables", group: "⚙️ Management & Finance" },
    { path: "/travel", icon: "heroicons:map", name: "Travel", description: "Trip planning", group: "⚙️ Management & Finance" },
    { path: "/contacts", icon: "heroicons:phone", name: "Contacts", description: "Address book", group: "⚙️ Management & Finance" },
    { path: "/settings", icon: "heroicons:cog-6-tooth", name: "Settings", description: "App preferences", group: "⚙️ Management & Finance" },
    { path: "/profile", icon: "heroicons:user", name: "Profile", description: "User profile", group: "⚙️ Management & Finance" },
    { path: "/finance/expenses", icon: "heroicons:receipt-percent", name: "Expenses", description: "Expense tracking", group: "⚙️ Management & Finance" },
    { path: "/finance/budget", icon: "heroicons:chart-pie", name: "Budget", description: "Financial planning", group: "⚙️ Management & Finance" },
    { path: "/finance/savings", icon: "heroicons:piggy-bank", name: "Savings", description: "Savings goals", group: "⚙️ Management & Finance" },
    { path: "/finance/wealth", icon: "heroicons:building-storefront", name: "Wealth", description: "Asset management", group: "⚙️ Management & Finance" },
    { path: "/assets/items", icon: "heroicons:archive-box", name: "Asset Items", description: "Valuable items", group: "⚙️ Management & Finance" },
    { path: "/assets/value", icon: "heroicons:currency-rupee", name: "Asset Value", description: "Asset valuation", group: "⚙️ Management & Finance" },
    { path: "/assets/maintenance", icon: "heroicons:wrench-screwdriver", name: "Maintenance", description: "Asset maintenance", group: "⚙️ Management & Finance" },
    { path: "/assets/documents", icon: "heroicons:document-text", name: "Documents", description: "Asset documents", group: "⚙️ Management & Finance" },
    { path: "/trips", icon: "heroicons:map-pin", name: "Trips", description: "Travel planning", group: "⚙️ Management & Finance" },
    { path: "/leisure", icon: "heroicons:sparkles", name: "Leisure", description: "Entertainment", group: "⚙️ Management & Finance" },
    { path: "/analytics", icon: "heroicons:chart-bar", name: "Analytics", description: "Data insights", group: "⚙️ Management & Finance" },
    { path: "/charts", icon: "heroicons:chart-pie", name: "Charts", description: "Visual reports", group: "⚙️ Management & Finance" },
    { path: "/maps", icon: "heroicons:map", name: "Maps", description: "Location services", group: "⚙️ Management & Finance" },
    { path: "/products", icon: "heroicons:shopping-bag", name: "Products", description: "Product catalog", group: "⚙️ Management & Finance" },
    { path: "/users", icon: "heroicons:users", name: "Users", description: "User management", group: "⚙️ Management & Finance" },
    { path: "/project-management", icon: "heroicons:clipboard-document-list", name: "Projects", description: "Project tracking", group: "⚙️ Management & Finance" },
  ];

  function handleNavigate(path) {
    dispatch("navigate", { path });
  }

  function handleClose() {
    dispatch("close");
  }
</script>

<div class="h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
  <!-- Header -->
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
      {#if isOpen}
        <button on:click={handleClose} class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon icon="heroicons:x-mark" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      {/if}
    </div>
  </div>

  <!-- Navigation Items -->
  <div class="flex-1 overflow-y-auto py-2">
    {#each allMenuItems as item (item.path)}
      {@const isActive = $currentRoute === item.path}
      <button on:click={() => handleNavigate(item.path)} class="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4 {isActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent'}">
        <div class="flex items-center gap-3">
          <Icon icon={item.icon} class="w-5 h-5 {isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium {isActive ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'} truncate">
              {item.name}
            </div>
            <div class="text-xs {isActive ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'} truncate">
              {item.group}
            </div>
          </div>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  /* Custom scrollbar for the navigation list */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }

  .dark .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #4a5568;
  }

  .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
</style>
