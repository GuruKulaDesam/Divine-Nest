<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentView = "schedule";
  let searchTerm = "";
  let selectedStatus = "all";
  let showAddModal = false;

  const views = [
    { id: "schedule", label: "Service Schedule", icon: "heroicons:calendar-days" },
    { id: "history", label: "Service History", icon: "heroicons:clock" },
    { id: "vendors", label: "Vendor Directory", icon: "heroicons:user-group" },
  ];

  const maintenanceItems = [
    {
      id: 1,
      assetName: "Samsung Refrigerator",
      tamilName: "குளிர்சாதன பெட்டி",
      serviceType: "General Service",
      description: "Clean coils, check refrigerant, temperature calibration",
      dueDate: "2024-12-15",
      lastService: "2024-06-15",
      vendor: "Kumar Appliance Service",
      estimatedCost: 800,
      priority: "medium",
      status: "upcoming",
      notes: "Customer reported slight temperature fluctuation",
      frequency: "6 months",
    },
    {
      id: 2,
      assetName: "Honda Activa 6G",
      tamilName: "ஹோண்டா ஆக்டிவா",
      serviceType: "Regular Service",
      description: "Oil change, brake check, chain lubrication, general inspection",
      dueDate: "2024-11-30",
      lastService: "2024-08-30",
      vendor: "Rajesh Honda Service",
      estimatedCost: 1200,
      priority: "high",
      status: "overdue",
      notes: "Engine oil due for change. Brake pads at 70% wear.",
      frequency: "3 months",
    },
    {
      id: 3,
      assetName: "Ceiling Fans (4 units)",
      tamilName: "கூரை விசிறி",
      serviceType: "Oiling & Cleaning",
      description: "Oil motor bearings, clean blades, check mounting stability",
      dueDate: "2025-01-10",
      lastService: "2024-07-10",
      vendor: "Murugan Electrical",
      estimatedCost: 400,
      priority: "low",
      status: "upcoming",
      notes: "Annual maintenance for all bedroom and living room fans",
      frequency: "6 months",
    },
    {
      id: 4,
      assetName: "LG Washing Machine",
      tamilName: "துணி துவைக்கும் இயந்திரம்",
      serviceType: "Deep Clean Service",
      description: "Descaling, drum cleaning, filter replacement, pipe inspection",
      dueDate: "2024-11-25",
      lastService: "2024-05-25",
      vendor: "LG Service Center",
      estimatedCost: 1500,
      priority: "medium",
      status: "scheduled",
      notes: "6-month deep cleaning. Customer noticed mild odor recently.",
      frequency: "6 months",
    },
  ];

  const serviceHistory = [
    {
      id: 1,
      assetName: "Samsung AC - Living Room",
      serviceType: "Gas Refill & Service",
      serviceDate: "2024-09-15",
      vendor: "Cool Air Services",
      cost: 3500,
      rating: 5,
      technician: "Ravi Kumar",
      workDone: "Gas refill, coil cleaning, filter replacement, thermostat calibration",
      nextDue: "2025-03-15",
      invoiceNumber: "CAS-2024-0234",
    },
    {
      id: 2,
      assetName: "Water Purifier",
      serviceType: "Filter Replacement",
      serviceDate: "2024-08-20",
      vendor: "AquaGuard Service",
      cost: 2200,
      rating: 4,
      technician: "Suresh",
      workDone: "Replaced all 4 filters, UV lamp check, TDS calibration",
      nextDue: "2025-02-20",
      invoiceNumber: "AGS-2024-0156",
    },
    {
      id: 3,
      assetName: "Grinder - Kitchen",
      serviceType: "Stone Servicing",
      serviceDate: "2024-07-30",
      vendor: "Traditional Grinder Works",
      cost: 800,
      rating: 5,
      technician: "Mani",
      workDone: "Stone repolishing, motor bearing service, blade sharpening",
      nextDue: "2025-01-30",
      invoiceNumber: "TGW-2024-0089",
    },
  ];

  const vendors = [
    {
      id: 1,
      name: "Kumar Appliance Service",
      specialization: "Refrigerators, Washing Machines",
      phone: "+91 98765 43210",
      address: "12, Gandhi Street, T.Nagar, Chennai",
      rating: 4.5,
      experience: "15 years",
      certifications: ["Samsung Authorized", "LG Certified"],
      pricing: "₹500-2000",
      availability: "Mon-Sat, 9 AM - 6 PM",
      notes: "Very reliable for major appliances. Speaks Tamil and English.",
    },
    {
      id: 2,
      name: "Rajesh Honda Service",
      specialization: "Honda Vehicles, Two-wheelers",
      phone: "+91 87654 32109",
      address: "45, Anna Salai, Guindy, Chennai",
      rating: 4.8,
      experience: "12 years",
      certifications: ["Honda Authorized Service Center"],
      pricing: "₹800-3000",
      availability: "Mon-Sun, 8 AM - 8 PM",
      notes: "Official Honda service center. Genuine parts guaranteed.",
    },
    {
      id: 3,
      name: "Murugan Electrical",
      specialization: "Fans, Lights, Electrical Repairs",
      phone: "+91 76543 21098",
      address: "8, Bharathi Street, Mylapore, Chennai",
      rating: 4.2,
      experience: "20 years",
      certifications: ["Electrical License"],
      pricing: "₹200-1000",
      availability: "Mon-Sat, 10 AM - 7 PM",
      notes: "Local electrician. Good for routine electrical maintenance.",
    },
  ];

  let filteredItems = maintenanceItems;
  let newMaintenanceItem = {
    assetName: "",
    serviceType: "",
    description: "",
    dueDate: "",
    vendor: "",
    estimatedCost: "",
    priority: "medium",
    frequency: "",
    notes: "",
  };

  $: {
    filteredItems = maintenanceItems.filter((item) => {
      const matchesSearch = item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || item.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) || item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  onMount(() => {
    document.title = "Maintenance & Service - Assets Management";
  });

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

  function getStatusColor(status) {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "scheduled":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

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

  function getDaysUntilDue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function addMaintenanceItem() {
    // Add maintenance item logic would go here
    showAddModal = false;
    // Reset form
    newMaintenanceItem = {
      assetName: "",
      serviceType: "",
      description: "",
      dueDate: "",
      vendor: "",
      estimatedCost: "",
      priority: "medium",
      frequency: "",
      notes: "",
    };
  }

  function getRatingStars(rating) {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:wrench-screwdriver" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Maintenance & Service</h1>
        <p class="text-gray-600 dark:text-gray-300">Schedule, track, and manage asset maintenance</p>
      </div>
    </div>
    <button class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
      <Icon icon="heroicons:plus" class="w-5 h-5" />
      <span>Schedule Service</span>
    </button>
  </div>

  <!-- View Tabs -->
  <div class="flex space-x-2">
    {#each views as view}
      <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentView === view.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-orange-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20'}" on:click={() => (currentView = view.id)}>
        <Icon icon={view.icon} class="w-4 h-4" />
        <span class="font-medium">{view.label}</span>
      </button>
    {/each}
  </div>

  <!-- Service Schedule View -->
  {#if currentView === "schedule"}
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Services</label>
          <div class="relative">
            <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" bind:value={searchTerm} placeholder="Search by asset, service type, or vendor..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <select bind:value={selectedStatus} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white">
            <option value="all">All Status</option>
            <option value="overdue">Overdue</option>
            <option value="upcoming">Upcoming</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Maintenance Items -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each filteredItems as item}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
          <div class="p-6">
            <!-- Item Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{item.assetName}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{item.tamilName}</p>
                <p class="text-sm font-medium text-orange-600 dark:text-orange-400 mt-1">{item.serviceType}</p>
                <div class="flex items-center space-x-2 mt-2">
                  <span class="px-2 py-1 text-xs font-medium border rounded-full {getPriorityColor(item.priority)}">
                    {item.priority} priority
                  </span>
                  <span class="px-2 py-1 text-xs font-medium border rounded-full {getStatusColor(item.status)}">
                    {item.status}
                  </span>
                </div>
              </div>

              <div class="text-right">
                <p class="text-sm text-gray-600 dark:text-gray-400">Due in</p>
                <p class="text-2xl font-bold {getDaysUntilDue(item.dueDate) < 0 ? 'text-red-600' : getDaysUntilDue(item.dueDate) <= 7 ? 'text-orange-600' : 'text-green-600'}">
                  {Math.abs(getDaysUntilDue(item.dueDate))}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {getDaysUntilDue(item.dueDate) < 0 ? "days ago" : "days"}
                </p>
              </div>
            </div>

            <!-- Item Details -->
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Service Description:</p>
                <p class="text-sm text-gray-900 dark:text-white">{item.description}</p>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Vendor:</span>
                <span class="font-medium text-gray-900 dark:text-white">{item.vendor}</span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Estimated Cost:</span>
                <span class="font-medium text-gray-900 dark:text-white">{formatCurrency(item.estimatedCost)}</span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Due Date:</span>
                <span class="font-medium text-gray-900 dark:text-white">{formatDate(item.dueDate)}</span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Frequency:</span>
                <span class="font-medium text-gray-900 dark:text-white">{item.frequency}</span>
              </div>

              {#if item.notes}
                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-sm text-gray-600 dark:text-gray-400">{item.notes}</p>
                </div>
              {/if}
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2 mt-6">
              <button class="flex-1 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50"> Schedule </button>
              <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Contact Vendor </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Service History View -->
  {:else if currentView === "history"}
    <div class="space-y-6">
      {#each serviceHistory as service}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">{service.assetName}</h3>
              <p class="text-sm font-medium text-green-600 dark:text-green-400">{service.serviceType}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Serviced on {formatDate(service.serviceDate)}</p>
            </div>
            <div class="text-right">
              <div class="text-yellow-500 text-lg mb-1">{getRatingStars(service.rating)}</div>
              <p class="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(service.cost)}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Vendor:</p>
              <p class="font-medium text-gray-900 dark:text-white">{service.vendor}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Technician:</p>
              <p class="font-medium text-gray-900 dark:text-white">{service.technician}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Invoice Number:</p>
              <p class="font-mono text-gray-900 dark:text-white">{service.invoiceNumber}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400 mb-1">Next Service Due:</p>
              <p class="font-medium text-gray-900 dark:text-white">{formatDate(service.nextDue)}</p>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-gray-600 dark:text-gray-400 mb-1">Work Done:</p>
            <p class="text-sm text-gray-900 dark:text-white">{service.workDone}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Vendors Directory View -->
  {:else if currentView === "vendors"}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each vendors as vendor}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">{vendor.name}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{vendor.specialization}</p>
              <div class="flex items-center space-x-2 mt-2">
                <div class="text-yellow-500">{getRatingStars(vendor.rating)}</div>
                <span class="text-sm text-gray-600 dark:text-gray-400">({vendor.rating})</span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{vendor.pricing}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{vendor.experience}</p>
            </div>
          </div>

          <div class="space-y-3 text-sm">
            <div class="flex items-center space-x-2">
              <Icon icon="heroicons:phone" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-900 dark:text-white">{vendor.phone}</span>
            </div>

            <div class="flex items-start space-x-2">
              <Icon icon="heroicons:map-pin" class="w-4 h-4 text-gray-400 mt-0.5" />
              <span class="text-gray-900 dark:text-white flex-1">{vendor.address}</span>
            </div>

            <div class="flex items-center space-x-2">
              <Icon icon="heroicons:clock" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-900 dark:text-white">{vendor.availability}</span>
            </div>

            {#if vendor.certifications.length > 0}
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">Certifications:</p>
                <div class="flex flex-wrap gap-1">
                  {#each vendor.certifications as cert}
                    <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">{cert}</span>
                  {/each}
                </div>
              </div>
            {/if}

            {#if vendor.notes}
              <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p class="text-gray-600 dark:text-gray-400">{vendor.notes}</p>
              </div>
            {/if}
          </div>

          <div class="flex space-x-2 mt-6">
            <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Call Now </button>
            <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Schedule Service </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Maintenance Item Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Schedule New Service</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addMaintenanceItem} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asset Name *</label>
              <input type="text" bind:value={newMaintenanceItem.assetName} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Samsung Refrigerator" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type *</label>
              <input type="text" bind:value={newMaintenanceItem.serviceType} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., General Service, Oil Change" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Description *</label>
              <textarea bind:value={newMaintenanceItem.description} required rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="Describe what needs to be done..."></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date *</label>
              <input type="date" bind:value={newMaintenanceItem.dueDate} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vendor *</label>
              <input type="text" bind:value={newMaintenanceItem.vendor} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Kumar Appliance Service" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Cost (₹) *</label>
              <input type="number" bind:value={newMaintenanceItem.estimatedCost} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="1500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
              <select bind:value={newMaintenanceItem.priority} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
              <input type="text" bind:value={newMaintenanceItem.frequency} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., 6 months, 1 year, Quarterly" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea bind:value={newMaintenanceItem.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white" placeholder="Any additional notes or special instructions..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"> Schedule Service </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
