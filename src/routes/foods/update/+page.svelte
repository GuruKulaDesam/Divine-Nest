<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { foods, updateFood } from '$lib/stores/foods';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let selectedRecipe = null;
  let voiceResult = '';
  let isUpdating = false;
  let showSuccess = false;
  let action = 'view'; // view, edit, schedule, cook

  // Get recipe ID and action from URL params
  $: recipeId = $page.url.searchParams.get('id');
  $: action = $page.url.searchParams.get('action') || 'view';

  // Find the selected recipe
  $: selectedRecipe = recipeId ? $foods.find(r => r.id === recipeId) : null;

  // Editable form data
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

  // Schedule form
  let scheduleData = {
    scheduled_for: '',
    notes: ''
  };

  // Cooking completion
  let cookingData = {
    actual_time: 0,
    notes: '',
    rating: 5
  };

  // Initialize form data when recipe is selected
  $: if (selectedRecipe) {
    formData = {
      name: selectedRecipe.name,
      category: selectedRecipe.category,
      cuisine: selectedRecipe.cuisine,
      ingredients: [...selectedRecipe.ingredients],
      instructions: selectedRecipe.instructions,
      preparation_time: selectedRecipe.preparation_time,
      servings: selectedRecipe.servings,
      difficulty: selectedRecipe.difficulty,
      dietary_tags: [...selectedRecipe.dietary_tags],
      meal_type: selectedRecipe.meal_type,
      nutritional_info: { ...selectedRecipe.nutritional_info }
    };

    if (action === 'schedule' && selectedRecipe.scheduled_for) {
      scheduleData.scheduled_for = new Date(selectedRecipe.scheduled_for).toISOString().slice(0, 16);
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('schedule') || lowerResult.includes('plan')) {
      action = 'schedule';
    } else if (lowerResult.includes('cook') || lowerResult.includes('start cooking')) {
      markAsCooking();
    } else if (lowerResult.includes('complete') || lowerResult.includes('finished')) {
      completeCooking();
    } else if (lowerResult.includes('edit') || lowerResult.includes('modify')) {
      action = 'edit';
    }
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
    formData.ingredients = [...formData.ingredients];
  }

  function toggleDietaryTag(tag) {
    if (formData.dietary_tags.includes(tag)) {
      formData.dietary_tags = formData.dietary_tags.filter(t => t !== tag);
    } else {
      formData.dietary_tags = [...formData.dietary_tags, tag];
    }
  }

  async function updateRecipe() {
    if (!selectedRecipe) return;

    isUpdating = true;

    try {
      const updates = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim()),
        updated_at: new Date().toISOString()
      };

      await updateFood(selectedRecipe.id, updates);
      showSuccess = true;
      setTimeout(() => {
        showSuccess = false;
        action = 'view';
      }, 2000);

    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Error updating recipe. Please try again.');
    } finally {
      isUpdating = false;
    }
  }

  async function scheduleMeal() {
    if (!selectedRecipe || !scheduleData.scheduled_for) return;

    isUpdating = true;

    try {
      await updateFood(selectedRecipe.id, {
        scheduled_for: new Date(scheduleData.scheduled_for).toISOString(),
        updated_at: new Date().toISOString()
      });

      showSuccess = true;
      setTimeout(() => {
        showSuccess = false;
        action = 'view';
      }, 2000);

    } catch (error) {
      console.error('Error scheduling meal:', error);
      alert('Error scheduling meal. Please try again.');
    } finally {
      isUpdating = false;
    }
  }

  async function markAsCooking() {
    if (!selectedRecipe) return;

    isUpdating = true;

    try {
      await updateFood(selectedRecipe.id, {
        cooked_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      showSuccess = true;
      setTimeout(() => {
        showSuccess = false;
        action = 'view';
      }, 2000);

    } catch (error) {
      console.error('Error marking as cooking:', error);
      alert('Error updating recipe status. Please try again.');
    } finally {
      isUpdating = false;
    }
  }

  async function completeCooking() {
    if (!selectedRecipe) return;

    isUpdating = true;

    try {
      const updates = {
        cooked_at: selectedRecipe.cooked_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Could add cooking completion data here
      await updateFood(selectedRecipe.id, updates);

      showSuccess = true;
      setTimeout(() => {
        showSuccess = false;
        action = 'view';
      }, 2000);

    } catch (error) {
      console.error('Error completing cooking:', error);
      alert('Error completing cooking. Please try again.');
    } finally {
      isUpdating = false;
    }
  }

  function navigateToDashboard() {
    goto('/foods/dashboard');
  }

  function navigateToCreate() {
    goto('/foods/create');
  }

  function navigateToReview() {
    goto('/foods/review');
  }

  function setAction(newAction) {
    action = newAction;
  }
</script>

<svelte:head>
  <title>Update Recipe - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-6xl mx-auto space-y-6">

    <Breadcrumb currentPage="Update Recipe" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update Recipe</h1>
        <p class="text-base-content/70">Manage recipes, schedule meals, and track cooking</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'schedule meal' or 'mark as cooking'" />
        <button class="btn btn-ghost" on:click={navigateToDashboard}>
          <Icon icon="heroicons:arrow-left" class="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
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
        <span>Recipe updated successfully!</span>
      </div>
    {/if}

    {#if selectedRecipe}
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

        <!-- Recipe Info Sidebar -->
        <div class="lg:col-span-1">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-lg">{selectedRecipe.name}</h3>

              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                  <span class="text-sm">{selectedRecipe.rating} ({selectedRecipe.reviews} reviews)</span>
                </div>

                <div class="flex items-center gap-2">
                  <Icon icon="heroicons:clock" class="w-4 h-4 text-blue-500" />
                  <span class="text-sm">{selectedRecipe.preparation_time} min</span>
                </div>

                <div class="flex items-center gap-2">
                  <Icon icon="heroicons:user-group" class="w-4 h-4 text-green-500" />
                  <span class="text-sm">{selectedRecipe.servings} servings</span>
                </div>

                <div class="badge badge-outline">{selectedRecipe.cuisine}</div>
                <div class="badge badge-outline">{selectedRecipe.difficulty}</div>
                <div class="badge badge-outline">{selectedRecipe.meal_type}</div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-2 mt-4">
                <button
                  class="btn btn-outline btn-sm w-full {action === 'view' ? 'btn-active' : ''}"
                  on:click={() => setAction('view')}
                >
                  <Icon icon="heroicons:eye" class="w-4 h-4" />
                  View
                </button>

                <button
                  class="btn btn-outline btn-sm w-full {action === 'edit' ? 'btn-active' : ''}"
                  on:click={() => setAction('edit')}
                >
                  <Icon icon="heroicons:pencil" class="w-4 h-4" />
                  Edit
                </button>

                <button
                  class="btn btn-outline btn-sm w-full {action === 'schedule' ? 'btn-active' : ''}"
                  on:click={() => setAction('schedule')}
                >
                  <Icon icon="heroicons:calendar" class="w-4 h-4" />
                  Schedule
                </button>

                {#if !selectedRecipe.cooked_at}
                  <button
                    class="btn btn-primary btn-sm w-full"
                    on:click={markAsCooking}
                    disabled={isUpdating}
                  >
                    {#if isUpdating}
                      <span class="loading loading-spinner loading-xs"></span>
                    {:else}
                      <Icon icon="heroicons:fire" class="w-4 h-4" />
                    {/if}
                    Start Cooking
                  </button>
                {:else}
                  <button
                    class="btn btn-success btn-sm w-full"
                    on:click={completeCooking}
                    disabled={isUpdating}
                  >
                    {#if isUpdating}
                      <span class="loading loading-spinner loading-xs"></span>
                    {:else}
                      <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                    {/if}
                    Mark Complete
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">

          <!-- View Mode -->
          {#if action === 'view'}
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">Recipe Details</h3>

                <!-- Ingredients -->
                <div class="mb-6">
                  <h4 class="font-semibold mb-3">Ingredients</h4>
                  <ul class="list-disc list-inside space-y-1">
                    {#each selectedRecipe.ingredients as ingredient}
                      <li class="text-sm">{ingredient}</li>
                    {/each}
                  </ul>
                </div>

                <!-- Instructions -->
                <div class="mb-6">
                  <h4 class="font-semibold mb-3">Instructions</h4>
                  <p class="text-sm whitespace-pre-line">{selectedRecipe.instructions}</p>
                </div>

                <!-- Nutritional Info -->
                <div class="mb-6">
                  <h4 class="font-semibold mb-3">Nutritional Information (per serving)</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center p-3 bg-base-200 rounded-lg">
                      <div class="text-2xl font-bold text-primary">{selectedRecipe.nutritional_info.calories}</div>
                      <div class="text-sm text-base-content/70">Calories</div>
                    </div>
                    <div class="text-center p-3 bg-base-200 rounded-lg">
                      <div class="text-2xl font-bold text-secondary">{selectedRecipe.nutritional_info.protein}g</div>
                      <div class="text-sm text-base-content/70">Protein</div>
                    </div>
                    <div class="text-center p-3 bg-base-200 rounded-lg">
                      <div class="text-2xl font-bold text-accent">{selectedRecipe.nutritional_info.carbs}g</div>
                      <div class="text-sm text-base-content/70">Carbs</div>
                    </div>
                    <div class="text-center p-3 bg-base-200 rounded-lg">
                      <div class="text-2xl font-bold text-neutral">{selectedRecipe.nutritional_info.fat}g</div>
                      <div class="text-sm text-base-content/70">Fat</div>
                    </div>
                  </div>
                </div>

                <!-- Status Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#if selectedRecipe.scheduled_for}
                    <div class="alert alert-info">
                      <Icon icon="heroicons:calendar" class="w-5 h-5" />
                      <div>
                        <div class="font-semibold">Scheduled for</div>
                        <div class="text-sm">{new Date(selectedRecipe.scheduled_for).toLocaleString()}</div>
                      </div>
                    </div>
                  {/if}

                  {#if selectedRecipe.cooked_at}
                    <div class="alert alert-success">
                      <Icon icon="heroicons:check-circle" class="w-5 h-5" />
                      <div>
                        <div class="font-semibold">Last cooked</div>
                        <div class="text-sm">{new Date(selectedRecipe.cooked_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/if}

          <!-- Edit Mode -->
          {#if action === 'edit'}
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">Edit Recipe</h3>

                <form on:submit|preventDefault={updateRecipe} class="space-y-6">

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

                  <!-- Ingredients -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Ingredients</span>
                      <button type="button" class="btn btn-xs btn-outline" on:click={addIngredient}>
                        <Icon icon="heroicons:plus" class="w-4 h-4" />
                        Add
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
                      <span class="label-text">Instructions</span>
                    </label>
                    <textarea
                      bind:value={formData.instructions}
                      class="textarea textarea-bordered h-32"
                      required
                    ></textarea>
                  </div>

                  <!-- Time and Servings -->
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

                  <!-- Submit Button -->
                  <div class="form-control pt-4">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      disabled={isUpdating}
                    >
                      {#if isUpdating}
                        <span class="loading loading-spinner"></span>
                        Updating...
                      {:else}
                        <Icon icon="heroicons:check" class="w-5 h-5" />
                        Update Recipe
                      {/if}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          {/if}

          <!-- Schedule Mode -->
          {#if action === 'schedule'}
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">Schedule Meal</h3>

                <form on:submit|preventDefault={scheduleMeal} class="space-y-6">

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Schedule Date & Time</span>
                    </label>
                    <input
                      type="datetime-local"
                      bind:value={scheduleData.scheduled_for}
                      class="input input-bordered"
                      required
                    />
                  </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Notes</span>
                    </label>
                    <textarea
                      bind:value={scheduleData.notes}
                      class="textarea textarea-bordered"
                      placeholder="Any special notes for this meal..."
                      rows="3"
                    ></textarea>
                  </div>

                  <div class="form-control">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      disabled={isUpdating}
                    >
                      {#if isUpdating}
                        <span class="loading loading-spinner"></span>
                        Scheduling...
                      {:else}
                        <Icon icon="heroicons:calendar" class="w-5 h-5" />
                        Schedule Meal
                      {/if}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          {/if}

          <!-- Discussion Forum -->
          <DiscussionForum tableName="foods" recordId={selectedRecipe.id} />

        </div>

      </div>
    {:else}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body text-center py-12">
          <Icon icon="heroicons:document-text" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-base-content/70">Recipe not found</h3>
          <p class="text-base-content/50">The requested recipe could not be found.</p>
          <button class="btn btn-primary mt-4" on:click={navigateToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    {/if}

    <!-- Navigation -->
    <div class="flex justify-center gap-4">
      <button class="btn btn-outline" on:click={navigateToDashboard}>
        <Icon icon="heroicons:home" class="w-4 h-4" />
        Dashboard
      </button>
      <button class="btn btn-outline" on:click={navigateToCreate}>
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        Add Recipe
      </button>
      <button class="btn btn-outline" on:click={navigateToReview}>
        <Icon icon="heroicons:eye" class="w-4 h-4" />
        Review All
      </button>
    </div>

  </div>
</div>