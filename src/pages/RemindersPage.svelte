<script>
  import ReminderList from "$lib/components/ReminderList.svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
</script>

<svelte:head>
  <title>Reminders - Shivo Assistant</title>
</svelte:head>

<ShivoHUD />

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20">
  <ReminderList />
</div>
