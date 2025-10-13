<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Chart from 'chart.js/auto';
  import { directory, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let categoryChart;
  let typeChart;
  let voiceResult = '';

  // Calculate KPIs
  $: totalEntries = $directory.length;
  $: emergencyContacts = $directory.filter(d => d.category === 'Emergency').length;
  $: serviceProviders = $directory.filter(d => d.category === 'Services').length;
  $: favoriteEntries = $directory.filter(d => d.is_favorite).length;
  $: contactEntries = $directory.filter(d => d.type === 'Contact').length;

  // Filter directory by user's applicable roles
  $: userDirectory = $directory.filter(entry =>
    entry.applicable_roles.includes($userProfile.role) ||
    entry.applicable_roles.includes('All')
  );

  onMount(() => {
    // Initialize charts
    initializeCharts();
  });

  function initializeCharts() {
    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      const categories = {};
      userDirectory.forEach(entry => {
        categories[entry.category] = (categories[entry.category] || 0) + 1;
      });

      categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(categories),
          datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    // Type Distribution Chart
    const typeCtx = document.getElementById('typeChart');
    if (typeCtx) {
      const types = {};
      userDirectory.forEach(entry => {
        types[entry.type] = (types[entry.type] || 0) + 1;
      });

      typeChart = new Chart(typeCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(types),
          datasets: [{
            label: 'Entries by Type',
            data: Object.values(types),
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  function handleVoiceCommand(result) {
    voiceResult = result;
    // Process voice command for directory
    if (result.toLowerCase().includes('create entry')) {
      goto('/directory/create');
    } else if (result.toLowerCase().includes('update entry')) {
      goto('/directory/update');
    } else if (result.toLowerCase().includes('review directory')) {
      goto('/directory/review');
    }
  }

  function navigateToCreate() {
    goto('/directory/create');
  }

  function navigateToReview() {
    goto('/directory/review');
  }

  function navigateToUpdate() {
    goto('/directory/update');
  }
</script>

<svelte:head>
  <title>Directory Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Directory Dashboard</h1>
        <p class="text-base-content/70">Manage your household contacts and important information</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'create entry' or 'find contact'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Add Entry
        </button>
      </div>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Total Entries</p>
              <p class="text-2xl font-bold text-primary">{totalEntries}</p>
            </div>
            <Icon icon="heroicons:book-open" class="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/directory/update?filter=emergency')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Emergency</p>
              <p class="text-2xl font-bold text-error">{emergencyContacts}</p>
            </div>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-error" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={() => goto('/directory/update?filter=favorites')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Favorites</p>
              <p class="text-2xl font-bold text-warning">{favoriteEntries}</p>
            </div>
            <Icon icon="heroicons:star" class="w-8 h-8 text-warning" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" on:click={navigateToReview}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base-content/70">Contacts</p>
              <p class="text-2xl font-bold text-info">{contactEntries}</p>
            </div>
            <Icon icon="heroicons:user-group" class="w-8 h-8 text-info" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Category Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Entries by Category</h3>
          <canvas id="categoryChart" width="300" height="200"></canvas>
        </div>
      </div>

      <!-- Type Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Entries by Type</h3>
          <canvas id="typeChart" width="300" height="200"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Entries -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h3 class="card-title">Recent Entries</h3>
          <button class="btn btn-ghost btn-sm" on:click={navigateToReview}>
            View All
            <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-3">
          {#each userDirectory.slice(0, 5) as entry}
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="avatar placeholder">
                  <div class="bg-primary text-primary-content rounded-full w-8">
                    <span class="text-xs">{entry.type.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p class="font-medium">{entry.name}</p>
                  <p class="text-sm text-base-content/70">{entry.category} • {entry.type}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                {#if entry.phone}
                  <Icon icon="heroicons:phone" class="w-4 h-4 text-base-content/60" />
                {/if}
                {#if entry.email}
                  <Icon icon="heroicons:envelope" class="w-4 h-4 text-base-content/60" />
                {/if}
                {#if entry.is_favorite}
                  <Icon icon="heroicons:star" class="w-4 h-4 text-warning" />
                {/if}
              </div>
            </div>
          {/each}
          {#if userDirectory.length === 0}
            <div class="text-center py-8 text-base-content/70">
              <Icon icon="heroicons:book-open" class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No directory entries found. Create your first entry!</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Quick Access - Emergency Contacts -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title text-error">
          <Icon icon="heroicons:exclamation-triangle" class="w-5 h-5" />
          Emergency Contacts
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each userDirectory.filter(e => e.category === 'Emergency') as contact}
            <div class="card bg-error/5 border border-error/20">
              <div class="card-body p-4">
                <h4 class="card-title text-sm">{contact.name}</h4>
                {#if contact.phone}
                  <p class="text-sm">
                    <Icon icon="heroicons:phone" class="w-4 h-4 inline mr-1" />
                    {contact.phone}
                  </p>
                {/if}
                {#if contact.description}
                  <p class="text-xs text-base-content/70">{contact.description}</p>
                {/if}
              </div>
            </div>
          {/each}
          {#if userDirectory.filter(e => e.category === 'Emergency').length === 0}
            <div class="col-span-full text-center py-4 text-base-content/70">
              <p>No emergency contacts added yet.</p>
              <button class="btn btn-error btn-sm mt-2" on:click={() => goto('/directory/create?category=Emergency')}>
                Add Emergency Contact
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="directory" />

  </div>
</div>