<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let planners = [
    {
      id: 1,
      title: 'Weekly Study Plan',
      description: 'Structured weekly study schedule for CBSE Class 10',
      type: 'study',
      grade: '10',
      subject: 'All Subjects',
      duration: '7 days',
      status: 'active',
      createdDate: '2024-01-15',
      lastUpdated: '2024-02-20',
      progress: 75
    },
    {
      id: 2,
      title: 'Monthly Budget Planner',
      description: 'Family budget planning for February 2024',
      type: 'budget',
      grade: 'N/A',
      subject: 'Finance',
      duration: '30 days',
      status: 'active',
      createdDate: '2024-02-01',
      lastUpdated: '2024-02-15',
      progress: 45
    },
    {
      id: 3,
      title: 'Home Maintenance Schedule',
      description: 'Quarterly maintenance tasks for the household',
      type: 'maintenance',
      grade: 'N/A',
      subject: 'Home',
      duration: '90 days',
      status: 'draft',
      createdDate: '2024-01-20',
      lastUpdated: '2024-02-10',
      progress: 20
    }
  ];

  let searchQuery = '';
  let selectedType = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;

  let newPlanner = {
    title: '',
    description: '',
    type: 'study',
    grade: '10',
    subject: 'General',
    duration: '7 days'
  };

  const plannerTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'study', name: 'Study Plan' },
    { id: 'budget', name: 'Budget Plan' },
    { id: 'maintenance', name: 'Maintenance Plan' },
    { id: 'meal', name: 'Meal Plan' },
    { id: 'fitness', name: 'Fitness Plan' },
    { id: 'event', name: 'Event Plan' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'draft', name: 'Draft' },
    { id: 'completed', name: 'Completed' },
    { id: 'archived', name: 'Archived' }
  ];

  $: filteredPlanners = planners.filter(planner => {
    const matchesSearch = planner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         planner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         planner.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || planner.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || planner.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  function addPlanner() {
    if (!newPlanner.title || !newPlanner.subject) return;

    const planner = {
      id: planners.length + 1,
      ...newPlanner,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      progress: 0
    };

    planners = [...planners, planner];
    resetNewPlanner();
    showAddModal = false;
  }

  function resetNewPlanner() {
    newPlanner = {
      title: '',
      description: '',
      type: 'study',
      grade: '10',
      subject: 'General',
      duration: '7 days'
    };
  }

  function deletePlanner(plannerId) {
    planners = planners.filter(planner => planner.id !== plannerId);
  }

  function getStatusColor(status) {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getTypeColor(type) {
    switch (type) {
      case 'study': return 'bg-purple-100 text-purple-800';
      case 'budget': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'meal': return 'bg-pink-100 text-pink-800';
      case 'fitness': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getProgressColor(progress) {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Planner Management</h1>
      <p class="text-base-content/70 mt-1">Create and manage various planning schedules and timelines</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary"
    >
      <Icon icon="mdi:calendar-plus" class="w-5 h-5" />
      Create Planner
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:calendar-text" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Planners</div>
      <div class="stat-value text-primary">{planners.length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-success">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active Planners</div>
      <div class="stat-value text-success">{planners.filter(p => p.status === 'active').length}</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-info">
        <Icon icon="mdi:progress-check" class="w-8 h-8" />
      </div>
      <div class="stat-title">Avg Progress</div>
      <div class="stat-value text-info">{Math.round(planners.reduce((sum, p) => sum + p.progress, 0) / planners.length)}%</div>
    </div>
    <div class="stat bg-base-100 shadow rounded-lg">
      <div class="stat-figure text-warning">
        <Icon icon="mdi:calendar-clock" class="w-8 h-8" />
      </div>
      <div class="stat-title">This Week</div>
      <div class="stat-value text-warning">{planners.filter(p => p.duration.includes('7')).length}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-6 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Planners</span>
        </label>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title, subject..."
          class="input input-bordered"
        />
      </div>

      <!-- Type Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Planner Type</span>
        </label>
        <select bind:value={selectedType} class="select select-bordered">
          {#each plannerTypes as type}
            <option value={type.id}>{type.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select bind:value={selectedStatus} class="select select-bordered">
          {#each statuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Planners Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each filteredPlanners as planner (planner.id)}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <h3 class="card-title text-lg">{planner.title}</h3>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Edit</a></li>
                <li><a>View Details</a></li>
                <li><a>Duplicate</a></li>
                <li><a class="text-error" on:click={() => deletePlanner(planner.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <p class="text-base-content/70 text-sm mb-4 line-clamp-2">{planner.description}</p>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <Icon icon="mdi:calendar" class="w-4 h-4 text-base-content/60" />
              <span class="text-base-content/80">Duration: {planner.duration}</span>
            </div>
            {#if planner.grade !== 'N/A'}
              <div class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:school" class="w-4 h-4 text-base-content/60" />
                <span class="text-base-content/80">Grade {planner.grade} • {planner.subject}</span>
              </div>
            {:else}
              <div class="flex items-center gap-2 text-sm">
                <Icon icon="mdi:tag" class="w-4 h-4 text-base-content/60" />
                <span class="text-base-content/80">{planner.subject}</span>
              </div>
            {/if}
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-base-content/70">Progress</span>
              <span class="text-base-content/80">{planner.progress}%</span>
            </div>
            <div class="w-full bg-base-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-300 {getProgressColor(planner.progress)}"
                style="width: {planner.progress}%"
              ></div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span class="badge {getTypeColor(planner.type)} badge-sm">{planner.type}</span>
            <span class="badge {getStatusColor(planner.status)} badge-sm">{planner.status}</span>
          </div>

          <div class="text-xs text-base-content/60 mb-4">
            Last updated: {planner.lastUpdated}
          </div>

          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">
              <Icon icon="mdi:eye" class="w-4 h-4" />
              View Plan
            </button>
            <button class="btn btn-outline btn-sm">
              <Icon icon="mdi:pencil" class="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredPlanners.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:calendar-text-outline" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No planners found</h3>
      <p class="text-base-content/50">Try adjusting your search or filter criteria</p>
    </div>
  {/if}
</div>

<!-- Add Planner Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-base-300">
        <h3 class="text-xl font-bold">Create New Planner</h3>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form on:submit|preventDefault={addPlanner} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Planner Title *</span>
              </label>
              <input
                type="text"
                bind:value={newPlanner.title}
                placeholder="Enter planner title"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Type *</span>
              </label>
              <select bind:value={newPlanner.type} class="select select-bordered" required>
                <option value="study">Study Plan</option>
                <option value="budget">Budget Plan</option>
                <option value="maintenance">Maintenance Plan</option>
                <option value="meal">Meal Plan</option>
                <option value="fitness">Fitness Plan</option>
                <option value="event">Event Plan</option>
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              bind:value={newPlanner.description}
              placeholder="Planner description..."
              rows="3"
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Subject/Area</span>
              </label>
              <input
                type="text"
                bind:value={newPlanner.subject}
                placeholder="e.g., Mathematics, Finance"
                class="input input-bordered"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Grade (if applicable)</span>
              </label>
              <select bind:value={newPlanner.grade} class="select select-bordered">
                <option value="N/A">Not Applicable</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Duration</span>
              </label>
              <select bind:value={newPlanner.duration} class="select select-bordered">
                <option value="1 day">1 Day</option>
                <option value="7 days">7 Days</option>
                <option value="30 days">30 Days</option>
                <option value="90 days">90 Days</option>
                <option value="6 months">6 Months</option>
                <option value="1 year">1 Year</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-base-300 flex justify-end gap-3">
        <button
          on:click={() => { showAddModal = false; resetNewPlanner(); }}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          on:click={addPlanner}
          class="btn btn-primary"
          disabled={!newPlanner.title || !newPlanner.subject}
        >
          Create Planner
        </button>
      </div>
    </div>
  </div>
{/if}