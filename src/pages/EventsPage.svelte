<script>
  import EventCalendar from "$lib/components/EventCalendar.svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
</script>

<svelte:head>
  <title>Events - Shivo Assistant</title>
</svelte:head>

<ShivoHUD />

<div class="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 pt-20">
  <EventCalendar />
</div>
