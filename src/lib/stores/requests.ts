import { writable } from 'svelte/store'
import type { Request } from '$lib/models'

// Initialize with sample data for demonstration
const initialRequests: Request[] = [
  {
    id: '1',
    category: 'Maintenance',
    sub_category: 'Electrical',
    description: 'Need to install additional electrical outlets in the study room for computers and charging stations.',
    location_address: 'Study Room',
    contact: 'Father',
    preferred_resolution_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: '',
    status: 'Reported',
    affected_audience: 'Children and Father',
    applicable_roles: ['Father', 'Mother', 'All'],
    created_by: 'Father',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    category: 'Suggestion',
    sub_category: 'Home Improvement',
    description: 'Would like to add a small herb garden in the backyard for fresh cooking ingredients.',
    location_address: 'Backyard',
    contact: 'Mother',
    preferred_resolution_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: 'Father',
    status: 'In Progress',
    affected_audience: 'Mother and Family',
    applicable_roles: ['Mother', 'Father', 'All'],
    created_by: 'Mother',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    category: 'Urgents',
    sub_category: 'Education',
    description: 'Children need additional books and study materials for the upcoming semester.',
    location_address: 'School',
    contact: 'Mother',
    preferred_resolution_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: '',
    status: 'Reported',
    affected_audience: 'Children',
    applicable_roles: ['Mother', 'Father', 'Children', 'All'],
    created_by: 'Mother',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    category: 'Repairs',
    sub_category: 'Plumbing',
    description: 'Bathroom shower head needs replacement - water pressure is too low.',
    location_address: 'Master Bathroom',
    contact: 'Father',
    preferred_resolution_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assigned_to: 'Father',
    status: 'Assigned',
    affected_audience: 'Father and Mother',
    applicable_roles: ['Father', 'Mother', 'All'],
    created_by: 'Father',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export const requests = writable<Request[]>(initialRequests)

export const requestActions = {
  add: (request: Omit<Request, 'id' | 'created_at' | 'updated_at'>) => {
    const newRequest: Request = {
      ...request,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    requests.update(current => [...current, newRequest])
    return newRequest
  },

  update: (id: string, updates: Partial<Request>) => {
    requests.update(current =>
      current.map(request =>
        request.id === id ? { ...request, ...updates, updated_at: new Date().toISOString() } : request
      )
    )
  },

  remove: (id: string) => {
    requests.update(current => current.filter(request => request.id !== id))
  },

  getById: (id: string) => {
    let result: Request | undefined
    requests.subscribe(current => {
      result = current.find(request => request.id === id)
    })()
    return result
  }
}