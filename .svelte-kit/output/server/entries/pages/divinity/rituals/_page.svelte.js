import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify, c as store_get, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { R as RitualsSections, F as FamilyMembers } from "../../../../chunks/rituals.js";
import { T as escape_html } from "../../../../chunks/context.js";
import { F as FestivalManager } from "../../../../chunks/FestivalManager.js";
function RitualTracker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let rituals = [];
    ({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Daily Rituals</h2> <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`➕ Add Ritual`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(rituals);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let ritual = each_array_2[$$index_2];
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">${escape_html(ritual.name)}</h3> <div class="flex items-center gap-2 mb-2"><span class="text-sm px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 capitalize">${escape_html(ritual.type)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(new Date(ritual.date).toLocaleDateString())}</span></div></div> <div class="flex gap-2"><button class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit">✏️</button> <button class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete">🗑️</button></div></div> `);
      if (ritual.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-gray-600 dark:text-gray-400 text-sm mb-3">${escape_html(ritual.description)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (ritual.significance) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-orange-700 dark:text-orange-300 text-sm mb-3 italic">"${escape_html(ritual.significance)}"</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="space-y-2 mb-4">`);
      if (ritual.participants && ritual.participants.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">👥</span> <span>${escape_html(ritual.participants.join(", "))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (ritual.duration) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">⏱️</span> <span>${escape_html(ritual.duration)} minutes</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (ritual.materials && ritual.materials.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">📦</span> <span>${escape_html(ritual.materials.join(", "))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <button${attr_class(`w-full py-2 px-4 rounded-lg font-medium ${stringify(ritual.completed ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-orange-100 text-orange-800 hover:bg-orange-200")}`)}>${escape_html(ritual.completed ? "✅ Completed" : "Mark as Completed")}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (rituals.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="text-6xl mb-4">🙏</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Rituals Yet</h3> <p class="text-gray-600 dark:text-gray-400 mb-4">Start by adding your first ritual to maintain spiritual practices.</p> <button class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">Add Your First Ritual</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function TemplePlanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let trips = [];
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Temple Trips</h2> <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`➕ Plan Trip`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(trips);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let trip = each_array_2[$$index_3];
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">🏛️ ${escape_html(trip.destination)}</h3> <div class="flex items-center gap-2 mb-2"><span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(new Date(trip.startDate).toLocaleDateString())} - ${escape_html(new Date(trip.endDate).toLocaleDateString())}</span> `);
      if (trip.completed) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Completed</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-sm px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Planned</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="flex gap-2"><button class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit">✏️</button> <button class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete">🗑️</button></div></div> <div class="space-y-3 mb-4">`);
      if (trip.travelers && trip.travelers.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">👥</span> <span>${escape_html(trip.travelers.join(", "))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (trip.budget > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">💰</span> <span>₹${escape_html(trip.budget.toLocaleString())}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (trip.transportation) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">🚗</span> <span>${escape_html(trip.transportation)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (trip.accommodations) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center text-sm text-gray-600 dark:text-gray-400"><span class="mr-2">🏠</span> <span>${escape_html(trip.accommodations)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (trip.checklist && trip.checklist.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</h4> <ul class="space-y-1"><!--[-->`);
        const each_array_3 = ensure_array_like(trip.checklist.slice(0, 3));
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let item = each_array_3[$$index_2];
          $$renderer2.push(`<li class="text-sm text-gray-600 dark:text-gray-400 flex items-center"><span class="mr-2">•</span> <span>${escape_html(item)}</span></li>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (trip.checklist.length > 3) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<li class="text-sm text-gray-500 dark:text-gray-500">+${escape_html(trip.checklist.length - 3)} more items</li>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (trip.specialNotes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg"><p class="text-sm text-orange-800 dark:text-orange-200">📝 ${escape_html(trip.specialNotes)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button${attr_class(`w-full py-2 px-4 rounded-lg font-medium ${stringify(trip.completed ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-orange-100 text-orange-800 hover:bg-orange-200")}`)}>${escape_html(trip.completed ? "✅ Trip Completed" : "Mark as Completed")}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (trips.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="text-6xl mb-4">🏛️</div> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Temple Trips Planned</h3> <p class="text-gray-600 dark:text-gray-400 mb-4">Plan your first temple pilgrimage to connect with your spiritual heritage.</p> <button class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">Plan Your First Trip</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function RitualsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activeSection = "overview";
    let selectedMember = "family";
    let stats = {};
    let todaysRituals = [];
    let upcomingFestivals = [];
    {
      const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
      if (path.startsWith("/divinity/rituals/")) {
        const section = path.split("/")[3];
        if (section && RitualsSections.find((s) => s.id === section)) {
          activeSection = section;
        }
      }
    }
    RitualsSections.find((s) => s.id === activeSection);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-orange-100 p-3 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8 text-orange-600" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">🕉️ Rituals &amp; Spiritual Life</h1> <p class="text-lg text-gray-600">சடங்குகள் மற்றும் ஆன்மீக வாழ்க்கை</p> <p class="text-sm text-gray-500">Preserve and practice South Indian spiritual traditions</p></div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(FamilyMembers));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [memberId, member] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(selectedMember === memberId ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:user-circle", class: "w-5 h-5" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(member.name)}</span> <span class="text-sm opacity-75">(${escape_html(member.tamil)})</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Today's Rituals</p> <p class="text-2xl font-bold">${escape_html(todaysRituals.length)}</p> <p class="text-xs opacity-75">இன்றைய சடங்குகள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Temple Visits</p> <p class="text-2xl font-bold">${escape_html(stats.totalTempleTrips || 0)}</p> <p class="text-xs opacity-75">கோயில் பயணங்கள்</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:building-storefront",
      class: "w-8 h-8 opacity-80"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Festivals</p> <p class="text-2xl font-bold">${escape_html(stats.totalFestivals || 0)}</p> <p class="text-xs opacity-75">விழாக்கள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Completed</p> <p class="text-2xl font-bold">${escape_html(todaysRituals.filter((r) => r.completed).length)}</p> <p class="text-xs opacity-75">முடிந்தது</p></div> `);
    Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bars-3", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Spiritual Sections <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span></h3> <nav class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(RitualsSections);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array_1[$$index_1];
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
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Quick Actions <span class="ml-2 text-xs text-gray-500">விரைவு செயல்கள்</span></h4> <div class="space-y-2"><button class="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors text-left">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 text-orange-600" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-700">Add Ritual</span></button> <button class="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors text-left">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-4 h-4 text-orange-600" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-700">Plan Temple Visit</span></button> <button class="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50 transition-colors text-left">`);
    Icon($$renderer2, { icon: "heroicons:bell", class: "w-4 h-4 text-orange-600" });
    $$renderer2.push(`<!----> <span class="text-sm text-gray-700">Festival Reminder</span></button></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white rounded-xl shadow-lg p-6">`);
    if (activeSection === "overview") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900">Spiritual Overview</h2> <span class="text-sm text-gray-500">ஆன்மீக கண்ணோட்டம்</span></div> `);
      if (todaysRituals.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-orange-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-orange-900 mb-3">Today's Rituals</h3> <div class="space-y-2"><!--[-->`);
        const each_array_2 = ensure_array_like(todaysRituals);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let ritual = each_array_2[$$index_2];
          $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-white rounded-lg"><div class="flex items-center space-x-3">`);
          Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-5 h-5 text-orange-600" });
          $$renderer2.push(`<!----> <span class="font-medium">${escape_html(ritual.name)}</span> <span class="text-sm text-gray-500">(${escape_html(ritual.tamil)})</span></div> <div class="flex items-center space-x-2">`);
          if (ritual.completed) {
            $$renderer2.push("<!--[-->");
            Icon($$renderer2, {
              icon: "heroicons:check-circle",
              class: "w-5 h-5 text-green-600"
            });
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<button class="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">Complete</button>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (upcomingFestivals.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-amber-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-amber-900 mb-3">Upcoming Festivals</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
        const each_array_3 = ensure_array_like(upcomingFestivals.slice(0, 4));
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let festival = each_array_3[$$index_3];
          $$renderer2.push(`<div class="bg-white p-4 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-gray-900">${escape_html(festival.name)}</h4> <span class="text-sm text-gray-500">${escape_html(festival.date)}</span></div> <p class="text-sm text-gray-600">${escape_html(festival.description)}</p></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (activeSection === "tracker") {
        $$renderer2.push("<!--[-->");
        RitualTracker($$renderer2);
      } else {
        $$renderer2.push("<!--[!-->");
        if (activeSection === "temple") {
          $$renderer2.push("<!--[-->");
          TemplePlanner($$renderer2);
        } else {
          $$renderer2.push("<!--[!-->");
          if (activeSection === "festivals") {
            $$renderer2.push("<!--[-->");
            FestivalManager($$renderer2);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="text-center py-12">`);
            Icon($$renderer2, {
              icon: "heroicons:sparkles",
              class: "w-16 h-16 text-orange-400 mx-auto mb-4"
            });
            $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3> <p class="text-gray-600">This spiritual section is under development.</p></div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  RitualsPage($$renderer);
}
export {
  _page as default
};
