import "clsx";
import { b as attr_class, s as stringify, a as ensure_array_like } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/database.js";
import { e as escape_html } from "../../../chunks/context.js";
function IssuesEmergencyPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let emergencyContacts = [
      {
        name: "Police",
        number: "100",
        type: "Government",
        available: "24/7"
      },
      {
        name: "Fire Brigade",
        number: "101",
        type: "Government",
        available: "24/7"
      },
      {
        name: "Ambulance",
        number: "108",
        type: "Medical",
        available: "24/7"
      },
      {
        name: "Dr. Rajesh Kumar",
        number: "+91-98765-43210",
        type: "Family Doctor",
        available: "9 AM - 9 PM"
      },
      {
        name: "Apollo Hospital",
        number: "+91-44-2829-3333",
        type: "Hospital",
        available: "24/7"
      },
      {
        name: "Electricity Board",
        number: "1912",
        type: "Utility",
        available: "24/7"
      },
      {
        name: "Gas Cylinder Emergency",
        number: "1906",
        type: "Utility",
        available: "24/7"
      },
      {
        name: "Water Board",
        number: "+91-44-2858-5858",
        type: "Utility",
        available: "24/7"
      }
    ];
    let emergencyRequests = [
      {
        id: 1,
        title: "Power Outage in Main Hall",
        type: "Electrical",
        priority: "urgent",
        status: "in-progress",
        reportedTime: "2025-10-06 14:30",
        description: "Complete power failure in main hall during pooja time",
        assignedTo: "Raman Electricals",
        estimatedResolution: "2 hours"
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
        estimatedResolution: "4 hours"
      }
    ];
    function getPriorityColor(priority) {
      switch (priority) {
        case "urgent":
          return "text-red-600 bg-red-50 border-red-200";
        case "high":
          return "text-orange-600 bg-orange-50 border-orange-200";
        case "medium":
          return "text-yellow-600 bg-yellow-50 border-yellow-200";
        default:
          return "text-green-600 bg-green-50 border-green-200";
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "pending":
          return "text-orange-600 bg-orange-50";
        case "in-progress":
          return "text-blue-600 bg-blue-50";
        case "completed":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">��� Emergency</h1> <p class="text-base-content/60">Quick access to emergency contacts and urgent issue management</p></div> <button class="btn btn-error btn-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 mr-2"
    });
    $$renderer2.push(`<!----> Report Emergency</button></div></div> `);
    if (emergencyRequests.filter((req) => req.status !== "completed").length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert alert-error mb-6">`);
      Icon($$renderer2, { icon: "heroicons:exclamation-triangle", class: "w-6 h-6" });
      $$renderer2.push(`<!----> <div><h3 class="font-bold">Active Emergency Issues</h3> <div class="text-sm">${escape_html(emergencyRequests.filter((req) => req.status !== "completed").length)} urgent issues require immediate attention</div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Active Emergencies</p> <p class="text-2xl font-bold text-red-500">${escape_html(emergencyRequests.filter((req) => req.status !== "completed").length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-red-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Emergency Contacts</p> <p class="text-2xl font-bold text-blue-500">${escape_html(emergencyContacts.length)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-8 h-8 text-blue-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Response Time</p> <p class="text-2xl font-bold text-green-500">Under 30 min</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-green-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">This Month</p> <p class="text-2xl font-bold text-purple-500">3</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-8 h-8 text-purple-500"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Emergency Contacts</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-4 h-4 mr-2"
    });
    $$renderer2.push(`<!----> Active Issues</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Quick Emergency Contacts</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(emergencyContacts.slice(0, 4));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let contact = each_array[$$index];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-base-200 rounded-lg"><div><p class="font-medium text-base-content">${escape_html(contact.name)}</p> <p class="text-sm text-base-content/60">${escape_html(contact.type)} • ${escape_html(contact.available)}</p></div> <button class="btn btn-sm btn-primary">`);
        Icon($$renderer2, { icon: "heroicons:phone", class: "w-4 h-4 mr-1" });
        $$renderer2.push(`<!----> ${escape_html(contact.number)}</button></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Recent Emergency Issues</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(emergencyRequests);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let request = each_array_1[$$index_1];
        $$renderer2.push(`<div${attr_class(`p-3 bg-base-200 rounded-lg border-l-4 ${stringify(getPriorityColor(request.priority))}`)}><div class="flex items-start justify-between"><div><p class="font-medium text-base-content">${escape_html(request.title)}</p> <p class="text-sm text-base-content/60">${escape_html(request.description)}</p> <div class="flex items-center space-x-4 mt-2"><span${attr_class(`text-xs badge ${stringify(getStatusColor(request.status))}`)}>${escape_html(request.status)}</span> <span class="text-xs text-base-content/60">ETA: ${escape_html(request.estimatedResolution)}</span></div></div> `);
        Icon($$renderer2, {
          icon: "heroicons:exclamation-triangle",
          class: "w-5 h-5 text-red-500"
        });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  IssuesEmergencyPage($$renderer);
}
export {
  _page as default
};
