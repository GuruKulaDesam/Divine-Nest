<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { users } from '$lib/stores/users';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let userId = $page.params.id;
  let user = null;
  let editMode = false;
  let isSubmitting = false;
  let errors = {};

  let formData = {
    role: 'Child',
    name: '',
    nick_name: '',
    email: '',
    location: '',
    joined_date: '',
    picture_url: '',
    auth_provider: 'Manual'
  };

  // Available options
  const roleOptions = ['Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin'];
  const authProviderOptions = ['Google', 'Facebook', 'Manual'];

  onMount(() => {
    loadUser();
  });

  function loadUser() {
    user = users.getUser(userId);
    if (user) {
      formData = { ...user };
    } else {
      alert('User not found');
      goto('/users/dashboard');
    }
  }

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('edit') || lowerCommand.includes('change') || lowerCommand.includes('modify')) {
      editMode = true;
    } else if (lowerCommand.includes('save') || lowerCommand.includes('update')) {
      handleSubmit();
    } else if (lowerCommand.includes('cancel') || lowerCommand.includes('back')) {
      editMode = false;
      loadUser(); // Reset changes
    } else if (lowerCommand.includes('delete') || lowerCommand.includes('remove')) {
      if (confirm('Are you sure you want to delete this user?')) {
        users.deleteUser(userId);
        goto('/users/dashboard');
      }
    } else if (lowerCommand.includes('change') && lowerCommand.includes('name')) {
      // Extract new name from voice command
      const nameMatch = command.match(/change\s+name\s+to\s+(.+)/i);
      if (nameMatch && nameMatch[1]) {
        editMode = true;
        formData.name = nameMatch[1].trim();
      }
    } else if (lowerCommand.includes('change') && lowerCommand.includes('email')) {
      // Extract new email from voice command
      const emailMatch = command.match(/change\s+email\s+to\s+(.+)/i);
      if (emailMatch && emailMatch[1]) {
        editMode = true;
        formData.email = emailMatch[1].trim();
      }
    }
  }

  function validateForm() {
    errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      errors.role = 'Role is required';
    }

    if (!formData.joined_date) {
      errors.joined_date = 'Join date is required';
    }

    // Check if email already exists (excluding current user)
    const existingUsers = users.searchUsers(formData.email).filter(u => u.id !== userId);
    if (existingUsers.length > 0) {
      errors.email = 'This email is already registered by another user';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;

    try {
      users.updateUser(userId, {
        ...formData,
        applicable_roles: [formData.role] // User can only see their own role
      });
      editMode = false;

      // Success message
      alert('User updated successfully!');

    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function deleteUser() {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      users.deleteUser(userId);
      goto('/users/dashboard');
    }
  }

  function generateEmail() {
    if (formData.name) {
      const baseName = formData.name.toLowerCase().replace(/\s+/g, '.');
      formData.email = `${baseName}@email.com`;
    }
  }

  function setDefaultLocation() {
    editMode = true;
    formData.location = 'Chennai';
  }
</script>

<svelte:head>
  <title>Update User - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-4xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {editMode ? 'Edit' : 'View'} User Profile
      </h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">
        {editMode ? 'Modify user information and settings' : 'Review user profile details'}
      </p>
    </div>

    <div class="flex gap-3">
      <VoiceInput
        onResult={handleVoiceCommand}
        placeholder="Say 'edit mode' or 'change name to...'"
      />

      <div class="flex gap-2">
        {#if editMode}
          <button
            class="btn btn-outline"
            on:click={() => {
              editMode = false;
              loadUser(); // Reset changes
            }}
          >
            Cancel
          </button>
          <button
            class="btn btn-primary"
            on:click={handleSubmit}
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading loading-spinner loading-sm"></span>
              Saving...
            {:else}
              Save Changes
            {/if}
          </button>
        {:else}
          <button
            class="btn btn-outline"
            on:click={() => goto('/users/dashboard')}
          >
            Back to Dashboard
          </button>
          <button
            class="btn btn-primary"
            on:click={() => editMode = true}
          >
            Edit Profile
          </button>
        {/if}
      </div>
    </div>
  </div>

  {#if user}
    <!-- View/Edit Form -->
    <div class="card bg-white dark:bg-gray-800 shadow-lg">
      <div class="card-body">
        <!-- Profile Header -->
        <div class="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          {#if formData.picture_url}
            <div class="avatar">
              <div class="w-20 rounded-full">
                <img src={formData.picture_url} alt={formData.name} />
              </div>
            </div>
          {:else}
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-20">
                <span class="text-2xl">{formData.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          {/if}
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{formData.name}</h2>
            {#if formData.nick_name}
              <p class="text-lg text-gray-600 dark:text-gray-400">"{formData.nick_name}"</p>
            {/if}
            <div class="flex items-center gap-2 mt-2">
              <span class="badge badge-primary">{formData.role}</span>
              <span class="badge badge-outline">{formData.auth_provider}</span>
              {#if formData.location}
                <span class="text-sm text-gray-500">📍 {formData.location}</span>
              {/if}
            </div>
          </div>
        </div>

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Role and Auth Provider Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label for="role" class="label">
                <span class="label-text font-medium">Role</span>
              </label>
              {#if editMode}
                <select
                  id="role"
                  bind:value={formData.role}
                  class="select select-bordered w-full"
                  required
                >
                  {#each roleOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="badge badge-primary">{formData.role}</span>
                </div>
              {/if}
            </div>

            <div class="form-control">
              <label for="auth_provider" class="label">
                <span class="label-text font-medium">Authentication Provider</span>
              </label>
              {#if editMode}
                <select
                  id="auth_provider"
                  bind:value={formData.auth_provider}
                  class="select select-bordered w-full"
                >
                  {#each authProviderOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              {:else}
                <div class="flex items-center h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-gray-900 dark:text-white">{formData.auth_provider}</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Name and Nickname Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label for="name" class="label">
                <span class="label-text font-medium">Full Name *</span>
              </label>
              {#if editMode}
                <input
                  id="name"
                  type="text"
                  bind:value={formData.name}
                  class="input input-bordered w-full"
                  class:input-error={errors.name}
                  required
                />
                {#if errors.name}
                  <span class="text-error text-sm mt-1">{errors.name}</span>
                {/if}
              {:else}
                <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-gray-900 dark:text-white">{formData.name}</span>
                </div>
              {/if}
            </div>

            <div class="form-control">
              <label for="nick_name" class="label">
                <span class="label-text font-medium">Nickname</span>
              </label>
              {#if editMode}
                <input
                  id="nick_name"
                  type="text"
                  bind:value={formData.nick_name}
                  class="input input-bordered w-full"
                />
              {:else}
                <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-gray-900 dark:text-white">{formData.nick_name || 'Not set'}</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Email Row -->
          <div class="form-control">
            <label for="email" class="label">
              <span class="label-text font-medium">Email Address *</span>
            </label>
            {#if editMode}
              <div class="flex gap-2">
                <input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  class="input input-bordered flex-1"
                  class:input-error={errors.email}
                  required
                />
                <button
                  type="button"
                  class="btn btn-outline"
                  on:click={generateEmail}
                  title="Generate email from name"
                >
                  Generate
                </button>
              </div>
              {#if errors.email}
                <span class="text-error text-sm mt-1">{errors.email}</span>
              {/if}
            {:else}
              <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <span class="text-gray-900 dark:text-white">{formData.email}</span>
              </div>
            {/if}
          </div>

          <!-- Location and Join Date Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label for="location" class="label">
                <span class="label-text font-medium">Location</span>
              </label>
              {#if editMode}
                <div class="flex gap-2">
                  <input
                    id="location"
                    type="text"
                    bind:value={formData.location}
                    class="input input-bordered flex-1"
                  />
                  <button
                    type="button"
                    class="btn btn-outline"
                    on:click={setDefaultLocation}
                    title="Set to Chennai"
                  >
                    Chennai
                  </button>
                </div>
              {:else}
                <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-gray-900 dark:text-white">{formData.location || 'Not specified'}</span>
                </div>
              {/if}
            </div>

            <div class="form-control">
              <label for="joined_date" class="label">
                <span class="label-text font-medium">Join Date *</span>
              </label>
              {#if editMode}
                <input
                  id="joined_date"
                  type="date"
                  bind:value={formData.joined_date}
                  class="input input-bordered w-full"
                  class:input-error={errors.joined_date}
                  required
                />
                {#if errors.joined_date}
                  <span class="text-error text-sm mt-1">{errors.joined_date}</span>
                {/if}
              {:else}
                <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span class="text-gray-900 dark:text-white">{new Date(formData.joined_date).toLocaleDateString()}</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Profile Picture URL -->
          <div class="form-control">
            <label for="picture_url" class="label">
              <span class="label-text font-medium">Profile Picture URL</span>
            </label>
            {#if editMode}
              <input
                id="picture_url"
                type="url"
                bind:value={formData.picture_url}
                class="input input-bordered w-full"
              />
              <div class="text-sm text-gray-500 mt-1">
                Leave empty for default avatar with user's initial
              </div>
            {:else}
              <div class="flex items-center min-h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <span class="text-gray-900 dark:text-white">{formData.picture_url || 'Default avatar'}</span>
              </div>
            {/if}
          </div>

          <!-- Metadata -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <strong>Created:</strong> {new Date(user.created_at).toLocaleString()}
              </div>
              <div>
                <strong>Last Updated:</strong> {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          <!-- Action Buttons for Edit Mode -->
          {#if editMode}
            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <button
                type="submit"
                class="btn btn-primary flex-1"
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <span class="loading loading-spinner loading-sm"></span>
                  Saving...
                {:else}
                  Save Changes
                {/if}
              </button>

              <button
                type="button"
                class="btn btn-outline btn-error"
                on:click={deleteUser}
              >
                Delete User
              </button>
            </div>
          {/if}
        </form>
      </div>
    </div>

    <!-- Discussion Forum -->
    <div class="mt-8">
      <DiscussionForum tableName="users" recordId={userId} />
    </div>
  {:else}
    <div class="card bg-white dark:bg-gray-800 shadow-lg">
      <div class="card-body text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">User Not Found</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">The requested user could not be found.</p>
        <button
          class="btn btn-primary"
          on:click={() => goto('/users/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  {/if}
</div>