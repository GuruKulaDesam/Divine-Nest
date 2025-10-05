import Dexie from 'dexie';

// LifeFlow Database for Emotional Intelligence & Family Governance
export const lifeflowDB = new Dexie('LifeFlowDB');

lifeflowDB.version(1).stores({
  // Emotional Health tracking
  emotions: '++id, date, emotion, intensity, context, notes, timestamp',
  emotionalPatterns: '++id, pattern, frequency, triggers, copingStrategies, lastUpdated',

  // Legacy Memory - preserving family stories and wisdom
  familyStories: '++id, title, storyteller, content, category, tags, dateRecorded, importance',
  wisdomLessons: '++id, lesson, source, context, application, dateLearned, category',
  familyValues: '++id, value, description, examples, importance, lastReviewed',

  // Life Transitions - major life events and changes
  lifeEvents: '++id, eventType, person, date, description, impact, lessons, status',
  transitions: '++id, transitionType, stage, challenges, supportNeeded, progress, completionDate',

  // Family Governance - decision making and family rules
  familyDecisions: '++id, decision, proposer, dateProposed, status, outcome, impact',
  familyRules: '++id, rule, category, importance, enforcement, lastReviewed, exceptions',
  governanceMeetings: '++id, date, agenda, attendees, decisions, actionItems, nextMeeting'
});

// Initialize database
export async function initLifeFlowDB() {
  try {
    await lifeflowDB.open();
    console.log('LifeFlow database initialized successfully');

    // Seed with sample data if empty
    const emotionCount = await lifeflowDB.emotions.count();
    if (emotionCount === 0) {
      await seedLifeFlowData();
    }
  } catch (error) {
    console.error('Failed to initialize LifeFlow database:', error);
  }
}

// Sample data for LifeFlow
async function seedLifeFlowData() {
  try {
    // Sample emotions
    await lifeflowDB.emotions.bulkAdd([
      {
        date: new Date().toISOString().split('T')[0],
        emotion: 'Gratitude',
        intensity: 8,
        context: 'Family gathering',
        notes: 'Feeling blessed to have such wonderful family',
        timestamp: new Date().toISOString()
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        emotion: 'Joy',
        intensity: 9,
        context: 'Achievement celebration',
        notes: 'Proud of my accomplishments',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      }
    ]);

    // Sample family stories
    await lifeflowDB.familyStories.bulkAdd([
      {
        title: 'Grandfather\'s Journey to Independence',
        storyteller: 'Grandfather',
        content: 'During the freedom struggle, our family played a small but important role...',
        category: 'Historical',
        tags: ['freedom', 'courage', 'family legacy'],
        dateRecorded: new Date(Date.now() - 31536000000).toISOString(),
        importance: 'High'
      },
      {
        title: 'Mother\'s Recipe Wisdom',
        storyteller: 'Mother',
        content: 'The secret to perfect dosa is not just the batter, but the love you put into making it...',
        category: 'Culinary',
        tags: ['tradition', 'wisdom', 'cooking'],
        dateRecorded: new Date(Date.now() - 15768000000).toISOString(),
        importance: 'Medium'
      }
    ]);

    // Sample family values
    await lifeflowDB.familyValues.bulkAdd([
      {
        value: 'Respect for Elders',
        description: 'Always show respect and care for our elders',
        examples: ['Touching feet', 'Seeking blessings', 'Caring for elderly family members'],
        importance: 'High',
        lastReviewed: new Date().toISOString()
      },
      {
        value: 'Education First',
        description: 'Prioritize education and continuous learning',
        examples: ['Regular study time', 'Supporting higher education', 'Knowledge sharing'],
        importance: 'High',
        lastReviewed: new Date().toISOString()
      }
    ]);

    // Sample life events
    await lifeflowDB.lifeEvents.bulkAdd([
      {
        eventType: 'Graduation',
        person: 'Daughter',
        date: new Date(Date.now() - 2592000000).toISOString(),
        description: 'Completed engineering degree with distinction',
        impact: 'Positive milestone for family pride',
        lessons: 'Hard work and dedication pay off',
        status: 'Completed'
      }
    ]);

    console.log('LifeFlow sample data seeded successfully');
  } catch (error) {
    console.error('Failed to seed LifeFlow data:', error);
  }
}

// Export database tables for components
export const {
  emotions,
  emotionalPatterns,
  familyStories,
  wisdomLessons,
  familyValues,
  lifeEvents,
  transitions,
  familyDecisions,
  familyRules,
  governanceMeetings
} = lifeflowDB;