<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let finances = [];
  let showAddForm = false;
  let editingFinance = null;
  let searchTerm = "";
  let selectedType = "";
  let selectedRecurring = "";

  // Form data
  let formData = {
    type: "Expenses",
    category: "",
    sub_category: "",
    amount: "",
    recurring: "None",
    date: new Date().toISOString().split('T')[0],
    actor: "",
    source: "Manual",
    notes: ""
  };

  // Load finances on mount
  onMount(async () => {
    await loadFinances();
  });

  async function loadFinances() {
    try {
      finances = await sqliteService.getFinances();
    } catch (error) {
      console.error("Error loading finances:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Expenses",
      category: "",
      sub_category: "",
      amount: "",
      recurring: "None",
      date: new Date().toISOString().split('T')[0],
      actor: "",
      source: "Manual",
      notes: ""
    };
  }

  async function saveFinance() {
    try {
      const financeData = {
        ...formData,
        id: editingFinance ? editingFinance.id : crypto.randomUUID(),
        amount: parseFloat(formData.amount),
        created_at: editingFinance ? editingFinance.created_at : new Date().toISOString()
      };

      if (editingFinance) {
        await sqliteService.updateFinance(financeData);
      } else {
        await sqliteService.saveFinance(financeData);
      }

      await loadFinances();
      showAddForm = false;
      editingFinance = null;
      resetForm();
    } catch (error) {
      console.error("Error saving finance:", error);
    }
  }

  function editFinance(finance) {
    editingFinance = finance;
    formData = {
      ...finance,
      date: finance.date.split('T')[0] // Convert to date input format
    };
    showAddForm = true;
  }

  async function deleteFinance(finance) {
    if (confirm(`Delete "${finance.category}" entry?`)) {
      try {
        await sqliteService.deleteFinance(finance.id);
        await loadFinances();
      } catch (error) {
        console.error("Error deleting finance:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingFinance = null;
    resetForm();
  }

  // Filter finances based on search and filters
  $: filteredFinances = finances.filter(finance => {
    const matchesSearch = !searchTerm ||
      finance.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (finance.sub_category && finance.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      finance.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (finance.notes && finance.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = !selectedType || finance.type === selectedType;
    const matchesRecurring = !selectedRecurring || finance.recurring === selectedRecurring;

    return matchesSearch && matchesType && matchesRecurring;
  });

  // Get unique values for filters
  $: types = [...new Set(finances.map(f => f.type))];
  $: recurringOptions = [...new Set(finances.map(f => f.recurring))];

  // Group finances by type for display
  $: groupedFinances = filteredFinances.reduce((groups, finance) => {
    if (!groups[finance.type]) {
      groups[finance.type] = [];
    }
    groups[finance.type].push(finance);
    return groups;
  }, {});

  // Calculate totals
  $: totals = finances.reduce((acc, finance) => {
    if (!acc[finance.type]) acc[finance.type] = 0;
    acc[finance.type] += finance.amount;
    return acc;
  }, {});

  // Get icon for finance type
  function getTypeIcon(type) {
    switch (type) {
      case 'Income': return 'heroicons:arrow-trending-up';
      case 'Expenses': return 'heroicons:arrow-trending-down';
      case 'Budget': return 'heroicons:calculator';
      case 'Savings': return 'heroicons:banknotes';
      default: return 'heroicons:currency-dollar';
    }
  }

  // Get color for finance type
  function getTypeColor(type) {
    switch (type) {
      case 'Income': return 'text-green-600';
      case 'Expenses': return 'text-red-600';
      case 'Budget': return 'text-blue-600';
      case 'Savings': return 'text-purple-600';
      default: return 'text-base-content';
    }
  }
</script>

<svelte:head>
  <title>Finance - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:currency-dollar" class="w-8 h-8" />
          Finance Management
        </h1>
        <p class="text-base-content/70 mt-1">Track income, expenses, budgets, and savings</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingFinance = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Entry
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {#each Object.entries(totals) as [type, total]}
        <div class="card bg-base-100 shadow">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-base-content/70">{type}</p>
                <p class="text-2xl font-bold {getTypeColor(type)}">₹{total.toLocaleString()}</p>
              </div>
              <Icon icon={getTypeIcon(type)} class="w-8 h-8 text-base-content/50" />
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search finances..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Type</span>
          </label>
          <select class="select select-bordered" bind:value={selectedType}>
            <option value="">All Types</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Recurring</span>
          </label>
          <select class="select select-bordered" bind:value={selectedRecurring}>
            <option value="">All</option>
            {#each recurringOptions as recurring}
              <option value={recurring}>{recurring}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Finances by Type -->
    {#each Object.entries(groupedFinances) as [type, typeFinances]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getTypeIcon(type)} class="w-6 h-6" />
          {type}
          <span class="badge badge-primary badge-sm">{typeFinances.length}</span>
          <span class="text-lg font-bold {getTypeColor(type)} ml-auto">
            ₹{totals[type]?.toLocaleString() || 0}
          </span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each typeFinances as finance}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="card-title text-lg">{finance.category}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      {#if finance.sub_category}
                        <span class="badge badge-outline">{finance.sub_category}</span>
                      {/if}
                      <span class="badge badge-secondary">{finance.recurring}</span>
                      <span class="badge badge-ghost">{finance.source}</span>
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editFinance(finance)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteFinance(finance)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Amount:</span>
                    <span class="text-xl font-bold {getTypeColor(finance.type)}">
                      ₹{finance.amount.toLocaleString()}
                    </span>
                  </div>

                  <p class="text-sm">
                    <strong>Actor:</strong> {finance.actor}
                  </p>

                  <p class="text-sm">
                    <strong>Date:</strong> {new Date(finance.date).toLocaleDateString()}
                  </p>

                  {#if finance.notes}
                    <p class="text-sm">
                      <strong>Notes:</strong> {finance.notes}
                    </p>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredFinances.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:currency-dollar" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No finance entries found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedRecurring ? "Try adjusting your filters" : "Add your first finance entry to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-lg">
      <h3 class="font-bold text-lg mb-4">
        {editingFinance ? "Edit Finance Entry" : "Add New Finance Entry"}
      </h3>

      <form on:submit|preventDefault={saveFinance} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Budget</option>
              <option>Income</option>
              <option>Expenses</option>
              <option>Savings</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Recurring *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.recurring} required>
              <option>None</option>
              <option>By Period (Flexible)</option>
              <option>By Period (Fixed)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Groceries, Salary..."
              class="input input-bordered"
              bind:value={formData.category}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sub Category</span>
            </label>
            <input
              type="text"
              placeholder="Specific sub-category..."
              class="input input-bordered"
              bind:value={formData.sub_category}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Amount (₹) *</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              class="input input-bordered"
              bind:value={formData.amount}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Date *</span>
            </label>
            <input
              type="date"
              class="input input-bordered"
              bind:value={formData.date}
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Actor *</span>
            </label>
            <input
              type="text"
              placeholder="Who is involved..."
              class="input input-bordered"
              bind:value={formData.actor}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Source *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.source} required>
              <option>Manual</option>
              <option>Voice</option>
              <option>SMS</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            placeholder="Additional notes..."
            class="textarea textarea-bordered"
            bind:value={formData.notes}
            rows="2"
          ></textarea>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingFinance ? "Update" : "Add"} Entry
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}