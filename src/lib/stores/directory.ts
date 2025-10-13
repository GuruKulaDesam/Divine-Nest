import { writable } from 'svelte/store';
import type { Directory } from '$lib/models';

// Sample directory data - contacts, service providers, vendors
const sampleDirectoryData: Directory[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    type: 'Professional',
    category: 'Health',
    sub_category: 'Family Doctor',
    phone: '+91-9876543210',
    email: 'dr.rajesh@clinic.com',
    address: 'Apollo Clinic, T. Nagar, Chennai',
    location_lat: 13.0827,
    location_lng: 80.2707,
    rating: 4.8,
    notes: 'Excellent family physician, available for emergencies',
    last_contacted: '2025-01-10T14:00:00Z',
    applicable_roles: ['mother', 'father', 'child', 'teenager'],
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sri Krishna Electricals',
    type: 'Service Provider',
    category: 'Repairs',
    sub_category: 'Electrical',
    phone: '+91-9876543211',
    email: 'service@srikrishnaelectricals.com',
    address: '123 Main Street, Adyar, Chennai',
    location_lat: 13.0067,
    location_lng: 80.2573,
    rating: 4.5,
    notes: 'Reliable electrical repair service, 24/7 emergency support',
    last_contacted: '2025-01-08T10:00:00Z',
    applicable_roles: ['father', 'mother'],
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Grandmother (தாய்)',
    type: 'Family Member',
    category: 'Emergency',
    sub_category: 'Elder Care',
    phone: '+91-9876543212',
    email: 'grandma@example.com',
    address: 'Family Home, Coimbatore',
    location_lat: 11.0168,
    location_lng: 76.9558,
    rating: 5.0,
    notes: 'Primary emergency contact, lives nearby',
    last_contacted: '2025-01-15T09:00:00Z',
    applicable_roles: ['mother', 'father', 'child', 'teenager'],
    created_at: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Fresh Mart Grocery',
    type: 'Vendor',
    category: 'Food',
    sub_category: 'Grocery Store',
    phone: '+91-9876543213',
    email: 'orders@freshmart.com',
    address: '456 Market Road, T. Nagar, Chennai',
    location_lat: 13.0827,
    location_lng: 80.2707,
    rating: 4.2,
    notes: 'Organic vegetables and traditional spices available',
    last_contacted: '2025-01-14T16:00:00Z',
    applicable_roles: ['mother', 'father'],
    created_at: '2025-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Uncle Ravi (மாமா)',
    type: 'Family Member',
    category: 'Emergency',
    sub_category: 'Financial Advisor',
    phone: '+91-9876543214',
    email: 'uncle.ravi@example.com',
    address: 'Business District, Chennai',
    location_lat: 13.0827,
    location_lng: 80.2707,
    rating: 5.0,
    notes: 'Financial advisor and emergency contact',
    last_contacted: '2025-01-12T11:00:00Z',
    applicable_roles: ['father', 'mother'],
    created_at: '2025-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'City Plumbing Services',
    type: 'Service Provider',
    category: 'Repairs',
    sub_category: 'Plumbing',
    phone: '+91-9876543215',
    email: 'support@cityplumbing.com',
    address: '789 Service Lane, Anna Nagar, Chennai',
    location_lat: 13.0850,
    location_lng: 80.2101,
    rating: 4.3,
    notes: 'Professional plumbing services, licensed technicians',
    last_contacted: '2025-01-06T13:00:00Z',
    applicable_roles: ['father', 'mother'],
    created_at: '2025-01-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Little Angels School',
    type: 'Professional',
    category: 'Education',
    sub_category: 'Primary School',
    phone: '+91-9876543216',
    email: 'admissions@littleangels.edu',
    address: '321 Education Street, Mylapore, Chennai',
    location_lat: 13.0368,
    location_lng: 80.2676,
    rating: 4.7,
    notes: 'Children\'s school, good academic reputation',
    last_contacted: '2025-01-13T08:00:00Z',
    applicable_roles: ['mother', 'father', 'child'],
    created_at: '2025-01-07T00:00:00Z'
  },
  {
    id: '8',
    name: 'Temple Priest (அர்ச்சகர்)',
    type: 'Professional',
    category: 'Other',
    sub_category: 'Religious Services',
    phone: '+91-9876543217',
    email: 'priest@localtemple.org',
    address: 'Local Temple, Mylapore, Chennai',
    location_lat: 13.0368,
    location_lng: 80.2676,
    rating: 4.9,
    notes: 'Conducts religious ceremonies and festivals',
    last_contacted: '2025-01-14T06:00:00Z',
    applicable_roles: ['mother', 'father', 'grandmother', 'grandfather'],
    created_at: '2025-01-08T00:00:00Z'
  }
];

// Voice commands for directory module
export const directoryVoiceCommands = [
  'add contact',
  'சேர்க்க தொடர்பு',
  'find service provider',
  'சேவை வழங்குநர் கண்டுபிடி',
  'emergency contact',
  'அவசர தொடர்பு',
  'call doctor',
  'மருத்துவரை அழை',
  'find plumber',
  'குழாய் தொழிலாளி கண்டுபிடி',
  'add vendor',
  'விற்பனையாளர் சேர்க்க'
];

// Discussion forum for directory module
export const directoryDiscussions = [
  {
    id: 'disc-1',
    title: 'Recommended Service Providers',
    author: 'கணவர்',
    content: 'Let\'s share our experiences with reliable service providers in our area.',
    timestamp: '2025-01-01T10:00:00Z',
    replies: [
      {
        id: 'reply-1',
        author: 'தாய்',
        content: 'I can recommend a good electrician who responds quickly.',
        timestamp: '2025-01-01T11:00:00Z'
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Emergency Contacts Update',
    author: 'நான்',
    content: 'We should update our emergency contact list regularly.',
    timestamp: '2025-01-02T14:00:00Z',
    replies: []
  }
];

// Directory store
export const directory = writable<Directory[]>(sampleDirectoryData);

// Directory store actions
export const directoryActions = {
  add: (contact: Omit<Directory, 'id' | 'created_at'>) => {
    const newContact: Directory = {
      ...contact,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    directory.update(contacts => [...contacts, newContact]);
    return newContact;
  },

  update: (id: string, updates: Partial<Directory>) => {
    directory.update(contacts =>
      contacts.map(contact =>
        contact.id === id ? { ...contact, ...updates } : contact
      )
    );
  },

  delete: (id: string) => {
    directory.update(contacts => contacts.filter(contact => contact.id !== id));
  },

  getById: (id: string) => {
    let result: Directory | undefined;
    directory.subscribe(contacts => {
      result = contacts.find(contact => contact.id === id);
    })();
    return result;
  },

  getByType: (type: string) => {
    let result: Directory[] = [];
    directory.subscribe(contacts => {
      result = contacts.filter(contact => contact.type === type);
    })();
    return result;
  },

  getByCategory: (category: string) => {
    let result: Directory[] = [];
    directory.subscribe(contacts => {
      result = contacts.filter(contact => contact.category === category);
    })();
    return result;
  },

  getEmergencyContacts: () => {
    let result: Directory[] = [];
    directory.subscribe(contacts => {
      result = contacts.filter(contact => contact.category === 'Emergency');
    })();
    return result;
  },

  search: (query: string) => {
    let result: Directory[] = [];
    directory.subscribe(contacts => {
      result = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.notes?.toLowerCase().includes(query.toLowerCase()) ||
        contact.sub_category?.toLowerCase().includes(query.toLowerCase())
      );
    })();
    return result;
  }
};