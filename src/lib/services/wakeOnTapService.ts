import { Capacitor } from '@capacitor/core';
import type { ProximityEvent } from './proximitySensor';
import { proximitySensor } from './proximitySensor';
import { userRole } from '$lib/stores/userRole.js';

export interface WakeEvent {
  triggeredBy: 'proximity' | 'manual';
  timestamp: number;
  userRole?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export class WakeOnTapService {
  private isInitialized = false;
  private isMonitoring = false;
  private wakeListeners: ((event: WakeEvent) => void)[] = [];
  private lastWakeTime = 0;
  private readonly WAKE_COOLDOWN = 3000; // 3 seconds between wake events

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the wake service
   */
  private async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Listen for app visibility changes (fallback for app state)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.handleAppWake('manual');
        }
      });

      // Set up proximity sensor listener
      proximitySensor.addListener((event: ProximityEvent) => {
        if (event.isNear) {
          this.handleProximityWake(event);
        }
      });

      this.isInitialized = true;
      console.log('Wake-on-tap service initialized');
    } catch (error) {
      console.error('Failed to initialize wake service:', error);
    }
  }

  /**
   * Start monitoring for wake events
   */
  async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      return;
    }

    try {
      // Start proximity sensor monitoring
      await proximitySensor.startMonitoring();

      // Request background permissions if needed
      if (Capacitor.getPlatform() === 'android') {
        await this.requestBackgroundPermissions();
      }

      this.isMonitoring = true;
      console.log('Wake-on-tap monitoring started');
    } catch (error) {
      console.error('Failed to start wake monitoring:', error);
      throw error;
    }
  }

  /**
   * Stop monitoring for wake events
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) {
      return;
    }

    proximitySensor.stopMonitoring();
    this.isMonitoring = false;
    console.log('Wake-on-tap monitoring stopped');
  }

  /**
   * Add wake event listener
   */
  addWakeListener(callback: (event: WakeEvent) => void): void {
    this.wakeListeners.push(callback);
  }

  /**
   * Remove wake event listener
   */
  removeWakeListener(callback: (event: WakeEvent) => void): void {
    const index = this.wakeListeners.indexOf(callback);
    if (index > -1) {
      this.wakeListeners.splice(index, 1);
    }
  }

  /**
   * Check if wake-on-tap is supported
   */
  isSupported(): boolean {
    return proximitySensor.isSupported();
  }

  /**
   * Get monitoring status
   */
  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }

  private async handleProximityWake(proximityEvent: ProximityEvent): Promise<void> {
    const now = Date.now();

    // Check cooldown to prevent spam
    if (now - this.lastWakeTime < this.WAKE_COOLDOWN) {
      return;
    }

    this.lastWakeTime = now;

    console.log('Proximity wake detected:', proximityEvent);

    // Get current user role
    let currentRole: string | undefined;
    try {
      console.log('Getting userRole from store:', userRole);
      console.log('userRole type:', typeof userRole);
      console.log('userRole has subscribe:', typeof userRole?.subscribe);

      if (userRole && typeof userRole.subscribe === 'function') {
        const unsubscribe = userRole.subscribe(role => {
          currentRole = role;
        });
        unsubscribe(); // Immediately unsubscribe after getting current value
      } else {
        console.error('userRole is not a valid store in wakeOnTapService:', userRole);
      }
    } catch (error) {
      console.error('Error getting userRole in wakeOnTapService:', error);
    }

    // Get location if available
    let location: { latitude: number; longitude: number } | undefined;
    try {
      if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000
          });
        });
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      }
    } catch (error) {
      console.warn('Could not get location for wake event:', error);
    }

    const wakeEvent: WakeEvent = {
      triggeredBy: 'proximity',
      timestamp: now,
      userRole: currentRole,
      location
    };

    // Notify listeners
    this.notifyWakeListeners(wakeEvent);

    // Trigger voice activation
    this.activateVoiceAssistant(wakeEvent);
  }

  private handleAppWake(triggeredBy: 'proximity' | 'manual'): void {
    const wakeEvent: WakeEvent = {
      triggeredBy,
      timestamp: Date.now()
    };

    this.notifyWakeListeners(wakeEvent);
  }

  private notifyWakeListeners(event: WakeEvent): void {
    this.wakeListeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Wake listener error:', error);
      }
    });
  }

  private async activateVoiceAssistant(wakeEvent: WakeEvent): Promise<void> {
    try {
      // Dispatch custom event to trigger voice assistant
      console.log('Activating voice assistant due to wake event:', wakeEvent);

      // Dispatch event that components can listen to
      window.dispatchEvent(new CustomEvent('wakeOnTap', { detail: wakeEvent }));

    } catch (error) {
      console.error('Failed to activate voice assistant:', error);
    }
  }

  private async requestBackgroundPermissions(): Promise<void> {
    // Request permissions needed for background execution
    // Note: This is limited by what standard apps can do

    if (Capacitor.getPlatform() === 'android') {
      try {
        // Request notification permission for background notifications
        if ('Notification' in window && Notification.permission === 'default') {
          await Notification.requestPermission();
        }

        // Note: True background execution when locked requires special permissions
        // that are typically only granted to system apps or apps with special OEM permissions
        console.log('Background permissions requested (limited by platform restrictions)');
      } catch (error) {
        console.warn('Could not request background permissions:', error);
      }
    }
  }
}

// Singleton instance
export const wakeOnTapService = new WakeOnTapService();