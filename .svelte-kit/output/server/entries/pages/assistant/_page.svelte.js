import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../chunks/index2.js";
import { o as onDestroy, I as Icon } from "../../../chunks/Icon.js";
import { T as escape_html } from "../../../chunks/context.js";
function AssistantPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeSection = "overview";
    let voiceLogs = [];
    let currentRole = "family";
    let conversation = [];
    const AssistantSections = [
      {
        id: "overview",
        name: "Assistant Overview",
        tamil: "உதவியாளர் கண்ணோட்டம்",
        icon: "heroicons:sparkles",
        color: "purple"
      },
      {
        id: "voice",
        name: "Voice Assistant",
        tamil: "குரல் உதவியாளர்",
        icon: "heroicons:microphone",
        color: "blue"
      },
      {
        id: "ai",
        name: "AI Chat",
        tamil: "AI உரையாடல்",
        icon: "heroicons:chat-bubble-left-right",
        color: "green"
      },
      {
        id: "music",
        name: "Music Generation",
        tamil: "இசை உருவாக்கம்",
        icon: "heroicons:musical-note",
        color: "orange"
      },
      {
        id: "agentic",
        name: "Smart Agents",
        tamil: "புத்திசாலி முகவர்கள்",
        icon: "heroicons:cpu-chip",
        color: "red"
      }
    ];
    const roles = {
      paati: {
        name: "Paati",
        icon: "heroicons:sparkles",
        color: "emerald",
        description: "Gentle care and spiritual guidance",
        avatar: "���"
      },
      appa: {
        name: "Appa",
        icon: "heroicons:user",
        color: "blue",
        description: "Practical planning and task management",
        avatar: "���"
      },
      amma: {
        name: "Amma",
        icon: "heroicons:heart",
        color: "purple",
        description: "Nurturing care and family coordination",
        avatar: "���"
      },
      kids: {
        name: "Kids",
        icon: "heroicons:star",
        color: "orange",
        description: "Fun learning and playful interactions",
        avatar: "���"
      },
      family: {
        name: "Family",
        icon: "heroicons:users",
        color: "indigo",
        description: "Complete family AI assistant",
        avatar: "���‍���‍���‍���"
      }
    };
    onDestroy(() => {
    });
    AssistantSections.find((s) => s.id === activeSection);
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"><div class="container mx-auto px-4 py-6"><div class="bg-white rounded-xl shadow-lg p-6 mb-6"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="bg-purple-100 p-3 rounded-lg">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8 text-purple-600" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900">��� AI Assistant &amp; Voice</h1> <p class="text-lg text-gray-600">AI உதவியாளர் &amp; குரல்</p> <p class="text-sm text-gray-500">Intelligent voice assistant and AI companions for your family</p></div></div> <div class="flex space-x-2"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(roles));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [roleId, role] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${stringify(currentRole === roleId ? "bg-purple-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}`)}><span class="text-lg">${escape_html(role.avatar)}</span> <span class="font-medium">${escape_html(role.name)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Voice Commands</p> <p class="text-2xl font-bold">${escape_html(voiceLogs.length)}</p> <p class="text-xs opacity-75">குரல் கட்டளைகள்</p></div> `);
    Icon($$renderer2, { icon: "heroicons:microphone", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">AI Conversations</p> <p class="text-2xl font-bold">${escape_html(conversation.length)}</p> <p class="text-xs opacity-75">AI உரையாடல்கள்</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-8 h-8 opacity-80"
    });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Active Role</p> <p class="text-2xl font-bold">${escape_html(roles[currentRole]?.avatar)}</p> <p class="text-xs opacity-75">${escape_html(roles[currentRole]?.name)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:cpu-chip", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div> <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white"><div class="flex items-center justify-between"><div><p class="text-sm opacity-90">Status</p> <p class="text-2xl font-bold">���</p> <p class="text-xs opacity-75">${escape_html("Sleeping")}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-8 h-8 opacity-80" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white rounded-xl shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">`);
    Icon($$renderer2, { icon: "heroicons:bars-3", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Assistant Sections <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span></h3> <nav class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(AssistantSections);
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
    $$renderer2.push(`<!--]--></nav> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4> <div class="space-y-2"><button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">`);
    Icon($$renderer2, { icon: "heroicons:microphone", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Voice Command</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">`);
    Icon($$renderer2, { icon: "heroicons:bolt", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Wake AI</span></button> <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100">`);
    Icon($$renderer2, { icon: "heroicons:musical-note", class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Generate Music</span></button></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white rounded-xl shadow-lg p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-2xl font-bold text-gray-900">Assistant Overview</h2> <span class="text-sm text-gray-500">உதவியாளர் கண்ணோட்டம்</span></div> <div class="bg-purple-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-purple-900 mb-3">Current AI Role</h3> <div class="flex items-center space-x-4"><span class="text-4xl">${escape_html(roles[currentRole]?.avatar)}</span> <div><h4 class="text-xl font-bold text-gray-900">${escape_html(roles[currentRole]?.name)}</h4> <p class="text-gray-600">${escape_html(roles[currentRole]?.description)}</p></div></div></div> <div class="bg-blue-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-blue-900 mb-3">Recent Voice Commands</h3> <div class="space-y-3"><!--[-->`);
      const each_array_2 = ensure_array_like(voiceLogs.slice(0, 5));
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let log = each_array_2[$$index_2];
        $$renderer2.push(`<div class="bg-white p-3 rounded-lg shadow-sm"><div class="flex items-center justify-between mb-1"><span class="text-sm text-gray-500">${escape_html(log.timestamp)}</span> <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${escape_html(log.language === "ta" ? "தமிழ்" : "English")}</span></div> <p class="text-gray-900">${escape_html(log.text)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="bg-green-50 rounded-lg p-4"><h3 class="text-lg font-semibold text-green-900 mb-3">Recent AI Conversations</h3> <div class="space-y-3"><!--[-->`);
      const each_array_3 = ensure_array_like(conversation.slice(-3));
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let msg = each_array_3[$$index_3];
        $$renderer2.push(`<div class="flex items-start space-x-3"><div class="flex-shrink-0">`);
        if (msg.role === "user") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">`);
          Icon($$renderer2, { icon: "heroicons:user", class: "w-4 h-4 text-white" });
          $$renderer2.push(`<!----></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="text-2xl">${escape_html(roles[currentRole]?.avatar)}</span>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="flex-1"><p class="text-sm text-gray-500">${escape_html(msg.timestamp)}</p> <p class="text-gray-900">${escape_html(msg.content)}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div>`);
  });
}
function _page($$renderer) {
  AssistantPage($$renderer);
}
export {
  _page as default
};
