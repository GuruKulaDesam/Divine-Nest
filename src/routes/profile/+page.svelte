<script>
  import { userProfile, userProfileActions } from '$lib/stores/userProfile';
  import { theme, THEMES } from '$lib/stores/theme';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Import logo images
  import Shivohm_Logo_Light from "$lib/assets/images/Shivohm_Logo_Light.png";
  import Shivohm_Logo_Dark from "$lib/assets/images/Shivohm_Logo_Dark.png";
  import Shivohm_Logo_White from "$lib/assets/images/Shivohm_Logo_White.png";

  let formData = {
    name: $userProfile.name || 'User',
    role: $userProfile.role || 'Mother',
    location: $userProfile.location || 'Coimbatore',
    familyName: $userProfile.familyName || 'Family'
  };

  let isSubmitting = false;
  let isEditing = false;

  // Reactive logo based on theme
  $: logoSrc = $theme === THEMES.LIGHT ? Shivohm_Logo_Light :
               $theme === THEMES.DARK ? Shivohm_Logo_Dark :
               $theme === THEMES.TRANSPARENT ? Shivohm_Logo_White :
               Shivohm_Logo_Light; // fallback

  // Check if profile is complete
  $: isProfileComplete = $userProfile.isSetupComplete;

  onMount(() => {
    // If profile is not complete, enable editing mode
    if (!isProfileComplete) {
      isEditing = true;
    }
  });

  async function handleSubmit() {
    isSubmitting = true;

    try {
      // Update the user profile
      userProfileActions.updateProfile({
        name: formData.name.trim(),
        role: formData.role.trim(),
        location: formData.location.trim(),
        familyName: formData.familyName.trim(),
        isSetupComplete: true
      });

      isEditing = false;

      // If this was the first setup, redirect to home
      if (!isProfileComplete) {
        goto('/');
      }
    } catch (error) {
      console.error('Failed to save user profile:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleEdit() {
    isEditing = true;
  }

  function handleCancel() {
    // Reset form data to current profile values
    formData = {
      name: $userProfile.name || 'User',
      role: $userProfile.role || 'Mother',
      location: $userProfile.location || 'Coimbatore',
      familyName: $userProfile.familyName || 'Family'
    };
    isEditing = false;
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !isSubmitting && isEditing) {
      handleSubmit();
    }
  }
</script>

<svelte:head>
  <title>User Profile - ShivohM</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 p-4">
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8 pt-8">
      <!-- Logo -->
      <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center overflow-hidden bg-white dark:bg-gray-800 rounded-full shadow-lg">
        <img src={logoSrc} alt="ShivohM Logo" class="w-20 h-20 object-contain" />
      </div>
      <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
        {#if isProfileComplete}
          Your Profile
        {:else}
          Welcome to ShivohM
        {/if}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        {#if isProfileComplete}
          Manage your personal information and preferences
        {:else}
          Let's personalize your experience
        {/if}
      </p>
    </div>

    <!-- Profile Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      {#if isEditing}
        <!-- Edit Form -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Family Name -->
          <div class="form-control">
            <label for="family-input" class="label">
              <span class="label-text font-semibold text-gray-700 dark:text-gray-300">Family Name</span>
            </label>
            <input
              id="family-input"
              type="text"
              bind:value={formData.familyName}
              placeholder="Enter your family name"
              class="input input-bordered input-primary w-full focus:input-primary"
              on:keydown={handleKeydown}
              disabled={isSubmitting}
            />
          </div>

          <!-- Nick Name -->
          <div class="form-control">
            <label for="name-input" class="label">
              <span class="label-text font-semibold text-gray-700 dark:text-gray-300">Nick Name</span>
            </label>
            <input
              id="name-input"
              type="text"
              bind:value={formData.name}
              placeholder="Enter your preferred name"
              class="input input-bordered input-primary w-full focus:input-primary"
              on:keydown={handleKeydown}
              disabled={isSubmitting}
            />
          </div>

          <!-- Role -->
          <div class="form-control">
            <label for="role-select" class="label">
              <span class="label-text font-semibold text-gray-700 dark:text-gray-300">Your Role</span>
            </label>
            <select
              id="role-select"
              bind:value={formData.role}
              class="select select-bordered select-primary w-full focus:select-primary"
              disabled={isSubmitting}
            >
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Family Head">Family Head</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
              <option value="Retiree">Retiree</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Location -->
          <div class="form-control">
            <label for="location-input" class="label">
              <span class="label-text font-semibold text-gray-700 dark:text-gray-300">Location</span>
            </label>
            <input
              id="location-input"
              type="text"
              bind:value={formData.location}
              placeholder="City, State/Country"
              class="input input-bordered input-primary w-full focus:input-primary"
              on:keydown={handleKeydown}
              disabled={isSubmitting}
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="btn btn-primary flex-1 btn-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border-0 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white shadow-lg"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner loading-sm"></span>
                Saving...
              {:else}
                Save Profile
              {/if}
            </button>
            <button
              type="button"
              on:click={handleCancel}
              class="btn btn-outline btn-lg flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      {:else}
        <!-- Profile Display -->
        <div class="space-y-6">
          <!-- Profile Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Family Name</label>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{$userProfile.familyName || 'Not set'}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Nick Name</label>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{$userProfile.name || 'Not set'}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{$userProfile.role || 'Not set'}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{$userProfile.location || 'Not set'}</p>
              </div>
            </div>
          </div>

          <!-- Edit Button -->
          <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              on:click={handleEdit}
              class="btn btn-primary btn-lg w-full font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border-0 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white shadow-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Footer -->
    {#if !isProfileComplete}
      <div class="text-center mt-6">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Your information helps us personalize your experience. You can change these settings anytime.
        </p>
      </div>
    {/if}
  </div>
</div>