<script>
  import Icon from "@iconify/svelte";
  import { FreshProduce as FreshData } from "../../data/kitchenData.js";

  export let selectedProfile = "family";

  let activeCategory = "vegetables";
  let shoppingDay = "tuesday"; // Weekly market day

  // Get seasonal indicator
  function getSeasonalStatus(item) {
    const currentMonth = new Date().getMonth() + 1;
    if (item.season === "summer" && currentMonth >= 3 && currentMonth <= 6) return "in-season";
    if (item.season === "winter" && (currentMonth >= 11 || currentMonth <= 2)) return "in-season";
    if (item.season === "monsoon" && currentMonth >= 7 && currentMonth <= 9) return "in-season";
    if (item.season === "all") return "available";
    return "off-season";
  }

  function getSeasonalColor(status) {
    switch (status) {
      case "in-season":
        return "text-green-600 bg-green-50 border-green-200";
      case "available":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "off-season":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="text-center py-12">
    <Icon icon="heroicons:leaf" class="w-16 h-16 mx-auto text-green-400 mb-4" />
    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Fresh Produce Tracker</h2>
    <p class="text-gray-600 mb-1">புதிய காய்கறி கண்காணிப்பு</p>
    <p class="text-gray-500 mb-6">Weekly vegetables, fruits & dairy management</p>
    <div class="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
      <p class="text-sm text-green-800">
        <strong>Coming Soon!</strong> Fresh produce tracking with seasonal recommendations, weekly market planning, and dairy management for South Indian households.
      </p>
    </div>
  </div>
</div>
