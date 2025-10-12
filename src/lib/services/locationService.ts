import { Geolocation } from '@capacitor/geolocation';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface LocationPermissions {
  location: 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';
  coarseLocation: 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';
}

export class LocationService {
  private static instance: LocationService;
  private currentLocation: LocationData | null = null;
  private locationWatchId: string | null = null;

  private constructor() {}

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async checkPermissions(): Promise<LocationPermissions> {
    try {
      const permissions = await Geolocation.checkPermissions();
      return {
        location: permissions.location,
        coarseLocation: permissions.coarseLocation
      };
    } catch (error) {
      console.error('Error checking location permissions:', error);
      return {
        location: 'denied',
        coarseLocation: 'denied'
      };
    }
  }

  async requestPermissions(): Promise<LocationPermissions> {
    try {
      const permissions = await Geolocation.requestPermissions();
      return {
        location: permissions.location,
        coarseLocation: permissions.coarseLocation
      };
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return {
        location: 'denied',
        coarseLocation: 'denied'
      };
    }
  }

  async getCurrentLocation(options?: {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
  }): Promise<LocationData> {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: options?.enableHighAccuracy ?? true,
        timeout: options?.timeout ?? 10000,
        maximumAge: options?.maximumAge ?? 300000 // 5 minutes
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      };

      this.currentLocation = locationData;
      return locationData;
    } catch (error) {
      console.error('Error getting current location:', error);
      throw error;
    }
  }

  async startLocationTracking(options?: {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
  }): Promise<void> {
    try {
      this.locationWatchId = await Geolocation.watchPosition({
        enableHighAccuracy: options?.enableHighAccuracy ?? true,
        timeout: options?.timeout ?? 10000,
        maximumAge: options?.maximumAge ?? 300000
      }, (position, error) => {
        if (error) {
          console.error('Location tracking error:', error);
          return;
        }

        if (position) {
          this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };

          // Emit location update event
          this.emitLocationUpdate(this.currentLocation);
        }
      });
    } catch (error) {
      console.error('Error starting location tracking:', error);
      throw error;
    }
  }

  stopLocationTracking(): void {
    if (this.locationWatchId) {
      Geolocation.clearWatch({ id: this.locationWatchId });
      this.locationWatchId = null;
    }
  }

  getLastKnownLocation(): LocationData | null {
    return this.currentLocation;
  }

  private emitLocationUpdate(location: LocationData): void {
    // Dispatch custom event for location updates
    const event = new CustomEvent('locationUpdate', {
      detail: location
    });
    window.dispatchEvent(event);
  }

  // Reverse geocoding (basic implementation - in production, use a geocoding service)
  async reverseGeocode(latitude: number, longitude: number): Promise<Partial<LocationData>> {
    try {
      // This is a placeholder - in production, integrate with a geocoding service
      // like Google Maps Geocoding API, OpenStreetMap Nominatim, etc.
      return {
        latitude,
        longitude,
        // Mock data - replace with actual geocoding service
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        country: 'India',
        postalCode: '641001'
      };
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return { latitude, longitude };
    }
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export const locationService = LocationService.getInstance();