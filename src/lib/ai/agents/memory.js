/**
 * Memory Agent - Stores and retrieves contextual information
 * Handles facts, routines, emotional states, and user preferences
 */

import { BaseAgent } from './core.js';

export class MemoryAgent extends BaseAgent {
  constructor() {
    super('memory', ['store', 'recall', 'learn', 'context']);
    this.longTermMemory = new Map();
    this.shortTermMemory = [];
    this.emotionalContext = new Map();
    this.userProfiles = new Map();
    this.routines = new Map();
  }

  async initialize() {
    await super.initialize();
    this.loadPersistedMemory();
    this.initializeDefaultProfiles();
  }

  initializeDefaultProfiles() {
    // Default profiles for family members
    this.userProfiles.set('paati', {
      name: 'Paati',
      preferences: {
        tone: 'gentle',
        language: 'tamil',
        pace: 'slow',
        interests: ['devotional', 'health', 'family'],
        routines: ['morning_prayers', 'temple_visits', 'grandchildren_time']
      },
      emotional_patterns: ['gratitude', 'concern', 'peace'],
      facts: ['prefers_soft_reminders', 'loves_devotional_music', 'needs_help_with_technology']
    });

    this.userProfiles.set('appa', {
      name: 'Appa',
      preferences: {
        tone: 'practical',
        language: 'english',
        pace: 'efficient',
        interests: ['work', 'health', 'projects'],
        routines: ['morning_walk', 'work_tasks', 'family_time']
      },
      emotional_patterns: ['focused', 'concerned', 'proud'],
      facts: ['early_riser', 'loves_voice_to_music', 'manages_finances']
    });

    this.userProfiles.set('amma', {
      name: 'Amma',
      preferences: {
        tone: 'nurturing',
        language: 'mixed',
        pace: 'organized',
        interests: ['cooking', 'health', 'children'],
        routines: ['meal_planning', 'shopping', 'wellness']
      },
      emotional_patterns: ['caring', 'worried', 'joyful'],
      facts: ['meal_planner', 'health_conscious', 'manages_household']
    });

    this.userProfiles.set('kids', {
      name: 'Kids',
      preferences: {
        tone: 'playful',
        language: 'english',
        pace: 'fun',
        interests: ['games', 'learning', 'stories'],
        routines: ['school', 'playtime', 'bedtime_stories']
      },
      emotional_patterns: ['excited', 'curious', 'tired'],
      facts: ['love_stories', 'learning_oriented', 'need_routines']
    });
  }

  async execute(input) {
    const { type, data, role } = input;

    switch (type) {
      case 'store_fact':
        return this.storeFact(data, role);
      case 'recall_context':
        return this.recallContext(role, data?.category);
      case 'update_emotion':
        return this.updateEmotionalContext(role, data?.emotion);
      case 'learn_routine':
        return this.learnRoutine(data, role);
      case 'get_profile':
        return this.getUserProfile(role);
      default:
        return this.provideContext(input);
    }
  }

  storeFact(fact, role) {
    const key = `${role}_${Date.now()}`;
    this.longTermMemory.set(key, {
      fact,
      role,
      timestamp: new Date(),
      confidence: 1.0
    });

    return {
      response: `Learned: ${fact}`,
      actions: [{ type: 'memory_stored', data: { key, fact, role } }]
    };
  }

  recallContext(role, category = null) {
    const relevantFacts = Array.from(this.longTermMemory.values())
      .filter(item => item.role === role)
      .filter(item => !category || this.categorizeFact(item.fact) === category)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);

    const profile = this.userProfiles.get(role);
    const emotionalState = this.emotionalContext.get(role) || 'neutral';

    return {
      response: `Context for ${role}: ${relevantFacts.length} relevant facts, emotional state: ${emotionalState}`,
      actions: [],
      context: {
        facts: relevantFacts,
        profile,
        emotionalState,
        routines: this.routines.get(role) || []
      }
    };
  }

  updateEmotionalContext(role, emotion) {
    this.emotionalContext.set(role, emotion);

    // Store emotional pattern
    const key = `emotion_${role}_${Date.now()}`;
    this.longTermMemory.set(key, {
      fact: `Felt ${emotion}`,
      role,
      timestamp: new Date(),
      type: 'emotion',
      confidence: 0.8
    });

    return {
      response: `Emotional context updated for ${role}: ${emotion}`,
      actions: [{ type: 'emotion_updated', data: { role, emotion } }]
    };
  }

  learnRoutine(routine, role) {
    const existing = this.routines.get(role) || [];
    existing.push({
      ...routine,
      learned: new Date(),
      confidence: 0.6 // Start with moderate confidence
    });

    this.routines.set(role, existing);

    return {
      response: `Learned routine for ${role}: ${routine.name}`,
      actions: [{ type: 'routine_learned', data: { role, routine } }]
    };
  }

  getUserProfile(role) {
    const profile = this.userProfiles.get(role);
    if (!profile) {
      return {
        response: `No profile found for ${role}`,
        actions: []
      };
    }

    return {
      response: `Profile loaded for ${profile.name}`,
      actions: [],
      profile
    };
  }

  provideContext(input) {
    // Provide contextual information based on current input
    const role = input.role || 'family';
    const profile = this.userProfiles.get(role);
    const emotionalState = this.emotionalContext.get(role) || 'neutral';

    // Get recent relevant facts
    const recentFacts = Array.from(this.longTermMemory.values())
      .filter(item => item.role === role)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3);

    return {
      response: `Context provided for ${role}`,
      actions: [],
      context: {
        profile,
        emotionalState,
        recentFacts,
        preferences: profile?.preferences || {}
      }
    };
  }

  categorizeFact(fact) {
    const categories = {
      preference: ['prefers', 'likes', 'loves', 'needs'],
      routine: ['every day', 'usually', 'always', 'schedule'],
      health: ['health', 'medicine', 'doctor', 'pain', 'tired'],
      emotion: ['happy', 'sad', 'worried', 'excited', 'grateful'],
      family: ['family', 'children', 'parents', 'relatives']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => fact.toLowerCase().includes(keyword))) {
        return category;
      }
    }

    return 'general';
  }

  loadPersistedMemory() {
    // Load from localStorage or database
    try {
      const stored = localStorage.getItem('shivo_memory');
      if (stored) {
        const data = JSON.parse(stored);
        this.longTermMemory = new Map(data.longTermMemory || []);
        this.emotionalContext = new Map(data.emotionalContext || []);
        this.routines = new Map(data.routines || []);
      }
    } catch (error) {
      console.warn('Failed to load persisted memory:', error);
    }
  }

  persistMemory() {
    // Save to localStorage
    try {
      const data = {
        longTermMemory: Array.from(this.longTermMemory.entries()),
        emotionalContext: Array.from(this.emotionalContext.entries()),
        routines: Array.from(this.routines.entries())
      };
      localStorage.setItem('shivo_memory', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to persist memory:', error);
    }
  }

  // Auto-persist memory periodically
  startAutoPersist() {
    setInterval(() => this.persistMemory(), 30000); // Every 30 seconds
  }
}