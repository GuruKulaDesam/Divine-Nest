<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let policies = [
    {
      id: 1,
      type: "Health Insurance",
      provider: "Star Health",
      policyNumber: "SH123456789",
      coverage: 500000,
      premium: 12000,
      renewalDate: "2024-03-15",
      status: "active",
      beneficiaries: ["John Doe", "Jane Doe"]
    },
    {
      id: 2,
      type: "Life Insurance",
      provider: "LIC",
      policyNumber: "LIC987654321",
      coverage: 1000000,
      premium: 25000,
      renewalDate: "2024-06-20",
      status: "active",
      beneficiaries: ["Jane Doe"]
    },
    {
      id: 3,
      type: "Vehicle Insurance",
      provider: "Bajaj Allianz",
      policyNumber: "BA456789123",
      coverage: 800000,
      premium: 8500,
      renewalDate: "2024-02-10",
      status: "expiring-soon",
      beneficiaries: ["John Doe"]
    }
  ];

  let newPolicy = {
    type: "",
    provider: "",
    policyNumber: "",
    coverage: "",
    premium: "",
    renewalDate: "",
    beneficiaries: ""
  };

  let showAddModal = false;

  function addPolicy() {
    // Add policy logic here
    showAddModal = false;
  }

  function getStatusColor(status) {
    switch (status) {
      case "active": return "badge-success";
      case "expiring-soon": return "badge-warning";
      case "expired": return "badge-error";
      default: return "badge-neutral";
    }
  }

  function getTypeIcon(type) {
    const icons = {
      "Health Insurance": "heroicons:heart",
      "Life Insurance": "heroicons:user-group",
      "Vehicle Insurance": "heroicons:truck",
      "Property Insurance": "heroicons:home",
      "Travel Insurance": "heroicons:plane",
      "Other": "heroicons:shield-check"
    };
    return icons[type] || icons["Other"];
  }

  function getTotalCoverage() {
    return policies.reduce((total, policy) => total + policy.coverage, 0);
  }

  function getTotalPremium() {
    return policies.reduce((total, policy) => total + policy.premium, 0);
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Insurance Policies</h1>
      <p class="text-base-content/70 mt-2">Manage your insurance coverage and policies</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Policy
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:shield-check" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Coverage</h3>
            <p class="text-2xl font-bold text-blue-600">₹{getTotalCoverage().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Annual Premium</h3>
            <p class="text-2xl font-bold text-green-600">₹{getTotalPremium().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <Icon icon="heroicons:document-check" class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Active Policies</h3>
            <p class="text-2xl font-bold text-purple-600">{policies.filter(p => p.status === 'active').length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Expiring Soon</h3>
            <p class="text-2xl font-bold text-yellow-600">{policies.filter(p => p.status === 'expiring-soon').length}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Policies Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each policies as policy}
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg mr-3">
                <Icon icon={getTypeIcon(policy.type)} class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">{policy.type}</h3>
                <p class="text-sm text-base-content/70">{policy.provider}</p>
              </div>
            </div>
            <span class="badge {getStatusColor(policy.status)}">
              {policy.status === 'active' ? 'Active' : policy.status === 'expiring-soon' ? 'Expiring Soon' : 'Expired'}
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Policy Number</span>
              <span class="font-mono text-sm">{policy.policyNumber}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Coverage</span>
              <span class="font-semibold">₹{policy.coverage.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Annual Premium</span>
              <span class="font-semibold">₹{policy.premium.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-base-content/70">Renewal Date</span>
              <span class="text-sm">{policy.renewalDate}</span>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-sm text-base-content/70 mb-2">Beneficiaries:</p>
            <div class="flex flex-wrap gap-1">
              {#each policy.beneficiaries as beneficiary}
                <span class="badge badge-outline badge-sm">{beneficiary}</span>
              {/each}
            </div>
          </div>

          <div class="card-actions justify-end mt-4">
            <button class="btn btn-sm btn-ghost">
              <Icon icon="heroicons:eye" class="w-4 h-4 mr-1" />
              View
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

  <!-- Policies Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Provider</th>
              <th>Policy Number</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Renewal Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each policies as policy}
              <tr>
                <td>
                  <div class="flex items-center">
                    <Icon icon={getTypeIcon(policy.type)} class="w-4 h-4 mr-2" />
                    {policy.type}
                  </div>
                </td>
                <td>{policy.provider}</td>
                <td class="font-mono text-sm">{policy.policyNumber}</td>
                <td class="font-semibold">₹{policy.coverage.toLocaleString()}</td>
                <td>₹{policy.premium.toLocaleString()}</td>
                <td>{policy.renewalDate}</td>
                <td>
                  <span class="badge {getStatusColor(policy.status)}">
                    {policy.status === 'active' ? 'Active' : policy.status === 'expiring-soon' ? 'Expiring Soon' : 'Expired'}
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

<!-- Add Policy Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Insurance Policy</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addPolicy} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Policy Type</span>
            </label>
            <select bind:value={newPolicy.type} class="select select-bordered" required>
              <option value="">Select Type</option>
              <option>Health Insurance</option>
              <option>Life Insurance</option>
              <option>Vehicle Insurance</option>
              <option>Property Insurance</option>
              <option>Travel Insurance</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Provider</span>
            </label>
            <input type="text" bind:value={newPolicy.provider} class="input input-bordered" placeholder="Insurance Company" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Policy Number</span>
            </label>
            <input type="text" bind:value={newPolicy.policyNumber} class="input input-bordered" placeholder="Policy number" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Coverage Amount</span>
            </label>
            <input type="number" bind:value={newPolicy.coverage} class="input input-bordered" placeholder="500000" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Annual Premium</span>
            </label>
            <input type="number" bind:value={newPolicy.premium} class="input input-bordered" placeholder="12000" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Renewal Date</span>
            </label>
            <input type="date" bind:value={newPolicy.renewalDate} class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Beneficiaries (comma separated)</span>
            </label>
            <input type="text" bind:value={newPolicy.beneficiaries} class="input input-bordered" placeholder="John Doe, Jane Doe" />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}