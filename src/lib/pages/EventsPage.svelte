<script>
  import { onMount } from "svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
  import EventCalendar from "$lib/components/EventCalendar.svelte";
  import { events } from "$lib/stores/events.js";

  onMount(() => {
    console.log("Shivo EventsPage loaded");
  });
</script>

<svelte:head>
  <title>Events - Shivo Voice Assistant | Family Management</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-gray-900 dark:via-purple-900 dark:to-fuchsia-900">
  <ShivoHUD />

  <div class="container mx-auto px-4 py-8 pt-24">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">📅 Shivo Events</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Plan and manage family events with voice commands. Say "Schedule event" or "நிகழ்வு திட்டமிடு" to create events.</p>
    </div>

    <!-- Event Calendar Component -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <EventCalendar />
    </div>
  </div>
</div>
