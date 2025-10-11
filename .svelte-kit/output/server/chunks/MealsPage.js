import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./escaping.js";
function MealsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeSection = "overview";
    let todaysMeals = [];
    let weeklyPlan = [];
    let recipes = [];
    const MealsSections = [
      {
        id: "overview",
        name: "Meals Overview",
        tamil: "உணவுகள் கண்ணோட்டம்",
        icon: "heroicons:fire",
        color: "orange"
      },
      {
        id: "today",
        name: "Today's Meals",
        tamil: "இன்றைய உணவுகள்",
        icon: "heroicons:calendar-days",
        color: "green"
      },
      {
        id: "weekly",
        name: "Weekly Plan",
        tamil: "வாராந்திர திட்டம்",
        icon: "heroicons:calendar",
        color: "blue"
      },
      {
        id: "recipes",
        name: "Traditional Recipes",
        tamil: "மரபு சமையல்",
        icon: "heroicons:book-open",
        color: "purple"
      },
      {
        id: "nutrition",
        name: "Nutrition Tracking",
        tamil: "ஊட்டச்சத்து கண்காணிப்பு",
        icon: "heroicons:chart-bar",
        color: "red"
      }
    ];
    MealsSections.find((s) => s.id === activeSection);
    {
      todaysMeals.filter((m) => m.completed).length;
      todaysMeals.length;
      todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
      todaysMeals.filter((m) => m.completed).reduce((sum, meal) => sum + meal.calories, 0);
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-orange-100 p-3 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-8 h-8 text-orange-600" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">���️ Meals &amp; Nutrition</h1> <p class="text-lg text-gray-600">உணவுகள் &amp; ஊட்டச்சத்து</p> <p class="text-sm text-gray-500">Plan nutritious meals and preserve traditional South Indian recipes</p></div></div> <div class="flex space-x-2"><button class="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-medium">Add Meal</span></button> <button class="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">`);
    Icon($$renderer2, { icon: "heroicons:clipboard-document-list", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-medium">Weekly Plan</span></button></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Today's Meals</p> <p class="text-2xl font-bold">${escape_html(todaysMeals.filter((m) => m.completed).length)}/${escape_html(todaysMeals.length)}</p> <p class="text-xs opacity-75">இன்றைய உணவுகள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Calories Today</p> <p class="text-2xl font-bold">${escape_html(todaysMeals.filter((m) => m.completed).reduce((sum, meal) => sum + meal.calories, 0))}</p> <p class="text-xs opacity-75">இன்றைய கலோரிகள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Recipes</p> <p class="text-2xl font-bold">${escape_html(recipes.length)}</p> <p class="text-xs opacity-75">சமையல்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Weekly Plans</p> <p class="text-2xl font-bold">${escape_html(weeklyPlan.length)}</p> <p class="text-xs opacity-75">வாராந்திர திட்டங்கள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bars-3", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Meal Sections <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span></h3> <nav class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like(MealsSections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${stringify(activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : "text-gray-600 hover:bg-gray-50")}`)}>`);
      Icon($$renderer2, { icon: section.icon, class: "w-5 h-5 flex-shrink-0" });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><p class="font-medium truncate">${escape_html(section.name)}</p> <p class="text-xs opacity-75 truncate">${escape_html(section.tamil)}</p></div> `);
      if (activeSection === section.id) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4> <div class="space-y-2"><button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add Recipe</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">`);
    Icon($$renderer2, { icon: "heroicons:clipboard-document-list", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Meal Planner</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Nutrition Log</span></button></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white rounded-xl shadow-lg p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900">Meals Overview</h2> <span class="text-sm text-gray-500">உணவுகள் கண்ணோட்டம்</span></div> <div class="bg-orange-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-orange-900 mb-3">Today's Meal Progress</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(todaysMeals);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let meal = each_array_1[index];
        $$renderer2.push(`<div${attr_class(`bg-white p-4 rounded-lg shadow-sm ${stringify(meal.completed ? "border-l-4 border-green-500" : "border-l-4 border-gray-300")}`)}><div class="flex items-center justify-between mb-2"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: meal.completed ? "heroicons:check-circle" : "heroicons:clock",
          class: `w-6 h-6 ${stringify(meal.completed ? "text-green-600" : "text-gray-400")}`
        });
        $$renderer2.push(`<!----> <div><h4 class="font-semibold text-gray-900">${escape_html(meal.meal)}</h4> <p class="text-sm text-gray-600">${escape_html(meal.time)}</p></div></div> <span class="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">${escape_html(meal.calories)} cal</span></div> <ul class="text-sm text-gray-600 space-y-1"><!--[-->`);
        const each_array_2 = ensure_array_like(meal.items);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let item = each_array_2[$$index_1];
          $$renderer2.push(`<li>• ${escape_html(item)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-blue-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-blue-900 mb-3">This Week's Meals</h3> <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-2"><!--[-->`);
      const each_array_3 = ensure_array_like(weeklyPlan.slice(0, 7));
      for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
        let day = each_array_3[$$index_4];
        $$renderer2.push(`<div class="bg-white p-3 rounded-lg text-center"><h4 class="font-semibold text-gray-900 text-sm">${escape_html(day.day.slice(0, 3))}</h4> <div class="text-xs text-gray-600 mt-1"><!--[-->`);
        const each_array_4 = ensure_array_like(day.meals.slice(0, 2));
        for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
          let meal = each_array_4[$$index_3];
          $$renderer2.push(`<div>${escape_html(meal)}</div>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (day.meals.length > 2) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-gray-400">+${escape_html(day.meals.length - 2)} more</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-purple-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-purple-900 mb-3">Featured Recipes</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
      const each_array_5 = ensure_array_like(recipes.slice(0, 4));
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let recipe = each_array_5[$$index_5];
        $$renderer2.push(`<div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-gray-900">${escape_html(recipe.name)}</h4> <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">${escape_html(recipe.category)}</span></div> <div class="flex items-center space-x-4 text-sm text-gray-600 mb-2"><span class="flex items-center space-x-1">`);
        Icon($$renderer2, { icon: "heroicons:clock", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>${escape_html(recipe.prepTime)}</span></span> <span class="flex items-center space-x-1">`);
        Icon($$renderer2, { icon: "heroicons:user-group", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>${escape_html(recipe.servings)} servings</span></span></div> <p class="text-xs text-gray-500">${escape_html(recipe.ingredients.slice(0, 3).join(", "))}${escape_html(recipe.ingredients.length > 3 ? "..." : "")}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div>`);
  });
}
export {
  MealsPage as M
};
