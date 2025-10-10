<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  // Import finance components
  import FamilyMemberCard from "../components/FamilyMemberCard.svelte";
  import RechargeTracker from "../components/RechargeTracker.svelte";
  import ExpenseLogger from "../components/ExpenseLogger.svelte";
  import BudgetDashboard from "../components/BudgetDashboard.svelte";
  import { familyMembers, totalMonthlyRecharges, totalYearlyRenewals } from "../data/family.js";
  import { notificationService } from "../services/notificationService.js";

  let activeSection = "dashboard";
  let selectedMember = null;

  // Calculate current section info
  $: currentSection = FinanceSections.find((s) => s.id === activeSection);

  function switchSection(sectionId) {
    activeSection = sectionId;
    window.history.pushState({}, "", `/finances/${sectionId}`);
  }

  function switchMember(memberId) {
    selectedMember = memberId;
  }

  // Quick stats
  $: totalFamilyBudget = familyMembers.reduce((sum, member) => sum + member.monthlyBudget, 0);
  $: totalAllocated = totalMonthlyRecharges;
  $: remainingBudget = totalFamilyBudget - totalAllocated;
  $: budgetUtilization = (totalAllocated / totalFamilyBudget) * 100;

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function handleMemberClick(member) {
    selectedMember = member;
  }

  function sendFamilyBudgetSummary() {
    // Send budget summary to all family members
    notificationService.sendManualReminder(
      "budget_summary",
      familyMembers.map((m) => m.id)
    );
    alert("Budget summary sent to all family members!");
  }

  function exportFinanceReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      familySummary: {
        totalBudget: totalFamilyBudget,
        totalAllocated,
        remainingBudget,
        budgetUtilization,
      },
      memberBreakdown: familyMembers.map((member) => ({
        name: member.name,
        role: member.role,
        monthlyBudget: member.monthlyBudget,
        responsibilities: member.responsibilities,
      })),
      monthlyCommitments: totalMonthlyRecharges,
      yearlyCommitments: totalYearlyRenewals,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `family_finance_report_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Finance Sections for navigation
  const FinanceSections = [
    {
      id: "dashboard",
      name: "Dashboard",
      tamil: "டாஷ்போர்டு",
      icon: "heroicons:home",
      description: "Overview & Analytics",
    },
    {
      id: "recharges",
      name: "Recharges",
      tamil: "ரீசார்ஜ்",
      icon: "heroicons:device-phone-mobile",
      description: "Monthly Bills & Renewals",
    },
    {
      id: "expenses",
      name: "Expenses",
      tamil: "செலவுகள்",
      icon: "heroicons:credit-card",
      description: "Track Daily Expenses",
    },
    {
      id: "budget",
      name: "Budget",
      tamil: "பட்ஜெட்",
      icon: "heroicons:calculator",
      description: "Budget Planning & Analysis",
    },
    {
      id: "insurance",
      name: "Insurance",
      tamil: "காப்பீடு",
      icon: "heroicons:shield-check",
      description: "Insurance Management",
    },
    {
      id: "investments",
      name: "Investments",
      tamil: "முதலீடுகள்",
      icon: "heroicons:chart-line",
      description: "Investment Tracking",
    },
  ];

  onMount(() => {
    document.title = "Family Finance Management Suite";
  });
</script>

<!-- Family Finance Management Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-green-100 p-3 rounded-lg">
            <Icon icon="heroicons:currency-rupee" class="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Family Finance Management Suite</h1>
            <p class="text-lg text-gray-600">குடும்ப நிதி மேலாண்மை தொகுப்பு</p>
            <p class="text-sm text-gray-500">Comprehensive financial planning for South Indian families</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2" on:click={sendFamilyBudgetSummary}>
            <Icon icon="heroicons:paper-airplane" class="w-4 h-4" />
            <span>Send Summary</span>
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2" on:click={exportFinanceReport}>
            <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <!-- Section Navigation -->
      <div class="flex flex-wrap gap-2">
        {#each FinanceSections as section}
          <button on:click={() => switchSection(section.id)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {activeSection === section.id ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
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

  <!-- Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if activeTab === "overview"}
      <!-- Overview Tab -->
      <div class="space-y-8">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Family Budget</p>
                <p class="text-2xl font-bold text-blue-600">{formatCurrency(totalFamilyBudget)}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-lg">
                <Icon icon="heroicons:credit-card" class="w-6 h-6 text-orange-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Monthly Bills</p>
                <p class="text-2xl font-bold text-orange-600">{formatCurrency(totalAllocated)}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border border-green-100">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <Icon icon="heroicons:wallet" class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Available</p>
                <p class="text-2xl font-bold text-green-600">{formatCurrency(remainingBudget)}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <Icon icon="heroicons:chart-pie" class="w-6 h-6 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Budget Used</p>
                <p class="text-2xl font-bold text-purple-600">{budgetUtilization.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Family Members Grid -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Family Financial Overview</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each familyMembers as member}
              <FamilyMemberCard {member} onClick={handleMemberClick} />
            {/each}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" on:click={() => (activeTab = "expenses")}>
              <div class="p-2 bg-blue-100 rounded-lg">
                <Icon icon="heroicons:plus" class="w-5 h-5 text-blue-600" />
              </div>
              <div class="text-left">
                <h4 class="font-medium text-gray-900">Add Expense</h4>
                <p class="text-sm text-gray-600">Log a new family expense</p>
              </div>
            </button>

            <button class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" on:click={() => (activeTab = "recharges")}>
              <div class="p-2 bg-green-100 rounded-lg">
                <Icon icon="heroicons:device-phone-mobile" class="w-5 h-5 text-green-600" />
              </div>
              <div class="text-left">
                <h4 class="font-medium text-gray-900">Pay Bills</h4>
                <p class="text-sm text-gray-600">Manage monthly recharges</p>
              </div>
            </button>

            <button class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" on:click={() => (activeTab = "budget")}>
              <div class="p-2 bg-purple-100 rounded-lg">
                <Icon icon="heroicons:chart-bar" class="w-5 h-5 text-purple-600" />
              </div>
              <div class="text-left">
                <h4 class="font-medium text-gray-900">View Analytics</h4>
                <p class="text-sm text-gray-600">Budget analysis & trends</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    {:else if activeTab === "family"}
      <!-- Family Members Tab -->
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Family Member Financial Profiles</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {#each familyMembers as member}
              <FamilyMemberCard {member} showDetails={true} />
            {/each}
          </div>
        </div>
      </div>
    {:else if activeTab === "recharges"}
      <!-- Recharges Tab -->
      <RechargeTracker />
    {:else if activeTab === "expenses"}
      <!-- Expenses Tab -->
      <ExpenseLogger />
    {:else if activeTab === "budget"}
      <!-- Budget Analytics Tab -->
      <BudgetDashboard />
    {/if}
  </div>
</div>

<!-- Member Details Modal -->
{#if showMemberDetails && selectedMember}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">
            {selectedMember.name} - Financial Profile
          </h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showMemberDetails = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <div class="space-y-6">
          <!-- Member Info -->
          <div class="flex items-center space-x-4">
            <span class="text-4xl">{selectedMember.avatar}</span>
            <div>
              <h3 class="text-lg font-semibold">{selectedMember.name}</h3>
              <p class="text-gray-600 capitalize">{selectedMember.role} • Age {selectedMember.age}</p>
              <p class="text-sm text-gray-500">Preferred Language: {selectedMember.preferredLanguage}</p>
            </div>
          </div>

          <!-- Budget Overview -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">Budget Allocation</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Monthly Budget:</span>
                <span class="font-semibold">{formatCurrency(selectedMember.monthlyBudget)}</span>
              </div>
              <!-- Add more budget details here -->
            </div>
          </div>

          <!-- Responsibilities -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Financial Responsibilities</h4>
            <div class="flex flex-wrap gap-2">
              {#each selectedMember.responsibilities as responsibility}
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {responsibility}
                </span>
              {/each}
            </div>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Contact Information</h4>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:phone" class="w-4 h-4 text-gray-500" />
                <span class="text-gray-600">Phone:</span>
                <span>{selectedMember.phoneNumber}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon icon="simple-icons:whatsapp" class="w-4 h-4 text-green-500" />
                <span class="text-gray-600">WhatsApp:</span>
                <span>{selectedMember.whatsappNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-100 mt-6">
          <button class="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50" on:click={() => (showMemberDetails = false)}> Close </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            on:click={() => {
              notificationService.sendManualReminder("test", [selectedMember.id]);
              alert(`Reminder sent to ${selectedMember.name}!`);
            }}
          >
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
