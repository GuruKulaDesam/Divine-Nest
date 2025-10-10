import { a as ensure_array_like, b as attr_class, s as stringify, c as store_get, u as unsubscribe_stores, d as attr, f as slot } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import { $ as $locale, r as registerLocaleLoader, i as init, w as waitLocale } from "../../chunks/runtime.js";
import { I as Icon } from "../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { T as escape_html } from "../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { p as page } from "../../chunks/stores.js";
import { t as theme, a as themeActions } from "../../chunks/theme.js";
import { b as background, a as backgroundActions } from "../../chunks/background.js";
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
        id: "urgents",
        title: "Urgents",
        icon: "heroicons:exclamation-triangle",
        color: "from-red-500 to-red-600",
        borderColor: "border-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        textColor: "text-red-700 dark:text-red-300",
        metric: "3",
        path: "/issues/urgent"
      },
      {
        id: "repairs",
        title: "Repairs",
        icon: "heroicons:wrench-screwdriver",
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-700 dark:text-orange-300",
        metric: "7",
        path: "/issues/repairs"
      },
      {
        id: "inventory",
        title: "Inventory",
        icon: "heroicons:archive-box",
        color: "from-yellow-500 to-yellow-600",
        borderColor: "border-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-700 dark:text-yellow-300",
        metric: "8",
        path: "/inventory"
      },
      {
        id: "maintenance",
        title: "Maintenance",
        icon: "heroicons:cog-6-tooth",
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-700 dark:text-blue-300",
        metric: "12",
        path: "/issues/maintenance"
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
      },
      {
        id: "upgrades",
        title: "Upgrades",
        icon: "heroicons:arrow-trending-up",
        color: "from-green-500 to-green-600",
        borderColor: "border-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-700 dark:text-green-300",
        metric: "5",
        path: "/issues/upgrades"
      },
      {
        id: "assets",
        title: "Assets",
        icon: "heroicons:building-office",
        color: "from-amber-500 to-amber-600",
        borderColor: "border-amber-400",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        textColor: "text-amber-700 dark:text-amber-300",
        metric: "₹2.5L",
        path: "/assets"
      }
    ];
    $$renderer2.push(`<div class="excel-ribbon fixed top-0 left-0 right-0 w-screen bg-white/10 dark:bg-gray-900/20 border-b border-white/20 dark:border-gray-700/30 z-50 svelte-1qkqwru"><div class="flex items-center px-6 py-3 min-h-[70px] max-w-full bg-gradient-to-r from-white/5 via-transparent to-white/5 svelte-1qkqwru"><div class="flex flex-col items-center space-y-2 flex-shrink-0 svelte-1qkqwru"><div class="relative flex items-center justify-center w-28 h-16 overflow-hidden shadow-lg rounded-lg svelte-1qkqwru" style="clip-path: polygon(50% 0%, 55% 15%, 70% 5%, 75% 25%, 90% 15%, 95% 35%, 100% 25%, 90% 45%, 100% 55%, 85% 65%, 95% 75%, 75% 85%, 85% 95%, 65% 90%, 50% 100%, 35% 90%, 15% 95%, 25% 85%, 5% 75%, 15% 65%, 0% 55%, 10% 45%, 0% 25%, 5% 35%, 10% 15%, 25% 25%, 30% 5%, 45% 15%);"><div class="absolute inset-0 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-lg svelte-1qkqwru"></div> <div class="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-transparent to-pink-200/40 svelte-1qkqwru"></div> <span class="text-sm font-bold text-white leading-tight relative z-10 drop-shadow-lg svelte-1qkqwru" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(255,255,255,0.4); font-family: 'Noto Sans Tamil', sans-serif; line-height: 1;">தாய்வழி</span></div> <div class="flex flex-col items-center text-center svelte-1qkqwru"><span class="text-xs font-medium bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent leading-tight opacity-80 svelte-1qkqwru">தமிழச்சி இல்லம்</span> <span class="text-sm font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight opacity-80 svelte-1qkqwru">Home Maker</span></div></div> <div class="flex-1 flex justify-center mx-6 svelte-1qkqwru"><div class="grid grid-cols-12 grid-rows-1 gap-2 max-w-full svelte-1qkqwru"><!--[-->`);
    const each_array = ensure_array_like(requestCategories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`group relative bg-transparent border border-dashed ${stringify(category.borderColor)} rounded-lg pt-2.5 pb-3 px-2 aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 hover:rotate-1 flex flex-col items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`, "svelte-1qkqwru")}><div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(category.color)} opacity-0 group-hover:opacity-20 rounded-md transition-all duration-300 group-hover:animate-pulse`, "svelte-1qkqwru")}></div> <div class="relative z-10 flex flex-col items-center justify-center h-full text-center w-full svelte-1qkqwru"><div class="mb-2 svelte-1qkqwru"><div class="bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full shadow-sm transition-all duration-300 svelte-1qkqwru"><span${attr_class(`text-[19.8px] font-sans font-bold ${stringify(category.textColor)} group-hover:scale-110 transition-transform duration-300`, "svelte-1qkqwru")} style="font-family: 'Segoe UI', 'Helvetica Neue', 'DIN Alternate', sans-serif;">${escape_html(category.metric)}</span></div></div> <div class="mt-2 svelte-1qkqwru"><span class="font-medium text-gray-900 dark:text-white text-xs leading-tight block transition-colors duration-300 svelte-1qkqwru">${escape_html(category.title)}</span></div></div> <div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(category.color)} opacity-0 group-active:opacity-30 rounded-lg transition-opacity duration-150 pointer-events-none`, "svelte-1qkqwru")}></div></button>`);
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
            path: "/divinity/panchangam",
            icon: "heroicons:sun"
          },
          {
            label: "Rituals",
            path: "/divinity/rituals",
            icon: "heroicons:sparkles"
          },
          {
            label: "Temple Visits",
            path: "/divinity/temple",
            icon: "heroicons:building-storefront"
          },
          {
            label: "Festival Calendar",
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
            path: "/food/meals",
            icon: "heroicons:calendar-days"
          },
          {
            label: "Recipes",
            path: "/food/recipes",
            icon: "heroicons:book-open"
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
    $$renderer2.push(`<!----> 🏠 Home Management Dashboard</h1> <p class="text-gray-600 text-lg">Manage your household, family, and daily activities</p></div> <div class="flex gap-6"><div class="w-60 flex-shrink-0"><div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
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
