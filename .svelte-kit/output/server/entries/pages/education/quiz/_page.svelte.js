import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function QuizPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredQuizzes;
    let quizzes = [
      {
        id: 1,
        title: "Mathematics Quiz - Algebra",
        subject: "Mathematics",
        grade: "10th Grade",
        questions: 25,
        duration: 45,
        difficulty: "Medium",
        status: "Active",
        createdDate: "2024-01-15",
        attempts: 45,
        averageScore: 78
      },
      {
        id: 2,
        title: "Science Quiz - Physics",
        subject: "Physics",
        grade: "11th Grade",
        questions: 30,
        duration: 60,
        difficulty: "Hard",
        status: "Active",
        createdDate: "2024-01-10",
        attempts: 32,
        averageScore: 72
      },
      {
        id: 3,
        title: "English Literature Quiz",
        subject: "English",
        grade: "9th Grade",
        questions: 20,
        duration: 40,
        difficulty: "Easy",
        status: "Draft",
        createdDate: "2024-01-20",
        attempts: 0,
        averageScore: 0
      }
    ];
    let searchQuery = "";
    let selectedSubject = "all";
    let selectedGrade = "all";
    let selectedDifficulty = "all";
    let selectedStatus = "all";
    let subjects = [
      { id: "mathematics", name: "Mathematics" },
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" },
      { id: "biology", name: "Biology" },
      { id: "english", name: "English" },
      { id: "history", name: "History" },
      { id: "geography", name: "Geography" }
    ];
    let grades = [
      { id: "6th", name: "6th Grade" },
      { id: "7th", name: "7th Grade" },
      { id: "8th", name: "8th Grade" },
      { id: "9th", name: "9th Grade" },
      { id: "10th", name: "10th Grade" },
      { id: "11th", name: "11th Grade" },
      { id: "12th", name: "12th Grade" }
    ];
    let difficulties = [
      { id: "Easy", name: "Easy" },
      { id: "Medium", name: "Medium" },
      { id: "Hard", name: "Hard" }
    ];
    let statuses = [
      { id: "Active", name: "Active" },
      { id: "Draft", name: "Draft" },
      { id: "Archived", name: "Archived" }
    ];
    function getDifficultyColor(difficulty) {
      switch (difficulty) {
        case "Easy":
          return "text-green-600 bg-green-100";
        case "Medium":
          return "text-yellow-600 bg-yellow-100";
        case "Hard":
          return "text-red-600 bg-red-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "Active":
          return "text-green-600 bg-green-100";
        case "Draft":
          return "text-yellow-600 bg-yellow-100";
        case "Archived":
          return "text-gray-600 bg-gray-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
    filteredQuizzes = quizzes.filter((quiz) => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === "all";
      const matchesGrade = selectedGrade === "all";
      const matchesDifficulty = selectedDifficulty === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesSubject && matchesGrade && matchesDifficulty && matchesStatus;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Quiz Center</h1> <p class="text-base-content/60 mt-1">Create and manage educational quizzes</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Create Quiz</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"><div class="flex items-center justify-between"><div><p class="text-blue-100">Total Quizzes</p> <p class="text-2xl font-bold">${escape_html(quizzes.length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-8 h-8 text-blue-200"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"><div class="flex items-center justify-between"><div><p class="text-green-100">Active Quizzes</p> <p class="text-2xl font-bold">${escape_html(quizzes.filter((q) => q.status === "Active").length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-200"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"><div class="flex items-center justify-between"><div><p class="text-purple-100">Total Attempts</p> <p class="text-2xl font-bold">${escape_html(quizzes.reduce((sum, q) => sum + q.attempts, 0))}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:user-group",
      class: "w-8 h-8 text-purple-200"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white"><div class="flex items-center justify-between"><div><p class="text-orange-100">Avg. Score</p> <p class="text-2xl font-bold">${escape_html(quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.averageScore, 0) / quizzes.length) : 0)}%</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chart-bar",
      class: "w-8 h-8 text-orange-200"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="bg-base-100 rounded-xl shadow-lg p-6"><div class="grid grid-cols-1 md:grid-cols-6 gap-4"><div class="md:col-span-2"><label class="label"><span class="label-text">Search Quizzes</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title or subject..." class="input input-bordered w-full"/></div> <div><label class="label"><span class="label-text">Subject</span></label> `);
    $$renderer2.select(
      {
        value: selectedSubject,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Subjects`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(subjects);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let subject = each_array[$$index];
          $$renderer3.option({ value: subject.name }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(subject.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label class="label"><span class="label-text">Grade</span></label> `);
    $$renderer2.select({ value: selectedGrade, class: "select select-bordered w-full" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Grades`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(grades);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let grade = each_array_1[$$index_1];
        $$renderer3.option({ value: grade.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(grade.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div><label class="label"><span class="label-text">Difficulty</span></label> `);
    $$renderer2.select(
      {
        value: selectedDifficulty,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Levels`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(difficulties);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let difficulty = each_array_2[$$index_2];
          $$renderer3.option({ value: difficulty.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(difficulty.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Status`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_3 = ensure_array_like(statuses);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let status = each_array_3[$$index_3];
          $$renderer3.option({ value: status.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="bg-base-100 rounded-xl shadow-lg overflow-hidden"><div class="overflow-x-auto"><table class="table w-full"><thead><tr><th>Quiz Details</th><th>Subject &amp; Grade</th><th>Questions</th><th>Difficulty</th><th>Status</th><th>Performance</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_4 = ensure_array_like(filteredQuizzes);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let quiz = each_array_4[$$index_4];
      $$renderer2.push(`<tr class="hover"><td><div><div class="font-semibold text-base-content">${escape_html(quiz.title)}</div> <div class="text-sm text-base-content/60">Created: ${escape_html(formatDate(quiz.createdDate))}</div></div></td><td><div><div class="font-medium text-base-content">${escape_html(quiz.subject)}</div> <div class="text-sm text-base-content/60">${escape_html(quiz.grade)}</div></div></td><td><div class="text-center"><div class="font-semibold text-base-content">${escape_html(quiz.questions)}</div> <div class="text-sm text-base-content/60">${escape_html(quiz.duration)} min</div></div></td><td><span${attr_class(`badge badge-sm ${stringify(getDifficultyColor(quiz.difficulty))}`)}>${escape_html(quiz.difficulty)}</span></td><td><span${attr_class(`badge badge-sm ${stringify(getStatusColor(quiz.status))}`)}>${escape_html(quiz.status)}</span></td><td><div class="text-center"><div class="font-semibold text-base-content">${escape_html(quiz.attempts)} attempts</div> <div class="text-sm text-base-content/60">`);
      if (quiz.attempts > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`Avg: ${escape_html(quiz.averageScore)}%`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`No attempts yet`);
      }
      $$renderer2.push(`<!--]--></div></div></td><td><div class="dropdown dropdown-left"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "heroicons:ellipsis-vertical", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit Quiz</a></li> <li><a>View Results</a></li> <li><a>Duplicate</a></li> <li><a class="text-error">Delete</a></li></ul></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (filteredQuizzes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:document-text",
        class: "w-16 h-16 text-base-content/20 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content mb-2">No quizzes found</h3> <p class="text-base-content/60">Try adjusting your filters or create a new quiz.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  QuizPage($$renderer);
}
export {
  _page as default
};
