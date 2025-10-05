import Dexie from 'dexie';

// Rituals, Festivals & Spiritual Life Database
export class RitualsDB extends Dexie {
  rituals;
  templeTrips;
  festivals;
  poojaSchedules;

  constructor() {
    super('RitualsDB');
    this.version(1).stores({
      rituals: 'id, name, type, date, completed',
      templeTrips: 'id, destination, startDate, endDate, budget',
      festivals: 'id, name, date, type',
      poojaSchedules: 'id, ritualId, date, completed'
    });
  }
}

export const ritualsDB = new RitualsDB();

// Initialize sample data
export async function initializeRitualsData() {
  try {
    // Check if data already exists
    const existingRituals = await ritualsDB.rituals.count();
    if (existingRituals > 0) return;

    // Sample rituals
    const rituals = [
      {
        id: 'morning-pooja',
        name: 'Morning Pooja',
        type: 'daily',
        date: new Date(),
        participants: ['amma', 'paati'],
        completed: false,
        description: 'Daily morning prayer and offerings to deities',
        materials: ['incense', 'flowers', 'camphor', 'prasad'],
        duration: 30,
        significance: 'Start the day with divine blessings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'saturday-pooja',
        name: 'Saturday Special Pooja',
        type: 'weekly',
        date: new Date(),
        participants: ['family'],
        completed: false,
        description: 'Special prayers for Lord Shiva on Saturdays',
        materials: ['bilva leaves', 'milk', 'honey', 'flowers'],
        duration: 45,
        significance: 'Weekly worship of Lord Shiva',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'amavasya-ritual',
        name: 'Amavasya Tharpanam',
        type: 'monthly',
        date: new Date('2025-10-20'),
        participants: ['appa', 'paati'],
        completed: false,
        description: 'Ancestral rites performed on new moon day',
        materials: ['rice', 'black sesame', 'darbha grass', 'water'],
        duration: 60,
        significance: 'Offerings to ancestors for their peace',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample temple trips
    const templeTrips = [
      {
        id: 'ramanan-trip',
        destination: 'Sri Ramanasramam, Tiruvannamalai',
        startDate: new Date('2025-11-15'),
        endDate: new Date('2025-11-17'),
        travelers: ['amma', 'appa', 'paati'],
        checklist: [
          'Pack traditional clothing',
          'Bring prasad for offering',
          'Carry water bottle',
          'Bring notebook for meditation',
          'Pack medicines',
          'Inform neighbors about trip'
        ],
        budget: 15000,
        accommodations: 'Ashram guest house',
        transportation: 'Car',
        specialNotes: 'Visit during full moon for special darshan',
        completed: false,
        createdAt: new Date()
      },
      {
        id: 'sabari-trip',
        destination: 'Sabari Malai Temple',
        startDate: new Date('2025-12-01'),
        endDate: new Date('2025-12-03'),
        travelers: ['family'],
        checklist: [
          'Get special entry permit',
          'Pack light food',
          'Wear comfortable shoes for climbing',
          'Bring water and snacks',
          'Carry identity proof'
        ],
        budget: 8000,
        accommodations: 'Temple rest house',
        transportation: 'Bus',
        specialNotes: 'Famous for Lord Rama and Sabari story',
        completed: false,
        createdAt: new Date()
      }
    ];

    // Sample festivals
    const festivals = [
      {
        id: 'diwali-2025',
        name: 'Diwali (Deepavali)',
        date: new Date('2025-11-10'),
        type: 'religious',
        significance: 'Festival of lights celebrating victory of good over evil',
        familyTraditions: [
          'Clean and decorate home',
          'Make rangoli designs',
          'Light oil lamps',
          'Burst crackers (safe ones)',
          'Exchange sweets'
        ],
        preparations: [
          'Buy diyas and lamps',
          'Purchase sweets and snacks',
          'Clean house thoroughly',
          'Prepare festive meals'
        ],
        recipes: ['Murukku', 'Sweet Pongal', 'Laddu', 'Chivda'],
        decorations: ['Rangoli', 'Torans', 'Flower garlands'],
        gifts: ['Sweets', 'Crackers', 'New clothes'],
        completed: false,
        notes: 'Most important festival - involves entire family'
      },
      {
        id: 'pongal-2026',
        name: 'Thai Pongal',
        date: new Date('2026-01-14'),
        type: 'seasonal',
        significance: 'Harvest festival thanking Sun God and Mother Earth',
        familyTraditions: [
          'Boil pongal in open air',
          'Offer first harvest to Sun',
          'Decorate with kolam',
          'Visit neighbors'
        ],
        preparations: [
          'Buy new clothes',
          'Prepare sweet pongal',
          'Make kolam designs',
          'Clean courtyard'
        ],
        recipes: ['Sweet Pongal', 'Ven Pongal', 'Sakkarai Pongal'],
        decorations: ['Kolam', 'Banana leaves', 'Flowers'],
        completed: false,
        notes: 'Four-day festival starting with Bhogi'
      },
      {
        id: 'varalakshmi-vratam',
        name: 'Varalakshmi Vratam',
        date: new Date('2025-10-25'),
        type: 'religious',
        significance: 'Vow to Goddess Lakshmi for family prosperity',
        familyTraditions: [
          'Fast and pray to Goddess',
          'Offer special pooja',
          'Prepare festive meal',
          'Exchange varalakshmi photos'
        ],
        preparations: [
          'Buy varalakshmi photo',
          'Prepare vratam materials',
          'Make sweet dishes'
        ],
        recipes: ['Payasam', 'Laddu', 'Sweet Rice'],
        decorations: ['Flowers', 'Incense', 'Pooja items'],
        completed: false,
        notes: 'Women observe fast for family well-being'
      }
    ];

    await ritualsDB.rituals.bulkAdd(rituals);
    await ritualsDB.templeTrips.bulkAdd(templeTrips);
    await ritualsDB.festivals.bulkAdd(festivals);

    console.log('Rituals data initialized successfully');
  } catch (error) {
    console.error('Error initializing rituals data:', error);
  }
}

// Ritual Operations
export async function getRituals() {
  return await ritualsDB.rituals.toArray();
}

export async function getRitualsByType(type) {
  return await ritualsDB.rituals.where('type').equals(type).toArray();
}

export async function addRitual(ritual) {
  const id = `ritual-${Date.now()}`;
  const newRitual = {
    ...ritual,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await ritualsDB.rituals.add(newRitual);
  return newRitual;
}

export async function updateRitual(id, updates) {
  await ritualsDB.rituals.update(id, { ...updates, updatedAt: new Date() });
}

export async function deleteRitual(id) {
  await ritualsDB.rituals.delete(id);
}

export async function markRitualCompleted(id, completed) {
  await updateRitual(id, { completed });
}

// Temple Trip Operations
export async function getTempleTrips() {
  return await ritualsDB.templeTrips.toArray();
}

export async function addTempleTrip(trip) {
  const id = `tript-${Date.now()}`;
  const newTrip = {
    ...trip,
    id,
    createdAt: new Date()
  };
  await ritualsDB.templeTrips.add(newTrip);
  return newTrip;
}

export async function updateTempleTrip(id, updates) {
  await ritualsDB.templeTrips.update(id, updates);
}

export async function deleteTempleTrip(id) {
  await ritualsDB.templeTrips.delete(id);
}

export async function markTempleTripCompleted(id, completed) {
  await updateTempleTrip(id, { completed });
}

// Festival Operations
export async function getFestivals() {
  return await ritualsDB.festivals.toArray();
}

export async function getUpcomingFestivals() {
  const now = new Date();
  return await ritualsDB.festivals.where('date').aboveOrEqual(now).sortBy('date');
}

export async function addFestival(festival) {
  const id = `festival-${Date.now()}`;
  const newFestival = { ...festival, id };
  await ritualsDB.festivals.add(newFestival);
  return newFestival;
}

export async function updateFestival(id, updates) {
  await ritualsDB.festivals.update(id, updates);
}

export async function deleteFestival(id) {
  await ritualsDB.festivals.delete(id);
}

export async function markFestivalCompleted(id, completed) {
  await updateFestival(id, { completed });
}

// Statistics and Analytics
export async function getRitualsStats() {
  const rituals = await getRituals();
  const templeTrips = await getTempleTrips();
  const festivals = await getFestivals();

  return {
    totalRituals: rituals.length,
    completedRituals: rituals.filter(r => r.completed).length,
    ritualsByType: rituals.reduce((acc, ritual) => {
      acc[ritual.type] = (acc[ritual.type] || 0) + 1;
      return acc;
    }, {}),
    totalTempleTrips: templeTrips.length,
    completedTrips: templeTrips.filter(t => t.completed).length,
    totalFestivals: festivals.length,
    upcomingFestivals: festivals.filter(f => f.date > new Date() && !f.completed).length,
    completedFestivals: festivals.filter(f => f.completed).length
  };
}

// Get rituals for today
export async function getTodaysRituals() {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const dailyRituals = await ritualsDB.rituals.where('type').equals('daily').toArray();
  const weeklyRituals = await ritualsDB.rituals.where('type').equals('weekly').toArray();
  const monthlyRituals = await ritualsDB.rituals.where('type').equals('monthly').toArray();

  // Filter weekly rituals for today (assuming Saturday = 6)
  const todaysWeeklyRituals = weeklyRituals.filter(ritual => {
    const ritualDate = new Date(ritual.date);
    return ritualDate.getDay() === today.getDay();
  });

  // Filter monthly rituals for today
  const todaysMonthlyRituals = monthlyRituals.filter(ritual => {
    const ritualDate = new Date(ritual.date);
    return ritualDate.getDate() === today.getDate();
  });

  return [...dailyRituals, ...todaysWeeklyRituals, ...todaysMonthlyRituals];
}

// Export alias for backward compatibility
export const initRitualsDB = initializeRitualsData;