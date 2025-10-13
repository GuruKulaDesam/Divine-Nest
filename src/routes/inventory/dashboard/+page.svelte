<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { inventory, inventoryActions } from '$lib/stores/inventory';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let voiceResult = '';
  let lowStockItems = [];
  let recentItems = [];
  let categoryChart;
  let locationChart;

  // Analytics
  $: totalItems = $inventory.length;
  $: lowStockCount = inventoryActions.getLowStockItems().length;
  $: categories = inventoryActions.getSummary().categories;
  $: locations = inventoryActions.getSummary().locations;
  $: mostCommonLocation = Object.entries(locations).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  onMount(() => {
    // Get low stock items
    lowStockItems = inventoryActions.getLowStockItems();

    // Get recent items (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    recentItems = $inventory.filter(item =>
      new Date(item.created_at) > sevenDaysAgo
    ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    initializeCharts();
  });

  function initializeCharts() {
    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      const categoryLabels = Object.keys(categories);
      const categoryData = Object.values(categories);

      categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
          labels: categoryLabels,
          datasets: [{
            data: categoryData,
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#6b7280'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // Location Distribution Chart
    const locationCtx = document.getElementById('locationChart');
    if (locationCtx) {
      const locationLabels = Object.keys(locations);
      const locationData = Object.values(locations);

      locationChart = new Chart(locationCtx, {
        type: 'bar',
        data: {
          labels: locationLabels,
          datasets: [{
            label: 'Items by Location',
            data: locationData,
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('add') || lowerResult.includes('stock')) {
      goto('/inventory/create');
    } else if (lowerResult.includes('low stock') || lowerResult.includes('restock')) {
      goto('/inventory/review?filter=low-stock');
    } else if (lowerResult.includes('kitchen') || lowerResult.includes('pantry')) {
      goto('/inventory/review?location=kitchen');
    }
  }

  function navigateToCreate() {
    goto('/inventory/create');
  }

  function navigateToUpdate(itemId) {
    goto(`/inventory/update?id=${itemId}`);
  }

  function navigateToReview() {
    goto('/inventory/review');
  }

  function quickRestock(itemId) {
    const item = inventoryActions.getById(itemId);
    if (item && item.restock_threshold) {
      const newQuantity = item.restock_threshold * 2; // Restock to double the threshold
      inventoryActions.updateQuantity(itemId, newQuantity);
      // Refresh low stock items
      lowStockItems = inventoryActions.getLowStockItems();
    }
  }
</script>

<svelte:head>
  <title>Inventory Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Inventory Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Inventory Dashboard</h1>
        <p class="text-base-content/70">Track household supplies, groceries, and essentials</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'add item' or 'show low stock'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Add Item
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

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Items</p>
              <p class="text-2xl font-bold text-primary">{totalItems}</p>
            </div>
            <Icon icon="heroicons:cube" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Low Stock Items</p>
              <p class="text-2xl font-bold text-warning">{lowStockCount}</p>
            </div>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Categories</p>
              <p class="text-2xl font-bold text-success">{Object.keys(categories).length}</p>
            </div>
            <Icon icon="heroicons:tag" class="w-8 h-8 text-success" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Locations</p>
              <p class="text-2xl font-bold text-info">{Object.keys(locations).length}</p>
            </div>
            <Icon icon="heroicons:map-pin" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Items by Category</h3>
          <canvas id="categoryChart" width="300" height="200"></canvas>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Items by Location</h3>
          <canvas id="locationChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Low Stock Alerts -->
    {#if lowStockItems.length > 0}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title text-warning">
            <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
            Low Stock Alerts ({lowStockItems.length})
          </h3>

          <div class="space-y-3">
            {#each lowStockItems.slice(0, 5) as item}
              <div class="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div class="flex items-center gap-3">
                  <Icon icon="heroicons:cube" class="w-5 h-5 text-warning" />
                  <div>
                    <p class="font-medium">{item.type} - {item.category}</p>
                    <p class="text-sm text-base-content/70">
                      {item.quantity_available} {item.unit} remaining
                      {#if item.restock_threshold}
                        (threshold: {item.restock_threshold} {item.unit})
                      {/if}
                    </p>
                    {#if item.location}
                      <p class="text-xs text-base-content/50">{item.location}</p>
                    {/if}
                  </div>
                </div>
                <button class="btn btn-sm btn-warning" on:click={() => quickRestock(item.id)}>
                  Restock
                </button>
              </div>
            {/each}
          </div>

          {#if lowStockItems.length > 5}
            <div class="text-center mt-4">
              <button class="btn btn-outline btn-sm" on:click={navigateToReview}>
                View All Low Stock Items
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Recent Additions -->
    {#if recentItems.length > 0}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">
            <Icon icon="heroicons:clock" class="w-5 h-5" />
            Recently Added Items
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each recentItems.slice(0, 6) as item}
              <div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors" on:click={() => navigateToUpdate(item.id)} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(item.id); } }}>
                <Icon icon="heroicons:cube" class="w-5 h-5 text-primary" />
                <div class="flex-1">
                  <p class="font-medium">{item.type} - {item.category}</p>
                  <p class="text-sm text-base-content/70">
                    {item.quantity_available} {item.unit}
                    {#if item.location}
                      • {item.location}
                    {/if}
                  </p>
                  <p class="text-xs text-base-content/50">
                    Added {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <!-- Quick Actions -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Quick Actions</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="btn btn-outline btn-lg h-auto py-4" on:click={navigateToCreate}>
            <div class="flex flex-col items-center gap-2">
              <Icon icon="heroicons:plus-circle" class="w-8 h-8" />
              <span>Add New Item</span>
            </div>
          </button>

          <button class="btn btn-outline btn-lg h-auto py-4" on:click={() => goto('/inventory/review?filter=low-stock')}>
            <div class="flex flex-col items-center gap-2">
              <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8" />
              <span>Manage Low Stock</span>
            </div>
          </button>

          <button class="btn btn-outline btn-lg h-auto py-4" on:click={navigateToReview}>
            <div class="flex flex-col items-center gap-2">
              <Icon icon="heroicons:eye" class="w-8 h-8" />
              <span>View All Items</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-center gap-4">
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
    <DiscussionForum tableName="inventory" recordId="dashboard" />

  </div>
</div>