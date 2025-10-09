import { c as store_get, u as unsubscribe_stores, a as ensure_array_like, d as attr, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { D as DeleteConfirmationModal } from "./DeleteConfirmationModal.js";
import { e as escape_html } from "./context.js";
function ProfilePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let profileStats;
    let profile = {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "Full-stack developer with 5+ years of experience in web technologies. Passionate about creating user-friendly applications and solving complex problems.",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      languages: ["English", "Spanish"],
      joinDate: "2023-01-15",
      lastActive: (/* @__PURE__ */ new Date()).toISOString()
    };
    let showDeleteModal = false;
    let recentActivity = [
      {
        id: 1,
        type: "login",
        description: "Logged in from San Francisco, CA",
        timestamp: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
        icon: "heroicons:computer-desktop"
      },
      {
        id: 2,
        type: "profile_update",
        description: "Updated profile information",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString(),
        icon: "heroicons:pencil-square"
      },
      {
        id: 3,
        type: "password_change",
        description: "Changed password",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString(),
        icon: "heroicons:key"
      },
      {
        id: 4,
        type: "login",
        description: "Logged in from New York, NY",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 2).toISOString(),
        icon: "heroicons:computer-desktop"
      }
    ];
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    function formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }
    function getActivityIcon(activity) {
      return activity.icon;
    }
    function getActivityColor(activity) {
      switch (activity.type) {
        case "login":
          return "text-primary";
        case "profile_update":
          return "text-success";
        case "password_change":
          return "text-warning";
        default:
          return "text-base-content";
      }
    }
    profileStats = [
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("profile.days_active"),
        value: Math.floor(((/* @__PURE__ */ new Date()).getTime() - new Date(profile.joinDate).getTime()) / (1e3 * 60 * 60 * 24)).toString(),
        icon: "heroicons:calendar-days",
        color: "text-primary"
      },
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("profile.projects_completed"),
        value: "24",
        icon: "heroicons:check-circle",
        color: "text-success"
      },
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("profile.tasks_completed"),
        value: "156",
        icon: "heroicons:clipboard-document-check",
        color: "text-secondary"
      },
      {
        name: store_get($$store_subs ??= {}, "$_", $format)("profile.team_members"),
        value: "8",
        icon: "heroicons:users",
        color: "text-accent"
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-6"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
      Icon($$renderer3, {
        icon: "heroicons:user-circle",
        class: "w-full h-full text-primary"
      });
      $$renderer3.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
      Icon($$renderer3, {
        icon: "heroicons:identification",
        class: "w-full h-full text-secondary"
      });
      $$renderer3.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.title"))}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.description"))}</p></div> <div class="flex items-center space-x-3"><button class="btn btn-outline shadow-md hover:shadow-lg group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
      Icon($$renderer3, { icon: "heroicons:bell", class: "w-5 h-5 mr-2" });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.notifications"))}</div></button> <button class="btn btn-primary shadow-md hover:shadow-lg group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
      Icon($$renderer3, {
        icon: "heroicons:pencil-square",
        class: "w-5 h-5 mr-2"
      });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.edit"))}</div></button></div></div></div> <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"><div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">`);
      Icon($$renderer3, { icon: "heroicons:calendar-days", class: "w-6 h-6 text-white" });
      $$renderer3.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">${escape_html(profileStats[0].name)}</p> <p class="text-2xl font-bold text-base-content">${escape_html(profileStats[0].value)}</p></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">`);
      Icon($$renderer3, { icon: "heroicons:check-circle", class: "w-6 h-6 text-white" });
      $$renderer3.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">${escape_html(profileStats[1].name)}</p> <p class="text-2xl font-bold text-base-content">${escape_html(profileStats[1].value)}</p></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-sm">`);
      Icon($$renderer3, {
        icon: "heroicons:clipboard-document-check",
        class: "w-6 h-6 text-white"
      });
      $$renderer3.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">${escape_html(profileStats[2].name)}</p> <p class="text-2xl font-bold text-base-content">${escape_html(profileStats[2].value)}</p></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-sm">`);
      Icon($$renderer3, { icon: "heroicons:users", class: "w-6 h-6 text-white" });
      $$renderer3.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">${escape_html(profileStats[3].name)}</p> <p class="text-2xl font-bold text-base-content">${escape_html(profileStats[3].value)}</p></div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body"><div class="flex items-center justify-between mb-6"><h2 class="card-title text-xl flex items-center"><div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3">`);
      Icon($$renderer3, { icon: "heroicons:user", class: "w-4 h-4 text-primary" });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.basic_information"))}</h2> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="form-control"><label class="label"><span class="label-text font-medium">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.full_name"))}</span></label> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-base-content">${escape_html(profile.name)}</p>`);
      }
      $$renderer3.push(`<!--]--></div> <div class="form-control"><label class="label"><span class="label-text font-medium">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.email"))}</span></label> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-base-content">${escape_html(profile.email)}</p>`);
      }
      $$renderer3.push(`<!--]--></div> <div class="form-control"><label class="label"><span class="label-text font-medium">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.phone"))}</span></label> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-base-content">${escape_html(profile.phone)}</p>`);
      }
      $$renderer3.push(`<!--]--></div> <div class="form-control"><label class="label"><span class="label-text font-medium">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.location"))}</span></label> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-base-content">${escape_html(profile.location)}</p>`);
      }
      $$renderer3.push(`<!--]--></div> <div class="form-control md:col-span-2"><label class="label"><span class="label-text font-medium">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.bio"))}</span></label> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-base-content">${escape_html(profile.bio)}</p>`);
      }
      $$renderer3.push(`<!--]--></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body"><h2 class="card-title text-xl mb-6 flex items-center"><div class="w-8 h-8 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center mr-3">`);
      Icon($$renderer3, { icon: "heroicons:academic-cap", class: "w-4 h-4 text-accent" });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.skills_languages"))}</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h3 class="text-lg font-medium text-base-content mb-3">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.skills"))}</h3> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        const each_array_1 = ensure_array_like(profile.skills);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let skill = each_array_1[$$index_1];
          $$renderer3.push(`<div class="badge badge-primary">${escape_html(skill)}</div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div> <div><h3 class="text-lg font-medium text-base-content mb-3">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.languages"))}</h3> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        const each_array_3 = ensure_array_like(profile.languages);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let language = each_array_3[$$index_3];
          $$renderer3.push(`<div class="badge badge-secondary">${escape_html(language)}</div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div></div></div></div></div> <div class="space-y-6"><div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body text-center"><div class="relative inline-block"><div class="avatar"><div class="w-24 rounded-full ring-4 ring-primary/20 ring-offset-base-100 ring-offset-2 shadow-lg"><img${attr("src", profile.avatar)}${attr("alt", profile.name)}/></div></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <h3 class="text-lg font-semibold text-base-content mt-4">${escape_html(profile.name)}</h3> <p class="text-base-content/60">${escape_html(profile.role)}</p> <p class="text-sm text-base-content/40">${escape_html(profile.department)}</p> <div class="divider"></div> <div class="space-y-3"><div class="flex items-center space-x-3"><div class="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">`);
      Icon($$renderer3, {
        icon: "heroicons:calendar-days",
        class: "w-4 h-4 text-primary"
      });
      $$renderer3.push(`<!----></div> <div class="text-left"><p class="text-sm font-medium text-base-content">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.member_since"))}</p> <p class="text-sm text-base-content/60">${escape_html(formatDate(profile.joinDate))}</p></div></div> <div class="flex items-center space-x-3"><div class="w-8 h-8 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center">`);
      Icon($$renderer3, { icon: "heroicons:clock", class: "w-4 h-4 text-accent" });
      $$renderer3.push(`<!----></div> <div class="text-left"><p class="text-sm font-medium text-base-content">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.last_active"))}</p> <p class="text-sm text-base-content/60">${escape_html(formatTime(profile.lastActive))}</p></div></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body"><h3 class="card-title text-lg mb-4 flex items-center"><div class="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2">`);
      Icon($$renderer3, { icon: "heroicons:bolt", class: "w-3 h-3 text-primary" });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.quick_actions"))}</h3> <div class="space-y-3"><button class="btn btn-outline w-full justify-start hover:bg-primary hover:text-white transition-all duration-200">`);
      Icon($$renderer3, { icon: "heroicons:key", class: "w-5 h-5 mr-2" });
      $$renderer3.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.change_password"))}</button> <button class="btn btn-outline w-full justify-start hover:bg-secondary hover:text-white transition-all duration-200">`);
      Icon($$renderer3, { icon: "heroicons:bell", class: "w-5 h-5 mr-2" });
      $$renderer3.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.notification_settings"))}</button> <button class="btn btn-outline w-full justify-start hover:bg-accent hover:text-white transition-all duration-200">`);
      Icon($$renderer3, { icon: "heroicons:camera", class: "w-5 h-5 mr-2" });
      $$renderer3.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.change_avatar"))}</button> <button class="btn btn-error text-white w-full justify-start hover:shadow-lg transition-all duration-200">`);
      Icon($$renderer3, { icon: "heroicons:trash", class: "w-5 h-5 mr-2" });
      $$renderer3.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.delete_account"))}</button></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body"><h3 class="card-title text-lg mb-4 flex items-center"><div class="w-6 h-6 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center mr-2">`);
      Icon($$renderer3, { icon: "heroicons:clock", class: "w-3 h-3 text-accent" });
      $$renderer3.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("profile.recent_activity"))}</h3> <div class="space-y-4"><!--[-->`);
      const each_array_4 = ensure_array_like(recentActivity);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let activity = each_array_4[$$index_4];
        $$renderer3.push(`<div class="flex items-start space-x-3"><div class="flex-shrink-0"><div class="avatar placeholder"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">`);
        Icon($$renderer3, {
          icon: getActivityIcon(activity),
          class: `w-4 h-4 ${stringify(getActivityColor(activity))}`
        });
        $$renderer3.push(`<!----></div></div></div> <div class="flex-1 min-w-0"><p class="text-sm text-base-content">${escape_html(activity.description)}</p> <p class="text-xs text-base-content/60">${escape_html(formatTime(activity.timestamp))}</p></div></div>`);
      }
      $$renderer3.push(`<!--]--></div></div></div></div></div></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      DeleteConfirmationModal($$renderer3, {
        title: store_get($$store_subs ??= {}, "$_", $format)("profile.delete_account_title"),
        message: store_get($$store_subs ??= {}, "$_", $format)("profile.delete_account_message"),
        itemName: profile.name,
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
  ProfilePage as default
};
