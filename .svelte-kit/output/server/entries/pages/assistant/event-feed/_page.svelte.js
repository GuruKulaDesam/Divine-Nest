import "clsx";
import { h as head, d as attr, a as ensure_array_like, b as attr_class } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function EventFeedPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let events = [
      {
        id: 1,
        type: "voice_command",
        title: "குரல் கட்டளை: பட்டியல் சேர்",
        description: "புதிய பணி பட்டியலில் சேர்க்கப்பட்டது",
        timestamp: "2025-10-08 10:45 AM",
        source: "Child",
        emotion: "😊",
        category: "task"
      },
      {
        id: 2,
        type: "proximity_trigger",
        title: "அருகாமை தூண்டுதல்: வீடு வருகை",
        description: "குழந்தை வீட்டிற்கு வந்தார் - வணக்கம் செய்யப்பட்டது",
        timestamp: "2025-10-08 10:30 AM",
        source: "BLE_Device",
        emotion: "😊",
        category: "automation"
      },
      {
        id: 3,
        type: "task_completed",
        title: "பணி முடிந்தது: வீடு சுத்தம்",
        description: "வீடு சுத்தம் செய்யும் பணி முடிந்தது",
        timestamp: "2025-10-08 09:15 AM",
        source: "Amma",
        emotion: "😊",
        category: "task"
      },
      {
        id: 4,
        type: "reminder",
        title: "நினைவூட்டல்: தமிழ் பாடம்",
        description: "தமிழ் எழுத்துப்பயிற்சி நேரம்",
        timestamp: "2025-10-08 08:00 AM",
        source: "System",
        emotion: "😐",
        category: "reminder"
      },
      {
        id: 5,
        type: "voice_command",
        title: "குரல் கட்டளை: இசை இயக்கு",
        description: "தேவார இசை இயக்கப்பட்டது",
        timestamp: "2025-10-08 07:30 AM",
        source: "Paati",
        emotion: "😊",
        category: "entertainment"
      }
    ];
    let filteredEvents = events;
    let searchQuery = "";
    let selectedType = "";
    let selectedCategory = "";
    let selectedSource = "";
    const taLabels = {
      eventFeed: "நிகழ்வு ஊட்டம்",
      search: "தேடு",
      filterType: "வகை வடிகட்டி",
      filterCategory: "வகுப்பு வடிகட்டி",
      filterSource: "மூலம் வடிகட்டி",
      all: "அனைத்தும்",
      voiceCommand: "குரல் கட்டளை",
      proximityTrigger: "அருகாமை தூண்டுதல்",
      taskCompleted: "பணி முடிந்தது",
      reminder: "நினைவூட்டல்",
      task: "பணி",
      automation: "தானியங்கு",
      entertainment: "பொழுதுபோக்கு",
      child: "குழந்தை",
      amma: "அம்மா",
      appa: "அப்பா",
      paati: "பாட்டி",
      system: "சிஸ்டம்",
      bleDevice: "புளூடூத் சாதனம்",
      noEvents: "நிகழ்வுகள் இல்லை",
      export: "ஏற்றுமதி",
      realTime: "நேரடி நேரம்"
    };
    const eventIcons = {
      voice_command: "heroicons:microphone",
      proximity_trigger: "heroicons:wifi",
      task_completed: "heroicons:check-circle",
      reminder: "heroicons:bell"
    };
    const categoryColors = {
      task: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      automation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      reminder: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    };
    let currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setInterval(
      () => {
        currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      },
      1e3
    );
    filteredEvents = events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType;
      const matchesCategory = !selectedCategory;
      const matchesSource = !selectedSource;
      return matchesSearch && matchesType && matchesCategory && matchesSource;
    });
    if (events) {
      localStorage.setItem("events", JSON.stringify(events));
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>📡 Event Feed - Assistant</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:rss", class: "w-8 h-8 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${escape_html(taLabels.eventFeed)}</h1> <p class="text-gray-600 dark:text-gray-400">Real-time activity &amp; event logging</p></div></div> <div class="flex items-center space-x-4"><div class="text-sm text-gray-500 dark:text-gray-400">${escape_html(taLabels.realTime)}: ${escape_html(currentTime)}</div> <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-down-tray",
      class: "w-4 h-4 mr-2 inline"
    });
    $$renderer2.push(`<!----> ${escape_html(taLabels.export)}</button></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.search)}</span></label> <input type="text"${attr("value", searchQuery)} placeholder="நிகழ்வுகளை தேடு..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterType)}</span></label> `);
    $$renderer2.select({ value: selectedType, class: "select select-bordered w-full" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`${escape_html(taLabels.all)}`);
      });
      $$renderer3.option({ value: "voice_command" }, ($$renderer4) => {
        $$renderer4.push(`${escape_html(taLabels.voiceCommand)}`);
      });
      $$renderer3.option({ value: "proximity_trigger" }, ($$renderer4) => {
        $$renderer4.push(`${escape_html(taLabels.proximityTrigger)}`);
      });
      $$renderer3.option({ value: "task_completed" }, ($$renderer4) => {
        $$renderer4.push(`${escape_html(taLabels.taskCompleted)}`);
      });
      $$renderer3.option({ value: "reminder" }, ($$renderer4) => {
        $$renderer4.push(`${escape_html(taLabels.reminder)}`);
      });
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterCategory)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "task" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.task)}`);
        });
        $$renderer3.option({ value: "automation" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.automation)}`);
        });
        $$renderer3.option({ value: "entertainment" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.entertainment)}`);
        });
        $$renderer3.option({ value: "reminder" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.reminder)}`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterSource)}</span></label> `);
    $$renderer2.select(
      {
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
        $$renderer3.option({ value: "System" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.system)}`);
        });
        $$renderer3.option({ value: "BLE_Device" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.bleDevice)}`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(filteredEvents);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let event = each_array[index];
      $$renderer2.push(`<div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300"><div class="flex items-start space-x-4"><div class="flex-shrink-0"><div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">`);
      Icon($$renderer2, { icon: eventIcons[event.type], class: "w-6 h-6 text-white" });
      $$renderer2.push(`<!----></div></div> <div class="flex-shrink-0 w-px bg-gradient-to-b from-purple-500 to-pink-500 h-full opacity-50"></div> <div class="flex-1 min-w-0"><div class="flex items-center space-x-3 mb-2"><span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[event.category]}`)}>${escape_html(event.category === "task" ? taLabels.task : event.category === "automation" ? taLabels.automation : event.category === "entertainment" ? taLabels.entertainment : taLabels.reminder)}</span> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">${escape_html(event.source === "Child" ? taLabels.child : event.source === "Amma" ? taLabels.amma : event.source === "Appa" ? taLabels.appa : event.source === "Paati" ? taLabels.paati : event.source === "System" ? taLabels.system : taLabels.bleDevice)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(event.timestamp)}</span></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${escape_html(event.title)}</h3> <p class="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">${escape_html(event.description)}</p> `);
      if (event.emotion) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center space-x-2"><span class="text-2xl">${escape_html(event.emotion)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">Emotion detected</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (filteredEvents.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:rss",
        class: "w-16 h-16 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape_html(taLabels.noEvents)}</h3> <p class="text-gray-500 dark:text-gray-400">Events will appear here as they happen!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer) {
  EventFeedPage($$renderer);
}
export {
  _page as default
};
