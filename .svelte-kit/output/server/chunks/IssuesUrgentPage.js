import { b as attr_class, a as ensure_array_like, s as stringify, d as attr } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function IssuesUrgentPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats;
    let urgentTasks = [
      {
        id: 1,
        title: "Complete School Admission Forms",
        category: "Education",
        priority: "urgent",
        deadline: "2025-10-08",
        assignedTo: "Appa",
        status: "in-progress",
        description: "Submit admission forms for Akka's college application",
        timeLeft: "2 days",
        progress: 75
      },
      {
        id: 2,
        title: "Renew Vehicle Insurance",
        category: "Legal",
        priority: "urgent",
        deadline: "2025-10-07",
        assignedTo: "Amma",
        status: "pending",
        description: "Car insurance expires tomorrow, need immediate renewal",
        timeLeft: "1 day",
        progress: 0
      },
      {
        id: 3,
        title: "Doctor Appointment for Paati",
        category: "Health",
        priority: "high",
        deadline: "2025-10-09",
        assignedTo: "Amma",
        status: "scheduled",
        description: "Regular checkup and medication review",
        timeLeft: "3 days",
        progress: 50
      },
      {
        id: 4,
        title: "Property Tax Payment",
        category: "Financial",
        priority: "urgent",
        deadline: "2025-10-10",
        assignedTo: "Appa",
        status: "pending",
        description: "Annual property tax due, avoid late fees",
        timeLeft: "4 days",
        progress: 0
      },
      {
        id: 5,
        title: "Festival Shopping List",
        category: "Cultural",
        priority: "high",
        deadline: "2025-10-12",
        assignedTo: "Amma",
        status: "in-progress",
        description: "Prepare for upcoming Diwali celebrations",
        timeLeft: "6 days",
        progress: 30
      }
    ];
    function getPriorityColor(priority) {
      switch (priority) {
        case "urgent":
          return "text-red-600 bg-red-50 border-red-200";
        case "high":
          return "text-orange-600 bg-orange-50 border-orange-200";
        case "medium":
          return "text-yellow-600 bg-yellow-50 border-yellow-200";
        default:
          return "text-green-600 bg-green-50 border-green-200";
      }
    }
    function getStatusColor(status) {
      switch (status) {
        case "pending":
          return "text-red-600 bg-red-50";
        case "in-progress":
          return "text-blue-600 bg-blue-50";
        case "scheduled":
          return "text-purple-600 bg-purple-50";
        case "completed":
          return "text-green-600 bg-green-50";
        default:
          return "text-gray-600 bg-gray-50";
      }
    }
    function getCategoryIcon(category) {
      switch (category) {
        case "Education":
          return "heroicons:academic-cap";
        case "Legal":
          return "heroicons:scale";
        case "Health":
          return "heroicons:heart";
        case "Financial":
          return "heroicons:banknotes";
        case "Cultural":
          return "heroicons:gift";
        case "Household":
          return "heroicons:home";
        default:
          return "heroicons:clipboard-document-list";
      }
    }
    stats = {
      total: urgentTasks.length,
      overdue: urgentTasks.filter((t) => t.timeLeft === "Overdue").length,
      today: urgentTasks.filter((t) => t.timeLeft === "Due today").length,
      pending: urgentTasks.filter((t) => t.status === "pending").length,
      inProgress: urgentTasks.filter((t) => t.status === "in-progress").length
    };
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">⚡ Urgent Tasks</h1> <p class="text-base-content/60">Time-sensitive tasks that need immediate attention</p></div> <button class="btn btn-error">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Add Urgent Task</button></div></div> `);
    if (stats.overdue > 0 || stats.today > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert alert-error mb-6">`);
      Icon($$renderer2, { icon: "heroicons:exclamation-triangle", class: "w-6 h-6" });
      $$renderer2.push(`<!----> <div><h3 class="font-bold">Critical Tasks Alert</h3> <div class="text-sm">`);
      if (stats.overdue > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html(stats.overdue)} tasks are overdue`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (stats.overdue > 0 && stats.today > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`and`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (stats.today > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html(stats.today)} tasks are due today`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Active Tasks</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.total)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Overdue</p> <p class="text-2xl font-bold text-red-500">${escape_html(stats.overdue)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-red-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Due Today</p> <p class="text-2xl font-bold text-orange-500">${escape_html(stats.today)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-orange-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Pending</p> <p class="text-2xl font-bold text-yellow-500">${escape_html(stats.pending)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:pause", class: "w-8 h-8 text-yellow-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">In Progress</p> <p class="text-2xl font-bold text-purple-500">${escape_html(stats.inProgress)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:arrow-path",
      class: "w-8 h-8 text-purple-500"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Active Tasks</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Completed</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-4"><!--[-->`);
      const each_array = ensure_array_like(urgentTasks.sort((a, b) => {
        if (a.timeLeft === "Overdue" && b.timeLeft !== "Overdue") return -1;
        if (b.timeLeft === "Overdue" && a.timeLeft !== "Overdue") return 1;
        if (a.timeLeft === "Due today" && b.timeLeft !== "Due today") return -1;
        if (b.timeLeft === "Due today" && a.timeLeft !== "Due today") return 1;
        return new Date(a.deadline) - new Date(b.deadline);
      }));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let task = each_array[$$index];
        $$renderer2.push(`<div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center space-x-3 mb-2">`);
        Icon($$renderer2, {
          icon: getCategoryIcon(task.category),
          class: "w-6 h-6 text-primary"
        });
        $$renderer2.push(`<!----> <h4 class="font-bold text-base-content">${escape_html(task.title)}</h4> <span${attr_class(`badge ${stringify(getPriorityColor(task.priority))} badge-sm`)}>${escape_html(task.priority)}</span> <span${attr_class(`badge ${stringify(getStatusColor(task.status))} badge-sm`)}>${escape_html(task.status)}</span></div> <p class="text-base-content/80 mb-3">${escape_html(task.description)}</p> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3"><div><span class="text-base-content/60">Deadline:</span> <p class="font-medium">${escape_html(task.deadline)}</p></div> <div><span class="text-base-content/60">Time Left:</span> <p class="font-medium text-red-600">${escape_html(task.timeLeft)}</p></div> <div><span class="text-base-content/60">Assigned to:</span> <p class="font-medium">${escape_html(task.assignedTo)}</p></div> <div><span class="text-base-content/60">Category:</span> <p class="font-medium">${escape_html(task.category)}</p></div></div> `);
        if (task.progress > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mt-3"><div class="flex items-center justify-between text-sm mb-1"><span>Progress</span> <span>${escape_html(task.progress)}%</span></div> <progress class="progress progress-primary w-full"${attr("value", task.progress)} max="100"></progress></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="flex flex-col space-y-2 ml-4"><button class="btn btn-sm btn-success">`);
        Icon($$renderer2, { icon: "heroicons:check", class: "w-4 h-4" });
        $$renderer2.push(`<!----> Complete</button> <div class="dropdown dropdown-end"><label tabindex="0" class="btn btn-sm btn-outline">`);
        Icon($$renderer2, { icon: "heroicons:ellipsis-vertical", class: "w-4 h-4" });
        $$renderer2.push(`<!----></label> <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><button>Set 25% Complete</button></li> <li><button>Set 50% Complete</button></li> <li><button>Set 75% Complete</button></li></ul></div></div></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  IssuesUrgentPage as default
};
