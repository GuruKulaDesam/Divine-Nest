import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify, h as head } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function YogaExercisePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "dashboard";
    let workoutData = [];
    const tabs = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "heroicons:chart-bar"
      },
      { id: "yoga", label: "Yoga Practice", icon: "heroicons:user" },
      { id: "exercise", label: "Exercise", icon: "heroicons:bolt" },
      {
        id: "meditation",
        label: "Meditation",
        icon: "heroicons:sparkles"
      },
      {
        id: "tracker",
        label: "Activity Tracker",
        icon: "heroicons:clock"
      }
    ];
    let weeklyStats = {
      yogaSessions: 0,
      exerciseMinutes: 0,
      meditationMinutes: 0,
      caloriesBurned: 0
    };
    function getActivityIcon(type) {
      switch (type) {
        case "yoga":
          return "heroicons:user";
        case "exercise":
          return "heroicons:bolt";
        case "meditation":
          return "heroicons:sparkles";
        default:
          return "heroicons:heart";
      }
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:user", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Yoga &amp; Exercise</h1> <p class="text-gray-600 dark:text-gray-300">शरीरमाद्यं खलु धर्मसाधनम् | Body is the foundation of dharma</p></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">योगः चित्तवृत्तिनिरोधः | Yoga is the cessation of fluctuations of the mind</h3> <p class="text-white/90">"Through yoga, we unite the body, mind, and spirit in perfect harmony."</p> <p class="text-sm text-white/70 mt-2">Tamil: "யோகம் மனதின் அலைவரிசைகளை நிறுத்துதல்"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
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
      $$renderer2.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"><div class="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:user",
        class: "w-8 h-8 mx-auto text-purple-600 dark:text-purple-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-purple-900 dark:text-purple-100">${escape_html(weeklyStats.yogaSessions)}</p> <p class="text-sm text-purple-700 dark:text-purple-300">Yoga Sessions</p></div> <div class="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:bolt",
        class: "w-8 h-8 mx-auto text-orange-600 dark:text-orange-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-orange-900 dark:text-orange-100">${escape_html(weeklyStats.exerciseMinutes)}</p> <p class="text-sm text-orange-700 dark:text-orange-300">Exercise Minutes</p></div> <div class="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:sparkles",
        class: "w-8 h-8 mx-auto text-pink-600 dark:text-pink-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-pink-900 dark:text-pink-100">${escape_html(weeklyStats.meditationMinutes)}</p> <p class="text-sm text-pink-700 dark:text-pink-300">Meditation Minutes</p></div> <div class="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:fire",
        class: "w-8 h-8 mx-auto text-green-600 dark:text-green-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-green-900 dark:text-green-100">${escape_html(weeklyStats.caloriesBurned)}</p> <p class="text-sm text-green-700 dark:text-green-300">Calories Burned</p></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div class="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white"><h3 class="text-xl font-bold mb-4">🧘‍♀️ Start Yoga Session</h3> <p class="text-purple-100 mb-4">Begin your daily yoga practice</p> <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">30 Min Session</button></div> <div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white"><h3 class="text-xl font-bold mb-4">💪 Quick Workout</h3> <p class="text-orange-100 mb-4">High-intensity exercise routine</p> <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">20 Min Workout</button></div> <div class="bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl p-6 text-white"><h3 class="text-xl font-bold mb-4">🧘 Meditation</h3> <p class="text-pink-100 mb-4">Mindfulness and breathing</p> <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">15 Min Meditation</button></div></div> <div><div class="flex items-center justify-between mb-4"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Recent Activities</h3> <button class="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Log Activity</span></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(workoutData.slice(0, 5));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let workout = each_array_1[$$index_1];
        $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex items-center space-x-4">`);
        Icon($$renderer2, {
          icon: getActivityIcon(workout.type),
          class: "w-6 h-6 text-purple-500"
        });
        $$renderer2.push(`<!----> <div><h4 class="font-medium text-gray-900 dark:text-white">${escape_html(workout.name)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(workout.duration)} min • ${escape_html(workout.intensity)} intensity</p></div></div> <div class="text-right"><p class="text-sm font-medium text-purple-600 dark:text-purple-400">${escape_html(workout.calories)} cal</p> <p class="text-xs text-gray-500 dark:text-gray-400">${escape_html(new Date(workout.date).toLocaleDateString())}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (workoutData.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-8">`);
        Icon($$renderer2, {
          icon: "heroicons:heart",
          class: "w-16 h-16 mx-auto text-purple-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Your Wellness Journey</h3> <p class="text-gray-500 dark:text-gray-400">Log your first activity to begin tracking your progress</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function YogaPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Yoga &amp; Exercise - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Practice traditional yoga and maintain physical wellness with guided exercises"/>`);
  });
  YogaExercisePage($$renderer);
}
function _page($$renderer) {
  YogaPage($$renderer);
}
export {
  _page as default
};
