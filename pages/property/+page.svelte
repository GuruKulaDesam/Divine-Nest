<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { propertyTaxes } from "../../src/lib/data/expenses.js";

  let currentTab = "overview";
  let selectedProperty = "main_house";

  const tabs = [
    { id: "overview", label: "Property Overview", icon: "heroicons:home" },
    { id: "taxes", label: "Taxes & Dues", icon: "heroicons:banknotes" },
    { id: "documents", label: "Documents", icon: "heroicons:document-text" },
    { id: "maintenance", label: "Maintenance", icon: "heroicons:wrench-screwdriver" },
    { id: "valuation", label: "Valuation & Insurance", icon: "heroicons:shield-check" },
  ];

  // Comprehensive Property Data
  const propertyData = {
    main_house: {
      id: "main_house",
      name: "Kovaipudur Residence",
      type: "Independent House",
      address: {
        line1: "Plot No. 45, Bharathi Nagar",
        line2: "Kovaipudur, Coimbatore - 641042",
        district: "Coimbatore",
        state: "Tamil Nadu",
        pincode: "641042",
      },
      ownership: {
        type: "Freehold",
        registeredOwner: "Rajesh Kumar",
        coOwners: ["Priya Rajesh"],
        purchaseDate: "2018-03-15",
        registrationNumber: "BK-3456/2018",
      },
      dimensions: {
        plotArea: "3600 sq ft",
        builtUpArea: "2400 sq ft",
        floors: 2,
        rooms: "4BHK + Study",
        bathrooms: 3,
        parking: "2-wheeler + car space",
      },
      valuation: {
        purchaseValue: "₹45,00,000",
        currentMarketValue: "₹75,00,000",
        registrationValue: "₹42,00,000",
        appreciationRate: "8.5% annually",
        lastValuationDate: "2024-01-15",
      },
      taxes: {
        housetax: {
          assessmentNumber: "HT/KVP/2024/4567",
          annualAmount: 4200,
          lastPaidDate: "2024-03-15",
          nextDueDate: "2025-03-31",
          paymentStatus: "Paid",
        },
        waterTax: {
          connectionNumber: "WT/CBE/KVP/8901",
          biannualAmount: 1200,
          lastPaidDate: "2024-04-10",
          nextDueDate: "2024-10-15",
          paymentStatus: "Due",
        },
        sewerageCharge: {
          connectionNumber: "SC/CBE/KVP/8901",
          annualAmount: 800,
          lastPaidDate: "2024-04-10",
          nextDueDate: "2024-10-15",
          paymentStatus: "Due",
        },
      },
      insurance: {
        provider: "Oriental Insurance",
        policyNumber: "OIC/HP/2024/123456",
        coverageAmount: "₹75,00,000",
        premiumAmount: "₹15,000",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        status: "Active",
        inclusions: ["Structure", "Contents", "Natural Disasters", "Theft"],
      },
      utilities: {
        electricity: {
          ebNumber: "240145678901",
          connectionType: "Domestic",
          sanctionedLoad: "8 KW",
          averageMonthlyBill: "₹1,200",
          lastReading: "45234 units",
        },
        water: {
          connectionType: "Corporation Supply + Borewell",
          metreNumber: "WM/CBE/45678",
          averageMonthlyBill: "₹300",
          borewellDepth: "180 feet",
        },
        gas: {
          provider: "Indane Gas",
          connectionNumber: "IG123456789",
          cylinderCapacity: "14.2 kg",
          averageMonthlyUsage: "1 cylinder",
          averageMonthlyCost: "₹900",
        },
      },
      maintenance: {
        painting: {
          lastDone: "2023-02-15",
          nextDue: "2026-02-15",
          estimatedCost: "₹25,000",
          contractor: "Rainbow Painters - Ph: 98765 43210",
        },
        plumbing: {
          lastService: "2024-08-20",
          nextInspection: "2025-02-20",
          estimatedCost: "₹5,000",
          contractor: "Kumar Plumbing - Ph: 98765 54321",
        },
        electrical: {
          lastService: "2024-06-10",
          nextInspection: "2025-06-10",
          estimatedCost: "₹3,000",
          contractor: "Voltage Electricals - Ph: 98765 67890",
        },
        roofWaterproofing: {
          lastDone: "2022-05-15",
          nextDue: "2027-05-15",
          estimatedCost: "₹35,000",
          contractor: "Aqua Shield - Ph: 98765 78901",
        },
        pestControl: {
          lastDone: "2024-07-15",
          nextDue: "2024-10-15",
          estimatedCost: "₹1,500",
          contractor: "Pest Away - Ph: 98765 89012",
        },
      },
      documents: {
        saledeed: {
          name: "Sale Deed",
          status: "Available",
          location: "Bank Locker",
          documentNumber: "SD/CBE/2018/3456",
          registrationDate: "2018-03-15",
          validity: "Lifetime",
        },
        patta: {
          name: "Patta Document",
          status: "Available",
          location: "Home Safe",
          surveyNumber: "SF No. 45/2A",
          villageRevenue: "Kovaipudur Village",
          validity: "Lifetime",
        },
        chitta: {
          name: "Chitta/1B Register",
          status: "Available",
          location: "Home Safe",
          surveyNumber: "SF No. 45/2A",
          lastUpdated: "2024-01-15",
          validity: "Updated periodically",
        },
        encumbranceCertificate: {
          name: "Encumbrance Certificate",
          status: "Available",
          location: "Bank Locker",
          period: "15 years (2008-2023)",
          issuedDate: "2024-01-10",
          validity: "Recent copy available",
        },
        buildingPlanApproval: {
          name: "Building Plan Approval",
          status: "Available",
          location: "Home Safe",
          approvalNumber: "BPA/CBE/2018/7890",
          approvedDate: "2018-01-20",
          validity: "As per sanctioned plan",
        },
        occupancyCertificate: {
          name: "Occupancy Certificate",
          status: "Available",
          location: "Home Safe",
          certificateNumber: "OC/CBE/2018/1234",
          issuedDate: "2018-08-15",
          validity: "Lifetime",
        },
        khataTransfer: {
          name: "Khata Transfer",
          status: "Available",
          location: "Home Safe",
          khataNumber: "KH/KVP/4567",
          transferDate: "2018-04-10",
          validity: "Current",
        },
      },
      legalStatus: {
        litigationStatus: "Clear",
        mortgageStatus: "Clear",
        encumbranceStatus: "Clear",
        approvals: {
          dtcp: "Approved",
          cmda: "Not Applicable",
          localBody: "Approved",
          pollution: "Not Required",
        },
      },
      neighborhood: {
        amenities: {
          schools: ["Kumaran Asan Matriculation School - 500m", "PSBB School - 1.2km"],
          hospitals: ["Kovaipudur PHC - 300m", "KG Hospital - 3km"],
          temples: ["Kovaipudur Mariamman Temple - 200m", "Arulmigu Subramaniyaswamy Temple - 800m"],
          markets: ["Daily Vegetable Market - 400m", "Reliance Fresh - 600m"],
          transport: ["Bus Stop - 200m", "Railway Station - 8km", "Airport - 15km"],
        },
        infrastructure: {
          roadType: "Tar Road - 20 feet wide",
          streetLights: "Available",
          drainageSystem: "Closed drainage",
          waterSupply: "24x7 Corporation + Borewell",
          powerSupply: "24x7 EB Connection",
          internetConnectivity: "Fiber available",
        },
      },
      culturalContext: {
        significance: "Family home where three generations live together in harmony",
        spiritualAspects: "Vastu-compliant construction with proper pooja room orientation",
        familyMemories: "Children's first words, family celebrations, elder's blessings",
        neighborhoodTies: "Strong community bonds with 15+ year relationships",
      },
    },
  };

  function getCurrentProperty() {
    return propertyData[selectedProperty];
  }

  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case "paid":
      case "active":
      case "available":
      case "clear":
      case "approved":
        return "text-green-600 bg-green-100";
      case "due":
      case "pending":
      case "renewal":
        return "text-orange-600 bg-orange-100";
      case "overdue":
      case "expired":
      case "missing":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function isMaintenanceDue(nextDueDate) {
    if (!nextDueDate) return false;
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }

  function getMaintenanceStatus() {
    const property = getCurrentProperty();
    const maintenance = property.maintenance;
    let dueSoon = 0;
    let overdue = 0;

    Object.values(maintenance).forEach((item) => {
      if (item.nextDue) {
        const today = new Date();
        const dueDate = new Date(item.nextDue);
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) overdue++;
        else if (diffDays <= 30) dueSoon++;
      } else if (item.nextInspection) {
        const today = new Date();
        const inspectionDate = new Date(item.nextInspection);
        const diffDays = Math.ceil((inspectionDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) overdue++;
        else if (diffDays <= 30) dueSoon++;
      }
    });

    return { dueSoon, overdue };
  }

  function getTaxStatus() {
    const property = getCurrentProperty();
    const taxes = property.taxes;
    let pending = 0;
    let total = 0;

    Object.values(taxes).forEach((tax) => {
      total++;
      if (tax.paymentStatus === "Due") pending++;
    });

    return { pending, total };
  }

  onMount(() => {
    document.title = "Property Management - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-red-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl text-white">
            <Icon icon="heroicons:building-office" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Property Management</h1>
            <p class="text-gray-600 dark:text-gray-300">संपत्ति प्रबन्धन | Complete property tracking and legal documentation</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="flex items-center space-x-2 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors">
            <Icon icon="heroicons:plus" class="w-5 h-5" />
            <span>Add Property</span>
          </button>
          <button class="flex items-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
            <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <!-- Property Philosophy -->
      <div class="bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:building-office" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">गृह स्वामित्व | Property Ownership & Heritage</h3>
            <p class="text-white/90">"गृहं गृही गृहं शून्यम् | A house becomes a home when lived with love and care. Proper documentation and maintenance preserve our family heritage for future generations."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "வீடு என்பது வெறும் கட்டடம் அல்ல, அது குடும்ப பாரம்பரியம்"</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      {@const property = getCurrentProperty()}
      {@const maintenanceStatus = getMaintenanceStatus()}
      {@const taxStatus = getTaxStatus()}

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-amber-600">{property.valuation.currentMarketValue}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Current Value</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-red-600">{taxStatus.pending}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Taxes Due</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">{maintenanceStatus.dueSoon}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Maintenance Due</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{Object.keys(property.documents).length}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Documents</div>
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
    {#if currentTab === "overview"}
      <!-- Property Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Basic Property Info -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-white">
              <Icon icon="heroicons:home" class="w-8 h-8" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{property.name}</h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">{property.type}</p>
              <p class="text-sm text-amber-600">{property.address.line1}, {property.address.line2}</p>
            </div>
          </div>

          <!-- Property Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Property Specifications</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Plot Area:</span>
                  <span class="font-medium">{property.dimensions.plotArea}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Built-up Area:</span>
                  <span class="font-medium">{property.dimensions.builtUpArea}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Configuration:</span>
                  <span class="font-medium">{property.dimensions.rooms}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Floors:</span>
                  <span class="font-medium">{property.dimensions.floors}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Parking:</span>
                  <span class="font-medium">{property.dimensions.parking}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Ownership Details</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Owner:</span>
                  <span class="font-medium">{property.ownership.registeredOwner}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Co-owners:</span>
                  <span class="font-medium">{property.ownership.coOwners.join(", ")}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Purchase Date:</span>
                  <span class="font-medium">{new Date(property.ownership.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Registration No:</span>
                  <span class="font-medium">{property.ownership.registrationNumber}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Ownership Type:</span>
                  <span class="font-medium">{property.ownership.type}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Valuation Section -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Property Valuation</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div class="font-bold text-green-600">{property.valuation.purchaseValue}</div>
                <div class="text-xs text-green-700 dark:text-green-300">Purchase Value</div>
              </div>
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div class="font-bold text-blue-600">{property.valuation.currentMarketValue}</div>
                <div class="text-xs text-blue-700 dark:text-blue-300">Market Value</div>
              </div>
              <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <div class="font-bold text-purple-600">{property.valuation.appreciationRate}</div>
                <div class="text-xs text-purple-700 dark:text-purple-300">Appreciation</div>
              </div>
              <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <div class="font-bold text-orange-600">{new Date(property.valuation.lastValuationDate).toLocaleDateString()}</div>
                <div class="text-xs text-orange-700 dark:text-orange-300">Last Valued</div>
              </div>
            </div>
          </div>

          <!-- Cultural Context -->
          <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
            <h4 class="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center">
              <Icon icon="heroicons:star" class="w-4 h-4 mr-2" />
              Cultural & Family Significance
            </h4>
            <p class="text-sm text-amber-800 dark:text-amber-200 mb-2">{property.culturalContext.significance}</p>
            <p class="text-sm text-amber-700 dark:text-amber-300">{property.culturalContext.spiritualAspects}</p>
          </div>
        </div>

        <!-- Quick Action Cards -->
        <div class="space-y-4">
          <!-- Tax Status -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:banknotes" class="w-5 h-5 mr-2 text-red-500" />
              Tax Status
            </h3>
            <div class="space-y-3">
              {#each Object.entries(property.taxes) as [taxType, taxInfo]}
                <div class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-medium text-gray-900 dark:text-white capitalize">{taxType.replace(/([A-Z])/g, " $1")}</span>
                    <span class="px-2 py-1 text-xs rounded-full {getStatusColor(taxInfo.paymentStatus)}">
                      {taxInfo.paymentStatus}
                    </span>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <div>Amount: ₹{taxInfo.annualAmount || taxInfo.biannualAmount}</div>
                    <div>Due: {new Date(taxInfo.nextDueDate).toLocaleDateString()}</div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Insurance Status -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:shield-check" class="w-5 h-5 mr-2 text-blue-500" />
              Insurance Status
            </h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-blue-800 dark:text-blue-200">{property.insurance.provider}</span>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(property.insurance.status)}">
                    {property.insurance.status}
                  </span>
                </div>
                <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <div>Coverage: {property.insurance.coverageAmount}</div>
                  <div>Premium: {property.insurance.premiumAmount}</div>
                  <div>Expires: {new Date(property.insurance.endDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Maintenance Alerts -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2 text-orange-500" />
              Maintenance Alerts
            </h3>
            <div class="space-y-2">
              {#each Object.entries(property.maintenance) as [maintenanceType, maintenanceInfo]}
                {#if isMaintenanceDue(maintenanceInfo.nextDue || maintenanceInfo.nextInspection)}
                  <div class="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div class="font-medium text-orange-800 dark:text-orange-200 capitalize">
                      {maintenanceType.replace(/([A-Z])/g, " $1")} Due
                    </div>
                    <div class="text-sm text-orange-700 dark:text-orange-300">
                      {new Date(maintenanceInfo.nextDue || maintenanceInfo.nextInspection).toLocaleDateString()}
                    </div>
                  </div>
                {/if}
              {/each}
              {#if maintenanceStatus.dueSoon === 0}
                <div class="text-center py-4 text-gray-500 dark:text-gray-400">
                  <Icon icon="heroicons:check-circle" class="w-8 h-8 mx-auto mb-2 text-green-500" />
                  All maintenance up to date
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {:else if currentTab === "taxes"}
      <!-- Taxes & Dues -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Tax Details -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Tax Details</h3>
          <div class="space-y-4">
            {#each Object.entries(property.taxes) as [taxType, taxInfo]}
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-white capitalize">
                    {taxType.replace(/([A-Z])/g, " $1")}
                  </h4>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(taxInfo.paymentStatus)}">
                    {taxInfo.paymentStatus}
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  {#if taxInfo.assessmentNumber}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Assessment No:</span>
                      <span class="font-medium">{taxInfo.assessmentNumber}</span>
                    </div>
                  {/if}
                  {#if taxInfo.connectionNumber}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Connection No:</span>
                      <span class="font-medium">{taxInfo.connectionNumber}</span>
                    </div>
                  {/if}
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span class="font-medium text-green-600">₹{taxInfo.annualAmount || taxInfo.biannualAmount}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Last Paid:</span>
                    <span class="font-medium">{new Date(taxInfo.lastPaidDate).toLocaleDateString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Next Due:</span>
                    <span class="font-medium {taxInfo.paymentStatus === 'Due' ? 'text-red-600' : 'text-green-600'}">
                      {new Date(taxInfo.nextDueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Payment History & Actions -->
        <div class="space-y-4">
          <!-- Tax Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Tax Summary</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="text-2xl font-bold text-green-600">
                  ₹{Object.values(property.taxes)
                    .filter((tax) => tax.paymentStatus === "Paid")
                    .reduce((sum, tax) => sum + (tax.annualAmount || tax.biannualAmount), 0)}
                </div>
                <div class="text-sm text-green-700 dark:text-green-300">Paid This Year</div>
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div class="text-2xl font-bold text-red-600">
                  ₹{Object.values(property.taxes)
                    .filter((tax) => tax.paymentStatus === "Due")
                    .reduce((sum, tax) => sum + (tax.annualAmount || tax.biannualAmount), 0)}
                </div>
                <div class="text-sm text-red-700 dark:text-red-300">Pending Payment</div>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div class="font-medium">Total Taxes</div>
                  <div class="text-gray-600 dark:text-gray-400">{Object.keys(property.taxes).length}</div>
                </div>
                <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div class="font-medium">Due Items</div>
                  <div class="text-red-600">{Object.values(property.taxes).filter((tax) => tax.paymentStatus === "Due").length}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div class="space-y-2">
              <button class="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"> Pay Pending Taxes </button>
              <button class="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"> Download Tax Receipts </button>
              <button class="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"> Set Payment Reminders </button>
              <button class="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"> Generate Tax Report </button>
            </div>
          </div>
        </div>
      </div>
    {:else if currentTab === "documents"}
      <!-- Documents Management -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Document List -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Property Documents</h3>
          <div class="space-y-4">
            {#each Object.entries(property.documents) as [docType, docInfo]}
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900 dark:text-white">{docInfo.name}</h4>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(docInfo.status)}">
                    {docInfo.status}
                  </span>
                </div>
                <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {#if docInfo.documentNumber}
                    <div>Document No: {docInfo.documentNumber}</div>
                  {/if}
                  {#if docInfo.registrationDate}
                    <div>Registered: {new Date(docInfo.registrationDate).toLocaleDateString()}</div>
                  {/if}
                  {#if docInfo.surveyNumber}
                    <div>Survey No: {docInfo.surveyNumber}</div>
                  {/if}
                  {#if docInfo.approvalNumber}
                    <div>Approval No: {docInfo.approvalNumber}</div>
                  {/if}
                  <div>Location: {docInfo.location}</div>
                  <div>Validity: {docInfo.validity}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Legal Status & Actions -->
        <div class="space-y-4">
          <!-- Legal Status -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Legal Status</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">Property Status</h4>
                <div class="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <div class="flex justify-between">
                    <span>Litigation:</span>
                    <span class="font-medium">{property.legalStatus.litigationStatus}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Mortgage:</span>
                    <span class="font-medium">{property.legalStatus.mortgageStatus}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Encumbrance:</span>
                    <span class="font-medium">{property.legalStatus.encumbranceStatus}</span>
                  </div>
                </div>
              </div>

              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Approvals</h4>
                <div class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  {#each Object.entries(property.legalStatus.approvals) as [approval, status]}
                    <div class="flex justify-between">
                      <span class="uppercase">{approval}:</span>
                      <span class="font-medium">{status}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <!-- Document Actions -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Document Actions</h3>
            <div class="space-y-2">
              <button class="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"> Upload New Document </button>
              <button class="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"> Download Document Package </button>
              <button class="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"> Request Document Verification </button>
              <button class="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"> Generate Document Checklist </button>
            </div>
          </div>
        </div>
      </div>
    {:else if currentTab === "maintenance"}
      <!-- Maintenance Management -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Maintenance Schedule -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Maintenance Schedule</h3>
          <div class="space-y-4">
            {#each Object.entries(property.maintenance) as [maintenanceType, maintenanceInfo]}
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900 dark:text-white capitalize">
                    {maintenanceType.replace(/([A-Z])/g, " $1")}
                  </h4>
                  {#if isMaintenanceDue(maintenanceInfo.nextDue || maintenanceInfo.nextInspection)}
                    <span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">Due Soon</span>
                  {:else}
                    <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">Up to Date</span>
                  {/if}
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Last Done:</span>
                    <span class="font-medium">{new Date(maintenanceInfo.lastDone || maintenanceInfo.lastService).toLocaleDateString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Next Due:</span>
                    <span class="font-medium {isMaintenanceDue(maintenanceInfo.nextDue || maintenanceInfo.nextInspection) ? 'text-red-600' : 'text-green-600'}">
                      {new Date(maintenanceInfo.nextDue || maintenanceInfo.nextInspection).toLocaleDateString()}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Estimated Cost:</span>
                    <span class="font-medium text-green-600">{maintenanceInfo.estimatedCost}</span>
                  </div>
                  <div class="text-gray-600 dark:text-gray-400">
                    Contractor: {maintenanceInfo.contractor}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Utilities & Services -->
        <div class="space-y-4">
          <!-- Utilities Overview -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Utilities & Services</h3>
            <div class="space-y-4">
              <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Electricity</h4>
                <div class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <div>EB Number: {property.utilities.electricity.ebNumber}</div>
                  <div>Sanctioned Load: {property.utilities.electricity.sanctionedLoad}</div>
                  <div>Avg. Monthly Bill: {property.utilities.electricity.averageMonthlyBill}</div>
                </div>
              </div>

              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Water</h4>
                <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <div>Connection: {property.utilities.water.connectionType}</div>
                  <div>Meter: {property.utilities.water.metreNumber}</div>
                  <div>Borewell: {property.utilities.water.borewellDepth}</div>
                </div>
              </div>

              <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 class="font-medium text-orange-800 dark:text-orange-200 mb-2">Gas</h4>
                <div class="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <div>Provider: {property.utilities.gas.provider}</div>
                  <div>Connection: {property.utilities.gas.connectionNumber}</div>
                  <div>Monthly Cost: {property.utilities.gas.averageMonthlyCost}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Maintenance Actions -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Maintenance Actions</h3>
            <div class="space-y-2">
              <button class="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"> Schedule Urgent Repair </button>
              <button class="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"> Book Regular Service </button>
              <button class="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"> Set Maintenance Reminders </button>
              <button class="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"> View Contractor Contacts </button>
            </div>
          </div>
        </div>
      </div>
    {:else if currentTab === "valuation"}
      <!-- Valuation & Insurance -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Property Valuation -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Property Valuation</h3>
          <div class="space-y-4">
            <div class="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <h4 class="font-medium text-green-800 dark:text-green-200 mb-3">Current Valuation</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Purchase Value:</span>
                  <div class="font-bold text-green-600">{property.valuation.purchaseValue}</div>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Market Value:</span>
                  <div class="font-bold text-blue-600">{property.valuation.currentMarketValue}</div>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Registration Value:</span>
                  <div class="font-bold text-purple-600">{property.valuation.registrationValue}</div>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Appreciation Rate:</span>
                  <div class="font-bold text-orange-600">{property.valuation.appreciationRate}</div>
                </div>
              </div>
            </div>

            <!-- Valuation Timeline -->
            <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3">Valuation Timeline</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span class="text-sm">Purchase (2018)</span>
                  <span class="font-medium">{property.valuation.purchaseValue}</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span class="text-sm">Current Market (2024)</span>
                  <span class="font-medium">{property.valuation.currentMarketValue}</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span class="text-sm">Total Appreciation</span>
                  <span class="font-medium text-green-600">
                    +₹{parseInt(property.valuation.currentMarketValue.replace(/[^\d]/g, "")) - parseInt(property.valuation.purchaseValue.replace(/[^\d]/g, ""))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Insurance Details -->
        <div class="space-y-4">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Property Insurance</h3>
            <div class="space-y-4">
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-blue-800 dark:text-blue-200">{property.insurance.provider}</h4>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(property.insurance.status)}">
                    {property.insurance.status}
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Policy Number:</span>
                    <span class="font-medium">{property.insurance.policyNumber}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Coverage Amount:</span>
                    <span class="font-medium text-green-600">{property.insurance.coverageAmount}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Annual Premium:</span>
                    <span class="font-medium">{property.insurance.premiumAmount}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Valid Till:</span>
                    <span class="font-medium">{new Date(property.insurance.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <!-- Coverage Details -->
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-white mb-3">Coverage Inclusions</h4>
                <div class="grid grid-cols-2 gap-2">
                  {#each property.insurance.inclusions as inclusion}
                    <div class="flex items-center space-x-2">
                      <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-500" />
                      <span class="text-sm text-gray-700 dark:text-gray-300">{inclusion}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <!-- Neighborhood Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Neighborhood</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">Infrastructure</h4>
                <div class="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <div>Road: {property.neighborhood.infrastructure.roadType}</div>
                  <div>Water: {property.neighborhood.infrastructure.waterSupply}</div>
                  <div>Power: {property.neighborhood.infrastructure.powerSupply}</div>
                </div>
              </div>

              <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">Key Amenities</h4>
                <div class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <div>Schools: 2 within 1.5km</div>
                  <div>Hospitals: 2 within 3km</div>
                  <div>Temples: 2 within 1km</div>
                  <div>Markets: 2 within 600m</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Property Management Tips -->
    <div class="mt-12 p-6 bg-gradient-to-r from-amber-100 to-red-100 dark:from-amber-900/30 dark:to-red-900/30 rounded-xl">
      <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center">
        <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
        संपत्ति सुरक्षा सूत्र | Property Management Wisdom
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-amber-700 dark:text-amber-300 mb-2">Document Security:</h5>
          <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Keep original documents in bank locker</li>
            <li>• Maintain certified copies at home</li>
            <li>• Update legal documents regularly</li>
            <li>• Ensure proper succession planning</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-amber-700 dark:text-amber-300 mb-2">Maintenance Excellence:</h5>
          <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Follow preventive maintenance schedule</li>
            <li>• Keep trusted contractor contacts handy</li>
            <li>• Monitor property appreciation trends</li>
            <li>• Maintain adequate insurance coverage</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-amber-200 dark:bg-amber-800 rounded-lg italic text-amber-800 dark:text-amber-200">"गृहिणी गृहलक्ष्मी: गृहं तु गृहिणी स्मृता | The mistress of the house is Lakshmi herself. A well-maintained property with proper documentation becomes a true legacy for generations."</blockquote>
    </div>
  </div>
</div>
