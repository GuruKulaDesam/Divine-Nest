<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { StudentProfiles, StudyPlanTemplates, FestivalStudyModes, CurrentAcademicData } from "../../data/educationData.js";

  export let selectedStudent = "thambi";

  let student = {};
  let selectedTemplate = "schoolDay";
  let selectedDate = new Date().toISOString().split("T")[0];
  let currentPlan = [];
  let festivalMode = null;
  let customSubjects = [];

  $: {
    student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
    customSubjects = student.subjects || [];
    loadPlanForDate();
  }

  function loadPlanForDate() {
    // Load existing plan or create from template
    const template = StudyPlanTemplates[selectedTemplate];
    if (template) {
      currentPlan = template.timeSlots.map((slot, index) => ({
        ...slot,
        id: `slot-${index}`,
        completed: false,
        subject: slot.activity.includes("revision") ? customSubjects[0] || "Mathematics" : "",
        notes: "",
      }));
    }
  }

  function selectTemplate(templateId) {
    selectedTemplate = templateId;
    loadPlanForDate();
  }

  function addTimeSlot() {
    const newSlot = {
      id: `slot-${Date.now()}`,
      time: "08:00",
      activity: "Study Session",
      duration: 60,
      completed: false,
      subject: customSubjects[0] || "Mathematics",
      notes: "",
    };
    currentPlan = [...currentPlan, newSlot];
  }

  function removeTimeSlot(slotId) {
    currentPlan = currentPlan.filter((slot) => slot.id !== slotId);
  }

  function toggleSlotCompletion(slotId) {
    currentPlan = currentPlan.map((slot) => (slot.id === slotId ? { ...slot, completed: !slot.completed } : slot));
  }

  function updateSlot(slotId, updates) {
    currentPlan = currentPlan.map((slot) => (slot.id === slotId ? { ...slot, ...updates } : slot));
  }

  function activateFestivalMode(festivalId) {
    festivalMode = festivalId;
    const festival = FestivalStudyModes[festivalId];
    if (festival) {
      // Create festival-themed study plan
      currentPlan = [
        {
          id: "festival-1",
          time: "07:00",
          activity: "Morning Prayer & Light Study",
          duration: 45,
          completed: false,
          subject: festival.subjects[0],
          notes: `${festival.name} special session`,
        },
        {
          id: "festival-2",
          time: "10:00",
          activity: festival.activities[0],
          duration: 60,
          completed: false,
          subject: festival.subjects[1],
          notes: "Cultural learning activity",
        },
        {
          id: "festival-3",
          time: "15:00",
          activity: "Festival Preparation Break",
          duration: 90,
          completed: false,
          subject: "",
          notes: "Family time and celebration prep",
        },
        {
          id: "festival-4",
          time: "18:00",
          activity: "Evening Revision",
          duration: 30,
          completed: false,
          subject: festival.subjects[2],
          notes: "Light revision with festival theme",
        },
      ];
    }
  }

  function calculateTotalStudyTime() {
    return currentPlan.filter((slot) => slot.subject && slot.activity !== "Break").reduce((total, slot) => total + slot.duration, 0);
  }

  function calculateCompletedTime() {
    return currentPlan.filter((slot) => slot.completed && slot.subject).reduce((total, slot) => total + slot.duration, 0);
  }

  // Reactive calculations for progress tracking
  $: totalTime = calculateTotalStudyTime();
  $: completedTime = calculateCompletedTime();
  $: progressPercentage = totalTime > 0 ? Math.round((completedTime / totalTime) * 100) : 0;

  function getDifficultyColor(subject) {
    if (selectedStudent === "akka") {
      const hardSubjects = ["Physics", "Chemistry", "JEE Mathematics"];
      return hardSubjects.includes(subject) ? "red" : "blue";
    }
    return "blue";
  }

  function getMotivationalTip() {
    const tips = selectedStudent === "akka" ? ["Break complex JEE problems into smaller steps", "Review previous chapters while learning new ones", "Practice daily to build consistency", "Take breaks to avoid burnout"] : ["Use colorful diagrams for Science topics", "Practice math tables daily", "Read Tamil stories to improve language", "Ask questions when you don't understand"];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  onMount(() => {
    loadPlanForDate();
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Study Planner</h1>
        <p class="text-lg text-gray-600">படிப்பு திட்டம்</p>
        <p class="text-sm text-gray-500">{student.name} ({student.tamil}) • {student.grade}</p>
      </div>

      <!-- Date Selector -->
      <div class="flex items-center space-x-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Study Date</label>
          <input type="date" bind:value={selectedDate} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Today's Progress -->
        <div class="text-center">
          <div class="relative w-16 h-16 mx-auto">
            <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="{progressPercentage}, 100" stroke-linecap="round" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xs font-bold text-gray-900">{progressPercentage}%</span>
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-1">{completedTime}m/{totalTime}m</p>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <Icon icon="heroicons:clock" class="w-6 h-6 mx-auto mb-2 text-blue-600" />
        <p class="text-lg font-bold text-blue-800">{totalTime}m</p>
        <p class="text-xs text-blue-600">Total Study Time</p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <Icon icon="heroicons:check-circle" class="w-6 h-6 mx-auto mb-2 text-green-600" />
        <p class="text-lg font-bold text-green-800">{currentPlan.filter((s) => s.completed).length}</p>
        <p class="text-xs text-green-600">Completed Tasks</p>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <Icon icon="heroicons:book-open" class="w-6 h-6 mx-auto mb-2 text-orange-600" />
        <p class="text-lg font-bold text-orange-800">{new Set(currentPlan.map((s) => s.subject).filter(Boolean)).size}</p>
        <p class="text-xs text-orange-600">Subjects Today</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <Icon icon="heroicons:fire" class="w-6 h-6 mx-auto mb-2 text-purple-600" />
        <p class="text-lg font-bold text-purple-800">{student.currentStreak}</p>
        <p class="text-xs text-purple-600">Day Streak</p>
      </div>
    </div>
  </div>

  <!-- Template Selector -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <Icon icon="heroicons:squares-2x2" class="w-5 h-5 mr-2 text-blue-600" />
      Plan Templates
      <span class="ml-2 text-sm text-gray-500">திட்ட வடிவங்கள்</span>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {#each Object.entries(StudyPlanTemplates) as [templateId, template]}
        <button on:click={() => selectTemplate(templateId)} class="p-4 border-2 rounded-lg transition-all text-left {selectedTemplate === templateId ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}">
          <h3 class="font-medium text-gray-900">{template.name}</h3>
          <p class="text-sm text-gray-600">{template.tamil}</p>
          <p class="text-xs text-gray-500 mt-2">{template.timeSlots.length} time slots</p>
        </button>
      {/each}
    </div>

    <!-- Festival Mode -->
    <div class="border-t pt-4">
      <h3 class="text-md font-medium text-gray-900 mb-3 flex items-center">
        <Icon icon="heroicons:star" class="w-4 h-4 mr-2 text-yellow-500" />
        Festival Mode
        <span class="ml-2 text-sm text-gray-500">பண்டிகை முறை</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        {#each Object.entries(FestivalStudyModes) as [festivalId, festival]}
          <button on:click={() => activateFestivalMode(festivalId)} class="p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-left {festivalMode === festivalId ? 'bg-orange-100' : ''}">
            <h4 class="font-medium text-orange-900">{festival.name}</h4>
            <p class="text-sm text-orange-700">{festival.tamil}</p>
            <p class="text-xs text-orange-600 mt-1">{festival.schedule}</p>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Today's Schedule -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-900 flex items-center">
        <Icon icon="heroicons:calendar-days" class="w-5 h-5 mr-2 text-green-600" />
        Today's Schedule
        <span class="ml-2 text-sm text-gray-500">இன்றைய அட்டவணை</span>
      </h2>

      <button on:click={addTimeSlot} class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
        <Icon icon="heroicons:plus" class="w-4 h-4" />
        <span>Add Slot</span>
      </button>
    </div>

    <div class="space-y-4">
      {#each currentPlan as slot, index}
        <div class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg {slot.completed ? 'bg-green-50 border-green-200' : 'bg-white'}">
          <!-- Completion Checkbox -->
          <button on:click={() => toggleSlotCompletion(slot.id)} class="flex-shrink-0">
            <Icon icon={slot.completed ? "heroicons:check-circle" : "heroicons:circle"} class="w-6 h-6 {slot.completed ? 'text-green-600' : 'text-gray-400'}" />
          </button>

          <!-- Time -->
          <div class="w-20">
            <input type="time" value={slot.time} on:change={(e) => updateSlot(slot.id, { time: e.target.value })} class="w-full text-sm border-none bg-transparent font-medium text-gray-900 focus:ring-0" />
          </div>

          <!-- Activity & Subject -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input type="text" value={slot.activity} on:change={(e) => updateSlot(slot.id, { activity: e.target.value })} placeholder="Study activity" class="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <select value={slot.subject} on:change={(e) => updateSlot(slot.id, { subject: e.target.value })} class="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Subject</option>
                {#each customSubjects as subject}
                  <option value={subject}>{subject}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Duration -->
          <div class="w-24">
            <div class="flex items-center space-x-1">
              <input type="number" value={slot.duration} on:change={(e) => updateSlot(slot.id, { duration: parseInt(e.target.value) || 0 })} min="15" max="180" step="15" class="w-16 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center" />
              <span class="text-xs text-gray-500">min</span>
            </div>
          </div>

          <!-- Difficulty Indicator -->
          {#if slot.subject}
            <div class="w-3 h-3 bg-{getDifficultyColor(slot.subject)}-400 rounded-full" title="Difficulty level"></div>
          {/if}

          <!-- Remove Button -->
          <button on:click={() => removeTimeSlot(slot.id)} class="flex-shrink-0 text-red-500 hover:text-red-700">
            <Icon icon="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
      {/each}
    </div>

    <!-- Add Notes Section -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-sm font-medium text-gray-900 mb-2 flex items-center">
        <Icon icon="heroicons:pencil-square" class="w-4 h-4 mr-2" />
        Daily Notes & Reflections
        <span class="ml-2 text-xs text-gray-500">நாள் குறிப்புகள்</span>
      </h3>
      <textarea placeholder="How did today's study session go? Any challenges or achievements?" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea>
    </div>
  </div>

  <!-- Motivational Section -->
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6">
    <div class="flex items-start space-x-4">
      <div class="bg-purple-100 p-3 rounded-lg">
        <Icon icon="heroicons:lightbulb" class="w-6 h-6 text-purple-600" />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Today's Learning Tip</h3>
        <p class="text-gray-700 mb-2">{getMotivationalTip()}</p>
        <p class="text-sm text-gray-500">Keep going, {student.name}! Every minute of study builds your future.</p>
        <p class="text-sm text-purple-600 mt-1">{student.name}, உன்னுடைய கடின உழைப்பு வெற்றிக்கு வழிவகுக்கும்!</p>
      </div>
    </div>
  </div>

  <!-- Weekly Overview -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <Icon icon="heroicons:chart-bar" class="w-5 h-5 mr-2 text-indigo-600" />
      This Week's Overview
      <span class="ml-2 text-sm text-gray-500">வார கண்ணோட்டம்</span>
    </h2>

    <div class="grid grid-cols-7 gap-2">
      {#each Array(7) as _, dayIndex}
        {@const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex]}
        {@const isToday = dayIndex === new Date().getDay()}
        {@const studyTime = Math.floor(Math.random() * 180) + 60}
        <!-- Mock data -->

        <div class="text-center p-3 rounded-lg {isToday ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}">
          <p class="text-xs font-medium text-gray-600">{dayName}</p>
          <p class="text-lg font-bold {isToday ? 'text-blue-700' : 'text-gray-900'}">{studyTime}m</p>
          <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div class="bg-blue-500 h-1 rounded-full" style="width: {Math.min(100, (studyTime / 180) * 100)}%"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
