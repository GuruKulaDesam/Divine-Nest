// Enhanced Education & Learning Data for South Indian Families
// Designed specifically for CBSE 6th grade (Thambi) and 11th grade + JEE (Akka)

// Student Profiles
export const StudentProfiles = {
  thambi: {
    id: "thambi",
    name: "Thambi",
    tamil: "தம்பி",
    grade: "6th CBSE",
    age: 11,
    avatar: "student-boy",
    subjects: ["Mathematics", "Science", "English", "Tamil", "Social Science", "Hindi"],
    goals: ["Mathematics Olympiad", "Handwriting Improvement", "Tamil Poetry", "Science Projects"],
    strengths: ["Drawing", "Puzzles", "Logical Thinking", "Art"],
    challenges: ["Tamil Grammar", "Focus Issues", "Time Management"],
    achievements: [
      { title: "School Drawing Competition", position: "2nd Place", date: "2025-03-15" },
      { title: "Math Quiz", position: "3rd Place", date: "2025-04-10" }
    ],
    currentStreak: 7, // days
    totalStars: 45,
    badges: ["First Week Completed", "Science Explorer", "Tamil Learner"]
  },
  akka: {
    id: "akka",
    name: "Akka", 
    tamil: "அக்கா",
    grade: "11th CBSE + JEE",
    age: 16,
    avatar: "student-girl",
    subjects: ["Physics", "Chemistry", "Mathematics", "English", "Computer Science"],
    jeeSubjects: ["JEE Physics", "JEE Chemistry", "JEE Mathematics"],
    goals: ["JEE Main Rank < 1000", "NEET Backup", "Python Programming", "State Board Topper"],
    strengths: ["Logical Reasoning", "Writing", "Chemistry", "Problem Solving"],
    challenges: ["Time Management", "Chemistry Organic", "Physics Mechanics"],
    achievements: [
      { title: "District Science Fair", position: "1st Place", date: "2025-02-20" },
      { title: "Tamil Essay Competition", position: "2nd Place", date: "2025-03-25" },
      { title: "School Physics Olympiad", position: "1st Place", date: "2025-04-15" }
    ],
    currentStreak: 12, // days  
    totalStars: 89,
    badges: ["Physics Master", "Tamil Writer", "Consistent Learner", "JEE Warrior"]
  }
};

// CBSE Class 6 Curriculum (Thambi)
export const Class6Curriculum = {
  mathematics: {
    name: "Mathematics",
    tamil: "கணிதம்",
    chapters: [
      { id: 1, title: "Knowing Our Numbers", tamil: "எண்களை அறிதல்", status: "completed" },
      { id: 2, title: "Whole Numbers", tamil: "முழு எண்கள்", status: "completed" },
      { id: 3, title: "Playing with Numbers", tamil: "எண்களுடன் விளையாடுதல்", status: "in-progress" },
      { id: 4, title: "Basic Geometrical Ideas", tamil: "அடிப்படை வடிவியல்", status: "pending" },
      { id: 5, title: "Understanding Elementary Shapes", tamil: "அடிப்படை வடிவங்கள்", status: "pending" },
      { id: 6, title: "Integers", tamil: "முழு எண்கள்", status: "pending" },
      { id: 7, title: "Fractions", tamil: "பின்னங்கள்", status: "pending" },
      { id: 8, title: "Decimals", tamil: "தசமங்கள்", status: "pending" },
      { id: 9, title: "Data Handling", tamil: "தரவு கையாளுதல்", status: "pending" }
    ]
  },
  science: {
    name: "Science", 
    tamil: "அறிவியல்",
    chapters: [
      { id: 1, title: "Food: Where Does it Come From?", tamil: "உணவு: எங்கிருந்து வருகிறது?", status: "completed" },
      { id: 2, title: "Components of Food", tamil: "உணவின் கூறுகள்", status: "completed" },
      { id: 3, title: "Fibre to Fabric", tamil: "நார் முதல் துணி வரை", status: "in-progress" },
      { id: 4, title: "Sorting Materials into Groups", tamil: "பொருட்களை குழுக்களாக பிரித்தல்", status: "pending" },
      { id: 5, title: "Separation of Substances", tamil: "பொருட்களை பிரித்தல்", status: "pending" },
      { id: 6, title: "Changes Around Us", tamil: "நம்மைச் சுற்றியுள்ள மாற்றங்கள்", status: "pending" },
      { id: 7, title: "Getting to Know Plants", tamil: "தாவரங்களை அறிந்து கொள்ளுதல்", status: "pending" },
      { id: 8, title: "Body Movements", tamil: "உடல் அசைவுகள்", status: "pending" },
      { id: 9, title: "The Living Organisms", tamil: "உயிரினங்கள்", status: "pending" },
      { id: 10, title: "Motion and Measurement", tamil: "இயக்கம் மற்றும் அளவீடு", status: "pending" },
      { id: 11, title: "Light, Shadows and Reflections", tamil: "ஒளி, நிழல் மற்றும் பிரதிபலிப்பு", status: "pending" }
    ]
  },
  english: {
    name: "English",
    tamil: "ஆங்கிலம்",
    chapters: [
      { id: 1, title: "Reading Skills", tamil: "வாசிப்பு திறன்", status: "in-progress" },
      { id: 2, title: "Grammar Fundamentals", tamil: "இலக்கண அடிப்படைகள்", status: "in-progress" },
      { id: 3, title: "Creative Writing", tamil: "ஆக்கப்பூர்வ எழுத்து", status: "pending" },
      { id: 4, title: "Comprehension", tamil: "புரிந்துகொள்ளுதல்", status: "pending" }
    ]
  },
  tamil: {
    name: "Tamil", 
    tamil: "தமிழ்",
    chapters: [
      { id: 1, title: "இலக்கியம்", english: "Literature", status: "in-progress" },
      { id: 2, title: "இலக்கணம்", english: "Grammar", status: "pending" },
      { id: 3, title: "கவிதை", english: "Poetry", status: "in-progress" },
      { id: 4, title: "கதை எழுதுதல்", english: "Story Writing", status: "pending" }
    ]
  }
};

// CBSE Class 11 + JEE Curriculum (Akka)
export const Class11Curriculum = {
  physics: {
    name: "Physics",
    tamil: "இயற்பியல்", 
    chapters: [
      { id: 1, title: "Physical World", tamil: "இயற்பியல் உலகம்", status: "completed", jeeLevel: "medium" },
      { id: 2, title: "Units and Measurements", tamil: "அலகுகள் மற்றும் அளவீடுகள்", status: "completed", jeeLevel: "easy" },
      { id: 3, title: "Motion in a Straight Line", tamil: "நேர்கோட்டு இயக்கம்", status: "completed", jeeLevel: "medium" },
      { id: 4, title: "Motion in a Plane", tamil: "समतल में गति", status: "in-progress", jeeLevel: "hard" },
      { id: 5, title: "Laws of Motion", tamil: "இயக்க விதிகள்", status: "in-progress", jeeLevel: "hard" },
      { id: 6, title: "Work, Energy and Power", tamil: "வேலை, ஆற்றல் மற்றும் சக்தி", status: "pending", jeeLevel: "hard" },
      { id: 7, title: "System of Particles", tamil: "துகள் அமைப்புகள்", status: "pending", jeeLevel: "hard" },
      { id: 8, title: "Rotational Motion", tamil: "சுழற்சி இயக்கம்", status: "pending", jeeLevel: "hard" },
      { id: 9, title: "Gravitation", tamil: "ஈர்ப்பு விசை", status: "pending", jeeLevel: "medium" },
      { id: 10, title: "Mechanical Properties", tamil: "இயந்திர பண்புகள்", status: "pending", jeeLevel: "medium" }
    ]
  },
  chemistry: {
    name: "Chemistry",
    tamil: "வேதியியல்",
    chapters: [
      { id: 1, title: "Some Basic Concepts", tamil: "அடிப்படை கருத்துகள்", status: "completed", jeeLevel: "easy" },
      { id: 2, title: "Structure of Atom", tamil: "அணு அமைப்பு", status: "completed", jeeLevel: "medium" },
      { id: 3, title: "Classification of Elements", tamil: "தனிமங்களின் வகைப்பாடு", status: "in-progress", jeeLevel: "medium" },
      { id: 4, title: "Chemical Bonding", tamil: "வேதியியல் பிணைப்பு", status: "in-progress", jeeLevel: "hard" },
      { id: 5, title: "States of Matter", tamil: "பொருளின் நிலைகள்", status: "pending", jeeLevel: "medium" },
      { id: 6, title: "Thermodynamics", tamil: "வெப்ப இயக்கவியல்", status: "pending", jeeLevel: "hard" },
      { id: 7, title: "Equilibrium", tamil: "சமநிலை", status: "pending", jeeLevel: "hard" },
      { id: 8, title: "Redox Reactions", tamil: "ஆக்சிஜன் குறைப்பு வினைகள்", status: "pending", jeeLevel: "medium" },
      { id: 9, title: "Hydrogen", tamil: "ஹைட்ரஜன்", status: "pending", jeeLevel: "easy" },
      { id: 10, title: "The s-Block Elements", tamil: "s-block தனிமங்கள்", status: "pending", jeeLevel: "medium" }
    ]
  },
  mathematics: {
    name: "Mathematics",
    tamil: "கணிதம்",
    chapters: [
      { id: 1, title: "Sets", tamil: "கணங்கள்", status: "completed", jeeLevel: "easy" },
      { id: 2, title: "Relations and Functions", tamil: "தொடர்புகள் மற்றும் சார்புகள்", status: "completed", jeeLevel: "medium" },
      { id: 3, title: "Trigonometric Functions", tamil: "முக்கோணவியல் சார்புகள்", status: "in-progress", jeeLevel: "medium" },
      { id: 4, title: "Principle of Mathematical Induction", tamil: "கணித தூண்டல் கொள்கை", status: "in-progress", jeeLevel: "hard" },
      { id: 5, title: "Complex Numbers", tamil: "சிக்கலான எண்கள்", status: "pending", jeeLevel: "hard" },
      { id: 6, title: "Linear Inequalities", tamil: "நேரியல் சமத்துவமின்மைகள்", status: "pending", jeeLevel: "medium" },
      { id: 7, title: "Permutations and Combinations", tamil: "வரிசைமாற்றம் மற்றும் சேர்க்கைகள்", status: "pending", jeeLevel: "hard" },
      { id: 8, title: "Binomial Theorem", tamil: "இருபদம் தேற்றம்", status: "pending", jeeLevel: "medium" },
      { id: 9, title: "Sequences and Series", tamil: "தொடர்கள்", status: "pending", jeeLevel: "hard" },
      { id: 10, title: "Straight Lines", tamil: "நேர்கோடுகள்", status: "pending", jeeLevel: "medium" }
    ]
  }
};

// Education Sections for Navigation
export const EducationSections = [
  {
    id: "dashboard",
    name: "Dashboard",
    tamil: "முதன்மை பக்கம்",
    icon: "heroicons:academic-cap",
    color: "blue",
    description: "Overview of all learning activities"
  },
  {
    id: "students", 
    name: "Student Profiles",
    tamil: "மாணவர் விவரங்கள்",
    icon: "heroicons:user-group",
    color: "green", 
    description: "Thambi & Akka's learning journey"
  },
  {
    id: "curriculum",
    name: "Curriculum Tracker", 
    tamil: "பாடத்திட்ட கண்காணிப்பு",
    icon: "heroicons:book-open",
    color: "purple",
    description: "CBSE syllabus progress tracking"
  },
  {
    id: "planner",
    name: "Study Planner",
    tamil: "படிப்பு திட்டம்",
    icon: "heroicons:calendar-days", 
    color: "orange",
    description: "Daily/weekly study schedules"
  },
  {
    id: "quiz",
    name: "Auto Quiz Generator",
    tamil: "தானியங்கி வினாவிடை",
    icon: "heroicons:puzzle-piece",
    color: "pink",
    description: "Chapter-wise practice quizzes"
  },
  {
    id: "assessment",
    name: "Assessment & Feedback",
    tamil: "மதிப்பீடு மற்றும் கருத்து",
    icon: "heroicons:chart-bar",
    color: "indigo",
    description: "Test scores and progress analysis"
  },
  {
    id: "courses",
    name: "Courses & Resources", 
    tamil: "பாடப்பிரிவுகள் மற்றும் வளங்கள்",
    icon: "heroicons:video-camera",
    color: "red",
    description: "Study materials and video links"
  },
  {
    id: "mentors",
    name: "Mentorship & Guidance",
    tamil: "வழிகாட்டுதல்",
    icon: "heroicons:chat-bubble-left-right",
    color: "teal",
    description: "Family and teacher guidance"
  },
  {
    id: "achievements", 
    name: "Achievements & Certificates",
    tamil: "சாதனைகள் மற்றும் சான்றிதழ்கள்",
    icon: "heroicons:trophy",
    color: "yellow",
    description: "Awards and milestones"
  },
  {
    id: "archive",
    name: "Archive & Reference",
    tamil: "காப்பகம் மற்றும் குறிப்பு", 
    icon: "heroicons:archive-box",
    color: "gray",
    description: "Past notes and resources"
  }
];

// Quiz Question Types and Difficulty Levels  
export const QuizConfig = {
  questionTypes: [
    { id: "mcq", name: "Multiple Choice", tamil: "பல் தேர்வு" },
    { id: "fill", name: "Fill in the Blanks", tamil: "இடங்களை நிரப்புக" },
    { id: "match", name: "Match the Following", tamil: "பொருத்துக" },
    { id: "short", name: "Short Answer", tamil: "சுருக்கமான பதில்" },
    { id: "reasoning", name: "Reasoning Based", tamil: "நியாயப்படுத்துதல்" },
    { id: "diagram", name: "Diagram Labeling", tamil: "வரைபட குறிப்பீட்டு" }
  ],
  difficultyLevels: [
    { id: "easy", name: "Easy", tamil: "எளிது", description: "Recall and basic understanding" },
    { id: "medium", name: "Medium", tamil: "நடுத்தர", description: "Application and analysis" },
    { id: "hard", name: "Hard", tamil: "கடினம்", description: "Synthesis and JEE level" }
  ]
};

// Family Mentors and Guidance  
export const FamilyMentors = {
  appa: {
    name: "Appa",
    tamil: "அப்பா", 
    subjects: ["Mathematics", "Physics", "Problem Solving"],
    specialties: ["JEE Preparation", "Time Management", "Logical Thinking"],
    adviceGiven: [
      { date: "2025-10-01", topic: "JEE Study Plan", advice: "Focus on understanding concepts, not just solving" },
      { date: "2025-09-28", topic: "Math Problem", advice: "Break complex problems into smaller steps" }
    ]
  },
  amma: {
    name: "Amma", 
    tamil: "அம்மா",
    subjects: ["English", "Tamil", "Writing Skills"], 
    specialties: ["Language Skills", "Creative Writing", "Communication"],
    adviceGiven: [
      { date: "2025-10-02", topic: "English Essay", advice: "Practice writing daily, read more books" },
      { date: "2025-09-30", topic: "Tamil Poetry", advice: "Understand the emotion behind the words" }
    ]
  },
  paati: {
    name: "Paati",
    tamil: "பாட்டி",
    subjects: ["Tamil", "Moral Values", "Life Skills"],
    specialties: ["Tamil Literature", "Cultural Knowledge", "Wisdom"],
    blessings: [
      { date: "2025-10-05", occasion: "Before Exam", blessing: "May Saraswati bless your studies" },
      { date: "2025-09-25", occasion: "Study Start", blessing: "Knowledge is the greatest wealth" }
    ]
  }
};

// Motivational Features
export const MotivationSystem = {
  streakTypes: ["Daily Study", "Tamil Reading", "Science Practice", "Math Problems"],
  badgeCategories: [
    {
      category: "Academic",
      badges: ["First Week Completed", "Chapter Master", "Quiz Champion", "Consistent Learner"]
    },
    {
      category: "Cultural", 
      badges: ["Tamil Scholar", "Festival Learner", "Story Teller", "Heritage Keeper"]
    },
    {
      category: "Life Skills",
      badges: ["Time Manager", "Helper", "Creative Thinker", "Problem Solver"]
    }
  ],
  encouragementMessages: {
    appa: [
      "Proud of your math effort today, keep going!",
      "You're thinking like a true engineer",
      "Every problem you solve makes you stronger"
    ],
    amma: [
      "Your writing is improving beautifully", 
      "Reading makes you wise and eloquent",
      "Express yourself fearlessly"
    ],
    paati: [
      "Knowledge is the lamp that lights your path",
      "May Saraswati guide your learning",
      "Study with devotion, succeed with humility"
    ]
  }
};

// Festival-themed Study Plans
export const FestivalStudyModes = {
  diwali: {
    name: "Diwali Mode",
    tamil: "தீபாவளி முறை",
    schedule: "Light revision with celebration breaks",
    subjects: ["Tamil (festival poems)", "Science (light & sound)", "Math (patterns in kolam)"],
    activities: ["Kolam geometry", "Festival story writing", "Light experiment"]
  },
  pongal: {
    name: "Pongal Mode", 
    tamil: "பொங்கல் முறை",
    schedule: "Nature-focused learning",
    subjects: ["Science (agriculture)", "Tamil (harvest songs)", "Math (harvest calculations)"],
    activities: ["Plant growth study", "Traditional poetry", "Farm math problems"]
  },
  navaratri: {
    name: "Navaratri Mode",
    tamil: "நவராத்திரி முறை", 
    schedule: "Creative learning with arts integration",
    subjects: ["Tamil (devotional literature)", "History (cultural traditions)", "Art integration"],
    activities: ["Cultural essay writing", "Historical timeline", "Dance-math patterns"]
  }
};

// Study Plan Templates
export const StudyPlanTemplates = {
  schoolDay: {
    name: "School Day",
    tamil: "பள்ளி நாள்",
    timeSlots: [
      { time: "06:00", activity: "Morning revision", duration: 30 },
      { time: "16:00", activity: "Homework completion", duration: 60 },
      { time: "19:00", activity: "Subject practice", duration: 45 },
      { time: "20:30", activity: "Reading/Tamil", duration: 30 }
    ]
  },
  weekend: {
    name: "Weekend", 
    tamil: "வார இறுதி",
    timeSlots: [
      { time: "08:00", activity: "Deep study session", duration: 90 },
      { time: "10:00", activity: "Break", duration: 30 },
      { time: "10:30", activity: "Practice problems", duration: 60 },
      { time: "15:00", activity: "Creative learning", duration: 45 },
      { time: "16:00", activity: "Review & planning", duration: 30 }
    ]
  },
  examPrep: {
    name: "Exam Preparation",
    tamil: "தேர்வு தயாரிப்பு", 
    timeSlots: [
      { time: "06:00", activity: "Formula revision", duration: 45 },
      { time: "08:00", activity: "Practice tests", duration: 90 },
      { time: "11:00", activity: "Doubt clearing", duration: 60 },
      { time: "15:00", activity: "Weak area focus", duration: 90 },
      { time: "17:00", activity: "Quick revision", duration: 45 }
    ]
  }
};

// Export current academic year data
export const CurrentAcademicData = {
  year: "2025-26",
  term: "First Term",
  studentProfiles: StudentProfiles,
  class6: Class6Curriculum,
  class11: Class11Curriculum,
  sections: EducationSections,
  quizConfig: QuizConfig,
  mentors: FamilyMentors,
  motivation: MotivationSystem,
  festivals: FestivalStudyModes,
  templates: StudyPlanTemplates
};