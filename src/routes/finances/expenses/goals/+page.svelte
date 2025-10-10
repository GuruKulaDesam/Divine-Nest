<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Financial Goals";
  const pageDescription = "Set, track, and achieve your financial objectives";

  // Goal categories
  const goalCategories = [
    { id: "emergency", name: "Emergency Fund", icon: "heroicons:shield-exclamation", color: "from-red-500 to-red-600" },
    { id: "savings", name: "Savings", icon: "heroicons:banknotes", color: "from-green-500 to-green-600" },
    { id: "debt", name: "Debt Payoff", icon: "heroicons:credit-card", color: "from-orange-500 to-orange-600" },
    { id: "investment", name: "Investment", icon: "heroicons:chart-line", color: "from-blue-500 to-blue-600" },
    { id: "home", name: "Home Purchase", icon: "heroicons:home", color: "from-purple-500 to-purple-600" },
    { id: "education", name: "Education", icon: "heroicons:academic-cap", color: "from-indigo-500 to-indigo-600" },
    { id: "vacation", name: "Vacation", icon: "heroicons:map", color: "from-pink-500 to-pink-600" },
    { id: "retirement", name: "Retirement", icon: "heroicons:clock", color: "from-teal-500 to-teal-600" },
    { id: "business", name: "Business", icon: "heroicons:building-storefront", color: "from-yellow-500 to-yellow-600" },
    { id: "other", name: "Other", icon: "heroicons:star", color: "from-gray-500 to-gray-600" }
  ];

  // Goal priorities
  const priorities = [
    { id: "high", name: "High", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { id: "low", name: "Low", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
  ];

  // Sample goals data
  let goals: any[] = [
    {
      id: 1,
      name: "Emergency Fund",
      category: "emergency",
      description: "Build a 6-month emergency fund for unexpected expenses",
      targetAmount: 270000, // 6 months * 45k income
      currentAmount: 85000,
      monthlyContribution: 8000,
      targetDate: "2024-12-31",
      priority: "high",
      status: "in_progress",
      milestones: [
        { id: 1, name: "Initial deposit", amount: 25000, completed: true, date: "2024-01-15" },
        { id: 2, name: "3-month fund", amount: 135000, completed: false },
        { id: 3, name: "6-month fund", amount: 270000, completed: false }
      ],
      notes: "Currently have 3 months of expenses covered. Need to accelerate contributions."
    },
    {
      id: 2,
      name: "Children's Education Fund",
      category: "education",
      description: "Save for children's higher education expenses",
      targetAmount: 500000,
      currentAmount: 125000,
      monthlyContribution: 12000,
      targetDate: "2030-12-31",
      priority: "high",
      status: "in_progress",
      milestones: [
        { id: 1, name: "Year 1 complete", amount: 144000, completed: true, date: "2024-01-01" },
        { id: 2, name: "Year 2 complete", amount: 288000, completed: false },
        { id: 3, name: "Year 3 complete", amount: 432000, completed: false }
      ],
      notes: "Planning for engineering education. Considering PPF and mutual funds."
    },
    {
      id: 3,
      name: "Home Down Payment",
      category: "home",
      description: "Save for 20% down payment on new home",
      targetAmount: 600000,
      currentAmount: 180000,
      monthlyContribution: 15000,
      targetDate: "2025-06-30",
      priority: "medium",
      status: "in_progress",
      milestones: [
        { id: 1, name: "20% saved", amount: 120000, completed: true, date: "2023-12-01" },
        { id: 2, name: "50% saved", amount: 300000, completed: false },
        { id: 3, name: "80% saved", amount: 480000, completed: false }
      ],
      notes: "Targeting homes in the 30-40 lakh range. Need to research loan options."
    },
    {
      id: 4,
      name: "Family Vacation to Kerala",
      category: "vacation",
      description: "Dream vacation to explore backwaters and culture",
      targetAmount: 75000,
      currentAmount: 25000,
      monthlyContribution: 3000,
      targetDate: "2024-08-31",
      priority: "low",
      status: "in_progress",
      milestones: [
        { id: 1, name: "Flight tickets", amount: 30000, completed: false },
        { id: 2, name: "Hotel booking", amount: 25000, completed: false },
        { id: 3, name: "Activities & food", amount: 20000, completed: false }
      ],
      notes: "Planning for monsoon season. Include houseboat stay and cultural experiences."
    },
    {
      id: 5,
      name: "Credit Card Debt Payoff",
      category: "debt",
      description: "Clear remaining credit card balance",
      targetAmount: 45000,
      currentAmount: 45000,
      monthlyContribution: 5000,
      targetDate: "2024-04-30",
      priority: "high",
      status: "completed",
      milestones: [
        { id: 1, name: "Pay off balance", amount: 45000, completed: true, date: "2024-01-20" }
      ],
      notes: "Successfully paid off credit card debt. Now maintaining zero balance."
    }
  ];

  // Form state
  let showAddForm = false;
  let editingGoal: any = null;

  let newGoal = {
    name: "",
    category: "",
    description: "",
    targetAmount: "",
    currentAmount: "",
    monthlyContribution: "",
    targetDate: "",
    priority: "medium",
    notes: ""
  };

  // Filters
  let filterCategory = "";
  let filterPriority = "";
  let filterStatus = "";
  let sortBy = "priority"; // priority, progress, deadline

  // Goal statistics
  $: totalGoals = goals.length;
  $: completedGoals = goals.filter(g => g.status === "completed").length;
  $: inProgressGoals = goals.filter(g => g.status === "in_progress").length;
  $: totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  $: totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  $: overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  // Monthly contribution totals
  $: totalMonthlyContributions = goals
    .filter(g => g.status === "in_progress")
    .reduce((sum, g) => sum + g.monthlyContribution, 0);

  function addGoal() {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.category) return;

    const goal = {
      id: Date.now(),
      name: newGoal.name,
      category: newGoal.category,
      description: newGoal.description,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0,
      targetDate: newGoal.targetDate,
      priority: newGoal.priority,
      status: "in_progress",
      milestones: [],
      notes: newGoal.notes
    };

    goals = [...goals, goal];
    resetForm();
    showAddForm = false;
  }

  function editGoal(goal: any) {
    editingGoal = goal;
    newGoal = {
      name: goal.name,
      category: goal.category,
      description: goal.description,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      monthlyContribution: goal.monthlyContribution.toString(),
      targetDate: goal.targetDate || "",
      priority: goal.priority,
      notes: goal.notes || ""
    };
    showAddForm = true;
  }

  function updateGoal() {
    if (!editingGoal) return;

    goals = goals.map(g =>
      g.id === editingGoal.id
        ? {
            ...g,
            name: newGoal.name,
            category: newGoal.category,
            description: newGoal.description,
            targetAmount: parseFloat(newGoal.targetAmount),
            currentAmount: parseFloat(newGoal.currentAmount),
            monthlyContribution: parseFloat(newGoal.monthlyContribution),
            targetDate: newGoal.targetDate,
            priority: newGoal.priority,
            notes: newGoal.notes
          }
        : g
    );

    resetForm();
    showAddForm = false;
    editingGoal = null;
  }

  function deleteGoal(id: number) {
    goals = goals.filter(g => g.id !== id);
  }

  function updateGoalProgress(id: number, newAmount: number) {
    goals = goals.map(g =>
      g.id === id
        ? { ...g, currentAmount: Math.max(0, newAmount) }
        : g
    );
  }

  function markGoalCompleted(id: number) {
    goals = goals.map(g =>
      g.id === id
        ? { ...g, status: "completed" }
        : g
    );
  }

  function resetForm() {
    newGoal = {
      name: "",
      category: "",
      description: "",
      targetAmount: "",
      currentAmount: "",
      monthlyContribution: "",
      targetDate: "",
      priority: "medium",
      notes: ""
    };
  }

  function cancelEdit() {
    resetForm();
    showAddForm = false;
    editingGoal = null;
  }

  function getCategoryInfo(categoryId: string) {
    return goalCategories.find(cat => cat.id === categoryId) || goalCategories[goalCategories.length - 1];
  }

  function getPriorityInfo(priorityId: string) {
    return priorities.find(p => p.id === priorityId) || priorities[1];
  }

  function calculateMonthsRemaining(targetDate: string, currentAmount: number, monthlyContribution: number, targetAmount: number) {
    if (!targetDate || monthlyContribution <= 0) return null;

    const target = new Date(targetDate);
    const now = new Date();
    const monthsToDeadline = Math.max(0, (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));

    const remaining = targetAmount - currentAmount;
    const monthsNeeded = remaining / monthlyContribution;

    return { monthsToDeadline, monthsNeeded };
  }

  // Filtered and sorted goals
  $: filteredGoals = goals.filter(goal => {
    if (filterCategory && goal.category !== filterCategory) return false;
    if (filterPriority && goal.priority !== filterPriority) return false;
    if (filterStatus && goal.status !== filterStatus) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "progress":
        return (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount);
      case "deadline":
        if (!a.targetDate && !b.targetDate) return 0;
        if (!a.targetDate) return 1;
        if (!b.targetDate) return -1;
        return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
      default:
        return 0;
    }
  });
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
          <Icon icon="heroicons:trophy" class="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:document-text" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Goals</p>
              <p class="text-2xl font-bold text-blue-600">{totalGoals}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p class="text-2xl font-bold text-green-600">{completedGoals}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:clock" class="w-6 h-6 text-orange-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p class="text-2xl font-bold text-orange-600">{inProgressGoals}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-purple-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Saved</p>
              <p class="text-2xl font-bold text-purple-600">₹{totalCurrentAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:chart-pie" class="w-6 h-6 text-indigo-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
              <p class="text-2xl font-bold text-indigo-600">{overallProgress.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Sort -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
      <div class="flex flex-wrap gap-4 items-end">
        <div>
          <label for="filter-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select id="filter-category" bind:value={filterCategory} class="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="">All Categories</option>
            {#each goalCategories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="filter-priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
          <select id="filter-priority" bind:value={filterPriority} class="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="">All Priorities</option>
            {#each priorities as priority}
              <option value={priority.id}>{priority.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="filter-status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <select id="filter-status" bind:value={filterStatus} class="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="">All Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label for="sort-by" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
          <select id="sort-by" bind:value={sortBy} class="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="priority">Priority</option>
            <option value="progress">Progress</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>

        <button
          on:click={() => { showAddForm = !showAddForm; if (!showAddForm) cancelEdit(); }}
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          {showAddForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>
    </div>

    <!-- Add/Edit Form -->
    {#if showAddForm}
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingGoal ? 'Edit Goal' : 'Add New Goal'}
        </h3>

        <form on:submit|preventDefault={editingGoal ? updateGoal : addGoal} class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label for="goal-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal Name</label>
            <input
              id="goal-name"
              type="text"
              bind:value={newGoal.name}
              placeholder="e.g., Emergency Fund, Home Down Payment"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label for="goal-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              id="goal-category"
              bind:value={newGoal.category}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select category</option>
              {#each goalCategories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="goal-priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select
              id="goal-priority"
              bind:value={newGoal.priority}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              {#each priorities as priority}
                <option value={priority.id}>{priority.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="goal-target-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Amount (₹)</label>
            <input
              id="goal-target-amount"
              type="number"
              bind:value={newGoal.targetAmount}
              placeholder="0.00"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label for="goal-current-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Amount (₹)</label>
            <input
              id="goal-current-amount"
              type="number"
              bind:value={newGoal.currentAmount}
              placeholder="0.00"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label for="goal-monthly-contribution" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Contribution (₹)</label>
            <input
              id="goal-monthly-contribution"
              type="number"
              bind:value={newGoal.monthlyContribution}
              placeholder="0.00"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label for="goal-target-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Date</label>
            <input
              id="goal-target-date"
              type="date"
              bind:value={newGoal.targetDate}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div class="md:col-span-2">
            <label for="goal-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              id="goal-description"
              bind:value={newGoal.description}
              placeholder="Describe your goal and why it's important..."
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div class="md:col-span-2">
            <label for="goal-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              id="goal-notes"
              bind:value={newGoal.notes}
              placeholder="Additional notes, strategies, or reminders..."
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div class="md:col-span-2 flex gap-3">
            <button
              type="submit"
              class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              {editingGoal ? 'Update Goal' : 'Add Goal'}
            </button>
            <button
              type="button"
              on:click={cancelEdit}
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    {/if}

    <!-- Goals List -->
    <div class="space-y-6">
      {#each filteredGoals as goal (goal.id)}
        {@const progress = (goal.currentAmount / goal.targetAmount) * 100}
        {@const timeCalc = calculateMonthsRemaining(goal.targetDate, goal.currentAmount, goal.monthlyContribution, goal.targetAmount)}
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start gap-4">
              <div class="p-3 rounded-xl" style="background: linear-gradient({getCategoryInfo(goal.category).color})">
                <Icon icon={getCategoryInfo(goal.category).icon} class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
                  <span class={`px-2 py-1 text-xs rounded-full ${getPriorityInfo(goal.priority).color}`}>
                    {getPriorityInfo(goal.priority).name}
                  </span>
                  <span class={`px-2 py-1 text-xs rounded-full ${
                    goal.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-3">{goal.description}</p>

                <!-- Progress Bar -->
                <div class="mb-3">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">Progress</span>
                    <span class="font-medium text-gray-900 dark:text-white">{progress.toFixed(1)}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3">
                    <div
                      class="h-3 rounded-full transition-all duration-300"
                      style="width: {Math.min(progress, 100)}%; background: linear-gradient({getCategoryInfo(goal.category).color})"
                    ></div>
                  </div>
                  <div class="flex justify-between text-sm mt-1">
                    <span class="text-gray-600 dark:text-gray-400">₹{goal.currentAmount.toLocaleString()}</span>
                    <span class="text-gray-600 dark:text-gray-400">₹{goal.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                <!-- Goal Details -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div class="text-gray-600 dark:text-gray-400">Monthly Contribution</div>
                    <div class="font-medium text-gray-900 dark:text-white">₹{goal.monthlyContribution.toLocaleString()}</div>
                  </div>
                  {#if goal.targetDate}
                    <div>
                      <div class="text-gray-600 dark:text-gray-400">Target Date</div>
                      <div class="font-medium text-gray-900 dark:text-white">
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </div>
                    </div>
                  {/if}
                  {#if timeCalc}
                    <div>
                      <div class="text-gray-600 dark:text-gray-400">Months to Target</div>
                      <div class="font-medium text-gray-900 dark:text-white">
                        {Math.ceil(timeCalc.monthsNeeded)}
                      </div>
                    </div>
                  {/if}
                  <div>
                    <div class="text-gray-600 dark:text-gray-400">Remaining</div>
                    <div class="font-medium text-gray-900 dark:text-white">
                      ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button
                on:click={() => editGoal(goal)}
                class="p-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Edit"
              >
                <Icon icon="heroicons:pencil" class="w-5 h-5" />
              </button>
              {#if goal.status === 'in_progress'}
                <button
                  on:click={() => markGoalCompleted(goal.id)}
                  class="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                  title="Mark Completed"
                >
                  <Icon icon="heroicons:check-circle" class="w-5 h-5" />
                </button>
              {/if}
              <button
                on:click={() => deleteGoal(goal.id)}
                class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                title="Delete"
              >
                <Icon icon="heroicons:trash" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Notes -->
          {#if goal.notes}
            <div class="mt-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="flex items-start gap-2">
                <Icon icon="heroicons:document-text" class="w-4 h-4 text-gray-500 mt-0.5" />
                <p class="text-sm text-gray-700 dark:text-gray-300">{goal.notes}</p>
              </div>
            </div>
          {/if}

          <!-- Milestones -->
          {#if goal.milestones && goal.milestones.length > 0}
            <div class="mt-4">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Milestones</h4>
              <div class="space-y-2">
                {#each goal.milestones as milestone}
                  <div class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-700 rounded">
                    <div class={`w-4 h-4 rounded-full border-2 ${
                      milestone.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 dark:border-slate-500'
                    }`}>
                      {#if milestone.completed}
                        <Icon icon="heroicons:check" class="w-3 h-3 text-white" />
                      {/if}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{milestone.name}</div>
                      <div class="text-xs text-gray-600 dark:text-gray-400">₹{milestone.amount.toLocaleString()}</div>
                    </div>
                    {#if milestone.completed && milestone.date}
                      <div class="text-xs text-green-600 dark:text-green-400">
                        {new Date(milestone.date).toLocaleDateString()}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if filteredGoals.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:trophy" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No goals found</h3>
        <p class="text-gray-500 dark:text-gray-400">Create your first financial goal to start tracking your progress.</p>
      </div>
    {/if}
  </div>
</div>