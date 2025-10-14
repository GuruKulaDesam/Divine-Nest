<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { todos as tasks, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  const dispatch = createEventDispatcher();

  let currentStep = 1;
  let totalSteps = 4;

  // Form data
  let formData = {
    type: 'Duty',
    category: 'Household',
    sub_category: '',
    description: '',
    assigned_to: $userProfile.name,
    mandatory: false,
    frequency: 'Ad-Hoc',
    time_of_day: 'Morning',
    location: '',
    due_date: '',
    alert_enabled: true,
    alert_time: '',
    alert_location_lat: null,
    alert_location_lng: null,
    alert_radius_meters: 100,
    alert_message: '',
    alert_type: 'Alarm',
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

    if (lowerResult.includes('create task') || lowerResult.includes('add task')) {
      // Extract task description
      const descMatch = result.match(/(?:create|add)\s+task\s+(.+)/i);
      if (descMatch) {
        formData.description = descMatch[1].trim();
      }
    }

    if (lowerResult.includes('due') || lowerResult.includes('by')) {
      // Extract due date
      const dateMatch = result.match(/(?:due|by)\s+(\w+\s+\d+|\d+\/\d+\/\d+)/i);
      if (dateMatch) {
        formData.due_date = dateMatch[1];
      }
    }

    if (lowerResult.includes('assign to')) {
      // Extract assignee
      const assignMatch = result.match(/assign\s+to\s+(\w+)/i);
      if (assignMatch) {
        formData.assigned_to = assignMatch[1];
      }
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

  async function submitTask() {
    isSubmitting = true;

    try {
      // Generate unique ID
      const newTask = {
        ...formData,
        id: `task_${Date.now()}`,
        status: 'Pending',
        created_by: $userProfile.name,
        created_at: new Date().toISOString()
      };

      // Add to tasks store
      tasks.update(currentTasks => [...currentTasks, newTask]);

      // Navigate back to dashboard
      goto('/tasks/dashboard');

    } catch (error) {
      console.error('Error creating task:', error);
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
</script>

<svelte:head>
  <title>Create Task - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Create New Task</h1>
        <p class="text-base-content/70">Set up a task with smart reminders and alerts</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create task to buy groceries by tomorrow'" />
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
      <ul class="steps steps-horizontal">
        <li class="step {currentStep >= 1 ? 'step-primary' : ''}">Basic Info</li>
        <li class="step {currentStep >= 2 ? 'step-primary' : ''}">Schedule</li>
        <li class="step {currentStep >= 3 ? 'step-primary' : ''}">Alerts</li>
        <li class="step {currentStep >= 4 ? 'step-primary' : ''}">Review</li>
      </ul>
    </div>

    <!-- Wizard Form -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">

        <!-- Step 1: Basic Information -->
        {#if currentStep === 1}
          <h3 class="card-title mb-4">Basic Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Task Type *</span>
              </label>
              <select class="select select-bordered" bind:value={formData.type}>
                <option value="Duty">Duty</option>
                <option value="Responsibility">Responsibility</option>
                <option value="Ritual">Ritual</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Category *</span>
              </label>
              <select class="select select-bordered" bind:value={formData.category}>
                <option value="Self">Self</option>
                <option value="Family">Family</option>
                <option value="Parenting">Parenting</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Household">Household</option>
                <option value="Spiritual">Spiritual</option>
              </select>
            </div>

            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text">Description *</span>
              </label>
              <textarea
                class="textarea textarea-bordered"
                placeholder="Describe the task..."
                bind:value={formData.description}
                rows="3"
              ></textarea>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Assigned To *</span>
              </label>
              <input
                type="text"
                class="input input-bordered"
                bind:value={formData.assigned_to}
                placeholder="Who should do this task?"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Priority *</span>
              </label>
              <select class="select select-bordered" bind:value={formData.priority}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Mandatory Task</span>
                <input type="checkbox" class="checkbox" bind:checked={formData.mandatory} />
              </label>
            </div>
          </div>
        {/if}

        <!-- Step 2: Schedule -->
        {#if currentStep === 2}
          <h3 class="card-title mb-4">Schedule & Location</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Frequency *</span>
              </label>
              <select class="select select-bordered" bind:value={formData.frequency}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Ad-Hoc">Ad-Hoc</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Time of Day</span>
              </label>
              <select class="select select-bordered" bind:value={formData.time_of_day}>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Due Date</span>
              </label>
              <input
                type="date"
                class="input input-bordered"
                bind:value={formData.due_date}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Location</span>
              </label>
              <input
                type="text"
                class="input input-bordered"
                bind:value={formData.location}
                placeholder="Where should this task be done?"
              />
            </div>
          </div>
        {/if}

        <!-- Step 3: Alerts & Notifications -->
        {#if currentStep === 3}
          <h3 class="card-title mb-4">Alerts & Notifications</h3>

          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">Enable Smart Alerts</span>
              <input type="checkbox" class="checkbox" bind:checked={formData.alert_enabled} />
            </label>
          </div>

          {#if formData.alert_enabled}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Alert Type</span>
                </label>
                <select class="select select-bordered" bind:value={formData.alert_type}>
                  <option value="SMS">SMS</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                  <option value="Alarm">Alarm</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Alert Time</span>
                </label>
                <input
                  type="datetime-local"
                  class="input input-bordered"
                  bind:value={formData.alert_time}
                />
              </div>

              <div class="form-control md:col-span-2">
                <label class="label">
                  <span class="label-text">Alert Message</span>
                </label>
                <textarea
                  class="textarea textarea-bordered"
                  bind:value={formData.alert_message}
                  placeholder="Custom alert message..."
                  rows="2"
                ></textarea>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Location-based Alert</span>
                </label>
                <div class="flex gap-2">
                  <input
                    type="number"
                    class="input input-bordered flex-1"
                    bind:value={formData.alert_radius_meters}
                    placeholder="Radius (meters)"
                  />
                  <button class="btn btn-outline" on:click={getCurrentLocation}>
                    <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                    Use Current Location
                  </button>
                </div>
              </div>
            </div>
          {/if}
        {/if}

        <!-- Step 4: Review -->
        {#if currentStep === 4}
          <h3 class="card-title mb-4">Review & Confirm</h3>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Type:</strong> {formData.type}
              </div>
              <div>
                <strong>Category:</strong> {formData.category}
              </div>
              <div class="md:col-span-2">
                <strong>Description:</strong> {formData.description}
              </div>
              <div>
                <strong>Assigned To:</strong> {formData.assigned_to}
              </div>
              <div>
                <strong>Priority:</strong> {formData.priority}
              </div>
              <div>
                <strong>Frequency:</strong> {formData.frequency}
              </div>
              <div>
                <strong>Due Date:</strong> {formData.due_date || 'Not set'}
              </div>
              <div>
                <strong>Alerts:</strong> {formData.alert_enabled ? 'Enabled' : 'Disabled'}
              </div>
              {#if formData.alert_enabled}
                <div>
                  <strong>Alert Type:</strong> {formData.alert_type}
                </div>
                <div>
                  <strong>Alert Time:</strong> {formData.alert_time || 'Not set'}
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
                disabled={isSubmitting || !formData.description}
                on:click={submitTask}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                {/if}
                Create Task
              </button>
            {/if}
          </div>
        </div>

      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="tasks" recordId="create" />

  </div>
</div>