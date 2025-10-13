<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { activities, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let selectedActivity = null;
  let statusUpdate = '';
  let voiceResult = '';
  let filter = 'all'; // all, physical, mental, social, learning

  // Get activity ID from URL params
  $: activityId = $page.url.searchParams.get('id');
  $: filter = $page.url.searchParams.get('filter') || 'all';

  // Filter activities based on user's roles and filter
  $: filteredActivities = $activities.filter(activity => {
    // Check if user can see this activity
    const canSee = activity.applicable_roles.includes($userProfile.role) ||
                   activity.applicable_roles.includes('All');

    if (!canSee) return false;

    // Apply type filter
    if (filter === 'physical') return activity.type === 'Physical';
    if (filter === 'mental') return activity.type === 'Mental';
    if (filter === 'social') return activity.type === 'Social';
    if (filter === 'learning') return activity.type === 'Learning';

    return true;
  });

  // Find selected activity
  $: selectedActivity = activityId ? $activities.find(a => a.id === activityId) : null;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('complete') || lowerResult.includes('done') || lowerResult.includes('finished')) {
      if (selectedActivity) {
        markActivityCompleted(selectedActivity.id);
      }
    } else if (lowerResult.includes('start') || lowerResult.includes('begin')) {
      if (selectedActivity) {
        markActivityStarted(selectedActivity.id);
      }
    } else if (lowerResult.includes('add comment') || lowerResult.includes('note')) {
      // Focus on comment input
      const commentInput = document.getElementById('statusUpdate');
      if (commentInput) commentInput.focus();
    }
  }

  async function markActivityCompleted(activityId) {
    const newStatus = 'Completed';

    try {
      // Update activity status
      activities.update(current => {
        return current.map(activity => {
          if (activity.id === activityId) {
            return {
              ...activity,
              status: newStatus,
              completed_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          }
          return activity;
        });
      });

      // Add status update to discussions
      if (statusUpdate.trim()) {
        const discussionEntry = {
          id: `discussion_${Date.now()}`,
          table_name: 'activities',
          record_id: activityId,
          author: $userProfile.name,
          author_role: $userProfile.role,
          message: `Activity completed: ${statusUpdate}`,
          created_at: new Date().toISOString()
        };

        discussions.update(current => [...current, discussionEntry]);
        statusUpdate = '';
      }

    } catch (error) {
      console.error('Error updating activity status:', error);
    }
  }

  async function markActivityStarted(activityId) {
    const newStatus = 'In Progress';

    try {
      // Update activity status
      activities.update(current => {
        return current.map(activity => {
          if (activity.id === activityId) {
            return {
              ...activity,
              status: newStatus,
              started_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          }
          return activity;
        });
      });

      // Add status update to discussions
      if (statusUpdate.trim()) {
        const discussionEntry = {
          id: `discussion_${Date.now()}`,
          table_name: 'activities',
          record_id: activityId,
          author: $userProfile.name,
          author_role: $userProfile.role,
          message: `Activity started: ${statusUpdate}`,
          created_at: new Date().toISOString()
        };

        discussions.update(current => [...current, discussionEntry]);
        statusUpdate = '';
      }

    } catch (error) {
      console.error('Error updating activity status:', error);
    }
  }

  function addComment() {
    if (!selectedActivity || !statusUpdate.trim()) return;

    const discussionEntry = {
      id: `discussion_${Date.now()}`,
      table_name: 'activities',
      record_id: selectedActivity.id,
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
  <title>Update Activities - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Update Activities" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update & Track Activities</h1>
        <p class="text-base-content/70">Monitor progress and update activity statuses</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'complete activity' or 'add comment'" />
        <button class="btn btn-primary" on:click={() => goto('/activities/create')}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Activity
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

      <!-- Activities List -->
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
                class="btn btn-sm {filter === 'physical' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'physical'}
              >
                Physical
              </button>
              <button
                class="btn btn-sm {filter === 'mental' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'mental'}
              >
                Mental
              </button>
              <button
                class="btn btn-sm {filter === 'social' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'social'}
              >
                Social
              </button>
              <button
                class="btn btn-sm {filter === 'learning' ? 'btn-primary' : 'btn-outline'}"
                on:click={() => filter = 'learning'}
              >
                Learning
              </button>
            </div>

            <!-- Activities List -->
            <div class="space-y-3 max-h-96 overflow-y-auto">
              {#each filteredActivities as activity}
                <div
                  class="card bg-base-200 cursor-pointer transition-all hover:shadow-md {selectedActivity?.id === activity.id ? 'ring-2 ring-primary' : ''}"
                  on:click={() => selectedActivity = activity}
                >
                  <div class="card-body p-4">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <h4 class="font-semibold">{activity.description}</h4>
                          <div class="badge {getTypeColor(activity.type)} badge-sm">{activity.type}</div>
                          <div class="badge {getPriorityColor(activity.priority)} badge-sm">{activity.priority}</div>
                          {#if activity.status}
                            <div class="badge {getStatusColor(activity.status)} badge-sm">{activity.status}</div>
                          {/if}
                        </div>
                        <div class="text-sm text-base-content/70 space-y-1">
                          <p>{activity.category} • {activity.participant} • {activity.frequency}</p>
                          <p>{activity.time_of_day} {#if activity.location}• {activity.location}{/if}</p>
                        </div>
                      </div>
                      <div class="flex flex-col items-end gap-2">
                        {#if activity.alert_enabled}
                          <Icon icon="heroicons:bell" class="w-4 h-4 text-warning" />
                        {/if}
                        {#if selectedActivity?.id === activity.id}
                          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-primary" />
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}

              {#if filteredActivities.length === 0}
                <div class="text-center py-8 text-base-content/70">
                  <Icon icon="heroicons:bolt" class="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No activities found with current filter.</p>
                </div>
              {/if}
            </div>

          </div>
        </div>
      </div>

      <!-- Activity Details & Actions -->
      <div>
        {#if selectedActivity}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">

              <h3 class="card-title">{selectedActivity.description}</h3>

              <div class="space-y-3">
                <div class="flex gap-2 flex-wrap">
                  <div class="badge {getTypeColor(selectedActivity.type)}">{selectedActivity.type}</div>
                  <div class="badge badge-outline">{selectedActivity.category}</div>
                  <div class="badge {getPriorityColor(selectedActivity.priority)}">{selectedActivity.priority}</div>
                  {#if selectedActivity.status}
                    <div class="badge {getStatusColor(selectedActivity.status)}">{selectedActivity.status}</div>
                  {/if}
                </div>

                <div class="text-sm space-y-1">
                  <p><strong>Participant:</strong> {selectedActivity.participant}</p>
                  <p><strong>Frequency:</strong> {selectedActivity.frequency}</p>
                  <p><strong>Time:</strong> {selectedActivity.time_of_day}</p>
                  {#if selectedActivity.location}
                    <p><strong>Location:</strong> {selectedActivity.location}</p>
                  {/if}
                  {#if selectedActivity.alert_enabled}
                    <p><strong>Alert:</strong> {selectedActivity.alert_time || 'Not set'} ({selectedActivity.alert_type})</p>
                  {/if}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-2 mt-4">
                <button
                  class="btn btn-success btn-sm"
                  on:click={() => markActivityCompleted(selectedActivity.id)}
                >
                  <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                  Mark Completed
                </button>

                <button
                  class="btn btn-info btn-sm"
                  on:click={() => markActivityStarted(selectedActivity.id)}
                >
                  <Icon icon="heroicons:play" class="w-4 h-4" />
                  Mark Started
                </button>

                <button
                  class="btn btn-warning btn-sm"
                  on:click={() => goto(`/activities/update?id=${selectedActivity.id}`)}
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
              <Icon icon="heroicons:bolt" class="w-12 h-12 mx-auto mb-2 text-base-content/50" />
              <p class="text-base-content/70">Select an activity to view details</p>
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- Discussion Forum -->
    {#if selectedActivity}
      <DiscussionForum tableName="activities" recordId={selectedActivity.id} />
    {/if}

  </div>
</div>