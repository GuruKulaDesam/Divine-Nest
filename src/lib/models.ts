// Data models for Divine-Nest Home Management Suite

// Core Application Tables (14 tables)
export interface Issue {
  id: string;
  type: 'External' | 'Internal';
  category: 'Emergency' | 'Urgents' | 'Repairs' | 'Maintenance' | 'Upgrades' | 'Other';
  sub_category?: string;
  description: string;
  location_lat?: number;
  location_lng?: number;
  location_address?: string;
  contact: string;
  preferred_resolution_date?: string;
  assigned_to?: string;
  status: 'Reported' | 'Assigned' | 'In Progress' | 'Resolved';
  applicable_roles: string[]; // Array of roles that can see this record
  // Enhanced reminder fields
  alert_enabled: boolean;
  alert_time?: string;
  alert_location_lat?: number;
  alert_location_lng?: number;
  alert_radius_meters?: number;
  alert_message?: string;
  alert_type: 'SMS' | 'WhatsApp' | 'Email' | 'Alarm' | 'None';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Request {
  id: string;
  category: 'Emergency' | 'Urgents' | 'Repairs' | 'Maintenance' | 'Upgrades' | 'Suggestion';
  sub_category?: string;
  description: string;
  location_lat?: number;
  location_lng?: number;
  location_address?: string;
  contact: string;
  preferred_resolution_date?: string;
  assigned_to?: string;
  status: 'Reported' | 'Assigned' | 'In Progress' | 'Resolved';
  affected_audience: string;
  applicable_roles: string[]; // Array of roles that can see this record
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Food {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Drinks';
  category: 'South Indian' | 'North Indian' | 'Chinese' | 'European' | 'American';
  sub_category: string;
  ingredients: string;
  preparation_stage?: string;
  mixing_stage?: string;
  boiling_stage?: string;
  ready_stage?: string;
  schedule: 'Weekly' | 'Daily' | 'Monthly' | 'Annually' | 'Festivally' | 'Ad-Hoc';
  audience: string;
  health_factor?: string;
  time_factor?: string;
  cost_per_serving?: number;
  serving_definition?: string;
  aroma_factor: 'Earthy' | 'Floral' | 'Spicy' | 'Sweet' | 'Neutral';
  taste_factor: 'Spicy' | 'Sweet' | 'Sour' | 'Salty' | 'Bitter' | 'Umami';
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

export interface Task {
  id: string;
  type: 'Duty' | 'Responsibility' | 'Ritual';
  category: 'Self' | 'Family' | 'Parenting' | 'Education' | 'Health' | 'Household' | 'Spiritual';
  sub_category?: string;
  description: string;
  assigned_to: string;
  mandatory: boolean;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Ad-Hoc';
  panchangam_link?: string;
  time_of_day?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  location?: string;
  due_date?: string;
  alert_type: 'ToDo' | 'SMS' | 'Alarm' | 'Notes';
  applicable_roles: string[]; // Array of roles that can see this record
  // Enhanced reminder fields
  alert_enabled: boolean;
  alert_time?: string;
  alert_location_lat?: number;
  alert_location_lng?: number;
  alert_radius_meters?: number;
  alert_message?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  completed_at?: string;
  created_by: string;
  created_at: string;
}

export interface Activity {
  id: string;
  title?: string;
  type: 'Physical' | 'Mental' | 'Soulful' | 'Spiritual' | 'Practical' | 'Creative' | 'Social' | 'Educational' | 'Health';
  category: 'Learning' | 'Crafting' | 'Sports' | 'Meditation' | 'Reading' | 'Music' | 'Art' | 'Wellness' | 'Religious' | 'Education' | 'Household' | 'Arts' | 'Entertainment' | 'Culinary' | 'Medical';
  sub_category?: string;
  description: string;
  participant?: string;
  assignedTo?: string;
  frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Ad-Hoc';
  location?: string;
  time_of_day?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  alert_type?: 'Reminder' | 'Alarm' | 'None';
  applicable_roles?: string[]; // Array of roles that can see this record
  // Enhanced reminder fields
  alert_enabled?: boolean;
  alert_time?: string;
  alert_location_lat?: number;
  alert_location_lng?: number;
  alert_radius_meters?: number;
  alert_message?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Pending';
  scheduled_date?: string;
  dueDate?: string;
  completedDate?: string;
  completed_at?: string;
  created_by?: string;
  created_at: string;
  updatedAt?: string;
  duration?: number;
  participants?: string[];
  notes?: string;
  tags?: string[];
}

export interface Finance {
  id: string;
  type: 'Budget' | 'Income' | 'Expenses' | 'Savings';
  category: string;
  sub_category?: string;
  amount: number;
  recurring: 'None' | 'By Period (Flexible)' | 'By Period (Fixed)';
  date: string;
  actor: string;
  source: 'Manual' | 'Voice' | 'SMS';
  notes?: string;
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

export interface Reward {
  id: string;
  person: string;
  role: 'Child' | 'Adult';
  type: 'Star' | 'Karma';
  reason: string;
  points: number;
  date: string;
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

export interface Asset {
  id: string;
  category: 'Documents' | 'Certificates' | 'Photos' | 'Valuables' | 'Inventory' | 'Vehicles' | 'Land' | 'Buildings' | 'Software' | 'Hardware';
  sub_category?: string;
  name: string;
  description?: string;
  location?: string;
  owner?: string;
  date_added: string;
  tags?: string; // JSON array of tags
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

export interface Family {
  id: string;
  type: 'Nuclear' | 'Joined' | 'Independent';
  category: 'Profile' | 'Wisdom' | 'Heritage' | 'Tradition' | 'Stories' | 'Legacy' | 'Success' | 'Achievements' | 'Certifications' | 'Photos' | 'Videos' | 'Life Lessons' | 'Rules' | 'Virtues' | 'Memories';
  sub_category: 'Members' | 'Relatives' | 'Friends' | 'Neighbours' | 'Life Lessons' | 'Stories' | 'Virtues' | 'Legacy' | 'Family Line' | 'Traditions' | 'Festivals' | 'Celebrations' | 'Certifications' | 'Awards' | 'Rewards' | 'Success' | 'Strict Guidelines' | 'Mistakes to Avoid' | 'Habits to Avoid' | 'To Dos' | 'Not To Dos' | 'Occasions' | 'Rituals' | 'Functions' | 'Moments';
  title: string;
  description: string;
  date_time: string;
  location?: string;
  media_type: 'Blog' | 'Audio' | 'Photo' | 'Video';
  media_url?: string;
  applicable_roles: string[]; // Array of roles that can see this record
  created_by: string;
  created_at: string;
}

export interface AIPrompt {
  id: string;
  type: 'Alert' | 'Notes' | 'Checklist' | 'Query';
  category: 'SMS' | 'Email' | 'Phone' | 'Calendar Schedule' | 'WhatsApp' | 'Alarm';
  purpose: string;
  trigger_time?: string;
  trigger_location_lat?: number;
  trigger_location_lng?: number;
  trigger_radius_meters?: number;
  frequency: 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Custom';
  sound_type: 'Positive' | 'Negative' | 'Alarming' | 'Pleasant';
  volume_level: 'Low' | 'Medium' | 'High' | 'Adaptive';
  conditions?: string;
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

export interface User {
  id: string;
  role: 'Father' | 'Mother' | 'Child' | 'Grandparent' | 'Guest' | 'Service Provider' | 'Admin';
  name: string;
  nick_name?: string;
  email: string;
  location?: string;
  joined_date: string;
  picture_url?: string;
  auth_provider: 'Google' | 'Facebook' | 'Manual';
  applicable_roles: string[]; // Array of roles that can see this record (usually just their own role)
  created_at: string;
}

// Dynamic Tables
export interface Alert {
  id: string;
  type: 'SMS' | 'WhatsApp' | 'Email' | 'Alarm';
  recipient: string;
  message: string;
  related_table: string;
  related_id: string;
  trigger_time: string;
  sent_at?: string;
  status: 'Pending' | 'Sent' | 'Failed';
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

export interface Directory {
  id: string;
  name: string;
  type: 'Service Provider' | 'Family Member' | 'Vendor' | 'Professional';
  category: 'Emergency' | 'Urgents' | 'Repairs' | 'Maintenance' | 'Upgrades' | 'Food' | 'Health' | 'Education' | 'Other';
  sub_category?: string;
  phone?: string;
  email?: string;
  address?: string;
  location_lat?: number;
  location_lng?: number;
  rating?: number;
  notes?: string;
  last_contacted?: string;
  applicable_roles: string[]; // Array of roles that can see this record
  created_at: string;
}

// Legacy interfaces (for backward compatibility)
export interface Todo {
  id: string
  title: string
  category: 'grocery' | 'family' | 'school' | 'custom'
  createdAt: string
  completed: boolean
  voiceCreated?: boolean
}

export interface Note {
  id: string
  content: string
  timestamp: string
  emotionTag?: 'joy' | 'stress' | 'gratitude' | 'neutral'
  voiceCreated?: boolean
}

export interface Reminder {
  id: string
  message: string
  time: string
  repeat?: 'daily' | 'weekly' | 'monthly' | 'none'
  completed?: boolean
  voiceCreated?: boolean
}

export interface Event {
  id: string
  title: string
  date: string
  category: 'festival' | 'school' | 'family' | 'custom'
  voiceCreated?: boolean
}

export interface Recording {
  id: string
  filePath: string
  startedAt: string
  duration: number
  transcription?: string
  voiceCreated?: boolean
}

export interface TrackerEntry {
  id: string
  category: string
  amount?: number
  description: string
  date: string
  tags?: string[]
  notes?: string
  createdAt: string
  updatedAt: string
  period?: 'daily' | 'weekly' | 'monthly' | 'other'
}

// Enhanced interfaces for Reminder App functionality
export interface Discussion {
  id: string;
  table_name: string;
  record_id: string;
  author: string;
  author_role: string;
  message: string;
  attachments?: string[]; // Array of file URLs
  created_at: string;
  updated_at?: string;
}

export interface VoiceCommand {
  id: string;
  table_name: string;
  record_id: string;
  command: string;
  intent: string;
  confidence: number;
  executed: boolean;
  result?: string;
  created_at: string;
}

export interface LocationReminder {
  id: string;
  table_name: string;
  record_id: string;
  trigger_location_lat: number;
  trigger_location_lng: number;
  trigger_radius_meters: number;
  message: string;
  active: boolean;
  last_triggered?: string;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  type: 'Food Ingredient' | 'Grocery' | 'Toiletry' | 'Pooja Item' | 'Other';
  category: 'Dry Goods' | 'Fresh Produce' | 'Spices' | 'Cleaning' | 'Personal Care' | 'Ritual Supplies';
  sub_category?: string;
  quantity_available: number;
  unit: 'g' | 'kg' | 'litre' | 'ml' | 'pieces' | 'packets';
  location?: string;
  restock_threshold?: number;
  preferred_vendor?: string;
  last_updated?: string;
  applicable_roles: string[];
  added_by: string;
  created_at: string;
}

export interface VoiceIntent {
  type: string;
  confidence: number;
  [key: string]: any; // Allow additional properties based on intent type
}