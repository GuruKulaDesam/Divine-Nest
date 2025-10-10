<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let journalEntries = [];
  let newEntry = "";
  let selectedMood = "happy";
  let loading = true;

  const moodOptions = [
    { value: "happy", label: "Happy", icon: "heroicons:face-smile", color: "text-yellow-500" },
    { value: "sad", label: "Sad", icon: "heroicons:face-frown", color: "text-blue-500" },
    { value: "anxious", label: "Anxious", icon: "heroicons:exclamation-triangle", color: "text-orange-500" },
    { value: "calm", label: "Calm", icon: "heroicons:cloud", color: "text-green-500" },
    { value: "energetic", label: "Energetic", icon: "heroicons:bolt", color: "text-purple-500" },
  ];

  onMount(async () => {
    // Simulate loading journal entries
    setTimeout(() => {
      journalEntries = [
        {
          id: 1,
          date: "2025-10-06",
          mood: "happy",
          content: "Had a wonderful family dinner today. Everyone was in good spirits and we shared stories from our childhood.",
          tags: ["family", "gratitude"],
        },
        {
          id: 2,
          date: "2025-10-05",
          mood: "calm",
          content: "Morning meditation went well. Feeling centered and ready for the day ahead.",
          tags: ["meditation", "mindfulness"],
        },
      ];
      loading = false;
    }, 1000);
  });

  function addJournalEntry() {
    if (newEntry.trim()) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        mood: selectedMood,
        content: newEntry,
        tags: [],
      };
      journalEntries = [entry, ...journalEntries];
      newEntry = "";
    }
  }

  function getMoodIcon(mood) {
    const option = moodOptions.find((opt) => opt.value === mood);
    return option ? option.icon : "heroicons:face-smile";
  }

  function getMoodColor(mood) {
    const option = moodOptions.find((opt) => opt.value === mood);
    return option ? option.color : "text-gray-500";
  }
</script>

<div class="p-6">
  <div class="flex items-center space-x-3 mb-6">
    <Icon icon="heroicons:pencil-square" class="w-8 h-8 text-teal-500" />
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Health Journal</h1>
  </div>

  <!-- Add New Entry -->
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">How are you feeling today?</h2>

    <!-- Mood Selector -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Mood</label>
      <div class="flex space-x-2">
        {#each moodOptions as mood}
          <button class="flex flex-col items-center p-3 rounded-lg border-2 transition-all {selectedMood === mood.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}" on:click={() => (selectedMood = mood.value)}>
            <Icon icon={mood.icon} class="w-6 h-6 {mood.color} mb-1" />
            <span class="text-xs text-gray-600 dark:text-gray-400">{mood.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Journal Entry -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Journal Entry</label>
      <textarea bind:value={newEntry} placeholder="Write about your day, thoughts, or feelings..." class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" rows="4"></textarea>
    </div>

    <!-- Submit Button -->
    <button on:click={addJournalEntry} disabled={!newEntry.trim()} class="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"> Add Entry </button>
  </div>

  <!-- Journal Entries -->
  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
    </div>
  {:else}
    <div class="space-y-4">
      {#each journalEntries as entry}
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <Icon icon={getMoodIcon(entry.mood)} class="w-6 h-6 {getMoodColor(entry.mood)}" />
              <div>
                <div class="font-medium text-gray-900 dark:text-white capitalize">{entry.mood}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{entry.date}</div>
              </div>
            </div>
          </div>

          <p class="text-gray-700 dark:text-gray-300 mb-3">{entry.content}</p>

          {#if entry.tags.length > 0}
            <div class="flex flex-wrap gap-2">
              {#each entry.tags as tag}
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  #{tag}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
