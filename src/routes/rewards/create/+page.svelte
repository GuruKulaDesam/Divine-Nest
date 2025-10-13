<script>
  import { createEventDispatcher } from 'svelte';
  import { rewardActions } from '$lib/stores/rewards';
  import { userProfile } from '$lib/stores/userProfile';
  import VoiceInput from '$lib/components/VoiceInput.svelte';
  import DiscussionForum from '$lib/components/DiscussionForum.svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';

  const dispatch = createEventDispatcher();

  let currentUserRole = '';
  let formData = {
    person: '',
    role: 'Child',
    type: 'Star',
    reason: '',
    points: 10,
    date: new Date().toISOString().split('T')[0]
  };

  let isSubmitting = false;
  let errors = {};

  // Voice command handler
  function handleVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();

    // Parse reward creation commands
    if (lowerCommand.includes('give') && lowerCommand.includes('star')) {
      formData.type = 'Star';
      // Extract person name
      const personMatch = lowerCommand.match(/(?:give|award).*?(?:to|for)\s+(\w+)/i);
      if (personMatch) {
        formData.person = personMatch[1];
      }
      // Extract reason
      const reasonMatch = lowerCommand.match(/(?:for|because)\s+(.+?)(?:\s+(?:\d+|$))/);
      if (reasonMatch) {
        formData.reason = reasonMatch[1];
      }
      // Extract points
      const pointsMatch = lowerCommand.match(/(\d+)\s+points?/);
      if (pointsMatch) {
        formData.points = parseInt(pointsMatch[1]);
      }
    } else if (lowerCommand.includes('give') && lowerCommand.includes('karma')) {
      formData.type = 'Karma';
      // Similar parsing for karma rewards
      const personMatch = lowerCommand.match(/(?:give|award).*?(?:to|for)\s+(\w+)/i);
      if (personMatch) {
        formData.person = personMatch[1];
      }
      const reasonMatch = lowerCommand.match(/(?:for|because)\s+(.+?)(?:\s+(?:\d+|$))/);
      if (reasonMatch) {
        formData.reason = reasonMatch[1];
      }
      const pointsMatch = lowerCommand.match(/(\d+)\s+points?/);
      if (pointsMatch) {
        formData.points = parseInt(pointsMatch[1]);
      }
    } else if (lowerCommand.includes('பரிசு') || lowerCommand.includes('நன்மை')) {
      // Tamil commands
      formData.type = lowerCommand.includes('நட்சத்திரம்') ? 'Star' : 'Karma';
      // Parse Tamil commands (simplified)
      const tamilPatterns = [
        /(.+?)க்கு\s+(.+?)\s+பரிசு/i,
        /(.+?)\s+(.+?)\s+செய்ததற்கு/i
      ];

      for (const pattern of tamilPatterns) {
        const match = lowerCommand.match(pattern);
        if (match) {
          formData.person = match[1].trim();
          formData.reason = match[2].trim();
          break;
        }
      }
    }
  }

  // Form validation
  function validateForm() {
    errors = {};

    if (!formData.person.trim()) {
      errors.person = $_('rewards.create.errors.person_required');
    }

    if (!formData.reason.trim()) {
      errors.reason = $_('rewards.create.errors.reason_required');
    }

    if (formData.points <= 0) {
      errors.points = $_('rewards.create.errors.points_positive');
    }

    if (formData.points > 100) {
      errors.points = $_('rewards.create.errors.points_max');
    }

    if (!formData.date) {
      errors.date = $_('rewards.create.errors.date_required');
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
      const newReward = rewardActions.add({
        ...formData,
        applicable_roles: getApplicableRoles(formData.role)
      });

      // Show success message
      // You could use a toast notification here

      // Reset form
      formData = {
        person: '',
        role: 'Child',
        type: 'Star',
        reason: '',
        points: 10,
        date: new Date().toISOString().split('T')[0]
      };

      // Navigate back to dashboard
      window.location.href = '/rewards/dashboard';

    } catch (error) {
      console.error('Error creating reward:', error);
      errors.general = $_('rewards.create.errors.general');
    } finally {
      isSubmitting = false;
    }
  }

  // Get applicable roles based on selected role
  function getApplicableRoles(selectedRole) {
    switch (selectedRole) {
      case 'Child':
        return ['Parent', 'Adult', 'Child'];
      case 'Adult':
        return ['Parent', 'Adult'];
      case 'Elder':
        return ['Parent', 'Adult', 'Elder'];
      default:
        return ['Parent', 'Adult', 'Child'];
    }
  }

  // Predefined reason templates
  const reasonTemplates = {
    Star: [
      'Helped with household chores',
      'Completed school work without reminders',
      'Showed kindness to family members',
      'Practiced good habits',
      'Achieved academic excellence',
      'Helped elderly family members',
      'Maintained cleanliness',
      'Showed responsibility'
    ],
    Karma: [
      'Prepared traditional meal',
      'Organized family gathering',
      'Taught valuable lessons',
      'Maintained family traditions',
      'Provided guidance and wisdom',
      'Cared for family members',
      'Contributed to community service',
      'Demonstrated spiritual growth'
    ]
  };

  // Update points based on type
  $: if (formData.type === 'Star') {
    if (formData.points < 5 || formData.points > 30) {
      formData.points = 10;
    }
  } else if (formData.type === 'Karma') {
    if (formData.points < 10 || formData.points > 50) {
      formData.points = 20;
    }
  }

  // Subscribe to user profile
  userProfile.subscribe(profile => {
    currentUserRole = profile.role || 'Child';
  });
</script>

<svelte:head>
  <title>Add Reward - Divine-Nest</title>
</svelte:head>

<div class="container mx-auto p-4 max-w-2xl">
  <!-- Header -->
  <div class="flex items-center gap-4 mb-6">
    <a href="/rewards/dashboard" class="btn btn-ghost btn-circle">
      <Icon icon="mdi:arrow-left" class="w-5 h-5" />
    </a>
    <div>
      <h1 class="text-3xl font-bold text-primary">{$_('rewards.create.title')}</h1>
      <p class="text-base-content/70 mt-1">{$_('rewards.create.subtitle')}</p>
    </div>
  </div>

  <!-- Voice Input -->
  <div class="card bg-base-100 shadow-lg mb-6">
    <div class="card-body">
      <h3 class="card-title">
        <Icon icon="mdi:microphone" class="w-5 h-5" />
        {$_('rewards.create.voice_commands')}
      </h3>
      <p class="text-sm opacity-70 mb-4">{$_('rewards.create.voice_examples')}</p>

      <VoiceInput
        placeholder={$_('rewards.create.voice_placeholder')}
        onResult={handleVoiceCommand}
        className="w-full"
      />

      <div class="text-xs opacity-60 mt-2">
        <p><strong>{$_('rewards.create.voice_example_english')}:</strong> "Give Arjun a star for helping with chores"</p>
        <p><strong>{$_('rewards.create.voice_example_tamil')}:</strong> "அர்ஜூனுக்கு சமையலில் உதவியதற்கு நட்சத்திரம் கொடு"</p>
      </div>
    </div>
  </div>

  <!-- Form -->
  <form on:submit|preventDefault={handleSubmit} class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-xl mb-6">{$_('rewards.create.form_title')}</h2>

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
            <span class="label-text">{$_('rewards.create.person')}</span>
          </label>
          <input
            id="person"
            type="text"
            bind:value={formData.person}
            placeholder={$_('rewards.create.person_placeholder')}
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
            <span class="label-text">{$_('rewards.create.role')}</span>
          </label>
          <select
            id="role"
            bind:value={formData.role}
            class="select select-bordered"
          >
            <option value="Child">{$_('rewards.create.role_child')}</option>
            <option value="Adult">{$_('rewards.create.role_adult')}</option>
            <option value="Elder">{$_('rewards.create.role_elder')}</option>
          </select>
        </div>

        <!-- Type -->
        <div class="form-control">
          <label for="type" class="label">
            <span class="label-text">{$_('rewards.create.type')}</span>
          </label>
          <select
            id="type"
            bind:value={formData.type}
            class="select select-bordered"
          >
            <option value="Star">⭐ {$_('rewards.create.type_star')}</option>
            <option value="Karma">🪷 {$_('rewards.create.type_karma')}</option>
          </select>
        </div>

        <!-- Points -->
        <div class="form-control">
          <label for="points" class="label">
            <span class="label-text">{$_('rewards.create.points')}</span>
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
          <span class="label-text">{$_('rewards.create.date')}</span>
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
          <span class="label-text">{$_('rewards.create.reason')}</span>
        </label>
        <textarea
          id="reason"
          bind:value={formData.reason}
          placeholder={$_('rewards.create.reason_placeholder')}
          class="textarea textarea-bordered h-24"
          required
        ></textarea>
        {#if errors.reason}
          <label class="label">
            <span class="label-text-alt text-error">{errors.reason}</span>
          </label>
        {/if}

        <!-- Reason Templates -->
        <div class="mt-3">
          <p class="text-sm opacity-70 mb-2">{$_('rewards.create.quick_reasons')}:</p>
          <div class="flex flex-wrap gap-2">
            {#each reasonTemplates[formData.type] as template}
              <button
                type="button"
                class="btn btn-xs btn-outline"
                on:click={() => formData.reason = template}
              >
                {template}
              </button>
            {/each}
          </div>
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
          {$_('rewards.create.submit')}
        </button>

        <a href="/rewards/dashboard" class="btn btn-ghost">
          {$_('rewards.create.cancel')}
        </a>
      </div>
    </div>
  </form>

  <!-- Discussion Forum -->
  <DiscussionForum
    tableName="rewards_create"
    recordId="form_help"
    title={$_('rewards.create.discussion_title')}
    placeholder={$_('rewards.create.discussion_placeholder')}
  />
</div>