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

// Rituals Sections for navigation
export const RitualsSections = [
  {
    id: "overview",
    name: "Spiritual Overview",
    tamil: "ஆன்மீக கண்ணோட்டம்",
    icon: "heroicons:sparkles",
    color: "orange"
  },
  {
    id: "tracker",
    name: "Ritual Tracker",
    tamil: "சடங்கு கண்காணிப்பு",
    icon: "heroicons:check-circle",
    color: "amber"
  },
  {
    id: "temple",
    name: "Temple Planner",
    tamil: "கோயில் திட்டமிடல்",
    icon: "heroicons:building-storefront",
    color: "red"
  },
  {
    id: "festivals",
    name: "Festival Manager",
    tamil: "விழா மேலாளர்",
    icon: "heroicons:calendar-days",
    color: "purple"
  },
  {
    id: "mantras",
    name: "Mantras & Prayers",
    tamil: "மந்திரங்கள் & பிரார்த்தனைகள்",
    icon: "heroicons:musical-note",
    color: "indigo"
  }
];

// Family Members for rituals
export const FamilyMembers = {
  family: {
    name: "Family",
    tamil: "குடும்பம்",
    role: "All members"
  },
  amma: {
    name: "Amma",
    tamil: "அம்மா",
    role: "Primary performer"
  },
  appa: {
    name: "Appa",
    tamil: "அப்பா",
    role: "Family head"
  },
  paati: {
    name: "Paati",
    tamil: "பாட்டி",
    role: "Elder guidance"
  },
  thambi: {
    name: "Thambi",
    tamil: "தம்பி",
    role: "Young learner"
  },
  akka: {
    name: "Akka",
    tamil: "அக்கா",
    role: "Assistant"
  }
};

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

// Static data for ritual prompts and recommendations
export const ritualPrompts = {
  1: "இன்று உன் உடல் மற்றும் மனம் ஆரோக்கியமாக இருக்கட்டும். தினமும் காலை வழிபாட்டை தவறாமல் செய்.",
  2: "குடும்பத்துடன் நேரம் செலவிடு. உன் பெற்றோர்களுக்கு மரியாதை கொடு.",
  3: "உன் வேலையில் கவனம் செலுத்து. பொறுமை மற்றும் ஒழுக்கத்துடன் செயல்படு.",
  4: "நண்பர்களுடன் நல்ல உறவை பராமரி. உதவி செய்யும் மனப்பான்மையை வளர்த்துக்கொள்.",
  5: "உன் ஆன்மீக வாழ்க்கையை மேம்படுத்து. தியானம் மற்றும் யோகாவை பழக்கம் செய்.",
  6: "சமூக சேவையில் ஈடுபடு. பிறருக்கு உதவி செய்யும் வாய்ப்புகளை தேடு.",
  7: "உன் கல்வியை தொடர்ந்து மேம்படுத்து. புதிய விஷயங்களை கற்றுக்கொள்.",
  8: "உடல் நலனை கவனி. வழக்கமான உடற்பயிற்சி மற்றும் ஆரோக்கியமான உணவை எடுத்துக்கொள்.",
  9: "பொருளாதார நிலையை மேம்படுத்து. சேமிப்பு மற்றும் முதலீட்டை கவனி.",
  10: "கலை மற்றும் கலாச்சாரத்தை ஆர்வமாக கற்றுக்கொள். தமிழ் மொழியை பாதுகாப்பு.",
  11: "தன்னம்பிக்கையை வளர்த்துக்கொள். உன் திறமைகளை நம்பு.",
  12: "அமைதியான மனதை பராமரி. மன அழுத்தத்தை குறைக்கும் வழிமுறைகளை கடைபிடி.",
  13: "பிறரின் கருத்துகளை மதிப்பு. பொறுமையாக கேள்.",
  14: "நேரத்தை மதிப்பாக பயன்படுத்து. திட்டமிடல் மற்றும் ஒழுங்கை கடைபிடி.",
  15: "உன் கனவுகளை நனவாக்கு. சிறிய அடிகளில் முன்னேறு.",
  16: "இயற்கையை காதலி. சுற்றுச்சூழலை பாதுகாப்பு.",
  17: "நன்றியுணர்வை வளர்த்துக்கொள். உன் வாழ்க்கையில் நல்ல விஷயங்களுக்கு நன்றி சொல்.",
  18: "புதிய அனுபவங்களை தேடு. பயத்தை வெல்லு.",
  19: "உன் உறவுகளை வலுப்படுத்து. குடும்பத்துடன் நேரம் செலவிடு.",
  20: "ஆன்மீக வளர்ச்சியில் கவனம் செலுத்து. தியானம் செய்.",
  21: "பிறருக்கு உதவி செய். தொண்டு செயல்களில் ஈடுபடு.",
  22: "உன் திறமைகளை மேம்படுத்து. பயிற்சி மற்றும் கல்வியை தொடர்.",
  23: "உடல் ஆரோக்கியத்தை முன்னுரிமைப்படுத்து. வழக்கமான பரிசோதனைகளை செய்.",
  24: "பொருளாதார சுதந்திரத்தை அடை. சேமிப்பு பழக்கத்தை வளர்த்துக்கொள்.",
  25: "கலாச்சார மரபுகளை கடைபிடி. விழாக்களை கொண்டாடு.",
  26: "தன்னடக்கத்தை வளர்த்துக்கொள். கட்டுப்பாட்டை கடைபிடி.",
  27: "அமைதியை காப்பாற்று. மன அமைதியை பராமரி.",
  28: "பிறரின் வெற்றியை ஆர்வமாக கொண்டாடு. பொறாமை இல்லாமல் இரு.",
  29: "உன் நேரத்தை திறம்பட பயன்படுத்து. முன்னுரிமைகளை அமை.",
  30: "உன் இலக்குகளை தெளிவாக வரையறு. செயல்திட்டம் தயார் செய்."
};

export const foodRecommendations = {
  1: ["பால்", "தேங்காய் தண்ணீர்", "பழங்கள்", "பருப்பு சாதம்"],
  2: ["கீரை சமையல்", "முளைக்கட்டிய சாதம்", "பழங்கள்", "தயிர்"],
  3: ["கீரை சமையல்", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  4: ["பருப்பு சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  5: ["முளைக்கட்டிய சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  6: ["பருப்பு சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  7: ["கீரை சமையல்", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  8: ["முளைக்கட்டிய சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  9: ["பருப்பு சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  10: ["காய்கறி குழம்பு", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  11: ["முளைக்கட்டிய சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  12: ["பருப்பு சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  13: ["கீரை சமையல்", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  14: ["முளைக்கட்டிய சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  15: ["பருப்பு சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  16: ["காய்கறி குழம்பு", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  17: ["முளைக்கட்டிய சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  18: ["பருப்பு சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  19: ["கீரை சமையல்", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  20: ["முளைக்கட்டிய சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  21: ["பருப்பு சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  22: ["காய்கறி குழம்பு", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  23: ["முளைக்கட்டிய சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  24: ["பருப்பு சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  25: ["கீரை சமையல்", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  26: ["முளைக்கட்டிய சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"],
  27: ["பருப்பு சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  28: ["காய்கறி குழம்பு", "பருப்பு குழம்பு", "பழங்கள்", "தயிர்"],
  29: ["முளைக்கட்டிய சாதம்", "கீரை சமையல்", "பழங்கள்", "தயிர்"],
  30: ["பருப்பு சாதம்", "காய்கறி குழம்பு", "பழங்கள்", "தயிர்"]
};

export const avoidFoods = {
  1: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  2: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  3: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  4: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  5: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  6: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  7: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  8: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  9: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  10: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  11: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  12: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  13: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  14: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  15: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  16: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  17: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  18: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  19: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  20: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  21: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  22: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  23: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  24: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  25: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  26: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  27: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  28: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  29: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"],
  30: ["காரமான உணவுகள்", "பதப்படுத்தப்பட்ட உணவுகள்", "சர்க்கரை அதிகமான பானங்கள்"]
};

export const tamilWisdom = [
  "அருள் கொண்ட மனம் ஒன்றே உண்மையான செல்வம்.",
  "பொறுமை ஒன்றே பெரிய சக்தி.",
  "உழைப்பே வெற்றியின் தாய்.",
  "கல்வி ஒன்றே மனிதனை உயர்த்தும்.",
  "நன்றியுணர்வு ஒன்றே மனிதனை மேன்மையாக்கும்.",
  "அன்பு ஒன்றே உலகை இயக்கும் சக்தி.",
  "ஒழுக்கம் ஒன்றே மனிதனின் அடையாளம்.",
  "தன்னம்பிக்கை ஒன்றே வெற்றியின் அடிப்படை.",
  "சமூக சேவை ஒன்றே மனிதனின் கடமை.",
  "ஆன்மீக வளர்ச்சி ஒன்றே வாழ்க்கையின் நோக்கம்."
];