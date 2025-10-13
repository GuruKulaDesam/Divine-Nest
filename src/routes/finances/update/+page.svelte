<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { finances, financeActions } from '$lib/stores/finances';
  import { userProfile } from '$lib/stores/userProfile';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';

  // URL params
  let itemId = '';
  let item: any = null;
  let mode = 'view'; // 'view', 'edit'

  // Form data
  let type = '';
  let category = '';
  let sub_category = '';
  let amount = '';
  let recurring = '';
  let date = '';
  let actor = '';
  let source = '';
  let notes = '';
  let applicable_roles: string[] = [];

  // UI state
  let isSubmitting = false;
  let currentUser = '';
  let userRole = 'Parent';

  // Options
  const typeOptions = ['Budget', 'Income', 'Expenses', 'Savings'];
  const recurringOptions = ['None', 'By Period (Flexible)', 'By Period (Fixed)'];
  const sourceOptions = ['Manual', 'Voice', 'SMS'];
  const roleOptions = ['Parent', 'Adult', 'Child', 'Elder'];

  // Category suggestions based on type
  $: categorySuggestions = getCategorySuggestions(type);

  function getCategorySuggestions(type: string) {
    const suggestions: Record<string, string[]> = {
      'Budget': ['Monthly Budget', 'Annual Budget', 'Project Budget'],
      'Income': ['Salary', 'Business', 'Freelance', 'Investment', 'Gift', 'Other'],
      'Expenses': ['Groceries', 'Utilities', 'Transportation', 'Education', 'Healthcare', 'Entertainment', 'Household', 'Personal', 'Other'],
      'Savings': ['Emergency Fund', 'Investment', 'Retirement', 'Education Fund', 'Vacation Fund', 'Other']
    };
    return suggestions[type] || [];
  }

  // Voice command handler
  function handleVoiceCommand(command: string) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('edit') || lowerCommand.includes('change')) {
      mode = 'edit';
    } else if (lowerCommand.includes('save') || lowerCommand.includes('update')) {
      handleSave();
    } else if (lowerCommand.includes('cancel')) {
      mode = 'view';
    }
  }

  function toggleRole(role: string) {
    if (applicable_roles.includes(role)) {
      applicable_roles = applicable_roles.filter(r => r !== role);
    } else {
      applicable_roles = [...applicable_roles, role];
    }
  }

  async function handleSave() {
    if (!type || !category || !amount || !actor) {
      alert('Please fill in all required fields');
      return;
    }

    isSubmitting = true;

    try {
      const updates = {
        type: type as 'Budget' | 'Income' | 'Expenses' | 'Savings',
        category,
        sub_category: sub_category || undefined,
        amount: parseFloat(amount),
        recurring: recurring as 'None' | 'By Period (Flexible)' | 'By Period (Fixed)',
        date,
        actor,
        source: source as 'Manual' | 'Voice' | 'SMS',
        notes: notes || undefined,
        applicable_roles
      };

      financeActions.update(itemId, updates);
      mode = 'view'; // Switch back to view mode
    } catch (error) {
      console.error('Error updating finance record:', error);
      alert('Failed to update finance record. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this finance record?')) {
      return;
    }

    try {
      financeActions.delete(itemId);
      goto('/finances/dashboard');
    } catch (error) {
      console.error('Error deleting finance record:', error);
      alert('Failed to delete finance record. Please try again.');
    }
  }

  // Load item data
  function loadItem() {
    item = financeActions.getById(itemId);
    if (item) {
      type = item.type;
      category = item.category;
      sub_category = item.sub_category || '';
      amount = item.amount.toString();
      recurring = item.recurring;
      date = item.date;
      actor = item.actor;
      source = item.source;
      notes = item.notes || '';
      applicable_roles = [...item.applicable_roles];
    }
  }

  onMount(() => {
    // Get current user
    userProfile.subscribe(profile => {
      currentUser = profile?.name || 'Family Member';
      userRole = profile?.role || 'Parent';
    });

    // Get item ID from URL
    const urlParams = new URLSearchParams($page.url.search);
    itemId = urlParams.get('id') || '';

    if (itemId) {
      loadItem();
    } else {
      goto('/finances/dashboard');
    }
  });
</script>

<svelte:head>
  <title>Update Finance Record - Divine Nest</title>
  <meta name="description" content="View and edit finance record details" />
</svelte:head>

<div class="min-h-screen bg-base-200">
  <!-- Breadcrumb -->
  <Breadcrumb currentPage="Update Finance Record" />

  <!-- Header -->
  <div class="bg-base-100 shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-base-content flex items-center gap-2">
            <Icon icon="heroicons:pencil-square" class="w-8 h-8 text-primary" />
            Update Finance Record
          </h1>
          <p class="text-base-content/70 mt-1">
            View and modify financial transaction details
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Voice Input -->
          <VoiceInput
            placeholder="Say 'edit' or 'save changes'..."
            onResult={handleVoiceCommand}
          />

          <!-- Mode Toggle -->
          <div class="btn-group">
            <button
              class="btn {mode === 'view' ? 'btn-active' : ''}"
              on:click={() => mode = 'view'}
            >
              <Icon icon="heroicons:eye" class="w-4 h-4 mr-2" />
              View
            </button>
            <button
              class="btn {mode === 'edit' ? 'btn-active' : ''}"
              on:click={() => mode = 'edit'}
            >
              <Icon icon="heroicons:pencil" class="w-4 h-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8">
    {#if !item}
      <div class="alert alert-warning">
        <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
        <div>
          <h3 class="font-bold">Record Not Found</h3>
          <div class="text-xs">The finance record you're looking for doesn't exist.</div>
        </div>
      </div>
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Main Content -->
        <div class="lg:col-span-2">

          <!-- View Mode -->
          {#if mode === 'view'}
            <div class="card bg-base-100 shadow-lg">
              <div class="card-body">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Type -->
                  <div class="form-control">
                    <label class="label" for="view-type">
                      <span class="label-text">Type</span>
                    </label>
                    <div id="view-type" class="badge badge-outline badge-lg {item.type === 'Income' ? 'badge-success' : item.type === 'Expenses' ? 'badge-error' : item.type === 'Budget' ? 'badge-info' : 'badge-warning'}">
                      {item.type}
                    </div>
                  </div>

                  <!-- Category -->
                  <div class="form-control">
                    <label class="label" for="view-category">
                      <span class="label-text">Category</span>
                    </label>
                    <p id="view-category" class="text-lg font-semibold">{item.category}</p>
                    {#if item.sub_category}
                      <p class="text-sm text-base-content/70">{item.sub_category}</p>
                    {/if}
                  </div>

                  <!-- Amount -->
                  <div class="form-control">
                    <label class="label" for="view-amount">
                      <span class="label-text">Amount</span>
                    </label>
                    <p id="view-amount" class="text-2xl font-bold text-primary">₹{item.amount.toLocaleString()}</p>
                  </div>

                  <!-- Recurring -->
                  <div class="form-control">
                    <label class="label" for="view-recurring">
                      <span class="label-text">Recurring</span>
                    </label>
                    <p id="view-recurring" class="text-lg">{item.recurring}</p>
                  </div>

                  <!-- Date -->
                  <div class="form-control">
                    <label class="label" for="view-date">
                      <span class="label-text">Date</span>
                    </label>
                    <p id="view-date" class="text-lg">{new Date(item.date).toLocaleDateString()}</p>
                  </div>

                  <!-- Actor -->
                  <div class="form-control">
                    <label class="label" for="view-actor">
                      <span class="label-text">Recorded By</span>
                    </label>
                    <p id="view-actor" class="text-lg">{item.actor}</p>
                  </div>

                  <!-- Source -->
                  <div class="form-control">
                    <label class="label" for="view-source">
                      <span class="label-text">Source</span>
                    </label>
                    <p id="view-source" class="text-lg">{item.source}</p>
                  </div>

                  <!-- Created At -->
                  <div class="form-control">
                    <label class="label" for="view-created">
                      <span class="label-text">Created At</span>
                    </label>
                    <p id="view-created" class="text-lg">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>

                </div>

                <!-- Notes -->
                {#if item.notes}
                  <div class="form-control mt-6">
                    <label class="label" for="view-notes">
                      <span class="label-text">Notes</span>
                    </label>
                    <p id="view-notes" class="text-base whitespace-pre-wrap bg-base-200 p-3 rounded-lg">{item.notes}</p>
                  </div>
                {/if}

                <!-- Applicable Roles -->
                <div class="divider">Roles</div>

                <div class="flex flex-wrap gap-1">
                  {#each item.applicable_roles as role}
                    <div class="badge badge-outline">{role}</div>
                  {/each}
                </div>

              </div>
            </div>
          {/if}

          <!-- Edit Mode -->
          {#if mode === 'edit' && item}
            <div class="card bg-base-100 shadow-lg">
              <div class="card-body">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Type -->
                  <div class="form-control">
                    <label class="label" for="edit-type">
                      <span class="label-text">Type *</span>
                    </label>
                    <select id="edit-type" bind:value={type} class="select select-bordered">
                      {#each typeOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </div>

                  <!-- Category -->
                  <div class="form-control">
                    <label class="label" for="edit-category">
                      <span class="label-text">Category *</span>
                    </label>
                    <input
                      id="edit-category"
                      type="text"
                      bind:value={category}
                      list="category-suggestions"
                      class="input input-bordered"
                      placeholder="e.g., Salary, Groceries, Monthly Budget..."
                      required
                    />
                    <datalist id="category-suggestions">
                      {#each categorySuggestions as suggestion}
                        <option value={suggestion}></option>
                      {/each}
                    </datalist>
                  </div>

                  <!-- Sub Category -->
                  <div class="form-control">
                    <label class="label" for="edit-sub-category">
                      <span class="label-text">Sub Category</span>
                    </label>
                    <input
                      id="edit-sub-category"
                      type="text"
                      bind:value={sub_category}
                      class="input input-bordered"
                      placeholder="Optional sub-category..."
                    />
                  </div>

                  <!-- Amount -->
                  <div class="form-control">
                    <label class="label" for="edit-amount">
                      <span class="label-text">Amount (₹) *</span>
                    </label>
                    <input
                      id="edit-amount"
                      type="number"
                      bind:value={amount}
                      class="input input-bordered"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <!-- Recurring -->
                  <div class="form-control">
                    <label class="label" for="edit-recurring">
                      <span class="label-text">Recurring</span>
                    </label>
                    <select id="edit-recurring" bind:value={recurring} class="select select-bordered">
                      {#each recurringOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </div>

                  <!-- Date -->
                  <div class="form-control">
                    <label class="label" for="edit-date">
                      <span class="label-text">Date *</span>
                    </label>
                    <input
                      id="edit-date"
                      type="date"
                      bind:value={date}
                      class="input input-bordered"
                      required
                    />
                  </div>

                  <!-- Actor -->
                  <div class="form-control">
                    <label class="label" for="edit-actor">
                      <span class="label-text">Recorded By *</span>
                    </label>
                    <input
                      id="edit-actor"
                      type="text"
                      bind:value={actor}
                      class="input input-bordered"
                      placeholder="Who recorded this transaction..."
                      required
                    />
                  </div>

                  <!-- Source -->
                  <div class="form-control">
                    <label class="label" for="edit-source">
                      <span class="label-text">Source</span>
                    </label>
                    <select id="edit-source" bind:value={source} class="select select-bordered">
                      {#each sourceOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </div>

                  <!-- Notes -->
                  <div class="form-control md:col-span-2">
                    <label class="label" for="edit-notes">
                      <span class="label-text">Notes</span>
                    </label>
                    <textarea
                      id="edit-notes"
                      bind:value={notes}
                      class="textarea textarea-bordered"
                      placeholder="Additional notes or details..."
                      rows="3"
                    ></textarea>
                  </div>

                </div>

                <!-- Applicable Roles -->
                <div class="form-control mt-6">
                  <label class="label" for="edit-roles">
                    <span class="label-text">Visible to Roles *</span>
                  </label>
                  <div id="edit-roles" class="flex flex-wrap gap-2">
                    {#each roleOptions as role}
                      <label class="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={applicable_roles.includes(role)}
                          on:change={() => toggleRole(role)}
                          class="checkbox checkbox-primary mr-2"
                        />
                        {role}
                      </label>
                    {/each}
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="form-control mt-6">
                  <div class="flex gap-3">
                    <button
                      class="btn btn-primary flex-1"
                      on:click={handleSave}
                      disabled={isSubmitting}
                    >
                      {#if isSubmitting}
                        <span class="loading loading-spinner loading-sm"></span>
                        Saving...
                      {:else}
                        <Icon icon="heroicons:check" class="w-5 h-5 mr-2" />
                        Save Changes
                      {/if}
                    </button>

                    <button
                      class="btn btn-ghost"
                      on:click={() => mode = 'view'}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

              </div>
            </div>
          {/if}

        </div>

        <!-- Sidebar -->
        <div class="space-y-6">

          <!-- Quick Actions -->
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title">
                <Icon icon="heroicons:bolt" class="w-5 h-5" />
                Quick Actions
              </h3>

              <div class="space-y-3">
                <button
                  class="btn btn-outline btn-block justify-start"
                  on:click={() => mode = mode === 'edit' ? 'view' : 'edit'}
                >
                  <Icon icon="heroicons:pencil" class="w-4 h-4 mr-2" />
                  {mode === 'edit' ? 'View Mode' : 'Edit Mode'}
                </button>

                <a href="/finances/create" class="btn btn-outline btn-block justify-start">
                  <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
                  Add New Record
                </a>

                <a href="/finances/dashboard" class="btn btn-outline btn-block justify-start">
                  <Icon icon="heroicons:chart-bar" class="w-4 h-4 mr-2" />
                  Back to Dashboard
                </a>
              </div>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="card bg-error/10 border border-error/20 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-error">
                <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
                Danger Zone
              </h3>

              <p class="text-sm text-base-content/70 mb-4">
                These actions cannot be undone. Please be certain.
              </p>

              <button
                class="btn btn-error btn-block"
                on:click={handleDelete}
              >
                <Icon icon="heroicons:trash" class="w-4 h-4 mr-2" />
                Delete Record
              </button>
            </div>
          </div>

          <!-- Discussion Forum -->
          {#if item}
            <DiscussionForum tableName="finances" recordId={itemId} />
          {/if}

        </div>

      </div>
    {/if}
  </div>
</div>