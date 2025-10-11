import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function InsurancePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let policies = [
      {
        id: 1,
        type: "Health Insurance",
        provider: "Star Health",
        policyNumber: "SH123456789",
        coverage: 5e5,
        premium: 12e3,
        renewalDate: "2024-03-15",
        status: "active",
        beneficiaries: ["John Doe", "Jane Doe"]
      },
      {
        id: 2,
        type: "Life Insurance",
        provider: "LIC",
        policyNumber: "LIC987654321",
        coverage: 1e6,
        premium: 25e3,
        renewalDate: "2024-06-20",
        status: "active",
        beneficiaries: ["Jane Doe"]
      },
      {
        id: 3,
        type: "Vehicle Insurance",
        provider: "Bajaj Allianz",
        policyNumber: "BA456789123",
        coverage: 8e5,
        premium: 8500,
        renewalDate: "2024-02-10",
        status: "expiring-soon",
        beneficiaries: ["John Doe"]
      }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "active":
          return "badge-success";
        case "expiring-soon":
          return "badge-warning";
        case "expired":
          return "badge-error";
        default:
          return "badge-neutral";
      }
    }
    function getTypeIcon(type) {
      const icons = {
        "Health Insurance": "heroicons:heart",
        "Life Insurance": "heroicons:user-group",
        "Vehicle Insurance": "heroicons:truck",
        "Property Insurance": "heroicons:home",
        "Travel Insurance": "heroicons:plane",
        "Other": "heroicons:shield-check"
      };
      return icons[type] || icons["Other"];
    }
    function getTotalCoverage() {
      return policies.reduce((total, policy) => total + policy.coverage, 0);
    }
    function getTotalPremium() {
      return policies.reduce((total, policy) => total + policy.premium, 0);
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Insurance Policies</h1> <p class="text-base-content/70 mt-2">Manage your insurance coverage and policies</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Add Policy</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:shield-check",
      class: "w-6 h-6 text-blue-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Coverage</h3> <p class="text-2xl font-bold text-blue-600">₹${escape_html(getTotalCoverage().toLocaleString())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-green-600" });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Annual Premium</h3> <p class="text-2xl font-bold text-green-600">₹${escape_html(getTotalPremium().toLocaleString())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:document-check",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Active Policies</h3> <p class="text-2xl font-bold text-purple-600">${escape_html(policies.filter((p) => p.status === "active").length)}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-yellow-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-yellow-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Expiring Soon</h3> <p class="text-2xl font-bold text-yellow-600">${escape_html(policies.filter((p) => p.status === "expiring-soon").length)}</p></div></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array = ensure_array_like(policies);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let policy = each_array[$$index_1];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center justify-between mb-4"><div class="flex items-center"><div class="p-2 bg-blue-100 rounded-lg mr-3">`);
      Icon($$renderer2, {
        icon: getTypeIcon(policy.type),
        class: "w-5 h-5 text-blue-600"
      });
      $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-lg">${escape_html(policy.type)}</h3> <p class="text-sm text-base-content/70">${escape_html(policy.provider)}</p></div></div> <span${attr_class(`badge ${stringify(getStatusColor(policy.status))}`)}>${escape_html(policy.status === "active" ? "Active" : policy.status === "expiring-soon" ? "Expiring Soon" : "Expired")}</span></div> <div class="space-y-2"><div class="flex justify-between"><span class="text-sm text-base-content/70">Policy Number</span> <span class="font-mono text-sm">${escape_html(policy.policyNumber)}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Coverage</span> <span class="font-semibold">₹${escape_html(policy.coverage.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Annual Premium</span> <span class="font-semibold">₹${escape_html(policy.premium.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Renewal Date</span> <span class="text-sm">${escape_html(policy.renewalDate)}</span></div></div> <div class="mt-4"><p class="text-sm text-base-content/70 mb-2">Beneficiaries:</p> <div class="flex flex-wrap gap-1"><!--[-->`);
      const each_array_1 = ensure_array_like(policy.beneficiaries);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let beneficiary = each_array_1[$$index];
        $$renderer2.push(`<span class="badge badge-outline badge-sm">${escape_html(beneficiary)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="card-actions justify-end mt-4"><button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> View</button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> Edit</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Type</th><th>Provider</th><th>Policy Number</th><th>Coverage</th><th>Premium</th><th>Renewal Date</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_2 = ensure_array_like(policies);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let policy = each_array_2[$$index_2];
      $$renderer2.push(`<tr><td><div class="flex items-center">`);
      Icon($$renderer2, { icon: getTypeIcon(policy.type), class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> ${escape_html(policy.type)}</div></td><td>${escape_html(policy.provider)}</td><td class="font-mono text-sm">${escape_html(policy.policyNumber)}</td><td class="font-semibold">₹${escape_html(policy.coverage.toLocaleString())}</td><td>₹${escape_html(policy.premium.toLocaleString())}</td><td>${escape_html(policy.renewalDate)}</td><td><span${attr_class(`badge ${stringify(getStatusColor(policy.status))}`)}>${escape_html(policy.status === "active" ? "Active" : policy.status === "expiring-soon" ? "Expiring Soon" : "Expired")}</span></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="btn btn-sm btn-ghost text-red-600">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  InsurancePage($$renderer);
}
export {
  _page as default
};
