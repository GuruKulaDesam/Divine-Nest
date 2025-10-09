import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { e as escape_html } from "../../../../chunks/context.js";
function KidsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let kidsItems = [
      {
        id: 1,
        name: "Milk",
        tamilName: "பால்",
        category: "dairy",
        quantity: 2,
        unit: "liters",
        expiryDate: "2024-01-15",
        status: "fresh",
        notes: "Fresh cow milk"
      },
      {
        id: 2,
        name: "Bread",
        tamilName: "ரொட்டி",
        category: "bakery",
        quantity: 1,
        unit: "loaf",
        expiryDate: "2024-01-10",
        status: "expiring",
        notes: "Whole wheat bread"
      },
      {
        id: 3,
        name: "Apples",
        tamilName: "ஆப்பிள்",
        category: "fruits",
        quantity: 6,
        unit: "pieces",
        expiryDate: "2024-01-20",
        status: "fresh",
        notes: "Red delicious apples"
      }
    ];
    let filteredItems = [...kidsItems];
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedStatus = "all";
    const categories = [
      { id: "dairy", name: "Dairy", tamil: "பால் பொருட்கள்" },
      { id: "bakery", name: "Bakery", tamil: "அப்பம் பொருட்கள்" },
      { id: "fruits", name: "Fruits", tamil: "பழங்கள்" },
      { id: "vegetables", name: "Vegetables", tamil: "காய்கறிகள்" },
      { id: "snacks", name: "Snacks", tamil: "தின்பண்டங்கள்" },
      { id: "beverages", name: "Beverages", tamil: "பானங்கள்" }
    ];
    const statusOptions = [
      { id: "fresh", name: "Fresh", color: "text-green-600" },
      {
        id: "expiring",
        name: "Expiring Soon",
        color: "text-yellow-600"
      },
      { id: "expired", name: "Expired", color: "text-red-600" }
    ];
    function getStatusColor(status) {
      const statusOption = statusOptions.find((s) => s.id === status);
      return statusOption ? statusOption.color : "text-gray-600";
    }
    function getDaysUntilExpiry(expiryDate) {
      if (!expiryDate) return null;
      const today = /* @__PURE__ */ new Date();
      const expiry = new Date(expiryDate);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays;
    }
    {
      filteredItems = kidsItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all";
        const matchesStatus = selectedStatus === "all";
        return matchesSearch && matchesCategory && matchesStatus;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content">Kids Items</h1> <p class="text-base-content/60 mt-1">Manage items for kids - food, snacks, and essentials</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Item</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-primary">`);
    Icon($$renderer2, { icon: "mdi:baby", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Total Items</div> <div class="stat-value text-primary">${escape_html(
      // Update expiry status based on current date
      kidsItems.length
    )}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-green-600">`);
    Icon($$renderer2, { icon: "mdi:check-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Fresh Items</div> <div class="stat-value text-green-600">${escape_html(kidsItems.filter((item) => item.status === "fresh").length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-yellow-600">`);
    Icon($$renderer2, { icon: "mdi:clock-alert", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Expiring Soon</div> <div class="stat-value text-yellow-600">${escape_html(kidsItems.filter((item) => item.status === "expiring").length)}</div></div> <div class="stat bg-base-100 rounded-lg shadow"><div class="stat-figure text-red-600">`);
    Icon($$renderer2, { icon: "mdi:alert-circle", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div class="stat-title">Expired Items</div> <div class="stat-value text-red-600">${escape_html(kidsItems.filter((item) => item.status === "expired").length)}</div></div></div> <div class="bg-base-100 rounded-lg p-4 shadow"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Items</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by name..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
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
        const each_array_1 = ensure_array_like(statusOptions);
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
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex justify-between items-start"><div class="flex-1"><h3 class="card-title text-lg">${escape_html(item.name)}</h3> `);
      if (item.tamilName) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-base-content/60">${escape_html(item.tamilName)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-2 mt-4"><div class="flex justify-between items-center"><span class="text-sm font-medium">Category:</span> <span class="badge badge-outline">${escape_html(categories.find((c) => c.id === item.category)?.name || item.category)}</span></div> <div class="flex justify-between items-center"><span class="text-sm font-medium">Quantity:</span> <span class="text-sm">${escape_html(item.quantity)} ${escape_html(item.unit)}</span></div> `);
      if (item.expiryDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-between items-center"><span class="text-sm font-medium">Expiry:</span> <span${attr_class(`text-sm ${stringify(getStatusColor(item.status))}`)}>${escape_html(new Date(item.expiryDate).toLocaleDateString())} `);
        if (getDaysUntilExpiry(item.expiryDate) !== null) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`(${escape_html(getDaysUntilExpiry(item.expiryDate) < 0 ? "Expired" : `${getDaysUntilExpiry(item.expiryDate)} days`)})`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex justify-between items-center"><span class="text-sm font-medium">Status:</span> <span${attr_class(`badge ${stringify(item.status === "fresh" ? "badge-success" : item.status === "expiring" ? "badge-warning" : "badge-error")}`)}>${escape_html(statusOptions.find((s) => s.id === item.status)?.name || item.status)}</span></div></div> `);
      if (item.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-4 p-3 bg-base-200 rounded-lg"><p class="text-sm text-base-content/70">${escape_html(item.notes)}</p></div>`);
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
        icon: "mdi:baby",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/60">No items found</h3> <p class="text-base-content/40 mt-1">Try adjusting your search or filters</p></div>`);
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
  KidsPage($$renderer);
}
export {
  _page as default
};
