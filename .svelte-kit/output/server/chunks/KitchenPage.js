import { b as attr_class, a as ensure_array_like, j as attr_style, s as stringify, g as clsx, l as bind_props, c as store_get, u as unsubscribe_stores } from "./index2.js";
import { c as currentRoute } from "./router.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
import { k as fallback } from "./utils.js";
const PantryCategories = {
  staples: {
    name: "Staples",
    tamil: "முக்கிய உணவு பொருட்கள்",
    icon: "heroicons:archive-box",
    items: [
      { name: "Raw Rice", tamil: "பச்சை அரிசி", unit: "kg", quantity: 25, minStock: 5, expiry: null },
      { name: "Idli Rice", tamil: "இட்லி அரிசி", unit: "kg", quantity: 5, minStock: 1, expiry: null },
      { name: "Toor Dal", tamil: "துவரம் பருப்பு", unit: "kg", quantity: 2, minStock: 0.5, expiry: "2025-12-01" },
      { name: "Moong Dal", tamil: "பாசி பருப்பு", unit: "kg", quantity: 1, minStock: 0.3, expiry: "2025-11-15" },
      { name: "Urad Dal", tamil: "உளுந்து", unit: "kg", quantity: 1.5, minStock: 0.5, expiry: "2025-10-30" },
      { name: "Chana Dal", tamil: "கடலை பருப்பு", unit: "kg", quantity: 1, minStock: 0.3, expiry: "2025-11-20" },
      { name: "Rava/Semolina", tamil: "ரவை", unit: "kg", quantity: 2, minStock: 0.5, expiry: "2025-12-15" }
    ]
  },
  spices: {
    name: "Spices",
    tamil: "மசாலாப் பொருட்கள்",
    icon: "heroicons:sparkles",
    items: [
      { name: "Mustard Seeds", tamil: "கடுகு", unit: "g", quantity: 200, minStock: 50, expiry: "2026-01-01" },
      { name: "Cumin Seeds", tamil: "சீரகம்", unit: "g", quantity: 150, minStock: 30, expiry: "2025-12-31" },
      { name: "Fenugreek", tamil: "வெந்தயம்", unit: "g", quantity: 100, minStock: 20, expiry: "2025-11-30" },
      { name: "Turmeric Powder", tamil: "மஞ்சள் தூள்", unit: "g", quantity: 500, minStock: 100, expiry: "2025-08-15" },
      { name: "Red Chilli Powder", tamil: "மிளகாய் தூள்", unit: "g", quantity: 250, minStock: 50, expiry: "2025-09-01" },
      { name: "Asafoetida", tamil: "பெருங்காயம்", unit: "g", quantity: 50, minStock: 10, expiry: "2026-03-01" },
      { name: "Garam Masala", tamil: "கரம் மசாலா", unit: "g", quantity: 100, minStock: 20, expiry: "2025-12-01" }
    ]
  },
  oils: {
    name: "Oils & Fats",
    tamil: "எண்ணெய் மற்றும் நெய்",
    icon: "heroicons:beaker",
    items: [
      { name: "Gingelly Oil", tamil: "நல்லெண்ணெய்", unit: "L", quantity: 2, minStock: 0.5, expiry: "2025-12-01" },
      { name: "Groundnut Oil", tamil: "கடலை எண்ணெய்", unit: "L", quantity: 1, minStock: 0.3, expiry: "2025-11-15" },
      { name: "Coconut Oil", tamil: "தேங்காய் எண்ணெய்", unit: "L", quantity: 0.5, minStock: 0.2, expiry: "2025-10-30" },
      { name: "Ghee", tamil: "நெய்", unit: "L", quantity: 1, minStock: 0.2, expiry: "2025-11-01" }
    ]
  },
  condiments: {
    name: "Condiments",
    tamil: "சுவையூட்டிகள்",
    icon: "heroicons:cube",
    items: [
      { name: "Tamarind", tamil: "புளி", unit: "kg", quantity: 0.5, minStock: 0.1, expiry: "2025-12-31" },
      { name: "Jaggery", tamil: "வெல்லம்", unit: "kg", quantity: 1, minStock: 0.2, expiry: "2025-11-15" },
      { name: "Salt", tamil: "உப்பு", unit: "kg", quantity: 2, minStock: 0.5, expiry: null },
      { name: "Rasam Powder", tamil: "ரசம் பொடி", unit: "g", quantity: 200, minStock: 50, expiry: "2025-10-15" },
      { name: "Sambar Powder", tamil: "சாம்பார் பொடி", unit: "g", quantity: 300, minStock: 50, expiry: "2025-10-20" }
    ]
  },
  dryGoods: {
    name: "Dry Goods",
    tamil: "உலர் பொருட்கள்",
    icon: "heroicons:squares-2x2",
    items: [
      { name: "Aval/Poha", tamil: "அவல்", unit: "kg", quantity: 1, minStock: 0.2, expiry: "2025-12-01" },
      { name: "Vermicelli", tamil: "சேமியா", unit: "g", quantity: 500, minStock: 100, expiry: "2025-11-30" },
      { name: "Besan", tamil: "கடலை மாவு", unit: "kg", quantity: 1, minStock: 0.2, expiry: "2025-10-30" },
      { name: "Wheat Flour", tamil: "கோதுமை மாவு", unit: "kg", quantity: 2, minStock: 0.5, expiry: "2025-11-15" }
    ]
  },
  festivalItems: {
    name: "Festival Items",
    tamil: "பண்டிகை பொருட்கள்",
    icon: "heroicons:gift",
    items: [
      { name: "Rock Sugar", tamil: "கல்கண்டு", unit: "g", quantity: 200, minStock: 50, expiry: "2026-01-01" },
      { name: "Dry Coconut", tamil: "உலர் தேங்காய்", unit: "pieces", quantity: 5, minStock: 2, expiry: "2025-12-31" },
      { name: "Cardamom", tamil: "ஏலக்காய்", unit: "g", quantity: 50, minStock: 10, expiry: "2025-12-01" },
      { name: "Cloves", tamil: "கிராம்பு", unit: "g", quantity: 25, minStock: 5, expiry: "2025-11-30" },
      { name: "Camphor", tamil: "கற்பூரம்", unit: "g", quantity: 20, minStock: 5, expiry: null }
    ]
  }
};
const MealPlanner$1 = {
  weeklyGrid: {
    monday: {
      breakfast: { dish: "Idli + Chutney", tamil: "இட்லி + சட்னி", prep: "Soak urad dal Sunday night" },
      lunch: { dish: "Sambar + Rice", tamil: "சாம்பார் + சாதம்", prep: "Cut vegetables morning" },
      dinner: { dish: "Rasam + Poriyal", tamil: "ரசம் + பொரியல்", prep: "Light and warm" }
    },
    tuesday: {
      breakfast: { dish: "Dosa + Podi", tamil: "தோசை + பொடி", prep: "Grind batter Monday night" },
      lunch: { dish: "Vathal Kuzhambu + Rice", tamil: "வத்தல் குழம்பு + சாதம்", prep: "Soak vathal overnight" },
      dinner: { dish: "Chapati + Kurma", tamil: "சப்பாத்தி + குருமா", prep: "Make dough evening" }
    },
    wednesday: {
      breakfast: { dish: "Pongal + Chutney", tamil: "பொங்கல் + சட்னி", prep: "Roast moong dal" },
      lunch: { dish: "Kootu + Rice", tamil: "கூட்டு + சாதம்", prep: "Grind coconut fresh" },
      dinner: { dish: "Lemon Rasam + Thogayal", tamil: "எலுமிச்சை ரசம் + தொகையல்", prep: "Extract lemon juice" }
    },
    thursday: {
      breakfast: { dish: "Upma + Coconut Chutney", tamil: "உப்புமா + தேங்காய் சட்னி", prep: "Roast rava well" },
      lunch: { dish: "Mixed Vegetable Curry + Rice", tamil: "கலந்த காய் கறி + சாதம்", prep: "Cut all vegetables" },
      dinner: { dish: "Curd Rice + Pickle", tamil: "தயிர் சாதம் + ஊறுகாய்", prep: "Cool rice properly" }
    },
    friday: {
      breakfast: { dish: "Poha + Peanuts", tamil: "அவல் + கடலை", prep: "Wash poha gently" },
      lunch: { dish: "Dal + Sabzi + Chapati", tamil: "பருப்பு + வேக்கட் + சப்பாத்தி", prep: "Make rotis fresh" },
      dinner: { dish: "Vegetable Soup + Bread", tamil: "காய்கறி சூப் + பிரெட்", prep: "Light and healthy" }
    },
    saturday: {
      breakfast: { dish: "Rava Dosa + Sambar", tamil: "ரவா தோசை + சாம்பார்", prep: "Make batter fresh" },
      lunch: { dish: "Biriyani + Raita", tamil: "பிரியாணி + ரைத்தா", prep: "Soak rice 30 mins" },
      dinner: { dish: "Roti + Dal + Vegetable", tamil: "ரொட்டி + பருப்பு + காய்", prep: "Simple and nourishing" }
    },
    sunday: {
      breakfast: { dish: "Special Breakfast", tamil: "சிறப்பு காலை உணவு", prep: "Family choice or festival special" },
      lunch: { dish: "Traditional Feast", tamil: "பாரம்பரிய விருந்து", prep: "Elaborate South Indian meal" },
      dinner: { dish: "Light Dinner", tamil: "இலகுவான இரவு உணவு", prep: "Digest well for Monday" }
    }
  }
};
const KidsMenu$1 = {
  tiffinPlanner: {
    monday: {
      thambi: { dish: "Idli + Podi + Banana", prep: "Pack in steel box", mood: "energetic" },
      akka: { dish: "Chapati + Paneer Curry", prep: "Warm container", mood: "focused" }
    },
    tuesday: {
      thambi: { dish: "Lemon Rice + Cucumber", prep: "Add lemon fresh", mood: "happy" },
      akka: { dish: "Dosa + Chutney", prep: "Crispy and warm", mood: "motivated" }
    },
    wednesday: {
      thambi: { dish: "Pongal + Pickle", prep: "Not too spicy", mood: "calm" },
      akka: { dish: "Upma + Curd", prep: "Light and filling", mood: "studious" }
    },
    thursday: {
      thambi: { dish: "Poha + Roasted Gram", prep: "Add peanuts", mood: "playful" },
      akka: { dish: "Rice + Rasam + Thogayal", prep: "Comforting meal", mood: "tired" }
    },
    friday: {
      thambi: { dish: "Chapati Roll + Jam", prep: "Fun presentation", mood: "excited" },
      akka: { dish: "Tamarind Rice + Chips", prep: "Tangy and satisfying", mood: "weekend-ready" }
    }
  }
};
function PantryTracker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredItems;
    let selectedProfile = fallback($$props["selectedProfile"], "family");
    let selectedCategory = "staples";
    function getStockStatus(item) {
      if (item.quantity <= item.minStock * 0.5) return "critical";
      if (item.quantity <= item.minStock) return "low";
      return "good";
    }
    function getStockColor(status) {
      switch (status) {
        case "critical":
          return "text-red-600 bg-red-50 border-red-200";
        case "low":
          return "text-orange-600 bg-orange-50 border-orange-200";
        default:
          return "text-green-600 bg-green-50 border-green-200";
      }
    }
    function isExpiringSoon(expiry) {
      if (!expiry) return false;
      const today = /* @__PURE__ */ new Date();
      const expiryDate = new Date(expiry);
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1e3 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }
    function isExpired(expiry) {
      if (!expiry) return false;
      const today = /* @__PURE__ */ new Date();
      const expiryDate = new Date(expiry);
      return expiryDate < today;
    }
    function generateShoppingList() {
      const shoppingList2 = [];
      Object.values(PantryCategories).forEach((category) => {
        category.items.forEach((item) => {
          if (getStockStatus(item) === "low" || getStockStatus(item) === "critical") {
            shoppingList2.push({
              name: item.name,
              tamil: item.tamil,
              category: category.name,
              needed: Math.max(item.minStock * 2 - item.quantity, 0),
              unit: item.unit
            });
          }
        });
      });
      return shoppingList2;
    }
    let shoppingList = generateShoppingList();
    filteredItems = PantryCategories[selectedCategory].items.filter((item) => {
      return true;
    });
    $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-semibold text-gray-900">Pantry Tracker</h2> <p class="text-gray-600">அடுக்களை கண்காணிப்பு - Ingredient inventory &amp; stock management</p></div> <div class="flex space-x-2"><button class="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add Item</span></button> <button class="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Shopping List</span></button></div></div> <div class="flex space-x-4 mb-6"><button${attr_class(`px-4 py-2 rounded-lg transition-colors ${stringify(
      // Generate shopping list
      "bg-blue-500 text-white"
    )}`)}>All Items</button> <button${attr_class(`px-4 py-2 rounded-lg transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Low Stock</button> <button${attr_class(`px-4 py-2 rounded-lg transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Expiring Soon</button></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><h3 class="text-lg font-semibold text-gray-900 mb-4">Categories</h3> <div class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(PantryCategories));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, category] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center space-x-3 p-3 rounded-lg transition-all text-left ${stringify(selectedCategory === key ? "bg-orange-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100")}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-5 h-5" });
      $$renderer2.push(`<!----> <div><div class="font-medium">${escape_html(category.name)}</div> <div class="text-xs opacity-75">${escape_html(category.tamil)}</div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="lg:col-span-3"><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredItems);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      const status = getStockStatus(item);
      const isExpiringSoonItem = isExpiringSoon(item.expiry);
      const isExpiredItem = isExpired(item.expiry);
      $$renderer2.push(`<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"><div class="flex items-center justify-between mb-3"><div class="flex-1"><h4 class="font-semibold text-gray-900">${escape_html(item.name)}</h4> <p class="text-sm text-gray-600">${escape_html(item.tamil)}</p></div> <div class="text-right"><div class="text-lg font-bold text-gray-900">${escape_html(item.quantity)}</div> <div class="text-sm text-gray-500">${escape_html(item.unit)}</div></div></div> <div class="mb-3"><div class="flex items-center justify-between mb-1"><span class="text-sm text-gray-600">Stock Level</span> <span${attr_class(`text-xs px-2 py-1 rounded ${stringify(getStockColor(status))} border`)}>${escape_html(status.toUpperCase())}</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all ${stringify(status === "critical" ? "bg-red-500" : status === "low" ? "bg-orange-500" : "bg-green-500")}`)}${attr_style(`width: ${stringify(Math.min(item.quantity / (item.minStock * 2) * 100, 100))}%`)}></div></div> <div class="flex justify-between text-xs text-gray-500 mt-1"><span>Min: ${escape_html(item.minStock)}${escape_html(item.unit)}</span> <span>Current: ${escape_html(item.quantity)}${escape_html(item.unit)}</span></div></div> `);
      if (item.expiry) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-3"><div class="flex items-center space-x-1 text-sm">`);
        Icon($$renderer2, { icon: "heroicons:calendar", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span class="text-gray-600">Expires:</span> <span${attr_class(clsx(isExpiredItem ? "text-red-600 font-semibold" : isExpiringSoonItem ? "text-orange-600 font-medium" : "text-gray-700"))}>${escape_html(new Date(item.expiry).toLocaleDateString("en-IN"))}</span></div> `);
        if (isExpiredItem) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-xs text-red-600 mt-1">⚠️ Expired - Replace immediately</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (isExpiringSoonItem) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="text-xs text-orange-600 mt-1">⏰ Use soon - Expires in ${escape_html(Math.ceil((new Date(item.expiry) - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24)))} days</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex space-x-2"><button class="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> Add Stock</button> <button class="flex-1 px-3 py-2 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> Edit</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:archive-box",
        class: "w-16 h-16 mx-auto text-gray-400 mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 mb-2">No items found</h3> <p class="text-gray-600">`);
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`This category is empty. Add some items to get started.`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (shoppingList.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg"><h3 class="text-lg font-semibold text-green-900 mb-4 flex items-center">`);
      Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> Shopping List <span class="text-sm text-green-700 ml-2">खरीदारी सूची</span></h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"><!--[-->`);
      const each_array_2 = ensure_array_like(shoppingList);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let item = each_array_2[$$index_2];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg"><div><div class="font-medium text-green-900">${escape_html(item.name)}</div> <div class="text-sm text-green-700">${escape_html(item.tamil)}</div> <div class="text-xs text-green-600">${escape_html(item.category)}</div></div> <div class="text-right"><div class="font-bold text-green-900">${escape_html(item.needed.toFixed(1))}</div> <div class="text-sm text-green-700">${escape_html(item.unit)}</div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-4 flex justify-between items-center"><div class="text-sm text-green-700">Total items: ${escape_html(shoppingList.length)}</div> <div class="flex space-x-2"><button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">`);
      Icon($$renderer2, { icon: "heroicons:share", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> Share List</button> <button class="px-4 py-2 bg-white text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors text-sm">`);
      Icon($$renderer2, {
        icon: "heroicons:document-text",
        class: "w-4 h-4 inline mr-1"
      });
      $$renderer2.push(`<!----> Print</button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { selectedProfile });
  });
}
function FreshProduce($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedProfile = fallback($$props["selectedProfile"], "family");
    $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="text-center py-12">`);
    Icon($$renderer2, {
      icon: "heroicons:leaf",
      class: "w-16 h-16 mx-auto text-green-400 mb-4"
    });
    $$renderer2.push(`<!----> <h2 class="text-2xl font-semibold text-gray-900 mb-2">Fresh Produce Tracker</h2> <p class="text-gray-600 mb-1">புதிய காய்கறி கண்காணிப்பு</p> <p class="text-gray-500 mb-6">Weekly vegetables, fruits &amp; dairy management</p> <div class="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto"><p class="text-sm text-green-800"><strong>Coming Soon!</strong> Fresh produce tracking with seasonal recommendations, weekly market planning, and dairy management for South Indian households.</p></div></div></div>`);
    bind_props($$props, { selectedProfile });
  });
}
function MealPlanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let todayMeal;
    let selectedProfile = fallback($$props["selectedProfile"], "family");
    let selectedDay = "monday";
    const daysOfWeek = [
      { key: "monday", name: "Monday", tamil: "திங்கள்" },
      { key: "tuesday", name: "Tuesday", tamil: "செவ்வாய்" },
      { key: "wednesday", name: "Wednesday", tamil: "புதன்" },
      { key: "thursday", name: "Thursday", tamil: "வியாழன்" },
      { key: "friday", name: "Friday", tamil: "வெள்ளி" },
      { key: "saturday", name: "Saturday", tamil: "சனி" },
      { key: "sunday", name: "Sunday", tamil: "ஞாயிறு" }
    ];
    function getMealForDay(day) {
      return MealPlanner$1.weeklyGrid[day];
    }
    function getMealColor(mealType) {
      switch (mealType) {
        case "breakfast":
          return "border-l-yellow-400 bg-yellow-50";
        case "lunch":
          return "border-l-orange-400 bg-orange-50";
        case "dinner":
          return "border-l-blue-400 bg-blue-50";
        default:
          return "border-l-gray-400 bg-gray-50";
      }
    }
    todayMeal = getMealForDay(selectedDay);
    $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-semibold text-gray-900">Meal Planner</h2> <p class="text-gray-600">உணவு திட்டமிடல் - Weekly meals with South Indian traditions</p></div> <div class="flex space-x-2"><button${attr_class(`px-4 py-2 rounded-lg transition-colors ${stringify(
      "bg-orange-500 text-white"
    )}`)}>Weekly Grid</button> <button${attr_class(`px-4 py-2 rounded-lg transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Festival Menu</button> <button${attr_class(`px-4 py-2 rounded-lg transition-colors ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>Prep Schedule</button></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><h3 class="text-lg font-semibold text-gray-900 mb-4">Days of Week</h3> <div class="space-y-2"><!--[-->`);
      const each_array = ensure_array_like(daysOfWeek);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let day = each_array[$$index];
        $$renderer2.push(`<button${attr_class(`w-full flex items-center justify-between p-3 rounded-lg transition-all text-left ${stringify(selectedDay === day.key ? "bg-orange-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100")}`)}><div><div class="font-medium">${escape_html(day.name)}</div> <div class="text-xs opacity-75">${escape_html(day.tamil)}</div></div> `);
        Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
        $$renderer2.push(`<!----></button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="lg:col-span-3">`);
      if (todayMeal) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6"><h3 class="text-xl font-semibold text-gray-900 mb-4">${escape_html(daysOfWeek.find((d) => d.key === selectedDay)?.name)} Meals <span class="text-sm text-gray-600 ml-2">(${escape_html(daysOfWeek.find((d) => d.key === selectedDay)?.tamil)})</span></h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div${attr_class(`border-l-4 ${stringify(getMealColor("breakfast"))} p-4 rounded-r-lg`)}><div class="flex items-center space-x-2 mb-2">`);
        Icon($$renderer2, { icon: "heroicons:sun", class: "w-5 h-5 text-yellow-500" });
        $$renderer2.push(`<!----> <h4 class="font-semibold text-gray-900">Breakfast</h4></div> <div class="font-medium text-gray-900 mb-1">${escape_html(todayMeal.breakfast.dish)}</div> <div class="text-sm text-gray-600 mb-2">${escape_html(todayMeal.breakfast.tamil)}</div> <div class="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">💡 ${escape_html(todayMeal.breakfast.prep)}</div></div> <div${attr_class(`border-l-4 ${stringify(getMealColor("lunch"))} p-4 rounded-r-lg`)}><div class="flex items-center space-x-2 mb-2">`);
        Icon($$renderer2, { icon: "heroicons:fire", class: "w-5 h-5 text-orange-500" });
        $$renderer2.push(`<!----> <h4 class="font-semibold text-gray-900">Lunch</h4></div> <div class="font-medium text-gray-900 mb-1">${escape_html(todayMeal.lunch.dish)}</div> <div class="text-sm text-gray-600 mb-2">${escape_html(todayMeal.lunch.tamil)}</div> <div class="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">💡 ${escape_html(todayMeal.lunch.prep)}</div></div> <div${attr_class(`border-l-4 ${stringify(getMealColor("dinner"))} p-4 rounded-r-lg`)}><div class="flex items-center space-x-2 mb-2">`);
        Icon($$renderer2, { icon: "heroicons:moon", class: "w-5 h-5 text-blue-500" });
        $$renderer2.push(`<!----> <h4 class="font-semibold text-gray-900">Dinner</h4></div> <div class="font-medium text-gray-900 mb-1">${escape_html(todayMeal.dinner.dish)}</div> <div class="text-sm text-gray-600 mb-2">${escape_html(todayMeal.dinner.tamil)}</div> <div class="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">💡 ${escape_html(todayMeal.dinner.prep)}</div></div></div> <div class="flex space-x-3 mt-6"><button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Generate Shopping List</span></button> <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:clock", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Prep Timeline</span></button> <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Suggest Alternative</span></button></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="mt-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h3> <div class="overflow-x-auto"><table class="w-full border-collapse border border-gray-200 rounded-lg"><thead><tr class="bg-gray-50"><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Day</th><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Breakfast</th><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Lunch</th><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Dinner</th></tr></thead><tbody><!--[-->`);
      const each_array_1 = ensure_array_like(daysOfWeek);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let day = each_array_1[$$index_1];
        const dayMeal = getMealForDay(day.key);
        if (dayMeal) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<tr class="hover:bg-gray-50"><td class="border border-gray-200 px-4 py-3"><div class="font-medium">${escape_html(day.name)}</div> <div class="text-xs text-gray-500">${escape_html(day.tamil)}</div></td><td class="border border-gray-200 px-4 py-3"><div class="font-medium text-gray-900">${escape_html(dayMeal.breakfast.dish)}</div> <div class="text-xs text-gray-600">${escape_html(dayMeal.breakfast.tamil)}</div></td><td class="border border-gray-200 px-4 py-3"><div class="font-medium text-gray-900">${escape_html(dayMeal.lunch.dish)}</div> <div class="text-xs text-gray-600">${escape_html(dayMeal.lunch.tamil)}</div></td><td class="border border-gray-200 px-4 py-3"><div class="font-medium text-gray-900">${escape_html(dayMeal.dinner.dish)}</div> <div class="text-xs text-gray-600">${escape_html(dayMeal.dinner.tamil)}</div></td></tr>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { selectedProfile });
  });
}
function KidsMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTiffin, weeklyPlan;
    let selectedProfile = fallback($$props["selectedProfile"], "kids");
    let selectedDay = "monday";
    let selectedChild = "thambi";
    const daysOfWeek = [
      { key: "monday", name: "Monday", tamil: "திங்கள்" },
      { key: "tuesday", name: "Tuesday", tamil: "செவ்வாய்" },
      { key: "wednesday", name: "Wednesday", tamil: "புதன்" },
      { key: "thursday", name: "Thursday", tamil: "வியாழன்" },
      { key: "friday", name: "Friday", tamil: "வெள்ளி" }
    ];
    const children = [
      {
        key: "thambi",
        name: "Thambi",
        tamil: "தம்பி",
        grade: "6th",
        age: "11 years"
      },
      {
        key: "akka",
        name: "Akka",
        tamil: "அக்கா",
        grade: "11th + JEE",
        age: "16 years"
      }
    ];
    function getMoodColor(mood) {
      switch (mood) {
        case "energetic":
          return "bg-yellow-50 text-yellow-800 border-yellow-200";
        case "focused":
          return "bg-blue-50 text-blue-800 border-blue-200";
        case "happy":
          return "bg-green-50 text-green-800 border-green-200";
        case "calm":
          return "bg-purple-50 text-purple-800 border-purple-200";
        case "studious":
          return "bg-indigo-50 text-indigo-800 border-indigo-200";
        case "tired":
          return "bg-gray-50 text-gray-800 border-gray-200";
        case "playful":
          return "bg-pink-50 text-pink-800 border-pink-200";
        case "motivated":
          return "bg-orange-50 text-orange-800 border-orange-200";
        case "excited":
          return "bg-red-50 text-red-800 border-red-200";
        case "weekend-ready":
          return "bg-emerald-50 text-emerald-800 border-emerald-200";
        default:
          return "bg-gray-50 text-gray-800 border-gray-200";
      }
    }
    function generateWeeklyPlan() {
      const plan = [];
      daysOfWeek.forEach((day) => {
        const thambiMeal = KidsMenu$1.tiffinPlanner[day.key]?.thambi;
        const akkaMeal = KidsMenu$1.tiffinPlanner[day.key]?.akka;
        if (thambiMeal && akkaMeal) {
          plan.push({
            day: day.name,
            tamil: day.tamil,
            thambi: thambiMeal,
            akka: akkaMeal
          });
        }
      });
      return plan;
    }
    currentTiffin = KidsMenu$1.tiffinPlanner[selectedDay]?.[selectedChild];
    weeklyPlan = generateWeeklyPlan();
    $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-semibold text-gray-900">Kids Menu &amp; School Meals</h2> <p class="text-gray-600">குழந்தைகள் உணவு - School tiffin &amp; brain foods for growing minds</p></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(children);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let child = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(selectedChild === child.key ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:user", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <div class="text-left"><div class="font-medium">${escape_html(child.name)}</div> <div class="text-xs opacity-75">${escape_html(child.grade)}</div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex space-x-4 mb-6 border-b border-gray-200"><button${attr_class(`pb-3 px-1 border-b-2 transition-colors ${stringify(
      "border-green-500 text-green-600"
    )}`)}><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:gift", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Tiffin Planner</span></div></button> <button${attr_class(`pb-3 px-1 border-b-2 transition-colors ${stringify("border-transparent text-gray-500 hover:text-gray-700")}`)}><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:light-bulb", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Brain Foods</span></div></button> <button${attr_class(`pb-3 px-1 border-b-2 transition-colors ${stringify("border-transparent text-gray-500 hover:text-gray-700")}`)}><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Mood Foods</span></div></button> <button${attr_class(`pb-3 px-1 border-b-2 transition-colors ${stringify("border-transparent text-gray-500 hover:text-gray-700")}`)}><div class="flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Prep Assistant</span></div></button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-1"><h3 class="text-lg font-semibold text-gray-900 mb-4">Select Day</h3> <div class="space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(daysOfWeek);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let day = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class(`w-full flex items-center justify-between p-3 rounded-lg transition-all text-left ${stringify(selectedDay === day.key ? "bg-green-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100")}`)}><div><div class="font-medium">${escape_html(day.name)}</div> <div class="text-xs opacity-75">${escape_html(day.tamil)}</div></div> `);
        Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
        $$renderer2.push(`<!----></button>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"><h4 class="font-semibold text-blue-900 mb-2">This Week</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-blue-700">Variety Score:</span> <span class="font-medium text-blue-900">8/10</span></div> <div class="flex justify-between"><span class="text-blue-700">Prep Time:</span> <span class="font-medium text-blue-900">45 min avg</span></div> <div class="flex justify-between"><span class="text-blue-700">Nutrition:</span> <span class="font-medium text-blue-900">Balanced</span></div></div></div></div> <div class="lg:col-span-2">`);
      if (currentTiffin) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"><div class="flex items-center justify-between mb-4"><div><h3 class="text-xl font-semibold text-gray-900">${escape_html(children.find((c) => c.key === selectedChild)?.name)}'s Tiffin</h3> <p class="text-gray-600">${escape_html(daysOfWeek.find((d) => d.key === selectedDay)?.name)} - ${escape_html(daysOfWeek.find((d) => d.key === selectedDay)?.tamil)}</p></div> <div class="text-right"><div class="text-sm text-gray-500">Grade</div> <div class="font-semibold text-gray-900">${escape_html(children.find((c) => c.key === selectedChild)?.grade)}</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white rounded-lg p-4 border border-gray-200"><h4 class="font-semibold text-gray-900 mb-3 flex items-center">`);
        Icon($$renderer2, {
          icon: "heroicons:square-3-stack-3d",
          class: "w-5 h-5 mr-2 text-green-500"
        });
        $$renderer2.push(`<!----> Today's Menu</h4> <div class="text-lg font-medium text-gray-900 mb-2">${escape_html(currentTiffin.dish)}</div> <div class="text-sm text-gray-600 mb-3">${escape_html(currentTiffin.prep)}</div> <div class="flex items-center space-x-2"><span${attr_class(`text-xs px-2 py-1 rounded border ${stringify(getMoodColor(currentTiffin.mood))}`)}>Mood: ${escape_html(currentTiffin.mood)}</span></div></div> <div class="bg-white rounded-lg p-4 border border-gray-200"><h4 class="font-semibold text-gray-900 mb-3 flex items-center">`);
        Icon($$renderer2, {
          icon: "heroicons:clipboard-document-check",
          class: "w-5 h-5 mr-2 text-blue-500"
        });
        $$renderer2.push(`<!----> Packing Checklist</h4> <div class="space-y-2 text-sm"><label class="flex items-center space-x-2"><input type="checkbox" class="rounded border-gray-300"/> <span>Steel tiffin box</span></label> <label class="flex items-center space-x-2"><input type="checkbox" class="rounded border-gray-300"/> <span>Spoon &amp; napkin</span></label> <label class="flex items-center space-x-2"><input type="checkbox" class="rounded border-gray-300"/> <span>Water bottle</span></label> <label class="flex items-center space-x-2"><input type="checkbox" class="rounded border-gray-300"/> <span>Small pickle container</span></label></div> <div class="mt-3 text-xs text-blue-600">💡 ${escape_html(currentTiffin.prep)}</div></div></div> <div class="flex space-x-3 mt-4"><button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:check", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Mark as Packed</span></button> <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Customize Menu</span></button> <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">`);
        Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Suggest Alternative</span></button></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="mt-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Tiffin Plan</h3> <div class="overflow-x-auto"><table class="w-full border-collapse border border-gray-200 rounded-lg"><thead><tr class="bg-gray-50"><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Day</th><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Thambi (6th)</th><th class="border border-gray-200 px-4 py-3 text-left font-semibold">Akka (11th + JEE)</th></tr></thead><tbody><!--[-->`);
      const each_array_2 = ensure_array_like(weeklyPlan);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let day = each_array_2[$$index_2];
        $$renderer2.push(`<tr class="hover:bg-gray-50"><td class="border border-gray-200 px-4 py-3"><div class="font-medium">${escape_html(day.day)}</div> <div class="text-xs text-gray-500">${escape_html(day.tamil)}</div></td><td class="border border-gray-200 px-4 py-3"><div class="font-medium text-gray-900">${escape_html(day.thambi.dish)}</div> <div class="text-xs text-gray-600">${escape_html(day.thambi.prep)}</div> <span${attr_class(`text-xs px-2 py-1 rounded ${stringify(getMoodColor(day.thambi.mood))} border mt-1 inline-block`)}>${escape_html(day.thambi.mood)}</span></td><td class="border border-gray-200 px-4 py-3"><div class="font-medium text-gray-900">${escape_html(day.akka.dish)}</div> <div class="text-xs text-gray-600">${escape_html(day.akka.prep)}</div> <span${attr_class(`text-xs px-2 py-1 rounded ${stringify(getMoodColor(day.akka.mood))} border mt-1 inline-block`)}>${escape_html(day.akka.mood)}</span></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { selectedProfile });
  });
}
function RecipeArchive($$renderer, $$props) {
  let selectedProfile = fallback($$props["selectedProfile"], "family");
  $$renderer.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="text-center py-12">`);
  Icon($$renderer, {
    icon: "heroicons:book-open",
    class: "w-16 h-16 mx-auto text-blue-400 mb-4"
  });
  $$renderer.push(`<!----> <h2 class="text-2xl font-semibold text-gray-900 mb-2">Recipe Archive</h2> <p class="text-gray-600 mb-1">செய்முறை संग्रह</p> <p class="text-gray-500 mb-6">Family recipes, Paati's wisdom &amp; Tamil-English glossary</p> <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto"><p class="text-sm text-blue-800"><strong>Coming Soon!</strong> Digital recipe archive with voice notes, Paati's tips, emotional tags, and Tamil-English cooking glossary.</p></div></div></div>`);
  bind_props($$props, { selectedProfile });
}
function VendorManager($$renderer, $$props) {
  let selectedProfile = fallback($$props["selectedProfile"], "family");
  $$renderer.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="text-center py-12">`);
  Icon($$renderer, {
    icon: "heroicons:user-group",
    class: "w-16 h-16 mx-auto text-purple-400 mb-4"
  });
  $$renderer.push(`<!----> <h2 class="text-2xl font-semibold text-gray-900 mb-2">Vendor Manager</h2> <p class="text-gray-600 mb-1">விற்பனையாளர்கள் நிர्वाহन</p> <p class="text-gray-500 mb-6">Trusted suppliers, contacts &amp; loyalty tracking</p> <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto"><p class="text-sm text-purple-800"><strong>Coming Soon!</strong> Vendor contact management with loyalty tracking, seasonal suppliers, and bulk buying coordination.</p></div></div></div>`);
  bind_props($$props, { selectedProfile });
}
function KitchenPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentSection;
    let activeSection = "dashboard";
    let selectedProfile = "family";
    const KitchenSections = [
      {
        id: "dashboard",
        name: "Kitchen Dashboard",
        tamil: "சமையலறை கட்டுப்பாடு",
        icon: "heroicons:home",
        description: "Complete kitchen overview"
      },
      {
        id: "pantry",
        name: "Pantry Tracker",
        tamil: "அடுக்களை கண்காணிப்பு",
        icon: "heroicons:archive-box",
        description: "Ingredient inventory & stock management"
      },
      {
        id: "fresh",
        name: "Fresh Produce",
        tamil: "புதிய காய்கறி",
        icon: "heroicons:leaf",
        description: "Weekly vegetables, fruits & dairy"
      },
      {
        id: "meals",
        name: "Meal Planner",
        tamil: "உணவு திட்டமிடல்",
        icon: "heroicons:calendar-days",
        description: "Daily & weekly meal planning"
      },
      {
        id: "kids",
        name: "Kids Menu",
        tamil: "குழந்தைகள் உணவு",
        icon: "heroicons:academic-cap",
        description: "School tiffin & brain foods"
      },
      {
        id: "recipes",
        name: "Recipe Archive",
        tamil: "செய்முறை संग्रह",
        icon: "heroicons:book-open",
        description: "Family recipes & Paati's wisdom"
      },
      {
        id: "cleaning",
        name: "Kitchen Care",
        tamil: "சமையலறை பராமரிப்பு",
        icon: "heroicons:sparkles",
        description: "Cleaning schedules & supplies"
      },
      {
        id: "vendors",
        name: "Vendors",
        tamil: "விற்பனையாளர்கள்",
        icon: "heroicons:user-group",
        description: "Trusted suppliers & contacts"
      },
      {
        id: "wellness",
        name: "Wellness",
        tamil: "நலம்",
        icon: "heroicons:heart",
        description: "Diet profiles & emotional food"
      },
      {
        id: "festivals",
        name: "Festival Prep",
        tamil: "பண்டிகை தயாரிப்பு",
        icon: "heroicons:gift",
        description: "Ritual cooking & celebrations"
      }
    ];
    let kitchenStats = {
      totalPantryItems: 0,
      lowStockItems: 0,
      weeklyMeals: 7,
      activeFestivals: 0,
      vendorContacts: 0
    };
    {
      const path = store_get($$store_subs ??= {}, "$currentRoute", currentRoute);
      if (path.startsWith("/kitchen/")) {
        const section = path.split("/")[2];
        if (section && KitchenSections.find((s) => s.id === section)) {
          activeSection = section;
        }
      }
    }
    currentSection = KitchenSections.find((s) => s.id === activeSection);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-orange-100 p-3 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-8 h-8 text-orange-600" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">Kitchen Management Suite</h1> <p class="text-lg text-gray-600">சமையலறை நிர்வாகம்</p> <p class="text-sm text-gray-500">Complete nourishment system for South Indian vegetarian household</p></div></div> <div class="flex space-x-2"><button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(
      "bg-orange-500 text-white shadow-md"
    )}`)}>`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-medium">Family</span></button> <button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-medium">Paati</span></button> <button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify("bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="font-medium">Kids</span></button></div></div> <div class="grid grid-cols-2 md:grid-cols-5 gap-4"><div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-blue-600">${escape_html(kitchenStats.totalPantryItems)}</div> <div class="text-sm text-blue-800">Pantry Items</div> <div class="text-xs text-blue-600">पेंट्री सामान</div></div> <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-red-600">${escape_html(kitchenStats.lowStockItems)}</div> <div class="text-sm text-red-800">Low Stock</div> <div class="text-xs text-red-600">குறைவான स्टॉक</div></div> <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-green-600">${escape_html(kitchenStats.weeklyMeals)}</div> <div class="text-sm text-green-800">Weekly Meals</div> <div class="text-xs text-green-600">साप्ताहिक भोजन</div></div> <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-purple-600">${escape_html(kitchenStats.activeFestivals)}</div> <div class="text-sm text-purple-800">Active Festivals</div> <div class="text-xs text-purple-600">செயலில் பண्डिगै</div></div> <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-amber-600">${escape_html(kitchenStats.vendorContacts)}</div> <div class="text-sm text-amber-800">Vendor Contacts</div> <div class="text-xs text-amber-600">विक्रेता संपर्क</div></div></div></div> <div class="flex flex-col lg:flex-row gap-6"><div class="lg:w-1/4"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Kitchen Sections</h3> <nav class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like(KitchenSections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${stringify(activeSection === section.id ? "bg-orange-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100")}`)}>`);
      Icon($$renderer2, { icon: section.icon, class: "w-5 h-5 flex-shrink-0" });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><div class="font-medium truncate">${escape_html(section.name)}</div> <div class="text-xs opacity-75 truncate">${escape_html(section.tamil)}</div></div></button>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4> <div class="space-y-2"><button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add Grocery Item</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Plan Weekly Meals</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Generate Shopping List</span></button></div></div></div></div> <div class="lg:w-3/4">`);
    if (activeSection === "dashboard") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:calendar-days",
        class: "w-5 h-5 mr-2 text-orange-500"
      });
      $$renderer2.push(`<!----> Today's Meals <span class="text-sm text-gray-500 ml-2">இன்றைய உணவு</span></h3> <div class="space-y-4"><div class="border-l-4 border-yellow-400 pl-4"><div class="font-medium text-gray-900">Breakfast</div> <div class="text-sm text-gray-600">Idli + Chutney</div> <div class="text-xs text-gray-500">இட்லி + சட்னி</div></div> <div class="border-l-4 border-orange-400 pl-4"><div class="font-medium text-gray-900">Lunch</div> <div class="text-sm text-gray-600">Sambar + Rice</div> <div class="text-xs text-gray-500">சாம்பார் + சாதம்</div></div> <div class="border-l-4 border-blue-400 pl-4"><div class="font-medium text-gray-900">Dinner</div> <div class="text-sm text-gray-600">Rasam + Poriyal</div> <div class="text-xs text-gray-500">ரசம் + பொரியல்</div></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:exclamation-triangle",
        class: "w-5 h-5 mr-2 text-red-500"
      });
      $$renderer2.push(`<!----> Low Stock Alert <span class="text-sm text-gray-500 ml-2">குறைவான स्टॉक</span></h3> <div class="space-y-3"><div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"><div><div class="font-medium text-red-900">Urad Dal</div> <div class="text-sm text-red-700">0.3 kg remaining</div></div> <div class="text-xs text-red-600">உளுந்து</div></div> <div class="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"><div><div class="font-medium text-orange-900">Turmeric Powder</div> <div class="text-sm text-orange-700">80g remaining</div></div> <div class="text-xs text-orange-600">மஞ்சள் तूल</div></div> <div class="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"><div><div class="font-medium text-yellow-900">Coconut Oil</div> <div class="text-sm text-yellow-700">0.15L remaining</div></div> <div class="text-xs text-yellow-600">தেங়কায় എണ্ணেय়</div></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:academic-cap",
        class: "w-5 h-5 mr-2 text-green-500"
      });
      $$renderer2.push(`<!----> Tomorrow's Tiffin <span class="text-sm text-gray-500 ml-2">நாளै டिफिन</span></h3> <div class="space-y-3"><div class="border border-green-200 rounded-lg p-3"><div class="font-medium text-green-900">Thambi (6th)</div> <div class="text-sm text-green-700">Lemon Rice + Cucumber</div> <div class="text-xs text-green-600">🧂 Add lemon fresh morning</div></div> <div class="border border-blue-200 rounded-lg p-3"><div class="font-medium text-blue-900">Akka (11th + JEE)</div> <div class="text-sm text-blue-700">Dosa + Chutney</div> <div class="text-xs text-blue-600">🔥 Make batter tonight</div></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:gift",
        class: "w-5 h-5 mr-2 text-purple-500"
      });
      $$renderer2.push(`<!----> Festival Prep <span class="text-sm text-gray-500 ml-2">पण्डিகै தैयारी</span></h3> <div class="text-center py-6">`);
      Icon($$renderer2, {
        icon: "heroicons:calendar",
        class: "w-12 h-12 mx-auto text-purple-400 mb-3"
      });
      $$renderer2.push(`<!----> <div class="text-lg font-medium text-gray-900">Diwali Preparation</div> <div class="text-sm text-gray-600 mb-3">21 days remaining</div> <div class="bg-purple-50 border border-purple-200 rounded-lg p-3"><div class="text-sm text-purple-800"><strong>Next:</strong> Start planning sweet varieties</div> <div class="text-xs text-purple-600 mt-1">Laddu, Mysore Pak, Badusha</div></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (activeSection === "pantry") {
        $$renderer2.push("<!--[-->");
        PantryTracker($$renderer2, { selectedProfile });
      } else {
        $$renderer2.push("<!--[!-->");
        if (activeSection === "fresh") {
          $$renderer2.push("<!--[-->");
          FreshProduce($$renderer2, { selectedProfile });
        } else {
          $$renderer2.push("<!--[!-->");
          if (activeSection === "meals") {
            $$renderer2.push("<!--[-->");
            MealPlanner($$renderer2, { selectedProfile });
          } else {
            $$renderer2.push("<!--[!-->");
            if (activeSection === "kids") {
              $$renderer2.push("<!--[-->");
              KidsMenu($$renderer2, { selectedProfile });
            } else {
              $$renderer2.push("<!--[!-->");
              if (activeSection === "recipes") {
                $$renderer2.push("<!--[-->");
                RecipeArchive($$renderer2, { selectedProfile });
              } else {
                $$renderer2.push("<!--[!-->");
                if (activeSection === "vendors") {
                  $$renderer2.push("<!--[-->");
                  VendorManager($$renderer2, { selectedProfile });
                } else {
                  $$renderer2.push("<!--[!-->");
                  $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-8"><div class="text-center py-12"><div class="text-6xl mb-4">`);
                  Icon($$renderer2, {
                    icon: currentSection?.icon || "heroicons:cog",
                    class: "w-16 h-16 mx-auto text-gray-400"
                  });
                  $$renderer2.push(`<!----></div> <h2 class="text-2xl font-semibold text-gray-900 mb-2">${escape_html(currentSection?.name)}</h2> <p class="text-gray-600 mb-1">${escape_html(currentSection?.tamil)}</p> <p class="text-gray-500 mb-6">${escape_html(currentSection?.description)}</p> <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto"><p class="text-sm text-orange-800"><strong>Coming Soon!</strong> This kitchen section is being developed with Tamil-English interface and South Indian vegetarian focus.</p></div></div></div>`);
                }
                $$renderer2.push(`<!--]-->`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  KitchenPage as default
};
