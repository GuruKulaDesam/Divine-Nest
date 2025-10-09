import { c as store_get, a as ensure_array_like, b as attr_class, s as stringify, d as attr, u as unsubscribe_stores } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { g as generateUserAvatar } from "./avatar.js";
import { e as escape_html } from "./context.js";
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    department: "Engineering",
    lastActive: "2024-01-15T10:30:00Z",
    joinDate: "2023-01-15",
    avatar: null
    // Will be generated using DiceBear
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "manager",
    status: "active",
    department: "Marketing",
    lastActive: "2024-01-15T09:15:00Z",
    joinDate: "2023-03-20",
    avatar: null
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "editor",
    status: "active",
    department: "Content",
    lastActive: "2024-01-14T16:45:00Z",
    joinDate: "2023-06-10",
    avatar: null
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "viewer",
    status: "inactive",
    department: "Sales",
    lastActive: "2024-01-10T14:20:00Z",
    joinDate: "2023-08-05",
    avatar: null
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "manager",
    status: "active",
    department: "Finance",
    lastActive: "2024-01-15T11:00:00Z",
    joinDate: "2023-02-28",
    avatar: null
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "editor",
    status: "pending",
    department: "Design",
    lastActive: null,
    joinDate: "2024-01-15",
    avatar: null
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    role: "viewer",
    status: "suspended",
    department: "Support",
    lastActive: "2024-01-05T08:30:00Z",
    joinDate: "2023-09-15",
    avatar: null
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    role: "editor",
    status: "active",
    department: "Product",
    lastActive: "2024-01-15T12:15:00Z",
    joinDate: "2023-04-12",
    avatar: null
  }
];
const departments = [
  "Engineering",
  "Marketing",
  "Content",
  "Sales",
  "Finance",
  "Design",
  "Support",
  "Product",
  "HR",
  "Operations"
];
[
  {
    name: "Total Users",
    value: users.length.toString(),
    change: "+12%",
    changeType: "positive",
    icon: "heroicons:users"
  },
  {
    name: "Active Users",
    value: users.filter((user) => user.status === "active").length.toString(),
    change: "+8%",
    changeType: "positive",
    icon: "heroicons:user-circle"
  },
  {
    name: "New Users",
    value: users.filter((user) => {
      const joinDate = new Date(user.joinDate);
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate > thirtyDaysAgo;
    }).length.toString(),
    change: "+15%",
    changeType: "positive",
    icon: "heroicons:user-plus"
  },
  {
    name: "Inactive Users",
    value: users.filter((user) => user.status === "inactive").length.toString(),
    change: "-3%",
    changeType: "negative",
    icon: "heroicons:user-minus"
  }
];
function UsersPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let translatedUserColumns, translatedUserRoles, translatedUserStatuses, translatedUserStats;
    let filteredUsers = [...users];
    let searchTerm = "";
    let selectedRole = "";
    let selectedStatus = "";
    let selectedDepartment = "";
    let sortBy = "name";
    const iconColors = {
      "heroicons:users": "from-blue-500 to-indigo-600",
      "heroicons:user-circle": "from-green-500 to-emerald-600",
      "heroicons:user-plus": "from-purple-500 to-pink-600",
      "heroicons:user-minus": "from-red-500 to-pink-600",
      "heroicons:currency-dollar": "from-emerald-500 to-teal-600",
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
      "heroicons:chart-pie": "from-teal-500 to-cyan-600"
    };
    function getRoleInfo(roleId) {
      return translatedUserRoles.find((role) => role.id === roleId);
    }
    function getStatusInfo(statusId) {
      return translatedUserStatuses.find((status) => status.id === statusId);
    }
    function formatDate(dateString) {
      if (!dateString) return store_get($$store_subs ??= {}, "$_", $format)("common.never");
      return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    function formatLastActive(dateString) {
      if (!dateString) return store_get($$store_subs ??= {}, "$_", $format)("common.never");
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60));
      if (diffInHours < 1) return store_get($$store_subs ??= {}, "$_", $format)("common.just_now");
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
      return formatDate(dateString);
    }
    translatedUserColumns = [
      {
        key: "name",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.name"),
        sortable: true
      },
      {
        key: "email",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.email"),
        sortable: true
      },
      {
        key: "role",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.role"),
        sortable: true
      },
      {
        key: "department",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.department"),
        sortable: true
      },
      {
        key: "status",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.status"),
        sortable: true
      },
      {
        key: "lastActive",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.last_active"),
        sortable: true
      },
      {
        key: "joinDate",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.join_date"),
        sortable: true
      },
      {
        key: "actions",
        label: store_get($$store_subs ??= {}, "$_", $format)("users.actions"),
        sortable: false
      }
    ];
    translatedUserRoles = [
      {
        id: "admin",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.admin"),
        color: "bg-error/20 text-error"
      },
      {
        id: "manager",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.manager"),
        color: "bg-primary/20 text-primary"
      },
      {
        id: "editor",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.editor"),
        color: "bg-success/20 text-success"
      },
      {
        id: "viewer",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.viewer"),
        color: "bg-base-content/20 text-base-content"
      }
    ];
    translatedUserStatuses = [
      {
        id: "active",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.active"),
        color: "bg-success/20 text-success"
      },
      {
        id: "inactive",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.inactive"),
        color: "bg-base-content/20 text-base-content"
      },
      {
        id: "suspended",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.suspended"),
        color: "bg-error/20 text-error"
      },
      {
        id: "pending",
        name: store_get($$store_subs ??= {}, "$_", $format)("users.pending"),
        color: "bg-warning/20 text-warning"
      }
    ];
    translatedUserStats = [
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("users.total_users"),
        value: users.length.toString(),
        change: "+12%",
        changeType: "positive",
        icon: "heroicons:users"
      },
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("users.active_users"),
        value: users.filter((user) => user.status === "active").length.toString(),
        change: "+8%",
        changeType: "positive",
        icon: "heroicons:user-circle"
      },
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("users.new_users"),
        value: users.filter((user) => {
          const joinDate = new Date(user.joinDate);
          const thirtyDaysAgo = /* @__PURE__ */ new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return joinDate > thirtyDaysAgo;
        }).length.toString(),
        change: "+15%",
        changeType: "positive",
        icon: "heroicons:user-plus"
      },
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("users.inactive_users"),
        value: users.filter((user) => user.status === "inactive").length.toString(),
        change: "-3%",
        changeType: "negative",
        icon: "heroicons:user-minus"
      }
    ];
    {
      filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !selectedRole;
        const matchesStatus = !selectedStatus;
        const matchesDepartment = !selectedDepartment;
        return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
      }).sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        {
          return aValue > bValue ? 1 : -1;
        }
      });
    }
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-full h-full text-primary" });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:user-group",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(
      // Handle delete logic here
      store_get($$store_subs ??= {}, "$_", $format)("users.title")
    )}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("users.description"))}</p></div> <button class="btn btn-primary shadow-xl hover:shadow-2xl group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("users.add_user"))}</div></button></div></div> <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
    const each_array = ensure_array_like(translatedUserStats);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let stat = each_array[index];
      $$renderer2.push(`<div class="group relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/50 rounded-2xl shadow-md border border-base-300/50 p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"><div class="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">`);
      Icon($$renderer2, { icon: stat.icon, class: "w-full h-full text-primary" });
      $$renderer2.push(`<!----></div> <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div> <div class="relative flex items-center"><div class="flex-shrink-0"><div${attr_class(`w-14 h-14 bg-gradient-to-br ${stringify(iconColors[stat.icon] || "from-primary/20 to-secondary/20")} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`)}>`);
      Icon($$renderer2, {
        icon: stat.icon,
        class: "w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300"
      });
      $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/70 truncate">${escape_html(stat.name)}</p> <p class="text-3xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">${escape_html(stat.value)}</p></div></div> <div class="mt-4 relative"><span${attr_class(`inline-flex items-baseline px-3 py-1 rounded-full text-sm font-medium shadow-sm ${stringify(stat.changeType === "positive" ? "bg-success/20 text-success border border-success/30" : "bg-error/20 text-error border border-error/30")}`)}>`);
      Icon($$renderer2, {
        icon: "heroicons:arrow-trending-up",
        class: `-ml-1 mr-1 flex-shrink-0 self-center h-4 w-4 ${stringify(stat.changeType === "positive" ? "text-success" : "text-error")}`
      });
      $$renderer2.push(`<!----> ${escape_html(stat.change)}</span> <span class="ml-2 text-sm text-base-content/60">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("analytics.from_last_month"))}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 p-6 backdrop-blur-sm"><div class="absolute top-0 right-0 w-20 h-20 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:funnel",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4"><div class="flex-1"><div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
    Icon($$renderer2, {
      icon: "heroicons:magnifying-glass",
      class: "h-5 w-5 text-base-content/40"
    });
    $$renderer2.push(`<!----></div> <input type="text"${attr("value", searchTerm)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("users.search_users"))} class="block w-full pl-10 pr-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-base-100 text-base-content placeholder-base-content/40"/></div></div> <div class="flex flex-wrap gap-4">`);
    $$renderer2.select(
      {
        value: selectedRole,
        class: "select select-bordered w-full sm:w-auto bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("users.all_roles"))}`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(translatedUserRoles);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let role = each_array_1[$$index_1];
          $$renderer3.option({ value: role.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(role.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "select select-bordered w-full sm:w-auto bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("users.all_statuses"))}`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(translatedUserStatuses);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let status = each_array_2[$$index_2];
          $$renderer3.option({ value: status.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      {
        value: selectedDepartment,
        class: "select select-bordered w-full sm:w-auto bg-base-100 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("users.all_departments"))}`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_3 = ensure_array_like(departments);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let department = each_array_3[$$index_3];
          $$renderer3.option({ value: department }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(department)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(` <button class="btn btn-ghost group hover:bg-base-200/80"><div class="p-1 rounded bg-base-200 group-hover:bg-base-300 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:x-mark", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("common.clear_filters"))}</button></div></div></div> <div class="relative overflow-hidden bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl shadow-md border border-base-300/50 backdrop-blur-sm"><div class="absolute top-0 right-0 w-24 h-24 opacity-5">`);
    Icon($$renderer2, {
      icon: "heroicons:table-cells",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative overflow-x-auto"><table class="min-w-full divide-y divide-base-300/50"><thead class="bg-base-200/50"><tr><!--[-->`);
    const each_array_4 = ensure_array_like(translatedUserColumns);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let column = each_array_4[$$index_4];
      $$renderer2.push(`<th scope="col"${attr_class("px-6 py-4 text-left text-xs font-medium text-base-content/60 uppercase tracking-wider cursor-pointer hover:bg-base-300/50 transition-colors duration-200", void 0, { "cursor-pointer": column.sortable })}><div class="flex items-center space-x-1"><span>${escape_html(column.label)}</span> `);
      if (column.sortable && sortBy === column.key) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, {
          icon: "heroicons:chevron-up",
          class: "h-4 w-4"
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></th>`);
    }
    $$renderer2.push(`<!--]--></tr></thead><tbody class="bg-base-100 divide-y divide-base-300/50"><!--[-->`);
    const each_array_5 = ensure_array_like(filteredUsers);
    for (let index = 0, $$length = each_array_5.length; index < $$length; index++) {
      let user = each_array_5[index];
      $$renderer2.push(`<tr class="hover:bg-base-200/50 transition-all duration-200 group"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10 relative"><img${attr("src", generateUserAvatar(user.name))}${attr("alt", user.name)} class="h-10 w-10 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-200"/> <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div></div> <div class="ml-4"><div class="text-sm font-medium text-base-content group-hover:text-primary transition-colors duration-200">${escape_html(user.name)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-base-content">${escape_html(user.email)}</div></td><td class="px-6 py-4 whitespace-nowrap">`);
      if (getRoleInfo(user.role)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span${attr_class(`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm ${stringify(getRoleInfo(user.role).color)} border border-current/20`)}>${escape_html(getRoleInfo(user.role).name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-6 py-4 whitespace-nowrap text-sm text-base-content/60">${escape_html(user.department)}</td><td class="px-6 py-4 whitespace-nowrap">`);
      if (getStatusInfo(user.status)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span${attr_class(`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm ${stringify(getStatusInfo(user.status).color)} border border-current/20`)}>${escape_html(getStatusInfo(user.status).name)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-6 py-4 whitespace-nowrap text-sm text-base-content/60">${escape_html(formatLastActive(user.lastActive))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-base-content/60">${escape_html(formatDate(user.joinDate))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex items-center space-x-3 justify-end"><button class="text-primary hover:text-primary-focus group"><div class="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:pencil-square", class: "h-5 w-5" });
      $$renderer2.push(`<!----></div></button> <button class="text-error hover:text-error-focus group"><div class="p-1.5 rounded-lg bg-error/10 group-hover:bg-error/20 transition-colors duration-200">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "h-5 w-5" });
      $$renderer2.push(`<!----></div></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  UsersPage as default
};
