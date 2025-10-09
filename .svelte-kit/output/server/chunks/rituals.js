import Dexie from "dexie";
class RitualsDB extends Dexie {
  rituals;
  templeTrips;
  festivals;
  poojaSchedules;
  constructor() {
    super("RitualsDB");
    this.version(1).stores({
      rituals: "id, name, type, date, completed",
      templeTrips: "id, destination, startDate, endDate, budget",
      festivals: "id, name, date, type",
      poojaSchedules: "id, ritualId, date, completed"
    });
  }
}
new RitualsDB();
