<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { userRole } from "$lib/stores/userRole.js";
  import { offlineSync } from "$lib/utils/offlineSync.js";
  import VoiceAssistant from "./VoiceAssistant.svelte";
  import AmbientIntelligence from "./AmbientIntelligence.svelte";

  export let currentTab = 'home';
  export let currentRole = null;
  export let userLocation = null;
  export let isOnline = true;

  let voiceAssistantVisible = false;
  let ambientSuggestions = [];

  // Role-specific dashboard data
  const dashboardData = {
    mother: {
      home: {
        urgentAlerts: [
          { id: 1, type: 'gas', message: 'Gas refill overdue by 2 days', priority: 'high', action: 'Order Gas' },
          { id: 2, type: 'milk', message: 'Milk not delivered today', priority: 'medium', action: 'Call Vendor' }
        ],
        todaysTasks: [
          { id: 1, task: 'School pickup at 4 PM', completed: false, assignee: 'self' },
          { id: 2, task: 'Grocery shopping', completed: false, assignee: 'self' },
          { id: 3, task: 'Helper: Clean pooja room', completed: false, assignee: 'helper' }
        ],
        helperStatus: { name: 'Lakshmi', tasksCompleted: 3, tasksPending: 2, attendance: 'present' },
        schoolTracker: { feesDue: 2500, examDate: '2025-10-15', events: ['PTA Meeting', 'Sports Day'] },
        groceryStatus: { pendingItems: 5, deliveryExpected: 'Tomorrow', budgetRemaining: 1200 }
      },
      tasks: {
        categories: ['School', 'Helper Duties', 'Maintenance', 'Festival Prep', 'Travel'],
        urgentTasks: [
          { id: 1, title: 'Pay school fees', dueDate: '2025-10-12', priority: 'high' },
          { id: 2, title: 'Temple visit for Navratri', dueDate: '2025-10-13', priority: 'medium' }
        ]
      },
      resources: {
        groceryList: ['Turmeric', 'Rice', 'Vegetables', 'Milk'],
        bills: [
          { type: 'Electricity', amount: 1250, dueDate: '2025-10-15', status: 'pending' },
          { type: 'School Fees', amount: 2500, dueDate: '2025-10-12', status: 'overdue' }
        ],
        inventory: { gas: 2, milk: 1, water: '75%' },
        periodTracker: { nextPeriod: '2025-10-18', fertileWindow: '2025-10-20 to 2025-10-24' }
      },
      people: {
        familyMembers: ['Father', 'Children (2)', 'Grandparents'],
        helpers: [{ name: 'Lakshmi', role: 'House Help', rating: 4.8, tasksCompleted: 245 }],
        permissions: { viewAllTasks: true, manageFinances: true, addMembers: true }
      }
    },
    father: {
      home: {
        urgentAlerts: [
          { id: 1, type: 'maintenance', message: 'Water tank cleaning overdue', priority: 'high', action: 'Schedule Service' },
          { id: 2, type: 'bills', message: 'Electricity bill due tomorrow', priority: 'medium', action: 'Pay Bill' }
        ],
        todaysTasks: [
          { id: 1, task: 'Check inverter battery', completed: false, assignee: 'self' },
          { id: 2, task: 'Review monthly expenses', completed: false, assignee: 'self' }
        ],
        maintenanceQueue: [
          { id: 1, item: 'Water Tank', lastServiced: '2025-08-15', nextDue: '2025-10-15', status: 'overdue' },
          { id: 2, item: 'Inverter', lastServiced: '2025-09-01', nextDue: '2025-11-01', status: 'upcoming' }
        ],
        billsSummary: { totalDue: 3750, paidThisMonth: 15200, savings: 8500 }
      },
      tasks: {
        categories: ['Maintenance', 'Finances', 'Infrastructure', 'Travel'],
        urgentTasks: [
          { id: 1, title: 'Water tank cleaning', dueDate: '2025-10-12', priority: 'high' },
          { id: 2, title: 'Car insurance renewal', dueDate: '2025-10-20', priority: 'medium' }
        ]
      },
      resources: {
        bills: [
          { type: 'Electricity', amount: 1250, dueDate: '2025-10-15', status: 'pending' },
          { type: 'Water', amount: 450, dueDate: '2025-10-18', status: 'pending' },
          { type: 'Internet', amount: 899, dueDate: '2025-10-20', status: 'pending' }
        ],
        infrastructure: { waterTank: '75%', inverter: '90%', plumbing: 'good', electrical: 'good' },
        budget: { monthlyLimit: 25000, spent: 15200, remaining: 9800 }
      },
      people: {
        familyMembers: ['Mother', 'Children (2)', 'Grandparents'],
        helpers: [{ name: 'Lakshmi', role: 'House Help', rating: 4.8, lastTask: 'Kitchen cleaning' }],
        permissions: { viewTasks: true, manageFinances: true, approveMaintenance: true }
      }
    },
    grandmother: {
      home: {
        todaysRituals: [
          { id: 1, ritual: 'Morning Prayer', time: '6:00 AM', completed: true },
          { id: 2, ritual: 'Temple Visit', time: '10:00 AM', completed: false },
          { id: 3, ritual: 'Evening Aarti', time: '6:30 PM', completed: false }
        ],
        medicineReminders: [
          { id: 1, medicine: 'BP Medicine', time: '8:00 AM', taken: true },
          { id: 2, medicine: 'Diabetes Pills', time: '2:00 PM', taken: false },
          { id: 3, medicine: 'Calcium', time: '8:00 PM', taken: false }
        ],
        festivalCountdown: { festival: 'Navratri', daysLeft: 3, preparations: ['Temple decoration', 'Special prayers'] },
        voiceNotes: [
          { from: 'Daughter', message: 'Amma, remember to take your medicine', timestamp: '2 hours ago' },
          { from: 'Grandson', message: 'Paati, I got good marks in math!', timestamp: '1 day ago' }
        ]
      },
      rituals: {
        dailyRituals: ['Morning Prayer', 'Pooja', 'Evening Aarti', 'Meditation'],
        upcomingFestivals: [
          { name: 'Navratri', date: '2025-10-13', preparations: ['Fast', 'Temple visits', 'Special prayers'] },
          { name: 'Diwali', date: '2025-11-05', preparations: ['House cleaning', 'Lamps', 'Sweets'] }
        ],
        templeSchedule: { nearestTemple: 'Mariamman Temple', nextVisit: 'Tomorrow 10 AM', specialEvents: 'Navratri prayers' }
      },
      health: {
        medicineSchedule: [
          { medicine: 'BP Medicine', dosage: '1 tablet', frequency: 'Daily', nextDose: '8:00 PM' },
          { medicine: 'Diabetes', dosage: '2 tablets', frequency: 'Twice daily', nextDose: '2:00 PM' }
        ],
        healthStats: { bp: '120/80', sugar: '140 mg/dL', weight: '65 kg', lastCheckup: '2025-09-15' },
        appointments: [
          { doctor: 'Cardiologist', date: '2025-10-20', time: '11:00 AM', reason: 'Regular checkup' }
        ]
      },
      family: {
        calendar: [
          { event: 'Navratri starts', date: '2025-10-13', type: 'festival' },
          { event: 'Grandson exam', date: '2025-10-15', type: 'education' },
          { event: 'Family gathering', date: '2025-10-18', type: 'social' }
        ],
        voiceMessages: [
          { from: 'Daughter-in-law', message: 'Amma, Lakshmi will help with temple preparations', urgent: false },
          { from: 'Son', message: 'Amma, doctor appointment confirmed for next week', urgent: true }
        ],
        travelPlans: [
          { destination: 'Tirupati Temple', date: '2025-11-15', purpose: 'Pilgrimage', companions: 'Family' }
        ]
      }
    },
    child: {
      home: {
        todaysChores: [
          { id: 1, chore: 'Fold clothes', completed: false, reward: 2, difficulty: 'easy' },
          { id: 2, chore: 'Water plants', completed: false, reward: 3, difficulty: 'medium' },
          { id: 3, chore: 'Clean study table', completed: true, reward: 1, difficulty: 'easy' }
        ],
        starsEarned: 15,
        schoolEvents: [
          { event: 'Math Exam', date: '2025-10-15', preparation: 'Revision needed' },
          { event: 'Sports Day', date: '2025-10-18', participation: '100m race' }
        ],
        friendlyNudges: [
          { message: 'Great job on homework yesterday! Keep it up! 🌟', type: 'positive' },
          { message: 'Remember to practice math problems today 📚', type: 'reminder' }
        ]
      },
      tasks: {
        choreList: [
          { chore: 'Make bed', completed: true, stars: 1, category: 'morning' },
          { chore: 'Brush teeth', completed: true, stars: 1, category: 'morning' },
          { chore: 'Fold clothes', completed: false, stars: 2, category: 'afternoon' },
          { chore: 'Water plants', completed: false, stars: 3, category: 'evening' },
          { chore: 'Clean study table', completed: true, stars: 1, category: 'evening' }
        ],
        studyGoals: [
          { subject: 'Math', goal: 'Complete 20 problems', completed: false, deadline: 'Today' },
          { subject: 'Science', goal: 'Read chapter 5', completed: true, deadline: 'Yesterday' }
        ]
      },
      rewards: {
        totalStars: 47,
        badges: ['Early Bird', 'Plant Lover', 'Study Star', 'Helper'],
        availableRewards: [
          { reward: 'Extra TV time (30 min)', cost: 5, available: true },
          { reward: 'Favorite snack', cost: 8, available: true },
          { reward: 'Park visit', cost: 15, available: false }
        ],
        redeemedThisWeek: 3
      },
      calendar: {
        schoolEvents: [
          { event: 'Math Exam', date: '2025-10-15', type: 'exam' },
          { event: 'Sports Day', date: '2025-10-18', type: 'sports' },
          { event: 'PTA Meeting', date: '2025-10-20', type: 'meeting' }
        ],
        holidays: [
          { holiday: 'Diwali', date: '2025-11-05', days: 5 },
          { holiday: 'Christmas', date: '2025-12-25', days: 1 }
        ],
        birthdays: [
          { person: 'Mom', date: '2025-11-15' },
          { person: 'Dad', date: '2025-12-08' }
        ]
      }
    },
    helper: {
      home: {
        todaysTasks: [
          { id: 1, task: 'Clean kitchen', completed: false, priority: 'high', room: 'Kitchen' },
          { id: 2, task: 'Wash clothes', completed: false, priority: 'medium', room: 'Laundry' },
          { id: 3, task: 'Clean pooja room', completed: true, priority: 'high', room: 'Pooja Room' }
        ],
        clockStatus: { clockedIn: true, clockInTime: '9:00 AM', hoursToday: 4.5 },
        notesFromAmma: [
          { message: 'Please clean the pooja room before temple visit tomorrow', urgent: true, timestamp: 'Yesterday' },
          { message: 'Buy vegetables on the way back', urgent: false, timestamp: 'Today 8 AM' }
        ],
        attendance: { presentDays: 22, absentDays: 1, leaveBalance: 5 }
      },
      tasks: {
        dailyDuties: [
          { task: 'Kitchen cleaning', completed: true, time: '10:00 AM', room: 'Kitchen' },
          { task: 'Laundry', completed: false, time: '11:00 AM', room: 'Laundry' },
          { task: 'Pooja room cleaning', completed: true, time: '2:00 PM', room: 'Pooja Room' },
          { task: 'Floor mopping', completed: false, time: '4:00 PM', room: 'Living Room' }
        ],
        roomChecklists: {
          kitchen: ['Clean countertops', 'Wash utensils', 'Mop floor', 'Take out trash'],
          pooja_room: ['Dust idols', 'Clean lamps', 'Arrange flowers', 'Light incense'],
          laundry: ['Sort clothes', 'Wash machine load', 'Fold clothes', 'Iron clothes']
        }
      },
      attendance: {
        todayStatus: { clockedIn: true, clockInTime: '9:00 AM', breakTime: '1 hour' },
        weeklyHours: 42,
        monthlyStats: { present: 22, absent: 1, halfDay: 0, overtime: 3 },
        leaveRequests: [
          { date: '2025-10-15', reason: 'Family function', status: 'pending' }
        ]
      },
      notes: {
        instructions: [
          { from: 'Amma', message: 'Please prepare sambar for lunch today', time: 'Today 7 AM', played: true },
          { from: 'Appa', message: 'Check the inverter battery level', time: 'Yesterday', played: false },
          { from: 'Amma', message: 'Buy milk on the way back', time: 'Today 8 AM', played: false }
        ],
        voiceMessages: [
          { id: 1, from: 'Amma', duration: '0:32', played: true, transcript: 'Please clean the windows today' },
          { id: 2, from: 'Appa', duration: '0:45', played: false, transcript: 'Check water tank level' }
        ]
      }
    }
  };

  // Subscribe to role changes
  userRole.subscribe(role => {
    currentRole = role;
  });

  onMount(async () => {
    // Load ambient suggestions
    await loadAmbientSuggestions();
  });

  async function loadAmbientSuggestions() {
    try {
      const suggestions = await offlineSync.getAllData('ambient_suggestions', 'user_id', currentRole || 'default');
      ambientSuggestions = suggestions.slice(-3); // Show last 3 suggestions
    } catch (error) {
      console.warn('Failed to load ambient suggestions:', error);
    }
  }

  function toggleVoiceAssistant() {
    voiceAssistantVisible = !voiceAssistantVisible;
  }

  function executeVoiceCommand(command) {
    console.log('Executing voice command:', command);
    // Voice command processing would go here
  }

  function getCurrentDashboardData() {
    return dashboardData[currentRole] || dashboardData.mother;
  }

  function getTabContent() {
    const data = getCurrentDashboardData();
    return data[currentTab] || {};
  }

  // Computed properties for easy access
  $: currentData = getCurrentDashboardData();
  $: tabData = getTabContent();
</script>

<!-- Voice Assistant Overlay -->
{#if voiceAssistantVisible}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
    <div class="bg-white rounded-t-3xl w-full max-h-96 overflow-hidden">
      <VoiceAssistant on:close={() => voiceAssistantVisible = false} />
    </div>
  </div>
{/if}

<!-- Main Dashboard Content -->
<div class="mobile-dashboard p-4 pb-24">
  <!-- Header with Voice Button -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-800 capitalize">
        {currentRole || 'Family'} Dashboard
      </h1>
      <p class="text-sm text-gray-600">
        {new Date().toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>

    <!-- Voice Assistant Button -->
    <button
      on:click={toggleVoiceAssistant}
      class="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
    >
      <Icon icon="mdi:microphone" class="w-6 h-6" />
    </button>
  </div>

  <!-- Ambient Intelligence Suggestions -->
  {#if ambientSuggestions.length > 0}
    <div class="mb-6">
      <AmbientIntelligence />
    </div>
  {/if}

  <!-- Tab Content -->
  {#if currentTab === 'home'}
    <!-- HOME TAB - Role-specific prioritized content -->
    {#if currentRole === 'mother'}
      <!-- Mother Home Dashboard -->
      <div class="space-y-6">
        <!-- Urgent Alerts -->
        {#if currentData.home.urgentAlerts.length > 0}
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center space-x-2 mb-3">
              <Icon icon="mdi:alert-circle" class="w-5 h-5 text-red-600" />
              <h3 class="font-semibold text-red-800">Urgent Alerts</h3>
            </div>
            <div class="space-y-2">
              {#each currentData.home.urgentAlerts as alert}
                <div class="flex items-center justify-between bg-white p-3 rounded-md">
                  <span class="text-sm text-gray-700">{alert.message}</span>
                  <button class="text-xs bg-red-600 text-white px-3 py-1 rounded-full">
                    {alert.action}
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Today's Tasks -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Today's Tasks</h3>
          <div class="space-y-2">
            {#each currentData.home.todaysTasks as task}
              <div class="flex items-center space-x-3">
                <input type="checkbox" bind:checked={task.completed} class="w-4 h-4 text-blue-600" />
                <span class="text-sm {task.completed ? 'line-through text-gray-500' : 'text-gray-700'}">
                  {task.task}
                </span>
                <span class="text-xs text-gray-500 ml-auto">{task.assignee}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Helper Status -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Helper Status</h3>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">{currentData.home.helperStatus.name}</p>
              <p class="text-sm text-gray-600">Present today</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-green-600">{currentData.home.helperStatus.tasksCompleted} completed</p>
              <p class="text-sm text-orange-600">{currentData.home.helperStatus.tasksPending} pending</p>
            </div>
          </div>
        </div>

        <!-- School Tracker -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-3">School Tracker</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-blue-700">Fees Due</span>
              <span class="font-medium text-red-600">₹{currentData.home.schoolTracker.feesDue}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-blue-700">Next Exam</span>
              <span class="text-sm">{currentData.home.schoolTracker.examDate}</span>
            </div>
          </div>
        </div>

        <!-- Grocery Status -->
        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 mb-3">Grocery Status</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-green-700">Pending Items</span>
              <span class="font-medium">{currentData.home.groceryStatus.pendingItems}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-green-700">Delivery</span>
              <span class="text-sm">{currentData.home.groceryStatus.deliveryExpected}</span>
            </div>
          </div>
        </div>
      </div>

    {:else if currentRole === 'father'}
      <!-- Father Home Dashboard -->
      <div class="space-y-6">
        <!-- Urgent Infrastructure Alerts -->
        {#if currentData.home.urgentAlerts.length > 0}
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div class="flex items-center space-x-2 mb-3">
              <Icon icon="mdi:wrench" class="w-5 h-5 text-orange-600" />
              <h3 class="font-semibold text-orange-800">Infrastructure Alerts</h3>
            </div>
            <div class="space-y-2">
              {#each currentData.home.urgentAlerts as alert}
                <div class="flex items-center justify-between bg-white p-3 rounded-md">
                  <span class="text-sm text-gray-700">{alert.message}</span>
                  <button class="text-xs bg-orange-600 text-white px-3 py-1 rounded-full">
                    {alert.action}
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Maintenance Queue -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Maintenance Queue</h3>
          <div class="space-y-3">
            {#each currentData.home.maintenanceQueue as item}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p class="font-medium text-gray-800">{item.item}</p>
                  <p class="text-sm text-gray-600">Last serviced: {item.lastServiced}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded-full {item.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}">
                  {item.status}
                </span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Bills Summary -->
        <div class="bg-red-50 rounded-lg p-4">
          <h3 class="font-semibold text-red-800 mb-3">Bills Summary</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-sm text-red-700">Total Due</p>
              <p class="font-bold text-red-800">₹{currentData.home.billsSummary.totalDue}</p>
            </div>
            <div>
              <p class="text-sm text-red-700">Paid This Month</p>
              <p class="font-bold text-green-800">₹{currentData.home.billsSummary.paidThisMonth}</p>
            </div>
            <div>
              <p class="text-sm text-red-700">Savings</p>
              <p class="font-bold text-blue-800">₹{currentData.home.billsSummary.savings}</p>
            </div>
          </div>
        </div>
      </div>

    {:else if currentRole === 'grandmother'}
      <!-- Grandmother Home Dashboard -->
      <div class="space-y-6">
        <!-- Today's Rituals -->
        <div class="bg-orange-50 rounded-lg p-4">
          <h3 class="font-semibold text-orange-800 mb-3">Today's Rituals</h3>
          <div class="space-y-2">
            {#each currentData.home.todaysRituals as ritual}
              <div class="flex items-center space-x-3">
                <input type="checkbox" bind:checked={ritual.completed} class="w-4 h-4 text-orange-600" />
                <div class="flex-1">
                  <span class="text-sm font-medium {ritual.completed ? 'line-through text-gray-500' : 'text-gray-700'}">
                    {ritual.ritual}
                  </span>
                  <span class="text-xs text-gray-500 ml-2">{ritual.time}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Medicine Reminders -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center space-x-2 mb-3">
            <Icon icon="mdi:pill" class="w-5 h-5 text-red-600" />
            <h3 class="font-semibold text-red-800">Medicine Reminders</h3>
          </div>
          <div class="space-y-2">
            {#each currentData.home.medicineReminders as medicine}
              <div class="flex items-center justify-between bg-white p-3 rounded-md">
                <div>
                  <span class="font-medium text-gray-800">{medicine.medicine}</span>
                  <span class="text-sm text-gray-600 ml-2">{medicine.time}</span>
                </div>
                <div class="flex items-center space-x-2">
                  {#if medicine.taken}
                    <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-600" />
                  {:else}
                    <button class="text-xs bg-red-600 text-white px-3 py-1 rounded-full">
                      Take Now
                    </button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Festival Countdown -->
        <div class="bg-purple-50 rounded-lg p-4">
          <h3 class="font-semibold text-purple-800 mb-3">Festival Countdown</h3>
          <div class="text-center">
            <p class="text-2xl font-bold text-purple-800">{currentData.home.festivalCountdown.daysLeft}</p>
            <p class="text-sm text-purple-700">days until {currentData.home.festivalCountdown.festival}</p>
          </div>
        </div>

        <!-- Voice Notes from Family -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-3">Voice Notes from Family</h3>
          <div class="space-y-2">
            {#each currentData.home.voiceNotes as note}
              <div class="bg-white p-3 rounded-md">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-medium text-blue-800">{note.from}</span>
                  <span class="text-xs text-gray-500">{note.timestamp}</span>
                </div>
                <p class="text-sm text-gray-700">{note.message}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if currentRole === 'child'}
      <!-- Child Home Dashboard -->
      <div class="space-y-6">
        <!-- Stars Earned -->
        <div class="bg-yellow-50 rounded-lg p-4 text-center">
          <Icon icon="mdi:star" class="w-12 h-12 text-yellow-500 mx-auto mb-2" />
          <p class="text-2xl font-bold text-yellow-800">{currentData.home.starsEarned}</p>
          <p class="text-sm text-yellow-700">Stars Earned This Week</p>
        </div>

        <!-- Today's Chores -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Today's Chores</h3>
          <div class="space-y-2">
            {#each currentData.home.todaysChores as chore}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" bind:checked={chore.completed} class="w-4 h-4 text-green-600" />
                  <span class="text-sm {chore.completed ? 'line-through text-gray-500' : 'text-gray-700'}">
                    {chore.chore}
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {chore.reward} ⭐
                  </span>
                  <span class="text-xs px-2 py-1 rounded-full {chore.difficulty === 'easy' ? 'bg-green-100 text-green-700' : chore.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">
                    {chore.difficulty}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Friendly Nudges -->
        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 mb-3">Friendly Nudges</h3>
          <div class="space-y-2">
            {#each currentData.home.friendlyNudges as nudge}
              <div class="bg-white p-3 rounded-md">
                <p class="text-sm text-gray-700">{nudge.message}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- School Events -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-3">School Events</h3>
          <div class="space-y-2">
            {#each currentData.home.schoolEvents as event}
              <div class="bg-white p-3 rounded-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-blue-800">{event.event}</p>
                    <p class="text-sm text-blue-700">{event.date}</p>
                  </div>
                  {#if event.preparation}
                    <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      {event.preparation}
                    </span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if currentRole === 'helper'}
      <!-- Helper Home Dashboard -->
      <div class="space-y-6">
        <!-- Clock Status -->
        <div class="bg-green-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <Icon icon="mdi:clock" class="w-5 h-5 text-green-600" />
              <h3 class="font-semibold text-green-800">Clock Status</h3>
            </div>
            <span class="text-xs px-2 py-1 rounded-full {currentData.home.clockStatus.clockedIn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
              {currentData.home.clockStatus.clockedIn ? 'Clocked In' : 'Clocked Out'}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <p class="text-sm text-green-700">Clock In Time</p>
              <p class="font-medium">{currentData.home.clockStatus.clockInTime}</p>
            </div>
            <div>
              <p class="text-sm text-green-700">Hours Today</p>
              <p class="font-medium">{currentData.home.clockStatus.hoursToday}h</p>
            </div>
          </div>
        </div>

        <!-- Today's Tasks -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Today's Tasks</h3>
          <div class="space-y-2">
            {#each currentData.home.todaysTasks as task}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" bind:checked={task.completed} class="w-4 h-4 text-blue-600" />
                  <span class="text-sm {task.completed ? 'line-through text-gray-500' : 'text-gray-700'}">
                    {task.task}
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full {task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}">
                    {task.priority}
                  </span>
                  <span class="text-xs text-gray-500">{task.room}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Notes from Amma -->
        <div class="bg-purple-50 rounded-lg p-4">
          <h3 class="font-semibold text-purple-800 mb-3">Notes from Amma</h3>
          <div class="space-y-2">
            {#each currentData.home.notesFromAmma as note}
              <div class="bg-white p-3 rounded-md">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-gray-500">{note.timestamp}</span>
                  {#if note.urgent}
                    <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Urgent</span>
                  {/if}
                </div>
                <p class="text-sm text-gray-700">{note.message}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

  {:else if currentTab === 'tasks'}
    <!-- TASKS TAB - Role-specific task management -->
    {#if currentRole === 'mother'}
      <!-- Mother Tasks -->
      <div class="space-y-6">
        <!-- Task Categories -->
        <div class="grid grid-cols-2 gap-3">
          {#each currentData.tasks.categories as category}
            <button class="bg-white p-4 rounded-lg shadow-sm text-center hover:bg-gray-50 transition-colors">
              <Icon icon="mdi:clipboard-list" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span class="text-sm font-medium text-gray-700">{category}</span>
            </button>
          {/each}
        </div>

        <!-- Urgent Tasks -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="font-semibold text-red-800 mb-3">Urgent Tasks</h3>
          <div class="space-y-2">
            {#each currentData.tasks.urgentTasks as task}
              <div class="flex items-center justify-between bg-white p-3 rounded-md">
                <span class="text-sm text-gray-700">{task.title}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full {task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}">
                    {task.priority}
                  </span>
                  <span class="text-xs text-gray-500">{task.dueDate}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if currentRole === 'child'}
      <!-- Child Tasks -->
      <div class="space-y-6">
        <!-- Chore List -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Today's Chores</h3>
          <div class="space-y-2">
            {#each currentData.tasks.choreList as chore}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" bind:checked={chore.completed} class="w-4 h-4 text-green-600" />
                  <span class="text-sm {chore.completed ? 'line-through text-gray-500' : 'text-gray-700'}">
                    {chore.chore}
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {chore.stars} ⭐
                  </span>
                  <span class="text-xs text-gray-500">{chore.category}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Study Goals -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-3">Study Goals</h3>
          <div class="space-y-2">
            {#each currentData.tasks.studyGoals as goal}
              <div class="flex items-center justify-between bg-white p-3 rounded-md">
                <div>
                  <span class="font-medium text-blue-800">{goal.subject}</span>
                  <p class="text-sm text-blue-700">{goal.goal}</p>
                </div>
                <div class="flex items-center space-x-2">
                  {#if goal.completed}
                    <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-600" />
                  {:else}
                    <span class="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                      {goal.deadline}
                    </span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    {:else if currentRole === 'helper'}
      <!-- Helper Tasks -->
      <div class="space-y-6">
        <!-- Daily Duties -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Daily Duties</h3>
          <div class="space-y-2">
            {#each currentData.tasks.dailyDuties as duty}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" bind:checked={duty.completed} class="w-4 h-4 text-blue-600" />
                  <span class="text-sm {duty.completed ? 'line-through text-gray-500' : 'text-gray-700'}">
                    {duty.task}
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">{duty.time}</p>
                  <p class="text-xs text-gray-500">{duty.room}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Room Checklists -->
        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 mb-3">Room Checklists</h3>
          {#each Object.entries(currentData.tasks.roomChecklists) as [room, tasks]}
            <div class="mb-4">
              <h4 class="font-medium text-green-800 capitalize mb-2">{room.replace('_', ' ')}</h4>
              <div class="space-y-1">
                {#each tasks as task}
                  <div class="flex items-center space-x-2">
                    <input type="checkbox" class="w-3 h-3 text-green-600" />
                    <span class="text-sm text-green-700">{task}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

  {:else if currentTab === 'resources'}
    <!-- RESOURCES TAB - Available for Mother and Father -->
    {#if currentRole === 'mother'}
      <!-- Mother Resources -->
      <div class="space-y-6">
        <!-- Grocery List -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-800">Grocery List</h3>
            <button class="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
              Add Item
            </button>
          </div>
          <div class="space-y-2">
            {#each currentData.resources.groceryList as item}
              <div class="flex items-center space-x-3">
                <input type="checkbox" class="w-4 h-4 text-blue-600" />
                <span class="text-sm text-gray-700">{item}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Bills -->
        <div class="bg-red-50 rounded-lg p-4">
          <h3 class="font-semibold text-red-800 mb-3">Bills & Payments</h3>
          <div class="space-y-2">
            {#each currentData.resources.bills as bill}
              <div class="flex items-center justify-between bg-white p-3 rounded-md">
                <div>
                  <span class="font-medium text-gray-800">{bill.type}</span>
                  <p class="text-sm text-gray-600">Due: {bill.dueDate}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-red-600">₹{bill.amount}</p>
                  <span class="text-xs px-2 py-1 rounded-full {bill.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}">
                    {bill.status}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Inventory -->
        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 mb-3">Inventory Status</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-sm text-green-700">Gas</p>
              <p class="font-bold text-green-800">{currentData.resources.inventory.gas} cylinders</p>
            </div>
            <div>
              <p class="text-sm text-green-700">Milk</p>
              <p class="font-bold text-green-800">{currentData.resources.inventory.milk} packets</p>
            </div>
            <div>
              <p class="text-sm text-green-700">Water Tank</p>
              <p class="font-bold text-green-800">{currentData.resources.inventory.water}</p>
            </div>
          </div>
        </div>
      </div>

    {:else if currentRole === 'father'}
      <!-- Father Resources -->
      <div class="space-y-6">
        <!-- Bills -->
        <div class="bg-red-50 rounded-lg p-4">
          <h3 class="font-semibold text-red-800 mb-3">Bills & Payments</h3>
          <div class="space-y-2">
            {#each currentData.resources.bills as bill}
              <div class="flex items-center justify-between bg-white p-3 rounded-md">
                <div>
                  <span class="font-medium text-gray-800">{bill.type}</span>
                  <p class="text-sm text-gray-600">Due: {bill.dueDate}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-red-600">₹{bill.amount}</p>
                  <span class="text-xs px-2 py-1 rounded-full {bill.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}">
                    {bill.status}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Infrastructure -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-3">Infrastructure Status</h3>
          <div class="grid grid-cols-2 gap-4">
            {#each Object.entries(currentData.resources.infrastructure) as [item, status]}
              <div class="text-center">
                <p class="text-sm text-blue-700 capitalize">{item.replace(/([A-Z])/g, ' $1')}</p>
                <p class="font-bold text-blue-800">{status}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- Budget Overview -->
        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 mb-3">Budget Overview</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-sm text-green-700">Monthly Limit</p>
              <p class="font-bold text-green-800">₹{currentData.resources.budget.monthlyLimit}</p>
            </div>
            <div>
              <p class="text-sm text-green-700">Spent</p>
              <p class="font-bold text-red-600">₹{currentData.resources.budget.spent}</p>
            </div>
            <div>
              <p class="text-sm text-green-700">Remaining</p>
              <p class="font-bold text-blue-600">₹{currentData.resources.budget.remaining}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

  {:else if currentTab === 'people'}
    <!-- PEOPLE TAB - Available for Mother and Father -->
    {#if currentRole === 'mother' || currentRole === 'father'}
      <div class="space-y-6">
        <!-- Family Members -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h3 class="font-semibold text-gray-800 mb-3">Family Members</h3>
          <div class="space-y-2">
            {#each currentData.people.familyMembers as member}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span class="text-sm text-gray-700">{member}</span>
                <Icon icon="mdi:account" class="w-5 h-5 text-gray-400" />
              </div>
            {/each}
          </div>
        </div>

        <!-- Helpers -->
        {#if currentData.people.helpers}
          <div class="bg-blue-50 rounded-lg p-4">
            <h3 class="font-semibold text-blue-800 mb-3">Helpers</h3>
            <div class="space-y-2">
              {#each currentData.people.helpers as helper}
                <div class="bg-white p-3 rounded-md">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-blue-800">{helper.name}</span>
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {helper.rating} ⭐
                    </span>
                  </div>
                  <p class="text-sm text-blue-700">{helper.role}</p>
                  {#if helper.tasksCompleted}
                    <p class="text-xs text-gray-600 mt-1">{helper.tasksCompleted} tasks completed</p>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Permissions Matrix -->
        <div class="bg-purple-50 rounded-lg p-4">
          <h3 class="font-semibold text-purple-800 mb-3">Permissions Matrix</h3>
          <div class="space-y-2">
            {#each Object.entries(currentData.people.permissions) as [permission, allowed]}
              <div class="flex items-center justify-between bg-white p-3 rounded-md">
                <span class="text-sm text-gray-700 capitalize">{permission.replace(/([A-Z])/g, ' $1')}</span>
                <Icon icon={allowed ? "mdi:check-circle" : "mdi:close-circle"} class="w-5 h-5 {allowed ? 'text-green-600' : 'text-red-600'}" />
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}

  {:else if currentTab === 'settings'}
    <!-- SETTINGS TAB - Common across roles -->
    <div class="space-y-6">
      <!-- Profile Settings -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <h3 class="font-semibold text-gray-800 mb-3">Profile Settings</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Language</label>
            <select class="w-full p-2 border border-gray-300 rounded-md">
              <option>Tamil (தமிழ்)</option>
              <option>English</option>
              <option>Hindi (हिंदी)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Notifications</label>
            <div class="flex items-center space-x-2">
              <input type="checkbox" class="w-4 h-4 text-blue-600" checked />
              <span class="text-sm text-gray-700">Enable notifications</span>
            </div>
          </div>
        </div>
      </div>

      <!-- App Settings -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <h3 class="font-semibold text-gray-800 mb-3">App Settings</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Theme</label>
            <select class="w-full p-2 border border-gray-300 rounded-md">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Offline Mode</label>
            <div class="flex items-center space-x-2">
              <input type="checkbox" class="w-4 h-4 text-blue-600" checked />
              <span class="text-sm text-gray-700">Enable offline functionality</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sync Status -->
      <div class="bg-blue-50 rounded-lg p-4">
        <h3 class="font-semibold text-blue-800 mb-3">Sync Status</h3>
        <div class="flex items-center justify-between">
          <span class="text-sm text-blue-700">Last synced</span>
          <span class="text-sm font-medium text-blue-800">2 minutes ago</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-sm text-blue-700">Connection</span>
          <span class="text-sm font-medium {isOnline ? 'text-green-600' : 'text-red-600'}">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>

  {:else}
    <!-- Placeholder for other tabs -->
    <div class="flex items-center justify-center h-64">
      <div class="text-center">
        <Icon icon="mdi:construction" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-600 mb-2">Coming Soon</h3>
        <p class="text-sm text-gray-500">This feature is under development</p>
      </div>
    </div>
  {/if}
</div>