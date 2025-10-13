<script>
  import { goto } from '$app/navigation';
  import { users } from '$lib/stores/users';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';

  let formData = {
    role: 'Child' as 'Father' | 'Mother' | 'Child' | 'Grandparent' | 'Guest' | 'Service Provider' | 'Admin',
    name: '',
    nick_name: '',
    email: '',
    location: '',
    joined_date: new Date().toISOString().split('T')[0],
    picture_url: '',
    auth_provider: 'Manual' as 'Google' | 'Facebook' | 'Manual'
  };

  let errors = {};
  let isSubmitting = false;
  let voiceMode = false;

  // Available options
  const roleOptions = ['Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin'];
  const authProviderOptions = ['Google', 'Facebook', 'Manual'];

  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();
    voiceMode = true;

    // Parse voice commands for different user types
    if (lowerCommand.includes('add') || lowerCommand.includes('create') || lowerCommand.includes('register')) {
      if (lowerCommand.includes('father') || lowerCommand.includes('appa') || lowerCommand.includes('dad')) {
        formData.role = 'Father';
        formData.nick_name = 'Appa';
      } else if (lowerCommand.includes('mother') || lowerCommand.includes('amma') || lowerCommand.includes('mom')) {
        formData.role = 'Mother';
        formData.nick_name = 'Amma';
      } else if (lowerCommand.includes('child') || lowerCommand.includes('son') || lowerCommand.includes('daughter')) {
        formData.role = 'Child';
        if (lowerCommand.includes('son')) {
          formData.nick_name = 'Son';
        } else if (lowerCommand.includes('daughter')) {
          formData.nick_name = 'Daughter';
        }
      } else if (lowerCommand.includes('grandparent') || lowerCommand.includes('thatha') || lowerCommand.includes('paati')) {
        formData.role = 'Grandparent';
        if (lowerCommand.includes('thatha') || lowerCommand.includes('grandfather')) {
          formData.nick_name = 'Thatha';
        } else if (lowerCommand.includes('paati') || lowerCommand.includes('grandmother')) {
          formData.nick_name = 'Paati';
        }
      } else if (lowerCommand.includes('service') || lowerCommand.includes('provider') || lowerCommand.includes('electrician') || lowerCommand.includes('cook') || lowerCommand.includes('plumber')) {
        formData.role = 'Service Provider';
        if (lowerCommand.includes('electrician')) {
          formData.nick_name = 'Electrician';
        } else if (lowerCommand.includes('cook')) {
          formData.nick_name = 'Cook';
        } else if (lowerCommand.includes('plumber')) {
          formData.nick_name = 'Plumber';
        }
      } else if (lowerCommand.includes('guest') || lowerCommand.includes('visitor')) {
        formData.role = 'Guest';
        formData.nick_name = 'Guest';
      } else if (lowerCommand.includes('admin') || lowerCommand.includes('administrator')) {
        formData.role = 'Admin';
        formData.nick_name = 'Admin';
      }

      // Try to extract name from command
      const nameMatch = command.match(/(?:add|create|register)\s+(?:my\s+)?(?:father|mother|child|son|daughter|grandparent|thatha|paati|service|provider|guest|admin|administrator)?\s*(.+?)(?:\s+as|$)/i);
      if (nameMatch && nameMatch[1]) {
        formData.name = nameMatch[1].trim();
      }

      // Set default location
      formData.location = 'Chennai';

      // Set auth provider based on context
      formData.auth_provider = 'Manual';
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

    // Check if email already exists
    const existingUsers = users.searchUsers(formData.email);
    if (existingUsers.length > 0) {
      errors.email = 'This email is already registered';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;

    try {
      const newUser = users.addUser({
        ...formData,
        applicable_roles: [formData.role] // User can only see their own role
      });

      // Success message
      alert('User added successfully!');

      // Navigate to update page for further editing
      goto(`/users/update/${newUser.id}`);

    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  function generateEmail() {
    if (formData.name) {
      const baseName = formData.name.toLowerCase().replace(/\s+/g, '.');
      formData.email = `${baseName}@email.com`;
    }
  }

  function setDefaultLocation() {
    formData.location = 'Chennai';
  }
</script>

<svelte:head>
  <title>Add User - Home Maker</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-4xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Add New User</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">Register a family member, service provider, or guest</p>
    </div>

    <div class="flex gap-3">
      <VoiceInput
        onResult={handleVoiceCommand}
        placeholder="Say 'add my son Arjun' or 'register electrician Ravi'"
      />
      <button
        class="btn btn-outline"
        on:click={() => goto('/users/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  </div>

  {#if voiceMode}
    <div class="alert alert-info mb-6">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Voice command detected! Form has been pre-filled. Please review and adjust as needed.</span>
    </div>
  {/if}

  <!-- Form -->
  <div class="card bg-white dark:bg-gray-800 shadow-lg">
    <div class="card-body">
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <!-- Role and Auth Provider Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label for="role" class="label">
              <span class="label-text font-medium">Role *</span>
            </label>
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
          </div>

          <div class="form-control">
            <label for="auth_provider" class="label">
              <span class="label-text font-medium">Authentication Provider</span>
            </label>
            <select
              id="auth_provider"
              bind:value={formData.auth_provider}
              class="select select-bordered w-full"
            >
              {#each authProviderOptions as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Name and Nickname Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label for="name" class="label">
              <span class="label-text font-medium">Full Name *</span>
            </label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              class="input input-bordered w-full"
              class:input-error={errors.name}
              placeholder="e.g., Rajesh Kumar"
              required
            />
            {#if errors.name}
              <span class="text-error text-sm mt-1">{errors.name}</span>
            {/if}
          </div>

          <div class="form-control">
            <label for="nick_name" class="label">
              <span class="label-text font-medium">Nickname (Optional)</span>
            </label>
            <input
              id="nick_name"
              type="text"
              bind:value={formData.nick_name}
              class="input input-bordered w-full"
              placeholder="e.g., Appa, Amma, Arjun"
            />
          </div>
        </div>

        <!-- Email Row -->
        <div class="form-control">
          <label for="email" class="label">
            <span class="label-text font-medium">Email Address *</span>
          </label>
          <div class="flex gap-2">
            <input
              id="email"
              type="email"
              bind:value={formData.email}
              class="input input-bordered flex-1"
              class:input-error={errors.email}
              placeholder="e.g., rajesh.kumar@email.com"
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
        </div>

        <!-- Location and Join Date Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label for="location" class="label">
              <span class="label-text font-medium">Location</span>
            </label>
            <div class="flex gap-2">
              <input
                id="location"
                type="text"
                bind:value={formData.location}
                class="input input-bordered flex-1"
                placeholder="e.g., Chennai, Coimbatore"
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
          </div>

          <div class="form-control">
            <label for="joined_date" class="label">
              <span class="label-text font-medium">Join Date *</span>
            </label>
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
          </div>
        </div>

        <!-- Profile Picture URL -->
        <div class="form-control">
          <label for="picture_url" class="label">
            <span class="label-text font-medium">Profile Picture URL (Optional)</span>
          </label>
          <input
            id="picture_url"
            type="url"
            bind:value={formData.picture_url}
            class="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
          />
          <div class="text-sm text-gray-500 mt-1">
            Leave empty for default avatar with user's initial
          </div>
        </div>

        <!-- Preview -->
        {#if formData.name}
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Preview</h3>
            <div class="flex items-center gap-4">
              {#if formData.picture_url}
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src={formData.picture_url} alt={formData.name} />
                  </div>
                </div>
              {:else}
                <div class="avatar placeholder">
                  <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                    <span>{formData.name.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              {/if}
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{formData.name}</div>
                {#if formData.nick_name}
                  <div class="text-sm text-gray-600 dark:text-gray-400">"{formData.nick_name}"</div>
                {/if}
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="badge badge-outline badge-primary">{formData.role}</span>
                  {#if formData.location}
                    <span class="ml-2">📍 {formData.location}</span>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <button
            type="submit"
            class="btn btn-primary flex-1"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading loading-spinner loading-sm"></span>
              Adding User...
            {:else}
              Add User
            {/if}
          </button>

          <button
            type="button"
            class="btn btn-outline"
            on:click={() => goto('/users/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Discussion Forum -->
  <div class="mt-8">
    <DiscussionForum tableName="users" recordId="create_form" />
  </div>
</div>