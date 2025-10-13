import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { sqliteService } from '$lib/services/sqliteService';

// User roles as defined in the AD
export type UserRole = 'mother' | 'grandmother' | 'helper' | 'teenager' | 'father' | 'elder';

// User role store - initialize with default value for SSR compatibility
export const userRole = writable<UserRole>('mother');

// Role-specific dashboard configurations
export const roleDashboards = {
  mother: {
    title: 'Mother\'s Dashboard',
    primaryColor: 'bg-rose-50',
    accentColor: 'text-rose-600',
    focusAreas: ['groceries', 'school_fees', 'helper_schedule', 'family_meals', 'children_care'],
    quickActions: ['grocery_list', 'school_reminders', 'helper_tasks', 'meal_planner'],
    widgets: ['todays_schedule', 'family_reminders', 'grocery_alerts', 'school_fees_due']
  },
  grandmother: {
    title: 'Grandmother\'s Dashboard',
    primaryColor: 'bg-amber-50',
    accentColor: 'text-amber-600',
    focusAreas: ['temple_reminders', 'medicine_alerts', 'grandchildren_care', 'rituals'],
    quickActions: ['temple_timings', 'medicine_reminder', 'prayer_schedule', 'story_time'],
    widgets: ['temple_reminders', 'medicine_schedule', 'ritual_calendar', 'family_stories']
  },
  helper: {
    title: 'Helper\'s Dashboard',
    primaryColor: 'bg-blue-50',
    accentColor: 'text-blue-600',
    focusAreas: ['daily_tasks', 'attendance', 'household_chores', 'schedule'],
    quickActions: ['task_list', 'time_clock', 'cleaning_schedule', 'shopping_list'],
    widgets: ['todays_tasks', 'time_tracker', 'upcoming_chores', 'performance_stars']
  },
  teenager: {
    title: 'Teenager\'s Dashboard',
    primaryColor: 'bg-purple-50',
    accentColor: 'text-purple-600',
    focusAreas: ['study_tracker', 'mood_check', 'hobbies', 'personal_goals'],
    quickActions: ['study_planner', 'mood_tracker', 'hobby_log', 'goal_tracker'],
    widgets: ['study_schedule', 'mood_chart', 'achievement_badges', 'personal_goals']
  },
  father: {
    title: 'Father\'s Dashboard',
    primaryColor: 'bg-indigo-50',
    accentColor: 'text-indigo-600',
    focusAreas: ['bills_payments', 'family_finances', 'work_schedule', 'maintenance'],
    quickActions: ['bill_payments', 'expense_tracker', 'maintenance_schedule', 'family_budget'],
    widgets: ['financial_overview', 'upcoming_bills', 'maintenance_alerts', 'work_schedule']
  },
  elder: {
    title: 'Elder\'s Dashboard',
    primaryColor: 'bg-emerald-50',
    accentColor: 'text-emerald-600',
    focusAreas: ['health_reminders', 'rituals', 'family_events', 'peaceful_activities'],
    quickActions: ['health_tracker', 'ritual_planner', 'family_calendar', 'meditation'],
    widgets: ['health_reminders', 'ritual_schedule', 'family_events', 'wellness_tracker']
  }
};

// Initialize user role from SQLite (only in browser environment)
async function initializeFromSQLite() {
  if (!browser) return; // Skip on server-side

  try {
    await sqliteService.initialize();
    const savedRoleData = await sqliteService.getUserRole();
    if (savedRoleData && Object.keys(roleDashboards).includes(savedRoleData.role)) {
      userRole.set(savedRoleData.role as UserRole);
      console.log('User role loaded from SQLite:', savedRoleData.role);
    } else {
      // Set default role if none exists
      await sqliteService.saveUserRole('mother', 'mother');
      console.log('Default user role set to mother');
    }
  } catch (error) {
    console.warn('Failed to initialize userRole from SQLite:', error);
    // Keep default role on error
  }
}

// User role actions
export const userRoleActions = {
  init: async () => {
    if (browser) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(async () => {
        await initializeFromSQLite();
      });
    }
  }
};

// Initialize only in browser after component mount - MOVED TO INIT FUNCTION
// if (browser) {
//   // Use requestAnimationFrame to ensure DOM is ready
//   requestAnimationFrame(() => {
//     initializeFromSQLite();
//   });
// }

// Function to set user role
export async function setUserRole(role: UserRole) {
  try {
    userRole.set(role);
    if (browser) {
      await sqliteService.saveUserRole(role, role);
    }
    console.log('User role saved:', role);
  } catch (error) {
    console.warn('Failed to save userRole:', error);
    // Still update the store even if save fails
    userRole.set(role);
  }
}

// Get current role dashboard config
export function getCurrentRoleDashboard() {
  const currentRole = get(userRole);
  return roleDashboards[currentRole];
}