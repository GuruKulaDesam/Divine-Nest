import { h as head, b as attr_class, a as ensure_array_like, s as stringify } from "./index2.js";
import { o as onDestroy, I as Icon } from "./Icon.js";
import "./runtime.js";
import "./notes.js";
import "./shivo.js";
import { e as escape_html } from "./context.js";
import "clsx";
function AssistantPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let voiceLogs = [];
    const taLabels = {
      startListening: "🎙️ கேட்கத் தொடங்கு",
      voiceAssistant: "குரல் உதவியாளர்"
    };
    onDestroy(() => {
    });
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
    $$renderer2.push(`<!----> ${escape_html(taLabels.startListening)}</button></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 svelte-3y99dv"><div class="mb-8 svelte-3y99dv"><div class="flex space-x-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50 svelte-3y99dv"><button${attr_class(
      `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${stringify(
        "bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white shadow-lg"
      )}`,
      "svelte-3y99dv"
    )}>`);
    Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> Voice</button> <button${attr_class(
      `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${stringify("text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white")}`,
      "svelte-3y99dv"
    )}>`);
    Icon($$renderer2, { icon: "heroicons:cpu-chip", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> AI</button> <button${attr_class(
      `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${stringify("text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white")}`,
      "svelte-3y99dv"
    )}>`);
    Icon($$renderer2, { icon: "heroicons:musical-note", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> Music</button> <button${attr_class(
      `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${stringify("text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white")}`,
      "svelte-3y99dv"
    )}>`);
    Icon($$renderer2, { icon: "heroicons:user-group", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> Agentic</button></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-8 svelte-3y99dv">`);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 svelte-3y99dv"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300 svelte-3y99dv"><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center svelte-3y99dv">`);
      Icon($$renderer2, {
        icon: "heroicons:microphone",
        class: "w-6 h-6 mr-2 text-blue-500"
      });
      $$renderer2.push(`<!----> Voice Recognition</h3> <div class="space-y-4 svelte-3y99dv"><button${attr_class(`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${stringify("")}`, "svelte-3y99dv")}>${escape_html("Start Voice Recognition")}</button> <p class="text-sm text-gray-600 dark:text-gray-400 text-center svelte-3y99dv">${escape_html("Click to start voice recognition")}</p></div></div> <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300 svelte-3y99dv"><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center svelte-3y99dv">`);
      Icon($$renderer2, {
        icon: "heroicons:command-line",
        class: "w-6 h-6 mr-2 text-green-500"
      });
      $$renderer2.push(`<!----> Voice Commands</h3> <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300 svelte-3y99dv"><p class="svelte-3y99dv">• "Add task [task name]" - Create new task</p> <p class="svelte-3y99dv">• "Set reminder [reminder]" - Set reminder</p> <p class="svelte-3y99dv">• "Note [note content]" - Add note</p> <p class="svelte-3y99dv">• "Play music" - Start music</p> <p class="svelte-3y99dv">• "Stop" - Stop current action</p></div></div></div> <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300 svelte-3y99dv"><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center svelte-3y99dv">`);
      Icon($$renderer2, {
        icon: "heroicons:chat-bubble-left-right",
        class: "w-5 h-5 mr-2 text-blue-500"
      });
      $$renderer2.push(`<!----> Recent Voice Logs</h3> <div class="space-y-3 max-h-64 overflow-y-auto svelte-3y99dv"><!--[-->`);
      const each_array = ensure_array_like(voiceLogs.slice(0, 10));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let log = each_array[$$index];
        $$renderer2.push(`<div class="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors svelte-3y99dv"><span class="text-2xl svelte-3y99dv">${escape_html(log.emotion)}</span> <div class="flex-1 svelte-3y99dv"><p class="text-sm text-gray-900 dark:text-white svelte-3y99dv">${escape_html(log.text)}</p> <p class="text-xs text-gray-500 dark:text-gray-400 svelte-3y99dv">${escape_html(log.timestamp)}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (voiceLogs.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-gray-500 dark:text-gray-400 text-center py-4 svelte-3y99dv">No voice logs yet. Start speaking!</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  AssistantPage as default
};
