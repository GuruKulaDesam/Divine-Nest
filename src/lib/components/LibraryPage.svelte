<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let activeTab = "library";
  let searchTerm = "";
  let selectedCategory = "all";

  // Library data organized by family roles and categories
  let books = [
    // Spiritual Books
    { id: 1, title: "Bhagavad Gita", author: "Vyasa", category: "spiritual", ownedBy: "Paati", status: "reading", progress: 60, shelf: "Tamil Spiritual" },
    { id: 2, title: "Thirukkural", author: "Thiruvalluvar", category: "spiritual", ownedBy: "Family", status: "available", progress: 0, shelf: "Tamil Classics" },
    { id: 3, title: "Ramayana", author: "Valmiki", category: "spiritual", ownedBy: "Appa", status: "completed", progress: 100, shelf: "Sanskrit Epics" },

    // Academic Books
    { id: 4, title: "Tamil Literature", author: "U.V. Swaminatha Iyer", category: "academic", ownedBy: "Akka", status: "reading", progress: 30, shelf: "Study Materials" },
    { id: 5, title: "Mathematics Grade 10", author: "NCERT", category: "academic", ownedBy: "Chellam", status: "reading", progress: 45, shelf: "School Books" },

    // Historical/Mythological
    { id: 6, title: "Ponniyin Selvan - Volume 1", author: "Kalki", category: "historical", ownedBy: "Amma", status: "reading", progress: 75, shelf: "Tamil Historical Fiction" },
    { id: 7, title: "Sivagamiyin Sabadham", author: "Kalki", category: "historical", ownedBy: "Family", status: "available", progress: 0, shelf: "Tamil Historical Fiction" },

    // Comics/Entertainment
    { id: 8, title: "Amar Chitra Katha - Hanuman", author: "Anant Pai", category: "comics", ownedBy: "Kanna", status: "completed", progress: 100, shelf: "Children's Comics" },
    { id: 9, title: "Tinkle Digest", author: "Various", category: "comics", ownedBy: "Kanna", status: "reading", progress: 20, shelf: "Children's Comics" },

    // Mystical/Philosophy
    { id: 10, title: "Autobiography of a Yogi", author: "Paramahansa Yogananda", category: "mystical", ownedBy: "Paati", status: "completed", progress: 100, shelf: "Spiritual Philosophy" },
  ];

  let readingGoals = [
    { person: "Paati", currentBooks: 2, goalBooks: 12, genre: "Spiritual & Philosophy" },
    { person: "Amma", currentBooks: 1, goalBooks: 8, genre: "Historical Fiction" },
    { person: "Appa", currentBooks: 1, goalBooks: 6, genre: "Spiritual & Business" },
    { person: "Akka", currentBooks: 2, goalBooks: 15, genre: "Academic & Literature" },
    { person: "Chellam", currentBooks: 1, goalBooks: 10, genre: "Academic & Comics" },
    { person: "Kanna", currentBooks: 2, goalBooks: 20, genre: "Comics & Stories" },
  ];

  let categories = [
    { name: "all", label: "All Books", icon: "heroicons:book-open", count: books.length },
    { name: "spiritual", label: "Spiritual", icon: "heroicons:sparkles", count: books.filter((b) => b.category === "spiritual").length },
    { name: "academic", label: "Academic", icon: "heroicons:academic-cap", count: books.filter((b) => b.category === "academic").length },
    { name: "historical", label: "Historical", icon: "heroicons:globe-alt", count: books.filter((b) => b.category === "historical").length },
    { name: "comics", label: "Comics", icon: "heroicons:face-smile", count: books.filter((b) => b.category === "comics").length },
    { name: "mystical", label: "Mystical", icon: "heroicons:moon", count: books.filter((b) => b.category === "mystical").length },
  ];

  // Filter books based on search and category
  $: filteredBooks = books.filter((book) => {
    const matchesSearch = searchTerm === "" || book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()) || book.ownedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get status color
  function getStatusColor(status) {
    switch (status) {
      case "reading":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "available":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  // Get category color
  function getCategoryColor(category) {
    switch (category) {
      case "spiritual":
        return "text-orange-600 bg-orange-100";
      case "academic":
        return "text-blue-600 bg-blue-100";
      case "historical":
        return "text-purple-600 bg-purple-100";
      case "comics":
        return "text-pink-600 bg-pink-100";
      case "mystical":
        return "text-indigo-600 bg-indigo-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }
</script>

<div class="p-6 max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-base-content mb-2">📚 Family Library & Reading</h1>
    <p class="text-base-content/60">Role-based shelves, reading tracker, and lifelong learning</p>
  </div>

  <!-- Reading Goals Overview -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
    {#each readingGoals as goal}
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-base-content">{goal.person}</h3>
            <span class="text-sm text-base-content/60">{goal.currentBooks}/{goal.goalBooks}</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-2 mb-2">
            <div class="bg-primary h-2 rounded-full transition-all duration-300" style="width: {(goal.currentBooks / goal.goalBooks) * 100}%"></div>
          </div>
          <p class="text-xs text-base-content/60">{goal.genre}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Tabs -->
  <div class="tabs tabs-bordered mb-6">
    <button class="tab {activeTab === 'library' ? 'tab-active' : ''}" on:click={() => (activeTab = "library")}>
      <Icon icon="heroicons:book-open" class="w-4 h-4 mr-2" />
      Library
    </button>
    <button class="tab {activeTab === 'reading-plans' ? 'tab-active' : ''}" on:click={() => (activeTab = "reading-plans")}>
      <Icon icon="heroicons:calendar-days" class="w-4 h-4 mr-2" />
      Reading Plans
    </button>
    <button class="tab {activeTab === 'shelves' ? 'tab-active' : ''}" on:click={() => (activeTab = "shelves")}>
      <Icon icon="heroicons:squares-2x2" class="w-4 h-4 mr-2" />
      Shelves
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeTab === "library"}
    <div class="space-y-6">
      <!-- Search and Filters -->
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-64">
          <div class="relative">
            <Icon icon="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
            <input type="text" placeholder="Search books, authors, or family member..." class="input input-bordered w-full pl-10" bind:value={searchTerm} />
          </div>
        </div>
      </div>

      <!-- Category Filters -->
      <div class="flex flex-wrap gap-2">
        {#each categories as category}
          <button class="btn btn-sm {selectedCategory === category.name ? 'btn-primary' : 'btn-outline'}" on:click={() => (selectedCategory = category.name)}>
            <Icon icon={category.icon} class="w-4 h-4 mr-1" />
            {category.label} ({category.count})
          </button>
        {/each}
      </div>

      <!-- Books Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredBooks as book}
          <div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
            <div class="card-body p-4">
              <div class="flex justify-between items-start mb-2">
                <span class="badge {getCategoryColor(book.category)} badge-sm">{book.category}</span>
                <span class="badge {getStatusColor(book.status)} badge-sm">{book.status}</span>
              </div>

              <h3 class="card-title text-base text-base-content">{book.title}</h3>
              <p class="text-sm text-base-content/60 mb-2">by {book.author}</p>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-base-content/60">Owner:</span>
                  <span class="text-base-content">{book.ownedBy}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-base-content/60">Shelf:</span>
                  <span class="text-base-content text-xs">{book.shelf}</span>
                </div>
                {#if book.status === "reading"}
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-base-content/60">Progress:</span>
                      <span class="text-base-content">{book.progress}%</span>
                    </div>
                    <div class="w-full bg-base-300 rounded-full h-1">
                      <div class="bg-primary h-1 rounded-full transition-all duration-300" style="width: {book.progress}%"></div>
                    </div>
                  </div>
                {/if}
              </div>

              <div class="card-actions justify-end mt-4">
                {#if book.status === "available"}
                  <button class="btn btn-sm btn-primary">Start Reading</button>
                {:else if book.status === "reading"}
                  <button class="btn btn-sm btn-secondary">Update Progress</button>
                {:else}
                  <button class="btn btn-sm btn-outline">Mark as Re-reading</button>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if activeTab === "reading-plans"}
    <div class="space-y-6">
      <!-- Suggested Reading Plans -->
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-base-content">📖 AI-Generated Reading Suggestions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="card bg-base-200 border border-base-300">
              <div class="card-body p-4">
                <h4 class="font-semibold text-base-content">For Paati: Spiritual Wisdom</h4>
                <ul class="text-sm text-base-content/70 space-y-1 mt-2">
                  <li>• Complete Bhagavad Gita commentary</li>
                  <li>• Start Upanishads collection</li>
                  <li>• Tamil devotional poetry</li>
                </ul>
                <button class="btn btn-sm btn-primary mt-3">Create Plan</button>
              </div>
            </div>

            <div class="card bg-base-200 border border-base-300">
              <div class="card-body p-4">
                <h4 class="font-semibold text-base-content">For Akka: Tamil Literature</h4>
                <ul class="text-sm text-base-content/70 space-y-1 mt-2">
                  <li>• Complete Ponniyin Selvan series</li>
                  <li>• Bharathiyar poetry collection</li>
                  <li>• Contemporary Tamil novels</li>
                </ul>
                <button class="btn btn-sm btn-primary mt-3">Create Plan</button>
              </div>
            </div>

            <div class="card bg-base-200 border border-base-300">
              <div class="card-body p-4">
                <h4 class="font-semibold text-base-content">For Kanna: Adventure Stories</h4>
                <ul class="text-sm text-base-content/70 space-y-1 mt-2">
                  <li>• Complete Amar Chitra Katha collection</li>
                  <li>• Tamil children's classics</li>
                  <li>• Science experiment books</li>
                </ul>
                <button class="btn btn-sm btn-primary mt-3">Create Plan</button>
              </div>
            </div>

            <div class="card bg-base-200 border border-base-300">
              <div class="card-body p-4">
                <h4 class="font-semibold text-base-content">Family Reading Challenge</h4>
                <ul class="text-sm text-base-content/70 space-y-1 mt-2">
                  <li>• Monthly family book discussion</li>
                  <li>• Tamil classic reading marathon</li>
                  <li>• Multi-generational storytelling</li>
                </ul>
                <button class="btn btn-sm btn-primary mt-3">Start Challenge</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if activeTab === "shelves"}
    <div class="space-y-6">
      <!-- Shelf Organization -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each [...new Set(books.map((book) => book.shelf))] as shelf}
          <div class="card bg-base-100 border border-base-300 shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-base-content">{shelf}</h3>
              <div class="space-y-2">
                {#each books.filter((book) => book.shelf === shelf) as book}
                  <div class="flex items-center justify-between p-2 bg-base-200 rounded">
                    <div>
                      <p class="text-sm font-medium text-base-content">{book.title}</p>
                      <p class="text-xs text-base-content/60">{book.author}</p>
                    </div>
                    <span class="badge {getStatusColor(book.status)} badge-xs">{book.status}</span>
                  </div>
                {/each}
              </div>
              <div class="card-actions justify-end mt-4">
                <span class="text-sm text-base-content/60">{books.filter((book) => book.shelf === shelf).length} books</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
