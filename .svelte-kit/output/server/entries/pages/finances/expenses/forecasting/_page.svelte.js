import { h as head, a as ensure_array_like, b as attr_class, s as stringify, f as attr_style } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import "../../../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentMonthExpenses, currentMonthIncome, currentMonthSavings;
    const pageDescription = "Predictive analytics and trend analysis for financial planning";
    const forecastPeriods = [
      { id: "1month", name: "1 Month", months: 1 },
      { id: "3months", name: "3 Months", months: 3 },
      { id: "6months", name: "6 Months", months: 6 },
      { id: "1year", name: "1 Year", months: 12 }
    ];
    const budgetCategories = [
      {
        id: "food",
        name: "Food & Dining",
        icon: "heroicons:shopping-bag",
        color: "from-orange-500 to-orange-600",
        avgMonthly: 8500
      },
      {
        id: "transport",
        name: "Transportation",
        icon: "heroicons:truck",
        color: "from-blue-500 to-blue-600",
        avgMonthly: 3200
      },
      {
        id: "utilities",
        name: "Utilities",
        icon: "heroicons:bolt",
        color: "from-yellow-500 to-yellow-600",
        avgMonthly: 2800
      },
      {
        id: "healthcare",
        name: "Healthcare",
        icon: "heroicons:heart",
        color: "from-red-500 to-red-600",
        avgMonthly: 1500
      },
      {
        id: "education",
        name: "Education",
        icon: "heroicons:academic-cap",
        color: "from-purple-500 to-purple-600",
        avgMonthly: 2e3
      },
      {
        id: "entertainment",
        name: "Entertainment",
        icon: "heroicons:film",
        color: "from-pink-500 to-pink-600",
        avgMonthly: 1800
      },
      {
        id: "shopping",
        name: "Shopping",
        icon: "heroicons:shopping-cart",
        color: "from-green-500 to-green-600",
        avgMonthly: 2500
      },
      {
        id: "home",
        name: "Home & Garden",
        icon: "heroicons:home",
        color: "from-indigo-500 to-indigo-600",
        avgMonthly: 1200
      },
      {
        id: "insurance",
        name: "Insurance",
        icon: "heroicons:shield-check",
        color: "from-teal-500 to-teal-600",
        avgMonthly: 800
      },
      {
        id: "savings",
        name: "Savings & Investments",
        icon: "heroicons:banknotes",
        color: "from-emerald-500 to-emerald-600",
        avgMonthly: 5e3
      },
      {
        id: "other",
        name: "Other",
        icon: "heroicons:ellipsis-horizontal",
        color: "from-gray-500 to-gray-600",
        avgMonthly: 1e3
      }
    ];
    let historicalData = [
      {
        month: "Jul 2023",
        expenses: {
          food: 8200,
          transport: 3100,
          utilities: 2700,
          healthcare: 1400,
          education: 1900,
          entertainment: 1700,
          shopping: 2400,
          home: 1100,
          insurance: 800,
          savings: 4800,
          other: 900
        }
      },
      {
        month: "Aug 2023",
        expenses: {
          food: 8600,
          transport: 3300,
          utilities: 2900,
          healthcare: 1600,
          education: 2100,
          entertainment: 1900,
          shopping: 2600,
          home: 1300,
          insurance: 800,
          savings: 5200,
          other: 1100
        }
      },
      {
        month: "Sep 2023",
        expenses: {
          food: 8400,
          transport: 3200,
          utilities: 2800,
          healthcare: 1500,
          education: 2e3,
          entertainment: 1800,
          shopping: 2500,
          home: 1200,
          insurance: 800,
          savings: 5e3,
          other: 1e3
        }
      },
      {
        month: "Oct 2023",
        expenses: {
          food: 8800,
          transport: 3400,
          utilities: 3e3,
          healthcare: 1700,
          education: 2200,
          entertainment: 2e3,
          shopping: 2700,
          home: 1400,
          insurance: 800,
          savings: 5500,
          other: 1200
        }
      },
      {
        month: "Nov 2023",
        expenses: {
          food: 8500,
          transport: 3200,
          utilities: 2800,
          healthcare: 1500,
          education: 2e3,
          entertainment: 1800,
          shopping: 2500,
          home: 1200,
          insurance: 800,
          savings: 5e3,
          other: 1e3
        }
      },
      {
        month: "Dec 2023",
        expenses: {
          food: 9200,
          transport: 3600,
          utilities: 3200,
          healthcare: 1800,
          education: 2300,
          entertainment: 2200,
          shopping: 2900,
          home: 1500,
          insurance: 800,
          savings: 5800,
          other: 1300
        }
      }
    ];
    let budgetSettings = budgetCategories.map((cat) => ({
      ...cat,
      budgeted: cat.avgMonthly,
      actual: 0,
      variance: 0,
      trend: "stable"
    }));
    let selectedPeriod = "3months";
    let inflationRate = 3.5;
    let incomeGrowth = 5;
    let forecastData = [];
    let scenarios = [
      {
        id: "conservative",
        name: "Conservative",
        description: "Lower spending, higher savings",
        multiplier: 0.9
      },
      {
        id: "moderate",
        name: "Moderate",
        description: "Current spending patterns",
        multiplier: 1
      },
      {
        id: "optimistic",
        name: "Optimistic",
        description: "Higher spending, moderate savings",
        multiplier: 1.1
      }
    ];
    let selectedScenario = "moderate";
    let financialGoals = [
      {
        id: "emergency",
        name: "Emergency Fund",
        target: 1e5,
        current: 25e3,
        monthly: 2e3
      },
      {
        id: "vacation",
        name: "Family Vacation",
        target: 5e4,
        current: 15e3,
        monthly: 1500
      },
      {
        id: "education",
        name: "Children's Education",
        target: 2e5,
        current: 45e3,
        monthly: 3e3
      },
      {
        id: "home",
        name: "Home Down Payment",
        target: 3e5,
        current: 75e3,
        monthly: 5e3
      }
    ];
    function calculateForecast() {
      const months = forecastPeriods.find((p) => p.id === selectedPeriod)?.months || 3;
      const scenario = scenarios.find((s) => s.id === selectedScenario);
      forecastData = [];
      for (let i = 1; i <= months; i++) {
        const monthName = new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1e3).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        const forecastedExpenses = budgetCategories.reduce(
          (acc, cat) => {
            const historical = historicalData.slice(-3).map((h) => h.expenses[cat.id] || 0);
            const avg = historical.reduce((sum, val) => sum + val, 0) / historical.length;
            const trend = historical.length > 1 ? (historical[historical.length - 1] - historical[0]) / historical.length : 0;
            const inflationFactor = Math.pow(1 + inflationRate / 100 / 12, i);
            const trendFactor = 1 + trend / avg * (i / 12);
            const scenarioFactor = scenario?.multiplier || 1;
            acc[cat.id] = Math.round(avg * inflationFactor * trendFactor * scenarioFactor);
            return acc;
          },
          {}
        );
        const totalExpenses = Object.values(forecastedExpenses).reduce((sum, val) => sum + val, 0);
        const totalIncome = Math.round(45e3 * Math.pow(1 + incomeGrowth / 100 / 12, i));
        const savings = totalIncome - totalExpenses;
        forecastData.push({
          month: monthName,
          expenses: forecastedExpenses,
          totalExpenses,
          totalIncome,
          savings,
          goals: financialGoals.map((goal) => ({ ...goal, projected: goal.current + goal.monthly * i }))
        });
      }
    }
    function getTrendIcon(trend) {
      switch (trend) {
        case "increasing":
          return "heroicons:arrow-trending-up";
        case "decreasing":
          return "heroicons:arrow-trending-down";
        default:
          return "heroicons:minus";
      }
    }
    function getTrendColor(trend) {
      switch (trend) {
        case "increasing":
          return "text-red-600";
        case "decreasing":
          return "text-green-600";
        default:
          return "text-gray-600";
      }
    }
    currentMonthExpenses = budgetCategories.reduce((sum, cat) => sum + cat.avgMonthly, 0);
    currentMonthIncome = 45e3;
    currentMonthSavings = currentMonthIncome - currentMonthExpenses;
    calculateForecast();
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Budget Forecasting - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-8 h-8 text-blue-600 dark:text-blue-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Budget Forecasting</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Predictive analytics and trend analysis for financial planning</p></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-red-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Monthly Expenses</p> <p class="text-2xl font-bold text-red-600">₹${escape_html(currentMonthExpenses.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-green-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p> <p class="text-2xl font-bold text-green-600">₹${escape_html(currentMonthIncome.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:piggy-bank", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</p> <p class="text-2xl font-bold text-blue-600">₹${escape_html(currentMonthSavings.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-pie",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Savings Rate</p> <p class="text-2xl font-bold text-purple-600">${escape_html((currentMonthSavings / currentMonthIncome * 100).toFixed(1))}%</p></div></div></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Forecast Settings</h3> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label for="forecast-period" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Forecast Period</label> `);
    $$renderer2.select(
      {
        id: "forecast-period",
        value: selectedPeriod,
        class: "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(forecastPeriods);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let period = each_array[$$index];
          $$renderer3.option({ value: period.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(period.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="scenario" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scenario</label> `);
    $$renderer2.select(
      {
        id: "scenario",
        value: selectedScenario,
        class: "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(scenarios);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let scenario = each_array_1[$$index_1];
          $$renderer3.option({ value: scenario.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(scenario.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="inflation-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Inflation Rate (%)</label> <input id="inflation-rate" type="number"${attr("value", inflationRate)} step="0.1" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"/></div> <div><label for="income-growth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Income Growth (%)</label> <input id="income-growth" type="number"${attr("value", incomeGrowth)} step="0.1" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"/></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (forecastData.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Forecast</h3> <div class="space-y-4"><!--[-->`);
      const each_array_2 = ensure_array_like(forecastData);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let month = each_array_2[$$index_2];
        $$renderer2.push(`<div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"><div class="flex justify-between items-center mb-2"><h4 class="font-medium text-gray-900 dark:text-white">${escape_html(month.month)}</h4> <div class="text-right"><div class="text-sm text-gray-600 dark:text-gray-400">Savings</div> <div${attr_class(`font-semibold ${stringify(month.savings >= 0 ? "text-green-600" : "text-red-600")}`)}>₹${escape_html(month.savings.toLocaleString())}</div></div></div> <div class="grid grid-cols-3 gap-4 text-sm"><div><div class="text-gray-600 dark:text-gray-400">Income</div> <div class="font-medium text-gray-900 dark:text-white">₹${escape_html(month.totalIncome.toLocaleString())}</div></div> <div><div class="text-gray-600 dark:text-gray-400">Expenses</div> <div class="font-medium text-gray-900 dark:text-white">₹${escape_html(month.totalExpenses.toLocaleString())}</div></div> <div><div class="text-gray-600 dark:text-gray-400">Savings Rate</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html((month.savings / month.totalIncome * 100).toFixed(1))}%</div></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Category Forecast (${escape_html(forecastData[forecastData.length - 1]?.month)})</h3> <div class="space-y-3"><!--[-->`);
      const each_array_3 = ensure_array_like(budgetCategories);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let category = each_array_3[$$index_3];
        const forecastAmount = forecastData[forecastData.length - 1]?.expenses[category.id] || 0;
        const currentAmount = category.avgMonthly;
        const change = (forecastAmount - currentAmount) / currentAmount * 100;
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"><div class="flex items-center gap-3"><div class="p-2 rounded-lg"${attr_style(`background: linear-gradient(${stringify(category.color)})`)}>`);
        Icon($$renderer2, { icon: category.icon, class: "w-4 h-4 text-white" });
        $$renderer2.push(`<!----></div> <div><div class="font-medium text-gray-900 dark:text-white">${escape_html(category.name)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">₹${escape_html(forecastAmount.toLocaleString())}</div></div></div> <div class="text-right"><div${attr_class(`text-sm font-medium ${stringify(change >= 0 ? "text-red-600" : "text-green-600")}`)}>${escape_html(change >= 0 ? "+" : "")}${escape_html(change.toFixed(1))}%</div> <div class="text-xs text-gray-500 dark:text-gray-400">vs current</div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Budget Planning</h3> <div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 dark:bg-slate-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Avg</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budgeted</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Variance</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Trend</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-slate-600"><!--[-->`);
    const each_array_4 = ensure_array_like(budgetSettings);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let setting = each_array_4[$$index_4];
      $$renderer2.push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700"><td class="px-6 py-4 whitespace-nowrap text-sm"><div class="flex items-center gap-3"><div class="p-2 rounded-lg"${attr_style(`background: linear-gradient(${stringify(setting.color)})`)}>`);
      Icon($$renderer2, { icon: setting.icon, class: "w-4 h-4 text-white" });
      $$renderer2.push(`<!----></div> <span class="text-gray-900 dark:text-white font-medium">${escape_html(setting.name)}</span></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹${escape_html(setting.actual.toLocaleString())}</td><td class="px-6 py-4 whitespace-nowrap text-sm"><input type="number"${attr("value", setting.budgeted)} class="w-24 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"/></td><td class="px-6 py-4 whitespace-nowrap text-sm"><span${attr_class(`font-medium ${setting.variance >= 0 ? "text-green-600" : "text-red-600"}`)}>${escape_html(setting.variance >= 0 ? "+" : "")}₹${escape_html(setting.variance.toLocaleString())}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm"><div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: getTrendIcon(setting.trend),
        class: `w-4 h-4 ${getTrendColor(setting.trend)}`
      });
      $$renderer2.push(`<!----> <span class="capitalize text-gray-600 dark:text-gray-400">${escape_html(setting.trend)}</span></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Financial Goals Progress</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
    const each_array_5 = ensure_array_like(financialGoals);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let goal = each_array_5[$$index_5];
      const progress = goal.current / goal.target * 100;
      const projected = forecastData.length > 0 ? forecastData[forecastData.length - 1].goals.find((g) => g.id === goal.id)?.projected || goal.current : goal.current;
      const projectedProgress = projected / goal.target * 100;
      $$renderer2.push(`<div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"><div class="flex justify-between items-start mb-3"><div><h4 class="font-medium text-gray-900 dark:text-white">${escape_html(goal.name)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400">₹${escape_html(goal.current.toLocaleString())} of ₹${escape_html(goal.target.toLocaleString())}</p></div> <div class="text-right"><div class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(progress.toFixed(1))}%</div> <div class="text-sm text-gray-600 dark:text-gray-400">Current</div></div></div> <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 mb-3"><div class="bg-blue-600 h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(Math.min(progress, 100))}%`)}></div></div> `);
      if (forecastData.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-between items-center text-sm"><span class="text-gray-600 dark:text-gray-400">Projected (${escape_html(forecastData[forecastData.length - 1].month)}):</span> <span class="font-medium text-blue-600">${escape_html(projectedProgress.toFixed(1))}%</span></div> <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1 mt-1"><div class="bg-blue-400 h-1 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(Math.min(projectedProgress, 100))}%`)}></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="mt-3 flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Monthly: ₹${escape_html(goal.monthly.toLocaleString())}</span> <span class="text-gray-600 dark:text-gray-400">${escape_html(Math.ceil((goal.target - goal.current) / goal.monthly))} months remaining</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
  });
}
export {
  _page as default
};
