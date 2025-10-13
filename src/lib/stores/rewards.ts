import { writable } from 'svelte/store';
import type { Reward } from '$lib/models';

// Sample reward data
const sampleRewards: Reward[] = [
  {
    id: '1',
    person: 'Arjun',
    role: 'Child',
    type: 'Star',
    reason: 'Helped mother with kitchen chores',
    points: 10,
    date: '2024-01-15',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    person: 'Priya',
    role: 'Child',
    type: 'Karma',
    reason: 'Completed homework without reminders',
    points: 15,
    date: '2024-01-16',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    person: 'Father',
    role: 'Adult',
    type: 'Star',
    reason: 'Fixed the leaking tap',
    points: 20,
    date: '2024-01-18',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-01-18T16:45:00Z'
  },
  {
    id: '4',
    person: 'Mother',
    role: 'Adult',
    type: 'Karma',
    reason: 'Prepared traditional meal for family gathering',
    points: 25,
    date: '2024-01-20',
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2024-01-20T12:00:00Z'
  },
  {
    id: '5',
    person: 'Karthik',
    role: 'Child',
    type: 'Star',
    reason: 'Won first prize in school science fair',
    points: 30,
    date: '2024-01-22',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-01-22T09:15:00Z'
  },
  {
    id: '6',
    person: 'Ananya',
    role: 'Child',
    type: 'Karma',
    reason: 'Helped grandmother with temple visit',
    points: 18,
    date: '2024-01-25',
    applicable_roles: ['Parent', 'Adult', 'Child', 'Elder'],
    created_at: '2024-01-25T11:30:00Z'
  },
  {
    id: '7',
    person: 'Grandfather',
    role: 'Adult',
    type: 'Star',
    reason: 'Shared wisdom stories with grandchildren',
    points: 22,
    date: '2024-01-28',
    applicable_roles: ['Parent', 'Adult', 'Child', 'Elder'],
    created_at: '2024-01-28T15:20:00Z'
  },
  {
    id: '8',
    person: 'Ravi',
    role: 'Child',
    type: 'Star',
    reason: 'Practiced yoga daily for a week',
    points: 12,
    date: '2024-02-01',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-02-01T07:00:00Z'
  },
  {
    id: '9',
    person: 'Mother',
    role: 'Adult',
    type: 'Karma',
    reason: 'Organized family puja ceremony',
    points: 35,
    date: '2024-02-05',
    applicable_roles: ['Parent', 'Adult', 'Elder'],
    created_at: '2024-02-05T18:00:00Z'
  },
  {
    id: '10',
    person: 'Father',
    role: 'Adult',
    type: 'Star',
    reason: 'Taught children about family history',
    points: 28,
    date: '2024-02-08',
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2024-02-08T20:30:00Z'
  }
];

// Create the store
export const rewards = writable<Reward[]>(sampleRewards);

// Store actions
export const rewardActions = {
  // Get all rewards
  getAll: () => {
    return rewards;
  },

  // Get reward by ID
  getById: (id: string) => {
    let item: Reward | undefined;
    rewards.subscribe(items => {
      item = items.find(i => i.id === id);
    })();
    return item;
  },

  // Add new reward
  add: (item: Omit<Reward, 'id' | 'created_at'>) => {
    const newItem: Reward = {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };

    rewards.update(items => [...items, newItem]);
    return newItem;
  },

  // Update reward
  update: (id: string, updates: Partial<Reward>) => {
    rewards.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, ...updates }
          : item
      )
    );
  },

  // Delete reward
  delete: (id: string) => {
    rewards.update(items => items.filter(item => item.id !== id));
  },

  // Get rewards by person
  getByPerson: (person: string) => {
    let personItems: Reward[] = [];
    rewards.subscribe(items => {
      personItems = items.filter(item => item.person === person);
    })();
    return personItems;
  },

  // Get rewards by type
  getByType: (type: Reward['type']) => {
    let typeItems: Reward[] = [];
    rewards.subscribe(items => {
      typeItems = items.filter(item => item.type === type);
    })();
    return typeItems;
  },

  // Get rewards by role
  getByRole: (role: Reward['role']) => {
    let roleItems: Reward[] = [];
    rewards.subscribe(items => {
      roleItems = items.filter(item => item.role === role);
    })();
    return roleItems;
  },

  // Get rewards by date range
  getByDateRange: (startDate: string, endDate: string) => {
    let dateRangeItems: Reward[] = [];
    rewards.subscribe(items => {
      dateRangeItems = items.filter(item =>
        item.date >= startDate && item.date <= endDate
      );
    })();
    return dateRangeItems;
  },

  // Get leaderboard (top performers by points)
  getLeaderboard: (limit: number = 10) => {
    let leaderboard: { person: string; totalPoints: number; starCount: number; karmaCount: number }[] = [];

    rewards.subscribe(items => {
      const personStats = new Map<string, { totalPoints: number; starCount: number; karmaCount: number }>();

      items.forEach(item => {
        const stats = personStats.get(item.person) || { totalPoints: 0, starCount: 0, karmaCount: 0 };
        stats.totalPoints += item.points;
        if (item.type === 'Star') {
          stats.starCount += 1;
        } else {
          stats.karmaCount += 1;
        }
        personStats.set(item.person, stats);
      });

      leaderboard = Array.from(personStats.entries())
        .map(([person, stats]) => ({ person, ...stats }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, limit);
    })();

    return leaderboard;
  },

  // Get monthly summary
  getMonthlySummary: (year: number, month: number) => {
    let summary = {
      totalPoints: 0,
      starCount: 0,
      karmaCount: 0,
      uniquePeople: new Set<string>()
    };

    rewards.subscribe(items => {
      const monthItems = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === year && itemDate.getMonth() === month;
      });

      summary = monthItems.reduce((acc, item) => {
        acc.totalPoints += item.points;
        if (item.type === 'Star') {
          acc.starCount += 1;
        } else {
          acc.karmaCount += 1;
        }
        acc.uniquePeople.add(item.person);
        return acc;
      }, summary);
    })();

    return {
      ...summary,
      uniquePeopleCount: summary.uniquePeople.size
    };
  },

  // Get virtue wall (recent rewards)
  getVirtueWall: (limit: number = 20) => {
    let virtueWall: Reward[] = [];
    rewards.subscribe(items => {
      virtueWall = [...items]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    })();
    return virtueWall;
  }
};