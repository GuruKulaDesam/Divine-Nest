<script>
  import { onMount } from "svelte";
  import { getEmergencyContacts } from "$lib/data/home.js";

  let emergencyContacts = [];
  let activeTab = "emergency";
  let disasterPrepChecklist = [
    { id: 1, item: "Emergency water supply (1 litre per person per day for 3 days)", completed: false },
    { id: 2, item: "Non-perishable food items for 3 days", completed: false },
    { id: 3, item: "First aid kit with essential medicines", completed: false },
    { id: 4, item: "Flashlights and extra batteries", completed: false },
    { id: 5, item: "Important documents in waterproof container", completed: false },
    { id: 6, item: "Cash in small denominations", completed: false },
    { id: 7, item: "Power bank for mobile phones", completed: false },
    { id: 8, item: "Whistle for emergency signaling", completed: false },
  ];

  let medicalInfo = {
    familyDoctor: "",
    bloodTypes: {},
    allergies: {},
    medications: {},
    emergencyContacts: [],
  };

  const serviceCategories = [
    { id: "emergency", label: "Emergency Services", icon: "🚨", color: "bg-red-500" },
    { id: "medical", label: "Medical Vault", icon: "🏥", color: "bg-blue-500" },
    { id: "disaster", label: "Disaster Prep", icon: "🌪️", color: "bg-orange-500" },
    { id: "utilities", label: "Utility Services", icon: "⚡", color: "bg-green-500" },
  ];

  const utilityServices = [
    { name: "Electricity Board", number: "1912", description: "TNEB Power outage reporting" },
    { name: "Water Supply", number: "044-28520131", description: "Metrowater complaints" },
    { name: "Gas Leak", number: "1906", description: "Indane Gas emergency" },
    { name: "Police Control Room", number: "100", description: "Emergency police assistance" },
    { name: "Fire Service", number: "101", description: "Fire emergency response" },
    { name: "Ambulance", number: "108", description: "Medical emergency ambulance" },
    { name: "Women Helpline", number: "1091", description: "Women safety and assistance" },
    { name: "Child Helpline", number: "1098", description: "Child protection services" },
  ];

  onMount(async () => {
    await loadEmergencyContacts();
    loadMedicalInfo();
  });

  async function loadEmergencyContacts() {
    emergencyContacts = await getEmergencyContacts();
  }

  function loadMedicalInfo() {
    // Load from localStorage or initialize
    const saved = localStorage.getItem("medicalInfo");
    if (saved) {
      medicalInfo = JSON.parse(saved);
    } else {
      medicalInfo = {
        familyDoctor: "",
        bloodTypes: { amma: "", appa: "", paati: "", children: "" },
        allergies: { amma: "", appa: "", paati: "", children: "" },
        medications: { amma: "", appa: "", paati: "", children: "" },
        emergencyContacts: [],
      };
    }
  }

  function saveMedicalInfo() {
    localStorage.setItem("medicalInfo", JSON.stringify(medicalInfo));
  }

  function callNumber(number) {
    if (confirm(`Call ${number}?`)) {
      window.open(`tel:${number}`, "_self");
    }
  }

  function toggleDisasterItem(id) {
    const item = disasterPrepChecklist.find((item) => item.id === id);
    if (item) {
      item.completed = !item.completed;
      localStorage.setItem("disasterPrep", JSON.stringify(disasterPrepChecklist));
    }
  }

  // Load disaster prep status
  const savedDisasterPrep = localStorage.getItem("disasterPrep");
  if (savedDisasterPrep) {
    disasterPrepChecklist = JSON.parse(savedDisasterPrep);
  }

  $: completedPrepItems = disasterPrepChecklist.filter((item) => item.completed).length;
  $: totalPrepItems = disasterPrepChecklist.length;
  $: prepProgress = Math.round((completedPrepItems / totalPrepItems) * 100);
</script>

<div class="space-y-6">
  <!-- Tab Navigation -->
  <div class="flex flex-wrap gap-2 mb-6 border-b border-red-200 pb-4">
    {#each serviceCategories as category}
      <button class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 {activeTab === category.id ? 'bg-red-500 text-white shadow-md' : 'bg-red-50 text-red-700 hover:bg-red-100'}" on:click={() => (activeTab = category.id)}>
        <span class="text-lg">{category.icon}</span>
        <span class="font-medium">{category.label}</span>
      </button>
    {/each}
  </div>

  <!-- Emergency Services Tab -->
  {#if activeTab === "emergency"}
    <div class="space-y-6">
      <!-- Emergency Quick Dial -->
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
          <span>🚨</span>
          Emergency Quick Dial
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each utilityServices.filter((s) => ["100", "101", "108", "1091"].includes(s.number)) as service}
            <button class="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl" on:click={() => callNumber(service.number)}>
              <span class="text-2xl">{service.name === "Police Control Room" ? "🚔" : service.name === "Fire Service" ? "🚒" : service.name === "Ambulance" ? "🚑" : "👩"}</span>
              <span class="font-semibold text-center">{service.name}</span>
              <span class="text-lg font-bold">{service.number}</span>
              <span class="text-xs opacity-90 text-center">{service.description}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Emergency Contacts from Database -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Emergency Contacts</h2>

        {#if emergencyContacts.length === 0}
          <div class="text-center py-8 text-gray-500">
            <div class="text-4xl mb-4">📞</div>
            <p>No emergency contacts added yet</p>
            <p class="text-sm">Add contacts in the Home dashboard</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each emergencyContacts.filter((c) => ["medical", "police", "fire"].includes(c.type)) as contact}
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl">
                      {contact.type === "medical" ? "🏥" : contact.type === "police" ? "🚔" : "🚒"}
                    </span>
                    <div>
                      <h3 class="font-semibold text-gray-800">{contact.name}</h3>
                      <p class="text-sm text-gray-600 capitalize">{contact.type}</p>
                    </div>
                  </div>

                  <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-200" on:click={() => callNumber(contact.phone)}> 📞 Call </button>
                </div>

                <div class="text-sm text-gray-700">
                  <p><span class="font-medium">Phone:</span> {contact.phone}</p>
                  {#if contact.address}
                    <p><span class="font-medium">Address:</span> {contact.address}</p>
                  {/if}
                  {#if contact.notes}
                    <p><span class="font-medium">Notes:</span> {contact.notes}</p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Medical Vault Tab -->
  {#if activeTab === "medical"}
    <div class="space-y-6">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <span>🏥</span>
          Medical Information Vault
        </h2>

        <!-- Family Doctor -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-blue-700 mb-3">Family Doctor</h3>
          <input type="text" placeholder="Enter family doctor's name and contact" bind:value={medicalInfo.familyDoctor} on:blur={saveMedicalInfo} class="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>

        <!-- Family Medical Info Table -->
        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-lg overflow-hidden">
            <thead class="bg-blue-100">
              <tr>
                <th class="px-4 py-3 text-left text-blue-800 font-semibold">Family Member</th>
                <th class="px-4 py-3 text-left text-blue-800 font-semibold">Blood Type</th>
                <th class="px-4 py-3 text-left text-blue-800 font-semibold">Allergies</th>
                <th class="px-4 py-3 text-left text-blue-800 font-semibold">Medications</th>
              </tr>
            </thead>
            <tbody>
              {#each Object.keys(medicalInfo.bloodTypes) as member}
                <tr class="border-b border-blue-100">
                  <td class="px-4 py-3 font-medium capitalize text-blue-800">{member}</td>
                  <td class="px-4 py-3">
                    <input type="text" placeholder="A+, B-, etc." bind:value={medicalInfo.bloodTypes[member]} on:blur={saveMedicalInfo} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </td>
                  <td class="px-4 py-3">
                    <input type="text" placeholder="Peanuts, penicillin, etc." bind:value={medicalInfo.allergies[member]} on:blur={saveMedicalInfo} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </td>
                  <td class="px-4 py-3">
                    <input type="text" placeholder="Daily medications" bind:value={medicalInfo.medications[member]} on:blur={saveMedicalInfo} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Medical Emergency Tips -->
        <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 class="font-semibold text-yellow-800 mb-2">🩺 Medical Emergency Tips</h3>
          <ul class="text-sm text-yellow-700 space-y-1">
            <li>• Keep emergency numbers saved and easily accessible</li>
            <li>• Know the location of nearest hospital and pharmacy</li>
            <li>• Keep important medical documents in a waterproof folder</li>
            <li>• Have a list of current medications and dosages ready</li>
            <li>• Know family members' blood types and allergies</li>
          </ul>
        </div>
      </div>
    </div>
  {/if}

  <!-- Disaster Prep Tab -->
  {#if activeTab === "disaster"}
    <div class="space-y-6">
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
          <span>🌪️</span>
          Disaster Preparedness
        </h2>

        <!-- Progress Overview -->
        <div class="bg-white rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Preparedness Progress</span>
            <span class="text-sm font-bold text-orange-600">{prepProgress}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-orange-500 h-2 rounded-full transition-all duration-300" style="width: {prepProgress}%"></div>
          </div>
          <p class="text-xs text-gray-600 mt-1">{completedPrepItems} of {totalPrepItems} items completed</p>
        </div>

        <!-- Checklist -->
        <div class="space-y-3">
          {#each disasterPrepChecklist as item}
            <div class="bg-white border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <input type="checkbox" checked={item.completed} on:change={() => toggleDisasterItem(item.id)} class="mt-1 w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
              <div class="flex-1">
                <p class="text-gray-800 {item.completed ? 'line-through text-gray-500' : ''}">
                  {item.item}
                </p>
              </div>
              {#if item.completed}
                <span class="text-green-600">✅</span>
              {/if}
            </div>
          {/each}
        </div>

        <!-- Disaster Preparedness Tips -->
        <div class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="font-semibold text-red-800 mb-2">🚨 Emergency Preparedness Tips</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700">
            <div>
              <h4 class="font-medium mb-1">During Emergency:</h4>
              <ul class="space-y-1">
                <li>• Stay calm and follow official instructions</li>
                <li>• Have an emergency meeting point</li>
                <li>• Keep emergency kit accessible</li>
                <li>• Monitor local news and alerts</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium mb-1">After Emergency:</h4>
              <ul class="space-y-1">
                <li>• Check on neighbors and family</li>
                <li>• Document damages for insurance</li>
                <li>• Follow health department guidelines</li>
                <li>• Update emergency contacts if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Utility Services Tab -->
  {#if activeTab === "utilities"}
    <div class="space-y-6">
      <div class="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <span>⚡</span>
          Utility & Essential Services
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each utilityServices as service}
            <div class="bg-white border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">
                    {#if service.name === "Electricity Board"}⚡
                    {:else if service.name === "Water Supply"}🚰
                    {:else if service.name === "Gas Leak"}🔥
                    {:else if service.name === "Police Control Room"}🚔
                    {:else if service.name === "Fire Service"}🚒
                    {:else if service.name === "Ambulance"}🚑
                    {:else if service.name === "Women Helpline"}👩
                    {:else}📞{/if}
                  </span>
                  <div>
                    <h3 class="font-semibold text-gray-800">{service.name}</h3>
                    <p class="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>

                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-bold text-lg" on:click={() => callNumber(service.number)}>
                  {service.number}
                </button>
              </div>
            </div>
          {/each}
        </div>

        <!-- Service Tips -->
        <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-2">💡 Service Tips</h3>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• Save these numbers in your phone's emergency contacts</li>
            <li>• Keep a physical list of these numbers in your emergency kit</li>
            <li>• Test utility services periodically to ensure they work</li>
            <li>• Know your account numbers for electricity, water, and gas</li>
            <li>• Have alternative contact methods for services during outages</li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>
