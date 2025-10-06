<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { theme } from "../stores/theme.js";
  import { familyMembers, monthlyRecharges, yearlyRenewals, expenseCategories, totalMonthlyRecharges, totalYearlyRenewals } from "../data/family.js";

  export let selectedPeriod = "monthly";
  export let selectedMember = "all";

  let chartData = [];
  let budgetAlerts = [];
  let showProjections = false;
  let customBudgets = {};

  // Sample expense data for demonstration
  let sampleExpenses = [
    { category: "food", amount: 8500, budget: 12000, date: "2025-10-01" },
    { category: "spiritual", amount: 2500, budget: 3000, date: "2025-10-02" },
    { category: "education", amount: 4200, budget: 8000, date: "2025-10-03" },
    { category: "health", amount: 1800, budget: 5000, date: "2025-10-04" },
    { category: "transport", amount: 6500, budget: 8000, date: "2025-10-05" },
    { category: "household", amount: 3200, budget: 4000, date: "2025-10-06" },
    { category: "digital_subscriptions", amount: 2800, budget: 3500, date: "2025-10-07" },
    { category: "entertainment", amount: 1500, budget: 2500, date: "2025-10-08" },
  ];

  // Calculate budget metrics
  $: totalBudget = sampleExpenses.reduce((sum, item) => sum + item.budget, 0);
  $: totalSpent = sampleExpenses.reduce((sum, item) => sum + item.amount, 0);
  $: totalRemaining = totalBudget - totalSpent;
  $: budgetUtilization = (totalSpent / totalBudget) * 100;

  // Category analysis
  $: categoryAnalysis = sampleExpenses
    .map((expense) => {
      const categoryDetails = expenseCategories.find((cat) => cat.id === expense.category);
      const utilization = (expense.amount / expense.budget) * 100;
      const remaining = expense.budget - expense.amount;

      return {
        ...expense,
        categoryDetails,
        utilization,
        remaining,
        status: utilization > 90 ? "danger" : utilization > 75 ? "warning" : "good",
      };
    })
    .sort((a, b) => b.utilization - a.utilization);

  // Member budget analysis
  $: memberBudgets = familyMembers.map((member) => {
    const memberRecharges = monthlyRecharges.filter((r) => r.assignedTo.id === member.id);
    const memberRenewals = yearlyRenewals.filter((r) => r.assignedTo.id === member.id);
    const allocatedMonthly = memberRecharges.reduce((sum, r) => sum + r.amount, 0);
    const allocatedYearly = memberRenewals.reduce((sum, r) => sum + r.amount, 0);

    return {
      ...member,
      allocatedMonthly,
      allocatedYearly,
      budgetUtilization: (allocatedMonthly / member.monthlyBudget) * 100,
      remaining: member.monthlyBudget - allocatedMonthly,
      status: allocatedMonthly > member.monthlyBudget ? "over" : allocatedMonthly > member.monthlyBudget * 0.9 ? "warning" : "good",
    };
  });

  // Generate budget alerts
  $: budgetAlerts = [
    ...categoryAnalysis
      .filter((cat) => cat.utilization > 85)
      .map((cat) => ({
        type: "category_high",
        severity: cat.utilization > 95 ? "danger" : "warning",
        title: `${cat.categoryDetails.name} Budget Alert`,
        message: `${cat.utilization.toFixed(1)}% of budget used (₹${cat.amount.toLocaleString()} of ₹${cat.budget.toLocaleString()})`,
        icon: cat.categoryDetails.icon,
        category: cat.category,
      })),
    ...memberBudgets
      .filter((member) => member.budgetUtilization > 85)
      .map((member) => ({
        type: "member_high",
        severity: member.budgetUtilization > 100 ? "danger" : "warning",
        title: `${member.name} Budget Alert`,
        message: `${member.budgetUtilization.toFixed(1)}% of monthly budget allocated`,
        icon: member.avatar,
        memberId: member.id,
      })),
  ];

  // Chart data for visualization
  $: pieChartData = categoryAnalysis.map((cat) => ({
    label: cat.categoryDetails.name,
    value: cat.amount,
    color: cat.categoryDetails.color.replace("text-", "bg-"),
    icon: cat.categoryDetails.icon,
  }));

  onMount(() => {
    generateProjections();
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function getStatusColor(status) {
    switch (status) {
      case "danger":
      case "over":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "good":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }

  function generateProjections() {
    // Simple linear projection based on current spending
    const dailySpend = totalSpent / new Date().getDate();
    const daysInMonth = new Date(2025, 9, 0).getDate(); // October 2025
    const projectedMonthly = dailySpend * daysInMonth;
    const projectedYearly = projectedMonthly * 12;

    return {
      monthly: projectedMonthly,
      yearly: projectedYearly,
      savings: totalBudget - projectedMonthly,
    };
  }

  function exportBudgetReport() {
    const report = {
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      summary: {
        totalBudget,
        totalSpent,
        totalRemaining,
        budgetUtilization,
      },
      categoryBreakdown: categoryAnalysis,
      memberBudgets,
      alerts: budgetAlerts,
      projections: generateProjections(),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `budget_report_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function setBudgetGoal(category, amount) {
    customBudgets[category] = amount;
    // Update the budget in sampleExpenses
    const expenseIndex = sampleExpenses.findIndex((exp) => exp.category === category);
    if (expenseIndex !== -1) {
      sampleExpenses[expenseIndex].budget = amount;
      sampleExpenses = [...sampleExpenses]; // Trigger reactivity
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Budget Dashboard</h1>
      <p class="text-gray-600">Track and analyze family spending patterns</p>
    </div>
    <div class="flex space-x-3">
      <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2" on:click={() => (showProjections = !showProjections)}>
        <Icon icon="heroicons:chart-bar" class="w-4 h-4" />
        <span>Projections</span>
      </button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2" on:click={exportBudgetReport}>
        <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4" />
        <span>Export</span>
      </button>
    </div>
  </div>

  <!-- Budget Alerts -->
  {#if budgetAlerts.length > 0}
    <div class="bg-white rounded-lg border shadow-sm p-4">
      <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 text-amber-600 mr-2" />
        Budget Alerts ({budgetAlerts.length})
      </h2>
      <div class="space-y-3">
        {#each budgetAlerts as alert}
          <div class="flex items-start space-x-3 p-3 rounded-lg border {getStatusColor(alert.severity)}">
            <span class="text-2xl">{alert.icon}</span>
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{alert.title}</h3>
              <p class="text-sm text-gray-600">{alert.message}</p>
            </div>
            <Icon icon="heroicons:chevron-right" class="w-4 h-4 text-gray-400" />
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Total Budget</p>
          <p class="text-2xl font-bold text-blue-600">{formatCurrency(totalBudget)}</p>
        </div>
        <div class="p-3 bg-blue-100 rounded-lg">
          <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Total Spent</p>
          <p class="text-2xl font-bold text-orange-600">{formatCurrency(totalSpent)}</p>
        </div>
        <div class="p-3 bg-orange-100 rounded-lg">
          <Icon icon="heroicons:credit-card" class="w-6 h-6 text-orange-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Remaining</p>
          <p class="text-2xl font-bold {totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}">
            {formatCurrency(totalRemaining)}
          </p>
        </div>
        <div class="p-3 {totalRemaining >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-lg">
          <Icon icon="heroicons:wallet" class="w-6 h-6 {totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Budget Used</p>
          <p class="text-2xl font-bold {budgetUtilization > 90 ? 'text-red-600' : budgetUtilization > 75 ? 'text-amber-600' : 'text-green-600'}">
            {budgetUtilization.toFixed(1)}%
          </p>
        </div>
        <div class="p-3 {budgetUtilization > 90 ? 'bg-red-100' : budgetUtilization > 75 ? 'bg-amber-100' : 'bg-green-100'} rounded-lg">
          <Icon icon="heroicons:chart-pie" class="w-6 h-6 {budgetUtilization > 90 ? 'text-red-600' : budgetUtilization > 75 ? 'text-amber-600' : 'text-green-600'}" />
        </div>
      </div>
    </div>
  </div>

  <!-- Category Budget Analysis -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Category Breakdown -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Category Breakdown</h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          {#each categoryAnalysis as category}
            <div class="border rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-3">
                  <span class="text-xl">{category.categoryDetails.icon}</span>
                  <div>
                    <h3 class="font-medium text-gray-900">{category.categoryDetails.name}</h3>
                    <p class="text-sm text-gray-500">
                      {formatCurrency(category.amount)} of {formatCurrency(category.budget)}
                    </p>
                  </div>
                </div>
                <span class="text-sm font-medium {category.utilization > 90 ? 'text-red-600' : category.utilization > 75 ? 'text-amber-600' : 'text-green-600'}">
                  {category.utilization.toFixed(1)}%
                </span>
              </div>

              <!-- Progress bar -->
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full transition-all duration-500 {category.utilization > 90 ? 'bg-red-500' : category.utilization > 75 ? 'bg-amber-500' : 'bg-green-500'}" style="width: {Math.min(category.utilization, 100)}%"></div>
              </div>

              <div class="mt-2 flex justify-between text-xs text-gray-600">
                <span>Remaining: {formatCurrency(category.remaining)}</span>
                <span class="px-2 py-1 rounded-full {getStatusColor(category.status)} text-xs">
                  {category.status === "danger" ? "Over Budget" : category.status === "warning" ? "Near Limit" : "On Track"}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Visual Chart (Mock Implementation) -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Spending Distribution</h2>
      </div>
      <div class="p-6">
        <!-- Simple pie chart representation -->
        <div class="space-y-3">
          {#each pieChartData.slice(0, 6) as item}
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 rounded-full {item.color.replace('text-', 'bg-')}"></div>
                <span class="text-sm font-medium">{item.label}</span>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold">{formatCurrency(item.value)}</div>
                <div class="text-xs text-gray-500">
                  {((item.value / totalSpent) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Chart would go here -->
        <div class="mt-6 h-32 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <Icon icon="heroicons:chart-pie" class="w-8 h-8 mx-auto mb-2" />
            <p class="text-sm">Interactive chart would render here</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Member Budget Analysis -->
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">Family Member Budgets</h2>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each memberBudgets as member}
          <div class="border rounded-lg p-4">
            <div class="flex items-center space-x-3 mb-3">
              <span class="text-2xl">{member.avatar}</span>
              <div>
                <h3 class="font-medium text-gray-900">{member.name}</h3>
                <p class="text-sm text-gray-500 capitalize">{member.role}</p>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Monthly Budget:</span>
                <span class="font-medium">{formatCurrency(member.monthlyBudget)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Allocated Bills:</span>
                <span class="font-medium">{formatCurrency(member.allocatedMonthly)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Remaining:</span>
                <span class="font-medium {member.remaining >= 0 ? 'text-green-600' : 'text-red-600'}">
                  {formatCurrency(member.remaining)}
                </span>
              </div>
            </div>

            <!-- Progress bar -->
            <div class="mt-3">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full transition-all duration-500 {member.status === 'over' ? 'bg-red-500' : member.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}" style="width: {Math.min(member.budgetUtilization, 100)}%"></div>
              </div>
              <div class="mt-1 text-xs text-gray-600 text-center">
                {member.budgetUtilization.toFixed(1)}% used
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Projections Panel -->
  {#if showProjections}
    {@const projections = generateProjections()}
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Budget Projections</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-blue-900 mb-2">Projected Monthly</h3>
            <p class="text-2xl font-bold text-blue-600">{formatCurrency(projections.monthly)}</p>
            <p class="text-sm text-blue-700 mt-1">
              {projections.monthly > totalBudget ? "Over budget" : "Within budget"}
            </p>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <h3 class="font-medium text-purple-900 mb-2">Projected Yearly</h3>
            <p class="text-2xl font-bold text-purple-600">{formatCurrency(projections.yearly)}</p>
            <p class="text-sm text-purple-700 mt-1">Based on current trends</p>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <h3 class="font-medium text-green-900 mb-2">Potential Savings</h3>
            <p class="text-2xl font-bold {projections.savings >= 0 ? 'text-green-600' : 'text-red-600'}">
              {formatCurrency(projections.savings)}
            </p>
            <p class="text-sm text-green-700 mt-1">
              {projections.savings >= 0 ? "On track" : "Need to cut back"}
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Monthly Recharges Summary -->
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">Monthly Bills & Recharges</h2>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium text-gray-900 mb-3">Fixed Monthly Expenses</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Mobile Recharges:</span>
              <span class="font-medium"
                >₹{monthlyRecharges
                  .filter((r) => r.type === "mobile")
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Utilities (Electricity, Water, Gas):</span>
              <span class="font-medium"
                >₹{monthlyRecharges
                  .filter((r) => ["electricity", "water", "gas"].includes(r.type))
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Internet & TV:</span>
              <span class="font-medium"
                >₹{monthlyRecharges
                  .filter((r) => ["broadband", "dth"].includes(r.type))
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Streaming Services:</span>
              <span class="font-medium"
                >₹{monthlyRecharges
                  .filter((r) => r.type === "streaming")
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between font-semibold border-t pt-2">
              <span>Total Monthly Bills:</span>
              <span>₹{totalMonthlyRecharges.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-medium text-gray-900 mb-3">Yearly Renewals</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Insurance (Life & Health):</span>
              <span class="font-medium"
                >₹{yearlyRenewals
                  .filter((r) => r.type.includes("insurance"))
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Property Tax:</span>
              <span class="font-medium"
                >₹{yearlyRenewals
                  .filter((r) => r.type === "property_tax")
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Vehicle Insurance:</span>
              <span class="font-medium"
                >₹{yearlyRenewals
                  .filter((r) => r.type === "vehicle_insurance")
                  .reduce((sum, r) => sum + r.amount, 0)
                  .toLocaleString()}</span
              >
            </div>
            <div class="flex justify-between font-semibold border-t pt-2">
              <span>Total Yearly Renewals:</span>
              <span>₹{totalYearlyRenewals.toLocaleString()}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Monthly Average:</span>
              <span>₹{Math.round(totalYearlyRenewals / 12).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
