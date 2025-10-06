<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../data/database.js";
  import { currentRoute } from "../router.js";

  let contacts = [];
  let searchQuery = "";
  let selectedCategory = "all";
  let showAddModal = false;
  let showImportModal = false;
  let importSource = "phone"; // phone, google, csv
  let importProgress = 0;
  let isImporting = false;

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

    // Route-based filtering
    let matchesRoute = true;
    if ($currentRoute === "/vendors") {
      matchesRoute = contact.category === "professional";
    } else if ($currentRoute === "/directory") {
      matchesRoute = contact.category === "professional" || contact.category === "neighbors";
    }
    // For /contacts, show all contacts

    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory;
    console.log("Filtering contact:", contact.name, "category:", contact.category, "route:", $currentRoute, "matchesRoute:", matchesRoute, "matchesCategory:", matchesCategory);
    return matchesSearch && matchesRoute && matchesCategory;
  });

  async function loadContacts() {
    try {
      contacts = await db.contacts.toArray();
      console.log("Loaded contacts:", contacts.length);

      // If no contacts exist, populate with local service providers
      if (contacts.length === 0) {
        console.log("No contacts found, populating with local contacts...");
        await populateLocalContacts();
        contacts = await db.contacts.toArray();
        console.log("After population, contacts count:", contacts.length);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  }
  async function populateLocalContacts() {
    const localServiceContacts = [
      { name: "Suresh Electricals", phone: "+91-422-2468140", email: "suresh.electricals@gmail.com", address: "Kovaipudur Main Road", category: "professional", relationship: "Electrician", notes: "Reliable electrical services, available 24/7 for emergencies" },
      { name: "Ravi Plumbing", phone: "+91-422-2468141", email: "ravi.plumbing@gmail.com", address: "Peelamedu Extension", category: "professional", relationship: "Plumber", notes: "Expert plumbing services for all household needs" },
      { name: "Dr. Meena Dental", phone: "+91-422-2468137", email: "meena.dental@gmail.com", address: "Kovaipudur Main Road", category: "professional", relationship: "Dentist", notes: "Family dental care, root canal specialist" },
      { name: "City Pharmacy", phone: "+91-422-2468138", email: "city.pharma@gmail.com", address: "Near Kovaipudur Bus Stand", category: "professional", relationship: "Pharmacy", notes: "24/7 pharmacy, home delivery available" },
      { name: "Anand Grocery", phone: "+91-422-2468147", email: "anand.grocery@gmail.com", address: "Kovaipudur Main Road", category: "professional", relationship: "Grocery Store", notes: "Fresh vegetables, daily essentials, home delivery" },
      { name: "Priya Tuition Center", phone: "+91-422-2468146", email: "priya.tuition@gmail.com", address: "Kovaipudur", category: "professional", relationship: "Maths Tuition", notes: "Classes for grades 1-12, experienced teachers" },
      { name: "Kovaipudur Police Station", phone: "100", email: "kovai.police@tn.gov.in", address: "Kovaipudur Police Station", category: "professional", relationship: "Police Emergency", notes: "Local police station for Kovaipudur area" },
      { name: "Sri Krishna Bakery", phone: "+91-422-2468148", email: "sri.krishna.bakery@gmail.com", address: "Near Kovaipudur Temple", category: "professional", relationship: "Bakery", notes: "Fresh breads, cakes, and traditional sweets" },
      { name: "Kumar AC Service", phone: "+91-422-2468142", email: "kumar.ac@gmail.com", address: "Kovaipudur", category: "professional", relationship: "AC Technician", notes: "AC repair, installation, and maintenance services" },
      { name: "Lakshmi House Cleaning", phone: "+91-422-2468144", email: "lakshmi.cleaning@gmail.com", address: "Kovaipudur Area", category: "professional", relationship: "House Cleaning", notes: "Professional cleaning services, deep cleaning available" },
      { name: "Vijay Electronics", phone: "+91-422-2468143", email: "vijay.electronics@gmail.com", address: "Kovaipudur Market", category: "professional", relationship: "Electronics Repair", notes: "TV, fridge, washing machine repair services" },
      { name: "Ram Garden Services", phone: "+91-422-2468145", email: "ram.garden@gmail.com", address: "Coimbatore Rural", category: "professional", relationship: "Gardener", notes: "Garden maintenance, lawn mowing, plant care" },
    ];

    for (const contact of localServiceContacts) {
      await db.contacts.add({
        ...contact,
        id: Date.now() + Math.random(),
        createdAt: new Date(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`,
      });
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

  async function importContacts() {
    isImporting = true;
    importProgress = 0;

    try {
      if (importSource === "phone") {
        await importFromPhoneContacts();
      } else if (importSource === "google") {
        await importFromGoogleContacts();
      } else if (importSource === "csv") {
        await importFromCSV();
      }
    } catch (error) {
      console.error("Error importing contacts:", error);
      alert("Error importing contacts. Please try again.");
    } finally {
      isImporting = false;
      importProgress = 0;
      showImportModal = false;
    }
  }

  async function importFromPhoneContacts() {
    // Simulate phone contact import (in real app, would use Contacts API)
    const sampleContacts = [
      { name: "Rajesh Kumar", phone: "+91-98765-43210", category: "professional", relationship: "Family Doctor" },
      { name: "Priya Sharma", phone: "+91-87654-32109", category: "friends", relationship: "School Friend" },
      { name: "Suresh Electricals", phone: "+91-422-2468135", category: "professional", relationship: "Electrician" },
      { name: "Lakshmi Store", phone: "+91-422-2468136", category: "professional", relationship: "Grocery Store" },
      { name: "Dr. Meena Dental", phone: "+91-422-2468137", category: "professional", relationship: "Dentist" },
    ];

    for (let i = 0; i < sampleContacts.length; i++) {
      const contact = sampleContacts[i];
      await db.contacts.add({
        ...contact,
        id: Date.now() + i,
        createdAt: new Date(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`,
      });
      importProgress = ((i + 1) / sampleContacts.length) * 100;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    }

    await loadContacts();
  }

  async function importFromGoogleContacts() {
    // Simulate Google contacts import
    alert("Google Contacts import would require OAuth authentication. This is a demo implementation.");
    const sampleContacts = [
      { name: "Arun Kumar", phone: "+91-95555-12345", email: "arun.kumar@email.com", category: "friends" },
      { name: "Kavita Patel", phone: "+91-94444-67890", email: "kavita.patel@email.com", category: "professional" },
      { name: "Ravi Electronics", phone: "+91-422-2468138", email: "ravi.electronics@gmail.com", category: "professional", relationship: "Electronics Repair" },
    ];

    for (let i = 0; i < sampleContacts.length; i++) {
      const contact = sampleContacts[i];
      await db.contacts.add({
        ...contact,
        id: Date.now() + i,
        createdAt: new Date(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`,
      });
      importProgress = ((i + 1) / sampleContacts.length) * 100;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await loadContacts();
  }

  async function importFromCSV() {
    // Create a file input for CSV upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        const rows = text.split("\n").filter((row) => row.trim());
        const headers = rows[0].split(",").map((h) => h.trim().toLowerCase());

        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(",").map((v) => v.trim());
          if (values.length >= 2) {
            const contact = {
              name: values[0] || "",
              phone: values[1] || "",
              email: values[2] || "",
              category: "other",
              id: Date.now() + i,
              createdAt: new Date(),
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values[0])}&background=random`,
            };
            await db.contacts.add(contact);
          }
          importProgress = (i / (rows.length - 1)) * 100;
        }
        await loadContacts();
      }
    };
    input.click();
  }

  async function checkDatabase() {
    try {
      const allContacts = await db.contacts.toArray();
      console.log("All contacts in database:", allContacts);
      alert(`Database contains ${allContacts.length} contacts. Check console for details.`);
      await loadContacts(); // Refresh the display
    } catch (error) {
      console.error("Error checking database:", error);
      alert("Error checking database: " + error.message);
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

  $: pageTitle = $currentRoute === "/vendors" ? "Local Vendors" : $currentRoute === "/directory" ? "Local Directory" : "Personal Contacts";

  $: pageDescription = $currentRoute === "/vendors" ? "Find local service providers and businesses" : $currentRoute === "/directory" ? "Browse local contacts and services" : "Manage your family and personal contacts";

  onMount(() => {
    document.title = pageTitle + " - Family App";
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
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
            <p class="text-gray-600 dark:text-gray-300">{pageDescription}</p>
          </div>
        </div>
        <div class="flex gap-3">
          <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg" on:click={() => (showImportModal = true)}>
            <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5 inline mr-2" />
            Import Contacts
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg" on:click={() => (showAddModal = true)}>
            <Icon icon="heroicons:plus" class="w-5 h-5 inline mr-2" />
            Add Contact
          </button>
          <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm text-sm" on:click={checkDatabase}>
            <Icon icon="heroicons:eye" class="w-4 h-4 inline mr-1" />
            Check DB
          </button>
        </div>
      </div>
    </div>

    <!-- Import Contacts Modal -->
    {#if showImportModal}
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Import Contacts</h2>
              <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" on:click={() => (showImportModal = false)}>
                <Icon icon="heroicons:x-mark" class="w-6 h-6" />
              </button>
            </div>

            {#if isImporting}
              <div class="text-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p class="text-gray-600 dark:text-gray-300 mb-2">Importing contacts...</p>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="width: {importProgress}%"></div>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{Math.round(importProgress)}% complete</p>
              </div>
            {:else}
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Import Source</label>
                  <div class="space-y-2">
                    <label class="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input type="radio" bind:group={importSource} value="phone" class="mr-3" />
                      <div class="flex items-center space-x-3">
                        <Icon icon="heroicons:device-phone-mobile" class="w-5 h-5 text-blue-500" />
                        <div>
                          <div class="font-medium text-gray-900 dark:text-white">Phone Contacts</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">Import from your phone's contact list</div>
                        </div>
                      </div>
                    </label>

                    <label class="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input type="radio" bind:group={importSource} value="google" class="mr-3" />
                      <div class="flex items-center space-x-3">
                        <Icon icon="logos:google-icon" class="w-5 h-5" />
                        <div>
                          <div class="font-medium text-gray-900 dark:text-white">Google Contacts</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">Import from your Google account</div>
                        </div>
                      </div>
                    </label>

                    <label class="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input type="radio" bind:group={importSource} value="csv" class="mr-3" />
                      <div class="flex items-center space-x-3">
                        <Icon icon="heroicons:document-text" class="w-5 h-5 text-green-500" />
                        <div>
                          <div class="font-medium text-gray-900 dark:text-white">CSV File</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">Upload a CSV file with contact data</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="flex gap-3 pt-4">
                  <button type="button" class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" on:click={() => (showImportModal = false)}> Cancel </button>
                  <button type="button" class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" on:click={importContacts}> Import </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
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
