import { writable } from 'svelte/store';
import type { Family } from '$lib/models';

// Sample family data - stories, traditions, memories, etc.
const sampleFamilyData: Family[] = [
  {
    id: '1',
    type: 'Nuclear',
    category: 'Stories',
    sub_category: 'Life Lessons',
    title: 'Grandmother\'s Wisdom About Family Unity',
    description: 'A beautiful story about how our family stayed united during difficult times, teaching us the importance of togetherness and mutual support.',
    date_time: '2025-01-15T10:00:00Z',
    location: 'Family Home',
    media_type: 'Blog',
    applicable_roles: ['mother', 'father', 'grandmother', 'grandfather'],
    created_by: 'தாய்',
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    type: 'Joined',
    category: 'Tradition',
    sub_category: 'Festivals',
    title: 'Pongal Festival Traditions',
    description: 'Our family\'s unique way of celebrating Pongal with traditional recipes, prayers, and community involvement.',
    date_time: '2025-01-14T06:00:00Z',
    location: 'Home & Temple',
    media_type: 'Photo',
    media_url: '/images/pongal-2025.jpg',
    applicable_roles: ['mother', 'father', 'child', 'teenager', 'grandmother'],
    created_by: 'நான்',
    created_at: '2025-01-02T00:00:00Z'
  },
  {
    id: '3',
    type: 'Nuclear',
    category: 'Heritage',
    sub_category: 'Legacy',
    title: 'Family Business Legacy',
    description: 'The story of how our family business was started by great-grandfather and continues to thrive today.',
    date_time: '2025-01-10T14:00:00Z',
    location: 'Family Business',
    media_type: 'Video',
    media_url: '/videos/family-business.mp4',
    applicable_roles: ['father', 'grandfather'],
    created_by: 'மாமா',
    created_at: '2025-01-03T00:00:00Z'
  },
  {
    id: '4',
    type: 'Independent',
    category: 'Success',
    sub_category: 'Success',
    title: 'Children\'s Academic Excellence',
    description: 'Celebrating the academic achievements of our children and the family values that contributed to their success.',
    date_time: '2025-01-12T16:00:00Z',
    location: 'School',
    media_type: 'Photo',
    media_url: '/images/achievements-2025.jpg',
    applicable_roles: ['mother', 'father', 'child', 'teenager'],
    created_by: 'கணவர்',
    created_at: '2025-01-04T00:00:00Z'
  },
  {
    id: '5',
    type: 'Nuclear',
    category: 'Memories',
    sub_category: 'Celebrations',
    title: 'Silver Wedding Anniversary',
    description: 'Beautiful memories from our parents\' silver wedding anniversary celebration with extended family.',
    date_time: '2024-12-25T18:00:00Z',
    location: 'Grand Hall',
    media_type: 'Video',
    media_url: '/videos/anniversary.mp4',
    applicable_roles: ['mother', 'father', 'grandmother', 'grandfather'],
    created_by: 'தாய்',
    created_at: '2025-01-05T00:00:00Z'
  },
  {
    id: '6',
    type: 'Joined',
    category: 'Rules',
    sub_category: 'Virtues',
    title: 'Family Code of Conduct',
    description: 'The core values and principles that guide our family behavior and decision-making.',
    date_time: '2025-01-08T20:00:00Z',
    location: 'Family Home',
    media_type: 'Blog',
    applicable_roles: ['mother', 'father', 'child', 'teenager', 'grandmother', 'grandfather'],
    created_by: 'கணவர்',
    created_at: '2025-01-06T00:00:00Z'
  },
  {
    id: '7',
    type: 'Nuclear',
    category: 'Profile',
    sub_category: 'Members',
    title: 'Family Tree Documentation',
    description: 'Complete documentation of our family tree going back three generations.',
    date_time: '2025-01-06T12:00:00Z',
    location: 'Home',
    media_type: 'Photo',
    media_url: '/images/family-tree.jpg',
    applicable_roles: ['mother', 'father', 'grandmother', 'grandfather'],
    created_by: 'நான்',
    created_at: '2025-01-07T00:00:00Z'
  },
  {
    id: '8',
    type: 'Independent',
    category: 'Wisdom',
    sub_category: 'Life Lessons',
    title: 'Lessons from Financial Crisis',
    description: 'How our family overcame financial difficulties and the valuable lessons we learned.',
    date_time: '2025-01-04T15:00:00Z',
    location: 'Family Home',
    media_type: 'Audio',
    media_url: '/audio/financial-lessons.mp3',
    applicable_roles: ['father', 'grandfather'],
    created_by: 'மாமா',
    created_at: '2025-01-08T00:00:00Z'
  }
];

// Voice commands for family module
export const familyVoiceCommands = [
  'add family story',
  'சேர்க்க குடும்ப கதை',
  'tell family story',
  'குடும்ப கதை சொல்லு',
  'family traditions',
  'குடும்ப மரபுகள்',
  'add memory',
  'நினைவு சேர்க்க',
  'family rules',
  'குடும்ப விதிகள்',
  'heritage story',
  'மரபு கதை'
];

// Discussion forum for family module
export const familyDiscussions = [
  {
    id: 'disc-1',
    title: 'Sharing Family Stories',
    author: 'தாய்',
    content: 'Let\'s share our favorite family stories and traditions here.',
    timestamp: '2025-01-01T10:00:00Z',
    replies: [
      {
        id: 'reply-1',
        author: 'கணவர்',
        content: 'Great idea! I\'ll share about our Pongal traditions.',
        timestamp: '2025-01-01T11:00:00Z'
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Family Values Discussion',
    author: 'மாமா',
    content: 'What are the core values that guide our family?',
    timestamp: '2025-01-02T14:00:00Z',
    replies: []
  }
];

// Family store
export const family = writable<Family[]>(sampleFamilyData);

// Family store actions
export const familyActions = {
  add: (item: Omit<Family, 'id' | 'created_at'>) => {
    const newItem: Family = {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    family.update(items => [...items, newItem]);
    return newItem;
  },

  update: (id: string, updates: Partial<Family>) => {
    family.update(items =>
      items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  },

  delete: (id: string) => {
    family.update(items => items.filter(item => item.id !== id));
  },

  getById: (id: string) => {
    let result: Family | undefined;
    family.subscribe(items => {
      result = items.find(item => item.id === id);
    })();
    return result;
  },

  getByCategory: (category: string) => {
    let result: Family[] = [];
    family.subscribe(items => {
      result = items.filter(item => item.category === category);
    })();
    return result;
  },

  getByType: (type: string) => {
    let result: Family[] = [];
    family.subscribe(items => {
      result = items.filter(item => item.type === type);
    })();
    return result;
  },

  search: (query: string) => {
    let result: Family[] = [];
    family.subscribe(items => {
      result = items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    })();
    return result;
  }
};