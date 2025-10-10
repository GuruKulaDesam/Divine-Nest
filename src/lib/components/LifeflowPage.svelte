<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let lifeflowItems = [
    {
      id: 1,
      name: "Morning Meditation",
      tamilName: "காலை தியானம்",
      category: "Spiritual",
      duration: "30 minutes",
      frequency: "Daily",
      location: "Home Temple",
      status: "Active",
      description: "Daily morning meditation practice",
      notes: "Focus on breathing and mindfulness",
    },
    {
      id: 2,
      name: "Evening Walk",
      tamilName: "மாலை நடை",
      category: "Physical",
      duration: "45 minutes",
      frequency: "Daily",
      location: "Park",
      status: "Active",
      description: "Evening walk for physical health",
      notes: "Walk at moderate pace",
    },
  ];

  let filteredItems = [...lifeflowItems];
  let searchQuery = "";
  let selectedCategory = "all";
  let selectedStatus = "all";
  let showAddModal = false;
  let showEditModal = false;
  let editingItem = null;

  let newItem = {
    name: "",
    tamilName: "",
    category: "",
    duration: "",
    frequency: "",
    location: "",
    status: "Active",
    description: "",
    notes: "",
  };

  const categories = [
    { id: "all", name: "All Categories", tamil: "அனைத்து வகைகள்" },
    { id: "spiritual", name: "Spiritual", tamil: "ஆன்மீக" },
    { id: "physical", name: "Physical", tamil: "உடல்" },
    { id: "mental", name: "Mental", tamil: "மன" },
    { id: "social", name: "Social", tamil: "சமூக" },
    { id: "creative", name: "Creative", tamil: "படைப்பு" },
  ];

  const frequencies = ["Daily", "Weekly", "Monthly", "Occasional", "Seasonal"];

  const statuses = ["Active", "Inactive", "Completed", "Paused"];

  function filterItems() {
    filteredItems = lifeflowItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory;
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  $: if (searchQuery || selectedCategory || selectedStatus) {
    filterItems();
  }

  function addItem() {
    if (!newItem.name.trim()) return;

    const item = {
      ...newItem,
      id: Date.now(),
      name: newItem.name.trim(),
      tamilName: newItem.tamilName.trim(),
      description: newItem.description.trim(),
      notes: newItem.notes.trim(),
    };

    lifeflowItems = [...lifeflowItems, item];
    filteredItems = [...lifeflowItems];

    newItem = {
      name: "",
      tamilName: "",
      category: "",
      duration: "",
      frequency: "",
      location: "",
      status: "Active",
      description: "",
      notes: "",
    };

    showAddModal = false;
  }

  function editItem(item) {
    editingItem = { ...item };
    showEditModal = true;
  }

  function updateItem() {
    if (!editingItem.name.trim()) return;

    lifeflowItems = lifeflowItems.map((item) => (item.id === editingItem.id ? { ...editingItem } : item));
    filteredItems = [...lifeflowItems];
    showEditModal = false;
    editingItem = null;
  }

  function deleteItem(id) {
    if (confirm("Are you sure you want to delete this lifeflow activity?")) {
      lifeflowItems = lifeflowItems.filter((item) => item.id !== id);
      filteredItems = [...lifeflowItems];
    }
  }

  function getCategoryColor(category) {
    const colors = {
      Spiritual: "bg-purple-100 text-purple-800",
      Physical: "bg-green-100 text-green-800",
      Mental: "bg-blue-100 text-blue-800",
      Social: "bg-orange-100 text-orange-800",
      Creative: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  }

  function getStatusColor(status) {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
      Completed: "bg-blue-100 text-blue-800",
      Paused: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  }

  onMount(() => {
    filterItems();
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Lifeflow Activities</h1>
      <p class="text-base-content/70 mt-1">Manage your daily life activities and routines</p>
    </div>
    <button on:click={() => (showAddModal = true)} class="btn btn-primary gap-2">
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Activity
    </button>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:flower" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Activities</div>
      <div class="stat-value text-primary">{lifeflowItems.length}</div>
    </div>

    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-success">
        <Icon icon="mdi:check-circle" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active</div>
      <div class="stat-value text-success">
        {lifeflowItems.filter((item) => item.status === "Active").length}
      </div>
    </div>

    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-info">
        <Icon icon="mdi:calendar-clock" class="w-8 h-8" />
      </div>
      <div class="stat-title">Daily</div>
      <div class="stat-value text-info">
        {lifeflowItems.filter((item) => item.frequency === "Daily").length}
      </div>
    </div>

    <div class="stat bg-base-100 shadow rounded-box">
      <div class="stat-figure text-warning">
        <Icon icon="mdi:meditation" class="w-8 h-8" />
      </div>
      <div class="stat-title">Spiritual</div>
      <div class="stat-value text-warning">
        {lifeflowItems.filter((item) => item.category === "Spiritual").length}
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 p-4 rounded-box shadow">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="form-control">
        <label for="lifeflow-search" class="label">
          <span class="label-text">Search Activities</span>
        </label>
        <input id="lifeflow-search" type="text" bind:value={searchQuery} placeholder="Search by name or description..." class="input input-bordered" />
      </div>

      <!-- Category Filter -->
      <div class="form-control">
        <label for="lifeflow-category-filter" class="label">
          <span class="label-text">Category</span>
        </label>
        <select id="lifeflow-category-filter" bind:value={selectedCategory} class="select select-bordered">
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label for="lifeflow-status-filter" class="label">
          <span class="label-text">Status</span>
        </label>
        <select id="lifeflow-status-filter" bind:value={selectedStatus} class="select select-bordered">
          <option value="all">All Status</option>
          {#each statuses as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      </div>

      <!-- Clear Filters -->
      <div class="form-control">
        <label class="label">
          <span class="label-text opacity-0">Actions</span>
        </label>
        <button
          on:click={() => {
            searchQuery = "";
            selectedCategory = "all";
            selectedStatus = "all";
          }}
          class="btn btn-outline gap-2"
        >
          <Icon icon="mdi:filter-off" class="w-4 h-4" />
          Clear Filters
        </button>
      </div>
    </div>
  </div>

  <!-- Activities Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredItems as item (item.id)}
      <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="card-title text-lg">{item.name}</h3>
              {#if item.tamilName}
                <p class="text-sm text-base-content/60">{item.tamilName}</p>
              {/if}
            </div>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a on:click={() => editItem(item)}>Edit</a></li>
                <li><a class="text-error" on:click={() => deleteItem(item.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <span class="badge {getCategoryColor(item.category)} badge-sm">
                {item.category}
              </span>
              <span class="badge {getStatusColor(item.status)} badge-sm">
                {item.status}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <Icon icon="mdi:clock-outline" class="w-4 h-4 inline mr-1" />
                {item.duration}
              </div>
              <div>
                <Icon icon="mdi:calendar-refresh" class="w-4 h-4 inline mr-1" />
                {item.frequency}
              </div>
              <div class="col-span-2">
                <Icon icon="mdi:map-marker" class="w-4 h-4 inline mr-1" />
                {item.location}
              </div>
            </div>

            {#if item.description}
              <p class="text-sm text-base-content/70 line-clamp-2">
                {item.description}
              </p>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredItems.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:flower-outline" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
      <h3 class="text-lg font-semibold text-base-content/70">No activities found</h3>
      <p class="text-base-content/50">Try adjusting your search or filters</p>
    </div>
  {/if}
</div>

<!-- Add Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">Add Lifeflow Activity</h3>
          <button on:click={() => (showAddModal = false)} class="btn btn-ghost btn-sm">
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={addItem} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label for="lifeflow-activity-name" class="label">
                <span class="label-text">Activity Name *</span>
              </label>
              <input id="lifeflow-activity-name" type="text" bind:value={newItem.name} placeholder="Enter activity name" class="input input-bordered" required />
            </div>

            <div class="form-control">
              <label for="lifeflow-tamil-name" class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input id="lifeflow-tamil-name" type="text" bind:value={newItem.tamilName} placeholder="தமிழ் பெயர்" class="input input-bordered" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label for="lifeflow-category" class="label">
                <span class="label-text">Category</span>
              </label>
              <select id="lifeflow-category" bind:value={newItem.category} class="select select-bordered">
                <option value="">Select Category</option>
                {#each categories.slice(1) as category}
                  <option value={category.name}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label for="lifeflow-status" class="label">
                <span class="label-text">Status</span>
              </label>
              <select id="lifeflow-status" bind:value={newItem.status} class="select select-bordered">
                {#each statuses as status}
                  <option value={status}>{status}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label for="lifeflow-duration" class="label">
                <span class="label-text">Duration</span>
              </label>
              <input id="lifeflow-duration" type="text" bind:value={newItem.duration} placeholder="e.g., 30 minutes" class="input input-bordered" />
            </div>

            <div class="form-control">
              <label for="lifeflow-frequency" class="label">
                <span class="label-text">Frequency</span>
              </label>
              <select id="lifeflow-frequency" bind:value={newItem.frequency} class="select select-bordered">
                <option value="">Select Frequency</option>
                {#each frequencies as freq}
                  <option value={freq}>{freq}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label for="lifeflow-location" class="label">
              <span class="label-text">Location</span>
            </label>
            <input id="lifeflow-location" type="text" bind:value={newItem.location} placeholder="Where do you do this activity?" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label for="lifeflow-description" class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea id="lifeflow-description" bind:value={newItem.description} placeholder="Describe this activity" rows="3" class="textarea textarea-bordered"></textarea>
          </div>

          <div class="form-control">
            <label for="lifeflow-notes" class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea id="lifeflow-notes" bind:value={newItem.notes} placeholder="Additional notes or instructions" rows="2" class="textarea textarea-bordered"></textarea>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button type="button" on:click={() => (showAddModal = false)} class="btn btn-outline"> Cancel </button>
            <button type="submit" class="btn btn-primary"> Add Activity </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Modal -->
{#if showEditModal && editingItem}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">Edit Lifeflow Activity</h3>
          <button on:click={() => (showEditModal = false)} class="btn btn-ghost btn-sm">
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <form on:submit|preventDefault={updateItem} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Activity Name *</span>
              </label>
              <input type="text" bind:value={editingItem.name} placeholder="Enter activity name" class="input input-bordered" required />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input type="text" bind:value={editingItem.tamilName} placeholder="தமிழ் பெயர்" class="input input-bordered" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select bind:value={editingItem.category} class="select select-bordered">
                <option value="">Select Category</option>
                {#each categories.slice(1) as category}
                  <option value={category.name}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select bind:value={editingItem.status} class="select select-bordered">
                {#each statuses as status}
                  <option value={status}>{status}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Duration</span>
              </label>
              <input type="text" bind:value={editingItem.duration} placeholder="e.g., 30 minutes" class="input input-bordered" />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Frequency</span>
              </label>
              <select bind:value={editingItem.frequency} class="select select-bordered">
                <option value="">Select Frequency</option>
                {#each frequencies as freq}
                  <option value={freq}>{freq}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input type="text" bind:value={editingItem.location} placeholder="Where do you do this activity?" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea bind:value={editingItem.description} placeholder="Describe this activity" rows="3" class="textarea textarea-bordered"></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea bind:value={editingItem.notes} placeholder="Additional notes or instructions" rows="2" class="textarea textarea-bordered"></textarea>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button type="button" on:click={() => (showEditModal = false)} class="btn btn-outline"> Cancel </button>
            <button type="submit" class="btn btn-primary"> Update Activity </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
