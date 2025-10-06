<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../../src/lib/data/database.js";

  let currentTab = "overview";
  let selectedVehicle = "splendor";
  let showAddVehicle = false;
  let showFuelEntry = false;
  let vehicles = [];

  const tabs = [
    { id: "overview", label: "Vehicle Overview", icon: "heroicons:truck" },
    { id: "maintenance", label: "Service & Maintenance", icon: "heroicons:wrench-screwdriver" },
    { id: "fuel", label: "Fuel & Usage", icon: "heroicons:fire" },
    { id: "documents", label: "Documents & Insurance", icon: "heroicons:document-text" },
    { id: "expenses", label: "Expenses & Analytics", icon: "heroicons:chart-bar" },
  ];

  // Comprehensive Vehicle Data for South Indian Family
  const vehicleData = {
    splendor: {
      id: "splendor",
      name: "Hero Splendor Plus",
      type: "bike",
      make: "Hero MotoCorp",
      model: "Splendor Plus",
      year: 2021,
      registration: "TN 09 AB 1234",
      color: "Black",
      purchaseDate: "2021-03-15",
      purchasePrice: "₹68,000",
      currentValue: "₹45,000",
      assignedTo: ["Appa", "Thambi"],
      primaryUser: "Appa",
      mileage: "65 kmpl",
      engineCapacity: "97.2 cc",
      fuelType: "Petrol",
      currentOdometer: "32,450 km",
      culturalNote: "Reliable workhorse for daily office commute and local errands",
      lastService: {
        date: "2024-01-05",
        type: "Regular Service",
        cost: "₹1,200",
        nextDue: "2024-04-05",
        vendor: "Hero Service Center",
      },
      insurance: {
        provider: "HDFC ERGO",
        policyNumber: "HDFC123456789",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        premium: "₹2,500",
        coverage: "Comprehensive",
        status: "Active",
      },
      documents: {
        rc: { status: "Valid", expiry: "2031-03-15" },
        insurance: { status: "Valid", expiry: "2024-12-31" },
        puc: { status: "Valid", expiry: "2024-07-15" },
        license: { holder: "Appa", expiry: "2029-08-20" },
      },
      recentFuelEntries: [
        { date: "2024-01-12", amount: "₹300", liters: "4.2", odometer: "32,450", mileage: "62 kmpl" },
        { date: "2024-01-05", amount: "₹280", liters: "3.9", odometer: "32,200", mileage: "64 kmpl" },
        { date: "2023-12-28", amount: "₹320", liters: "4.5", odometer: "31,950", mileage: "61 kmpl" },
      ],
      monthlyExpenses: [
        { month: "January 2024", fuel: "₹1,200", service: "₹1,200", insurance: "₹0", total: "₹2,400" },
        { month: "December 2023", fuel: "₹1,100", service: "₹0", insurance: "₹2,500", total: "₹3,600" },
        { month: "November 2023", fuel: "₹1,050", service: "₹450", insurance: "₹0", total: "₹1,500" },
      ],
      issues: [],
      preferences: {
        fuelStation: "Indian Oil - Anna Nagar",
        serviceCenter: "Hero Service Center - Coimbatore",
        mechanic: "Kumar Mechanics - Ph: 98765 43210",
      },
    },
    activa: {
      id: "activa",
      name: "Honda Activa 6G",
      type: "scooter",
      make: "Honda",
      model: "Activa 6G",
      year: 2022,
      registration: "TN 09 CD 5678",
      color: "Pearl White",
      purchaseDate: "2022-08-20",
      purchasePrice: "₹75,000",
      currentValue: "₹55,000",
      assignedTo: ["Amma", "Akka"],
      primaryUser: "Amma",
      mileage: "50 kmpl",
      engineCapacity: "109.51 cc",
      fuelType: "Petrol",
      currentOdometer: "15,650 km",
      culturalNote: "Perfect for Amma's temple visits, market shopping, and Akka's college",
      lastService: {
        date: "2023-12-20",
        type: "Regular Service",
        cost: "₹1,800",
        nextDue: "2024-03-20",
        vendor: "Honda Authorized Service",
      },
      insurance: {
        provider: "Bajaj Allianz",
        policyNumber: "BA987654321",
        startDate: "2023-08-20",
        endDate: "2024-08-20",
        premium: "₹3,200",
        coverage: "Comprehensive",
        status: "Active",
      },
      documents: {
        rc: { status: "Valid", expiry: "2032-08-20" },
        insurance: { status: "Valid", expiry: "2024-08-20" },
        puc: { status: "Valid", expiry: "2024-06-20" },
        license: { holder: "Amma", expiry: "2027-03-15" },
      },
      recentFuelEntries: [
        { date: "2024-01-10", amount: "₹250", liters: "3.5", odometer: "15,650", mileage: "48 kmpl" },
        { date: "2024-01-03", amount: "₹200", liters: "2.8", odometer: "15,480", mileage: "52 kmpl" },
        { date: "2023-12-25", amount: "₹300", liters: "4.2", odometer: "15,300", mileage: "49 kmpl" },
      ],
      monthlyExpenses: [
        { month: "January 2024", fuel: "₹800", service: "₹0", insurance: "₹0", total: "₹800" },
        { month: "December 2023", fuel: "₹750", service: "₹1,800", insurance: "₹0", total: "₹2,550" },
        { month: "November 2023", fuel: "₹700", service: "₹0", insurance: "₹0", total: "₹700" },
      ],
      issues: [{ date: "2024-01-08", issue: "Slight vibration in handle", status: "To be checked", priority: "Low" }],
      preferences: {
        fuelStation: "HP Petrol Pump - RS Puram",
        serviceCenter: "Honda Authorized Service - Gandhipuram",
        mechanic: "Raja Honda Service - Ph: 98765 54321",
      },
    },
    car: {
      id: "car",
      name: "Maruti Swift Dzire",
      type: "car",
      make: "Maruti Suzuki",
      model: "Swift Dzire VXI",
      year: 2019,
      registration: "TN 09 EF 9012",
      color: "Silver",
      purchaseDate: "2019-11-10",
      purchasePrice: "₹8,50,000",
      currentValue: "₹5,20,000",
      assignedTo: ["Appa", "Family trips"],
      primaryUser: "Appa",
      mileage: "22 kmpl",
      engineCapacity: "1197 cc",
      fuelType: "Petrol",
      currentOdometer: "65,200 km",
      culturalNote: "Family car for long trips, temple visits, and special occasions",
      lastService: {
        date: "2023-12-15",
        type: "Major Service + AC Repair",
        cost: "₹8,500",
        nextDue: "2024-03-15",
        vendor: "Maruti Authorized Service Center",
      },
      insurance: {
        provider: "ICICI Lombard",
        policyNumber: "ICICI789123456",
        startDate: "2023-11-10",
        endDate: "2024-11-10",
        premium: "₹12,500",
        coverage: "Comprehensive + Zero Depreciation",
        status: "Active",
      },
      documents: {
        rc: { status: "Valid", expiry: "2029-11-10" },
        insurance: { status: "Valid", expiry: "2024-11-10" },
        puc: { status: "Valid", expiry: "2024-05-15" },
        license: { holder: "Appa", expiry: "2029-08-20" },
      },
      recentFuelEntries: [
        { date: "2024-01-08", amount: "₹2,000", liters: "28", odometer: "65,200", mileage: "21 kmpl" },
        { date: "2023-12-30", amount: "₹1,500", liters: "21", odometer: "64,780", mileage: "23 kmpl" },
        { date: "2023-12-15", amount: "₹1,800", liters: "25", odometer: "64,320", mileage: "22 kmpl" },
      ],
      monthlyExpenses: [
        { month: "January 2024", fuel: "₹3,500", service: "₹0", insurance: "₹0", total: "₹3,500" },
        { month: "December 2023", fuel: "₹4,200", service: "₹8,500", insurance: "₹12,500", total: "₹25,200" },
        { month: "November 2023", fuel: "₹3,800", service: "₹1,200", insurance: "₹0", total: "₹5,000" },
      ],
      issues: [
        { date: "2024-01-06", issue: "AC not cooling properly", status: "Repaired", priority: "High" },
        { date: "2023-12-20", issue: "Brake pads replacement needed", status: "Completed", priority: "High" },
      ],
      preferences: {
        fuelStation: "Indian Oil - Avinashi Road",
        serviceCenter: "Maruti Service Center - Peelamedu",
        mechanic: "Ganesh Auto Works - Ph: 98765 67890",
      },
    },
    cycle: {
      id: "cycle",
      name: "Hero Ranger DTB",
      type: "cycle",
      make: "Hero",
      model: "Ranger DTB",
      year: 2023,
      registration: "N/A",
      color: "Blue & Black",
      purchaseDate: "2023-04-25",
      purchasePrice: "₹8,500",
      currentValue: "₹6,000",
      assignedTo: ["Thambi"],
      primaryUser: "Thambi",
      mileage: "N/A",
      engineCapacity: "N/A",
      fuelType: "Human Power",
      currentOdometer: "N/A",
      culturalNote: "Thambi's school transport and evening play companion",
      lastService: {
        date: "2023-12-01",
        type: "Chain Oiling & Brake Adjustment",
        cost: "₹200",
        nextDue: "2024-06-01",
        vendor: "Local Cycle Shop",
      },
      insurance: {
        provider: "N/A",
        policyNumber: "N/A",
        status: "Not Required",
      },
      documents: {
        purchase: { status: "Valid", note: "Purchase receipt available" },
      },
      recentFuelEntries: [],
      monthlyExpenses: [
        { month: "January 2024", maintenance: "₹0", total: "₹0" },
        { month: "December 2023", maintenance: "₹200", total: "₹200" },
        { month: "November 2023", maintenance: "₹150", total: "₹150" },
      ],
      issues: [],
      preferences: {
        serviceShop: "Murugan Cycle Works - Ph: 98765 98765",
        spareShop: "City Cycle Store - Gandhipuram",
      },
    },
  };

  function getCurrentVehicle() {
    return vehicleData[selectedVehicle];
  }

  function getVehicleTypeIcon(type) {
    const icons = {
      bike: "heroicons:bolt",
      scooter: "heroicons:fire",
      car: "heroicons:truck",
      cycle: "heroicons:heart",
      auto: "heroicons:cube",
    };
    return icons[type] || "heroicons:truck";
  }

  function getVehicleTypeColor(type) {
    const colors = {
      bike: "from-blue-500 to-indigo-500",
      scooter: "from-pink-500 to-rose-500",
      car: "from-green-500 to-emerald-500",
      cycle: "from-orange-500 to-amber-500",
      auto: "from-purple-500 to-violet-500",
    };
    return colors[type] || "from-gray-500 to-gray-600";
  }

  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case "active":
      case "valid":
        return "text-green-600 bg-green-100";
      case "expired":
      case "invalid":
        return "text-red-600 bg-red-100";
      case "expiring soon":
        return "text-yellow-600 bg-yellow-100";
      case "to be checked":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function getPriorityColor(priority) {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function isDocumentExpiringSoon(expiryDate) {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  }

  function calculateAverageMileage(vehicle) {
    if (!vehicle.recentFuelEntries || vehicle.recentFuelEntries.length === 0) return "N/A";
    const totalMileage = vehicle.recentFuelEntries.reduce((sum, entry) => {
      return sum + parseFloat(entry.mileage.replace(" kmpl", ""));
    }, 0);
    return (totalMileage / vehicle.recentFuelEntries.length).toFixed(1) + " kmpl";
  }

  function getVehicleStats() {
    const allVehicles = Object.values(vehicleData);
    return {
      total: allVehicles.length,
      motorized: allVehicles.filter((v) => v.type !== "cycle").length,
      needsService: allVehicles.filter((v) => {
        if (!v.lastService?.nextDue) return false;
        const nextDue = new Date(v.lastService.nextDue);
        const today = new Date();
        return nextDue <= today;
      }).length,
      hasIssues: allVehicles.filter((v) => v.issues && v.issues.length > 0).length,
    };
  }

  onMount(() => {
    document.title = "Vehicle Management - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-violet-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl text-white">
            <Icon icon="heroicons:truck" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Vehicle Management</h1>
            <p class="text-gray-600 dark:text-gray-300">वाहन प्रबन्धन | Complete tracking of family vehicles and maintenance</p>
          </div>
        </div>
        <button class="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors" on:click={() => (showAddVehicle = true)}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          <span>Add Vehicle</span>
        </button>
      </div>

      <!-- Vehicle Philosophy -->
      <div class="bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:truck" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">यात्रा सुरक्षा | Travel Safety & Maintenance</h3>
            <p class="text-white/90">"यानं यत्र यात्राय तत्र सर्वं सुरक्षितम् | Where the vehicle is well-maintained, all journeys are safe. Regular care of our vehicles ensures family safety and smooth travels."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "வாகன பராமரிப்பு குடும்ப பாதுகாப்பு - நல்ல பழக்கம் நல்ல பலன்"</p>
          </div>
        </div>
      </div>

      <!-- Vehicle Stats -->
      {#if true}
        {@const stats = getVehicleStats()}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Vehicles</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-green-600">{stats.motorized}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Motorized</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-orange-600">{stats.needsService}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Service Due</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div class="text-2xl font-bold text-red-600">{stats.hasIssues}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Has Issues</div>
          </div>
        </div>
      {/if}

      <!-- Vehicle Selector -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {#each Object.entries(vehicleData) as [vehicleId, vehicle]}
          <button class="relative p-4 rounded-xl transition-all duration-200 border-2 {selectedVehicle === vehicleId ? 'border-blue-500 shadow-lg transform scale-105' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'} bg-white dark:bg-gray-800" on:click={() => (selectedVehicle = vehicleId)}>
            <div class="text-center">
              <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br {getVehicleTypeColor(vehicle.type)} flex items-center justify-center text-white">
                <Icon icon={getVehicleTypeIcon(vehicle.type)} class="w-6 h-6" />
              </div>
              <h3 class="font-bold text-gray-900 dark:text-white text-sm">{vehicle.make} {vehicle.model}</h3>
              <p class="text-xs text-gray-600 dark:text-gray-400">{vehicle.registration}</p>
              <p class="text-xs text-blue-600 capitalize">{vehicle.type} • {vehicle.year}</p>
            </div>
            {#if selectedVehicle === vehicleId}
              <div class="absolute inset-0 rounded-xl bg-blue-500/10 pointer-events-none"></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    {#if getCurrentVehicle()}
      {@const vehicle = getCurrentVehicle()}

      {#if currentTab === "overview"}
        <!-- Vehicle Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Basic Info Card -->
          <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br {getVehicleTypeColor(vehicle.type)} flex items-center justify-center text-white">
                <Icon icon={getVehicleTypeIcon(vehicle.type)} class="w-8 h-8" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{vehicle.name}</h2>
                <p class="text-lg text-gray-600 dark:text-gray-400">{vehicle.registration}</p>
                <p class="text-sm text-blue-600 capitalize">{vehicle.type} • {vehicle.year} • {vehicle.color}</p>
              </div>
            </div>

            <!-- Vehicle Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Vehicle Information</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Make & Model:</span>
                    <span class="font-medium">{vehicle.make} {vehicle.model}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Year:</span>
                    <span class="font-medium">{vehicle.year}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Color:</span>
                    <span class="font-medium">{vehicle.color}</span>
                  </div>
                  {#if vehicle.engineCapacity !== "N/A"}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Engine:</span>
                      <span class="font-medium">{vehicle.engineCapacity}</span>
                    </div>
                  {/if}
                  {#if vehicle.mileage !== "N/A"}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Mileage:</span>
                      <span class="font-medium">{vehicle.mileage}</span>
                    </div>
                  {/if}
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Usage & Value</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Primary User:</span>
                    <span class="font-medium">{vehicle.primaryUser}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Purchase Price:</span>
                    <span class="font-medium">{vehicle.purchasePrice}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Current Value:</span>
                    <span class="font-medium text-green-600">{vehicle.currentValue}</span>
                  </div>
                  {#if vehicle.currentOdometer !== "N/A"}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Odometer:</span>
                      <span class="font-medium">{vehicle.currentOdometer}</span>
                    </div>
                  {/if}
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Purchase Date:</span>
                    <span class="font-medium">{new Date(vehicle.purchaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Assigned Users -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Assigned Users</h4>
              <div class="flex flex-wrap gap-2">
                {#each vehicle.assignedTo as user}
                  <span class="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full">
                    {user}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Cultural Note -->
            <div class="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg">
              <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-2 flex items-center">
                <Icon icon="heroicons:star" class="w-4 h-4 mr-2" />
                Cultural Note
              </h4>
              <p class="text-sm text-orange-800 dark:text-orange-200">{vehicle.culturalNote}</p>
            </div>
          </div>

          <!-- Quick Status Cards -->
          <div class="space-y-4">
            <!-- Service Status -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Icon icon="heroicons:wrench-screwdriver" class="w-5 h-5 mr-2 text-blue-500" />
                Service Status
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Last Service:</span>
                  <span class="text-sm font-medium">{new Date(vehicle.lastService.date).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Next Due:</span>
                  <span class="text-sm font-medium text-orange-600">{new Date(vehicle.lastService.nextDue).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Cost:</span>
                  <span class="text-sm font-medium">{vehicle.lastService.cost}</span>
                </div>
              </div>
            </div>

            <!-- Insurance Status -->
            {#if vehicle.insurance.status !== "Not Required"}
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Icon icon="heroicons:shield-check" class="w-5 h-5 mr-2 text-green-500" />
                  Insurance Status
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Provider:</span>
                    <span class="text-sm font-medium">{vehicle.insurance.provider}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Expires:</span>
                    <span class="text-sm font-medium {isDocumentExpiringSoon(vehicle.insurance.endDate) ? 'text-red-600' : 'text-green-600'}">
                      {new Date(vehicle.insurance.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Premium:</span>
                    <span class="text-sm font-medium">{vehicle.insurance.premium}</span>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Recent Issues -->
            {#if vehicle.issues && vehicle.issues.length > 0}
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2 text-red-500" />
                  Recent Issues
                </h3>
                <div class="space-y-3">
                  {#each vehicle.issues as issue}
                    <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-medium text-red-800 dark:text-red-200">{issue.issue}</span>
                        <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(issue.priority)}">
                          {issue.priority}
                        </span>
                      </div>
                      <div class="flex justify-between text-xs text-red-600 dark:text-red-400">
                        <span>{new Date(issue.date).toLocaleDateString()}</span>
                        <span class="font-medium">{issue.status}</span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {:else if currentTab === "maintenance"}
        <!-- Maintenance & Service -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Service History -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Service History</h3>
            <div class="space-y-4">
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-blue-800 dark:text-blue-200">{vehicle.lastService.type}</h4>
                  <span class="text-sm text-blue-600">{vehicle.lastService.cost}</span>
                </div>
                <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <div>Date: {new Date(vehicle.lastService.date).toLocaleDateString()}</div>
                  <div>Vendor: {vehicle.lastService.vendor}</div>
                  <div>Next Due: {new Date(vehicle.lastService.nextDue).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preferred Vendors -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Preferred Service Vendors</h3>
            <div class="space-y-4">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 class="font-medium text-green-800 dark:text-green-200 mb-1">Service Center</h4>
                <p class="text-sm text-green-700 dark:text-green-300">{vehicle.preferences.serviceCenter}</p>
              </div>
              {#if vehicle.preferences.mechanic}
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 class="font-medium text-orange-800 dark:text-orange-200 mb-1">Trusted Mechanic</h4>
                  <p class="text-sm text-orange-700 dark:text-orange-300">{vehicle.preferences.mechanic}</p>
                </div>
              {/if}
              {#if vehicle.preferences.spareShop}
                <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-1">Spare Parts Shop</h4>
                  <p class="text-sm text-purple-700 dark:text-purple-300">{vehicle.preferences.spareShop}</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {:else if currentTab === "fuel"}
        <!-- Fuel & Usage -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Fuel Entries -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">Recent Fuel Entries</h3>
              {#if vehicle.type !== "cycle"}
                <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm" on:click={() => (showFuelEntry = true)}> Add Entry </button>
              {/if}
            </div>
            {#if vehicle.recentFuelEntries && vehicle.recentFuelEntries.length > 0}
              <div class="space-y-3">
                {#each vehicle.recentFuelEntries as entry}
                  <div class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-medium text-gray-900 dark:text-white">{entry.amount}</span>
                      <span class="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>Liters: {entry.liters}</div>
                      <div>Mileage: {entry.mileage}</div>
                      <div>ODO: {entry.odometer}</div>
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <p class="text-gray-500 dark:text-gray-400 text-center py-4">No fuel entries for this vehicle</p>
            {/if}
          </div>

          <!-- Fuel Analytics -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Fuel Analytics</h3>
            {#if vehicle.type !== "cycle"}
              <div class="space-y-4">
                <div class="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">Average Mileage</h4>
                  <p class="text-2xl font-bold text-green-600">{calculateAverageMileage(vehicle)}</p>
                </div>
                <div class="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Preferred Fuel Station</h4>
                  <p class="text-sm text-purple-700 dark:text-purple-300">{vehicle.preferences.fuelStation}</p>
                </div>
              </div>
            {:else}
              <div class="text-center py-8">
                <Icon icon="heroicons:heart" class="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Eco-Friendly Transport</h4>
                <p class="text-gray-600 dark:text-gray-400">This vehicle runs on human power - zero emissions!</p>
              </div>
            {/if}
          </div>
        </div>
      {:else if currentTab === "documents"}
        <!-- Documents & Insurance -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Document Status -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Document Status</h3>
            <div class="space-y-4">
              {#each Object.entries(vehicle.documents) as [docType, docInfo]}
                <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-gray-900 dark:text-white uppercase">{docType}</h4>
                    <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(docInfo.status)}">
                      {docInfo.status}
                    </span>
                  </div>
                  {#if docInfo.expiry}
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Expires: <span class={isDocumentExpiringSoon(docInfo.expiry) ? "text-red-600 font-medium" : ""}>{new Date(docInfo.expiry).toLocaleDateString()}</span>
                    </div>
                  {/if}
                  {#if docInfo.holder}
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Holder: {docInfo.holder}
                    </div>
                  {/if}
                  {#if docInfo.note}
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Note: {docInfo.note}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>

          <!-- Insurance Details -->
          {#if vehicle.insurance.status !== "Not Required"}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Insurance Details</h3>
              <div class="space-y-4">
                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 class="font-medium text-green-800 dark:text-green-200 mb-3">Current Policy</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Provider:</span>
                      <span class="font-medium">{vehicle.insurance.provider}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Policy Number:</span>
                      <span class="font-medium">{vehicle.insurance.policyNumber}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Coverage:</span>
                      <span class="font-medium">{vehicle.insurance.coverage}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Premium:</span>
                      <span class="font-medium text-green-600">{vehicle.insurance.premium}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Valid Till:</span>
                      <span class="font-medium {isDocumentExpiringSoon(vehicle.insurance.endDate) ? 'text-red-600' : 'text-green-600'}">
                        {new Date(vehicle.insurance.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Insurance</h3>
              <div class="text-center py-8">
                <Icon icon="heroicons:information-circle" class="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Insurance Required</h4>
                <p class="text-gray-600 dark:text-gray-400">This vehicle doesn't require insurance coverage.</p>
              </div>
            </div>
          {/if}
        </div>
      {:else if currentTab === "expenses"}
        <!-- Expenses & Analytics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Monthly Expenses -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Monthly Expenses</h3>
            <div class="space-y-4">
              {#each vehicle.monthlyExpenses as expense}
                <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">{expense.month}</h4>
                  <div class="space-y-2 text-sm">
                    {#if expense.fuel}
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Fuel:</span>
                        <span class="font-medium">{expense.fuel}</span>
                      </div>
                    {/if}
                    {#if expense.service}
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Service:</span>
                        <span class="font-medium">{expense.service}</span>
                      </div>
                    {/if}
                    {#if expense.insurance}
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Insurance:</span>
                        <span class="font-medium">{expense.insurance}</span>
                      </div>
                    {/if}
                    {#if expense.maintenance}
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Maintenance:</span>
                        <span class="font-medium">{expense.maintenance}</span>
                      </div>
                    {/if}
                    <div class="flex justify-between border-t pt-2">
                      <span class="text-gray-900 dark:text-white font-medium">Total:</span>
                      <span class="font-bold text-blue-600">{expense.total}</span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Cost Analytics -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Cost Analytics</h3>
            <div class="space-y-4">
              <div class="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Average Monthly Cost</h4>
                <p class="text-2xl font-bold text-blue-600">₹{Math.round(vehicle.monthlyExpenses.reduce((sum, exp) => sum + parseInt(exp.total.replace(/[₹,]/g, "")), 0) / vehicle.monthlyExpenses.length).toLocaleString()}</p>
              </div>
              <div class="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">Total Investment</h4>
                <p class="text-lg font-bold text-green-600">{vehicle.purchasePrice}</p>
                <p class="text-sm text-green-700 dark:text-green-300">Current Value: {vehicle.currentValue}</p>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/if}

    <!-- Vehicle Management Tips -->
    <div class="mt-12 p-6 bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 rounded-xl">
      <h4 class="font-bold text-violet-800 dark:text-violet-200 mb-4 flex items-center">
        <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
        वाहन देखभाल सूत्र | Vehicle Care Tips
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-violet-700 dark:text-violet-300 mb-2">Maintenance Schedule:</h5>
          <ul class="text-sm text-violet-700 dark:text-violet-300 space-y-1">
            <li>• Regular oil changes every 3-6 months</li>
            <li>• Check tire pressure monthly</li>
            <li>• Keep documents updated and accessible</li>
            <li>• Monitor fuel efficiency patterns</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-violet-700 dark:text-violet-300 mb-2">Safety Practices:</h5>
          <ul class="text-sm text-violet-700 dark:text-violet-300 space-y-1">
            <li>• Always wear helmets (two-wheelers)</li>
            <li>• Keep emergency contact numbers handy</li>
            <li>• Regular brake and light checks</li>
            <li>• Follow traffic rules and safe driving</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-violet-200 dark:bg-violet-800 rounded-lg italic text-violet-800 dark:text-violet-200">"सर्वे भवन्तु सुखिन: सर्वे सन्तु निरामया: | May all be happy and free from illness. Well-maintained vehicles ensure safe journeys and family well-being."</blockquote>
    </div>
  </div>
</div>
