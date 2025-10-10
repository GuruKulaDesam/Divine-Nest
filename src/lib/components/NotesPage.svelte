<script>
  import { onMount } from "svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import { notes } from "$lib/stores/notes.js";

  onMount(() => {
    console.log("Shivo NotesPage loaded");
  });
</script>

<svelte:head>
  <title>Notes - Shivo Voice Assistant | Family Management</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-teal-900">
  <ShivoHUD />

  <div class="container mx-auto px-4 py-8 pt-24">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">📓 Shivo Notes</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Capture your thoughts and ideas with voice. Say "Create note" or "குறிப்பு எழுது" to add new notes.</p>
    </div>

    <!-- Notes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each $notes as note (note.id)}
        <NoteCard {note} />
      {/each}
    </div>

    {#if $notes.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No notes yet</h3>
        <p class="text-gray-500 dark:text-gray-500">Try saying "Create a note" to get started!</p>
      </div>
    {/if}
  </div>
</div>
