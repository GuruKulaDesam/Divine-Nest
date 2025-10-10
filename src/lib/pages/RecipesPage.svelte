<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let recipes = [
    {
      id: 1,
      name: "Chicken Biryani",
      nameTamil: "கோழி பிரியாணி",
      category: "Main Course",
      cuisine: "Indian",
      prepTime: 30,
      cookTime: 45,
      servings: 4,
      difficulty: "Medium",
      ingredients: ["500g chicken", "2 cups basmati rice", "2 onions", "3 tomatoes", "Spices (cumin, coriander, turmeric, garam masala)", "2 tbsp oil", "Salt to taste"],
      instructions: "1. Marinate chicken with spices. 2. Cook rice. 3. Prepare masala. 4. Layer and cook.",
      notes: "Traditional South Indian style biryani",
      status: "Active",
    },
    {
      id: 2,
      name: "Vegetable Sambar",
      nameTamil: "காய்கறி சாம்பார்",
      category: "Main Course",
      cuisine: "South Indian",
      prepTime: 15,
      cookTime: 25,
      servings: 6,
      difficulty: "Easy",
      ingredients: ["1 cup toor dal", "Mixed vegetables (drumstick, brinjal, pumpkin)", "2 tomatoes", "Tamarind", "Sambar powder", "Salt to taste"],
      instructions: "1. Cook dal. 2. Prepare vegetables. 3. Add tamarind and spices. 4. Simmer together.",
      notes: "Perfect with rice and ghee",
      status: "Active",
    },
  ];

  let filteredRecipes = [...recipes];
  let searchQuery = "";
  let selectedCategory = "all";
  let selectedCuisine = "all";
  let selectedDifficulty = "all";
  let showAddModal = false;
  let showEditModal = false;
  let editingRecipe = null;

  let newRecipe = {
    name: "",
    nameTamil: "",
    category: "",
    cuisine: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: "",
    ingredients: [""],
    instructions: "",
    notes: "",
    status: "Active",
  };

  const categories = ["Main Course", "Appetizer", "Dessert", "Beverage", "Snack", "Breakfast"];
  const cuisines = ["Indian", "South Indian", "North Indian", "Chinese", "Italian", "Continental"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const statuses = ["Active", "Inactive"];

  $: {
    filteredRecipes = recipes.filter((recipe) => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.nameTamil.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
      const matchesCuisine = selectedCuisine === "all" || recipe.cuisine === selectedCuisine;
      const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
    });
  }

  function addRecipe() {
    const recipe = {
      ...newRecipe,
      id: Date.now(),
      ingredients: newRecipe.ingredients.filter((ing) => ing.trim() !== ""),
    };
    recipes = [...recipes, recipe];
    resetNewRecipe();
    showAddModal = false;
  }

  function editRecipe(recipe) {
    editingRecipe = { ...recipe };
    showEditModal = true;
  }

  function updateRecipe() {
    const index = recipes.findIndex((r) => r.id === editingRecipe.id);
    if (index !== -1) {
      recipes[index] = {
        ...editingRecipe,
        ingredients: editingRecipe.ingredients.filter((ing) => ing.trim() !== ""),
      };
      recipes = [...recipes];
    }
    showEditModal = false;
    editingRecipe = null;
  }

  function deleteRecipe(id) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      recipes = recipes.filter((r) => r.id !== id);
    }
  }

  function resetNewRecipe() {
    newRecipe = {
      name: "",
      nameTamil: "",
      category: "",
      cuisine: "",
      prepTime: 0,
      cookTime: 0,
      servings: 1,
      difficulty: "",
      ingredients: [""],
      instructions: "",
      notes: "",
      status: "Active",
    };
  }

  function addIngredient(recipe) {
    if (recipe === "new") {
      newRecipe.ingredients = [...newRecipe.ingredients, ""];
    } else {
      editingRecipe.ingredients = [...editingRecipe.ingredients, ""];
    }
  }

  function removeIngredient(recipe, index) {
    if (recipe === "new") {
      newRecipe.ingredients = newRecipe.ingredients.filter((_, i) => i !== index);
    } else {
      editingRecipe.ingredients = editingRecipe.ingredients.filter((_, i) => i !== index);
    }
  }

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getStatusColor(status) {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Recipes</h1>
      <p class="text-base-content/70 mt-1">Manage your family recipes collection</p>
    </div>
    <div class="flex gap-2">
      <a href="/recipes/traditional" class="btn btn-outline btn-warning gap-2">
        <Icon icon="heroicons:sparkles" class="w-5 h-5" />
        Traditional Tamil Recipes
      </a>
      <button on:click={() => (showAddModal = true)} class="btn btn-primary gap-2">
        <Icon icon="mdi:plus" class="w-5 h-5" />
        Add Recipe
      </button>
    </div>
  </div>

  <!-- Traditional Recipes Highlight -->
  <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h2 class="text-xl font-bold text-amber-800 mb-2">🍲 பாட்டியின் சமையல் ஞானம்</h2>
        <p class="text-amber-700 mb-4">Discover 25 traditional Tamil recipes from ancient family wisdom - medicine for body, peace for mind, love for family</p>
        <div class="flex flex-wrap gap-2 text-sm">
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Daily Sattvic Foods</span>
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Fasting Foods</span>
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Festival Foods</span>
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Medicinal Foods</span>
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Family Love Foods</span>
        </div>
      </div>
      <div class="ml-6">
        <a href="/recipes/traditional" class="btn btn-warning gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
          <Icon icon="heroicons:sparkles" class="w-5 h-5" />
          Explore Traditional Recipes
        </a>
      </div>
    </div>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:chef-hat" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Recipes</div>
      <div class="stat-value text-primary">{recipes.length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-secondary">
        <Icon icon="mdi:food-variant" class="w-8 h-8" />
      </div>
      <div class="stat-title">Categories</div>
      <div class="stat-value text-secondary">{new Set(recipes.map((r) => r.category)).size}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-accent">
        <Icon icon="mdi:clock-outline" class="w-8 h-8" />
      </div>
      <div class="stat-title">Avg Prep Time</div>
      <div class="stat-value text-accent">
        {recipes.length > 0 ? Math.round(recipes.reduce((sum, r) => sum + r.prepTime, 0) / recipes.length) : 0}m
      </div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-info">
        <Icon icon="mdi:account-group" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active Recipes</div>
      <div class="stat-value text-info">{recipes.filter((r) => r.status === "Active").length}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-6 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label for="recipe-search" class="label">
          <span class="label-text">Search Recipes</span>
        </label>
        <input id="recipe-search" type="text" bind:value={searchQuery} placeholder="Search by name..." class="input input-bordered" />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label for="recipe-category" class="label">
          <span class="label-text">Category</span>
        </label>
        <select id="recipe-category" bind:value={selectedCategory} class="select select-bordered">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <!-- Cuisine Filter -->
      <div class="form-control">
        <label for="recipe-cuisine" class="label">
          <span class="label-text">Cuisine</span>
        </label>
        <select id="recipe-cuisine" bind:value={selectedCuisine} class="select select-bordered">
          <option value="all">All Cuisines</option>
          {#each cuisines as cuisine}
            <option value={cuisine}>{cuisine}</option>
          {/each}
        </select>
      </div>

      <!-- Difficulty Filter -->
      <div class="form-control">
        <label for="recipe-difficulty" class="label">
          <span class="label-text">Difficulty</span>
        </label>
        <select id="recipe-difficulty" bind:value={selectedDifficulty} class="select select-bordered">
          <option value="all">All Levels</option>
          {#each difficulties as difficulty}
            <option value={difficulty}>{difficulty}</option>
          {/each}
        </select>
      </div>

      <!-- Clear Filters -->
      <div class="form-control">
        <button
          on:click={() => {
            searchQuery = "";
            selectedCategory = "all";
            selectedCuisine = "all";
            selectedDifficulty = "all";
          }}
          class="btn btn-outline btn-block"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>

  <!-- Recipes Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredRecipes as recipe (recipe.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="card-title text-lg">{recipe.name}</h3>
              {#if recipe.nameTamil}
                <p class="text-sm text-base-content/70">{recipe.nameTamil}</p>
              {/if}
            </div>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button on:click={() => editRecipe(recipe)} class="btn btn-ghost">Edit</button></li>
                <li><button on:click={() => deleteRecipe(recipe.id)} class="btn btn-ghost text-error">Delete</button></li>
              </ul>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-3">
            <span class="badge badge-primary">{recipe.category}</span>
            <span class="badge badge-secondary">{recipe.cuisine}</span>
            <span class="badge {getDifficultyColor(recipe.difficulty)}">{recipe.difficulty}</span>
            <span class="badge {getStatusColor(recipe.status)}">{recipe.status}</span>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm mb-4">
            <div class="flex items-center gap-1">
              <Icon icon="mdi:clock-outline" class="w-4 h-4 text-base-content/60" />
              <span>Prep: {recipe.prepTime}m</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon icon="mdi:chef-hat" class="w-4 h-4 text-base-content/60" />
              <span>Cook: {recipe.cookTime}m</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon icon="mdi:account-group" class="w-4 h-4 text-base-content/60" />
              <span>Serves: {recipe.servings}</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon icon="mdi:food-variant" class="w-4 h-4 text-base-content/60" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
          </div>

          {#if recipe.notes}
            <p class="text-sm text-base-content/70 italic">{recipe.notes}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredRecipes.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:chef-hat" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No recipes found</h3>
      <p class="text-base-content/50">Try adjusting your search or filters</p>
    </div>
  {/if}
</div>

<!-- Add Recipe Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b">
        <h3 class="text-xl font-bold">Add New Recipe</h3>
      </div>

      <div class="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
        <form on:submit|preventDefault={addRecipe} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label for="new-recipe-name" class="label">
                <span class="label-text">Recipe Name *</span>
              </label>
              <input id="new-recipe-name" type="text" bind:value={newRecipe.name} placeholder="Enter recipe name" class="input input-bordered" required />
            </div>

            <div class="form-control">
              <label for="new-recipe-tamil-name" class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input id="new-recipe-tamil-name" type="text" bind:value={newRecipe.nameTamil} placeholder="சமையல் பெயர்" class="input input-bordered" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label for="new-recipe-category" class="label">
                <span class="label-text">Category</span>
              </label>
              <select id="new-recipe-category" bind:value={newRecipe.category} class="select select-bordered">
                <option value="">Select Category</option>
                {#each categories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label for="new-recipe-cuisine" class="label">
                <span class="label-text">Cuisine</span>
              </label>
              <select id="new-recipe-cuisine" bind:value={newRecipe.cuisine} class="select select-bordered">
                <option value="">Select Cuisine</option>
                {#each cuisines as cuisine}
                  <option value={cuisine}>{cuisine}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label for="new-recipe-prep-time" class="label">
                <span class="label-text">Prep Time (minutes)</span>
              </label>
              <input id="new-recipe-prep-time" type="number" bind:value={newRecipe.prepTime} placeholder="30" class="input input-bordered" min="0" />
            </div>

            <div class="form-control">
              <label for="new-recipe-cook-time" class="label">
                <span class="label-text">Cook Time (minutes)</span>
              </label>
              <input id="new-recipe-cook-time" type="number" bind:value={newRecipe.cookTime} placeholder="45" class="input input-bordered" min="0" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="form-control">
              <label for="new-recipe-servings" class="label">
                <span class="label-text">Servings</span>
              </label>
              <input id="new-recipe-servings" type="number" bind:value={newRecipe.servings} placeholder="4" class="input input-bordered" min="1" />
            </div>

            <div class="form-control">
              <label for="new-recipe-difficulty" class="label">
                <span class="label-text">Difficulty</span>
              </label>
              <select id="new-recipe-difficulty" bind:value={newRecipe.difficulty} class="select select-bordered">
                <option value="">Select Difficulty</option>
                {#each difficulties as difficulty}
                  <option value={difficulty}>{difficulty}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label for="new-recipe-status" class="label">
                <span class="label-text">Status</span>
              </label>
              <select id="new-recipe-status" bind:value={newRecipe.status} class="select select-bordered">
                {#each statuses as status}
                  <option value={status}>{status}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label for="new-recipe-ingredients" class="label">
              <span class="label-text">Ingredients</span>
            </label>
            {#each newRecipe.ingredients as ingredient, index}
              <div class="flex gap-2 mb-2">
                <input type="text" bind:value={newRecipe.ingredients[index]} placeholder="Enter ingredient" class="input input-bordered flex-1" />
                <button type="button" on:click={() => removeIngredient("new", index)} class="btn btn-ghost btn-sm" disabled={newRecipe.ingredients.length === 1}>
                  <Icon icon="mdi:minus" class="w-4 h-4" />
                </button>
              </div>
            {/each}
            <button type="button" on:click={() => addIngredient("new")} class="btn btn-outline btn-sm gap-2">
              <Icon icon="mdi:plus" class="w-4 h-4" />
              Add Ingredient
            </button>
          </div>

          <div class="form-control">
            <label for="new-recipe-instructions" class="label">
              <span class="label-text">Instructions</span>
            </label>
            <textarea id="new-recipe-instructions" bind:value={newRecipe.instructions} placeholder="Enter cooking instructions..." rows="4" class="textarea textarea-bordered"></textarea>
          </div>

          <div class="form-control">
            <label for="new-recipe-notes" class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea id="new-recipe-notes" bind:value={newRecipe.notes} placeholder="Additional notes or tips..." rows="2" class="textarea textarea-bordered"></textarea>
          </div>
        </form>
      </div>

      <div class="p-6 border-t bg-base-200 flex justify-end gap-3">
        <button
          on:click={() => {
            showAddModal = false;
            resetNewRecipe();
          }}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button on:click={addRecipe} class="btn btn-primary" disabled={!newRecipe.name.trim()}> Add Recipe </button>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Recipe Modal -->
{#if showEditModal && editingRecipe}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b">
        <h3 class="text-xl font-bold">Edit Recipe</h3>
      </div>

      <div class="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
        <form on:submit|preventDefault={updateRecipe} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label for="edit-recipe-name" class="label">
                <span class="label-text">Recipe Name *</span>
              </label>
              <input id="edit-recipe-name" type="text" bind:value={editingRecipe.name} placeholder="Enter recipe name" class="input input-bordered" required />
            </div>

            <div class="form-control">
              <label for="edit-recipe-tamil-name" class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input id="edit-recipe-tamil-name" type="text" bind:value={editingRecipe.nameTamil} placeholder="சமையல் பெயர்" class="input input-bordered" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label for="edit-recipe-category" class="label">
                <span class="label-text">Category</span>
              </label>
              <select id="edit-recipe-category" bind:value={editingRecipe.category} class="select select-bordered">
                <option value="">Select Category</option>
                {#each categories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label for="edit-recipe-cuisine" class="label">
                <span class="label-text">Cuisine</span>
              </label>
              <select id="edit-recipe-cuisine" bind:value={editingRecipe.cuisine} class="select select-bordered">
                <option value="">Select Cuisine</option>
                {#each cuisines as cuisine}
                  <option value={cuisine}>{cuisine}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label for="edit-recipe-prep-time" class="label">
                <span class="label-text">Prep Time (minutes)</span>
              </label>
              <input id="edit-recipe-prep-time" type="number" bind:value={editingRecipe.prepTime} placeholder="30" class="input input-bordered" min="0" />
            </div>

            <div class="form-control">
              <label for="edit-recipe-cook-time" class="label">
                <span class="label-text">Cook Time (minutes)</span>
              </label>
              <input id="edit-recipe-cook-time" type="number" bind:value={editingRecipe.cookTime} placeholder="45" class="input input-bordered" min="0" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="form-control">
              <label for="edit-recipe-servings" class="label">
                <span class="label-text">Servings</span>
              </label>
              <input id="edit-recipe-servings" type="number" bind:value={editingRecipe.servings} placeholder="4" class="input input-bordered" min="1" />
            </div>

            <div class="form-control">
              <label for="edit-recipe-difficulty" class="label">
                <span class="label-text">Difficulty</span>
              </label>
              <select id="edit-recipe-difficulty" bind:value={editingRecipe.difficulty} class="select select-bordered">
                <option value="">Select Difficulty</option>
                {#each difficulties as difficulty}
                  <option value={difficulty}>{difficulty}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label for="edit-recipe-status" class="label">
                <span class="label-text">Status</span>
              </label>
              <select id="edit-recipe-status" bind:value={editingRecipe.status} class="select select-bordered">
                {#each statuses as status}
                  <option value={status}>{status}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label for="edit-recipe-ingredients" class="label">
              <span class="label-text">Ingredients</span>
            </label>
            {#each editingRecipe.ingredients as ingredient, index}
              <div class="flex gap-2 mb-2">
                <input type="text" bind:value={editingRecipe.ingredients[index]} placeholder="Enter ingredient" class="input input-bordered flex-1" />
                <button type="button" on:click={() => removeIngredient("edit", index)} class="btn btn-ghost btn-sm" disabled={editingRecipe.ingredients.length === 1}>
                  <Icon icon="mdi:minus" class="w-4 h-4" />
                </button>
              </div>
            {/each}
            <button type="button" on:click={() => addIngredient("edit")} class="btn btn-outline btn-sm gap-2">
              <Icon icon="mdi:plus" class="w-4 h-4" />
              Add Ingredient
            </button>
          </div>

          <div class="form-control">
            <label for="edit-recipe-instructions" class="label">
              <span class="label-text">Instructions</span>
            </label>
            <textarea id="edit-recipe-instructions" bind:value={editingRecipe.instructions} placeholder="Enter cooking instructions..." rows="4" class="textarea textarea-bordered"></textarea>
          </div>

          <div class="form-control">
            <label for="edit-recipe-notes" class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea bind:value={editingRecipe.notes} placeholder="Additional notes or tips..." rows="2" class="textarea textarea-bordered"></textarea>
          </div>
        </form>
      </div>

      <div class="p-6 border-t bg-base-200 flex justify-end gap-3">
        <button
          on:click={() => {
            showEditModal = false;
            editingRecipe = null;
          }}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button on:click={updateRecipe} class="btn btn-primary" disabled={!editingRecipe.name.trim()}> Update Recipe </button>
      </div>
    </div>
  </div>
{/if}
