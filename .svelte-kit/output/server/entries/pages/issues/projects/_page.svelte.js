import "clsx";
import { d as attr, c as store_get, u as unsubscribe_stores, k as bind_props, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { a as $format } from "../../../../chunks/runtime.js";
import { f as fallback } from "../../../../chunks/utils.js";
import { T as escape_html } from "../../../../chunks/context.js";
function DeleteConfirmationModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isOpen = fallback($$props["isOpen"], false);
    let title = fallback($$props["title"], "");
    let message = fallback($$props["message"], "");
    let itemName = fallback($$props["itemName"], "");
    let confirmText = fallback($$props["confirmText"], "");
    let cancelText = fallback($$props["cancelText"], "");
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"><div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h3 id="modal-title" class="text-lg font-semibold text-gray-900">${escape_html(title || store_get($$store_subs ??= {}, "$_", $format)("deleteConfirmation.title"))}</h3> <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)("common.close"))}><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div> <div class="p-6"><div class="flex items-start"><div class="flex-shrink-0"><div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div></div> <div class="ml-3"><p class="text-sm text-gray-700">${escape_html(message || store_get($$store_subs ??= {}, "$_", $format)("deleteConfirmation.message"))} `);
      if (itemName) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="font-semibold text-gray-900">"${escape_html(itemName)}"</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></p></div></div></div> <div class="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">${escape_html(cancelText || store_get($$store_subs ??= {}, "$_", $format)("common.cancel"))}</button> <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">${escape_html(confirmText || store_get($$store_subs ??= {}, "$_", $format)("common.delete"))}</button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { isOpen, title, message, itemName, confirmText, cancelText });
  });
}
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
function _page($$renderer) {
  ProjectManagementPage($$renderer);
}
export {
  _page as default
};
