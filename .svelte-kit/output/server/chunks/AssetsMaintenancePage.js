import { a as ensure_array_like, b as attr_class, s as stringify, d as attr } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function AssetsMaintenancePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentView = "schedule";
    let searchTerm = "";
    let selectedStatus = "all";
    const views = [
      {
        id: "schedule",
        label: "Service Schedule",
        icon: "heroicons:calendar-days"
      },
      {
        id: "history",
        label: "Service History",
        icon: "heroicons:clock"
      },
      {
        id: "vendors",
        label: "Vendor Directory",
        icon: "heroicons:user-group"
      }
    ];
    const maintenanceItems = [
      {
        id: 1,
        assetName: "Samsung Refrigerator",
        tamilName: "குளிர்சாதன பெட்டி",
        serviceType: "General Service",
        description: "Clean coils, check refrigerant, temperature calibration",
        dueDate: "2024-12-15",
        lastService: "2024-06-15",
        vendor: "Kumar Appliance Service",
        estimatedCost: 800,
        priority: "medium",
        status: "upcoming",
        notes: "Customer reported slight temperature fluctuation",
        frequency: "6 months"
      },
      {
        id: 2,
        assetName: "Honda Activa 6G",
        tamilName: "ஹோண்டா ஆக்டிவா",
        serviceType: "Regular Service",
        description: "Oil change, brake check, chain lubrication, general inspection",
        dueDate: "2024-11-30",
        lastService: "2024-08-30",
        vendor: "Rajesh Honda Service",
        estimatedCost: 1200,
        priority: "high",
        status: "overdue",
        notes: "Engine oil due for change. Brake pads at 70% wear.",
        frequency: "3 months"
      },
      {
        id: 3,
        assetName: "Ceiling Fans (4 units)",
        tamilName: "கூரை விசிறி",
        serviceType: "Oiling & Cleaning",
        description: "Oil motor bearings, clean blades, check mounting stability",
        dueDate: "2025-01-10",
        lastService: "2024-07-10",
        vendor: "Murugan Electrical",
        estimatedCost: 400,
        priority: "low",
        status: "upcoming",
        notes: "Annual maintenance for all bedroom and living room fans",
        frequency: "6 months"
      },
      {
        id: 4,
        assetName: "LG Washing Machine",
        tamilName: "துணி துவைக்கும் இயந்திரம்",
        serviceType: "Deep Clean Service",
        description: "Descaling, drum cleaning, filter replacement, pipe inspection",
        dueDate: "2024-11-25",
        lastService: "2024-05-25",
        vendor: "LG Service Center",
        estimatedCost: 1500,
        priority: "medium",
        status: "scheduled",
        notes: "6-month deep cleaning. Customer noticed mild odor recently.",
        frequency: "6 months"
      }
    ];
    let filteredItems = maintenanceItems;
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
    function getStatusColor(status) {
      switch (status) {
        case "overdue":
          return "bg-red-100 text-red-800 border-red-200";
        case "upcoming":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "scheduled":
          return "bg-green-100 text-green-800 border-green-200";
        case "completed":
          return "bg-gray-100 text-gray-800 border-gray-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-IN");
    }
    function getDaysUntilDue(dueDate) {
      const today = /* @__PURE__ */ new Date();
      const due = new Date(dueDate);
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays;
    }
    {
      filteredItems = maintenanceItems.filter((item) => {
        const matchesSearch = item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || item.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) || item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all";
        return matchesSearch && matchesStatus;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:wrench-screwdriver", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Maintenance &amp; Service</h1> <p class="text-gray-600 dark:text-gray-300">Schedule, track, and manage asset maintenance</p></div></div> <button class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Schedule Service</span></button></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(
      // Add maintenance item logic would go here
      // Reset form
      views
    );
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let view = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentView === view.id ? "bg-orange-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-orange-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20")}`)}>`);
      Icon($$renderer2, { icon: view.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(view.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Services</label> <div class="relative">`);
      Icon($$renderer2, {
        icon: "heroicons:magnifying-glass",
        class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
      });
      $$renderer2.push(`<!----> <input type="text"${attr("value", searchTerm)} placeholder="Search by asset, service type, or vendor..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"/></div></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label> `);
      $$renderer2.select(
        {
          value: selectedStatus,
          class: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "all" }, ($$renderer4) => {
            $$renderer4.push(`All Status`);
          });
          $$renderer3.option({ value: "overdue" }, ($$renderer4) => {
            $$renderer4.push(`Overdue`);
          });
          $$renderer3.option({ value: "upcoming" }, ($$renderer4) => {
            $$renderer4.push(`Upcoming`);
          });
          $$renderer3.option({ value: "scheduled" }, ($$renderer4) => {
            $$renderer4.push(`Scheduled`);
          });
          $$renderer3.option({ value: "completed" }, ($$renderer4) => {
            $$renderer4.push(`Completed`);
          });
        }
      );
      $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!--[-->`);
      const each_array_1 = ensure_array_like(filteredItems);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"><div class="p-6"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(item.assetName)}</h3> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(item.tamilName)}</p> <p class="text-sm font-medium text-orange-600 dark:text-orange-400 mt-1">${escape_html(item.serviceType)}</p> <div class="flex items-center space-x-2 mt-2"><span${attr_class(`px-2 py-1 text-xs font-medium border rounded-full ${stringify(getPriorityColor(item.priority))}`)}>${escape_html(item.priority)} priority</span> <span${attr_class(`px-2 py-1 text-xs font-medium border rounded-full ${stringify(getStatusColor(item.status))}`)}>${escape_html(item.status)}</span></div></div> <div class="text-right"><p class="text-sm text-gray-600 dark:text-gray-400">Due in</p> <p${attr_class(`text-2xl font-bold ${stringify(getDaysUntilDue(item.dueDate) < 0 ? "text-red-600" : getDaysUntilDue(item.dueDate) <= 7 ? "text-orange-600" : "text-green-600")}`)}>${escape_html(Math.abs(getDaysUntilDue(item.dueDate)))}</p> <p class="text-xs text-gray-500 dark:text-gray-400">${escape_html(getDaysUntilDue(item.dueDate) < 0 ? "days ago" : "days")}</p></div></div> <div class="space-y-3"><div><p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Service Description:</p> <p class="text-sm text-gray-900 dark:text-white">${escape_html(item.description)}</p></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Vendor:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(item.vendor)}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Estimated Cost:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatCurrency(item.estimatedCost))}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Due Date:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(formatDate(item.dueDate))}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Frequency:</span> <span class="font-medium text-gray-900 dark:text-white">${escape_html(item.frequency)}</span></div> `);
        if (item.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="pt-3 border-t border-gray-200 dark:border-gray-700"><p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(item.notes)}</p></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="flex space-x-2 mt-6"><button class="flex-1 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50">Schedule</button> <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">Contact Vendor</button></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  AssetsMaintenancePage as default
};
