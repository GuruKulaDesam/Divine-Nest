<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { db } from "../../src/lib/data/database.js";

  let currentTab = "overview";
  let selectedChild = "ravi";
  let currentWeek = 1;
  let showAddTask = false;
  let studyPlans = [];

  const tabs = [
    { id: "overview", label: "Study Overview", icon: "heroicons:academic-cap" },
    { id: "weekly", label: "Weekly Plans", icon: "heroicons:calendar" },
    { id: "progress", label: "Progress Tracking", icon: "heroicons:chart-bar" },
    { id: "resources", label: "Study Resources", icon: "heroicons:book-open" },
    { id: "schedule", label: "Daily Schedule", icon: "heroicons:clock" },
  ];

  const children = [
    {
      id: "ravi",
      name: "Ravi",
      class: "6th Grade CBSE",
      age: 11,
      subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Sanskrit"],
      goals: ["Strong foundation in basics", "Develop study habits", "Extra-curricular balance"],
      challenges: ["Time management", "Math problem solving", "Reading comprehension"],
    },
    {
      id: "priya",
      name: "Priya",
      class: "11th Grade - JEE Preparation",
      age: 16,
      subjects: ["Physics", "Chemistry", "Mathematics", "English", "Optional: Computer Science"],
      goals: ["JEE Main & Advanced preparation", "Board exam excellence", "College admissions"],
      challenges: ["JEE competition pressure", "Time intensive subjects", "Balance board + competitive exams"],
    },
  ];

  // Comprehensive Study Plans
  const studyPlansData = {
    ravi: {
      overview: {
        currentGPA: 8.5,
        targetGPA: 9.0,
        weeklyStudyHours: 25,
        completedAssignments: 85,
        pendingAssignments: 3,
        upcomingExams: [
          { subject: "Mathematics", date: "2024-02-15", type: "Unit Test", syllabus: "Fractions & Decimals" },
          { subject: "Science", date: "2024-02-20", type: "Quarterly", syllabus: "Light, Shadows & Reflections" },
          { subject: "English", date: "2024-02-25", type: "Composition", syllabus: "Letter Writing & Essays" },
        ],
        recentAchievements: ["Scored 95% in Mathematics Unit Test", "Won 2nd prize in Science Exhibition", "Completed extra reading assignment", "Improved handwriting significantly"],
        parentNotes: "Ravi shows consistent improvement in analytical thinking. Needs more practice in English composition.",
      },
      weeklyPlan: [
        {
          week: 1,
          theme: "Foundation Building",
          subjects: {
            mathematics: {
              topics: ["Whole Numbers", "Playing with Numbers"],
              hours: 6,
              assignments: ["NCERT Ex 1.1-1.3", "Mental Math Practice", "Word Problems"],
              resources: ["Khan Academy", "Vedantu Classes", "Dad's Engineering Notes"],
              assessments: ["Weekly Quiz", "Homework Review"],
            },
            science: {
              topics: ["Food - Where does it come from?", "Components of Food"],
              hours: 5,
              assignments: ["Activity: Plant/Animal Food Sources", "Nutrients Chart", "NCERT Questions"],
              resources: ["Byjus Videos", "Science Laboratory", "Field Trip to Garden"],
              assessments: ["Practical Assessment", "Concept Map"],
            },
            english: {
              topics: ["Reading Comprehension", "Grammar - Nouns & Pronouns"],
              hours: 4,
              assignments: ["Daily Reading 30 mins", "Grammar Worksheets", "Vocabulary Building"],
              resources: ["Honeysuckle Textbook", "English Library Books", "Oxford Grammar"],
              assessments: ["Reading Test", "Grammar Quiz"],
            },
            hindi: {
              topics: ["वसंत - पाठ 1-2", "व्याकरण - संज्ञा"],
              hours: 3,
              assignments: ["पाठ के प्रश्न", "हस्तलेखन अभ्यास", "कविता स्मरण"],
              resources: ["NCERT वसंत", "Hindi Stories", "Grandparents' Help"],
              assessments: ["श्लोक स्मरण", "लेखन परीक्षा"],
            },
            social: {
              topics: ["What, Where, How and When?", "From Hunting-Gathering to Growing Food"],
              hours: 4,
              assignments: ["Map Work", "Timeline Creation", "NCERT Exercises"],
              resources: ["Atlas", "History Videos", "Museum Visit"],
              assessments: ["Map Test", "Timeline Quiz"],
            },
            sanskrit: {
              topics: ["देवनागरी लिपि", "स्वर व्यंजन"],
              hours: 2,
              assignments: ["लिपि अभ्यास", "मंत्र स्मरण", "श्लोक अभ्यास"],
              resources: ["संस्कृत पुस्तक", "आर्ष ग्रंथ", "Temple Classes"],
              assessments: ["लिपि परीक्षा", "श्लोक प्रतियोगिता"],
            },
          },
          culturalActivities: ["Bharatanatyam 3hrs/week", "Veena practice 2hrs/week", "Temple visits"],
          physicalActivities: ["Cricket 4hrs/week", "Yoga 30mins daily", "Cycling"],
          totalStudyHours: 24,
        },
      ],
      dailySchedule: {
        monday: [
          { time: "06:00", activity: "Wake up, Personal hygiene", icon: "heroicons:sun" },
          { time: "06:30", activity: "Yoga & Exercise", icon: "heroicons:heart" },
          { time: "07:00", activity: "Sanskrit Slokas & Prayers", icon: "heroicons:star" },
          { time: "07:30", activity: "Breakfast & School Prep", icon: "heroicons:cake" },
          { time: "08:30", activity: "School (Mathematics, Science, English)", icon: "heroicons:academic-cap" },
          { time: "15:30", activity: "Lunch & Rest", icon: "heroicons:home" },
          { time: "16:30", activity: "Homework - Mathematics", icon: "heroicons:calculator" },
          { time: "17:30", activity: "Play Time / Cricket", icon: "heroicons:puzzle-piece" },
          { time: "18:30", activity: "Bharatanatyam Practice", icon: "heroicons:musical-note" },
          { time: "19:30", activity: "Evening Study - Hindi", icon: "heroicons:book-open" },
          { time: "20:30", activity: "Dinner & Family Time", icon: "heroicons:heart" },
          { time: "21:30", activity: "Reading / Story Time", icon: "heroicons:book-open" },
          { time: "22:00", activity: "Sleep", icon: "heroicons:moon" },
        ],
      },
    },
    priya: {
      overview: {
        currentGPA: 9.2,
        targetGPA: 9.5,
        weeklyStudyHours: 60,
        completedAssignments: 92,
        pendingAssignments: 2,
        upcomingExams: [
          { subject: "Physics", date: "2024-02-18", type: "JEE Mock Test", syllabus: "Mechanics - Laws of Motion" },
          { subject: "Chemistry", date: "2024-02-22", type: "Board Preparation", syllabus: "Chemical Bonding" },
          { subject: "Mathematics", date: "2024-02-28", type: "JEE Advanced Level", syllabus: "Trigonometry & Coordinate Geometry" },
        ],
        recentAchievements: ["AIR 458 in JEE Mock Test Series", "99.2% in Chemistry Unit Test", "Selected for National Science Olympiad", "Completed Additional Mathematics Course"],
        parentNotes: "Priya maintains excellent academic performance. Monitor stress levels during intensive preparation.",
      },
      weeklyPlan: [
        {
          week: 1,
          theme: "JEE Foundation & Board Preparation",
          subjects: {
            physics: {
              topics: ["Kinematics", "Laws of Motion", "Work Energy Power"],
              hours: 18,
              assignments: ["HC Verma Ex 1-3", "JEE Previous Years", "Board Pattern Questions", "Lab Experiments"],
              resources: ["HC Verma", "Resnick Halliday", "Allen Study Material", "Physics Wallah"],
              assessments: ["Weekly JEE Mock", "Board Pattern Test", "Concept Building Quiz"],
            },
            chemistry: {
              topics: ["Atomic Structure", "Chemical Bonding", "Thermodynamics"],
              hours: 16,
              assignments: ["NCERT + Exemplar", "OP Tandon", "JEE Mains Questions", "Reaction Mechanisms"],
              resources: ["NCERT", "OP Tandon", "MS Chauhan", "Unacademy JEE"],
              assessments: ["Organic Reactions Test", "Numerical Problems", "Theory Questions"],
            },
            mathematics: {
              topics: ["Trigonometry", "Coordinate Geometry", "Sequences & Series"],
              hours: 16,
              assignments: ["RD Sharma", "Cengage", "JEE Advanced Problems", "Board Numericals"],
              resources: ["RD Sharma", "Cengage", "Arihant", "Khan Academy"],
              assessments: ["Problem Solving Test", "Speed & Accuracy", "Advanced Level Quiz"],
            },
            english: {
              topics: ["Flamingo - Prose & Poetry", "Writing Skills"],
              hours: 4,
              assignments: ["Literature Analysis", "Essay Writing", "Letter Writing"],
              resources: ["NCERT Flamingo", "Oswaal Sample Papers", "Previous Years"],
              assessments: ["Literature Test", "Writing Assessment"],
            },
            computer: {
              topics: ["Python Programming", "Data Structures", "Database Concepts"],
              hours: 6,
              assignments: ["Programming Practice", "Project Work", "Theory Questions"],
              resources: ["NCERT CS", "Python Documentation", "GeeksforGeeks"],
              assessments: ["Practical Exam", "Project Evaluation"],
            },
          },
          culturalActivities: ["Classical Music 2hrs/week", "Temple Service", "Cultural Programs"],
          physicalActivities: ["Badminton 3hrs/week", "Yoga 45mins daily", "Evening Walks"],
          totalStudyHours: 60,
        },
      ],
      dailySchedule: {
        monday: [
          { time: "05:30", activity: "Wake up, Meditation & Prayers", icon: "heroicons:sun" },
          { time: "06:00", activity: "Yoga & Physical Exercise", icon: "heroicons:heart" },
          { time: "07:00", activity: "Physics - Conceptual Study", icon: "heroicons:beaker" },
          { time: "08:30", activity: "Breakfast & School Prep", icon: "heroicons:cake" },
          { time: "09:00", activity: "School (Board Classes)", icon: "heroicons:academic-cap" },
          { time: "15:00", activity: "Lunch & Short Rest", icon: "heroicons:home" },
          { time: "16:00", activity: "Chemistry - Problem Solving", icon: "heroicons:flask" },
          { time: "18:00", activity: "Mathematics - JEE Practice", icon: "heroicons:calculator" },
          { time: "19:30", activity: "Dinner & Family Time", icon: "heroicons:heart" },
          { time: "20:30", activity: "Revision & Doubt Clearing", icon: "heroicons:light-bulb" },
          { time: "21:30", activity: "English/Computer Science", icon: "heroicons:computer-desktop" },
          { time: "22:30", activity: "Day Review & Planning", icon: "heroicons:clipboard-document-list" },
          { time: "23:00", activity: "Sleep", icon: "heroicons:moon" },
        ],
      },
    },
  };

  function getCurrentChild() {
    return children.find((child) => child.id === selectedChild);
  }

  function getCurrentPlan() {
    return studyPlansData[selectedChild];
  }

  function getSubjectColor(subject) {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-800",
      Science: "bg-green-100 text-green-800",
      Physics: "bg-purple-100 text-purple-800",
      Chemistry: "bg-orange-100 text-orange-800",
      English: "bg-pink-100 text-pink-800",
      Hindi: "bg-yellow-100 text-yellow-800",
      "Social Studies": "bg-indigo-100 text-indigo-800",
      Sanskrit: "bg-amber-100 text-amber-800",
      "Computer Science": "bg-gray-100 text-gray-800",
    };
    return colors[subject] || "bg-gray-100 text-gray-800";
  }

  function getPriorityColor(priority) {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function getProgressColor(percentage) {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    if (percentage >= 60) return "bg-orange-500";
    return "bg-red-500";
  }

  onMount(() => {
    document.title = "Study Plans - Family App";
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">
            <Icon icon="heroicons:academic-cap" class="w-8 h-8" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Study Plans & Progress</h1>
            <p class="text-gray-600 dark:text-gray-300">अध्ययन योजना | Personalized learning journeys for academic excellence</p>
          </div>
        </div>
      </div>

      <!-- Educational Philosophy -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center space-x-4">
          <Icon icon="heroicons:light-bulb" class="w-12 h-12 text-white/80" />
          <div>
            <h3 class="text-xl font-bold mb-2">विद्या दान | The Gift of Knowledge</h3>
            <p class="text-white/90">"विद्याधनं सर्वधनप्रधानम् | Knowledge is the supreme wealth. Education is not just about grades—it's about building character, curiosity, and confidence for life's journey."</p>
            <p class="text-sm text-white/70 mt-2">Tamil: "கல்வி கற்றால் நல்வினை யாவும் வரும் - நல் கருத்துடன் நல்வழி காட்டும்"</p>
          </div>
        </div>
      </div>

      <!-- Child Selector -->
      <div class="flex space-x-4 mb-6">
        {#each children as child}
          <button class="flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 {selectedChild === child.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20'}" on:click={() => (selectedChild = child.id)}>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
              {child.name[0]}
            </div>
            <div class="text-left">
              <p class="font-bold">{child.name}</p>
              <p class="text-sm opacity-80">{child.class}</p>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    {#if currentTab === "overview"}
      {@const child = getCurrentChild()}
      {@const plan = getCurrentPlan()}

      <!-- Student Profile -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Student Profile</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Basic Information</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Name:</span>
                  <span class="font-medium">{child.name}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Class:</span>
                  <span class="font-medium">{child.class}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Age:</span>
                  <span class="font-medium">{child.age} years</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Current GPA:</span>
                  <span class="font-bold text-green-600">{plan.overview.currentGPA}/10</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Academic Goals</h4>
              <ul class="space-y-1 text-sm">
                {#each child.goals as goal}
                  <li class="flex items-center text-gray-600 dark:text-gray-400">
                    <Icon icon="heroicons:check-circle" class="w-4 h-4 mr-2 text-green-500" />
                    {goal}
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Subjects -->
          <div class="mt-6">
            <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Subjects</h4>
            <div class="flex flex-wrap gap-2">
              {#each child.subjects as subject}
                <span class="px-3 py-1 text-sm font-medium rounded-full {getSubjectColor(subject)}">
                  {subject}
                </span>
              {/each}
            </div>
          </div>
        </div>

        <!-- Performance Stats -->
        <div class="space-y-4">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h4>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Current GPA</span>
                  <span class="font-medium">{plan.overview.currentGPA}/10</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: {plan.overview.currentGPA * 10}%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Target GPA</span>
                  <span class="font-medium">{plan.overview.targetGPA}/10</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full" style="width: {plan.overview.targetGPA * 10}%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Assignments Complete</span>
                  <span class="font-medium">{plan.overview.completedAssignments}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: {plan.overview.completedAssignments}%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Weekly Study Hours</h4>
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">{plan.overview.weeklyStudyHours}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hours per week</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Exams -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Exams</h3>
          <div class="space-y-4">
            {#each plan.overview.upcomingExams as exam}
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-blue-900 dark:text-blue-100">{exam.subject}</h4>
                  <span class="text-sm text-blue-600 dark:text-blue-400">{new Date(exam.date).toLocaleDateString()}</span>
                </div>
                <p class="text-sm text-blue-700 dark:text-blue-300 mb-1">Type: {exam.type}</p>
                <p class="text-sm text-blue-600 dark:text-blue-400">Syllabus: {exam.syllabus}</p>
              </div>
            {/each}
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
          <div class="space-y-3">
            {#each plan.overview.recentAchievements as achievement}
              <div class="flex items-center space-x-3">
                <Icon icon="heroicons:star" class="w-5 h-5 text-yellow-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Parent Notes -->
      <div class="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
        <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center">
          <Icon icon="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5 mr-2" />
          Parent's Observations
        </h4>
        <p class="text-amber-700 dark:text-amber-300">{plan.overview.parentNotes}</p>
      </div>
    {:else if currentTab === "weekly"}
      {@const child = getCurrentChild()}
      {@const plan = getCurrentPlan()}
      {@const weekPlan = plan.weeklyPlan[currentWeek - 1]}

      <!-- Week Selector -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Week {currentWeek}: {weekPlan?.theme}</h2>
        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" disabled={currentWeek <= 1} on:click={() => currentWeek--}> Previous </button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" disabled={currentWeek >= plan.weeklyPlan.length} on:click={() => currentWeek++}> Next </button>
        </div>
      </div>

      <!-- Weekly Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">Total Study Hours</h3>
          <div class="text-3xl font-bold text-blue-600">{weekPlan?.totalStudyHours}</div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Hours this week</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">Cultural Activities</h3>
          <ul class="text-sm space-y-1">
            {#each weekPlan?.culturalActivities || [] as activity}
              <li class="text-gray-600 dark:text-gray-400">• {activity}</li>
            {/each}
          </ul>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">Physical Activities</h3>
          <ul class="text-sm space-y-1">
            {#each weekPlan?.physicalActivities || [] as activity}
              <li class="text-gray-600 dark:text-gray-400">• {activity}</li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Subject-wise Plans -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each Object.entries(weekPlan?.subjects || {}) as [subject, details]}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white capitalize">{subject}</h3>
              <span class="px-3 py-1 text-sm font-medium rounded-full {getSubjectColor(subject)}">
                {details.hours}h
              </span>
            </div>

            <!-- Topics -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Topics to Cover</h4>
              <div class="flex flex-wrap gap-2">
                {#each details.topics as topic}
                  <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded">
                    {topic}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Assignments -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Assignments</h4>
              <ul class="text-sm space-y-1">
                {#each details.assignments as assignment}
                  <li class="text-gray-600 dark:text-gray-400">• {assignment}</li>
                {/each}
              </ul>
            </div>

            <!-- Resources -->
            <div class="mb-4">
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Resources</h4>
              <div class="flex flex-wrap gap-1">
                {#each details.resources as resource}
                  <span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded">
                    {resource}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Assessments -->
            <div>
              <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Assessments</h4>
              <div class="flex flex-wrap gap-2">
                {#each details.assessments as assessment}
                  <span class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded">
                    {assessment}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if currentTab === "schedule"}
      {@const child = getCurrentChild()}
      {@const plan = getCurrentPlan()}
      {@const schedule = plan.dailySchedule.monday}

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Daily Schedule - Monday</h2>
        <div class="space-y-4">
          {#each schedule as slot}
            <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-lg font-bold text-blue-600 min-w-[80px]">{slot.time}</div>
              <Icon icon={slot.icon} class="w-6 h-6 text-gray-500" />
              <div class="flex-1 text-gray-700 dark:text-gray-300">{slot.activity}</div>
            </div>
          {/each}
        </div>
      </div>
    {:else if currentTab === "resources"}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Study Resources Cards -->
        {@const child = getCurrentChild()}
        {#each child.subjects as subject}
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{subject}</h3>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-gray-700 dark:text-gray-300 text-sm">Textbooks</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">NCERT, Reference guides</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 dark:text-gray-300 text-sm">Online Resources</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Khan Academy, Byjus</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 dark:text-gray-300 text-sm">Practice Materials</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Sample papers, Previous years</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else if currentTab === "progress"}
      <div class="space-y-6">
        <!-- Progress Charts placeholder -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Academic Progress Tracking</h3>
          <p class="text-gray-600 dark:text-gray-400">Progress tracking charts and analytics will be displayed here.</p>
        </div>
      </div>
    {/if}

    <!-- Educational Philosophy -->
    <div class="mt-12 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl">
      <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
        <Icon icon="heroicons:heart" class="w-5 h-5 mr-2" />
        शिक्षा दर्शन | Educational Philosophy
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-semibold text-purple-700 dark:text-purple-300 mb-2">Holistic Development:</h5>
          <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Academic excellence with cultural grounding</li>
            <li>• Balance between study and play</li>
            <li>• Character building through values</li>
            <li>• Development of critical thinking</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-purple-700 dark:text-purple-300 mb-2">Learning Principles:</h5>
          <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Concept clarity over rote learning</li>
            <li>• Regular practice and revision</li>
            <li>• Emotional support and encouragement</li>
            <li>• Individual pace and style recognition</li>
          </ul>
        </div>
      </div>
      <blockquote class="mt-4 p-3 bg-purple-200 dark:bg-purple-800 rounded-lg italic text-purple-800 dark:text-purple-200">"आचार्यात् पादमादत्ते पादं शिष्य: स्वमेधया | पादं सब्रह्मचारिभ्य: पादं कालक्रमेण च || One quarter from the teacher, one quarter from one's own intelligence, one quarter from classmates, and one quarter with time."</blockquote>
    </div>
  </div>
</div>
