import { b as attr_class, k as bind_props, s as stringify, a as ensure_array_like, c as store_get, d as attr, u as unsubscribe_stores, h as head } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { w as writable } from "../../../../chunks/index.js";
import { f as fallback } from "../../../../chunks/utils.js";
import { T as escape_html } from "../../../../chunks/context.js";
import { f as foodRecommendations, a as avoidFoods, r as ritualPrompts, t as tamilWisdom } from "../../../../chunks/rituals.js";
const defaultCycleData = {
  startDate: "",
  averageLength: 28,
  lastPeriodDate: "",
  nextPredictedDate: ""
};
const defaultEntries = [];
function loadFromStorage(key, defaultValue) {
  return defaultValue;
}
function saveToStorage(key, value) {
}
const periodEntries = writable(loadFromStorage("periodEntries", defaultEntries));
const cycleData = writable(loadFromStorage("cycleData", defaultCycleData));
periodEntries.subscribe((value) => saveToStorage());
cycleData.subscribe((value) => saveToStorage());
function predictNextCycle(entries) {
  if (entries.length < 2) return null;
  const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const cycleLengths = [];
  for (let i = 1; i < sortedEntries.length; i++) {
    const prevDate = new Date(sortedEntries[i - 1].date);
    const currDate = new Date(sortedEntries[i].date);
    const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
    cycleLengths.push(diffDays);
  }
  if (cycleLengths.length === 0) return null;
  const avgCycleLength = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;
  const lastPeriodDate = new Date(sortedEntries[sortedEntries.length - 1].date);
  const nextCycleDate = new Date(lastPeriodDate.getTime() + avgCycleLength * 24 * 60 * 60 * 1e3);
  return nextCycleDate;
}
function getCurrentCycleDay(entries) {
  if (entries.length === 0) return 1;
  const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const lastEntry = sortedEntries[sortedEntries.length - 1];
  const lastDate = new Date(lastEntry.date);
  const today = /* @__PURE__ */ new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  return diffDays + 1;
}
function getCyclePhase(cycleDay) {
  if (cycleDay <= 5) return "menstrual";
  if (cycleDay <= 13) return "follicular";
  if (cycleDay <= 15) return "ovulation";
  if (cycleDay <= 28) return "luteal";
  return "unknown";
}
function getTamilRitualPrompt(cycleDay) {
  const prompts = {
    1: "இன்று Day 1. கஞ்சி குடி. பூஜையை மனதிலே பண்ணு.",
    2: "உடல் ஓய்வு தேவை. சூடான கஞ்சி மற்றும் இளநீர் குடி.",
    3: "பசலை கீரை சமைத்து சாப்பிடு. உடல் சுத்தம் முக்கியம்.",
    4: "இஞ்சி கஞ்சி குடி. மன அமைதிக்கு தியானம் செய்.",
    5: "கடைசி நாள். நாளை முதல் புதிய சக்தி வரும்.",
    14: "உணர்ச்சி தெளிவாக இருக்கும். ஒரு புதிய திட்டம் தொடங்கு.",
    15: "சிந்தனை தெளிவு. கனவுகளை கவனி.",
    16: "உடல் சக்தி அதிகரிக்கும். உடற்பயிற்சி செய்.",
    21: "மௌனம் தேவை. பூவால் முகம் துடை. சாந்தி உன் அழகு.",
    25: "உணர்ச்சி மாற்றம். தனிமை தேடு, ஜர்னல் எழுது.",
    28: "கடைசி நாள். அடுத்த மாதத்திற்கு தயார்படு."
  };
  return prompts[cycleDay] || "உன் உடல் சொல்லும் குரலைக் கேள். அமைதியாக இரு.";
}
function TrackerCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let phase, ritualPrompt;
    let cycleDay = fallback($$props["cycleDay"], 1);
    let nextPeriod = fallback($$props["nextPeriod"], null);
    const phaseColors = {
      menstrual: "bg-red-100 text-red-800 border-red-200",
      follicular: "bg-green-100 text-green-800 border-green-200",
      ovulation: "bg-blue-100 text-blue-800 border-blue-200",
      luteal: "bg-purple-100 text-purple-800 border-purple-200",
      unknown: "bg-gray-100 text-gray-800 border-gray-200"
    };
    const phaseNames = {
      menstrual: "மாதவிடாய்",
      follicular: "முளைத்தல்",
      ovulation: "முட்டை விட்டுவிடல்",
      luteal: "சுழற்சி முடிவு",
      unknown: "தெரியாதது"
    };
    phase = getCyclePhase(cycleDay);
    ritualPrompt = getTamilRitualPrompt(cycleDay);
    $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><div class="flex items-center justify-between mb-4"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">மாதர் விடுமுறை நாள்</h3> <p class="text-sm text-gray-500 dark:text-gray-400">Period Tracker</p></div> `);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-8 h-8 text-pink-500" });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-2 gap-4 mb-4"><div class="text-center"><div class="text-3xl font-bold text-pink-600 dark:text-pink-400">${escape_html(cycleDay)}</div> <div class="text-sm text-gray-500 dark:text-gray-400">நாள்</div></div> <div class="text-center"><div${attr_class(`inline-block px-3 py-1 rounded-full text-sm font-medium ${stringify(phaseColors[phase])}`)}>${escape_html(phaseNames[phase])}</div></div></div> <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 mb-4"><h4 class="font-medium text-pink-800 dark:text-pink-200 mb-2">இன்றைய வழிகாட்டி</h4> <p class="text-sm text-pink-700 dark:text-pink-300">${escape_html(ritualPrompt)}</p></div> `);
    if (nextPeriod) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center"><div class="text-sm text-gray-500 dark:text-gray-400">அடுத்த மாதவிடாய்</div> <div class="font-medium text-gray-900 dark:text-white">${escape_html(new Date(nextPeriod).toLocaleDateString("ta-IN", { month: "short", day: "numeric" }))}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { cycleDay, nextPeriod });
  });
}
function RitualPrompt($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let prompt, foods, avoid, phase, wisdom;
    let cycleDay = fallback($$props["cycleDay"], 1);
    function getPhase() {
      if (cycleDay <= 5) return "menstrual";
      if (cycleDay <= 13) return "follicular";
      if (cycleDay <= 15) return "ovulation";
      if (cycleDay <= 28) return "luteal";
      return "unknown";
    }
    prompt = ritualPrompts[cycleDay] || "உன் உடல் சொல்லும் குரலைக் கேள். அமைதியாக இரு.";
    foods = foodRecommendations[cycleDay] || [];
    avoid = avoidFoods[cycleDay] || [];
    phase = getPhase();
    wisdom = tamilWisdom[phase];
    $$renderer2.push(`<div class="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg"><div class="flex items-center space-x-3 mb-4">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8 text-orange-500" });
    $$renderer2.push(`<!----> <div><h3 class="text-lg font-semibold text-orange-800 dark:text-orange-200">தினசரி வழிகாட்டி</h3> <p class="text-sm text-orange-600 dark:text-orange-300">Daily Wisdom</p></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4"><h4 class="font-medium text-gray-900 dark:text-white mb-2">இன்றைய செய்தி</h4> <p class="text-gray-700 dark:text-gray-300 italic">"${escape_html(prompt)}"</p></div> `);
    if (foods.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4"><h4 class="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center">`);
      Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> பரிந்துரைக்கப்படும் உணவுகள்</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array = ensure_array_like(foods);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let food = each_array[$$index];
        $$renderer2.push(`<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">${escape_html(food)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (avoid.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4"><h4 class="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center">`);
      Icon($$renderer2, { icon: "heroicons:x-circle", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> தவிர்க்க வேண்டிய உணவுகள்</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_1 = ensure_array_like(avoid);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let food = each_array_1[$$index_1];
        $$renderer2.push(`<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">${escape_html(food)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4"><h4 class="font-medium text-purple-800 dark:text-purple-200 mb-2">சுழற்சி ஞானம்</h4> <p class="text-purple-700 dark:text-purple-300 text-sm">${escape_html(wisdom)}</p></div></div>`);
    bind_props($$props, { cycleDay });
  });
}
function CycleGraph($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let entries, cycle, cycleDays;
    function getDayStatus(day) {
      const today = /* @__PURE__ */ new Date();
      const cycleStart = new Date(cycle.lastPeriodStart);
      const dayDate = new Date(cycleStart);
      dayDate.setDate(cycleStart.getDate() + day - 1);
      const entry = entries.find((e) => {
        const entryDate = new Date(e.date);
        return entryDate.toDateString() === dayDate.toDateString();
      });
      if (entry) {
        return {
          hasEntry: true,
          flow: entry.flow,
          symptoms: entry.symptoms,
          mood: entry.mood
        };
      }
      if (dayDate.toDateString() === today.toDateString()) {
        return { isToday: true };
      }
      const predictedStart = predictNextCycle(cycle);
      if (predictedStart) {
        const predictedEnd = new Date(predictedStart);
        predictedEnd.setDate(predictedStart.getDate() + (cycle.averageLength || 5) - 1);
        if (dayDate >= predictedStart && dayDate <= predictedEnd) {
          return { isPredicted: true };
        }
      }
      return {};
    }
    function getDayColor(day) {
      const status = getDayStatus(day);
      if (status.hasEntry) {
        switch (status.flow) {
          case "heavy":
            return "bg-red-500";
          case "medium":
            return "bg-orange-500";
          case "light":
            return "bg-yellow-500";
          case "spotting":
            return "bg-pink-500";
          default:
            return "bg-gray-400";
        }
      }
      if (status.isPredicted) return "bg-red-200 dark:bg-red-800";
      if (status.isToday) return "bg-blue-500 ring-2 ring-blue-300";
      return "bg-gray-100 dark:bg-gray-700";
    }
    function getDayIcon(day) {
      const status = getDayStatus(day);
      if (status.hasEntry && status.mood) {
        switch (status.mood) {
          case "happy":
            return "heroicons:face-smile";
          case "sad":
            return "heroicons:face-frown";
          case "anxious":
            return "heroicons:exclamation-triangle";
          case "tired":
            return "heroicons:moon";
          case "energetic":
            return "heroicons:bolt";
          default:
            return null;
        }
      }
      if (status.isToday) return "heroicons:star";
      if (status.isPredicted) return "heroicons:question-mark-circle";
      return null;
    }
    entries = store_get($$store_subs ??= {}, "$periodEntries", periodEntries);
    cycle = store_get($$store_subs ??= {}, "$cycleData", cycleData);
    cycleDays = Array.from({ length: 28 }, (_, i) => i + 1);
    $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><div class="flex items-center space-x-3 mb-6">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-8 h-8 text-purple-500"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white">சுழற்சி வரைபடம்</h3> <p class="text-sm text-gray-600 dark:text-gray-400">Cycle Visualization</p></div></div> <div class="grid grid-cols-7 gap-2 mb-4"><!--[-->`);
    const each_array = ensure_array_like(cycleDays);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let day = each_array[$$index];
      const status = getDayStatus(day);
      const icon = getDayIcon(day);
      $$renderer2.push(`<button${attr_class(`w-10 h-10 rounded-full ${stringify(getDayColor(day))} flex items-center justify-center text-xs font-medium transition-all hover:scale-110 relative`, void 0, { "ring-2": status.isToday, "ring-blue-300": status.isToday })}${attr("title", `Day ${stringify(day)}${stringify(status.hasEntry ? " - Entry logged" : status.isPredicted ? " - Predicted period" : status.isToday ? " - Today" : "")}`)}>`);
      if (icon) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon, class: "w-4 h-4 text-white" });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(day)}`);
      }
      $$renderer2.push(`<!--]--> `);
      if (status.hasEntry && status.symptoms && status.symptoms.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex flex-wrap gap-4 text-sm"><div class="flex items-center space-x-2"><div class="w-4 h-4 bg-red-500 rounded-full"></div> <span class="text-gray-700 dark:text-gray-300">கனமான ஓட்டம்</span></div> <div class="flex items-center space-x-2"><div class="w-4 h-4 bg-orange-500 rounded-full"></div> <span class="text-gray-700 dark:text-gray-300">நடுத்தர ஓட்டம்</span></div> <div class="flex items-center space-x-2"><div class="w-4 h-4 bg-yellow-500 rounded-full"></div> <span class="text-gray-700 dark:text-gray-300">இலகு ஓட்டம்</span></div> <div class="flex items-center space-x-2"><div class="w-4 h-4 bg-blue-500 rounded-full ring-2 ring-blue-300"></div> <span class="text-gray-700 dark:text-gray-300">இன்று</span></div> <div class="flex items-center space-x-2"><div class="w-4 h-4 bg-red-200 dark:bg-red-800 rounded-full"></div> <span class="text-gray-700 dark:text-gray-300">கணிக்கப்பட்டது</span></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentDay;
    let activeTab = "overview";
    const tabs = [
      {
        id: "overview",
        label: "கண்ணோட்டம்",
        icon: "heroicons:home",
        english: "Overview"
      },
      {
        id: "log",
        label: "பதிவு செய்",
        icon: "heroicons:plus-circle",
        english: "Log Entry"
      },
      {
        id: "cycle",
        label: "சுழற்சி",
        icon: "heroicons:chart-bar",
        english: "Cycle View"
      },
      {
        id: "wisdom",
        label: "ஞானம்",
        icon: "heroicons:sparkles",
        english: "Wisdom"
      }
    ];
    currentDay = getCurrentCycleDay(store_get($$store_subs ??= {}, "$cycleData", cycleData));
    store_get($$store_subs ??= {}, "$periodEntries", periodEntries);
    store_get($$store_subs ??= {}, "$cycleData", cycleData);
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>மாதர் விடுமுறை நாள் - Period Tracker</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-cyan-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10"><div class="max-w-6xl mx-auto px-4 py-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-8 h-8 text-pink-500" });
    $$renderer2.push(`<!----> <div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">மாதர் விடுமுறை நாள்</h1> <p class="text-sm text-gray-600 dark:text-gray-400">My Period Tracker</p></div></div> <div class="text-right"><p class="text-sm text-gray-600 dark:text-gray-400">சுழற்சி நாள்</p> <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">${escape_html(currentDay)}</p></div></div></div></div> <div class="max-w-6xl mx-auto px-4 py-6"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden"><div class="flex border-b border-gray-200 dark:border-gray-700"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex-1 py-4 px-4 text-center transition-all ${stringify(activeTab === tab.id ? "bg-purple-50 dark:bg-purple-900/20 border-b-2 border-purple-500" : "hover:bg-gray-50 dark:hover:bg-gray-700")}`)}>`);
      Icon($$renderer2, {
        icon: tab.icon,
        class: `w-6 h-6 mx-auto mb-1 ${stringify(activeTab === tab.id ? "text-purple-600" : "text-gray-500")}`
      });
      $$renderer2.push(`<!----> <div${attr_class(`text-sm font-medium ${stringify(activeTab === tab.id ? "text-purple-600" : "text-gray-700 dark:text-gray-300")}`)}>${escape_html(tab.label)}</div> <div class="text-xs text-gray-500 dark:text-gray-400">${escape_html(tab.english)}</div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="space-y-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      TrackerCard($$renderer2, {});
      $$renderer2.push(`<!----> `);
      RitualPrompt($$renderer2, { currentDay });
      $$renderer2.push(`<!----></div> `);
      CycleGraph($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
