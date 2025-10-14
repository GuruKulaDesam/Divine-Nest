<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { VoiceController } from '$lib/voice/voiceController';
  import VoiceDashboardController from '$lib/components/VoiceDashboardController.svelte';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  // Create voice controller instance only on client side
  let voiceController: VoiceController | null = null;

  // Dashboard state
  let currentView = writable('overview');
  let selectedSection = writable('tasks');
  let searchActive = writable(false);
  let filterActive = writable(false);

  // KPI data (would normally come from stores)
  let kpiData = writable({
    tasks: { total: 0, pending: 0, completed: 0, overdue: 0 },
    issues: { total: 0, open: 0, resolved: 0, critical: 0 },
    requests: { total: 0, pending: 0, approved: 0, rejected: 0 },
    alerts: { total: 0, unread: 0, urgent: 0 },
    family: { members: 0, events: 0, reminders: 0 },
    foods: { recipes: 0, meals: 0, inventory: 0 },
    inventory: { items: 0, lowStock: 0, expiring: 0 }
  });

  let eventListeners: (() => void)[] = [];

  onMount(() => {
    // Initialize voice controller only on client side
    voiceController = new VoiceController();
    setupEventListeners();
    loadDashboardData();
    voiceController.speak('Dashboard loaded. Say "help" for available commands.');
  });

  onDestroy(() => {
    eventListeners.forEach(unsubscribe => unsubscribe());
  });

  function setupEventListeners() {
    // Voice command handlers
    const voiceHandler = (event: any) => {
      const { command, transcript } = event.detail;
      handleVoiceCommand(command, transcript);
    };

    const filterHandler = (event: any) => {
      const { status } = event.detail;
      applyFilter(status);
    };

    const searchHandler = (event: any) => {
      const { section } = event.detail;
      activateSearch(section);
    };

    const quickTaskHandler = (event: any) => {
      const { text } = event.detail;
      createQuickTask(text);
    };

    const quickMealHandler = (event: any) => {
      const { text } = event.detail;
      scheduleQuickMeal(text);
    };

    // Add listeners
    window.addEventListener('voiceCommand', voiceHandler);
    window.addEventListener('filterTasks', filterHandler);
    window.addEventListener('activateSearch', searchHandler);
    window.addEventListener('createQuickTask', quickTaskHandler);
    window.addEventListener('scheduleQuickMeal', quickMealHandler);

    eventListeners = [
      () => window.removeEventListener('voiceCommand', voiceHandler),
      () => window.removeEventListener('filterTasks', filterHandler),
      () => window.removeEventListener('activateSearch', searchHandler),
      () => window.removeEventListener('createQuickTask', quickTaskHandler),
      () => window.removeEventListener('scheduleQuickMeal', quickMealHandler)
    ];
  }

  function handleVoiceCommand(command: string, transcript: string) {
    console.log('Dashboard handling command:', command);

    switch (command) {
      case 'show total tasks':
        showSection('tasks');
        voiceController.speak('Showing all tasks');
        break;

      case 'show pending tasks':
        applyFilter('pending');
        break;

      case 'show completed tasks':
        applyFilter('completed');
        break;

      case 'show overdue tasks':
        showOverdueTasks();
        break;

      case 'show today tasks':
        showTodayTasks();
        break;

      case 'create new task':
        goto('/tasks/create');
        break;

      case 'create new recipe':
        goto('/foods/create');
        break;

      case 'create new request':
        goto('/requests/create');
        break;

      case 'show analytics':
        showAnalytics();
        break;

      case 'show productivity':
        showProductivityScore();
        break;

      case 'help':
        showHelp();
        break;

      default:
        // Check for dynamic commands
        if (command.includes('go to') || command.includes('show')) {
          const section = extractSection(command);
          if (section) {
            showSection(section);
          }
        }
    }
  }

  function extractSection(command: string): string | null {
    const sections = ['tasks', 'issues', 'requests', 'alerts', 'family', 'foods', 'inventory'];
    for (const section of sections) {
      if (command.includes(section)) {
        return section;
      }
    }
    return null;
  }

  function showSection(section: string) {
    selectedSection.set(section);
    currentView.set('section');
    voiceController.speak(`Showing ${section} section`);
  }

  function applyFilter(status: string) {
    filterActive.set(true);
    selectedSection.set('tasks');
    currentView.set('filtered');
    voiceController.speak(`Filtering tasks by ${status}`);
  }

  function showOverdueTasks() {
    applyFilter('overdue');
  }

  function showTodayTasks() {
    applyFilter('today');
  }

  function activateSearch(section: string) {
    searchActive.set(true);
    selectedSection.set(section);
    voiceController.speak(`Search activated for ${section}`);
  }

  function showAnalytics() {
    currentView.set('analytics');
    voiceController.speak('Showing analytics dashboard');
  }

  function showProductivityScore() {
    currentView.set('productivity');
    voiceController.speak('Showing productivity score');
  }

  function showHelp() {
    const helpText = `
      Available commands:
      Navigation: go to tasks, issues, requests, alerts, family, foods, inventory
      Tasks: show pending, show completed, show overdue, show today, create new task
      Actions: create new recipe, create new request, show analytics, show productivity
      System: help, stop listening
    `;
    voiceController.speak(helpText);
  }

  function createQuickTask(text: string) {
    // This would normally save to database
    console.log('Creating quick task:', text);
    voiceController.speak(`Task created: ${text}`);
    // Update KPI data
    kpiData.update(data => ({
      ...data,
      tasks: { ...data.tasks, total: data.tasks.total + 1, pending: data.tasks.pending + 1 }
    }));
  }

  function scheduleQuickMeal(text: string) {
    console.log('Scheduling quick meal:', text);
    voiceController.speak(`Meal scheduled: ${text}`);
    // Update KPI data
    kpiData.update(data => ({
      ...data,
      foods: { ...data.foods, meals: data.foods.meals + 1 }
    }));
  }

  function loadDashboardData() {
    // This would normally load from database
    // For now, using mock data
    kpiData.set({
      tasks: { total: 15, pending: 8, completed: 5, overdue: 2 },
      issues: { total: 7, open: 4, resolved: 3, critical: 1 },
      requests: { total: 12, pending: 6, approved: 4, rejected: 2 },
      alerts: { total: 9, unread: 5, urgent: 2 },
      family: { members: 6, events: 3, reminders: 4 },
      foods: { recipes: 25, meals: 7, inventory: 18 },
      inventory: { items: 45, lowStock: 8, expiring: 3 }
    });
  }

  // Reactive statements
  $: viewTitle = getViewTitle($currentView, $selectedSection);
  $: displayData = getDisplayData($currentView, $selectedSection, $kpiData);

  function getViewTitle(view: string, section: string): string {
    switch (view) {
      case 'overview': return 'Dashboard Overview';
      case 'section': return `${section.charAt(0).toUpperCase() + section.slice(1)} Section`;
      case 'analytics': return 'Analytics Dashboard';
      case 'productivity': return 'Productivity Score';
      case 'filtered': return `Filtered ${section.charAt(0).toUpperCase() + section.slice(1)}`;
      default: return 'Dashboard';
    }
  }

  function getDisplayData(view: string, section: string, data: any) {
    if (view === 'overview') return data;
    if (view === 'section') return { [section]: data[section] };
    return data;
  }
</script>

<div class="voice-dashboard p-6">
  <div class="mb-6">
    <h1 class="text-3xl font-bold text-primary mb-2">{viewTitle}</h1>
    <p class="text-gray-600">Voice-controlled dashboard - Say "help" for commands</p>
  </div>

  {#if $currentView === 'overview'}
    <!-- KPI Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <!-- Tasks Card -->
      <div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('tasks')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Tasks</h3>
              <p class="text-blue-100">Manage your tasks</p>
            </div>
            <div class="text-4xl opacity-80">📋</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Total:</span>
              <span class="font-bold">{$kpiData.tasks.total}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Pending:</span>
              <span class="font-bold">{$kpiData.tasks.pending}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Overdue:</span>
              <span class="font-bold text-red-300">{$kpiData.tasks.overdue}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Issues Card -->
      <div class="card bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('issues')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Issues</h3>
              <p class="text-red-100">Track problems</p>
            </div>
            <div class="text-4xl opacity-80">🚨</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Open:</span>
              <span class="font-bold">{$kpiData.issues.open}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Critical:</span>
              <span class="font-bold text-yellow-300">{$kpiData.issues.critical}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Requests Card -->
      <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('requests')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Requests</h3>
              <p class="text-green-100">Service requests</p>
            </div>
            <div class="text-4xl opacity-80">📝</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Pending:</span>
              <span class="font-bold">{$kpiData.requests.pending}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Approved:</span>
              <span class="font-bold">{$kpiData.requests.approved}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts Card -->
      <div class="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('alerts')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Alerts</h3>
              <p class="text-yellow-100">Notifications</p>
            </div>
            <div class="text-4xl opacity-80">🔔</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Unread:</span>
              <span class="font-bold">{$kpiData.alerts.unread}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Urgent:</span>
              <span class="font-bold text-red-300">{$kpiData.alerts.urgent}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Family Card -->
      <div class="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('family')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Family</h3>
              <p class="text-purple-100">Family management</p>
            </div>
            <div class="text-4xl opacity-80">👨‍👩‍👧‍👦</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Members:</span>
              <span class="font-bold">{$kpiData.family.members}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Events:</span>
              <span class="font-bold">{$kpiData.family.events}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Foods Card -->
      <div class="card bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('foods')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Foods</h3>
              <p class="text-orange-100">Meal planning</p>
            </div>
            <div class="text-4xl opacity-80">🍽️</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Recipes:</span>
              <span class="font-bold">{$kpiData.foods.recipes}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Meals:</span>
              <span class="font-bold">{$kpiData.foods.meals}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Card -->
      <div class="card bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
           on:click={() => showSection('inventory')}>
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-white">Inventory</h3>
              <p class="text-teal-100">Stock management</p>
            </div>
            <div class="text-4xl opacity-80">📦</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Items:</span>
              <span class="font-bold">{$kpiData.inventory.items}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Low Stock:</span>
              <span class="font-bold text-red-300">{$kpiData.inventory.lowStock}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Quick Actions</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button class="btn btn-primary" on:click={() => goto('/tasks/create')}>
            <span class="text-lg mr-2">➕</span>
            New Task
          </button>
          <button class="btn btn-secondary" on:click={() => goto('/foods/create')}>
            <span class="text-lg mr-2">🍳</span>
            Add Recipe
          </button>
          <button class="btn btn-accent" on:click={() => goto('/requests/create')}>
            <span class="text-lg mr-2">📝</span>
            New Request
          </button>
          <button class="btn btn-info" on:click={() => showAnalytics()}>
            <span class="text-lg mr-2">📊</span>
            Analytics
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if $currentView === 'section'}
    <!-- Section Detail View -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title capitalize">{$selectedSection} Overview</h3>
        <div class="stats stats-vertical lg:stats-horizontal shadow">
          {#each Object.entries($displayData[$selectedSection] || {}) as [key, value]}
            <div class="stat">
              <div class="stat-title capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              <div class="stat-value">{value}</div>
            </div>
          {/each}
        </div>
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-primary" on:click={() => goto(`/${$selectedSection}`)}>
            View All {$selectedSection}
          </button>
          <button class="btn btn-outline" on:click={() => currentView.set('overview')}>
            Back to Overview
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if $currentView === 'analytics'}
    <!-- Analytics View -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Analytics Dashboard</h3>
        <p class="text-gray-600 mb-4">Comprehensive insights and statistics</p>
        <!-- Analytics content would go here -->
        <div class="alert alert-info">
          <span>Analytics feature coming soon!</span>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-outline" on:click={() => currentView.set('overview')}>
            Back to Overview
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if $currentView === 'productivity'}
    <!-- Productivity View -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Productivity Score</h3>
        <div class="text-center py-8">
          <div class="text-6xl font-bold text-primary mb-4">85%</div>
          <p class="text-gray-600">Your productivity score this week</p>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-outline" on:click={() => currentView.set('overview')}>
            Back to Overview
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .voice-dashboard {
    min-height: calc(100vh - 200px);
  }

  .card:hover {
    transform: translateY(-2px);
  }
</style>