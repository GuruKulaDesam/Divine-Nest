<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let inventory = [];
  let showAddForm = false;
  let editingItem = null;
  let searchTerm = "";
  let selectedType = "";
  let selectedCategory = "";

  // Form data
  let formData = {
    type: "Food Ingredient",
    category: "Dry Goods",
    sub_category: "",
    quantity_available: "",
    unit: "kg",
    location: "",
    restock_threshold: "",
    preferred_vendor: ""
  };

  // Load inventory on mount
  onMount(async () => {
    await loadInventory();
  });

  async function loadInventory() {
    try {
      inventory = await sqliteService.getInventoryItems();
    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Food Ingredient",
      category: "Dry Goods",
      sub_category: "",
      quantity_available: "",
      unit: "kg",
      location: "",
      restock_threshold: "",
      preferred_vendor: ""
    };
  }

  async function saveItem() {
    try {
      const itemData = {
        ...formData,
        id: editingItem ? editingItem.id : crypto.randomUUID(),
        quantity_available: parseFloat(formData.quantity_available),
        restock_threshold: formData.restock_threshold ? parseFloat(formData.restock_threshold) : null,
        last_updated: new Date().toISOString(),
        added_by: "current_user", // TODO: Get from user context
        created_at: editingItem ? editingItem.created_at : new Date().toISOString()
      };

      if (editingItem) {
        await sqliteService.updateInventoryItem(itemData);
      } else {
        await sqliteService.saveInventoryItem(itemData);
      }

      await loadInventory();
      showAddForm = false;
      editingItem = null;
      resetForm();
    } catch (error) {
      console.error("Error saving inventory item:", error);
    }
  }

  function editItem(item) {
    editingItem = item;
    formData = { ...item };
    showAddForm = true;
  }

  async function deleteItem(item) {
    if (confirm(`Delete "${item.sub_category || item.category}"?`)) {
      try {
        await sqliteService.deleteInventoryItem(item.id);
        await loadInventory();
      } catch (error) {
        console.error("Error deleting inventory item:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingItem = null;
    resetForm();
  }

  // Filter inventory based on search and filters
  $: filteredInventory = inventory.filter(item => {
    const matchesSearch = !searchTerm ||
      (item.sub_category && item.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || item.type === selectedType;
    const matchesCategory = !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Get unique types and categories for filters
  $: types = [...new Set(inventory.map(i => i.type))];
  $: categories = [...new Set(inventory.map(i => i.category))];

  // Check if item needs restocking
  $: needsRestock = (item) => {
    return item.restock_threshold && item.quantity_available <= item.restock_threshold;
  };
</script>

<svelte:head>
  <title>Inventory - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:archive-box" class="w-8 h-8" />
          Inventory Management
        </h1>
        <p class="text-base-content/70 mt-1">Track household supplies, groceries, and essentials</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingItem = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Item
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
            placeholder="Search inventory..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
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

    <!-- Inventory Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredInventory as item}
        <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div class="card-body">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h3 class="card-title text-lg">
                  {item.sub_category || item.category}
                  {#if needsRestock(item)}
                    <span class="badge badge-warning badge-sm ml-2">Low Stock</span>
                  {/if}
                </h3>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="badge badge-primary">{item.type}</span>
                  <span class="badge badge-secondary">{item.category}</span>
                </div>
              </div>

              <div class="dropdown dropdown-left">
                <label tabindex="0" class="btn btn-ghost btn-sm">
                  <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                </label>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                  <li><a on:click={() => editItem(item)}>
                    <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    Edit
                  </a></li>
                  <li><a on:click={() => deleteItem(item)} class="text-error">
                    <Icon icon="heroicons:trash" class="w-4 h-4" />
                    Delete
                  </a></li>
                </ul>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Quantity:</span>
                <span class="text-lg font-bold text-primary">
                  {item.quantity_available} {item.unit}
                </span>
              </div>

              {#if item.restock_threshold}
                <div class="flex justify-between items-center">
                  <span class="text-sm">Restock at:</span>
                  <span class="text-sm text-warning">
                    {item.restock_threshold} {item.unit}
                  </span>
                </div>
              {/if}

              {#if item.location}
                <p class="text-sm">
                  <strong>Location:</strong> {item.location}
                </p>
              {/if}

              {#if item.preferred_vendor}
                <p class="text-sm">
                  <strong>Vendor:</strong> {item.preferred_vendor}
                </p>
              {/if}

              <p class="text-xs text-base-content/60">
                Updated: {new Date(item.last_updated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredInventory.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:archive-box" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No inventory items found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedCategory ? "Try adjusting your filters" : "Add your first inventory item to get started"}
        </p>
      </div>
    {/if}

    <!-- Low Stock Alert -->
    {#if inventory.filter(needsRestock).length > 0}
      <div class="alert alert-warning mt-6">
        <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6" />
        <div>
          <h3 class="font-bold">Low Stock Alert!</h3>
          <p>{inventory.filter(needsRestock).length} items need restocking</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-lg">
      <h3 class="font-bold text-lg mb-4">
        {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
      </h3>

      <form on:submit|preventDefault={saveItem} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Food Ingredient</option>
              <option>Grocery</option>
              <option>Toiletry</option>
              <option>Pooja Item</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>Dry Goods</option>
              <option>Fresh Produce</option>
              <option>Spices</option>
              <option>Cleaning</option>
              <option>Personal Care</option>
              <option>Ritual Supplies</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sub Category</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Rice, Tomatoes, Soap..."
            class="input input-bordered"
            bind:value={formData.sub_category}
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Quantity Available *</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              class="input input-bordered"
              bind:value={formData.quantity_available}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Unit *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.unit} required>
              <option>kg</option>
              <option>g</option>
              <option>litre</option>
              <option>ml</option>
              <option>pieces</option>
              <option>packets</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Restock Threshold</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Minimum quantity to trigger alert"
              class="input input-bordered"
              bind:value={formData.restock_threshold}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Kitchen shelf, Pantry..."
              class="input input-bordered"
              bind:value={formData.location}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Preferred Vendor</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Local market, Big Bazaar..."
            class="input input-bordered"
            bind:value={formData.preferred_vendor}
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingItem ? "Update" : "Add"} Item
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}