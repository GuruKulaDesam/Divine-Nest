import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/runtime.js";
import { T as escape_html } from "../../../../chunks/context.js";
function InvestmentsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredInvestments;
    let investments = [
      {
        id: 1,
        type: "Mutual Fund",
        name: "SBI Bluechip Fund",
        invested: 1e5,
        currentValue: 125e3,
        returns: 25e3,
        returnPercentage: 25,
        category: "Equity",
        risk: "Moderate"
      },
      {
        id: 2,
        type: "Stock",
        name: "Reliance Industries",
        invested: 5e4,
        currentValue: 65e3,
        returns: 15e3,
        returnPercentage: 30,
        category: "Large Cap",
        risk: "High"
      },
      {
        id: 3,
        type: "Fixed Deposit",
        name: "HDFC FD",
        invested: 2e5,
        currentValue: 215e3,
        returns: 15e3,
        returnPercentage: 7.5,
        category: "Fixed Income",
        risk: "Low"
      }
    ];
    let filterType = "";
    let filterRisk = "";
    function getTypeIcon(type) {
      const icons = {
        "Mutual Fund": "heroicons:chart-bar",
        "Stock": "heroicons:trending-up",
        "Fixed Deposit": "heroicons:banknotes",
        "Bonds": "heroicons:document-text",
        "Gold": "heroicons:star",
        "Real Estate": "heroicons:home",
        "Crypto": "heroicons:currency-dollar"
      };
      return icons[type] || "heroicons:chart-bar";
    }
    function getRiskColor(risk) {
      switch (risk) {
        case "Low":
          return "text-green-600";
        case "Moderate":
          return "text-yellow-600";
        case "High":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
    function getTotalInvested() {
      return investments.reduce((total, inv) => total + inv.invested, 0);
    }
    function getTotalValue() {
      return investments.reduce((total, inv) => total + inv.currentValue, 0);
    }
    function getTotalReturns() {
      return investments.reduce((total, inv) => total + inv.returns, 0);
    }
    filteredInvestments = investments.filter((inv) => {
      return true;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Investment Portfolio</h1> <p class="text-base-content/70 mt-2">Track your investments and returns</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Add Investment</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Invested</h3> <p class="text-2xl font-bold text-blue-600">₹${escape_html(getTotalInvested().toLocaleString())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:trending-up",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Current Value</h3> <p class="text-2xl font-bold text-green-600">₹${escape_html(getTotalValue().toLocaleString())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-trending-up",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Returns</h3> <p class="text-2xl font-bold text-purple-600">₹${escape_html(getTotalReturns().toLocaleString())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-yellow-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-6 h-6 text-yellow-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Avg Return</h3> <p class="text-2xl font-bold text-yellow-600">${escape_html((getTotalReturns() / getTotalInvested() * 100).toFixed(1))}%</p></div></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex flex-wrap gap-4"><div class="form-control"><label class="label"><span class="label-text">Type</span></label> `);
    $$renderer2.select({ value: filterType, class: "select select-bordered select-sm" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`All Types`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Mutual Fund`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Stock`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Fixed Deposit`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Bonds`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Gold`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Real Estate`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Crypto`);
      });
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Risk Level</span></label> `);
    $$renderer2.select({ value: filterRisk, class: "select select-bordered select-sm" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`All Risk Levels`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Low`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`Moderate`);
      });
      $$renderer3.option({}, ($$renderer4) => {
        $$renderer4.push(`High`);
      });
    });
    $$renderer2.push(`</div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array = ensure_array_like(filteredInvestments);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let investment = each_array[$$index];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center justify-between mb-4"><div class="flex items-center"><div class="p-2 bg-blue-100 rounded-lg mr-3">`);
      Icon($$renderer2, {
        icon: getTypeIcon(investment.type),
        class: "w-5 h-5 text-blue-600"
      });
      $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-lg">${escape_html(investment.name)}</h3> <p class="text-sm text-base-content/70">${escape_html(investment.type)}</p></div></div> <span${attr_class(`badge ${stringify(investment.returnPercentage >= 0 ? "badge-success" : "badge-error")}`)}>${escape_html(investment.returnPercentage >= 0 ? "+" : "")}${escape_html(investment.returnPercentage)}%</span></div> <div class="space-y-2"><div class="flex justify-between"><span class="text-sm text-base-content/70">Invested</span> <span class="font-semibold">₹${escape_html(investment.invested.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Current Value</span> <span class="font-semibold">₹${escape_html(investment.currentValue.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Returns</span> <span${attr_class(`font-semibold ${stringify(investment.returns >= 0 ? "text-green-600" : "text-red-600")}`)}>₹${escape_html(investment.returns.toLocaleString())}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Category</span> <span class="text-sm">${escape_html(investment.category)}</span></div> <div class="flex justify-between"><span class="text-sm text-base-content/70">Risk</span> <span${attr_class(`text-sm ${stringify(getRiskColor(investment.risk))}`)}>${escape_html(investment.risk)}</span></div></div> <div class="card-actions justify-end mt-4"><button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> View Details</button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> Edit</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Type</th><th>Name</th><th>Invested</th><th>Current Value</th><th>Returns</th><th>Return %</th><th>Category</th><th>Risk</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_1 = ensure_array_like(filteredInvestments);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let investment = each_array_1[$$index_1];
      $$renderer2.push(`<tr><td><div class="flex items-center">`);
      Icon($$renderer2, { icon: getTypeIcon(investment.type), class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> ${escape_html(investment.type)}</div></td><td class="font-semibold">${escape_html(investment.name)}</td><td>₹${escape_html(investment.invested.toLocaleString())}</td><td>₹${escape_html(investment.currentValue.toLocaleString())}</td><td${attr_class(`${stringify(investment.returns >= 0 ? "text-green-600" : "text-red-600")} font-semibold`)}>₹${escape_html(investment.returns.toLocaleString())}</td><td${attr_class(`${stringify(investment.returnPercentage >= 0 ? "text-green-600" : "text-red-600")} font-semibold`)}>${escape_html(investment.returnPercentage >= 0 ? "+" : "")}${escape_html(investment.returnPercentage)}%</td><td>${escape_html(investment.category)}</td><td><span${attr_class(`${stringify(getRiskColor(investment.risk))} font-medium`)}>${escape_html(investment.risk)}</span></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
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
  InvestmentsPage($$renderer);
}
export {
  _page as default
};
