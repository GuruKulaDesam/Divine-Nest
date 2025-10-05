<script>
  import { onMount } from "svelte";
  import { getEmergencyContacts, addEmergencyContact, updateEmergencyContact, deleteEmergencyContact } from "$lib/data/home.js";

  let emergencyContacts = [];
  let showAddForm = false;
  let filterType = "all";
  let searchTerm = "";

  // Form data
  let newContact = {
    name: "",
    type: "medical",
    phone: "",
    alternatePhone: "",
    address: "",
    notes: "",
    isPrimary: false,
  };

  const contactTypes = [
    { value: "medical", label: "Medical", icon: "🏥", color: "bg-red-100 text-red-800" },
    { value: "police", label: "Police", icon: "🚔", color: "bg-blue-100 text-blue-800" },
    { value: "fire", label: "Fire", icon: "🚒", color: "bg-orange-100 text-orange-800" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦", color: "bg-green-100 text-green-800" },
    { value: "neighbor", label: "Neighbor", icon: "🏘️", color: "bg-purple-100 text-purple-800" },
    { value: "electrician", label: "Electrician", icon: "⚡", color: "bg-yellow-100 text-yellow-800" },
    { value: "plumber", label: "Plumber", icon: "🔧", color: "bg-cyan-100 text-cyan-800" },
  ];

  onMount(async () => {
    await loadEmergencyContacts();
  });

  async function loadEmergencyContacts() {
    emergencyContacts = await getEmergencyContacts();
  }

  async function handleAddContact() {
    if (!newContact.name.trim() || !newContact.phone.trim()) return;

    const contact = {
      ...newContact,
      id: Date.now().toString(),
    };

    await addEmergencyContact(contact);
    await loadEmergencyContacts();

    // Reset form
    newContact = {
      name: "",
      type: "medical",
      phone: "",
      alternatePhone: "",
      address: "",
      notes: "",
      isPrimary: false,
    };
    showAddForm = false;
  }

  async function togglePrimary(contact) {
    // If setting as primary, unset other primaries of same type
    if (!contact.isPrimary) {
      const sameTypeContacts = emergencyContacts.filter((c) => c.type === contact.type && c.id !== contact.id);
      for (const c of sameTypeContacts) {
        if (c.isPrimary) {
          await updateEmergencyContact(c.id, { isPrimary: false });
        }
      }
    }

    await updateEmergencyContact(contact.id, { isPrimary: !contact.isPrimary });
    await loadEmergencyContacts();
  }

  async function removeContact(contact) {
    if (confirm(`Remove emergency contact "${contact.name}"?`)) {
      await deleteEmergencyContact(contact.id);
      await loadEmergencyContacts();
    }
  }

  function callNumber(phoneNumber) {
    if (confirm(`Call ${phoneNumber}?`)) {
      window.open(`tel:${phoneNumber}`, "_self");
    }
  }

  $: filteredContacts = emergencyContacts.filter((contact) => {
    const matchesType = filterType === "all" || contact.type === filterType;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm) || contact.notes.toLowerCase().includes(searchTerm);
    return matchesType && matchesSearch;
  });

  $: primaryContacts = filteredContacts.filter((contact) => contact.isPrimary);
  $: emergencyTypes = ["medical", "police", "fire"];
  $: emergencyContactsFiltered = filteredContacts.filter((contact) => emergencyTypes.includes(contact.type));
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div>
      <h2 class="text-2xl font-bold text-gray-800">🚨 Emergency Services & Contacts</h2>
      <p class="text-gray-600">Quick access to emergency contacts and medical information</p>
    </div>

    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2" on:click={() => (showAddForm = !showAddForm)}>
      <span>+</span>
      Add Contact
    </button>
  </div>

  <!-- Emergency Quick Dial -->
  <div class="bg-red-50 border border-red-200 rounded-lg p-4">
    <h3 class="font-semibold text-red-800 mb-4 flex items-center gap-2">
      <span>🚨</span>
      Emergency Quick Dial
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each emergencyContactsFiltered.filter((c) => c.isPrimary) as contact}
        <button class="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2" on:click={() => callNumber(contact.phone)}>
          <span class="text-2xl">{contactTypes.find((t) => t.value === contact.type)?.icon}</span>
          <span class="font-semibold">{contact.name}</span>
          <span class="text-sm opacity-90">{contact.phone}</span>
        </button>
      {/each}

      {#if emergencyContactsFiltered.filter((c) => c.isPrimary).length === 0}
        <div class="col-span-3 text-center text-red-600 py-4">No primary emergency contacts set. Add contacts below and mark them as primary.</div>
      {/if}
    </div>
  </div>

  <!-- Search and Filter -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <input type="text" placeholder="Search contacts..." bind:value={searchTerm} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
    </div>

    <select bind:value={filterType} class="px-4 py-2 border border-gray-300 rounded-lg">
      <option value="all">All Types</option>
      {#each contactTypes as type}
        <option value={type.value}>{type.icon} {type.label}</option>
      {/each}
    </select>
  </div>

  <!-- Add Contact Form -->
  {#if showAddForm}
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h3 class="font-semibold text-orange-800 mb-3">Add Emergency Contact</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Contact name" bind:value={newContact.name} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <select bind:value={newContact.type} class="px-3 py-2 border border-gray-300 rounded-lg">
          {#each contactTypes as type}
            <option value={type.value}>{type.icon} {type.label}</option>
          {/each}
        </select>

        <input type="tel" placeholder="Phone number" bind:value={newContact.phone} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <input type="tel" placeholder="Alternate phone (optional)" bind:value={newContact.alternatePhone} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <input type="text" placeholder="Address" bind:value={newContact.address} class="px-3 py-2 border border-gray-300 rounded-lg" />

        <div class="flex items-center gap-2">
          <input type="checkbox" id="isPrimary" bind:checked={newContact.isPrimary} class="rounded" />
          <label for="isPrimary" class="text-sm">Set as primary contact for this type</label>
        </div>

        <textarea placeholder="Additional notes" bind:value={newContact.notes} rows="2" class="px-3 py-2 border border-gray-300 rounded-lg md:col-span-2"></textarea>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={handleAddContact}> Add Contact </button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200" on:click={() => (showAddForm = false)}> Cancel </button>
      </div>
    </div>
  {/if}

  <!-- Primary Contacts -->
  {#if primaryContacts.length > 0}
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 class="font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <span>⭐</span>
        Primary Contacts
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each primaryContacts as contact}
          <div class="bg-white border border-blue-200 rounded-lg p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{contactTypes.find((t) => t.value === contact.type)?.icon}</span>
                <div>
                  <h4 class="font-semibold text-gray-800">{contact.name}</h4>
                  <span class="px-2 py-1 rounded-full text-xs font-medium {contactTypes.find((t) => t.value === contact.type)?.color}">
                    {contactTypes.find((t) => t.value === contact.type)?.label}
                  </span>
                </div>
              </div>

              <div class="flex gap-1">
                <button class="text-blue-500 hover:text-blue-700 p-1" on:click={() => callNumber(contact.phone)} title="Call primary number"> 📞 </button>
                {#if contact.alternatePhone}
                  <button class="text-blue-500 hover:text-blue-700 p-1" on:click={() => callNumber(contact.alternatePhone)} title="Call alternate number"> 📱 </button>
                {/if}
              </div>
            </div>

            <div class="space-y-2 text-sm">
              <div><span class="font-medium">Phone:</span> {contact.phone}</div>
              {#if contact.alternatePhone}
                <div><span class="font-medium">Alternate:</span> {contact.alternatePhone}</div>
              {/if}
              {#if contact.address}
                <div><span class="font-medium">Address:</span> {contact.address}</div>
              {/if}
              {#if contact.notes}
                <div><span class="font-medium">Notes:</span> {contact.notes}</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- All Contacts -->
  <div>
    <h3 class="font-semibold text-gray-800 mb-4">All Emergency Contacts</h3>

    {#if filteredContacts.length === 0}
      <div class="text-center py-12 text-gray-500">
        <div class="text-4xl mb-4">📞</div>
        <p class="text-lg">No emergency contacts found</p>
        <p class="text-sm">Add your first emergency contact to get started!</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each filteredContacts as contact}
          <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{contactTypes.find((t) => t.value === contact.type)?.icon}</span>
                <div>
                  <h4 class="font-semibold text-gray-800">{contact.name}</h4>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 rounded-full text-xs font-medium {contactTypes.find((t) => t.value === contact.type)?.color}">
                      {contactTypes.find((t) => t.value === contact.type)?.label}
                    </span>
                    {#if contact.isPrimary}
                      <span class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"> ⭐ Primary </span>
                    {/if}
                  </div>
                </div>
              </div>

              <div class="flex gap-1">
                <button class="text-green-500 hover:text-green-700 p-1" on:click={() => togglePrimary(contact)} title={contact.isPrimary ? "Remove as primary" : "Set as primary"}>
                  {contact.isPrimary ? "⭐" : "☆"}
                </button>
                <button class="text-blue-500 hover:text-blue-700 p-1" on:click={() => callNumber(contact.phone)} title="Call"> 📞 </button>
                <button class="text-red-500 hover:text-red-700 p-1" on:click={() => removeContact(contact)}> 🗑️ </button>
              </div>
            </div>

            <div class="space-y-2 text-sm">
              <div><span class="font-medium">Phone:</span> {contact.phone}</div>
              {#if contact.alternatePhone}
                <div><span class="font-medium">Alternate:</span> {contact.alternatePhone}</div>
              {/if}
              {#if contact.address}
                <div><span class="font-medium">Address:</span> {contact.address}</div>
              {/if}
              {#if contact.notes}
                <div><span class="font-medium">Notes:</span> {contact.notes}</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
