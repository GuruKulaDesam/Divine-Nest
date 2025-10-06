<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "leisure";
  let leisureActivities = [];
  let communityEvents = [];
  let showAddActivity = false;
  let showAddEvent = false;

  const tabs = [
    { id: "leisure", label: "Leisure Activities", icon: "heroicons:face-smile" },
    { id: "community", label: "Community Events", icon: "heroicons:users" },
    { id: "cultural", label: "Cultural Programs", icon: "heroicons:musical-note" },
    { id: "calendar", label: "Event Calendar", icon: "heroicons:calendar-days" },
    { id: "participation", label: "Family Participation", icon: "heroicons:star" },
  ];

  let newActivity = {
    title: "",
    type: "entertainment",
    description: "",
    date: "",
    duration: "",
    participants: [],
    location: "",
    cost: 0,
    enjoyment_rating: 5,
    photos: [],
    memories: "",
    repeat: false,
    skills_learned: [],
  };

  let newEvent = {
    title: "",
    type: "cultural",
    description: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    entry_fee: 0,
    registration_required: false,
    family_members_attending: [],
    contribution: "",
    role: "attendee",
    significance: "",
    learning_outcomes: "",
  };

  const leisureTypes = [
    { id: "entertainment", label: "Entertainment", icon: "heroicons:tv", color: "text-purple-500" },
    { id: "sports", label: "Sports & Games", icon: "heroicons:trophy", color: "text-yellow-500" },
    { id: "arts", label: "Arts & Crafts", icon: "heroicons:paint-brush", color: "text-pink-500" },
    { id: "music", label: "Music & Dance", icon: "heroicons:musical-note", color: "text-blue-500" },
    { id: "reading", label: "Reading & Learning", icon: "heroicons:book-open", color: "text-green-500" },
    { id: "cooking", label: "Cooking & Food", icon: "heroicons:cake", color: "text-orange-500" },
    { id: "gardening", label: "Gardening", icon: "heroicons:beaker", color: "text-green-600" },
    { id: "photography", label: "Photography", icon: "heroicons:camera", color: "text-gray-500" },
    { id: "travel", label: "Day Trips", icon: "heroicons:map", color: "text-teal-500" },
    { id: "social", label: "Social Activities", icon: "heroicons:chat-bubble-left-ellipsis", color: "text-indigo-500" },
  ];

  const eventTypes = [
    { id: "cultural", label: "Cultural Events", icon: "heroicons:musical-note", color: "text-orange-500" },
    { id: "religious", label: "Religious Functions", icon: "heroicons:building-library", color: "text-yellow-600" },
    { id: "educational", label: "Educational Programs", icon: "heroicons:academic-cap", color: "text-blue-500" },
    { id: "social", label: "Social Gatherings", icon: "heroicons:users", color: "text-green-500" },
    { id: "charity", label: "Charity Events", icon: "heroicons:heart", color: "text-red-500" },
    { id: "workshop", label: "Workshops", icon: "heroicons:wrench-screwdriver", color: "text-purple-500" },
    { id: "festival", label: "Festival Celebrations", icon: "heroicons:sparkles", color: "text-pink-500" },
    { id: "competition", label: "Competitions", icon: "heroicons:trophy", color: "text-yellow-500" },
  ];

  let culturalPrograms = [
    {
      name: "Bharatanatyam Recital",
      date: "2024-02-15",
      venue: "Kalakshetra, Chennai",
      type: "Classical Dance",
      family_involvement: "Priya performing, family supporting",
      cultural_value: "Preserving traditional dance forms",
      learning: "Appreciation for classical arts and dedication required",
      photos: 25,
      significance: "First solo performance by family member",
    },
    {
      name: "Carnatic Music Concert",
      date: "2024-03-10",
      venue: "Music Academy, Chennai",
      type: "Classical Music",
      family_involvement: "Attending as audience, children learning ragas",
      cultural_value: "Understanding musical traditions",
      learning: "Different ragas convey different emotions",
      photos: 12,
      significance: "Inspiring children to learn music",
    },
    {
      name: "Tamil Literature Festival",
      date: "2024-04-05",
      venue: "Tamil University, Thanjavur",
      type: "Literary Event",
      family_involvement: "Participating in poetry recitation",
      cultural_value: "Preserving Tamil language and literature",
      learning: "Rich heritage of Tamil poetry and prose",
      photos: 18,
      significance: "Connecting with literary community",
    },
    {
      name: "Handicrafts Exhibition",
      date: "2024-05-20",
      venue: "Poompuhar Handicrafts Centre",
      type: "Art & Craft",
      family_involvement: "Learning traditional crafts, purchasing items",
      cultural_value: "Supporting traditional artisans",
      learning: "Appreciation for handmade crafts and techniques",
      photos: 30,
      significance: "Supporting local artisans and crafts",
    },
  ];

  let upcomingEvents = [
    {
      event: "Navarathri Celebrations",
      date: "2024-10-03",
      type: "Religious Festival",
      location: "Local Temple & Community Hall",
      duration: "9 days",
      family_role: "Organizing cultural programs",
      preparation: ["Arrange classical dance performances", "Coordinate with musicians", "Prepare traditional decorations", "Organize prasadam distribution"],
      cultural_significance: "Celebrating divine feminine energy",
      expected_learning: "Event management and cultural coordination",
    },
    {
      event: "Children's Day Cultural Program",
      date: "2024-11-14",
      type: "Educational & Cultural",
      location: "Community Center",
      duration: "1 day",
      family_role: "Children participating in performances",
      preparation: ["Practice Tamil poetry recitation", "Prepare traditional costumes", "Learn about Pandit Nehru", "Practice group singing"],
      cultural_significance: "Celebrating childhood and education",
      expected_learning: "Public speaking and performance skills",
    },
    {
      event: "Annual Tamil New Year Celebration",
      date: "2024-04-14",
      type: "Cultural Festival",
      location: "Tamil Association Hall",
      duration: "1 day",
      family_role: "Traditional food preparation and serving",
      preparation: ["Prepare traditional Mangai Pachadi", "Arrange kolam competition", "Coordinate traditional games", "Organize cultural performances"],
      cultural_significance: "Welcoming the Tamil New Year",
      expected_learning: "Traditional cooking and festival organization",
    },
  ];

  let familyParticipation = {
    total_events_this_year: 24,
    cultural_programs: 8,
    religious_functions: 12,
    educational_workshops: 4,
    active_memberships: ["Tamil Sangam", "Bhajan Group", "Temple Committee", "Cultural Association"],
    volunteer_hours: 96,
    skills_developed: ["Event organization", "Public speaking", "Traditional cooking", "Classical music basics", "Dance choreography", "Community leadership"],
    recognition_received: ["Best Family Participation Award - Tamil Sangam", "Cultural Preservation Certificate", "Community Service Recognition"],
  };

  async function loadLeisureActivities() {
    try {
      leisureActivities = (await db.leisureActivities?.toArray()) || [];
    } catch (error) {
      console.error("Error loading leisure activities:", error);
      leisureActivities = [];
    }
  }

  async function loadCommunityEvents() {
    try {
      communityEvents = (await db.communityEvents?.toArray()) || [];
    } catch (error) {
      console.error("Error loading community events:", error);
      communityEvents = [];
    }
  }

  async function addLeisureActivity() {
    if (!newActivity.title.trim() || !newActivity.type) return;

    try {
      const activity = {
        ...newActivity,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      await db.leisureActivities?.add(activity);
      leisureActivities = [...leisureActivities, activity];

      // Reset form
      newActivity = {
        title: "",
        type: "entertainment",
        description: "",
        date: "",
        duration: "",
        participants: [],
        location: "",
        cost: 0,
        enjoyment_rating: 5,
        photos: [],
        memories: "",
        repeat: false,
        skills_learned: [],
      };
      showAddActivity = false;
    } catch (error) {
      console.error("Error adding leisure activity:", error);
    }
  }

  async function addCommunityEvent() {
    if (!newEvent.title.trim() || !newEvent.type) return;

    try {
      const event = {
        ...newEvent,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "upcoming",
      };

      await db.communityEvents?.add(event);
      communityEvents = [...communityEvents, event];

      // Reset form
      newEvent = {
        title: "",
        type: "cultural",
        description: "",
        organizer: "",
        date: "",
        time: "",
        location: "",
        entry_fee: 0,
        registration_required: false,
        family_members_attending: [],
        contribution: "",
        role: "attendee",
        significance: "",
        learning_outcomes: "",
      };
      showAddEvent = false;
    } catch (error) {
      console.error("Error adding community event:", error);
    }
  }

  function getActivityIcon(type) {
    return leisureTypes.find((t) => t.id === type)?.icon || "heroicons:face-smile";
  }

  function getActivityColor(type) {
    return leisureTypes.find((t) => t.id === type)?.color || "text-gray-500";
  }

  function getEventIcon(type) {
    return eventTypes.find((t) => t.id === type)?.icon || "heroicons:calendar-days";
  }

  function getEventColor(type) {
    return eventTypes.find((t) => t.id === type)?.color || "text-gray-500";
  }

  function getStarRating(rating) {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rating ? "⭐" : "☆"))
      .join("");
  }

  onMount(() => {
    document.title = "Leisure & Community Events - Family App";
    loadLeisureActivities();
    loadCommunityEvents();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <Icon icon="heroicons:face-smile" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Leisure & Community Events</h1>
            <p class="text-gray-600 dark:text-gray-300">मनोरंजन सामुदायिक सेवा | Entertainment and community service</p>
          </div>
        </div>
      </div>

      <!-- Community Wisdom -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:heart" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">सामुदायिक जीवन | Community Life</h3>
            <p class="text-white/90">"व्यायामात् लभते स्वास्थ्यं दीर्घायुष्यं बलं सुखं | Through recreation and community service, we find joy, build relationships, and contribute to society's well-being."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "பொழுதுபோக்கும் சமூகசேवையும் மகிழ்ச்சியும் நல்ல உறவுகளும் தருகின்றன"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-purple-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "leisure"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">😊 Family Leisure Activities</h3>
          <button class="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors" on:click={() => (showAddActivity = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Activity</span>
          </button>
        </div>

        {#if showAddActivity}
          <div class="mb-6 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-4">Record Leisure Activity</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Title</label>
                <input type="text" bind:value={newActivity.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="What did you do for fun?" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Type</label>
                <select bind:value={newActivity.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each leisureTypes as type}
                    <option value={type.id}>{type.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="date" bind:value={newActivity.date} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                <input type="text" bind:value={newActivity.duration} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="2 hours, All day, etc." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input type="text" bind:value={newActivity.location} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Where did this happen?" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cost (₹)</label>
                <input type="number" bind:value={newActivity.cost} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea bind:value={newActivity.description} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe the activity in detail..."></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Memories & Highlights</label>
                <textarea bind:value={newActivity.memories} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Share your favorite moments and memories..."></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enjoyment Rating (1-5 stars)</label>
                <input type="range" min="1" max="5" bind:value={newActivity.enjoyment_rating} class="w-full" />
                <div class="text-center mt-2">
                  <span class="text-2xl">{getStarRating(newActivity.enjoyment_rating)}</span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="repeat" bind:checked={newActivity.repeat} class="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50" />
                <label for="repeat" class="text-sm font-medium text-gray-700 dark:text-gray-300"> Would like to repeat this activity </label>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors" on:click={addLeisureActivity}> Save Activity </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddActivity = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Activities List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each leisureActivities as activity}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon={getActivityIcon(activity.type)} class="w-6 h-6 {getActivityColor(activity.type)}" />
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{activity.title}</h4>
                    <p class="text-sm text-purple-600 dark:text-purple-400">
                      {leisureTypes.find((t) => t.id === activity.type)?.label}
                    </p>
                  </div>
                </div>
                <span class="text-lg">{getStarRating(activity.enjoyment_rating)}</span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{activity.description}</p>

              <div class="space-y-2 mb-4">
                {#if activity.location}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Location:</span>
                    <span class="font-medium">{activity.location}</span>
                  </div>
                {/if}
                {#if activity.duration}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Duration:</span>
                    <span class="font-medium">{activity.duration}</span>
                  </div>
                {/if}
                {#if activity.cost > 0}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Cost:</span>
                    <span class="font-medium text-green-600 dark:text-green-400">₹{activity.cost.toLocaleString()}</span>
                  </div>
                {/if}
              </div>

              {#if activity.memories}
                <div class="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p class="text-xs text-purple-800 dark:text-purple-200 italic">"{activity.memories}"</p>
                </div>
              {/if}

              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                {#if activity.repeat}
                  <span class="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full"> Want to repeat </span>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        {#if leisureActivities.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:face-smile" class="w-16 h-16 mx-auto text-purple-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Leisure Activities Recorded</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Start documenting your family's fun times and hobbies</p>
            <button class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors" on:click={() => (showAddActivity = true)}> Record First Activity </button>
          </div>
        {/if}
      {:else if currentTab === "community"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">👥 Community Events</h3>
          <button class="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors" on:click={() => (showAddEvent = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>

        {#if showAddEvent}
          <div class="mb-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-4">Record Community Event</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                <input type="text" bind:value={newEvent.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Name of the event..." />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Type</label>
                <select bind:value={newEvent.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each eventTypes as type}
                    <option value={type.id}>{type.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organizer</label>
                <input type="text" bind:value={newEvent.organizer} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Who is organizing this event?" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="date" bind:value={newEvent.date} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                <input type="time" bind:value={newEvent.time} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input type="text" bind:value={newEvent.location} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Where is this happening?" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Entry Fee (₹)</label>
                <input type="number" bind:value={newEvent.entry_fee} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Family Role</label>
                <select bind:value={newEvent.role} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="attendee">Attendee</option>
                  <option value="participant">Active Participant</option>
                  <option value="organizer">Organizer</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="performer">Performer</option>
                  <option value="sponsor">Sponsor</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Description</label>
                <textarea bind:value={newEvent.description} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="What is this event about?"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Family Contribution</label>
                <textarea bind:value={newEvent.contribution} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="How is your family contributing to this event?"></textarea>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cultural/Social Significance</label>
                <textarea bind:value={newEvent.significance} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Why is this event important for the community?"></textarea>
              </div>
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="registration" bind:checked={newEvent.registration_required} class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                <label for="registration" class="text-sm font-medium text-gray-700 dark:text-gray-300"> Registration Required </label>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors" on:click={addCommunityEvent}> Save Event </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddEvent = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Events List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each communityEvents as event}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon={getEventIcon(event.type)} class="w-6 h-6 {getEventColor(event.type)}" />
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{event.title}</h4>
                    <p class="text-sm text-green-600 dark:text-green-400">
                      {eventTypes.find((t) => t.id === event.type)?.label}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">by {event.organizer}</p>
                  </div>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {event.role}
                </span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>

              <div class="space-y-2 mb-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">Date & Time:</span>
                  <span class="font-medium">{new Date(event.date).toLocaleDateString()} {event.time || ""}</span>
                </div>
                {#if event.location}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Location:</span>
                    <span class="font-medium">{event.location}</span>
                  </div>
                {/if}
                {#if event.entry_fee > 0}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Entry Fee:</span>
                    <span class="font-medium text-orange-600 dark:text-orange-400">₹{event.entry_fee.toLocaleString()}</span>
                  </div>
                {/if}
              </div>

              {#if event.contribution}
                <div class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 class="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">Our Contribution:</h5>
                  <p class="text-xs text-green-700 dark:text-green-300">{event.contribution}</p>
                </div>
              {/if}

              {#if event.significance}
                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h5 class="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-1">Significance:</h5>
                  <p class="text-xs text-blue-700 dark:text-blue-300">{event.significance}</p>
                </div>
              {/if}
            </div>
          {/each}
        </div>

        {#if communityEvents.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:users" class="w-16 h-16 mx-auto text-green-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Community Events Recorded</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Start tracking your family's community involvement</p>
            <button class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors" on:click={() => (showAddEvent = true)}> Record First Event </button>
          </div>
        {/if}
      {:else if currentTab === "cultural"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🎭 Cultural Programs</h3>
          <div class="space-y-6">
            {#each culturalPrograms as program}
              <div class="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-orange-900 dark:text-orange-100">{program.name}</h4>
                    <p class="text-orange-700 dark:text-orange-300">{program.type} • {program.venue}</p>
                    <p class="text-orange-600 dark:text-orange-400 text-sm">{new Date(program.date).toLocaleDateString()}</p>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                      <Icon icon="heroicons:photo" class="w-4 h-4" />
                      <span class="text-sm">{program.photos} photos</span>
                    </div>
                    <span class="px-2 py-1 text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full mt-2 inline-block">
                      {program.significance}
                    </span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <h5 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Family Involvement:</h5>
                    <p class="text-orange-800 dark:text-orange-200 text-sm">{program.family_involvement}</p>
                  </div>

                  <div class="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <h5 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Cultural Value:</h5>
                    <p class="text-yellow-800 dark:text-yellow-200 text-sm">{program.cultural_value}</p>
                  </div>
                </div>

                <div class="mt-4 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <h5 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Learning & Growth:</h5>
                  <p class="text-amber-800 dark:text-amber-200 text-sm">{program.learning}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "calendar"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">📅 Upcoming Events Calendar</h3>
          <div class="space-y-6">
            {#each upcomingEvents as event}
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-blue-900 dark:text-blue-100">{event.event}</h4>
                    <p class="text-blue-700 dark:text-blue-300">{event.type} • {event.location}</p>
                    <p class="text-blue-600 dark:text-blue-400 text-sm">{new Date(event.date).toLocaleDateString()} • {event.duration}</p>
                  </div>
                  <span class="px-3 py-1 text-sm font-medium bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                    {event.family_role}
                  </span>
                </div>

                <div class="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Cultural Significance:</h5>
                  <p class="text-blue-800 dark:text-blue-200 text-sm">{event.cultural_significance}</p>
                </div>

                <div class="mb-4 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <h5 class="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Preparation Needed:</h5>
                  <div class="space-y-1">
                    {#each event.preparation as prep}
                      <div class="flex items-center space-x-2">
                        <Icon icon="heroicons:check-circle" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span class="text-sm text-indigo-800 dark:text-indigo-200">{prep}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                <div class="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Expected Learning:</h5>
                  <p class="text-purple-800 dark:text-purple-200 text-sm">{event.expected_learning}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "participation"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">⭐ Family Participation Overview</h3>

          <!-- Statistics -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Total Events</h4>
                  <p class="text-3xl font-bold">{familyParticipation.total_events_this_year}</p>
                  <p class="text-blue-200 text-sm">This year</p>
                </div>
                <Icon icon="heroicons:calendar-days" class="w-12 h-12 text-blue-200" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Cultural Programs</h4>
                  <p class="text-3xl font-bold">{familyParticipation.cultural_programs}</p>
                  <p class="text-orange-200 text-sm">Participated in</p>
                </div>
                <Icon icon="heroicons:musical-note" class="w-12 h-12 text-orange-200" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Volunteer Hours</h4>
                  <p class="text-3xl font-bold">{familyParticipation.volunteer_hours}</p>
                  <p class="text-green-200 text-sm">Community service</p>
                </div>
                <Icon icon="heroicons:heart" class="w-12 h-12 text-green-200" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-lg font-semibold mb-2">Skills Developed</h4>
                  <p class="text-3xl font-bold">{familyParticipation.skills_developed.length}</p>
                  <p class="text-purple-200 text-sm">New abilities</p>
                </div>
                <Icon icon="heroicons:star" class="w-12 h-12 text-purple-200" />
              </div>
            </div>
          </div>

          <!-- Detailed Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Active Memberships</h4>
              <div class="space-y-3">
                {#each familyParticipation.active_memberships as membership}
                  <div class="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Icon icon="heroicons:building-office" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span class="font-medium text-blue-800 dark:text-blue-200">{membership}</span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Skills Developed</h4>
              <div class="space-y-2">
                {#each familyParticipation.skills_developed as skill}
                  <div class="flex items-center space-x-2">
                    <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md md:col-span-2">
              <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recognition & Awards</h4>
              <div class="space-y-3">
                {#each familyParticipation.recognition_received as recognition}
                  <div class="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Icon icon="heroicons:trophy" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span class="font-medium text-yellow-800 dark:text-yellow-200">{recognition}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- Community Impact -->
          <div class="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
            <h4 class="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">
              <Icon icon="heroicons:globe-asia-australia" class="w-5 h-5 mr-2" />
              सामुदायिक प्रभाव | Community Impact
            </h4>
            <p class="text-green-700 dark:text-green-300 mb-4">"सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् | May all see auspiciousness, may none partake in suffering. Through active community participation, our family contributes to creating a harmonious and supportive society where everyone can thrive."</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center p-4 bg-green-200 dark:bg-green-800 rounded-lg">
                <h5 class="font-semibold text-green-900 dark:text-green-100">Cultural Preservation</h5>
                <p class="text-sm text-green-800 dark:text-green-200 mt-2">Maintaining traditions for future generations</p>
              </div>
              <div class="text-center p-4 bg-blue-200 dark:bg-blue-800 rounded-lg">
                <h5 class="font-semibold text-blue-900 dark:text-blue-100">Social Harmony</h5>
                <p class="text-sm text-blue-800 dark:text-blue-200 mt-2">Building bridges between communities</p>
              </div>
              <div class="text-center p-4 bg-purple-200 dark:bg-purple-800 rounded-lg">
                <h5 class="font-semibold text-purple-900 dark:text-purple-100">Knowledge Sharing</h5>
                <p class="text-sm text-purple-800 dark:text-purple-200 mt-2">Teaching and learning from others</p>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
