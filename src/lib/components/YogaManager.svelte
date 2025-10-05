<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { getYogaSessions, addYogaSession, updateYogaSession, deleteYogaSession, markYogaSessionCompleted } from "../data/wellness.js";

  const dispatch = createEventDispatcher();

  let yogaSessions = [];
  let showForm = false;
  let editingSession = null;
  let formData = {
    type: "hatha",
    name: "",
    duration: 30,
    date: new Date().toISOString().split("T")[0],
    difficulty: "beginner",
    notes: "",
  };

  const yogaTypes = [
    { value: "hatha", label: "Hatha Yoga" },
    { value: "vinyasa", label: "Vinyasa Flow" },
    { value: "kundalini", label: "Kundalini Yoga" },
    { value: "meditation", label: "Meditation" },
    { value: "pranayama", label: "Pranayama" },
    { value: "yin", label: "Yin Yoga" },
  ];

  const difficulties = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  onMount(async () => {
    await loadYogaSessions();
  });

  async function loadYogaSessions() {
    yogaSessions = await getYogaSessions();
    dispatch("update");
  }

  function resetForm() {
    formData = {
      type: "hatha",
      name: "",
      duration: 30,
      date: new Date().toISOString().split("T")[0],
      difficulty: "beginner",
      notes: "",
    };
    editingSession = null;
  }

  function openForm(session = null) {
    if (session) {
      editingSession = session;
      formData = {
        type: session.type,
        name: session.name,
        duration: session.duration,
        date: session.date,
        difficulty: session.difficulty,
        notes: session.notes || "",
      };
    } else {
      resetForm();
    }
    showForm = true;
  }

  async function saveSession() {
    if (!formData.name.trim()) return;

    try {
      const sessionData = {
        type: formData.type,
        name: formData.name,
        duration: parseInt(formData.duration),
        date: new Date(formData.date),
        difficulty: formData.difficulty,
        notes: formData.notes,
        completed: false,
      };

      if (editingSession) {
        await updateYogaSession(editingSession.id, sessionData);
      } else {
        await addYogaSession(sessionData);
      }

      await loadYogaSessions();
      showForm = false;
      resetForm();
    } catch (error) {
      console.error("Error saving yoga session:", error);
    }
  }

  async function toggleCompleted(session) {
    try {
      await markYogaSessionCompleted(session.id, !session.completed);
      await loadYogaSessions();
    } catch (error) {
      console.error("Error updating session:", error);
    }
  }

  async function deleteSession(session) {
    if (confirm("Are you sure you want to delete this yoga session?")) {
      try {
        await deleteYogaSession(session.id);
        await loadYogaSessions();
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    }
  }

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case "hatha":
        return "🧘‍♀️";
      case "vinyasa":
        return "🌊";
      case "kundalini":
        return "🔥";
      case "meditation":
        return "🧘‍♂️";
      case "pranayama":
        return "💨";
      case "yin":
        return "🌙";
      default:
        return "🧘‍♀️";
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-green-900 dark:text-green-100">🧘‍♀️ Yoga & Meditation</h2>
      <p class="text-green-700 dark:text-green-300 mt-1">Practice mindfulness and strengthen your body</p>
    </div>
    <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors" on:click={() => openForm()}> + Add Session </button>
  </div>

  <!-- Yoga Sessions List -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each yogaSessions as session}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-green-200 dark:border-green-800 p-4">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">{getTypeIcon(session.type)}</span>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{session.name}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">{session.type}</p>
            </div>
          </div>
          <div class="flex space-x-1">
            <button class="text-blue-600 hover:text-blue-800 p-1" on:click={() => openForm(session)} title="Edit"> ✏️ </button>
            <button class="text-red-600 hover:text-red-800 p-1" on:click={() => deleteSession(session)} title="Delete"> 🗑️ </button>
          </div>
        </div>

        <div class="space-y-2 mb-3">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Duration:</span>
            <span class="font-medium">{session.duration} min</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Date:</span>
            <span class="font-medium">{new Date(session.date).toLocaleDateString()}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Difficulty:</span>
            <span class="px-2 py-1 rounded-full text-xs font-medium {getDifficultyColor(session.difficulty)}">
              {session.difficulty}
            </span>
          </div>
        </div>

        {#if session.notes}
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{session.notes}</p>
        {/if}

        <button class="w-full py-2 px-4 rounded-lg font-medium transition-colors {session.completed ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}" on:click={() => toggleCompleted(session)}>
          {session.completed ? "✅ Completed" : "Mark Complete"}
        </button>
      </div>
    {/each}
  </div>

  {#if yogaSessions.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🧘‍♀️</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Yoga Sessions Yet</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">Start your wellness journey with your first yoga session</p>
      <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors" on:click={() => openForm()}> Add Your First Session </button>
    </div>
  {/if}

  <!-- Add/Edit Form Modal -->
  {#if showForm}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingSession ? "Edit Yoga Session" : "Add Yoga Session"}
        </h3>

        <form on:submit|preventDefault={saveSession} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Yoga Type </label>
            <select bind:value={formData.type} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required>
              {#each yogaTypes as type}
                <option value={type.value}>{type.label}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Session Name </label>
            <input type="text" bind:value={formData.name} placeholder="e.g., Morning Sun Salutation" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Duration (min) </label>
              <input type="number" bind:value={formData.duration} min="5" max="180" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Difficulty </label>
              <select bind:value={formData.difficulty} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                {#each difficulties as diff}
                  <option value={diff.value}>{diff.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Date </label>
            <input type="date" bind:value={formData.date} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Notes (optional) </label>
            <textarea bind:value={formData.notes} placeholder="Any special instructions or notes..." rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
          </div>

          <div class="flex space-x-3 pt-4">
            <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              {editingSession ? "Update" : "Add"} Session
            </button>
            <button
              type="button"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              on:click={() => {
                showForm = false;
                resetForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
