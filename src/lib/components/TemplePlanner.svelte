<script>
  import { onMount } from "svelte";
  import { getTempleTrips, addTempleTrip, updateTempleTrip, deleteTempleTrip, markTempleTripCompleted } from "../data/rituals.js";

  let trips = [];
  let showAddForm = false;
  let editingTrip = null;
  let formData = {
    destination: "",
    startDate: "",
    endDate: "",
    travelers: [],
    checklist: [],
    budget: 0,
    accommodations: "",
    transportation: "",
    specialNotes: "",
  };

  onMount(async () => {
    await loadTrips();
  });

  async function loadTrips() {
    trips = await getTempleTrips();
  }

  function resetForm() {
    formData = {
      destination: "",
      startDate: "",
      endDate: "",
      travelers: [],
      checklist: [],
      budget: 0,
      accommodations: "",
      transportation: "",
      specialNotes: "",
    };
    editingTrip = null;
    showAddForm = false;
  }

  function editTrip(trip) {
    editingTrip = trip;
    formData = {
      destination: trip.destination,
      startDate: new Date(trip.startDate).toISOString().split("T")[0],
      endDate: new Date(trip.endDate).toISOString().split("T")[0],
      travelers: [...trip.travelers],
      checklist: [...trip.checklist],
      budget: trip.budget,
      accommodations: trip.accommodations || "",
      transportation: trip.transportation || "",
      specialNotes: trip.specialNotes || "",
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const tripData = {
        destination: formData.destination,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        travelers: formData.travelers.filter((t) => t.trim()),
        checklist: formData.checklist.filter((c) => c.trim()),
        budget: parseFloat(formData.budget),
        accommodations: formData.accommodations,
        transportation: formData.transportation,
        specialNotes: formData.specialNotes,
        completed: false,
      };

      if (editingTrip) {
        await updateTempleTrip(editingTrip.id, tripData);
      } else {
        await addTempleTrip(tripData);
      }

      await loadTrips();
      resetForm();
      dispatch("update");
    } catch (error) {
      console.error("Error saving temple trip:", error);
    }
  }

  async function toggleCompleted(trip) {
    await markTempleTripCompleted(trip.id, !trip.completed);
    await loadTrips();
    dispatch("update");
  }

  async function handleDelete(trip) {
    if (confirm(`Are you sure you want to delete the trip to "${trip.destination}"?`)) {
      await deleteTempleTrip(trip.id);
      await loadTrips();
      dispatch("update");
    }
  }

  function addTraveler() {
    formData.travelers = [...formData.travelers, ""];
  }

  function updateTraveler(index, value) {
    formData.travelers[index] = value;
  }

  function removeTraveler(index) {
    formData.travelers = formData.travelers.filter((_, i) => i !== index);
  }

  function addChecklistItem() {
    formData.checklist = [...formData.checklist, ""];
  }

  function updateChecklistItem(index, value) {
    formData.checklist[index] = value;
  }

  function removeChecklistItem(index) {
    formData.checklist = formData.checklist.filter((_, i) => i !== index);
  }

  function dispatch(event) {
    // Custom event dispatcher for parent component updates
  }
</script>

<div class="space-y-6">
  <!-- Header with Add Button -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Temple Trips</h2>
    <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      {#if showAddForm}
        ✕ Cancel
      {:else}
        ➕ Plan Trip
      {/if}
    </button>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {editingTrip ? "Edit Temple Trip" : "Plan New Temple Trip"}
      </h3>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label for="temple-destination" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Destination * </label>
            <input id="temple-destination" type="text" bind:value={formData.destination} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Sri Ramanasramam, Tiruvannamalai" />
          </div>

          <div>
            <label for="temple-start-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Start Date * </label>
            <input id="temple-start-date" type="date" bind:value={formData.startDate} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label for="temple-end-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> End Date * </label>
            <input id="temple-end-date" type="date" bind:value={formData.endDate} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label for="temple-budget" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Budget (₹) </label>
            <input id="temple-budget" type="number" bind:value={formData.budget} min="0" step="100" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="15000" />
          </div>

          <div>
            <label for="temple-transportation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Transportation </label>
            <select id="temple-transportation" bind:value={formData.transportation} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option value="">Select transportation</option>
              <option value="Car">Car</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Walk">Walk/Pilgrimage</option>
            </select>
          </div>
        </div>

        <div>
          <label for="temple-accommodations" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Accommodations </label>
          <input id="temple-accommodations" type="text" bind:value={formData.accommodations} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Temple guest house, Ashram" />
        </div>

        <div>
          <label for="temple-special-notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Special Notes </label>
          <textarea id="temple-special-notes" bind:value={formData.specialNotes} rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Any special requirements, timings, or notes..."></textarea>
        </div>

        <!-- Travelers -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Travelers </label>
          {#each formData.travelers as traveler, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={traveler} on:input={(e) => updateTraveler(index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., amma, appa, paati" />
              <button type="button" on:click={() => removeTraveler(index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={addTraveler} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Traveler </button>
        </div>

        <!-- Checklist -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Preparation Checklist </label>
          {#each formData.checklist as item, index}
            <div class="flex gap-2 mb-2">
              <input type="text" bind:value={item} on:input={(e) => updateChecklistItem(index, e.target.value)} class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="e.g., Pack traditional clothing" />
              <button type="button" on:click={() => removeChecklistItem(index)} class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"> ✕ </button>
            </div>
          {/each}
          <button type="button" on:click={addChecklistItem} class="text-orange-600 hover:text-orange-700 text-sm font-medium"> + Add Checklist Item </button>
        </div>

        <div class="flex gap-4">
          <button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
            {editingTrip ? "Update Trip" : "Plan Trip"}
          </button>
          <button type="button" on:click={resetForm} class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Trips List -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each trips as trip}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              🏛️ {trip.destination}
            </h3>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </span>
              {#if trip.completed}
                <span class="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"> Completed </span>
              {:else}
                <span class="text-sm px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"> Planned </span>
              {/if}
            </div>
          </div>
          <div class="flex gap-2">
            <button on:click={() => editTrip(trip)} class="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-lg" title="Edit"> ✏️ </button>
            <button on:click={() => handleDelete(trip)} class="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg" title="Delete"> 🗑️ </button>
          </div>
        </div>

        <div class="space-y-3 mb-4">
          {#if trip.travelers && trip.travelers.length > 0}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">👥</span>
              <span>{trip.travelers.join(", ")}</span>
            </div>
          {/if}

          {#if trip.budget > 0}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">💰</span>
              <span>₹{trip.budget.toLocaleString()}</span>
            </div>
          {/if}

          {#if trip.transportation}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">🚗</span>
              <span>{trip.transportation}</span>
            </div>
          {/if}

          {#if trip.accommodations}
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span class="mr-2">🏠</span>
              <span>{trip.accommodations}</span>
            </div>
          {/if}
        </div>

        {#if trip.checklist && trip.checklist.length > 0}
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</h4>
            <ul class="space-y-1">
              {#each trip.checklist.slice(0, 3) as item}
                <li class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <span class="mr-2">•</span>
                  <span>{item}</span>
                </li>
              {/each}
              {#if trip.checklist.length > 3}
                <li class="text-sm text-gray-500 dark:text-gray-500">
                  +{trip.checklist.length - 3} more items
                </li>
              {/if}
            </ul>
          </div>
        {/if}

        {#if trip.specialNotes}
          <div class="mb-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <p class="text-sm text-orange-800 dark:text-orange-200">
              📝 {trip.specialNotes}
            </p>
          </div>
        {/if}

        <button on:click={() => toggleCompleted(trip)} class="w-full py-2 px-4 rounded-lg font-medium {trip.completed ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}">
          {trip.completed ? "✅ Trip Completed" : "Mark as Completed"}
        </button>
      </div>
    {/each}
  </div>

  {#if trips.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🏛️</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Temple Trips Planned</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">Plan your first temple pilgrimage to connect with your spiritual heritage.</p>
      <button on:click={() => (showAddForm = true)} class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"> Plan Your First Trip </button>
    </div>
  {/if}
</div>
