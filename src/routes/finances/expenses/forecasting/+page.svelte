<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Budget Forecasting";
  const pageDescription = "Predictive analytics and trend analysis for financial planning";

  // Forecast periods
  const forecastPeriods = [
    { id: "1month", name: "1 Month", months: 1 },
    { id: "3months", name: "3 Months", months: 3 },
    { id: "6months", name: "6 Months", months: 6 },
    { id: "1year", name: "1 Year", months: 12 }
  ];

  // Budget categories with icons and colors
  const budgetCategories = [
    { id: "food", name: "Food & Dining", icon: "heroicons:shopping-bag", color: "from-orange-500 to-orange-600", avgMonthly: 8500 },
    { id: "transport", name: "Transportation", icon: "heroicons:truck", color: "from-blue-500 to-blue-600", avgMonthly: 3200 },
    { id: "utilities", name: "Utilities", icon: "heroicons:bolt", color: "from-yellow-500 to-yellow-600", avgMonthly: 2800 },
    { id: "healthcare", name: "Healthcare", icon: "heroicons:heart", color: "from-red-500 to-red-600", avgMonthly: 1500 },
    { id: "education", name: "Education", icon: "heroicons:academic-cap", color: "from-purple-500 to-purple-600", avgMonthly: 2000 },
    { id: "entertainment", name: "Entertainment", icon: "heroicons:film", color: "from-pink-500 to-pink-600", avgMonthly: 1800 },
    { id: "shopping", name: "Shopping", icon: "heroicons:shopping-cart", color: "from-green-500 to-green-600", avgMonthly: 2500 },
    { id: "home", name: "Home & Garden", icon: "heroicons:home", color: "from-indigo-500 to-indigo-600", avgMonthly: 1200 },
    { id: "insurance", name: "Insurance", icon: "heroicons:shield-check", color: "from-teal-500 to-teal-600", avgMonthly: 800 },
    { id: "savings", name: "Savings & Investments", icon: "heroicons:banknotes", color: "from-emerald-500 to-emerald-600", avgMonthly: 5000 },
    { id: "other", name: "Other", icon: "heroicons:ellipsis-horizontal", color: "from-gray-500 to-gray-600", avgMonthly: 1000 }
  ];

  // Sample historical data (last 6 months)
  let historicalData = [
    { month: "Jul 2023", expenses: { food: 8200, transport: 3100, utilities: 2700, healthcare: 1400, education: 1900, entertainment: 1700, shopping: 2400, home: 1100, insurance: 800, savings: 4800, other: 900 } },
    { month: "Aug 2023", expenses: { food: 8600, transport: 3300, utilities: 2900, healthcare: 1600, education: 2100, entertainment: 1900, shopping: 2600, home: 1300, insurance: 800, savings: 5200, other: 1100 } },
    { month: "Sep 2023", expenses: { food: 8400, transport: 3200, utilities: 2800, healthcare: 1500, education: 2000, entertainment: 1800, shopping: 2500, home: 1200, insurance: 800, savings: 5000, other: 1000 } },
    { month: "Oct 2023", expenses: { food: 8800, transport: 3400, utilities: 3000, healthcare: 1700, education: 2200, entertainment: 2000, shopping: 2700, home: 1400, insurance: 800, savings: 5500, other: 1200 } },
    { month: "Nov 2023", expenses: { food: 8500, transport: 3200, utilities: 2800, healthcare: 1500, education: 2000, entertainment: 1800, shopping: 2500, home: 1200, insurance: 800, savings: 5000, other: 1000 } },
    { month: "Dec 2023", expenses: { food: 9200, transport: 3600, utilities: 3200, healthcare: 1800, education: 2300, entertainment: 2200, shopping: 2900, home: 1500, insurance: 800, savings: 5800, other: 1300 } }
  ];

  // Budget settings
  let budgetSettings = budgetCategories.map(cat => ({
    ...cat,
    budgeted: cat.avgMonthly,
    actual: 0,
    variance: 0,
    trend: "stable" // stable, increasing, decreasing
  }));

  // Forecast settings
  let selectedPeriod = "3months";
  let inflationRate = 3.5; // Annual inflation rate
  let incomeGrowth = 5.0; // Annual income growth rate

  // Forecast data
  let forecastData: any[] = [];

  // Scenario planning
  let scenarios = [
    { id: "conservative", name: "Conservative", description: "Lower spending, higher savings", multiplier: 0.9 },
    { id: "moderate", name: "Moderate", description: "Current spending patterns", multiplier: 1.0 },
    { id: "optimistic", name: "Optimistic", description: "Higher spending, moderate savings", multiplier: 1.1 }
  ];

  let selectedScenario = "moderate";

  // Goals
  let financialGoals = [
    { id: "emergency", name: "Emergency Fund", target: 100000, current: 25000, monthly: 2000 },
    { id: "vacation", name: "Family Vacation", target: 50000, current: 15000, monthly: 1500 },
    { id: "education", name: "Children's Education", target: 200000, current: 45000, monthly: 3000 },
    { id: "home", name: "Home Down Payment", target: 300000, current: 75000, monthly: 5000 }
  ];

  function calculateForecast() {
    const months = forecastPeriods.find(p => p.id === selectedPeriod)?.months || 3;
    const scenario = scenarios.find(s => s.id === selectedScenario);

    forecastData = [];

    for (let i = 1; i <= months; i++) {
      const monthName = new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      const forecastedExpenses = budgetCategories.reduce((acc, cat) => {
        // Calculate trend based on historical data
        const historical = historicalData.slice(-3).map(h => h.expenses[cat.id] || 0);
        const avg = historical.reduce((sum, val) => sum + val, 0) / historical.length;
        const trend = historical.length > 1 ? (historical[historical.length - 1] - historical[0]) / historical.length : 0;

        // Apply inflation and trend
        const inflationFactor = Math.pow(1 + inflationRate / 100 / 12, i);
        const trendFactor = 1 + (trend / avg) * (i / 12); // Annual trend adjustment
        const scenarioFactor = scenario?.multiplier || 1;

        acc[cat.id] = Math.round(avg * inflationFactor * trendFactor * scenarioFactor);
        return acc;
      }, {} as Record<string, number>);

      const totalExpenses = Object.values(forecastedExpenses).reduce((sum: number, val: number) => sum + val, 0);
      const totalIncome = Math.round(45000 * Math.pow(1 + incomeGrowth / 100 / 12, i)); // Assuming 45k monthly income
      const savings = totalIncome - totalExpenses;

      forecastData.push({
        month: monthName,
        expenses: forecastedExpenses,
        totalExpenses,
        totalIncome,
        savings,
        goals: financialGoals.map(goal => ({
          ...goal,
          projected: goal.current + (goal.monthly * i)
        }))
      });
    }
  }

  function updateBudgetSetting(categoryId: string, field: string, value: number) {
    budgetSettings = budgetSettings.map(setting =>
      setting.id === categoryId
        ? { ...setting, [field]: value, variance: setting.budgeted - setting.actual }
        : setting
    );
  }

  function getTrendIcon(trend: string) {
    switch (trend) {
      case "increasing": return "heroicons:arrow-trending-up";
      case "decreasing": return "heroicons:arrow-trending-down";
      default: return "heroicons:minus";
    }
  }

  function getTrendColor(trend: string) {
    switch (trend) {
      case "increasing": return "text-red-600";
      case "decreasing": return "text-green-600";
      default: return "text-gray-600";
    }
  }

  // Calculate current month totals
  $: currentMonthExpenses = budgetCategories.reduce((sum, cat) => sum + cat.avgMonthly, 0);
  $: currentMonthIncome = 45000; // Sample income
  $: currentMonthSavings = currentMonthIncome - currentMonthExpenses;

  // Initialize forecast on mount
  onMount(() => {
    calculateForecast();
  });

  // Recalculate when settings change
  $: selectedPeriod, selectedScenario, inflationRate, incomeGrowth, calculateForecast();
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Icon icon="heroicons:chart-bar" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Current Month Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-red-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Monthly Expenses</p>
              <p class="text-2xl font-bold text-red-600">₹{currentMonthExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-green-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p>
              <p class="text-2xl font-bold text-green-600">₹{currentMonthIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:piggy-bank" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</p>
              <p class="text-2xl font-bold text-blue-600">₹{currentMonthSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:chart-pie" class="w-6 h-6 text-purple-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Savings Rate</p>
              <p class="text-2xl font-bold text-purple-600">{((currentMonthSavings / currentMonthIncome) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Forecast Settings -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Forecast Settings</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="forecast-period" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Forecast Period</label>
          <select id="forecast-period" bind:value={selectedPeriod} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            {#each forecastPeriods as period}
              <option value={period.id}>{period.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="scenario" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scenario</label>
          <select id="scenario" bind:value={selectedScenario} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            {#each scenarios as scenario}
              <option value={scenario.id}>{scenario.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="inflation-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Inflation Rate (%)</label>
          <input
            id="inflation-rate"
            type="number"
            bind:value={inflationRate}
            step="0.1"
            class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label for="income-growth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Income Growth (%)</label>
          <input
            id="income-growth"
            type="number"
            bind:value={incomeGrowth}
            step="0.1"
            class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {#if selectedScenario !== "moderate"}
        <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div class="flex items-start gap-3">
            <Icon icon="heroicons:information-circle" class="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 class="font-medium text-blue-900 dark:text-blue-100">{scenarios.find(s => s.id === selectedScenario)?.name} Scenario</h4>
              <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {scenarios.find(s => s.id === selectedScenario)?.description}
              </p>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Forecast Results -->
    {#if forecastData.length > 0}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Monthly Forecast -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Forecast</h3>
          <div class="space-y-4">
            {#each forecastData as month}
              <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-medium text-gray-900 dark:text-white">{month.month}</h4>
                  <div class="text-right">
                    <div class="text-sm text-gray-600 dark:text-gray-400">Savings</div>
                    <div class="font-semibold {month.savings >= 0 ? 'text-green-600' : 'text-red-600'}">
                      ₹{month.savings.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div class="text-gray-600 dark:text-gray-400">Income</div>
                    <div class="font-medium text-gray-900 dark:text-white">₹{month.totalIncome.toLocaleString()}</div>
                  </div>
                  <div>
                    <div class="text-gray-600 dark:text-gray-400">Expenses</div>
                    <div class="font-medium text-gray-900 dark:text-white">₹{month.totalExpenses.toLocaleString()}</div>
                  </div>
                  <div>
                    <div class="text-gray-600 dark:text-gray-400">Savings Rate</div>
                    <div class="font-medium text-gray-900 dark:text-white">
                      {((month.savings / month.totalIncome) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Category Forecast ({forecastData[forecastData.length - 1]?.month})</h3>
          <div class="space-y-3">
            {#each budgetCategories as category}
              {@const forecastAmount = forecastData[forecastData.length - 1]?.expenses[category.id] || 0}
              {@const currentAmount = category.avgMonthly}
              {@const change = ((forecastAmount - currentAmount) / currentAmount * 100)}
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-lg" style="background: linear-gradient({category.color})">
                    <Icon icon={category.icon} class="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 dark:text-white">{category.name}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">₹{forecastAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium {change >= 0 ? 'text-red-600' : 'text-green-600'}">
                    {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">vs current</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Budget Planning -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Budget Planning</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Avg</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budgeted</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Variance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-slate-600">
            {#each budgetSettings as setting}
              <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg" style="background: linear-gradient({setting.color})">
                      <Icon icon={setting.icon} class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-900 dark:text-white font-medium">{setting.name}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ₹{setting.actual.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <input
                    type="number"
                    bind:value={setting.budgeted}
                    on:input={(e) => updateBudgetSetting(setting.id, 'budgeted', parseFloat((e.target as HTMLInputElement).value) || 0)}
                    class="w-24 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class={`font-medium ${setting.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {setting.variance >= 0 ? '+' : ''}₹{setting.variance.toLocaleString()}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <Icon icon={getTrendIcon(setting.trend)} class={`w-4 h-4 ${getTrendColor(setting.trend)}`} />
                    <span class="capitalize text-gray-600 dark:text-gray-400">{setting.trend}</span>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Financial Goals Progress -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Financial Goals Progress</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each financialGoals as goal}
          {@const progress = (goal.current / goal.target) * 100}
          {@const projected = forecastData.length > 0 ? forecastData[forecastData.length - 1].goals.find((g: any) => g.id === goal.id)?.projected || goal.current : goal.current}
          {@const projectedProgress = (projected / goal.target) * 100}
          <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">{goal.name}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  ₹{goal.current.toLocaleString()} of ₹{goal.target.toLocaleString()}
                </p>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-gray-900 dark:text-white">{progress.toFixed(1)}%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Current</div>
              </div>
            </div>

            <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 mb-3">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {Math.min(progress, 100)}%"></div>
            </div>

            {#if forecastData.length > 0}
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600 dark:text-gray-400">Projected ({forecastData[forecastData.length - 1].month}):</span>
                <span class="font-medium text-blue-600">{projectedProgress.toFixed(1)}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1 mt-1">
                <div class="bg-blue-400 h-1 rounded-full transition-all duration-300" style="width: {Math.min(projectedProgress, 100)}%"></div>
              </div>
            {/if}

            <div class="mt-3 flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Monthly: ₹{goal.monthly.toLocaleString()}</span>
              <span class="text-gray-600 dark:text-gray-400">
                {Math.ceil((goal.target - goal.current) / goal.monthly)} months remaining
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>