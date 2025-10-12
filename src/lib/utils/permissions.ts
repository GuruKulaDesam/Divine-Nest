import { Capacitor } from '@capacitor/core';
import { crashAnalytics } from '../services/crashAnalytics';

export enum PermissionType {
  CAMERA = 'camera',
  MICROPHONE = 'microphone',
  LOCATION = 'location',
  NOTIFICATIONS = 'notifications',
  CONTACTS = 'contacts',
  STORAGE = 'storage',
  PHONE = 'phone'
}

export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  PROMPT = 'prompt',
  RESTRICTED = 'restricted',
  UNAVAILABLE = 'unavailable'
}

export interface PermissionResult {
  type: PermissionType;
  status: PermissionStatus;
  message?: string;
}

class PermissionManager {
  private static instance: PermissionManager;

  private constructor() {}

  static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  // Check if we're on a native platform
  private isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  // Request camera permission
  async requestCamera(): Promise<PermissionResult> {
    if (!this.isNative()) {
      return {
        type: PermissionType.CAMERA,
        status: PermissionStatus.GRANTED,
        message: 'Camera access granted on web'
      };
    }

    try {
      // Check current permission status
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });

      if (result.state === 'granted') {
        return {
          type: PermissionType.CAMERA,
          status: PermissionStatus.GRANTED
        };
      }

      if (result.state === 'denied') {
        return {
          type: PermissionType.CAMERA,
          status: PermissionStatus.DENIED,
          message: 'Camera permission was denied. Please enable it in settings.'
        };
      }

      // Request permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately

      return {
        type: PermissionType.CAMERA,
        status: PermissionStatus.GRANTED
      };
    } catch (error) {
      crashAnalytics.logError(error as Error, { permission: PermissionType.CAMERA });
      return {
        type: PermissionType.CAMERA,
        status: PermissionStatus.DENIED,
        message: 'Failed to request camera permission'
      };
    }
  }

  // Request microphone permission
  async requestMicrophone(): Promise<PermissionResult> {
    if (!this.isNative()) {
      return {
        type: PermissionType.MICROPHONE,
        status: PermissionStatus.GRANTED,
        message: 'Microphone access granted on web'
      };
    }

    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });

      if (result.state === 'granted') {
        return {
          type: PermissionType.MICROPHONE,
          status: PermissionStatus.GRANTED
        };
      }

      if (result.state === 'denied') {
        return {
          type: PermissionType.MICROPHONE,
          status: PermissionStatus.DENIED,
          message: 'Microphone permission was denied. Please enable it in settings.'
        };
      }

      // Request permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately

      return {
        type: PermissionType.MICROPHONE,
        status: PermissionStatus.GRANTED
      };
    } catch (error) {
      crashAnalytics.logError(error as Error, { permission: PermissionType.MICROPHONE });
      return {
        type: PermissionType.MICROPHONE,
        status: PermissionStatus.DENIED,
        message: 'Failed to request microphone permission'
      };
    }
  }

  // Request location permission
  async requestLocation(): Promise<PermissionResult> {
    if (!this.isNative()) {
      return {
        type: PermissionType.LOCATION,
        status: PermissionStatus.GRANTED,
        message: 'Location access granted on web'
      };
    }

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({
          type: PermissionType.LOCATION,
          status: PermissionStatus.UNAVAILABLE,
          message: 'Geolocation is not supported'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          resolve({
            type: PermissionType.LOCATION,
            status: PermissionStatus.GRANTED
          });
        },
        (error) => {
          let status = PermissionStatus.DENIED;
          let message = 'Location permission denied';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              status = PermissionStatus.DENIED;
              message = 'Location permission was denied. Please enable it in settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              status = PermissionStatus.UNAVAILABLE;
              message = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              status = PermissionStatus.DENIED;
              message = 'Location request timed out.';
              break;
          }

          crashAnalytics.logError(new Error(message), { permission: PermissionType.LOCATION, errorCode: error.code });
          resolve({
            type: PermissionType.LOCATION,
            status,
            message
          });
        },
        { timeout: 10000 }
      );
    });
  }

  // Request notification permission
  async requestNotifications(): Promise<PermissionResult> {
    if (!this.isNative()) {
      try {
        const result = await Notification.requestPermission();
        return {
          type: PermissionType.NOTIFICATIONS,
          status: result === 'granted' ? PermissionStatus.GRANTED : PermissionStatus.DENIED,
          message: result === 'granted' ? undefined : 'Notification permission was denied'
        };
      } catch (error) {
        return {
          type: PermissionType.NOTIFICATIONS,
          status: PermissionStatus.UNAVAILABLE,
          message: 'Notifications not supported'
        };
      }
    }

    // On native platforms, notifications are handled differently
    // This would need platform-specific plugins
    return {
      type: PermissionType.NOTIFICATIONS,
      status: PermissionStatus.UNAVAILABLE,
      message: 'Notification permissions require platform-specific handling'
    };
  }

  // Check permission status without requesting
  async checkPermission(type: PermissionType): Promise<PermissionResult> {
    switch (type) {
      case PermissionType.CAMERA:
        return this.checkCameraPermission();
      case PermissionType.MICROPHONE:
        return this.checkMicrophonePermission();
      case PermissionType.LOCATION:
        return this.checkLocationPermission();
      case PermissionType.NOTIFICATIONS:
        return this.checkNotificationPermission();
      default:
        return {
          type,
          status: PermissionStatus.UNAVAILABLE,
          message: `Permission type ${type} not supported`
        };
    }
  }

  private async checkCameraPermission(): Promise<PermissionResult> {
    if (!this.isNative()) {
      return { type: PermissionType.CAMERA, status: PermissionStatus.GRANTED };
    }

    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      return {
        type: PermissionType.CAMERA,
        status: this.mapPermissionState(result.state)
      };
    } catch {
      return { type: PermissionType.CAMERA, status: PermissionStatus.UNAVAILABLE };
    }
  }

  private async checkMicrophonePermission(): Promise<PermissionResult> {
    if (!this.isNative()) {
      return { type: PermissionType.MICROPHONE, status: PermissionStatus.GRANTED };
    }

    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return {
        type: PermissionType.MICROPHONE,
        status: this.mapPermissionState(result.state)
      };
    } catch {
      return { type: PermissionType.MICROPHONE, status: PermissionStatus.UNAVAILABLE };
    }
  }

  private async checkLocationPermission(): Promise<PermissionResult> {
    if (!this.isNative()) {
      return { type: PermissionType.LOCATION, status: PermissionStatus.GRANTED };
    }

    if (!navigator.geolocation) {
      return { type: PermissionType.LOCATION, status: PermissionStatus.UNAVAILABLE };
    }

    return { type: PermissionType.LOCATION, status: PermissionStatus.PROMPT };
  }

  private async checkNotificationPermission(): Promise<PermissionResult> {
    if (!this.isNative()) {
      const permission = Notification.permission;
      return {
        type: PermissionType.NOTIFICATIONS,
        status: permission === 'granted' ? PermissionStatus.GRANTED :
               permission === 'denied' ? PermissionStatus.DENIED :
               PermissionStatus.PROMPT
      };
    }

    return { type: PermissionType.NOTIFICATIONS, status: PermissionStatus.UNAVAILABLE };
  }

  private mapPermissionState(state: string): PermissionStatus {
    switch (state) {
      case 'granted': return PermissionStatus.GRANTED;
      case 'denied': return PermissionStatus.DENIED;
      case 'prompt': return PermissionStatus.PROMPT;
      default: return PermissionStatus.UNAVAILABLE;
    }
  }

  // Request multiple permissions at once
  async requestMultiple(types: PermissionType[]): Promise<PermissionResult[]> {
    const results: PermissionResult[] = [];

    for (const type of types) {
      const result = await this.requestPermission(type);
      results.push(result);
    }

    return results;
  }

  // Main permission request method
  async requestPermission(type: PermissionType): Promise<PermissionResult> {
    crashAnalytics.logMessage(`Requesting permission: ${type}`, 'info');

    switch (type) {
      case PermissionType.CAMERA:
        return this.requestCamera();
      case PermissionType.MICROPHONE:
        return this.requestMicrophone();
      case PermissionType.LOCATION:
        return this.requestLocation();
      case PermissionType.NOTIFICATIONS:
        return this.requestNotifications();
      default:
        return {
          type,
          status: PermissionStatus.UNAVAILABLE,
          message: `Permission type ${type} not yet implemented`
        };
    }
  }
}

// Export singleton instance
export const permissionManager = PermissionManager.getInstance();

// Convenience functions
export const requestPermissions = {
  camera: () => permissionManager.requestPermission(PermissionType.CAMERA),
  microphone: () => permissionManager.requestPermission(PermissionType.MICROPHONE),
  location: () => permissionManager.requestPermission(PermissionType.LOCATION),
  notifications: () => permissionManager.requestPermission(PermissionType.NOTIFICATIONS),
};