<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let activities = [];
  let showAddForm = false;
  let editingActivity = null;
  let searchTerm = "";
  let selectedType = "";
  let selectedCategory = "";

  // Form data
  let formData = {
    type: "Physical",
    category: "Learning",
    sub_category: "",
    description: "",
    participant: "",
    frequency: "Daily",
    location: "",
    time_of_day: "Morning",
    alert_type: "Reminder"
  };

  // Load activities on mount
  onMount(async () => {
    await loadActivities();
  });

  async function loadActivities() {
    try {
      activities = await sqliteService.getActivities();
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  }

  function resetForm() {
    formData = {
      type: "Physical",
      category: "Learning",
      sub_category: "",
      description: "",
      participant: "",
      frequency: "Daily",
      location: "",
      time_of_day: "Morning",
      alert_type: "Reminder"
    };
  }

  async function saveActivity() {
    try {
      const activityData = {
        ...formData,
        id: editingActivity ? editingActivity.id : crypto.randomUUID(),
        created_by: "current_user", // TODO: Get from user context
        created_at: editingActivity ? editingActivity.created_at : new Date().toISOString()
      };

      if (editingActivity) {
        await sqliteService.updateActivity(activityData);
      } else {
        await sqliteService.saveActivity(activityData);
      }

      await loadActivities();
      showAddForm = false;
      editingActivity = null;
      resetForm();
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  }

  function editActivity(activity) {
    editingActivity = activity;
    formData = { ...activity };
    showAddForm = true;
  }

  async function deleteActivity(activity) {
    if (confirm(`Delete "${activity.description}"?`)) {
      try {
        await sqliteService.deleteActivity(activity.id);
        await loadActivities();
      } catch (error) {
        console.error("Error deleting activity:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingActivity = null;
    resetForm();
  }

  // Filter activities based on search and filters
  $: filteredActivities = activities.filter(activity => {
    const matchesSearch = !searchTerm ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.sub_category && activity.sub_category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      activity.participant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || activity.type === selectedType;
    const matchesCategory = !selectedCategory || activity.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Get unique values for filters
  $: types = [...new Set(activities.map(a => a.type))];
  $: categories = [...new Set(activities.map(a => a.category))];

  // Group activities by type for display
  $: groupedActivities = filteredActivities.reduce((groups, activity) => {
    if (!groups[activity.type]) {
      groups[activity.type] = [];
    }
    groups[activity.type].push(activity);
    return groups;
  }, {});

  // Get icon for activity type
  function getTypeIcon(type) {
    switch (type) {
      case 'Physical': return 'heroicons:bolt';
      case 'Mental': return 'heroicons:brain';
      case 'Soulful': return 'heroicons:sparkles';
      default: return 'heroicons:star';
    }
  }

  // Get color for activity type
  function getTypeColor(type) {
    switch (type) {
      case 'Physical': return 'badge-primary';
      case 'Mental': return 'badge-secondary';
      case 'Soulful': return 'badge-accent';
      default: return 'badge-neutral';
    }
  }
</script>

<svelte:head>
  <title>Activities - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:sparkles" class="w-8 h-8" />
          Activities Management
        </h1>
        <p class="text-base-content/70 mt-1">Manage physical, mental, and soulful activities</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingActivity = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Activity
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
            placeholder="Search activities..."
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
            <span class="label-text">Category</span>
          </label>
          <select class="select select-bordered" bind:value={selectedCategory}>
            <option value="">All Categories</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Activities by Type -->
    {#each Object.entries(groupedActivities) as [type, typeActivities]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getTypeIcon(type)} class="w-6 h-6" />
          {type} Activities
          <span class="badge {getTypeColor(type)} badge-sm">{typeActivities.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each typeActivities as activity}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="card-title text-lg">{activity.description}</h3>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span class="badge badge-primary">{activity.category}</span>
                      <span class="badge badge-secondary">{activity.frequency}</span>
                    </div>
                  </div>

                  <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn btn-ghost btn-sm">
                      <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><a on:click={() => editActivity(activity)}>
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                        Edit
                      </a></li>
                      <li><a on:click={() => deleteActivity(activity)} class="text-error">
                        <Icon icon="heroicons:trash" class="w-4 h-4" />
                        Delete
                      </a></li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  {#if activity.sub_category}
                    <p class="text-sm">
                      <strong>Sub-category:</strong> {activity.sub_category}
                    </p>
                  {/if}

                  <p class="text-sm">
                    <strong>Participant:</strong> {activity.participant}
                  </p>

                  {#if activity.time_of_day}
                    <p class="text-sm">
                      <strong>Time:</strong> {activity.time_of_day}
                    </p>
                  {/if}

                  {#if activity.location}
                    <p class="text-sm">
                      <strong>Location:</strong> {activity.location}
                    </p>
                  {/if}

                  <div class="flex justify-between items-center pt-2">
                    <span class="text-sm text-base-content/60">
                      Alert: {activity.alert_type}
                    </span>
                    <Icon icon={getTypeIcon(activity.type)} class="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredActivities.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:sparkles" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No activities found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedType || selectedCategory ? "Try adjusting your filters" : "Add your first activity to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-lg">
      <h3 class="font-bold text-lg mb-4">
        {editingActivity ? "Edit Activity" : "Add New Activity"}
      </h3>

      <form on:submit|preventDefault={saveActivity} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.type} required>
              <option>Physical</option>
              <option>Mental</option>
              <option>Soulful</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Category *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.category} required>
              <option>Learning</option>
              <option>Crafting</option>
              <option>Sports</option>
              <option>Meditation</option>
              <option>Reading</option>
              <option>Music</option>
              <option>Art</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Sub Category</span>
          </label>
          <input
            type="text"
            placeholder="Specific sub-category..."
            class="input input-bordered"
            bind:value={formData.sub_category}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Description *</span>
          </label>
          <textarea
            placeholder="Activity description..."
            class="textarea textarea-bordered"
            bind:value={formData.description}
            required
            rows="3"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Participant *</span>
            </label>
            <input
              type="text"
              placeholder="Who participates..."
              class="input input-bordered"
              bind:value={formData.participant}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Frequency *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.frequency} required>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Ad-Hoc</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Time of Day</span>
            </label>
            <select class="select select-bordered" bind:value={formData.time_of_day}>
              <option value="">Any Time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Alert Type *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.alert_type} required>
              <option>Reminder</option>
              <option>Alarm</option>
              <option>None</option>
            </select>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="Where to perform..."
            class="input input-bordered"
            bind:value={formData.location}
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingActivity ? "Update" : "Add"} Activity
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}