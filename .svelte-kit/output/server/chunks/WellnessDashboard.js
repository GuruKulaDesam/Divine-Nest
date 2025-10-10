import { h as head, b as attr_class, a as ensure_array_like, s as stringify } from "./index2.js";
import "./wellness.js";
import { T as escape_html } from "./context.js";
function WellnessDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats = {};
    let todaysActivities = {};
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Wellness &amp; Health - South Indian Family App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950"><div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-green-200 dark:border-green-800"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-green-900 dark:text-green-100">🧘‍♀️ Wellness &amp; Health</h1> <p class="text-green-700 dark:text-green-300 mt-1">Nurture body, mind, and spirit with traditional practices</p></div> <div class="text-right"><div class="text-2xl font-bold text-green-600 dark:text-green-400">${escape_html(stats.totalMantras || 0)}</div> <div class="text-sm text-green-600 dark:text-green-400">Sacred Mantras</div></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-green-600 dark:text-green-400">Health Records</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalHealthRecords || 0)}</p></div> <div class="text-3xl">🏥</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Track family wellness</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-green-600 dark:text-green-400">Yoga Sessions</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalYogaSessions || 0)}</p></div> <div class="text-3xl">🧘‍♀️</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Completed: ${escape_html(stats.completedYogaSessions || 0)}</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-green-600 dark:text-green-400">Journal Entries</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalJournalEntries || 0)}</p></div> <div class="text-3xl">📓</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Emotional wellness</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-green-600 dark:text-green-400">Meditation</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalMeditationSessions || 0)}</p></div> <div class="text-3xl">🧘‍♂️</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Mindful practice</div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-200 dark:border-green-800 mb-6"><div class="border-b border-green-200 dark:border-green-800"><nav class="flex space-x-8 px-6"><button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify(
      "border-green-500 text-green-600 dark:text-green-400"
    )}`)}>Overview</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Health Tracker</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Sacred Mantras</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Yoga &amp; Meditation</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Gratitude Journal</button></nav></div> <div class="p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-green-50 dark:bg-green-950/20 rounded-lg p-4"><h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">Today's Wellness Activities</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-lg p-4"><h4 class="font-medium text-gray-900 dark:text-white mb-3">🧘‍♀️ Yoga Sessions (${escape_html(todaysActivities.yogaSessions?.length || 0)})</h4> `);
      if (todaysActivities.yogaSessions?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-2"><!--[-->`);
        const each_array = ensure_array_like(todaysActivities.yogaSessions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let session = each_array[$$index];
          $$renderer2.push(`<div class="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded"><div><span class="font-medium">${escape_html(session.name)}</span> <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">(${escape_html(session.duration)} min)</span></div> <span${attr_class(`text-sm px-2 py-1 rounded-full ${stringify(session.completed ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800")}`)}>${escape_html(session.completed ? "Done" : "Pending")}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p class="text-gray-600 dark:text-gray-400">No yoga sessions scheduled for today.</p>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="bg-white dark:bg-gray-800 rounded-lg p-4"><h4 class="font-medium text-gray-900 dark:text-white mb-3">🧘‍♂️ Meditation (${escape_html(todaysActivities.meditationSessions?.length || 0)})</h4> `);
      if (todaysActivities.meditationSessions?.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-2"><!--[-->`);
        const each_array_1 = ensure_array_like(todaysActivities.meditationSessions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let session = each_array_1[$$index_1];
          $$renderer2.push(`<div class="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded"><div><span class="font-medium">${escape_html(session.name)}</span> <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">(${escape_html(session.duration)} min)</span></div> <span${attr_class(`text-sm px-2 py-1 rounded-full ${stringify(session.completed ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800")}`)}>${escape_html(session.completed ? "Done" : "Pending")}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p class="text-gray-600 dark:text-gray-400">No meditation sessions scheduled for today.</p>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4"><h3 class="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Wellness Insights</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"><div class="text-2xl mb-2">🙏</div> <div class="text-lg font-semibold text-gray-900 dark:text-white">${escape_html(stats.favoriteMantras || 0)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Favorite Mantras</div></div> <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"><div class="text-2xl mb-2">📊</div> <div class="text-lg font-semibold text-gray-900 dark:text-white">${escape_html(stats.avgMoodScore ? stats.avgMoodScore.toFixed(1) : "0")}/5</div> <div class="text-sm text-gray-600 dark:text-gray-400">Average Mood</div></div> <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center"><div class="text-2xl mb-2">🎯</div> <div class="text-lg font-semibold text-gray-900 dark:text-white">${escape_html(stats.completedYogaSessions || 0)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Yoga Completed</div></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
  });
}
export {
  WellnessDashboard as W
};
