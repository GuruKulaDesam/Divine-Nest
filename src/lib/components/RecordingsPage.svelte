<script>
  import { onMount } from "svelte";
  import ShivoHUD from "$lib/components/ShivoHUD.svelte";
  import RecordingPanel from "$lib/components/RecordingPanel.svelte";
  import { recordings } from "$lib/stores/recordings.js";

  onMount(() => {
    console.log("Shivo RecordingsPage loaded");
  });
</script>

<svelte:head>
  <title>Recordings - Shivo Voice Assistant | Family Management</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-gray-900 dark:via-red-900 dark:to-pink-900">
  <ShivoHUD />

  <div class="container mx-auto px-4 py-8 pt-24">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">🎙️ Shivo Recordings</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Record and store voice memos with ease. Say "Start recording" or "பதிவு தொடங்கு" to begin recording.</p>
    </div>

    <!-- Recording Panel Component -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <RecordingPanel />
    </div>

    <!-- Recordings List -->
    {#if $recordings.length > 0}
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Recordings</h2>

        <div class="space-y-4">
          {#each $recordings as recording (recording.id)}
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="text-2xl">🎵</div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-white">{recording.title}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(recording.createdAt).toLocaleDateString()} • {recording.duration}s
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <button class="btn btn-sm btn-primary">Play</button>
                <button class="btn btn-sm btn-outline">Download</button>
                <button class="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
