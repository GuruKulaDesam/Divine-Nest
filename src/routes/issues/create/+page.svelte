<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { issues } from '$lib/stores/issues';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  let currentStep = 1;
  let totalSteps = 4;

  // Form data
  let formData = {
    type: 'Internal',
    category: 'Maintenance',
    sub_category: '',
    description: '',
    location_lat: null,
    location_lng: null,
    location_address: '',
    contact: '',
    preferred_resolution_date: '',
    assigned_to: '',
    status: 'Reported',
    applicable_roles: [$userProfile.role],
    alert_enabled: true,
    alert_time: '',
    alert_location_lat: null,
    alert_location_lng: null,
    alert_radius_meters: 100,
    alert_message: '',
    alert_type: 'SMS',
    priority: 'Medium',
    created_by: $userProfile.name
  };

  let voiceResult = '';
  let isSubmitting = false;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    // Parse voice commands to fill form
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('report issue') || lowerResult.includes('create issue')) {
      // Extract issue description
      const descMatch = result.match(/(?:report|create)\s+issue\s+(.+)/i);
      if (descMatch) {
        formData.description = descMatch[1].trim();
      }
    }

    if (lowerResult.includes('contact') || lowerResult.includes('call')) {
      // Extract contact info
      const contactMatch = result.match(/(?:contact|call)\s+(\w+)/i);
      if (contactMatch) {
        formData.contact = contactMatch[1];
      }
    }

    if (lowerResult.includes('emergency') || lowerResult.includes('urgent')) {
      formData.category = 'Emergency';
      formData.priority = 'Critical';
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

  async function submitIssue() {
    isSubmitting = true;

    try {
      // Generate unique ID
      const newIssue = {
        ...formData,
        id: `issue_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add to issues store
      issues.update(currentIssues => [...currentIssues, newIssue]);

      // Navigate back to dashboard
      goto('/issues/dashboard');

    } catch (error) {
      console.error('Error creating issue:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          formData.location_lat = position.coords.latitude;
          formData.location_lng = position.coords.longitude;
          // Try to get address from coordinates (basic implementation)
          formData.location_address = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }
</script>

<svelte:head>
  <title>Report Issue - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto">

    <Breadcrumb currentPage="Report Issue" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Report New Issue</h1>
        <p class="text-base-content/70">Report household issues and connect with service providers</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'report issue with leaking faucet'" />
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
        <li class="step {currentStep >= 1 ? 'step-primary' : ''}">Issue Details</li>
        <li class="step {currentStep >= 2 ? 'step-primary' : ''}">Location & Contact</li>
        <li class="step {currentStep >= 3 ? 'step-primary' : ''}">Alerts</li>
        <li class="step {currentStep >= 4 ? 'step-primary' : ''}">Review</li>
      </ul>
    </div>

    <!-- Wizard Form -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">

        <!-- Step 1: Issue Details -->
        {#if currentStep === 1}
          <h3 class="card-title mb-4">Issue Details</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Issue Type *</span>
              </label>
              <select class="select select-bordered" bind:value={formData.type}>
                <option value="Internal">Internal (Household)</option>
                <option value="External">External (Service Provider)</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Category *</span>
              </label>
              <select class="select select-bordered" bind:value={formData.category}>
                <option value="Emergency">Emergency</option>
                <option value="Urgents">Urgents</option>
                <option value="Repairs">Repairs</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Upgrades">Upgrades</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Sub Category</span>
              </label>
              <input
                type="text"
                class="input input-bordered"
                bind:value={formData.sub_category}
                placeholder="Specific type of issue..."
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

            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text">Description *</span>
              </label>
              <textarea
                class="textarea textarea-bordered"
                placeholder="Describe the issue in detail..."
                bind:value={formData.description}
                rows="4"
              ></textarea>
            </div>
          </div>
        {/if}

        <!-- Step 2: Location & Contact -->
        {#if currentStep === 2}
          <h3 class="card-title mb-4">Location & Contact Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text">Location Address</span>
              </label>
              <div class="flex gap-2">
                <input
                  type="text"
                  class="input input-bordered flex-1"
                  bind:value={formData.location_address}
                  placeholder="Enter address or use current location"
                />
                <button
                  type="button"
                  class="btn btn-outline"
                  on:click={getCurrentLocation}
                >
                  <Icon icon="heroicons:map-pin" class="w-5 h-5" />
                  Use Current
                </button>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Contact Person *</span>
              </label>
              <input
                type="text"
                class="input input-bordered"
                bind:value={formData.contact}
                placeholder="Who to contact about this issue?"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Preferred Resolution Date</span>
              </label>
              <input
                type="date"
                class="input input-bordered"
                bind:value={formData.preferred_resolution_date}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Assigned To</span>
              </label>
              <input
                type="text"
                class="input input-bordered"
                bind:value={formData.assigned_to}
                placeholder="Who should handle this issue?"
              />
            </div>
          </div>
        {/if}

        <!-- Step 3: Alerts & Notifications -->
        {#if currentStep === 3}
          <h3 class="card-title mb-4">Alerts & Notifications</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Enable Alerts</span>
                <input type="checkbox" class="checkbox" bind:checked={formData.alert_enabled} />
              </label>
            </div>

            {#if formData.alert_enabled}
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
                  type="time"
                  class="input input-bordered"
                  bind:value={formData.alert_time}
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Alert Radius (meters)</span>
                </label>
                <input
                  type="number"
                  class="input input-bordered"
                  bind:value={formData.alert_radius_meters}
                  min="50"
                  max="5000"
                  step="50"
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
            {/if}
          </div>
        {/if}

        <!-- Step 4: Review -->
        {#if currentStep === 4}
          <h3 class="card-title mb-4">Review Issue Report</h3>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Type:</strong> {formData.type}
              </div>
              <div>
                <strong>Category:</strong> {formData.category}
              </div>
              <div>
                <strong>Priority:</strong> {formData.priority}
              </div>
              <div>
                <strong>Contact:</strong> {formData.contact || 'Not specified'}
              </div>
            </div>

            <div>
              <strong>Description:</strong>
              <p class="mt-2 p-3 bg-base-200 rounded">{formData.description || 'No description provided'}</p>
            </div>

            {#if formData.location_address}
              <div>
                <strong>Location:</strong> {formData.location_address}
              </div>
            {/if}

            {#if formData.alert_enabled}
              <div>
                <strong>Alerts:</strong> {formData.alert_type} at {formData.alert_time || 'any time'}
              </div>
            {/if}
          </div>
        {/if}

      </div>

      <!-- Navigation Buttons -->
      <div class="card-actions justify-between p-6">
        <button
          class="btn btn-outline"
          disabled={currentStep === 1}
          on:click={prevStep}
        >
          <Icon icon="heroicons:arrow-left" class="w-5 h-5" />
          Previous
        </button>

        <div class="flex gap-2">
          {#if currentStep < totalSteps}
            <button class="btn btn-primary" on:click={nextStep}>
              Next
              <Icon icon="heroicons:arrow-right" class="w-5 h-5" />
            </button>
          {:else}
            <button
              class="btn btn-success"
              disabled={isSubmitting || !formData.description || !formData.contact}
              on:click={submitIssue}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner loading-sm"></span>
              {/if}
              Report Issue
            </button>
          {/if}
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="issues" recordId="create" />

  </div>
</div>