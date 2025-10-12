<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import RegionalSetupWizard from "$lib/components/RegionalSetupWizard.svelte";

  // Regional setup state
  let showRegionalSetup = false;
  let regionalSetupCompleted = false;

  // Check if regional setup has been completed
  import { onMount } from 'svelte';
  onMount(() => {
    const setupCompleted = localStorage.getItem('regionalSetupCompleted');
    if (!setupCompleted) {
      showRegionalSetup = true;
    } else {
      regionalSetupCompleted = true;
    }
  });

  function handleRegionalSetupComplete(setupData) {
    console.log('Regional setup completed:', setupData);
    localStorage.setItem('regionalSetupCompleted', 'true');
    localStorage.setItem('userRegion', setupData.region);
    localStorage.setItem('userLanguage', setupData.language);
    showRegionalSetup = false;
    regionalSetupCompleted = true;

    // Here you could initialize location services or update app state
  }

  function handleRegionalSetupSkip() {
    showRegionalSetup = false;
    regionalSetupCompleted = true;
  }

  // Today's Schedule Data
  const todaysSchedule = {
    morning: ["Temple visit at 6:30 AM", "School pickup at 8:00 AM"],
    noon: ["Lunch preparation", "Family prayer"],
    evening: ["Doctor appointment at 4:00 PM", "Homework help"],
    night: ["Dinner time", "Story time with kids"],
  };

  // Today's Reminders (only today, not future)
  const todaysReminders = [
    { id: 1, time: "7:00 AM", task: "Paati's BP medicine", completed: false },
    { id: 2, time: "8:00 AM", task: "Milk delivery expected", completed: false },
    { id: 3, time: "12:00 PM", task: "Prayer time", completed: false },
    { id: 4, time: "6:00 PM", task: "Electricity bill due", completed: false },
  ];

  // Today's Meal Plan
  const todaysMeals = {
    breakfast: "Idli + coconut chutney",
    lunch: "Sambar + beans poriyal + curd",
    dinner: "Rasam + curd rice + pickle",
  };

  // Wellbeing Nudges
  const wellbeingNudges = ["Have you had water recently?", "Take 5 minutes to breathe", "Would you like soft devotional music?"];

  // Family Pulse
  const familyPulse = [
    { member: "Paati", status: "Took medicine ✅", time: "7:00 AM" },
    { member: "Appa", status: "Walk scheduled", time: "5:00 PM" },
    { member: "Kids", status: "Homework reminder", time: "6:00 PM" },
  ];

  // Ritual Highlight
  const ritualHighlight = {
    title: "Today is Ekadashi",
    details: "Light lamp at 6:15 PM",
    kolam: "Lotus with dots (7x1)",
  };

  // Interactive state
  let completedReminders = new Set();
  let currentNudgeIndex = 0;
  let voiceListening = false;

  function toggleReminder(reminderId) {
    if (completedReminders.has(reminderId)) {
      completedReminders.delete(reminderId);
    } else {
      completedReminders.add(reminderId);
    }
    completedReminders = completedReminders;
  }

  function nextNudge() {
    currentNudgeIndex = (currentNudgeIndex + 1) % wellbeingNudges.length;
  }

  function toggleVoiceAssistant() {
    voiceListening = !voiceListening;
  }

  function navigateToSchedule() {
    goto("/home/family-calendar-modern");
  }

  function navigateToReminders() {
    goto("/home/reminders");
  }

  function navigateToMeals() {
    goto("/food/meals");
  }

  function navigateToWellness() {
    goto("/wellness");
  }

  function navigateToMembers() {
    goto("/home/members");
  }

  function navigateToRituals() {
    goto("/divinity/rituals");
  }

  function navigateToCulture() {
    goto("/culture");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Dashboard Grid - 3 columns, 3 rows -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Row 1 -->
      <!-- 1. Today's Schedule -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToSchedule} on:keydown={(e) => e.key === "Enter" && navigateToSchedule()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          {#each Object.entries(todaysSchedule) as [timeOfDay, activities]}
            <div class="bg-white/50 rounded-xl p-3">
              <h3 class="font-medium text-gray-700 capitalize mb-1 text-sm">{timeOfDay}</h3>
              <ul class="space-y-1">
                {#each activities.slice(0, 1) as activity}
                  <li class="text-xs text-gray-600 flex items-center">
                    <Icon icon="heroicons:check-circle" class="w-3 h-3 text-green-500 mr-1" />
                    {activity}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>

      <!-- 2. Reminders -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToReminders} on:keydown={(e) => e.key === "Enter" && navigateToReminders()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:bell" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Today's Reminders</h2>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
        </div>

        <div class="space-y-2">
          {#each todaysReminders.slice(0, 3) as reminder}
            <div class="flex items-center justify-between bg-white/50 rounded-xl p-3">
              <div class="flex items-center space-x-2">
                <button on:click|stopPropagation={() => toggleReminder(reminder.id)} class="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors {completedReminders.has(reminder.id) ? 'bg-orange-500 border-orange-500' : ''}">
                  {#if completedReminders.has(reminder.id)}
                    <Icon icon="heroicons:check" class="w-3 h-3 text-white" />
                  {/if}
                </button>
                <div class={completedReminders.has(reminder.id) ? "line-through text-gray-400 text-sm" : "text-gray-700 text-sm"}>
                  <span class="font-medium">{reminder.time}</span>
                  <span class="ml-1">{reminder.task}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 3. Meal Plan Snapshot -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToMeals} on:keydown={(e) => e.key === "Enter" && navigateToMeals()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:fire" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Today's Meals</h2>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
        </div>

        <div class="space-y-2">
          {#each Object.entries(todaysMeals) as [meal, items]}
            <div class="bg-white/50 rounded-xl p-3 text-center">
              <h3 class="font-medium text-gray-700 capitalize mb-1 text-sm">{meal}</h3>
              <p class="text-xs text-gray-600">{items}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Row 2 -->
      <!-- 4. Wellbeing Nudges -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToWellness} on:keydown={(e) => e.key === "Enter" && navigateToWellness()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:heart" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Wellbeing Nudge</h2>
          </div>
          <button on:click|stopPropagation={nextNudge} class="text-pink-500 hover:text-pink-700 transition-colors">
            <Icon icon="heroicons:arrow-path" class="w-5 h-5" />
          </button>
        </div>

        <div class="text-center py-2">
          <p class="text-sm text-gray-700 italic">"{wellbeingNudges[currentNudgeIndex]}"</p>
        </div>
      </div>

      <!-- 5. Family Pulse -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToMembers} on:keydown={(e) => e.key === "Enter" && navigateToMembers()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:users" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Family Pulse</h2>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
        </div>

        <div class="space-y-2">
          {#each familyPulse as member}
            <div class="flex items-center justify-between bg-white/50 rounded-xl p-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-medium text-xs">{member.member.charAt(0)}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-700 text-sm">{member.member}</p>
                  <p class="text-xs text-gray-600">{member.status}</p>
                </div>
              </div>
              <span class="text-xs text-gray-500">{member.time}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- 6. Voice Assistant Prompt -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:microphone" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Voice Assistant</h2>
          </div>
          <button on:click={toggleVoiceAssistant} class="px-3 py-1 text-sm rounded-xl transition-all duration-300 {voiceListening ? 'bg-red-500 text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}">
            {voiceListening ? "Listening..." : "Start"}
          </button>
        </div>

        <div class="text-center py-2">
          <p class="text-gray-600 text-sm mb-1">Shivo is listening...</p>
          <p class="text-xs text-gray-500">Say "Add temple visit"</p>
        </div>
      </div>

      <!-- Row 3 -->
      <!-- 7. Ritual Highlight -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToRituals} on:keydown={(e) => e.key === "Enter" && navigateToRituals()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:sparkles" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Today's Ritual</h2>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
        </div>

        <div class="text-center py-2">
          <h3 class="text-lg font-medium text-gray-800 mb-1">{ritualHighlight.title}</h3>
          <p class="text-gray-600 text-sm mb-2">{ritualHighlight.details}</p>
          <div class="bg-amber-50 rounded-xl p-2">
            <p class="text-xs text-amber-700">Kolam: {ritualHighlight.kolam}</p>
          </div>
        </div>
      </div>

      <!-- 8. Wisdom Guide -->
      <!-- 8. Culture Guide -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToCulture} on:keydown={(e) => e.key === "Enter" && navigateToCulture()} role="button" tabindex="0">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:book-open" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Culture Guide</h2>
          </div>
          <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
        </div>

        <div class="text-center py-2">
          <h3 class="text-sm font-medium text-gray-800 mb-1">Life Guide for Modern Children</h3>
          <p class="text-gray-600 text-sm mb-2">Living the South Indian Way</p>
          <div class="bg-indigo-50 rounded-xl p-2">
            <p class="text-xs text-indigo-700">📘 தமிழ் மரபு, பஞ்சாங்கம்</p>
          </div>
        </div>
      </div>

      <!-- 9. Quick Actions / Stats -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Icon icon="heroicons:bolt" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Quick Actions</h2>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button class="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-3 rounded-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-sm font-medium">
            <Icon icon="heroicons:plus" class="w-4 h-4 mx-auto mb-1" />
            Add Task
          </button>
          <button class="bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-xl hover:from-green-500 hover:to-green-700 transition-all duration-300 text-sm font-medium">
            <Icon icon="heroicons:calendar" class="w-4 h-4 mx-auto mb-1" />
            Schedule
          </button>
          <button class="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-3 rounded-xl hover:from-purple-500 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
            <Icon icon="heroicons:phone" class="w-4 h-4 mx-auto mb-1" />
            Call
          </button>
          <button class="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-3 rounded-xl hover:from-orange-500 hover:to-orange-700 transition-all duration-300 text-sm font-medium">
            <Icon icon="heroicons:camera" class="w-4 h-4 mx-auto mb-1" />
            Photo
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Regional Setup Wizard Modal -->
{#if showRegionalSetup}
  <RegionalSetupWizard
    onComplete={handleRegionalSetupComplete}
    onSkip={handleRegionalSetupSkip}
  />
{/if}
