/**
 * Shivo Agentic AI System - Main Orchestrator
 * Integrates all agents and provides the primary interface for agentic AI features
 */

import { orchestrator, agentState } from './core.js';
import { MemoryAgent } from './memory.js';
import { PlannerAgent } from './planner.js';
import { VoiceAgent } from './voice.js';
import { UIAgent } from './ui.js';
import { ToolAgent } from './tool.js';
import { MusicAgent } from './music.js';

// Initialize all agents
const memoryAgent = new MemoryAgent();
const plannerAgent = new PlannerAgent();
const voiceAgent = new VoiceAgent();
const uiAgent = new UIAgent();
const toolAgent = new ToolAgent();
const musicAgent = new MusicAgent();

// Register agents with orchestrator
orchestrator.registerAgent(memoryAgent);
orchestrator.registerAgent(plannerAgent);
orchestrator.registerAgent(voiceAgent);
orchestrator.registerAgent(uiAgent);
orchestrator.registerAgent(toolAgent);
orchestrator.registerAgent(musicAgent);

// Shivo AI System Class
export class ShivoAISystem {
  constructor() {
    this.isInitialized = false;
    this.currentRole = 'family';
    this.systemStatus = 'asleep';
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      console.log('Initializing Shivo Agentic AI System...');

      // Initialize all agents
      await orchestrator.initializeAllAgents();

      // Set up role detection
      this.setupRoleDetection();

      // Set up autonomous routines
      this.setupAutonomousRoutines();

      this.isInitialized = true;
      this.systemStatus = 'active';

      console.log('Shivo AI System initialized successfully');

      // Update reactive state
      agentState.update(state => ({
        ...state,
        activeAgents: orchestrator.agents.keys(),
        activeRole: this.currentRole
      }));

    } catch (error) {
      console.error('Failed to initialize Shivo AI System:', error);
      this.systemStatus = 'error';
    }
  }

  async shutdown() {
    await orchestrator.shutdownAllAgents();
    this.systemStatus = 'shutdown';
  }

  // Main interaction method
  async processInteraction(input) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Detect or confirm role
      const detectedRole = this.detectRole(input);
      if (detectedRole !== this.currentRole) {
        await this.switchRole(detectedRole);
      }

      // Get role preferences
      const rolePrefs = orchestrator.getRolePreferences();

      // Enrich input with context
      const enrichedInput = {
        ...input,
        role: this.currentRole,
        preferences: rolePrefs,
        context: await this.getContext()
      };

      // Process through orchestrator
      const result = await orchestrator.processWithAgents(enrichedInput);

      // Update system state
      this.updateSystemState(result);

      return result;

    } catch (error) {
      console.error('Error processing interaction:', error);
      return {
        responses: ['I apologize, but I encountered an error processing your request.'],
        actions: [],
        error: error.message
      };
    }
  }

  // Voice interaction methods
  async startVoiceListening() {
    return await voiceAgent.process({
      type: 'start_listening',
      role: this.currentRole
    });
  }

  async stopVoiceListening() {
    return await voiceAgent.process({
      type: 'stop_listening'
    });
  }

  async processVoiceCommand(text) {
    return await this.processInteraction({
      type: 'voice_command',
      text,
      source: 'voice'
    });
  }

  // Role management
  async switchRole(role) {
    if (!orchestrator.roles[role]) {
      throw new Error(`Unknown role: ${role}`);
    }

    this.currentRole = role;
    orchestrator.setActiveRole(role);

    // Adapt UI for new role
    await uiAgent.process({
      type: 'adapt_interface',
      role,
      context: 'role_switch'
    });

    // Update reactive state
    agentState.update(state => ({
      ...state,
      activeRole: role
    }));

    console.log(`Switched to role: ${role}`);
  }

  detectRole(input) {
    // Use context clues to detect role
    const { text, context } = input;

    if (!text) return this.currentRole;

    const lowerText = text.toLowerCase();

    // Role detection keywords
    const roleKeywords = {
      paati: ['paati', 'grandma', 'grandmother', 'அம்மா', 'பாட்டி'],
      appa: ['appa', 'dad', 'father', 'அப்பா'],
      amma: ['amma', 'mom', 'mother', 'அம்மா'],
      kids: ['kids', 'children', 'பிள்ளைகள்', 'குழந்தைகள்']
    };

    for (const [role, keywords] of Object.entries(roleKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return role;
      }
    }

    // Time-based role detection
    return this.detectRoleByTime();
  }

  detectRoleByTime() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 9) return 'paati'; // Early morning
    if (hour >= 9 && hour < 17) return 'appa'; // Workday
    if (hour >= 17 && hour < 21) return 'amma'; // Evening
    if (hour >= 21 || hour < 5) return 'kids'; // Night/Early morning

    return 'family';
  }

  // Context gathering
  async getContext() {
    const memoryContext = await memoryAgent.process({
      type: 'recall_context',
      role: this.currentRole
    });

    return {
      role: this.currentRole,
      time: new Date(),
      recentActivities: memoryContext.context?.recentFacts || [],
      emotionalState: memoryContext.context?.emotionalState || 'neutral',
      preferences: orchestrator.getRolePreferences()
    };
  }

  // Autonomous routines setup
  setupAutonomousRoutines() {
    // Check routines every minute
    setInterval(async () => {
      try {
        const routineCheck = await plannerAgent.process({
          type: 'check_routines',
          role: this.currentRole
        });

        if (routineCheck.actions.length > 0) {
          // Execute routine actions
          for (const action of routineCheck.actions) {
            await this.executeAutonomousAction(action);
          }
        }
      } catch (error) {
        console.warn('Autonomous routine check failed:', error);
      }
    }, 60000); // Every minute
  }

  async executeAutonomousAction(action) {
    try {
      switch (action.type) {
        case 'remind_prayer':
          await this.processInteraction({
            type: 'autonomous',
            text: 'Time for morning prayers',
            context: 'routine'
          });
          break;

        case 'plan_temple':
          await this.processInteraction({
            type: 'autonomous',
            text: 'Plan temple visit for today',
            context: 'routine'
          });
          break;

        case 'remind_walk':
          await this.processInteraction({
            type: 'autonomous',
            text: 'Time for morning walk',
            context: 'routine'
          });
          break;

        default:
          console.log('Unknown autonomous action:', action.type);
      }
    } catch (error) {
      console.warn('Autonomous action execution failed:', error);
    }
  }

  // System state management
  updateSystemState(result) {
    agentState.update(state => ({
      ...state,
      lastInteraction: {
        timestamp: new Date(),
        role: this.currentRole,
        result
      },
      memory: result.context?.recentFacts || state.memory
    }));
  }

  // Goal-oriented actions
  async pursueGoal(goal) {
    // Break down goal into steps and coordinate agents
    const planResult = await plannerAgent.process({
      type: 'create_plan',
      data: goal,
      role: this.currentRole
    });

    // Execute plan steps
    if (planResult.actions) {
      for (const action of planResult.actions) {
        await toolAgent.process({
          type: 'execute_action',
          data: { action: action.type, params: action.data },
          role: this.currentRole
        });
      }
    }

    return planResult;
  }

  // Get system status
  getStatus() {
    return {
      initialized: this.isInitialized,
      status: this.systemStatus,
      currentRole: this.currentRole,
      activeAgents: Array.from(orchestrator.agents.keys()),
      rolePreferences: orchestrator.getRolePreferences()
    };
  }

  // Emergency handling
  async handleEmergency(situation) {
    // Switch to appropriate role for emergency
    await this.switchRole('family');

    // Get emergency context
    const emergencyContext = {
      type: 'emergency',
      situation,
      priority: 'high'
    };

    // Process emergency through all agents
    return await this.processInteraction({
      type: 'emergency',
      text: `Emergency: ${situation}`,
      context: emergencyContext
    });
  }
}

// Global Shivo AI instance
export const shivoAI = new ShivoAISystem();

// Helper functions for integration
export async function initializeShivoAI() {
  await shivoAI.initialize();
}

export async function processShivoInteraction(input) {
  return await shivoAI.processInteraction(input);
}

export async function switchShivoRole(role) {
  await shivoAI.switchRole(role);
}

export function getShivoStatus() {
  return shivoAI.getStatus();
}

// Auto-initialize when module loads (in browser environment)
if (typeof window !== 'undefined') {
  // Initialize after DOM is ready
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await initializeShivoAI();
      console.log('Shivo AI auto-initialized');
    } catch (error) {
      console.warn('Shivo AI auto-initialization failed:', error);
    }
  });
}