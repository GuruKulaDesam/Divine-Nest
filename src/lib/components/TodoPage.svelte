<script>
  import { onMount } from "svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
  import TodoList from "$lib/components/TodoList.svelte";
  import { todos } from "$lib/stores/todos.js";

  onMount(() => {
    console.log("Shivo TodoPage loaded");
  });
</script>

<svelte:head>
  <title>Todos - Shivo Voice Assistant | Family Management</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
  <ShivoHUD />

  <div class="container mx-auto px-4 py-8 pt-24">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">📝 Shivo Todos</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Manage your tasks with voice commands. Say "Add todo" or "டுடோ சேர்க்க" to create new tasks.</p>
    </div>

    <!-- Todo List Component -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <TodoList />
    </div>
  </div>
</div>
