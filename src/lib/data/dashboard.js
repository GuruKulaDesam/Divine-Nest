/**
 * Centralized dashboard data
 */
import { revenueChartData } from './charts.js';

// User data for avatars and profiles
export const users = {
  admin: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator'
  },
  recent: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      action: 'purchased',
      item: 'Premium Plan',
      time: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      action: 'subscribed to',
      item: 'Newsletter',
      time: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      action: 'downloaded',
      item: 'Product Catalog',
      time: '10 minutes ago'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      action: 'reviewed',
      item: 'Bug #456',
      time: '15 minutes ago'
    },
    {
      id: 5,
      name: 'Bob Martin',
      email: 'bob.martin@example.com',
      action: 'commented on',
      item: 'Task ABC',
      time: '20 minutes ago'
    },
    {
      id: 6,
      name: 'Carol Lee',
      email: 'carol.lee@example.com',
      action: 'approved',
      item: 'Merge Request',
      time: '30 minutes ago'
    },
    {
      id: 7,
      name: 'David Kim',
      email: 'david.kim@example.com',
      action: 'archived',
      item: 'Project XYZ',
      time: '45 minutes ago'
    }
  ]
};

// Dashboard statistics
export const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    changeType: 'positive',
    icon: 'heroicons:currency-dollar'
  },
  {
    name: 'Subscriptions',
    value: '+2350',
    change: '+180.1%',
    changeType: 'positive',
    icon: 'heroicons:users'
  },
  {
    name: 'Sales',
    value: '+12,234',
    change: '+19%',
    changeType: 'positive',
    icon: 'heroicons:shopping-cart'
  },
  {
    name: 'Active Now',
    value: '+573',
    change: '+201',
    changeType: 'positive',
    icon: 'heroicons:bolt'
  }
];

// Chart data for Revenue Overview (imported from charts.js)
export const chartData = revenueChartData;

// Navigation menu items
export const menuItems = [
  { name: 'Dashboard', icon: 'heroicons:home', path: '/' },
  { name: 'Users', icon: 'heroicons:users', path: '/users' },
  { name: 'Products', icon: 'heroicons:cube', path: '/products' },
  { name: 'Analytics', icon: 'heroicons:chart-bar', path: '/analytics' },
  { name: 'Settings', icon: 'heroicons:cog-6-tooth', path: '/settings' }
];

// Quick actions
export const quickActions = [
  {
    name: 'Add User',
    icon: 'heroicons:plus',
    action: 'primary'
  },
  {
    name: 'Add Product',
    icon: 'mdi:cube-outline',
    action: 'secondary'
  },
  {
    name: 'View Reports',
    icon: 'heroicons:chart-bar',
    action: 'secondary'
  },
  {
    name: 'Settings',
    icon: 'heroicons:cog',
    action: 'secondary'
  }
]; 