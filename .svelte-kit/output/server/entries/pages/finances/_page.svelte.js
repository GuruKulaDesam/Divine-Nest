import "clsx";
import { b as attr_class, s as stringify, j as attr_style, a as ensure_array_like, l as bind_props } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { k as fallback } from "../../../chunks/utils.js";
import "../../../chunks/theme.js";
import { m as monthlyRecharges, y as yearlyRenewals, f as familyMembers, t as totalMonthlyRecharges } from "../../../chunks/notificationService.js";
import { e as escape_html } from "../../../chunks/context.js";
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
function FinancesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalFamilyBudget, totalAllocated, remainingBudget, budgetUtilization;
    let activeTab = "overview";
    let selectedMember = null;
    let showMemberDetails = false;
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);
    }
    function handleMemberClick(member) {
      selectedMember = member;
      showMemberDetails = true;
    }
    totalFamilyBudget = familyMembers.reduce((sum, member) => sum + member.monthlyBudget, 0);
    totalAllocated = totalMonthlyRecharges;
    remainingBudget = totalFamilyBudget - totalAllocated;
    budgetUtilization = totalAllocated / totalFamilyBudget * 100;
    $$renderer2.push(`<div class="min-h-screen bg-gray-50"><div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div><h1 class="text-2xl font-bold text-gray-900">💰 Family Finances</h1> <p class="text-sm text-gray-600">Manage family budget, expenses, and financial planning</p></div> <div class="flex space-x-3"><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:paper-airplane", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Send Summary</span></button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:arrow-down-tray", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Export Report</span></button></div></div></div></div> <div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><nav class="flex space-x-8" aria-label="Tabs"><!--[-->`);
    const each_array = ensure_array_like([
      { id: "overview", name: "Overview", icon: "heroicons:home" },
      {
        id: "family",
        name: "Family Members",
        icon: "heroicons:users"
      },
      {
        id: "recharges",
        name: "Monthly Bills",
        icon: "heroicons:device-phone-mobile"
      },
      {
        id: "expenses",
        name: "Expense Tracker",
        icon: "heroicons:receipt-percent"
      },
      {
        id: "budget",
        name: "Budget Analytics",
        icon: "heroicons:chart-pie"
      }
    ]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${stringify(activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>${escape_html(tab.name)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></nav></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
    {
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
