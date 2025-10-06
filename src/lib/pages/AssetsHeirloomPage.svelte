<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentView = "heirlooms";
  let searchTerm = "";
  let selectedGeneration = "all";
  let showAddModal = false;

  const views = [
    { id: "heirlooms", label: "Family Heirlooms", icon: "heroicons:star" },
    { id: "legacy", label: "Legacy Planning", icon: "heroicons:document-text" },
    { id: "genealogy", label: "Asset Genealogy", icon: "heroicons:user-group" },
  ];

  const heirloomData = [
    {
      id: 1,
      name: "Grandmother's Gold Necklace",
      tamilName: "பாட்டியின் தங்க மாலை",
      category: "jewelry",
      culturalSignificance: "High",
      generation: 3,
      originalOwner: "Kamala Devi (Great Grandmother)",
      currentOwner: "Priya Krishnan",
      yearAcquired: "1920",
      origin: "Traditional South Indian wedding jewelry",
      weight: "45 grams",
      material: "22K Gold with rubies",
      currentValue: 285000,
      sentimentalValue: "Priceless",
      condition: "Excellent",
      location: "Bank Safe Deposit Box",
      photos: ["necklace_1.jpg", "necklace_2.jpg"],
      story: "This necklace was crafted by master goldsmiths in Thanjavur for our great-grandmother's wedding in 1920. It has been passed down through three generations and is worn by brides in our family during their weddings.",
      culturalContext: "Traditional Tamilnadu temple jewelry design with Lakshmi motifs",
      inheritancePlan: "To be passed to eldest daughter upon marriage",
      maintenanceNotes: "Annual cleaning and inspection at Kumar Jewellers",
      restrictions: "Should not be sold, only passed down to family members",
      ceremonies: ["Weddings", "Naming ceremonies", "Cultural festivals"],
    },
    {
      id: 2,
      name: "Ancestral Brass Lamp Collection",
      tamilName: "முன்னோர் வெண்கல விளக்கு சேகரிப்பு",
      category: "religious",
      culturalSignificance: "Very High",
      generation: 4,
      originalOwner: "Sundaram Iyer (Great-great Grandfather)",
      currentOwner: "Family Shared",
      yearAcquired: "1895",
      origin: "Handcrafted in Swamimalai, Tamil Nadu",
      pieces: "12 lamps",
      material: "Traditional Panchaloka Bronze",
      currentValue: 125000,
      sentimentalValue: "Immeasurable",
      condition: "Very Good",
      location: "Pooja Room Display",
      photos: ["lamps_collection.jpg"],
      story: "This collection of traditional brass lamps was commissioned by our ancestor who was a temple priest. Each lamp represents different deities and is used during various religious ceremonies.",
      culturalContext: "Traditional South Indian temple lamps used in daily prayers and festivals",
      inheritancePlan: "Collective family ownership, not to be divided",
      maintenanceNotes: "Regular cleaning with tamarind paste and oil application",
      restrictions: "Must remain together as a collection, used only for religious purposes",
      ceremonies: ["Daily prayers", "Diwali", "Karthikai Deepam", "Family functions"],
    },
    {
      id: 3,
      name: "Hand-written Recipe Book",
      tamilName: "கையால் எழுதப்பட்ட சமையல் புத்தகம்",
      category: "documents",
      culturalSignificance: "High",
      generation: 2,
      originalOwner: "Meera Krishnan (Grandmother)",
      currentOwner: "Priya Krishnan",
      yearAcquired: "1950",
      origin: "Compiled over 40 years by grandmother",
      pages: "200+ recipes",
      material: "Handmade paper, pen and ink",
      currentValue: 5000,
      sentimentalValue: "Invaluable",
      condition: "Fragile - needs preservation",
      location: "Home - Climate controlled storage",
      photos: ["recipe_book.jpg"],
      story: "Our grandmother meticulously wrote down traditional Tamil recipes, family variations, and medicinal preparations. This book contains secret ingredients and techniques passed down orally for generations.",
      culturalContext: "Traditional Tamil cuisine and Ayurvedic preparations",
      inheritancePlan: "Digitize and share copies with all family members",
      maintenanceNotes: "Needs professional document preservation",
      restrictions: "Original to remain with family, copies can be shared",
      ceremonies: ["Festival cooking", "Special occasions", "Teaching moments"],
    },
    {
      id: 4,
      name: "Vintage Teak Wood Chest",
      tamilName: "பழைய தேக்கு மர பெட்டி",
      category: "furniture",
      culturalSignificance: "Medium",
      generation: 3,
      originalOwner: "Raman Iyer (Grandfather)",
      currentOwner: "Joint Family Property",
      yearAcquired: "1935",
      origin: "Crafted by local artisans in Kumbakonam",
      dimensions: "4ft x 2ft x 2ft",
      material: "Burma Teak with brass fittings",
      currentValue: 85000,
      sentimentalValue: "High",
      condition: "Good - minor wear",
      location: "Master Bedroom",
      photos: ["teak_chest.jpg"],
      story: "This chest was made to store the family's important documents, jewelry, and precious items. It has intricate carvings depicting Tamil religious motifs and has survived multiple house moves.",
      culturalContext: "Traditional Tamil household storage furniture with religious motifs",
      inheritancePlan: "To remain in family home as common storage",
      maintenanceNotes: "Annual polishing with natural oils",
      restrictions: "Not to be sold, should remain in family",
      ceremonies: ["Document storage", "Jewelry storage during festivals"],
    },
    {
      id: 5,
      name: "Silver Pooja Vessels Set",
      tamilName: "வெள்ளி பூஜை பாத்திரம் தொகுப்பு",
      category: "religious",
      culturalSignificance: "Very High",
      generation: 2,
      originalOwner: "Lakshmi Sundaram (Grandmother)",
      currentOwner: "Shared among daughters",
      yearAcquired: "1960",
      origin: "Commissioned from Thanjavur silversmiths",
      pieces: "25 vessels",
      material: "Pure Silver (925)",
      currentValue: 195000,
      sentimentalValue: "Sacred",
      condition: "Excellent",
      location: "Rotated among family members",
      photos: ["silver_vessels.jpg"],
      story: "These vessels were specially commissioned for our grandmother's 25th wedding anniversary. Each piece is designed for specific religious ceremonies and represents devotion and prosperity.",
      culturalContext: "Traditional Tamil Brahmin pooja vessels for elaborate religious ceremonies",
      inheritancePlan: "Shared rotation system among daughters for major festivals",
      maintenanceNotes: "Regular cleaning after each use, stored in individual cloth bags",
      restrictions: "Only for religious purposes, never for regular dining",
      ceremonies: ["Major festivals", "Wedding ceremonies", "Upanayanam", "Religious functions"],
    },
  ];

  const legacyPlans = [
    {
      id: 1,
      assetName: "Gold Jewelry Collection",
      plannedRecipient: "Daughter - Meera",
      condition: "Upon marriage or 25th birthday",
      documentStatus: "Will documented",
      culturalRequirements: "Must be worn during wedding ceremony",
      preparationNeeded: "Professional valuation and insurance update",
      timeline: "2027 (estimated)",
      notes: "Include traditional blessing ceremony during handover",
    },
    {
      id: 2,
      assetName: "Ancestral Home",
      plannedRecipient: "Joint ownership - both children",
      condition: "After parents' passing",
      documentStatus: "Legal documents pending",
      culturalRequirements: "Maintain as family gathering place",
      preparationNeeded: "Update property documents, create maintenance trust",
      timeline: "Long-term",
      notes: "Property should never be sold outside family",
    },
    {
      id: 3,
      assetName: "Religious Artifacts",
      plannedRecipient: "Son - Arjun (as head of family)",
      condition: "When ready to maintain family traditions",
      documentStatus: "Verbal agreement only",
      culturalRequirements: "Continue daily prayers and festival celebrations",
      preparationNeeded: "Teach proper usage and maintenance",
      timeline: "2030 (estimated)",
      notes: "Requires understanding of all ceremonies and rituals",
    },
  ];

  let filteredHeirlooms = heirloomData;
  let newHeirloom = {
    name: "",
    tamilName: "",
    category: "jewelry",
    culturalSignificance: "medium",
    originalOwner: "",
    yearAcquired: "",
    origin: "",
    material: "",
    currentValue: "",
    condition: "good",
    location: "",
    story: "",
    culturalContext: "",
    inheritancePlan: "",
    restrictions: "",
  };

  $: {
    filteredHeirlooms = heirloomData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.tamilName.toLowerCase().includes(searchTerm.toLowerCase()) || item.originalOwner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGeneration = selectedGeneration === "all" || (selectedGeneration === "recent" && item.generation <= 2) || (selectedGeneration === "ancestral" && item.generation >= 3);

      return matchesSearch && matchesGeneration;
    });
  }

  onMount(() => {
    document.title = "Heirloom & Legacy - Assets Management";
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function getCategoryIcon(category) {
    const icons = {
      jewelry: "heroicons:sparkles",
      religious: "heroicons:fire",
      documents: "heroicons:document-text",
      furniture: "heroicons:home",
      artifacts: "heroicons:cube",
      textiles: "heroicons:swatch",
    };
    return icons[category] || "heroicons:star";
  }

  function getCategoryColor(category) {
    const colors = {
      jewelry: "from-yellow-400 to-orange-500",
      religious: "from-orange-500 to-red-600",
      documents: "from-blue-500 to-indigo-600",
      furniture: "from-green-500 to-emerald-600",
      artifacts: "from-purple-500 to-pink-600",
      textiles: "from-pink-500 to-rose-600",
    };
    return colors[category] || "from-gray-400 to-gray-500";
  }

  function getSignificanceColor(significance) {
    switch (significance.toLowerCase()) {
      case "very high":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getConditionColor(condition) {
    switch (condition.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "very good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "good":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "fair":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "poor":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function addHeirloom() {
    // Add heirloom logic would go here
    showAddModal = false;
    // Reset form
    newHeirloom = {
      name: "",
      tamilName: "",
      category: "jewelry",
      culturalSignificance: "medium",
      originalOwner: "",
      yearAcquired: "",
      origin: "",
      material: "",
      currentValue: "",
      condition: "good",
      location: "",
      story: "",
      culturalContext: "",
      inheritancePlan: "",
      restrictions: "",
    };
  }

  function getGenerationText(generation) {
    const generations = {
      1: "Current Generation",
      2: "Parent Generation",
      3: "Grandparent Generation",
      4: "Great-Grandparent Generation",
      5: "Ancestral (5+ generations)",
    };
    return generations[generation] || `${generation} generations ago`;
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:star" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Heirloom & Legacy</h1>
        <p class="text-gray-600 dark:text-gray-300">Preserve family heritage and plan generational transfers</p>
      </div>
    </div>
    <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
      <Icon icon="heroicons:plus" class="w-5 h-5" />
      <span>Add Heirloom</span>
    </button>
  </div>

  <!-- View Tabs -->
  <div class="flex space-x-2">
    {#each views as view}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-purple-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20'}" on:click={() => (currentView = view.id)}>
        <Icon icon={view.icon} class="w-4 h-4" />
        <span class="font-medium">{view.label}</span>
      </button>
    {/each}
  </div>

  <!-- Family Heirlooms View -->
  {#if currentView === "heirlooms"}
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Heirlooms</label>
          <div class="relative">
            <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" bind:value={searchTerm} placeholder="Search by name, owner, or description..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generation</label>
          <select bind:value={selectedGeneration} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
            <option value="all">All Generations</option>
            <option value="recent">Recent (1-2 generations)</option>
            <option value="ancestral">Ancestral (3+ generations)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Heirloom Items -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each filteredHeirlooms as item}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
          <div class="p-6">
            <!-- Item Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-3">
                <div class="p-3 bg-gradient-to-r {getCategoryColor(item.category)} rounded-lg text-white">
                  <Icon icon={getCategoryIcon(item.category)} class="w-6 h-6" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{item.tamilName}</p>
                  <div class="flex items-center space-x-2 mt-2">
                    <span class="px-2 py-1 text-xs font-medium border rounded-full {getSignificanceColor(item.culturalSignificance)}">
                      {item.culturalSignificance} Cultural Value
                    </span>
                    <span class="px-2 py-1 text-xs font-medium border rounded-full {getConditionColor(item.condition)}">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <p class="text-sm text-gray-600 dark:text-gray-400">Generation</p>
                <p class="text-lg font-bold text-purple-600 dark:text-purple-400">{item.generation}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {getGenerationText(item.generation)}
                </p>
              </div>
            </div>

            <!-- Item Details -->
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Original Owner:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{item.originalOwner}</p>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Year Acquired:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{item.yearAcquired}</p>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Current Owner:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{item.currentOwner}</p>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Current Value:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{formatCurrency(item.currentValue)}</p>
                </div>
              </div>

              {#if item.material}
                <div class="text-sm">
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Material/Details:</p>
                  <p class="text-gray-900 dark:text-white">{item.material}</p>
                </div>
              {/if}

              <div class="text-sm">
                <p class="text-gray-600 dark:text-gray-400 mb-1">Origin:</p>
                <p class="text-gray-900 dark:text-white">{item.origin}</p>
              </div>

              <div class="text-sm">
                <p class="text-gray-600 dark:text-gray-400 mb-1">Cultural Context:</p>
                <p class="text-gray-900 dark:text-white">{item.culturalContext}</p>
              </div>

              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Family Story:</p>
                <p class="text-sm text-gray-900 dark:text-white">{item.story}</p>
              </div>

              {#if item.ceremonies && item.ceremonies.length > 0}
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Used in Ceremonies:</p>
                  <div class="flex flex-wrap gap-1">
                    {#each item.ceremonies as ceremony}
                      <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900/30 dark:text-purple-400">{ceremony}</span>
                    {/each}
                  </div>
                </div>
              {/if}

              {#if item.inheritancePlan}
                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Inheritance Plan:</p>
                  <p class="text-sm text-gray-900 dark:text-white">{item.inheritancePlan}</p>
                </div>
              {/if}

              {#if item.restrictions}
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p class="text-sm text-red-600 dark:text-red-400 mb-1">Restrictions:</p>
                  <p class="text-sm text-red-800 dark:text-red-300">{item.restrictions}</p>
                </div>
              {/if}
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2 mt-6">
              <button class="flex-1 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"> View Details </button>
              <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Edit Story </button>
              <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Plan Legacy </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Legacy Planning View -->
  {:else if currentView === "legacy"}
    <div class="space-y-6">
      {#each legacyPlans as plan}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">{plan.assetName}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Planned for: {plan.plannedRecipient}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Timeline: {plan.timeline}</p>
            </div>
            <div class="text-right">
              <span class="px-3 py-1 text-sm font-medium rounded-full {plan.documentStatus === 'Will documented' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}">
                {plan.documentStatus}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Transfer Condition:</p>
              <p class="text-gray-900 dark:text-white">{plan.condition}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Cultural Requirements:</p>
              <p class="text-gray-900 dark:text-white">{plan.culturalRequirements}</p>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-gray-600 dark:text-gray-400 mb-1">Preparation Needed:</p>
            <p class="text-sm text-gray-900 dark:text-white">{plan.preparationNeeded}</p>
          </div>

          {#if plan.notes}
            <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p class="text-sm text-blue-800 dark:text-blue-300">{plan.notes}</p>
            </div>
          {/if}

          <div class="flex space-x-2 mt-6">
            <button class="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Update Plan </button>
            <button class="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Legal Documents </button>
          </div>
        </div>
      {/each}
    </div>

    <!-- Asset Genealogy View -->
  {:else if currentView === "genealogy"}
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Asset Family Tree</h3>

      <div class="space-y-6">
        <!-- Generation 4+ -->
        <div class="border-l-4 border-purple-500 pl-4">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white mb-3">Ancestral Generation (1895-1920)</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h5 class="font-medium text-gray-900 dark:text-white">Brass Lamp Collection</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">Sundaram Iyer → Family Shared</p>
              <p class="text-xs text-purple-600 dark:text-purple-400">Religious Heritage</p>
            </div>
          </div>
        </div>

        <!-- Generation 3 -->
        <div class="border-l-4 border-blue-500 pl-4">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white mb-3">Great-Grandparent Generation (1920-1950)</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h5 class="font-medium text-gray-900 dark:text-white">Gold Necklace</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">Kamala Devi → Priya Krishnan</p>
              <p class="text-xs text-blue-600 dark:text-blue-400">Wedding Jewelry</p>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h5 class="font-medium text-gray-900 dark:text-white">Teak Wood Chest</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">Raman Iyer → Joint Family</p>
              <p class="text-xs text-blue-600 dark:text-blue-400">Storage Furniture</p>
            </div>
          </div>
        </div>

        <!-- Generation 2 -->
        <div class="border-l-4 border-green-500 pl-4">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white mb-3">Grandparent Generation (1950-1980)</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h5 class="font-medium text-gray-900 dark:text-white">Recipe Book</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">Meera Krishnan → Priya Krishnan</p>
              <p class="text-xs text-green-600 dark:text-green-400">Culinary Heritage</p>
            </div>
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h5 class="font-medium text-gray-900 dark:text-white">Silver Pooja Vessels</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">Lakshmi Sundaram → Daughters</p>
              <p class="text-xs text-green-600 dark:text-green-400">Religious Items</p>
            </div>
          </div>
        </div>

        <!-- Current Generation -->
        <div class="border-l-4 border-yellow-500 pl-4">
          <h4 class="text-md font-semibold text-gray-900 dark:text-white mb-3">Current Generation (1980-Present)</h4>
          <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">Items being preserved and maintained for future generations</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Add Heirloom Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Add Family Heirloom</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addHeirloom} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
              <input type="text" bind:value={newHeirloom.name} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Grandmother's Gold Necklace" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tamil Name</label>
              <input type="text" bind:value={newHeirloom.tamilName} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="தமிழ் பெயர்" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select bind:value={newHeirloom.category} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                <option value="jewelry">Jewelry</option>
                <option value="religious">Religious Items</option>
                <option value="documents">Documents</option>
                <option value="furniture">Furniture</option>
                <option value="artifacts">Artifacts</option>
                <option value="textiles">Textiles</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cultural Significance *</label>
              <select bind:value={newHeirloom.culturalSignificance} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very high">Very High</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Owner *</label>
              <input type="text" bind:value={newHeirloom.originalOwner} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Kamala Devi (Great Grandmother)" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year Acquired</label>
              <input type="text" bind:value={newHeirloom.yearAcquired} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., 1920" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Origin/Background *</label>
              <input type="text" bind:value={newHeirloom.origin} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Traditional South Indian wedding jewelry" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Material/Details</label>
              <input type="text" bind:value={newHeirloom.material} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., 22K Gold with rubies, 45 grams" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Value (₹)</label>
              <input type="number" bind:value={newHeirloom.currentValue} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="285000" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition</label>
              <select bind:value={newHeirloom.condition} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                <option value="excellent">Excellent</option>
                <option value="very good">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Location</label>
              <input type="text" bind:value={newHeirloom.location} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Bank Safe Deposit Box" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Family Story *</label>
              <textarea bind:value={newHeirloom.story} required rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Tell the story behind this heirloom..."></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cultural Context</label>
              <textarea bind:value={newHeirloom.culturalContext} rows="2" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Cultural or religious significance..."></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Inheritance Plan</label>
              <textarea bind:value={newHeirloom.inheritancePlan} rows="2" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Who should inherit this and under what conditions..."></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Restrictions</label>
              <textarea bind:value={newHeirloom.restrictions} rows="2" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Any restrictions on use, sale, or transfer..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"> Add Heirloom </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
