<script>
  import { onMount } from 'svelte';
  import { sqliteService } from '$lib/services/sqliteService';
  import Icon from '@iconify/svelte';

  let familyMembers = [];
  let familyTree = {};

  onMount(async () => {
    await loadFamilyMembers();
    buildFamilyTree();
  });

  async function loadFamilyMembers() {
    try {
      const members = await sqliteService.getFamilyMembers?.() || [];
      familyMembers = members;
    } catch (error) {
      console.error('Error loading family members:', error);
      familyMembers = [];
    }
  }

  function buildFamilyTree() {
    // Simple tree structure - in a real app this would be more complex
    const tree = {};

    // Group by generation/relationship
    familyMembers.forEach(member => {
      const relationship = member.relationship || 'member';
      if (!tree[relationship]) {
        tree[relationship] = [];
      }
      tree[relationship].push(member);
    });

    familyTree = tree;
  }

  function getRelationshipIcon(relationship) {
    const icons = {
      'father': 'heroicons:user',
      'mother': 'heroicons:user',
      'son': 'heroicons:user',
      'daughter': 'heroicons:user',
      'grandfather': 'heroicons:user',
      'grandmother': 'heroicons:user',
      'uncle': 'heroicons:user',
      'aunt': 'heroicons:user',
      'cousin': 'heroicons:user',
      'member': 'heroicons:user-group'
    };
    return icons[relationship] || 'heroicons:user';
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-base-content">Family Tree</h1>
    <button class="btn btn-primary">
      <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
      Add Member
    </button>
  </div>

  <!-- Family Tree Visualization -->
  <div class="card bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-xl">
    <div class="card-body">
      <div class="space-y-8">
        {#each Object.entries(familyTree) as [relationship, members]}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold capitalize text-base-content border-b border-white/20 dark:border-gray-700/30 pb-2">
              {relationship}s ({members.length})
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {#each members as member}
                <div class="card bg-white/5 dark:bg-gray-700/20 border border-white/10 dark:border-gray-600/30 hover:border-primary/50 transition-colors">
                  <div class="card-body p-4">
                    <div class="flex items-center space-x-3">
                      <div class="avatar placeholder">
                        <div class="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                          <Icon icon={getRelationshipIcon(member.relationship)} class="w-6 h-6" />
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-base-content truncate">
                          {member.name || 'Unnamed'}
                        </h4>
                        <p class="text-sm opacity-70 capitalize">
                          {member.relationship || 'Member'}
                        </p>
                        {#if member.age}
                          <p class="text-xs opacity-60">{member.age} years old</p>
                        {/if}
                      </div>
                    </div>

                    {#if member.phone || member.email}
                      <div class="mt-3 space-y-1">
                        {#if member.phone}
                          <div class="flex items-center space-x-2 text-sm">
                            <Icon icon="heroicons:phone" class="w-4 h-4 opacity-60" />
                            <span class="opacity-80">{member.phone}</span>
                          </div>
                        {/if}
                        {#if member.email}
                          <div class="flex items-center space-x-2 text-sm">
                            <Icon icon="heroicons:envelope" class="w-4 h-4 opacity-60" />
                            <span class="opacity-80 truncate">{member.email}</span>
                          </div>
                        {/if}
                      </div>
                    {/if}

                    <div class="card-actions justify-end mt-3">
                      <button class="btn btn-sm btn-outline btn-primary">
                        <Icon icon="heroicons:eye" class="w-4 h-4" />
                      </button>
                      <button class="btn btn-sm btn-outline">
                        <Icon icon="heroicons:pencil" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      {#if Object.keys(familyTree).length === 0}
        <div class="text-center py-12">
          <Icon icon="heroicons:user-group" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-xl font-semibold text-base-content mb-2">No Family Members</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Start building your family tree by adding members.</p>
          <button class="btn btn-primary">
            <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
            Add First Member
          </button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Family Statistics -->
  {#if familyMembers.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-primary">
          <Icon icon="heroicons:user-group" class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Members</div>
        <div class="stat-value">{familyMembers.length}</div>
      </div>

      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-secondary">
          <Icon icon="heroicons:heart" class="w-8 h-8" />
        </div>
        <div class="stat-title">Relationships</div>
        <div class="stat-value">{Object.keys(familyTree).length}</div>
      </div>

      <div class="stat bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-box">
        <div class="stat-figure text-accent">
          <Icon icon="heroicons:phone" class="w-8 h-8" />
        </div>
        <div class="stat-title">With Contact Info</div>
        <div class="stat-value">
          {familyMembers.filter(m => m.phone || m.email).length}
        </div>
      </div>
    </div>
  {/if}
</div>