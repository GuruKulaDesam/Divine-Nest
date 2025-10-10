import { a as ensure_array_like, b as attr_class, s as stringify, g as clsx } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { T as escape_html } from "../../../chunks/context.js";
const expenseCategories = {
  spiritual: {
    id: "spiritual",
    name: "Spiritual & Cultural",
    icon: "heroicons:sparkles",
    color: "from-orange-500 to-yellow-500",
    items: [
      { name: "Temple donations", frequency: "monthly", amount: 500, notes: "Local temples, annadhanam" },
      { name: "Pooja items", frequency: "monthly", amount: 300, notes: "Camphor, agarbatti, oil, flowers" },
      { name: "Festival prep", frequency: "seasonal", amount: 1200, notes: "Diwali, Pongal, Navaratri" },
      { name: "Astrologer consultation", frequency: "quarterly", amount: 800, notes: "Horoscope, muhurtham" },
      { name: "Veda/chanting classes", frequency: "monthly", amount: 600, notes: "For children or elders" },
      { name: "Bhajan group contribution", frequency: "monthly", amount: 200, notes: "Local satsang" }
    ]
  },
  education: {
    id: "education",
    name: "Education & Learning",
    icon: "heroicons:academic-cap",
    color: "from-blue-500 to-indigo-500",
    items: [
      { name: "School fees", frequency: "term", amount: 15e3, notes: "CBSE or Matric" },
      { name: "Tuition fees", frequency: "monthly", amount: 2500, notes: "Math, Science, Tamil coaching" },
      { name: "Online learning", frequency: "monthly", amount: 500, notes: "Byjus, Vedantu, Khan Academy" },
      { name: "Books & stationery", frequency: "monthly", amount: 800, notes: "Textbooks, notebooks, pens" },
      { name: "Exam registration", frequency: "seasonal", amount: 1e3, notes: "Olympiads, JEE, NEET" },
      { name: "Field trips", frequency: "seasonal", amount: 600, notes: "School outings" }
    ]
  },
  wellness: {
    id: "wellness",
    name: "Wellness & Health",
    icon: "heroicons:heart",
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "Health insurance", frequency: "yearly", amount: 25e3, notes: "Family floater plan" },
      { name: "Ayurvedic medicines", frequency: "monthly", amount: 600, notes: "Paati/Thatha routines" },
      { name: "Yoga class fees", frequency: "monthly", amount: 500, notes: "Amma wellness routine" },
      { name: "Gym membership", frequency: "monthly", amount: 800, notes: "Appa or Thambi" },
      { name: "Doctor visits", frequency: "as_needed", amount: 1e3, notes: "Checkups, consultations" },
      { name: "Supplements", frequency: "monthly", amount: 400, notes: "Iron, calcium, multivitamins" }
    ]
  },
  digital: {
    id: "digital",
    name: "Digital & Entertainment",
    icon: "heroicons:device-phone-mobile",
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "OTT subscriptions", frequency: "monthly", amount: 800, notes: "Netflix, Prime, Hotstar, SunNXT" },
      { name: "Music apps", frequency: "monthly", amount: 200, notes: "Spotify, Raaga, Gaana" },
      { name: "YouTube Premium", frequency: "monthly", amount: 129, notes: "Ad-free viewing for kids" },
      { name: "Cloud storage", frequency: "monthly", amount: 130, notes: "Google One, iCloud" },
      { name: "Antivirus software", frequency: "yearly", amount: 1500, notes: "Family laptops protection" },
      { name: "Photo backup service", frequency: "yearly", amount: 800, notes: "Family memories archive" }
    ]
  },
  transport: {
    id: "transport",
    name: "Transport & Vehicle",
    icon: "heroicons:truck",
    color: "from-cyan-500 to-blue-500",
    items: [
      { name: "Fuel", frequency: "weekly", amount: 2e3, notes: "Petrol for bike/car/scooter" },
      { name: "Vehicle insurance", frequency: "yearly", amount: 8e3, notes: "Bike, car, scooter combined" },
      { name: "Service & maintenance", frequency: "quarterly", amount: 3e3, notes: "Oil change, AC check" },
      { name: "PUC certificate", frequency: "yearly", amount: 300, notes: "Pollution check" },
      { name: "Parking fees", frequency: "monthly", amount: 500, notes: "Apartment or school" },
      { name: "Auto/cab expenses", frequency: "weekly", amount: 800, notes: "School drop, temple visits" }
    ]
  },
  household: {
    id: "household",
    name: "Household & Lifestyle",
    icon: "heroicons:home",
    color: "from-amber-500 to-orange-500",
    items: [
      { name: "Groceries", frequency: "weekly", amount: 6e3, notes: "Rice, dal, vegetables, snacks" },
      { name: "Cleaning supplies", frequency: "monthly", amount: 300, notes: "Phenyl, mop, dish soap" },
      { name: "Gas cylinder", frequency: "monthly", amount: 900, notes: "Cooking fuel" },
      { name: "Electricity & water", frequency: "monthly", amount: 2e3, notes: "EB and municipal water" },
      { name: "Broadband & mobile", frequency: "monthly", amount: 1500, notes: "Airtel, Jio, BSNL" },
      { name: "DTH recharge", frequency: "monthly", amount: 350, notes: "Tata Sky, Sun Direct" },
      { name: "Domestic help", frequency: "monthly", amount: 3e3, notes: "Cooking, cleaning, elder care" },
      { name: "Appliance repair", frequency: "as_needed", amount: 800, notes: "Fan, fridge, grinder, AC" }
    ]
  },
  milestones: {
    id: "milestones",
    name: "Milestones & Gifting",
    icon: "heroicons:gift",
    color: "from-rose-500 to-pink-500",
    items: [
      { name: "Birthday gifts", frequency: "monthly", amount: 1e3, notes: "Family and friends" },
      { name: "Wedding gifts", frequency: "seasonal", amount: 5e3, notes: "Gold coins, silver items" },
      { name: "Housewarming expenses", frequency: "one_time", amount: 3e3, notes: "Rituals, food, decor" },
      { name: "Retirement planning", frequency: "monthly", amount: 5e3, notes: "SIPs, insurance, gold" },
      { name: "Pilgrimage savings", frequency: "yearly", amount: 15e3, notes: "Tirupati, Rameswaram" },
      { name: "Family trip budget", frequency: "yearly", amount: 25e3, notes: "Ooty, Kodaikanal, Kerala" }
    ]
  },
  property: {
    id: "property",
    name: "Property & Civic Dues",
    icon: "heroicons:building-office",
    color: "from-gray-500 to-slate-500",
    items: [
      { name: "House tax", frequency: "yearly", amount: 4200, notes: "Coimbatore Corporation" },
      { name: "Water tax", frequency: "yearly", amount: 1200, notes: "Municipal water connection" },
      { name: "Sewage/drainage fee", frequency: "yearly", amount: 800, notes: "Bundled with water tax" },
      { name: "Property registration", frequency: "one_time", amount: 5e4, notes: "During purchase/transfer" },
      { name: "Building plan approval", frequency: "one_time", amount: 5e3, notes: "New construction/renovation" },
      { name: "Vacant land tax", frequency: "yearly", amount: 2e3, notes: "If applicable for plots" }
    ]
  }
};
const monthlyBudget = {
  october2024: {
    planned: {
      groceries: 6e3,
      utilities: 2e3,
      mobile_internet: 1500,
      dth_ott: 800,
      pooja_rituals: 500,
      cleaning: 300,
      health_wellness: 1e3,
      education: 2500,
      transport: 2e3,
      gifting_events: 1e3,
      miscellaneous: 1e3
    },
    actual: {
      groceries: 6300,
      utilities: 2200,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 700,
      cleaning: 300,
      health_wellness: 1100,
      education: 2500,
      transport: 2100,
      gifting_events: 1e3,
      miscellaneous: 1300
    },
    notes: {
      groceries: "Diwali sweets and snacks",
      utilities: "AC usage in October heat",
      pooja_rituals: "Extra temple visits for Navaratri",
      transport: "Festival shopping trips"
    }
  },
  predicted_november: {
    estimated: {
      groceries: 6400,
      utilities: 2300,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 1200,
      cleaning: 400,
      health_wellness: 1100,
      education: 2500,
      transport: 2300,
      gifting_events: 2e3,
      miscellaneous: 1500
    },
    reasoning: {
      groceries: "Diwali sweets preparation",
      utilities: "Festive lighting increases EB usage",
      pooja_rituals: "Diwali prep: lamps, flowers, oil",
      cleaning: "Deep cleaning before Diwali",
      transport: "Extra shopping and temple visits",
      gifting_events: "Diwali gifting: sweets, silver coins",
      miscellaneous: "Festival outings, clothes, decor"
    }
  }
};
const expenseHistory = [
  {
    month: "August 2024",
    categories: {
      groceries: 6200,
      utilities: 2100,
      mobile_internet: 1400,
      dth_ott: 850,
      pooja_rituals: 600,
      cleaning: 300,
      health_wellness: 1e3,
      education: 2500,
      transport: 2e3,
      gifting_events: 1e3,
      miscellaneous: 1200
    },
    total: 19150
  },
  {
    month: "September 2024",
    categories: {
      groceries: 6500,
      utilities: 2e3,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 500,
      cleaning: 350,
      health_wellness: 1200,
      education: 2500,
      transport: 2200,
      gifting_events: 1200,
      miscellaneous: 1e3
    },
    total: 19800
  },
  {
    month: "October 2024",
    categories: {
      groceries: 6300,
      utilities: 2200,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 700,
      cleaning: 300,
      health_wellness: 1100,
      education: 2500,
      transport: 2100,
      gifting_events: 1e3,
      miscellaneous: 1300
    },
    total: 19850
  }
];
const subscriptions = [
  {
    type: "Mobile",
    member: "Appa",
    provider: "Jio",
    plan: "₹299/month",
    renewalDate: "2024-10-10",
    status: "active",
    autoRenewal: true
  },
  {
    type: "Mobile",
    member: "Amma",
    provider: "Airtel",
    plan: "₹199/month",
    renewalDate: "2024-10-12",
    status: "active",
    autoRenewal: true
  },
  {
    type: "Broadband",
    member: "Family",
    provider: "BSNL Fiber",
    plan: "₹999/month",
    renewalDate: "2024-10-15",
    status: "active",
    autoRenewal: false
  },
  {
    type: "DTH",
    member: "Family",
    provider: "Tata Sky",
    plan: "₹350/month",
    renewalDate: "2024-10-20",
    status: "active",
    autoRenewal: true
  },
  {
    type: "OTT",
    member: "Akka + Thambi",
    provider: "Prime Video",
    plan: "₹1,499/year",
    renewalDate: "2024-11-01",
    status: "upcoming",
    autoRenewal: false
  },
  {
    type: "OTT",
    member: "Paati",
    provider: "SunNXT",
    plan: "₹799/year",
    renewalDate: "2024-12-15",
    status: "upcoming",
    autoRenewal: false
  },
  {
    type: "Fitness",
    member: "Amma",
    provider: "Yoga Class",
    plan: "₹500/month",
    renewalDate: "2024-10-08",
    status: "active",
    autoRenewal: false
  },
  {
    type: "Education",
    member: "Thambi",
    provider: "Math Tuition",
    plan: "₹1,200/month",
    renewalDate: "2024-10-05",
    status: "paid",
    autoRenewal: false
  },
  {
    type: "Education",
    member: "Akka",
    provider: "Science Tuition",
    plan: "₹1,300/month",
    renewalDate: "2024-10-06",
    status: "paid",
    autoRenewal: false
  }
];
const propertyTaxes = [
  {
    id: "house_tax_2024",
    type: "house",
    name: "House Tax",
    amount: 4200,
    dueDate: "2024-03-31",
    status: "paid",
    propertyAddress: "Kovaipudur, Coimbatore",
    paymentDate: "2024-03-15",
    receiptNumber: "CT2024/12345"
  },
  {
    id: "water_tax_2024",
    type: "water",
    name: "Water Tax",
    amount: 1200,
    dueDate: "2024-10-15",
    status: "pending",
    propertyAddress: "Kovaipudur, Coimbatore",
    notes: "Bill available online"
  },
  {
    id: "sewage_fee_2024",
    type: "sewage",
    name: "Sewage/Drainage Fee",
    amount: 800,
    dueDate: "2024-10-15",
    status: "pending",
    propertyAddress: "Kovaipudur, Coimbatore",
    notes: "Bundled with water tax"
  }
];
function calculateMonthlyAverage(history) {
  const total = history.reduce((sum, month) => sum + month.total, 0);
  return Math.round(total / history.length);
}
function getUpcomingRenewals(days = 30) {
  const today = /* @__PURE__ */ new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1e3);
  return subscriptions.filter((sub) => {
    const renewalDate = new Date(sub.renewalDate);
    return renewalDate >= today && renewalDate <= futureDate;
  });
}
function getPendingTaxes() {
  return propertyTaxes.filter((tax) => tax.status === "pending");
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "overview";
    const tabs = [
      {
        id: "overview",
        label: "Budget Overview",
        icon: "heroicons:chart-pie"
      },
      {
        id: "categories",
        label: "Expense Categories",
        icon: "heroicons:squares-2x2"
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: "heroicons:calendar-days"
      },
      {
        id: "property",
        label: "Property & Taxes",
        icon: "heroicons:building-office"
      },
      {
        id: "analytics",
        label: "Analytics & Trends",
        icon: "heroicons:chart-bar"
      }
    ];
    function getStatusColor(status) {
      switch (status?.toLowerCase()) {
        case "active":
        case "paid":
          return "text-green-600 bg-green-100";
        case "pending":
        case "upcoming":
          return "text-orange-600 bg-orange-100";
        case "overdue":
        case "expired":
          return "text-red-600 bg-red-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
    }
    function getMonthlyTotal(monthData) {
      if (monthData.planned) {
        return Object.values(monthData.planned).reduce((sum, amount) => sum + amount, 0);
      } else if (monthData.estimated) {
        return Object.values(monthData.estimated).reduce((sum, amount) => sum + amount, 0);
      }
      return 0;
    }
    function calculateBudgetVariance(planned, actual) {
      if (!planned || !actual) return 0;
      return Math.round((actual - planned) / planned * 100);
    }
    function isRenewalDue(renewalDate, days = 7) {
      const today = /* @__PURE__ */ new Date();
      const renewal = new Date(renewalDate);
      const diffTime = renewal - today;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays <= days && diffDays >= 0;
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-purple-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Expense Management</h1> <p class="text-gray-600 dark:text-gray-300">व्यय प्रबन्धन | Complete family budget tracking and financial planning</p></div></div> <div class="flex space-x-2"><button class="flex items-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Add Expense</span></button> <button class="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Export</span></button></div></div> <div class="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, {
      icon: "heroicons:banknotes",
      class: "w-12 h-12 text-white/80"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">धन संयम | Financial Discipline &amp; Wisdom</h3> <p class="text-white/90">"अर्थस्य पुरुषो दासो दासस्त्वर्थो न कस्यचित् | Money should serve the person, not the person serve money. Wise financial planning ensures family prosperity and spiritual peace."</p> <p class="text-sm text-white/70 mt-2">Tamil: "பணம் நமக்கு வேலை செய்ய வேண்டும், நாம் பணத்திற்கு வேலை செய்யக் கூடாது"</p></div></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center"><div class="text-2xl font-bold text-green-600">${escape_html(formatCurrency(calculateMonthlyAverage(expenseHistory)))}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Monthly Average</div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center"><div class="text-2xl font-bold text-blue-600">${escape_html(getUpcomingRenewals().length)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Renewals Due</div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center"><div class="text-2xl font-bold text-orange-600">${escape_html(getPendingTaxes().length)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Taxes Pending</div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center"><div class="text-2xl font-bold text-purple-600">${escape_html(Object.keys(expenseCategories).length)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Categories</div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-green-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">October 2024 Budget vs Actual</h3> `);
      if (monthlyBudget.october2024) {
        $$renderer2.push("<!--[-->");
        const currentMonth = monthlyBudget.october2024;
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Planned Budget</h4> <div class="space-y-2"><!--[-->`);
        const each_array_1 = ensure_array_like(Object.entries(currentMonth.planned));
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let [category, amount] = each_array_1[$$index_1];
          $$renderer2.push(`<div class="flex justify-between text-sm"><span class="capitalize text-gray-600 dark:text-gray-400">${escape_html(category.replace("_", " "))}:</span> <span class="font-medium">${escape_html(formatCurrency(amount))}</span></div>`);
        }
        $$renderer2.push(`<!--]--> <div class="border-t pt-2 flex justify-between font-bold"><span>Total:</span> <span class="text-green-600">${escape_html(formatCurrency(getMonthlyTotal(currentMonth)))}</span></div></div></div> <div><h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Actual Spend</h4> <div class="space-y-2"><!--[-->`);
        const each_array_2 = ensure_array_like(Object.entries(currentMonth.actual));
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let [category, amount] = each_array_2[$$index_2];
          const planned = currentMonth.planned[category];
          const variance = calculateBudgetVariance(planned, amount);
          $$renderer2.push(`<div class="flex justify-between text-sm"><span class="capitalize text-gray-600 dark:text-gray-400">${escape_html(category.replace("_", " "))}:</span> <div class="flex items-center space-x-2"><span class="font-medium">${escape_html(formatCurrency(amount))}</span> `);
          if (variance !== 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span${attr_class(`text-xs px-1 py-0.5 rounded ${stringify(variance > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600")}`)}>${escape_html(variance > 0 ? "+" : "")}${escape_html(variance)}%</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--> <div class="border-t pt-2 flex justify-between font-bold"><span>Total:</span> <span class="text-blue-600">${escape_html(formatCurrency(Object.values(currentMonth.actual).reduce((sum, amount) => sum + amount, 0)))}</span></div></div></div></div> <div class="mt-6"><h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Budget Notes</h4> <div class="space-y-2"><!--[-->`);
        const each_array_3 = ensure_array_like(Object.entries(currentMonth.notes));
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let [category, note] = each_array_3[$$index_3];
          $$renderer2.push(`<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div class="flex items-start space-x-2">`);
          Icon($$renderer2, {
            icon: "heroicons:information-circle",
            class: "w-4 h-4 text-blue-600 mt-0.5"
          });
          $$renderer2.push(`<!----> <div><span class="font-medium text-blue-800 dark:text-blue-200 capitalize">${escape_html(category.replace("_", " "))}:</span> <span class="text-blue-700 dark:text-blue-300">${escape_html(note)}</span></div></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:exclamation-triangle",
        class: "w-5 h-5 mr-2 text-orange-500"
      });
      $$renderer2.push(`<!----> Upcoming Renewals</h3> <div class="space-y-3"><!--[-->`);
      const each_array_4 = ensure_array_like(getUpcomingRenewals(30));
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let renewal = each_array_4[$$index_4];
        $$renderer2.push(`<div class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg"><div class="flex items-center justify-between mb-1"><span class="font-medium text-gray-900 dark:text-white">${escape_html(renewal.type)}</span> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(renewal.status))}`)}>${escape_html(renewal.status)}</span></div> <div class="text-sm text-gray-600 dark:text-gray-400"><div>${escape_html(renewal.member)} - ${escape_html(renewal.provider)}</div> <div class="flex justify-between"><span>${escape_html(renewal.plan)}</span> <span${attr_class(clsx(isRenewalDue(renewal.renewalDate) ? "text-red-600 font-medium" : ""))}>Due: ${escape_html(new Date(renewal.renewalDate).toLocaleDateString())}</span></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:building-office",
        class: "w-5 h-5 mr-2 text-red-500"
      });
      $$renderer2.push(`<!----> Pending Taxes</h3> <div class="space-y-3"><!--[-->`);
      const each_array_5 = ensure_array_like(getPendingTaxes());
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let tax = each_array_5[$$index_5];
        $$renderer2.push(`<div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"><div class="flex items-center justify-between mb-1"><span class="font-medium text-red-800 dark:text-red-200">${escape_html(tax.name)}</span> <span class="font-medium text-red-600">${escape_html(formatCurrency(tax.amount))}</span></div> <div class="text-sm text-red-600 dark:text-red-400"><div>Due: ${escape_html(new Date(tax.dueDate).toLocaleDateString())}</div> `);
        if (tax.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-1">${escape_html(tax.notes)}</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:crystal-ball",
        class: "w-5 h-5 mr-2 text-purple-500"
      });
      $$renderer2.push(`<!----> November Prediction</h3> `);
      if (monthlyBudget.predicted_november) {
        $$renderer2.push("<!--[-->");
        const novemberBudget = monthlyBudget.predicted_november;
        $$renderer2.push(`<div class="space-y-2"><div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div class="text-2xl font-bold text-purple-600">${escape_html(formatCurrency(getMonthlyTotal(novemberBudget)))}</div> <div class="text-sm text-purple-700 dark:text-purple-300">Estimated Total</div></div> <div class="space-y-1 text-sm"><!--[-->`);
        const each_array_6 = ensure_array_like(Object.entries(novemberBudget.reasoning));
        for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
          let [category, reason] = each_array_6[$$index_6];
          $$renderer2.push(`<div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded"><span class="font-medium capitalize">${escape_html(category.replace("_", " "))}:</span> <span class="text-purple-700 dark:text-purple-300">${escape_html(reason)}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="mt-12 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl"><h4 class="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:light-bulb", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> धन प्रबन्धन सूत्र | Financial Management Wisdom</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h5 class="font-semibold text-green-700 dark:text-green-300 mb-2">Budget Discipline:</h5> <ul class="text-sm text-green-700 dark:text-green-300 space-y-1"><li>• Track daily expenses for better awareness</li> <li>• Plan festival budgets 2 months in advance</li> <li>• Review subscriptions quarterly for optimization</li> <li>• Keep emergency fund for unexpected expenses</li></ul></div> <div><h5 class="font-semibold text-green-700 dark:text-green-300 mb-2">Smart Savings:</h5> <ul class="text-sm text-green-700 dark:text-green-300 space-y-1"><li>• Automate SIP investments for wealth building</li> <li>• Buy in bulk for non-perishable items</li> <li>• Compare prices before major purchases</li> <li>• Invest in quality items for long-term savings</li></ul></div></div> <blockquote class="mt-4 p-3 bg-green-200 dark:bg-green-800 rounded-lg italic text-green-800 dark:text-green-200">"यो ददाति सहस्राणि गवां अश्वशतैरपि तत्तुल्यम् तु भवेदानं दाने गृहे सुसंस्कृते | A well-managed household that gives even a small amount with love equals the charity of thousands. Financial discipline brings both prosperity and peace."</blockquote></div></div></div>`);
  });
}
export {
  _page as default
};
