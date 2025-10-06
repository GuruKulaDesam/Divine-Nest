import Dexie from 'dexie';

// Central database for the South Indian Family Life App
class FamilyDatabase extends Dexie {
  constructor() {
    super('SouthIndianFamilyDB');
    
    this.version(1).stores({
      // Home & Household
      groceryItems: 'id, name, category, inStock, marketMode',
      pantryItems: '++id, name, category, quantity, unit, expiryDate, location, status, createdAt',
      shoppingList: '++id, name, category, quantity, unit, priority, completed, createdAt',
      chores: 'id, title, assignedTo, frequency, completed, dueDate',
      repairTasks: 'id, issue, location, assignedTo, status, priority, createdDate',
      emergencyContacts: 'id, name, type, phone, isPrimary',
      
      // Personal Contacts
      contacts: '++id, name, phone, email, address, category, relationship, avatar, notes, createdAt',
      
      // Education & Learning
      studyPlans: '++id, title, subject, studentName, dueDate, completed',
      books: '++id, title, author, category, shelf, progress, rating',
      exams: '++id, subject, studentName, date, score, totalMarks',
      readingSessions: '++id, bookId, studentName, date, pagesRead, duration',
      
      // Meals & Kitchen
      recipes: '++id, name, category, cuisine, difficulty, cookTime, rating',
      ingredients: '++id, name, category, unit, quantity, expiryDate',
      mealPlans: '++id, date, mealType, recipeId, familyMembers',
      voiceNotes: '++id, recipeId, audioUrl, transcript, dateRecorded',
      
      // Directory & Contacts
      familyContacts: '++id, name, relation, phone, email, address',
      extendedFamily: '++id, name, relation, phone, location, notes',
      vendors: '++id, name, service, phone, location, rating, notes',
      serviceProviders: '++id, name, category, phone, location, rating',
      doctors: '++id, name, specialty, phone, hospital, location',
      hospitals: '++id, name, phone, address, emergency, facilities',
      pharmacies: '++id, name, phone, address, hours, services',
      healthServices: '++id, name, type, phone, address, notes',
      communityCenters: '++id, name, type, address, phone, activities',
      educationalInstitutions: '++id, name, type, address, phone, grades',
      religiousCenters: '++id, name, religion, address, phone, services',
      emergencyServices: '++id, name, type, phone, address, availability',
      restaurants: '++id, name, cuisine, phone, address, rating, delivery',
      shops: '++id, name, category, phone, address, hours, speciality',
      transportation: '++id, type, name, phone, routes, schedule',
      
      // Life Flow & Memory
      emotions: '++id, date, emotion, intensity, trigger, familyMember',
      emotionalPatterns: '++id, pattern, frequency, trend, notes',
      familyStories: '++id, title, narrator, date, category, content, tags',
      wisdomLessons: '++id, lesson, source, category, applicableAge, notes',
      familyValues: '++id, value, description, examples, priority, traditions',
      lifeEvents: '++id, event, date, participants, significance, memories',
      transitions: '++id, type, date, fromState, toState, impact, support',
      familyDecisions: '++id, decision, date, participants, outcome, impact',
      familyRules: '++id, rule, category, applicableAge, consequences, flexibility',
      governanceMeetings: '++id, date, agenda, participants, decisions, followUp',
      
      // Requests & Services
      requests: '++id, title, type, priority, status, dateCreated, dateCompleted, location, estimatedCost, actualCost'
    });
  }
}

export const db = new FamilyDatabase();

// Initialize database with sample data
export async function initializeDatabase() {
  try {
    // Check if already initialized
    const groceryCount = await db.groceryItems.count();
    if (groceryCount > 0) return;

    // Initialize all tables with sample data
    await initHomeSampleData();
    await initEducationSampleData();
    await initMealsSampleData();
    await initDirectorySampleData();
    await initLifeFlowSampleData();
    await initRequestsSampleData();

    console.log('South Indian Family Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Sample data initialization functions
async function initHomeSampleData() {
  const sampleGroceries = [
    { id: '1', name: 'Rice', quantity: 5, category: 'grains', inStock: true, lastUpdated: new Date(), marketMode: 'monthly' },
    { id: '2', name: 'Turmeric', quantity: 0.5, category: 'spices', inStock: true, lastUpdated: new Date(), marketMode: 'monthly' },
    { id: '3', name: 'Tomatoes', quantity: 2, category: 'vegetables', inStock: false, lastUpdated: new Date(), marketMode: 'weekly' }
  ];

  const sampleChores = [
    { id: '1', title: 'Morning Pooja', assignedTo: 'amma', frequency: 'daily', completed: true, streakCount: 30, lastCompleted: new Date(), dueDate: new Date() },
    { id: '2', title: 'Kitchen Cleaning', assignedTo: 'paati', frequency: 'daily', completed: false, streakCount: 15, lastCompleted: new Date(Date.now() - 86400000), dueDate: new Date() }
  ];

  await db.groceryItems.bulkAdd(sampleGroceries);
  await db.chores.bulkAdd(sampleChores);
}

async function initEducationSampleData() {
  const sampleBooks = [
    { title: 'Thirukkural', author: 'Thiruvalluvar', category: 'Tamil Literature', shelf: 'Spiritual Wisdom', progress: 45, rating: 5 },
    { title: 'Ponniyin Selvan', author: 'Kalki Krishnamurthy', category: 'Historical Fiction', shelf: 'Tamil Classics', progress: 70, rating: 5 }
  ];

  await db.books.bulkAdd(sampleBooks);
}

async function initMealsSampleData() {
  const sampleRecipes = [
    { name: 'Sambar', category: 'Main Course', cuisine: 'South Indian', difficulty: 'Medium', cookTime: 45, rating: 5 },
    { name: 'Rasam', category: 'Soup', cuisine: 'South Indian', difficulty: 'Easy', cookTime: 20, rating: 4 }
  ];

  await db.recipes.bulkAdd(sampleRecipes);
}

async function initDirectorySampleData() {
  const sampleContacts = [
    { name: 'Dr. Rajesh Kumar', relation: 'Family Doctor', phone: '+91-9876543210', email: 'dr.rajesh@apollo.com', address: 'Apollo Hospital, Coimbatore' }
  ];

  await db.familyContacts.bulkAdd(sampleContacts);
}

async function initLifeFlowSampleData() {
  const sampleStories = [
    { title: 'Paati\'s Wedding Story', narrator: 'Paati', date: new Date(), category: 'Family History', content: 'The beautiful story of how Paati and Thatha met...', tags: ['wedding', 'tradition'] }
  ];

  await db.familyStories.bulkAdd(sampleStories);
}

async function initRequestsSampleData() {
  const sampleRequests = [
    { title: 'Fix Kitchen Tap', type: 'Plumbing', priority: 'Medium', status: 'Pending', dateCreated: new Date(), location: 'Kitchen', estimatedCost: 500 }
  ];

  await db.requests.bulkAdd(sampleRequests);
}

// Export individual database functions for backward compatibility
export const homeDB = db;
export const educationDB = db;
export const mealsDB = db;
export const directoryDB = db;
export const lifeFlowDB = db;
export const requestsDB = db;