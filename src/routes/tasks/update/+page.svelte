<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { tasks, discussions, voiceCommands } from '$lib/stores/tables';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let selectedTask = null;
  let statusUpdate = '';
  let voiceResult = '';
  let filter = 'all'; // all, pending, in-progress, completed

  // Get task ID from URL params
  $: taskId = $page.url.searchParams.get('id');
  $: filter = $page.url.searchParams.get('filter') || 'all';

  // Filter tasks based on user's roles and filter
  $: filteredTasks = $tasks.filter(task => {
    // Check if user can see this task
    const canSee = task.applicable_roles.includes($userProfile.role) ||
                   task.applicable_roles.includes('All');

    if (!canSee) return false;

    // Apply status filter
    if (filter === 'pending') return task.status === 'Pending';
    if (filter === 'in-progress') return task.status === 'In Progress';
    if (filter === 'completed') return task.status === 'Completed';

    return true;
  });

  // Find selected task
  $: selectedTask = taskId ? $tasks.find(t => t.id === taskId) : null;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('complete') || lowerResult.includes('done')) {
      if (selectedTask) {
        updateTaskStatus(selectedTask.id, 'Completed');
      }
    } else if (lowerResult.includes('start') || lowerResult.includes('begin')) {
      if (selectedTask) {
        updateTaskStatus(selectedTask.id, 'In Progress');
      }
    } else if (lowerResult.includes('comment') || lowerResult.includes('note')) {
      // Extract comment
      const commentMatch = result.match(/(?:comment|note|add)\s+(.+)/i);
      if (commentMatch) {
        statusUpdate = commentMatch[1].trim();
      }
    }
  }

  function selectTask(task) {
    selectedTask = task;
    // Update URL without navigation
    const url = new URL($page.url);
    url.searchParams.set('id', task.id);
    goto(url.toString(), { replaceState: true });
  }

  async function updateTaskStatus(taskId, newStatus) {
    try {
      tasks.update(currentTasks => {
        return currentTasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              status: newStatus,
              updated_at: new Date().toISOString(),
              ...(newStatus === 'Completed' && { completed_at: new Date().toISOString() })
            };
          }
          return task;
        });
      });

      // Add status update to discussions
      if (statusUpdate.trim()) {
        const discussionEntry = {
          id: `discussion_${Date.now()}`,
          table_name: 'tasks',
          record_id: taskId,
          author: $userProfile.name,
          author_role: $userProfile.role,
          message: `Status updated to ${newStatus}: ${statusUpdate}`,
          created_at: new Date().toISOString()
        };

        discussions.update(current => [...current, discussionEntry]);
        statusUpdate = '';
      }

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  function addComment() {
    if (!selectedTask || !statusUpdate.trim()) return;

    const discussionEntry = {
      id: `discussion_${Date.now()}`,
      table_name: 'tasks',
      record_id: selectedTask.id,
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
</script>

<svelte:head>
  <title>Update Tasks - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Update Tasks" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update & Track Tasks</h1>
        <p class="text-base-content/70">Monitor progress and update task statuses</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'complete task' or 'add comment'" />
        <button class="btn btn-primary" on:click={() => goto('/tasks/create')}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          Create Task
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

      <!-- Task List -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Tasks</h3>

            <!-- Filter Tabs -->
            <div class="tabs tabs-boxed mb-4">
              <a href="?filter=all" class="tab {filter === 'all' ? 'tab-active' : ''}">All</a>
              <a href="?filter=pending" class="tab {filter === 'pending' ? 'tab-active' : ''}">Pending</a>
              <a href="?filter=in-progress" class="tab {filter === 'in-progress' ? 'tab-active' : ''}">In Progress</a>
              <a href="?filter=completed" class="tab {filter === 'completed' ? 'tab-active' : ''}">Completed</a>
            </div>

            <!-- Task List -->
            <div class="space-y-2 max-h-96 overflow-y-auto">
              {#each filteredTasks as task}
                <div
                  class="p-3 border rounded-lg cursor-pointer transition-colors {selectedTask?.id === task.id ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary/50'}"
                  on:click={() => selectTask(task)}
                >
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium text-sm line-clamp-2">{task.description}</h4>
                    <div class="badge {getPriorityColor(task.priority)} badge-xs">{task.priority}</div>
                  </div>
                  <div class="flex justify-between items-center text-xs text-base-content/70">
                    <span>{task.assigned_to}</span>
                    <div class="badge {getStatusColor(task.status)} badge-xs">{task.status}</div>
                  </div>
                  {#if task.due_date}
                    <div class="text-xs text-base-content/70 mt-1">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </div>
                  {/if}
                </div>
              {/each}
              {#if filteredTasks.length === 0}
                <div class="text-center text-base-content/50 py-8">
                  No tasks found
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Task Details & Updates -->
      <div class="lg:col-span-2">
        {#if selectedTask}
          <div class="space-y-6">

            <!-- Task Details Card -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="card-title">{selectedTask.description}</h3>
                    <div class="flex gap-2 mt-2">
                      <div class="badge {getStatusColor(selectedTask.status)}">{selectedTask.status}</div>
                      <div class="badge {getPriorityColor(selectedTask.priority)}">{selectedTask.priority}</div>
                      {#if selectedTask.mandatory}
                        <div class="badge badge-warning">Mandatory</div>
                      {/if}
                    </div>
                  </div>
                  <div class="dropdown dropdown-end">
                    <button class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-4 h-4" />
                    </button>
                    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a on:click={() => updateTaskStatus(selectedTask.id, 'Pending')}>Mark as Pending</a></li>
                      <li><a on:click={() => updateTaskStatus(selectedTask.id, 'In Progress')}>Start Task</a></li>
                      <li><a on:click={() => updateTaskStatus(selectedTask.id, 'Completed')}>Mark as Completed</a></li>
                    </ul>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Type:</strong> {selectedTask.type}
                  </div>
                  <div>
                    <strong>Category:</strong> {selectedTask.category}
                  </div>
                  <div>
                    <strong>Assigned To:</strong> {selectedTask.assigned_to}
                  </div>
                  <div>
                    <strong>Frequency:</strong> {selectedTask.frequency}
                  </div>
                  {#if selectedTask.due_date}
                    <div>
                      <strong>Due Date:</strong> {new Date(selectedTask.due_date).toLocaleDateString()}
                    </div>
                  {/if}
                  {#if selectedTask.location}
                    <div>
                      <strong>Location:</strong> {selectedTask.location}
                    </div>
                  {/if}
                  {#if selectedTask.alert_enabled}
                    <div class="md:col-span-2">
                      <strong>Alerts:</strong> {selectedTask.alert_type} at {selectedTask.alert_time || 'scheduled time'}
                    </div>
                  {/if}
                </div>

                <!-- Quick Actions -->
                <div class="flex gap-2 mt-4">
                  {#if selectedTask.status !== 'Completed'}
                    <button
                      class="btn btn-success btn-sm"
                      on:click={() => updateTaskStatus(selectedTask.id, 'Completed')}
                    >
                      <Icon icon="heroicons:check" class="w-4 h-4" />
                      Complete
                    </button>
                  {/if}
                  {#if selectedTask.status === 'Pending'}
                    <button
                      class="btn btn-info btn-sm"
                      on:click={() => updateTaskStatus(selectedTask.id, 'In Progress')}
                    >
                      <Icon icon="heroicons:play" class="w-4 h-4" />
                      Start
                    </button>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Status Update -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h4 class="card-title">Add Status Update</h4>
                <div class="form-control">
                  <textarea
                    class="textarea textarea-bordered"
                    placeholder="Add a comment or status update..."
                    bind:value={statusUpdate}
                    rows="3"
                  ></textarea>
                </div>
                <div class="flex justify-end mt-2">
                  <button
                    class="btn btn-primary"
                    disabled={!statusUpdate.trim()}
                    on:click={addComment}
                  >
                    <Icon icon="heroicons:chat-bubble-left" class="w-4 h-4" />
                    Add Comment
                  </button>
                </div>
              </div>
            </div>

            <!-- Discussion Forum -->
            <DiscussionForum tableName="tasks" recordId={selectedTask.id} />

          </div>
        {:else}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center py-12">
              <Icon icon="heroicons:clipboard-document-list" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-base-content/70">Select a task to view details</h3>
              <p class="text-base-content/50">Choose a task from the list to update its status and add comments</p>
            </div>
          </div>
        {/if}
      </div>

    </div>

  </div>
</div>