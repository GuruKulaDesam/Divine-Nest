import { h as head, f as attr_style, s as stringify, a as ensure_array_like, b as attr_class } from "../../../../chunks/index2.js";
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
    let completionPercentage, requiredCompletion, overallCompletion;
    const pageDescription = "Role-based monthly planning and checklist for family coordination";
    const familyRoles = {
      father: {
        name: "Father",
        icon: "heroicons:user",
        color: "from-blue-500 to-blue-600",
        responsibilities: [
          {
            category: "Financial Planning",
            items: [
              {
                id: "budget_review",
                text: "Review monthly budget and expenses",
                required: true
              },
              {
                id: "savings_check",
                text: "Check savings and investment status",
                required: true
              },
              {
                id: "bills_payment",
                text: "Ensure all bills are paid on time",
                required: true
              },
              {
                id: "insurance_premium",
                text: "Pay insurance premiums",
                required: false
              }
            ]
          },
          {
            category: "Home Maintenance",
            items: [
              {
                id: "home_repairs",
                text: "Schedule any needed home repairs",
                required: false
              },
              {
                id: "vehicle_service",
                text: "Schedule vehicle maintenance/service",
                required: false
              },
              {
                id: "pest_control",
                text: "Arrange pest control if needed",
                required: false
              }
            ]
          },
          {
            category: "Family Coordination",
            items: [
              {
                id: "family_meeting",
                text: "Conduct monthly family meeting",
                required: true
              },
              {
                id: "school_fees",
                text: "Pay children's school fees",
                required: true
              },
              {
                id: "medical_checkup",
                text: "Schedule family medical checkups",
                required: false
              }
            ]
          }
        ]
      },
      mother: {
        name: "Mother",
        icon: "heroicons:user",
        color: "from-pink-500 to-pink-600",
        responsibilities: [
          {
            category: "Kitchen & Grocery",
            items: [
              {
                id: "monthly_grocery",
                text: "Plan and purchase monthly groceries",
                required: true
              },
              {
                id: "pantry_inventory",
                text: "Take pantry inventory",
                required: true
              },
              {
                id: "meal_planning",
                text: "Plan monthly meal schedule",
                required: true
              },
              {
                id: "cooking_fuel",
                text: "Check cooking fuel levels",
                required: true
              }
            ]
          },
          {
            category: "Health & Wellness",
            items: [
              {
                id: "medicine_stock",
                text: "Check medicine stock and expiry",
                required: true
              },
              {
                id: "health_appointments",
                text: "Schedule health appointments",
                required: false
              },
              {
                id: "wellness_routine",
                text: "Plan family wellness activities",
                required: false
              }
            ]
          },
          {
            category: "Children Care",
            items: [
              {
                id: "school_supplies",
                text: "Check children's school supplies",
                required: true
              },
              {
                id: "study_schedule",
                text: "Review children's study schedules",
                required: true
              },
              {
                id: "extracurricular",
                text: "Plan extracurricular activities",
                required: false
              }
            ]
          }
        ]
      },
      children: {
        name: "Children",
        icon: "heroicons:users",
        color: "from-green-500 to-green-600",
        responsibilities: [
          {
            category: "Personal Responsibility",
            items: [
              {
                id: "room_clean",
                text: "Keep room clean and organized",
                required: true
              },
              {
                id: "study_time",
                text: "Maintain regular study schedule",
                required: true
              },
              {
                id: "homework_complete",
                text: "Complete all homework on time",
                required: true
              }
            ]
          },
          {
            category: "Family Contribution",
            items: [
              {
                id: "help_kitchen",
                text: "Help in kitchen activities",
                required: false
              },
              {
                id: "respect_elders",
                text: "Show respect to elders",
                required: true
              },
              {
                id: "family_activities",
                text: "Participate in family activities",
                required: true
              }
            ]
          },
          {
            category: "Personal Growth",
            items: [
              {
                id: "read_books",
                text: "Read books regularly",
                required: false
              },
              {
                id: "learn_skill",
                text: "Learn new skill or hobby",
                required: false
              },
              {
                id: "exercise",
                text: "Maintain physical exercise routine",
                required: false
              }
            ]
          }
        ]
      },
      grandparents: {
        name: "Grandparents",
        icon: "heroicons:user-group",
        color: "from-purple-500 to-purple-600",
        responsibilities: [
          {
            category: "Spiritual Guidance",
            items: [
              {
                id: "morning_prayer",
                text: "Lead morning prayers and pooja",
                required: false
              },
              {
                id: "temple_visit",
                text: "Plan temple visits",
                required: false
              },
              {
                id: "religious_teachings",
                text: "Share religious teachings",
                required: false
              }
            ]
          },
          {
            category: "Family Wisdom",
            items: [
              {
                id: "story_telling",
                text: "Share family stories and traditions",
                required: false
              },
              {
                id: "advice_sharing",
                text: "Provide guidance and advice",
                required: false
              },
              {
                id: "cultural_teaching",
                text: "Teach cultural values and practices",
                required: false
              }
            ]
          },
          {
            category: "Health Monitoring",
            items: [
              {
                id: "health_check",
                text: "Monitor family health",
                required: false
              },
              {
                id: "traditional_remedies",
                text: "Share traditional remedies",
                required: false
              }
            ]
          }
        ]
      }
    };
    let selectedRole = "father";
    let checklists = {};
    let customItems = {};
    let monthlyNotes = "";
    let currentMonth = (/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long", year: "numeric" });
    completionPercentage = (role) => {
      const roleData = familyRoles[role];
      const checklist = checklists[role] || {};
      const totalItems = roleData.responsibilities.reduce((sum, cat) => sum + cat.items.length, 0);
      const completedItems = Object.values(checklist).filter(Boolean).length;
      return totalItems > 0 ? Math.round(completedItems / totalItems * 100) : 0;
    };
    requiredCompletion = (role) => {
      const roleData = familyRoles[role];
      const checklist = checklists[role] || {};
      const requiredItems = roleData.responsibilities.flatMap((cat) => cat.items.filter((item) => item.required));
      const completedRequired = requiredItems.filter((item) => checklist[item.id]).length;
      return `${completedRequired}/${requiredItems.length}`;
    };
    overallCompletion = () => {
      const roles = Object.keys(familyRoles);
      const totalPercentage = roles.reduce((sum, role) => sum + completionPercentage(role), 0);
      return Math.round(totalPercentage / roles.length);
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Monthly Family Checklist - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6"><div class="max-w-6xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-8 h-8 text-blue-600 dark:text-blue-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Monthly Family Checklist</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Role-based monthly planning and checklist for family coordination</p> <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Planning for: <span class="font-semibold">${escape_html(currentMonth)}</span></p></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Family Progress</h3> <p class="text-gray-600 dark:text-gray-300">Overall completion across all family roles</p></div> <div class="text-right"><div class="text-3xl font-bold text-blue-600">${escape_html(overallCompletion())}%</div> <div class="w-32 bg-gray-200 dark:bg-slate-600 rounded-full h-2 mt-2"><div class="bg-blue-600 h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(overallCompletion())}%`)}></div></div></div></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(familyRoles));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, role] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`p-4 rounded-xl border-2 transition-all ${stringify(selectedRole === key ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-slate-600 hover:border-blue-300")}`)}><div class="flex items-center gap-3"><div class="p-2 rounded-lg"${attr_style(`background: linear-gradient(${stringify(role.color)})`)}>`);
      Icon($$renderer2, { icon: role.icon, class: "w-5 h-5 text-white" });
      $$renderer2.push(`<!----></div> <div class="text-left"><h4 class="font-semibold text-gray-900 dark:text-white">${escape_html(role.name)}</h4> <p class="text-sm text-gray-600 dark:text-gray-300">${escape_html(completionPercentage(key))}% complete</p> <p class="text-xs text-orange-600 dark:text-orange-400">Required: ${escape_html(requiredCompletion(key))}</p></div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6"><div class="mb-6"><div class="flex items-center gap-3 mb-2"><div class="p-2 rounded-lg"${attr_style(`background: linear-gradient(${stringify(familyRoles[selectedRole].color)})`)}>`);
    Icon($$renderer2, {
      icon: familyRoles[selectedRole].icon,
      class: "w-6 h-6 text-white"
    });
    $$renderer2.push(`<!----></div> <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(familyRoles[selectedRole].name)} Responsibilities</h2></div> <p class="text-gray-600 dark:text-gray-300">Monthly checklist for ${escape_html(familyRoles[selectedRole].name.toLowerCase())} role in family planning</p></div> <div class="space-y-6"><!--[-->`);
    const each_array_1 = ensure_array_like(familyRoles[selectedRole].responsibilities);
    for (let $$index_3 = 0, $$length = each_array_1.length; $$index_3 < $$length; $$index_3++) {
      let category = each_array_1[$$index_3];
      $$renderer2.push(`<div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">`);
      Icon($$renderer2, { icon: "heroicons:folder", class: "w-5 h-5 text-blue-600" });
      $$renderer2.push(`<!----> ${escape_html(category.category)}</h3> <div class="space-y-3"><!--[-->`);
      const each_array_2 = ensure_array_like(category.items);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let item = each_array_2[$$index_1];
        $$renderer2.push(`<label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"><input type="checkbox"${attr("checked", checklists[selectedRole][item.id], true)} class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span${attr_class(`text-gray-900 dark:text-white ${stringify(item.required ? "font-medium" : "")}`)}>${escape_html(item.text)} `);
        if (item.required) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-red-500 ml-1">*</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></label>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600"><div class="flex items-center justify-between mb-3"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Items</h4> <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">Add Item</button></div> <div class="space-y-2"><!--[-->`);
      const each_array_3 = ensure_array_like(customItems[selectedRole][category.category] || []);
      for (let index = 0, $$length2 = each_array_3.length; index < $$length2; index++) {
        let item = each_array_3[index];
        $$renderer2.push(`<div class="flex items-center gap-2"><input type="text"${attr("value", item)} placeholder="Enter additional item..." class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"/> <button class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">`);
        Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
        $$renderer2.push(`<!----></button></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8 border-t border-gray-200 dark:border-slate-600 pt-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Notes &amp; Goals</h3> <textarea placeholder="Add notes, goals, or important reminders for this month..." rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white">`);
    const $$body = escape_html(monthlyNotes);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> `);
    if (completionPercentage(selectedRole) === 100) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: "heroicons:check-circle",
        class: "w-6 h-6 text-green-600"
      });
      $$renderer2.push(`<!----> <div><h4 class="font-semibold text-green-800 dark:text-green-200">Role Complete!</h4> <p class="text-green-700 dark:text-green-300">All ${escape_html(familyRoles[selectedRole].name.toLowerCase())} responsibilities are completed for this month.</p></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
