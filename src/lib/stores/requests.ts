import { writable } from 'svelte/store'
import type { Request } from '$lib/models'

// Initialize with empty array for SSR compatibility
const initialRequests: Request[] = []

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