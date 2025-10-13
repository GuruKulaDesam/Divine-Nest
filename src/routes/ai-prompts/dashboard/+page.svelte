<script>
  import { onMount } from 'svelte';
  import { aiPrompts } from '$lib/stores/aiPrompts';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { goto } from '$app/navigation';

  let aiPromptsData = [];
  let filteredPrompts = [];
  let analytics = {
    totalPrompts: 0,
    activePrompts: 0,
    byType: {},
    byCategory: {},
    byFrequency: {}
  };

  // Subscribe to store
  const unsubscribe = aiPrompts.subscribe(data => {
    aiPromptsData = data;
    filteredPrompts = data;
    calculateAnalytics();
  });

  function calculateAnalytics() {
    analytics.totalPrompts = aiPromptsData.length;
    analytics.activePrompts = aiPromptsData.filter(p => p.trigger_time).length;

    // Count by type
    analytics.byType = aiPromptsData.reduce((acc, prompt) => {
      acc[prompt.type] = (acc[prompt.type] || 0) + 1;
      return acc;
    }, {});

    // Count by category
    analytics.byCategory = aiPromptsData.reduce((acc, prompt) => {
      acc[prompt.category] = (acc[prompt.category] || 0) + 1;
      return acc;
    }, {});

    // Count by frequency
    analytics.byFrequency = aiPromptsData.reduce((acc, prompt) => {
      acc[prompt.frequency] = (acc[prompt.frequency] || 0) + 1;
      return acc;
    }, {});
  }

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
      goto('/ai-prompts/create');
    } else if (lowerCommand.includes('review') || lowerCommand.includes('view') || lowerCommand.includes('list')) {
      goto('/ai-prompts/review');
    } else if (lowerCommand.includes('morning prayer') || lowerCommand.includes('prayer reminder')) {
      // Find and show morning prayer prompt
      const prayerPrompt = aiPromptsData.find(p => p.purpose.toLowerCase().includes('prayer'));
      if (prayerPrompt) {
        goto(`/ai-prompts/update/${prayerPrompt.id}`);
      }
    }
  }

  onMount(() => {
    // Initial analytics calculation
    calculateAnalytics();
  });

  // Cleanup subscription
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:head>
  <title>AI Prompts Dashboard - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">AI Prompts Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">Manage automated reminders and intelligent prompts</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create new prompt' or 'show prayer reminder'" />
      <button
        class="btn btn-primary"
        on:click={() => goto('/ai-prompts/create')}
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Create Prompt
      </button>
    </div>
  </div>

  <!-- Analytics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Prompts -->
    <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Total Prompts</h3>
            <p class="text-3xl font-bold">{analytics.totalPrompts}</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Active Prompts -->
    <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Active Prompts</h3>
            <p class="text-3xl font-bold">{analytics.activePrompts}</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Most Used Type -->
    <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Top Type</h3>
            <p class="text-xl font-bold">{Object.keys(analytics.byType).length > 0 ? Object.keys(analytics.byType).reduce((a, b) => analytics.byType[a] > analytics.byType[b] ? a : b) : 'None'}</p>
            <p class="text-sm opacity-80">{Object.keys(analytics.byType).length > 0 ? Math.max(...Object.values(analytics.byType)) : 0} prompts</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Most Used Category -->
    <div class="card bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Top Category</h3>
            <p class="text-xl font-bold">{Object.keys(analytics.byCategory).length > 0 ? Object.keys(analytics.byCategory).reduce((a, b) => analytics.byCategory[a] > analytics.byCategory[b] ? a : b) : 'None'}</p>
            <p class="text-sm opacity-80">{Object.keys(analytics.byCategory).length > 0 ? Math.max(...Object.values(analytics.byCategory)) : 0} prompts</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <button
      class="card bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
      on:click={() => goto('/ai-prompts/create')}
    >
      <div class="card-body">
        <div class="flex items-center">
          <svg class="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Create New Prompt</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Set up automated reminders</p>
          </div>
        </div>
      </div>
    </button>

    <button
      class="card bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500"
      on:click={() => goto('/ai-prompts/review')}
    >
      <div class="card-body">
        <div class="flex items-center">
          <svg class="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Review All Prompts</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Manage and analyze prompts</p>
          </div>
        </div>
      </div>
    </button>

    <button
      class="card bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500"
      on:click={() => goto('/ai-prompts/update/1')}
    >
      <div class="card-body">
        <div class="flex items-center">
          <svg class="w-8 h-8 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Edit Morning Prayer</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Quick edit common prompt</p>
          </div>
        </div>
      </div>
    </button>
  </div>

  <!-- Recent Prompts Table -->
  <div class="card bg-white dark:bg-gray-800 shadow-lg">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Recent AI Prompts</h2>
        <button
          class="btn btn-outline btn-sm"
          on:click={() => goto('/ai-prompts/review')}
        >
          View All
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Purpose</th>
              <th>Category</th>
              <th>Frequency</th>
              <th>Trigger Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredPrompts.slice(0, 5) as prompt}
              <tr class="hover">
                <td>
                  <span class="badge badge-outline badge-primary">{prompt.type}</span>
                </td>
                <td class="font-medium">{prompt.purpose}</td>
                <td>{prompt.category}</td>
                <td>
                  <span class="badge badge-outline badge-secondary">{prompt.frequency}</span>
                </td>
                <td>{prompt.trigger_time || 'Not set'}</td>
                <td>
                  <div class="flex gap-2">
                    <button
                      class="btn btn-ghost btn-xs"
                      on:click={() => goto(`/ai-prompts/update/${prompt.id}`)}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      class="btn btn-ghost btn-xs text-red-500"
                      on:click={() => {
                        if (confirm('Delete this prompt?')) {
                          aiPrompts.deleteAIPrompt(prompt.id);
                        }
                      }}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Discussion Forum -->
  <div class="mt-8">
    <DiscussionForum tableName="ai_prompts" recordId="dashboard" />
  </div>
</div>