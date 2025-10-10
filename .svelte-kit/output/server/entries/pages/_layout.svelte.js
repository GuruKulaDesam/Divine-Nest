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
import { t as theme } from "../../chunks/theme.js";
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
          },
          {
            label: "Shivo AI",
            path: "/shivo-ai",
            icon: "heroicons:sparkles"
          },
          {
            label: "Shivo Music",
            path: "/shivo-music",
            icon: "heroicons:musical-note"
          },
          {
            label: "Shivo Agentic",
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
    $$renderer2.push(`<div class="left-tile-bar flex flex-col w-20 h-screen bg-transparent backdrop-blur-sm relative z-10 overflow-hidden flex-shrink-0" style="height: calc(100vh - 80px);"><div class="p-2"><div class="flex flex-col gap-2"><!--[-->`);
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
    const ribbonGroups = [
      {
        id: "create",
        label: "Create",
        icon: "heroicons:plus-circle",
        color: "from-emerald-500 to-teal-600",
        textColor: "text-emerald-600 dark:text-emerald-400",
        items: [
          {
            label: "Task",
            icon: "heroicons:clipboard-document-list",
            path: "/todo",
            shortcut: "Ctrl+T"
          },
          {
            label: "Note",
            icon: "heroicons:document-text",
            path: "/family-notes-modern",
            shortcut: "Ctrl+N"
          },
          {
            label: "Event",
            icon: "heroicons:calendar-days",
            path: "/family-calendar-modern",
            shortcut: "Ctrl+E"
          },
          {
            label: "Reminder",
            icon: "heroicons:bell-alert",
            path: "/reminders",
            shortcut: "Ctrl+R"
          }
        ]
      },
      {
        id: "voice",
        label: "Voice & AI",
        icon: "heroicons:microphone",
        color: "from-purple-500 to-pink-600",
        textColor: "text-purple-600 dark:text-purple-400",
        items: [
          {
            label: "Record",
            icon: "heroicons:microphone",
            path: "/recordings",
            shortcut: "Ctrl+V"
          },
          {
            label: "AI",
            icon: "heroicons:sparkles",
            path: "/shivo-ai",
            shortcut: "Ctrl+A"
          },
          {
            label: "Voice Cmd",
            icon: "heroicons:chat-bubble-left-right",
            action: "voice-command",
            shortcut: "Ctrl+Shift+V"
          },
          {
            label: "Agentic",
            icon: "heroicons:robot",
            path: "/shivo-agentic",
            shortcut: "Ctrl+Shift+A"
          }
        ]
      },
      {
        id: "quick-actions",
        label: "Quick Actions",
        icon: "heroicons:bolt",
        color: "from-blue-500 to-cyan-600",
        textColor: "text-blue-600 dark:text-blue-400",
        items: [
          {
            label: "Quick Task",
            icon: "heroicons:bolt",
            action: "quick-task",
            shortcut: "Ctrl+Q"
          },
          {
            label: "Quick Note",
            icon: "heroicons:pencil-square",
            action: "quick-note",
            shortcut: "Ctrl+Shift+N"
          },
          {
            label: "Schedule",
            icon: "heroicons:clock",
            action: "quick-schedule",
            shortcut: "Ctrl+Shift+E"
          },
          {
            label: "Search",
            icon: "heroicons:magnifying-glass",
            action: "search",
            shortcut: "Ctrl+F"
          }
        ]
      },
      {
        id: "manage",
        label: "Manage",
        icon: "heroicons:cog-6-tooth",
        color: "from-orange-500 to-red-600",
        textColor: "text-orange-600 dark:text-orange-400",
        items: [
          {
            label: "Save All",
            icon: "heroicons:document-check",
            action: "save-all",
            shortcut: "Ctrl+S"
          },
          {
            label: "Settings",
            icon: "heroicons:cog-6-tooth",
            action: "settings",
            shortcut: "Ctrl+,"
          },
          {
            label: "Share",
            icon: "heroicons:share",
            action: "share-whatsapp",
            shortcut: "Ctrl+Shift+S"
          },
          {
            label: "Export",
            icon: "heroicons:arrow-down-tray",
            action: "export-data",
            shortcut: "Ctrl+E"
          }
        ]
      }
    ];
    function isItemActive(item) {
      return store_get($$store_subs ??= {}, "$page", page).url.pathname === item.path;
    }
    $$renderer2.push(`<div class="excel-ribbon fixed top-0 left-0 right-0 w-screen bg-transparent backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm z-50 svelte-1qkqwru"><div class="flex items-center px-6 py-2 min-h-[60px] max-w-full svelte-1qkqwru"><div class="flex items-center space-x-4 flex-shrink-0 svelte-1qkqwru"><div class="flex items-center space-x-2 svelte-1qkqwru"><div class="flex flex-col svelte-1qkqwru"><span class="text-sm font-medium bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent leading-tight svelte-1qkqwru">தமிழச்சி இல்லம்</span> <span class="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight svelte-1qkqwru">Home Maker</span></div></div></div> <div class="flex-1 flex justify-center mx-4 svelte-1qkqwru"><div class="flex items-stretch overflow-x-auto svelte-1qkqwru"><!--[-->`);
    const each_array = ensure_array_like(ribbonGroups);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let group = each_array[$$index_1];
      $$renderer2.push(`<div class="ribbon-group-separator flex flex-col items-center space-x-1 px-4 py-2 border-r-2 border-gray-300/60 dark:border-gray-600/60 last:border-r-0 relative svelte-1qkqwru"><div class="text-[9px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 svelte-1qkqwru">${escape_html(group.label)}</div> <div class="flex items-center space-x-0.5 svelte-1qkqwru"><!--[-->`);
      const each_array_1 = ensure_array_like(group.items);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        $$renderer2.push(`<button${attr_class(
          `group relative flex flex-col items-center justify-center w-12 h-10 rounded hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-150 border border-transparent hover:border-gray-300/60 dark:hover:border-gray-600/60 ${stringify(isItemActive(item) ? "bg-blue-50/90 dark:bg-blue-900/50 border-blue-200/70 dark:border-blue-800/70" : "")}`,
          "svelte-1qkqwru"
        )}${attr("title", `${stringify(item.label)}${stringify(item.shortcut ? ` (${item.shortcut})` : "")}`)}${attr("aria-label", item.label)}><div${attr_class(`w-4 h-4 ${stringify(group.textColor)} group-hover:scale-110 transition-transform duration-200 mb-0.5`, "svelte-1qkqwru")}>`);
        Icon($$renderer2, { icon: item.icon, class: "w-full h-full" });
        $$renderer2.push(`<!----></div> <span class="text-[10px] font-medium text-gray-600 dark:text-gray-400 leading-tight text-center svelte-1qkqwru">${escape_html(item.label.split(" ")[0])}</span> `);
        if (isItemActive(item)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full svelte-1qkqwru"></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></button>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex items-center space-x-2 flex-shrink-0 svelte-1qkqwru"><button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm svelte-1qkqwru" title="Search (Ctrl+F)">`);
    Icon($$renderer2, { icon: "heroicons:magnifying-glass", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm svelte-1qkqwru"${attr("title", `Toggle Theme (${stringify(store_get($$store_subs ??= {}, "$theme", theme))})`)}>`);
    Icon($$renderer2, { icon: "heroicons:swatch", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm svelte-1qkqwru" title="Settings (Ctrl+,)">`);
    Icon($$renderer2, { icon: "heroicons:cog-6-tooth", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <div class="relative group svelte-1qkqwru"><button class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 svelte-1qkqwru">U</button> <div class="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-gray-800/95 border border-gray-200/60 dark:border-gray-700/60 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm svelte-1qkqwru"><div class="p-3 border-b border-gray-200 dark:border-gray-700 svelte-1qkqwru"><div class="text-sm font-medium text-gray-900 dark:text-white svelte-1qkqwru">User Name</div> <div class="text-xs text-gray-500 dark:text-gray-400 svelte-1qkqwru">user@example.com</div></div> <div class="py-1 svelte-1qkqwru"><button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 svelte-1qkqwru">Profile Settings</button> <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 svelte-1qkqwru">Preferences</button> <button class="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-colors duration-150 svelte-1qkqwru">Sign Out</button></div></div></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function DashboardTiles($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentSection, currentSectionData;
    const mainTiles = [
      {
        id: "home",
        label: "Home",
        icon: "heroicons:home",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-500/50",
        textColor: "text-blue-600 dark:text-blue-400",
        description: "Dashboard & Overview",
        path: "/home",
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
        path: "/divinity",
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
        path: "/contacts",
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
        path: "/food",
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
        id: "learn",
        label: "Learn",
        icon: "heroicons:academic-cap",
        color: "from-indigo-500 to-indigo-600",
        borderColor: "border-indigo-500/50",
        textColor: "text-indigo-600 dark:text-indigo-400",
        description: "Education & Study",
        path: "/learn",
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
        path: "/assistant",
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
          },
          {
            label: "AI Assistant",
            path: "/shivo-ai",
            icon: "heroicons:sparkles"
          },
          {
            label: "Music Companion",
            path: "/shivo-music",
            icon: "heroicons:musical-note"
          },
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
        path: "/health",
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
        path: "/finances",
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
        path: "/assets",
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
        path: "/projects",
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
    function getCurrentSection(pathname) {
      const mainSection = mainTiles.find((tile) => tile.path === pathname);
      if (mainSection) return mainSection.id;
      for (const tile of mainTiles) {
        if (tile.subTiles.some((sub) => sub.path === pathname)) {
          return tile.id;
        }
      }
      return "home";
    }
    function isTileActive(tilePath) {
      return store_get($$store_subs ??= {}, "$page", page).url.pathname === tilePath;
    }
    currentSection = getCurrentSection(store_get($$store_subs ??= {}, "$page", page).url.pathname);
    currentSectionData = mainTiles.find((tile) => tile.id === currentSection);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><h1 class="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:home", class: "text-indigo-600" });
    $$renderer2.push(`<!----> 🏠 Home Management Dashboard</h1> <p class="text-gray-600 text-lg">Manage your household, family, and daily activities</p></div> <div class="flex gap-6"><div class="w-80 flex-shrink-0"><div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:squares-2x2", class: "text-indigo-500" });
    $$renderer2.push(`<!----> ${escape_html(currentSectionData?.label || "Home")} Menu</h3> <div class="space-y-2">`);
    if (currentSectionData) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attr_class(`w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${stringify(currentSectionData.color)} text-white cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 mb-4`)}>`);
      Icon($$renderer2, { icon: currentSectionData.icon, class: "text-lg" });
      $$renderer2.push(`<!----> <div><div class="font-medium">${escape_html(currentSectionData.label)}</div> <div class="text-xs opacity-90">${escape_html(currentSectionData.description)}</div></div></button> <div class="space-y-1"><!--[-->`);
      const each_array = ensure_array_like(currentSectionData.subTiles);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let subTile = each_array[$$index];
        $$renderer2.push(`<button${attr_class(`w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 ${stringify(isTileActive(subTile.path) ? "bg-indigo-50 text-indigo-700 font-medium" : "")}`)}>`);
        Icon($$renderer2, { icon: subTile.icon, class: "text-base flex-shrink-0" });
        $$renderer2.push(`<!----> <span class="truncate">${escape_html(subTile.label)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-6 pt-4 border-t border-gray-200"><h4 class="text-sm font-medium text-gray-500 mb-3">Other Sections</h4> <div class="space-y-1"><!--[-->`);
    const each_array_1 = ensure_array_like(mainTiles.filter((tile) => tile.id !== currentSection));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tile = each_array_1[$$index_1];
      $$renderer2.push(`<button class="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200">`);
      Icon($$renderer2, { icon: tile.icon, class: "text-base flex-shrink-0" });
      $$renderer2.push(`<!----> <span class="truncate">${escape_html(tile.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div> <div class="flex-1"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "text-blue-500 text-2xl" });
    $$renderer2.push(`<!----> <span class="text-2xl font-bold text-blue-600">6</span></div> <h3 class="text-sm font-medium text-gray-600">Family Members</h3> <p class="text-xs text-gray-500 mt-1">Active in household</p></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "text-green-500 text-2xl"
    });
    $$renderer2.push(`<!----> <span class="text-2xl font-bold text-green-600">12</span></div> <h3 class="text-sm font-medium text-gray-600">Active Tasks</h3> <p class="text-xs text-gray-500 mt-1">Pending completion</p></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
    Icon($$renderer2, {
      icon: "heroicons:bell-alert",
      class: "text-orange-500 text-2xl"
    });
    $$renderer2.push(`<!----> <span class="text-2xl font-bold text-orange-600">3</span></div> <h3 class="text-sm font-medium text-gray-600">Reminders</h3> <p class="text-xs text-gray-500 mt-1">Due today</p></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "text-purple-500 text-2xl"
    });
    $$renderer2.push(`<!----> <span class="text-2xl font-bold text-purple-600">2</span></div> <h3 class="text-sm font-medium text-gray-600">Events</h3> <p class="text-xs text-gray-500 mt-1">This week</p></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:currency-rupee", class: "text-emerald-500" });
    $$renderer2.push(`<!----> Monthly Budget</h3> <div class="space-y-3"><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Spent</span> <span class="font-semibold text-gray-800">₹45,230</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: 75%"></div></div> <div class="flex justify-between items-center text-xs text-gray-500"><span>75% of ₹60,000</span> <span>₹14,770 remaining</span></div></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:credit-card", class: "text-blue-500" });
    $$renderer2.push(`<!----> Recent Expenses</h3> <div class="space-y-3"><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Grocery</span> <span class="font-semibold text-gray-800">₹2,450</span></div> <div class="flex justify-between items-center"><span class="text-sm text-gray-600">Utilities</span> <span class="font-semibold text-gray-800">₹1,200</span></div> <div class="flex justify-between items-center"><span class="text-sm text-gray-600">Transportation</span> <span class="font-semibold text-gray-800">₹800</span></div></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:chart-line", class: "text-purple-500" });
    $$renderer2.push(`<!----> Savings Goal</h3> <div class="space-y-3"><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Emergency Fund</span> <span class="font-semibold text-gray-800">₹2.5L / ₹5L</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-purple-500 h-2 rounded-full" style="width: 50%"></div></div> <div class="text-xs text-gray-500">50% complete • ₹2.5L saved</div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "text-blue-500" });
    $$renderer2.push(`<!----> Recent Activity</h3> <div class="space-y-3"><div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "text-blue-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Family notes updated</p> <p class="text-xs text-gray-600">2 hours ago</p></div></div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-green-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "text-green-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">New task added</p> <p class="text-xs text-gray-600">4 hours ago</p></div></div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-orange-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:bell-alert",
      class: "text-orange-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Reminder set</p> <p class="text-xs text-gray-600">6 hours ago</p></div></div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-pink-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "text-pink-600 text-sm" });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Health check completed</p> <p class="text-xs text-gray-600">1 day ago</p></div></div></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "text-pink-500" });
    $$renderer2.push(`<!----> Family Health</h3> <div class="space-y-4"><div class="flex items-center justify-between p-3 bg-green-50 rounded-lg"><div class="flex items-center gap-3"><div class="w-3 h-3 bg-green-500 rounded-full"></div> <span class="text-sm font-medium text-gray-800">All family members healthy</span></div> `);
    Icon($$renderer2, { icon: "heroicons:check-circle", class: "text-green-500" });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-2 gap-4"><div class="text-center"><div class="text-2xl font-bold text-blue-600">4</div> <div class="text-xs text-gray-600">Exercise sessions</div> <div class="text-xs text-gray-500">This week</div></div> <div class="text-center"><div class="text-2xl font-bold text-orange-600">2</div> <div class="text-xs text-gray-600">Doctor visits</div> <div class="text-xs text-gray-500">Scheduled</div></div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "text-indigo-500" });
    $$renderer2.push(`<!----> Upcoming Events</h3> <div class="space-y-3"><div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"><div class="p-2 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "text-blue-600 text-sm" });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Family Dinner</p> <p class="text-xs text-gray-600">Tomorrow, 7:00 PM</p></div></div> <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"><div class="p-2 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "text-purple-600 text-sm" });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Pongal Festival</p> <p class="text-xs text-gray-600">Jan 15, All day</p></div></div> <div class="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"><div class="p-2 bg-orange-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:academic-cap",
      class: "text-orange-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">School Parent Meeting</p> <p class="text-xs text-gray-600">Jan 18, 10:00 AM</p></div></div></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:wrench-screwdriver",
      class: "text-amber-500"
    });
    $$renderer2.push(`<!----> Maintenance Due</h3> <div class="space-y-3"><div class="flex items-center justify-between p-3 bg-red-50 rounded-lg"><div class="flex items-center gap-3"><div class="w-3 h-3 bg-red-500 rounded-full"></div> <span class="text-sm font-medium text-gray-800">Car Service</span></div> <span class="text-xs text-red-600 font-medium">Overdue</span></div> <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"><div class="flex items-center gap-3"><div class="w-3 h-3 bg-yellow-500 rounded-full"></div> <span class="text-sm font-medium text-gray-800">Water Filter Change</span></div> <span class="text-xs text-yellow-600 font-medium">Due soon</span></div> <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg"><div class="flex items-center gap-3"><div class="w-3 h-3 bg-green-500 rounded-full"></div> <span class="text-sm font-medium text-gray-800">Garden Maintenance</span></div> <span class="text-xs text-green-600 font-medium">Next week</span></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "text-blue-500" });
    $$renderer2.push(`<!----> Recent Activity</h3> <div class="space-y-3"><div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "text-blue-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Family notes updated</p> <p class="text-xs text-gray-600">2 hours ago</p></div></div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-green-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "text-green-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">New task added</p> <p class="text-xs text-gray-600">4 hours ago</p></div></div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-orange-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:bell-alert",
      class: "text-orange-600 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800">Reminder set</p> <p class="text-xs text-gray-600">6 hours ago</p></div></div></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "text-purple-500" });
    $$renderer2.push(`<!----> Quick Actions</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-3"><button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:clipboard-document-list", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Add Task</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:document-text", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">New Note</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Schedule</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:bell-alert", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Set Reminder</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Health Check</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:credit-card", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Add Expense</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Grocery List</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:chat-bubble-left-right", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">AI Assistant</span></button></div></div></div></div></div></div></div>`);
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
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentPath;
    currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    $$renderer2.push(`<div class="flex h-screen bg-base-200 mountain-background svelte-b38hhi" data-theme="modern"><div class="fixed top-0 left-0 right-0 z-30">`);
    TopNavigationBar($$renderer2);
    $$renderer2.push(`<!----></div> <div class="flex-shrink-0 pt-24">`);
    LeftTileBar($$renderer2);
    $$renderer2.push(`<!----></div> <div class="flex-1 flex flex-col overflow-hidden pt-24"><main class="flex-1 scrollable-container bg-transparent svelte-b38hhi">`);
    if (currentPath === "/") {
      $$renderer2.push("<!--[-->");
      DashboardTiles($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="p-4 sm:p-6 lg:p-8 relative"><div class="content-container rounded-3xl border-0 p-6 sm:p-8 svelte-b38hhi"><div class="mb-6 flex items-center space-x-2 text-sm"><button class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Home</span></button> `);
      Icon($$renderer2, {
        icon: "heroicons:chevron-right",
        class: "w-4 h-4 text-gray-400"
      });
      $$renderer2.push(`<!----> <span class="text-gray-600 dark:text-gray-300 capitalize">${escape_html(currentPath.split("/").filter(Boolean).join(" › "))}</span></div> <!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></main></div> <div class="flex-shrink-0"></div> `);
    FloatingActionButtons($$renderer2);
    $$renderer2.push(`<!----> <div class="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50"><a href="https://www.gurukulavasam.org" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-1"><span>Gurukulavasam</span> <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
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
