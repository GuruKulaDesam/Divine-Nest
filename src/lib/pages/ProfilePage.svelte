<script>
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import DeleteConfirmationModal from '../components/DeleteConfirmationModal.svelte';

  // User profile data
  let profile = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer with 5+ years of experience in web technologies. Passionate about creating user-friendly applications and solving complex problems.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    languages: ['English', 'Spanish'],
    timezone: 'America/Los_Angeles',
    joinDate: '2023-01-15',
    lastActive: new Date().toISOString()
  };

  // Form states
  let isEditing = false;
  let showDeleteModal = false;
  let showAvatarModal = false;
  let showPasswordModal = false;
  let showNotificationModal = false;

  // Form data
  let editForm = { ...profile };
  let passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  let notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    weeklyDigest: true
  };

  // Avatar upload
  let avatarFile = null;
  let avatarPreview = null;

  // Activity data
  let recentActivity = [
    {
      id: 1,
      type: 'login',
      description: 'Logged in from San Francisco, CA',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      icon: 'heroicons:computer-desktop'
    },
    {
      id: 2,
      type: 'profile_update',
      description: 'Updated profile information',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      icon: 'heroicons:pencil-square'
    },
    {
      id: 3,
      type: 'password_change',
      description: 'Changed password',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      icon: 'heroicons:key'
    },
    {
      id: 4,
      type: 'login',
      description: 'Logged in from New York, NY',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      icon: 'heroicons:computer-desktop'
    }
  ];

  // Stats data
  $: profileStats = [
    {
      name: $_('profile.days_active'),
      value: Math.floor((new Date().getTime() - new Date(profile.joinDate).getTime()) / (1000 * 60 * 60 * 24)).toString(),
      icon: 'heroicons:calendar-days',
      color: 'text-primary'
    },
    {
      name: $_('profile.projects_completed'),
      value: '24',
      icon: 'heroicons:check-circle',
      color: 'text-success'
    },
    {
      name: $_('profile.tasks_completed'),
      value: '156',
      icon: 'heroicons:clipboard-document-check',
      color: 'text-secondary'
    },
    {
      name: $_('profile.team_members'),
      value: '8',
      icon: 'heroicons:users',
      color: 'text-accent'
    }
  ];

  // Functions
  function startEditing() {
    editForm = { ...profile };
    isEditing = true;
  }

  function cancelEditing() {
    editForm = { ...profile };
    isEditing = false;
  }

  function saveProfile() {
    profile = { ...editForm };
    isEditing = false;
    // Here you would typically make an API call to save the profile
    console.log('Profile saved:', profile);
  }

  function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
      avatarFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function saveAvatar() {
    if (avatarPreview) {
      profile.avatar = avatarPreview;
    }
    showAvatarModal = false;
    avatarFile = null;
    avatarPreview = null;
  }

  function changePassword() {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      // Here you would typically make an API call to change password
      console.log('Password changed');
      showPasswordModal = false;
      passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
  }

  function saveNotificationSettings() {
    // Here you would typically make an API call to save notification settings
    console.log('Notification settings saved:', notificationSettings);
    showNotificationModal = false;
  }

  function deleteAccount() {
    showDeleteModal = true;
  }

  function handleDeleteConfirm() {
    // Here you would typically make an API call to delete the account
    console.log('Account deleted');
    showDeleteModal = false;
  }

  function handleDeleteCancel() {
    showDeleteModal = false;
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getActivityIcon(activity) {
    return activity.icon;
  }

  function getActivityColor(activity) {
    switch (activity.type) {
      case 'login': return 'text-primary';
      case 'profile_update': return 'text-success';
      case 'password_change': return 'text-warning';
      default: return 'text-base-content';
    }
  }
</script>

<div class="space-y-6">
  <!-- Page header with enhanced styling -->
  <div
    class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"
    use:motionInView={{ animation: "fadeInDown" }}
  >
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:user-circle" class="w-full h-full text-primary" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:identification" class="w-full h-full text-secondary" />
    </div>

    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">{$_('profile.title')}</h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">
          {$_('profile.description')}
        </p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          class="btn btn-outline shadow-md hover:shadow-lg group relative overflow-hidden"
          on:click={() => showNotificationModal = true}
          use:motionHover
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative flex items-center">
            <div
              class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300"
            >
              <Icon icon="heroicons:bell" class="w-5 h-5 mr-2" />
            </div>
            {$_('profile.notifications')}
          </div>
        </button>
        <button
          class="btn btn-primary shadow-md hover:shadow-lg group relative overflow-hidden"
          on:click={isEditing ? saveProfile : startEditing}
          use:motionHover
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative flex items-center">
            <div
              class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300"
            >
              <Icon icon={isEditing ? "heroicons:check" : "heroicons:pencil-square"} class="w-5 h-5 mr-2" />
            </div>
            {isEditing ? $_('profile.save') : $_('profile.edit')}
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Profile Stats -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200" use:motionHover>
      <div class="card-body p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">{profileStats[0].name}</p>
            <p class="text-2xl font-bold text-base-content">{profileStats[0].value}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200" use:motionHover>
      <div class="card-body p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
              <Icon icon="heroicons:check-circle" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">{profileStats[1].name}</p>
            <p class="text-2xl font-bold text-base-content">{profileStats[1].value}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200" use:motionHover>
      <div class="card-body p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-sm">
              <Icon icon="heroicons:clipboard-document-check" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">{profileStats[2].name}</p>
            <p class="text-2xl font-bold text-base-content">{profileStats[2].value}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200" use:motionHover>
      <div class="card-body p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-sm">
              <Icon icon="heroicons:users" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">{profileStats[3].name}</p>
            <p class="text-2xl font-bold text-base-content">{profileStats[3].value}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Profile Information -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Basic Information -->
      <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInUp' }}>
        <div class="card-body">
          <div class="flex items-center justify-between mb-6">
            <h2 class="card-title text-xl flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3">
                <Icon icon="heroicons:user" class="w-4 h-4 text-primary" />
              </div>
              {$_('profile.basic_information')}
            </h2>
            {#if isEditing}
              <button
                class="btn btn-sm btn-outline hover:bg-error hover:text-white transition-all duration-200"
                on:click={cancelEditing}
              >
                {$_('common.cancel')}
              </button>
            {/if}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">{$_('profile.full_name')}</span>
              </label>
              {#if isEditing}
                <input
                  type="text"
                  bind:value={editForm.name}
                  class="input input-bordered"
                  placeholder={$_('profile.full_name_placeholder')}
                />
              {:else}
                <p class="text-base-content">{profile.name}</p>
              {/if}
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">{$_('profile.email')}</span>
              </label>
              {#if isEditing}
                <input
                  type="email"
                  bind:value={editForm.email}
                  class="input input-bordered"
                  placeholder={$_('profile.email_placeholder')}
                />
              {:else}
                <p class="text-base-content">{profile.email}</p>
              {/if}
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">{$_('profile.phone')}</span>
              </label>
              {#if isEditing}
                <input
                  type="tel"
                  bind:value={editForm.phone}
                  class="input input-bordered"
                  placeholder={$_('profile.phone_placeholder')}
                />
              {:else}
                <p class="text-base-content">{profile.phone}</p>
              {/if}
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">{$_('profile.location')}</span>
              </label>
              {#if isEditing}
                <input
                  type="text"
                  bind:value={editForm.location}
                  class="input input-bordered"
                  placeholder={$_('profile.location_placeholder')}
                />
              {:else}
                <p class="text-base-content">{profile.location}</p>
              {/if}
            </div>

            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text font-medium">{$_('profile.bio')}</span>
              </label>
              {#if isEditing}
                <textarea
                  bind:value={editForm.bio}
                  rows="4"
                  class="textarea textarea-bordered"
                  placeholder={$_('profile.bio_placeholder')}
                ></textarea>
              {:else}
                <p class="text-base-content">{profile.bio}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Skills and Languages -->
      <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInUp' }}>
        <div class="card-body">
          <h2 class="card-title text-xl mb-6 flex items-center">
            <div class="w-8 h-8 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3">
              <Icon icon="heroicons:academic-cap" class="w-4 h-4 text-accent" />
            </div>
            {$_('profile.skills_languages')}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium text-base-content mb-3">{$_('profile.skills')}</h3>
              {#if isEditing}
                <div class="space-y-2">
                  {#each editForm.skills as skill, index}
                    <div class="form-control">
                      <div class="flex items-center space-x-2">
                        <input
                          type="text"
                          bind:value={editForm.skills[index]}
                          class="input input-bordered input-sm flex-1"
                        />
                        <button
                          class="btn btn-sm btn-circle btn-outline"
                          on:click={() => editForm.skills = editForm.skills.filter((_, i) => i !== index)}
                        >
                          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  {/each}
                  <button
                    class="btn btn-sm btn-outline"
                    on:click={() => editForm.skills = [...editForm.skills, '']}
                  >
                    <Icon icon="heroicons:plus" class="w-4 h-4 mr-1" />
                    {$_('profile.add_skill')}
                  </button>
                </div>
              {:else}
                <div class="flex flex-wrap gap-2">
                  {#each profile.skills as skill}
                    <div class="badge badge-primary">{skill}</div>
                  {/each}
                </div>
              {/if}
            </div>

            <div>
              <h3 class="text-lg font-medium text-base-content mb-3">{$_('profile.languages')}</h3>
              {#if isEditing}
                <div class="space-y-2">
                  {#each editForm.languages as language, index}
                    <div class="form-control">
                      <div class="flex items-center space-x-2">
                        <input
                          type="text"
                          bind:value={editForm.languages[index]}
                          class="input input-bordered input-sm flex-1"
                        />
                        <button
                          class="btn btn-sm btn-circle btn-outline"
                          on:click={() => editForm.languages = editForm.languages.filter((_, i) => i !== index)}
                        >
                          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  {/each}
                  <button
                    class="btn btn-sm btn-outline"
                    on:click={() => editForm.languages = [...editForm.languages, '']}
                  >
                    <Icon icon="heroicons:plus" class="w-4 h-4 mr-1" />
                    {$_('profile.add_language')}
                  </button>
                </div>
              {:else}
                <div class="flex flex-wrap gap-2">
                  {#each profile.languages as language}
                    <div class="badge badge-secondary">{language}</div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Avatar Section -->
      <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInUp' }}>
        <div class="card-body text-center">
          <div class="relative inline-block">
            <div class="avatar">
              <div class="w-24 rounded-full ring-4 ring-primary/20 ring-offset-base-100 ring-offset-2 shadow-lg">
                <img src={avatarPreview || profile.avatar} alt={profile.name} />
              </div>
            </div>
            {#if isEditing}
              <button
                class="btn btn-circle btn-primary absolute bottom-0 right-0 shadow-lg hover:scale-110 transition-transform duration-200"
                on:click={() => showAvatarModal = true}
              >
                <Icon icon="heroicons:camera" class="w-4 h-4" />
              </button>
            {/if}
          </div>
          <h3 class="text-lg font-semibold text-base-content mt-4">{profile.name}</h3>
          <p class="text-base-content/60">{profile.role}</p>
          <p class="text-sm text-base-content/40">{profile.department}</p>

          <div class="divider"></div>

          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Icon icon="heroicons:calendar-days" class="w-4 h-4 text-primary" />
              </div>
              <div class="text-left">
                <p class="text-sm font-medium text-base-content">{$_('profile.member_since')}</p>
                <p class="text-sm text-base-content/60">{formatDate(profile.joinDate)}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Icon icon="heroicons:clock" class="w-4 h-4 text-accent" />
              </div>
              <div class="text-left">
                <p class="text-sm font-medium text-base-content">{$_('profile.last_active')}</p>
                <p class="text-sm text-base-content/60">{formatTime(profile.lastActive)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInUp' }}>
        <div class="card-body">
          <h3 class="card-title text-lg mb-4 flex items-center">
            <div class="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2">
              <Icon icon="heroicons:bolt" class="w-3 h-3 text-primary" />
            </div>
            {$_('profile.quick_actions')}
          </h3>
          <div class="space-y-3">
            <button
              class="btn btn-outline w-full justify-start hover:bg-primary hover:text-white transition-all duration-200"
              on:click={() => showPasswordModal = true}
            >
              <Icon icon="heroicons:key" class="w-5 h-5 mr-2" />
              {$_('profile.change_password')}
            </button>
            <button
              class="btn btn-outline w-full justify-start hover:bg-secondary hover:text-white transition-all duration-200"
              on:click={() => showNotificationModal = true}
            >
              <Icon icon="heroicons:bell" class="w-5 h-5 mr-2" />
              {$_('profile.notification_settings')}
            </button>
            <button
              class="btn btn-outline w-full justify-start hover:bg-accent hover:text-white transition-all duration-200"
              on:click={() => showAvatarModal = true}
            >
              <Icon icon="heroicons:camera" class="w-5 h-5 mr-2" />
              {$_('profile.change_avatar')}
            </button>
            <button
              class="btn btn-error text-white w-full justify-start hover:shadow-lg transition-all duration-200"
              on:click={deleteAccount}
            >
              <Icon icon="heroicons:trash" class="w-5 h-5 mr-2" />
              {$_('profile.delete_account')}
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200" use:motionInView={{ animation: 'fadeInUp' }}>
        <div class="card-body">
          <h3 class="card-title text-lg mb-4 flex items-center">
            <div class="w-6 h-6 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2">
              <Icon icon="heroicons:clock" class="w-3 h-3 text-accent" />
            </div>
            {$_('profile.recent_activity')}
          </h3>
          <div class="space-y-4">
            {#each recentActivity as activity}
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="avatar placeholder">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon icon={getActivityIcon(activity)} class="w-4 h-4 {getActivityColor(activity)}" />
                    </div>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-base-content">{activity.description}</p>
                  <p class="text-xs text-base-content/60">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Avatar Upload Modal -->
{#if showAvatarModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{$_('profile.change_avatar')}</h3>
        <button
          class="btn btn-sm btn-circle btn-ghost"
          on:click={() => showAvatarModal = false}
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-4">
        <div class="text-center">
          <div class="avatar">
            <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatarPreview || profile.avatar} alt="Avatar preview" />
            </div>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('profile.upload_image')}</span>
          </label>
          <input
            type="file"
            accept="image/*"
            on:change={handleAvatarUpload}
            class="file-input file-input-bordered w-full"
          />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline" on:click={() => showAvatarModal = false}>
          {$_('common.cancel')}
        </button>
        <button class="btn btn-primary" on:click={saveAvatar}>
          {$_('profile.save_avatar')}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Password Change Modal -->
{#if showPasswordModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{$_('profile.change_password')}</h3>
        <button
          class="btn btn-sm btn-circle btn-ghost"
          on:click={() => showPasswordModal = false}
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('profile.current_password')}</span>
          </label>
          <input
            type="password"
            bind:value={passwordForm.currentPassword}
            class="input input-bordered"
            placeholder={$_('profile.current_password_placeholder')}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('profile.new_password')}</span>
          </label>
          <input
            type="password"
            bind:value={passwordForm.newPassword}
            class="input input-bordered"
            placeholder={$_('profile.new_password_placeholder')}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">{$_('profile.confirm_password')}</span>
          </label>
          <input
            type="password"
            bind:value={passwordForm.confirmPassword}
            class="input input-bordered"
            placeholder={$_('profile.confirm_password_placeholder')}
          />
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline" on:click={() => showPasswordModal = false}>
          {$_('common.cancel')}
        </button>
        <button class="btn btn-primary" on:click={changePassword}>
          {$_('profile.update_password')}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Notification Settings Modal -->
{#if showNotificationModal}
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">{$_('profile.notification_settings')}</h3>
        <button
          class="btn btn-sm btn-circle btn-ghost"
          on:click={() => showNotificationModal = false}
        >
          <Icon icon="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{$_('profile.email_notifications')}</span>
            <input
              type="checkbox"
              bind:checked={notificationSettings.emailNotifications}
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{$_('profile.push_notifications')}</span>
            <input
              type="checkbox"
              bind:checked={notificationSettings.pushNotifications}
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{$_('profile.marketing_emails')}</span>
            <input
              type="checkbox"
              bind:checked={notificationSettings.marketingEmails}
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{$_('profile.security_alerts')}</span>
            <input
              type="checkbox"
              bind:checked={notificationSettings.securityAlerts}
              class="toggle toggle-primary"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{$_('profile.weekly_digest')}</span>
            <input
              type="checkbox"
              bind:checked={notificationSettings.weeklyDigest}
              class="toggle toggle-primary"
            />
          </label>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-outline" on:click={() => showNotificationModal = false}>
          {$_('common.cancel')}
        </button>
        <button class="btn btn-primary" on:click={saveNotificationSettings}>
          {$_('profile.save_settings')}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Account Confirmation Modal -->
<DeleteConfirmationModal
  bind:isOpen={showDeleteModal}
  title={$_('profile.delete_account_title')}
  message={$_('profile.delete_account_message')}
  itemName={profile.name}
  on:confirm={handleDeleteConfirm}
  on:cancel={handleDeleteCancel}
/> 