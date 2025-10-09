import { a as ensure_array_like, b as attr_class, s as stringify, d as attr } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function HealthJournalPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let newEntry = "";
    let selectedMood = "happy";
    const moodOptions = [
      {
        value: "happy",
        label: "Happy",
        icon: "heroicons:face-smile",
        color: "text-yellow-500"
      },
      {
        value: "sad",
        label: "Sad",
        icon: "heroicons:face-frown",
        color: "text-blue-500"
      },
      {
        value: "anxious",
        label: "Anxious",
        icon: "heroicons:exclamation-triangle",
        color: "text-orange-500"
      },
      {
        value: "calm",
        label: "Calm",
        icon: "heroicons:cloud",
        color: "text-green-500"
      },
      {
        value: "energetic",
        label: "Energetic",
        icon: "heroicons:bolt",
        color: "text-purple-500"
      }
    ];
    $$renderer2.push(`<div class="p-6"><div class="flex items-center space-x-3 mb-6">`);
    Icon($$renderer2, {
      icon: "heroicons:pencil-square",
      class: "w-8 h-8 text-teal-500"
    });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Health Journal</h1></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">How are you feeling today?</h2> <div class="mb-4"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Mood</label> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(moodOptions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let mood = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${stringify(selectedMood === mood.value ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600")}`)}>`);
      Icon($$renderer2, {
        icon: mood.icon,
        class: `w-6 h-6 ${stringify(mood.color)} mb-1`
      });
      $$renderer2.push(`<!----> <span class="text-xs text-gray-600 dark:text-gray-400">${escape_html(mood.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-4"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Journal Entry</label> <textarea placeholder="Write about your day, thoughts, or feelings..." class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" rows="4">`);
    const $$body = escape_html(newEntry);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <button${attr("disabled", !newEntry.trim(), true)} class="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition-colors">Add Entry</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  HealthJournalPage as default
};
