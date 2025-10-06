<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";

  let contacts = [];
  let searchQuery = "";
  let selectedCategory = "all";
  let showAddModal = false;

  const categories = ["family", "friends", "professional", "neighbors", "other"];

  let newContact = {
    name: "",
    phone: "",
    email: "",
    address: "",
    category: "family",
    notes: "",
    relationship: "",
    avatar: "",
  };

  $: filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery) || contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  async function loadContacts() {
    try {
      contacts = await db.contacts.toArray();
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  }

  async function saveContact() {
    try {
      if (newContact.name && newContact.phone) {
        await db.contacts.add({
          ...newContact,
          id: Date.now(),
          createdAt: new Date(),
          avatar: newContact.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(newContact.name)}&background=random`,
        });
        await loadContacts();
        resetForm();
        showAddModal = false;
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  }

  async function deleteContact(id) {
    try {
      await db.contacts.delete(id);
      await loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  function resetForm() {
    newContact = {
      name: "",
      phone: "",
      email: "",
      address: "",
      category: "family",
      notes: "",
      relationship: "",
      avatar: "",
    };
  }

  function getCategoryIcon(category) {
    const icons = {
      family: "heroicons:heart",
      friends: "heroicons:user-group",
      professional: "heroicons:briefcase",
      neighbors: "heroicons:home",
      other: "heroicons:user",
    };
    return icons[category] || "heroicons:user";
  }

  function getCategoryColor(category) {
    const colors = {
      family: "text-red-500",
      friends: "text-blue-500",
      professional: "text-purple-500",
      neighbors: "text-green-500",
      other: "text-gray-500",
    };
    return colors[category] || "text-gray-500";
  }

  onMount(() => {
    document.title = "Personal Contacts - Family App";
    loadContacts();
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">
            <Icon icon="heroicons:phone" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Personal Contacts</h1>
            <p class="text-gray-600 dark:text-gray-300">Manage your family and personal contacts</p>
          </div>
        </div>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg" on:click={() => (showAddModal = true)}>
          <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
          Add Contact
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Contacts</label>
        <input type="text" bind:value={searchQuery} placeholder="Search by name, phone, or email..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
        <select bind:value={selectedCategory} class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Contacts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredContacts as contact (contact.id)}
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <img src={contact.avatar} alt={contact.name} class="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                {#if contact.relationship}
                  <p class="text-sm text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                {/if}
              </div>
            </div>
            <div class="flex items-center space-x-1">
              <Icon icon={getCategoryIcon(contact.category)} class="w-4 h-4 {getCategoryColor(contact.category)}" />
              <button class="text-red-500 hover:text-red-600 p-1" on:click={() => deleteContact(contact.id)}>
                <Icon icon="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="space-y-2">
            {#if contact.phone}
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:phone" class="w-4 h-4 text-green-500" />
                <a href="tel:{contact.phone}" class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500">{contact.phone}</a>
              </div>
            {/if}
            {#if contact.email}
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:envelope" class="w-4 h-4 text-blue-500" />
                <a href="mailto:{contact.email}" class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500">{contact.email}</a>
              </div>
            {/if}
            {#if contact.address}
              <div class="flex items-center space-x-2">
                <Icon icon="heroicons:map-pin" class="w-4 h-4 text-red-500" />
                <span class="text-sm text-gray-600 dark:text-gray-300">{contact.address}</span>
              </div>
            {/if}
            {#if contact.notes}
              <div class="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p class="text-sm text-gray-600 dark:text-gray-300">{contact.notes}</p>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    {#if filteredContacts.length === 0}
      <div class="text-center py-12">
        <Icon icon="heroicons:user-group" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No contacts found</h3>
        <p class="text-gray-400 dark:text-gray-500">Add your first contact to get started</p>
      </div>
    {/if}
  </div>
</div>

<!-- Add Contact Modal -->
{#if showAddModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Add New Contact</h2>
          <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" on:click={() => (showAddModal = false)}>
            <Icon icon="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form on:submit|preventDefault={saveContact} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input type="text" bind:value={newContact.name} placeholder="Enter full name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
              <input type="tel" bind:value={newContact.phone} placeholder="+91-98765-43210" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select bind:value={newContact.category} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                {#each categories as category}
                  <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                {/each}
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" bind:value={newContact.email} placeholder="contact@example.com" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Relationship</label>
              <input type="text" bind:value={newContact.relationship} placeholder="e.g., Brother, Neighbor, Doctor" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
              <textarea bind:value={newContact.address} placeholder="Enter address" rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
              <textarea bind:value={newContact.notes} placeholder="Any additional notes..." rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" on:click={() => (showAddModal = false)}> Cancel </button>
            <button type="submit" class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"> Add Contact </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
