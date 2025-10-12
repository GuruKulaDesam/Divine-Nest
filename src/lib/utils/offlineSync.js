// Offline Sync Engine for Divine Nest
// Handles local storage, data synchronization, and offline-first architecture

class OfflineSyncEngine {
  constructor() {
    this.dbName = 'DivineNestDB';
    this.dbVersion = 1;
    this.db = null;
    this.syncQueue = [];
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.syncInProgress = false;

    this.init();
    // Only setup event listeners in browser environment
    if (typeof window !== 'undefined') {
      this.setupEventListeners();
    }
  }

  async init() {
    try {
      this.db = await this.openDB();
      await this.createTables();
      await this.loadSyncQueue();
      console.log('Offline sync engine initialized');
    } catch (error) {
      console.error('Failed to initialize offline sync engine:', error);
    }
  }

  setupEventListeners() {
    // Only setup event listeners if window and document are available
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Online/offline detection
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Page visibility for sync on focus
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        this.syncPendingData();
      }
    });
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        this.createTables(db);
      };
    });
  }

  createTables(db = this.db) {
    // Household data table
    if (!db.objectStoreNames.contains('household')) {
      const householdStore = db.createObjectStore('household', { keyPath: 'id' });
      householdStore.createIndex('updated_at', 'updated_at', { unique: false });
    }

    // Tasks table
    if (!db.objectStoreNames.contains('tasks')) {
      const tasksStore = db.createObjectStore('tasks', { keyPath: 'id' });
      tasksStore.createIndex('user_id', 'user_id', { unique: false });
      tasksStore.createIndex('status', 'status', { unique: false });
      tasksStore.createIndex('updated_at', 'updated_at', { unique: false });
    }

    // Reminders table
    if (!db.objectStoreNames.contains('reminders')) {
      const remindersStore = db.createObjectStore('reminders', { keyPath: 'id' });
      remindersStore.createIndex('user_id', 'user_id', { unique: false });
      remindersStore.createIndex('scheduled_at', 'scheduled_at', { unique: false });
      remindersStore.createIndex('updated_at', 'updated_at', { unique: false });
    }

    // Rituals and festivals table
    if (!db.objectStoreNames.contains('rituals')) {
      const ritualsStore = db.createObjectStore('rituals', { keyPath: 'id' });
      ritualsStore.createIndex('date', 'date', { unique: false });
      ritualsStore.createIndex('type', 'type', { unique: false });
      ritualsStore.createIndex('updated_at', 'updated_at', { unique: false });
    }

    // Voice commands history
    if (!db.objectStoreNames.contains('voice_history')) {
      const voiceStore = db.createObjectStore('voice_history', { keyPath: 'id', autoIncrement: true });
      voiceStore.createIndex('timestamp', 'timestamp', { unique: false });
      voiceStore.createIndex('command', 'command', { unique: false });
    }

    // Sync queue table
    if (!db.objectStoreNames.contains('sync_queue')) {
      const syncStore = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
      syncStore.createIndex('timestamp', 'timestamp', { unique: false });
      syncStore.createIndex('operation', 'operation', { unique: false });
      syncStore.createIndex('table_name', 'table_name', { unique: false });
    }

    // User preferences and settings
    if (!db.objectStoreNames.contains('user_preferences')) {
      db.createObjectStore('user_preferences', { keyPath: 'key' });
    }
  }

  // Data operations
  async saveData(tableName, data) {
    if (!this.db) return;

    const transaction = this.db.transaction([tableName], 'readwrite');
    const store = transaction.objectStore(tableName);

    // Add metadata
    const dataWithMeta = {
      ...data,
      updated_at: new Date().toISOString(),
      synced: false
    };

    return new Promise((resolve, reject) => {
      const request = store.put(dataWithMeta);
      request.onsuccess = () => {
        this.addToSyncQueue('update', tableName, dataWithMeta);
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getData(tableName, key) {
    if (!this.db) return null;

    const transaction = this.db.transaction([tableName], 'readonly');
    const store = transaction.objectStore(tableName);

    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllData(tableName, indexName = null, indexValue = null) {
    if (!this.db) return [];

    const transaction = this.db.transaction([tableName], 'readonly');
    const store = transaction.objectStore(tableName);

    let request;
    if (indexName && indexValue !== null) {
      const index = store.index(indexName);
      request = index.getAll(indexValue);
    } else {
      request = store.getAll();
    }

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteData(tableName, key) {
    if (!this.db) return;

    const transaction = this.db.transaction([tableName], 'readwrite');
    const store = transaction.objectStore(tableName);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => {
        this.addToSyncQueue('delete', tableName, { id: key });
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Sync queue management
  async addToSyncQueue(operation, tableName, data) {
    if (!this.db) return;

    const syncItem = {
      operation,
      table_name: tableName,
      data,
      timestamp: new Date().toISOString(),
      retry_count: 0
    };

    const transaction = this.db.transaction(['sync_queue'], 'readwrite');
    const store = transaction.objectStore('sync_queue');

    return new Promise((resolve, reject) => {
      const request = store.add(syncItem);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async loadSyncQueue() {
    if (!this.db) return;

    const transaction = this.db.transaction(['sync_queue'], 'readonly');
    const store = transaction.objectStore('sync_queue');
    const index = store.index('timestamp');

    return new Promise((resolve, reject) => {
      const request = index.getAll();
      request.onsuccess = () => {
        this.syncQueue = request.result || [];
        resolve(this.syncQueue);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async syncPendingData() {
    if (!this.isOnline || this.syncInProgress || this.syncQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;

    try {
      // In a real implementation, this would sync with a cloud service
      // For now, we'll simulate sync and mark items as synced
      for (const item of this.syncQueue) {
        if (item.retry_count < 3) {
          // Simulate API call
          await this.simulateSync(item);

          // Remove from sync queue
          await this.removeFromSyncQueue(item.id);
        } else {
          // Mark as failed after max retries
          console.warn('Sync failed after max retries:', item);
        }
      }

      console.log('Data sync completed');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  async simulateSync(item) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate occasional failures
    if (Math.random() < 0.1) { // 10% failure rate
      throw new Error('Network error');
    }

    // Mark data as synced in local DB
    if (item.operation !== 'delete') {
      const transaction = this.db.transaction([item.table_name], 'readwrite');
      const store = transaction.objectStore(item.table_name);

      const data = { ...item.data, synced: true };
      await new Promise((resolve, reject) => {
        const request = store.put(data);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }

  async removeFromSyncQueue(id) {
    if (!this.db) return;

    const transaction = this.db.transaction(['sync_queue'], 'readwrite');
    const store = transaction.objectStore('sync_queue');

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // User preferences
  async savePreference(key, value) {
    if (!this.db) return;

    const transaction = this.db.transaction(['user_preferences'], 'readwrite');
    const store = transaction.objectStore('user_preferences');

    return new Promise((resolve, reject) => {
      const request = store.put({ key, value, updated_at: new Date().toISOString() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getPreference(key) {
    if (!this.db) return null;

    const transaction = this.db.transaction(['user_preferences'], 'readonly');
    const store = transaction.objectStore('user_preferences');

    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value || null);
      request.onerror = () => reject(request.error);
    });
  }

  // Voice history for analytics
  async saveVoiceCommand(command, transcript, success = true) {
    if (!this.db) return;

    const voiceData = {
      command,
      transcript,
      success,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    };

    const transaction = this.db.transaction(['voice_history'], 'readwrite');
    const store = transaction.objectStore('voice_history');

    return new Promise((resolve, reject) => {
      const request = store.add(voiceData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Utility methods
  getStorageUsage() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate();
    }
    return Promise.resolve({ usage: 0, quota: 0 });
  }

  async clearOldData(daysOld = 30) {
    if (!this.db) return;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const cutoffISO = cutoffDate.toISOString();

    // Clear old voice history
    const transaction = this.db.transaction(['voice_history'], 'readwrite');
    const store = transaction.objectStore('voice_history');
    const index = store.index('timestamp');

    const request = index.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.value.timestamp < cutoffISO) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  }

  // Export data for backup
  async exportData() {
    if (!this.db) return null;

    const tables = ['household', 'tasks', 'reminders', 'rituals', 'user_preferences'];
    const exportData = {
      version: this.dbVersion,
      exportDate: new Date().toISOString(),
      data: {}
    };

    for (const table of tables) {
      try {
        exportData.data[table] = await this.getAllData(table);
      } catch (error) {
        console.warn(`Failed to export ${table}:`, error);
      }
    }

    return exportData;
  }

  // Import data from backup
  async importData(importData) {
    if (!this.db || !importData.data) return;

    for (const [tableName, records] of Object.entries(importData.data)) {
      for (const record of records) {
        try {
          await this.saveData(tableName, record);
        } catch (error) {
          console.warn(`Failed to import record to ${tableName}:`, error);
        }
      }
    }
  }
}

// Create singleton instance only in browser environment
let offlineSyncInstance = null;

const getOfflineSyncInstance = () => {
  if (typeof window === 'undefined') {
    // Return a mock object for SSR
    return {
      saveData: () => Promise.resolve(),
      getData: () => Promise.resolve(null),
      getAllData: () => Promise.resolve([]),
      deleteData: () => Promise.resolve(),
      savePreference: () => Promise.resolve(),
      getPreference: () => Promise.resolve(null),
      syncPendingData: () => Promise.resolve(),
      exportData: () => Promise.resolve({}),
      importData: () => Promise.resolve(),
      clearAllData: () => Promise.resolve()
    };
  }

  if (!offlineSyncInstance) {
    offlineSyncInstance = new OfflineSyncEngine();
  }
  return offlineSyncInstance;
};

export const offlineSync = getOfflineSyncInstance();

// Export convenience functions
export const saveToOffline = (table, data) => getOfflineSyncInstance().saveData(table, data);
export const getFromOffline = (table, key) => getOfflineSyncInstance().getData(table, key);
export const getAllFromOffline = (table, index, value) => getOfflineSyncInstance().getAllData(table, index, value);
export const deleteFromOffline = (table, key) => getOfflineSyncInstance().deleteData(table, key);
export const savePreference = (key, value) => getOfflineSyncInstance().savePreference(key, value);
export const getPreference = (key) => getOfflineSyncInstance().getPreference(key);