import Dexie from 'dexie';

// Directory Database for Family Contacts & Community Resources
export const directoryDB = new Dexie('DirectoryDB');

directoryDB.version(1).stores({
  // Family Contacts
  familyContacts: '++id, name, relationship, phone, email, address, emergencyContact, notes, lastContacted, importance',
  extendedFamily: '++id, name, relationship, phone, email, location, specialDates, notes',

  // Vendors & Service Providers
  vendors: '++id, name, category, service, phone, email, address, rating, notes, lastUsed, recommended',
  serviceProviders: '++id, name, type, specialty, phone, email, address, license, insurance, rating',

  // Health Services
  doctors: '++id, name, specialty, hospital, phone, email, address, experience, rating, emergency',
  hospitals: '++id, name, type, phone, email, address, emergency, specialties, rating',
  pharmacies: '++id, name, phone, email, address, hours, delivery, rating',
  healthServices: '++id, name, type, phone, email, address, services, rating',

  // Community Resources
  communityCenters: '++id, name, type, phone, email, address, services, programs',
  educationalInstitutions: '++id, name, type, phone, email, address, programs, rating',
  religiousCenters: '++id, name, type, phone, email, address, services, festivals',
  emergencyServices: '++id, name, type, phone, address, services, availability',

  // Local Amenities
  restaurants: '++id, name, cuisine, phone, email, address, rating, specialties, vegetarian',
  shops: '++id, name, type, phone, email, address, hours, specialties',
  transportation: '++id, name, type, phone, email, address, routes, schedule'
});

// Initialize database
export async function initDirectoryDB() {
  try {
    await directoryDB.open();
    console.log('Directory database initialized successfully');

    // Seed with sample data if empty
    const contactCount = await directoryDB.familyContacts.count();
    if (contactCount === 0) {
      await seedDirectoryData();
    }
  } catch (error) {
    console.error('Failed to initialize Directory database:', error);
  }
}

// Sample data for Directory
async function seedDirectoryData() {
  try {
    // Sample family contacts
    await directoryDB.familyContacts.bulkAdd([
      {
        name: 'Rajesh Kumar',
        relationship: 'Father',
        phone: '+91-9876543210',
        email: 'rajesh.kumar@email.com',
        address: '123 Temple Street, Chennai',
        emergencyContact: true,
        notes: 'Retired bank manager, loves classical music',
        lastContacted: new Date().toISOString(),
        importance: 'High'
      },
      {
        name: 'Priya Sharma',
        relationship: 'Mother',
        phone: '+91-9876543211',
        email: 'priya.sharma@email.com',
        address: '123 Temple Street, Chennai',
        emergencyContact: true,
        notes: 'Home maker, excellent cook, manages household',
        lastContacted: new Date().toISOString(),
        importance: 'High'
      },
      {
        name: 'Amit Kumar',
        relationship: 'Brother',
        phone: '+91-9876543212',
        email: 'amit.kumar@email.com',
        address: '456 Tech Park, Bangalore',
        emergencyContact: false,
        notes: 'Software engineer, travels frequently',
        lastContacted: new Date(Date.now() - 86400000).toISOString(),
        importance: 'Medium'
      }
    ]);

    // Sample vendors
    await directoryDB.vendors.bulkAdd([
      {
        name: 'South Indian Spices',
        category: 'Grocery',
        service: 'Spice supplies',
        phone: '+91-9876543220',
        email: 'info@southindianspices.com',
        address: '789 Market Road, Chennai',
        rating: 5,
        notes: 'Authentic South Indian spices, home delivery available',
        lastUsed: new Date(Date.now() - 604800000).toISOString(),
        recommended: true
      },
      {
        name: 'Temple Decorations',
        category: 'Religious',
        service: 'Pooja items',
        phone: '+91-9876543221',
        email: 'sales@templedecor.com',
        address: '321 Temple Bazaar, Chennai',
        rating: 4,
        notes: 'Complete pooja items, festival decorations',
        lastUsed: new Date(Date.now() - 2592000000).toISOString(),
        recommended: true
      }
    ]);

    // Sample doctors
    await directoryDB.doctors.bulkAdd([
      {
        name: 'Dr. Saravanan Iyer',
        specialty: 'Family Medicine',
        hospital: 'Apollo Hospitals',
        phone: '+91-9876543230',
        email: 'dr.saravanan@apollohospitals.com',
        address: 'Greams Road, Chennai',
        experience: 15,
        rating: 5,
        emergency: true
      },
      {
        name: 'Dr. Meera Krishnan',
        specialty: 'Ayurveda',
        hospital: 'Jiva Ayurveda',
        phone: '+91-9876543231',
        email: 'dr.meera@jivaayurveda.com',
        address: 'T. Nagar, Chennai',
        experience: 12,
        rating: 4,
        emergency: false
      }
    ]);

    // Sample community centers
    await directoryDB.communityCenters.bulkAdd([
      {
        name: 'Chennai Tamil Sangam',
        type: 'Cultural',
        phone: '+91-9876543240',
        email: 'info@chennaithamilsangam.org',
        address: 'Royapettah, Chennai',
        services: ['Language classes', 'Cultural events', 'Community gatherings'],
        programs: ['Tamil classes', 'Bharatanatyam', 'Carnatic music']
      },
      {
        name: 'Senior Citizens Center',
        type: 'Social Services',
        phone: '+91-9876543241',
        email: 'help@seniorcenter.org',
        address: 'Adyar, Chennai',
        services: ['Health checkups', 'Recreation', 'Counseling'],
        programs: ['Yoga classes', 'Computer literacy', 'Social activities']
      }
    ]);

    console.log('Directory sample data seeded successfully');
  } catch (error) {
    console.error('Failed to seed Directory data:', error);
  }
}

// Export database tables for components
export const {
  familyContacts,
  extendedFamily,
  vendors,
  serviceProviders,
  doctors,
  hospitals,
  pharmacies,
  healthServices,
  communityCenters,
  educationalInstitutions,
  religiousCenters,
  emergencyServices,
  restaurants,
  shops,
  transportation
} = directoryDB;