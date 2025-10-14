<script lang="ts">
  import { onMount } from 'svelte';
  import { VoiceController } from '$lib/voice/voiceController';
  import { goto } from '$app/navigation';

  // Create voice controller instance only on client side
  let voiceController: VoiceController | null = null;

  class VoiceDashboardController {
    private currentSection = '';
    private availableActions: { [key: string]: Function } = {};

    constructor() {
      this.initializeCommands();
      this.setupVoiceListener();
    }

    private initializeCommands() {
      // Dashboard navigation commands
      this.availableActions = {
        // KPI Card Actions
        'show total tasks': () => this.navigateToSection('tasks', 'dashboard'),
        'show pending tasks': () => this.filterTasks('pending'),
        'show completed tasks': () => this.filterTasks('completed'),
        'show in progress tasks': () => this.filterTasks('in-progress'),
        'show overdue tasks': () => this.showOverdueTasks(),
        'show today tasks': () => this.showTodayTasks(),
        'show high priority tasks': () => this.showHighPriorityTasks(),

        // Quick Actions
        'create new task': () => goto('/tasks/create'),
        'add new task': () => goto('/tasks/create'),
        'create new recipe': () => goto('/foods/create'),
        'add new recipe': () => goto('/foods/create'),
        'create new request': () => goto('/requests/create'),
        'submit new request': () => goto('/requests/create'),

        // Review Actions
        'review tasks': () => goto('/tasks/review'),
        'review recipes': () => goto('/foods/review'),
        'review requests': () => goto('/requests/review'),
        'show task history': () => goto('/tasks/review'),
        'show recipe history': () => goto('/foods/review'),

        // Update Actions
        'update tasks': () => goto('/tasks/update'),
        'edit tasks': () => goto('/tasks/update'),
        'update recipes': () => goto('/foods/update'),
        'edit recipes': () => goto('/foods/update'),

        // Calendar and scheduling
        'show calendar': () => goto('/tasks/calendar'),
        'schedule meal': () => this.openMealScheduler(),
        'plan meal': () => this.openMealScheduler(),

        // Search and filter
        'search tasks': () => this.activateSearch('tasks'),
        'search recipes': () => this.activateSearch('foods'),
        'filter by category': () => this.showFilterOptions(),
        'filter by priority': () => this.showPriorityFilter(),

        // Analytics and insights
        'show analytics': () => this.showAnalytics(),
        'show productivity': () => this.showProductivityScore(),
        'show recommendations': () => this.showSmartRecommendations(),
        'show statistics': () => this.showStatistics(),

        // Settings and configuration
        'open settings': () => goto('/settings'),
        'change theme': () => this.showThemeOptions(),
        'change language': () => this.showLanguageOptions(),

        // Emergency and help
        'help': () => this.showHelp(),
        'emergency': () => this.handleEmergency(),
        'call emergency': () => this.callEmergency(),
      };
    }

    private setupVoiceListener() {
      // Listen for voice commands from the global voice controller
      window.addEventListener('voiceCommand', (event: any) => {
        const { command, transcript } = event.detail;
        this.processDashboardCommand(command, transcript);
      });
    }

    private processDashboardCommand(command: string, transcript: string) {
      console.log('Processing dashboard command:', command);

      // Check if it's a direct action
      if (this.availableActions[command]) {
        this.availableActions[command]();
        voiceController.speak(`Executing: ${command}`);
        return;
      }

      // Check for contextual commands based on current section
      const contextualAction = this.getContextualAction(command, transcript);
      if (contextualAction) {
        contextualAction();
        return;
      }

      // Handle dynamic commands (create, update, etc.)
      this.handleDynamicCommand(command, transcript);
    }

    private getContextualAction(command: string, transcript: string): Function | null {
      const context = this.getCurrentContext();

      switch (context) {
        case 'tasks':
          return this.getTaskContextAction(command, transcript);
        case 'foods':
          return this.getFoodContextAction(command, transcript);
        case 'requests':
          return this.getRequestContextAction(command, transcript);
        case 'inventory':
          return this.getInventoryContextAction(command, transcript);
        default:
          return null;
      }
    }

    private getTaskContextAction(command: string, transcript: string): Function | null {
      if (command.includes('create') || command.includes('add')) {
        return () => goto('/tasks/create');
      }
      if (command.includes('update') || command.includes('edit')) {
        return () => goto('/tasks/update');
      }
      if (command.includes('review') || command.includes('history')) {
        return () => goto('/tasks/review');
      }
      if (command.includes('calendar')) {
        return () => goto('/tasks/calendar');
      }
      return null;
    }

    private getFoodContextAction(command: string, transcript: string): Function | null {
      if (command.includes('create') || command.includes('add')) {
        return () => goto('/foods/create');
      }
      if (command.includes('schedule') || command.includes('plan')) {
        return () => this.openMealScheduler();
      }
      if (command.includes('review') || command.includes('history')) {
        return () => goto('/foods/review');
      }
      return null;
    }

    private getRequestContextAction(command: string, transcript: string): Function | null {
      if (command.includes('create') || command.includes('submit')) {
        return () => goto('/requests/create');
      }
      if (command.includes('review') || command.includes('history')) {
        return () => goto('/requests/review');
      }
      return null;
    }

    private getInventoryContextAction(command: string, transcript: string): Function | null {
      if (command.includes('create') || command.includes('add')) {
        return () => goto('/inventory/create');
      }
      if (command.includes('review') || command.includes('reports')) {
        return () => goto('/inventory/reports');
      }
      return null;
    }

    private handleDynamicCommand(command: string, transcript: string) {
      // Handle commands like "create task to buy groceries"
      if (command.includes('create task')) {
        const taskText = transcript.replace(/create task/i, '').trim();
        if (taskText) {
          this.createQuickTask(taskText);
        } else {
          goto('/tasks/create');
        }
      }

      // Handle commands like "schedule meal for lunch"
      else if (command.includes('schedule meal')) {
        const mealText = transcript.replace(/schedule meal/i, '').trim();
        this.scheduleQuickMeal(mealText);
      }

      // Handle search commands
      else if (command.includes('search')) {
        const searchTerm = transcript.replace(/search/i, '').trim();
        this.performSearch(searchTerm);
      }

      else {
        voiceController.speak("I didn't understand that command. Try saying 'help' for available commands.");
      }
    }

    // Action implementations
    private navigateToSection(section: string, page: string = 'dashboard') {
      goto(`/${section}/${page}`);
    }

    private filterTasks(status: string) {
      // This would trigger filtering in the tasks dashboard
      const event = new CustomEvent('filterTasks', { detail: { status } });
      window.dispatchEvent(event);
      voiceController.speak(`Filtering tasks by ${status}`);
    }

    private showOverdueTasks() {
      const event = new CustomEvent('showOverdueTasks');
      window.dispatchEvent(event);
      voiceController.speak('Showing overdue tasks');
    }

    private showTodayTasks() {
      const event = new CustomEvent('showTodayTasks');
      window.dispatchEvent(event);
      voiceController.speak('Showing tasks due today');
    }

    private showHighPriorityTasks() {
      const event = new CustomEvent('showHighPriorityTasks');
      window.dispatchEvent(event);
      voiceController.speak('Showing high priority tasks');
    }

    private openMealScheduler() {
      const event = new CustomEvent('openMealScheduler');
      window.dispatchEvent(event);
      voiceController.speak('Opening meal scheduler');
    }

    private activateSearch(section: string) {
      const event = new CustomEvent('activateSearch', { detail: { section } });
      window.dispatchEvent(event);
      voiceController.speak(`Search activated for ${section}`);
    }

    private showFilterOptions() {
      const event = new CustomEvent('showFilterOptions');
      window.dispatchEvent(event);
      voiceController.speak('Showing filter options');
    }

    private showPriorityFilter() {
      const event = new CustomEvent('showPriorityFilter');
      window.dispatchEvent(event);
      voiceController.speak('Showing priority filter');
    }

    private showAnalytics() {
      const event = new CustomEvent('showAnalytics');
      window.dispatchEvent(event);
      voiceController.speak('Showing analytics dashboard');
    }

    private showProductivityScore() {
      const event = new CustomEvent('showProductivityScore');
      window.dispatchEvent(event);
      voiceController.speak('Showing productivity score');
    }

    private showSmartRecommendations() {
      const event = new CustomEvent('showSmartRecommendations');
      window.dispatchEvent(event);
      voiceController.speak('Showing smart recommendations');
    }

    private showStatistics() {
      const event = new CustomEvent('showStatistics');
      window.dispatchEvent(event);
      voiceController.speak('Showing statistics');
    }

    private showThemeOptions() {
      const event = new CustomEvent('showThemeOptions');
      window.dispatchEvent(event);
      voiceController.speak('Showing theme options');
    }

    private showLanguageOptions() {
      const event = new CustomEvent('showLanguageOptions');
      window.dispatchEvent(event);
      voiceController.speak('Showing language options');
    }

    private showHelp() {
      const helpText = `
        Available commands:
        Navigation: go to tasks, issues, requests, alerts, family, foods, inventory
        Actions: create, update, review, delete
        Tasks: show pending, show completed, show overdue, show today
        Foods: schedule meal, add recipe
        System: help, stop listening
      `;
      voiceController.speak(helpText);
    }

    private handleEmergency() {
      voiceController.speak('Emergency mode activated. Calling emergency services.');
      // This would trigger emergency protocols
    }

    private callEmergency() {
      if (confirm('Call emergency services?')) {
        window.location.href = 'tel:911';
      }
    }

    private createQuickTask(taskText: string) {
      const event = new CustomEvent('createQuickTask', { detail: { text: taskText } });
      window.dispatchEvent(event);
      voiceController.speak(`Created task: ${taskText}`);
    }

    private scheduleQuickMeal(mealText: string) {
      const event = new CustomEvent('scheduleQuickMeal', { detail: { text: mealText } });
      window.dispatchEvent(event);
      voiceController.speak(`Scheduled meal: ${mealText}`);
    }

    private performSearch(searchTerm: string) {
      const event = new CustomEvent('performSearch', { detail: { term: searchTerm } });
      window.dispatchEvent(event);
      voiceController.speak(`Searching for: ${searchTerm}`);
    }

    private getCurrentContext(): string {
      const path = window.location.pathname;
      if (path.includes('/tasks/')) return 'tasks';
      if (path.includes('/foods/')) return 'foods';
      if (path.includes('/requests/')) return 'requests';
      if (path.includes('/inventory/')) return 'inventory';
      if (path.includes('/issues/')) return 'issues';
      if (path.includes('/alerts/')) return 'alerts';
      if (path.includes('/family/')) return 'family';
      return 'home';
    }

    // Public methods
    public setContext(context: string) {
      this.currentSection = context;
    }

    public getAvailableCommands(): string[] {
      return Object.keys(this.availableActions);
    }
  }

  // Global instance
  let controller: VoiceDashboardController;

  onMount(() => {
    // Initialize voice controller first
    voiceController = new VoiceController();
    // Then create the dashboard controller
    controller = new VoiceDashboardController();
  });
</script>

<!-- Voice Dashboard Controller (Invisible Component) -->
<div class="hidden">
  <!-- This component initializes the voice dashboard controller -->
</div>