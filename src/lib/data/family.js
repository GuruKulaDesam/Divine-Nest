// Family Management Data Models
// Based on South Indian Family Structure

export const FamilyRoles = {
  APPA: 'appa',
  AMMA: 'amma', 
  PAATI: 'paati',
  THATHA: 'thatha',
  AKKA: 'akka',
  THAMBI: 'thambi',
  CHITHI: 'chithi',
  MAMA: 'mama'
};

export const ExpenseCategories = {
  SPIRITUAL: 'spiritual',
  EDUCATION: 'education', 
  HEALTH: 'health',
  DIGITAL_SUBSCRIPTIONS: 'digital_subscriptions',
  TRANSPORT: 'transport',
  HOUSEHOLD: 'household',
  FOOD: 'food',
  ENTERTAINMENT: 'entertainment'
};

export const PaymentStatus = {
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  UPCOMING: 'upcoming'
};

// Sample Family Members
export const familyMembers = [
  {
    id: 1,
    name: "Raman",
    role: FamilyRoles.APPA,
    age: 52,
    avatar: "👨🏽‍💼",
    responsibilities: ["House rent", "Vehicle maintenance", "Insurance premiums"],
    monthlyBudget: 25000,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Lakshmi",
    role: FamilyRoles.AMMA,
    age: 48,
    avatar: "👩🏽‍🏫",
    responsibilities: ["Grocery shopping", "Utility bills", "Children's education"],
    monthlyBudget: 20000,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43211",
    whatsappNumber: "+91 98765 43211"
  },
  {
    id: 3,
    name: "Kamala",
    role: FamilyRoles.PAATI,
    age: 75,
    avatar: "👵🏽",
    responsibilities: ["Temple donations", "Medical expenses", "Festival preparations"],
    monthlyBudget: 8000,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43212",
    whatsappNumber: "+91 98765 43212"
  },
  {
    id: 4,
    name: "Krishnan",
    role: FamilyRoles.THATHA,
    age: 78,
    avatar: "👴🏽",
    responsibilities: ["Newspaper subscription", "Medical checkups", "Banking"],
    monthlyBudget: 6000,
    preferredLanguage: "tamil",
    phoneNumber: "+91 98765 43213",
    whatsappNumber: "+91 98765 43213"
  },
  {
    id: 5,
    name: "Priya",
    role: FamilyRoles.AKKA,
    age: 22,
    avatar: "👩🏽‍🎓",
    responsibilities: ["College fees", "Books", "Mobile recharge"],
    monthlyBudget: 12000,
    preferredLanguage: "english",
    phoneNumber: "+91 98765 43214",
    whatsappNumber: "+91 98765 43214"
  },
  {
    id: 6,
    name: "Arjun",
    role: FamilyRoles.THAMBI,
    age: 18,
    avatar: "👨🏽‍🎓",
    responsibilities: ["School fees", "Sports equipment", "Gaming subscriptions"],
    monthlyBudget: 8000,
    preferredLanguage: "english",
    phoneNumber: "+91 98765 43215",
    whatsappNumber: "+91 98765 43215"
  }
];

// Monthly Recharge Items
export const monthlyRecharges = [
  {
    id: 1,
    type: "mobile",
    provider: "Airtel",
    number: "98765 43210",
    amount: 599,
    dueDate: "2025-10-15",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 2,
    type: "mobile",
    provider: "Jio",
    number: "98765 43211",
    amount: 399,
    dueDate: "2025-10-12",
    assignedTo: familyMembers[1], // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 3,
    type: "broadband",
    provider: "BSNL Fiber",
    plan: "100 Mbps Unlimited",
    amount: 849,
    dueDate: "2025-10-20",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.DIGITAL_SUBSCRIPTIONS
  },
  {
    id: 4,
    type: "dth",
    provider: "Tata Sky",
    plan: "South Plus HD",
    amount: 315,
    dueDate: "2025-10-25",
    assignedTo: familyMembers[1], // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  },
  {
    id: 5,
    type: "electricity",
    provider: "TNEB",
    account: "240156789012",
    amount: 1200,
    dueDate: "2025-10-30",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 6,
    type: "water",
    provider: "Chennai Metro Water",
    account: "CW98765432",
    amount: 180,
    dueDate: "2025-10-28",
    assignedTo: familyMembers[1], // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 7,
    type: "gas",
    provider: "Indane Gas",
    connection: "17654321890",
    amount: 450,
    dueDate: "2025-10-22",
    assignedTo: familyMembers[1], // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  },
  {
    id: 8,
    type: "streaming",
    provider: "Netflix",
    plan: "Premium",
    amount: 649,
    dueDate: "2025-10-18",
    assignedTo: familyMembers[4], // Akka
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  },
  {
    id: 9,
    type: "streaming",
    provider: "Amazon Prime",
    plan: "Annual",
    amount: 1499,
    dueDate: "2025-10-15",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.ENTERTAINMENT
  }
];

// Calculate total monthly recharge amount
export const totalMonthlyRecharges = monthlyRecharges.reduce((total, item) => total + item.amount, 0);

// Yearly Renewals
export const yearlyRenewals = [
  {
    id: 1,
    type: "life_insurance",
    provider: "LIC",
    policyNumber: "240156789",
    amount: 24000,
    dueDate: "2025-12-15",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HEALTH
  },
  {
    id: 2,
    type: "health_insurance",
    provider: "Star Health",
    policyNumber: "SH9876543",
    amount: 18500,
    dueDate: "2025-11-20",
    assignedTo: familyMembers[1], // Amma
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HEALTH
  },
  {
    id: 3,
    type: "vehicle_insurance",
    provider: "ICICI Lombard",
    vehicleNumber: "TN 09 AB 1234",
    amount: 8200,
    dueDate: "2026-03-10",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.TRANSPORT
  },
  {
    id: 4,
    type: "property_tax",
    provider: "Chennai Corporation",
    propertyId: "CC/2024/789456",
    amount: 12000,
    dueDate: "2026-03-31",
    assignedTo: familyMembers[0], // Appa
    status: PaymentStatus.UPCOMING,
    category: ExpenseCategories.HOUSEHOLD
  }
];

// Calculate total yearly renewal amount
export const totalYearlyRenewals = yearlyRenewals.reduce((total, item) => total + item.amount, 0);

// Expense tracking categories with Tamil translations
export const expenseCategories = [
  {
    id: ExpenseCategories.SPIRITUAL,
    name: "Spiritual & Cultural",
    nameTamil: "ஆன்மிகம் மற்றும் பண்பாடு",
    icon: "🕉️",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    examples: ["Temple donations", "Festival celebrations", "Puja items", "Religious books"]
  },
  {
    id: ExpenseCategories.EDUCATION,
    name: "Education",
    nameTamil: "கல்வி",
    icon: "📚",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    examples: ["School fees", "Tuition", "Books", "Educational supplies"]
  },
  {
    id: ExpenseCategories.HEALTH,
    name: "Health & Medical",
    nameTamil: "உடல்நலம் மற்றும் மருத்துவம்",
    icon: "💊",
    color: "text-green-600", 
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    examples: ["Doctor visits", "Medicines", "Health insurance", "Medical tests"]
  },
  {
    id: ExpenseCategories.DIGITAL_SUBSCRIPTIONS,
    name: "Digital & Subscriptions",
    nameTamil: "டிஜிட்டல் மற்றும் சந்தாக்கள்",
    icon: "📱",
    color: "text-purple-600",
    bgColor: "bg-purple-50", 
    borderColor: "border-purple-200",
    examples: ["Mobile recharge", "Internet", "Streaming services", "App subscriptions"]
  },
  {
    id: ExpenseCategories.TRANSPORT,
    name: "Transport & Vehicle",
    nameTamil: "போக்குவரத்து மற்றும் வாகனம்",
    icon: "🚗",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    examples: ["Fuel", "Vehicle maintenance", "Auto/taxi", "Public transport"]
  },
  {
    id: ExpenseCategories.HOUSEHOLD,
    name: "Household & Utilities",
    nameTamil: "வீட்டு மற்றும் பயன்பாடுகள்",
    icon: "🏠",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    examples: ["Electricity", "Water", "Gas", "House maintenance", "Cleaning supplies"]
  },
  {
    id: ExpenseCategories.FOOD,
    name: "Food & Groceries",
    nameTamil: "உணவு மற்றும் மளிகை",
    icon: "🛒",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    examples: ["Groceries", "Vegetables", "Dairy", "Eating out", "Snacks"]
  },
  {
    id: ExpenseCategories.ENTERTAINMENT,
    name: "Entertainment & Leisure",
    nameTamil: "பொழுதுபோக்கு மற்றும் விளையாட்டு",
    icon: "🎬",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    examples: ["Movies", "Games", "Outings", "Hobbies", "Sports"]
  }
];

// Notification templates
export const notificationTemplates = {
  sms: {
    tamil: {
      reminder: "வணக்கம் {name}! உங்கள் {service} பில் ₹{amount} {date} அன்று செலுத்த வேண்டும். - குடும்பம்",
      overdue: "வணக்கம் {name}! உங்கள் {service} பில் ₹{amount} தாமதமாகிவிட்டது. உடனே செலுத்தவும். - குடும்பம்"
    },
    english: {
      reminder: "Hi {name}! Your {service} bill of ₹{amount} is due on {date}. Please pay on time. - Family",
      overdue: "Hi {name}! Your {service} bill of ₹{amount} is overdue. Please pay immediately. - Family"
    }
  },
  whatsapp: {
    tamil: {
      reminder: "🙏 வணக்கம் {name}!\n\n💰 உங்கள் {service} பில்:\n• தொகை: ₹{amount}\n• கடைசி தேதி: {date}\n\n📅 நேரத்தில் செலுத்த மறக்காதீர்கள்!\n\n💖 அன்புடன்,\nகுடும்பம்",
      overdue: "⚠️ கவனம் {name}!\n\n💸 தாமதமான பில்:\n• {service}: ₹{amount}\n• கடைசி தேதி: {date}\n\n🚨 உடனே செலுத்தவும்!\n\n💖 அன்புடன்,\nகுடும்பம்"
    },
    english: {
      reminder: "🙏 Hi {name}!\n\n💰 Your {service} bill:\n• Amount: ₹{amount}\n• Due date: {date}\n\n📅 Please pay on time!\n\n💖 With love,\nFamily",
      overdue: "⚠️ Attention {name}!\n\n💸 Overdue bill:\n• {service}: ₹{amount}\n• Due date: {date}\n\n🚨 Please pay immediately!\n\n💖 With love,\nFamily"
    }
  }
};