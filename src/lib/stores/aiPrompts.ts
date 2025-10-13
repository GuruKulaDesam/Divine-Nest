import { writable } from 'svelte/store';
import type { AIPrompt } from '$lib/models';

const initialAIPrompts: AIPrompt[] = [
  {
    id: '1',
    type: 'Alert',
    category: 'SMS',
    purpose: 'Morning prayer reminder',
    trigger_time: '06:00',
    frequency: 'Daily',
    sound_type: 'Positive',
    volume_level: 'Medium',
    conditions: 'Before sunrise',
    applicable_roles: ['Father', 'Mother', 'Child', 'Grandparent'],
    created_at: '2024-01-15T06:00:00Z'
  },
  {
    id: '2',
    type: 'Notes',
    category: 'WhatsApp',
    purpose: 'Daily gratitude journal',
    trigger_time: '20:00',
    frequency: 'Daily',
    sound_type: 'Pleasant',
    volume_level: 'Low',
    conditions: 'After dinner',
    applicable_roles: ['Father', 'Mother', 'Child'],
    created_at: '2024-01-16T20:00:00Z'
  },
  {
    id: '3',
    type: 'Checklist',
    category: 'Alarm',
    purpose: 'Evening chores reminder',
    trigger_time: '18:00',
    frequency: 'Daily',
    sound_type: 'Positive',
    volume_level: 'High',
    conditions: 'School/Office hours end',
    applicable_roles: ['Child', 'Mother'],
    created_at: '2024-01-17T18:00:00Z'
  },
  {
    id: '4',
    type: 'Query',
    category: 'Email',
    purpose: 'Weekly meal planning',
    trigger_time: '09:00',
    frequency: 'Weekly',
    sound_type: 'Pleasant',
    volume_level: 'Medium',
    conditions: 'Every Sunday morning',
    applicable_roles: ['Mother', 'Father'],
    created_at: '2024-01-18T09:00:00Z'
  },
  {
    id: '5',
    type: 'Alert',
    category: 'Phone',
    purpose: 'Festival preparation reminder',
    trigger_time: '08:00',
    frequency: 'Monthly',
    sound_type: 'Alarming',
    volume_level: 'High',
    conditions: '15 days before festival',
    applicable_roles: ['Father', 'Mother'],
    created_at: '2024-01-19T08:00:00Z'
  },
  {
    id: '6',
    type: 'Notes',
    category: 'Calendar Schedule',
    purpose: 'Family meeting reminder',
    trigger_time: '19:00',
    frequency: 'Weekly',
    sound_type: 'Positive',
    volume_level: 'Medium',
    conditions: 'Every Sunday evening',
    applicable_roles: ['Father', 'Mother', 'Child', 'Grandparent'],
    created_at: '2024-01-20T19:00:00Z'
  },
  {
    id: '7',
    type: 'Checklist',
    category: 'SMS',
    purpose: 'Homework completion check',
    trigger_time: '21:00',
    frequency: 'Daily',
    sound_type: 'Positive',
    volume_level: 'Medium',
    conditions: 'School days only',
    applicable_roles: ['Child', 'Mother'],
    created_at: '2024-01-21T21:00:00Z'
  },
  {
    id: '8',
    type: 'Query',
    category: 'WhatsApp',
    purpose: 'Monthly expense review',
    trigger_time: '10:00',
    frequency: 'Monthly',
    sound_type: 'Pleasant',
    volume_level: 'Low',
    conditions: 'First day of month',
    applicable_roles: ['Father', 'Mother'],
    created_at: '2024-01-22T10:00:00Z'
  },
  {
    id: '9',
    type: 'Alert',
    category: 'Alarm',
    purpose: 'Medicine reminder',
    trigger_time: '08:00',
    trigger_location_lat: 10.8505,
    trigger_location_lng: 76.2044,
    trigger_radius_meters: 100,
    frequency: 'Daily',
    sound_type: 'Alarming',
    volume_level: 'High',
    conditions: 'Location-based: Home',
    applicable_roles: ['Grandparent', 'Mother'],
    created_at: '2024-01-23T08:00:00Z'
  },
  {
    id: '10',
    type: 'Notes',
    category: 'Email',
    purpose: 'Weekly spiritual reading',
    trigger_time: '07:00',
    frequency: 'Weekly',
    sound_type: 'Positive',
    volume_level: 'Low',
    conditions: 'Every Monday morning',
    applicable_roles: ['Father', 'Mother', 'Grandparent'],
    created_at: '2024-01-24T07:00:00Z'
  }
];

function createAIPromptsStore() {
  const { subscribe, set, update } = writable<AIPrompt[]>(initialAIPrompts);

  return {
    subscribe,
    set,
    update,

    // CRUD operations
    addAIPrompt: (aiPrompt: Omit<AIPrompt, 'id' | 'created_at'>) => {
      const newAIPrompt: AIPrompt = {
        ...aiPrompt,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };

      update(prompts => [...prompts, newAIPrompt]);
      return newAIPrompt;
    },

    updateAIPrompt: (id: string, updates: Partial<AIPrompt>) => {
      update(prompts =>
        prompts.map(prompt =>
          prompt.id === id ? { ...prompt, ...updates } : prompt
        )
      );
    },

    deleteAIPrompt: (id: string) => {
      update(prompts => prompts.filter(prompt => prompt.id !== id));
    },

    getAIPrompt: (id: string): AIPrompt | undefined => {
      let result: AIPrompt | undefined;
      update(prompts => {
        result = prompts.find(prompt => prompt.id === id);
        return prompts;
      });
      return result;
    },

    getAIPromptsByType: (type: AIPrompt['type']): AIPrompt[] => {
      let result: AIPrompt[] = [];
      update(prompts => {
        result = prompts.filter(prompt => prompt.type === type);
        return prompts;
      });
      return result;
    },

    getAIPromptsByCategory: (category: AIPrompt['category']): AIPrompt[] => {
      let result: AIPrompt[] = [];
      update(prompts => {
        result = prompts.filter(prompt => prompt.category === category);
        return prompts;
      });
      return result;
    },

    getAIPromptsByFrequency: (frequency: AIPrompt['frequency']): AIPrompt[] => {
      let result: AIPrompt[] = [];
      update(prompts => {
        result = prompts.filter(prompt => prompt.frequency === frequency);
        return prompts;
      });
      return result;
    },

    // Get active prompts (those that should trigger based on current time/location)
    getActivePrompts: (currentTime?: string, currentLocation?: { lat: number; lng: number }): AIPrompt[] => {
      let result: AIPrompt[] = [];
      update(prompts => {
        result = prompts.filter(prompt => {
          // Check if prompt should be active based on time
          if (prompt.trigger_time && currentTime) {
            const promptTime = prompt.trigger_time;
            const current = currentTime.split(':');
            const promptT = promptTime.split(':');

            if (current[0] === promptT[0] && current[1] === promptT[1]) {
              // Check location if specified
              if (prompt.trigger_location_lat && prompt.trigger_location_lng && currentLocation) {
                const distance = calculateDistance(
                  currentLocation.lat, currentLocation.lng,
                  prompt.trigger_location_lat, prompt.trigger_location_lng
                );
                return distance <= (prompt.trigger_radius_meters || 100);
              }
              return true;
            }
          }
          return false;
        });
        return prompts;
      });
      return result;
    },

    // Reset to initial data
    reset: () => set(initialAIPrompts)
  };
}

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export const aiPrompts = createAIPromptsStore();