<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import { family, familyDiscussions as discussions, familyVoiceCommands as voiceCommands } from '$lib/stores/family';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  const dispatch = createEventDispatcher();

  let currentStep = 1;
  let totalSteps = 4;
  let entryId = $page.url.searchParams.get('id');
  let entry = null;
  let isLoading = true;

  // Form data
  let formData = {
    type: 'Nuclear',
    category: 'Profile',
    sub_category: 'Members',
    title: '',
    description: '',
    date_time: new Date().toISOString().slice(0, 16),
    location: '',
    media_type: 'Blog',
    media_url: '',
    applicable_roles: [$userProfile.role]
  };

  let voiceResult = '';
  let isSubmitting = false;
  let comments = '';

  // Load entry data
  $: if (entryId && $family.length > 0) {
    entry = $family.find(e => e.id === entryId);
    if (entry) {
      formData = {
        type: entry.type || 'Nuclear',
        category: entry.category || 'Profile',
        sub_category: entry.sub_category || 'Members',
        title: entry.title || '',
        description: entry.description || '',
        date_time: entry.date_time ? new Date(entry.date_time).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        location: entry.location || '',
        media_type: entry.media_type || 'Blog',
        media_url: entry.media_url || '',
        applicable_roles: entry.applicable_roles || [$userProfile.role]
      };
      isLoading = false;
    }
  }

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    // Parse voice commands to update form
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('update title')) {
      const titleMatch = result.match(/update title to (.+)/i);
      if (titleMatch) {
        formData.title = titleMatch[1].trim();
      }
    }

    if (lowerResult.includes('update description')) {
      const descMatch = result.match(/update description to (.+)/i);
      if (descMatch) {
        formData.description = descMatch[1].trim();
      }
    }

    if (lowerResult.includes('change category')) {
      const categoryMatch = result.match(/change category to (.+)/i);
      if (categoryMatch) {
        const category = categoryMatch[1].trim();
        if (['Profile', 'Wisdom', 'Heritage', 'Tradition', 'Stories', 'Legacy', 'Success', 'Achievements', 'Certifications', 'Photos', 'Videos', 'Life Lessons', 'Rules', 'Virtues', 'Memories'].includes(category)) {
          formData.category = category;
        }
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

  function goToStep(step) {
    currentStep = step;
  }

  async function updateEntry() {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!entry) {
      alert('Entry not found');
      return;
    }

    isSubmitting = true;

    try {
      const updatedEntry = {
        ...entry,
        ...formData,
        updated_at: new Date().toISOString()
      };

      // Update in family store
      family.update(current =>
        current.map(e => e.id === entryId ? updatedEntry : e)
      );

      // Add update discussion entry
      const discussionEntry = {
        id: `discussion_${Date.now()}`,
        table_name: 'family',
        record_id: entryId,
        author: $userProfile.name,
        author_role: $userProfile.role,
        message: `Family entry updated: ${updatedEntry.title}${comments ? ` - ${comments}` : ''}`,
        created_at: new Date().toISOString()
      };

      discussions.update(current => [...current, discussionEntry]);

      // Navigate back to dashboard
      goto('/family/dashboard');

    } catch (error) {
      console.error('Error updating family entry:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function deleteEntry() {
    if (confirm('Are you sure you want to delete this family entry?')) {
      family.update(current => current.filter(e => e.id !== entryId));

      // Add deletion discussion entry
      const discussionEntry = {
        id: `discussion_${Date.now()}`,
        table_name: 'family',
        record_id: entryId,
        author: $userProfile.name,
        author_role: $userProfile.role,
        message: `Family entry deleted: ${entry?.title}`,
        created_at: new Date().toISOString()
      };

      discussions.update(current => [...current, discussionEntry]);

      goto('/family/dashboard');
    }
  }

  // Update sub_category options based on category
  $: subCategoryOptions = getSubCategoryOptions(formData.category);

  function getSubCategoryOptions(category) {
    switch (category) {
      case 'Profile':
        return ['Members', 'Relatives', 'Friends', 'Neighbours'];
      case 'Wisdom':
      case 'Life Lessons':
        return ['Life Lessons', 'Stories', 'Virtues', 'Legacy'];
      case 'Heritage':
      case 'Tradition':
        return ['Family Line', 'Traditions', 'Festivals', 'Celebrations'];
      case 'Success':
      case 'Achievements':
        return ['Certifications', 'Awards', 'Rewards', 'Success'];
      case 'Rules':
        return ['Strict Guidelines', 'Mistakes to Avoid', 'Habits to Avoid', 'To Dos', 'Not To Dos'];
      case 'Memories':
        return ['Occasions', 'Rituals', 'Functions', 'Moments'];
      default:
        return ['Members', 'Stories', 'Memories'];
    }
  }
</script>

<svelte:head>
  <title>Update Family Entry - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-4xl mx-auto">

    <Breadcrumb currentPage="Update Entry" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update Family Entry</h1>
        <p class="text-base-content/70">Edit family member details and information</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'update title to new name' or 'change category'" />
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info mb-4">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    {#if isLoading}
      <div class="flex justify-center items-center h-64">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    {:else if !entry}
      <div class="alert alert-error">
        <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
        <span>Family entry not found</span>
      </div>
    {:else}

      <!-- Progress Indicator -->
      <div class="flex justify-center mb-8">
        <ul class="steps steps-horizontal w-full max-w-2xl">
          <li class="step {currentStep >= 1 ? 'step-primary' : ''}">Basic Info</li>
          <li class="step {currentStep >= 2 ? 'step-primary' : ''}">Details</li>
          <li class="step {currentStep >= 3 ? 'step-primary' : ''}">Media</li>
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
                    <span class="label-text">Family Type</span>
                  </label>
                  <select class="select select-bordered" bind:value={formData.type}>
                    <option value="Nuclear">Nuclear</option>
                    <option value="Joined">Joined</option>
                    <option value="Independent">Independent</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Category</span>
                  </label>
                  <select class="select select-bordered" bind:value={formData.category}>
                    <option value="Profile">Profile</option>
                    <option value="Wisdom">Wisdom</option>
                    <option value="Heritage">Heritage</option>
                    <option value="Tradition">Tradition</option>
                    <option value="Stories">Stories</option>
                    <option value="Legacy">Legacy</option>
                    <option value="Success">Success</option>
                    <option value="Achievements">Achievements</option>
                    <option value="Certifications">Certifications</option>
                    <option value="Photos">Photos</option>
                    <option value="Videos">Videos</option>
                    <option value="Life Lessons">Life Lessons</option>
                    <option value="Rules">Rules</option>
                    <option value="Virtues">Virtues</option>
                    <option value="Memories">Memories</option>
                  </select>
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Sub Category</span>
                </label>
                <select class="select select-bordered" bind:value={formData.sub_category}>
                  {#each subCategoryOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input type="text" placeholder="Name, title, or event name" class="input input-bordered" bind:value={formData.title} />
              </div>
            </div>
          {/if}

          <!-- Step 2: Details -->
          {#if currentStep === 2}
            <div class="space-y-4">
              <h3 class="text-xl font-semibold">Details</h3>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea placeholder="Detailed description or story..." class="textarea textarea-bordered h-32" bind:value={formData.description}></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Date & Time</span>
                  </label>
                  <input type="datetime-local" class="input input-bordered" bind:value={formData.date_time} />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Location</span>
                  </label>
                  <input type="text" placeholder="Where it happened or is located" class="input input-bordered" bind:value={formData.location} />
                </div>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Update Comments</span>
                </label>
                <textarea placeholder="What changes did you make?" class="textarea textarea-bordered h-20" bind:value={comments}></textarea>
              </div>
            </div>
          {/if}

          <!-- Step 3: Media -->
          {#if currentStep === 3}
            <div class="space-y-4">
              <h3 class="text-xl font-semibold">Media & Attachments</h3>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Media Type</span>
                </label>
                <select class="select select-bordered" bind:value={formData.media_type}>
                  <option value="Blog">Blog/Text</option>
                  <option value="Audio">Audio</option>
                  <option value="Photo">Photo</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Media URL (Optional)</span>
                </label>
                <input type="url" placeholder="https://example.com/photo.jpg" class="input input-bordered" bind:value={formData.media_url} />
                <label class="label">
                  <span class="label-text-alt">Link to photo, video, audio file, or blog post</span>
                </label>
              </div>

              <!-- Preview -->
              {#if formData.media_url}
                <div class="border rounded-lg p-4 bg-base-200">
                  <h4 class="font-semibold mb-2">Preview</h4>
                  {#if formData.media_type === 'Photo'}
                    <img src={formData.media_url} alt="Preview" class="w-full h-32 object-cover rounded" />
                  {:else if formData.media_type === 'Video'}
                    <video controls class="w-full h-32 rounded">
                      <source src={formData.media_url} type="video/mp4">
                    </video>
                  {:else if formData.media_type === 'Audio'}
                    <audio controls class="w-full">
                      <source src={formData.media_url} type="audio/mpeg">
                    </audio>
                  {:else}
                    <a href={formData.media_url} target="_blank" class="link link-primary">
                      View {formData.media_type}
                    </a>
                  {/if}
                </div>
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
                  <div><strong>Category:</strong> {formData.category}</div>
                  <div><strong>Sub Category:</strong> {formData.sub_category}</div>
                  <div><strong>Title:</strong> {formData.title || 'Not specified'}</div>
                </div>

                <div><strong>Description:</strong> {formData.description || 'Not specified'}</div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Date:</strong> {formData.date_time ? new Date(formData.date_time).toLocaleString() : 'Not specified'}</div>
                  <div><strong>Location:</strong> {formData.location || 'Not specified'}</div>
                  <div><strong>Media Type:</strong> {formData.media_type}</div>
                  <div><strong>Media URL:</strong> {formData.media_url || 'Not specified'}</div>
                </div>

                {#if comments}
                  <div><strong>Update Comments:</strong> {comments}</div>
                {/if}
              </div>
            </div>
          {/if}

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <div class="flex gap-2">
              <button
                class="btn btn-outline btn-error"
                on:click={deleteEntry}
              >
                <Icon icon="heroicons:trash" class="w-4 h-4" />
                Delete
              </button>
            </div>

            <div class="flex gap-2">
              <button
                class="btn btn-outline"
                disabled={currentStep === 1}
                on:click={prevStep}
              >
                <Icon icon="heroicons:arrow-left" class="w-4 h-4" />
                Previous
              </button>

              {#if currentStep < totalSteps}
                <button class="btn btn-primary" on:click={nextStep}>
                  Next
                  <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
                </button>
              {:else}
                <button
                  class="btn btn-success"
                  disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
                  on:click={updateEntry}
                >
                  {#if isSubmitting}
                    <span class="loading loading-spinner loading-sm"></span>
                  {/if}
                  Update Entry
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

    {/if}

  </div>
</div>