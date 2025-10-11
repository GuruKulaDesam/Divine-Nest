import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify, h as head } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function TripHistoryPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "trips";
    let trips = [];
    const tabs = [
      { id: "trips", label: "All Trips", icon: "heroicons:map" },
      {
        id: "pilgrimages",
        label: "Pilgrimages",
        icon: "heroicons:building-library"
      },
      {
        id: "memories",
        label: "Travel Memories",
        icon: "heroicons:photo"
      },
      {
        id: "planning",
        label: "Trip Planning",
        icon: "heroicons:calendar-days"
      },
      {
        id: "expenses",
        label: "Travel Expenses",
        icon: "heroicons:currency-rupee"
      }
    ];
    const tripTypes = [
      {
        id: "family",
        label: "Family Trip",
        icon: "heroicons:user-group",
        color: "text-blue-500"
      },
      {
        id: "pilgrimage",
        label: "Pilgrimage",
        icon: "heroicons:building-library",
        color: "text-orange-500"
      },
      {
        id: "wedding",
        label: "Wedding/Ceremony",
        icon: "heroicons:heart",
        color: "text-pink-500"
      },
      {
        id: "education",
        label: "Educational",
        icon: "heroicons:academic-cap",
        color: "text-purple-500"
      },
      {
        id: "business",
        label: "Business/Work",
        icon: "heroicons:briefcase",
        color: "text-gray-500"
      },
      {
        id: "health",
        label: "Medical/Health",
        icon: "heroicons:heart",
        color: "text-red-500"
      },
      {
        id: "cultural",
        label: "Cultural Event",
        icon: "heroicons:musical-note",
        color: "text-green-500"
      },
      {
        id: "emergency",
        label: "Emergency",
        icon: "heroicons:exclamation-triangle",
        color: "text-red-600"
      }
    ];
    function getTripTypeIcon(type) {
      return tripTypes.find((t) => t.id === type)?.icon || "heroicons:map";
    }
    function getTripTypeColor(type) {
      return tripTypes.find((t) => t.id === type)?.color || "text-gray-500";
    }
    function calculateTripDuration(startDate, endDate) {
      if (!startDate || !endDate) return "Unknown duration";
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    }
    function getStarRating(rating) {
      return Array(5).fill(0).map((_, i) => i < rating ? "⭐" : "☆").join("");
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900/20 dark:to-cyan-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:map", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Trip History</h1> <p class="text-gray-600 dark:text-gray-300">यात्रा कल्याणकारी | Travel brings knowledge and growth</p></div></div></div> <div class="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, {
      icon: "heroicons:globe-asia-australia",
      class: "w-12 h-12 text-white/80"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">यात्रा संस्कार | Travel Traditions</h3> <p class="text-white/90">"यात्रा यत्न साध्यते | Through travel, one gains wisdom, perspective, and spiritual growth. Every journey teaches us something new about ourselves and the world."</p> <p class="text-sm text-white/70 mt-2">Tamil: "பயணம் ஞானத்தையும் ஆன்மீக வளர்ச்சியையும் தருகிறது"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-teal-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-teal-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-teal-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between mb-6"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">🗺️ All Family Trips</h3> <button class="flex items-center space-x-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Add Trip</span></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_2 = ensure_array_like(trips);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let trip = each_array_2[$$index_2];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: getTripTypeIcon(trip.type),
          class: `w-6 h-6 ${stringify(getTripTypeColor(trip.type))}`
        });
        $$renderer2.push(`<!----> <div><h4 class="font-bold text-gray-900 dark:text-white">${escape_html(trip.title)}</h4> <p class="text-sm text-teal-600 dark:text-teal-400">${escape_html(trip.destination)}</p></div></div> <span class="text-xl">${escape_html(getStarRating(trip.rating))}</span></div> <div class="space-y-2 mb-4"><div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Duration:</span> <span class="font-medium">${escape_html(calculateTripDuration(trip.startDate, trip.endDate))}</span></div> `);
        if (trip.expenses > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Expenses:</span> <span class="font-medium text-green-600 dark:text-green-400">₹${escape_html(trip.expenses.toLocaleString())}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (trip.accommodation) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Stay:</span> <span class="font-medium">${escape_html(trip.accommodation)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (trip.transportation) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Transport:</span> <span class="font-medium">${escape_html(trip.transportation)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (trip.highlights) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${escape_html(trip.highlights)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><span class="text-xs text-gray-500 dark:text-gray-400">${escape_html(new Date(trip.startDate).toLocaleDateString())} - ${escape_html(new Date(trip.endDate).toLocaleDateString())}</span> <button class="text-teal-600 dark:text-teal-400 text-sm hover:underline">View Details</button></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (trips.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12">`);
        Icon($$renderer2, {
          icon: "heroicons:map",
          class: "w-16 h-16 mx-auto text-teal-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Trips Recorded Yet</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">Start documenting your family's travel memories</p> <button class="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">Record First Trip</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function TripsPage($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Travel History - South Indian Family Life App</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Track and manage family travel history and itineraries"/>`);
  });
  TripHistoryPage($$renderer);
}
function _page($$renderer) {
  TripsPage($$renderer);
}
export {
  _page as default
};
