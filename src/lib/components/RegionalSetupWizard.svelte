<script lang="ts">
  import { onMount } from 'svelte';
  import { locationService, type LocationData } from '$lib/services/locationService';
  import { regionalDataService } from '$lib/services/regionalDataService';
  import LocationPermissionRequest from '$lib/components/LocationPermissionRequest.svelte';

  export let onComplete: (setupData: { location: LocationData | null; region: string; language: string }) => void;
  export let onSkip: () => void;

  let currentStep = 1;
  let totalSteps = 3;

  // Step 1: Location Permission
  let showPermissionRequest = true;
  let locationPermissionGranted = false;
  let currentLocation: LocationData | null = null;
  let locationError: string | null = null;

  // Step 2: Region Selection
  let availableRegions = [
    { key: 'tamil-nadu-coimbatore', name: 'Coimbatore, Tamil Nadu', description: 'South Indian region with local services' },
    { key: 'karnataka-bangalore', name: 'Bangalore, Karnataka', description: 'Tech hub with comprehensive services' }
  ];
  let selectedRegion = '';

  // Step 3: Language Preferences
  let availableLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
  ];
  let selectedLanguage = 'en';

  onMount(async () => {
    // Check if location permission is already granted
    try {
      const permissions = await locationService.checkPermissions();
      if (permissions.location === 'granted' || permissions.coarseLocation === 'granted') {
        locationPermissionGranted = true;
        showPermissionRequest = false;
        await getCurrentLocation();
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  });

  async function handlePermissionGranted() {
    locationPermissionGranted = true;
    showPermissionRequest = false;
    await getCurrentLocation();
  }

  function handlePermissionDenied() {
    locationPermissionGranted = false;
    showPermissionRequest = false;
    nextStep();
  }

  async function getCurrentLocation() {
    try {
      currentLocation = await locationService.getCurrentLocation();
      // Auto-select region based on location
      const regionData = await regionalDataService.getRegionalData(currentLocation);
      if (regionData) {
        selectedRegion = availableRegions.find(r => r.key === 'tamil-nadu-coimbatore')?.key || '';
      }
    } catch (error) {
      console.error('Error getting location:', error);
      locationError = 'Unable to get your location. You can select your region manually.';
    }
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep++;
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
    }
  }

  function completeSetup() {
    const setupData = {
      location: currentLocation,
      region: selectedRegion,
      language: selectedLanguage
    };
    onComplete(setupData);
  }

  function getStepTitle(step: number): string {
    switch (step) {
      case 1: return 'Location Access';
      case 2: return 'Region Selection';
      case 3: return 'Language Preferences';
      default: return '';
    }
  }

  function getStepDescription(step: number): string {
    switch (step) {
      case 1: return 'Allow location access to provide personalized local services';
      case 2: return 'Choose your region to see relevant local information';
      case 3: return 'Select your preferred language for the app';
      default: return '';
    }
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Welcome to Home Management Suite</h2>
        <button
          class="text-gray-400 hover:text-gray-600 transition-colors"
          on:click={onSkip}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style="width: {((currentStep - 1) / (totalSteps - 1)) * 100}%"
        ></div>
      </div>

      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900">{getStepTitle(currentStep)}</h3>
        <p class="text-sm text-gray-600 mt-1">{getStepDescription(currentStep)}</p>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      {#if currentStep === 1}
        <!-- Step 1: Location Permission -->
        {#if showPermissionRequest}
          <LocationPermissionRequest
            onPermissionGranted={handlePermissionGranted}
            onPermissionDenied={handlePermissionDenied}
          />
        {:else}
          <div class="text-center">
            {#if locationPermissionGranted && currentLocation}
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Location Access Granted</h3>
              <p class="text-sm text-gray-600 mb-4">
                We'll use your location to show you relevant local services and information.
              </p>
              {#if currentLocation.city && currentLocation.state}
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p class="text-sm text-blue-800">
                    📍 Detected: {currentLocation.city}, {currentLocation.state}
                  </p>
                </div>
              {/if}
            {:else}
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Location Access Skipped</h3>
              <p class="text-sm text-gray-600 mb-4">
                You can still use the app, but some location-based features will be limited.
              </p>
              {#if locationError}
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p class="text-sm text-yellow-800">{locationError}</p>
                </div>
              {/if}
            {/if}
          </div>
        {/if}

      {:else if currentStep === 2}
        <!-- Step 2: Region Selection -->
        <div class="space-y-4">
          <p class="text-sm text-gray-600 mb-4">
            Choose your region to see local services, emergency contacts, and regional information.
          </p>

          {#each availableRegions as region}
            <label class="block">
              <input
                type="radio"
                bind:group={selectedRegion}
                value={region.key}
                class="mr-3"
              />
              <div class="inline-block p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors {selectedRegion === region.key ? 'border-blue-500 bg-blue-50' : ''}">
                <div class="flex items-center">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{region.name}</h4>
                    <p class="text-sm text-gray-600">{region.description}</p>
                  </div>
                  {#if selectedRegion === region.key}
                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  {/if}
                </div>
              </div>
            </label>
          {/each}
        </div>

      {:else if currentStep === 3}
        <!-- Step 3: Language Selection -->
        <div class="space-y-4">
          <p class="text-sm text-gray-600 mb-4">
            Choose your preferred language for the app interface and content.
          </p>

          <div class="grid grid-cols-1 gap-3">
            {#each availableLanguages as language}
              <label class="block">
                <input
                  type="radio"
                  bind:group={selectedLanguage}
                  value={language.code}
                  class="mr-3"
                />
                <div class="inline-block w-full p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors {selectedLanguage === language.code ? 'border-blue-500 bg-blue-50' : ''}">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="font-medium text-gray-900">{language.name}</span>
                      <span class="text-sm text-gray-500 ml-2">({language.nativeName})</span>
                    </div>
                    {#if selectedLanguage === language.code}
                      <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    {/if}
                  </div>
                </div>
              </label>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-gray-200 flex justify-between">
      <button
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors {currentStep === 1 ? 'invisible' : ''}"
        on:click={prevStep}
        disabled={currentStep === 1}
      >
        Previous
      </button>

      {#if currentStep < totalSteps}
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={nextStep}
          disabled={(currentStep === 2 && !selectedRegion)}
        >
          Next
        </button>
      {:else}
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          on:click={completeSetup}
        >
          Complete Setup
        </button>
      {/if}
    </div>
  </div>
</div>