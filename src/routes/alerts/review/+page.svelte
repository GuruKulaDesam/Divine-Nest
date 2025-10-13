<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { alerts, alertsDiscussions as discussions, alertsVoiceCommands as voiceCommands } from '$lib/stores/alerts';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let searchTerm = '';
  let typeFilter = 'all';
  let priorityFilter = 'all';
  let statusFilter = 'all';
  let dateFrom = '';
  let dateTo = '';
  let sortBy = 'trigger_date';
  let sortOrder = 'desc';
  let voiceResult = '';

  // Filter and sort alerts
  $: filteredAlerts = $alerts
    .filter(alert => {
      // Role-based access
      const canSee = alert.applicable_roles.includes($userProfile.role) ||
                     alert.applicable_roles.includes('All');
      if (!canSee) return false;

      // Search filter
      if (searchTerm && !alert.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !alert.message.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'all' && alert.type !== typeFilter) return false;

      // Priority filter
      if (priorityFilter !== 'all' && alert.priority !== priorityFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && alert.status !== statusFilter) return false;

      // Date range filter
      if (dateFrom && new Date(alert.trigger_date) < new Date(dateFrom)) return false;
      if (dateTo && new Date(alert.trigger_date) > new Date(dateTo)) return false;

      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'trigger_date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortBy === 'created_at' || sortBy === 'updated_at') {
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
      if (lowerResult.includes('reminder')) typeFilter = 'Reminder';
      else if (lowerResult.includes('alarm')) typeFilter = 'Alarm';
      else if (lowerResult.includes('notification')) typeFilter = 'Notification';
      else if (lowerResult.includes('active')) statusFilter = 'Active';
      else if (lowerResult.includes('dismissed')) statusFilter = 'Dismissed';
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
      'ID', 'Title', 'Type', 'Message', 'Priority', 'Status', 'Trigger Date',
      'Trigger Time', 'Repeat Interval', 'Location Trigger', 'Sound Enabled',
      'Vibration Enabled', 'Created Date', 'Updated Date'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredAlerts.map(alert => [
        alert.id,
        `"${alert.title.replace(/"/g, '""')}"`,
        alert.type,
        `"${(alert.message || '').replace(/"/g, '""')}"`,
        alert.priority,
        alert.status,
        alert.trigger_date,
        alert.trigger_time,
        alert.repeat_interval || '',
        alert.location_trigger || '',
        alert.sound_enabled ? 'Yes' : 'No',
        alert.vibration_enabled ? 'Yes' : 'No',
        alert.created_at,
        alert.updated_at || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `alerts_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(filteredAlerts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `alerts_export_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function clearFilters() {
    searchTerm = '';
    typeFilter = 'all';
    priorityFilter = 'all';
    statusFilter = 'all';
    dateFrom = '';
    dateTo = '';
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'Dismissed': return 'badge-neutral';
      case 'Snoozed': return 'badge-warning';
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
      case 'Alarm': return 'badge-error';
      case 'Reminder': return 'badge-info';
      case 'Notification': return 'badge-success';
      default: return 'badge-neutral';
    }
  }

  function isOverdue(alert) {
    if (alert.status !== 'Active') return false;
    const triggerDateTime = new Date(`${alert.trigger_date}T${alert.trigger_time}`);
    const now = new Date();
    return triggerDateTime < now;
  }
</script>

<svelte:head>
  <title>Alert History & Review - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <Breadcrumb currentPage="Alert History & Review" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Alert History & Review</h1>
        <p class="text-base-content/70">Review and export your household alerts</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'filter by reminders' or 'search meeting'" />
        <button class="btn btn-primary" on:click={() => goto('/alerts/create')}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Alert
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
              placeholder="Title, message..."
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
              <option value="Reminder">Reminder</option>
              <option value="Alarm">Alarm</option>
              <option value="Notification">Notification</option>
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

          <!-- Status Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select class="select select-bordered" bind:value={statusFilter}>
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Dismissed">Dismissed</option>
              <option value="Snoozed">Snoozed</option>
            </select>
          </div>

        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          <!-- Date From -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Trigger Date From</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={dateFrom} />
          </div>

          <!-- Date To -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Trigger Date To</span>
            </label>
            <input type="date" class="input input-bordered" bind:value={dateTo} />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Sort By</span>
            </label>
            <select class="select select-bordered" bind:value={sortBy}>
              <option value="trigger_date">Trigger Date</option>
              <option value="created_at">Created Date</option>
              <option value="updated_at">Updated Date</option>
              <option value="title">Title</option>
              <option value="type">Type</option>
              <option value="priority">Priority</option>
            </select>
          </div>

        </div>

        <!-- Sort Order and Clear -->
        <div class="flex flex-wrap gap-4 mt-4 items-end">
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
        Showing {filteredAlerts.length} of {$alerts.length} alerts
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

    <!-- Alerts Table -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body p-0">

        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Trigger Date</th>
                <th>Trigger Time</th>
                <th>Repeat</th>
                <th>Location</th>
                <th>Sound</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredAlerts as alert}
                <tr class="hover {isOverdue(alert) ? 'bg-error/10' : ''}">
                  <td>
                    <div>
                      <div class="font-medium">{alert.title}</div>
                      {#if alert.message}
                        <div class="text-sm text-base-content/70">{alert.message}</div>
                      {/if}
                    </div>
                  </td>
                  <td>
                    <div class="badge {getTypeColor(alert.type)} badge-sm">{alert.type}</div>
                  </td>
                  <td>
                    <div class="badge {getPriorityColor(alert.priority)} badge-sm">{alert.priority}</div>
                  </td>
                  <td>
                    <div class="badge {getStatusColor(alert.status)} badge-sm">{alert.status}</div>
                    {#if isOverdue(alert)}
                      <div class="badge badge-error badge-sm ml-1">Overdue</div>
                    {/if}
                  </td>
                  <td>
                    <div class="text-sm">
                      {new Date(alert.trigger_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td>{alert.trigger_time}</td>
                  <td>{alert.repeat_interval || '-'}</td>
                  <td>
                    {#if alert.location_trigger}
                      <span class="text-sm">📍 {alert.location_trigger}</span>
                    {:else}
                      <span class="text-base-content/50">-</span>
                    {/if}
                  </td>
                  <td>
                    {#if alert.sound_enabled}
                      <Icon icon="heroicons:speaker-wave" class="w-4 h-4 text-success" />
                    {:else}
                      <span class="text-base-content/50">-</span>
                    {/if}
                  </td>
                  <td>
                    <div class="flex gap-1">
                      <button
                        class="btn btn-ghost btn-xs"
                        on:click={() => goto(`/alerts/update?id=${alert.id}`)}
                      >
                        <Icon icon="heroicons:pencil" class="w-3 h-3" />
                      </button>
                      <button
                        class="btn btn-ghost btn-xs"
                        on:click={() => goto(`/alerts/update?id=${alert.id}`)}
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

        {#if filteredAlerts.length === 0}
          <div class="text-center py-12">
            <Icon icon="heroicons:bell-alert" class="w-12 h-12 mx-auto mb-4 text-base-content/50" />
            <p class="text-base-content/70">No alerts found matching your criteria.</p>
            <button class="btn btn-primary mt-4" on:click={() => goto('/alerts/create')}>
              Create Your First Alert
            </button>
          </div>
        {/if}

      </div>
    </div>

    <!-- Discussion Forum -->
    <DiscussionForum tableName="alerts" />

  </div>
</div>