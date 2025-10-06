<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { currentRoute, navigate } from "../router.js";

  // Breadcrumb configurations for different sections
  const tabConfigurations = {
    // Home/Dashboard section
    dashboard: [
      { id: "home", label: "Dashboard", icon: "heroicons:home", path: "/" },
      { id: "household", label: "Household", icon: "heroicons:squares-2x2", path: "/household" },
      { id: "members", label: "Family Members", icon: "heroicons:users", path: "/members" },
      { id: "inventory", label: "Home Inventory", icon: "heroicons:archive-box", path: "/inventory" },
      { id: "vehicles", label: "Vehicle Management", icon: "heroicons:truck", path: "/vehicles" },
      { id: "calendar", label: "Calendar", icon: "heroicons:calendar-days", path: "/family-calendar-modern" },
      { id: "notes", label: "Notes", icon: "heroicons:document-text", path: "/family-notes-modern" },
      { id: "reminders", label: "Reminders", icon: "heroicons:bell-alert", path: "/reminders" },
    ],

    // Divinity section
    divinity: [
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
    ],

    // Issues section
    issues: [
      { id: "emergency", label: "Emergency", icon: "heroicons:shield-exclamation", path: "/emergency" },
      { id: "urgent", label: "Urgent Tasks", icon: "heroicons:clock", path: "/urgent" },
      { id: "repairs", label: "Repairs", icon: "heroicons:wrench-screwdriver", path: "/repairs" },
      { id: "maintenance", label: "Maintenance", icon: "heroicons:cog", path: "/maintenance" },
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

  // Determine which section we're in based on current route
  $: currentSection = getCurrentSection($currentRoute);
  $: availableTabs = currentSection ? tabConfigurations[currentSection] : [];

  function getCurrentSection(route) {
    // Check each section's routes to find which section the current route belongs to
    const sectionRoutes = {
      dashboard: ["/", "/household", "/members", "/inventory", "/vehicles", "/family-calendar-modern", "/family-notes-modern", "/reminders"],
      divinity: ["/rituals", "/temple", "/festival-calendar", "/mantras"],
      contacts: ["/contacts", "/emergency", "/vendors", "/directory"],
      food: ["/meals", "/recipes", "/grocery", "/pantry", "/kitchen"],
      education: ["/education", "/library", "/studies", "/learning-goals", "/study-plans"],
      health: ["/wellness", "/health", "/yoga", "/journal"],
      issues: ["/emergency", "/urgent", "/repairs", "/maintenance", "/requests"],
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

  function isTabActive(tabPath) {
    return $currentRoute === tabPath;
  }

  function handleTabClick(path) {
    navigate(path);
  }
</script>

{#if availableTabs.length > 0}
  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap gap-1 py-2">
        {#each availableTabs as tab}
          <button class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isTabActive(tab.path) ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}" on:click={() => handleTabClick(tab.path)}>
            <Icon icon={tab.icon} class="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Optional: Add any specific styling for the navigation bar */
</style>
