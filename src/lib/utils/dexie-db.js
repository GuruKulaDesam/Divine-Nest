import Dexie from 'dexie';

export const db = new Dexie('familywall');
db.version(1).stores({
  calendar: '++id,title,date,description,color,assigned,recurring,reminderMinutes',
  todo: '++id,text,done,dueDate,assigned,priority,isGroup,groupId,color',
  map: '++id,name,address,lat,lng',
  notes: '++id,title,body,pinned,color,createdAt,updatedAt,user,type,attachments',
  notifications: '++id,text,read,timestamp'
});

// Add members store in a new version to allow per-member colors and defaults
db.version(2).stores({
  members: '++id,name,color,isDefault'
});

// Add reminders store in version 3
db.version(3).stores({
  reminders: '++id,title,description,dueDate,dueTime,priority,type,source,color,createdAt,notificationType,phoneNumber,isActive'
});

// Use db.table(...) to avoid TypeScript/Dexie property access issues and be explicit.
export async function getAll(store) {
  return db.table(store).toArray();
}

export async function addMany(store, items) {
  // bulkAdd will create auto-increment ids for objects without id
  await db.table(store).bulkAdd(items);
}

export function table(store) {
  return db.table(store);
}
