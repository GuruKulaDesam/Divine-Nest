<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { userRole } from "$lib/stores/userRole.js";
  import { offlineSync } from "$lib/utils/offlineSync.js";

  let currentRole;
  let ambientSuggestions = [];
  let weatherData = null;
  let locationData = null;
  let timeBasedSuggestions = [];
  let locationBasedSuggestions = [];
  let weatherBasedSuggestions = [];

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
    updateAmbientSuggestions();
  });

  onMount(() => {
    // Initialize ambient intelligence
    getCurrentLocation();
    getWeatherData();
    startTimeMonitoring();
    startLocationMonitoring();

    // Update suggestions every 5 minutes
    const interval = setInterval(() => {
      updateAmbientSuggestions();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  });

  onDestroy(() => {
    stopLocationMonitoring();
  });

  function startTimeMonitoring() {
    // Check time-based triggers every minute
    setInterval(() => {
      checkTimeBasedTriggers();
    }, 60 * 1000);

    // Initial check
    checkTimeBasedTriggers();
  }

  function checkTimeBasedTriggers() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    timeBasedSuggestions = [];

    // Morning routines (6-8 AM)
    if (hour >= 6 && hour < 8) {
      if (currentRole === 'mother') {
        timeBasedSuggestions.push({
          type: 'morning',
          title: 'Morning Routine',
          message: 'Time for school preparation and breakfast',
          icon: 'mdi:weather-sunset-up',
          action: 'Start morning checklist'
        });
      } else if (currentRole === 'grandmother') {
        timeBasedSuggestions.push({
          type: 'morning',
          title: 'Morning Prayers',
          message: 'Time for morning prayers and meditation',
          icon: 'mdi:meditation',
          action: 'Show prayer schedule'
        });
      }
    }

    // Evening routines (6-8 PM)
    else if (hour >= 18 && hour < 20) {
      if (currentRole === 'mother') {
        timeBasedSuggestions.push({
          type: 'evening',
          title: 'Evening Routine',
          message: 'Time for homework help and dinner prep',
          icon: 'mdi:weather-sunset-down',
          action: 'Start evening checklist'
        });
      } else if (currentRole === 'helper') {
        timeBasedSuggestions.push({
          type: 'evening',
          title: 'Evening Tasks',
          message: 'Time for cleaning and dinner preparation',
          icon: 'mdi:broom',
          action: 'Show evening tasks'
        });
      }
    }

    // Medicine reminders (specific times)
    if ((hour === 8 && minute >= 0) || (hour === 14 && minute >= 0) || (hour === 20 && minute >= 0)) {
      if (currentRole === 'grandmother' || currentRole === 'elder') {
        timeBasedSuggestions.push({
          type: 'medicine',
          title: 'Medicine Time',
          message: 'Time to take your prescribed medicine',
          icon: 'mdi:pill',
          action: 'Log medicine intake',
          urgent: true
        });
      }
    }

    updateAmbientSuggestions();
  }

  async function getCurrentLocation() {
    try {
      // Check for cached location data (valid for 30 minutes)
      const cachedLocation = await offlineSync.getPreference('location_data');
      const cachedTime = await offlineSync.getPreference('location_timestamp');

      if (cachedLocation && cachedTime) {
        const cacheAge = Date.now() - new Date(cachedTime).getTime();
        const thirtyMinutes = 30 * 60 * 1000;

        if (cacheAge < thirtyMinutes) {
          locationData = JSON.parse(cachedLocation);
          checkLocationBasedTriggers();
          return;
        }
      }

      // Get fresh location data
      if ('geolocation' in navigator) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          });
        });

        locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        };

        // Cache the location data
        await offlineSync.savePreference('location_data', JSON.stringify(locationData));
        await offlineSync.savePreference('location_timestamp', new Date().toISOString());

        checkLocationBasedTriggers();
      }
    } catch (error) {
      console.log('Location access denied or unavailable, using cached data if available');
      // Try to use cached data even if expired
      const cachedLocation = await offlineSync.getPreference('location_data');
      if (cachedLocation) {
        locationData = JSON.parse(cachedLocation);
        checkLocationBasedTriggers();
      }
    }
  }

  function startLocationMonitoring() {
    // Check location every 10 minutes
    setInterval(() => {
      getCurrentLocation();
    }, 10 * 60 * 1000);
  }

  function stopLocationMonitoring() {
    // Clear any location monitoring intervals if needed
  }

  function checkLocationBasedTriggers() {
    if (!locationData) return;

    locationBasedSuggestions = [];

    // Home arrival/departure detection would require more complex logic
    // For now, we'll use time-based approximations

    const now = new Date();
    const hour = now.getHours();

    // School pickup time (around 3-4 PM)
    if (hour >= 15 && hour < 16 && currentRole === 'mother') {
      locationBasedSuggestions.push({
        type: 'location',
        title: 'School Pickup',
        message: 'Time to pick up children from school',
        icon: 'mdi:school',
        action: 'Set school reminder'
      });
    }

    // Temple proximity (this would need actual temple location data)
    if (hour >= 17 && hour < 19) {
      locationBasedSuggestions.push({
        type: 'location',
        title: 'Evening Temple',
        message: 'Consider visiting the local temple',
        icon: 'mdi:temple-hindu',
        action: 'Show temple schedule'
      });
    }

    updateAmbientSuggestions();
  }

  async function getWeatherData() {
    try {
      // Check for cached weather data (valid for 1 hour)
      const cachedWeather = await offlineSync.getPreference('weather_data');
      const cachedTime = await offlineSync.getPreference('weather_timestamp');

      if (cachedWeather && cachedTime) {
        const cacheAge = Date.now() - new Date(cachedTime).getTime();
        const oneHour = 60 * 60 * 1000;

        if (cacheAge < oneHour) {
          weatherData = JSON.parse(cachedWeather);
          checkWeatherBasedTriggers();
          return;
        }
      }

      // Fetch new weather data
      // In a real implementation, this would call a weather API
      // For demo purposes, we'll simulate weather data
      await new Promise(resolve => setTimeout(resolve, 1000));

      weatherData = {
        temperature: 28 + Math.floor(Math.random() * 10), // Add some variation
        condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        humidity: 60 + Math.floor(Math.random() * 20),
        windSpeed: 8 + Math.floor(Math.random() * 10),
        forecast: [
          { day: 'Today', condition: 'sunny', high: 32, low: 24 },
          { day: 'Tomorrow', condition: 'cloudy', high: 30, low: 23 },
          { day: 'Day after', condition: 'rainy', high: 28, low: 22 }
        ],
        location: locationData ? `${locationData.latitude.toFixed(2)}, ${locationData.longitude.toFixed(2)}` : 'Local'
      };

      // Cache the weather data
      await offlineSync.savePreference('weather_data', JSON.stringify(weatherData));
      await offlineSync.savePreference('weather_timestamp', new Date().toISOString());

      checkWeatherBasedTriggers();
    } catch (error) {
      console.log('Weather data unavailable, using cached data if available');
      // Try to use cached data even if expired
      const cachedWeather = await offlineSync.getPreference('weather_data');
      if (cachedWeather) {
        weatherData = JSON.parse(cachedWeather);
        checkWeatherBasedTriggers();
      }
    }
  }

  function checkWeatherBasedTriggers() {
    if (!weatherData) return;

    weatherBasedSuggestions = [];

    // Weather-based suggestions
    if (weatherData.condition === 'rainy') {
      weatherBasedSuggestions.push({
        type: 'weather',
        title: 'Rain Alert',
        message: 'It\'s raining - bring clothes inside and check drainage',
        icon: 'mdi:weather-rainy',
        action: 'Add weather task'
      });
    } else if (weatherData.condition === 'sunny' && weatherData.temperature > 30) {
      weatherBasedSuggestions.push({
        type: 'weather',
        title: 'Hot Weather',
        message: 'Stay hydrated and avoid outdoor work during peak sun',
        icon: 'mdi:weather-sunny',
        action: 'Health reminder'
      });
    }

    // Festival weather considerations
    const today = new Date().toLocaleDateString('en-IN', {
      month: 'long',
      day: 'numeric'
    });

    if (today.includes('Diwali') || today.includes('Pongal')) {
      weatherBasedSuggestions.push({
        type: 'weather',
        title: 'Festival Weather',
        message: 'Check weather for outdoor festival activities',
        icon: 'mdi:weather-partly-cloudy',
        action: 'Festival planning'
      });
    }

    updateAmbientSuggestions();
  }

  async function updateAmbientSuggestions() {
    ambientSuggestions = [
      ...timeBasedSuggestions,
      ...locationBasedSuggestions,
      ...weatherBasedSuggestions
    ].slice(0, 4); // Show max 4 suggestions

    // Save ambient intelligence data for analytics
    if (ambientSuggestions.length > 0) {
      const ambientData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user_id: currentRole?.id || 'default',
        suggestions: ambientSuggestions,
        context: {
          time: new Date().toISOString(),
          weather: weatherData,
          location: locationData,
          role: currentRole
        }
      };

      try {
        await offlineSync.saveData('ambient_suggestions', ambientData);
      } catch (error) {
        console.warn('Failed to save ambient suggestions:', error);
      }
    }
  }

  function dismissSuggestion(index) {
    ambientSuggestions = ambientSuggestions.filter((_, i) => i !== index);
  }

  function executeSuggestion(suggestion) {
    // In a real implementation, this would trigger the appropriate action
    console.log('Executing suggestion:', suggestion.action);

    // For demo, just dismiss the suggestion
    const index = ambientSuggestions.indexOf(suggestion);
    if (index > -1) {
      dismissSuggestion(index);
    }
  }
</script>

<div class="ambient-intelligence">
  {#if ambientSuggestions.length > 0}
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mb-6">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <Icon icon="mdi:brain" class="w-5 h-5 text-purple-600" />
          <h3 class="text-sm font-medium text-purple-800">Smart Suggestions</h3>
        </div>
        <span class="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
          Ambient Intelligence
        </span>
      </div>

      <div class="space-y-2">
        {#each ambientSuggestions as suggestion, index}
          <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100 hover:bg-purple-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon icon={suggestion.icon} class="w-5 h-5 {suggestion.urgent ? 'text-red-500' : 'text-purple-500'}" />
              <div>
                <p class="text-sm font-medium text-gray-800">{suggestion.title}</p>
                <p class="text-xs text-gray-600">{suggestion.message}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                class="text-xs text-purple-600 hover:text-purple-800 font-medium"
                on:click={() => executeSuggestion(suggestion)}
              >
                {suggestion.action}
              </button>
              <button
                class="text-gray-400 hover:text-gray-600"
                on:click={() => dismissSuggestion(index)}
              >
                <Icon icon="mdi:close" class="w-4 h-4" />
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Weather Widget (if available) -->
  {#if weatherData}
    <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Icon icon="mdi:weather-{weatherData.condition}" class="w-6 h-6 text-blue-500" />
          <div>
            <p class="text-sm font-medium text-gray-800">{weatherData.temperature}°C</p>
            <p class="text-xs text-gray-600 capitalize">{weatherData.condition}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-500">Humidity</p>
          <p class="text-sm font-medium">{weatherData.humidity}%</p>
        </div>
      </div>
    </div>
  {/if}
</div>