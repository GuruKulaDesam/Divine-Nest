import { h as head, d as attr, a as ensure_array_like, b as attr_class } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function TaskBoardPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tasks = [
      {
        id: 1,
        title: "தமிழ் எழுத்துப்பயிற்சி செய்ய வேண்டும்",
        description: "குழந்தைக்கு தமிழ் எழுத்துகள் கற்றுக்கொடுக்க வேண்டும்",
        status: "pending",
        priority: "high",
        assignee: "Amma",
        dueDate: "2025-10-10",
        voiceTrigger: "எழுத்துப்பயிற்சி",
        createdAt: "2025-10-08 09:00 AM"
      },
      {
        id: 2,
        title: "பொங்கல் சமையல் பொருட்கள் வாங்கு",
        description: "பொங்கல் சமையலுக்கு தேவையான பொருட்கள் வாங்க வேண்டும்",
        status: "in-progress",
        priority: "medium",
        assignee: "Appa",
        dueDate: "2025-10-09",
        voiceTrigger: "சமையல் பொருட்கள்",
        createdAt: "2025-10-08 08:30 AM"
      },
      {
        id: 3,
        title: "வீடு சுத்தம் செய்ய வேண்டும்",
        description: "முழு வீடும் சுத்தம் செய்ய வேண்டும்",
        status: "completed",
        priority: "low",
        assignee: "Amma",
        dueDate: "2025-10-08",
        voiceTrigger: "வீடு சுத்தம்",
        createdAt: "2025-10-08 07:00 AM"
      }
    ];
    let filteredTasks = tasks;
    let searchQuery = "";
    let selectedStatus = "";
    let selectedPriority = "";
    let selectedAssignee = "";
    const taLabels = {
      taskBoard: "பணி பலகை",
      addTask: "பணி சேர்",
      search: "தேடு",
      filterStatus: "நிலை வடிகட்டி",
      filterPriority: "முன்னுரிமை வடிகட்டி",
      filterAssignee: "ஒதுக்கப்பட்டவர் வடிகட்டி",
      all: "அனைத்தும்",
      pending: "நிலுவையில்",
      inProgress: "நடைபெறுகிறது",
      completed: "முடிந்தது",
      high: "உயர்",
      medium: "நடுத்தரம்",
      low: "குறைவு",
      child: "குழந்தை",
      amma: "அம்மா",
      appa: "அப்பா",
      paati: "பாட்டி",
      noTasks: "பணிகள் இல்லை",
      markComplete: "முடிந்ததாக குறி",
      edit: "திருத்து",
      delete: "நீக்கு"
    };
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
    const priorityColors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    };
    filteredTasks = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !selectedStatus;
      const matchesPriority = !selectedPriority;
      const matchesAssignee = !selectedAssignee;
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>📋 Task Board - Assistant</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-green-900 dark:to-blue-900"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><div class="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-8 h-8 text-white"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">${escape_html(taLabels.taskBoard)}</h1> <p class="text-gray-600 dark:text-gray-400">Family task management with voice triggers</p></div></div> <button class="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 mr-2 inline" });
    $$renderer2.push(`<!----> ${escape_html(taLabels.addTask)}</button></div></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.search)}</span></label> <input type="text"${attr("value", searchQuery)} placeholder="பணிகளை தேடு..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterStatus)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "pending" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.pending)}`);
        });
        $$renderer3.option({ value: "in-progress" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.inProgress)}`);
        });
        $$renderer3.option({ value: "completed" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.completed)}`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterPriority)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedPriority,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "high" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.high)}`);
        });
        $$renderer3.option({ value: "medium" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.medium)}`);
        });
        $$renderer3.option({ value: "low" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.low)}`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">${escape_html(taLabels.filterAssignee)}</span></label> `);
    $$renderer2.select(
      {
        value: selectedAssignee,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.all)}`);
        });
        $$renderer3.option({ value: "Child" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.child)}`);
        });
        $$renderer3.option({ value: "Amma" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.amma)}`);
        });
        $$renderer3.option({ value: "Appa" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.appa)}`);
        });
        $$renderer3.option({ value: "Paati" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(taLabels.paati)}`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array = ensure_array_like(filteredTasks);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let task = each_array[index];
      $$renderer2.push(`<div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${escape_html(task.title)}</h3> <div class="flex items-center space-x-2 mb-3"><span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`)}>${escape_html(task.status === "pending" ? taLabels.pending : task.status === "in-progress" ? taLabels.inProgress : taLabels.completed)}</span> <span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`)}>${escape_html(task.priority === "high" ? taLabels.high : task.priority === "medium" ? taLabels.medium : taLabels.low)}</span></div></div> <div class="flex-shrink-0 ml-4"><div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">${escape_html(task.assignee === "Amma" ? "அ" : task.assignee === "Appa" ? "ஆ" : task.assignee === "Child" ? "கு" : "பா")}</div></div></div> <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">${escape_html(task.description)}</p> `);
      if (task.voiceTrigger) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4"><div class="flex items-center space-x-2">`);
        Icon($$renderer2, {
          icon: "heroicons:microphone",
          class: "w-4 h-4 text-blue-600 dark:text-blue-400"
        });
        $$renderer2.push(`<!----> <span class="text-sm text-blue-700 dark:text-blue-300 font-medium">Voice: "${escape_html(task.voiceTrigger)}"</span></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (task.dueDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">`);
        Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span>Due: ${escape_html(new Date(task.dueDate).toLocaleDateString())}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><div class="flex space-x-2">`);
      if (task.status !== "completed") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors">${escape_html(taLabels.markComplete)}</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors">${escape_html(taLabels.edit)}</button></div> <button class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors">${escape_html(taLabels.delete)}</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredTasks.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "heroicons:clipboard-document-list",
        class: "w-16 h-16 text-gray-400 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape_html(taLabels.noTasks)}</h3> <p class="text-gray-500 dark:text-gray-400">Add tasks using voice commands or the button above!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  TaskBoardPage as default
};
