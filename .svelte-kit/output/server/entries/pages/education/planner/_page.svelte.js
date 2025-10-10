import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, j as attr_style, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function PlannerPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredPlanners;
    let planners = [
      {
        id: 1,
        title: "Weekly Study Plan",
        description: "Structured weekly study schedule for CBSE Class 10",
        type: "study",
        grade: "10",
        subject: "All Subjects",
        duration: "7 days",
        status: "active",
        createdDate: "2024-01-15",
        lastUpdated: "2024-02-20",
        progress: 75
      },
      {
        id: 2,
        title: "Monthly Budget Planner",
        description: "Family budget planning for February 2024",
        type: "budget",
        grade: "N/A",
        subject: "Finance",
        duration: "30 days",
        status: "active",
        createdDate: "2024-02-01",
        lastUpdated: "2024-02-15",
        progress: 45
      },
      {
        id: 3,
        title: "Home Maintenance Schedule",
        description: "Quarterly maintenance tasks for the household",
        type: "maintenance",
        grade: "N/A",
        subject: "Home",
        duration: "90 days",
        status: "draft",
        createdDate: "2024-01-20",
        lastUpdated: "2024-02-10",
        progress: 20
      }
    ];
    let searchQuery = "";
    let selectedType = "all";
    let selectedStatus = "all";
    const plannerTypes = [
      { id: "all", name: "All Types" },
      { id: "study", name: "Study Plan" },
      { id: "budget", name: "Budget Plan" },
      { id: "maintenance", name: "Maintenance Plan" },
      { id: "meal", name: "Meal Plan" },
      { id: "fitness", name: "Fitness Plan" },
      { id: "event", name: "Event Plan" }
    ];
    const statuses = [
      { id: "all", name: "All Status" },
      { id: "active", name: "Active" },
      { id: "draft", name: "Draft" },
      { id: "completed", name: "Completed" },
      { id: "archived", name: "Archived" }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "draft":
          return "bg-yellow-100 text-yellow-800";
        case "completed":
          return "bg-blue-100 text-blue-800";
        case "archived":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getTypeColor(type) {
      switch (type) {
        case "study":
          return "bg-purple-100 text-purple-800";
        case "budget":
          return "bg-green-100 text-green-800";
        case "maintenance":
          return "bg-orange-100 text-orange-800";
        case "meal":
          return "bg-pink-100 text-pink-800";
        case "fitness":
          return "bg-red-100 text-red-800";
        case "event":
          return "bg-indigo-100 text-indigo-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getProgressColor(progress) {
      if (progress >= 80) return "bg-green-500";
      if (progress >= 60) return "bg-yellow-500";
      if (progress >= 40) return "bg-orange-500";
      return "bg-red-500";
    }
    filteredPlanners = planners.filter((planner) => {
      const matchesSearch = planner.title.toLowerCase().includes(searchQuery.toLowerCase()) || planner.description.toLowerCase().includes(searchQuery.toLowerCase()) || planner.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesType && matchesStatus;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Planner Management</h1> <p class="text-base-content/70 mt-1">Create and manage various planning schedules and timelines</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:calendar-plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Create Planner</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:calendar-text", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Planners</div> <div class="stat-value text-primary">${escape_html(planners.length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-success">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active Planners</div> <div class="stat-value text-success">${escape_html(planners.filter((p) => p.status === "active").length)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:progress-check", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Avg Progress</div> <div class="stat-value text-info">${escape_html(Math.round(planners.reduce((sum, p) => sum + p.progress, 0) / planners.length))}%</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-warning">`);
    Icon($$renderer2, { icon: "mdi:calendar-clock", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">This Week</div> <div class="stat-value text-warning">${escape_html(planners.filter((p) => p.duration.includes("7")).length)}</div></div></div> <div class="bg-base-100 p-6 rounded-lg shadow"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Planners</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title, subject..." class="input input-bordered"/></div> <div class="form-control"><label class="label"><span class="label-text">Planner Type</span></label> `);
    $$renderer2.select({ value: selectedType, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(plannerTypes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let type = each_array[$$index];
        $$renderer3.option({ value: type.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(type.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select({ value: selectedStatus, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(statuses);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let status = each_array_1[$$index_1];
        $$renderer3.option({ value: status.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(status.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredPlanners);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let planner = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><h3 class="card-title text-lg">${escape_html(planner.title)}</h3> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a>View Details</a></li> <li><a>Duplicate</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <p class="text-base-content/70 text-sm mb-4 line-clamp-2">${escape_html(planner.description)}</p> <div class="space-y-2 mb-4"><div class="flex items-center gap-2 text-sm">`);
      Icon($$renderer2, { icon: "mdi:calendar", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-base-content/80">Duration: ${escape_html(planner.duration)}</span></div> `);
      if (planner.grade !== "N/A") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2 text-sm">`);
        Icon($$renderer2, { icon: "mdi:school", class: "w-4 h-4 text-base-content/60" });
        $$renderer2.push(`<!----> <span class="text-base-content/80">Grade ${escape_html(planner.grade)} • ${escape_html(planner.subject)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="flex items-center gap-2 text-sm">`);
        Icon($$renderer2, { icon: "mdi:tag", class: "w-4 h-4 text-base-content/60" });
        $$renderer2.push(`<!----> <span class="text-base-content/80">${escape_html(planner.subject)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mb-4"><div class="flex justify-between text-sm mb-1"><span class="text-base-content/70">Progress</span> <span class="text-base-content/80">${escape_html(planner.progress)}%</span></div> <div class="w-full bg-base-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all duration-300 ${stringify(getProgressColor(planner.progress))}`)}${attr_style(`width: ${stringify(planner.progress)}%`)}></div></div></div> <div class="flex flex-wrap gap-2 mb-4"><span${attr_class(`badge ${stringify(getTypeColor(planner.type))} badge-sm`)}>${escape_html(planner.type)}</span> <span${attr_class(`badge ${stringify(getStatusColor(planner.status))} badge-sm`)}>${escape_html(planner.status)}</span></div> <div class="text-xs text-base-content/60 mb-4">Last updated: ${escape_html(planner.lastUpdated)}</div> <div class="card-actions justify-end"><button class="btn btn-primary btn-sm">`);
      Icon($$renderer2, { icon: "mdi:eye", class: "w-4 h-4" });
      $$renderer2.push(`<!----> View Plan</button> <button class="btn btn-outline btn-sm">`);
      Icon($$renderer2, { icon: "mdi:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----> Edit</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredPlanners.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:calendar-text-outline",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No planners found</h3> <p class="text-base-content/50">Try adjusting your search or filter criteria</p></div>`);
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
  PlannerPage($$renderer);
}
export {
  _page as default
};
