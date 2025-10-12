// Offline Sync Service for Divine Nest
// Handles local data storage and synchronization queue management

class OfflineSyncService {
  constructor() {
    this.dbName = 'DivineNestDB';
    this.dbVersion = 1;
    this.db = null;
    this.syncInProgress = false;
    this.syncQueue = [];
    this.init();
  }

  async init() {
    try {
      this.db = await this.openDB();
      console.log('Offline sync database initialized');
    } catch (error) {
      console.error('Failed to initialize offline sync database:', error);
    }
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores for different data types
        const stores = [
          'members', 'expenses', 'finances', 'health', 'education',
          'assets', 'vehicles', 'property', 'travel', 'memories',
          'recipes', 'pantry', 'meals', 'issues', 'settings'
        ];

        stores.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: 'id' });
            store.createIndex('updated_at', 'updated_at', { unique: false });
            store.createIndex('sync_status', 'sync_status', { unique: false });
          }
        });

        // Preferences store
        if (!db.objectStoreNames.contains('preferences')) {
          db.createObjectStore('preferences');
        }

        // Sync queue store
        if (!db.objectStoreNames.contains('sync_queue')) {
          const syncStore = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('table_name', 'table_name', { unique: false });
          syncStore.createIndex('operation', 'operation', { unique: false });
        }
      };
    });
  }

  async getPreference(key) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['preferences'], 'readonly');
      const store = transaction.objectStore('preferences');
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async savePreference(key, value) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['preferences'], 'readwrite');
      const store = transaction.objectStore('preferences');
      const request = store.put(value, key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAllData(tableName) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([tableName], 'readonly');
      const store = transaction.objectStore(tableName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async getData(tableName, id) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([tableName], 'readonly');
      const store = transaction.objectStore(tableName);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async saveData(tableName, data) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([tableName], 'readwrite');
      const store = transaction.objectStore(tableName);

      // Add sync metadata
      const record = {
        ...data,
        updated_at: new Date().toISOString(),
        sync_status: 'pending'
      };

      const request = store.put(record);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addToSyncQueue(tableName, operation, data) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['sync_queue'], 'readwrite');
      const store = transaction.objectStore('sync_queue');

      const queueItem = {
        table_name: tableName,
        operation: operation, // 'create', 'update', 'delete'
        data: data,
        timestamp: new Date().toISOString(),
        retry_count: 0
      };

      const request = store.add(queueItem);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.syncQueue.push(queueItem);
        resolve(request.result);
      };
    });
  }

  async exportData() {
    if (!this.db) await this.init();

    const exportData = {
      version: this.dbVersion,
      timestamp: new Date().toISOString(),
      data: {}
    };

    const stores = Array.from(this.db.objectStoreNames);

    for (const storeName of stores) {
      if (storeName !== 'sync_queue') { // Don't export sync queue
        exportData.data[storeName] = await this.getAllData(storeName);
      }
    }

    return exportData;
  }

  async importData(importData) {
    if (!this.db) await this.init();

    const transaction = this.db.transaction(Array.from(this.db.objectStoreNames), 'readwrite');

    for (const [storeName, records] of Object.entries(importData.data)) {
      if (this.db.objectStoreNames.contains(storeName)) {
        const store = transaction.objectStore(storeName);

        for (const record of records) {
          store.put(record);
        }
      }
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async clearAllData() {
    if (!this.db) await this.init();

    const stores = Array.from(this.db.objectStoreNames);

    for (const storeName of stores) {
      if (storeName !== 'preferences') { // Keep preferences
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.clear();
      }
    }
  }
}

export const offlineSync = new OfflineSyncService();