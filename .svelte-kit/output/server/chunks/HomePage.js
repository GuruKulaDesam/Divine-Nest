import { l as bind_props, a as ensure_array_like, j as attr_style, s as stringify, d as attr, b as attr_class, g as clsx } from "./index2.js";
import { o as onDestroy, I as Icon } from "./Icon.js";
import { g as generateUserAvatar } from "./avatar.js";
import { Chart, registerables } from "chart.js";
import { s as sampleData } from "./charts.js";
import { k as fallback } from "./utils.js";
import "./dexie-db.js";
/* empty css                                          */
import { e as escape_html } from "./context.js";
function RevenueChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Chart.register(...registerables);
    let data = fallback(
      $$props["data"],
      () => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue",
            data: [12e3, 19e3, 15e3, 25e3, 22e3, 3e4],
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          },
          {
            label: "Sales",
            data: [8e3, 15e3, 12e3, 18e3, 16e3, 22e3],
            backgroundColor: "rgba(34, 197, 94, 0.8)",
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      }),
      true
    );
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="relative h-80"><canvas></canvas></div>`);
    bind_props($$props, { data });
  });
}
const users = {
  recent: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      action: "purchased",
      item: "Premium Plan",
      time: "2 minutes ago"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      action: "subscribed to",
      item: "Newsletter",
      time: "5 minutes ago"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      action: "downloaded",
      item: "Product Catalog",
      time: "10 minutes ago"
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      action: "reviewed",
      item: "Bug #456",
      time: "15 minutes ago"
    },
    {
      id: 5,
      name: "Bob Martin",
      email: "bob.martin@example.com",
      action: "commented on",
      item: "Task ABC",
      time: "20 minutes ago"
    },
    {
      id: 6,
      name: "Carol Lee",
      email: "carol.lee@example.com",
      action: "approved",
      item: "Merge Request",
      time: "30 minutes ago"
    },
    {
      id: 7,
      name: "David Kim",
      email: "david.kim@example.com",
      action: "archived",
      item: "Project XYZ",
      time: "45 minutes ago"
    }
  ]
};
function FamilyCalendar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let events = [];
    let year = 2025;
    let month = 9;
    function iso(y, m, d) {
      return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
    Array.from({ length: 50 }, (_, i) => ({
      title: `Event ${i + 1}`,
      date: iso(2025, 9, i % 30 + 1),
      description: `Description for event ${i + 1}`,
      color: `hsl(${i * 30 % 360},70%,60%)`
    }));
    function getEventsForDay(d) {
      const dstr = iso(year, month, d);
      return events.filter((e) => e.date === dstr);
    }
    $$renderer2.push(`<div class="calendar-shell"><header class="calendar-topbar mb-4 flex items-center justify-between"><div><h2 class="app-title">Calendar</h2> <div class="month-label">${escape_html(new Date(year, month).toLocaleString(void 0, { month: "long", year: "numeric" }))}</div></div> <div class="flex gap-2 items-center"><button class="btn btn-xs">Prev</button> <button class="btn btn-xs">Next</button> <button class="btn btn-xs">Add Event</button></div></header> <div class="card familywall-calendar-card p-4 svelte-1nnnho6"><div class="calendar-grid svelte-1nnnho6"><div class="calendar-weekdays grid grid-cols-7 text-xs text-base-content/60 mb-2"><div>Sun</div> <div>Mon</div> <div>Tue</div> <div>Wed</div> <div>Thu</div> <div>Fri</div> <div>Sat</div></div> <!--[-->`);
    const each_array = ensure_array_like(Array(new Date(year, month + 1, 0).getDate()));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$renderer2.push(`<div class="calendar-day p-3 svelte-1nnnho6"><div class="flex items-start justify-between"><div class="day-number font-semibold">${escape_html(i + 1)}</div> <button class="btn btn-ghost btn-xs">+</button></div> <div class="mt-2 flex flex-col gap-1"><!--[-->`);
      const each_array_1 = ensure_array_like(getEventsForDay(i + 1).slice(0, 3));
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let event = each_array_1[$$index];
        $$renderer2.push(`<button type="button" class="event-row flex items-center gap-2 w-full text-left svelte-1nnnho6"><div class="w-2 h-2 rounded-full"${attr_style(`background:${stringify(event.color)}`)}></div> <div class="truncate">${escape_html(event.title)}</div></button>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (getEventsForDay(i + 1).length > 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-xs text-base-content/60">+${escape_html(getEventsForDay(i + 1).length - 3)} more</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function FamilyTodo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let todos = [];
    let newTodo = "";
    let dueDate = "";
    let priority = "normal";
    $$renderer2.push(`<div class="card glass p-4"><h2 class="font-bold text-lg mb-2">Family To-Do</h2> <div class="keep-style"><div class="keep-create mb-4"><input placeholder="Add a task..."${attr("value", newTodo)} class="keep-input"/> <div class="keep-controls mt-2 flex gap-2"><input type="date"${attr("value", dueDate)} class="input input-xs"/> `);
    $$renderer2.select({ value: priority, class: "select select-xs" }, ($$renderer3) => {
      $$renderer3.option({ value: "low" }, ($$renderer4) => {
        $$renderer4.push(`Low`);
      });
      $$renderer3.option({ value: "normal" }, ($$renderer4) => {
        $$renderer4.push(`Normal`);
      });
      $$renderer3.option({ value: "high" }, ($$renderer4) => {
        $$renderer4.push(`High`);
      });
    });
    $$renderer2.push(` <button class="btn btn-sm">Add</button></div></div> <div class="todo-grid grid gap-3"><!--[-->`);
    const each_array = ensure_array_like(todos.slice().sort((a, b) => +(b.priority === "high") - +(a.priority === "high")));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let todo = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`task-card p-3 rounded ${todo.done ? "opacity-60" : ""}`)}><div class="flex items-start gap-3"><input type="checkbox"${attr("checked", todo.done, true)}/> <div class="flex-1"><div class="text-sm font-semibold">${escape_html(todo.text)}</div> <div class="text-xs text-base-content/60">${escape_html(todo.dueDate ? `Due ${todo.dueDate}` : "")}</div></div> <div class="flex flex-col gap-2">`);
      if (todo.priority === "high") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="badge badge-error">High</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn btn-ghost btn-xs">Delete</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function FamilyMap($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let places = [];
    let name = "";
    let address = "";
    $$renderer2.push(`<div class="card glass p-4"><div class="flex items-center justify-between mb-3"><h2 class="font-bold text-lg">Family Map</h2> <div class="text-sm text-base-content/60">Locations — ${escape_html(places.length)}</div></div> <div class="mb-3 flex gap-2"><input class="input input-sm" placeholder="Place name"${attr("value", name)}/> <input class="input input-sm" placeholder="Address"${attr("value", address)}/> <button class="btn btn-sm">Add</button></div> <ul><!--[-->`);
    const each_array = ensure_array_like(places);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let place = each_array[$$index];
      $$renderer2.push(`<li class="mb-3 p-3 rounded bg-base-200 flex items-start justify-between"><div><div class="font-semibold">${escape_html(place.name)}</div> <div class="text-xs text-base-content/60">${escape_html(place.address)}</div></div> <div class="flex flex-col items-end gap-2"><a class="link text-xs" target="_blank" rel="noopener"${attr("href", `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`)}>Open</a> <button class="btn btn-ghost btn-xs">Delete</button></div></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div>`);
  });
}
function FamilyNotes($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let notes = [];
    let newNote = "";
    $$renderer2.push(`<div class="card glass p-4"><h2 class="font-bold text-lg mb-2">Family Notes</h2> <div class="mb-3 flex gap-2"><input class="input input-sm flex-1" placeholder="Write a note"${attr("value", newNote)}/> <button class="btn btn-sm">${escape_html("Add")}</button></div> <div class="notes-grid svelte-11ka5q9"><!--[-->`);
    const each_array = ensure_array_like(notes.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let note = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`note-card mb-3 p-3 rounded ${note.pinned ? "note-pinned" : ""}`, "svelte-11ka5q9")}><div class="note-header flex items-center justify-between"><div class="font-medium">${escape_html(note.text.slice(0, 40))}</div> `);
      if (note.pinned) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-xs">📌</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="note-body text-sm mt-2">${escape_html(note.text)}</div> <div class="note-footer mt-3 text-xs text-base-content/60 flex items-center justify-between"><div>${escape_html(note.updatedAt)}</div> <div class="flex gap-2"><button class="btn btn-ghost btn-xs">${escape_html(note.pinned ? "Unpin" : "Pin")}</button> <button class="btn btn-ghost btn-xs">Edit</button> <button class="btn btn-ghost btn-xs">Delete</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function FamilyNotifications($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let notifications = [];
    let newNotification = "";
    $$renderer2.push(`<div class="card glass p-4"><h2 class="font-bold text-lg mb-2">Family Notifications</h2> <div class="mb-3 flex gap-2"><input class="input input-sm flex-1" placeholder="New notification"${attr("value", newNotification)}/> <button class="btn btn-sm">Add</button> <button class="btn btn-sm btn-error">Clear All</button></div> <ul><!--[-->`);
    const each_array = ensure_array_like(notifications.slice().sort((a, b) => (a.read ? 1 : 0) - (b.read ? 1 : 0)));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let notification = each_array[$$index];
      $$renderer2.push(`<li${attr_class(`mb-3 p-3 rounded ${notification.read ? "bg-base-200" : "bg-base-100 shadow-sm"}`)}><div class="flex items-start justify-between"><div><div${attr_class(clsx(notification.read ? "text-base-content/60" : "font-medium"))}>${escape_html(notification.text)}</div> <div class="text-xs text-base-content/60">${escape_html(notification.timestamp)}</div></div> <div class="flex flex-col gap-2">`);
      if (!notification.read) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn btn-ghost btn-xs">Mark read</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn btn-ghost btn-xs">Delete</button></div></div></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div>`);
  });
}
function HomePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let revenueOverviewData;
    let period = "monthly";
    const homeManagementStats = {
      members: {
        total: 6,
        needsAttention: 1,
        moodChecksDue: 2,
        status: "amber"
      },
      inventory: {
        total: 125,
        lowStock: 8,
        needsReorder: 10,
        status: "red"
      },
      vehicles: {
        total: 4,
        serviceDue: 1,
        fuelLow: 2,
        status: "amber"
      },
      expenses: {
        savings: 2200,
        overduePayments: 2,
        status: "green"
      },
      property: {
        totalProperties: 1,
        taxesDue: 2,
        maintenanceDue: 1,
        status: "amber"
      }
    };
    const priorityTasks = [
      {
        id: 1,
        task: "Paati's BP medication reminder",
        category: "health",
        priority: "high",
        module: "members"
      },
      {
        id: 2,
        task: "Reorder rice and dal (low stock)",
        category: "inventory",
        priority: "high",
        module: "inventory"
      },
      {
        id: 3,
        task: "Pay water tax (due Oct 15)",
        category: "property",
        priority: "high",
        module: "property"
      },
      {
        id: 4,
        task: "Bike service due (Hero Splendor)",
        category: "vehicle",
        priority: "medium",
        module: "vehicles"
      },
      {
        id: 5,
        task: "Akka's mood check-in pending",
        category: "wellness",
        priority: "medium",
        module: "members"
      },
      {
        id: 6,
        task: "Diwali shopping budget planning",
        category: "expenses",
        priority: "medium",
        module: "expenses"
      }
    ];
    const housewifeDashboard = {
      kitchenStatus: {
        criticalItems: [
          "Rice (2kg left)",
          "Dal (1kg left)",
          "Cooking oil (500ml left)"
        ],
        status: "needs_attention"
      },
      familyWellness: {
        medicationsDue: ["Paati - BP tablet at 7 AM", "Amma - Thyroid tablet at 6 AM"],
        status: "good"
      },
      householdTasks: {
        cleaningDue: [
          "Deep clean pooja room before Diwali",
          "Pest control due this month"
        ],
        status: "planned"
      },
      financialOverview: {
        monthlyBudgetUsed: "90%",
        savingsThisMonth: "₹2,200",
        status: "healthy"
      }
    };
    function getStatusColor(status) {
      switch (status) {
        case "green":
        case "good":
        case "healthy":
          return "text-green-600 bg-green-100";
        case "amber":
        case "needs_attention":
        case "planned":
          return "text-orange-600 bg-orange-100";
        case "red":
        case "critical":
          return "text-red-600 bg-red-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "text-red-600 bg-red-100";
        case "medium":
          return "text-orange-600 bg-orange-100";
        case "low":
          return "text-green-600 bg-green-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    function getModuleIcon(module) {
      const icons = {
        members: "heroicons:users",
        inventory: "heroicons:archive-box",
        vehicles: "heroicons:truck",
        expenses: "heroicons:banknotes",
        property: "heroicons:building-office"
      };
      return icons[module] || "heroicons:home";
    }
    const iconColors = {
      "heroicons:currency-dollar": "from-emerald-500 to-teal-600",
      "heroicons:users": "from-blue-500 to-indigo-600",
      "heroicons:shopping-cart": "from-purple-500 to-pink-600",
      "heroicons:chart-bar": "from-orange-500 to-red-600",
      "heroicons:trending-up": "from-green-500 to-emerald-600",
      "heroicons:fire": "from-red-500 to-pink-600",
      "heroicons:star": "from-yellow-500 to-orange-600",
      "heroicons:heart": "from-pink-500 to-rose-600",
      "heroicons:plus": "from-blue-500 to-indigo-600",
      "heroicons:document-text": "from-purple-500 to-pink-600",
      "heroicons:cog": "from-gray-500 to-slate-600",
      "heroicons:bell": "from-yellow-500 to-orange-600",
      "heroicons:envelope": "from-green-500 to-emerald-600",
      "heroicons:calendar": "from-red-500 to-pink-600",
      "heroicons:user-group": "from-indigo-500 to-purple-600",
      "heroicons:chart-pie": "from-teal-500 to-cyan-600",
      "heroicons:bolt": "from-yellow-400 to-orange-500",
      "mdi:cube-outline": "from-purple-500 to-pink-600",
      "heroicons:archive-box": "from-amber-500 to-orange-600",
      "heroicons:truck": "from-cyan-500 to-blue-600",
      "heroicons:banknotes": "from-green-500 to-emerald-600",
      "heroicons:building-office": "from-gray-500 to-slate-600"
    };
    revenueOverviewData = {
      labels: sampleData[period].labels,
      datasets: [
        {
          ...sampleData[period],
          data: sampleData[period].revenue,
          label: "Revenue",
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgb(59, 130, 246)"
        },
        {
          ...sampleData[period],
          data: sampleData[period].sales,
          label: "Sales",
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          borderColor: "rgb(34, 197, 94)"
        }
      ]
    };
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-full h-full text-blue-600" });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:sparkles",
      class: "w-full h-full text-purple-600"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">गृह प्रबन्धन | Home Management Dashboard</h1> <p class="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-md">Complete overview of family, household, and daily management needs. Today's priorities at a glance.</p></div> <div class="flex space-x-2"><button class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2 inline" });
    $$renderer2.push(`<!----> Quick Add</button></div></div></div> <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"><div class="group relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-md border border-blue-300/50 dark:border-blue-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300"><div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">`);
    Icon($$renderer2, {
      icon: "heroicons:users",
      class: "w-full h-full text-blue-600"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center"><div class="flex-shrink-0"><div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-7 h-7 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><div class="flex items-center justify-between"><p class="text-2xl font-bold text-blue-900 dark:text-blue-100">${escape_html(homeManagementStats.members.total)}</p> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(homeManagementStats.members.status))}`)}>${escape_html(homeManagementStats.members.needsAttention)} Alert</span></div> <p class="text-sm font-medium text-blue-700 dark:text-blue-300">Family Members</p> <p class="text-xs text-blue-600 dark:text-blue-400">${escape_html(homeManagementStats.members.moodChecksDue)} mood checks due</p></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-800/20 rounded-2xl shadow-md border border-amber-300/50 dark:border-amber-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300"><div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">`);
    Icon($$renderer2, {
      icon: "heroicons:archive-box",
      class: "w-full h-full text-amber-600"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center"><div class="flex-shrink-0"><div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:archive-box", class: "w-7 h-7 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><div class="flex items-center justify-between"><p class="text-2xl font-bold text-amber-900 dark:text-amber-100">${escape_html(homeManagementStats.inventory.total)}</p> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(homeManagementStats.inventory.status))}`)}>${escape_html(homeManagementStats.inventory.lowStock)} Low</span></div> <p class="text-sm font-medium text-amber-700 dark:text-amber-300">Inventory Items</p> <p class="text-xs text-amber-600 dark:text-amber-400">${escape_html(homeManagementStats.inventory.needsReorder)} need reorder</p></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/20 dark:to-blue-800/20 rounded-2xl shadow-md border border-cyan-300/50 dark:border-cyan-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300"><div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">`);
    Icon($$renderer2, {
      icon: "heroicons:truck",
      class: "w-full h-full text-cyan-600"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center"><div class="flex-shrink-0"><div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:truck", class: "w-7 h-7 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><div class="flex items-center justify-between"><p class="text-2xl font-bold text-cyan-900 dark:text-cyan-100">${escape_html(homeManagementStats.vehicles.total)}</p> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(homeManagementStats.vehicles.status))}`)}>${escape_html(homeManagementStats.vehicles.serviceDue)} Service</span></div> <p class="text-sm font-medium text-cyan-700 dark:text-cyan-300">Vehicles</p> <p class="text-xs text-cyan-600 dark:text-cyan-400">${escape_html(homeManagementStats.vehicles.fuelLow)} need fuel</p></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-800/20 rounded-2xl shadow-md border border-green-300/50 dark:border-green-700/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300"><div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">`);
    Icon($$renderer2, {
      icon: "heroicons:banknotes",
      class: "w-full h-full text-green-600"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center"><div class="flex-shrink-0"><div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-7 h-7 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><div class="flex items-center justify-between"><p class="text-2xl font-bold text-green-900 dark:text-green-100">₹${escape_html((homeManagementStats.expenses.savings / 1e3).toFixed(1))}k</p> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(homeManagementStats.expenses.status))}`)}>Saved</span></div> <p class="text-sm font-medium text-green-700 dark:text-green-300">This Month</p> <p class="text-xs text-green-600 dark:text-green-400">${escape_html(homeManagementStats.expenses.overduePayments)} bills due</p></div></div></div> <div class="group relative overflow-hidden bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/20 dark:to-slate-700/20 rounded-2xl shadow-md border border-gray-300/50 dark:border-gray-600/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300"><div class="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">`);
    Icon($$renderer2, {
      icon: "heroicons:building-office",
      class: "w-full h-full text-gray-600"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center"><div class="flex-shrink-0"><div class="w-14 h-14 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:building-office",
      class: "w-7 h-7 text-white"
    });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><div class="flex items-center justify-between"><p class="text-2xl font-bold text-gray-900 dark:text-gray-100">${escape_html(homeManagementStats.property.totalProperties)}</p> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(homeManagementStats.property.status))}`)}>${escape_html(homeManagementStats.property.taxesDue)} Taxes</span></div> <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Property</p> <p class="text-xs text-gray-600 dark:text-gray-400">${escape_html(homeManagementStats.property.maintenanceDue)} maintenance due</p></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 mr-2 text-red-500"
    });
    $$renderer2.push(`<!----> Today's Priorities</h3> <span class="text-sm text-gray-500 dark:text-gray-400">${escape_html(priorityTasks.length)} tasks</span></div> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(priorityTasks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let task = each_array[$$index];
      $$renderer2.push(`<div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><div class="flex items-center justify-between mb-2"><div class="flex items-center space-x-3"><div${attr_class(`w-8 h-8 bg-gradient-to-br ${stringify(iconColors[getModuleIcon(task.module)])} rounded-lg flex items-center justify-center`)}>`);
      Icon($$renderer2, {
        icon: getModuleIcon(task.module),
        class: "w-4 h-4 text-white"
      });
      $$renderer2.push(`<!----></div> <span class="font-medium text-gray-900 dark:text-white">${escape_html(task.task)}</span></div> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getPriorityColor(task.priority))}`)}>${escape_html(task.priority)}</span></div> <div class="flex items-center justify-between text-sm"><span class="text-gray-500 dark:text-gray-400 capitalize">${escape_html(task.category)}</span> <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium">Take Action →</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-6 h-6 mr-2 text-pink-500" });
    $$renderer2.push(`<!----> House Status Overview</h3> <span class="text-sm text-gray-500 dark:text-gray-400">Quick View</span></div> <div class="space-y-4"><div class="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-orange-800 dark:text-orange-200 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:fire", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Kitchen &amp; Pantry</h4> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(housewifeDashboard.kitchenStatus.status))}`)}>Needs Attention</span></div> <div class="space-y-1 text-sm text-orange-700 dark:text-orange-300"><!--[-->`);
    const each_array_1 = ensure_array_like(housewifeDashboard.kitchenStatus.criticalItems.slice(0, 2));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:exclamation-circle",
        class: "w-3 h-3 mr-2 text-red-500"
      });
      $$renderer2.push(`<!----> ${escape_html(item)}</div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-green-800 dark:text-green-200 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Family Wellness</h4> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(housewifeDashboard.familyWellness.status))}`)}>Good</span></div> <div class="space-y-1 text-sm text-green-700 dark:text-green-300"><!--[-->`);
    const each_array_2 = ensure_array_like(housewifeDashboard.familyWellness.medicationsDue.slice(0, 2));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let medication = each_array_2[$$index_2];
      $$renderer2.push(`<div class="flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:clock",
        class: "w-3 h-3 mr-2 text-orange-500"
      });
      $$renderer2.push(`<!----> ${escape_html(medication)}</div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-blue-800 dark:text-blue-200 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:wrench-screwdriver", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Household Tasks</h4> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(housewifeDashboard.householdTasks.status))}`)}>Planned</span></div> <div class="space-y-1 text-sm text-blue-700 dark:text-blue-300"><!--[-->`);
    const each_array_3 = ensure_array_like(housewifeDashboard.householdTasks.cleaningDue.slice(0, 2));
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let task = each_array_3[$$index_3];
      $$renderer2.push(`<div class="flex items-center">`);
      Icon($$renderer2, {
        icon: "heroicons:calendar",
        class: "w-3 h-3 mr-2 text-blue-500"
      });
      $$renderer2.push(`<!----> ${escape_html(task)}</div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-purple-800 dark:text-purple-200 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Financial Health</h4> <span${attr_class(`px-2 py-1 text-xs rounded-full ${stringify(getStatusColor(housewifeDashboard.financialOverview.status))}`)}>Healthy</span></div> <div class="grid grid-cols-2 gap-2 text-sm text-purple-700 dark:text-purple-300"><div>Budget Used: ${escape_html(housewifeDashboard.financialOverview.monthlyBudgetUsed)}</div> <div>Savings: ${escape_html(housewifeDashboard.financialOverview.savingsThisMonth)}</div></div></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:bolt",
      class: "w-6 h-6 mr-2 text-yellow-500"
    });
    $$renderer2.push(`<!----> Quick Actions</h3> <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"><button class="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:scale-105 transition-transform">`);
    Icon($$renderer2, {
      icon: "heroicons:users",
      class: "w-8 h-8 mx-auto mb-2 text-blue-600"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Check Family</span></button> <button class="p-4 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-800/20 rounded-xl hover:scale-105 transition-transform">`);
    Icon($$renderer2, {
      icon: "heroicons:archive-box",
      class: "w-8 h-8 mx-auto mb-2 text-amber-600"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-medium text-amber-700 dark:text-amber-300">Add Inventory</span></button> <button class="p-4 bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/20 dark:to-blue-800/20 rounded-xl hover:scale-105 transition-transform">`);
    Icon($$renderer2, {
      icon: "heroicons:truck",
      class: "w-8 h-8 mx-auto mb-2 text-cyan-600"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-medium text-cyan-700 dark:text-cyan-300">Vehicle Check</span></button> <button class="p-4 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl hover:scale-105 transition-transform">`);
    Icon($$renderer2, {
      icon: "heroicons:banknotes",
      class: "w-8 h-8 mx-auto mb-2 text-green-600"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-medium text-green-700 dark:text-green-300">Track Expense</span></button> <button class="p-4 bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/20 dark:to-slate-700/20 rounded-xl hover:scale-105 transition-transform">`);
    Icon($$renderer2, {
      icon: "heroicons:building-office",
      class: "w-8 h-8 mx-auto mb-2 text-gray-600"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Property Tax</span></button> <button class="p-4 bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl hover:scale-105 transition-transform">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar",
      class: "w-8 h-8 mx-auto mb-2 text-purple-600"
    });
    $$renderer2.push(`<!----> <span class="text-sm font-medium text-purple-700 dark:text-purple-300">Set Reminder</span></button></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-24 h-24 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:chart-pie",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between mb-6"><div><h2 class="text-2xl font-bold text-base-content">Revenue Overview</h2> <p class="text-base-content/60 mt-1">Track your financial performance</p></div> <div class="flex items-center space-x-1 bg-base-200/50 rounded-xl p-1"><button${attr_class(`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${stringify("text-base-content/70 hover:bg-base-300")}`)}>Weekly</button> <button${attr_class(`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${stringify(
      "bg-green-500 text-white shadow-lg"
    )}`)}>Monthly</button> <button${attr_class(`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${stringify("text-base-content/70 hover:bg-base-300")}`)}>Yearly</button></div></div> `);
    RevenueChart($$renderer2, { data: revenueOverviewData });
    $$renderer2.push(`<!----></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:bell",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative mb-5"><h2 class="text-2xl font-bold text-base-content">Recent Activity</h2> <p class="text-base-content/60 mt-1">Latest updates from your team</p></div> <div class="relative max-h-80 overflow-y-auto divide-y divide-base-300/50"><!--[-->`);
    const each_array_4 = ensure_array_like(users.recent);
    for (let index = 0, $$length = each_array_4.length; index < $$length; index++) {
      let activity = each_array_4[index];
      $$renderer2.push(`<div class="flex items-start justify-between p-4 mx-2 transition-all duration-200 hover:bg-base-200/50 hover:rounded-xl group"><div class="flex items-start space-x-4"><div class="relative"><img class="w-10 h-10 rounded-full object-cover bg-base-200 shadow-md group-hover:shadow-lg transition-shadow duration-200"${attr("src", generateUserAvatar(activity, "default"))}${attr("alt", activity.name)}/> <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div></div> <div class="min-w-0 flex-1"><p class="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors duration-200">${escape_html(activity.name)}</p> <p class="text-sm text-base-content/70 leading-relaxed">${escape_html(activity.action)} <span class="font-medium text-base-content">${escape_html(activity.item)}</span></p></div></div> <div class="flex flex-col items-end"><p class="text-xs text-base-content/50 whitespace-nowrap">${escape_html(activity.time)}</p> <div class="w-2 h-2 bg-primary/30 rounded-full mt-2 group-hover:bg-primary transition-colors duration-200"></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar",
      class: "w-5 h-5 mr-2 text-blue-500"
    });
    $$renderer2.push(`<!----> Family Calendar</h3> `);
    FamilyCalendar($$renderer2);
    $$renderer2.push(`<!----></div> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:clipboard-document-list",
      class: "w-5 h-5 mr-2 text-green-500"
    });
    $$renderer2.push(`<!----> Family Tasks</h3> `);
    FamilyTodo($$renderer2);
    $$renderer2.push(`<!----></div> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:map-pin",
      class: "w-5 h-5 mr-2 text-red-500"
    });
    $$renderer2.push(`<!----> Family Locations</h3> `);
    FamilyMap($$renderer2);
    $$renderer2.push(`<!----></div> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:document-text",
      class: "w-5 h-5 mr-2 text-purple-500"
    });
    $$renderer2.push(`<!----> Family Notes</h3> `);
    FamilyNotes($$renderer2);
    $$renderer2.push(`<!----></div> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:col-span-2"><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">`);
    Icon($$renderer2, {
      icon: "heroicons:bell",
      class: "w-5 h-5 mr-2 text-yellow-500"
    });
    $$renderer2.push(`<!----> Family Notifications</h3> `);
    FamilyNotifications($$renderer2);
    $$renderer2.push(`<!----></div></div></div>`);
  });
}
export {
  HomePage as default
};
