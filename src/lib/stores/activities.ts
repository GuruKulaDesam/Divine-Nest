import { writable } from 'svelte/store';
import type { Activity } from '$lib/models';

// Sample activities data
const sampleActivities: Activity[] = [
  {
    id: '1',
    title: 'Morning Yoga Session',
    description: 'Daily yoga practice for physical and mental wellness',
    type: 'Physical',
    category: 'Wellness',
    priority: 'High',
    status: 'Completed',
    assignedTo: 'மகள்',
    dueDate: '2025-01-15',
    completedDate: '2025-01-15',
    duration: 30,
    location: 'Home Yoga Room',
    participants: ['மகள்'],
    notes: 'Focused on breathing exercises and meditation',
    tags: ['yoga', 'wellness', 'morning'],
    createdAt: '2025-01-15T06:00:00Z',
    updatedAt: '2025-01-15T06:30:00Z',
    applicable_roles: ['mother', 'father', 'child', 'teenager']
  },
  {
    id: '2',
    title: 'Family Temple Visit',
    description: 'Weekly temple visit and prayer session',
    type: 'Spiritual',
    category: 'Religious',
    priority: 'High',
    status: 'Scheduled',
    assignedTo: 'கணவர்',
    dueDate: '2025-01-18',
    duration: 120,
    location: 'Local Temple',
    participants: ['கணவர்', 'மகள்', 'மகன்', 'நான்'],
    notes: 'Include special prayers for family health',
    tags: ['temple', 'prayers', 'family'],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
    applicable_roles: ['mother', 'father', 'grandmother', 'grandfather']
  },
  {
    id: '3',
    title: 'Chess Tournament Practice',
    description: 'Weekly chess practice session for son',
    type: 'Mental',
    category: 'Education',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'மகன்',
    dueDate: '2025-01-16',
    duration: 60,
    location: 'Living Room',
    participants: ['மகன்', 'கணவர்'],
    notes: 'Focus on opening strategies and endgame',
    tags: ['chess', 'education', 'practice'],
    createdAt: '2025-01-12T14:00:00Z',
    updatedAt: '2025-01-15T15:00:00Z',
    applicable_roles: ['child', 'teenager', 'father']
  },
  {
    id: '4',
    title: 'Grocery Shopping',
    description: 'Weekly grocery shopping for household supplies',
    type: 'Practical',
    category: 'Household',
    priority: 'High',
    status: 'Pending',
    assignedTo: 'நான்',
    dueDate: '2025-01-17',
    duration: 90,
    location: 'Local Market',
    participants: ['நான்'],
    notes: 'Include vegetables, fruits, and cleaning supplies',
    tags: ['shopping', 'grocery', 'household'],
    createdAt: '2025-01-14T09:00:00Z',
    updatedAt: '2025-01-14T09:00:00Z',
    applicable_roles: ['mother', 'helper']
  },
  {
    id: '5',
    title: 'Music Practice Session',
    description: 'Veena practice for daughter',
    type: 'Creative',
    category: 'Arts',
    priority: 'Medium',
    status: 'Scheduled',
    assignedTo: 'மகள்',
    dueDate: '2025-01-16',
    duration: 45,
    location: 'Music Room',
    participants: ['மகள்'],
    notes: 'Practice Carnatic music ragas',
    tags: ['music', 'veena', 'practice'],
    createdAt: '2025-01-13T16:00:00Z',
    updatedAt: '2025-01-13T16:00:00Z',
    applicable_roles: ['child', 'teenager']
  },
  {
    id: '6',
    title: 'Garden Maintenance',
    description: 'Monthly garden cleaning and plant care',
    type: 'Physical',
    category: 'Household',
    priority: 'Low',
    status: 'Pending',
    assignedTo: 'கணவர்',
    dueDate: '2025-01-20',
    duration: 60,
    location: 'Backyard Garden',
    participants: ['கணவர்', 'மகன்'],
    notes: 'Water plants, remove weeds, check for pests',
    tags: ['garden', 'maintenance', 'plants'],
    createdAt: '2025-01-08T08:00:00Z',
    updatedAt: '2025-01-08T08:00:00Z',
    applicable_roles: ['father', 'child', 'helper']
  },
  {
    id: '7',
    title: 'Family Movie Night',
    description: 'Weekly family entertainment and bonding',
    type: 'Social',
    category: 'Entertainment',
    priority: 'Medium',
    status: 'Scheduled',
    assignedTo: 'கணவர்',
    dueDate: '2025-01-19',
    duration: 150,
    location: 'Living Room',
    participants: ['கணவர்', 'மகள்', 'மகன்', 'நான்'],
    notes: 'Choose a family-friendly movie with educational value',
    tags: ['movie', 'family', 'entertainment'],
    createdAt: '2025-01-11T19:00:00Z',
    updatedAt: '2025-01-11T19:00:00Z',
    applicable_roles: ['mother', 'father', 'child', 'teenager']
  },
  {
    id: '8',
    title: 'Homework Assistance',
    description: 'Help children with school assignments',
    type: 'Educational',
    category: 'Education',
    priority: 'High',
    status: 'Completed',
    assignedTo: 'நான்',
    dueDate: '2025-01-14',
    completedDate: '2025-01-14',
    duration: 90,
    location: 'Study Room',
    participants: ['நான்', 'மகள்', 'மகன்'],
    notes: 'Mathematics and science homework completed',
    tags: ['homework', 'education', 'help'],
    createdAt: '2025-01-14T17:00:00Z',
    updatedAt: '2025-01-14T18:30:00Z',
    applicable_roles: ['mother', 'father']
  },
  {
    id: '9',
    title: 'Cooking Class',
    description: 'Learn traditional South Indian recipes',
    type: 'Educational',
    category: 'Culinary',
    priority: 'Medium',
    status: 'Scheduled',
    assignedTo: 'மகள்',
    dueDate: '2025-01-22',
    duration: 120,
    location: 'Kitchen',
    participants: ['மகள்', 'நான்'],
    notes: 'Learn to make authentic dosa and sambar',
    tags: ['cooking', 'traditional', 'learning'],
    createdAt: '2025-01-09T11:00:00Z',
    updatedAt: '2025-01-09T11:00:00Z',
    applicable_roles: ['mother', 'child', 'teenager']
  },
  {
    id: '10',
    title: 'Health Check-up',
    description: 'Annual family health examination',
    type: 'Health',
    category: 'Medical',
    priority: 'High',
    status: 'Scheduled',
    assignedTo: 'கணவர்',
    dueDate: '2025-01-25',
    duration: 180,
    location: 'Family Clinic',
    participants: ['கணவர்', 'மகள்', 'மகன்', 'நான்'],
    notes: 'Complete health check-up including blood tests',
    tags: ['health', 'checkup', 'medical'],
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-05T10:00:00Z',
    applicable_roles: ['mother', 'father', 'child', 'teenager']
  }
];

// Voice commands for activities
const voiceCommands = [
  'schedule yoga session',
  'plan temple visit',
  'add homework help',
  'schedule grocery shopping',
  'plan family movie night',
  'add music practice',
  'schedule garden maintenance',
  'plan cooking class',
  'schedule health checkup',
  'add chess practice'
];

// Discussions for activities
const discussions = [
  {
    id: '1',
    tableName: 'activities',
    recordId: 'dashboard',
    author: 'நான்',
    content: 'Should we include more outdoor activities for the children?',
    timestamp: '2025-01-15T08:00:00Z',
    replies: [
      {
        id: '1-1',
        author: 'கணவர்',
        content: 'Yes, outdoor activities are important for physical development.',
        timestamp: '2025-01-15T08:30:00Z'
      }
    ]
  },
  {
    id: '2',
    tableName: 'activities',
    recordId: 'dashboard',
    author: 'மகள்',
    content: 'Can we have more music practice sessions?',
    timestamp: '2025-01-14T16:00:00Z',
    replies: []
  }
];

// Create the store
export const activities = writable<Activity[]>(sampleActivities);

// Store actions
export const activityActions = {
  add: (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    activities.update(current => [...current, newActivity]);
    return newActivity;
  },

  update: (id: string, updates: Partial<Activity>) => {
    activities.update(current =>
      current.map(activity =>
        activity.id === id
          ? { ...activity, ...updates, updatedAt: new Date().toISOString() }
          : activity
      )
    );
  },

  delete: (id: string) => {
    activities.update(current => current.filter(activity => activity.id !== id));
  },

  getById: (id: string) => {
    let result: Activity | undefined;
    activities.subscribe(current => {
      result = current.find(activity => activity.id === id);
    })();
    return result;
  },

  getByType: (type: string) => {
    let result: Activity[] = [];
    activities.subscribe(current => {
      result = current.filter(activity => activity.type === type);
    })();
    return result;
  },

  getByStatus: (status: string) => {
    let result: Activity[] = [];
    activities.subscribe(current => {
      result = current.filter(activity => activity.status === status);
    })();
    return result;
  },

  getUpcoming: (days: number = 7) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    let result: Activity[] = [];
    activities.subscribe(current => {
      result = current.filter(activity => {
        const dueDate = new Date(activity.dueDate);
        return dueDate <= futureDate && activity.status !== 'Completed';
      });
    })();
    return result;
  }
};

// Export discussions and voice commands
export { discussions as activitiesDiscussions, voiceCommands as activitiesVoiceCommands };