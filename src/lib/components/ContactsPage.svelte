<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  // Import contacts data
  import { db } from "../data/database.js";

  let activeSection = "overview";
  let selectedCategory = "all";
  let contacts = [];
  let searchQuery = "";

  // Calculate current section info
  $: currentSection = ContactsSections.find((s) => s.id === activeSection);

  // Handle URL-based section routing
  $: {
    const path = $page.url.pathname;
    if (path.startsWith("/contacts/")) {
      const section = path.split("/")[2];
      if (section && ContactsSections.find((s) => s.id === section)) {
        activeSection = section;
      }
    }
  }

  function switchSection(sectionId) {
    activeSection = sectionId;
    window.history.pushState({}, "", `/contacts/${sectionId}`);
  }

  function switchCategory(categoryId) {
    selectedCategory = categoryId;
  }

  // Contacts Sections for navigation
  const ContactsSections = [
    {
      id: "overview",
      name: "Contacts Overview",
      tamil: "தொடர்புகள் கண்ணோட்டம்",
      icon: "heroicons:phone",
      color: "green",
    },
    {
      id: "family",
      name: "Family Contacts",
      tamil: "குடும்ப தொடர்புகள்",
      icon: "heroicons:users",
      color: "blue",
    },
    {
      id: "professional",
      name: "Service Providers",
      tamil: "சேவை வழங்குநர்கள்",
      icon: "heroicons:wrench",
      color: "purple",
    },
    {
      id: "emergency",
      name: "Emergency Contacts",
      tamil: "அவசர தொடர்புகள்",
      icon: "heroicons:exclamation-triangle",
      color: "red",
    },
  ];

  // Contact Categories
  const ContactCategories = {
    all: { name: "All Contacts", tamil: "அனைத்து தொடர்புகளும்", count: 0 },
    family: { name: "Family", tamil: "குடும்பம்", count: 0 },
    friends: { name: "Friends", tamil: "நண்பர்கள்", count: 0 },
    professional: { name: "Professional", tamil: "தொழில்முறை", count: 0 },
    neighbors: { name: "Neighbors", tamil: "அண்டை வீட்டார்", count: 0 },
    other: { name: "Other", tamil: "மற்றவை", count: 0 },
  };

  $: filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery) || contact.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate stats
  $: {
    // Reset counts
    Object.keys(ContactCategories).forEach((key) => {
      ContactCategories[key].count = 0;
    });

    // Count contacts by category
    contacts.forEach((contact) => {
      if (ContactCategories[contact.category]) {
        ContactCategories[contact.category].count++;
      }
    });

    ContactCategories.all.count = contacts.length;
  }

  onMount(async () => {
    await loadContacts();
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
</script>

<!-- Contacts & Directory Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-green-100 p-3 rounded-lg">
            <Icon icon="heroicons:phone" class="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">��� Contacts & Directory</h1>
            <p class="text-lg text-gray-600">தொடர்புகள் & அடைவு</p>
            <p class="text-sm text-gray-500">Manage family contacts and local service providers</p>
          </div>
        </div>

        <!-- Category Selector -->
        <div class="flex space-x-2">
          {#each Object.entries(ContactCategories) as [categoryId, category]}
            <button on:click={() => switchCategory(categoryId)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedCategory === categoryId ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
              <Icon icon="heroicons:user-group" class="w-5 h-5" />
              <span class="font-medium">{category.name}</span>
              <span class="text-sm opacity-75">({category.count})</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Quick Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Total Contacts</p>
              <p class="text-2xl font-bold">{ContactCategories.all.count}</p>
              <p class="text-xs opacity-75">மொத்த தொடர்புகள்</p>
            </div>
            <Icon icon="heroicons:phone" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Family</p>
              <p class="text-2xl font-bold">{ContactCategories.family.count}</p>
              <p class="text-xs opacity-75">குடும்பம்</p>
            </div>
            <Icon icon="heroicons:users" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Services</p>
              <p class="text-2xl font-bold">{ContactCategories.professional.count}</p>
              <p class="text-xs opacity-75">சேவைகள்</p>
            </div>
            <Icon icon="heroicons:wrench" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Emergency</p>
              <p class="text-2xl font-bold">{contacts.filter((c) => c.category === "emergency").length}</p>
              <p class="text-xs opacity-75">அவசரம்</p>
            </div>
            <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon icon="heroicons:bars-3" class="w-5 h-5 mr-2" />
            Contact Sections
            <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span>
          </h3>

          <nav class="space-y-2">
            {#each ContactsSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : 'text-gray-600 hover:bg-gray-50'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{section.name}</p>
                  <p class="text-xs opacity-75 truncate">{section.tamil}</p>
                </div>
                {#if activeSection === section.id}
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                {/if}
              </button>
            {/each}
          </nav>

          <!-- Search Bar -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="relative">
              <Icon icon="heroicons:magnifying-glass" class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search contacts..." bind:value={searchQuery} class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-xl shadow-lg p-6">
          {#if activeSection === "overview"}
            <!-- Overview Dashboard -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-900">Contacts Overview</h2>
                <span class="text-sm text-gray-500">தொடர்புகள் கண்ணோட்டம்</span>
              </div>

              <!-- Recent Contacts -->
              {#if filteredContacts.length > 0}
                <div class="bg-green-50 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-green-900 mb-3">Recent Contacts</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each filteredContacts.slice(0, 6) as contact}
                      <div class="bg-white p-4 rounded-lg shadow-sm">
                        <div class="flex items-center space-x-3 mb-2">
                          <img src={contact.avatar} alt={contact.name} class="w-10 h-10 rounded-full" />
                          <div class="flex-1">
                            <h4 class="font-semibold text-gray-900">{contact.name}</h4>
                            <p class="text-sm text-gray-600">{contact.relationship || contact.category}</p>
                          </div>
                        </div>
                        <div class="text-sm text-gray-600">
                          <p>��� {contact.phone}</p>
                          {#if contact.email}
                            <p>✉️ {contact.email}</p>
                          {/if}
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}

              <!-- Emergency Contacts -->
              <div class="bg-red-50 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-red-900 mb-3">Emergency Contacts</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {#each contacts.filter((c) => c.category === "emergency" || c.relationship?.toLowerCase().includes("police") || c.relationship?.toLowerCase().includes("hospital")) as contact}
                    <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                      <div class="flex items-center space-x-3 mb-2">
                        <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600" />
                        <div>
                          <h4 class="font-semibold text-gray-900">{contact.name}</h4>
                          <p class="text-sm text-gray-600">{contact.relationship}</p>
                        </div>
                      </div>
                      <p class="text-lg font-bold text-red-600">{contact.phone}</p>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {:else if activeSection === "family"}
            <!-- Family Contacts -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Family Contacts</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each contacts.filter((c) => c.category === "family") as contact}
                  <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="flex items-center space-x-3 mb-3">
                      <img src={contact.avatar} alt={contact.name} class="w-12 h-12 rounded-full" />
                      <div>
                        <h3 class="font-semibold text-gray-900">{contact.name}</h3>
                        <p class="text-sm text-gray-600">{contact.relationship}</p>
                      </div>
                    </div>
                    <div class="space-y-1 text-sm">
                      <p>��� {contact.phone}</p>
                      {#if contact.email}<p>✉️ {contact.email}</p>{/if}
                      {#if contact.address}<p>��� {contact.address}</p>{/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {:else if activeSection === "professional"}
            <!-- Service Providers -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Service Providers</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each contacts.filter((c) => c.category === "professional") as contact}
                  <div class="bg-purple-50 p-4 rounded-lg">
                    <div class="flex items-center space-x-3 mb-3">
                      <img src={contact.avatar} alt={contact.name} class="w-12 h-12 rounded-full" />
                      <div>
                        <h3 class="font-semibold text-gray-900">{contact.name}</h3>
                        <p class="text-sm text-gray-600">{contact.relationship}</p>
                      </div>
                    </div>
                    <div class="space-y-1 text-sm">
                      <p>��� {contact.phone}</p>
                      {#if contact.email}<p>✉️ {contact.email}</p>{/if}
                      {#if contact.address}<p>��� {contact.address}</p>{/if}
                      {#if contact.notes}<p class="text-xs text-gray-500 mt-2">{contact.notes}</p>{/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {:else if activeSection === "emergency"}
            <!-- Emergency Contacts -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each contacts.filter((c) => c.category === "emergency" || c.relationship?.toLowerCase().includes("police") || c.relationship?.toLowerCase().includes("hospital") || c.relationship?.toLowerCase().includes("fire") || c.relationship?.toLowerCase().includes("ambulance")) as contact}
                  <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <div class="flex items-center space-x-3 mb-3">
                      <Icon icon="heroicons:exclamation-triangle" class="w-8 h-8 text-red-600" />
                      <div>
                        <h3 class="font-semibold text-gray-900">{contact.name}</h3>
                        <p class="text-sm text-gray-600">{contact.relationship}</p>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <p class="text-xl font-bold text-red-600">{contact.phone}</p>
                      {#if contact.address}<p class="text-sm text-gray-600">��� {contact.address}</p>{/if}
                      {#if contact.notes}<p class="text-xs text-gray-500 mt-2">{contact.notes}</p>{/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {:else}
            <div class="text-center py-12">
              <Icon icon="heroicons:phone" class="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Section Coming Soon</h3>
              <p class="text-gray-600">This contacts section is under development.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
