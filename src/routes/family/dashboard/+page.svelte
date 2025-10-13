<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { Chart, registerables } from 'chart.js';
  import { family, familyDiscussions, familyVoiceCommands } from '$lib/stores/family';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  // Register Chart.js components
  Chart.register(...registerables);

  let categoryChart = null;
  let relationshipChart = null;
  let activityChart = null;

  // Voice command handler
  function handleVoiceCommand(result) {
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('add family member') || lowerResult.includes('create family entry')) {
      window.location.href = '/family/create';
    }

    if (lowerResult.includes('view family tree')) {
      // Could implement family tree view
    }

    if (lowerResult.includes('show relationships')) {
      // Could filter to relationship entries
    }
  }

  // Initialize charts when component mounts
  onMount(() => {
    initializeCharts();
  });

  function initializeCharts() {
    // Category distribution chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      const categoryData = $family.reduce((acc, member) => {
        acc[member.category] = (acc[member.category] || 0) + 1;
        return acc;
      }, {});

      categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(categoryData),
          datasets: [{
            data: Object.values(categoryData),
            backgroundColor: [
              '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
              '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
            ]
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

    // Relationship chart
    const relationshipCtx = document.getElementById('relationshipChart');
    if (relationshipCtx) {
      const relationshipData = $family.reduce((acc, member) => {
        acc[member.type] = (acc[member.type] || 0) + 1;
        return acc;
      }, {});

      relationshipChart = new Chart(relationshipCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(relationshipData),
          datasets: [{
            label: 'Family Members',
            data: Object.values(relationshipData),
            backgroundColor: '#3B82F6'
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

    // Activity timeline chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
      const last30Days = Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split('T')[0];
      });

      const activityData = last30Days.map(date => {
        return $family.filter(member =>
          member.created_at && member.created_at.startsWith(date)
        ).length;
      });

      activityChart = new Chart(activityCtx, {
        type: 'line',
        data: {
          labels: last30Days.map(date => new Date(date).toLocaleDateString()),
          datasets: [{
            label: 'Family Entries Added',
            data: activityData,
            borderColor: '#10B981',
            backgroundColor: '#10B98120',
            fill: true
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

  // Update charts when family data changes
  $: if ($family && categoryChart) {
    updateCharts();
  }

  function updateCharts() {
    // Update category chart
    if (categoryChart) {
      const categoryData = $family.reduce((acc, member) => {
        acc[member.category] = (acc[member.category] || 0) + 1;
        return acc;
      }, {});

      categoryChart.data.labels = Object.keys(categoryData);
      categoryChart.data.datasets[0].data = Object.values(categoryData);
      categoryChart.update();
    }

    // Update relationship chart
    if (relationshipChart) {
      const relationshipData = $family.reduce((acc, member) => {
        acc[member.type] = (acc[member.type] || 0) + 1;
        return acc;
      }, {});

      relationshipChart.data.labels = Object.keys(relationshipData);
      relationshipChart.data.datasets[0].data = Object.values(relationshipData);
      relationshipChart.update();
    }
  }

  // Statistics
  $: stats = {
    totalMembers: $family.length,
    categories: new Set($family.map(m => m.category)).size,
    relationships: new Set($family.map(m => m.type)).size,
    recentEntries: $family.filter(m =>
      new Date(m.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
    mediaItems: $family.filter(m => m.media_url).length
  };

  // Recent entries
  $: recentEntries = $family
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  // Family tree data (simplified)
  $: familyTree = $family.filter(m => m.category === 'Profile' && m.sub_category === 'Members');

  function createNew() {
    window.location.href = '/family/create';
  }

  function viewAll() {
    window.location.href = '/family/review';
  }

  function getCategoryIcon(category) {
    switch (category) {
      case 'Profile': return 'heroicons:user-group';
      case 'Wisdom': return 'heroicons:light-bulb';
      case 'Heritage': return 'heroicons:sparkles';
      case 'Tradition': return 'heroicons:fire';
      case 'Stories': return 'heroicons:book-open';
      case 'Legacy': return 'heroicons:trophy';
      case 'Success': return 'heroicons:check-circle';
      case 'Achievements': return 'heroicons:star';
      case 'Certifications': return 'heroicons:academic-cap';
      case 'Photos': return 'heroicons:photo';
      case 'Videos': return 'heroicons:video-camera';
      case 'Life Lessons': return 'heroicons:heart';
      case 'Rules': return 'heroicons:shield-check';
      case 'Virtues': return 'heroicons:sparkles';
      case 'Memories': return 'heroicons:clock';
      default: return 'heroicons:home';
    }
  }

  function getMediaTypeColor(mediaType) {
    switch (mediaType) {
      case 'Blog': return 'badge-primary';
      case 'Audio': return 'badge-secondary';
      case 'Photo': return 'badge-accent';
      case 'Video': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  }
</script>

<svelte:head>
  <title>Family Dashboard - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Family Dashboard" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Family Dashboard</h1>
        <p class="text-base-content/70">Manage family members, relationships, and heritage</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'add family member' or 'view family tree'" />
        <button class="btn btn-primary" on:click={createNew}>
          <Icon icon="heroicons:plus" class="w-4 h-4" />
          Add Member
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary/10 rounded-lg">
              <Icon icon="heroicons:user-group" class="w-6 h-6 text-primary" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.totalMembers}</div>
              <div class="text-sm text-base-content/70">Total Members</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-secondary/10 rounded-lg">
              <Icon icon="heroicons:tag" class="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.categories}</div>
              <div class="text-sm text-base-content/70">Categories</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-accent/10 rounded-lg">
              <Icon icon="heroicons:arrows-right-left" class="w-6 h-6 text-accent" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.relationships}</div>
              <div class="text-sm text-base-content/70">Relationships</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-info/10 rounded-lg">
              <Icon icon="heroicons:clock" class="w-6 h-6 text-info" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.recentEntries}</div>
              <div class="text-sm text-base-content/70">This Week</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-success/10 rounded-lg">
              <Icon icon="heroicons:photo" class="w-6 h-6 text-success" />
            </div>
            <div>
              <div class="text-2xl font-bold">{stats.mediaItems}</div>
              <div class="text-sm text-base-content/70">Media Items</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Category Distribution -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Category Distribution</h3>
          <div class="h-64">
            <canvas id="categoryChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Relationship Types -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Relationship Types</h3>
          <div class="h-64">
            <canvas id="relationshipChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Timeline -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <h3 class="card-title">Family Activity (Last 30 Days)</h3>
        <div class="h-64">
          <canvas id="activityChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Entries & Family Tree -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

      <!-- Recent Entries -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h3 class="card-title">Recent Entries</h3>
            <button class="btn btn-sm btn-outline" on:click={viewAll}>
              View All
              <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
            </button>
          </div>

          <div class="space-y-3">
            {#each recentEntries as entry}
              <div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                <div class="p-2 bg-primary/10 rounded-lg">
                  <Icon icon={getCategoryIcon(entry.category)} class="w-4 h-4 text-primary" />
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-sm">{entry.title}</div>
                  <div class="text-xs text-base-content/70">
                    {entry.category} • {new Date(entry.created_at).toLocaleDateString()}
                  </div>
                </div>
                {#if entry.media_type}
                  <span class={getMediaTypeColor(entry.media_type)}>{entry.media_type}</span>
                {/if}
              </div>
            {/each}
          </div>

          {#if recentEntries.length === 0}
            <div class="text-center py-8 text-base-content/70">
              <Icon icon="heroicons:document-text" class="w-8 h-8 mx-auto mb-2 opacity-50" />
              No recent entries
            </div>
          {/if}
        </div>
      </div>

      <!-- Family Tree Preview -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Family Members</h3>

          <div class="space-y-3">
            {#each familyTree.slice(0, 5) as member}
              <div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                <div class="avatar placeholder">
                  <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span class="text-xs">{member.title.charAt(0)}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-sm">{member.title}</div>
                  <div class="text-xs text-base-content/70">
                    {member.type} • {member.sub_category}
                  </div>
                </div>
              </div>
            {/each}
          </div>

          {#if familyTree.length === 0}
            <div class="text-center py-8 text-base-content/70">
              <Icon icon="heroicons:user-group" class="w-8 h-8 mx-auto mb-2 opacity-50" />
              No family members added yet
            </div>
          {/if}

          {#if familyTree.length > 5}
            <div class="text-center mt-4">
              <button class="btn btn-sm btn-outline" on:click={viewAll}>
                View All Members ({familyTree.length})
              </button>
            </div>
          {/if}
        </div>
      </div>

    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="family" />

  </div>
</div>