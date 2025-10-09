import { a as ensure_array_like, b as attr_class, s as stringify, c as store_get, u as unsubscribe_stores, d as attr, f as slot } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import { $ as $locale, r as registerLocaleLoader, i as init, w as waitLocale } from "../../chunks/runtime.js";
import { I as Icon } from "../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const languages = {
  en: {
    name: "English",
    flag: "🇺🇸",
    code: "en"
  },
  id: {
    name: "Indonesia",
    flag: "🇮🇩",
    code: "id"
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    code: "es"
  },
  ko: {
    name: "한국어",
    flag: "🇰🇷",
    code: "ko"
  }
};
const defaultLanguage = "en";
function getInitialLanguage() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("language");
    if (saved && languages[saved]) {
      return saved;
    }
    const browserLang = navigator.language.split("-")[0];
    if (languages[browserLang]) {
      return browserLang;
    }
  }
  return defaultLanguage;
}
const currentLanguage = writable(getInitialLanguage());
if (typeof window !== "undefined") {
  currentLanguage.subscribe((lang) => {
    localStorage.setItem("language", lang);
    $locale.set(lang);
  });
}
registerLocaleLoader("en", () => import("../../chunks/en.js"));
registerLocaleLoader("id", () => import("../../chunks/id.js"));
registerLocaleLoader("es", () => import("../../chunks/es.js"));
registerLocaleLoader("ko", () => import("../../chunks/ko.js"));
let i18nReady = false;
new Promise(async (resolve) => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("i18n initialization timeout")), 5e3);
    });
    await Promise.race([
      (async () => {
        await init({
          fallbackLocale: "en",
          initialLocale: getInitialLanguage()
        });
        await waitLocale();
      })(),
      timeoutPromise
    ]);
    i18nReady = true;
    resolve(true);
  } catch (error) {
    console.warn("i18n initialization failed or timed out:", error);
    i18nReady = true;
    resolve(true);
  }
});
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function LeftTileBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const mainTiles = [
      {
        id: "dashboard",
        label: "Home",
        icon: "heroicons:home",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-500/50",
        textColor: "text-blue-600 dark:text-blue-400",
        description: "Dashboard & Overview",
        subTiles: [
          { label: "Dashboard", path: "/", icon: "heroicons:home" },
          {
            label: "Household",
            path: "/household",
            icon: "heroicons:squares-2x2"
          },
          {
            label: "Family Members",
            path: "/members",
            icon: "heroicons:users"
          },
          {
            label: "Calendar",
            path: "/family-calendar-modern",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Notes",
            path: "/family-notes-modern",
            icon: "heroicons:document-text"
          },
          {
            label: "Reminders",
            path: "/reminders",
            icon: "heroicons:bell-alert"
          }
        ]
      },
      {
        id: "divinity",
        label: "Divinity",
        icon: "heroicons:sparkles",
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-500/50",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "Spiritual & Religious",
        subTiles: [
          {
            label: "Tamil Panchangam",
            path: "/tamil-panchangam",
            icon: "heroicons:sun"
          },
          {
            label: "Rituals",
            path: "/rituals",
            icon: "heroicons:sparkles"
          },
          {
            label: "Temple Visits",
            path: "/temple",
            icon: "heroicons:building-storefront"
          },
          {
            label: "Festival Calendar",
            path: "/festival-calendar",
            icon: "heroicons:calendar"
          },
          {
            label: "Mantras",
            path: "/mantras",
            icon: "heroicons:musical-note"
          }
        ]
      },
      {
        id: "contacts",
        label: "Contacts",
        icon: "heroicons:phone",
        color: "from-green-500 to-green-600",
        borderColor: "border-green-500/50",
        textColor: "text-green-600 dark:text-green-400",
        description: "People & Directory",
        subTiles: [
          {
            label: "Personal Contacts",
            path: "/contacts",
            icon: "heroicons:phone"
          },
          {
            label: "Emergency Contacts",
            path: "/emergency",
            icon: "heroicons:exclamation-triangle"
          },
          {
            label: "Vendors & Services",
            path: "/vendors",
            icon: "heroicons:wrench"
          },
          {
            label: "Service Directory",
            path: "/directory",
            icon: "heroicons:building-storefront"
          }
        ]
      },
      {
        id: "food",
        label: "Food",
        icon: "heroicons:cake",
        color: "from-orange-400 to-orange-500",
        borderColor: "border-orange-400/50",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "Meals & Recipes",
        subTiles: [
          {
            label: "Meals & Planning",
            path: "/meals",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Recipes",
            path: "/recipes",
            icon: "heroicons:book-open"
          },
          {
            label: "Grocery & Pantry",
            path: "/grocery",
            icon: "heroicons:shopping-cart"
          },
          {
            label: "Pantry Management",
            path: "/pantry",
            icon: "heroicons:archive-box"
          },
          {
            label: "Kitchen Dashboard",
            path: "/kitchen",
            icon: "heroicons:home"
          },
          {
            label: "Fresh Items",
            path: "/kitchen/fresh",
            icon: "heroicons:leaf"
          },
          {
            label: "Kids Meals",
            path: "/kitchen/kids",
            icon: "heroicons:user-group"
          },
          {
            label: "Cleaning Schedule",
            path: "/kitchen/cleaning",
            icon: "heroicons:sparkles"
          }
        ]
      },
      {
        id: "education",
        label: "Learn",
        icon: "heroicons:academic-cap",
        color: "from-indigo-500 to-indigo-600",
        borderColor: "border-indigo-500/50",
        textColor: "text-indigo-600 dark:text-indigo-400",
        description: "Education & Study",
        subTiles: [
          {
            label: "Education Dashboard",
            path: "/education",
            icon: "heroicons:academic-cap"
          },
          {
            label: "Students",
            path: "/education/students",
            icon: "heroicons:users"
          },
          {
            label: "Curriculum",
            path: "/education/curriculum",
            icon: "heroicons:book-open"
          },
          {
            label: "Planner",
            path: "/education/planner",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Quiz",
            path: "/education/quiz",
            icon: "heroicons:question-mark-circle"
          },
          {
            label: "Assessment",
            path: "/education/assessment",
            icon: "heroicons:clipboard-document-check"
          },
          {
            label: "Courses",
            path: "/education/courses",
            icon: "heroicons:academic-cap"
          },
          {
            label: "Mentors",
            path: "/education/mentors",
            icon: "heroicons:user-group"
          },
          {
            label: "Achievements",
            path: "/education/achievements",
            icon: "heroicons:trophy"
          },
          {
            label: "Family Library",
            path: "/library",
            icon: "heroicons:book-open"
          },
          {
            label: "Studies & Exams",
            path: "/studies",
            icon: "heroicons:pencil"
          },
          {
            label: "Learning Goals",
            path: "/learning-goals",
            icon: "heroicons:light-bulb"
          }
        ]
      },
      {
        id: "assistant",
        label: "Assistant",
        icon: "heroicons:chat-bubble-left-right",
        color: "from-purple-500 to-purple-600",
        borderColor: "border-purple-500/50",
        textColor: "text-purple-600 dark:text-purple-400",
        description: "AI & Automation",
        subTiles: [
          {
            label: "Assistant Dashboard",
            path: "/assistant",
            icon: "heroicons:chat-bubble-left-right"
          },
          {
            label: "Voice Log",
            path: "/assistant/voice-log",
            icon: "heroicons:microphone"
          },
          {
            label: "Task Board",
            path: "/assistant/task-board",
            icon: "heroicons:clipboard-document-list"
          },
          {
            label: "Event Feed",
            path: "/assistant/event-feed",
            icon: "heroicons:rss"
          },
          {
            label: "Auto Checklist",
            path: "/assistant/auto-checklist",
            icon: "heroicons:check-circle"
          },
          {
            label: "Ambient Log",
            path: "/assistant/ambient-log",
            icon: "heroicons:eye"
          }
        ]
      },
      {
        id: "shivo-ai",
        label: "Shivo AI",
        icon: "heroicons:sparkles",
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-500/50",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "AI Assistant",
        subTiles: [
          {
            label: "AI Assistant",
            path: "/shivo-ai",
            icon: "heroicons:sparkles"
          }
        ]
      },
      {
        id: "shivo-music",
        label: "Shivo Music",
        icon: "heroicons:musical-note",
        color: "from-pink-500 to-pink-600",
        borderColor: "border-pink-500/50",
        textColor: "text-pink-600 dark:text-pink-400",
        description: "Music Companion",
        subTiles: [
          {
            label: "Music Companion",
            path: "/shivo-music",
            icon: "heroicons:musical-note"
          }
        ]
      },
      {
        id: "shivo-agentic",
        label: "Shivo Agentic",
        icon: "heroicons:robot",
        color: "from-violet-500 to-violet-600",
        borderColor: "border-violet-500/50",
        textColor: "text-violet-600 dark:text-violet-400",
        description: "Agentic AI Assistant",
        subTiles: [
          {
            label: "Agentic AI",
            path: "/shivo-agentic",
            icon: "heroicons:robot"
          }
        ]
      },
      {
        id: "health",
        label: "Health",
        icon: "heroicons:heart",
        color: "from-pink-500 to-pink-600",
        borderColor: "border-pink-500/50",
        textColor: "text-pink-600 dark:text-pink-400",
        description: "Wellness & Fitness",
        subTiles: [
          {
            label: "Wellness Dashboard",
            path: "/wellness",
            icon: "heroicons:heart"
          },
          {
            label: "Health Tracking",
            path: "/health",
            icon: "heroicons:shield-check"
          },
          {
            label: "Yoga & Exercise",
            path: "/yoga",
            icon: "heroicons:user"
          },
          {
            label: "Health Journal",
            path: "/journal",
            icon: "heroicons:pencil-square"
          },
          {
            label: "Hobbies & Activities",
            path: "/hobbies-activities",
            icon: "heroicons:puzzle-piece"
          }
        ]
      },
      {
        id: "finances",
        label: "Finances",
        icon: "heroicons:currency-rupee",
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-500/50",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "Money & Budget",
        subTiles: [
          {
            label: "Finance Dashboard",
            path: "/finances",
            icon: "heroicons:currency-rupee"
          },
          {
            label: "Recharges",
            path: "/recharges",
            icon: "heroicons:device-phone-mobile"
          },
          {
            label: "Expenses",
            path: "/expenses",
            icon: "heroicons:credit-card"
          },
          {
            label: "Budget",
            path: "/budget",
            icon: "heroicons:calculator"
          },
          {
            label: "Insurance",
            path: "/insurance",
            icon: "heroicons:shield-check"
          },
          {
            label: "Investments",
            path: "/investments",
            icon: "heroicons:chart-line"
          }
        ]
      },
      {
        id: "assets",
        label: "Assets",
        icon: "heroicons:building-storefront",
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-500/50",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "Property & Vehicles",
        subTiles: [
          {
            label: "Asset Overview",
            path: "/assets",
            icon: "heroicons:building-storefront"
          },
          {
            label: "Asset Items",
            path: "/assets/items",
            icon: "heroicons:archive-box"
          },
          {
            label: "Asset Value",
            path: "/assets/value",
            icon: "heroicons:currency-rupee"
          },
          {
            label: "Maintenance",
            path: "/assets/maintenance",
            icon: "heroicons:wrench-screwdriver"
          },
          {
            label: "Documents",
            path: "/assets/documents",
            icon: "heroicons:document-text"
          },
          {
            label: "Home Inventory",
            path: "/inventory",
            icon: "heroicons:archive-box"
          },
          {
            label: "Vehicle Management",
            path: "/vehicles",
            icon: "heroicons:truck"
          }
        ]
      },
      {
        id: "projects",
        label: "Projects",
        icon: "heroicons:clipboard-document-list",
        color: "from-cyan-500 to-cyan-600",
        borderColor: "border-cyan-500/50",
        textColor: "text-cyan-600 dark:text-cyan-400",
        description: "Management & Tasks",
        subTiles: [
          {
            label: "Project Management",
            path: "/projects",
            icon: "heroicons:clipboard-document-list"
          },
          {
            label: "Gantt Chart",
            path: "/gantt",
            icon: "heroicons:chart-bar"
          },
          {
            label: "Daily Schedule",
            path: "/schedule",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Analytics Dashboard",
            path: "/analytics",
            icon: "heroicons:chart-bar"
          },
          {
            label: "Data Charts",
            path: "/charts",
            icon: "heroicons:chart-pie"
          },
          {
            label: "Interactive Maps",
            path: "/maps",
            icon: "heroicons:map"
          }
        ]
      }
    ];
    function isTileActive(tile) {
      return tile.subTiles.some((subTile) => store_get($$store_subs ??= {}, "$page", page).url.pathname === subTile.path);
    }
    $$renderer2.push(`<div class="left-tile-bar flex flex-col w-20 h-screen bg-transparent backdrop-blur-sm relative z-10 overflow-hidden flex-shrink-0"><div class="p-2"><div class="logo-container mb-3 flex items-center justify-center"><svg width="32" height="32" viewBox="0 0 24 24" class="drop-shadow-sm"><g transform="translate(3, 3)"><circle cx="9" cy="9" r="7" fill="#10b981" opacity="0.8"></circle><circle cx="9" cy="9" r="3.5" fill="#34d399"></circle><ellipse cx="9" cy="2" rx="2.5" ry="4" fill="#10b981" opacity="0.7"></ellipse><ellipse cx="16" cy="9" rx="4" ry="2.5" fill="#10b981" opacity="0.7"></ellipse><ellipse cx="9" cy="16" rx="2.5" ry="4" fill="#10b981" opacity="0.7"></ellipse><ellipse cx="2" cy="9" rx="4" ry="2.5" fill="#10b981" opacity="0.7"></ellipse></g></svg></div> <div class="flex flex-col gap-2"><!--[-->`);
    const each_array = ensure_array_like(mainTiles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tile = each_array[$$index];
      $$renderer2.push(`<div class="relative"><button class="tile-button group relative w-full aspect-square rounded-xl border-0 transition-all duration-300 hover:shadow-lg hover:scale-105"><div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(tile.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`, "svelte-wwrruu")}></div> <div class="relative flex flex-col items-center justify-center h-full p-2"><div${attr_class(`w-6 h-6 mb-1 ${stringify(tile.textColor)} group-hover:scale-110 transition-transform duration-300`, "svelte-wwrruu")}>`);
      Icon($$renderer2, { icon: tile.icon, class: "w-full h-full" });
      $$renderer2.push(`<!----></div> <div class="text-[10px] font-medium text-base-content group-hover:text-primary transition-colors duration-300 text-center leading-tight">${escape_html(tile.label)}</div> `);
      if (isTileActive(tile)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></button></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function TopNavigationBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const rightTiles = [
      {
        id: "tasks",
        label: "Tasks",
        icon: "heroicons:clipboard-document-list",
        color: "from-blue-500 to-blue-600",
        textColor: "text-blue-600 dark:text-blue-400",
        subTiles: [
          {
            label: "Add Task",
            icon: "heroicons:plus-circle",
            path: "/todo"
          },
          {
            label: "Quick Task",
            icon: "heroicons:bolt",
            action: "quick-task"
          },
          {
            label: "Task List",
            icon: "heroicons:clipboard-document-list",
            path: "/todo"
          }
        ]
      },
      {
        id: "notes",
        label: "Notes",
        icon: "heroicons:document-text",
        color: "from-green-500 to-green-600",
        textColor: "text-green-600 dark:text-green-400",
        subTiles: [
          {
            label: "New Note",
            icon: "heroicons:plus-circle",
            path: "/family-notes-modern"
          },
          {
            label: "Quick Note",
            icon: "heroicons:pencil-square",
            action: "quick-note"
          },
          {
            label: "Note List",
            icon: "heroicons:document-text",
            path: "/family-notes-modern"
          }
        ]
      },
      {
        id: "reminders",
        label: "Reminders",
        icon: "heroicons:bell-alert",
        color: "from-orange-500 to-orange-600",
        textColor: "text-orange-600 dark:text-orange-400",
        subTiles: [
          {
            label: "Add Reminder",
            icon: "heroicons:plus-circle",
            path: "/reminders"
          },
          {
            label: "Quick Reminder",
            icon: "heroicons:bell",
            action: "quick-reminder"
          },
          {
            label: "Reminder List",
            icon: "heroicons:bell-alert",
            path: "/reminders"
          }
        ]
      },
      {
        id: "voice-recording",
        label: "Voice",
        icon: "heroicons:microphone",
        color: "from-purple-500 to-purple-600",
        textColor: "text-purple-600 dark:text-purple-400",
        subTiles: [
          {
            label: "Record Voice",
            icon: "heroicons:microphone",
            path: "/recordings"
          },
          {
            label: "Voice Notes",
            icon: "heroicons:musical-note",
            action: "voice-note"
          },
          {
            label: "Voice Commands",
            icon: "heroicons:chat-bubble-left-right",
            action: "voice-command"
          }
        ]
      },
      {
        id: "scheduling",
        label: "Schedule",
        icon: "heroicons:calendar-days",
        color: "from-indigo-500 to-indigo-600",
        textColor: "text-indigo-600 dark:text-indigo-400",
        subTiles: [
          {
            label: "Add Event",
            icon: "heroicons:plus-circle",
            path: "/family-calendar-modern"
          },
          {
            label: "Quick Schedule",
            icon: "heroicons:clock",
            action: "quick-schedule"
          },
          {
            label: "Calendar View",
            icon: "heroicons:calendar-days",
            path: "/family-calendar-modern"
          }
        ]
      },
      {
        id: "ai-assistant",
        label: "AI Assistant",
        icon: "heroicons:sparkles",
        color: "from-pink-500 to-pink-600",
        textColor: "text-pink-600 dark:text-pink-400",
        subTiles: [
          {
            label: "Ask AI",
            icon: "heroicons:sparkles",
            path: "/shivo-ai"
          },
          {
            label: "Agentic AI",
            icon: "heroicons:robot",
            path: "/shivo-agentic"
          },
          {
            label: "Voice Assistant",
            icon: "heroicons:microphone",
            action: "voice-assistant"
          }
        ]
      },
      {
        id: "quick-actions",
        label: "Quick Actions",
        icon: "heroicons:bolt",
        color: "from-cyan-500 to-cyan-600",
        textColor: "text-cyan-600 dark:text-cyan-400",
        subTiles: [
          {
            label: "Search",
            icon: "heroicons:magnifying-glass",
            action: "search"
          },
          {
            label: "Save All",
            icon: "heroicons:document-check",
            action: "save-all"
          },
          {
            label: "Settings",
            icon: "heroicons:cog-6-tooth",
            action: "settings"
          }
        ]
      }
    ];
    function isTileActive(tile) {
      return tile.subTiles.some((subTile) => store_get($$store_subs ??= {}, "$page", page).url.pathname === subTile.path);
    }
    $$renderer2.push(`<div class="outlook-nav w-full bg-transparent backdrop-blur-xl border-0 svelte-1qkqwru"><div class="flex items-center justify-between px-6 py-0 h-16 svelte-1qkqwru"><div class="flex items-center space-x-4 h-full svelte-1qkqwru"><div class="flex items-center space-x-1 svelte-1qkqwru"><div class="flex flex-col svelte-1qkqwru"><span class="text-sm font-medium text-white/80 leading-tight svelte-1qkqwru">Gurukuladesam</span> <span class="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight svelte-1qkqwru">Home Manager</span></div></div></div> <div class="flex items-center space-x-2 h-full svelte-1qkqwru"><div class="flex items-center space-x-1 svelte-1qkqwru"><!--[-->`);
    const each_array = ensure_array_like(rightTiles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tile = each_array[$$index];
      $$renderer2.push(`<div class="relative svelte-1qkqwru"><button class="w-10 h-10 rounded-lg bg-transparent hover:bg-white/10 transition-all duration-200 flex items-center justify-center group svelte-1qkqwru"${attr("aria-label", tile.label)}><div${attr_class(`w-5 h-5 ${stringify(tile.textColor)} group-hover:scale-110 transition-transform duration-200`, "svelte-1qkqwru")}>`);
      Icon($$renderer2, { icon: tile.icon, class: "w-full h-full" });
      $$renderer2.push(`<!----></div> `);
      if (isTileActive(tile)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse svelte-1qkqwru"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="h-6 w-px bg-gray-300/30 dark:bg-gray-600/30 mx-1 svelte-1qkqwru"></div> <button class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 svelte-1qkqwru" title="Search">`);
    Icon($$renderer2, { icon: "heroicons:magnifying-glass", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 svelte-1qkqwru" title="Settings">`);
    Icon($$renderer2, { icon: "heroicons:cog-6-tooth", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm svelte-1qkqwru">U</div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function DashboardTiles($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activeMainTile, activeSubTiles;
    const mainTiles = [
      {
        id: "dashboard",
        label: "Home",
        icon: "heroicons:home",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-500/50",
        textColor: "text-blue-600 dark:text-blue-400",
        description: "Dashboard & Overview",
        subTiles: [
          { label: "Dashboard", path: "/", icon: "heroicons:home" },
          {
            label: "Household",
            path: "/household",
            icon: "heroicons:squares-2x2"
          },
          {
            label: "Family Members",
            path: "/members",
            icon: "heroicons:users"
          },
          {
            label: "Calendar",
            path: "/family-calendar-modern",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Notes",
            path: "/family-notes-modern",
            icon: "heroicons:document-text"
          },
          {
            label: "Reminders",
            path: "/reminders",
            icon: "heroicons:bell-alert"
          }
        ]
      },
      {
        id: "divinity",
        label: "Divinity",
        icon: "heroicons:sparkles",
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-500/50",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "Spiritual & Religious",
        subTiles: [
          {
            label: "Tamil Panchangam",
            path: "/tamil-panchangam",
            icon: "heroicons:sun"
          },
          {
            label: "Rituals",
            path: "/rituals",
            icon: "heroicons:sparkles"
          },
          {
            label: "Temple Visits",
            path: "/temple",
            icon: "heroicons:building-storefront"
          },
          {
            label: "Festival Calendar",
            path: "/festival-calendar",
            icon: "heroicons:calendar"
          },
          {
            label: "Mantras",
            path: "/mantras",
            icon: "heroicons:musical-note"
          }
        ]
      },
      {
        id: "contacts",
        label: "Contacts",
        icon: "heroicons:phone",
        color: "from-green-500 to-green-600",
        borderColor: "border-green-500/50",
        textColor: "text-green-600 dark:text-green-400",
        description: "People & Directory",
        subTiles: [
          {
            label: "Personal Contacts",
            path: "/contacts",
            icon: "heroicons:phone"
          },
          {
            label: "Emergency Contacts",
            path: "/emergency",
            icon: "heroicons:exclamation-triangle"
          },
          {
            label: "Vendors & Services",
            path: "/vendors",
            icon: "heroicons:wrench"
          },
          {
            label: "Service Directory",
            path: "/directory",
            icon: "heroicons:building-storefront"
          }
        ]
      },
      {
        id: "food",
        label: "Food",
        icon: "heroicons:cake",
        color: "from-orange-400 to-orange-500",
        borderColor: "border-orange-400/50",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "Meals & Recipes",
        subTiles: [
          {
            label: "Meals & Planning",
            path: "/meals",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Recipes",
            path: "/recipes",
            icon: "heroicons:book-open"
          },
          {
            label: "Grocery & Pantry",
            path: "/grocery",
            icon: "heroicons:shopping-cart"
          },
          {
            label: "Pantry Management",
            path: "/pantry",
            icon: "heroicons:archive-box"
          },
          {
            label: "Kitchen Dashboard",
            path: "/kitchen",
            icon: "heroicons:home"
          },
          {
            label: "Fresh Items",
            path: "/kitchen/fresh",
            icon: "heroicons:leaf"
          },
          {
            label: "Kids Meals",
            path: "/kitchen/kids",
            icon: "heroicons:user-group"
          },
          {
            label: "Cleaning Schedule",
            path: "/kitchen/cleaning",
            icon: "heroicons:sparkles"
          }
        ]
      },
      {
        id: "education",
        label: "Learn",
        icon: "heroicons:academic-cap",
        color: "from-indigo-500 to-indigo-600",
        borderColor: "border-indigo-500/50",
        textColor: "text-indigo-600 dark:text-indigo-400",
        description: "Education & Study",
        subTiles: [
          {
            label: "Education Dashboard",
            path: "/education",
            icon: "heroicons:academic-cap"
          },
          {
            label: "Students",
            path: "/education/students",
            icon: "heroicons:users"
          },
          {
            label: "Curriculum",
            path: "/education/curriculum",
            icon: "heroicons:book-open"
          },
          {
            label: "Planner",
            path: "/education/planner",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Quiz",
            path: "/education/quiz",
            icon: "heroicons:question-mark-circle"
          },
          {
            label: "Assessment",
            path: "/education/assessment",
            icon: "heroicons:clipboard-document-check"
          },
          {
            label: "Courses",
            path: "/education/courses",
            icon: "heroicons:academic-cap"
          },
          {
            label: "Mentors",
            path: "/education/mentors",
            icon: "heroicons:user-group"
          },
          {
            label: "Achievements",
            path: "/education/achievements",
            icon: "heroicons:trophy"
          },
          {
            label: "Family Library",
            path: "/library",
            icon: "heroicons:book-open"
          },
          {
            label: "Studies & Exams",
            path: "/studies",
            icon: "heroicons:pencil"
          },
          {
            label: "Learning Goals",
            path: "/learning-goals",
            icon: "heroicons:light-bulb"
          }
        ]
      },
      {
        id: "assistant",
        label: "Assistant",
        icon: "heroicons:chat-bubble-left-right",
        color: "from-purple-500 to-purple-600",
        borderColor: "border-purple-500/50",
        textColor: "text-purple-600 dark:text-purple-400",
        description: "AI & Automation",
        subTiles: [
          {
            label: "Assistant Dashboard",
            path: "/assistant",
            icon: "heroicons:chat-bubble-left-right"
          },
          {
            label: "Voice Log",
            path: "/assistant/voice-log",
            icon: "heroicons:microphone"
          },
          {
            label: "Task Board",
            path: "/assistant/task-board",
            icon: "heroicons:clipboard-document-list"
          },
          {
            label: "Event Feed",
            path: "/assistant/event-feed",
            icon: "heroicons:rss"
          },
          {
            label: "Auto Checklist",
            path: "/assistant/auto-checklist",
            icon: "heroicons:check-circle"
          },
          {
            label: "Ambient Log",
            path: "/assistant/ambient-log",
            icon: "heroicons:eye"
          }
        ]
      },
      {
        id: "shivo-ai",
        label: "Shivo AI",
        icon: "heroicons:sparkles",
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-500/50",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "AI Assistant",
        subTiles: [
          {
            label: "AI Assistant",
            path: "/shivo-ai",
            icon: "heroicons:sparkles"
          }
        ]
      },
      {
        id: "shivo-music",
        label: "Shivo Music",
        icon: "heroicons:musical-note",
        color: "from-pink-500 to-pink-600",
        borderColor: "border-pink-500/50",
        textColor: "text-pink-600 dark:text-pink-400",
        description: "Music Companion",
        subTiles: [
          {
            label: "Music Companion",
            path: "/shivo-music",
            icon: "heroicons:musical-note"
          }
        ]
      },
      {
        id: "shivo-agentic",
        label: "Shivo Agentic",
        icon: "heroicons:robot",
        color: "from-violet-500 to-violet-600",
        borderColor: "border-violet-500/50",
        textColor: "text-violet-600 dark:text-violet-400",
        description: "Agentic AI Assistant",
        subTiles: [
          {
            label: "Agentic AI",
            path: "/shivo-agentic",
            icon: "heroicons:robot"
          }
        ]
      },
      {
        id: "health",
        label: "Health",
        icon: "heroicons:heart",
        color: "from-pink-500 to-pink-600",
        borderColor: "border-pink-500/50",
        textColor: "text-pink-600 dark:text-pink-400",
        description: "Wellness & Fitness",
        subTiles: [
          {
            label: "Wellness Dashboard",
            path: "/wellness",
            icon: "heroicons:heart"
          },
          {
            label: "Health Tracking",
            path: "/health",
            icon: "heroicons:shield-check"
          },
          {
            label: "Yoga & Exercise",
            path: "/yoga",
            icon: "heroicons:user"
          },
          {
            label: "Health Journal",
            path: "/journal",
            icon: "heroicons:pencil-square"
          },
          {
            label: "Hobbies & Activities",
            path: "/hobbies-activities",
            icon: "heroicons:puzzle-piece"
          }
        ]
      },
      {
        id: "finances",
        label: "Finances",
        icon: "heroicons:currency-rupee",
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-500/50",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "Money & Budget",
        subTiles: [
          {
            label: "Finance Dashboard",
            path: "/finances",
            icon: "heroicons:currency-rupee"
          },
          {
            label: "Recharges",
            path: "/recharges",
            icon: "heroicons:device-phone-mobile"
          },
          {
            label: "Expenses",
            path: "/expenses",
            icon: "heroicons:credit-card"
          },
          {
            label: "Budget",
            path: "/budget",
            icon: "heroicons:calculator"
          },
          {
            label: "Insurance",
            path: "/insurance",
            icon: "heroicons:shield-check"
          },
          {
            label: "Investments",
            path: "/investments",
            icon: "heroicons:chart-line"
          }
        ]
      },
      {
        id: "assets",
        label: "Assets",
        icon: "heroicons:building-storefront",
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-500/50",
        textColor: "text-emerald-600 dark:text-emerald-400",
        description: "Property & Vehicles",
        subTiles: [
          {
            label: "Asset Overview",
            path: "/assets",
            icon: "heroicons:building-storefront"
          },
          {
            label: "Asset Items",
            path: "/assets/items",
            icon: "heroicons:archive-box"
          },
          {
            label: "Asset Value",
            path: "/assets/value",
            icon: "heroicons:currency-rupee"
          },
          {
            label: "Maintenance",
            path: "/assets/maintenance",
            icon: "heroicons:wrench-screwdriver"
          },
          {
            label: "Documents",
            path: "/assets/documents",
            icon: "heroicons:document-text"
          },
          {
            label: "Home Inventory",
            path: "/inventory",
            icon: "heroicons:archive-box"
          },
          {
            label: "Vehicle Management",
            path: "/vehicles",
            icon: "heroicons:truck"
          }
        ]
      },
      {
        id: "projects",
        label: "Projects",
        icon: "heroicons:clipboard-document-list",
        color: "from-cyan-500 to-cyan-600",
        borderColor: "border-cyan-500/50",
        textColor: "text-cyan-600 dark:text-cyan-400",
        description: "Management & Tasks",
        subTiles: [
          {
            label: "Project Management",
            path: "/projects",
            icon: "heroicons:clipboard-document-list"
          },
          {
            label: "Gantt Chart",
            path: "/gantt",
            icon: "heroicons:chart-bar"
          },
          {
            label: "Daily Schedule",
            path: "/schedule",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Analytics Dashboard",
            path: "/analytics",
            icon: "heroicons:chart-bar"
          },
          {
            label: "Data Charts",
            path: "/charts",
            icon: "heroicons:chart-pie"
          },
          {
            label: "Interactive Maps",
            path: "/maps",
            icon: "heroicons:map"
          }
        ]
      }
    ];
    mainTiles.flatMap((mainTile) => mainTile.subTiles.map((subTile) => ({
      ...subTile,
      color: mainTile.color,
      textColor: mainTile.textColor,
      parentId: mainTile.id
    })));
    function isTileActive(tilePath) {
      return store_get($$store_subs ??= {}, "$page", page).url.pathname === tilePath;
    }
    activeMainTile = mainTiles.find((tile) => tile.subTiles.some((subTile) => store_get($$store_subs ??= {}, "$page", page).url.pathname === subTile.path));
    activeSubTiles = activeMainTile ? activeMainTile.subTiles.map((subTile) => ({
      ...subTile,
      color: activeMainTile.color,
      textColor: activeMainTile.textColor,
      parentId: activeMainTile.id
    })) : [];
    $$renderer2.push(`<div class="dashboard-tiles w-full"><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6"><!--[-->`);
    const each_array = ensure_array_like(activeSubTiles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tile = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`tile-card group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${stringify(isTileActive(tile.path) ? "ring-2 ring-blue-500 shadow-lg" : "")}`, "svelte-wc752v")}><button${attr_class(`w-full h-24 bg-gradient-to-br ${stringify(tile.color)} hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden p-3`, "svelte-wc752v")}><div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(tile.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`, "svelte-wc752v")}></div> <div class="relative flex flex-col items-center justify-center h-full"><div class="w-8 h-8 mb-2 text-white group-hover:scale-110 transition-transform duration-300">`);
      Icon($$renderer2, { icon: tile.icon, class: "w-full h-full" });
      $$renderer2.push(`<!----></div> <div class="text-xs font-medium text-white text-center leading-tight group-hover:text-white transition-colors duration-300">${escape_html(tile.label)}</div> `);
      if (isTileActive(tile.path)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></button></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (activeMainTile) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="px-6 pb-6"><div class="text-center"><h2 class="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">${escape_html(activeMainTile.label)}</h2> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(activeMainTile.description)}</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function FloatingActionButtons($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isRecording = false;
    $$renderer2.push(`<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 svelte-son6ad">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button${attr_class("w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative svelte-son6ad", void 0, {
      "ring-4": isRecording,
      "ring-red-300": isRecording,
      "animate-pulse": isRecording
    })}${attr("title", "Start Voice Input")}>`);
    Icon($$renderer2, {
      icon: "heroicons:microphone",
      class: "w-7 h-7 group-hover:scale-110 transition-transform duration-200"
    });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button> <button class="w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center backdrop-blur-sm svelte-son6ad"${attr("title", "Expand")}>`);
    Icon($$renderer2, {
      icon: "heroicons:chevron-up",
      class: "w-5 h-5 transition-transform duration-200"
    });
    $$renderer2.push(`<!----></button></div>`);
  });
}
function DashboardLayout($$renderer, $$props) {
  $$renderer.push(`<div class="flex h-screen bg-base-200 mountain-background svelte-b38hhi" data-theme="modern"><div class="flex-shrink-0">`);
  LeftTileBar($$renderer);
  $$renderer.push(`<!----></div> <div class="flex-1 flex flex-col overflow-hidden"><main class="flex-1 scrollable-container bg-transparent"><div class="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-28 relative"><div class="absolute top-4 left-4 right-4 z-20">`);
  TopNavigationBar($$renderer);
  $$renderer.push(`<!----></div> <div class="content-container rounded-3xl bg-base-100/90 backdrop-blur-xl shadow-2xl border-0 p-6 sm:p-8 pt-20 svelte-b38hhi">`);
  DashboardTiles($$renderer);
  $$renderer.push(`<!----> <!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div></div></main></div> <div class="flex-shrink-0"></div> `);
  FloatingActionButtons($$renderer);
  $$renderer.push(`<!----></div>`);
}
function _layout($$renderer, $$props) {
  DashboardLayout($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]-->`);
    },
    $$slots: { default: true }
  });
}
export {
  _layout as default
};
