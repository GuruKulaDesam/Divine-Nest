import { writable } from 'svelte/store'
import type { Issue } from '$lib/models'

// Initialize with empty array for SSR compatibility
const initialIssues: Issue[] = []

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