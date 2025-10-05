<script>
  import { onMount } from "svelte";
  import { directoryDB } from "../data/directory.js";

  let activeTab = "family";
  let familyContacts = [];
  let vendors = [];
  let doctors = [];
  let communityCenters = [];

  // Form data
  let newContact = { name: "", relationship: "", phone: "", email: "", address: "", emergencyContact: false, notes: "", importance: "Medium" };
  let newVendor = { name: "", category: "", service: "", phone: "", email: "", address: "", rating: 5, notes: "", recommended: false };
  let newDoctor = { name: "", specialty: "", hospital: "", phone: "", email: "", address: "", experience: 5, rating: 5, emergency: false };
  let newCommunityCenter = { name: "", type: "", phone: "", email: "", address: "", services: "", programs: "" };

  onMount(async () => {
    await loadData();
  });

  async function loadData() {
    try {
      familyContacts = await directoryDB.familyContacts.toArray();
      vendors = await directoryDB.vendors.toArray();
      doctors = await directoryDB.doctors.toArray();
      communityCenters = await directoryDB.communityCenters.toArray();
    } catch (error) {
      console.error("Failed to load Directory data:", error);
    }
  }

  async function addFamilyContact() {
    if (!newContact.name.trim() || !newContact.relationship.trim()) return;

    try {
      await directoryDB.familyContacts.add({
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
      await directoryDB.vendors.add({
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
      await directoryDB.doctors.add(newDoctor);
      newDoctor = { name: "", specialty: "", hospital: "", phone: "", email: "", address: "", experience: 5, rating: 5, emergency: false };
      await loadData();
    } catch (error) {
      console.error("Failed to add doctor:", error);
    }
  }

  async function addCommunityCenter() {
    if (!newCommunityCenter.name.trim() || !newCommunityCenter.type.trim()) return;

    try {
      await directoryDB.communityCenters.add({
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
  <!-- Tab Navigation -->
  <div class="flex flex-wrap gap-2 mb-6">
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'family' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "family")}> 👨‍👩‍👧‍👦 Family Contacts </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'vendors' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "vendors")}> 🛍️ Vendors & Services </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'health' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "health")}> 🏥 Health Services </button>
    <button class="px-4 py-2 rounded-lg transition-all duration-300 {activeTab === 'community' ? 'bg-white/20 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}" on:click={() => (activeTab = "community")}> 🏛️ Community Resources </button>
  </div>

  <!-- Family Contacts Tab -->
  {#if activeTab === "family"}
    <div class="space-y-6">
      <!-- Add Family Contact Form -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-4">Add Family Contact</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input bind:value={newContact.name} placeholder="Full Name" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newContact.relationship} placeholder="Relationship (e.g., Father, Mother, Brother)" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newContact.phone} placeholder="Phone Number" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newContact.email} placeholder="Email Address" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <input bind:value={newContact.address} placeholder="Address" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
          <div class="flex items-center space-x-2 col-span-2">
            <input type="checkbox" id="emergency" bind:checked={newContact.emergencyContact} class="rounded" />
            <label for="emergency" class="text-white/80">Emergency Contact</label>
            <select bind:value={newContact.importance} class="ml-auto px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm">
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <textarea bind:value={newContact.notes} placeholder="Additional notes..." rows="2" class="w-full col-span-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"></textarea>
        </div>
        <button on:click={addFamilyContact} class="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"> Add Family Contact </button>
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
</div>
