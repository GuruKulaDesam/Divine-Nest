<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentView = "disposed";
  let searchTerm = "";
  let selectedMethod = "all";
  let showAddModal = false;
  let selectedYear = "all";

  const views = [
    { id: "disposed", label: "Disposed Items", icon: "heroicons:trash" },
    { id: "candidates", label: "Disposal Candidates", icon: "heroicons:clock" },
    { id: "recycling", label: "Recycling Guide", icon: "heroicons:arrow-path" },
  ];

  const disposedItems = [
    {
      id: 1,
      name: "Old Samsung TV (32 inch)",
      tamilName: "பழைய சாம்சங் டிவி",
      category: "electronics",
      disposalDate: "2024-10-15",
      method: "sold",
      originalValue: 35000,
      disposalValue: 8000,
      reason: "Upgraded to new QLED TV",
      recipient: "Second Hand Electronics Shop",
      location: "T.Nagar Electronics Market",
      condition: "Working but outdated",
      environmentalImpact: "low",
      documentation: "Sale receipt available",
      notes: "Sold to make space for new TV. Buyer was happy with condition.",
      certificateNumber: null,
      yearsOwned: 6,
    },
    {
      id: 2,
      name: "Broken Mixer Grinder",
      tamilName: "கெட்ட மிக்சி",
      category: "appliances",
      disposalDate: "2024-09-20",
      method: "recycling",
      originalValue: 12000,
      disposalValue: 500,
      reason: "Motor burnt out, repair cost too high",
      recipient: "E-Waste Recycling Center",
      location: "Chennai Corporation E-Waste Center",
      condition: "Damaged - motor failure",
      environmentalImpact: "positive",
      documentation: "E-waste certificate",
      notes: "Proper e-waste disposal. Plastic parts recycled, metal parts recovered.",
      certificateNumber: "EWC-2024-0892",
      yearsOwned: 4,
    },
    {
      id: 3,
      name: "Old Wooden Study Table",
      tamilName: "பழைய மர படிப்பு மேசை",
      category: "furniture",
      disposalDate: "2024-08-30",
      method: "donated",
      originalValue: 8000,
      disposalValue: 0,
      reason: "Child outgrew the table",
      recipient: "Government School",
      location: "Chennai Corporation School, Mylapore",
      condition: "Good condition with minor scratches",
      environmentalImpact: "positive",
      documentation: "Donation receipt",
      notes: "Donated to help underprivileged children. School was very grateful.",
      certificateNumber: "DON-2024-1156",
      yearsOwned: 5,
    },
    {
      id: 4,
      name: "Old Clothes (10 pieces)",
      tamilName: "பழைய ஆடைகள்",
      category: "textiles",
      disposalDate: "2024-11-05",
      method: "donated",
      originalValue: 15000,
      disposalValue: 0,
      reason: "Size changes and style updates",
      recipient: "Orphanage",
      location: "Sri Ramakrishna Orphanage, Adyar",
      condition: "Good condition, clean",
      environmentalImpact: "positive",
      documentation: "Donation acknowledgment",
      notes: "Cleaned and sorted before donation. Many were barely used.",
      certificateNumber: "SRO-2024-0445",
      yearsOwned: 3,
    },
    {
      id: 5,
      name: "Damaged Bicycle",
      tamilName: "கெட்ட சைக்கிள்",
      category: "vehicles",
      disposalDate: "2024-07-12",
      method: "scrap",
      originalValue: 6000,
      disposalValue: 800,
      reason: "Frame cracked beyond repair",
      recipient: "Scrap Metal Dealer",
      location: "Local Scrap Yard",
      condition: "Damaged - frame crack",
      environmentalImpact: "neutral",
      documentation: "Scrap receipt",
      notes: "Metal parts recycled. Accident damaged frame couldn't be repaired.",
      certificateNumber: null,
      yearsOwned: 8,
    },
    {
      id: 6,
      name: "Expired Medications",
      tamilName: "காலாவதியான மருந்துகள்",
      category: "medical",
      disposalDate: "2024-06-15",
      method: "safe_disposal",
      originalValue: 2500,
      disposalValue: 0,
      reason: "Expired and potentially dangerous",
      recipient: "Hospital Waste Management",
      location: "Apollo Hospital Waste Facility",
      condition: "Expired",
      environmentalImpact: "positive",
      documentation: "Safe disposal certificate",
      notes: "Proper medical waste disposal to prevent environmental contamination.",
      certificateNumber: "MWD-2024-3341",
      yearsOwned: 2,
    },
  ];

  const disposalCandidates = [
    {
      id: 1,
      name: "Old CRT Monitor",
      tamilName: "பழைய மானிட்டர்",
      category: "electronics",
      currentValue: 2000,
      reason: "Replaced with LED monitor, taking up space",
      condition: "Working but outdated",
      priority: "medium",
      suggestedMethod: "recycling",
      potentialRecipient: "E-waste center",
      estimatedDisposalValue: 300,
      environmentalConcern: "Contains hazardous materials",
      yearsOwned: 12,
      lastUsed: "2024-01-15",
    },
    {
      id: 2,
      name: "Children's Outgrown Clothes",
      tamilName: "குழந்தைகளின் சிறிய ஆடைகள்",
      category: "textiles",
      currentValue: 8000,
      reason: "Children have outgrown",
      condition: "Good condition",
      priority: "low",
      suggestedMethod: "donation",
      potentialRecipient: "Orphanage or NGO",
      estimatedDisposalValue: 0,
      environmentalConcern: "None - good for reuse",
      yearsOwned: 2,
      lastUsed: "2024-03-20",
    },
    {
      id: 3,
      name: "Broken Air Cooler",
      tamilName: "கெட்ட ஏர் கூலர்",
      category: "appliances",
      currentValue: 5000,
      reason: "Motor failed, high repair cost",
      condition: "Damaged - motor issue",
      priority: "high",
      suggestedMethod: "recycling",
      potentialRecipient: "Appliance recycling center",
      estimatedDisposalValue: 800,
      environmentalConcern: "Metal and plastic components need proper recycling",
      yearsOwned: 6,
      lastUsed: "2024-05-10",
    },
    {
      id: 4,
      name: "Old Textbooks",
      tamilName: "பழைய படிப்பு புத்தகங்கள்",
      category: "books",
      currentValue: 3000,
      reason: "Curriculum changed, no longer relevant",
      condition: "Good condition with highlighting",
      priority: "low",
      suggestedMethod: "donation",
      potentialRecipient: "Government school library",
      estimatedDisposalValue: 0,
      environmentalConcern: "Paper - fully recyclable",
      yearsOwned: 4,
      lastUsed: "2023-12-01",
    },
  ];

  const recyclingGuide = [
    {
      category: "Electronics",
      tamilName: "மின்னணு பொருட்கள்",
      items: ["TVs", "Computers", "Mobile phones", "Appliances"],
      method: "E-waste recycling centers",
      environmental: "Contains hazardous materials - mercury, lead, cadmium",
      locations: ["Chennai Corporation E-waste Center - Kodungaiyur", "Ramky E-waste Management - Sriperumbudur", "E-Parisaraa - Multiple locations"],
      precautions: "Remove personal data, batteries separately",
      value: "May get small payment for working items",
    },
    {
      category: "Clothing & Textiles",
      tamilName: "ஆடைகள் மற்றும் துணிகள்",
      items: ["Clothes", "Shoes", "Bags", "Curtains"],
      method: "Donation or textile recycling",
      environmental: "Synthetic fabrics take long to decompose",
      locations: ["Goonj NGO - Multiple collection points", "Orphanages and old age homes", "H&M stores - textile recycling program"],
      precautions: "Clean and sort by condition",
      value: "No monetary value, high social impact",
    },
    {
      category: "Furniture",
      tamilName: "மரச்சாமான்கள்",
      items: ["Tables", "Chairs", "Wardrobes", "Beds"],
      method: "Donation, resale, or wood recycling",
      environmental: "Wood furniture biodegradable, metals recyclable",
      locations: ["Second-hand furniture shops", "NGOs and charitable organizations", "Carpenter shops for wood reuse"],
      precautions: "Check for termite damage",
      value: "Good resale value if in good condition",
    },
    {
      category: "Paper & Books",
      tamilName: "காகிதம் மற்றும் புத்தகங்கள்",
      items: ["Newspapers", "Books", "Magazines", "Documents"],
      method: "Paper recycling or donation",
      environmental: "Fully recyclable, saves trees",
      locations: ["Raddi/paper collection centers", "Libraries and schools", "ITC paper collection points"],
      precautions: "Remove personal information from documents",
      value: "Small payment from raddi collectors",
    },
    {
      category: "Medical Waste",
      tamilName: "மருத்துவ கழிவுகள்",
      items: ["Expired medicines", "Syringes", "Medical equipment"],
      method: "Hospital waste management",
      environmental: "Can contaminate water and soil if not disposed properly",
      locations: ["Government hospitals", "Apollo Hospitals waste facility", "Fortis Healthcare waste management"],
      precautions: "Never mix with regular waste",
      value: "No value - safety and environmental concern",
    },
  ];

  let filteredDisposed = disposedItems;
  let newDisposal = {
    name: "",
    category: "electronics",
    disposalDate: "",
    method: "sold",
    originalValue: "",
    disposalValue: "",
    reason: "",
    recipient: "",
    location: "",
    condition: "",
    notes: "",
  };

  $: {
    filteredDisposed = disposedItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.recipient.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMethod = selectedMethod === "all" || item.method === selectedMethod;
      const matchesYear = selectedYear === "all" || new Date(item.disposalDate).getFullYear().toString() === selectedYear;

      return matchesSearch && matchesMethod && matchesYear;
    });
  }

  onMount(() => {
    document.title = "Disposal & Recycling - Assets Management";
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN");
  }

  function getCategoryIcon(category) {
    const icons = {
      electronics: "heroicons:computer-desktop",
      appliances: "heroicons:cog-6-tooth",
      furniture: "heroicons:home",
      textiles: "heroicons:swatch",
      vehicles: "heroicons:truck",
      medical: "heroicons:heart",
      books: "heroicons:book-open",
    };
    return icons[category] || "heroicons:cube";
  }

  function getMethodColor(method) {
    switch (method) {
      case "sold":
        return "bg-green-100 text-green-800 border-green-200";
      case "donated":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "recycling":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "scrap":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "safe_disposal":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getMethodIcon(method) {
    switch (method) {
      case "sold":
        return "heroicons:currency-rupee";
      case "donated":
        return "heroicons:heart";
      case "recycling":
        return "heroicons:arrow-path";
      case "scrap":
        return "heroicons:wrench-screwdriver";
      case "safe_disposal":
        return "heroicons:shield-check";
      default:
        return "heroicons:trash";
    }
  }

  function getEnvironmentalColor(impact) {
    switch (impact) {
      case "positive":
        return "text-green-600";
      case "neutral":
        return "text-yellow-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function addDisposal() {
    // Add disposal logic would go here
    showAddModal = false;
    // Reset form
    newDisposal = {
      name: "",
      category: "electronics",
      disposalDate: "",
      method: "sold",
      originalValue: "",
      disposalValue: "",
      reason: "",
      recipient: "",
      location: "",
      condition: "",
      notes: "",
    };
  }

  function calculateValueLoss(original, disposal) {
    const loss = original - disposal;
    const lossPercent = ((loss / original) * 100).toFixed(1);
    return { loss, lossPercent };
  }

  // Get unique years from disposal dates
  const availableYears = [...new Set(disposedItems.map((item) => new Date(item.disposalDate).getFullYear().toString()))].sort((a, b) => b - a);
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:trash" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Disposal & Recycling</h1>
        <p class="text-gray-600 dark:text-gray-300">Track disposed items and manage eco-friendly disposal</p>
      </div>
    </div>
    <button class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
      <Icon icon="heroicons:plus" class="w-5 h-5" />
      <span>Record Disposal</span>
    </button>
  </div>

  <!-- View Tabs -->
  <div class="flex space-x-2">
    {#each views as view}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-red-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-red-900/20'}" on:click={() => (currentView = view.id)}>
        <Icon icon={view.icon} class="w-4 h-4" />
        <span class="font-medium">{view.label}</span>
      </button>
    {/each}
  </div>

  <!-- Disposed Items View -->
  {#if currentView === "disposed"}
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Items</label>
          <div class="relative">
            <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" bind:value={searchTerm} placeholder="Search by item name or recipient..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disposal Method</label>
          <select bind:value={selectedMethod} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white">
            <option value="all">All Methods</option>
            <option value="sold">Sold</option>
            <option value="donated">Donated</option>
            <option value="recycling">Recycling</option>
            <option value="scrap">Scrap</option>
            <option value="safe_disposal">Safe Disposal</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
          <select bind:value={selectedYear} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white">
            <option value="all">All Years</option>
            {#each availableYears as year}
              <option value={year}>{year}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Items Disposed</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{disposedItems.length}</p>
          </div>
          <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <Icon icon="heroicons:trash" class="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Items Sold</p>
            <p class="text-2xl font-bold text-green-600">{disposedItems.filter((i) => i.method === "sold").length}</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Items Donated</p>
            <p class="text-2xl font-bold text-blue-600">{disposedItems.filter((i) => i.method === "donated").length}</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Icon icon="heroicons:heart" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Recycled</p>
            <p class="text-2xl font-bold text-purple-600">{disposedItems.filter((i) => i.method === "recycling").length}</p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Icon icon="heroicons:arrow-path" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Disposed Items List -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each filteredDisposed as item}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
          <div class="p-6">
            <!-- Item Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start space-x-3">
                <div class="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white">
                  <Icon icon={getCategoryIcon(item.category)} class="w-6 h-6" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{item.tamilName}</p>
                  <div class="flex items-center space-x-2 mt-2">
                    <span class="px-2 py-1 text-xs font-medium border rounded-full {getMethodColor(item.method)}">
                      <Icon icon={getMethodIcon(item.method)} class="w-3 h-3 inline mr-1" />
                      {item.method.replace("_", " ")}
                    </span>
                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300 capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <p class="text-sm text-gray-600 dark:text-gray-400">Disposed</p>
                <p class="font-medium text-gray-900 dark:text-white">{formatDate(item.disposalDate)}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{item.yearsOwned} years owned</p>
              </div>
            </div>

            <!-- Value Information -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Original Value:</p>
                  <p class="font-bold text-gray-900 dark:text-white">{formatCurrency(item.originalValue)}</p>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Disposal Value:</p>
                  <p class="font-bold text-gray-900 dark:text-white">{formatCurrency(item.disposalValue)}</p>
                </div>
              </div>
              {#if item.originalValue > 0}
                {@const valueLoss = calculateValueLoss(item.originalValue, item.disposalValue)}
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Value Loss:</span>
                    <span class="text-sm font-medium text-red-600">
                      -{formatCurrency(valueLoss.loss)} ({valueLoss.lossPercent}%)
                    </span>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Item Details -->
            <div class="space-y-3 text-sm">
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">Reason for Disposal:</p>
                <p class="text-gray-900 dark:text-white">{item.reason}</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Recipient:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{item.recipient}</p>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Location:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{item.location}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Condition:</p>
                  <p class="font-medium text-gray-900 dark:text-white">{item.condition}</p>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Environmental Impact:</p>
                  <p class="font-medium {getEnvironmentalColor(item.environmentalImpact)} capitalize">{item.environmentalImpact}</p>
                </div>
              </div>

              {#if item.certificateNumber}
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p class="text-green-800 dark:text-green-300 text-sm">
                    <Icon icon="heroicons:shield-check" class="w-4 h-4 inline mr-1" />
                    Certificate: {item.certificateNumber}
                  </p>
                </div>
              {/if}

              {#if item.notes}
                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-gray-600 dark:text-gray-400">{item.notes}</p>
                </div>
              {/if}
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2 mt-6">
              <button class="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"> View Details </button>
              {#if item.certificateNumber}
                <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> View Certificate </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Disposal Candidates View -->
  {:else if currentView === "candidates"}
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Items Ready for Disposal</h3>
      <div class="space-y-4">
        {#each disposalCandidates as candidate}
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-start space-x-3">
                <div class="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white">
                  <Icon icon={getCategoryIcon(candidate.category)} class="w-5 h-5" />
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-900 dark:text-white">{candidate.name}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{candidate.tamilName}</p>
                  <div class="flex items-center space-x-2 mt-1">
                    <span class="px-2 py-1 text-xs font-medium border rounded-full {getPriorityColor(candidate.priority)}">
                      {candidate.priority} priority
                    </span>
                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300 capitalize">
                      {candidate.category}
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(candidate.currentValue)}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{candidate.yearsOwned} years old</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">Reason:</p>
                <p class="text-gray-900 dark:text-white">{candidate.reason}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">Condition:</p>
                <p class="text-gray-900 dark:text-white">{candidate.condition}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">Suggested Method:</p>
                <p class="text-gray-900 dark:text-white capitalize">{candidate.suggestedMethod}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">Potential Recipient:</p>
                <p class="text-gray-900 dark:text-white">{candidate.potentialRecipient}</p>
              </div>
            </div>

            {#if candidate.environmentalConcern}
              <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4">
                <p class="text-yellow-800 dark:text-yellow-300 text-sm">
                  <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 inline mr-1" />
                  {candidate.environmentalConcern}
                </p>
              </div>
            {/if}

            <div class="flex space-x-2">
              <button class="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"> Schedule Disposal </button>
              <button class="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Get Quote </button>
              <button class="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Find Donor </button>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Recycling Guide View -->
  {:else if currentView === "recycling"}
    <div class="space-y-6">
      {#each recyclingGuide as guide}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-start space-x-4 mb-4">
            <div class="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
              <Icon icon={getCategoryIcon(guide.category.toLowerCase())} class="w-6 h-6" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{guide.category}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{guide.tamilName}</p>
              <div class="flex flex-wrap gap-2 mt-2">
                {#each guide.items as item}
                  <span class="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300">{item}</span>
                {/each}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Disposal Method</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{guide.method}</p>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Environmental Impact</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{guide.environmental}</p>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Precautions</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{guide.precautions}</p>
              </div>

              <div>
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">Value Recovery</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{guide.value}</p>
              </div>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Disposal Locations</h4>
              <div class="space-y-2">
                {#each guide.locations as location}
                  <div class="flex items-start space-x-2">
                    <Icon icon="heroicons:map-pin" class="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                    <p class="text-sm text-gray-900 dark:text-white">{location}</p>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Disposal Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Record Item Disposal</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addDisposal} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Name *</label>
              <input type="text" bind:value={newDisposal.name} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Old Samsung TV" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select bind:value={newDisposal.category} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white">
                <option value="electronics">Electronics</option>
                <option value="appliances">Appliances</option>
                <option value="furniture">Furniture</option>
                <option value="textiles">Textiles</option>
                <option value="vehicles">Vehicles</option>
                <option value="medical">Medical</option>
                <option value="books">Books</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disposal Date *</label>
              <input type="date" bind:value={newDisposal.disposalDate} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disposal Method *</label>
              <select bind:value={newDisposal.method} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white">
                <option value="sold">Sold</option>
                <option value="donated">Donated</option>
                <option value="recycling">Recycling</option>
                <option value="scrap">Scrap</option>
                <option value="safe_disposal">Safe Disposal</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Value (₹) *</label>
              <input type="number" bind:value={newDisposal.originalValue} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="35000" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Disposal Value (₹) *</label>
              <input type="number" bind:value={newDisposal.disposalValue} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="8000" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Disposal *</label>
              <input type="text" bind:value={newDisposal.reason} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Upgraded to new QLED TV" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recipient *</label>
              <input type="text" bind:value={newDisposal.recipient} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Second Hand Electronics Shop" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input type="text" bind:value={newDisposal.location} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., T.Nagar Electronics Market" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition *</label>
              <input type="text" bind:value={newDisposal.condition} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Working but outdated" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea bind:value={newDisposal.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white" placeholder="Any additional notes about the disposal..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"> Record Disposal </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
