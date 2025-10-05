# South Indian Family Life App - Requirements Document

## Overview

This document outlines the requirements for a comprehensive South Indian Family Life App designed to support traditional South Indian family dynamics, cultural practices, and daily life management. The app is structured into 7 modular domains, each with specific routes, modules, data models, and AI integration points.

## Architecture

- **Framework**: SvelteKit for modern web development
- **Styling**: Tailwind CSS for responsive design
- **Data Storage**: Dexie.js (IndexedDB) for local data persistence
- **AI Integration**: Contextual prompts for intelligent assistance
- **Design Philosophy**: Role-aware, emotionally resonant, culturally sensitive

## 7 Core Domains

### 1️⃣ 🏠 Home & Household Management

#### Routes

- `/home` - Main dashboard for household overview
- `/household` - Detailed household management
- `/home-services` - Emergency and urgent services

#### Modules

- **Grocery & Inventory**
  - Pantry tracker with stock levels
  - Auto grocery list generation from meal plans
  - Market modes: weekly, monthly, festival-specific
- **Chores & Flow**
  - Role-based task assignments (Amma, Appa, Paati, etc.)
  - Visual progress streaks and completion tracking
- **Repairs & Maintenance**
  - Repair task tracker with status updates
  - Maintenance calendar with scheduled tasks
  - Upgrade wishlist for home improvements
- **Emergency & Urgent Services**
  - Quick dial panel for emergency contacts
  - Medical information vault for family members
  - Disaster preparedness checklists

#### Data Models

```typescript
type GroceryItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
  inStock: boolean;
  lastUpdated: Date;
};

type Chore = {
  id: string;
  title: string;
  assignedTo: string; // Role-based: 'amma', 'appa', 'paati', etc.
  frequency: "daily" | "weekly" | "monthly";
  completed: boolean;
  streakCount: number;
};

type RepairTask = {
  id: string;
  issue: string;
  location: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
};

type EmergencyContact = {
  name: string;
  type: "medical" | "police" | "fire" | "family" | "neighbor";
  phone: string;
  notes: string;
};
```

#### AI Prompts

- "Generate a grocery list based on pantry inventory and upcoming meal plan"
- "Create a monthly home maintenance checklist for a South Indian household"
- "Build an emergency contact sheet for a family of 6 with cultural considerations"

### 2️⃣ 🎓 Education & Learning

#### Routes

- `/education` - Education dashboard
- `/library` - Family library management

#### Modules

- **School & Exam Planning**
  - Chapter-wise weekly study planner
  - Revision streak tracking
  - Smart timetable generation
  - Exam preparation tracker
- **Library & Reading**
  - Role-based book shelves
  - Reading progress tracker
  - Categories: spiritual, comics, historical, mythics, mystics, academic
- **Lifelong Learning**
  - Career preparation guidance
  - Scholarship and opportunity tracker

#### Data Models

```typescript
type StudyPlan = {
  subject: string;
  chapters: string[];
  dueDate: Date;
  completedChapters: string[];
};

type Book = {
  id: string;
  title: string;
  author: string;
  category: "spiritual" | "comics" | "historical" | "mythics" | "mystics" | "academic";
  ownedBy: string; // Family member role
  status: "available" | "reading" | "completed";
  progress: number; // 0-100
};

type Exam = {
  subject: string;
  date: Date;
  syllabus: string[];
  prepChecklist: string[];
};
```

#### AI Prompts

- "Create a 4-week study plan for quarterly exams in Tamil Nadu curriculum"
- "Suggest 5 Tamil spiritual books suitable for Paati"
- "Build a reading plan for Ponniyin Selvan Vol. 1 with chapter breakdowns"

### 3️⃣ 🍲 Meals, Recipes & Kitchen Life

#### Routes

- `/meals` - Meal planning dashboard
- `/recipes` - Recipe management

#### Modules

- **Meal Planner**
  - Weekly Tamil meal plan generator
  - Festival-specific menu planning
- **Grocery Sync**
  - Auto grocery list from meal plans
  - Pantry inventory integration
- **Recipe Archive**
  - Voice-to-recipe converter
  - Tamil-English bilingual labels
  - Step-by-step photo guides

#### Data Models

```typescript
type MealPlan = {
  date: Date;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  ingredients: GroceryItem[];
  culturalNotes?: string;
};

type Recipe = {
  id: string;
  title: string;
  steps: string[];
  ingredients: GroceryItem[];
  source: "family" | "traditional" | "modern";
  prepTime: number;
  cookTime: number;
};
```

#### AI Prompts

- "Create a vegetarian Tamil meal plan using seasonal South Indian ingredients"
- "Convert Paati's rasam voice instructions into a structured recipe with steps and labels"

### 4️⃣ 🛕 Rituals, Festivals & Spiritual Life

#### Routes

- `/rituals` - Ritual tracking
- `/temple` - Temple visit planning
- `/festival-calendar` - Festival calendar

#### Modules

- **Temple Visit Planner**
  - Destination guides with cultural context
  - Darshan timing information
  - Packing checklists for pilgrimages
- **Ritual Tracker**
  - Daily pooja schedules
  - Festival preparation checklists
  - Shraddham and remembrance reminders
- **Festival Calendar**
  - Tamil calendar synchronization
  - Event reminders and preparations

#### Data Models

```typescript
type Ritual = {
  id: string;
  name: string;
  type: "daily" | "weekly" | "monthly" | "festival";
  date: Date;
  participants: string[];
  completed: boolean;
};

type TempleTrip = {
  destination: string;
  startDate: Date;
  endDate: Date;
  checklist: string[];
  budget: number;
  travelers: string[];
};

type FestivalEvent = {
  name: string;
  date: Date;
  prepChecklist: string[];
  significance: string;
  familyTraditions: string[];
};
```

#### AI Prompts

- "Plan a 2-day temple trip to Rameswaram with budget under ₹8,000"
- "Create a Navaratri pooja checklist with kolam designs and prasadam ideas"

### 5️⃣ 🧘 Wellness, Health & Emotional Balance

#### Routes

- `/health` - Health management
- `/wellness` - Wellness activities
- `/mantras` - Spiritual practices
- `/journal` - Emotional journaling

#### Modules

- **Health & Medication**
  - Medicine reminder system
  - Elder care alert system
- **Mantras & Spiritual Practice**
  - Morning mantra playlists
  - Role-based spiritual suggestions
- **Yoga & Breathwork**
  - Routine builder with cultural adaptations
  - Role-aware wellness plans
- **Journaling**
  - Voice-to-text journaling
  - Tamil-English bilingual prompts
  - Mood tracking with cultural context

#### Data Models

```typescript
type HealthReminder = {
  userId: string;
  medicine: string;
  dosage: string;
  time: string;
  repeat: "daily" | "weekly" | "as-needed";
  familyMember: string;
};

type YogaRoutine = {
  id: string;
  name: string;
  steps: string[];
  duration: number;
  focus: string; // 'back-pain', 'stress', 'energy', etc.
  suitableFor: string[]; // Family roles
};

type JournalEntry = {
  userId: string;
  date: Date;
  content: string;
  mood: "peaceful" | "content" | "reflective" | "concerned" | "joyful";
  tags: string[];
};
```

#### AI Prompts

- "Suggest a daily mantra routine suitable for Paati"
- "Create a 15-minute yoga routine for Amma focused on back pain relief"
- "Summarize Paati's last 3 journal entries and suggest a reflection prompt"

### 6️⃣ 📅 Time, Events & Family Coordination

#### Routes

- `/calendar` - Shared family calendar
- `/events` - Event management
- `/time` - Time management

#### Modules

- **Shared Calendar**
  - Role-based calendar views
  - Color-coded event categories
  - Synchronization with rituals, travel, and school schedules
- **Family Events**
  - Birthday and anniversary tracking
  - Guest lists and preparation checklists
- **Time Management**
  - Shared time block scheduling
  - Routine builder for family harmony
  - Focus mode for individual activities

#### Data Models

```typescript
type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  type: "ritual" | "school" | "health" | "social" | "maintenance";
  participants: string[];
  color: string;
};

type FamilyEvent = {
  type: "birthday" | "anniversary" | "festival" | "celebration";
  date: Date;
  person: string;
  checklist: string[];
  guestList?: string[];
};

type TimeBlock = {
  name: string;
  startTime: string;
  endTime: string;
  purpose: "study" | "work" | "family-time" | "personal" | "spiritual";
  participants: string[];
};
```

#### AI Prompts

- "Summarize Amma's week including chores, poojas, and social outings"
- "Plan a birthday celebration for Paati with vegetarian menu and gift suggestions"

### 7️⃣ ✈️ Travel, Leisure & Community Life

#### Routes

- `/travel` - Travel planning
- `/leisure` - Leisure activities
- `/community` - Community connections

#### Modules

- **Travel Planning**
  - Destination planning with cultural context
  - Packing checklists for pilgrimages
  - Temple route optimization
- **Leisure & Outings**
  - Movie night planning
  - Local park and mall recommendations
  - Shared wishlist management
- **Community Connection**
  - Neighborhood alert system
  - Local service tracking
  - Community event discovery

#### Data Models

```typescript
type TravelPlan = {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: string[];
  itinerary: string[];
  budget: number;
  accommodations: string[];
};

type LeisureActivity = {
  name: string;
  type: "movie" | "park" | "mall" | "exhibition" | "outing";
  location: string;
  date: Date;
  participants: string[];
};

type CommunityEvent = {
  name: string;
  date: Date;
  location: string;
  audience: "elders" | "children" | "family" | "all";
  description: string;
};
```

#### AI Prompts

- "Plan a 5-day South Indian temple pilgrimage for 4 adults and 2 children"
- "Suggest 3 fun places near Coimbatore for a Sunday family outing"
- "List upcoming community events in Kovaipudur suitable for elders and children"

## Technical Requirements

### Core Technologies

- SvelteKit for routing and SSR
- Tailwind CSS for styling
- Dexie.js for IndexedDB operations
- Speech Recognition API for voice features
- Local storage for offline functionality

### Cultural Considerations

- Tamil language support throughout
- South Indian festival calendar integration
- Role-based family dynamics (Amma, Appa, Paati, etc.)
- Traditional ritual and spiritual content
- Regional food and recipe management

### AI Integration Points

- Contextual prompt generation
- Voice-to-text conversion for recipes and journaling
- Intelligent scheduling and planning
- Cultural content suggestions

### Performance Requirements

- Offline-first architecture
- Fast loading times for mobile devices
- Efficient data synchronization
- Minimal battery impact for voice features

### Security & Privacy

- Local data storage only
- No external data transmission without consent
- Family privacy protection
- Secure handling of medical information

## Implementation Phases

### Phase 1: Foundation (Home & Household)

- Set up basic SvelteKit structure
- Implement home domain with grocery, chores, repairs
- Create data models and local storage
- Basic UI with Tailwind styling

### Phase 2: Core Features (Education, Meals, Rituals)

- Add education and learning modules
- Implement meal planning and recipes
- Create ritual and festival tracking
- Voice-to-text integration

### Phase 3: Wellness & Coordination

- Health and wellness management
- Calendar and event coordination
- Journaling with voice support
- Time management features

### Phase 4: Community & Travel

- Travel planning functionality
- Leisure activity management
- Community connection features
- Final polish and optimization

## Success Metrics

- Daily active users in family groups
- Task completion rates for household management
- User engagement with cultural content
- Voice feature adoption rates
- Offline functionality reliability
