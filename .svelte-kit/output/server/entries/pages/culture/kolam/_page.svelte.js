import "clsx";
import { a as ensure_array_like, b as attr_class, d as attr, j as attr_style, s as stringify, c as store_get, u as unsubscribe_stores, l as store_set } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { w as writable } from "../../../../chunks/index.js";
import { T as escape_html } from "../../../../chunks/context.js";
const initialState = {
  currentPattern: null,
  strokes: [],
  selectedColor: "#8B4513",
  // Saddle brown
  brushSize: 3,
  symmetryMode: true,
  practiceMode: "free",
  difficulty: "beginner",
  progress: {
    sessions: 0,
    totalStrokes: 0,
    completedPatterns: 0,
    timeSpent: 0,
    achievements: [],
    streak: 0
  },
  isDrawing: false,
  showGrid: true,
  showGuidelines: true
};
const kolamStore = writable(initialState);
function KolamCanvas($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="w-full h-full flex items-center justify-center"><canvas class="border-2 border-gray-300 rounded-lg cursor-crosshair svelte-psrceb" style="max-width: 100%; max-height: 500px;"></canvas></div>`);
  });
}
const traditionalColors = [
  { name: "Sandalwood", tamil: "சந்தனம்", hex: "#8B4513" },
  { name: "Turmeric", tamil: "மஞ்சள்", hex: "#DAA520" },
  { name: "Indigo", tamil: "நீலம்", hex: "#4B0082" },
  { name: "Saffron", tamil: "குங்குமம்", hex: "#FF6B35" },
  { name: "Rose", tamil: "ரோஜா", hex: "#DC143C" },
  { name: "Jasmine", tamil: "மல்லிகை", hex: "#F5F5DC" },
  { name: "Lotus", tamil: "தாமரை", hex: "#FF69B4" },
  { name: "Peacock", tamil: "மயில்", hex: "#00CED1" },
  { name: "Emerald", tamil: "மரகதம்", hex: "#008B8B" }
];
const traditionalKolamPatterns = [
  {
    id: "simple-dots-4",
    name: "Simple 4 Dots",
    tamilName: "எளிய 4 புள்ளிகள்",
    description: "Basic kolam pattern with 4 dots - perfect for beginners",
    difficulty: "beginner",
    category: "basic",
    dots: 4,
    lines: 4,
    strokes: 8,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="3" fill="#8B4513"/>
      <circle cx="150" cy="50" r="3" fill="#8B4513"/>
      <circle cx="150" cy="150" r="3" fill="#8B4513"/>
      <circle cx="50" cy="150" r="3" fill="#8B4513"/>
    </svg>`
  },
  {
    id: "lotus-8",
    name: "Lotus Pattern",
    tamilName: "தாமரை கோலம்",
    description: "Traditional lotus kolam with 8 dots representing prosperity",
    difficulty: "beginner",
    category: "floral",
    dots: 8,
    lines: 12,
    strokes: 16,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="40" r="3" fill="#8B4513"/>
      <circle cx="140" cy="60" r="3" fill="#8B4513"/>
      <circle cx="160" cy="100" r="3" fill="#8B4513"/>
      <circle cx="140" cy="140" r="3" fill="#8B4513"/>
      <circle cx="100" cy="160" r="3" fill="#8B4513"/>
      <circle cx="60" cy="140" r="3" fill="#8B4513"/>
      <circle cx="40" cy="100" r="3" fill="#8B4513"/>
      <circle cx="60" cy="60" r="3" fill="#8B4513"/>
    </svg>`
  },
  {
    id: "star-10",
    name: "Star Kolam",
    tamilName: "நட்சத்திர கோலம்",
    description: "10-dot star pattern symbolizing guidance and direction",
    difficulty: "intermediate",
    category: "geometric",
    dots: 10,
    lines: 15,
    strokes: 20,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="30" r="3" fill="#8B4513"/>
      <circle cx="130" cy="50" r="3" fill="#8B4513"/>
      <circle cx="150" cy="80" r="3" fill="#8B4513"/>
      <circle cx="160" cy="110" r="3" fill="#8B4513"/>
      <circle cx="150" cy="140" r="3" fill="#8B4513"/>
      <circle cx="130" cy="170" r="3" fill="#8B4513"/>
      <circle cx="100" cy="180" r="3" fill="#8B4513"/>
      <circle cx="70" cy="170" r="3" fill="#8B4513"/>
      <circle cx="50" cy="140" r="3" fill="#8B4513"/>
      <circle cx="40" cy="110" r="3" fill="#8B4513"/>
    </svg>`
  }
];
function StrokePalette($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:swatch",
      class: "w-5 h-5 mr-2 text-purple-600"
    });
    $$renderer2.push(`<!----> Color Palette</h3> <div class="grid grid-cols-3 gap-3 mb-4"><!--[-->`);
    const each_array = ensure_array_like(traditionalColors);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let color = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`group relative p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${stringify(color.hex === store_get($$store_subs ??= {}, "$kolamStore", kolamStore).selectedColor ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white")}`)}${attr("title", `${stringify(color.name)} (${stringify(color.tamil)})`)}><div class="w-8 h-8 rounded-lg border-2 border-gray-300 mx-auto mb-2"${attr_style(`background-color: ${stringify(color.hex)}`)}></div> <div class="text-xs font-medium text-gray-700 text-center">${escape_html(color.name.split(" ")[0])}</div> <div class="text-xs text-gray-500 text-center">${escape_html(color.tamil)}</div> `);
      if (color.hex === store_get($$store_subs ??= {}, "$kolamStore", kolamStore).selectedColor) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">`);
        Icon($$renderer2, { icon: "heroicons:check", class: "w-3 h-3 text-white" });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="border-t border-gray-200 pt-4"><label for="custom-color" class="block text-sm font-medium text-gray-700 mb-2">Custom Color</label> <input id="custom-color" type="color"${attr("value", store_get($$store_subs ??= {}, "$kolamStore", kolamStore).selectedColor)} class="w-full h-10 rounded-lg border-2 border-gray-300 cursor-pointer"/></div> <div class="mt-4 p-3 bg-gray-50 rounded-lg"><div class="flex items-center space-x-2"><div class="w-6 h-6 rounded border-2 border-gray-300"${attr_style(`background-color: ${stringify(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).selectedColor)}`)}></div> <div class="text-sm text-gray-700"><div class="font-medium">Selected Color</div> <div class="text-gray-500">${escape_html(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).selectedColor)}</div></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function SampleGallery($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let filteredPatterns;
    let searchTerm = "";
    function getDifficultyColor(difficulty) {
      switch (difficulty) {
        case "beginner":
          return "bg-green-100 text-green-800";
        case "intermediate":
          return "bg-yellow-100 text-yellow-800";
        case "advanced":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    filteredPatterns = traditionalKolamPatterns.filter((pattern) => {
      const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) || pattern.tamilName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    $$renderer2.push(`<div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:photo",
      class: "w-5 h-5 mr-2 text-purple-600"
    });
    $$renderer2.push(`<!----> Traditional Patterns</h3> <div class="flex flex-wrap gap-2 mb-4"><button${attr_class(`px-3 py-1 rounded-full text-sm font-medium transition-colors ${stringify(
      "bg-purple-600 text-white"
    )}`)}>All</button> <button${attr_class(`px-3 py-1 rounded-full text-sm font-medium transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Geometric</button> <button${attr_class(`px-3 py-1 rounded-full text-sm font-medium transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Floral</button> <button${attr_class(`px-3 py-1 rounded-full text-sm font-medium transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Traditional</button></div> <div class="relative mb-4">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
    });
    $$renderer2.push(`<!----> <input type="text" placeholder="Search patterns..."${attr("value", searchTerm)} class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"/></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto"><!--[-->`);
    const each_array = ensure_array_like(filteredPatterns);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let pattern = each_array[$$index];
      $$renderer2.push(`<button class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer text-left w-full" role="button" tabindex="0"><div class="flex items-start justify-between mb-2"><div><h4 class="font-medium text-gray-900">${escape_html(pattern.name)}</h4> <p class="text-sm text-gray-600">${escape_html(pattern.tamilName)}</p></div> <span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(getDifficultyColor(pattern.difficulty))}`)}>${escape_html(pattern.difficulty)}</span></div> <div class="w-full h-24 bg-gray-50 rounded border flex items-center justify-center mb-2"><div class="text-center text-gray-400">`);
      Icon($$renderer2, { icon: "heroicons:photo", class: "w-8 h-8 mx-auto mb-1" });
      $$renderer2.push(`<!----> <div class="text-xs">Pattern Preview</div></div></div> <div class="flex items-center justify-between text-xs text-gray-500"><span>${escape_html(pattern.strokes)} strokes</span> <span>${escape_html(pattern.category)}</span></div> `);
      if (store_get($$store_subs ??= {}, "$kolamStore", kolamStore).currentPattern?.id === pattern.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-2 flex items-center text-purple-600">`);
        Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4 mr-1" });
        $$renderer2.push(`<!----> <span class="text-xs font-medium">Selected</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredPatterns.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8 text-gray-500">`);
      Icon($$renderer2, {
        icon: "heroicons:exclamation-triangle",
        class: "w-12 h-12 mx-auto mb-2"
      });
      $$renderer2.push(`<!----> <p>No patterns found matching your criteria.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function PracticeTracker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let progress, targetStrokes, completionPercentage, sessionTime;
    function getMotivationalMessage() {
      if (completionPercentage === 0) return "Start creating your kolam!";
      if (completionPercentage < 25) return "Great start! Keep going!";
      if (completionPercentage < 50) return "You're making beautiful progress!";
      if (completionPercentage < 75) return "Almost there! Stay focused!";
      if (completionPercentage < 100) return "Just a few more strokes!";
      return "Perfect! Kolam completed!";
    }
    progress = store_get($$store_subs ??= {}, "$kolamStore", kolamStore).strokes.length;
    targetStrokes = store_get($$store_subs ??= {}, "$kolamStore", kolamStore).currentPattern?.strokes || 10;
    completionPercentage = Math.min(progress / targetStrokes * 100, 100);
    sessionTime = store_get($$store_subs ??= {}, "$kolamStore", kolamStore).sessionStartTime ? Math.floor((Date.now() - store_get($$store_subs ??= {}, "$kolamStore", kolamStore).sessionStartTime) / 1e3 / 60) : 0;
    $$renderer2.push(`<div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-5 h-5 mr-2 text-purple-600"
    });
    $$renderer2.push(`<!----> Practice Progress</h3> <div class="mb-4"><div class="flex justify-between text-sm text-gray-600 mb-2"><span>Strokes: ${escape_html(progress)} / ${escape_html(targetStrokes)}</span> <span>${escape_html(Math.round(completionPercentage))}%</span></div> <div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(completionPercentage)}%`)}></div></div></div> <div class="grid grid-cols-2 gap-4 mb-4"><div class="bg-gray-50 rounded-lg p-3"><div class="flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-4 h-4 text-gray-500 mr-2" });
    $$renderer2.push(`<!----> <div><div class="text-xs text-gray-500">Session Time</div> <div class="text-sm font-medium text-gray-900">${escape_html(sessionTime)} min</div></div></div></div> <div class="bg-gray-50 rounded-lg p-3"><div class="flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-4 h-4 text-gray-500 mr-2" });
    $$renderer2.push(`<!----> <div><div class="text-xs text-gray-500">Strokes/Min</div> <div class="text-sm font-medium text-gray-900">${escape_html(sessionTime > 0 ? Math.round(progress / sessionTime) : 0)}</div></div></div></div></div> <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4"><div class="flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:sparkles",
      class: "w-5 h-5 text-purple-500 mr-2"
    });
    $$renderer2.push(`<!----> <p class="text-sm font-medium text-gray-800">${escape_html(getMotivationalMessage())}</p></div></div> <div class="border-t border-gray-200 pt-4"><h4 class="text-sm font-medium text-gray-700 mb-3">Achievements</h4> <div class="space-y-2"><div class="flex items-center justify-between"><div class="flex items-center"><div${attr_class(`w-6 h-6 rounded-full ${stringify(progress >= 5 ? "bg-green-100" : "bg-gray-100")} flex items-center justify-center mr-2`)}>`);
    if (progress >= 5) {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, { icon: "heroicons:check", class: "w-3 h-3 text-green-600" });
    } else {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { icon: "heroicons:x-mark", class: "w-3 h-3 text-gray-400" });
    }
    $$renderer2.push(`<!--]--></div> <span class="text-sm text-gray-700">First Steps (5 strokes)</span></div></div> <div class="flex items-center justify-between"><div class="flex items-center"><div${attr_class(`w-6 h-6 rounded-full ${stringify(progress >= targetStrokes ? "bg-green-100" : "bg-gray-100")} flex items-center justify-center mr-2`)}>`);
    if (progress >= targetStrokes) {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, { icon: "heroicons:check", class: "w-3 h-3 text-green-600" });
    } else {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { icon: "heroicons:x-mark", class: "w-3 h-3 text-gray-400" });
    }
    $$renderer2.push(`<!--]--></div> <span class="text-sm text-gray-700">Pattern Complete</span></div></div> <div class="flex items-center justify-between"><div class="flex items-center"><div${attr_class(`w-6 h-6 rounded-full ${stringify(sessionTime >= 10 ? "bg-green-100" : "bg-gray-100")} flex items-center justify-center mr-2`)}>`);
    if (sessionTime >= 10) {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, { icon: "heroicons:check", class: "w-3 h-3 text-green-600" });
    } else {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { icon: "heroicons:x-mark", class: "w-3 h-3 text-gray-400" });
    }
    $$renderer2.push(`<!--]--></div> <span class="text-sm text-gray-700">Dedicated Practice (10 min)</span></div></div></div></div> <div class="border-t border-gray-200 pt-4 mt-4"><div class="flex space-x-2"><button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Clear</button> <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"${attr("disabled", progress === 0, true)}>Undo</button></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function KolamPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_set(kolamStore, {
      currentPattern: null,
      strokes: [],
      selectedColor: "#8B4513",
      brushSize: 3,
      symmetryMode: true,
      practiceMode: "free",
      difficulty: "beginner",
      progress: {
        sessions: 0,
        totalStrokes: 0,
        completedPatterns: 0,
        timeSpent: 0
      }
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6"><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><div class="text-center flex-1"><h1 class="text-4xl font-bold text-gray-800 mb-2">🎨 Kolangal</h1> <p class="text-lg text-gray-600">Tamil Kolam Art Practice</p> <p class="text-sm text-amber-700 italic">கோலம் • Rangoli • Traditional Art</p></div> <button class="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">`);
    Icon($$renderer2, { icon: "heroicons:arrow-left", class: "w-5 h-5 mr-2 inline" });
    $$renderer2.push(`<!----> Back to Home</button></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div class="lg:col-span-1 space-y-6"><div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:play-circle",
      class: "w-5 h-5 mr-2 text-amber-600"
    });
    $$renderer2.push(`<!----> Practice Mode</h3> <div class="grid grid-cols-2 gap-3"><button${attr_class(`p-3 rounded-xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors text-sm font-medium text-amber-800 ${stringify(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).practiceMode === "free" ? "border-amber-500 bg-amber-100" : "")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Free Draw</button> <button${attr_class(`p-3 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors text-sm font-medium text-blue-800 ${stringify(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).practiceMode === "guided" ? "border-blue-500 bg-blue-100" : "")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:light-bulb", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Guided</button> <button${attr_class(`p-3 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-colors text-sm font-medium text-green-800 ${stringify(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).practiceMode === "tutorial" ? "border-green-500 bg-green-100" : "")}`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:academic-cap",
      class: "w-4 h-4 mx-auto mb-1"
    });
    $$renderer2.push(`<!----> Tutorial</button> <button${attr_class(`p-3 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors text-sm font-medium text-purple-800 ${stringify(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).practiceMode === "challenge" ? "border-purple-500 bg-purple-100" : "")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:trophy", class: "w-4 h-4 mx-auto mb-1" });
    $$renderer2.push(`<!----> Challenge</button></div></div> `);
    StrokePalette($$renderer2);
    $$renderer2.push(`<!----> `);
    PracticeTracker($$renderer2);
    $$renderer2.push(`<!----></div> <div class="lg:col-span-2"><div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-800 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:rectangle-stack",
      class: "w-5 h-5 mr-2 text-orange-600"
    });
    $$renderer2.push(`<!----> Kolam Canvas</h3> <div class="flex items-center space-x-2"><button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Undo">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-uturn-left",
      class: "w-4 h-4 text-gray-600"
    });
    $$renderer2.push(`<!----></button> <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Redo">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-uturn-right",
      class: "w-4 h-4 text-gray-600"
    });
    $$renderer2.push(`<!----></button> <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Clear">`);
    Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4 text-gray-600" });
    $$renderer2.push(`<!----></button> <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Save">`);
    Icon($$renderer2, {
      icon: "heroicons:document-check",
      class: "w-4 h-4 text-gray-600"
    });
    $$renderer2.push(`<!----></button></div></div> <div class="bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 min-h-[500px] flex items-center justify-center">`);
    KolamCanvas($$renderer2);
    $$renderer2.push(`<!----></div> <div class="flex items-center justify-between mt-4"><div class="flex items-center space-x-4"><div class="flex items-center space-x-2"><label for="brush-size" class="text-sm font-medium text-gray-700">Brush Size:</label> <input id="brush-size" type="range" min="1" max="10"${attr("value", store_get($$store_subs ??= {}, "$kolamStore", kolamStore).brushSize)} class="w-20"/> <span class="text-sm text-gray-600">${escape_html(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).brushSize)}px</span></div> <div class="flex items-center space-x-2"><label for="symmetry-toggle" class="text-sm font-medium text-gray-700">Symmetry:</label> <button id="symmetry-toggle"${attr_class(`p-1 rounded ${stringify(store_get($$store_subs ??= {}, "$kolamStore", kolamStore).symmetryMode ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:arrows-right-left", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button></div></div> <div class="flex items-center space-x-2"><label for="difficulty-select" class="text-sm text-gray-600">Difficulty:</label> `);
    $$renderer2.select(
      {
        id: "difficulty-select",
        value: store_get($$store_subs ??= {}, "$kolamStore", kolamStore).difficulty,
        class: "text-sm border border-gray-300 rounded px-2 py-1"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "beginner" }, ($$renderer4) => {
          $$renderer4.push(`Beginner`);
        });
        $$renderer3.option({ value: "intermediate" }, ($$renderer4) => {
          $$renderer4.push(`Intermediate`);
        });
        $$renderer3.option({ value: "advanced" }, ($$renderer4) => {
          $$renderer4.push(`Advanced`);
        });
        $$renderer3.option({ value: "master" }, ($$renderer4) => {
          $$renderer4.push(`Master`);
        });
      }
    );
    $$renderer2.push(`</div></div></div></div></div> `);
    SampleGallery($$renderer2);
    $$renderer2.push(`<!----> <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"><h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:information-circle",
      class: "w-6 h-6 mr-2 text-blue-600"
    });
    $$renderer2.push(`<!----> About Tamil Kolam</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="bg-blue-50 rounded-xl p-4"><h4 class="font-semibold text-blue-800 mb-2 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Spiritual Significance</h4> <p class="text-sm text-blue-700">Kolam represents the cycle of life, prosperity, and divine protection. Each dot and line carries symbolic meaning in Tamil culture.</p></div> <div class="bg-green-50 rounded-xl p-4"><h4 class="font-semibold text-green-800 mb-2 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:beaker", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Traditional Materials</h4> <p class="text-sm text-green-700">Rice flour, limestone powder, natural pigments. Modern adaptations use colored powders and digital tools.</p></div> <div class="bg-purple-50 rounded-xl p-4"><h4 class="font-semibold text-purple-800 mb-2 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Learning Path</h4> <p class="text-sm text-purple-700">Start with simple dots and lines, progress to complex geometric patterns. Master symmetry and rhythm.</p></div></div> <div class="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 text-center"><p class="text-lg font-medium text-amber-800 mb-2">"கோலம் போல் வாழ்க்கை"</p> <p class="text-sm text-amber-700">"Life should be as beautiful as a kolam"</p> <p class="text-xs text-amber-600 mt-1">- Tamil Proverb</p></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  KolamPage($$renderer);
}
export {
  _page as default
};
