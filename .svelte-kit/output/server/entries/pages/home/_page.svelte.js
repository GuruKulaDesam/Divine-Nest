import { a as ensure_array_like, b as attr_class, s as stringify, h as head } from "../../../chunks/index2.js";
import "../../../chunks/database.js";
import "../../../chunks/home.js";
import { T as escape_html } from "../../../chunks/context.js";
function HomeDashboard($$renderer) {
  let activeTab = "overview";
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "grocery", label: "Grocery & Pantry", icon: "🛒" },
    { id: "chores", label: "Chores & Flow", icon: "🧹" },
    { id: "repairs", label: "Repairs & Maintenance", icon: "🔧" },
    { id: "emergency", label: "Emergency Services", icon: "🚨" }
  ];
  $$renderer.push(`<div class="bg-white rounded-lg shadow-lg p-6"><div class="flex flex-wrap gap-2 mb-6 border-b border-orange-200 pb-4"><!--[-->`);
  const each_array = ensure_array_like(tabs);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tab = each_array[$$index];
    $$renderer.push(`<button${attr_class(`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(activeTab === tab.id ? "bg-orange-500 text-white shadow-md" : "bg-orange-50 text-orange-700 hover:bg-orange-100")}`)}><span class="text-lg">${escape_html(tab.icon)}</span> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
  }
  $$renderer.push(`<!--]--></div> <div class="min-h-[600px]">`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200"><div class="flex items-center gap-3"><div class="text-2xl">🛒</div> <div><h3 class="font-semibold text-blue-800">Pantry Items</h3> <p class="text-2xl font-bold text-blue-600">24</p> <p class="text-sm text-blue-600">Low stock: 3</p></div></div></div> <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200"><div class="flex items-center gap-3"><div class="text-2xl">✅</div> <div><h3 class="font-semibold text-green-800">Today's Chores</h3> <p class="text-2xl font-bold text-green-600">8/12</p> <p class="text-sm text-green-600">Completed</p></div></div></div> <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200"><div class="flex items-center gap-3"><div class="text-2xl">🔧</div> <div><h3 class="font-semibold text-yellow-800">Pending Repairs</h3> <p class="text-2xl font-bold text-yellow-600">2</p> <p class="text-sm text-yellow-600">High priority</p></div></div></div> <div class="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200"><div class="flex items-center gap-3"><div class="text-2xl">🚨</div> <div><h3 class="font-semibold text-red-800">Emergency Ready</h3> <p class="text-2xl font-bold text-red-600">95%</p> <p class="text-sm text-red-600">Last checked: Today</p></div></div></div></div> <div class="mt-8"><h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><button class="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center gap-3"><span class="text-2xl">🛒</span> <div class="text-left"><div class="font-semibold">Add Grocery Item</div> <div class="text-sm opacity-90">Update pantry inventory</div></div></button> <button class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center gap-3"><span class="text-2xl">🧹</span> <div class="text-left"><div class="font-semibold">Assign Chore</div> <div class="text-sm opacity-90">Create family task</div></div></button> <button class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors duration-200 flex items-center gap-3"><span class="text-2xl">🚨</span> <div class="text-left"><div class="font-semibold">Emergency Call</div> <div class="text-sm opacity-90">Quick access contacts</div></div></button></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Home &amp; Household - South Indian Family Life App</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Manage your South Indian household with grocery tracking, chores, repairs, and emergency services"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50"><div class="container mx-auto px-4 py-8"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-orange-800 mb-2">🏠 Home &amp; Household</h1> <p class="text-lg text-orange-600">Managing traditional South Indian family life with care and harmony</p></div> `);
    HomeDashboard($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
