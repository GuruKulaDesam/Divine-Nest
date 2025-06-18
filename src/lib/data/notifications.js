// Notification and Message Data

// Notifications data
export const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of $1,250 has been received from Customer XYZ',
    time: '2 minutes ago',
    read: false,
    icon: 'heroicons:check-circle',
    color: 'text-success'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Product "Premium Headphones" is running low on stock (5 items left)',
    time: '15 minutes ago',
    read: false,
    icon: 'heroicons:exclamation-triangle',
    color: 'text-warning'
  },
  {
    id: 3,
    type: 'info',
    title: 'New User Registration',
    message: 'New user "Sarah Johnson" has registered for an account',
    time: '1 hour ago',
    read: true,
    icon: 'heroicons:user-plus',
    color: 'text-info'
  },
  {
    id: 4,
    type: 'error',
    title: 'Server Maintenance',
    message: 'Scheduled server maintenance will begin in 30 minutes',
    time: '2 hours ago',
    read: true,
    icon: 'heroicons:server',
    color: 'text-error'
  },
  {
    id: 5,
    type: 'success',
    title: 'Order Completed',
    message: 'Order #12345 has been successfully delivered',
    time: '3 hours ago',
    read: true,
    icon: 'heroicons:truck',
    color: 'text-success'
  },
  {
    id: 6,
    type: 'info',
    title: 'System Update',
    message: 'System has been updated to version 2.1.0',
    time: '1 day ago',
    read: true,
    icon: 'heroicons:arrow-up-circle',
    color: 'text-info'
  }
];

// Messages data
export const messages = [
  {
    id: 1,
    sender: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      status: 'online'
    },
    subject: 'Product Inquiry',
    preview: 'Hi, I have a question about the premium headphones...',
    time: '5 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    sender: {
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      status: 'offline'
    },
    subject: 'Bulk Order Request',
    preview: 'We would like to place a bulk order for 100 units...',
    time: '1 hour ago',
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    sender: {
      name: 'Emily Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      status: 'online'
    },
    subject: 'Support Ticket #1234',
    preview: 'I\'m experiencing an issue with my recent order...',
    time: '2 hours ago',
    read: true,
    priority: 'high'
  },
  {
    id: 4,
    sender: {
      name: 'David Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      status: 'away'
    },
    subject: 'Partnership Proposal',
    preview: 'I would like to discuss a potential partnership...',
    time: '1 day ago',
    read: true,
    priority: 'low'
  },
  {
    id: 5,
    sender: {
      name: 'Lisa Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      status: 'online'
    },
    subject: 'Feedback on Service',
    preview: 'Thank you for the excellent customer service...',
    time: '2 days ago',
    read: true,
    priority: 'low'
  }
];

// Utility functions
export function getUnreadNotificationsCount() {
  return notifications.filter(notification => !notification.read).length;
}

export function getUnreadMessagesCount() {
  return messages.filter(message => !message.read).length;
}

export function markNotificationAsRead(id) {
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
}

export function markMessageAsRead(id) {
  const message = messages.find(m => m.id === id);
  if (message) {
    message.read = true;
  }
}

export function markAllNotificationsAsRead() {
  notifications.forEach(notification => {
    notification.read = true;
  });
}

export function markAllMessagesAsRead() {
  messages.forEach(message => {
    message.read = true;
  });
}

export function deleteNotification(id) {
  const index = notifications.findIndex(n => n.id === id);
  if (index > -1) {
    notifications.splice(index, 1);
  }
}

export function deleteMessage(id) {
  const index = messages.findIndex(m => m.id === id);
  if (index > -1) {
    messages.splice(index, 1);
  }
}

// Get notifications by type
export function getNotificationsByType(type) {
  return notifications.filter(notification => notification.type === type);
}

// Get messages by priority
export function getMessagesByPriority(priority) {
  return messages.filter(message => message.priority === priority);
}

// Get recent notifications (last 24 hours)
export function getRecentNotifications() {
  const now = new Date();
  return notifications.filter(notification => {
    // Simple time filtering - in a real app, you'd parse the time properly
    return notification.time.includes('minutes') || notification.time.includes('hour');
  });
} 