<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Reactive data
  let members = writable([
    {
      id: 1,
      name: 'John Doe',
      tamilName: 'ஜான் டோ',
      relationship: 'Father',
      age: 45,
      phone: '+91-98765-43210',
      email: 'john@example.com',
      address: '123 Main Street, City',
      occupation: 'Engineer',
      bloodGroup: 'O+',
      emergencyContact: '+91-98765-43211',
      status: 'active',
      joinDate: '2023-01-15',
      notes: 'Family head'
    },
    {
      id: 2,
      name: 'Jane Doe',
      tamilName: 'ஜேன் டோ',
      relationship: 'Mother',
      age: 42,
      phone: '+91-98765-43212',
      email: 'jane@example.com',
      address: '123 Main Street, City',
      occupation: 'Teacher',
      bloodGroup: 'A+',
      emergencyContact: '+91-98765-43213',
      status: 'active',
      joinDate: '2023-01-15',
      notes: 'Homemaker'
    }
  ]);

  let filteredMembers = writable([]);
  let searchQuery = '';
  let selectedStatus = 'all';
  let selectedRelationship = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let editingMember = null;

  // Form data
  let newMember = {
    name: '',
    tamilName: '',
    relationship: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    occupation: '',
    bloodGroup: '',
    emergencyContact: '',
    status: 'active',
    notes: ''
  };

  // Categories and options
  const relationships = [
    'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister',
    'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Cousin', 'Other'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const statuses = [
    { id: 'active', name: 'Active', color: 'text-green-600 bg-green-100' },
    { id: 'inactive', name: 'Inactive', color: 'text-gray-600 bg-gray-100' },
    { id: 'pending', name: 'Pending', color: 'text-yellow-600 bg-yellow-100' }
  ];

  // Reactive filtering
  $: {
    $filteredMembers = $members.filter(member => {
      const matchesSearch = !searchQuery ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.tamilName.includes(searchQuery) ||
        member.phone.includes(searchQuery) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
      const matchesRelationship = selectedRelationship === 'all' || member.relationship === selectedRelationship;

      return matchesSearch && matchesStatus && matchesRelationship;
    });
  }

  // Statistics
  $: totalMembers = $members.length;
  $: activeMembers = $members.filter(m => m.status === 'active').length;
  $: inactiveMembers = $members.filter(m => m.status === 'inactive').length;
  $: pendingMembers = $members.filter(m => m.status === 'pending').length;

  function addMember() {
    if (!newMember.name.trim()) return;

    const member = {
      ...newMember,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0]
    };

    members.update(m => [...m, member]);

    // Reset form
    newMember = {
      name: '',
      tamilName: '',
      relationship: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      occupation: '',
      bloodGroup: '',
      emergencyContact: '',
      status: 'active',
      notes: ''
    };

    showAddModal = false;
  }

  function editMember(member) {
    editingMember = { ...member };
    showEditModal = true;
  }

  function updateMember() {
    if (!editingMember.name.trim()) return;

    members.update(m => m.map(member =>
      member.id === editingMember.id ? editingMember : member
    ));

    showEditModal = false;
    editingMember = null;
  }

  function deleteMember(id) {
    if (confirm('Are you sure you want to delete this member?')) {
      members.update(m => m.filter(member => member.id !== id));
    }
  }

  function getStatusColor(status) {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'text-gray-600 bg-gray-100';
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Members Management</h1>
      <p class="text-base-content/70 mt-1">Manage family and community members</p>
    </div>
    <button
      on:click={() => showAddModal = true}
      class="btn btn-primary gap-2"
    >
      <Icon icon="mdi:account-plus" class="w-5 h-5" />
      Add Member
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Total Members</p>
            <p class="text-2xl font-bold">{totalMembers}</p>
          </div>
          <Icon icon="mdi:account-group" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">Active</p>
            <p class="text-2xl font-bold">{activeMembers}</p>
          </div>
          <Icon icon="mdi:account-check" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-100 text-sm">Inactive</p>
            <p class="text-2xl font-bold">{inactiveMembers}</p>
          </div>
          <Icon icon="mdi:account-off" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>

    <div class="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-100 text-sm">Pending</p>
            <p class="text-2xl font-bold">{pendingMembers}</p>
          </div>
          <Icon icon="mdi:account-clock" class="w-8 h-8 opacity-80" />
        </div>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Search Members</span>
          </label>
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Name, phone, email..."
            class="input input-bordered w-full"
          />
        </div>

        <!-- Status Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select bind:value={selectedStatus} class="select select-bordered w-full">
            <option value="all">All Status</option>
            {#each statuses as status}
              <option value={status.id}>{status.name}</option>
            {/each}
          </select>
        </div>

        <!-- Relationship Filter -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Relationship</span>
          </label>
          <select bind:value={selectedRelationship} class="select select-bordered w-full">
            <option value="all">All Relationships</option>
            {#each relationships as relationship}
              <option value={relationship}>{relationship}</option>
            {/each}
          </select>
        </div>

        <!-- Clear Filters -->
        <div class="form-control">
          <label class="label">
            <span class="label-text opacity-0">Actions</span>
          </label>
          <button
            on:click={() => {
              searchQuery = '';
              selectedStatus = 'all';
              selectedRelationship = 'all';
            }}
            class="btn btn-outline btn-block"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Members List -->
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body p-0">
      {#if $filteredMembers.length === 0}
        <div class="text-center py-12">
          <Icon icon="mdi:account-group-off" class="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-base-content/70">No members found</h3>
          <p class="text-base-content/50 mt-1">Try adjusting your search or filters</p>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Relationship</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each $filteredMembers as member}
                <tr>
                  <td>
                    <div>
                      <div class="font-semibold">{member.name}</div>
                      {#if member.tamilName}
                        <div class="text-sm text-base-content/60">{member.tamilName}</div>
                      {/if}
                      {#if member.age}
                        <div class="text-xs text-base-content/50">Age: {member.age}</div>
                      {/if}
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-outline">{member.relationship}</span>
                  </td>
                  <td>
                    <div class="text-sm">
                      {#if member.phone}
                        <div class="flex items-center gap-1">
                          <Icon icon="mdi:phone" class="w-4 h-4" />
                          {member.phone}
                        </div>
                      {/if}
                      {#if member.email}
                        <div class="flex items-center gap-1 mt-1">
                          <Icon icon="mdi:email" class="w-4 h-4" />
                          <span class="truncate max-w-32">{member.email}</span>
                        </div>
                      {/if}
                    </div>
                  </td>
                  <td>
                    <span class="badge {getStatusColor(member.status)}">
                      {statuses.find(s => s.id === member.status)?.name}
                    </span>
                  </td>
                  <td>{formatDate(member.joinDate)}</td>
                  <td>
                    <div class="dropdown dropdown-left">
                      <button class="btn btn-ghost btn-sm">
                        <Icon icon="mdi:dots-vertical" class="w-4 h-4" />
                      </button>
                      <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a on:click={() => editMember(member)}>Edit</a></li>
                        <li><a class="text-error" on:click={() => deleteMember(member.id)}>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Add Member Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-xl font-bold">Add New Member</h3>
        <button
          on:click={() => showAddModal = false}
          class="btn btn-ghost btn-sm btn-circle"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <form on:submit|preventDefault={addMember} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Full Name *</span>
              </label>
              <input
                type="text"
                bind:value={newMember.name}
                placeholder="Enter full name"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input
                type="text"
                bind:value={newMember.tamilName}
                placeholder="தமிழ் பெயர்"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Relationship</span>
              </label>
              <select bind:value={newMember.relationship} class="select select-bordered w-full">
                <option value="">Select relationship</option>
                {#each relationships as relationship}
                  <option value={relationship}>{relationship}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Age</span>
              </label>
              <input
                type="number"
                bind:value={newMember.age}
                placeholder="Age in years"
                class="input input-bordered w-full"
                min="1"
                max="120"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                bind:value={newMember.phone}
                placeholder="+91-98765-43210"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                bind:value={newMember.email}
                placeholder="member@example.com"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Address</span>
            </label>
            <textarea
              bind:value={newMember.address}
              placeholder="Enter address"
              rows="2"
              class="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Occupation</span>
              </label>
              <input
                type="text"
                bind:value={newMember.occupation}
                placeholder="Job title or occupation"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Blood Group</span>
              </label>
              <select bind:value={newMember.bloodGroup} class="select select-bordered w-full">
                <option value="">Select blood group</option>
                {#each bloodGroups as group}
                  <option value={group}>{group}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Emergency Contact</span>
              </label>
              <input
                type="tel"
                bind:value={newMember.emergencyContact}
                placeholder="+91-98765-43211"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select bind:value={newMember.status} class="select select-bordered w-full">
                {#each statuses as status}
                  <option value={status.id}>{status.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={newMember.notes}
              placeholder="Additional notes or information"
              rows="3"
              class="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              on:click={() => showAddModal = false}
              class="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<!-- Edit Member Modal -->
{#if showEditModal && editingMember}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-xl font-bold">Edit Member</h3>
        <button
          on:click={() => {
            showEditModal = false;
            editingMember = null;
          }}
          class="btn btn-ghost btn-sm btn-circle"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <form on:submit|preventDefault={updateMember} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Full Name *</span>
              </label>
              <input
                type="text"
                bind:value={editingMember.name}
                placeholder="Enter full name"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tamil Name</span>
              </label>
              <input
                type="text"
                bind:value={editingMember.tamilName}
                placeholder="தமிழ் பெயர்"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Relationship</span>
              </label>
              <select bind:value={editingMember.relationship} class="select select-bordered w-full">
                <option value="">Select relationship</option>
                {#each relationships as relationship}
                  <option value={relationship}>{relationship}</option>
                {/each}
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Age</span>
              </label>
              <input
                type="number"
                bind:value={editingMember.age}
                placeholder="Age in years"
                class="input input-bordered w-full"
                min="1"
                max="120"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                bind:value={editingMember.phone}
                placeholder="+91-98765-43210"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                bind:value={editingMember.email}
                placeholder="member@example.com"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Address</span>
            </label>
            <textarea
              bind:value={editingMember.address}
              placeholder="Enter address"
              rows="2"
              class="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Occupation</span>
              </label>
              <input
                type="text"
                bind:value={editingMember.occupation}
                placeholder="Job title or occupation"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Blood Group</span>
              </label>
              <select bind:value={editingMember.bloodGroup} class="select select-bordered w-full">
                <option value="">Select blood group</option>
                {#each bloodGroups as group}
                  <option value={group}>{group}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Emergency Contact</span>
              </label>
              <input
                type="tel"
                bind:value={editingMember.emergencyContact}
                placeholder="+91-98765-43211"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select bind:value={editingMember.status} class="select select-bordered w-full">
                {#each statuses as status}
                  <option value={status.id}>{status.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <textarea
              bind:value={editingMember.notes}
              placeholder="Additional notes or information"
              rows="3"
              class="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              on:click={() => {
                showEditModal = false;
                editingMember = null;
              }}
              class="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Update Member
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}