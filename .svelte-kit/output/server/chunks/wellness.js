import Dexie from "dexie";
class WellnessDB extends Dexie {
  healthRecords;
  mantras;
  yogaSessions;
  journalEntries;
  meditationSessions;
  constructor() {
    super("WellnessDB");
    this.version(1).stores({
      healthRecords: "id, userId, date, type",
      mantras: "id, name, category, language",
      yogaSessions: "id, type, date, duration, completed",
      journalEntries: "id, userId, date, mood, category",
      meditationSessions: "id, type, date, duration, completed"
    });
  }
}
new WellnessDB();
