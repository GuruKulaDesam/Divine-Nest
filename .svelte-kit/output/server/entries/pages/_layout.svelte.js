import { a as ensure_array_like, b as attr_class, s as stringify, c as store_get, u as unsubscribe_stores, d as slot } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import { $ as $locale, r as registerLocaleLoader, i as init, w as waitLocale } from "../../chunks/runtime.js";
import { I as Icon } from "../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { p as page } from "../../chunks/stores.js";
import { t as theme, a as themeActions } from "../../chunks/theme.js";
import { b as background, a as backgroundActions } from "../../chunks/background.js";
import { a as attr } from "../../chunks/attributes.js";
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
function LeftTileBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentSection = null;
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
            path: "/home/household",
            icon: "heroicons:squares-2x2"
          },
          {
            label: "Family Members",
            path: "/home/members",
            icon: "heroicons:users"
          },
          {
            label: "Calendar",
            path: "/home/family-calendar-modern",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Notes",
            path: "/home/family-notes-modern",
            icon: "heroicons:document-text"
          },
          {
            label: "Reminders",
            path: "/home/reminders",
            icon: "heroicons:bell-alert"
          },
          {
            label: "Personal Contacts",
            path: "/home/contacts",
            icon: "heroicons:phone"
          },
          {
            label: "Emergency Contacts",
            path: "/home/contacts/emergency",
            icon: "heroicons:exclamation-triangle"
          },
          {
            label: "Vendors & Services",
            path: "/home/contacts/vendors",
            icon: "heroicons:wrench"
          },
          {
            label: "Service Directory",
            path: "/home/contacts/directory",
            icon: "heroicons:building-storefront"
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
        routes: [
          "/divinity",
          "/divinity/panchangam",
          "/divinity/drikpanchangam",
          "/divinity/rituals",
          "/divinity/temple",
          "/divinity/mantras"
        ],
        subTiles: [
          { label: "Dashboard", path: "/divinity", icon: "heroicons:sun" },
          {
            label: "Panchangam",
            path: "/divinity/panchangam",
            icon: "heroicons:sun"
          },
          {
            label: "திரிக் பஞ்சாங்கம்",
            path: "/divinity/drikpanchangam",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Rituals",
            path: "/divinity/rituals",
            icon: "heroicons:sparkles"
          },
          {
            label: "Temples",
            path: "/divinity/temple",
            icon: "heroicons:building-storefront"
          },
          {
            label: "Festivals",
            path: "/culture/festival-calendar",
            icon: "heroicons:calendar"
          },
          {
            label: "Mantras",
            path: "/divinity/mantras",
            icon: "heroicons:musical-note"
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
            label: "Dashboard",
            path: "/food",
            icon: "heroicons:utensils"
          },
          {
            label: "Meals & Planning",
            path: "/food/meals",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Recipes",
            path: "/food/recipes",
            icon: "heroicons:book-open"
          },
          {
            label: "Traditional Recipes",
            path: "/food/recipes/traditional",
            icon: "heroicons:document-text"
          },
          {
            label: "Grocery & Pantry",
            path: "/food/grocery",
            icon: "heroicons:shopping-cart"
          },
          {
            label: "Pantry Management",
            path: "/pantry",
            icon: "heroicons:archive-box"
          },
          {
            label: "Kitchen Dashboard",
            path: "/food/kitchen",
            icon: "heroicons:home"
          },
          {
            label: "Fresh Items",
            path: "/food/kitchen/fresh",
            icon: "heroicons:leaf"
          },
          {
            label: "Kids Meals",
            path: "/food/kitchen/kids",
            icon: "heroicons:user-group"
          },
          {
            label: "Kitchen Meals",
            path: "/food/kitchen/meals",
            icon: "heroicons:utensils"
          },
          {
            label: "Cleaning Schedule",
            path: "/food/kitchen/cleaning",
            icon: "heroicons:sparkles"
          },
          {
            label: "Kitchen Vendors",
            path: "/food/kitchen/vendors",
            icon: "heroicons:truck"
          },
          {
            label: "Wellness Kitchen",
            path: "/food/kitchen/wellness",
            icon: "heroicons:heart"
          },
          {
            label: "Festival Foods",
            path: "/food/kitchen/festivals",
            icon: "heroicons:cake"
          }
        ]
      },
      {
        id: "education",
        label: "Learning",
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
            path: "/education/library",
            icon: "heroicons:book-open"
          },
          {
            label: "Studies & Exams",
            path: "/education/studies",
            icon: "heroicons:pencil"
          },
          {
            label: "Learning Goals",
            path: "/education/learning-goals",
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
            path: "/shivo-ai/agentic",
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
            label: "Health Dashboard",
            path: "/health",
            icon: "heroicons:heart"
          },
          {
            label: "Wellness Tracking",
            path: "/health/wellness",
            icon: "heroicons:shield-check"
          },
          {
            label: "Yoga & Exercise",
            path: "/health/yoga",
            icon: "heroicons:user"
          },
          {
            label: "Health Journal",
            path: "/health/journal",
            icon: "heroicons:pencil-square"
          },
          {
            label: "Hobbies & Activities",
            path: "/health/hobbies-activities",
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
            path: "/finances/recharges",
            icon: "heroicons:device-phone-mobile"
          },
          {
            label: "Expenses",
            path: "/finances/expenses",
            icon: "heroicons:credit-card"
          },
          {
            label: "Budget",
            path: "/finances/budget",
            icon: "heroicons:calculator"
          },
          {
            label: "Insurance",
            path: "/finances/insurance",
            icon: "heroicons:shield-check"
          },
          {
            label: "Investments",
            path: "/finances/investments",
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
        id: "culture",
        label: "Culture",
        icon: "heroicons:globe-asia-australia",
        color: "from-amber-500 to-amber-600",
        borderColor: "border-amber-500/50",
        textColor: "text-amber-600 dark:text-amber-400",
        description: "Traditions & Heritage",
        subTiles: [
          {
            label: "Culture Dashboard",
            path: "/culture",
            icon: "heroicons:globe-asia-australia"
          },
          {
            label: "Festival Calendar",
            path: "/culture/festival-calendar",
            icon: "heroicons:calendar"
          },
          {
            label: "Things to Follow",
            path: "/culture/things-to-follow",
            icon: "heroicons:checklist"
          },
          {
            label: "Things to Remember",
            path: "/culture/things-to-remember",
            icon: "heroicons:light-bulb"
          },
          {
            label: "Daily Voice Guide",
            path: "/culture/daily-voice-guide",
            icon: "heroicons:microphone"
          },
          {
            label: "Lifestyle Guide",
            path: "/culture/lifestyle-guide",
            icon: "heroicons:home"
          },
          {
            label: "Places to Visit",
            path: "/culture/places-to-visit",
            icon: "heroicons:map-pin"
          },
          {
            label: "Kolam Patterns",
            path: "/culture/kolam",
            icon: "heroicons:sparkles"
          }
        ]
      },
      {
        id: "travel",
        label: "Travel",
        icon: "heroicons:map",
        color: "from-cyan-500 to-cyan-600",
        borderColor: "border-cyan-500/50",
        textColor: "text-cyan-600 dark:text-cyan-400",
        description: "Trips & Journeys",
        subTiles: [
          {
            label: "Travel Dashboard",
            path: "/travel",
            icon: "heroicons:map"
          },
          {
            label: "Trip History",
            path: "/travel/trips",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Community",
            path: "/travel/community",
            icon: "heroicons:users"
          },
          {
            label: "Leisure",
            path: "/travel/leisure",
            icon: "heroicons:sparkles"
          }
        ]
      },
      {
        id: "issues",
        label: "Issues",
        icon: "heroicons:exclamation-triangle",
        color: "from-red-500 to-red-600",
        borderColor: "border-red-500/50",
        textColor: "text-red-600 dark:text-red-400",
        description: "Problems & Maintenance",
        subTiles: [
          {
            label: "Issues Dashboard",
            path: "/issues",
            icon: "heroicons:exclamation-triangle"
          },
          {
            label: "Urgent Issues",
            path: "/issues/urgent",
            icon: "heroicons:bolt"
          },
          {
            label: "Repairs",
            path: "/issues/repairs",
            icon: "heroicons:wrench-screwdriver"
          },
          {
            label: "Upgrades",
            path: "/issues/upgrades",
            icon: "heroicons:arrow-trending-up"
          },
          {
            label: "Projects",
            path: "/issues/projects",
            icon: "heroicons:clipboard-document-list"
          },
          {
            label: "Maintenance",
            path: "/issues/maintenance",
            icon: "heroicons:cog"
          },
          {
            label: "Requests",
            path: "/issues/requests",
            icon: "heroicons:chat-bubble-left-right"
          }
        ]
      },
      {
        id: "memories",
        label: "Memories",
        icon: "heroicons:photo",
        color: "from-rose-500 to-rose-600",
        borderColor: "border-rose-500/50",
        textColor: "text-rose-600 dark:text-rose-400",
        description: "Family History & Stories",
        subTiles: [
          {
            label: "Memories Dashboard",
            path: "/memories",
            icon: "heroicons:photo"
          },
          {
            label: "Family Stories",
            path: "/memories/family-stories",
            icon: "heroicons:book-open"
          },
          {
            label: "Legacy",
            path: "/memories/legacy",
            icon: "heroicons:shield-check"
          },
          {
            label: "Family Governance",
            path: "/memories/family-governance",
            icon: "heroicons:scale"
          },
          {
            label: "Lifeflow",
            path: "/memories/lifeflow",
            icon: "heroicons:arrows-right-left"
          }
        ]
      }
    ];
    function isTileActive(tile) {
      return tile.subTiles.some((subTile) => store_get($$store_subs ??= {}, "$page", page).url.pathname === subTile.path);
    }
    mainTiles.find((tile) => isTileActive(tile));
    $$renderer2.push(`<div class="left-tile-bar flex h-screen bg-white/10 dark:bg-gray-900/20 border-r border-white/20 dark:border-gray-700/30 z-50 overflow-hidden flex-shrink-0" style="height: calc(100vh - 80px);"><div class="w-20 flex flex-col"><div class="p-2"><div class="flex flex-col gap-2"><!--[-->`);
    const each_array = ensure_array_like(mainTiles);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tile = each_array[$$index];
      $$renderer2.push(`<div class="relative"><button${attr_class(`tile-button group relative w-full aspect-square rounded-xl border-0 transition-all duration-300 hover:shadow-lg hover:scale-105 ${stringify(currentSection === tile.id ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100" : "")}`)}><div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(tile.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`, "svelte-wwrruu")}></div> <div class="relative flex flex-col items-center justify-center h-full p-2"><div${attr_class(`w-6 h-6 mb-1 ${stringify(tile.textColor)} group-hover:scale-110 transition-transform duration-300`, "svelte-wwrruu")}>`);
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
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
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
    const requestCategories = [
      {
        id: "issues",
        title: "Issues",
        icon: "heroicons:exclamation-triangle",
        color: "from-red-500 to-red-600",
        borderColor: "border-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        textColor: "text-red-700 dark:text-red-300",
        metric: "10",
        path: "/issues"
      },
      {
        id: "requests",
        title: "Requests",
        icon: "heroicons:cog-6-tooth",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-700 dark:text-blue-300",
        metric: "17",
        path: "/issues/requests"
      },
      {
        id: "expenses",
        title: "Expenses",
        icon: "heroicons:credit-card",
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-700 dark:text-emerald-300",
        metric: "₹8.3K",
        path: "/finances/expenses"
      },
      {
        id: "reminders",
        title: "Reminders",
        icon: "heroicons:bell-alert",
        color: "from-cyan-500 to-cyan-600",
        borderColor: "border-cyan-400",
        bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
        textColor: "text-cyan-700 dark:text-cyan-300",
        metric: "4",
        path: "/home/reminders"
      },
      {
        id: "savings",
        title: "Savings",
        icon: "heroicons:banknotes",
        color: "from-teal-500 to-teal-600",
        borderColor: "border-teal-400",
        bgColor: "bg-teal-50 dark:bg-teal-900/20",
        textColor: "text-teal-700 dark:text-teal-300",
        metric: "₹45K",
        path: "/finances"
      },
      {
        id: "tasks",
        title: "Tasks",
        icon: "heroicons:clipboard-document-list",
        color: "from-indigo-500 to-indigo-600",
        borderColor: "border-indigo-400",
        bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
        textColor: "text-indigo-700 dark:text-indigo-300",
        metric: "15",
        path: "/assistant/task-board"
      },
      {
        id: "bills",
        title: "Bills",
        icon: "heroicons:currency-rupee",
        color: "from-purple-500 to-purple-600",
        borderColor: "border-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-700 dark:text-purple-300",
        metric: "₹12.5K",
        path: "/finances"
      },
      {
        id: "events",
        title: "Events",
        icon: "heroicons:calendar-days",
        color: "from-pink-500 to-pink-600",
        borderColor: "border-pink-400",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        textColor: "text-pink-700 dark:text-pink-300",
        metric: "6",
        path: "/home/family-calendar-modern"
      }
    ];
    $$renderer2.push(`<div class="excel-ribbon fixed top-0 left-0 right-0 w-screen bg-white/10 dark:bg-gray-900/20 border-b border-white/20 dark:border-gray-700/30 z-50 svelte-1qkqwru"><div class="flex items-center px-6 py-3 min-h-[70px] max-w-full bg-gradient-to-r from-white/5 via-transparent to-white/5 svelte-1qkqwru"><div class="flex flex-col items-center space-y-2 flex-shrink-0 svelte-1qkqwru"><div class="relative flex items-center justify-center w-28 h-16 overflow-hidden shadow-lg rounded-lg svelte-1qkqwru" style="clip-path: polygon(50% 0%, 55% 15%, 70% 5%, 75% 25%, 90% 15%, 95% 35%, 100% 25%, 90% 45%, 100% 55%, 85% 65%, 95% 75%, 75% 85%, 85% 95%, 65% 90%, 50% 100%, 35% 90%, 15% 95%, 25% 85%, 5% 75%, 15% 65%, 0% 55%, 10% 45%, 0% 25%, 5% 35%, 10% 15%, 25% 25%, 30% 5%, 45% 15%);"><div class="absolute inset-0 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-lg svelte-1qkqwru"></div> <div class="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-transparent to-pink-200/40 svelte-1qkqwru"></div> <span class="text-sm font-bold text-white leading-tight relative z-10 drop-shadow-lg svelte-1qkqwru" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(255,255,255,0.4); font-family: 'Noto Sans Tamil', sans-serif; line-height: 1;">தாய்வழி</span></div> <div class="flex flex-col items-center text-center svelte-1qkqwru"><span class="text-xs font-medium bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent leading-tight opacity-80 svelte-1qkqwru">தமிழச்சி இல்லம்</span> <span class="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight opacity-80 svelte-1qkqwru">Home Maker</span></div></div> <div class="flex-1 flex justify-center mx-6 svelte-1qkqwru"><div class="flex justify-center gap-4 max-w-full svelte-1qkqwru"><!--[-->`);
    const each_array = ensure_array_like(requestCategories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button type="button" class="group relative bg-transparent border border-white/30 dark:border-gray-600/50 rounded-lg pt-2.5 pb-3 px-2 aspect-square cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 svelte-1qkqwru"><div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(category.color)} opacity-0 group-hover:opacity-20 rounded-md transition-all duration-300 group-hover:animate-pulse`, "svelte-1qkqwru")}></div> <div class="relative z-10 flex flex-col items-center justify-center h-full text-center w-full svelte-1qkqwru"><div class="mb-2 svelte-1qkqwru"><div class="bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full transition-all duration-300 svelte-1qkqwru"><span${attr_class(`text-[19.8px] font-sans font-bold ${stringify(category.textColor)} group-hover:scale-110 transition-transform duration-300`, "svelte-1qkqwru")} style="font-family: 'Segoe UI', 'Helvetica Neue', 'DIN Alternate', sans-serif;">${escape_html(category.metric)}</span></div></div> <div class="mt-2 svelte-1qkqwru"><span class="font-medium text-gray-900 dark:text-white text-xs leading-tight block transition-colors duration-300 svelte-1qkqwru">${escape_html(category.title)}</span></div></div> <div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(category.color)} opacity-0 group-active:opacity-30 rounded-lg transition-opacity duration-150 pointer-events-none`, "svelte-1qkqwru")}></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex items-center flex-shrink-0 svelte-1qkqwru"><div class="relative group svelte-1qkqwru"><button class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105 backdrop-blur-sm svelte-1qkqwru" title="Menu">`);
    Icon($$renderer2, {
      icon: "heroicons:bars-3",
      class: "w-6 h-6",
      style: "color: currentColor; fill: currentColor;"
    });
    $$renderer2.push(`<!----></button> <div class="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-gray-800/95 border border-gray-200/60 dark:border-gray-700/60 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm max-h-96 overflow-y-auto svelte-1qkqwru"><div class="p-3 svelte-1qkqwru"><div class="mb-4 svelte-1qkqwru"><div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 svelte-1qkqwru">Quick Actions</div> <button class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 svelte-1qkqwru">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "w-4 h-4 text-gray-500 flex-shrink-0"
    });
    $$renderer2.push(`<!----> <span class="svelte-1qkqwru">Search (Ctrl+F)</span></button> <button class="w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 svelte-1qkqwru">`);
    Icon($$renderer2, {
      icon: "heroicons:cog-6-tooth",
      class: "w-4 h-4 text-gray-500 flex-shrink-0"
    });
    $$renderer2.push(`<!----> <span class="svelte-1qkqwru">Settings (Ctrl+,)</span></button></div> <div class="mb-4 svelte-1qkqwru"><div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 svelte-1qkqwru">Theme</div> <div class="grid grid-cols-3 gap-1 svelte-1qkqwru"><button${attr_class(
      `flex flex-col items-center gap-1 p-2 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$theme", theme) === "light" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Light</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-2 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Dark</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-2 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$theme", theme) === "transparent" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-green-400 border border-transparent opacity-80 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Glass</span></button></div></div> <div class="mb-4 svelte-1qkqwru"><div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 svelte-1qkqwru">Background</div> <div class="grid grid-cols-4 gap-1 svelte-1qkqwru"><button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "transparent" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-transparent border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Trans</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "nature" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Nature</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "ocean" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-800 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Ocean</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "sunset" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Sunset</span></button></div> <div class="grid grid-cols-4 gap-1 mt-1 svelte-1qkqwru"><button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "mountain" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-t from-gray-400 to-gray-200 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Mount</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "forest" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-br from-green-600 to-green-800 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Forest</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "night" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Night</span></button> <button${attr_class(
      `flex flex-col items-center gap-1 p-1.5 rounded-lg text-center text-xs transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$background", background) === "gradient" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}`,
      "svelte-1qkqwru"
    )}><div class="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 border border-gray-300 svelte-1qkqwru"></div> <span class="svelte-1qkqwru">Grad</span></button></div></div> <div class="border-t border-gray-200 dark:border-gray-600 pt-3 svelte-1qkqwru"><div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 svelte-1qkqwru">Account</div> <div class="flex items-center gap-3 p-2 mb-2 svelte-1qkqwru"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm svelte-1qkqwru">U</div> <div class="flex-1 min-w-0 svelte-1qkqwru"><div class="text-sm font-medium text-gray-900 dark:text-white truncate svelte-1qkqwru">User Name</div> <div class="text-xs text-gray-500 dark:text-gray-400 truncate svelte-1qkqwru">user@example.com</div></div></div> <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 rounded-lg svelte-1qkqwru">Profile Settings</button> <button class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 rounded-lg svelte-1qkqwru">Preferences</button> <button class="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-colors duration-150 rounded-lg svelte-1qkqwru">Sign Out</button></div></div></div></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function DashboardTiles($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let dailyTasks = [
      {
        id: 1,
        task: "Prepare breakfast for children",
        priority: "high",
        assigned: "நான்",
        status: "completed",
        dueTime: "7:00 AM",
        icon: "heroicons:cake"
      },
      {
        id: 2,
        task: "Pack school lunch",
        priority: "high",
        assigned: "நான்",
        status: "in-progress",
        dueTime: "8:00 AM",
        icon: "heroicons:shopping-bag"
      },
      {
        id: 3,
        task: "Clean kitchen after dinner",
        priority: "medium",
        assigned: "மகள்",
        status: "pending",
        dueTime: "9:00 PM",
        icon: "heroicons:sparkles"
      },
      {
        id: 4,
        task: "Water garden plants",
        priority: "low",
        assigned: "மகன்",
        status: "pending",
        dueTime: "6:00 PM",
        icon: "heroicons:beaker"
      },
      {
        id: 5,
        task: "Take out trash",
        priority: "medium",
        assigned: "கணவர்",
        status: "pending",
        dueTime: "8:00 PM",
        icon: "heroicons:trash"
      }
    ];
    let billsDue = [
      {
        id: 1,
        bill: "Electricity Bill",
        amount: "₹2,450",
        dueDate: "Jan 15",
        status: "urgent",
        daysLeft: 2,
        icon: "heroicons:bolt",
        color: "text-red-600",
        bgColor: "bg-red-50"
      },
      {
        id: 2,
        bill: "Water Bill",
        amount: "₹890",
        dueDate: "Jan 18",
        status: "upcoming",
        daysLeft: 5,
        icon: "heroicons:droplets",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      {
        id: 3,
        bill: "Internet Subscription",
        amount: "₹1,200",
        dueDate: "Jan 25",
        status: "normal",
        daysLeft: 12,
        icon: "heroicons:wifi",
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      {
        id: 4,
        bill: "School Fees",
        amount: "₹15,000",
        dueDate: "Feb 5",
        status: "normal",
        daysLeft: 23,
        icon: "heroicons:academic-cap",
        color: "text-purple-600",
        bgColor: "bg-purple-50"
      }
    ];
    const upcomingEvents = [
      {
        title: "Temple Visit",
        date: "Tomorrow",
        time: "6:00 AM",
        icon: "heroicons:building-storefront",
        color: "text-orange-600"
      },
      {
        title: "School Parent Meeting",
        date: "Jan 18",
        time: "10:00 AM",
        icon: "heroicons:academic-cap",
        color: "text-blue-600"
      },
      {
        title: "Family Health Check",
        date: "Jan 20",
        time: "2:00 PM",
        icon: "heroicons:heart",
        color: "text-pink-600"
      },
      {
        title: "Pongal Festival",
        date: "Jan 15",
        time: "All Day",
        icon: "heroicons:fire",
        color: "text-red-600"
      }
    ];
    let familyMoods = [
      {
        member: "நான்",
        mood: "happy",
        emoji: "😊",
        note: "Productive day!",
        time: "2 hours ago"
      },
      {
        member: "கணவர்",
        mood: "tired",
        emoji: "😴",
        note: "Long day at work",
        time: "4 hours ago"
      },
      {
        member: "மகள்",
        mood: "excited",
        emoji: "🤩",
        note: "Got good grades!",
        time: "6 hours ago"
      },
      {
        member: "மகன்",
        mood: "playful",
        emoji: "🎮",
        note: "Playing games",
        time: "1 hour ago"
      }
    ];
    const expenseCategories = [
      {
        name: "Food & Grocery",
        icon: "heroicons:shopping-cart",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      {
        name: "Transportation",
        icon: "heroicons:truck",
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      {
        name: "Utilities",
        icon: "heroicons:bolt",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
      },
      {
        name: "Healthcare",
        icon: "heroicons:heart",
        color: "text-red-600",
        bgColor: "bg-red-50"
      },
      {
        name: "Education",
        icon: "heroicons:academic-cap",
        color: "text-purple-600",
        bgColor: "bg-purple-50"
      },
      {
        name: "Entertainment",
        icon: "heroicons:film",
        color: "text-pink-600",
        bgColor: "bg-pink-50"
      }
    ];
    let todaysPriorities = [
      {
        id: 1,
        type: "urgent",
        title: "Car Service Overdue",
        description: "Vehicle service due 2 months ago",
        priority: "high",
        dueIn: "Overdue",
        icon: "heroicons:wrench-screwdriver",
        color: "text-red-600",
        action: "Schedule Now"
      },
      {
        id: 2,
        type: "maintenance",
        title: "Water Filter Replacement",
        description: "Replace water filter cartridge",
        priority: "high",
        dueIn: "3 days",
        icon: "heroicons:droplets",
        color: "text-yellow-600",
        action: "Order Filter"
      },
      {
        id: 3,
        type: "insurance",
        title: "Health Insurance Renewal",
        description: "Family health insurance expires soon",
        priority: "high",
        dueIn: "15 days",
        icon: "heroicons:shield-check",
        color: "text-orange-600",
        action: "Renew Policy"
      },
      {
        id: 4,
        type: "tax",
        title: "Income Tax Filing",
        description: "Last date for tax filing approaching",
        priority: "medium",
        dueIn: "March 31",
        icon: "heroicons:document-text",
        color: "text-blue-600",
        action: "File Now"
      },
      {
        id: 5,
        type: "kyc",
        title: "Bank KYC Update",
        description: "Update KYC for savings account",
        priority: "medium",
        dueIn: "2 weeks",
        icon: "heroicons:identification",
        color: "text-purple-600",
        action: "Update KYC"
      },
      {
        id: 6,
        type: "cleaning",
        title: "Monthly Deep Cleaning",
        description: "Schedule professional house cleaning",
        priority: "low",
        dueIn: "This weekend",
        icon: "heroicons:sparkles",
        color: "text-green-600",
        action: "Book Service"
      },
      {
        id: 7,
        type: "stock",
        title: "Low Kitchen Stock",
        description: "Rice, oil, and spices running low",
        priority: "medium",
        dueIn: "Buy soon",
        icon: "heroicons:shopping-cart",
        color: "text-amber-600",
        action: "Add to List"
      },
      {
        id: 8,
        type: "school",
        title: "School Documents Printing",
        description: "Print admission forms and certificates",
        priority: "low",
        dueIn: "Next week",
        icon: "heroicons:printer",
        color: "text-indigo-600",
        action: "Print Now"
      }
    ];
    const upcomingImportantDates = [
      {
        title: "Children's Birthday",
        date: "Jan 25",
        type: "birthday",
        icon: "heroicons:cake",
        color: "text-pink-600"
      },
      {
        title: "Wedding Anniversary",
        date: "Feb 14",
        type: "anniversary",
        icon: "heroicons:heart",
        color: "text-red-600"
      },
      {
        title: "Insurance Premium Due",
        date: "Feb 20",
        type: "insurance",
        icon: "heroicons:shield-check",
        color: "text-blue-600"
      },
      {
        title: "Tax Payment Deadline",
        date: "March 31",
        type: "tax",
        icon: "heroicons:currency-rupee",
        color: "text-green-600"
      },
      {
        title: "School Annual Day",
        date: "March 15",
        type: "event",
        icon: "heroicons:academic-cap",
        color: "text-purple-600"
      }
    ];
    let smartSuggestions = [
      {
        id: 1,
        message: "School term fees payment due in 2 weeks - ₹15,000 for both children",
        action: "Pay School Fees",
        icon: "heroicons:academic-cap",
        priority: "high",
        category: "education"
      },
      {
        id: 2,
        message: "Health insurance renewal due in 15 days - Family coverage ₹8,500",
        action: "Renew Insurance",
        icon: "heroicons:shield-check",
        priority: "high",
        category: "insurance"
      },
      {
        id: 3,
        message: "Book LPG refill - Current cylinder usage at 85%",
        action: "Book Refill",
        icon: "heroicons:fire",
        priority: "medium",
        category: "household"
      },
      {
        id: 4,
        message: "KYC update required for savings account - Due in 2 weeks",
        action: "Update KYC",
        icon: "heroicons:identification",
        priority: "medium",
        category: "banking"
      },
      {
        id: 5,
        message: "Monthly deep cleaning service - Schedule for this weekend",
        action: "Book Cleaning",
        icon: "heroicons:sparkles",
        priority: "low",
        category: "maintenance"
      },
      {
        id: 6,
        message: "Tax filing deadline approaching - March 31 for FY 2024-25",
        action: "File Taxes",
        icon: "heroicons:document-text",
        priority: "medium",
        category: "tax"
      },
      {
        id: 7,
        message: "Maha Shivaratri in 3 days - Prepare for all-night vigil and special puja",
        action: "Plan Festival",
        icon: "heroicons:moon",
        priority: "high",
        category: "festival"
      },
      {
        id: 8,
        message: "Vehicle service overdue by 2 months - Schedule immediately",
        action: "Book Service",
        icon: "heroicons:wrench-screwdriver",
        priority: "high",
        category: "vehicle"
      }
    ];
    function getBillUrgencyColor(daysLeft) {
      if (daysLeft <= 2) return "bg-red-50 border-red-200";
      if (daysLeft <= 7) return "bg-yellow-50 border-yellow-200";
      return "bg-gray-50 border-gray-200";
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"><div class="flex items-center justify-between"><div><h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:home", class: "text-indigo-600" });
    $$renderer2.push(`<!----> <span class="text-2xl font-bold text-orange-600 mr-2">ShivOhm</span> வணக்கம்! Divine Nest</h1> <p class="text-gray-600 dark:text-gray-300 text-lg">Your comprehensive family management dashboard</p> <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">தமிழ் நாள்: ${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("ta-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }))}</p></div> <div class="text-right"><div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString())}</div> <div class="text-sm text-gray-500 dark:text-gray-400">Today's Date</div></div></div></div></div> <div class="mb-8">`);
    if (billsDue.filter((b) => b.status !== "paid" && b.daysLeft <= 3).length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-8 mb-6 shadow-2xl border-4 border-red-300 animate-pulse"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="p-4 bg-white/20 rounded-full">`);
      Icon($$renderer2, { icon: "heroicons:exclamation-triangle", class: "text-4xl" });
      $$renderer2.push(`<!----></div> <div><h2 class="text-3xl font-bold mb-2">⚠️ URGENT PAYMENTS DUE</h2> <p class="text-xl opacity-90">${escape_html(billsDue.filter((b) => b.status !== "paid" && b.daysLeft <= 3).length)} bill(s) due within 3 days
                  • Total: ₹${escape_html(billsDue.filter((b) => b.status !== "paid" && b.daysLeft <= 3).reduce((sum, b) => sum + parseInt(b.amount.replace(/[₹,]/g, "")), 0).toLocaleString())}</p></div></div> <button class="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg">Pay Now →</button></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (dailyTasks.filter((t) => t.status === "pending" && t.priority === "high").length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 mb-6 shadow-xl border-4 border-orange-300"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="p-3 bg-white/20 rounded-full">`);
      Icon($$renderer2, { icon: "heroicons:clock", class: "text-3xl" });
      $$renderer2.push(`<!----></div> <div><h3 class="text-2xl font-bold mb-1">High Priority Tasks Pending</h3> <p class="text-lg opacity-90">${escape_html(dailyTasks.filter((t) => t.status === "pending" && t.priority === "high").length)} urgent task(s) need attention</p></div></div> <button class="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200">View Tasks →</button></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-blue-200 dark:border-blue-800"><h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "text-blue-600 text-3xl"
    });
    $$renderer2.push(`<!----> Today's Priorities</h3> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(todaysPriorities.slice(0, 4));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let priority = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border-l-4 ${stringify(priority.priority === "high" ? "border-red-500" : priority.priority === "medium" ? "border-yellow-500" : "border-green-500")}`)}><div class="flex items-center gap-4"><div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, {
        icon: priority.icon,
        class: `text-xl ${stringify(priority.color)}`
      });
      $$renderer2.push(`<!----></div> <div class="flex-1"><p class="font-semibold text-gray-800 dark:text-white text-lg">${escape_html(priority.title)}</p> <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${escape_html(priority.description)}</p> <div class="flex items-center gap-4 text-sm"><span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">`);
      Icon($$renderer2, { icon: "heroicons:clock", class: "text-xs" });
      $$renderer2.push(`<!----> ${escape_html(priority.dueIn)}</span> <span${attr_class(`px-3 py-1 text-xs rounded-full font-medium ${stringify(priority.priority === "high" ? "bg-red-100 text-red-600" : priority.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600")}`)}>${escape_html(priority.priority.toUpperCase())}</span></div></div></div> <button class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">${escape_html(priority.action)}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600"><div class="grid grid-cols-3 gap-4 text-center"><div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"><div class="text-2xl font-bold text-red-600 dark:text-red-400">${escape_html(todaysPriorities.filter((p) => p.priority === "high").length)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">High Priority</div></div> <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"><div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${escape_html(todaysPriorities.filter((p) => p.priority === "medium").length)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Medium Priority</div></div> <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><div class="text-2xl font-bold text-green-600 dark:text-green-400">${escape_html(todaysPriorities.filter((p) => p.priority === "low").length)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Low Priority</div></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-green-200 dark:border-green-800"><h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "text-green-600 text-3xl"
    });
    $$renderer2.push(`<!----> Upcoming Bills &amp; Reminders</h3> <div class="space-y-4 mb-6"><!--[-->`);
    const each_array_1 = ensure_array_like(billsDue.filter((b) => b.status !== "paid").slice(0, 3));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let bill = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800"><div class="flex items-center gap-4"><div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, { icon: bill.icon, class: `text-xl ${stringify(bill.color)}` });
      $$renderer2.push(`<!----></div> <div><p class="font-semibold text-gray-800 dark:text-white text-lg">${escape_html(bill.bill)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(bill.amount)} • Due ${escape_html(bill.dueDate)}</p> <div class="flex items-center gap-2 mt-1"><span${attr_class(`px-2 py-1 text-xs rounded-full font-medium ${stringify(bill.daysLeft <= 2 ? "bg-red-100 text-red-600" : bill.daysLeft <= 7 ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600")}`)}>${escape_html(bill.daysLeft)} days left</span></div></div></div> <button class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors">Pay Now</button></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="border-t border-gray-200 dark:border-gray-600 pt-6"><h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:star", class: "text-yellow-500" });
    $$renderer2.push(`<!----> Important Dates</h4> <div class="space-y-3"><!--[-->`);
    const each_array_2 = ensure_array_like(upcomingImportantDates.slice(0, 3));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let date = each_array_2[$$index_2];
      $$renderer2.push(`<div class="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"><div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, { icon: date.icon, class: `text-lg ${stringify(date.color)}` });
      $$renderer2.push(`<!----></div> <div><p class="font-medium text-gray-800 dark:text-white">${escape_html(date.title)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(date.date)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:currency-rupee", class: "text-red-500" });
    $$renderer2.push(`<!----> Bills Timeline</h3> <div class="space-y-3 mb-4"><!--[-->`);
    const each_array_3 = ensure_array_like(billsDue.filter((b) => b.status !== "paid").slice(0, 4));
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let bill = each_array_3[$$index_3];
      $$renderer2.push(`<div${attr_class(`flex items-center justify-between p-3 ${stringify(getBillUrgencyColor(bill.daysLeft))} rounded-lg`)}><div class="flex items-center gap-3"><div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, { icon: bill.icon, class: `text-lg ${stringify(bill.color)}` });
      $$renderer2.push(`<!----></div> <div><p class="text-sm font-medium text-gray-800 dark:text-white">${escape_html(bill.bill)}</p> <p class="text-xs text-gray-600 dark:text-gray-400">${escape_html(bill.amount)} • Due ${escape_html(bill.dueDate)}</p></div></div> <div class="text-right"><div${attr_class(`text-xs font-medium ${stringify(bill.daysLeft <= 2 ? "text-red-600" : bill.daysLeft <= 7 ? "text-yellow-600" : "text-gray-600")}`)}>${escape_html(bill.daysLeft)}d left</div> `);
      if (bill.daysLeft <= 7) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors mt-1">Pay</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="pt-3 border-t border-gray-200 dark:border-gray-600"><div class="grid grid-cols-2 gap-4 text-center"><div><div class="text-lg font-bold text-red-600 dark:text-red-400">${escape_html(billsDue.filter((b) => b.status !== "paid").length)}</div> <div class="text-xs text-gray-600 dark:text-gray-400">Pending</div></div> <div><div class="text-lg font-bold text-orange-600 dark:text-orange-400">₹${escape_html(billsDue.filter((b) => b.status !== "paid").reduce((sum, b) => sum + parseInt(b.amount.replace(/[₹,]/g, "")), 0).toLocaleString())}</div> <div class="text-xs text-gray-600 dark:text-gray-400">Total Due</div></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "text-indigo-500" });
    $$renderer2.push(`<!----> Upcoming Events</h3> <div class="space-y-4"><!--[-->`);
    const each_array_4 = ensure_array_like(upcomingEvents.slice(0, 3));
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let event = each_array_4[$$index_4];
      $$renderer2.push(`<div class="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800"><div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, {
        icon: event.icon,
        class: `text-xl ${stringify(event.color)}`
      });
      $$renderer2.push(`<!----></div> <div class="flex-1"><h4 class="font-semibold text-gray-800 dark:text-white text-lg">${escape_html(event.title)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(event.date)} at ${escape_html(event.time)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "text-orange-500" });
    $$renderer2.push(`<!----> Ritual Calendar</h3> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div> <span class="ml-2 text-gray-600 dark:text-gray-400">Loading rituals...</span></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600"><p class="text-xs text-gray-600 dark:text-gray-400 text-center">🪔 Amavasya • Pradosham • Ekadasi • Festivals</p></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:light-bulb", class: "text-amber-500" });
    $$renderer2.push(`<!----> AI Insights &amp; Suggestions</h3> <div class="space-y-4"><!--[-->`);
    const each_array_6 = ensure_array_like(smartSuggestions);
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let suggestion = each_array_6[$$index_6];
      $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800"><div class="flex items-center gap-3"><div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, { icon: suggestion.icon, class: "text-lg text-amber-600" });
      $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800 dark:text-white">${escape_html(suggestion.message)}</p> <p class="text-xs text-gray-600 dark:text-gray-400">AI-powered suggestion</p></div></div> <button class="px-3 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors font-medium">${escape_html(suggestion.action)}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:face-smile", class: "text-purple-500" });
    $$renderer2.push(`<!----> Family Mood &amp; Quick Actions</h3> <div class="grid grid-cols-2 gap-4 mb-4"><!--[-->`);
    const each_array_7 = ensure_array_like(familyMoods.slice(0, 4));
    for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
      let mood = each_array_7[$$index_7];
      $$renderer2.push(`<div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"><div class="text-2xl mb-2">${escape_html(mood.emoji)}</div> <div class="text-sm font-medium text-gray-800 dark:text-white">${escape_html(mood.member)}</div> <div class="text-xs text-gray-600 dark:text-gray-400">${escape_html(mood.time)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex gap-2 mb-4"><button class="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">Update My Mood</button> <button class="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">View Details</button></div> <div class="pt-3 border-t border-gray-200 dark:border-gray-600"><div class="text-center"><div class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">₹2,450 / ₹3,000</div> <div class="text-xs text-gray-600 dark:text-gray-400">Today's Budget • ₹550 remaining</div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "text-gray-500" });
    $$renderer2.push(`<!----> Recent Activity</h3> <div class="space-y-3"><div class="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="p-1 bg-blue-100 dark:bg-blue-900/20 rounded">`);
    Icon($$renderer2, {
      icon: "heroicons:shopping-bag",
      class: "text-blue-500 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800 dark:text-white">Grocery shopping completed</p> <p class="text-xs text-gray-600 dark:text-gray-400">2 hours ago • ₹2,450</p></div></div> <div class="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="p-1 bg-green-100 dark:bg-green-900/20 rounded">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-sm"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800 dark:text-white">School fees paid</p> <p class="text-xs text-gray-600 dark:text-gray-400">Yesterday • ₹15,000</p></div></div> <div class="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="p-1 bg-purple-100 dark:bg-purple-900/20 rounded">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "text-purple-500 text-sm" });
    $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800 dark:text-white">Temple visit scheduled</p> <p class="text-xs text-gray-600 dark:text-gray-400">Tomorrow • 6:00 AM</p></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "text-indigo-500" });
    $$renderer2.push(`<!----> Upcoming Events</h3> <div class="space-y-3"><div class="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><div><p class="text-sm font-medium text-gray-800 dark:text-white">Pongal Celebration</p> <p class="text-xs text-gray-600 dark:text-gray-400">Jan 15 • Family Event</p></div> <div class="text-right"><div class="text-xs font-medium text-indigo-600 dark:text-indigo-400">3 days</div></div></div> <div class="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg"><div><p class="text-sm font-medium text-gray-800 dark:text-white">Medical Checkup</p> <p class="text-xs text-gray-600 dark:text-gray-400">Jan 20 • Health</p></div> <div class="text-right"><div class="text-xs font-medium text-pink-600 dark:text-pink-400">8 days</div></div></div> <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><div><p class="text-sm font-medium text-gray-800 dark:text-white">Garden Maintenance</p> <p class="text-xs text-gray-600 dark:text-gray-400">Jan 25 • Home</p></div> <div class="text-right"><div class="text-xs font-medium text-green-600 dark:text-green-400">13 days</div></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "text-teal-500" });
    $$renderer2.push(`<!----> Quick Stats</h3> <div class="grid grid-cols-2 gap-4"><div class="text-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg"><div class="text-xl font-bold text-teal-600 dark:text-teal-400 mb-1">12</div> <div class="text-xs text-gray-600 dark:text-gray-400">Tasks Completed</div> <div class="text-xs text-green-600 dark:text-green-400">This Week</div></div> <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><div class="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">8</div> <div class="text-xs text-gray-600 dark:text-gray-400">Meals Prepared</div> <div class="text-xs text-green-600 dark:text-green-400">This Week</div></div> <div class="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-1">5</div> <div class="text-xs text-gray-600 dark:text-gray-400">Family Outings</div> <div class="text-xs text-green-600 dark:text-green-400">This Month</div></div> <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">98%</div> <div class="text-xs text-gray-600 dark:text-gray-400">Budget Adherence</div> <div class="text-xs text-green-600 dark:text-green-400">This Month</div></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:bell-alert", class: "text-orange-500" });
    $$renderer2.push(`<!----> Standard Reminders Reference</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:currency-rupee", class: "text-blue-600" });
    $$renderer2.push(`<!----> Financial &amp; Admin</h4> <div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">School fees (quarterly)</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Insurance renewal (annual)</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Tax filing (March 31)</span></div></div></div> <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><h4 class="font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "text-orange-600" });
    $$renderer2.push(`<!----> Cultural &amp; Rituals</h4> <div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Festival preparations</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Temple visit planning</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Panchangam tracking</span></div></div></div> <div class="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg"><h4 class="font-semibold text-pink-800 dark:text-pink-200 mb-3 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "text-pink-600" });
    $$renderer2.push(`<!----> Family &amp; Health</h4> <div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Doctor appointments</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Medication refills</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">School form submissions</span></div></div></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"><h4 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:wrench-screwdriver",
      class: "text-green-600"
    });
    $$renderer2.push(`<!----> Home Maintenance</h4> <div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Deep cleaning (monthly)</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Pest control (quarterly)</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Appliance servicing</span></div></div></div> <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:truck", class: "text-purple-600" });
    $$renderer2.push(`<!----> Vehicle &amp; Travel</h4> <div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Fast tag recharge</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Fuel monitoring</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Festival travel planning</span></div></div></div> <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><h4 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-3 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "text-indigo-600" });
    $$renderer2.push(`<!----> Relationships</h4> <div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Call elderly relatives</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Anniversary planning</span></div> <div class="flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "text-green-500 text-xs"
    });
    $$renderer2.push(`<!----> <span class="text-gray-700 dark:text-gray-300">Family prayer sessions</span></div></div></div></div> <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"><p class="text-sm text-gray-600 dark:text-gray-400 text-center">💡 These reminders are automatically suggested based on South Indian family lifestyle patterns</p></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:light-bulb", class: "text-amber-500" });
    $$renderer2.push(`<!----> Smart Suggestions</h3> <div class="space-y-4"><!--[-->`);
    const each_array_8 = ensure_array_like(smartSuggestions);
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let suggestion = each_array_8[$$index_8];
      $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800"><div class="flex items-center gap-3"><div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">`);
      Icon($$renderer2, { icon: suggestion.icon, class: "text-lg text-amber-600" });
      $$renderer2.push(`<!----></div> <div class="flex-1"><p class="text-sm font-medium text-gray-800 dark:text-white">${escape_html(suggestion.message)}</p> <p class="text-xs text-gray-600 dark:text-gray-400">AI-powered suggestion</p></div></div> <button class="px-3 py-1 bg-amber-500 text-white text-xs rounded-full hover:bg-amber-600 transition-colors">${escape_html(suggestion.action)}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:credit-card", class: "text-emerald-500" });
    $$renderer2.push(`<!----> Quick Expense Entry</h3> <div class="grid grid-cols-2 gap-3 mb-4"><!--[-->`);
    const each_array_9 = ensure_array_like(expenseCategories);
    for (let $$index_9 = 0, $$length = each_array_9.length; $$index_9 < $$length; $$index_9++) {
      let category = each_array_9[$$index_9];
      $$renderer2.push(`<button${attr_class(`p-3 ${stringify(category.bgColor)} dark:bg-opacity-20 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105`)}>`);
      Icon($$renderer2, {
        icon: category.icon,
        class: `text-xl ${stringify(category.color)} mb-2`
      });
      $$renderer2.push(`<!----> <div class="text-xs font-medium text-gray-800 dark:text-white">${escape_html(category.name)}</div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex gap-2"><input type="number" placeholder="Amount (₹)" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"/> <button class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Add</button></div> <div class="mt-4 text-xs text-gray-600 dark:text-gray-400">Today's expenses: ₹2,450 • Budget remaining: ₹14,770</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"><h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "text-purple-500" });
    $$renderer2.push(`<!----> Quick Actions</h3> <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"><button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:clipboard-document-list", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Add Task</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:document-text", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">New Note</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Schedule</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:bell-alert", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Reminder</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Health</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:credit-card", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Expense</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">Grocery</span></button> <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">`);
    Icon($$renderer2, { icon: "heroicons:chat-bubble-left-right", class: "text-xl" });
    $$renderer2.push(`<!----> <span class="text-sm font-medium">AI Help</span></button></div></div> <div class="mt-8 text-center"><div class="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800"><blockquote class="text-lg font-medium text-gray-800 dark:text-white italic mb-2">"குடும்பம் ஒன்று கூடினால், குறைவொன்றும் இல்லை"</blockquote> <cite class="text-sm text-gray-600 dark:text-gray-400">— திருக்குறள் (Family unity brings prosperity)</cite></div></div></div></div>`);
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
    themeActions.init();
    backgroundActions.init();
    currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    $$renderer2.push(`<div class="relative flex h-screen bg-base-200 svelte-b38hhi"${attr("data-theme", store_get($$store_subs ??= {}, "$theme", theme))}><div${attr_class(`fixed inset-0 ${stringify(store_get($$store_subs ??= {}, "$theme", theme) === "transparent" ? "transparent-background" : "")} nature-background z-0`, "svelte-b38hhi")} style="--background-png: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')"></div> <div class="relative z-10 flex w-full"><div class="fixed top-0 left-0 right-0 z-50">`);
    TopNavigationBar($$renderer2);
    $$renderer2.push(`<!----></div> <div class="flex-shrink-0 pt-32">`);
    LeftTileBar($$renderer2);
    $$renderer2.push(`<!----></div> <div class="flex-1 flex flex-col overflow-hidden pt-32"><main class="flex-1 scrollable-container bg-transparent svelte-b38hhi">`);
    if (currentPath === "/") {
      $$renderer2.push("<!--[-->");
      DashboardTiles($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="p-4 sm:p-6 lg:p-8 relative"><div class="content-container rounded-[2rem] border-0 p-6 sm:p-8 svelte-b38hhi"><div class="mb-6 flex items-center space-x-2 text-sm"><button class="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Home</span></button> `);
      Icon($$renderer2, {
        icon: "heroicons:chevron-right",
        class: "w-4 h-4 text-gray-400"
      });
      $$renderer2.push(`<!----> <span class="text-gray-600 dark:text-gray-300 capitalize">${escape_html(currentPath.startsWith("/home/") ? currentPath.replace("/home/", "").split("/").filter(Boolean).join(" › ") : currentPath.split("/").filter(Boolean).join(" › "))}</span></div> <!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></main></div> <div class="flex-shrink-0"></div> `);
    FloatingActionButtons($$renderer2);
    $$renderer2.push(`<!----> <div class="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50"><a href="https://www.gurukulavasam.org" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 flex items-center space-x-1"><span>Gurukulavasam</span> <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    DashboardLayout($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        slot($$renderer3, $$props, "default", {});
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
  });
}
export {
  _layout as default
};
