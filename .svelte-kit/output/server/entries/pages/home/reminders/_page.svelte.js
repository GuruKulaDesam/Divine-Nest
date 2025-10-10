import "clsx";
import { b as attr_class, d as attr, c as store_get, a as ensure_array_like, s as stringify, j as attr_style, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import "../../../../chunks/dexie-db.js";
import { w as writable } from "../../../../chunks/index.js";
import { T as escape_html } from "../../../../chunks/context.js";
function RemindersPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let reminders = writable([]);
    let isGenerating = false;
    function getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "text-red-400 border-red-400/30 bg-red-400/10";
        case "medium":
          return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
        case "low":
          return "text-green-400 border-green-400/30 bg-green-400/10";
        default:
          return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      }
    }
    function getTypeIcon(type) {
      switch (type) {
        case "note":
          return "📝";
        case "event":
          return "📅";
        case "followup":
          return "🔄";
        default:
          return "🔔";
      }
    }
    $$renderer2.push(`<div class="reminders-page min-h-screen nature-background p-6 svelte-tnd5ji" style="--background-png: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')"><div class="max-w-6xl mx-auto"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3"><span class="text-5xl">🔔</span> Smart Reminders</h1> <p class="text-white/70 text-lg">AI-powered reminders generated from your notes and calendar</p></div> <div class="flex justify-center mb-6 gap-4"><button${attr_class(`btn btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${stringify("")}`, "svelte-tnd5ji")}${attr("disabled", isGenerating, true)}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="text-green-400">✨</span> Generate Reminders`);
    }
    $$renderer2.push(`<!--]--></button> <button class="btn btn-secondary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300"><span class="text-purple-400">➕</span> Create Manual</button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$reminders", reminders).length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$reminders", reminders));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let reminder = each_array[$$index];
        $$renderer2.push(`<div class="reminder-card backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 svelte-tnd5ji"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><span class="text-2xl">${escape_html(getTypeIcon(reminder.type))}</span> <div><h3 class="text-white font-semibold text-lg">${escape_html(reminder.title)}</h3> <span class="text-xs text-white/60 uppercase tracking-wide">${escape_html(reminder.source)}</span></div></div> <div class="flex items-center gap-2">`);
        if (reminder.type === "manual") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn btn-ghost btn-sm text-white/60 hover:text-white"${attr("title", reminder.isActive ? "Disable reminder" : "Enable reminder")}>${escape_html(reminder.isActive ? "🔊" : "🔇")}</button> <button class="btn btn-primary btn-sm"${attr("disabled", !reminder.isActive, true)} title="Trigger notification">${escape_html(reminder.notificationType === "sound" ? "🔊" : reminder.notificationType === "sms" ? "📱" : "📞")}</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <button class="btn btn-ghost btn-sm text-white/60 hover:text-red-400" aria-label="Dismiss reminder">✕</button></div></div> <p class="text-white/80 mb-4 leading-relaxed">${escape_html(reminder.description)}</p> `);
        if (reminder.type === "manual") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mb-4 p-3 bg-white/5 rounded-lg border border-white/10"><div class="flex items-center gap-2 text-sm text-white/70"><span class="font-medium">Notification:</span> <span class="px-2 py-1 bg-white/10 rounded text-xs">${escape_html(reminder.notificationType === "sound" ? "🔊 Sound + Browser" : reminder.notificationType === "sms" ? "📱 SMS" : "📞 Call")} `);
          if (reminder.phoneNumber) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`(${escape_html(reminder.phoneNumber)})`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></span> <span${attr_class(`ml-auto text-xs ${stringify(reminder.isActive ? "text-green-400" : "text-red-400")}`)}>${escape_html(reminder.isActive ? "Active" : "Inactive")}</span></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><div class="flex items-center gap-2"><span${attr_class(`px-3 py-1 rounded-full text-xs font-medium border ${stringify(getPriorityColor(reminder.priority))}`, "svelte-tnd5ji")}>${escape_html(reminder.priority.toUpperCase())}</span> <span class="text-white/60 text-sm">Due: ${escape_html(new Date(reminder.dueDate).toLocaleDateString())} `);
        if (reminder.dueTime) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`at ${escape_html(reminder.dueTime)}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></div> <div class="w-4 h-4 rounded-full shadow-lg"${attr_style(`background-color: ${stringify(reminder.color)}`)}></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="text-center py-16"><div class="text-8xl mb-6 text-white/20">🔔</div> <h3 class="text-2xl font-semibold text-white mb-2">No Reminders Yet</h3> <p class="text-white/60 mb-6">Create some notes or calendar events to generate smart reminders</p> <button class="btn btn-primary btn-lg shadow-xl"><span class="text-blue-400">🔍</span> Analyze Content</button></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  RemindersPage($$renderer);
}
export {
  _page as default
};
