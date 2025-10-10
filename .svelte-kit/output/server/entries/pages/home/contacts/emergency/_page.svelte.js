import "clsx";
import { h as head, a as ensure_array_like, b as attr_class, s as stringify, d as attr } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../../chunks/context.js";
function EmergencyPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let emergencyAlerts = [];
    let emergencyContacts = [];
    let emergencyProcedures = [];
    let emergencySupplies = [];
    function getPriorityColor(priority) {
      switch (priority) {
        case "critical":
          return "bg-red-100 text-red-800 border-red-200";
        case "high":
          return "bg-orange-100 text-orange-800 border-orange-200";
        case "medium":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "complete":
          return "text-green-600";
        case "needs_check":
          return "text-orange-600";
        case "low":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Emergency Management - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Emergency management and response system for family safety"/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto p-6 space-y-6"><div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white"><div class="flex items-center gap-3 mb-4">`);
    Icon($$renderer2, { icon: "heroicons:exclamation-triangle", class: "w-8 h-8" });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold">Emergency Management</h1></div> <p class="text-red-100">Stay prepared and respond quickly to emergencies</p></div> `);
    if (emergencyAlerts.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold mb-4 flex items-center gap-2">`);
      Icon($$renderer2, { icon: "heroicons:bell-alert", class: "w-6 h-6 text-red-600" });
      $$renderer2.push(`<!----> Active Emergency Alerts</h2> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(emergencyAlerts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let alert = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`border rounded-lg p-4 ${stringify(getPriorityColor(alert.priority))}`)}><div class="flex items-start justify-between"><div class="flex-1"><h3 class="font-semibold">${escape_html(alert.title)}</h3> <p class="text-sm mt-1">${escape_html(alert.description)}</p> <p class="text-xs mt-2 opacity-75">${escape_html(alert.time)}</p></div> <div class="flex gap-2"><button class="px-3 py-1 bg-white rounded text-sm font-medium hover:bg-gray-50">Respond</button> <button class="px-3 py-1 bg-white rounded text-sm font-medium hover:bg-gray-50">Dismiss</button></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> Emergency Contacts</h2> <div class="space-y-3"><!--[-->`);
    const each_array_1 = ensure_array_like(emergencyContacts);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let contact = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p class="font-medium">${escape_html(contact.name)}</p> <p class="text-sm text-gray-600">${escape_html(contact.type)}</p></div> <a${attr("href", `tel:${stringify(contact.number)}`)} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:phone", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> Call</a></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold mb-4 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> Emergency Procedures</h2> <div class="space-y-4"><!--[-->`);
    const each_array_2 = ensure_array_like(emergencyProcedures);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let procedure = each_array_2[$$index_3];
      $$renderer2.push(`<div class="border rounded-lg p-4"><h3 class="font-semibold mb-2">${escape_html(procedure.title)}</h3> <ol class="list-decimal list-inside space-y-1 text-sm text-gray-700"><!--[-->`);
      const each_array_3 = ensure_array_like(procedure.steps);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let step = each_array_3[$$index_2];
        $$renderer2.push(`<li>${escape_html(step)}</li>`);
      }
      $$renderer2.push(`<!--]--></ol></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:cube", class: "w-6 h-6 text-purple-600" });
    $$renderer2.push(`<!----> Emergency Supplies Status</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
    const each_array_4 = ensure_array_like(emergencySupplies);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let supply = each_array_4[$$index_4];
      $$renderer2.push(`<div class="border rounded-lg p-4 text-center"><div class="text-2xl mb-2">`);
      if (supply.status === "complete") {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, {
          icon: "heroicons:check-circle",
          class: "w-8 h-8 text-green-600 mx-auto"
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (supply.status === "needs_check") {
          $$renderer2.push("<!--[-->");
          Icon($$renderer2, {
            icon: "heroicons:exclamation-circle",
            class: "w-8 h-8 text-orange-600 mx-auto"
          });
        } else {
          $$renderer2.push("<!--[!-->");
          Icon($$renderer2, {
            icon: "heroicons:x-circle",
            class: "w-8 h-8 text-red-600 mx-auto"
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <h3 class="font-medium">${escape_html(supply.item)}</h3> <p${attr_class(`text-sm ${stringify(getStatusColor(supply.status))} capitalize`)}>${escape_html(supply.status.replace("_", " "))}</p> <p class="text-xs text-gray-500 mt-1">Expires: ${escape_html(supply.expiry)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold mb-4">Quick Actions</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><button class="p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">`);
    Icon($$renderer2, {
      icon: "heroicons:plus",
      class: "w-8 h-8 text-red-500 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-sm font-medium text-red-700">Add Alert</p></button> <button class="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">`);
    Icon($$renderer2, {
      icon: "heroicons:phone",
      class: "w-8 h-8 text-blue-500 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-sm font-medium text-blue-700">Add Contact</p></button> <button class="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-8 h-8 text-green-500 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-sm font-medium text-green-700">Add Procedure</p></button> <button class="p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">`);
    Icon($$renderer2, {
      icon: "heroicons:cube",
      class: "w-8 h-8 text-purple-500 mx-auto mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-sm font-medium text-purple-700">Update Supplies</p></button></div></div></div>`);
  });
}
function _page($$renderer) {
  EmergencyPage($$renderer);
}
export {
  _page as default
};
