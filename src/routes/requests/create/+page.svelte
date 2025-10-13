<script>
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { requests, addRequest } from '$lib/stores/requests';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let formData = {
    description: '',
    category: 'Suggestion',
    contact: '',
    affected_audience: 'Individual',
    priority: 'Medium',
    location: '',
    applicable_roles: ['All']
  };

  let voiceResult = '';
  let isSubmitting = false;
  let showSuccess = false;

  // Get current location
  async function getCurrentLocation() {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        formData.location = `${position.coords.latitude}, ${position.coords.longitude}`;
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    // Process voice command for creating requests
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('emergency') || lowerResult.includes('urgent')) {
      formData.category = 'Emergency';
      formData.priority = 'High';
    } else if (lowerResult.includes('repair') || lowerResult.includes('fix')) {
      formData.category = 'Repairs';
    } else if (lowerResult.includes('maintenance')) {
      formData.category = 'Maintenance';
    } else if (lowerResult.includes('upgrade') || lowerResult.includes('improve')) {
      formData.category = 'Upgrades';
    }

    // Extract description from voice
    if (lowerResult.includes('request') || lowerResult.includes('need')) {
      const descriptionMatch = result.match(/(?:request|need|want)\s+(.*)/i);
      if (descriptionMatch) {
        formData.description = descriptionMatch[1].trim();
      }
    }
  }

  async function submitRequest() {
    if (!formData.description.trim()) {
      alert('Please enter a request description');
      return;
    }

    isSubmitting = true;

    try {
      const newRequest = {
        id: Date.now().toString(),
        description: formData.description,
        category: formData.category,
        contact: formData.contact || $userProfile.name,
        affected_audience: formData.affected_audience,
        priority: formData.priority,
        location: formData.location,
        status: 'Reported',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        applicable_roles: formData.applicable_roles,
        created_by: $userProfile.id,
        assigned_to: null,
        resolved_at: null,
        resolution_notes: null
      };

      await addRequest(newRequest);

      showSuccess = true;
      setTimeout(() => {
        goto('/requests/dashboard');
      }, 2000);

      // Reset form
      formData = {
        description: '',
        category: 'Suggestion',
        contact: '',
        affected_audience: 'Individual',
        priority: 'Medium',
        location: '',
        applicable_roles: ['All']
      };

    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function navigateToDashboard() {
    goto('/requests/dashboard');
  }
</script>

<svelte:head>
  <title>Submit Request - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto space-y-6">

    <Breadcrumb currentPage="Submit Request" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Submit Request</h1>
        <p class="text-base-content/70">Share your needs, suggestions, or report issues</p>
      </div>
      <button class="btn btn-ghost" on:click={navigateToDashboard}>
        <Icon icon="heroicons:arrow-left" class="w-5 h-5" />
        Back to Dashboard
      </button>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Success Message -->
    {#if showSuccess}
      <div class="alert alert-success">
        <Icon icon="heroicons:check-circle" class="w-5 h-5" />
        <span>Request submitted successfully! Redirecting to dashboard...</span>
      </div>
    {/if}

    <!-- Request Form -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title mb-4">
          <Icon icon="heroicons:document-plus" class="w-5 h-5" />
          Request Details
        </h3>

        <form on:submit|preventDefault={submitRequest} class="space-y-6">

          <!-- Voice Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Voice Command</span>
            </label>
            <VoiceInput
              onResult={handleVoiceCommand}
              placeholder="Say 'I need to fix the kitchen sink' or 'emergency water leak'"
            />
          </div>

          <!-- Description -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Request Description *</span>
            </label>
            <textarea
              bind:value={formData.description}
              class="textarea textarea-bordered h-24"
              placeholder="Describe your request, suggestion, or issue in detail..."
              required
            ></textarea>
          </div>

          <!-- Category and Priority Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={formData.category} class="select select-bordered">
                <option value="Suggestion">Suggestion</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repairs">Repairs</option>
                <option value="Upgrades">Upgrades</option>
                <option value="Urgents">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Priority</span>
              </label>
              <select bind:value={formData.priority} class="select select-bordered">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <!-- Contact and Audience Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Contact Person</span>
              </label>
              <input
                type="text"
                bind:value={formData.contact}
                class="input input-bordered"
                placeholder="Who should be contacted about this request?"
                value={$userProfile.name}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Affected Audience</span>
              </label>
              <select bind:value={formData.affected_audience} class="select select-bordered">
                <option value="Individual">Individual</option>
                <option value="Family">Family</option>
                <option value="Household">Household</option>
                <option value="Community">Community</option>
              </select>
            </div>
          </div>

          <!-- Location -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
              <button type="button" class="btn btn-ghost btn-xs" on:click={getCurrentLocation}>
                <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                Get Current Location
              </button>
            </label>
            <input
              type="text"
              bind:value={formData.location}
              class="input input-bordered"
              placeholder="Room, area, or GPS coordinates (optional)"
            />
          </div>

          <!-- Applicable Roles -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Visible to Roles</span>
            </label>
            <div class="flex flex-wrap gap-2">
              {#each ['All', 'Head', 'Spouse', 'Child', 'Elder', 'Caregiver', 'Helper'] as role}
                <label class="cursor-pointer">
                  <input
                    type="checkbox"
                    bind:group={formData.applicable_roles}
                    value={role}
                    class="checkbox checkbox-primary"
                  />
                  <span class="ml-2">{role}</span>
                </label>
              {/each}
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-control pt-4">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner"></span>
                Submitting...
              {:else}
                <Icon icon="heroicons:paper-airplane" class="w-5 h-5" />
                Submit Request
              {/if}
            </button>
          </div>

        </form>
      </div>
    </div>

    <!-- Quick Request Templates -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">
          <Icon icon="heroicons:document-duplicate" class="w-5 h-5" />
          Quick Templates
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            class="btn btn-outline"
            on:click={() => {
              formData.category = 'Maintenance';
              formData.description = 'Regular maintenance check needed for ';
              formData.priority = 'Medium';
            }}
          >
            <Icon icon="heroicons:wrench-screwdriver" class="w-4 h-4" />
            Maintenance Check
          </button>

          <button
            class="btn btn-outline"
            on:click={() => {
              formData.category = 'Repairs';
              formData.description = 'Something needs to be repaired: ';
              formData.priority = 'High';
            }}
          >
            <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4" />
            Repair Request
          </button>

          <button
            class="btn btn-outline"
            on:click={() => {
              formData.category = 'Suggestion';
              formData.description = 'I suggest we should: ';
              formData.priority = 'Low';
            }}
          >
            <Icon icon="heroicons:light-bulb" class="w-4 h-4" />
            Suggestion
          </button>

          <button
            class="btn btn-outline"
            on:click={() => {
              formData.category = 'Emergency';
              formData.description = 'EMERGENCY: ';
              formData.priority = 'Critical';
            }}
          >
            <Icon icon="heroicons:exclamation-circle" class="w-4 h-4" />
            Emergency
          </button>

          <button
            class="btn btn-outline"
            on:click={() => {
              formData.category = 'Upgrades';
              formData.description = 'Upgrade needed for: ';
              formData.priority = 'Medium';
            }}
          >
            <Icon icon="heroicons:arrow-trending-up" class="w-4 h-4" />
            Upgrade Request
          </button>

          <button
            class="btn btn-outline"
            on:click={() => {
              formData.category = 'Urgents';
              formData.description = 'Urgent matter: ';
              formData.priority = 'High';
            }}
          >
            <Icon icon="heroicons:clock" class="w-4 h-4" />
            Urgent Request
          </button>
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="requests" recordId="create" />

  </div>
</div>