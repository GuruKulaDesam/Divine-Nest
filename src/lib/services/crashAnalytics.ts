import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
import { Capacitor } from '@capacitor/core';

export class CrashAnalytics {
  private static instance: CrashAnalytics;

  private constructor() {}

  static getInstance(): CrashAnalytics {
    if (!CrashAnalytics.instance) {
      CrashAnalytics.instance = new CrashAnalytics();
    }
    return CrashAnalytics.instance;
  }

  async initialize() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Crashlytics only available on native platforms');
      return;
    }

    try {
      // Crashlytics is automatically initialized on native platforms
      console.log('Crashlytics initialized');
    } catch (error) {
      console.error('Failed to initialize Crashlytics:', error);
    }
  }

  async logError(error: Error, context?: Record<string, any>) {
    if (!Capacitor.isNativePlatform()) return;

    try {
      // Log custom error
      await FirebaseCrashlytics.recordException({
        message: error.message
      });

      // Add custom keys for context
      if (context) {
        for (const [key, value] of Object.entries(context)) {
          await FirebaseCrashlytics.setCustomKey({
            key,
            type: 'string',
            value: String(value)
          });
        }
      }
    } catch (err) {
      console.error('Failed to log error to Crashlytics:', err);
    }
  }

  async logMessage(message: string, level: 'debug' | 'info' | 'warning' | 'error' = 'info') {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await FirebaseCrashlytics.log({
        message: `[${level.toUpperCase()}] ${message}`
      });
    } catch (err) {
      console.error('Failed to log message to Crashlytics:', err);
    }
  }

  async setUserId(userId: string) {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await FirebaseCrashlytics.setUserId({ userId });
    } catch (err) {
      console.error('Failed to set user ID in Crashlytics:', err);
    }
  }

  async setCustomKey(key: string, value: string | number | boolean) {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await FirebaseCrashlytics.setCustomKey({
        key,
        type: 'string',
        value: String(value)
      });
    } catch (err) {
      console.error('Failed to set custom key in Crashlytics:', err);
    }
  }
}

// Global error handler
export function setupGlobalErrorHandler() {
  const crashAnalytics = CrashAnalytics.getInstance();

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    crashAnalytics.logError(new Error(`Unhandled promise rejection: ${event.reason}`), {
      type: 'unhandledrejection',
      reason: event.reason
    });
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    crashAnalytics.logError(new Error(event.message), {
      type: 'uncaughterror',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  // Handle Svelte component errors (if available)
  if (window.addEventListener) {
    window.addEventListener('svelte:error', (event: any) => {
      crashAnalytics.logError(event.detail.error, {
        type: 'svelte-error',
        component: event.detail.component?.name || 'unknown'
      });
    });
  }
}

// Export singleton instance
export const crashAnalytics = CrashAnalytics.getInstance();