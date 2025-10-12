import { sqliteService } from '$lib/services/sqliteService';

// Test data seeder for SQLite - populates reminder templates and other test data
export class SQLiteTestDataSeeder {
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await sqliteService.initialize();
      this.isInitialized = true;
      console.log('SQLite test data seeder initialized');
    } catch (error) {
      console.error('Failed to initialize SQLite test data seeder:', error);
      throw error;
    }
  }

  async populateAllTestData(): Promise<void> {
    await this.initialize();

    console.log('Starting to populate test data...');

    try {
      // Populate reminder templates
      await this.populateReminderTemplates();

      // Populate family members
      await this.populateFamilyMembers();

      // Populate grocery items
      await this.populateGroceryItems();

      // Populate chores
      await this.populateChores();

      console.log('✅ All test data populated successfully!');
    } catch (error) {
      console.error('Failed to populate test data:', error);
      throw error;
    }
  }

  private async populateReminderTemplates(): Promise<void> {
    console.log('Populating reminder templates...');

    const reminderTemplates = [
      // HIGH PRIORITY REMINDERS
      {
        title: 'Morning Medicine - Elder Care',
        description: 'Daily medicine reminder for elders (6 AM, 2 PM, 8 PM)',
        priority: 'high',
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
        due_time: '06:00',
      },
      {
        title: 'Pooja/Prayer Time',
        description: 'Daily prayer and pooja reminder (5-6 AM, 6 PM)',
        priority: 'high',
        due_date: new Date().toISOString().split('T')[0], // Today
        due_time: '05:30',
      },
      {
        title: 'School Preparation',
        description: 'Get ready for school - uniform, books, lunch (6:30-7:30 AM)',
        priority: 'high',
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '06:30',
      },
      {
        title: 'Helper Clock-In',
        description: 'Helper arrival and attendance tracking (8-9 AM)',
        priority: 'high',
        due_date: new Date().toISOString().split('T')[0],
        due_time: '08:00',
      },
      {
        title: 'Chore Start Time',
        description: 'Daily household chores assignment (7 AM, 5 PM)',
        priority: 'high',
        due_date: new Date().toISOString().split('T')[0],
        due_time: '07:00',
      },
      {
        title: 'Bill Payment Reminder',
        description: 'Monthly bill payments (1st-5th of month, 9-10 AM)',
        priority: 'high',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString().split('T')[0],
        due_time: '09:00',
      },

      // MEDIUM PRIORITY REMINDERS
      {
        title: 'Cooking Preparation',
        description: 'Meal preparation and cooking reminders (6 AM, 4 PM)',
        priority: 'medium',
        due_date: new Date().toISOString().split('T')[0],
        due_time: '16:00',
      },
      {
        title: 'Travel Preparation',
        description: 'Trip planning and preparation (4-6 AM on travel day)',
        priority: 'medium',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
        due_time: '04:00',
      },
      {
        title: 'Yoga/Walking Time',
        description: 'Daily wellness and exercise reminder (6 AM or 6 PM)',
        priority: 'medium',
        due_date: new Date().toISOString().split('T')[0],
        due_time: '18:00',
      },
      {
        title: 'Monthly Inventory Check',
        description: 'Check household supplies (gas, water, milk) - Monthly',
        priority: 'medium',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toISOString().split('T')[0],
        due_time: '09:00',
      },
      {
        title: 'Doctor Appointment',
        description: 'Medical checkup and appointment reminder (1 hour before)',
        priority: 'medium',
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '14:00',
      },

      // LOW PRIORITY REMINDERS
      {
        title: 'Birthday Celebration',
        description: 'Family member birthday reminder (8 AM on event day)',
        priority: 'low',
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next month
        due_time: '08:00',
      },
      {
        title: 'Subscription Renewal',
        description: 'Monthly subscription renewals (DTH, mobile, etc.)',
        priority: 'low',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10).toISOString().split('T')[0],
        due_time: '10:00',
      },
      {
        title: 'Festival Ritual Preparation',
        description: 'Festival-specific rituals and preparations',
        priority: 'low',
        due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '06:00',
      },
      {
        title: 'Tuition Class',
        description: 'After-school tuition and extra classes (4-6 PM)',
        priority: 'low',
        due_date: new Date().toISOString().split('T')[0],
        due_time: '16:00',
      },
      {
        title: 'Salary Disbursement',
        description: 'Monthly helper salary payment reminder (1st of month)',
        priority: 'low',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split('T')[0],
        due_time: '09:00',
      },

      // ADDITIONAL REMINDERS FROM REQUIREMENTS
      {
        title: 'Shraddham Ceremony',
        description: 'Ancestral remembrance and rituals',
        priority: 'medium',
        due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '05:00',
      },
      {
        title: 'Temple Visit Planning',
        description: 'Weekly temple visit and preparation',
        priority: 'medium',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '07:00',
      },
      {
        title: 'Health Check-up',
        description: 'Regular health monitoring and check-ups',
        priority: 'high',
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '10:00',
      },
      {
        title: 'Grocery Shopping',
        description: 'Weekly grocery shopping and household supplies',
        priority: 'medium',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        due_time: '08:00',
      },
      {
        title: 'School Fee Payment',
        description: 'Monthly school fee and education expenses',
        priority: 'high',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 3).toISOString().split('T')[0],
        due_time: '09:00',
      }
    ];

    for (const reminder of reminderTemplates) {
      try {
        await sqliteService.saveReminder(reminder);
        console.log(`✅ Created reminder: ${reminder.title}`);
      } catch (error) {
        console.error(`❌ Failed to create reminder: ${reminder.title}`, error);
      }
    }

    console.log(`✅ Populated ${reminderTemplates.length} reminder templates`);
  }

  private async populateFamilyMembers(): Promise<void> {
    console.log('Populating family members...');

    const familyMembers = [
      {
        name: 'Rajesh Kumar',
        relationship: 'Father',
        phone: '+91-9876543210',
        email: 'rajesh.kumar@email.com',
        address: '123 Temple Street, Chennai',
        emergency_contact: true,
      },
      {
        name: 'Priya Sharma',
        relationship: 'Mother',
        phone: '+91-9876543211',
        email: 'priya.sharma@email.com',
        address: '123 Temple Street, Chennai',
        emergency_contact: true,
      },
      {
        name: 'Arjun Kumar',
        relationship: 'Son',
        phone: '+91-9876543212',
        email: 'arjun.kumar@email.com',
        address: '123 Temple Street, Chennai',
        emergency_contact: false,
      },
      {
        name: 'Meera Kumar',
        relationship: 'Daughter',
        phone: '+91-9876543213',
        email: 'meera.kumar@email.com',
        address: '123 Temple Street, Chennai',
        emergency_contact: false,
      },
      {
        name: 'Suresh Kumar',
        relationship: 'Grandfather',
        phone: '+91-9876543214',
        email: 'suresh.kumar@email.com',
        address: '456 Elder Home, Chennai',
        emergency_contact: true,
      },
      {
        name: 'Lakshmi Devi',
        relationship: 'Grandmother',
        phone: '+91-9876543215',
        email: 'lakshmi.devi@email.com',
        address: '456 Elder Home, Chennai',
        emergency_contact: true,
      },
      {
        name: 'Ravi Kumar',
        relationship: 'Uncle',
        phone: '+91-9876543216',
        email: 'ravi.kumar@email.com',
        address: '789 Family Complex, Chennai',
        emergency_contact: false,
      },
      {
        name: 'Sita Lakshmi',
        relationship: 'Aunt',
        phone: '+91-9876543217',
        email: 'sita.lakshmi@email.com',
        address: '789 Family Complex, Chennai',
        emergency_contact: false,
      }
    ];

    for (const member of familyMembers) {
      try {
        await sqliteService.saveFamilyMember(member);
        console.log(`✅ Created family member: ${member.name} (${member.relationship})`);
      } catch (error) {
        console.error(`❌ Failed to create family member: ${member.name}`, error);
      }
    }

    console.log(`✅ Populated ${familyMembers.length} family members`);
  }

  private async populateGroceryItems(): Promise<void> {
    console.log('Populating grocery items...');

    const groceryItems = [
      // Daily essentials
      { name: 'Milk', category: 'Dairy', in_stock: true, market_mode: false },
      { name: 'Bread', category: 'Bakery', in_stock: true, market_mode: false },
      { name: 'Rice', category: 'Grains', in_stock: true, market_mode: false },
      { name: 'Wheat Flour', category: 'Grains', in_stock: true, market_mode: false },
      { name: 'Sugar', category: 'Pantry', in_stock: true, market_mode: false },
      { name: 'Tea', category: 'Beverages', in_stock: true, market_mode: false },
      { name: 'Coffee', category: 'Beverages', in_stock: true, market_mode: false },

      // Vegetables
      { name: 'Tomatoes', category: 'Vegetables', in_stock: false, market_mode: true },
      { name: 'Onions', category: 'Vegetables', in_stock: false, market_mode: true },
      { name: 'Potatoes', category: 'Vegetables', in_stock: false, market_mode: true },
      { name: 'Green Chillies', category: 'Vegetables', in_stock: false, market_mode: true },
      { name: 'Coriander', category: 'Vegetables', in_stock: false, market_mode: true },

      // Spices and condiments
      { name: 'Turmeric Powder', category: 'Spices', in_stock: false, market_mode: true },
      { name: 'Red Chilli Powder', category: 'Spices', in_stock: false, market_mode: true },
      { name: 'Coriander Powder', category: 'Spices', in_stock: false, market_mode: true },
      { name: 'Garam Masala', category: 'Spices', in_stock: false, market_mode: true },
      { name: 'Mustard Seeds', category: 'Spices', in_stock: false, market_mode: true },

      // Fruits
      { name: 'Bananas', category: 'Fruits', in_stock: false, market_mode: true },
      { name: 'Apples', category: 'Fruits', in_stock: false, market_mode: true },
      { name: 'Oranges', category: 'Fruits', in_stock: false, market_mode: true },

      // Household items
      { name: 'Dish Soap', category: 'Cleaning', in_stock: false, market_mode: true },
      { name: 'Laundry Detergent', category: 'Cleaning', in_stock: false, market_mode: true },
      { name: 'Toilet Paper', category: 'Household', in_stock: false, market_mode: true },
      { name: 'Trash Bags', category: 'Household', in_stock: false, market_mode: true }
    ];

    for (const item of groceryItems) {
      try {
        await sqliteService.saveGroceryItem(item);
        console.log(`✅ Created grocery item: ${item.name} (${item.category})`);
      } catch (error) {
        console.error(`❌ Failed to create grocery item: ${item.name}`, error);
      }
    }

    console.log(`✅ Populated ${groceryItems.length} grocery items`);
  }

  private async populateChores(): Promise<void> {
    console.log('Populating chores...');

    const chores = [
      {
        title: 'Morning Kitchen Cleaning',
        assigned_to: 'Helper',
        frequency: 'daily',
        due_date: new Date().toISOString().split('T')[0],
      },
      {
        title: 'Bathroom Cleaning',
        assigned_to: 'Helper',
        frequency: 'daily',
        due_date: new Date().toISOString().split('T')[0],
      },
      {
        title: 'Floor Mopping',
        assigned_to: 'Helper',
        frequency: 'daily',
        due_date: new Date().toISOString().split('T')[0],
      },
      {
        title: 'Dish Washing',
        assigned_to: 'Helper',
        frequency: 'daily',
        due_date: new Date().toISOString().split('T')[0],
      },
      {
        title: 'Laundry',
        assigned_to: 'Helper',
        frequency: 'weekly',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        title: 'Grocery Shopping',
        assigned_to: 'Mother',
        frequency: 'weekly',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        title: 'School Bag Packing',
        assigned_to: 'Mother',
        frequency: 'daily',
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        title: 'Homework Supervision',
        assigned_to: 'Mother',
        frequency: 'daily',
        due_date: new Date().toISOString().split('T')[0],
      },
      {
        title: 'Temple Visit Preparation',
        assigned_to: 'Father',
        frequency: 'weekly',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        title: 'Bill Payment',
        assigned_to: 'Father',
        frequency: 'monthly',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString().split('T')[0],
      },
      {
        title: 'Car Maintenance',
        assigned_to: 'Father',
        frequency: 'monthly',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toISOString().split('T')[0],
      },
      {
        title: 'Garden Watering',
        assigned_to: 'Helper',
        frequency: 'daily',
        due_date: new Date().toISOString().split('T')[0],
      }
    ];

    for (const chore of chores) {
      try {
        await sqliteService.saveChore(chore);
        console.log(`✅ Created chore: ${chore.title} (${chore.assigned_to})`);
      } catch (error) {
        console.error(`❌ Failed to create chore: ${chore.title}`, error);
      }
    }

    console.log(`✅ Populated ${chores.length} chores`);
  }

  // Utility method to clear all test data
  async clearAllTestData(): Promise<void> {
    await this.initialize();

    console.log('Clearing all test data...');

    try {
      // Clear all tables
      await sqliteService.executeStatement('DELETE FROM reminders');
      await sqliteService.executeStatement('DELETE FROM family_members');
      await sqliteService.executeStatement('DELETE FROM grocery_items');
      await sqliteService.executeStatement('DELETE FROM chores');
      await sqliteService.executeStatement('DELETE FROM user_roles');

      console.log('✅ All test data cleared');
    } catch (error) {
      console.error('Failed to clear test data:', error);
      throw error;
    }
  }

  // Get summary of all data
  async getDataSummary(): Promise<any> {
    await this.initialize();

    try {
      const reminders = await sqliteService.getReminders();
      const familyMembers = await sqliteService.getFamilyMembers();
      const groceryItems = await sqliteService.getGroceryItems();
      const chores = await sqliteService.getChores();
      const userRole = await sqliteService.getUserRole();

      return {
        reminders: reminders.length,
        familyMembers: familyMembers.length,
        groceryItems: groceryItems.length,
        chores: chores.length,
        userRole: userRole?.role || 'none',
        platform: typeof window !== 'undefined' && (window as any).Capacitor ? 'mobile' : 'web'
      };
    } catch (error) {
      console.error('Failed to get data summary:', error);
      return { error: error.message };
    }
  }
}

// Export singleton instance
export const sqliteTestSeeder = new SQLiteTestDataSeeder();