<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Expense Ledger";
  const pageDescription = "Detailed transaction ledger with categorization and analysis";

  // Expense categories with icons and colors
  const expenseCategories = [
    { id: "food", name: "Food & Dining", icon: "heroicons:shopping-bag", color: "from-orange-500 to-orange-600" },
    { id: "transport", name: "Transportation", icon: "heroicons:truck", color: "from-blue-500 to-blue-600" },
    { id: "utilities", name: "Utilities", icon: "heroicons:bolt", color: "from-yellow-500 to-yellow-600" },
    { id: "healthcare", name: "Healthcare", icon: "heroicons:heart", color: "from-red-500 to-red-600" },
    { id: "education", name: "Education", icon: "heroicons:academic-cap", color: "from-purple-500 to-purple-600" },
    { id: "entertainment", name: "Entertainment", icon: "heroicons:film", color: "from-pink-500 to-pink-600" },
    { id: "shopping", name: "Shopping", icon: "heroicons:shopping-cart", color: "from-green-500 to-green-600" },
    { id: "home", name: "Home & Garden", icon: "heroicons:home", color: "from-indigo-500 to-indigo-600" },
    { id: "insurance", name: "Insurance", icon: "heroicons:shield-check", color: "from-teal-500 to-teal-600" },
    { id: "other", name: "Other", icon: "heroicons:ellipsis-horizontal", color: "from-gray-500 to-gray-600" }
  ];

  // Payment methods
  const paymentMethods = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "UPI",
    "Bank Transfer",
    "Cheque",
    "Digital Wallet"
  ];

  // Sample expense data
  let expenses: any[] = [
    {
      id: 1,
      date: "2024-01-15",
      category: "food",
      description: "Weekly grocery shopping at Big Bazaar",
      amount: 2850,
      paymentMethod: "Credit Card",
      merchant: "Big Bazaar",
      tags: ["groceries", "weekly", "vegetables"],
      emotionalTag: "necessary",
      notes: "Bought vegetables, fruits, and household items"
    },
    {
      id: 2,
      date: "2024-01-14",
      amount: 1200,
      category: "transport",
      description: "Petrol for car",
      paymentMethod: "Cash",
      merchant: "Indian Oil",
      tags: ["fuel", "car", "petrol"],
      emotionalTag: "necessary",
      notes: "Filled tank at Indian Oil pump"
    },
    {
      id: 3,
      date: "2024-01-13",
      amount: 1800,
      category: "utilities",
      description: "Electricity bill payment",
      paymentMethod: "UPI",
      merchant: "TNEB",
      tags: ["electricity", "monthly", "utilities"],
      emotionalTag: "necessary",
      notes: "Monthly electricity bill for December"
    },
    {
      id: 4,
      date: "2024-01-12",
      amount: 450,
      category: "entertainment",
      description: "Movie tickets for family",
      paymentMethod: "Credit Card",
      merchant: "PVR Cinemas",
      tags: ["movie", "family", "entertainment"],
      emotionalTag: "joy",
      notes: "Watched Hindi movie with kids"
    },
    {
      id: 5,
      date: "2024-01-11",
      amount: 3200,
      category: "healthcare",
      description: "Medical checkup for mother",
      paymentMethod: "Credit Card",
      merchant: "Apollo Hospital",
      tags: ["medical", "checkup", "mother"],
      emotionalTag: "care",
      notes: "Regular health checkup and blood tests"
    }
  ];

  // Form state
  let showAddForm = false;
  let editingExpense: any = null;

  let newExpense = {
    date: new Date().toISOString().split('T')[0],
    category: "",
    description: "",
    amount: "",
    paymentMethod: "",
    merchant: "",
    tags: "",
    emotionalTag: "neutral",
    notes: ""
  };

  // Filters
  let filterCategory = "";
  let filterPaymentMethod = "";
  let filterEmotionalTag = "";
  let dateRange = { start: "", end: "" };
  let searchQuery = "";

  // Emotional tags
  const emotionalTags = [
    { id: "joy", name: "Joy", color: "bg-yellow-100 text-yellow-800", icon: "heroicons:face-smile" },
    { id: "stress", name: "Stress", color: "bg-red-100 text-red-800", icon: "heroicons:face-frown" },
    { id: "guilt", name: "Guilt", color: "bg-purple-100 text-purple-800", icon: "heroicons:face-frown" },
    { id: "pride", name: "Pride", color: "bg-blue-100 text-blue-800", icon: "heroicons:star" },
    { id: "care", name: "Care", color: "bg-green-100 text-green-800", icon: "heroicons:heart" },
    { id: "necessary", name: "Necessary", color: "bg-gray-100 text-gray-800", icon: "heroicons:check-circle" },
    { id: "impulse", name: "Impulse", color: "bg-orange-100 text-orange-800", icon: "heroicons:bolt" },
    { id: "neutral", name: "Neutral", color: "bg-slate-100 text-slate-800", icon: "heroicons:minus-circle" }
  ];

  function addExpense() {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) return;

    const expense = {
      id: Date.now(),
      date: newExpense.date,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      paymentMethod: newExpense.paymentMethod,
      merchant: newExpense.merchant,
      tags: newExpense.tags ? newExpense.tags.split(',').map((t: string) => t.trim()) : [],
      emotionalTag: newExpense.emotionalTag,
      notes: newExpense.notes
    };

    expenses = [...expenses, expense];
    resetForm();
    showAddForm = false;
  }

  function editExpense(expense: any) {
    editingExpense = expense;
    newExpense = {
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString(),
      paymentMethod: expense.paymentMethod,
      merchant: expense.merchant || "",
      tags: expense.tags ? expense.tags.join(', ') : "",
      emotionalTag: expense.emotionalTag || "neutral",
      notes: expense.notes || ""
    };
    showAddForm = true;
  }

  function updateExpense() {
    if (!editingExpense) return;

    expenses = expenses.map(exp =>
      exp.id === editingExpense.id
        ? {
            ...exp,
            date: newExpense.date,
            category: newExpense.category,
            description: newExpense.description,
            amount: parseFloat(newExpense.amount),
            paymentMethod: newExpense.paymentMethod,
            merchant: newExpense.merchant,
            tags: newExpense.tags ? newExpense.tags.split(',').map((t: string) => t.trim()) : [],
            emotionalTag: newExpense.emotionalTag,
            notes: newExpense.notes
          }
        : exp
    );

    resetForm();
    showAddForm = false;
    editingExpense = null;
  }

  function deleteExpense(id: number) {
    expenses = expenses.filter(exp => exp.id !== id);
  }

  function resetForm() {
    newExpense = {
      date: new Date().toISOString().split('T')[0],
      category: "",
      description: "",
      amount: "",
      paymentMethod: "",
      merchant: "",
      tags: "",
      emotionalTag: "neutral",
      notes: ""
    };
  }

  function cancelEdit() {
    resetForm();
    showAddForm = false;
    editingExpense = null;
  }

  function getCategoryInfo(categoryId: string) {
    return expenseCategories.find(cat => cat.id === categoryId) || expenseCategories[expenseCategories.length - 1];
  }

  function getEmotionalTagInfo(tagId: string) {
    return emotionalTags.find(tag => tag.id === tagId) || emotionalTags[emotionalTags.length - 1];
  }

  // Filtered expenses
  $: filteredExpenses = expenses.filter(expense => {
    if (filterCategory && expense.category !== filterCategory) return false;
    if (filterPaymentMethod && expense.paymentMethod !== filterPaymentMethod) return false;
    if (filterEmotionalTag && expense.emotionalTag !== filterEmotionalTag) return false;
    if (dateRange.start && expense.date < dateRange.start) return false;
    if (dateRange.end && expense.date > dateRange.end) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return expense.description.toLowerCase().includes(query) ||
             expense.merchant?.toLowerCase().includes(query) ||
             expense.tags?.some((tag: string) => tag.toLowerCase().includes(query));
    }
    return true;
  });

  // Calculate totals
  $: totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  $: categoryTotals = expenseCategories.map(cat => ({
    ...cat,
    total: expenses.filter(exp => exp.category === cat.id).reduce((sum, exp) => sum + exp.amount, 0),
    count: expenses.filter(exp => exp.category === cat.id).length
  })).filter(cat => cat.count > 0);

  $: emotionalSpending = emotionalTags.map(tag => ({
    ...tag,
    total: expenses.filter(exp => exp.emotionalTag === tag.id).reduce((sum, exp) => sum + exp.amount, 0),
    count: expenses.filter(exp => exp.emotionalTag === tag.id).length
  })).filter(tag => tag.count > 0);
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
          <Icon icon="heroicons:document-text" class="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-red-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p class="text-2xl font-bold text-red-600">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:document-text" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
              <p class="text-2xl font-bold text-blue-600">{filteredExpenses.length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:chart-pie" class="w-6 h-6 text-purple-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Categories</p>
              <p class="text-2xl font-bold text-purple-600">{categoryTotals.length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:heart" class="w-6 h-6 text-pink-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Emotional Tags</p>
              <p class="text-2xl font-bold text-pink-600">{emotionalSpending.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="filter-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select id="filter-category" bind:value={filterCategory} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="">All Categories</option>
            {#each expenseCategories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="filter-payment-method" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
          <select id="filter-payment-method" bind:value={filterPaymentMethod} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="">All Methods</option>
            {#each paymentMethods as method}
              <option value={method}>{method}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="filter-emotional-tag" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emotional Tag</label>
          <select id="filter-emotional-tag" bind:value={filterEmotionalTag} class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
            <option value="">All Tags</option>
            {#each emotionalTags as tag}
              <option value={tag.id}>{tag.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="search-query" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
          <input
            id="search-query"
            type="text"
            bind:value={searchQuery}
            placeholder="Search transactions..."
            class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>

    <!-- Add/Edit Form -->
    {#if showAddForm}
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingExpense ? 'Edit Transaction' : 'Add New Transaction'}
        </h3>

        <form on:submit|preventDefault={editingExpense ? updateExpense : addExpense} class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="expense-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
            <input
              id="expense-date"
              type="date"
              bind:value={newExpense.date}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label for="expense-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              id="expense-category"
              bind:value={newExpense.category}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select category</option>
              {#each expenseCategories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>

          <div class="md:col-span-2">
            <label for="expense-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <input
              id="expense-description"
              type="text"
              bind:value={newExpense.description}
              placeholder="e.g., Grocery shopping at Big Bazaar"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label for="expense-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount (₹)</label>
            <input
              id="expense-amount"
              type="number"
              bind:value={newExpense.amount}
              placeholder="0.00"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label for="expense-payment-method" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
            <select
              id="expense-payment-method"
              bind:value={newExpense.paymentMethod}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select method</option>
              {#each paymentMethods as method}
                <option value={method}>{method}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="expense-merchant" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Merchant</label>
            <input
              id="expense-merchant"
              type="text"
              bind:value={newExpense.merchant}
              placeholder="e.g., Big Bazaar, Indian Oil"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label for="expense-emotional-tag" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emotional Tag</label>
            <select
              id="expense-emotional-tag"
              bind:value={newExpense.emotionalTag}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              {#each emotionalTags as tag}
                <option value={tag.id}>{tag.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="expense-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <input
              id="expense-tags"
              type="text"
              bind:value={newExpense.tags}
              placeholder="groceries, weekly, vegetables"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div class="md:col-span-2">
            <label for="expense-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              id="expense-notes"
              bind:value={newExpense.notes}
              placeholder="Additional notes about this transaction..."
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div class="md:col-span-2 flex gap-3">
            <button
              type="submit"
              class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              {editingExpense ? 'Update Transaction' : 'Add Transaction'}
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

    <!-- Action Buttons -->
    <div class="flex gap-3 mb-6">
      <button
        on:click={() => { showAddForm = !showAddForm; if (!showAddForm) cancelEdit(); }}
        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        {showAddForm ? 'Cancel' : 'Add Transaction'}
      </button>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden" use:motionInView>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Emotional</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-slate-600">
            {#each filteredExpenses as expense (expense.id)}
              <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <div class="p-1 rounded" style="background: linear-gradient({getCategoryInfo(expense.category).color})">
                      <Icon icon={getCategoryInfo(expense.category).icon} class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-900 dark:text-white">{getCategoryInfo(expense.category).name}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs">
                  <div class="font-medium">{expense.description}</div>
                  {#if expense.merchant}
                    <div class="text-gray-500 dark:text-gray-400 text-xs">{expense.merchant}</div>
                  {/if}
                  {#if expense.tags && expense.tags.length > 0}
                    <div class="flex gap-1 mt-1">
                      {#each expense.tags as tag}
                        <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          {tag}
                        </span>
                      {/each}
                    </div>
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  ₹{expense.amount.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {expense.paymentMethod}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  {#if expense.emotionalTag}
                    {@const tagInfo = getEmotionalTagInfo(expense.emotionalTag)}
                    <span class="px-2 py-1 text-xs rounded-full {tagInfo.color} flex items-center gap-1 w-fit">
                      <Icon icon={tagInfo.icon} class="w-3 h-3" />
                      {tagInfo.name}
                    </span>
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex gap-2">
                    <button
                      on:click={() => editExpense(expense)}
                      class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      title="Edit"
                    >
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button
                      on:click={() => deleteExpense(expense.id)}
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <Icon icon="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if filteredExpenses.length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:document-text" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
          <p class="text-gray-500 dark:text-gray-400">Add your first expense transaction to start tracking.</p>
        </div>
      {/if}
    </div>
  </div>
</div>