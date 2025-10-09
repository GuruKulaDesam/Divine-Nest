import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./rituals.js";
import { e as escape_html } from "./context.js";
function FestivalManager($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let festivals = [];
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Festival Celebrations</h2> <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`➕ Add Festival`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
    const each_array_5 = ensure_array_like(festivals);
    for (let $$index_8 = 0, $$length = each_array_5.length; $$index_8 < $$length; $$index_8++) {
      let festival = each_array_5[$$index_8];
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">🎉 ${escape_html(festival.name)}</h3> <div class="flex items-center gap-2 mb-2"><span class="text-sm px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 capitalize">${escape_html(festival.type)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(new Date(festival.date).toLocaleDateString())}</span> `);
      if (festival.completed) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Celebrated</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="flex gap-2"><button class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit">✏️</button> <button class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete">🗑️</button></div></div> <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${escape_html(festival.significance)}</p> `);
      if (festival.familyTraditions && festival.familyTraditions.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Family Traditions:</h4> <div class="flex flex-wrap gap-1"><!--[-->`);
        const each_array_6 = ensure_array_like(festival.familyTraditions.slice(0, 4));
        for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
          let tradition = each_array_6[$$index_5];
          $$renderer2.push(`<span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">${escape_html(tradition)}</span>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (festival.familyTraditions.length > 4) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">+${escape_html(festival.familyTraditions.length - 4)} more</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (festival.recipes && festival.recipes.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Traditional Recipes:</h4> <div class="flex flex-wrap gap-1"><!--[-->`);
        const each_array_7 = ensure_array_like(festival.recipes.slice(0, 3));
        for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
          let recipe = each_array_7[$$index_6];
          $$renderer2.push(`<span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">${escape_html(recipe)}</span>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (festival.recipes.length > 3) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">+${escape_html(festival.recipes.length - 3)} more</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (festival.preparations && festival.preparations.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preparations:</h4> <ul class="space-y-1"><!--[-->`);
        const each_array_8 = ensure_array_like(festival.preparations.slice(0, 2));
        for (let $$index_7 = 0, $$length2 = each_array_8.length; $$index_7 < $$length2; $$index_7++) {
          let prep = each_array_8[$$index_7];
          $$renderer2.push(`<li class="text-sm text-gray-600 dark:text-gray-400 flex items-center"><span class="mr-2">•</span> <span>${escape_html(prep)}</span></li>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (festival.preparations.length > 2) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<li class="text-sm text-gray-500 dark:text-gray-500">+${escape_html(festival.preparations.length - 2)} more preparations</li>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (festival.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg"><p class="text-sm text-blue-800 dark:text-blue-200">📝 ${escape_html(festival.notes)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button${attr_class(`w-full py-2 px-4 rounded-lg font-medium ${stringify(festival.completed ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-orange-100 text-orange-800 hover:bg-orange-200")}`)}>${escape_html(festival.completed ? "✅ Festival Celebrated" : "Mark as Celebrated")}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (festivals.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="text-6xl mb-4">🎉</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Festivals Added</h3> <p class="text-gray-600 dark:text-gray-400 mb-4">Add festivals to preserve and celebrate your cultural traditions.</p> <button class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">Add Your First Festival</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function FestivalCalendarPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "calendar";
    const tabs = [
      {
        id: "calendar",
        label: "Festival Calendar",
        icon: "heroicons:calendar"
      },
      {
        id: "planning",
        label: "Festival Planning",
        icon: "heroicons:sparkles"
      },
      {
        id: "traditions",
        label: "Family Traditions",
        icon: "heroicons:heart"
      }
    ];
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center space-x-3 mb-4"><div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Festival Calendar</h1> <p class="text-gray-600 dark:text-gray-300">Plan and celebrate cultural festivals</p></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-orange-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      FestivalManager($$renderer2);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  FestivalCalendarPage as default
};
