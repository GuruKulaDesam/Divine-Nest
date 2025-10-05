// Simple IndexedDB utility using idb
import { openDB } from 'idb';

export async function getDB() {
  return openDB('familywall', 1, {
    upgrade(db) {
      db.createObjectStore('calendar', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('todo', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('map', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
    }
  });
}

export async function getAll(store) {
  const db = await getDB();
  return db.getAll(store);
}

export async function addMany(store, items) {
  const db = await getDB();
  const tx = db.transaction(store, 'readwrite');
  for (const item of items) {
    await tx.store.add(item);
  }
  await tx.done;
}
