<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { sqliteService } from "$lib/services/sqliteService";

  let users = [];
  let showAddForm = false;
  let editingUser = null;
  let searchTerm = "";
  let selectedRole = "";
  let selectedAuthProvider = "";

  // Form data
  let formData = {
    role: "Child",
    name: "",
    nick_name: "",
    email: "",
    location: "",
    joined_date: new Date().toISOString().split('T')[0],
    picture_url: "",
    auth_provider: "Manual"
  };

  // Load users on mount
  onMount(async () => {
    await loadUsers();
  });

  async function loadUsers() {
    try {
      users = await sqliteService.getUsers();
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  function resetForm() {
    formData = {
      role: "Child",
      name: "",
      nick_name: "",
      email: "",
      location: "",
      joined_date: new Date().toISOString().split('T')[0],
      picture_url: "",
      auth_provider: "Manual"
    };
  }

  async function saveUser() {
    try {
      const userData = {
        ...formData,
        id: editingUser ? editingUser.id : crypto.randomUUID(),
        created_at: editingUser ? editingUser.created_at : new Date().toISOString()
      };

      if (editingUser) {
        await sqliteService.updateUser(userData);
      } else {
        await sqliteService.saveUser(userData);
      }

      await loadUsers();
      showAddForm = false;
      editingUser = null;
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  function editUser(user) {
    editingUser = user;
    formData = {
      ...user,
      joined_date: user.joined_date.split('T')[0] // Convert to date input format
    };
    showAddForm = true;
  }

  async function deleteUser(user) {
    if (confirm(`Delete user "${user.name}"?`)) {
      try {
        await sqliteService.deleteUser(user.id);
        await loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  }

  function cancelEdit() {
    showAddForm = false;
    editingUser = null;
    resetForm();
  }

  // Filter users based on search and filters
  $: filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.nick_name && user.nick_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesAuthProvider = !selectedAuthProvider || user.auth_provider === selectedAuthProvider;

    return matchesSearch && matchesRole && matchesAuthProvider;
  });

  // Get unique values for filters
  $: roles = [...new Set(users.map(u => u.role))];
  $: authProviders = [...new Set(users.map(u => u.auth_provider))];

  // Group users by role for display
  $: groupedUsers = filteredUsers.reduce((groups, user) => {
    if (!groups[user.role]) {
      groups[user.role] = [];
    }
    groups[user.role].push(user);
    return groups;
  }, {});

  // Get icon for user role
  function getRoleIcon(role) {
    switch (role) {
      case 'Father': return 'heroicons:user';
      case 'Mother': return 'heroicons:user';
      case 'Child': return 'heroicons:face-smile';
      case 'Grandparent': return 'heroicons:user-group';
      case 'Guest': return 'heroicons:user-plus';
      case 'Service Provider': return 'heroicons:wrench-screwdriver';
      case 'Admin': return 'heroicons:shield-check';
      default: return 'heroicons:user';
    }
  }

  // Get color for auth provider
  function getAuthProviderColor(provider) {
    switch (provider) {
      case 'Google': return 'text-red-600';
      case 'Facebook': return 'text-blue-600';
      case 'Manual': return 'text-green-600';
      default: return 'text-base-content';
    }
  }
</script>

<svelte:head>
  <title>Users - Divine-Nest</title>
</svelte:head>

<div class="min-h-screen bg-base-200 p-4">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <Icon icon="heroicons:users" class="w-8 h-8" />
          User Management
        </h1>
        <p class="text-base-content/70 mt-1">Manage family members, guests, and service providers</p>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => { showAddForm = true; editingUser = null; resetForm(); }}
      >
        <Icon icon="heroicons:plus" class="w-5 h-5" />
        Add User
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 rounded-lg p-4 mb-6 shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search</span>
          </label>
          <input
            type="text"
            placeholder="Search users..."
            class="input input-bordered"
            bind:value={searchTerm}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Role</span>
          </label>
          <select class="select select-bordered" bind:value={selectedRole}>
            <option value="">All Roles</option>
            {#each roles as role}
              <option value={role}>{role}</option>
            {/each}
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Auth Provider</span>
          </label>
          <select class="select select-bordered" bind:value={selectedAuthProvider}>
            <option value="">All Providers</option>
            {#each authProviders as provider}
              <option value={provider}>{provider}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Users by Role -->
    {#each Object.entries(groupedUsers) as [role, roleUsers]}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-base-content flex items-center gap-2">
          <Icon icon={getRoleIcon(role)} class="w-6 h-6" />
          {role}s
          <span class="badge badge-primary badge-sm">{roleUsers.length}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each roleUsers as user}
            <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div class="card-body">
                <div class="flex items-start gap-4">
                  <!-- Profile Picture -->
                  <div class="avatar">
                    <div class="w-16 h-16 rounded-full">
                      {#if user.picture_url}
                        <img src={user.picture_url} alt={user.name} />
                      {:else}
                        <div class="bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      {/if}
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="card-title text-lg">{user.name}</h3>
                        {#if user.nick_name}
                          <p class="text-sm text-base-content/70">"{user.nick_name}"</p>
                        {/if}
                      </div>

                      <div class="dropdown dropdown-left">
                        <label tabindex="0" class="btn btn-ghost btn-sm">
                          <Icon icon="heroicons:ellipsis-vertical" class="w-5 h-5" />
                        </label>
                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                          <li><a on:click={() => editUser(user)}>
                            <Icon icon="heroicons:pencil" class="w-4 h-4" />
                            Edit
                          </a></li>
                          <li><a on:click={() => deleteUser(user)} class="text-error">
                            <Icon icon="heroicons:trash" class="w-4 h-4" />
                            Delete
                          </a></li>
                        </ul>
                      </div>
                    </div>

                    <div class="mt-4 space-y-2">
                      <p class="text-sm">
                        <strong>Email:</strong> {user.email}
                      </p>

                      {#if user.location}
                        <p class="text-sm">
                          <strong>Location:</strong> {user.location}
                        </p>
                      {/if}

                      <p class="text-sm">
                        <strong>Joined:</strong> {new Date(user.joined_date).toLocaleDateString()}
                      </p>

                      <div class="flex justify-between items-center pt-2">
                        <span class="text-sm text-base-content/60">
                          Auth: <span class={getAuthProviderColor(user.auth_provider)}>{user.auth_provider}</span>
                        </span>
                        <Icon icon={getRoleIcon(user.role)} class="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if filteredUsers.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:users" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-base-content/70">No users found</h3>
        <p class="text-base-content/50 mt-2">
          {searchTerm || selectedRole || selectedAuthProvider ? "Try adjusting your filters" : "Add your first user to get started"}
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- Add/Edit Modal -->
{#if showAddForm}
  <div class="modal modal-open">
    <div class="modal-box max-w-lg">
      <h3 class="font-bold text-lg mb-4">
        {editingUser ? "Edit User" : "Add New User"}
      </h3>

      <form on:submit|preventDefault={saveUser} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Role *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.role} required>
              <option>Father</option>
              <option>Mother</option>
              <option>Child</option>
              <option>Grandparent</option>
              <option>Guest</option>
              <option>Service Provider</option>
              <option>Admin</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Auth Provider *</span>
            </label>
            <select class="select select-bordered" bind:value={formData.auth_provider} required>
              <option>Manual</option>
              <option>Google</option>
              <option>Facebook</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Full Name *</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name..."
              class="input input-bordered"
              bind:value={formData.name}
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Nick Name</span>
            </label>
            <input
              type="text"
              placeholder="Optional nickname..."
              class="input input-bordered"
              bind:value={formData.nick_name}
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Email *</span>
          </label>
          <input
            type="email"
            placeholder="user@example.com"
            class="input input-bordered"
            bind:value={formData.email}
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="City, State..."
              class="input input-bordered"
              bind:value={formData.location}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Joined Date *</span>
            </label>
            <input
              type="date"
              class="input input-bordered"
              bind:value={formData.joined_date}
              required
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Profile Picture URL</span>
          </label>
          <input
            type="url"
            placeholder="https://..."
            class="input input-bordered"
            bind:value={formData.picture_url}
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn" on:click={cancelEdit}>Cancel</button>
          <button type="submit" class="btn btn-primary">
            {editingUser ? "Update" : "Add"} User
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}