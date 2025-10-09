<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let searchTerm = "";
  let selectedCategory = "all";
  let selectedStatus = "all";
  let selectedPriority = "all";
  let showAddModal = false;
  let maintenanceTasks = [];
  let assetMaintenance = [];

  const categories = [
    { id: "electrical", name: "Electrical", icon: "heroicons:bolt", color: "text-yellow-600" },
    { id: "plumbing", name: "Plumbing", icon: "heroicons:wrench-screwdriver", color: "text-blue-600" },
    { id: "structural", name: "Structural", icon: "heroicons:home", color: "text-gray-600" },
    { id: "appliance", name: "Appliances", icon: "heroicons:device-phone-mobile", color: "text-purple-600" },
    { id: "vehicle", name: "Vehicles", icon: "heroicons:truck", color: "text-green-600" },
    { id: "garden", name: "Garden/Landscape", icon: "heroicons:tree", color: "text-green-500" },
    { id: "cleaning", name: "Cleaning", icon: "heroicons:sparkles", color: "text-cyan-600" },
    { id: "other", name: "Other", icon: "heroicons:question-mark-circle", color: "text-gray-500" }
  ];

  const statuses = [
    { id: "pending", name: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { id: "in_progress", name: "In Progress", color: "bg-blue-100 text-blue-800" },
    { id: "completed", name: "Completed", color: "bg-green-100 text-green-800" },
    { id: "overdue", name: "Overdue", color: "bg-red-100 text-red-800" },
    { id: "cancelled", name: "Cancelled", color: "bg-gray-100 text-gray-800" }
  ];

  const priorities = [
    { id: "low", name: "Low", color: "text-green-600" },
    { id: "medium", name: "Medium", color: "text-yellow-600" },
    { id: "high", name: "High", color: "text-orange-600" },
    { id: "critical", name: "Critical", color: "text-red-600" }
  ];

  onMount(() => {
    // General Maintenance Tasks
    maintenanceTasks = [
      {
        id: 1,
        title: "Fix Kitchen Faucet Leak",
        category: "plumbing",
        description: "Kitchen faucet has been dripping for 2 days",
        priority: "medium",
        status: "pending",
        dueDate: "2024-01-15",
        assignedTo: "Plumber",
        estimatedCost: 1500,
        notes: "Need to replace washer and check pipes"
      },
      {
        id: 2,
        title: "Monthly Electrical Safety Check",
        category: "electrical",
        description: "Check all electrical outlets and switches",
        priority: "high",
        status: "in_progress",
        dueDate: "2024-01-10",
        assignedTo: "Electrician",
        estimatedCost: 2000,
        notes: "Focus on kitchen and bathroom circuits"
      },
      {
        id: 3,
        title: "Clean AC Filters",
        category: "appliance",
        description: "Monthly cleaning of air conditioning filters",
        priority: "low",
        status: "completed",
        dueDate: "2024-01-05",
        assignedTo: "Family Member",
        estimatedCost: 0,
        notes: "Completed successfully, filters replaced"
      },
      {
        id: 4,
        title: "Garden Maintenance",
        category: "garden",
        description: "Trim hedges and maintain lawn",
        priority: "medium",
        status: "pending",
        dueDate: "2024-01-20",
        assignedTo: "Gardener",
        estimatedCost: 2500,
        notes: "Monthly garden upkeep"
      }
    ];

    // Asset Maintenance Records
    assetMaintenance = [
      {
        id: 1,
        assetName: "Honda City Car",
        assetType: "Vehicle",
        maintenanceType: "Regular Service",
        lastService: "2023-12-01",
        nextService: "2024-03-01",
        status: "scheduled",
        cost: 8500,
        provider: "Authorized Service Center"
      },
      {
        id: 2,
        assetName: "Samsung Refrigerator",
        assetType: "Appliance",
        maintenanceType: "Annual Cleaning",
        lastService: "2023-11-15",
        nextService: "2024-11-15",
        status: "completed",
        cost: 1200,
        provider: "Home Service"
      },
      {
        id: 3,
        assetName: "Water Purifier",
        assetType: "Appliance",
        maintenanceType: "Filter Replacement",
        lastService: "2023-10-20",
        nextService: "2024-01-20",
        status: "overdue",
        cost: 1800,
        provider: "Local Technician"
      }
    ];
  });

  $: filteredTasks = maintenanceTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || task.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  $: filteredAssets = assetMaintenance.filter(asset => {
    const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assetType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  function getStatusColor(status) {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  }

  function getPriorityColor(priority) {
    const priorityObj = priorities.find(p => p.id === priority);
    return priorityObj ? priorityObj.color : "text-gray-600";
  }

  function getAssetStatusColor(status) {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'scheduled': return 'text-blue-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  function addNewTask() {
    showAddModal = true;
  }

  function closeModal() {
    showAddModal = false;
  }
</script>

<svelte:head>
  <title>Maintenance Management - South Indian Family Life App</title>
  <meta name="description" content="Manage maintenance tasks and asset upkeep for your family" />
</svelte:head>

<div class="max-w-7xl mx-auto p-6 space-y-6">
  <!-- Header -->
  <div class="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <Icon icon="heroicons:wrench-screwdriver" class="w-8 h-8" />
        <div>
          <h1 class="text-2xl font-bold">Maintenance Management</h1>
          <p class="text-blue-100">Keep your home and assets in perfect condition</p>
        </div>
      </div>
      <button
        on:click={addNewTask}
        class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Task
      </button>
    </div>
  </div>

  <!-- Search and Filters -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search tasks or assets..."
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <select
          bind:value={selectedCategory}
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <select
          bind:value={selectedStatus}
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          {#each statuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <select
          bind:value={selectedPriority}
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Priorities</option>
          {#each priorities as priority}
            <option value={priority.id}>{priority.name}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Category Filter Buttons -->
    <div class="flex flex-wrap gap-2">
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedCategory === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        on:click={() => selectedCategory = 'all'}
      >
        All Categories
      </button>
      {#each categories as category}
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 {selectedCategory === category.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          on:click={() => selectedCategory = category.id}
        >
          <Icon icon={category.icon} class="w-4 h-4" />
          {category.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Maintenance Tasks -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Icon icon="heroicons:clipboard-document-list" class="w-6 h-6 text-blue-600" />
        Maintenance Tasks ({filteredTasks.length})
      </h2>
    </div>

    <div class="space-y-4">
      {#each filteredTasks as task}
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{task.title}</h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(task.status)}">
                  {statuses.find(s => s.id === task.status)?.name}
                </span>
                <span class="text-sm font-medium {getPriorityColor(task.priority)}">
                  {priorities.find(p => p.id === task.priority)?.name} Priority
                </span>
              </div>
              <p class="text-gray-600 mb-2">{task.description}</p>
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <span>Due: {task.dueDate}</span>
                <span>Assigned: {task.assignedTo}</span>
                <span>Est. Cost: ₹{task.estimatedCost}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Icon icon="heroicons:pencil" class="w-5 h-5" />
              </button>
              <button class="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Icon icon="heroicons:check" class="w-5 h-5" />
              </button>
            </div>
          </div>
          {#if task.notes}
            <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <strong>Notes:</strong> {task.notes}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Asset Maintenance -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Icon icon="heroicons:building-storefront" class="w-6 h-6 text-indigo-600" />
        Asset Maintenance ({filteredAssets.length})
      </h2>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Service</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredAssets as asset}
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{asset.assetName}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{asset.assetType}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{asset.maintenanceType}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{asset.lastService}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{asset.nextService}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="text-sm font-medium {getAssetStatusColor(asset.status)}">
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">₹{asset.cost}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button class="text-green-600 hover:text-green-900">Complete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Pending Tasks</p>
          <p class="text-2xl font-bold text-yellow-600">{maintenanceTasks.filter(t => t.status === 'pending').length}</p>
        </div>
        <Icon icon="heroicons:clock" class="w-8 h-8 text-yellow-600" />
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">In Progress</p>
          <p class="text-2xl font-bold text-blue-600">{maintenanceTasks.filter(t => t.status === 'in_progress').length}</p>
        </div>
        <Icon icon="heroicons:arrow-path" class="w-8 h-8 text-blue-600" />
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Completed</p>
          <p class="text-2xl font-bold text-green-600">{maintenanceTasks.filter(t => t.status === 'completed').length}</p>
        </div>
        <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-600" />
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Overdue</p>
          <p class="text-2xl font-bold text-red-600">{maintenanceTasks.filter(t => t.status === 'overdue').length}</p>
        </div>
        <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-600" />
      </div>
    </div>
  </div>
</div>

<!-- Add Task Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-900">Add Maintenance Task</h3>
        <button on:click={closeModal} class="text-gray-400 hover:text-gray-600">
          <Icon icon="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {#each priorities as priority}
              <option value={priority.id}>{priority.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows="3"
            placeholder="Describe the maintenance task"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="submit"
            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
          <button
            type="button"
            on:click={closeModal}
            class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}