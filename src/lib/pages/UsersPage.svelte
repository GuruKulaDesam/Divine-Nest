<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";
  import {
    generateUserAvatar,
    generateFallbackAvatar,
  } from "../utils/avatar.js";
  import {
    users,
    userStats,
    userRoles,
    userStatuses,
    departments,
    userColumns,
  } from "../data/users.js";
  import {
    motionInView,
    staggerAnimate,
    motionHover,
  } from "../utils/motion.js";
  import DeleteConfirmationModal from "../components/DeleteConfirmationModal.svelte";

  let filteredUsers = [...users];
  let searchTerm = "";
  let selectedRole = "";
  let selectedStatus = "";
  let selectedDepartment = "";
  let sortBy = "name";
  let sortDirection = "asc";
  let showAddUserModal = false;
  let selectedUser = null;
  let showUserModal = false;
  let showDeleteModal = false;
  let userToDelete = null;

  let statsElements = [];
  let userRowElements = [];

  // Icon background colors for different stat types
  const iconColors = {
    "heroicons:users": "from-blue-500 to-indigo-600",
    "heroicons:user-circle": "from-green-500 to-emerald-600",
    "heroicons:user-plus": "from-purple-500 to-pink-600",
    "heroicons:user-minus": "from-red-500 to-pink-600",
    "heroicons:currency-dollar": "from-emerald-500 to-teal-600",
    "heroicons:shopping-cart": "from-purple-500 to-pink-600",
    "heroicons:chart-bar": "from-orange-500 to-red-600",
    "heroicons:trending-up": "from-green-500 to-emerald-600",
    "heroicons:fire": "from-red-500 to-pink-600",
    "heroicons:star": "from-yellow-500 to-orange-600",
    "heroicons:heart": "from-pink-500 to-rose-600",
    "heroicons:plus": "from-blue-500 to-indigo-600",
    "heroicons:document-text": "from-purple-500 to-pink-600",
    "heroicons:cog": "from-gray-500 to-slate-600",
    "heroicons:bell": "from-yellow-500 to-orange-600",
    "heroicons:envelope": "from-green-500 to-emerald-600",
    "heroicons:calendar": "from-red-500 to-pink-600",
    "heroicons:user-group": "from-indigo-500 to-purple-600",
    "heroicons:chart-pie": "from-teal-500 to-cyan-600",
  };

  // Create translated table columns
  $: translatedUserColumns = [
    { key: "name", label: $_("users.name"), sortable: true },
    { key: "email", label: $_("users.email"), sortable: true },
    { key: "role", label: $_("users.role"), sortable: true },
    { key: "department", label: $_("users.department"), sortable: true },
    { key: "status", label: $_("users.status"), sortable: true },
    { key: "lastActive", label: $_("users.last_active"), sortable: true },
    { key: "joinDate", label: $_("users.join_date"), sortable: true },
    { key: "actions", label: $_("users.actions"), sortable: false },
  ];

  // Create translated user roles
  $: translatedUserRoles = [
    { id: "admin", name: $_("users.admin"), color: "bg-error/20 text-error" },
    {
      id: "manager",
      name: $_("users.manager"),
      color: "bg-primary/20 text-primary",
    },
    {
      id: "editor",
      name: $_("users.editor"),
      color: "bg-success/20 text-success",
    },
    {
      id: "viewer",
      name: $_("users.viewer"),
      color: "bg-base-content/20 text-base-content",
    },
  ];

  // Create translated user statuses
  $: translatedUserStatuses = [
    {
      id: "active",
      name: $_("users.active"),
      color: "bg-success/20 text-success",
    },
    {
      id: "inactive",
      name: $_("users.inactive"),
      color: "bg-base-content/20 text-base-content",
    },
    {
      id: "suspended",
      name: $_("users.suspended"),
      color: "bg-error/20 text-error",
    },
    {
      id: "pending",
      name: $_("users.pending"),
      color: "bg-warning/20 text-warning",
    },
  ];

  // Create translated user stats
  $: translatedUserStats = [
    {
      name: $_("users.total_users"),
      value: users.length.toString(),
      change: "+12%",
      changeType: "positive",
      icon: "heroicons:users",
    },
    {
      name: $_("users.active_users"),
      value: users.filter((user) => user.status === "active").length.toString(),
      change: "+8%",
      changeType: "positive",
      icon: "heroicons:user-circle",
    },
    {
      name: $_("users.new_users"),
      value: users
        .filter((user) => {
          const joinDate = new Date(user.joinDate);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return joinDate > thirtyDaysAgo;
        })
        .length.toString(),
      change: "+15%",
      changeType: "positive",
      icon: "heroicons:user-plus",
    },
    {
      name: $_("users.inactive_users"),
      value: users
        .filter((user) => user.status === "inactive")
        .length.toString(),
      change: "-3%",
      changeType: "negative",
      icon: "heroicons:user-minus",
    },
  ];

  onMount(() => {
    // Animate stats cards with stagger
    if (statsElements.length > 0) {
      staggerAnimate(statsElements, "fadeInUp", { delay: 0.1 });
    }

    // Animate user rows with stagger
    if (userRowElements.length > 0) {
      staggerAnimate(userRowElements, "fadeInUp", { delay: 0.05 });
    }
  });

  // Filter and sort users
  $: {
    filteredUsers = users
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !selectedRole || user.role === selectedRole;
        const matchesStatus = !selectedStatus || user.status === selectedStatus;
        const matchesDepartment =
          !selectedDepartment || user.department === selectedDepartment;

        return (
          matchesSearch && matchesRole && matchesStatus && matchesDepartment
        );
      })
      .sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === "lastActive" || sortBy === "joinDate") {
          aValue = new Date(aValue || 0);
          bValue = new Date(bValue || 0);
        }

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }

  function handleSort(column) {
    if (sortBy === column) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortBy = column;
      sortDirection = "asc";
    }
  }

  function getRoleInfo(roleId) {
    return translatedUserRoles.find((role) => role.id === roleId);
  }

  function getStatusInfo(statusId) {
    return translatedUserStatuses.find((status) => status.id === statusId);
  }

  function formatDate(dateString) {
    if (!dateString) return $_("common.never");
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatLastActive(dateString) {
    if (!dateString) return $_("common.never");
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return $_("common.just_now");
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
      console.log("Delete user:", userToDelete);
      userToDelete = null;
    }
  }

  function handleDeleteCancel() {
    userToDelete = null;
  }

  function clearFilters() {
    searchTerm = "";
    selectedRole = "";
    selectedStatus = "";
    selectedDepartment = "";
  }
</script>

<div class="space-y-8">
  <!-- Page header with enhanced styling -->
  <div
    class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"
    use:motionInView={{ animation: "fadeInDown" }}
  >
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-16 h-16 opacity-10">
      <Icon icon="heroicons:users" class="w-full h-full text-primary" />
    </div>
    <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">
      <Icon icon="heroicons:user-group" class="w-full h-full text-secondary" />
    </div>

    <div class="relative flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">
          {$_("users.title")}
        </h1>
        <p class="mt-2 text-sm text-base-content/70 max-w-md">
          {$_("users.description")}
        </p>
      </div>
      <button
        class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden"
        on:click={() => (showAddUserModal = true)}
        use:motionHover
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative flex items-center">
          <div
            class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300"
          >
            <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
          </div>
          {$_("users.add_user")}
        </div>
      </button>
    </div>
  </div>

  <!-- Enhanced Stats grid with gradient backgrounds -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each translatedUserStats as stat, index}
      <div
        bind:this={statsElements[index]}
        class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/50 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"
        use:motionHover
      >
        <!-- Background icon -->
        <div
          class="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        >
          <Icon icon={stat.icon} class="w-full h-full text-primary" />
        </div>

        <!-- Glow effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        ></div>

        <div class="relative flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-14 h-14 bg-gradient-to-br {iconColors[stat.icon] ||
                'from-primary/20 to-secondary/20'} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300"
            >
              <Icon
                icon={stat.icon}
                class="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/70 truncate">
              {stat.name}
            </p>
            <p
              class="text-3xl font-bold text-base-content group-hover:text-primary transition-colors duration-300"
            >
              {stat.value}
            </p>
          </div>
        </div>
        <div class="mt-4 relative">
          <span
            class="inline-flex items-baseline px-3 py-1 rounded-full text-sm font-medium shadow-sm {stat.changeType ===
            'positive'
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-error/20 text-error border border-error/30'}"
          >
            <Icon
              icon="heroicons:arrow-trending-up"
              class="-ml-1 mr-1 flex-shrink-0 self-center h-4 w-4 {stat.changeType ===
              'positive'
                ? 'text-success'
                : 'text-error'}"
            />
            {stat.change}
          </span>
          <span class="ml-2 text-sm text-base-content/60"
            >{$_("analytics.from_last_month")}</span
          >
        </div>
      </div>
    {/each}
  </div>

  <!-- Enhanced Filters and search -->
  <div
          class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"
    use:motionInView={{ animation: "fadeInUp" }}
  >
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-20 h-20 opacity-5">
      <Icon icon="heroicons:funnel" class="w-full h-full text-primary" />
    </div>

    <div
      class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4"
    >
      <!-- Search -->
      <div class="flex-1">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon
              icon="heroicons:magnifying-glass"
              class="h-5 w-5 text-base-content/40"
            />
          </div>
          <input
            type="text"
            bind:value={searchTerm}
            placeholder={$_("users.search_placeholder")}
            class="block w-full pl-10 pr-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-base-100 text-base-content placeholder-base-content/40"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4">
        <select
          bind:value={selectedRole}
          class="select select-bordered w-full sm:w-auto bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
        >
          <option value="">{$_("users.all_roles")}</option>
          {#each translatedUserRoles as role}
            <option value={role.id}>{role.name}</option>
          {/each}
        </select>

        <select
          bind:value={selectedStatus}
          class="select select-bordered w-full sm:w-auto bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
        >
          <option value="">{$_("users.all_statuses")}</option>
          {#each translatedUserStatuses as status}
            <option value={status.id}>{status.name}</option>
          {/each}
        </select>

        <select
          bind:value={selectedDepartment}
          class="select select-bordered w-full sm:w-auto bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
        >
          <option value="">{$_("users.all_departments")}</option>
          {#each departments as department}
            <option value={department}>{department}</option>
          {/each}
        </select>

        <button
          class="btn btn-ghost group hover:bg-base-200/80"
          on:click={clearFilters}
        >
          <div
            class="p-1 rounded bg-base-200 group-hover:bg-base-300 transition-colors duration-200"
          >
            <Icon icon="heroicons:x-mark" class="w-4 h-4 mr-2" />
          </div>
          {$_("common.clear_filters")}
        </button>
      </div>
    </div>
  </div>

  <!-- Enhanced Users table -->
  <div
    class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 backdrop-blur-sm"
    use:motionInView={{ animation: "fadeInUp", delay: 0.2 }}
  >
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-24 h-24 opacity-5">
      <Icon icon="heroicons:table-cells" class="w-full h-full text-secondary" />
    </div>

    <div class="relative overflow-x-auto">
      <table class="min-w-full divide-y divide-base-300/50">
        <thead class="bg-base-200/50">
          <tr>
            {#each translatedUserColumns as column}
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-medium text-base-content/60 uppercase tracking-wider cursor-pointer hover:bg-base-300/50 transition-colors duration-200"
                class:cursor-pointer={column.sortable}
                on:click={() => column.sortable && handleSort(column.key)}
              >
                <div class="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {#if column.sortable && sortBy === column.key}
                    <Icon
                      icon={sortDirection === "asc"
                        ? "heroicons:chevron-up"
                        : "heroicons:chevron-down"}
                      class="h-4 w-4"
                    />
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="bg-base-100 divide-y divide-base-300/50">
          {#each filteredUsers as user, index}
            <tr
              bind:this={userRowElements[index]}
              class="hover:bg-base-200/50 transition-all duration-200 group"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 relative">
                    <img
                      src={generateUserAvatar(user.name)}
                      alt={user.name}
                      class="h-10 w-10 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      on:error={(e) =>
                        (e.target.src = generateFallbackAvatar(user.name))}
                    />
                    <!-- Online indicator -->
                    <div
                      class="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"
                    ></div>
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-base-content group-hover:text-primary transition-colors duration-200"
                    >
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-base-content">{user.email}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if getRoleInfo(user.role)}
                  <span
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm {getRoleInfo(
                      user.role,
                    ).color} border border-current/20"
                  >
                    {getRoleInfo(user.role).name}
                  </span>
                {/if}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-base-content/60"
              >
                {user.department}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if getStatusInfo(user.status)}
                  <span
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm {getStatusInfo(
                      user.status,
                    ).color} border border-current/20"
                  >
                    {getStatusInfo(user.status).name}
                  </span>
                {/if}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-base-content/60"
              >
                {formatLastActive(user.lastActive)}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-base-content/60"
              >
                {formatDate(user.joinDate)}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center space-x-3 justify-end">
                  <button
                    class="text-primary hover:text-primary-focus group"
                    on:click={() => handleEditUser(user)}
                  >
                    <div
                      class="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200"
                    >
                      <Icon icon="heroicons:pencil-square" class="h-5 w-5" />
                    </div>
                  </button>
                  <button
                    class="text-error hover:text-error-focus group"
                    on:click={() => handleDeleteUser(user)}
                  >
                    <div
                      class="p-1.5 rounded-lg bg-error/10 group-hover:bg-error/20 transition-colors duration-200"
                    >
                      <Icon icon="heroicons:trash" class="h-5 w-5" />
                    </div>
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
    title={$_("users.delete_user")}
    message={$_("users.delete_user_confirm", {
      values: { name: userToDelete?.name },
    })}
    onConfirm={handleDeleteConfirm}
    onCancel={handleDeleteCancel}
  />
{/if}
