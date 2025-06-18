/**
 * Users data for the Users page
 */

// User roles
export const userRoles = [
  { id: 'admin', name: 'Administrator', color: 'bg-red-100 text-red-800' },
  { id: 'manager', name: 'Manager', color: 'bg-blue-100 text-blue-800' },
  { id: 'editor', name: 'Editor', color: 'bg-green-100 text-green-800' },
  { id: 'viewer', name: 'Viewer', color: 'bg-gray-100 text-gray-800' }
];

// User statuses
export const userStatuses = [
  { id: 'active', name: 'Active', color: 'bg-green-100 text-green-800' },
  { id: 'inactive', name: 'Inactive', color: 'bg-gray-100 text-gray-800' },
  { id: 'suspended', name: 'Suspended', color: 'bg-red-100 text-red-800' },
  { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
];

// Sample users data
export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    department: 'Engineering',
    lastActive: '2024-01-15T10:30:00Z',
    joinDate: '2023-01-15',
    avatar: null // Will be generated using DiceBear
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager',
    status: 'active',
    department: 'Marketing',
    lastActive: '2024-01-15T09:15:00Z',
    joinDate: '2023-03-20',
    avatar: null
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'editor',
    status: 'active',
    department: 'Content',
    lastActive: '2024-01-14T16:45:00Z',
    joinDate: '2023-06-10',
    avatar: null
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'viewer',
    status: 'inactive',
    department: 'Sales',
    lastActive: '2024-01-10T14:20:00Z',
    joinDate: '2023-08-05',
    avatar: null
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'manager',
    status: 'active',
    department: 'Finance',
    lastActive: '2024-01-15T11:00:00Z',
    joinDate: '2023-02-28',
    avatar: null
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'editor',
    status: 'pending',
    department: 'Design',
    lastActive: null,
    joinDate: '2024-01-15',
    avatar: null
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'viewer',
    status: 'suspended',
    department: 'Support',
    lastActive: '2024-01-05T08:30:00Z',
    joinDate: '2023-09-15',
    avatar: null
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'editor',
    status: 'active',
    department: 'Product',
    lastActive: '2024-01-15T12:15:00Z',
    joinDate: '2023-04-12',
    avatar: null
  }
];

// Departments
export const departments = [
  'Engineering',
  'Marketing',
  'Content',
  'Sales',
  'Finance',
  'Design',
  'Support',
  'Product',
  'HR',
  'Operations'
];

// User table columns
export const userColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true },
  { key: 'joinDate', label: 'Join Date', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
];

// User statistics
export const userStats = [
  {
    name: 'Total Users',
    value: users.length.toString(),
    change: '+12%',
    changeType: 'positive',
    icon: 'heroicons:users'
  },
  {
    name: 'Active Users',
    value: users.filter(user => user.status === 'active').length.toString(),
    change: '+8%',
    changeType: 'positive',
    icon: 'heroicons:user-circle'
  },
  {
    name: 'New Users',
    value: users.filter(user => {
      const joinDate = new Date(user.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate > thirtyDaysAgo;
    }).length.toString(),
    change: '+15%',
    changeType: 'positive',
    icon: 'heroicons:user-plus'
  },
  {
    name: 'Inactive Users',
    value: users.filter(user => user.status === 'inactive').length.toString(),
    change: '-3%',
    changeType: 'negative',
    icon: 'heroicons:user-minus'
  }
]; 