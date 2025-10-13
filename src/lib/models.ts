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
  created_at: string;
}

export interface InventoryItem {
  id: string;
  type: 'Food Ingredient' | 'Grocery' | 'Toiletry' | 'Pooja Item' | 'Other';
  category: 'Dry Goods' | 'Fresh Produce' | 'Spices' | 'Cleaning' | 'Personal Care' | 'Ritual Supplies';
  sub_category?: string;
  quantity_available: number;
  unit: 'kg' | 'g' | 'litre' | 'ml' | 'pieces' | 'packets';
  location?: string;
  restock_threshold?: number;
  preferred_vendor?: string;
  last_updated: string;
  added_by: string;
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
  created_by: string;
  created_at: string;
}

export interface Activity {
  id: string;
  type: 'Physical' | 'Mental' | 'Soulful';
  category: 'Learning' | 'Crafting' | 'Sports' | 'Meditation' | 'Reading' | 'Music' | 'Art';
  sub_category?: string;
  description: string;
  participant: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Ad-Hoc';
  location?: string;
  time_of_day?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  alert_type: 'Reminder' | 'Alarm' | 'None';
  created_by: string;
  created_at: string;
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

// Voice intent types
export interface VoiceIntent {
  type: 'createTodo' | 'setReminder' | 'createNote' | 'setEventReminder' | 'startRecording' | 'stopRecording' | 'unknown'
  title?: string
  message?: string
  content?: string
  time?: string
  date?: string
  category?: string
  confidence: number
}