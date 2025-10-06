<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import DashboardLayout from "../components/DashboardLayout.svelte";

  let currentView = "movements";
  let searchTerm = "";
  let selectedStatus = "all";
  let showAddModal = false;
  let selectedType = "all";

  const views = [
    { id: "movements", label: "Asset Movements", icon: "heroicons:arrow-right-circle" },
    { id: "lending", label: "Loans & Borrowing", icon: "heroicons:hand-raised" },
    { id: "tracking", label: "Location Tracking", icon: "heroicons:map-pin" },
  ];

  const movementData = [
    {
      id: 1,
      assetName: "Honda Activa 6G",
      tamilName: "ஹோண்டா ஆக்டிவா",
      type: "lending",
      fromLocation: "Home Garage",
      toLocation: "Brother's House (Tambaram)",
      fromPerson: "Self",
      toPerson: "Arjun Krishna (Brother)",
      startDate: "2024-10-15",
      expectedReturn: "2024-12-15",
      actualReturn: null,
      reason: "Brother's vehicle under repair, temporary loan",
      status: "active",
      security: "Verbal agreement",
      contact: "+91 98765 43210",
      notes: "Full tank given, insurance valid till March 2025",
      conditions: "Return with full tank, no modifications allowed",
    },
    {
      id: 2,
      assetName: "Silver Pooja Vessels Set",
      tamilName: "வெள்ளி பூஜை பாத்திரம்",
      type: "borrowing",
      fromLocation: "Sister's House (Adyar)",
      toLocation: "Home",
      fromPerson: "Meera Krishna (Sister)",
      toPerson: "Self",
      startDate: "2024-11-01",
      expectedReturn: "2024-11-10",
      actualReturn: "2024-11-10",
      reason: "Diwali celebrations and prayers",
      status: "returned",
      security: "Family trust",
      contact: "+91 87654 32109",
      notes: "All 25 pieces borrowed and returned in perfect condition",
      conditions: "Only for religious ceremonies, clean and return immediately after use",
    },
    {
      id: 3,
      assetName: "Canon EOS R6 Camera",
      tamilName: "கேனன் கேமரா",
      type: "lending",
      fromLocation: "Home",
      toLocation: "Cousin's Studio (T.Nagar)",
      fromPerson: "Self",
      toPerson: "Ravi Krishnan (Cousin)",
      startDate: "2024-11-18",
      expectedReturn: "2024-11-25",
      actualReturn: null,
      reason: "Wedding photography assignment",
      status: "active",
      security: "Written agreement + deposit",
      contact: "+91 76543 21098",
      notes: "Lent with 2 lenses, charger, and memory cards. Deposit ₹15,000 taken",
      conditions: "Return in same condition, any damages to be compensated",
    },
    {
      id: 4,
      assetName: "Teak Wood Dining Chairs (4)",
      tamilName: "தேக்கு மர நாற்காலிகள்",
      type: "temporary_move",
      fromLocation: "Home",
      toLocation: "Function Hall (Mylapore)",
      fromPerson: "Self",
      toPerson: "Event Management",
      startDate: "2024-11-12",
      expectedReturn: "2024-11-14",
      actualReturn: "2024-11-14",
      reason: "Family wedding function - additional seating needed",
      status: "returned",
      security: "Rental agreement",
      contact: "+91 65432 10987",
      notes: "Transported safely both ways, minor scratch on one chair",
      conditions: "Transport insurance covered by event management",
    },
    {
      id: 5,
      assetName: "Ancestral Brass Lamp Set",
      tamilName: "பூர்வீக பித்தளை விளக்கு",
      type: "borrowing",
      fromLocation: "Uncle's House (Mylapore)",
      toLocation: "Home",
      fromPerson: "Sundaram Uncle",
      toPerson: "Self",
      startDate: "2024-10-30",
      expectedReturn: "2024-11-05",
      actualReturn: "2024-11-05",
      reason: "Karthikai Deepam festival celebrations",
      status: "returned",
      security: "Family arrangement",
      contact: "+91 54321 09876",
      notes: "12 traditional lamps used for festival, all returned clean",
      conditions: "Only for religious purposes, handle with extreme care",
    },
    {
      id: 6,
      assetName: "Pressure Cooker (5L)",
      tamilName: "பிரஷர் குக்கர்",
      type: "lending",
      fromLocation: "Home",
      toLocation: "Neighbor's House",
      fromPerson: "Self",
      toPerson: "Mrs. Lakshmi (Neighbor)",
      startDate: "2024-11-20",
      expectedReturn: "2024-11-22",
      actualReturn: null,
      reason: "Neighbor's cooker broken, needed for festival cooking",
      status: "overdue",
      security: "Verbal agreement",
      contact: "+91 43210 98765",
      notes: "2 days overdue, need to follow up",
      conditions: "Return clean and in working condition",
    },
  ];

  const locationTracking = [
    {
      assetName: "Gold Jewelry Collection",
      currentLocation: "Bank Safe Deposit Box - IOB T.Nagar",
      lastUpdated: "2024-11-15",
      nextReview: "2024-12-15",
      accessLog: [
        { date: "2024-11-15", purpose: "Regular inspection", person: "Self" },
        { date: "2024-10-22", purpose: "Added new pieces", person: "Self" },
        { date: "2024-09-10", purpose: "Wedding jewelry for daughter", person: "Family" },
      ],
    },
    {
      assetName: "Important Documents",
      currentLocation: "Home Safe",
      lastUpdated: "2024-11-10",
      nextReview: "2025-01-10",
      accessLog: [
        { date: "2024-11-10", purpose: "Added insurance papers", person: "Self" },
        { date: "2024-08-15", purpose: "Property document update", person: "Self" },
      ],
    },
    {
      assetName: "Vintage Coins Collection",
      currentLocation: "Study Room Cabinet",
      lastUpdated: "2024-10-28",
      nextReview: "2024-12-28",
      accessLog: [
        { date: "2024-10-28", purpose: "Added commemorative coins", person: "Self" },
        { date: "2024-07-12", purpose: "Show to collector friend", person: "Self" },
      ],
    },
  ];

  let filteredMovements = movementData;
  let newMovement = {
    assetName: "",
    type: "lending",
    fromLocation: "",
    toLocation: "",
    fromPerson: "",
    toPerson: "",
    startDate: "",
    expectedReturn: "",
    reason: "",
    security: "",
    contact: "",
    notes: "",
    conditions: "",
  };

  $: {
    filteredMovements = movementData.filter((movement) => {
      const matchesSearch = movement.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || movement.toPerson.toLowerCase().includes(searchTerm.toLowerCase()) || movement.fromPerson.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "all" || movement.status === selectedStatus;
      const matchesType = selectedType === "all" || movement.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }

  onMount(() => {
    document.title = "Movement & Lending - Assets Management";
  });

  function formatDate(dateString) {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-IN");
  }

  function getStatusColor(status) {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "returned":
        return "bg-green-100 text-green-800 border-green-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getTypeColor(type) {
    switch (type) {
      case "lending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "borrowing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "temporary_move":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case "lending":
        return "heroicons:arrow-right-circle";
      case "borrowing":
        return "heroicons:arrow-left-circle";
      case "temporary_move":
        return "heroicons:arrow-path";
      default:
        return "heroicons:arrows-right-left";
    }
  }

  function getDaysRemaining(expectedReturn, actualReturn, status) {
    if (actualReturn || status === "returned") return "Completed";
    if (!expectedReturn) return "No due date";

    const today = new Date();
    const due = new Date(expectedReturn);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days remaining`;
  }

  function addMovement() {
    // Add movement logic would go here
    showAddModal = false;
    // Reset form
    newMovement = {
      assetName: "",
      type: "lending",
      fromLocation: "",
      toLocation: "",
      fromPerson: "",
      toPerson: "",
      startDate: "",
      expectedReturn: "",
      reason: "",
      security: "",
      contact: "",
      notes: "",
      conditions: "",
    };
  }

  function getStatusIcon(status) {
    switch (status) {
      case "active":
        return "heroicons:clock";
      case "returned":
        return "heroicons:check-circle";
      case "overdue":
        return "heroicons:exclamation-triangle";
      default:
        return "heroicons:question-mark-circle";
    }
  }
</script>

<DashboardLayout>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white shadow-lg">
          <Icon icon="heroicons:arrow-right-circle" class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Movement & Lending</h1>
          <p class="text-gray-600 dark:text-gray-300">Track asset movements, loans, and location changes</p>
        </div>
      </div>
      <button class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        <span>Record Movement</span>
      </button>
    </div>

    <!-- View Tabs -->
    <div class="flex space-x-2">
      {#each views as view}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20'}" on:click={() => (currentView = view.id)}>
          <Icon icon={view.icon} class="w-4 h-4" />
          <span class="font-medium">{view.label}</span>
        </button>
      {/each}
    </div>

    <!-- Asset Movements View -->
    {#if currentView === "movements"}
      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Movements</label>
            <div class="relative">
              <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" bind:value={searchTerm} placeholder="Search by asset, person, or location..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select bind:value={selectedStatus} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <select bind:value={selectedType} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="all">All Types</option>
              <option value="lending">Lending</option>
              <option value="borrowing">Borrowing</option>
              <option value="temporary_move">Temporary Move</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Movement Records -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each filteredMovements as movement}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
            <div class="p-6">
              <!-- Movement Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-start space-x-3">
                  <div class="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                    <Icon icon={getTypeIcon(movement.type)} class="w-6 h-6" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">{movement.assetName}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{movement.tamilName}</p>
                    <div class="flex items-center space-x-2 mt-2">
                      <span class="px-2 py-1 text-xs font-medium border rounded-full {getTypeColor(movement.type)} capitalize">
                        {movement.type.replace("_", " ")}
                      </span>
                      <span class="px-2 py-1 text-xs font-medium border rounded-full {getStatusColor(movement.status)}">
                        <Icon icon={getStatusIcon(movement.status)} class="w-3 h-3 inline mr-1" />
                        {movement.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="text-right">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {getDaysRemaining(movement.expectedReturn, movement.actualReturn, movement.status)}
                  </p>
                  {#if movement.status === "overdue"}
                    <p class="text-xs text-red-600 dark:text-red-400 font-medium">Action required</p>
                  {/if}
                </div>
              </div>

              <!-- Movement Path -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between">
                  <div class="text-center flex-1">
                    <div class="p-2 bg-white dark:bg-gray-600 rounded-lg inline-block mb-2">
                      <Icon icon="heroicons:map-pin" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{movement.fromLocation}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{movement.fromPerson}</p>
                  </div>

                  <div class="px-4">
                    <Icon icon="heroicons:arrow-right" class="w-6 h-6 text-gray-400" />
                  </div>

                  <div class="text-center flex-1">
                    <div class="p-2 bg-white dark:bg-gray-600 rounded-lg inline-block mb-2">
                      <Icon icon="heroicons:map-pin" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{movement.toLocation}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{movement.toPerson}</p>
                  </div>
                </div>
              </div>

              <!-- Movement Details -->
              <div class="space-y-3 text-sm">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-600 dark:text-gray-400 mb-1">Start Date:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{formatDate(movement.startDate)}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 dark:text-gray-400 mb-1">Expected Return:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{formatDate(movement.expectedReturn)}</p>
                  </div>
                </div>

                {#if movement.actualReturn}
                  <div>
                    <p class="text-gray-600 dark:text-gray-400 mb-1">Actual Return:</p>
                    <p class="font-medium text-green-600">{formatDate(movement.actualReturn)}</p>
                  </div>
                {/if}

                <div>
                  <p class="text-gray-600 dark:text-gray-400 mb-1">Reason:</p>
                  <p class="text-gray-900 dark:text-white">{movement.reason}</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-600 dark:text-gray-400 mb-1">Security:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{movement.security}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 dark:text-gray-400 mb-1">Contact:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{movement.contact}</p>
                  </div>
                </div>

                {#if movement.conditions}
                  <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p class="text-yellow-800 dark:text-yellow-300 text-sm">
                      <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 inline mr-1" />
                      {movement.conditions}
                    </p>
                  </div>
                {/if}

                {#if movement.notes}
                  <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-gray-600 dark:text-gray-400">{movement.notes}</p>
                  </div>
                {/if}
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-2 mt-6">
                {#if movement.status === "active"}
                  <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Mark Returned </button>
                  <button class="flex-1 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"> Extend Due Date </button>
                {:else if movement.status === "overdue"}
                  <button class="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"> Follow Up </button>
                  <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Mark Returned </button>
                {:else}
                  <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> View Details </button>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Loans & Borrowing View -->
    {:else if currentView === "lending"}
      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Items Lent Out</p>
              <p class="text-2xl font-bold text-orange-600">{movementData.filter((m) => m.type === "lending" && m.status === "active").length}</p>
            </div>
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Icon icon="heroicons:arrow-right-circle" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Items Borrowed</p>
              <p class="text-2xl font-bold text-purple-600">{movementData.filter((m) => m.type === "borrowing" && m.status === "active").length}</p>
            </div>
            <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Icon icon="heroicons:arrow-left-circle" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Overdue Items</p>
              <p class="text-2xl font-bold text-red-600">{movementData.filter((m) => m.status === "overdue").length}</p>
            </div>
            <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p class="text-2xl font-bold text-green-600">{movementData.filter((m) => m.status === "returned").length}</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Active Transactions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Active Loans & Borrowings</h3>
        <div class="space-y-4">
          {#each movementData.filter((m) => m.status === "active" || m.status === "overdue") as movement}
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                  <Icon icon={getTypeIcon(movement.type)} class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{movement.assetName}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {movement.type === "lending" ? "Lent to" : "Borrowed from"}: {movement.type === "lending" ? movement.toPerson : movement.fromPerson}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium {movement.status === 'overdue' ? 'text-red-600' : 'text-gray-900 dark:text-white'}">
                  {getDaysRemaining(movement.expectedReturn, movement.actualReturn, movement.status)}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Due: {formatDate(movement.expectedReturn)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Location Tracking View -->
    {:else if currentView === "tracking"}
      <div class="space-y-6">
        {#each locationTracking as location}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{location.assetName}</h3>
                <div class="flex items-center space-x-2 mt-2">
                  <Icon icon="heroicons:map-pin" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">{location.currentLocation}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                <p class="font-medium text-gray-900 dark:text-white">{formatDate(location.lastUpdated)}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Next Review: {formatDate(location.nextReview)}</p>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent Access Log</h4>
              <div class="space-y-2">
                {#each location.accessLog as log}
                  <div class="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div class="flex items-center space-x-2">
                      <Icon icon="heroicons:clock" class="w-4 h-4 text-gray-400" />
                      <span class="text-gray-900 dark:text-white">{log.purpose}</span>
                    </div>
                    <div class="text-right">
                      <p class="text-gray-600 dark:text-gray-400">{log.person}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500">{formatDate(log.date)}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <div class="flex space-x-2 mt-6">
              <button class="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Update Location </button>
              <button class="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Log Access </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</DashboardLayout>

<!-- Add Movement Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Record Asset Movement</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addMovement} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asset Name *</label>
              <input type="text" bind:value={newMovement.assetName} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Honda Activa 6G" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Movement Type *</label>
              <select bind:value={newMovement.type} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="lending">Lending (giving to someone)</option>
                <option value="borrowing">Borrowing (taking from someone)</option>
                <option value="temporary_move">Temporary Move</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Location *</label>
              <input type="text" bind:value={newMovement.fromLocation} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Home Garage" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Location *</label>
              <input type="text" bind:value={newMovement.toLocation} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Brother's House (Tambaram)" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Person *</label>
              <input type="text" bind:value={newMovement.fromPerson} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Self" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Person *</label>
              <input type="text" bind:value={newMovement.toPerson} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Arjun Krishna (Brother)" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date *</label>
              <input type="date" bind:value={newMovement.startDate} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Return</label>
              <input type="date" bind:value={newMovement.expectedReturn} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason *</label>
              <input type="text" bind:value={newMovement.reason} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Brother's vehicle under repair, temporary loan" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Security/Agreement</label>
              <input type="text" bind:value={newMovement.security} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Verbal agreement, Written contract, Deposit taken" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
              <input type="tel" bind:value={newMovement.contact} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="+91 98765 43210" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conditions</label>
              <textarea bind:value={newMovement.conditions} rows="2" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Any conditions or terms of the movement..."></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea bind:value={newMovement.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Any additional notes about the movement..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"> Record Movement </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
