<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { requests } from '$lib/stores/requests';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let selectedRequest = null;
  let voiceResult = '';
  let isUpdating = false;
  let showSuccess = false;
  let filter = 'all';

  // Get request ID from URL params
  $: requestId = $page.url.searchParams.get('id');
  $: filter = $page.url.searchParams.get('filter') || 'all';

  // Find the selected request
  $: selectedRequest = requestId ? $requests.find(r => r.id === requestId) : null;

  // Filter requests based on URL parameter
  $: filteredRequests = $requests.filter(request => {
    if (filter === 'reported') return request.status === 'Reported';
    if (filter === 'assigned') return request.status === 'Assigned';
    if (filter === 'in-progress') return request.status === 'In Progress';
    if (filter === 'resolved') return request.status === 'Resolved';
    return true; // 'all'
  });

  // Check if user can update this request (based on roles)
  $: canUpdate = selectedRequest && (
    selectedRequest.applicable_roles.includes($userProfile.role) ||
    selectedRequest.applicable_roles.includes('All') ||
    $userProfile.role === 'Head' // Head can update all requests
  );

  function handleVoiceCommand(result) {
    voiceResult = result;
    // Process voice command for updating requests
    const lowerResult = result.toLowerCase();

    if (lowerResult.includes('assign to me') || lowerResult.includes('take this')) {
      if (selectedRequest && canUpdate) {
        updateRequestStatus('Assigned', $userProfile.name);
      }
    } else if (lowerResult.includes('start working') || lowerResult.includes('in progress')) {
      if (selectedRequest && canUpdate) {
        updateRequestStatus('In Progress');
      }
    } else if (lowerResult.includes('resolve') || lowerResult.includes('complete')) {
      if (selectedRequest && canUpdate) {
        updateRequestStatus('Resolved');
      }
    }
  }

  async function updateRequestStatus(newStatus, assignedTo = null) {
    if (!selectedRequest || !canUpdate) return;

    isUpdating = true;

    try {
      const updates = {
        status: newStatus,
        updated_at: new Date().toISOString(),
        assigned_to: assignedTo || selectedRequest.assigned_to
      };

      if (newStatus === 'Resolved') {
        updates.resolved_at = new Date().toISOString();
      }

      await updateRequest(selectedRequest.id, updates);

      showSuccess = true;
      setTimeout(() => {
        showSuccess = false;
      }, 3000);

    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error updating request. Please try again.');
    } finally {
      isUpdating = false;
    }
  }

  function selectRequest(request) {
    selectedRequest = request;
    // Update URL without triggering navigation
    const url = new URL(window.location);
    url.searchParams.set('id', request.id);
    window.history.replaceState({}, '', url);
  }

  function navigateToDashboard() {
    goto('/requests/dashboard');
  }

  function navigateToCreate() {
    goto('/requests/create');
  }

  function navigateToReview() {
    goto('/requests/review');
  }
</script>

<svelte:head>
  <title>Update Requests - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-base-content">Update Requests</h1>
        <p class="text-base-content/70">Manage request status and assignments</p>
      </div>
      <div class="flex gap-2">
        <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'assign to me' or 'mark as resolved'" />
        <button class="btn btn-primary" on:click={navigateToCreate}>
          <Icon icon="heroicons:plus" class="w-5 h-5" />
          New Request
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

    <!-- Success Message -->
    {#if showSuccess}
      <div class="alert alert-success">
        <Icon icon="heroicons:check-circle" class="w-5 h-5" />
        <span>Request updated successfully!</span>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Request List -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Requests</h3>

            <!-- Filter Tabs -->
            <div class="tabs tabs-boxed mb-4">
              <a href="?filter=all" class="tab {filter === 'all' ? 'tab-active' : ''}">All ({$requests.length})</a>
              <a href="?filter=reported" class="tab {filter === 'reported' ? 'tab-active' : ''}">Reported</a>
              <a href="?filter=assigned" class="tab {filter === 'assigned' ? 'tab-active' : ''}">Assigned</a>
              <a href="?filter=in-progress" class="tab {filter === 'in-progress' ? 'tab-active' : ''}">In Progress</a>
            </div>

            <div class="space-y-2 max-h-96 overflow-y-auto">
              {#each filteredRequests as request}
                <div
                  class="p-3 rounded-lg cursor-pointer transition-colors {selectedRequest?.id === request.id ? 'bg-primary/10 border border-primary' : 'bg-base-200 hover:bg-base-300'}"
                  on:click={() => selectRequest(request)}
                >
                  <div class="flex justify-between items-start">
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-sm truncate">{request.description}</p>
                      <p class="text-xs text-base-content/70">{request.contact}</p>
                      <div class="flex items-center gap-2 mt-1">
                        <div class="badge badge-xs {request.category === 'Emergency' ? 'badge-error' : request.category === 'Urgents' ? 'badge-warning' : request.category === 'Suggestion' ? 'badge-info' : 'badge-success'}">
                          {request.category}
                        </div>
                        <div class="badge badge-xs {request.status === 'Resolved' ? 'badge-success' : request.status === 'In Progress' ? 'badge-info' : request.status === 'Assigned' ? 'badge-warning' : 'badge-neutral'}">
                          {request.status}
                        </div>
                      </div>
                    </div>
                    {#if request.priority === 'High' || request.priority === 'Critical'}
                      <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 text-warning flex-shrink-0" />
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Request Details and Actions -->
      <div class="lg:col-span-2">
        {#if selectedRequest}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="card-title">{selectedRequest.description}</h3>
                  <div class="flex items-center gap-2 mt-2">
                    <div class="badge {selectedRequest.category === 'Emergency' ? 'badge-error' : selectedRequest.category === 'Urgents' ? 'badge-warning' : selectedRequest.category === 'Suggestion' ? 'badge-info' : 'badge-success'}">
                      {selectedRequest.category}
                    </div>
                    <div class="badge {selectedRequest.status === 'Resolved' ? 'badge-success' : selectedRequest.status === 'In Progress' ? 'badge-info' : selectedRequest.status === 'Assigned' ? 'badge-warning' : 'badge-neutral'}">
                      {selectedRequest.status}
                    </div>
                    <div class="badge badge-outline">
                      {selectedRequest.priority} Priority
                    </div>
                  </div>
                </div>
                {#if !canUpdate}
                  <div class="badge badge-warning">Read Only</div>
                {/if}
              </div>

              <!-- Request Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p class="text-sm text-base-content/70">Contact</p>
                  <p class="font-medium">{selectedRequest.contact}</p>
                </div>
                <div>
                  <p class="text-sm text-base-content/70">Affected Audience</p>
                  <p class="font-medium">{selectedRequest.affected_audience}</p>
                </div>
                <div>
                  <p class="text-sm text-base-content/70">Created</p>
                  <p class="font-medium">{new Date(selectedRequest.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p class="text-sm text-base-content/70">Location</p>
                  <p class="font-medium">{selectedRequest.location || 'Not specified'}</p>
                </div>
                {#if selectedRequest.assigned_to}
                  <div>
                    <p class="text-sm text-base-content/70">Assigned To</p>
                    <p class="font-medium">{selectedRequest.assigned_to}</p>
                  </div>
                {/if}
                {#if selectedRequest.resolved_at}
                  <div>
                    <p class="text-sm text-base-content/70">Resolved At</p>
                    <p class="font-medium">{new Date(selectedRequest.resolved_at).toLocaleString()}</p>
                  </div>
                {/if}
              </div>

              <!-- Action Buttons -->
              {#if canUpdate}
                <div class="flex flex-wrap gap-2 mb-4">
                  {#if selectedRequest.status === 'Reported'}
                    <button
                      class="btn btn-primary"
                      on:click={() => updateRequestStatus('Assigned', $userProfile.name)}
                      disabled={isUpdating}
                    >
                      {#if isUpdating}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        <Icon icon="heroicons:user-plus" class="w-4 h-4" />
                      {/if}
                      Assign to Me
                    </button>
                  {/if}

                  {#if selectedRequest.status === 'Assigned' || selectedRequest.status === 'Reported'}
                    <button
                      class="btn btn-info"
                      on:click={() => updateRequestStatus('In Progress')}
                      disabled={isUpdating}
                    >
                      {#if isUpdating}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        <Icon icon="heroicons:play" class="w-4 h-4" />
                      {/if}
                      Start Working
                    </button>
                  {/if}

                  {#if selectedRequest.status === 'In Progress'}
                    <button
                      class="btn btn-success"
                      on:click={() => updateRequestStatus('Resolved')}
                      disabled={isUpdating}
                    >
                      {#if isUpdating}
                        <span class="loading loading-spinner loading-xs"></span>
                      {:else}
                        <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                      {/if}
                      Mark Resolved
                    </button>
                  {/if}
                </div>
              {/if}

              <!-- Resolution Notes -->
              {#if selectedRequest.resolution_notes}
                <div class="bg-success/10 p-4 rounded-lg">
                  <h4 class="font-medium text-success mb-2">Resolution Notes</h4>
                  <p class="text-sm">{selectedRequest.resolution_notes}</p>
                </div>
              {/if}

              <!-- Discussion Forum -->
              <DiscussionForum tableName="requests" recordId={selectedRequest.id} />
            </div>
          </div>
        {:else}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center py-12">
              <Icon icon="heroicons:document-text" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-base-content/70">Select a Request</h3>
              <p class="text-base-content/50">Choose a request from the list to view details and update status</p>
            </div>
          </div>
        {/if}
      </div>

    </div>

    <!-- Navigation -->
    <div class="flex justify-center gap-4">
      <button class="btn btn-outline" on:click={navigateToDashboard}>
        <Icon icon="heroicons:home" class="w-4 h-4" />
        Dashboard
      </button>
      <button class="btn btn-outline" on:click={navigateToReview}>
        <Icon icon="heroicons:eye" class="w-4 h-4" />
        Review All
      </button>
    </div>

  </div>
</div>