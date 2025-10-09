import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { e as escape_html } from "../../../chunks/context.js";
function PantryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let totalItems, lowStockItems, expiredItems, totalValue;
    let pantryItems = [
      {
        id: 1,
        name: "Rice",
        tamilName: "அரிசி",
        category: "Grains",
        quantity: 25,
        unit: "kg",
        expiryDate: "2024-12-31",
        status: "Available",
        location: "Kitchen Shelf",
        notes: "Basmati rice"
      },
      {
        id: 2,
        name: "Sugar",
        tamilName: "சர்க்கரை",
        category: "Sweeteners",
        quantity: 5,
        unit: "kg",
        expiryDate: "2025-06-30",
        status: "Low Stock",
        location: "Pantry",
        notes: "White sugar"
      }
    ];
    let filteredItems = [...pantryItems];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    const categories = [
      { id: "all", name: "All Categories" },
      { id: "grains", name: "Grains" },
      { id: "spices", name: "Spices" },
      { id: "oils", name: "Oils" },
      { id: "sweeteners", name: "Sweeteners" },
      { id: "canned", name: "Canned Goods" },
      { id: "beverages", name: "Beverages" },
      { id: "snacks", name: "Snacks" },
      { id: "other", name: "Other" }
    ];
    const statusOptions = [
      { id: "all", name: "All Status" },
      { id: "available", name: "Available" },
      { id: "low-stock", name: "Low Stock" },
      { id: "expired", name: "Expired" },
      { id: "out-of-stock", name: "Out of Stock" }
    ];
    function getStatusColor(status) {
      switch (status.toLowerCase()) {
        case "available":
          return "bg-green-100 text-green-800";
        case "low stock":
          return "bg-yellow-100 text-yellow-800";
        case "expired":
          return "bg-red-100 text-red-800";
        case "out of stock":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
    function getCategoryColor(category) {
      const colors = {
        "grains": "bg-amber-100 text-amber-800",
        "spices": "bg-red-100 text-red-800",
        "oils": "bg-orange-100 text-orange-800",
        "sweeteners": "bg-pink-100 text-pink-800",
        "canned": "bg-blue-100 text-blue-800",
        "beverages": "bg-cyan-100 text-cyan-800",
        "snacks": "bg-purple-100 text-purple-800",
        "other": "bg-gray-100 text-gray-800"
      };
      return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
    }
    {
      filteredItems = pantryItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        const matchesStatus = selectedStatus === "all";
        return matchesSearch && matchesCategory && matchesStatus;
      });
    }
    totalItems = pantryItems.length;
    lowStockItems = pantryItems.filter((item) => item.status === "Low Stock").length;
    expiredItems = pantryItems.filter((item) => new Date(item.expiryDate) < /* @__PURE__ */ new Date()).length;
    totalValue = pantryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Pantry Management</h1> <p class="text-base-content/70 mt-1">Manage your household pantry items and inventory</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Item</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:package-variant", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Items</div> <div class="stat-value text-primary">${escape_html(totalItems)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-warning">`);
    Icon($$renderer2, { icon: "mdi:alert-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Low Stock</div> <div class="stat-value text-warning">${escape_html(lowStockItems)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-error">`);
    Icon($$renderer2, { icon: "mdi:calendar-alert", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Expired</div> <div class="stat-value text-error">${escape_html(expiredItems)}</div></div> <div class="stat bg-base-100 shadow rounded-lg"><div class="stat-figure text-info">`);
    Icon($$renderer2, { icon: "mdi:scale-balance", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Quantity</div> <div class="stat-value text-info">${escape_html(totalValue.toFixed(1))}</div></div></div> <div class="bg-base-100 p-4 rounded-lg shadow"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Items</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name..." class="input input-bordered"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
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
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Status</span></label> `);
    $$renderer2.select({ value: selectedStatus, class: "select select-bordered" }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(statusOptions);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let status = each_array_1[$$index_1];
        $$renderer3.option({ value: status.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(status.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text opacity-0">Actions</span></label> <button class="btn btn-outline btn-block">Clear Filters</button></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredItems);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start mb-3"><div><h3 class="card-title text-lg">${escape_html(item.name)}</h3> `);
      if (item.tamilName) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70">${escape_html(item.tamilName)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-2"><div class="flex justify-between items-center"><span${attr_class(`badge ${stringify(getCategoryColor(item.category))}`)}>${escape_html(item.category)}</span> <span${attr_class(`badge ${stringify(getStatusColor(item.status))}`)}>${escape_html(item.status)}</span></div> <div class="flex justify-between text-sm"><span>Quantity:</span> <span class="font-semibold">${escape_html(item.quantity)} ${escape_html(item.unit)}</span></div> <div class="flex justify-between text-sm"><span>Expiry:</span> <span class="font-semibold">${escape_html(new Date(item.expiryDate).toLocaleDateString())}</span></div> `);
      if (item.location) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-between text-sm"><span>Location:</span> <span class="font-semibold">${escape_html(item.location)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/70 mt-2">${escape_html(item.notes)}</p>`);
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
        icon: "mdi:package-variant-closed",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold text-base-content/70">No pantry items found</h3> <p class="text-base-content/50">Try adjusting your search or filters</p></div>`);
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
  PantryPage($$renderer);
}
export {
  _page as default
};
