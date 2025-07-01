<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { _ } from 'svelte-i18n';
  import { generateUserAvatar, generateFallbackAvatar } from '../utils/avatar.js';
  import { users, userStats, userRoles, userStatuses, departments, userColumns } from '../data/users.js';
  import { motionInView, staggerAnimate, motionHover } from '../utils/motion.js';
  import DeleteConfirmationModal from '../components/DeleteConfirmationModal.svelte';
  
  let filteredUsers = [...users];
  let searchTerm = '';
  let selectedRole = '';
  let selectedStatus = '';
  let selectedDepartment = '';
  let sortBy = 'name';
  let sortDirection = 'asc';
  let showAddUserModal = false;
  let selectedUser = null;
  let showUserModal = false;
  let showDeleteModal = false;
  let userToDelete = null;
  
  let statsElements = [];
  let userRowElements = [];
  
  // Create translated table columns
  $: translatedUserColumns = [
    { key: 'name', label: $_('users.name'), sortable: true },
    { key: 'email', label: $_('users.email'), sortable: true },
    { key: 'role', label: $_('users.role'), sortable: true },
    { key: 'department', label: $_('users.department'), sortable: true },
    { key: 'status', label: $_('users.status'), sortable: true },
    { key: 'lastActive', label: $_('users.last_active'), sortable: true },
    { key: 'joinDate', label: $_('users.join_date'), sortable: true },
    { key: 'actions', label: $_('users.actions'), sortable: false }
  ];
  
  // Create translated user roles
  $: translatedUserRoles = [
    { id: 'admin', name: $_('users.admin'), color: 'bg-red-100 text-red-800' },
    { id: 'manager', name: $_('users.manager'), color: 'bg-blue-100 text-blue-800' },
    { id: 'editor', name: $_('users.editor'), color: 'bg-green-100 text-green-800' },
    { id: 'viewer', name: $_('users.viewer'), color: 'bg-gray-100 text-gray-800' }
  ];
  
  // Create translated user statuses
  $: translatedUserStatuses = [
    { id: 'active', name: $_('users.active'), color: 'bg-green-100 text-green-800' },
    { id: 'inactive', name: $_('users.inactive'), color: 'bg-gray-100 text-gray-800' },
    { id: 'suspended', name: $_('users.suspended'), color: 'bg-red-100 text-red-800' },
    { id: 'pending', name: $_('users.pending'), color: 'bg-yellow-100 text-yellow-800' }
  ];
  
  // Create translated user stats
  $: translatedUserStats = [
    {
      name: $_('users.total_users'),
      value: users.length.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: 'heroicons:users'
    },
    {
      name: $_('users.active_users'),
      value: users.filter(user => user.status === 'active').length.toString(),
      change: '+8%',
      changeType: 'positive',
      icon: 'heroicons:user-circle'
    },
    {
      name: $_('users.new_users'),
      value: users.filter(user => {
        const joinDate = new Date(user.joinDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return joinDate > thirtyDaysAgo;
      }).length.toString(),
      change: '+15%',
      changeType: 'positive',
      icon: 'heroicons:user-plus'
    },
    {
      name: $_('users.inactive_users'),
      value: users.filter(user => user.status === 'inactive').length.toString(),
      change: '-3%',
      changeType: 'negative',
      icon: 'heroicons:user-minus'
    }
  ];
  
  onMount(() => {
    // Animate stats cards with stagger
    if (statsElements.length > 0) {
      staggerAnimate(statsElements, 'fadeInUp', { delay: 0.1 });
    }
    
    // Animate user rows with stagger
    if (userRowElements.length > 0) {
      staggerAnimate(userRowElements, 'fadeInUp', { delay: 0.05 });
    }
  });
  
  // Filter and sort users
  $: {
    filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !selectedRole || user.role === selectedRole;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;
      const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
      
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    }).sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'lastActive' || sortBy === 'joinDate') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
  
  function handleSort(column) {
    if (sortBy === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = column;
      sortDirection = 'asc';
    }
  }
  
  function getRoleInfo(roleId) {
    return translatedUserRoles.find(role => role.id === roleId);
  }
  
  function getStatusInfo(statusId) {
    return translatedUserStatuses.find(status => status.id === statusId);
  }
  
  function formatDate(dateString) {
    if (!dateString) return $_('common.never');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  function formatLastActive(dateString) {
    if (!dateString) return $_('common.never');
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return $_('common.just_now');
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  }
  
  function handleEditUser(user) {
    selectedUser = user;
    showUserModal = true;
  }
  
  function handleDeleteUser(user) {
    userToDelete = user;
    showDeleteModal = true;
  }
  
  function handleDeleteConfirm() {
    if (userToDelete) {
      // Handle delete logic here
      console.log('Delete user:', userToDelete);
      userToDelete = null;
    }
  }
  
  function handleDeleteCancel() {
    userToDelete = null;
  }
  
  function clearFilters() {
    searchTerm = '';
    selectedRole = '';
    selectedStatus = '';
    selectedDepartment = '';
  }
</script>

<div class="space-y-8">
  <!-- Page header -->
  <div class="border-b border-gray-200 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{$_('users.title')}</h1>
        <p class="mt-2 text-sm text-gray-600">{$_('users.description')}</p>
      </div>
      <button 
        class="btn btn-primary"
        on:click={() => showAddUserModal = true}
        use:motionHover
      >
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        {$_('users.add_user')}
      </button>
    </div>
  </div>
  
  <!-- Stats grid -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each translatedUserStats as stat, index}
      <div 
        bind:this={statsElements[index]}
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        use:motionHover
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon icon={stat.icon} class="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            <p class="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium {stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            <Icon icon="heroicons:arrow-trending-up" class="-ml-1 mr-0.5 flex-shrink-0 self-center h-4 w-4 {stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}" />
            {stat.change}
          </span>
          <span class="ml-2 text-sm text-gray-500">{$_('analytics.from_last_month')}</span>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Filters and search -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
      <!-- Search -->
      <div class="flex-1">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon="heroicons:magnifying-glass" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            bind:value={searchTerm}
            placeholder={$_('users.search_placeholder')}
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
      </div>
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-4">
        <select
          bind:value={selectedRole}
          class="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg"
        >
          <option value="">{$_('users.all_roles')}</option>
          {#each translatedUserRoles as role}
            <option value={role.id}>{role.name}</option>
          {/each}
        </select>
        
        <select
          bind:value={selectedStatus}
          class="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg"
        >
          <option value="">{$_('users.all_statuses')}</option>
          {#each translatedUserStatuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>
        
        <select
          bind:value={selectedDepartment}
          class="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg"
        >
          <option value="">{$_('users.all_departments')}</option>
          {#each departments as department}
            <option value={department}>{department}</option>
          {/each}
        </select>
        
        <button
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          on:click={clearFilters}
        >
          <Icon icon="heroicons:x-mark" class="h-5 w-5 mr-2" />
          {$_('common.clear_filters')}
        </button>
      </div>
    </div>
  </div>
  
  <!-- Users table -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" use:motionInView={{ animation: 'fadeInUp', delay: 0.2 }}>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            {#each translatedUserColumns as column}
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                class:cursor-pointer={column.sortable}
                on:click={() => column.sortable && handleSort(column.key)}
              >
                <div class="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {#if column.sortable && sortBy === column.key}
                    <Icon 
                      icon={sortDirection === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} 
                      class="h-4 w-4"
                    />
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredUsers as user, index}
            <tr 
              bind:this={userRowElements[index]}
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      src={generateUserAvatar(user.name)} 
                      alt={user.name}
                      class="h-10 w-10 rounded-full"
                      on:error={(e) => e.target.src = generateFallbackAvatar(user.name)}
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{user.email}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if getRoleInfo(user.role)}
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getRoleInfo(user.role).color}">
                    {getRoleInfo(user.role).name}
                  </span>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.department}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if getStatusInfo(user.status)}
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusInfo(user.status).color}">
                    {getStatusInfo(user.status).name}
                  </span>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatLastActive(user.lastActive)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.joinDate)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-3 justify-end">
                  <button
                    class="text-primary-600 hover:text-primary-900"
                    on:click={() => handleEditUser(user)}
                  >
                    <Icon icon="heroicons:pencil-square" class="h-5 w-5" />
                  </button>
                  <button
                    class="text-red-600 hover:text-red-900"
                    on:click={() => handleDeleteUser(user)}
                  >
                    <Icon icon="heroicons:trash" class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Delete confirmation modal -->
{#if showDeleteModal}
  <DeleteConfirmationModal
    title={$_('users.delete_user')}
    message={$_('users.delete_user_confirm', { values: { name: userToDelete?.name } })}
    onConfirm={handleDeleteConfirm}
    onCancel={handleDeleteCancel}
  />
{/if} 