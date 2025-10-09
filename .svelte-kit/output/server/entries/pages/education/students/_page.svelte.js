import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function StudentsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredStudents;
    let students = [
      {
        id: 1,
        name: "Arjun Kumar",
        grade: "10th",
        section: "A",
        rollNumber: "101",
        email: "arjun.kumar@example.com",
        phone: "+91-98765-43210",
        address: "123 Main Street, Chennai",
        dateOfBirth: "2008-05-15",
        gender: "Male",
        parentName: "Rajesh Kumar",
        parentPhone: "+91-98765-43211",
        status: "Active",
        attendance: 95,
        subjects: [
          "Mathematics",
          "Science",
          "English",
          "Social Studies",
          "Tamil"
        ],
        achievements: ["Science Fair Winner", "Math Olympiad Bronze"],
        notes: "Excellent in mathematics and science subjects."
      },
      {
        id: 2,
        name: "Priya Sharma",
        grade: "9th",
        section: "B",
        rollNumber: "205",
        email: "priya.sharma@example.com",
        phone: "+91-98765-43212",
        address: "456 Park Avenue, Coimbatore",
        dateOfBirth: "2009-03-22",
        gender: "Female",
        parentName: "Vijay Sharma",
        parentPhone: "+91-98765-43213",
        status: "Active",
        attendance: 98,
        subjects: [
          "Mathematics",
          "Science",
          "English",
          "Social Studies",
          "Tamil"
        ],
        achievements: ["Debate Competition Winner"],
        notes: "Active participant in extracurricular activities."
      },
      {
        id: 3,
        name: "Karthik Rajan",
        grade: "11th",
        section: "A",
        rollNumber: "301",
        email: "karthik.rajan@example.com",
        phone: "+91-98765-43214",
        address: "789 Temple Road, Madurai",
        dateOfBirth: "2007-08-10",
        gender: "Male",
        parentName: "Suresh Rajan",
        parentPhone: "+91-98765-43215",
        status: "Active",
        attendance: 92,
        subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
        achievements: ["Sports Champion", "Quiz Winner"],
        notes: "Captain of the school cricket team."
      }
    ];
    let searchQuery = "";
    let selectedGrade = "all";
    let selectedSection = "all";
    let selectedStatus = "all";
    let grades = ["6th", "7th", "8th", "9th", "10th", "11th", "12th"];
    let sections = ["A", "B", "C", "D"];
    let statuses = ["Active", "Inactive", "Transferred"];
    function getStatusColor(status) {
      switch (status) {
        case "Active":
          return "bg-green-100 text-green-800";
        case "Inactive":
          return "bg-red-100 text-red-800";
        case "Transferred":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getAttendanceColor(attendance) {
      if (attendance >= 95) return "text-green-600";
      if (attendance >= 85) return "text-yellow-600";
      return "text-red-600";
    }
    filteredStudents = students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.rollNumber.includes(searchQuery) || student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGrade = selectedGrade === "all";
      const matchesSection = selectedSection === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesGrade && matchesSection && matchesStatus;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Students Management</h1> <p class="text-base-content/70 mt-1">Manage student information, attendance, and academic records</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Student</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:school", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Students</div> <div class="stat-value text-primary">${escape_html(students.length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-green-600">`);
    Icon($$renderer2, { icon: "mdi:account-check", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active Students</div> <div class="stat-value text-green-600">${escape_html(students.filter((s) => s.status === "Active").length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-blue-600">`);
    Icon($$renderer2, { icon: "mdi:calendar-check", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Avg Attendance</div> <div class="stat-value text-blue-600">${escape_html(Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length))}%</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-purple-600">`);
    Icon($$renderer2, { icon: "mdi:trophy", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Achievements</div> <div class="stat-value text-purple-600">${escape_html(students.reduce((sum, s) => sum + s.achievements.length, 0))}</div></div></div> <div class="bg-base-100 rounded-lg p-6 shadow"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="label"><span class="label-text">Search Students</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Name, roll number, or email..." class="input input-bordered w-full"/></div> <div><label class="label"><span class="label-text">Grade</span></label> `);
    $$renderer2.select({ value: selectedGrade, class: "select select-bordered w-full" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Grades`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(grades);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let grade = each_array[$$index];
        $$renderer3.option({ value: grade }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(grade)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div><label class="label"><span class="label-text">Section</span></label> `);
    $$renderer2.select(
      {
        value: selectedSection,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Sections`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(sections);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let section = each_array_1[$$index_1];
          $$renderer3.option({ value: section }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(section)}`);
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
        const each_array_2 = ensure_array_like(statuses);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let status = each_array_2[$$index_2];
          $$renderer3.option({ value: status }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="bg-base-100 rounded-lg shadow overflow-hidden"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Student Info</th><th>Academic Details</th><th>Contact</th><th>Attendance</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_3 = ensure_array_like(filteredStudents);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let student = each_array_3[$$index_3];
      $$renderer2.push(`<tr><td><div class="flex items-center space-x-3"><div class="avatar placeholder"><div class="bg-neutral-focus text-neutral-content rounded-full w-10"><span class="text-sm">${escape_html(student.name.split(" ").map((n) => n[0]).join(""))}</span></div></div> <div><div class="font-bold">${escape_html(student.name)}</div> <div class="text-sm opacity-50">Roll: ${escape_html(student.rollNumber)}</div></div></div></td><td><div class="text-sm"><div class="font-semibold">${escape_html(student.grade)} - ${escape_html(student.section)}</div> <div class="opacity-70">${escape_html(student.subjects.slice(0, 3).join(", "))}${escape_html(student.subjects.length > 3 ? "..." : "")}</div></div></td><td><div class="text-sm"><div>${escape_html(student.email)}</div> <div class="opacity-70">${escape_html(student.phone)}</div></div></td><td><span${attr_class(`font-semibold ${stringify(getAttendanceColor(student.attendance))}`)}>${escape_html(student.attendance)}%</span></td><td><span${attr_class(`badge ${stringify(getStatusColor(student.status))}`)}>${escape_html(student.status)}</span></td><td><div class="dropdown dropdown-left"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit Student</a></li> <li><a>View Details</a></li> <li><a>View Achievements</a></li> <li><a class="text-error">Delete</a></li></ul></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  StudentsPage($$renderer);
}
export {
  _page as default
};
