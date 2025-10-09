import { b as attr_class, a as ensure_array_like, d as attr, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function IssuesEmergencySituationsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats;
    let emergencySituations = [
      {
        id: 1,
        title: "Power Outage in Main Hall",
        type: "Electrical",
        priority: "urgent",
        status: "in-progress",
        reportedTime: "2025-10-06 14:30",
        description: "Complete power failure in main hall during pooja time",
        assignedTo: "Raman Electricals",
        estimatedResolution: "2 hours",
        progress: 60
      },
      {
        id: 2,
        title: "Water Leakage in Kitchen",
        type: "Plumbing",
        priority: "urgent",
        status: "pending",
        reportedTime: "2025-10-06 13:15",
        description: "Heavy water leakage from main pipe under kitchen sink",
        assignedTo: "Pending Assignment",
        estimatedResolution: "4 hours",
        progress: 0
      },
      {
        id: 3,
        title: "Gas Leak Suspected",
        type: "Gas",
        priority: "critical",
        status: "resolved",
        reportedTime: "2025-10-05 09:45",
        description: "Strong gas smell detected in dining area",
        assignedTo: "Indane Gas Service",
        estimatedResolution: "1 hour",
        progress: 100
      }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "pending":
          return "text-orange-600 bg-orange-50";
        case "in-progress":
          return "text-blue-600 bg-blue-50";
        case "resolved":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
    function getTypeIcon(type) {
      switch (type) {
        case "Electrical":
          return "heroicons:bolt";
        case "Plumbing":
          return "heroicons:wrench-screwdriver";
        case "Gas":
          return "heroicons:fire";
        case "Security":
          return "heroicons:shield-check";
        default:
          return "heroicons:exclamation-triangle";
      }
    }
    stats = {
      total: emergencySituations.length,
      pending: emergencySituations.filter((s) => s.status === "pending").length,
      inProgress: emergencySituations.filter((s) => s.status === "in-progress").length,
      resolved: emergencySituations.filter((s) => s.status === "resolved").length,
      critical: emergencySituations.filter((s) => s.priority === "critical" && s.status !== "resolved").length
    };
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">🚨 Emergency Situations</h1> <p class="text-base-content/60">Manage critical emergency issues and urgent situations requiring immediate attention</p></div> <button class="btn btn-error">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-5 h-5 mr-2"
    });
    $$renderer2.push(`<!----> Report Emergency</button></div></div> `);
    if (stats.critical > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert alert-error mb-6">`);
      Icon($$renderer2, { icon: "heroicons:exclamation-triangle", class: "w-6 h-6" });
      $$renderer2.push(`<!----> <div><h3 class="font-bold">CRITICAL SITUATIONS ACTIVE</h3> <div class="text-sm">${escape_html(stats.critical)} critical emergency situation${escape_html(stats.critical > 1 ? "s" : "")} require immediate attention</div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Situations</p> <p class="text-2xl font-bold text-red-500">${escape_html(stats.total)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-red-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Pending</p> <p class="text-2xl font-bold text-orange-500">${escape_html(stats.pending)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-orange-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">In Progress</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.inProgress)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:cog-6-tooth",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Resolved</p> <p class="text-2xl font-bold text-green-500">${escape_html(stats.resolved)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Critical</p> <p class="text-2xl font-bold text-red-700">${escape_html(stats.critical)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-circle",
      class: "w-8 h-8 text-red-700"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-4 h-4 mr-2"
    });
    $$renderer2.push(`<!----> All Situations</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Critical Situations</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(emergencySituations.filter((s) => s.priority === "critical" && s.status !== "resolved"));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let situation = each_array[$$index];
        $$renderer2.push(`<div class="p-3 bg-red-50 rounded-lg border-l-4 border-red-500"><div class="flex items-start justify-between"><div class="flex-1"><p class="font-medium text-red-800">${escape_html(situation.title)}</p> <p class="text-sm text-red-600">${escape_html(situation.type)} • ${escape_html(situation.reportedTime)}</p> <div class="flex items-center space-x-2 mt-2"><span class="text-xs badge bg-red-100 text-red-800">CRITICAL</span> <span class="text-xs text-red-600">${escape_html(situation.estimatedResolution)}</span></div></div> `);
        Icon($$renderer2, {
          icon: getTypeIcon(situation.type),
          class: "w-5 h-5 text-red-500"
        });
        $$renderer2.push(`<!----></div> `);
        if (situation.progress > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-3"><div class="flex items-center justify-between text-sm"><span>Progress</span> <span>${escape_html(situation.progress)}%</span></div> <progress class="progress progress-error w-full"${attr("value", situation.progress)} max="100"></progress></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (emergencySituations.filter((s) => s.priority === "critical" && s.status !== "resolved").length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-base-content/60 text-center py-4">No critical situations at this time</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Recent Emergency Activity</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(emergencySituations.slice(0, 5));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let situation = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-3 bg-base-200 rounded-lg"><div class="flex items-center justify-between"><div><p class="font-medium text-base-content">${escape_html(situation.title)}</p> <p class="text-sm text-base-content/60">${escape_html(situation.reportedTime)} • ${escape_html(situation.assignedTo)}</p></div> <div class="flex items-center space-x-2"><span${attr_class(`badge ${stringify(getStatusColor(situation.status))} badge-sm`)}>${escape_html(situation.status)}</span> `);
        Icon($$renderer2, {
          icon: getTypeIcon(situation.type),
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
export {
  IssuesEmergencySituationsPage as default
};
