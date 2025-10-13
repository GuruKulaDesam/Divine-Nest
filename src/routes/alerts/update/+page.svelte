<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { alerts, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let selectedAlert = null;
  let statusUpdate = '';
  let voiceResult = '';
  let filter = 'all'; // all, active, overdue, dismissed

  // Get alert ID from URL params
  $: alertId = $page.url.searchParams.get('id');
  $: filter = $page.url.searchParams.get('filter') || 'all';

  // Filter alerts based on user's roles and filter
  $: filteredAlerts = $alerts.filter(alert => {
    // Check if user can see this alert
    const canSee = alert.applicable_roles.includes($userProfile.role) ||
                   alert.applicable_roles.includes('All');

    if (!canSee) return false;

    // Apply status filter
    if (filter === 'active') return alert.status === 'Active';
    if (filter === 'overdue') {
      if (alert.status !== 'Active') return false;
      const triggerDateTime = new Date(`${alert.trigger_date}T${alert.trigger_time}`);
      const now = new Date();
      return triggerDateTime < now;
    }
    if (filter === 'dismissed') return alert.status === 'Dismissed';

    return true;
  });

  // Find selected alert
  $: selectedAlert = alertId ? $alerts.find(a => a.id === alertId) : null;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('dismiss') || lowerResult.includes('acknowledge')) {
      if (selectedAlert) {
        dismissAlert(selectedAlert.id);
      }
    } else if (lowerResult.includes('snooze') || lowerResult.includes('remind later')) {
      if (selectedAlert) {
        snoozeAlert(selectedAlert.id);
      }
    } else if (lowerResult.includes('complete') || lowerResult.includes('done')) {
      if (selectedAlert) {
        dismissAlert(selectedAlert.id);
      }
    } else if (lowerResult.includes('add comment') || lowerResult.includes('note')) {
      // Focus on comment input
      const commentInput = document.getElementById('statusUpdate');
      if (commentInput) commentInput.focus();
    }
  }

  async function dismissAlert(alertId) {
    try {
      // Update alert status
      alerts.update(current => {
        return current.map(alert => {
          if (alert.id === alertId) {
            return {
              ...alert,
              status: 'Dismissed',
              dismissed_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          }
          return alert;
        });
      });

      // Add status update to discussions
      if (statusUpdate.trim()) {
        const discussionEntry = {
          id: `discussion_${Date.now()}`,
          table_name: 'alerts',
          record_id: alertId,
          author: $userProfile.name,
          author_role: $userProfile.role,
          message: `Alert dismissed: ${statusUpdate}`,
          created_at: new Date().toISOString()
        };

        discussions.update(current => [...current, discussionEntry]);
        statusUpdate = '';
      }

    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  }

  async function snoozeAlert(alertId) {
    try {
      // Calculate snooze time (15 minutes from now)
      const snoozeTime = new Date();
      snoozeTime.setMinutes(snoozeTime.getMinutes() + 15);

      // Update alert trigger time
      alerts.update(current => {
        return current.map(alert => {
          if (alert.id === alertId) {
            return {
              ...alert,
              trigger_date: snoozeTime.toISOString().split('T')[0],
              trigger_time: snoozeTime.toTimeString().substring(0, 5),
              updated_at: new Date().toISOString()
            };
          }
          return alert;
        });
      });

      // Add status update to discussions
      const discussionEntry = {
        id: `discussion_${Date.now()}`,
        table_name: 'alerts',
        record_id: alertId,
        author: $userProfile.name,
        author_role: $userProfile.role,
        message: `Alert snoozed for 15 minutes: ${statusUpdate}`,
        created_at: new Date().toISOString()
      };

      discussions.update(current => [...current, discussionEntry]);
      statusUpdate = '';

    } catch (error) {
      console.error('Error snoozing alert:', error);
    }
  }

  async function reactivateAlert(alertId) {
    try {
      // Update alert status back to active
      alerts.update(current => {
        return current.map(alert => {
          if (alert.id === alertId) {
            return {
              ...alert,
              status: 'Active',
              updated_at: new Date().toISOString()
            };
          }
          return alert;
        });
      });

      // Add status update to discussions
      if (statusUpdate.trim()) {
        const discussionEntry = {
          id: `discussion_${Date.now()}`,
          table_name: 'alerts',
          record_id: alertId,
          author: $userProfile.name,
          author_role: $userProfile.role,
          message: `Alert reactivated: ${statusUpdate}`,
          created_at: new Date().toISOString()
        };

        discussions.update(current => [...current, discussionEntry]);
        statusUpdate = '';
      }

    } catch (error) {
      console.error('Error reactivating alert:', error);
    }
  }

  function addComment() {
    if (!selectedAlert || !statusUpdate.trim()) return;

    const discussionEntry = {
      id: `discussion_${Date.now()}`,
      table_name: 'alerts',
      record_id: selectedAlert.id,
      author: $userProfile.name,
      author_role: $userProfile.role,
      message: statusUpdate,
      created_at: new Date().toISOString()
    };

    discussions.update(current => [...current, discussionEntry]);
    statusUpdate = '';
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
  <title>Update Alerts - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Update Alerts" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update & Manage Alerts</h1>
        <p class="text-base-content/70">Monitor progress and manage alert statuses</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'dismiss alert' or 'snooze alert'" />
        <button class="btn btn-primary" on:click={() => goto('/alerts/create')}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Alert
        </button>
      </div>
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info mb-4">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Alerts List -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">

            <!-- Filters -->
            <div class="flex flex-wrap gap-2 mb-4">
              <button
                class="btn btn-sm {filter === 'all' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'all'}
              >
                All
              </button>
              <button
                class="btn btn-sm {filter === 'active' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'active'}
              >
                Active
              </button>
              <button
                class="btn btn-sm {filter === 'overdue' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'overdue'}
              >
                Overdue
              </button>
              <button
                class="btn btn-sm {filter === 'dismissed' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'dismissed'}
              >
                Dismissed
              </button>
            </div>

            <!-- Alerts List -->
            <div class="space-y-3 max-h-96 overflow-y-auto">
              {#each filteredAlerts as alert}
                <div
                  class="card bg-base-200 cursor-pointer transition-all hover:shadow-md {selectedAlert?.id === alert.id ? 'ring-2 ring-primary' : ''} {isOverdue(alert) ? 'border-l-4 border-l-error' : ''}"
                  on:click={() => selectedAlert = alert}
                >
                  <div class="card-body p-4">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <h4 class="font-medium">{alert.title}</h4>
                          <div class="badge {getTypeColor(alert.type)} badge-sm">{alert.type}</div>
                          <div class="badge {getPriorityColor(alert.priority)} badge-sm">{alert.priority}</div>
                          <div class="badge {getStatusColor(alert.status)} badge-sm">{alert.status}</div>
                          {#if isOverdue(alert)}
                            <div class="badge badge-error badge-sm">Overdue</div>
                          {/if}
                        </div>
                        <div class="text-sm text-base-content/70 space-y-1">
                          <p>{alert.trigger_date} at {alert.trigger_time} {alert.repeat_interval ? `(${alert.repeat_interval})` : ''}</p>
                          {#if alert.message}
                            <p>{alert.message}</p>
                          {/if}
                          {#if alert.location_trigger}
                            <p>📍 {alert.location_trigger}</p>
                          {/if}
                        </div>
                      </div>
                      <div class="flex flex-col items-end gap-2">
                        {#if alert.sound_enabled}
                          <Icon icon="heroicons:speaker-wave" class="w-4 h-4 text-base-content/60" />
                        {/if}
                        {#if selectedAlert?.id === alert.id}
                          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-primary" />
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}

              {#if filteredAlerts.length === 0}
                <div class="text-center py-8 text-base-content/70">
                  <Icon icon="heroicons:bell-alert" class="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No alerts found with current filter.</p>
                </div>
              {/if}
            </div>

          </div>
        </div>
      </div>

      <!-- Alert Details & Actions -->
      <div>
        {#if selectedAlert}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">

              <h3 class="card-title">{selectedAlert.title}</h3>

              <div class="space-y-3">
                <div class="flex gap-2 flex-wrap">
                  <div class="badge {getTypeColor(selectedAlert.type)}">{selectedAlert.type}</div>
                  <div class="badge {getPriorityColor(selectedAlert.priority)}">{selectedAlert.priority}</div>
                  <div class="badge {getStatusColor(selectedAlert.status)}">{selectedAlert.status}</div>
                  {#if isOverdue(selectedAlert)}
                    <div class="badge badge-error">Overdue</div>
                  {/if}
                </div>

                <div class="text-sm space-y-1">
                  <p><strong>Trigger:</strong> {selectedAlert.trigger_date} at {selectedAlert.trigger_time}</p>
                  {#if selectedAlert.repeat_interval}
                    <p><strong>Repeat:</strong> {selectedAlert.repeat_interval}</p>
                  {/if}
                  {#if selectedAlert.location_trigger}
                    <p><strong>Location:</strong> {selectedAlert.location_trigger}</p>
                  {/if}
                  {#if selectedAlert.message}
                    <p><strong>Message:</strong> {selectedAlert.message}</p>
                  {/if}
                </div>

                <div class="text-sm">
                  <p><strong>Sound:</strong> {selectedAlert.sound_enabled ? 'Enabled' : 'Disabled'}</p>
                  <p><strong>Vibration:</strong> {selectedAlert.vibration_enabled ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-2 mt-4">
                {#if selectedAlert.status === 'Active'}
                  <button
                    class="btn btn-success btn-sm"
                    on:click={() => dismissAlert(selectedAlert.id)}
                  >
                    <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                    Dismiss Alert
                  </button>

                  <button
                    class="btn btn-warning btn-sm"
                    on:click={() => snoozeAlert(selectedAlert.id)}
                  >
                    <Icon icon="heroicons:clock" class="w-4 h-4" />
                    Snooze 15min
                  </button>
                {:else if selectedAlert.status === 'Dismissed'}
                  <button
                    class="btn btn-info btn-sm"
                    on:click={() => reactivateAlert(selectedAlert.id)}
                  >
                    <Icon icon="heroicons:arrow-path" class="w-4 h-4" />
                    Reactivate
                  </button>
                {/if}

                <button
                  class="btn btn-warning btn-sm"
                  on:click={() => goto(`/alerts/update?id=${selectedAlert.id}`)}
                >
                  <Icon icon="heroicons:pencil" class="w-4 h-4" />
                  Edit Details
                </button>
              </div>

              <!-- Add Comment -->
              <div class="divider">Add Note</div>

              <div class="form-control">
                <textarea
                  id="statusUpdate"
                  placeholder="Add a note or update..."
                  class="textarea textarea-bordered"
                  bind:value={statusUpdate}
                ></textarea>
              </div>

              <button
                class="btn btn-outline btn-sm w-full"
                disabled={!statusUpdate.trim()}
                on:click={addComment}
              >
                <Icon icon="heroicons:chat-bubble-left" class="w-4 h-4" />
                Add Comment
              </button>

            </div>
          </div>
        {:else}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <Icon icon="heroicons:bell-alert" class="w-12 h-12 mx-auto mb-2 text-base-content/50" />
              <p class="text-base-content/70">Select an alert to view details</p>
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- Discussion Forum -->
    {#if selectedAlert}
      <DiscussionForum tableName="alerts" recordId={selectedAlert.id} />
    {/if}

  </div>
</div>