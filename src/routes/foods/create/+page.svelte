<script>
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { foods, addFood } from '$lib/stores/foods';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let formData = {
    name: '',
    category: 'Main Course',
    cuisine: 'South Indian',
    ingredients: [''],
    instructions: '',
    preparation_time: 30,
    servings: 4,
    difficulty: 'Medium',
    dietary_tags: [],
    meal_type: 'Lunch',
    nutritional_info: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  };

  let voiceResult = '';
  let isSubmitting = false;
  let showSuccess = false;

  // Voice command processing
  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    // Extract recipe name
    if (lowerResult.includes('recipe for') || lowerResult.includes('add recipe')) {
      const nameMatch = result.match(/(?:recipe for|add recipe)\s+(.+)/i);
      if (nameMatch) {
        formData.name = nameMatch[1].trim();
      }
    }

    // Set cuisine
    if (lowerResult.includes('south indian')) formData.cuisine = 'South Indian';
    else if (lowerResult.includes('north indian')) formData.cuisine = 'North Indian';
    else if (lowerResult.includes('chinese')) formData.cuisine = 'Chinese';
    else if (lowerResult.includes('italian')) formData.cuisine = 'Italian';

    // Set meal type
    if (lowerResult.includes('breakfast')) formData.meal_type = 'Breakfast';
    else if (lowerResult.includes('lunch')) formData.meal_type = 'Lunch';
    else if (lowerResult.includes('dinner')) formData.meal_type = 'Dinner';
    else if (lowerResult.includes('snack')) formData.meal_type = 'Snack';
    else if (lowerResult.includes('dessert')) formData.meal_type = 'Dessert';

    // Set difficulty
    if (lowerResult.includes('easy')) formData.difficulty = 'Easy';
    else if (lowerResult.includes('medium')) formData.difficulty = 'Medium';
    else if (lowerResult.includes('hard')) formData.difficulty = 'Hard';
  }

  function addIngredient() {
    formData.ingredients = [...formData.ingredients, ''];
  }

  function removeIngredient(index) {
    if (formData.ingredients.length > 1) {
      formData.ingredients = formData.ingredients.filter((_, i) => i !== index);
    }
  }

  function updateIngredient(index, value) {
    formData.ingredients[index] = value;
    formData.ingredients = [...formData.ingredients]; // Trigger reactivity
  }

  function toggleDietaryTag(tag) {
    if (formData.dietary_tags.includes(tag)) {
      formData.dietary_tags = formData.dietary_tags.filter(t => t !== tag);
    } else {
      formData.dietary_tags = [...formData.dietary_tags, tag];
    }
  }

  async function submitRecipe() {
    if (!formData.name.trim()) {
      alert('Please enter a recipe name');
      return;
    }

    if (!formData.instructions.trim()) {
      alert('Please enter cooking instructions');
      return;
    }

    if (formData.ingredients.filter(i => i.trim()).length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    isSubmitting = true;

    try {
      const newRecipe = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        cuisine: formData.cuisine,
        ingredients: formData.ingredients.filter(i => i.trim()),
        instructions: formData.instructions,
        preparation_time: formData.preparation_time,
        servings: formData.servings,
        difficulty: formData.difficulty,
        dietary_tags: formData.dietary_tags,
        meal_type: formData.meal_type,
        nutritional_info: formData.nutritional_info,
        created_by: $userProfile.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        applicable_roles: ['All'],
        location: 'Kitchen',
        scheduled_for: null,
        cooked_at: null,
        rating: 0,
        reviews: 0
      };

      await addFood(newRecipe);

      showSuccess = true;
      setTimeout(() => {
        goto('/foods/dashboard');
      }, 2000);

      // Reset form
      formData = {
        name: '',
        category: 'Main Course',
        cuisine: 'South Indian',
        ingredients: [''],
        instructions: '',
        preparation_time: 30,
        servings: 4,
        difficulty: 'Medium',
        dietary_tags: [],
        meal_type: 'Lunch',
        nutritional_info: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        }
      };

    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Error adding recipe. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function navigateToDashboard() {
    goto('/foods/dashboard');
  }
</script>

<svelte:head>
  <title>Add Recipe - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto space-y-6">

    <Breadcrumb currentPage="Add Recipe" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Add Recipe</h1>
        <p class="text-base-content/70">Create and share your family recipes</p>
      </div>
      <button class="btn btn-ghost" on:click={navigateToDashboard}>
        <Icon icon="heroicons:arrow-left" class="w-5 h-5" />
        Back to Dashboard
      </button>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Success Message -->
    {#if showSuccess}
      <div class="alert alert-success">
        <Icon icon="heroicons:check-circle" class="w-5 h-5" />
        <span>Recipe added successfully! Redirecting to dashboard...</span>
      </div>
    {/if}

    <!-- Recipe Form -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title mb-4">
          <Icon icon="heroicons:document-plus" class="w-5 h-5" />
          Recipe Details
        </h3>

        <form on:submit|preventDefault={submitRecipe} class="space-y-6">

          <!-- Voice Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Voice Command</span>
            </label>
            <VoiceInput
              onResult={handleVoiceCommand}
              placeholder="Say 'add recipe for chicken biryani' or 'south indian breakfast'"
            />
          </div>

          <!-- Basic Info Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Recipe Name *</span>
              </label>
              <input
                type="text"
                bind:value={formData.name}
                class="input input-bordered"
                placeholder="e.g., Chicken Biryani"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Cuisine</span>
              </label>
              <select bind:value={formData.cuisine} class="select select-bordered">
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
                <option value="Hyderabadi">Hyderabadi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Bengali">Bengali</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
                <option value="International">International</option>
              </select>
            </div>
          </div>

          <!-- Category and Meal Type Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={formData.category} class="select select-bordered">
                <option value="Breakfast">Breakfast</option>
                <option value="Main Course">Main Course</option>
                <option value="Side Dish">Side Dish</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Meal Type</span>
              </label>
              <select bind:value={formData.meal_type} class="select select-bordered">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Difficulty</span>
              </label>
              <select bind:value={formData.difficulty} class="select select-bordered">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <!-- Ingredients -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Ingredients *</span>
              <button type="button" class="btn btn-xs btn-outline" on:click={addIngredient}>
                <Icon icon="heroicons:plus" class="w-4 h-4" />
                Add Ingredient
              </button>
            </label>
            <div class="space-y-2">
              {#each formData.ingredients as ingredient, index}
                <div class="flex gap-2">
                  <input
                    type="text"
                    bind:value={formData.ingredients[index]}
                    on:input={(e) => updateIngredient(index, e.target.value)}
                    class="input input-bordered flex-1"
                    placeholder="e.g., 500g chicken"
                  />
                  {#if formData.ingredients.length > 1}
                    <button
                      type="button"
                      class="btn btn-ghost btn-sm"
                      on:click={() => removeIngredient(index)}
                    >
                      <Icon icon="heroicons:trash" class="w-4 h-4 text-error" />
                    </button>
                  {/if}
                </div>
              {/each}
            </div>
          </div>

          <!-- Instructions -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Cooking Instructions *</span>
            </label>
            <textarea
              bind:value={formData.instructions}
              class="textarea textarea-bordered h-32"
              placeholder="Step-by-step cooking instructions..."
              required
            ></textarea>
          </div>

          <!-- Time and Servings Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Preparation Time (minutes)</span>
              </label>
              <input
                type="number"
                bind:value={formData.preparation_time}
                class="input input-bordered"
                min="5"
                max="480"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Servings</span>
              </label>
              <input
                type="number"
                bind:value={formData.servings}
                class="input input-bordered"
                min="1"
                max="50"
              />
            </div>
          </div>

          <!-- Dietary Tags -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Dietary Information</span>
            </label>
            <div class="flex flex-wrap gap-2">
              {#each ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Keto', 'Low-carb', 'High-protein'] as tag}
                <label class="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dietary_tags.includes(tag)}
                    on:change={() => toggleDietaryTag(tag)}
                    class="checkbox checkbox-primary"
                  />
                  <span class="ml-2">{tag}</span>
                </label>
              {/each}
            </div>
          </div>

          <!-- Nutritional Info -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nutritional Information (per serving)</span>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="label">
                  <span class="label-text text-sm">Calories</span>
                </label>
                <input
                  type="number"
                  bind:value={formData.nutritional_info.calories}
                  class="input input-bordered input-sm"
                  min="0"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">Protein (g)</span>
                </label>
                <input
                  type="number"
                  bind:value={formData.nutritional_info.protein}
                  class="input input-bordered input-sm"
                  min="0"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">Carbs (g)</span>
                </label>
                <input
                  type="number"
                  bind:value={formData.nutritional_info.carbs}
                  class="input input-bordered input-sm"
                  min="0"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text text-sm">Fat (g)</span>
                </label>
                <input
                  type="number"
                  bind:value={formData.nutritional_info.fat}
                  class="input input-bordered input-sm"
                  min="0"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-control pt-4">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner"></span>
                Adding Recipe...
              {:else}
                <Icon icon="heroicons:plus" class="w-5 h-5" />
                Add Recipe
              {/if}
            </button>
          </div>

        </form>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="foods" recordId="create" />

  </div>
</div>