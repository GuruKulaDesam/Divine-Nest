<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { aiPrompts } from '$lib/stores/aiPrompts';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let promptId = $page.params.id;
  let prompt = null;
  let editMode = false;
  let isSubmitting = false;
  let errors = {};

  let formData = {
    type: 'Alert', // 'Alert' | 'Notes' | 'Checklist' | 'Query'
    category: 'SMS', // 'SMS' | 'Email' | 'Phone' | 'Calendar Schedule' | 'WhatsApp' | 'Alarm'
    purpose: '',
    trigger_time: '',
    trigger_location_lat: null,
    trigger_location_lng: null,
    trigger_radius_meters: 100,
    frequency: 'Daily', // 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Custom'
    sound_type: 'Positive', // 'Positive' | 'Negative' | 'Alarming' | 'Pleasant'
    volume_level: 'Medium', // 'Low' | 'Medium' | 'High' | 'Adaptive'
    conditions: '',
    applicable_roles: []
  };

  // Available options
  const typeOptions = ['Alert', 'Notes', 'Checklist', 'Query'];
  const categoryOptions = ['SMS', 'Email', 'Phone', 'Calendar Schedule', 'WhatsApp', 'Alarm'];
  const frequencyOptions = ['Once', 'Daily', 'Weekly', 'Monthly', 'Custom'];
  const soundTypeOptions = ['Positive', 'Negative', 'Alarming', 'Pleasant'];
  const volumeLevelOptions = ['Low', 'Medium', 'High', 'Adaptive'];
  const roleOptions = ['Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin'];

  onMount(() => {
    loadPrompt();
  });

  function loadPrompt() {
    prompt = aiPrompts.getAIPrompt(promptId);
    if (prompt) {
      formData = { ...prompt };
    } else {
      alert('AI Prompt not found');
      goto('/ai-prompts/dashboard');
    }
  }

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('edit') || lowerCommand.includes('change') || lowerCommand.includes('modify')) {
      editMode = true;
    } else if (lowerCommand.includes('save') || lowerCommand.includes('update')) {
      handleSubmit();
    } else if (lowerCommand.includes('cancel') || lowerCommand.includes('back')) {
      editMode = false;
      loadPrompt(); // Reset changes
    } else if (lowerCommand.includes('delete') || lowerCommand.includes('remove')) {
      if (confirm('Are you sure you want to delete this AI prompt?')) {
        aiPrompts.deleteAIPrompt(promptId);
        goto('/ai-prompts/dashboard');
      }
    } else if (lowerCommand.includes('time') || lowerCommand.includes('schedule')) {
      // Extract time from voice command
      const timeMatch = command.match(/(\d{1,2}):(\d{2})|(\d{1,2})\s*(am|pm)/i);
      if (timeMatch) {
        editMode = true;
        if (timeMatch[1] && timeMatch[2]) {
          formData.trigger_time = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
        }
      }
    }
  }

  function validateForm() {
    errors = {};

    if (!formData.purpose.trim()) {
      errors.purpose = 'Purpose is required';
    }

    if (!formData.trigger_time && formData.type === 'Alert') {
      errors.trigger_time = 'Trigger time is required for alerts';
    }

    if (formData.applicable_roles.length === 0) {
      errors.applicable_roles = 'At least one role must be selected';
    }

    if (formData.trigger_location_lat && !formData.trigger_location_lng) {
      errors.trigger_location_lng = 'Longitude is required when latitude is provided';
    }

    if (!formData.trigger_location_lat && formData.trigger_location_lng) {
      errors.trigger_location_lat = 'Latitude is required when longitude is provided';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;

    try {
      // Clean up location data
      if (!formData.trigger_location_lat) {
        formData.trigger_location_lat = null;
        formData.trigger_location_lng = null;
        formData.trigger_radius_meters = 100;
      }

      aiPrompts.updateAIPrompt(promptId, formData);
      editMode = false;

      // Success message
      alert('AI Prompt updated successfully!');

    } catch (error) {
      console.error('Error updating AI prompt:', error);
      alert('Failed to update AI prompt. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function toggleRole(role) {
    if (formData.applicable_roles.includes(role)) {
      formData.applicable_roles = formData.applicable_roles.filter(r => r !== role);
    } else {
      formData.applicable_roles = [...formData.applicable_roles, role];
    }
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          editMode = true;
          formData.trigger_location_lat = position.coords.latitude;
          formData.trigger_location_lng = position.coords.longitude;
          formData.trigger_radius_meters = 100;
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get current location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  function deletePrompt() {
    if (confirm('Are you sure you want to delete this AI prompt? This action cannot be undone.')) {
      aiPrompts.deleteAIPrompt(promptId);
      goto('/ai-prompts/dashboard');
    }
  }
</script>

<svelte:head>
  <title>Update AI Prompt - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-4xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {editMode ? 'Edit' : 'View'} AI Prompt
      </h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">
        {editMode ? 'Modify the AI prompt settings' : 'Review AI prompt details'}
      </p>
    </div>

    <div class="flex gap-3">
      <VoiceInput
        onResult={handleVoiceCommand}
        placeholder="Say 'edit mode' or 'save changes'"
      />

      <div class="flex gap-2">
        {#if editMode}
          <button
            class="btn btn-outline"
            on:click={() => {
              editMode = false;
              loadPrompt(); // Reset changes
            }}
          >
            Cancel
          </button>
          <button
            class="btn btn-primary"
            on:click={handleSubmit}
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading loading-spinner loading-sm"></span>
              Saving...
            {:else}
              Save Changes
            {/if}
          </button>
        {:else}
          <button
            class="btn btn-outline"
            on:click={() => goto('/ai-prompts/dashboard')}
          >
            Back to Dashboard
          </button>
          <button
            class="btn btn-primary"
            on:click={() => editMode = true}
          >
            Edit Prompt
          </button>
        {/if}
      </div>
    </div>
  </div>

  {#if prompt}
    <!-- View/Edit Form -->
    <div class="card bg-white dark:bg-gray-800 shadow-lg">
      <div class="card-body">
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Type and Category Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label for="type" class="label">
                <span class="label-text font-medium">Prompt Type</span>
              </label>
              {#if editMode}
                <select
                  id="type"
                  bind:value={formData.type}
                  class="select select-bordered w-full"
                  required
                >
                  {#each typeOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="badge badge-primary">{formData.type}</span>
                </div>
              {/if}
            </div>

            <div class="form-control">
              <label for="category" class="label">
                <span class="label-text font-medium">Category</span>
              </label>
              {#if editMode}
                <select
                  id="category"
                  bind:value={formData.category}
                  class="select select-bordered w-full"
                  required
                >
                  {#each categoryOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="badge badge-secondary">{formData.category}</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Purpose -->
          <div class="form-control">
            <label for="purpose" class="label">
              <span class="label-text font-medium">Purpose *</span>
            </label>
            {#if editMode}
              <input
                id="purpose"
                type="text"
                bind:value={formData.purpose}
                class="input input-bordered w-full"
                class:input-error={errors.purpose}
                required
              />
              {#if errors.purpose}
                <span class="text-error text-sm mt-1">{errors.purpose}</span>
              {/if}
            {:else}
              <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <span class="text-gray-900 dark:text-white">{formData.purpose}</span>
              </div>
            {/if}
          </div>

          <!-- Frequency and Sound Settings Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="form-control">
              <label for="frequency" class="label">
                <span class="label-text font-medium">Frequency</span>
              </label>
              {#if editMode}
                <select
                  id="frequency"
                  bind:value={formData.frequency}
                  class="select select-bordered w-full"
                >
                  {#each frequencyOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="badge badge-outline">{formData.frequency}</span>
                </div>
              {/if}
            </div>

            <div class="form-control">
              <label for="sound_type" class="label">
                <span class="label-text font-medium">Sound Type</span>
              </label>
              {#if editMode}
                <select
                  id="sound_type"
                  bind:value={formData.sound_type}
                  class="select select-bordered w-full"
                >
                  {#each soundTypeOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-sm">{formData.sound_type}</span>
                </div>
              {/if}
            </div>

            <div class="form-control">
              <label for="volume_level" class="label">
                <span class="label-text font-medium">Volume Level</span>
              </label>
              {#if editMode}
                <select
                  id="volume_level"
                  bind:value={formData.volume_level}
                  class="select select-bordered w-full"
                >
                  {#each volumeLevelOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-sm">{formData.volume_level}</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Trigger Time -->
          <div class="form-control">
            <label for="trigger_time" class="label">
              <span class="label-text font-medium">Trigger Time {#if formData.type === 'Alert'}*{/if}</span>
            </label>
            {#if editMode}
              <input
                id="trigger_time"
                type="time"
                bind:value={formData.trigger_time}
                class="input input-bordered w-full md:w-auto"
                class:input-error={errors.trigger_time}
              />
              {#if errors.trigger_time}
                <span class="text-error text-sm mt-1">{errors.trigger_time}</span>
              {/if}
            {:else}
              <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <span class="text-gray-900 dark:text-white">{formData.trigger_time || 'Not set'}</span>
              </div>
            {/if}
          </div>

          <!-- Location Settings -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium">Location Settings</h3>
              {#if editMode}
                <button
                  type="button"
                  class="btn btn-outline btn-sm"
                  on:click={getCurrentLocation}
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Use Current Location
                </button>
              {/if}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="form-control">
                <label for="latitude" class="label">
                  <span class="label-text">Latitude</span>
                </label>
                {#if editMode}
                  <input
                    id="latitude"
                    type="number"
                    step="0.000001"
                    bind:value={formData.trigger_location_lat}
                    class="input input-bordered w-full"
                    class:input-error={errors.trigger_location_lat}
                  />
                  {#if errors.trigger_location_lat}
                    <span class="text-error text-sm mt-1">{errors.trigger_location_lat}</span>
                  {/if}
                {:else}
                  <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <span class="text-gray-900 dark:text-white">{formData.trigger_location_lat || 'Not set'}</span>
                  </div>
                {/if}
              </div>

              <div class="form-control">
                <label for="longitude" class="label">
                  <span class="label-text">Longitude</span>
                </label>
                {#if editMode}
                  <input
                    id="longitude"
                    type="number"
                    step="0.000001"
                    bind:value={formData.trigger_location_lng}
                    class="input input-bordered w-full"
                    class:input-error={errors.trigger_location_lng}
                  />
                  {#if errors.trigger_location_lng}
                    <span class="text-error text-sm mt-1">{errors.trigger_location_lng}</span>
                  {/if}
                {:else}
                  <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <span class="text-gray-900 dark:text-white">{formData.trigger_location_lng || 'Not set'}</span>
                  </div>
                {/if}
              </div>

              <div class="form-control">
                <label for="radius" class="label">
                  <span class="label-text">Radius (meters)</span>
                </label>
                {#if editMode}
                  <input
                    id="radius"
                    type="number"
                    bind:value={formData.trigger_radius_meters}
                    class="input input-bordered w-full"
                    min="10"
                    max="10000"
                  />
                {:else}
                  <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <span class="text-gray-900 dark:text-white">{formData.trigger_radius_meters || 'Not set'}</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Conditions -->
          <div class="form-control">
            <label for="conditions" class="label">
              <span class="label-text font-medium">Conditions</span>
            </label>
            {#if editMode}
              <textarea
                id="conditions"
                bind:value={formData.conditions}
                class="textarea textarea-bordered w-full"
                rows="3"
              ></textarea>
            {:else}
              <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <span class="text-gray-900 dark:text-white">{formData.conditions || 'No conditions set'}</span>
              </div>
            {/if}
          </div>

          <!-- Applicable Roles -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Applicable Roles *</span>
            </label>
            {#if editMode}
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                {#each roleOptions as role}
                  <label class="cursor-pointer flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.applicable_roles.includes(role)}
                      on:change={() => toggleRole(role)}
                      class="checkbox checkbox-primary"
                    />
                    <span class="text-sm">{role}</span>
                  </label>
                {/each}
              </div>
              {#if errors.applicable_roles}
                <span class="text-error text-sm mt-1">{errors.applicable_roles}</span>
              {/if}
            {:else}
              <div class="flex flex-wrap gap-2">
                {#each formData.applicable_roles as role}
                  <span class="badge badge-outline badge-primary">{role}</span>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Metadata -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <strong>Created:</strong> {new Date(prompt.created_at).toLocaleString()}
              </div>
              <div>
                <strong>Last Updated:</strong> {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          <!-- Action Buttons for Edit Mode -->
          {#if editMode}
            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <button
                type="submit"
                class="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                  Saving...
                {:else}
                  Save Changes
                {/if}
              </button>

              <button
                type="button"
                class="btn btn-outline btn-error"
                on:click={deletePrompt}
              >
                Delete Prompt
              </button>
            </div>
          {/if}
        </form>
      </div>
    </div>

    <!-- Discussion Forum -->
    <div class="mt-8">
      <DiscussionForum tableName="ai_prompts" recordId={promptId} />
    </div>
  {:else}
    <div class="card bg-white dark:bg-gray-800 shadow-lg">
      <div class="card-body text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">AI Prompt Not Found</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">The requested AI prompt could not be found.</p>
        <button
          class="btn btn-primary"
          on:click={() => goto('/ai-prompts/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  {/if}
</div>