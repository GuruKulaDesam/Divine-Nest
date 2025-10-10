import Dexie from "dexie";
class HomeDatabase extends Dexie {
  constructor() {
    super("HomeDatabase");
    this.version(1).stores({
      groceryItems: "id, name, category, inStock, marketMode",
      chores: "id, title, assignedTo, frequency, completed, dueDate",
      repairTasks: "id, issue, location, assignedTo, status, priority, createdDate",
      emergencyContacts: "id, name, type, phone, isPrimary"
    });
    this.groceryItems = this.table("groceryItems");
    this.chores = this.table("chores");
    this.repairTasks = this.table("repairTasks");
    this.emergencyContacts = this.table("emergencyContacts");
  }
}
new HomeDatabase();
