import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { voiceCommandExpander } from './voiceCommandExpander';

// Voice Control States
export const voiceState = writable({
  isListening: false,
  isActive: false,
  currentContext: 'home',
  lastCommand: '',
  feedback: '',
  confidence: 0
});

// Voice Commands Database
export const voiceCommands = {
  // Navigation Commands
  navigation: {
    'go to home': { action: 'navigate', target: '/', context: 'any' },
    'go home': { action: 'navigate', target: '/', context: 'any' },
    'open tasks': { action: 'navigate', target: '/tasks/dashboard', context: 'any' },
    'show tasks': { action: 'navigate', target: '/tasks/dashboard', context: 'any' },
    'go to tasks': { action: 'navigate', target: '/tasks/dashboard', context: 'any' },
    'open issues': { action: 'navigate', target: '/issues/dashboard', context: 'any' },
    'show issues': { action: 'navigate', target: '/issues/dashboard', context: 'any' },
    'go to issues': { action: 'navigate', target: '/issues/dashboard', context: 'any' },
    'open requests': { action: 'navigate', target: '/requests/dashboard', context: 'any' },
    'show requests': { action: 'navigate', target: '/requests/dashboard', context: 'any' },
    'go to requests': { action: 'navigate', target: '/requests/dashboard', context: 'any' },
    'open alerts': { action: 'navigate', target: '/alerts/dashboard', context: 'any' },
    'show alerts': { action: 'navigate', target: '/alerts/dashboard', context: 'any' },
    'go to alerts': { action: 'navigate', target: '/alerts/dashboard', context: 'any' },
    'open family': { action: 'navigate', target: '/family/dashboard', context: 'any' },
    'show family': { action: 'navigate', target: '/family/dashboard', context: 'any' },
    'go to family': { action: 'navigate', target: '/family/dashboard', context: 'any' },
    'open foods': { action: 'navigate', target: '/foods/dashboard', context: 'any' },
    'show foods': { action: 'navigate', target: '/foods/dashboard', context: 'any' },
    'go to foods': { action: 'navigate', target: '/foods/dashboard', context: 'any' },
    'open inventory': { action: 'navigate', target: '/inventory/dashboard', context: 'any' },
    'show inventory': { action: 'navigate', target: '/inventory/dashboard', context: 'any' },
    'go to inventory': { action: 'navigate', target: '/inventory/dashboard', context: 'any' }
  },

  // Task Commands
  tasks: {
    'create task': { action: 'navigate', target: '/tasks/create', context: 'tasks' },
    'add task': { action: 'navigate', target: '/tasks/create', context: 'tasks' },
    'new task': { action: 'navigate', target: '/tasks/create', context: 'tasks' },
    'update task': { action: 'navigate', target: '/tasks/update', context: 'tasks' },
    'edit task': { action: 'navigate', target: '/tasks/update', context: 'tasks' },
    'review tasks': { action: 'navigate', target: '/tasks/review', context: 'tasks' },
    'show task history': { action: 'navigate', target: '/tasks/review', context: 'tasks' },
    'task calendar': { action: 'navigate', target: '/tasks/calendar', context: 'tasks' },
    'show calendar': { action: 'navigate', target: '/tasks/calendar', context: 'tasks' }
  },

  // Food Commands
  foods: {
    'add recipe': { action: 'navigate', target: '/foods/create', context: 'foods' },
    'create recipe': { action: 'navigate', target: '/foods/create', context: 'foods' },
    'new recipe': { action: 'navigate', target: '/foods/create', context: 'foods' },
    'edit recipe': { action: 'navigate', target: '/foods/update', context: 'foods' },
    'update recipe': { action: 'navigate', target: '/foods/update', context: 'foods' },
    'show recipes': { action: 'navigate', target: '/foods/recipes', context: 'foods' },
    'review recipes': { action: 'navigate', target: '/foods/review', context: 'foods' },
    'schedule meal': { action: 'meal_schedule', context: 'foods' },
    'plan meal': { action: 'meal_schedule', context: 'foods' }
  },

  // CRUD Operations
  crud: {
    'create': { action: 'create', context: 'any' },
    'add': { action: 'create', context: 'any' },
    'new': { action: 'create', context: 'any' },
    'edit': { action: 'update', context: 'any' },
    'update': { action: 'update', context: 'any' },
    'delete': { action: 'delete', context: 'any' },
    'remove': { action: 'delete', context: 'any' },
    'review': { action: 'review', context: 'any' },
    'show': { action: 'review', context: 'any' },
    'view': { action: 'review', context: 'any' }
  },

  // System Commands
  system: {
    'stop listening': { action: 'stop_listening', context: 'any' },
    'shut down': { action: 'stop_listening', context: 'any' },
    'go to sleep': { action: 'stop_listening', context: 'any' },
    'wake up': { action: 'start_listening', context: 'any' },
    'start listening': { action: 'start_listening', context: 'any' },
    'help': { action: 'help', context: 'any' },
    'what can you do': { action: 'help', context: 'any' },
    'commands': { action: 'help', context: 'any' }
  }
};

// Tamil Commands
export const tamilCommands = {
  'வீடு': { action: 'navigate', target: '/', context: 'any' },
  'பணிகள்': { action: 'navigate', target: '/tasks/dashboard', context: 'any' },
  'பிரச்சனைகள்': { action: 'navigate', target: '/issues/dashboard', context: 'any' },
  'கோரிக்கைகள்': { action: 'navigate', target: '/requests/dashboard', context: 'any' },
  'எச்சரிக்கைகள்': { action: 'navigate', target: '/alerts/dashboard', context: 'any' },
  'குடும்பம்': { action: 'navigate', target: '/family/dashboard', context: 'any' },
  'உணவுகள்': { action: 'navigate', target: '/foods/dashboard', context: 'any' },
  'சரக்கு': { action: 'navigate', target: '/inventory/dashboard', context: 'any' },
  'புதிய பணி': { action: 'navigate', target: '/tasks/create', context: 'tasks' },
  'பணி சேர்க்க': { action: 'navigate', target: '/tasks/create', context: 'tasks' },
  'சமையல் சேர்க்க': { action: 'navigate', target: '/foods/create', context: 'foods' },
  'நிறுத்து': { action: 'stop_listening', context: 'any' },
  'கேளுவதை நிறுத்து': { action: 'stop_listening', context: 'any' }
};

// Voice Controller Class
export class VoiceController {
  private recognition: any = null;
  private isListening = false;
  private isActive = false;
  private currentContext = 'home';
  private wakeWords = ['shivo', 'bro', 'shakthi', 'ssh', 'ish'];

  constructor() {
    // Only initialize speech recognition on client side
    if (typeof window !== 'undefined') {
      this.initializeSpeechRecognition();
    }
  }

  private initializeSpeechRecognition() {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        voiceState.update(state => ({ ...state, isListening: true }));
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        this.processVoiceCommand(transcript);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        this.isListening = false;
        voiceState.update(state => ({ ...state, isListening: false }));

        // Auto-restart after error
        setTimeout(() => {
          if (this.isActive) this.startListening();
        }, 1000);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        voiceState.update(state => ({ ...state, isListening: false }));

        // Auto-restart if active
        if (this.isActive) {
          setTimeout(() => this.startListening(), 500);
        }
      };
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.isActive = true;
      this.recognition.start();
      this.speak('Voice control activated. Say "Hey Home" to begin.');
      voiceState.update(state => ({ ...state, isActive: true, feedback: 'Listening for wake words...' }));
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
    this.isActive = false;
    this.speak('Voice control deactivated.');
    voiceState.update(state => ({ ...state, isActive: false, isListening: false, feedback: 'Voice control stopped.' }));
  }

  private processVoiceCommand(transcript: string) {
    console.log('Processing voice command:', transcript);

    // Check for wake words first
    const wakeWord = this.wakeWords.find(word => transcript.includes(word));
    if (wakeWord) {
      this.handleWakeWord(wakeWord);
      return;
    }

    // Use the voice command expander for intelligent command processing
    const expandedCommand = voiceCommandExpander.expandCommand(transcript);
    console.log('Expanded command:', expandedCommand);

    // Update confidence in voice state
    voiceState.update(state => ({ ...state, confidence: expandedCommand.confidence }));

    // Process the expanded command
    const command = this.findMatchingCommand(expandedCommand.command);
    if (command) {
      this.executeCommand(command, expandedCommand.command);
    } else {
      // Try to handle dynamic commands from expander
      this.handleDynamicCommand(expandedCommand);
    }
  }

  private findMatchingCommand(transcript: string): any {
    // Check Tamil commands first
    for (const [key, command] of Object.entries(tamilCommands)) {
      if (transcript.includes(key.toLowerCase())) {
        return { ...command, originalKey: key };
      }
    }

    // Check English commands
    for (const category of Object.values(voiceCommands)) {
      for (const [key, command] of Object.entries(category)) {
        if (transcript.includes(key.toLowerCase())) {
          return { ...command, originalKey: key };
        }
      }
    }

    return null;
  }

  public executeCommand(command: any, transcript: string) {
    voiceState.update(state => ({
      ...state,
      lastCommand: transcript,
      feedback: `Executing: ${command.action}`
    }));

    switch (command.action) {
      case 'navigate':
        this.navigateTo(command.target);
        break;
      case 'create':
        this.handleCreate(this.currentContext);
        break;
      case 'update':
        this.handleUpdate(this.currentContext);
        break;
      case 'delete':
        this.handleDelete(this.currentContext);
        break;
      case 'review':
        this.handleReview(this.currentContext);
        break;
      case 'meal_schedule':
        this.handleMealSchedule();
        break;
      case 'stop_listening':
        this.stopListening();
        break;
      case 'start_listening':
        this.startListening();
        break;
      case 'help':
        this.showHelp();
        break;
      default:
        this.speak('Command not implemented yet.');
    }
  }

  private handleWakeWord(wakeWord: string) {
    this.speak(`Hello! I'm listening. What would you like to do?`);
    voiceState.update(state => ({
      ...state,
      feedback: `Wake word "${wakeWord}" detected. Ready for commands.`
    }));
  }

  private handleMealSchedule() {
    this.speak('Opening meal scheduler. Please select a recipe to schedule.');
    // Navigate to foods section for meal scheduling
    this.navigateTo('/foods');
  }

  private navigateTo(target: string) {
    goto(target);
    this.updateContext(target);
    this.speak(`Navigating to ${this.getPageName(target)}`);
  }

  private updateContext(path: string) {
    if (path.includes('/tasks/')) this.currentContext = 'tasks';
    else if (path.includes('/issues/')) this.currentContext = 'issues';
    else if (path.includes('/requests/')) this.currentContext = 'requests';
    else if (path.includes('/alerts/')) this.currentContext = 'alerts';
    else if (path.includes('/family/')) this.currentContext = 'family';
    else if (path.includes('/foods/')) this.currentContext = 'foods';
    else if (path.includes('/inventory/')) this.currentContext = 'inventory';
    else this.currentContext = 'home';

    voiceState.update(state => ({ ...state, currentContext: this.currentContext }));
  }

  private getPageName(path: string): string {
    const names: { [key: string]: string } = {
      '/': 'Home',
      '/tasks/dashboard': 'Tasks Dashboard',
      '/issues/dashboard': 'Issues Dashboard',
      '/requests/dashboard': 'Requests Dashboard',
      '/alerts/dashboard': 'Alerts Dashboard',
      '/family/dashboard': 'Family Dashboard',
      '/foods/dashboard': 'Foods Dashboard',
      '/inventory/dashboard': 'Inventory Dashboard'
    };
    return names[path] || 'page';
  }

  private handleCreate(context: string) {
    const createRoutes: { [key: string]: string } = {
      tasks: '/tasks/create',
      issues: '/issues/create',
      requests: '/requests/create',
      alerts: '/alerts/create',
      family: '/family/create',
      foods: '/foods/create',
      inventory: '/inventory/create'
    };

    const route = createRoutes[context];
    if (route) {
      this.navigateTo(route);
    } else {
      this.speak('Create function not available for this section.');
    }
  }

  private handleUpdate(context: string) {
    const updateRoutes: { [key: string]: string } = {
      tasks: '/tasks/update',
      issues: '/issues/update',
      requests: '/requests/update',
      alerts: '/alerts/update',
      family: '/family/update',
      foods: '/foods/update',
      inventory: '/inventory/update'
    };

    const route = updateRoutes[context];
    if (route) {
      this.navigateTo(route);
    } else {
      this.speak('Update function not available for this section.');
    }
  }

  private handleDelete(context: string) {
    this.speak('Delete function requires confirmation. Please use the interface for now.');
  }

  private handleReview(context: string) {
    const reviewRoutes: { [key: string]: string } = {
      tasks: '/tasks/review',
      issues: '/issues/review',
      requests: '/requests/review',
      alerts: '/alerts/review',
      family: '/family/review',
      foods: '/foods/review',
      inventory: '/inventory/review'
    };

    const route = reviewRoutes[context];
    if (route) {
      this.navigateTo(route);
    } else {
      this.speak('Review function not available for this section.');
    }
  }

  private handleDynamicCommand(expandedCommand: { command: string; confidence: number; original: string }) {
    const { command, confidence } = expandedCommand;

    // Handle create task commands with text
    if (command.startsWith('create task:')) {
      const taskText = command.replace('create task:', '').trim();
      this.handleCreateTaskWithText(taskText);
      return;
    }

    // Handle schedule meal commands with text
    if (command.startsWith('schedule meal:')) {
      const mealText = command.replace('schedule meal:', '').trim();
      this.handleScheduleMealWithText(mealText);
      return;
    }

    // Handle search commands
    if (command.startsWith('search:')) {
      const searchTerm = command.replace('search:', '').trim();
      this.handleSearchCommand(searchTerm);
      return;
    }

    // Handle filter commands
    if (command.startsWith('filter:')) {
      const filterTerm = command.replace('filter:', '').trim();
      this.handleFilterCommand(filterTerm);
      return;
    }

    // If confidence is low, provide suggestions
    if (confidence < 0.5) {
      const suggestions = voiceCommandExpander.suggestCommands(command);
      if (suggestions.length > 0) {
        this.speak(`Did you mean: ${suggestions.join(', ')}?`);
      } else {
        this.speak("I didn't understand that command. Say 'help' for available commands.");
      }
    } else {
      this.speak("I didn't understand that command. Say 'help' for available commands.");
    }
  }

  private handleCreateTaskWithText(taskText: string) {
    // Dispatch event for dashboard to handle
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('createQuickTask', { detail: { text: taskText } });
      window.dispatchEvent(event);
    }
    this.speak(`Created task: ${taskText}`);
  }

  private handleScheduleMealWithText(mealText: string) {
    // Dispatch event for dashboard to handle
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('scheduleQuickMeal', { detail: { text: mealText } });
      window.dispatchEvent(event);
    }
    this.speak(`Scheduled meal: ${mealText}`);
  }

  private handleSearchCommand(searchTerm: string) {
    // Dispatch event for dashboard to handle
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('performSearch', { detail: { term: searchTerm } });
      window.dispatchEvent(event);
    }
    this.speak(`Searching for: ${searchTerm}`);
  }

  private handleFilterCommand(filterTerm: string) {
    // Dispatch event for dashboard to handle
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('applyFilter', { detail: { term: filterTerm } });
      window.dispatchEvent(event);
    }
    this.speak(`Filtering by: ${filterTerm}`);
  }

  private showHelp() {
    const helpText = `Available commands: Navigation - go to tasks, issues, requests, alerts, family, foods, inventory. Actions - create, update, review, delete. System - stop listening, help.`;
    this.speak(helpText);
    voiceState.update(state => ({ ...state, feedback: helpText }));
  }

  private get speechSynthesis(): any {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      return window.speechSynthesis;
    }
    return null;
  }

  public speak(text: string) {
    const synth = this.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.1;
      utterance.pitch = 1;
      synth.speak(utterance);
    }
  }

  // Public methods
  setContext(context: string) {
    this.currentContext = context;
    voiceState.update(state => ({ ...state, currentContext: context }));
  }

  getContext(): string {
    return this.currentContext;
  }

  isActiveListening(): boolean {
    return this.isActive;
  }
}

