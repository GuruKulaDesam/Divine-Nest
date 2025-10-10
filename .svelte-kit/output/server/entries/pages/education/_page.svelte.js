import { b as attr_class, j as attr_style, a as ensure_array_like, s as stringify, h as head } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/runtime.js";
import "../../../chunks/education.js";
import { T as escape_html } from "../../../chunks/context.js";
function EducationDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats = {};
    let recentPlans = [];
    let recentBooks = [];
    let upcomingExams = [];
    function formatDate(date) {
      return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    }
    function getProgressColor(progress) {
      if (progress >= 80) return "bg-green-500";
      if (progress >= 60) return "bg-yellow-500";
      if (progress >= 40) return "bg-orange-500";
      return "bg-red-500";
    }
    function getCategoryIcon(category) {
      const icons = {
        spiritual: "heroicons:sparkles",
        comics: "heroicons:face-smile",
        historical: "heroicons:clock",
        mythics: "heroicons:star",
        mystics: "heroicons:eye",
        academic: "heroicons:academic-cap"
      };
      return icons[category] || "heroicons:book-open";
    }
    function getCategoryColor(category) {
      const colors = {
        spiritual: "text-purple-500",
        comics: "text-pink-500",
        historical: "text-amber-500",
        mythics: "text-indigo-500",
        mystics: "text-cyan-500",
        academic: "text-green-500"
      };
      return colors[category] || "text-gray-500";
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><h1 class="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:academic-cap", class: "text-indigo-600" });
    $$renderer2.push(`<!----> 🎓 Education &amp; Learning Dashboard</h1> <p class="text-gray-600 text-lg">Track studies, manage library, and prepare for exams</p></div> <div class="mb-8"><div class="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-lg border border-gray-100"><button${attr_class(`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${stringify(
      "bg-indigo-500 text-white shadow-md"
    )}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "text-lg" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${stringify("text-gray-600 hover:bg-gray-50")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:clipboard-document-list", class: "text-lg" });
    $$renderer2.push(`<!----> Study Plans</button> <button${attr_class(`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${stringify("text-gray-600 hover:bg-gray-50")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "text-lg" });
    $$renderer2.push(`<!----> Library</button> <button${attr_class(`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${stringify("text-gray-600 hover:bg-gray-50")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:document-check", class: "text-lg" });
    $$renderer2.push(`<!----> Exams</button></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, { icon: "heroicons:book-open", class: "text-blue-500 text-2xl" });
      $$renderer2.push(`<!----> <span class="text-2xl font-bold text-blue-600">${escape_html(stats.totalBooks || 0)}</span></div> <h3 class="text-sm font-medium text-gray-600">Total Books</h3> <p class="text-xs text-gray-500 mt-1">In family library</p></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:clipboard-document-list",
        class: "text-green-500 text-2xl"
      });
      $$renderer2.push(`<!----> <span class="text-2xl font-bold text-green-600">${escape_html(stats.studyPlans || 0)}</span></div> <h3 class="text-sm font-medium text-gray-600">Study Plans</h3> <p class="text-xs text-gray-500 mt-1">Active plans</p></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:document-check",
        class: "text-orange-500 text-2xl"
      });
      $$renderer2.push(`<!----> <span class="text-2xl font-bold text-orange-600">${escape_html(stats.upcomingExams || 0)}</span></div> <h3 class="text-sm font-medium text-gray-600">Upcoming Exams</h3> <p class="text-xs text-gray-500 mt-1">This month</p></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"><div class="flex items-center justify-between mb-4">`);
      Icon($$renderer2, { icon: "heroicons:star", class: "text-purple-500 text-2xl" });
      $$renderer2.push(`<!----> <span class="text-2xl font-bold text-purple-600">${escape_html(stats.avgBookRating ? stats.avgBookRating.toFixed(1) : "0.0")}</span></div> <h3 class="text-sm font-medium text-gray-600">Avg Rating</h3> <p class="text-xs text-gray-500 mt-1">Book reviews</p></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
      Icon($$renderer2, { icon: "heroicons:chart-bar", class: "text-indigo-500" });
      $$renderer2.push(`<!----> Study Progress</h3> <div class="space-y-4"><div><div class="flex justify-between text-sm mb-2"><span class="text-gray-600">Chapters Completed</span> <span class="font-medium">${escape_html(stats.completedChapters || 0)}/${escape_html(stats.totalChapters || 0)}</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-indigo-500 h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(stats.totalChapters ? (stats.completedChapters || 0) / stats.totalChapters * 100 : 0)}%`)}></div></div></div> <div><div class="flex justify-between text-sm mb-2"><span class="text-gray-600">Books Reading</span> <span class="font-medium">${escape_html(stats.booksReading || 0)}</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(stats.totalBooks ? (stats.booksReading || 0) / stats.totalBooks * 100 : 0)}%`)}></div></div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: "heroicons:clipboard-document-list",
        class: "text-blue-500"
      });
      $$renderer2.push(`<!----> Recent Study Plans</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(recentPlans.slice(0, 3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let plan = each_array[$$index];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><h4 class="font-medium text-gray-800">${escape_html(plan.subject)}</h4> <p class="text-sm text-gray-600">Due: ${escape_html(formatDate(plan.dueDate))}</p></div> <div class="text-right"><div class="text-sm font-medium text-gray-600">${escape_html(plan.completedChapters.length)}/${escape_html(plan.chapters.length)} chapters</div> <div class="w-16 bg-gray-200 rounded-full h-1 mt-1"><div class="bg-blue-500 h-1 rounded-full"${attr_style(`width: ${stringify(plan.completedChapters.length / plan.chapters.length * 100)}%`)}></div></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
      Icon($$renderer2, { icon: "heroicons:book-open", class: "text-green-500" });
      $$renderer2.push(`<!----> Library Collection</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(recentBooks.slice(0, 4));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let book = each_array_1[$$index_1];
        $$renderer2.push(`<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="p-2 bg-white rounded-lg">`);
        Icon($$renderer2, {
          icon: getCategoryIcon(book.category),
          class: `${stringify(getCategoryColor(book.category))} text-lg`
        });
        $$renderer2.push(`<!----></div> <div class="flex-1"><h4 class="font-medium text-gray-800 text-sm">${escape_html(book.title)}</h4> <p class="text-xs text-gray-600">${escape_html(book.author)}</p> <div class="flex items-center gap-2 mt-1"><div class="flex-1 bg-gray-200 rounded-full h-1"><div${attr_class(`${stringify(getProgressColor(book.progress))} h-1 rounded-full transition-all duration-300`)}${attr_style(`width: ${stringify(book.progress)}%`)}></div></div> <span class="text-xs text-gray-500">${escape_html(book.progress)}%</span></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> `);
      if (upcomingExams.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100"><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
        Icon($$renderer2, { icon: "heroicons:calendar-days", class: "text-orange-500" });
        $$renderer2.push(`<!----> Upcoming Exams</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
        const each_array_2 = ensure_array_like(upcomingExams);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let exam = each_array_2[$$index_2];
          $$renderer2.push(`<div class="p-4 bg-orange-50 rounded-lg border border-orange-200"><h4 class="font-medium text-gray-800">${escape_html(exam.subject)}</h4> <p class="text-sm text-orange-600 mb-2">${escape_html(formatDate(exam.date))}</p> <div class="text-xs text-gray-600">Prep: ${escape_html(exam.completedPrep.length)}/${escape_html(exam.prepChecklist.length)} items</div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Education &amp; Learning - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track studies, manage library, and prepare for exams in your South Indian family"/>`);
  });
  EducationDashboard($$renderer);
}
export {
  _page as default
};
