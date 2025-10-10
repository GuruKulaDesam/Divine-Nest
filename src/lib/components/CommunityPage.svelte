<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let communityPosts = [
    {
      id: 1,
      author: 'Rajesh Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
      title: 'Traditional South Indian Wedding Planning Tips',
      content: 'Sharing some insights on planning traditional weddings in our community...',
      category: 'Events',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      tags: ['wedding', 'tradition', 'family']
    },
    {
      id: 2,
      author: 'Priya Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      title: 'Best Places for South Indian Cuisine in Kovai',
      content: 'Here are my favorite restaurants serving authentic South Indian food...',
      category: 'Food',
      likes: 31,
      comments: 12,
      timestamp: '4 hours ago',
      tags: ['food', 'restaurants', 'authentic']
    },
    {
      id: 3,
      author: 'Arun Prasad',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun',
      title: 'Temple Visit Schedule for This Month',
      category: 'Religion',
      likes: 18,
      comments: 5,
      timestamp: '6 hours ago',
      tags: ['temple', 'schedule', 'spiritual']
    }
  ];

  let selectedCategory = 'all';
  let searchQuery = '';
  let showNewPostModal = false;

  let newPost = {
    title: '',
    content: '',
    category: 'General'
  };

  const categories = [
    { id: 'all', name: 'All Posts', icon: 'mdi:forum' },
    { id: 'general', name: 'General', icon: 'mdi:chat' },
    { id: 'events', name: 'Events', icon: 'mdi:calendar' },
    { id: 'food', name: 'Food', icon: 'mdi:food' },
    { id: 'religion', name: 'Religion', icon: 'mdi:temple-hindu' },
    { id: 'education', name: 'Education', icon: 'mdi:school' },
    { id: 'health', name: 'Health', icon: 'mdi:heart' },
    { id: 'business', name: 'Business', icon: 'mdi:briefcase' }
  ];

  $: filteredPosts = communityPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  function addPost() {
    if (newPost.title && newPost.content) {
      const post = {
        id: communityPosts.length + 1,
        author: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        tags: []
      };
      communityPosts = [post, ...communityPosts];
      newPost = { title: '', content: '', category: 'General' };
      showNewPostModal = false;
    }
  }

  function likePost(postId) {
    communityPosts = communityPosts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
  }

  function getCategoryIcon(category) {
    const cat = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
    return cat ? cat.icon : 'mdi:chat';
  }

  function getCategoryColor(category) {
    const colors = {
      'Events': 'bg-blue-100 text-blue-800',
      'Food': 'bg-green-100 text-green-800',
      'Religion': 'bg-orange-100 text-orange-800',
      'General': 'bg-gray-100 text-gray-800',
      'Education': 'bg-purple-100 text-purple-800',
      'Health': 'bg-red-100 text-red-800',
      'Business': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Community Forum</h1>
      <p class="text-base-content/60 mt-1">Connect with fellow community members and share experiences</p>
    </div>
    <button
      on:click={() => showNewPostModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      New Post
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:forum" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Posts</div>
      <div class="stat-value text-primary">{communityPosts.length}</div>
    </div>
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-secondary">
        <Icon icon="mdi:account-group" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active Members</div>
      <div class="stat-value text-secondary">127</div>
    </div>
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-accent">
        <Icon icon="mdi:heart" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Likes</div>
      <div class="stat-value text-accent">{communityPosts.reduce((sum, post) => sum + post.likes, 0)}</div>
    </div>
    <div class="stat bg-base-100 rounded-xl shadow-sm">
      <div class="stat-figure text-info">
        <Icon icon="mdi:comment" class="w-8 h-8" />
      </div>
      <div class="stat-title">Comments</div>
      <div class="stat-value text-info">{communityPosts.reduce((sum, post) => sum + post.comments, 0)}</div>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="bg-base-100 rounded-xl p-6 shadow-sm">
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1">
        <div class="relative">
          <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search posts, topics, or tags..."
            class="input input-bordered w-full pl-10"
          />
        </div>
      </div>
      <!-- Category Filter -->
      <div class="lg:w-64">
        <select bind:value={selectedCategory} class="select select-bordered w-full">
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Category Pills -->
  <div class="flex flex-wrap gap-2">
    {#each categories.slice(1) as category}
      <button
        class="btn btn-sm gap-2 {selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}"
        on:click={() => selectedCategory = category.id}
      >
        <Icon icon={category.icon} class="w-4 h-4" />
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Posts List -->
  <div class="space-y-4">
    {#each filteredPosts as post}
      <div class="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <!-- Avatar -->
          <img
            src={post.avatar}
            alt={post.author}
            class="w-12 h-12 rounded-full"
          />

          <!-- Post Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="font-semibold text-base-content">{post.author}</h3>
                  <span class="text-sm text-base-content/60">{post.timestamp}</span>
                </div>
                <h4 class="text-lg font-medium text-base-content mb-2">{post.title}</h4>
                {#if post.content}
                  <p class="text-base-content/80 mb-3">{post.content}</p>
                {/if}
                <div class="flex items-center gap-4">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getCategoryColor(post.category)}">
                    <Icon icon={getCategoryIcon(post.category)} class="w-3 h-3 mr-1" />
                    {post.category}
                  </span>
                  {#if post.tags.length > 0}
                    <div class="flex gap-1">
                      {#each post.tags as tag}
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-base-200 text-base-content/70">
                          #{tag}
                        </span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4 mt-4 pt-4 border-t border-base-300">
              <button
                on:click={() => likePost(post.id)}
                class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-red-500"
              >
                <Icon icon="mdi:heart" class="w-4 h-4" />
                {post.likes}
              </button>
              <button class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-blue-500">
                <Icon icon="mdi:comment" class="w-4 h-4" />
                {post.comments}
              </button>
              <button class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-green-500">
                <Icon icon="mdi:share" class="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredPosts.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:forum-outline" class="w-16 h-16 text-base-content/20 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-base-content/60 mb-2">No posts found</h3>
      <p class="text-base-content/40">Try adjusting your search or category filter</p>
    </div>
  {/if}
</div>

<!-- New Post Modal -->
{#if showNewPostModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
      <div class="p-6 border-b border-base-300">
        <h3 class="text-xl font-bold text-base-content">Create New Post</h3>
      </div>

      <div class="p-6 overflow-y-auto max-h-96">
        <form on:submit|preventDefault={addPost} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Title</label>
            <input
              type="text"
              bind:value={newPost.title}
              placeholder="What's your post about?"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Category</label>
            <select bind:value={newPost.category} class="select select-bordered w-full">
              {#each categories.slice(1) as category}
                <option value={category.name}>{category.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Content</label>
            <textarea
              bind:value={newPost.content}
              placeholder="Share your thoughts, experiences, or questions..."
              rows="6"
              class="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>
        </form>
      </div>

      <div class="p-6 border-t border-base-300 flex justify-end gap-3">
        <button
          on:click={() => showNewPostModal = false}
          class="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          on:click={addPost}
          class="btn btn-primary"
          disabled={!newPost.title || !newPost.content}
        >
          Post
        </button>
      </div>
    </div>
  </div>
{/if}