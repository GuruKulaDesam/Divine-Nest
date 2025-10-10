<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let achievements = [
    {
      id: 1,
      title: 'First Place in Science Fair',
      description: 'Won first place in the district science fair for the environmental project',
      category: 'Academic',
      date: '2024-03-15',
      points: 100,
      status: 'completed',
      icon: 'mdi:trophy',
      color: 'text-yellow-500'
    },
    {
      id: 2,
      title: 'Perfect Attendance',
      description: 'Maintained perfect attendance for the entire academic year',
      category: 'Academic',
      date: '2024-04-30',
      points: 50,
      status: 'completed',
      icon: 'mdi:calendar-check',
      color: 'text-green-500'
    },
    {
      id: 3,
      title: 'Learning Tamil Script',
      description: 'Successfully learned to read and write Tamil script',
      category: 'Cultural',
      date: '2024-02-20',
      points: 75,
      status: 'completed',
      icon: 'mdi:book-open-variant',
      color: 'text-blue-500'
    },
    {
      id: 4,
      title: 'Community Service',
      description: 'Completed 50 hours of community service at local temple',
      category: 'Service',
      date: '2024-05-10',
      points: 80,
      status: 'in-progress',
      icon: 'mdi:hand-heart',
      color: 'text-purple-500'
    }
  ];

  let filteredAchievements = achievements;
  let searchQuery = '';
  let selectedCategory = 'all';
  let showAddModal = false;

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'mdi:view-list' },
    { id: 'Academic', name: 'Academic', icon: 'mdi:school' },
    { id: 'Cultural', name: 'Cultural', icon: 'mdi:account-group' },
    { id: 'Sports', name: 'Sports', icon: 'mdi:soccer' },
    { id: 'Service', name: 'Service', icon: 'mdi:hand-heart' },
    { id: 'Arts', name: 'Arts', icon: 'mdi:palette' }
  ];

  const statusOptions = [
    { id: 'completed', name: 'Completed', color: 'bg-green-100 text-green-800' },
    { id: 'in-progress', name: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { id: 'planned', name: 'Planned', color: 'bg-gray-100 text-gray-800' }
  ];

  let newAchievement = {
    title: '',
    description: '',
    category: 'Academic',
    date: '',
    points: 0,
    status: 'planned'
  };

  $: {
    filteredAchievements = achievements.filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  function addAchievement() {
    if (newAchievement.title.trim()) {
      const achievement = {
        ...newAchievement,
        id: Date.now(),
        icon: getCategoryIcon(newAchievement.category),
        color: getCategoryColor(newAchievement.category)
      };
      achievements = [...achievements, achievement];
      newAchievement = { title: '', description: '', category: 'Academic', date: '', points: 0, status: 'planned' };
      showAddModal = false;
    }
  }

  function deleteAchievement(id) {
    achievements = achievements.filter(a => a.id !== id);
  }

  function getCategoryIcon(category) {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : 'mdi:star';
  }

  function getCategoryColor(category) {
    const colors = {
      'Academic': 'text-blue-500',
      'Cultural': 'text-purple-500',
      'Sports': 'text-green-500',
      'Service': 'text-red-500',
      'Arts': 'text-pink-500'
    };
    return colors[category] || 'text-gray-500';
  }

  function getTotalPoints() {
    return achievements.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.points, 0);
  }

  function getCompletionRate() {
    if (achievements.length === 0) return 0;
    return Math.round((achievements.filter(a => a.status === 'completed').length / achievements.length) * 100);
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Achievements</h1>
      <p class="text-base-content/60 mt-1">Track and celebrate accomplishments and milestones</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary"
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Achievement
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-blue-500 rounded-full">
            <Icon icon="mdi:trophy" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Total Achievements</h3>
            <p class="text-2xl font-bold text-blue-600">{achievements.length}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-green-500 rounded-full">
            <Icon icon="mdi:star" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Points Earned</h3>
            <p class="text-2xl font-bold text-green-600">{getTotalPoints()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
      <div class="card-body">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-purple-500 rounded-full">
            <Icon icon="mdi:chart-line" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base-content">Completion Rate</h3>
            <p class="text-2xl font-bold text-purple-600">{getCompletionRate()}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search achievements..."
        class="input input-bordered w-full"
      />
    </div>
    <select bind:value={selectedCategory} class="select select-bordered">
      {#each categories as category}
        <option value={category.id}>{category.name}</option>
      {/each}
    </select>
  </div>

  <!-- Category Filter Buttons -->
  <div class="flex flex-wrap gap-2">
    {#each categories.slice(1) as category}
      <button
        class="btn btn-sm {selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}"
        on:click={() => selectedCategory = category.id}
      >
        <Icon icon={category.icon} class="w-4 h-4" />
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Achievements Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredAchievements as achievement}
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-300">
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-base-200 rounded-lg">
                <Icon icon={achievement.icon} class="w-6 h-6 {achievement.color}" />
              </div>
              <div>
                <h3 class="font-semibold text-base-content">{achievement.title}</h3>
                <p class="text-sm text-base-content/60">{achievement.category}</p>
              </div>
            </div>
            <div class="dropdown dropdown-end">
              <button class="btn btn-ghost btn-sm">
                <Icon icon="mdi:dots-vertical" class="w-4 h-4" />
              </button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Edit</a></li>
                <li><a class="text-error" on:click={() => deleteAchievement(achievement.id)}>Delete</a></li>
              </ul>
            </div>
          </div>

          <p class="text-sm text-base-content/80 mt-2">{achievement.description}</p>

          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:calendar" class="w-4 h-4 text-base-content/60" />
              <span class="text-sm text-base-content/60">{new Date(achievement.date).toLocaleDateString()}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:star" class="w-4 h-4 text-yellow-500" />
              <span class="text-sm font-semibold text-base-content">{achievement.points} pts</span>
            </div>
          </div>

          <div class="mt-3">
            <span class="badge {statusOptions.find(s => s.id === achievement.status)?.color}">
              {statusOptions.find(s => s.id === achievement.status)?.name}
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredAchievements.length === 0}
    <div class="text-center py-12">
      <Icon icon="mdi:trophy-outline" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-base-content/60">No achievements found</h3>
      <p class="text-base-content/40">Start by adding your first achievement!</p>
    </div>
  {/if}
</div>

<!-- Add Achievement Modal -->
{#if showAddModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <h3 class="font-bold text-lg mb-4">Add New Achievement</h3>

      <form on:submit|preventDefault={addAchievement} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-base-content mb-2">Title</label>
          <input
            type="text"
            bind:value={newAchievement.title}
            placeholder="Achievement title"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-base-content mb-2">Description</label>
          <textarea
            bind:value={newAchievement.description}
            placeholder="Describe the achievement"
            rows="3"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Category</label>
            <select bind:value={newAchievement.category} class="select select-bordered w-full">
              {#each categories.slice(1) as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Points</label>
            <input
              type="number"
              bind:value={newAchievement.points}
              min="0"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Date</label>
            <input
              type="date"
              bind:value={newAchievement.date}
              class="input input-bordered w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-base-content mb-2">Status</label>
            <select bind:value={newAchievement.status} class="select select-bordered w-full">
              {#each statusOptions as status}
                <option value={status.id}>{status.name}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={() => showAddModal = false}>Cancel</button>
          <button type="submit" class="btn btn-primary">Add Achievement</button>
        </div>
      </form>
    </div>
  </div>
{/if}