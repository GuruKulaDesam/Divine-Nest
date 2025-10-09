import "clsx";
import { d as attr, a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/runtime.js";
import { e as escape_html } from "../../../chunks/context.js";
function InventoryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredInventory;
    let inventory = [
      {
        id: 1,
        name: "Rice (25kg)",
        category: "Groceries",
        quantity: 5,
        unit: "bags",
        minStock: 2,
        location: "Kitchen Storage",
        expiryDate: "2024-06-15",
        supplier: "Local Market",
        cost: 1200
      },
      {
        id: 2,
        name: "Milk (1L)",
        category: "Dairy",
        quantity: 12,
        unit: "packets",
        minStock: 6,
        location: "Refrigerator",
        expiryDate: "2024-01-20",
        supplier: "Amul",
        cost: 60
      },
      {
        id: 3,
        name: "Toilet Paper",
        category: "Household",
        quantity: 3,
        unit: "packs",
        minStock: 5,
        location: "Bathroom Cabinet",
        expiryDate: null,
        supplier: "Big Bazaar",
        cost: 200
      }
    ];
    let filterCategory = "";
    let searchQuery = "";
    function getCategoryIcon(category) {
      const icons = {
        "Groceries": "heroicons:shopping-bag",
        "Dairy": "heroicons:beaker",
        "Household": "heroicons:home",
        "Electronics": "heroicons:cpu-chip",
        "Clothing": "heroicons:shirt",
        "Books": "heroicons:book-open",
        "Other": "heroicons:ellipsis-horizontal"
      };
      return icons[category] || icons["Other"];
    }
    function getStockStatus(quantity, minStock) {
      if (quantity <= minStock) return "low-stock";
      if (quantity <= minStock * 1.5) return "medium-stock";
      return "good-stock";
    }
    function getStockBadge(status) {
      switch (status) {
        case "low-stock":
          return "badge-error";
        case "medium-stock":
          return "badge-warning";
        case "good-stock":
          return "badge-success";
        default:
          return "badge-neutral";
      }
    }
    function getTotalValue() {
      return inventory.reduce((total, item) => total + item.quantity * item.cost, 0);
    }
    function getLowStockItems() {
      return inventory.filter((item) => item.quantity <= item.minStock).length;
    }
    filteredInventory = inventory.filter((item) => {
      return true;
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content">Inventory Management</h1> <p class="text-base-content/70 mt-2">Track household and personal items</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Add Item</button></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-blue-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:cube", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Items</h3> <p class="text-2xl font-bold text-blue-600">${escape_html(inventory.length)}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-green-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-6 h-6 text-green-600" });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Total Value</h3> <p class="text-2xl font-bold text-green-600">₹${escape_html(getTotalValue().toLocaleString())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-yellow-100 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-yellow-600"
    });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Low Stock</h3> <p class="text-2xl font-bold text-yellow-600">${escape_html(getLowStockItems())}</p></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex items-center"><div class="p-3 bg-purple-100 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-6 h-6 text-purple-600" });
    $$renderer2.push(`<!----></div> <div class="ml-4"><h3 class="font-semibold text-base-content">Expiring Soon</h3> <p class="text-2xl font-bold text-purple-600">2</p></div></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="flex flex-wrap gap-4"><div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select(
      {
        value: filterCategory,
        class: "select select-bordered select-sm"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`Groceries`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`Dairy`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`Household`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`Electronics`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`Clothing`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`Books`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Search</span></label> <input type="text"${attr("value", searchQuery)} class="input input-bordered input-sm" placeholder="Search items..."/></div></div></div></div> <div class="card bg-base-100 shadow-lg"><div class="card-body"><div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th>Item</th><th>Category</th><th>Quantity</th><th>Min Stock</th><th>Location</th><th>Expiry Date</th><th>Cost</th><th>Status</th><th>Actions</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(filteredInventory);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      const stockStatus = getStockStatus(item.quantity, item.minStock);
      $$renderer2.push(`<tr><td><div class="flex items-center">`);
      Icon($$renderer2, { icon: getCategoryIcon(item.category), class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> <div><div class="font-semibold">${escape_html(item.name)}</div> <div class="text-sm text-base-content/70">${escape_html(item.supplier)}</div></div></div></td><td>${escape_html(item.category)}</td><td class="font-semibold">${escape_html(item.quantity)} ${escape_html(item.unit)}</td><td>${escape_html(item.minStock)} ${escape_html(item.unit)}</td><td class="text-sm">${escape_html(item.location)}</td><td class="text-sm">`);
      if (item.expiryDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html(item.expiryDate)}`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-base-content/50">N/A</span>`);
      }
      $$renderer2.push(`<!--]--></td><td>₹${escape_html(item.cost)}</td><td><span${attr_class(`badge ${stringify(getStockBadge(stockStatus))}`)}>${escape_html(stockStatus === "low-stock" ? "Low Stock" : stockStatus === "medium-stock" ? "Medium" : "Good")}</span></td><td><div class="flex gap-2"><button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="btn btn-sm btn-ghost">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button> <button class="btn btn-sm btn-ghost text-red-600">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4" });
      $$renderer2.push(`<!----></button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  InventoryPage($$renderer);
}
export {
  _page as default
};
