<script>
  import { onMount } from "svelte";
  import { db } from "../data/database.js";
  import { locationService, LocationData } from "$lib/services/locationService";
  import { regionalDataService, RegionalData, RegionalService, ShoppingCenter } from "$lib/services/regionalDataService";
  import LocationPermissionRequest from "$lib/components/LocationPermissionRequest.svelte";

  let activeTab = "family";
  let familyContacts = [];
  let vendors = [];
  let doctors = [];
  let communityCenters = [];

  // Location-based data
  let currentLocation = null;
  let regionalData = null;
  let nearbyServices = [];
  let nearbyShoppingCenters = [];
  let showPermissionRequest = false;
  let isLoadingLocation = true;
  let locationError = null;

  // Form data
  let newContact = { name: "", relationship: "", phone: "", email: "", address: "", emergencyContact: false, notes: "", importance: "Medium" };
  let newVendor = { name: "", category: "", service: "", phone: "", email: "", address: "", rating: 5, notes: "", recommended: false };
  let newDoctor = { name: "", specialty: "", hospital: "", phone: "", email: "", address: "", experience: 5, rating: 5, emergency: false };
  let newCommunityCenter = { name: "", type: "", phone: "", email: "", address: "", services: "", programs: "" };

  onMount(async () => {
    await loadData();
    await initializeLocationServices();
  });

  async function loadData() {
    try {
      familyContacts = await db.familyContacts.toArray();
      vendors = await db.vendors.toArray();
      doctors = await db.doctors.toArray();
      communityCenters = await db.communityCenters.toArray();
    } catch (error) {
      console.error("Failed to load Directory data:", error);
    }
  }

  async function initializeLocationServices() {
    try {
      isLoadingLocation = true;

      // Check location permissions
      const permissions = await locationService.checkPermissions();
      const hasLocationPermission = permissions.location === 'granted' || permissions.coarseLocation === 'granted';

      if (!hasLocationPermission) {
        showPermissionRequest = true;
        isLoadingLocation = false;
        return;
      }

      // Get current location
      currentLocation = await locationService.getCurrentLocation();

      // Get regional data
      regionalData = await regionalDataService.getRegionalData(currentLocation);

      if (regionalData && currentLocation) {
        // Get nearby services and shopping centers
        nearbyServices = regionalDataService.getNearbyServices(currentLocation, regionalData, 10);
        nearbyShoppingCenters = regionalDataService.getNearbyShoppingCenters(currentLocation, regionalData, 15);
      }

    } catch (error) {
      console.error('Failed to initialize location services:', error);
      locationError = 'Unable to load location-based services';
    } finally {
      isLoadingLocation = false;
    }
  }

  async function handlePermissionGranted() {
    showPermissionRequest = false;
    await initializeLocationServices();
  }

  function handlePermissionDenied() {
    showPermissionRequest = false;
    isLoadingLocation = false;
  }

  async function addFamilyContact() {
    if (!newContact.name.trim() || !newContact.relationship.trim()) return;

    try {
      await db.familyContacts.add({
        ...newContact,
        lastContacted: new Date().toISOString(),
      });
      newContact = { name: "", relationship: "", phone: "", email: "", address: "", emergencyContact: false, notes: "", importance: "Medium" };
      await loadData();
    } catch (error) {
      console.error("Failed to add family contact:", error);
    }
  }

  async function addVendor() {
    if (!newVendor.name.trim() || !newVendor.category.trim()) return;

    try {
      await db.vendors.add({
        ...newVendor,
        lastUsed: new Date().toISOString(),
      });
      newVendor = { name: "", category: "", service: "", phone: "", email: "", address: "", rating: 5, notes: "", recommended: false };
      await loadData();
    } catch (error) {
      console.error("Failed to add vendor:", error);
    }
  }

  async function addDoctor() {
    if (!newDoctor.name.trim() || !newDoctor.specialty.trim()) return;

    try {
      await db.doctors.add(newDoctor);
      newDoctor = { name: "", specialty: "", hospital: "", phone: "", email: "", address: "", experience: 5, rating: 5, emergency: false };
      await loadData();
    } catch (error) {
      console.error("Failed to add doctor:", error);
    }
  }

  async function addCommunityCenter() {
    if (!newCommunityCenter.name.trim() || !newCommunityCenter.type.trim()) return;

    try {
      await db.communityCenters.add({
        ...newCommunityCenter,
        services: newCommunityCenter.services.split(",").map((s) => s.trim()),
        programs: newCommunityCenter.programs.split(",").map((p) => p.trim()),
      });
      newCommunityCenter = { name: "", type: "", phone: "", email: "", address: "", services: "", programs: "" };
      await loadData();
    } catch (error) {
      console.error("Failed to add community center:", error);
    }
  }

  function getImportanceColor(importance) {
    switch (importance) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  }

  function renderStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }
</script>

<div class="space-y-6">
  <!-- Location Permission Request Modal -->
  {#if showPermissionRequest}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <LocationPermissionRequest
        onPermissionGranted={handlePermissionGranted}
        onPermissionDenied={handlePermissionDenied}
      />
    </div>
  {/if}

  <!-- Tab Navigation -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'family' ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 text-base-content hover:bg-base-300'}" on:click={() => (activeTab = "family")}> 👨‍👩‍👧‍👦 Family Contacts </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'vendors' ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 text-base-content hover:bg-base-300'}" on:click={() => (activeTab = "vendors")}> 🛍️ Vendors & Services </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'health' ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 text-base-content hover:bg-base-300'}" on:click={() => (activeTab = "health")}> 🏥 Health Services </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'community' ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 text-base-content hover:bg-base-300'}" on:click={() => (activeTab = "community")}> 🏛️ Community Resources </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'local' ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 text-base-content hover:bg-base-300'}" on:click={() => (activeTab = "local")}> 📍 Local Services </button>
  </div>

  <!-- Family Contacts Tab -->
  {#if activeTab === "family"}
    <div class="space-y-6">
      <!-- Add Family Contact Form -->
      <div class="bg-base-100 backdrop-blur-sm rounded-xl p-6 border border-base-300 shadow-lg">
        <h3 class="text-xl font-semibold text-base-content mb-4">Add Family Contact</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newContact.name} placeholder="Full Name" class="input input-bordered w-full text-base-content placeholder-base-content/50" />
          <input bind:value={newContact.relationship} placeholder="Relationship (e.g., Father, Mother, Brother)" class="input input-bordered w-full text-base-content placeholder-base-content/50" />
          <input bind:value={newContact.phone} placeholder="Phone Number" class="input input-bordered w-full text-base-content placeholder-base-content/50" />
          <input bind:value={newContact.email} placeholder="Email Address" class="input input-bordered w-full text-base-content placeholder-base-content/50" />
          <input bind:value={newContact.address} placeholder="Address" class="input input-bordered w-full col-span-2 text-base-content placeholder-base-content/50" />
          <div class="flex items-center space-x-2 col-span-2">
            <input type="checkbox" id="emergency" bind:checked={newContact.emergencyContact} class="checkbox checkbox-primary" />
            <label for="emergency" class="text-base-content/80">Emergency Contact</label>
            <select bind:value={newContact.importance} class="select select-bordered ml-auto text-base-content">
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <textarea bind:value={newContact.notes} placeholder="Additional notes..." rows="2" class="textarea textarea-bordered w-full col-span-2 text-base-content placeholder-base-content/50"></textarea>
        </div>
        <button on:click={addFamilyContact} class="btn btn-primary mt-4"> Add Family Contact </button>
      </div>

      <!-- Family Contacts List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each familyContacts as contact}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-semibold text-white">{contact.name}</h4>
                <p class="text-white/70">{contact.relationship}</p>
              </div>
              <div class="text-right">
                {#if contact.emergencyContact}
                  <span class="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs mb-1 block"> Emergency </span>
                {/if}
                <span class="px-2 py-1 {getImportanceColor(contact.importance)} bg-white/10 rounded text-xs">
                  {contact.importance}
                </span>
              </div>
            </div>
            {#if contact.phone}
              <p class="text-white/80 text-sm mb-1">📞 {contact.phone}</p>
            {/if}
            {#if contact.email}
              <p class="text-white/80 text-sm mb-1">✉️ {contact.email}</p>
            {/if}
            {#if contact.address}
              <p class="text-white/60 text-sm mb-2">📍 {contact.address}</p>
            {/if}
            {#if contact.notes}
              <p class="text-white/70 text-sm">{contact.notes}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Vendors Tab -->
  {#if activeTab === "vendors"}
    <div class="space-y-6">
      <!-- Add Vendor Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Add Vendor/Service Provider</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newVendor.name} placeholder="Business Name" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newVendor.category} placeholder="Category (e.g., Grocery, Religious, Services)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newVendor.service} placeholder="Service Type" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newVendor.phone} placeholder="Phone Number" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newVendor.email} placeholder="Email Address" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newVendor.address} placeholder="Address" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <div class="flex items-center space-x-4 col-span-2">
            <div class="flex items-center space-x-2">
              <label class="text-white/80">Rating:</label>
              <input type="range" min="1" max="5" bind:value={newVendor.rating} class="flex-1" />
              <span class="text-white w-8">{newVendor.rating}</span>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="recommended" bind:checked={newVendor.recommended} class="rounded" />
              <label for="recommended" class="text-white/80">Recommended</label>
            </div>
          </div>
          <textarea bind:value={newVendor.notes} placeholder="Additional notes..." rows="2" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
        </div>
        <button on:click={addVendor} class="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg"> Add Vendor </button>
      </div>

      <!-- Vendors List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each vendors as vendor}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-semibold text-white">{vendor.name}</h4>
                <p class="text-white/70">{vendor.category} • {vendor.service}</p>
              </div>
              <div class="text-right">
                {#if vendor.recommended}
                  <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs mb-1 block"> Recommended </span>
                {/if}
                <div class="text-yellow-400">
                  {renderStars(vendor.rating)}
                </div>
              </div>
            </div>
            {#if vendor.phone}
              <p class="text-white/80 text-sm mb-1">📞 {vendor.phone}</p>
            {/if}
            {#if vendor.email}
              <p class="text-white/80 text-sm mb-1">✉️ {vendor.email}</p>
            {/if}
            {#if vendor.address}
              <p class="text-white/60 text-sm mb-2">📍 {vendor.address}</p>
            {/if}
            {#if vendor.notes}
              <p class="text-white/70 text-sm">{vendor.notes}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Health Services Tab -->
  {#if activeTab === "health"}
    <div class="space-y-6">
      <!-- Add Doctor Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Add Healthcare Provider</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newDoctor.name} placeholder="Doctor's Name" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newDoctor.specialty} placeholder="Specialty (e.g., Family Medicine, Ayurveda)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newDoctor.hospital} placeholder="Hospital/Clinic Name" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newDoctor.phone} placeholder="Phone Number" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newDoctor.email} placeholder="Email Address" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newDoctor.address} placeholder="Address" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <div class="flex items-center space-x-4 col-span-2">
            <div class="flex items-center space-x-2">
              <label class="text-white/80">Experience (years):</label>
              <input type="number" min="1" max="50" bind:value={newDoctor.experience} class="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-center" />
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-white/80">Rating:</label>
              <input type="range" min="1" max="5" bind:value={newDoctor.rating} class="flex-1" />
              <span class="text-white w-8">{newDoctor.rating}</span>
            </div>
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="emergency-doctor" bind:checked={newDoctor.emergency} class="rounded" />
              <label for="emergency-doctor" class="text-white/80">Emergency Care</label>
            </div>
          </div>
        </div>
        <button on:click={addDoctor} class="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"> Add Healthcare Provider </button>
      </div>

      <!-- Doctors List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each doctors as doctor}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-semibold text-white">{doctor.name}</h4>
                <p class="text-white/70">{doctor.specialty}</p>
                <p class="text-white/60 text-sm">{doctor.hospital}</p>
              </div>
              <div class="text-right">
                {#if doctor.emergency}
                  <span class="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs mb-1 block"> Emergency </span>
                {/if}
                <div class="text-yellow-400 text-sm">
                  {renderStars(doctor.rating)}
                </div>
                <div class="text-white/50 text-xs">
                  {doctor.experience} yrs exp
                </div>
              </div>
            </div>
            {#if doctor.phone}
              <p class="text-white/80 text-sm mb-1">📞 {doctor.phone}</p>
            {/if}
            {#if doctor.email}
              <p class="text-white/80 text-sm mb-1">✉️ {doctor.email}</p>
            {/if}
            {#if doctor.address}
              <p class="text-white/60 text-sm">📍 {doctor.address}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Community Resources Tab -->
  {#if activeTab === "community"}
    <div class="space-y-6">
      <!-- Add Community Center Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Add Community Resource</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newCommunityCenter.name} placeholder="Organization Name" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newCommunityCenter.type} placeholder="Type (e.g., Cultural, Social Services, Educational)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newCommunityCenter.phone} placeholder="Phone Number" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newCommunityCenter.email} placeholder="Email Address" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newCommunityCenter.address} placeholder="Address" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newCommunityCenter.services} placeholder="Services (comma separated)" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newCommunityCenter.programs} placeholder="Programs (comma separated)" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
        </div>
        <button on:click={addCommunityCenter} class="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"> Add Community Resource </button>
      </div>

      <!-- Community Centers List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each communityCenters as center}
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-semibold text-white">{center.name}</h4>
                <p class="text-white/70">{center.type}</p>
              </div>
            </div>
            {#if center.phone}
              <p class="text-white/80 text-sm mb-1">📞 {center.phone}</p>
            {/if}
            {#if center.email}
              <p class="text-white/80 text-sm mb-1">✉️ {center.email}</p>
            {/if}
            {#if center.address}
              <p class="text-white/60 text-sm mb-2">📍 {center.address}</p>
            {/if}
            {#if center.services && center.services.length > 0}
              <div class="mb-2">
                <p class="text-white/80 text-sm font-semibold mb-1">Services:</p>
                <div class="flex flex-wrap gap-1">
                  {#each center.services as service}
                    <span class="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                      {service}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
            {#if center.programs && center.programs.length > 0}
              <div>
                <p class="text-white/80 text-sm font-semibold mb-1">Programs:</p>
                <div class="flex flex-wrap gap-1">
                  {#each center.programs as program}
                    <span class="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                      {program}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Local Services Tab -->
  {#if activeTab === "local"}
    <div class="space-y-6">
      {#if isLoadingLocation}
        <div class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p class="text-base-content/70">Loading local services...</p>
          </div>
        </div>
      {:else if locationError}
        <div class="bg-error/10 border border-error/20 rounded-xl p-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-error">Location Services Unavailable</h3>
              <p class="text-base-content/70">{locationError}</p>
            </div>
          </div>
        </div>
      {:else if regionalData && currentLocation}
        <!-- Regional Info Header -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold mb-1">📍 {regionalData.city}, {regionalData.state}</h3>
              <p class="text-blue-100">Local services and information for your area</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-blue-100">Last updated</p>
              <p class="text-sm font-medium">{regionalData.lastUpdated.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <!-- Nearby Services -->
        {#if nearbyServices.length > 0}
          <div class="bg-base-100 backdrop-blur-sm rounded-xl p-6 border border-base-300 shadow-lg">
            <h3 class="text-xl font-semibold text-base-content mb-4 flex items-center">
              <span class="mr-2">🏪</span>
              Nearby Services (within 10km)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each nearbyServices as service}
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-white mb-1">{service.name}</h4>
                      <p class="text-white/70 text-sm mb-2">{service.category}</p>
                      {#if service.description}
                        <p class="text-white/80 text-sm mb-2">{service.description}</p>
                      {/if}
                    </div>
                    {#if service.isVerified}
                      <span class="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Verified</span>
                    {/if}
                  </div>

                  <div class="space-y-2">
                    {#if service.phone}
                      <p class="text-white/80 text-sm">📞 {service.phone}</p>
                    {/if}
                    {#if service.address}
                      <p class="text-white/60 text-sm">📍 {service.address}</p>
                    {/if}
                    {#if service.rating}
                      <div class="flex items-center">
                        <span class="text-yellow-400 text-sm mr-1">{renderStars(service.rating)}</span>
                        <span class="text-white/70 text-sm">({service.rating})</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Nearby Shopping Centers -->
        {#if nearbyShoppingCenters.length > 0}
          <div class="bg-base-100 backdrop-blur-sm rounded-xl p-6 border border-base-300 shadow-lg">
            <h3 class="text-xl font-semibold text-base-content mb-4 flex items-center">
              <span class="mr-2">🛍️</span>
              Nearby Shopping Centers (within 15km)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each nearbyShoppingCenters as center}
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-white mb-1">{center.name}</h4>
                      <p class="text-white/70 text-sm mb-2 capitalize">{center.type.replace('_', ' ')}</p>
                      {#if center.specialties && center.specialties.length > 0}
                        <div class="flex flex-wrap gap-1 mb-2">
                          {#each center.specialties as specialty}
                            <span class="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                              {specialty}
                            </span>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  </div>

                  <div class="space-y-2">
                    {#if center.address}
                      <p class="text-white/60 text-sm">📍 {center.address}</p>
                    {/if}
                    {#if center.rating}
                      <div class="flex items-center">
                        <span class="text-yellow-400 text-sm mr-1">{renderStars(center.rating)}</span>
                        <span class="text-white/70 text-sm">({center.rating})</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Cultural Information -->
        {#if regionalData.culturalInfo}
          <div class="bg-base-100 backdrop-blur-sm rounded-xl p-6 border border-base-300 shadow-lg">
            <h3 class="text-xl font-semibold text-base-content mb-4 flex items-center">
              <span class="mr-2">🎭</span>
              Local Culture & Festivals
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-medium text-base-content mb-3">Upcoming Festivals</h4>
                <div class="space-y-2">
                  {#each regionalData.culturalInfo.festivals as festival}
                    <div class="flex items-center space-x-2">
                      <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span class="text-base-content/80">{festival}</span>
                    </div>
                  {/each}
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-base-content mb-3">Local Cuisine</h4>
                <div class="space-y-2">
                  {#each regionalData.culturalInfo.localCuisine as dish}
                    <div class="flex items-center space-x-2">
                      <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span class="text-base-content/80">{dish}</span>
                    </div>
                  {/each}
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-base-content mb-3">Traditional Wear</h4>
                <div class="space-y-2">
                  {#each regionalData.culturalInfo.traditionalWear as item}
                    <div class="flex items-center space-x-2">
                      <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span class="text-base-content/80">{item}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/if}

      {:else}
        <div class="text-center py-12">
          <div class="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-base-content/70 mb-2">Location Services Not Available</h3>
          <p class="text-base-content/50">Grant location permission to see local services and information.</p>
        </div>
      {/if}
    </div>
  {/if}
</div>
