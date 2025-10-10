import "clsx";
import { h as head, b as attr_class, s as stringify, a as ensure_array_like } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/shivo.js";
import { e as escape_html } from "../../../chunks/context.js";
function ShivoAgenticPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentRole = "family";
    let conversation = [];
    let systemStatus = "initializing";
    let agentStats = { activeAgents: 0, memoryItems: 0, plansCreated: 0 };
    const roles = {
      paati: {
        name: "Paati",
        icon: "heroicons:sparkles",
        color: "emerald",
        description: "Gentle care and spiritual guidance",
        avatar: "👵"
      },
      appa: {
        name: "Appa",
        icon: "heroicons:user",
        color: "blue",
        description: "Practical planning and task management",
        avatar: "👨"
      },
      amma: {
        name: "Amma",
        icon: "heroicons:heart",
        color: "purple",
        description: "Nurturing care and family coordination",
        avatar: "👩"
      },
      kids: {
        name: "Kids",
        icon: "heroicons:star",
        color: "orange",
        description: "Fun learning and playful interactions",
        avatar: "👶"
      },
      family: {
        name: "Family",
        icon: "heroicons:users",
        color: "green",
        description: "Unified family assistance",
        avatar: "👨‍👩‍👧‍👦"
      }
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Shivo Agentic AI - Smart Family Assistant</title>`);
      });
    });
    $$renderer2.push(`<!---->/** * Shivo Agentic AI Page - Main interface for the agentic AI system * Provides role-aware interactions and autonomous agent coordination */ <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50"><div class="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10"><div class="max-w-6xl mx-auto px-6 py-4"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-2xl font-bold text-gray-800">Shivo Agentic AI</h1> <p class="text-sm text-gray-600">Your intelligent family assistant</p></div></div> <div class="flex items-center gap-4"><div class="flex items-center gap-2 text-sm"><div${attr_class(`w-2 h-2 rounded-full ${stringify("bg-yellow-500")}`)}></div> <span class="text-gray-600 capitalize">${escape_html(systemStatus)}</span></div> <div class="text-xs text-gray-500">${escape_html(agentStats.activeAgents)} agents • ${escape_html(agentStats.memoryItems)} memories</div></div></div></div></div> <div class="max-w-6xl mx-auto p-6"><div class="grid grid-cols-1 lg:grid-cols-4 gap-6"><div class="lg:col-span-1"><div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"><h3 class="text-lg font-semibold text-gray-800 mb-4">Family Roles</h3> <div class="space-y-3"><!--[-->`);
    const each_array = ensure_array_like(Object.entries(roles));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [roleKey, role] = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${stringify(currentRole === roleKey ? `border-${role.color}-500 bg-${role.color}-50` : "border-gray-200 hover:border-gray-300")}`)}><div class="flex items-center gap-3"><div class="text-2xl">${escape_html(role.avatar)}</div> <div><div class="font-medium text-gray-800">${escape_html(role.name)}</div> <div class="text-xs text-gray-600">${escape_html(role.description)}</div></div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-medium text-gray-700 mb-3">Agent Activity</h4> <div class="space-y-2 text-xs text-gray-600"><div class="flex justify-between"><span>Active Agents:</span> <span class="font-medium">${escape_html(agentStats.activeAgents)}</span></div> <div class="flex justify-between"><span>Memory Items:</span> <span class="font-medium">${escape_html(agentStats.memoryItems)}</span></div> <div class="flex justify-between"><span>Plans Created:</span> <span class="font-medium">${escape_html(agentStats.plansCreated)}</span></div></div></div></div></div> <div class="lg:col-span-3"><div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"><div class="p-6 border-b border-gray-200"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="text-2xl">${escape_html(roles[currentRole]?.avatar)}</div> <div><h2 class="text-xl font-semibold text-gray-800">${escape_html(roles[currentRole]?.name)} Mode</h2> <p class="text-sm text-gray-600">${escape_html(roles[currentRole]?.description)}</p></div></div> <div class="flex gap-2"><button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:information-circle", class: "w-4 h-4" });
    $$renderer2.push(`<!----> Capabilities</button> <button class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:play", class: "w-4 h-4" });
    $$renderer2.push(`<!----> Demo Autonomy</button></div></div></div> <div class="h-96 overflow-y-auto p-6 space-y-4 svelte-13nmn" id="conversation"><!--[-->`);
    const each_array_1 = ensure_array_like(conversation);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let message = each_array_1[$$index_1];
      $$renderer2.push(`<div${attr_class(`flex ${stringify(message.speaker === "user" ? "justify-end" : "justify-start")}`)}><div${attr_class(`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${stringify(message.speaker === "user" ? "bg-blue-500 text-white" : message.type === "error" ? "bg-red-100 text-red-800" : message.type === "system" ? "bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-800")}`)}>`);
      if (message.type === "emotion") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-2"><span class="text-lg">😊</span> <span>${escape_html(message.message)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (message.type === "action") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-2">`);
          Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4" });
          $$renderer2.push(`<!----> <span>${escape_html(message.message)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="whitespace-pre-wrap">${escape_html(message.message)}</div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <div class="text-xs opacity-70 mt-1">${escape_html(message.timestamp.toLocaleTimeString())}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="p-6 border-t border-gray-200"><div class="flex gap-3"><input id="text-input" type="text" placeholder="Type your message or say 'Shivo' to wake me..." class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/> <button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200 flex items-center gap-2">`);
    Icon($$renderer2, { icon: "heroicons:paper-airplane", class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button${attr_class(`px-6 py-3 ${stringify("bg-green-500 hover:bg-green-600")} text-white rounded-xl transition-colors duration-200 flex items-center gap-2`)}>`);
    {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5" });
      $$renderer2.push(`<!----> Voice`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"><div class="flex items-center gap-3 mb-3">`);
    Icon($$renderer2, { icon: "heroicons:brain", class: "w-6 h-6 text-purple-600" });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-800">Memory Agent</h3></div> <p class="text-sm text-gray-600">Learns preferences, routines, and emotional patterns</p></div> <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"><div class="flex items-center gap-3 mb-3">`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-800">Planner Agent</h3></div> <p class="text-sm text-gray-600">Creates plans, schedules tasks, and manages routines</p></div> <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"><div class="flex items-center gap-3 mb-3">`);
    Icon($$renderer2, {
      icon: "heroicons:musical-note",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-gray-800">Music Agent</h3></div> <p class="text-sm text-gray-600">Generates personalized music and audio experiences</p></div></div></div></div></div></div>`);
  });
}
function _page($$renderer) {
  ShivoAgenticPage($$renderer);
}
export {
  _page as default
};
