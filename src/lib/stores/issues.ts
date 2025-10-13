import { writable } from 'svelte/store'
import type { Issue } from '$lib/models'

// Initialize with sample data for demonstration
const initialIssues: Issue[] = [
  {
    id: '1',
    type: 'Internal',
    category: 'Maintenance',
    sub_category: 'Plumbing',
    description: 'Kitchen sink is leaking water. Need plumber to fix.',
    location_address: 'Kitchen',
    contact: 'Mother',
    preferred_resolution_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: '',
    status: 'Reported',
    applicable_roles: ['Mother', 'Father', 'All'],
    alert_enabled: true,
    alert_time: '09:00',
    alert_message: 'Kitchen sink repair needed',
    alert_type: 'Alarm',
    priority: 'High',
    created_by: 'Mother',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    type: 'Internal',
    category: 'Other',
    sub_category: 'Shopping',
    description: 'Monthly grocery shopping needed. Rice, vegetables, milk, and cleaning supplies.',
    location_address: 'Local Market',
    contact: 'Mother',
    preferred_resolution_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: 'Mother',
    status: 'In Progress',
    applicable_roles: ['Mother', 'All'],
    alert_enabled: false,
    alert_message: 'Grocery shopping reminder',
    alert_type: 'None',
    priority: 'Medium',
    created_by: 'Mother',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    type: 'Internal',
    category: 'Other',
    sub_category: 'Finance',
    description: 'Pay school fees for both children before the due date.',
    location_address: 'School Office',
    contact: 'Father',
    preferred_resolution_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: '',
    status: 'Reported',
    applicable_roles: ['Father', 'Mother', 'All'],
    alert_enabled: true,
    alert_time: '10:00',
    alert_message: 'School fees payment due',
    alert_type: 'SMS',
    priority: 'High',
    created_by: 'Mother',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    type: 'Internal',
    category: 'Maintenance',
    sub_category: 'Gardening',
    description: 'Set up automatic watering system for garden plants.',
    location_address: 'Garden',
    contact: 'Father',
    preferred_resolution_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: 'Father',
    status: 'Resolved',
    applicable_roles: ['Father', 'Children', 'All'],
    alert_enabled: false,
    alert_message: 'Garden watering setup',
    alert_type: 'None',
    priority: 'Low',
    created_by: 'Father',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const issues = writable<Issue[]>(initialIssues)

export const issueActions = {
  add: (issue: Omit<Issue, 'id' | 'created_at' | 'updated_at'>) => {
    const newIssue: Issue = {
      ...issue,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    issues.update(current => [...current, newIssue])
    return newIssue
  },

  update: (id: string, updates: Partial<Issue>) => {
    issues.update(current =>
      current.map(issue =>
        issue.id === id ? { ...issue, ...updates, updated_at: new Date().toISOString() } : issue
      )
    )
  },

  remove: (id: string) => {
    issues.update(current => current.filter(issue => issue.id !== id))
  },

  getById: (id: string) => {
    let result: Issue | undefined
    issues.subscribe(current => {
      result = current.find(issue => issue.id === id)
    })()
    return result
  }
}