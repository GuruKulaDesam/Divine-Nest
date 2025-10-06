<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { savingsGoals, FamilyRoles } from "../../data/financeData.js";

  let goals = [...savingsGoals];
  let showAddGoal = false;
  let newGoal = {
    title: "",
    tamil_title: "",
    target_amount: 0,
    current_amount: 0,
    target_date: "",
    category: "education",
    priority: "medium",
    contributors: [],
    monthly_target: 0,
  };

  const goalCategories = [
    { id: "education", name: "Education", tamil: "கல்வி", icon: "heroicons:academic-cap", color: "blue" },
    { id: "emergency", name: "Emergency Fund", tamil: "அவசர நிதி", icon: "heroicons:shield-check", color: "red" },
    { id: "travel", name: "Travel", tamil: "பயணம்", icon: "heroicons:globe-asia-australia", color: "green" },
    { id: "wedding", name: "Wedding", tamil: "திருமணம்", icon: "heroicons:heart", color: "pink" },
    { id: "property", name: "Property", tamil: "சொத்து", icon: "heroicons:home", color: "purple" },
    { id: "retirement", name: "Retirement", tamil: "ஓய்வுகாலம்", icon: "heroicons:calendar", color: "orange" },
    { id: "health", name: "Health", tamil: "சுகாதாரம்", icon: "heroicons:heart", color: "red" },
    { id: "festival", name: "Festivals", tamil: "திருவிழாக்கள்", icon: "heroicons:fire", color: "yellow" },
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

  function calculateMonthsRemaining(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);
    const monthsDiff = (target.getFullYear() - today.getFullYear()) * 12 + target.getMonth() - today.getMonth();
    return Math.max(0, monthsDiff);
  }

  function calculateRequiredMonthly(goal) {
    const monthsRemaining = calculateMonthsRemaining(goal.target_date);
    const remainingAmount = goal.target_amount - goal.current_amount;
    return monthsRemaining > 0 ? remainingAmount / monthsRemaining : remainingAmount;
  }

  function addContribution(goalId, amount) {
    goals = goals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          current_amount: goal.current_amount + amount,
        };
      }
      return goal;
    });
  }

  function createNewGoal() {
    const goalId = "sg" + Date.now();
    const monthsRemaining = calculateMonthsRemaining(newGoal.target_date);
    const monthlyTarget = monthsRemaining > 0 ? newGoal.target_amount / monthsRemaining : 0;

    goals = [
      ...goals,
      {
        ...newGoal,
        id: goalId,
        monthly_target: monthlyTarget,
      },
    ];

    // Reset form
    newGoal = {
      title: "",
      tamil_title: "",
      target_amount: 0,
      current_amount: 0,
      target_date: "",
      category: "education",
      priority: "medium",
      contributors: [],
      monthly_target: 0,
    };

    showAddGoal = false;
  }

  function getCategoryInfo(categoryId) {
    return goalCategories.find((cat) => cat.id === categoryId) || goalCategories[0];
  }

  function getPriorityColor(priority) {
    const colors = {
      high: "red",
      medium: "yellow",
      low: "green",
    };
    return colors[priority] || "gray";
  }

  function generateSavingsSuggestion(goal) {
    const monthlyRequired = calculateRequiredMonthly(goal);
    const monthsRemaining = calculateMonthsRemaining(goal.target_date);

    if (monthsRemaining <= 0) {
      return "🚨 Target date has passed! Consider extending the timeline.";
    }

    if (monthlyRequired > goal.monthly_target * 1.5) {
      return "⚠️ Consider increasing monthly contributions or extending the target date.";
    }

    if (monthlyRequired < goal.monthly_target * 0.8) {
      return "✅ You're on track! Consider allocating extra to other goals.";
    }

    return "👍 Maintain current contribution rate to meet your goal.";
  }

  // AI-like suggestions for savings optimization
  function getAISuggestions() {
    const suggestions = ["💡 Start a chit fund with neighbors for disciplined saving", "🏆 Consider gold savings scheme during auspicious months", "📱 Set up auto-debit for consistent monthly contributions", "🎯 Break large goals into smaller monthly milestones", "🪔 Save festival money throughout the year for better planning", "👨‍👩‍👧‍👦 Involve family members in contribution tracking", "📊 Review and adjust goals during Tamil New Year", "💰 Use windfall income (bonus, gifts) for goal acceleration"];

    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  let currentSuggestion = "";

  onMount(() => {
    currentSuggestion = getAISuggestions();
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 flex items-center space-x-2">
        <Icon icon="heroicons:banknotes" class="w-8 h-8 text-teal-600" />
        <span>Savings Goals</span>
      </h1>
      <p class="text-gray-600">சேமிப்பு இலக்குகள் • Track and achieve your family's financial dreams</p>
    </div>
    <button class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2" on:click={() => (showAddGoal = true)}>
      <Icon icon="heroicons:plus" class="w-4 h-4" />
      <span>Add Goal</span>
    </button>
  </div>

  <!-- AI Suggestion Banner -->
  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
    <div class="flex items-start space-x-3">
      <Icon icon="heroicons:light-bulb" class="w-5 h-5 text-blue-600 mt-0.5" />
      <div>
        <h3 class="font-medium text-blue-900">💡 Smart Savings Tip</h3>
        <p class="text-blue-700 mt-1">{currentSuggestion}</p>
      </div>
    </div>
  </div>

  <!-- Goals Overview Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#if goals.length > 0}
      {@const totalTarget = goals.reduce((sum, goal) => sum + goal.target_amount, 0)}
      {@const totalSaved = goals.reduce((sum, goal) => sum + goal.current_amount, 0)}
      {@const totalProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0}

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Target</p>
            <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalTarget)}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon icon="heroicons:flag" class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Amount Saved</p>
            <p class="text-2xl font-bold text-green-600">{formatCurrency(totalSaved)}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Overall Progress</p>
            <p class="text-2xl font-bold text-purple-600">{Math.round(totalProgress)}%</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon icon="heroicons:chart-pie" class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    {/if}
  </div>
  <!-- Goals List -->
  <div class="space-y-4">
    {#each goals as goal}
      {@const progress = (goal.current_amount / goal.target_amount) * 100}
      {@const categoryInfo = getCategoryInfo(goal.category)}
      {@const monthlyRequired = calculateRequiredMonthly(goal)}
      {@const monthsRemaining = calculateMonthsRemaining(goal.target_date)}
      {@const suggestion = generateSavingsSuggestion(goal)}

      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <!-- Goal Header -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-10 h-10 bg-{categoryInfo.color}-100 rounded-lg flex items-center justify-center">
                  <Icon icon={categoryInfo.icon} class="w-5 h-5 text-{categoryInfo.color}-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p class="text-sm text-gray-600">{goal.tamil_title}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium bg-{getPriorityColor(goal.priority)}-100 text-{getPriorityColor(goal.priority)}-800 rounded-full">
                  {goal.priority.toUpperCase()}
                </span>
              </div>

              <!-- Progress Bar -->
              <div class="mb-3">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-{categoryInfo.color}-500 h-3 rounded-full transition-all duration-300" style="width: {Math.min(100, progress)}%"></div>
                </div>
                <div class="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{formatCurrency(goal.current_amount)}</span>
                  <span>{formatCurrency(goal.target_amount)}</span>
                </div>
              </div>
            </div>

            <!-- Goal Stats -->
            <div class="text-right ml-6">
              <div class="text-2xl font-bold text-{categoryInfo.color}-600">{formatCurrency(goal.target_amount - goal.current_amount)}</div>
              <div class="text-sm text-gray-600">Remaining</div>
              <div class="text-sm text-gray-500 mt-1">Target: {formatDate(goal.target_date)}</div>
              <div class="text-sm text-gray-500">{monthsRemaining} months left</div>
            </div>
          </div>
        </div>

        <!-- Goal Details -->
        <div class="p-6 bg-gray-50">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Monthly Target -->
            <div class="text-center p-3 bg-white rounded-lg border">
              <div class="text-lg font-semibold text-gray-900">{formatCurrency(monthlyRequired)}</div>
              <div class="text-sm text-gray-600">Required Monthly</div>
              <div class="text-xs text-gray-500 mt-1">
                {monthlyRequired > goal.monthly_target ? "↗️ Increase needed" : "✅ On track"}
              </div>
            </div>

            <!-- Quick Add Contribution -->
            <div class="text-center p-3 bg-white rounded-lg border">
              <div class="text-sm text-gray-600 mb-2">Quick Add</div>
              <div class="flex space-x-1">
                <button class="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200" on:click={() => addContribution(goal.id, 1000)}> +₹1K </button>
                <button class="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200" on:click={() => addContribution(goal.id, 5000)}> +₹5K </button>
                <button class="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200" on:click={() => addContribution(goal.id, 10000)}> +₹10K </button>
              </div>
            </div>

            <!-- Contributors -->
            <div class="text-center p-3 bg-white rounded-lg border">
              <div class="text-sm text-gray-600 mb-2">Contributors</div>
              <div class="flex flex-wrap gap-1 justify-center">
                {#each goal.contributors as contributor}
                  {@const role = Object.values(FamilyRoles).find((r) => r.id === contributor)}
                  {#if role}
                    <span class="text-xs bg-{role.color}-100 text-{role.color}-700 px-2 py-1 rounded">
                      {role.name}
                    </span>
                  {/if}
                {/each}
              </div>
            </div>
          </div>

          <!-- AI Suggestion for this goal -->
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="text-sm text-blue-800">
              <strong>💡 Suggestion:</strong>
              {suggestion}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Add Goal Modal -->
  {#if showAddGoal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Add New Savings Goal</h3>
            <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddGoal = false)}>
              <Icon icon="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
            <input type="text" bind:value={newGoal.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Akka College Fees" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tamil Title</label>
            <input type="text" bind:value={newGoal.tamil_title} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., அக்கா கல்லூரி கட்டணம்" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
            <input type="number" bind:value={newGoal.target_amount} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="500000" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Current Amount (₹)</label>
            <input type="number" bind:value={newGoal.current_amount} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="0" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
            <input type="date" bind:value={newGoal.target_date} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select bind:value={newGoal.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              {#each goalCategories as category}
                <option value={category.id}>{category.name} ({category.tamil})</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select bind:value={newGoal.priority} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="high">High - உயர்</option>
              <option value="medium">Medium - நடுத்தர</option>
              <option value="low">Low - குறைவு</option>
            </select>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex space-x-3">
          <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors" on:click={() => (showAddGoal = false)}> Cancel </button>
          <button class="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors" on:click={createNewGoal} disabled={!newGoal.title || !newGoal.target_amount}> Create Goal </button>
        </div>
      </div>
    </div>
  {/if}
</div>
