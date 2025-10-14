<script>
  import { onMount } from 'svelte';
  import { sqliteService } from '$lib/services/sqliteService';
  import Icon from '@iconify/svelte';

  let inventoryItems = [];
  let reports = {
    totalItems: 0,
    totalValue: 0,
    lowStockItems: [],
    expiringItems: [],
    categoryBreakdown: {},
    monthlyUsage: []
  };

  onMount(async () => {
    await loadInventoryData();
    generateReports();
  });

  async function loadInventoryData() {
    try {
      const items = await sqliteService.getInventoryItems?.() || [];
      inventoryItems = items;
    } catch (error) {
      console.error('Error loading inventory:', error);
      inventoryItems = [];
    }
  }

  function generateReports() {
    // Total items and value
    reports.totalItems = inventoryItems.length;
    reports.totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice || 0), 0);

    // Low stock items (assuming quantity < 5 is low)
    reports.lowStockItems = inventoryItems.filter(item => item.quantity < 5);

    // Expiring items (within 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    reports.expiringItems = inventoryItems.filter(item => {
      if (!item.expiryDate) return false;
      return new Date(item.expiryDate) <= thirtyDaysFromNow;
    });

    // Category breakdown
    const categories = {};
    inventoryItems.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = { count: 0, value: 0 };
      }
      categories[category].count++;
      categories[category].value += (item.quantity * item.unitPrice || 0);
    });
    reports.categoryBreakdown = categories;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  function getStockStatusColor(quantity) {
    if (quantity === 0) return 'text-red-500';
    if (quantity < 5) return 'text-yellow-500';
    return 'text-green-500';
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-base-content">Inventory Reports</h1>
    <div class="flex gap-2">
      <button class="btn btn-outline">
        <Icon icon="heroicons:document" class="w-4 h-4 mr-2" />
        Export PDF
      </button>
      <button class="btn btn-outline">
        <Icon icon="heroicons:table-cells" class="w-4 h-4 mr-2" />
        Export CSV
      </button>
    </div>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
      <div class="stat-figure text-primary">
        <Icon icon="heroicons:cube" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Items</div>
      <div class="stat-value">{reports.totalItems}</div>
    </div>

    <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
      <div class="stat-figure text-secondary">
        <Icon icon="heroicons:banknotes" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Value</div>
      <div class="stat-value text-lg">{formatCurrency(reports.totalValue)}</div>
    </div>

    <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
      <div class="stat-figure text-warning">
        <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Low Stock</div>
      <div class="stat-value">{reports.lowStockItems.length}</div>
    </div>

    <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
      <div class="stat-figure text-error">
        <Icon icon="heroicons:clock" class="w-8 h-8" />
      </div>
      <div class="stat-title">Expiring Soon</div>
      <div class="stat-value">{reports.expiringItems.length}</div>
    </div>
  </div>

  <!-- Low Stock Alert -->
  {#if reports.lowStockItems.length > 0}
    <div class="card bg-yellow-500/10 border border-yellow-500/20 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-yellow-700 dark:text-yellow-300">
          <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
          Low Stock Alert
        </h2>
        <div class="space-y-2">
          {#each reports.lowStockItems as item}
            <div class="flex items-center justify-between p-2 bg-white/5 rounded">
              <span class="font-medium">{item.name}</span>
              <span class="badge badge-warning">Qty: {item.quantity}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Expiring Items Alert -->
  {#if reports.expiringItems.length > 0}
    <div class="card bg-red-500/10 border border-red-500/20 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-red-700 dark:text-red-300">
          <Icon icon="heroicons:clock" class="w-5 h-5" />
          Expiring Soon
        </h2>
        <div class="space-y-2">
          {#each reports.expiringItems as item}
            <div class="flex items-center justify-between p-2 bg-white/5 rounded">
              <div>
                <span class="font-medium">{item.name}</span>
                <span class="text-sm opacity-70 ml-2">
                  Expires: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
              <span class="badge badge-error">Qty: {item.quantity}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Category Breakdown -->
  <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">Category Breakdown</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Category</th>
              <th>Items Count</th>
              <th>Total Value</th>
              <th>% of Total</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(reports.categoryBreakdown) as [category, data]}
              <tr>
                <td class="font-medium">{category}</td>
                <td>{data.count}</td>
                <td>{formatCurrency(data.value)}</td>
                <td>
                  {reports.totalValue > 0 ? ((data.value / reports.totalValue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Inventory Details -->
  <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">Inventory Details</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Value</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {#each inventoryItems as item}
              <tr>
                <td class="font-medium">{item.name || 'Unnamed'}</td>
                <td>{item.category || 'Uncategorized'}</td>
                <td class="{getStockStatusColor(item.quantity)}">{item.quantity || 0}</td>
                <td>{formatCurrency(item.unitPrice || 0)}</td>
                <td>{formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}</td>
                <td>
                  {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                </td>
                <td>
                  <span class="badge {item.quantity === 0 ? 'badge-error' : item.quantity < 5 ? 'badge-warning' : 'badge-success'}">
                    {item.quantity === 0 ? 'Out of Stock' : item.quantity < 5 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>