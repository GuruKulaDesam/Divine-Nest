import { writable } from 'svelte/store';
import type { InventoryItem } from '$lib/models';

// Sample inventory data
const sampleInventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Masala',
    quantity_available: 2.5,
    unit: 'kg',
    location: 'Kitchen Cabinet',
    restock_threshold: 1.0,
    preferred_vendor: 'Local Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-002',
    type: 'Grocery',
    category: 'Dry Goods',
    sub_category: 'Rice',
    quantity_available: 10,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 5,
    preferred_vendor: 'Big Bazaar',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Cook'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-003',
    type: 'Toiletry',
    category: 'Personal Care',
    sub_category: 'Soap',
    quantity_available: 8,
    unit: 'pieces',
    location: 'Bathroom Shelf',
    restock_threshold: 4,
    preferred_vendor: 'Medical Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Children'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-004',
    type: 'Pooja Item',
    category: 'Ritual Supplies',
    sub_category: 'Incense',
    quantity_available: 50,
    unit: 'pieces',
    location: 'Pooja Room',
    restock_threshold: 20,
    preferred_vendor: 'Temple Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Elder'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-005',
    type: 'Food Ingredient',
    category: 'Fresh Produce',
    sub_category: 'Vegetables',
    quantity_available: 3,
    unit: 'kg',
    location: 'Refrigerator',
    restock_threshold: 1,
    preferred_vendor: 'Local Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-006',
    type: 'Grocery',
    category: 'Dry Goods',
    sub_category: 'Lentils',
    quantity_available: 2,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 1,
    preferred_vendor: 'Local Grocery',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-007',
    type: 'Toiletry',
    category: 'Cleaning',
    sub_category: 'Detergent',
    quantity_available: 1,
    unit: 'packets',
    location: 'Laundry Room',
    restock_threshold: 0.5,
    preferred_vendor: 'Supermarket',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-008',
    type: 'Pooja Item',
    category: 'Ritual Supplies',
    sub_category: 'Oil',
    quantity_available: 2,
    unit: 'litre',
    location: 'Pooja Room',
    restock_threshold: 1,
    preferred_vendor: 'Temple Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Elder'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-009',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Turmeric',
    quantity_available: 0.5,
    unit: 'kg',
    location: 'Kitchen Cabinet',
    restock_threshold: 0.2,
    preferred_vendor: 'Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-010',
    type: 'Grocery',
    category: 'Dry Goods',
    sub_category: 'Sugar',
    quantity_available: 3,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 1.5,
    preferred_vendor: 'Local Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Cook'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-011',
    type: 'Food Ingredient',
    category: 'Dry Goods',
    sub_category: 'Rice',
    quantity_available: 15,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 5,
    preferred_vendor: 'Rice Mill',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Cook'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-012',
    type: 'Food Ingredient',
    category: 'Dry Goods',
    sub_category: 'Tamarind',
    quantity_available: 1.5,
    unit: 'kg',
    location: 'Kitchen Cabinet',
    restock_threshold: 0.5,
    preferred_vendor: 'Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-013',
    type: 'Food Ingredient',
    category: 'Fresh Produce',
    sub_category: 'Coconut',
    quantity_available: 8,
    unit: 'pieces',
    location: 'Kitchen Counter',
    restock_threshold: 4,
    preferred_vendor: 'Local Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-014',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Sambar Powder',
    quantity_available: 0.8,
    unit: 'kg',
    location: 'Spice Rack',
    restock_threshold: 0.3,
    preferred_vendor: 'Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-015',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Chili Powder',
    quantity_available: 0.6,
    unit: 'kg',
    location: 'Spice Rack',
    restock_threshold: 0.2,
    preferred_vendor: 'Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-016',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Coriander Powder',
    quantity_available: 0.4,
    unit: 'kg',
    location: 'Spice Rack',
    restock_threshold: 0.2,
    preferred_vendor: 'Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-017',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Mustard Seeds',
    quantity_available: 0.3,
    unit: 'kg',
    location: 'Spice Rack',
    restock_threshold: 0.1,
    preferred_vendor: 'Spice Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-018',
    type: 'Food Ingredient',
    category: 'Spices',
    sub_category: 'Curry Leaves',
    quantity_available: 2,
    unit: 'packets',
    location: 'Refrigerator',
    restock_threshold: 1,
    preferred_vendor: 'Vegetable Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-019',
    type: 'Food Ingredient',
    category: 'Dry Goods',
    sub_category: 'Urad Dal',
    quantity_available: 2.5,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 1,
    preferred_vendor: 'Grocery Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-020',
    type: 'Food Ingredient',
    category: 'Dry Goods',
    sub_category: 'Toor Dal',
    quantity_available: 3,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 1.5,
    preferred_vendor: 'Grocery Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-021',
    type: 'Food Ingredient',
    category: 'Dry Goods',
    sub_category: 'Moong Dal',
    quantity_available: 1.5,
    unit: 'kg',
    location: 'Pantry',
    restock_threshold: 0.8,
    preferred_vendor: 'Grocery Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-022',
    type: 'Food Ingredient',
    category: 'Fresh Produce',
    sub_category: 'Drumstick',
    quantity_available: 6,
    unit: 'pieces',
    location: 'Refrigerator',
    restock_threshold: 3,
    preferred_vendor: 'Vegetable Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-023',
    type: 'Food Ingredient',
    category: 'Fresh Produce',
    sub_category: 'Brinjal',
    quantity_available: 4,
    unit: 'kg',
    location: 'Refrigerator',
    restock_threshold: 2,
    preferred_vendor: 'Vegetable Market',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Cook'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-024',
    type: 'Pooja Item',
    category: 'Ritual Supplies',
    sub_category: 'Camphor',
    quantity_available: 0.2,
    unit: 'kg',
    location: 'Pooja Room',
    restock_threshold: 0.1,
    preferred_vendor: 'Temple Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Elder'],
    added_by: 'Father',
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inv-025',
    type: 'Pooja Item',
    category: 'Ritual Supplies',
    sub_category: 'Agarbathi',
    quantity_available: 20,
    unit: 'packets',
    location: 'Pooja Room',
    restock_threshold: 10,
    preferred_vendor: 'Temple Store',
    last_updated: new Date().toISOString(),
    applicable_roles: ['Mother', 'Father', 'Elder'],
    added_by: 'Mother',
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Create the store
export const inventory = writable<InventoryItem[]>(sampleInventoryItems);

// Store actions
export const inventoryActions = {
  // Get all inventory items
  getAll: () => {
    return inventory;
  },

  // Get inventory item by ID
  getById: (id: string) => {
    let item: InventoryItem | undefined;
    inventory.subscribe(items => {
      item = items.find(i => i.id === id);
    })();
    return item;
  },

  // Add new inventory item
  add: (item: Omit<InventoryItem, 'id' | 'created_at' | 'last_updated'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString()
    };

    inventory.update(items => [...items, newItem]);
    return newItem;
  },

  // Update inventory item
  update: (id: string, updates: Partial<InventoryItem>) => {
    inventory.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, ...updates, last_updated: new Date().toISOString() }
          : item
      )
    );
  },

  // Delete inventory item
  delete: (id: string) => {
    inventory.update(items => items.filter(item => item.id !== id));
  },

  // Get items below restock threshold
  getLowStockItems: () => {
    let lowStockItems: InventoryItem[] = [];
    inventory.subscribe(items => {
      lowStockItems = items.filter(item =>
        item.restock_threshold && item.quantity_available <= item.restock_threshold
      );
    })();
    return lowStockItems;
  },

  // Get items by category
  getByCategory: (category: string) => {
    let categoryItems: InventoryItem[] = [];
    inventory.subscribe(items => {
      categoryItems = items.filter(item => item.category === category);
    })();
    return categoryItems;
  },

  // Get items by type
  getByType: (type: string) => {
    let typeItems: InventoryItem[] = [];
    inventory.subscribe(items => {
      typeItems = items.filter(item => item.type === type);
    })();
    return typeItems;
  },

  // Get items by location
  getByLocation: (location: string) => {
    let locationItems: InventoryItem[] = [];
    inventory.subscribe(items => {
      locationItems = items.filter(item => item.location === location);
    })();
    return locationItems;
  },

  // Update quantity (for consumption or restocking)
  updateQuantity: (id: string, newQuantity: number) => {
    inventory.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity_available: newQuantity, last_updated: new Date().toISOString() }
          : item
      )
    );
  },

  // Bulk update quantities
  bulkUpdateQuantities: (updates: { id: string; quantity: number }[]) => {
    inventory.update(items =>
      items.map(item => {
        const update = updates.find(u => u.id === item.id);
        return update
          ? { ...item, quantity_available: update.quantity, last_updated: new Date().toISOString() }
          : item;
      })
    );
  },

  // Get inventory summary
  getSummary: () => {
    let summary = {
      totalItems: 0,
      lowStockItems: 0,
      categories: {} as Record<string, number>,
      types: {} as Record<string, number>,
      locations: {} as Record<string, number>
    };

    inventory.subscribe(items => {
      summary.totalItems = items.length;
      summary.lowStockItems = items.filter(item =>
        item.restock_threshold && item.quantity_available <= item.restock_threshold
      ).length;

      items.forEach(item => {
        summary.categories[item.category] = (summary.categories[item.category] || 0) + 1;
        summary.types[item.type] = (summary.types[item.type] || 0) + 1;
        if (item.location) {
          summary.locations[item.location] = (summary.locations[item.location] || 0) + 1;
        }
      });
    })();

    return summary;
  }
};