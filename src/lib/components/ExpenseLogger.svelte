<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { theme } from "../stores/theme.js";
  import { familyMembers, expenseCategories, ExpenseCategories } from "../data/family.js";

  export let onExpenseAdded = null;

  let showForm = false;
  let expenses = [];
  let currentExpense = {
    id: null,
    amount: "",
    description: "",
    category: "",
    subcategory: "",
    memberPaidId: "",
    memberBeneficiaryId: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
    tags: [],
    receipt: null,
    notes: "",
  };

  let searchTerm = "";
  let filterCategory = "all";
  let filterMember = "all";
  let filterDateRange = "this_month";
  let newTag = "";

  // Sample expenses data
  onMount(() => {
    expenses = [
      {
        id: 1,
        amount: 2500,
        description: "Groceries from Saravana Stores",
        category: ExpenseCategories.FOOD,
        subcategory: "Groceries",
        memberPaidId: 2, // Amma
        memberBeneficiaryId: null, // Whole family
        date: "2025-10-05",
        paymentMethod: "upi",
        tags: ["groceries", "monthly"],
        receipt: null,
        notes: "Monthly grocery shopping",
      },
      {
        id: 2,
        amount: 500,
        description: "Temple donation - Vinayagar Chaturthi",
        category: ExpenseCategories.SPIRITUAL,
        subcategory: "Temple donation",
        memberPaidId: 3, // Paati
        memberBeneficiaryId: null,
        date: "2025-10-04",
        paymentMethod: "cash",
        tags: ["temple", "festival", "donation"],
        receipt: null,
        notes: "Special festival donation",
      },
      {
        id: 3,
        amount: 1200,
        description: "College textbooks",
        category: ExpenseCategories.EDUCATION,
        subcategory: "Books",
        memberPaidId: 1, // Appa
        memberBeneficiaryId: 5, // Akka
        date: "2025-10-03",
        paymentMethod: "card",
        tags: ["education", "books", "college"],
        receipt: null,
        notes: "Engineering semester books",
      },
    ];
  });

  // Get category details
  function getCategoryDetails(categoryId) {
    return expenseCategories.find((cat) => cat.id === categoryId) || { name: "Other", icon: "❓", color: "text-gray-600" };
  }

  // Get member name by ID
  function getMemberName(memberId) {
    if (!memberId) return "Family";
    const member = familyMembers.find((m) => m.id === memberId);
    return member ? member.name : "Unknown";
  }

  // Filtered expenses
  $: filteredExpenses = expenses.filter((expense) => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      if (!expense.description.toLowerCase().includes(search) && !expense.tags.some((tag) => tag.toLowerCase().includes(search)) && !getMemberName(expense.memberPaidId).toLowerCase().includes(search)) {
        return false;
      }
    }

    // Category filter
    if (filterCategory !== "all" && expense.category !== filterCategory) {
      return false;
    }

    // Member filter
    if (filterMember !== "all" && expense.memberPaidId.toString() !== filterMember) {
      return false;
    }

    // Date range filter
    const expenseDate = new Date(expense.date);
    const now = new Date();
    switch (filterDateRange) {
      case "today":
        return expenseDate.toDateString() === now.toDateString();
      case "this_week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expenseDate >= weekAgo;
      case "this_month":
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      case "this_year":
        return expenseDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

  // Calculate totals
  $: totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  $: categoryTotals = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function resetForm() {
    currentExpense = {
      id: null,
      amount: "",
      description: "",
      category: "",
      subcategory: "",
      memberPaidId: "",
      memberBeneficiaryId: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "cash",
      tags: [],
      receipt: null,
      notes: "",
    };
    newTag = "";
  }

  function addTag() {
    if (newTag.trim() && !currentExpense.tags.includes(newTag.trim())) {
      currentExpense.tags = [...currentExpense.tags, newTag.trim()];
      newTag = "";
    }
  }

  function removeTag(tag) {
    currentExpense.tags = currentExpense.tags.filter((t) => t !== tag);
  }

  function saveExpense() {
    if (!currentExpense.amount || !currentExpense.description || !currentExpense.category || !currentExpense.memberPaidId) {
      alert("Please fill in all required fields");
      return;
    }

    const expense = {
      ...currentExpense,
      id: currentExpense.id || Date.now(),
      amount: parseFloat(currentExpense.amount),
      memberPaidId: parseInt(currentExpense.memberPaidId),
      memberBeneficiaryId: currentExpense.memberBeneficiaryId ? parseInt(currentExpense.memberBeneficiaryId) : null,
    };

    if (currentExpense.id) {
      // Update existing expense
      expenses = expenses.map((exp) => (exp.id === currentExpense.id ? expense : exp));
    } else {
      // Add new expense
      expenses = [expense, ...expenses];
    }

    if (onExpenseAdded) {
      onExpenseAdded(expense);
    }

    resetForm();
    showForm = false;
  }

  function editExpense(expense) {
    currentExpense = {
      ...expense,
      amount: expense.amount.toString(),
      memberPaidId: expense.memberPaidId.toString(),
      memberBeneficiaryId: expense.memberBeneficiaryId ? expense.memberBeneficiaryId.toString() : "",
    };
    showForm = true;
  }

  function deleteExpense(expenseId) {
    if (confirm("Are you sure you want to delete this expense?")) {
      expenses = expenses.filter((exp) => exp.id !== expenseId);
    }
  }

  function exportExpenses() {
    const csv = [["Date", "Description", "Category", "Amount", "Paid By", "Beneficiary", "Payment Method", "Tags", "Notes"], ...filteredExpenses.map((exp) => [exp.date, exp.description, getCategoryDetails(exp.category).name, exp.amount, getMemberName(exp.memberPaidId), getMemberName(exp.memberBeneficiaryId), exp.paymentMethod, exp.tags.join("; "), exp.notes])].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Expense Tracker</h1>
      <p class="text-gray-600">Track and manage family expenses</p>
    </div>
    <div class="flex space-x-3">
      <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2" on:click={() => (showForm = true)}>
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        <span>Add Expense</span>
      </button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2" on:click={exportExpenses}>
        <Icon icon="heroicons:arrow-down-tray" class="w-4 h-4" />
        <span>Export</span>
      </button>
    </div>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-blue-100 rounded-lg">
          <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Total Expenses</p>
          <p class="text-xl font-bold text-blue-600">{formatCurrency(totalAmount)}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-purple-100 rounded-lg">
          <Icon icon="heroicons:tag" class="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Transactions</p>
          <p class="text-xl font-bold text-purple-600">{filteredExpenses.length}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border border-emerald-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-emerald-100 rounded-lg">
          <Icon icon="heroicons:chart-pie" class="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Categories</p>
          <p class="text-xl font-bold text-emerald-600">{Object.keys(categoryTotals).length}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-amber-100 rounded-lg">
          <Icon icon="heroicons:calculator" class="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <p class="text-sm text-gray-600">Avg. per day</p>
          <p class="text-xl font-bold text-amber-600">{formatCurrency(totalAmount / 30)}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-lg p-4 shadow-sm border">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <!-- Search -->
      <div class="relative">
        <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search expenses..." bind:value={searchTerm} class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      <!-- Category Filter -->
      <select bind:value={filterCategory} class="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
        <option value="all">All Categories</option>
        {#each expenseCategories as category}
          <option value={category.id}>{category.icon} {category.name}</option>
        {/each}
      </select>

      <!-- Member Filter -->
      <select bind:value={filterMember} class="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
        <option value="all">All Members</option>
        {#each familyMembers as member}
          <option value={member.id}>{member.avatar} {member.name}</option>
        {/each}
      </select>

      <!-- Date Range Filter -->
      <select bind:value={filterDateRange} class="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
        <option value="this_year">This Year</option>
      </select>

      <!-- Clear Filters -->
      <button
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        on:click={() => {
          searchTerm = "";
          filterCategory = "all";
          filterMember = "all";
          filterDateRange = "this_month";
        }}
      >
        Clear
      </button>
    </div>
  </div>

  <!-- Expense List -->
  <div class="bg-white rounded-lg shadow-sm border">
    {#if filteredExpenses.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:receipt-percent" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
        <p class="text-gray-500">Add your first expense or adjust the filters.</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid By</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each filteredExpenses as expense (expense.id)}
              {@const categoryDetails = getCategoryDetails(expense.category)}
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(expense.date)}
                </td>
                <td class="px-6 py-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{expense.description}</div>
                    {#if expense.tags.length > 0}
                      <div class="flex flex-wrap gap-1 mt-1">
                        {#each expense.tags as tag}
                          <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        {/each}
                      </div>
                    {/if}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="mr-2">{categoryDetails.icon}</span>
                    <span class="text-sm text-gray-900">{categoryDetails.name}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getMemberName(expense.memberPaidId)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                    {expense.paymentMethod}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-blue-600 hover:text-blue-900" on:click={() => editExpense(expense)}> Edit </button>
                  <button class="text-red-600 hover:text-red-900" on:click={() => deleteExpense(expense.id)}> Delete </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Expense Modal -->
{#if showForm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">
            {currentExpense.id ? "Edit Expense" : "Add New Expense"}
          </h2>
          <button
            class="text-gray-400 hover:text-gray-600"
            on:click={() => {
              showForm = false;
              resetForm();
            }}
          >
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={saveExpense} class="space-y-4">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
              <input type="number" step="0.01" bind:value={currentExpense.amount} placeholder="Enter amount" class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input type="date" bind:value={currentExpense.date} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <input type="text" bind:value={currentExpense.description} placeholder="What did you spend on?" class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>

          <!-- Category and Member -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select bind:value={currentExpense.category} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select category</option>
                {#each expenseCategories as category}
                  <option value={category.id}>{category.icon} {category.name}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Paid By *</label>
              <select bind:value={currentExpense.memberPaidId} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select member</option>
                {#each familyMembers as member}
                  <option value={member.id}>{member.avatar} {member.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Beneficiary and Payment Method -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Beneficiary</label>
              <select bind:value={currentExpense.memberBeneficiaryId} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Whole family</option>
                {#each familyMembers as member}
                  <option value={member.id}>{member.avatar} {member.name}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select bind:value={currentExpense.paymentMethod} class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="cash">Cash</option>
                <option value="card">Debit/Credit Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div class="flex space-x-2 mb-2">
              <input type="text" bind:value={newTag} placeholder="Add tag" class="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" on:keydown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
              <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" on:click={addTag}> Add </button>
            </div>
            {#if currentExpense.tags.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each currentExpense.tags as tag}
                  <span class="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <span>{tag}</span>
                    <button type="button" class="text-blue-500 hover:text-blue-700" on:click={() => removeTag(tag)}>
                      <Icon icon="heroicons:x-mark" class="w-3 h-3" />
                    </button>
                  </span>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea bind:value={currentExpense.notes} placeholder="Additional notes..." rows="3" class="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              class="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
              on:click={() => {
                showForm = false;
                resetForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {currentExpense.id ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
