<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";
  import DeleteConfirmationModal from "$lib/components/DeleteConfirmationModal.svelte";

  let foods = [];
  let showAddForm = false;
  let editingFood = null;
  let searchTerm = "";
  let selectedCategory = "";
  let selectedType = "";

  // Form data
  let formData = {
    type: "Breakfast",
    category: "South Indian",
    sub_category: "",
    ingredients: "",
    preparation_stage: "",
    mixing_stage: "",
    boiling_stage: "",
    ready_stage: "",
    schedule: "Weekly",
    audience: "",
    health_factor: "",
    time_factor: "",
    cost_per_serving: "",
    serving_definition: "",
    aroma_factor: "Neutral",
    taste_factor: "Spicy"
  };

  // Load foods on mount
  onMount(async () => {
    await loadFoods();
  });

  async function loadFoods() {
    try {
      foods = await sqliteService.getFoods();
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Breakfast",
      category: "South Indian",
      sub_category: "",
      ingredients: "",
      preparation_stage: "",
      mixing_stage: "",
      boiling_stage: "",
      ready_stage: "",
      schedule: "Weekly",
      audience: "",
      health_factor: "",
      time_factor: "",
      cost_per_serving: "",
      serving_definition: "",
      aroma_factor: "Neutral",
      taste_factor: "Spicy"
    };
  }

  async function saveFood() {
    try {
      const foodData = {
        ...formData,
        id: editingFood ? editingFood.id : crypto.randomUUID(),
        created_at: editingFood ? editingFood.created_at : new Date().toISOString(),
        cost_per_serving: formData.cost_per_serving ? parseFloat(formData.cost_per_serving) : null
      };

      if (editingFood) {
        await sqliteService.updateFood(foodData);
      } else {
        await sqliteService.saveFood(foodData);
      }

      await loadFoods();
      showAddForm = false;
      editingFood = null;
      resetForm();
    } catch (error) {
      console.error("Error saving food:", error);
    }
  }

  function editFood(food) {
    editingFood = food;
    formData = { ...food };
    showAddForm = true;
  }

  async function deleteFood(food) {
    if (confirm(`Delete "${food.sub_category}"?`)) {
      try {
        await sqliteService.deleteFood(food.id);
        await loadFoods();
      } catch (error) {
        console.error("Error deleting food:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingFood = null;
    resetForm();
  }

  // Filter foods based on search and filters
  $: filteredFoods = foods.filter(food => {
    const matchesSearch = !searchTerm ||
      food.sub_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.ingredients.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || food.category === selectedCategory;
    const matchesType = !selectedType || food.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique categories and types for filters
  $: categories = [...new Set(foods.map(f => f.category))];
  $: types = [...new Set(foods.map(f => f.type))];
</script>

<svelte:head>
  <title>Foods - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:fire" class="w-8 h-8" />
          Foods Management
        </h1>
        <p class="text-base-content/70 mt-1">Manage traditional South Indian food items and recipes</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingFood = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Food Item
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
            placeholder="Search foods..."
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

    <!-- Foods Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredFoods as food}
        <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div class="card-body">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h3 class="card-title text-lg">{food.sub_category}</h3>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="badge badge-primary">{food.type}</span>
                  <span class="badge badge-secondary">{food.category}</span>
                  <span class="badge badge-outline">{food.schedule}</span>
                </div>
              </div>

              <div class="dropdown dropdown-left">
                <label tabindex="0" class="btn btn-ghost btn-sm">
                  <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                </label>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                  <li><a on:click={() => editFood(food)}>
                    <Icon icon="heroicons:pencil" class="w-4 h-4" />
                    Edit
                  </a></li>
                  <li><a on:click={() => deleteFood(food)} class="text-error">
                    <Icon icon="heroicons:trash" class="w-4 h-4" />
                    Delete
                  </a></li>
                </ul>
              </div>
            </div>

            <div class="mt-4 space-y-2">
              {#if food.ingredients}
                <p class="text-sm">
                  <strong>Ingredients:</strong> {food.ingredients}
                </p>
              {/if}

              {#if food.audience}
                <p class="text-sm">
                  <strong>Audience:</strong> {food.audience}
                </p>
              {/if}

              {#if food.health_factor}
                <p class="text-sm">
                  <strong>Health:</strong> {food.health_factor}
                </p>
              {/if}

              {#if food.cost_per_serving}
                <p class="text-sm">
                  <strong>Cost/Serving:</strong> ₹{food.cost_per_serving}
                </p>
              {/if}
            </div>

            <div class="card-actions justify-end mt-4">
              <div class="flex gap-1">
                <span class="badge badge-ghost text-xs">{food.aroma_factor}</span>
                <span class="badge badge-ghost text-xs">{food.taste_factor}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredFoods.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:fire" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No foods found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedCategory || selectedType ? "Try adjusting your filters" : "Add your first food item to get started"}
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
        {editingFood ? "Edit Food Item" : "Add New Food Item"}
      </h3>

      <form on:submit|preventDefault={saveFood} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
              <option>Drinks</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>South Indian</option>
              <option>North Indian</option>
              <option>Chinese</option>
              <option>European</option>
              <option>American</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sub Category *</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Idli, Dosa, Sambar..."
            class="input input-bordered"
            bind:value={formData.sub_category}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Ingredients</span>
          </label>
          <textarea
            placeholder="List main ingredients..."
            class="textarea textarea-bordered"
            bind:value={formData.ingredients}
            rows="3"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Schedule</span>
            </label>
            <select class="select select-bordered" bind:value={formData.schedule}>
              <option>Weekly</option>
              <option>Daily</option>
              <option>Monthly</option>
              <option>Annually</option>
              <option>Festivally</option>
              <option>Ad-Hoc</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Audience</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Family, Kids, Adults..."
              class="input input-bordered"
              bind:value={formData.audience}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Health Factor</span>
            </label>
            <input
              type="text"
              placeholder="e.g., High protein, Low carb..."
              class="input input-bordered"
              bind:value={formData.health_factor}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Time Factor</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Quick, Time-consuming..."
              class="input input-bordered"
              bind:value={formData.time_factor}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Cost per Serving (₹)</span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              class="input input-bordered"
              bind:value={formData.cost_per_serving}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Serving Definition</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 1 plate, 2 pieces..."
              class="input input-bordered"
              bind:value={formData.serving_definition}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Aroma Factor</span>
            </label>
            <select class="select select-bordered" bind:value={formData.aroma_factor}>
              <option>Earthy</option>
              <option>Floral</option>
              <option>Spicy</option>
              <option>Sweet</option>
              <option>Neutral</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Taste Factor</span>
            </label>
            <select class="select select-bordered" bind:value={formData.taste_factor}>
              <option>Spicy</option>
              <option>Sweet</option>
              <option>Sour</option>
              <option>Salty</option>
              <option>Bitter</option>
              <option>Umami</option>
            </select>
          </div>
        </div>

        <!-- Preparation stages -->
        <div class="space-y-4">
          <h4 class="font-semibold">Preparation Stages</h4>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Preparation Stage</span>
            </label>
            <textarea
              placeholder="Initial preparation steps..."
              class="textarea textarea-bordered"
              bind:value={formData.preparation_stage}
              rows="2"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Mixing Stage</span>
            </label>
            <textarea
              placeholder="Mixing and combining steps..."
              class="textarea textarea-bordered"
              bind:value={formData.mixing_stage}
              rows="2"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Boiling/Cooking Stage</span>
            </label>
            <textarea
              placeholder="Cooking/heating steps..."
              class="textarea textarea-bordered"
              bind:value={formData.boiling_stage}
              rows="2"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Ready Stage</span>
            </label>
            <textarea
              placeholder="Final preparation and serving..."
              class="textarea textarea-bordered"
              bind:value={formData.ready_stage}
              rows="2"
            ></textarea>
          </div>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingFood ? "Update" : "Add"} Food Item
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}