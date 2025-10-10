<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  let activeSection = "dashboard";

  // Calculate current section info
  $: currentSection = AssetSections.find((s) => s.id === activeSection);

  // Handle URL-based section routing
  $: {
    const path = $page.url.pathname;
    if (path.startsWith("/assets/")) {
      const section = path.split("/")[2];
      if (section && AssetSections.find((s) => s.id === section)) {
        activeSection = section;
      }
    }
  }

  function switchSection(sectionId) {
    activeSection = sectionId;
    window.history.pushState({}, "", `/assets/${sectionId}`);
  }

  let searchTerm = "";
  let selectedCategory = "all";

  const sections = [
    { id: "overview", label: "Asset Overview", icon: "heroicons:squares-2x2", color: "text-blue-500" },
    { id: "items", label: "Physical Assets", icon: "heroicons:cube", color: "text-green-500" },
    { id: "documents", label: "Documents & Ownership", icon: "heroicons:document-text", color: "text-purple-500" },
    { id: "maintenance", label: "Maintenance & Service", icon: "heroicons:wrench-screwdriver", color: "text-orange-500" },
    { id: "value", label: "Asset Value", icon: "heroicons:currency-rupee", color: "text-yellow-500" },
    { id: "heirlooms", label: "Heirloom & Legacy", icon: "heroicons:heart", color: "text-red-500" },
    { id: "movement", label: "Movement & Lending", icon: "heroicons:arrow-path", color: "text-indigo-500" },
    { id: "disposal", label: "Disposal & Recycling", icon: "heroicons:trash", color: "text-gray-500" },
  ];

  // Asset Sections for navigation
  const AssetSections = [
    {
      id: "dashboard",
      name: "Dashboard",
      tamil: "டாஷ்போர்டு",
      icon: "heroicons:home",
      description: "Overview & Analytics",
    },
    {
      id: "items",
      name: "Items",
      tamil: "பொருட்கள்",
      icon: "heroicons:cube",
      description: "Physical Assets",
    },
    {
      id: "documents",
      name: "Documents",
      tamil: "ஆவணங்கள்",
      icon: "heroicons:document-text",
      description: "Ownership & Papers",
    },
    {
      id: "maintenance",
      name: "Maintenance",
      tamil: "பராமரிப்பு",
      icon: "heroicons:wrench-screwdriver",
      description: "Service & Repairs",
    },
    {
      id: "value",
      name: "Value",
      tamil: "மதிப்பு",
      icon: "heroicons:currency-rupee",
      description: "Asset Valuation",
    },
    {
      id: "inventory",
      name: "Inventory",
      tamil: "சரக்கு",
      icon: "heroicons:archive-box",
      description: "Home Inventory",
    },
    {
      id: "vehicles",
      name: "Vehicles",
      tamil: "வாகனங்கள்",
      icon: "heroicons:truck",
      description: "Vehicle Management",
    },
  ];

  const assetCategories = [
    { id: "furniture", name: "Furniture", icon: "heroicons:home", items: ["Cot", "Dining table", "Pooja shelf", "Study desk", "Almirah"] },
    { id: "appliances", name: "Appliances", icon: "heroicons:cpu-chip", items: ["Fridge", "Washing machine", "Grinder", "Mixie", "AC", "Fan", "Geyser"] },
    { id: "electronics", name: "Electronics", icon: "heroicons:device-phone-mobile", items: ["TV", "Laptop", "Mobile phones", "Tablets", "Printer"] },
    { id: "kitchenware", name: "Kitchenware", icon: "heroicons:archive-box", items: ["Pressure cooker", "Kadai", "Idli stand", "Brass vessels", "Silver pooja items"] },
    { id: "vehicles", name: "Vehicles", icon: "heroicons:truck", items: ["Scooter", "Car", "Bicycle", "Auto"] },
    { id: "tools", name: "Tools", icon: "heroicons:wrench", items: ["Screwdriver set", "Ladder", "Garden hose", "Sewing machine"] },
    { id: "decor", name: "Decor & Rituals", icon: "heroicons:star", items: ["Lamps", "Kolam plates", "Framed photos", "Pooja items"] },
  ];

  const recentActivity = [
    { type: "maintenance", message: "AC service scheduled for next week", time: "2 hours ago", icon: "heroicons:wrench-screwdriver", color: "text-orange-500" },
    { type: "document", message: "Fridge warranty expiring in 2 months", time: "1 day ago", icon: "heroicons:exclamation-triangle", color: "text-yellow-500" },
    { type: "movement", message: "Study table moved to upstairs bedroom", time: "3 days ago", icon: "heroicons:arrow-path", color: "text-blue-500" },
    { type: "heirloom", message: "Added Paati's brass lamp to heirloom collection", time: "1 week ago", icon: "heroicons:heart", color: "text-red-500" },
  ];

  const upcomingTasks = [
    { task: "Service washing machine", due: "Next week", priority: "medium" },
    { task: "Renew vehicle insurance", due: "2 months", priority: "high" },
    { task: "Oil ceiling fans", due: "1 month", priority: "low" },
    { task: "Update scooter RC", due: "3 months", priority: "medium" },
  ];

  let totalAssets = 156;
  let totalValue = 850000;
  let pendingMaintenance = 8;
  let expiringDocuments = 3;

  onMount(() => {
    document.title = "Assets Management - Home Asset Management Suite";
  });

  function setActiveSection(section) {
    currentSection = section;
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
</script>

<!-- Family Asset Management Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-purple-100 p-3 rounded-lg">
            <Icon icon="heroicons:building-storefront" class="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Family Asset Management Suite</h1>
            <p class="text-lg text-gray-600">குடும்ப சொத்து மேலாண்மை தொகுப்பு</p>
            <p class="text-sm text-gray-500">Comprehensive asset tracking for South Indian families</p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="flex space-x-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">{totalAssets}</div>
            <div class="text-sm text-gray-500">Total Assets</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">₹{totalValue.toLocaleString()}</div>
            <div class="text-sm text-gray-500">Total Value</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">{pendingMaintenance}</div>
            <div class="text-sm text-gray-500">Pending Service</div>
          </div>
        </div>
      </div>

      <!-- Section Navigation -->
      <div class="flex flex-wrap gap-2">
        {#each AssetSections as section}
          <button on:click={() => switchSection(section.id)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {activeSection === section.id ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
            <Icon icon={section.icon} class="w-5 h-5" />
            <div class="text-left">
              <div class="font-medium">{section.name}</div>
              <div class="text-xs opacity-75">{section.tamil}</div>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:squares-2x2" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Assets Management</h1>
        <p class="text-gray-600 dark:text-gray-300">Track, preserve, and plan for everything that supports your family's life</p>
      </div>
    </div>
    <button class="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-green-600 transition-all shadow-lg flex items-center space-x-2">
      <Icon icon="heroicons:plus" class="w-5 h-5" />
      <span>Add Asset</span>
    </button>
  </div>

  <!-- Stats Overview -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{totalAssets}</p>
        </div>
        <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon icon="heroicons:cube" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">₹{totalValue.toLocaleString()}</p>
        </div>
        <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Maintenance</p>
          <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingMaintenance}</p>
        </div>
        <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <Icon icon="heroicons:wrench-screwdriver" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Documents</p>
          <p class="text-2xl font-bold text-red-600 dark:text-red-400">{expiringDocuments}</p>
        </div>
        <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Tabs -->
  <div class="flex flex-wrap gap-2 mb-6">
    {#each sections as section}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentSection === section.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20'}" on:click={() => setActiveSection(section.id)}>
        <Icon icon={section.icon} class="w-4 h-4 {currentSection === section.id ? 'text-white' : section.color}" />
        <span class="font-medium">{section.label}</span>
      </button>
    {/each}
  </div>

  <!-- Content Area -->
  {#if currentSection === "overview"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Asset Categories -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Asset Categories</h3>
        <div class="space-y-4">
          {#each assetCategories as category}
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Icon icon={category.icon} class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{category.items.length} items</p>
                  </div>
                </div>
                <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Recent Activity & Upcoming Tasks -->
      <div class="space-y-6">
        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
          <div class="space-y-4">
            {#each recentActivity as activity}
              <div class="flex items-start space-x-3">
                <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Icon icon={activity.icon} class="w-4 h-4 {activity.color}" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Upcoming Tasks -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Tasks</h3>
          <div class="space-y-3">
            {#each upcomingTasks as task}
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{task.task}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Due: {task.due}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full border {getPriorityColor(task.priority)}">
                  {task.priority}
                </span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Other Sections Content -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="text-center">
        <div class="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 mx-auto mb-4">
          <Icon icon={sections.find((s) => s.id === currentSection)?.icon || "heroicons:squares-2x2"} class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {sections.find((s) => s.id === currentSection)?.label}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">This section is under development and will include comprehensive management tools.</p>

        {#if currentSection === "items"}
          <div class="text-left max-w-2xl mx-auto space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white">Will include:</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Complete asset inventory with photos and descriptions</li>
              <li>• Purchase details, warranty information, and current value</li>
              <li>• Location tracking within your home</li>
              <li>• Integration with existing vehicle and inventory systems</li>
              <li>• Smart categorization and search functionality</li>
            </ul>
          </div>
        {:else if currentSection === "documents"}
          <div class="text-left max-w-2xl mx-auto space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white">Will include:</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Digital storage of bills, warranties, and ownership proofs</li>
              <li>• Automatic expiry alerts and renewal reminders</li>
              <li>• Document scanning and OCR capabilities</li>
              <li>• Secure cloud backup and access controls</li>
            </ul>
          </div>
        {:else if currentSection === "maintenance"}
          <div class="text-left max-w-2xl mx-auto space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white">Will include:</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Automated maintenance schedules and reminders</li>
              <li>• Service history and vendor management</li>
              <li>• Cost tracking and budget planning</li>
              <li>• Performance monitoring and replacement suggestions</li>
            </ul>
          </div>
        {:else if currentSection === "heirlooms"}
          <div class="text-left max-w-2xl mx-auto space-y-4">
            <h4 class="font-semibold text-gray-900 dark:text-white">Will include:</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Emotional significance and family stories</li>
              <li>• Cultural and ritual importance tracking</li>
              <li>• Preservation tips and care instructions</li>
              <li>• Legacy planning and inheritance preparation</li>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
