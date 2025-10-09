import { b as attr_class, a as ensure_array_like, s as stringify, d as attr } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function IssuesUpgradesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats;
    let upgradeRequests = [
      {
        id: 1,
        title: "Smart Home Security System",
        category: "Security",
        priority: "high",
        status: "in-progress",
        scheduledDate: "2025-10-15",
        assignedTo: "SecureTech Solutions",
        estimatedCost: "₹25,000",
        description: "Install smart cameras, door sensors, and alarm system",
        location: "Entire Home",
        contact: "+91-98765-43210",
        progress: 30
      },
      {
        id: 2,
        title: "Solar Panel Installation",
        category: "Energy",
        priority: "medium",
        status: "pending",
        scheduledDate: "2025-11-01",
        assignedTo: "Pending Assignment",
        estimatedCost: "₹1,50,000",
        description: "Install 5kW solar panel system with battery backup",
        location: "Roof",
        contact: "",
        progress: 0
      },
      {
        id: 3,
        title: "Kitchen Appliance Upgrade",
        category: "Appliances",
        priority: "medium",
        status: "scheduled",
        scheduledDate: "2025-10-20",
        assignedTo: "HomeStyle Appliances",
        estimatedCost: "₹45,000",
        description: "Replace old refrigerator and microwave with smart appliances",
        location: "Kitchen",
        contact: "+91-87654-32109",
        progress: 10
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
        case "Security":
          return "heroicons:shield-check";
        case "Energy":
          return "heroicons:battery-100";
        case "Appliances":
          return "heroicons:home-modern";
        case "Automation":
          return "heroicons:cog-6-tooth";
        default:
          return "heroicons:arrow-trending-up";
      }
    }
    stats = {
      total: upgradeRequests.length,
      pending: upgradeRequests.filter((r) => r.status === "pending").length,
      scheduled: upgradeRequests.filter((r) => r.status === "scheduled").length,
      inProgress: upgradeRequests.filter((r) => r.status === "in-progress").length,
      completed: upgradeRequests.filter((r) => r.status === "completed").length
    };
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">⬆️ Upgrades</h1> <p class="text-base-content/60">Plan and track home improvement and upgrade projects</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Request Upgrade</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Upgrades</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.total)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:arrow-trending-up",
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
    Icon($$renderer2, { icon: "heroicons:arrow-trending-up", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> All Upgrades</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Vendors</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">High Priority Upgrades</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(upgradeRequests.filter((r) => r.priority === "high" || r.status === "in-progress"));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let upgrade = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`p-3 bg-base-200 rounded-lg border-l-4 ${stringify(getPriorityColor(upgrade.priority))}`)}><div class="flex items-start justify-between"><div class="flex-1"><p class="font-medium text-base-content">${escape_html(upgrade.title)}</p> <p class="text-sm text-base-content/60">${escape_html(upgrade.location)} • ${escape_html(upgrade.category)}</p> <div class="flex items-center space-x-2 mt-2"><span${attr_class(`text-xs badge ${stringify(getStatusColor(upgrade.status))}`)}>${escape_html(upgrade.status)}</span> <span class="text-xs text-base-content/60">${escape_html(upgrade.estimatedCost)}</span></div></div> `);
        Icon($$renderer2, {
          icon: getCategoryIcon(upgrade.category),
          class: "w-5 h-5 text-base-content/40"
        });
        $$renderer2.push(`<!----></div> `);
        if (upgrade.progress > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-3"><div class="flex items-center justify-between text-sm"><span>Progress</span> <span>${escape_html(upgrade.progress)}%</span></div> <progress class="progress progress-primary w-full"${attr("value", upgrade.progress)} max="100"></progress></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Upcoming Upgrades</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(upgradeRequests.filter((r) => r.status === "scheduled"));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let upgrade = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-3 bg-base-200 rounded-lg"><div class="flex items-center justify-between"><div><p class="font-medium text-base-content">${escape_html(upgrade.title)}</p> <p class="text-sm text-base-content/60">${escape_html(upgrade.scheduledDate)} • ${escape_html(upgrade.assignedTo)}</p></div> <div class="flex items-center space-x-2">`);
        if (upgrade.contact) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn btn-xs btn-primary">`);
          Icon($$renderer2, { icon: "heroicons:phone", class: "w-3 h-3" });
          $$renderer2.push(`<!----></button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        Icon($$renderer2, {
          icon: getCategoryIcon(upgrade.category),
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
  IssuesUpgradesPage as default
};
