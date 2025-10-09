import { a as ensure_array_like, b as attr_class, s as stringify, j as attr_style, d as attr } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function LearningGoalsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "goals";
    let goals = [];
    const tabs = [
      {
        id: "goals",
        label: "Learning Goals",
        icon: "heroicons:academic-cap"
      },
      {
        id: "skills",
        label: "Skill Tree",
        icon: "heroicons:puzzle-piece"
      },
      {
        id: "knowledge",
        label: "Family Knowledge",
        icon: "heroicons:users"
      },
      {
        id: "mentors",
        label: "Mentors & Guides",
        icon: "heroicons:user-group"
      }
    ];
    const goalCategories = [
      {
        id: "academic",
        label: "Academic",
        icon: "heroicons:book-open",
        color: "text-blue-500"
      },
      {
        id: "cultural",
        label: "Cultural",
        icon: "heroicons:musical-note",
        color: "text-purple-500"
      },
      {
        id: "spiritual",
        label: "Spiritual",
        icon: "heroicons:sparkles",
        color: "text-yellow-500"
      },
      {
        id: "practical",
        label: "Practical",
        icon: "heroicons:wrench-screwdriver",
        color: "text-green-500"
      },
      {
        id: "artistic",
        label: "Artistic",
        icon: "heroicons:paint-brush",
        color: "text-pink-500"
      },
      {
        id: "social",
        label: "Social",
        icon: "heroicons:heart",
        color: "text-red-500"
      }
    ];
    function getCategoryIcon(categoryId) {
      return goalCategories.find((cat) => cat.id === categoryId)?.icon || "heroicons:academic-cap";
    }
    function getCategoryColor(categoryId) {
      return goalCategories.find((cat) => cat.id === categoryId)?.color || "text-gray-500";
    }
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "text-red-500 bg-red-100 dark:bg-red-900/20";
        case "medium":
          return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
        case "low":
          return "text-green-500 bg-green-100 dark:bg-green-900/20";
        default:
          return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
      }
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Learning Goals</h1> <p class="text-gray-600 dark:text-gray-300">Shape your future with purposeful learning</p></div></div></div> <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, {
      icon: "heroicons:light-bulb",
      class: "w-12 h-12 text-white/80"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">विद्या ददाति विनयम् | Knowledge Gives Humility</h3> <p class="text-white/90">"Knowledge brings humility, humility brings worthiness, worthiness brings wealth, wealth brings righteousness, and righteousness brings happiness."</p> <p class="text-sm text-white/70 mt-2">Tamil: "கல்வி தரும் பணிவு, பணிவு தரும் தகுதி"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-emerald-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-emerald-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between mb-6"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">My Learning Goals</h3> <button class="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Add Goal</span></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_2 = ensure_array_like(goals);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let goal = each_array_2[$$index_2];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: getCategoryIcon(goal.category),
          class: `w-6 h-6 ${stringify(getCategoryColor(goal.category))}`
        });
        $$renderer2.push(`<!----> <span${attr_class(`px-2 py-1 text-xs font-medium rounded-full ${stringify(getPriorityColor(goal.priority))}`)}>${escape_html(goal.priority.toUpperCase())}</span></div> <button class="text-red-400 hover:text-red-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
        $$renderer2.push(`<!----></button></div> <h4 class="font-semibold text-gray-900 dark:text-white mb-2">${escape_html(goal.title)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${escape_html(goal.description)}</p> <div class="mb-4"><div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"><span>Progress</span> <span>${escape_html(goal.progress)}%</span></div> <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-emerald-500 h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(goal.progress)}%`)}></div></div></div> <div class="flex items-center justify-between"><input type="range" min="0" max="100"${attr("value", goal.progress)} class="flex-1 mr-3"/> `);
        if (goal.deadline) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-xs text-gray-500 dark:text-gray-400">Due: ${escape_html(new Date(goal.deadline).toLocaleDateString())}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (goals.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12">`);
        Icon($$renderer2, {
          icon: "heroicons:academic-cap",
          class: "w-16 h-16 mx-auto text-emerald-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Goals Yet</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">Start your learning journey by setting your first goal</p> <button class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">Set Your First Goal</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  LearningGoalsPage as default
};
