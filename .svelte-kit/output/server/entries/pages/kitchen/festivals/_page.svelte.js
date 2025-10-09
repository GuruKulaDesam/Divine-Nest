import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function FestivalsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredFestivals;
    let festivals = [
      {
        id: 1,
        name: "Pongal",
        tamilName: "பொங்கல்",
        date: "2024-01-14",
        category: "Harvest",
        description: "Harvest festival celebrating the sun and new crops",
        traditions: ["Boiling rice", "Drawing kolam", "Feeding cows"],
        status: "upcoming"
      },
      {
        id: 2,
        name: "Deepavali",
        tamilName: "தீபாவளி",
        date: "2024-10-31",
        category: "Festival of Lights",
        description: "Festival of lights celebrating victory of good over evil",
        traditions: ["Lighting lamps", "Fireworks", "Sweets distribution"],
        status: "upcoming"
      },
      {
        id: 3,
        name: "Thai Pongal",
        tamilName: "தைப்பொங்கல்",
        date: "2024-01-15",
        category: "Harvest",
        description: "Second day of Pongal festival",
        traditions: ["Rice boiling", "Family gatherings", "Traditional games"],
        status: "upcoming"
      }
    ];
    let searchQuery = "";
    let selectedCategory = "all";
    let categories = [
      { id: "all", name: "All Categories" },
      { id: "harvest", name: "Harvest Festivals" },
      { id: "religious", name: "Religious Festivals" },
      { id: "cultural", name: "Cultural Festivals" },
      { id: "seasonal", name: "Seasonal Festivals" }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "upcoming":
          return "bg-blue-100 text-blue-800";
        case "ongoing":
          return "bg-green-100 text-green-800";
        case "completed":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getCategoryColor(category) {
      switch (category.toLowerCase()) {
        case "harvest":
          return "bg-amber-100 text-amber-800";
        case "religious":
          return "bg-purple-100 text-purple-800";
        case "cultural":
          return "bg-pink-100 text-pink-800";
        case "seasonal":
          return "bg-green-100 text-green-800";
        default:
          return "bg-blue-100 text-blue-800";
      }
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    }
    filteredFestivals = festivals.filter((festival) => {
      const matchesSearch = festival.name.toLowerCase().includes(searchQuery.toLowerCase()) || festival.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) || festival.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Festivals</h1> <p class="text-base-content/70 mt-1">Celebrate and track traditional festivals and celebrations</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Festival</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:calendar-star", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Festivals</div> <div class="stat-value text-primary">${escape_html(festivals.length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-blue-500">`);
    Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Upcoming</div> <div class="stat-value text-blue-500">${escape_html(festivals.filter((f) => f.status === "upcoming").length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-green-500">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Completed</div> <div class="stat-value text-green-500">${escape_html(festivals.filter((f) => f.status === "completed").length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-purple-500">`);
    Icon($$renderer2, { icon: "mdi:firework", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">This Month</div> <div class="stat-value text-purple-500">${escape_html(festivals.filter((f) => {
      const festivalDate = new Date(f.date);
      const now = /* @__PURE__ */ new Date();
      return festivalDate.getMonth() === now.getMonth() && festivalDate.getFullYear() === now.getFullYear();
    }).length)}</div></div></div> <div class="bg-base-100 rounded-lg p-4 shadow"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Festivals</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name or description..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
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
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Status`);
        });
        $$renderer3.option({ value: "upcoming" }, ($$renderer4) => {
          $$renderer4.push(`Upcoming`);
        });
        $$renderer3.option({ value: "ongoing" }, ($$renderer4) => {
          $$renderer4.push(`Ongoing`);
        });
        $$renderer3.option({ value: "completed" }, ($$renderer4) => {
          $$renderer4.push(`Completed`);
        });
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredFestivals);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let festival = each_array_1[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><div><h3 class="card-title text-lg">${escape_html(festival.name)}</h3> <p class="text-sm text-base-content/70">${escape_html(festival.tamilName)}</p></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-2"><div class="flex items-center gap-2">`);
      Icon($$renderer2, { icon: "mdi:calendar", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span class="text-sm">${escape_html(formatDate(festival.date))}</span></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, { icon: "mdi:tag", class: "w-4 h-4 text-base-content/60" });
      $$renderer2.push(`<!----> <span${attr_class(`badge badge-sm ${stringify(getCategoryColor(festival.category))}`)}>${escape_html(festival.category)}</span></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: "mdi:information",
        class: "w-4 h-4 text-base-content/60"
      });
      $$renderer2.push(`<!----> <span${attr_class(`badge badge-sm ${stringify(getStatusColor(festival.status))}`)}>${escape_html(festival.status)}</span></div></div> <p class="text-sm text-base-content/80 mt-3 line-clamp-2">${escape_html(festival.description)}</p> `);
      if (festival.traditions && festival.traditions.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-3"><p class="text-xs font-medium text-base-content/70 mb-1">Traditions:</p> <div class="flex flex-wrap gap-1"><!--[-->`);
        const each_array_2 = ensure_array_like(festival.traditions.slice(0, 3));
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let tradition = each_array_2[$$index_1];
          $$renderer2.push(`<span class="badge badge-xs badge-outline">${escape_html(tradition)}</span>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (festival.traditions.length > 3) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="badge badge-xs badge-outline">+${escape_html(festival.traditions.length - 3)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredFestivals.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:calendar-star",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/70">No festivals found</h3> <p class="text-base-content/50 mt-1">Try adjusting your search or filter criteria</p></div>`);
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
  FestivalsPage($$renderer);
}
export {
  _page as default
};
