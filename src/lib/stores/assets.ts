import { writable } from 'svelte/store';
import type { Asset } from '$lib/models';

// Sample asset data
const sampleAssets: Asset[] = [
  {
    id: '1',
    name: 'Family Car',
    category: 'Vehicles',
    description: 'Toyota Innova - Family vehicle for daily commute',
    location: 'Garage',
    owner: 'Father',
    date_added: '2020-03-15',
    tags: JSON.stringify(['vehicle', 'family', 'transport']),
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2020-03-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Refrigerator',
    category: 'Hardware',
    description: 'Samsung double-door refrigerator',
    location: 'Kitchen',
    owner: 'Mother',
    date_added: '2022-08-20',
    tags: JSON.stringify(['appliance', 'kitchen', 'food-storage']),
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2022-08-20T14:30:00Z'
  },
  {
    id: '3',
    name: 'Gold Jewelry Set',
    category: 'Valuables',
    description: 'Traditional gold necklace and earrings',
    location: 'Safe',
    owner: 'Mother',
    date_added: '2019-11-12',
    tags: JSON.stringify(['jewelry', 'gold', 'valuables']),
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2019-11-12T16:45:00Z'
  },
  {
    id: '4',
    name: 'Washing Machine',
    category: 'Hardware',
    description: 'LG front-load washing machine',
    location: 'Utility Room',
    owner: 'Father',
    date_added: '2021-12-05',
    tags: JSON.stringify(['appliance', 'laundry', 'utility']),
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2021-12-05T12:00:00Z'
  },
  {
    id: '5',
    name: 'Laptop Computer',
    category: 'Hardware',
    description: 'Dell Inspiron 15 - Work laptop',
    location: 'Study Room',
    owner: 'Father',
    date_added: '2023-01-18',
    tags: JSON.stringify(['electronics', 'computer', 'work']),
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2023-01-18T09:15:00Z'
  },
  {
    id: '6',
    name: 'Air Conditioner',
    category: 'Hardware',
    description: 'Daikin split AC - Master bedroom',
    location: 'Master Bedroom',
    owner: 'Father',
    date_added: '2022-05-10',
    tags: JSON.stringify(['appliance', 'cooling', 'bedroom']),
    applicable_roles: ['Parent', 'Adult'],
    created_at: '2022-05-10T11:30:00Z'
  },
  {
    id: '7',
    name: 'Family Temple Items',
    category: 'Valuables',
    description: 'Silver puja items and brass lamps',
    location: 'Prayer Room',
    owner: 'Grandmother',
    date_added: '2018-09-02',
    tags: JSON.stringify(['religious', 'temple', 'spiritual']),
    applicable_roles: ['Parent', 'Adult', 'Elder'],
    created_at: '2018-09-02T15:20:00Z'
  },
  {
    id: '8',
    name: 'Smart TV',
    category: 'Hardware',
    description: 'Samsung 55" 4K Smart TV',
    location: 'Living Room',
    owner: 'Father',
    date_added: '2023-06-15',
    tags: JSON.stringify(['electronics', 'tv', 'entertainment']),
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2023-06-15T07:00:00Z'
  },
  {
    id: '9',
    name: 'Water Purifier',
    category: 'Hardware',
    description: 'Kent Grand RO water purifier',
    location: 'Kitchen',
    owner: 'Mother',
    date_added: '2023-03-08',
    tags: JSON.stringify(['appliance', 'water', 'health']),
    applicable_roles: ['Parent', 'Adult', 'Child'],
    created_at: '2023-03-08T18:00:00Z'
  },
  {
    id: '10',
    name: 'Musical Instruments',
    category: 'Valuables',
    description: 'Veena and harmonium for cultural activities',
    location: 'Music Room',
    owner: 'Mother',
    date_added: '2021-07-22',
    tags: JSON.stringify(['music', 'cultural', 'instruments']),
    applicable_roles: ['Parent', 'Adult', 'Child', 'Elder'],
    created_at: '2021-07-22T20:30:00Z'
  }
];

// Create the store
export const assets = writable<Asset[]>(sampleAssets);

// Store actions
export const assetActions = {
  // Get all assets
  getAll: () => {
    return assets;
  },

  // Get asset by ID
  getById: (id: string) => {
    let item: Asset | undefined;
    assets.subscribe(items => {
      item = items.find(i => i.id === id);
    })();
    return item;
  },

  // Add new asset
  add: (item: Omit<Asset, 'id' | 'created_at'>) => {
    const newItem: Asset = {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };

    assets.update(items => [...items, newItem]);
    return newItem;
  },

  // Update asset
  update: (id: string, updates: Partial<Asset>) => {
    assets.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, ...updates }
          : item
      )
    );
  },

  // Delete asset
  delete: (id: string) => {
    assets.update(items => items.filter(item => item.id !== id));
  },

  // Get assets by category
  getByCategory: (category: Asset['category']) => {
    let categoryItems: Asset[] = [];
    assets.subscribe(items => {
      categoryItems = items.filter(item => item.category === category);
    })();
    return categoryItems;
  },

  // Get assets by location
  getByLocation: (location: string) => {
    let locationItems: Asset[] = [];
    assets.subscribe(items => {
      locationItems = items.filter(item => item.location === location);
    })();
    return locationItems;
  },

  // Get assets by tags
  getByTags: (searchTags: string[]) => {
    let taggedItems: Asset[] = [];
    assets.subscribe(items => {
      taggedItems = items.filter(item => {
        if (!item.tags) return false;
        const itemTags = JSON.parse(item.tags);
        return searchTags.some(tag => itemTags.includes(tag));
      });
    })();
    return taggedItems;
  },

  // Get category summary
  getCategorySummary: () => {
    let summary: { [key: string]: { count: number } } = {};

    assets.subscribe(items => {
      items.forEach(item => {
        if (!summary[item.category]) {
          summary[item.category] = { count: 0 };
        }
        summary[item.category].count += 1;
      });
    })();

    return summary;
  },

  // Get location summary
  getLocationSummary: () => {
    let summary: { [key: string]: { count: number } } = {};

    assets.subscribe(items => {
      items.forEach(item => {
        const location = item.location || 'Unknown';
        if (!summary[location]) {
          summary[location] = { count: 0 };
        }
        summary[location].count += 1;
      });
    })();

    return summary;
  },

  // Get assets by owner
  getByOwner: (owner: string) => {
    let ownerItems: Asset[] = [];
    assets.subscribe(items => {
      ownerItems = items.filter(item => item.owner === owner);
    })();
    return ownerItems;
  },

  // Get recent assets (added in last 30 days)
  getRecentAssets: (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    let recentItems: Asset[] = [];
    assets.subscribe(items => {
      recentItems = items.filter(item => {
        const addedDate = new Date(item.date_added);
        return addedDate >= cutoffDate;
      });
    })();
    return recentItems;
  }
};