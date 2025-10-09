/**
 * Tool Agent - Executes actions through various tools and integrations
 * Manages calendar, notes, music, home automation, and external services
 */

import { BaseAgent } from './core.js';
import { todos } from '../../stores/todos.js';
import { reminders } from '../../stores/reminders.js';
import { events } from '../../stores/events.js';
import { notes } from '../../stores/notes.js';

export class ToolAgent extends BaseAgent {
  constructor() {
    super('tool', ['execute', 'integrate', 'automate', 'control']);
    this.availableTools = new Map();
    this.activeIntegrations = new Set();
    this.toolHistory = [];
  }

  async initialize() {
    await super.initialize();
    this.registerTools();
    this.initializeIntegrations();
  }

  registerTools() {
    // Register available tools
    this.availableTools.set('calendar', new CalendarTool());
    this.availableTools.set('notes', new NotesTool());
    this.availableTools.set('music', new MusicTool());
    this.availableTools.set('reminders', new ReminderTool());
    this.availableTools.set('home_automation', new HomeAutomationTool());
    this.availableTools.set('weather', new WeatherTool());
    this.availableTools.set('health', new HealthTool());
    this.availableTools.set('shopping', new ShoppingTool());
    this.availableTools.set('communication', new CommunicationTool());
  }

  initializeIntegrations() {
    // Initialize external service integrations
    this.activeIntegrations.add('local_calendar');
    this.activeIntegrations.add('local_notes');
    this.activeIntegrations.add('local_music');
    // Add more integrations as needed
  }

  async execute(input) {
    const { type, data, role, preferences } = input;

    switch (type) {
      case 'execute_action':
        return this.executeAction(data.action, data.params, role);
      case 'integrate_service':
        return this.integrateService(data.service, data.config);
      case 'automate_routine':
        return this.automateRoutine(data.routine, role);
      case 'control_device':
        return this.controlDevice(data.device, data.command);
      default:
        return this.handleToolRequest(input);
    }
  }

  async executeAction(action, params, role) {
    const tool = this.findToolForAction(action);

    if (!tool) {
      return {
        response: `No tool available for action: ${action}`,
        actions: []
      };
    }

    try {
      const result = await tool.execute(action, params, role);

      // Record in history
      this.toolHistory.push({
        timestamp: new Date(),
        action,
        params,
        result,
        role
      });

      return {
        response: `Executed ${action} successfully`,
        actions: [{ type: 'action_completed', data: { action, result, role } }],
        result
      };
    } catch (error) {
      console.error(`Tool execution failed:`, error);
      return {
        response: `Failed to execute ${action}: ${error.message}`,
        actions: [{ type: 'action_failed', data: { action, error, role } }]
      };
    }
  }

  findToolForAction(action) {
    // Map actions to tools
    const actionToolMap = {
      // Calendar actions
      'create_event': 'calendar',
      'update_event': 'calendar',
      'delete_event': 'calendar',
      'get_events': 'calendar',

      // Notes actions
      'create_note': 'notes',
      'update_note': 'notes',
      'delete_note': 'notes',
      'search_notes': 'notes',

      // Music actions
      'play_music': 'music',
      'stop_music': 'music',
      'generate_music': 'music',
      'set_volume': 'music',

      // Reminder actions
      'create_reminder': 'reminders',
      'update_reminder': 'reminders',
      'delete_reminder': 'reminders',

      // Home automation
      'turn_on_light': 'home_automation',
      'turn_off_light': 'home_automation',
      'adjust_temperature': 'home_automation',
      'lock_door': 'home_automation',

      // Weather
      'get_weather': 'weather',
      'get_forecast': 'weather',

      // Health
      'log_weight': 'health',
      'log_blood_pressure': 'health',
      'schedule_checkup': 'health',

      // Shopping
      'add_to_cart': 'shopping',
      'create_list': 'shopping',
      'check_price': 'shopping',

      // Communication
      'send_message': 'communication',
      'make_call': 'communication',
      'send_email': 'communication'
    };

    const toolName = actionToolMap[action];
    return toolName ? this.availableTools.get(toolName) : null;
  }

  async integrateService(service, config) {
    try {
      // Initialize service integration
      const integration = await this.initializeServiceIntegration(service, config);

      this.activeIntegrations.add(service);

      return {
        response: `Integrated ${service} successfully`,
        actions: [{ type: 'service_integrated', data: { service, config } }],
        integration
      };
    } catch (error) {
      return {
        response: `Failed to integrate ${service}: ${error.message}`,
        actions: []
      };
    }
  }

  async automateRoutine(routine, role) {
    const automation = {
      id: `automation_${Date.now()}`,
      routine,
      role,
      triggers: routine.triggers || [],
      actions: routine.actions || [],
      active: true
    };

    // Register automation
    this.automations = this.automations || new Map();
    this.automations.set(automation.id, automation);

    return {
      response: `Automated routine for ${role}: ${routine.name}`,
      actions: [{ type: 'routine_automated', data: automation }]
    };
  }

  async controlDevice(device, command) {
    const homeTool = this.availableTools.get('home_automation');

    if (!homeTool) {
      return {
        response: 'Home automation not available',
        actions: []
      };
    }

    return await homeTool.controlDevice(device, command);
  }

  handleToolRequest(input) {
    const { intent, role } = input;

    if (!intent) {
      return {
        response: 'No intent provided for tool execution',
        actions: []
      };
    }

    // Execute based on intent
    return this.executeAction(intent.type, intent.extracted, role);
  }

  async initializeServiceIntegration(service, config) {
    // Placeholder for service integration
    // In a real implementation, this would connect to external APIs
    switch (service) {
      case 'google_calendar':
        return { status: 'connected', api: 'google' };
      case 'spotify':
        return { status: 'connected', api: 'spotify' };
      case 'alexa':
        return { status: 'connected', api: 'alexa' };
      default:
        return { status: 'connected', api: 'local' };
    }
  }

  getToolHistory(limit = 10) {
    return this.toolHistory.slice(-limit);
  }

  getAvailableTools() {
    return Array.from(this.availableTools.keys());
  }

  getActiveIntegrations() {
    return Array.from(this.activeIntegrations);
  }
}

// Tool Classes
class CalendarTool {
  async execute(action, params, role) {
    switch (action) {
      case 'create_event':
        events.update(e => [...e, {
          id: Date.now(),
          title: params.title,
          date: params.date,
          time: params.time,
          category: params.category || 'custom',
          voiceCreated: true
        }]);
        return { success: true, event: params };

      case 'get_events':
        // Return events for the specified date range
        return { success: true, events: [] };

      default:
        throw new Error(`Unknown calendar action: ${action}`);
    }
  }
}

class NotesTool {
  async execute(action, params, role) {
    switch (action) {
      case 'create_note':
        notes.update(n => [...n, {
          id: Date.now(),
          content: params.content,
          emotionTag: params.emotion || 'neutral',
          voiceCreated: true,
          timestamp: new Date()
        }]);
        return { success: true, note: params };

      case 'search_notes':
        // Search functionality would be implemented here
        return { success: true, results: [] };

      default:
        throw new Error(`Unknown notes action: ${action}`);
    }
  }
}

class MusicTool {
  async execute(action, params, role) {
    switch (action) {
      case 'play_music':
        // Integration with music generation/playback
        return { success: true, track: params.track };

      case 'generate_music':
        // Trigger music generation
        return { success: true, prompt: params.prompt };

      case 'set_volume':
        return { success: true, volume: params.volume };

      default:
        throw new Error(`Unknown music action: ${action}`);
    }
  }
}

class ReminderTool {
  async execute(action, params, role) {
    switch (action) {
      case 'create_reminder':
        reminders.update(r => [...r, {
          id: Date.now(),
          message: params.message,
          time: params.time,
          repeat: params.repeat || 'none',
          completed: false,
          voiceCreated: true
        }]);
        return { success: true, reminder: params };

      default:
        throw new Error(`Unknown reminder action: ${action}`);
    }
  }
}

class HomeAutomationTool {
  async execute(action, params, role) {
    // Placeholder for home automation commands
    switch (action) {
      case 'turn_on_light':
      case 'turn_off_light':
        return { success: true, device: params.device, state: action.includes('on') ? 'on' : 'off' };

      case 'adjust_temperature':
        return { success: true, temperature: params.temperature };

      default:
        throw new Error(`Unknown home automation action: ${action}`);
    }
  }

  async controlDevice(device, command) {
    return this.execute(command, { device }, 'family');
  }
}

class WeatherTool {
  async execute(action, params, role) {
    switch (action) {
      case 'get_weather':
        // Placeholder for weather API call
        return {
          success: true,
          weather: {
            temperature: 28,
            condition: 'sunny',
            location: 'Coimbatore'
          }
        };

      case 'get_forecast':
        return { success: true, forecast: [] };

      default:
        throw new Error(`Unknown weather action: ${action}`);
    }
  }
}

class HealthTool {
  async execute(action, params, role) {
    switch (action) {
      case 'log_weight':
        return { success: true, weight: params.weight, date: new Date() };

      case 'log_blood_pressure':
        return { success: true, systolic: params.systolic, diastolic: params.diastolic };

      default:
        throw new Error(`Unknown health action: ${action}`);
    }
  }
}

class ShoppingTool {
  async execute(action, params, role) {
    switch (action) {
      case 'add_to_cart':
        return { success: true, item: params.item, quantity: params.quantity };

      case 'create_list':
        return { success: true, list: params.items };

      default:
        throw new Error(`Unknown shopping action: ${action}`);
    }
  }
}

class CommunicationTool {
  async execute(action, params, role) {
    switch (action) {
      case 'send_message':
        return { success: true, recipient: params.recipient, message: params.message };

      case 'make_call':
        return { success: true, number: params.number };

      case 'send_email':
        return { success: true, to: params.to, subject: params.subject };

      default:
        throw new Error(`Unknown communication action: ${action}`);
    }
  }
}