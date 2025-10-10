import "clsx";
import { b as attr_class, a as ensure_array_like, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { T as escape_html } from "../../../../chunks/context.js";
function RequestsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let requests = [];
    let metrics = {
      total: 0,
      emergency: 0,
      inProgress: 0,
      completed: 0,
      avgResolutionTime: 0,
      monthlySpend: 0
    };
    function getStatusColor(status) {
      switch (status) {
        case "pending":
          return "text-yellow-600 bg-yellow-100";
        case "in-progress":
          return "text-blue-600 bg-blue-100";
        case "completed":
          return "text-green-600 bg-green-100";
        case "cancelled":
          return "text-red-600 bg-red-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function getTypeIcon(type) {
      switch (type) {
        case "emergency":
          return "heroicons:exclamation-triangle";
        case "repairs":
          return "heroicons:wrench";
        case "maintenance":
          return "heroicons:cog-6-tooth";
        case "upgrades":
          return "heroicons:arrow-trending-up";
        default:
          return "heroicons:wrench-screwdriver";
      }
    }
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">Home Service Requests</h1> <p class="text-base-content/60">Manage emergency repairs, maintenance, and home upgrades</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> New Request</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Requests</p> <p class="text-2xl font-bold text-primary">${escape_html(
      // Load data on mount
      // Create new request
      // Reset form
      // Update request status
      // Get priority color
      // Get status color
      // Get type icon
      metrics.total
    )}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-8 h-8 text-primary"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Emergency</p> <p class="text-2xl font-bold text-error">${escape_html(metrics.emergency)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-error"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">In Progress</p> <p class="text-2xl font-bold text-info">${escape_html(metrics.inProgress)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-info" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Completed</p> <p class="text-2xl font-bold text-success">${escape_html(metrics.completed)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-success"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Avg Resolution</p> <p class="text-2xl font-bold text-warning">${escape_html(metrics.avgResolutionTime)}</p> <p class="text-xs text-base-content/60">days</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-8 h-8 text-warning"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Monthly Spend</p> <p class="text-2xl font-bold text-secondary">$${escape_html(metrics.monthlySpend.toFixed(0))}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:currency-dollar",
      class: "w-8 h-8 text-secondary"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Dashboard</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:list-bullet", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> All Requests</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-4 h-4 mr-2"
    });
    $$renderer2.push(`<!----> Emergency</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:cog-6-tooth", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Maintenance</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Recent Requests</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(requests.slice(0, 5));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let request = each_array[$$index];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-base-200 rounded-lg"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: getTypeIcon(request.type),
          class: "w-5 h-5 text-primary"
        });
        $$renderer2.push(`<!----> <div><p class="font-medium text-base-content">${escape_html(request.title)}</p> <p class="text-sm text-base-content/60">${escape_html(request.location)}</p></div></div> <span${attr_class(`badge ${stringify(getStatusColor(request.status))}`)}>${escape_html(request.status)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Priority Breakdown</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(["urgent", "high", "medium", "low"]);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let priority = each_array_1[$$index_1];
        const count = requests.filter((r) => r.priority === priority).length;
        $$renderer2.push(`<div class="flex items-center justify-between"><div class="flex items-center space-x-2"><div${attr_class(`w-3 h-3 rounded-full ${stringify(priority === "urgent" ? "bg-red-500" : priority === "high" ? "bg-orange-500" : priority === "medium" ? "bg-yellow-500" : "bg-green-500")}`)}></div> <span class="capitalize text-base-content">${escape_html(priority)}</span></div> <span class="font-semibold text-base-content">${escape_html(count)}</span></div>`);
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
function _page($$renderer) {
  RequestsPage($$renderer);
}
export {
  _page as default
};
