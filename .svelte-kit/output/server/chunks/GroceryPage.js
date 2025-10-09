import { a as ensure_array_like, b as attr_class, s as stringify, d as attr } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function GroceryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredItems;
    let currentTab = "pantry";
    const tabs = [
      {
        id: "pantry",
        label: "Pantry Inventory",
        icon: "heroicons:archive-box"
      },
      {
        id: "shopping",
        label: "Shopping List",
        icon: "heroicons:shopping-cart"
      },
      {
        id: "meal-prep",
        label: "Meal Prep",
        icon: "heroicons:calendar-days"
      }
    ];
    let pantryItems = [];
    let searchQuery = "";
    let selectedCategory = "all";
    const categories = [
      "grains",
      "vegetables",
      "fruits",
      "dairy",
      "spices",
      "snacks",
      "beverages",
      "other"
    ];
    function getCategoryIcon(category) {
      const icons = {
        grains: "heroicons:cube",
        vegetables: "heroicons:leaf",
        fruits: "heroicons:heart",
        dairy: "heroicons:beaker",
        spices: "heroicons:sparkles",
        snacks: "heroicons:gift",
        beverages: "heroicons:glass-water",
        other: "heroicons:archive-box"
      };
      return icons[category] || "heroicons:archive-box";
    }
    function getCategoryColor(category) {
      const colors = {
        grains: "text-yellow-500",
        vegetables: "text-green-500",
        fruits: "text-red-500",
        dairy: "text-blue-500",
        spices: "text-orange-500",
        snacks: "text-purple-500",
        beverages: "text-cyan-500",
        other: "text-gray-500"
      };
      return colors[category] || "text-gray-500";
    }
    filteredItems = pantryItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 dark:from-gray-900 dark:via-green-900/20 dark:to-yellow-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Grocery &amp; Pantry</h1> <p class="text-gray-600 dark:text-gray-300">Manage your kitchen inventory and shopping lists</p></div></div> <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> Add Item</button></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-green-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Items</label> <input type="text"${attr("value", searchQuery)} placeholder="Search pantry items..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label> `);
      $$renderer2.select(
        {
          value: selectedCategory,
          class: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "all" }, ($$renderer4) => {
            $$renderer4.push(`All Categories`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(categories);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let category = each_array_1[$$index_1];
            $$renderer3.option({ value: category }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(category.charAt(0).toUpperCase() + category.slice(1))}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array_2 = ensure_array_like(filteredItems);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let item = each_array_2[$$index_2];
        $$renderer2.push(`<div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200"><div class="flex items-start justify-between mb-3"><div class="flex items-center space-x-2">`);
        Icon($$renderer2, {
          icon: getCategoryIcon(item.category),
          class: `w-5 h-5 ${stringify(getCategoryColor(item.category))}`
        });
        $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-900 dark:text-white">${escape_html(item.name)}</h3></div> <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full">${escape_html(item.status || "in-stock")}</span></div> <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300"><div class="flex justify-between"><span>Quantity:</span> <span class="font-medium">${escape_html(item.quantity)} ${escape_html(item.unit)}</span></div> <div class="flex justify-between"><span>Location:</span> <span class="font-medium">${escape_html(item.location)}</span></div> `);
        if (item.expiryDate) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex justify-between"><span>Expires:</span> <span class="font-medium">${escape_html(new Date(item.expiryDate).toLocaleDateString())}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (item.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"><p class="text-xs">${escape_html(item.notes)}</p></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (filteredItems.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12">`);
        Icon($$renderer2, {
          icon: "heroicons:archive-box",
          class: "w-16 h-16 mx-auto text-gray-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No pantry items found</h3> <p class="text-gray-400 dark:text-gray-500">Add items to track your pantry inventory</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  GroceryPage as default
};
