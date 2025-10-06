<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let currentTab = "kitchen";
  let searchTerm = "";

  const tabs = [
    { id: "kitchen", label: "Kitchen & Pantry", icon: "heroicons:archive-box" },
    { id: "appliances", label: "Appliances & Tools", icon: "heroicons:wrench-screwdriver" },
    { id: "furniture", label: "Furniture & Fixtures", icon: "heroicons:home" },
    { id: "pooja", label: "Pooja Items", icon: "heroicons:star" },
    { id: "cleaning", label: "Cleaning Supplies", icon: "heroicons:sparkles" },
    { id: "emergency", label: "Emergency Stock", icon: "heroicons:shield-check" },
  ];

  onMount(() => {
    document.title = "Inventory Management - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl text-white">
            <Icon icon="heroicons:archive-box" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
            <p class="text-gray-600 dark:text-gray-300">भण्डार प्रबन्धन | Complete household inventory tracking</p>
          </div>
        </div>
        <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          <Icon icon="heroicons:plus" class="w-5 h-5 mr-2 inline" />
          Add Item
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-green-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-green-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Inventory Coming Soon</h3>
      <p class="text-gray-600 dark:text-gray-400">Complete inventory management system is under development.</p>
    </div>
  </div>
</div>
