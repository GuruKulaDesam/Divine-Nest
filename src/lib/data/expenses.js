// Comprehensive Expense & Budget Data for South Indian Family
export const expenseCategories = {
  spiritual: {
    id: 'spiritual',
    name: 'Spiritual & Cultural',
    icon: 'heroicons:sparkles',
    color: 'from-orange-500 to-yellow-500',
    items: [
      { name: 'Temple donations', frequency: 'monthly', amount: 500, notes: 'Local temples, annadhanam' },
      { name: 'Pooja items', frequency: 'monthly', amount: 300, notes: 'Camphor, agarbatti, oil, flowers' },
      { name: 'Festival prep', frequency: 'seasonal', amount: 1200, notes: 'Diwali, Pongal, Navaratri' },
      { name: 'Astrologer consultation', frequency: 'quarterly', amount: 800, notes: 'Horoscope, muhurtham' },
      { name: 'Veda/chanting classes', frequency: 'monthly', amount: 600, notes: 'For children or elders' },
      { name: 'Bhajan group contribution', frequency: 'monthly', amount: 200, notes: 'Local satsang' }
    ]
  },
  
  education: {
    id: 'education',
    name: 'Education & Learning',
    icon: 'heroicons:academic-cap',
    color: 'from-blue-500 to-indigo-500',
    items: [
      { name: 'School fees', frequency: 'term', amount: 15000, notes: 'CBSE or Matric' },
      { name: 'Tuition fees', frequency: 'monthly', amount: 2500, notes: 'Math, Science, Tamil coaching' },
      { name: 'Online learning', frequency: 'monthly', amount: 500, notes: 'Byjus, Vedantu, Khan Academy' },
      { name: 'Books & stationery', frequency: 'monthly', amount: 800, notes: 'Textbooks, notebooks, pens' },
      { name: 'Exam registration', frequency: 'seasonal', amount: 1000, notes: 'Olympiads, JEE, NEET' },
      { name: 'Field trips', frequency: 'seasonal', amount: 600, notes: 'School outings' }
    ]
  },

  wellness: {
    id: 'wellness',
    name: 'Wellness & Health',
    icon: 'heroicons:heart',
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'Health insurance', frequency: 'yearly', amount: 25000, notes: 'Family floater plan' },
      { name: 'Ayurvedic medicines', frequency: 'monthly', amount: 600, notes: 'Paati/Thatha routines' },
      { name: 'Yoga class fees', frequency: 'monthly', amount: 500, notes: 'Amma wellness routine' },
      { name: 'Gym membership', frequency: 'monthly', amount: 800, notes: 'Appa or Thambi' },
      { name: 'Doctor visits', frequency: 'as_needed', amount: 1000, notes: 'Checkups, consultations' },
      { name: 'Supplements', frequency: 'monthly', amount: 400, notes: 'Iron, calcium, multivitamins' }
    ]
  },

  digital: {
    id: 'digital',
    name: 'Digital & Entertainment',
    icon: 'heroicons:device-phone-mobile',
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'OTT subscriptions', frequency: 'monthly', amount: 800, notes: 'Netflix, Prime, Hotstar, SunNXT' },
      { name: 'Music apps', frequency: 'monthly', amount: 200, notes: 'Spotify, Raaga, Gaana' },
      { name: 'YouTube Premium', frequency: 'monthly', amount: 129, notes: 'Ad-free viewing for kids' },
      { name: 'Cloud storage', frequency: 'monthly', amount: 130, notes: 'Google One, iCloud' },
      { name: 'Antivirus software', frequency: 'yearly', amount: 1500, notes: 'Family laptops protection' },
      { name: 'Photo backup service', frequency: 'yearly', amount: 800, notes: 'Family memories archive' }
    ]
  },

  transport: {
    id: 'transport',
    name: 'Transport & Vehicle',
    icon: 'heroicons:truck',
    color: 'from-cyan-500 to-blue-500',
    items: [
      { name: 'Fuel', frequency: 'weekly', amount: 2000, notes: 'Petrol for bike/car/scooter' },
      { name: 'Vehicle insurance', frequency: 'yearly', amount: 8000, notes: 'Bike, car, scooter combined' },
      { name: 'Service & maintenance', frequency: 'quarterly', amount: 3000, notes: 'Oil change, AC check' },
      { name: 'PUC certificate', frequency: 'yearly', amount: 300, notes: 'Pollution check' },
      { name: 'Parking fees', frequency: 'monthly', amount: 500, notes: 'Apartment or school' },
      { name: 'Auto/cab expenses', frequency: 'weekly', amount: 800, notes: 'School drop, temple visits' }
    ]
  },

  household: {
    id: 'household',
    name: 'Household & Lifestyle',
    icon: 'heroicons:home',
    color: 'from-amber-500 to-orange-500',
    items: [
      { name: 'Groceries', frequency: 'weekly', amount: 6000, notes: 'Rice, dal, vegetables, snacks' },
      { name: 'Cleaning supplies', frequency: 'monthly', amount: 300, notes: 'Phenyl, mop, dish soap' },
      { name: 'Gas cylinder', frequency: 'monthly', amount: 900, notes: 'Cooking fuel' },
      { name: 'Electricity & water', frequency: 'monthly', amount: 2000, notes: 'EB and municipal water' },
      { name: 'Broadband & mobile', frequency: 'monthly', amount: 1500, notes: 'Airtel, Jio, BSNL' },
      { name: 'DTH recharge', frequency: 'monthly', amount: 350, notes: 'Tata Sky, Sun Direct' },
      { name: 'Domestic help', frequency: 'monthly', amount: 3000, notes: 'Cooking, cleaning, elder care' },
      { name: 'Appliance repair', frequency: 'as_needed', amount: 800, notes: 'Fan, fridge, grinder, AC' }
    ]
  },

  milestones: {
    id: 'milestones',
    name: 'Milestones & Gifting',
    icon: 'heroicons:gift',
    color: 'from-rose-500 to-pink-500',
    items: [
      { name: 'Birthday gifts', frequency: 'monthly', amount: 1000, notes: 'Family and friends' },
      { name: 'Wedding gifts', frequency: 'seasonal', amount: 5000, notes: 'Gold coins, silver items' },
      { name: 'Housewarming expenses', frequency: 'one_time', amount: 3000, notes: 'Rituals, food, decor' },
      { name: 'Retirement planning', frequency: 'monthly', amount: 5000, notes: 'SIPs, insurance, gold' },
      { name: 'Pilgrimage savings', frequency: 'yearly', amount: 15000, notes: 'Tirupati, Rameswaram' },
      { name: 'Family trip budget', frequency: 'yearly', amount: 25000, notes: 'Ooty, Kodaikanal, Kerala' }
    ]
  },

  property: {
    id: 'property',
    name: 'Property & Civic Dues',
    icon: 'heroicons:building-office',
    color: 'from-gray-500 to-slate-500',
    items: [
      { name: 'House tax', frequency: 'yearly', amount: 4200, notes: 'Coimbatore Corporation' },
      { name: 'Water tax', frequency: 'yearly', amount: 1200, notes: 'Municipal water connection' },
      { name: 'Sewage/drainage fee', frequency: 'yearly', amount: 800, notes: 'Bundled with water tax' },
      { name: 'Property registration', frequency: 'one_time', amount: 50000, notes: 'During purchase/transfer' },
      { name: 'Building plan approval', frequency: 'one_time', amount: 5000, notes: 'New construction/renovation' },
      { name: 'Vacant land tax', frequency: 'yearly', amount: 2000, notes: 'If applicable for plots' }
    ]
  }
};

// Monthly Budget Planner
export const monthlyBudget = {
  october2024: {
    month: 'October 2024',
    planned: {
      groceries: 6000,
      utilities: 2000,
      mobile_internet: 1500,
      dth_ott: 800,
      pooja_rituals: 500,
      cleaning: 300,
      health_wellness: 1000,
      education: 2500,
      transport: 2000,
      gifting_events: 1000,
      miscellaneous: 1000
    },
    actual: {
      groceries: 6300,
      utilities: 2200,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 700,
      cleaning: 300,
      health_wellness: 1100,
      education: 2500,
      transport: 2100,
      gifting_events: 1000,
      miscellaneous: 1300
    },
    notes: {
      groceries: 'Diwali sweets and snacks',
      utilities: 'AC usage in October heat',
      pooja_rituals: 'Extra temple visits for Navaratri',
      transport: 'Festival shopping trips'
    }
  },
  
  predicted_november: {
    month: 'November 2024',
    estimated: {
      groceries: 6400,
      utilities: 2300,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 1200,
      cleaning: 400,
      health_wellness: 1100,
      education: 2500,
      transport: 2300,
      gifting_events: 2000,
      miscellaneous: 1500
    },
    reasoning: {
      groceries: 'Diwali sweets preparation',
      utilities: 'Festive lighting increases EB usage',
      pooja_rituals: 'Diwali prep: lamps, flowers, oil',
      cleaning: 'Deep cleaning before Diwali',
      transport: 'Extra shopping and temple visits',
      gifting_events: 'Diwali gifting: sweets, silver coins',
      miscellaneous: 'Festival outings, clothes, decor'
    }
  }
};

// Expense history for analytics
export const expenseHistory = [
  {
    month: 'August 2024',
    categories: {
      groceries: 6200,
      utilities: 2100,
      mobile_internet: 1400,
      dth_ott: 850,
      pooja_rituals: 600,
      cleaning: 300,
      health_wellness: 1000,
      education: 2500,
      transport: 2000,
      gifting_events: 1000,
      miscellaneous: 1200
    },
    total: 19150
  },
  {
    month: 'September 2024',
    categories: {
      groceries: 6500,
      utilities: 2000,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 500,
      cleaning: 350,
      health_wellness: 1200,
      education: 2500,
      transport: 2200,
      gifting_events: 1200,
      miscellaneous: 1000
    },
    total: 19800
  },
  {
    month: 'October 2024',
    categories: {
      groceries: 6300,
      utilities: 2200,
      mobile_internet: 1500,
      dth_ott: 850,
      pooja_rituals: 700,
      cleaning: 300,
      health_wellness: 1100,
      education: 2500,
      transport: 2100,
      gifting_events: 1000,
      miscellaneous: 1300
    },
    total: 19850
  }
];

// Subscription tracker
export const subscriptions = [
  {
    type: 'Mobile',
    member: 'Appa',
    provider: 'Jio',
    plan: '₹299/month',
    renewalDate: '2024-10-10',
    status: 'active',
    autoRenewal: true
  },
  {
    type: 'Mobile',
    member: 'Amma',
    provider: 'Airtel',
    plan: '₹199/month',
    renewalDate: '2024-10-12',
    status: 'active',
    autoRenewal: true
  },
  {
    type: 'Broadband',
    member: 'Family',
    provider: 'BSNL Fiber',
    plan: '₹999/month',
    renewalDate: '2024-10-15',
    status: 'active',
    autoRenewal: false
  },
  {
    type: 'DTH',
    member: 'Family',
    provider: 'Tata Sky',
    plan: '₹350/month',
    renewalDate: '2024-10-20',
    status: 'active',
    autoRenewal: true
  },
  {
    type: 'OTT',
    member: 'Akka + Thambi',
    provider: 'Prime Video',
    plan: '₹1,499/year',
    renewalDate: '2024-11-01',
    status: 'upcoming',
    autoRenewal: false
  },
  {
    type: 'OTT',
    member: 'Paati',
    provider: 'SunNXT',
    plan: '₹799/year',
    renewalDate: '2024-12-15',
    status: 'upcoming',
    autoRenewal: false
  },
  {
    type: 'Fitness',
    member: 'Amma',
    provider: 'Yoga Class',
    plan: '₹500/month',
    renewalDate: '2024-10-08',
    status: 'active',
    autoRenewal: false
  },
  {
    type: 'Education',
    member: 'Thambi',
    provider: 'Math Tuition',
    plan: '₹1,200/month',
    renewalDate: '2024-10-05',
    status: 'paid',
    autoRenewal: false
  },
  {
    type: 'Education',
    member: 'Akka',
    provider: 'Science Tuition',
    plan: '₹1,300/month',
    renewalDate: '2024-10-06',
    status: 'paid',
    autoRenewal: false
  }
];

// Property taxes and civic dues
export const propertyTaxes = [
  {
    id: 'house_tax_2024',
    type: 'house',
    name: 'House Tax',
    amount: 4200,
    dueDate: '2024-03-31',
    status: 'paid',
    propertyAddress: 'Kovaipudur, Coimbatore',
    paymentDate: '2024-03-15',
    receiptNumber: 'CT2024/12345'
  },
  {
    id: 'water_tax_2024',
    type: 'water',
    name: 'Water Tax',
    amount: 1200,
    dueDate: '2024-10-15',
    status: 'pending',
    propertyAddress: 'Kovaipudur, Coimbatore',
    notes: 'Bill available online'
  },
  {
    id: 'sewage_fee_2024',
    type: 'sewage',
    name: 'Sewage/Drainage Fee',
    amount: 800,
    dueDate: '2024-10-15',
    status: 'pending',
    propertyAddress: 'Kovaipudur, Coimbatore',
    notes: 'Bundled with water tax'
  }
];

// Budget analysis helpers
export function calculateMonthlyAverage(history) {
  const total = history.reduce((sum, month) => sum + month.total, 0);
  return Math.round(total / history.length);
}

export function getCategoryTrend(history, category) {
  return history.map(month => ({
    month: month.month,
    amount: month.categories[category] || 0
  }));
}

export function getUpcomingRenewals(days = 30) {
  const today = new Date();
  const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return subscriptions.filter(sub => {
    const renewalDate = new Date(sub.renewalDate);
    return renewalDate >= today && renewalDate <= futureDate;
  });
}

export function getPendingTaxes() {
  return propertyTaxes.filter(tax => tax.status === 'pending');
}

// AI prompt suggestions
export const aiPrompts = {
  budget: [
    "Generate a Diwali-specific budget with gifting, pooja, and sweets",
    "Compare last year's Diwali spend with this year's prediction",
    "Suggest ways to reduce grocery and transport costs during festive season",
    "Create a monthly budget summary for Appa with actionable insights"
  ],
  subscriptions: [
    "Remind Amma to renew yoga class on Oct 8",
    "Generate WhatsApp summary of active subscriptions for Appa",
    "Estimate annual spend on digital services and suggest bundling options",
    "Alert me about all renewals due in the next 2 weeks"
  ],
  taxes: [
    "Summarize all property-related dues for this financial year",
    "Create a payment calendar for all house taxes and civic dues",
    "Remind about water tax payment before Oct 15 to avoid late fee",
    "Generate a property document checklist for house sale preparation"
  ]
};