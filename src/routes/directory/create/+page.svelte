<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { directory, directoryDiscussions as discussions, directoryVoiceCommands as voiceCommands } from '$lib/stores/directory';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  let currentStep = 1;
  let totalSteps = 4;

  // Form data
  let formData = {
    category: 'Emergency',
    type: 'Contact',
    name: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    hours: '',
    notes: '',
    is_favorite: false,
    tags: '',
    applicable_roles: [$userProfile.role]
  };

  let voiceResult = '';
  let isSubmitting = false;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    // Parse voice commands to fill form
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('create entry') || lowerResult.includes('add contact')) {
      // Extract name
      const nameMatch = result.match(/(?:create|add)\s+(?:entry|contact)\s+(.+)/i);
      if (nameMatch) {
        formData.name = nameMatch[1].trim();
      }
    }

    if (lowerResult.includes('phone') || lowerResult.includes('call')) {
      // Extract phone number
      const phoneMatch = result.match(/(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/);
      if (phoneMatch) {
        formData.phone = phoneMatch[1];
      }
    }

    if (lowerResult.includes('emergency')) {
      formData.category = 'Emergency';
    } else if (lowerResult.includes('service')) {
      formData.category = 'Services';
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

  async function submitEntry() {
    if (!formData.name.trim()) {
      alert('Please enter a name');
      return;
    }

    isSubmitting = true;

    try {
      const newEntry = {
        ...formData,
        id: `directory_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add to directory store
      directory.update(current => [...current, newEntry]);

      // Add creation discussion entry
      const discussionEntry = {
        id: `discussion_${Date.now()}`,
        table_name: 'directory',
        record_id: newEntry.id,
        author: $userProfile.name,
        author_role: $userProfile.role,
        message: `Directory entry created: ${newEntry.name}`,
        created_at: new Date().toISOString()
      };

      discussions.update(current => [...current, discussionEntry]);

      // Navigate back to dashboard
      goto('/directory/dashboard');

    } catch (error) {
      console.error('Error creating directory entry:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    formData = {
      category: 'Emergency',
      type: 'Contact',
      name: '',
      description: '',
      phone: '',
      email: '',
      address: '',
      website: '',
      hours: '',
      notes: '',
      is_favorite: false,
      tags: '',
      applicable_roles: [$userProfile.role]
    };
    currentStep = 1;
  }
</script>

<svelte:head>
  <title>Create Directory Entry - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto">

    <Breadcrumb currentPage="Create Entry" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Create Directory Entry</h1>
        <p class="text-base-content/70">Add contacts and important information to your household directory</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'add emergency contact' or 'create service entry'" />
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
        <li class="step {currentStep >= 2 ? 'step-primary' : ''}">Contact Details</li>
        <li class="step {currentStep >= 3 ? 'step-primary' : ''}">Additional Info</li>
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
                  <span class="label-text">Category</span>
                </label>
                <select class="select select-bordered" bind:value={formData.category}>
                  <option value="Emergency">Emergency</option>
                  <option value="Family">Family</option>
                  <option value="Services">Services</option>
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="Government">Government</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Type</span>
                </label>
                <select class="select select-bordered" bind:value={formData.type}>
                  <option value="Contact">Contact</option>
                  <option value="Service">Service</option>
                  <option value="Business">Business</option>
                  <option value="Organization">Organization</option>
                  <option value="Information">Information</option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input type="text" placeholder="Full name or business name" class="input input-bordered" bind:value={formData.name} />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Description</span>
              </label>
              <textarea placeholder="Brief description..." class="textarea textarea-bordered h-24" bind:value={formData.description}></textarea>
            </div>

            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Mark as Favorite</span>
                <input type="checkbox" class="toggle toggle-warning" bind:checked={formData.is_favorite} />
              </label>
            </div>
          </div>
        {/if}

        <!-- Step 2: Contact Details -->
        {#if currentStep === 2}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Contact Details</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Phone Number</span>
                </label>
                <input type="tel" placeholder="+1 (555) 123-4567" class="input input-bordered" bind:value={formData.phone} />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email Address</span>
                </label>
                <input type="email" placeholder="contact@example.com" class="input input-bordered" bind:value={formData.email} />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Address</span>
              </label>
              <textarea placeholder="Full address..." class="textarea textarea-bordered h-24" bind:value={formData.address}></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Website</span>
                </label>
                <input type="url" placeholder="https://example.com" class="input input-bordered" bind:value={formData.website} />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Business Hours</span>
                </label>
                <input type="text" placeholder="Mon-Fri 9AM-5PM" class="input input-bordered" bind:value={formData.hours} />
              </div>
            </div>
          </div>
        {/if}

        <!-- Step 3: Additional Information -->
        {#if currentStep === 3}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Additional Information</h3>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Notes</span>
              </label>
              <textarea placeholder="Additional notes or special instructions..." class="textarea textarea-bordered h-32" bind:value={formData.notes}></textarea>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tags (Optional)</span>
              </label>
              <input type="text" placeholder="urgent, important, backup" class="input input-bordered" bind:value={formData.tags} />
              <label class="label">
                <span class="label-text-alt">Separate multiple tags with commas</span>
              </label>
            </div>
          </div>
        {/if}

        <!-- Step 4: Review & Submit -->
        {#if currentStep === 4}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Review & Submit</h3>

            <div class="bg-base-200 p-4 rounded-lg space-y-3">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Category:</strong> {formData.category}</div>
                <div><strong>Type:</strong> {formData.type}</div>
                <div><strong>Favorite:</strong> {formData.is_favorite ? 'Yes' : 'No'}</div>
                <div><strong>Name:</strong> {formData.name || 'Not specified'}</div>
              </div>

              <div><strong>Description:</strong> {formData.description || 'Not specified'}</div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Phone:</strong> {formData.phone || 'Not specified'}</div>
                <div><strong>Email:</strong> {formData.email || 'Not specified'}</div>
                <div><strong>Website:</strong> {formData.website || 'Not specified'}</div>
                <div><strong>Hours:</strong> {formData.hours || 'Not specified'}</div>
              </div>

              {#if formData.address}
                <div><strong>Address:</strong> {formData.address}</div>
              {/if}

              {#if formData.notes}
                <div><strong>Notes:</strong> {formData.notes}</div>
              {/if}

              {#if formData.tags}
                <div><strong>Tags:</strong> {formData.tags}</div>
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
                disabled={isSubmitting || !formData.name.trim()}
                on:click={submitEntry}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                {/if}
                Create Entry
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