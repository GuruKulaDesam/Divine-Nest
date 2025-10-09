import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { e as escape_html } from "../../../chunks/context.js";
function LeisurePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalItems, activeItems, completedItems, categoryStats;
    let leisureItems = [
      {
        id: 1,
        name: "Evening Walk",
        tamilName: "மாலை நடை",
        category: "Exercise",
        duration: "30 minutes",
        frequency: "Daily",
        location: "Park",
        status: "active",
        description: "Relaxing evening walk in the neighborhood park",
        notes: "Good for health and mental relaxation"
      },
      {
        id: 2,
        name: "Reading Books",
        tamilName: "புத்தகம் படித்தல்",
        category: "Education",
        duration: "1 hour",
        frequency: "Daily",
        location: "Home",
        status: "active",
        description: "Reading Tamil literature and educational books",
        notes: "Focus on Tamil classics and modern literature"
      },
      {
        id: 3,
        name: "Temple Visit",
        tamilName: "கோயில் செல்லல்",
        category: "Spiritual",
        duration: "2 hours",
        frequency: "Weekly",
        location: "Local Temple",
        status: "active",
        description: "Weekly visit to the local temple for prayers",
        notes: "Includes puja and community interaction"
      }
    ];
    let filteredItems = [...leisureItems];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    const categories = [
      { id: "all", name: "All Categories", tamil: "அனைத்து வகைகளும்" },
      { id: "exercise", name: "Exercise", tamil: "உடற்பயிற்சி" },
      { id: "education", name: "Education", tamil: "கல்வி" },
      { id: "spiritual", name: "Spiritual", tamil: "ஆன்மீகம்" },
      { id: "social", name: "Social", tamil: "சமூகம்" },
      {
        id: "entertainment",
        name: "Entertainment",
        tamil: "பொழுதுபோக்கு"
      },
      { id: "hobby", name: "Hobby", tamil: "பொழுதுபோக்கு" }
    ];
    const statuses = [
      { id: "active", name: "Active", tamil: "செயலில்" },
      { id: "inactive", name: "Inactive", tamil: "செயலற்றது" },
      { id: "completed", name: "Completed", tamil: "முடிந்தது" }
    ];
    function filterItems() {
      filteredItems = leisureItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        const matchesStatus = selectedStatus === "all";
        return matchesSearch && matchesCategory && matchesStatus;
      });
    }
    function getCategoryColor(category) {
      const colors = {
        "Exercise": "bg-green-100 text-green-800",
        "Education": "bg-blue-100 text-blue-800",
        "Spiritual": "bg-purple-100 text-purple-800",
        "Social": "bg-yellow-100 text-yellow-800",
        "Entertainment": "bg-pink-100 text-pink-800",
        "Hobby": "bg-indigo-100 text-indigo-800"
      };
      return colors[category] || "bg-gray-100 text-gray-800";
    }
    function getStatusColor(status) {
      const colors = {
        "active": "bg-green-100 text-green-800",
        "inactive": "bg-gray-100 text-gray-800",
        "completed": "bg-blue-100 text-blue-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    }
    {
      filterItems();
    }
    totalItems = leisureItems.length;
    activeItems = leisureItems.filter((item) => item.status === "active").length;
    completedItems = leisureItems.filter((item) => item.status === "completed").length;
    categoryStats = categories.slice(1).map((cat) => ({
      name: cat.name,
      count: leisureItems.filter((item) => item.category.toLowerCase() === cat.id).length
    }));
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h1 class="text-3xl font-bold text-base-content">Leisure Activities</h1> <p class="text-base-content/70 mt-1">Manage your leisure and recreational activities</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Activity</button></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:calendar-multiple", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Activities</div> <div class="stat-value text-primary">${escape_html(totalItems)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-success">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active</div> <div class="stat-value text-success">${escape_html(activeItems)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:calendar-check", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Completed</div> <div class="stat-value text-info">${escape_html(completedItems)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-warning">`);
    Icon($$renderer2, { icon: "mdi:chart-pie", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Categories</div> <div class="stat-value text-warning">${escape_html(categoryStats.filter((c) => c.count > 0).length)}</div></div></div> <div class="bg-base-100 rounded-lg p-4 shadow"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Activities</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name or description..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select(
      {
        value: selectedStatus,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Status`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(statuses);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let status = each_array_1[$$index_1];
          $$renderer3.option({ value: status.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredItems);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex items-start justify-between"><div class="flex-1"><h3 class="card-title text-lg">${escape_html(item.name)}</h3> `);
      if (item.tamilName) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70">${escape_html(item.tamilName)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="flex flex-wrap gap-2 mt-3"><span${attr_class(`badge ${stringify(getCategoryColor(item.category))} badge-sm`)}>${escape_html(item.category)}</span> <span${attr_class(`badge ${stringify(getStatusColor(item.status))} badge-sm`)}>${escape_html(statuses.find((s) => s.id === item.status)?.name)}</span></div> <div class="space-y-2 mt-4 text-sm"><div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: "mdi:clock-outline",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span>${escape_html(item.duration)}</span></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: "mdi:calendar-refresh",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span>${escape_html(item.frequency)}</span></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: "mdi:map-marker",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span>${escape_html(item.location)}</span></div></div> `);
      if (item.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/80 mt-3 line-clamp-2">${escape_html(item.description)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="alert alert-info mt-3 py-2">`);
        Icon($$renderer2, { icon: "mdi:information", class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span class="text-xs">${escape_html(item.notes)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:calendar-blank",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No leisure activities found</h3> <p class="text-base-content/50 mt-1">Try adjusting your search or filters</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
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
  LeisurePage($$renderer);
}
export {
  _page as default
};
