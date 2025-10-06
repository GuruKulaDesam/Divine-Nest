<script>
  import { viewMode } from "../stores/viewMode.js";

  // Reactive statement to show current view mode
  $: currentMode = $viewMode;
  $: isMobile = typeof window !== "undefined" && window.innerWidth < 768;
</script>

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">View Mode Test</h2>

  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Current View Mode:</span>
      <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
        {currentMode}
      </span>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Device Type:</span>
      <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
        {isMobile ? "Mobile" : "Desktop"}
      </span>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active Layout:</span>
      <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
        {currentMode === "auto" ? (isMobile ? "Mobile" : "Desktop") : currentMode === "mobile" ? "Mobile" : "Desktop"}
      </span>
    </div>
  </div>

  <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">How to Test:</h3>
    <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
      <li>• Click the toggle button in the top-right corner</li>
      <li>• Switch between Auto, Mobile, and Desktop modes</li>
      <li>• Resize your browser window to test responsive behavior</li>
      <li>• Notice how the layout changes between mobile and desktop designs</li>
    </ul>
  </div>
</div>
