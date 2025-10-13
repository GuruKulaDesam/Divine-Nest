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

  let searchTerm = '';
  let typeFilter = 'all';
  let categoryFilter = 'all';
  let locationFilter = 'all';
  let stockStatusFilter = 'all';
  let sortBy = 'last_updated';
  let sortOrder = 'desc';
  let voiceResult = '';

  let categoryChart;
  let locationChart;
  let stockStatusChart;

  // Filter and search items
  $: filteredItems = $inventory.filter(item => {
    const matchesSearch = !searchTerm ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sub_category && item.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || item.location === locationFilter;

    let matchesStockStatus = true;
    if (stockStatusFilter !== 'all') {
      const isLowStock = item.restock_threshold && item.quantity_available <= item.restock_threshold;
      switch (stockStatusFilter) {
        case 'low-stock':
          matchesStockStatus = isLowStock;
          break;
        case 'in-stock':
          matchesStockStatus = !isLowStock;
          break;
        case 'out-of-stock':
          matchesStockStatus = item.quantity_available === 0;
          break;
      }
    }

    return matchesSearch && matchesType && matchesCategory && matchesLocation && matchesStockStatus;
  });

  // Sort items
  $: sortedItems = [...filteredItems].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'type':
        aVal = a.type.toLowerCase();
        bVal = b.type.toLowerCase();
        break;
      case 'category':
        aVal = a.category.toLowerCase();
        bVal = b.category.toLowerCase();
        break;
      case 'quantity_available':
        aVal = a.quantity_available;
        bVal = b.quantity_available;
        break;
      case 'last_updated':
        aVal = new Date(a.last_updated);
        bVal = new Date(b.last_updated);
        break;
      case 'created_at':
        aVal = new Date(a.created_at);
        bVal = new Date(b.created_at);
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Analytics
  $: totalItems = filteredItems.length;
  $: lowStockItems = filteredItems.filter(item => item.restock_threshold && item.quantity_available <= item.restock_threshold).length;
  $: outOfStockItems = filteredItems.filter(item => item.quantity_available === 0).length;
  $: totalValue = filteredItems.reduce((sum, item) => sum + item.quantity_available, 0);
  $: uniqueLocations = new Set(filteredItems.map(item => item.location).filter(Boolean)).size;

  onMount(() => {
    initializeCharts();
  });

  function initializeCharts() {
    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      const categories = {};
      filteredItems.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
      });

      const categoryLabels = Object.keys(categories);
      const categoryData = Object.values(categories);

      categoryChart = new Chart(categoryCtx, {
        type: 'pie',
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
      const locations = {};
      filteredItems.forEach(item => {
        if (item.location) {
          locations[item.location] = (locations[item.location] || 0) + 1;
        }
      });

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

    // Stock Status Chart
    const stockCtx = document.getElementById('stockStatusChart');
    if (stockCtx) {
      const inStock = filteredItems.filter(item => !item.restock_threshold || item.quantity_available > item.restock_threshold).length;
      const lowStock = filteredItems.filter(item => item.restock_threshold && item.quantity_available <= item.restock_threshold && item.quantity_available > 0).length;
      const outOfStock = filteredItems.filter(item => item.quantity_available === 0).length;

      stockStatusChart = new Chart(stockCtx, {
        type: 'doughnut',
        data: {
          labels: ['In Stock', 'Low Stock', 'Out of Stock'],
          datasets: [{
            data: [inStock, lowStock, outOfStock],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('show low stock') || lowerResult.includes('low stock')) {
      stockStatusFilter = 'low-stock';
    } else if (lowerResult.includes('show kitchen') || lowerResult.includes('kitchen items')) {
      locationFilter = 'Kitchen Cabinet';
    } else if (lowerResult.includes('show pantry')) {
      locationFilter = 'Pantry';
    } else if (lowerResult.includes('search for')) {
      const searchMatch = result.match(/search for (.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    }
  }

  function exportToCSV() {
    const headers = ['Type', 'Category', 'Sub Category', 'Quantity', 'Unit', 'Location', 'Restock Threshold', 'Preferred Vendor', 'Last Updated', 'Added By'];
    const csvContent = [
      headers.join(','),
      ...sortedItems.map(item => [
        `"${item.type}"`,
        `"${item.category}"`,
        `"${item.sub_category || ''}"`,
        item.quantity_available,
        item.unit,
        `"${item.location || ''}"`,
        item.restock_threshold || '',
        `"${item.preferred_vendor || ''}"`,
        item.last_updated,
        `"${item.added_by}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(sortedItems, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToDashboard() {
    goto('/inventory/dashboard');
  }

  function navigateToCreate() {
    goto('/inventory/create');
  }

  function navigateToUpdate(itemId) {
    goto(`/inventory/update?id=${itemId}`);
  }

  function quickRestock(itemId) {
    const item = inventoryActions.getById(itemId);
    if (item && item.restock_threshold) {
      const newQuantity = item.restock_threshold * 2;
      inventoryActions.updateQuantity(itemId, newQuantity);
    }
  }
</script>

<svelte:head>
  <title>Review Inventory - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Review Inventory" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Review Inventory</h1>
        <p class="text-base-content/70">Comprehensive view of all household supplies and groceries</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'show low stock' or 'search for rice'" />
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
              <p class="text-2xl font-bold text-warning">{lowStockItems}</p>
            </div>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Out of Stock</p>
              <p class="text-2xl font-bold text-error">{outOfStockItems}</p>
            </div>
            <Icon icon="heroicons:x-circle" class="w-8 h-8 text-error" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Locations</p>
              <p class="text-2xl font-bold text-info">{uniqueLocations}</p>
            </div>
            <Icon icon="heroicons:map-pin" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Stock Status</h3>
          <canvas id="stockStatusChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Filters & Search</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          <div class="form-control">
            <label class="label" for="search-input">
              <span class="label-text">Search</span>
            </label>
            <input
              id="search-input"
              type="text"
              bind:value={searchTerm}
              class="input input-bordered"
              placeholder="Item name, category, location..."
            />
          </div>

          <div class="form-control">
            <label class="label" for="type-filter">
              <span class="label-text">Type</span>
            </label>
            <select id="type-filter" bind:value={typeFilter} class="select select-bordered">
              <option value="all">All Types</option>
              <option value="Food Ingredient">Food Ingredient</option>
              <option value="Grocery">Grocery</option>
              <option value="Toiletry">Toiletry</option>
              <option value="Pooja Item">Pooja Item</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="category-filter">
              <span class="label-text">Category</span>
            </label>
            <select id="category-filter" bind:value={categoryFilter} class="select select-bordered">
              <option value="all">All Categories</option>
              <option value="Dry Goods">Dry Goods</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Spices">Spices</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Ritual Supplies">Ritual Supplies</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="location-filter">
              <span class="label-text">Location</span>
            </label>
            <select id="location-filter" bind:value={locationFilter} class="select select-bordered">
              <option value="all">All Locations</option>
              <option value="Kitchen Cabinet">Kitchen Cabinet</option>
              <option value="Pantry">Pantry</option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Bathroom Shelf">Bathroom Shelf</option>
              <option value="Laundry Room">Laundry Room</option>
              <option value="Pooja Room">Pooja Room</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="stock-status-filter">
              <span class="label-text">Stock Status</span>
            </label>
            <select id="stock-status-filter" bind:value={stockStatusFilter} class="select select-bordered">
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label" for="sort-by">
              <span class="label-text">Sort By</span>
            </label>
            <select id="sort-by" bind:value={sortBy} class="select select-bordered">
              <option value="last_updated">Last Updated</option>
              <option value="type">Type</option>
              <option value="category">Category</option>
              <option value="quantity_available">Quantity</option>
              <option value="created_at">Date Added</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <p class="text-sm text-base-content/70">Showing {sortedItems.length} of {totalItems} items</p>
          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm" on:click={exportToCSV}>
              <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
              Export CSV
            </button>
            <button class="btn btn-outline btn-sm" on:click={exportToJSON}>
              <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
              Export JSON
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each sortedItems as item}
        <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => navigateToUpdate(item.id)} role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToUpdate(item.id); } }}>
          <div class="card-body">
            <div class="flex justify-between items-start mb-3">
              <h3 class="card-title text-lg line-clamp-2">{item.type} - {item.category}</h3>
              {#if item.restock_threshold && item.quantity_available <= item.restock_threshold}
                <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5 text-warning" />
              {:else if item.quantity_available === 0}
                <Icon icon="heroicons:x-circle" class="w-5 h-5 text-error" />
              {:else}
                <Icon icon="heroicons:check-circle" class="w-5 h-5 text-success" />
              {/if}
            </div>

            <div class="space-y-2">
              {#if item.sub_category}
                <div class="flex items-center gap-2 text-sm text-base-content/70">
                  <Icon icon="heroicons:tag" class="w-4 h-4" />
                  <span>{item.sub_category}</span>
                </div>
              {/if}

              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:scale" class="w-4 h-4" />
                <span class="{item.restock_threshold && item.quantity_available <= item.restock_threshold ? 'text-warning font-medium' : item.quantity_available === 0 ? 'text-error font-medium' : 'text-success'}">
                  {item.quantity_available} {item.unit}
                </span>
                {#if item.restock_threshold}
                  <span class="text-xs">(min: {item.restock_threshold})</span>
                {/if}
              </div>

              {#if item.location}
                <div class="flex items-center gap-2 text-sm text-base-content/70">
                  <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              {/if}

              {#if item.preferred_vendor}
                <div class="flex items-center gap-2 text-sm text-base-content/70">
                  <Icon icon="heroicons:building-storefront" class="w-4 h-4" />
                  <span>{item.preferred_vendor}</span>
                </div>
              {/if}

              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:clock" class="w-4 h-4" />
                <span>Updated {new Date(item.last_updated).toLocaleDateString()}</span>
              </div>

              {#if item.restock_threshold && item.quantity_available <= item.restock_threshold}
                <button class="btn btn-warning btn-sm btn-block mt-3" on:click|stopPropagation={() => quickRestock(item.id)}>
                  Quick Restock
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if sortedItems.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:cube" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <p class="text-base-content/70">No items found matching your filters</p>
        <button class="btn btn-primary mt-4" on:click={navigateToCreate}>
          Add Your First Item
        </button>
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
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="inventory" recordId="review" />

  </div>
</div>