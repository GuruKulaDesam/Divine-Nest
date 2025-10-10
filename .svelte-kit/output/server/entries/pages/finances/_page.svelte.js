import "clsx";
import { b as attr_class, s as stringify, j as attr_style, a as ensure_array_like, k as bind_props, d as attr } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { T as escape_html } from "../../../chunks/context.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { f as fallback } from "../../../chunks/utils2.js";
import "../../../chunks/theme.js";
const FamilyRoles = {
  APPA: "appa",
  AMMA: "amma",
  PAATI: "paati",
  THATHA: "thatha",
  AKKA: "akka",
  THAMBI: "thambi"
};
const ExpenseCategories = {
  SPIRITUAL: "spiritual",
  EDUCATION: "education",
  HEALTH: "health",
  DIGITAL_SUBSCRIPTIONS: "digital_subscriptions",
  TRANSPORT: "transport",
  HOUSEHOLD: "household",
  FOOD: "food",
  ENTERTAINMENT: "entertainment"
};
const PaymentStatus = {
  PAID: "paid",
  PENDING: "pending",
  OVERDUE: "overdue",
  UPCOMING: "upcoming"
};
const familyMembers = [
  {
    id: 1,
    name: "Raman",
    role: FamilyRoles.APPA,
    age: 52,
    avatar: "👨🏽‍💼",
    responsibilities: ["House rent", "Vehicle maintenance", "Insurance premiums"],
    monthlyBudget: 25e3,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Lakshmi",
    role: FamilyRoles.AMMA,
    age: 48,
    avatar: "👩🏽‍🏫",
    responsibilities: ["Grocery shopping", "Utility bills", "Children's education"],
    monthlyBudget: 2e4,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43211",
    whatsappNumber: "+91 98765 43211"
  },
  {
    id: 3,
    name: "Kamala",
    role: FamilyRoles.PAATI,
    age: 75,
    avatar: "👵🏽",
    responsibilities: ["Temple donations", "Medical expenses", "Festival preparations"],
    monthlyBudget: 8e3,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43212",
    whatsappNumber: "+91 98765 43212"
  },
  {
    id: 4,
    name: "Krishnan",
    role: FamilyRoles.THATHA,
    age: 78,
    avatar: "👴🏽",
    responsibilities: ["Newspaper subscription", "Medical checkups", "Banking"],
    monthlyBudget: 6e3,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43213",
    whatsappNumber: "+91 98765 43213"
  },
  {
    id: 5,
    name: "Priya",
    role: FamilyRoles.AKKA,
    age: 22,
    avatar: "👩🏽‍🎓",
    responsibilities: ["College fees", "Books", "Mobile recharge"],
    monthlyBudget: 12e3,
    preferredLanguage: "english",
    phoneNumber: "+91 98765 43214",
    whatsappNumber: "+91 98765 43214"
  },
  {
    id: 6,
    name: "Arjun",
    role: FamilyRoles.THAMBI,
    age: 18,
    avatar: "👨🏽‍🎓",
    responsibilities: ["School fees", "Sports equipment", "Gaming subscriptions"],
    monthlyBudget: 8e3,
    preferredLanguage: "english",
    phoneNumber: "+91 98765 43215",
    whatsappNumber: "+91 98765 43215"
  }
];
const monthlyRecharges = [
  {
    id: 1,
    type: "mobile",
    provider: "Airtel",
    number: "98765 43210",
    amount: 599,
    dueDate: "2025-10-15",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 2,
    type: "mobile",
    provider: "Jio",
    number: "98765 43211",
    amount: 399,
    dueDate: "2025-10-12",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 3,
    type: "broadband",
    provider: "BSNL Fiber",
    plan: "100 Mbps Unlimited",
    amount: 849,
    dueDate: "2025-10-20",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 4,
    type: "dth",
    provider: "Tata Sky",
    plan: "South Plus HD",
    amount: 315,
    dueDate: "2025-10-25",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  },
  {
    id: 5,
    type: "electricity",
    provider: "TNEB",
    account: "240156789012",
    amount: 1200,
    dueDate: "2025-10-30",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 6,
    type: "water",
    provider: "Chennai Metro Water",
    account: "CW98765432",
    amount: 180,
    dueDate: "2025-10-28",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 7,
    type: "gas",
    provider: "Indane Gas",
    connection: "17654321890",
    amount: 450,
    dueDate: "2025-10-22",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 8,
    type: "streaming",
    provider: "Netflix",
    plan: "Premium",
    amount: 649,
    dueDate: "2025-10-18",
    assignedTo: familyMembers[4],
    // Akka
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  },
  {
    id: 9,
    type: "streaming",
    provider: "Amazon Prime",
    plan: "Annual",
    amount: 1499,
    dueDate: "2025-10-15",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  }
];
const totalMonthlyRecharges = monthlyRecharges.reduce((total, item) => total + item.amount, 0);
const yearlyRenewals = [
  {
    id: 1,
    type: "life_insurance",
    provider: "LIC",
    policyNumber: "240156789",
    amount: 24e3,
    dueDate: "2025-12-15",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HEALTH
  },
  {
    id: 2,
    type: "health_insurance",
    provider: "Star Health",
    policyNumber: "SH9876543",
    amount: 18500,
    dueDate: "2025-11-20",
    assignedTo: familyMembers[1],
    // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HEALTH
  },
  {
    id: 3,
    type: "vehicle_insurance",
    provider: "ICICI Lombard",
    vehicleNumber: "TN 09 AB 1234",
    amount: 8200,
    dueDate: "2026-03-10",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.TRANSPORT
  },
  {
    id: 4,
    type: "property_tax",
    provider: "Chennai Corporation",
    propertyId: "CC/2024/789456",
    amount: 12e3,
    dueDate: "2026-03-31",
    assignedTo: familyMembers[0],
    // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  }
];
const totalYearlyRenewals = yearlyRenewals.reduce((total, item) => total + item.amount, 0);
const expenseCategories = [
  {
    id: ExpenseCategories.SPIRITUAL,
    name: "Spiritual & Cultural",
    nameTamil: "ஆன்மிகம் மற்றும் பண்பாடு",
    icon: "🕉️",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    examples: ["Temple donations", "Festival celebrations", "Puja items", "Religious books"]
  },
  {
    id: ExpenseCategories.EDUCATION,
    name: "Education",
    nameTamil: "கல்வி",
    icon: "📚",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    examples: ["School fees", "Tuition", "Books", "Educational supplies"]
  },
  {
    id: ExpenseCategories.HEALTH,
    name: "Health & Medical",
    nameTamil: "உடல்நலம் மற்றும் மருத்துவம்",
    icon: "💊",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    examples: ["Doctor visits", "Medicines", "Health insurance", "Medical tests"]
  },
  {
    id: ExpenseCategories.DIGITAL_SUBSCRIPTIONS,
    name: "Digital & Subscriptions",
    nameTamil: "டிஜிட்டல் மற்றும் சந்தாக்கள்",
    icon: "📱",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    examples: ["Mobile recharge", "Internet", "Streaming services", "App subscriptions"]
  },
  {
    id: ExpenseCategories.TRANSPORT,
    name: "Transport & Vehicle",
    nameTamil: "போக்குவரத்து மற்றும் வாகனம்",
    icon: "🚗",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    examples: ["Fuel", "Vehicle maintenance", "Auto/taxi", "Public transport"]
  },
  {
    id: ExpenseCategories.HOUSEHOLD,
    name: "Household & Utilities",
    nameTamil: "வீட்டு மற்றும் பயன்பாடுகள்",
    icon: "🏠",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    examples: ["Electricity", "Water", "Gas", "House maintenance", "Cleaning supplies"]
  },
  {
    id: ExpenseCategories.FOOD,
    name: "Food & Groceries",
    nameTamil: "உணவு மற்றும் மளிகை",
    icon: "🛒",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    examples: ["Groceries", "Vegetables", "Dairy", "Eating out", "Snacks"]
  },
  {
    id: ExpenseCategories.ENTERTAINMENT,
    name: "Entertainment & Leisure",
    nameTamil: "பொழுதுபோக்கு மற்றும் விளையாட்டு",
    icon: "🎬",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    examples: ["Movies", "Games", "Outings", "Hobbies", "Sports"]
  }
];
const notificationTemplates = {
  sms: {
    tamil: {
      reminder: "வணக்கம் {name}! உங்கள் {service} பில் ₹{amount} {date} அன்று செலுத்த வேண்டும். - குடும்பம்",
      overdue: "வணக்கம் {name}! உங்கள் {service} பில் ₹{amount} தாமதமாகிவிட்டது. உடனே செலுத்தவும். - குடும்பம்"
    },
    english: {
      reminder: "Hi {name}! Your {service} bill of ₹{amount} is due on {date}. Please pay on time. - Family",
      overdue: "Hi {name}! Your {service} bill of ₹{amount} is overdue. Please pay immediately. - Family"
    }
  },
  whatsapp: {
    tamil: {
      reminder: "🙏 வணக்கம் {name}!\n\n💰 உங்கள் {service} பில்:\n• தொகை: ₹{amount}\n• கடைசி தேதி: {date}\n\n📅 நேரத்தில் செலுத்த மறக்காதீர்கள்!\n\n💖 அன்புடன்,\nகுடும்பம்",
      overdue: "⚠️ கவனம் {name}!\n\n💸 தாமதமான பில்:\n• {service}: ₹{amount}\n• கடைசி தேதி: {date}\n\n🚨 உடனே செலுத்தவும்!\n\n💖 அன்புடன்,\nகுடும்பம்"
    },
    english: {
      reminder: "🙏 Hi {name}!\n\n💰 Your {service} bill:\n• Amount: ₹{amount}\n• Due date: {date}\n\n📅 Please pay on time!\n\n💖 With love,\nFamily",
      overdue: "⚠️ Attention {name}!\n\n💸 Overdue bill:\n• {service}: ₹{amount}\n• Due date: {date}\n\n🚨 Please pay immediately!\n\n💖 With love,\nFamily"
    }
  }
};
function FamilyMemberCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let memberRecharges, memberRenewals, monthlyTotal, upcomingPayments, overduePayments, roleStyle;
    let member = $$props["member"];
    let showDetails = fallback($$props["showDetails"], false);
    let onClick = fallback($$props["onClick"], null);
    function getRoleDisplayName(role) {
      const roleNames = {
        appa: "Appa (Father)",
        amma: "Amma (Mother)",
        paati: "Paati (Grandmother)",
        thatha: "Thatha (Grandfather)",
        akka: "Akka (Elder Sister)",
        thambi: "Thambi (Younger Brother)",
        chithi: "Chithi (Aunt)",
        mama: "Mama (Uncle)"
      };
      return roleNames[role] || role.charAt(0).toUpperCase() + role.slice(1);
    }
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    memberRecharges = monthlyRecharges.filter((r) => r.assignedTo.id === member.id);
    memberRenewals = yearlyRenewals.filter((r) => r.assignedTo.id === member.id);
    monthlyTotal = memberRecharges.reduce((sum, r) => sum + r.amount, 0);
    memberRenewals.reduce((sum, r) => sum + r.amount, 0);
    upcomingPayments = memberRecharges.filter((r) => r.status === "upcoming").length;
    overduePayments = memberRecharges.filter((r) => r.status === "overdue").length;
    roleStyle = {
      appa: {
        bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        text: "text-blue-600",
        border: "border-blue-200"
      },
      amma: {
        bg: "bg-gradient-to-br from-pink-500 to-rose-600",
        text: "text-pink-600",
        border: "border-pink-200"
      },
      paati: {
        bg: "bg-gradient-to-br from-orange-500 to-amber-600",
        text: "text-orange-600",
        border: "border-orange-200"
      },
      thatha: {
        bg: "bg-gradient-to-br from-purple-500 to-violet-600",
        text: "text-purple-600",
        border: "border-purple-200"
      },
      akka: {
        bg: "bg-gradient-to-br from-green-500 to-emerald-600",
        text: "text-green-600",
        border: "border-green-200"
      },
      thambi: {
        bg: "bg-gradient-to-br from-cyan-500 to-teal-600",
        text: "text-cyan-600",
        border: "border-cyan-200"
      },
      chithi: {
        bg: "bg-gradient-to-br from-yellow-500 to-orange-600",
        text: "text-yellow-600",
        border: "border-yellow-200"
      },
      mama: {
        bg: "bg-gradient-to-br from-gray-500 to-slate-600",
        text: "text-gray-600",
        border: "border-gray-200"
      }
    }[member.role] || {
      bg: "bg-gradient-to-br from-gray-500 to-slate-600",
      text: "text-gray-600",
      border: "border-gray-200"
    };
    $$renderer2.push(`<div${attr_class(`group relative rounded-xl border-2 ${stringify(roleStyle.border)} bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl`, "svelte-1qrtz0k", { "cursor-pointer": onClick })} role="button" tabindex="0"><div class="relative p-4"><div class="flex items-center space-x-4"><div class="relative"><div${attr_class(`w-16 h-16 rounded-full ${stringify(roleStyle.bg)} flex items-center justify-center text-3xl shadow-lg`, "svelte-1qrtz0k")}>${escape_html(member.avatar)}</div> `);
    if (overduePayments > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">!</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (upcomingPayments > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">${escape_html(upcomingPayments)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">✓</div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex-1"><h3 class="text-lg font-semibold text-gray-900">${escape_html(member.name)}</h3> <p${attr_class(`text-sm ${stringify(roleStyle.text)} font-medium`, "svelte-1qrtz0k")}>${escape_html(getRoleDisplayName(member.role))}</p> <p class="text-xs text-gray-500">Age: ${escape_html(member.age)} • ${escape_html(member.preferredLanguage.charAt(0).toUpperCase() + member.preferredLanguage.slice(1))}</p></div> `);
    if (showDetails || onClick) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-gray-400 group-hover:text-gray-600 transition-colors svelte-1qrtz0k">`);
      Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-5 h-5" });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="px-4 pb-4 space-y-3"><div class="bg-gray-50 rounded-lg p-3"><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-600">Monthly Budget</span> <span${attr_class(`text-sm font-bold ${stringify(roleStyle.text)}`, "svelte-1qrtz0k")}>${escape_html(formatCurrency(member.monthlyBudget))}</span></div> <div class="flex justify-between items-center"><span class="text-sm text-gray-500">Allocated Bills</span> <span class="text-sm font-semibold text-gray-700">${escape_html(formatCurrency(monthlyTotal))}</span></div> <div class="mt-2 w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all duration-500 ${stringify(monthlyTotal > member.monthlyBudget ? "bg-red-500" : monthlyTotal > member.monthlyBudget * 0.8 ? "bg-amber-500" : "bg-green-500")}`)}${attr_style(`width: ${stringify(Math.min(monthlyTotal / member.monthlyBudget * 100, 100))}%`)}></div></div></div> <div class="grid grid-cols-3 gap-2 text-center"><div class="bg-blue-50 rounded-lg p-2"><div class="text-lg font-bold text-blue-600">${escape_html(memberRecharges.length)}</div> <div class="text-xs text-blue-500">Monthly Bills</div></div> <div class="bg-purple-50 rounded-lg p-2"><div class="text-lg font-bold text-purple-600">${escape_html(memberRenewals.length)}</div> <div class="text-xs text-purple-500">Yearly Bills</div></div> <div class="bg-gray-50 rounded-lg p-2"><div${attr_class(`text-lg font-bold ${stringify(upcomingPayments > 0 ? "text-amber-600" : "text-green-600")}`)}>${escape_html(upcomingPayments)}</div> <div${attr_class(`text-xs ${stringify(upcomingPayments > 0 ? "text-amber-500" : "text-green-500")}`)}>Due Soon</div></div></div> <div class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100"><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:phone", class: "w-3 h-3" });
    $$renderer2.push(`<!----> <span>${escape_html(member.phoneNumber)}</span></div> <div class="flex items-center space-x-1">`);
    Icon($$renderer2, {
      icon: "simple-icons:whatsapp",
      class: "w-3 h-3 text-green-600"
    });
    $$renderer2.push(`<!----> `);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-3 h-3 text-blue-600"
    });
    $$renderer2.push(`<!----></div></div></div> `);
    if (showDetails) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="border-t border-gray-100 p-4 bg-gray-50/50"><h4 class="font-semibold text-gray-900 mb-3">Responsibilities &amp; Bills</h4> <div class="mb-4"><h5 class="text-sm font-medium text-gray-700 mb-2">Primary Responsibilities:</h5> <div class="flex flex-wrap gap-1"><!--[-->`);
      const each_array = ensure_array_like(member.responsibilities);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let responsibility = each_array[$$index];
        $$renderer2.push(`<span${attr_class(`px-2 py-1 bg-white rounded-full text-xs ${stringify(roleStyle.text)} border ${stringify(roleStyle.border)}`, "svelte-1qrtz0k")}>${escape_html(responsibility)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> `);
      if (memberRecharges.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-4"><h5 class="text-sm font-medium text-gray-700 mb-2">Monthly Bills:</h5> <div class="space-y-2"><!--[-->`);
        const each_array_1 = ensure_array_like(memberRecharges);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let recharge = each_array_1[$$index_1];
          $$renderer2.push(`<div class="flex justify-between items-center text-sm bg-white rounded-lg p-2 border"><span class="font-medium">${escape_html(recharge.provider)} ${escape_html(recharge.type)}</span> <span${attr_class(`font-semibold ${stringify(roleStyle.text)}`, "svelte-1qrtz0k")}>${escape_html(formatCurrency(recharge.amount))}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (memberRenewals.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div><h5 class="text-sm font-medium text-gray-700 mb-2">Yearly Renewals:</h5> <div class="space-y-2"><!--[-->`);
        const each_array_2 = ensure_array_like(memberRenewals);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let renewal = each_array_2[$$index_2];
          $$renderer2.push(`<div class="flex justify-between items-center text-sm bg-white rounded-lg p-2 border"><span class="font-medium">${escape_html(renewal.provider)} ${escape_html(renewal.type)}</span> <span${attr_class(`font-semibold ${stringify(roleStyle.text)}`, "svelte-1qrtz0k")}>${escape_html(formatCurrency(renewal.amount))}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { member, showDetails, onClick });
  });
}
function RechargeTracker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredRecharges, totalAmount, upcomingCount, overdueCount, paidCount;
    let viewMode = fallback($$props["viewMode"], "grid");
    let filterStatus = fallback($$props["filterStatus"], "all");
    let sortBy = fallback($$props["sortBy"], "dueDate");
    let searchTerm = "";
    let recharges = [...monthlyRecharges];
    function getStatusColor(status) {
      switch (status) {
        case PaymentStatus.PAID:
          return "text-green-600 bg-green-50";
        case PaymentStatus.PENDING:
          return "text-yellow-600 bg-yellow-50";
        case PaymentStatus.OVERDUE:
          return "text-red-600 bg-red-50";
        case PaymentStatus.UPCOMING:
          return "text-blue-600 bg-blue-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
    function getTypeIcon(type) {
      switch (type) {
        case "mobile":
          return "heroicons:device-phone-mobile";
        case "broadband":
          return "heroicons:wifi";
        case "dth":
          return "heroicons:tv";
        case "electricity":
          return "heroicons:bolt";
        case "water":
          return "heroicons:beaker";
        case "gas":
          return "heroicons:fire";
        case "streaming":
          return "heroicons:play-circle";
        default:
          return "heroicons:credit-card";
      }
    }
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      const today = /* @__PURE__ */ new Date();
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
      if (diffDays === 0) return "Due today";
      if (diffDays === 1) return "Due tomorrow";
      if (diffDays <= 7) return `Due in ${diffDays} days`;
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : void 0
      });
    }
    filteredRecharges = recharges.filter((recharge) => {
      if (filterStatus !== "all" && recharge.status !== filterStatus) return false;
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount;
        case "provider":
          return a.provider.localeCompare(b.provider);
        case "type":
          return a.type.localeCompare(b.type);
        case "dueDate":
        default:
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });
    totalAmount = filteredRecharges.reduce((sum, r) => sum + r.amount, 0);
    upcomingCount = recharges.filter((r) => r.status === PaymentStatus.UPCOMING).length;
    overdueCount = recharges.filter((r) => r.status === PaymentStatus.OVERDUE).length;
    paidCount = recharges.filter((r) => r.status === PaymentStatus.PAID).length;
    $$renderer2.push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-white rounded-lg p-4 shadow-sm border border-blue-100"><div class="flex items-center space-x-3"><div class="p-2 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Total Monthly</p> <p class="text-xl font-bold text-blue-600">${escape_html(
      // This would integrate with SMS/WhatsApp service
      formatCurrency(totalAmount)
    )}</p></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border border-amber-100"><div class="flex items-center space-x-3"><div class="p-2 bg-amber-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-6 h-6 text-amber-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Upcoming</p> <p class="text-xl font-bold text-amber-600">${escape_html(upcomingCount)}</p></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border border-red-100"><div class="flex items-center space-x-3"><div class="p-2 bg-red-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-red-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Overdue</p> <p class="text-xl font-bold text-red-600">${escape_html(overdueCount)}</p></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border border-green-100"><div class="flex items-center space-x-3"><div class="p-2 bg-green-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Paid</p> <p class="text-xl font-bold text-green-600">${escape_html(paidCount)}</p></div></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border"><div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"><div class="relative flex-1 max-w-md">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
    });
    $$renderer2.push(`<!----> <input type="text" placeholder="Search recharges..."${attr("value", searchTerm)} class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/></div> <div class="flex items-center space-x-4"><div class="flex items-center bg-gray-100 rounded-lg p-1"><button${attr_class(`p-2 rounded-md transition-colors ${stringify(viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-800")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:squares-2x2", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button> <button${attr_class(`p-2 rounded-md transition-colors ${stringify(viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-800")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:list-bullet", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button></div> <button class="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:funnel", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span class="text-sm">Filters</span></button></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-4">`);
    if (filteredRecharges.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12 bg-white rounded-lg border">`);
      Icon($$renderer2, {
        icon: "heroicons:inbox",
        class: "w-12 h-12 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 mb-2">No recharges found</h3> <p class="text-gray-500">Try adjusting your search or filter criteria.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (viewMode === "grid") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        const each_array = ensure_array_like(filteredRecharges);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let recharge = each_array[$$index];
          $$renderer2.push(`<div class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"><div class="p-4"><div class="flex items-start justify-between mb-3"><div class="flex items-center space-x-3"><div class="p-2 bg-gray-100 rounded-lg">`);
          Icon($$renderer2, {
            icon: getTypeIcon(recharge.type),
            class: "w-5 h-5 text-gray-600"
          });
          $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-gray-900">${escape_html(recharge.provider)}</h3> <p class="text-sm text-gray-500 capitalize">${escape_html(recharge.type)}</p></div></div> <span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(getStatusColor(recharge.status))}`)}>${escape_html(recharge.status)}</span></div> <div class="space-y-2 mb-4"><div class="flex justify-between"><span class="text-sm text-gray-600">Amount</span> <span class="text-sm font-semibold">${escape_html(formatCurrency(recharge.amount))}</span></div> <div class="flex justify-between"><span class="text-sm text-gray-600">Due Date</span> <span class="text-sm font-medium">${escape_html(formatDate(recharge.dueDate))}</span></div> <div class="flex justify-between"><span class="text-sm text-gray-600">Assigned To</span> <span class="text-sm font-medium">${escape_html(recharge.assignedTo.name)}</span></div> `);
          if (recharge.number) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="flex justify-between"><span class="text-sm text-gray-600">Number</span> <span class="text-sm font-mono">${escape_html(recharge.number)}</span></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="flex space-x-2">`);
          if (recharge.status !== PaymentStatus.PAID) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">Mark Paid</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <button class="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">`);
          Icon($$renderer2, { icon: "heroicons:paper-airplane", class: "w-4 h-4" });
          $$renderer2.push(`<!----></button></div></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="bg-white rounded-lg border overflow-hidden"><div class="overflow-x-auto"><table class="min-w-full"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        const each_array_1 = ensure_array_like(filteredRecharges);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let recharge = each_array_1[$$index_1];
          $$renderer2.push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="p-2 bg-gray-100 rounded-lg mr-3">`);
          Icon($$renderer2, {
            icon: getTypeIcon(recharge.type),
            class: "w-4 h-4 text-gray-600"
          });
          $$renderer2.push(`<!----></div> <div><div class="text-sm font-medium text-gray-900">${escape_html(recharge.provider)}</div> <div class="text-sm text-gray-500 capitalize">${escape_html(recharge.type)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${escape_html(formatCurrency(recharge.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${escape_html(formatDate(recharge.dueDate))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${escape_html(recharge.assignedTo.name)}</td><td class="px-6 py-4 whitespace-nowrap"><span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(getStatusColor(recharge.status))}`)}>${escape_html(recharge.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">`);
          if (recharge.status !== PaymentStatus.PAID) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="text-green-600 hover:text-green-900">Mark Paid</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <button class="text-blue-600 hover:text-blue-900">Remind</button></td></tr>`);
        }
        $$renderer2.push(`<!--]--></tbody></table></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { viewMode, filterStatus, sortBy });
  });
}
function ExpenseLogger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredExpenses, totalAmount, categoryTotals;
    let onExpenseAdded = fallback($$props["onExpenseAdded"], null);
    let expenses = [];
    ({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    let searchTerm = "";
    let filterCategory = "all";
    let filterMember = "all";
    let filterDateRange = "this_month";
    function getCategoryDetails(categoryId) {
      return expenseCategories.find((cat) => cat.id === categoryId) || { name: "Other", icon: "❓", color: "text-gray-600" };
    }
    function getMemberName(memberId) {
      if (!memberId) return "Family";
      const member = familyMembers.find((m) => m.id === memberId);
      return member ? member.name : "Unknown";
    }
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    }
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const now = /* @__PURE__ */ new Date();
      switch (filterDateRange) {
        case "today":
          return expenseDate.toDateString() === now.toDateString();
        case "this_week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
          return expenseDate >= weekAgo;
        case "this_month":
          return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
        case "this_year":
          return expenseDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
    totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    categoryTotals = filteredExpenses.reduce(
      (acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      },
      {}
    );
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"><div><h1 class="text-2xl font-bold text-gray-900">Expense Tracker</h1> <p class="text-gray-600">Track and manage family expenses</p></div> <div class="flex space-x-3"><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add Expense</span></button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Export</span></button></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-white rounded-lg p-4 shadow-sm border border-blue-100"><div class="flex items-center space-x-3"><div class="p-2 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Total Expenses</p> <p class="text-xl font-bold text-blue-600">${escape_html(
      // Update existing expense
      // Add new expense
      formatCurrency(totalAmount)
    )}</p></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border border-purple-100"><div class="flex items-center space-x-3"><div class="p-2 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:tag", class: "w-6 h-6 text-purple-600" });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Transactions</p> <p class="text-xl font-bold text-purple-600">${escape_html(filteredExpenses.length)}</p></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border border-emerald-100"><div class="flex items-center space-x-3"><div class="p-2 bg-emerald-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-pie",
      class: "w-6 h-6 text-emerald-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Categories</p> <p class="text-xl font-bold text-emerald-600">${escape_html(Object.keys(categoryTotals).length)}</p></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border border-amber-100"><div class="flex items-center space-x-3"><div class="p-2 bg-amber-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:calculator",
      class: "w-6 h-6 text-amber-600"
    });
    $$renderer2.push(`<!----></div> <div><p class="text-sm text-gray-600">Avg. per day</p> <p class="text-xl font-bold text-amber-600">${escape_html(formatCurrency(totalAmount / 30))}</p></div></div></div></div> <div class="bg-white rounded-lg p-4 shadow-sm border"><div class="grid grid-cols-1 md:grid-cols-5 gap-4"><div class="relative">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
    });
    $$renderer2.push(`<!----> <input type="text" placeholder="Search expenses..."${attr("value", searchTerm)} class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/></div> `);
    $$renderer2.select(
      {
        value: filterCategory,
        class: "p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(expenseCategories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.icon)} ${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: filterMember,
        class: "p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Members`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(familyMembers);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let member = each_array_1[$$index_1];
          $$renderer3.option({ value: member.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(member.avatar)} ${escape_html(member.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: filterDateRange,
        class: "p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Time`);
        });
        $$renderer3.option({ value: "today" }, ($$renderer4) => {
          $$renderer4.push(`Today`);
        });
        $$renderer3.option({ value: "this_week" }, ($$renderer4) => {
          $$renderer4.push(`This Week`);
        });
        $$renderer3.option({ value: "this_month" }, ($$renderer4) => {
          $$renderer4.push(`This Month`);
        });
        $$renderer3.option({ value: "this_year" }, ($$renderer4) => {
          $$renderer4.push(`This Year`);
        });
      }
    );
    $$renderer2.push(` <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Clear</button></div></div> <div class="bg-white rounded-lg shadow-sm border">`);
    if (filteredExpenses.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:receipt-percent",
        class: "w-12 h-12 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 mb-2">No expenses found</h3> <p class="text-gray-500">Add your first expense or adjust the filters.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="overflow-x-auto"><table class="min-w-full"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid By</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
      const each_array_2 = ensure_array_like(filteredExpenses);
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let expense = each_array_2[$$index_3];
        const categoryDetails = getCategoryDetails(expense.category);
        $$renderer2.push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${escape_html(formatDate(expense.date))}</td><td class="px-6 py-4"><div><div class="text-sm font-medium text-gray-900">${escape_html(expense.description)}</div> `);
        if (expense.tags.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex flex-wrap gap-1 mt-1"><!--[-->`);
          const each_array_3 = ensure_array_like(expense.tags);
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let tag = each_array_3[$$index_2];
            $$renderer2.push(`<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${escape_html(tag)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><span class="mr-2">${escape_html(categoryDetails.icon)}</span> <span class="text-sm text-gray-900">${escape_html(categoryDetails.name)}</span></div></td><td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${escape_html(formatCurrency(expense.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${escape_html(getMemberName(expense.memberPaidId))}</td><td class="px-6 py-4 whitespace-nowrap"><span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">${escape_html(expense.paymentMethod)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"><button class="text-blue-600 hover:text-blue-900">Edit</button> <button class="text-red-600 hover:text-red-900">Delete</button></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { onExpenseAdded });
  });
}
function BudgetDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalBudget, totalSpent, totalRemaining, budgetUtilization, categoryAnalysis, memberBudgets, pieChartData;
    let selectedPeriod = fallback($$props["selectedPeriod"], "monthly");
    let selectedMember = fallback($$props["selectedMember"], "all");
    let budgetAlerts = [];
    let sampleExpenses = [
      {
        category: "food",
        amount: 8500,
        budget: 12e3,
        date: "2025-10-01"
      },
      {
        category: "spiritual",
        amount: 2500,
        budget: 3e3,
        date: "2025-10-02"
      },
      {
        category: "education",
        amount: 4200,
        budget: 8e3,
        date: "2025-10-03"
      },
      {
        category: "health",
        amount: 1800,
        budget: 5e3,
        date: "2025-10-04"
      },
      {
        category: "transport",
        amount: 6500,
        budget: 8e3,
        date: "2025-10-05"
      },
      {
        category: "household",
        amount: 3200,
        budget: 4e3,
        date: "2025-10-06"
      },
      {
        category: "digital_subscriptions",
        amount: 2800,
        budget: 3500,
        date: "2025-10-07"
      },
      {
        category: "entertainment",
        amount: 1500,
        budget: 2500,
        date: "2025-10-08"
      }
    ];
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    function getStatusColor(status) {
      switch (status) {
        case "danger":
        case "over":
          return "text-red-600 bg-red-50 border-red-200";
        case "warning":
          return "text-amber-600 bg-amber-50 border-amber-200";
        case "good":
          return "text-green-600 bg-green-50 border-green-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    }
    totalBudget = sampleExpenses.reduce((sum, item) => sum + item.budget, 0);
    totalSpent = sampleExpenses.reduce((sum, item) => sum + item.amount, 0);
    totalRemaining = totalBudget - totalSpent;
    budgetUtilization = totalSpent / totalBudget * 100;
    categoryAnalysis = sampleExpenses.map((expense) => {
      const categoryDetails = expenseCategories.find((cat) => cat.id === expense.category);
      const utilization = expense.amount / expense.budget * 100;
      const remaining = expense.budget - expense.amount;
      return {
        ...expense,
        categoryDetails,
        utilization,
        remaining,
        status: utilization > 90 ? "danger" : utilization > 75 ? "warning" : "good"
      };
    }).sort((a, b) => b.utilization - a.utilization);
    memberBudgets = familyMembers.map((member) => {
      const memberRecharges = monthlyRecharges.filter((r) => r.assignedTo.id === member.id);
      const memberRenewals = yearlyRenewals.filter((r) => r.assignedTo.id === member.id);
      const allocatedMonthly = memberRecharges.reduce((sum, r) => sum + r.amount, 0);
      const allocatedYearly = memberRenewals.reduce((sum, r) => sum + r.amount, 0);
      return {
        ...member,
        allocatedMonthly,
        allocatedYearly,
        budgetUtilization: allocatedMonthly / member.monthlyBudget * 100,
        remaining: member.monthlyBudget - allocatedMonthly,
        status: allocatedMonthly > member.monthlyBudget ? "over" : allocatedMonthly > member.monthlyBudget * 0.9 ? "warning" : "good"
      };
    });
    budgetAlerts = [
      ...categoryAnalysis.filter((cat) => cat.utilization > 85).map((cat) => ({
        type: "category_high",
        severity: cat.utilization > 95 ? "danger" : "warning",
        title: `${cat.categoryDetails.name} Budget Alert`,
        message: `${cat.utilization.toFixed(1)}% of budget used (₹${cat.amount.toLocaleString()} of ₹${cat.budget.toLocaleString()})`,
        icon: cat.categoryDetails.icon,
        category: cat.category
      })),
      ...memberBudgets.filter((member) => member.budgetUtilization > 85).map((member) => ({
        type: "member_high",
        severity: member.budgetUtilization > 100 ? "danger" : "warning",
        title: `${member.name} Budget Alert`,
        message: `${member.budgetUtilization.toFixed(1)}% of monthly budget allocated`,
        icon: member.avatar,
        memberId: member.id
      }))
    ];
    pieChartData = categoryAnalysis.map((cat) => ({
      label: cat.categoryDetails.name,
      value: cat.amount,
      color: cat.categoryDetails.color.replace("text-", "bg-"),
      icon: cat.categoryDetails.icon
    }));
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"><div><h1 class="text-2xl font-bold text-gray-900">Budget Dashboard</h1> <p class="text-gray-600">Track and analyze family spending patterns</p></div> <div class="flex space-x-3"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Projections</span></button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Export</span></button></div></div> `);
    if (
      // Simple linear projection based on current spending
      // October 2025
      // Update the budget in sampleExpenses
      // Trigger reactivity
      budgetAlerts.length > 0
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white rounded-lg border shadow-sm p-4"><h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:exclamation-triangle",
        class: "w-5 h-5 text-amber-600 mr-2"
      });
      $$renderer2.push(`<!----> Budget Alerts (${escape_html(budgetAlerts.length)})</h2> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(budgetAlerts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let alert = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`flex items-start space-x-3 p-3 rounded-lg border ${stringify(getStatusColor(alert.severity))}`)}><span class="text-2xl">${escape_html(alert.icon)}</span> <div class="flex-1"><h3 class="font-medium text-gray-900">${escape_html(alert.title)}</h3> <p class="text-sm text-gray-600">${escape_html(alert.message)}</p></div> `);
        Icon($$renderer2, {
          icon: "heroicons:chevron-right",
          class: "w-4 h-4 text-gray-400"
        });
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-white rounded-lg p-6 shadow-sm border"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600">Total Budget</p> <p class="text-2xl font-bold text-blue-600">${escape_html(formatCurrency(totalBudget))}</p></div> <div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-white rounded-lg p-6 shadow-sm border"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600">Total Spent</p> <p class="text-2xl font-bold text-orange-600">${escape_html(formatCurrency(totalSpent))}</p></div> <div class="p-3 bg-orange-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:credit-card",
      class: "w-6 h-6 text-orange-600"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-white rounded-lg p-6 shadow-sm border"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600">Remaining</p> <p${attr_class(`text-2xl font-bold ${stringify(totalRemaining >= 0 ? "text-green-600" : "text-red-600")}`)}>${escape_html(formatCurrency(totalRemaining))}</p></div> <div${attr_class(`p-3 ${stringify(totalRemaining >= 0 ? "bg-green-100" : "bg-red-100")} rounded-lg`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:wallet",
      class: `w-6 h-6 ${stringify(totalRemaining >= 0 ? "text-green-600" : "text-red-600")}`
    });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-white rounded-lg p-6 shadow-sm border"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600">Budget Used</p> <p${attr_class(`text-2xl font-bold ${stringify(budgetUtilization > 90 ? "text-red-600" : budgetUtilization > 75 ? "text-amber-600" : "text-green-600")}`)}>${escape_html(budgetUtilization.toFixed(1))}%</p></div> <div${attr_class(`p-3 ${stringify(budgetUtilization > 90 ? "bg-red-100" : budgetUtilization > 75 ? "bg-amber-100" : "bg-green-100")} rounded-lg`)}>`);
    Icon($$renderer2, {
      icon: "heroicons:chart-pie",
      class: `w-6 h-6 ${stringify(budgetUtilization > 90 ? "text-red-600" : budgetUtilization > 75 ? "text-amber-600" : "text-green-600")}`
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-lg shadow-sm border"><div class="p-6 border-b border-gray-100"><h2 class="text-lg font-semibold text-gray-900">Category Breakdown</h2></div> <div class="p-6"><div class="space-y-4"><!--[-->`);
    const each_array_1 = ensure_array_like(categoryAnalysis);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let category = each_array_1[$$index_1];
      $$renderer2.push(`<div class="border rounded-lg p-4"><div class="flex items-center justify-between mb-2"><div class="flex items-center space-x-3"><span class="text-xl">${escape_html(category.categoryDetails.icon)}</span> <div><h3 class="font-medium text-gray-900">${escape_html(category.categoryDetails.name)}</h3> <p class="text-sm text-gray-500">${escape_html(formatCurrency(category.amount))} of ${escape_html(formatCurrency(category.budget))}</p></div></div> <span${attr_class(`text-sm font-medium ${stringify(category.utilization > 90 ? "text-red-600" : category.utilization > 75 ? "text-amber-600" : "text-green-600")}`)}>${escape_html(category.utilization.toFixed(1))}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all duration-500 ${stringify(category.utilization > 90 ? "bg-red-500" : category.utilization > 75 ? "bg-amber-500" : "bg-green-500")}`)}${attr_style(`width: ${stringify(Math.min(category.utilization, 100))}%`)}></div></div> <div class="mt-2 flex justify-between text-xs text-gray-600"><span>Remaining: ${escape_html(formatCurrency(category.remaining))}</span> <span${attr_class(`px-2 py-1 rounded-full ${stringify(getStatusColor(category.status))} text-xs`)}>${escape_html(category.status === "danger" ? "Over Budget" : category.status === "warning" ? "Near Limit" : "On Track")}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="bg-white rounded-lg shadow-sm border"><div class="p-6 border-b border-gray-100"><h2 class="text-lg font-semibold text-gray-900">Spending Distribution</h2></div> <div class="p-6"><div class="space-y-3"><!--[-->`);
    const each_array_2 = ensure_array_like(pieChartData.slice(0, 6));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div${attr_class(`w-4 h-4 rounded-full ${stringify(item.color.replace("text-", "bg-"))}`)}></div> <span class="text-sm font-medium">${escape_html(item.label)}</span></div> <div class="text-right"><div class="text-sm font-semibold">${escape_html(formatCurrency(item.value))}</div> <div class="text-xs text-gray-500">${escape_html((item.value / totalSpent * 100).toFixed(1))}%</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 h-32 bg-gray-50 rounded-lg flex items-center justify-center"><div class="text-center text-gray-500">`);
    Icon($$renderer2, { icon: "heroicons:chart-pie", class: "w-8 h-8 mx-auto mb-2" });
    $$renderer2.push(`<!----> <p class="text-sm">Interactive chart would render here</p></div></div></div></div></div> <div class="bg-white rounded-lg shadow-sm border"><div class="p-6 border-b border-gray-100"><h2 class="text-lg font-semibold text-gray-900">Family Member Budgets</h2></div> <div class="p-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
    const each_array_3 = ensure_array_like(memberBudgets);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let member = each_array_3[$$index_3];
      $$renderer2.push(`<div class="border rounded-lg p-4"><div class="flex items-center space-x-3 mb-3"><span class="text-2xl">${escape_html(member.avatar)}</span> <div><h3 class="font-medium text-gray-900">${escape_html(member.name)}</h3> <p class="text-sm text-gray-500 capitalize">${escape_html(member.role)}</p></div></div> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600">Monthly Budget:</span> <span class="font-medium">${escape_html(formatCurrency(member.monthlyBudget))}</span></div> <div class="flex justify-between text-sm"><span class="text-gray-600">Allocated Bills:</span> <span class="font-medium">${escape_html(formatCurrency(member.allocatedMonthly))}</span></div> <div class="flex justify-between text-sm"><span class="text-gray-600">Remaining:</span> <span${attr_class(`font-medium ${stringify(member.remaining >= 0 ? "text-green-600" : "text-red-600")}`)}>${escape_html(formatCurrency(member.remaining))}</span></div></div> <div class="mt-3"><div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all duration-500 ${stringify(member.status === "over" ? "bg-red-500" : member.status === "warning" ? "bg-amber-500" : "bg-green-500")}`)}${attr_style(`width: ${stringify(Math.min(member.budgetUtilization, 100))}%`)}></div></div> <div class="mt-1 text-xs text-gray-600 text-center">${escape_html(member.budgetUtilization.toFixed(1))}% used</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="bg-white rounded-lg shadow-sm border"><div class="p-6 border-b border-gray-100"><h2 class="text-lg font-semibold text-gray-900">Monthly Bills &amp; Recharges</h2></div> <div class="p-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h3 class="font-medium text-gray-900 mb-3">Fixed Monthly Expenses</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600">Mobile Recharges:</span> <span class="font-medium">₹${escape_html(monthlyRecharges.filter((r) => r.type === "mobile").reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Utilities (Electricity, Water, Gas):</span> <span class="font-medium">₹${escape_html(monthlyRecharges.filter((r) => ["electricity", "water", "gas"].includes(r.type)).reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Internet &amp; TV:</span> <span class="font-medium">₹${escape_html(monthlyRecharges.filter((r) => ["broadband", "dth"].includes(r.type)).reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Streaming Services:</span> <span class="font-medium">₹${escape_html(monthlyRecharges.filter((r) => r.type === "streaming").reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between font-semibold border-t pt-2"><span>Total Monthly Bills:</span> <span>₹${escape_html(totalMonthlyRecharges.toLocaleString())}</span></div></div></div> <div><h3 class="font-medium text-gray-900 mb-3">Yearly Renewals</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600">Insurance (Life &amp; Health):</span> <span class="font-medium">₹${escape_html(yearlyRenewals.filter((r) => r.type.includes("insurance")).reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Property Tax:</span> <span class="font-medium">₹${escape_html(yearlyRenewals.filter((r) => r.type === "property_tax").reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-gray-600">Vehicle Insurance:</span> <span class="font-medium">₹${escape_html(yearlyRenewals.filter((r) => r.type === "vehicle_insurance").reduce((sum, r) => sum + r.amount, 0).toLocaleString())}</span></div> <div class="flex justify-between font-semibold border-t pt-2"><span>Total Yearly Renewals:</span> <span>₹${escape_html(totalYearlyRenewals.toLocaleString())}</span></div> <div class="flex justify-between text-sm text-gray-600"><span>Monthly Average:</span> <span>₹${escape_html(Math.round(totalYearlyRenewals / 12).toLocaleString())}</span></div></div></div></div></div></div></div>`);
    bind_props($$props, { selectedPeriod, selectedMember });
  });
}
class NotificationService {
  constructor() {
    this.apiKeys = {
      twilio: null,
      // Set your Twilio API key
      firebase: null,
      // Set your Firebase Cloud Messaging key
      whatsapp: null
      // Set your WhatsApp Business API key
    };
    this.notificationQueue = [];
    this.sentNotifications = [];
    this.preferences = {
      enableSMS: true,
      enableWhatsApp: true,
      enablePush: true,
      reminderDaysBefore: [7, 3, 1],
      // Send reminders 7, 3, and 1 days before due date
      overdueReminders: true,
      festivalReminders: true
    };
  }
  // Initialize the service
  init() {
    this.checkDuePayments();
    this.scheduleReminders();
    setInterval(() => {
      this.checkDuePayments();
    }, 60 * 60 * 1e3);
  }
  // Check for due payments and create notifications
  checkDuePayments() {
    const today = /* @__PURE__ */ new Date();
    const allPayments = [...monthlyRecharges, ...yearlyRenewals];
    allPayments.forEach((payment) => {
      const dueDate = new Date(payment.dueDate);
      const daysDiff = Math.ceil((dueDate - today) / (1e3 * 60 * 60 * 24));
      if (this.preferences.reminderDaysBefore.includes(daysDiff)) {
        this.createReminder(payment, "upcoming");
      } else if (daysDiff < 0 && this.preferences.overdueReminders) {
        this.createReminder(payment, "overdue");
      } else if (daysDiff === 0) {
        this.createReminder(payment, "due_today");
      }
    });
    this.processNotificationQueue();
  }
  // Create reminder notification
  createReminder(payment, type) {
    const member = payment.assignedTo;
    const notificationId = `${payment.id}_${type}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`;
    if (this.sentNotifications.includes(notificationId)) {
      return;
    }
    const notification = {
      id: notificationId,
      type,
      payment,
      member,
      createdAt: /* @__PURE__ */ new Date(),
      methods: []
    };
    if (this.preferences.enableSMS) {
      notification.methods.push({
        type: "sms",
        to: member.phoneNumber,
        message: this.generateSMSMessage(payment, member, type)
      });
    }
    if (this.preferences.enableWhatsApp) {
      notification.methods.push({
        type: "whatsapp",
        to: member.whatsappNumber,
        message: this.generateWhatsAppMessage(payment, member, type)
      });
    }
    if (this.preferences.enablePush) {
      notification.methods.push({
        type: "push",
        title: this.generatePushTitle(payment, type),
        body: this.generatePushBody(payment, member, type),
        icon: "💰",
        data: { paymentId: payment.id, type }
      });
    }
    this.notificationQueue.push(notification);
  }
  // Generate SMS message
  generateSMSMessage(payment, member, type) {
    const template = notificationTemplates.sms[member.preferredLanguage] || notificationTemplates.sms.english;
    const messageTemplate = template[type] || template.reminder;
    return this.replaceMessageVariables(messageTemplate, payment, member);
  }
  // Generate WhatsApp message
  generateWhatsAppMessage(payment, member, type) {
    const template = notificationTemplates.whatsapp[member.preferredLanguage] || notificationTemplates.whatsapp.english;
    const messageTemplate = template[type] || template.reminder;
    return this.replaceMessageVariables(messageTemplate, payment, member);
  }
  // Generate push notification title
  generatePushTitle(payment, type) {
    switch (type) {
      case "overdue":
        return "⚠️ Overdue Payment";
      case "due_today":
        return "📅 Payment Due Today";
      case "upcoming":
        return "⏰ Upcoming Payment";
      default:
        return "💰 Payment Reminder";
    }
  }
  // Generate push notification body
  generatePushBody(payment, member, type) {
    const amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(payment.amount);
    switch (type) {
      case "overdue":
        return `${member.name}, your ${payment.provider} bill of ${amount} is overdue!`;
      case "due_today":
        return `${member.name}, your ${payment.provider} bill of ${amount} is due today.`;
      case "upcoming":
        return `${member.name}, your ${payment.provider} bill of ${amount} is due soon.`;
      default:
        return `Payment reminder for ${payment.provider}`;
    }
  }
  // Replace variables in message templates
  replaceMessageVariables(template, payment, member) {
    const amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(payment.amount);
    const date = new Date(payment.dueDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    return template.replace(/{name}/g, member.name).replace(/{service}/g, `${payment.provider} ${payment.type}`).replace(/{amount}/g, amount).replace(/{date}/g, date);
  }
  // Process notification queue
  async processNotificationQueue() {
    while (this.notificationQueue.length > 0) {
      const notification = this.notificationQueue.shift();
      try {
        await this.sendNotification(notification);
        this.sentNotifications.push(notification.id);
        console.log(`Notification sent: ${notification.id}`);
      } catch (error) {
        console.error(`Failed to send notification ${notification.id}:`, error);
      }
    }
  }
  // Send notification through all methods
  async sendNotification(notification) {
    const promises = notification.methods.map((method) => {
      switch (method.type) {
        case "sms":
          return this.sendSMS(method.to, method.message);
        case "whatsapp":
          return this.sendWhatsApp(method.to, method.message);
        case "push":
          return this.sendPushNotification(method);
        default:
          return Promise.resolve();
      }
    });
    await Promise.allSettled(promises);
  }
  // Send SMS via Twilio (mock implementation)
  async sendSMS(phoneNumber, message) {
    if (!this.apiKeys.twilio) {
      console.log(`SMS to ${phoneNumber}: ${message}`);
      return { success: true, mock: true };
    }
    try {
      console.log(`SMS sent to ${phoneNumber}: ${message}`);
      return { success: true };
    } catch (error) {
      throw new Error(`SMS failed: ${error.message}`);
    }
  }
  // Send WhatsApp message (mock implementation)
  async sendWhatsApp(phoneNumber, message) {
    if (!this.apiKeys.whatsapp) {
      console.log(`WhatsApp to ${phoneNumber}: ${message}`);
      return { success: true, mock: true };
    }
    try {
      console.log(`WhatsApp sent to ${phoneNumber}: ${message}`);
      return { success: true };
    } catch (error) {
      throw new Error(`WhatsApp failed: ${error.message}`);
    }
  }
  // Send push notification via Firebase (mock implementation)
  async sendPushNotification(notificationData) {
    if (!this.apiKeys.firebase) {
      console.log(`Push notification: ${notificationData.title} - ${notificationData.body}`);
      return { success: true, mock: true };
    }
    try {
      console.log(`Push notification sent: ${notificationData.title}`);
      return { success: true };
    } catch (error) {
      throw new Error(`Push notification failed: ${error.message}`);
    }
  }
  // Manual reminder for specific payment
  async sendManualReminder(paymentId, memberIds = null) {
    const payment = [...monthlyRecharges, ...yearlyRenewals].find((p) => p.id === paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }
    const members = memberIds ? familyMembers.filter((m) => memberIds.includes(m.id)) : [payment.assignedTo];
    const notifications = members.map((member) => {
      const notification = {
        id: `manual_${payment.id}_${member.id}_${Date.now()}`,
        type: "manual",
        payment,
        member,
        createdAt: /* @__PURE__ */ new Date(),
        methods: [
          {
            type: "whatsapp",
            to: member.whatsappNumber,
            message: this.generateWhatsAppMessage(payment, member, "reminder")
          }
        ]
      };
      return notification;
    });
    for (const notification of notifications) {
      await this.sendNotification(notification);
    }
    return { success: true, sent: notifications.length };
  }
  // Get notification history
  getNotificationHistory(days = 30) {
    const cutoff = /* @__PURE__ */ new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return this.sentNotifications.filter((id) => {
      const parts = id.split("_");
      if (parts.length >= 3) {
        const date = new Date(parts[2]);
        return date >= cutoff;
      }
      return true;
    }).slice(-50);
  }
  // Schedule festival and special occasion reminders
  scheduleReminders() {
    const festivals = [
      { name: "Diwali", date: "2025-10-31", days: [7, 3, 1] },
      { name: "Pongal", date: "2026-01-14", days: [14, 7, 3, 1] },
      { name: "Navaratri", date: "2025-10-03", days: [7, 3, 1] },
      { name: "Ganesh Chaturthi", date: "2025-08-29", days: [7, 3, 1] }
    ];
    festivals.forEach((festival) => {
      festival.days.forEach((daysBefore) => {
        const reminderDate = new Date(festival.date);
        reminderDate.setDate(reminderDate.getDate() - daysBefore);
        if (reminderDate >= /* @__PURE__ */ new Date()) {
          setTimeout(() => {
            this.sendFestivalReminder(festival, daysBefore);
          }, reminderDate - /* @__PURE__ */ new Date());
        }
      });
    });
  }
  // Send festival preparation reminder
  async sendFestivalReminder(festival, daysBefore) {
    const message = `🎉 ${festival.name} is in ${daysBefore} day(s)! Time to start preparations. Check your festival expenses budget and shopping list.`;
    for (const member of familyMembers) {
      await this.sendPushNotification({
        title: `🪔 ${festival.name} Reminder`,
        body: message,
        icon: "🎉",
        data: { type: "festival", festival: festival.name }
      });
    }
  }
  // Update notification preferences
  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    localStorage.setItem("notificationPreferences", JSON.stringify(this.preferences));
  }
  // Load preferences from storage
  loadPreferences() {
    const saved = localStorage.getItem("notificationPreferences");
    if (saved) {
      this.preferences = { ...this.preferences, ...JSON.parse(saved) };
    }
  }
  // Get current notification settings
  getPreferences() {
    return { ...this.preferences };
  }
  // Test notification system
  async testNotification(memberId, type = "sms") {
    const member = familyMembers.find((m) => m.id === memberId);
    if (!member) {
      throw new Error("Member not found");
    }
    const testPayment = {
      id: "test",
      provider: "Test Service",
      type: "test",
      amount: 100,
      dueDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    const message = type === "sms" ? this.generateSMSMessage(testPayment, member, "reminder") : this.generateWhatsAppMessage(testPayment, member, "reminder");
    if (type === "sms") {
      await this.sendSMS(member.phoneNumber, message);
    } else {
      await this.sendWhatsApp(member.whatsappNumber, message);
    }
    return { success: true, message };
  }
}
const notificationService = new NotificationService();
if (typeof window !== "undefined") {
  notificationService.loadPreferences();
  notificationService.init();
}
function FinancesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalFamilyBudget, totalAllocated, remainingBudget, budgetUtilization;
    let activeSection = "dashboard";
    let selectedMember = null;
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    function handleMemberClick(member) {
      selectedMember = member;
    }
    const FinanceSections = [
      {
        id: "dashboard",
        name: "Dashboard",
        tamil: "டாஷ்போர்டு",
        icon: "heroicons:home",
        description: "Overview & Analytics"
      },
      {
        id: "recharges",
        name: "Recharges",
        tamil: "ரீசார்ஜ்",
        icon: "heroicons:device-phone-mobile",
        description: "Monthly Bills & Renewals"
      },
      {
        id: "expenses",
        name: "Expenses",
        tamil: "செலவுகள்",
        icon: "heroicons:credit-card",
        description: "Track Daily Expenses"
      },
      {
        id: "budget",
        name: "Budget",
        tamil: "பட்ஜெட்",
        icon: "heroicons:calculator",
        description: "Budget Planning & Analysis"
      },
      {
        id: "insurance",
        name: "Insurance",
        tamil: "காப்பீடு",
        icon: "heroicons:shield-check",
        description: "Insurance Management"
      },
      {
        id: "investments",
        name: "Investments",
        tamil: "முதலீடுகள்",
        icon: "heroicons:chart-line",
        description: "Investment Tracking"
      }
    ];
    FinanceSections.find((s) => s.id === activeSection);
    totalFamilyBudget = familyMembers.reduce((sum, member) => sum + member.monthlyBudget, 0);
    totalAllocated = totalMonthlyRecharges;
    remainingBudget = totalFamilyBudget - totalAllocated;
    budgetUtilization = totalAllocated / totalFamilyBudget * 100;
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-green-100 p-3 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-8 h-8 text-green-600"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">Family Finance Management Suite</h1> <p class="text-lg text-gray-600">குடும்ப நிதி மேலாண்மை தொகுப்பு</p> <p class="text-sm text-gray-500">Comprehensive financial planning for South Indian families</p></div></div> <div class="flex space-x-3"><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:paper-airplane", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Send Summary</span></button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Export Report</span></button></div></div> <div class="flex flex-wrap gap-2"><!--[-->`);
    const each_array = ensure_array_like(FinanceSections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(activeSection === section.id ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: section.icon, class: "w-5 h-5" });
      $$renderer2.push(`<!----> <div class="text-left"><div class="font-medium">${escape_html(section.name)}</div> <div class="text-xs opacity-75">${escape_html(section.tamil)}</div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
    if (activeTab === "overview") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="bg-white rounded-lg p-6 shadow-sm border border-blue-100"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
      $$renderer2.push(`<!----></div> <div class="ml-4"><p class="text-sm text-gray-600">Family Budget</p> <p class="text-2xl font-bold text-blue-600">${escape_html(formatCurrency(totalFamilyBudget))}</p></div></div></div> <div class="bg-white rounded-lg p-6 shadow-sm border border-orange-100"><div class="flex items-center"><div class="p-3 bg-orange-100 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:credit-card",
        class: "w-6 h-6 text-orange-600"
      });
      $$renderer2.push(`<!----></div> <div class="ml-4"><p class="text-sm text-gray-600">Monthly Bills</p> <p class="text-2xl font-bold text-orange-600">${escape_html(formatCurrency(totalAllocated))}</p></div></div></div> <div class="bg-white rounded-lg p-6 shadow-sm border border-green-100"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:wallet", class: "w-6 h-6 text-green-600" });
      $$renderer2.push(`<!----></div> <div class="ml-4"><p class="text-sm text-gray-600">Available</p> <p class="text-2xl font-bold text-green-600">${escape_html(formatCurrency(remainingBudget))}</p></div></div></div> <div class="bg-white rounded-lg p-6 shadow-sm border border-purple-100"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:chart-pie",
        class: "w-6 h-6 text-purple-600"
      });
      $$renderer2.push(`<!----></div> <div class="ml-4"><p class="text-sm text-gray-600">Budget Used</p> <p class="text-2xl font-bold text-purple-600">${escape_html(budgetUtilization.toFixed(1))}%</p></div></div></div></div> <div><h2 class="text-xl font-semibold text-gray-900 mb-6">Family Financial Overview</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_1 = ensure_array_like(familyMembers);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let member = each_array_1[$$index_1];
        FamilyMemberCard($$renderer2, { member, onClick: handleMemberClick });
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-lg shadow-sm border p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><button class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div class="p-2 bg-blue-100 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 text-blue-600" });
      $$renderer2.push(`<!----></div> <div class="text-left"><h4 class="font-medium text-gray-900">Add Expense</h4> <p class="text-sm text-gray-600">Log a new family expense</p></div></button> <button class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div class="p-2 bg-green-100 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:device-phone-mobile",
        class: "w-5 h-5 text-green-600"
      });
      $$renderer2.push(`<!----></div> <div class="text-left"><h4 class="font-medium text-gray-900">Pay Bills</h4> <p class="text-sm text-gray-600">Manage monthly recharges</p></div></button> <button class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div class="p-2 bg-purple-100 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:chart-bar",
        class: "w-5 h-5 text-purple-600"
      });
      $$renderer2.push(`<!----></div> <div class="text-left"><h4 class="font-medium text-gray-900">View Analytics</h4> <p class="text-sm text-gray-600">Budget analysis &amp; trends</p></div></button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (activeTab === "family") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-6"><div><h2 class="text-xl font-semibold text-gray-900 mb-6">Family Member Financial Profiles</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!--[-->`);
        const each_array_2 = ensure_array_like(familyMembers);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let member = each_array_2[$$index_2];
          FamilyMemberCard($$renderer2, { member, showDetails: true });
        }
        $$renderer2.push(`<!--]--></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (activeTab === "recharges") {
          $$renderer2.push("<!--[-->");
          RechargeTracker($$renderer2, {});
        } else {
          $$renderer2.push("<!--[!-->");
          if (activeTab === "expenses") {
            $$renderer2.push("<!--[-->");
            ExpenseLogger($$renderer2, {});
          } else {
            $$renderer2.push("<!--[!-->");
            if (activeTab === "budget") {
              $$renderer2.push("<!--[-->");
              BudgetDashboard($$renderer2, {});
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (showMemberDetails && selectedMember) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-bold text-gray-900">${escape_html(selectedMember.name)} - Financial Profile</h2> <button class="text-gray-400 hover:text-gray-600">`);
      Icon($$renderer2, { icon: "heroicons:x-mark", class: "w-6 h-6" });
      $$renderer2.push(`<!----></button></div> <div class="space-y-6"><div class="flex items-center space-x-4"><span class="text-4xl">${escape_html(selectedMember.avatar)}</span> <div><h3 class="text-lg font-semibold">${escape_html(selectedMember.name)}</h3> <p class="text-gray-600 capitalize">${escape_html(selectedMember.role)} • Age ${escape_html(selectedMember.age)}</p> <p class="text-sm text-gray-500">Preferred Language: ${escape_html(selectedMember.preferredLanguage)}</p></div></div> <div class="bg-gray-50 rounded-lg p-4"><h4 class="font-medium text-gray-900 mb-3">Budget Allocation</h4> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600">Monthly Budget:</span> <span class="font-semibold">${escape_html(formatCurrency(selectedMember.monthlyBudget))}</span></div></div></div> <div><h4 class="font-medium text-gray-900 mb-3">Financial Responsibilities</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_3 = ensure_array_like(selectedMember.responsibilities);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let responsibility = each_array_3[$$index_3];
        $$renderer2.push(`<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${escape_html(responsibility)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div><h4 class="font-medium text-gray-900 mb-3">Contact Information</h4> <div class="space-y-2"><div class="flex items-center space-x-2">`);
      Icon($$renderer2, { icon: "heroicons:phone", class: "w-4 h-4 text-gray-500" });
      $$renderer2.push(`<!----> <span class="text-gray-600">Phone:</span> <span>${escape_html(selectedMember.phoneNumber)}</span></div> <div class="flex items-center space-x-2">`);
      Icon($$renderer2, {
        icon: "simple-icons:whatsapp",
        class: "w-4 h-4 text-green-500"
      });
      $$renderer2.push(`<!----> <span class="text-gray-600">WhatsApp:</span> <span>${escape_html(selectedMember.whatsappNumber)}</span></div></div></div></div> <div class="flex justify-end space-x-3 pt-6 border-t border-gray-100 mt-6"><button class="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Close</button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Reminder</button></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  FinancesPage($$renderer);
}
export {
  _page as default
};
