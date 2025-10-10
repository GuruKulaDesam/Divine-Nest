<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let emotions = [
    {
      id: 1,
      emotion: 'Happy',
      intensity: 8,
      trigger: 'Family gathering',
      date: '2024-01-15',
      notes: 'Great time with family',
      category: 'Positive'
    },
    {
      id: 2,
      emotion: 'Anxious',
      intensity: 6,
      trigger: 'Work deadline',
      date: '2024-01-14',
      notes: 'Feeling stressed about project',
      category: 'Negative'
    },
    {
      id: 3,
      emotion: 'Peaceful',
      intensity: 9,
      trigger: 'Morning meditation',
      date: '2024-01-13',
      notes: 'Very calm after yoga session',
      category: 'Positive'
    }
  ];

  let searchQuery = '';
  let selectedCategory = 'all';
  let showAddModal = false;
  let editingEmotion = null;

  let newEmotion = {
    emotion: '',
    intensity: 5,
    trigger: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    category: 'Positive'
  };

  let editEmotion = {
    emotion: '',
    intensity: 5,
    trigger: '',
    date: '',
    notes: '',
    category: 'Positive'
  };

  const emotionTypes = [
    'Happy', 'Sad', 'Angry', 'Anxious', 'Peaceful', 'Excited',
    'Frustrated', 'Calm', 'Joyful', 'Worried', 'Content', 'Stressed',
    'Grateful', 'Overwhelmed', 'Confident', 'Insecure'
  ];

  const categories = [
    { id: 'all', name: 'All Emotions', icon: 'mdi:emoticon-outline' },
    { id: 'Positive', name: 'Positive', icon: 'mdi:emoticon-happy-outline', color: 'text-green-600' },
    { id: 'Negative', name: 'Negative', icon: 'mdi:emoticon-sad-outline', color: 'text-red-600' },
    { id: 'Neutral', name: 'Neutral', icon: 'mdi:emoticon-neutral-outline', color: 'text-yellow-600' }
  ];

  $: filteredEmotions = emotions.filter(emotion => {
    const matchesSearch = emotion.emotion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emotion.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emotion.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || emotion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  function addEmotion() {
    if (!newEmotion.emotion.trim()) return;

    const emotion = {
      id: Date.now(),
      ...newEmotion
    };

    emotions = [...emotions, emotion];

    newEmotion = {
      emotion: '',
      intensity: 5,
      trigger: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      category: 'Positive'
    };

    showAddModal = false;
  }

  function editEmotionItem(emotion) {
    editingEmotion = emotion;
    editEmotion = { ...emotion };
  }

  function updateEmotion() {
    if (!editEmotion.emotion.trim()) return;

    emotions = emotions.map(e =>
      e.id === editingEmotion.id ? { ...editEmotion } : e
    );

    editingEmotion = null;
  }

  function deleteEmotion(id) {
    emotions = emotions.filter(e => e.id !== id);
  }

  function getIntensityColor(intensity) {
    if (intensity >= 8) return 'bg-green-500';
    if (intensity >= 6) return 'bg-yellow-500';
    if (intensity >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  }

  function getEmotionIcon(emotion) {
    const iconMap = {
      'Happy': 'mdi:emoticon-happy',
      'Sad': 'mdi:emoticon-sad',
      'Angry': 'mdi:emoticon-angry',
      'Anxious': 'mdi:emoticon-worried',
      'Peaceful': 'mdi:emoticon-cool',
      'Excited': 'mdi:emoticon-excited',
      'Frustrated': 'mdi:emoticon-confused',
      'Calm': 'mdi:emoticon-cool',
      'Joyful': 'mdi:emoticon-happy',
      'Worried': 'mdi:emoticon-worried',
      'Content': 'mdi:emoticon-happy',
      'Stressed': 'mdi:emoticon-sad',
      'Grateful': 'mdi:emoticon-happy',
      'Overwhelmed': 'mdi:emoticon-confused',
      'Confident': 'mdi:emoticon-cool',
      'Insecure': 'mdi:emoticon-sad'
    };
    return iconMap[emotion] || 'mdi:emoticon-outline';
  }

  function getCategoryStats() {
    const stats = {};
    categories.forEach(cat => {
      if (cat.id !== 'all') {
        stats[cat.id] = emotions.filter(e => e.category === cat.id).length;
      }
    });
    return stats;
  }

  $: categoryStats = getCategoryStats();
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Emotions Tracker</h1>
      <p class="text-base-content/70 mt-1">Track and understand your emotional well-being</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Emotion
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each categories.slice(1) as category}
      <div class="stat bg-base-100 rounded-xl shadow-sm">
        <div class="stat-figure {category.color}">
          <Icon icon={category.icon} class="w-8 h-8" />
        </div>
        <div class="stat-title">{category.name} Emotions</div>
        <div class="stat-value">{categoryStats[category.id] || 0}</div>
        <div class="stat-desc">Total recorded</div>
      </div>
    {/each}
  </div>

  <!-- Filters -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
      <label class="label">
        <span class="label-text">Search Emotions</span>
      </label>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search by emotion, trigger, or notes..."
        class="input input-bordered w-full"
      />
    </div>
    <div>
      <label class="label">
        <span class="label-text">Category</span>
      </label>
      <select bind:value={selectedCategory} class="select select-bordered w-full">
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Emotions List -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredEmotions as emotion (emotion.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                  <Icon icon={getEmotionIcon(emotion.emotion)} class="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 class="card-title text-lg">{emotion.emotion}</h3>
                <p class="text-sm text-base-content/70">{emotion.date}</p>
              </div>
            </div>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a on:click={() => editEmotionItem(emotion)}>Edit</a></li>
                <li><a class="text-error" on:click={() => deleteEmotion(emotion.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium">Intensity</span>
                <span class="text-sm">{emotion.intensity}/10</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full {getIntensityColor(emotion.intensity)}"
                  style="width: {emotion.intensity * 10}%"
                ></div>
              </div>
            </div>

            <div>
              <span class="text-sm font-medium">Trigger:</span>
              <p class="text-sm text-base-content/80">{emotion.trigger}</p>
            </div>

            {#if emotion.notes}
              <div>
                <span class="text-sm font-medium">Notes:</span>
                <p class="text-sm text-base-content/80">{emotion.notes}</p>
              </div>
            {/if}

            <div class="badge {emotion.category === 'Positive' ? 'badge-success' : emotion.category === 'Negative' ? 'badge-error' : 'badge-warning'}">
              {emotion.category}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredEmotions.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:emoticon-outline" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/70">No emotions found</h3>
      <p class="text-base-content/50">Start tracking your emotions to see them here.</p>
    </div>
  {/if}
</div>

<!-- Add Emotion Modal -->
{#if showAddModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Add New Emotion</h3>

      <form on:submit|preventDefault={addEmotion} class="space-y-4">
        <div>
          <label class="label">
            <span class="label-text">Emotion *</span>
          </label>
          <select bind:value={newEmotion.emotion} class="select select-bordered w-full" required>
            <option value="">Select emotion</option>
            {#each emotionTypes as emotion}
              <option value={emotion}>{emotion}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Intensity (1-10)</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            bind:value={newEmotion.intensity}
            class="range range-primary"
          />
          <div class="text-center text-sm mt-1">{newEmotion.intensity}/10</div>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Trigger</span>
          </label>
          <input
            type="text"
            bind:value={newEmotion.trigger}
            placeholder="What triggered this emotion?"
            class="input input-bordered w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Date</span>
          </label>
          <input
            type="date"
            bind:value={newEmotion.date}
            class="input input-bordered w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select bind:value={newEmotion.category} class="select select-bordered w-full">
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            bind:value={newEmotion.notes}
            placeholder="Additional notes..."
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="modal-action">
          <button
            type="button"
            class="btn"
            on:click={() => showAddModal = false}
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Add Emotion
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Edit Emotion Modal -->
{#if editingEmotion}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Edit Emotion</h3>

      <form on:submit|preventDefault={updateEmotion} class="space-y-4">
        <div>
          <label class="label">
            <span class="label-text">Emotion *</span>
          </label>
          <select bind:value={editEmotion.emotion} class="select select-bordered w-full" required>
            <option value="">Select emotion</option>
            {#each emotionTypes as emotion}
              <option value={emotion}>{emotion}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Intensity (1-10)</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            bind:value={editEmotion.intensity}
            class="range range-primary"
          />
          <div class="text-center text-sm mt-1">{editEmotion.intensity}/10</div>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Trigger</span>
          </label>
          <input
            type="text"
            bind:value={editEmotion.trigger}
            placeholder="What triggered this emotion?"
            class="input input-bordered w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Date</span>
          </label>
          <input
            type="date"
            bind:value={editEmotion.date}
            class="input input-bordered w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select bind:value={editEmotion.category} class="select select-bordered w-full">
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea
            bind:value={editEmotion.notes}
            placeholder="Additional notes..."
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="modal-action">
          <button
            type="button"
            class="btn"
            on:click={() => editingEmotion = null}
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Update Emotion
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}