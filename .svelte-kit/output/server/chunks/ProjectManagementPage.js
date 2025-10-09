import { c as store_get, u as unsubscribe_stores, d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { D as DeleteConfirmationModal } from "./DeleteConfirmationModal.js";
import { e as escape_html } from "./context.js";
function ProjectManagementPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let projectStatuses, filteredProjects;
    let projects = {
      "on-planning": [
        {
          id: "p1",
          title: "Design System Implementation",
          description: "Create and implement a comprehensive design system for the application",
          priority: "high",
          assignee: "Sarah Johnson",
          dueDate: "2024-02-15",
          tags: ["Design", "UI/UX"]
        },
        {
          id: "p2",
          title: "Database Schema Design",
          description: "Design the database schema for the new features",
          priority: "medium",
          assignee: "Mike Chen",
          dueDate: "2024-02-20",
          tags: ["Backend", "Database"]
        }
      ],
      "todo": [
        {
          id: "p3",
          title: "User Authentication System",
          description: "Implement secure user authentication with JWT tokens",
          priority: "high",
          assignee: "Alex Rodriguez",
          dueDate: "2024-02-25",
          tags: ["Security", "Backend"]
        }
      ],
      "on-progress": [
        {
          id: "p4",
          title: "API Development",
          description: "Develop RESTful APIs for the main features",
          priority: "high",
          assignee: "Emily Davis",
          dueDate: "2024-03-01",
          tags: ["API", "Backend"]
        }
      ],
      "in-review": [
        {
          id: "p5",
          title: "Frontend Components",
          description: "Review and approve the new React components",
          priority: "medium",
          assignee: "David Wilson",
          dueDate: "2024-02-28",
          tags: ["Frontend", "Review"]
        }
      ],
      "testing": [
        {
          id: "p6",
          title: "Integration Testing",
          description: "Perform comprehensive integration testing",
          priority: "high",
          assignee: "Lisa Brown",
          dueDate: "2024-03-05",
          tags: ["Testing", "QA"]
        }
      ],
      "completed": [
        {
          id: "p7",
          title: "Project Setup",
          description: "Initial project setup and configuration",
          priority: "low",
          assignee: "Tom Anderson",
          dueDate: "2024-02-10",
          tags: ["Setup", "Configuration"]
        }
      ]
    };
    let searchQuery = "";
    let showDeleteModal = false;
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-800";
        case "medium":
          return "bg-yellow-100 text-yellow-800";
        case "low":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getPriorityText(priority) {
      switch (priority) {
        case "high":
          return store_get($$store_subs ??= {}, "$_", $format)("projects.high");
        case "medium":
          return store_get($$store_subs ??= {}, "$_", $format)("projects.medium");
        case "low":
          return store_get($$store_subs ??= {}, "$_", $format)("projects.low");
        default:
          return priority;
      }
    }
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString();
    }
    projectStatuses = [
      {
        id: "on-planning",
        name: store_get($$store_subs ??= {}, "$_", $format)("projects.on_planning"),
        color: "bg-gray-500",
        textColor: "text-gray-700"
      },
      {
        id: "todo",
        name: store_get($$store_subs ??= {}, "$_", $format)("projects.todo"),
        color: "bg-blue-500",
        textColor: "text-blue-700"
      },
      {
        id: "on-progress",
        name: store_get($$store_subs ??= {}, "$_", $format)("projects.on_progress"),
        color: "bg-yellow-500",
        textColor: "text-yellow-700"
      },
      {
        id: "in-review",
        name: store_get($$store_subs ??= {}, "$_", $format)("projects.in_review"),
        color: "bg-purple-500",
        textColor: "text-purple-700"
      },
      {
        id: "testing",
        name: store_get($$store_subs ??= {}, "$_", $format)("projects.testing"),
        color: "bg-orange-500",
        textColor: "text-orange-700"
      },
      {
        id: "completed",
        name: store_get($$store_subs ??= {}, "$_", $format)("projects.completed"),
        color: "bg-green-500",
        textColor: "text-green-700"
      }
    ];
    filteredProjects = Object.keys(projects).reduce(
      (acc, status) => {
        acc[status] = projects[status].filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase()) || project.assignee.toLowerCase().includes(searchQuery.toLowerCase()));
        return acc;
      },
      {}
    );
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-6"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
      Icon($$renderer3, {
        icon: "heroicons:clipboard-document-list",
        class: "w-full h-full text-primary"
      });
      $$renderer3.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
      Icon($$renderer3, {
        icon: "heroicons:check-circle",
        class: "w-full h-full text-secondary"
      });
      $$renderer3.push(`<!----></div> <div class="relative flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h1 class="text-3xl font-bold text-primary">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("projects.title"))}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("projects.description"))}</p></div> <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"><div class="relative"><div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">`);
      Icon($$renderer3, {
        icon: "ph:magnifying-glass",
        class: "w-5 h-5 text-base-content/40"
      });
      $$renderer3.push(`<!----></div> <input type="text"${attr("value", searchQuery)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("projects.search_placeholder"))} class="input input-bordered w-full sm:w-[280px] ps-10 bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary shadow-md hover:shadow-lg transition-all duration-200"/></div> <button class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden whitespace-nowrap"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
      Icon($$renderer3, { icon: "ph:plus", class: "w-5 h-5 mr-2" });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("projects.add_task"))}</div></button></div></div></div> <div class="overflow-x-auto"><div class="flex space-x-6 min-w-max pb-4"><!--[-->`);
      const each_array = ensure_array_like(projectStatuses);
      for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
        let status = each_array[$$index_2];
        $$renderer3.push(`<div class="w-80 flex-shrink-0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-2"><div${attr_class(`w-3 h-3 rounded-full ${stringify(status.color)} shadow-sm`)}></div> <h3 class="font-semibold text-base-content">${escape_html(status.name)}</h3> <span class="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs px-3 py-1 rounded-full border border-primary/20 shadow-sm">${escape_html(filteredProjects[status.id]?.length || 0)}</span></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-base-200 to-base-300/50 rounded-2xl p-4 min-h-[500px] border border-base-300/50 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm"><div class="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
        Icon($$renderer3, {
          icon: "heroicons:clipboard-document-list",
          class: "w-full h-full text-primary"
        });
        $$renderer3.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative space-y-3"><!--[-->`);
        const each_array_1 = ensure_array_like(filteredProjects[status.id] || []);
        for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
          let task = each_array_1[$$index_1];
          $$renderer3.push(`<div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-xl p-4 shadow-md border border-base-300/50 cursor-move hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm" draggable="true"><div class="absolute top-0 right-0 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
          Icon($$renderer3, {
            icon: "heroicons:document-text",
            class: "w-full h-full text-primary"
          });
          $$renderer3.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div> <div class="relative flex items-start justify-between mb-2"><h4 class="font-medium text-base-content text-sm line-clamp-2 flex-1 mr-2 group-hover:text-primary transition-colors duration-300">${escape_html(task.title)}</h4> <div class="flex items-center space-x-1"><button class="p-1.5 text-base-content/40 hover:text-primary rounded-lg bg-base-200/50 hover:bg-primary/10 transition-all duration-200">`);
          Icon($$renderer3, { icon: "heroicons:eye", class: "w-4 h-4" });
          $$renderer3.push(`<!----></button> <button class="p-1.5 text-base-content/40 hover:text-error rounded-lg bg-base-200/50 hover:bg-error/10 transition-all duration-200">`);
          Icon($$renderer3, { icon: "heroicons:trash", class: "w-4 h-4" });
          $$renderer3.push(`<!----></button></div></div> <p class="relative text-xs text-base-content/60 mb-3 line-clamp-2 group-hover:text-base-content/80 transition-colors duration-300">${escape_html(task.description)}</p> <div class="relative space-y-2"><div class="flex items-center justify-between"><span${attr_class(`text-xs px-3 py-1 rounded-full ${stringify(getPriorityColor(task.priority))} shadow-sm border border-current/20`)}>${escape_html(getPriorityText(task.priority))}</span> `);
          if (task.dueDate) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-xs text-base-content/60 bg-base-200/50 px-2 py-1 rounded-lg">${escape_html(formatDate(task.dueDate))}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> `);
          if (task.assignee) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="flex items-center space-x-2"><div class="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center shadow-sm">`);
            Icon($$renderer3, { icon: "heroicons:user", class: "w-3 h-3 text-primary" });
            $$renderer3.push(`<!----></div> <span class="text-xs text-base-content/70 group-hover:text-base-content transition-colors duration-300">${escape_html(task.assignee)}</span></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (task.tags && task.tags.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="flex flex-wrap gap-1"><!--[-->`);
            const each_array_2 = ensure_array_like(task.tags);
            for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
              let tag = each_array_2[$$index];
              $$renderer3.push(`<span class="text-xs bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-2 py-1 rounded-lg border border-primary/20 shadow-sm group-hover:shadow-md transition-shadow duration-300">${escape_html(tag)}</span>`);
            }
            $$renderer3.push(`<!--]--></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div>`);
      }
      $$renderer3.push(`<!--]--></div></div></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      DeleteConfirmationModal($$renderer3, {
        title: store_get($$store_subs ??= {}, "$_", $format)("deleteConfirmation.title"),
        message: store_get($$store_subs ??= {}, "$_", $format)("deleteConfirmation.message"),
        itemName: "",
        get isOpen() {
          return showDeleteModal;
        },
        set isOpen($$value) {
          showDeleteModal = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  ProjectManagementPage as default
};
