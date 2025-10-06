<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { TamilFestivals, ExpenseCategories } from "../../data/financeData.js";

  let festivals = Object.values(TamilFestivals);
  let activeFestival = null;
  let showBudgetPlanner = false;
  let currentBudget = {
    festival_id: "",
    total_budget: 0,
    categories: {},
  };

  // Festival expense categories with Tamil names
  const festivalCategories = {
    SWEETS: { name: "Sweets & Snacks", tamil: "இனிப்புகள் & சிற்றுண்டி", icon: "🍬", defaultAmount: 5000 },
    CLOTHES: { name: "New Clothes", tamil: "புதிய உடைகள்", icon: "👗", defaultAmount: 8000 },
    POOJA_ITEMS: { name: "Pooja Items", tamil: "பூஜை பொருட்கள்", icon: "🪔", defaultAmount: 2000 },
    DECORATIONS: { name: "Decorations", tamil: "அலங்காரம்", icon: "🎊", defaultAmount: 3000 },
    GIFTS: { name: "Gifts & Presents", tamil: "பரிசுகள்", icon: "🎁", defaultAmount: 6000 },
    FOOD: { name: "Special Food", tamil: "சிறப்பு உணவு", icon: "🍛", defaultAmount: 4000 },
    TRAVEL: { name: "Travel & Transport", tamil: "பயணம் & போக்குவரத்து", icon: "🚗", defaultAmount: 3000 },
    MISCELLANEOUS: { name: "Miscellaneous", tamil: "பிற செலவுகள்", icon: "📋", defaultAmount: 2000 },
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getDaysUntilFestival(dateString) {
    const today = new Date();
    const festivalDate = new Date(dateString);
    const timeDiff = festivalDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }

  function getFestivalStatus(dateString) {
    const days = getDaysUntilFestival(dateString);
    if (days < 0) return { status: "past", text: "Festival passed", color: "gray" };
    if (days === 0) return { status: "today", text: "Today!", color: "green" };
    if (days <= 7) return { status: "upcoming", text: `${days} days left`, color: "red" };
    if (days <= 30) return { status: "soon", text: `${days} days left`, color: "orange" };
    return { status: "future", text: `${days} days left`, color: "blue" };
  }

  function startBudgetPlanning(festival) {
    activeFestival = festival;
    currentBudget = {
      festival_id: festival.id,
      total_budget: (festival.budget_range.min + festival.budget_range.max) / 2,
      categories: {},
    };

    // Initialize categories with default amounts
    Object.keys(festivalCategories).forEach((key) => {
      currentBudget.categories[key] = festivalCategories[key].defaultAmount;
    });

    showBudgetPlanner = true;
  }

  function calculateTotalBudget() {
    return Object.values(currentBudget.categories).reduce((sum, amount) => sum + (amount || 0), 0);
  }

  function generateShoppingList(festival) {
    const commonItems = {
      SWEETS: ["Laddu", "Murukku", "Mysore Pak", "Badusha"],
      POOJA_ITEMS: ["Flowers", "Camphor", "Agarbatti", "Oil", "Wicks"],
      DECORATIONS: ["Lights", "Rangoli colors", "Torans", "Diyas"],
      FOOD: ["Rice", "Dal", "Coconut", "Jaggery", "Ghee"],
    };

    return Object.entries(commonItems).map(([category, items]) => ({
      category: festivalCategories[category]?.name || category,
      tamil: festivalCategories[category]?.tamil || "",
      items,
    }));
  }

  function getTimelineChecklist(festival) {
    const daysUntil = getDaysUntilFestival(festival.date);

    if (daysUntil <= 0) return [];

    const timeline = [];

    if (daysUntil >= 30) {
      timeline.push({ days: 30, task: "Start budget planning", tamil: "பட்ஜெட் திட்டமிடல் தொடங்குங்கள்", status: "pending" });
    }

    if (daysUntil >= 15) {
      timeline.push({ days: 15, task: "Order new clothes", tamil: "புதிய உடைகள் ஆர்டர் செய்யுங்கள்", status: "pending" });
    }

    if (daysUntil >= 7) {
      timeline.push({ days: 7, task: "Buy non-perishable items", tamil: "கெடாத பொருட்களை வாங்குங்கள்", status: "pending" });
    }

    if (daysUntil >= 3) {
      timeline.push({ days: 3, task: "Prepare sweets & decorations", tamil: "இனிப்புகள் & அலங்காரம் தயார்", status: "pending" });
    }

    if (daysUntil >= 1) {
      timeline.push({ days: 1, task: "Buy fresh items & flowers", tamil: "புதிய பொருட்கள் & பூக்கள் வாங்குங்கள்", status: "pending" });
    }

    return timeline.filter((item) => item.days <= daysUntil);
  }

  function getFestivalAdvice(festival) {
    const advice = {
      diwali: ["💡 Buy LED lights instead of traditional bulbs for energy savings", "🍬 Make sweets at home - it's healthier and more economical", "🎁 Plan gifts in advance to avoid last-minute overspending", "🏠 Deep clean the house 2 weeks before for Lakshmi's arrival"],
      pongal: ["🌾 Buy quality rice and jaggery for the best Pongal", "🐄 Contribute to local gaushala during this auspicious time", "🍃 Use fresh sugarcane and turmeric for authentic celebration", "👨‍👩‍👧‍👦 Include entire family in preparation for bonding"],
      navaratri: ["🎎 Plan Golu theme early for unique arrangement", "👗 Coordinate with neighbors for dress themes", "🍛 Prepare prasadam varieties throughout 9 days", "🎵 Arrange for bhajan sessions in the community"],
      karthigai: ["🪔 Prepare homemade oil for traditional diyas", "⭐ Light the lamp at sunset for maximum spiritual benefit", "🙏 Visit local temples for special prayers", "🏮 Decorate entrance with beautiful kolam"],
    };

    return advice[festival.id] || ["📅 Plan budget 2-3 weeks in advance", "🛒 Make shopping list to avoid overspending", "👨‍👩‍👧‍👦 Involve all family members in preparations", "📸 Document celebrations for precious memories"];
  }

  let upcomingFestivals = [];

  onMount(() => {
    // Sort festivals by date and filter upcoming ones
    const today = new Date();
    upcomingFestivals = festivals.filter((festival) => getDaysUntilFestival(festival.date) >= 0).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
        <Icon icon="heroicons:fire" class="w-8 h-8 text-orange-600" />
        <span>Festival Planner</span>
      </h1>
      <p class="text-gray-600">திருவிழா திட்டம் • Plan budgets and preparations for Tamil festivals</p>
    </div>
    <div class="text-right">
      <div class="text-sm text-gray-600">Next Festival</div>
      {#if upcomingFestivals.length > 0}
        {@const nextFestival = upcomingFestivals[0]}
        {@const daysUntil = getDaysUntilFestival(nextFestival.date)}
        <div class="text-lg font-semibold text-orange-600">{nextFestival.name}</div>
        <div class="text-sm text-gray-600">in {daysUntil} days</div>
      {:else}
        <div class="text-sm text-gray-500">No upcoming festivals</div>
      {/if}
    </div>
  </div>

  <!-- Festival Timeline -->
  <div class="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-orange-900 mb-4">🕐 Festival Timeline 2025-2026</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each festivals.slice(0, 4) as festival}
        {@const status = getFestivalStatus(festival.date)}
        <div class="bg-white rounded-lg border border-orange-200 p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-gray-900">{festival.name}</h4>
            <span class="px-2 py-1 text-xs font-medium bg-{status.color}-100 text-{status.color}-800 rounded-full">
              {status.text}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-2">{festival.tamil}</p>
          <p class="text-xs text-gray-500">{formatDate(festival.date)}</p>
          <p class="text-xs text-orange-600 mt-1">{festival.duration} day{festival.duration > 1 ? "s" : ""}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Festival Cards -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each festivals as festival}
      {@const status = getFestivalStatus(festival.date)}
      {@const daysUntil = getDaysUntilFestival(festival.date)}
      {@const timeline = getTimelineChecklist(festival)}
      {@const advice = getFestivalAdvice(festival)}

      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <!-- Festival Header -->
        <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-xl font-bold mb-1">{festival.name}</h3>
              <p class="text-orange-100 mb-2">{festival.tamil}</p>
              <p class="text-sm text-orange-100">{formatDate(festival.date)}</p>
              <p class="text-sm text-orange-100">{festival.duration} day celebration</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">{Math.abs(daysUntil)}</div>
              <div class="text-sm text-orange-100">
                {daysUntil >= 0 ? "days to go" : "days ago"}
              </div>
            </div>
          </div>
        </div>

        <!-- Festival Content -->
        <div class="p-6">
          <!-- Budget Range -->
          <div class="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-2">💰 Typical Budget Range</h4>
            <div class="flex justify-between items-center">
              <div class="text-center">
                <div class="text-sm text-gray-600">Minimum</div>
                <div class="font-semibold text-green-600">{formatCurrency(festival.budget_range.min)}</div>
              </div>
              <div class="text-center">
                <div class="text-sm text-gray-600">Maximum</div>
                <div class="font-semibold text-red-600">{formatCurrency(festival.budget_range.max)}</div>
              </div>
              <div class="text-center">
                <div class="text-sm text-gray-600">Recommended</div>
                <div class="font-semibold text-blue-600">{formatCurrency((festival.budget_range.min + festival.budget_range.max) / 2)}</div>
              </div>
            </div>
          </div>

          <!-- Typical Expenses -->
          <div class="mb-4">
            <h4 class="font-medium text-gray-900 mb-2">🛒 Typical Expenses</h4>
            <div class="flex flex-wrap gap-2">
              {#each festival.typical_expenses as expense}
                <span class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {expense.replace("_", " ")}
                </span>
              {/each}
            </div>
          </div>

          {#if daysUntil >= 0}
            <!-- Timeline Checklist (only for upcoming festivals) -->
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">📋 Preparation Timeline</h4>
              <div class="space-y-2">
                {#each timeline as item}
                  <div class="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                    <div class="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium">
                      {item.days}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900">{item.task}</div>
                      <div class="text-xs text-gray-600">{item.tamil}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Smart Advice -->
            <div class="mb-4">
              <h4 class="font-medium text-gray-900 mb-2">💡 Smart Tips</h4>
              <div class="space-y-2">
                {#each advice.slice(0, 2) as tip}
                  <div class="text-sm text-gray-700 p-2 bg-blue-50 rounded-lg">
                    {tip}
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button class="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2" on:click={() => startBudgetPlanning(festival)} disabled={daysUntil < -30}>
              <Icon icon="heroicons:calculator" class="w-4 h-4" />
              <span>Plan Budget</span>
            </button>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" on:click={() => alert(`Shopping list for ${festival.name} coming soon!`)}>
              <Icon icon="heroicons:list-bullet" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Budget Planning Modal -->
  {#if showBudgetPlanner && activeFestival}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Budget Planner for {activeFestival.name}</h3>
              <p class="text-sm text-gray-600">{activeFestival.tamil} • {formatDate(activeFestival.date)}</p>
            </div>
            <button class="text-gray-400 hover:text-gray-600" on:click={() => (showBudgetPlanner = false)}>
              <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Budget Summary -->
          <div class="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-medium text-gray-900">Total Festival Budget</h4>
                <p class="text-sm text-gray-600">Distribute across categories below</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-orange-600">{formatCurrency(calculateTotalBudget())}</div>
                <div class="text-sm text-gray-600">
                  Range: {formatCurrency(activeFestival.budget_range.min)} - {formatCurrency(activeFestival.budget_range.max)}
                </div>
              </div>
            </div>
          </div>

          <!-- Category Budgets -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Category-wise Budget Allocation</h4>
            {#each Object.entries(festivalCategories) as [key, category]}
              <div class="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span class="text-lg">{category.icon}</span>
                </div>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{category.name}</div>
                  <div class="text-sm text-gray-600">{category.tamil}</div>
                </div>
                <div class="w-32">
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input type="number" bind:value={currentBudget.categories[key]} class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" min="0" />
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Budget Advice -->
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 class="font-medium text-blue-900 mb-2">💡 Budget Optimization Tips</h4>
            <ul class="text-sm text-blue-700 space-y-1">
              <li>• Allocate 30% for sweets and food - the heart of any festival</li>
              <li>• Keep 15% buffer for unexpected expenses and last-minute items</li>
              <li>• Compare prices across vendors 2 weeks before the festival</li>
              <li>• Consider group buying with neighbors for bulk discounts</li>
            </ul>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex space-x-3">
          <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors" on:click={() => (showBudgetPlanner = false)}> Cancel </button>
          <button
            class="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            on:click={() => {
              alert(`Budget saved for ${activeFestival.name}! Total: ${formatCurrency(calculateTotalBudget())}`);
              showBudgetPlanner = false;
            }}
          >
            Save Budget Plan
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
