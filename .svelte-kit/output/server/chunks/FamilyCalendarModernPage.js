import "clsx";
import { a as ensure_array_like, j as attr_style, s as stringify, d as attr } from "./index2.js";
import "./dexie-db.js";
import { e as escape_html } from "./context.js";
function CalendarModern($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    window.gapi = /** @type {any} */
    window.gapi || {};
    if (typeof window !== "undefined") {
      window.gapi = /** @type {any} */
      window.gapi || {};
    }
    const today = /* @__PURE__ */ new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let events = [];
    let categories = [
      { id: "holiday", label: "Holiday", color: "#f97316" },
      { id: "work", label: "Work", color: "#0ea5e9" },
      { id: "personal", label: "Personal", color: "#f59e0b" },
      { id: "family", label: "Family", color: "#10b981" }
    ];
    let activeFilters = categories.map((c) => c.id);
    function daysInMonth(y, m) {
      return new Date(y, m + 1, 0).getDate();
    }
    function firstWeekday(y, m) {
      return new Date(y, m, 1).getDay();
    }
    function formatISO(y, m, d) {
      return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
    function pillStyle(ev) {
      const c1 = ev.color || "#0ea5e9";
      const c2 = hexToRgba(c1, 0.9);
      const shadow = hexToRgba(c1, 0.18);
      return `background: linear-gradient(135deg, ${c1}, ${c2}); box-shadow: 0 4px 10px ${shadow};`;
    }
    function parseISODate(iso) {
      const [y, m, d] = (iso || "").split("-").map(Number);
      return new Date(y, (m || 1) - 1, d || 1);
    }
    function dateToISO(dt) {
      return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    }
    function occursOn(ev, iso) {
      if (!ev) return false;
      if (ev.date === iso) return true;
      if (!ev.recurring) return false;
      const start = parseISODate(ev.date);
      const target = parseISODate(iso);
      if (ev.recurring.until) {
        const until = parseISODate(ev.recurring.until);
        if (target > until) return false;
      }
      if (target < start) return false;
      const freq = ev.recurring.freq;
      const interval = ev.recurring.interval || 1;
      if (freq === "yearly") {
        return start.getDate() === target.getDate() && start.getMonth() === target.getMonth();
      }
      if (freq === "monthly") {
        return start.getDate() === target.getDate();
      }
      if (freq === "weekly") {
        const diffDays = Math.floor((target.getTime() - start.getTime()) / 864e5);
        if (target.getDay() !== start.getDay()) return false;
        return Math.floor(diffDays / 7) % interval === 0;
      }
      return false;
    }
    function getOccurrencesBetween(ev, startDate, endDate) {
      const instances = [];
      const sd = new Date(startDate);
      const ed = new Date(endDate);
      for (let d = new Date(sd); d <= ed; d.setDate(d.getDate() + 1)) {
        const iso = dateToISO(d);
        if (occursOn(ev, iso)) instances.push({ date: iso, event: ev });
      }
      return instances;
    }
    function eventsFor(d) {
      const iso = formatISO(year, month, d);
      return events.filter((e) => {
        const cat = e.category || "personal";
        if (!activeFilters.includes(cat)) return false;
        return occursOn(e, iso);
      }).sort((a, b) => a.time ? -1 : 0);
    }
    function upcomingInstances() {
      const out = [];
      const start = /* @__PURE__ */ new Date();
      const end = /* @__PURE__ */ new Date();
      end.setDate(end.getDate() + 30);
      for (const ev of events) {
        const cat = ev.category || "personal";
        if (!activeFilters.includes(cat)) continue;
        const occ = getOccurrencesBetween(ev, start, end);
        for (const o of occ) out.push({ ...o, ev });
      }
      for (const ev of events) {
        const cat = ev.category || "personal";
        if (!activeFilters.includes(cat)) continue;
        if (!ev.recurring) {
          const d = parseISODate(ev.date);
          if (d >= start && d <= end) out.push({ date: ev.date, event: ev });
        }
      }
      out.sort((a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0);
      return out.slice(0, 6);
    }
    function hexToRgba(hex, alpha = 1) {
      if (!hex) return `rgba(0,0,0,${alpha})`;
      const h = hex.replace("#", "");
      const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
      const r = bigint >> 16 & 255;
      const g = bigint >> 8 & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    $$renderer2.push(`<div class="modern-calendar svelte-15k7b7r"><div class="action-bar backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 mb-6 shadow-xl svelte-15k7b7r"><div class="flex items-center justify-between flex-wrap gap-4 svelte-15k7b7r"><div class="flex items-center gap-4 svelte-15k7b7r"><div class="text-lg font-semibold text-white flex items-center gap-2 svelte-15k7b7r"><span class="text-blue-400 svelte-15k7b7r">📅</span> Calendar Actions</div> <div class="flex items-center gap-2 text-sm text-white/70 svelte-15k7b7r"><span class="w-2 h-2 bg-green-400 rounded-full animate-pulse svelte-15k7b7r"></span> ${escape_html(events.length)} events loaded</div></div> <div class="flex items-center gap-3 svelte-15k7b7r"><button class="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-300 svelte-15k7b7r"><span class="text-blue-400 svelte-15k7b7r">🔄</span> Google Sync</button> <button class="btn btn-secondary btn-sm shadow-lg hover:shadow-xl transition-all duration-300 svelte-15k7b7r"><span class="text-green-400 svelte-15k7b7r">💾</span> Export</button> <label class="btn btn-secondary btn-sm cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 svelte-15k7b7r"><span class="text-purple-400 svelte-15k7b7r">📁</span> Import <input type="file" accept="application/json,.ics" class="hidden svelte-15k7b7r"/></label> <button class="btn btn-warning btn-sm shadow-lg hover:shadow-xl transition-all duration-300 svelte-15k7b7r"><span class="text-orange-400 svelte-15k7b7r">🧹</span> Clean</button></div></div></div> <div class="calendar-layout grid grid-cols-12 gap-6 svelte-15k7b7r"><aside class="col-span-4 p-4 bg-base-200/80 backdrop-blur-lg rounded-lg shadow-sm border border-white/20 svelte-15k7b7r"><div class="flex items-center justify-between mb-4 svelte-15k7b7r"><div class="font-semibold text-white svelte-15k7b7r">${escape_html(
      /** @type {HTMLInputElement} */
      new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })
    )}</div> <div class="flex gap-2 svelte-15k7b7r"><button class="btn btn-ghost btn-sm text-white/80 hover:text-white hover:bg-white/10 svelte-15k7b7r" aria-label="Previous month">◀</button> <button class="btn btn-ghost btn-sm text-white/80 hover:text-white hover:bg-white/10 svelte-15k7b7r" aria-label="Next month">▶</button></div></div> <div class="mini-month grid grid-cols-7 gap-1 text-xs text-center text-white/70 svelte-15k7b7r"><!--[-->`);
    const each_array = ensure_array_like(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let wd = each_array[$$index];
      $$renderer2.push(`<div class="text-white/50 svelte-15k7b7r">${escape_html(wd)}</div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_1 = ensure_array_like(Array(firstWeekday(year, month)).fill(0));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      each_array_1[$$index_1];
      $$renderer2.push(`<div class="svelte-15k7b7r"></div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_2 = ensure_array_like(Array(daysInMonth(year, month)));
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      each_array_2[i];
      $$renderer2.push(`<div class="py-1 px-1 rounded hover:bg-white/10 cursor-pointer text-white/80 hover:text-white transition-colors svelte-15k7b7r" role="button" tabindex="0">${escape_html(i + 1)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-4 svelte-15k7b7r"><h4 class="font-medium mb-2 text-white svelte-15k7b7r">Upcoming</h4> <div class="space-y-2 text-sm svelte-15k7b7r"><!--[-->`);
    const each_array_3 = ensure_array_like(upcomingInstances());
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let inst = each_array_3[$$index_3];
      $$renderer2.push(`<div class="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 svelte-15k7b7r"><div class="w-2 h-2 rounded-full svelte-15k7b7r"${attr_style(`background:${stringify(inst.event.color)}`)}></div> <div class="truncate text-white/80 svelte-15k7b7r">${escape_html(inst.event.title)} <span class="text-xs text-white/60 svelte-15k7b7r">${escape_html(inst.date)}${escape_html(inst.event.time ? ` • ${inst.event.time}` : "")}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></aside> <main class="col-span-8 p-6 calendar-container svelte-15k7b7r"><div class="flex items-center justify-between mb-6 svelte-15k7b7r"><div class="text-2xl font-bold calendar-header svelte-15k7b7r">Calendar</div> <div class="flex items-center gap-3 svelte-15k7b7r"><button class="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-300 svelte-15k7b7r"><span class="text-green-400 svelte-15k7b7r">+</span> Add Event</button> <div class="text-sm text-white/70 font-medium svelte-15k7b7r">Month view — modern redesign</div></div></div> <div class="grid grid-cols-7 gap-4 p-4 svelte-15k7b7r"><!--[-->`);
    const each_array_4 = ensure_array_like(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    for (let idx = 0, $$length = each_array_4.length; idx < $$length; idx++) {
      let wd = each_array_4[idx];
      $$renderer2.push(`<div class="text-xs font-medium text-white/70 svelte-15k7b7r" style="color: var(--tw-color-slate-600);"><span class="inline-block px-2 py-1 rounded svelte-15k7b7r" style="background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0));">${escape_html(wd)}</span></div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_5 = ensure_array_like(Array(firstWeekday(year, month)).fill(0));
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      each_array_5[$$index_5];
      $$renderer2.push(`<div class="svelte-15k7b7r"></div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_6 = ensure_array_like(Array(daysInMonth(year, month)));
    for (let i = 0, $$length = each_array_6.length; i < $$length; i++) {
      each_array_6[i];
      const dayEvents = eventsFor(i + 1);
      $$renderer2.push(`<div class="p-3 min-h-[100px] day-cell svelte-15k7b7r"${attr("data-has-events", dayEvents.length > 0)}${attr_style(` --day-border: ${stringify(dayEvents.length ? hexToRgba(dayEvents[0].color || "#6366f1", 0.6) : "rgba(255,255,255,0.1)")}; --day-border-alt: ${stringify(dayEvents.length ? hexToRgba(dayEvents[0].color || "#8b5cf6", 0.4) : "rgba(255,255,255,0.05)")}; --event-color: ${stringify(dayEvents.length ? dayEvents[0].color || "#6366f1" : "#6366f1")}; --event-color-alt: ${stringify(dayEvents.length ? hexToRgba(dayEvents[0].color || "#8b5cf6", 0.8) : "#8b5cf6")}; `)}><div class="flex items-start justify-between svelte-15k7b7r"><div class="font-semibold text-lg calendar-header svelte-15k7b7r">${escape_html(i + 1)}</div> <button class="btn btn-ghost btn-xs text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-full svelte-15k7b7r" aria-label="Add event"><span class="text-green-400 svelte-15k7b7r">+</span></button></div> <div class="mt-2 space-y-1 svelte-15k7b7r"><!--[-->`);
      const each_array_7 = ensure_array_like(dayEvents.slice(0, 3));
      for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
        let ev = each_array_7[$$index_6];
        $$renderer2.push(`<div class="cursor-pointer event-indicator svelte-15k7b7r" role="button" tabindex="0"><span class="inline-block rounded-full px-2 py-0.5 text-xs text-white font-medium shadow-sm svelte-15k7b7r"${attr_style(pillStyle(ev))}>${escape_html(ev.time ? ev.time + " • " : "")}${escape_html(ev.title)}</span></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (dayEvents.length > 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-xs text-white/70 font-medium svelte-15k7b7r">+${escape_html(dayEvents.length - 3)} more</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></main></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function FamilyCalendarModernPage($$renderer) {
  CalendarModern($$renderer);
}
export {
  FamilyCalendarModernPage as default
};
