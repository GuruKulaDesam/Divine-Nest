import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function CurriculumPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredCurricula;
    let curricula = [
      {
        id: 1,
        title: "CBSE Class 10 Mathematics",
        description: "Complete mathematics curriculum for CBSE Class 10 students",
        grade: "10",
        subject: "Mathematics",
        board: "CBSE",
        academicYear: "2024-2025",
        totalChapters: 15,
        totalHours: 120,
        status: "active",
        createdDate: "2024-01-15",
        lastUpdated: "2024-02-20"
      },
      {
        id: 2,
        title: "CBSE Class 10 Science",
        description: "Comprehensive science curriculum covering Physics, Chemistry, and Biology",
        grade: "10",
        subject: "Science",
        board: "CBSE",
        academicYear: "2024-2025",
        totalChapters: 18,
        totalHours: 140,
        status: "active",
        createdDate: "2024-01-16",
        lastUpdated: "2024-02-18"
      },
      {
        id: 3,
        title: "ICSE Class 9 English",
        description: "English language and literature curriculum for ICSE Class 9",
        grade: "9",
        subject: "English",
        board: "ICSE",
        academicYear: "2024-2025",
        totalChapters: 12,
        totalHours: 90,
        status: "draft",
        createdDate: "2024-02-01",
        lastUpdated: "2024-02-15"
      }
    ];
    let searchQuery = "";
    let selectedBoard = "all";
    let selectedGrade = "all";
    let selectedSubject = "all";
    let selectedStatus = "all";
    const boards = [
      { id: "all", name: "All Boards" },
      { id: "cbse", name: "CBSE" },
      { id: "icse", name: "ICSE" },
      { id: "state", name: "State Board" },
      { id: "ib", name: "IB" }
    ];
    const grades = [
      { id: "all", name: "All Grades" },
      { id: "6", name: "Grade 6" },
      { id: "7", name: "Grade 7" },
      { id: "8", name: "Grade 8" },
      { id: "9", name: "Grade 9" },
      { id: "10", name: "Grade 10" },
      { id: "11", name: "Grade 11" },
      { id: "12", name: "Grade 12" }
    ];
    const subjects = [
      { id: "all", name: "All Subjects" },
      { id: "mathematics", name: "Mathematics" },
      { id: "science", name: "Science" },
      { id: "english", name: "English" },
      { id: "social-studies", name: "Social Studies" },
      { id: "hindi", name: "Hindi" },
      { id: "computer-science", name: "Computer Science" }
    ];
    const statuses = [
      { id: "all", name: "All Status" },
      { id: "active", name: "Active" },
      { id: "draft", name: "Draft" },
      { id: "archived", name: "Archived" }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "draft":
          return "bg-yellow-100 text-yellow-800";
        case "archived":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getBoardColor(board) {
      switch (board.toLowerCase()) {
        case "cbse":
          return "bg-blue-100 text-blue-800";
        case "icse":
          return "bg-purple-100 text-purple-800";
        case "state":
          return "bg-green-100 text-green-800";
        case "ib":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    filteredCurricula = curricula.filter((curriculum) => {
      const matchesSearch = curriculum.title.toLowerCase().includes(searchQuery.toLowerCase()) || curriculum.description.toLowerCase().includes(searchQuery.toLowerCase()) || curriculum.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBoard = selectedBoard === "all";
      const matchesGrade = selectedGrade === "all";
      const matchesSubject = selectedSubject === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesBoard && matchesGrade && matchesSubject && matchesStatus;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Curriculum Management</h1> <p class="text-base-content/70 mt-1">Manage educational curricula and course structures</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Curriculum</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:book-open-page-variant", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Curricula</div> <div class="stat-value text-primary">${escape_html(curricula.length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-success">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active Curricula</div> <div class="stat-value text-success">${escape_html(curricula.filter((c) => c.status === "active").length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:file-document", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Chapters</div> <div class="stat-value text-info">${escape_html(curricula.reduce((sum, c) => sum + c.totalChapters, 0))}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-warning">`);
    Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Hours</div> <div class="stat-value text-warning">${escape_html(curricula.reduce((sum, c) => sum + c.totalHours, 0))}</div></div></div> <div class="bg-base-100 p-6 rounded-lg shadow"><div class="grid grid-cols-1 md:grid-cols-5 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Curricula</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title, subject..." class="input input-bordered"/></div> <div class="form-control"><label class="label"><span class="label-text">Board</span></label> `);
    $$renderer2.select({ value: selectedBoard, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(boards);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let board = each_array[$$index];
        $$renderer3.option({ value: board.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(board.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Grade</span></label> `);
    $$renderer2.select({ value: selectedGrade, class: "select select-bordered" }, ($$renderer3) => {
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
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Subject</span></label> `);
    $$renderer2.select({ value: selectedSubject, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(subjects);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let subject = each_array_2[$$index_2];
        $$renderer3.option({ value: subject.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(subject.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select({ value: selectedStatus, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_3 = ensure_array_like(statuses);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let status = each_array_3[$$index_3];
        $$renderer3.option({ value: status.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(status.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"><!--[-->`);
    const each_array_4 = ensure_array_like(filteredCurricula);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let curriculum = each_array_4[$$index_4];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><h3 class="card-title text-lg">${escape_html(curriculum.title)}</h3> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a>View Details</a></li> <li><a>Manage Chapters</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <p class="text-base-content/70 text-sm mb-4 line-clamp-2">${escape_html(curriculum.description)}</p> <div class="space-y-2 mb-4"><div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, { icon: "mdi:school", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-base-content/80">Grade ${escape_html(curriculum.grade)} • ${escape_html(curriculum.subject)}</span></div> <div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, { icon: "mdi:calendar", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-base-content/80">${escape_html(curriculum.academicYear)}</span></div> <div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, { icon: "mdi:book-open", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-base-content/80">${escape_html(curriculum.totalChapters)} chapters • ${escape_html(curriculum.totalHours)} hours</span></div></div> <div class="flex flex-wrap gap-2 mb-4"><span${attr_class(`badge ${stringify(getBoardColor(curriculum.board))} badge-sm`)}>${escape_html(curriculum.board)}</span> <span class="badge badge-outline badge-sm">Grade ${escape_html(curriculum.grade)}</span> <span${attr_class(`badge ${stringify(getStatusColor(curriculum.status))} badge-sm`)}>${escape_html(curriculum.status)}</span></div> <div class="text-xs text-base-content/60 mb-4">Last updated: ${escape_html(curriculum.lastUpdated)}</div> <div class="card-actions justify-end"><button class="btn btn-primary btn-sm">`);
      Icon($$renderer2, { icon: "mdi:eye", class: "w-4 h-4" });
      $$renderer2.push(`<!----> View Details</button> <button class="btn btn-outline btn-sm">`);
      Icon($$renderer2, { icon: "mdi:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Edit</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredCurricula.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:book-open-page-variant-off",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No curricula found</h3> <p class="text-base-content/50">Try adjusting your search or filter criteria</p></div>`);
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
  CurriculumPage($$renderer);
}
export {
  _page as default
};
