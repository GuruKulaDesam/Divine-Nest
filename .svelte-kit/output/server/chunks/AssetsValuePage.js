import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function AssetsValuePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentView = "overview";
    let searchTerm = "";
    let selectedCategory = "all";
    const views = [
      {
        id: "overview",
        label: "Portfolio Overview",
        icon: "heroicons:chart-pie"
      },
      {
        id: "valuations",
        label: "Asset Valuations",
        icon: "heroicons:currency-rupee"
      },
      {
        id: "trends",
        label: "Value Trends",
        icon: "heroicons:chart-bar"
      }
    ];
    const portfolioSummary = {
      totalValue: 2847500,
      purchaseValue: 2156e3,
      appreciation: 691500,
      appreciationPercent: 32.1,
      depreciatingAssets: 8,
      appreciatingAssets: 12
    };
    const assetValueData = [
      {
        id: 1,
        name: "Gold Jewelry Collection",
        tamilName: "தங்க நகை சேகரிப்பு",
        category: "jewelry",
        purchaseValue: 45e4,
        currentValue: 627e3,
        purchaseDate: "2020-03-15",
        lastValuation: "2024-11-01",
        valueChange: 177e3,
        changePercent: 39.3,
        trend: "appreciating",
        weight: "125 grams",
        purity: "22K",
        notes: "Traditional South Indian jewelry collection. Market value based on current gold rates.",
        appraisedBy: "Kumar Jewellers",
        nextValuation: "2025-05-01"
      },
      {
        id: 2,
        name: "Honda Activa 6G",
        tamilName: "ஹோண்டா ஆக்டிவா",
        category: "vehicles",
        purchaseValue: 78e3,
        currentValue: 52e3,
        purchaseDate: "2022-06-10",
        lastValuation: "2024-10-15",
        valueChange: -26e3,
        changePercent: -33.3,
        trend: "depreciating",
        model: "2022",
        mileage: "15,432 km",
        condition: "Good",
        notes: "Regular maintenance done. Minor scratches on body.",
        appraisedBy: "Honda Showroom",
        nextValuation: "2025-04-15"
      },
      {
        id: 3,
        name: 'Samsung 55" QLED TV',
        tamilName: "சாம்சங் டிவி",
        category: "electronics",
        purchaseValue: 89e3,
        currentValue: 45e3,
        purchaseDate: "2021-11-20",
        lastValuation: "2024-11-10",
        valueChange: -44e3,
        changePercent: -49.4,
        trend: "depreciating",
        model: "QN55Q70A",
        condition: "Excellent",
        warrantyStatus: "Expired",
        notes: "Minimal usage, excellent picture quality. Warranty expired in 2023.",
        appraisedBy: "Electronics Mart",
        nextValuation: "2025-11-10"
      },
      {
        id: 4,
        name: "Teak Wood Dining Set",
        tamilName: "தேக்கு மர சாப்பாட்டு மேசை",
        category: "furniture",
        purchaseValue: 125e3,
        currentValue: 165e3,
        purchaseDate: "2019-08-12",
        lastValuation: "2024-09-20",
        valueChange: 4e4,
        changePercent: 32,
        trend: "appreciating",
        material: "Burma Teak",
        condition: "Excellent",
        age: "5 years",
        notes: "Handcrafted traditional design. Value increased due to teak wood appreciation.",
        appraisedBy: "Antique Furniture Appraisers",
        nextValuation: "2025-09-20"
      },
      {
        id: 5,
        name: "LG Double Door Refrigerator",
        tamilName: "எல்ஜி குளிர்சாதன பெட்டி",
        category: "appliances",
        purchaseValue: 52e3,
        currentValue: 28e3,
        purchaseDate: "2020-12-05",
        lastValuation: "2024-10-30",
        valueChange: -24e3,
        changePercent: -46.2,
        trend: "depreciating",
        model: "GL-T372JDS3",
        capacity: "335L",
        condition: "Good",
        notes: "Working perfectly. Some minor dents on exterior.",
        appraisedBy: "Second Hand Appliances",
        nextValuation: "2025-10-30"
      },
      {
        id: 6,
        name: "Silver Coin Collection",
        tamilName: "வெள்ளி நாணயம் சேகரிப்பு",
        category: "collectibles",
        purchaseValue: 45e3,
        currentValue: 58e3,
        purchaseDate: "2018-01-15",
        lastValuation: "2024-11-05",
        valueChange: 13e3,
        changePercent: 28.9,
        trend: "appreciating",
        weight: "1.2 kg",
        purity: "999 Silver",
        pieces: "24 coins",
        notes: "Mix of commemorative and regular silver coins. Premium for collectible value.",
        appraisedBy: "Numismatic Society",
        nextValuation: "2025-05-05"
      }
    ];
    const categoryStats = [
      {
        category: "jewelry",
        totalValue: 685e3,
        count: 3,
        change: 35.2
      },
      {
        category: "vehicles",
        totalValue: 152e3,
        count: 2,
        change: -28.5
      },
      {
        category: "electronics",
        totalValue: 267e3,
        count: 6,
        change: -42.3
      },
      {
        category: "furniture",
        totalValue: 445e3,
        count: 4,
        change: 18.7
      },
      {
        category: "appliances",
        totalValue: 156e3,
        count: 5,
        change: -35.8
      },
      {
        category: "collectibles",
        totalValue: 138e3,
        count: 3,
        change: 22.4
      }
    ];
    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
    }
    function getCategoryIcon(category) {
      const icons = {
        jewelry: "heroicons:sparkles",
        vehicles: "heroicons:truck",
        electronics: "heroicons:computer-desktop",
        furniture: "heroicons:home",
        appliances: "heroicons:cog-6-tooth",
        collectibles: "heroicons:star"
      };
      return icons[category] || "heroicons:cube";
    }
    function getCategoryColor(category) {
      const colors = {
        jewelry: "from-yellow-400 to-orange-500",
        vehicles: "from-blue-500 to-indigo-600",
        electronics: "from-purple-500 to-pink-600",
        furniture: "from-green-500 to-emerald-600",
        appliances: "from-gray-500 to-slate-600",
        collectibles: "from-red-500 to-rose-600"
      };
      return colors[category] || "from-gray-400 to-gray-500";
    }
    {
      assetValueData.filter((asset) => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.tamilName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        return matchesSearch && matchesCategory;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:chart-pie", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Asset Value Tracking</h1> <p class="text-gray-600 dark:text-gray-300">Monitor and track your asset portfolio value</p></div></div> <button class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Add Valuation</span></button></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(
      // Add valuation logic would go here
      // Reset form
      views
    );
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let view = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentView === view.id ? "bg-green-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-green-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20")}`)}>`);
      Icon($$renderer2, { icon: view.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(view.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(portfolioSummary.totalValue))}</p></div> <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:currency-rupee",
        class: "w-6 h-6 text-green-600 dark:text-green-400"
      });
      $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Total Investment</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(portfolioSummary.purchaseValue))}</p></div> <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:shopping-cart",
        class: "w-6 h-6 text-blue-600 dark:text-blue-400"
      });
      $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Net Appreciation</p> <p class="text-2xl font-bold text-green-600">${escape_html(formatCurrency(portfolioSummary.appreciation))}</p> <p class="text-sm text-green-600">+${escape_html(portfolioSummary.appreciationPercent)}%</p></div> <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:arrow-trending-up",
        class: "w-6 h-6 text-green-600 dark:text-green-400"
      });
      $$renderer2.push(`<!----></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-600 dark:text-gray-400">Appreciating Assets</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(portfolioSummary.appreciatingAssets)}/${escape_html(portfolioSummary.appreciatingAssets + portfolioSummary.depreciatingAssets)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(Math.round(portfolioSummary.appreciatingAssets / (portfolioSummary.appreciatingAssets + portfolioSummary.depreciatingAssets) * 100))}% of portfolio</p></div> <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:chart-bar",
        class: "w-6 h-6 text-yellow-600 dark:text-yellow-400"
      });
      $$renderer2.push(`<!----></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(categoryStats);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let category = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex items-center justify-between mb-2"><div class="flex items-center space-x-2"><div${attr_class(`p-2 bg-gradient-to-r ${stringify(getCategoryColor(category.category))} rounded-lg text-white`)}>`);
        Icon($$renderer2, { icon: getCategoryIcon(category.category), class: "w-4 h-4" });
        $$renderer2.push(`<!----></div> <span class="font-medium text-gray-900 dark:text-white capitalize">${escape_html(category.category)}</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">${escape_html(category.count)} items</span></div> <div class="flex items-center justify-between"><span class="text-lg font-bold text-gray-900 dark:text-white">${escape_html(formatCurrency(category.totalValue))}</span> <span${attr_class(`text-sm font-medium ${stringify(category.change > 0 ? "text-green-600" : "text-red-600")}`)}>${escape_html(category.change > 0 ? "+" : "")}${escape_html(category.change.toFixed(1))}%</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  AssetsValuePage as default
};
