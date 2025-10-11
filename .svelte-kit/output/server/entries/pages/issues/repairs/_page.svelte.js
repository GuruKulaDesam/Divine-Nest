import "clsx";
import { b as attr_class, a as ensure_array_like, s as stringify, h as head } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function IssuesRepairsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats;
    let repairRequests = [
      {
        id: 1,
        title: "Kitchen Tap Replacement",
        category: "Plumbing",
        priority: "medium",
        status: "in-progress",
        scheduledDate: "2025-10-08",
        assignedTo: "Kumar Plumbing Services",
        estimatedCost: "₹1,200",
        description: "Replace old kitchen tap with new mixer tap",
        location: "Kitchen",
        contact: "+91-98765-43210",
        progress: 60
      },
      {
        id: 2,
        title: "Ceiling Fan Repair",
        category: "Electrical",
        priority: "low",
        status: "pending",
        scheduledDate: "2025-10-10",
        assignedTo: "Pending Assignment",
        estimatedCost: "₹800",
        description: "Fan making noise and running slow in bedroom",
        location: "Master Bedroom",
        contact: "",
        progress: 0
      },
      {
        id: 3,
        title: "Door Lock Repair",
        category: "Hardware",
        priority: "high",
        status: "scheduled",
        scheduledDate: "2025-10-07",
        assignedTo: "SecureFix Services",
        estimatedCost: "₹1,500",
        description: "Main door lock is jammed, key not turning properly",
        location: "Main Entrance",
        contact: "+91-87654-32109",
        progress: 20
      }
    ];
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "text-red-600 bg-red-50 border-red-200";
        case "medium":
          return "text-yellow-600 bg-yellow-50 border-yellow-200";
        case "low":
          return "text-green-600 bg-green-50 border-green-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "pending":
          return "text-orange-600 bg-orange-50";
        case "scheduled":
          return "text-blue-600 bg-blue-50";
        case "in-progress":
          return "text-purple-600 bg-purple-50";
        case "completed":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
    function getCategoryIcon(category) {
      switch (category) {
        case "Plumbing":
          return "heroicons:wrench-screwdriver";
        case "Electrical":
          return "heroicons:bolt";
        case "Hardware":
          return "heroicons:cog-6-tooth";
        case "Painting":
          return "heroicons:paint-brush";
        default:
          return "heroicons:wrench";
      }
    }
    stats = {
      total: repairRequests.length,
      pending: repairRequests.filter((r) => r.status === "pending").length,
      scheduled: repairRequests.filter((r) => r.status === "scheduled").length,
      inProgress: repairRequests.filter((r) => r.status === "in-progress").length,
      completed: repairRequests.filter((r) => r.status === "completed").length
    };
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">🔧 Repairs</h1> <p class="text-base-content/60">Track and manage household repair tasks and maintenance requests</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Request Repair</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Repairs</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.total)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:wrench-screwdriver",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Pending</p> <p class="text-2xl font-bold text-orange-500">${escape_html(stats.pending)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-orange-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Scheduled</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.scheduled)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">In Progress</p> <p class="text-2xl font-bold text-purple-500">${escape_html(stats.inProgress)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:cog-6-tooth",
      class: "w-8 h-8 text-purple-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Completed</p> <p class="text-2xl font-bold text-green-500">${escape_html(stats.completed)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-500"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:wrench-screwdriver", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> All Repairs</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Vendors</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Urgent Repairs</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(repairRequests.filter((r) => r.priority === "high" || r.status === "in-progress"));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let repair = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`p-3 bg-base-200 rounded-lg border-l-4 ${stringify(getPriorityColor(repair.priority))}`)}><div class="flex items-start justify-between"><div class="flex-1"><p class="font-medium text-base-content">${escape_html(repair.title)}</p> <p class="text-sm text-base-content/60">${escape_html(repair.location)} • ${escape_html(repair.category)}</p> <div class="flex items-center space-x-2 mt-2"><span${attr_class(`text-xs badge ${stringify(getStatusColor(repair.status))}`)}>${escape_html(repair.status)}</span> <span class="text-xs text-base-content/60">${escape_html(repair.estimatedCost)}</span></div></div> `);
        Icon($$renderer2, {
          icon: getCategoryIcon(repair.category),
          class: "w-5 h-5 text-base-content/40"
        });
        $$renderer2.push(`<!----></div> `);
        if (repair.progress > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-3"><div class="flex items-center justify-between text-sm"><span>Progress</span> <span>${escape_html(repair.progress)}%</span></div> <progress class="progress progress-primary w-full"${attr("value", repair.progress)} max="100"></progress></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Scheduled This Week</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(repairRequests.filter((r) => r.status === "scheduled"));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let repair = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-3 bg-base-200 rounded-lg"><div class="flex items-center justify-between"><div><p class="font-medium text-base-content">${escape_html(repair.title)}</p> <p class="text-sm text-base-content/60">${escape_html(repair.scheduledDate)} • ${escape_html(repair.assignedTo)}</p></div> <div class="flex items-center space-x-2">`);
        if (repair.contact) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn btn-xs btn-primary">`);
          Icon($$renderer2, { icon: "heroicons:phone", class: "w-3 h-3" });
          $$renderer2.push(`<!----></button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        Icon($$renderer2, {
          icon: getCategoryIcon(repair.category),
          class: "w-5 h-5 text-base-content/40"
        });
        $$renderer2.push(`<!----></div></div></div>`);
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
function RepairsPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Home Repairs - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track and manage home repair and maintenance tasks"/>`);
  });
  IssuesRepairsPage($$renderer);
}
function _page($$renderer) {
  RepairsPage($$renderer);
}
export {
  _page as default
};
