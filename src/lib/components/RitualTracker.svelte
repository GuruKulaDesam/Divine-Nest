<script>
  import { onMount } from "svelte";
  import { getRituals, addRitual, updateRitual, deleteRitual, markRitualCompleted } from "../data/rituals.js";

  let rituals = [];
  let showAddForm = false;
  let editingRitual = null;
  let formData = {
    name: "",
    type: "daily",
    date: new Date().toISOString().split("T")[0],
    participants: [],
    description: "",
    materials: [],
    duration: 30,
    significance: "",
  };

  onMount(async () => {
    await loadRituals();
  });

  async function loadRituals() {
    rituals = await getRituals();
  }

  function resetForm() {
    formData = {
      name: "",
      type: "daily",
      date: new Date().toISOString().split("T")[0],
      participants: [],
      description: "",
      materials: [],
      duration: 30,
      significance: "",
    };
    editingRitual = null;
    showAddForm = false;
  }

  function editRitual(ritual) {
    editingRitual = ritual;
    formData = {
      name: ritual.name,
      type: ritual.type,
      date: new Date(ritual.date).toISOString().split("T")[0],
      participants: [...ritual.participants],
      description: ritual.description || "",
      materials: [...(ritual.materials || [])],
      duration: ritual.duration || 30,
      significance: ritual.significance || "",
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const ritualData = {
        name: formData.name,
        type: formData.type,
        date: new Date(formData.date),
        participants: formData.participants.filter((p) => p.trim()),
        description: formData.description,
        materials: formData.materials.filter((m) => m.trim()),
        duration: parseInt(formData.duration),
        significance: formData.significance,
        completed: false,
      };

      if (editingRitual) {
        await updateRitual(editingRitual.id, ritualData);
      } else {
        await addRitual(ritualData);
      }

      await loadRituals();
      resetForm();
      dispatch("update");
    } catch (error) {
      console.error("Error saving ritual:", error);
    }
  }

  async function toggleCompleted(ritual) {
    await markRitualCompleted(ritual.id, !ritual.completed);
    await loadRituals();
    dispatch("update");
  }

  async function handleDelete(ritual) {
    if (confirm(`Are you sure you want to delete "${ritual.name}"?`)) {
      await deleteRitual(ritual.id);
      await loadRituals();
      dispatch("update");
    }
  }

  function addParticipant() {
    formData.participants = [...formData.participants, ""];
  }

  function updateParticipant(index, value) {
    formData.participants[index] = value;
  }

  function removeParticipant(index) {
    formData.participants = formData.participants.filter((_, i) => i !== index);
  }

  function addMaterial() {
    formData.materials = [...formData.materials, ""];
  }

  function updateMaterial(index, value) {
    formData.materials[index] = value;
  }

  function removeMaterial(index) {
    formData.materials = formData.materials.filter((_, i) => i !== index);
  }

  function dispatch(event) {
    // Custom event dispatcher for parent component updates
  }
</script>

<div class="space-y-6">
  <!-- Header with Add Button -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Daily Rituals</h2>
    <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      {#if showAddForm}
        ✕ Cancel
      {:else}
        ➕ Add Ritual
      {/if}
    </button>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {editingRitual ? "Edit Ritual" : "Add New Ritual"}
      </h3>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Ritual Name * </label>
            <input type="text" bind:value={formData.name} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Morning Pooja" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Type * </label>
            <select bind:value={formData.type} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="festival">Festival</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Date * </label>
            <input type="date" bind:value={formData.date} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Duration (minutes) </label>
            <input type="number" bind:value={formData.duration} min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Description </label>
          <textarea bind:value={formData.description} rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Describe the ritual..."></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Significance </label>
          <input type="text" bind:value={formData.significance} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Spiritual significance..." />
        </div>

        <!-- Participants -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Participants </label>
          {#each formData.participants as participant, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={participant} on:input={(e) => updateParticipant(index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., amma, appa" />
              <button type="button" on:click={() => removeParticipant(index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={addParticipant} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Participant </button>
        </div>

        <!-- Materials -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Materials Needed </label>
          {#each formData.materials as material, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={material} on:input={(e) => updateMaterial(index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., incense, flowers" />
              <button type="button" on:click={() => removeMaterial(index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={addMaterial} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Material </button>
        </div>

        <div class="flex gap-4">
          <button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
            {editingRitual ? "Update Ritual" : "Add Ritual"}
          </button>
          <button type="button" on:click={resetForm} class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Rituals List -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each rituals as ritual}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {ritual.name}
            </h3>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 capitalize">
                {ritual.type}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {new Date(ritual.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <button on:click={() => editRitual(ritual)} class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit"> ✏️ </button>
            <button on:click={() => handleDelete(ritual)} class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete"> 🗑️ </button>
          </div>
        </div>

        {#if ritual.description}
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {ritual.description}
          </p>
        {/if}

        {#if ritual.significance}
          <p class="text-orange-700 dark:text-orange-300 text-sm mb-3 italic">
            "{ritual.significance}"
          </p>
        {/if}

        <div class="space-y-2 mb-4">
          {#if ritual.participants && ritual.participants.length > 0}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">👥</span>
              <span>{ritual.participants.join(", ")}</span>
            </div>
          {/if}

          {#if ritual.duration}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">⏱️</span>
              <span>{ritual.duration} minutes</span>
            </div>
          {/if}

          {#if ritual.materials && ritual.materials.length > 0}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">📦</span>
              <span>{ritual.materials.join(", ")}</span>
            </div>
          {/if}
        </div>

        <button on:click={() => toggleCompleted(ritual)} class="w-full py-2 px-4 rounded-lg font-medium {ritual.completed ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}">
          {ritual.completed ? "✅ Completed" : "Mark as Completed"}
        </button>
      </div>
    {/each}
  </div>

  {#if rituals.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🙏</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Rituals Yet</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">Start by adding your first ritual to maintain spiritual practices.</p>
      <button on:click={() => (showAddForm = true)} class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"> Add Your First Ritual </button>
    </div>
  {/if}
</div>
