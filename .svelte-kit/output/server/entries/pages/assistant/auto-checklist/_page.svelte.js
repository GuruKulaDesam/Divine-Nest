import "clsx";
import { h as head, a as ensure_array_like, b as attr_class, f as attr_style, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function AutoChecklistPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let checklists = [
      {
        id: 1,
        title: "காலை ரூட்டின்",
        description: "காலை நேர செயல்கள்",
        trigger: "morning",
        items: [
          {
            id: 1,
            text: "விழித்தெழு",
            completed: true,
            autoComplete: true
          },
          {
            id: 2,
            text: "பற்களை துலக்கு",
            completed: true,
            autoComplete: false
          },
          {
            id: 3,
            text: "முகம் கழுவு",
            completed: false,
            autoComplete: false
          },
          {
            id: 4,
            text: "உணவு சாப்பிடு",
            completed: false,
            autoComplete: false
          },
          {
            id: 5,
            text: "பள்ளிக்கு செல்",
            completed: false,
            autoComplete: false
          }
        ],
        progress: 40,
        active: true
      },
      {
        id: 2,
        title: "மாலை ரூட்டின்",
        description: "மாலை நேர செயல்கள்",
        trigger: "evening",
        items: [
          {
            id: 1,
            text: "வீடு திரும்பு",
            completed: false,
            autoComplete: true
          },
          {
            id: 2,
            text: "கை கால்களை கழுவு",
            completed: false,
            autoComplete: false
          },
          {
            id: 3,
            text: "வீடு பாடம் செய்",
            completed: false,
            autoComplete: false
          },
          {
            id: 4,
            text: "இரவு உணவு சாப்பிடு",
            completed: false,
            autoComplete: false
          },
          {
            id: 5,
            text: "தூங்க செல்",
            completed: false,
            autoComplete: false
          }
        ],
        progress: 0,
        active: false
      },
      {
        id: 3,
        title: "சமையல் பொருட்கள்",
        description: "பொங்கல் சமையலுக்கு தேவையான பொருட்கள்",
        trigger: "shopping",
        items: [
          {
            id: 1,
            text: "அரிசி வாங்கு",
            completed: true,
            autoComplete: false
          },
          {
            id: 2,
            text: "பால் வாங்கு",
            completed: false,
            autoComplete: false
          },
          {
            id: 3,
            text: "வெல்லம் வாங்கு",
            completed: false,
            autoComplete: false
          },
          {
            id: 4,
            text: "கொட்டை வாங்கு",
            completed: false,
            autoComplete: false
          },
          {
            id: 5,
            text: "தேங்காய் வாங்கு",
            completed: false,
            autoComplete: false
          }
        ],
        progress: 20,
        active: true
      }
    ];
    let filteredChecklists = checklists;
    let searchQuery = "";
    let selectedTrigger = "";
    const taLabels = {
      autoChecklist: "தானியங்கு சரிபார்ப்பு பட்டியல்",
      addChecklist: "பட்டியல் சேர்",
      search: "தேடு",
      filterTrigger: "தூண்டுதல் வடிகட்டி",
      all: "அனைத்தும்",
      morning: "காலை",
      evening: "மாலை",
      shopping: "கடை",
      custom: "தனிப்பயன்",
      noChecklists: "பட்டியல்கள் இல்லை",
      progress: "முன்னேற்றம்",
      active: "செயலில்",
      inactive: "செயலற்ற"
    };
    const triggerColors = {
      morning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      evening: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      shopping: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      custom: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    };
    filteredChecklists = checklists.filter((checklist) => {
      const matchesSearch = checklist.title.toLowerCase().includes(searchQuery.toLowerCase()) || checklist.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTrigger = !selectedTrigger;
      return matchesSearch && matchesTrigger;
    });
    if (checklists) {
      localStorage.setItem("checklists", JSON.stringify(checklists));
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>✅ Auto Checklist - Assistant</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100 dark:from-gray-900 dark:via-orange-900 dark:to-red-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-check",
      class: "w-8 h-8 text-white"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">${escape_html(taLabels.autoChecklist)}</h1> <p class="text-gray-600 dark:text-gray-400">Context-aware automated checklists</p></div></div> <button class="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-colors shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 mr-2 inline" });
    $$renderer2.push(`<!----> ${escape_html(taLabels.addChecklist)}</button></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.search)}</span></label> <input type="text"${attr("value", searchQuery)} placeholder="பட்டியல்களை தேடு..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterTrigger)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedTrigger,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "morning" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.morning)}`);
        });
        $$renderer3.option({ value: "evening" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.evening)}`);
        });
        $$renderer3.option({ value: "shopping" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.shopping)}`);
        });
        $$renderer3.option({ value: "custom" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.custom)}`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!--[-->`);
    const each_array = ensure_array_like(filteredChecklists);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let checklist = each_array[index];
      $$renderer2.push(`<div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300"><div class="flex items-start justify-between mb-4"><div class="flex-1"><div class="flex items-center space-x-3 mb-2"><h3 class="text-xl font-semibold text-gray-900 dark:text-white">${escape_html(checklist.title)}</h3> <span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${triggerColors[checklist.trigger]}`)}>${escape_html(checklist.trigger === "morning" ? taLabels.morning : checklist.trigger === "evening" ? taLabels.evening : checklist.trigger === "shopping" ? taLabels.shopping : taLabels.custom)}</span> <span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${checklist.active ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`)}>${escape_html(checklist.active ? taLabels.active : taLabels.inactive)}</span></div> <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">${escape_html(checklist.description)}</p></div></div> <div class="mb-4"><div class="flex items-center justify-between mb-2"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">${escape_html(taLabels.progress)}</span> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${escape_html(checklist.progress)}%</span></div> <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"${attr_style(`width: ${stringify(checklist.progress)}%`)}></div></div></div> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(checklist.items);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        $$renderer2.push(`<div class="flex items-center space-x-3"><input type="checkbox"${attr("checked", item.completed, true)} class="checkbox checkbox-primary"${attr("disabled", item.autoComplete, true)}/> <span${attr_class(`flex-1 text-sm ${item.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`)}>${escape_html(item.text)} `);
        if (item.autoComplete) {
          $$renderer2.push("<!--[-->");
          Icon($$renderer2, {
            icon: "heroicons:bolt",
            class: "w-4 h-4 inline ml-2 text-yellow-500",
            title: "Auto-completed"
          });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"><div class="text-sm text-gray-500 dark:text-gray-400">${escape_html(checklist.items.filter((i) => i.completed).length)} / ${escape_html(checklist.items.length)} completed</div> <button class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors">Edit</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredChecklists.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:clipboard-document-check",
        class: "w-16 h-16 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape_html(taLabels.noChecklists)}</h3> <p class="text-gray-500 dark:text-gray-400">Create automated checklists for daily routines!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  AutoChecklistPage($$renderer);
}
export {
  _page as default
};
