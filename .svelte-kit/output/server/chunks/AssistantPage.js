import { h as head, b as attr_class, a as ensure_array_like, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./runtime.js";
import { e as escape_html } from "./context.js";
function AssistantPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let voiceLogs = [];
    let tasks = [];
    const taLabels = {
      voiceLog: "குரல் பதிவு",
      taskBoard: "பட்டியல்",
      eventFeed: "நிகழ்வுகள்",
      startListening: "🎙️ கேட்கத் தொடங்கு",
      voiceAssistant: "குரல் உதவியாளர்"
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>🤖 Assistant - Voice-First Tamil Assistant</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 svelte-3y99dv"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10 svelte-3y99dv"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 svelte-3y99dv"><div class="flex items-center justify-between svelte-3y99dv"><div class="flex items-center space-x-4 svelte-3y99dv"><div class="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg svelte-3y99dv">`);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-8 h-8 text-white"
    });
    $$renderer2.push(`<!----></div> <div class="svelte-3y99dv"><h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent svelte-3y99dv">${escape_html(taLabels.voiceAssistant)}</h1> <p class="text-gray-600 dark:text-gray-400 svelte-3y99dv">Voice-first Tamil assistant for your family</p></div></div> <div class="flex items-center space-x-4 svelte-3y99dv"><button${attr_class(
      `px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${stringify("bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white")}`,
      "svelte-3y99dv"
    )}>`);
    Icon($$renderer2, {
      icon: "heroicons:microphone",
      class: "w-5 h-5 mr-2 inline"
    });
    $$renderer2.push(`<!----> ${escape_html(taLabels.startListening)}</button></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 svelte-3y99dv">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 svelte-3y99dv"><a href="/assistant/voice-log" class="group svelte-3y99dv"><div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 svelte-3y99dv"><div class="flex items-center space-x-4 svelte-3y99dv"><div class="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl svelte-3y99dv">`);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-6 h-6 text-white"
    });
    $$renderer2.push(`<!----></div> <div class="svelte-3y99dv"><h3 class="text-lg font-semibold text-gray-900 dark:text-white svelte-3y99dv">${escape_html(taLabels.voiceLog)}</h3> <p class="text-gray-600 dark:text-gray-400 svelte-3y99dv">Voice interactions &amp; logs</p></div></div></div></a> <a href="/assistant/task-board" class="group svelte-3y99dv"><div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 svelte-3y99dv"><div class="flex items-center space-x-4 svelte-3y99dv"><div class="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl svelte-3y99dv">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-6 h-6 text-white"
    });
    $$renderer2.push(`<!----></div> <div class="svelte-3y99dv"><h3 class="text-lg font-semibold text-gray-900 dark:text-white svelte-3y99dv">${escape_html(taLabels.taskBoard)}</h3> <p class="text-gray-600 dark:text-gray-400 svelte-3y99dv">Family tasks &amp; checklists</p></div></div></div></a> <a href="/assistant/event-feed" class="group svelte-3y99dv"><div class="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 svelte-3y99dv"><div class="flex items-center space-x-4 svelte-3y99dv"><div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl svelte-3y99dv">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div class="svelte-3y99dv"><h3 class="text-lg font-semibold text-gray-900 dark:text-white svelte-3y99dv">${escape_html(taLabels.eventFeed)}</h3> <p class="text-gray-600 dark:text-gray-400 svelte-3y99dv">Activity &amp; event logs</p></div></div></div></a></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 svelte-3y99dv"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 svelte-3y99dv"><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center svelte-3y99dv">`);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-5 h-5 mr-2 text-blue-500"
    });
    $$renderer2.push(`<!----> Recent Voice Logs</h3> <div class="space-y-3 max-h-64 overflow-y-auto svelte-3y99dv"><!--[-->`);
    const each_array = ensure_array_like(voiceLogs.slice(0, 5));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let log = each_array[$$index];
      $$renderer2.push(`<div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg svelte-3y99dv"><span class="text-2xl svelte-3y99dv">${escape_html(log.emotion)}</span> <div class="flex-1 svelte-3y99dv"><p class="text-sm text-gray-900 dark:text-white svelte-3y99dv">${escape_html(log.text)}</p> <p class="text-xs text-gray-500 dark:text-gray-400 svelte-3y99dv">${escape_html(log.timestamp)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (voiceLogs.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-gray-500 dark:text-gray-400 text-center py-4 svelte-3y99dv">No voice logs yet. Start speaking!</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 svelte-3y99dv"><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center svelte-3y99dv">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-5 h-5 mr-2 text-green-500"
    });
    $$renderer2.push(`<!----> Active Tasks</h3> <div class="space-y-3 max-h-64 overflow-y-auto svelte-3y99dv"><!--[-->`);
    const each_array_1 = ensure_array_like(tasks.filter((t) => t.status === "pending").slice(0, 5));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let task = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg svelte-3y99dv"><input type="checkbox" class="checkbox checkbox-primary svelte-3y99dv"/> <div class="flex-1 svelte-3y99dv"><p class="text-sm text-gray-900 dark:text-white svelte-3y99dv">${escape_html(task.title)}</p> <p class="text-xs text-gray-500 dark:text-gray-400 svelte-3y99dv">${escape_html(task.timestamp)}</p></div> <span class="text-sm svelte-3y99dv">${escape_html(task.emotionTag)}</span></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (tasks.filter((t) => t.status === "pending").length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-gray-500 dark:text-gray-400 text-center py-4 svelte-3y99dv">No active tasks. Create one by voice!</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 svelte-3y99dv"><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center svelte-3y99dv">`);
    Icon($$renderer2, {
      icon: "heroicons:wifi",
      class: "w-5 h-5 mr-2 text-purple-500"
    });
    $$renderer2.push(`<!----> Proximity Triggers (Demo)</h3> <div class="flex flex-wrap gap-4 svelte-3y99dv"><button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors svelte-3y99dv">Kitchen Zone</button> <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors svelte-3y99dv">Study Zone</button> <button class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors svelte-3y99dv">Living Room</button></div></div></div></div>`);
  });
}
export {
  AssistantPage as default
};
