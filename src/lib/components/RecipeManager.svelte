<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";

  import { getRecipes, getRecipesByCategory, addRecipe, updateRecipe, deleteRecipe, rateRecipe } from "../data/meals.js";

  const dispatch = createEventDispatcher();

  let recipes = [];
  let filteredRecipes = [];
  let showAddForm = false;
  let editingRecipe = null;
  let searchQuery = "";
  let selectedCategory = "all";
  let formData = {
    title: "",
    category: "vegetarian",
    source: "family",
    prepTime: "",
    cookTime: "",
    servings: "",
    ingredients: "",
    steps: "",
    nutritionalInfo: "",
    culturalNotes: "",
    tags: "",
  };

  const categories = [
    { value: "vegetarian", label: "Vegetarian", icon: "heroicons:leaf", color: "text-green-500" },
    { value: "non-vegetarian", label: "Non-Vegetarian", icon: "heroicons:fire", color: "text-red-500" },
    { value: "festival", label: "Festival", icon: "heroicons:sparkles", color: "text-purple-500" },
    { value: "traditional", label: "Traditional", icon: "heroicons:heart", color: "text-amber-500" },
    { value: "modern", label: "Modern", icon: "heroicons:cog-6-tooth", color: "text-blue-500" },
  ];

  const sources = [
    { value: "family", label: "Family Recipe" },
    { value: "traditional", label: "Traditional" },
    { value: "modern", label: "Modern" },
  ];

  // Load recipes on mount
  async function loadRecipes() {
    try {
      recipes = await getRecipes();
      applyFilters();
    } catch (error) {
      console.error("Error loading recipes:", error);
    }
  }

  // Initialize
  loadRecipes();

  function applyFilters() {
    let filtered = recipes;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((recipe) => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
    }

    filteredRecipes = filtered;
  }

  $: applyFilters();

  function resetForm() {
    formData = {
      title: "",
      category: "vegetarian",
      source: "family",
      prepTime: "",
      cookTime: "",
      servings: "",
      ingredients: "",
      steps: "",
      nutritionalInfo: "",
      culturalNotes: "",
      tags: "",
    };
    editingRecipe = null;
    showAddForm = false;
  }

  function startEdit(recipe) {
    editingRecipe = recipe;
    formData = {
      title: recipe.title,
      category: recipe.category,
      source: recipe.source,
      prepTime: recipe.prepTime.toString(),
      cookTime: recipe.cookTime.toString(),
      servings: recipe.servings.toString(),
      ingredients: recipe.ingredients.map((ing) => `${ing.name} - ${ing.quantity} ${ing.unit}${ing.notes ? ` (${ing.notes})` : ""}`).join("\n"),
      steps: recipe.steps.join("\n"),
      nutritionalInfo: recipe.nutritionalInfo ? `Calories: ${recipe.nutritionalInfo.calories}, Protein: ${recipe.nutritionalInfo.protein}g, Carbs: ${recipe.nutritionalInfo.carbs}g, Fat: ${recipe.nutritionalInfo.fat}g` : "",
      culturalNotes: recipe.culturalNotes || "",
      tags: recipe.tags.join(", "),
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      // Parse ingredients
      const ingredients = formData.ingredients
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const parts = line.split(" - ");
          if (parts.length >= 2) {
            const [name, quantityAndUnit] = parts;
            const quantityParts = quantityAndUnit.split(" ");
            const quantity = parseFloat(quantityParts[0]);
            const unit = quantityParts.slice(1, -1).join(" ");
            const notes = quantityParts[quantityParts.length - 1].startsWith("(") ? quantityParts[quantityParts.length - 1].slice(1, -1) : undefined;

            return { ingredientId: name.toLowerCase().replace(/\s+/g, "-"), name: name.trim(), quantity, unit, notes };
          }
          return null;
        })
        .filter(Boolean);

      // Parse nutritional info
      let nutritionalInfo = undefined;
      if (formData.nutritionalInfo) {
        const matches = formData.nutritionalInfo.match(/Calories: (\d+), Protein: (\d+)g, Carbs: (\d+)g, Fat: (\d+)g/);
        if (matches) {
          nutritionalInfo = {
            calories: parseInt(matches[1]),
            protein: parseInt(matches[2]),
            carbs: parseInt(matches[3]),
            fat: parseInt(matches[4]),
          };
        }
      }

      const recipeData = {
        title: formData.title,
        category: formData.category,
        source: formData.source,
        prepTime: parseInt(formData.prepTime),
        cookTime: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        ingredients,
        steps: formData.steps.split("\n").filter((step) => step.trim()),
        nutritionalInfo,
        culturalNotes: formData.culturalNotes || undefined,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (editingRecipe) {
        await updateRecipe(editingRecipe.id, recipeData);
      } else {
        await addRecipe(recipeData);
      }

      resetForm();
      await loadRecipes();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  }

  async function handleDelete(recipeId) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(recipeId);
        await loadRecipes();
        dispatch("dataChanged");
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  }

  async function rateRecipeHandler(recipeId, rating) {
    try {
      await rateRecipe(recipeId, rating);
      await loadRecipes();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error rating recipe:", error);
    }
  }

  function getCategoryInfo(category) {
    return categories.find((c) => c.value === category) || categories[0];
  }

  function getSourceColor(source) {
    switch (source) {
      case "family":
        return "bg-purple-100 text-purple-800";
      case "traditional":
        return "bg-amber-100 text-amber-800";
      case "modern":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
</script>

<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
      <Icon icon="heroicons:book-open" class="text-green-500" />
      Recipe Archive & Management
    </h2>
    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <Icon icon="heroicons:plus" class="text-lg" />
      {showAddForm ? "Cancel" : "Add Recipe"}
    </button>
  </div>

  <!-- Filters -->
  <div class="mb-6 p-4 bg-gray-50 rounded-xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <input type="text" bind:value={searchQuery} placeholder="Search by title or tags..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select bind:value={selectedCategory} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.value}>{category.label}</option>
          {/each}
        </select>
      </div>
      <div class="flex items-end">
        <button
          class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          on:click={() => {
            searchQuery = "";
            selectedCategory = "all";
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="mb-6 p-6 bg-green-50 rounded-xl border border-green-200" in:fade>
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
      </h3>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" bind:value={formData.title} placeholder="Recipe name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select bind:value={formData.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              {#each categories as category}
                <option value={category.value}>{category.label}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Source</label>
            <select bind:value={formData.source} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              {#each sources as source}
                <option value={source.value}>{source.label}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Servings</label>
            <input type="number" bind:value={formData.servings} placeholder="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Prep Time (mins)</label>
            <input type="number" bind:value={formData.prepTime} placeholder="15" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cook Time (mins)</label>
            <input type="number" bind:value={formData.cookTime} placeholder="30" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Ingredients (one per line: Name - Quantity Unit (notes)) </label>
          <textarea bind:value={formData.ingredients} placeholder="Rice - 2 cups&#10;Toor Dal - 1 cup&#10;Tamarind - 1 small lemon size" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Steps (one per line)</label>
          <textarea bind:value={formData.steps} placeholder="Cook rice and dal separately&#10;Prepare tamarind juice&#10;Mix all ingredients and simmer" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nutritional Info (optional)</label>
            <input type="text" bind:value={formData.nutritionalInfo} placeholder="Calories: 350, Protein: 12g, Carbs: 65g, Fat: 8g" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input type="text" bind:value={formData.tags} placeholder="south-indian, vegetarian, lunch" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cultural Notes (optional)</label>
          <textarea bind:value={formData.culturalNotes} placeholder="Traditional significance or family memories..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
        </div>

        <div class="flex gap-3">
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            {editingRecipe ? "Update Recipe" : "Add Recipe"}
          </button>
          <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={resetForm}> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Recipes Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredRecipes as recipe}
      <div class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-gray-50 rounded-lg">
              <Icon icon={getCategoryInfo(recipe.category).icon} class="{getCategoryInfo(recipe.category).color} text-xl" />
            </div>
            <div>
              <span class="inline-block px-2 py-1 text-xs font-medium rounded-full {getSourceColor(recipe.source)}">
                {sources.find((s) => s.value === recipe.source)?.label}
              </span>
            </div>
          </div>
          <div class="flex gap-1">
            <button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200" on:click={() => startEdit(recipe)}>
              <Icon icon="heroicons:pencil" class="text-sm" />
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" on:click={() => handleDelete(recipe.id)}>
              <Icon icon="heroicons:trash" class="text-sm" />
            </button>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span class="flex items-center gap-1">
              <Icon icon="heroicons:clock" class="text-gray-400" />
              {recipe.prepTime + recipe.cookTime} mins
            </span>
            <span class="flex items-center gap-1">
              <Icon icon="heroicons:users" class="text-gray-400" />
              {recipe.servings} servings
            </span>
          </div>
        </div>

        {#if recipe.nutritionalInfo}
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <div class="grid grid-cols-4 gap-2 text-center">
              <div>
                <div class="text-lg font-semibold text-gray-800">{recipe.nutritionalInfo.calories}</div>
                <div class="text-xs text-gray-600">Cal</div>
              </div>
              <div>
                <div class="text-lg font-semibold text-gray-800">{recipe.nutritionalInfo.protein}g</div>
                <div class="text-xs text-gray-600">Protein</div>
              </div>
              <div>
                <div class="text-lg font-semibold text-gray-800">{recipe.nutritionalInfo.carbs}g</div>
                <div class="text-xs text-gray-600">Carbs</div>
              </div>
              <div>
                <div class="text-lg font-semibold text-gray-800">{recipe.nutritionalInfo.fat}g</div>
                <div class="text-xs text-gray-600">Fat</div>
              </div>
            </div>
          </div>
        {/if}

        {#if recipe.rating}
          <div class="mb-4 flex items-center gap-2">
            <div class="flex items-center gap-1">
              {#each Array(5) as _, i}
                <button class="text-lg {i < recipe.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors" on:click={() => rateRecipeHandler(recipe.id, i + 1)}>
                  <Icon icon="heroicons:star" />
                </button>
              {/each}
            </div>
            <span class="text-sm text-gray-600">({recipe.rating}/5)</span>
          </div>
        {:else}
          <div class="mb-4">
            <p class="text-sm text-gray-600 mb-2">Rate this recipe:</p>
            <div class="flex items-center gap-1">
              {#each Array(5) as _, i}
                <button class="text-lg text-gray-300 hover:text-yellow-400 transition-colors" on:click={() => rateRecipeHandler(recipe.id, i + 1)}>
                  <Icon icon="heroicons:star" />
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <div class="flex flex-wrap gap-1 mb-4">
          {#each recipe.tags.slice(0, 3) as tag}
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {tag}
            </span>
          {/each}
          {#if recipe.tags.length > 3}
            <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{recipe.tags.length - 3} more
            </span>
          {/if}
        </div>

        {#if recipe.culturalNotes}
          <div class="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p class="text-sm text-amber-800 line-clamp-2">{recipe.culturalNotes}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if filteredRecipes.length === 0}
    <div class="text-center py-12">
      <Icon icon="heroicons:book-open" class="text-gray-300 text-6xl mx-auto mb-4" />
      <h3 class="text-xl font-medium text-gray-600 mb-2">
        {recipes.length === 0 ? "No Recipes Yet" : "No Recipes Match Filters"}
      </h3>
      <p class="text-gray-500 mb-4">
        {recipes.length === 0 ? "Start building your family recipe collection" : "Try adjusting your search or filters"}
      </p>
      {#if recipes.length === 0}
        <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={() => (showAddForm = true)}> Add First Recipe </button>
      {/if}
    </div>
  {/if}
</div>
