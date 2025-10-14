<script>
  import { onMount } from "svelte";
  import VoiceDashboard from "$lib/components/VoiceDashboard.svelte";
  import UserLoginModal from "$lib/components/UserLoginModal.svelte";

  let isLoggedIn = false;

  onMount(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('divineNest_userProfile');
    if (userData) {
      try {
        const profile = JSON.parse(userData);
        if (profile.isSetupComplete) {
          isLoggedIn = true;
        }
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  });

  function handleLoginComplete() {
    isLoggedIn = true;
  }
</script>

{#if isLoggedIn}
  <VoiceDashboard />
{/if}

<UserLoginModal on:loginComplete={handleLoginComplete} />
