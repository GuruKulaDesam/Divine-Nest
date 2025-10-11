import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { a as attr } from "../../../../chunks/attributes.js";
function LifeflowPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let lifeflowItems = [
      {
        id: 1,
        name: "Morning Meditation",
        tamilName: "காலை தியானம்",
        category: "Spiritual",
        duration: "30 minutes",
        frequency: "Daily",
        location: "Home Temple",
        status: "Active",
        description: "Daily morning meditation practice",
        notes: "Focus on breathing and mindfulness"
      },
      {
        id: 2,
        name: "Evening Walk",
        tamilName: "மாலை நடை",
        category: "Physical",
        duration: "45 minutes",
        frequency: "Daily",
        location: "Park",
        status: "Active",
        description: "Evening walk for physical health",
        notes: "Walk at moderate pace"
      }
    ];
    let filteredItems = [...lifeflowItems];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    const categories = [
      { id: "all", name: "All Categories", tamil: "அனைத்து வகைகள்" },
      { id: "spiritual", name: "Spiritual", tamil: "ஆன்மீக" },
      { id: "physical", name: "Physical", tamil: "உடல்" },
      { id: "mental", name: "Mental", tamil: "மன" },
      { id: "social", name: "Social", tamil: "சமூக" },
      { id: "creative", name: "Creative", tamil: "படைப்பு" }
    ];
    const statuses = ["Active", "Inactive", "Completed", "Paused"];
    function filterItems() {
      filteredItems = lifeflowItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        const matchesStatus = selectedStatus === "all";
        return matchesSearch && matchesCategory && matchesStatus;
      });
    }
    function getCategoryColor(category) {
      const colors = {
        Spiritual: "bg-purple-100 text-purple-800",
        Physical: "bg-green-100 text-green-800",
        Mental: "bg-blue-100 text-blue-800",
        Social: "bg-orange-100 text-orange-800",
        Creative: "bg-pink-100 text-pink-800"
      };
      return colors[category] || "bg-gray-100 text-gray-800";
    }
    function getStatusColor(status) {
      const colors = {
        Active: "bg-green-100 text-green-800",
        Inactive: "bg-gray-100 text-gray-800",
        Completed: "bg-blue-100 text-blue-800",
        Paused: "bg-yellow-100 text-yellow-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    }
    {
      filterItems();
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Lifeflow Activities</h1> <p class="text-base-content/70 mt-1">Manage your daily life activities and routines</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Activity</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:flower", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Activities</div> <div class="stat-value text-primary">${escape_html(lifeflowItems.length)}</div></div> <div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-success">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Active</div> <div class="stat-value text-success">${escape_html(lifeflowItems.filter((item) => item.status === "Active").length)}</div></div> <div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:calendar-clock", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Daily</div> <div class="stat-value text-info">${escape_html(lifeflowItems.filter((item) => item.frequency === "Daily").length)}</div></div> <div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-warning">`);
    Icon($$renderer2, { icon: "mdi:meditation", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Spiritual</div> <div class="stat-value text-warning">${escape_html(lifeflowItems.filter((item) => item.category === "Spiritual").length)}</div></div></div> <div class="bg-base-100 p-4 rounded-box shadow"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label for="lifeflow-search" class="label"><span class="label-text">Search Activities</span></label> <input id="lifeflow-search" type="text"${attr("value", searchQuery)} placeholder="Search by name or description..." class="input input-bordered"/></div> <div class="form-control"><label for="lifeflow-category-filter" class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select(
      {
        id: "lifeflow-category-filter",
        value: selectedCategory,
        class: "select select-bordered"
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
    $$renderer2.push(`</div> <div class="form-control"><label for="lifeflow-status-filter" class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select(
      {
        id: "lifeflow-status-filter",
        value: selectedStatus,
        class: "select select-bordered"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Status`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(statuses);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let status = each_array_1[$$index_1];
          $$renderer3.option({ value: status }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text opacity-0">Actions</span></label> <button class="btn btn-outline gap-2">`);
    Icon($$renderer2, { icon: "mdi:filter-off", class: "w-4 h-4" });
    $$renderer2.push(`<!----> Clear Filters</button></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredItems);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><div><h3 class="card-title text-lg">${escape_html(item.name)}</h3> `);
      if (item.tamilName) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/60">${escape_html(item.tamilName)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-2"><div class="flex flex-wrap gap-2"><span${attr_class(`badge ${stringify(getCategoryColor(item.category))} badge-sm`)}>${escape_html(item.category)}</span> <span${attr_class(`badge ${stringify(getStatusColor(item.status))} badge-sm`)}>${escape_html(item.status)}</span></div> <div class="grid grid-cols-2 gap-2 text-sm"><div>`);
      Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> ${escape_html(item.duration)}</div> <div>`);
      Icon($$renderer2, { icon: "mdi:calendar-refresh", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> ${escape_html(item.frequency)}</div> <div class="col-span-2">`);
      Icon($$renderer2, { icon: "mdi:map-marker", class: "w-4 h-4 inline mr-1" });
      $$renderer2.push(`<!----> ${escape_html(item.location)}</div></div> `);
      if (item.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70 line-clamp-2">${escape_html(item.description)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:flower-outline",
        class: "w-16 h-16 mx-auto text-base-content/30 mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No activities found</h3> <p class="text-base-content/50">Try adjusting your search or filters</p></div>`);
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
  LifeflowPage($$renderer);
}
export {
  _page as default
};
