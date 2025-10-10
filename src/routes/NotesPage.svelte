<script>
  import NoteCard from "$lib/components/NoteCard.svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
</script>

<svelte:head>
  <title>Voice Notes - Shivo Assistant</title>
</svelte:head>

<ShivoHUD />

<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
  <NoteCard />
</div>
