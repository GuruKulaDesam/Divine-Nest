<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { activities, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let searchTerm = '';
  let typeFilter = 'all';
  let categoryFilter = 'all';
  let priorityFilter = 'all';
  let statusFilter = 'all';
  let dateFrom = '';
  let dateTo = '';
  let sortBy = 'created_at';
  let sortOrder = 'desc';
  let voiceResult = '';

  // Filter and sort activities
  $: filteredActivities = $activities
    .filter(activity => {
      // Role-based access
      const canSee = activity.applicable_roles.includes($userProfile.role) ||
                     activity.applicable_roles.includes('All');
      if (!canSee) return false;

      // Search filter
      if (searchTerm && !activity.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !activity.participant.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !activity.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'all' && activity.type !== typeFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && activity.category !== categoryFilter) return false;

      // Priority filter
      if (priorityFilter !== 'all' && activity.priority !== priorityFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && activity.status !== statusFilter) return false;

      // Date range filter
      if (dateFrom && new Date(activity.created_at) < new Date(dateFrom)) return false;
      if (dateTo && new Date(activity.created_at) > new Date(dateTo)) return false;

      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('filter') || lowerResult.includes('show')) {
      if (lowerResult.includes('physical')) typeFilter = 'Physical';
      else if (lowerResult.includes('mental')) typeFilter = 'Mental';
      else if (lowerResult.includes('social')) typeFilter = 'Social';
      else if (lowerResult.includes('learning')) typeFilter = 'Learning';
    } else if (lowerResult.includes('search') || lowerResult.includes('find')) {
      // Extract search term
      const searchMatch = result.match(/(?:search|find)\s+(.+)/i);
      if (searchMatch) {
        searchTerm = searchMatch[1].trim();
      }
    }
  }

  function exportToCSV() {
    const headers = [
      'ID', 'Description', 'Type', 'Category', 'Participant', 'Frequency',
      'Time of Day', 'Location', 'Priority', 'Status', 'Alert Enabled',
      'Created Date', 'Updated Date'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredActivities.map(activity => [
        activity.id,
        `"${activity.description.replace(/"/g, '""')}"`,
        activity.type,
        activity.category,
        activity.participant,
        activity.frequency,
        activity.time_of_day,
        activity.location || '',
        activity.priority,
        activity.status || '',
        activity.alert_enabled ? 'Yes' : 'No',
        activity.created_at,
        activity.updated_at || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `activities_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(filteredActivities, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `activities_export_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function clearFilters() {
    searchTerm = '';
    typeFilter = 'all';
    categoryFilter = 'all';
    priorityFilter = 'all';
    statusFilter = 'all';
    dateFrom = '';
    dateTo = '';
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Completed': return 'badge-success';
      case 'In Progress': return 'badge-info';
      case 'Pending': return 'badge-warning';
      default: return 'badge-neutral';
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'Critical': return 'badge-error';
      case 'High': return 'badge-warning';
      case 'Medium': return 'badge-info';
      case 'Low': return 'badge-success';
      default: return 'badge-neutral';
    }
  }

  function getTypeColor(type) {
    switch (type) {
      case 'Physical': return 'badge-error';
      case 'Mental': return 'badge-info';
      case 'Social': return 'badge-success';
      case 'Learning': return 'badge-warning';
      default: return 'badge-neutral';
    }
  }
</script>

<svelte:head>
  <title>Activity History & Review - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Activity History & Review" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Activity History & Review</h1>
        <p class="text-base-content/70">Review and export your household activities</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'filter by physical' or 'search yoga'" />
        <button class="btn btn-primary" on:click={() => goto('/activities/create')}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Activity
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

    <!-- Filters -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <!-- Search -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <input
              type="text"
              placeholder="Description, participant, category..."
              class="input input-bordered"
              bind:value={searchTerm}
            />
          </div>

          <!-- Type Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type</span>
            </label>
            <select class="select select-bordered" bind:value={typeFilter}>
              <option value="all">All Types</option>
              <option value="Physical">Physical</option>
              <option value="Mental">Mental</option>
              <option value="Social">Social</option>
              <option value="Learning">Learning</option>
            </select>
          </div>

          <!-- Category Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select class="select select-bordered" bind:value={categoryFilter}>
              <option value="all">All Categories</option>
              <option value="Exercise">Exercise</option>
              <option value="Reading">Reading</option>
              <option value="Meditation">Meditation</option>
              <option value="Cooking">Cooking</option>
              <option value="Games">Games</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Social">Social</option>
              <option value="Learning">Learning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select class="select select-bordered" bind:value={priorityFilter}>
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          <!-- Status Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select class="select select-bordered" bind:value={statusFilter}>
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <!-- Date From -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Date From</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={dateFrom} />
          </div>

          <!-- Date To -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Date To</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={dateTo} />
          </div>

        </div>

        <!-- Sort Options -->
        <div class="flex flex-wrap gap-4 mt-4 items-end">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select class="select select-bordered" bind:value={sortBy}>
              <option value="created_at">Created Date</option>
              <option value="updated_at">Updated Date</option>
              <option value="description">Description</option>
              <option value="type">Type</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Order</span>
            </label>
            <select class="select select-bordered" bind:value={sortOrder}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <button class="btn btn-outline" on:click={clearFilters}>
            Clear Filters
          </button>
        </div>

      </div>
    </div>

    <!-- Results Summary & Export -->
    <div class="flex justify-between items-center">
      <p class="text-base-content/70">
        Showing {filteredActivities.length} of {$activities.length} activities
      </p>

      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm" on:click={exportToCSV}>
          <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
          Export CSV
        </button>
        <button class="btn btn-outline btn-sm" on:click={exportToJSON}>
          <Icon icon="heroicons:document-arrow-down" class="w-4 h-4" />
          Export JSON
        </button>
      </div>
    </div>

    <!-- Activities Table -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body p-0">

        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th>Participant</th>
                <th>Frequency</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Alerts</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredActivities as activity}
                <tr class="hover">
                  <td>
                    <div>
                      <div class="font-medium">{activity.description}</div>
                      {#if activity.location}
                        <div class="text-sm text-base-content/70">{activity.location}</div>
                      {/if}
                    </div>
                  </td>
                  <td>
                    <div class="badge {getTypeColor(activity.type)} badge-sm">{activity.type}</div>
                  </td>
                  <td>{activity.category}</td>
                  <td>{activity.participant}</td>
                  <td>{activity.frequency}</td>
                  <td>
                    <div class="badge {getPriorityColor(activity.priority)} badge-sm">{activity.priority}</div>
                  </td>
                  <td>
                    {#if activity.status}
                      <div class="badge {getStatusColor(activity.status)} badge-sm">{activity.status}</div>
                    {:else}
                      <span class="text-base-content/50">-</span>
                    {/if}
                  </td>
                  <td>
                    {#if activity.alert_enabled}
                      <Icon icon="heroicons:bell" class="w-4 h-4 text-warning" />
                    {:else}
                      <span class="text-base-content/50">-</span>
                    {/if}
                  </td>
                  <td>
                    <div class="text-sm">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-1">
                      <button
                        class="btn btn-ghost btn-xs"
                        on:click={() => goto(`/activities/update?id=${activity.id}`)}
                      >
                        <Icon icon="heroicons:pencil" class="w-3 h-3" />
                      </button>
                      <button
                        class="btn btn-ghost btn-xs"
                        on:click={() => goto(`/activities/update?id=${activity.id}`)}
                      >
                        <Icon icon="heroicons:eye" class="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        {#if filteredActivities.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:bolt" class="w-12 h-12 mx-auto mb-4 text-base-content/50" />
            <p class="text-base-content/70">No activities found matching your criteria.</p>
            <button class="btn btn-primary mt-4" on:click={() => goto('/activities/create')}>
              Create Your First Activity
            </button>
          </div>
        {/if}

      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="activities" />

  </div>
</div>