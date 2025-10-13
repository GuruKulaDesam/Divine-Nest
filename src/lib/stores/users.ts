import { writable } from 'svelte/store';
import type { User } from '$lib/models';

const initialUsers: User[] = [
  {
    id: '1',
    role: 'Father',
    name: 'Rajesh Kumar',
    nick_name: 'Appa',
    email: 'rajesh.kumar@email.com',
    location: 'Chennai',
    joined_date: '2024-01-01',
    picture_url: '/family/father.jpg',
    auth_provider: 'Google',
    applicable_roles: ['Father'],
    created_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    role: 'Mother',
    name: 'Priya Kumar',
    nick_name: 'Amma',
    email: 'priya.kumar@email.com',
    location: 'Chennai',
    joined_date: '2024-01-01',
    picture_url: '/family/mother.jpg',
    auth_provider: 'Google',
    applicable_roles: ['Mother'],
    created_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    role: 'Child',
    name: 'Arjun Kumar',
    nick_name: 'Arjun',
    email: 'arjun.kumar@email.com',
    location: 'Chennai',
    joined_date: '2024-01-02',
    picture_url: '/family/child1.jpg',
    auth_provider: 'Manual',
    applicable_roles: ['Child'],
    created_at: '2024-01-02T14:00:00Z'
  },
  {
    id: '4',
    role: 'Child',
    name: 'Ananya Kumar',
    nick_name: 'Anu',
    email: 'ananya.kumar@email.com',
    location: 'Chennai',
    joined_date: '2024-01-03',
    picture_url: '/family/child2.jpg',
    auth_provider: 'Manual',
    applicable_roles: ['Child'],
    created_at: '2024-01-03T16:00:00Z'
  },
  {
    id: '5',
    role: 'Grandparent',
    name: 'Suresh Kumar',
    nick_name: 'Thatha',
    email: 'suresh.kumar@email.com',
    location: 'Coimbatore',
    joined_date: '2024-01-05',
    picture_url: '/family/grandfather.jpg',
    auth_provider: 'Facebook',
    applicable_roles: ['Grandparent'],
    created_at: '2024-01-05T11:00:00Z'
  },
  {
    id: '6',
    role: 'Grandparent',
    name: 'Lakshmi Kumar',
    nick_name: 'Paati',
    email: 'lakshmi.kumar@email.com',
    location: 'Coimbatore',
    joined_date: '2024-01-05',
    picture_url: '/family/grandmother.jpg',
    auth_provider: 'Facebook',
    applicable_roles: ['Grandparent'],
    created_at: '2024-01-05T11:30:00Z'
  },
  {
    id: '7',
    role: 'Service Provider',
    name: 'Ravi Electrician',
    nick_name: 'Ravi',
    email: 'ravi.electrician@email.com',
    location: 'Chennai',
    joined_date: '2024-01-10',
    picture_url: '/family/service1.jpg',
    auth_provider: 'Manual',
    applicable_roles: ['Service Provider'],
    created_at: '2024-01-10T09:00:00Z'
  },
  {
    id: '8',
    role: 'Service Provider',
    name: 'Meera Cook',
    nick_name: 'Meera',
    email: 'meera.cook@email.com',
    location: 'Chennai',
    joined_date: '2024-01-12',
    picture_url: '/family/service2.jpg',
    auth_provider: 'Manual',
    applicable_roles: ['Service Provider'],
    created_at: '2024-01-12T10:00:00Z'
  },
  {
    id: '9',
    role: 'Guest',
    name: 'Vijay Visitor',
    nick_name: 'Vijay',
    email: 'vijay.visitor@email.com',
    location: 'Bangalore',
    joined_date: '2024-01-15',
    picture_url: '/family/guest1.jpg',
    auth_provider: 'Manual',
    applicable_roles: ['Guest'],
    created_at: '2024-01-15T13:00:00Z'
  },
  {
    id: '10',
    role: 'Admin',
    name: 'System Admin',
    nick_name: 'Admin',
    email: 'admin@homemanagement.com',
    location: 'Chennai',
    joined_date: '2024-01-01',
    picture_url: '/family/admin.jpg',
    auth_provider: 'Manual',
    applicable_roles: ['Admin'],
    created_at: '2024-01-01T00:00:00Z'
  }
];

function createUsersStore() {
  const { subscribe, set, update } = writable<User[]>(initialUsers);

  return {
    subscribe,
    set,
    update,

    // CRUD operations
    addUser: (user: Omit<User, 'id' | 'created_at'>) => {
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };

      update(users => [...users, newUser]);
      return newUser;
    },

    updateUser: (id: string, updates: Partial<User>) => {
      update(users =>
        users.map(user =>
          user.id === id ? { ...user, ...updates } : user
        )
      );
    },

    deleteUser: (id: string) => {
      update(users => users.filter(user => user.id !== id));
    },

    getUser: (id: string): User | undefined => {
      let result: User | undefined;
      update(users => {
        result = users.find(user => user.id === id);
        return users;
      });
      return result;
    },

    getUsersByRole: (role: User['role']): User[] => {
      let result: User[] = [];
      update(users => {
        result = users.filter(user => user.role === role);
        return users;
      });
      return result;
    },

    getUsersByAuthProvider: (provider: User['auth_provider']): User[] => {
      let result: User[] = [];
      update(users => {
        result = users.filter(user => user.auth_provider === provider);
        return users;
      });
      return result;
    },

    getUsersByLocation: (location: string): User[] => {
      let result: User[] = [];
      update(users => {
        result = users.filter(user =>
          user.location?.toLowerCase().includes(location.toLowerCase())
        );
        return users;
      });
      return result;
    },

    // Get family members (core family roles)
    getFamilyMembers: (): User[] => {
      let result: User[] = [];
      update(users => {
        result = users.filter(user =>
          ['Father', 'Mother', 'Child', 'Grandparent'].includes(user.role)
        );
        return users;
      });
      return result;
    },

    // Get service providers
    getServiceProviders: (): User[] => {
      let result: User[] = [];
      update(users => {
        result = users.filter(user => user.role === 'Service Provider');
        return users;
      });
      return result;
    },

    // Get active users (joined within last 30 days)
    getActiveUsers: (days: number = 30): User[] => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      let result: User[] = [];
      update(users => {
        result = users.filter(user =>
          new Date(user.joined_date) >= cutoffDate
        );
        return users;
      });
      return result;
    },

    // Search users by name or email
    searchUsers: (query: string): User[] => {
      const lowerQuery = query.toLowerCase();
      let result: User[] = [];
      update(users => {
        result = users.filter(user =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.nick_name?.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery) ||
          user.location?.toLowerCase().includes(lowerQuery)
        );
        return users;
      });
      return result;
    },

    // Get user statistics
    getUserStats: () => {
      let stats = {
        total: 0,
        byRole: {} as Record<string, number>,
        byAuthProvider: {} as Record<string, number>,
        recentJoins: 0
      };

      update(users => {
        stats.total = users.length;

        // Count by role
        stats.byRole = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Count by auth provider
        stats.byAuthProvider = users.reduce((acc, user) => {
          acc[user.auth_provider] = (acc[user.auth_provider] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Count recent joins (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        stats.recentJoins = users.filter(user =>
          new Date(user.joined_date) >= weekAgo
        ).length;

        return users;
      });

      return stats;
    },

    // Reset to initial data
    reset: () => set(initialUsers)
  };
}

export const users = createUsersStore();