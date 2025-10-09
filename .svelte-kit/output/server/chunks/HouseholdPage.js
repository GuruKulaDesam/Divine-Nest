import { b as attr_class, a as ensure_array_like, d as attr, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function HouseholdPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let groceryList = [
      {
        item: "Rice",
        quantity: "5 kg",
        category: "Staples",
        inStock: true
      },
      {
        item: "Dal",
        quantity: "2 kg",
        category: "Staples",
        inStock: false
      },
      {
        item: "Tomatoes",
        quantity: "1 kg",
        category: "Vegetables",
        inStock: true
      },
      {
        item: "Onions",
        quantity: "2 kg",
        category: "Vegetables",
        inStock: true
      }
    ];
    let chores = [
      {
        id: 1,
        task: "Kitchen cleaning",
        assignedTo: "Amma",
        completed: true,
        streak: 7
      },
      {
        id: 2,
        task: "Sweep courtyard",
        assignedTo: "Akka",
        completed: false,
        streak: 3
      },
      {
        id: 3,
        task: "Water plants",
        assignedTo: "Appa",
        completed: true,
        streak: 15
      },
      {
        id: 4,
        task: "Organize library",
        assignedTo: "Paati",
        completed: false,
        streak: 0
      }
    ];
    let pantryItems = [
      {
        name: "Rice",
        stock: "15 kg",
        expiry: "2025-12-01",
        category: "Grains"
      },
      {
        name: "Turmeric powder",
        stock: "200g",
        expiry: "2025-11-15",
        category: "Spices"
      },
      {
        name: "Coconut oil",
        stock: "2 bottles",
        expiry: "2026-01-20",
        category: "Oils"
      },
      {
        name: "Jaggery",
        stock: "500g",
        expiry: "2025-10-30",
        category: "Sweets"
      }
    ];
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold text-base-content mb-2">🏠 Household Management</h1> <p class="text-base-content/60">Manage grocery, chores, pantry inventory and daily household flow</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Pending Grocery</p> <p class="text-2xl font-bold text-orange-500">${escape_html(groceryList.filter((item) => !item.inStock).length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:shopping-cart",
      class: "w-8 h-8 text-orange-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Pending Chores</p> <p class="text-2xl font-bold text-blue-500">${escape_html(chores.filter((chore) => !chore.completed).length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Pantry Items</p> <p class="text-2xl font-bold text-green-500">${escape_html(pantryItems.length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:archive-box",
      class: "w-8 h-8 text-green-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Expiring Soon</p> <p class="text-2xl font-bold text-red-500">2</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-8 h-8 text-red-500"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:shopping-cart", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Grocery &amp; Inventory</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Chores &amp; Flow</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Today's Chores</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(chores);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let chore = each_array[$$index];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-base-200 rounded-lg"><div class="flex items-center space-x-3"><input type="checkbox" class="checkbox checkbox-primary"${attr("checked", chore.completed, true)}/> <div><p class="font-medium text-base-content">${escape_html(chore.task)}</p> <p class="text-sm text-base-content/60">Assigned to: ${escape_html(chore.assignedTo)}</p></div></div> <div class="flex items-center space-x-2"><span class="text-sm text-orange-500">🔥 ${escape_html(chore.streak)}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Urgent Grocery</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(groceryList.filter((item) => !item.inStock));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"><div><p class="font-medium text-red-700">${escape_html(item.item)}</p> <p class="text-sm text-red-500">${escape_html(item.quantity)} - ${escape_html(item.category)}</p></div> <button class="btn btn-sm btn-primary">Add to Cart</button></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  HouseholdPage as default
};
