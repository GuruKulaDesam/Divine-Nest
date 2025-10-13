<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  import { userProfile, userProfileActions } from '$lib/stores/userProfile';
  import { theme, THEMES } from '$lib/stores/theme';

  // Import logo images
  import Shivohm_Logo_Light from "$lib/assets/images/Shivohm_Logo_Light.png";
  import Shivohm_Logo_Dark from "$lib/assets/images/Shivohm_Logo_Dark.png";
  import Shivohm_Logo_White from "$lib/assets/images/Shivohm_Logo_White.png";

  const dispatch = createEventDispatcher();

  let showLoginModal = true;
  let isGoogleLoading = false;
  let isFacebookLoading = false;

  let formData = {
    name: '',
    role: 'Father',
    location: 'Coimbatore, India'
  };

  let isSubmitting = false;

  // Reactive logo based on theme
  $: logoSrc = $theme === THEMES.LIGHT ? Shivohm_Logo_Light :
               $theme === THEMES.DARK ? Shivohm_Logo_Dark :
               $theme === THEMES.TRANSPARENT ? Shivohm_Logo_White :
               Shivohm_Logo_Light; // fallback

  async function handleGoogleLogin() {
    isGoogleLoading = true;
    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update profile with Google data
      userProfileActions.updateProfile({
        name: 'Google User',
        role: formData.role,
        location: formData.location,
        isSetupComplete: true,
        authProvider: 'Google'
      });

      showLoginModal = false;
      dispatch('loginComplete');
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      isGoogleLoading = false;
    }
  }

  async function handleFacebookLogin() {
    isFacebookLoading = true;
    try {
      // Simulate Facebook login
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update profile with Facebook data
      userProfileActions.updateProfile({
        name: 'Facebook User',
        role: formData.role,
        location: formData.location,
        isSetupComplete: true,
        authProvider: 'Facebook'
      });

      showLoginModal = false;
      dispatch('loginComplete');
    } catch (error) {
      console.error('Facebook login failed:', error);
    } finally {
      isFacebookLoading = false;
    }
  }

  async function handleManualLogin() {
    if (!formData.name.trim()) return;

    isSubmitting = true;
    try {
      userProfileActions.updateProfile({
        name: formData.name.trim(),
        role: formData.role,
        location: formData.location,
        isSetupComplete: true,
        authProvider: 'Manual'
      });

      showLoginModal = false;
      dispatch('loginComplete');
    } catch (error) {
      console.error('Manual login failed:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleSkip() {
    // Use default values
    userProfileActions.updateProfile({
      name: 'Family Member',
      role: 'Father',
      location: 'Coimbatore, India',
      isSetupComplete: true,
      authProvider: 'Guest'
    });

    showLoginModal = false;
    dispatch('loginComplete');
  }
</script>

{#if showLoginModal}
  <!-- Modal Backdrop -->
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <!-- Modal Content -->
    <div class="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
      <!-- Close Button -->
      <button
        class="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle"
        on:click={handleSkip}
      >
        <Icon icon="heroicons:x-mark" class="w-5 h-5" />
      </button>

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src={logoSrc} alt="Divine Nest Logo" class="w-20 h-20 object-contain" />
      </div>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-center mb-2">Welcome to Divine Nest</h2>
      <p class="text-center text-base-content/70 mb-8">Sign in to access your family dashboard</p>

      <!-- Social Login Buttons -->
      <div class="space-y-3 mb-6">
        <button
          class="btn btn-outline w-full gap-3 {isGoogleLoading ? 'loading' : ''}"
          on:click={handleGoogleLogin}
          disabled={isGoogleLoading || isFacebookLoading}
        >
          {#if !isGoogleLoading}
            <Icon icon="logos:google-icon" class="w-5 h-5" />
          {/if}
          Continue with Google
        </button>

        <button
          class="btn btn-outline w-full gap-3 {isFacebookLoading ? 'loading' : ''}"
          on:click={handleFacebookLogin}
          disabled={isGoogleLoading || isFacebookLoading}
        >
          {#if !isFacebookLoading}
            <Icon icon="logos:facebook" class="w-5 h-5" />
          {/if}
          Continue with Facebook
        </button>
      </div>

      <!-- Divider -->
      <div class="divider text-sm">or continue manually</div>

      <!-- Manual Login Form -->
      <div class="space-y-4 mb-6">
        <div>
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            class="input input-bordered w-full"
            bind:value={formData.name}
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Role</span>
          </label>
          <select class="select select-bordered w-full" bind:value={formData.role}>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Child">Child</option>
            <option value="Grandparent">Grandparent</option>
            <option value="Guest">Guest</option>
          </select>
        </div>

        <div>
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="City, Country"
            class="input input-bordered w-full"
            bind:value={formData.location}
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button
          class="btn btn-primary w-full {isSubmitting ? 'loading' : ''}"
          on:click={handleManualLogin}
          disabled={!formData.name.trim() || isSubmitting}
        >
          {#if !isSubmitting}
            Continue
          {/if}
        </button>

        <button
          class="btn btn-ghost w-full"
          on:click={handleSkip}
        >
          Skip for now
        </button>
      </div>

      <!-- Footer -->
      <p class="text-xs text-center text-base-content/50 mt-6">
        Your data stays private and secure
      </p>
    </div>
  </div>
{/if}

<style>
  .loading {
    pointer-events: none;
  }

  .loading::after {
    content: '';
    width: 1em;
    height: 1em;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>