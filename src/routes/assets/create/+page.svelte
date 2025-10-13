<script>
  import { createEventDispatcher } from 'svelte';
  import { assetActions } from '$lib/stores/assets';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  const dispatch = createEventDispatcher();

  let currentUserRole = '';
  let formData = {
    name: '',
    category: 'Hardware',
    sub_category: '',
    description: '',
    location: '',
    owner: '',
    date_added: new Date().toISOString().split('T')[0],
    tags: ''
  };

  let isSubmitting = false;
  let errors = {};

  // Voice command handler
  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    // Parse asset creation commands
    if (lowerCommand.includes('add') && lowerCommand.includes('asset')) {
      // Extract asset name
      const nameMatch = lowerCommand.match(/(?:add|create)\s+(?:an?\s+)?(.+?)\s+(?:as|to|in)/i);
      if (nameMatch) {
        formData.name = nameMatch[1].trim();
      }

      // Extract location
      const locationMatch = lowerCommand.match(/(?:in|at|to)\s+(.+?)(?:\s+(?:category|type)|$)/i);
      if (locationMatch) {
        formData.location = locationMatch[1].trim();
      }

      // Extract category
      if (lowerCommand.includes('vehicle') || lowerCommand.includes('car')) {
        formData.category = 'Vehicles';
      } else if (lowerCommand.includes('jewelry') || lowerCommand.includes('gold') || lowerCommand.includes('valuables')) {
        formData.category = 'Valuables';
      } else if (lowerCommand.includes('document') || lowerCommand.includes('certificate')) {
        formData.category = 'Documents';
      }
    } else if (lowerCommand.includes('புதிய சொத்து') || lowerCommand.includes('சேர்க்க சொத்து')) {
      // Tamil commands
      const tamilPatterns = [
        /(.+?)ஐ\s+(.+?)இல்\s+சேர்க்க/i,
        /(.+?)\s+சொத்து\s+(.+?)இல்/i
      ];

      for (const pattern of tamilPatterns) {
        const match = lowerCommand.match(pattern);
        if (match) {
          formData.name = match[1].trim();
          formData.location = match[2].trim();
          break;
        }
      }
    }
  }

  // Form validation
  function validateForm() {
    errors = {};

    if (!formData.name.trim()) {
      errors.name = $_('assets.create.errors.name_required');
    }

    if (!formData.location.trim()) {
      errors.location = $_('assets.create.errors.location_required');
    }

    if (!formData.date_added) {
      errors.date_added = $_('assets.create.errors.date_required');
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

      const newAsset = assetActions.add({
        ...formData,
        tags: tagsJson,
        applicable_roles: getApplicableRoles()
      });

      // Reset form
      formData = {
        name: '',
        category: 'Hardware',
        sub_category: '',
        description: '',
        location: '',
        owner: '',
        date_added: new Date().toISOString().split('T')[0],
        tags: ''
      };

      // Navigate back to dashboard
      window.location.href = '/assets/dashboard';

    } catch (error) {
      console.error('Error creating asset:', error);
      errors.general = $_('assets.create.errors.general');
    } finally {
      isSubmitting = false;
    }
  }

  // Get applicable roles based on current user
  function getApplicableRoles() {
    switch (currentUserRole) {
      case 'Parent':
        return ['Parent', 'Adult'];
      case 'Adult':
        return ['Parent', 'Adult'];
      case 'Child':
        return ['Parent', 'Adult', 'Child'];
      case 'Elder':
        return ['Parent', 'Adult', 'Elder'];
      default:
        return ['Parent', 'Adult', 'Child'];
    }
  }

  // Predefined templates
  const categoryTemplates = {
    'Hardware': [
      'Laptop Computer',
      'Smartphone',
      'Tablet',
      'Printer',
      'Router',
      'External Hard Drive'
    ],
    'Vehicles': [
      'Car',
      'Motorcycle',
      'Bicycle',
      'Scooter'
    ],
    'Valuables': [
      'Gold Jewelry',
      'Silver Items',
      'Antique Items',
      'Musical Instruments',
      'Art Collections'
    ],
    'Documents': [
      'Property Documents',
      'Insurance Papers',
      'Educational Certificates',
      'Medical Records'
    ],
    'Certificates': [
      'Birth Certificates',
      'Marriage Certificate',
      'Educational Degrees',
      'Professional Licenses'
    ],
    'Photos': [
      'Family Photo Albums',
      'Digital Photo Collection',
      'Wedding Photos',
      'Event Photographs'
    ],
    'Inventory': [
      'Household Items',
      'Kitchen Appliances',
      'Furniture',
      'Clothing'
    ],
    'Land': [
      'Agricultural Land',
      'Residential Plot',
      'Commercial Property'
    ],
    'Buildings': [
      'Residential Building',
      'Commercial Building',
      'Storage Unit'
    ],
    'Software': [
      'Licensed Software',
      'Digital Subscriptions',
      'Online Accounts'
    ]
  };

  // Subscribe to user profile
  userProfile.subscribe(profile => {
    currentUserRole = profile.role || 'Child';
    // Set default owner based on current user
    if (!formData.owner && profile.name) {
      formData.owner = profile.name;
    }
  });
</script>

<svelte:head>
  <title>Add Asset - Divine-Nest</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-2xl">
  <!-- Header -->
  <div class="flex items-center gap-4 mb-6">
    <a href="/assets/dashboard" class="btn btn-ghost btn-circle">
      <Icon icon="mdi:arrow-left" class="w-5 h-5" />
    </a>
    <div>
      <h1 class="text-3xl font-bold text-primary">{$_('assets.create.title')}</h1>
      <p class="text-base-content/70 mt-1">{$_('assets.create.subtitle')}</p>
    </div>
  </div>

  <!-- Voice Input -->
  <div class="card bg-base-100 shadow-lg mb-6">
    <div class="card-body">
      <h3 class="card-title">
        <Icon icon="mdi:microphone" class="w-5 h-5" />
        {$_('assets.create.voice_commands')}
      </h3>
      <p class="text-sm opacity-70 mb-4">{$_('assets.create.voice_examples')}</p>

      <VoiceInput
        placeholder={$_('assets.create.voice_placeholder')}
        onResult={handleVoiceCommand}
        className="w-full"
      />

      <div class="text-xs opacity-60 mt-2">
        <p><strong>{$_('assets.create.voice_example_english')}:</strong> "Add laptop computer in study room"</p>
        <p><strong>{$_('assets.create.voice_example_tamil')}:</strong> "லேப்டாப் கணினியை படிப்பு அறையில் சேர்க்க"</p>
      </div>
    </div>
  </div>

  <!-- Form -->
  <form on:submit|preventDefault={handleSubmit} class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-6">{$_('assets.create.form_title')}</h2>

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
            <span class="label-text">{$_('assets.create.name')}</span>
          </label>
          <input
            id="name"
            type="text"
            bind:value={formData.name}
            placeholder={$_('assets.create.name_placeholder')}
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
            <span class="label-text">{$_('assets.create.category')}</span>
          </label>
          <select
            id="category"
            bind:value={formData.category}
            class="select select-bordered"
          >
            <option value="Hardware">🔧 {$_('assets.create.category_hardware')}</option>
            <option value="Vehicles">🚗 {$_('assets.create.category_vehicles')}</option>
            <option value="Valuables">💎 {$_('assets.create.category_valuables')}</option>
            <option value="Documents">📄 {$_('assets.create.category_documents')}</option>
            <option value="Certificates">🏆 {$_('assets.create.category_certificates')}</option>
            <option value="Photos">📸 {$_('assets.create.category_photos')}</option>
            <option value="Inventory">📦 {$_('assets.create.category_inventory')}</option>
            <option value="Land">🌱 {$_('assets.create.category_land')}</option>
            <option value="Buildings">🏠 {$_('assets.create.category_buildings')}</option>
            <option value="Software">💻 {$_('assets.create.category_software')}</option>
          </select>
        </div>

        <!-- Sub Category -->
        <div class="form-control">
          <label for="sub_category" class="label">
            <span class="label-text">{$_('assets.create.sub_category')}</span>
          </label>
          <input
            id="sub_category"
            type="text"
            bind:value={formData.sub_category}
            placeholder={$_('assets.create.sub_category_placeholder')}
            class="input input-bordered"
          />
        </div>

        <!-- Location -->
        <div class="form-control">
          <label for="location" class="label">
            <span class="label-text">{$_('assets.create.location')}</span>
          </label>
          <input
            id="location"
            type="text"
            bind:value={formData.location}
            placeholder={$_('assets.create.location_placeholder')}
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
            <span class="label-text">{$_('assets.create.owner')}</span>
          </label>
          <input
            id="owner"
            type="text"
            bind:value={formData.owner}
            placeholder={$_('assets.create.owner_placeholder')}
            class="input input-bordered"
          />
        </div>
      </div>

      <!-- Date Added -->
      <div class="form-control mt-6">
        <label for="date_added" class="label">
          <span class="label-text">{$_('assets.create.date_added')}</span>
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
          <span class="label-text">{$_('assets.create.description')}</span>
        </label>
        <textarea
          id="description"
          bind:value={formData.description}
          placeholder={$_('assets.create.description_placeholder')}
          class="textarea textarea-bordered h-24"
        ></textarea>
      </div>

      <!-- Tags -->
      <div class="form-control mt-6">
        <label for="tags" class="label">
          <span class="label-text">{$_('assets.create.tags')}</span>
        </label>
        <input
          id="tags"
          type="text"
          bind:value={formData.tags}
          placeholder={$_('assets.create.tags_placeholder')}
          class="input input-bordered"
        />
        <label class="label">
          <span class="label-text-alt text-base-content/60">{$_('assets.create.tags_help')}</span>
        </label>

        <!-- Quick Tags -->
        <div class="mt-3">
          <p class="text-sm opacity-70 mb-2">{$_('assets.create.quick_tags')}:</p>
          <div class="flex flex-wrap gap-2">
            {#each ['electronics', 'appliance', 'vehicle', 'jewelry', 'document', 'valuable', 'furniture', 'tool'] as tag}
              <button
                type="button"
                class="btn btn-xs btn-outline"
                on:click={() => {
                  const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
                  if (!currentTags.includes(tag)) {
                    currentTags.push(tag);
                    formData.tags = currentTags.join(', ');
                  }
                }}
              >
                {tag}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Name Templates -->
      <div class="mt-6">
        <p class="text-sm opacity-70 mb-2">{$_('assets.create.quick_names')} ({formData.category}):</p>
        <div class="flex flex-wrap gap-2">
          {#each categoryTemplates[formData.category] || [] as template}
            <button
              type="button"
              class="btn btn-xs btn-outline"
              on:click={() => formData.name = template}
            >
              {template}
            </button>
          {/each}
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="flex gap-4 mt-8">
        <button
          type="submit"
          class="btn btn-primary flex-1"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <span class="loading loading-spinner loading-sm"></span>
          {/if}
          <Icon icon="mdi:plus" class="w-5 h-5" />
          {$_('assets.create.submit')}
        </button>

        <a href="/assets/dashboard" class="btn btn-ghost">
          {$_('assets.create.cancel')}
        </a>
      </div>
    </div>
  </form>

  <!-- Discussion Forum -->
  <DiscussionForum
    tableName="assets_create"
    recordId="form_help"
    title={$_('assets.create.discussion_title')}
    placeholder={$_('assets.create.discussion_placeholder')}
  />
</div>