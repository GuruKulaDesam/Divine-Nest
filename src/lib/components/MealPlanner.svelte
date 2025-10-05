<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";

  import { getMealPlans, getMealPlanByDate, addMealPlan, updateMealPlan, deleteMealPlan, generateGroceryList } from "../data/meals.js";

  const dispatch = createEventDispatcher();

  let mealPlans = [];
  let selectedDate = new Date().toISOString().split("T")[0];
  let currentPlan = null;
  let showAddForm = false;
  let formData = {
    type: "daily",
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
    culturalNotes: "",
  };

  // Load meal plans on mount
  async function loadMealPlans() {
    try {
      mealPlans = await getMealPlans();
      await loadCurrentPlan();
    } catch (error) {
      console.error("Error loading meal plans:", error);
    }
  }

  // Initialize
  loadMealPlans();

  async function loadCurrentPlan() {
    try {
      currentPlan = await getMealPlanByDate(new Date(selectedDate));
      if (currentPlan) {
        formData = {
          type: currentPlan.type,
          breakfast: currentPlan.meals.breakfast,
          lunch: currentPlan.meals.lunch,
          dinner: currentPlan.meals.dinner,
          snacks: currentPlan.meals.snacks ? currentPlan.meals.snacks.join(", ") : "",
          culturalNotes: currentPlan.culturalNotes || "",
        };
      } else {
        resetForm();
      }
    } catch (error) {
      console.error("Error loading current plan:", error);
    }
  }

  $: selectedDate, loadCurrentPlan();

  function resetForm() {
    formData = {
      type: "daily",
      breakfast: "",
      lunch: "",
      dinner: "",
      snacks: "",
      culturalNotes: "",
    };
    currentPlan = null;
  }

  async function handleSubmit() {
    try {
      const snacks = formData.snacks
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const planData = {
        date: new Date(selectedDate),
        type: formData.type,
        meals: {
          breakfast: formData.breakfast,
          lunch: formData.lunch,
          dinner: formData.dinner,
          snacks: snacks.length > 0 ? snacks : undefined,
        },
        ingredients: [], // Will be populated based on recipes
        culturalNotes: formData.culturalNotes || undefined,
        completed: false,
      };

      if (currentPlan) {
        await updateMealPlan(currentPlan.id, planData);
      } else {
        await addMealPlan(planData);
      }

      showAddForm = false;
      await loadMealPlans();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  }

  async function handleDelete(planId) {
    if (confirm("Are you sure you want to delete this meal plan?")) {
      try {
        await deleteMealPlan(planId);
        await loadMealPlans();
        dispatch("dataChanged");
      } catch (error) {
        console.error("Error deleting meal plan:", error);
      }
    }
  }

  async function markCompleted(planId, completed) {
    try {
      await updateMealPlan(planId, { completed });
      await loadMealPlans();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error updating meal plan status:", error);
    }
  }

  async function generateGroceryListForPlan(plan) {
    try {
      const groceryList = await generateGroceryList(plan);
      // In a real app, this would navigate to grocery list or show modal
      alert(`Generated grocery list with ${groceryList.length} items needed for this meal plan.`);
    } catch (error) {
      console.error("Error generating grocery list:", error);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function isToday(date) {
    const today = new Date();
    const checkDate = new Date(date);
    return checkDate.toDateString() === today.toDateString();
  }

  function getTypeColor(type) {
    switch (type) {
      case "daily":
        return "bg-blue-100 text-blue-800";
      case "weekly":
        return "bg-green-100 text-green-800";
      case "festival":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
</script>

<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
      <Icon icon="heroicons:calendar" class="text-orange-500" />
      Meal Planner & Grocery Sync
    </h2>
    <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <Icon icon="heroicons:plus" class="text-lg" />
      {showAddForm ? "Cancel" : "Plan Meal"}
    </button>
  </div>

  <!-- Date Selector -->
  <div class="mb-6 p-4 bg-orange-50 rounded-xl">
    <label class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
    <input type="date" bind:value={selectedDate} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
    <p class="text-sm text-gray-600 mt-1">
      {isToday(selectedDate) ? "Today - " : ""}{formatDate(selectedDate)}
    </p>
  </div>

  <!-- Current Day Plan -->
  <div class="mb-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Meal Plan for {formatDate(selectedDate)}</h3>

    {#if currentPlan}
      <div class="bg-orange-50 rounded-xl p-6 border border-orange-200">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 text-sm font-medium rounded-full {getTypeColor(currentPlan.type)}">
                {currentPlan.type}
              </span>
              {#if currentPlan.completed}
                <span class="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800"> Completed </span>
              {/if}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white p-3 rounded-lg">
                <h4 class="font-medium text-gray-800 text-sm">Breakfast</h4>
                <p class="text-sm text-orange-700">{currentPlan.meals.breakfast}</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <h4 class="font-medium text-gray-800 text-sm">Lunch</h4>
                <p class="text-sm text-orange-700">{currentPlan.meals.lunch}</p>
              </div>
              <div class="bg-white p-3 rounded-lg">
                <h4 class="font-medium text-gray-800 text-sm">Dinner</h4>
                <p class="text-sm text-orange-700">{currentPlan.meals.dinner}</p>
              </div>
              {#if currentPlan.meals.snacks}
                <div class="bg-white p-3 rounded-lg">
                  <h4 class="font-medium text-gray-800 text-sm">Snacks</h4>
                  <p class="text-sm text-orange-700">{currentPlan.meals.snacks.join(", ")}</p>
                </div>
              {/if}
            </div>

            {#if currentPlan.culturalNotes}
              <div class="mt-4 p-3 bg-white rounded-lg">
                <h4 class="font-medium text-gray-800 text-sm mb-1">Cultural Notes</h4>
                <p class="text-sm text-gray-600">{currentPlan.culturalNotes}</p>
              </div>
            {/if}
          </div>

          <div class="flex gap-2 ml-4">
            <button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200" on:click={() => (showAddForm = true)}>
              <Icon icon="heroicons:pencil" class="text-lg" />
            </button>
            <button class="text-green-500 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200" on:click={() => markCompleted(currentPlan.id, !currentPlan.completed)}>
              <Icon icon={currentPlan.completed ? "heroicons:check-circle" : "heroicons:circle"} class="text-lg" />
            </button>
            <button class="text-purple-500 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors duration-200" on:click={() => generateGroceryListForPlan(currentPlan)}>
              <Icon icon="heroicons:shopping-bag" class="text-lg" />
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" on:click={() => handleDelete(currentPlan.id)}>
              <Icon icon="heroicons:trash" class="text-lg" />
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="text-center py-12 bg-gray-50 rounded-xl">
        <Icon icon="heroicons:calendar" class="text-gray-300 text-6xl mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-600 mb-2">No Meal Plan</h3>
        <p class="text-gray-500 mb-4">Create a meal plan for this date</p>
        <button class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={() => (showAddForm = true)}> Create Meal Plan </button>
      </div>
    {/if}
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="mb-6 p-6 bg-orange-50 rounded-xl border border-orange-200" in:fade>
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {currentPlan ? "Edit Meal Plan" : "Create Meal Plan"}
      </h3>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
            <select bind:value={formData.type} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="festival">Festival</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Breakfast</label>
            <input type="text" bind:value={formData.breakfast} placeholder="e.g., Idli with Sambar" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lunch</label>
            <input type="text" bind:value={formData.lunch} placeholder="e.g., Sambar Rice" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Dinner</label>
            <input type="text" bind:value={formData.dinner} placeholder="e.g., Vegetable Curry with Rice" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Snacks (optional)</label>
            <input type="text" bind:value={formData.snacks} placeholder="e.g., Banana, Coffee" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cultural Notes (optional)</label>
          <textarea bind:value={formData.culturalNotes} placeholder="Any cultural or traditional significance..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea>
        </div>

        <div class="flex gap-3">
          <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            {currentPlan ? "Update Plan" : "Create Plan"}
          </button>
          <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={resetForm}> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Recent Meal Plans -->
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Meal Plans</h3>
    <div class="space-y-3">
      {#each mealPlans.slice(0, 5) as plan}
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 class="font-medium text-gray-800">{formatDate(plan.date)}</h4>
            <p class="text-sm text-gray-600">{plan.meals.breakfast} • {plan.meals.lunch} • {plan.meals.dinner}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-2 py-1 text-xs font-medium rounded-full {getTypeColor(plan.type)}">
              {plan.type}
            </span>
            {#if plan.completed}
              <Icon icon="heroicons:check-circle" class="text-green-500 text-lg" />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
