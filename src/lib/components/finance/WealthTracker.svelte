<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { WealthCategories, wealthHoldings } from "../../data/financeData.js";

  let holdings = [...wealthHoldings];
  let showAddItem = false;
  let viewMode = "grid"; // 'grid' or 'list'
  let filterType = "all"; // 'all', 'gold', 'silver'
  let sortBy = "value"; // 'value', 'weight', 'date'

  let newItem = {
    type: "gold",
    category: "jewelry",
    name: "",
    tamil_name: "",
    weight: 0,
    purity: 22,
    purchase_date: "",
    purchase_rate: 0,
    purpose: "",
    location: "",
    notes: "",
  };

  // Current market rates (would be fetched from API in real app)
  let currentRates = {
    gold: 6800, // per gram
    silver: 95, // per gram
  };

  const purposes = [
    { id: "wedding_gift", name: "Wedding Gift", tamil: "திருமண பரிசு" },
    { id: "investment", name: "Investment", tamil: "முதலீடு" },
    { id: "daily_wear", name: "Daily Wear", tamil: "தினசரி உபயோகம்" },
    { id: "special_occasion", name: "Special Occasions", tamil: "சிறப்பு நிகழ்வுகள்" },
    { id: "pooja", name: "Pooja Items", tamil: "பூஜை பொருட்கள்" },
    { id: "heirloom", name: "Family Heirloom", tamil: "பாரம்பரிய செல்வம்" },
  ];

  const locations = [
    { id: "bank_locker", name: "Bank Locker", tamil: "வங்கி லாக்கர்" },
    { id: "home_safe", name: "Home Safe", tamil: "வீட்டு பாதுகாப்பு பெட்டி" },
    { id: "pooja_room", name: "Pooja Room", tamil: "பூஜை அறை" },
    { id: "wearing", name: "Currently Wearing", tamil: "தற்போது அணிந்துள்ளது" },
    { id: "jewelry_box", name: "Jewelry Box", tamil: "ஆபரண பெட்டி" },
  ];

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function calculateCurrentValue(item) {
    const currentRate = currentRates[item.type];
    return (item.weight * currentRate * item.purity) / (item.type === "gold" ? 24 : 100);
  }

  function calculateProfitLoss(item) {
    const currentValue = calculateCurrentValue(item);
    const purchaseValue = item.weight * item.purchase_rate;
    return currentValue - purchaseValue;
  }

  function getProfitLossPercentage(item) {
    const purchaseValue = item.weight * item.purchase_rate;
    const profitLoss = calculateProfitLoss(item);
    return purchaseValue > 0 ? (profitLoss / purchaseValue) * 100 : 0;
  }

  function getFilteredAndSortedHoldings() {
    let filtered = holdings;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "value":
          return calculateCurrentValue(b) - calculateCurrentValue(a);
        case "weight":
          return b.weight - a.weight;
        case "date":
          return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }

  function addNewItem() {
    const itemId = "w" + Date.now();
    const currentValue = calculateCurrentValue(newItem);

    holdings = [
      ...holdings,
      {
        ...newItem,
        id: itemId,
        current_value: currentValue,
      },
    ];

    // Reset form
    newItem = {
      type: "gold",
      category: "jewelry",
      name: "",
      tamil_name: "",
      weight: 0,
      purity: 22,
      purchase_date: "",
      purchase_rate: 0,
      purpose: "",
      location: "",
      notes: "",
    };

    showAddItem = false;
  }

  function getPurposeInfo(purposeId) {
    return purposes.find((p) => p.id === purposeId) || { name: purposeId, tamil: purposeId };
  }

  function getLocationInfo(locationId) {
    return locations.find((l) => l.id === locationId) || { name: locationId, tamil: locationId };
  }

  function getTypeIcon(type) {
    return type === "gold" ? "🏆" : "🥈";
  }

  function getTypeColor(type) {
    return type === "gold" ? "yellow" : "gray";
  }

  function generateTodayTips() {
    const tips = ["💰 Gold rates are generally lower on weekdays - consider buying then", "📈 Track gold rates for 2-3 weeks before making major purchases", "🔒 Always keep purchase receipts and purity certificates in bank locker", "⚖️ Verify weight and purity before finalizing any gold purchase", "📋 Update insurance coverage when adding new valuable items", "🪔 Silver items for pooja are exempt from making charges in many shops", "💍 Consider buying during auspicious occasions for better designs", "🏦 Bank gold coins have higher purity but lower resale value than jewelry"];

    return tips[Math.floor(Math.random() * tips.length)];
  }

  // Calculate totals
  $: totalGoldWeight = holdings.filter((h) => h.type === "gold").reduce((sum, item) => sum + item.weight, 0);
  $: totalSilverWeight = holdings.filter((h) => h.type === "silver").reduce((sum, item) => sum + item.weight, 0);
  $: totalCurrentValue = holdings.reduce((sum, item) => sum + calculateCurrentValue(item), 0);
  $: totalPurchaseValue = holdings.reduce((sum, item) => sum + item.weight * item.purchase_rate, 0);
  $: totalProfitLoss = totalCurrentValue - totalPurchaseValue;
  $: totalProfitLossPercentage = totalPurchaseValue > 0 ? (totalProfitLoss / totalPurchaseValue) * 100 : 0;

  let todayTip = "";

  onMount(() => {
    todayTip = generateTodayTips();
  });
</script>

<div class="space-y-6">
  <!-- Header with Current Rates -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
        <Icon icon="heroicons:sparkles" class="w-8 h-8 text-yellow-600" />
        <span>Gold & Silver Tracker</span>
      </h1>
      <p class="text-gray-600">தங்கம் & வெள்ளி • Track your family's precious metals wealth</p>
    </div>

    <!-- Current Market Rates -->
    <div class="text-right">
      <div class="bg-gradient-to-r from-yellow-50 to-gray-50 border border-yellow-200 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Today's Rates</h3>
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span>🏆</span>
            <span class="text-sm">Gold: <strong>₹{currentRates.gold}/g</strong></span>
          </div>
          <div class="flex items-center space-x-2">
            <span>🥈</span>
            <span class="text-sm">Silver: <strong>₹{currentRates.silver}/g</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Today's Tip -->
  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
    <div class="flex items-start space-x-3">
      <Icon icon="heroicons:light-bulb" class="w-5 h-5 text-blue-600 mt-0.5" />
      <div>
        <h3 class="font-medium text-blue-900">💡 Today's Wealth Tip</h3>
        <p class="text-blue-700 mt-1">{todayTip}</p>
      </div>
    </div>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Total Gold</p>
          <p class="text-2xl font-bold text-yellow-600">{totalGoldWeight.toFixed(2)}g</p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <span class="text-2xl">🏆</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Total Silver</p>
          <p class="text-2xl font-bold text-gray-600">{totalSilverWeight.toFixed(2)}g</p>
        </div>
        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span class="text-2xl">🥈</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Current Value</p>
          <p class="text-2xl font-bold text-blue-600">{formatCurrency(totalCurrentValue)}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-600">Total P&L</p>
          <p class="text-2xl font-bold {totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}">
            {totalProfitLoss >= 0 ? "+" : ""}{formatCurrency(totalProfitLoss)}
          </p>
          <p class="text-xs {totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}">
            {totalProfitLossPercentage >= 0 ? "+" : ""}{totalProfitLossPercentage.toFixed(1)}%
          </p>
        </div>
        <div class="w-12 h-12 bg-{totalProfitLoss >= 0 ? 'green' : 'red'}-100 rounded-lg flex items-center justify-center">
          <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-{totalProfitLoss >= 0 ? 'green' : 'red'}-600" />
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="bg-white rounded-lg shadow-sm border p-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center space-x-4">
        <!-- View Mode Toggle -->
        <div class="flex bg-gray-100 rounded-lg p-1">
          <button class="px-3 py-1 text-sm rounded-md transition-colors {viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}" on:click={() => (viewMode = "grid")}>
            <Icon icon="heroicons:squares-2x2" class="w-4 h-4" />
          </button>
          <button class="px-3 py-1 text-sm rounded-md transition-colors {viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}" on:click={() => (viewMode = "list")}>
            <Icon icon="heroicons:list-bullet" class="w-4 h-4" />
          </button>
        </div>

        <!-- Filter -->
        <select bind:value={filterType} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option value="all">All Items</option>
          <option value="gold">Gold Only</option>
          <option value="silver">Silver Only</option>
        </select>

        <!-- Sort -->
        <select bind:value={sortBy} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option value="value">Sort by Value</option>
          <option value="weight">Sort by Weight</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      <button class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2" on:click={() => (showAddItem = true)}>
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        <span>Add Item</span>
      </button>
    </div>
  </div>

  <!-- Items Display -->
  {#if viewMode === "grid"}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each getFilteredAndSortedHoldings() as item}
        {@const currentValue = calculateCurrentValue(item)}
        {@const profitLoss = calculateProfitLoss(item)}
        {@const profitLossPercentage = getProfitLossPercentage(item)}
        {@const purposeInfo = getPurposeInfo(item.purpose)}
        {@const locationInfo = getLocationInfo(item.location)}

        <div class="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
          <!-- Item Header -->
          <div class="bg-gradient-to-r from-{getTypeColor(item.type)}-50 to-{getTypeColor(item.type)}-100 p-4 border-b">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-lg">{getTypeIcon(item.type)}</span>
                  <h3 class="font-semibold text-gray-900">{item.name}</h3>
                </div>
                <p class="text-sm text-gray-600">{item.tamil_name}</p>
                <p class="text-xs text-{getTypeColor(item.type)}-600 mt-1">{item.category}</p>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-{getTypeColor(item.type)}-600">{item.weight}g</div>
                <div class="text-xs text-gray-600">{item.purity}{item.type === "gold" ? "K" : "%"}</div>
              </div>
            </div>
          </div>

          <!-- Item Details -->
          <div class="p-4 space-y-3">
            <!-- Value Information -->
            <div class="grid grid-cols-2 gap-3">
              <div class="text-center p-2 bg-gray-50 rounded-lg">
                <div class="text-sm text-gray-600">Purchase Value</div>
                <div class="font-medium">{formatCurrency(item.weight * item.purchase_rate)}</div>
                <div class="text-xs text-gray-500">{formatDate(item.purchase_date)}</div>
              </div>
              <div class="text-center p-2 bg-blue-50 rounded-lg">
                <div class="text-sm text-gray-600">Current Value</div>
                <div class="font-medium text-blue-600">{formatCurrency(currentValue)}</div>
                <div class="text-xs text-blue-600">@ ₹{currentRates[item.type]}/g</div>
              </div>
            </div>

            <!-- Profit/Loss -->
            <div class="text-center p-2 bg-{profitLoss >= 0 ? 'green' : 'red'}-50 rounded-lg">
              <div class="text-sm text-gray-600">Profit/Loss</div>
              <div class="font-medium text-{profitLoss >= 0 ? 'green' : 'red'}-600">
                {profitLoss >= 0 ? "+" : ""}{formatCurrency(profitLoss)}
              </div>
              <div class="text-xs text-{profitLoss >= 0 ? 'green' : 'red'}-600">
                {profitLoss >= 0 ? "+" : ""}{profitLossPercentage.toFixed(1)}%
              </div>
            </div>

            <!-- Purpose and Location -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Purpose:</span>
                <span class="font-medium">{purposeInfo.name}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Location:</span>
                <span class="font-medium">{locationInfo.name}</span>
              </div>
            </div>

            {#if item.notes}
              <div class="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                <strong>Notes:</strong>
                {item.notes}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- List View -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each getFilteredAndSortedHoldings() as item}
              {@const currentValue = calculateCurrentValue(item)}
              {@const profitLoss = calculateProfitLoss(item)}
              {@const profitLossPercentage = getProfitLossPercentage(item)}
              {@const locationInfo = getLocationInfo(item.location)}

              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-3">
                    <span class="text-lg">{getTypeIcon(item.type)}</span>
                    <div>
                      <div class="font-medium text-gray-900">{item.name}</div>
                      <div class="text-sm text-gray-600">{item.tamil_name}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">{item.weight}g</div>
                  <div class="text-sm text-gray-600">{item.purity}{item.type === "gold" ? "K" : "%"}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">{formatCurrency(item.weight * item.purchase_rate)}</div>
                  <div class="text-sm text-gray-600">{formatDate(item.purchase_date)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-blue-600">{formatCurrency(currentValue)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-{profitLoss >= 0 ? 'green' : 'red'}-600">
                    {profitLoss >= 0 ? "+" : ""}{formatCurrency(profitLoss)}
                  </div>
                  <div class="text-sm text-{profitLoss >= 0 ? 'green' : 'red'}-600">
                    {profitLoss >= 0 ? "+" : ""}{profitLossPercentage.toFixed(1)}%
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {locationInfo.name}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}

  <!-- Add Item Modal -->
  {#if showAddItem}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Add New Item</h3>
            <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddItem = false)}>
              <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select bind:value={newItem.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
                <option value="gold">Gold 🏆</option>
                <option value="silver">Silver 🥈</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select bind:value={newItem.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
                <option value="jewelry">Jewelry</option>
                <option value="coins">Coins</option>
                <option value="bars">Bars</option>
                <option value="ornaments">Ornaments</option>
                <option value="pooja_items">Pooja Items</option>
                <option value="vessels">Vessels</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
            <input type="text" bind:value={newItem.name} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" placeholder="e.g., Gold Chain" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tamil Name</label>
            <input type="text" bind:value={newItem.tamil_name} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" placeholder="e.g., தங்க சங்கிலி" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
              <input type="number" bind:value={newItem.weight} step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" placeholder="25.5" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Purity ({newItem.type === "gold" ? "Karat" : "Percentage"})
              </label>
              <input type="number" bind:value={newItem.purity} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" placeholder={newItem.type === "gold" ? "22" : "99"} />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
              <input type="date" bind:value={newItem.purchase_date} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Purchase Rate (₹/g)</label>
              <input type="number" bind:value={newItem.purchase_rate} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" placeholder="6500" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
            <select bind:value={newItem.purpose} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
              {#each purposes as purpose}
                <option value={purpose.id}>{purpose.name} ({purpose.tamil})</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select bind:value={newItem.location} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
              {#each locations as location}
                <option value={location.id}>{location.name} ({location.tamil})</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea bind:value={newItem.notes} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" placeholder="Any additional notes..."></textarea>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex space-x-3">
          <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors" on:click={() => (showAddItem = false)}> Cancel </button>
          <button class="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors" on:click={addNewItem} disabled={!newItem.name || !newItem.weight || !newItem.purchase_rate}> Add Item </button>
        </div>
      </div>
    </div>
  {/if}
</div>
