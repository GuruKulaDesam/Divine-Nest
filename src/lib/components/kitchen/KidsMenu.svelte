<script>
  import Icon from "@iconify/svelte";
  import { KidsMenu as KidsData, WellnessProfiles } from "../../data/kitchenData.js";

  export let selectedProfile = "kids";

  let activeTab = "tiffin"; // tiffin, brainfood, mood, prep
  let selectedDay = "monday";
  let selectedChild = "thambi";

  const daysOfWeek = [
    { key: "monday", name: "Monday", tamil: "திங்கள்" },
    { key: "tuesday", name: "Tuesday", tamil: "செவ்வாய்" },
    { key: "wednesday", name: "Wednesday", tamil: "புதன்" },
    { key: "thursday", name: "Thursday", tamil: "வியாழன்" },
    { key: "friday", name: "Friday", tamil: "வெள்ளி" },
  ];

  const children = [
    { key: "thambi", name: "Thambi", tamil: "தம்பி", grade: "6th", age: "11 years" },
    { key: "akka", name: "Akka", tamil: "அக்கா", grade: "11th + JEE", age: "16 years" },
  ];

  // Get mood color
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

  // Get current tiffin for selected day and child
  $: currentTiffin = KidsData.tiffinPlanner[selectedDay]?.[selectedChild];

  // Generate weekly tiffin plan
  function generateWeeklyPlan() {
    const plan = [];
    daysOfWeek.forEach((day) => {
      const thambiMeal = KidsData.tiffinPlanner[day.key]?.thambi;
      const akkaMeal = KidsData.tiffinPlanner[day.key]?.akka;
      if (thambiMeal && akkaMeal) {
        plan.push({
          day: day.name,
          tamil: day.tamil,
          thambi: thambiMeal,
          akka: akkaMeal,
        });
      }
    });
    return plan;
  }

  $: weeklyPlan = generateWeeklyPlan();
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Kids Menu & School Meals</h2>
      <p class="text-gray-600">குழந்தைகள் உணவு - School tiffin & brain foods for growing minds</p>
    </div>
    <div class="flex space-x-2">
      {#each children as child}
        <button on:click={() => (selectedChild = child.key)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedChild === child.key ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
          <Icon icon="heroicons:user" class="w-4 h-4" />
          <div class="text-left">
            <div class="font-medium">{child.name}</div>
            <div class="text-xs opacity-75">{child.grade}</div>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Tab Navigation -->
  <div class="flex space-x-4 mb-6 border-b border-gray-200">
    <button on:click={() => (activeTab = "tiffin")} class="pb-3 px-1 border-b-2 transition-colors {activeTab === 'tiffin' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
      <div class="flex items-center space-x-2">
        <Icon icon="heroicons:gift" class="w-4 h-4" />
        <span>Tiffin Planner</span>
      </div>
    </button>
    <button on:click={() => (activeTab = "brainfood")} class="pb-3 px-1 border-b-2 transition-colors {activeTab === 'brainfood' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
      <div class="flex items-center space-x-2">
        <Icon icon="heroicons:light-bulb" class="w-4 h-4" />
        <span>Brain Foods</span>
      </div>
    </button>
    <button on:click={() => (activeTab = "mood")} class="pb-3 px-1 border-b-2 transition-colors {activeTab === 'mood' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
      <div class="flex items-center space-x-2">
        <Icon icon="heroicons:heart" class="w-4 h-4" />
        <span>Mood Foods</span>
      </div>
    </button>
    <button on:click={() => (activeTab = "prep")} class="pb-3 px-1 border-b-2 transition-colors {activeTab === 'prep' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}">
      <div class="flex items-center space-x-2">
        <Icon icon="heroicons:clock" class="w-4 h-4" />
        <span>Prep Assistant</span>
      </div>
    </button>
  </div>

  {#if activeTab === "tiffin"}
    <!-- Tiffin Planner -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Day Selector -->
      <div class="lg:col-span-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Day</h3>
        <div class="space-y-2">
          {#each daysOfWeek as day}
            <button on:click={() => (selectedDay = day.key)} class="w-full flex items-center justify-between p-3 rounded-lg transition-all text-left {selectedDay === day.key ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}">
              <div>
                <div class="font-medium">{day.name}</div>
                <div class="text-xs opacity-75">{day.tamil}</div>
              </div>
              <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
            </button>
          {/each}
        </div>

        <!-- Quick Stats -->
        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 class="font-semibold text-blue-900 mb-2">This Week</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-blue-700">Variety Score:</span>
              <span class="font-medium text-blue-900">8/10</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-700">Prep Time:</span>
              <span class="font-medium text-blue-900">45 min avg</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-700">Nutrition:</span>
              <span class="font-medium text-blue-900">Balanced</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tiffin Details -->
      <div class="lg:col-span-2">
        {#if currentTiffin}
          <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">
                  {children.find((c) => c.key === selectedChild)?.name}'s Tiffin
                </h3>
                <p class="text-gray-600">{daysOfWeek.find((d) => d.key === selectedDay)?.name} - {daysOfWeek.find((d) => d.key === selectedDay)?.tamil}</p>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">Grade</div>
                <div class="font-semibold text-gray-900">{children.find((c) => c.key === selectedChild)?.grade}</div>
              </div>
            </div>

            <!-- Meal Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon icon="heroicons:square-3-stack-3d" class="w-5 h-5 mr-2 text-green-500" />
                  Today's Menu
                </h4>
                <div class="text-lg font-medium text-gray-900 mb-2">{currentTiffin.dish}</div>
                <div class="text-sm text-gray-600 mb-3">{currentTiffin.prep}</div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded border {getMoodColor(currentTiffin.mood)}">
                    Mood: {currentTiffin.mood}
                  </span>
                </div>
              </div>

              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon icon="heroicons:clipboard-document-check" class="w-5 h-5 mr-2 text-blue-500" />
                  Packing Checklist
                </h4>
                <div class="space-y-2 text-sm">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300" />
                    <span>Steel tiffin box</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300" />
                    <span>Spoon & napkin</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300" />
                    <span>Water bottle</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300" />
                    <span>Small pickle container</span>
                  </label>
                </div>
                <div class="mt-3 text-xs text-blue-600">
                  💡 {currentTiffin.prep}
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3 mt-4">
              <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Icon icon="heroicons:check" class="w-4 h-4" />
                <span>Mark as Packed</span>
              </button>
              <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Icon icon="heroicons:pencil" class="w-4 h-4" />
                <span>Customize Menu</span>
              </button>
              <button class="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Icon icon="heroicons:arrow-path" class="w-4 h-4" />
                <span>Suggest Alternative</span>
              </button>
            </div>
          </div>
        {/if}

        <!-- Weekly Overview -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Tiffin Plan</h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr class="bg-gray-50">
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Day</th>
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Thambi (6th)</th>
                  <th class="border border-gray-200 px-4 py-3 text-left font-semibold">Akka (11th + JEE)</th>
                </tr>
              </thead>
              <tbody>
                {#each weeklyPlan as day}
                  <tr class="hover:bg-gray-50">
                    <td class="border border-gray-200 px-4 py-3">
                      <div class="font-medium">{day.day}</div>
                      <div class="text-xs text-gray-500">{day.tamil}</div>
                    </td>
                    <td class="border border-gray-200 px-4 py-3">
                      <div class="font-medium text-gray-900">{day.thambi.dish}</div>
                      <div class="text-xs text-gray-600">{day.thambi.prep}</div>
                      <span class="text-xs px-2 py-1 rounded {getMoodColor(day.thambi.mood)} border mt-1 inline-block">
                        {day.thambi.mood}
                      </span>
                    </td>
                    <td class="border border-gray-200 px-4 py-3">
                      <div class="font-medium text-gray-900">{day.akka.dish}</div>
                      <div class="text-xs text-gray-600">{day.akka.prep}</div>
                      <span class="text-xs px-2 py-1 rounded {getMoodColor(day.akka.mood)} border mt-1 inline-block">
                        {day.akka.mood}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "brainfood"}
    <!-- Brain Foods -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each Object.entries(KidsData.brainFood) as [category, foods]}
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <h3 class="font-semibold text-blue-900 mb-3 capitalize flex items-center">
            <Icon icon="heroicons:light-bulb" class="w-5 h-5 mr-2" />
            {category.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <div class="space-y-2">
            {#each foods as food}
              <div class="bg-white border border-blue-100 rounded-lg p-2">
                <div class="text-sm font-medium text-gray-900">{food}</div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "mood"}
    <!-- Mood-Based Meals -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each Object.entries(KidsData.moodBasedMeals) as [mood, meal]}
        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 capitalize">{mood}</h3>
            <span class="text-xs px-2 py-1 rounded {getMoodColor(mood)} border">
              {mood}
            </span>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="font-medium text-gray-900 mb-2">{meal.meal}</div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              {#each Object.entries(meal) as [key, value]}
                {#if key !== "meal"}
                  <div class="flex justify-between">
                    <span class="text-gray-600 capitalize">{key}:</span>
                    <span class="font-medium text-gray-900">{value}</span>
                  </div>
                {/if}
              {/each}
            </div>
          </div>

          <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <Icon icon="heroicons:heart" class="w-4 h-4" />
            <span>Prepare This Meal</span>
          </button>
        </div>
      {/each}
    </div>
  {:else if activeTab === "prep"}
    <!-- Prep Assistant -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Night Before Prep -->
      <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <Icon icon="heroicons:moon" class="w-5 h-5 mr-2" />
          Night Before Checklist
        </h3>
        <div class="space-y-3">
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-indigo-300" />
            <span class="text-indigo-800">Soak dal/rice if needed</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-indigo-300" />
            <span class="text-indigo-800">Grind batter for dosa/idli</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-indigo-300" />
            <span class="text-indigo-800">Prep vegetables</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-indigo-300" />
            <span class="text-indigo-800">Clean tiffin boxes</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="rounded border-indigo-300" />
            <span class="text-indigo-800">Check water bottles</span>
          </label>
        </div>
      </div>

      <!-- Morning Routine -->
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-orange-900 mb-4 flex items-center">
          <Icon icon="heroicons:sun" class="w-5 h-5 mr-2" />
          Morning Packing Routine
        </h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3 p-2 bg-white rounded border border-orange-100">
            <Icon icon="heroicons:fire" class="w-4 h-4 text-orange-500" />
            <span class="text-orange-800">Heat food properly</span>
          </div>
          <div class="flex items-center space-x-3 p-2 bg-white rounded border border-orange-100">
            <Icon icon="heroicons:gift" class="w-4 h-4 text-orange-500" />
            <span class="text-orange-800">Pack in appropriate containers</span>
          </div>
          <div class="flex items-center space-x-3 p-2 bg-white rounded border border-orange-100">
            <Icon icon="heroicons:heart" class="w-4 h-4 text-orange-500" />
            <span class="text-orange-800">Add Amma's blessing note</span>
          </div>
          <div class="flex items-center space-x-3 p-2 bg-white rounded border border-orange-100">
            <Icon icon="heroicons:check" class="w-4 h-4 text-orange-500" />
            <span class="text-orange-800">Final checklist review</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Forgotten Items Tracker -->
    <div class="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-900 mb-4 flex items-center">
        <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 mr-2" />
        Forgotten Items This Week
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white border border-red-100 rounded-lg p-4">
          <div class="font-medium text-red-900">Thambi</div>
          <div class="text-sm text-red-700 mt-2">
            • Forgot spoon - Monday, Wednesday<br />
            • Left water bottle - Tuesday
          </div>
          <div class="text-xs text-red-600 mt-2">💡 Add spoon reminder to checklist</div>
        </div>
        <div class="bg-white border border-red-100 rounded-lg p-4">
          <div class="font-medium text-red-900">Akka</div>
          <div class="text-sm text-red-700 mt-2">
            • Forgot napkin - Monday<br />
            • Late packing - Friday (rushed)
          </div>
          <div class="text-xs text-red-600 mt-2">💡 Pack napkins night before</div>
        </div>
      </div>
    </div>
  {/if}
</div>
