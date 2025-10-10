import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { T as escape_html } from "../../../../chunks/context.js";
function RechargesPage($$renderer) {
  let recharges = [
    {
      id: 1,
      type: "Mobile",
      provider: "Airtel",
      amount: 299,
      date: "2024-01-15",
      status: "completed",
      number: "+91 98765 43210"
    },
    {
      id: 2,
      type: "DTH",
      provider: "Tata Play",
      amount: 499,
      date: "2024-01-14",
      status: "completed",
      number: "Subscriber ID: 123456789"
    }
  ];
  function getStatusColor(status) {
    switch (status) {
      case "completed":
        return "badge-success";
      case "pending":
        return "badge-warning";
      case "failed":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  }
  $$renderer.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Recharges</h1> <p class="text-base-content/70 mt-2">Manage mobile, DTH, and utility recharges</p></div> <button class="btn btn-primary">`);
  Icon($$renderer, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
  $$renderer.push(`<!----> Add Recharge</button></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
  Icon($$renderer, {
    icon: "heroicons:device-phone-mobile",
    class: "w-6 h-6 text-blue-600"
  });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Mobile Recharges</h3> <p class="text-2xl font-bold text-blue-600">12</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
  Icon($$renderer, { icon: "heroicons:tv", class: "w-6 h-6 text-green-600" });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">DTH Recharges</h3> <p class="text-2xl font-bold text-green-600">8</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
  Icon($$renderer, {
    icon: "heroicons:banknotes",
    class: "w-6 h-6 text-purple-600"
  });
  $$renderer.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Spent</h3> <p class="text-2xl font-bold text-purple-600">₹4,280</p></div></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Type</th><th>Provider</th><th>Number/ID</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
  const each_array = ensure_array_like(recharges);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let recharge = each_array[$$index];
    $$renderer.push(`<tr><td><div class="flex items-center">`);
    Icon($$renderer, {
      icon: recharge.type === "Mobile" ? "heroicons:device-phone-mobile" : "heroicons:tv",
      class: "w-4 h-4 mr-2"
    });
    $$renderer.push(`<!----> ${escape_html(recharge.type)}</div></td><td>${escape_html(recharge.provider)}</td><td class="font-mono text-sm">${escape_html(recharge.number)}</td><td class="font-semibold">₹${escape_html(recharge.amount)}</td><td>${escape_html(recharge.date)}</td><td><span${attr_class(`badge ${stringify(getStatusColor(recharge.status))}`)}>${escape_html(recharge.status)}</span></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:eye", class: "w-4 h-4" });
    $$renderer.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
    Icon($$renderer, { icon: "heroicons:pencil", class: "w-4 h-4" });
    $$renderer.push(`<!----></button></div></td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></div></div></div></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function _page($$renderer) {
  RechargesPage($$renderer);
}
export {
  _page as default
};
