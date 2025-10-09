import { a as ensure_array_like, b as attr_class, s as stringify, j as attr_style } from "./index2.js";
import "./router.js";
import { I as Icon } from "./Icon.js";
import "./theme.js";
import { f as familyMembers, t as totalMonthlyRecharges, a as totalYearlyRenewals } from "./notificationService.js";
import { e as escape_html } from "./context.js";
const savingsGoals = [
  {
    id: "sg001",
    title: "Akka College Fees",
    tamil_title: "அக்கா கல்லூரி கட்டணம்",
    target_amount: 5e5,
    current_amount: 125e3,
    target_date: "2026-06-01",
    category: "education",
    priority: "high",
    contributors: ["appa", "amma", "thatha"],
    monthly_target: 15625
  },
  {
    id: "sg002",
    title: "Emergency Fund",
    tamil_title: "அவசர நிதி",
    target_amount: 2e5,
    current_amount: 75e3,
    target_date: "2025-12-31",
    category: "emergency",
    priority: "high",
    contributors: ["appa", "amma"],
    monthly_target: 6250
  },
  {
    id: "sg003",
    title: "Goa Family Trip",
    tamil_title: "குடும்ப கோவா பயணம்",
    target_amount: 8e4,
    current_amount: 32e3,
    target_date: "2025-12-20",
    category: "travel",
    priority: "medium",
    contributors: ["all_family"],
    monthly_target: 2400
  }
];
function FinancesPageEnhanced($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalFamilyBudget, totalSavings, totalSavingsTarget;
    let activeSection = "dashboard";
    const financeSections = [
      {
        id: "dashboard",
        name: "Dashboard",
        tamil: "முதன்மை பக்கம்",
        icon: "heroicons:home",
        color: "blue",
        description: "Overview of all finances"
      },
      {
        id: "expenses",
        name: "Daily Expenses",
        tamil: "தினசரி செலவுகள்",
        icon: "heroicons:shopping-cart",
        color: "green",
        description: "Track groceries, pooja, daily needs"
      },
      {
        id: "budget",
        name: "Monthly Budget",
        tamil: "மாதாந்திர பட்ஜெட்",
        icon: "heroicons:calendar-days",
        color: "purple",
        description: "Plan and forecast monthly spending"
      },
      {
        id: "savings",
        name: "Savings Goals",
        tamil: "சேமிப்பு இலக்குகள்",
        icon: "heroicons:banknotes",
        color: "teal",
        description: "Education, travel, emergency funds"
      },
      {
        id: "wealth",
        name: "Gold & Silver",
        tamil: "தங்கம் & வெள்ளி",
        icon: "heroicons:sparkles",
        color: "yellow",
        description: "Track jewelry, coins, investments"
      },
      {
        id: "recharges",
        name: "Recharges & Bills",
        tamil: "ரீசார்ஜ் & பில்கள்",
        icon: "heroicons:device-phone-mobile",
        color: "orange",
        description: "Mobile, broadband, subscriptions"
      },
      {
        id: "insurance",
        name: "Insurance",
        tamil: "காப்பீடு",
        icon: "heroicons:shield-check",
        color: "red",
        description: "Health, life, vehicle coverage"
      },
      {
        id: "property",
        name: "Property & Dues",
        tamil: "சொத்து & வரிகள்",
        icon: "heroicons:home-modern",
        color: "brown",
        description: "House tax, civic dues, documents"
      },
      {
        id: "milestones",
        name: "Milestone Planning",
        tamil: "விழா திட்டமிடல்",
        icon: "heroicons:gift",
        color: "pink",
        description: "Weddings, ceremonies, events"
      },
      {
        id: "festivals",
        name: "Festival Planner",
        tamil: "திருவிழா திட்டம்",
        icon: "heroicons:fire",
        color: "orange",
        description: "Diwali, Pongal, Navaratri budgets"
      },
      {
        id: "gifts",
        name: "Gifting Ledger",
        tamil: "பரிசு பதிவேடு",
        icon: "heroicons:heart",
        color: "purple",
        description: "Track gifts and blessings"
      },
      {
        id: "vendors",
        name: "Vendor Directory",
        tamil: "விற்பனையாளர் பட்டியல்",
        icon: "heroicons:phone",
        color: "indigo",
        description: "Trusted contacts and suppliers"
      },
      {
        id: "documents",
        name: "Document Vault",
        tamil: "ஆவண பாதுகாப்பு",
        icon: "heroicons:folder",
        color: "gray",
        description: "Important papers and renewals"
      },
      {
        id: "resilience",
        name: "Emergency Prep",
        tamil: "அவசர தயாரிப்பு",
        icon: "heroicons:exclamation-triangle",
        color: "red",
        description: "Monsoon, power cuts, emergencies"
      },
      {
        id: "income",
        name: "Income & Business",
        tamil: "வருமானம் & தொழில்",
        icon: "heroicons:currency-rupee",
        color: "green",
        description: "Kolam classes, tutoring, freelance"
      },
      {
        id: "ai",
        name: "AI Assistant",
        tamil: "AI உதவியாளர்",
        icon: "heroicons:cpu-chip",
        color: "blue",
        description: "Smart insights and reminders"
      }
    ];
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    let currentMonth = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    totalFamilyBudget = familyMembers.reduce((sum, member) => sum + member.monthlyBudget, 0);
    totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current_amount, 0);
    totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.target_amount, 0);
    $$renderer2.push(`<div class="min-h-screen bg-gray-50"><div class="bg-gradient-to-r from-orange-500 to-pink-500 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-20"><div><h1 class="text-3xl font-bold flex items-center space-x-3"><span>🏡</span> <span>Family Finance Suite</span></h1> <p class="text-orange-100 mt-1">குடும்ப நிதி மேலாண்மை • Homemaker-Centric Financial Planning</p> <p class="text-orange-100 text-sm">Designed for South Indian families • ${escape_html(currentMonth)}</p></div> <div class="flex items-center space-x-3"><button class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Quick Add</span></button> <button class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:bell", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Festival Alert</span></button> <button class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Export</span></button></div></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex gap-6"><div class="w-80 space-y-1"><div class="bg-white rounded-lg shadow-sm border p-4 mb-4"><h3 class="font-semibold text-gray-900 mb-3">Finance Sections</h3> <div class="text-sm text-gray-600 mb-3">Complete financial management for Tamil families</div></div> <div class="space-y-1"><!--[-->`);
    const each_array = ensure_array_like(financeSections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${stringify(activeSection === section.id ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500" : "text-gray-700 hover:bg-gray-50")}`)}><div class="flex items-center space-x-3">`);
      Icon($$renderer2, {
        icon: section.icon,
        class: `w-5 h-5 text-${stringify(section.color)}-500`
      });
      $$renderer2.push(`<!----> <div><div class="font-medium">${escape_html(section.name)}</div> <div class="text-xs text-gray-500">${escape_html(section.tamil)}</div></div></div> `);
      if (section.id === "dashboard") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Home</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white rounded-lg shadow-sm border p-4 mt-6"><h3 class="font-semibold text-gray-900 mb-3">📊 Quick Overview</h3> <div class="space-y-3"><div class="flex justify-between"><span class="text-sm text-gray-600">Monthly Budget</span> <span class="font-medium text-green-600">${escape_html(formatCurrency(totalFamilyBudget))}</span></div> <div class="flex justify-between"><span class="text-sm text-gray-600">Current Savings</span> <span class="font-medium text-blue-600">${escape_html(formatCurrency(totalSavings))}</span></div> <div class="flex justify-between"><span class="text-sm text-gray-600">Monthly Bills</span> <span class="font-medium text-orange-600">${escape_html(formatCurrency(totalMonthlyRecharges))}</span></div> <div class="flex justify-between"><span class="text-sm text-gray-600">Yearly Commitments</span> <span class="font-medium text-purple-600">${escape_html(formatCurrency(totalYearlyRenewals))}</span></div></div></div></div> <div class="flex-1">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6"><div class="flex items-center justify-between"><div><h2 class="text-2xl font-bold mb-2">🙏 Vanakkam! Welcome to your Finance Suite</h2> <p class="text-blue-100">Manage your family's financial well-being with peace of mind</p> <p class="text-blue-100 text-sm mt-1">Today is ${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }))}</p></div> <div class="text-right"><div class="text-3xl font-bold">${escape_html(formatCurrency(totalFamilyBudget))}</div> <div class="text-blue-100">Total Family Budget</div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, {
        icon: "heroicons:shopping-cart",
        class: "w-5 h-5 text-green-600"
      });
      $$renderer2.push(`<!----></div> <div><h3 class="font-medium text-gray-900">Daily Expenses</h3> <p class="text-sm text-gray-600">Groceries &amp; Pooja</p></div></div></div> <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-5 h-5 text-blue-600" });
      $$renderer2.push(`<!----></div> <div><h3 class="font-medium text-gray-900">Savings Goals</h3> <p class="text-sm text-gray-600">${escape_html(Math.round(totalSavings / totalSavingsTarget * 100))}% Complete</p></div></div></div> <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, { icon: "heroicons:fire", class: "w-5 h-5 text-orange-600" });
      $$renderer2.push(`<!----></div> <div><h3 class="font-medium text-gray-900">Festival Planner</h3> <p class="text-sm text-gray-600">Diwali, Pongal &amp; More</p></div></div></div> <div class="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-5 h-5 text-yellow-600" });
      $$renderer2.push(`<!----></div> <div><h3 class="font-medium text-gray-900">Gold &amp; Silver</h3> <p class="text-sm text-gray-600">Wealth Tracking</p></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-lg shadow-sm border p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">👨‍👩‍👧‍👦 Family Financial Overview</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(familyMembers);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let member = each_array_1[$$index_1];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div class="flex items-center space-x-3"><div${attr_class(`w-8 h-8 bg-${stringify(member.color)}-100 rounded-full flex items-center justify-center`)}><span class="text-sm">${escape_html(member.icon)}</span></div> <div><div class="font-medium">${escape_html(member.name)}</div> <div class="text-sm text-gray-600">${escape_html(member.role)}</div></div></div> <div class="text-right"><div class="font-medium">${escape_html(formatCurrency(member.monthlyBudget))}</div> <div class="text-sm text-gray-600">Monthly</div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-lg shadow-sm border p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">🎯 Savings Progress</h3> <div class="space-y-4"><!--[-->`);
      const each_array_2 = ensure_array_like(savingsGoals);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let goal = each_array_2[$$index_2];
        const progress = goal.current_amount / goal.target_amount * 100;
        $$renderer2.push(`<div><div class="flex justify-between mb-2"><span class="font-medium">${escape_html(goal.title)}</span> <span class="text-sm text-gray-600">${escape_html(Math.round(progress))}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`bg-${stringify(goal.priority === "high" ? "red" : goal.priority === "medium" ? "yellow" : "green")}-500 h-2 rounded-full`)}${attr_style(`width: ${stringify(progress)}%`)}></div></div> <div class="flex justify-between mt-1 text-sm text-gray-600"><span>${escape_html(formatCurrency(goal.current_amount))}</span> <span>${escape_html(formatCurrency(goal.target_amount))}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
  });
}
export {
  FinancesPageEnhanced as default
};
