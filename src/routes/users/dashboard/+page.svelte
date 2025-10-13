<script>
  import { onMount } from 'svelte';
  import { users } from '$lib/stores/users';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { goto } from '$app/navigation';

  let usersData = [];
  let filteredUsers = [];
  let analytics = {
    totalUsers: 0,
    familyMembers: 0,
    serviceProviders: 0,
    guests: 0,
    recentJoins: 0,
    byRole: {},
    byAuthProvider: {}
  };

  // Subscribe to store
  const unsubscribe = users.subscribe(data => {
    usersData = data;
    filteredUsers = data;
    calculateAnalytics();
  });

  function calculateAnalytics() {
    const stats = users.getUserStats();
    analytics.totalUsers = stats.total;
    analytics.byRole = stats.byRole;
    analytics.byAuthProvider = stats.byAuthProvider;
    analytics.recentJoins = stats.recentJoins;

    // Calculate specific counts
    analytics.familyMembers = users.getFamilyMembers().length;
    analytics.serviceProviders = users.getServiceProviders().length;
    analytics.guests = usersData.filter(u => u.role === 'Guest').length;
  }

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
      goto('/users/create');
    } else if (lowerCommand.includes('review') || lowerCommand.includes('view') || lowerCommand.includes('list')) {
      goto('/users/review');
    } else if (lowerCommand.includes('family') || lowerCommand.includes('members')) {
      // Filter to show only family members
      filteredUsers = users.getFamilyMembers();
    } else if (lowerCommand.includes('service') || lowerCommand.includes('provider')) {
      // Filter to show only service providers
      filteredUsers = users.getServiceProviders();
    } else if (lowerCommand.includes('guest')) {
      // Filter to show only guests
      filteredUsers = usersData.filter(u => u.role === 'Guest');
    }
  }

  onMount(() => {
    // Initial analytics calculation
    calculateAnalytics();
  });

  // Cleanup subscription
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:head>
  <title>Users Dashboard - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Users Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">Manage family members, service providers, and guests</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <VoiceInput onResult={handleVoiceCommand} placeholder="Say 'show family members' or 'add new user'" />
      <button
        class="btn btn-primary"
        on:click={() => goto('/users/create')}
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add User
      </button>
    </div>
  </div>

  <!-- Analytics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Users -->
    <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Total Users</h3>
            <p class="text-3xl font-bold">{analytics.totalUsers}</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Family Members -->
    <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Family Members</h3>
            <p class="text-3xl font-bold">{analytics.familyMembers}</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Service Providers -->
    <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Service Providers</h3>
            <p class="text-3xl font-bold">{analytics.serviceProviders}</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Recent Joins -->
    <div class="card bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold opacity-90">Recent Joins</h3>
            <p class="text-3xl font-bold">{analytics.recentJoins}</p>
            <p class="text-sm opacity-80">Last 7 days</p>
          </div>
          <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Role Distribution -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <div class="card bg-white dark:bg-gray-800 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-gray-900 dark:text-white">Users by Role</h2>
        <div class="space-y-3">
          {#each Object.entries(analytics.byRole) as [role, count]}
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">{role}</span>
              <div class="flex items-center gap-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-full"
                    style="width: {(count / analytics.totalUsers) * 100}%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">{count}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="card bg-white dark:bg-gray-800 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-gray-900 dark:text-white">Authentication Methods</h2>
        <div class="space-y-3">
          {#each Object.entries(analytics.byAuthProvider) as [provider, count]}
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">{provider}</span>
              <div class="flex items-center gap-2">
                <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full"
                    style="width: {(count / analytics.totalUsers) * 100}%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">{count}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <button
      class="card bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
      on:click={() => goto('/users/create')}
    >
      <div class="card-body">
        <div class="flex items-center">
          <svg class="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Add New User</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Register family member or service provider</p>
          </div>
        </div>
      </div>
    </button>

    <button
      class="card bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500"
      on:click={() => goto('/users/review')}
    >
      <div class="card-body">
        <div class="flex items-center">
          <svg class="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Review All Users</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">Manage user accounts and permissions</p>
          </div>
        </div>
      </div>
    </button>

    <button
      class="card bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500"
      on:click={() => {
        filteredUsers = users.getFamilyMembers();
      }}
    >
      <div class="card-body">
        <div class="flex items-center">
          <svg class="w-8 h-8 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Family Members</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">View core family user profiles</p>
          </div>
        </div>
      </div>
    </button>
  </div>

  <!-- Recent Users Table -->
  <div class="card bg-white dark:bg-gray-800 shadow-lg">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Recent Users</h2>
        <button
          class="btn btn-outline btn-sm"
          on:click={() => goto('/users/review')}
        >
          View All
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Location</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredUsers.slice(0, 5) as user}
              <tr class="hover">
                <td>
                  {#if user.picture_url}
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                        <img src={user.picture_url} alt={user.name} />
                      </div>
                    </div>
                  {:else}
                    <div class="avatar placeholder">
                      <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
                        <span class="text-sm">{user.name.charAt(0)}</span>
                      </div>
                    </div>
                  {/if}
                </td>
                <td>
                  <div>
                    <div class="font-medium">{user.name}</div>
                    {#if user.nick_name}
                      <div class="text-sm text-gray-500">"{user.nick_name}"</div>
                    {/if}
                  </div>
                </td>
                <td>
                  <span class="badge badge-outline badge-primary">{user.role}</span>
                </td>
                <td class="text-sm">{user.email}</td>
                <td>{user.location || 'Not specified'}</td>
                <td class="text-sm">
                  {new Date(user.joined_date).toLocaleDateString()}
                </td>
                <td>
                  <div class="flex gap-2">
                    <button
                      class="btn btn-ghost btn-xs"
                      on:click={() => goto(`/users/update/${user.id}`)}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      class="btn btn-ghost btn-xs text-red-500"
                      on:click={() => {
                        if (confirm('Delete this user?')) {
                          users.deleteUser(user.id);
                        }
                      }}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Discussion Forum -->
  <div class="mt-8">
    <DiscussionForum tableName="users" recordId="dashboard" />
  </div>
</div>