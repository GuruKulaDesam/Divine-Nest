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
    let filteredExpenses, totalAmount, categoryTotals, emotionalSpending;
    const pageDescription = "Detailed transaction ledger with categorization and analysis";
    const expenseCategories = [
      {
        id: "food",
        name: "Food & Dining",
        icon: "heroicons:shopping-bag",
        color: "from-orange-500 to-orange-600"
      },
      {
        id: "transport",
        name: "Transportation",
        icon: "heroicons:truck",
        color: "from-blue-500 to-blue-600"
      },
      {
        id: "utilities",
        name: "Utilities",
        icon: "heroicons:bolt",
        color: "from-yellow-500 to-yellow-600"
      },
      {
        id: "healthcare",
        name: "Healthcare",
        icon: "heroicons:heart",
        color: "from-red-500 to-red-600"
      },
      {
        id: "education",
        name: "Education",
        icon: "heroicons:academic-cap",
        color: "from-purple-500 to-purple-600"
      },
      {
        id: "entertainment",
        name: "Entertainment",
        icon: "heroicons:film",
        color: "from-pink-500 to-pink-600"
      },
      {
        id: "shopping",
        name: "Shopping",
        icon: "heroicons:shopping-cart",
        color: "from-green-500 to-green-600"
      },
      {
        id: "home",
        name: "Home & Garden",
        icon: "heroicons:home",
        color: "from-indigo-500 to-indigo-600"
      },
      {
        id: "insurance",
        name: "Insurance",
        icon: "heroicons:shield-check",
        color: "from-teal-500 to-teal-600"
      },
      {
        id: "other",
        name: "Other",
        icon: "heroicons:ellipsis-horizontal",
        color: "from-gray-500 to-gray-600"
      }
    ];
    const paymentMethods = [
      "Cash",
      "Credit Card",
      "Debit Card",
      "UPI",
      "Bank Transfer",
      "Cheque",
      "Digital Wallet"
    ];
    let expenses = [
      {
        id: 1,
        date: "2024-01-15",
        category: "food",
        description: "Weekly grocery shopping at Big Bazaar",
        amount: 2850,
        paymentMethod: "Credit Card",
        merchant: "Big Bazaar",
        tags: ["groceries", "weekly", "vegetables"],
        emotionalTag: "necessary",
        notes: "Bought vegetables, fruits, and household items"
      },
      {
        id: 2,
        date: "2024-01-14",
        amount: 1200,
        category: "transport",
        description: "Petrol for car",
        paymentMethod: "Cash",
        merchant: "Indian Oil",
        tags: ["fuel", "car", "petrol"],
        emotionalTag: "necessary",
        notes: "Filled tank at Indian Oil pump"
      },
      {
        id: 3,
        date: "2024-01-13",
        amount: 1800,
        category: "utilities",
        description: "Electricity bill payment",
        paymentMethod: "UPI",
        merchant: "TNEB",
        tags: ["electricity", "monthly", "utilities"],
        emotionalTag: "necessary",
        notes: "Monthly electricity bill for December"
      },
      {
        id: 4,
        date: "2024-01-12",
        amount: 450,
        category: "entertainment",
        description: "Movie tickets for family",
        paymentMethod: "Credit Card",
        merchant: "PVR Cinemas",
        tags: ["movie", "family", "entertainment"],
        emotionalTag: "joy",
        notes: "Watched Hindi movie with kids"
      },
      {
        id: 5,
        date: "2024-01-11",
        amount: 3200,
        category: "healthcare",
        description: "Medical checkup for mother",
        paymentMethod: "Credit Card",
        merchant: "Apollo Hospital",
        tags: ["medical", "checkup", "mother"],
        emotionalTag: "care",
        notes: "Regular health checkup and blood tests"
      }
    ];
    ({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    let filterCategory = "";
    let filterPaymentMethod = "";
    let filterEmotionalTag = "";
    let searchQuery = "";
    const emotionalTags = [
      {
        id: "joy",
        name: "Joy",
        color: "bg-yellow-100 text-yellow-800",
        icon: "heroicons:face-smile"
      },
      {
        id: "stress",
        name: "Stress",
        color: "bg-red-100 text-red-800",
        icon: "heroicons:face-frown"
      },
      {
        id: "guilt",
        name: "Guilt",
        color: "bg-purple-100 text-purple-800",
        icon: "heroicons:face-frown"
      },
      {
        id: "pride",
        name: "Pride",
        color: "bg-blue-100 text-blue-800",
        icon: "heroicons:star"
      },
      {
        id: "care",
        name: "Care",
        color: "bg-green-100 text-green-800",
        icon: "heroicons:heart"
      },
      {
        id: "necessary",
        name: "Necessary",
        color: "bg-gray-100 text-gray-800",
        icon: "heroicons:check-circle"
      },
      {
        id: "impulse",
        name: "Impulse",
        color: "bg-orange-100 text-orange-800",
        icon: "heroicons:bolt"
      },
      {
        id: "neutral",
        name: "Neutral",
        color: "bg-slate-100 text-slate-800",
        icon: "heroicons:minus-circle"
      }
    ];
    function getCategoryInfo(categoryId) {
      return expenseCategories.find((cat) => cat.id === categoryId) || expenseCategories[expenseCategories.length - 1];
    }
    function getEmotionalTagInfo(tagId) {
      return emotionalTags.find((tag) => tag.id === tagId) || emotionalTags[emotionalTags.length - 1];
    }
    filteredExpenses = expenses.filter((expense) => {
      return true;
    });
    totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    categoryTotals = expenseCategories.map((cat) => ({
      ...cat,
      total: expenses.filter((exp) => exp.category === cat.id).reduce((sum, exp) => sum + exp.amount, 0),
      count: expenses.filter((exp) => exp.category === cat.id).length
    })).filter((cat) => cat.count > 0);
    emotionalSpending = emotionalTags.map((tag) => ({
      ...tag,
      total: expenses.filter((exp) => exp.emotionalTag === tag.id).reduce((sum, exp) => sum + exp.amount, 0),
      count: expenses.filter((exp) => exp.emotionalTag === tag.id).length
    })).filter((tag) => tag.count > 0);
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Expense Ledger - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-8 h-8 text-emerald-600 dark:text-emerald-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Expense Ledger</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Detailed transaction ledger with categorization and analysis</p></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-red-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p> <p class="text-2xl font-bold text-red-600">₹${escape_html(totalAmount.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-6 h-6 text-blue-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Transactions</p> <p class="text-2xl font-bold text-blue-600">${escape_html(filteredExpenses.length)}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-pie",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Categories</p> <p class="text-2xl font-bold text-purple-600">${escape_html(categoryTotals.length)}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-6 h-6 text-pink-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Emotional Tags</p> <p class="text-2xl font-bold text-pink-600">${escape_html(emotionalSpending.length)}</p></div></div></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h3> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label for="filter-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label> `);
    $$renderer2.select(
      {
        id: "filter-category",
        value: filterCategory,
        class: "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(expenseCategories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="filter-payment-method" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label> `);
    $$renderer2.select(
      {
        id: "filter-payment-method",
        value: filterPaymentMethod,
        class: "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Methods`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(paymentMethods);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let method = each_array_1[$$index_1];
          $$renderer3.option({ value: method }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(method)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="filter-emotional-tag" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emotional Tag</label> `);
    $$renderer2.select(
      {
        id: "filter-emotional-tag",
        value: filterEmotionalTag,
        class: "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Tags`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(emotionalTags);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let tag = each_array_2[$$index_2];
          $$renderer3.option({ value: tag.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(tag.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="search-query" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label> <input id="search-query" type="text"${attr("value", searchQuery)} placeholder="Search transactions..." class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"/></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex gap-3 mb-6"><button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> ${escape_html("Add Transaction")}</button></div> <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 dark:bg-slate-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Emotional</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-slate-600"><!--[-->`);
    const each_array_6 = ensure_array_like(filteredExpenses);
    for (let $$index_7 = 0, $$length = each_array_6.length; $$index_7 < $$length; $$index_7++) {
      let expense = each_array_6[$$index_7];
      $$renderer2.push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700"><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${escape_html(new Date(expense.date).toLocaleDateString())}</td><td class="px-6 py-4 whitespace-nowrap text-sm"><div class="flex items-center gap-2"><div class="p-1 rounded"${attr_style(`background: linear-gradient(${stringify(getCategoryInfo(expense.category).color)})`)}>`);
      Icon($$renderer2, {
        icon: getCategoryInfo(expense.category).icon,
        class: "w-4 h-4 text-white"
      });
      $$renderer2.push(`<!----></div> <span class="text-gray-900 dark:text-white">${escape_html(getCategoryInfo(expense.category).name)}</span></div></td><td class="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs"><div class="font-medium">${escape_html(expense.description)}</div> `);
      if (expense.merchant) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-gray-500 dark:text-gray-400 text-xs">${escape_html(expense.merchant)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (expense.tags && expense.tags.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex gap-1 mt-1"><!--[-->`);
        const each_array_7 = ensure_array_like(expense.tags);
        for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
          let tag = each_array_7[$$index_6];
          $$renderer2.push(`<span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">${escape_html(tag)}</span>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">₹${escape_html(expense.amount.toLocaleString())}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${escape_html(expense.paymentMethod)}</td><td class="px-6 py-4 whitespace-nowrap text-sm">`);
      if (expense.emotionalTag) {
        $$renderer2.push("<!--[-->");
        const tagInfo = getEmotionalTagInfo(expense.emotionalTag);
        $$renderer2.push(`<span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(tagInfo.color)} flex items-center gap-1 w-fit`)}>`);
        Icon($$renderer2, { icon: tagInfo.icon, class: "w-3 h-3" });
        $$renderer2.push(`<!----> ${escape_html(tagInfo.name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex gap-2"><button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" title="Edit">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" title="Delete">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (filteredExpenses.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:document-text",
        class: "w-12 h-12 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3> <p class="text-gray-500 dark:text-gray-400">Add your first expense transaction to start tracking.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
