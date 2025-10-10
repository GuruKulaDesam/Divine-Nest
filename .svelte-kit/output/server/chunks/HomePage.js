import { a as ensure_array_like, b as attr_class, s as stringify, g as clsx } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils2.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
import { e as escape_html } from "./context.js";
function HomePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const todaysSchedule = {
      morning: ["Temple visit at 6:30 AM", "School pickup at 8:00 AM"],
      noon: ["Lunch preparation", "Family prayer"],
      evening: ["Doctor appointment at 4:00 PM", "Homework help"],
      night: ["Dinner time", "Story time with kids"]
    };
    const todaysReminders = [
      {
        id: 1,
        time: "7:00 AM",
        task: "Paati's BP medicine",
        completed: false
      },
      {
        id: 2,
        time: "8:00 AM",
        task: "Milk delivery expected",
        completed: false
      },
      {
        id: 3,
        time: "12:00 PM",
        task: "Prayer time",
        completed: false
      },
      {
        id: 4,
        time: "6:00 PM",
        task: "Electricity bill due",
        completed: false
      }
    ];
    const todaysMeals = {
      breakfast: "Idli + coconut chutney",
      lunch: "Sambar + beans poriyal + curd",
      dinner: "Rasam + curd rice + pickle"
    };
    const wellbeingNudges = [
      "Have you had water recently?",
      "Take 5 minutes to breathe",
      "Would you like soft devotional music?"
    ];
    const familyPulse = [
      { member: "Paati", status: "Took medicine ✅", time: "7:00 AM" },
      { member: "Appa", status: "Walk scheduled", time: "5:00 PM" },
      { member: "Kids", status: "Homework reminder", time: "6:00 PM" }
    ];
    const ritualHighlight = {
      title: "Today is Ekadashi",
      details: "Light lamp at 6:15 PM",
      kolam: "Lotus with dots (7x1)"
    };
    let completedReminders = /* @__PURE__ */ new Set();
    let currentNudgeIndex = 0;
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6"><div class="max-w-7xl mx-auto space-y-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Today's Schedule</h2></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chevron-right",
      class: "w-5 h-5 text-gray-400"
    });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(todaysSchedule));
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let [timeOfDay, activities] = each_array[$$index_1];
      $$renderer2.push(`<div class="bg-white/50 rounded-xl p-3"><h3 class="font-medium text-gray-700 capitalize mb-1 text-sm">${escape_html(timeOfDay)}</h3> <ul class="space-y-1"><!--[-->`);
      const each_array_1 = ensure_array_like(activities.slice(0, 1));
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let activity = each_array_1[$$index];
        $$renderer2.push(`<li class="text-xs text-gray-600 flex items-center">`);
        Icon($$renderer2, {
          icon: "heroicons:check-circle",
          class: "w-3 h-3 text-green-500 mr-1"
        });
        $$renderer2.push(`<!----> ${escape_html(activity)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:bell", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Today's Reminders</h2></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chevron-right",
      class: "w-5 h-5 text-gray-400"
    });
    $$renderer2.push(`<!----></div> <div class="space-y-2"><!--[-->`);
    const each_array_2 = ensure_array_like(todaysReminders.slice(0, 3));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let reminder = each_array_2[$$index_2];
      $$renderer2.push(`<div class="flex items-center justify-between bg-white/50 rounded-xl p-3"><div class="flex items-center space-x-2"><button${attr_class(`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors ${stringify(completedReminders.has(reminder.id) ? "bg-orange-500 border-orange-500" : "")}`)}>`);
      if (completedReminders.has(reminder.id)) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:check", class: "w-3 h-3 text-white" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button> <div${attr_class(clsx(completedReminders.has(reminder.id) ? "line-through text-gray-400 text-sm" : "text-gray-700 text-sm"))}><span class="font-medium">${escape_html(reminder.time)}</span> <span class="ml-1">${escape_html(reminder.task)}</span></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Today's Meals</h2></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chevron-right",
      class: "w-5 h-5 text-gray-400"
    });
    $$renderer2.push(`<!----></div> <div class="space-y-2"><!--[-->`);
    const each_array_3 = ensure_array_like(Object.entries(todaysMeals));
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let [meal, items] = each_array_3[$$index_3];
      $$renderer2.push(`<div class="bg-white/50 rounded-xl p-3 text-center"><h3 class="font-medium text-gray-700 capitalize mb-1 text-sm">${escape_html(meal)}</h3> <p class="text-xs text-gray-600">${escape_html(items)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Wellbeing Nudge</h2></div> <button class="text-pink-500 hover:text-pink-700 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div> <div class="text-center py-2"><p class="text-sm text-gray-700 italic">"${escape_html(wellbeingNudges[currentNudgeIndex])}"</p></div></div> <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Family Pulse</h2></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chevron-right",
      class: "w-5 h-5 text-gray-400"
    });
    $$renderer2.push(`<!----></div> <div class="space-y-2"><!--[-->`);
    const each_array_4 = ensure_array_like(familyPulse);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let member = each_array_4[$$index_4];
      $$renderer2.push(`<div class="flex items-center justify-between bg-white/50 rounded-xl p-3"><div class="flex items-center space-x-2"><div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center"><span class="text-white font-medium text-xs">${escape_html(member.member.charAt(0))}</span></div> <div><p class="font-medium text-gray-700 text-sm">${escape_html(member.member)}</p> <p class="text-xs text-gray-600">${escape_html(member.status)}</p></div></div> <span class="text-xs text-gray-500">${escape_html(member.time)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:microphone", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Voice Assistant</h2></div> <button${attr_class(`px-3 py-1 text-sm rounded-xl transition-all duration-300 ${stringify("bg-indigo-500 text-white hover:bg-indigo-600")}`)}>${escape_html("Start")}</button></div> <div class="text-center py-2"><p class="text-gray-600 text-sm mb-1">Shivo is listening...</p> <p class="text-xs text-gray-500">Say "Add temple visit"</p></div></div>  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Today's Ritual</h2></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chevron-right",
      class: "w-5 h-5 text-gray-400"
    });
    $$renderer2.push(`<!----></div> <div class="text-center py-2"><h3 class="text-lg font-medium text-gray-800 mb-1">${escape_html(ritualHighlight.title)}</h3> <p class="text-gray-600 text-sm mb-2">${escape_html(ritualHighlight.details)}</p> <div class="bg-amber-50 rounded-xl p-2"><p class="text-xs text-amber-700">Kolam: ${escape_html(ritualHighlight.kolam)}</p></div></div></div>  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" role="button" tabindex="0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Culture Guide</h2></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chevron-right",
      class: "w-5 h-5 text-gray-400"
    });
    $$renderer2.push(`<!----></div> <div class="text-center py-2"><h3 class="text-sm font-medium text-gray-800 mb-1">Life Guide for Modern Children</h3> <p class="text-gray-600 text-sm mb-2">Living the South Indian Way</p> <div class="bg-indigo-50 rounded-xl p-2"><p class="text-xs text-indigo-700">📘 தமிழ் மரபு, பஞ்சாங்கம்</p></div></div></div> <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-gray-800">Quick Actions</h2></div></div> <div class="grid grid-cols-2 gap-3"><button class="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-3 rounded-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-sm font-medium">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Add Task</button> <button class="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-xl hover:from-green-500 hover:to-green-700 transition-all duration-300 text-sm font-medium">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Schedule</button> <button class="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-3 rounded-xl hover:from-purple-500 hover:to-purple-700 transition-all duration-300 text-sm font-medium">`);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Call</button> <button class="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-3 rounded-xl hover:from-orange-500 hover:to-orange-700 transition-all duration-300 text-sm font-medium">`);
    Icon($$renderer2, { icon: "heroicons:camera", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Photo</button></div></div></div></div></div>`);
  });
}
export {
  HomePage as default
};
