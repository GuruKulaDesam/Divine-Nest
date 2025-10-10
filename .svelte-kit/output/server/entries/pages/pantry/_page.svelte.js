import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/database.js";
import { T as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "staples";
    let searchTerm = "";
    const tabs = [
      {
        id: "staples",
        label: "Staples & Grains",
        icon: "heroicons:archive-box"
      },
      {
        id: "spices",
        label: "Spices & Masalas",
        icon: "heroicons:fire"
      },
      {
        id: "vegetables",
        label: "Vegetables",
        icon: "heroicons:leaf"
      },
      { id: "dairy", label: "Dairy & Pantry", icon: "heroicons:cake" },
      {
        id: "analytics",
        label: "Inventory Analytics",
        icon: "heroicons:chart-bar"
      }
    ];
    let sampleInventory = {
      staples: [
        {
          name: "Idli Rice (Idli Arisi)",
          brand: "Laxmi",
          quantity: "10",
          unit: "kg",
          minLevel: "2",
          currentLevel: "high",
          location: "Top shelf - Kitchen",
          cost: "₹180/kg",
          expiryDate: "2024-12-31",
          lastUpdated: "2024-01-15",
          usage: "High - Daily breakfast",
          culturalNote: "Premium short grain rice for soft idlis"
        },
        {
          name: "Ponni Boiled Rice",
          brand: "Arokya",
          quantity: "25",
          unit: "kg",
          minLevel: "5",
          currentLevel: "high",
          location: "Rice container - Pantry",
          cost: "₹65/kg",
          expiryDate: "2024-10-30",
          lastUpdated: "2024-01-10",
          usage: "High - Daily meals",
          culturalNote: "Tamil Nadu's most loved rice variety"
        },
        {
          name: "Toor Dal (Arhar)",
          brand: "Tata Sampann",
          quantity: "5",
          unit: "kg",
          minLevel: "1",
          currentLevel: "medium",
          location: "Dal container - Pantry",
          cost: "₹140/kg",
          expiryDate: "2024-08-15",
          lastUpdated: "2024-01-12",
          usage: "High - Sambar daily",
          culturalNote: "Essential for Tamil meals - sambar, rasam"
        },
        {
          name: "Urad Dal (Split Black Gram)",
          brand: "Organic",
          quantity: "2",
          unit: "kg",
          minLevel: "0.5",
          currentLevel: "medium",
          location: "Dal shelf - Pantry",
          cost: "₹160/kg",
          expiryDate: "2024-09-20",
          lastUpdated: "2024-01-08",
          usage: "Medium - Idli, vada, payasam",
          culturalNote: "For idli batter and temple vadai"
        },
        {
          name: "Chana Dal (Bengal Gram)",
          brand: "Fortune",
          quantity: "1",
          unit: "kg",
          minLevel: "0.3",
          currentLevel: "low",
          location: "Dal shelf - Pantry",
          cost: "₹120/kg",
          expiryDate: "2024-07-10",
          lastUpdated: "2024-01-05",
          usage: "Low - Weekly kootu",
          culturalNote: "For kootu and sundal"
        },
        {
          name: "Moong Dal (Green Gram)",
          brand: "Organic",
          quantity: "1.5",
          unit: "kg",
          minLevel: "0.5",
          currentLevel: "medium",
          location: "Dal shelf - Pantry",
          cost: "₹150/kg",
          expiryDate: "2024-06-30",
          lastUpdated: "2024-01-07",
          usage: "Medium - Kootu, payasam",
          culturalNote: "Easy to digest - for children and elderly"
        }
      ],
      spices: [
        {
          name: "Sambar Powder",
          brand: "Aachi",
          quantity: "500",
          unit: "grams",
          minLevel: "100",
          currentLevel: "high",
          location: "Spice rack - Level 1",
          cost: "₹120/500g",
          expiryDate: "2024-08-15",
          lastUpdated: "2024-01-12",
          usage: "High - Daily sambar",
          culturalNote: "Essential Tamil spice blend"
        },
        {
          name: "Rasam Powder",
          brand: "MTR",
          quantity: "200",
          unit: "grams",
          minLevel: "50",
          currentLevel: "medium",
          location: "Spice rack - Level 1",
          cost: "₹80/200g",
          expiryDate: "2024-07-20",
          lastUpdated: "2024-01-10",
          usage: "High - Daily rasam",
          culturalNote: "For traditional Tamil rasam"
        },
        {
          name: "Red Chilli Powder",
          brand: "Everest",
          quantity: "500",
          unit: "grams",
          minLevel: "100",
          currentLevel: "high",
          location: "Spice rack - Level 2",
          cost: "₹180/500g",
          expiryDate: "2024-09-30",
          lastUpdated: "2024-01-08",
          usage: "High - Daily cooking",
          culturalNote: "Guntur variety - medium spicy"
        },
        {
          name: "Turmeric Powder",
          brand: "Tata Sampann",
          quantity: "200",
          unit: "grams",
          minLevel: "50",
          currentLevel: "medium",
          location: "Spice rack - Level 2",
          cost: "₹45/200g",
          expiryDate: "2024-06-15",
          lastUpdated: "2024-01-06",
          usage: "High - Daily cooking",
          culturalNote: "Auspicious and medicinal"
        },
        {
          name: "Coriander Powder",
          brand: "MDH",
          quantity: "100",
          unit: "grams",
          minLevel: "30",
          currentLevel: "low",
          location: "Spice rack - Level 2",
          cost: "₹60/100g",
          expiryDate: "2024-05-10",
          lastUpdated: "2024-01-04",
          usage: "Medium - Curries",
          culturalNote: "Fresh ground for best flavor"
        },
        {
          name: "Garam Masala",
          brand: "Homemade",
          quantity: "150",
          unit: "grams",
          minLevel: "50",
          currentLevel: "medium",
          location: "Spice rack - Level 3",
          cost: "₹200/150g",
          expiryDate: "2024-04-30",
          lastUpdated: "2024-01-01",
          usage: "Low - Special dishes",
          culturalNote: "Paati's recipe - cardamom, cinnamon, cloves"
        }
      ],
      vegetables: [
        {
          name: "Onions",
          brand: "Local",
          quantity: "5",
          unit: "kg",
          minLevel: "1",
          currentLevel: "high",
          location: "Vegetable basket",
          cost: "₹40/kg",
          expiryDate: "2024-02-15",
          lastUpdated: "2024-01-12",
          usage: "High - Daily cooking",
          culturalNote: "Bangalore variety - sweet and mild"
        },
        {
          name: "Tomatoes",
          brand: "Local",
          quantity: "2",
          unit: "kg",
          minLevel: "0.5",
          currentLevel: "medium",
          location: "Refrigerator - Vegetable drawer",
          cost: "₹80/kg",
          expiryDate: "2024-02-10",
          lastUpdated: "2024-01-10",
          usage: "High - Rasam, sambar",
          culturalNote: "For daily rasam and cooking"
        },
        {
          name: "Green Chillies",
          brand: "Local",
          quantity: "250",
          unit: "grams",
          minLevel: "100",
          currentLevel: "high",
          location: "Refrigerator - Vegetable drawer",
          cost: "₹120/kg",
          expiryDate: "2024-02-08",
          lastUpdated: "2024-01-08",
          usage: "High - Daily tempering",
          culturalNote: "Medium spicy - good for children"
        },
        {
          name: "Curry Leaves (Karivepaku)",
          brand: "Organic",
          quantity: "2",
          unit: "bunches",
          minLevel: "1",
          currentLevel: "medium",
          location: "Refrigerator - Herb section",
          cost: "₹10/bunch",
          expiryDate: "2024-02-05",
          lastUpdated: "2024-01-05",
          usage: "High - Daily tempering",
          culturalNote: "Essential for South Indian cooking"
        },
        {
          name: "Ginger",
          brand: "Local",
          quantity: "500",
          unit: "grams",
          minLevel: "200",
          currentLevel: "medium",
          location: "Refrigerator - Vegetable drawer",
          cost: "₹200/kg",
          expiryDate: "2024-02-20",
          lastUpdated: "2024-01-07",
          usage: "Medium - Chutneys, tea",
          culturalNote: "Medicinal and flavorful"
        }
      ],
      dairy: [
        {
          name: "Milk",
          brand: "Nandini",
          quantity: "2",
          unit: "liters",
          minLevel: "1",
          currentLevel: "medium",
          location: "Refrigerator - Main shelf",
          cost: "₹56/liter",
          expiryDate: "2024-02-02",
          lastUpdated: "2024-01-15",
          usage: "High - Daily tea, coffee",
          culturalNote: "Full fat for children's growth"
        },
        {
          name: "Curd (Yogurt)",
          brand: "Homemade",
          quantity: "1",
          unit: "liter",
          minLevel: "0.5",
          currentLevel: "medium",
          location: "Refrigerator - Main shelf",
          cost: "₹60/liter",
          expiryDate: "2024-02-05",
          lastUpdated: "2024-01-14",
          usage: "High - Daily meals",
          culturalNote: "Set fresh daily using previous day's curd"
        },
        {
          name: "Coconut Oil",
          brand: "Parachute",
          quantity: "1",
          unit: "liter",
          minLevel: "0.2",
          currentLevel: "high",
          location: "Kitchen shelf",
          cost: "₹380/liter",
          expiryDate: "2024-12-31",
          lastUpdated: "2024-01-10",
          usage: "High - Daily cooking",
          culturalNote: "Cold pressed - for health and flavor"
        },
        {
          name: "Sesame Oil (Nalla Enna)",
          brand: "Idhayam",
          quantity: "500",
          unit: "ml",
          minLevel: "100",
          currentLevel: "medium",
          location: "Kitchen shelf",
          cost: "₹220/500ml",
          expiryDate: "2024-10-15",
          lastUpdated: "2024-01-08",
          usage: "Medium - Special dishes",
          culturalNote: "Traditional oil for temple food"
        },
        {
          name: "Jaggery (Vellam)",
          brand: "Organic",
          quantity: "1",
          unit: "kg",
          minLevel: "0.2",
          currentLevel: "high",
          location: "Pantry - Airtight container",
          cost: "₹120/kg",
          expiryDate: "2024-08-30",
          lastUpdated: "2024-01-05",
          usage: "Low - Sweets, payasam",
          culturalNote: "Pure palm jaggery - better than sugar"
        }
      ]
    };
    function getInventoryByCategory() {
      return sampleInventory[currentTab] || [];
    }
    function getFilteredItems() {
      const items = getInventoryByCategory();
      return items;
    }
    function getLevelColor(level) {
      switch (level?.toLowerCase()) {
        case "high":
          return "text-green-600 bg-green-100 dark:bg-green-900/20";
        case "medium":
          return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
        case "low":
          return "text-red-600 bg-red-100 dark:bg-red-900/20";
        default:
          return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
      }
    }
    function getUsageColor(usage) {
      const colors = {
        High: "text-red-600 bg-red-100",
        Medium: "text-yellow-600 bg-yellow-100",
        Low: "text-green-600 bg-green-100"
      };
      return colors[usage] || "text-gray-600 bg-gray-100";
    }
    function isExpiringSoon(expiryDate) {
      const today = /* @__PURE__ */ new Date();
      const expiry = new Date(expiryDate);
      const daysUntilExpiry = Math.ceil((expiry - today) / (1e3 * 60 * 60 * 24));
      return daysUntilExpiry <= 7;
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:archive-box", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Pantry Inventory</h1> <p class="text-gray-600 dark:text-gray-300">भण्डार प्रबन्धन | Smart inventory management for Tamil household</p></div></div> <button class="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span>Add Item</span></button></div> <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, {
      icon: "heroicons:archive-box",
      class: "w-12 h-12 text-white/80"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">गृह व्यवस्था | Household Management</h3> <p class="text-white/90">"अन्नं न नष्टं भवेत् | Let no grain be wasted. A well-organized pantry reflects a well-managed home. Traditional wisdom teaches us to store wisely, use mindfully, and waste nothing."</p> <p class="text-sm text-white/70 mt-2">Tamil: "வீட்டு நிர்வாகம் ஒரு கலை - சேமித்து வைத்து சிக்கனமாக செலவு செய்"</p></div></div></div> <div class="mb-6"><div class="relative">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
    });
    $$renderer2.push(`<!----> <input type="text"${attr("value", searchTerm)} placeholder="Search pantry items, brands, or cultural notes..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"/></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-green-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="mb-6"><p class="text-gray-600 dark:text-gray-400">Showing ${escape_html(getFilteredItems().length)} items in ${escape_html(tabs.find((tab) => tab.id === currentTab)?.label)} `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_3 = ensure_array_like(getFilteredItems());
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let item = each_array_3[$$index_3];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-green-200 dark:border-green-700"><div class="flex items-start justify-between mb-4"><div><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">${escape_html(item.name)}</h3> <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${escape_html(item.brand)}</p> <div class="flex items-center space-x-2"><span${attr_class(`px-2 py-1 text-xs font-medium rounded-full ${stringify(getLevelColor(item.currentLevel))}`)}>${escape_html(item.currentLevel)} stock</span> <span${attr_class(`px-2 py-1 text-xs font-medium rounded-full ${stringify(getUsageColor(item.usage.split(" - ")[0]))}`)}>${escape_html(item.usage.split(" - ")[0])} use</span></div></div> `);
        if (isExpiringSoon(item.expiryDate)) {
          $$renderer2.push("<!--[-->");
          Icon($$renderer2, {
            icon: "heroicons:exclamation-triangle",
            class: "w-6 h-6 text-yellow-500"
          });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="space-y-2 mb-4"><div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400 text-sm">Current Stock:</span> <span class="font-bold text-gray-900 dark:text-white">${escape_html(item.quantity)} ${escape_html(item.unit)}</span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400 text-sm">Min Level:</span> <span class="font-medium">${escape_html(item.minLevel)} ${escape_html(item.unit)}</span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400 text-sm">Cost:</span> <span class="font-medium text-green-600">${escape_html(item.cost)}</span></div></div> <div class="space-y-2 mb-4"><div class="flex items-center text-sm">`);
        Icon($$renderer2, {
          icon: "heroicons:map-pin",
          class: "w-4 h-4 mr-2 text-blue-500"
        });
        $$renderer2.push(`<!----> <span class="text-gray-600 dark:text-gray-400">${escape_html(item.location)}</span></div> <div class="flex items-center text-sm">`);
        Icon($$renderer2, {
          icon: "heroicons:calendar",
          class: "w-4 h-4 mr-2 text-orange-500"
        });
        $$renderer2.push(`<!----> <span class="text-gray-600 dark:text-gray-400">Expires: ${escape_html(new Date(item.expiryDate).toLocaleDateString())}</span></div></div> <div class="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg mb-4"><h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-1 flex items-center">`);
        Icon($$renderer2, { icon: "heroicons:star", class: "w-4 h-4 mr-2" });
        $$renderer2.push(`<!----> Cultural Note</h4> <p class="text-sm text-orange-800 dark:text-orange-200">${escape_html(item.culturalNote)}</p></div> <div class="mb-4"><h4 class="font-semibold text-gray-900 dark:text-white mb-1">Usage Pattern:</h4> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(item.usage)}</p></div> <div class="flex space-x-2"><button class="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">Update Stock</button> `);
        if (item.currentLevel === "low") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm">Shop</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (getFilteredItems().length === 0 && currentTab !== "analytics") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:archive-box",
        class: "w-16 h-16 mx-auto text-gray-400 mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Items Found</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`No items available in this category`);
      }
      $$renderer2.push(`<!--]--></p> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-12 p-6 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl"><h4 class="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:light-bulb", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> गृह व्यवस्था सूत्र | Household Management Tips</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h5 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Storage Wisdom:</h5> <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1"><li>• Store rice in airtight containers with neem leaves</li> <li>• Keep spices in cool, dry places away from sunlight</li> <li>• Use FIFO (First In, First Out) principle</li> <li>• Label everything with dates</li></ul></div> <div><h5 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Smart Shopping:</h5> <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1"><li>• Buy staples in bulk during festivals</li> <li>• Check for seasonal price variations</li> <li>• Maintain 15-day emergency stock</li> <li>• Support local vendors for fresh produce</li></ul></div></div> <blockquote class="mt-4 p-3 bg-blue-200 dark:bg-blue-800 rounded-lg italic text-blue-800 dark:text-blue-200">"गृहे रम्ये रमन्ते देवा: | Gods reside in a well-organized home. A well-stocked and organized pantry ensures family health and happiness."</blockquote></div></div></div>`);
  });
}
export {
  _page as default
};
