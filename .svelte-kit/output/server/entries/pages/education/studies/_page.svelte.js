import "clsx";
import { a as ensure_array_like, b as attr_class, g as clsx, j as attr_style, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import Dexie from "dexie";
import { T as escape_html } from "../../../../chunks/context.js";
import "../../../../chunks/database.js";
class EducationDB extends Dexie {
  constructor() {
    super("EducationDB");
    this.version(1).stores({
      studyPlans: "id, subject, dueDate, completed",
      books: "id, title, author, category, ownedBy, status, progress",
      exams: "id, subject, date, syllabus",
      readingSessions: "id, bookId, userId, startTime, endTime, pagesRead"
    });
  }
}
const educationDB = new EducationDB();
async function getStudyPlans() {
  return await educationDB.studyPlans.toArray();
}
function StudyPlanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let plans = [];
    async function loadPlans() {
      try {
        plans = await getStudyPlans();
      } catch (error) {
        console.error("Error loading study plans:", error);
      }
    }
    loadPlans();
    function formatDate(date) {
      return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    }
    function getDaysUntil(date) {
      const today = /* @__PURE__ */ new Date();
      const dueDate = new Date(date);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays;
    }
    function getDueDateColor(date) {
      const days = getDaysUntil(date);
      if (days < 0) return "text-red-600";
      if (days <= 7) return "text-orange-600";
      return "text-green-600";
    }
    $$renderer2.push(`<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "text-blue-500"
    });
    $$renderer2.push(`<!----> Study Plans &amp; Progress Tracking</h2> <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "text-lg" });
    $$renderer2.push(`<!----> ${escape_html("Add Plan")}</button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(plans);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let plan = each_array[$$index_1];
      $$renderer2.push(`<div class="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-xl font-semibold text-gray-800 mb-2">${escape_html(plan.subject)}</h3> <div class="flex items-center gap-4 text-sm text-gray-600"><span class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "heroicons:calendar", class: "text-gray-400" });
      $$renderer2.push(`<!----> Due: <span${attr_class(clsx(getDueDateColor(plan.dueDate)))}>${escape_html(formatDate(plan.dueDate))}</span></span> <span class="flex items-center gap-1">`);
      Icon($$renderer2, { icon: "heroicons:clock", class: "text-gray-400" });
      $$renderer2.push(`<!----> ${escape_html(getDaysUntil(plan.dueDate) > 0 ? `${getDaysUntil(plan.dueDate)} days left` : "Overdue")}</span></div></div> <div class="flex gap-2"><button class="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "text-lg" });
      $$renderer2.push(`<!----></button> <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "text-lg" });
      $$renderer2.push(`<!----></button></div></div> <div class="mb-4"><div class="flex justify-between text-sm mb-2"><span class="text-gray-600">Progress</span> <span class="font-medium">${escape_html(plan.completedChapters.length)}/${escape_html(plan.chapters.length)} chapters</span></div> <div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-blue-500 h-3 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(plan.completedChapters.length / plan.chapters.length * 100)}%`)}></div></div></div> <div><h4 class="text-sm font-medium text-gray-700 mb-3">Chapters:</h4> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"><!--[-->`);
      const each_array_1 = ensure_array_like(plan.chapters);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let chapter = each_array_1[$$index];
        $$renderer2.push(`<button${attr_class(`flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 ${stringify(plan.completedChapters.includes(chapter) ? "bg-green-50 border-green-200 text-green-700" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100")}`)}>`);
        Icon($$renderer2, {
          icon: plan.completedChapters.includes(chapter) ? "heroicons:check-circle" : "heroicons:circle",
          class: `text-lg ${stringify(plan.completedChapters.includes(chapter) ? "text-green-500" : "text-gray-400")}`
        });
        $$renderer2.push(`<!----> <span class="text-sm">${escape_html(chapter)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (plans.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:clipboard-document-list",
        class: "text-gray-300 text-6xl mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-xl font-medium text-gray-600 mb-2">No Study Plans Yet</h3> <p class="text-gray-500 mb-4">Create your first study plan to start tracking progress</p> <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">Create Study Plan</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function StudiesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "study-planner";
    const tabs = [
      {
        id: "study-planner",
        label: "Study Planner",
        icon: "heroicons:calendar-days"
      },
      {
        id: "exam-tracker",
        label: "Exam Tracker",
        icon: "heroicons:clipboard-document-check"
      },
      {
        id: "progress",
        label: "Progress Analytics",
        icon: "heroicons:chart-bar"
      },
      {
        id: "achievements",
        label: "Achievements",
        icon: "heroicons:trophy"
      }
    ];
    let studyStats = {
      totalHours: 0,
      completedGoals: 0,
      upcomingExams: 0,
      averageScore: 0
    };
    let motivationalQuotes = [
      {
        sanskrit: "अहिंसा परमो धर्मः",
        english: "Non-violence is the highest virtue",
        tamil: "அஹிம்சை பரமோ தர்ம:",
        context: "Study with compassion and patience"
      },
      {
        sanskrit: "सत्यमेव जयते",
        english: "Truth alone triumphs",
        tamil: "சத்யமேவ ஜயதே",
        context: "Honesty in learning leads to success"
      },
      {
        sanskrit: "श्रमेण सर्वमिच्छति",
        english: "Everything is achieved through effort",
        tamil: "ஸ்ரமேண சர்வமிச்சதி",
        context: "Hard work brings knowledge"
      }
    ];
    let currentQuote = motivationalQuotes[0];
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center space-x-3 mb-6"><div class="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Studies &amp; Exams</h1> <p class="text-gray-600 dark:text-gray-300">Track your learning journey with wisdom</p></div></div> <div class="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center justify-between"><div class="flex-1"><h3 class="text-xl font-bold mb-2">दैनिक प्रेरणा | Daily Inspiration</h3> <p class="text-lg font-semibold mb-1">${escape_html(currentQuote.sanskrit)}</p> <p class="text-sm opacity-90 mb-1">${escape_html(currentQuote.english)}</p> <p class="text-sm opacity-80 mb-2">${escape_html(currentQuote.tamil)}</p> <p class="text-xs opacity-70 italic">${escape_html(currentQuote.context)}</p></div> <button class="ml-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors">`);
    Icon($$renderer2, { icon: "heroicons:arrow-path", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"><div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:clock",
      class: "w-8 h-8 mx-auto text-blue-500 mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(studyStats.totalHours)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">Study Hours</p></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 mx-auto text-green-500 mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(studyStats.completedGoals)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</p></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar",
      class: "w-8 h-8 mx-auto text-orange-500 mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(studyStats.upcomingExams)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">Upcoming Exams</p></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">`);
    Icon($$renderer2, {
      icon: "heroicons:star",
      class: "w-8 h-8 mx-auto text-yellow-500 mb-2"
    });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape_html(studyStats.averageScore.toFixed(1))}%</p> <p class="text-sm text-gray-600 dark:text-gray-400">Average Score</p></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-indigo-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      StudyPlanner($$renderer2);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer) {
  StudiesPage($$renderer);
}
export {
  _page as default
};
