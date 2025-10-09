import { h as head, d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function MaintenancePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredTasks, filteredAssets;
    let searchTerm = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    let selectedPriority = "all";
    let maintenanceTasks = [];
    let assetMaintenance = [];
    const categories = [
      {
        id: "electrical",
        name: "Electrical",
        icon: "heroicons:bolt",
        color: "text-yellow-600"
      },
      {
        id: "plumbing",
        name: "Plumbing",
        icon: "heroicons:wrench-screwdriver",
        color: "text-blue-600"
      },
      {
        id: "structural",
        name: "Structural",
        icon: "heroicons:home",
        color: "text-gray-600"
      },
      {
        id: "appliance",
        name: "Appliances",
        icon: "heroicons:device-phone-mobile",
        color: "text-purple-600"
      },
      {
        id: "vehicle",
        name: "Vehicles",
        icon: "heroicons:truck",
        color: "text-green-600"
      },
      {
        id: "garden",
        name: "Garden/Landscape",
        icon: "heroicons:tree",
        color: "text-green-500"
      },
      {
        id: "cleaning",
        name: "Cleaning",
        icon: "heroicons:sparkles",
        color: "text-cyan-600"
      },
      {
        id: "other",
        name: "Other",
        icon: "heroicons:question-mark-circle",
        color: "text-gray-500"
      }
    ];
    const statuses = [
      {
        id: "pending",
        name: "Pending",
        color: "bg-yellow-100 text-yellow-800"
      },
      {
        id: "in_progress",
        name: "In Progress",
        color: "bg-blue-100 text-blue-800"
      },
      {
        id: "completed",
        name: "Completed",
        color: "bg-green-100 text-green-800"
      },
      {
        id: "overdue",
        name: "Overdue",
        color: "bg-red-100 text-red-800"
      },
      {
        id: "cancelled",
        name: "Cancelled",
        color: "bg-gray-100 text-gray-800"
      }
    ];
    const priorities = [
      { id: "low", name: "Low", color: "text-green-600" },
      { id: "medium", name: "Medium", color: "text-yellow-600" },
      { id: "high", name: "High", color: "text-orange-600" },
      { id: "critical", name: "Critical", color: "text-red-600" }
    ];
    function getStatusColor(status) {
      const statusObj = statuses.find((s) => s.id === status);
      return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
    }
    function getPriorityColor(priority) {
      const priorityObj = priorities.find((p) => p.id === priority);
      return priorityObj ? priorityObj.color : "text-gray-600";
    }
    function getAssetStatusColor(status) {
      switch (status) {
        case "completed":
          return "text-green-600";
        case "scheduled":
          return "text-blue-600";
        case "overdue":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
    filteredTasks = maintenanceTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      const matchesStatus = selectedStatus === "all";
      const matchesPriority = selectedPriority === "all";
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
    filteredAssets = assetMaintenance.filter((asset) => {
      const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || asset.assetType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Maintenance Management - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Manage maintenance tasks and asset upkeep for your family"/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto p-6 space-y-6"><div class="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:wrench-screwdriver", class: "w-8 h-8" });
    $$renderer2.push(`<!----> <div><h1 class="text-2xl font-bold">Maintenance Management</h1> <p class="text-blue-100">Keep your home and assets in perfect condition</p></div></div> <button class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Task</button></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div><input type="text"${attr("value", searchTerm)} placeholder="Search tasks or assets..." class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"/></div> <div>`);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    $$renderer2.push(`</div> <div>`);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    $$renderer2.push(`</div> <div>`);
    $$renderer2.select(
      {
        value: selectedPriority,
        class: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Priorities`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(priorities);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let priority = each_array_2[$$index_2];
          $$renderer3.option({ value: priority.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(priority.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="flex flex-wrap gap-2"><button${attr_class(`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${stringify(
      "bg-blue-100 text-blue-800"
    )}`)}>All Categories</button> <!--[-->`);
    const each_array_3 = ensure_array_like(categories);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let category = each_array_3[$$index_3];
      $$renderer2.push(`<button${attr_class(`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${stringify(selectedCategory === category.id ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(category.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-6 h-6 text-blue-600"
    });
    $$renderer2.push(`<!----> Maintenance Tasks (${escape_html(filteredTasks.length)})</h2></div> <div class="space-y-4"><!--[-->`);
    const each_array_4 = ensure_array_like(filteredTasks);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let task = each_array_4[$$index_4];
      $$renderer2.push(`<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"><div class="flex items-start justify-between mb-3"><div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="text-lg font-semibold text-gray-900">${escape_html(task.title)}</h3> <span${attr_class(`px-2 py-1 text-xs font-medium rounded-full ${stringify(getStatusColor(task.status))}`)}>${escape_html(statuses.find((s) => s.id === task.status)?.name)}</span> <span${attr_class(`text-sm font-medium ${stringify(getPriorityColor(task.priority))}`)}>${escape_html(priorities.find((p) => p.id === task.priority)?.name)} Priority</span></div> <p class="text-gray-600 mb-2">${escape_html(task.description)}</p> <div class="flex items-center gap-4 text-sm text-gray-500"><span>Due: ${escape_html(task.dueDate)}</span> <span>Assigned: ${escape_html(task.assignedTo)}</span> <span>Est. Cost: ₹${escape_html(task.estimatedCost)}</span></div></div> <div class="flex gap-2"><button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <button class="p-2 text-gray-400 hover:text-green-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:check", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button></div></div> `);
      if (task.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"><strong>Notes:</strong> ${escape_html(task.notes)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:building-storefront",
      class: "w-6 h-6 text-indigo-600"
    });
    $$renderer2.push(`<!----> Asset Maintenance (${escape_html(filteredAssets.length)})</h2></div> <div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Service</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
    const each_array_5 = ensure_array_like(filteredAssets);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let asset = each_array_5[$$index_5];
      $$renderer2.push(`<tr class="hover:bg-gray-50"><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">${escape_html(asset.assetName)}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-500">${escape_html(asset.assetType)}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${escape_html(asset.maintenanceType)}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-500">${escape_html(asset.lastService)}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-500">${escape_html(asset.nextService)}</div></td><td class="px-4 py-4 whitespace-nowrap"><span${attr_class(`text-sm font-medium ${stringify(getAssetStatusColor(asset.status))}`)}>${escape_html(asset.status.charAt(0).toUpperCase() + asset.status.slice(1))}</span></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">₹${escape_html(asset.cost)}</div></td><td class="px-4 py-4 whitespace-nowrap text-sm font-medium"><button class="text-blue-600 hover:text-blue-900 mr-3">Edit</button> <button class="text-green-600 hover:text-green-900">Complete</button></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">Pending Tasks</p> <p class="text-2xl font-bold text-yellow-600">${escape_html(maintenanceTasks.filter((t) => t.status === "pending").length)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-yellow-600" });
    $$renderer2.push(`<!----></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">In Progress</p> <p class="text-2xl font-bold text-blue-600">${escape_html(maintenanceTasks.filter((t) => t.status === "in_progress").length)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-8 h-8 text-blue-600" });
    $$renderer2.push(`<!----></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">Completed</p> <p class="text-2xl font-bold text-green-600">${escape_html(maintenanceTasks.filter((t) => t.status === "completed").length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-600"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600">Overdue</p> <p class="text-2xl font-bold text-red-600">${escape_html(maintenanceTasks.filter((t) => t.status === "overdue").length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-red-600"
    });
    $$renderer2.push(`<!----></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  MaintenancePage as M
};
