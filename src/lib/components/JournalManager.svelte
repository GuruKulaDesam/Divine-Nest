<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { getJournalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } from "../data/wellness.js";

  const dispatch = createEventDispatcher();

  let journalEntries = [];
  let showForm = false;
  let editingEntry = null;
  let formData = {
    mood: "content",
    category: "general",
    title: "",
    content: "",
    tags: "",
    weather: "sunny",
    private: false,
  };

  const moods = [
    { value: "joyful", label: "Joyful", emoji: "😊" },
    { value: "peaceful", label: "Peaceful", emoji: "😌" },
    { value: "grateful", label: "Grateful", emoji: "🙏" },
    { value: "content", label: "Content", emoji: "☺️" },
    { value: "inspired", label: "Inspired", emoji: "✨" },
    { value: "anxious", label: "Anxious", emoji: "😰" },
    { value: "tired", label: "Tired", emoji: "😴" },
    { value: "worried", label: "Worried", emoji: "😟" },
  ];

  const categories = [
    { value: "general", label: "General" },
    { value: "gratitude", label: "Gratitude" },
    { value: "reflection", label: "Reflection" },
    { value: "goals", label: "Goals" },
    { value: "challenges", label: "Challenges" },
    { value: "achievements", label: "Achievements" },
    { value: "relationships", label: "Relationships" },
    { value: "health", label: "Health" },
  ];

  const weatherOptions = [
    { value: "sunny", label: "Sunny", emoji: "☀️" },
    { value: "cloudy", label: "Cloudy", emoji: "☁️" },
    { value: "rainy", label: "Rainy", emoji: "🌧️" },
    { value: "stormy", label: "Stormy", emoji: "⛈️" },
    { value: "snowy", label: "Snowy", emoji: "❄️" },
  ];

  onMount(async () => {
    await loadJournalEntries();
  });

  async function loadJournalEntries() {
    journalEntries = await getJournalEntries();
    dispatch("update");
  }

  function resetForm() {
    formData = {
      mood: "content",
      category: "general",
      title: "",
      content: "",
      tags: "",
      weather: "sunny",
      private: false,
    };
    editingEntry = null;
  }

  function openForm(entry = null) {
    if (entry) {
      editingEntry = entry;
      formData = {
        mood: entry.mood,
        category: entry.category,
        title: entry.title,
        content: entry.content,
        tags: entry.tags ? entry.tags.join(", ") : "",
        weather: entry.weather || "sunny",
        private: entry.private || false,
      };
    } else {
      resetForm();
    }
    showForm = true;
  }

  async function saveEntry() {
    if (!formData.title.trim() || !formData.content.trim()) return;

    try {
      const entryData = {
        mood: formData.mood,
        category: formData.category,
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        weather: formData.weather,
        private: formData.private,
      };

      if (editingEntry) {
        await updateJournalEntry(editingEntry.id, entryData);
      } else {
        await addJournalEntry(entryData);
      }

      await loadJournalEntries();
      showForm = false;
      resetForm();
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  }

  async function deleteEntry(entry) {
    if (confirm("Are you sure you want to delete this journal entry?")) {
      try {
        await deleteJournalEntry(entry.id);
        await loadJournalEntries();
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  }

  function getMoodInfo(mood) {
    return moods.find((m) => m.value === mood) || moods[0];
  }

  function getCategoryColor(category) {
    const colors = {
      gratitude: "bg-yellow-100 text-yellow-800",
      reflection: "bg-blue-100 text-blue-800",
      goals: "bg-green-100 text-green-800",
      challenges: "bg-red-100 text-red-800",
      achievements: "bg-purple-100 text-purple-800",
      relationships: "bg-pink-100 text-pink-800",
      health: "bg-teal-100 text-teal-800",
      general: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.general;
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-green-900 dark:text-green-100">📔 Gratitude Journal</h2>
      <p class="text-green-700 dark:text-green-300 mt-1">Reflect on your journey and cultivate gratitude</p>
    </div>
    <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors" on:click={() => openForm()}> + New Entry </button>
  </div>

  <!-- Journal Entries -->
  <div class="space-y-4">
    {#each journalEntries as entry}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-green-200 dark:border-green-800 p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <span class="text-2xl">{getMoodInfo(entry.mood).emoji}</span>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
              <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>{formatDate(entry.date)}</span>
                <span class="px-2 py-1 rounded-full text-xs font-medium {getCategoryColor(entry.category)}">
                  {entry.category}
                </span>
                {#if entry.weather}
                  <span>{weatherOptions.find((w) => w.value === entry.weather)?.emoji}</span>
                {/if}
              </div>
            </div>
          </div>
          <div class="flex space-x-1">
            <button class="text-blue-600 hover:text-blue-800 p-1" on:click={() => openForm(entry)} title="Edit"> ✏️ </button>
            <button class="text-red-600 hover:text-red-800 p-1" on:click={() => deleteEntry(entry)} title="Delete"> 🗑️ </button>
          </div>
        </div>

        <div class="prose prose-sm dark:prose-invert max-w-none mb-4">
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{entry.content}</p>
        </div>

        {#if entry.tags && entry.tags.length > 0}
          <div class="flex flex-wrap gap-2">
            {#each entry.tags as tag}
              <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                #{tag}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if journalEntries.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">📔</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Start Your Gratitude Journey</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">Begin writing your first journal entry to reflect on your day</p>
      <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors" on:click={() => openForm()}> Write Your First Entry </button>
    </div>
  {/if}

  <!-- Add/Edit Form Modal -->
  {#if showForm}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingEntry ? "Edit Journal Entry" : "New Journal Entry"}
        </h3>

        <form on:submit|preventDefault={saveEntry} class="space-y-4">
          <div>
            <label for="journal-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Title </label>
            <input id="journal-title" type="text" bind:value={formData.title} placeholder="Give your entry a meaningful title..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="journal-mood" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Mood </label>
              <select id="journal-mood" bind:value={formData.mood} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                {#each moods as mood}
                  <option value={mood.value}>{mood.emoji} {mood.label}</option>
                {/each}
              </select>
            </div>

            <div>
              <label for="journal-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Category </label>
              <select id="journal-category" bind:value={formData.category} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                {#each categories as category}
                  <option value={category.value}>{category.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <div>
            <label for="journal-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Your Thoughts </label>
            <textarea id="journal-content" bind:value={formData.content} placeholder="Write about your day, what you're grateful for, or any reflections..." rows="8" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="journal-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Tags (comma-separated) </label>
              <input id="journal-tags" type="text" bind:value={formData.tags} placeholder="family, gratitude, health..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label for="journal-weather" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Weather </label>
              <select id="journal-weather" bind:value={formData.weather} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                {#each weatherOptions as weather}
                  <option value={weather.value}>{weather.emoji} {weather.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <input type="checkbox" id="private" bind:checked={formData.private} class="rounded border-gray-300 text-green-600 focus:ring-green-500" />
            <label for="private" class="text-sm text-gray-700 dark:text-gray-300"> Make this entry private </label>
          </div>

          <div class="flex space-x-3 pt-4">
            <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              {editingEntry ? "Update" : "Save"} Entry
            </button>
            <button
              type="button"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              on:click={() => {
                showForm = false;
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
