import { writable } from 'svelte/store';
import type { Finance } from '$lib/models';

// Sample finance data
const sampleFinances: Finance[] = [
  {
    id: '1',
    type: 'Budget',
    category: 'Monthly Budget',
    sub_category: 'Household',
    amount: 50000,
    recurring: 'By Period (Fixed)',
    date: '2024-01-01',
    actor: 'Family Head',
    source: 'Manual',
    notes: 'Monthly household budget allocation',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    type: 'Income',
    category: 'Salary',
    sub_category: 'Primary',
    amount: 75000,
    recurring: 'By Period (Fixed)',
    date: '2024-01-15',
    actor: 'Father',
    source: 'Manual',
    notes: 'Monthly salary credit',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-01-15T09:00:00Z'
  },
  {
    id: '3',
    type: 'Expenses',
    category: 'Groceries',
    sub_category: 'Vegetables',
    amount: 2500,
    recurring: 'None',
    date: '2024-01-20',
    actor: 'Mother',
    source: 'Manual',
    notes: 'Weekly vegetable shopping',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '4',
    type: 'Expenses',
    category: 'Education',
    sub_category: 'School Fees',
    amount: 15000,
    recurring: 'By Period (Fixed)',
    date: '2024-01-25',
    actor: 'Father',
    source: 'Manual',
    notes: 'Monthly school fees for children',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-01-25T11:00:00Z'
  },
  {
    id: '5',
    type: 'Savings',
    category: 'Emergency Fund',
    sub_category: 'Medical',
    amount: 10000,
    recurring: 'By Period (Flexible)',
    date: '2024-01-28',
    actor: 'Family Head',
    source: 'Manual',
    notes: 'Monthly contribution to emergency fund',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-01-28T16:00:00Z'
  },
  {
    id: '6',
    type: 'Income',
    category: 'Business',
    sub_category: 'Freelance',
    amount: 25000,
    recurring: 'None',
    date: '2024-02-01',
    actor: 'Mother',
    source: 'Manual',
    notes: 'Freelance project payment',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-02-01T10:30:00Z'
  },
  {
    id: '7',
    type: 'Expenses',
    category: 'Utilities',
    sub_category: 'Electricity',
    amount: 3200,
    recurring: 'By Period (Fixed)',
    date: '2024-02-05',
    actor: 'Father',
    source: 'Manual',
    notes: 'Monthly electricity bill',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-02-05T12:00:00Z'
  },
  {
    id: '8',
    type: 'Expenses',
    category: 'Transportation',
    sub_category: 'Fuel',
    amount: 4500,
    recurring: 'None',
    date: '2024-02-10',
    actor: 'Father',
    source: 'Manual',
    notes: 'Monthly fuel expenses',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-02-10T08:45:00Z'
  },
  {
    id: '9',
    type: 'Budget',
    category: 'Monthly Budget',
    sub_category: 'Entertainment',
    amount: 8000,
    recurring: 'By Period (Fixed)',
    date: '2024-02-01',
    actor: 'Family Head',
    source: 'Manual',
    notes: 'Monthly entertainment budget',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-02-01T10:00:00Z'
  },
  {
    id: '10',
    type: 'Savings',
    category: 'Investment',
    sub_category: 'Mutual Funds',
    amount: 20000,
    recurring: 'By Period (Flexible)',
    date: '2024-02-15',
    actor: 'Father',
    source: 'Manual',
    notes: 'Monthly SIP investment',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-02-15T14:20:00Z'
  }
];

// Create the store
export const finances = writable<Finance[]>(sampleFinances);

// Store actions
export const financeActions = {
  // Get all finance records
  getAll: () => {
    return finances;
  },

  // Get finance record by ID
  getById: (id: string) => {
    let item: Finance | undefined;
    finances.subscribe(items => {
      item = items.find(i => i.id === id);
    })();
    return item;
  },

  // Add new finance record
  add: (item: Omit<Finance, 'id' | 'created_at'>) => {
    const newItem: Finance = {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };

    finances.update(items => [...items, newItem]);
    return newItem;
  },

  // Update finance record
  update: (id: string, updates: Partial<Finance>) => {
    finances.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, ...updates }
          : item
      )
    );
  },

  // Delete finance record
  delete: (id: string) => {
    finances.update(items => items.filter(item => item.id !== id));
  },

  // Get records by type
  getByType: (type: Finance['type']) => {
    let typeItems: Finance[] = [];
    finances.subscribe(items => {
      typeItems = items.filter(item => item.type === type);
    })();
    return typeItems;
  },

  // Get records by category
  getByCategory: (category: string) => {
    let categoryItems: Finance[] = [];
    finances.subscribe(items => {
      categoryItems = items.filter(item => item.category === category);
    })();
    return categoryItems;
  },

  // Get records by actor
  getByActor: (actor: string) => {
    let actorItems: Finance[] = [];
    finances.subscribe(items => {
      actorItems = items.filter(item => item.actor === actor);
    })();
    return actorItems;
  },

  // Get records by date range
  getByDateRange: (startDate: string, endDate: string) => {
    let dateRangeItems: Finance[] = [];
    finances.subscribe(items => {
      dateRangeItems = items.filter(item =>
        item.date >= startDate && item.date <= endDate
      );
    })();
    return dateRangeItems;
  },

  // Get monthly summary
  getMonthlySummary: (year: number, month: number) => {
    let summary = {
      totalIncome: 0,
      totalExpenses: 0,
      totalSavings: 0,
      totalBudget: 0,
      netIncome: 0
    };

    finances.subscribe(items => {
      const monthItems = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === year && itemDate.getMonth() === month;
      });

      summary = monthItems.reduce((acc, item) => {
        switch (item.type) {
          case 'Income':
            acc.totalIncome += item.amount;
            break;
          case 'Expenses':
            acc.totalExpenses += item.amount;
            break;
          case 'Savings':
            acc.totalSavings += item.amount;
            break;
          case 'Budget':
            acc.totalBudget += item.amount;
            break;
        }
        acc.netIncome = acc.totalIncome - acc.totalExpenses - acc.totalSavings;
        return acc;
      }, summary);
    })();

    return summary;
  },

  // Get budget vs actual comparison
  getBudgetVsActual: (year: number, month: number) => {
    let comparison = {
      budgets: [] as { category: string; budgeted: number; actual: number; variance: number }[]
    };

    finances.subscribe(items => {
      const monthItems = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === year && itemDate.getMonth() === month;
      });

      // Get budget items
      const budgets = monthItems.filter(item => item.type === 'Budget');
      const expenses = monthItems.filter(item => item.type === 'Expenses');

      comparison.budgets = budgets.map(budget => {
        const actualExpense = expenses
          .filter(exp => exp.category === budget.category)
          .reduce((sum, exp) => sum + exp.amount, 0);

        return {
          category: budget.category,
          budgeted: budget.amount,
          actual: actualExpense,
          variance: budget.amount - actualExpense
        };
      });
    })();

    return comparison;
  }
};