// Cloud Sync Service for Divine Nest
// Handles synchronization between local IndexedDB and cloud services

import { offlineSync } from './offlineSync.js';

class CloudSyncService {
  constructor() {
    this.apiBaseUrl = 'https://api.divinenest.app'; // Replace with actual API endpoint
    this.syncInterval = 5 * 60 * 1000; // 5 minutes
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
    this.isAuthenticated = false;
    this.userToken = null;

    this.init();
  }

  async init() {
    // Load authentication state
    this.userToken = await offlineSync.getPreference('user_token');
    this.isAuthenticated = !!this.userToken;

    // Start periodic sync if authenticated
    if (this.isAuthenticated) {
      this.startPeriodicSync();
    }

    // Listen for authentication changes
    window.addEventListener('userAuthenticated', (event) => {
      this.userToken = event.detail.token;
      this.isAuthenticated = true;
      offlineSync.savePreference('user_token', this.userToken);
      this.startPeriodicSync();
    });

    window.addEventListener('userLoggedOut', () => {
      this.userToken = null;
      this.isAuthenticated = false;
      offlineSync.savePreference('user_token', null);
      this.stopPeriodicSync();
    });
  }

  startPeriodicSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    this.syncTimer = setInterval(() => {
      if (navigator.onLine && this.isAuthenticated) {
        this.performFullSync();
      }
    }, this.syncInterval);

    // Initial sync
    if (navigator.onLine && this.isAuthenticated) {
      this.performFullSync();
    }
  }

  stopPeriodicSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  async performFullSync() {
    if (!this.isAuthenticated || offlineSync.syncInProgress) {
      return;
    }

    try {
      console.log('Starting full cloud sync...');

      // Sync household data
      await this.syncTable('household');

      // Sync tasks
      await this.syncTable('tasks');

      // Sync reminders
      await this.syncTable('reminders');

      // Sync rituals
      await this.syncTable('rituals');

      // Sync user preferences
      await this.syncUserPreferences();

      // Upload voice analytics (anonymized)
      await this.uploadVoiceAnalytics();

      console.log('Full cloud sync completed');
    } catch (error) {
      console.error('Full sync failed:', error);
    }
  }

  async syncTable(tableName) {
    try {
      // Get local changes that need to be uploaded
      const localChanges = await this.getLocalChanges(tableName);

      // Upload local changes
      if (localChanges.length > 0) {
        await this.uploadChanges(tableName, localChanges);
      }

      // Download remote changes
      const remoteChanges = await this.downloadChanges(tableName);

      // Apply remote changes locally
      if (remoteChanges.length > 0) {
        await this.applyRemoteChanges(tableName, remoteChanges);
      }

    } catch (error) {
      console.error(`Failed to sync table ${tableName}:`, error);
      throw error;
    }
  }

  async getLocalChanges(tableName) {
    // Get all records that haven't been synced
    const allRecords = await offlineSync.getAllData(tableName);
    return allRecords.filter(record => !record.synced);
  }

  async uploadChanges(tableName, changes) {
    const endpoint = `${this.apiBaseUrl}/sync/${tableName}`;

    for (const change of changes) {
      let success = false;
      let retries = 0;

      while (!success && retries < this.maxRetries) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.userToken}`
            },
            body: JSON.stringify(change)
          });

          if (response.ok) {
            // Mark as synced locally
            change.synced = true;
            await offlineSync.saveData(tableName, change);
            success = true;
          } else if (response.status === 409) {
            // Conflict - remote version is newer, skip this change
            console.warn(`Conflict detected for ${tableName} record ${change.id}`);
            success = true; // Don't retry conflicts
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (error) {
          retries++;
          if (retries < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, this.retryDelay * retries));
          }
        }
      }

      if (!success) {
        console.error(`Failed to upload change for ${tableName} after ${this.maxRetries} retries`);
      }
    }
  }

  async downloadChanges(tableName) {
    const endpoint = `${this.apiBaseUrl}/sync/${tableName}`;

    // Get last sync timestamp
    const lastSync = await offlineSync.getPreference(`last_sync_${tableName}`);
    const params = lastSync ? `?since=${encodeURIComponent(lastSync)}` : '';

    const response = await fetch(`${endpoint}${params}`, {
      headers: {
        'Authorization': `Bearer ${this.userToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to download changes: ${response.status}`);
    }

    const changes = await response.json();

    // Update last sync timestamp
    await offlineSync.savePreference(`last_sync_${tableName}`, new Date().toISOString());

    return changes;
  }

  async applyRemoteChanges(tableName, changes) {
    for (const change of changes) {
      try {
        // Check if we have a local version
        const localRecord = await offlineSync.getData(tableName, change.id);

        if (!localRecord || localRecord.updated_at < change.updated_at) {
          // Apply remote change
          change.synced = true;
          await offlineSync.saveData(tableName, change);
        }
        // If local is newer, it will be uploaded in the next sync
      } catch (error) {
        console.error(`Failed to apply remote change for ${tableName}:`, error);
      }
    }
  }

  async syncUserPreferences() {
    try {
      // Upload local preferences
      const localPrefs = await this.getAllPreferences();
      if (Object.keys(localPrefs).length > 0) {
        await this.uploadPreferences(localPrefs);
      }

      // Download remote preferences
      const remotePrefs = await this.downloadPreferences();

      // Merge preferences (remote takes precedence for conflicts)
      for (const [key, value] of Object.entries(remotePrefs)) {
        await offlineSync.savePreference(key, value);
      }

    } catch (error) {
      console.error('Failed to sync user preferences:', error);
    }
  }

  async getAllPreferences() {
    // This is a simplified version - in reality you'd need to track changed preferences
    const prefs = {};
    const preferenceKeys = [
      'theme', 'language', 'notifications', 'voice_enabled',
      'ambient_enabled', 'location_enabled', 'sync_enabled'
    ];

    for (const key of preferenceKeys) {
      const value = await offlineSync.getPreference(key);
      if (value !== null) {
        prefs[key] = value;
      }
    }

    return prefs;
  }

  async uploadPreferences(preferences) {
    const endpoint = `${this.apiBaseUrl}/sync/preferences`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userToken}`
      },
      body: JSON.stringify(preferences)
    });

    if (!response.ok) {
      throw new Error(`Failed to upload preferences: ${response.status}`);
    }
  }

  async downloadPreferences() {
    const endpoint = `${this.apiBaseUrl}/sync/preferences`;

    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${this.userToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to download preferences: ${response.status}`);
    }

    return await response.json();
  }

  async uploadVoiceAnalytics() {
    try {
      // Get recent voice commands (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      // This would require a more complex query in a real implementation
      // For now, we'll skip detailed voice analytics upload
      console.log('Voice analytics sync placeholder');
    } catch (error) {
      console.error('Failed to upload voice analytics:', error);
    }
  }

  // Manual sync trigger
  async forceSync() {
    if (!navigator.onLine) {
      throw new Error('No internet connection');
    }

    if (!this.isAuthenticated) {
      throw new Error('User not authenticated');
    }

    return await this.performFullSync();
  }

  // Get sync status
  getSyncStatus() {
    return {
      isOnline: navigator.onLine,
      isAuthenticated: this.isAuthenticated,
      syncInProgress: offlineSync.syncInProgress,
      pendingChanges: offlineSync.syncQueue.length
    };
  }

  // Emergency data export (for when cloud service is unavailable)
  async emergencyExport() {
    const data = await offlineSync.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `divine-nest-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Emergency data import
  async emergencyImport(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = JSON.parse(event.target.result);
          await offlineSync.importData(data);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
}

// Create singleton instance
export const cloudSync = new CloudSyncService();

// Export convenience functions
export const forceSync = () => cloudSync.forceSync();
export const getSyncStatus = () => cloudSync.getSyncStatus();
export const emergencyExport = () => cloudSync.emergencyExport();
export const emergencyImport = (file) => cloudSync.emergencyImport(file);