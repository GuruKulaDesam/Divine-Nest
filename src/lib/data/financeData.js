// Enhanced Finance Data for South Indian Homemaker-Centric Finance Suite
// Rooted in South Indian family life, designed for clarity, calm, and control

// Expense Categories with Tamil-English labels
export const ExpenseCategories = {
  GROCERIES: {
    id: 'groceries',
    name: 'Groceries',
    tamil: 'கிராசரி',
    icon: '🛒',
    color: 'green',
    subcategories: ['vegetables', 'rice_dal', 'spices', 'oil', 'snacks']
  },
  POOJA: {
    id: 'pooja',
    name: 'Pooja Items',
    tamil: 'பூஜை பொருட்கள்',
    icon: '🪔',
    color: 'orange',
    subcategories: ['flowers', 'camphor', 'agarbatti', 'prasadam', 'decorations']
  },
  EDUCATION: {
    id: 'education',
    name: 'Education',
    tamil: 'கல்வி',
    icon: '📚',
    color: 'blue',
    subcategories: ['tuition', 'books', 'uniform', 'transport', 'exam_fees']
  },
  HEALTH: {
    id: 'health',
    name: 'Health',
    tamil: 'சுகாதாரம்',
    icon: '🏥',
    color: 'red',
    subcategories: ['medicines', 'doctor', 'lab_tests', 'ayurveda', 'supplements']
  },
  TRANSPORT: {
    id: 'transport',
    name: 'Transport',
    tamil: 'போக்குவரத்து',
    icon: '🚗',
    color: 'purple',
    subcategories: ['auto', 'bus', 'fuel', 'maintenance', 'parking']
  },
  HOUSEHOLD: {
    id: 'household',
    name: 'Household',
    tamil: 'வீட்டுக்கு தேவையான',
    icon: '🏠',
    color: 'teal',
    subcategories: ['cleaning', 'repair', 'utilities', 'furniture', 'appliances']
  },
  GIFTS: {
    id: 'gifts',
    name: 'Gifts & Donations',
    tamil: 'பரிசுகள் & தானம்',
    icon: '🎁',
    color: 'pink',
    subcategories: ['birthdays', 'weddings', 'temple', 'charity', 'festivals']
  },
  FESTIVALS: {
    id: 'festivals',
    name: 'Festivals',
    tamil: 'திருவிழாக்கள்',
    icon: '🎊',
    color: 'yellow',
    subcategories: ['diwali', 'pongal', 'navaratri', 'karthigai', 'others']
  }
};

// Family Roles with Tamil names and responsibilities
export const FamilyRoles = {
  APPA: {
    id: 'appa',
    name: 'Appa',
    tamil: 'அப்பா',
    relation: 'Father',
    responsibilities: ['fuel', 'insurance', 'property_tax', 'major_purchases'],
    icon: '👨',
    color: 'blue'
  },
  AMMA: {
    id: 'amma',
    name: 'Amma',
    tamil: 'அம்மா',
    relation: 'Mother',
    responsibilities: ['groceries', 'household', 'children_needs', 'pooja'],
    icon: '👩',
    color: 'pink'
  },
  PAATI: {
    id: 'paati',
    name: 'Paati',
    tamil: 'பாட்டி',
    relation: 'Grandmother',
    responsibilities: ['medicines', 'temple_offerings', 'gold_savings'],
    icon: '👵',
    color: 'purple'
  },
  THATHA: {
    id: 'thatha',
    name: 'Thatha',
    tamil: 'தாத்தா',
    relation: 'Grandfather',
    responsibilities: ['pension_management', 'investments', 'property_documents'],
    icon: '👴',
    color: 'brown'
  },
  AKKA: {
    id: 'akka',
    name: 'Akka',
    tamil: 'அக்கா',
    relation: 'Elder Sister',
    responsibilities: ['education_expenses', 'personal_items', 'helping_amma'],
    icon: '👧',
    color: 'green'
  },
  THAMBI: {
    id: 'thambi',
    name: 'Thambi',
    tamil: 'தம்பி',
    relation: 'Younger Brother',
    responsibilities: ['school_expenses', 'sports', 'pocket_money'],
    icon: '👦',
    color: 'orange'
  }
};

// Festivals with dates and traditional expenses
export const TamilFestivals = {
  DIWALI: {
    id: 'diwali',
    name: 'Diwali',
    tamil: 'தீபாவளி',
    date: '2025-10-20',
    duration: 5,
    typical_expenses: ['sweets', 'crackers', 'clothes', 'gifts', 'pooja_items'],
    budget_range: { min: 15000, max: 40000 }
  },
  PONGAL: {
    id: 'pongal',
    name: 'Pongal',
    tamil: 'பொங்கல்',
    date: '2026-01-14',
    duration: 4,
    typical_expenses: ['rice', 'jaggery', 'milk', 'sugarcane', 'new_clothes'],
    budget_range: { min: 8000, max: 20000 }
  },
  NAVARATRI: {
    id: 'navaratri',
    name: 'Navaratri',
    tamil: 'நவராத்திரி',
    date: '2025-09-22',
    duration: 9,
    typical_expenses: ['golu_dolls', 'flowers', 'fruits', 'decorations'],
    budget_range: { min: 10000, max: 25000 }
  },
  KARTHIGAI_DEEPAM: {
    id: 'karthigai',
    name: 'Karthigai Deepam',
    tamil: 'கார்த்திகை தீபம்',
    date: '2025-11-15',
    duration: 1,
    typical_expenses: ['oil', 'wicks', 'diyas', 'special_food'],
    budget_range: { min: 3000, max: 8000 }
  }
};

// Gold and Silver tracking
export const WealthCategories = {
  GOLD: {
    id: 'gold',
    name: 'Gold',
    tamil: 'தங்கம்',
    unit: 'grams',
    current_rate: 6800, // per gram
    types: ['jewelry', 'coins', 'bars', 'ornaments']
  },
  SILVER: {
    id: 'silver',
    name: 'Silver',
    tamil: 'வெள்ளி',
    unit: 'grams',
    current_rate: 95, // per gram
    types: ['pooja_items', 'coins', 'vessels', 'jewelry']
  }
};

// Sample wealth data
export const wealthHoldings = [
  {
    id: 'w001',
    type: 'gold',
    category: 'jewelry',
    name: 'Akka Wedding Necklace',
    tamil_name: 'அக்கா கல்யாண ஹார்',
    weight: 25.5,
    purity: 22,
    purchase_date: '2024-03-15',
    purchase_rate: 6500,
    current_value: 173400,
    purpose: 'wedding_gift',
    location: 'bank_locker',
    notes: 'For Akka future wedding'
  },
  {
    id: 'w002',
    type: 'silver',
    category: 'pooja_items',
    name: 'Pooja Silver Set',
    tamil_name: 'பூஜை வெள்ளி செட்',
    weight: 150,
    purity: 99,
    purchase_date: '2023-12-01',
    purchase_rate: 85,
    current_value: 14250,
    purpose: 'daily_pooja',
    location: 'pooja_room',
    notes: 'Paati gifted for new home'
  }
];

// Insurance types
export const InsuranceTypes = {
  HEALTH: {
    id: 'health',
    name: 'Health Insurance',
    tamil: 'சுகாதார காப்பீடு',
    icon: '🏥',
    color: 'red'
  },
  LIFE: {
    id: 'life',
    name: 'Life Insurance',
    tamil: 'ஜீவன் காப்பீடு',
    icon: '🛡️',
    color: 'blue'
  },
  VEHICLE: {
    id: 'vehicle',
    name: 'Vehicle Insurance',
    tamil: 'வாகன காப்பீடு',
    icon: '🚗',
    color: 'green'
  },
  PROPERTY: {
    id: 'property',
    name: 'Property Insurance',
    tamil: 'சொத்து காப்பீடு',
    icon: '🏠',
    color: 'purple'
  }
};

// Savings goals
export const savingsGoals = [
  {
    id: 'sg001',
    title: 'Akka College Fees',
    tamil_title: 'அக்கா கல்லூரி கட்டணம்',
    target_amount: 500000,
    current_amount: 125000,
    target_date: '2026-06-01',
    category: 'education',
    priority: 'high',
    contributors: ['appa', 'amma', 'thatha'],
    monthly_target: 15625
  },
  {
    id: 'sg002',
    title: 'Emergency Fund',
    tamil_title: 'அவசர நிதி',
    target_amount: 200000,
    current_amount: 75000,
    target_date: '2025-12-31',
    category: 'emergency',
    priority: 'high',
    contributors: ['appa', 'amma'],
    monthly_target: 6250
  },
  {
    id: 'sg003',
    title: 'Goa Family Trip',
    tamil_title: 'குடும்ப கோவா பயணம்',
    target_amount: 80000,
    current_amount: 32000,
    target_date: '2025-12-20',
    category: 'travel',
    priority: 'medium',
    contributors: ['all_family'],
    monthly_target: 2400
  }
];

// Property and civic dues
export const propertyDues = [
  {
    id: 'pd001',
    type: 'house_tax',
    name: 'Property Tax',
    tamil_name: 'வீட்டு வரி',
    amount: 12500,
    due_date: '2025-03-31',
    financial_year: '2024-25',
    status: 'pending',
    penalty_after: '2025-04-15'
  },
  {
    id: 'pd002',
    type: 'water_tax',
    name: 'Water Tax',
    tamil_name: 'தண்ணீர் வரி',
    amount: 3600,
    due_date: '2025-10-31',
    financial_year: '2024-25',
    status: 'paid',
    paid_date: '2025-09-15'
  }
];

// Vendor database
export const trustedVendors = [
  {
    id: 'v001',
    name: 'Murugan Grocery',
    tamil_name: 'முruகன் கிராசரி',
    type: 'grocery',
    phone: '9876543210',
    address: 'Kovaipudur Main Road',
    specialty: 'Fresh vegetables, good quality rice',
    last_visit: '2025-10-05',
    rating: 5,
    notes: 'Gives good discount for bulk purchases'
  },
  {
    id: 'v002',
    name: 'Lakshmi Flower Shop',
    tamil_name: 'லட்சுமி பூ கடை',
    type: 'flowers',
    phone: '9876543211',
    address: 'Near Kovaipudur Temple',
    specialty: 'Fresh jasmine, rose, marigold',
    last_visit: '2025-10-06',
    rating: 5,
    notes: 'Best flowers for daily pooja'
  }
];

// Milestone templates
export const milestoneTemplates = {
  PUBERTY_CEREMONY: {
    id: 'puberty',
    name: 'Puberty Ceremony',
    tamil_name: 'பூப்புனித நேரம்',
    typical_guests: 50,
    duration_days: 1,
    budget_ranges: {
      simple: { min: 25000, max: 50000 },
      moderate: { min: 50000, max: 100000 },
      grand: { min: 100000, max: 200000 }
    },
    essential_items: [
      { item: 'sarees', tamil: 'சேலைகள்', quantity: 3, estimated_cost: 15000 },
      { item: 'jewelry', tamil: 'ஆபரணங்கள்', quantity: 1, estimated_cost: 25000 },
      { item: 'food', tamil: 'உணவு', quantity: 50, estimated_cost: 20000 },
      { item: 'priest_dakshina', tamil: 'குருக்கள் தட்சிணை', quantity: 1, estimated_cost: 5000 }
    ]
  },
  WEDDING: {
    id: 'wedding',
    name: 'Wedding',
    tamil_name: 'திருமணம்',
    typical_guests: 500,
    duration_days: 3,
    budget_ranges: {
      simple: { min: 500000, max: 1000000 },
      moderate: { min: 1000000, max: 2000000 },
      grand: { min: 2000000, max: 5000000 }
    }
  }
};

// Emergency preparedness checklist
export const emergencyPreparedness = {
  MONSOON: {
    category: 'monsoon',
    name: 'Monsoon Preparedness',
    tamil_name: 'மழைக்கால தயாரிப்பு',
    checklist: [
      { item: 'emergency_lights', tamil: 'அவசர விளக்குகள்', status: 'pending' },
      { item: 'water_storage', tamil: 'தண்ணீர் சேமிப்பு', status: 'done' },
      { item: 'medicine_kit', tamil: 'மருந்து பெட்டி', status: 'pending' },
      { item: 'dry_ration', tamil: 'உலர் ரேஷன்', status: 'done' }
    ]
  },
  POWER_CUT: {
    category: 'power_cut',
    name: 'Power Cut Preparedness',
    tamil_name: 'மின்சாரம் துண்டிப்பு தயாரிப்பு',
    checklist: [
      { item: 'inverter_battery', tamil: 'இன்வர்ட்டர் பேட்டரி', status: 'done' },
      { item: 'emergency_fan', tamil: 'அவசர விசிறி', status: 'pending' },
      { item: 'torch_lights', tamil: 'டார்ச் லைட்', status: 'done' }
    ]
  }
};

// AI prompt templates for different contexts
export const aiPromptTemplates = {
  EXPENSE_ANALYSIS: "Analyze last month's expenses and suggest 3 areas where the family can save money while maintaining their lifestyle",
  FESTIVAL_BUDGET: "Create a detailed budget for {festival} celebration for a family of 6 with traditional items and modern touches",
  SAVINGS_PLAN: "Design a 12-month savings plan for {goal} worth ₹{amount} with monthly milestones and family contribution suggestions",
  VENDOR_RECOMMENDATIONS: "Based on recent purchases, recommend trusted vendors in Kovaipudur for {category} with quality and price considerations",
  EMERGENCY_PREP: "Generate a {season} preparedness checklist for a 2-floor home in Kovaipudur with family of 6 including elderly members"
};

// Export all for easy importing
export default {
  ExpenseCategories,
  FamilyRoles,
  TamilFestivals,
  WealthCategories,
  wealthHoldings,
  InsuranceTypes,
  savingsGoals,
  propertyDues,
  trustedVendors,
  milestoneTemplates,
  emergencyPreparedness,
  aiPromptTemplates
};