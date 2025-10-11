import "clsx";
import { h as head, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { a as attr, c as clsx } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function ItemsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredItems;
    let searchTerm = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    const categories = [
      {
        id: "household",
        name: "Household Items",
        icon: "heroicons:home",
        color: "text-blue-600"
      },
      {
        id: "electronics",
        name: "Electronics",
        icon: "heroicons:device-phone-mobile",
        color: "text-purple-600"
      },
      {
        id: "furniture",
        name: "Furniture",
        icon: "heroicons:home-modern",
        color: "text-green-600"
      },
      {
        id: "kitchen",
        name: "Kitchen Items",
        icon: "heroicons:archive-box",
        color: "text-orange-600"
      },
      {
        id: "personal",
        name: "Personal Items",
        icon: "heroicons:user",
        color: "text-cyan-600"
      },
      {
        id: "decorative",
        name: "Decorative",
        icon: "heroicons:star",
        color: "text-yellow-600"
      },
      {
        id: "other",
        name: "Other",
        icon: "heroicons:question-mark-circle",
        color: "text-gray-600"
      }
    ];
    const statuses = [
      {
        id: "active",
        name: "Active",
        color: "bg-green-100 text-green-800"
      },
      {
        id: "maintenance",
        name: "Under Maintenance",
        color: "bg-yellow-100 text-yellow-800"
      },
      {
        id: "stored",
        name: "In Storage",
        color: "bg-blue-100 text-blue-800"
      },
      {
        id: "lent",
        name: "Lent Out",
        color: "bg-purple-100 text-purple-800"
      },
      {
        id: "disposed",
        name: "Disposed",
        color: "bg-red-100 text-red-800"
      }
    ];
    let items = [];
    function getStatusColor(status) {
      const statusObj = statuses.find((s) => s.id === status);
      return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
    }
    function getCategoryIcon(category) {
      const cat = categories.find((c) => c.id === category);
      return cat ? cat.icon : "heroicons:question-mark-circle";
    }
    function getCategoryColor(category) {
      const cat = categories.find((c) => c.id === category);
      return cat ? cat.color : "text-gray-600";
    }
    function getConditionColor(condition) {
      switch (condition) {
        case "excellent":
          return "text-green-600";
        case "good":
          return "text-blue-600";
        case "fair":
          return "text-yellow-600";
        case "poor":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
    filteredItems = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesCategory && matchesStatus;
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Items Management - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Manage and track all family items and belongings"/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto p-6 space-y-6"><div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white"><div class="flex items-center gap-3 mb-4">`);
    Icon($$renderer2, { icon: "heroicons:cube", class: "w-8 h-8" });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold">Items Management</h1></div> <p class="text-indigo-100">Keep track of all your family items and belongings</p></div> <div class="bg-white rounded-xl shadow-lg p-6"><div class="flex flex-col sm:flex-row gap-4 mb-6"><div class="flex-1"><input type="text"${attr("value", searchTerm)} placeholder="Search items..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/></div> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Statuses`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(statuses);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let status = each_array_1[$$index_1];
          $$renderer3.option({ value: status.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` <button class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Item</button></div> <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6"><!--[-->`);
    const each_array_2 = ensure_array_like(categories);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let category = each_array_2[$$index_2];
      $$renderer2.push(`<div${attr_class("text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors", void 0, { "bg-indigo-50": selectedCategory === category.id })}>`);
      Icon($$renderer2, {
        icon: category.icon,
        class: `w-8 h-8 ${stringify(category.color)} mx-auto mb-2`
      });
      $$renderer2.push(`<!----> <p class="text-sm font-medium">${escape_html(category.name)}</p> <p class="text-xs text-gray-500">${escape_html(items.filter((i) => i.category === category.id).length)} items</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-4"><!--[-->`);
    const each_array_3 = ensure_array_like(filteredItems);
    for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
      let item = each_array_3[$$index_4];
      $$renderer2.push(`<div class="border rounded-lg p-4 hover:shadow-md transition-shadow"><div class="flex items-start justify-between"><div class="flex items-start gap-4 flex-1"><div class="p-2 bg-gray-100 rounded-lg">`);
      Icon($$renderer2, {
        icon: getCategoryIcon(item.category),
        class: `w-6 h-6 ${stringify(getCategoryColor(item.category))}`
      });
      $$renderer2.push(`<!----></div> <div class="flex-1"><div class="flex items-center gap-2 mb-1"><h3 class="font-semibold text-lg">${escape_html(item.name)}</h3> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(item.status))}`)}>${escape_html(statuses.find((s) => s.id === item.status)?.name || item.status)}</span></div> <div class="flex items-center gap-4 text-sm text-gray-600 mb-2"><span class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(item.location)}</span> <span class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "heroicons:calendar", class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(item.acquiredDate)}</span> <span class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "heroicons:currency-rupee", class: "w-4 h-4" });
      $$renderer2.push(`<!----> ₹${escape_html(item.value)}</span> <span class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span${attr_class(clsx(getConditionColor(item.condition)))}>${escape_html(item.condition)}</span></span></div> <div class="flex flex-wrap gap-1 mb-2"><!--[-->`);
      const each_array_4 = ensure_array_like(item.tags);
      for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
        let tag = each_array_4[$$index_3];
        $$renderer2.push(`<span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">${escape_html(tag)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (item.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-gray-600">${escape_html(item.notes)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="flex gap-2"><button class="p-2 text-indigo-600 hover:bg-indigo-50 rounded" title="Edit">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <button class="p-2 text-green-600 hover:bg-green-50 rounded" title="Move">`);
      Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <button class="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12 text-gray-500">`);
      Icon($$renderer2, {
        icon: "heroicons:cube",
        class: "w-16 h-16 mx-auto mb-4 text-gray-300"
      });
      $$renderer2.push(`<!----> <p class="text-lg font-medium">`);
      if (items.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`No items yet`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`No items match your search`);
      }
      $$renderer2.push(`<!--]--></p> <p class="text-sm">`);
      if (items.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`Start by adding your family items`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Try adjusting your search or filter criteria`);
      }
      $$renderer2.push(`<!--]--></p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="bg-white rounded-xl shadow-lg p-6 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:cube",
      class: "w-8 h-8 text-indigo-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-800">${escape_html(items.length)}</p> <p class="text-sm text-gray-600">Total Items</p></div> <div class="bg-white rounded-xl shadow-lg p-6 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-800">${escape_html(items.filter((i) => i.status === "active").length)}</p> <p class="text-sm text-gray-600">Active Items</p></div> <div class="bg-white rounded-xl shadow-lg p-6 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-8 h-8 text-purple-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-800">₹${escape_html(items.reduce((sum, item) => sum + item.value, 0).toLocaleString())}</p> <p class="text-sm text-gray-600">Total Value</p></div> <div class="bg-white rounded-xl shadow-lg p-6 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:wrench-screwdriver",
      class: "w-8 h-8 text-orange-600 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-800">${escape_html(items.filter((i) => i.status === "maintenance").length)}</p> <p class="text-sm text-gray-600">Needs Attention</p></div></div></div>`);
  });
}
function _page($$renderer) {
  ItemsPage($$renderer);
}
export {
  _page as default
};
