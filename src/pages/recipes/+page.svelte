<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import RecipeManager from "$lib/components/RecipeManager.svelte";

  let showWelcome = true;

  onMount(() => {
    // Hide welcome message after 3 seconds
    setTimeout(() => {
      showWelcome = false;
    }, 3000);
  });
</script>

<svelte:head>
  <title>Recipe Archive - South Indian Family Life App</title>
  <meta name="description" content="Manage your family's recipe collection with voice-to-recipe conversion" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Welcome Message -->
    {#if showWelcome}
      <div class="mb-8 p-6 bg-green-100 border border-green-200 rounded-xl" in:fade={{ duration: 500 }}>
        <div class="flex items-center gap-3">
          <Icon icon="heroicons:book-open" class="text-green-600 text-2xl" />
          <div>
            <h2 class="text-lg font-semibold text-green-800">Welcome to Recipe Archive</h2>
            <p class="text-green-700">Preserve and share your family's cooking traditions</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Header -->
    <div class="mb-8" in:fade={{ duration: 500, delay: 200 }}>
      <h1 class="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
        <Icon icon="heroicons:book-open" class="text-green-600" />
        📚 Recipe Archive
      </h1>
      <p class="text-gray-600 text-lg">Manage recipes, convert voice instructions, and build your culinary heritage</p>
    </div>

    <RecipeManager
      on:dataChanged={() => {
        /* Handle data changes */
      }}
    />
  </div>
</div>
