<script>
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  // Form data structure for AI prompts
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

  let errors = {};
  let isSubmitting = false;
  let voiceMode = false;

  // Available options
  const typeOptions = ['Alert', 'Notes', 'Checklist', 'Query'];
  const categoryOptions = ['SMS', 'Email', 'Phone', 'Calendar Schedule', 'WhatsApp', 'Alarm'];
  const frequencyOptions = ['Once', 'Daily', 'Weekly', 'Monthly', 'Custom'];
  const soundTypeOptions = ['Positive', 'Negative', 'Alarming', 'Pleasant'];
  const volumeLevelOptions = ['Low', 'Medium', 'High', 'Adaptive'];
  const roleOptions = ['Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin'];

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();
    voiceMode = true;

    // Parse voice commands for different prompt types
    if (lowerCommand.includes('remind') || lowerCommand.includes('alert')) {
      formData.type = 'Alert';
      if (lowerCommand.includes('sms')) formData.category = 'SMS';
      else if (lowerCommand.includes('email')) formData.category = 'Email';
      else if (lowerCommand.includes('phone')) formData.category = 'Phone';
      else if (lowerCommand.includes('whatsapp')) formData.category = 'WhatsApp';
      else if (lowerCommand.includes('alarm')) formData.category = 'Alarm';
      else formData.category = 'SMS'; // default

      // Extract time
      const timeMatch = command.match(/(\d{1,2}):(\d{2})|(\d{1,2})\s*(am|pm)/i);
      if (timeMatch) {
        if (timeMatch[1] && timeMatch[2]) {
          formData.trigger_time = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
        }
      }

      // Extract purpose
      if (lowerCommand.includes('prayer')) {
        formData.purpose = 'Prayer reminder';
        formData.frequency = 'Daily';
        formData.trigger_time = formData.trigger_time || '06:00';
      } else if (lowerCommand.includes('medicine') || lowerCommand.includes('medication')) {
        formData.purpose = 'Medicine reminder';
        formData.frequency = 'Daily';
        formData.sound_type = 'Alarming';
        formData.volume_level = 'High';
      } else if (lowerCommand.includes('meeting')) {
        formData.purpose = 'Family meeting reminder';
        formData.frequency = 'Weekly';
        formData.trigger_time = formData.trigger_time || '19:00';
      }

    } else if (lowerCommand.includes('note') || lowerCommand.includes('journal')) {
      formData.type = 'Notes';
      formData.category = 'WhatsApp';
      formData.purpose = 'Daily notes reminder';
      formData.frequency = 'Daily';
      formData.trigger_time = '20:00';
      formData.sound_type = 'Pleasant';

    } else if (lowerCommand.includes('checklist') || lowerCommand.includes('list')) {
      formData.type = 'Checklist';
      formData.category = 'Alarm';
      formData.purpose = 'Daily checklist reminder';
      formData.frequency = 'Daily';
      formData.trigger_time = '18:00';
      formData.sound_type = 'Positive';

    } else if (lowerCommand.includes('query') || lowerCommand.includes('ask')) {
      formData.type = 'Query';
      formData.category = 'Email';
      formData.purpose = 'Weekly query reminder';
      formData.frequency = 'Weekly';
      formData.trigger_time = '09:00';
    }

    // Set default roles
    formData.applicable_roles = ['Father', 'Mother'];

    // Auto-fill conditions based on context
    if (lowerCommand.includes('morning')) {
      formData.conditions = 'Morning routine';
      formData.trigger_time = formData.trigger_time || '06:00';
    } else if (lowerCommand.includes('evening')) {
      formData.conditions = 'Evening routine';
      formData.trigger_time = formData.trigger_time || '18:00';
    } else if (lowerCommand.includes('night')) {
      formData.conditions = 'Before bedtime';
      formData.trigger_time = formData.trigger_time || '21:00';
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

      const newPrompt = aiPrompts.addAIPrompt(formData);

      // Success message
      alert('AI Prompt created successfully!');

      // Navigate to update page for further editing
      goto(`/ai-prompts/update/${newPrompt.id}`);

    } catch (error) {
      console.error('Error creating AI prompt:', error);
      alert('Failed to create AI prompt. Please try again.');
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
          formData.trigger_location_lat = position.coords.latitude;
          formData.trigger_location_lng = position.coords.longitude;
          formData.trigger_radius_meters = 100; // Default 100 meters
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
</script>

<svelte:head>
  <title>Create AI Prompt - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-4xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Create AI Prompt</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">Set up automated intelligent reminders</p>
    </div>

    <div class="flex gap-3">
      <VoiceInput
        onResult={handleVoiceCommand}
        placeholder="Say 'create prayer reminder at 6am' or 'medicine alert daily'"
      />
      <button
        class="btn btn-outline"
        on:click={() => goto('/ai-prompts/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  </div>

  {#if voiceMode}
    <div class="alert alert-info mb-6">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Voice command detected! Form has been pre-filled. Please review and adjust as needed.</span>
    </div>
  {/if}

  <!-- Form -->
  <div class="card bg-white dark:bg-gray-800 shadow-lg">
    <div class="card-body">
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <!-- Type and Category Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label for="type" class="label">
              <span class="label-text font-medium">Prompt Type</span>
            </label>
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
          </div>

          <div class="form-control">
            <label for="category" class="label">
              <span class="label-text font-medium">Category</span>
            </label>
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
          </div>
        </div>

        <!-- Purpose -->
        <div class="form-control">
          <label for="purpose" class="label">
            <span class="label-text font-medium">Purpose *</span>
          </label>
          <input
            id="purpose"
            type="text"
            bind:value={formData.purpose}
            class="input input-bordered w-full"
            placeholder="e.g., Morning prayer reminder, Medicine alert, Family meeting"
            required
          />
          {#if errors.purpose}
            <span class="text-error text-sm mt-1">{errors.purpose}</span>
          {/if}
        </div>

        <!-- Frequency and Sound Settings Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="form-control">
            <label for="frequency" class="label">
              <span class="label-text font-medium">Frequency</span>
            </label>
            <select
              id="frequency"
              bind:value={formData.frequency}
              class="select select-bordered w-full"
            >
              {#each frequencyOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <div class="form-control">
            <label for="sound_type" class="label">
              <span class="label-text font-medium">Sound Type</span>
            </label>
            <select
              id="sound_type"
              bind:value={formData.sound_type}
              class="select select-bordered w-full"
            >
              {#each soundTypeOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <div class="form-control">
            <label for="volume_level" class="label">
              <span class="label-text font-medium">Volume Level</span>
            </label>
            <select
              id="volume_level"
              bind:value={formData.volume_level}
              class="select select-bordered w-full"
            >
              {#each volumeLevelOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Trigger Time -->
        <div class="form-control">
          <label for="trigger_time" class="label">
            <span class="label-text font-medium">Trigger Time {#if formData.type === 'Alert'}*{/if}</span>
          </label>
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
        </div>

        <!-- Location Settings -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Location Settings (Optional)</h3>
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
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="form-control">
              <label for="latitude" class="label">
                <span class="label-text">Latitude</span>
              </label>
              <input
                id="latitude"
                type="number"
                step="0.000001"
                bind:value={formData.trigger_location_lat}
                class="input input-bordered w-full"
                placeholder="e.g., 10.8505"
                class:input-error={errors.trigger_location_lat}
              />
              {#if errors.trigger_location_lat}
                <span class="text-error text-sm mt-1">{errors.trigger_location_lat}</span>
              {/if}
            </div>

            <div class="form-control">
              <label for="longitude" class="label">
                <span class="label-text">Longitude</span>
              </label>
              <input
                id="longitude"
                type="number"
                step="0.000001"
                bind:value={formData.trigger_location_lng}
                class="input input-bordered w-full"
                placeholder="e.g., 76.2044"
                class:input-error={errors.trigger_location_lng}
              />
              {#if errors.trigger_location_lng}
                <span class="text-error text-sm mt-1">{errors.trigger_location_lng}</span>
              {/if}
            </div>

            <div class="form-control">
              <label for="radius" class="label">
                <span class="label-text">Radius (meters)</span>
              </label>
              <input
                id="radius"
                type="number"
                bind:value={formData.trigger_radius_meters}
                class="input input-bordered w-full"
                placeholder="100"
                min="10"
                max="10000"
              />
            </div>
          </div>
        </div>

        <!-- Conditions -->
        <div class="form-control">
          <label for="conditions" class="label">
            <span class="label-text font-medium">Conditions (Optional)</span>
          </label>
          <textarea
            id="conditions"
            bind:value={formData.conditions}
            class="textarea textarea-bordered w-full"
            placeholder="e.g., Before sunrise, After dinner, School days only"
            rows="3"
          ></textarea>
        </div>

        <!-- Applicable Roles -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Applicable Roles *</span>
          </label>
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
        </div>

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <button
            type="submit"
            class="btn btn-primary flex-1"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading loading-spinner loading-sm"></span>
              Creating...
            {:else}
              Create AI Prompt
            {/if}
          </button>

          <button
            type="button"
            class="btn btn-outline"
            on:click={() => goto('/ai-prompts/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Discussion Forum -->
  <div class="mt-8">
    <DiscussionForum tableName="ai_prompts" recordId="create_form" />
  </div>
</div>