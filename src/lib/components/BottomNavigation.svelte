<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import { currentRoute, isNavigating } from "../router.js";

  const dispatch = createEventDispatcher();

  // 5 Major Navigation Groups for Mobile-First Design
  const bottomNavItems = [
    {
      key: "home",
      label: "Home",
      icon: "heroicons:home",
      path: "/",
      color: "text-blue-500",
      routes: ["/", "/household", "/members", "/inventory", "/vehicles", "/family-calendar-modern", "/family-notes-modern", "/reminders", "/directory"],
    },
    {
      key: "daily",
      label: "Daily",
      icon: "heroicons:calendar-days",
      path: "/schedule",
      color: "text-green-500",
      routes: ["/schedule", "/emergency", "/family-notifications", "/weather", "/rituals", "/lifeflow"],
    },
    {
      key: "learn",
      label: "Learn",
      icon: "heroicons:academic-cap",
      path: "/education",
      color: "text-purple-500",
      routes: ["/education", "/study-plans", "/library", "/learning-goals", "/education/students", "/education/curriculum", "/education/planner", "/education/quiz", "/education/assessment", "/education/courses", "/education/mentors", "/education/achievements"],
    },
    {
      key: "care",
      label: "Care",
      icon: "heroicons:heart",
      path: "/wellness",
      color: "text-pink-500",
      routes: ["/wellness", "/kitchen", "/recipes", "/yoga", "/journal", "/kitchen/dashboard", "/kitchen/pantry", "/kitchen/meals", "/kitchen/kids", "/kitchen/recipes", "/kitchen/cleaning", "/kitchen/vendors", "/health", "/health/records", "/health/appointments", "/health/medications", "/health/vitals", "/health/emergency", "/health/insurance", "/health/doctors", "/health/lab-results", "/health/preventive-care", "/health/mental-health", "/health/nutrition", "/health/fitness", "/health/sleep", "/health/habits", "/hobbies-activities"],
    },
    {
      key: "manage",
      label: "Manage",
      icon: "heroicons:cog-6-tooth",
      path: "/finances",
      color: "text-orange-500",
      routes: ["/finances", "/assets", "/travel", "/contacts", "/settings", "/profile", "/finance/expenses", "/finance/budget", "/finance/savings", "/finance/wealth", "/assets/items", "/assets/value", "/assets/maintenance", "/assets/documents", "/trips", "/leisure", "/analytics", "/charts", "/maps", "/products", "/users", "/project-management"],
    },
    {
      key: "test",
      label: "Test",
      icon: "heroicons:beaker",
      path: "/test/navigation",
      color: "text-gray-500",
      routes: ["/test/navigation"],
    },
  ];

  function navigateTo(path) {
    dispatch("navigate", { path });
  }

  function isActive(item) {
    return item.routes.includes($currentRoute);
  }
</script>

<!-- Bottom Navigation Bar - Mobile First -->
<div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
  <div class="flex items-center justify-around px-2 py-2">
    {#each bottomNavItems as item}
      <button class="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 {isActive(item) ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}" on:click={() => navigateTo(item.path)} aria-label={item.label}>
        <Icon icon={item.icon} class="w-6 h-6 mb-1" />
        <span class="text-xs font-medium truncate">{item.label}</span>
      </button>
    {/each}
  </div>
</div>

<!-- Desktop Sidebar Trigger (for larger screens) -->
<div class="hidden md:block fixed bottom-4 right-4 z-40">
  <button class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200" on:click={() => dispatch("toggleSidebar")} aria-label="Open navigation menu">
    <Icon icon="heroicons:bars-3" class="w-6 h-6" />
  </button>
</div>

<style>
  /* Ensure content doesn't get hidden behind bottom nav on mobile */
  :global(.mobile-content-padding) {
    padding-bottom: 5rem;
  }

  /* Hide bottom nav on desktop */
  @media (min-width: 768px) {
    .fixed.bottom-0 {
      display: none;
    }
  }
</style>
