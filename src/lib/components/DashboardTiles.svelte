<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { homeSounds } from "$lib/utils/sounds";
  import { mobileGestures } from "$lib/utils/gestures";

  const dispatch = createEventDispatcher();

  // Sample data for comprehensive dashboard
  const familyMembers = [
    { name: "மகள்", role: "Student", status: "Healthy", avatar: "👩‍🎓" },
    { name: "மகன்", role: "Student", status: "Healthy", avatar: "👨‍🎓" },
    { name: "கணவர்", role: "Professional", status: "Healthy", avatar: "👨‍💼" },
    { name: "நான்", role: "Homemaker", status: "Healthy", avatar: "👩‍👧‍👦" }
  ];

  const kpiMetrics = [
    { label: "Family Health Score", value: "95%", change: "+2%", icon: "heroicons:heart", color: "text-pink-600", bgColor: "bg-pink-50" },
    { label: "Monthly Budget Usage", value: "75%", change: "-5%", icon: "heroicons:currency-rupee", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { label: "Task Completion Rate", value: "88%", change: "+12%", icon: "heroicons:check-circle", color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Household Efficiency", value: "92%", change: "+8%", icon: "heroicons:home", color: "text-purple-600", bgColor: "bg-purple-50" }
  ];

  // New data structures for enhanced dashboard
  let dailyTasks = [
    { id: 1, task: "Prepare breakfast for children", priority: "high", assigned: "நான்", status: "completed", dueTime: "7:00 AM", icon: "heroicons:cake" },
    { id: 2, task: "Pack school lunch", priority: "high", assigned: "நான்", status: "in-progress", dueTime: "8:00 AM", icon: "heroicons:shopping-bag" },
    { id: 3, task: "Clean kitchen after dinner", priority: "medium", assigned: "மகள்", status: "pending", dueTime: "9:00 PM", icon: "heroicons:sparkles" },
    { id: 4, task: "Water garden plants", priority: "low", assigned: "மகன்", status: "pending", dueTime: "6:00 PM", icon: "heroicons:beaker" },
    { id: 5, task: "Take out trash", priority: "medium", assigned: "கணவர்", status: "pending", dueTime: "8:00 PM", icon: "heroicons:trash" }
  ];

  let billsDue = [
    { id: 1, bill: "Electricity Bill", amount: "₹2,450", dueDate: "Jan 15", status: "urgent", daysLeft: 2, icon: "heroicons:bolt", color: "text-red-600", bgColor: "bg-red-50" },
    { id: 2, bill: "Water Bill", amount: "₹890", dueDate: "Jan 18", status: "upcoming", daysLeft: 5, icon: "heroicons:droplets", color: "text-blue-600", bgColor: "bg-blue-50" },
    { id: 3, bill: "Internet Subscription", amount: "₹1,200", dueDate: "Jan 25", status: "normal", daysLeft: 12, icon: "heroicons:wifi", color: "text-green-600", bgColor: "bg-green-50" },
    { id: 4, bill: "School Fees", amount: "₹15,000", dueDate: "Feb 5", status: "normal", daysLeft: 23, icon: "heroicons:academic-cap", color: "text-purple-600", bgColor: "bg-purple-50" }
  ];

  const sharedNotes = [
    { id: 1, title: "Grocery List", content: "Rice, vegetables, milk, fruits, cleaning supplies", author: "நான்", time: "2 hours ago", priority: "high" },
    { id: 2, title: "Weekend Plans", content: "Temple visit, family dinner, movie night", author: "கணவர்", time: "1 day ago", priority: "medium" },
    { id: 3, title: "Doctor Appointments", content: "Children's health checkup - Jan 20, Dental cleaning - Feb 10", author: "நான்", time: "2 days ago", priority: "high" }
  ];

  const recentActivities = [
    { action: "Grocery shopping completed", time: "2 hours ago", icon: "heroicons:shopping-cart", color: "text-green-600" },
    { action: "Family dinner planned", time: "4 hours ago", icon: "heroicons:calendar-days", color: "text-blue-600" },
    { action: "Children's homework checked", time: "6 hours ago", icon: "heroicons:academic-cap", color: "text-purple-600" },
    { action: "Monthly budget reviewed", time: "1 day ago", icon: "heroicons:currency-rupee", color: "text-emerald-600" },
    { action: "Electricity bill paid", time: "1 day ago", icon: "heroicons:bolt", color: "text-orange-600" },
    { action: "School fees reminder set", time: "2 days ago", icon: "heroicons:bell", color: "text-yellow-600" }
  ];

  // Ritual Calendar Data - fetched from API
  let ritualCalendar = [];
  let isLoadingRituals = true;

  // Fetch ritual calendar data on component mount
  async function fetchRitualCalendar() {
    try {
      isLoadingRituals = true;
      // Using a public API for Hindu calendar data
      // Note: In production, you might want to use a more reliable API
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      // Sample ritual data - in production, replace with actual API call
      const sampleRituals = [
        { date: "2025-01-29", name: "Amavasya", type: "amavasya", description: "New Moon - auspicious for spiritual practices", icon: "heroicons:moon", color: "text-purple-600" },
        { date: "2025-02-12", name: "Pradosham", type: "pradosham", description: "Auspicious time for Lord Shiva worship", icon: "heroicons:fire", color: "text-orange-600" },
        { date: "2025-02-14", name: "Ekadasi", type: "ekadasi", description: "Fasting day for spiritual purification", icon: "heroicons:sun", color: "text-yellow-600" },
        { date: "2025-02-27", name: "Maha Shivaratri", type: "festival", description: "Great night of Lord Shiva - all-night vigil", icon: "heroicons:moon", color: "text-indigo-600" },
        { date: "2025-03-14", name: "Holi", type: "festival", description: "Festival of colors - prepare colors and sweets", icon: "heroicons:sparkles", color: "text-pink-600" }
      ];

      // Filter for current month and next month
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;

      ritualCalendar = sampleRituals.filter(ritual => {
        const ritualDate = new Date(ritual.date);
        const ritualMonth = ritualDate.getMonth() + 1;
        const ritualYear = ritualDate.getFullYear();
        return (ritualMonth === currentMonth && ritualYear === currentYear) ||
               (ritualMonth === nextMonth && ritualYear === nextMonthYear);
      });

      // Sort by date
      ritualCalendar.sort((a, b) => new Date(a.date) - new Date(b.date));

    } catch (error) {
      console.error('Failed to fetch ritual calendar:', error);
      // Fallback to static data
      ritualCalendar = [
        { date: "2025-01-29", name: "Amavasya", type: "amavasya", description: "New Moon - auspicious for spiritual practices", icon: "heroicons:moon", color: "text-purple-600" },
        { date: "2025-02-12", name: "Pradosham", type: "pradosham", description: "Auspicious time for Lord Shiva worship", icon: "heroicons:fire", color: "text-orange-600" }
      ];
    } finally {
      isLoadingRituals = false;
      // Update suggestions based on current rituals
      updateDynamicSuggestions();
    }
  }

  const upcomingEvents = [
    { title: "Temple Visit", date: "Tomorrow", time: "6:00 AM", icon: "heroicons:building-storefront", color: "text-orange-600" },
    { title: "School Parent Meeting", date: "Jan 18", time: "10:00 AM", icon: "heroicons:academic-cap", color: "text-blue-600" },
    { title: "Family Health Check", date: "Jan 20", time: "2:00 PM", icon: "heroicons:heart", color: "text-pink-600" },
    { title: "Pongal Festival", date: "Jan 15", time: "All Day", icon: "heroicons:fire", color: "text-red-600" }
  ];

  // AI Insights
  const aiInsights = [
    { type: "warning", message: "Electricity bill is 15% higher than last month", icon: "heroicons:exclamation-triangle", color: "text-yellow-600" },
    { type: "suggestion", message: "Consider buying groceries on Wednesday for better deals", icon: "heroicons:light-bulb", color: "text-blue-600" },
    { type: "reminder", message: "Water plants every 3 days - due tomorrow", icon: "heroicons:beaker", color: "text-green-600" }
  ];

  // Role-based dashboard data
  const currentUserRole = "Homemaker"; // This would come from user context
  const roleBasedKPIs = {
    Homemaker: [
      { label: "Tasks Completed Today", value: "6/8", change: "+2", icon: "heroicons:check-circle", color: "text-green-600" },
      { label: "Meals Prepared", value: "3", change: "+1", icon: "heroicons:cake", color: "text-orange-600" },
      { label: "Family Satisfaction", value: "95%", change: "+5%", icon: "heroicons:heart", color: "text-pink-600" }
    ],
    Parent: [
      { label: "Children's Performance", value: "A-", change: "0", icon: "heroicons:academic-cap", color: "text-blue-600" },
      { label: "Bills Paid", value: "4/5", change: "+1", icon: "heroicons:currency-rupee", color: "text-emerald-600" },
      { label: "Family Time", value: "2.5hrs", change: "+0.5", icon: "heroicons:clock", color: "text-purple-600" }
    ],
    Child: [
      { label: "Homework Done", value: "4/5", change: "+1", icon: "heroicons:book-open", color: "text-blue-600" },
      { label: "Chores Completed", value: "3/4", change: "+2", icon: "heroicons:sparkles", color: "text-green-600" },
      { label: "Screen Time", value: "2.5hrs", change: "-0.5", icon: "heroicons:device-phone-mobile", color: "text-orange-600" }
    ]
  };

  // Weather data
  const weatherData = {
    location: "Coimbatore, Tamil Nadu",
    temperature: "28°C",
    condition: "Sunny",
    humidity: "65%",
    icon: "heroicons:sun",
    forecast: [
      { day: "Today", temp: "28°C", condition: "Sunny", icon: "heroicons:sun" },
      { day: "Tomorrow", temp: "27°C", condition: "Partly Cloudy", icon: "heroicons:cloud" },
      { day: "Day 3", temp: "26°C", condition: "Rainy", icon: "heroicons:cloud-rain" }
    ]
  };

  // Family mood tracker
  let familyMoods = [
    { member: "நான்", mood: "happy", emoji: "😊", note: "Productive day!", time: "2 hours ago" },
    { member: "கணவர்", mood: "tired", emoji: "😴", note: "Long day at work", time: "4 hours ago" },
    { member: "மகள்", mood: "excited", emoji: "🤩", note: "Got good grades!", time: "6 hours ago" },
    { member: "மகன்", mood: "playful", emoji: "🎮", note: "Playing games", time: "1 hour ago" }
  ];

  // Quick expense categories
  const expenseCategories = [
    { name: "Food & Grocery", icon: "heroicons:shopping-cart", color: "text-blue-600", bgColor: "bg-blue-50" },
    { name: "Transportation", icon: "heroicons:truck", color: "text-green-600", bgColor: "bg-green-50" },
    { name: "Utilities", icon: "heroicons:bolt", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { name: "Healthcare", icon: "heroicons:heart", color: "text-red-600", bgColor: "bg-red-50" },
    { name: "Education", icon: "heroicons:academic-cap", color: "text-purple-600", bgColor: "bg-purple-50" },
    { name: "Entertainment", icon: "heroicons:film", color: "text-pink-600", bgColor: "bg-pink-50" }
  ];

  // Today's Priorities - Non-daily, reminder-worthy items
  let todaysPriorities = [
    { id: 1, type: "urgent", title: "Car Service Overdue", description: "Vehicle service due 2 months ago", priority: "high", dueIn: "Overdue", icon: "heroicons:wrench-screwdriver", color: "text-red-600", action: "Schedule Now" },
    { id: 2, type: "maintenance", title: "Water Filter Replacement", description: "Replace water filter cartridge", priority: "high", dueIn: "3 days", icon: "heroicons:droplets", color: "text-yellow-600", action: "Order Filter" },
    { id: 3, type: "insurance", title: "Health Insurance Renewal", description: "Family health insurance expires soon", priority: "high", dueIn: "15 days", icon: "heroicons:shield-check", color: "text-orange-600", action: "Renew Policy" },
    { id: 4, type: "tax", title: "Income Tax Filing", description: "Last date for tax filing approaching", priority: "medium", dueIn: "March 31", icon: "heroicons:document-text", color: "text-blue-600", action: "File Now" },
    { id: 5, type: "kyc", title: "Bank KYC Update", description: "Update KYC for savings account", priority: "medium", dueIn: "2 weeks", icon: "heroicons:identification", color: "text-purple-600", action: "Update KYC" },
    { id: 6, type: "cleaning", title: "Monthly Deep Cleaning", description: "Schedule professional house cleaning", priority: "low", dueIn: "This weekend", icon: "heroicons:sparkles", color: "text-green-600", action: "Book Service" },
    { id: 7, type: "stock", title: "Low Kitchen Stock", description: "Rice, oil, and spices running low", priority: "medium", dueIn: "Buy soon", icon: "heroicons:shopping-cart", color: "text-amber-600", action: "Add to List" },
    { id: 8, type: "school", title: "School Documents Printing", description: "Print admission forms and certificates", priority: "low", dueIn: "Next week", icon: "heroicons:printer", color: "text-indigo-600", action: "Print Now" }
  ];

  // Upcoming important dates and events
  const upcomingImportantDates = [
    { title: "Children's Birthday", date: "Jan 25", type: "birthday", icon: "heroicons:cake", color: "text-pink-600" },
    { title: "Wedding Anniversary", date: "Feb 14", type: "anniversary", icon: "heroicons:heart", color: "text-red-600" },
    { title: "Insurance Premium Due", date: "Feb 20", type: "insurance", icon: "heroicons:shield-check", color: "text-blue-600" },
    { title: "Tax Payment Deadline", date: "March 31", type: "tax", icon: "heroicons:currency-rupee", color: "text-green-600" },
    { title: "School Annual Day", date: "March 15", type: "event", icon: "heroicons:academic-cap", color: "text-purple-600" }
  ];

  // Smart AI Suggestions - Non-daily, easily forgotten items only
  let smartSuggestions = [
    { id: 1, message: "School term fees payment due in 2 weeks - ₹15,000 for both children", action: "Pay School Fees", icon: "heroicons:academic-cap", priority: "high", category: "education" },
    { id: 2, message: "Health insurance renewal due in 15 days - Family coverage ₹8,500", action: "Renew Insurance", icon: "heroicons:shield-check", priority: "high", category: "insurance" },
    { id: 3, message: "Book LPG refill - Current cylinder usage at 85%", action: "Book Refill", icon: "heroicons:fire", priority: "medium", category: "household" },
    { id: 4, message: "KYC update required for savings account - Due in 2 weeks", action: "Update KYC", icon: "heroicons:identification", priority: "medium", category: "banking" },
    { id: 5, message: "Monthly deep cleaning service - Schedule for this weekend", action: "Book Cleaning", icon: "heroicons:sparkles", priority: "low", category: "maintenance" },
    { id: 6, message: "Tax filing deadline approaching - March 31 for FY 2024-25", action: "File Taxes", icon: "heroicons:document-text", priority: "medium", category: "tax" },
    { id: 7, message: "Maha Shivaratri in 3 days - Prepare for all-night vigil and special puja", action: "Plan Festival", icon: "heroicons:moon", priority: "high", category: "festival" },
    { id: 8, message: "Vehicle service overdue by 2 months - Schedule immediately", action: "Book Service", icon: "heroicons:wrench-screwdriver", priority: "high", category: "vehicle" }
  ];

  // Update suggestions based on current rituals and festivals
  function updateDynamicSuggestions() {
    const currentDate = new Date();
    const suggestions = [...smartSuggestions];

    // Add festival-based suggestions
    ritualCalendar.forEach(ritual => {
      const ritualDate = new Date(ritual.date);
      const daysUntil = Math.ceil((ritualDate - currentDate) / (1000 * 60 * 60 * 24));

      if (daysUntil >= 0 && daysUntil <= 7) { // Within next week
        if (ritual.type === 'festival') {
          suggestions.unshift({
            id: `festival-${ritual.name}`,
            message: `${ritual.name} in ${daysUntil} days - Prepare traditional items, sweets, and decorations`,
            action: "Plan Festival",
            icon: ritual.icon,
            priority: "high",
            category: "festival"
          });
        } else if (ritual.type === 'amavasya' || ritual.type === 'pradosham' || ritual.type === 'ekadasi') {
          suggestions.unshift({
            id: `ritual-${ritual.name}`,
            message: `${ritual.name} tomorrow - ${ritual.description}`,
            action: "View Rituals",
            icon: ritual.icon,
            priority: "medium",
            category: "ritual"
          });
        }
      }
    });

    // Limit to 8 suggestions and update
    smartSuggestions = suggestions.slice(0, 8);
  }

  // Comprehensive South Indian Family Reminders
  const standardReminders = {
    financial: [
      { title: "Pay school term fees", frequency: "Quarterly/Half-yearly", description: "₹15,000 for both children", icon: "heroicons:academic-cap", category: "education" },
      { title: "Renew LPG connection", frequency: "As needed", description: "Book refill when cylinder is 80% used", icon: "heroicons:fire", category: "household" },
      { title: "Pay EB electricity bill", frequency: "Monthly", description: "Before due date to avoid surcharge", icon: "heroicons:bolt", category: "utilities" },
      { title: "Pay water/property tax", frequency: "Annual", description: "Usually January-February", icon: "heroicons:droplets", category: "taxes" },
      { title: "Check EMI auto-debits", frequency: "Monthly", description: "Verify after any bank changes", icon: "heroicons:credit-card", category: "loans" },
      { title: "Renew insurance policies", frequency: "Annual", description: "Health, vehicle, home insurance", icon: "heroicons:shield-check", category: "insurance" },
      { title: "Submit warranty claims", frequency: "As needed", description: "Before expiry on appliances/electronics", icon: "heroicons:wrench-screwdriver", category: "warranty" },
      { title: "Track chit fund payments", frequency: "Monthly", description: "Auction dates and payments", icon: "heroicons:currency-rupee", category: "investments" },
      { title: "Return online purchases", frequency: "Within window", description: "Before return window closes", icon: "heroicons:arrow-path", category: "shopping" },
      { title: "Update Aadhaar-linked details", frequency: "As needed", description: "Mobile/bank details changes", icon: "heroicons:identification", category: "identity" }
    ],
    cultural: [
      { title: "Prepare for festivals", frequency: "Seasonal", description: "Buy puja items, sweets, traditional clothes", icon: "heroicons:fire", category: "festival" },
      { title: "Book temple darshan", frequency: "As needed", description: "Special days and peak seasons", icon: "heroicons:building-storefront", category: "temple" },
      { title: "Wash traditional clothes", frequency: "Before festivals", description: "Sarees, veshtis for temple visits", icon: "heroicons:sparkles", category: "clothing" },
      { title: "Avoid puja during periods", frequency: "Monthly tracking", description: "Plan rituals accordingly", icon: "heroicons:calendar", category: "ritual" },
      { title: "Buy ritual donations", frequency: "As needed", description: "Salt, rice, turmeric for temples", icon: "heroicons:shopping-bag", category: "donation" },
      { title: "Check Panchangam", frequency: "Daily reference", description: "Amavasya, Pournami, Ekadasi, Pradosham", icon: "heroicons:book-open", category: "calendar" },
      { title: "Light lamps on special days", frequency: "Special occasions", description: "Thai Amavasya, Karthigai Deepam", icon: "heroicons:light-bulb", category: "ritual" },
      { title: "Prepare kolam materials", frequency: "Seasonal", description: "Powder and colors for festivals", icon: "heroicons:palette", category: "decoration" },
      { title: "Plan temple visits during travel", frequency: "Travel planning", description: "Carry offerings and temple clothes", icon: "heroicons:map", category: "travel" },
      { title: "Schedule homam/puja", frequency: "Monthly/Seasonal", description: "Home rituals and ceremonies", icon: "heroicons:fire", category: "ritual" }
    ],
    family: [
      { title: "Schedule doctor appointments", frequency: "Annual/Seasonal", description: "Health checkups for all family members", icon: "heroicons:heart", category: "health" },
      { title: "Refill chronic medications", frequency: "Monthly", description: "BP, diabetes, thyroid medicines", icon: "heroicons:beaker", category: "medication" },
      { title: "Check school calendar", frequency: "Ongoing", description: "Project deadlines and important dates", icon: "heroicons:academic-cap", category: "education" },
      { title: "Pay coaching class fees", frequency: "Monthly/Quarterly", description: "Tuition and activity classes", icon: "heroicons:currency-rupee", category: "education" },
      { title: "Plan birthday celebrations", frequency: "Annual", description: "Gifts and party preparations", icon: "heroicons:cake", category: "celebration" },
      { title: "Pack seasonal clothes", frequency: "Seasonal", description: "Raincoat, sweater for school", icon: "heroicons:cloud", category: "clothing" },
      { title: "Submit school forms", frequency: "As required", description: "Field trips, ID cards, report cards", icon: "heroicons:document-text", category: "school" },
      { title: "Check school holidays", frequency: "Ongoing", description: "Festivals, strikes, early closures", icon: "heroicons:calendar", category: "school" },
      { title: "Track emotional state", frequency: "During exams", description: "Children's stress during exam season", icon: "heroicons:face-smile", category: "wellness" }
    ],
    maintenance: [
      { title: "Deep clean fridge", frequency: "Monthly", description: "Remove and clean all compartments", icon: "heroicons:sparkles", category: "kitchen" },
      { title: "Check gas pipe expiry", frequency: "Annual", description: "Safety inspection and replacement", icon: "heroicons:wrench-screwdriver", category: "safety" },
      { title: "Book pest control", frequency: "Quarterly", description: "Seasonal pest management", icon: "heroicons:bug-ant", category: "pest" },
      { title: "Clean overhead tank", frequency: "Quarterly", description: "Water tank maintenance", icon: "heroicons:droplets", category: "water" },
      { title: "Call plumber/electrician", frequency: "As needed", description: "Pending repairs and fixes", icon: "heroicons:wrench-screwdriver", category: "repairs" },
      { title: "Rotate mattress", frequency: "Seasonal", description: "Clean under furniture too", icon: "heroicons:home", category: "bedding" },
      { title: "Check expiry dates", frequency: "Monthly", description: "Cleaning liquids, oils, pantry items", icon: "heroicons:clock", category: "inventory" }
    ],
    travel: [
      { title: "Book festival travel", frequency: "Seasonal", description: "Pongal, Diwali travel planning", icon: "heroicons:map", category: "festival" },
      { title: "Pack temple clothes", frequency: "Travel planning", description: "Sarees, veshtis for temple visits", icon: "heroicons:shopping-bag", category: "clothing" },
      { title: "Carry ID cards", frequency: "Every travel", description: "Prescriptions and emergency contacts", icon: "heroicons:identification", category: "documents" },
      { title: "Plan food for elders/kids", frequency: "Travel planning", description: "Special dietary needs during travel", icon: "heroicons:cake", category: "food" },
      { title: "Check temple timings", frequency: "Pre-travel", description: "Dress codes and special requirements", icon: "heroicons:clock", category: "temple" },
      { title: "Confirm accommodation", frequency: "Peak season", description: "Near temples during festivals", icon: "heroicons:home", category: "lodging" }
    ],
    relationships: [
      { title: "Call elderly relatives", frequency: "Monthly", description: "Regular check-in calls", icon: "heroicons:phone", category: "family" },
      { title: "Plan anniversary celebrations", frequency: "Annual", description: "Milestone celebrations", icon: "heroicons:heart", category: "celebration" },
      { title: "Schedule self-care time", frequency: "Weekly", description: "Personal quiet time", icon: "heroicons:sparkles", category: "wellness" },
      { title: "Declutter wardrobe", frequency: "Seasonal", description: "Rotate and organize clothes", icon: "heroicons:archive-box", category: "organization" },
      { title: "Plan family prayer sessions", frequency: "Weekly", description: "Bhajan or prayer time together", icon: "heroicons:musical-note", category: "spiritual" },
      { title: "Thank elders after festivals", frequency: "Post-festival", description: "Express gratitude for gifts/blessings", icon: "heroicons:heart", category: "gratitude" }
    ],
    vehicle: [
      { title: "Vehicle Fast Tag", frequency: "Quarterly", description: "Recharge fast tag balance", icon: "heroicons:credit-card", category: "toll" },
      { title: "KYC Validation", frequency: "Half-yearly", description: "Update vehicle documents", icon: "heroicons:identification", category: "documents" },
      { title: "Gas cylinder usage", frequency: "Monthly", description: "Track days elapsed since last refill", icon: "heroicons:fire", category: "fuel" },
      { title: "Petrol top-up", frequency: "Weekly", description: "Check days since last refill", icon: "heroicons:bolt", category: "fuel" },
      { title: "Vehicle battery recharge", frequency: "Weekly", description: "Monitor days since last recharge", icon: "heroicons:battery-100", category: "maintenance" }
    ]
  };

  // Navigate to a path
  function navigateTo(path) {
    homeSounds.playClick();
    goto(path);
  }

  // Handle hover sound
  function handleHover() {
    homeSounds.playPop();
  }

  // Update family mood
  function updateMood(memberName, newMood, emoji, note) {
    const moodIndex = familyMoods.findIndex(m => m.member === memberName);
    if (moodIndex !== -1) {
      familyMoods[moodIndex] = {
        ...familyMoods[moodIndex],
        mood: newMood,
        emoji: emoji,
        note: note,
        time: "Just now"
      };
      familyMoods = [...familyMoods]; // Trigger reactivity
    }
  }

  // Quick expense entry
  function addQuickExpense(category, amount) {
    // This would normally save to a database
    console.log(`Added expense: ${category} - ₹${amount}`);
    // Update expense totals (would be handled by backend)
  }

  // Handle smart suggestion action
  function handleSuggestionAction(suggestion) {
    switch (suggestion.action) {
      case "Pay School Fees":
        navigateTo("/finances/update");
        break;
      case "Renew Insurance":
        navigateTo("/finances/update");
        break;
      case "Book Refill":
        navigateTo("/inventory/update");
        break;
      case "Update KYC":
        navigateTo("/users/update");
        break;
      case "Book Cleaning":
        navigateTo("/tasks/update");
        break;
      case "File Taxes":
        navigateTo("/finances/update");
        break;
      case "Plan Festival":
        navigateTo("/activities");
        break;
      case "Book Service":
        navigateTo("/tasks/update");
        break;
      default:
        console.log(`Action: ${suggestion.action}`);
    }
  }

  // Toggle task completion
  function toggleTask(taskId) {
    const task = dailyTasks.find(t => t.id === taskId);
    if (task) {
      task.status = task.status === 'completed' ? 'pending' : 'completed';
      dailyTasks = [...dailyTasks]; // Trigger reactivity
    }
  }

  // Mark bill as paid
  function markBillPaid(billId) {
    const bill = billsDue.find(b => b.id === billId);
    if (bill) {
      bill.status = 'paid';
      billsDue = [...billsDue]; // Trigger reactivity
    }
  }

  // Get priority color
  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  // Get status color
  function getStatusColor(status) {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  // Load standard reminders based on current context
  function getRelevantReminders() {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const reminders = [];

    // Financial reminders - always relevant
    reminders.push(...standardReminders.financial.slice(0, 3));

    // Cultural reminders based on season/month
    if (currentMonth >= 12 || currentMonth <= 2) { // Winter/early spring - festival season
      reminders.push(...standardReminders.cultural.slice(0, 2));
    }

    // Family reminders - always relevant
    reminders.push(...standardReminders.family.slice(0, 2));

    // Vehicle reminders - weekly checks
    reminders.push(...standardReminders.vehicle.slice(0, 2));

    return reminders.slice(0, 8); // Limit to 8 reminders
  }

  // Initialize ritual calendar on component mount
  onMount(() => {
    fetchRitualCalendar();
  });

  // Get bill urgency color based on days left
  function getBillUrgencyColor(daysLeft) {
    if (daysLeft <= 2) return 'bg-red-50 border-red-200';
    if (daysLeft <= 7) return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Welcome Header -->
    <div class="mb-8">
      <div class="glass-level-3 rounded-lg lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">
              <Icon icon="heroicons:home" class="text-indigo-600" />
              <span class="text-2xl font-bold text-orange-600 mr-2">ShivOhm</span>
              Home Management Suite
            </h1>
            <p class="text-gray-600 dark:text-gray-300 text-lg">Your comprehensive family management dashboard</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">தமிழ் நாள்: {new Date().toLocaleDateString('ta-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{new Date().toLocaleDateString()}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Today's Date</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🚨 CRITICAL ALERTS - Most Urgent (Large, Prominent) -->
    <div class="mb-8">
      <!-- Urgent Bills Alert -->
      {#if billsDue.filter(b => b.status !== 'paid' && b.daysLeft <= 3).length > 0}
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg lg:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 lg:mb-6 shadow-2xl border-4 border-red-300 animate-pulse">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-4 bg-white rounded-full">
                <Icon icon="heroicons:exclamation-triangle" class="text-4xl" />
              </div>
              <div>
                <h2 class="text-3xl font-bold mb-2">⚠️ URGENT PAYMENTS DUE</h2>
                <p class="text-xl opacity-90">
                  {billsDue.filter(b => b.status !== 'paid' && b.daysLeft <= 3).length} bill(s) due within 3 days
                  • Total: ₹{billsDue.filter(b => b.status !== 'paid' && b.daysLeft <= 3).reduce((sum, b) => sum + parseInt(b.amount.replace(/[₹,]/g, '')), 0).toLocaleString()}
                </p>
              </div>
            </div>
            <button class="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg" on:click={() => navigateTo('/finances')} on:mouseenter={handleHover}>
              Pay Now →
            </button>
          </div>
        </div>
      {/if}

      <!-- Critical Tasks Alert -->
      {#if dailyTasks.filter(t => t.status === 'pending' && t.priority === 'high').length > 0}
        <div class="border-4 border-orange-300/50 bg-transparent text-white rounded-lg lg:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 lg:mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-white rounded-full">
                <Icon icon="heroicons:clock" class="text-3xl" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-1">High Priority Tasks Pending</h3>
                <p class="text-lg opacity-90">
                  {dailyTasks.filter(t => t.status === 'pending' && t.priority === 'high').length} urgent task(s) need attention
                </p>
              </div>
            </div>
            <button class="px-6 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200" on:click={() => navigateTo('/todo')} on:mouseenter={handleHover}>
              View Tasks →
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- 🎯 TODAY'S PRIORITIES - High Priority (Large Cards) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4 lg:mb-8">
      <!-- Today's Critical Priorities -->
      <div class="glass-level-2 rounded-lg lg:rounded-2xl p-4 sm:p-6 lg:p-8">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <Icon icon="heroicons:clipboard-document-list" class="text-blue-600 text-3xl" />
          Today's Priorities
        </h3>
        <div class="space-y-4">
          {#each todaysPriorities.slice(0, 4) as priority}
            <div class="flex items-center justify-between p-4 glass-level-1 rounded-xl hover:glass-level-2 transition-all duration-200 border-l-4 {priority.priority === 'high' ? 'border-red-500' : priority.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'}">
              <div class="flex items-center gap-4">
                <div class="p-3 glass-level-3 rounded-lg shadow-sm">
                  <Icon icon={priority.icon} class="text-xl {priority.color}" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-800 dark:text-white text-lg">{priority.title}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{priority.description}</p>
                  <div class="flex items-center gap-4 text-sm">
                    <span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Icon icon="heroicons:clock" class="text-xs" />
                      {priority.dueIn}
                    </span>
                    <span class="px-3 py-1 text-xs rounded-full font-medium {priority.priority === 'high' ? 'bg-red-100 text-red-600' : priority.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}">
                      {priority.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors" on:click={() => console.log(`Action: ${priority.action}`)} on:mouseenter={handleHover}>
                {priority.action}
              </button>
            </div>
          {/each}
        </div>
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="p-3 bg-transparent border border-red-200/30 dark:border-red-800/30 rounded-lg">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">{todaysPriorities.filter(p => p.priority === 'high').length}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
            </div>
            <div class="p-3 bg-transparent border border-yellow-200/30 dark:border-yellow-800/30 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{todaysPriorities.filter(p => p.priority === 'medium').length}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Medium Priority</div>
            </div>
            <div class="p-3 bg-transparent border border-green-200/30 dark:border-green-800/30 rounded-lg">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">{todaysPriorities.filter(p => p.priority === 'low').length}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Low Priority</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Bills & Reminders -->
      <div class="border border-green-200/50 dark:border-green-800/50 rounded-2xl p-8 bg-transparent">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
          <Icon icon="heroicons:calendar-days" class="text-green-600 text-3xl" />
          Upcoming Bills & Reminders
        </h3>
        <div class="space-y-4 mb-6">
          {#each billsDue.filter(b => b.status !== 'paid').slice(0, 3) as bill}
            <div class="flex items-center justify-between p-4 bg-transparent border border-red-200/30 dark:border-red-800/30 rounded-xl">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Icon icon={bill.icon} class="text-xl {bill.color}" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white text-lg">{bill.bill}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{bill.amount} • Due {bill.dueDate}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-2 py-1 text-xs rounded-full font-medium {bill.daysLeft <= 2 ? 'bg-red-100 text-red-600' : bill.daysLeft <= 7 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}">
                      {bill.daysLeft} days left
                    </span>
                  </div>
                </div>
              </div>
              <button class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors" on:click={() => markBillPaid(bill.id)} on:mouseenter={handleHover}>
                Pay Now
              </button>
            </div>
          {/each}
        </div>

        <!-- Upcoming Important Dates -->
        <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Icon icon="heroicons:star" class="text-yellow-500" />
            Important Dates
          </h4>
          <div class="space-y-3">
            {#each upcomingImportantDates.slice(0, 3) as date}
              <div class="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Icon icon={date.icon} class="text-lg {date.color}" />
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">{date.title}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{date.date}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- 📊 MONITORING & UPCOMING - Medium Priority -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Bills Timeline -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:currency-rupee" class="text-red-500" />
          Bills Timeline
        </h3>
        <div class="space-y-3 mb-4">
          {#each billsDue.filter(b => b.status !== 'paid').slice(0, 4) as bill}
            <div class="flex items-center justify-between p-3 {getBillUrgencyColor(bill.daysLeft)} rounded-lg">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Icon icon={bill.icon} class="text-lg {bill.color}" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800 dark:text-white">{bill.bill}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{bill.amount} • Due {bill.dueDate}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs font-medium {bill.daysLeft <= 2 ? 'text-red-600' : bill.daysLeft <= 7 ? 'text-yellow-600' : 'text-gray-600'}">
                  {bill.daysLeft}d left
                </div>
                {#if bill.daysLeft <= 7}
                  <button class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors mt-1" on:click={() => markBillPaid(bill.id)} on:mouseenter={handleHover}>
                    Pay
                  </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
        <div class="pt-3 border-t border-gray-200 dark:border-gray-600">
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <div class="text-lg font-bold text-red-600 dark:text-red-400">{billsDue.filter(b => b.status !== 'paid').length}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Pending</div>
            </div>
            <div>
              <div class="text-lg font-bold text-orange-600 dark:text-orange-400">₹{billsDue.filter(b => b.status !== 'paid').reduce((sum, b) => sum + parseInt(b.amount.replace(/[₹,]/g, '')), 0).toLocaleString()}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Total Due</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:calendar-days" class="text-indigo-500" />
          Upcoming Events
        </h3>
        <div class="space-y-4">
          {#each upcomingEvents.slice(0, 3) as event}
            <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <div class="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Icon icon={event.icon} class="text-xl {event.color}" />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800 dark:text-white text-lg">{event.title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{event.date} at {event.time}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 🛕 Ritual Calendar -->
      <div class="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950 dark:via-red-950 dark:to-pink-950 rounded-xl p-6 shadow-lg border border-orange-200 dark:border-orange-800">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:fire" class="text-orange-500" />
          Ritual Calendar
        </h3>
        {#if isLoadingRituals}
          <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span class="ml-2 text-gray-600 dark:text-gray-400">Loading rituals...</span>
          </div>
        {:else}
          <div class="space-y-3">
            {#each ritualCalendar.slice(0, 4) as ritual}
              <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Icon icon={ritual.icon} class="text-lg {ritual.color}" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-800 dark:text-white text-sm">{ritual.name}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{ritual.description}</p>
                  <p class="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    {new Date(ritual.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            {/each}
          </div>
          {#if ritualCalendar.length === 0}
            <div class="text-center py-6 text-gray-500 dark:text-gray-400">
              <Icon icon="heroicons:moon" class="text-3xl mx-auto mb-2 opacity-50" />
              <p>No upcoming rituals this month</p>
            </div>
          {/if}
        {/if}
        <div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p class="text-xs text-gray-600 dark:text-gray-400 text-center">
            🪔 Amavasya • Pradosham • Ekadasi • Festivals
          </p>
        </div>
      </div>
    </div>

    <!-- 💡 INSIGHTS & PLANNING - Medium Priority -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4 lg:mb-8">
      <!-- Smart AI Suggestions -->
      <div class="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950 rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-amber-200 dark:border-amber-800">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:light-bulb" class="text-amber-500" />
          AI Insights & Suggestions
        </h3>
        <div class="space-y-4">
          {#each smartSuggestions as suggestion}
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Icon icon={suggestion.icon} class="text-lg text-amber-600" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800 dark:text-white">{suggestion.message}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">AI-powered suggestion</p>
                </div>
              </div>
              <button class="px-3 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors font-medium" on:click={() => handleSuggestionAction(suggestion)} on:mouseenter={handleHover}>
                {suggestion.action}
              </button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Family Mood & Quick Expense -->
      <div class="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950 dark:via-pink-950 dark:to-rose-950 rounded-xl p-6 shadow-lg border border-purple-200 dark:border-purple-800">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:face-smile" class="text-purple-500" />
          Family Mood & Quick Actions
        </h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          {#each familyMoods.slice(0, 4) as mood}
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div class="text-2xl mb-2">{mood.emoji}</div>
              <div class="text-sm font-medium text-gray-800 dark:text-white">{mood.member}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">{mood.time}</div>
            </div>
          {/each}
        </div>
        <div class="flex gap-2 mb-4">
          <button class="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors" on:click={() => updateMood("நான்", "happy", "😊", "Productive day!")} on:mouseenter={handleHover}>
            Update My Mood
          </button>
          <button class="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors" on:click={() => navigateTo("/wellness")} on:mouseenter={handleHover}>
            View Details
          </button>
        </div>
        <div class="pt-3 border-t border-gray-200 dark:border-gray-600">
          <div class="text-center">
            <div class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">₹2,450 / ₹3,000</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Today's Budget • ₹550 remaining</div>
          </div>
        </div>
      </div>
    </div>

    <!-- � SECONDARY INFORMATION - Low Priority -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:clock" class="text-gray-500" />
          Recent Activity
        </h3>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="p-1 bg-blue-100 dark:bg-blue-900/20 rounded">
              <Icon icon="heroicons:shopping-bag" class="text-blue-500 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800 dark:text-white">Grocery shopping completed</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">2 hours ago • ₹2,450</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="p-1 bg-green-100 dark:bg-green-900/20 rounded">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800 dark:text-white">School fees paid</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Yesterday • ₹15,000</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="p-1 bg-purple-100 dark:bg-purple-900/20 rounded">
              <Icon icon="heroicons:calendar" class="text-purple-500 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800 dark:text-white">Temple visit scheduled</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Tomorrow • 6:00 AM</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:calendar-days" class="text-indigo-500" />
          Upcoming Events
        </h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div>
              <p class="text-sm font-medium text-gray-800 dark:text-white">Pongal Celebration</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Jan 15 • Family Event</p>
            </div>
            <div class="text-right">
              <div class="text-xs font-medium text-indigo-600 dark:text-indigo-400">3 days</div>
            </div>
          </div>
          <div class="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <div>
              <p class="text-sm font-medium text-gray-800 dark:text-white">Medical Checkup</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Jan 20 • Health</p>
            </div>
            <div class="text-right">
              <div class="text-xs font-medium text-pink-600 dark:text-pink-400">8 days</div>
            </div>
          </div>
          <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <p class="text-sm font-medium text-gray-800 dark:text-white">Garden Maintenance</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Jan 25 • Home</p>
            </div>
            <div class="text-right">
              <div class="text-xs font-medium text-green-600 dark:text-green-400">13 days</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:chart-bar" class="text-teal-500" />
          Quick Stats
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <div class="text-xl font-bold text-teal-600 dark:text-teal-400 mb-1">12</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Tasks Completed</div>
            <div class="text-xs text-green-600 dark:text-green-400">This Week</div>
          </div>
          <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div class="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">8</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Meals Prepared</div>
            <div class="text-xs text-green-600 dark:text-green-400">This Week</div>
          </div>
          <div class="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-1">5</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Family Outings</div>
            <div class="text-xs text-green-600 dark:text-green-400">This Month</div>
          </div>
          <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">98%</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Budget Adherence</div>
            <div class="text-xs text-green-600 dark:text-green-400">This Month</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 📋 STANDARD REMINDERS - Reference Guide -->
    <div class="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <Icon icon="heroicons:bell-alert" class="text-orange-500" />
        Standard Reminders Reference
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Financial & Admin -->
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:currency-rupee" class="text-blue-600" />
            Financial & Admin
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">School fees (quarterly)</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Insurance renewal (annual)</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Tax filing (March 31)</span>
            </div>
          </div>
        </div>

        <!-- Cultural & Rituals -->
        <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <h4 class="font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:fire" class="text-orange-600" />
            Cultural & Rituals
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Festival preparations</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Temple visit planning</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Panchangam tracking</span>
            </div>
          </div>
        </div>

        <!-- Family & Health -->
        <div class="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
          <h4 class="font-semibold text-pink-800 dark:text-pink-200 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:heart" class="text-pink-600" />
            Family & Health
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Doctor appointments</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Medication refills</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">School form submissions</span>
            </div>
          </div>
        </div>

        <!-- Home Maintenance -->
        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:wrench-screwdriver" class="text-green-600" />
            Home Maintenance
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Deep cleaning (monthly)</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Pest control (quarterly)</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Appliance servicing</span>
            </div>
          </div>
        </div>

        <!-- Vehicle & Travel -->
        <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:truck" class="text-purple-600" />
            Vehicle & Travel
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Fast tag recharge</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Fuel monitoring</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Festival travel planning</span>
            </div>
          </div>
        </div>

        <!-- Relationships -->
        <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <h4 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:users" class="text-indigo-600" />
            Relationships
          </h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Call elderly relatives</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Anniversary planning</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="heroicons:check-circle" class="text-green-500 text-xs" />
              <span class="text-gray-700 dark:text-gray-300">Family prayer sessions</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          💡 These reminders are automatically suggested based on South Indian family lifestyle patterns
        </p>
      </div>
    </div>

    <!-- Smart Suggestions & Quick Expense Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Smart Suggestions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:light-bulb" class="text-amber-500" />
          Smart Suggestions
        </h3>
        <div class="space-y-4">
          {#each smartSuggestions as suggestion}
            <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Icon icon={suggestion.icon} class="text-lg text-amber-600" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800 dark:text-white">{suggestion.message}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">AI-powered suggestion</p>
                </div>
              </div>
              <button class="px-3 py-1 bg-amber-500 text-white text-xs rounded-full hover:bg-amber-600 transition-colors" on:click={() => handleSuggestionAction(suggestion)} on:mouseenter={handleHover}>
                {suggestion.action}
              </button>
            </div>
          {/each}
        </div>
      </div>

      <!-- Quick Expense Entry -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Icon icon="heroicons:credit-card" class="text-emerald-500" />
          Quick Expense Entry
        </h3>
        <div class="grid grid-cols-2 gap-3 mb-4">
          {#each expenseCategories as category}
            <button class="p-3 {category.bgColor} dark:bg-opacity-20 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105" on:click={() => addQuickExpense(category.name, 0)} on:mouseenter={handleHover}>
              <Icon icon={category.icon} class="text-xl {category.color} mb-2" />
              <div class="text-xs font-medium text-gray-800 dark:text-white">{category.name}</div>
            </button>
          {/each}
        </div>
        <div class="flex gap-2">
          <input type="number" placeholder="Amount (₹)" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
          <button class="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors" on:click={() => console.log('Add expense')} on:mouseenter={handleHover}>
            Add
          </button>
        </div>
        <div class="mt-4 text-xs text-gray-600 dark:text-gray-400">
          Today's expenses: ₹2,450 • Budget remaining: ₹14,770
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950 dark:via-blue-950 dark:to-cyan-950 rounded-xl p-6 shadow-lg border border-indigo-200 dark:border-indigo-800">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <Icon icon="heroicons:bolt" class="text-purple-500" />
        Quick Actions
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/tasks/update")} on:mouseenter={handleHover} use:mobileGestures={{
          onLongPress: () => dispatch('quickAction', { action: 'quick-task', tile: 'Add Task' })
        }}>
          <Icon icon="heroicons:clipboard-document-list" class="text-xl" />
          <span class="text-sm font-medium">Add Task</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/notes")} on:mouseenter={handleHover} use:mobileGestures={{
          onLongPress: () => dispatch('quickAction', { action: 'quick-note', tile: 'New Note' })
        }}>
          <Icon icon="heroicons:document-text" class="text-xl" />
          <span class="text-sm font-medium">New Note</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/events")} on:mouseenter={handleHover}>
          <Icon icon="heroicons:calendar-days" class="text-xl" />
          <span class="text-sm font-medium">Schedule</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/reminders")} on:mouseenter={handleHover} use:mobileGestures={{
          onLongPress: () => dispatch('quickAction', { action: 'quick-reminder', tile: 'Reminder' })
        }}>
          <Icon icon="heroicons:bell-alert" class="text-xl" />
          <span class="text-sm font-medium">Reminder</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/wellness")} on:mouseenter={handleHover}>
          <Icon icon="heroicons:heart" class="text-xl" />
          <span class="text-sm font-medium">Health</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/expenses/update")} on:mouseenter={handleHover}>
          <Icon icon="heroicons:credit-card" class="text-xl" />
          <span class="text-sm font-medium">Expense</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/foods/update")} on:mouseenter={handleHover}>
          <Icon icon="heroicons:shopping-cart" class="text-xl" />
          <span class="text-sm font-medium">Grocery</span>
        </button>
        <button class="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105" on:click={() => navigateTo("/assistant")} on:mouseenter={handleHover}>
          <Icon icon="heroicons:chat-bubble-left-right" class="text-xl" />
          <span class="text-sm font-medium">AI Help</span>
        </button>
      </div>
    </div>

    <!-- Inspirational Quote -->
    <div class="mt-8 text-center">
      <div class="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 dark:from-orange-900 dark:via-red-900 dark:to-pink-900 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
        <blockquote class="text-lg font-medium text-gray-800 dark:text-white italic mb-2">
          "குடும்பம் ஒன்று கூடினால், குறைவொன்றும் இல்லை"
        </blockquote>
        <cite class="text-sm text-gray-600 dark:text-gray-400">— திருக்குறள் (Family unity brings prosperity)</cite>
      </div>
    </div>
  </div>
</div>
