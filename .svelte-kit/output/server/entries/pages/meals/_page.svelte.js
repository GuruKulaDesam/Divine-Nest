import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/database.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "planner";
    const tabs = [
      {
        id: "planner",
        label: "Weekly Planner",
        icon: "heroicons:calendar-days"
      },
      {
        id: "nutrition",
        label: "Nutrition Guide",
        icon: "heroicons:heart"
      },
      {
        id: "shopping",
        label: "Shopping Lists",
        icon: "heroicons:shopping-cart"
      },
      { id: "prep", label: "Meal Prep", icon: "heroicons:clock" },
      {
        id: "cultural",
        label: "Cultural Calendar",
        icon: "heroicons:sparkles"
      }
    ];
    let weeklyMealPlan = [
      {
        day: "Monday",
        emoji: "🍽️",
        breakfast: {
          main: "Idli + Tomato chutney",
          drink: "Warm milk for kids",
          prep_time: "30 mins",
          health_note: "Light and digestible start"
        },
        lunch: {
          main: "Sambar (with drumstick & carrot) + Beans poriyal + Rice + Curd",
          prep_time: "45 mins",
          health_note: "Protein-rich, balanced nutrition"
        },
        dinner: {
          main: "Chapati + Mixed vegetable kurma + Fruit slices",
          prep_time: "35 mins",
          health_note: "Light dinner, good for digestion"
        },
        cultural_note: "Start the week with traditional comfort food"
      },
      {
        day: "Tuesday",
        emoji: "🍽️",
        breakfast: {
          main: "Rava upma + Coconut chutney + Banana",
          drink: "Filter coffee for adults",
          prep_time: "25 mins",
          health_note: "Energy-boosting semolina"
        },
        lunch: {
          main: "Rasam + Potato roast + Rice + Buttermilk",
          prep_time: "40 mins",
          health_note: "Digestive rasam, cooling buttermilk"
        },
        dinner: {
          main: "Lemon rice + Cucumber raita + Papad",
          prep_time: "20 mins",
          health_note: "Simple, refreshing dinner"
        },
        cultural_note: "Rasam is medicine for the soul"
      },
      {
        day: "Wednesday",
        emoji: "🍽️",
        breakfast: {
          main: "Dosa + Molagapodi + Milk with Boost/Horlicks",
          drink: "Herbal tea optional",
          prep_time: "35 mins",
          health_note: "Crispy, protein-rich start"
        },
        lunch: {
          main: "Keerai kootu (greens) + Pumpkin curry + Rice + Curd",
          prep_time: "50 mins",
          health_note: "Iron-rich greens, vitamin A from pumpkin"
        },
        dinner: {
          main: "Vegetable semiya + Tomato thokku + Boiled peanuts",
          prep_time: "30 mins",
          health_note: "Light noodles, protein from peanuts"
        },
        cultural_note: "Keerai kootu - grandmother's health wisdom"
      },
      {
        day: "Thursday",
        emoji: "🍽️",
        breakfast: {
          main: "Pongal + Sambar + Apple slices",
          drink: "Warm milk",
          prep_time: "40 mins",
          health_note: "Ghee-rich pongal for energy"
        },
        lunch: {
          main: "Vathal kuzhambu + Cabbage poriyal + Rice + Curd",
          prep_time: "45 mins",
          health_note: "Traditional preservation, fiber from cabbage"
        },
        dinner: {
          main: "Chapati + Channa masala + Carrot sticks",
          prep_time: "40 mins",
          health_note: "Protein from channa, beta-carotene"
        },
        cultural_note: "Vathal kuzhambu - preserving tradition"
      },
      {
        day: "Friday",
        emoji: "🍽️",
        breakfast: {
          main: "Poori + Potato masala + Warm milk",
          drink: "Fresh juice optional",
          prep_time: "45 mins",
          health_note: "Weekend treats, comfort food"
        },
        lunch: {
          main: "Vegetable biryani + Onion raita + Curd rice",
          prep_time: "60 mins",
          health_note: "Celebration meal, aromatic spices"
        },
        dinner: {
          main: "Ragi dosa + Tomato chutney + Boiled corn",
          prep_time: "30 mins",
          health_note: "Healthy millet, fiber-rich"
        },
        cultural_note: "Friday feast preparations"
      },
      {
        day: "Saturday",
        emoji: "🍽️",
        breakfast: {
          main: "Adai + Avial + Herbal tea (optional for adults)",
          drink: "Fresh buttermilk",
          prep_time: "50 mins",
          health_note: "Protein-rich mixed dal pancake"
        },
        lunch: {
          main: "Thakkali kuzhambu + Ladies finger fry + Rice + Buttermilk",
          prep_time: "45 mins",
          health_note: "Tangy tomato gravy, okra nutrients"
        },
        dinner: {
          main: "Vegetable sandwich + Fruit salad + Milk",
          prep_time: "25 mins",
          health_note: "Light, fresh, vitamin-rich"
        },
        cultural_note: "Saturday relaxed cooking"
      },
      {
        day: "Sunday",
        emoji: "🍽️",
        breakfast: {
          main: "Masala dosa + Coconut chutney + Filter coffee (for adults)",
          drink: "Fresh fruit juice",
          prep_time: "45 mins",
          health_note: "Weekend special, crispy delight"
        },
        lunch: {
          main: "Special lunch: Sambar + Rasam + Kootu + Poriyal + Vadai + Payasam",
          prep_time: "90 mins",
          health_note: "Complete traditional feast"
        },
        dinner: {
          main: "Light tiffin: Idiyappam + Vegetable stew + Banana",
          prep_time: "35 mins",
          health_note: "Digestible string hoppers"
        },
        cultural_note: "Sunday feast - family bonding over food"
      }
    ];
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Meal Planning</h1> <p class="text-gray-600 dark:text-gray-300">अन्नम् ब्रह्म | Food is divine - plan with love and wisdom</p></div></div></div> <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">भोजन संस्कार | Food Culture</h3> <p class="text-white/90">"अन्नदाता सुखीभव | May the food provider be happy. Thoughtful meal planning nourishes the family's body, mind, and soul while preserving our rich culinary heritage."</p> <p class="text-sm text-white/70 mt-2">Tamil: "உணவு பிரம்மம் - அன்புடன் திட்டமிட்டு சமைத்து பரிமாறுவோம்"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-orange-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🗓️ Weekly South Indian Meal Planner</h3> <p class="text-gray-600 dark:text-gray-400 mb-6"><strong>Family Profile:</strong> 2 adults + 2 children (school-going) | <strong>Focus:</strong> Balanced, easy-to-cook, child-friendly, culturally rooted</p> <div class="space-y-6"><!--[-->`);
      const each_array_1 = ensure_array_like(weeklyMealPlan);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let day = each_array_1[$$index_1];
        $$renderer2.push(`<div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700"><div class="flex items-center justify-between mb-4"><h4 class="text-xl font-bold text-orange-900 dark:text-orange-100 flex items-center"><span class="text-2xl mr-3">${escape_html(day.emoji)}</span> ${escape_html(day.day)}</h4> <span class="text-sm text-orange-600 dark:text-orange-400 italic">"${escape_html(day.cultural_note)}"</span></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4"><h5 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center">`);
        Icon($$renderer2, { icon: "heroicons:sun", class: "w-4 h-4 mr-2" });
        $$renderer2.push(`<!----> Breakfast</h5> <p class="text-yellow-800 dark:text-yellow-200 text-sm mb-2">${escape_html(day.breakfast.main)}</p> `);
        if (day.breakfast.drink) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-yellow-700 dark:text-yellow-300 text-xs mb-2">🥛 ${escape_html(day.breakfast.drink)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex justify-between items-center"><span class="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">⏱️ ${escape_html(day.breakfast.prep_time)}</span></div> <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-2 italic">${escape_html(day.breakfast.health_note)}</p></div> <div class="bg-green-100 dark:bg-green-900/30 rounded-lg p-4"><h5 class="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">`);
        Icon($$renderer2, { icon: "heroicons:sun", class: "w-4 h-4 mr-2" });
        $$renderer2.push(`<!----> Lunch</h5> <p class="text-green-800 dark:text-green-200 text-sm mb-2">${escape_html(day.lunch.main)}</p> <div class="flex justify-between items-center"><span class="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">⏱️ ${escape_html(day.lunch.prep_time)}</span></div> <p class="text-xs text-green-600 dark:text-green-400 mt-2 italic">${escape_html(day.lunch.health_note)}</p></div> <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4"><h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">`);
        Icon($$renderer2, { icon: "heroicons:moon", class: "w-4 h-4 mr-2" });
        $$renderer2.push(`<!----> Dinner</h5> <p class="text-blue-800 dark:text-blue-200 text-sm mb-2">${escape_html(day.dinner.main)}</p> <div class="flex justify-between items-center"><span class="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">⏱️ ${escape_html(day.dinner.prep_time)}</span></div> <p class="text-xs text-blue-600 dark:text-blue-400 mt-2 italic">${escape_html(day.dinner.health_note)}</p></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl"><h4 class="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">`);
      Icon($$renderer2, { icon: "heroicons:light-bulb", class: "w-5 h-5 mr-2" });
      $$renderer2.push(`<!----> 🧠 Tips for the Week</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><ul class="text-sm text-green-700 dark:text-green-300 space-y-2"><li><strong>Prep ahead:</strong> Chop veggies and soak dals the night before</li> <li><strong>School lunchbox ideas:</strong> Lemon rice, curd rice, chapati rolls, mini idlis with podi</li></ul></div> <div><ul class="text-sm text-green-700 dark:text-green-300 space-y-2"><li><strong>Hydration:</strong> Include buttermilk, fruit juices, and water-rich veggies</li> <li><strong>Balance:</strong> Rotate greens, lentils, and root vegetables across the week</li></ul></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
