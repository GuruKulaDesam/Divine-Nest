<script>
  import { onMount } from "svelte";

  let message = "Loading...";

  onMount(() => {
    message = "ViewModeTestPage is working!";
    console.log("ViewModeTestPage mounted successfully");
  });
</script>

<div class="p-6 bg-blue-100 dark:bg-blue-900 rounded-xl">
  <h1 class="text-2xl font-bold text-blue-800 dark:text-blue-200">Test Page</h1>
  <p class="text-blue-700 dark:text-blue-300 mt-4">{message}</p>
  <p class="text-sm text-blue-600 dark:text-blue-400 mt-2">If you can see this, the route is working!</p>
</div>
