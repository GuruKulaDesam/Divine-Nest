<script>
  import Icon from "@iconify/svelte";
  import { userRole, setUserRole, roleDashboards } from "$lib/stores/userRole.js";

  export let onRoleSelected = () => {};

  let selectedRole = 'mother';

  const roles = [
    {
      id: 'mother',
      name: 'Mother',
      icon: 'mdi:mother-heart',
      description: 'Manage groceries, school fees, helper schedule, and family meals',
      color: 'bg-rose-50 border-rose-200',
      iconColor: 'text-rose-600'
    },
    {
      id: 'grandmother',
      name: 'Grandmother',
      icon: 'mdi:grandma',
      description: 'Temple reminders, medicine alerts, and family care',
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600'
    },
    {
      id: 'helper',
      name: 'Helper',
      icon: 'mdi:account-hard-hat',
      description: 'Daily tasks, attendance tracking, and household chores',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'teenager',
      name: 'Teenager',
      icon: 'mdi:school',
      description: 'Study tracking, mood check-ins, and personal goals',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'father',
      name: 'Father',
      icon: 'mdi:father',
      description: 'Bills, finances, work schedule, and maintenance',
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600'
    },
    {
      id: 'elder',
      name: 'Elder',
      icon: 'mdi:account-cowboy-hat',
      description: 'Health reminders, rituals, and peaceful activities',
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600'
    }
  ];

  function handleRoleSelect(roleId) {
    selectedRole = roleId;
    setUserRole(roleId);
    onRoleSelected(roleId);
  }
</script>

<div class="role-selection-container max-w-4xl mx-auto p-6">
  <div class="text-center mb-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Choose Your Role</h2>
    <p class="text-lg text-gray-600">Select how you primarily use Home Management Suite in your household</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each roles as role}
      <div
        class="role-card p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg {selectedRole === role.id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'} {role.color}"
        on:click={() => handleRoleSelect(role.id)}
      >
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
            <Icon icon={role.icon} class="w-8 h-8 {role.iconColor}" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{role.name}</h3>
          <p class="text-sm text-gray-600 leading-relaxed">{role.description}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="text-center mt-8">
    <button
      class="btn btn-primary btn-lg px-8 py-3"
      on:click={() => handleRoleSelect(selectedRole)}
    >
      Continue as {roles.find(r => r.id === selectedRole)?.name}
      <Icon icon="mdi:arrow-right" class="w-5 h-5 ml-2" />
    </button>
  </div>
</div>

<style>
  .role-card:hover {
    transform: translateY(-2px);
  }

  .role-card.selected {
    transform: scale(1.02);
  }
</style>