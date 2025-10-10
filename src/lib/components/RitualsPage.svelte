<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  // Import rituals components
  import RitualTracker from "../components/RitualTracker.svelte";
  import TemplePlanner from "../components/TemplePlanner.svelte";
  import FestivalManager from "../components/FestivalManager.svelte";

  import { getRitualsStats, getTodaysRituals, getUpcomingFestivals, initializeRitualsData, RitualsSections, FamilyMembers } from "../data/rituals.js";

  let activeSection = "overview";
  let selectedMember = "family";
  let stats = {};
  let todaysRituals = [];
  let upcomingFestivals = [];

  // Calculate current section info
  $: currentSection = RitualsSections.find((s) => s.id === activeSection);

  // Handle URL-based section routing
  $: {
    const path = $page.url.pathname;
    if (path.startsWith("/divinity/rituals/")) {
      const section = path.split("/")[3];
      if (section && RitualsSections.find((s) => s.id === section)) {
        activeSection = section;
      }
    }
  }

  function switchSection(sectionId) {
    activeSection = sectionId;
    window.history.pushState({}, "", `/divinity/rituals/${sectionId}`);
  }

  function switchMember(memberId) {
    selectedMember = memberId;
  }

  onMount(async () => {
    await initializeRitualsData();
    await loadData();
  });

  async function loadData() {
    stats = await getRitualsStats();
    todaysRituals = await getTodaysRituals();
    upcomingFestivals = await getUpcomingFestivals();
  }
</script>

<!-- Rituals & Spiritual Life Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-orange-100 p-3 rounded-lg">
            <Icon icon="heroicons:sparkles" class="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">🕉️ Rituals & Spiritual Life</h1>
            <p class="text-lg text-gray-600">சடங்குகள் மற்றும் ஆன்மீக வாழ்க்கை</p>
            <p class="text-sm text-gray-500">Preserve and practice South Indian spiritual traditions</p>
          </div>
        </div>

        <!-- Family Member Selector -->
        <div class="flex space-x-2">
          {#each Object.entries(FamilyMembers) as [memberId, member]}
            <button on:click={() => switchMember(memberId)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedMember === memberId ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
              <Icon icon="heroicons:user-circle" class="w-5 h-5" />
              <span class="font-medium">{member.name}</span>
              <span class="text-sm opacity-75">({member.tamil})</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Quick Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Today's Rituals</p>
              <p class="text-2xl font-bold">{todaysRituals.length}</p>
              <p class="text-xs opacity-75">இன்றைய சடங்குகள்</p>
            </div>
            <Icon icon="heroicons:sparkles" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Temple Visits</p>
              <p class="text-2xl font-bold">{stats.totalTempleTrips || 0}</p>
              <p class="text-xs opacity-75">கோயில் பயணங்கள்</p>
            </div>
            <Icon icon="heroicons:building-storefront" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Festivals</p>
              <p class="text-2xl font-bold">{stats.totalFestivals || 0}</p>
              <p class="text-xs opacity-75">விழாக்கள்</p>
            </div>
            <Icon icon="heroicons:calendar-days" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Completed</p>
              <p class="text-2xl font-bold">{todaysRituals.filter((r) => r.completed).length}</p>
              <p class="text-xs opacity-75">முடிந்தது</p>
            </div>
            <Icon icon="heroicons:check-circle" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon icon="heroicons:bars-3" class="w-5 h-5 mr-2" />
            Spiritual Sections
            <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span>
          </h3>

          <nav class="space-y-2">
            {#each RitualsSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : 'text-gray-600 hover:bg-gray-50'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{section.name}</p>
                  <p class="text-xs opacity-75 truncate">{section.tamil}</p>
                </div>
                {#if activeSection === section.id}
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                {/if}
              </button>
            {/each}
          </nav>

          <!-- Quick Actions -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Icon icon="heroicons:bolt" class="w-4 h-4 mr-2" />
              Quick Actions
              <span class="ml-2 text-xs text-gray-500">விரைவு செயல்கள்</span>
            </h4>

            <div class="space-y-2">
              <button class="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors text-left">
                <Icon icon="heroicons:plus" class="w-4 h-4 text-orange-600" />
                <span class="text-sm text-gray-700">Add Ritual</span>
              </button>
              <button class="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors text-left">
                <Icon icon="heroicons:calendar" class="w-4 h-4 text-orange-600" />
                <span class="text-sm text-gray-700">Plan Temple Visit</span>
              </button>
              <button class="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors text-left">
                <Icon icon="heroicons:bell" class="w-4 h-4 text-orange-600" />
                <span class="text-sm text-gray-700">Festival Reminder</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-xl shadow-lg p-6">
          {#if activeSection === "overview"}
            <!-- Overview Dashboard -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-900">Spiritual Overview</h2>
                <span class="text-sm text-gray-500">ஆன்மீக கண்ணோட்டம்</span>
              </div>

              <!-- Today's Rituals -->
              {#if todaysRituals.length > 0}
                <div class="bg-orange-50 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-orange-900 mb-3">Today's Rituals</h3>
                  <div class="space-y-2">
                    {#each todaysRituals as ritual}
                      <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div class="flex items-center space-x-3">
                          <Icon icon="heroicons:sparkles" class="w-5 h-5 text-orange-600" />
                          <span class="font-medium">{ritual.name}</span>
                          <span class="text-sm text-gray-500">({ritual.tamil})</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          {#if ritual.completed}
                            <Icon icon="heroicons:check-circle" class="w-5 h-5 text-green-600" />
                          {:else}
                            <button class="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors"> Complete </button>
                          {/if}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}

              <!-- Upcoming Festivals -->
              {#if upcomingFestivals.length > 0}
                <div class="bg-amber-50 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-amber-900 mb-3">Upcoming Festivals</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each upcomingFestivals.slice(0, 4) as festival}
                      <div class="bg-white p-4 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                          <h4 class="font-semibold text-gray-900">{festival.name}</h4>
                          <span class="text-sm text-gray-500">{festival.date}</span>
                        </div>
                        <p class="text-sm text-gray-600">{festival.description}</p>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {:else if activeSection === "tracker"}
            <RitualTracker />
          {:else if activeSection === "temple"}
            <TemplePlanner />
          {:else if activeSection === "festivals"}
            <FestivalManager />
          {:else}
            <div class="text-center py-12">
              <Icon icon="heroicons:sparkles" class="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3>
              <p class="text-gray-600">This spiritual section is under development.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
