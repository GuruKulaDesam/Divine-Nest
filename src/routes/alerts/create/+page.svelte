<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { alerts, alertsDiscussions as discussions, alertsVoiceCommands as voiceCommands } from '$lib/stores/alerts';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  let currentStep = 1;
  let totalSteps = 4;

  // Form data
  let formData = {
    type: 'Reminder',
    title: '',
    message: '',
    priority: 'Medium',
    status: 'Active',
    trigger_date: new Date().toISOString().split('T')[0],
    trigger_time: '09:00',
    repeat_interval: '',
    location_trigger: '',
    alert_location_lat: null,
    alert_location_lng: null,
    alert_radius_meters: 100,
    sound_enabled: true,
    vibration_enabled: true,
    applicable_roles: [$userProfile.role]
  };

  let voiceResult = '';
  let isSubmitting = false;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    // Parse voice commands to fill form
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('create alert') || lowerResult.includes('add alert')) {
      // Extract alert title
      const titleMatch = result.match(/(?:create|add)\s+alert\s+(.+)/i);
      if (titleMatch) {
        formData.title = titleMatch[1].trim();
      }
    }

    if (lowerResult.includes('remind') || lowerResult.includes('at')) {
      // Extract time
      const timeMatch = result.match(/(\d{1,2}:\d{2}|\d{1,2}\s*(?:am|pm))/i);
      if (timeMatch) {
        formData.trigger_time = timeMatch[1];
      }
    }

    if (lowerResult.includes('tomorrow') || lowerResult.includes('today')) {
      // Set date
      const today = new Date();
      if (lowerResult.includes('tomorrow')) {
        today.setDate(today.getDate() + 1);
      }
      formData.trigger_date = today.toISOString().split('T')[0];
    }
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep++;
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
    }
  }

  function goToStep(step) {
    currentStep = step;
  }

  async function submitAlert() {
    if (!formData.title.trim()) {
      alert('Please enter an alert title');
      return;
    }

    isSubmitting = true;

    try {
      const newAlert = {
        ...formData,
        id: `alert_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add to alerts store
      alerts.update(current => [...current, newAlert]);

      // Add creation discussion entry
      const discussionEntry = {
        id: `discussion_${Date.now()}`,
        table_name: 'alerts',
        record_id: newAlert.id,
        author: $userProfile.name,
        author_role: $userProfile.role,
        message: `Alert created: ${newAlert.title}`,
        created_at: new Date().toISOString()
      };

      discussions.update(current => [...current, discussionEntry]);

      // Navigate back to dashboard
      goto('/alerts/dashboard');

    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          formData.alert_location_lat = position.coords.latitude;
          formData.alert_location_lng = position.coords.longitude;
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }

  function resetForm() {
    formData = {
      type: 'Reminder',
      title: '',
      message: '',
      priority: 'Medium',
      status: 'Active',
      trigger_date: new Date().toISOString().split('T')[0],
      trigger_time: '09:00',
      repeat_interval: '',
      location_trigger: '',
      alert_location_lat: null,
      alert_location_lng: null,
      alert_radius_meters: 100,
      sound_enabled: true,
      vibration_enabled: true,
      applicable_roles: [$userProfile.role]
    };
    currentStep = 1;
  }
</script>

<svelte:head>
  <title>Create Alert - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto">

    <Breadcrumb currentPage="Create Alert" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Create New Alert</h1>
        <p class="text-base-content/70">Set up alerts and reminders with smart notifications</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create alert to call mom at 3pm'" />
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info mb-4">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Progress Indicator -->
    <div class="flex justify-center mb-8">
      <ul class="steps steps-horizontal w-full max-w-2xl">
        <li class="step {currentStep >= 1 ? 'step-primary' : ''}">Basic Info</li>
        <li class="step {currentStep >= 2 ? 'step-primary' : ''}">Schedule</li>
        <li class="step {currentStep >= 3 ? 'step-primary' : ''}">Settings</li>
        <li class="step {currentStep >= 4 ? 'step-primary' : ''}">Review</li>
      </ul>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">

        <!-- Step 1: Basic Information -->
        {#if currentStep === 1}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Basic Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Alert Type</span>
                </label>
                <select class="select select-bordered" bind:value={formData.type}>
                  <option value="Reminder">Reminder</option>
                  <option value="Alarm">Alarm</option>
                  <option value="Notification">Notification</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Priority</span>
                </label>
                <select class="select select-bordered" bind:value={formData.priority}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Title</span>
              </label>
              <input type="text" placeholder="Alert title..." class="input input-bordered" bind:value={formData.title} />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Message (Optional)</span>
              </label>
              <textarea placeholder="Additional details..." class="textarea textarea-bordered h-24" bind:value={formData.message}></textarea>
            </div>
          </div>
        {/if}

        <!-- Step 2: Schedule -->
        {#if currentStep === 2}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Schedule</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Trigger Date</span>
                </label>
                <input type="date" class="input input-bordered" bind:value={formData.trigger_date} />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Trigger Time</span>
                </label>
                <input type="time" class="input input-bordered" bind:value={formData.trigger_time} />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Repeat Interval (Optional)</span>
              </label>
              <select class="select select-bordered" bind:value={formData.repeat_interval}>
                <option value="">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="weekdays">Weekdays Only</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Location Trigger (Optional)</span>
              </label>
              <input type="text" placeholder="e.g., Near grocery store, At home" class="input input-bordered" bind:value={formData.location_trigger} />
            </div>
          </div>
        {/if}

        <!-- Step 3: Settings -->
        {#if currentStep === 3}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Alert Settings</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Sound Enabled</span>
                  <input type="checkbox" class="toggle toggle-primary" bind:checked={formData.sound_enabled} />
                </label>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Vibration Enabled</span>
                  <input type="checkbox" class="toggle toggle-primary" bind:checked={formData.vibration_enabled} />
                </label>
              </div>
            </div>

            {#if formData.location_trigger}
              <div class="divider">Location Settings</div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Location-based Alert</span>
                </label>
                <div class="flex gap-2">
                  <button class="btn btn-outline" on:click={getCurrentLocation}>
                    <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                    Use Current Location
                  </button>
                  {#if formData.alert_location_lat && formData.alert_location_lng}
                    <span class="text-sm text-success">Location set!</span>
                  {/if}
                </div>
              </div>

              {#if formData.alert_location_lat && formData.alert_location_lng}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Alert Radius (meters)</span>
                  </label>
                  <input type="number" placeholder="100" class="input input-bordered" bind:value={formData.alert_radius_meters} min="50" max="5000" />
                </div>
              {/if}
            {/if}
          </div>
        {/if}

        <!-- Step 4: Review & Submit -->
        {#if currentStep === 4}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Review & Submit</h3>

            <div class="bg-base-200 p-4 rounded-lg space-y-3">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Type:</strong> {formData.type}</div>
                <div><strong>Priority:</strong> {formData.priority}</div>
                <div><strong>Status:</strong> {formData.status}</div>
                <div><strong>Trigger:</strong> {formData.trigger_date} at {formData.trigger_time}</div>
                <div><strong>Repeat:</strong> {formData.repeat_interval || 'None'}</div>
                <div><strong>Location:</strong> {formData.location_trigger || 'Not set'}</div>
              </div>

              <div><strong>Title:</strong> {formData.title || 'Not specified'}</div>
              <div><strong>Message:</strong> {formData.message || 'Not specified'}</div>

              <div class="flex gap-4 mt-3">
                <div><strong>Sound:</strong> {formData.sound_enabled ? 'Enabled' : 'Disabled'}</div>
                <div><strong>Vibration:</strong> {formData.vibration_enabled ? 'Enabled' : 'Disabled'}</div>
              </div>

              {#if formData.alert_location_lat}
                <div class="mt-3 p-3 bg-info/10 rounded">
                  <strong>Location Alert Active:</strong> Will trigger within {formData.alert_radius_meters}m of specified location
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button
            class="btn btn-outline"
            disabled={currentStep === 1}
            on:click={prevStep}
          >
            <Icon icon="heroicons:arrow-left" class="w-4 h-4" />
            Previous
          </button>

          <div class="flex gap-2">
            {#if currentStep < totalSteps}
              <button class="btn btn-primary" on:click={nextStep}>
                Next
                <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
              </button>
            {:else}
              <button
                class="btn btn-success"
                disabled={isSubmitting || !formData.title.trim()}
                on:click={submitAlert}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                {/if}
                Create Alert
              </button>
            {/if}
          </div>
        </div>

        <!-- Step Indicators -->
        <div class="flex justify-center mt-4">
          <div class="text-sm text-base-content/70">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

      </div>
    </div>

  </div>
</div>