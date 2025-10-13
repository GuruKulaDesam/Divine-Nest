import { writable } from 'svelte/store'
import type { Todo } from '$lib/models'

// Initialize with empty array for SSR compatibility
const initialTodos: Todo[] = []

export const todos = writable<Todo[]>(initialTodos)

export const todoActions = {
  add: (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    todos.update(current => [...current, newTodo])
    return newTodo
  },

  toggle: (id: string) => {
    todos.update(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  },

  remove: (id: string) => {
    todos.update(current => current.filter(todo => todo.id !== id))
  },

  update: (id: string, updates: Partial<Todo>) => {
    todos.update(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    )
  }
}