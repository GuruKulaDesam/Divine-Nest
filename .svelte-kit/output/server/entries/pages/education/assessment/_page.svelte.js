import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function AssessmentPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let assessments = [
      {
        id: 1,
        title: "Mathematics Mid-term Exam",
        subject: "Mathematics",
        type: "Exam",
        date: "2024-03-20",
        grade: "A",
        score: 95,
        maxScore: 100,
        status: "completed",
        feedback: "Excellent work! Strong understanding of algebraic concepts."
      },
      {
        id: 2,
        title: "Science Lab Report",
        subject: "Science",
        type: "Assignment",
        date: "2024-03-25",
        grade: "B+",
        score: 88,
        maxScore: 100,
        status: "completed",
        feedback: "Good analysis but needs more detailed methodology section."
      },
      {
        id: 3,
        title: "History Research Paper",
        subject: "History",
        type: "Project",
        date: "2024-04-10",
        grade: "A-",
        score: 92,
        maxScore: 100,
        status: "completed",
        feedback: "Well-researched with excellent citations."
      },
      {
        id: 4,
        title: "English Literature Quiz",
        subject: "English",
        type: "Quiz",
        date: "2024-04-15",
        grade: "Pending",
        score: null,
        maxScore: 50,
        status: "upcoming",
        feedback: ""
      }
    ];
    let filteredAssessments = assessments;
    let searchQuery = "";
    let selectedSubject = "all";
    let selectedType = "all";
    let selectedStatus = "all";
    const subjects = [
      { id: "all", name: "All Subjects" },
      { id: "Mathematics", name: "Mathematics" },
      { id: "Science", name: "Science" },
      { id: "English", name: "English" },
      { id: "History", name: "History" },
      { id: "Geography", name: "Geography" },
      { id: "Computer Science", name: "Computer Science" }
    ];
    const types = [
      { id: "all", name: "All Types" },
      { id: "Exam", name: "Exam" },
      { id: "Quiz", name: "Quiz" },
      { id: "Assignment", name: "Assignment" },
      { id: "Project", name: "Project" },
      { id: "Presentation", name: "Presentation" }
    ];
    const statuses = [
      { id: "all", name: "All Status" },
      { id: "completed", name: "Completed" },
      { id: "upcoming", name: "Upcoming" },
      { id: "in-progress", name: "In Progress" }
    ];
    function getGradeColor(grade) {
      if (grade === "Pending") return "text-gray-500";
      const gradeValue = grade.charAt(0);
      switch (gradeValue) {
        case "A":
          return "text-green-600";
        case "B":
          return "text-blue-600";
        case "C":
          return "text-yellow-600";
        case "D":
        case "F":
          return "text-red-600";
        default:
          return "text-gray-600";
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-800";
        case "upcoming":
          return "bg-blue-100 text-blue-800";
        case "in-progress":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getAverageScore() {
      const completedAssessments = assessments.filter((a) => a.status === "completed" && a.score !== null);
      if (completedAssessments.length === 0) return 0;
      const totalScore = completedAssessments.reduce((sum, a) => sum + a.score / a.maxScore * 100, 0);
      return Math.round(totalScore / completedAssessments.length);
    }
    function getGradeDistribution() {
      const completed = assessments.filter((a) => a.status === "completed");
      const distribution = {};
      completed.forEach((assessment) => {
        const grade = assessment.grade.charAt(0);
        distribution[grade] = (distribution[grade] || 0) + 1;
      });
      return distribution;
    }
    {
      filteredAssessments = assessments.filter((assessment) => {
        const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) || assessment.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === "all";
        const matchesType = selectedType === "all";
        const matchesStatus = selectedStatus === "all";
        return matchesSearch && matchesSubject && matchesType && matchesStatus;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Assessments</h1> <p class="text-base-content/60 mt-1">Track exams, quizzes, assignments, and academic performance</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Assessment</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-blue-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:clipboard-list", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Total Assessments</h3> <p class="text-2xl font-bold text-blue-600">${escape_html(assessments.length)}</p></div></div></div></div> <div class="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-green-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:chart-line", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Average Score</h3> <p class="text-2xl font-bold text-green-600">${escape_html(getAverageScore())}%</p></div></div></div></div> <div class="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-purple-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Completed</h3> <p class="text-2xl font-bold text-purple-600">${escape_html(assessments.filter((a) => a.status === "completed").length)}</p></div></div></div></div> <div class="card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-orange-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:calendar-clock", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Upcoming</h3> <p class="text-2xl font-bold text-orange-600">${escape_html(assessments.filter((a) => a.status === "upcoming").length)}</p></div></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><input type="text"${attr("value", searchQuery)} placeholder="Search assessments..." class="input input-bordered"/> `);
    $$renderer2.select({ value: selectedSubject, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(subjects);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let subject = each_array[$$index];
        $$renderer3.option({ value: subject.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(subject.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(` `);
    $$renderer2.select({ value: selectedType, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(types);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let type = each_array_1[$$index_1];
        $$renderer3.option({ value: type.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(type.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(` `);
    $$renderer2.select({ value: selectedStatus, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(statuses);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let status = each_array_2[$$index_2];
        $$renderer3.option({ value: status.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(status.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Title</th><th>Subject</th><th>Type</th><th>Date</th><th>Score</th><th>Grade</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_3 = ensure_array_like(filteredAssessments);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let assessment = each_array_3[$$index_3];
      $$renderer2.push(`<tr><td class="font-semibold">${escape_html(assessment.title)}</td><td>${escape_html(assessment.subject)}</td><td><span class="badge badge-outline">${escape_html(assessment.type)}</span></td><td>${escape_html(new Date(assessment.date).toLocaleDateString())}</td><td>`);
      if (assessment.score !== null) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html(assessment.score)}/${escape_html(assessment.maxScore)} <span class="text-sm text-base-content/60">(${escape_html(Math.round(assessment.score / assessment.maxScore * 100))}%)</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-base-content/40">-</span>`);
      }
      $$renderer2.push(`<!--]--></td><td><span${attr_class(`font-semibold ${stringify(getGradeColor(assessment.grade))}`)}>${escape_html(assessment.grade)}</span></td><td><span${attr_class(`badge ${stringify(getStatusColor(assessment.status))}`)}>${escape_html(statuses.find((s) => s.id === assessment.status)?.name)}</span></td><td><div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a>View Details</a></li> <li><a class="text-error">Delete</a></li></ul></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (filteredAssessments.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:clipboard-list-outline",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/60">No assessments found</h3> <p class="text-base-content/40">Add your first assessment to get started!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (assessments.filter((a) => a.status === "completed").length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg"><div class="card-body"><h3 class="card-title">Grade Distribution</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"><!--[-->`);
      const each_array_4 = ensure_array_like(Object.entries(getGradeDistribution()));
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let [grade, count] = each_array_4[$$index_4];
        $$renderer2.push(`<div class="text-center"><div${attr_class(`text-3xl font-bold ${stringify(getGradeColor(grade + "+"))}`)}>${escape_html(count)}</div> <div class="text-sm text-base-content/60">Grade ${escape_html(grade)}</div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  AssessmentPage($$renderer);
}
export {
  _page as default
};
