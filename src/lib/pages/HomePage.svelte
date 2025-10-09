<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

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
    goto("/family-calendar-modern");
  }

  function navigateToReminders() {
    goto("/reminders");
  }

  function navigateToMeals() {
    goto("/meals");
  }

  function navigateToWellness() {
    goto("/wellness");
  }

  function navigateToMembers() {
    goto("/members");
  }

  function navigateToRituals() {
    goto("/rituals");
  }

  function navigateToWisdom() {
    goto("/wisdom");
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <div class="text-center py-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">குடும்ப வழிகாட்டி</h1>
      <p class="text-lg text-gray-600">Your family's guiding light • October 9, 2025</p>
    </div>

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

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each Object.entries(todaysSchedule) as [timeOfDay, activities]}
          <div class="bg-white/50 rounded-xl p-4">
            <h3 class="font-medium text-gray-700 capitalize mb-2">{timeOfDay}</h3>
            <ul class="space-y-1">
              {#each activities as activity}
                <li class="text-sm text-gray-600 flex items-center">
                  <Icon icon="heroicons:check-circle" class="w-4 h-4 text-green-500 mr-2" />
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

      <div class="space-y-3">
        {#each todaysReminders as reminder}
          <div class="flex items-center justify-between bg-white/50 rounded-xl p-4">
            <div class="flex items-center space-x-3">
              <button on:click|stopPropagation={() => toggleReminder(reminder.id)} class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors {completedReminders.has(reminder.id) ? 'bg-orange-500 border-orange-500' : ''}">
                {#if completedReminders.has(reminder.id)}
                  <Icon icon="heroicons:check" class="w-4 h-4 text-white" />
                {/if}
              </button>
              <div class={completedReminders.has(reminder.id) ? "line-through text-gray-400" : "text-gray-700"}>
                <span class="font-medium">{reminder.time}</span>
                <span class="ml-2">{reminder.task}</span>
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each Object.entries(todaysMeals) as [meal, items]}
          <div class="bg-white/50 rounded-xl p-4 text-center">
            <h3 class="font-medium text-gray-700 capitalize mb-2">{meal}</h3>
            <p class="text-sm text-gray-600">{items}</p>
          </div>
        {/each}
      </div>
    </div>

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

      <div class="text-center py-4">
        <p class="text-lg text-gray-700 italic">"{wellbeingNudges[currentNudgeIndex]}"</p>
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

      <div class="space-y-3">
        {#each familyPulse as member}
          <div class="flex items-center justify-between bg-white/50 rounded-xl p-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white font-medium text-sm">{member.member.charAt(0)}</span>
              </div>
              <div>
                <p class="font-medium text-gray-700">{member.member}</p>
                <p class="text-sm text-gray-600">{member.status}</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">{member.time}</span>
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
        <button on:click={toggleVoiceAssistant} class="px-4 py-2 rounded-xl transition-all duration-300 {voiceListening ? 'bg-red-500 text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}">
          {voiceListening ? "Listening..." : "Start Listening"}
        </button>
      </div>

      <div class="text-center py-4">
        <p class="text-gray-600 mb-2">Shivo is listening...</p>
        <p class="text-sm text-gray-500">Say "Add temple visit" or "Play veena music"</p>
      </div>
    </div>

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

      <div class="text-center py-4">
        <h3 class="text-lg font-medium text-gray-800 mb-2">{ritualHighlight.title}</h3>
        <p class="text-gray-600 mb-3">{ritualHighlight.details}</p>
        <div class="bg-amber-50 rounded-xl p-4">
          <p class="text-sm text-amber-700">Kolam idea: {ritualHighlight.kolam}</p>
        </div>
      </div>
    </div>

    <!-- 8. Wisdom Guide -->
    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer" on:click={navigateToWisdom} on:keydown={(e) => e.key === "Enter" && navigateToWisdom()} role="button" tabindex="0">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
            <Icon icon="heroicons:book-open" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl font-semibold text-gray-800">Wisdom Guide</h2>
        </div>
        <Icon icon="heroicons:chevron-right" class="w-5 h-5 text-gray-400" />
      </div>

      <div class="text-center py-4">
        <h3 class="text-lg font-medium text-gray-800 mb-2">Life Guide for Modern Children</h3>
        <p class="text-gray-600 mb-3">Living the South Indian Way</p>
        <div class="bg-indigo-50 rounded-xl p-4">
          <p class="text-sm text-indigo-700">📘 தமிழ் மரபு, பஞ்சாங்கம், குடும்ப ஒழுக்கம்</p>
        </div>
      </div>
    </div>
  </div>
