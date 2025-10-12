<script lang="ts">
  import { onMount } from 'svelte';
  import { locationService, type LocationPermissions } from '$lib/services/locationService';

  export let onPermissionGranted: () => void = () => {};
  export let onPermissionDenied: () => void = () => {};

  let permissions: LocationPermissions | null = null;
  let isRequesting = false;
  let error: string | null = null;

  onMount(async () => {
    await checkPermissions();
  });

  async function checkPermissions() {
    try {
      permissions = await locationService.checkPermissions();
    } catch (err) {
      error = 'Failed to check permissions';
      console.error('Permission check error:', err);
    }
  }

  async function requestPermissions() {
    isRequesting = true;
    error = null;

    try {
      const newPermissions = await locationService.requestPermissions();
      permissions = newPermissions;

      if (newPermissions.location === 'granted' || newPermissions.coarseLocation === 'granted') {
        onPermissionGranted();
      } else {
        onPermissionDenied();
      }
    } catch (err) {
      error = 'Failed to request permissions';
      console.error('Permission request error:', err);
      onPermissionDenied();
    } finally {
      isRequesting = false;
    }
  }

  function getPermissionStatusText(status: string): string {
    switch (status) {
      case 'granted':
        return 'Granted';
      case 'denied':
        return 'Denied';
      case 'prompt':
        return 'Not requested';
      case 'prompt-with-rationale':
        return 'Requires permission';
      default:
        return 'Unknown';
    }
  }

  function getPermissionStatusColor(status: string): string {
    switch (status) {
      case 'granted':
        return 'text-green-600';
      case 'denied':
        return 'text-red-600';
      case 'prompt':
      case 'prompt-with-rationale':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  }
</script>

<div class="permission-request-card bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
  <div class="text-center mb-6">
    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Location Access Required</h3>
    <p class="text-gray-600 text-sm">
      Divine Nest needs access to your location to provide personalized services, local contacts, and regional information tailored to your area.
    </p>
  </div>

  {#if permissions}
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Current Permissions:</h4>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Precise Location</span>
          <span class="text-sm font-medium {getPermissionStatusColor(permissions.location)}">
            {getPermissionStatusText(permissions.location)}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Approximate Location</span>
          <span class="text-sm font-medium {getPermissionStatusColor(permissions.coarseLocation)}">
            {getPermissionStatusText(permissions.coarseLocation)}
          </span>
        </div>
      </div>
    </div>
  {/if}

  {#if error}
    <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-600">{error}</p>
    </div>
  {/if}

  <div class="flex gap-3">
    <button
      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      on:click={onPermissionDenied}
      disabled={isRequesting}
    >
      Skip for Now
    </button>
    <button
      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      on:click={requestPermissions}
      disabled={isRequesting}
    >
      {#if isRequesting}
        <div class="flex items-center justify-center">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Requesting...
        </div>
      {:else}
        Grant Access
      {/if}
    </button>
  </div>

  <div class="mt-4 text-xs text-gray-500 text-center">
    <p>Your location data helps us provide:</p>
    <ul class="mt-1 space-y-1">
      <li>• Local service providers and contacts</li>
      <li>• Regional shopping centers and markets</li>
      <li>• Area-specific emergency services</li>
      <li>• Localized cultural and festival information</li>
    </ul>
  </div>
</div>

<style>
  .permission-request-card {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>