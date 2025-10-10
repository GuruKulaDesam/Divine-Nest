import "clsx";
import { k as bind_props, b as attr_class, a as ensure_array_like, s as stringify, c as store_get, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { t as todos, n as notes, r as reminders } from "../../../../chunks/reminders.js";
import { f as fallback } from "../../../../chunks/utils2.js";
import { T as escape_html } from "../../../../chunks/context.js";
function ShivoHUDSimple($$renderer, $$props) {
  let transcript = fallback($$props["transcript"], "");
  let emotion = fallback($$props["emotion"], "");
  $$renderer.push(`<div class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80"><h3 class="text-lg font-bold mb-2">🎙️ Shivo Listening</h3> <p class="text-sm">🗣️ ${escape_html(transcript)}</p> <p class="text-xs text-gray-500 mt-1">🧘 Mood: ${escape_html(emotion)}</p></div>`);
  bind_props($$props, { transcript, emotion });
}
function ShivoAIPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentTranscript = "";
    let currentEmotion = "neutral";
    let activeTab = "overview";
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50"><div class="bg-white shadow-lg"><div class="max-w-7xl mx-auto px-4 py-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">🧠 சிவோ AI உதவியாளர் <span${attr_class(`text-sm px-2 py-1 rounded-full ${stringify("bg-gray-100 text-gray-600")}`)}>${escape_html("தூங்குகிறது")}</span></h1> <p class="text-sm text-gray-600">${escape_html("'சிவோ' என்று கூப்பிட்டு என்னை எழுப்புங்கள்")}</p></div></div> <button${attr_class(`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${stringify("bg-orange-500 text-white hover:bg-orange-600")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:microphone", class: "w-5 h-5" });
    $$renderer2.push(`<!----> ${escape_html("குரல் கட்டளை")}</button></div></div></div> <div class="max-w-7xl mx-auto px-4 py-8"><div class="flex gap-2 mb-8 overflow-x-auto"><!--[-->`);
    const each_array = ensure_array_like([
      { id: "overview", label: "மேலோட்டம்", icon: "heroicons:home" },
      {
        id: "todos",
        label: "பட்டியல்",
        icon: "heroicons:check-circle"
      },
      {
        id: "notes",
        label: "குறிப்புகள்",
        icon: "heroicons:chat-bubble-left"
      },
      {
        id: "reminders",
        label: "நினைவூட்டல்கள்",
        icon: "heroicons:clock"
      },
      {
        id: "events",
        label: "நிகழ்வுகள்",
        icon: "heroicons:calendar"
      },
      {
        id: "recordings",
        label: "பதிவுகள்",
        icon: "heroicons:microphone"
      }
    ]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${stringify(activeTab === tab.id ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(tab.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center gap-3 mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:check-circle",
        class: "w-8 h-8 text-green-500"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold">பட்டியல்</h3></div> <p class="text-3xl font-bold text-gray-800">${escape_html(store_get($$store_subs ??= {}, "$todos", todos).filter((t) => !t.completed).length)}</p> <p class="text-sm text-gray-600">நிறைவேறாத பணிகள்</p></div> <div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center gap-3 mb-4">`);
      Icon($$renderer2, {
        icon: "heroicons:chat-bubble-left",
        class: "w-8 h-8 text-blue-500"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold">குறிப்புகள்</h3></div> <p class="text-3xl font-bold text-gray-800">${escape_html(store_get($$store_subs ??= {}, "$notes", notes).length)}</p> <p class="text-sm text-gray-600">இன்றைய குறிப்புகள்</p></div> <div class="bg-white rounded-xl shadow-lg p-6"><div class="flex items-center gap-3 mb-4">`);
      Icon($$renderer2, { icon: "heroicons:clock", class: "w-8 h-8 text-purple-500" });
      $$renderer2.push(`<!----> <h3 class="text-lg font-semibold">நினைவூட்டல்கள்</h3></div> <p class="text-3xl font-bold text-gray-800">${escape_html(store_get($$store_subs ??= {}, "$reminders", reminders).filter((r) => !r.completed).length)}</p> <p class="text-sm text-gray-600">செயலில் உள்ளவை</p></div> <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3"><h3 class="text-lg font-semibold mb-4">🎙️ குரல் கட்டளைகள்</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-2"><p class="font-medium text-gray-800">பட்டியல்:</p> <p class="text-sm text-gray-600">"பட்டியல் சேர் வீடு சுத்தம் செய்"</p> <p class="text-sm text-gray-600">"add todo buy groceries"</p></div> <div class="space-y-2"><p class="font-medium text-gray-800">குறிப்புகள்:</p> <p class="text-sm text-gray-600">"குறிப்பு இன்று மழை வரும்"</p> <p class="text-sm text-gray-600">"note meeting at 3pm"</p></div> <div class="space-y-2"><p class="font-medium text-gray-800">நினைவூட்டல்கள்:</p> <p class="text-sm text-gray-600">"நினைவூட்டு மருந்து குடி"</p> <p class="text-sm text-gray-600">"remind doctor appointment"</p></div> <div class="space-y-2"><p class="font-medium text-gray-800">உணர்வுகள்:</p> <p class="text-sm text-gray-600">"நான் மகிழ்ச்சியாக இருக்கிறேன்"</p> <p class="text-sm text-gray-600">"I'm stressed"</p></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    ShivoHUDSimple($$renderer2, { transcript: currentTranscript, emotion: currentEmotion });
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  ShivoAIPage($$renderer);
}
export {
  _page as default
};
