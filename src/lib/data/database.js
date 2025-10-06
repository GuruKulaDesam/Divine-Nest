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
      
      // Wellness & Health
      moodEntries: '++id, date, mood, intensity, notes, familyMember',
      workouts: '++id, date, type, duration, familyMember, notes',
      
      // Vehicles & Maintenance
      vehicles: '++id, make, model, year, registrationNumber, maintenanceSchedule',
      
      // Learning & Skills
      learningGoals: '++id, title, subject, targetDate, progress, familyMember',
      skills: '++id, name, category, level, familyMember',
      
      // Legacy & Memories
      legacyItems: '++id, title, category, description, location, condition',
      
      // Leisure & Activities
      leisureActivities: '++id, title, category, date, participants, notes',
      communityEvents: '++id, title, date, location, participants, type',
      
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
      
      // Travel & Trips
      trips: '++id, destination, startDate, endDate, type, budget, participants, notes',
      pilgrimages: '++id, temple, location, date, participants, significance, notes',
      
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

    // Declare table properties for TypeScript support
    this.groceryItems = this.table('groceryItems');
    this.chores = this.table('chores');
    this.books = this.table('books');
    this.recipes = this.table('recipes');
    this.familyContacts = this.table('familyContacts');
    this.familyStories = this.table('familyStories');
    this.requests = this.table('requests');
    this.moodEntries = this.table('moodEntries');
  }
}

export const db = new FamilyDatabase();

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
    // Medical Services - Kovaipudur/Coimbatore
    { name: 'Dr. Rajesh Kumar', relation: 'Family Doctor', phone: '+91-9876543210', email: 'dr.rajesh@apollo.com', address: 'Apollo Hospital, Coimbatore' },
    { name: 'Dr. Meena Dental Clinic', relation: 'Dentist', phone: '+91-422-2468137', email: 'meena.dental@gmail.com', address: 'Kovaipudur Main Road, Coimbatore' },
    { name: 'City Pharmacy', relation: 'Pharmacy', phone: '+91-422-2468138', email: 'city.pharma@gmail.com', address: 'Near Kovaipudur Bus Stand' },
    { name: 'MedPlus Pharmacy', relation: 'Pharmacy', phone: '+91-422-2468139', email: 'medplus.kovaipudur@gmail.com', address: 'Kovaipudur Junction' },

    // Service Providers - Kovaipudur
    { name: 'Suresh Electricals', relation: 'Electrician', phone: '+91-422-2468140', email: 'suresh.electricals@gmail.com', address: 'Kovaipudur Main Road' },
    { name: 'Ravi Plumbing Services', relation: 'Plumber', phone: '+91-422-2468141', email: 'ravi.plumbing@gmail.com', address: 'Peelamedu Extension' },
    { name: 'Kumar AC Service', relation: 'AC Technician', phone: '+91-422-2468142', email: 'kumar.ac@gmail.com', address: 'Kovaipudur' },
    { name: 'Vijay Electronics', relation: 'Electronics Repair', phone: '+91-422-2468143', email: 'vijay.electronics@gmail.com', address: 'Kovaipudur Market' },

    // Home Services
    { name: 'Lakshmi House Cleaning', relation: 'House Cleaning', phone: '+91-422-2468144', email: 'lakshmi.cleaning@gmail.com', address: 'Kovaipudur Area' },
    { name: 'Ram Garden Services', relation: 'Gardener', phone: '+91-422-2468145', email: 'ram.garden@gmail.com', address: 'Coimbatore Rural' },
    { name: 'Priya Tuition Center', relation: 'Tuition Teacher', phone: '+91-422-2468146', email: 'priya.tuition@gmail.com', address: 'Kovaipudur' },

    // Local Stores & Services
    { name: 'Anand Grocery Store', relation: 'Grocery Store', phone: '+91-422-2468147', email: 'anand.grocery@gmail.com', address: 'Kovaipudur Main Road' },
    { name: 'Sri Krishna Bakery', relation: 'Bakery', phone: '+91-422-2468148', email: 'sri.krishna.bakery@gmail.com', address: 'Near Kovaipudur Temple' },
    { name: 'Coimbatore Tailors', relation: 'Tailor', phone: '+91-422-2468149', email: 'coimbatore.tailors@gmail.com', address: 'Kovaipudur Market' },
    { name: 'Venkat Book Store', relation: 'Book Store', phone: '+91-422-2468150', email: 'venkat.books@gmail.com', address: 'Kovaipudur' },

    // Transportation
    { name: 'Kovaipudur Auto Stand', relation: 'Auto Rickshaw', phone: '+91-422-2468151', email: '', address: 'Kovaipudur Bus Stand' },
    { name: 'City Taxi Service', relation: 'Taxi Service', phone: '+91-422-2468152', email: 'city.taxi@gmail.com', address: 'Coimbatore' },
    { name: 'Bike Rental Kovaipudur', relation: 'Bike Rental', phone: '+91-422-2468153', email: 'bike.rental.kovaipudur@gmail.com', address: 'Kovaipudur' },

    // Emergency Contacts
    { name: 'Kovaipudur Police Station', relation: 'Police Station', phone: '100', email: 'kovai.police@tn.gov.in', address: 'Kovaipudur Police Station' },
    { name: 'Kovaipudur Fire Station', relation: 'Fire Station', phone: '101', email: 'fire.kovaipudur@tn.gov.in', address: 'Kovaipudur' },

    // Educational Services
    { name: 'Little Angels School', relation: 'School', phone: '+91-422-2468154', email: 'info@littleangels.edu.in', address: 'Kovaipudur' },
    { name: 'Sri Ram College', relation: 'College', phone: '+91-422-2468155', email: 'info@sriramedu.edu.in', address: 'Kovaipudur' },
    { name: 'Kovaipudur Library', relation: 'Library', phone: '+91-422-2468156', email: 'library.kovaipudur@gmail.com', address: 'Kovaipudur' },

    // Religious & Community
    { name: 'Kovaipudur Temple', relation: 'Temple', phone: '+91-422-2468157', email: 'kovai.temple@gmail.com', address: 'Kovaipudur Main Temple' },
    { name: 'St. Mary\'s Church', relation: 'Church', phone: '+91-422-2468158', email: 'stmarys.kovaipudur@gmail.com', address: 'Kovaipudur' },
    { name: 'Masjid-e-Khair', relation: 'Mosque', phone: '+91-422-2468159', email: 'masjid.kovaipudur@gmail.com', address: 'Kovaipudur' },

    // Entertainment & Leisure
    { name: 'Kovaipudur Cinema', relation: 'Movie Theater', phone: '+91-422-2468160', email: 'kovai.cinema@gmail.com', address: 'Kovaipudur' },
    { name: 'Fitness First Gym', relation: 'Gym', phone: '+91-422-2468161', email: 'fitness.kovaipudur@gmail.com', address: 'Kovaipudur' },
    { name: 'Coimbatore Sports Club', relation: 'Sports Club', phone: '+91-422-2468162', email: 'sports.coimbatore@gmail.com', address: 'Coimbatore' }
  ];

  await db.familyContacts.bulkAdd(sampleContacts);

  // Also populate main contacts table with local service providers
  const localServiceContacts = [
    // Plumbing Services
    { name: 'Vishnu Multi Service', phone: '09606268232', email: '', address: 'Mgr Sadukam, Kovaipudur', category: 'professional', relationship: 'Plumber', notes: 'General plumbing, urgent repairs, motor pump, wiring. 24 Hours Open' },
    { name: 'JP Plumbing Works', phone: '07383461896', email: '', address: 'Neelikonampalayam Road', category: 'professional', relationship: 'Plumber', notes: 'Residential plumbing, drain cleaning, tap/shower install. 24 Hours Open' },
    { name: 'City Electrical & Plumbing Works', phone: '07411573722', email: '', address: 'Nehru Nagar West, Kalapatti', category: 'professional', relationship: 'Plumber & Electrician', notes: 'Electric, plumbing, bathroom/kitchen. 24 Hours Open' },
    { name: 'Self Electrical Service', phone: '', email: '', address: 'Sugunapuram Milekal, Kovaipudur', category: 'professional', relationship: 'Plumber & Electrician', notes: 'Plumbing, repairs, emergency service. 24 Hours Open' },
    { name: 'Friends Plumbing & Electrical Contractors', phone: '+91-9442034200', email: '', address: 'MGR Nagar, Kovaipudur', category: 'professional', relationship: 'Plumber & Electrician', notes: 'Plumbing & basic electrical repairs. 24 Hours Open' },
    { name: 'Smart City Care Plumbing', phone: '88826 21058', email: 'info@smartcitycare.in', address: 'Kovaipudur', category: 'professional', relationship: 'Plumber', notes: 'Leaks, emergencies, water heater, installations. 24 Hours, On Call' },
    { name: 'Joboy Plumbers', phone: '', email: '', address: 'Kovaipudur (Service Area)', category: 'professional', relationship: 'Plumber', notes: 'On-demand plumbing, warranty support' },
    { name: 'Shree Vm Enterprises', phone: '08147849837', email: '', address: 'Elgi Industrial Complex, Singanallur', category: 'professional', relationship: 'Plumber & Electrician', notes: 'Wiring, fan, motor, plumbing. 24 Hours Open' },

    // Electrical Services
    { name: 'Selvakumar Electrician', phone: '08488005790', email: '', address: 'Gk Squar, Sundarapuram (Near Kovaipudur)', category: 'professional', relationship: 'Electrician', notes: 'Home wiring, fuse, motor, lighting. 24 Hours/Responds in 2h' },
    { name: 'A K Electrical & Plumbing Works', phone: '08460213588', email: '', address: 'Block No 41, Vellalore', category: 'professional', relationship: 'Electrician', notes: 'General electrical & plumbing. 24 Hours Open' },
    { name: 'R.B Electricals', phone: '08123477031', email: '', address: 'Vinayagar Kovil St, Kunniyamuthur', category: 'professional', relationship: 'Electrician', notes: 'Light, MCB, fuse, motor repairs. 24 Hours Open' },
    { name: 'SVS Electricals & Plumbing', phone: '', email: '', address: 'Kamarajar Road, Kovaipudur', category: 'professional', relationship: 'Electrician', notes: 'House wiring, inverter, switches. 24 Hours Open' },
    { name: 'Bala Electrical & Plumbing', phone: '', email: '', address: 'Manikandan Nagar, Kunniyamuthur', category: 'professional', relationship: 'Electrician', notes: 'Installation, repairs, lighting, plumbing. 24 Hours' },
    { name: 'Morning Star Home Service', phone: '', email: 'www.morningstarhomeservice.com', address: 'Ram Nagar, Coimbatore', category: 'professional', relationship: 'Electrician', notes: 'Home electrical repairs, installations. On Demand' },
    { name: 'Joboy Electricians', phone: '', email: '', address: 'Kovaipudur Service Area', category: 'professional', relationship: 'Electrician', notes: 'On-demand, warranty, background-checked' },

    // Appliance Repair Technicians
    { name: 'Kitchen Experts Covai', phone: '07418667118', email: 'kitchenxpertsindia@gmail.com', address: 'Malumichampatti (20km radius, covers Kovaipudur)', category: 'professional', relationship: 'Appliance Repair', notes: 'Chimney, dishwasher, hob, microwave repair, installation, cleaning. 8AM–8PM' },
    { name: 'K M Enterprises', phone: '08147718905', email: '', address: 'Sundarapuram', category: 'professional', relationship: 'Appliance Repair', notes: 'Washing machine repair. 9AM–8PM' },
    { name: 'Archana Home Appliance Service', phone: '08488039639', email: '', address: 'Eachanari Road, Madukkarai', category: 'professional', relationship: 'Appliance Repair', notes: 'Washing machine, refrigerator, home appliances. Customer schedule' },
    { name: 'Kongu Cool Creators', phone: '', email: '', address: 'Arivozhi Nagar, Kovaipudur', category: 'professional', relationship: 'Appliance Repair', notes: 'Refrigerator, AC repairs. Customer schedule' },
    { name: 'Sun Rise Electronic Service', phone: '', email: '', address: 'S-76, Kovaipudur', category: 'professional', relationship: 'Appliance Repair', notes: 'TV, audio system repair. 7AM–8PM' },
    { name: 'Sun Cool House', phone: '', email: '', address: '120-B, Perur Main Rd, Kovaipudur', category: 'professional', relationship: 'Appliance Repair', notes: 'Home appliance repair. Customer schedule' },
    { name: 'Perfect Engineering', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Appliance Repair', notes: 'Kitchen appliances, washing machine, TV repair. 9AM–8PM' },
    { name: 'Shakthi Electronics', phone: '', email: '', address: '74, Kovaipudur', category: 'professional', relationship: 'Appliance Repair', notes: 'Audio system and home appliance repair. 8AM–8PM' },

    // Construction & Renovation Contractors
    { name: 'Prism Associates & Developers', phone: '08069868387', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'Residential, commercial, high-end renovation, grouting, remodelling. 9AM–2PM' },
    { name: 'Best Arc Solution', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'Residential/commercial construction, on-time service. 9AM–6PM' },
    { name: 'Sakthi Construction Cum Builders', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'Residential homes, bathroom renovation, kitchen works. On Demand' },
    { name: 'Jayasree Building Engineering', phone: '8940229630/9597195230', email: '', address: 'Balamurugan St., Sugunapuram, Milekal, Coimbatore South', category: 'professional', relationship: 'Construction Contractor', notes: 'Affordable, vastu-compliant home design, full turnkey, labor contracts. 9AM–9PM (Closed Sundays)' },
    { name: 'Honeycomb Construction', phone: '', email: '', address: 'Vivekanandapuram, Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'Onsite industrial buildings, residential construction. 9AM–7PM' },
    { name: 'Q Builders', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'Turnkey, RCC, commercial & residential, rainwater harvesting. 9AM–7PM' },
    { name: 'SK Designers & Builders', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'Complete building, including interiors and renovations. 9AM–7PM' },
    { name: 'Amarnath Builders and Promoters', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Construction Contractor', notes: 'New builds, renovations, commercial and housing society projects. On Demand' },
    { name: 'Sr Krishna Builders', phone: '', email: '', address: 'KMR Complex, Garuda Ave', category: 'professional', relationship: 'Construction Contractor', notes: 'Residential, custom homes, loan support. 9AM-6PM' },

    // Cleaning Services
    { name: 'Aida Tiles & Ceramic Cleaner', phone: '07490016255', email: '', address: 'NGGO Colony, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'Bathroom, tile cleaning. 9AM–6PM' },
    { name: 'CNS Facility Management', phone: '09725270206', email: '', address: 'Ramanathapuram, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'Eco-friendly deep cleaning, foam cleaning. 9AM–6PM, Responsive' },
    { name: 'Covai Cleaning Experts', phone: '08861958504', email: '', address: 'Ramanathapuram, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'Home, bathroom, residential deep cleaning. 8AM–8PM' },
    { name: 'Kovai Clean Service', phone: '08490082752', email: '', address: 'Josh Garden, Urumandampalayam', category: 'professional', relationship: 'Cleaning Service', notes: 'House, bathroom, kitchen. 7AM–8PM' },
    { name: 'BEST And Clean Housekeeping', phone: '08128250210', email: '', address: 'Ramanathapuram, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'Housekeeping, deep home cleaning. 8AM–8PM' },
    { name: 'CHINNA CLEANING & FACILITY', phone: '08123810320', email: '', address: 'Rathinapuri, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'Quick service, flexible appointments. 8AM–8PM' },
    { name: 'Smart City Care Cleaners', phone: '88826 21058', email: 'clean@smartcitycare.in', address: 'Kovaipudur', category: 'professional', relationship: 'Cleaning Service', notes: 'Deep cleaning, home & office cleaning, kitchen/bathroom. 24/7' },
    { name: 'Joboy Cleaning Services', phone: '', email: '', address: 'Kovaipudur (throughout city)', category: 'professional', relationship: 'Cleaning Service', notes: 'Home deep cleaning, custom packages. On Demand' },
    { name: 'Eco-Mist Cleaning Care', phone: '', email: '', address: 'Sundarapuram, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'A-Z residential/commercial cleaning. 8AM–8PM' },
    { name: 'Anjuneya Cleaning Service', phone: '07405203414', email: '', address: 'Sulur, Coimbatore', category: 'professional', relationship: 'Cleaning Service', notes: 'Deep/water tank cleaning. 9AM–5PM' },
    { name: 'A2Z Property Management', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Cleaning Service', notes: 'Residential, commercial cleaning, property mgmt. Appointment' },

    // Pest Control Services
    { name: 'Haiku Pest Control', phone: '', email: '', address: '21, Palaniyappa 2nd St, Opp Govt School, Kovaipudur', category: 'professional', relationship: 'Pest Control', notes: 'Herbal pest control, residential/commercial, general, car pest control. 10AM–5PM (Closed Sundays)' },
    { name: 'The King Pest Management', phone: '09629440365', email: 'www.kingpest.in', address: 'M.K. Palayam, Uppilipalayam', category: 'professional', relationship: 'Pest Control', notes: 'Termites, cockroaches, rodents, eco-friendly, post-control mgmt. 24 Hours Open' },
    { name: 'Pest Control Management', phone: '08110908066', email: 'www.coimbatorepestcontrol.com', address: 'Ismail St, Head PO Road', category: 'professional', relationship: 'Pest Control', notes: 'Customized plans, free inspection, residential/commercial. Mon-Sat 9AM–7:30PM, Sun 9–4' },
    { name: 'T Guard Pest Control Service', phone: '08883023333', email: 'www.tguardpestcontrol.com', address: 'Ganapathy, Coimbatore', category: 'professional', relationship: 'Pest Control', notes: 'Termite, mosquito, spider, warranty, eco-solutions. Mon-Fri 9AM–8PM; Sat 9–6, Sun 9–4' },
    { name: 'True Pest Management Services', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Pest Control', notes: 'General, termite, rodent, commercial. 9:30AM–6PM' },
    { name: 'Joboy Pest Control', phone: '', email: '', address: 'Kovaipudur Service Area', category: 'professional', relationship: 'Pest Control', notes: 'Cockroach, ants, lizard, termites. On Demand, All Areas' },

    // Vehicle Mechanics & Garages
    { name: 'R.M All Car Service', phone: '08460421350', email: '', address: 'Perur Main Road, Housing Board Rd, Kovaipudur', category: 'professional', relationship: 'Car Mechanic', notes: 'Car wash, service, doorstep, verified. 9AM–8PM' },
    { name: '5K Car Care', phone: '', email: '', address: 'Kovaipudur Main Road/Palakkad Main Rd', category: 'professional', relationship: 'Car Service', notes: 'Detailing, car wash, auto grooming. 9AM–7PM' },
    { name: 'New Car Motors', phone: '', email: '', address: 'Kunniyamuthur', category: 'professional', relationship: 'Car Service', notes: 'Car wash, door-step service, lost key support. 9AM–8PM' },
    { name: 'MyTVS MultiBrand Car Service', phone: '07487860940', email: '', address: 'Multiple locations, covers Kovaipudur', category: 'professional', relationship: 'Car Service', notes: 'All brands, authorized, quick booking. 8AM–8PM' },
    { name: 'Engine Care Rebuilders', phone: '', email: '', address: 'Kaveri Nagar, Kunniyamuthur', category: 'professional', relationship: 'Car Mechanic', notes: '24x7 support, engine rebuild. 24x7' },
    { name: 'Kari Sports', phone: '', email: '', address: 'BK Pudur', category: 'professional', relationship: 'Car Mechanic', notes: 'Car tuning/repair, custom jobs. 8AM–8PM' },
    { name: 'Guru Service Station', phone: '', email: '', address: 'Kuniyamuthur', category: 'professional', relationship: 'Car Mechanic', notes: 'Automobile repairs (multi-vehicle). 8AM–8PM' },
    { name: 'Hi Tech Auto Electrical Works', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Auto Electrician', notes: 'Auto electrical repairs, battery. 9AM–7PM' },
    { name: 'Kings Automobiles', phone: '', email: '', address: 'BK Pudur', category: 'professional', relationship: 'Car Service', notes: 'Doorstep car services. 8AM–8PM' },
    { name: 'DSJ Water Service', phone: '', email: '', address: 'Kovaipudur', category: 'professional', relationship: 'Car Wash', notes: 'Car washing, maintenance. 9AM–6PM' },

    // Pooja Item Vendors
    { name: 'Sri Vinayaka Pooja Stores', phone: '', email: '', address: 'Devaraja Market, Mysore', category: 'professional', relationship: 'Pooja Items', notes: 'Full puja kits, quick delivery, incense. Shop Hours' },
    { name: 'Sriguru Spiritual', phone: '07383651057', email: '', address: 'West Raja Street, Kanchipuram', category: 'professional', relationship: 'Pooja Items', notes: 'Puja items, temple umbrellas. 9AM–8PM' },
    { name: 'GIRI Trading Agency', phone: '', email: 'www.giri.in', address: 'Online/CBE delivery', category: 'professional', relationship: 'Pooja Items', notes: 'Traditional puja items, abhishekam sets, lamps. 8AM–9PM' },
    { name: 'Srihari Pvt Ltd', phone: '', email: '', address: 'Kodambakkam, Chennai', category: 'professional', relationship: 'Pooja Items', notes: 'Pendant puja kits, all rituals. 10AM–8PM' },
    { name: 'Sumangali Pooja Collections', phone: '', email: '', address: 'Jayanagar, Bangalore', category: 'professional', relationship: 'Pooja Items', notes: 'Sumangali/pooja kits, fast delivery. 9AM–9PM' },
    { name: 'Panditji On Way', phone: '', email: '', address: 'Online/Mumbai', category: 'professional', relationship: 'Pooja Items', notes: 'Puja kit delivery, booking for ceremonies. 24x7 (support)' },

    // Flower Sellers
    { name: 'M P M Flowers', phone: '08401639037', email: '', address: 'P S Flower Market, RS Puram, CBE', category: 'professional', relationship: 'Florist', notes: 'Reasonably priced, wedding, temple garlands. 24 Hours' },
    { name: 'Simuvi Flowers', phone: '09972946693', email: '', address: 'Mettupalayam Road, RS Puram, CBE', category: 'professional', relationship: 'Florist', notes: 'Event/banquet decoration, bouquets. Flexible' },
    { name: 'Cheran Bouquet Shop', phone: '08460410026', email: '', address: 'MTP Road, Town Hall, CBE', category: 'professional', relationship: 'Florist', notes: '24h home delivery, bouquets. 24 Hours' },
    { name: 'Real Flora Flower Shop', phone: '08460261729', email: '', address: 'TV Swamy Rd, RS Puram, CBE', category: 'professional', relationship: 'Florist', notes: 'Car/venue decoration. 24 Hours' },
    { name: 'Orchids The Bouquet World', phone: '', email: '', address: 'Palakkad Main Road, BK Pudur', category: 'professional', relationship: 'Florist', notes: 'Car, banquet, wedding flowers, fresh. 9AM–7PM' },
    { name: 'Petals The Flower Shop', phone: '9952514075', email: '', address: '23 East Bashyagaralu Road, RS Puram, CBE', category: 'professional', relationship: 'Florist', notes: 'Fresh wedding, daily puja flowers, bouquets. 9AM–8PM' },
    { name: 'Sri Vinayaga Florists', phone: '9994771363', email: '', address: '95A Dhandapani St, Pappanaickenpalayam', category: 'professional', relationship: 'Florist', notes: 'Natural garlands, ritual packs, home delivery. 6AM–8PM' },

    // Grocery & Vegetable Vendors
    { name: 'Balu Vegetables', phone: '', email: '', address: 'U Block, Kovaipudur', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Fresh vegetables, seasonal fruits, bulk orders. 7AM–10PM' },
    { name: 'MDS Vegetables', phone: '', email: '', address: 'W Block, Opp Thendral Bakery, Kovaipudur', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Wholesale vegetables, daily supply, bulk. 24 Hours' },
    { name: 'SA Vegetables', phone: '90437 27277', email: 'info@savegetables.in', address: 'Wholesale Market, Saibaba Colony', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Fresh, organic, supply to homes & corporates. 6AM–8PM' },
    { name: 'Kovai Fresh Greens', phone: '9944302991', email: 'www.kovaifreshgreens.in', address: '#12, Ramasamy St, RS Puram', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Home delivery (greens & vegetables), online orders. 6AM–8PM' },
    { name: 'SP Vegetables', phone: '6379977930', email: '', address: 'Kamala Mill Colony, Singanallur', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Wholesaler, fruits & veggies, delivery. 6AM–8PM' },
    { name: 'Immanuel Vegetable Store', phone: '9942670993', email: '', address: 'Dr Radhakrishna St, Gandhipuram, CBE', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Fruits, vegetables, home delivery. 7AM–8PM' },
    { name: 'Local Pushcart Vendors', phone: '', email: '', address: 'Throughout Kovaipudur commuting by street', category: 'professional', relationship: 'Vegetable Vendor', notes: 'Home-visit: drumstick, brinjal, banana, manjal. Early morning–noon' },

    // Original entries (keeping some for continuity)
    { name: 'Suresh Electricals', phone: '+91-422-2468140', email: 'suresh.electricals@gmail.com', address: 'Kovaipudur Main Road', category: 'professional', relationship: 'Electrician', notes: 'Reliable electrical services, available 24/7 for emergencies' },
    { name: 'Ravi Plumbing', phone: '+91-422-2468141', email: 'ravi.plumbing@gmail.com', address: 'Peelamedu Extension', category: 'professional', relationship: 'Plumber', notes: 'Expert plumbing services for all household needs' },
    { name: 'Dr. Meena Dental', phone: '+91-422-2468137', email: 'meena.dental@gmail.com', address: 'Kovaipudur Main Road', category: 'professional', relationship: 'Dentist', notes: 'Family dental care, root canal specialist' },
    { name: 'City Pharmacy', phone: '+91-422-2468138', email: 'city.pharma@gmail.com', address: 'Near Kovaipudur Bus Stand', category: 'professional', relationship: 'Pharmacy', notes: '24/7 pharmacy, home delivery available' },
    { name: 'Anand Grocery', phone: '+91-422-2468147', email: 'anand.grocery@gmail.com', address: 'Kovaipudur Main Road', category: 'professional', relationship: 'Grocery Store', notes: 'Fresh vegetables, daily essentials, home delivery' },
    { name: 'Priya Tuition Center', phone: '+91-422-2468146', email: 'priya.tuition@gmail.com', address: 'Kovaipudur', category: 'professional', relationship: 'Maths Tuition', notes: 'Classes for grades 1-12, experienced teachers' },
    { name: 'Kovaipudur Police Station', phone: '100', email: 'kovai.police@tn.gov.in', address: 'Kovaipudur Police Station', category: 'professional', relationship: 'Police Emergency', notes: 'Local police station for Kovaipudur area' },
    { name: 'Sri Krishna Bakery', phone: '+91-422-2468148', email: 'sri.krishna.bakery@gmail.com', address: 'Near Kovaipudur Temple', category: 'professional', relationship: 'Bakery', notes: 'Fresh breads, cakes, and traditional sweets' },
    { name: 'Kumar AC Service', phone: '+91-422-2468142', email: 'kumar.ac@gmail.com', address: 'Kovaipudur', category: 'professional', relationship: 'AC Technician', notes: 'AC repair, installation, and maintenance services' },
    { name: 'Lakshmi House Cleaning', phone: '+91-422-2468144', email: 'lakshmi.cleaning@gmail.com', address: 'Kovaipudur Area', category: 'professional', relationship: 'House Cleaning', notes: 'Professional cleaning services, deep cleaning available' }
  ];

  for (const contact of localServiceContacts) {
    await db.contacts.add({
      ...contact,
      id: Date.now() + Math.random(),
      createdAt: new Date(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`,
    });
  }
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

// Initialize database with sample data
export async function initializeDatabase() {
  try {
    console.log("Initializing database...");
    
    // Check if contacts table is empty and populate if needed
    const existingContacts = await db.contacts.count();
    console.log("Existing contacts count:", existingContacts);
    
    if (existingContacts === 0) {
      console.log("No contacts found, initializing with local service providers...");
      await initDirectorySampleData();
      console.log("Database initialization completed");
    } else {
      console.log("Contacts already exist, skipping initialization");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}