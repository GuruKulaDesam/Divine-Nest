<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { rewardActions } from '$lib/stores/rewards';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  let currentUserRole = '';
  let rewardId = '';
  let reward = null;
  let isEditMode = false;
  let isSubmitting = false;
  let errors = {};

  // Form data
  let formData = {
    person: '',
    role: 'Child',
    type: 'Star',
    reason: '',
    points: 10,
    date: ''
  };

  // Voice command handler
  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('edit') || lowerCommand.includes('மாற்று')) {
      isEditMode = true;
    } else if (lowerCommand.includes('save') || lowerCommand.includes('சேமி')) {
      handleSubmit();
    } else if (lowerCommand.includes('cancel') || lowerCommand.includes('ரத்து')) {
      isEditMode = false;
      loadRewardData();
    } else if (lowerCommand.includes('delete') || lowerCommand.includes('நீக்கு')) {
      if (confirm($_('rewards.update.confirm_delete'))) {
        handleDelete();
      }
    }
  }

  // Load reward data
  function loadRewardData() {
    if (reward) {
      formData = {
        person: reward.person,
        role: reward.role,
        type: reward.type,
        reason: reward.reason,
        points: reward.points,
        date: reward.date
      };
    }
  }

  // Form validation
  function validateForm() {
    errors = {};

    if (!formData.person.trim()) {
      errors.person = $_('rewards.update.errors.person_required');
    }

    if (!formData.reason.trim()) {
      errors.reason = $_('rewards.update.errors.reason_required');
    }

    if (formData.points <= 0) {
      errors.points = $_('rewards.update.errors.points_positive');
    }

    if (formData.points > 100) {
      errors.points = $_('rewards.update.errors.points_max');
    }

    if (!formData.date) {
      errors.date = $_('rewards.update.errors.date_required');
    }

    return Object.keys(errors).length === 0;
  }

  // Submit form
  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    isSubmitting = true;

    try {
      rewardActions.update(rewardId, formData);
      isEditMode = false;

      // Reload reward data
      reward = rewardActions.getById(rewardId);

      // Show success message (you could use a toast here)

    } catch (error) {
      console.error('Error updating reward:', error);
      errors.general = $_('rewards.update.errors.general');
    } finally {
      isSubmitting = false;
    }
  }

  // Delete reward
  async function handleDelete() {
    try {
      rewardActions.delete(rewardId);
      window.location.href = '/rewards/dashboard';
    } catch (error) {
      console.error('Error deleting reward:', error);
      errors.general = $_('rewards.update.errors.delete_failed');
    }
  }

  // Toggle edit mode
  function toggleEditMode() {
    if (isEditMode) {
      // Cancel editing - reload original data
      loadRewardData();
    }
    isEditMode = !isEditMode;
  }

  onMount(() => {
    // Get reward ID from URL
    rewardId = $page.params.id;
    reward = rewardActions.getById(rewardId);

    if (!reward) {
      // Reward not found - redirect to dashboard
      window.location.href = '/rewards/dashboard';
      return;
    }

    loadRewardData();

    // Subscribe to user profile
    const unsubscribeUser = userProfile.subscribe(profile => {
      currentUserRole = profile.role || 'Child';
    });

    return () => {
      unsubscribeUser();
    };
  });

  // Check if user can edit this reward
  $: canEdit = reward && reward.applicable_roles.includes(currentUserRole);
</script>

<svelte:head>
  <title>Update Reward - Divine-Nest</title>
</svelte:head>

{#if reward}
  <div class="container mx-auto p-4 max-w-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <a href="/rewards/dashboard" class="btn btn-ghost btn-circle">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <div>
          <h1 class="text-3xl font-bold text-primary">{$_('rewards.update.title')}</h1>
          <p class="text-base-content/70 mt-1">{$_('rewards.update.subtitle')}</p>
        </div>
      </div>

      <div class="flex gap-2">
        <VoiceInput
          placeholder={$_('rewards.update.voice_placeholder')}
          onResult={handleVoiceCommand}
          className="btn btn-outline btn-primary"
        />

        {#if canEdit}
          <button
            class="btn {isEditMode ? 'btn-warning' : 'btn-primary'}"
            on:click={toggleEditMode}
          >
            <Icon icon={isEditMode ? 'mdi:eye' : 'mdi:pencil'} class="w-5 h-5" />
            {isEditMode ? $_('rewards.update.view_mode') : $_('rewards.update.edit_mode')}
          </button>
        {/if}
      </div>
    </div>

    <!-- Reward Card -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-12 h-12">
                <span class="text-lg font-bold">{reward.person.charAt(0)}</span>
              </div>
            </div>
            <div>
              <h2 class="card-title text-xl">{reward.person}</h2>
              <p class="text-base-content/70">{reward.role} • {reward.type} Reward</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-primary">+{reward.points}</div>
            <div class="text-sm opacity-70">points</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-sm font-semibold opacity-70">{$_('rewards.update.reason')}</label>
            <p class="text-lg">{reward.reason}</p>
          </div>
          <div>
            <label class="text-sm font-semibold opacity-70">{$_('rewards.update.date')}</label>
            <p class="text-lg">{new Date(reward.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-sm opacity-70">
          <Icon icon="mdi:calendar" class="w-4 h-4" />
          <span>{$_('rewards.update.created')}: {new Date(reward.created_at).toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    {#if isEditMode && canEdit}
      <form on:submit|preventDefault={handleSubmit} class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-xl mb-6">{$_('rewards.update.edit_title')}</h2>

          <!-- General Error -->
          {#if errors.general}
            <div class="alert alert-error mb-4">
              <Icon icon="mdi:alert-circle" class="w-5 h-5" />
              <span>{errors.general}</span>
            </div>
          {/if}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Person -->
            <div class="form-control">
              <label for="person" class="label">
                <span class="label-text">{$_('rewards.update.person')}</span>
              </label>
              <input
                id="person"
                type="text"
                bind:value={formData.person}
                class="input input-bordered"
                required
              />
              {#if errors.person}
                <label class="label">
                  <span class="label-text-alt text-error">{errors.person}</span>
                </label>
              {/if}
            </div>

            <!-- Role -->
            <div class="form-control">
              <label for="role" class="label">
                <span class="label-text">{$_('rewards.update.role')}</span>
              </label>
              <select
                id="role"
                bind:value={formData.role}
                class="select select-bordered"
              >
                <option value="Child">{$_('rewards.update.role_child')}</option>
                <option value="Adult">{$_('rewards.update.role_adult')}</option>
                <option value="Elder">{$_('rewards.update.role_elder')}</option>
              </select>
            </div>

            <!-- Type -->
            <div class="form-control">
              <label for="type" class="label">
                <span class="label-text">{$_('rewards.update.type')}</span>
              </label>
              <select
                id="type"
                bind:value={formData.type}
                class="select select-bordered"
              >
                <option value="Star">⭐ {$_('rewards.update.type_star')}</option>
                <option value="Karma">🪷 {$_('rewards.update.type_karma')}</option>
              </select>
            </div>

            <!-- Points -->
            <div class="form-control">
              <label for="points" class="label">
                <span class="label-text">{$_('rewards.update.points')}</span>
              </label>
              <input
                id="points"
                type="number"
                bind:value={formData.points}
                min="1"
                max="100"
                class="input input-bordered"
                required
              />
              {#if errors.points}
                <label class="label">
                  <span class="label-text-alt text-error">{errors.points}</span>
                </label>
              {/if}
            </div>
          </div>

          <!-- Date -->
          <div class="form-control mt-6">
            <label for="date" class="label">
              <span class="label-text">{$_('rewards.update.date')}</span>
            </label>
            <input
              id="date"
              type="date"
              bind:value={formData.date}
              class="input input-bordered"
              required
            />
            {#if errors.date}
              <label class="label">
                <span class="label-text-alt text-error">{errors.date}</span>
                </label>
              {/if}
          </div>

          <!-- Reason -->
          <div class="form-control mt-6">
            <label for="reason" class="label">
              <span class="label-text">{$_('rewards.update.reason')}</span>
            </label>
            <textarea
              id="reason"
              bind:value={formData.reason}
              class="textarea textarea-bordered h-24"
              required
            ></textarea>
            {#if errors.reason}
              <label class="label">
                <span class="label-text-alt text-error">{errors.reason}</span>
              </label>
            {/if}
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 mt-8">
            <button
              type="submit"
              class="btn btn-primary flex-1"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="loading loading-spinner loading-sm"></span>
              {/if}
              <Icon icon="mdi:content-save" class="w-5 h-5" />
              {$_('rewards.update.save_changes')}
            </button>

            <button
              type="button"
              class="btn btn-ghost"
              on:click={toggleEditMode}
            >
              {$_('rewards.update.cancel')}
            </button>
          </div>
        </div>
      </form>
    {/if}

    <!-- Action Buttons (View Mode) -->
    {#if !isEditMode && canEdit}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-xl mb-4">{$_('rewards.update.actions')}</h2>

          <div class="flex flex-wrap gap-4">
            <button
              class="btn btn-primary"
              on:click={() => isEditMode = true}
            >
              <Icon icon="mdi:pencil" class="w-5 h-5" />
              {$_('rewards.update.edit_reward')}
            </button>

            <button
              class="btn btn-error"
              on:click={() => {
                if (confirm($_('rewards.update.confirm_delete'))) {
                  handleDelete();
                }
              }}
            >
              <Icon icon="mdi:delete" class="w-5 h-5" />
              {$_('rewards.update.delete_reward')}
            </button>

            <a href="/rewards/create" class="btn btn-outline">
              <Icon icon="mdi:plus" class="w-5 h-5" />
              {$_('rewards.update.add_another')}
            </a>
          </div>
        </div>
      </div>
    {/if}

    <!-- Discussion Forum -->
    <DiscussionForum
      tableName="rewards"
      recordId={rewardId}
      title={$_('rewards.update.discussion_title')}
      placeholder={$_('rewards.update.discussion_placeholder')}
    />
  </div>
{:else}
  <!-- Loading/Not Found State -->
  <div class="container mx-auto p-4 max-w-2xl">
    <div class="flex items-center justify-center min-h-96">
      <div class="text-center">
        <Icon icon="mdi:loading" class="w-16 h-16 mx-auto text-base-content/30 mb-4 animate-spin" />
        <p class="text-lg opacity-70">{$_('rewards.update.loading')}</p>
      </div>
    </div>
  </div>
{/if}