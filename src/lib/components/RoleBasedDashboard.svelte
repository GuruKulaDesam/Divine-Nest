<script>
  import Icon from "@iconify/svelte";
  import { userRole, getCurrentRoleDashboard } from "$lib/stores/userRole.js";
  import VoiceAssistant from "./VoiceAssistant.svelte";
  import AmbientIntelligence from "./AmbientIntelligence.svelte";
  import SyncStatus from "./SyncStatus.svelte";

  let currentRole;
  let dashboardConfig;

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
    dashboardConfig = getCurrentRoleDashboard();
  });

  // Sample data for different roles
  const roleData = {
    mother: {
      todaysSchedule: [
        { time: "6:30 AM", task: "Temple visit", icon: "mdi:temple-hindu" },
        { time: "8:00 AM", task: "School pickup", icon: "mdi:school" },
        { time: "12:00 PM", task: "Lunch preparation", icon: "mdi:food" },
        { time: "4:00 PM", task: "Doctor appointment", icon: "mdi:doctor" }
      ],
      reminders: [
        { task: "Grocery shopping", urgent: true, icon: "mdi:cart" },
        { task: "School fee payment due", urgent: true, icon: "mdi:currency-inr" },
        { task: "Helper's monthly review", urgent: false, icon: "mdi:account-check" }
      ],
      quickStats: {
        pendingTasks: 8,
        completedToday: 12,
        familyMembers: 6,
        upcomingEvents: 3
      }
    },
    grandmother: {
      todaysSchedule: [
        { time: "6:00 AM", task: "Morning prayers", icon: "mdi:meditation" },
        { time: "7:00 AM", task: "BP medicine", icon: "mdi:pill" },
        { time: "10:00 AM", task: "Temple visit", icon: "mdi:temple-hindu" },
        { time: "6:00 PM", task: "Evening prayers", icon: "mdi:candle" }
      ],
      reminders: [
        { task: "Temple festival preparation", urgent: true, icon: "mdi:calendar-star" },
        { task: "Grandchildren's school results", urgent: false, icon: "mdi:school" },
        { task: "Family prayer time", urgent: false, icon: "mdi:account-group" }
      ],
      quickStats: {
        pendingTasks: 5,
        completedToday: 8,
        ritualsCompleted: 15,
        familyBlessings: 12
      }
    },
    helper: {
      todaysSchedule: [
        { time: "7:00 AM", task: "House cleaning", icon: "mdi:broom" },
        { time: "9:00 AM", task: "Cooking", icon: "mdi:chef-hat" },
        { time: "12:00 PM", task: "Laundry", icon: "mdi:washing-machine" },
        { time: "4:00 PM", task: "Shopping", icon: "mdi:cart" }
      ],
      reminders: [
        { task: "Monthly attendance submission", urgent: true, icon: "mdi:calendar-check" },
        { task: "Deep cleaning schedule", urgent: false, icon: "mdi:spray-bottle" },
        { task: "Salary discussion", urgent: false, icon: "mdi:cash" }
      ],
      quickStats: {
        pendingTasks: 6,
        completedToday: 10,
        hoursWorked: 8,
        performanceRating: 4.8
      }
    },
    teenager: {
      todaysSchedule: [
        { time: "7:00 AM", task: "Study time", icon: "mdi:book-open" },
        { time: "9:00 AM", task: "School", icon: "mdi:school" },
        { time: "3:00 PM", task: "Tuition", icon: "mdi:teach" },
        { time: "7:00 PM", task: "Homework", icon: "mdi:pencil" }
      ],
      reminders: [
        { task: "Math exam tomorrow", urgent: true, icon: "mdi:calculator" },
        { task: "Submit science project", urgent: true, icon: "mdi:microscope" },
        { task: "Practice guitar", urgent: false, icon: "mdi:guitar" }
      ],
      quickStats: {
        studyHours: 6,
        completedTasks: 4,
        moodScore: 8,
        achievements: 3
      }
    },
    father: {
      todaysSchedule: [
        { time: "8:00 AM", task: "Office work", icon: "mdi:briefcase" },
        { time: "12:00 PM", task: "Bank visit", icon: "mdi:bank" },
        { time: "6:00 PM", task: "Family time", icon: "mdi:account-group" },
        { time: "8:00 PM", task: "Bill payments", icon: "mdi:credit-card" }
      ],
      reminders: [
        { task: "Electricity bill due", urgent: true, icon: "mdi:lightning-bolt" },
        { task: "Car insurance renewal", urgent: true, icon: "mdi:car" },
        { task: "Family budget review", urgent: false, icon: "mdi:chart-line" }
      ],
      quickStats: {
        pendingPayments: 3,
        monthlyBudget: 85000,
        savingsGoal: 25000,
        investments: 5
      }
    },
    elder: {
      todaysSchedule: [
        { time: "6:00 AM", task: "Morning walk", icon: "mdi:walk" },
        { time: "7:00 AM", task: "Yoga", icon: "mdi:yoga" },
        { time: "10:00 AM", task: "Doctor visit", icon: "mdi:doctor" },
        { time: "6:00 PM", task: "Meditation", icon: "mdi:meditation" }
      ],
      reminders: [
        { task: "Monthly health checkup", urgent: true, icon: "mdi:stethoscope" },
        { task: "Family gathering", urgent: false, icon: "mdi:account-multiple" },
        { task: "Temple visit", urgent: false, icon: "mdi:temple-hindu" }
      ],
      quickStats: {
        healthScore: 85,
        meditationDays: 28,
        familyVisits: 12,
        peacefulMoments: 45
      }
    }
  };

  $: currentData = roleData[currentRole] || roleData.mother;
</script>

<div class="role-dashboard {dashboardConfig?.primaryColor || 'bg-gray-50'} min-h-screen p-6">
  <!-- Ambient Intelligence -->
  <div class="max-w-6xl mx-auto mb-8">
    <AmbientIntelligence />
  </div>

  <!-- Sync Status -->
  <div class="max-w-6xl mx-auto mb-8">
    <SyncStatus />
  </div>

  <!-- Header -->
  <div class="max-w-6xl mx-auto mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          {dashboardConfig?.title || 'Dashboard'}
        </h1>
        <p class="text-gray-600">Welcome back! Here's your personalized overview.</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-right">
          <p class="text-sm text-gray-500">Today's Date</p>
          <p class="font-semibold">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="max-w-6xl mx-auto mb-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each Object.entries(currentData.quickStats) as [key, value]}
        <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p class="text-2xl font-bold text-gray-800">{value}</p>
            </div>
            <Icon icon="mdi:chart-line" class="w-8 h-8 text-blue-500" />
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Main Content Grid -->
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Today's Schedule -->
    <div class="lg:col-span-2">
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          <Icon icon="mdi:calendar-clock" class="w-6 h-6 text-gray-400" />
        </div>
        <div class="space-y-3">
          {#each currentData.todaysSchedule as item}
            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Icon icon={item.icon} class="w-5 h-5 {dashboardConfig?.accentColor || 'text-blue-500'}" />
              <div class="flex-1">
                <p class="font-medium text-gray-800">{item.task}</p>
                <p class="text-sm text-gray-500">{item.time}</p>
              </div>
              <Icon icon="mdi:chevron-right" class="w-5 h-5 text-gray-400" />
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Reminders -->
    <div>
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Important Reminders</h2>
          <Icon icon="mdi:bell-ring" class="w-6 h-6 text-gray-400" />
        </div>
        <div class="space-y-3">
          {#each currentData.reminders as reminder}
            <div class="flex items-start space-x-3 p-3 {reminder.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50'} rounded-lg">
              <Icon icon={reminder.icon} class="w-5 h-5 {reminder.urgent ? 'text-red-500' : dashboardConfig?.accentColor || 'text-blue-500'} mt-0.5" />
              <div class="flex-1">
                <p class="font-medium {reminder.urgent ? 'text-red-800' : 'text-gray-800'}">{reminder.task}</p>
                {#if reminder.urgent}
                  <span class="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full mt-1">Urgent</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="max-w-6xl mx-auto mt-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Voice Assistant -->
      <div>
        <VoiceAssistant />
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 gap-4">
          {#each dashboardConfig?.quickActions || [] as action}
            <button class="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="mdi:{action.replace('_', '-')}" class="w-8 h-8 {dashboardConfig?.accentColor || 'text-blue-500'} mb-2" />
              <span class="text-sm font-medium text-gray-700 capitalize">
                {action.replace(/_/g, ' ')}
              </span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>