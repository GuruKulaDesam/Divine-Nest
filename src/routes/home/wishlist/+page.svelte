<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Family Wishlist";
  const pageDescription = "Track family wishes, gifts, and future purchases with priority management";

  // Wishlist item structure
  interface WishlistItem {
    id: string;
    item: string;
    category: string;
    forWhom: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    notes: string;
    status: 'pending' | 'purchased' | 'cancelled';
    estimatedCost?: number;
    targetDate?: string;
  }

  // Sample wishlist data
  let wishlist: WishlistItem[] = [
    {
      id: '1',
      item: 'iPhone 15 Pro',
      category: 'Electronics',
      forWhom: 'Father',
      priority: 'High',
      notes: 'Latest model with advanced camera features',
      status: 'pending',
      estimatedCost: 130000,
      targetDate: '2024-03-01'
    },
    {
      id: '2',
      item: 'Diamond Necklace',
      category: 'Jewelry',
      forWhom: 'Mother',
      priority: 'Medium',
      notes: 'Traditional South Indian design',
      status: 'pending',
      estimatedCost: 50000,
      targetDate: '2024-04-15'
    },
    {
      id: '3',
      item: 'Gaming Laptop',
      category: 'Electronics',
      forWhom: 'Son',
      priority: 'High',
      notes: 'For engineering studies and gaming',
      status: 'pending',
      estimatedCost: 80000,
      targetDate: '2024-02-01'
    },
    {
      id: '4',
      item: 'Kitchen Appliances Set',
      category: 'Home',
      forWhom: 'Family',
      priority: 'Medium',
      notes: 'Mixer, grinder, and induction cooktop',
      status: 'pending',
      estimatedCost: 25000
    },
    {
      id: '5',
      item: 'Bicycle',
      category: 'Sports',
      forWhom: 'Daughter',
      priority: 'Low',
      notes: 'For daily commute to school',
      status: 'pending',
      estimatedCost: 15000
    }
  ];

  // Form state
  let showAddForm = false;
  let editingItem: WishlistItem | null = null;

  let newItem = {
    item: '',
    category: '',
    forWhom: '',
    priority: 'Medium' as WishlistItem['priority'],
    notes: '',
    estimatedCost: '',
    targetDate: ''
  };

  // Categories and priorities
  const categories = [
    'Electronics',
    'Clothing',
    'Jewelry',
    'Home',
    'Sports',
    'Books',
    'Toys',
    'Health',
    'Education',
    'Travel',
    'Other'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'] as const;

  const familyMembers = [
    'Father',
    'Mother',
    'Son',
    'Daughter',
    'Family',
    'Grandparents',
    'Relatives',
    'Self'
  ];

  function addWishlistItem() {
    if (!newItem.item || !newItem.category || !newItem.forWhom) return;

    const item: WishlistItem = {
      id: Date.now().toString(),
      item: newItem.item,
      category: newItem.category,
      forWhom: newItem.forWhom,
      priority: newItem.priority,
      notes: newItem.notes,
      status: 'pending',
      estimatedCost: newItem.estimatedCost ? parseFloat(newItem.estimatedCost) : undefined,
      targetDate: newItem.targetDate || undefined
    };

    wishlist = [...wishlist, item];
    resetForm();
    showAddForm = false;
  }

  function editWishlistItem(item: WishlistItem) {
    editingItem = item;
    newItem = {
      item: item.item,
      category: item.category,
      forWhom: item.forWhom,
      priority: item.priority,
      notes: item.notes,
      estimatedCost: item.estimatedCost?.toString() || '',
      targetDate: item.targetDate || ''
    };
    showAddForm = true;
  }

  function updateWishlistItem() {
    if (!editingItem) return;

    wishlist = wishlist.map(item =>
      item.id === editingItem!.id
        ? {
            ...item,
            item: newItem.item,
            category: newItem.category,
            forWhom: newItem.forWhom,
            priority: newItem.priority,
            notes: newItem.notes,
            estimatedCost: newItem.estimatedCost ? parseFloat(newItem.estimatedCost) : undefined,
            targetDate: newItem.targetDate || undefined
          }
        : item
    );

    resetForm();
    showAddForm = false;
    editingItem = null;
  }

  function deleteWishlistItem(id: string) {
    wishlist = wishlist.filter(item => item.id !== id);
  }

  function markAsPurchased(id: string) {
    wishlist = wishlist.map(item =>
      item.id === id ? { ...item, status: 'purchased' } : item
    );
  }

  function resetForm() {
    newItem = {
      item: '',
      category: '',
      forWhom: '',
      priority: 'Medium',
      notes: '',
      estimatedCost: '',
      targetDate: ''
    };
  }

  function cancelEdit() {
    resetForm();
    showAddForm = false;
    editingItem = null;
  }

  // Priority color mapping
  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  }

  // Calculate totals
  $: totalEstimatedCost = wishlist
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + (item.estimatedCost || 0), 0);

  $: pendingItems = wishlist.filter(item => item.status === 'pending').length;
  $: purchasedItems = wishlist.filter(item => item.status === 'purchased').length;
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50 dark:from-slate-900 dark:to-rose-900 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
          <Icon icon="heroicons:heart" class="w-8 h-8 text-rose-600 dark:text-rose-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:shopping-bag" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Pending Items</p>
              <p class="text-2xl font-bold text-blue-600">{pendingItems}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Estimated Cost</p>
              <p class="text-2xl font-bold text-green-600">₹{totalEstimatedCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:check-circle" class="w-6 h-6 text-purple-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Purchased</p>
              <p class="text-2xl font-bold text-purple-600">{purchasedItems}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Form -->
    {#if showAddForm}
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mb-6" use:motionInView>
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingItem ? 'Edit Wishlist Item' : 'Add New Wishlist Item'}
        </h3>

        <form on:submit|preventDefault={editingItem ? updateWishlistItem : addWishlistItem} class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="wishlist-item" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item</label>
            <input
              id="wishlist-item"
              type="text"
              bind:value={newItem.item}
              placeholder="e.g., iPhone 15 Pro, Diamond Necklace"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label for="wishlist-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              id="wishlist-category"
              bind:value={newItem.category}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select category</option>
              {#each categories as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="wishlist-for-whom" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">For Whom</label>
            <select
              id="wishlist-for-whom"
              bind:value={newItem.forWhom}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select person</option>
              {#each familyMembers as member}
                <option value={member}>{member}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="wishlist-priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select
              id="wishlist-priority"
              bind:value={newItem.priority}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              {#each priorities as priority}
                <option value={priority}>{priority}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="wishlist-cost" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Cost (₹)</label>
            <input
              id="wishlist-cost"
              type="number"
              bind:value={newItem.estimatedCost}
              placeholder="50000"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label for="wishlist-target-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Date</label>
            <input
              id="wishlist-target-date"
              type="date"
              bind:value={newItem.targetDate}
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>

          <div class="md:col-span-2">
            <label for="wishlist-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              id="wishlist-notes"
              bind:value={newItem.notes}
              placeholder="Additional details about the item..."
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div class="md:col-span-2 flex gap-3">
            <button
              type="submit"
              class="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
            <button
              type="button"
              on:click={cancelEdit}
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex gap-3 mb-6">
      <button
        on:click={() => { showAddForm = !showAddForm; if (!showAddForm) cancelEdit(); }}
        class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        {showAddForm ? 'Cancel' : 'Add Item'}
      </button>
    </div>

    <!-- Wishlist Table -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden" use:motionInView>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">For Whom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Est. Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-slate-600">
            {#each wishlist as item (item.id)}
              <tr class="hover:bg-gray-50 dark:hover:bg-slate-700 {item.status === 'purchased' ? 'opacity-60' : ''}">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.item}
                  {#if item.status === 'purchased'}
                    <span class="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Purchased</span>
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {item.category}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {item.forWhom}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class="px-2 py-1 text-xs rounded-full {getPriorityColor(item.priority)}">
                    {item.priority}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {item.estimatedCost ? `₹${item.estimatedCost.toLocaleString()}` : '-'}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">
                  {item.notes || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex gap-2">
                    {#if item.status === 'pending'}
                      <button
                        on:click={() => markAsPurchased(item.id)}
                        class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        title="Mark as purchased"
                      >
                        <Icon icon="heroicons:check" class="w-4 h-4" />
                      </button>
                    {/if}
                    <button
                      on:click={() => editWishlistItem(item)}
                      class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    </button>
                    <button
                      on:click={() => deleteWishlistItem(item.id)}
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Icon icon="heroicons:trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if wishlist.length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:heart" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No wishlist items yet</h3>
          <p class="text-gray-500 dark:text-gray-400">Add items to your family wishlist to start tracking wishes and purchases.</p>
        </div>
      {/if}
    </div>
  </div>
</div>