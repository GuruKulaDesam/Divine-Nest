<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let searchTerm = "";
  let selectedCategory = "all";
  let showAddModal = false;

  const documentCategories = [
    { id: "warranty", name: "Warranties", icon: "heroicons:shield-check", color: "text-green-600" },
    { id: "purchase", name: "Purchase Bills", icon: "heroicons:receipt-percent", color: "text-blue-600" },
    { id: "insurance", name: "Insurance Papers", icon: "heroicons:document-check", color: "text-purple-600" },
    { id: "ownership", name: "Ownership Proofs", icon: "heroicons:identification", color: "text-orange-600" },
    { id: "manual", name: "User Manuals", icon: "heroicons:book-open", color: "text-gray-600" },
    { id: "service", name: "Service Records", icon: "heroicons:clipboard-document-list", color: "text-cyan-600" },
  ];

  const documents = [
    {
      id: 1,
      name: "Samsung Fridge Warranty",
      assetName: "Samsung Refrigerator",
      category: "warranty",
      issueDate: "2020-03-15",
      expiryDate: "2025-03-15",
      provider: "Samsung India",
      documentNumber: "WTY-SAM-2020-001234",
      status: "active",
      location: "Physical File - Cabinet A",
      digitalCopy: true,
      notes: "5-year comprehensive warranty. Covers compressor for 10 years.",
    },
    {
      id: 2,
      name: "Honda Activa Registration",
      assetName: "Honda Activa 6G",
      category: "ownership",
      issueDate: "2022-01-20",
      expiryDate: "2042-01-20",
      provider: "RTO Chennai",
      documentNumber: "TN09BH1234",
      status: "active",
      location: "Safe Locker",
      digitalCopy: true,
      notes: "Original RC book. Insurance policy attached separately.",
    },
    {
      id: 3,
      name: "Dining Table Purchase Bill",
      assetName: "Teak Wood Dining Table",
      category: "purchase",
      issueDate: "2018-12-10",
      expiryDate: null,
      provider: "Raman Furniture Works",
      documentNumber: "INV-2018-0876",
      status: "active",
      location: "Physical File - Cabinet B",
      digitalCopy: false,
      notes: "Custom made table. Includes wood quality certificate.",
    },
    {
      id: 4,
      name: "Washing Machine Service Manual",
      assetName: "LG Washing Machine",
      category: "manual",
      issueDate: "2021-05-10",
      expiryDate: null,
      provider: "LG Electronics",
      documentNumber: "MAN-LG-WM-2021",
      status: "active",
      location: "Digital Only",
      digitalCopy: true,
      notes: "Downloaded from LG website. Includes troubleshooting guide.",
    },
  ];

  let filteredDocuments = documents;
  let newDocument = {
    name: "",
    assetName: "",
    category: "",
    issueDate: "",
    expiryDate: "",
    provider: "",
    documentNumber: "",
    location: "",
    notes: "",
  };

  $: {
    filteredDocuments = documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.assetName.toLowerCase().includes(searchTerm.toLowerCase()) || doc.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  onMount(() => {
    document.title = "Documents & Ownership - Assets Management";
  });

  function getStatusColor(status, expiryDate) {
    if (status === "expired") return "bg-red-100 text-red-800 border-red-200";
    if (expiryDate && isExpiringSoon(expiryDate)) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-green-100 text-green-800 border-green-200";
  }

  function getStatusText(status, expiryDate) {
    if (status === "expired") return "Expired";
    if (expiryDate && isExpiringSoon(expiryDate)) return "Expiring Soon";
    return "Active";
  }

  function getCategoryInfo(categoryId) {
    return documentCategories.find((cat) => cat.id === categoryId) || { name: "Unknown", icon: "heroicons:question-mark-circle", color: "text-gray-500" };
  }

  function isExpiringSoon(expiryDate) {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffMonths = (expiry.getFullYear() - today.getFullYear()) * 12 + (expiry.getMonth() - today.getMonth());
    return diffMonths <= 3 && diffMonths >= 0;
  }

  function addDocument() {
    // Add document logic would go here
    showAddModal = false;
    // Reset form
    newDocument = {
      name: "",
      assetName: "",
      category: "",
      issueDate: "",
      expiryDate: "",
      provider: "",
      documentNumber: "",
      location: "",
      notes: "",
    };
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN");
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white shadow-lg">
        <Icon icon="heroicons:document-text" class="w-8 h-8" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Documents & Ownership</h1>
        <p class="text-gray-600 dark:text-gray-300">Manage proofs, warranties, and important papers</p>
      </div>
    </div>
    <button class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg flex items-center space-x-2" on:click={() => (showAddModal = true)}>
      <Icon icon="heroicons:plus" class="w-5 h-5" />
      <span>Add Document</span>
    </button>
  </div>

  <!-- Document Categories Summary -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    {#each documentCategories as category}
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer">
        <div class="text-center">
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg w-fit mx-auto mb-3">
            <Icon icon={category.icon} class="w-6 h-6 {category.color}" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm">{category.name}</h3>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {documents.filter((doc) => doc.category === category.id).length} docs
          </p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Filters -->
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Documents</label>
        <div class="relative">
          <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" bind:value={searchTerm} placeholder="Search by document name, asset, or provider..." class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
        <select bind:value={selectedCategory} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
          <option value="all">All Categories</option>
          {#each documentCategories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Documents List -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each filteredDocuments as document}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <div class="p-6">
          <!-- Document Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start space-x-3 flex-1">
              <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Icon icon={getCategoryInfo(document.category).icon} class="w-5 h-5 {getCategoryInfo(document.category).color}" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{document.name}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{document.assetName}</p>
                <div class="flex items-center space-x-2 mt-2">
                  <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    {getCategoryInfo(document.category).name}
                  </span>
                  <span class="px-2 py-1 text-xs font-medium border rounded-full {getStatusColor(document.status, document.expiryDate)}">
                    {getStatusText(document.status, document.expiryDate)}
                  </span>
                </div>
              </div>
            </div>

            {#if document.digitalCopy}
              <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Icon icon="heroicons:cloud" class="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            {/if}
          </div>

          <!-- Document Details -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Document Number:</span>
              <span class="font-mono text-gray-900 dark:text-white">{document.documentNumber}</span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Provider:</span>
              <span class="font-medium text-gray-900 dark:text-white">{document.provider}</span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Issue Date:</span>
              <span class="font-medium text-gray-900 dark:text-white">{formatDate(document.issueDate)}</span>
            </div>

            {#if document.expiryDate}
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Expiry Date:</span>
                <span class="font-medium {isExpiringSoon(document.expiryDate) ? 'text-orange-600' : 'text-gray-900 dark:text-white'}">
                  {formatDate(document.expiryDate)}
                  {#if isExpiringSoon(document.expiryDate)}
                    <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 inline ml-1 text-orange-500" />
                  {/if}
                </span>
              </div>
            {/if}

            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Location:</span>
              <span class="font-medium text-gray-900 dark:text-white">{document.location}</span>
            </div>

            {#if document.notes}
              <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-600 dark:text-gray-400">{document.notes}</p>
              </div>
            {/if}
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-2 mt-6">
            <button class="flex-1 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"> View Details </button>
            {#if document.digitalCopy}
              <button class="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"> Download </button>
            {:else}
              <button class="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"> Scan Copy </button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredDocuments.length === 0}
    <div class="text-center py-12">
      <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4">
        <Icon icon="heroicons:document-text" class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
      <p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
    </div>
  {/if}
</div>

<!-- Add Document Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" on:click={() => (showAddModal = false)}>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Document</h2>
          <button class="text-gray-400 hover:text-gray-600" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={addDocument} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Document Name *</label>
              <input type="text" bind:value={newDocument.name} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Samsung Fridge Warranty" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Related Asset *</label>
              <input type="text" bind:value={newDocument.assetName} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Samsung Refrigerator" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select bind:value={newDocument.category} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select Category</option>
                {#each documentCategories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Provider *</label>
              <input type="text" bind:value={newDocument.provider} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Samsung India, RTO Chennai" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Document Number</label>
              <input type="text" bind:value={newDocument.documentNumber} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., WTY-SAM-2020-001234" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Date *</label>
              <input type="date" bind:value={newDocument.issueDate} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
              <input type="date" bind:value={newDocument.expiryDate} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Physical Location *</label>
              <input type="text" bind:value={newDocument.location} required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., Safe Locker, Physical File - Cabinet A" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
              <textarea bind:value={newDocument.notes} rows="3" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Any additional notes about this document..."></textarea>
            </div>
          </div>

          <div class="flex space-x-4 pt-6">
            <button type="button" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"> Add Document </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
