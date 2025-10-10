<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let searchTerm = "";
  let selectedCategory = "all";
  let selectedStatus = "all";
  let showAddModal = false;

  const categories = [
    { id: "household", name: "Household Items", icon: "heroicons:home", color: "text-blue-600" },
    { id: "electronics", name: "Electronics", icon: "heroicons:device-phone-mobile", color: "text-purple-600" },
    { id: "furniture", name: "Furniture", icon: "heroicons:home-modern", color: "text-green-600" },
    { id: "kitchen", name: "Kitchen Items", icon: "heroicons:archive-box", color: "text-orange-600" },
    { id: "personal", name: "Personal Items", icon: "heroicons:user", color: "text-cyan-600" },
    { id: "decorative", name: "Decorative", icon: "heroicons:star", color: "text-yellow-600" },
    { id: "other", name: "Other", icon: "heroicons:question-mark-circle", color: "text-gray-600" }
  ];

  const statuses = [
    { id: "active", name: "Active", color: "bg-green-100 text-green-800" },
    { id: "maintenance", name: "Under Maintenance", color: "bg-yellow-100 text-yellow-800" },
    { id: "stored", name: "In Storage", color: "bg-blue-100 text-blue-800" },
    { id: "lent", name: "Lent Out", color: "bg-purple-100 text-purple-800" },
    { id: "disposed", name: "Disposed", color: "bg-red-100 text-red-800" }
  ];

  onMount(() => {
    items = [
      {
        id: 1,
        name: "Family Photo Album",
        category: "personal",
        status: "active",
        location: "Living Room Shelf",
        acquiredDate: "2015-06-15",
        value: 2500,
        condition: "good",
        tags: ["memories", "family"],
        notes: "Contains photos from 2010-2020"
      },
      {
        id: 2,
        name: "Pressure Cooker",
        category: "kitchen",
        status: "active",
        location: "Kitchen Cabinet",
        acquiredDate: "2018-03-20",
        value: 1800,
        condition: "excellent",
        tags: ["cooking", "stainless steel"],
        notes: "5L capacity, perfect for family meals"
      },
      {
        id: 3,
        name: "Wall Clock",
        category: "decorative",
        status: "active",
        location: "Living Room Wall",
        acquiredDate: "2019-11-05",
        value: 1200,
        condition: "good",
        tags: ["decoration", "traditional"],
        notes: "Traditional design with Tamil numerals"
      },
      {
        id: 4,
        name: "Laptop Charger",
        category: "electronics",
        status: "maintenance",
        location: "Study Room Drawer",
        acquiredDate: "2022-01-10",
        value: 800,
        condition: "fair",
        tags: ["electronics", "charger"],
        notes: "Needs cable replacement"
      },
      {
        id: 5,
        name: "Diwan Set",
        category: "furniture",
        status: "stored",
        location: "Storage Room",
        acquiredDate: "2017-08-22",
        value: 8500,
        condition: "good",
        tags: ["furniture", "traditional"],
        notes: "Traditional teak wood diwan with cushions"
      },
      {
        id: 6,
        name: "Prayer Books",
        category: "personal",
        status: "active",
        location: "Pooja Room",
        acquiredDate: "2016-04-14",
        value: 500,
        condition: "excellent",
        tags: ["spiritual", "books"],
        notes: "Collection of Tamil prayer books"
      }
    ];
  });

  let items = [];

  $: filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  function getStatusColor(status) {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  }

  function getCategoryIcon(category) {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : "heroicons:question-mark-circle";
  }

  function getCategoryColor(category) {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : "text-gray-600";
  }

  function getConditionColor(condition) {
    switch (condition) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "fair": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  }
</script>

<svelte:head>
  <title>Items Management - South Indian Family Life App</title>
  <meta name="description" content="Manage and track all family items and belongings" />
</svelte:head>

<div class="max-w-7xl mx-auto p-6 space-y-6">
  <!-- Header -->
  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
    <div class="flex items-center gap-3 mb-4">
      <Icon icon="heroicons:cube" class="w-8 h-8" />
      <h1 class="text-2xl font-bold">Items Management</h1>
    </div>
    <p class="text-indigo-100">Keep track of all your family items and belongings</p>
  </div>

  <!-- Search and Filters -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search items..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <select
        bind:value={selectedCategory}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="all">All Categories</option>
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
      <select
        bind:value={selectedStatus}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="all">All Statuses</option>
        {#each statuses as status}
          <option value={status.id}>{status.name}</option>
        {/each}
      </select>
      <button
        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        on:click={() => showAddModal = true}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add Item
      </button>
    </div>

    <!-- Category Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {#each categories as category}
        <div class="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
             class:bg-indigo-50={selectedCategory === category.id}
             on:click={() => selectedCategory = category.id}>
          <Icon icon={category.icon} class="w-8 h-8 {category.color} mx-auto mb-2" />
          <p class="text-sm font-medium">{category.name}</p>
          <p class="text-xs text-gray-500">{items.filter(i => i.category === category.id).length} items</p>
        </div>
      {/each}
    </div>

    <!-- Items List -->
    <div class="space-y-4">
      {#each filteredItems as item}
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4 flex-1">
              <div class="p-2 bg-gray-100 rounded-lg">
                <Icon icon={getCategoryIcon(item.category)} class="w-6 h-6 {getCategoryColor(item.category)}" />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-semibold text-lg">{item.name}</h3>
                  <span class="px-2 py-1 text-xs rounded-full {getStatusColor(item.status)}">
                    {statuses.find(s => s.id === item.status)?.name || item.status}
                  </span>
                </div>
                <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span class="flex items-center gap-1">
                    <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                    {item.location}
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon icon="heroicons:calendar" class="w-4 h-4" />
                    {item.acquiredDate}
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon icon="heroicons:currency-rupee" class="w-4 h-4" />
                    ₹{item.value}
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                    <span class={getConditionColor(item.condition)}>{item.condition}</span>
                  </span>
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  {#each item.tags as tag}
                    <span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {tag}
                    </span>
                  {/each}
                </div>
                {#if item.notes}
                  <p class="text-sm text-gray-600">{item.notes}</p>
                {/if}
              </div>
            </div>
            <div class="flex gap-2">
              <button class="p-2 text-indigo-600 hover:bg-indigo-50 rounded" title="Edit">
                <Icon icon="heroicons:pencil" class="w-5 h-5" />
              </button>
              <button class="p-2 text-green-600 hover:bg-green-50 rounded" title="Move">
                <Icon icon="heroicons:arrow-path" class="w-5 h-5" />
              </button>
              <button class="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                <Icon icon="heroicons:trash" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredItems.length === 0}
      <div class="text-center py-12 text-gray-500">
        <Icon icon="heroicons:cube" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p class="text-lg font-medium">
          {#if items.length === 0}
            No items yet
          {:else}
            No items match your search
          {/if}
        </p>
        <p class="text-sm">
          {#if items.length === 0}
            Start by adding your family items
          {:else}
            Try adjusting your search or filter criteria
          {/if}
        </p>
      </div>
    {/if}
  </div>

  <!-- Statistics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-xl shadow-lg p-6 text-center">
      <Icon icon="heroicons:cube" class="w-8 h-8 text-indigo-600 mx-auto mb-2" />
      <p class="text-2xl font-bold text-gray-800">{items.length}</p>
      <p class="text-sm text-gray-600">Total Items</p>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 text-center">
      <Icon icon="heroicons:check-circle" class="w-8 h-8 text-green-600 mx-auto mb-2" />
      <p class="text-2xl font-bold text-gray-800">{items.filter(i => i.status === 'active').length}</p>
      <p class="text-sm text-gray-600">Active Items</p>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 text-center">
      <Icon icon="heroicons:currency-rupee" class="w-8 h-8 text-purple-600 mx-auto mb-2" />
      <p class="text-2xl font-bold text-gray-800">₹{items.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</p>
      <p class="text-sm text-gray-600">Total Value</p>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 text-center">
      <Icon icon="heroicons:wrench-screwdriver" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
      <p class="text-2xl font-bold text-gray-800">{items.filter(i => i.status === 'maintenance').length}</p>
      <p class="text-sm text-gray-600">Needs Attention</p>
    </div>
  </div>
</div>