import "clsx";
import { h as head, b as attr_class, s as stringify, a as ensure_array_like } from "../../../chunks/index2.js";
import "../../../chunks/rituals.js";
import { e as escape_html } from "../../../chunks/context.js";
function RitualsDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats = {};
    let todaysRituals = [];
    let upcomingFestivals = [];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Rituals &amp; Spiritual Life - South Indian Family App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950"><div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-orange-200 dark:border-orange-800"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-orange-900 dark:text-orange-100">🕉️ Rituals &amp; Spiritual Life</h1> <p class="text-orange-700 dark:text-orange-300 mt-1">Preserve and practice South Indian spiritual traditions</p></div> <div class="text-right"><div class="text-2xl font-bold text-orange-600 dark:text-orange-400">${escape_html(stats.totalRituals || 0)}</div> <div class="text-sm text-orange-600 dark:text-orange-400">Total Rituals</div></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-orange-600 dark:text-orange-400">Today's Rituals</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(todaysRituals.length)}</p></div> <div class="text-3xl">🙏</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Completed: ${escape_html(todaysRituals.filter((r) => r.completed).length)}</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-orange-600 dark:text-orange-400">Temple Trips</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalTempleTrips || 0)}</p></div> <div class="text-3xl">🏛️</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Completed: ${escape_html(stats.completedTrips || 0)}</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-orange-600 dark:text-orange-400">Festivals</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalFestivals || 0)}</p></div> <div class="text-3xl">🎉</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Upcoming: ${escape_html(stats.upcomingFestivals || 0)}</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-orange-600 dark:text-orange-400">Completion Rate</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(stats.totalRituals ? Math.round(stats.completedRituals / stats.totalRituals * 100) : 0)}%</p></div> <div class="text-3xl">📊</div></div> <div class="mt-4"><div class="text-sm text-gray-600 dark:text-gray-400">Spiritual practice</div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-orange-200 dark:border-orange-800 mb-6"><div class="border-b border-orange-200 dark:border-orange-800"><nav class="flex space-x-8 px-6"><button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify(
      "border-orange-500 text-orange-600 dark:text-orange-400"
    )}`)}>Overview</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Daily Rituals</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Temple Trips</button> <button${attr_class(`py-4 px-1 border-b-2 font-medium text-sm ${stringify("border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>Festivals</button></nav></div> <div class="p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4"><h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">Today's Rituals (${escape_html(todaysRituals.length)})</h3> `);
      if (todaysRituals.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        const each_array = ensure_array_like(todaysRituals);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let ritual = each_array[$$index];
          $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-200 dark:border-orange-800"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-gray-900 dark:text-white">${escape_html(ritual.name)}</h4> <span${attr_class(`text-sm px-2 py-1 rounded-full ${stringify(ritual.completed ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800")}`)}>${escape_html(ritual.completed ? "Completed" : "Pending")}</span></div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${escape_html(ritual.description)}</p> <div class="flex items-center text-sm text-gray-500 dark:text-gray-400"><span>⏱️ ${escape_html(ritual.duration)} min</span> <span class="mx-2">•</span> <span>👥 ${escape_html(ritual.participants.join(", "))}</span></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p class="text-gray-600 dark:text-gray-400">No rituals scheduled for today.</p>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4"><h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4">Upcoming Festivals (${escape_html(upcomingFestivals.length)})</h3> `);
      if (upcomingFestivals.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
        const each_array_1 = ensure_array_like(upcomingFestivals.slice(0, 4));
        for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
          let festival = each_array_1[$$index_2];
          $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-800"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-gray-900 dark:text-white">${escape_html(festival.name)}</h4> <span class="text-sm text-amber-600 dark:text-amber-400">${escape_html(new Date(festival.date).toLocaleDateString())}</span></div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${escape_html(festival.significance)}</p> <div class="flex flex-wrap gap-1"><!--[-->`);
          const each_array_2 = ensure_array_like(festival.familyTraditions.slice(0, 3));
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let tradition = each_array_2[$$index_1];
            $$renderer2.push(`<span class="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full">${escape_html(tradition)}</span>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p class="text-gray-600 dark:text-gray-400">No upcoming festivals.</p>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
  });
}
function RitualsPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Rituals &amp; Traditions - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track and manage cultural rituals, festivals, and spiritual practices"/>`);
  });
  RitualsDashboard($$renderer);
}
function _page($$renderer) {
  RitualsPage($$renderer);
}
export {
  _page as default
};
