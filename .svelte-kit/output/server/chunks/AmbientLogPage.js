import { h as head, b as attr_class, d as attr, a as ensure_array_like } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function AmbientLogPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let ambientLogs = [
      {
        id: 1,
        timestamp: "2025-10-08 10:45 AM",
        duration: "2:30",
        transcript: "குழந்தை: அம்மா, எனக்கு பசி... பால் கொடு...",
        emotion: "😊",
        confidence: 0.85,
        source: "kitchen",
        keywords: ["பசி", "பால்", "அம்மா"]
      },
      {
        id: 2,
        timestamp: "2025-10-08 10:30 AM",
        duration: "1:45",
        transcript: "பாட்டி: தேவாரம் கேட்க வேண்டும்... இன்று காலை பூஜை...",
        emotion: "😐",
        confidence: 0.78,
        source: "living_room",
        keywords: ["தேவாரம்", "பூஜை", "காலை"]
      },
      {
        id: 3,
        timestamp: "2025-10-08 09:15 AM",
        duration: "3:20",
        transcript: "அம்மா: வீடு சுத்தம் செய்ய வேண்டும்... தரை துடைக்க வேண்டும்...",
        emotion: "😟",
        confidence: 0.92,
        source: "kitchen",
        keywords: ["சுத்தம்", "தரை", "துடைக்க"]
      },
      {
        id: 4,
        timestamp: "2025-10-08 08:00 AM",
        duration: "1:10",
        transcript: "அப்பா: கடைக்கு செல்ல வேண்டும்... பொங்கல் பொருட்கள் வாங்க...",
        emotion: "😐",
        confidence: 0.88,
        source: "bedroom",
        keywords: ["கடை", "பொங்கல்", "பொருட்கள்"]
      }
    ];
    let filteredLogs = ambientLogs;
    let searchQuery = "";
    let selectedSource = "";
    let selectedEmotion = "";
    const taLabels = {
      ambientLog: "சுற்றுப்புற குரல் பதிவு",
      search: "தேடு",
      filterSource: "மூலம் வடிகட்டி",
      filterEmotion: "உணர்வு வடிகட்டி",
      all: "அனைத்தும்",
      kitchen: "சமையலறை",
      livingRoom: "வாழ்க்கை அறை",
      bedroom: "படுக்கை அறை",
      happy: "மகிழ்ச்சி",
      neutral: "சாதாரணம்",
      stressed: "அழுத்தம்",
      startRecording: "பதிவை தொடங்கு",
      duration: "கால அளவு",
      confidence: "நம்பகத்தன்மை",
      keywords: "முக்கிய சொற்கள்",
      noLogs: "சுற்றுப்புற பதிவுகள் இல்லை",
      export: "ஏற்றுமதி",
      realTime: "நேரடி நேரம்",
      liveTranscript: "நேரடி எழுத்துப்படி"
    };
    const sourceColors = {
      kitchen: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      living_room: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      bedroom: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    };
    let currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setInterval(
      () => {
        currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      },
      1e3
    );
    filteredLogs = ambientLogs.filter((log) => {
      const matchesSearch = log.transcript.toLowerCase().includes(searchQuery.toLowerCase()) || log.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSource = !selectedSource;
      const matchesEmotion = !selectedEmotion;
      return matchesSearch && matchesSource && matchesEmotion;
    });
    if (ambientLogs) {
      localStorage.setItem("ambientLogs", JSON.stringify(ambientLogs));
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>🎙️ Ambient Log - Assistant</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:radio", class: "w-8 h-8 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${escape_html(taLabels.ambientLog)}</h1> <p class="text-gray-600 dark:text-gray-400">Continuous ambient voice monitoring</p></div></div> <div class="flex items-center space-x-4"><div class="text-sm text-gray-500 dark:text-gray-400">${escape_html(taLabels.realTime)}: ${escape_html(currentTime)}</div> <button class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-colors shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-down-tray",
      class: "w-4 h-4 mr-2 inline"
    });
    $$renderer2.push(`<!----> ${escape_html(taLabels.export)}</button></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div${attr_class(`w-4 h-4 rounded-full ${"bg-gray-400"}`)}></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${escape_html(taLabels.liveTranscript)}</h3> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <button${attr_class(`px-4 py-2 rounded-lg transition-colors shadow-lg ${"bg-green-500 hover:bg-green-600 text-white"}`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:play",
      class: "w-4 h-4 mr-2 inline"
    });
    $$renderer2.push(`<!----> ${escape_html(taLabels.startRecording)}</button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.search)}</span></label> <input type="text"${attr("value", searchQuery)} placeholder="பதிவுகளை தேடு..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterSource)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedSource,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "kitchen" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.kitchen)}`);
        });
        $$renderer3.option({ value: "living_room" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.livingRoom)}`);
        });
        $$renderer3.option({ value: "bedroom" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.bedroom)}`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterEmotion)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedEmotion,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "😊" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.happy)}`);
        });
        $$renderer3.option({ value: "😐" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.neutral)}`);
        });
        $$renderer3.option({ value: "😟" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.stressed)}`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(filteredLogs);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let log = each_array[index];
      $$renderer2.push(`<div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300"><div class="flex items-start space-x-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg">${escape_html(log.emotion)}</div></div> <div class="flex-1 min-w-0"><div class="flex items-center space-x-3 mb-2"><span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sourceColors[log.source]}`)}>${escape_html(log.source === "kitchen" ? taLabels.kitchen : log.source === "living_room" ? taLabels.livingRoom : taLabels.bedroom)}</span> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">${escape_html((log.confidence * 100).toFixed(0))}% ${escape_html(taLabels.confidence)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(log.timestamp)} • ${escape_html(taLabels.duration)}: ${escape_html(log.duration)}</span></div> <p class="text-gray-900 dark:text-white text-lg leading-relaxed mb-3">${escape_html(log.transcript)}</p> <div class="flex items-center space-x-2 mb-3"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">${escape_html(taLabels.keywords)}:</span> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_1 = ensure_array_like(log.keywords);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let keyword = each_array_1[$$index];
        $$renderer2.push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">${escape_html(keyword)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="flex items-center space-x-4"><button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm font-medium">`);
      Icon($$renderer2, {
        icon: "heroicons:arrow-path-rounded-square",
        class: "w-4 h-4 mr-1 inline"
      });
      $$renderer2.push(`<!----> Replay</button> <button class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 text-sm font-medium">`);
      Icon($$renderer2, {
        icon: "heroicons:document-duplicate",
        class: "w-4 h-4 mr-1 inline"
      });
      $$renderer2.push(`<!----> Copy</button> <button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-sm font-medium">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4 mr-1 inline" });
      $$renderer2.push(`<!----> Delete</button></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (filteredLogs.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:radio",
        class: "w-16 h-16 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape_html(taLabels.noLogs)}</h3> <p class="text-gray-500 dark:text-gray-400">Start ambient recording to capture voice logs!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  AmbientLogPage as default
};
