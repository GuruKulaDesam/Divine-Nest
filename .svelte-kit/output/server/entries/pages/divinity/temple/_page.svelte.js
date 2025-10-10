import "clsx";
import { b as attr_class, a as ensure_array_like, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function TemplePage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let temples = [
      {
        id: 1,
        name: "Marudamalai Murugan Temple",
        location: "Coimbatore",
        distance: "15 km",
        deity: "Lord Murugan",
        speciality: "Hill temple, peaceful environment",
        bestTime: "Early morning 6 AM - 8 AM",
        darshan: "Free",
        lastVisit: "2025-09-15",
        rating: 5,
        notes: "Perfect for morning prayers, less crowded"
      },
      {
        id: 2,
        name: "Perur Pateeswarar Temple",
        location: "Coimbatore",
        distance: "12 km",
        deity: "Lord Shiva",
        speciality: "Ancient Chola period temple",
        bestTime: "Evening 5 PM - 7 PM",
        darshan: "Free",
        lastVisit: "2025-08-20",
        rating: 5,
        notes: "Beautiful architecture, very peaceful"
      },
      {
        id: 3,
        name: "Meenakshi Amman Temple",
        location: "Madurai",
        distance: "200 km",
        deity: "Goddess Meenakshi & Lord Sundareswarar",
        speciality: "Famous temple with stunning architecture",
        bestTime: "Early morning 5 AM - 7 AM",
        darshan: "₹50 for special darshan",
        lastVisit: "2025-07-10",
        rating: 5,
        notes: "Must visit during Chithirai festival"
      },
      {
        id: 4,
        name: "Ramanathaswamy Temple",
        location: "Rameswaram",
        distance: "350 km",
        deity: "Lord Ramanathaswamy (Shiva)",
        speciality: "One of 12 Jyotirlingas, sacred pilgrimage",
        bestTime: "Early morning 4:30 AM - 6 AM",
        darshan: "₹25 for darshan",
        lastVisit: null,
        rating: 0,
        notes: "Plan 2-day trip, book accommodation in advance"
      }
    ];
    let plannedVisits = [
      {
        temple: "Ramanathaswamy Temple",
        date: "2025-10-15",
        participants: ["Paati", "Appa", "Amma", "Akka"],
        transport: "Car",
        accommodation: "Hotel Rameswaram Grand",
        budget: "₹8,000",
        status: "planned"
      },
      {
        temple: "Marudamalai Murugan Temple",
        date: "2025-10-08",
        participants: ["Family"],
        transport: "Car",
        accommodation: "Day trip",
        budget: "₹500",
        status: "confirmed"
      }
    ];
    let ritualPlanner = [
      {
        ritual: "Daily Morning Prayers",
        temple: "Home altar",
        time: "6:00 AM",
        participants: ["Paati", "Amma"],
        items: ["Flowers", "Incense", "Camphor", "Fruits"],
        completed: true
      },
      {
        ritual: "Friday Lakshmi Pooja",
        temple: "Home altar",
        time: "7:00 PM",
        participants: ["Family"],
        items: ["Lotus flowers", "Turmeric", "Kumkum", "Coconut", "Sweets"],
        completed: false
      },
      {
        ritual: "Monthly Pradosham",
        temple: "Perur Temple",
        time: "Evening",
        participants: ["Paati", "Appa"],
        items: ["Bilva leaves", "Milk", "Honey"],
        completed: false
      }
    ];
    $$renderer2.push(`<div class="p-6 max-w-7xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold text-base-content mb-2">🛕 Temple Visits &amp; Spiritual Journey</h1> <p class="text-base-content/60">Plan temple visits, track darshan timings, and organize spiritual practices</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Temples Visited</p> <p class="text-2xl font-bold text-orange-500">${escape_html(temples.filter((t) => t.lastVisit !== null).length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:building-storefront",
      class: "w-8 h-8 text-orange-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Planned Visits</p> <p class="text-2xl font-bold text-blue-500">${escape_html(plannedVisits.length)}</p></div> `);
    Icon($$renderer2, {
      icon: "heroicons:calendar-days",
      class: "w-8 h-8 text-blue-500"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">Daily Rituals</p> <p class="text-2xl font-bold text-green-500">${escape_html(ritualPlanner.filter((r) => r.completed).length)}</p></div> `);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-8 h-8 text-green-500" });
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 border border-base-300 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-base-content/60">This Month</p> <p class="text-2xl font-bold text-purple-500">3</p> <p class="text-xs text-base-content/60">visits planned</p></div> `);
    Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-8 h-8 text-purple-500" });
    $$renderer2.push(`<!----></div></div></div></div> <div class="tabs tabs-bordered mb-6"><button${attr_class(`tab ${stringify("tab-active")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:building-storefront", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Temple Visits</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:calendar-days", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Visit Planner</button> <button${attr_class(`tab ${stringify("")}`)}>`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-4 h-4 mr-2" });
    $$renderer2.push(`<!----> Ritual Tracker</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex justify-between items-center"><h3 class="text-xl font-semibold text-base-content">Temple Directory</h3> <button class="btn btn-primary">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4 mr-2" });
      $$renderer2.push(`<!----> Add Temple</button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
      const each_array = ensure_array_like(temples);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let temple = each_array[$$index_1];
        $$renderer2.push(`<div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow"><div class="card-body"><div class="flex justify-between items-start"><div><h3 class="card-title text-base-content">${escape_html(temple.name)}</h3> <p class="text-sm text-base-content/60">${escape_html(temple.location)} • ${escape_html(temple.distance)}</p></div> <div class="flex items-center space-x-1"><!--[-->`);
        const each_array_1 = ensure_array_like(Array(temple.rating || 0));
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          each_array_1[$$index];
          Icon($$renderer2, {
            icon: "heroicons:star",
            class: "w-4 h-4 text-yellow-500 fill-current"
          });
        }
        $$renderer2.push(`<!--]--></div></div> <div class="space-y-2 mt-4"><div class="flex items-center space-x-2">`);
        Icon($$renderer2, {
          icon: "heroicons:user",
          class: "w-4 h-4 text-base-content/60"
        });
        $$renderer2.push(`<!----> <span class="text-sm text-base-content">${escape_html(temple.deity)}</span></div> <div class="flex items-center space-x-2">`);
        Icon($$renderer2, {
          icon: "heroicons:clock",
          class: "w-4 h-4 text-base-content/60"
        });
        $$renderer2.push(`<!----> <span class="text-sm text-base-content">${escape_html(temple.bestTime)}</span></div> <div class="flex items-center space-x-2">`);
        Icon($$renderer2, {
          icon: "heroicons:currency-rupee",
          class: "w-4 h-4 text-base-content/60"
        });
        $$renderer2.push(`<!----> <span class="text-sm text-base-content">${escape_html(temple.darshan)}</span></div> `);
        if (temple.lastVisit) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center space-x-2">`);
          Icon($$renderer2, {
            icon: "heroicons:calendar",
            class: "w-4 h-4 text-base-content/60"
          });
          $$renderer2.push(`<!----> <span class="text-sm text-base-content">Last visit: ${escape_html(temple.lastVisit)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="mt-4"><p class="text-sm text-base-content/70">${escape_html(temple.speciality)}</p> `);
        if (temple.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-base-content/60 mt-2 italic">💡 ${escape_html(temple.notes)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="card-actions justify-end mt-4"><button class="btn btn-sm btn-outline">View Details</button> <button class="btn btn-sm btn-primary">Plan Visit</button></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  TemplePage($$renderer);
}
export {
  _page as default
};
