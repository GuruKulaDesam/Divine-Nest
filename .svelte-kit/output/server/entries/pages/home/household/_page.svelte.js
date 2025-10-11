import { a as ensure_array_like, s as stringify, h as head } from "../../../../chunks/index2.js";
import "../../../../chunks/home.js";
import { b as base } from "../../../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function HouseholdManager($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let householdStats = {
      totalGroceries: 0,
      lowStockItems: 0,
      pendingChores: 0,
      completedChoresToday: 0,
      pendingRepairs: 0,
      emergencyContacts: 0
    };
    let recentActivity = [];
    $$renderer2.push(`<div class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200"><div class="flex items-center gap-4 mb-4"><div class="text-3xl">🛒</div> <div><h3 class="text-lg font-semibold text-green-800">Pantry Status</h3> <p class="text-green-600">Grocery management</p></div></div> <div class="space-y-2"><div class="flex justify-between"><span class="text-sm text-green-700">Total items:</span> <span class="font-semibold text-green-800">${escape_html(householdStats.totalGroceries)}</span></div> <div class="flex justify-between"><span class="text-sm text-green-700">Low stock:</span> <span class="font-semibold text-orange-600">${escape_html(householdStats.lowStockItems)}</span></div></div></div> <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200"><div class="flex items-center gap-4 mb-4"><div class="text-3xl">🧹</div> <div><h3 class="text-lg font-semibold text-blue-800">Family Chores</h3> <p class="text-blue-600">Task coordination</p></div></div> <div class="space-y-2"><div class="flex justify-between"><span class="text-sm text-blue-700">Pending:</span> <span class="font-semibold text-blue-800">${escape_html(householdStats.pendingChores)}</span></div> <div class="flex justify-between"><span class="text-sm text-blue-700">Completed today:</span> <span class="font-semibold text-green-600">${escape_html(householdStats.completedChoresToday)}</span></div></div></div> <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200"><div class="flex items-center gap-4 mb-4"><div class="text-3xl">🔧</div> <div><h3 class="text-lg font-semibold text-orange-800">Maintenance</h3> <p class="text-orange-600">Home repairs</p></div></div> <div class="space-y-2"><div class="flex justify-between"><span class="text-sm text-orange-700">Pending repairs:</span> <span class="font-semibold text-orange-800">${escape_html(householdStats.pendingRepairs)}</span></div> <div class="flex justify-between"><span class="text-sm text-orange-700">Emergency contacts:</span> <span class="font-semibold text-green-600">${escape_html(householdStats.emergencyContacts)}</span></div></div></div></div> <div class="bg-white rounded-lg shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-800 mb-6">Quick Household Actions</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><a${attr("href", `${stringify(base)}/home#grocery`)} class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center"><span class="text-2xl">🛒</span> <span class="font-semibold">Check Pantry</span> <span class="text-sm opacity-90">View grocery inventory</span></a> <a${attr("href", `${stringify(base)}/home#chores`)} class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center"><span class="text-2xl">🧹</span> <span class="font-semibold">Family Chores</span> <span class="text-sm opacity-90">Assign &amp; track tasks</span></a> <a${attr("href", `${stringify(base)}/home#repairs`)} class="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center"><span class="text-2xl">🔧</span> <span class="font-semibold">Maintenance</span> <span class="text-sm opacity-90">Track repairs</span></a> <a${attr("href", `${stringify(base)}/home-services`)} class="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2 text-center"><span class="text-2xl">🚨</span> <span class="font-semibold">Emergency</span> <span class="text-sm opacity-90">Quick contacts</span></a></div></div> <div class="bg-white rounded-lg shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-800 mb-6">Recent Household Activity</h2> `);
    if (recentActivity.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8 text-gray-500"><div class="text-4xl mb-4">📋</div> <p>No recent activity</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-4"><!--[-->`);
      const each_array = ensure_array_like(recentActivity);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let activity = each_array[$$index];
        $$renderer2.push(`<div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"><div class="text-2xl">${escape_html(activity.icon)}</div> <div class="flex-1"><p class="text-gray-800">${escape_html(activity.message)}</p> <p class="text-sm text-gray-500">${escape_html(activity.time)}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200"><h2 class="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2"><span>💡</span> South Indian Household Tips</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-purple-700 mb-2">Daily Rituals</h3> <ul class="text-sm text-purple-600 space-y-1"><li>• Morning pooja before starting household chores</li> <li>• Evening lamp lighting (deeparadhana)</li> <li>• Regular kolam drawing at entrance</li> <li>• Daily temple bell ringing</li></ul></div> <div><h3 class="font-semibold text-purple-700 mb-2">Seasonal Maintenance</h3> <ul class="text-sm text-purple-600 space-y-1"><li>• Clean water tanks before monsoon</li> <li>• Service AC units before summer</li> <li>• Check electrical wiring during festivals</li> <li>• Pest control before major celebrations</li></ul></div></div></div> <div class="bg-white rounded-lg shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-800 mb-6">Family Member Dashboard</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-pink-50 border border-pink-200 rounded-lg p-4"><div class="flex items-center gap-3 mb-3"><span class="text-2xl">👩</span> <div><h3 class="font-semibold text-pink-800">Amma</h3> <p class="text-sm text-pink-600">Household Manager</p></div></div> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-pink-700">Today's chores:</span> <span class="font-semibold">3/5</span></div> <div class="flex justify-between"><span class="text-pink-700">Streak:</span> <span class="font-semibold text-orange-600">🔥 15 days</span></div></div></div> <div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><div class="flex items-center gap-3 mb-3"><span class="text-2xl">👨</span> <div><h3 class="font-semibold text-blue-800">Appa</h3> <p class="text-sm text-blue-600">Maintenance Lead</p></div></div> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-blue-700">Repairs handled:</span> <span class="font-semibold">2</span></div> <div class="flex justify-between"><span class="text-blue-700">This month:</span> <span class="font-semibold text-green-600">✅</span></div></div></div> <div class="bg-green-50 border border-green-200 rounded-lg p-4"><div class="flex items-center gap-3 mb-3"><span class="text-2xl">👵</span> <div><h3 class="font-semibold text-green-800">Paati</h3> <p class="text-sm text-green-600">Kitchen Guardian</p></div></div> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-green-700">Recipes shared:</span> <span class="font-semibold">12</span></div> <div class="flex justify-between"><span class="text-green-700">Temple visits:</span> <span class="font-semibold text-orange-600">📿 8</span></div></div></div> <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"><div class="flex items-center gap-3 mb-3"><span class="text-2xl">👶</span> <div><h3 class="font-semibold text-yellow-800">Children</h3> <p class="text-sm text-yellow-600">Little Helpers</p></div></div> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-yellow-700">Chores completed:</span> <span class="font-semibold">6</span></div> <div class="flex justify-between"><span class="text-yellow-700">Study streak:</span> <span class="font-semibold text-blue-600">📚 5 days</span></div></div></div></div></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Household Management - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Detailed household management with family coordination and maintenance tracking"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50"><div class="container mx-auto px-4 py-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-orange-800 mb-2">🏠 Household Management</h1> <p class="text-lg text-orange-600">Detailed coordination and maintenance of your South Indian household</p></div> `);
    HouseholdManager($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
