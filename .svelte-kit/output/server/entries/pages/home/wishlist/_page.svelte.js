import { h as head, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
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
    let totalEstimatedCost, pendingItems, purchasedItems;
    const pageDescription = "Track family wishes, gifts, and future purchases with priority management";
    let wishlist = [
      {
        id: "1",
        item: "iPhone 15 Pro",
        category: "Electronics",
        forWhom: "Father",
        priority: "High",
        notes: "Latest model with advanced camera features",
        status: "pending",
        estimatedCost: 13e4,
        targetDate: "2024-03-01"
      },
      {
        id: "2",
        item: "Diamond Necklace",
        category: "Jewelry",
        forWhom: "Mother",
        priority: "Medium",
        notes: "Traditional South Indian design",
        status: "pending",
        estimatedCost: 5e4,
        targetDate: "2024-04-15"
      },
      {
        id: "3",
        item: "Gaming Laptop",
        category: "Electronics",
        forWhom: "Son",
        priority: "High",
        notes: "For engineering studies and gaming",
        status: "pending",
        estimatedCost: 8e4,
        targetDate: "2024-02-01"
      },
      {
        id: "4",
        item: "Kitchen Appliances Set",
        category: "Home",
        forWhom: "Family",
        priority: "Medium",
        notes: "Mixer, grinder, and induction cooktop",
        status: "pending",
        estimatedCost: 25e3
      },
      {
        id: "5",
        item: "Bicycle",
        category: "Sports",
        forWhom: "Daughter",
        priority: "Low",
        notes: "For daily commute to school",
        status: "pending",
        estimatedCost: 15e3
      }
    ];
    function getPriorityColor(priority) {
      switch (priority) {
        case "Urgent":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        case "High":
          return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
        case "Medium":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case "Low":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      }
    }
    totalEstimatedCost = wishlist.filter((item) => item.status === "pending").reduce((sum, item) => sum + (item.estimatedCost || 0), 0);
    pendingItems = wishlist.filter((item) => item.status === "pending").length;
    purchasedItems = wishlist.filter((item) => item.status === "purchased").length;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Family Wishlist - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50 dark:from-slate-900 dark:to-rose-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:heart",
      class: "w-8 h-8 text-rose-600 dark:text-rose-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Family Wishlist</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Track family wishes, gifts, and future purchases with priority management</p></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:shopping-bag",
      class: "w-6 h-6 text-blue-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Pending Items</p> <p class="text-2xl font-bold text-blue-600">${escape_html(pendingItems)}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Total Estimated Cost</p> <p class="text-2xl font-bold text-green-600">₹${escape_html(totalEstimatedCost.toLocaleString())}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Purchased</p> <p class="text-2xl font-bold text-purple-600">${escape_html(purchasedItems)}</p></div></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex gap-3 mb-6"><button class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> ${escape_html("Add Item")}</button></div> <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 dark:bg-slate-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">For Whom</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Est. Cost</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-slate-600"><!--[-->`);
    const each_array_3 = ensure_array_like(wishlist);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let item = each_array_3[$$index_3];
      $$renderer2.push(`<tr${attr_class(`hover:bg-gray-50 dark:hover:bg-slate-700 ${stringify(item.status === "purchased" ? "opacity-60" : "")}`)}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${escape_html(item.item)} `);
      if (item.status === "purchased") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Purchased</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"><span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">${escape_html(item.category)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${escape_html(item.forWhom)}</td><td class="px-6 py-4 whitespace-nowrap text-sm"><span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getPriorityColor(item.priority))}`)}>${escape_html(item.priority)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${escape_html(item.estimatedCost ? `₹${item.estimatedCost.toLocaleString()}` : "-")}</td><td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">${escape_html(item.notes || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex gap-2">`);
      if (item.status === "pending") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" title="Mark as purchased">`);
        Icon($$renderer2, { icon: "heroicons:check", class: "w-4 h-4" });
        $$renderer2.push(`<!----></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (wishlist.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:heart",
        class: "w-12 h-12 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No wishlist items yet</h3> <p class="text-gray-500 dark:text-gray-400">Add items to your family wishlist to start tracking wishes and purchases.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
