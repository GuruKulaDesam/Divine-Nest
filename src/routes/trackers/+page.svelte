<script>
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "../../lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  // Trackers data organized by tiers
  const tier1Trackers = [
    { id: "expense", name: "Expense Tracker", purpose: "Daily spending, budgeting, festival costs", icon: "heroicons:currency-rupee", color: "from-red-500 to-red-600", bgColor: "bg-red-50 dark:bg-red-900/20", textColor: "text-red-700 dark:text-red-300" },
    { id: "income", name: "Income Tracker", purpose: "Salary, freelance, pension, rental income", icon: "heroicons:banknotes", color: "from-green-500 to-green-600", bgColor: "bg-green-50 dark:bg-green-900/20", textColor: "text-green-700 dark:text-green-300" },
    { id: "grocery", name: "Grocery Inventory Tracker", purpose: "Rice, dal, oil, vegetables—avoid waste", icon: "heroicons:archive-box", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", textColor: "text-blue-700 dark:text-blue-300" },
    { id: "medicine", name: "Medicine Tracker", purpose: "Dosage, refill dates, elder care", icon: "heroicons:beaker", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50 dark:bg-purple-900/20", textColor: "text-purple-700 dark:text-purple-300" },
    { id: "health", name: "Health Symptom Tracker", purpose: "Fever, BP, sugar, pain logs", icon: "heroicons:heart", color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50 dark:bg-pink-900/20", textColor: "text-pink-700 dark:text-pink-300" },
    { id: "fuel", name: "Cooking Fuel Tracker", purpose: "LPG refill dates, usage pattern", icon: "heroicons:fire", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50 dark:bg-orange-900/20", textColor: "text-orange-700 dark:text-orange-300" },
    { id: "emergency", name: "Emergency Contact Tracker", purpose: "Doctor, ambulance, plumber, relatives", icon: "heroicons:phone", color: "from-cyan-500 to-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-900/20", textColor: "text-cyan-700 dark:text-cyan-300" },
    { id: "school", name: "School Fee Tracker", purpose: "Due dates, term-wise breakdown", icon: "heroicons:academic-cap", color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20", textColor: "text-indigo-700 dark:text-indigo-300" },
    { id: "debt", name: "Debt & Loan Tracker", purpose: "EMI, interest, repayment plan", icon: "heroicons:credit-card", color: "from-yellow-500 to-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-900/20", textColor: "text-yellow-700 dark:text-yellow-300" },
    { id: "savings", name: "Savings & Investment Tracker", purpose: "FD, gold, mutual funds, chit", icon: "heroicons:chart-bar", color: "from-teal-500 to-teal-600", bgColor: "bg-teal-50 dark:bg-teal-900/20", textColor: "text-teal-700 dark:text-teal-300" },
  ];

  const tier2Trackers = [
    { id: "meal", name: "Meal Planning Tracker", purpose: "Weekly menu, fasting days, leftovers", icon: "heroicons:clipboard-document-list", color: "from-emerald-500 to-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-900/20", textColor: "text-emerald-700 dark:text-emerald-300" },
    { id: "recipe", name: "Recipe Tracker", purpose: "Paati's dishes, festival sweets, quick meals", icon: "heroicons:book-open", color: "from-violet-500 to-violet-600", bgColor: "bg-violet-50 dark:bg-violet-900/20", textColor: "text-violet-700 dark:text-violet-300" },
    { id: "wishlist", name: "Wishlist Tracker", purpose: "Household needs, festival gifts, upgrades", icon: "heroicons:heart", color: "from-rose-500 to-rose-600", bgColor: "bg-rose-50 dark:bg-rose-900/20", textColor: "text-rose-700 dark:text-rose-300" },
    { id: "travel", name: "Travel & Trip Tracker", purpose: "Temple visits, family trips, packing lists", icon: "heroicons:map-pin", color: "from-amber-500 to-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", textColor: "text-amber-700 dark:text-amber-300" },
    { id: "device", name: "Device Usage Tracker", purpose: "Screen time, parental controls, app limits", icon: "heroicons:device-phone-mobile", color: "from-slate-500 to-slate-600", bgColor: "bg-slate-50 dark:bg-slate-900/20", textColor: "text-slate-700 dark:text-slate-300" },
    { id: "insurance", name: "Insurance Tracker", purpose: "Health, life, vehicle, renewal dates", icon: "heroicons:shield-check", color: "from-lime-500 to-lime-600", bgColor: "bg-lime-50 dark:bg-lime-900/20", textColor: "text-lime-700 dark:text-lime-300" },
    { id: "maintenance", name: "Home Maintenance Tracker", purpose: "Repairs, painting, pest control", icon: "heroicons:wrench-screwdriver", color: "from-stone-500 to-stone-600", bgColor: "bg-stone-50 dark:bg-stone-900/20", textColor: "text-stone-700 dark:text-stone-300" },
    { id: "vehicle", name: "Vehicle Service Tracker", purpose: "Oil change, insurance, pollution check", icon: "heroicons:truck", color: "from-neutral-500 to-neutral-600", bgColor: "bg-neutral-50 dark:bg-neutral-900/20", textColor: "text-neutral-700 dark:text-neutral-300" },
    { id: "gift", name: "Gift & Donation Tracker", purpose: "Weddings, temple, charity, family events", icon: "heroicons:gift", color: "from-fuchsia-500 to-fuchsia-600", bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20", textColor: "text-fuchsia-700 dark:text-fuchsia-300" },
    { id: "subscription", name: "Digital Subscription Tracker", purpose: "OTT, apps, renewals, cost tracking", icon: "heroicons:cloud", color: "from-sky-500 to-sky-600", bgColor: "bg-sky-50 dark:bg-sky-900/20", textColor: "text-sky-700 dark:text-sky-300" },
  ];

  function handleTrackerClick(tracker) {
    // Navigate to individual tracker page
    goto(`${base}/trackers/${tracker.id}`).catch((error) => {
      console.error("Navigation error:", error);
    });
  }
</script>

<div class="space-y-8">
  <!-- Page header -->
  <div class="relative overflow-hidden bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-8 border-2 border-violet-300/30 shadow-2xl" use:motionInView={{ animation: "fadeInDown" }}>
    <!-- Animated background decorations -->
    <div class="absolute top-0 right-0 w-24 h-24 opacity-20 animate-spin-slow">
      <Icon icon="heroicons:chart-bar" class="w-full h-full text-violet-500" />
    </div>
    <div class="absolute bottom-0 left-0 w-32 h-32 opacity-20 animate-bounce">
      <Icon icon="heroicons:clipboard-document-list" class="w-full h-full text-purple-500" />
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10 animate-pulse">
      <Icon icon="heroicons:sparkles" class="w-full h-full text-indigo-500" />
    </div>

    <!-- Rainbow gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-violet-400/5 via-purple-400/5 to-indigo-400/5 rounded-3xl"></div>

    <div class="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">Top 20 Essential Household Trackers</h1>
        <p class="mt-3 text-lg text-base-content/80 max-w-2xl font-medium">Tamil Family Life, Prioritized – Essential tracking tools for managing your household efficiently</p>
        <p class="mt-2 text-sm text-base-content/60 italic">🏠 Track everything that matters to your family's well-being and prosperity! 📊</p>
      </div>
    </div>
  </div>

  <!-- Tier 1: Daily Survival & Financial Stability -->
  <div class="space-y-6" use:motionInView={{ animation: "fadeInUp" }}>
    <div class="flex items-center space-x-4">
      <div class="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg animate-pulse"></div>
      <h2 class="text-2xl font-bold text-red-700 dark:text-red-300">🔴 Tier 1: Daily Survival & Financial Stability (Highest Urgency)</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each tier1Trackers as tracker, index}
        <div class="group relative overflow-hidden bg-gradient-to-br from-white/90 via-base-100/80 to-base-200/60 rounded-2xl p-6 shadow-lg border-2 border-base-300/60 cursor-pointer hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-500 backdrop-blur-md" role="button" tabindex="0" on:click={() => handleTrackerClick(tracker)} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTrackerClick(tracker); } }} use:motionHover>
          <!-- Animated background decorations -->
          <div class="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500 animate-spin-slow">
            <Icon icon={tracker.icon} class="w-full h-full text-primary" />
          </div>

          <!-- Dynamic color glow effect -->
          <div class="absolute inset-0 bg-gradient-to-br {tracker.color.replace('from-', 'from-').replace('to-', 'to-')}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

          <div class="relative">
            <!-- Tracker number and icon -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br {tracker.color} rounded-xl flex items-center justify-center shadow-lg">
                  <Icon icon={tracker.icon} class="w-6 h-6 text-white" />
                </div>
                <span class="text-2xl font-bold text-base-content/60">#{index + 1}</span>
              </div>
            </div>

            <!-- Tracker name -->
            <h3 class="font-bold text-lg text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
              {tracker.name}
            </h3>

            <!-- Tracker purpose -->
            <p class="text-sm text-base-content/70 group-hover:text-base-content transition-colors duration-300 leading-relaxed">
              {tracker.purpose}
            </p>

            <!-- Hover indicator -->
            <div class="mt-4 flex items-center text-xs text-base-content/50 group-hover:text-primary transition-colors duration-300">
              <Icon icon="heroicons:arrow-right" class="w-4 h-4 mr-1" />
              Click to open tracker
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Tier 2: Planning, Logistics & Daily Support -->
  <div class="space-y-6" use:motionInView={{ animation: "fadeInUp" }}>
    <div class="flex items-center space-x-4">
      <div class="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg animate-pulse"></div>
      <h2 class="text-2xl font-bold text-orange-700 dark:text-orange-300">🟠 Tier 2: Planning, Logistics & Daily Support (High Importance)</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each tier2Trackers as tracker, index}
        <div class="group relative overflow-hidden bg-gradient-to-br from-white/90 via-base-100/80 to-base-200/60 rounded-2xl p-6 shadow-lg border-2 border-base-300/60 cursor-pointer hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-500 backdrop-blur-md" role="button" tabindex="0" on:click={() => handleTrackerClick(tracker)} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTrackerClick(tracker); } }} use:motionHover>
          <!-- Animated background decorations -->
          <div class="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500 animate-spin-slow">
            <Icon icon={tracker.icon} class="w-full h-full text-primary" />
          </div>

          <!-- Dynamic color glow effect -->
          <div class="absolute inset-0 bg-gradient-to-br {tracker.color.replace('from-', 'from-').replace('to-', 'to-')}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

          <div class="relative">
            <!-- Tracker number and icon -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br {tracker.color} rounded-xl flex items-center justify-center shadow-lg">
                  <Icon icon={tracker.icon} class="w-6 h-6 text-white" />
                </div>
                <span class="text-2xl font-bold text-base-content/60">#{index + 11}</span>
              </div>
            </div>

            <!-- Tracker name -->
            <h3 class="font-bold text-lg text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
              {tracker.name}
            </h3>

            <!-- Tracker purpose -->
            <p class="text-sm text-base-content/70 group-hover:text-base-content transition-colors duration-300 leading-relaxed">
              {tracker.purpose}
            </p>

            <!-- Hover indicator -->
            <div class="mt-4 flex items-center text-xs text-base-content/50 group-hover:text-primary transition-colors duration-300">
              <Icon icon="heroicons:arrow-right" class="w-4 h-4 mr-1" />
              Click to open tracker
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Footer note -->
  <div class="text-center py-8" use:motionInView={{ animation: "fadeInUp" }}>
    <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50">
      <Icon icon="heroicons:light-bulb" class="w-12 h-12 text-violet-500 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-violet-700 dark:text-violet-300 mb-2">Start Tracking Today!</h3>
      <p class="text-base-content/70 max-w-2xl mx-auto">These 20 essential trackers will help you maintain financial stability, health, and family harmony. Click on any tracker above to start managing that aspect of your household efficiently.</p>
    </div>
  </div>
</div>
