import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function LeisureCommunityPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "leisure";
    let leisureActivities = [];
    const tabs = [
      {
        id: "leisure",
        label: "Leisure Activities",
        icon: "heroicons:face-smile"
      },
      {
        id: "community",
        label: "Community Events",
        icon: "heroicons:users"
      },
      {
        id: "cultural",
        label: "Cultural Programs",
        icon: "heroicons:musical-note"
      },
      {
        id: "calendar",
        label: "Event Calendar",
        icon: "heroicons:calendar-days"
      },
      {
        id: "participation",
        label: "Family Participation",
        icon: "heroicons:star"
      }
    ];
    const leisureTypes = [
      {
        id: "entertainment",
        label: "Entertainment",
        icon: "heroicons:tv",
        color: "text-purple-500"
      },
      {
        id: "sports",
        label: "Sports & Games",
        icon: "heroicons:trophy",
        color: "text-yellow-500"
      },
      {
        id: "arts",
        label: "Arts & Crafts",
        icon: "heroicons:paint-brush",
        color: "text-pink-500"
      },
      {
        id: "music",
        label: "Music & Dance",
        icon: "heroicons:musical-note",
        color: "text-blue-500"
      },
      {
        id: "reading",
        label: "Reading & Learning",
        icon: "heroicons:book-open",
        color: "text-green-500"
      },
      {
        id: "cooking",
        label: "Cooking & Food",
        icon: "heroicons:cake",
        color: "text-orange-500"
      },
      {
        id: "gardening",
        label: "Gardening",
        icon: "heroicons:beaker",
        color: "text-green-600"
      },
      {
        id: "photography",
        label: "Photography",
        icon: "heroicons:camera",
        color: "text-gray-500"
      },
      {
        id: "travel",
        label: "Day Trips",
        icon: "heroicons:map",
        color: "text-teal-500"
      },
      {
        id: "social",
        label: "Social Activities",
        icon: "heroicons:chat-bubble-left-ellipsis",
        color: "text-indigo-500"
      }
    ];
    function getActivityIcon(type) {
      return leisureTypes.find((t) => t.id === type)?.icon || "heroicons:face-smile";
    }
    function getActivityColor(type) {
      return leisureTypes.find((t) => t.id === type)?.color || "text-gray-500";
    }
    function getStarRating(rating) {
      return Array(5).fill(0).map((_, i) => i < rating ? "⭐" : "☆").join("");
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:face-smile", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Leisure &amp; Community Events</h1> <p class="text-gray-600 dark:text-gray-300">मनोरंजन सामुदायिक सेवा | Entertainment and community service</p></div></div></div> <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">सामुदायिक जीवन | Community Life</h3> <p class="text-white/90">"व्यायामात् लभते स्वास्थ्यं दीर्घायुष्यं बलं सुखं | Through recreation and community service, we find joy, build relationships, and contribute to society's well-being."</p> <p class="text-sm text-white/70 mt-2">Tamil: "பொழுதுபோக்கும் சமூகசேवையும் மகிழ்ச்சியும் நல்ல உறவுகளும் தருகின்றன"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-purple-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-purple-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between mb-6"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">😊 Family Leisure Activities</h3> <button class="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Add Activity</span></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_2 = ensure_array_like(leisureActivities);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let activity = each_array_2[$$index_2];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: getActivityIcon(activity.type),
          class: `w-6 h-6 ${stringify(getActivityColor(activity.type))}`
        });
        $$renderer2.push(`<!----> <div><h4 class="font-bold text-gray-900 dark:text-white">${escape_html(activity.title)}</h4> <p class="text-sm text-purple-600 dark:text-purple-400">${escape_html(leisureTypes.find((t) => t.id === activity.type)?.label)}</p></div></div> <span class="text-lg">${escape_html(getStarRating(activity.enjoyment_rating))}</span></div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${escape_html(activity.description)}</p> <div class="space-y-2 mb-4">`);
        if (activity.location) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Location:</span> <span class="font-medium">${escape_html(activity.location)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (activity.duration) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Duration:</span> <span class="font-medium">${escape_html(activity.duration)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (activity.cost > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Cost:</span> <span class="font-medium text-green-600 dark:text-green-400">₹${escape_html(activity.cost.toLocaleString())}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (activity.memories) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><p class="text-xs text-purple-800 dark:text-purple-200 italic">"${escape_html(activity.memories)}"</p></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><span class="text-xs text-gray-500 dark:text-gray-400">${escape_html(new Date(activity.date).toLocaleDateString())}</span> `);
        if (activity.repeat) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">Want to repeat</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (leisureActivities.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12">`);
        Icon($$renderer2, {
          icon: "heroicons:face-smile",
          class: "w-16 h-16 mx-auto text-purple-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Leisure Activities Recorded</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">Start documenting your family's fun times and hobbies</p> <button class="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">Record First Activity</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  LeisureCommunityPage as default
};
