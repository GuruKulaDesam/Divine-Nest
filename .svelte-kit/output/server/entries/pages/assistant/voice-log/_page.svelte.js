import "clsx";
import { h as head, a as ensure_array_like } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function VoiceLogPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let voiceLogs = [
      {
        text: "பட்டியல்: தமிழ் எழுத்துப்பயிற்சி செய்ய வேண்டும்",
        timestamp: "2025-10-08 10:30 AM",
        emotion: "😊",
        source: "Child",
        language: "ta"
      },
      {
        text: "குறிப்பு: பொங்கல் சமையல் பொருட்கள் வாங்க வேண்டும்",
        timestamp: "2025-10-08 09:15 AM",
        emotion: "😐",
        source: "Amma",
        language: "ta"
      },
      {
        text: "பாடல்: தேவாரம் கேட்க வேண்டும்",
        timestamp: "2025-10-08 08:45 AM",
        emotion: "😊",
        source: "Paati",
        language: "ta"
      },
      {
        text: "முடிந்தது: வீடு சுத்தம் செய்தேன்",
        timestamp: "2025-10-08 08:00 AM",
        emotion: "😊",
        source: "Amma",
        language: "ta"
      }
    ];
    let filteredLogs = voiceLogs;
    let searchQuery = "";
    let selectedEmotion = "";
    let selectedSource = "";
    const taLabels = {
      voiceLog: "குரல் பதிவு",
      search: "தேடு",
      filterEmotion: "உணர்வு வடிகட்டி",
      filterSource: "மூலம் வடிகட்டி",
      all: "அனைத்தும்",
      happy: "மகிழ்ச்சி",
      neutral: "சாதாரணம்",
      stressed: "அழுத்தம்",
      child: "குழந்தை",
      amma: "அம்மா",
      appa: "அப்பா",
      paati: "பாட்டி",
      noLogs: "குரல் பதிவுகள் இல்லை"
    };
    filteredLogs = voiceLogs.filter((log) => {
      const matchesSearch = log.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEmotion = !selectedEmotion;
      const matchesSource = !selectedSource;
      return matchesSearch && matchesEmotion && matchesSource;
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>🎙️ Voice Log - Assistant</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-8 h-8 text-white"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${escape_html(taLabels.voiceLog)}</h1> <p class="text-gray-600 dark:text-gray-400">Voice interactions &amp; emotional logs</p></div></div> <button class="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-down-tray",
      class: "w-4 h-4 mr-2 inline"
    });
    $$renderer2.push(`<!----> Export</button></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label for="voice-log-search" class="label"><span class="label-text">${escape_html(taLabels.search)}</span></label> <input id="voice-log-search" type="text"${attr("value", searchQuery)} placeholder="குரல் பதிவுகளை தேடு..." class="input input-bordered w-full"/></div> <div class="form-control"><label for="emotion-filter" class="label"><span class="label-text">${escape_html(taLabels.filterEmotion)}</span></label> `);
    $$renderer2.select(
      {
        id: "emotion-filter",
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
    $$renderer2.push(`</div> <div class="form-control"><label for="source-filter" class="label"><span class="label-text">${escape_html(taLabels.filterSource)}</span></label> `);
    $$renderer2.select(
      {
        id: "source-filter",
        value: selectedSource,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "Child" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.child)}`);
        });
        $$renderer3.option({ value: "Amma" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.amma)}`);
        });
        $$renderer3.option({ value: "Appa" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.appa)}`);
        });
        $$renderer3.option({ value: "Paati" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.paati)}`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(filteredLogs);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let log = each_array[index];
      $$renderer2.push(`<div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300"><div class="flex items-start space-x-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl shadow-lg">${escape_html(log.emotion)}</div></div> <div class="flex-1 min-w-0"><div class="flex items-center space-x-3 mb-2"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">${escape_html(log.source)}</span> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">${escape_html(log.language === "ta" ? "தமிழ்" : "English")}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(log.timestamp)}</span></div> <p class="text-gray-900 dark:text-white text-lg leading-relaxed">${escape_html(log.text)}</p> <div class="flex items-center space-x-4 mt-4"><button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm font-medium">`);
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
        icon: "heroicons:chat-bubble-left-right",
        class: "w-16 h-16 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape_html(taLabels.noLogs)}</h3> <p class="text-gray-500 dark:text-gray-400">Start using voice commands to create logs!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer) {
  VoiceLogPage($$renderer);
}
export {
  _page as default
};
