import { h as head, a as ensure_array_like, f as attr_style, s as stringify, b as attr_class } from "../../../../../chunks/index2.js";
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
    let totalGoals, completedGoals, inProgressGoals, totalTargetAmount, totalCurrentAmount, overallProgress, filteredGoals;
    const pageDescription = "Set, track, and achieve your financial objectives";
    const goalCategories = [
      {
        id: "emergency",
        name: "Emergency Fund",
        icon: "heroicons:shield-exclamation",
        color: "from-red-500 to-red-600"
      },
      {
        id: "savings",
        name: "Savings",
        icon: "heroicons:banknotes",
        color: "from-green-500 to-green-600"
      },
      {
        id: "debt",
        name: "Debt Payoff",
        icon: "heroicons:credit-card",
        color: "from-orange-500 to-orange-600"
      },
      {
        id: "investment",
        name: "Investment",
        icon: "heroicons:chart-line",
        color: "from-blue-500 to-blue-600"
      },
      {
        id: "home",
        name: "Home Purchase",
        icon: "heroicons:home",
        color: "from-purple-500 to-purple-600"
      },
      {
        id: "education",
        name: "Education",
        icon: "heroicons:academic-cap",
        color: "from-indigo-500 to-indigo-600"
      },
      {
        id: "vacation",
        name: "Vacation",
        icon: "heroicons:map",
        color: "from-pink-500 to-pink-600"
      },
      {
        id: "retirement",
        name: "Retirement",
        icon: "heroicons:clock",
        color: "from-teal-500 to-teal-600"
      },
      {
        id: "business",
        name: "Business",
        icon: "heroicons:building-storefront",
        color: "from-yellow-500 to-yellow-600"
      },
      {
        id: "other",
        name: "Other",
        icon: "heroicons:star",
        color: "from-gray-500 to-gray-600"
      }
    ];
    const priorities = [
      {
        id: "high",
        name: "High",
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      },
      {
        id: "medium",
        name: "Medium",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      },
      {
        id: "low",
        name: "Low",
        color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      }
    ];
    let goals = [
      {
        id: 1,
        name: "Emergency Fund",
        category: "emergency",
        description: "Build a 6-month emergency fund for unexpected expenses",
        targetAmount: 27e4,
        currentAmount: 85e3,
        monthlyContribution: 8e3,
        targetDate: "2024-12-31",
        priority: "high",
        status: "in_progress",
        milestones: [
          {
            id: 1,
            name: "Initial deposit",
            amount: 25e3,
            completed: true,
            date: "2024-01-15"
          },
          {
            id: 2,
            name: "3-month fund",
            amount: 135e3,
            completed: false
          },
          {
            id: 3,
            name: "6-month fund",
            amount: 27e4,
            completed: false
          }
        ],
        notes: "Currently have 3 months of expenses covered. Need to accelerate contributions."
      },
      {
        id: 2,
        name: "Children's Education Fund",
        category: "education",
        description: "Save for children's higher education expenses",
        targetAmount: 5e5,
        currentAmount: 125e3,
        monthlyContribution: 12e3,
        targetDate: "2030-12-31",
        priority: "high",
        status: "in_progress",
        milestones: [
          {
            id: 1,
            name: "Year 1 complete",
            amount: 144e3,
            completed: true,
            date: "2024-01-01"
          },
          {
            id: 2,
            name: "Year 2 complete",
            amount: 288e3,
            completed: false
          },
          {
            id: 3,
            name: "Year 3 complete",
            amount: 432e3,
            completed: false
          }
        ],
        notes: "Planning for engineering education. Considering PPF and mutual funds."
      },
      {
        id: 3,
        name: "Home Down Payment",
        category: "home",
        description: "Save for 20% down payment on new home",
        targetAmount: 6e5,
        currentAmount: 18e4,
        monthlyContribution: 15e3,
        targetDate: "2025-06-30",
        priority: "medium",
        status: "in_progress",
        milestones: [
          {
            id: 1,
            name: "20% saved",
            amount: 12e4,
            completed: true,
            date: "2023-12-01"
          },
          { id: 2, name: "50% saved", amount: 3e5, completed: false },
          { id: 3, name: "80% saved", amount: 48e4, completed: false }
        ],
        notes: "Targeting homes in the 30-40 lakh range. Need to research loan options."
      },
      {
        id: 4,
        name: "Family Vacation to Kerala",
        category: "vacation",
        description: "Dream vacation to explore backwaters and culture",
        targetAmount: 75e3,
        currentAmount: 25e3,
        monthlyContribution: 3e3,
        targetDate: "2024-08-31",
        priority: "low",
        status: "in_progress",
        milestones: [
          {
            id: 1,
            name: "Flight tickets",
            amount: 3e4,
            completed: false
          },
          {
            id: 2,
            name: "Hotel booking",
            amount: 25e3,
            completed: false
          },
          {
            id: 3,
            name: "Activities & food",
            amount: 2e4,
            completed: false
          }
        ],
        notes: "Planning for monsoon season. Include houseboat stay and cultural experiences."
      },
      {
        id: 5,
        name: "Credit Card Debt Payoff",
        category: "debt",
        description: "Clear remaining credit card balance",
        targetAmount: 45e3,
        currentAmount: 45e3,
        monthlyContribution: 5e3,
        targetDate: "2024-04-30",
        priority: "high",
        status: "completed",
        milestones: [
          {
            id: 1,
            name: "Pay off balance",
            amount: 45e3,
            completed: true,
            date: "2024-01-20"
          }
        ],
        notes: "Successfully paid off credit card debt. Now maintaining zero balance."
      }
    ];
    let filterCategory = "";
    let filterPriority = "";
    let filterStatus = "";
    let sortBy = "priority";
    function getCategoryInfo(categoryId) {
      return goalCategories.find((cat) => cat.id === categoryId) || goalCategories[goalCategories.length - 1];
    }
    function getPriorityInfo(priorityId) {
      return priorities.find((p) => p.id === priorityId) || priorities[1];
    }
    function calculateMonthsRemaining(targetDate, currentAmount, monthlyContribution, targetAmount) {
      if (!targetDate || monthlyContribution <= 0) return null;
      const target = new Date(targetDate);
      const now = /* @__PURE__ */ new Date();
      const monthsToDeadline = Math.max(0, (target.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24 * 30));
      const remaining = targetAmount - currentAmount;
      const monthsNeeded = remaining / monthlyContribution;
      return { monthsToDeadline, monthsNeeded };
    }
    totalGoals = goals.length;
    completedGoals = goals.filter((g) => g.status === "completed").length;
    inProgressGoals = goals.filter((g) => g.status === "in_progress").length;
    totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0);
    overallProgress = totalTargetAmount > 0 ? totalCurrentAmount / totalTargetAmount * 100 : 0;
    goals.filter((g) => g.status === "in_progress").reduce((sum, g) => sum + g.monthlyContribution, 0);
    filteredGoals = goals.filter((goal) => {
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "progress":
          return b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount;
        case "deadline":
          if (!a.targetDate && !b.targetDate) return 0;
          if (!a.targetDate) return 1;
          if (!b.targetDate) return -1;
          return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
        default:
          return 0;
      }
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Financial Goals - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:trophy",
      class: "w-8 h-8 text-emerald-600 dark:text-emerald-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Financial Goals</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Set, track, and achieve your financial objectives</p></div></div> <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-6 h-6 text-blue-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Total Goals</p> <p class="text-2xl font-bold text-blue-600">${escape_html(totalGoals)}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Completed</p> <p class="text-2xl font-bold text-green-600">${escape_html(completedGoals)}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-6 h-6 text-orange-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">In Progress</p> <p class="text-2xl font-bold text-orange-600">${escape_html(inProgressGoals)}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Total Saved</p> <p class="text-2xl font-bold text-purple-600">₹${escape_html(totalCurrentAmount.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-pie",
      class: "w-6 h-6 text-indigo-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p> <p class="text-2xl font-bold text-indigo-600">${escape_html(overallProgress.toFixed(1))}%</p></div></div></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6"><div class="flex flex-wrap gap-4 items-end"><div><label for="filter-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label> `);
    $$renderer2.select(
      {
        id: "filter-category",
        value: filterCategory,
        class: "px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(goalCategories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="filter-priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label> `);
    $$renderer2.select(
      {
        id: "filter-priority",
        value: filterPriority,
        class: "px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Priorities`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(priorities);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let priority = each_array_1[$$index_1];
          $$renderer3.option({ value: priority.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(priority.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="filter-status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label> `);
    $$renderer2.select(
      {
        id: "filter-status",
        value: filterStatus,
        class: "px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Status`);
        });
        $$renderer3.option({ value: "in_progress" }, ($$renderer4) => {
          $$renderer4.push(`In Progress`);
        });
        $$renderer3.option({ value: "completed" }, ($$renderer4) => {
          $$renderer4.push(`Completed`);
        });
      }
    );
    $$renderer2.push(`</div> <div><label for="sort-by" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label> `);
    $$renderer2.select(
      {
        id: "sort-by",
        value: sortBy,
        class: "px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "priority" }, ($$renderer4) => {
          $$renderer4.push(`Priority`);
        });
        $$renderer3.option({ value: "progress" }, ($$renderer4) => {
          $$renderer4.push(`Progress`);
        });
        $$renderer3.option({ value: "deadline" }, ($$renderer4) => {
          $$renderer4.push(`Deadline`);
        });
      }
    );
    $$renderer2.push(`</div> <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> ${escape_html("Add Goal")}</button></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-6"><!--[-->`);
    const each_array_4 = ensure_array_like(filteredGoals);
    for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
      let goal = each_array_4[$$index_5];
      const progress = goal.currentAmount / goal.targetAmount * 100;
      const timeCalc = calculateMonthsRemaining(goal.targetDate, goal.currentAmount, goal.monthlyContribution, goal.targetAmount);
      $$renderer2.push(`<div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-start justify-between mb-4"><div class="flex items-start gap-4"><div class="p-3 rounded-xl"${attr_style(`background: linear-gradient(${stringify(getCategoryInfo(goal.category).color)})`)}>`);
      Icon($$renderer2, {
        icon: getCategoryInfo(goal.category).icon,
        class: "w-6 h-6 text-white"
      });
      $$renderer2.push(`<!----></div> <div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="text-xl font-semibold text-gray-900 dark:text-white">${escape_html(goal.name)}</h3> <span${attr_class(`px-2 py-1 text-xs rounded-full ${getPriorityInfo(goal.priority).color}`)}>${escape_html(getPriorityInfo(goal.priority).name)}</span> <span${attr_class(`px-2 py-1 text-xs rounded-full ${goal.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`)}>${escape_html(goal.status === "completed" ? "Completed" : "In Progress")}</span></div> <p class="text-gray-600 dark:text-gray-300 mb-3">${escape_html(goal.description)}</p> <div class="mb-3"><div class="flex justify-between text-sm mb-1"><span class="text-gray-600 dark:text-gray-400">Progress</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(progress.toFixed(1))}%</span></div> <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3"><div class="h-3 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(Math.min(progress, 100))}%; background: linear-gradient(${stringify(getCategoryInfo(goal.category).color)})`)}></div></div> <div class="flex justify-between text-sm mt-1"><span class="text-gray-600 dark:text-gray-400">₹${escape_html(goal.currentAmount.toLocaleString())}</span> <span class="text-gray-600 dark:text-gray-400">₹${escape_html(goal.targetAmount.toLocaleString())}</span></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"><div><div class="text-gray-600 dark:text-gray-400">Monthly Contribution</div> <div class="font-medium text-gray-900 dark:text-white">₹${escape_html(goal.monthlyContribution.toLocaleString())}</div></div> `);
      if (goal.targetDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div><div class="text-gray-600 dark:text-gray-400">Target Date</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(new Date(goal.targetDate).toLocaleDateString())}</div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (timeCalc) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div><div class="text-gray-600 dark:text-gray-400">Months to Target</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(Math.ceil(timeCalc.monthsNeeded))}</div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div><div class="text-gray-600 dark:text-gray-400">Remaining</div> <div class="font-medium text-gray-900 dark:text-white">₹${escape_html((goal.targetAmount - goal.currentAmount).toLocaleString())}</div></div></div></div></div> <div class="flex gap-2"><button class="p-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" title="Edit">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> `);
      if (goal.status === "in_progress") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" title="Mark Completed">`);
        Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-5 h-5" });
        $$renderer2.push(`<!----></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" title="Delete">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div> `);
      if (goal.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"><div class="flex items-start gap-2">`);
        Icon($$renderer2, {
          icon: "heroicons:document-text",
          class: "w-4 h-4 text-gray-500 mt-0.5"
        });
        $$renderer2.push(`<!----> <p class="text-sm text-gray-700 dark:text-gray-300">${escape_html(goal.notes)}</p></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (goal.milestones && goal.milestones.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-4"><h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Milestones</h4> <div class="space-y-2"><!--[-->`);
        const each_array_5 = ensure_array_like(goal.milestones);
        for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
          let milestone = each_array_5[$$index_4];
          $$renderer2.push(`<div class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-700 rounded"><div${attr_class(`w-4 h-4 rounded-full border-2 ${milestone.completed ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-slate-500"}`)}>`);
          if (milestone.completed) {
            $$renderer2.push("<!--[-->");
            Icon($$renderer2, { icon: "heroicons:check", class: "w-3 h-3 text-white" });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="flex-1"><div class="text-sm font-medium text-gray-900 dark:text-white">${escape_html(milestone.name)}</div> <div class="text-xs text-gray-600 dark:text-gray-400">₹${escape_html(milestone.amount.toLocaleString())}</div></div> `);
          if (milestone.completed && milestone.date) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="text-xs text-green-600 dark:text-green-400">${escape_html(new Date(milestone.date).toLocaleDateString())}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredGoals.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:trophy",
        class: "w-12 h-12 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No goals found</h3> <p class="text-gray-500 dark:text-gray-400">Create your first financial goal to start tracking your progress.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
