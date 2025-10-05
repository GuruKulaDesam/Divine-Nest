<script>
  import { onMount } from "svelte";
  import { getFestivals, addFestival, updateFestival, deleteFestival, markFestivalCompleted } from "../data/rituals.js";

  let festivals = [];
  let showAddForm = false;
  let editingFestival = null;
  let formData = {
    name: "",
    date: "",
    type: "religious",
    significance: "",
    familyTraditions: [],
    preparations: [],
    recipes: [],
    decorations: [],
    gifts: [],
    notes: "",
  };

  onMount(async () => {
    await loadFestivals();
  });

  async function loadFestivals() {
    festivals = await getFestivals();
  }

  function resetForm() {
    formData = {
      name: "",
      date: "",
      type: "religious",
      significance: "",
      familyTraditions: [],
      preparations: [],
      recipes: [],
      decorations: [],
      gifts: [],
      notes: "",
    };
    editingFestival = null;
    showAddForm = false;
  }

  function editFestival(festival) {
    editingFestival = festival;
    formData = {
      name: festival.name,
      date: new Date(festival.date).toISOString().split("T")[0],
      type: festival.type,
      significance: festival.significance,
      familyTraditions: [...festival.familyTraditions],
      preparations: [...festival.preparations],
      recipes: [...festival.recipes],
      decorations: [...(festival.decorations || [])],
      gifts: [...(festival.gifts || [])],
      notes: festival.notes || "",
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const festivalData = {
        name: formData.name,
        date: new Date(formData.date),
        type: formData.type,
        significance: formData.significance,
        familyTraditions: formData.familyTraditions.filter((t) => t.trim()),
        preparations: formData.preparations.filter((p) => p.trim()),
        recipes: formData.recipes.filter((r) => r.trim()),
        decorations: formData.decorations.filter((d) => d.trim()),
        gifts: formData.gifts.filter((g) => g.trim()),
        notes: formData.notes,
        completed: false,
      };

      if (editingFestival) {
        await updateFestival(editingFestival.id, festivalData);
      } else {
        await addFestival(festivalData);
      }

      await loadFestivals();
      resetForm();
      dispatch("update");
    } catch (error) {
      console.error("Error saving festival:", error);
    }
  }

  async function toggleCompleted(festival) {
    await markFestivalCompleted(festival.id, !festival.completed);
    await loadFestivals();
    dispatch("update");
  }

  async function handleDelete(festival) {
    if (confirm(`Are you sure you want to delete "${festival.name}"?`)) {
      await deleteFestival(festival.id);
      await loadFestivals();
      dispatch("update");
    }
  }

  function addItem(arrayName) {
    formData[arrayName] = [...formData[arrayName], ""];
  }

  function updateItem(arrayName, index, value) {
    formData[arrayName][index] = value;
  }

  function removeItem(arrayName, index) {
    formData[arrayName] = formData[arrayName].filter((_, i) => i !== index);
  }

  function dispatch(event) {
    // Custom event dispatcher for parent component updates
  }
</script>

<div class="space-y-6">
  <!-- Header with Add Button -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Festival Celebrations</h2>
    <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      {#if showAddForm}
        ✕ Cancel
      {:else}
        ➕ Add Festival
      {/if}
    </button>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {editingFestival ? "Edit Festival" : "Add New Festival"}
      </h3>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Festival Name * </label>
            <input type="text" bind:value={formData.name} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Diwali, Pongal" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Date * </label>
            <input type="date" bind:value={formData.date} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Type * </label>
            <select bind:value={formData.type} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="religious">Religious</option>
              <option value="cultural">Cultural</option>
              <option value="seasonal">Seasonal</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Significance * </label>
          <textarea bind:value={formData.significance} required rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Describe the spiritual or cultural significance..."></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Notes </label>
          <textarea bind:value={formData.notes} rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Additional notes or reminders..."></textarea>
        </div>

        <!-- Family Traditions -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Family Traditions </label>
          {#each formData.familyTraditions as tradition, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={tradition} on:input={(e) => updateItem("familyTraditions", index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Light oil lamps" />
              <button type="button" on:click={() => removeItem("familyTraditions", index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={() => addItem("familyTraditions")} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Tradition </button>
        </div>

        <!-- Preparations -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Preparations </label>
          {#each formData.preparations as prep, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={prep} on:input={(e) => updateItem("preparations", index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Buy diyas and lamps" />
              <button type="button" on:click={() => removeItem("preparations", index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={() => addItem("preparations")} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Preparation </button>
        </div>

        <!-- Recipes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Traditional Recipes </label>
          {#each formData.recipes as recipe, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={recipe} on:input={(e) => updateItem("recipes", index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Sweet Pongal" />
              <button type="button" on:click={() => removeItem("recipes", index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={() => addItem("recipes")} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Recipe </button>
        </div>

        <!-- Decorations -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Decorations </label>
          {#each formData.decorations as decoration, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={decoration} on:input={(e) => updateItem("decorations", index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Rangoli designs" />
              <button type="button" on:click={() => removeItem("decorations", index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={() => addItem("decorations")} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Decoration </button>
        </div>

        <!-- Gifts -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Gifts & Exchanges </label>
          {#each formData.gifts as gift, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={gift} on:input={(e) => updateItem("gifts", index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Sweets and crackers" />
              <button type="button" on:click={() => removeItem("gifts", index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={() => addItem("gifts")} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Gift Item </button>
        </div>

        <div class="flex gap-4">
          <button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
            {editingFestival ? "Update Festival" : "Add Festival"}
          </button>
          <button type="button" on:click={resetForm} class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Festivals List -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each festivals as festival}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              🎉 {festival.name}
            </h3>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 capitalize">
                {festival.type}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {new Date(festival.date).toLocaleDateString()}
              </span>
              {#if festival.completed}
                <span class="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"> Celebrated </span>
              {/if}
            </div>
          </div>
          <div class="flex gap-2">
            <button on:click={() => editFestival(festival)} class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit"> ✏️ </button>
            <button on:click={() => handleDelete(festival)} class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete"> 🗑️ </button>
          </div>
        </div>

        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {festival.significance}
        </p>

        {#if festival.familyTraditions && festival.familyTraditions.length > 0}
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Family Traditions:</h4>
            <div class="flex flex-wrap gap-1">
              {#each festival.familyTraditions.slice(0, 4) as tradition}
                <span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                  {tradition}
                </span>
              {/each}
              {#if festival.familyTraditions.length > 4}
                <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  +{festival.familyTraditions.length - 4} more
                </span>
              {/if}
            </div>
          </div>
        {/if}

        {#if festival.recipes && festival.recipes.length > 0}
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Traditional Recipes:</h4>
            <div class="flex flex-wrap gap-1">
              {#each festival.recipes.slice(0, 3) as recipe}
                <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                  {recipe}
                </span>
              {/each}
              {#if festival.recipes.length > 3}
                <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  +{festival.recipes.length - 3} more
                </span>
              {/if}
            </div>
          </div>
        {/if}

        {#if festival.preparations && festival.preparations.length > 0}
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preparations:</h4>
            <ul class="space-y-1">
              {#each festival.preparations.slice(0, 2) as prep}
                <li class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <span class="mr-2">•</span>
                  <span>{prep}</span>
                </li>
              {/each}
              {#if festival.preparations.length > 2}
                <li class="text-sm text-gray-500 dark:text-gray-500">
                  +{festival.preparations.length - 2} more preparations
                </li>
              {/if}
            </ul>
          </div>
        {/if}

        {#if festival.notes}
          <div class="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p class="text-sm text-blue-800 dark:text-blue-200">
              📝 {festival.notes}
            </p>
          </div>
        {/if}

        <button on:click={() => toggleCompleted(festival)} class="w-full py-2 px-4 rounded-lg font-medium {festival.completed ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}">
          {festival.completed ? "✅ Festival Celebrated" : "Mark as Celebrated"}
        </button>
      </div>
    {/each}
  </div>

  {#if festivals.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🎉</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Festivals Added</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">Add festivals to preserve and celebrate your cultural traditions.</p>
      <button on:click={() => (showAddForm = true)} class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"> Add Your First Festival </button>
    </div>
  {/if}
</div>
