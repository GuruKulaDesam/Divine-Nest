<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "stories";
  let stories = [];
  let audioRecordings = [];
  let showAddStory = false;
  let showRecordingModal = false;
  let isRecording = false;
  let recordingTimer = 0;
  let recordingInterval = null;

  const tabs = [
    { id: "stories", label: "Family Stories", icon: "heroicons:book-open" },
    { id: "recordings", label: "Audio Stories", icon: "heroicons:microphone" },
    { id: "photos", label: "Photo Stories", icon: "heroicons:photo" },
    { id: "timeline", label: "Family Timeline", icon: "heroicons:calendar-days" },
    { id: "traditions", label: "Traditions", icon: "heroicons:gift" },
  ];

  let newStory = {
    title: "",
    storyteller: "",
    content: "",
    category: "childhood",
    tags: [],
    date: "",
    location: "",
    participants: [],
  };

  const storyCategories = [
    { id: "childhood", label: "Childhood Memories", icon: "heroicons:face-smile", color: "text-yellow-500" },
    { id: "wedding", label: "Wedding Stories", icon: "heroicons:heart", color: "text-red-500" },
    { id: "festivals", label: "Festival Celebrations", icon: "heroicons:gift", color: "text-purple-500" },
    { id: "travel", label: "Travel Adventures", icon: "heroicons:map", color: "text-blue-500" },
    { id: "wisdom", label: "Life Lessons", icon: "heroicons:light-bulb", color: "text-green-500" },
    { id: "ancestors", label: "Ancestor Stories", icon: "heroicons:users", color: "text-indigo-500" },
    { id: "traditions", label: "Family Traditions", icon: "heroicons:star", color: "text-orange-500" },
    { id: "achievements", label: "Achievements", icon: "heroicons:trophy", color: "text-cyan-500" },
  ];

  let familyTimeline = [
    {
      year: 1950,
      event: "Great-grandfather's Migration",
      description: "Moved from village to city for better opportunities",
      storyteller: "Grandfather",
      importance: "high",
      photos: [],
      stories: ["The journey on bullock cart", "First day in the city"],
    },
    {
      year: 1965,
      event: "Parents' Wedding",
      description: "Traditional Tamil wedding with 500 guests",
      storyteller: "Grandmother",
      importance: "high",
      photos: [],
      stories: ["The seven-day celebration", "Meeting for the first time"],
    },
    {
      year: 1970,
      event: "First Child Born",
      description: "Elder uncle's birth during Diwali festival",
      storyteller: "Great-grandmother",
      importance: "medium",
      photos: [],
      stories: ["Born during fireworks", "The naming ceremony"],
    },
    {
      year: 1985,
      event: "New House Purchase",
      description: "Family's first own home with garden",
      storyteller: "Father",
      importance: "medium",
      photos: [],
      stories: ["Gruhapravesh ceremony", "Planting the mango tree"],
    },
    {
      year: 2000,
      event: "First Computer",
      description: "Family's entry into the digital age",
      storyteller: "Elder brother",
      importance: "low",
      photos: [],
      stories: ["Learning to type", "First email sent"],
    },
  ];

  let traditions = [
    {
      id: 1,
      name: "Gokulashtami Celebration",
      description: "Annual Krishna Janmashtami with elaborate decorations and community participation",
      frequency: "Annual",
      season: "Monsoon",
      significance: "High",
      participants: "Entire extended family",
      specialItems: ["Makhan (butter)", "Colorful decorations", "Traditional sweets"],
      stories: ["The human pyramid tradition", "Grandmother's special preparation"],
      origin: "Started by great-grandmother in 1960",
      currentStatus: "Active",
    },
    {
      id: 2,
      name: "Sunday Family Breakfast",
      description: "Weekly tradition of elaborate South Indian breakfast with all family members",
      frequency: "Weekly",
      season: "Year-round",
      significance: "Medium",
      participants: "Immediate family",
      specialItems: ["Dosa varieties", "Fresh coconut chutney", "Filter coffee"],
      stories: ["Father's dosa-making expertise", "Children's helping duties"],
      origin: "Started when parents got married",
      currentStatus: "Active",
    },
    {
      id: 3,
      name: "Ancestral Property Visit",
      description: "Annual pilgrimage to ancestral village and family temple",
      frequency: "Annual",
      season: "Winter",
      significance: "High",
      participants: "Three generations",
      specialItems: ["Village temple offerings", "Traditional clay pots", "Local delicacies"],
      stories: ["The old banyan tree", "Temple renovation project"],
      origin: "Maintained for over 100 years",
      currentStatus: "Active",
    },
  ];

  let wisdomQuotes = [
    {
      tamil: "அறிவே ஆற்றல்",
      sanskrit: "विद्या बलम्",
      english: "Knowledge is Power",
      storyteller: "Great-grandfather",
      context: "Encouraging education in the family",
    },
    {
      tamil: "காலம் கற்பிக்கும்",
      sanskrit: "कालः शिक्षकः",
      english: "Time is the teacher",
      storyteller: "Grandmother",
      context: "During difficult times in life",
    },
    {
      tamil: "உண்மை வெல்லும்",
      sanskrit: "सत्यमेव जयते",
      english: "Truth alone triumphs",
      storyteller: "Father",
      context: "Teaching moral values to children",
    },
  ];

  async function loadStories() {
    try {
      stories = (await db.familyStories?.toArray()) || [];
    } catch (error) {
      console.error("Error loading stories:", error);
      stories = [];
    }
  }

  async function addStory() {
    if (!newStory.title.trim() || !newStory.content.trim()) return;

    try {
      const story = {
        ...newStory,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        tags: newStory.tags.filter((tag) => tag.trim() !== ""),
      };

      await db.familyStories?.add(story);
      stories = [...stories, story];

      // Reset form
      newStory = {
        title: "",
        storyteller: "",
        content: "",
        category: "childhood",
        tags: [],
        date: "",
        location: "",
        participants: [],
      };
      showAddStory = false;
    } catch (error) {
      console.error("Error adding story:", error);
    }
  }

  function startRecording() {
    if (!isRecording) {
      isRecording = true;
      recordingTimer = 0;
      recordingInterval = setInterval(() => {
        recordingTimer++;
      }, 1000);
    }
  }

  function stopRecording() {
    if (isRecording) {
      isRecording = false;
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
      // Here you would save the recording
      showRecordingModal = false;
      recordingTimer = 0;
    }
  }

  function formatRecordingTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function getCategoryIcon(categoryId) {
    return storyCategories.find((cat) => cat.id === categoryId)?.icon || "heroicons:book-open";
  }

  function getCategoryColor(categoryId) {
    return storyCategories.find((cat) => cat.id === categoryId)?.color || "text-gray-500";
  }

  function getImportanceColor(importance) {
    switch (importance) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
      case "low":
        return "text-green-500 bg-green-100 dark:bg-green-900/20";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
    }
  }

  onMount(() => {
    document.title = "Family Stories - Family App";
    loadStories();

    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl text-white">
            <Icon icon="heroicons:book-open" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Family Stories</h1>
            <p class="text-gray-600 dark:text-gray-300">पुराणमित्येव न साधु सर्वम् | Not all that is old is good</p>
          </div>
        </div>
      </div>

      <!-- Family Wisdom Quote -->
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:chat-bubble-left-right" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">कथा कहानी | Stories & Tales</h3>
            <p class="text-white/90">"Stories connect generations, preserve wisdom, and strengthen the bonds that make us family."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "கதைகள் தலைமுறைகளை இணைக்கின்றன"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-amber-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-amber-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-amber-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "stories"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">📖 Family Story Collection</h3>
          <button class="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors" on:click={() => (showAddStory = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Story</span>
          </button>
        </div>

        {#if showAddStory}
          <div class="mb-6 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <h4 class="font-semibold text-amber-800 dark:text-amber-200 mb-4">Share a Family Story</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="story-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Story Title</label>
                <input id="story-title" type="text" bind:value={newStory.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Give your story a memorable title" />
              </div>
              <div>
                <label for="story-storyteller" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Storyteller</label>
                <input id="story-storyteller" type="text" bind:value={newStory.storyteller} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Who is sharing this story?" />
              </div>
              <div>
                <label for="story-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select id="story-category" bind:value={newStory.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each storyCategories as category}
                    <option value={category.id}>{category.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="story-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date/Period</label>
                <input id="story-date" type="text" bind:value={newStory.date} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="When did this happen? (e.g., 1985 or 'During my childhood')" />
              </div>
              <div>
                <label for="story-location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <input id="story-location" type="text" bind:value={newStory.location} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Where did this story take place?" />
              </div>
              <div>
                <label for="story-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                <input id="story-tags" type="text" value={newStory.tags.join(", ")} on:input={(e) => (newStory.tags = e.target.value.split(",").map((tag) => tag.trim()))} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Tags to help find this story later" />
              </div>
              <div class="md:col-span-2">
                <label for="story-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Story Content</label>
                <textarea id="story-content" bind:value={newStory.content} rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Tell your story in detail. What happened? How did it feel? What did you learn?"></textarea>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors" on:click={addStory}> Save Story </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddStory = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Stories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each stories as story}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon={getCategoryIcon(story.category)} class="w-6 h-6 {getCategoryColor(story.category)}" />
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{story.title}</h4>
                    <p class="text-sm text-amber-600 dark:text-amber-400">by {story.storyteller}</p>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{story.content}</p>

              <div class="space-y-2 mb-4">
                {#if story.date}
                  <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Icon icon="heroicons:calendar" class="w-3 h-3" />
                    <span>{story.date}</span>
                  </div>
                {/if}
                {#if story.location}
                  <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Icon icon="heroicons:map-pin" class="w-3 h-3" />
                    <span>{story.location}</span>
                  </div>
                {/if}
              </div>

              {#if story.tags && story.tags.length > 0}
                <div class="flex flex-wrap gap-1 mb-4">
                  {#each story.tags as tag}
                    <span class="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded">
                      #{tag}
                    </span>
                  {/each}
                </div>
              {/if}

              <div class="flex items-center justify-between">
                <button class="text-amber-500 hover:text-amber-600 transition-colors text-sm font-medium"> Read Full Story </button>
                <span class="text-xs text-gray-400">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          {/each}
        </div>

        {#if stories.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:book-open" class="w-16 h-16 mx-auto text-amber-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Stories Yet</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Start preserving your family's precious memories</p>
            <button class="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors" on:click={() => (showAddStory = true)}> Share Your First Story </button>
          </div>
        {/if}
      {:else if currentTab === "recordings"}
        <div>
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">🎤 Audio Story Collection</h3>
            <button class="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors" on:click={() => (showRecordingModal = true)}>
              <Icon icon="heroicons:microphone" class="w-4 h-4" />
              <span>Record Story</span>
            </button>
          </div>

          <div class="text-center py-12">
            <Icon icon="heroicons:microphone" class="w-16 h-16 mx-auto text-red-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Preserve Voices & Stories</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Record family members telling their stories in their own voice</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div class="p-6 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-xl">
                <Icon icon="heroicons:microphone" class="w-12 h-12 mx-auto text-red-600 dark:text-red-400 mb-4" />
                <h4 class="font-semibold text-red-800 dark:text-red-200 mb-2">Elder's Stories</h4>
                <p class="text-sm text-red-600 dark:text-red-300">Capture wisdom from grandparents</p>
              </div>
              <div class="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl">
                <Icon icon="heroicons:musical-note" class="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Songs & Chants</h4>
                <p class="text-sm text-blue-600 dark:text-blue-300">Traditional songs and mantras</p>
              </div>
              <div class="p-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl">
                <Icon icon="heroicons:language" class="w-12 h-12 mx-auto text-green-600 dark:text-green-400 mb-4" />
                <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Regional Dialects</h4>
                <p class="text-sm text-green-600 dark:text-green-300">Preserve local language variations</p>
              </div>
            </div>
          </div>
        </div>
      {:else if currentTab === "photos"}
        <div class="text-center py-12">
          <Icon icon="heroicons:photo" class="w-16 h-16 mx-auto text-amber-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Photo Stories</h3>
          <p class="text-gray-500 dark:text-gray-400">Visual storytelling through family photographs</p>

          <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {#each ["Wedding Albums", "Festival Photos", "Travel Pictures", "Childhood Memories"] as album}
              <div class="p-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-xl">
                <Icon icon="heroicons:folder" class="w-8 h-8 mx-auto text-amber-600 dark:text-amber-400 mb-2" />
                <h4 class="font-medium text-sm text-amber-800 dark:text-amber-200">{album}</h4>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "timeline"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">📅 Family Timeline</h3>
          <div class="space-y-6">
            {#each familyTimeline as event}
              <div class="relative pl-8 pb-6">
                <!-- Timeline line -->
                <div class="absolute left-3 top-2 bottom-0 w-0.5 bg-amber-300 dark:bg-amber-600"></div>
                <!-- Timeline dot -->
                <div class="absolute left-1 top-2 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-gray-800"></div>

                <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h4 class="text-xl font-bold text-amber-900 dark:text-amber-100">{event.year}</h4>
                      <h5 class="text-lg font-semibold text-amber-800 dark:text-amber-200">{event.event}</h5>
                      <p class="text-sm text-amber-600 dark:text-amber-400">Storyteller: {event.storyteller}</p>
                    </div>
                    <span class="px-2 py-1 text-xs font-medium rounded-full {getImportanceColor(event.importance)}">
                      {event.importance.toUpperCase()}
                    </span>
                  </div>

                  <p class="text-amber-800 dark:text-amber-200 mb-4">{event.description}</p>

                  {#if event.stories && event.stories.length > 0}
                    <div>
                      <h6 class="font-semibold text-amber-900 dark:text-amber-100 mb-2">Related Stories:</h6>
                      <div class="flex flex-wrap gap-2">
                        {#each event.stories as storyTitle}
                          <span class="px-2 py-1 text-xs bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded">
                            {storyTitle}
                          </span>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "traditions"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🎁 Family Traditions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each traditions as tradition}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="font-bold text-orange-900 dark:text-orange-100 text-lg">{tradition.name}</h4>
                    <p class="text-orange-700 dark:text-orange-300 text-sm">{tradition.frequency} • {tradition.season}</p>
                  </div>
                  <span class="px-2 py-1 text-xs font-medium bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full">
                    {tradition.currentStatus}
                  </span>
                </div>

                <p class="text-orange-800 dark:text-orange-200 text-sm mb-4">{tradition.description}</p>

                <div class="space-y-3">
                  <div>
                    <h5 class="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">Special Items:</h5>
                    <div class="flex flex-wrap gap-1">
                      {#each tradition.specialItems as item}
                        <span class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded">
                          {item}
                        </span>
                      {/each}
                    </div>
                  </div>

                  <div>
                    <h5 class="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">Origin:</h5>
                    <p class="text-xs text-orange-700 dark:text-orange-300">{tradition.origin}</p>
                  </div>

                  <div>
                    <h5 class="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">Stories:</h5>
                    <div class="space-y-1">
                      {#each tradition.stories as story}
                        <div class="flex items-center space-x-2">
                          <Icon icon="heroicons:book-open" class="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          <span class="text-xs text-orange-700 dark:text-orange-300">{story}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Family Wisdom Section -->
          <div class="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
            <h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
              <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
              पारिवारिक ज्ञान | Family Wisdom
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {#each wisdomQuotes as quote}
                <div class="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p class="font-semibold text-indigo-800 dark:text-indigo-200 mb-1">{quote.tamil}</p>
                  <p class="text-sm text-indigo-700 dark:text-indigo-300 mb-1">{quote.sanskrit}</p>
                  <p class="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{quote.english}</p>
                  <p class="text-xs text-indigo-500 dark:text-indigo-500">— {quote.storyteller}</p>
                  <p class="text-xs text-indigo-400 dark:text-indigo-600 italic">{quote.context}</p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Recording Modal -->
{#if showRecordingModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
      <div class="text-center">
        <Icon icon="heroicons:microphone" class="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Record Family Story</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Capture precious memories in their own voice</p>

        {#if isRecording}
          <div class="mb-6">
            <div class="text-3xl font-bold text-red-500 mb-2">{formatRecordingTime(recordingTimer)}</div>
            <div class="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <Icon icon="heroicons:stop" class="w-8 h-8 text-white" />
            </div>
          </div>
          <button class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors" on:click={stopRecording}> Stop Recording </button>
        {:else}
          <button class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors mb-4" on:click={startRecording}> Start Recording </button>
        {/if}

        <div class="flex space-x-3 mt-4">
          <button
            class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            on:click={() => {
              showRecordingModal = false;
              if (isRecording) stopRecording();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
