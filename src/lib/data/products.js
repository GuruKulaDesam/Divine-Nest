// Product data
export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
    description: "High-quality wireless headphones with noise cancellation",
    sku: "ELEC-001",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Wearables",
    price: 199.99,
    stock: 23,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
    description: "Advanced fitness tracking with heart rate monitoring",
    sku: "WEAR-002",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 156,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
    description: "Comfortable organic cotton t-shirt in various colors",
    sku: "CLTH-003",
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 49.99,
    stock: 0,
    status: "out-of-stock",
    image:
      "https://images.unsplash.com/photo-1609592806598-04d4d5d6903c?w=150&h=150&fit=crop",
    description: "Fast wireless charging pad compatible with all devices",
    sku: "ELEC-004",
    createdAt: "2024-01-20",
  },
  {
    id: 5,
    name: "Leather Wallet",
    category: "Accessories",
    price: 79.99,
    stock: 12,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=150&h=150&fit=crop",
    description: "Genuine leather wallet with RFID protection",
    sku: "ACC-005",
    createdAt: "2024-01-12",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 89.99,
    stock: 34,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop",
    description: "Portable Bluetooth speaker with 20-hour battery life",
    sku: "ELEC-006",
    createdAt: "2024-01-08",
  },
];

// Category options
export const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Electronics", label: "Electronics" },
  { value: "Wearables", label: "Wearables" },
  { value: "Clothing", label: "Clothing" },
  { value: "Accessories", label: "Accessories" },
];

// Status options
export const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "draft", label: "Draft" },
];

// Sort options
export const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price", label: "Price (Low-High)" },
  { value: "price-desc", label: "Price (High-Low)" },
  { value: "stock", label: "Stock (Low-High)" },
  { value: "created", label: "Date Created" },
];

// Utility functions
export function getStatusColor(status) {
  switch (status) {
    case 'active':
      return 'badge badge-success badge-outline';
    case 'out-of-stock':
      return 'badge badge-error badge-outline';
    case 'draft':
      return 'badge badge-warning badge-outline';
    default:
      return 'badge badge-neutral badge-outline';
  }
}

export function getStockColor(stock) {
  if (Number(stock) === 0) return "text-error";
  if (Number(stock) < 20) return "text-warning";
  return "text-success";
}

export function getStatusDisplayText(status) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'out-of-stock':
      return 'Out of Stock';
    case 'draft':
      return 'Draft';
    default:
      return status;
  }
} 