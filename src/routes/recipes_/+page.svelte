<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "$lib/data/database.js";

  let currentTab = "kuzhambu";
  let recipes = [];
  let favorites = [];
  let showAddRecipe = false;
  let searchTerm = "";

  const tabs = [
    { id: "kuzhambu", label: "Kuzhambu & Rasam", icon: "heroicons:fire" },
    { id: "kootu", label: "Kootu & Poriyal", icon: "heroicons:leaf" },
    { id: "rice", label: "Rice Specials", icon: "heroicons:cake" },
    { id: "tiffin", label: "Tiffin & Snacks", icon: "heroicons:star" },
    { id: "sweets", label: "Traditional Sweets", icon: "heroicons:heart" },
  ];

  // Traditional Tamil Vegetarian Recipes
  let traditionalRecipes = {
    kuzhambu: [
      {
        name: "Vathal Kuzhambu",
        ingredients: ["Tamarind", "Manathakkali vathal", "Mustard", "Fenugreek", "Sambar powder"],
        method: "Roast vathal in sesame oil, add tamarind extract, spices, simmer till thick",
        emotion: "Paati's go-to on rainy days—served with hot rice and appalam",
        prep_time: "30 mins",
        serves: "4-5 people",
        difficulty: "Medium",
        category: "Traditional",
        health_benefits: "Digestive, rich in antioxidants from sundried vegetables",
      },
      {
        name: "Milagu Kuzhambu",
        ingredients: ["Black pepper", "Tamarind", "Curry leaves", "Garlic"],
        method: "Grind pepper-garlic paste, boil with tamarind and tempering",
        emotion: "Warming and medicinal—perfect for monsoon sniffles",
        prep_time: "25 mins",
        serves: "4 people",
        difficulty: "Easy",
        category: "Medicinal",
        health_benefits: "Natural antibiotic, good for cold and cough",
      },
      {
        name: "Thakkali Rasam",
        ingredients: ["Ripe tomatoes", "Tamarind", "Rasam powder", "Coriander"],
        method: "Boil tomatoes, mash, add tamarind and spices, temper with mustard",
        emotion: "Amma's comfort bowl—served with potato roast",
        prep_time: "20 mins",
        serves: "4-5 people",
        difficulty: "Easy",
        category: "Comfort Food",
        health_benefits: "Rich in Vitamin C, aids digestion",
      },
      {
        name: "Jeera Rasam",
        ingredients: ["Cumin", "Pepper", "Garlic", "Tamarind"],
        method: "Grind spice paste, boil with tamarind, finish with ghee tempering",
        emotion: "Digestive and light—Paati's post-festival detox",
        prep_time: "15 mins",
        serves: "4 people",
        difficulty: "Easy",
        category: "Digestive",
        health_benefits: "Excellent for digestion, boosts metabolism",
      },
      {
        name: "Paruppu Rasam",
        ingredients: ["Cooked toor dal", "Tamarind", "Tomato", "Rasam powder"],
        method: "Mix dal with tamarind extract, boil with spices, temper",
        emotion: "School lunchbox staple—paired with curd rice",
        prep_time: "25 mins",
        serves: "5-6 people",
        difficulty: "Easy",
        category: "Daily Meal",
        health_benefits: "High protein, complete amino acids from dal",
      },
    ],
    kootu: [
      {
        name: "Poricha Kootu",
        ingredients: ["Moong dal", "Ash gourd", "Coconut", "Cumin"],
        method: "Cook dal + veggie, grind coconut paste, mix and temper",
        emotion: "Mild and grounding—Paati's fasting day favorite",
        prep_time: "35 mins",
        serves: "4-5 people",
        difficulty: "Medium",
        category: "Comfort Food",
        health_benefits: "Easy to digest, good for upset stomach",
      },
      {
        name: "Keerai Kootu",
        ingredients: ["Greens (arai/keerai)", "Moong dal", "Coconut"],
        method: "Cook greens and dal, add coconut paste, temper",
        emotion: "Amma's iron booster—served with rasam",
        prep_time: "30 mins",
        serves: "4 people",
        difficulty: "Medium",
        category: "Healthy",
        health_benefits: "High in iron, folate, and vitamins",
      },
      {
        name: "Pudalangai Poriyal",
        ingredients: ["Snake gourd", "Coconut", "Mustard", "Green chilli"],
        method: "Steam veggie, sauté with mustard, finish with grated coconut",
        emotion: "Light and crunchy—paired with vathal kuzhambu",
        prep_time: "20 mins",
        serves: "4 people",
        difficulty: "Easy",
        category: "Daily Meal",
        health_benefits: "Low calorie, high fiber, good for weight management",
      },
      {
        name: "Vazhakkai Podimas",
        ingredients: ["Raw banana", "Green chilli", "Ginger", "Coconut"],
        method: "Steam, mash, sauté with spices and coconut",
        emotion: "Thatha's favorite—served with paruppu rasam",
        prep_time: "25 mins",
        serves: "4-5 people",
        difficulty: "Easy",
        category: "Traditional",
        health_benefits: "Rich in potassium, good for heart health",
      },
      {
        name: "Kathirikai Kara Poriyal",
        ingredients: ["Brinjal", "Red chilli", "Mustard", "Curry leaves"],
        method: "Sauté brinjal with spices till crisp",
        emotion: "Amma's Sunday special—goes with sambar",
        prep_time: "15 mins",
        serves: "3-4 people",
        difficulty: "Easy",
        category: "Weekend Special",
        health_benefits: "Rich in fiber and antioxidants",
      },
    ],
    rice: [
      {
        name: "Puliyodarai",
        ingredients: ["Tamarind", "Sesame", "Peanuts", "Jaggery", "Spices"],
        method: "Make pulikachal base, mix with cooled rice",
        emotion: "Temple-style—packed for train journeys",
        prep_time: "45 mins",
        serves: "6-8 people",
        difficulty: "Medium",
        category: "Temple Food",
        health_benefits: "Long-lasting energy, good for travel",
      },
      {
        name: "Thengai Sadam",
        ingredients: ["Grated coconut", "Green chilli", "Mustard", "Rice"],
        method: "Sauté coconut with spices, mix with rice",
        emotion: "Quick fix lunch—paired with pickle",
        prep_time: "15 mins",
        serves: "4 people",
        difficulty: "Easy",
        category: "Quick Meal",
        health_benefits: "Rich in healthy fats, cooling for stomach",
      },
      {
        name: "Ellu Sadam",
        ingredients: ["Black sesame", "Red chilli", "Tamarind", "Rice"],
        method: "Roast and grind sesame mix, stir into rice",
        emotion: "Saturday ritual—offered to Perumal",
        prep_time: "30 mins",
        serves: "4-5 people",
        difficulty: "Medium",
        category: "Ritual Food",
        health_benefits: "High in calcium, good for bone health",
      },
      {
        name: "Lemon Rice",
        ingredients: ["Lemon juice", "Mustard", "Green chilli", "Turmeric"],
        method: "Temper spices, mix with rice and lemon juice",
        emotion: "School tiffin classic—served with papad",
        prep_time: "10 mins",
        serves: "3-4 people",
        difficulty: "Easy",
        category: "Lunch Box",
        health_benefits: "Rich in Vitamin C, aids iron absorption",
      },
      {
        name: "Kalkandu Sadam",
        ingredients: ["Rock sugar", "Milk", "Rice", "Cardamom"],
        method: "Cook rice in milk, add kalkandu and flavor",
        emotion: "Temple prasadam—served during Navaratri",
        prep_time: "40 mins",
        serves: "5-6 people",
        difficulty: "Medium",
        category: "Prasadam",
        health_benefits: "Natural cooling effect, good for children",
      },
    ],
    tiffin: [
      {
        name: "Adai",
        ingredients: ["Mixed dals", "Rice", "Red chilli", "Curry leaves"],
        method: "Soak, grind, ferment, make thick dosas",
        emotion: "Protein-rich—served with avial",
        prep_time: "20 mins + overnight fermentation",
        serves: "4-5 people",
        difficulty: "Medium",
        category: "Breakfast",
        health_benefits: "Complete protein, high in fiber",
      },
      {
        name: "Rava Pongal",
        ingredients: ["Sooji", "Moong dal", "Pepper", "Ghee"],
        method: "Roast rava, cook with dal and spices",
        emotion: "Amma's quick breakfast—served with chutney",
        prep_time: "25 mins",
        serves: "4 people",
        difficulty: "Easy",
        category: "Breakfast",
        health_benefits: "Easy to digest, good for children",
      },
      {
        name: "Kara Kozhukattai",
        ingredients: ["Rice flour", "Mustard", "Green chilli", "Coconut"],
        method: "Make dough, shape dumplings, steam",
        emotion: "Paati's Ganesh Chaturthi savory",
        prep_time: "45 mins",
        serves: "5-6 people",
        difficulty: "Hard",
        category: "Festival Food",
        health_benefits: "Gluten-free, steamed and healthy",
      },
      {
        name: "Thavala Vadai",
        ingredients: ["Rice", "Toor dal", "Pepper", "Coconut"],
        method: "Soak, grind, shape, deep fry",
        emotion: "Rare treat—crispy outside, soft inside",
        prep_time: "60 mins + soaking time",
        serves: "4-5 people",
        difficulty: "Hard",
        category: "Special Snack",
        health_benefits: "High protein, festive indulgence",
      },
      {
        name: "Paniyaram",
        ingredients: ["Dosa batter", "Onion", "Green chilli", "Curry leaves"],
        method: "Pour into kuzhi-paniyaram pan, roast till golden",
        emotion: "Leftover magic—kids love it with chutney",
        prep_time: "20 mins",
        serves: "3-4 people",
        difficulty: "Easy",
        category: "Snack",
        health_benefits: "Fermented food, good for gut health",
      },
    ],
    sweets: [
      {
        name: "Maavu Laddu",
        ingredients: ["Roasted gram flour", "Sugar", "Ghee", "Cardamom"],
        method: "Roast flour, mix with sugar and ghee, shape",
        emotion: "Paati's Diwali laddu—melts in mouth",
        prep_time: "45 mins",
        serves: "Makes 20 laddus",
        difficulty: "Medium",
        category: "Festival Sweet",
        health_benefits: "Rich in protein, good for growing children",
      },
      {
        name: "Thengai Burfi",
        ingredients: ["Coconut", "Sugar", "Cardamom", "Ghee"],
        method: "Cook coconut-sugar mix till set, cut into squares",
        emotion: "Amma's quick sweet—made for guests",
        prep_time: "30 mins",
        serves: "Makes 15 pieces",
        difficulty: "Easy",
        category: "Quick Sweet",
        health_benefits: "Natural coconut oil, instant energy",
      },
      {
        name: "Akkaravadisal",
        ingredients: ["Rice", "Milk", "Jaggery", "Ghee", "Cashews"],
        method: "Slow-cooked in milk, sweetened with jaggery",
        emotion: "Iyengar-style—offered to Perumal",
        prep_time: "90 mins",
        serves: "6-8 people",
        difficulty: "Hard",
        category: "Temple Sweet",
        health_benefits: "Rich in calcium, iron from jaggery",
      },
      {
        name: "Suyyam / Seeyam",
        ingredients: ["Urad dal batter", "Jaggery-coconut filling"],
        method: "Stuff, dip, deep fry",
        emotion: "Festival delight—crispy outside, soft inside",
        prep_time: "75 mins",
        serves: "Makes 12 pieces",
        difficulty: "Hard",
        category: "Festival Sweet",
        health_benefits: "High protein from urad dal",
      },
      {
        name: "Kasi Halwa",
        ingredients: ["Ash gourd", "Sugar", "Ghee", "Cardamom"],
        method: "Grate, cook with sugar and ghee till glossy",
        emotion: "Wedding feast staple—served with vadai",
        prep_time: "60 mins",
        serves: "8-10 people",
        difficulty: "Medium",
        category: "Wedding Sweet",
        health_benefits: "High water content, cooling effect",
      },
    ],
  };

  async function loadRecipes() {
    try {
      recipes = (await db.recipes?.toArray()) || [];
    } catch (error) {
      console.error("Error loading recipes:", error);
      recipes = [];
    }
  }

  async function loadFavorites() {
    try {
      favorites = (await db.favoriteRecipes?.toArray()) || [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      favorites = [];
    }
  }

  async function addToFavorites(recipe) {
    try {
      const favorite = {
        ...recipe,
        favoriteId: Date.now(),
        addedAt: new Date().toISOString(),
      };

      await db.favoriteRecipes?.add(favorite);
      favorites = [...favorites, favorite];
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  }

  function getDifficultyColor(difficulty) {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "hard":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  }

  function getCategoryColor(category) {
    const colors = {
      Traditional: "text-orange-600 bg-orange-100",
      Medicinal: "text-green-600 bg-green-100",
      "Comfort Food": "text-blue-600 bg-blue-100",
      Digestive: "text-purple-600 bg-purple-100",
      "Daily Meal": "text-gray-600 bg-gray-100",
      Healthy: "text-emerald-600 bg-emerald-100",
      "Temple Food": "text-yellow-600 bg-yellow-100",
      "Quick Meal": "text-cyan-600 bg-cyan-100",
      "Lunch Box": "text-indigo-600 bg-indigo-100",
      "Festival Food": "text-pink-600 bg-pink-100",
      Breakfast: "text-amber-600 bg-amber-100",
    };
    return colors[category] || "text-gray-600 bg-gray-100";
  }

  function getFilteredRecipes() {
    const currentRecipes = traditionalRecipes[currentTab] || [];
    if (!searchTerm) return currentRecipes;

    return currentRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase())) || recipe.emotion.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  function isFavorite(recipe) {
    return favorites.some((fav) => fav.name === recipe.name);
  }

  onMount(() => {
    document.title = "Traditional Recipes - Family App";
    loadRecipes();
    loadFavorites();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white">
            <Icon icon="heroicons:book-open" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Traditional Tamil Recipes</h1>
            <p class="text-gray-600 dark:text-gray-300">पाकशास्त्रम् | The sacred art of cooking with love and tradition</p>
          </div>
        </div>
      </div>

      <!-- Culinary Wisdom -->
      <div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:fire" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">रसोई संस्कार | Kitchen Traditions</h3>
            <p class="text-white/90">"अन्नं ब्रह्म रसो विष्णु पक्ता देवो महेश्वर: | Food is Brahma, taste is Vishnu, and the cook is Maheshwara. Every recipe carries generations of love, wisdom, and cultural heritage."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "சமையல் கலை என்பது அன்பும் பாரம்பரியமும் கலந்த புனித கலை"</p>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" bind:value={searchTerm} placeholder="Search recipes, ingredients, or emotions..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-red-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-red-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-red-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Recipe Count -->
    <div class="mb-6">
      <p class="text-gray-600 dark:text-gray-400">
        Showing {getFilteredRecipes().length} traditional recipes
        {#if searchTerm}for "{searchTerm}"{/if}
      </p>
    </div>

    <!-- Recipes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each getFilteredRecipes() as recipe}
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-orange-200 dark:border-orange-700">
          <!-- Recipe Header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{recipe.name}</h3>
              <div class="flex items-center space-x-2 mb-2">
                <span class="px-2 py-1 text-xs font-medium rounded-full {getDifficultyColor(recipe.difficulty)}">
                  {recipe.difficulty}
                </span>
                <span class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(recipe.category)}">
                  {recipe.category}
                </span>
              </div>
            </div>
            <button class="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors" on:click={() => addToFavorites(recipe)} disabled={isFavorite(recipe)}>
              <Icon icon={isFavorite(recipe) ? "heroicons:heart-solid" : "heroicons:heart"} class="w-5 h-5 {isFavorite(recipe) ? 'text-red-500' : 'text-gray-400'}" />
            </button>
          </div>

          <!-- Recipe Details -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400 flex items-center">
                <Icon icon="heroicons:clock" class="w-4 h-4 mr-1" />
                Prep Time:
              </span>
              <span class="font-medium">{recipe.prep_time}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400 flex items-center">
                <Icon icon="heroicons:users" class="w-4 h-4 mr-1" />
                Serves:
              </span>
              <span class="font-medium">{recipe.serves}</span>
            </div>
          </div>

          <!-- Ingredients -->
          <div class="mb-4">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <Icon icon="heroicons:square-3-stack-3d" class="w-4 h-4 mr-2 text-orange-500" />
              Ingredients
            </h4>
            <div class="flex flex-wrap gap-1">
              {#each recipe.ingredients as ingredient}
                <span class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-full">
                  {ingredient}
                </span>
              {/each}
            </div>
          </div>

          <!-- Method -->
          <div class="mb-4">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <Icon icon="heroicons:list-bullet" class="w-4 h-4 mr-2 text-blue-500" />
              Method
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{recipe.method}</p>
          </div>

          <!-- Emotional Connection -->
          <div class="mb-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg">
            <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-1 flex items-center">
              <Icon icon="heroicons:heart" class="w-4 h-4 mr-2" />
              Family Memory
            </h4>
            <p class="text-sm text-pink-800 dark:text-pink-200 italic">"{recipe.emotion}"</p>
          </div>

          <!-- Health Benefits -->
          {#if recipe.health_benefits}
            <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 class="font-semibold text-green-900 dark:text-green-100 mb-1 flex items-center">
                <Icon icon="heroicons:heart" class="w-4 h-4 mr-2" />
                Health Benefits
              </h4>
              <p class="text-sm text-green-800 dark:text-green-200">{recipe.health_benefits}</p>
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="flex space-x-2 mt-4">
            <button class="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"> Cook This </button>
            <button class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"> Share </button>
          </div>
        </div>
      {/each}
    </div>

    {#if getFilteredRecipes().length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:magnifying-glass" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Recipes Found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          {#if searchTerm}
            No recipes match your search for "{searchTerm}"
          {:else}
            No recipes available in this category
          {/if}
        </p>
        {#if searchTerm}
          <button class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors" on:click={() => (searchTerm = "")}> Clear Search </button>
        {/if}
      </div>
    {/if}

    <!-- Traditional Wisdom -->
    <div class="mt-12 p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
      <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center">
        <Icon icon="heroicons:star" class="w-5 h-5 mr-2" />
        पाकशास्त्र ज्ञान | Culinary Wisdom
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-amber-700 dark:text-amber-300 mb-2">Cooking Philosophy:</h5>
          <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• Cook with devotion - food absorbs the cook's emotions</li>
            <li>• Use fresh, seasonal ingredients from nature</li>
            <li>• Balance the six tastes in every meal</li>
            <li>• Feed others before feeding yourself</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-amber-700 dark:text-amber-300 mb-2">Kitchen Mantras:</h5>
          <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• "अन्नदानं महादानं" - Giving food is the greatest charity</li>
            <li>• Clean kitchen, pure heart, blessed food</li>
            <li>• Waste not, want not - respect every grain</li>
            <li>• Share recipes, spread love and culture</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-amber-200 dark:bg-amber-800 rounded-lg italic text-amber-800 dark:text-amber-200">"यत्पिण्डे तत्ब्रह्माण्डे | As is the individual, so is the universe. What we cook and eat shapes not just our body, but our mind and spirit."</blockquote>
    </div>
  </div>
</div>
