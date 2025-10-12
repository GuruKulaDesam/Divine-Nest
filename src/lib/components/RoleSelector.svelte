<script>
  import { userRole } from "$lib/stores/userRole.js";
  import Icon from "@iconify/svelte";

  let currentRole = null;

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
  });

  const roles = [
    { id: 'mother', label: 'Mother', icon: 'mdi:account-heart', color: 'bg-pink-100 text-pink-700' },
    { id: 'father', label: 'Father', icon: 'mdi:account-tie', color: 'bg-blue-100 text-blue-700' },
    { id: 'grandmother', label: 'Grandmother', icon: 'mdi:account-star', color: 'bg-purple-100 text-purple-700' },
    { id: 'grandfather', label: 'Grandfather', icon: 'mdi:account-star', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'child', label: 'Child', icon: 'mdi:account-child', color: 'bg-green-100 text-green-700' },
    { id: 'teenager', label: 'Teenager', icon: 'mdi:account-school', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'helper', label: 'Helper', icon: 'mdi:account-hard-hat', color: 'bg-orange-100 text-orange-700' }
  ];

  function selectRole(roleId) {
    userRole.set(roleId);
  }
</script>

<div class="role-selector p-6 bg-white border-b border-gray-200">
  <h3 class="text-lg font-semibold text-gray-800 mb-4">Select Your Role</h3>
  <div class="grid grid-cols-2 gap-3">
    {#each roles as role}
      <button
        on:click={() => selectRole(role.id)}
        class="p-4 rounded-lg border-2 transition-all {currentRole === role.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 {role.color} rounded-full flex items-center justify-center">
            <Icon icon={role.icon} class="w-6 h-6" />
          </div>
          <div class="text-left">
            <p class="font-medium text-gray-800 capitalize">{role.label}</p>
            <p class="text-xs text-gray-500">Tap to switch</p>
          </div>
        </div>
      </button>
    {/each}
  </div>

  {#if currentRole}
    <div class="mt-4 p-3 bg-blue-50 rounded-lg">
      <p class="text-sm text-blue-700">
        Currently viewing as: <span class="font-medium capitalize">{currentRole}</span>
      </p>
    </div>
  {/if}
</div>