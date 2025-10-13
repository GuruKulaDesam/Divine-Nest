-- Divine Nest Database Schema
-- Consolidated SQLite tables for Home Management Suite
-- Created: October 13, 2025

-- ===========================================
-- ISSUES TABLE
-- Track and resolve household issues with voice-first reporting
-- ===========================================
CREATE TABLE IF NOT EXISTS issues (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('External', 'Internal')) NOT NULL,
  category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Other')) NOT NULL,
  sub_category TEXT,
  description TEXT NOT NULL,
  location_lat REAL,
  location_lng REAL,
  location_address TEXT,
  contact TEXT NOT NULL,
  preferred_resolution_date DATE,
  assigned_to TEXT,
  status TEXT CHECK(status IN ('Reported', 'Assigned', 'In Progress', 'Resolved')) DEFAULT 'Reported',
  created_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- FINANCE TABLE
-- Manage all monetary flows with SMS parsing and voice input
-- ===========================================
CREATE TABLE IF NOT EXISTS finance (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('Budget', 'Income', 'Expenses', 'Savings')) NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  amount REAL NOT NULL,
  recurring TEXT CHECK(recurring IN ('None', 'By Period (Flexible)', 'By Period (Fixed)')) DEFAULT 'None',
  date DATE NOT NULL,
  actor TEXT NOT NULL,
  source TEXT CHECK(source IN ('Manual', 'Voice', 'SMS')) DEFAULT 'Manual',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- ACTIVITIES TABLE
-- Unify Tasks and Events with alert types and role-awareness
-- ===========================================
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('Task', 'Event')) NOT NULL,
  category TEXT CHECK(category IN ('Duty', 'Responsibility', 'Entertainment', 'Daily', 'Weekly', 'Monthly', 'Annual', 'Ad-Hoc')) NOT NULL,
  sub_category TEXT,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  assigned_to TEXT,
  alert_type TEXT CHECK(alert_type IN ('None', 'ToDo', 'SMS', 'Alarm', 'Email', 'Notes')) DEFAULT 'None',
  created_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- REWARDS TABLE
-- Track virtue and effort-based recognition across age groups
-- ===========================================
CREATE TABLE IF NOT EXISTS rewards (
  id TEXT PRIMARY KEY,
  person TEXT NOT NULL,
  role TEXT CHECK(role IN ('Child', 'Adult')) NOT NULL,
  type TEXT CHECK(type IN ('Star', 'Karma')) NOT NULL,
  reason TEXT NOT NULL,
  points INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- ASSETS TABLE
-- Comprehensive home asset tracking with categories and metadata
-- ===========================================
CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,
  category TEXT CHECK(category IN ('Documents', 'Certificates', 'Photos', 'Valuables', 'Inventory', 'Vehicles', 'Land', 'Buildings', 'Software', 'Hardware')) NOT NULL,
  sub_category TEXT,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  owner TEXT,
  date_added DATE NOT NULL,
  tags TEXT, -- JSON array of tags
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- ROLES TABLE (Optional)
-- Define household roles for assignment and reporting
-- ===========================================
CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  name TEXT CHECK(name IN ('Father', 'Mother', 'Child', 'Admin', 'Guest', 'Service Provider')) NOT NULL,
  permissions TEXT, -- JSON array of permissions
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- NOTIFICATIONS TABLE (Optional)
-- Track all alerts sent (SMS, WhatsApp, Email, Alarm)
-- ===========================================
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('SMS', 'WhatsApp', 'Email', 'Alarm')) NOT NULL,
  recipient TEXT NOT NULL,
  message TEXT NOT NULL,
  related_to TEXT, -- issueId, activityId, etc.
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- FOODS TABLE
-- Culturally rich, health-aware, and schedule-aware food planner
-- ===========================================
CREATE TABLE IF NOT EXISTS foods (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks')) NOT NULL,
  category TEXT CHECK(category IN ('South Indian', 'North Indian', 'Chinese', 'European', 'American')) NOT NULL,
  sub_category TEXT NOT NULL, -- Specific dish name
  ingredients TEXT NOT NULL, -- JSON array of ingredients
  preparation_stage TEXT,
  mixing_stage TEXT,
  boiling_stage TEXT,
  ready_stage TEXT,
  schedule TEXT CHECK(schedule IN ('Weekly', 'Daily', 'Monthly', 'Annually', 'Festivally', 'Ad-Hoc')) DEFAULT 'Weekly',
  audience TEXT NOT NULL, -- JSON array of audience types ('Kids', 'Family', 'Men', 'Women')
  health_factor TEXT, -- e.g., "Good for liver", "Boosts immunity"
  time_factor TEXT, -- e.g., "20 minutes"
  cost_per_serving REAL,
  serving_definition TEXT, -- e.g., "1 adult portion"
  aroma_factor TEXT CHECK(aroma_factor IN ('Earthy', 'Floral', 'Spicy', 'Sweet', 'Neutral')) DEFAULT 'Neutral',
  taste_factor TEXT CHECK(taste_factor IN ('Spicy', 'Sweet', 'Sour', 'Salty', 'Bitter', 'Umami')) DEFAULT 'Neutral',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- REQUESTS TABLE
-- Family-addressable requests with full alert and assignment logic
-- ===========================================
CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  category TEXT CHECK(category IN ('Emergency', 'Urgents', 'Repairs', 'Maintenance', 'Upgrades', 'Suggestion')) NOT NULL,
  sub_category TEXT,
  description TEXT NOT NULL,
  location_lat REAL,
  location_lng REAL,
  location_address TEXT,
  contact TEXT NOT NULL,
  preferred_resolution_date DATE,
  assigned_to TEXT, -- From Service Directory
  status TEXT CHECK(status IN ('Reported', 'Assigned', 'In Progress', 'Resolved')) DEFAULT 'Reported',
  affected_audience TEXT NOT NULL, -- JSON array ('Children', 'Men', 'Women', 'Family', 'Grand Parents')
  created_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- AI_PROMPTS TABLE
-- Orchestrates AI-driven alerts, reminders, and automations
-- ===========================================
CREATE TABLE IF NOT EXISTS ai_prompts (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('Alert', 'Notes', 'Checklist', 'Query')) NOT NULL,
  category TEXT CHECK(category IN ('SMS', 'Email', 'Phone', 'Calendar Schedule', 'WhatsApp', 'Alarm')) NOT NULL,
  purpose TEXT NOT NULL, -- e.g., "Wake-up reminder", "Turn on lights", "Play devotional songs"
  trigger_time DATETIME,
  trigger_location_lat REAL,
  trigger_location_lng REAL,
  trigger_radius_meters REAL, -- Location radius for triggers
  frequency TEXT CHECK(frequency IN ('Once', 'Daily', 'Weekly', 'Monthly', 'Custom')) DEFAULT 'Once',
  sound_type TEXT CHECK(sound_type IN ('Positive', 'Negative', 'Alarming', 'Pleasant')) DEFAULT 'Pleasant',
  volume_level TEXT CHECK(volume_level IN ('Low', 'Medium', 'High', 'Adaptive')) DEFAULT 'Medium',
  conditions TEXT, -- JSON array of conditions e.g., ["Only if user is home", "Only if weather is sunny"]
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- FAMILY TABLE
-- Living archive of family identity, wisdom, and legacy
-- ===========================================
CREATE TABLE IF NOT EXISTS family (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('Nuclear', 'Joined', 'Independent')) NOT NULL,
  category TEXT CHECK(category IN ('Profile', 'Wisdom', 'Heritage', 'Tradition', 'Stories', 'Legacy', 'Success', 'Achievements', 'Certifications', 'Photos', 'Videos', 'Life Lessons', 'Rules', 'Virtues', 'Memories')) NOT NULL,
  sub_category TEXT CHECK(sub_category IN ('Members', 'Relatives', 'Friends', 'Neighbours', 'Life Lessons', 'Stories', 'Virtues', 'Legacy', 'Family Line', 'Traditions', 'Festivals', 'Celebrations', 'Certifications', 'Awards', 'Rewards', 'Success', 'Strict Guidelines', 'Mistakes to Avoid', 'Habits to Avoid', 'To Dos', 'Not To Dos', 'Occasions', 'Rituals', 'Functions', 'Moments')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date_time DATETIME NOT NULL,
  location TEXT,
  media_type TEXT CHECK(media_type IN ('Blog', 'Audio', 'Photo', 'Video')) NOT NULL,
  media_url TEXT,
  created_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- USERS TABLE
-- Standardized user profiles with social login and role-awareness
-- ===========================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  role TEXT CHECK(role IN ('Father', 'Mother', 'Child', 'Grandparent', 'Guest', 'Service Provider', 'Admin')) NOT NULL,
  name TEXT NOT NULL,
  nick_name TEXT,
  email TEXT NOT NULL UNIQUE,
  location TEXT,
  joined_date DATE NOT NULL,
  picture_url TEXT,
  auth_provider TEXT CHECK(auth_provider IN ('Google', 'Facebook', 'Manual')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- LEGACY TABLES (Existing)
-- ===========================================
CREATE TABLE IF NOT EXISTS user_roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL,
  dashboard TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  relationship TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  emergency_contact BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  due_time TIME,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS grocery_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  in_stock BOOLEAN DEFAULT 1,
  market_mode BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  assigned_to TEXT,
  frequency TEXT,
  completed BOOLEAN DEFAULT 0,
  due_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);