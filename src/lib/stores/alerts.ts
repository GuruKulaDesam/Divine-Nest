import { writable } from 'svelte/store';
import type { Alert } from '$lib/models';

// Sample alerts data - notifications and reminders
const sampleAlertsData: Alert[] = [
  {
    id: '1',
    type: 'SMS',
    recipient: '+91-9876543210',
    message: 'Reminder: Family health checkup scheduled for tomorrow at 10 AM',
    related_table: 'family',
    related_id: 'health-checkup-2025',
    trigger_time: '2025-01-14T20:00:00Z',
    sent_at: '2025-01-14T20:00:00Z',
    status: 'Sent',
    applicable_roles: ['mother', 'father'],
    created_at: '2025-01-13T00:00:00Z'
  },
  {
    id: '2',
    type: 'WhatsApp',
    recipient: '+91-9876543212',
    message: 'Pongal festival preparations reminder - start cooking tomorrow',
    related_table: 'food',
    related_id: 'pongal-2025',
    trigger_time: '2025-01-13T18:00:00Z',
    status: 'Pending',
    applicable_roles: ['mother', 'grandmother'],
    created_at: '2025-01-12T00:00:00Z'
  },
  {
    id: '3',
    type: 'Email',
    recipient: 'father@example.com',
    message: 'Monthly expense report is ready for review',
    related_table: 'finances',
    related_id: 'expense-report-jan-2025',
    trigger_time: '2025-01-15T09:00:00Z',
    sent_at: '2025-01-15T09:00:00Z',
    status: 'Sent',
    applicable_roles: ['father'],
    created_at: '2025-01-14T00:00:00Z'
  },
  {
    id: '4',
    type: 'Alarm',
    recipient: 'family-group',
    message: 'School pickup time - children need to be picked up in 30 minutes',
    related_table: 'education',
    related_id: 'school-schedule',
    trigger_time: '2025-01-15T15:30:00Z',
    status: 'Pending',
    applicable_roles: ['mother', 'father'],
    created_at: '2025-01-15T00:00:00Z'
  },
  {
    id: '5',
    type: 'SMS',
    recipient: '+91-9876543214',
    message: 'Temple visit reminder - Full moon pooja tomorrow evening',
    related_table: 'culture',
    related_id: 'pooja-reminder-2025',
    trigger_time: '2025-01-14T19:00:00Z',
    sent_at: '2025-01-14T19:00:00Z',
    status: 'Sent',
    applicable_roles: ['mother', 'father', 'grandmother', 'grandfather'],
    created_at: '2025-01-13T00:00:00Z'
  },
  {
    id: '6',
    type: 'WhatsApp',
    recipient: '+91-9876543216',
    message: 'Grocery shopping reminder - weekly supplies needed',
    related_table: 'inventory',
    related_id: 'grocery-list-2025',
    trigger_time: '2025-01-16T08:00:00Z',
    status: 'Pending',
    applicable_roles: ['mother'],
    created_at: '2025-01-15T00:00:00Z'
  },
  {
    id: '7',
    type: 'Email',
    recipient: 'mother@example.com',
    message: 'Children\'s school event - Annual day tomorrow at 4 PM',
    related_table: 'education',
    related_id: 'annual-day-2025',
    trigger_time: '2025-01-15T10:00:00Z',
    sent_at: '2025-01-15T10:00:00Z',
    status: 'Sent',
    applicable_roles: ['mother', 'father'],
    created_at: '2025-01-14T00:00:00Z'
  },
  {
    id: '8',
    type: 'Alarm',
    recipient: 'family-group',
    message: 'Medicine reminder - Time for evening medications',
    related_table: 'health',
    related_id: 'medicine-schedule',
    trigger_time: '2025-01-15T20:00:00Z',
    status: 'Pending',
    applicable_roles: ['mother', 'father', 'grandmother'],
    created_at: '2025-01-15T00:00:00Z'
  }
];

// Voice commands for alerts module
export const alertsVoiceCommands = [
  'set reminder',
  'நினைவூட்டல் அமை',
  'send alert',
  'எச்சரிக்கை அனுப்பு',
  'schedule notification',
  'அறிவிப்பு திட்டமிடு',
  'remind me',
  'என்னை நினைவூட்டு',
  'alert family',
  'குடும்பத்திற்கு எச்சரிக்கை'
];

// Discussion forum for alerts module
export const alertsDiscussions = [
  {
    id: 'disc-1',
    title: 'Alert Preferences Discussion',
    author: 'கணவர்',
    content: 'How should we configure alerts for different family members?',
    timestamp: '2025-01-01T10:00:00Z',
    replies: [
      {
        id: 'reply-1',
        author: 'தாய்',
        content: 'I prefer WhatsApp messages for daily reminders.',
        timestamp: '2025-01-01T11:00:00Z'
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Emergency Alert System',
    author: 'நான்',
    content: 'We need a reliable emergency alert system for urgent situations.',
    timestamp: '2025-01-02T14:00:00Z',
    replies: []
  }
];

// Alerts store
export const alerts = writable<Alert[]>(sampleAlertsData);

// Alerts store actions
export const alertsActions = {
  add: (alert: Omit<Alert, 'id' | 'created_at'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    alerts.update(alertsList => [...alertsList, newAlert]);
    return newAlert;
  },

  update: (id: string, updates: Partial<Alert>) => {
    alerts.update(alertsList =>
      alertsList.map(alert =>
        alert.id === id ? { ...alert, ...updates } : alert
      )
    );
  },

  delete: (id: string) => {
    alerts.update(alertsList => alertsList.filter(alert => alert.id !== id));
  },

  getById: (id: string) => {
    let result: Alert | undefined;
    alerts.subscribe(alertsList => {
      result = alertsList.find(alert => alert.id === id);
    })();
    return result;
  },

  getByType: (type: string) => {
    let result: Alert[] = [];
    alerts.subscribe(alertsList => {
      result = alertsList.filter(alert => alert.type === type);
    })();
    return result;
  },

  getByStatus: (status: string) => {
    let result: Alert[] = [];
    alerts.subscribe(alertsList => {
      result = alertsList.filter(alert => alert.status === status);
    })();
    return result;
  },

  getPendingAlerts: () => {
    let result: Alert[] = [];
    alerts.subscribe(alertsList => {
      result = alertsList.filter(alert => alert.status === 'Pending');
    })();
    return result;
  },

  markAsSent: (id: string) => {
    alerts.update(alertsList =>
      alertsList.map(alert =>
        alert.id === id
          ? { ...alert, status: 'Sent', sent_at: new Date().toISOString() }
          : alert
      )
    );
  },

  search: (query: string) => {
    let result: Alert[] = [];
    alerts.subscribe(alertsList => {
      result = alertsList.filter(alert =>
        alert.message.toLowerCase().includes(query.toLowerCase()) ||
        alert.recipient.toLowerCase().includes(query.toLowerCase())
      );
    })();
    return result;
  }
};