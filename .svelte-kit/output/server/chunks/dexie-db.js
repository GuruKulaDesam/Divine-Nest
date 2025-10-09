import Dexie from "dexie";
const db = new Dexie("familywall");
db.version(1).stores({
  calendar: "++id,title,date,description,color,assigned,recurring,reminderMinutes",
  todo: "++id,text,done,dueDate,assigned,priority,isGroup,groupId,color",
  map: "++id,name,address,lat,lng",
  notes: "++id,title,body,pinned,color,createdAt,updatedAt,user,type,attachments",
  notifications: "++id,text,read,timestamp"
});
db.version(2).stores({
  members: "++id,name,color,isDefault"
});
db.version(3).stores({
  reminders: "++id,title,description,dueDate,dueTime,priority,type,source,color,createdAt,notificationType,phoneNumber,isActive"
});
