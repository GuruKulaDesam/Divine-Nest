<script>
  import { onMount } from 'svelte';
  import { sqliteService } from '$lib/services/sqliteService';
  import Icon from '@iconify/svelte';

  let requests = [];
  let filteredRequests = [];
  let searchTerm = '';
  let statusFilter = 'all';

  onMount(async () => {
    await loadRequests();
  });

  async function loadRequests() {
    try {
      // Assuming there's a getRequests method in sqliteService
      const allRequests = await sqliteService.getRequests?.() || [];
      requests = allRequests;
      filterRequests();
    } catch (error) {
      console.error('Error loading requests:', error);
      requests = [];
    }
  }

  function filterRequests() {
    filteredRequests = requests.filter(request => {
      const matchesSearch = !searchTerm ||
        request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  $: if (searchTerm || statusFilter) {
    filterRequests();
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-base-content">Request History</h1>
  </div>

  <!-- Filters -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <input
        type="text"
        placeholder="Search requests..."
        bind:value={searchTerm}
        class="input input-bordered w-full bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
      />
    </div>
    <select
      bind:value={statusFilter}
      class="select select-bordered bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-600/30"
    >
      <option value="all">All Status</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  <!-- Requests List -->
  <div class="space-y-4">
    {#each filteredRequests as request}
      <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="card-title text-lg">{request.title || 'Untitled Request'}</h3>
              <p class="text-sm opacity-70 mt-2">{request.description || 'No description'}</p>
              <div class="flex items-center gap-4 mt-3">
                <span class="badge badge-primary">{request.category || 'General'}</span>
                <span class="badge badge-outline">{request.status || 'pending'}</span>
                <span class="text-sm opacity-60">
                  {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'Unknown date'}
                </span>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-sm btn-outline">
                <Icon icon="heroicons:eye" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredRequests.length === 0}
    <div class="text-center py-12">
      <Icon icon="heroicons:document-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-xl font-semibold text-base-content mb-2">No Requests Found</h3>
      <p class="text-gray-600 dark:text-gray-400">
        {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Create your first request to get started.'}
      </p>
    </div>
  {/if}
</div>