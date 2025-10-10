import "clsx";
import { a as ensure_array_like, s as stringify, b as attr_class, j as attr_style } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { T as escape_html } from "../../../../chunks/context.js";
function BudgetPage($$renderer) {
  let budgets = [
    {
      id: 1,
      category: "Food & Dining",
      budgeted: 15e3,
      spent: 12500,
      remaining: 2500,
      period: "Monthly",
      status: "on-track"
    },
    {
      id: 2,
      category: "Transportation",
      budgeted: 8e3,
      spent: 7200,
      remaining: 800,
      period: "Monthly",
      status: "on-track"
    },
    {
      id: 3,
      category: "Entertainment",
      budgeted: 5e3,
      spent: 6200,
      remaining: -1200,
      period: "Monthly",
      status: "over-budget"
    }
  ];
  function getStatusColor(status) {
    switch (status) {
      case "on-track":
        return "text-green-600";
      case "over-budget":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  }
  function getStatusIcon(status) {
    switch (status) {
      case "on-track":
        return "heroicons:check-circle";
      case "over-budget":
        return "heroicons:exclamation-triangle";
      case "warning":
        return "heroicons:exclamation-circle";
      default:
        return "heroicons:minus-circle";
    }
  }
  function getProgressPercentage(budgeted, spent) {
    return Math.min(spent / budgeted * 100, 100);
  }
  function getProgressColor(status) {
    switch (status) {
      case "on-track":
        return "bg-green-500";
      case "over-budget":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  }
  $$renderer.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Budget Management</h1> <p class="text-base-content/70 mt-2">Track your spending against budgeted amounts</p></div> <button class="btn btn-primary">`);
  Icon($$renderer, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
  $$renderer.push(`<!----> Add Budget</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
  Icon($$renderer, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Budget</h3> <p class="text-2xl font-bold text-blue-600">₹28,000</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
  Icon($$renderer, {
    icon: "heroicons:arrow-trending-down",
    class: "w-6 h-6 text-green-600"
  });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Spent</h3> <p class="text-2xl font-bold text-green-600">₹25,900</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
  Icon($$renderer, {
    icon: "heroicons:arrow-trending-up",
    class: "w-6 h-6 text-purple-600"
  });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Remaining</h3> <p class="text-2xl font-bold text-purple-600">₹2,100</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-red-100 rounded-lg">`);
  Icon($$renderer, {
    icon: "heroicons:exclamation-triangle",
    class: "w-6 h-6 text-red-600"
  });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Over Budget</h3> <p class="text-2xl font-bold text-red-600">1 Category</p></div></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
  const each_array = ensure_array_like(budgets);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let budget = each_array[$$index];
    $$renderer.push(`<div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center justify-between mb-4"><h3 class="card-title text-lg">${escape_html(budget.category)}</h3> <div class="flex items-center">`);
    Icon($$renderer, {
      icon: getStatusIcon(budget.status),
      class: `w-5 h-5 ${stringify(getStatusColor(budget.status))} mr-1`
    });
    $$renderer.push(`<!----> <span${attr_class(`text-sm font-medium ${stringify(getStatusColor(budget.status))}`)}>${escape_html(budget.status === "on-track" ? "On Track" : budget.status === "over-budget" ? "Over Budget" : "Warning")}</span></div></div> <div class="space-y-3"><div class="flex justify-between text-sm"><span class="text-base-content/70">Budgeted</span> <span class="font-semibold">₹${escape_html(budget.budgeted)}</span></div> <div class="flex justify-between text-sm"><span class="text-base-content/70">Spent</span> <span class="font-semibold">₹${escape_html(budget.spent)}</span></div> <div class="flex justify-between text-sm"><span class="text-base-content/70">Remaining</span> <span${attr_class(`font-semibold ${stringify(budget.remaining < 0 ? "text-red-600" : "text-green-600")}`)}>₹${escape_html(budget.remaining)}</span></div></div> <div class="mt-4"><div class="flex justify-between text-xs text-base-content/70 mb-1"><span>Progress</span> <span>${escape_html(Math.round(getProgressPercentage(budget.budgeted, budget.spent)))}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full ${stringify(getProgressColor(budget.status))}`)}${attr_style(`width: ${stringify(getProgressPercentage(budget.budgeted, budget.spent))}%`)}></div></div></div> <div class="card-actions justify-end mt-4"><button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:pencil", class: "w-4 h-4 mr-1" });
    $$renderer.push(`<!----> Edit</button> <button class="btn btn-sm btn-ghost text-red-600">`);
    Icon($$renderer, { icon: "heroicons:trash", class: "w-4 h-4 mr-1" });
    $$renderer.push(`<!----> Delete</button></div></div></div>`);
  }
  $$renderer.push(`<!--]--></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Category</th><th>Period</th><th>Budgeted</th><th>Spent</th><th>Remaining</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
  const each_array_1 = ensure_array_like(budgets);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let budget = each_array_1[$$index_1];
    $$renderer.push(`<tr><td class="font-semibold">${escape_html(budget.category)}</td><td>${escape_html(budget.period)}</td><td>₹${escape_html(budget.budgeted)}</td><td>₹${escape_html(budget.spent)}</td><td${attr_class(`${stringify(budget.remaining < 0 ? "text-red-600" : "text-green-600")} font-semibold`)}>₹${escape_html(budget.remaining)}</td><td><span${attr_class(`badge ${stringify(budget.status === "on-track" ? "badge-success" : budget.status === "over-budget" ? "badge-error" : "badge-warning")}`)}>${escape_html(budget.status === "on-track" ? "On Track" : budget.status === "over-budget" ? "Over Budget" : "Warning")}</span></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:eye", class: "w-4 h-4" });
    $$renderer.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:pencil", class: "w-4 h-4" });
    $$renderer.push(`<!----></button></div></td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></div></div></div></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function _page($$renderer) {
  BudgetPage($$renderer);
}
export {
  _page as default
};
