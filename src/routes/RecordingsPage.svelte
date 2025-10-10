<script>
  import RecordingPanel from "$lib/components/RecordingPanel.svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
</script>

<svelte:head>
  <title>Voice Recordings - Shivo Assistant</title>
</svelte:head>

<ShivoHUD />

<div class="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 pt-20">
  <RecordingPanel />
</div>
