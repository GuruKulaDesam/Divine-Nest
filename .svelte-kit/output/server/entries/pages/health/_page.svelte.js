import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify, j as attr_style } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { T as escape_html } from "../../../chunks/context.js";
function HealthPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeSection = "overview";
    let selectedMember = "all";
    const HealthSections = [
      {
        id: "overview",
        name: "Health Overview",
        tamil: "உடல் நல கண்ணோட்டம்",
        icon: "heroicons:shield-check",
        color: "green"
      },
      {
        id: "fitness",
        name: "Fitness & Activity",
        tamil: "உடற்பயிற்சி & செயல்பாடு",
        icon: "heroicons:cursor-arrow-rays",
        color: "blue"
      },
      {
        id: "wellness",
        name: "Wellness & Sleep",
        tamil: "நலன் & தூக்கம்",
        icon: "heroicons:moon",
        color: "purple"
      },
      {
        id: "womens",
        name: "Women's Health",
        tamil: "பெண்கள் உடல் நலன்",
        icon: "heroicons:heart",
        color: "pink"
      },
      {
        id: "medical",
        name: "Medical Records",
        tamil: "மருத்துவ பதிவுகள்",
        icon: "heroicons:clipboard-document-list",
        color: "red"
      }
    ];
    const FamilyMembers = [
      {
        id: "all",
        name: "All Family",
        tamil: "குடும்பம் முழுவதும்",
        avatar: "���‍���‍���‍���"
      },
      { id: "father", name: "Father", tamil: "தந்தை", avatar: "���" },
      { id: "mother", name: "Mother", tamil: "தாய்", avatar: "���" },
      { id: "son", name: "Son", tamil: "மகன்", avatar: "���" },
      {
        id: "daughter",
        name: "Daughter",
        tamil: "மகள்",
        avatar: "���"
      }
    ];
    HealthSections.find((s) => s.id === activeSection);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-green-100 p-3 rounded-lg">`);
    Icon($$renderer2, {
      icon: "heroicons:shield-check",
      class: "w-8 h-8 text-green-600"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">��� Health &amp; Wellness</h1> <p class="text-lg text-gray-600">உடல் நலன் &amp; நலன்</p> <p class="text-sm text-gray-500">Track fitness, wellness, and family health metrics</p></div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(FamilyMembers);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let member = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(selectedMember === member.id ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}><span class="text-lg">${escape_html(member.avatar)}</span> <span class="font-medium">${escape_html(member.name)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Steps Today</p> <p class="text-2xl font-bold">${escape_html(0)}</p> <p class="text-xs opacity-75">இன்றைய அடிகள்</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:cursor-arrow-rays",
      class: "w-8 h-8 opacity-80"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Sleep Hours</p> <p class="text-2xl font-bold">${escape_html(0)}h</p> <p class="text-xs opacity-75">தூக்க நேரம்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:moon", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Water Intake</p> <p class="text-2xl font-bold">${escape_html(0)}/8</p> <p class="text-xs opacity-75">நீர் அளவு</p></div> `);
    Icon($$renderer2, { icon: "heroicons:beaker", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Heart Rate</p> <p class="text-2xl font-bold">${escape_html(0)}</p> <p class="text-xs opacity-75">இதய துடிப்பு</p></div> `);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bars-3", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Health Sections <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span></h3> <nav class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(HealthSections);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${stringify(activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : "text-gray-600 hover:bg-gray-50")}`)}>`);
      Icon($$renderer2, { icon: section.icon, class: "w-5 h-5 flex-shrink-0" });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><p class="font-medium truncate">${escape_html(section.name)}</p> <p class="text-xs opacity-75 truncate">${escape_html(section.tamil)}</p></div> `);
      if (activeSection === section.id) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:chevron-right", class: "w-4 h-4" });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4> <div class="space-y-2"><button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Log Activity</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">`);
    Icon($$renderer2, { icon: "heroicons:beaker", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Add Water</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">`);
    Icon($$renderer2, { icon: "heroicons:moon", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Log Sleep</span></button></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white rounded-xl shadow-lg p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900">Health Overview</h2> <span class="text-sm text-gray-500">உடல் நல கண்ணோட்டம்</span></div> <div class="bg-green-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-green-900 mb-3">Today's Health Summary</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center space-x-3 mb-2">`);
      Icon($$renderer2, {
        icon: "heroicons:cursor-arrow-rays",
        class: "w-6 h-6 text-blue-600"
      });
      $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600">Steps</p> <p class="text-xl font-bold text-gray-900">${escape_html(0)}</p></div></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full"${attr_style(`width: ${stringify(0 / 1e4 * 100)}%`)}></div></div> <p class="text-xs text-gray-500 mt-1">Goal: 10,000</p></div> <div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center space-x-3 mb-2">`);
      Icon($$renderer2, { icon: "heroicons:fire", class: "w-6 h-6 text-orange-600" });
      $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600">Calories</p> <p class="text-xl font-bold text-gray-900">${escape_html(0)}</p></div></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-orange-600 h-2 rounded-full"${attr_style(`width: ${stringify(0 / 2e3 * 100)}%`)}></div></div> <p class="text-xs text-gray-500 mt-1">Goal: 2,000</p></div> <div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center space-x-3 mb-2">`);
      Icon($$renderer2, { icon: "heroicons:moon", class: "w-6 h-6 text-purple-600" });
      $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600">Sleep</p> <p class="text-xl font-bold text-gray-900">${escape_html(0)}h</p></div></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-purple-600 h-2 rounded-full"${attr_style(`width: ${stringify(0 / 8 * 100)}%`)}></div></div> <p class="text-xs text-gray-500 mt-1">Goal: 8 hours</p></div> <div class="bg-white p-4 rounded-lg shadow-sm"><div class="flex items-center space-x-3 mb-2">`);
      Icon($$renderer2, { icon: "heroicons:beaker", class: "w-6 h-6 text-blue-600" });
      $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600">Water</p> <p class="text-xl font-bold text-gray-900">${escape_html(0)}</p></div></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full"${attr_style(`width: ${stringify(0 / 8 * 100)}%`)}></div></div> <p class="text-xs text-gray-500 mt-1">Goal: 8 glasses</p></div></div></div> <div class="bg-blue-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-blue-900 mb-3">Health Insights</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-900 mb-2">Blood Pressure</h4> <div class="text-2xl font-bold text-green-600">${escape_html("120/80")}</div> <p class="text-sm text-gray-500">Normal range</p></div> <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-900 mb-2">Weight</h4> <div class="text-2xl font-bold text-blue-600">${escape_html(0)}kg</div> <p class="text-sm text-gray-500">-0.5kg this week</p></div></div></div> <div class="bg-purple-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-purple-900 mb-3">Today's Wellness Tips</h3> <div class="space-y-3"><div class="bg-white p-3 rounded-lg shadow-sm"><p class="text-gray-900">��� Stay hydrated! You've had ${escape_html(0)} glasses today.</p></div> <div class="bg-white p-3 rounded-lg shadow-sm"><p class="text-gray-900">���‍♂️ Great job on steps! Keep up the activity for better health.</p></div> <div class="bg-white p-3 rounded-lg shadow-sm"><p class="text-gray-900">��� Your sleep quality is excellent. Maintain this routine.</p></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div>`);
  });
}
function _page($$renderer) {
  HealthPage($$renderer);
}
export {
  _page as default
};
