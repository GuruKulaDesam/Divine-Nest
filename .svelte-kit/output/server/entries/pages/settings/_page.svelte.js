import "clsx";
import { c as store_get, b as attr_class, u as unsubscribe_stores, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { a as $format } from "../../../chunks/runtime.js";
import "../../../chunks/theme.js";
import "../../../chunks/background.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { a as attr } from "../../../chunks/attributes.js";
function SettingsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let aiSettings = {
      voice: "female",
      // 'male', 'female', 'neutral'
      wakeWords: ["சிவோ", "shivo", "hey shivo", "ai", "assistant"],
      autoWake: false,
      language: "ta-IN",
      responseStyle: "helpful",
      // 'helpful', 'concise', 'detailed'
      emotionDetection: true
    };
    ({
      role: store_get($$store_subs ??= {}, "$_", $format)("users.admin")
    });
    aiSettings.wakeWordsString = aiSettings.wakeWords.join(", ");
    aiSettings.wakeWords = aiSettings.wakeWordsString ? aiSettings.wakeWordsString.split(",").map((w) => w.trim()) : [];
    $$renderer2.push(`<main class="settings-container svelte-lmts4u"><div class="max-w-6xl mx-auto p-6"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.title"))}</h1> <p class="text-gray-600 dark:text-gray-400">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.subtitle"))}</p></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"><nav class="space-y-2"><button${attr_class(`w-full text-left px-4 py-3 rounded-lg transition-colors ${stringify(
      "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
    )}`)}><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:cpu-chip", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.ai_assistant"))}</span></div></button> <button${attr_class(`w-full text-left px-4 py-3 rounded-lg transition-colors ${stringify("text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`)}><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:user", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.profile"))}</span></div></button> <button${attr_class(`w-full text-left px-4 py-3 rounded-lg transition-colors ${stringify("text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`)}><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:bell", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.notifications"))}</span></div></button> <button${attr_class(`w-full text-left px-4 py-3 rounded-lg transition-colors ${stringify("text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`)}><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:shield-check", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.security"))}</span></div></button> <button${attr_class(`w-full text-left px-4 py-3 rounded-lg transition-colors ${stringify("text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`)}><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:computer-desktop", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.display"))}</span></div></button></nav></div></div> <div class="lg:col-span-3">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center space-x-3 mb-6">`);
      Icon($$renderer2, { icon: "heroicons:cpu-chip", class: "w-6 h-6 text-blue-600" });
      $$renderer2.push(`<!----> <h2 class="text-xl font-semibold text-gray-900 dark:text-white">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.ai_assistant"))}</h2></div> <div class="space-y-6"><div class="border-b border-gray-200 dark:border-gray-700 pb-6"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.voice_settings"))}</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="voice-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.voice"))}</label> `);
      $$renderer2.select(
        {
          id: "voice-select",
          value: aiSettings.voice,
          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "female" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.female"))}`);
          });
          $$renderer3.option({ value: "male" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.male"))}`);
          });
          $$renderer3.option({ value: "neutral" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.neutral"))}`);
          });
        }
      );
      $$renderer2.push(`</div> <div><label for="language-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.language"))}</label> `);
      $$renderer2.select(
        {
          id: "language-select",
          value: aiSettings.language,
          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "ta-IN" }, ($$renderer4) => {
            $$renderer4.push(`தமிழ் (Tamil)`);
          });
          $$renderer3.option({ value: "en-IN" }, ($$renderer4) => {
            $$renderer4.push(`English (India)`);
          });
          $$renderer3.option({ value: "hi-IN" }, ($$renderer4) => {
            $$renderer4.push(`हिंदी (Hindi)`);
          });
        }
      );
      $$renderer2.push(`</div></div></div> <div class="border-b border-gray-200 dark:border-gray-700 pb-6"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.wake_words"))}</h3> <div class="space-y-4"><div><label for="wake-words-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.wake_words_list"))}</label> <input id="wake-words-input" type="text"${attr("value", aiSettings.wakeWordsString)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("settings.wake_words_placeholder"))} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"/> <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.wake_words_help"))}</p></div> <div class="flex items-center space-x-3"><input type="checkbox" id="autoWake"${attr("checked", aiSettings.autoWake, true)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="autoWake" class="text-sm font-medium text-gray-700 dark:text-gray-300">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.auto_wake"))}</label></div></div></div> <div><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.response_settings"))}</h3> <div class="space-y-4"><div><label for="response-style-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.response_style"))}</label> `);
      $$renderer2.select(
        {
          id: "response-style-select",
          value: aiSettings.responseStyle,
          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "helpful" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.helpful"))}`);
          });
          $$renderer3.option({ value: "concise" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.concise"))}`);
          });
          $$renderer3.option({ value: "detailed" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.detailed"))}`);
          });
        }
      );
      $$renderer2.push(`</div> <div class="flex items-center space-x-3"><input type="checkbox" id="emotionDetection"${attr("checked", aiSettings.emotionDetection, true)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="emotionDetection" class="text-sm font-medium text-gray-700 dark:text-gray-300">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.emotion_detection"))}</label></div></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mt-8 flex flex-wrap gap-4 justify-center"><button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">`);
    Icon($$renderer2, { icon: "heroicons:check", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.save_settings"))}</button> <button class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium">`);
    Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-5 h-5 inline mr-2" });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.reset_settings"))}</button> <button class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-down-tray",
      class: "w-5 h-5 inline mr-2"
    });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.export_settings"))}</button> <button class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-up-tray",
      class: "w-5 h-5 inline mr-2"
    });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.import_settings"))}</button></div></div></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  SettingsPage($$renderer);
}
export {
  _page as default
};
