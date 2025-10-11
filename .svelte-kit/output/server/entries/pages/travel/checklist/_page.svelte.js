import { h as head, a as ensure_array_like, b as attr_class, f as attr_style, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { a as attr } from "../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let completionPercentage, requiredCompletion;
    const pageDescription = "Comprehensive checklists for one-way and two-way trips with family planning";
    const tripTemplates = {
      oneWay: {
        name: "One-Way Trip",
        description: "Checklist for trips where you're not returning the same way",
        icon: "heroicons:arrow-right",
        color: "from-blue-500 to-blue-600",
        categories: [
          {
            name: "Documents & IDs",
            items: [
              { id: "aadhar", text: "Aadhar Card / ID Proof", required: true },
              {
                id: "tickets",
                text: "Bus/Train/Plane Tickets",
                required: true
              },
              {
                id: "hotel",
                text: "Hotel Booking Confirmation",
                required: false
              },
              { id: "cash", text: "Cash & Cards", required: true },
              { id: "insurance", text: "Travel Insurance", required: false }
            ]
          },
          {
            name: "Clothing & Personal",
            items: [
              {
                id: "clothes",
                text: "Clothes for destination weather",
                required: true
              },
              {
                id: "toiletries",
                text: "Toiletries & Medicines",
                required: true
              },
              {
                id: "jewelry",
                text: "Valuable jewelry (if needed)",
                required: false
              },
              {
                id: "electronics",
                text: "Phone, Charger, Power Bank",
                required: true
              }
            ]
          },
          {
            name: "Food & Supplies",
            items: [
              { id: "water", text: "Water bottles", required: true },
              { id: "snacks", text: "Snacks for journey", required: true },
              { id: "tiffin", text: "Home-cooked food", required: false },
              { id: "utensils", text: "Reusable utensils", required: false }
            ]
          },
          {
            name: "Temple & Religious",
            items: [
              {
                id: "pooja",
                text: "Pooja items for temple visit",
                required: false
              },
              { id: "prasad", text: "Prasad containers", required: false },
              { id: "clothes", text: "Traditional clothing", required: false }
            ]
          }
        ]
      },
      twoWay: {
        name: "Two-Way Trip",
        description: "Checklist for round trips with return journey planning",
        icon: "heroicons:arrow-path",
        color: "from-green-500 to-green-600",
        categories: [
          {
            name: "Outbound Journey",
            items: [
              {
                id: "outward_tickets",
                text: "Outbound tickets confirmed",
                required: true
              },
              {
                id: "outward_documents",
                text: "Outbound documents ready",
                required: true
              },
              {
                id: "outward_contact",
                text: "Emergency contact for outward journey",
                required: true
              }
            ]
          },
          {
            name: "Return Journey",
            items: [
              {
                id: "return_tickets",
                text: "Return tickets confirmed",
                required: true
              },
              {
                id: "return_documents",
                text: "Return documents ready",
                required: true
              },
              {
                id: "return_contact",
                text: "Emergency contact for return journey",
                required: true
              }
            ]
          },
          {
            name: "Stay Arrangements",
            items: [
              {
                id: "accommodation",
                text: "Hotel/stay booking confirmed",
                required: false
              },
              {
                id: "checkin_details",
                text: "Check-in/check-out details noted",
                required: false
              },
              {
                id: "local_transport",
                text: "Local transport arranged",
                required: false
              }
            ]
          },
          {
            name: "Family Coordination",
            items: [
              {
                id: "family_schedule",
                text: "Family members' schedules aligned",
                required: true
              },
              {
                id: "pickup_drop",
                text: "Pickup/drop arrangements made",
                required: true
              },
              {
                id: "communication",
                text: "Communication plan during trip",
                required: true
              }
            ]
          },
          {
            name: "Health & Safety",
            items: [
              {
                id: "medicines",
                text: "Medicines for all family members",
                required: true
              },
              { id: "first_aid", text: "First aid kit", required: true },
              {
                id: "emergency_numbers",
                text: "Local emergency numbers saved",
                required: true
              }
            ]
          }
        ]
      }
    };
    let selectedTemplate = "oneWay";
    let checklists = {};
    let customItems = {};
    let tripNotes = "";
    completionPercentage = (template) => {
      const templateData = tripTemplates[template];
      const checklist = checklists[template] || {};
      const totalItems = templateData.categories.reduce((sum, cat) => sum + cat.items.length, 0);
      const completedItems = Object.values(checklist).filter(Boolean).length;
      return totalItems > 0 ? Math.round(completedItems / totalItems * 100) : 0;
    };
    requiredCompletion = (template) => {
      const templateData = tripTemplates[template];
      const checklist = checklists[template] || {};
      const requiredItems = templateData.categories.flatMap((cat) => cat.items.filter((item) => item.required));
      const completedRequired = requiredItems.filter((item) => checklist[item.id]).length;
      return `${completedRequired}/${requiredItems.length}`;
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Trip Checklist - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-cyan-900 p-6"><div class="max-w-6xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-check",
      class: "w-8 h-8 text-cyan-600 dark:text-cyan-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Trip Checklist</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Comprehensive checklists for one-way and two-way trips with family planning</p></div></div> <div class="flex gap-4 mb-6"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(tripTemplates));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, template] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all ${stringify(selectedTemplate === key ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30" : "border-gray-200 dark:border-slate-600 hover:border-cyan-300")}`)}><div class="p-2 rounded-lg"${attr_style(`background: linear-gradient(${stringify(template.color)})`)}>`);
      Icon($$renderer2, { icon: template.icon, class: "w-5 h-5 text-white" });
      $$renderer2.push(`<!----></div> <div class="text-left"><h3 class="font-semibold text-gray-900 dark:text-white">${escape_html(template.name)}</h3> <p class="text-sm text-gray-600 dark:text-gray-300">${escape_html(template.description)}</p></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Completion</p> <p class="text-2xl font-bold text-blue-600">${escape_html(completionPercentage(selectedTemplate))}%</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-orange-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Required Items</p> <p class="text-2xl font-bold text-orange-600">${escape_html(requiredCompletion(selectedTemplate))}</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Status</p> <p class="text-lg font-bold text-green-600">${escape_html(completionPercentage(selectedTemplate) === 100 ? "Ready" : "In Progress")}</p></div></div></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6"><div class="mb-6"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${escape_html(tripTemplates[selectedTemplate].name)} Checklist</h2> <p class="text-gray-600 dark:text-gray-300">${escape_html(tripTemplates[selectedTemplate].description)}</p></div> <div class="space-y-6"><!--[-->`);
    const each_array_1 = ensure_array_like(tripTemplates[selectedTemplate].categories);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let category = each_array_1[$$index_2];
      $$renderer2.push(`<div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
      Icon($$renderer2, { icon: "heroicons:folder", class: "w-5 h-5 text-cyan-600" });
      $$renderer2.push(`<!----> ${escape_html(category.name)}</h3> <div class="space-y-3"><!--[-->`);
      const each_array_2 = ensure_array_like(category.items);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let item = each_array_2[$$index_1];
        $$renderer2.push(`<label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"><input type="checkbox"${attr("checked", checklists[selectedTemplate][item.id], true)} class="w-5 h-5 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span${attr_class(`text-gray-900 dark:text-white ${stringify(item.required ? "font-medium" : "")}`)}>${escape_html(item.text)} `);
        if (item.required) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-red-500 ml-1">*</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></label>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8 border-t border-gray-200 dark:border-slate-600 pt-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Custom Items</h3> <button class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> Add Item</button></div> <div class="space-y-3"><!--[-->`);
    const each_array_3 = ensure_array_like(customItems[selectedTemplate] || []);
    for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
      let item = each_array_3[index];
      $$renderer2.push(`<div class="flex items-center gap-3"><input type="text"${attr("value", item)} placeholder="Enter custom item..." class="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"/> <button class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mt-8 border-t border-gray-200 dark:border-slate-600 pt-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trip Notes</h3> <textarea placeholder="Add any special notes, reminders, or important information for this trip..." rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white">`);
    const $$body = escape_html(tripNotes);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> `);
    if (completionPercentage(selectedTemplate) === 100) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: "heroicons:check-circle",
        class: "w-6 h-6 text-green-600"
      });
      $$renderer2.push(`<!----> <div><h4 class="font-semibold text-green-800 dark:text-green-200">Trip Ready!</h4> <p class="text-green-700 dark:text-green-300">All checklist items are completed. Safe travels!</p></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
