<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { expenseCategories, monthlyBudget, expenseHistory, subscriptions, propertyTaxes, calculateMonthlyAverage, getUpcomingRenewals, getPendingTaxes } from "../../src/lib/data/expenses.js";

  let currentTab = "overview";
  let selectedCategory = "spiritual";
  let selectedMonth = "october2024";

  const tabs = [
    { id: "overview", label: "Budget Overview", icon: "heroicons:chart-pie" },
    { id: "categories", label: "Expense Categories", icon: "heroicons:squares-2x2" },
    { id: "subscriptions", label: "Subscriptions", icon: "heroicons:calendar-days" },
    { id: "property", label: "Property & Taxes", icon: "heroicons:building-office" },
    { id: "analytics", label: "Analytics & Trends", icon: "heroicons:chart-bar" },
  ];

  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case "active":
      case "paid":
        return "text-green-600 bg-green-100";
      case "pending":
      case "upcoming":
        return "text-orange-600 bg-orange-100";
      case "overdue":
      case "expired":
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

  function getMonthlyTotal(monthData) {
    if (monthData.planned) {
      return Object.values(monthData.planned).reduce((sum, amount) => sum + amount, 0);
    } else if (monthData.estimated) {
      return Object.values(monthData.estimated).reduce((sum, amount) => sum + amount, 0);
    }
    return 0;
  }

  function calculateBudgetVariance(planned, actual) {
    if (!planned || !actual) return 0;
    return Math.round(((actual - planned) / planned) * 100);
  }

  function isRenewalDue(renewalDate, days = 7) {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days && diffDays >= 0;
  }

  onMount(() => {
    document.title = "Expense Management - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-purple-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl text-white">
            <Icon icon="heroicons:banknotes" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Expense Management</h1>
            <p class="text-gray-600 dark:text-gray-300">व्यय प्रबन्धन | Complete family budget tracking and financial planning</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="flex items-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
            <Icon icon="heroicons:plus" class="w-5 h-5" />
            <span>Add Expense</span>
          </button>
          <button class="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <!-- Financial Philosophy -->
      <div class="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:banknotes" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">धन संयम | Financial Discipline & Wisdom</h3>
            <p class="text-white/90">"अर्थस्य पुरुषो दासो दासस्त्वर्थो न कस्यचित् | Money should serve the person, not the person serve money. Wise financial planning ensures family prosperity and spiritual peace."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "பணம் நமக்கு வேலை செய்ய வேண்டும், நாம் பணத்திற்கு வேலை செய்யக் கூடாது"</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{formatCurrency(calculateMonthlyAverage(expenseHistory))}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Monthly Average</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{getUpcomingRenewals().length}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Renewals Due</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">{getPendingTaxes().length}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Taxes Pending</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">{Object.keys(expenseCategories).length}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Categories</div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-green-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    {#if currentTab === "overview"}
      <!-- Budget Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Current Month Budget -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">October 2024 Budget vs Actual</h3>
          {#if monthlyBudget.october2024}
            {@const currentMonth = monthlyBudget.october2024}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Planned Budget</h4>
                <div class="space-y-2">
                  {#each Object.entries(currentMonth.planned) as [category, amount]}
                    <div class="flex justify-between text-sm">
                      <span class="capitalize text-gray-600 dark:text-gray-400">{category.replace("_", " ")}:</span>
                      <span class="font-medium">{formatCurrency(amount)}</span>
                    </div>
                  {/each}
                  <div class="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span class="text-green-600">{formatCurrency(getMonthlyTotal(currentMonth))}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Actual Spend</h4>
                <div class="space-y-2">
                  {#each Object.entries(currentMonth.actual) as [category, amount]}
                    {@const planned = currentMonth.planned[category]}
                    {@const variance = calculateBudgetVariance(planned, amount)}
                    <div class="flex justify-between text-sm">
                      <span class="capitalize text-gray-600 dark:text-gray-400">{category.replace("_", " ")}:</span>
                      <div class="flex items-center space-x-2">
                        <span class="font-medium">{formatCurrency(amount)}</span>
                        {#if variance !== 0}
                          <span class="text-xs px-1 py-0.5 rounded {variance > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}">
                            {variance > 0 ? "+" : ""}{variance}%
                          </span>
                        {/if}
                      </div>
                    </div>
                  {/each}
                  <div class="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span class="text-blue-600">{formatCurrency(Object.values(currentMonth.actual).reduce((sum, amount) => sum + amount, 0))}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Budget Notes -->
            <div class="mt-6">
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Budget Notes</h4>
              <div class="space-y-2">
                {#each Object.entries(currentMonth.notes) as [category, note]}
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="flex items-start space-x-2">
                      <Icon icon="heroicons:information-circle" class="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <span class="font-medium text-blue-800 dark:text-blue-200 capitalize">{category.replace("_", " ")}: </span>
                        <span class="text-blue-700 dark:text-blue-300">{note}</span>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        <!-- Upcoming Items -->
        <div class="space-y-4">
          <!-- Upcoming Renewals -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2 text-orange-500" />
              Upcoming Renewals
            </h3>
            <div class="space-y-3">
              {#each getUpcomingRenewals(30) as renewal}
                <div class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-gray-900 dark:text-white">{renewal.type}</span>
                    <span class="px-2 py-1 text-xs rounded-full {getStatusColor(renewal.status)}">
                      {renewal.status}
                    </span>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <div>{renewal.member} - {renewal.provider}</div>
                    <div class="flex justify-between">
                      <span>{renewal.plan}</span>
                      <span class={isRenewalDue(renewal.renewalDate) ? "text-red-600 font-medium" : ""}>
                        Due: {new Date(renewal.renewalDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Pending Taxes -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:building-office" class="w-5 h-5 mr-2 text-red-500" />
              Pending Taxes
            </h3>
            <div class="space-y-3">
              {#each getPendingTaxes() as tax}
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-red-800 dark:text-red-200">{tax.name}</span>
                    <span class="font-medium text-red-600">{formatCurrency(tax.amount)}</span>
                  </div>
                  <div class="text-sm text-red-600 dark:text-red-400">
                    <div>Due: {new Date(tax.dueDate).toLocaleDateString()}</div>
                    {#if tax.notes}
                      <div class="mt-1">{tax.notes}</div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- November Prediction -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:crystal-ball" class="w-5 h-5 mr-2 text-purple-500" />
              November Prediction
            </h3>
            {#if monthlyBudget.predicted_november}
              {@const novemberBudget = monthlyBudget.predicted_november}
              <div class="space-y-2">
                <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div class="text-2xl font-bold text-purple-600">{formatCurrency(getMonthlyTotal(novemberBudget))}</div>
                  <div class="text-sm text-purple-700 dark:text-purple-300">Estimated Total</div>
                </div>
                <div class="space-y-1 text-sm">
                  {#each Object.entries(novemberBudget.reasoning) as [category, reason]}
                    <div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <span class="font-medium capitalize">{category.replace("_", " ")}: </span>
                      <span class="text-purple-700 dark:text-purple-300">{reason}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {:else if currentTab === "categories"}
      <!-- Expense Categories -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Category Selector -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Expense Categories</h3>
          <div class="space-y-2">
            {#each Object.entries(expenseCategories) as [categoryId, category]}
              <button class="w-full p-3 rounded-lg text-left transition-all duration-200 {selectedCategory === categoryId ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'}" on:click={() => (selectedCategory = categoryId)}>
                <div class="flex items-center space-x-3">
                  <Icon icon={category.icon} class="w-5 h-5" />
                  <span class="font-medium">{category.name}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Category Details -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {#if expenseCategories[selectedCategory]}
            {@const category = expenseCategories[selectedCategory]}
            <div class="flex items-center space-x-3 mb-6">
              <div class="p-3 bg-gradient-to-r {category.color} rounded-xl text-white">
                <Icon icon={category.icon} class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each category.items as item}
                <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                    <span class="font-bold text-green-600">{formatCurrency(item.amount)}</span>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div class="flex items-center space-x-2">
                      <Icon icon="heroicons:clock" class="w-3 h-3" />
                      <span class="capitalize">{item.frequency.replace("_", " ")}</span>
                    </div>
                    {#if item.notes}
                      <div class="flex items-start space-x-2">
                        <Icon icon="heroicons:information-circle" class="w-3 h-3 mt-0.5" />
                        <span>{item.notes}</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>

            <!-- Category Summary -->
            <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Category Summary</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Monthly Items: </span>
                  <span class="font-medium">{category.items.filter((item) => item.frequency === "monthly").length}</span>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Total Items: </span>
                  <span class="font-medium">{category.items.length}</span>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Monthly Total: </span>
                  <span class="font-medium text-green-600">
                    {formatCurrency(category.items.filter((item) => item.frequency === "monthly").reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Annual Estimate: </span>
                  <span class="font-medium text-purple-600">
                    {formatCurrency(
                      category.items.reduce((sum, item) => {
                        switch (item.frequency) {
                          case "monthly":
                            return sum + item.amount * 12;
                          case "weekly":
                            return sum + item.amount * 52;
                          case "quarterly":
                            return sum + item.amount * 4;
                          case "yearly":
                          case "seasonal":
                            return sum + item.amount;
                          case "term":
                            return sum + item.amount * 3;
                          default:
                            return sum;
                        }
                      }, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else if currentTab === "subscriptions"}
      <!-- Subscriptions Management -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Active Subscriptions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Active Subscriptions</h3>
          <div class="space-y-4">
            {#each subscriptions.filter((sub) => sub.status === "active" || sub.status === "paid") as subscription}
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {subscription.type.charAt(0)}
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900 dark:text-white">{subscription.provider}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{subscription.member}</p>
                    </div>
                  </div>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(subscription.status)}">
                    {subscription.status}
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="font-medium text-green-600">{subscription.plan}</span>
                  <div class="text-right">
                    <div class="text-gray-600 dark:text-gray-400">Next: {new Date(subscription.renewalDate).toLocaleDateString()}</div>
                    {#if isRenewalDue(subscription.renewalDate)}
                      <div class="text-red-600 font-medium">Due Soon!</div>
                    {/if}
                  </div>
                </div>
                {#if subscription.autoRenewal}
                  <div class="mt-2 flex items-center space-x-1 text-xs text-green-600">
                    <Icon icon="heroicons:arrow-path" class="w-3 h-3" />
                    <span>Auto-renewal enabled</span>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Upcoming Renewals & Actions -->
        <div class="space-y-4">
          <!-- Renewals Due Soon -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Renewals Due (Next 30 Days)</h3>
            <div class="space-y-3">
              {#each getUpcomingRenewals(30) as renewal}
                <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-orange-800 dark:text-orange-200">{renewal.provider}</span>
                    <span class="font-medium text-orange-600">{renewal.plan}</span>
                  </div>
                  <div class="text-sm text-orange-700 dark:text-orange-300">
                    <div>{renewal.member} • {renewal.type}</div>
                    <div class="flex justify-between mt-1">
                      <span>Due: {new Date(renewal.renewalDate).toLocaleDateString()}</span>
                      {#if !renewal.autoRenewal}
                        <span class="font-medium">Manual Renewal Required</span>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Subscription Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Subscription Summary</h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    subscriptions.reduce((sum, sub) => {
                      const amount = parseInt(sub.plan.replace(/[^\d]/g, ""));
                      return sum + (sub.plan.includes("year") ? amount / 12 : amount);
                    }, 0)
                  )}
                </div>
                <div class="text-sm text-blue-700 dark:text-blue-300">Monthly Subscription Cost</div>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div class="font-medium text-green-800 dark:text-green-200">Active</div>
                  <div class="text-green-600">{subscriptions.filter((sub) => sub.status === "active" || sub.status === "paid").length}</div>
                </div>
                <div class="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <div class="font-medium text-orange-800 dark:text-orange-200">Due Soon</div>
                  <div class="text-orange-600">{getUpcomingRenewals(7).length}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div class="space-y-2">
              <button class="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"> Add New Subscription </button>
              <button class="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"> Bulk Renewal Reminder </button>
              <button class="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"> Export Subscription Report </button>
            </div>
          </div>
        </div>
      </div>
    {:else if currentTab === "property"}
      <!-- Property & Taxes -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Property Taxes -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Property Taxes & Civic Dues</h3>
          <div class="space-y-4">
            {#each propertyTaxes as tax}
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900 dark:text-white">{tax.name}</h4>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(tax.status)}">
                    {tax.status}
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span class="font-medium text-green-600">{formatCurrency(tax.amount)}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Due Date:</span>
                    <span class="font-medium {tax.status === 'pending' ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}">
                      {new Date(tax.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div class="text-gray-600 dark:text-gray-400">
                    Property: {tax.propertyAddress}
                  </div>
                  {#if tax.paymentDate}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Paid On:</span>
                      <span class="text-green-600">{new Date(tax.paymentDate).toLocaleDateString()}</span>
                    </div>
                  {/if}
                  {#if tax.receiptNumber}
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Receipt:</span>
                      <span class="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{tax.receiptNumber}</span>
                    </div>
                  {/if}
                  {#if tax.notes}
                    <div class="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-yellow-800 dark:text-yellow-200">
                      <Icon icon="heroicons:information-circle" class="w-4 h-4 inline mr-1" />
                      {tax.notes}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Property Information & Documents -->
        <div class="space-y-4">
          <!-- Property Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Property Information</h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Primary Residence</h4>
                <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <div>Address: Kovaipudur, Coimbatore - 641042</div>
                  <div>Property Type: Residential - Independent House</div>
                  <div>Area: 2400 sq ft (Built-up), 3600 sq ft (Plot)</div>
                  <div>Registration: Sub-Registrar Office, Coimbatore</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tax Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Tax Summary</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="text-2xl font-bold text-green-600">
                  {formatCurrency(propertyTaxes.filter((tax) => tax.status === "paid").reduce((sum, tax) => sum + tax.amount, 0))}
                </div>
                <div class="text-sm text-green-700 dark:text-green-300">Paid This Year</div>
              </div>

              <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div class="text-2xl font-bold text-red-600">
                  {formatCurrency(propertyTaxes.filter((tax) => tax.status === "pending").reduce((sum, tax) => sum + tax.amount, 0))}
                </div>
                <div class="text-sm text-red-700 dark:text-red-300">Pending Payment</div>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div class="font-medium">Total Taxes</div>
                  <div class="text-gray-600 dark:text-gray-400">{propertyTaxes.length}</div>
                </div>
                <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div class="font-medium">Due Items</div>
                  <div class="text-red-600">{getPendingTaxes().length}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Document Vault -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Document Vault</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <span class="text-green-800 dark:text-green-200">Sale Deed</span>
                <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600" />
              </div>
              <div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <span class="text-green-800 dark:text-green-200">Patta & Chitta</span>
                <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600" />
              </div>
              <div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <span class="text-green-800 dark:text-green-200">EC (Encumbrance Certificate)</span>
                <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600" />
              </div>
              <div class="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <span class="text-orange-800 dark:text-orange-200">Building Plan Approval</span>
                <Icon icon="heroicons:clock" class="w-4 h-4 text-orange-600" />
              </div>
              <div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <span class="text-green-800 dark:text-green-200">Tax Payment Receipts</span>
                <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else if currentTab === "analytics"}
      <!-- Analytics & Trends -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Expense Trends -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">3-Month Expense Trend</h3>
          <div class="space-y-4">
            {#each expenseHistory as month}
              <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-white">{month.month}</h4>
                  <span class="font-bold text-green-600">{formatCurrency(month.total)}</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div class="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div class="font-medium text-blue-800 dark:text-blue-200">Groceries</div>
                    <div class="text-blue-600">{formatCurrency(month.categories.groceries)}</div>
                  </div>
                  <div class="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div class="font-medium text-purple-800 dark:text-purple-200">Education</div>
                    <div class="text-purple-600">{formatCurrency(month.categories.education)}</div>
                  </div>
                  <div class="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <div class="font-medium text-orange-800 dark:text-orange-200">Transport</div>
                    <div class="text-orange-600">{formatCurrency(month.categories.transport)}</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Financial Insights -->
        <div class="space-y-4">
          <!-- Key Metrics -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Financial Insights</h3>
            <div class="space-y-3">
              <div class="p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <div class="text-2xl font-bold text-green-600">{formatCurrency(calculateMonthlyAverage(expenseHistory))}</div>
                <div class="text-sm text-green-700 dark:text-green-300">3-Month Average</div>
              </div>

              {@const maxMonth = expenseHistory.reduce((max, month) => (month.total > max.total ? month : max))}
              {@const minMonth = expenseHistory.reduce((min, month) => (month.total < min.total ? month : min))}

              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                  <div class="font-bold text-red-600">{formatCurrency(maxMonth.total)}</div>
                  <div class="text-xs text-red-700 dark:text-red-300">Highest: {maxMonth.month}</div>
                </div>
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div class="font-bold text-green-600">{formatCurrency(minMonth.total)}</div>
                  <div class="text-xs text-green-700 dark:text-green-300">Lowest: {minMonth.month}</div>
                </div>
              </div>

              <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div class="text-sm font-medium text-purple-800 dark:text-purple-200 mb-1">Budget Variance (Oct)</div>
                {@const octPlanned = getMonthlyTotal(monthlyBudget.october2024)}
                {@const octActual = Object.values(monthlyBudget.october2024.actual).reduce((sum, amount) => sum + amount, 0)}
                {@const variance = calculateBudgetVariance(octPlanned, octActual)}
                <div class="text-lg font-bold {variance > 0 ? 'text-red-600' : 'text-green-600'}">
                  {variance > 0 ? "+" : ""}{variance}%
                </div>
                <div class="text-xs text-purple-700 dark:text-purple-300">
                  {variance > 0 ? "Over budget" : "Under budget"} by {formatCurrency(Math.abs(octActual - octPlanned))}
                </div>
              </div>
            </div>
          </div>

          <!-- AI Suggestions -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2 text-yellow-500" />
              AI Suggestions
            </h3>
            <div class="space-y-3 text-sm">
              <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div class="font-medium text-yellow-800 dark:text-yellow-200 mb-1">💡 Festival Planning</div>
                <div class="text-yellow-700 dark:text-yellow-300">Diwali expenses are predicted to increase by 15%. Consider setting aside ₹3,000 extra for festival preparations.</div>
              </div>

              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="font-medium text-blue-800 dark:text-blue-200 mb-1">💡 Subscription Optimization</div>
                <div class="text-blue-700 dark:text-blue-300">You have 3 OTT subscriptions. Consider family bundling to save ₹200/month.</div>
              </div>

              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="font-medium text-green-800 dark:text-green-200 mb-1">💡 Budget Achievement</div>
                <div class="text-green-700 dark:text-green-300">Great job staying within grocery budget for 2 months! Consider reward for family discipline.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Expense Management Tips -->
    <div class="mt-12 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
      <h4 class="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">
        <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
        धन प्रबन्धन सूत्र | Financial Management Wisdom
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-green-700 dark:text-green-300 mb-2">Budget Discipline:</h5>
          <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• Track daily expenses for better awareness</li>
            <li>• Plan festival budgets 2 months in advance</li>
            <li>• Review subscriptions quarterly for optimization</li>
            <li>• Keep emergency fund for unexpected expenses</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-green-700 dark:text-green-300 mb-2">Smart Savings:</h5>
          <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• Automate SIP investments for wealth building</li>
            <li>• Buy in bulk for non-perishable items</li>
            <li>• Compare prices before major purchases</li>
            <li>• Invest in quality items for long-term savings</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-green-200 dark:bg-green-800 rounded-lg italic text-green-800 dark:text-green-200">"यो ददाति सहस्राणि गवां अश्वशतैरपि तत्तुल्यम् तु भवेदानं दाने गृहे सुसंस्कृते | A well-managed household that gives even a small amount with love equals the charity of thousands. Financial discipline brings both prosperity and peace."</blockquote>
    </div>
  </div>
</div>
