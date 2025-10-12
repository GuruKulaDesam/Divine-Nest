<script>
  import { onMount } from "svelte";

  let petrolPrice = 0;
  let goldPrice = 0;
  let lastUpdated = null;
  let loading = true;

  // Mock data for demonstration - in real app, this would fetch from API
  const mockPrices = {
    petrol: 102.45, // INR per liter
    gold: 7250.30   // INR per gram (24k)
  };

  onMount(async () => {
    await loadPrices();
  });

  async function loadPrices() {
    try {
      // In a real implementation, you would fetch from an API like:
      // const response = await fetch('https://api.example.com/prices');
      // const data = await response.json();

      // For now, using mock data
      petrolPrice = mockPrices.petrol;
      goldPrice = mockPrices.gold;
      lastUpdated = new Date();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error loading prices:', error);
    } finally {
      loading = false;
    }
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  }

  function formatTime(date) {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- Petrol Price Card -->
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="text-2xl">⛽</div>
        <div>
          <h3 class="font-semibold text-gray-800">Petrol Price</h3>
          {#if loading}
            <div class="animate-pulse">
              <div class="h-6 bg-gray-300 rounded w-20 mb-1"></div>
              <div class="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          {:else}
            <p class="text-xl font-bold text-gray-600">{formatPrice(petrolPrice)}</p>
            <p class="text-xs text-gray-500">per liter</p>
          {/if}
        </div>
      </div>
      {#if !loading}
        <button
          class="text-gray-400 hover:text-gray-600 p-1"
          on:click={loadPrices}
          title="Refresh prices"
        >
          🔄
        </button>
      {/if}
    </div>
    {#if lastUpdated && !loading}
      <p class="text-xs text-gray-400 mt-2">
        Updated: {formatTime(lastUpdated)}
      </p>
    {/if}
  </div>

  <!-- Gold Price Card -->
  <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="text-2xl">🪙</div>
        <div>
          <h3 class="font-semibold text-yellow-800">Gold Price</h3>
          {#if loading}
            <div class="animate-pulse">
              <div class="h-6 bg-yellow-300 rounded w-20 mb-1"></div>
              <div class="h-4 bg-yellow-300 rounded w-16"></div>
            </div>
          {:else}
            <p class="text-xl font-bold text-yellow-600">{formatPrice(goldPrice)}</p>
            <p class="text-xs text-yellow-600">per gram (24k)</p>
          {/if}
        </div>
      </div>
      {#if !loading}
        <button
          class="text-yellow-400 hover:text-yellow-600 p-1"
          on:click={loadPrices}
          title="Refresh prices"
        >
          🔄
        </button>
      {/if}
    </div>
    {#if lastUpdated && !loading}
      <p class="text-xs text-yellow-500 mt-2">
        Updated: {formatTime(lastUpdated)}
      </p>
    {/if}
  </div>
</div>