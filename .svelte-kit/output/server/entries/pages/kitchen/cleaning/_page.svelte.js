import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function CleaningPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredTasks, stats;
    let cleaningTasks = [
      {
        id: 1,
        title: "Kitchen Deep Clean",
        category: "kitchen",
        frequency: "weekly",
        priority: "high",
        status: "pending",
        assignedTo: "Mom",
        dueDate: "2024-01-15",
        estimatedTime: "2 hours",
        description: "Deep cleaning of kitchen including appliances, cabinets, and floors"
      },
      {
        id: 2,
        title: "Bathroom Cleaning",
        category: "bathroom",
        frequency: "daily",
        priority: "medium",
        status: "completed",
        assignedTo: "Dad",
        dueDate: "2024-01-14",
        estimatedTime: "30 minutes",
        description: "Regular bathroom cleaning and sanitization"
      },
      {
        id: 3,
        title: "Living Room Dusting",
        category: "living",
        frequency: "weekly",
        priority: "low",
        status: "in-progress",
        assignedTo: "Sister",
        dueDate: "2024-01-16",
        estimatedTime: "45 minutes",
        description: "Dust furniture, clean surfaces, and vacuum carpets"
      }
    ];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    let selectedPriority = "all";
    const categories = [
      { id: "kitchen", name: "Kitchen", icon: "mdi:chef-hat" },
      { id: "bathroom", name: "Bathroom", icon: "mdi:shower" },
      { id: "living", name: "Living Room", icon: "mdi:sofa" },
      { id: "bedroom", name: "Bedroom", icon: "mdi:bed" },
      { id: "garden", name: "Garden", icon: "mdi:flower" },
      { id: "general", name: "General", icon: "mdi:broom" }
    ];
    const priorities = ["low", "medium", "high", "urgent"];
    const statuses = ["pending", "in-progress", "completed", "overdue"];
    function getStatusColor(status) {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-800";
        case "in-progress":
          return "bg-blue-100 text-blue-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "overdue":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getPriorityColor(priority) {
      switch (priority) {
        case "urgent":
          return "bg-red-100 text-red-800";
        case "high":
          return "bg-orange-100 text-orange-800";
        case "medium":
          return "bg-yellow-100 text-yellow-800";
        case "low":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getCategoryIcon(categoryId) {
      const category = categories.find((c) => c.id === categoryId);
      return category ? category.icon : "mdi:broom";
    }
    filteredTasks = cleaningTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      const matchesStatus = selectedStatus === "all";
      const matchesPriority = selectedPriority === "all";
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
    stats = {
      total: cleaningTasks.length,
      pending: cleaningTasks.filter((t) => t.status === "pending").length,
      inProgress: cleaningTasks.filter((t) => t.status === "in-progress").length,
      completed: cleaningTasks.filter((t) => t.status === "completed").length,
      overdue: cleaningTasks.filter((t) => t.status === "overdue").length
    };
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h1 class="text-3xl font-bold text-base-content">Cleaning Management</h1> <p class="text-base-content/60 mt-1">Keep your home clean and organized</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Cleaning Task</button></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:broom", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Tasks</div> <div class="stat-value text-primary">${escape_html(stats.total)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-yellow-500">`);
    Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Pending</div> <div class="stat-value text-yellow-500">${escape_html(stats.pending)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-blue-500">`);
    Icon($$renderer2, { icon: "mdi:progress-clock", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">In Progress</div> <div class="stat-value text-blue-500">${escape_html(stats.inProgress)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-green-500">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Completed</div> <div class="stat-value text-green-500">${escape_html(stats.completed)}</div></div></div> <div class="bg-base-100 rounded-lg p-6 shadow"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Tasks</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title or description..." class="input input-bordered"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select({ value: selectedCategory, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Categories`);
      });
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
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select({ value: selectedStatus, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Status`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(statuses);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let status = each_array_1[$$index_1];
        $$renderer3.option({ value: status }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(status.charAt(0).toUpperCase() + status.slice(1))}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Priority</span></label> `);
    $$renderer2.select({ value: selectedPriority, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Priorities`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(priorities);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let priority = each_array_2[$$index_2];
        $$renderer3.option({ value: priority }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(priority.charAt(0).toUpperCase() + priority.slice(1))}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div></div></div> <div class="bg-base-100 rounded-lg shadow overflow-hidden"><div class="overflow-x-auto"><table class="table w-full"><thead><tr><th>Task</th><th>Category</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Due Date</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_3 = ensure_array_like(filteredTasks);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let task = each_array_3[$$index_3];
      $$renderer2.push(`<tr class="hover"><td><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: getCategoryIcon(task.category),
        class: "w-5 h-5 text-primary"
      });
      $$renderer2.push(`<!----> <div><div class="font-bold">${escape_html(task.title)}</div> <div class="text-sm opacity-70">${escape_html(task.description)}</div></div></div></td><td><div class="badge badge-ghost">${escape_html(categories.find((c) => c.id === task.category)?.name || task.category)}</div></td><td><div${attr_class(`badge ${stringify(getPriorityColor(task.priority))}`)}>${escape_html(task.priority)}</div></td><td><div${attr_class(`badge ${stringify(getStatusColor(task.status))}`)}>${escape_html(task.status)}</div></td><td>${escape_html(task.assignedTo)}</td><td>${escape_html(task.dueDate)}</td><td><div class="dropdown dropdown-left"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> `);
      if (task.status !== "completed") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li><a>Mark Complete</a></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <li><a class="text-error">Delete</a></li></ul></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (filteredTasks.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8">`);
      Icon($$renderer2, {
        icon: "mdi:broom",
        class: "w-16 h-16 text-base-content/20 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <p class="text-base-content/60">No cleaning tasks found</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  CleaningPage($$renderer);
}
export {
  _page as default
};
