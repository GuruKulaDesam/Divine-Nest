<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { activities, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  let currentStep = 1;
  let totalSteps = 4;

  // Form data
  let formData = {
    type: 'Physical',
    category: 'Exercise',
    sub_category: '',
    description: '',
    participant: $userProfile.name,
    frequency: 'Daily',
    time_of_day: 'Morning',
    location: '',
    alert_enabled: true,
    alert_time: '',
    alert_location_lat: null,
    alert_location_lng: null,
    alert_radius_meters: 100,
    alert_message: '',
    alert_type: 'Reminder',
    priority: 'Medium',
    applicable_roles: [$userProfile.role]
  };

  let voiceResult = '';
  let isSubmitting = false;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    // Parse voice commands to fill form
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('create activity') || lowerResult.includes('add activity')) {
      // Extract activity description
      const descMatch = result.match(/(?:create|add)\s+activity\s+(.+)/i);
      if (descMatch) {
        formData.description = descMatch[1].trim();
      }
    }

    if (lowerResult.includes('for') || lowerResult.includes('with')) {
      // Extract participant
      const participantMatch = result.match(/(?:for|with)\s+(\w+)/i);
      if (participantMatch) {
        formData.participant = participantMatch[1];
      }
    }

    if (lowerResult.includes('daily') || lowerResult.includes('weekly') || lowerResult.includes('monthly')) {
      // Extract frequency
      if (lowerResult.includes('daily')) formData.frequency = 'Daily';
      else if (lowerResult.includes('weekly')) formData.frequency = 'Weekly';
      else if (lowerResult.includes('monthly')) formData.frequency = 'Monthly';
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

  async function submitActivity() {
    if (!formData.description.trim()) {
      alert('Please enter an activity description');
      return;
    }

    isSubmitting = true;

    try {
      const newActivity = {
        ...formData,
        id: `activity_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add to activities store
      activities.update(current => [...current, newActivity]);

      // Add creation discussion entry
      const discussionEntry = {
        id: `discussion_${Date.now()}`,
        table_name: 'activities',
        record_id: newActivity.id,
        author: $userProfile.name,
        author_role: $userProfile.role,
        message: `Activity created: ${newActivity.description}`,
        created_at: new Date().toISOString()
      };

      discussions.update(current => [...current, discussionEntry]);

      // Navigate back to dashboard
      goto('/activities/dashboard');

    } catch (error) {
      console.error('Error creating activity:', error);
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
      type: 'Physical',
      category: 'Exercise',
      sub_category: '',
      description: '',
      participant: $userProfile.name,
      frequency: 'Daily',
      time_of_day: 'Morning',
      location: '',
      alert_enabled: true,
      alert_time: '',
      alert_location_lat: null,
      alert_location_lng: null,
      alert_radius_meters: 100,
      alert_message: '',
      alert_type: 'Reminder',
      priority: 'Medium',
      applicable_roles: [$userProfile.role]
    };
    currentStep = 1;
  }
</script>

<svelte:head>
  <title>Create Activity - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto">

    <Breadcrumb currentPage="Create Activity" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Create New Activity</h1>
        <p class="text-base-content/70">Set up an activity with smart reminders and alerts</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create activity to exercise daily'" />
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
        <li class="step {currentStep >= 3 ? 'step-primary' : ''}">Alerts</li>
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
                  <span class="label-text">Activity Type</span>
                </label>
                <select class="select select-bordered" bind:value={formData.type}>
                  <option value="Physical">Physical</option>
                  <option value="Mental">Mental</option>
                  <option value="Social">Social</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Category</span>
                </label>
                <select class="select select-bordered" bind:value={formData.category}>
                  <option value="Exercise">Exercise</option>
                  <option value="Reading">Reading</option>
                  <option value="Meditation">Meditation</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Games">Games</option>
                  <option value="Music">Music</option>
                  <option value="Art">Art</option>
                  <option value="Social">Social</option>
                  <option value="Learning">Learning</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Sub Category (Optional)</span>
              </label>
              <input type="text" placeholder="e.g., Yoga, Piano, Painting" class="input input-bordered" bind:value={formData.sub_category} />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Description</span>
              </label>
              <textarea placeholder="Describe the activity..." class="textarea textarea-bordered h-24" bind:value={formData.description}></textarea>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Participant</span>
              </label>
              <input type="text" placeholder="Who will participate?" class="input input-bordered" bind:value={formData.participant} />
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
                  <span class="label-text">Frequency</span>
                </label>
                <select class="select select-bordered" bind:value={formData.frequency}>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Ad-Hoc">Ad-Hoc</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Time of Day</span>
                </label>
                <select class="select select-bordered" bind:value={formData.time_of_day}>
                  <option value="Early Morning">Early Morning (5-7 AM)</option>
                  <option value="Morning">Morning (7-11 AM)</option>
                  <option value="Afternoon">Afternoon (11 AM-3 PM)</option>
                  <option value="Evening">Evening (3-7 PM)</option>
                  <option value="Night">Night (7-11 PM)</option>
                  <option value="Late Night">Late Night (11 PM-1 AM)</option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Location (Optional)</span>
              </label>
              <input type="text" placeholder="Where will this activity take place?" class="input input-bordered" bind:value={formData.location} />
            </div>
          </div>
        {/if}

        <!-- Step 3: Alerts & Notifications -->
        {#if currentStep === 3}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Alerts & Notifications</h3>

            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Enable Alerts</span>
                <input type="checkbox" class="toggle toggle-primary" bind:checked={formData.alert_enabled} />
              </label>
            </div>

            {#if formData.alert_enabled}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Alert Time</span>
                  </label>
                  <input type="time" class="input input-bordered" bind:value={formData.alert_time} />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Alert Type</span>
                  </label>
                  <select class="select select-bordered" bind:value={formData.alert_type}>
                    <option value="Reminder">Reminder</option>
                    <option value="Alarm">Alarm</option>
                    <option value="Notification">Notification</option>
                  </select>
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Alert Message (Optional)</span>
                </label>
                <input type="text" placeholder="Custom alert message" class="input input-bordered" bind:value={formData.alert_message} />
              </div>

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
        {/if}

        <!-- Step 4: Review & Submit -->
        {#if currentStep === 4}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Review & Submit</h3>

            <div class="bg-base-200 p-4 rounded-lg space-y-3">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Type:</strong> {formData.type}</div>
                <div><strong>Category:</strong> {formData.category}</div>
                <div><strong>Frequency:</strong> {formData.frequency}</div>
                <div><strong>Time:</strong> {formData.time_of_day}</div>
                <div><strong>Participant:</strong> {formData.participant}</div>
                <div><strong>Priority:</strong> {formData.priority}</div>
              </div>

              <div><strong>Description:</strong> {formData.description || 'Not specified'}</div>
              <div><strong>Location:</strong> {formData.location || 'Not specified'}</div>

              {#if formData.alert_enabled}
                <div class="mt-3 p-3 bg-info/10 rounded">
                  <strong>Alerts Enabled:</strong>
                  <div class="text-sm mt-1">
                    Time: {formData.alert_time || 'Not set'} |
                    Type: {formData.alert_type} |
                    Message: {formData.alert_message || 'Default'}
                    {#if formData.alert_location_lat}
                      | Location-based alert active
                    {/if}
                  </div>
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
                disabled={isSubmitting || !formData.description.trim()}
                on:click={submitActivity}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                {/if}
                Create Activity
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