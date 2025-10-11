import "clsx";
import { h as head, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function FreshPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredItems, stats;
    let freshItems = [
      {
        id: 1,
        name: "Fresh Vegetables",
        tamilName: "புதிய காய்கறிகள்",
        category: "vegetables",
        quantity: 25,
        unit: "kg",
        expiryDate: "2024-01-15",
        location: "refrigerator",
        status: "fresh",
        notes: "Organic vegetables from local farm"
      },
      {
        id: 2,
        name: "Fresh Fruits",
        tamilName: "புதிய பழங்கள்",
        category: "fruits",
        quantity: 15,
        unit: "kg",
        expiryDate: "2024-01-12",
        location: "fruit basket",
        status: "fresh",
        notes: "Seasonal fruits"
      },
      {
        id: 3,
        name: "Fresh Milk",
        tamilName: "புதிய பால்",
        category: "dairy",
        quantity: 5,
        unit: "liters",
        expiryDate: "2024-01-10",
        location: "refrigerator",
        status: "expiring_soon",
        notes: "Full cream milk"
      }
    ];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedLocation = "all";
    let selectedStatus = "all";
    const categories = [
      { id: "vegetables", name: "Vegetables", tamil: "காய்கறிகள்" },
      { id: "fruits", name: "Fruits", tamil: "பழங்கள்" },
      { id: "dairy", name: "Dairy", tamil: "பால் பொருட்கள்" },
      { id: "meat", name: "Meat", tamil: "இறைச்சி" },
      { id: "seafood", name: "Seafood", tamil: "கடல் உணவு" },
      { id: "eggs", name: "Eggs", tamil: "முட்டைகள்" },
      {
        id: "bread",
        name: "Bread & Bakery",
        tamil: "ரொட்டி மற்றும் பேக்கரி"
      },
      { id: "other", name: "Other", tamil: "மற்றவை" }
    ];
    const locations = [
      {
        id: "refrigerator",
        name: "Refrigerator",
        tamil: "குளிர்சாதனப் பெட்டி"
      },
      { id: "freezer", name: "Freezer", tamil: "முட்டைப் பெட்டி" },
      { id: "pantry", name: "Pantry", tamil: "உணவு அறை" },
      { id: "counter", name: "Counter", tamil: "மேசை" },
      { id: "fruit_basket", name: "Fruit Basket", tamil: "பழக் கூடை" }
    ];
    const statuses = [
      {
        id: "fresh",
        name: "Fresh",
        color: "text-green-600 bg-green-100"
      },
      {
        id: "expiring_soon",
        name: "Expiring Soon",
        color: "text-yellow-600 bg-yellow-100"
      },
      {
        id: "expired",
        name: "Expired",
        color: "text-red-600 bg-red-100"
      }
    ];
    function getStatusColor(status) {
      const statusObj = statuses.find((s) => s.id === status);
      return statusObj ? statusObj.color : "text-gray-600 bg-gray-100";
    }
    function getCategoryName(categoryId) {
      const category = categories.find((c) => c.id === categoryId);
      return category ? category.name : categoryId;
    }
    function getLocationName(locationId) {
      const location = locations.find((l) => l.id === locationId);
      return location ? location.name : locationId;
    }
    filteredItems = freshItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      const matchesLocation = selectedLocation === "all";
      const matchesStatus = selectedStatus === "all";
      return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
    });
    stats = {
      total: freshItems.length,
      fresh: freshItems.filter((item) => item.status === "fresh").length,
      expiringSoon: freshItems.filter((item) => item.status === "expiring_soon").length,
      expired: freshItems.filter((item) => item.status === "expired").length
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Fresh Items - Home Maker</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Fresh Items</h1> <p class="text-base-content/70 mt-1">Manage fresh groceries and perishable items</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Fresh Item</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:package-variant", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Items</div> <div class="stat-value text-primary">${escape_html(stats.total)}</div></div> <div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-green-600">`);
    Icon($$renderer2, { icon: "mdi:leaf", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Fresh</div> <div class="stat-value text-green-600">${escape_html(stats.fresh)}</div></div> <div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-yellow-600">`);
    Icon($$renderer2, { icon: "mdi:clock-outline", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Expiring Soon</div> <div class="stat-value text-yellow-600">${escape_html(stats.expiringSoon)}</div></div> <div class="stat bg-base-100 shadow rounded-box"><div class="stat-figure text-red-600">`);
    Icon($$renderer2, { icon: "mdi:alert-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Expired</div> <div class="stat-value text-red-600">${escape_html(stats.expired)}</div></div></div> <div class="bg-base-100 p-4 rounded-box shadow"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Items</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
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
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Location</span></label> `);
    $$renderer2.select(
      {
        value: selectedLocation,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Locations`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(locations);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let location = each_array_1[$$index_1];
          $$renderer3.option({ value: location.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(location.name)}`);
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
        const each_array_2 = ensure_array_like(statuses);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let status = each_array_2[$$index_2];
          $$renderer3.option({ value: status.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(status.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_3 = ensure_array_like(filteredItems);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let item = each_array_3[$$index_3];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start"><div class="flex-1"><h3 class="card-title text-lg">${escape_html(item.name)}</h3> <p class="text-sm text-base-content/70">${escape_html(item.tamilName)}</p></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-2 mt-4"><div class="flex justify-between items-center"><span class="text-sm font-medium">Quantity:</span> <span class="badge badge-outline">${escape_html(item.quantity)} ${escape_html(item.unit)}</span></div> <div class="flex justify-between items-center"><span class="text-sm font-medium">Category:</span> <span class="badge badge-primary">${escape_html(getCategoryName(item.category))}</span></div> <div class="flex justify-between items-center"><span class="text-sm font-medium">Location:</span> <span class="badge badge-secondary">${escape_html(getLocationName(item.location))}</span></div> <div class="flex justify-between items-center"><span class="text-sm font-medium">Expiry:</span> <span class="text-sm">${escape_html(item.expiryDate)}</span></div> <div class="flex justify-between items-center"><span class="text-sm font-medium">Status:</span> <span${attr_class(`badge ${stringify(getStatusColor(item.status))}`)}>${escape_html(statuses.find((s) => s.id === item.status)?.name)}</span></div></div> `);
      if (item.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-4 p-3 bg-base-200 rounded-lg"><p class="text-sm text-base-content/80">${escape_html(item.notes)}</p></div>`);
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
        icon: "mdi:package-variant-closed",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/70">No fresh items found</h3> <p class="text-base-content/50 mt-1">Try adjusting your filters or add a new item</p></div>`);
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
  FreshPage($$renderer);
}
export {
  _page as default
};
