<script>
  import { onMount } from "svelte";
  import { currentRoute } from "../router.js";
  import Icon from "@iconify/svelte";

  // Import kitchen components (we'll create these)
  import PantryTracker from "../components/kitchen/PantryTracker.svelte";
  import FreshProduce from "../components/kitchen/FreshProduce.svelte";
  import MealPlanner from "../components/kitchen/MealPlanner.svelte";
  import KidsMenu from "../components/kitchen/KidsMenu.svelte";
  import RecipeArchive from "../components/kitchen/RecipeArchive.svelte";
  import VendorManager from "../components/kitchen/VendorManager.svelte";

  import { PantryCategories, FreshProduce as FreshData, MealPlanner as MealData, KidsMenu as KidsData, KitchenVendors, CleaningSchedule, WellnessProfiles, FestivalPrep, EmotionalFood } from "../data/kitchenData.js";

  let activeSection = "dashboard";
  let selectedProfile = "family";

  // Kitchen sections
  const KitchenSections = [
    { id: "dashboard", name: "Kitchen Dashboard", tamil: "சமையலறை கட்டுப்பாடு", icon: "heroicons:home", description: "Complete kitchen overview" },
    { id: "pantry", name: "Pantry Tracker", tamil: "அடுக்களை கண்காணிப்பு", icon: "heroicons:archive-box", description: "Ingredient inventory & stock management" },
    { id: "fresh", name: "Fresh Produce", tamil: "புதிய காய்கறி", icon: "heroicons:leaf", description: "Weekly vegetables, fruits & dairy" },
    { id: "meals", name: "Meal Planner", tamil: "உணவு திட்டமிடல்", icon: "heroicons:calendar-days", description: "Daily & weekly meal planning" },
    { id: "kids", name: "Kids Menu", tamil: "குழந்தைகள் உணவு", icon: "heroicons:academic-cap", description: "School tiffin & brain foods" },
    { id: "recipes", name: "Recipe Archive", tamil: "செய்முறை संग्रह", icon: "heroicons:book-open", description: "Family recipes & Paati's wisdom" },
    { id: "cleaning", name: "Kitchen Care", tamil: "சமையலறை பராமரிப்பு", icon: "heroicons:sparkles", description: "Cleaning schedules & supplies" },
    { id: "vendors", name: "Vendors", tamil: "விற்பனையாளர்கள்", icon: "heroicons:user-group", description: "Trusted suppliers & contacts" },
    { id: "wellness", name: "Wellness", tamil: "நலம்", icon: "heroicons:heart", description: "Diet profiles & emotional food" },
    { id: "festivals", name: "Festival Prep", tamil: "பண்டிகை தயாரிப்பு", icon: "heroicons:gift", description: "Ritual cooking & celebrations" },
  ];

  // Handle URL-based section routing
  $: {
    const path = $currentRoute;
    if (path.startsWith("/kitchen/")) {
      const section = path.split("/")[2];
      if (section && KitchenSections.find((s) => s.id === section)) {
        activeSection = section;
      }
    }
  }

  function switchSection(sectionId) {
    activeSection = sectionId;
    window.history.pushState({}, "", `/kitchen/${sectionId}`);
  }

  function switchProfile(profileId) {
    selectedProfile = profileId;
  }

  // Calculate kitchen stats
  let kitchenStats = {
    totalPantryItems: 0,
    lowStockItems: 0,
    weeklyMeals: 7,
    activeFestivals: 0,
    vendorContacts: 0,
  };

  function calculateKitchenStats() {
    let total = 0;
    let lowStock = 0;

    // Count pantry items and low stock
    Object.values(PantryCategories).forEach((category) => {
      total += category.items.length;
      category.items.forEach((item) => {
        if (item.quantity <= item.minStock) {
          lowStock++;
        }
      });
    });

    kitchenStats.totalPantryItems = total;
    kitchenStats.lowStockItems = lowStock;
    kitchenStats.vendorContacts = Object.values(KitchenVendors).flat().length;

    // Check for active festivals (simplified)
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    if (currentMonth === 10 || currentMonth === 11) {
      // Diwali season
      kitchenStats.activeFestivals = 1;
    }
  }

  // Calculate current section info
  $: currentSection = KitchenSections.find((s) => s.id === activeSection);

  onMount(() => {
    calculateKitchenStats();
  });
</script>

<!-- Kitchen Management Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-orange-100 p-3 rounded-lg">
            <Icon icon="heroicons:home" class="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Kitchen Management Suite</h1>
            <p class="text-lg text-gray-600">சமையலறை நிர்வாகம்</p>
            <p class="text-sm text-gray-500">Complete nourishment system for South Indian vegetarian household</p>
          </div>
        </div>

        <!-- Profile Selector -->
        <div class="flex space-x-2">
          <button on:click={() => switchProfile("family")} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedProfile === 'family' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
            <Icon icon="heroicons:users" class="w-5 h-5" />
            <span class="font-medium">Family</span>
          </button>
          <button on:click={() => switchProfile("paati")} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedProfile === 'paati' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
            <Icon icon="heroicons:heart" class="w-5 h-5" />
            <span class="font-medium">Paati</span>
          </button>
          <button on:click={() => switchProfile("kids")} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedProfile === 'kids' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
            <Icon icon="heroicons:academic-cap" class="w-5 h-5" />
            <span class="font-medium">Kids</span>
          </button>
        </div>
      </div>

      <!-- Kitchen Stats Overview -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{kitchenStats.totalPantryItems}</div>
          <div class="text-sm text-blue-800">Pantry Items</div>
          <div class="text-xs text-blue-600">पेंट्री सामान</div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-red-600">{kitchenStats.lowStockItems}</div>
          <div class="text-sm text-red-800">Low Stock</div>
          <div class="text-xs text-red-600">குறைவான स्टॉक</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{kitchenStats.weeklyMeals}</div>
          <div class="text-sm text-green-800">Weekly Meals</div>
          <div class="text-xs text-green-600">साप्ताहिक भोजन</div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">{kitchenStats.activeFestivals}</div>
          <div class="text-sm text-purple-800">Active Festivals</div>
          <div class="text-xs text-purple-600">செயலில் பண्डिगै</div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-amber-600">{kitchenStats.vendorContacts}</div>
          <div class="text-sm text-amber-800">Vendor Contacts</div>
          <div class="text-xs text-amber-600">विक्रेता संपर्क</div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Navigation Sidebar -->
      <div class="lg:w-1/4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Kitchen Sections</h3>
          <nav class="space-y-2">
            {#each KitchenSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? 'bg-orange-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="font-medium truncate">{section.name}</div>
                  <div class="text-xs opacity-75 truncate">{section.tamil}</div>
                </div>
              </button>
            {/each}
          </nav>

          <!-- Quick Actions -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div class="space-y-2">
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                <Icon icon="heroicons:plus" class="w-4 h-4" />
                <span>Add Grocery Item</span>
              </button>
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <Icon icon="heroicons:calendar-days" class="w-4 h-4" />
                <span>Plan Weekly Meals</span>
              </button>
              <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <Icon icon="heroicons:shopping-cart" class="w-4 h-4" />
                <span>Generate Shopping List</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="lg:w-3/4">
        {#if activeSection === "dashboard"}
          <!-- Kitchen Dashboard -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Today's Meal Plan -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon icon="heroicons:calendar-days" class="w-5 h-5 mr-2 text-orange-500" />
                Today's Meals
                <span class="text-sm text-gray-500 ml-2">இன்றைய உணவு</span>
              </h3>
              <div class="space-y-4">
                <div class="border-l-4 border-yellow-400 pl-4">
                  <div class="font-medium text-gray-900">Breakfast</div>
                  <div class="text-sm text-gray-600">Idli + Chutney</div>
                  <div class="text-xs text-gray-500">இட்லி + சட்னி</div>
                </div>
                <div class="border-l-4 border-orange-400 pl-4">
                  <div class="font-medium text-gray-900">Lunch</div>
                  <div class="text-sm text-gray-600">Sambar + Rice</div>
                  <div class="text-xs text-gray-500">சாம்பார் + சாதம்</div>
                </div>
                <div class="border-l-4 border-blue-400 pl-4">
                  <div class="font-medium text-gray-900">Dinner</div>
                  <div class="text-sm text-gray-600">Rasam + Poriyal</div>
                  <div class="text-xs text-gray-500">ரசம் + பொரியல்</div>
                </div>
              </div>
            </div>

            <!-- Low Stock Alert -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2 text-red-500" />
                Low Stock Alert
                <span class="text-sm text-gray-500 ml-2">குறைவான स्टॉक</span>
              </h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <div class="font-medium text-red-900">Urad Dal</div>
                    <div class="text-sm text-red-700">0.3 kg remaining</div>
                  </div>
                  <div class="text-xs text-red-600">உளுந்து</div>
                </div>
                <div class="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <div class="font-medium text-orange-900">Turmeric Powder</div>
                    <div class="text-sm text-orange-700">80g remaining</div>
                  </div>
                  <div class="text-xs text-orange-600">மஞ்சள் तूल</div>
                </div>
                <div class="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <div class="font-medium text-yellow-900">Coconut Oil</div>
                    <div class="text-sm text-yellow-700">0.15L remaining</div>
                  </div>
                  <div class="text-xs text-yellow-600">தেங়কায় എണ্ணেय়</div>
                </div>
              </div>
            </div>

            <!-- Kids Tiffin Reminder -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon icon="heroicons:academic-cap" class="w-5 h-5 mr-2 text-green-500" />
                Tomorrow's Tiffin
                <span class="text-sm text-gray-500 ml-2">நாளै டिफिन</span>
              </h3>
              <div class="space-y-3">
                <div class="border border-green-200 rounded-lg p-3">
                  <div class="font-medium text-green-900">Thambi (6th)</div>
                  <div class="text-sm text-green-700">Lemon Rice + Cucumber</div>
                  <div class="text-xs text-green-600">🧂 Add lemon fresh morning</div>
                </div>
                <div class="border border-blue-200 rounded-lg p-3">
                  <div class="font-medium text-blue-900">Akka (11th + JEE)</div>
                  <div class="text-sm text-blue-700">Dosa + Chutney</div>
                  <div class="text-xs text-blue-600">🔥 Make batter tonight</div>
                </div>
              </div>
            </div>

            <!-- Festival Prep -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon icon="heroicons:gift" class="w-5 h-5 mr-2 text-purple-500" />
                Festival Prep
                <span class="text-sm text-gray-500 ml-2">पण्डিகै தैयारी</span>
              </h3>
              <div class="text-center py-6">
                <Icon icon="heroicons:calendar" class="w-12 h-12 mx-auto text-purple-400 mb-3" />
                <div class="text-lg font-medium text-gray-900">Diwali Preparation</div>
                <div class="text-sm text-gray-600 mb-3">21 days remaining</div>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div class="text-sm text-purple-800">
                    <strong>Next:</strong> Start planning sweet varieties
                  </div>
                  <div class="text-xs text-purple-600 mt-1">Laddu, Mysore Pak, Badusha</div>
                </div>
              </div>
            </div>
          </div>
        {:else if activeSection === "pantry"}
          <PantryTracker {selectedProfile} />
        {:else if activeSection === "fresh"}
          <FreshProduce {selectedProfile} />
        {:else if activeSection === "meals"}
          <MealPlanner {selectedProfile} />
        {:else if activeSection === "kids"}
          <KidsMenu {selectedProfile} />
        {:else if activeSection === "recipes"}
          <RecipeArchive {selectedProfile} />
        {:else if activeSection === "vendors"}
          <VendorManager {selectedProfile} />
        {:else}
          <!-- Placeholder for other sections -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="text-center py-12">
              <div class="text-6xl mb-4">
                <Icon icon={currentSection?.icon || "heroicons:cog"} class="w-16 h-16 mx-auto text-gray-400" />
              </div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">{currentSection?.name}</h2>
              <p class="text-gray-600 mb-1">{currentSection?.tamil}</p>
              <p class="text-gray-500 mb-6">{currentSection?.description}</p>
              <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
                <p class="text-sm text-orange-800">
                  <strong>Coming Soon!</strong> This kitchen section is being developed with Tamil-English interface and South Indian vegetarian focus.
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
