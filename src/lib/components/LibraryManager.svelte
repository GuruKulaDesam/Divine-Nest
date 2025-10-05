<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";

  import { getBooks, getBooksByCategory, getBooksByOwner, addBook, updateBook, deleteBook, updateReadingProgress } from "../data/education.js";

  const dispatch = createEventDispatcher();

  let books = [];
  let filteredBooks = [];
  let showAddForm = false;
  let editingBook = null;
  let searchQuery = "";
  let selectedCategory = "all";
  let selectedOwner = "all";
  let formData = {
    title: "",
    author: "",
    category: "academic",
    ownedBy: "family",
    totalPages: "",
    notes: "",
  };

  const categories = [
    { value: "spiritual", label: "Spiritual", icon: "heroicons:sparkles", color: "text-purple-500" },
    { value: "comics", label: "Comics", icon: "heroicons:face-smile", color: "text-pink-500" },
    { value: "historical", label: "Historical", icon: "heroicons:clock", color: "text-amber-500" },
    { value: "mythics", label: "Mythics", icon: "heroicons:star", color: "text-indigo-500" },
    { value: "mystics", label: "Mystics", icon: "heroicons:eye", color: "text-cyan-500" },
    { value: "academic", label: "Academic", icon: "heroicons:academic-cap", color: "text-green-500" },
  ];

  const owners = [
    { value: "amma", label: "Amma" },
    { value: "appa", label: "Appa" },
    { value: "paati", label: "Paati" },
    { value: "children", label: "Children" },
    { value: "family", label: "Family" },
  ];

  // Load books on mount
  async function loadBooks() {
    try {
      books = await getBooks();
      applyFilters();
    } catch (error) {
      console.error("Error loading books:", error);
    }
  }

  // Initialize
  loadBooks();

  function applyFilters() {
    let filtered = books;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Owner filter
    if (selectedOwner !== "all") {
      filtered = filtered.filter((book) => book.ownedBy === selectedOwner);
    }

    filteredBooks = filtered;
  }

  $: applyFilters();

  function resetForm() {
    formData = {
      title: "",
      author: "",
      category: "academic",
      ownedBy: "family",
      totalPages: "",
      notes: "",
    };
    editingBook = null;
    showAddForm = false;
  }

  function startEdit(book) {
    editingBook = book;
    formData = {
      title: book.title,
      author: book.author,
      category: book.category,
      ownedBy: book.ownedBy,
      totalPages: book.totalPages?.toString() || "",
      notes: book.notes || "",
    };
    showAddForm = true;
  }

  async function handleSubmit() {
    try {
      const bookData = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        ownedBy: formData.ownedBy,
        totalPages: formData.totalPages ? parseInt(formData.totalPages) : undefined,
        notes: formData.notes || undefined,
        status: "available",
        progress: 0,
      };

      if (editingBook) {
        await updateBook(editingBook.id, bookData);
      } else {
        await addBook(bookData);
      }

      resetForm();
      await loadBooks();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  }

  async function handleDelete(bookId) {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(bookId);
        await loadBooks();
        dispatch("dataChanged");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  }

  async function updateBookStatus(bookId, status) {
    try {
      await updateBook(bookId, { status });
      await loadBooks();
      dispatch("dataChanged");
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  }

  function getCategoryInfo(category) {
    return categories.find((c) => c.value === category) || categories[0];
  }

  function getProgressColor(progress) {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 80) return "bg-blue-500";
    if (progress >= 60) return "bg-yellow-500";
    if (progress >= 40) return "bg-orange-500";
    return "bg-red-500";
  }

  function getStatusColor(status) {
    switch (status) {
      case "reading":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
</script>

<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
      <Icon icon="heroicons:book-open" class="text-green-500" />
      Family Library Manager
    </h2>
    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <Icon icon="heroicons:plus" class="text-lg" />
      {showAddForm ? "Cancel" : "Add Book"}
    </button>
  </div>

  <!-- Filters -->
  <div class="mb-6 p-4 bg-gray-50 rounded-xl">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <input type="text" bind:value={searchQuery} placeholder="Search by title or author..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select bind:value={selectedCategory} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category.value}>{category.label}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Owned By</label>
        <select bind:value={selectedOwner} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="all">All Owners</option>
          {#each owners as owner}
            <option value={owner.value}>{owner.label}</option>
          {/each}
        </select>
      </div>
      <div class="flex items-end">
        <button
          class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          on:click={() => {
            searchQuery = "";
            selectedCategory = "all";
            selectedOwner = "all";
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>

  <!-- Add/Edit Form -->
  {#if showAddForm}
    <div class="mb-6 p-6 bg-green-50 rounded-xl border border-green-200" in:fade>
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {editingBook ? "Edit Book" : "Add New Book"}
      </h3>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" bind:value={formData.title} placeholder="Book title" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input type="text" bind:value={formData.author} placeholder="Author name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select bind:value={formData.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              {#each categories as category}
                <option value={category.value}>{category.label}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Owned By</label>
            <select bind:value={formData.ownedBy} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              {#each owners as owner}
                <option value={owner.value}>{owner.label}</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Total Pages (optional)</label>
            <input type="number" bind:value={formData.totalPages} placeholder="e.g., 300" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea bind:value={formData.notes} placeholder="Additional notes about the book..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
        </div>
        <div class="flex gap-3">
          <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            {editingBook ? "Update Book" : "Add Book"}
          </button>
          <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={resetForm}> Cancel </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Books Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredBooks as book}
      <div class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-gray-50 rounded-lg">
              <Icon icon={getCategoryInfo(book.category).icon} class="{getCategoryInfo(book.category).color} text-xl" />
            </div>
            <div>
              <span class="inline-block px-2 py-1 text-xs font-medium rounded-full {getStatusColor(book.status)}">
                {book.status}
              </span>
            </div>
          </div>
          <div class="flex gap-1">
            <button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200" on:click={() => startEdit(book)}>
              <Icon icon="heroicons:pencil" class="text-sm" />
            </button>
            <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" on:click={() => handleDelete(book.id)}>
              <Icon icon="heroicons:trash" class="text-sm" />
            </button>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
          <p class="text-sm text-gray-600 mb-2">by {book.author}</p>
          <p class="text-xs text-gray-500">Owned by: {owners.find((o) => o.value === book.ownedBy)?.label || book.ownedBy}</p>
        </div>

        {#if book.totalPages}
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600">Progress</span>
              <span class="font-medium">{book.progress}% ({book.currentPage || 0}/{book.totalPages} pages)</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="{getProgressColor(book.progress)} h-2 rounded-full transition-all duration-300" style="width: {book.progress}%"></div>
            </div>
          </div>
        {/if}

        {#if book.rating}
          <div class="flex items-center gap-1 mb-3">
            {#each Array(5) as _, i}
              <Icon icon="heroicons:star" class="text-sm {i < book.rating ? 'text-yellow-400' : 'text-gray-300'}" />
            {/each}
            <span class="text-sm text-gray-600 ml-2">{book.rating}/5</span>
          </div>
        {/if}

        <div class="flex gap-2">
          <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200" on:click={() => updateBookStatus(book.id, book.status === "reading" ? "available" : "reading")}>
            {book.status === "reading" ? "Mark Available" : "Start Reading"}
          </button>
          {#if book.status === "reading"}
            <button class="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200" on:click={() => updateBookStatus(book.id, "completed")}> Mark Complete </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredBooks.length === 0}
    <div class="text-center py-12">
      <Icon icon="heroicons:book-open" class="text-gray-300 text-6xl mx-auto mb-4" />
      <h3 class="text-xl font-medium text-gray-600 mb-2">
        {books.length === 0 ? "No Books in Library" : "No Books Match Filters"}
      </h3>
      <p class="text-gray-500 mb-4">
        {books.length === 0 ? "Add your first book to start building your family library" : "Try adjusting your search or filters"}
      </p>
      {#if books.length === 0}
        <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200" on:click={() => (showAddForm = true)}> Add First Book </button>
      {/if}
    </div>
  {/if}
</div>
