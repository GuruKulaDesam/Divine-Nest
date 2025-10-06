<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "trips";
  let trips = [];
  let pilgrimages = [];
  let showAddTrip = false;
  let showAddPilgrimage = false;

  const tabs = [
    { id: "trips", label: "All Trips", icon: "heroicons:map" },
    { id: "pilgrimages", label: "Pilgrimages", icon: "heroicons:building-library" },
    { id: "memories", label: "Travel Memories", icon: "heroicons:photo" },
    { id: "planning", label: "Trip Planning", icon: "heroicons:calendar-days" },
    { id: "expenses", label: "Travel Expenses", icon: "heroicons:currency-rupee" },
  ];

  let newTrip = {
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    type: "family",
    purpose: "leisure",
    participants: [],
    highlights: "",
    expenses: 0,
    accommodation: "",
    transportation: "",
    photos: [],
    memories: "",
    rating: 5,
  };

  let newPilgrimage = {
    temple: "",
    deity: "",
    location: "",
    visitDate: "",
    purpose: "darshan",
    prasadam: "",
    specialRituals: [],
    significance: "",
    experiences: "",
    donations: 0,
    photos: [],
    mantras: [],
    companions: [],
    spiritualGains: "",
  };

  const tripTypes = [
    { id: "family", label: "Family Trip", icon: "heroicons:user-group", color: "text-blue-500" },
    { id: "pilgrimage", label: "Pilgrimage", icon: "heroicons:building-library", color: "text-orange-500" },
    { id: "wedding", label: "Wedding/Ceremony", icon: "heroicons:heart", color: "text-pink-500" },
    { id: "education", label: "Educational", icon: "heroicons:academic-cap", color: "text-purple-500" },
    { id: "business", label: "Business/Work", icon: "heroicons:briefcase", color: "text-gray-500" },
    { id: "health", label: "Medical/Health", icon: "heroicons:heart", color: "text-red-500" },
    { id: "cultural", label: "Cultural Event", icon: "heroicons:musical-note", color: "text-green-500" },
    { id: "emergency", label: "Emergency", icon: "heroicons:exclamation-triangle", color: "text-red-600" },
  ];

  const famousTemples = [
    {
      name: "Meenakshi Amman Temple",
      location: "Madurai, Tamil Nadu",
      deity: "Goddess Meenakshi (Parvati)",
      significance: "One of the most magnificent Dravidian temples",
      festivals: ["Meenakshi Tirukalyanam", "Navarathri"],
      specialFeatures: ["1000-pillared hall", "Musical pillars", "Golden lotus tank"],
    },
    {
      name: "Tirumala Venkateswara Temple",
      location: "Tirupati, Andhra Pradesh",
      deity: "Lord Venkateswara (Vishnu)",
      significance: "World's richest temple, most visited pilgrimage site",
      festivals: ["Brahmotsavam", "Vaikunta Ekadasi"],
      specialFeatures: ["Laddu prasadam", "Hair tonsuring", "Seven hills"],
    },
    {
      name: "Brihadeeswarar Temple",
      location: "Thanjavur, Tamil Nadu",
      deity: "Lord Brihadeeswarar (Shiva)",
      significance: "UNESCO World Heritage Site, Chola architecture",
      festivals: ["Shivaratri", "Thiruvathirai"],
      specialFeatures: ["Shadow-less tower", "Monolithic Nandi", "Ancient inscriptions"],
    },
    {
      name: "Kanchipuram Temples",
      location: "Kanchipuram, Tamil Nadu",
      deity: "Various (City of 1000 temples)",
      significance: "Ancient seat of learning, Silk sarees",
      festivals: ["Panguni Uthiram", "Vaikasi Visakam"],
      specialFeatures: ["Ekambareswarar Temple", "Kamakshi Amman Temple", "Silk weaving"],
    },
    {
      name: "Rameswaram Temple",
      location: "Rameswaram, Tamil Nadu",
      deity: "Lord Ramanathaswamy (Shiva)",
      significance: "One of Char Dham, Bridge to Lanka",
      festivals: ["Shivaratri", "Arudra Darshan"],
      specialFeatures: ["Longest temple corridor", "22 sacred wells", "Ram Setu connection"],
    },
  ];

  const pilgrimage_purposes = [
    { id: "darshan", label: "दर्शन | Darshan", description: "Seeking divine vision and blessings" },
    { id: "prayer", label: "प्रार्थना | Prayer", description: "Specific prayers for family welfare" },
    { id: "gratitude", label: "कृतज्ञता | Gratitude", description: "Thanksgiving for received blessings" },
    { id: "festival", label: "उत्सव | Festival", description: "Participating in temple festivals" },
    { id: "ritual", label: "संस्कार | Ritual", description: "Performing special ceremonies" },
    { id: "vow", label: "व्रत | Vow Fulfillment", description: "Completing promised visits" },
    { id: "learning", label: "अध्ययन | Learning", description: "Spiritual education and culture" },
    { id: "meditation", label: "ध्यान | Meditation", description: "Peace and spiritual growth" },
  ];

  const travel_memories = [
    {
      trip: "Kashi Vishwanath Darshan",
      date: "2023-03-15",
      memory: "The evening aarti at Ganga ghat was absolutely divine. The sound of bells, chanting, and the sight of thousands of diyas floating on the sacred river created an atmosphere of pure spirituality.",
      photos: 15,
      significance: "First family pilgrimage together",
      lessons: "Importance of maintaining daily spiritual practices",
    },
    {
      trip: "Ooty Family Vacation",
      date: "2023-07-20",
      memory: "Children's joy while seeing the toy train and picking fresh strawberries. The cool mountain air and beautiful gardens made everyone forget the Chennai heat.",
      photos: 47,
      significance: "Quality family bonding time",
      lessons: "Simple pleasures bring the greatest happiness",
    },
    {
      trip: "Thiruvannamalai Girivalam",
      date: "2023-11-12",
      memory: "Walking the 14km circumambulation path during Karthigai Deepam. The spiritual energy and thousands of devotees walking together was transformative.",
      photos: 23,
      significance: "Spiritual awakening for teenagers",
      lessons: "Discipline and devotion go hand in hand",
    },
    {
      trip: "Guruvayur Temple Visit",
      date: "2023-12-25",
      memory: "The Krishna seva and special abhishekam for New Year. The priest's detailed explanation of rituals helped children understand the significance.",
      photos: 12,
      significance: "Religious education for children",
      lessons: "Rituals have deep meaning and purpose",
    },
  ];

  let plannedTrips = [
    {
      destination: "Char Dham Yatra",
      planned_date: "2024-05-15",
      duration: "15 days",
      purpose: "Complete pilgrimage circuit",
      estimated_cost: 150000,
      preparation_needed: ["Medical check-up for elderly members", "Book helicopter services in advance", "Arrange special diet requirements", "Get travel insurance"],
      spiritual_goals: "Seeking liberation and family blessings",
      status: "planning",
    },
    {
      destination: "South India Temple Circuit",
      planned_date: "2024-08-20",
      duration: "10 days",
      purpose: "Cultural and spiritual education",
      estimated_cost: 80000,
      preparation_needed: ["Study temple history and significance", "Learn basic Sanskrit shlokas", "Plan traditional dress requirements", "Research local cuisine"],
      spiritual_goals: "Deepening cultural roots and traditions",
      status: "researching",
    },
    {
      destination: "Kashmir Valley",
      planned_date: "2024-10-10",
      duration: "7 days",
      purpose: "Family bonding and natural beauty",
      estimated_cost: 120000,
      preparation_needed: ["Check weather conditions", "Pack warm clothing", "Research safe areas to visit", "Book houseboats in advance"],
      spiritual_goals: "Appreciation of divine creation",
      status: "considering",
    },
  ];

  async function loadTrips() {
    try {
      trips = (await db.trips?.toArray()) || [];
    } catch (error) {
      console.error("Error loading trips:", error);
      trips = [];
    }
  }

  async function loadPilgrimages() {
    try {
      pilgrimages = (await db.pilgrimages?.toArray()) || [];
    } catch (error) {
      console.error("Error loading pilgrimages:", error);
      pilgrimages = [];
    }
  }

  async function addTrip() {
    if (!newTrip.title.trim() || !newTrip.destination.trim()) return;

    try {
      const trip = {
        ...newTrip,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "completed",
      };

      await db.trips?.add(trip);
      trips = [...trips, trip];

      // Reset form
      newTrip = {
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        type: "family",
        purpose: "leisure",
        participants: [],
        highlights: "",
        expenses: 0,
        accommodation: "",
        transportation: "",
        photos: [],
        memories: "",
        rating: 5,
      };
      showAddTrip = false;
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  }

  async function addPilgrimage() {
    if (!newPilgrimage.temple.trim() || !newPilgrimage.location.trim()) return;

    try {
      const pilgrimage = {
        ...newPilgrimage,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "completed",
      };

      await db.pilgrimages?.add(pilgrimage);
      pilgrimages = [...pilgrimages, pilgrimage];

      // Reset form
      newPilgrimage = {
        temple: "",
        deity: "",
        location: "",
        visitDate: "",
        purpose: "darshan",
        prasadam: "",
        specialRituals: [],
        significance: "",
        experiences: "",
        donations: 0,
        photos: [],
        mantras: [],
        companions: [],
        spiritualGains: "",
      };
      showAddPilgrimage = false;
    } catch (error) {
      console.error("Error adding pilgrimage:", error);
    }
  }

  function getTripTypeIcon(type) {
    return tripTypes.find((t) => t.id === type)?.icon || "heroicons:map";
  }

  function getTripTypeColor(type) {
    return tripTypes.find((t) => t.id === type)?.color || "text-gray-500";
  }

  function calculateTripDuration(startDate, endDate) {
    if (!startDate || !endDate) return "Unknown duration";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  }

  function getStarRating(rating) {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rating ? "⭐" : "☆"))
      .join("");
  }

  onMount(() => {
    document.title = "Trip History - Family App";
    loadTrips();
    loadPilgrimages();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900/20 dark:to-cyan-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white">
            <Icon icon="heroicons:map" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Trip History</h1>
            <p class="text-gray-600 dark:text-gray-300">यात्रा कल्याणकारी | Travel brings knowledge and growth</p>
          </div>
        </div>
      </div>

      <!-- Travel Wisdom -->
      <div class="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:globe-asia-australia" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">यात्रा संस्कार | Travel Traditions</h3>
            <p class="text-white/90">"यात्रा यत्न साध्यते | Through travel, one gains wisdom, perspective, and spiritual growth. Every journey teaches us something new about ourselves and the world."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "பயணம் ஞானத்தையும் ஆன்மீக வளர்ச்சியையும் தருகிறது"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-teal-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-teal-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-teal-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "trips"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">🗺️ All Family Trips</h3>
          <button class="flex items-center space-x-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors" on:click={() => (showAddTrip = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Trip</span>
          </button>
        </div>

        {#if showAddTrip}
          <div class="mb-6 p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
            <h4 class="font-semibold text-teal-800 dark:text-teal-200 mb-4">Record New Trip</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trip Title</label>
                <input type="text" bind:value={newTrip.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Name your trip..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination</label>
                <input type="text" bind:value={newTrip.destination} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Where did you go?" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                <input type="date" bind:value={newTrip.startDate} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                <input type="date" bind:value={newTrip.endDate} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trip Type</label>
                <select bind:value={newTrip.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each tripTypes as type}
                    <option value={type.id}>{type.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Expenses (₹)</label>
                <input type="number" bind:value={newTrip.expenses} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accommodation</label>
                <input type="text" bind:value={newTrip.accommodation} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Hotel, Resort, Guest House..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transportation</label>
                <input type="text" bind:value={newTrip.transportation} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Flight, Train, Car..." />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trip Highlights</label>
                <textarea bind:value={newTrip.highlights} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="What were the best moments of this trip?"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Memories & Experiences</label>
                <textarea bind:value={newTrip.memories} rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Share your favorite memories from this trip..."></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trip Rating (1-5 stars)</label>
                <input type="range" min="1" max="5" bind:value={newTrip.rating} class="w-full" />
                <div class="text-center mt-2">
                  <span class="text-2xl">{getStarRating(newTrip.rating)}</span>
                </div>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors" on:click={addTrip}> Save Trip </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddTrip = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Trips List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each trips as trip}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon={getTripTypeIcon(trip.type)} class="w-6 h-6 {getTripTypeColor(trip.type)}" />
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{trip.title}</h4>
                    <p class="text-sm text-teal-600 dark:text-teal-400">{trip.destination}</p>
                  </div>
                </div>
                <span class="text-xl">{getStarRating(trip.rating)}</span>
              </div>

              <div class="space-y-2 mb-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span class="font-medium">{calculateTripDuration(trip.startDate, trip.endDate)}</span>
                </div>
                {#if trip.expenses > 0}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Expenses:</span>
                    <span class="font-medium text-green-600 dark:text-green-400">₹{trip.expenses.toLocaleString()}</span>
                  </div>
                {/if}
                {#if trip.accommodation}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Stay:</span>
                    <span class="font-medium">{trip.accommodation}</span>
                  </div>
                {/if}
                {#if trip.transportation}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Transport:</span>
                    <span class="font-medium">{trip.transportation}</span>
                  </div>
                {/if}
              </div>

              {#if trip.highlights}
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{trip.highlights}</p>
              {/if}

              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </span>
                <button class="text-teal-600 dark:text-teal-400 text-sm hover:underline"> View Details </button>
              </div>
            </div>
          {/each}
        </div>

        {#if trips.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:map" class="w-16 h-16 mx-auto text-teal-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Trips Recorded Yet</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Start documenting your family's travel memories</p>
            <button class="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors" on:click={() => (showAddTrip = true)}> Record First Trip </button>
          </div>
        {/if}
      {:else if currentTab === "pilgrimages"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">🏛️ Sacred Pilgrimages</h3>
          <button class="flex items-center space-x-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors" on:click={() => (showAddPilgrimage = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Pilgrimage</span>
          </button>
        </div>

        {#if showAddPilgrimage}
          <div class="mb-6 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <h4 class="font-semibold text-orange-800 dark:text-orange-200 mb-4">Record Sacred Journey</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Temple/Sacred Place</label>
                <input type="text" bind:value={newPilgrimage.temple} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Name of temple or sacred place..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Deity</label>
                <input type="text" bind:value={newPilgrimage.deity} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Primary deity worshipped..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input type="text" bind:value={newPilgrimage.location} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="City, State, Country..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Visit Date</label>
                <input type="date" bind:value={newPilgrimage.visitDate} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purpose of Visit</label>
                <select bind:value={newPilgrimage.purpose} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each pilgrimage_purposes as purpose}
                    <option value={purpose.id}>{purpose.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Donations/Offerings (₹)</label>
                <input type="number" bind:value={newPilgrimage.donations} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prasadam Received</label>
                <input type="text" bind:value={newPilgrimage.prasadam} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Laddu, Vibuthi, Flowers..." />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Spiritual Significance</label>
                <textarea bind:value={newPilgrimage.significance} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Why is this place spiritually important?"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Spiritual Experiences</label>
                <textarea bind:value={newPilgrimage.experiences} rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Share your spiritual experiences and insights from this visit..."></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Spiritual Gains & Learning</label>
                <textarea bind:value={newPilgrimage.spiritualGains} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="What did you learn? How did this visit impact your spiritual journey?"></textarea>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors" on:click={addPilgrimage}> Save Pilgrimage </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddPilgrimage = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Pilgrimages List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each pilgrimages as pilgrimage}
            <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-orange-200 dark:border-orange-700">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon="heroicons:building-library" class="w-6 h-6 text-orange-500" />
                  <div>
                    <h4 class="font-bold text-orange-900 dark:text-orange-100">{pilgrimage.temple}</h4>
                    <p class="text-sm text-orange-700 dark:text-orange-300">{pilgrimage.deity}</p>
                    <p class="text-xs text-orange-600 dark:text-orange-400">{pilgrimage.location}</p>
                  </div>
                </div>
                <span class="px-2 py-1 text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full">
                  {pilgrimage_purposes.find((p) => p.id === pilgrimage.purpose)?.label.split(" | ")[1] || pilgrimage.purpose}
                </span>
              </div>

              {#if pilgrimage.significance}
                <div class="mb-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <h5 class="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">Significance:</h5>
                  <p class="text-xs text-orange-800 dark:text-orange-200">{pilgrimage.significance}</p>
                </div>
              {/if}

              {#if pilgrimage.experiences}
                <div class="mb-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <h5 class="font-semibold text-amber-900 dark:text-amber-100 text-sm mb-1">Experience:</h5>
                  <p class="text-xs text-amber-800 dark:text-amber-200">{pilgrimage.experiences}</p>
                </div>
              {/if}

              <div class="space-y-2">
                {#if pilgrimage.prasadam}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-orange-600 dark:text-orange-400">Prasadam:</span>
                    <span class="font-medium text-orange-800 dark:text-orange-200">{pilgrimage.prasadam}</span>
                  </div>
                {/if}
                {#if pilgrimage.donations > 0}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-orange-600 dark:text-orange-400">Offerings:</span>
                    <span class="font-medium text-green-600 dark:text-green-400">₹{pilgrimage.donations.toLocaleString()}</span>
                  </div>
                {/if}
                <div class="flex items-center justify-between text-sm">
                  <span class="text-orange-600 dark:text-orange-400">Visit Date:</span>
                  <span class="font-medium text-orange-800 dark:text-orange-200">{new Date(pilgrimage.visitDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>

        {#if pilgrimages.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:building-library" class="w-16 h-16 mx-auto text-orange-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Pilgrimages Recorded Yet</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Document your family's spiritual journeys</p>
            <button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors" on:click={() => (showAddPilgrimage = true)}> Record First Pilgrimage </button>
          </div>
        {/if}

        <!-- Famous Temples Reference -->
        <div class="mt-8">
          <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">🏛️ Famous South Indian Temples</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each famousTemples as temple}
              <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
                <h5 class="font-bold text-yellow-900 dark:text-yellow-100 mb-2">{temple.name}</h5>
                <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-1">{temple.location}</p>
                <p class="text-sm text-yellow-800 dark:text-yellow-200 mb-2">{temple.deity}</p>
                <p class="text-xs text-yellow-600 dark:text-yellow-400 mb-2">{temple.significance}</p>
                <div class="text-xs text-yellow-500 dark:text-yellow-500">
                  <strong>Festivals:</strong>
                  {temple.festivals.join(", ")}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "memories"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">📸 Travel Memories</h3>
          <div class="space-y-6">
            {#each travel_memories as memory}
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-blue-900 dark:text-blue-100">{memory.trip}</h4>
                    <p class="text-blue-700 dark:text-blue-300">{new Date(memory.date).toLocaleDateString()}</p>
                    <p class="text-blue-600 dark:text-blue-400 text-sm">{memory.significance}</p>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                      <Icon icon="heroicons:photo" class="w-4 h-4" />
                      <span class="text-sm">{memory.photos} photos</span>
                    </div>
                  </div>
                </div>

                <div class="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Memory:</h5>
                  <p class="text-blue-800 dark:text-blue-200 italic">"{memory.memory}"</p>
                </div>

                <div class="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <h5 class="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Lessons Learned:</h5>
                  <p class="text-indigo-800 dark:text-indigo-200">{memory.lessons}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "planning"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">📅 Future Trip Planning</h3>
          <div class="space-y-6">
            {#each plannedTrips as trip}
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-green-900 dark:text-green-100">{trip.destination}</h4>
                    <p class="text-green-700 dark:text-green-300">{new Date(trip.planned_date).toLocaleDateString()} • {trip.duration}</p>
                    <p class="text-green-600 dark:text-green-400 text-sm">{trip.purpose}</p>
                  </div>
                  <div class="text-right">
                    <span class="px-3 py-1 text-xs font-medium rounded-full {trip.status === 'planning' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : trip.status === 'researching' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}">
                      {trip.status.toUpperCase()}
                    </span>
                    <p class="text-green-600 dark:text-green-400 text-sm mt-1">₹{trip.estimated_cost.toLocaleString()}</p>
                  </div>
                </div>

                <div class="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2">Spiritual Goals:</h5>
                  <p class="text-green-800 dark:text-green-200">{trip.spiritual_goals}</p>
                </div>

                <div class="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <h5 class="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Preparation Needed:</h5>
                  <div class="space-y-1">
                    {#each trip.preparation_needed as prep}
                      <div class="flex items-center space-x-2">
                        <Icon icon="heroicons:check-circle" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span class="text-sm text-emerald-800 dark:text-emerald-200">{prep}</span>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "expenses"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">💰 Travel Expenses Analysis</h3>

          <!-- Travel Budget Overview -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Total Spent</h4>
                  <p class="text-3xl font-bold">₹{trips.reduce((sum, trip) => sum + (trip.expenses || 0), 0).toLocaleString()}</p>
                  <p class="text-blue-200 text-sm">All time travel expenses</p>
                </div>
                <Icon icon="heroicons:currency-rupee" class="w-12 h-12 text-blue-200" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Average Trip Cost</h4>
                  <p class="text-3xl font-bold">₹{trips.length > 0 ? Math.round(trips.reduce((sum, trip) => sum + (trip.expenses || 0), 0) / trips.length).toLocaleString() : "0"}</p>
                  <p class="text-green-200 text-sm">Per trip average</p>
                </div>
                <Icon icon="heroicons:calculator" class="w-12 h-12 text-green-200" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Planned Budget</h4>
                  <p class="text-3xl font-bold">₹{plannedTrips.reduce((sum, trip) => sum + trip.estimated_cost, 0).toLocaleString()}</p>
                  <p class="text-purple-200 text-sm">For upcoming trips</p>
                </div>
                <Icon icon="heroicons:banknotes" class="w-12 h-12 text-purple-200" />
              </div>
            </div>
          </div>

          <!-- Expense Categories -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Trip Type Analysis</h4>
              <div class="space-y-4">
                {#each tripTypes as type}
                  {@const typeTrips = trips.filter((trip) => trip.type === type.id)}
                  {@const totalCost = typeTrips.reduce((sum, trip) => sum + (trip.expenses || 0), 0)}
                  {#if typeTrips.length > 0}
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <Icon icon={type.icon} class="w-5 h-5 {type.color}" />
                        <span class="text-sm font-medium">{type.label}</span>
                        <span class="text-xs text-gray-500">({typeTrips.length} trips)</span>
                      </div>
                      <span class="font-bold text-green-600">₹{totalCost.toLocaleString()}</span>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Monthly Travel Budget</h4>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span class="text-sm font-medium">Recommended Monthly Savings</span>
                  <span class="font-bold text-blue-600">₹{Math.round(plannedTrips.reduce((sum, trip) => sum + trip.estimated_cost, 0) / 12).toLocaleString()}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span class="text-sm font-medium">Emergency Travel Fund</span>
                  <span class="font-bold text-green-600">₹25,000</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span class="text-sm font-medium">Pilgrimage Fund</span>
                  <span class="font-bold text-yellow-600">₹{Math.round(plannedTrips.filter((trip) => trip.purpose.includes("pilgrimage")).reduce((sum, trip) => sum + trip.estimated_cost, 0) / 6).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Savings Tips -->
          <div class="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
              <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
              यात्रा बचत युक्तियाँ | Travel Savings Tips
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <h5 class="font-semibold text-indigo-700 dark:text-indigo-300">Planning Tips:</h5>
                <ul class="text-sm text-indigo-600 dark:text-indigo-400 space-y-1">
                  <li>• Book transportation 2-3 months in advance</li>
                  <li>• Travel during off-peak seasons</li>
                  <li>• Compare multiple accommodation options</li>
                  <li>• Look for group discounts for family bookings</li>
                </ul>
              </div>
              <div class="space-y-2">
                <h5 class="font-semibold text-indigo-700 dark:text-indigo-300">During Travel:</h5>
                <ul class="text-sm text-indigo-600 dark:text-indigo-400 space-y-1">
                  <li>• Eat at local restaurants for authentic experience</li>
                  <li>• Use public transportation when possible</li>
                  <li>• Carry reusable water bottles</li>
                  <li>• Set daily expense limits and track spending</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
