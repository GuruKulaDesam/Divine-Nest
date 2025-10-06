// Kitchen Management Data for South Indian Vegetarian Household
// Designed for families with school-going children, elders, and festival rhythms

export const PantryCategories = {
  staples: {
    name: "Staples",
    tamil: "முக்கிய உணவு பொருட்கள்",
    icon: "heroicons:archive-box",
    items: [
      { name: "Raw Rice", tamil: "பச்சை அரிசி", unit: "kg", quantity: 25, minStock: 5, expiry: null },
      { name: "Idli Rice", tamil: "இட்லி அரிசி", unit: "kg", quantity: 5, minStock: 1, expiry: null },
      { name: "Toor Dal", tamil: "துவரம் பருப்பு", unit: "kg", quantity: 2, minStock: 0.5, expiry: "2025-12-01" },
      { name: "Moong Dal", tamil: "பாசி பருப்பு", unit: "kg", quantity: 1, minStock: 0.3, expiry: "2025-11-15" },
      { name: "Urad Dal", tamil: "உளுந்து", unit: "kg", quantity: 1.5, minStock: 0.5, expiry: "2025-10-30" },
      { name: "Chana Dal", tamil: "கடலை பருப்பு", unit: "kg", quantity: 1, minStock: 0.3, expiry: "2025-11-20" },
      { name: "Rava/Semolina", tamil: "ரவை", unit: "kg", quantity: 2, minStock: 0.5, expiry: "2025-12-15" }
    ]
  },
  spices: {
    name: "Spices",
    tamil: "மசாலாப் பொருட்கள்",
    icon: "heroicons:sparkles",
    items: [
      { name: "Mustard Seeds", tamil: "கடுகு", unit: "g", quantity: 200, minStock: 50, expiry: "2026-01-01" },
      { name: "Cumin Seeds", tamil: "சீரகம்", unit: "g", quantity: 150, minStock: 30, expiry: "2025-12-31" },
      { name: "Fenugreek", tamil: "வெந்தயம்", unit: "g", quantity: 100, minStock: 20, expiry: "2025-11-30" },
      { name: "Turmeric Powder", tamil: "மஞ்சள் தூள்", unit: "g", quantity: 500, minStock: 100, expiry: "2025-08-15" },
      { name: "Red Chilli Powder", tamil: "மிளகாய் தூள்", unit: "g", quantity: 250, minStock: 50, expiry: "2025-09-01" },
      { name: "Asafoetida", tamil: "பெருங்காயம்", unit: "g", quantity: 50, minStock: 10, expiry: "2026-03-01" },
      { name: "Garam Masala", tamil: "கரம் மசாலா", unit: "g", quantity: 100, minStock: 20, expiry: "2025-12-01" }
    ]
  },
  oils: {
    name: "Oils & Fats",
    tamil: "எண்ணெய் மற்றும் நெய்",
    icon: "heroicons:beaker",
    items: [
      { name: "Gingelly Oil", tamil: "நல்லெண்ணெய்", unit: "L", quantity: 2, minStock: 0.5, expiry: "2025-12-01" },
      { name: "Groundnut Oil", tamil: "கடலை எண்ணெய்", unit: "L", quantity: 1, minStock: 0.3, expiry: "2025-11-15" },
      { name: "Coconut Oil", tamil: "தேங்காய் எண்ணெய்", unit: "L", quantity: 0.5, minStock: 0.2, expiry: "2025-10-30" },
      { name: "Ghee", tamil: "நெய்", unit: "L", quantity: 1, minStock: 0.2, expiry: "2025-11-01" }
    ]
  },
  condiments: {
    name: "Condiments",
    tamil: "சுவையூட்டிகள்",
    icon: "heroicons:cube",
    items: [
      { name: "Tamarind", tamil: "புளி", unit: "kg", quantity: 0.5, minStock: 0.1, expiry: "2025-12-31" },
      { name: "Jaggery", tamil: "வெல்லம்", unit: "kg", quantity: 1, minStock: 0.2, expiry: "2025-11-15" },
      { name: "Salt", tamil: "உப்பு", unit: "kg", quantity: 2, minStock: 0.5, expiry: null },
      { name: "Rasam Powder", tamil: "ரசம் பொடி", unit: "g", quantity: 200, minStock: 50, expiry: "2025-10-15" },
      { name: "Sambar Powder", tamil: "சாம்பார் பொடி", unit: "g", quantity: 300, minStock: 50, expiry: "2025-10-20" }
    ]
  },
  dryGoods: {
    name: "Dry Goods",
    tamil: "உலர் பொருட்கள்",
    icon: "heroicons:squares-2x2",
    items: [
      { name: "Aval/Poha", tamil: "அவல்", unit: "kg", quantity: 1, minStock: 0.2, expiry: "2025-12-01" },
      { name: "Vermicelli", tamil: "சேமியா", unit: "g", quantity: 500, minStock: 100, expiry: "2025-11-30" },
      { name: "Besan", tamil: "கடலை மாவு", unit: "kg", quantity: 1, minStock: 0.2, expiry: "2025-10-30" },
      { name: "Wheat Flour", tamil: "கோதுமை மாவு", unit: "kg", quantity: 2, minStock: 0.5, expiry: "2025-11-15" }
    ]
  },
  festivalItems: {
    name: "Festival Items",
    tamil: "பண்டிகை பொருட்கள்",
    icon: "heroicons:gift",
    items: [
      { name: "Rock Sugar", tamil: "கல்கண்டு", unit: "g", quantity: 200, minStock: 50, expiry: "2026-01-01" },
      { name: "Dry Coconut", tamil: "உலர் தேங்காய்", unit: "pieces", quantity: 5, minStock: 2, expiry: "2025-12-31" },
      { name: "Cardamom", tamil: "ஏலக்காய்", unit: "g", quantity: 50, minStock: 10, expiry: "2025-12-01" },
      { name: "Cloves", tamil: "கிராம்பு", unit: "g", quantity: 25, minStock: 5, expiry: "2025-11-30" },
      { name: "Camphor", tamil: "கற்பூரம்", unit: "g", quantity: 20, minStock: 5, expiry: null }
    ]
  }
};

export const FreshProduce = {
  vegetables: {
    name: "Vegetables",
    tamil: "காய்கறிகள்",
    weekly: [
      { name: "Tomato", tamil: "தக்காளி", frequency: "daily", season: "all" },
      { name: "Onion", tamil: "வெங்காயம்", frequency: "daily", season: "all" },
      { name: "Potato", tamil: "உருளைக்கிழங்கு", frequency: "alternate", season: "all" },
      { name: "Carrot", tamil: "கேரட்", frequency: "weekly", season: "all" },
      { name: "Beans", tamil: "பீன்ஸ்", frequency: "weekly", season: "winter" },
      { name: "Brinjal", tamil: "கத்தரிக்காய்", frequency: "weekly", season: "all" },
      { name: "Drumstick", tamil: "முருங்கை", frequency: "weekly", season: "summer" },
      { name: "Greens", tamil: "கீரை", frequency: "weekly", season: "all" }
    ]
  },
  fruits: {
    name: "Fruits",
    tamil: "பழங்கள்",
    weekly: [
      { name: "Banana", tamil: "வாழைப்பழம்", frequency: "daily", season: "all" },
      { name: "Apple", tamil: "ஆப்பிள்", frequency: "weekly", season: "all" },
      { name: "Papaya", tamil: "பப்பாளி", frequency: "weekly", season: "all" },
      { name: "Lemon", tamil: "எலுமிச்சை", frequency: "weekly", season: "all" },
      { name: "Mango", tamil: "மாம்பழம்", frequency: "seasonal", season: "summer" }
    ]
  },
  dairy: {
    name: "Dairy",
    tamil: "பால் பொருட்கள்",
    daily: [
      { name: "Milk", tamil: "பால்", quantity: "1L", daily: true },
      { name: "Curd", tamil: "தயிர்", quantity: "500ml", frequency: "alternate" },
      { name: "Paneer", tamil: "பன்னீர்", quantity: "200g", frequency: "weekly" },
      { name: "Butter", tamil: "வெண்ணெய்", quantity: "100g", frequency: "weekly" }
    ]
  },
  herbs: {
    name: "Herbs & Fresh",
    tamil: "மூலிகை & புதிய",
    weekly: [
      { name: "Curry Leaves", tamil: "கறிவேப்பிலை", essential: true },
      { name: "Coriander", tamil: "கொத்தமல்லி", essential: true },
      { name: "Mint", tamil: "புதினா", frequency: "weekly" },
      { name: "Ginger", tamil: "இஞ்சி", essential: true },
      { name: "Garlic", tamil: "பூண்டு", essential: true },
      { name: "Green Chilli", tamil: "பச்சை மிளகாய்", essential: true },
      { name: "Fresh Coconut", tamil: "தேங்காய்", frequency: "alternate" }
    ]
  }
};

export const MealPlanner = {
  weeklyGrid: {
    monday: {
      breakfast: { dish: "Idli + Chutney", tamil: "இட்லி + சட்னி", prep: "Soak urad dal Sunday night" },
      lunch: { dish: "Sambar + Rice", tamil: "சாம்பார் + சாதம்", prep: "Cut vegetables morning" },
      dinner: { dish: "Rasam + Poriyal", tamil: "ரசம் + பொரியல்", prep: "Light and warm" }
    },
    tuesday: {
      breakfast: { dish: "Dosa + Podi", tamil: "தோசை + பொடி", prep: "Grind batter Monday night" },
      lunch: { dish: "Vathal Kuzhambu + Rice", tamil: "வத்தல் குழம்பு + சாதம்", prep: "Soak vathal overnight" },
      dinner: { dish: "Chapati + Kurma", tamil: "சப்பாத்தி + குருமா", prep: "Make dough evening" }
    },
    wednesday: {
      breakfast: { dish: "Pongal + Chutney", tamil: "பொங்கல் + சட்னி", prep: "Roast moong dal" },
      lunch: { dish: "Kootu + Rice", tamil: "கூட்டு + சாதம்", prep: "Grind coconut fresh" },
      dinner: { dish: "Lemon Rasam + Thogayal", tamil: "எலுமிச்சை ரசம் + தொகையல்", prep: "Extract lemon juice" }
    },
    thursday: {
      breakfast: { dish: "Upma + Coconut Chutney", tamil: "உப்புமா + தேங்காய் சட்னி", prep: "Roast rava well" },
      lunch: { dish: "Mixed Vegetable Curry + Rice", tamil: "கலந்த காய் கறி + சாதம்", prep: "Cut all vegetables" },
      dinner: { dish: "Curd Rice + Pickle", tamil: "தயிர் சாதம் + ஊறுகாய்", prep: "Cool rice properly" }
    },
    friday: {
      breakfast: { dish: "Poha + Peanuts", tamil: "அவல் + கடலை", prep: "Wash poha gently" },
      lunch: { dish: "Dal + Sabzi + Chapati", tamil: "பருப்பு + வேக்கட் + சப்பாத்தி", prep: "Make rotis fresh" },
      dinner: { dish: "Vegetable Soup + Bread", tamil: "காய்கறி சூப் + பிரெட்", prep: "Light and healthy" }
    },
    saturday: {
      breakfast: { dish: "Rava Dosa + Sambar", tamil: "ரவா தோசை + சாம்பார்", prep: "Make batter fresh" },
      lunch: { dish: "Biriyani + Raita", tamil: "பிரியாணி + ரைத்தா", prep: "Soak rice 30 mins" },
      dinner: { dish: "Roti + Dal + Vegetable", tamil: "ரொட்டி + பருப்பு + காய்", prep: "Simple and nourishing" }
    },
    sunday: {
      breakfast: { dish: "Special Breakfast", tamil: "சிறப்பு காலை உணவு", prep: "Family choice or festival special" },
      lunch: { dish: "Traditional Feast", tamil: "பாரம்பரிய விருந்து", prep: "Elaborate South Indian meal" },
      dinner: { dish: "Light Dinner", tamil: "இலகுவான இரவு உணவு", prep: "Digest well for Monday" }
    }
  },
  festivalOverlays: {
    navaratri: {
      name: "Navaratri Sundal",
      tamil: "நவராத்திரி சுண்டல்",
      days: [
        { day: 1, sundal: "White Peas", tamil: "வெள்ளை பட்டாணி", goddess: "Shailaputri" },
        { day: 2, sundal: "Black Chana", tamil: "கருப்பு கடலை", goddess: "Brahmacharini" },
        { day: 3, sundal: "Green Gram", tamil: "பாசி பருப்பு", goddess: "Chandraghanta" },
        { day: 4, sundal: "Groundnut", tamil: "நிலக்கடலை", goddess: "Kushmanda" },
        { day: 5, sundal: "Tiger Peas", tamil: "அவரை", goddess: "Skandamata" },
        { day: 6, sundal: "Field Beans", tamil: "மொச்சை", goddess: "Katyayani" },
        { day: 7, sundal: "Chickpeas", tamil: "கொண்டை கடலை", goddess: "Kaalratri" },
        { day: 8, sundal: "Navy Beans", tamil: "வெள்ளை பீன்ஸ்", goddess: "Mahagauri" },
        { day: 9, sundal: "Mixed Lentils", tamil: "கலந்த பருப்பு", goddess: "Siddhidatri" }
      ]
    },
    diwali: {
      name: "Diwali Sweets & Snacks",
      tamil: "தீபாவளி இனிப்பு & காரம்",
      sweets: ["Laddu", "Mysore Pak", "Kaju Katli", "Badusha", "Coconut Burfi"],
      snacks: ["Murukku", "Mixture", "Thattai", "Seedai", "Ribbon Pakoda"]
    },
    pongal: {
      name: "Pongal Festival",
      tamil: "பொங்கல் பண்டிகை",
      dishes: ["Chakkarai Pongal", "Ven Pongal", "Vadai", "Payasam", "Sugarcane"]
    }
  }
};

export const KidsMenu = {
  tiffinPlanner: {
    monday: {
      thambi: { dish: "Idli + Podi + Banana", prep: "Pack in steel box", mood: "energetic" },
      akka: { dish: "Chapati + Paneer Curry", prep: "Warm container", mood: "focused" }
    },
    tuesday: {
      thambi: { dish: "Lemon Rice + Cucumber", prep: "Add lemon fresh", mood: "happy" },
      akka: { dish: "Dosa + Chutney", prep: "Crispy and warm", mood: "motivated" }
    },
    wednesday: {
      thambi: { dish: "Pongal + Pickle", prep: "Not too spicy", mood: "calm" },
      akka: { dish: "Upma + Curd", prep: "Light and filling", mood: "studious" }
    },
    thursday: {
      thambi: { dish: "Poha + Roasted Gram", prep: "Add peanuts", mood: "playful" },
      akka: { dish: "Rice + Rasam + Thogayal", prep: "Comforting meal", mood: "tired" }
    },
    friday: {
      thambi: { dish: "Chapati Roll + Jam", prep: "Fun presentation", mood: "excited" },
      akka: { dish: "Tamarind Rice + Chips", prep: "Tangy and satisfying", mood: "weekend-ready" }
    }
  },
  brainFood: {
    focus: ["Lemon Rasam", "Curd Rice", "Almonds", "Dates", "Spinach Poriyal"],
    memory: ["Walnuts", "Beetroot", "Ghee", "Turmeric Milk", "Brahmi Leaves"],
    stress: ["Warm Kanji", "Paati's Rasam", "Chamomile Tea", "Banana", "Coconut Water"],
    examWeek: ["Light breakfasts", "Warm lunches", "Early dinners", "No heavy sweets"]
  },
  moodBasedMeals: {
    tired: { meal: "Lemon Rasam + Rice + Banana", comfort: "high", energy: "medium" },
    excited: { meal: "Tamarind Rice + Chips", fun: "high", satisfaction: "high" },
    sad: { meal: "Amma's Pongal + Paati's Thogayal", love: "maximum", comfort: "maximum" },
    stressed: { meal: "Curd Rice + Roasted Gram + Warm Water", calm: "high", digestion: "easy" }
  }
};

export const KitchenVendors = {
  grocers: [
    { name: "Ramesh Stores", phone: "98765-43210", specialty: "Bulk rice & dals", loyalty: "20kg rice discount" },
    { name: "Annachi Kadai", phone: "98765-43211", specialty: "Fresh spices", loyalty: "Festival combos" }
  ],
  vegetables: [
    { name: "Weekly Market", location: "Gandhi Road", days: ["Tuesday", "Friday"], quality: "excellent" },
    { name: "Mobile Cart", phone: "98765-43212", timing: "6-8 AM daily", specialty: "Greens & herbs" }
  ],
  dairy: [
    { name: "Aavin", type: "cooperative", delivery: "daily", quality: "standardized" },
    { name: "Local Vendor", name_person: "Murugan", phone: "98765-43213", timing: "6 AM & 6 PM" }
  ],
  others: [
    { name: "Flower Vendor", location: "Temple Street", specialty: "Pooja flowers", timing: "early morning" },
    { name: "Gas Delivery", company: "Bharat Gas", phone: "98765-43214", booking: "2 days advance" }
  ]
};

export const CleaningSchedule = {
  daily: [
    { task: "Wash dishes", tamil: "பாத்திரம் கழுவுதல்", time: "after meals" },
    { task: "Wipe surfaces", tamil: "மேற்பரப்பு துடைத்தல்", time: "evening" },
    { task: "Sweep floor", tamil: "தரையை துடைத்தல்", time: "morning & evening" }
  ],
  weekly: [
    { task: "Deep clean stove", tamil: "அடுப்பு சுத்தம்", day: "Saturday" },
    { task: "Organize fridge", tamil: "குளிர்சாதன பெட்டி", day: "Sunday" },
    { task: "Clean containers", tamil: "கொள்கலன்கள்", day: "Wednesday" },
    { task: "Pooja shelf", tamil: "பூஜை அலமாரி", day: "Friday" }
  ],
  festival: [
    { festival: "Diwali", task: "Complete kitchen deep clean", days_before: 3 },
    { festival: "Pongal", task: "New vessel cleaning", days_before: 2 },
    { festival: "Navaratri", task: "Brass lamp cleaning", days_before: 1 }
  ]
};

export const WellnessProfiles = {
  paati: {
    name: "Paati",
    tamil: "பாட்டி",
    dietary: "soft, warm, low spice",
    preferences: ["warm kanji", "mild rasam", "mashed vegetables", "sweet porridge"],
    avoid: ["too spicy", "hard to chew", "cold food", "raw vegetables"],
    medicinal: ["turmeric milk", "ginger tea", "asafoetida water", "warm ghee"]
  },
  thambi: {
    name: "Thambi (6th Grade)",
    tamil: "தம்பி (6ம் வகுப்பு)",
    dietary: "growing child, energy foods",
    preferences: ["variety in tiffin", "fun presentations", "sweet treats", "crunchy snacks"],
    brain_foods: ["almonds", "dates", "ghee", "milk", "banana"],
    exam_support: ["light meals", "brain boosters", "stress relief foods"]
  },
  akka: {
    name: "Akka (11th + JEE)",
    tamil: "அக்கா (11ம் வகுப்பு + JEE)",
    dietary: "study support, brain foods",
    preferences: ["protein rich", "memory boosters", "energy sustaining", "digestive friendly"],
    study_foods: ["nuts", "dark leafy greens", "whole grains", "turmeric", "brahmi"],
    stress_busters: ["warm milk", "chamomile tea", "light dinners", "comfort foods"]
  }
};

export const FestivalPrep = {
  diwali: {
    name: "Diwali",
    tamil: "தீபாவளி",
    sweets: [
      { name: "Coconut Laddu", prep_days: 2, difficulty: "easy", shelf_life: "1 week" },
      { name: "Mysore Pak", prep_days: 1, difficulty: "medium", shelf_life: "3 days" },
      { name: "Badusha", prep_days: 1, difficulty: "hard", shelf_life: "5 days" }
    ],
    snacks: [
      { name: "Murukku", prep_days: 2, difficulty: "medium", shelf_life: "1 month" },
      { name: "Mixture", prep_days: 1, difficulty: "easy", shelf_life: "2 weeks" },
      { name: "Ribbon Pakoda", prep_days: 1, difficulty: "medium", shelf_life: "3 weeks" }
    ],
    pooja_prep: [
      { item: "Neivedyam preparation", time: "morning", ingredients: "selected sweets" },
      { item: "Ghee lamps", time: "evening", ingredients: "pure ghee, cotton wicks" },
      { item: "Prasadam distribution", time: "after pooja", ingredients: "blessed food" }
    ]
  },
  navaratri: {
    name: "Navaratri",
    tamil: "நவராத்திரி",
    sundal_schedule: "9 days, 9 varieties",
    evening_prep: "light dinners to balance sundal",
    sharing: "neighbors, friends, temple",
    decorations: "golu, flowers, rangoli"
  }
};

export const EmotionalFood = {
  comfort_tags: [
    { emotion: "homesick", food: "Amma's sambar", tamil: "அம்மாவின் சாம்பார்" },
    { emotion: "stressed", food: "Paati's rasam", tamil: "பாட்டியின் ரசம்" },
    { emotion: "celebration", food: "Payasam", tamil: "பாயசம்" },
    { emotion: "nostalgia", food: "Childhood favorites", tamil: "குழந்தைப் பருவ விருப்பங்கள்" },
    { emotion: "healing", food: "Kanji with pickle", tamil: "ஊறுகாயுடன் கஞ்சி" }
  ],
  seasonal_moods: [
    { season: "monsoon", mood: "cozy", food: "hot rasam", comfort: "maximum" },
    { season: "summer", mood: "refreshing", food: "buttermilk", coolness: "high" },
    { season: "winter", mood: "warming", food: "hot ghee rice", warmth: "maximum" },
    { season: "festival", mood: "joyful", food: "special sweets", happiness: "maximum" }
  ]
};