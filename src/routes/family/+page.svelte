<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let family = [];
  let showAddForm = false;
  let editingFamily = null;
  let searchTerm = "";
  let selectedCategory = "";
  let selectedType = "";

  // Form data
  let formData = {
    type: "Nuclear",
    category: "Profile",
    sub_category: "Members",
    title: "",
    description: "",
    date_time: new Date().toISOString().slice(0, 16), // For datetime-local input
    location: "",
    media_type: "Blog",
    media_url: ""
  };

  // Load family on mount
  onMount(async () => {
    await loadFamily();
  });

  async function loadFamily() {
    try {
      family = await sqliteService.getFamily();
    } catch (error) {
      console.error("Error loading family:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Nuclear",
      category: "Profile",
      sub_category: "Members",
      title: "",
      description: "",
      date_time: new Date().toISOString().slice(0, 16),
      location: "",
      media_type: "Blog",
      media_url: ""
    };
  }

  async function saveFamily() {
    try {
      const familyData = {
        ...formData,
        id: editingFamily ? editingFamily.id : crypto.randomUUID(),
        created_by: "current_user", // TODO: Get from user context
        created_at: editingFamily ? editingFamily.created_at : new Date().toISOString()
      };

      if (editingFamily) {
        await sqliteService.updateFamily(familyData);
      } else {
        await sqliteService.saveFamily(familyData);
      }

      await loadFamily();
      showAddForm = false;
      editingFamily = null;
      resetForm();
    } catch (error) {
      console.error("Error saving family:", error);
    }
  }

  function editFamily(familyItem) {
    editingFamily = familyItem;
    formData = {
      ...familyItem,
      date_time: new Date(familyItem.date_time).toISOString().slice(0, 16)
    };
    showAddForm = true;
  }

  async function deleteFamily(familyItem) {
    if (confirm(`Delete "${familyItem.title}"?`)) {
      try {
        await sqliteService.deleteFamily(familyItem.id);
        await loadFamily();
      } catch (error) {
        console.error("Error deleting family:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingFamily = null;
    resetForm();
  }

  // Filter family based on search and filters
  $: filteredFamily = family.filter(item => {
    const matchesSearch = !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sub_category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesType = !selectedType || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique values for filters
  $: categories = [...new Set(family.map(f => f.category))];
  $: types = [...new Set(family.map(f => f.type))];

  // Group family by category for display
  $: groupedFamily = filteredFamily.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {});

  // Get icon for family category
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

  // Get color for media type
  function getMediaTypeColor(mediaType) {
    switch (mediaType) {
      case 'Blog': return 'badge-primary';
      case 'Audio': return 'badge-secondary';
      case 'Photo': return 'badge-accent';
      case 'Video': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  }
</script>

<svelte:head>
  <title>Family - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:home" class="w-8 h-8" />
          Family Management
        </h1>
        <p class="text-base-content/70 mt-1">Document family history, wisdom, traditions, and memories</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingFamily = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Family Item
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search family items..."
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
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Type</span>
          </label>
          <select class="select select-bordered" bind:value={selectedType}>
            <option value="">All Types</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Family by Category -->
    {#each Object.entries(groupedFamily) as [category, categoryItems]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getCategoryIcon(category)} class="w-6 h-6" />
          {category}
          <span class="badge badge-primary badge-sm">{categoryItems.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each categoryItems as item}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="card-title text-lg">{item.title}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span class="badge badge-primary">{item.type}</span>
                      <span class="badge badge-secondary">{item.sub_category}</span>
                      <span class={getMediaTypeColor(item.media_type)}>{item.media_type}</span>
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editFamily(item)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteFamily(item)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  <p class="text-sm">{item.description}</p>

                  {#if item.location}
                    <p class="text-sm">
                      <strong>Location:</strong> {item.location}
                    </p>
                  {/if}

                  <p class="text-sm">
                    <strong>Date:</strong> {new Date(item.date_time).toLocaleString()}
                  </p>

                  {#if item.media_url}
                    <div class="mt-2">
                      {#if item.media_type === 'Photo'}
                        <img src={item.media_url} alt={item.title} class="w-full h-32 object-cover rounded-lg" />
                      {:else if item.media_type === 'Video'}
                        <video controls class="w-full h-32 rounded-lg">
                          <source src={item.media_url} type="video/mp4">
                        </video>
                      {:else if item.media_type === 'Audio'}
                        <audio controls class="w-full">
                          <source src={item.media_url} type="audio/mpeg">
                        </audio>
                      {:else}
                        <a href={item.media_url} target="_blank" class="link link-primary">
                          View {item.media_type}
                        </a>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredFamily.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:home" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No family items found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedCategory || selectedType ? "Try adjusting your filters" : "Add your first family item to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">
        {editingFamily ? "Edit Family Item" : "Add New Family Item"}
      </h3>

      <form on:submit|preventDefault={saveFamily} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Nuclear</option>
              <option>Joined</option>
              <option>Independent</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>Profile</option>
              <option>Wisdom</option>
              <option>Heritage</option>
              <option>Tradition</option>
              <option>Stories</option>
              <option>Legacy</option>
              <option>Success</option>
              <option>Achievements</option>
              <option>Certifications</option>
              <option>Photos</option>
              <option>Videos</option>
              <option>Life Lessons</option>
              <option>Rules</option>
              <option>Virtues</option>
              <option>Memories</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sub Category *</span>
          </label>
          <select class="select select-bordered" bind:value={formData.sub_category} required>
            <option>Members</option>
            <option>Relatives</option>
            <option>Friends</option>
            <option>Neighbours</option>
            <option>Life Lessons</option>
            <option>Stories</option>
            <option>Virtues</option>
            <option>Legacy</option>
            <option>Family Line</option>
            <option>Traditions</option>
            <option>Festivals</option>
            <option>Celebrations</option>
            <option>Certifications</option>
            <option>Awards</option>
            <option>Rewards</option>
            <option>Success</option>
            <option>Strict Guidelines</option>
            <option>Mistakes to Avoid</option>
            <option>Habits to Avoid</option>
            <option>To Dos</option>
            <option>Not To Dos</option>
            <option>Occasions</option>
            <option>Rituals</option>
            <option>Functions</option>
            <option>Moments</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Title *</span>
          </label>
          <input
            type="text"
            placeholder="Item title..."
            class="input input-bordered"
            bind:value={formData.title}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description *</span>
          </label>
          <textarea
            placeholder="Detailed description..."
            class="textarea textarea-bordered"
            bind:value={formData.description}
            required
            rows="4"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Date & Time *</span>
            </label>
            <input
              type="datetime-local"
              class="input input-bordered"
              bind:value={formData.date_time}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="Where it happened..."
              class="input input-bordered"
              bind:value={formData.location}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Media Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.media_type} required>
              <option>Blog</option>
              <option>Audio</option>
              <option>Photo</option>
              <option>Video</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Media URL</span>
            </label>
            <input
              type="url"
              placeholder="https://..."
              class="input input-bordered"
              bind:value={formData.media_url}
            />
          </div>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingFamily ? "Update" : "Add"} Family Item
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}