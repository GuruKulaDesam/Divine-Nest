import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function LegacyMemoryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "heritage";
    let legacyItems = [];
    const tabs = [
      {
        id: "heritage",
        label: "Family Heritage",
        icon: "heroicons:building-library"
      },
      {
        id: "ancestors",
        label: "Ancestor Profiles",
        icon: "heroicons:users"
      },
      {
        id: "heirlooms",
        label: "Heirlooms & Artifacts",
        icon: "heroicons:gift"
      },
      {
        id: "values",
        label: "Family Values",
        icon: "heroicons:heart"
      },
      {
        id: "tree",
        label: "Family Tree",
        icon: "heroicons:puzzle-piece"
      }
    ];
    const legacyTypes = [
      {
        id: "story",
        label: "Family Story",
        icon: "heroicons:book-open",
        color: "text-blue-500"
      },
      {
        id: "recipe",
        label: "Traditional Recipe",
        icon: "heroicons:cake",
        color: "text-orange-500"
      },
      {
        id: "skill",
        label: "Family Skill",
        icon: "heroicons:wrench-screwdriver",
        color: "text-green-500"
      },
      {
        id: "wisdom",
        label: "Life Wisdom",
        icon: "heroicons:light-bulb",
        color: "text-yellow-500"
      },
      {
        id: "tradition",
        label: "Family Tradition",
        icon: "heroicons:star",
        color: "text-purple-500"
      },
      {
        id: "artifact",
        label: "Physical Heirloom",
        icon: "heroicons:gift",
        color: "text-red-500"
      }
    ];
    function getTypeIcon(typeId) {
      return legacyTypes.find((type) => type.id === typeId)?.icon || "heroicons:document-text";
    }
    function getTypeColor(typeId) {
      return legacyTypes.find((type) => type.id === typeId)?.color || "text-gray-500";
    }
    function getSignificanceColor(significance) {
      switch (significance) {
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
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:building-library", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Legacy &amp; Memory</h1> <p class="text-gray-600 dark:text-gray-300">पूर्वजानां गुणान् स्मर | Remember the virtues of ancestors</p></div></div></div> <div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">विरासत संरक्षण | Heritage Preservation</h3> <p class="text-white/90">"We are the keepers of stories, guardians of wisdom, and bridges between generations."</p> <p class="text-sm text-white/70 mt-2">Tamil: "நாம் கதைகளின் காப்பாளர்கள், ஞானத்தின் காவலர்கள்"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-indigo-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between mb-6"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">🏛️ Family Heritage Collection</h3> <button class="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Add Legacy Item</span></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_2 = ensure_array_like(legacyItems);
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let item = each_array_2[$$index_3];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: getTypeIcon(item.type),
          class: `w-6 h-6 ${stringify(getTypeColor(item.type))}`
        });
        $$renderer2.push(`<!----> <div><h4 class="font-bold text-gray-900 dark:text-white">${escape_html(item.title)}</h4> <p class="text-sm text-indigo-600 dark:text-indigo-400">by ${escape_html(item.keeper)}</p></div></div> <span${attr_class(`px-2 py-1 text-xs font-medium rounded-full ${stringify(getSignificanceColor(item.significance))}`)}>${escape_html(item.significance.toUpperCase())}</span></div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${escape_html(item.content)}</p> `);
        if (item.dateOriginated) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-4">`);
          Icon($$renderer2, { icon: "heroicons:calendar", class: "w-3 h-3" });
          $$renderer2.push(`<!----> <span>Originated: ${escape_html(item.dateOriginated)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (item.tags && item.tags.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex flex-wrap gap-1"><!--[-->`);
          const each_array_3 = ensure_array_like(item.tags);
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let tag = each_array_3[$$index_2];
            $$renderer2.push(`<span class="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">#${escape_html(tag)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (legacyItems.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12">`);
        Icon($$renderer2, {
          icon: "heroicons:building-library",
          class: "w-16 h-16 mx-auto text-indigo-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Building Your Legacy</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">Begin preserving family heritage for future generations</p> <button class="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors">Add First Legacy Item</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  LegacyMemoryPage as default
};
