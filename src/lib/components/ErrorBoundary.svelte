<script>
  import { onError } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let fallback = null;
  let hasError = false;
  let error = null;

  // Set up error boundary for child components
  onError((error, errorInfo) => {
    console.error("Error boundary caught an error:", error, errorInfo);
    hasError = true;
    error = { error, errorInfo };
    dispatch("error", { error, errorInfo });
  });
</script>

{#if hasError}
  <div class="min-h-screen bg-red-50 dark:bg-red-900/20 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div class="flex items-center mb-4">
        <div class="flex-shrink-0">
          <svg class="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-lg font-medium text-red-800 dark:text-red-200">Something went wrong</h3>
        </div>
      </div>
      <div class="mb-4">
        <p class="text-sm text-red-700 dark:text-red-300">An unexpected error occurred while loading this page. This has been logged and will be investigated.</p>
      </div>
      <div class="flex space-x-3">
        <button class="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" on:click={() => window.location.reload()}> Reload Page </button>
        <button
          class="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          on:click={() => {
            hasError = false;
            error = null;
          }}
        >
          Try Again
        </button>
      </div>
      {#if error}
        <details class="mt-4">
          <summary class="text-sm text-red-600 dark:text-red-400 cursor-pointer">Technical Details</summary>
          <pre class="mt-2 text-xs text-red-500 dark:text-red-300 bg-red-100 dark:bg-red-900/50 p-2 rounded overflow-auto">{error.error?.message || "Unknown error"}</pre>
        </details>
      {/if}
    </div>
  </div>
{:else}
  <slot />
{/if}
