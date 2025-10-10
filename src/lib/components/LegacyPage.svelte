<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let legacyItems = [];
  let searchQuery = "";
  let selectedCategory = "all";
  let showAddModal = false;
  let showEditModal = false;
  let editingItem = null;

  let newItem = {
    name: "",
    tamilName: "",
    category: "",
    description: "",
    value: "",
    condition: "good",
    location: "",
    notes: ""
  };

  let categories = [
    { id: "jewelry", name: "Jewelry", tamil: "நகை" },
    { id: "documents", name: "Documents", tamil: "ஆவணங்கள்" },
    { id: "artifacts", name: "Artifacts", tamil: "பொருட்கள்" },
    { id: "property", name: "Property", tamil: "சொத்து" },
    { id: "books", name: "Books", tamil: "புத்தகங்கள்" },
    { id: "other", name: "Other", tamil: "மற்றவை" }
  ];

  let conditions = [
    { id: "excellent", name: "Excellent", tamil: "மிகச்சிறப்பானது" },
    { id: "good", name: "Good", tamil: "நல்லது" },
    { id: "fair", name: "Fair", tamil: "நடுத்தரம்" },
    { id: "poor", name: "Poor", tamil: "குறைந்தது" }
  ];

  onMount(() => {
    legacyItems = [
      {
        id: 1,
        name: "Family Gold Chain",
        tamilName: "குடும்ப தங்கச் சங்கிலி",
        category: "jewelry",
        description: "Traditional gold chain passed down from grandmother",
        value: "₹2,50,000",
        condition: "excellent",
        location: "Safe deposit box",
        notes: "Worn during special occasions",
        dateAdded: "2023-01-15"
      },
      {
        id: 2,
        name: "Ancestral Property Deed",
        tamilName: "மூதாதையர் சொத்து ஆவணம்",
        category: "documents",
        description: "Original property deed from 1950",
        value: "Priceless",
        condition: "good",
        location: "Home safe",
        notes: "Requires careful preservation",
        dateAdded: "2023-02-20"
      },
      {
        id: 3,
        name: "Temple Bell",
        tamilName: "கோவில் மணி",
        category: "artifacts",
        description: "Bronze bell from family temple",
        value: "₹15,000",
        condition: "fair",
        location: "Temple room",
        notes: "Used during puja ceremonies",
        dateAdded: "2023-03-10"
      }
    ];
  });

  $: filteredItems = legacyItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }

  function getConditionColor(condition) {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  function addItem() {
    if (!newItem.name.trim()) return;

    const item = {
      ...newItem,
      id: Date.now(),
      dateAdded: new Date().toISOString().split('T')[0]
    };

    legacyItems = [...legacyItems, item];
    resetForm();
    showAddModal = false;
  }

  function editItem(item) {
    editingItem = item;
    newItem = { ...item };
    showEditModal = true;
  }

  function updateItem() {
    if (!newItem.name.trim()) return;

    legacyItems = legacyItems.map(item =>
      item.id === editingItem.id ? { ...newItem, id: item.id, dateAdded: item.dateAdded } : item
    );

    resetForm();
    showEditModal = false;
    editingItem = null;
  }

  function deleteItem(id) {
    if (confirm("Are you sure you want to delete this legacy item?")) {
      legacyItems = legacyItems.filter(item => item.id !== id);
    }
  }

  function resetForm() {
    newItem = {
      name: "",
      tamilName: "",
      category: "",
      description: "",
      value: "",
      condition: "good",
      location: "",
      notes: ""
    };
  }
</script>

<svelte:head>
  <title>Legacy Items - South Indian Family Life App</title>
  <meta name="description" content="Manage family legacy items, heirlooms, and valuable possessions" />
</svelte:head>

<div class="max-w-7xl mx-auto p-6 space-y-6">
  <!-- Header -->
  <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Icon icon="heroicons:sparkles" class="w-8 h-8" />
        <div>
          <h1 class="text-2xl font-bold">Legacy Items</h1>
          <p class="text-amber-100">Preserve and manage family heirlooms and valuable possessions</p>
        </div>
      </div>
      <button
        on:click={() => showAddModal = true}
        class="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2"
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Item
      </button>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="bg-base-100 rounded-xl p-6 shadow-sm">
    <div class="flex flex-wrap gap-4">
      <!-- Search -->
      <div class="form-control flex-1 min-w-64">
        <label class="label">
          <span class="label-text">Search Items</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name..."
          class="input input-bordered w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <select bind:value={selectedCategory} class="select select-bordered">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="bg-base-100 rounded-xl p-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-amber-100 rounded-lg">
          <Icon icon="heroicons:sparkles" class="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/60">Total Items</p>
          <p class="text-2xl font-bold">{legacyItems.length}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 rounded-xl p-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-green-100 rounded-lg">
          <Icon icon="heroicons:check-circle" class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/60">Excellent Condition</p>
          <p class="text-2xl font-bold">{legacyItems.filter(item => item.condition === 'excellent').length}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 rounded-xl p-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-blue-100 rounded-lg">
          <Icon icon="heroicons:document-text" class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/60">Documents</p>
          <p class="text-2xl font-bold">{legacyItems.filter(item => item.category === 'documents').length}</p>
        </div>
      </div>
    </div>

    <div class="bg-base-100 rounded-xl p-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-purple-100 rounded-lg">
          <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p class="text-sm text-base-content/60">Jewelry Items</p>
          <p class="text-2xl font-bold">{legacyItems.filter(item => item.category === 'jewelry').length}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Items Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredItems as item}
      <div class="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-base-content">{item.name}</h3>
            <p class="text-sm text-base-content/60">{item.tamilName}</p>
          </div>
          <div class="dropdown dropdown-end">
            <button class="btn btn-ghost btn-sm">
              <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
            </button>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a on:click={() => editItem(item)}>Edit</a></li>
              <li><a class="text-error" on:click={() => deleteItem(item.id)}>Delete</a></li>
            </ul>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <span class="text-sm font-medium text-base-content/60">Category:</span>
            <span class="ml-2 px-2 py-1 bg-base-200 rounded-full text-xs">{getCategoryName(item.category)}</span>
          </div>

          <div>
            <span class="text-sm font-medium text-base-content/60">Value:</span>
            <span class="ml-2 font-semibold text-green-600">{item.value}</span>
          </div>

          <div>
            <span class="text-sm font-medium text-base-content/60">Condition:</span>
            <span class="ml-2 {getConditionColor(item.condition)} capitalize">{item.condition}</span>
          </div>

          <div>
            <span class="text-sm font-medium text-base-content/60">Location:</span>
            <span class="ml-2">{item.location}</span>
          </div>

          {#if item.description}
            <p class="text-sm text-base-content/70">{item.description}</p>
          {/if}

          {#if item.notes}
            <div class="pt-2 border-t border-base-300">
              <p class="text-xs text-base-content/50">{item.notes}</p>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12">
      <Icon icon="heroicons:sparkles" class="w-16 h-16 text-base-content/20 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/60 mb-2">No legacy items found</h3>
      <p class="text-base-content/40">Add your first family heirloom or valuable possession</p>
    </div>
  {/if}
</div>

<!-- Add Item Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Add Legacy Item</h2>
          <button on:click={() => { showAddModal = false; resetForm(); }} class="btn btn-ghost btn-sm">
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addItem} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Item Name *</span>
            </label>
            <input
              type="text"
              bind:value={newItem.name}
              placeholder="Enter item name"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tamil Name</span>
            </label>
            <input
              type="text"
              bind:value={newItem.tamilName}
              placeholder="தமிழ் பெயர்"
              class="input input-bordered w-full"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={newItem.category} class="select select-bordered w-full">
                <option value="">Select category</option>
                {#each categories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Condition</span>
              </label>
              <select bind:value={newItem.condition} class="select select-bordered w-full">
                {#each conditions as condition}
                  <option value={condition.id}>{condition.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Value</span>
            </label>
            <input
              type="text"
              bind:value={newItem.value}
              placeholder="₹50,000 or Priceless"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              bind:value={newItem.location}
              placeholder="Where is this item stored?"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newItem.description}
              placeholder="Describe this legacy item"
              rows="3"
              class="textarea textarea-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={newItem.notes}
              placeholder="Additional notes or care instructions"
              rows="2"
              class="textarea textarea-bordered w-full"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="submit" class="btn btn-primary flex-1">Add Item</button>
            <button type="button" on:click={() => { showAddModal = false; resetForm(); }} class="btn btn-ghost flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Item Modal -->
{#if showEditModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Edit Legacy Item</h2>
          <button on:click={() => { showEditModal = false; resetForm(); editingItem = null; }} class="btn btn-ghost btn-sm">
            <Icon icon="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={updateItem} class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Item Name *</span>
            </label>
            <input
              type="text"
              bind:value={newItem.name}
              placeholder="Enter item name"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tamil Name</span>
            </label>
            <input
              type="text"
              bind:value={newItem.tamilName}
              placeholder="தமிழ் பெயர்"
              class="input input-bordered w-full"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={newItem.category} class="select select-bordered w-full">
                <option value="">Select category</option>
                {#each categories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Condition</span>
              </label>
              <select bind:value={newItem.condition} class="select select-bordered w-full">
                {#each conditions as condition}
                  <option value={condition.id}>{condition.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Estimated Value</span>
            </label>
            <input
              type="text"
              bind:value={newItem.value}
              placeholder="₹50,000 or Priceless"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              bind:value={newItem.location}
              placeholder="Where is this item stored?"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newItem.description}
              placeholder="Describe this legacy item"
              rows="3"
              class="textarea textarea-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={newItem.notes}
              placeholder="Additional notes or care instructions"
              rows="2"
              class="textarea textarea-bordered w-full"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="submit" class="btn btn-primary flex-1">Update Item</button>
            <button type="button" on:click={() => { showEditModal = false; resetForm(); editingItem = null; }} class="btn btn-ghost flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}