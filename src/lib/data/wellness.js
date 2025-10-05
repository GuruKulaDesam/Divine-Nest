import Dexie from 'dexie';

// Wellness, Health & Emotional Balance Database
export class WellnessDB extends Dexie {
  healthRecords;
  mantras;
  yogaSessions;
  journalEntries;
  meditationSessions;

  constructor() {
    super('WellnessDB');
    this.version(1).stores({
      healthRecords: 'id, userId, date, type',
      mantras: 'id, name, category, language',
      yogaSessions: 'id, type, date, duration, completed',
      journalEntries: 'id, userId, date, mood, category',
      meditationSessions: 'id, type, date, duration, completed'
    });
  }
}

export const wellnessDB = new WellnessDB();

// Initialize sample data
export async function initializeWellnessData() {
  try {
    // Check if data already exists
    const existingMantras = await wellnessDB.mantras.count();
    if (existingMantras > 0) return;

    // Sample mantras
    const mantras = [
      {
        id: 'gayatri-mantra',
        name: 'Gayatri Mantra',
        sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
        english: 'Om. We meditate on the glory of the Creator who has created the universe, who is worthy of worship, who is the embodiment of knowledge and light, who is the remover of all sin and ignorance. May he enlighten our intellect.',
        tamil: 'ஓம் பூர்புவஸ்வ தத் சவிதுர் வரேண்யம் பர்கோ தேவஸ்ய தீமஹி தியோ யோ நஃ ப்ரசோதயாத்',
        category: 'wisdom',
        deity: 'Savitr (Sun God)',
        purpose: 'Spiritual enlightenment and wisdom',
        pronunciation: 'Om Bhur Bhuva Svaha Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',
        benefits: [
          'Enhances concentration and memory',
          'Brings peace and clarity of mind',
          'Removes obstacles in spiritual path',
          'Improves overall well-being'
        ],
        favorite: true,
        usageCount: 0,
        createdAt: new Date()
      },
      {
        id: 'mahamrityunjaya-mantra',
        name: 'Mahamrityunjaya Mantra',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्',
        english: 'We worship the three-eyed One (Lord Shiva) who is fragrant and who nourishes all beings. May he liberate us from death for the sake of immortality, even as the cucumber is severed from its bondage of the vine.',
        tamil: 'ஓம் த்ரயம்பகம் யஜாமஹே சுகந்திம் புஷ்டி வர்த்தனம் உர்வாருகமிவ பந்தனான் ம்ருத்யோர் முக்ஷீய மாம்ருதாத்',
        category: 'health',
        deity: 'Lord Shiva',
        purpose: 'Healing and protection from diseases',
        pronunciation: 'Om Tryambakam Yajamahe Sugandhim Pushti Vardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat',
        benefits: [
          'Powerful healing mantra',
          'Protection from diseases and accidents',
          'Removes fear of death',
          'Promotes longevity and health'
        ],
        favorite: true,
        usageCount: 0,
        createdAt: new Date()
      },
      {
        id: 'om-shanti-mantra',
        name: 'Om Shanti Mantra',
        sanskrit: 'ॐ शान्तिः शान्तिः शान्तिः',
        english: 'Om Peace, Peace, Peace',
        tamil: 'ஓம் சாந்தி சாந்தி சாந்தி',
        category: 'peace',
        deity: 'Universal',
        purpose: 'Inner peace and harmony',
        pronunciation: 'Om Shanti Shanti Shanti',
        benefits: [
          'Calms the mind and reduces stress',
          'Brings peace to the environment',
          'Harmonizes relationships',
          'Promotes spiritual peace'
        ],
        favorite: false,
        usageCount: 0,
        createdAt: new Date()
      },
      {
        id: 'lakshmi-mantra',
        name: 'Lakshmi Mantra',
        sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
        english: 'Om Shreem Mahalakshmyai Namaha',
        tamil: 'ஓம் ஸ்ரீம் மஹாலக்ஷ்ம்யை நமஃ',
        category: 'prosperity',
        deity: 'Goddess Lakshmi',
        purpose: 'Wealth and prosperity',
        pronunciation: 'Om Shreem Mahalakshmyai Namaha',
        benefits: [
          'Attracts wealth and abundance',
          'Brings prosperity to family',
          'Enhances financial stability',
          'Promotes generosity and gratitude'
        ],
        favorite: false,
        usageCount: 0,
        createdAt: new Date()
      }
    ];

    // Sample yoga sessions
    const yogaSessions = [
      {
        id: 'morning-yoga',
        type: 'hatha',
        name: 'Morning Sun Salutation',
        date: new Date(),
        duration: 30,
        poses: [
          {
            name: 'Mountain Pose',
            sanskrit: 'Tadasana',
            duration: 30,
            benefits: ['Improves posture', 'Strengthens legs', 'Increases awareness'],
            instructions: 'Stand tall with feet together, arms at sides, gaze forward'
          },
          {
            name: 'Forward Bend',
            sanskrit: 'Uttanasana',
            duration: 30,
            benefits: ['Stretches hamstrings', 'Calms mind', 'Improves digestion'],
            instructions: 'Bend forward from hips, let hands reach toward floor'
          }
        ],
        difficulty: 'beginner',
        benefits: ['Energizes body and mind', 'Improves flexibility', 'Sets positive tone for day'],
        completed: false,
        notes: 'Practice with empty stomach for best results',
        createdAt: new Date()
      },
      {
        id: 'evening-relaxation',
        type: 'meditation',
        name: 'Evening Deep Relaxation',
        date: new Date(),
        duration: 20,
        poses: [],
        difficulty: 'beginner',
        benefits: ['Reduces stress', 'Improves sleep quality', 'Promotes healing'],
        completed: false,
        notes: 'Lie down comfortably, focus on breath',
        createdAt: new Date()
      }
    ];

    // Sample journal entry
        // Sample journal entries
    const journalEntries = [
      {
        id: 'gratitude-entry',
        userId: 'amma',
        date: new Date(),
        mood: 'grateful',
        category: 'gratitude',
        title: 'Thankful for Family Blessings',
        content: 'Today I am grateful for the love and support of my family. The morning pooja brought peace to my heart, and cooking traditional meals for everyone filled me with joy. May God bless our family with continued health and happiness.',
        tags: ['family', 'gratitude', 'pooja', 'cooking'],
        weather: 'sunny',
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await wellnessDB.mantras.bulkAdd(mantras);
    await wellnessDB.yogaSessions.bulkAdd(yogaSessions);
    await wellnessDB.journalEntries.bulkAdd(journalEntries);

    console.log('Wellness data initialized successfully');
  } catch (error) {
    console.error('Error initializing wellness data:', error);
  }
}

export const initWellnessDB = initializeWellnessData;

// Health Records Operations
export async function getHealthRecords(userId) {
  if (userId) {
    return await wellnessDB.healthRecords.where('userId').equals(userId).toArray();
  }
  return await wellnessDB.healthRecords.toArray();
}

export async function addHealthRecord(record) {
  const id = `health-${Date.now()}`;
  const newRecord = {
    ...record,
    id,
    createdAt: new Date()
  };
  await wellnessDB.healthRecords.add(newRecord);
  return newRecord;
}

export async function updateHealthRecord(id, updates) {
  await wellnessDB.healthRecords.update(id, updates);
}

export async function deleteHealthRecord(id) {
  await wellnessDB.healthRecords.delete(id);
}

// Mantra Operations
export async function getMantras() {
  return await wellnessDB.mantras.toArray();
}

export async function getMantrasByCategory(category) {
  return await wellnessDB.mantras.where('category').equals(category).toArray();
}

export async function getFavoriteMantras() {
  return await wellnessDB.mantras.where('favorite').equals(true).toArray();
}

export async function addMantra(mantra) {
  const id = `mantra-${Date.now()}`;
  const newMantra = {
    ...mantra,
    id,
    usageCount: 0,
    createdAt: new Date()
  };
  await wellnessDB.mantras.add(newMantra);
  return newMantra;
}

export async function updateMantra(id, updates) {
  await wellnessDB.mantras.update(id, updates);
}

export async function deleteMantra(id) {
  await wellnessDB.mantras.delete(id);
}

export async function practiceMantra(id) {
  const mantra = await wellnessDB.mantras.get(id);
  if (mantra) {
    await updateMantra(id, {
      usageCount: mantra.usageCount + 1,
      lastPracticed: new Date()
    });
  }
}

export async function toggleFavoriteMantra(id) {
  const mantra = await wellnessDB.mantras.get(id);
  if (mantra) {
    await updateMantra(id, { favorite: !mantra.favorite });
  }
}

// Yoga Session Operations
export async function getYogaSessions() {
  return await wellnessDB.yogaSessions.toArray();
}

export async function addYogaSession(session) {
  const id = `yoga-${Date.now()}`;
  const newSession = {
    ...session,
    id,
    createdAt: new Date()
  };
  await wellnessDB.yogaSessions.add(newSession);
  return newSession;
}

export async function updateYogaSession(id, updates) {
  await wellnessDB.yogaSessions.update(id, updates);
}

export async function deleteYogaSession(id) {
  await wellnessDB.yogaSessions.delete(id);
}

export async function markYogaSessionCompleted(id, completed) {
  await updateYogaSession(id, { completed });
}

// Journal Operations
export async function getJournalEntries(userId) {
  if (userId) {
    return await wellnessDB.journalEntries.where('userId').equals(userId).toArray();
  }
  return await wellnessDB.journalEntries.toArray();
}

export async function addJournalEntry(entry) {
  const id = `journal-${Date.now()}`;
  const newEntry = {
    ...entry,
    id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await wellnessDB.journalEntries.add(newEntry);
  return newEntry;
}

export async function updateJournalEntry(id, updates) {
  await updateJournalEntry(id, { ...updates, updatedAt: new Date() });
}

export async function deleteJournalEntry(id) {
  await wellnessDB.journalEntries.delete(id);
}

// Meditation Operations
export async function getMeditationSessions() {
  return await wellnessDB.meditationSessions.toArray();
}

export async function addMeditationSession(session) {
  const id = `meditation-${Date.now()}`;
  const newSession = {
    ...session,
    id,
    createdAt: new Date()
  };
  await wellnessDB.meditationSessions.add(newSession);
  return newSession;
}

export async function updateMeditationSession(id, updates) {
  await wellnessDB.meditationSessions.update(id, updates);
}

export async function deleteMeditationSession(id) {
  await wellnessDB.meditationSessions.delete(id);
}

export async function markMeditationSessionCompleted(id, completed) {
  await updateMeditationSession(id, { completed });
}

// Statistics and Analytics
export async function getWellnessStats() {
  const healthRecords = await getHealthRecords();
  const mantras = await getMantras();
  const yogaSessions = await getYogaSessions();
  const journalEntries = await getJournalEntries();
  const meditationSessions = await getMeditationSessions();

  return {
    totalHealthRecords: healthRecords.length,
    totalMantras: mantras.length,
    favoriteMantras: mantras.filter(m => m.favorite).length,
    totalYogaSessions: yogaSessions.length,
    completedYogaSessions: yogaSessions.filter(s => s.completed).length,
    totalJournalEntries: journalEntries.length,
    totalMeditationSessions: meditationSessions.length,
    completedMeditations: meditationSessions.filter(s => s.completed).length,
    avgMoodScore: journalEntries.reduce((sum, entry) => {
      const moodScores = { joyful: 5, peaceful: 4, anxious: 2, grateful: 4, tired: 2, inspired: 5, worried: 2, content: 4 };
      return sum + (moodScores[entry.mood] || 3);
    }, 0) / journalEntries.length || 0
  };
}

// Get today's wellness activities
export async function getTodaysWellnessActivities() {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const yogaSessions = await wellnessDB.yogaSessions.where('date').between(startOfDay, endOfDay).toArray();
  const meditationSessions = await wellnessDB.meditationSessions.where('date').between(startOfDay, endOfDay).toArray();

  return {
    yogaSessions,
    meditationSessions
  };
}