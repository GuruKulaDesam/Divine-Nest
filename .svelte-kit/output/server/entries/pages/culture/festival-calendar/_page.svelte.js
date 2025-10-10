import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { F as FestivalManager } from "../../../../chunks/FestivalManager.js";
import { T as escape_html } from "../../../../chunks/context.js";
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
function _page($$renderer) {
  FestivalCalendarPage($$renderer);
}
export {
  _page as default
};
