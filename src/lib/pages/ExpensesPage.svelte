<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let expenses = [
    {
      id: 1,
      category: "Food & Dining",
      description: "Grocery shopping",
      amount: 2500,
      date: "2024-01-15",
      paymentMethod: "Credit Card",
      tags: ["groceries", "weekly"]
    },
    {
      id: 2,
      category: "Transportation",
      description: "Fuel for car",
      amount: 1200,
      date: "2024-01-14",
      paymentMethod: "Cash",
      tags: ["fuel", "car"]
    },
    {
      id: 3,
      category: "Utilities",
      description: "Electricity bill",
      amount: 1800,
      date: "2024-01-13",
      paymentMethod: "Online",
      tags: ["electricity", "monthly"]
    }
  ];

  let newExpense = {
    category: "",
    description: "",
    amount: "",
    paymentMethod: "",
    tags: ""
  };

  let showAddModal = false;
  let filterCategory = "";
  let filterDateRange = "";

  function addExpense() {
    // Add expense logic here
    showAddModal = false;
  }

  function getCategoryIcon(category) {
    const icons = {
      "Food & Dining": "heroicons:shopping-bag",
      "Transportation": "heroicons:truck",
      "Utilities": "heroicons:bolt",
      "Entertainment": "heroicons:film",
      "Healthcare": "heroicons:heart",
      "Education": "heroicons:academic-cap",
      "Shopping": "heroicons:shopping-cart",
      "Other": "heroicons:ellipsis-horizontal"
    };
    return icons[category] || icons["Other"];
  }

  function getTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  $: filteredExpenses = expenses.filter(expense => {
    if (filterCategory && expense.category !== filterCategory) return false;
    return true;
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Expenses</h1>
      <p class="text-base-content/70 mt-2">Track and manage your expenses</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Expense
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-lg">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Expenses</h3>
            <p class="text-2xl font-bold text-red-600">₹{getTotalExpenses()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:shopping-bag" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Food & Dining</h3>
            <p class="text-2xl font-bold text-blue-600">₹2,500</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:truck" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Transportation</h3>
            <p class="text-2xl font-bold text-green-600">₹1,200</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <Icon icon="heroicons:bolt" class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Utilities</h3>
            <p class="text-2xl font-bold text-purple-600">₹1,800</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="flex flex-wrap gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select bind:value={filterCategory} class="select select-bordered select-sm">
            <option value="">All Categories</option>
            <option>Food & Dining</option>
            <option>Transportation</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Shopping</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Date Range</span>
          </label>
          <select bind:value={filterDateRange} class="select select-bordered select-sm">
            <option value="">All Time</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- Expenses Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredExpenses as expense}
              <tr>
                <td>
                  <div class="flex items-center">
                    <Icon icon={getCategoryIcon(expense.category)} class="w-4 h-4 mr-2" />
                    {expense.category}
                  </div>
                </td>
                <td>{expense.description}</td>
                <td class="font-semibold text-red-600">₹{expense.amount}</td>
                <td>{expense.date}</td>
                <td>{expense.paymentMethod}</td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    {#each expense.tags as tag}
                      <span class="badge badge-outline badge-sm">{tag}</span>
                    {/each}
                  </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:eye" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost text-red-600">
                      <Icon icon="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Add Expense Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Expense</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addExpense} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={newExpense.category} class="select select-bordered" required>
              <option value="">Select Category</option>
              <option>Food & Dining</option>
              <option>Transportation</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Shopping</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <input type="text" bind:value={newExpense.description} class="input input-bordered" placeholder="Grocery shopping, fuel, etc." required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Amount</span>
            </label>
            <input type="number" bind:value={newExpense.amount} class="input input-bordered" placeholder="2500" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Payment Method</span>
            </label>
            <select bind:value={newExpense.paymentMethod} class="select select-bordered" required>
              <option value="">Select Method</option>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Online</option>
              <option>UPI</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tags (comma separated)</span>
            </label>
            <input type="text" bind:value={newExpense.tags} class="input input-bordered" placeholder="groceries, weekly, etc." />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}