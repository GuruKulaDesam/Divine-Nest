<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import type { InventoryItem } from '$lib/models';
  import { inventoryActions } from '$lib/stores/inventory';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let voiceResult = '';
  let isSubmitting = false;
  let mode = 'view'; // 'view', 'edit', 'restock'
  let item: InventoryItem | null = null;
  let itemId = '';

  // Form data
  let type: InventoryItem['type'] = 'Food Ingredient';
  let category: InventoryItem['category'] = 'Dry Goods';
  let sub_category = '';
  let quantity_available = 0;
  let unit: InventoryItem['unit'] = 'kg';
  let location = '';
  let restock_threshold = 0;
  let preferred_vendor = '';
  let applicable_roles: string[] = [];

  // Restock form
  let restockQuantity = 0;
  let restockReason = '';

  // Available options
  const typeOptions = ['Food Ingredient', 'Grocery', 'Toiletry', 'Pooja Item', 'Other'];
  const categoryOptions = ['Dry Goods', 'Fresh Produce', 'Spices', 'Cleaning', 'Personal Care', 'Ritual Supplies'];
  const unitOptions = ['kg', 'g', 'litre', 'ml', 'pieces', 'packets'];
  const roleOptions = ['Mother', 'Father', 'Children', 'Elder', 'Cook', 'Driver', 'Maid'];
  const restockReasons = ['Purchase', 'Gift', 'Return', 'Adjustment', 'Consumption Correction'];

  onMount(() => {
    const urlParams = new URLSearchParams($page.url.search);
    itemId = urlParams.get('id') || '';

    if (itemId) {
      loadItem();
    } else {
      goto('/inventory/dashboard');
    }
  });

  function loadItem() {
    const foundItem = inventoryActions.getById(itemId);
    if (foundItem) {
      item = foundItem;
      populateForm();
    } else {
      goto('/inventory/dashboard');
    }
  }

  function populateForm() {
    if (!item) return;

    type = item.type;
    category = item.category;
    sub_category = item.sub_category || '';
    quantity_available = item.quantity_available;
    unit = item.unit;
    location = item.location || '';
    restock_threshold = item.restock_threshold || 0;
    preferred_vendor = item.preferred_vendor || '';
    applicable_roles = [...item.applicable_roles];
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('edit') || lowerResult.includes('change')) {
      mode = 'edit';
    } else if (lowerResult.includes('restock') || lowerResult.includes('add stock')) {
      mode = 'restock';
      restockQuantity = item?.restock_threshold ? item.restock_threshold * 2 - item.quantity_available : 1;
    } else if (lowerResult.includes('consume') || lowerResult.includes('used')) {
      const consumeMatch = result.match(/(\d+(?:\.\d+)?)/);
      if (consumeMatch) {
        const consumeAmount = parseFloat(consumeMatch[1]);
        if (item && consumeAmount > 0) {
          const newQuantity = Math.max(0, item.quantity_available - consumeAmount);
          inventoryActions.updateQuantity(itemId, newQuantity);
          loadItem(); // Refresh data
        }
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

  function switchMode(newMode) {
    mode = newMode;
    if (newMode === 'restock' && item) {
      restockQuantity = item.restock_threshold ? Math.max(0, item.restock_threshold * 2 - item.quantity_available) : 1;
    }
  }

  async function handleEditSubmit() {
    if (isSubmitting || !item) return;

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
      inventoryActions.update(itemId, {
        type,
        category,
        sub_category: sub_category || undefined,
        quantity_available,
        unit,
        location: location || undefined,
        restock_threshold: restock_threshold > 0 ? restock_threshold : undefined,
        preferred_vendor: preferred_vendor || undefined,
        applicable_roles
      });

      mode = 'view';
      loadItem(); // Refresh data
    } catch (error) {
      console.error('Error updating inventory item:', error);
      alert('Failed to update inventory item. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  async function handleRestockSubmit() {
    if (isSubmitting || !item) return;

    if (restockQuantity <= 0) {
      alert('Please enter a valid restock quantity.');
      return;
    }

    isSubmitting = true;

    try {
      const newQuantity = item.quantity_available + restockQuantity;
      inventoryActions.updateQuantity(itemId, newQuantity);

      // Reset form
      restockQuantity = 0;
      restockReason = '';
      mode = 'view';
      loadItem(); // Refresh data
    } catch (error) {
      console.error('Error restocking item:', error);
      alert('Failed to restock item. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function handleConsume(consumeAmount) {
    if (!item || consumeAmount <= 0) return;

    const newQuantity = Math.max(0, item.quantity_available - consumeAmount);
    inventoryActions.updateQuantity(itemId, newQuantity);
    loadItem(); // Refresh data
  }

  function deleteItem() {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      inventoryActions.delete(itemId);
      goto('/inventory/dashboard');
    }
  }

  function navigateToDashboard() {
    goto('/inventory/dashboard');
  }

  function navigateToCreate() {
    goto('/inventory/create');
  }

  function navigateToReview() {
    goto('/inventory/review');
  }

  // Computed properties
  $: isLowStock = item && item.restock_threshold && item.quantity_available <= item.restock_threshold;
  $: stockStatus = item ? (isLowStock ? 'Low Stock' : 'In Stock') : '';
  $: stockStatusColor = isLowStock ? 'text-warning' : 'text-success';
</script>

<svelte:head>
  <title>Manage Inventory Item - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto space-y-6">

    <Breadcrumb currentPage="Manage Inventory Item" />

    <!-- Header -->
    {#if item}
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-base-content">{item.type} - {item.category}</h1>
          <p class="text-base-content/70">
            {#if item.sub_category}{item.sub_category} • {/if}
            <span class={stockStatusColor}>{stockStatus}</span>
          </p>
        </div>
        <div class="flex gap-2">
          <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'edit' or 'restock'" />
          <button class="btn btn-outline" on:click={navigateToDashboard}>
            <Icon icon="heroicons:home" class="w-4 h-4" />
            Dashboard
          </button>
        </div>
      </div>
    {/if}

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Mode Tabs -->
    {#if item}
      <div class="tabs tabs-boxed">
        <button class="tab {mode === 'view' ? 'tab-active' : ''}" on:click={() => switchMode('view')}>
          <Icon icon="heroicons:eye" class="w-4 h-4" />
          View
        </button>
        <button class="tab {mode === 'edit' ? 'tab-active' : ''}" on:click={() => switchMode('edit')}>
          <Icon icon="heroicons:pencil" class="w-4 h-4" />
          Edit
        </button>
        <button class="tab {mode === 'restock' ? 'tab-active' : ''}" on:click={() => switchMode('restock')}>
          <Icon icon="heroicons:plus-circle" class="w-4 h-4" />
          Restock
        </button>
      </div>
    {/if}

    <!-- View Mode -->
    {#if mode === 'view' && item}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Item Details -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">
              <Icon icon="heroicons:cube" class="w-5 h-5" />
              Item Details
            </h3>

            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-base-content/70">Type:</span>
                <span class="font-medium">{item.type}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/70">Category:</span>
                <span class="font-medium">{item.category}</span>
              </div>
              {#if item.sub_category}
                <div class="flex justify-between">
                  <span class="text-base-content/70">Sub Category:</span>
                  <span class="font-medium">{item.sub_category}</span>
                </div>
              {/if}
              <div class="flex justify-between">
                <span class="text-base-content/70">Current Quantity:</span>
                <span class="font-medium {isLowStock ? 'text-warning' : 'text-success'}">
                  {item.quantity_available} {item.unit}
                </span>
              </div>
              {#if item.restock_threshold}
                <div class="flex justify-between">
                  <span class="text-base-content/70">Restock Threshold:</span>
                  <span class="font-medium">{item.restock_threshold} {item.unit}</span>
                </div>
              {/if}
              {#if item.location}
                <div class="flex justify-between">
                  <span class="text-base-content/70">Location:</span>
                  <span class="font-medium">{item.location}</span>
                </div>
              {/if}
              {#if item.preferred_vendor}
                <div class="flex justify-between">
                  <span class="text-base-content/70">Preferred Vendor:</span>
                  <span class="font-medium">{item.preferred_vendor}</span>
                </div>
              {/if}
              <div class="flex justify-between">
                <span class="text-base-content/70">Last Updated:</span>
                <span class="font-medium">{new Date(item.last_updated).toLocaleDateString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-base-content/70">Added By:</span>
                <span class="font-medium">{item.added_by}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">
              <Icon icon="heroicons:bolt" class="w-5 h-5" />
              Quick Actions
            </h3>

            <div class="space-y-3">
              <button class="btn btn-warning btn-block" on:click={() => switchMode('restock')}>
                <Icon icon="heroicons:plus-circle" class="w-4 h-4" />
                Restock Item
              </button>

              <div class="divider">Consume</div>

              <div class="grid grid-cols-3 gap-2">
                <button class="btn btn-sm" on:click={() => handleConsume(0.5)}>
                  -0.5
                </button>
                <button class="btn btn-sm" on:click={() => handleConsume(1)}>
                  -1
                </button>
                <button class="btn btn-sm" on:click={() => handleConsume(2)}>
                  -2
                </button>
              </div>

              <div class="divider">Roles</div>

              <div class="flex flex-wrap gap-1">
                {#each item.applicable_roles as role}
                  <div class="badge badge-outline">{role}</div>
                {/each}
              </div>
            </div>
          </div>
        </div>

      </div>
    {/if}

    <!-- Edit Mode -->
    {#if mode === 'edit' && item}
      <div class="card bg-base-100 shadow-xl">
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
              <select id="edit-category" bind:value={category} class="select select-bordered">
                {#each categoryOptions as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
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
                placeholder="e.g., Rice, Soap, Masala..."
              />
            </div>

            <!-- Quantity Available -->
            <div class="form-control">
              <label class="label" for="edit-quantity">
                <span class="label-text">Quantity Available *</span>
              </label>
              <div class="flex gap-2">
                <input
                  id="edit-quantity"
                  type="number"
                  bind:value={quantity_available}
                  class="input input-bordered flex-1"
                  min="0"
                  step="0.1"
                />
                <select id="edit-unit" bind:value={unit} class="select select-bordered w-24">
                  {#each unitOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              </div>
            </div>

            <!-- Location -->
            <div class="form-control">
              <label class="label" for="edit-location">
                <span class="label-text">Location</span>
              </label>
              <input
                id="edit-location"
                type="text"
                bind:value={location}
                class="input input-bordered"
                placeholder="e.g., Kitchen Cabinet, Pantry, Bathroom..."
              />
            </div>

            <!-- Restock Threshold -->
            <div class="form-control">
              <label class="label" for="edit-threshold">
                <span class="label-text">Restock Threshold</span>
              </label>
              <input
                id="edit-threshold"
                type="number"
                bind:value={restock_threshold}
                class="input input-bordered"
                min="0"
                step="0.1"
                placeholder="0"
              />
            </div>

            <!-- Preferred Vendor -->
            <div class="form-control md:col-span-2">
              <label class="label" for="edit-vendor">
                <span class="label-text">Preferred Vendor</span>
              </label>
              <input
                id="edit-vendor"
                type="text"
                bind:value={preferred_vendor}
                class="input input-bordered"
                placeholder="e.g., Local Market, Big Bazaar, Temple Store..."
              />
            </div>

          </div>

          <!-- Applicable Roles -->
          <div class="form-control mt-6">
            <label class="label" for="applicable-roles">
              <span class="label-text">Applicable Roles *</span>
            </label>
            <div id="applicable-roles" class="flex flex-wrap gap-2">
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

          <!-- Actions -->
          <div class="flex justify-between items-center mt-8">
            <button class="btn btn-error btn-outline" on:click={deleteItem}>
              <Icon icon="heroicons:trash" class="w-4 h-4" />
              Delete Item
            </button>

            <div class="flex gap-2">
              <button class="btn btn-outline" on:click={() => switchMode('view')}>
                Cancel
              </button>
              <button class="btn btn-primary" on:click={handleEditSubmit} disabled={isSubmitting}>
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                {/if}
                <Icon icon="heroicons:check" class="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>
    {/if}

    <!-- Restock Mode -->
    {#if mode === 'restock' && item}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">
            <Icon icon="heroicons:plus-circle" class="w-5 h-5" />
            Restock Item
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Current Stock -->
            <div class="stat">
              <div class="stat-title">Current Quantity</div>
              <div class="stat-value {isLowStock ? 'text-warning' : 'text-success'}">
                {item.quantity_available} {item.unit}
              </div>
              <div class="stat-desc">
                {#if item.restock_threshold}
                  Threshold: {item.restock_threshold} {item.unit}
                {/if}
              </div>
            </div>

            <!-- Restock Form -->
            <div class="space-y-4">
              <div class="form-control">
                <label class="label" for="restock-quantity">
                  <span class="label-text">Restock Quantity *</span>
                </label>
                <div class="flex gap-2">
                  <input
                    id="restock-quantity"
                    type="number"
                    bind:value={restockQuantity}
                    class="input input-bordered flex-1"
                    min="0.1"
                    step="0.1"
                    placeholder="0"
                  />
                  <span class="flex items-center text-sm text-base-content/70">{item.unit}</span>
                </div>
              </div>

              <div class="form-control">
                <label class="label" for="restock-reason">
                  <span class="label-text">Reason</span>
                </label>
                <select id="restock-reason" bind:value={restockReason} class="select select-bordered">
                  <option value="">Select reason (optional)</option>
                  {#each restockReasons as reason}
                    <option value={reason}>{reason}</option>
                  {/each}
                </select>
              </div>

              <!-- Preview -->
              {#if restockQuantity > 0}
                <div class="alert alert-info">
                  <Icon icon="heroicons:calculator" class="w-5 h-5" />
                  <div>
                    <div>New quantity will be: <strong>{item.quantity_available + restockQuantity} {item.unit}</strong></div>
                    {#if item.restock_threshold && item.quantity_available + restockQuantity > item.restock_threshold}
                      <div class="text-sm">✅ Will be above restock threshold</div>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>

          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 mt-8">
            <button class="btn btn-outline" on:click={() => switchMode('view')}>
              Cancel
            </button>
            <button class="btn btn-primary" on:click={handleRestockSubmit} disabled={isSubmitting || restockQuantity <= 0}>
              {#if isSubmitting}
                <span class="loading loading-spinner loading-sm"></span>
              {/if}
              <Icon icon="heroicons:plus" class="w-4 h-4" />
              Restock Item
            </button>
          </div>

        </div>
      </div>
    {/if}

    <!-- Navigation -->
    <div class="flex justify-center gap-4">
      <button class="btn btn-outline" on:click={navigateToDashboard}>
        <Icon icon="heroicons:home" class="w-4 h-4" />
        Dashboard
      </button>
      <button class="btn btn-outline" on:click={navigateToCreate}>
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        Add Item
      </button>
      <button class="btn btn-outline" on:click={navigateToReview}>
        <Icon icon="heroicons:eye" class="w-4 h-4" />
        View All
      </button>
    </div>

    <!-- Discussion Forum -->
    {#if item}
      <DiscussionForum tableName="inventory" recordId={itemId} />
    {/if}

  </div>
</div>