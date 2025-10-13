<script>
  import { onMount } from 'svelte';
  import { assets, assetActions } from '$lib/stores/assets';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  let currentUserRole = '';
  let assetsList = [];
  let categorySummary = {};
  let locationSummary = {};
  let recentAssets = [];

  // Voice command handler
  function handleVoiceCommand(command) {
    if (command.includes('add asset') || command.includes('புதிய சொத்து')) {
      window.location.href = '/assets/create';
    } else if (command.includes('view assets') || command.includes('சொத்துகளை பார்')) {
      window.location.href = '/assets/review';
    } else if (command.includes('recent assets') || command.includes('சமீபத்திய சொத்துகள்')) {
      // Scroll to recent assets section
      document.getElementById('recent-assets')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    // Subscribe to stores
    const unsubscribeAssets = assets.subscribe(value => {
      assetsList = value;
    });

    const unsubscribeUser = userProfile.subscribe(profile => {
      currentUserRole = profile.role || 'Child';
    });

    // Get analytics data
    categorySummary = assetActions.getCategorySummary();
    locationSummary = assetActions.getLocationSummary();
    recentAssets = assetActions.getRecentAssets(30);

    return () => {
      unsubscribeAssets();
      unsubscribeUser();
    };
  });

  // Filter assets based on user role
  $: filteredAssets = assetsList.filter(asset =>
    asset.applicable_roles.includes(currentUserRole)
  );

  // Calculate KPIs
  $: totalAssets = filteredAssets.length;
  $: uniqueCategories = new Set(filteredAssets.map(asset => asset.category)).size;
  $: uniqueLocations = new Set(filteredAssets.map(asset => asset.location).filter(Boolean)).size;
  $: uniqueOwners = new Set(filteredAssets.map(asset => asset.owner).filter(Boolean)).size;

  // Get top categories
  $: topCategories = Object.entries(categorySummary)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5);

  // Get top locations
  $: topLocations = Object.entries(locationSummary)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5);
</script>

<svelte:head>
  <title>Assets Dashboard - Divine-Nest</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
    <div>
      <h1 class="text-3xl font-bold text-primary">{$_('assets.dashboard.title')}</h1>
      <p class="text-base-content/70 mt-1">{$_('assets.dashboard.subtitle')}</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput
        placeholder={$_('assets.dashboard.voice_placeholder')}
        onResult={handleVoiceCommand}
        className="btn btn-outline btn-primary"
      />

      <a href="/assets/create" class="btn btn-primary">
        <Icon icon="mdi:plus" class="w-5 h-5" />
        {$_('assets.dashboard.add_asset')}
      </a>

      <a href="/assets/review" class="btn btn-outline">
        <Icon icon="mdi:view-list" class="w-5 h-5" />
        {$_('assets.dashboard.view_all')}
      </a>
    </div>
  </div>

  <!-- KPI Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Assets -->
    <div class="card bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('assets.dashboard.total_assets')}</h3>
            <p class="text-3xl font-bold">{totalAssets}</p>
          </div>
          <Icon icon="mdi:package-variant" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div class="card bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('assets.dashboard.categories')}</h3>
            <p class="text-3xl font-bold">{uniqueCategories}</p>
          </div>
          <Icon icon="mdi:tag-multiple" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>

    <!-- Locations -->
    <div class="card bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('assets.dashboard.locations')}</h3>
            <p class="text-3xl font-bold">{uniqueLocations}</p>
          </div>
          <Icon icon="mdi:map-marker-multiple" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>

    <!-- Owners -->
    <div class="card bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
      <div class="card-body p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">{$_('assets.dashboard.owners')}</h3>
            <p class="text-3xl font-bold">{uniqueOwners}</p>
          </div>
          <Icon icon="mdi:account-group" class="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Category Breakdown -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-xl mb-4">
          <Icon icon="mdi:chart-pie" class="w-6 h-6 text-green-500" />
          {$_('assets.dashboard.category_breakdown')}
        </h2>

        <div class="space-y-3">
          {#each topCategories as [category, data]}
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="badge badge-primary">{category}</div>
                <span class="font-medium">{data.count} items</span>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-70">
                  {((data.count / totalAssets) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Location Distribution -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-xl mb-4">
          <Icon icon="mdi:map" class="w-6 h-6 text-purple-500" />
          {$_('assets.dashboard.location_distribution')}
        </h2>

        <div class="space-y-3">
          {#each topLocations as [location, data]}
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
              <div class="flex items-center gap-3">
                <Icon icon="mdi:map-marker" class="w-5 h-5 text-base-content/60" />
                <span class="font-medium">{location}</span>
              </div>
              <div class="text-right">
                <span class="badge badge-outline">{data.count} items</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Assets -->
  <div class="card bg-base-100 shadow-xl mt-8" id="recent-assets">
    <div class="card-body">
      <h2 class="card-title text-xl mb-4">
        <Icon icon="mdi:clock-outline" class="w-6 h-6 text-blue-500" />
        {$_('assets.dashboard.recent_assets')}
      </h2>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>{$_('assets.dashboard.table.name')}</th>
              <th>{$_('assets.dashboard.table.category')}</th>
              <th>{$_('assets.dashboard.table.location')}</th>
              <th>{$_('assets.dashboard.table.owner')}</th>
              <th>{$_('assets.dashboard.table.date_added')}</th>
              <th>{$_('assets.dashboard.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {#each recentAssets.slice(0, 10) as asset}
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <div class="avatar placeholder">
                      <div class="bg-neutral text-neutral-content rounded-full w-8 h-8">
                        <span class="text-xs">{asset.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-semibold">{asset.name}</div>
                      {#if asset.description}
                        <div class="text-sm opacity-70 truncate max-w-xs" title={asset.description}>
                          {asset.description}
                        </div>
                      {/if}
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-outline">{asset.category}</span>
                </td>
                <td>{asset.location || 'Unknown'}</td>
                <td>{asset.owner || 'Unknown'}</td>
                <td>{new Date(asset.date_added).toLocaleDateString()}</td>
                <td>
                  <a href="/assets/update/{asset.id}" class="btn btn-sm btn-ghost">
                    <Icon icon="mdi:pencil" class="w-4 h-4" />
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if recentAssets.length === 0}
        <div class="text-center py-8">
          <Icon icon="mdi:package-variant-closed" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
          <p class="text-lg opacity-70">{$_('assets.dashboard.no_recent_assets')}</p>
          <a href="/assets/create" class="btn btn-primary mt-4">
            {$_('assets.dashboard.add_first_asset')}
          </a>
        </div>
      {/if}
    </div>
  </div>

  <!-- Discussion Forum -->
  <DiscussionForum
    tableName="assets_dashboard"
    recordId="general"
    title={$_('assets.dashboard.discussion_title')}
    placeholder={$_('assets.dashboard.discussion_placeholder')}
  />
</div>