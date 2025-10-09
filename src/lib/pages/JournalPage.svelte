<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let journals = [
    {
      id: 1,
      title: 'Daily Reflections',
      content: 'Today was a productive day. I completed my morning routine and spent quality time with family.',
      date: '2024-01-15',
      mood: 'happy',
      tags: ['reflection', 'family', 'productivity'],
      category: 'Personal'
    },
    {
      id: 2,
      title: 'Learning Journey',
      content: 'Started learning about sustainable living practices. The concepts are fascinating.',
      date: '2024-01-14',
      mood: 'thoughtful',
      tags: ['learning', 'sustainability'],
      category: 'Education'
    },
    {
      id: 3,
      title: 'Family Moments',
      content: 'Had a wonderful dinner with the family. Everyone shared stories from their day.',
      date: '2024-01-13',
      mood: 'joyful',
      tags: ['family', 'dinner', 'stories'],
      category: 'Family'
    }
  ];

  let filteredJournals = journals;
  let searchQuery = '';
  let selectedCategory = 'all';
  let selectedMood = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingJournal = null;

  let newJournal = {
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    tags: [],
    category: 'Personal'
  };

  let categories = ['Personal', 'Family', 'Education', 'Work', 'Health', 'Spirituality'];
  let moods = [
    { id: 'happy', name: 'Happy', icon: 'mdi:emoticon-happy', color: 'text-yellow-500' },
    { id: 'sad', name: 'Sad', icon: 'mdi:emoticon-sad', color: 'text-blue-500' },
    { id: 'angry', name: 'Angry', icon: 'mdi:emoticon-angry', color: 'text-red-500' },
    { id: 'thoughtful', name: 'Thoughtful', icon: 'mdi:emoticon-neutral', color: 'text-purple-500' },
    { id: 'joyful', name: 'Joyful', icon: 'mdi:emoticon-excited', color: 'text-green-500' },
    { id: 'neutral', name: 'Neutral', icon: 'mdi:emoticon-neutral', color: 'text-gray-500' }
  ];

  $: {
    filteredJournals = journals.filter(journal => {
      const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           journal.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           journal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
      const matchesMood = selectedMood === 'all' || journal.mood === selectedMood;
      return matchesSearch && matchesCategory && matchesMood;
    });
  }

  function addJournal() {
    if (newJournal.title.trim() && newJournal.content.trim()) {
      const journal = {
        ...newJournal,
        id: Date.now(),
        tags: newJournal.tagsInput ? newJournal.tagsInput.split(',').map(tag => tag.trim()) : []
      };
      journals = [...journals, journal];
      resetNewJournal();
      showAddModal = false;
    }
  }

  function editJournal(journal) {
    editingJournal = { ...journal, tagsInput: journal.tags.join(', ') };
    showEditModal = true;
  }

  function updateJournal() {
    if (editingJournal.title.trim() && editingJournal.content.trim()) {
      const updatedJournal = {
        ...editingJournal,
        tags: editingJournal.tagsInput ? editingJournal.tagsInput.split(',').map(tag => tag.trim()) : []
      };
      journals = journals.map(j => j.id === updatedJournal.id ? updatedJournal : j);
      showEditModal = false;
      editingJournal = null;
    }
  }

  function deleteJournal(id) {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      journals = journals.filter(j => j.id !== id);
    }
  }

  function resetNewJournal() {
    newJournal = {
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      mood: 'neutral',
      tags: [],
      category: 'Personal',
      tagsInput: ''
    };
  }

  function getMoodIcon(moodId) {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.icon : 'mdi:emoticon-neutral';
  }

  function getMoodColor(moodId) {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.color : 'text-gray-500';
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content flex items-center gap-3">
        <Icon icon="mdi:book-open-variant" class="text-3xl text-primary" />
        Journal
      </h1>
      <p class="text-base-content/70 mt-1">Record your thoughts, experiences, and reflections</p>
    </div>
    <button
      on:click={() => { showAddModal = true; resetNewJournal(); }}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" />
      New Entry
    </button>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Journals</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title, content, or tags..."
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered w-full">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Mood</span>
        </label>
        <select bind:value={selectedMood} class="select select-bordered w-full">
          <option value="all">All Moods</option>
          {#each moods as mood}
            <option value={mood.id}>{mood.name}</option>
          {/each}
        </select>
      </div>
      <div class="flex items-end">
        <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div class="stat">
            <div class="stat-title">Total Entries</div>
            <div class="stat-value text-primary">{journals.length}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Journal Entries -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each filteredJournals as journal (journal.id)}
      <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-base-content mb-2">{journal.title}</h3>
            <div class="flex items-center gap-2 text-sm text-base-content/60 mb-2">
              <Icon icon="mdi:calendar" />
              {formatDate(journal.date)}
              <span class="mx-2">•</span>
              <span class="badge badge-outline">{journal.category}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon={getMoodIcon(journal.mood)} class="text-2xl {getMoodColor(journal.mood)}" />
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button on:click={() => editJournal(journal)}>Edit Entry</button></li>
                <li><button class="text-error" on:click={() => deleteJournal(journal.id)}>Delete</button></li>
              </ul>
            </div>
          </div>
        </div>

        <p class="text-base-content/80 mb-4 line-clamp-3">{journal.content}</p>

        {#if journal.tags.length > 0}
          <div class="flex flex-wrap gap-1 mb-4">
            {#each journal.tags as tag}
              <span class="badge badge-primary badge-sm">#{tag}</span>
            {/each}
          </div>
        {/if}

        <div class="flex justify-between items-center pt-4 border-t border-base-300">
          <div class="text-sm text-base-content/60">
            {journal.content.length} characters
          </div>
          <button class="btn btn-ghost btn-sm text-primary">
            Read More
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredJournals.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:book-open-page-variant-outline" class="text-6xl text-base-content/30 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-base-content/60 mb-2">No journal entries found</h3>
      <p class="text-base-content/50 mb-4">Start writing your first journal entry to capture your thoughts and experiences.</p>
      <button
        on:click={() => { showAddModal = true; resetNewJournal(); }}
        class="btn btn-primary"
      >
        Write Your First Entry
      </button>
    </div>
  {/if}
</div>

<!-- Add Journal Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-base-300">
        <h3 class="text-xl font-semibold text-base-content">New Journal Entry</h3>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form on:submit|preventDefault={addJournal} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Title *</span>
              </label>
              <input
                type="text"
                bind:value={newJournal.title}
                placeholder="Give your entry a title"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Date</span>
              </label>
              <input
                type="date"
                bind:value={newJournal.date}
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={newJournal.category} class="select select-bordered w-full">
                {#each categories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Mood</span>
              </label>
              <select bind:value={newJournal.mood} class="select select-bordered w-full">
                {#each moods as mood}
                  <option value={mood.id}>{mood.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Content *</span>
            </label>
            <textarea
              bind:value={newJournal.content}
              placeholder="Write your thoughts, experiences, or reflections..."
              rows="6"
              class="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tags (comma separated)</span>
            </label>
            <input
              type="text"
              bind:value={newJournal.tagsInput}
              placeholder="reflection, family, learning"
              class="input input-bordered w-full"
            />
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-base-300 flex justify-end gap-3">
        <button
          on:click={() => showAddModal = false}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          on:click={addJournal}
          class="btn btn-primary"
          disabled={!newJournal.title.trim() || !newJournal.content.trim()}
        >
          Save Entry
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Journal Modal -->
{#if showEditModal && editingJournal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-base-300">
        <h3 class="text-xl font-semibold text-base-content">Edit Journal Entry</h3>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form on:submit|preventDefault={updateJournal} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Title *</span>
              </label>
              <input
                type="text"
                bind:value={editingJournal.title}
                placeholder="Give your entry a title"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Date</span>
              </label>
              <input
                type="date"
                bind:value={editingJournal.date}
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={editingJournal.category} class="select select-bordered w-full">
                {#each categories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Mood</span>
              </label>
              <select bind:value={editingJournal.mood} class="select select-bordered w-full">
                {#each moods as mood}
                  <option value={mood.id}>{mood.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Content *</span>
            </label>
            <textarea
              bind:value={editingJournal.content}
              placeholder="Write your thoughts, experiences, or reflections..."
              rows="6"
              class="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tags (comma separated)</span>
            </label>
            <input
              type="text"
              bind:value={editingJournal.tagsInput}
              placeholder="reflection, family, learning"
              class="input input-bordered w-full"
            />
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-base-300 flex justify-end gap-3">
        <button
          on:click={() => { showEditModal = false; editingJournal = null; }}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          on:click={updateJournal}
          class="btn btn-primary"
          disabled={!editingJournal.title.trim() || !editingJournal.content.trim()}
        >
          Update Entry
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>