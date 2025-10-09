import { b as attr_class, a as ensure_array_like, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function IssuesMaintenancePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats, overdueAndDue, upcomingTasks;
    let maintenanceTasks = [
      {
        id: 1,
        title: "AC Servicing",
        category: "HVAC",
        frequency: "Quarterly",
        lastDone: "2025-07-15",
        nextDue: "2025-10-15",
        status: "overdue",
        vendor: "CoolAir Services",
        cost: "₹2,500",
        location: "All rooms",
        priority: "high"
      },
      {
        id: 2,
        title: "Water Tank Cleaning",
        category: "Plumbing",
        frequency: "Semi-annually",
        lastDone: "2025-04-01",
        nextDue: "2025-10-01",
        status: "overdue",
        vendor: "AquaClean Services",
        cost: "₹1,800",
        location: "Terrace",
        priority: "high"
      },
      {
        id: 3,
        title: "Electrical Safety Check",
        category: "Electrical",
        frequency: "Annually",
        lastDone: "2025-01-15",
        nextDue: "2026-01-15",
        status: "upcoming",
        vendor: "SafeWire Electricals",
        cost: "₹3,000",
        location: "Entire house",
        priority: "medium"
      },
      {
        id: 4,
        title: "Pest Control",
        category: "Hygiene",
        frequency: "Quarterly",
        lastDone: "2025-09-01",
        nextDue: "2025-12-01",
        status: "scheduled",
        vendor: "BugFree Solutions",
        cost: "₹1,200",
        location: "Entire house",
        priority: "medium"
      },
      {
        id: 5,
        title: "Geyser Maintenance",
        category: "Plumbing",
        frequency: "Annually",
        lastDone: "2025-01-10",
        nextDue: "2026-01-10",
        status: "current",
        vendor: "HotWater Experts",
        cost: "₹800",
        location: "Bathrooms",
        priority: "low"
      }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "overdue":
          return "text-red-600 bg-red-50 border-red-200";
        case "due":
          return "text-orange-600 bg-orange-50 border-orange-200";
        case "upcoming":
          return "text-yellow-600 bg-yellow-50 border-yellow-200";
        case "scheduled":
          return "text-blue-600 bg-blue-50 border-blue-200";
        case "current":
          return "text-green-600 bg-green-50 border-green-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    }
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "text-red-600";
        case "medium":
          return "text-yellow-600";
        case "low":
          return "text-green-600";
        default:
          return "text-gray-600";
      }
    }
    function getCategoryIcon(category) {
      switch (category) {
        case "HVAC":
          return "heroicons:cpu-chip";
        case "Plumbing":
          return "heroicons:wrench-screwdriver";
        case "Electrical":
          return "heroicons:bolt";
        case "Hygiene":
          return "heroicons:shield-check";
        case "General":
          return "heroicons:home";
        default:
          return "heroicons:cog-6-tooth";
      }
    }
    function calculateDaysUntilDue(dueDate) {
      const today = /* @__PURE__ */ new Date();
      const due = new Date(dueDate);
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays;
    }
    function formatDaysText(days) {
      if (days < 0) return `${Math.abs(days)} days overdue`;
      if (days === 0) return "Due today";
      if (days === 1) return "Due tomorrow";
      return `Due in ${days} days`;
    }
    stats = {
      total: maintenanceTasks.length,
      overdue: maintenanceTasks.filter((t) => t.status === "overdue").length,
      due: maintenanceTasks.filter((t) => t.status === "due").length,
      upcoming: maintenanceTasks.filter((t) => t.status === "upcoming").length,
      current: maintenanceTasks.filter((t) => t.status === "current").length
    };
    overdueAndDue = maintenanceTasks.filter((t) => t.status === "overdue" || t.status === "due");
    upcomingTasks = maintenanceTasks.filter((t) => t.status === "upcoming" || t.status === "scheduled");
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">⚙️ Maintenance</h1> <p class="text-base-content/60">Schedule and track regular household maintenance tasks</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Add Task</button></div></div> `);
    if (stats.overdue > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert alert-warning mb-6">`);
      Icon($$renderer2, { icon: "heroicons:exclamation-triangle", class: "w-6 h-6" });
      $$renderer2.push(`<!----> <div><h3 class="font-bold">Maintenance Alert</h3> <div class="text-sm">${escape_html(stats.overdue)} maintenance tasks are overdue and need immediate attention</div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Tasks</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.total)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Overdue</p> <p class="text-2xl font-bold text-red-500">${escape_html(stats.overdue)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-red-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Due Soon</p> <p class="text-2xl font-bold text-orange-500">${escape_html(stats.due)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-orange-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Upcoming</p> <p class="text-2xl font-bold text-yellow-500">${escape_html(stats.upcoming)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-8 h-8 text-yellow-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Current</p> <p class="text-2xl font-bold text-green-500">${escape_html(stats.current)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-500"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Maintenance Schedule</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Vendors</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Needs Attention</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(overdueAndDue);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let task = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`p-3 bg-base-200 rounded-lg border-l-4 ${stringify(getStatusColor(task.status))}`)}><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center space-x-2">`);
        Icon($$renderer2, { icon: getCategoryIcon(task.category), class: "w-5 h-5" });
        $$renderer2.push(`<!----> <p class="font-medium text-base-content">${escape_html(task.title)}</p> <span${attr_class(`text-xs ${stringify(getPriorityColor(task.priority))}`)}>${escape_html(task.priority)}</span></div> <p class="text-sm text-base-content/60">${escape_html(task.location)} • ${escape_html(task.frequency)}</p> <p class="text-sm text-base-content/60">${escape_html(formatDaysText(calculateDaysUntilDue(task.nextDue)))}</p></div> <button class="btn btn-xs btn-primary">Mark Done</button></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Upcoming This Month</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(upcomingTasks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let task = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-3 bg-base-200 rounded-lg"><div class="flex items-center justify-between"><div><div class="flex items-center space-x-2">`);
        Icon($$renderer2, { icon: getCategoryIcon(task.category), class: "w-5 h-5" });
        $$renderer2.push(`<!----> <p class="font-medium text-base-content">${escape_html(task.title)}</p></div> <p class="text-sm text-base-content/60">${escape_html(task.nextDue)} • ${escape_html(task.vendor)}</p></div> <span${attr_class(`text-xs badge ${stringify(getStatusColor(task.status))}`)}>${escape_html(task.status)}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  IssuesMaintenancePage as default
};
