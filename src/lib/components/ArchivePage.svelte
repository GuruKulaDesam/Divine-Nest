<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let archivedItems = [];
  let searchTerm = '';
  let selectedCategory = 'all';

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'documents', label: 'Documents' },
    { value: 'images', label: 'Images' },
    { value: 'assignments', label: 'Assignments' },
    { value: 'projects', label: 'Projects' }
  ];

  onMount(() => {
    // Load archived educational content
    archivedItems = [
      { id: 1, title: 'Old Math Worksheets', type: 'documents', date: '2023-08-15', size: '2.3 MB' },
      { id: 2, title: 'Science Project Photos', type: 'images', date: '2023-07-22', size: '15.7 MB' },
      { id: 3, title: 'Completed Assignments', type: 'assignments', date: '2023-06-10', size: '1.8 MB' },
      { id: 4, title: 'History Research Papers', type: 'documents', date: '2023-05-28', size: '4.2 MB' },
      { id: 5, title: 'Art Portfolio', type: 'images', date: '2023-04-15', size: '8.9 MB' },
      { id: 6, title: 'Group Project Files', type: 'projects', date: '2023-03-20', size: '12.4 MB' }
    ];
  });

  $: filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });
</script>

<svelte:head>
  <title>Education Archive - South Indian Family Life App</title>
  <meta name="description" content="Access archived educational materials and completed assignments" />
</svelte:head>

<div class="max-w-6xl mx-auto p-6">
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center gap-3 mb-6">
      <Icon icon="heroicons:archive-box" class="w-8 h-8 text-indigo-600" />
      <h1 class="text-2xl font-bold text-gray-800">Education Archive</h1>
    </div>

    <!-- Search and Filter -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search archived items..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <select
        bind:value={selectedCategory}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {#each categories as category}
          <option value={category.value}>{category.label}</option>
        {/each}
      </select>
    </div>

    <!-- Archive Items -->
    <div class="space-y-4">
      {#each filteredItems as item}
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div class="flex items-center gap-3">
            <Icon
              icon={item.type === 'documents' ? 'heroicons:document-text' :
                    item.type === 'images' ? 'heroicons:photo' :
                    item.type === 'assignments' ? 'heroicons:clipboard-document-list' :
                    'heroicons:folder'}
              class="w-6 h-6 text-gray-600"
            />
            <div>
              <p class="font-medium text-gray-800">{item.title}</p>
              <p class="text-sm text-gray-600">{item.type} • {item.date} • {item.size}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="text-indigo-600 hover:text-indigo-800 p-2" title="Download">
              <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5" />
            </button>
            <button class="text-gray-600 hover:text-gray-800 p-2" title="Restore">
              <Icon icon="heroicons:arrow-path" class="w-5 h-5" />
            </button>
            <button class="text-red-600 hover:text-red-800 p-2" title="Delete">
              <Icon icon="heroicons:trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredItems.length === 0}
      <div class="text-center py-12 text-gray-500">
        <Icon icon="heroicons:archive-box" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p class="text-lg font-medium">
          {#if archivedItems.length === 0}
            No archived items yet
          {:else}
            No items match your search
          {/if}
        </p>
        <p class="text-sm">
          {#if archivedItems.length === 0}
            Completed educational materials will appear here
          {:else}
            Try adjusting your search or filter criteria
          {/if}
        </p>
      </div>
    {/if}

    <!-- Archive Stats -->
    {#if archivedItems.length > 0}
      <div class="mt-8 p-4 bg-indigo-50 rounded-lg">
        <div class="flex items-center justify-between text-sm">
          <span class="text-indigo-700 font-medium">Archive Summary</span>
          <span class="text-indigo-600">{archivedItems.length} items • {archivedItems.reduce((sum, item) => sum + parseFloat(item.size), 0).toFixed(1)} MB total</span>
        </div>
      </div>
    {/if}
  </div>
</div>