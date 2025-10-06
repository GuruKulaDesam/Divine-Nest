<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let weatherData = null;
  let loading = true;

  onMount(async () => {
    // Simulate weather data loading
    setTimeout(() => {
      weatherData = {
        temperature: 28,
        condition: "Sunny",
        humidity: 65,
        windSpeed: 12,
        forecast: [
          { day: "Today", temp: 28, condition: "Sunny" },
          { day: "Tomorrow", temp: 30, condition: "Partly Cloudy" },
          { day: "Wednesday", temp: 27, condition: "Rainy" },
        ],
      };
      loading = false;
    }, 1000);
  });
</script>

<div class="p-6">
  <div class="flex items-center space-x-3 mb-6">
    <Icon icon="heroicons:cloud" class="w-8 h-8 text-blue-500" />
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Weather Updates</h1>
  </div>

  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Current Weather -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h2 class="text-lg font-semibold mb-4">Current Weather</h2>
        <div class="flex items-center justify-between">
          <div>
            <div class="text-4xl font-bold">{weatherData.temperature}°C</div>
            <div class="text-blue-100">{weatherData.condition}</div>
          </div>
          <Icon icon="heroicons:sun" class="w-16 h-16 text-yellow-300" />
        </div>
        <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="text-blue-100">Humidity</div>
            <div class="font-semibold">{weatherData.humidity}%</div>
          </div>
          <div>
            <div class="text-blue-100">Wind Speed</div>
            <div class="font-semibold">{weatherData.windSpeed} km/h</div>
          </div>
        </div>
      </div>

      <!-- 3-Day Forecast -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">3-Day Forecast</h2>
        <div class="space-y-4">
          {#each weatherData.forecast as day}
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{day.day}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{day.condition}</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{day.temp}°C</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Weather Tips -->
    <div class="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Weather Tips</h3>
      <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li>• Stay hydrated during hot weather</li>
        <li>• Carry an umbrella for sudden rain</li>
        <li>• Check air quality before outdoor activities</li>
        <li>• Monitor UV index for sun protection</li>
      </ul>
    </div>
  {/if}
</div>
