import { a as ensure_array_like, b as attr_class, s as stringify, f as attr_style } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/database.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "overview";
    let selectedChild = "ravi";
    const tabs = [
      {
        id: "overview",
        label: "Study Overview",
        icon: "heroicons:academic-cap"
      },
      {
        id: "weekly",
        label: "Weekly Plans",
        icon: "heroicons:calendar"
      },
      {
        id: "progress",
        label: "Progress Tracking",
        icon: "heroicons:chart-bar"
      },
      {
        id: "resources",
        label: "Study Resources",
        icon: "heroicons:book-open"
      },
      {
        id: "schedule",
        label: "Daily Schedule",
        icon: "heroicons:clock"
      }
    ];
    const children = [
      {
        id: "ravi",
        name: "Ravi",
        class: "6th Grade CBSE",
        age: 11,
        subjects: [
          "Mathematics",
          "Science",
          "English",
          "Hindi",
          "Social Studies",
          "Sanskrit"
        ],
        goals: [
          "Strong foundation in basics",
          "Develop study habits",
          "Extra-curricular balance"
        ],
        challenges: [
          "Time management",
          "Math problem solving",
          "Reading comprehension"
        ]
      },
      {
        id: "priya",
        name: "Priya",
        class: "11th Grade - JEE Preparation",
        age: 16,
        subjects: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "English",
          "Optional: Computer Science"
        ],
        goals: [
          "JEE Main & Advanced preparation",
          "Board exam excellence",
          "College admissions"
        ],
        challenges: [
          "JEE competition pressure",
          "Time intensive subjects",
          "Balance board + competitive exams"
        ]
      }
    ];
    const studyPlansData = {
      ravi: {
        overview: {
          currentGPA: 8.5,
          targetGPA: 9,
          weeklyStudyHours: 25,
          completedAssignments: 85,
          pendingAssignments: 3,
          upcomingExams: [
            {
              subject: "Mathematics",
              date: "2024-02-15",
              type: "Unit Test",
              syllabus: "Fractions & Decimals"
            },
            {
              subject: "Science",
              date: "2024-02-20",
              type: "Quarterly",
              syllabus: "Light, Shadows & Reflections"
            },
            {
              subject: "English",
              date: "2024-02-25",
              type: "Composition",
              syllabus: "Letter Writing & Essays"
            }
          ],
          recentAchievements: [
            "Scored 95% in Mathematics Unit Test",
            "Won 2nd prize in Science Exhibition",
            "Completed extra reading assignment",
            "Improved handwriting significantly"
          ],
          parentNotes: "Ravi shows consistent improvement in analytical thinking. Needs more practice in English composition."
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
                assessments: ["Weekly Quiz", "Homework Review"]
              },
              science: {
                topics: ["Food - Where does it come from?", "Components of Food"],
                hours: 5,
                assignments: [
                  "Activity: Plant/Animal Food Sources",
                  "Nutrients Chart",
                  "NCERT Questions"
                ],
                resources: ["Byjus Videos", "Science Laboratory", "Field Trip to Garden"],
                assessments: ["Practical Assessment", "Concept Map"]
              },
              english: {
                topics: ["Reading Comprehension", "Grammar - Nouns & Pronouns"],
                hours: 4,
                assignments: [
                  "Daily Reading 30 mins",
                  "Grammar Worksheets",
                  "Vocabulary Building"
                ],
                resources: [
                  "Honeysuckle Textbook",
                  "English Library Books",
                  "Oxford Grammar"
                ],
                assessments: ["Reading Test", "Grammar Quiz"]
              },
              hindi: {
                topics: ["वसंत - पाठ 1-2", "व्याकरण - संज्ञा"],
                hours: 3,
                assignments: ["पाठ के प्रश्न", "हस्तलेखन अभ्यास", "कविता स्मरण"],
                resources: ["NCERT वसंत", "Hindi Stories", "Grandparents' Help"],
                assessments: ["श्लोक स्मरण", "लेखन परीक्षा"]
              },
              social: {
                topics: [
                  "What, Where, How and When?",
                  "From Hunting-Gathering to Growing Food"
                ],
                hours: 4,
                assignments: ["Map Work", "Timeline Creation", "NCERT Exercises"],
                resources: ["Atlas", "History Videos", "Museum Visit"],
                assessments: ["Map Test", "Timeline Quiz"]
              },
              sanskrit: {
                topics: ["देवनागरी लिपि", "स्वर व्यंजन"],
                hours: 2,
                assignments: ["लिपि अभ्यास", "मंत्र स्मरण", "श्लोक अभ्यास"],
                resources: ["संस्कृत पुस्तक", "आर्ष ग्रंथ", "Temple Classes"],
                assessments: ["लिपि परीक्षा", "श्लोक प्रतियोगिता"]
              }
            },
            culturalActivities: [
              "Bharatanatyam 3hrs/week",
              "Veena practice 2hrs/week",
              "Temple visits"
            ],
            physicalActivities: ["Cricket 4hrs/week", "Yoga 30mins daily", "Cycling"],
            totalStudyHours: 24
          }
        ],
        dailySchedule: {
          monday: [
            {
              time: "06:00",
              activity: "Wake up, Personal hygiene",
              icon: "heroicons:sun"
            },
            {
              time: "06:30",
              activity: "Yoga & Exercise",
              icon: "heroicons:heart"
            },
            {
              time: "07:00",
              activity: "Sanskrit Slokas & Prayers",
              icon: "heroicons:star"
            },
            {
              time: "07:30",
              activity: "Breakfast & School Prep",
              icon: "heroicons:cake"
            },
            {
              time: "08:30",
              activity: "School (Mathematics, Science, English)",
              icon: "heroicons:academic-cap"
            },
            {
              time: "15:30",
              activity: "Lunch & Rest",
              icon: "heroicons:home"
            },
            {
              time: "16:30",
              activity: "Homework - Mathematics",
              icon: "heroicons:calculator"
            },
            {
              time: "17:30",
              activity: "Play Time / Cricket",
              icon: "heroicons:puzzle-piece"
            },
            {
              time: "18:30",
              activity: "Bharatanatyam Practice",
              icon: "heroicons:musical-note"
            },
            {
              time: "19:30",
              activity: "Evening Study - Hindi",
              icon: "heroicons:book-open"
            },
            {
              time: "20:30",
              activity: "Dinner & Family Time",
              icon: "heroicons:heart"
            },
            {
              time: "21:30",
              activity: "Reading / Story Time",
              icon: "heroicons:book-open"
            },
            { time: "22:00", activity: "Sleep", icon: "heroicons:moon" }
          ]
        }
      },
      priya: {
        overview: {
          currentGPA: 9.2,
          targetGPA: 9.5,
          weeklyStudyHours: 60,
          completedAssignments: 92,
          pendingAssignments: 2,
          upcomingExams: [
            {
              subject: "Physics",
              date: "2024-02-18",
              type: "JEE Mock Test",
              syllabus: "Mechanics - Laws of Motion"
            },
            {
              subject: "Chemistry",
              date: "2024-02-22",
              type: "Board Preparation",
              syllabus: "Chemical Bonding"
            },
            {
              subject: "Mathematics",
              date: "2024-02-28",
              type: "JEE Advanced Level",
              syllabus: "Trigonometry & Coordinate Geometry"
            }
          ],
          recentAchievements: [
            "AIR 458 in JEE Mock Test Series",
            "99.2% in Chemistry Unit Test",
            "Selected for National Science Olympiad",
            "Completed Additional Mathematics Course"
          ],
          parentNotes: "Priya maintains excellent academic performance. Monitor stress levels during intensive preparation."
        },
        weeklyPlan: [
          {
            week: 1,
            theme: "JEE Foundation & Board Preparation",
            subjects: {
              physics: {
                topics: ["Kinematics", "Laws of Motion", "Work Energy Power"],
                hours: 18,
                assignments: [
                  "HC Verma Ex 1-3",
                  "JEE Previous Years",
                  "Board Pattern Questions",
                  "Lab Experiments"
                ],
                resources: [
                  "HC Verma",
                  "Resnick Halliday",
                  "Allen Study Material",
                  "Physics Wallah"
                ],
                assessments: [
                  "Weekly JEE Mock",
                  "Board Pattern Test",
                  "Concept Building Quiz"
                ]
              },
              chemistry: {
                topics: ["Atomic Structure", "Chemical Bonding", "Thermodynamics"],
                hours: 16,
                assignments: [
                  "NCERT + Exemplar",
                  "OP Tandon",
                  "JEE Mains Questions",
                  "Reaction Mechanisms"
                ],
                resources: ["NCERT", "OP Tandon", "MS Chauhan", "Unacademy JEE"],
                assessments: [
                  "Organic Reactions Test",
                  "Numerical Problems",
                  "Theory Questions"
                ]
              },
              mathematics: {
                topics: ["Trigonometry", "Coordinate Geometry", "Sequences & Series"],
                hours: 16,
                assignments: [
                  "RD Sharma",
                  "Cengage",
                  "JEE Advanced Problems",
                  "Board Numericals"
                ],
                resources: ["RD Sharma", "Cengage", "Arihant", "Khan Academy"],
                assessments: [
                  "Problem Solving Test",
                  "Speed & Accuracy",
                  "Advanced Level Quiz"
                ]
              },
              english: {
                topics: ["Flamingo - Prose & Poetry", "Writing Skills"],
                hours: 4,
                assignments: ["Literature Analysis", "Essay Writing", "Letter Writing"],
                resources: ["NCERT Flamingo", "Oswaal Sample Papers", "Previous Years"],
                assessments: ["Literature Test", "Writing Assessment"]
              },
              computer: {
                topics: ["Python Programming", "Data Structures", "Database Concepts"],
                hours: 6,
                assignments: ["Programming Practice", "Project Work", "Theory Questions"],
                resources: ["NCERT CS", "Python Documentation", "GeeksforGeeks"],
                assessments: ["Practical Exam", "Project Evaluation"]
              }
            },
            culturalActivities: [
              "Classical Music 2hrs/week",
              "Temple Service",
              "Cultural Programs"
            ],
            physicalActivities: ["Badminton 3hrs/week", "Yoga 45mins daily", "Evening Walks"],
            totalStudyHours: 60
          }
        ],
        dailySchedule: {
          monday: [
            {
              time: "05:30",
              activity: "Wake up, Meditation & Prayers",
              icon: "heroicons:sun"
            },
            {
              time: "06:00",
              activity: "Yoga & Physical Exercise",
              icon: "heroicons:heart"
            },
            {
              time: "07:00",
              activity: "Physics - Conceptual Study",
              icon: "heroicons:beaker"
            },
            {
              time: "08:30",
              activity: "Breakfast & School Prep",
              icon: "heroicons:cake"
            },
            {
              time: "09:00",
              activity: "School (Board Classes)",
              icon: "heroicons:academic-cap"
            },
            {
              time: "15:00",
              activity: "Lunch & Short Rest",
              icon: "heroicons:home"
            },
            {
              time: "16:00",
              activity: "Chemistry - Problem Solving",
              icon: "heroicons:flask"
            },
            {
              time: "18:00",
              activity: "Mathematics - JEE Practice",
              icon: "heroicons:calculator"
            },
            {
              time: "19:30",
              activity: "Dinner & Family Time",
              icon: "heroicons:heart"
            },
            {
              time: "20:30",
              activity: "Revision & Doubt Clearing",
              icon: "heroicons:light-bulb"
            },
            {
              time: "21:30",
              activity: "English/Computer Science",
              icon: "heroicons:computer-desktop"
            },
            {
              time: "22:30",
              activity: "Day Review & Planning",
              icon: "heroicons:clipboard-document-list"
            },
            { time: "23:00", activity: "Sleep", icon: "heroicons:moon" }
          ]
        }
      }
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
        "Computer Science": "bg-gray-100 text-gray-800"
      };
      return colors[subject] || "bg-gray-100 text-gray-800";
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Study Plans &amp; Progress</h1> <p class="text-gray-600 dark:text-gray-300">अध्ययन योजना | Personalized learning journeys for academic excellence</p></div></div></div> <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, {
      icon: "heroicons:light-bulb",
      class: "w-12 h-12 text-white/80"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">विद्या दान | The Gift of Knowledge</h3> <p class="text-white/90">"विद्याधनं सर्वधनप्रधानम् | Knowledge is the supreme wealth. Education is not just about grades—it's about building character, curiosity, and confidence for life's journey."</p> <p class="text-sm text-white/70 mt-2">Tamil: "கல்வி கற்றால் நல்வினை யாவும் வரும் - நல் கருத்துடன் நல்வழி காட்டும்"</p></div></div></div> <div class="flex space-x-4 mb-6"><!--[-->`);
    const each_array = ensure_array_like(children);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let child = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 ${stringify(selectedChild === child.id ? "bg-blue-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20")}`)}><div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">${escape_html(child.name[0])}</div> <div class="text-left"><p class="font-bold">${escape_html(child.name)}</p> <p class="text-sm opacity-80">${escape_html(child.class)}</p></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array_1 = ensure_array_like(tabs);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tab = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-blue-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      const child = getCurrentChild();
      const plan = getCurrentPlan();
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Student Profile</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Basic Information</h4> <div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Name:</span> <span class="font-medium">${escape_html(child.name)}</span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Class:</span> <span class="font-medium">${escape_html(child.class)}</span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Age:</span> <span class="font-medium">${escape_html(child.age)} years</span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Current GPA:</span> <span class="font-bold text-green-600">${escape_html(plan.overview.currentGPA)}/10</span></div></div></div> <div><h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Academic Goals</h4> <ul class="space-y-1 text-sm"><!--[-->`);
      const each_array_2 = ensure_array_like(child.goals);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let goal = each_array_2[$$index_2];
        $$renderer2.push(`<li class="flex items-center text-gray-600 dark:text-gray-400">`);
        Icon($$renderer2, {
          icon: "heroicons:check-circle",
          class: "w-4 h-4 mr-2 text-green-500"
        });
        $$renderer2.push(`<!----> ${escape_html(goal)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div> <div class="mt-6"><h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Subjects</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_3 = ensure_array_like(child.subjects);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let subject = each_array_3[$$index_3];
        $$renderer2.push(`<span${attr_class(`px-3 py-1 text-sm font-medium rounded-full ${stringify(getSubjectColor(subject))}`)}>${escape_html(subject)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h4 class="font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h4> <div class="space-y-4"><div><div class="flex justify-between text-sm mb-1"><span class="text-gray-600 dark:text-gray-400">Current GPA</span> <span class="font-medium">${escape_html(plan.overview.currentGPA)}/10</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full"${attr_style(`width: ${stringify(plan.overview.currentGPA * 10)}%`)}></div></div></div> <div><div class="flex justify-between text-sm mb-1"><span class="text-gray-600 dark:text-gray-400">Target GPA</span> <span class="font-medium">${escape_html(plan.overview.targetGPA)}/10</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-500 h-2 rounded-full"${attr_style(`width: ${stringify(plan.overview.targetGPA * 10)}%`)}></div></div></div> <div><div class="flex justify-between text-sm mb-1"><span class="text-gray-600 dark:text-gray-400">Assignments Complete</span> <span class="font-medium">${escape_html(plan.overview.completedAssignments)}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-purple-500 h-2 rounded-full"${attr_style(`width: ${stringify(plan.overview.completedAssignments)}%`)}></div></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h4 class="font-semibold text-gray-900 dark:text-white mb-4">Weekly Study Hours</h4> <div class="text-center"><div class="text-3xl font-bold text-blue-600">${escape_html(plan.overview.weeklyStudyHours)}</div> <div class="text-sm text-gray-600 dark:text-gray-400">Hours per week</div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Exams</h3> <div class="space-y-4"><!--[-->`);
      const each_array_4 = ensure_array_like(plan.overview.upcomingExams);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let exam = each_array_4[$$index_4];
        $$renderer2.push(`<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-blue-900 dark:text-blue-100">${escape_html(exam.subject)}</h4> <span class="text-sm text-blue-600 dark:text-blue-400">${escape_html(new Date(exam.date).toLocaleDateString())}</span></div> <p class="text-sm text-blue-700 dark:text-blue-300 mb-1">Type: ${escape_html(exam.type)}</p> <p class="text-sm text-blue-600 dark:text-blue-400">Syllabus: ${escape_html(exam.syllabus)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Achievements</h3> <div class="space-y-3"><!--[-->`);
      const each_array_5 = ensure_array_like(plan.overview.recentAchievements);
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let achievement = each_array_5[$$index_5];
        $$renderer2.push(`<div class="flex items-center space-x-3">`);
        Icon($$renderer2, { icon: "heroicons:star", class: "w-5 h-5 text-yellow-500" });
        $$renderer2.push(`<!----> <span class="text-sm text-gray-700 dark:text-gray-300">${escape_html(achievement)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6"><h4 class="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:chat-bubble-left-ellipsis",
        class: "w-5 h-5 mr-2"
      });
      $$renderer2.push(`<!----> Parent's Observations</h4> <p class="text-amber-700 dark:text-amber-300">${escape_html(plan.overview.parentNotes)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
