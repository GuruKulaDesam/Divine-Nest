import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Todo } from '$lib/models';

// Re-export existing stores
export { todos } from './todos';

// Create discussions store with SSR-safe initialization
export const discussions: Writable<any[]> = writable([]);

// Create voiceCommands store with SSR-safe initialization
export const voiceCommands: Writable<any[]> = writable([]);

// Create tasks store (alias for todos for backward compatibility)
import { todos } from './todos';
export const tasks = todos;

// Export actions for discussions
export const discussionActions = {
  add: (discussion: any) => {
    discussions.update(current => [...current, {
      id: Date.now().toString(),
      ...discussion,
      created_at: new Date().toISOString()
    }]);
  },

  remove: (id: string) => {
    discussions.update(current => current.filter(d => d.id !== id));
  }
};

// Export actions for voice commands
export const voiceCommandActions = {
  add: (command: any) => {
    voiceCommands.update(current => [...current, {
      id: Date.now().toString(),
      ...command,
      created_at: new Date().toISOString()
    }]);
  },

  remove: (id: string) => {
    voiceCommands.update(current => current.filter(c => c.id !== id));
  }
};