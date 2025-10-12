<script>
  import { userProfile, userProfileActions } from '$lib/stores/userProfile';
  import { createEventDispatcher } from 'svelte';
  import { theme, THEMES } from '$lib/stores/theme';

  // Import logo images
  import Shivohm_Logo_Light from "$lib/assets/images/Shivohm_Logo_Light.png";
  import Shivohm_Logo_Dark from "$lib/assets/images/Shivohm_Logo_Dark.png";
  import Shivohm_Logo_White from "$lib/assets/images/Shivohm_Logo_White.png";

  const dispatch = createEventDispatcher();

  let formData = {
    name: 'User',
    role: 'Mother',
    location: 'Coimbatore'
  };

  let isSubmitting = false;

  // Reactive logo based on theme
  $: logoSrc = $theme === THEMES.LIGHT ? Shivohm_Logo_Light :
               $theme === THEMES.DARK ? Shivohm_Logo_Dark :
               $theme === THEMES.TRANSPARENT ? Shivohm_Logo_White :
               Shivohm_Logo_Light; // fallback

  async function handleSubmit() {
    isSubmitting = true;

    try {
      // Update the user profile
      userProfileActions.updateProfile({
        name: formData.name.trim(),
        role: formData.role.trim(),
        location: formData.location.trim(),
        isSetupComplete: true
      });

      // Dispatch event to notify parent component
      dispatch('setupComplete');
    } catch (error) {
      console.error('Failed to save user profile:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleClose() {
    // Use default values and complete setup
    userProfileActions.updateProfile({
      name: 'User',
      role: 'Mother',
      location: 'India',
      isSetupComplete: true
    });
    dispatch('setupComplete');
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  }
</script>

<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-base-300">
    <!-- Close Button -->
    <button
      on:click={handleClose}
      class="btn btn-ghost btn-sm absolute top-4 right-4 text-base-content/60 hover:text-base-content"
      aria-label="Close setup"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Header -->
    <div class="text-center mb-8">
      <!-- Logo -->
      <div class="w-20 h-20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <img src={logoSrc} alt="ShivohM Logo" class="w-16 h-16 object-contain" />
      </div>
      <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
        Welcome to ShivohM
      </h2>
      <p class="text-base-content/70 text-sm">
        Let's personalize your experience
      </p>
    </div>

    <!-- Form -->
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Nick Name -->
      <div class="form-control">
        <label for="name-input" class="label">
          <span class="label-text font-semibold text-base-content">Nick Name</span>
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
          <span class="label-text font-semibold text-base-content">Your Role</span>
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
          <span class="label-text font-semibold text-base-content">Location</span>
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

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-primary w-full btn-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border-0 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white shadow-lg"
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <span class="loading loading-spinner loading-sm"></span>
          Setting up...
        {:else}
          Get Started
        {/if}
      </button>
    </form>

    <!-- Footer -->
    <div class="text-center mt-6">
      <p class="text-xs text-base-content/50">
        Your information helps us personalize your experience. You can change these settings later.
      </p>
      <button
        on:click={handleClose}
        class="btn btn-ghost btn-sm text-base-content/60 hover:text-base-content mt-2"
      >
        Skip for now
      </button>
    </div>
  </div>
</div>