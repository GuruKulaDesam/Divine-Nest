import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/wellness.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function MantraLibrary($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mantras = [];
    let filteredMantras = [];
    let selectedCategory = "all";
    let searchQuery = "";
    function filterMantras() {
      let filtered = mantras;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((mantra) => mantra.name.toLowerCase().includes(query) || mantra.sanskrit.toLowerCase().includes(query) || mantra.english.toLowerCase().includes(query) || mantra.deity.toLowerCase().includes(query));
      }
      filteredMantras = filtered;
    }
    function getCategoryColor(category) {
      const colors = {
        protection: "bg-red-100 text-red-800",
        health: "bg-green-100 text-green-800",
        prosperity: "bg-yellow-100 text-yellow-800",
        peace: "bg-blue-100 text-blue-800",
        wisdom: "bg-purple-100 text-purple-800",
        devotional: "bg-pink-100 text-pink-800"
      };
      return colors[category] || "bg-gray-100 text-gray-800";
    }
    filterMantras();
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Sacred Mantras</h2> <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`➕ Add Mantra`);
    }
    $$renderer2.push(`<!--]--></button></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search Mantras</label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name, deity, or text..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.option({ value: "protection" }, ($$renderer4) => {
          $$renderer4.push(`Protection`);
        });
        $$renderer3.option({ value: "health" }, ($$renderer4) => {
          $$renderer4.push(`Health`);
        });
        $$renderer3.option({ value: "prosperity" }, ($$renderer4) => {
          $$renderer4.push(`Prosperity`);
        });
        $$renderer3.option({ value: "peace" }, ($$renderer4) => {
          $$renderer4.push(`Peace`);
        });
        $$renderer3.option({ value: "wisdom" }, ($$renderer4) => {
          $$renderer4.push(`Wisdom`);
        });
        $$renderer3.option({ value: "devotional" }, ($$renderer4) => {
          $$renderer4.push(`Devotional`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredMantras);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let mantra = each_array_1[$$index_2];
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800"><div class="flex items-start justify-between mb-4"><div class="flex-1"><div class="flex items-center gap-2 mb-2"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">${escape_html(mantra.name)}</h3> <span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(getCategoryColor(mantra.category))}`)}>${escape_html(mantra.category)}</span> `);
      if (mantra.favorite) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-yellow-500">⭐</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (mantra.deity) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-green-600 dark:text-green-400 mb-1">🙏 ${escape_html(mantra.deity)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (mantra.purpose) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-gray-600 dark:text-gray-400 italic">"${escape_html(mantra.purpose)}"</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="flex gap-2"><button class="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900 p-2 rounded-lg"${attr("title", mantra.favorite ? "Remove from favorites" : "Add to favorites")}>${escape_html(mantra.favorite ? "⭐" : "☆")}</button> <button class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit">✏️</button> <button class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete">🗑️</button></div></div> <div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sanskrit</h4> <p class="text-orange-800 dark:text-orange-200 font-mono text-sm leading-relaxed">${escape_html(mantra.sanskrit)}</p></div> <div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English</h4> <p class="text-gray-700 dark:text-gray-300 text-sm italic">${escape_html(mantra.english)}</p></div> `);
      if (mantra.tamil) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">தமிழ் (Tamil)</h4> <p class="text-blue-800 dark:text-blue-200 text-sm">${escape_html(mantra.tamil)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pronunciation</h4> <p class="text-purple-800 dark:text-purple-200 text-sm font-medium">${escape_html(mantra.pronunciation)}</p></div> `);
      if (mantra.benefits && mantra.benefits.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Benefits</h4> <ul class="space-y-1"><!--[-->`);
        const each_array_2 = ensure_array_like(mantra.benefits.slice(0, 3));
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let benefit = each_array_2[$$index_1];
          $$renderer2.push(`<li class="text-sm text-gray-600 dark:text-gray-400 flex items-center"><span class="mr-2 text-green-500">✓</span> <span>${escape_html(benefit)}</span></li>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (mantra.benefits.length > 3) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<li class="text-sm text-gray-500 dark:text-gray-500">+${escape_html(mantra.benefits.length - 3)} more benefits</li>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-600 dark:text-gray-400">Practiced ${escape_html(mantra.usageCount)} times `);
      if (mantra.lastPracticed) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<br/>Last: ${escape_html(new Date(mantra.lastPracticed).toLocaleDateString())}`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Practice Now 🙏</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredMantras.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="text-6xl mb-4">🕉️</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">${escape_html("No Mantras Yet")}</h3> <p class="text-gray-600 dark:text-gray-400 mb-4">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Start building your sacred mantra collection to enhance spiritual practice.`);
      }
      $$renderer2.push(`<!--]--></p> `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">Add Your First Mantra</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function MantrasPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "library";
    const tabs = [
      {
        id: "library",
        label: "Mantra Library",
        icon: "heroicons:musical-note"
      },
      {
        id: "practice",
        label: "Practice Session",
        icon: "heroicons:play"
      },
      { id: "favorites", label: "Favorites", icon: "heroicons:heart" }
    ];
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center space-x-3 mb-4"><div class="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:musical-note", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Sacred Mantras</h1> <p class="text-gray-600 dark:text-gray-300">Collection of sacred chants and mantras</p></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-purple-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      MantraLibrary($$renderer2);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer) {
  MantrasPage($$renderer);
}
export {
  _page as default
};
