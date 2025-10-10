import "clsx";
import { a as ensure_array_like, s as stringify, b as attr_class, j as attr_style, k as bind_props, d as attr, c as store_get, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { f as fallback } from "../../../chunks/utils.js";
import { C as CurrentAcademicData, S as StudentProfiles, Q as QuizConfig, E as EducationSections, a as StudyPlanner, F as FamilyMentors } from "../../../chunks/StudyPlanner.js";
import { T as escape_html } from "../../../chunks/context.js";
function StudentProfileCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedStudent = fallback($$props["selectedStudent"], "thambi");
    let student = {};
    let recentActivity = [];
    let motivationalMessage = "";
    function loadStudentData() {
      recentActivity = [
        {
          type: "study",
          icon: "heroicons:book-open",
          color: "blue",
          title: `Completed ${student.grade} Mathematics Chapter`,
          subtitle: "Playing with Numbers - சிக்கலான எண்கள்",
          time: "2 hours ago",
          stars: 3
        },
        {
          type: "achievement",
          icon: "heroicons:trophy",
          color: "yellow",
          title: "Earned New Badge",
          subtitle: "Consistent Learner - தொடர்ச்சியான கற்றுக்கொள்பவர்",
          time: "Yesterday",
          stars: 5
        },
        {
          type: "quiz",
          icon: "heroicons:puzzle-piece",
          color: "pink",
          title: "Science Quiz Completed",
          subtitle: "Score: 85% - Living Organisms",
          time: "2 days ago",
          stars: 4
        },
        {
          type: "mentor",
          icon: "heroicons:chat-bubble-left-right",
          color: "green",
          title: "Guidance from Appa",
          subtitle: "Math problem-solving techniques",
          time: "3 days ago",
          stars: 0
        }
      ];
      const messages = student.id === "akka" ? [
        "You're building towards JEE success, one concept at a time",
        "Akka, your dedication to learning inspires the whole family"
      ] : [
        "Thambi, every question you ask makes you smarter",
        "Keep exploring, young scientist!"
      ];
      motivationalMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    function getSubjectIcon(subject) {
      const iconMap = {
        Mathematics: "heroicons:calculator",
        Science: "heroicons:beaker",
        Physics: "heroicons:bolt",
        Chemistry: "heroicons:test-tube",
        English: "heroicons:language",
        Tamil: "heroicons:book-open",
        "Social Science": "heroicons:globe-alt",
        Hindi: "heroicons:chat-bubble-left-right"
      };
      return iconMap[subject] || "heroicons:book-open";
    }
    function getProgressColor(percentage) {
      if (percentage >= 80) return "green";
      if (percentage >= 60) return "blue";
      if (percentage >= 40) return "yellow";
      return "red";
    }
    function calculateSubjectProgress(studentId) {
      const curriculum = studentId === "akka" ? CurrentAcademicData.class11 : CurrentAcademicData.class6;
      const progress = {};
      Object.entries(curriculum).forEach(([subjectKey, subject]) => {
        const totalChapters = subject.chapters.length;
        const completedChapters = subject.chapters.filter((ch) => ch.status === "completed").length;
        const inProgressChapters = subject.chapters.filter((ch) => ch.status === "in-progress").length;
        progress[subject.name] = {
          total: totalChapters,
          completed: completedChapters,
          inProgress: inProgressChapters,
          percentage: Math.round(completedChapters / totalChapters * 100)
        };
      });
      return progress;
    }
    {
      student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
      loadStudentData();
    }
    $$renderer2.push(`<div class="space-y-6"><div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-start justify-between mb-6"><div class="flex items-center space-x-6"><div class="relative"><div class="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:user", class: "w-10 h-10 text-white" });
    $$renderer2.push(`<!----></div> <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "w-3 h-3 text-white" });
    $$renderer2.push(`<!----></div></div> <div><h1 class="text-3xl font-bold text-gray-900">${escape_html(
      // Generate recent activity based on student data
      // Get motivational message
      // Calculate subject-wise progress
      student.name
    )}</h1> <p class="text-xl text-gray-600">${escape_html(student.tamil)}</p> <p class="text-lg text-blue-600 font-medium">${escape_html(student.grade)}</p> <p class="text-sm text-gray-500">Age ${escape_html(student.age)} • Academic Year 2025-26</p></div></div> <div class="grid grid-cols-2 gap-4"><div class="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg text-white text-center">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-6 h-6 mx-auto mb-1" });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold">${escape_html(student.currentStreak)}</p> <p class="text-xs opacity-90">Day Streak</p></div> <div class="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-white text-center">`);
    Icon($$renderer2, { icon: "heroicons:star", class: "w-6 h-6 mx-auto mb-1" });
    $$renderer2.push(`<!----> <p class="text-2xl font-bold">${escape_html(student.totalStars)}</p> <p class="text-xs opacity-90">Total Stars</p></div></div></div> <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6"><div class="flex items-center space-x-3">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-6 h-6 text-pink-500" });
    $$renderer2.push(`<!----> <div><p class="font-medium text-gray-900">Daily Encouragement</p> <p class="text-sm text-gray-700">${escape_html(motivationalMessage)}</p> <p class="text-xs text-gray-500 mt-1">With love from your family • குடும்ப அன்புடன்</p></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:target",
      class: "w-5 h-5 mr-2 text-blue-500"
    });
    $$renderer2.push(`<!----> Current Goals <span class="ml-2 text-sm text-gray-500">நோக்கங்கள்</span></h3> <div class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like(student.goals?.slice(0, 4) || []);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let goal = each_array[$$index];
      $$renderer2.push(`<div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:check-circle",
        class: "w-5 h-5 text-green-500"
      });
      $$renderer2.push(`<!----> <span class="text-sm text-gray-700">${escape_html(goal)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div><h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:trophy",
      class: "w-5 h-5 mr-2 text-yellow-500"
    });
    $$renderer2.push(`<!----> Recent Achievements <span class="ml-2 text-sm text-gray-500">சாதனைகள்</span></h3> <div class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(student.achievements?.slice(0, 3) || []);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let achievement = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:trophy", class: "w-5 h-5 text-yellow-600" });
      $$renderer2.push(`<!----> <div class="flex-1"><p class="text-sm font-medium text-gray-900">${escape_html(achievement.title)}</p> <p class="text-xs text-gray-600">${escape_html(achievement.position)} • ${escape_html(new Date(achievement.date).toLocaleDateString())}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-6 h-6 mr-2 text-purple-500"
    });
    $$renderer2.push(`<!----> Subject Progress Overview <span class="ml-2 text-sm text-gray-500">பாடவிவரம்</span></h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
    const each_array_2 = ensure_array_like(Object.entries(calculateSubjectProgress(student.id)));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let [subjectName, progress] = each_array_2[$$index_2];
      const color = getProgressColor(progress.percentage);
      $$renderer2.push(`<div class="bg-gray-50 rounded-lg p-4"><div class="flex items-center justify-between mb-3"><div class="flex items-center space-x-2">`);
      Icon($$renderer2, {
        icon: getSubjectIcon(subjectName),
        class: `w-5 h-5 text-${stringify(color)}-500`
      });
      $$renderer2.push(`<!----> <h3 class="font-medium text-gray-900">${escape_html(subjectName)}</h3></div> <span${attr_class(`text-sm font-bold text-${stringify(color)}-600`)}>${escape_html(progress.percentage)}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2 mb-3"><div${attr_class(`bg-${stringify(color)}-500 h-2 rounded-full transition-all`)}${attr_style(`width: ${stringify(progress.percentage)}%`)}></div></div> <div class="text-xs text-gray-600"><p>${escape_html(progress.completed)} completed • ${escape_html(progress.inProgress)} in progress</p> <p>Total: ${escape_html(progress.total)} chapters</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:hand-thumb-up",
      class: "w-5 h-5 mr-2 text-green-500"
    });
    $$renderer2.push(`<!----> Strengths <span class="ml-2 text-sm text-gray-500">பலம்</span></h3> <div class="space-y-2"><!--[-->`);
    const each_array_3 = ensure_array_like(student.strengths || []);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let strength = each_array_3[$$index_3];
      $$renderer2.push(`<div class="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:check-circle",
        class: "w-4 h-4 text-green-500"
      });
      $$renderer2.push(`<!----> <span class="text-sm text-gray-700">${escape_html(strength)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-5 h-5 mr-2 text-orange-500"
    });
    $$renderer2.push(`<!----> Areas to Improve <span class="ml-2 text-sm text-gray-500">மேம்படுத்த வேண்டிய பகுதிகள்</span></h3> <div class="space-y-2"><!--[-->`);
    const each_array_4 = ensure_array_like(student.challenges || []);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let challenge = each_array_4[$$index_4];
      $$renderer2.push(`<div class="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:arrow-trending-up",
        class: "w-4 h-4 text-orange-500"
      });
      $$renderer2.push(`<!----> <span class="text-sm text-gray-700">${escape_html(challenge)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-6 h-6 mr-2 text-blue-500" });
    $$renderer2.push(`<!----> Recent Activity <span class="ml-2 text-sm text-gray-500">சமீபத்திய செயல்பாடுகள்</span></h2> <div class="space-y-4"><!--[-->`);
    const each_array_5 = ensure_array_like(recentActivity);
    for (let $$index_6 = 0, $$length = each_array_5.length; $$index_6 < $$length; $$index_6++) {
      let activity = each_array_5[$$index_6];
      $$renderer2.push(`<div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"><div${attr_class(`bg-${stringify(activity.color)}-100 p-2 rounded-lg`)}>`);
      Icon($$renderer2, {
        icon: activity.icon,
        class: `w-5 h-5 text-${stringify(activity.color)}-600`
      });
      $$renderer2.push(`<!----></div> <div class="flex-1"><h4 class="font-medium text-gray-900">${escape_html(activity.title)}</h4> <p class="text-sm text-gray-600">${escape_html(activity.subtitle)}</p> <p class="text-xs text-gray-500 mt-1">${escape_html(activity.time)}</p></div> `);
      if (activity.stars > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center space-x-1"><!--[-->`);
        const each_array_6 = ensure_array_like(Array(activity.stars));
        for (let i = 0, $$length2 = each_array_6.length; i < $$length2; i++) {
          each_array_6[i];
          Icon($$renderer2, { icon: "heroicons:star", class: "w-4 h-4 text-yellow-500" });
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:shield-check",
      class: "w-6 h-6 mr-2 text-purple-500"
    });
    $$renderer2.push(`<!----> Badges Collection <span class="ml-2 text-sm text-gray-500">பேட்ஜ் சேகரிப்பு</span></h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
    const each_array_7 = ensure_array_like(student.badges || []);
    for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
      let badge = each_array_7[$$index_7];
      $$renderer2.push(`<div class="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:shield-check",
        class: "w-8 h-8 mx-auto mb-2 text-purple-600"
      });
      $$renderer2.push(`<!----> <p class="text-sm font-medium text-gray-900">${escape_html(badge)}</p></div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_8 = ensure_array_like(Array(Math.max(0, 6 - (student.badges?.length || 0))));
    for (let i = 0, $$length = each_array_8.length; i < $$length; i++) {
      each_array_8[i];
      $$renderer2.push(`<div class="bg-gray-100 p-4 rounded-lg text-center opacity-50">`);
      Icon($$renderer2, {
        icon: "heroicons:lock-closed",
        class: "w-8 h-8 mx-auto mb-2 text-gray-400"
      });
      $$renderer2.push(`<!----> <p class="text-sm text-gray-500">Locked</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    bind_props($$props, { selectedStudent });
  });
}
function CurriculumTracker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let overallProgress;
    let selectedStudent = fallback($$props["selectedStudent"], "thambi");
    let student = {};
    let curriculum = {};
    let selectedSubject = "";
    let subjects = [];
    function getStatusColor(status) {
      switch (status) {
        case "completed":
          return "green";
        case "in-progress":
          return "blue";
        case "pending":
          return "gray";
        default:
          return "gray";
      }
    }
    function getStatusIcon(status) {
      switch (status) {
        case "completed":
          return "heroicons:check-circle";
        case "in-progress":
          return "heroicons:clock";
        case "pending":
          return "heroicons:minus-circle";
        default:
          return "heroicons:minus-circle";
      }
    }
    function getStatusText(status) {
      switch (status) {
        case "completed":
          return "Completed • முடிந்தது";
        case "in-progress":
          return "In Progress • நடந்து வருகிறது";
        case "pending":
          return "Pending • செய்ய வேண்டும்";
        default:
          return "Unknown";
      }
    }
    function calculateOverallProgress() {
      let totalChapters = 0;
      let completedChapters = 0;
      Object.values(curriculum).forEach((subject) => {
        totalChapters += subject.chapters.length;
        completedChapters += subject.chapters.filter((ch) => ch.status === "completed").length;
      });
      return {
        total: totalChapters,
        completed: completedChapters,
        percentage: totalChapters > 0 ? Math.round(completedChapters / totalChapters * 100) : 0
      };
    }
    function calculateSubjectProgress(subject) {
      const totalChapters = subject.chapters.length;
      const completedChapters = subject.chapters.filter((ch) => ch.status === "completed").length;
      const inProgressChapters = subject.chapters.filter((ch) => ch.status === "in-progress").length;
      return {
        total: totalChapters,
        completed: completedChapters,
        inProgress: inProgressChapters,
        pending: totalChapters - completedChapters - inProgressChapters,
        percentage: Math.round(completedChapters / totalChapters * 100)
      };
    }
    function getSubjectIcon(subjectName) {
      const iconMap = {
        Mathematics: "heroicons:calculator",
        Science: "heroicons:beaker",
        Physics: "heroicons:bolt",
        Chemistry: "heroicons:test-tube",
        English: "heroicons:language",
        Tamil: "heroicons:book-open",
        "Social Science": "heroicons:globe-alt",
        Hindi: "heroicons:chat-bubble-left-right"
      };
      return iconMap[subjectName] || "heroicons:book-open";
    }
    {
      student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
      curriculum = selectedStudent === "akka" ? CurrentAcademicData.class11 : CurrentAcademicData.class6;
      subjects = Object.keys(curriculum);
      if (subjects.length > 0 && !selectedSubject) {
        selectedSubject = subjects[0];
      }
    }
    overallProgress = calculateOverallProgress();
    $$renderer2.push(`<div class="space-y-6"><div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Curriculum Tracker</h1> <p class="text-lg text-gray-600">பாடத்திட்ட கண்காணிப்பு</p> <p class="text-sm text-gray-500">${escape_html(
      // Trigger reactivity
      // Show success message (you could add a toast notification here)
      // Trigger reactivity
      // Any initialization logic
      student.name
    )} (${escape_html(student.tamil)}) • ${escape_html(student.grade)}</p></div> <div class="text-center"><div class="relative w-20 h-20 mx-auto"><svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" stroke-width="2"></path><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" stroke-width="2"${attr("stroke-dasharray", `${stringify(overallProgress.percentage)}, 100`)} stroke-linecap="round"></path></svg> <div class="absolute inset-0 flex items-center justify-center"><span class="text-lg font-bold text-gray-900">${escape_html(overallProgress.percentage)}%</span></div></div> <p class="text-sm text-gray-600 mt-2">${escape_html(overallProgress.completed)}/${escape_html(overallProgress.total)} Chapters</p> <p class="text-xs text-gray-500">அத்தியாயங்கள்</p></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(curriculum));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [subjectKey, subject] = each_array[$$index];
      const progress = calculateSubjectProgress(subject);
      const isSelected = selectedSubject === subjectKey;
      $$renderer2.push(`<button${attr_class(`p-4 rounded-lg border-2 transition-all text-left ${stringify(isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300")}`)}><div class="flex items-center justify-between mb-3"><div class="flex items-center space-x-2">`);
      Icon($$renderer2, {
        icon: getSubjectIcon(subject.name),
        class: "w-6 h-6 text-blue-600"
      });
      $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-900">${escape_html(subject.name)}</h3></div> <span class="text-sm font-bold text-blue-600">${escape_html(progress.percentage)}%</span></div> <p class="text-sm text-gray-600 mb-2">${escape_html(subject.tamil)}</p> <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-blue-500 h-2 rounded-full transition-all"${attr_style(`width: ${stringify(progress.percentage)}%`)}></div></div> <div class="flex justify-between text-xs text-gray-500"><span>${escape_html(progress.completed)} completed</span> <span>${escape_html(progress.total)} total</span></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (selectedSubject && curriculum[selectedSubject]) {
      $$renderer2.push("<!--[-->");
      const subject = curriculum[selectedSubject];
      const progress = calculateSubjectProgress(subject);
      $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h2 class="text-xl font-bold text-gray-900 flex items-center">`);
      Icon($$renderer2, {
        icon: getSubjectIcon(subject.name),
        class: "w-6 h-6 mr-2 text-blue-600"
      });
      $$renderer2.push(`<!----> ${escape_html(subject.name)}</h2> <p class="text-lg text-gray-600">${escape_html(subject.tamil)}</p> <p class="text-sm text-gray-500">${escape_html(progress.completed)} of ${escape_html(progress.total)} chapters completed</p></div> <div class="grid grid-cols-3 gap-4 text-center"><div class="bg-green-50 p-3 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:check-circle",
        class: "w-6 h-6 mx-auto mb-1 text-green-600"
      });
      $$renderer2.push(`<!----> <p class="text-lg font-bold text-green-800">${escape_html(progress.completed)}</p> <p class="text-xs text-green-600">Completed</p></div> <div class="bg-blue-50 p-3 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:clock",
        class: "w-6 h-6 mx-auto mb-1 text-blue-600"
      });
      $$renderer2.push(`<!----> <p class="text-lg font-bold text-blue-800">${escape_html(progress.inProgress)}</p> <p class="text-xs text-blue-600">In Progress</p></div> <div class="bg-gray-50 p-3 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:minus-circle",
        class: "w-6 h-6 mx-auto mb-1 text-gray-600"
      });
      $$renderer2.push(`<!----> <p class="text-lg font-bold text-gray-800">${escape_html(progress.pending)}</p> <p class="text-xs text-gray-600">Pending</p></div></div></div> <div class="space-y-3"><h3 class="text-lg font-semibold text-gray-900 mb-4">Chapters • அத்தியாயங்கள்</h3> <!--[-->`);
      const each_array_1 = ensure_array_like(subject.chapters);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let chapter = each_array_1[index];
        const statusColor = getStatusColor(chapter.status);
        $$renderer2.push(`<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"><div class="flex items-center space-x-4"><div class="flex-shrink-0"><div${attr_class(`w-8 h-8 bg-${stringify(statusColor)}-100 rounded-full flex items-center justify-center`)}>`);
        Icon($$renderer2, {
          icon: getStatusIcon(chapter.status),
          class: `w-5 h-5 text-${stringify(statusColor)}-600`
        });
        $$renderer2.push(`<!----></div></div> <div class="flex-1"><div class="flex items-center space-x-2 mb-1"><span class="text-sm font-medium text-gray-600">Chapter ${escape_html(chapter.id)}</span> <span${attr_class(`px-2 py-1 bg-${stringify(statusColor)}-100 text-${stringify(statusColor)}-800 text-xs rounded-full`)}>${escape_html(getStatusText(chapter.status))}</span></div> <h4 class="font-medium text-gray-900">${escape_html(chapter.title)}</h4> <p class="text-sm text-gray-600">${escape_html(chapter.tamil || chapter.english || "")}</p> `);
        if (selectedStudent === "akka" && chapter.jeeLevel) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-1"><span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">JEE Level: ${escape_html(chapter.jeeLevel)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div> <div class="flex space-x-2">`);
        if (chapter.status === "pending") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">Start</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (chapter.status === "in-progress") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">Complete</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<button class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-lg cursor-not-allowed" disabled>Completed</button>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--> <button class="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-lg hover:bg-purple-200 transition-colors">Study</button></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"><h4 class="font-medium text-gray-900 mb-2 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:lightbulb",
        class: "w-5 h-5 mr-2 text-yellow-500"
      });
      $$renderer2.push(`<!----> Study Recommendations • பரிந்துரைகள்</h4> <div class="text-sm text-gray-700 space-y-1">`);
      if (progress.inProgress > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p>• Focus on completing ${escape_html(progress.inProgress)} chapters in progress</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (progress.pending > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p>• Plan to start ${escape_html(Math.min(2, progress.pending))} new chapters this week</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (selectedStudent === "akka") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p>• Review completed chapters for JEE preparation</p> <p>• Practice numerical problems for Physics and Chemistry</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p>• Create mind maps for Science chapters</p> <p>• Practice word problems for Mathematics</p>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-6 h-6 mr-2 text-green-600"
    });
    $$renderer2.push(`<!----> Upcoming Academic Events <span class="ml-2 text-sm text-gray-500">கல்வி நிகழ்வுகள்</span></h2> <div class="space-y-3">`);
    if (selectedStudent === "akka") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center space-x-4 p-3 bg-red-50 border border-red-200 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:exclamation-triangle",
        class: "w-5 h-5 text-red-600"
      });
      $$renderer2.push(`<!----> <div><p class="font-medium text-red-900">JEE Main 2026</p> <p class="text-sm text-red-700">January 2026 • High Priority</p></div></div> <div class="flex items-center space-x-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:academic-cap",
        class: "w-5 h-5 text-orange-600"
      });
      $$renderer2.push(`<!----> <div><p class="font-medium text-orange-900">CBSE Board Exams</p> <p class="text-sm text-orange-700">March 2026 • Class 11 Final</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex items-center space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:document-text",
        class: "w-5 h-5 text-blue-600"
      });
      $$renderer2.push(`<!----> <div><p class="font-medium text-blue-900">Quarterly Exams</p> <p class="text-sm text-blue-700">December 2025 • Class 6</p></div></div> <div class="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">`);
      Icon($$renderer2, { icon: "heroicons:trophy", class: "w-5 h-5 text-green-600" });
      $$renderer2.push(`<!----> <div><p class="font-medium text-green-900">Math Olympiad</p> <p class="text-sm text-green-700">January 2026 • Registration Open</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    bind_props($$props, { selectedStudent });
  });
}
function QuizGenerator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedStudent = fallback($$props["selectedStudent"], "thambi");
    let student = {};
    let curriculum = {};
    let selectedSubject = "";
    let selectedChapter = "";
    let quizType = "mcq";
    let difficulty = "medium";
    let numQuestions = 5;
    function getAvailableSubjects() {
      return Object.entries(curriculum).map(([key, subject]) => ({ key, name: subject.name, tamil: subject.tamil }));
    }
    function getAvailableChapters() {
      if (!selectedSubject || !curriculum[selectedSubject]) return [];
      return curriculum[selectedSubject].chapters.filter((ch) => ch.status === "completed" || ch.status === "in-progress");
    }
    {
      student = StudentProfiles[selectedStudent] || StudentProfiles.thambi;
      curriculum = selectedStudent === "akka" ? CurrentAcademicData.class11 : CurrentAcademicData.class6;
      if (!selectedSubject && Object.keys(curriculum).length > 0) {
        selectedSubject = Object.keys(curriculum)[0];
      }
    }
    $$renderer2.push(`<div class="space-y-6"><div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Auto Quiz Generator</h1> <p class="text-lg text-gray-600">தானியங்கி வினாவிடை</p> <p class="text-sm text-gray-500">${escape_html(
      // Any initialization logic
      student.name
    )} (${escape_html(student.tamil)}) • ${escape_html(student.grade)}</p></div> <div class="grid grid-cols-2 gap-4 text-center"><div class="bg-purple-50 p-3 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:puzzle-piece",
      class: "w-6 h-6 mx-auto mb-1 text-purple-600"
    });
    $$renderer2.push(`<!----> <p class="text-lg font-bold text-purple-800">12</p> <p class="text-xs text-purple-600">Quizzes Taken</p></div> <div class="bg-green-50 p-3 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:trophy",
      class: "w-6 h-6 mx-auto mb-1 text-green-600"
    });
    $$renderer2.push(`<!----> <p class="text-lg font-bold text-green-800">78%</p> <p class="text-xs text-green-600">Average Score</p></div></div></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-6"><h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:cog-6-tooth",
        class: "w-6 h-6 mr-2 text-blue-600"
      });
      $$renderer2.push(`<!----> Create New Quiz <span class="ml-2 text-sm text-gray-500">புதிய வினாவிடை உருவாக்கவும்</span></h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Subject • பாடம்</label> `);
      $$renderer2.select(
        {
          value: selectedSubject,
          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Select Subject`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(getAvailableSubjects());
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let subject = each_array[$$index];
            $$renderer3.option({ value: subject.key }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(subject.name)} • ${escape_html(subject.tamil)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-gray-700 mb-2">Chapter • அத்தியாயம்</label> `);
      $$renderer2.select(
        {
          value: selectedChapter,
          disabled: !selectedSubject,
          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Select Chapter`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(getAvailableChapters());
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let chapter = each_array_1[$$index_1];
            $$renderer3.option({ value: chapter.title }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(chapter.title)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-gray-700 mb-2">Question Type • கேள்வி வகை</label> `);
      $$renderer2.select(
        {
          value: quizType,
          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(QuizConfig.questionTypes);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let type = each_array_2[$$index_2];
            $$renderer3.option({ value: type.id }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(type.name)} • ${escape_html(type.tamil)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-gray-700 mb-2">Difficulty • சிரமம்</label> `);
      $$renderer2.select(
        {
          value: difficulty,
          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_3 = ensure_array_like(QuizConfig.difficultyLevels);
          for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
            let level = each_array_3[$$index_3];
            $$renderer3.option({ value: level.id }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(level.name)} • ${escape_html(level.tamil)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-gray-700 mb-2">Number of Questions • கேள்விகளின் எண்ணிக்கை</label> `);
      $$renderer2.select(
        {
          value: numQuestions,
          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: 5 }, ($$renderer4) => {
            $$renderer4.push(`5 Questions`);
          });
          $$renderer3.option({ value: 10 }, ($$renderer4) => {
            $$renderer4.push(`10 Questions`);
          });
          $$renderer3.option({ value: 15 }, ($$renderer4) => {
            $$renderer4.push(`15 Questions`);
          });
          $$renderer3.option({ value: 20 }, ($$renderer4) => {
            $$renderer4.push(`20 Questions`);
          });
        }
      );
      $$renderer2.push(`</div> <div class="flex items-end"><button${attr("disabled", !selectedSubject || !selectedChapter, true)} class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2">`);
      Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-5 h-5" });
      $$renderer2.push(`<!----> <span>Generate Quiz</span></button></div></div> <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"><h3 class="font-medium text-gray-900 mb-2 flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:lightbulb",
        class: "w-5 h-5 mr-2 text-yellow-500"
      });
      $$renderer2.push(`<!----> Quick Practice Suggestions <span class="ml-2 text-sm text-gray-500">பயிற்சி பரிந்துரைகள்</span></h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      if (selectedStudent === "akka") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"><h4 class="font-medium text-blue-900">JEE Physics Practice</h4> <p class="text-sm text-blue-700">Laws of Motion - Hard Level</p></button> <button class="p-3 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"><h4 class="font-medium text-purple-900">Math Fundamentals</h4> <p class="text-sm text-purple-700">Sets and Relations - Medium</p></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<button class="p-3 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left"><h4 class="font-medium text-green-900">Math Practice</h4> <p class="text-sm text-green-700">Playing with Numbers - Easy</p></button> <button class="p-3 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-left"><h4 class="font-medium text-orange-900">Science Explorer</h4> <p class="text-sm text-orange-700">Living Organisms - Easy</p></button>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { selectedStudent });
  });
}
function EducationPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentSection;
    let activeSection = "dashboard";
    let selectedStudent = "thambi";
    let overviewStats = {
      totalStudents: Object.keys(StudentProfiles).length,
      activeStreaks: StudentProfiles.thambi.currentStreak + StudentProfiles.akka.currentStreak,
      totalStars: StudentProfiles.thambi.totalStars + StudentProfiles.akka.totalStars,
      totalBadges: StudentProfiles.thambi.badges.length + StudentProfiles.akka.badges.length,
      completedChapters: 0,
      totalChapters: 0
    };
    {
      const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
      if (path.startsWith("/education/")) {
        const section = path.split("/")[2];
        if (section && EducationSections.find((s) => s.id === section)) {
          activeSection = section;
        }
      }
    }
    currentSection = EducationSections.find((s) => s.id === activeSection);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-blue-100 p-3 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:academic-cap",
      class: "w-8 h-8 text-blue-600"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">Education &amp; Learning Suite</h1> <p class="text-lg text-gray-600">கல்வி மற்றும் கற்றல் தொகுப்பு</p> <p class="text-sm text-gray-500">Designed for South Indian CBSE families - Academic Year ${escape_html(
      // Calculate overview stats
      // Calculate curriculum stats
      // Count Thambi's progress (Class 6)
      // Count Akka's progress (Class 11)
      CurrentAcademicData.year
    )}</p></div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(StudentProfiles));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [studentId, student] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(selectedStudent === studentId ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}>`);
      Icon($$renderer2, { icon: "heroicons:user-circle", class: "w-5 h-5" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(student.name)}</span> <span class="text-sm opacity-75">(${escape_html(student.tamil)})</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Active Students</p> <p class="text-2xl font-bold">${escape_html(overviewStats.totalStudents)}</p> <p class="text-xs opacity-75">மாணவர்கள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:user-group", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Study Streaks</p> <p class="text-2xl font-bold">${escape_html(overviewStats.activeStreaks)}</p> <p class="text-xs opacity-75">நாட்கள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Total Stars</p> <p class="text-2xl font-bold">${escape_html(overviewStats.totalStars)}</p> <p class="text-xs opacity-75">நட்சத்திரங்கள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:star", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Progress</p> <p class="text-2xl font-bold">${escape_html(overviewStats.completedChapters)}/${escape_html(overviewStats.totalChapters)}</p> <p class="text-xs opacity-75">அத்தியாயங்கள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:chart-bar", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bars-3", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Education Sections <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span></h3> <nav class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(EducationSections);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${stringify(activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : "text-gray-600 hover:bg-gray-50")}`)}>`);
      Icon($$renderer2, { icon: section.icon, class: "w-5 h-5 flex-shrink-0" });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><p class="font-medium truncate">${escape_html(section.name)}</p> <p class="text-xs opacity-75 truncate">${escape_html(section.tamil)}</p></div> `);
      if (activeSection === section.id) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-4 h-4 mr-2"
    });
    $$renderer2.push(`<!----> Family Mentors <span class="ml-2 text-xs text-gray-500">வழிகாட்டிகள்</span></h4> <!--[-->`);
    const each_array_2 = ensure_array_like(Object.entries(FamilyMentors));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let [mentorId, mentor] = each_array_2[$$index_2];
      $$renderer2.push(`<div class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"><div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">${escape_html(mentor.name[0])}</span></div> <div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900">${escape_html(mentor.name)}</p> <p class="text-xs text-gray-500">${escape_html(mentor.tamil)}</p></div> `);
      Icon($$renderer2, {
        icon: "heroicons:chat-bubble-bottom-center-text",
        class: "w-4 h-4 text-gray-400"
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="lg:col-span-3">`);
    if (activeSection === "dashboard") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="bg-white rounded-xl shadow-lg p-6">`);
      {
        $$renderer2.push("<!--[-->");
        const student = StudentProfiles[selectedStudent];
        $$renderer2.push(`<div class="flex items-start justify-between mb-6"><div class="flex items-center space-x-4"><div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">`);
        Icon($$renderer2, { icon: "heroicons:user", class: "w-8 h-8 text-white" });
        $$renderer2.push(`<!----></div> <div><h2 class="text-2xl font-bold text-gray-900">${escape_html(student.name)} (${escape_html(student.tamil)})</h2> <p class="text-lg text-gray-600">${escape_html(student.grade)}</p> <div class="flex items-center space-x-4 mt-2"><div class="flex items-center space-x-1">`);
        Icon($$renderer2, { icon: "heroicons:fire", class: "w-4 h-4 text-orange-500" });
        $$renderer2.push(`<!----> <span class="text-sm text-gray-600">${escape_html(student.currentStreak)} day streak</span></div> <div class="flex items-center space-x-1">`);
        Icon($$renderer2, { icon: "heroicons:star", class: "w-4 h-4 text-yellow-500" });
        $$renderer2.push(`<!----> <span class="text-sm text-gray-600">${escape_html(student.totalStars)} stars</span></div></div></div></div> <div class="text-right"><div class="flex flex-wrap gap-2 justify-end mb-2"><!--[-->`);
        const each_array_3 = ensure_array_like(student.badges.slice(0, 3));
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let badge = each_array_3[$$index_3];
          $$renderer2.push(`<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${escape_html(badge)}</span>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (student.badges.length > 3) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+${escape_html(student.badges.length - 3)} more</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <p class="text-sm text-gray-500">Age ${escape_html(student.age)} • ${escape_html(student.achievements.length)} achievements</p></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
        const each_array_4 = ensure_array_like(student.subjects.slice(0, 4));
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let subject = each_array_4[$$index_4];
          $$renderer2.push(`<div class="bg-gray-50 p-4 rounded-lg text-center">`);
          Icon($$renderer2, {
            icon: "heroicons:book-open",
            class: "w-6 h-6 mx-auto mb-2 text-gray-600"
          });
          $$renderer2.push(`<!----> <p class="text-sm font-medium text-gray-900">${escape_html(subject)}</p> <p class="text-xs text-gray-500 mt-1">In Progress</p></div>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        if (student.achievements.length > 0) {
          $$renderer2.push("<!--[-->");
          const recentAchievement = student.achievements[student.achievements.length - 1];
          $$renderer2.push(`<div class="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4"><div class="flex items-center space-x-3">`);
          Icon($$renderer2, { icon: "heroicons:trophy", class: "w-6 h-6 text-green-600" });
          $$renderer2.push(`<!----> <div><p class="font-medium text-green-900">Latest Achievement</p> <p class="text-sm text-green-700">${escape_html(recentAchievement.title)} - ${escape_html(recentAchievement.position)}</p> <p class="text-xs text-green-600">${escape_html(new Date(recentAchievement.date).toLocaleDateString())}</p></div></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><button class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left group"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:calendar-days",
        class: "w-8 h-8 text-orange-500"
      });
      $$renderer2.push(`<!----> `);
      Icon($$renderer2, {
        icon: "heroicons:arrow-right",
        class: "w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors"
      });
      $$renderer2.push(`<!----></div> <h3 class="font-semibold text-gray-900 mb-2">Start Study Session</h3> <p class="text-sm text-gray-600">Plan today's learning schedule</p> <p class="text-xs text-gray-500 mt-1">படிப்பு திட்டம்</p></button> <button class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left group"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:puzzle-piece",
        class: "w-8 h-8 text-pink-500"
      });
      $$renderer2.push(`<!----> `);
      Icon($$renderer2, {
        icon: "heroicons:arrow-right",
        class: "w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors"
      });
      $$renderer2.push(`<!----></div> <h3 class="font-semibold text-gray-900 mb-2">Take a Quiz</h3> <p class="text-sm text-gray-600">Practice with auto-generated questions</p> <p class="text-xs text-gray-500 mt-1">தானியங்கி வினாவிடை</p></button> <button class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left group"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:book-open",
        class: "w-8 h-8 text-purple-500"
      });
      $$renderer2.push(`<!----> `);
      Icon($$renderer2, {
        icon: "heroicons:arrow-right",
        class: "w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors"
      });
      $$renderer2.push(`<!----></div> <h3 class="font-semibold text-gray-900 mb-2">Track Progress</h3> <p class="text-sm text-gray-600">View curriculum completion</p> <p class="text-xs text-gray-500 mt-1">பாடத்திட்ட கண்காணிப்பு</p></button></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (activeSection === "students") {
        $$renderer2.push("<!--[-->");
        StudentProfileCard($$renderer2, { selectedStudent });
      } else {
        $$renderer2.push("<!--[!-->");
        if (activeSection === "curriculum") {
          $$renderer2.push("<!--[-->");
          CurriculumTracker($$renderer2, { selectedStudent });
        } else {
          $$renderer2.push("<!--[!-->");
          if (activeSection === "planner") {
            $$renderer2.push("<!--[-->");
            StudyPlanner($$renderer2, { selectedStudent });
          } else {
            $$renderer2.push("<!--[!-->");
            if (activeSection === "quiz") {
              $$renderer2.push("<!--[-->");
              QuizGenerator($$renderer2, { selectedStudent });
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push(`<div class="bg-white rounded-xl shadow-lg p-8"><div class="text-center py-12"><div class="text-6xl mb-4">`);
              Icon($$renderer2, {
                icon: currentSection?.icon || "heroicons:cog",
                class: "w-16 h-16 mx-auto text-gray-400"
              });
              $$renderer2.push(`<!----></div> <h2 class="text-2xl font-semibold text-gray-900 mb-2">${escape_html(currentSection?.name)}</h2> <p class="text-gray-600 mb-1">${escape_html(currentSection?.tamil)}</p> <p class="text-gray-500 mb-6">${escape_html(currentSection?.description)}</p> <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto"><p class="text-sm text-blue-800"><strong>Coming Soon!</strong> This education section is being developed with Tamil-English interface and CBSE curriculum integration for South Indian families.</p></div></div></div>`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  EducationPage($$renderer);
}
export {
  _page as default
};
