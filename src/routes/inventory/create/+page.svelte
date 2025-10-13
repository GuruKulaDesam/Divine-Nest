<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { inventoryActions } from '$lib/stores/inventory';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let voiceResult = '';
  let isSubmitting = false;

  // Form data
  let type: 'Food Ingredient' | 'Grocery' | 'Toiletry' | 'Pooja Item' | 'Other' = 'Food Ingredient';
  let category: 'Dry Goods' | 'Fresh Produce' | 'Spices' | 'Cleaning' | 'Personal Care' | 'Ritual Supplies' = 'Dry Goods';
  let sub_category = '';
  let quantity_available = 0;
  let unit: 'g' | 'kg' | 'litre' | 'ml' | 'pieces' | 'packets' = 'kg';
  let location = '';
  let restock_threshold = 0;
  let preferred_vendor = '';
  let applicable_roles = ['Mother', 'Father'];

  // Available options
  const typeOptions = ['Food Ingredient', 'Grocery', 'Toiletry', 'Pooja Item', 'Other'];
  const categoryOptions = ['Dry Goods', 'Fresh Produce', 'Spices', 'Cleaning', 'Personal Care', 'Ritual Supplies'];
  const unitOptions = ['kg', 'g', 'litre', 'ml', 'pieces', 'packets'];
  const roleOptions = ['Mother', 'Father', 'Children', 'Elder', 'Cook', 'Driver', 'Maid'];

  // Category suggestions based on type
  $: categorySuggestions = getCategorySuggestions(type);

  function getCategorySuggestions(selectedType) {
    switch (selectedType) {
      case 'Food Ingredient':
        return ['Dry Goods', 'Fresh Produce', 'Spices'];
      case 'Grocery':
        return ['Dry Goods', 'Fresh Produce'];
      case 'Toiletry':
        return ['Cleaning', 'Personal Care'];
      case 'Pooja Item':
        return ['Ritual Supplies'];
      default:
        return categoryOptions;
    }
  }

  // Update category when type changes
  $: if (categorySuggestions.length > 0 && !categorySuggestions.includes(category)) {
    category = categorySuggestions[0];
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('add rice') || lowerResult.includes('rice')) {
      type = 'Grocery';
      category = 'Dry Goods';
      sub_category = 'Rice';
      unit = 'kg';
      quantity_available = 5;
      location = 'Pantry';
      restock_threshold = 2;
    } else if (lowerResult.includes('add soap') || lowerResult.includes('soap')) {
      type = 'Toiletry';
      category = 'Personal Care';
      sub_category = 'Soap';
      unit = 'pieces';
      quantity_available = 6;
      location = 'Bathroom Shelf';
      restock_threshold = 3;
    } else if (lowerResult.includes('add spice') || lowerResult.includes('masala')) {
      type = 'Food Ingredient';
      category = 'Spices';
      sub_category = 'Masala';
      unit = 'kg';
      quantity_available = 1;
      location = 'Kitchen Cabinet';
      restock_threshold = 0.5;
    } else if (lowerResult.includes('add vegetable') || lowerResult.includes('vegetables')) {
      type = 'Food Ingredient';
      category = 'Fresh Produce';
      sub_category = 'Vegetables';
      unit = 'kg';
      quantity_available = 2;
      location = 'Refrigerator';
      restock_threshold = 1;
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
    if (isSubmitting) return;

    // Validation
    if (!type || !category || quantity_available < 0) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (applicable_roles.length === 0) {
      alert('Please select at least one applicable role.');
      return;
    }

    isSubmitting = true;

    try {
      const newItem = inventoryActions.add({
        type,
        category,
        sub_category: sub_category || undefined,
        quantity_available,
        unit,
        location: location || undefined,
        restock_threshold: restock_threshold > 0 ? restock_threshold : undefined,
        preferred_vendor: preferred_vendor || undefined,
        applicable_roles,
        added_by: $userProfile.name || 'Unknown'
      });

      // Success - navigate to update page to view/edit the new item
      goto(`/inventory/update?id=${newItem.id}`);
    } catch (error) {
      console.error('Error adding inventory item:', error);
      alert('Failed to add inventory item. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function navigateToDashboard() {
    goto('/inventory/dashboard');
  }

  function navigateToReview() {
    goto('/inventory/review');
  }

  function resetForm() {
    type = 'Food Ingredient';
    category = 'Dry Goods';
    sub_category = '';
    quantity_available = 0;
    unit = 'kg';
    location = '';
    restock_threshold = 0;
    preferred_vendor = '';
    applicable_roles = ['Mother', 'Father'];
  }
</script>

<svelte:head>
  <title>Add Inventory Item - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto space-y-6">

    <Breadcrumb currentPage="Add Inventory Item" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Add Inventory Item</h1>
        <p class="text-base-content/70">Add new items to track household supplies and groceries</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'add rice' or 'add soap'" />
        <button class="btn btn-outline" on:click={navigateToDashboard}>
          <Icon icon="heroicons:home" class="w-4 h-4" />
          Dashboard
        </button>
      </div>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Form -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Type -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select bind:value={type} class="select select-bordered">
              {#each typeOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <!-- Category -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select bind:value={category} class="select select-bordered">
              {#each categorySuggestions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <!-- Sub Category -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Sub Category</span>
            </label>
            <input
              type="text"
              bind:value={sub_category}
              class="input input-bordered"
              placeholder="e.g., Rice, Soap, Masala..."
            />
          </div>

          <!-- Quantity Available -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Quantity Available *</span>
            </label>
            <div class="flex gap-2">
              <input
                type="number"
                bind:value={quantity_available}
                class="input input-bordered flex-1"
                min="0"
                step="0.1"
                placeholder="0"
              />
              <select bind:value={unit} class="select select-bordered w-24">
                {#each unitOptions as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Location -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              bind:value={location}
              class="input input-bordered"
              placeholder="e.g., Kitchen Cabinet, Pantry, Bathroom..."
            />
          </div>

          <!-- Restock Threshold -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Restock Threshold</span>
            </label>
            <div class="flex gap-2">
              <input
                type="number"
                bind:value={restock_threshold}
                class="input input-bordered flex-1"
                min="0"
                step="0.1"
                placeholder="0"
              />
              <span class="flex items-center text-sm text-base-content/70">{unit}</span>
            </div>
            <label class="label">
              <span class="label-text-alt text-xs">Alert when quantity drops below this level</span>
            </label>
          </div>

          <!-- Preferred Vendor -->
          <div class="form-control md:col-span-2">
            <label class="label">
              <span class="label-text">Preferred Vendor</span>
            </label>
            <input
              type="text"
              bind:value={preferred_vendor}
              class="input input-bordered"
              placeholder="e.g., Local Market, Big Bazaar, Temple Store..."
            />
          </div>

        </div>

        <!-- Applicable Roles -->
        <div class="form-control mt-6">
          <label class="label">
            <span class="label-text">Applicable Roles *</span>
          </label>
          <div class="flex flex-wrap gap-2">
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
          <label class="label">
            <span class="label-text-alt text-xs">Select who can see and manage this item</span>
          </label>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center mt-8">
          <button class="btn btn-ghost" on:click={resetForm}>
            <Icon icon="heroicons:arrow-path" class="w-4 h-4" />
            Reset Form
          </button>

          <div class="flex gap-2">
            <button class="btn btn-outline" on:click={navigateToReview}>
              <Icon icon="heroicons:eye" class="w-4 h-4" />
              View All Items
            </button>
            <button class="btn btn-primary" on:click={handleSubmit} disabled={isSubmitting}>
              {#if isSubmitting}
                <span class="loading loading-spinner loading-sm"></span>
              {/if}
              <Icon icon="heroicons:plus" class="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Quick Add Suggestions -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Quick Add Suggestions</h3>
        <p class="text-sm text-base-content/70 mb-4">Try voice commands like:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-base-200 rounded-lg">
            <p class="font-medium">"Add rice"</p>
            <p class="text-sm text-base-content/70">Adds 5kg rice to pantry</p>
          </div>
          <div class="p-3 bg-base-200 rounded-lg">
            <p class="font-medium">"Add soap"</p>
            <p class="text-sm text-base-content/70">Adds 6 pieces soap to bathroom</p>
          </div>
          <div class="p-3 bg-base-200 rounded-lg">
            <p class="font-medium">"Add masala"</p>
            <p class="text-sm text-base-content/70">Adds 1kg masala to kitchen</p>
          </div>
          <div class="p-3 bg-base-200 rounded-lg">
            <p class="font-medium">"Add vegetables"</p>
            <p class="text-sm text-base-content/70">Adds 2kg vegetables to fridge</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="inventory" recordId="create" />

  </div>
</div>