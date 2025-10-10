import "clsx";
import { h as head, b as attr_class, d as attr, g as clsx, a as ensure_array_like, s as stringify, j as attr_style } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function ValuePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredAssets, categoryTotals;
    let searchTerm = "";
    let selectedCategory = "all";
    let selectedTimeframe = "all";
    let assetValues = [];
    let totalValue = 0;
    let valueChange = 0;
    let valueChangePercent = 0;
    const categories = [
      {
        id: "real_estate",
        name: "Real Estate",
        icon: "heroicons:home",
        color: "text-blue-600"
      },
      {
        id: "vehicles",
        name: "Vehicles",
        icon: "heroicons:truck",
        color: "text-green-600"
      },
      {
        id: "investments",
        name: "Investments",
        icon: "heroicons:currency-rupee",
        color: "text-yellow-600"
      },
      {
        id: "jewelry",
        name: "Jewelry & Gold",
        icon: "heroicons:sparkles",
        color: "text-purple-600"
      },
      {
        id: "electronics",
        name: "Electronics",
        icon: "heroicons:device-phone-mobile",
        color: "text-cyan-600"
      },
      {
        id: "furniture",
        name: "Furniture",
        icon: "heroicons:home-modern",
        color: "text-orange-600"
      },
      {
        id: "other",
        name: "Other Assets",
        icon: "heroicons:question-mark-circle",
        color: "text-gray-600"
      }
    ];
    const timeframes = [
      { id: "all", name: "All Time" },
      { id: "year", name: "This Year" },
      { id: "month", name: "This Month" },
      { id: "week", name: "This Week" }
    ];
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
    function getChangeColor(change) {
      return change >= 0 ? "text-green-600" : "text-red-600";
    }
    function getChangeIcon(change) {
      return change >= 0 ? "heroicons:arrow-trending-up" : "heroicons:arrow-trending-down";
    }
    filteredAssets = assetValues.filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    categoryTotals = categories.map((category) => {
      const categoryAssets = assetValues.filter((asset) => asset.category === category.id);
      const currentValue = categoryAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
      const purchaseValue = categoryAssets.reduce((sum, asset) => sum + asset.purchaseValue, 0);
      const change = currentValue - purchaseValue;
      const changePercent = purchaseValue > 0 ? change / purchaseValue * 100 : 0;
      return {
        ...category,
        currentValue,
        purchaseValue,
        change,
        changePercent,
        count: categoryAssets.length
      };
    }).filter((cat) => cat.count > 0);
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Asset Value Tracking - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Track and monitor the value of your family assets over time"/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto p-6 space-y-6"><div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:currency-rupee", class: "w-8 h-8" });
    $$renderer2.push(`<!----> <div><h1 class="text-2xl font-bold">Asset Value Tracking</h1> <p class="text-green-100">Monitor your family's wealth and asset appreciation</p></div></div> <div class="text-right"><div class="text-3xl font-bold">${escape_html(formatCurrency(totalValue))}</div> <div class="flex items-center gap-2 text-sm">`);
    Icon($$renderer2, { icon: getChangeIcon(valueChange), class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span${attr_class(clsx(getChangeColor(valueChange)))}>${escape_html("+")}${escape_html(formatCurrency(valueChange))} (${escape_html("+")}${escape_html(valueChangePercent.toFixed(1))}%)</span></div></div></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div><input type="text"${attr("value", searchTerm)} placeholder="Search assets..." class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"/></div> <div>`);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div>`);
    $$renderer2.select(
      {
        value: selectedTimeframe,
        class: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(timeframes);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let timeframe = each_array_1[$$index_1];
          $$renderer3.option({ value: timeframe.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(timeframe.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="flex flex-wrap gap-2"><button${attr_class(`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${stringify(
      "bg-green-100 text-green-800"
    )}`)}>All Assets</button> <!--[-->`);
    const each_array_2 = ensure_array_like(categories);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let category = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class(`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${stringify(selectedCategory === category.id ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(category.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_3 = ensure_array_like(categoryTotals);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let category = each_array_3[$$index_3];
      $$renderer2.push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: category.icon,
        class: `w-6 h-6 ${stringify(category.color)}`
      });
      $$renderer2.push(`<!----> <div><h3 class="font-semibold text-gray-900">${escape_html(category.name)}</h3> <p class="text-sm text-gray-500">${escape_html(category.count)} assets</p></div></div></div> <div class="space-y-2"><div class="flex justify-between items-center"><span class="text-sm text-gray-600">Current Value</span> <span class="font-semibold text-gray-900">${escape_html(formatCurrency(category.currentValue))}</span></div> <div class="flex justify-between items-center"><span class="text-sm text-gray-600">Purchase Value</span> <span class="text-sm text-gray-500">${escape_html(formatCurrency(category.purchaseValue))}</span></div> <div class="flex justify-between items-center pt-2 border-t"><span class="text-sm font-medium text-gray-700">Change</span> <div class="flex items-center gap-1">`);
      Icon($$renderer2, {
        icon: getChangeIcon(category.change),
        class: `w-4 h-4 ${stringify(getChangeColor(category.change))}`
      });
      $$renderer2.push(`<!----> <span${attr_class(`font-semibold ${stringify(getChangeColor(category.change))}`)}>${escape_html(category.change >= 0 ? "+" : "")}${escape_html(category.changePercent.toFixed(1))}%</span></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:building-storefront",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> Asset Details (${escape_html(filteredAssets.length)})</h2></div> <div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Value</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appreciation</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
    const each_array_4 = ensure_array_like(filteredAssets);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let asset = each_array_4[$$index_4];
      $$renderer2.push(`<tr class="hover:bg-gray-50"><td class="px-4 py-4 whitespace-nowrap"><div><div class="text-sm font-medium text-gray-900">${escape_html(asset.name)}</div> <div class="text-sm text-gray-500">${escape_html(asset.description)}</div></div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${escape_html(categories.find((c) => c.id === asset.category)?.name)}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm font-semibold text-gray-900">${escape_html(formatCurrency(asset.currentValue))}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-500">${escape_html(formatCurrency(asset.purchaseValue))}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="flex items-center gap-1">`);
      Icon($$renderer2, {
        icon: getChangeIcon(asset.appreciation),
        class: `w-4 h-4 ${stringify(getChangeColor(asset.appreciation))}`
      });
      $$renderer2.push(`<!----> <span${attr_class(`text-sm font-medium ${stringify(getChangeColor(asset.appreciation))}`)}>${escape_html(asset.appreciation >= 0 ? "+" : "")}${escape_html(asset.appreciation.toFixed(1))}%</span></div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-500">${escape_html(asset.purchaseDate)}</div></td><td class="px-4 py-4 whitespace-nowrap"><div class="text-sm text-gray-500">${escape_html(asset.location)}</div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-5 h-5 text-green-600" });
    $$renderer2.push(`<!----> Value Distribution</h3> <div class="space-y-3"><!--[-->`);
    const each_array_5 = ensure_array_like(categoryTotals.sort((a, b) => b.currentValue - a.currentValue));
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let category = each_array_5[$$index_5];
      $$renderer2.push(`<div class="flex items-center justify-between"><div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: category.icon,
        class: `w-4 h-4 ${stringify(category.color)}`
      });
      $$renderer2.push(`<!----> <span class="text-sm font-medium">${escape_html(category.name)}</span></div> <div class="text-right"><div class="text-sm font-semibold">${escape_html(formatCurrency(category.currentValue))}</div> <div class="text-xs text-gray-500">${escape_html((category.currentValue / totalValue * 100).toFixed(1))}%</div></div></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full"${attr_style(`width: ${stringify(0)}%`)}></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-trending-up",
      class: "w-5 h-5 text-blue-600"
    });
    $$renderer2.push(`<!----> Performance Summary</h3> <div class="space-y-4"><div class="flex justify-between items-center p-3 bg-green-50 rounded-lg"><span class="text-sm font-medium text-green-800">Best Performer</span> <span class="text-sm font-semibold text-green-800">${escape_html(categoryTotals.reduce((max, cat) => cat.changePercent > max.changePercent ? cat : max, categoryTotals[0])?.name || "N/A")}</span></div> <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg"><span class="text-sm font-medium text-red-800">Needs Attention</span> <span class="text-sm font-semibold text-red-800">${escape_html(categoryTotals.reduce((min, cat) => cat.changePercent < min.changePercent ? cat : min, categoryTotals[0])?.name || "N/A")}</span></div> <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg"><span class="text-sm font-medium text-blue-800">Total Assets</span> <span class="text-sm font-semibold text-blue-800">${escape_html(assetValues.length)}</span></div> <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg"><span class="text-sm font-medium text-purple-800">Categories</span> <span class="text-sm font-semibold text-purple-800">${escape_html(categoryTotals.length)}</span></div></div></div></div></div>`);
  });
}
function _page($$renderer) {
  ValuePage($$renderer);
}
export {
  _page as default
};
