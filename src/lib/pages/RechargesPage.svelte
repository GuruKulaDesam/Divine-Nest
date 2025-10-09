<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  let recharges = [
    {
      id: 1,
      type: "Mobile",
      provider: "Airtel",
      amount: 299,
      date: "2024-01-15",
      status: "completed",
      number: "+91 98765 43210"
    },
    {
      id: 2,
      type: "DTH",
      provider: "Tata Play",
      amount: 499,
      date: "2024-01-14",
      status: "completed",
      number: "Subscriber ID: 123456789"
    }
  ];

  let newRecharge = {
    type: "Mobile",
    provider: "",
    amount: "",
    number: ""
  };

  let showAddModal = false;

  function addRecharge() {
    // Add recharge logic here
    showAddModal = false;
  }

  function getStatusColor(status) {
    switch (status) {
      case "completed": return "badge-success";
      case "pending": return "badge-warning";
      case "failed": return "badge-error";
      default: return "badge-neutral";
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Recharges</h1>
      <p class="text-base-content/70 mt-2">Manage mobile, DTH, and utility recharges</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
      Add Recharge
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <Icon icon="heroicons:device-phone-mobile" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Mobile Recharges</h3>
            <p class="text-2xl font-bold text-blue-600">12</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <Icon icon="heroicons:tv" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">DTH Recharges</h3>
            <p class="text-2xl font-bold text-green-600">8</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <Icon icon="heroicons:banknotes" class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <h3 class="font-semibold text-base-content">Total Spent</h3>
            <p class="text-2xl font-bold text-purple-600">₹4,280</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recharges Table -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Provider</th>
              <th>Number/ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each recharges as recharge}
              <tr>
                <td>
                  <div class="flex items-center">
                    <Icon icon={recharge.type === 'Mobile' ? 'heroicons:device-phone-mobile' : 'heroicons:tv'} class="w-4 h-4 mr-2" />
                    {recharge.type}
                  </div>
                </td>
                <td>{recharge.provider}</td>
                <td class="font-mono text-sm">{recharge.number}</td>
                <td class="font-semibold">₹{recharge.amount}</td>
                <td>{recharge.date}</td>
                <td>
                  <span class="badge {getStatusColor(recharge.status)}">
                    {recharge.status}
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

<!-- Add Recharge Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-base-content">Add Recharge</h2>
          <button class="btn btn-sm btn-ghost" on:click={() => showAddModal = false}>
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addRecharge} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select bind:value={newRecharge.type} class="select select-bordered">
              <option>Mobile</option>
              <option>DTH</option>
              <option>Electricity</option>
              <option>Gas</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Provider</span>
            </label>
            <input type="text" bind:value={newRecharge.provider} class="input input-bordered" placeholder="Airtel, Tata Play, etc." required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Number/ID</span>
            </label>
            <input type="text" bind:value={newRecharge.number} class="input input-bordered" placeholder="+91 9876543210 or Subscriber ID" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Amount</span>
            </label>
            <input type="number" bind:value={newRecharge.amount} class="input input-bordered" placeholder="299" required />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="btn btn-ghost flex-1" on:click={() => showAddModal = false}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              Add Recharge
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}