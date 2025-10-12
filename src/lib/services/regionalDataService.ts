import type { LocationData } from './locationService';

export interface RegionalService {
  id: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  description?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  isVerified?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  category: 'police' | 'fire' | 'ambulance' | 'hospital' | 'women_helpline' | 'child_helpline' | 'disaster_management';
  phone: string;
  description?: string;
  isEmergency?: boolean;
}

export interface ShoppingCenter {
  id: string;
  name: string;
  type: 'mall' | 'market' | 'supermarket' | 'local_store';
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  specialties?: string[];
  rating?: number;
}

export interface RegionalData {
  state: string;
  district: string;
  city: string;
  services: RegionalService[];
  emergencyContacts: EmergencyContact[];
  shoppingCenters: ShoppingCenter[];
  culturalInfo: {
    festivals: string[];
    localCuisine: string[];
    traditionalWear: string[];
  };
  lastUpdated: Date;
}

export class RegionalDataService {
  private static instance: RegionalDataService;
  private regionalData: Map<string, RegionalData> = new Map();
  private currentRegion: string | null = null;

  private constructor() {
    this.initializeRegionalData();
  }

  static getInstance(): RegionalDataService {
    if (!RegionalDataService.instance) {
      RegionalDataService.instance = new RegionalDataService();
    }
    return RegionalDataService.instance;
  }

  private initializeRegionalData() {
    // Tamil Nadu - Coimbatore/Kovaipudur region
    const tamilNaduData: RegionalData = {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      city: 'Kovaipudur',
      services: [
        {
          id: '1',
          name: 'Sri Ramakrishna Hospital',
          category: 'Healthcare',
          phone: '+91-422-2211111',
          address: '395, Sarojini Naidu Road, Sidhapudur, Coimbatore',
          description: 'Multi-specialty hospital with emergency services',
          coordinates: { latitude: 11.0168, longitude: 76.9558 },
          rating: 4.2,
          isVerified: true
        },
        {
          id: '2',
          name: 'KG Hospital',
          category: 'Healthcare',
          phone: '+91-422-2212121',
          address: '5, Government Arts College Road, Coimbatore',
          description: 'Leading healthcare provider in Coimbatore',
          coordinates: { latitude: 11.0183, longitude: 76.9725 },
          rating: 4.5,
          isVerified: true
        },
        {
          id: '3',
          name: 'City Union Bank ATM',
          category: 'Banking',
          phone: '1800-258-2485',
          address: 'Near Kovaipudur Bus Stand, Coimbatore',
          description: '24/7 ATM services',
          coordinates: { latitude: 11.0123, longitude: 76.9534 },
          rating: 4.0,
          isVerified: true
        },
        {
          id: '4',
          name: 'Indian Oil Petrol Pump',
          category: 'Fuel',
          phone: '+91-422-2601234',
          address: 'Avinashi Road, Kovaipudur, Coimbatore',
          description: 'Fuel station with convenience store',
          coordinates: { latitude: 11.0105, longitude: 76.9512 },
          rating: 3.8,
          isVerified: true
        }
      ],
      emergencyContacts: [
        {
          id: 'police',
          name: 'Kovaipudur Police Station',
          category: 'police',
          phone: '100',
          description: 'Local police emergency services',
          isEmergency: true
        },
        {
          id: 'fire',
          name: 'Fire Service',
          category: 'fire',
          phone: '101',
          description: 'Fire emergency services',
          isEmergency: true
        },
        {
          id: 'ambulance',
          name: 'Ambulance Service',
          category: 'ambulance',
          phone: '108',
          description: 'Medical emergency ambulance',
          isEmergency: true
        },
        {
          id: 'women_helpline',
          name: 'Women Helpline',
          category: 'women_helpline',
          phone: '1091',
          description: '24/7 support for women in distress',
          isEmergency: true
        },
        {
          id: 'child_helpline',
          name: 'Child Helpline',
          category: 'child_helpline',
          phone: '1098',
          description: 'Support for children in need',
          isEmergency: true
        }
      ],
      shoppingCenters: [
        {
          id: '1',
          name: 'Prozone Mall',
          type: 'mall',
          address: 'Saravanampatti, Coimbatore',
          coordinates: { latitude: 11.0783, longitude: 77.0036 },
          specialties: ['Fashion', 'Electronics', 'Food Court'],
          rating: 4.3
        },
        {
          id: '2',
          name: 'Brookefields Mall',
          type: 'mall',
          address: 'RS Puram, Coimbatore',
          coordinates: { latitude: 11.0104, longitude: 76.9516 },
          specialties: ['Shopping', 'Entertainment', 'Dining'],
          rating: 4.5
        },
        {
          id: '3',
          name: 'Kovaipudur Vegetable Market',
          type: 'market',
          address: 'Kovaipudur Main Road, Coimbatore',
          coordinates: { latitude: 11.0112, longitude: 76.9528 },
          specialties: ['Fresh Vegetables', 'Fruits', 'Local Produce'],
          rating: 4.0
        }
      ],
      culturalInfo: {
        festivals: ['Pongal', 'Deepavali', 'Thai Poosam', 'Aadi Perukku'],
        localCuisine: ['Dosa', 'Idli', 'Sambar', 'Rasam', 'Biryani', 'Chettinad Curry'],
        traditionalWear: ['Sari', 'Salwar Kameez', 'Dhoti', 'Angavastram']
      },
      lastUpdated: new Date()
    };

    this.regionalData.set('tamil-nadu-coimbatore', tamilNaduData);

    // Add more regions as needed
    // Karnataka - Bangalore
    const karnatakaData: RegionalData = {
      state: 'Karnataka',
      district: 'Bangalore Rural',
      city: 'Bangalore',
      services: [
        {
          id: '1',
          name: 'Manipal Hospital',
          category: 'Healthcare',
          phone: '+91-80-25024444',
          address: '98, HAL Airport Road, Bangalore',
          description: 'Multi-specialty hospital',
          coordinates: { latitude: 12.9592, longitude: 77.6974 },
          rating: 4.4,
          isVerified: true
        }
      ],
      emergencyContacts: [
        {
          id: 'police',
          name: 'Bangalore Police',
          category: 'police',
          phone: '100',
          isEmergency: true
        },
        {
          id: 'fire',
          name: 'Fire Service',
          category: 'fire',
          phone: '101',
          isEmergency: true
        },
        {
          id: 'ambulance',
          name: 'Ambulance Service',
          category: 'ambulance',
          phone: '108',
          isEmergency: true
        }
      ],
      shoppingCenters: [
        {
          id: '1',
          name: 'Phoenix Marketcity',
          type: 'mall',
          address: 'Whitefield, Bangalore',
          coordinates: { latitude: 12.9915, longitude: 77.6954 },
          specialties: ['Shopping', 'Entertainment'],
          rating: 4.6
        }
      ],
      culturalInfo: {
        festivals: ['Ugadi', 'Deepavali', 'Ganesh Chaturthi', 'Dussehra'],
        localCuisine: ['Bisi Bele Bath', 'Mysore Pak', 'Ragi Mudde', 'Neer Dosa'],
        traditionalWear: ['Sari', 'Salwar Kameez', 'Panjabi', 'Lungi']
      },
      lastUpdated: new Date()
    };

    this.regionalData.set('karnataka-bangalore', karnatakaData);
  }

  async getRegionalData(location: LocationData): Promise<RegionalData | null> {
    // Determine region based on coordinates
    const regionKey = this.determineRegion(location);
    return this.regionalData.get(regionKey) || null;
  }

  private determineRegion(location: LocationData): string {
    // Simple region determination based on coordinates
    // In a real app, you'd use reverse geocoding or a more sophisticated method

    const { latitude, longitude } = location;

    // Tamil Nadu region (approximate bounds)
    if (latitude >= 8.0 && latitude <= 13.5 && longitude >= 76.0 && longitude <= 80.5) {
      return 'tamil-nadu-coimbatore';
    }

    // Karnataka region (approximate bounds)
    if (latitude >= 11.5 && latitude <= 18.5 && longitude >= 74.0 && longitude <= 78.5) {
      return 'karnataka-bangalore';
    }

    // Default fallback
    return 'tamil-nadu-coimbatore';
  }

  getServicesByCategory(category: string, regionData: RegionalData): RegionalService[] {
    return regionData.services.filter(service =>
      service.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  getEmergencyContactsByCategory(category: string, regionData: RegionalData): EmergencyContact[] {
    return regionData.emergencyContacts.filter(contact =>
      contact.category === category
    );
  }

  getNearbyServices(location: LocationData, regionData: RegionalData, maxDistance: number = 10): RegionalService[] {
    return regionData.services.filter(service => {
      if (!service.coordinates) return false;
      const distance = this.calculateDistance(
        location,
        service.coordinates
      );
      return distance <= maxDistance;
    });
  }

  getNearbyShoppingCenters(location: LocationData, regionData: RegionalData, maxDistance: number = 15): ShoppingCenter[] {
    return regionData.shoppingCenters.filter(center => {
      if (!center.coordinates) return false;
      const distance = this.calculateDistance(
        location,
        center.coordinates
      );
      return distance <= maxDistance;
    });
  }

  private calculateDistance(coord1: { latitude: number; longitude: number }, coord2: { latitude: number; longitude: number }): number {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(coord1.latitude)) * Math.cos(this.toRadians(coord2.latitude)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async updateRegionalData(regionKey: string, newData: Partial<RegionalData>): Promise<void> {
    const existingData = this.regionalData.get(regionKey);
    if (existingData) {
      this.regionalData.set(regionKey, {
        ...existingData,
        ...newData,
        lastUpdated: new Date()
      });
    }
  }

  getAllRegions(): string[] {
    return Array.from(this.regionalData.keys());
  }

  getRegionData(regionKey: string): RegionalData | null {
    return this.regionalData.get(regionKey) || null;
  }
}

export const regionalDataService = RegionalDataService.getInstance();