<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let budgets = [
    {
      id: 1,
      category: "Food & Dining",
      budgeted: 15000,
      spent: 12500,
      remaining: 2500,
      period: "Monthly",
      status: "on-track"
    },
    {
      id: 2,
      category: "Transportation",
      budgeted: 8000,
      spent: 7200,
      remaining: 800,
      period: "Monthly",
      status: "on-track"
    },
    {
      id: 3,
      category: "Entertainment",
      budgeted: 5000,
      spent: 6200,
      remaining: -1200,
      period: "Monthly",
      status: "over-budget"
    }
  ];

  let newBudget = {
    category: "",
    budgeted: "",
    period: "Monthly"
  };

  let showAddModal = false;

  function addBudget() {
    // Add budget logic here
    showAddModal = false;
  }

  function getStatusColor(status) {
    switch (status) {
      case "on-track": return "text-green-600";
      case "over-budget": return "text-red-600";
      case "warning": return "text-yellow-600";
      default: return "text-gray-600";
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "on-track": return "heroicons:check-circle";
      case "over-budget": return "heroicons:exclamation-triangle";
      case "warning": return "heroicons:exclamation-circle";
      default: return "heroicons:minus-circle";
    }
  }

  function getProgressPercentage(budgeted, spent) {
    return Math.min((spent / budgeted) * 100, 100);
  }

  function getProgressColor(status) {
    switch (status) {
      case "on-track": return "bg-green-500";
      case "over-budget": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Budget Management</h1>
      <p class="text-base-content/70 mt-2">Track your spending against budgeted amounts</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Budget
    </button>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Budget</h3>
            <p class="text-2xl font-bold text-blue-600">₹28,000</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:arrow-trending-down" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Spent</h3>
            <p class="text-2xl font-bold text-green-600">₹25,900</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <Icon icon="heroicons:arrow-trending-up" class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Remaining</h3>
            <p class="text-2xl font-bold text-purple-600">₹2,100</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-lg">
            <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Over Budget</h3>
            <p class="text-2xl font-bold text-red-600">1 Category</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Budget Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each budgets as budget}
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <h3 class="card-title text-lg">{budget.category}</h3>
            <div class="flex items-center">
              <Icon icon={getStatusIcon(budget.status)} class="w-5 h-5 {getStatusColor(budget.status)} mr-1" />
              <span class="text-sm font-medium {getStatusColor(budget.status)}">
                {budget.status === 'on-track' ? 'On Track' : budget.status === 'over-budget' ? 'Over Budget' : 'Warning'}
              </span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-base-content/70">Budgeted</span>
              <span class="font-semibold">₹{budget.budgeted}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-base-content/70">Spent</span>
              <span class="font-semibold">₹{budget.spent}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-base-content/70">Remaining</span>
              <span class="font-semibold {budget.remaining < 0 ? 'text-red-600' : 'text-green-600'}">
                ₹{budget.remaining}
              </span>
            </div>
          </div>

          <div class="mt-4">
            <div class="flex justify-between text-xs text-base-content/70 mb-1">
              <span>Progress</span>
              <span>{Math.round(getProgressPercentage(budget.budgeted, budget.spent))}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full {getProgressColor(budget.status)}"
                style="width: {getProgressPercentage(budget.budgeted, budget.spent)}%"
              ></div>
            </div>
          </div>

          <div class="card-actions justify-end mt-4">
            <button class="btn btn-sm btn-ghost">
              <Icon icon="heroicons:pencil" class="w-4 h-4 mr-1" />
              Edit
            </button>
            <button class="btn btn-sm btn-ghost text-red-600">
              <Icon icon="heroicons:trash" class="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Budget Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Category</th>
              <th>Period</th>
              <th>Budgeted</th>
              <th>Spent</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each budgets as budget}
              <tr>
                <td class="font-semibold">{budget.category}</td>
                <td>{budget.period}</td>
                <td>₹{budget.budgeted}</td>
                <td>₹{budget.spent}</td>
                <td class="{budget.remaining < 0 ? 'text-red-600' : 'text-green-600'} font-semibold">
                  ₹{budget.remaining}
                </td>
                <td>
                  <span class="badge {budget.status === 'on-track' ? 'badge-success' : budget.status === 'over-budget' ? 'badge-error' : 'badge-warning'}">
                    {budget.status === 'on-track' ? 'On Track' : budget.status === 'over-budget' ? 'Over Budget' : 'Warning'}
                  </span>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:eye" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-sm btn-ghost">
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
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

<!-- Add Budget Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Budget</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addBudget} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select bind:value={newBudget.category} class="select select-bordered" required>
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
              <span class="label-text">Budgeted Amount</span>
            </label>
            <input type="number" bind:value={newBudget.budgeted} class="input input-bordered" placeholder="15000" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Period</span>
            </label>
            <select bind:value={newBudget.period} class="select select-bordered">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}