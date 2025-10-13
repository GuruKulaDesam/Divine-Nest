<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // Redirect to dashboard as the main entry point
    goto('/alerts/dashboard', { replaceState: true });
  });
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="text-center">
    <div class="loading loading-spinner loading-lg text-primary"></div>
    <p class="mt-4 text-base-content/70">Loading Alerts Dashboard...</p>
  </div>
</div>
    const matchesStatus = !selectedStatus || alert.status === selectedStatus;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  // Get unique values for filters
  $: types = [...new Set(alerts.map(a => a.type))];
  $: priorities = [...new Set(alerts.map(a => a.priority))];
  $: statuses = [...new Set(alerts.map(a => a.status))];

  // Group alerts by status for display
  $: groupedAlerts = filteredAlerts.reduce((groups, alert) => {
    if (!groups[alert.status]) {
      groups[alert.status] = [];
    }
    groups[alert.status].push(alert);
    return groups;
  }, {});

  // Get icon for alert type
  function getAlertTypeIcon(type) {
    switch (type) {
      case 'Reminder': return 'heroicons:clock';
      case 'Festival': return 'heroicons:sparkles';
      case 'Emergency': return 'heroicons:exclamation-triangle';
      case 'Health': return 'heroicons:heart';
      case 'Finance': return 'heroicons:currency-dollar';
      case 'Maintenance': return 'heroicons:wrench-screwdriver';
      case 'Birthday': return 'heroicons:cake';
      case 'Custom': return 'heroicons:bell';
      default: return 'heroicons:bell';
    }
  }

  // Get color for priority
  function getPriorityColor(priority) {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-base-content bg-base-200';
    }
  }

  // Get color for status
  function getStatusColor(status) {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-gray-600 bg-gray-100';
      case 'Completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-base-content bg-base-200';
    }
  }

  // Check if alert is overdue
  function isOverdue(alert) {
    const now = new Date();
    const triggerTime = new Date(alert.trigger_datetime);
    return triggerTime < now && alert.status === 'Active';
  }

  // Format trigger time for display
  function formatTriggerTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString();
  }
</script>

<svelte:head>
  <title>Alerts - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:bell-alert" class="w-8 h-8" />
          Alert Management
        </h1>
        <p class="text-base-content/70 mt-1">Manage reminders, notifications, and automated alerts</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingAlert = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Create Alert
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search alerts..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Type</span>
          </label>
          <select class="select select-bordered" bind:value={selectedType}>
            <option value="">All Types</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Priority</span>
          </label>
          <select class="select select-bordered" bind:value={selectedPriority}>
            <option value="">All Priorities</option>
            {#each priorities as priority}
              <option value={priority}>{priority}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select class="select select-bordered" bind:value={selectedStatus}>
            <option value="">All Statuses</option>
            {#each statuses as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Alerts by Status -->
    {#each Object.entries(groupedAlerts) as [status, statusAlerts]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon="heroicons:circle-stack" class="w-6 h-6" />
          {status} Alerts
          <span class="badge badge-primary badge-sm">{statusAlerts.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each statusAlerts as alert}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow {isOverdue(alert) ? 'border-l-4 border-l-red-500' : ''}">
              <div class="card-body">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-3">
                    <div class="avatar">
                      <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon icon={getAlertTypeIcon(alert.type)} class="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div class="flex-1">
                      <h3 class="card-title text-lg">{alert.title}</h3>
                      <p class="text-sm text-base-content/70 mb-2">{alert.message}</p>

                      <div class="flex flex-wrap gap-2 mb-3">
                        <span class="badge badge-sm {getPriorityColor(alert.priority)}">
                          {alert.priority}
                        </span>
                        <span class="badge badge-sm {getStatusColor(alert.status)}">
                          {alert.status}
                        </span>
                        <span class="badge badge-outline badge-sm">
                          {alert.type}
                        </span>
                      </div>

                      <div class="text-sm text-base-content/60 space-y-1">
                        <p><strong>Trigger:</strong> {formatTriggerTime(alert.trigger_datetime)}</p>
                        {#if alert.repeat_interval}
                          <p><strong>Repeat:</strong> {alert.repeat_interval}</p>
                        {/if}
                        {#if alert.location_trigger}
                          <p><strong>Location:</strong> {alert.location_trigger}</p>
                        {/if}
                      </div>

                      {#if isOverdue(alert)}
                        <div class="alert alert-error mt-3 py-2">
                          <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4" />
                          <span class="text-sm">Overdue!</span>
                        </div>
                      {/if}
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                      <li><a on:click={() => toggleAlertStatus(alert)}>
                        <Icon icon={alert.status === 'Active' ? 'heroicons:eye-slash' : 'heroicons:eye'} class="w-4 h-4" />
                        {alert.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </a></li>
                      <li><a on:click={() => editAlert(alert)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteAlert(alert)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <!-- Notification settings -->
                <div class="flex justify-between items-center pt-3 border-t border-base-300">
                  <div class="flex gap-4 text-sm text-base-content/60">
                    {#if alert.sound_enabled}
                      <span class="flex items-center gap-1">
                        <Icon icon="heroicons:speaker-wave" class="w-4 h-4" />
                        Sound
                      </span>
                    {/if}
                    {#if alert.vibration_enabled}
                      <span class="flex items-center gap-1">
                        <Icon icon="heroicons:phone" class="w-4 h-4" />
                        Vibrate
                      </span>
                    {/if}
                  </div>
                  <span class="text-xs text-base-content/50">
                    Created {new Date(alert.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredAlerts.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:bell" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No alerts found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedPriority || selectedStatus ? "Try adjusting your filters" : "Create your first alert to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-4">
        {editingAlert ? "Edit Alert" : "Create New Alert"}
      </h3>

      <form on:submit|preventDefault={saveAlert} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Reminder</option>
              <option>Festival</option>
              <option>Emergency</option>
              <option>Health</option>
              <option>Finance</option>
              <option>Maintenance</option>
              <option>Birthday</option>
              <option>Custom</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.priority} required>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Status *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.status} required>
              <option>Active</option>
              <option>Inactive</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Title *</span>
          </label>
          <input
            type="text"
            placeholder="Alert title..."
            class="input input-bordered"
            bind:value={formData.title}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Message *</span>
          </label>
          <textarea
            placeholder="Alert message..."
            class="textarea textarea-bordered"
            rows="3"
            bind:value={formData.message}
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Trigger Date *</span>
            </label>
            <input
              type="date"
              class="input input-bordered"
              bind:value={formData.trigger_date}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Trigger Time *</span>
            </label>
            <input
              type="time"
              class="input input-bordered"
              bind:value={formData.trigger_time}
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Repeat Interval</span>
            </label>
            <select class="select select-bordered" bind:value={formData.repeat_interval}>
              <option value="">No Repeat</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location Trigger</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Home, Office..."
              class="input input-bordered"
              bind:value={formData.location_trigger}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">User ID (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Specific user ID..."
            class="input input-bordered"
            bind:value={formData.user_id}
          />
        </div>

        <div class="form-group">
          <label class="label cursor-pointer">
            <span class="label-text">Enable Sound</span>
            <input type="checkbox" class="toggle toggle-primary" bind:checked={formData.sound_enabled} />
          </label>
        </div>

        <div class="form-group">
          <label class="label cursor-pointer">
            <span class="label-text">Enable Vibration</span>
            <input type="checkbox" class="toggle toggle-primary" bind:checked={formData.vibration_enabled} />
          </label>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingAlert ? "Update" : "Create"} Alert
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}