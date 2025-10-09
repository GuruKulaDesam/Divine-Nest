<script lang="ts">
  import { todos as todosStore, todoActions } from "$lib/stores/todos";

  export let todos = undefined;

  $: todosList = todos || $todosStore;
</script>

<h2 class="text-lg font-bold mb-4">📋 குடும்பப் பட்டியல்</h2>
<ul class="space-y-2">
  {#each todosList as todo}
    <li class="flex items-center justify-between bg-orange-50 p-3 rounded shadow">
      <span class="{todo.completed ? 'line-through text-gray-500' : ''}">{todo.title}</span>
      <input type="checkbox" bind:checked={todo.completed} on:change={() => todoActions.toggle(todo.id)} />
    </li>
  {/each}
</ul>

{#if todosList.length === 0}
  <p class="text-gray-500 text-center py-8">இன்னும் பட்டியல் இல்லை. குரல் கட்டளையால் சேர்க்கலாம்!</p>
{/if}
