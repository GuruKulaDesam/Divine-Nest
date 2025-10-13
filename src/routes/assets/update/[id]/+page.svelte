<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { assetActions } from '$lib/stores/assets';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import { Icon } from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  let currentUserRole = '';
  let assetId = '';
  let asset: any = null;
  let isEditMode = false;
  let isSubmitting = false;
  let errors = {};

  // Form data
  let formData = {
    name: '',
    category: 'Hardware' as Asset['category'],
    sub_category: '',
    description: '',
    location: '',
    owner: '',
    date_added: '',
    tags: ''
  };

  // Voice command handler
  function handleVoiceCommand(command: string) {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('edit') || lowerCommand.includes('மாற்று')) {
      isEditMode = true;
    } else if (lowerCommand.includes('save') || lowerCommand.includes('சேமி')) {
      handleSubmit();
    } else if (lowerCommand.includes('cancel') || lowerCommand.includes('ரத்து')) {
      isEditMode = false;
      loadAssetData();
    } else if (lowerCommand.includes('delete') || lowerCommand.includes('நீக்கு')) {
      if (confirm($_('assets.update.confirm_delete'))) {
        handleDelete();
      }
    }
  }

  // Load asset data
  function loadAssetData() {
    if (asset) {
      formData = {
        name: asset.name,
        category: asset.category,
        sub_category: asset.sub_category || '',
        description: asset.description || '',
        location: asset.location || '',
        owner: asset.owner || '',
        date_added: asset.date_added,
        tags: asset.tags || ''
      };
    }
  }

  // Form validation
  function validateForm() {
    errors = {};

    if (!formData.name.trim()) {
      errors.name = $_('assets.update.errors.name_required');
    }

    if (!formData.location.trim()) {
      errors.location = $_('assets.update.errors.location_required');
    }

    if (!formData.date_added) {
      errors.date_added = $_('assets.update.errors.date_required');
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
      // Parse tags if provided
      let tagsJson = '';
      if (formData.tags.trim()) {
        try {
          // Try to parse as JSON first
          JSON.parse(formData.tags);
          tagsJson = formData.tags;
        } catch {
          // If not JSON, convert comma-separated string to JSON array
          const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
          tagsJson = JSON.stringify(tagsArray);
        }
      }

      assetActions.update(assetId, {
        ...formData,
        tags: tagsJson
      });

      isEditMode = false;

      // Reload asset data
      asset = assetActions.getById(assetId);

    } catch (error) {
      console.error('Error updating asset:', error);
      errors.general = $_('assets.update.errors.general');
    } finally {
      isSubmitting = false;
    }
  }

  // Delete asset
  async function handleDelete() {
    try {
      assetActions.delete(assetId);
      window.location.href = '/assets/dashboard';
    } catch (error) {
      console.error('Error deleting asset:', error);
      errors.general = $_('assets.update.errors.delete_failed');
    }
  }

  // Toggle edit mode
  function toggleEditMode() {
    if (isEditMode) {
      // Cancel editing - reload original data
      loadAssetData();
    }
    isEditMode = !isEditMode;
  }

  onMount(() => {
    // Get asset ID from URL
    assetId = $page.params.id;
    asset = assetActions.getById(assetId);

    if (!asset) {
      // Asset not found - redirect to dashboard
      window.location.href = '/assets/dashboard';
      return;
    }

    loadAssetData();

    // Subscribe to user profile
    const unsubscribeUser = userProfile.subscribe(profile => {
      currentUserRole = profile.role || 'Child';
    });

    return () => {
      unsubscribeUser();
    };
  });

  // Check if user can edit this asset
  $: canEdit = asset && asset.applicable_roles.includes(currentUserRole);

  // Get tags as array for display
  $: tagsArray = asset?.tags ? JSON.parse(asset.tags) : [];
</script>

<svelte:head>
  <title>Update Asset - Divine-Nest</title>
</svelte:head>

{#if asset}
  <div class="container mx-auto p-4 max-w-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <a href="/assets/dashboard" class="btn btn-ghost btn-circle">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <div>
          <h1 class="text-3xl font-bold text-primary">{$_('assets.update.title')}</h1>
          <p class="text-base-content/70 mt-1">{$_('assets.update.subtitle')}</p>
        </div>
      </div>

      <div class="flex gap-2">
        <VoiceInput
          placeholder={$_('assets.update.voice_placeholder')}
          onResult={handleVoiceCommand}
          className="btn btn-outline btn-primary"
        />

        {#if canEdit}
          <button
            class="btn {isEditMode ? 'btn-warning' : 'btn-primary'}"
            on:click={toggleEditMode}
          >
            <Icon icon={isEditMode ? 'mdi:eye' : 'mdi:pencil'} class="w-5 h-5" />
            {isEditMode ? $_('assets.update.view_mode') : $_('assets.update.edit_mode')}
          </button>
        {/if}
      </div>
    </div>

    <!-- Asset Card -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-12 h-12">
                <span class="text-lg font-bold">{asset.name.charAt(0)}</span>
              </div>
            </div>
            <div>
              <h2 class="card-title text-xl">{asset.name}</h2>
              <p class="text-base-content/70">{asset.category} • {asset.location || 'Unknown Location'}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="badge badge-primary mb-2">{asset.category}</div>
            {#if asset.owner}
              <div class="text-sm opacity-70">Owner: {asset.owner}</div>
            {/if}
          </div>
        </div>

        {#if asset.description}
          <p class="text-base-content/80 mb-4">{asset.description}</p>
        {/if}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-sm font-semibold opacity-70">{$_('assets.update.location')}</label>
            <p class="text-lg">{asset.location || 'Unknown'}</p>
          </div>
          <div>
            <label class="text-sm font-semibold opacity-70">{$_('assets.update.date_added')}</label>
            <p class="text-lg">{new Date(asset.date_added).toLocaleDateString()}</p>
          </div>
        </div>

        {#if tagsArray.length > 0}
          <div class="mb-4">
            <label class="text-sm font-semibold opacity-70">{$_('assets.update.tags')}</label>
            <div class="flex flex-wrap gap-2 mt-1">
              {#each tagsArray as tag}
                <span class="badge badge-outline">{tag}</span>
              {/each}
            </div>
          </div>
        {/if}

        <div class="flex items-center gap-2 text-sm opacity-70">
          <Icon icon="mdi:calendar" class="w-4 h-4" />
          <span>{$_('assets.update.created')}: {new Date(asset.created_at).toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    {#if isEditMode && canEdit}
      <form on:submit|preventDefault={handleSubmit} class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-xl mb-6">{$_('assets.update.edit_title')}</h2>

          <!-- General Error -->
          {#if errors.general}
            <div class="alert alert-error mb-4">
              <Icon icon="mdi:alert-circle" class="w-5 h-5" />
              <span>{errors.general}</span>
            </div>
          {/if}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div class="form-control md:col-span-2">
              <label for="name" class="label">
                <span class="label-text">{$_('assets.update.name')}</span>
              </label>
              <input
                id="name"
                type="text"
                bind:value={formData.name}
                class="input input-bordered"
                required
              />
              {#if errors.name}
                <label class="label">
                  <span class="label-text-alt text-error">{errors.name}</span>
                </label>
              {/if}
            </div>

            <!-- Category -->
            <div class="form-control">
              <label for="category" class="label">
                <span class="label-text">{$_('assets.update.category')}</span>
              </label>
              <select
                id="category"
                bind:value={formData.category}
                class="select select-bordered"
              >
                <option value="Hardware">🔧 {$_('assets.update.category_hardware')}</option>
                <option value="Vehicles">🚗 {$_('assets.update.category_vehicles')}</option>
                <option value="Valuables">💎 {$_('assets.update.category_valuables')}</option>
                <option value="Documents">📄 {$_('assets.update.category_documents')}</option>
                <option value="Certificates">🏆 {$_('assets.update.category_certificates')}</option>
                <option value="Photos">📸 {$_('assets.update.category_photos')}</option>
                <option value="Inventory">📦 {$_('assets.update.category_inventory')}</option>
                <option value="Land">🌱 {$_('assets.update.category_land')}</option>
                <option value="Buildings">🏠 {$_('assets.update.category_buildings')}</option>
                <option value="Software">💻 {$_('assets.update.category_software')}</option>
              </select>
            </div>

            <!-- Sub Category -->
            <div class="form-control">
              <label for="sub_category" class="label">
                <span class="label-text">{$_('assets.update.sub_category')}</span>
              </label>
              <input
                id="sub_category"
                type="text"
                bind:value={formData.sub_category}
                class="input input-bordered"
              />
            </div>

            <!-- Location -->
            <div class="form-control">
              <label for="location" class="label">
                <span class="label-text">{$_('assets.update.location')}</span>
              </label>
              <input
                id="location"
                type="text"
                bind:value={formData.location}
                class="input input-bordered"
                required
              />
              {#if errors.location}
                <label class="label">
                  <span class="label-text-alt text-error">{errors.location}</span>
                </label>
              {/if}
            </div>

            <!-- Owner -->
            <div class="form-control">
              <label for="owner" class="label">
                <span class="label-text">{$_('assets.update.owner')}</span>
              </label>
              <input
                id="owner"
                type="text"
                bind:value={formData.owner}
                class="input input-bordered"
              />
            </div>
          </div>

          <!-- Date Added -->
          <div class="form-control mt-6">
            <label for="date_added" class="label">
              <span class="label-text">{$_('assets.update.date_added')}</span>
            </label>
            <input
              id="date_added"
              type="date"
              bind:value={formData.date_added}
              class="input input-bordered"
              required
            />
            {#if errors.date_added}
              <label class="label">
                <span class="label-text-alt text-error">{errors.date_added}</span>
                </label>
              {/if}
          </div>

          <!-- Description -->
          <div class="form-control mt-6">
            <label for="description" class="label">
              <span class="label-text">{$_('assets.update.description')}</span>
            </label>
            <textarea
              id="description"
              bind:value={formData.description}
              class="textarea textarea-bordered h-24"
            ></textarea>
          </div>

          <!-- Tags -->
          <div class="form-control mt-6">
            <label for="tags" class="label">
              <span class="label-text">{$_('assets.update.tags')}</span>
            </label>
            <input
              id="tags"
              type="text"
              bind:value={formData.tags}
              placeholder={$_('assets.update.tags_placeholder')}
              class="input input-bordered"
            />
            <label class="label">
              <span class="label-text-alt text-base-content/60">{$_('assets.update.tags_help')}</span>
            </label>
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
              {$_('assets.update.save_changes')}
            </button>

            <button
              type="button"
              class="btn btn-ghost"
              on:click={toggleEditMode}
            >
              {$_('assets.update.cancel')}
            </button>
          </div>
        </div>
      </form>
    {/if}

    <!-- Action Buttons (View Mode) -->
    {#if !isEditMode && canEdit}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-xl mb-4">{$_('assets.update.actions')}</h2>

          <div class="flex flex-wrap gap-4">
            <button
              class="btn btn-primary"
              on:click={() => isEditMode = true}
            >
              <Icon icon="mdi:pencil" class="w-5 h-5" />
              {$_('assets.update.edit_asset')}
            </button>

            <button
              class="btn btn-error"
              on:click={() => {
                if (confirm($_('assets.update.confirm_delete'))) {
                  handleDelete();
                }
              }}
            >
              <Icon icon="mdi:delete" class="w-5 h-5" />
              {$_('assets.update.delete_asset')}
            </button>

            <a href="/assets/create" class="btn btn-outline">
              <Icon icon="mdi:plus" class="w-5 h-5" />
              {$_('assets.update.add_another')}
            </a>
          </div>
        </div>
      </div>
    {/if}

    <!-- Discussion Forum -->
    <DiscussionForum
      tableName="assets"
      recordId={assetId}
      title={$_('assets.update.discussion_title')}
      placeholder={$_('assets.update.discussion_placeholder')}
    />
  </div>
{:else}
  <!-- Loading/Not Found State -->
  <div class="container mx-auto p-4 max-w-2xl">
    <div class="flex items-center justify-center min-h-96">
      <div class="text-center">
        <Icon icon="mdi:loading" class="w-16 h-16 mx-auto text-base-content/30 mb-4 animate-spin" />
        <p class="text-lg opacity-70">{$_('assets.update.loading')}</p>
      </div>
    </div>
  </div>
{/if}