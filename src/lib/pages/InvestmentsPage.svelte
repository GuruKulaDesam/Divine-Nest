<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let investments = [
    {
      id: 1,
      type: "Mutual Fund",
      name: "SBI Bluechip Fund",
      invested: 100000,
      currentValue: 125000,
      returns: 25000,
      returnPercentage: 25.0,
      category: "Equity",
      risk: "Moderate"
    },
    {
      id: 2,
      type: "Stock",
      name: "Reliance Industries",
      invested: 50000,
      currentValue: 65000,
      returns: 15000,
      returnPercentage: 30.0,
      category: "Large Cap",
      risk: "High"
    },
    {
      id: 3,
      type: "Fixed Deposit",
      name: "HDFC FD",
      invested: 200000,
      currentValue: 215000,
      returns: 15000,
      returnPercentage: 7.5,
      category: "Fixed Income",
      risk: "Low"
    }
  ];

  let newInvestment = {
    type: "",
    name: "",
    invested: "",
    category: "",
    risk: "Moderate"
  };

  let showAddModal = false;
  let filterType = "";
  let filterRisk = "";

  function addInvestment() {
    // Add investment logic here
    showAddModal = false;
  }

  function getTypeIcon(type) {
    const icons = {
      "Mutual Fund": "heroicons:chart-bar",
      "Stock": "heroicons:trending-up",
      "Fixed Deposit": "heroicons:banknotes",
      "Bonds": "heroicons:document-text",
      "Gold": "heroicons:star",
      "Real Estate": "heroicons:home",
      "Crypto": "heroicons:currency-dollar"
    };
    return icons[type] || "heroicons:chart-bar";
  }

  function getRiskColor(risk) {
    switch (risk) {
      case "Low": return "text-green-600";
      case "Moderate": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  }

  function getTotalInvested() {
    return investments.reduce((total, inv) => total + inv.invested, 0);
  }

  function getTotalValue() {
    return investments.reduce((total, inv) => total + inv.currentValue, 0);
  }

  function getTotalReturns() {
    return investments.reduce((total, inv) => total + inv.returns, 0);
  }

  $: filteredInvestments = investments.filter(inv => {
    if (filterType && inv.type !== filterType) return false;
    if (filterRisk && inv.risk !== filterRisk) return false;
    return true;
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Investment Portfolio</h1>
      <p class="text-base-content/70 mt-2">Track your investments and returns</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Investment
    </button>
  </div>

  <!-- Portfolio Summary -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Invested</h3>
            <p class="text-2xl font-bold text-blue-600">₹{getTotalInvested().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:trending-up" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Current Value</h3>
            <p class="text-2xl font-bold text-green-600">₹{getTotalValue().toLocaleString()}</p>
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
            <h3 class="font-semibold text-base-content">Total Returns</h3>
            <p class="text-2xl font-bold text-purple-600">₹{getTotalReturns().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <Icon icon="heroicons:chart-bar" class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Avg Return</h3>
            <p class="text-2xl font-bold text-yellow-600">
              {((getTotalReturns() / getTotalInvested()) * 100).toFixed(1)}%
            </p>
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
            <span class="label-text">Type</span>
          </label>
          <select bind:value={filterType} class="select select-bordered select-sm">
            <option value="">All Types</option>
            <option>Mutual Fund</option>
            <option>Stock</option>
            <option>Fixed Deposit</option>
            <option>Bonds</option>
            <option>Gold</option>
            <option>Real Estate</option>
            <option>Crypto</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Risk Level</span>
          </label>
          <select bind:value={filterRisk} class="select select-bordered select-sm">
            <option value="">All Risk Levels</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- Investments Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredInvestments as investment}
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg mr-3">
                <Icon icon={getTypeIcon(investment.type)} class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">{investment.name}</h3>
                <p class="text-sm text-base-content/70">{investment.type}</p>
              </div>
            </div>
            <span class="badge {investment.returnPercentage >= 0 ? 'badge-success' : 'badge-error'}">
              {investment.returnPercentage >= 0 ? '+' : ''}{investment.returnPercentage}%
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Invested</span>
              <span class="font-semibold">₹{investment.invested.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Current Value</span>
              <span class="font-semibold">₹{investment.currentValue.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Returns</span>
              <span class="font-semibold {investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}">
                ₹{investment.returns.toLocaleString()}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Category</span>
              <span class="text-sm">{investment.category}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Risk</span>
              <span class="text-sm {getRiskColor(investment.risk)}">{investment.risk}</span>
            </div>
          </div>

          <div class="card-actions justify-end mt-4">
            <button class="btn btn-sm btn-ghost">
              <Icon icon="heroicons:eye" class="w-4 h-4 mr-1" />
              View Details
            </button>
            <button class="btn btn-sm btn-ghost">
              <Icon icon="heroicons:pencil" class="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Investments Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Invested</th>
              <th>Current Value</th>
              <th>Returns</th>
              <th>Return %</th>
              <th>Category</th>
              <th>Risk</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredInvestments as investment}
              <tr>
                <td>
                  <div class="flex items-center">
                    <Icon icon={getTypeIcon(investment.type)} class="w-4 h-4 mr-2" />
                    {investment.type}
                  </div>
                </td>
                <td class="font-semibold">{investment.name}</td>
                <td>₹{investment.invested.toLocaleString()}</td>
                <td>₹{investment.currentValue.toLocaleString()}</td>
                <td class="{investment.returns >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold">
                  ₹{investment.returns.toLocaleString()}
                </td>
                <td class="{investment.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold">
                  {investment.returnPercentage >= 0 ? '+' : ''}{investment.returnPercentage}%
                </td>
                <td>{investment.category}</td>
                <td>
                  <span class="{getRiskColor(investment.risk)} font-medium">{investment.risk}</span>
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

<!-- Add Investment Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Investment</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addInvestment} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Investment Type</span>
            </label>
            <select bind:value={newInvestment.type} class="select select-bordered" required>
              <option value="">Select Type</option>
              <option>Mutual Fund</option>
              <option>Stock</option>
              <option>Fixed Deposit</option>
              <option>Bonds</option>
              <option>Gold</option>
              <option>Real Estate</option>
              <option>Crypto</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Investment Name</span>
            </label>
            <input type="text" bind:value={newInvestment.name} class="input input-bordered" placeholder="SBI Bluechip Fund" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Invested Amount</span>
            </label>
            <input type="number" bind:value={newInvestment.invested} class="input input-bordered" placeholder="100000" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <input type="text" bind:value={newInvestment.category} class="input input-bordered" placeholder="Equity, Large Cap, etc." required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Risk Level</span>
            </label>
            <select bind:value={newInvestment.risk} class="select select-bordered">
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}