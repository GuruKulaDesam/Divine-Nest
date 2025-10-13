<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { family, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  // Filter and search state
  let searchTerm = '';
  let selectedCategory = '';
  let selectedType = '';
  let selectedSubCategory = '';
  let selectedMediaType = '';
  let sortBy = 'created_at';
  let sortOrder = 'desc';

  // Export state
  let isExporting = false;

  // Voice command handler
  function handleVoiceCommand(result) {
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('search for') || lowerResult.includes('find')) {
      const searchMatch = result.match(/(?:search for|find)\s+(.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    }

    if (lowerResult.includes('show profile')) {
      selectedCategory = 'Profile';
    } else if (lowerResult.includes('show wisdom') || lowerResult.includes('show life lessons')) {
      selectedCategory = 'Life Lessons';
    } else if (lowerResult.includes('show memories')) {
      selectedCategory = 'Memories';
    } else if (lowerResult.includes('show photos')) {
      selectedCategory = 'Photos';
      selectedMediaType = 'Photo';
    }

    if (lowerResult.includes('nuclear family')) {
      selectedType = 'Nuclear';
    }
  }

  // Filtered and sorted entries
  $: filteredEntries = $family
    .filter(entry => {
      // Role-based filtering
      if (!entry.applicable_roles?.includes($userProfile.role)) {
        return false;
      }

      // Search term filtering
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const searchableText = `${entry.title} ${entry.description} ${entry.sub_category} ${entry.location}`.toLowerCase();
        if (!searchableText.includes(term)) {
          return false;
        }
      }

      // Category filtering
      if (selectedCategory && entry.category !== selectedCategory) {
        return false;
      }

      // Type filtering
      if (selectedType && entry.type !== selectedType) {
        return false;
      }

      // Sub category filtering
      if (selectedSubCategory && entry.sub_category !== selectedSubCategory) {
        return false;
      }

      // Media type filtering
      if (selectedMediaType && entry.media_type !== selectedMediaType) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortBy] || '';
      let bVal = b[sortBy] || '';

      if (sortBy === 'date_time' || sortBy === 'created_at' || sortBy === 'updated_at') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  // Statistics
  $: stats = {
    total: filteredEntries.length,
    categories: new Set(filteredEntries.map(e => e.category)).size,
    types: new Set(filteredEntries.map(e => e.type)).size,
    mediaItems: filteredEntries.filter(e => e.media_url).length,
    byCategory: filteredEntries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + 1;
      return acc;
    }, {})
  };

  function editEntry(entry) {
    goto(`/family/update?id=${entry.id}`);
  }

  function createNew() {
    goto('/family/create');
  }

  function getCategoryIcon(category) {
    switch (category) {
      case 'Profile': return 'heroicons:user-group';
      case 'Wisdom': return 'heroicons:light-bulb';
      case 'Heritage': return 'heroicons:sparkles';
      case 'Tradition': return 'heroicons:fire';
      case 'Stories': return 'heroicons:book-open';
      case 'Legacy': return 'heroicons:trophy';
      case 'Success': return 'heroicons:check-circle';
      case 'Achievements': return 'heroicons:star';
      case 'Certifications': return 'heroicons:academic-cap';
      case 'Photos': return 'heroicons:photo';
      case 'Videos': return 'heroicons:video-camera';
      case 'Life Lessons': return 'heroicons:heart';
      case 'Rules': return 'heroicons:shield-check';
      case 'Virtues': return 'heroicons:sparkles';
      case 'Memories': return 'heroicons:clock';
      default: return 'heroicons:home';
    }
  }

  function getMediaTypeColor(mediaType) {
    switch (mediaType) {
      case 'Blog': return 'badge-primary';
      case 'Audio': return 'badge-secondary';
      case 'Photo': return 'badge-accent';
      case 'Video': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  }

  async function exportToCSV() {
    isExporting = true;

    try {
      const headers = [
        'Title', 'Type', 'Category', 'Sub Category', 'Description', 'Date Time',
        'Location', 'Media Type', 'Media URL', 'Created', 'Updated'
      ];

      const csvContent = [
        headers.join(','),
        ...filteredEntries.map(entry => [
          `"${entry.title || ''}"`,
          `"${entry.type || ''}"`,
          `"${entry.category || ''}"`,
          `"${entry.sub_category || ''}"`,
          `"${entry.description || ''}"`,
          `"${entry.date_time || ''}"`,
          `"${entry.location || ''}"`,
          `"${entry.media_type || ''}"`,
          `"${entry.media_url || ''}"`,
          `"${entry.created_at || ''}"`,
          `"${entry.updated_at || ''}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `family_entries_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      isExporting = false;
    }
  }

  async function exportToJSON() {
    isExporting = true;

    try {
      const jsonContent = JSON.stringify(filteredEntries, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `family_entries_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error exporting JSON:', error);
    } finally {
      isExporting = false;
    }
  }

  function clearFilters() {
    searchTerm = '';
    selectedCategory = '';
    selectedType = '';
    selectedSubCategory = '';
    selectedMediaType = '';
    sortBy = 'created_at';
    sortOrder = 'desc';
  }
</script>

<svelte:head>
  <title>Family Review - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Family Review" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Family Review</h1>
        <p class="text-base-content/70">Browse and manage all family entries</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'search for grandmother' or 'show photos'" />
        <button class="btn btn-primary" on:click={createNew}>
          <Icon icon="heroicons:plus" class="w-4 h-4" />
          Add Entry
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon icon="heroicons:document-text" class="w-6 h-6 text-primary" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.total}</div>
              <div class="text-sm text-base-content/70">Total Entries</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-secondary/10 rounded-lg">
              <Icon icon="heroicons:tag" class="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.categories}</div>
              <div class="text-sm text-base-content/70">Categories</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-accent/10 rounded-lg">
              <Icon icon="heroicons:user-group" class="w-6 h-6 text-accent" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.types}</div>
              <div class="text-sm text-base-content/70">Family Types</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-success/10 rounded-lg">
              <Icon icon="heroicons:photo" class="w-6 h-6 text-success" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.mediaItems}</div>
              <div class="text-sm text-base-content/70">Media Items</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search entries..."
              class="input input-bordered"
              bind:value={searchTerm}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={selectedCategory}>
              <option value="">All Categories</option>
              <option value="Profile">Profile</option>
              <option value="Wisdom">Wisdom</option>
              <option value="Heritage">Heritage</option>
              <option value="Tradition">Tradition</option>
              <option value="Stories">Stories</option>
              <option value="Legacy">Legacy</option>
              <option value="Success">Success</option>
              <option value="Achievements">Achievements</option>
              <option value="Certifications">Certifications</option>
              <option value="Photos">Photos</option>
              <option value="Videos">Videos</option>
              <option value="Life Lessons">Life Lessons</option>
              <option value="Rules">Rules</option>
              <option value="Virtues">Virtues</option>
              <option value="Memories">Memories</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select class="select select-bordered" bind:value={selectedType}>
              <option value="">All Types</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Joined">Joined</option>
              <option value="Independent">Independent</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sub Category</span>
            </label>
            <select class="select select-bordered" bind:value={selectedSubCategory}>
              <option value="">All Sub Categories</option>
              <option value="Members">Members</option>
              <option value="Relatives">Relatives</option>
              <option value="Friends">Friends</option>
              <option value="Neighbours">Neighbours</option>
              <option value="Life Lessons">Life Lessons</option>
              <option value="Stories">Stories</option>
              <option value="Virtues">Virtues</option>
              <option value="Legacy">Legacy</option>
              <option value="Family Line">Family Line</option>
              <option value="Traditions">Traditions</option>
              <option value="Festivals">Festivals</option>
              <option value="Celebrations">Celebrations</option>
              <option value="Certifications">Certifications</option>
              <option value="Awards">Awards</option>
              <option value="Rewards">Rewards</option>
              <option value="Success">Success</option>
              <option value="Strict Guidelines">Strict Guidelines</option>
              <option value="Mistakes to Avoid">Mistakes to Avoid</option>
              <option value="Habits to Avoid">Habits to Avoid</option>
              <option value="To Dos">To Dos</option>
              <option value="Not To Dos">Not To Dos</option>
              <option value="Occasions">Occasions</option>
              <option value="Rituals">Rituals</option>
              <option value="Functions">Functions</option>
              <option value="Moments">Moments</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Media Type</span>
            </label>
            <select class="select select-bordered" bind:value={selectedMediaType}>
              <option value="">All Media Types</option>
              <option value="Blog">Blog/Text</option>
              <option value="Audio">Audio</option>
              <option value="Photo">Photo</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select class="select select-bordered" bind:value={sortBy}>
              <option value="title">Title</option>
              <option value="category">Category</option>
              <option value="type">Type</option>
              <option value="date_time">Date</option>
              <option value="created_at">Created Date</option>
              <option value="updated_at">Updated Date</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          <button class="btn btn-sm btn-outline" on:click={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}>
            <Icon icon={sortOrder === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'} class="w-4 h-4" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>

          <button class="btn btn-sm btn-ghost" on:click={clearFilters}>
            <Icon icon="heroicons:x-mark" class="w-4 h-4" />
            Clear Filters
          </button>
        </div>

        <!-- Export Buttons -->
        <div class="flex gap-2">
          <button
            class="btn btn-sm btn-outline"
            disabled={isExporting || filteredEntries.length === 0}
            on:click={exportToCSV}
          >
            {#if isExporting}
              <span class="loading loading-spinner loading-xs"></span>
            {/if}
            Export CSV
          </button>

          <button
            class="btn btn-sm btn-outline"
            disabled={isExporting || filteredEntries.length === 0}
            on:click={exportToJSON}
          >
            {#if isExporting}
              <span class="loading loading-spinner loading-xs"></span>
            {/if}
            Export JSON
          </button>
        </div>
      </div>
    </div>

    <!-- Entries List -->
    <div class="space-y-4">
      {#if filteredEntries.length === 0}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body text-center py-12">
            <Icon icon="heroicons:home" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
            <h3 class="text-lg font-semibold">No entries found</h3>
            <p class="text-base-content/70">Try adjusting your filters or create a new entry</p>
            <button class="btn btn-primary mt-4" on:click={createNew}>
              <Icon icon="heroicons:plus" class="w-4 h-4" />
              Add First Entry
            </button>
          </div>
        </div>
      {:else}
        {#each filteredEntries as entry (entry.id)}
          <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div class="card-body">
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="card-title text-lg">{entry.title}</h3>
                    {#if entry.media_type}
                      <span class={getMediaTypeColor(entry.media_type)}>{entry.media_type}</span>
                    {/if}
                  </div>

                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="badge badge-primary">{entry.category}</span>
                    <span class="badge badge-secondary">{entry.type}</span>
                    <span class="badge badge-accent">{entry.sub_category}</span>
                  </div>

                  {#if entry.description}
                    <p class="text-base-content/80 mb-3 line-clamp-3">{entry.description}</p>
                  {/if}
                </div>

                <div class="flex gap-1">
                  <button class="btn btn-sm btn-circle btn-ghost" on:click={() => editEntry(entry)}>
                    <Icon icon="heroicons:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Media Preview -->
              {#if entry.media_url}
                <div class="mb-4">
                  {#if entry.media_type === 'Photo'}
                    <img src={entry.media_url} alt={entry.title} class="w-full h-32 object-cover rounded-lg" />
                  {:else if entry.media_type === 'Video'}
                    <video controls class="w-full h-32 rounded-lg">
                      <source src={entry.media_url} type="video/mp4">
                    </video>
                  {:else if entry.media_type === 'Audio'}
                    <audio controls class="w-full">
                      <source src={entry.media_url} type="audio/mpeg">
                    </audio>
                  {:else}
                    <a href={entry.media_url} target="_blank" class="link link-primary">
                      View {entry.media_type}
                    </a>
                  {/if}
                </div>
              {/if}

              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/70">
                {#if entry.date_time}
                  <div><strong>Date:</strong> {new Date(entry.date_time).toLocaleString()}</div>
                {/if}
                {#if entry.location}
                  <div><strong>Location:</strong> {entry.location}</div>
                {/if}
              </div>

              <!-- Timestamps -->
              <div class="text-xs text-base-content/50 mt-4 pt-4 border-t">
                Created: {new Date(entry.created_at).toLocaleDateString()}
                {#if entry.updated_at !== entry.created_at}
                  | Updated: {new Date(entry.updated_at).toLocaleDateString()}
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

  </div>
</div>