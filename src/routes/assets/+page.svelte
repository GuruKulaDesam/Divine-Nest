<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let assets = [];
  let showAddForm = false;
  let editingAsset = null;
  let searchTerm = "";
  let selectedCategory = "";
  let tagInput = "";

  // Form data
  let formData = {
    category: "Documents",
    sub_category: "",
    name: "",
    description: "",
    location: "",
    owner: "",
    date_added: new Date().toISOString().split('T')[0],
    tags: ""
  };

  // Load assets on mount
  onMount(async () => {
    await loadAssets();
  });

  async function loadAssets() {
    try {
      assets = await sqliteService.getAssets();
    } catch (error) {
      console.error("Error loading assets:", error);
    }
  }

  function resetForm() {
    formData = {
      category: "Documents",
      sub_category: "",
      name: "",
      description: "",
      location: "",
      owner: "",
      date_added: new Date().toISOString().split('T')[0],
      tags: ""
    };
    tagInput = "";
  }

  async function saveAsset() {
    try {
      const assetData = {
        ...formData,
        id: editingAsset ? editingAsset.id : crypto.randomUUID(),
        created_at: editingAsset ? editingAsset.created_at : new Date().toISOString()
      };

      if (editingAsset) {
        await sqliteService.updateAsset(assetData);
      } else {
        await sqliteService.saveAsset(assetData);
      }

      await loadAssets();
      showAddForm = false;
      editingAsset = null;
      resetForm();
    } catch (error) {
      console.error("Error saving asset:", error);
    }
  }

  function editAsset(asset) {
    editingAsset = asset;
    formData = {
      ...asset,
      date_added: asset.date_added.split('T')[0] // Convert to date input format
    };
    tagInput = asset.tags || "";
    showAddForm = true;
  }

  async function deleteAsset(asset) {
    if (confirm(`Delete "${asset.name}"?`)) {
      try {
        await sqliteService.deleteAsset(asset.id);
        await loadAssets();
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingAsset = null;
    resetForm();
  }

  // Add tag to form data
  function addTag() {
    if (tagInput.trim()) {
      const currentTags = formData.tags ? JSON.parse(formData.tags) : [];
      if (!currentTags.includes(tagInput.trim())) {
        currentTags.push(tagInput.trim());
        formData.tags = JSON.stringify(currentTags);
      }
      tagInput = "";
    }
  }

  // Remove tag from form data
  function removeTag(tagToRemove) {
    const currentTags = formData.tags ? JSON.parse(formData.tags) : [];
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    formData.tags = JSON.stringify(updatedTags);
  }

  // Filter assets based on search and filters
  $: filteredAssets = assets.filter(asset => {
    const matchesSearch = !searchTerm ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.description && asset.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (asset.sub_category && asset.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (asset.owner && asset.owner.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !selectedCategory || asset.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filters
  $: categories = [...new Set(assets.map(a => a.category))];

  // Group assets by category for display
  $: groupedAssets = filteredAssets.reduce((groups, asset) => {
    if (!groups[asset.category]) {
      groups[asset.category] = [];
    }
    groups[asset.category].push(asset);
    return groups;
  }, {});

  // Get icon for asset category
  function getCategoryIcon(category) {
    switch (category) {
      case 'Documents': return 'heroicons:document';
      case 'Certificates': return 'heroicons:academic-cap';
      case 'Photos': return 'heroicons:photo';
      case 'Valuables': return 'heroicons:sparkles';
      case 'Inventory': return 'heroicons:archive-box';
      case 'Vehicles': return 'heroicons:truck';
      case 'Land': return 'heroicons:map';
      case 'Buildings': return 'heroicons:home';
      case 'Software': return 'heroicons:computer-desktop';
      case 'Hardware': return 'heroicons:cog';
      default: return 'heroicons:circle-stack';
    }
  }

  // Parse tags from JSON string
  function parseTags(tagsJson) {
    try {
      return tagsJson ? JSON.parse(tagsJson) : [];
    } catch {
      return [];
    }
  }
</script>

<svelte:head>
  <title>Assets - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:circle-stack" class="w-8 h-8" />
          Assets Management
        </h1>
        <p class="text-base-content/70 mt-1">Track documents, valuables, vehicles, and other family assets</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingAsset = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Asset
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search assets..."
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
      </div>
    </div>

    <!-- Assets by Category -->
    {#each Object.entries(groupedAssets) as [category, categoryAssets]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getCategoryIcon(category)} class="w-6 h-6" />
          {category}
          <span class="badge badge-primary badge-sm">{categoryAssets.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each categoryAssets as asset}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="card-title text-lg">{asset.name}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      {#if asset.sub_category}
                        <span class="badge badge-outline">{asset.sub_category}</span>
                      {/if}
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editAsset(asset)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteAsset(asset)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  {#if asset.description}
                    <p class="text-sm">{asset.description}</p>
                  {/if}

                  {#if asset.owner}
                    <p class="text-sm">
                      <strong>Owner:</strong> {asset.owner}
                    </p>
                  {/if}

                  {#if asset.location}
                    <p class="text-sm">
                      <strong>Location:</strong> {asset.location}
                    </p>
                  {/if}

                  <p class="text-sm">
                    <strong>Added:</strong> {new Date(asset.date_added).toLocaleDateString()}
                  </p>

                  {#if parseTags(asset.tags).length > 0}
                    <div class="flex flex-wrap gap-1 mt-2">
                      {#each parseTags(asset.tags) as tag}
                        <span class="badge badge-ghost badge-sm">{tag}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredAssets.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:circle-stack" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No assets found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedCategory ? "Try adjusting your filters" : "Add your first asset to get started"}
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
        {editingAsset ? "Edit Asset" : "Add New Asset"}
      </h3>

      <form on:submit|preventDefault={saveAsset} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>Documents</option>
              <option>Certificates</option>
              <option>Photos</option>
              <option>Valuables</option>
              <option>Inventory</option>
              <option>Vehicles</option>
              <option>Land</option>
              <option>Buildings</option>
              <option>Software</option>
              <option>Hardware</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sub Category</span>
            </label>
            <input
              type="text"
              placeholder="Specific sub-category..."
              class="input input-bordered"
              bind:value={formData.sub_category}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Name *</span>
          </label>
          <input
            type="text"
            placeholder="Asset name..."
            class="input input-bordered"
            bind:value={formData.name}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            placeholder="Asset description..."
            class="textarea textarea-bordered"
            bind:value={formData.description}
            rows="3"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="Where is it stored..."
              class="input input-bordered"
              bind:value={formData.location}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Owner</span>
            </label>
            <input
              type="text"
              placeholder="Who owns this asset..."
              class="input input-bordered"
              bind:value={formData.owner}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Date Added *</span>
          </label>
          <input
            type="date"
            class="input input-bordered"
            bind:value={formData.date_added}
            required
          />
        </div>

        <!-- Tags -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Tags</span>
          </label>
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Add a tag..."
              class="input input-bordered flex-1"
              bind:value={tagInput}
              on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <button type="button" class="btn btn-outline" on:click={addTag}>
              <Icon icon="heroicons:plus" class="w-4 h-4" />
            </button>
          </div>

          <!-- Display current tags -->
          {#if formData.tags}
            <div class="flex flex-wrap gap-2 mt-2">
              {#each parseTags(formData.tags) as tag}
                <span class="badge badge-primary gap-2">
                  {tag}
                  <button
                    type="button"
                    class="btn btn-ghost btn-xs"
                    on:click={() => removeTag(tag)}
                  >
                    <Icon icon="heroicons:x-mark" class="w-3 h-3" />
                  </button>
                </span>
              {/each}
            </div>
          {/if}
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingAsset ? "Update" : "Add"} Asset
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
