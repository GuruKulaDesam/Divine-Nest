<script>
  import Icon from "@iconify/svelte";
  import { MealPlanner as MealData, FestivalPrep } from "../../data/kitchenData.js";

  export let selectedProfile = "family";

  let activeView = "weekly"; // weekly, festival, prep
  let selectedDay = "monday";
  let selectedFestival = "diwali";

  const daysOfWeek = [
    { key: "monday", name: "Monday", tamil: "திங்கள்" },
    { key: "tuesday", name: "Tuesday", tamil: "செவ்வாய்" },
    { key: "wednesday", name: "Wednesday", tamil: "புதன்" },
    { key: "thursday", name: "Thursday", tamil: "வியாழன்" },
    { key: "friday", name: "Friday", tamil: "வெள்ளி" },
    { key: "saturday", name: "Saturday", tamil: "சனி" },
    { key: "sunday", name: "Sunday", tamil: "ஞாயிறு" },
  ];

  // Get meal for specific day
  function getMealForDay(day) {
    return MealData.weeklyGrid[day];
  }

  // Get meal type color
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

  // Reactive statements for meal data
  $: todayMeal = getMealForDay(selectedDay);
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Meal Planner</h2>
      <p class="text-gray-600">உணவு திட்டமிடல் - Weekly meals with South Indian traditions</p>
    </div>
    <div class="flex space-x-2">
      <button on:click={() => (activeView = "weekly")} class="px-4 py-2 rounded-lg transition-colors {activeView === 'weekly' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"> Weekly Grid </button>
      <button on:click={() => (activeView = "festival")} class="px-4 py-2 rounded-lg transition-colors {activeView === 'festival' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"> Festival Menu </button>
      <button on:click={() => (activeView = "prep")} class="px-4 py-2 rounded-lg transition-colors {activeView === 'prep' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"> Prep Schedule </button>
    </div>
  </div>

  {#if activeView === "weekly"}
    <!-- Weekly Meal Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Day Selector -->
      <div class="lg:col-span-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Days of Week</h3>
        <div class="space-y-2">
          {#each daysOfWeek as day}
            <button on:click={() => (selectedDay = day.key)} class="w-full flex items-center justify-between p-3 rounded-lg transition-all text-left {selectedDay === day.key ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}">
              <div>
                <div class="font-medium">{day.name}</div>
                <div class="text-xs opacity-75">{day.tamil}</div>
              </div>
              <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Daily Meal Details -->
      <div class="lg:col-span-3">
        {#if todayMeal}
          <div class="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {daysOfWeek.find((d) => d.key === selectedDay)?.name} Meals
              <span class="text-sm text-gray-600 ml-2">({daysOfWeek.find((d) => d.key === selectedDay)?.tamil})</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Breakfast -->
              <div class="border-l-4 {getMealColor('breakfast')} p-4 rounded-r-lg">
                <div class="flex items-center space-x-2 mb-2">
                  <Icon icon="heroicons:sun" class="w-5 h-5 text-yellow-500" />
                  <h4 class="font-semibold text-gray-900">Breakfast</h4>
                </div>
                <div class="font-medium text-gray-900 mb-1">{todayMeal.breakfast.dish}</div>
                <div class="text-sm text-gray-600 mb-2">{todayMeal.breakfast.tamil}</div>
                <div class="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                  💡 {todayMeal.breakfast.prep}
                </div>
              </div>

              <!-- Lunch -->
              <div class="border-l-4 {getMealColor('lunch')} p-4 rounded-r-lg">
                <div class="flex items-center space-x-2 mb-2">
                  <Icon icon="heroicons:fire" class="w-5 h-5 text-orange-500" />
                  <h4 class="font-semibold text-gray-900">Lunch</h4>
                </div>
                <div class="font-medium text-gray-900 mb-1">{todayMeal.lunch.dish}</div>
                <div class="text-sm text-gray-600 mb-2">{todayMeal.lunch.tamil}</div>
                <div class="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">
                  💡 {todayMeal.lunch.prep}
                </div>
              </div>

              <!-- Dinner -->
              <div class="border-l-4 {getMealColor('dinner')} p-4 rounded-r-lg">
                <div class="flex items-center space-x-2 mb-2">
                  <Icon icon="heroicons:moon" class="w-5 h-5 text-blue-500" />
                  <h4 class="font-semibold text-gray-900">Dinner</h4>
                </div>
                <div class="font-medium text-gray-900 mb-1">{todayMeal.dinner.dish}</div>
                <div class="text-sm text-gray-600 mb-2">{todayMeal.dinner.tamil}</div>
                <div class="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
                  💡 {todayMeal.dinner.prep}
                </div>
              </div>
            </div>

            <!-- Daily Actions -->
            <div class="flex space-x-3 mt-6">
              <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Icon icon="heroicons:shopping-cart" class="w-4 h-4" />
                <span>Generate Shopping List</span>
              </button>
              <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Icon icon="heroicons:clock" class="w-4 h-4" />
                <span>Prep Timeline</span>
              </button>
              <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                <Icon icon="heroicons:arrow-path" class="w-4 h-4" />
                <span>Suggest Alternative</span>
              </button>
            </div>
          </div>
        {/if}

        <!-- Weekly Overview Table -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr class="bg-gray-50">
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Day</th>
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Breakfast</th>
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Lunch</th>
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {#each daysOfWeek as day}
                  {@const dayMeal = getMealForDay(day.key)}
                  {#if dayMeal}
                    <tr class="hover:bg-gray-50">
                      <td class="border border-gray-200 px-4 py-3">
                        <div class="font-medium">{day.name}</div>
                        <div class="text-xs text-gray-500">{day.tamil}</div>
                      </td>
                      <td class="border border-gray-200 px-4 py-3">
                        <div class="font-medium text-gray-900">{dayMeal.breakfast.dish}</div>
                        <div class="text-xs text-gray-600">{dayMeal.breakfast.tamil}</div>
                      </td>
                      <td class="border border-gray-200 px-4 py-3">
                        <div class="font-medium text-gray-900">{dayMeal.lunch.dish}</div>
                        <div class="text-xs text-gray-600">{dayMeal.lunch.tamil}</div>
                      </td>
                      <td class="border border-gray-200 px-4 py-3">
                        <div class="font-medium text-gray-900">{dayMeal.dinner.dish}</div>
                        <div class="text-xs text-gray-600">{dayMeal.dinner.tamil}</div>
                      </td>
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  {:else if activeView === "festival"}
    <!-- Festival Menus -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Navaratri Sundal -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <Icon icon="heroicons:gift" class="w-5 h-5 mr-2" />
          Navaratri Sundal
        </h3>
        <div class="text-sm text-purple-700 mb-4">நவராத்திரி சுண்டல் - 9 days, 9 varieties</div>

        <div class="space-y-2">
          {#each MealData.festivalOverlays.navaratri.days as day}
            <div class="bg-white border border-purple-100 rounded-lg p-3">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium text-purple-900">Day {day.day}: {day.sundal}</div>
                  <div class="text-xs text-purple-700">{day.tamil}</div>
                </div>
                <div class="text-xs text-purple-600">{day.goddess}</div>
              </div>
            </div>
          {/each}
        </div>

        <button class="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <Icon icon="heroicons:calendar" class="w-4 h-4" />
          <span>Plan Navaratri</span>
        </button>
      </div>

      <!-- Diwali Sweets & Snacks -->
      <div class="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <Icon icon="heroicons:fire" class="w-5 h-5 mr-2" />
          Diwali Menu
        </h3>
        <div class="text-sm text-orange-700 mb-4">தீபாவளி இனிப்பு & காரம்</div>

        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-orange-900 mb-2">Sweets (இனிப்பு)</h4>
            <div class="grid grid-cols-1 gap-1">
              {#each MealData.festivalOverlays.diwali.sweets as sweet}
                <div class="text-sm bg-white border border-orange-100 rounded px-2 py-1">{sweet}</div>
              {/each}
            </div>
          </div>

          <div>
            <h4 class="font-medium text-orange-900 mb-2">Snacks (காரம்)</h4>
            <div class="grid grid-cols-1 gap-1">
              {#each MealData.festivalOverlays.diwali.snacks as snack}
                <div class="text-sm bg-white border border-orange-100 rounded px-2 py-1">{snack}</div>
              {/each}
            </div>
          </div>
        </div>

        <button class="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          <Icon icon="heroicons:sparkles" class="w-4 h-4" />
          <span>Plan Diwali</span>
        </button>
      </div>

      <!-- Pongal Festival -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <Icon icon="heroicons:sun" class="w-5 h-5 mr-2" />
          Pongal Festival
        </h3>
        <div class="text-sm text-green-700 mb-4">பொங்கல் பண்டிகை</div>

        <div class="space-y-2">
          {#each MealData.festivalOverlays.pongal.dishes as dish}
            <div class="bg-white border border-green-100 rounded-lg p-2">
              <div class="text-sm font-medium text-green-900">{dish}</div>
            </div>
          {/each}
        </div>

        <button class="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <Icon icon="heroicons:leaf" class="w-4 h-4" />
          <span>Plan Pongal</span>
        </button>
      </div>
    </div>
  {:else if activeView === "prep"}
    <!-- Prep Schedule -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Daily Prep Timeline -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Icon icon="heroicons:clock" class="w-5 h-5 mr-2" />
          Daily Prep Timeline
        </h3>

        <div class="space-y-4">
          <div class="bg-white border border-blue-100 rounded-lg p-4">
            <div class="font-medium text-blue-900 mb-2">Night Before (रात से पहले)</div>
            <div class="space-y-1 text-sm text-blue-800">
              <div>• Soak dal/rice for tomorrow's breakfast</div>
              <div>• Grind batter if making dosa/idli</div>
              <div>• Prep vegetables and keep ready</div>
              <div>• Set curd for fermentation</div>
            </div>
          </div>

          <div class="bg-white border border-blue-100 rounded-lg p-4">
            <div class="font-medium text-blue-900 mb-2">Morning (காலை)</div>
            <div class="space-y-1 text-sm text-blue-800">
              <div>• Start with breakfast preparation</div>
              <div>• Keep rice for lunch cooking</div>
              <div>• Prep kids' tiffin boxes</div>
              <div>• Set up spice mise en place</div>
            </div>
          </div>

          <div class="bg-white border border-blue-100 rounded-lg p-4">
            <div class="font-medium text-blue-900 mb-2">Evening (मध्याह्न)</div>
            <div class="space-y-1 text-sm text-blue-800">
              <div>• Prep vegetables for dinner</div>
              <div>• Start any slow-cooking items</div>
              <div>• Plan tomorrow's menu</div>
              <div>• Clean and organize kitchen</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Prep Checklist -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <Icon icon="heroicons:clipboard-document-check" class="w-5 h-5 mr-2" />
          Weekly Prep Checklist
        </h3>

        <div class="space-y-3">
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Plan weekly menu grid</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Generate shopping list</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Prep spice powders</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Stock check pantry items</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Plan kids' tiffin variety</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Check festival dates</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-green-300" />
            <span class="text-green-800">Coordinate with vendors</span>
          </label>
        </div>

        <!-- Weekly Progress -->
        <div class="mt-6 p-4 bg-white border border-green-100 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-green-900">Weekly Progress</span>
            <span class="text-sm text-green-700">4/7 completed</span>
          </div>
          <div class="w-full bg-green-200 rounded-full h-2">
            <div class="bg-green-500 h-2 rounded-full transition-all" style="width: 57%"></div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
