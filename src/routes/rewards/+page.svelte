<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let rewards = [];
  let showAddForm = false;
  let editingReward = null;
  let searchTerm = "";
  let selectedType = "";
  let selectedRole = "";

  // Form data
  let formData = {
    person: "",
    role: "Child",
    type: "Star",
    reason: "",
    points: "",
    date: new Date().toISOString().split('T')[0]
  };

  // Load rewards on mount
  onMount(async () => {
    await loadRewards();
  });

  async function loadRewards() {
    try {
      rewards = await sqliteService.getRewards();
    } catch (error) {
      console.error("Error loading rewards:", error);
    }
  }

  function resetForm() {
    formData = {
      person: "",
      role: "Child",
      type: "Star",
      reason: "",
      points: "",
      date: new Date().toISOString().split('T')[0]
    };
  }

  async function saveReward() {
    try {
      const rewardData = {
        ...formData,
        id: editingReward ? editingReward.id : crypto.randomUUID(),
        points: parseInt(formData.points),
        created_at: editingReward ? editingReward.created_at : new Date().toISOString()
      };

      if (editingReward) {
        await sqliteService.updateReward(rewardData);
      } else {
        await sqliteService.saveReward(rewardData);
      }

      await loadRewards();
      showAddForm = false;
      editingReward = null;
      resetForm();
    } catch (error) {
      console.error("Error saving reward:", error);
    }
  }

  function editReward(reward) {
    editingReward = reward;
    formData = {
      ...reward,
      date: reward.date.split('T')[0] // Convert to date input format
    };
    showAddForm = true;
  }

  async function deleteReward(reward) {
    if (confirm(`Delete reward for "${reward.person}"?`)) {
      try {
        await sqliteService.deleteReward(reward.id);
        await loadRewards();
      } catch (error) {
        console.error("Error deleting reward:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingReward = null;
    resetForm();
  }

  // Filter rewards based on search and filters
  $: filteredRewards = rewards.filter(reward => {
    const matchesSearch = !searchTerm ||
      reward.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || reward.type === selectedType;
    const matchesRole = !selectedRole || reward.role === selectedRole;

    return matchesSearch && matchesType && matchesRole;
  });

  // Get unique values for filters
  $: types = [...new Set(rewards.map(r => r.type))];
  $: roles = [...new Set(rewards.map(r => r.role))];

  // Group rewards by person for display
  $: groupedRewards = filteredRewards.reduce((groups, reward) => {
    if (!groups[reward.person]) {
      groups[reward.person] = [];
    }
    groups[reward.person].push(reward);
    return groups;
  }, {});

  // Calculate totals per person
  $: personTotals = rewards.reduce((acc, reward) => {
    if (!acc[reward.person]) {
      acc[reward.person] = { stars: 0, karma: 0, total: 0 };
    }
    if (reward.type === 'Star') {
      acc[reward.person].stars += reward.points;
    } else {
      acc[reward.person].karma += reward.points;
    }
    acc[reward.person].total += reward.points;
    return acc;
  }, {});

  // Get icon for reward type
  function getTypeIcon(type) {
    switch (type) {
      case 'Star': return 'heroicons:star';
      case 'Karma': return 'heroicons:sparkles';
      default: return 'heroicons:gift';
    }
  }

  // Get color for reward type
  function getTypeColor(type) {
    switch (type) {
      case 'Star': return 'text-yellow-500';
      case 'Karma': return 'text-purple-500';
      default: return 'text-primary';
    }
  }
</script>

<svelte:head>
  <title>Rewards - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:star" class="w-8 h-8" />
          Rewards Management
        </h1>
        <p class="text-base-content/70 mt-1">Track stars and karma points for family members</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingReward = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Reward
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search rewards..."
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
            <span class="label-text">Role</span>
          </label>
          <select class="select select-bordered" bind:value={selectedRole}>
            <option value="">All Roles</option>
            {#each roles as role}
              <option value={role}>{role}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Rewards by Person -->
    {#each Object.entries(groupedRewards) as [person, personRewards]}
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold text-base-content flex items-center gap-2">
            <Icon icon="heroicons:user" class="w-6 h-6" />
            {person}
            <span class="badge badge-primary badge-sm">{personRewards.length}</span>
          </h2>

          <!-- Person Summary -->
          {#if personTotals[person]}
            <div class="flex gap-4 text-sm">
              <span class="flex items-center gap-1">
                <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                {personTotals[person].stars}
              </span>
              <span class="flex items-center gap-1">
                <Icon icon="heroicons:sparkles" class="w-4 h-4 text-purple-500" />
                {personTotals[person].karma}
              </span>
              <span class="font-bold">
                Total: {personTotals[person].total}
              </span>
            </div>
          {/if}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each personRewards as reward}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <Icon icon={getTypeIcon(reward.type)} class="w-6 h-6 {getTypeColor(reward.type)}" />
                      <h3 class="card-title text-lg">{reward.type}</h3>
                      <span class="badge badge-secondary">{reward.role}</span>
                    </div>

                    <p class="text-sm mb-2">{reward.reason}</p>

                    <div class="flex justify-between items-center">
                      <span class="text-sm text-base-content/60">
                        {new Date(reward.date).toLocaleDateString()}
                      </span>
                      <span class="text-lg font-bold {getTypeColor(reward.type)}">
                        +{reward.points}
                      </span>
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editReward(reward)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteReward(reward)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredRewards.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:star" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No rewards found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedRole ? "Try adjusting your filters" : "Add your first reward to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">
        {editingReward ? "Edit Reward" : "Add New Reward"}
      </h3>

      <form on:submit|preventDefault={saveReward} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Person *</span>
            </label>
            <input
              type="text"
              placeholder="Who receives the reward..."
              class="input input-bordered"
              bind:value={formData.person}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Role *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.role} required>
              <option>Child</option>
              <option>Adult</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Star</option>
              <option>Karma</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Points *</span>
            </label>
            <input
              type="number"
              placeholder="Number of points..."
              class="input input-bordered"
              bind:value={formData.points}
              required
              min="1"
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Reason *</span>
          </label>
          <textarea
            placeholder="Why are they receiving this reward..."
            class="textarea textarea-bordered"
            bind:value={formData.reason}
            required
            rows="3"
          ></textarea>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Date *</span>
          </label>
          <input
            type="date"
            class="input input-bordered"
            bind:value={formData.date}
            required
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingReward ? "Update" : "Add"} Reward
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}