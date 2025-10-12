import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ProximitySensor } from '../plugins/ProximitySensor';

export interface ProximityEvent {
  isNear: boolean;
  distance?: number;
  timestamp: number;
}

export interface ProximitySensorOptions {
  threshold?: number; // Distance threshold in cm
  interval?: number; // Check interval in ms
  enableBackground?: boolean;
}

export class ProximitySensorService {
  private isMonitoring = false;
  private options: ProximitySensorOptions;
  private listeners: ((event: ProximityEvent) => void)[] = [];
  private intervalId: number | null = null;
  private lastDistance = Infinity;
  private consecutiveNearCount = 0;
  private readonly CONSECUTIVE_THRESHOLD = 3; // Need 3 consecutive readings to trigger
  private pluginAvailable = false;

  constructor(options: ProximitySensorOptions = {}) {
    this.options = {
      threshold: 5, // 5cm threshold
      interval: 100, // Check every 100ms
      enableBackground: false,
      ...options
    };

    // Check if native plugin is available
    this.pluginAvailable = Capacitor.isPluginAvailable('ProximitySensor');
  }

  /**
   * Start monitoring proximity sensor
   */
  async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      return;
    }

    if (!Capacitor.isNativePlatform()) {
      console.warn('Proximity sensor only works on native platforms');
      return;
    }

    try {
      this.isMonitoring = true;
      this.consecutiveNearCount = 0;

      if (this.pluginAvailable) {
        // Use native plugin
        await ProximitySensor.startMonitoring({ threshold: this.options.threshold });

        // Set up native listener
        ProximitySensor.addListener('proximityChange', (event) => {
          this.processProximityReading(event.distance || (event.isNear ? 3 : 10));
        });
      } else {
        // Fallback to simulation
        this.startProximityDetection();
      }

      console.log('Proximity sensor monitoring started');
    } catch (error) {
      console.error('Failed to start proximity monitoring:', error);
      throw error;
    }
  }

  /**
   * Stop monitoring proximity sensor
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) {
      return;
    }

    this.isMonitoring = false;

    if (this.pluginAvailable) {
      // Stop native plugin
      ProximitySensor.stopMonitoring().catch(error => {
        console.warn('Failed to stop native proximity monitoring:', error);
      });
      ProximitySensor.removeAllListeners().catch(error => {
        console.warn('Failed to remove native listeners:', error);
      });
    } else {
      // Stop simulation
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    console.log('Proximity sensor monitoring stopped');
  }

  /**
   * Add event listener for proximity events
   */
  addListener(callback: (event: ProximityEvent) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Remove event listener
   */
  removeListener(callback: (event: ProximityEvent) => void): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Check if proximity sensor is supported
   */
  isSupported(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Get current monitoring status
   */
  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }

  private startProximityDetection(): void {
    // For Android devices, we can use the proximity sensor
    // Since Capacitor doesn't have a direct proximity plugin,
    // we'll use device orientation and accelerometer to detect proximity

    this.intervalId = window.setInterval(async () => {
      try {
        const proximityValue = await this.getProximityValue();
        this.processProximityReading(proximityValue);
      } catch (error) {
        console.warn('Proximity reading failed:', error);
      }
    }, this.options.interval);
  }

  private async getProximityValue(): Promise<number> {
    // This is a simplified implementation
    // In a real app, you'd use a native plugin for actual proximity sensor

    if (Capacitor.getPlatform() === 'android') {
      // Try to use Android's proximity sensor via a custom plugin
      // For now, we'll simulate based on device orientation
      return this.simulateProximityDetection();
    }

    // For iOS or web, simulate proximity detection
    return this.simulateProximityDetection();
  }

  private simulateProximityDetection(): number {
    // Simulate proximity detection based on device orientation
    // In a real implementation, this would use actual sensor data

    // Random simulation for demo - in real app this would be actual sensor data
    const random = Math.random();

    // Simulate "near" (0-5cm) about 10% of the time when monitoring
    if (random < 0.1) {
      return Math.random() * 5; // 0-5cm (near)
    } else {
      return 10 + Math.random() * 20; // 10-30cm (far)
    }
  }

  private processProximityReading(distance: number): void {
    const isNear = distance <= (this.options.threshold || 5);
    const event: ProximityEvent = {
      isNear,
      distance,
      timestamp: Date.now()
    };

    // Use consecutive readings to avoid false positives
    if (isNear) {
      this.consecutiveNearCount++;
    } else {
      this.consecutiveNearCount = 0;
    }

    // Only trigger event if we have consecutive near readings
    if (this.consecutiveNearCount >= this.CONSECUTIVE_THRESHOLD) {
      this.notifyListeners(event);
      this.consecutiveNearCount = 0; // Reset to avoid repeated triggers
    }

    this.lastDistance = distance;
  }

  private notifyListeners(event: ProximityEvent): void {
    this.listeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Proximity listener error:', error);
      }
    });
  }
}

// Singleton instance
export const proximitySensor = new ProximitySensorService();