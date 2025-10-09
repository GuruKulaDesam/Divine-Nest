import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, j as attr_style, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function CoursesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredCourses;
    let courses = [
      {
        id: 1,
        title: "Mathematics",
        description: "Advanced mathematics including calculus, algebra, and geometry",
        instructor: "Dr. Rajesh Kumar",
        duration: "6 months",
        level: "Intermediate",
        category: "STEM",
        enrolled: 45,
        maxStudents: 50,
        status: "active",
        startDate: "2024-01-15",
        endDate: "2024-07-15",
        schedule: "Mon, Wed, Fri - 2:00 PM to 4:00 PM"
      },
      {
        id: 2,
        title: "English Literature",
        description: "Comprehensive study of classic and modern English literature",
        instructor: "Prof. Meera Sharma",
        duration: "4 months",
        level: "Beginner",
        category: "Languages",
        enrolled: 32,
        maxStudents: 40,
        status: "active",
        startDate: "2024-02-01",
        endDate: "2024-05-30",
        schedule: "Tue, Thu - 10:00 AM to 12:00 PM"
      },
      {
        id: 3,
        title: "Computer Science Fundamentals",
        description: "Introduction to programming, algorithms, and data structures",
        instructor: "Mr. Arjun Patel",
        duration: "8 months",
        level: "Beginner",
        category: "Technology",
        enrolled: 28,
        maxStudents: 35,
        status: "upcoming",
        startDate: "2024-03-01",
        endDate: "2024-10-30",
        schedule: "Mon, Wed, Sat - 9:00 AM to 11:00 AM"
      }
    ];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedLevel = "all";
    let selectedStatus = "all";
    const categories = [
      { id: "all", name: "All Categories", icon: "mdi:school" },
      { id: "stem", name: "STEM", icon: "mdi:calculator" },
      { id: "languages", name: "Languages", icon: "mdi:translate" },
      { id: "technology", name: "Technology", icon: "mdi:laptop" },
      { id: "arts", name: "Arts", icon: "mdi:palette" },
      { id: "business", name: "Business", icon: "mdi:briefcase" }
    ];
    const levels = [
      { id: "all", name: "All Levels" },
      { id: "beginner", name: "Beginner" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" }
    ];
    const statuses = [
      { id: "all", name: "All Status" },
      { id: "active", name: "Active" },
      { id: "upcoming", name: "Upcoming" },
      { id: "completed", name: "Completed" }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "upcoming":
          return "bg-blue-100 text-blue-800";
        case "completed":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getLevelColor(level) {
      switch (level.toLowerCase()) {
        case "beginner":
          return "bg-emerald-100 text-emerald-800";
        case "intermediate":
          return "bg-amber-100 text-amber-800";
        case "advanced":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    filteredCourses = courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase()) || course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      const matchesLevel = selectedLevel === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Course Management</h1> <p class="text-base-content/70 mt-1">Manage educational courses and enrollments</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Course</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:school", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Courses</div> <div class="stat-value text-primary">${escape_html(courses.length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-success">`);
    Icon($$renderer2, { icon: "mdi:account-check", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active Courses</div> <div class="stat-value text-success">${escape_html(courses.filter((c) => c.status === "active").length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:account-group", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Enrolled</div> <div class="stat-value text-info">${escape_html(courses.reduce((sum, c) => sum + c.enrolled, 0))}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-warning">`);
    Icon($$renderer2, { icon: "mdi:calendar-clock", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Upcoming</div> <div class="stat-value text-warning">${escape_html(courses.filter((c) => c.status === "upcoming").length)}</div></div></div> <div class="bg-base-100 p-6 rounded-lg shadow"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Courses</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title, instructor..." class="input input-bordered"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select({ value: selectedCategory, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(categories);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let category = each_array[$$index];
        $$renderer3.option({ value: category.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(category.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Level</span></label> `);
    $$renderer2.select({ value: selectedLevel, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(levels);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let level = each_array_1[$$index_1];
        $$renderer3.option({ value: level.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(level.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
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
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"><!--[-->`);
    const each_array_3 = ensure_array_like(filteredCourses);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let course = each_array_3[$$index_3];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><h3 class="card-title text-lg">${escape_html(course.title)}</h3> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a>View Details</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <p class="text-base-content/70 text-sm mb-4 line-clamp-2">${escape_html(course.description)}</p> <div class="space-y-2 mb-4"><div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, {
        icon: "mdi:account-tie",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span class="text-base-content/80">${escape_html(course.instructor)}</span></div> <div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, {
        icon: "mdi:clock-outline",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span class="text-base-content/80">${escape_html(course.duration)}</span></div> <div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, { icon: "mdi:calendar", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-base-content/80">${escape_html(course.schedule)}</span></div></div> <div class="flex flex-wrap gap-2 mb-4"><span${attr_class(`badge ${stringify(getLevelColor(course.level))} badge-sm`)}>${escape_html(course.level)}</span> <span class="badge badge-outline badge-sm">${escape_html(course.category)}</span> <span${attr_class(`badge ${stringify(getStatusColor(course.status))} badge-sm`)}>${escape_html(course.status)}</span></div> <div class="flex justify-between items-center text-sm mb-4"><span class="text-base-content/60">Enrolled: ${escape_html(course.enrolled)}/${escape_html(course.maxStudents)}</span> <div class="w-20 bg-base-200 rounded-full h-2"><div class="bg-primary h-2 rounded-full"${attr_style(`width: ${stringify(course.enrolled / course.maxStudents * 100)}%`)}></div></div></div> <div class="card-actions justify-end"><button class="btn btn-primary btn-sm">`);
      Icon($$renderer2, { icon: "mdi:eye", class: "w-4 h-4" });
      $$renderer2.push(`<!----> View Details</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredCourses.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:school-off",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No courses found</h3> <p class="text-base-content/50">Try adjusting your search or filter criteria</p></div>`);
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
  CoursesPage($$renderer);
}
export {
  _page as default
};
