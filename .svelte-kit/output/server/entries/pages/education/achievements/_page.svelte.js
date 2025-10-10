import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function AchievementsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let achievements = [
      {
        id: 1,
        title: "First Place in Science Fair",
        description: "Won first place in the district science fair for the environmental project",
        category: "Academic",
        date: "2024-03-15",
        points: 100,
        status: "completed",
        icon: "mdi:trophy",
        color: "text-yellow-500"
      },
      {
        id: 2,
        title: "Perfect Attendance",
        description: "Maintained perfect attendance for the entire academic year",
        category: "Academic",
        date: "2024-04-30",
        points: 50,
        status: "completed",
        icon: "mdi:calendar-check",
        color: "text-green-500"
      },
      {
        id: 3,
        title: "Learning Tamil Script",
        description: "Successfully learned to read and write Tamil script",
        category: "Cultural",
        date: "2024-02-20",
        points: 75,
        status: "completed",
        icon: "mdi:book-open-variant",
        color: "text-blue-500"
      },
      {
        id: 4,
        title: "Community Service",
        description: "Completed 50 hours of community service at local temple",
        category: "Service",
        date: "2024-05-10",
        points: 80,
        status: "in-progress",
        icon: "mdi:hand-heart",
        color: "text-purple-500"
      }
    ];
    let filteredAchievements = achievements;
    let searchQuery = "";
    let selectedCategory = "all";
    const categories = [
      { id: "all", name: "All Categories", icon: "mdi:view-list" },
      { id: "Academic", name: "Academic", icon: "mdi:school" },
      { id: "Cultural", name: "Cultural", icon: "mdi:account-group" },
      { id: "Sports", name: "Sports", icon: "mdi:soccer" },
      { id: "Service", name: "Service", icon: "mdi:hand-heart" },
      { id: "Arts", name: "Arts", icon: "mdi:palette" }
    ];
    const statusOptions = [
      {
        id: "completed",
        name: "Completed",
        color: "bg-green-100 text-green-800"
      },
      {
        id: "in-progress",
        name: "In Progress",
        color: "bg-blue-100 text-blue-800"
      },
      {
        id: "planned",
        name: "Planned",
        color: "bg-gray-100 text-gray-800"
      }
    ];
    function getTotalPoints() {
      return achievements.filter((a) => a.status === "completed").reduce((sum, a) => sum + a.points, 0);
    }
    function getCompletionRate() {
      if (achievements.length === 0) return 0;
      return Math.round(achievements.filter((a) => a.status === "completed").length / achievements.length * 100);
    }
    {
      filteredAchievements = achievements.filter((achievement) => {
        const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) || achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        return matchesSearch && matchesCategory;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Achievements</h1> <p class="text-base-content/60 mt-1">Track and celebrate accomplishments and milestones</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Achievement</button></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-blue-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:trophy", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Total Achievements</h3> <p class="text-2xl font-bold text-blue-600">${escape_html(achievements.length)}</p></div></div></div></div> <div class="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-green-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:star", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Points Earned</h3> <p class="text-2xl font-bold text-green-600">${escape_html(getTotalPoints())}</p></div></div></div></div> <div class="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800"><div class="card-body"><div class="flex items-center gap-3"><div class="p-3 bg-purple-500 rounded-full">`);
    Icon($$renderer2, { icon: "mdi:chart-line", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">Completion Rate</h3> <p class="text-2xl font-bold text-purple-600">${escape_html(getCompletionRate())}%</p></div></div></div></div></div> <div class="flex flex-col sm:flex-row gap-4"><div class="flex-1"><input type="text"${attr("value", searchQuery)} placeholder="Search achievements..." class="input input-bordered w-full"/></div> `);
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
    $$renderer2.push(`</div> <div class="flex flex-wrap gap-2"><!--[-->`);
    const each_array_1 = ensure_array_like(categories.slice(1));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let category = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`btn btn-sm ${stringify(selectedCategory === category.id ? "btn-primary" : "btn-outline")}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(category.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredAchievements);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let achievement = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-300"><div class="card-body"><div class="flex items-start justify-between"><div class="flex items-center gap-3"><div class="p-2 bg-base-200 rounded-lg">`);
      Icon($$renderer2, {
        icon: achievement.icon,
        class: `w-6 h-6 ${stringify(achievement.color)}`
      });
      $$renderer2.push(`<!----></div> <div><h3 class="font-semibold text-base-content">${escape_html(achievement.title)}</h3> <p class="text-sm text-base-content/60">${escape_html(achievement.category)}</p></div></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <p class="text-sm text-base-content/80 mt-2">${escape_html(achievement.description)}</p> <div class="flex items-center justify-between mt-4"><div class="flex items-center gap-2">`);
      Icon($$renderer2, { icon: "mdi:calendar", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-sm text-base-content/60">${escape_html(new Date(achievement.date).toLocaleDateString())}</span></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, { icon: "mdi:star", class: "w-4 h-4 text-yellow-500" });
      $$renderer2.push(`<!----> <span class="text-sm font-semibold text-base-content">${escape_html(achievement.points)} pts</span></div></div> <div class="mt-3"><span${attr_class(`badge ${stringify(statusOptions.find((s) => s.id === achievement.status)?.color)}`)}>${escape_html(statusOptions.find((s) => s.id === achievement.status)?.name)}</span></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredAchievements.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:trophy-outline",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/60">No achievements found</h3> <p class="text-base-content/40">Start by adding your first achievement!</p></div>`);
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
  AchievementsPage($$renderer);
}
export {
  _page as default
};
