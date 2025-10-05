import Dexie from 'dexie';

// Data Models for Home & Household Management
export const GroceryItem = {
  id: String,
  name: String,
  quantity: Number,
  category: String, // 'vegetables', 'spices', 'grains', 'dairy', 'fruits', 'oils'
  inStock: Boolean,
  lastUpdated: Date,
  marketMode: String // 'weekly', 'monthly', 'festival'
};

export const Chore = {
  id: String,
  title: String,
  assignedTo: String, // 'amma', 'appa', 'paati', 'thatta', 'children'
  frequency: String, // 'daily', 'weekly', 'monthly'
  completed: Boolean,
  streakCount: Number,
  lastCompleted: Date,
  dueDate: Date
};

export const RepairTask = {
  id: String,
  issue: String,
  location: String, // 'kitchen', 'bathroom', 'living-room', 'bedroom', 'exterior'
  assignedTo: String,
  status: String, // 'pending', 'in-progress', 'completed'
  priority: String, // 'low', 'medium', 'high', 'urgent'
  createdDate: Date,
  completedDate: Date,
  estimatedCost: Number,
  notes: String
};

export const EmergencyContact = {
  id: String,
  name: String,
  type: String, // 'medical', 'police', 'fire', 'family', 'neighbor', 'electrician', 'plumber'
  phone: String,
  alternatePhone: String,
  address: String,
  notes: String,
  isPrimary: Boolean
};

// Initialize Home Database
class HomeDatabase extends Dexie {
  constructor() {
    super('HomeDatabase');

    this.version(1).stores({
      groceryItems: 'id, name, category, inStock, marketMode',
      chores: 'id, title, assignedTo, frequency, completed, dueDate',
      repairTasks: 'id, issue, location, assignedTo, status, priority, createdDate',
      emergencyContacts: 'id, name, type, phone, isPrimary'
    });

    this.groceryItems = this.table('groceryItems');
    this.chores = this.table('chores');
    this.repairTasks = this.table('repairTasks');
    this.emergencyContacts = this.table('emergencyContacts');
  }
}

export const homeDB = new HomeDatabase();

// Initialize database with sample data
export async function initHomeDB() {
  try {
    // Check if data already exists
    const groceryCount = await homeDB.groceryItems.count();
    if (groceryCount > 0) return; // Already initialized

    // Sample grocery items
    const sampleGroceries = [
      { id: '1', name: 'Rice', quantity: 5, category: 'grains', inStock: true, lastUpdated: new Date(), marketMode: 'monthly' },
      { id: '2', name: 'Turmeric', quantity: 0.5, category: 'spices', inStock: true, lastUpdated: new Date(), marketMode: 'monthly' },
      { id: '3', name: 'Tomatoes', quantity: 2, category: 'vegetables', inStock: false, lastUpdated: new Date(), marketMode: 'weekly' },
      { id: '4', name: 'Coconut Oil', quantity: 1, category: 'oils', inStock: true, lastUpdated: new Date(), marketMode: 'monthly' },
      { id: '5', name: 'Banana', quantity: 6, category: 'fruits', inStock: true, lastUpdated: new Date(), marketMode: 'weekly' }
    ];

    // Sample chores
    const sampleChores = [
      { id: '1', title: 'Morning Pooja', assignedTo: 'amma', frequency: 'daily', completed: true, streakCount: 30, lastCompleted: new Date(), dueDate: new Date() },
      { id: '2', title: 'Kitchen Cleaning', assignedTo: 'paati', frequency: 'daily', completed: false, streakCount: 15, lastCompleted: new Date(Date.now() - 86400000), dueDate: new Date() },
      { id: '3', title: 'Garden Watering', assignedTo: 'appa', frequency: 'daily', completed: true, streakCount: 7, lastCompleted: new Date(), dueDate: new Date() },
      { id: '4', title: 'Temple Visit', assignedTo: 'family', frequency: 'weekly', completed: false, streakCount: 4, lastCompleted: new Date(Date.now() - 604800000), dueDate: new Date(Date.now() + 86400000) }
    ];

    // Sample repair tasks
    const sampleRepairs = [
      { id: '1', issue: 'Kitchen tap leaking', location: 'kitchen', assignedTo: 'appa', status: 'pending', priority: 'medium', createdDate: new Date(), estimatedCost: 500, notes: 'Need plumber' },
      { id: '2', issue: 'Bathroom light flickering', location: 'bathroom', assignedTo: 'electrician', status: 'in-progress', priority: 'high', createdDate: new Date(Date.now() - 86400000), estimatedCost: 200, notes: 'Contact local electrician' }
    ];

    // Sample emergency contacts
    const sampleContacts = [
      { id: '1', name: 'Dr. Rajesh Kumar', type: 'medical', phone: '+91-9876543210', alternatePhone: '+91-9876543211', address: 'Apollo Hospital, Coimbatore', notes: 'Family physician', isPrimary: true },
      { id: '2', name: 'Coimbatore Police', type: 'police', phone: '100', address: 'Police Station, Gandhipuram', notes: 'Emergency police contact', isPrimary: true },
      { id: '3', name: 'Fire Station', type: 'fire', phone: '101', address: 'Fire Station, RS Puram', notes: 'Fire emergency services', isPrimary: true },
      { id: '4', name: 'Ravi Plumber', type: 'plumber', phone: '+91-8765432109', address: 'Near Bus Stand, Coimbatore', notes: 'Reliable local plumber', isPrimary: false },
      { id: '5', name: 'Suresh Electrician', type: 'electrician', phone: '+91-7654321098', address: 'Peelamedu, Coimbatore', notes: 'Certified electrician', isPrimary: false }
    ];

    await homeDB.groceryItems.bulkAdd(sampleGroceries);
    await homeDB.chores.bulkAdd(sampleChores);
    await homeDB.repairTasks.bulkAdd(sampleRepairs);
    await homeDB.emergencyContacts.bulkAdd(sampleContacts);

    console.log('Home database initialized with sample data');
  } catch (error) {
    console.error('Error initializing home database:', error);
  }
}

// Grocery operations
export async function getGroceryItems() {
  return await homeDB.groceryItems.toArray();
}

export async function addGroceryItem(item) {
  return await homeDB.groceryItems.add(item);
}

export async function updateGroceryItem(id, updates) {
  return await homeDB.groceryItems.update(id, updates);
}

export async function deleteGroceryItem(id) {
  return await homeDB.groceryItems.delete(id);
}

// Chore operations
export async function getChores() {
  return await homeDB.chores.toArray();
}

export async function addChore(chore) {
  return await homeDB.chores.add(chore);
}

export async function updateChore(id, updates) {
  return await homeDB.chores.update(id, updates);
}

export async function deleteChore(id) {
  return await homeDB.chores.delete(id);
}

// Repair operations
export async function getRepairTasks() {
  return await homeDB.repairTasks.toArray();
}

export async function addRepairTask(task) {
  return await homeDB.repairTasks.add(task);
}

export async function updateRepairTask(id, updates) {
  return await homeDB.repairTasks.update(id, updates);
}

export async function deleteRepairTask(id) {
  return await homeDB.repairTasks.delete(id);
}

// Emergency contact operations
export async function getEmergencyContacts() {
  return await homeDB.emergencyContacts.toArray();
}

export async function addEmergencyContact(contact) {
  return await homeDB.emergencyContacts.add(contact);
}

export async function updateEmergencyContact(id, updates) {
  return await homeDB.emergencyContacts.update(id, updates);
}

export async function deleteEmergencyContact(id) {
  return await homeDB.emergencyContacts.delete(id);
}