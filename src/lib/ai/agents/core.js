/**
 * Core Agent Architecture for Shivo AI Assistant
 * Agentic AI system with modular, role-aware agents
 */

import { writable } from 'svelte/store';

// Base Agent Class
export class BaseAgent {
  constructor(name, capabilities = []) {
    this.name = name;
    this.capabilities = capabilities;
    this.memory = new Map();
    this.goals = [];
    this.isActive = false;
  }

  async initialize() {
    this.isActive = true;
    console.log(`${this.name} agent initialized`);
  }

  async shutdown() {
    this.isActive = false;
    console.log(`${this.name} agent shutdown`);
  }

  async process(input) {
    if (!this.isActive) return null;

    // Store in memory
    this.memory.set(Date.now(), input);

    // Process based on capabilities
    return await this.execute(input);
  }

  async execute(input) {
    // Override in subclasses
    return { response: 'Base agent response', actions: [] };
  }

  addGoal(goal) {
    this.goals.push(goal);
  }

  getMemory(limit = 10) {
    const entries = Array.from(this.memory.entries());
    return entries.slice(-limit).map(([timestamp, data]) => ({
      timestamp: new Date(timestamp),
      data
    }));
  }
}

// Agent Orchestrator - Coordinates all agents
export class AgentOrchestrator {
  constructor() {
    this.agents = new Map();
    this.activeRole = 'family'; // Default role
    this.roles = {
      paati: { name: 'Paati', preferences: { tone: 'gentle', language: 'tamil', pace: 'slow' } },
      appa: { name: 'Appa', preferences: { tone: 'practical', language: 'english', pace: 'efficient' } },
      amma: { name: 'Amma', preferences: { tone: 'nurturing', language: 'mixed', pace: 'organized' } },
      kids: { name: 'Kids', preferences: { tone: 'playful', language: 'english', pace: 'fun' } },
      family: { name: 'Family', preferences: { tone: 'warm', language: 'mixed', pace: 'balanced' } }
    };
  }

  registerAgent(agent) {
    this.agents.set(agent.name, agent);
  }

  setActiveRole(role) {
    if (this.roles[role]) {
      this.activeRole = role;
      console.log(`Active role changed to: ${this.roles[role].name}`);
    }
  }

  getRolePreferences() {
    return this.roles[this.activeRole].preferences;
  }

  async processWithAgents(input, context = {}) {
    const results = [];
    const rolePrefs = this.getRolePreferences();

    // Add role context to input
    const enhancedInput = {
      ...input,
      role: this.activeRole,
      preferences: rolePrefs,
      context
    };

    // Process through all relevant agents
    for (const [name, agent] of this.agents) {
      try {
        const result = await agent.process(enhancedInput);
        if (result) {
          results.push({ agent: name, result });
        }
      } catch (error) {
        console.error(`Error in ${name} agent:`, error);
      }
    }

    // Orchestrate responses based on role and context
    return this.orchestrateResponses(results, enhancedInput);
  }

  orchestrateResponses(agentResults, input) {
    // Prioritize responses based on role and context
    const prioritized = agentResults.sort((a, b) => {
      const priorityOrder = ['memory', 'planner', 'voice', 'ui', 'tool', 'music'];
      const aIndex = priorityOrder.indexOf(a.agent);
      const bIndex = priorityOrder.indexOf(b.agent);
      return aIndex - bIndex;
    });

    // Combine responses intelligently
    const combined = {
      responses: prioritized.map(r => r.result.response).filter(r => r),
      actions: prioritized.flatMap(r => r.result.actions || []),
      role: input.role,
      preferences: input.preferences
    };

    return combined;
  }

  async initializeAllAgents() {
    for (const agent of this.agents.values()) {
      await agent.initialize();
    }
  }

  async shutdownAllAgents() {
    for (const agent of this.agents.values()) {
      await agent.shutdown();
    }
  }
}

// Global orchestrator instance
export const orchestrator = new AgentOrchestrator();

// Reactive store for agent state
export const agentState = writable({
  activeRole: 'family',
  activeAgents: [],
  lastInteraction: null,
  memory: [],
  goals: []
});

// Helper function to detect role from context
export function detectRoleFromContext(context) {
  // Simple role detection based on time, user patterns, etc.
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 9) return 'paati'; // Early morning
  if (hour >= 9 && hour < 17) return 'appa'; // Workday
  if (hour >= 17 && hour < 21) return 'amma'; // Evening
  if (hour >= 21 || hour < 5) return 'kids'; // Night/Early morning

  return 'family'; // Default
}