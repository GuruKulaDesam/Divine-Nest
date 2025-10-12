import { registerPlugin } from '@capacitor/core';

export interface ProximitySensorPlugin {
  /**
   * Start monitoring proximity sensor
   */
  startMonitoring(options?: { threshold?: number }): Promise<{ success: boolean }>;

  /**
   * Stop monitoring proximity sensor
   */
  stopMonitoring(): Promise<{ success: boolean }>;

  /**
   * Get current proximity state
   */
  getProximityState(): Promise<{ isNear: boolean; distance?: number }>;

  /**
   * Add listener for proximity events
   */
  addListener(eventName: 'proximityChange', listenerFunc: (event: { isNear: boolean; distance?: number }) => void): Promise<PluginListenerHandle>;

  /**
   * Remove all listeners
   */
  removeAllListeners(): Promise<void>;
}

export interface PluginListenerHandle {
  remove: () => Promise<void>;
}

const ProximitySensor = registerPlugin<ProximitySensorPlugin>('ProximitySensor');

export { ProximitySensor };