<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { permissionManager, PermissionType, PermissionStatus, type PermissionResult } from '$lib/utils/permissions';
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '$lib/utils/motion';

  export let permissionType: PermissionType;
  export let title: string = '';
  export let description: string = '';
  export let icon: string = '';
  export let showDialog: boolean = false;

  const dispatch = createEventDispatcher();

  let isRequesting = false;
  let result: PermissionResult | null = null;

  // Default titles and descriptions based on permission type
  $: defaultTitle = title || getDefaultTitle(permissionType);
  $: defaultDescription = description || getDefaultDescription(permissionType);
  $: defaultIcon = icon || getDefaultIcon(permissionType);

  function getDefaultTitle(type: PermissionType): string {
    switch (type) {
      case PermissionType.CAMERA: return 'Camera Access';
      case PermissionType.MICROPHONE: return 'Microphone Access';
      case PermissionType.LOCATION: return 'Location Access';
      case PermissionType.NOTIFICATIONS: return 'Notification Access';
      case PermissionType.CONTACTS: return 'Contacts Access';
      case PermissionType.STORAGE: return 'Storage Access';
      case PermissionType.PHONE: return 'Phone Access';
      default: return 'Permission Required';
    }
  }

  function getDefaultDescription(type: PermissionType): string {
    switch (type) {
      case PermissionType.CAMERA: return 'Allow access to camera for taking photos and videos';
      case PermissionType.MICROPHONE: return 'Allow access to microphone for voice recording and calls';
      case PermissionType.LOCATION: return 'Allow access to location for maps and nearby services';
      case PermissionType.NOTIFICATIONS: return 'Allow notifications for reminders and updates';
      case PermissionType.CONTACTS: return 'Allow access to contacts for sharing and communication';
      case PermissionType.STORAGE: return 'Allow access to storage for saving files and data';
      case PermissionType.PHONE: return 'Allow access to phone features for calls and SMS';
      default: return 'This permission is required for the requested feature';
    }
  }

  function getDefaultIcon(type: PermissionType): string {
    switch (type) {
      case PermissionType.CAMERA: return 'heroicons:camera';
      case PermissionType.MICROPHONE: return 'heroicons:microphone';
      case PermissionType.LOCATION: return 'heroicons:map-pin';
      case PermissionType.NOTIFICATIONS: return 'heroicons:bell';
      case PermissionType.CONTACTS: return 'heroicons:users';
      case PermissionType.STORAGE: return 'heroicons:folder';
      case PermissionType.PHONE: return 'heroicons:phone';
      default: return 'heroicons:shield-check';
    }
  }

  async function requestPermission() {
    isRequesting = true;
    result = null;

    try {
      result = await permissionManager.requestPermission(permissionType);
      dispatch('result', result);

      if (result.status === PermissionStatus.GRANTED) {
        dispatch('granted', result);
      } else {
        dispatch('denied', result);
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      result = {
        type: permissionType,
        status: PermissionStatus.DENIED,
        message: 'Permission request failed'
      };
      dispatch('error', error);
    } finally {
      isRequesting = false;
    }
  }

  function closeDialog() {
    showDialog = false;
    result = null;
    dispatch('close');
  }

  function getStatusColor(status: PermissionStatus): string {
    switch (status) {
      case PermissionStatus.GRANTED: return 'text-green-600';
      case PermissionStatus.DENIED: return 'text-red-600';
      case PermissionStatus.PROMPT: return 'text-yellow-600';
      case PermissionStatus.RESTRICTED: return 'text-orange-600';
      default: return 'text-gray-600';
    }
  }

  function getStatusIcon(status: PermissionStatus): string {
    switch (status) {
      case PermissionStatus.GRANTED: return 'heroicons:check-circle';
      case PermissionStatus.DENIED: return 'heroicons:x-circle';
      case PermissionStatus.PROMPT: return 'heroicons:question-mark-circle';
      case PermissionStatus.RESTRICTED: return 'heroicons:exclamation-triangle';
      default: return 'heroicons:minus-circle';
    }
  }
</script>

{#if showDialog}
  <!-- Permission Request Dialog -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" use:motionInView>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6" use:motionInView={{ animation: "fadeInUp", delay: 0.1 }}>
      <!-- Header -->
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
          <Icon icon={defaultIcon} class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{defaultTitle}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Permission Request</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-700 dark:text-gray-300 mb-6">{defaultDescription}</p>

      <!-- Result Display -->
      {#if result}
        <div class="mb-6 p-4 rounded-lg border {result.status === PermissionStatus.GRANTED ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}">
          <div class="flex items-center space-x-2">
            <Icon icon={getStatusIcon(result.status)} class="w-5 h-5 {getStatusColor(result.status)}" />
            <span class="font-medium {getStatusColor(result.status)}">
              {result.status === PermissionStatus.GRANTED ? 'Permission Granted' : 'Permission Denied'}
            </span>
          </div>
          {#if result.message}
            <p class="text-sm mt-2 {result.status === PermissionStatus.GRANTED ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}">
              {result.message}
            </p>
          {/if}
        </div>
      {/if}

      <!-- Actions -->
      <div class="flex space-x-3">
        {#if !result || result.status !== PermissionStatus.GRANTED}
          <button
            on:click={requestPermission}
            disabled={isRequesting}
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            use:motionHover
          >
            {#if isRequesting}
              <div class="flex items-center justify-center space-x-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Requesting...</span>
              </div>
            {:else}
              <Icon icon="heroicons:shield-check" class="w-4 h-4 mr-2 inline" />
              Grant Permission
            {/if}
          </button>
        {/if}

        <button
          on:click={closeDialog}
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          use:motionHover
        >
          {result?.status === PermissionStatus.GRANTED ? 'Continue' : 'Cancel'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Additional styles if needed */
</style>