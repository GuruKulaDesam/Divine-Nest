<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { finances, financeActions } from '$lib/stores/finances';
  import { userProfile } from '$lib/stores/userProfile';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import Icon from '@iconify/svelte';

  // Form data
  let type = 'Expenses';
  let category = '';
  let sub_category = '';
  let amount = '';
  let recurring = 'None';
  let date = new Date().toISOString().split('T')[0];
  let actor = '';
  let source = 'Manual';
  let notes = '';
  let applicable_roles = ['Parent', 'Adult'];

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

  function getCategorySuggestions(type) {
    const suggestions = {
      'Budget': ['Monthly Budget', 'Annual Budget', 'Project Budget'],
      'Income': ['Salary', 'Business', 'Freelance', 'Investment', 'Gift', 'Other'],
      'Expenses': ['Groceries', 'Utilities', 'Transportation', 'Education', 'Healthcare', 'Entertainment', 'Household', 'Personal', 'Other'],
      'Savings': ['Emergency Fund', 'Investment', 'Retirement', 'Education Fund', 'Vacation Fund', 'Other']
    };
    return suggestions[type] || [];
  }

  // Voice command handler
  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('add') && lowerCommand.includes('income')) {
      type = 'Income';
      category = 'Salary';
    } else if (lowerCommand.includes('add') && lowerCommand.includes('expense')) {
      type = 'Expenses';
      category = 'Groceries';
    } else if (lowerCommand.includes('set') && lowerCommand.includes('budget')) {
      type = 'Budget';
      category = 'Monthly Budget';
    } else if (lowerCommand.includes('save') && lowerCommand.includes('money')) {
      type = 'Savings';
      category = 'Emergency Fund';
    }

    // Extract amount if mentioned
    const amountMatch = lowerCommand.match(/(\d+(?:\.\d+)?)\s*(rupees?|rs|₹)/i);
    if (amountMatch) {
      amount = amountMatch[1];
    }

    // Extract category if mentioned
    for (const cat of categorySuggestions) {
      if (lowerCommand.includes(cat.toLowerCase())) {
        category = cat;
        break;
      }
    }
  }

  function toggleRole(role) {
    if (applicable_roles.includes(role)) {
      applicable_roles = applicable_roles.filter(r => r !== role);
    } else {
      applicable_roles = [...applicable_roles, role];
    }
  }

  async function handleSubmit() {
    if (!type || !category || !amount || !actor) {
      alert('Please fill in all required fields');
      return;
    }

    isSubmitting = true;

    try {
      const financeData = {
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

      financeActions.add(financeData);

      // Navigate back to dashboard
      goto('/finances/dashboard');
    } catch (error) {
      console.error('Error saving finance record:', error);
      alert('Failed to save finance record. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  // Handle URL parameters
  onMount(() => {
    // Get current user
    userProfile.subscribe(profile => {
      currentUser = profile?.name || 'Family Member';
      userRole = profile?.role || 'Parent';
      actor = currentUser;
    });

    // Check URL parameters
    const urlParams = new URLSearchParams($page.url.search);
    const typeParam = urlParams.get('type');
    if (typeParam && typeOptions.includes(typeParam)) {
      type = typeParam;
    }
  });
</script>

<svelte:head>
  <title>Add Finance Record - Divine Nest</title>
  <meta name="description" content="Add new income, expense, budget, or savings record" />
</svelte:head>

<div class="min-h-screen bg-base-200">
  <!-- Breadcrumb -->
  <Breadcrumb currentPage="Add Finance Record" />

  <!-- Header -->
  <div class="bg-base-100 shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-base-content flex items-center gap-2">
            <Icon icon="heroicons:plus-circle" class="w-8 h-8 text-primary" />
            Add Finance Record
          </h1>
          <p class="text-base-content/70 mt-1">
            Record income, expenses, budgets, or savings for better financial tracking
          </p>
        </div>

        <!-- Voice Input -->
        <VoiceInput
          placeholder="Say 'add grocery expense 500 rupees'..."
          onResult={handleVoiceCommand}
        />
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <form on:submit|preventDefault={handleSubmit} class="card bg-base-100 shadow-lg">
        <div class="card-body">

          <!-- Type Selection -->
          <div class="form-control">
            <label class="label" for="type">
              <span class="label-text">Type *</span>
            </label>
            <select id="type" bind:value={type} class="select select-bordered">
              {#each typeOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <!-- Category -->
          <div class="form-control">
            <label class="label" for="category">
              <span class="label-text">Category *</span>
            </label>
            <input
              id="category"
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
            <label class="label" for="sub-category">
              <span class="label-text">Sub Category</span>
            </label>
            <input
              id="sub-category"
              type="text"
              bind:value={sub_category}
              class="input input-bordered"
              placeholder="Optional sub-category..."
            />
          </div>

          <!-- Amount -->
          <div class="form-control">
            <label class="label" for="amount">
              <span class="label-text">Amount (₹) *</span>
            </label>
            <input
              id="amount"
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
            <label class="label" for="recurring">
              <span class="label-text">Recurring</span>
            </label>
            <select id="recurring" bind:value={recurring} class="select select-bordered">
              {#each recurringOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <!-- Date -->
          <div class="form-control">
            <label class="label" for="date">
              <span class="label-text">Date *</span>
            </label>
            <input
              id="date"
              type="date"
              bind:value={date}
              class="input input-bordered"
              required
            />
          </div>

          <!-- Actor -->
          <div class="form-control">
            <label class="label" for="actor">
              <span class="label-text">Recorded By *</span>
            </label>
            <input
              id="actor"
              type="text"
              bind:value={actor}
              class="input input-bordered"
              placeholder="Who recorded this transaction..."
              required
            />
          </div>

          <!-- Source -->
          <div class="form-control">
            <label class="label" for="source">
              <span class="label-text">Source</span>
            </label>
            <select id="source" bind:value={source} class="select select-bordered">
              {#each sourceOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <!-- Notes -->
          <div class="form-control">
            <label class="label" for="notes">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              id="notes"
              bind:value={notes}
              class="textarea textarea-bordered"
              placeholder="Additional notes or details..."
              rows="3"
            ></textarea>
          </div>

          <!-- Applicable Roles -->
          <div class="form-control">
            <label class="label" for="roles">
              <span class="label-text">Visible to Roles *</span>
            </label>
            <div id="roles" class="flex flex-wrap gap-2">
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

          <!-- Submit Buttons -->
          <div class="form-control mt-6">
            <div class="flex gap-3">
              <button
                type="submit"
                class="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                  Saving...
                {:else}
                  <Icon icon="heroicons:check" class="w-5 h-5 mr-2" />
                  Save Record
                {/if}
              </button>

              <button
                type="button"
                class="btn btn-ghost"
                on:click={() => goto('/finances/dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      </form>

      <!-- Quick Tips -->
      <div class="card bg-base-100 shadow-lg mt-6">
        <div class="card-body">
          <h3 class="card-title text-lg">
            <Icon icon="heroicons:light-bulb" class="w-5 h-5" />
            Quick Tips
          </h3>
          <ul class="list-disc list-inside space-y-2 text-sm text-base-content/70">
            <li>Use voice commands like "add grocery expense 500 rupees" for faster entry</li>
            <li>Set up recurring budgets for consistent financial planning</li>
            <li>Categorize expenses properly for better tracking and analysis</li>
            <li>Record savings goals to track progress towards financial objectives</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>