/**
 * Planner Agent - Manages tasks, events, and schedules autonomously
 * Creates plans, sets reminders, and coordinates activities
 */

import { BaseAgent } from './core.js';
import { todos } from '../../stores/todos.js';
import { reminders } from '../../stores/reminders.js';
import { events } from '../../stores/events.js';
import { notes } from '../../stores/notes.js';

export class PlannerAgent extends BaseAgent {
  constructor() {
    super('planner', ['schedule', 'remind', 'plan', 'coordinate']);
    this.activePlans = new Map();
    this.routines = new Map();
    this.timeTriggers = new Map();
  }

  async initialize() {
    await super.initialize();
    this.initializeDefaultRoutines();
    this.startTimeMonitoring();
  }

  initializeDefaultRoutines() {
    // Family routines based on roles
    this.routines.set('paati', [
      { name: 'morning_prayers', time: '06:00', action: 'remind_prayer' },
      { name: 'temple_visit', time: '07:00', days: [1, 3, 5], action: 'plan_temple' },
      { name: 'grandchildren_time', time: '16:00', action: 'remind_family_time' },
      { name: 'evening_meditation', time: '19:00', action: 'suggest_meditation' }
    ]);

    this.routines.set('appa', [
      { name: 'morning_walk', time: '05:30', action: 'remind_walk' },
      { name: 'work_start', time: '09:00', action: 'check_tasks' },
      { name: 'lunch_break', time: '13:00', action: 'suggest_meal' },
      { name: 'family_time', time: '18:00', action: 'plan_family_activity' }
    ]);

    this.routines.set('amma', [
      { name: 'meal_prep', time: '07:00', action: 'plan_meals' },
      { name: 'shopping_list', time: '10:00', action: 'review_grocery' },
      { name: 'kids_pickup', time: '15:30', action: 'remind_pickup' },
      { name: 'evening_routine', time: '20:00', action: 'start_bedtime' }
    ]);

    this.routines.set('kids', [
      { name: 'school_prep', time: '07:30', action: 'remind_school' },
      { name: 'study_time', time: '17:00', action: 'start_homework' },
      { name: 'playtime', time: '16:00', action: 'suggest_activities' },
      { name: 'bedtime_story', time: '20:30', action: 'tell_story' }
    ]);
  }

  async execute(input) {
    const { type, data, role, preferences } = input;

    switch (type) {
      case 'create_plan':
        return this.createPlan(data, role);
      case 'schedule_task':
        return this.scheduleTask(data, role);
      case 'check_routines':
        return this.checkRoutines(role);
      case 'coordinate_activity':
        return this.coordinateActivity(data, role);
      case 'time_trigger':
        return this.handleTimeTrigger(data);
      default:
        return this.analyzeAndPlan(input);
    }
  }

  createPlan(planData, role) {
    const planId = `plan_${role}_${Date.now()}`;
    const plan = {
      id: planId,
      ...planData,
      role,
      created: new Date(),
      status: 'active',
      steps: planData.steps || [],
      deadline: planData.deadline || null
    };

    this.activePlans.set(planId, plan);

    return {
      response: `Created plan: ${planData.title} for ${role}`,
      actions: [
        { type: 'plan_created', data: plan },
        { type: 'schedule_reminders', data: { planId, steps: plan.steps } }
      ]
    };
  }

  scheduleTask(taskData, role) {
    const task = {
      ...taskData,
      role,
      scheduled: new Date(),
      status: 'pending'
    };

    // Add to appropriate store based on type
    if (task.type === 'todo') {
      todos.update(t => [...t, { ...task, id: Date.now(), completed: false }]);
    } else if (task.type === 'reminder') {
      reminders.update(r => [...r, { ...task, id: Date.now(), completed: false }]);
    } else if (task.type === 'event') {
      events.update(e => [...e, { ...task, id: Date.now() }]);
    }

    return {
      response: `Scheduled ${task.type}: ${task.title} for ${role}`,
      actions: [{ type: 'task_scheduled', data: task }]
    };
  }

  checkRoutines(role) {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const roleRoutines = this.routines.get(role) || [];
    const dueRoutines = roleRoutines.filter(routine => {
      const isTimeMatch = routine.time === currentTime;
      const isDayMatch = !routine.days || routine.days.includes(currentDay);
      return isTimeMatch && isDayMatch;
    });

    if (dueRoutines.length > 0) {
      const actions = dueRoutines.map(routine => ({
        type: routine.action,
        data: { routine: routine.name, role, time: routine.time }
      }));

      return {
        response: `Time for ${role}'s ${dueRoutines.map(r => r.name).join(', ')}`,
        actions
      };
    }

    return {
      response: `No routines due for ${role} at this time`,
      actions: []
    };
  }

  coordinateActivity(activityData, role) {
    // Coordinate activities across family members
    const coordination = {
      activity: activityData.title,
      participants: activityData.participants || [role],
      time: activityData.time,
      coordination: this.generateCoordinationPlan(activityData, role)
    };

    return {
      response: `Coordinated ${activityData.title} for ${coordination.participants.join(', ')}`,
      actions: [
        { type: 'activity_coordinated', data: coordination },
        { type: 'send_notifications', data: { activity: coordination } }
      ]
    };
  }

  handleTimeTrigger(triggerData) {
    const { time, action, context } = triggerData;

    // Execute time-based actions
    switch (action) {
      case 'remind_prayer':
        return this.createPrayerReminder(context);
      case 'plan_temple':
        return this.planTempleVisit(context);
      case 'remind_walk':
        return this.createWalkReminder(context);
      case 'check_tasks':
        return this.checkPendingTasks(context);
      case 'suggest_meal':
        return this.suggestMealBreak(context);
      case 'plan_meals':
        return this.planMeals(context);
      case 'remind_pickup':
        return this.createPickupReminder(context);
      case 'start_bedtime':
        return this.startBedtimeRoutine(context);
      default:
        return { response: `Unknown time trigger: ${action}`, actions: [] };
    }
  }

  analyzeAndPlan(input) {
    // Analyze input and create proactive plans
    const { text, role, preferences } = input;

    // Simple intent analysis
    if (text.includes('tired') || text.includes('rest')) {
      return this.createRestPlan(role);
    }

    if (text.includes('hungry') || text.includes('eat')) {
      return this.createMealPlan(role);
    }

    if (text.includes('busy') || text.includes('work')) {
      return this.createFocusPlan(role);
    }

    return {
      response: `Analyzed input for ${role}, no specific plan needed`,
      actions: []
    };
  }

  // Specific planning methods
  createPrayerReminder(context) {
    return {
      response: "Time for morning prayers",
      actions: [{
        type: 'create_reminder',
        data: {
          title: 'Morning Prayers',
          message: 'Time for your daily prayers and meditation',
          time: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
          role: context.role
        }
      }]
    };
  }

  planTempleVisit(context) {
    const today = new Date();
    const templeTime = new Date(today);
    templeTime.setHours(7, 0, 0, 0);

    return {
      response: "Planning temple visit for today",
      actions: [{
        type: 'create_event',
        data: {
          title: 'Temple Visit',
          date: today.toISOString().split('T')[0],
          time: '07:00',
          category: 'spiritual',
          role: context.role
        }
      }]
    };
  }

  createWalkReminder(context) {
    return {
      response: "Time for your morning walk",
      actions: [{
        type: 'create_reminder',
        data: {
          title: 'Morning Walk',
          message: 'Time for your daily walk - stay healthy!',
          time: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
          role: context.role
        }
      }]
    };
  }

  checkPendingTasks(context) {
    // Check for pending tasks and create reminders
    return {
      response: "Checking your pending tasks for today",
      actions: [{ type: 'review_tasks', data: { role: context.role } }]
    };
  }

  suggestMealBreak(context) {
    return {
      response: "Time for lunch break",
      actions: [{
        type: 'create_reminder',
        data: {
          title: 'Lunch Break',
          message: 'Take a break and have your meal',
          time: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          role: context.role
        }
      }]
    };
  }

  planMeals(context) {
    return {
      response: "Planning meals for the day",
      actions: [{ type: 'plan_meals', data: { role: context.role } }]
    };
  }

  createPickupReminder(context) {
    return {
      response: "Time to pick up the children",
      actions: [{
        type: 'create_reminder',
        data: {
          title: 'School Pickup',
          message: 'Time to pick up the children from school',
          time: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          role: context.role
        }
      }]
    };
  }

  startBedtimeRoutine(context) {
    return {
      response: "Starting bedtime routine for the children",
      actions: [
        { type: 'create_reminder', data: { title: 'Bedtime Story', role: 'kids' } },
        { type: 'dim_lights', data: {} },
        { type: 'play_soft_music', data: {} }
      ]
    };
  }

  createRestPlan(role) {
    return {
      response: `Creating a rest plan for ${role}`,
      actions: [{
        type: 'create_plan',
        data: {
          title: 'Rest and Recovery',
          steps: [
            'Take a short break',
            'Drink water',
            'Do deep breathing',
            'Rest for 15 minutes'
          ],
          role
        }
      }]
    };
  }

  createMealPlan(role) {
    return {
      response: `Planning a meal for ${role}`,
      actions: [{
        type: 'suggest_meal',
        data: { role, time: new Date().toTimeString().slice(0, 5) }
      }]
    };
  }

  createFocusPlan(role) {
    return {
      response: `Creating focus plan for ${role}`,
      actions: [{
        type: 'create_plan',
        data: {
          title: 'Focus Session',
          steps: [
            'Clear workspace',
            'Set timer for 25 minutes',
            'Work without distractions',
            'Take a 5-minute break'
          ],
          role
        }
      }]
    };
  }

  generateCoordinationPlan(activity, role) {
    // Generate coordination steps for family activities
    return [
      `Notify all participants about ${activity.title}`,
      `Check availability for ${activity.time}`,
      `Prepare necessary items`,
      `Confirm participation`,
      `Execute activity`
    ];
  }

  startTimeMonitoring() {
    // Check routines every minute
    setInterval(() => {
      this.checkAllRoutines();
    }, 60000);
  }

  checkAllRoutines() {
    const roles = ['paati', 'appa', 'amma', 'kids'];
    roles.forEach(role => {
      const result = this.checkRoutines(role);
      if (result.actions.length > 0) {
        // Execute routine actions
        result.actions.forEach(action => {
          this.handleTimeTrigger({
            time: new Date().toTimeString().slice(0, 5),
            action: action.type,
            context: { role }
          });
        });
      }
    });
  }
}