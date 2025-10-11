import { c as store_get, b as attr_class, s as stringify, a as ensure_array_like, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { p as page } from "../../../../chunks/stores.js";
import { g as goto } from "../../../../chunks/client.js";
import "@sveltejs/kit/internal/server";
import { w as writable } from "../../../../chunks/index.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
const trackerData = writable({});
const trackerActions = {
  // Add entry to a specific tracker
  addEntry: (trackerId, entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    trackerData.update((current) => ({
      ...current,
      [trackerId]: [...current[trackerId] || [], newEntry]
    }));
    return newEntry;
  },
  // Update entry
  updateEntry: (trackerId, entryId, updates) => {
    trackerData.update((current) => ({
      ...current,
      [trackerId]: (current[trackerId] || []).map(
        (entry) => entry.id === entryId ? { ...entry, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : entry
      )
    }));
  },
  // Remove entry
  removeEntry: (trackerId, entryId) => {
    trackerData.update((current) => ({
      ...current,
      [trackerId]: (current[trackerId] || []).filter((entry) => entry.id !== entryId)
    }));
  },
  // Get entries for a tracker
  getEntries: (trackerId) => {
    let data = {};
    trackerData.subscribe((current) => data = current)();
    return data[trackerId] || [];
  },
  // Get entries filtered by time period
  getEntriesByPeriod: (trackerId, period) => {
    const entries = trackerActions.getEntries(trackerId);
    return entries.filter((entry) => entry.period === period);
  }
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let trackerId, currentTracker, currentEntries;
    let activeTab = "daily";
    ({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    const trackerConfigs = {
      expense: {
        name: "Expense Tracker",
        purpose: "Daily spending, budgeting, festival costs",
        icon: "heroicons:currency-rupee",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        textColor: "text-red-700 dark:text-red-300",
        description: "Track all your daily expenses including groceries, utilities, transportation, and special festival costs. Set budgets and get alerts when you exceed limits.",
        features: [
          "Daily expense logging",
          "Category-wise breakdown",
          "Budget setting and alerts",
          "Festival expense tracking",
          "Monthly reports",
          "Export to Excel/PDF"
        ],
        categories: [
          "Groceries",
          "Utilities",
          "Transportation",
          "Medical",
          "Education",
          "Festival",
          "Entertainment",
          "Household"
        ]
      },
      income: {
        name: "Income Tracker",
        purpose: "Salary, freelance, pension, rental income",
        icon: "heroicons:banknotes",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-700 dark:text-green-300",
        description: "Monitor all income sources including salary, freelance work, pension, and rental income. Track expected vs actual income and plan your finances better.",
        features: [
          "Multiple income sources",
          "Salary tracking",
          "Freelance income log",
          "Pension management",
          "Rental income tracking",
          "Tax planning support",
          "Income projections"
        ],
        categories: [
          "Salary",
          "Freelance",
          "Pension",
          "Rental",
          "Business",
          "Investment",
          "Bonus",
          "Other"
        ]
      },
      grocery: {
        name: "Grocery Inventory Tracker",
        purpose: "Rice, dal, oil, vegetables—avoid waste",
        icon: "heroicons:archive-box",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-700 dark:text-blue-300",
        description: "Keep track of your grocery inventory to avoid waste and ensure you always have essential items. Get reminders when items are running low.",
        features: [
          "Inventory management",
          "Expiry date tracking",
          "Low stock alerts",
          "Shopping list generation",
          "Waste reduction tips",
          "Recipe suggestions",
          "Cost tracking"
        ],
        categories: [
          "Rice",
          "Dal/Pulses",
          "Oil",
          "Spices",
          "Vegetables",
          "Fruits",
          "Dairy",
          "Beverages"
        ]
      },
      medicine: {
        name: "Medicine Tracker",
        purpose: "Dosage, refill dates, elder care",
        icon: "heroicons:beaker",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-700 dark:text-purple-300",
        description: "Track medicine dosages, refill dates, and elder care requirements. Get reminders for medication times and pharmacy visits.",
        features: [
          "Dosage scheduling",
          "Refill reminders",
          "Elder care tracking",
          "Medical history",
          "Doctor appointments",
          "Pharmacy contacts",
          "Side effect logging"
        ],
        categories: [
          "Daily Medicine",
          "Weekly Medicine",
          "As Needed",
          "Elder Care",
          "Children",
          "Chronic Conditions"
        ]
      },
      health: {
        name: "Health Symptom Tracker",
        purpose: "Fever, BP, sugar, pain logs",
        icon: "heroicons:heart",
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        textColor: "text-pink-700 dark:text-pink-300",
        description: "Monitor health symptoms, blood pressure, sugar levels, and pain. Keep detailed logs for better health management and doctor visits.",
        features: [
          "Symptom logging",
          "Blood pressure tracking",
          "Sugar level monitoring",
          "Pain assessment",
          "Medication correlation",
          "Health trends",
          "Doctor sharing"
        ],
        categories: [
          "Fever",
          "Blood Pressure",
          "Sugar",
          "Pain",
          "Headache",
          "Digestive",
          "Sleep",
          "Energy"
        ]
      },
      fuel: {
        name: "Cooking Fuel Tracker",
        purpose: "LPG refill dates, usage pattern",
        icon: "heroicons:fire",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-700 dark:text-orange-300",
        description: "Track LPG cylinder usage, refill dates, and consumption patterns. Get timely reminders for cylinder bookings and optimize fuel usage.",
        features: [
          "Cylinder tracking",
          "Usage patterns",
          "Refill scheduling",
          "Cost analysis",
          "Booking reminders",
          "Alternative fuel options",
          "Energy saving tips"
        ],
        categories: [
          "LPG Cylinder",
          "Piped Gas",
          "Electric",
          "Induction",
          "Solar",
          "Wood",
          "Other"
        ]
      },
      emergency: {
        name: "Emergency Contact Tracker",
        purpose: "Doctor, ambulance, plumber, relatives",
        icon: "heroicons:phone",
        color: "from-cyan-500 to-cyan-600",
        bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
        textColor: "text-cyan-700 dark:text-cyan-300",
        description: "Maintain emergency contacts for doctors, ambulance services, plumbers, electricians, and family relatives. Quick access in urgent situations.",
        features: [
          "Emergency contacts",
          "Service provider details",
          "Family contacts",
          "Location tracking",
          "Quick dial",
          "Emergency protocols",
          "Contact history"
        ],
        categories: [
          "Medical",
          "Emergency Services",
          "Home Services",
          "Family",
          "Neighbors",
          "Work",
          "School"
        ]
      },
      school: {
        name: "School Fee Tracker",
        purpose: "Due dates, term-wise breakdown",
        icon: "heroicons:academic-cap",
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
        textColor: "text-indigo-700 dark:text-indigo-300",
        description: "Track school fees, due dates, and term-wise payments. Get reminders for fee payments and manage education expenses efficiently.",
        features: [
          "Fee tracking",
          "Due date reminders",
          "Term-wise breakdown",
          "Payment history",
          "Multiple children",
          "Scholarship tracking",
          "Tax benefits"
        ],
        categories: [
          "Tuition",
          "Transportation",
          "Books",
          "Uniform",
          "Exam Fees",
          "Activities",
          "Other"
        ]
      },
      debt: {
        name: "Debt & Loan Tracker",
        purpose: "EMI, interest, repayment plan",
        icon: "heroicons:credit-card",
        color: "from-yellow-500 to-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-700 dark:text-yellow-300",
        description: "Monitor all debts and loans including EMI payments, interest calculations, and repayment plans. Stay on top of your financial obligations.",
        features: [
          "Loan tracking",
          "EMI management",
          "Interest calculation",
          "Repayment planning",
          "Debt consolidation",
          "Payment reminders",
          "Credit score impact"
        ],
        categories: [
          "Home Loan",
          "Personal Loan",
          "Car Loan",
          "Education Loan",
          "Credit Card",
          "Business Loan",
          "Other"
        ]
      },
      savings: {
        name: "Savings & Investment Tracker",
        purpose: "FD, gold, mutual funds, chit",
        icon: "heroicons:chart-bar",
        color: "from-teal-500 to-teal-600",
        bgColor: "bg-teal-50 dark:bg-teal-900/20",
        textColor: "text-teal-700 dark:text-teal-300",
        description: "Track your savings and investments including fixed deposits, gold, mutual funds, and chit funds. Monitor growth and plan for future goals.",
        features: [
          "Investment tracking",
          "Portfolio management",
          "Growth monitoring",
          "Goal planning",
          "Risk assessment",
          "Tax planning",
          "Performance analysis"
        ],
        categories: [
          "Fixed Deposit",
          "Gold",
          "Mutual Funds",
          "Chit Funds",
          "Stocks",
          "Bonds",
          "Savings Account",
          "Other"
        ]
      },
      meal: {
        name: "Meal Planning Tracker",
        purpose: "Weekly menu, fasting days, leftovers",
        icon: "heroicons:clipboard-document-list",
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-700 dark:text-emerald-300",
        description: "Plan weekly meals, track fasting days, and manage leftovers. Optimize food preparation and reduce waste while maintaining healthy eating habits.",
        features: [
          "Weekly meal planning",
          "Fasting day tracking",
          "Leftover management",
          "Nutritional balance",
          "Shopping integration",
          "Recipe suggestions",
          "Cost optimization"
        ],
        categories: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Snacks",
          "Festival Meals",
          "Guest Meals",
          "Diet Meals"
        ]
      },
      recipe: {
        name: "Recipe Tracker",
        purpose: "Paati's dishes, festival sweets, quick meals",
        icon: "heroicons:book-open",
        color: "from-violet-500 to-violet-600",
        bgColor: "bg-violet-50 dark:bg-violet-900/20",
        textColor: "text-violet-700 dark:text-violet-300",
        description: "Store and organize traditional recipes, festival sweets, and quick meal ideas. Preserve family cooking traditions and discover new dishes.",
        features: [
          "Recipe storage",
          "Traditional recipes",
          "Festival specials",
          "Quick meals",
          "Ingredient tracking",
          "Cooking instructions",
          "Photo storage"
        ],
        categories: [
          "Traditional",
          "Festival",
          "Quick Meals",
          "Healthy",
          "Desserts",
          "Beverages",
          "Regional"
        ]
      },
      wishlist: {
        name: "Wishlist Tracker",
        purpose: "Household needs, festival gifts, upgrades",
        icon: "heroicons:heart",
        color: "from-rose-500 to-rose-600",
        bgColor: "bg-rose-50 dark:bg-rose-900/20",
        textColor: "text-rose-700 dark:text-rose-300",
        description: "Track household needs, festival gifts, and home upgrades. Plan purchases and manage your wishlist efficiently.",
        features: [
          "Wishlist management",
          "Priority setting",
          "Budget planning",
          "Purchase tracking",
          "Gift ideas",
          "Seasonal items",
          "Price comparison"
        ],
        categories: [
          "Household",
          "Festival Gifts",
          "Home Upgrades",
          "Personal",
          "Family",
          "Emergency",
          "Luxury"
        ]
      },
      travel: {
        name: "Travel & Trip Tracker",
        purpose: "Temple visits, family trips, packing lists",
        icon: "heroicons:map-pin",
        color: "from-amber-500 to-amber-600",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        textColor: "text-amber-700 dark:text-amber-300",
        description: "Plan and track temple visits, family trips, and vacations. Create packing lists and manage travel expenses.",
        features: [
          "Trip planning",
          "Temple visit tracking",
          "Packing lists",
          "Expense tracking",
          "Itinerary management",
          "Document storage",
          "Travel insurance"
        ],
        categories: [
          "Temple Visits",
          "Family Trips",
          "Vacations",
          "Business",
          "Medical",
          "Education",
          "Religious"
        ]
      },
      device: {
        name: "Device Usage Tracker",
        purpose: "Screen time, parental controls, app limits",
        icon: "heroicons:device-phone-mobile",
        color: "from-slate-500 to-slate-600",
        bgColor: "bg-slate-50 dark:bg-slate-900/20",
        textColor: "text-slate-700 dark:text-slate-300",
        description: "Monitor screen time, set parental controls, and manage app usage limits. Promote healthy digital habits for the family.",
        features: [
          "Screen time tracking",
          "Parental controls",
          "App usage limits",
          "Device management",
          "Usage reports",
          "Time restrictions",
          "Educational content"
        ],
        categories: [
          "Mobile",
          "Tablet",
          "Computer",
          "TV",
          "Gaming",
          "Educational",
          "Social Media"
        ]
      },
      insurance: {
        name: "Insurance Tracker",
        purpose: "Health, life, vehicle, renewal dates",
        icon: "heroicons:shield-check",
        color: "from-lime-500 to-lime-600",
        bgColor: "bg-lime-50 dark:bg-lime-900/20",
        textColor: "text-lime-700 dark:text-lime-300",
        description: "Track all insurance policies including health, life, vehicle, and property insurance. Get renewal reminders and manage claims.",
        features: [
          "Policy tracking",
          "Renewal reminders",
          "Premium payments",
          "Claim management",
          "Coverage details",
          "Document storage",
          "Beneficiary updates"
        ],
        categories: [
          "Health",
          "Life",
          "Vehicle",
          "Property",
          "Business",
          "Travel",
          "Pet",
          "Other"
        ]
      },
      maintenance: {
        name: "Home Maintenance Tracker",
        purpose: "Repairs, painting, pest control",
        icon: "heroicons:wrench-screwdriver",
        color: "from-stone-500 to-stone-600",
        bgColor: "bg-stone-50 dark:bg-stone-900/20",
        textColor: "text-stone-700 dark:text-stone-300",
        description: "Schedule and track home maintenance tasks including repairs, painting, pest control, and regular upkeep.",
        features: [
          "Maintenance scheduling",
          "Repair tracking",
          "Service provider management",
          "Cost tracking",
          "Warranty management",
          "Preventive maintenance",
          "Emergency repairs"
        ],
        categories: [
          "Electrical",
          "Plumbing",
          "Painting",
          "Pest Control",
          "Cleaning",
          "Repairs",
          "Upgrades"
        ]
      },
      vehicle: {
        name: "Vehicle Service Tracker",
        purpose: "Oil change, insurance, pollution check",
        icon: "heroicons:truck",
        color: "from-neutral-500 to-neutral-600",
        bgColor: "bg-neutral-50 dark:bg-neutral-900/20",
        textColor: "text-neutral-700 dark:text-neutral-300",
        description: "Track vehicle maintenance including oil changes, insurance renewals, pollution checks, and service schedules.",
        features: [
          "Service scheduling",
          "Maintenance tracking",
          "Insurance management",
          "Pollution checks",
          "Fuel efficiency",
          "Cost tracking",
          "Document storage"
        ],
        categories: [
          "Oil Change",
          "Insurance",
          "Pollution Check",
          "Tyres",
          "Brakes",
          "Electrical",
          "Body Work"
        ]
      },
      gift: {
        name: "Gift & Donation Tracker",
        purpose: "Weddings, temple, charity, family events",
        icon: "heroicons:gift",
        color: "from-fuchsia-500 to-fuchsia-600",
        bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
        textColor: "text-fuchsia-700 dark:text-fuchsia-300",
        description: "Track gifts given and donations made for weddings, temple offerings, charity, and family events.",
        features: [
          "Gift tracking",
          "Donation management",
          "Event planning",
          "Budget management",
          "Recipient tracking",
          "Tax benefits",
          "Gift ideas"
        ],
        categories: [
          "Weddings",
          "Temple",
          "Charity",
          "Family Events",
          "Birthdays",
          "Festivals",
          "Community"
        ]
      },
      subscription: {
        name: "Digital Subscription Tracker",
        purpose: "OTT, apps, renewals, cost tracking",
        icon: "heroicons:cloud",
        color: "from-sky-500 to-sky-600",
        bgColor: "bg-sky-50 dark:bg-sky-900/20",
        textColor: "text-sky-700 dark:text-sky-300",
        description: "Manage digital subscriptions including OTT platforms, apps, and services. Track renewals and optimize costs.",
        features: [
          "Subscription management",
          "Renewal tracking",
          "Cost optimization",
          "Usage monitoring",
          "Free trial tracking",
          "Cancellation management",
          "Payment methods"
        ],
        categories: [
          "OTT",
          "Music",
          "News",
          "Cloud Storage",
          "Software",
          "Gaming",
          "Education",
          "Other"
        ]
      }
    };
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-IN");
    }
    trackerId = store_get($$store_subs ??= {}, "$page", page).params.tracker;
    if (!trackerId) {
      goto();
    }
    currentTracker = trackerId ? trackerConfigs[trackerId] : null;
    currentEntries = trackerId ? trackerActions.getEntriesByPeriod(trackerId, activeTab) : [];
    if (!currentTracker && trackerId) {
      goto().catch(console.error);
    }
    if (
      // Reset form
      currentTracker
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><button class="btn btn-ghost btn-circle hover:bg-base-200 transition-colors duration-300" aria-label="Go back to trackers">`);
      Icon($$renderer2, { icon: "heroicons:arrow-left", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <div class="flex items-center space-x-3"><div${attr_class(`w-12 h-12 bg-gradient-to-br ${stringify(currentTracker.color)} rounded-xl flex items-center justify-center shadow-lg`)}>`);
      Icon($$renderer2, { icon: currentTracker.icon, class: "w-6 h-6 text-white" });
      $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-base-content">${escape_html(currentTracker.name)}</h1> <p class="text-base-content/70">${escape_html(currentTracker.purpose)}</p></div></div></div> <button class="btn btn-primary btn-lg">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> Add Entry</button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="bg-gradient-to-br from-white/90 via-base-100/80 to-base-200/60 rounded-2xl p-6 shadow-xl border-2 border-base-300/60 backdrop-blur-md"><div class="tabs tabs-boxed mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Daily (${escape_html(trackerId ? trackerActions.getEntriesByPeriod(trackerId, "daily").length : 0)})</button> <button${attr_class(`tab ${stringify("")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:calendar", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Weekly (${escape_html(trackerId ? trackerActions.getEntriesByPeriod(trackerId, "weekly").length : 0)})</button> <button${attr_class(`tab ${stringify("")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:calendar-date-range", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Monthly (${escape_html(trackerId ? trackerActions.getEntriesByPeriod(trackerId, "monthly").length : 0)})</button> <button${attr_class(`tab ${stringify("")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:ellipsis-horizontal", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Other (${escape_html(trackerId ? trackerActions.getEntriesByPeriod(trackerId, "other").length : 0)})</button></div> <div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr class="bg-base-200"><th class="font-bold text-base-content">Date</th><th class="font-bold text-base-content">Category</th><th class="font-bold text-base-content">Description</th>`);
      if (trackerId && [
        "expense",
        "income",
        "debt",
        "savings",
        "insurance",
        "subscription",
        "gift"
      ].includes(trackerId)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<th class="font-bold text-base-content text-right">Amount</th>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--><th class="font-bold text-base-content">Tags</th><th class="font-bold text-base-content">Notes</th><th class="font-bold text-base-content">Actions</th></tr></thead><tbody>`);
      const each_array_1 = ensure_array_like(currentEntries);
      if (each_array_1.length !== 0) {
        $$renderer2.push("<!--[-->");
        for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
          let entry = each_array_1[$$index_2];
          $$renderer2.push(`<tr class="hover:bg-base-100 transition-colors duration-200"><td class="font-medium">${escape_html(formatDate(entry.date))}</td><td><span class="badge badge-primary badge-sm">${escape_html(entry.category)}</span></td><td class="max-w-xs truncate"${attr("title", entry.description)}>${escape_html(entry.description)}</td>`);
          if (trackerId && [
            "expense",
            "income",
            "debt",
            "savings",
            "insurance",
            "subscription",
            "gift"
          ].includes(trackerId)) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<td${attr_class(`text-right font-mono font-bold ${stringify(entry.amount && entry.amount > 0 ? "text-green-600" : "text-red-600")}`)}>${escape_html(entry.amount ? formatCurrency(entry.amount) : "-")}</td>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--><td>`);
          if (entry.tags && entry.tags.length > 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="flex flex-wrap gap-1"><!--[-->`);
            const each_array_2 = ensure_array_like(entry.tags);
            for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
              let tag = each_array_2[$$index_1];
              $$renderer2.push(`<span class="badge badge-outline badge-xs">${escape_html(tag)}</span>`);
            }
            $$renderer2.push(`<!--]--></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span class="text-base-content/50">-</span>`);
          }
          $$renderer2.push(`<!--]--></td><td class="max-w-xs truncate"${attr("title", entry.notes)}>`);
          if (entry.notes) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`${escape_html(entry.notes)}`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span class="text-base-content/50">-</span>`);
          }
          $$renderer2.push(`<!--]--></td><td><button class="btn btn-ghost btn-xs text-red-500 hover:bg-red-50">`);
          Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
          $$renderer2.push(`<!----></button></td></tr>`);
        }
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<tr><td${attr("colspan", trackerId && [
          "expense",
          "income",
          "debt",
          "savings",
          "insurance",
          "subscription",
          "gift"
        ].includes(trackerId) ? 7 : 6)} class="text-center py-8 text-base-content/50">`);
        Icon($$renderer2, {
          icon: "heroicons:document",
          class: "w-12 h-12 mx-auto mb-4 opacity-50"
        });
        $$renderer2.push(`<!----> <p class="text-lg font-medium">No entries yet</p> <p class="text-sm">Click "Add Entry" to start tracking your ${escape_html(currentTracker.name.toLowerCase())}</p></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> `);
      if (currentEntries.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-6 pt-6 border-t border-base-300"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="stat bg-base-100 rounded-xl"><div class="stat-title">Total Entries</div> <div class="stat-value text-primary">${escape_html(currentEntries.length)}</div></div> `);
        if (trackerId && [
          "expense",
          "income",
          "debt",
          "savings",
          "insurance",
          "subscription",
          "gift"
        ].includes(trackerId)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="stat bg-base-100 rounded-xl"><div class="stat-title">Total Amount</div> <div class="stat-value text-green-600">${escape_html(formatCurrency(currentEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0)))}</div></div> <div class="stat bg-base-100 rounded-xl"><div class="stat-title">Average Amount</div> <div class="stat-value text-blue-600">${escape_html(formatCurrency(currentEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0) / currentEntries.length))}</div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex items-center justify-center min-h-96"><div class="text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:arrow-path",
        class: "w-12 h-12 text-base-content/50 mx-auto mb-4 animate-spin"
      });
      $$renderer2.push(`<!----> <p class="text-base-content/70">Loading tracker...</p></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
