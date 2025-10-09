import "clsx";
import { h as head, a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { e as escape_html } from "../../../chunks/context.js";
function MealsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "today";
    const tabs = [
      {
        id: "today",
        label: "Today's Meals",
        icon: "heroicons:calendar-days"
      },
      {
        id: "weekly",
        label: "Weekly Plan",
        icon: "heroicons:calendar"
      },
      { id: "recipes", label: "Recipes", icon: "heroicons:book-open" },
      {
        id: "nutrition",
        label: "Nutrition",
        icon: "heroicons:chart-bar"
      }
    ];
    let todaysMeals = [];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Meal Management - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Plan, track, and manage family meals with traditional South Indian recipes"/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto p-6 space-y-6"><div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white"><div class="flex items-center gap-3 mb-4">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-8 h-8" });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold">Meal Management</h1></div> <p class="text-orange-100">Plan nutritious meals and preserve traditional South Indian recipes</p></div> <div class="bg-white rounded-xl shadow-lg p-6"><div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${stringify(currentTab === tab.id ? "bg-orange-100 text-orange-800" : "text-gray-600 hover:bg-gray-100")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-5 h-5" });
      $$renderer2.push(`<!----> ${escape_html(tab.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><h2 class="text-xl font-bold mb-4">Today's Meal Plan</h2> <div class="space-y-4"><!--[-->`);
      const each_array_1 = ensure_array_like(todaysMeals);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let meal = each_array_1[index];
        $$renderer2.push(`<div${attr_class(`border rounded-lg p-4 ${stringify(meal.completed ? "bg-green-50 border-green-200" : "bg-white")}`)}><div class="flex items-center justify-between mb-2"><div class="flex items-center gap-3"><h3 class="font-semibold text-lg">${escape_html(meal.meal)}</h3> <span class="text-sm text-gray-600">${escape_html(meal.time)}</span> <span class="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">${escape_html(meal.calories)} cal</span></div> <button${attr_class(`px-3 py-1 rounded ${stringify(meal.completed ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700")}`)}>${escape_html(meal.completed ? "Completed" : "Mark Complete")}</button></div> <ul class="list-disc list-inside text-gray-700 space-y-1"><!--[-->`);
        const each_array_2 = ensure_array_like(meal.items);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let item = each_array_2[$$index_1];
          $$renderer2.push(`<li>${escape_html(item)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer) {
  MealsPage($$renderer);
}
export {
  _page as default
};
