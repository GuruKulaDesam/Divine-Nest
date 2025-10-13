<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let aiPrompts = [];
  let showAddForm = false;
  let editingPrompt = null;
  let searchTerm = "";
  let selectedType = "";
  let selectedCategory = "";

  // Form data
  let formData = {
    type: "Alert",
    category: "SMS",
    purpose: "",
    trigger_time: "",
    trigger_location_lat: "",
    trigger_location_lng: "",
    trigger_radius_meters: "",
    frequency: "Once",
    sound_type: "Positive",
    volume_level: "Medium",
    conditions: ""
  };

  // Load AI prompts on mount
  onMount(async () => {
    await loadAIPrompts();
  });

  async function loadAIPrompts() {
    try {
      aiPrompts = await sqliteService.getAIPrompts();
    } catch (error) {
      console.error("Error loading AI prompts:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Alert",
      category: "SMS",
      purpose: "",
      trigger_time: "",
      trigger_location_lat: "",
      trigger_location_lng: "",
      trigger_radius_meters: "",
      frequency: "Once",
      sound_type: "Positive",
      volume_level: "Medium",
      conditions: ""
    };
  }

  async function savePrompt() {
    try {
      const promptData = {
        ...formData,
        id: editingPrompt ? editingPrompt.id : crypto.randomUUID(),
        trigger_location_lat: formData.trigger_location_lat ? parseFloat(formData.trigger_location_lat) : null,
        trigger_location_lng: formData.trigger_location_lng ? parseFloat(formData.trigger_location_lng) : null,
        trigger_radius_meters: formData.trigger_radius_meters ? parseInt(formData.trigger_radius_meters) : null,
        created_at: editingPrompt ? editingPrompt.created_at : new Date().toISOString()
      };

      if (editingPrompt) {
        await sqliteService.updateAIPrompt(promptData);
      } else {
        await sqliteService.saveAIPrompt(promptData);
      }

      await loadAIPrompts();
      showAddForm = false;
      editingPrompt = null;
      resetForm();
    } catch (error) {
      console.error("Error saving AI prompt:", error);
    }
  }

  function editPrompt(prompt) {
    editingPrompt = prompt;
    formData = { ...prompt };
    showAddForm = true;
  }

  async function deletePrompt(prompt) {
    if (confirm(`Delete "${prompt.purpose}"?`)) {
      try {
        await sqliteService.deleteAIPrompt(prompt.id);
        await loadAIPrompts();
      } catch (error) {
        console.error("Error deleting AI prompt:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingPrompt = null;
    resetForm();
  }

  // Filter AI prompts based on search and filters
  $: filteredPrompts = aiPrompts.filter(prompt => {
    const matchesSearch = !searchTerm ||
      prompt.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prompt.conditions && prompt.conditions.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = !selectedType || prompt.type === selectedType;
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Get unique values for filters
  $: types = [...new Set(aiPrompts.map(p => p.type))];
  $: categories = [...new Set(aiPrompts.map(p => p.category))];

  // Group prompts by type for display
  $: groupedPrompts = filteredPrompts.reduce((groups, prompt) => {
    if (!groups[prompt.type]) {
      groups[prompt.type] = [];
    }
    groups[prompt.type].push(prompt);
    return groups;
  }, {});

  // Get icon for prompt type
  function getTypeIcon(type) {
    switch (type) {
      case 'Alert': return 'heroicons:exclamation-triangle';
      case 'Notes': return 'heroicons:document-text';
      case 'Checklist': return 'heroicons:check-circle';
      case 'Query': return 'heroicons:question-mark-circle';
      default: return 'heroicons:cpu-chip';
    }
  }

  // Get color for sound type
  function getSoundTypeColor(soundType) {
    switch (soundType) {
      case 'Positive': return 'text-green-600';
      case 'Negative': return 'text-red-600';
      case 'Alarming': return 'text-orange-600';
      case 'Pleasant': return 'text-blue-600';
      default: return 'text-base-content';
    }
  }

  // Get volume level indicator
  function getVolumeIndicator(level) {
    const indicators = { 'Low': '🔈', 'Medium': '🔉', 'High': '🔊', 'Adaptive': '🎚️' };
    return indicators[level] || '🔊';
  }
</script>

<svelte:head>
  <title>AI Prompts - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:cpu-chip" class="w-8 h-8" />
          AI Prompts Management
        </h1>
        <p class="text-base-content/70 mt-1">Configure AI-driven alerts, notes, checklists, and queries</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingPrompt = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add AI Prompt
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
            placeholder="Search AI prompts..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
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
      </div>
    </div>

    <!-- AI Prompts by Type -->
    {#each Object.entries(groupedPrompts) as [type, typePrompts]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getTypeIcon(type)} class="w-6 h-6" />
          {type} Prompts
          <span class="badge badge-primary badge-sm">{typePrompts.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each typePrompts as prompt}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="card-title text-lg">{prompt.purpose}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span class="badge badge-primary">{prompt.category}</span>
                      <span class="badge badge-secondary">{prompt.frequency}</span>
                      <span class="badge badge-outline flex items-center gap-1">
                        {getVolumeIndicator(prompt.volume_level)}
                        {prompt.volume_level}
                      </span>
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editPrompt(prompt)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deletePrompt(prompt)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  {#if prompt.trigger_time}
                    <p class="text-sm">
                      <strong>Trigger Time:</strong> {prompt.trigger_time}
                    </p>
                  {/if}

                  {#if prompt.trigger_location_lat && prompt.trigger_location_lng}
                    <p class="text-sm">
                      <strong>Location:</strong> {prompt.trigger_location_lat.toFixed(4)}, {prompt.trigger_location_lng.toFixed(4)}
                      {#if prompt.trigger_radius_meters}
                        ({prompt.trigger_radius_meters}m radius)
                      {/if}
                    </p>
                  {/if}

                  {#if prompt.conditions}
                    <p class="text-sm">
                      <strong>Conditions:</strong> {prompt.conditions}
                    </p>
                  {/if}

                  <div class="flex justify-between items-center pt-2">
                    <span class="text-sm text-base-content/60">
                      Sound: <span class={getSoundTypeColor(prompt.sound_type)}>{prompt.sound_type}</span>
                    </span>
                    <Icon icon={getTypeIcon(prompt.type)} class="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredPrompts.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:cpu-chip" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No AI prompts found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedCategory ? "Try adjusting your filters" : "Add your first AI prompt to get started"}
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
        {editingPrompt ? "Edit AI Prompt" : "Add New AI Prompt"}
      </h3>

      <form on:submit|preventDefault={savePrompt} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Alert</option>
              <option>Notes</option>
              <option>Checklist</option>
              <option>Query</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>SMS</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Calendar Schedule</option>
              <option>WhatsApp</option>
              <option>Alarm</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Purpose *</span>
          </label>
          <textarea
            placeholder="What is this prompt for..."
            class="textarea textarea-bordered"
            bind:value={formData.purpose}
            required
            rows="3"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Trigger Time</span>
            </label>
            <input
              type="time"
              class="input input-bordered"
              bind:value={formData.trigger_time}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Frequency *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.frequency} required>
              <option>Once</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Custom</option>
            </select>
          </div>
        </div>

        <!-- Location Trigger -->
        <div class="space-y-4">
          <h4 class="font-semibold">Location Trigger (Optional)</h4>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Latitude</span>
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="-90 to 90"
                class="input input-bordered"
                bind:value={formData.trigger_location_lat}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Longitude</span>
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="-180 to 180"
                class="input input-bordered"
                bind:value={formData.trigger_location_lng}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Radius (meters)</span>
              </label>
              <input
                type="number"
                placeholder="100"
                class="input input-bordered"
                bind:value={formData.trigger_radius_meters}
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Sound Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.sound_type} required>
              <option>Positive</option>
              <option>Negative</option>
              <option>Alarming</option>
              <option>Pleasant</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Volume Level *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.volume_level} required>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Adaptive</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Conditions</span>
          </label>
          <textarea
            placeholder="Additional conditions for triggering..."
            class="textarea textarea-bordered"
            bind:value={formData.conditions}
            rows="2"
          ></textarea>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingPrompt ? "Update" : "Add"} AI Prompt
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}