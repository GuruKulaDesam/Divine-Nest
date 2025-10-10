import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify, j as attr_style, k as bind_props, h as head } from "../../../../chunks/index2.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
const StudentProfiles = {
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
    currentStreak: 7,
    // days
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
    currentStreak: 12,
    // days  
    totalStars: 89,
    badges: ["Physics Master", "Tamil Writer", "Consistent Learner", "JEE Warrior"]
  }
};
const FestivalStudyModes = {
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
const StudyPlanTemplates = {
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
function StudyPlanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalTime, completedTime, progressPercentage;
    let selectedStudent = fallback($$props["selectedStudent"], "thambi");
    let student = {};
    let selectedTemplate = "schoolDay";
    let selectedDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let currentPlan = [];
    let festivalMode = null;
    let customSubjects = [];
    function loadPlanForDate() {
      const template = StudyPlanTemplates[selectedTemplate];
      if (template) {
        currentPlan = template.timeSlots.map((slot, index) => ({
          ...slot,
          id: `slot-${index}`,
          completed: false,
          subject: slot.activity.includes("revision") ? customSubjects[0] || "Mathematics" : "",
          notes: ""
        }));
      }
    }
    function calculateTotalStudyTime() {
      return currentPlan.filter((slot) => slot.subject && slot.activity !== "Break").reduce((total, slot) => total + slot.duration, 0);
    }
    function calculateCompletedTime() {
      return currentPlan.filter((slot) => slot.completed && slot.subject).reduce((total, slot) => total + slot.duration, 0);
    }
    function getDifficultyColor(subject) {
      if (selectedStudent === "akka") {
        const hardSubjects = ["Physics", "Chemistry", "JEE Mathematics"];
        return hardSubjects.includes(subject) ? "red" : "blue";
      }
      return "blue";
    }
    function getMotivationalTip() {
      const tips = selectedStudent === "akka" ? [
        "Break complex JEE problems into smaller steps",
        "Review previous chapters while learning new ones",
        "Practice daily to build consistency",
        "Take breaks to avoid burnout"
      ] : [
        "Use colorful diagrams for Science topics",
        "Practice math tables daily",
        "Read Tamil stories to improve language",
        "Ask questions when you don't understand"
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }
    {
      student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
      customSubjects = student.subjects || [];
      loadPlanForDate();
    }
    totalTime = calculateTotalStudyTime();
    completedTime = calculateCompletedTime();
    progressPercentage = totalTime > 0 ? Math.round(completedTime / totalTime * 100) : 0;
    $$renderer2.push(`<div class="space-y-6"><div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Study Planner</h1> <p class="text-lg text-gray-600">படிப்பு திட்டம்</p> <p class="text-sm text-gray-500">${escape_html(student.name)} (${escape_html(student.tamil)}) • ${escape_html(student.grade)}</p></div> <div class="flex items-center space-x-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Study Date</label> <input type="date"${attr("value", selectedDate)} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div class="text-center"><div class="relative w-16 h-16 mx-auto"><svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="3"></path><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" stroke-width="3"${attr("stroke-dasharray", `${stringify(progressPercentage)}, 100`)} stroke-linecap="round"></path></svg> <div class="absolute inset-0 flex items-center justify-center"><span class="text-xs font-bold text-gray-900">${escape_html(progressPercentage)}%</span></div></div> <p class="text-xs text-gray-600 mt-1">${escape_html(completedTime)}m/${escape_html(totalTime)}m</p></div></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-blue-50 p-4 rounded-lg text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:clock",
      class: "w-6 h-6 mx-auto mb-2 text-blue-600"
    });
    $$renderer2.push(`<!----> <p class="text-lg font-bold text-blue-800">${escape_html(totalTime)}m</p> <p class="text-xs text-blue-600">Total Study Time</p></div> <div class="bg-green-50 p-4 rounded-lg text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-6 h-6 mx-auto mb-2 text-green-600"
    });
    $$renderer2.push(`<!----> <p class="text-lg font-bold text-green-800">${escape_html(currentPlan.filter((s) => s.completed).length)}</p> <p class="text-xs text-green-600">Completed Tasks</p></div> <div class="bg-orange-50 p-4 rounded-lg text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:book-open",
      class: "w-6 h-6 mx-auto mb-2 text-orange-600"
    });
    $$renderer2.push(`<!----> <p class="text-lg font-bold text-orange-800">${escape_html(new Set(currentPlan.map((s) => s.subject).filter(Boolean)).size)}</p> <p class="text-xs text-orange-600">Subjects Today</p></div> <div class="bg-purple-50 p-4 rounded-lg text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:fire",
      class: "w-6 h-6 mx-auto mb-2 text-purple-600"
    });
    $$renderer2.push(`<!----> <p class="text-lg font-bold text-purple-800">${escape_html(student.currentStreak)}</p> <p class="text-xs text-purple-600">Day Streak</p></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:squares-2x2",
      class: "w-5 h-5 mr-2 text-blue-600"
    });
    $$renderer2.push(`<!----> Plan Templates <span class="ml-2 text-sm text-gray-500">திட்ட வடிவங்கள்</span></h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(StudyPlanTemplates));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [templateId, template] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`p-4 border-2 rounded-lg transition-all text-left ${stringify(selectedTemplate === templateId ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300")}`)}><h3 class="font-medium text-gray-900">${escape_html(template.name)}</h3> <p class="text-sm text-gray-600">${escape_html(template.tamil)}</p> <p class="text-xs text-gray-500 mt-2">${escape_html(template.timeSlots.length)} time slots</p></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="border-t pt-4"><h3 class="text-md font-medium text-gray-900 mb-3 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:star",
      class: "w-4 h-4 mr-2 text-yellow-500"
    });
    $$renderer2.push(`<!----> Festival Mode <span class="ml-2 text-sm text-gray-500">பண்டிகை முறை</span></h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-3"><!--[-->`);
    const each_array_1 = ensure_array_like(Object.entries(FestivalStudyModes));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let [festivalId, festival] = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-left ${stringify(festivalMode === festivalId ? "bg-orange-100" : "")}`)}><h4 class="font-medium text-orange-900">${escape_html(festival.name)}</h4> <p class="text-sm text-orange-700">${escape_html(festival.tamil)}</p> <p class="text-xs text-orange-600 mt-1">${escape_html(festival.schedule)}</p></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-gray-900 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-5 h-5 mr-2 text-green-600"
    });
    $$renderer2.push(`<!----> Today's Schedule <span class="ml-2 text-sm text-gray-500">இன்றைய அட்டவணை</span></h2> <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add Slot</span></button></div> <div class="space-y-4"><!--[-->`);
    const each_array_2 = ensure_array_like(currentPlan);
    for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
      let slot = each_array_2[index];
      $$renderer2.push(`<div${attr_class(`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg ${stringify(slot.completed ? "bg-green-50 border-green-200" : "bg-white")}`)}><button class="flex-shrink-0">`);
      Icon($$renderer2, {
        icon: slot.completed ? "heroicons:check-circle" : "heroicons:circle",
        class: `w-6 h-6 ${stringify(slot.completed ? "text-green-600" : "text-gray-400")}`
      });
      $$renderer2.push(`<!----></button> <div class="w-20"><input type="time"${attr("value", slot.time)} class="w-full text-sm border-none bg-transparent font-medium text-gray-900 focus:ring-0"/></div> <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3"><div><input type="text"${attr("value", slot.activity)} placeholder="Study activity" class="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div>`);
      $$renderer2.select(
        {
          value: slot.subject,
          class: "w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Select Subject`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array_3 = ensure_array_like(customSubjects);
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let subject = each_array_3[$$index_2];
            $$renderer3.option({ value: subject }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(subject)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div></div> <div class="w-24"><div class="flex items-center space-x-1"><input type="number"${attr("value", slot.duration)} min="15" max="180" step="15" class="w-16 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"/> <span class="text-xs text-gray-500">min</span></div></div> `);
      if (slot.subject) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(`w-3 h-3 bg-${stringify(getDifficultyColor(slot.subject))}-400 rounded-full`)} title="Difficulty level"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="flex-shrink-0 text-red-500 hover:text-red-700">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 p-4 bg-gray-50 rounded-lg"><h3 class="text-sm font-medium text-gray-900 mb-2 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:pencil-square", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Daily Notes &amp; Reflections <span class="ml-2 text-xs text-gray-500">நாள் குறிப்புகள்</span></h3> <textarea placeholder="How did today's study session go? Any challenges or achievements?" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"></textarea></div></div> <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6"><div class="flex items-start space-x-4"><div class="bg-purple-100 p-3 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:lightbulb",
      class: "w-6 h-6 text-purple-600"
    });
    $$renderer2.push(`<!----></div> <div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 mb-2">Today's Learning Tip</h3> <p class="text-gray-700 mb-2">${escape_html(getMotivationalTip())}</p> <p class="text-sm text-gray-500">Keep going, ${escape_html(student.name)}! Every minute of study builds your future.</p> <p class="text-sm text-purple-600 mt-1">${escape_html(student.name)}, உன்னுடைய கடின உழைப்பு வெற்றிக்கு வழிவகுக்கும்!</p></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-5 h-5 mr-2 text-indigo-600"
    });
    $$renderer2.push(`<!----> This Week's Overview <span class="ml-2 text-sm text-gray-500">வார கண்ணோட்டம்</span></h2> <div class="grid grid-cols-7 gap-2"><!--[-->`);
    const each_array_4 = ensure_array_like(Array(7));
    for (let dayIndex = 0, $$length = each_array_4.length; dayIndex < $$length; dayIndex++) {
      each_array_4[dayIndex];
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];
      const isToday = dayIndex === (/* @__PURE__ */ new Date()).getDay();
      const studyTime = Math.floor(Math.random() * 180) + 60;
      $$renderer2.push(`<div${attr_class(`text-center p-3 rounded-lg ${stringify(isToday ? "bg-blue-100 border-2 border-blue-500" : "bg-gray-50")}`)}><p class="text-xs font-medium text-gray-600">${escape_html(dayName)}</p> <p${attr_class(`text-lg font-bold ${stringify(isToday ? "text-blue-700" : "text-gray-900")}`)}>${escape_html(studyTime)}m</p> <div class="w-full bg-gray-200 rounded-full h-1 mt-1"><div class="bg-blue-500 h-1 rounded-full"${attr_style(`width: ${stringify(Math.min(100, studyTime / 180 * 100))}%`)}></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    bind_props($$props, { selectedStudent });
  });
}
function StudyPlansPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Study Plans - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Create and manage educational study plans and schedules"/>`);
  });
  StudyPlanner($$renderer, {});
}
function _page($$renderer) {
  StudyPlansPage($$renderer);
}
export {
  _page as default
};
