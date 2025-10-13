<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { issues } from '$lib/stores/issues';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

  let selectedIssue = null;
  let statusUpdate = '';
  let voiceResult = '';
  let filter = 'all'; // all, reported, assigned, in-progress, resolved

  // Get issue ID from URL params
  $: issueId = $page.url.searchParams.get('id');
  $: filter = $page.url.searchParams.get('filter') || 'all';

  // Filter issues based on user's roles and filter
  $: filteredIssues = $issues.filter(issue => {
    // Check if user can see this issue
    const canSee = issue.applicable_roles.includes($userProfile.role) ||
                   issue.applicable_roles.includes('All');

    if (!canSee) return false;

    // Apply status filter
    if (filter === 'reported') return issue.status === 'Reported';
    if (filter === 'assigned') return issue.status === 'Assigned';
    if (filter === 'in-progress') return issue.status === 'In Progress';
    if (filter === 'resolved') return issue.status === 'Resolved';

    return true;
  });

  // Find selected issue
  $: selectedIssue = issueId ? $issues.find(i => i.id === issueId) : null;

  // Voice command handler
  function handleVoiceCommand(result) {
    voiceResult = result;
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('resolve') || lowerResult.includes('fix') || lowerResult.includes('complete')) {
      if (selectedIssue) {
        updateIssueStatus(selectedIssue.id, 'Resolved');
      }
    } else if (lowerResult.includes('assign') || lowerResult.includes('start')) {
      if (selectedIssue) {
        updateIssueStatus(selectedIssue.id, 'Assigned');
      }
    } else if (lowerResult.includes('work on') || lowerResult.includes('begin')) {
      if (selectedIssue) {
        updateIssueStatus(selectedIssue.id, 'In Progress');
      }
    } else if (lowerResult.includes('comment') || lowerResult.includes('note') || lowerResult.includes('update')) {
      // Extract comment
      const commentMatch = result.match(/(?:comment|note|update|add)\s+(.+)/i);
      if (commentMatch) {
        statusUpdate = commentMatch[1].trim();
      }
    }
  }

  function selectIssue(issue) {
    selectedIssue = issue;
    // Update URL without navigation
    const url = new URL($page.url);
    url.searchParams.set('id', issue.id);
    goto(url.toString(), { replaceState: true });
  }

  async function updateIssueStatus(issueId, newStatus) {
    try {
      issues.update(currentIssues => {
        return currentIssues.map(issue => {
          if (issue.id === issueId) {
            return {
              ...issue,
              status: newStatus,
              updated_at: new Date().toISOString(),
              ...(newStatus === 'Resolved' && { resolved_at: new Date().toISOString() })
            };
          }
          return issue;
        });
      });

      // Add status update to discussions if there's a comment
      if (statusUpdate.trim()) {
        // Note: In a real implementation, this would add to a discussions store
        console.log(`Status updated to ${newStatus}: ${statusUpdate}`);
        statusUpdate = '';
      }

    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  }

  function addComment() {
    if (!selectedIssue || !statusUpdate.trim()) return;

    // Note: In a real implementation, this would add to a discussions store
    console.log(`Comment added: ${statusUpdate}`);
    statusUpdate = '';
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Resolved': return 'badge-success';
      case 'In Progress': return 'badge-info';
      case 'Assigned': return 'badge-warning';
      case 'Reported': return 'badge-neutral';
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

  function getCategoryColor(category) {
    switch (category) {
      case 'Emergency': return 'badge-error';
      case 'Urgents': return 'badge-warning';
      case 'Repairs': return 'badge-info';
      case 'Maintenance': return 'badge-success';
      case 'Upgrades': return 'badge-primary';
      case 'Other': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }
</script>

<svelte:head>
  <title>Update Issues - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">

    <Breadcrumb currentPage="Update Issues" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update Issues</h1>
        <p class="text-base-content/70">Track and update issue status and resolution progress</p>
      </div>
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'resolve issue' or 'add comment'" />
    </div>

    <!-- Voice Result -->
    {#if voiceResult}
      <div class="alert alert-info mb-4">
        <Icon icon="heroicons:chat-bubble-left" class="w-5 h-5" />
        <span>{voiceResult}</span>
      </div>
    {/if}

    <!-- Filter Tabs -->
    <div class="tabs tabs-boxed mb-6">
      <a href="?filter=all" class="tab {filter === 'all' ? 'tab-active' : ''}">All Issues ({$issues.length})</a>
      <a href="?filter=reported" class="tab {filter === 'reported' ? 'tab-active' : ''}">Reported ({$issues.filter(i => i.status === 'Reported').length})</a>
      <a href="?filter=assigned" class="tab {filter === 'assigned' ? 'tab-active' : ''}">Assigned ({$issues.filter(i => i.status === 'Assigned').length})</a>
      <a href="?filter=in-progress" class="tab {filter === 'in-progress' ? 'tab-active' : ''}">In Progress ({$issues.filter(i => i.status === 'In Progress').length})</a>
      <a href="?filter=resolved" class="tab {filter === 'resolved' ? 'tab-active' : ''}">Resolved ({$issues.filter(i => i.status === 'Resolved').length})</a>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Issues List -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Issues List</h3>

            <div class="space-y-4 max-h-96 overflow-y-auto">
              {#each filteredIssues as issue}
                <div
                  class="card cursor-pointer transition-all {selectedIssue?.id === issue.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}"
                  on:click={() => selectIssue(issue)}
                  role="button"
                  tabindex="0"
                  on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectIssue(issue); } }}
                >
                  <div class="card-body p-4">
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <h4 class="font-semibold">{issue.description}</h4>
                        <div class="flex flex-wrap gap-2 mt-2">
                          <span class="badge {getCategoryColor(issue.category)}">{issue.category}</span>
                          <span class="badge {getPriorityColor(issue.priority)}">{issue.priority}</span>
                          <span class="badge {getStatusColor(issue.status)}">{issue.status}</span>
                        </div>
                        <div class="text-sm text-base-content/70 mt-2">
                          <p>Contact: {issue.contact}</p>
                          {#if issue.location_address}
                            <p>Location: {issue.location_address}</p>
                          {/if}
                          {#if issue.preferred_resolution_date}
                            <p>Preferred: {new Date(issue.preferred_resolution_date).toLocaleDateString()}</p>
                          {/if}
                        </div>
                      </div>
                      <div class="text-right text-sm text-base-content/60">
                        {new Date(issue.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}

              {#if filteredIssues.length === 0}
                <div class="text-center py-8">
                  <Icon icon="heroicons:exclamation-circle" class="w-12 h-12 text-base-content/30 mx-auto mb-4" />
                  <p class="text-base-content/70">No issues found with the current filter.</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Issue Details & Actions -->
      <div>
        {#if selectedIssue}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Issue Details</h3>

              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-lg">{selectedIssue.description}</h4>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="badge {getCategoryColor(selectedIssue.category)}">{selectedIssue.category}</span>
                    <span class="badge {getPriorityColor(selectedIssue.priority)}">{selectedIssue.priority}</span>
                    <span class="badge {getStatusColor(selectedIssue.status)}">{selectedIssue.status}</span>
                  </div>
                </div>

                <div class="divider"></div>

                <div class="space-y-2 text-sm">
                  <p><strong>Type:</strong> {selectedIssue.type}</p>
                  {#if selectedIssue.sub_category}
                    <p><strong>Sub-category:</strong> {selectedIssue.sub_category}</p>
                  {/if}
                  <p><strong>Contact:</strong> {selectedIssue.contact}</p>
                  {#if selectedIssue.assigned_to}
                    <p><strong>Assigned to:</strong> {selectedIssue.assigned_to}</p>
                  {/if}
                  {#if selectedIssue.location_address}
                    <p><strong>Location:</strong> {selectedIssue.location_address}</p>
                  {/if}
                  {#if selectedIssue.preferred_resolution_date}
                    <p><strong>Preferred Resolution:</strong> {new Date(selectedIssue.preferred_resolution_date).toLocaleDateString()}</p>
                  {/if}
                  <p><strong>Created:</strong> {new Date(selectedIssue.created_at).toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(selectedIssue.updated_at).toLocaleDateString()}</p>
                </div>

                <div class="divider"></div>

                <!-- Status Update Actions -->
                <div class="space-y-2">
                  <h4 class="font-semibold">Update Status</h4>
                  <div class="flex flex-wrap gap-2">
                    {#if selectedIssue.status !== 'Reported'}
                      <button
                        class="btn btn-outline btn-sm"
                        on:click={() => updateIssueStatus(selectedIssue.id, 'Reported')}
                      >
                        Mark Reported
                      </button>
                    {/if}
                    {#if selectedIssue.status !== 'Assigned'}
                      <button
                        class="btn btn-outline btn-sm"
                        on:click={() => updateIssueStatus(selectedIssue.id, 'Assigned')}
                      >
                        Assign
                      </button>
                    {/if}
                    {#if selectedIssue.status !== 'In Progress'}
                      <button
                        class="btn btn-info btn-sm"
                        on:click={() => updateIssueStatus(selectedIssue.id, 'In Progress')}
                      >
                        Start Work
                      </button>
                    {/if}
                    {#if selectedIssue.status !== 'Resolved'}
                      <button
                        class="btn btn-success btn-sm"
                        on:click={() => updateIssueStatus(selectedIssue.id, 'Resolved')}
                      >
                        Resolve
                      </button>
                    {/if}
                  </div>
                </div>

                <!-- Add Comment -->
                <div class="space-y-2">
                  <h4 class="font-semibold">Add Update/Comment</h4>
                  <textarea
                    class="textarea textarea-bordered w-full"
                    placeholder="Add a status update or comment..."
                    bind:value={statusUpdate}
                    rows="3"
                  ></textarea>
                  <button
                    class="btn btn-primary btn-sm"
                    disabled={!statusUpdate.trim()}
                    on:click={addComment}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <Icon icon="heroicons:document-text" class="w-12 h-12 text-base-content/30 mx-auto mb-4" />
              <h3 class="font-semibold text-base-content/70">Select an Issue</h3>
              <p class="text-sm text-base-content/50">Choose an issue from the list to view details and update status</p>
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- Discussion Forum -->
    {#if selectedIssue}
      <DiscussionForum tableName="issues" recordId={selectedIssue.id} />
    {/if}

  </div>
</div>