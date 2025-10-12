<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { languages } from "$lib/i18n/index.js";
  import { userRole, setUserRole } from "$lib/stores/userRole.js";

  let currentStep = 0;
  let householdData = {
    region: '',
    primaryLanguage: 'en',
    familySize: 4,
    familyMembers: [],
    rituals: [],
    helperRoles: [],
    preferences: {
      notifications: true,
      voiceAssistant: true,
      offlineMode: true,
      festivalReminders: true
    }
  };

  const steps = [
    { id: 'region', title: 'Region & Language', icon: 'mdi:map-marker' },
    { id: 'family', title: 'Family Structure', icon: 'mdi:account-group' },
    { id: 'rituals', title: 'Rituals & Festivals', icon: 'mdi:temple-hindu' },
    { id: 'roles', title: 'Helper & Roles', icon: 'mdi:account-cog' },
    { id: 'preferences', title: 'Preferences', icon: 'mdi:cog' },
    { id: 'complete', title: 'Setup Complete', icon: 'mdi:check-circle' }
  ];

  const regions = [
    { id: 'south-india', name: 'South India', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'], languages: ['ta', 'ml', 'kn', 'te'] },
    { id: 'north-india', name: 'North India', states: ['Delhi', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Rajasthan'], languages: ['hi', 'pa', 'en'] },
    { id: 'west-india', name: 'West India', states: ['Maharashtra', 'Gujarat', 'Goa'], languages: ['mr', 'gu', 'en'] },
    { id: 'east-india', name: 'East India', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'], languages: ['bn', 'or', 'hi'] },
    { id: 'north-east', name: 'North East India', states: ['Assam', 'Meghalaya', 'Tripura', 'Nagaland'], languages: ['as', 'en'] }
  ];

  const familyRoles = [
    { id: 'mother', name: 'Mother', description: 'Household management, childcare, cooking' },
    { id: 'father', name: 'Father', description: 'Financial management, family guidance' },
    { id: 'grandmother', name: 'Grandmother', description: 'Traditional knowledge, prayers, elders' },
    { id: 'grandfather', name: 'Grandfather', description: 'Family wisdom, guidance' },
    { id: 'teenager', name: 'Teenager', description: 'Education, personal development' },
    { id: 'child', name: 'Child', description: 'Learning, play, family activities' },
    { id: 'helper', name: 'Helper/Cook', description: 'Household chores, cooking, cleaning' },
    { id: 'elder', name: 'Elder Family Member', description: 'Health monitoring, family traditions' }
  ];

  const commonRituals = [
    { id: 'morning-prayers', name: 'Morning Prayers', description: 'Daily morning worship and meditation' },
    { id: 'evening-prayers', name: 'Evening Prayers', description: 'Daily evening prayers and aarti' },
    { id: 'temple-visits', name: 'Temple Visits', description: 'Regular temple visits and offerings' },
    { id: 'festival-celebrations', name: 'Festival Celebrations', description: 'Major festival preparations and celebrations' },
    { id: 'fasting-days', name: 'Fasting Days', description: 'Religious fasting and spiritual practices' },
    { id: 'family-pujas', name: 'Family Pujas', description: 'Special family religious ceremonies' }
  ];

  const helperTasks = [
    { id: 'cooking', name: 'Cooking', description: 'Meal preparation and kitchen management' },
    { id: 'cleaning', name: 'Cleaning', description: 'House cleaning and maintenance' },
    { id: 'laundry', name: 'Laundry', description: 'Washing clothes and household linen' },
    { id: 'shopping', name: 'Shopping', description: 'Grocery and household shopping' },
    { id: 'childcare', name: 'Childcare', description: 'Helping with children\'s activities' },
    { id: 'eldercare', name: 'Eldercare', description: 'Assisting elderly family members' }
  ];

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
    }
  }

  function selectRegion(region) {
    householdData.region = region.id;
    householdData.primaryLanguage = region.languages[0]; // Default to first language
    nextStep();
  }

  function addFamilyMember(role) {
    if (!householdData.familyMembers.find(m => m.id === role.id)) {
      householdData.familyMembers.push({
        id: role.id,
        name: role.name,
        description: role.description,
        count: 1
      });
    }
  }

  function removeFamilyMember(roleId) {
    householdData.familyMembers = householdData.familyMembers.filter(m => m.id !== roleId);
  }

  function toggleRitual(ritual) {
    const index = householdData.rituals.findIndex(r => r.id === ritual.id);
    if (index > -1) {
      householdData.rituals.splice(index, 1);
    } else {
      householdData.rituals.push(ritual);
    }
    householdData.rituals = [...householdData.rituals]; // Trigger reactivity
  }

  function toggleHelperTask(task) {
    const index = householdData.helperRoles.findIndex(t => t.id === task.id);
    if (index > -1) {
      householdData.helperRoles.splice(index, 1);
    } else {
      householdData.helperRoles.push(task);
    }
    householdData.helperRoles = [...householdData.helperRoles]; // Trigger reactivity
  }

  function completeSetup() {
    // Save household data to localStorage
    localStorage.setItem('divineNest_household', JSON.stringify(householdData));

    // Set primary user role (default to mother if available, otherwise first family member)
    const primaryRole = householdData.familyMembers.find(m => m.id === 'mother')?.id ||
                       householdData.familyMembers[0]?.id || 'mother';
    setUserRole(primaryRole);

    // Navigate to main app
    window.location.href = '/';
  }

  onMount(() => {
    // Check if setup already completed
    const savedData = localStorage.getItem('divineNest_household');
    if (savedData) {
      householdData = JSON.parse(savedData);
      // Skip to completion if already set up
      currentStep = steps.length - 1;
    }
  });
</script>

<div class="household-setup min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
  <!-- Header -->
  <div class="bg-white shadow-sm border-b border-orange-200">
    <div class="max-w-4xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-orange-800">🏠 Divine Nest Setup</h1>
          <p class="text-orange-600">Personalize your household companion</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
          <p class="font-medium text-gray-800">{steps[currentStep].title}</p>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mt-4">
        <div class="flex items-center space-x-2">
          {#each steps as step, index}
            <div class="flex items-center">
              <div class="flex items-center justify-center w-8 h-8 rounded-full {index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}">
                {#if index < currentStep}
                  <Icon icon="mdi:check" class="w-4 h-4" />
                {:else}
                  <Icon icon={step.icon} class="w-4 h-4" />
                {/if}
              </div>
              {#if index < steps.length - 1}
                <div class="w-12 h-1 {index < currentStep ? 'bg-orange-500' : 'bg-gray-200'}"></div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-4xl mx-auto px-6 py-8">
    <!-- Step 1: Region & Language -->
    {#if currentStep === 0}
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Where is your home located?</h2>
        <p class="text-lg text-gray-600">This helps us customize festivals, languages, and regional preferences</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each regions as region}
          <button
            class="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
            on:click={() => selectRegion(region)}
          >
            <div class="flex items-center space-x-3 mb-3">
              <Icon icon="mdi:map-marker" class="w-6 h-6 text-orange-500" />
              <h3 class="text-lg font-semibold text-gray-800">{region.name}</h3>
            </div>
            <p class="text-sm text-gray-600 mb-2">{region.states.join(', ')}</p>
            <div class="flex flex-wrap gap-1">
              {#each region.languages as lang}
                <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {languages[lang]?.name || lang}
                </span>
              {/each}
            </div>
          </button>
        {/each}
      </div>
    {/if}

    <!-- Step 2: Family Structure -->
    {#if currentStep === 1}
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Who lives in your household?</h2>
        <p class="text-lg text-gray-600">Select all family members and their roles</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {#each familyRoles as role}
          <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                id={role.id}
                checked={householdData.familyMembers.some(m => m.id === role.id)}
                on:change={() => {
                  if (householdData.familyMembers.some(m => m.id === role.id)) {
                    removeFamilyMember(role.id);
                  } else {
                    addFamilyMember(role);
                  }
                }}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <div>
                <label for={role.id} class="font-medium text-gray-800 cursor-pointer">{role.name}</label>
                <p class="text-sm text-gray-600">{role.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="flex justify-between">
        <button class="btn-secondary" on:click={prevStep}>Back</button>
        <button class="btn-primary" on:click={nextStep} disabled={householdData.familyMembers.length === 0}>
          Next
        </button>
      </div>
    {/if}

    <!-- Step 3: Rituals & Festivals -->
    {#if currentStep === 2}
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Which rituals do you follow?</h2>
        <p class="text-lg text-gray-600">We'll help you stay connected to your traditions</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {#each commonRituals as ritual}
          <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                id={ritual.id}
                checked={householdData.rituals.some(r => r.id === ritual.id)}
                on:change={() => toggleRitual(ritual)}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <div>
                <label for={ritual.id} class="font-medium text-gray-800 cursor-pointer">{ritual.name}</label>
                <p class="text-sm text-gray-600">{ritual.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="flex justify-between">
        <button class="btn-secondary" on:click={prevStep}>Back</button>
        <button class="btn-primary" on:click={nextStep}>Next</button>
      </div>
    {/if}

    <!-- Step 4: Helper & Roles -->
    {#if currentStep === 3}
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Helper & Household Tasks</h2>
        <p class="text-lg text-gray-600">What tasks does your helper manage?</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {#each helperTasks as task}
          <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                id={task.id}
                checked={householdData.helperRoles.some(t => t.id === task.id)}
                on:change={() => toggleHelperTask(task)}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <div>
                <label for={task.id} class="font-medium text-gray-800 cursor-pointer">{task.name}</label>
                <p class="text-sm text-gray-600">{task.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="flex justify-between">
        <button class="btn-secondary" on:click={prevStep}>Back</button>
        <button class="btn-primary" on:click={nextStep}>Next</button>
      </div>
    {/if}

    <!-- Step 5: Preferences -->
    {#if currentStep === 4}
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Your Preferences</h2>
        <p class="text-lg text-gray-600">Customize how Divine Nest works for you</p>
      </div>

      <div class="max-w-2xl mx-auto space-y-6">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Notifications & Reminders</h3>
          <div class="space-y-3">
            <label class="flex items-center space-x-3">
              <input
                type="checkbox"
                bind:checked={householdData.preferences.notifications}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <span class="text-gray-700">Enable smart notifications</span>
            </label>
            <label class="flex items-center space-x-3">
              <input
                type="checkbox"
                bind:checked={householdData.preferences.festivalReminders}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <span class="text-gray-700">Festival and ritual reminders</span>
            </label>
            <label class="flex items-center space-x-3">
              <input
                type="checkbox"
                bind:checked={householdData.preferences.voiceAssistant}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <span class="text-gray-700">Voice assistant features</span>
            </label>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Data & Privacy</h3>
          <div class="space-y-3">
            <label class="flex items-center space-x-3">
              <input
                type="checkbox"
                bind:checked={householdData.preferences.offlineMode}
                class="w-4 h-4 text-orange-500 rounded"
              />
              <span class="text-gray-700">Offline mode (works without internet)</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button class="btn-secondary" on:click={prevStep}>Back</button>
        <button class="btn-primary" on:click={nextStep}>Complete Setup</button>
      </div>
    {/if}

    <!-- Step 6: Complete -->
    {#if currentStep === 5}
      <div class="text-center">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon icon="mdi:check-circle" class="w-12 h-12 text-green-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Setup Complete!</h2>
        <p class="text-lg text-gray-600 mb-8">
          Divine Nest is now personalized for your household. Let's start making family life easier.
        </p>

        <div class="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Your Household Summary</h3>
          <div class="grid grid-cols-2 gap-4 text-left">
            <div>
              <p class="text-sm text-gray-500">Region</p>
              <p class="font-medium">{regions.find(r => r.id === householdData.region)?.name || 'Not set'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Family Members</p>
              <p class="font-medium">{householdData.familyMembers.length} members</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Rituals</p>
              <p class="font-medium">{householdData.rituals.length} selected</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Helper Tasks</p>
              <p class="font-medium">{householdData.helperRoles.length} tasks</p>
            </div>
          </div>
        </div>

        <button class="btn-primary text-lg px-8 py-3" on:click={completeSetup}>
          Enter Divine Nest
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .btn-primary {
    background-color: rgb(249 115 22);
    color: white;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.15s ease-in-out;
  }

  .btn-primary:hover {
    background-color: rgb(234 88 12);
  }

  .btn-secondary {
    background-color: rgb(229 231 235);
    color: rgb(55 65 81);
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.15s ease-in-out;
  }

  .btn-secondary:hover {
    background-color: rgb(209 213 219);
  }

  .btn-primary:disabled {
    @apply bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed;
  }
</style>