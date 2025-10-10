import "clsx";
import { a as ensure_array_like } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { T as escape_html } from "../../../../chunks/context.js";
function ExpensesPage($$renderer) {
  let filteredExpenses;
  let expenses = [
    {
      id: 1,
      category: "Food & Dining",
      description: "Grocery shopping",
      amount: 2500,
      date: "2024-01-15",
      paymentMethod: "Credit Card",
      tags: ["groceries", "weekly"]
    },
    {
      id: 2,
      category: "Transportation",
      description: "Fuel for car",
      amount: 1200,
      date: "2024-01-14",
      paymentMethod: "Cash",
      tags: ["fuel", "car"]
    },
    {
      id: 3,
      category: "Utilities",
      description: "Electricity bill",
      amount: 1800,
      date: "2024-01-13",
      paymentMethod: "Online",
      tags: ["electricity", "monthly"]
    }
  ];
  let filterCategory = "";
  let filterDateRange = "";
  function getCategoryIcon(category) {
    const icons = {
      "Food & Dining": "heroicons:shopping-bag",
      "Transportation": "heroicons:truck",
      "Utilities": "heroicons:bolt",
      "Entertainment": "heroicons:film",
      "Healthcare": "heroicons:heart",
      "Education": "heroicons:academic-cap",
      "Shopping": "heroicons:shopping-cart",
      "Other": "heroicons:ellipsis-horizontal"
    };
    return icons[category] || icons["Other"];
  }
  function getTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
  filteredExpenses = expenses.filter((expense) => {
    return true;
  });
  $$renderer.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Expenses</h1> <p class="text-base-content/70 mt-2">Track and manage your expenses</p></div> <button class="btn btn-primary">`);
  Icon($$renderer, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
  $$renderer.push(`<!----> Add Expense</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-red-100 rounded-lg">`);
  Icon($$renderer, { icon: "heroicons:banknotes", class: "w-6 h-6 text-red-600" });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Expenses</h3> <p class="text-2xl font-bold text-red-600">₹${escape_html(getTotalExpenses())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
  Icon($$renderer, {
    icon: "heroicons:shopping-bag",
    class: "w-6 h-6 text-blue-600"
  });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Food &amp; Dining</h3> <p class="text-2xl font-bold text-blue-600">₹2,500</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
  Icon($$renderer, { icon: "heroicons:truck", class: "w-6 h-6 text-green-600" });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Transportation</h3> <p class="text-2xl font-bold text-green-600">₹1,200</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
  Icon($$renderer, { icon: "heroicons:bolt", class: "w-6 h-6 text-purple-600" });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Utilities</h3> <p class="text-2xl font-bold text-purple-600">₹1,800</p></div></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex flex-wrap gap-4"><div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
  $$renderer.select(
    {
      value: filterCategory,
      class: "select select-bordered select-sm"
    },
    ($$renderer2) => {
      $$renderer2.option({ value: "" }, ($$renderer3) => {
        $$renderer3.push(`All Categories`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Food &amp; Dining`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Transportation`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Utilities`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Entertainment`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Healthcare`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Education`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Shopping`);
      });
    }
  );
  $$renderer.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Date Range</span></label> `);
  $$renderer.select(
    {
      value: filterDateRange,
      class: "select select-bordered select-sm"
    },
    ($$renderer2) => {
      $$renderer2.option({ value: "" }, ($$renderer3) => {
        $$renderer3.push(`All Time`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`This Week`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`This Month`);
      });
      $$renderer2.option({}, ($$renderer3) => {
        $$renderer3.push(`Last Month`);
      });
    }
  );
  $$renderer.push(`</div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Category</th><th>Description</th><th>Amount</th><th>Date</th><th>Payment Method</th><th>Tags</th><th>Actions</th></tr></thead><tbody><!--[-->`);
  const each_array = ensure_array_like(filteredExpenses);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let expense = each_array[$$index_1];
    $$renderer.push(`<tr><td><div class="flex items-center">`);
    Icon($$renderer, {
      icon: getCategoryIcon(expense.category),
      class: "w-4 h-4 mr-2"
    });
    $$renderer.push(`<!----> ${escape_html(expense.category)}</div></td><td>${escape_html(expense.description)}</td><td class="font-semibold text-red-600">₹${escape_html(expense.amount)}</td><td>${escape_html(expense.date)}</td><td>${escape_html(expense.paymentMethod)}</td><td><div class="flex flex-wrap gap-1"><!--[-->`);
    const each_array_1 = ensure_array_like(expense.tags);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let tag = each_array_1[$$index];
      $$renderer.push(`<span class="badge badge-outline badge-sm">${escape_html(tag)}</span>`);
    }
    $$renderer.push(`<!--]--></div></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:eye", class: "w-4 h-4" });
    $$renderer.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:pencil", class: "w-4 h-4" });
    $$renderer.push(`<!----></button> <button class="btn btn-sm btn-ghost text-red-600">`);
    Icon($$renderer, { icon: "heroicons:trash", class: "w-4 h-4" });
    $$renderer.push(`<!----></button></div></td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></div></div></div></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function _page($$renderer) {
  ExpensesPage($$renderer);
}
export {
  _page as default
};
