<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../../src/lib/data/database.js";

  let currentTab = "planner";
  let weeklyMeals = [];
  let mealPlans = [];
  let shoppingLists = [];
  let showAddMeal = false;
  let editingMeal = null;

  const tabs = [
    { id: "planner", label: "Weekly Planner", icon: "heroicons:calendar-days" },
    { id: "nutrition", label: "Nutrition Guide", icon: "heroicons:heart" },
    { id: "shopping", label: "Shopping Lists", icon: "heroicons:shopping-cart" },
    { id: "prep", label: "Meal Prep", icon: "heroicons:clock" },
    { id: "cultural", label: "Cultural Calendar", icon: "heroicons:sparkles" },
  ];

  // Thoughtful weekly meal planner for South Indian family
  let weeklyMealPlan = [
    {
      day: "Monday",
      emoji: "🍽️",
      breakfast: {
        main: "Idli + Tomato chutney",
        drink: "Warm milk for kids",
        prep_time: "30 mins",
        health_note: "Light and digestible start",
      },
      lunch: {
        main: "Sambar (with drumstick & carrot) + Beans poriyal + Rice + Curd",
        prep_time: "45 mins",
        health_note: "Protein-rich, balanced nutrition",
      },
      dinner: {
        main: "Chapati + Mixed vegetable kurma + Fruit slices",
        prep_time: "35 mins",
        health_note: "Light dinner, good for digestion",
      },
      cultural_note: "Start the week with traditional comfort food",
    },
    {
      day: "Tuesday",
      emoji: "🍽️",
      breakfast: {
        main: "Rava upma + Coconut chutney + Banana",
        drink: "Filter coffee for adults",
        prep_time: "25 mins",
        health_note: "Energy-boosting semolina",
      },
      lunch: {
        main: "Rasam + Potato roast + Rice + Buttermilk",
        prep_time: "40 mins",
        health_note: "Digestive rasam, cooling buttermilk",
      },
      dinner: {
        main: "Lemon rice + Cucumber raita + Papad",
        prep_time: "20 mins",
        health_note: "Simple, refreshing dinner",
      },
      cultural_note: "Rasam is medicine for the soul",
    },
    {
      day: "Wednesday",
      emoji: "🍽️",
      breakfast: {
        main: "Dosa + Molagapodi + Milk with Boost/Horlicks",
        drink: "Herbal tea optional",
        prep_time: "35 mins",
        health_note: "Crispy, protein-rich start",
      },
      lunch: {
        main: "Keerai kootu (greens) + Pumpkin curry + Rice + Curd",
        prep_time: "50 mins",
        health_note: "Iron-rich greens, vitamin A from pumpkin",
      },
      dinner: {
        main: "Vegetable semiya + Tomato thokku + Boiled peanuts",
        prep_time: "30 mins",
        health_note: "Light noodles, protein from peanuts",
      },
      cultural_note: "Keerai kootu - grandmother's health wisdom",
    },
    {
      day: "Thursday",
      emoji: "🍽️",
      breakfast: {
        main: "Pongal + Sambar + Apple slices",
        drink: "Warm milk",
        prep_time: "40 mins",
        health_note: "Ghee-rich pongal for energy",
      },
      lunch: {
        main: "Vathal kuzhambu + Cabbage poriyal + Rice + Curd",
        prep_time: "45 mins",
        health_note: "Traditional preservation, fiber from cabbage",
      },
      dinner: {
        main: "Chapati + Channa masala + Carrot sticks",
        prep_time: "40 mins",
        health_note: "Protein from channa, beta-carotene",
      },
      cultural_note: "Vathal kuzhambu - preserving tradition",
    },
    {
      day: "Friday",
      emoji: "🍽️",
      breakfast: {
        main: "Poori + Potato masala + Warm milk",
        drink: "Fresh juice optional",
        prep_time: "45 mins",
        health_note: "Weekend treats, comfort food",
      },
      lunch: {
        main: "Vegetable biryani + Onion raita + Curd rice",
        prep_time: "60 mins",
        health_note: "Celebration meal, aromatic spices",
      },
      dinner: {
        main: "Ragi dosa + Tomato chutney + Boiled corn",
        prep_time: "30 mins",
        health_note: "Healthy millet, fiber-rich",
      },
      cultural_note: "Friday feast preparations",
    },
    {
      day: "Saturday",
      emoji: "🍽️",
      breakfast: {
        main: "Adai + Avial + Herbal tea (optional for adults)",
        drink: "Fresh buttermilk",
        prep_time: "50 mins",
        health_note: "Protein-rich mixed dal pancake",
      },
      lunch: {
        main: "Thakkali kuzhambu + Ladies finger fry + Rice + Buttermilk",
        prep_time: "45 mins",
        health_note: "Tangy tomato gravy, okra nutrients",
      },
      dinner: {
        main: "Vegetable sandwich + Fruit salad + Milk",
        prep_time: "25 mins",
        health_note: "Light, fresh, vitamin-rich",
      },
      cultural_note: "Saturday relaxed cooking",
    },
    {
      day: "Sunday",
      emoji: "🍽️",
      breakfast: {
        main: "Masala dosa + Coconut chutney + Filter coffee (for adults)",
        drink: "Fresh fruit juice",
        prep_time: "45 mins",
        health_note: "Weekend special, crispy delight",
      },
      lunch: {
        main: "Special lunch: Sambar + Rasam + Kootu + Poriyal + Vadai + Payasam",
        prep_time: "90 mins",
        health_note: "Complete traditional feast",
      },
      dinner: {
        main: "Light tiffin: Idiyappam + Vegetable stew + Banana",
        prep_time: "35 mins",
        health_note: "Digestible string hoppers",
      },
      cultural_note: "Sunday feast - family bonding over food",
    },
  ];

  let nutritionTips = [
    {
      category: "Children's Nutrition",
      icon: "heroicons:academic-cap",
      color: "text-blue-500",
      tips: ["Include milk or dairy in every meal for calcium", "Add ghee to rice for healthy fats and brain development", "Serve colorful vegetables to ensure variety of nutrients", "Include protein in every meal - dal, curd, paneer", "Limit sugar, increase natural fruit intake"],
    },
    {
      category: "Traditional Wisdom",
      icon: "heroicons:sparkles",
      color: "text-orange-500",
      tips: ["Start meal with something sweet (jaggery/dates) for satisfaction", "End meal with buttermilk for digestion", "Include 6 tastes: sweet, sour, salty, spicy, bitter, astringent", "Eat according to season - cooling foods in summer, warming in winter", "Pray before meals - gratitude enhances digestion"],
    },
    {
      category: "Preparation Tips",
      icon: "heroicons:clock",
      color: "text-green-500",
      tips: ["Prep vegetables and chop onions the night before", "Soak dals and rice in advance for faster cooking", "Make masala powders in bulk and store properly", "Use pressure cooker for dal and vegetables to save time", "Prepare chutneys and podis weekly for quick meals"],
    },
    {
      category: "Hydration & Balance",
      icon: "heroicons:beaker",
      color: "text-cyan-500",
      tips: ["Include buttermilk, coconut water, and fresh juices", "Rotate greens across the week - spinach, amaranth, drumstick leaves", "Balance spicy foods with cooling elements like curd", "Use seasonal vegetables and fruits for better nutrition", "Add turmeric and pepper for immunity boost"],
    },
  ];

  let mealPrepGuide = [
    {
      task: "Sunday Evening Prep",
      time: "2 hours",
      activities: ["Soak rice and dals for the week", "Chop onions, tomatoes, and basic vegetables", "Make sambar/rasam powder if needed", "Prepare coconut chutney base (can refrigerate for 2-3 days)", "Plan and write down weekly menu"],
      benefits: "Saves 15-20 minutes each day, reduces morning stress",
    },
    {
      task: "Daily Morning Routine",
      time: "30 minutes",
      activities: ["Put rice for cooking in pressure cooker", "Start dal preparation", "Heat tawa for breakfast items", "Prepare fresh chutney or podi mixture", "Set curd for the day"],
      benefits: "Smooth morning routine, hot breakfast ready",
    },
    {
      task: "School Tiffin Ideas",
      time: "15 minutes",
      activities: ["Lemon rice with pickle and papad", "Curd rice with mango pickle", "Chapati rolls with potato filling", "Mini idlis with coconut podi", "Vegetable pulao with raita"],
      benefits: "Nutritious, appealing lunch for children",
    },
    {
      task: "Batch Cooking Tips",
      time: "Variable",
      activities: ["Cook large batch of rice, refrigerate portions", "Make big pot of sambar, lasts 2-3 days", "Prepare multiple rotis, store in container", "Cook and freeze idli/dosa batter", "Make masala base for quick curries"],
      benefits: "Reduces daily cooking time significantly",
    },
  ];

  let culturalCalendar = [
    {
      festival: "Pongal/Makar Sankranti",
      date: "January 14-17",
      special_foods: ["Sweet Pongal with jaggery and ghee", "Ven Pongal with pepper and cumin", "Sugarcane juice and fresh harvest vegetables", "Coconut rice and sesame sweets"],
      significance: "Celebrating harvest season and thanking nature",
      family_traditions: "Cooking in earthen pots, offering to Sun God",
    },
    {
      festival: "Maha Shivaratri",
      date: "February/March",
      special_foods: ["Fasting foods: fruits, milk, nuts", "Bilva leaves offering (symbolic)", "Simple satvic meals", "No onion, garlic preparations"],
      significance: "Spiritual purification and devotion",
      family_traditions: "Night-long prayers, simple pure food",
    },
    {
      festival: "Tamil New Year",
      date: "April 14",
      special_foods: ["Mangai Pachadi (6 tastes representing life)", "Bevu Bella (neem and jaggery for bitter-sweet life)", "Coconut rice and festival sweets", "Traditional banana leaf feast"],
      significance: "New beginnings with balanced perspective",
      family_traditions: "Early morning prayers, sharing special foods",
    },
    {
      festival: "Navarathri",
      date: "September/October",
      special_foods: ["Different legume sundals each day", "Coconut rice and tamarind rice", "Traditional sweets and offerings", "Satvic vegetarian meals"],
      significance: "Celebrating divine feminine energy",
      family_traditions: "Daily golu display, sharing with neighbors",
    },
    {
      festival: "Deepavali",
      date: "October/November",
      special_foods: ["Homemade sweets: laddu, halwa, burfi", "Savory snacks: murukku, thattai", "Oil bath tradition foods", "Sharing sweets with neighbors"],
      significance: "Victory of light over darkness",
      family_traditions: "Family bonding while making sweets",
    },
  ];

  let weeklyShoppingList = {
    staples: [
      { item: "Rice (idli/regular)", quantity: "5 kg", priority: "high" },
      { item: "Toor dal", quantity: "1 kg", priority: "high" },
      { item: "Moong dal", quantity: "500g", priority: "medium" },
      { item: "Urad dal", quantity: "500g", priority: "medium" },
    ],
    vegetables: [
      { item: "Tomatoes", quantity: "1 kg", priority: "high" },
      { item: "Onions", quantity: "1 kg", priority: "high" },
      { item: "Potatoes", quantity: "1 kg", priority: "high" },
      { item: "Drumsticks", quantity: "250g", priority: "medium" },
      { item: "Beans", quantity: "250g", priority: "medium" },
      { item: "Carrot", quantity: "250g", priority: "medium" },
      { item: "Greens (spinach/amaranth)", quantity: "1 bunch", priority: "high" },
      { item: "Cucumber", quantity: "2 pieces", priority: "low" },
    ],
    dairy: [
      { item: "Milk", quantity: "Daily 1L", priority: "high" },
      { item: "Curd", quantity: "500ml", priority: "high" },
      { item: "Ghee", quantity: "200g", priority: "medium" },
    ],
    spices: [
      { item: "Tamarind", quantity: "250g", priority: "medium" },
      { item: "Coconut", quantity: "1 piece", priority: "high" },
      { item: "Curry leaves", quantity: "1 bunch", priority: "high" },
      { item: "Coriander leaves", quantity: "1 bunch", priority: "medium" },
    ],
    fruits: [
      { item: "Bananas", quantity: "1 dozen", priority: "high" },
      { item: "Apples", quantity: "1 kg", priority: "medium" },
      { item: "Seasonal fruits", quantity: "As needed", priority: "low" },
    ],
  };

  async function loadMealPlans() {
    try {
      mealPlans = (await db.mealPlans?.toArray()) || [];
    } catch (error) {
      console.error("Error loading meal plans:", error);
      mealPlans = [];
    }
  }

  async function saveMealPlan(mealData) {
    try {
      const meal = {
        ...mealData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      await db.mealPlans?.add(meal);
      mealPlans = [...mealPlans, meal];
      return true;
    } catch (error) {
      console.error("Error saving meal plan:", error);
      return false;
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  }

  onMount(() => {
    document.title = "Meal Planning - Family App";
    loadMealPlans();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
            <Icon icon="heroicons:calendar-days" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Meal Planning</h1>
            <p class="text-gray-600 dark:text-gray-300">अन्नम् ब्रह्म | Food is divine - plan with love and wisdom</p>
          </div>
        </div>
      </div>

      <!-- Food Wisdom -->
      <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:heart" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">भोजन संस्कार | Food Culture</h3>
            <p class="text-white/90">"अन्नदाता सुखीभव | May the food provider be happy. Thoughtful meal planning nourishes the family's body, mind, and soul while preserving our rich culinary heritage."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "உணவு பிரம்மம் - அன்புடன் திட்டமிட்டு சமைத்து பரிமாறுவோம்"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-orange-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "planner"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🗓️ Weekly South Indian Meal Planner</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            <strong>Family Profile:</strong> 2 adults + 2 children (school-going) |
            <strong>Focus:</strong> Balanced, easy-to-cook, child-friendly, culturally rooted
          </p>

          <div class="space-y-6">
            {#each weeklyMealPlan as day}
              <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-xl font-bold text-orange-900 dark:text-orange-100 flex items-center">
                    <span class="text-2xl mr-3">{day.emoji}</span>
                    {day.day}
                  </h4>
                  <span class="text-sm text-orange-600 dark:text-orange-400 italic">"{day.cultural_note}"</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Breakfast -->
                  <div class="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4">
                    <h5 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center">
                      <Icon icon="heroicons:sun" class="w-4 h-4 mr-2" />
                      Breakfast
                    </h5>
                    <p class="text-yellow-800 dark:text-yellow-200 text-sm mb-2">{day.breakfast.main}</p>
                    {#if day.breakfast.drink}
                      <p class="text-yellow-700 dark:text-yellow-300 text-xs mb-2">🥛 {day.breakfast.drink}</p>
                    {/if}
                    <div class="flex justify-between items-center">
                      <span class="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                        ⏱️ {day.breakfast.prep_time}
                      </span>
                    </div>
                    <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-2 italic">{day.breakfast.health_note}</p>
                  </div>

                  <!-- Lunch -->
                  <div class="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                    <h5 class="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                      <Icon icon="heroicons:sun" class="w-4 h-4 mr-2" />
                      Lunch
                    </h5>
                    <p class="text-green-800 dark:text-green-200 text-sm mb-2">{day.lunch.main}</p>
                    <div class="flex justify-between items-center">
                      <span class="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                        ⏱️ {day.lunch.prep_time}
                      </span>
                    </div>
                    <p class="text-xs text-green-600 dark:text-green-400 mt-2 italic">{day.lunch.health_note}</p>
                  </div>

                  <!-- Dinner -->
                  <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
                    <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                      <Icon icon="heroicons:moon" class="w-4 h-4 mr-2" />
                      Dinner
                    </h5>
                    <p class="text-blue-800 dark:text-blue-200 text-sm mb-2">{day.dinner.main}</p>
                    <div class="flex justify-between items-center">
                      <span class="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        ⏱️ {day.dinner.prep_time}
                      </span>
                    </div>
                    <p class="text-xs text-blue-600 dark:text-blue-400 mt-2 italic">{day.dinner.health_note}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Weekly Tips -->
          <div class="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
            <h4 class="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">
              <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
              🧠 Tips for the Week
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul class="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li><strong>Prep ahead:</strong> Chop veggies and soak dals the night before</li>
                  <li><strong>School lunchbox ideas:</strong> Lemon rice, curd rice, chapati rolls, mini idlis with podi</li>
                </ul>
              </div>
              <div>
                <ul class="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li><strong>Hydration:</strong> Include buttermilk, fruit juices, and water-rich veggies</li>
                  <li><strong>Balance:</strong> Rotate greens, lentils, and root vegetables across the week</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      {:else if currentTab === "nutrition"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">💚 Nutrition Guidelines</h3>
          <div class="space-y-6">
            {#each nutritionTips as category}
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Icon icon={category.icon} class="w-6 h-6 mr-3 {category.color}" />
                  {category.category}
                </h4>
                <div class="space-y-3">
                  {#each category.tips as tip}
                    <div class="flex items-start space-x-3">
                      <Icon icon="heroicons:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span class="text-gray-700 dark:text-gray-300 text-sm">{tip}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "shopping"}
        <div>
          <h3 class="text-xl font-semibant text-gray-700 dark:text-gray-300 mb-6">🛒 Weekly Shopping List</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each Object.entries(weeklyShoppingList) as [category, items]}
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 capitalize flex items-center">
                  <Icon icon="heroicons:square-3-stack-3d" class="w-5 h-5 mr-2 text-blue-500" />
                  {category}
                </h4>
                <div class="space-y-3">
                  {#each items as item}
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <input type="checkbox" class="rounded border-gray-300 text-blue-600" />
                        <span class="text-sm text-gray-700 dark:text-gray-300">{item.item}</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-xs text-gray-500">{item.quantity}</span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full {getPriorityColor(item.priority)}">
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "prep"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">⏰ Meal Prep Guide</h3>
          <div class="space-y-6">
            {#each mealPrepGuide as guide}
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-blue-900 dark:text-blue-100">{guide.task}</h4>
                    <p class="text-blue-700 dark:text-blue-300">Estimated time: {guide.time}</p>
                  </div>
                  <Icon icon="heroicons:clock" class="w-8 h-8 text-blue-500" />
                </div>

                <div class="mb-4">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Activities:</h5>
                  <div class="space-y-2">
                    {#each guide.activities as activity}
                      <div class="flex items-start space-x-2">
                        <Icon icon="heroicons:check" class="w-4 h-4 text-blue-600 mt-0.5" />
                        <span class="text-sm text-blue-800 dark:text-blue-200">{activity}</span>
                      </div>
                    {/each}
                  </div>
                </div>

                <div class="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <h5 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Benefits:</h5>
                  <p class="text-blue-800 dark:text-blue-200 text-sm">{guide.benefits}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else if currentTab === "cultural"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">✨ Cultural Food Calendar</h3>
          <div class="space-y-6">
            {#each culturalCalendar as festival}
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h4 class="text-xl font-bold text-purple-900 dark:text-purple-100">{festival.festival}</h4>
                    <p class="text-purple-700 dark:text-purple-300">{festival.date}</p>
                  </div>
                  <Icon icon="heroicons:sparkles" class="w-8 h-8 text-purple-500" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <h5 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Special Foods:</h5>
                    <div class="space-y-1">
                      {#each festival.special_foods as food}
                        <div class="flex items-center space-x-2">
                          <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                          <span class="text-sm text-purple-800 dark:text-purple-200">{food}</span>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <div class="p-4 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                    <h5 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">Family Traditions:</h5>
                    <p class="text-pink-800 dark:text-pink-200 text-sm">{festival.family_traditions}</p>
                  </div>
                </div>

                <div class="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <h5 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Cultural Significance:</h5>
                  <p class="text-orange-800 dark:text-orange-200 text-sm">{festival.significance}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
