import "clsx";
import { h as head, c as store_get, b as attr_class, a as ensure_array_like, s as stringify, u as unsubscribe_stores, j as attr_style, d as attr } from "../../../../chunks/index2.js";
import { a as $format } from "../../../../chunks/runtime.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { T as escape_html } from "../../../../chunks/context.js";
function SchedulePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let upcomingEvents, todayEvents, thisWeekEvents;
    let showEventModal = false;
    let showCreateEventModal = false;
    let selectedEvent = null;
    let selectedViewOption = "month";
    const viewOptions = [
      {
        value: "month",
        label: "Month",
        view: "dayGridMonth",
        icon: "heroicons:calendar-days"
      },
      {
        value: "week",
        label: "Week",
        view: "timeGridWeek",
        icon: "heroicons:calendar"
      },
      {
        value: "day",
        label: "Day",
        view: "timeGridDay",
        icon: "heroicons:calendar-date-range"
      },
      {
        value: "list",
        label: "List",
        view: "listMonth",
        icon: "heroicons:list-bullet"
      }
    ];
    let eventForm = {
      id: null,
      title: "",
      start: "",
      end: "",
      allDay: false,
      description: "",
      color: "#3788d8",
      location: ""
    };
    let events = [
      {
        id: "1",
        title: "Team Standup",
        start: new Date(Date.now() + 864e5),
        end: new Date(Date.now() + 864e5 + 18e5),
        color: "#10b981",
        backgroundColor: "#10b981",
        borderColor: "#10b981",
        allDay: false,
        extendedProps: {
          description: "Daily team sync and updates",
          location: "Conference Room A"
        }
      },
      {
        id: "2",
        title: "Project Deadline",
        start: new Date(Date.now() + 2 * 864e5),
        allDay: true,
        color: "#ef4444",
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
        extendedProps: {
          description: "Final project submission deadline",
          location: ""
        }
      },
      {
        id: "3",
        title: "Client Presentation",
        start: new Date(Date.now() + 3 * 864e5 + 2 * 36e5),
        end: new Date(Date.now() + 3 * 864e5 + 3 * 36e5),
        color: "#8b5cf6",
        backgroundColor: "#8b5cf6",
        borderColor: "#8b5cf6",
        allDay: false,
        extendedProps: {
          description: "Quarterly review presentation",
          location: "Meeting Room B"
        }
      },
      {
        id: "4",
        title: "Product Launch",
        start: new Date(Date.now() + 7 * 864e5),
        allDay: true,
        color: "#f59e0b",
        backgroundColor: "#f59e0b",
        borderColor: "#f59e0b",
        extendedProps: { description: "New product launch event", location: "" }
      }
    ];
    const iconColors = {
      today: "bg-blue-500",
      week: "bg-green-500",
      upcoming: "bg-purple-500",
      total: "bg-orange-500"
    };
    function getCalendarView(option) {
      const view = viewOptions.find((v) => v.value === option);
      return view ? view.view : "dayGridMonth";
    }
    function handleEventClick(info) {
      selectedEvent = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        allDay: info.event.allDay,
        description: info.event.extendedProps.description || "",
        color: info.event.backgroundColor || "#3788d8",
        location: info.event.extendedProps.location || ""
      };
      showEventModal = true;
    }
    function handleDateSelect(info) {
      eventForm = {
        id: null,
        title: "",
        start: formatDateForInput(info.start, !info.allDay),
        end: formatDateForInput(info.end, !info.allDay),
        allDay: info.allDay,
        description: "",
        color: "#3788d8",
        location: ""
      };
      showCreateEventModal = true;
    }
    function handleDateClick(info) {
      const clickedDate = info.date;
      const endTime = new Date(clickedDate.getTime() + 36e5);
      eventForm = {
        id: null,
        title: "",
        start: formatDateForInput(clickedDate, true),
        end: formatDateForInput(endTime, true),
        allDay: false,
        description: "",
        color: "#3788d8",
        location: ""
      };
      showCreateEventModal = true;
    }
    function handleEventDrop(info) {
      const event = info.event;
      const eventIndex = events.findIndex((e) => e.id === event.id);
      if (eventIndex !== -1) {
        events[eventIndex] = {
          ...events[eventIndex],
          start: event.start,
          end: event.end,
          allDay: event.allDay
        };
        events = [...events];
      }
    }
    function handleEventResize(info) {
      const event = info.event;
      const eventIndex = events.findIndex((e) => e.id === event.id);
      if (eventIndex !== -1) {
        events[eventIndex] = { ...events[eventIndex], start: event.start, end: event.end };
        events = [...events];
      }
    }
    function formatDateForInput(date, includeTime = true) {
      if (!date) return "";
      const d = new Date(date);
      if (includeTime) {
        return d.toISOString().slice(0, 16);
      } else {
        return d.toISOString().slice(0, 10);
      }
    }
    upcomingEvents = events.filter((event) => new Date(event.start) > /* @__PURE__ */ new Date()).length;
    todayEvents = events.filter((event) => {
      const today = /* @__PURE__ */ new Date();
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString();
    }).length;
    thisWeekEvents = events.filter((event) => {
      const today = /* @__PURE__ */ new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1e3);
      const eventDate = new Date(event.start);
      return eventDate >= today && eventDate <= weekFromNow;
    }).length;
    ({
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
        multiMonthPlugin
      ],
      initialView: getCalendarView(selectedViewOption),
      headerToolbar: { left: "prev,next today", center: "title", right: "" },
      height: "auto",
      events,
      eventClick: handleEventClick,
      select: handleDateSelect,
      editable: true,
      selectable: true,
      dayMaxEvents: 3,
      eventDisplay: "block",
      displayEventTime: true,
      eventTimeFormat: { hour: "numeric", minute: "2-digit", meridiem: "short" },
      eventDrop: handleEventDrop,
      eventResize: handleEventResize,
      dateClick: handleDateClick,
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "09:00",
        endTime: "18:00"
      },
      slotMinTime: "06:00:00",
      slotMaxTime: "22:00:00",
      nowIndicator: true,
      selectMirror: true,
      weekends: true,
      // List view specific options
      listDayFormat: { weekday: "long" },
      listDaySideFormat: false,
      noEventsContent: "No events to display"
    });
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("navigation.schedule") || "Schedule")} - Dashboard</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-full h-full text-primary"
    });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:clock",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("navigation.schedule") || "Schedule")}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">Manage your events, appointments, and calendar schedule</p></div> <button class="btn btn-primary shadow-md hover:shadow-lg group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----></div> New Event</div></button></div></div> <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"><div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div${attr_class(`w-12 h-12 ${stringify(iconColors.today)} rounded-lg flex items-center justify-center shadow-sm`, "svelte-9ino3a")}>`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">Today's Events</p> <p class="text-2xl font-bold text-base-content">${escape_html(todayEvents)}</p></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div${attr_class(`w-12 h-12 ${stringify(iconColors.week)} rounded-lg flex items-center justify-center shadow-sm`, "svelte-9ino3a")}>`);
    Icon($$renderer2, { icon: "heroicons:clock", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">This Week</p> <p class="text-2xl font-bold text-base-content">${escape_html(thisWeekEvents)}</p></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div${attr_class(`w-12 h-12 ${stringify(iconColors.upcoming)} rounded-lg flex items-center justify-center shadow-sm`, "svelte-9ino3a")}>`);
    Icon($$renderer2, {
      icon: "heroicons:arrow-trending-up",
      class: "w-6 h-6 text-white"
    });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">Upcoming</p> <p class="text-2xl font-bold text-base-content">${escape_html(upcomingEvents)}</p></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"><div class="card-body p-4"><div class="flex items-center"><div class="flex-shrink-0"><div${attr_class(`w-12 h-12 ${stringify(iconColors.total)} rounded-lg flex items-center justify-center shadow-sm`, "svelte-9ino3a")}>`);
    Icon($$renderer2, { icon: "heroicons:calendar", class: "w-6 h-6 text-white" });
    $$renderer2.push(`<!----></div></div> <div class="ml-4 flex-1"><p class="text-sm font-medium text-base-content/60">Total Events</p> <p class="text-2xl font-bold text-base-content">${escape_html(events.length)}</p></div></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body p-4"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h2 class="text-lg font-semibold text-base-content">Calendar View</h2> <p class="text-sm text-base-content/60">Choose how you want to view your schedule</p></div> <div class="flex items-center gap-2"><div class="join"><!--[-->`);
    const each_array = ensure_array_like(viewOptions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`btn join-item btn-sm ${stringify(selectedViewOption === option.value ? "btn-primary shadow-md" : "btn-outline hover:shadow-sm")} transition-all duration-200`)}>`);
      Icon($$renderer2, { icon: option.icon, class: "w-4 h-4 sm:mr-2" });
      $$renderer2.push(`<!----> <span class="hidden sm:inline">${escape_html(option.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body p-0">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center h-96"><div class="text-center"><div class="loading loading-spinner loading-lg text-primary mb-4"></div> <p class="text-base-content/70">Loading calendar...</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    if (showEventModal && selectedEvent) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal modal-open"><div class="modal-box w-11/12 max-w-md svelte-9ino3a"><button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> <div class="space-y-6"><div class="flex items-start gap-3"><div class="w-4 h-4 rounded-full mt-1"${attr_style(`background-color: ${stringify(selectedEvent.color)}`)}></div> <div class="flex-1"><h3 class="text-xl font-bold text-base-content">${escape_html(selectedEvent.title)}</h3> `);
      if (selectedEvent.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-base-content/70 mt-1">${escape_html(selectedEvent.description)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="space-y-4"><div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">`);
      Icon($$renderer2, {
        icon: "heroicons:clock",
        class: "w-5 h-5 text-base-content/60"
      });
      $$renderer2.push(`<!----> <div><p class="text-sm font-medium text-base-content">`);
      if (selectedEvent.allDay) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`All Day Event`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(new Date(selectedEvent.start).toLocaleString())} `);
        if (selectedEvent.end) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`- ${escape_html(new Date(selectedEvent.end).toLocaleString())}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></p></div></div> `);
      if (selectedEvent.location) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">`);
        Icon($$renderer2, {
          icon: "heroicons:map-pin",
          class: "w-5 h-5 text-base-content/60"
        });
        $$renderer2.push(`<!----> <div><p class="text-sm font-medium text-base-content">${escape_html(selectedEvent.location)}</p></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="flex justify-between pt-4 border-t border-base-300"><button class="btn btn-error btn-outline">`);
      Icon($$renderer2, { icon: "heroicons:trash", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Delete</button> <div class="flex gap-2"><button class="btn btn-ghost">Cancel</button> <button class="btn btn-primary">`);
      Icon($$renderer2, { icon: "heroicons:pencil", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Edit</button></div></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (showCreateEventModal) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal modal-open"><div class="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto svelte-9ino3a"><button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> <div class="space-y-6"><div><h3 class="text-xl font-bold text-base-content">${escape_html(eventForm.id ? "Edit Event" : "Create New Event")}</h3> <p class="text-base-content/60 mt-1">${escape_html(eventForm.id ? "Update event details" : "Add a new event to your calendar")}</p></div> <form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2"><label class="label"><span class="label-text font-medium">Event Title *</span></label> <input type="text"${attr("value", eventForm.title)} placeholder="Enter event title" class="input input-bordered w-full focus:input-primary" required/></div> <div><label class="label"><span class="label-text font-medium">Start ${escape_html(eventForm.allDay ? "Date" : "Time")}</span></label> <input${attr("type", eventForm.allDay ? "date" : "datetime-local")}${attr("value", eventForm.start)} class="input input-bordered w-full focus:input-primary" required/></div> `);
      if (!eventForm.allDay) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div><label class="label"><span class="label-text font-medium">End Time</span></label> <input type="datetime-local"${attr("value", eventForm.end)} class="input input-bordered w-full focus:input-primary"/></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="md:col-span-2"><div class="form-control"><label class="label cursor-pointer justify-start gap-3"><input type="checkbox"${attr("checked", eventForm.allDay, true)} class="checkbox checkbox-primary"/> <span class="label-text font-medium">All Day Event</span></label></div></div> <div><label class="label"><span class="label-text font-medium">Color</span></label> <div class="flex items-center gap-3"><input type="color"${attr("value", eventForm.color)} class="w-16 h-10 rounded-lg border border-base-300 cursor-pointer"/> <input type="text"${attr("value", eventForm.color)} class="input input-bordered flex-1 focus:input-primary" placeholder="#3788d8"/></div></div> <div><label class="label"><span class="label-text font-medium">Location</span></label> <input type="text"${attr("value", eventForm.location)} placeholder="Enter location" class="input input-bordered w-full focus:input-primary"/></div> <div class="md:col-span-2"><label class="label"><span class="label-text font-medium">Description</span></label> <textarea placeholder="Enter event description" class="textarea textarea-bordered h-24 focus:textarea-primary">`);
      const $$body = escape_html(eventForm.description);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div></div> <div class="flex justify-end gap-3 pt-6 border-t border-base-300"><button type="button" class="btn btn-ghost">Cancel</button> <button type="submit" class="btn btn-primary">`);
      Icon($$renderer2, { icon: "heroicons:check", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> ${escape_html(eventForm.id ? "Update Event" : "Create Event")}</button></div></form></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  SchedulePage($$renderer);
}
export {
  _page as default
};
