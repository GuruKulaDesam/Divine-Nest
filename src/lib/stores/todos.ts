import { writable } from 'svelte/store'
import type { Todo } from '$lib/models'

// Initialize with sample data for demonstration
const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Buy groceries for the week',
    category: 'grocery',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    voiceCreated: false
  },
  {
    id: '2',
    title: 'Pick up children from school',
    category: 'family',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed: true,
    voiceCreated: false
  },
  {
    id: '3',
    title: 'Complete homework with kids',
    category: 'school',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    voiceCreated: true
  },
  {
    id: '4',
    title: 'Call grandmother',
    category: 'family',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    voiceCreated: false
  },
  {
    id: '5',
    title: 'Clean the house',
    category: 'custom',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completed: true,
    voiceCreated: false
  }
]

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