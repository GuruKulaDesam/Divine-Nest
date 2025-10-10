<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  // Import existing components
  import FamilyMemberCard from "../components/FamilyMemberCard.svelte";
  import RechargeTracker from "../components/RechargeTracker.svelte";
  import ExpenseLogger from "../components/ExpenseLogger.svelte";
  import BudgetDashboard from "../components/BudgetDashboard.svelte";

  // Import new finance components
  import SavingsGoalTracker from "../components/finance/SavingsGoalTracker.svelte";
  import FestivalPlanner from "../components/finance/FestivalPlanner.svelte";
  import WealthTracker from "../components/finance/WealthTracker.svelte";

  import { familyMembers, totalMonthlyRecharges, totalYearlyRenewals } from "../data/family.js";
  import { ExpenseCategories, FamilyRoles, savingsGoals, TamilFestivals } from "../data/financeData.js";
  import { notificationService } from "../services/notificationService.js";

  let activeSection = "dashboard";
  let selectedMember = "all";

  // Enhanced navigation sections for the Homemaker-Centric Finance Suite
  const financeSections = [
    // Main Dashboard
    {
      id: "dashboard",
      name: "Dashboard",
      tamil: "முதன்மை பக்கம்",
      icon: "heroicons:home",
      color: "blue",
      description: "Overview of all finances",
    },

    // Daily Operations
    {
      id: "expenses",
      name: "Daily Expenses",
      tamil: "தினசரி செலவுகள்",
      icon: "heroicons:shopping-cart",
      color: "green",
      description: "Track groceries, pooja, daily needs",
    },
    {
      id: "budget",
      name: "Monthly Budget",
      tamil: "மாதாந்திர பட்ஜெட்",
      icon: "heroicons:calendar-days",
      color: "purple",
      description: "Plan and forecast monthly spending",
    },

    // Wealth & Savings
    {
      id: "savings",
      name: "Savings Goals",
      tamil: "சேமிப்பு இலக்குகள்",
      icon: "heroicons:banknotes",
      color: "teal",
      description: "Education, travel, emergency funds",
    },
    {
      id: "wealth",
      name: "Gold & Silver",
      tamil: "தங்கம் & வெள்ளி",
      icon: "heroicons:sparkles",
      color: "yellow",
      description: "Track jewelry, coins, investments",
    },

    // Recurring Payments
    {
      id: "recharges",
      name: "Recharges & Bills",
      tamil: "ரீசார்ஜ் & பில்கள்",
      icon: "heroicons:device-phone-mobile",
      color: "orange",
      description: "Mobile, broadband, subscriptions",
    },
    {
      id: "insurance",
      name: "Insurance",
      tamil: "காப்பீடு",
      icon: "heroicons:shield-check",
      color: "red",
      description: "Health, life, vehicle coverage",
    },
    {
      id: "property",
      name: "Property & Dues",
      tamil: "சொத்து & வரிகள்",
      icon: "heroicons:home-modern",
      color: "brown",
      description: "House tax, civic dues, documents",
    },

    // Special Events
    {
      id: "milestones",
      name: "Milestone Planning",
      tamil: "விழா திட்டமிடல்",
      icon: "heroicons:gift",
      color: "pink",
      description: "Weddings, ceremonies, events",
    },
    {
      id: "festivals",
      name: "Festival Planner",
      tamil: "திருவிழா திட்டம்",
      icon: "heroicons:fire",
      color: "orange",
      description: "Diwali, Pongal, Navaratri budgets",
    },
    {
      id: "gifts",
      name: "Gifting Ledger",
      tamil: "பரிசு பதிவேடு",
      icon: "heroicons:heart",
      color: "purple",
      description: "Track gifts and blessings",
    },

    // Practical Management
    {
      id: "vendors",
      name: "Vendor Directory",
      tamil: "விற்பனையாளர் பட்டியல்",
      icon: "heroicons:phone",
      color: "indigo",
      description: "Trusted contacts and suppliers",
    },
    {
      id: "documents",
      name: "Document Vault",
      tamil: "ஆவண பாதுகாப்பு",
      icon: "heroicons:folder",
      color: "gray",
      description: "Important papers and renewals",
    },
    {
      id: "resilience",
      name: "Emergency Prep",
      tamil: "அவசர தயாரிப்பு",
      icon: "heroicons:exclamation-triangle",
      color: "red",
      description: "Monsoon, power cuts, emergencies",
    },

    // Income & Growth
    {
      id: "income",
      name: "Income & Business",
      tamil: "வருமானம் & தொழில்",
      icon: "heroicons:currency-rupee",
      color: "green",
      description: "Kolam classes, tutoring, freelance",
    },
    {
      id: "ai",
      name: "AI Assistant",
      tamil: "AI உதவியாளர்",
      icon: "heroicons:cpu-chip",
      color: "blue",
      description: "Smart insights and reminders",
    },
  ];

  function setActiveSection(sectionId) {
    activeSection = sectionId;
  }

  function exportData() {
    // Implementation for comprehensive data export
    const report = {
      generatedAt: new Date().toISOString(),
      familySummary: {
        totalBudget: totalFamilyBudget,
        totalAllocated: totalMonthlyRecharges,
        remainingBudget: totalFamilyBudget - totalMonthlyRecharges,
        budgetUtilization: (totalMonthlyRecharges / totalFamilyBudget) * 100,
      },
      memberBreakdown: familyMembers.map((member) => ({
        name: member.name,
        role: member.role,
        monthlyBudget: member.monthlyBudget,
        responsibilities: member.responsibilities,
      })),
      savingsGoals: savingsGoals,
      upcomingFestivals: Object.values(TamilFestivals),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `family_finance_comprehensive_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  // Calculate comprehensive totals
  $: totalFamilyBudget = familyMembers.reduce((sum, member) => sum + member.monthlyBudget, 0);
  $: totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current_amount, 0);
  $: totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.target_amount, 0);

  let currentMonth = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  onMount(() => {
    // Check URL for sub-route
    const path = window.location.pathname;
    if (path.includes("/finance/")) {
      const subRoute = path.split("/finance/")[1];
      const section = financeSections.find((s) => s.id === subRoute);
      if (section) {
        activeSection = section.id;
      }
    }
  });

  // Quick actions for homemaker
  function quickExpenseAdd() {
    // Implementation for quick expense adding
    alert("Quick Expense Add - Coming Soon!");
  }

  function festivalReminder() {
    // Get upcoming festivals
    const today = new Date();
    const upcomingFestivals = Object.values(TamilFestivals).filter((festival) => {
      const festivalDate = new Date(festival.date);
      const daysUntil = Math.ceil((festivalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil > 0 && daysUntil <= 30;
    });

    if (upcomingFestivals.length > 0) {
      const festival = upcomingFestivals[0];
      const daysUntil = Math.ceil((new Date(festival.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      alert(`${festival.name} (${festival.tamil}) is in ${daysUntil} days! Start planning your budget.`);
    } else {
      alert("No festivals in the next 30 days.");
    }
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Enhanced Header with Tamil-English -->
  <div class="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div>
          <h1 class="text-3xl font-bold flex items-center space-x-3">
            <span>🏡</span>
            <span>Family Finance Suite</span>
          </h1>
          <p class="text-orange-100 mt-1">குடும்ப நிதி மேலாண்மை • Homemaker-Centric Financial Planning</p>
          <p class="text-orange-100 text-sm">Designed for South Indian families • {currentMonth}</p>
        </div>
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2" on:click={quickExpenseAdd}>
            <Icon icon="heroicons:plus" class="w-4 h-4" />
            <span>Quick Add</span>
          </button>
          <button class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2" on:click={festivalReminder}>
            <Icon icon="heroicons:bell" class="w-4 h-4" />
            <span>Festival Alert</span>
          </button>
          <button class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2" on:click={exportData}>
            <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex gap-6">
      <!-- Enhanced Sidebar Navigation -->
      <div class="w-60 space-y-1">
        <div class="bg-white rounded-lg shadow-sm border p-4 mb-4">
          <h3 class="font-semibold text-gray-900 mb-3">Finance Sections</h3>
          <div class="text-sm text-gray-600 mb-3">Complete financial management for Tamil families</div>
        </div>

        <div class="space-y-1">
          {#each financeSections as section}
            <button class="w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors {activeSection === section.id ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-50'}" on:click={() => setActiveSection(section.id)}>
              <div class="flex items-center space-x-3">
                <Icon icon={section.icon} class="w-5 h-5 text-{section.color}-500" />
                <div>
                  <div class="font-medium">{section.name}</div>
                  <div class="text-xs text-gray-500">{section.tamil}</div>
                </div>
              </div>
              {#if section.id === "dashboard"}
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Home</span>
              {/if}
            </button>
          {/each}
        </div>

        <!-- Quick Stats Sidebar -->
        <div class="bg-white rounded-lg shadow-sm border p-4 mt-6">
          <h3 class="font-semibold text-gray-900 mb-3">📊 Quick Overview</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Monthly Budget</span>
              <span class="font-medium text-green-600">{formatCurrency(totalFamilyBudget)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Current Savings</span>
              <span class="font-medium text-blue-600">{formatCurrency(totalSavings)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Monthly Bills</span>
              <span class="font-medium text-orange-600">{formatCurrency(totalMonthlyRecharges)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Yearly Commitments</span>
              <span class="font-medium text-purple-600">{formatCurrency(totalYearlyRenewals)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1">
        {#if activeSection === "dashboard"}
          <!-- Enhanced Dashboard -->
          <div class="space-y-6">
            <!-- Welcome Banner -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold mb-2">🙏 Vanakkam! Welcome to your Finance Suite</h2>
                  <p class="text-blue-100">Manage your family's financial well-being with peace of mind</p>
                  <p class="text-blue-100 text-sm mt-1">Today is {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold">{formatCurrency(totalFamilyBudget)}</div>
                  <div class="text-blue-100">Total Family Budget</div>
                </div>
              </div>
            </div>

            <!-- Quick Action Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow" on:click={() => setActiveSection("expenses")}>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon icon="heroicons:shopping-cart" class="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Daily Expenses</h3>
                    <p class="text-sm text-gray-600">Groceries & Pooja</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow" on:click={() => setActiveSection("savings")}>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon icon="heroicons:banknotes" class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Savings Goals</h3>
                    <p class="text-sm text-gray-600">{Math.round((totalSavings / totalSavingsTarget) * 100)}% Complete</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow" on:click={() => setActiveSection("festivals")}>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon icon="heroicons:fire" class="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Festival Planner</h3>
                    <p class="text-sm text-gray-600">Diwali, Pongal & More</p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow" on:click={() => setActiveSection("wealth")}>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Icon icon="heroicons:sparkles" class="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Gold & Silver</h3>
                    <p class="text-sm text-gray-600">Wealth Tracking</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Family Overview -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-sm border p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">👨‍👩‍👧‍👦 Family Financial Overview</h3>
                <div class="space-y-3">
                  {#each familyMembers as member}
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-{member.color}-100 rounded-full flex items-center justify-center">
                          <span class="text-sm">{member.icon}</span>
                        </div>
                        <div>
                          <div class="font-medium">{member.name}</div>
                          <div class="text-sm text-gray-600">{member.role}</div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-medium">{formatCurrency(member.monthlyBudget)}</div>
                        <div class="text-sm text-gray-600">Monthly</div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">🎯 Savings Progress</h3>
                <div class="space-y-4">
                  {#each savingsGoals as goal}
                    {@const progress = (goal.current_amount / goal.target_amount) * 100}
                    <div>
                      <div class="flex justify-between mb-2">
                        <span class="font-medium">{goal.title}</span>
                        <span class="text-sm text-gray-600">{Math.round(progress)}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-{goal.priority === 'high' ? 'red' : goal.priority === 'medium' ? 'yellow' : 'green'}-500 h-2 rounded-full" style="width: {progress}%"></div>
                      </div>
                      <div class="flex justify-between mt-1 text-sm text-gray-600">
                        <span>{formatCurrency(goal.current_amount)}</span>
                        <span>{formatCurrency(goal.target_amount)}</span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {:else if activeSection === "expenses"}
          <ExpenseLogger />
        {:else if activeSection === "recharges"}
          <RechargeTracker />
        {:else if activeSection === "budget"}
          <BudgetDashboard {selectedMember} />
        {:else if activeSection === "savings"}
          <SavingsGoalTracker />
        {:else if activeSection === "wealth"}
          <WealthTracker />
        {:else if activeSection === "festivals"}
          <FestivalPlanner />
        {:else}
          {@const currentSection = financeSections.find((s) => s.id === activeSection)}
          <!-- Placeholder for other sections -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="text-center py-12">
              <div class="text-6xl mb-4">
                <Icon icon={currentSection?.icon || "heroicons:cog"} class="w-16 h-16 mx-auto text-gray-400" />
              </div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">{currentSection?.name}</h2>
              <p class="text-gray-600 mb-1">{currentSection?.tamil}</p>
              <p class="text-gray-500 mb-6">{currentSection?.description}</p>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <p class="text-sm text-blue-800">
                  <strong>Coming Soon!</strong> This section is being developed with Tamil-English interface and cultural considerations for South Indian families.
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
