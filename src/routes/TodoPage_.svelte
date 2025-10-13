<script>
  import TodoList from "$lib/components/TodoList.svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
</script>

<svelte:head>
  <title>Todos - Shivo Assistant</title>
</svelte:head>

<ShivoHUD />

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20">
  <TodoList />
</div>
