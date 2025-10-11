import { h as head, a as ensure_array_like } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { a as attr } from "../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalEMI, totalBalance, activeLoans;
    const pageDescription = "Track all family loans including EMI payments, due dates, and remaining balances";
    let loans = [
      {
        id: "1",
        loanName: "Home Loan",
        type: "Housing",
        emiAmount: 25e3,
        dueDate: "2024-01-15",
        remainingBalance: 15e5,
        notes: "HDFC Bank - 20 year loan",
        status: "active"
      },
      {
        id: "2",
        loanName: "Car Loan",
        type: "Vehicle",
        emiAmount: 15e3,
        dueDate: "2024-01-20",
        remainingBalance: 3e5,
        notes: "ICICI Bank - 5 year loan",
        status: "active"
      },
      {
        id: "3",
        loanName: "Education Loan",
        type: "Education",
        emiAmount: 8e3,
        dueDate: "2024-01-10",
        remainingBalance: 2e5,
        notes: "SBI Bank - Student loan",
        status: "active"
      }
    ];
    ({
      dueDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    totalEMI = loans.reduce((sum, loan) => sum + loan.emiAmount, 0);
    totalBalance = loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
    activeLoans = loans.filter((loan) => loan.status === "active").length;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Loans Tracker - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:credit-card",
      class: "w-8 h-8 text-violet-600 dark:text-violet-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Loans Tracker</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Track all family loans including EMI payments, due dates, and remaining balances</p></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</p> <p class="text-2xl font-bold text-green-600">₹${escape_html(totalEMI.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Total Balance</p> <p class="text-2xl font-bold text-blue-600">₹${escape_html(totalBalance.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:document-check",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Active Loans</p> <p class="text-2xl font-bold text-purple-600">${escape_html(activeLoans)}</p></div></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex gap-3 mb-6"><button class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> ${escape_html("Add Loan")}</button></div> <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 dark:bg-slate-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Loan Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">EMI Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Remaining Balance</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-slate-600"><!--[-->`);
    const each_array_1 = ensure_array_like(loans);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let loan = each_array_1[$$index_1];
      $$renderer2.push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700"><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${escape_html(loan.loanName)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">${escape_html(loan.type)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹${escape_html(loan.emiAmount.toLocaleString())}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${escape_html(new Date(loan.dueDate).toLocaleDateString())}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹${escape_html(loan.remainingBalance.toLocaleString())}</td><td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">${escape_html(loan.notes || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex gap-2"><button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (loans.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:credit-card",
        class: "w-12 h-12 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No loans yet</h3> <p class="text-gray-500 dark:text-gray-400">Add your first loan to start tracking payments and balances.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
