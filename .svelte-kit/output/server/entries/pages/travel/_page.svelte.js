import "clsx";
import { b as attr_class, a as ensure_array_like, s as stringify } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/database.js";
import { T as escape_html } from "../../../chunks/context.js";
function TravelPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let stats, upcomingTrips, upcomingEvents;
    let trips = [
      {
        id: 1,
        title: "Ooty Hill Station Trip",
        type: "leisure",
        status: "planned",
        startDate: "2025-12-15",
        endDate: "2025-12-18",
        destination: "Ooty, Tamil Nadu",
        participants: ["Appa", "Amma", "Akka", "Paati"],
        budget: "₹25,000",
        bookingStatus: "In Progress",
        description: "Family vacation to enjoy cool weather and tea gardens",
        activities: [
          "Tea Garden Visit",
          "Botanical Garden",
          "Toy Train",
          "Lake Boating"
        ],
        accommodation: "Hotel Taj Savoy",
        transport: "Private Car"
      },
      {
        id: 2,
        title: "Madurai Temple Visit",
        type: "spiritual",
        status: "upcoming",
        startDate: "2025-11-25",
        endDate: "2025-11-26",
        destination: "Madurai, Tamil Nadu",
        participants: ["Paati", "Amma", "Akka"],
        budget: "₹8,000",
        bookingStatus: "Confirmed",
        description: "Sacred pilgrimage to Meenakshi Amman Temple",
        activities: ["Temple Darshan", "Evening Aarti", "Local Shopping"],
        accommodation: "Dharamshala near Temple",
        transport: "Train"
      },
      {
        id: 3,
        title: "Pondicherry Beach Holiday",
        type: "leisure",
        status: "completed",
        startDate: "2025-08-10",
        endDate: "2025-08-12",
        destination: "Pondicherry",
        participants: ["Entire Family"],
        budget: "₹18,000",
        bookingStatus: "Completed",
        description: "French colonial architecture and beach relaxation",
        activities: ["Beach Visit", "Aurobindo Ashram", "French Quarter Walk"],
        accommodation: "La Villa Helena",
        transport: "Private Car"
      }
    ];
    let communityEvents = [
      {
        id: 1,
        title: "Karthigai Deepam Celebration",
        date: "2025-11-14",
        location: "Community Hall, Anna Nagar",
        organizer: "Cultural Association",
        participants: 150,
        type: "cultural",
        description: "Traditional lamp lighting festival celebration"
      },
      {
        id: 2,
        title: "Tamil New Year Feast",
        date: "2025-04-14",
        location: "Temple Grounds",
        organizer: "Temple Committee",
        participants: 300,
        type: "cultural",
        description: "Community feast with traditional South Indian dishes"
      },
      {
        id: 3,
        title: "Classical Music Concert",
        date: "2025-12-20",
        location: "Music Academy",
        organizer: "Music Society",
        participants: 200,
        type: "cultural",
        description: "Carnatic music performance by renowned artists"
      }
    ];
    function getStatusColor(status) {
      switch (status) {
        case "planned":
          return "text-blue-600 bg-blue-50 border-blue-200";
        case "upcoming":
          return "text-orange-600 bg-orange-50 border-orange-200";
        case "ongoing":
          return "text-green-600 bg-green-50 border-green-200";
        case "completed":
          return "text-gray-600 bg-gray-50 border-gray-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    }
    function getTypeIcon(type) {
      switch (type) {
        case "spiritual":
          return "heroicons:sparkles";
        case "leisure":
          return "heroicons:camera";
        case "cultural":
          return "heroicons:musical-note";
        case "adventure":
          return "heroicons:bolt";
        case "business":
          return "heroicons:briefcase";
        default:
          return "heroicons:map-pin";
      }
    }
    function getTypeColor(type) {
      switch (type) {
        case "spiritual":
          return "text-purple-600";
        case "leisure":
          return "text-blue-600";
        case "cultural":
          return "text-amber-600";
        case "adventure":
          return "text-red-600";
        case "business":
          return "text-gray-600";
        default:
          return "text-green-600";
      }
    }
    function calculateDaysUntil(date) {
      const today = /* @__PURE__ */ new Date();
      const targetDate = new Date(date);
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays < 0) return "Past";
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      return `${diffDays} days`;
    }
    stats = {
      totalTrips: trips.length,
      planned: trips.filter((t) => t.status === "planned").length,
      upcoming: trips.filter((t) => t.status === "upcoming").length,
      completed: trips.filter((t) => t.status === "completed").length,
      totalBudget: trips.reduce((sum, trip) => sum + parseInt(trip.budget.replace(/[₹,]/g, "") || 0), 0)
    };
    upcomingTrips = trips.filter((t) => t.status === "upcoming" || t.status === "planned");
    upcomingEvents = communityEvents.filter((e) => new Date(e.date) >= /* @__PURE__ */ new Date());
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-base-content mb-2">✈️ Travel &amp; Leisure</h1> <p class="text-base-content/60">Plan trips, track community events, and organize family leisure activities</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----> Plan New Trip</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Trips</p> <p class="text-2xl font-bold text-blue-500">${escape_html(stats.totalTrips)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-8 h-8 text-blue-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Upcoming</p> <p class="text-2xl font-bold text-orange-500">${escape_html(stats.upcoming + stats.planned)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-8 h-8 text-orange-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Completed</p> <p class="text-2xl font-bold text-green-500">${escape_html(stats.completed)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:check-circle",
      class: "w-8 h-8 text-green-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Total Budget</p> <p class="text-2xl font-bold text-purple-500">₹${escape_html(stats.totalBudget.toLocaleString())}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:banknotes",
      class: "w-8 h-8 text-purple-500"
    });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:home", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Overview</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Travel Planning</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:film", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Leisure Activities</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:users", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Community Events</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Upcoming Trips</h3> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(upcomingTrips.slice(0, 3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let trip = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`p-3 bg-base-200 rounded-lg border-l-4 ${stringify(getStatusColor(trip.status))}`)}><div class="flex items-start justify-between"><div><div class="flex items-center space-x-2">`);
        Icon($$renderer2, {
          icon: getTypeIcon(trip.type),
          class: `w-5 h-5 ${stringify(getTypeColor(trip.type))}`
        });
        $$renderer2.push(`<!----> <p class="font-medium text-base-content">${escape_html(trip.title)}</p></div> <p class="text-sm text-base-content/60">${escape_html(trip.destination)}</p> <p class="text-sm text-base-content/60">${escape_html(trip.startDate)} • ${escape_html(calculateDaysUntil(trip.startDate))}</p></div> <span${attr_class(`text-xs badge ${stringify(getStatusColor(trip.status))}`)}>${escape_html(trip.status)}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body"><h3 class="card-title text-base-content">Upcoming Community Events</h3> <div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(upcomingEvents.slice(0, 3));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let event = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-3 bg-base-200 rounded-lg"><div class="flex items-center justify-between"><div><p class="font-medium text-base-content">${escape_html(event.title)}</p> <p class="text-sm text-base-content/60">${escape_html(event.location)}</p> <p class="text-sm text-base-content/60">${escape_html(event.date)} • ${escape_html(calculateDaysUntil(event.date))}</p></div> <div class="text-right"><p class="text-sm font-medium">${escape_html(event.participants)}</p> <p class="text-xs text-base-content/60">participants</p></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  TravelPage($$renderer);
}
export {
  _page as default
};
