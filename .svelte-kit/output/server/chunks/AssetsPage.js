import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function AssetsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentSection = "overview";
    const sections = [
      {
        id: "overview",
        label: "Asset Overview",
        icon: "heroicons:squares-2x2",
        color: "text-blue-500"
      },
      {
        id: "items",
        label: "Physical Assets",
        icon: "heroicons:cube",
        color: "text-green-500"
      },
      {
        id: "documents",
        label: "Documents & Ownership",
        icon: "heroicons:document-text",
        color: "text-purple-500"
      },
      {
        id: "maintenance",
        label: "Maintenance & Service",
        icon: "heroicons:wrench-screwdriver",
        color: "text-orange-500"
      },
      {
        id: "value",
        label: "Asset Value",
        icon: "heroicons:currency-rupee",
        color: "text-yellow-500"
      },
      {
        id: "heirlooms",
        label: "Heirloom & Legacy",
        icon: "heroicons:heart",
        color: "text-red-500"
      },
      {
        id: "movement",
        label: "Movement & Lending",
        icon: "heroicons:arrow-path",
        color: "text-indigo-500"
      },
      {
        id: "disposal",
        label: "Disposal & Recycling",
        icon: "heroicons:trash",
        color: "text-gray-500"
      }
    ];
    const assetCategories = [
      {
        id: "furniture",
        name: "Furniture",
        icon: "heroicons:home",
        items: [
          "Cot",
          "Dining table",
          "Pooja shelf",
          "Study desk",
          "Almirah"
        ]
      },
      {
        id: "appliances",
        name: "Appliances",
        icon: "heroicons:cpu-chip",
        items: [
          "Fridge",
          "Washing machine",
          "Grinder",
          "Mixie",
          "AC",
          "Fan",
          "Geyser"
        ]
      },
      {
        id: "electronics",
        name: "Electronics",
        icon: "heroicons:device-phone-mobile",
        items: ["TV", "Laptop", "Mobile phones", "Tablets", "Printer"]
      },
      {
        id: "kitchenware",
        name: "Kitchenware",
        icon: "heroicons:archive-box",
        items: [
          "Pressure cooker",
          "Kadai",
          "Idli stand",
          "Brass vessels",
          "Silver pooja items"
        ]
      },
      {
        id: "vehicles",
        name: "Vehicles",
        icon: "heroicons:truck",
        items: ["Scooter", "Car", "Bicycle", "Auto"]
      },
      {
        id: "tools",
        name: "Tools",
        icon: "heroicons:wrench",
        items: ["Screwdriver set", "Ladder", "Garden hose", "Sewing machine"]
      },
      {
        id: "decor",
        name: "Decor & Rituals",
        icon: "heroicons:star",
        items: ["Lamps", "Kolam plates", "Framed photos", "Pooja items"]
      }
    ];
    const recentActivity = [
      {
        type: "maintenance",
        message: "AC service scheduled for next week",
        time: "2 hours ago",
        icon: "heroicons:wrench-screwdriver",
        color: "text-orange-500"
      },
      {
        type: "document",
        message: "Fridge warranty expiring in 2 months",
        time: "1 day ago",
        icon: "heroicons:exclamation-triangle",
        color: "text-yellow-500"
      },
      {
        type: "movement",
        message: "Study table moved to upstairs bedroom",
        time: "3 days ago",
        icon: "heroicons:arrow-path",
        color: "text-blue-500"
      },
      {
        type: "heirloom",
        message: "Added Paati's brass lamp to heirloom collection",
        time: "1 week ago",
        icon: "heroicons:heart",
        color: "text-red-500"
      }
    ];
    const upcomingTasks = [
      {
        task: "Service washing machine",
        due: "Next week",
        priority: "medium"
      },
      {
        task: "Renew vehicle insurance",
        due: "2 months",
        priority: "high"
      },
      { task: "Oil ceiling fans", due: "1 month", priority: "low" },
      {
        task: "Update scooter RC",
        due: "3 months",
        priority: "medium"
      }
    ];
    let totalValue = 85e4;
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-800 border-red-200";
        case "medium":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "low":
          return "bg-green-100 text-green-800 border-green-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between mb-8"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl text-white shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:squares-2x2", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Assets Management</h1> <p class="text-gray-600 dark:text-gray-300">Track, preserve, and plan for everything that supports your family's life</p></div></div> <button class="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-green-600 transition-all shadow-lg flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Add Asset</span></button></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">156</p></div> <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:cube",
      class: "w-6 h-6 text-blue-600 dark:text-blue-400"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">₹${escape_html(totalValue.toLocaleString())}</p></div> <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-green-600 dark:text-green-400"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Maintenance</p> <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">8</p></div> <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:wrench-screwdriver",
      class: "w-6 h-6 text-orange-600 dark:text-orange-400"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Documents</p> <p class="text-2xl font-bold text-red-600 dark:text-red-400">3</p></div> <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-red-600 dark:text-red-400"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(sections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentSection === section.id ? "bg-blue-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20")}`)}>`);
      Icon($$renderer2, {
        icon: section.icon,
        class: `w-4 h-4 ${stringify(currentSection === section.id ? "text-white" : section.color)}`
      });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(section.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Asset Categories</h3> <div class="space-y-4"><!--[-->`);
      const each_array_1 = ensure_array_like(assetCategories);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let category = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
        Icon($$renderer2, {
          icon: category.icon,
          class: "w-5 h-5 text-blue-600 dark:text-blue-400"
        });
        $$renderer2.push(`<!----></div> <div><h4 class="font-semibold text-gray-900 dark:text-white">${escape_html(category.name)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(category.items.length)} items</p></div></div> `);
        Icon($$renderer2, {
          icon: "heroicons:chevron-right",
          class: "w-5 h-5 text-gray-400"
        });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3> <div class="space-y-4"><!--[-->`);
      const each_array_2 = ensure_array_like(recentActivity);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let activity = each_array_2[$$index_2];
        $$renderer2.push(`<div class="flex items-start space-x-3"><div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">`);
        Icon($$renderer2, {
          icon: activity.icon,
          class: `w-4 h-4 ${stringify(activity.color)}`
        });
        $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm text-gray-900 dark:text-white">${escape_html(activity.message)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">${escape_html(activity.time)}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Tasks</h3> <div class="space-y-3"><!--[-->`);
      const each_array_3 = ensure_array_like(upcomingTasks);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let task = each_array_3[$$index_3];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex-1"><p class="text-sm font-medium text-gray-900 dark:text-white">${escape_html(task.task)}</p> <p class="text-xs text-gray-600 dark:text-gray-400">Due: ${escape_html(task.due)}</p></div> <span${attr_class(`px-2 py-1 text-xs font-medium rounded-full border ${stringify(getPriorityColor(task.priority))}`)}>${escape_html(task.priority)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  AssetsPage as default
};
