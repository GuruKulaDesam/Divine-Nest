import { Capacitor } from '@capacitor/core';

// Simple encryption/decryption utilities for sensitive data
class SecureStorage {
  private static instance: SecureStorage;
  private encryptionKey: string;

  private constructor() {
    // Use a simple key for demo purposes - in production, use proper key management
    this.encryptionKey = 'divine-nest-secure-key-2024';
  }

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // Simple XOR encryption for demo - use proper encryption in production
  private encrypt(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
    }
    return btoa(result); // Base64 encode
  }

  private decrypt(encryptedText: string): string {
    try {
      const decoded = atob(encryptedText); // Base64 decode
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
      }
      return result;
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  }

  // Secure set item with optional encryption
  setItem(key: string, value: any, encrypt: boolean = false): void {
    try {
      const dataToStore = typeof value === 'string' ? value : JSON.stringify(value);
      const finalData = encrypt ? this.encrypt(dataToStore) : dataToStore;

      if (Capacitor.isNativePlatform()) {
        // On mobile, prefer secure storage if available
        // For now, fall back to localStorage but mark as needing secure storage
        console.warn(`Storing sensitive data on mobile without encryption. Consider using SecureStorage plugin for key: ${key}`);
      }

      localStorage.setItem(key, finalData);
    } catch (error) {
      console.error(`Failed to store item ${key}:`, error);
    }
  }

  // Secure get item with optional decryption
  getItem(key: string, decrypt: boolean = false): any {
    try {
      const storedData = localStorage.getItem(key);
      if (!storedData) return null;

      const data = decrypt ? this.decrypt(storedData) : storedData;

      // Try to parse as JSON, return as string if fails
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    } catch (error) {
      console.error(`Failed to retrieve item ${key}:`, error);
      return null;
    }
  }

  // Remove item
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error);
    }
  }

  // Clear all items
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  // Check if storage is available
  isAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}

// Storage categories for different data types
export const StorageKeys = {
  // Non-sensitive preferences
  LANGUAGE: 'language',
  THEME: 'theme',
  BACKGROUND: 'background',
  NOTIFICATION_PREFERENCES: 'notificationPreferences',

  // Sensitive data (should be encrypted)
  AUTH_USER: 'auth_user',
  AMBIENT_LOGS: 'ambientLogs',

  // App state
  LAYOUT_PREFERENCE: 'layout_preference',
} as const;

// Export singleton instance
export const secureStorage = SecureStorage.getInstance();

// Convenience functions for different data types
export const storageUtils = {
  // Non-sensitive data
  setPreference: (key: string, value: any) => secureStorage.setItem(key, value, false),
  getPreference: (key: string) => secureStorage.getItem(key, false),

  // Sensitive data
  setSensitive: (key: string, value: any) => secureStorage.setItem(key, value, true),
  getSensitive: (key: string) => secureStorage.getItem(key, true),

  // Clear all data
  clearAll: () => secureStorage.clear(),

  // Check storage health
  isHealthy: () => secureStorage.isAvailable(),
};