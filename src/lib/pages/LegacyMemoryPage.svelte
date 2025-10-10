<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let currentTab = "heritage";
  let legacyItems = [];
  let showAddLegacy = false;

  const tabs = [
    { id: "heritage", label: "Family Heritage", icon: "heroicons:building-library" },
    { id: "ancestors", label: "Ancestor Profiles", icon: "heroicons:users" },
    { id: "heirlooms", label: "Heirlooms & Artifacts", icon: "heroicons:gift" },
    { id: "values", label: "Family Values", icon: "heroicons:heart" },
    { id: "tree", label: "Family Tree", icon: "heroicons:puzzle-piece" },
  ];

  let newLegacyItem = {
    title: "",
    type: "story",
    content: "",
    significance: "medium",
    keeper: "",
    dateOriginated: "",
    tags: [],
  };

  const legacyTypes = [
    { id: "story", label: "Family Story", icon: "heroicons:book-open", color: "text-blue-500" },
    { id: "recipe", label: "Traditional Recipe", icon: "heroicons:cake", color: "text-orange-500" },
    { id: "skill", label: "Family Skill", icon: "heroicons:wrench-screwdriver", color: "text-green-500" },
    { id: "wisdom", label: "Life Wisdom", icon: "heroicons:light-bulb", color: "text-yellow-500" },
    { id: "tradition", label: "Family Tradition", icon: "heroicons:star", color: "text-purple-500" },
    { id: "artifact", label: "Physical Heirloom", icon: "heroicons:gift", color: "text-red-500" },
  ];

  let ancestors = [
    {
      id: 1,
      name: "Smt. Kamakshi Devi",
      relationship: "Great-grandmother (Paternal)",
      birthYear: 1910,
      deathYear: 1995,
      birthPlace: "Thanjavur, Tamil Nadu",
      occupation: "Traditional Cook & Herbalist",
      specialties: ["Authentic Tamil cuisine", "Ayurvedic remedies", "Temple rituals"],
      keyContributions: ["Preserved 50+ traditional recipes", "Established family temple worship traditions", "Taught herbal medicine to daughters"],
      wisdomQuotes: [
        {
          tamil: "அன்பே சிவம்",
          english: "Love is God",
          context: "Her philosophy of treating everyone with love",
        },
      ],
      stories: ["The story of feeding 100 people during floods", "How she saved the family during the independence movement"],
      image: "/api/placeholder/150/150",
    },
    {
      id: 2,
      name: "Sri Venkatesh Iyer",
      relationship: "Great-grandfather (Paternal)",
      birthYear: 1905,
      deathYear: 1990,
      birthPlace: "Kumbakonam, Tamil Nadu",
      occupation: "Sanskrit Scholar & Astrologer",
      specialties: ["Vedic astrology", "Sanskrit literature", "Temple architecture"],
      keyContributions: ["Authored 3 books on Vedic astrology", "Designed family temple renovation", "Taught Sanskrit to 200+ students"],
      wisdomQuotes: [
        {
          sanskrit: "विद्या ददाति विनयम्",
          english: "Knowledge gives humility",
          context: "His emphasis on lifelong learning",
        },
      ],
      stories: ["Predicted family fortunes through Vedic astrology", "His midnight study sessions by oil lamp"],
      image: "/api/placeholder/150/150",
    },
    {
      id: 3,
      name: "Smt. Rukmani Amma",
      relationship: "Great-grandmother (Maternal)",
      birthYear: 1920,
      deathYear: 2000,
      birthPlace: "Madurai, Tamil Nadu",
      occupation: "Classical Musician & Teacher",
      specialties: ["Carnatic music", "Bharatanatyam", "Classical poetry"],
      keyContributions: ["Performed in Madras Music Season", "Taught music to 3 generations", "Preserved rare classical compositions"],
      wisdomQuotes: [
        {
          tamil: "இசையே இனிது",
          english: "Music is the sweetest",
          context: "Her belief in music as divine expression",
        },
      ],
      stories: ["Her performance for freedom fighters", "Teaching music during wartime"],
      image: "/api/placeholder/150/150",
    },
  ];

  let heirlooms = [
    {
      id: 1,
      name: "Great-grandmother's Silver Jewelry Box",
      type: "Jewelry & Accessories",
      age: "100+ years",
      origin: "Thanjavur, Tamil Nadu",
      currentKeeper: "Grandmother",
      significance: "High",
      description: "Intricately carved silver box used to store traditional jewelry and precious items",
      culturalValue: "Contains 5 generations of women's jewelry",
      condition: "Excellent",
      maintenanceNeeds: ["Regular silver polishing", "Dry storage"],
      stories: ["Saved during house fire in 1960", "Hidden during partition troubles"],
      image: "/api/placeholder/200/150",
    },
    {
      id: 2,
      name: "Ancestral Brass Lamps (Deepam)",
      type: "Religious Artifacts",
      age: "150+ years",
      origin: "Kumbakonam, Tamil Nadu",
      currentKeeper: "Uncle",
      significance: "High",
      description: "Set of 5 traditional brass oil lamps used in daily prayers and festivals",
      culturalValue: "Used in family temple for 6 generations",
      condition: "Good",
      maintenanceNeeds: ["Regular cleaning", "Oil residue removal"],
      stories: ["Never extinguished during family prayers", "Lit during all major family celebrations"],
      image: "/api/placeholder/200/150",
    },
    {
      id: 3,
      name: "Hand-written Recipe Collection",
      type: "Documents & Books",
      age: "80+ years",
      origin: "Family kitchen",
      currentKeeper: "Mother",
      significance: "High",
      description: "Collection of handwritten recipes in Tamil and Sanskrit",
      culturalValue: "Contains secret family recipes and cooking techniques",
      condition: "Fragile",
      maintenanceNeeds: ["Digitization", "Acid-free storage"],
      stories: ["Grandmother's wedding gift to daughter-in-law", "Saved recipes during rationing period"],
      image: "/api/placeholder/200/150",
    },
  ];

  let familyValues = [
    {
      id: 1,
      value: "शिक्षा सर्वोपरि | Education Above All",
      description: "Belief that education is the foundation of all progress and dignity",
      origin: "Great-grandfather's philosophy",
      howPracticed: ["Supporting education for all family members regardless of gender", "Creating family scholarship fund for needy students", "Regular study groups and knowledge sharing sessions"],
      examples: ["First family to send daughters to college in 1960s", "Started community library in village", "Every family gathering includes educational discussions"],
      modernRelevance: "Continues to guide career and life decisions",
      nextGeneration: "Teaching children multiple languages and encouraging curiosity",
    },
    {
      id: 2,
      value: "अतिथि देवो भव | Guest is God",
      description: "Treating every visitor with utmost respect and hospitality",
      origin: "Ancient Vedic tradition practiced by ancestors",
      howPracticed: ["Always keeping extra food prepared for unexpected guests", "Welcoming strangers and travelers in need", "Never sending anyone away without offering something"],
      examples: ["Fed stranded travelers during storms", "Hosted students from other states", "Open doors during festivals for community"],
      modernRelevance: "Maintains community bonds and social responsibility",
      nextGeneration: "Teaching children empathy and service to others",
    },
    {
      id: 3,
      value: "संस्कृति रक्षा | Cultural Preservation",
      description: "Actively preserving and passing on cultural traditions and knowledge",
      origin: "Responsibility felt by each generation",
      howPracticed: ["Teaching traditional arts, music, and dance", "Maintaining religious practices and festivals", "Speaking mother tongue at home"],
      examples: ["Children learning classical music", "Celebrating all traditional festivals", "Maintaining ancestral home and traditions"],
      modernRelevance: "Balancing modern life with cultural identity",
      nextGeneration: "Adapting traditions for contemporary relevance",
    },
  ];

  let familyTree = {
    generations: [
      {
        level: 1,
        title: "Great-Great Grandparents",
        members: [{ name: "Sri Krishnan Iyer", spouse: "Smt. Meenakshi Ammal", dates: "1880-1960" }],
      },
      {
        level: 2,
        title: "Great Grandparents",
        members: [
          { name: "Sri Venkatesh Iyer", spouse: "Smt. Kamakshi Devi", dates: "1905-1990" },
          { name: "Sri Raman Iyer", spouse: "Smt. Rukmani Amma", dates: "1920-2000" },
        ],
      },
      {
        level: 3,
        title: "Grandparents",
        members: [
          { name: "Sri Rajesh Iyer", spouse: "Smt. Lakshmi Devi", dates: "1940-present" },
          { name: "Sri Suresh Kumar", spouse: "Smt. Gayatri Devi", dates: "1945-present" },
        ],
      },
      {
        level: 4,
        title: "Parents",
        members: [{ name: "Sri Ramesh Iyer", spouse: "Smt. Priya Iyer", dates: "1970-present" }],
      },
      {
        level: 5,
        title: "Current Generation",
        members: [
          { name: "You", spouse: "", dates: "2000-present" },
          { name: "Sibling 1", spouse: "", dates: "2002-present" },
        ],
      },
    ],
  };

  async function loadLegacyItems() {
    try {
      legacyItems = (await db.legacyItems?.toArray()) || [];
    } catch (error) {
      console.error("Error loading legacy items:", error);
      legacyItems = [];
    }
  }

  async function addLegacyItem() {
    if (!newLegacyItem.title.trim() || !newLegacyItem.content.trim()) return;

    try {
      const item = {
        ...newLegacyItem,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        tags: newLegacyItem.tags.filter((tag) => tag.trim() !== ""),
      };

      await db.legacyItems?.add(item);
      legacyItems = [...legacyItems, item];

      // Reset form
      newLegacyItem = {
        title: "",
        type: "story",
        content: "",
        significance: "medium",
        keeper: "",
        dateOriginated: "",
        tags: [],
      };
      showAddLegacy = false;
    } catch (error) {
      console.error("Error adding legacy item:", error);
    }
  }

  function getTypeIcon(typeId) {
    return legacyTypes.find((type) => type.id === typeId)?.icon || "heroicons:document-text";
  }

  function getTypeColor(typeId) {
    return legacyTypes.find((type) => type.id === typeId)?.color || "text-gray-500";
  }

  function getSignificanceColor(significance) {
    switch (significance) {
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
    document.title = "Legacy & Memory - Family App";
    loadLegacyItems();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
            <Icon icon="heroicons:building-library" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Legacy & Memory</h1>
            <p class="text-gray-600 dark:text-gray-300">पूर्वजानां गुणान् स्मर | Remember the virtues of ancestors</p>
          </div>
        </div>
      </div>

      <!-- Legacy Wisdom -->
      <div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:sparkles" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">विरासत संरक्षण | Heritage Preservation</h3>
            <p class="text-white/90">"We are the keepers of stories, guardians of wisdom, and bridges between generations."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "நாம் கதைகளின் காப்பாளர்கள், ஞானத்தின் காவலர்கள்"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "heritage"}
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">🏛️ Family Heritage Collection</h3>
          <button class="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors" on:click={() => (showAddLegacy = true)}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Add Legacy Item</span>
          </button>
        </div>

        {#if showAddLegacy}
          <div class="mb-6 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <h4 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-4">Preserve Family Legacy</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="legacy-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input id="legacy-title" type="text" bind:value={newLegacyItem.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Name this legacy item" />
              </div>
              <div>
                <label for="legacy-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                <select id="legacy-type" bind:value={newLegacyItem.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {#each legacyTypes as type}
                    <option value={type.id}>{type.label}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="legacy-significance" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Significance</label>
                <select id="legacy-significance" bind:value={newLegacyItem.significance} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label for="legacy-keeper" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Keeper</label>
                <input id="legacy-keeper" type="text" bind:value={newLegacyItem.keeper} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Who currently maintains this?" />
              </div>
              <div>
                <label for="legacy-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date/Period Originated</label>
                <input id="legacy-date" type="text" bind:value={newLegacyItem.dateOriginated} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="When did this originate?" />
              </div>
              <div>
                <label for="legacy-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                <input id="legacy-tags" type="text" value={newLegacyItem.tags.join(", ")} on:input={(e) => (newLegacyItem.tags = e.target.value.split(",").map((tag) => tag.trim()))} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Tags for categorization" />
              </div>
              <div class="md:col-span-2">
                <label for="legacy-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content/Description</label>
                <textarea id="legacy-content" bind:value={newLegacyItem.content} rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe this legacy item in detail..."></textarea>
              </div>
            </div>
            <div class="flex space-x-3 mt-4">
              <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors" on:click={addLegacyItem}> Save Legacy Item </button>
              <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors" on:click={() => (showAddLegacy = false)}> Cancel </button>
            </div>
          </div>
        {/if}

        <!-- Legacy Items Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each legacyItems as item}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <Icon icon={getTypeIcon(item.type)} class="w-6 h-6 {getTypeColor(item.type)}" />
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p class="text-sm text-indigo-600 dark:text-indigo-400">by {item.keeper}</p>
                  </div>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full {getSignificanceColor(item.significance)}">
                  {item.significance.toUpperCase()}
                </span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{item.content}</p>

              {#if item.dateOriginated}
                <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <Icon icon="heroicons:calendar" class="w-3 h-3" />
                  <span>Originated: {item.dateOriginated}</span>
                </div>
              {/if}

              {#if item.tags && item.tags.length > 0}
                <div class="flex flex-wrap gap-1">
                  {#each item.tags as tag}
                    <span class="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                      #{tag}
                    </span>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>

        {#if legacyItems.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:building-library" class="w-16 h-16 mx-auto text-indigo-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Building Your Legacy</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Begin preserving family heritage for future generations</p>
            <button class="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors" on:click={() => (showAddLegacy = true)}> Add First Legacy Item </button>
          </div>
        {/if}
      {:else if currentTab === "ancestors"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">👥 Ancestor Profiles</h3>
          <div class="space-y-8">
            {#each ancestors as ancestor}
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                <div class="flex flex-col md:flex-row gap-6">
                  <!-- Profile Image -->
                  <div class="flex-shrink-0">
                    <div class="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {ancestor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>

                  <!-- Profile Details -->
                  <div class="flex-1">
                    <div class="mb-4">
                      <h4 class="text-2xl font-bold text-purple-900 dark:text-purple-100">{ancestor.name}</h4>
                      <p class="text-purple-700 dark:text-purple-300">{ancestor.relationship}</p>
                      <p class="text-purple-600 dark:text-purple-400 text-sm">
                        {ancestor.birthYear} - {ancestor.deathYear} • {ancestor.birthPlace}
                      </p>
                      <p class="text-purple-600 dark:text-purple-400 text-sm font-medium">{ancestor.occupation}</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Specialties -->
                      <div>
                        <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Specialties:</h5>
                        <div class="space-y-1">
                          {#each ancestor.specialties as specialty}
                            <div class="flex items-center space-x-2">
                              <Icon icon="heroicons:star" class="w-3 h-3 text-yellow-500" />
                              <span class="text-sm text-purple-700 dark:text-purple-300">{specialty}</span>
                            </div>
                          {/each}
                        </div>
                      </div>

                      <!-- Key Contributions -->
                      <div>
                        <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Key Contributions:</h5>
                        <div class="space-y-1">
                          {#each ancestor.keyContributions as contribution}
                            <div class="flex items-start space-x-2">
                              <Icon icon="heroicons:check-circle" class="w-3 h-3 text-green-500 mt-0.5" />
                              <span class="text-sm text-purple-700 dark:text-purple-300">{contribution}</span>
                            </div>
                          {/each}
                        </div>
                      </div>
                    </div>

                    <!-- Wisdom Quotes -->
                    {#if ancestor.wisdomQuotes && ancestor.wisdomQuotes.length > 0}
                      <div class="mt-4 p-4 bg-purple-100 dark:bg-purple-800 rounded-lg">
                        <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Wisdom:</h5>
                        {#each ancestor.wisdomQuotes as quote}
                          <blockquote class="italic text-purple-800 dark:text-purple-200 mb-1">
                            "{quote.english}"
                          </blockquote>
                          {#if quote.tamil}
                            <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">{quote.tamil}</p>
                          {/if}
                          {#if quote.sanskrit}
                            <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">{quote.sanskrit}</p>
                          {/if}
                          <p class="text-xs text-purple-500 dark:text-purple-500">Context: {quote.context}</p>
                        {/each}
                      </div>
                    {/if}

                    <!-- Stories -->
                    {#if ancestor.stories && ancestor.stories.length > 0}
                      <div class="mt-4">
                        <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Famous Stories:</h5>
                        <div class="space-y-1">
                          {#each ancestor.stories as story}
                            <div class="flex items-start space-x-2">
                              <Icon icon="heroicons:book-open" class="w-3 h-3 text-orange-500 mt-0.5" />
                              <span class="text-sm text-purple-700 dark:text-purple-300">{story}</span>
                            </div>
                          {/each}
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "heirlooms"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🎁 Family Heirlooms & Artifacts</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each heirlooms as heirloom}
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
                <!-- Heirloom Image Placeholder -->
                <div class="w-full h-32 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 rounded-lg mb-4 flex items-center justify-center">
                  <Icon icon="heroicons:photo" class="w-12 h-12 text-amber-600 dark:text-amber-400" />
                </div>

                <div class="mb-4">
                  <h4 class="font-bold text-amber-900 dark:text-amber-100 text-lg">{heirloom.name}</h4>
                  <p class="text-amber-700 dark:text-amber-300 text-sm">{heirloom.type}</p>
                  <p class="text-amber-600 dark:text-amber-400 text-sm">{heirloom.age} • {heirloom.origin}</p>
                </div>

                <p class="text-amber-800 dark:text-amber-200 text-sm mb-4">{heirloom.description}</p>

                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-amber-700 dark:text-amber-300">Current Keeper:</span>
                    <span class="text-sm font-medium text-amber-900 dark:text-amber-100">{heirloom.currentKeeper}</span>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-sm text-amber-700 dark:text-amber-300">Condition:</span>
                    <span class="px-2 py-1 text-xs font-medium rounded-full {heirloom.condition === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : heirloom.condition === 'Good' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}">
                      {heirloom.condition}
                    </span>
                  </div>

                  <div>
                    <h5 class="font-semibold text-amber-900 dark:text-amber-100 text-sm mb-1">Cultural Value:</h5>
                    <p class="text-xs text-amber-700 dark:text-amber-300">{heirloom.culturalValue}</p>
                  </div>

                  <div>
                    <h5 class="font-semibold text-amber-900 dark:text-amber-100 text-sm mb-1">Maintenance Needs:</h5>
                    <div class="space-y-1">
                      {#each heirloom.maintenanceNeeds as need}
                        <div class="flex items-center space-x-2">
                          <Icon icon="heroicons:wrench-screwdriver" class="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span class="text-xs text-amber-700 dark:text-amber-300">{need}</span>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <div>
                    <h5 class="font-semibold text-amber-900 dark:text-amber-100 text-sm mb-1">Stories:</h5>
                    <div class="space-y-1">
                      {#each heirloom.stories as story}
                        <div class="flex items-start space-x-2">
                          <Icon icon="heroicons:book-open" class="w-3 h-3 text-orange-600 dark:text-orange-400 mt-0.5" />
                          <span class="text-xs text-amber-700 dark:text-amber-300">{story}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "values"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">❤️ Core Family Values</h3>
          <div class="space-y-8">
            {#each familyValues as value}
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <div class="mb-4">
                  <h4 class="text-xl font-bold text-green-900 dark:text-green-100">{value.value}</h4>
                  <p class="text-green-700 dark:text-green-300 mt-2">{value.description}</p>
                  <p class="text-green-600 dark:text-green-400 text-sm mt-1">Origin: {value.origin}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- How Practiced -->
                  <div>
                    <h5 class="font-semibold text-green-900 dark:text-green-100 mb-3">How We Practice This:</h5>
                    <div class="space-y-2">
                      {#each value.howPracticed as practice}
                        <div class="flex items-start space-x-2">
                          <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                          <span class="text-sm text-green-700 dark:text-green-300">{practice}</span>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <!-- Examples -->
                  <div>
                    <h5 class="font-semibold text-green-900 dark:text-green-100 mb-3">Real Examples:</h5>
                    <div class="space-y-2">
                      {#each value.examples as example}
                        <div class="flex items-start space-x-2">
                          <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500 mt-0.5" />
                          <span class="text-sm text-green-700 dark:text-green-300">{example}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>

                <div class="mt-6 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2">Modern Relevance:</h5>
                      <p class="text-sm text-green-700 dark:text-green-300">{value.modernRelevance}</p>
                    </div>
                    <div>
                      <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2">Next Generation:</h5>
                      <p class="text-sm text-green-700 dark:text-green-300">{value.nextGeneration}</p>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "tree"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🌳 Family Tree</h3>
          <div class="space-y-8">
            {#each familyTree.generations as generation}
              <div class="text-center">
                <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-4">{generation.title}</h4>
                <div class="flex flex-wrap justify-center gap-4">
                  {#each generation.members as member}
                    <div class="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl p-4 min-w-[200px] border border-indigo-200 dark:border-indigo-700">
                      <h5 class="font-bold text-indigo-900 dark:text-indigo-100">{member.name}</h5>
                      {#if member.spouse}
                        <p class="text-indigo-700 dark:text-indigo-300 text-sm">& {member.spouse}</p>
                      {/if}
                      <p class="text-indigo-600 dark:text-indigo-400 text-xs">{member.dates}</p>
                    </div>
                  {/each}
                </div>

                {#if generation.level < familyTree.generations.length}
                  <div class="flex justify-center mt-4">
                    <Icon icon="heroicons:chevron-down" class="w-6 h-6 text-indigo-400" />
                  </div>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Family Lineage Wisdom -->
          <div class="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl">
            <h4 class="font-bold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
              <Icon icon="heroicons:puzzle-piece" class="w-5 h-5 mr-2" />
              वंश परम्परा | Lineage Tradition
            </h4>
            <p class="text-yellow-700 dark:text-yellow-300 mb-2">
              "पितृणां पुत्रा भविष्यन्ति पुत्राणां पितरो भवेत्।<br />
              एवं वंशक्रमेणैव जगत्सर्वं प्रवर्तते॥"
            </p>
            <p class="text-sm text-yellow-600 dark:text-yellow-400">"Sons will become fathers, and fathers were once sons. In this cycle of generations, the entire world continues."</p>
            <p class="text-xs text-yellow-500 dark:text-yellow-500 mt-2">Tamil: "மகன்கள் தந்தையாகி, தந்தைகள் மகனாக இருந்தனர் - இப்படியே தலைமுறைகள் தொடர்கின்றன"</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
