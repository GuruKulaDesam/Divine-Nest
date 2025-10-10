import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "../../../../chunks/database.js";
import { T as escape_html } from "../../../../chunks/context.js";
function FamilyStoriesPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "stories";
    let stories = [];
    const tabs = [
      {
        id: "stories",
        label: "Family Stories",
        icon: "heroicons:book-open"
      },
      {
        id: "recordings",
        label: "Audio Stories",
        icon: "heroicons:microphone"
      },
      {
        id: "photos",
        label: "Photo Stories",
        icon: "heroicons:photo"
      },
      {
        id: "timeline",
        label: "Family Timeline",
        icon: "heroicons:calendar-days"
      },
      {
        id: "traditions",
        label: "Traditions",
        icon: "heroicons:gift"
      }
    ];
    const storyCategories = [
      {
        id: "childhood",
        label: "Childhood Memories",
        icon: "heroicons:face-smile",
        color: "text-yellow-500"
      },
      {
        id: "wedding",
        label: "Wedding Stories",
        icon: "heroicons:heart",
        color: "text-red-500"
      },
      {
        id: "festivals",
        label: "Festival Celebrations",
        icon: "heroicons:gift",
        color: "text-purple-500"
      },
      {
        id: "travel",
        label: "Travel Adventures",
        icon: "heroicons:map",
        color: "text-blue-500"
      },
      {
        id: "wisdom",
        label: "Life Lessons",
        icon: "heroicons:light-bulb",
        color: "text-green-500"
      },
      {
        id: "ancestors",
        label: "Ancestor Stories",
        icon: "heroicons:users",
        color: "text-indigo-500"
      },
      {
        id: "traditions",
        label: "Family Traditions",
        icon: "heroicons:star",
        color: "text-orange-500"
      },
      {
        id: "achievements",
        label: "Achievements",
        icon: "heroicons:trophy",
        color: "text-cyan-500"
      }
    ];
    function getCategoryIcon(categoryId) {
      return storyCategories.find((cat) => cat.id === categoryId)?.icon || "heroicons:book-open";
    }
    function getCategoryColor(categoryId) {
      return storyCategories.find((cat) => cat.id === categoryId)?.color || "text-gray-500";
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:book-open", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Family Stories</h1> <p class="text-gray-600 dark:text-gray-300">पुराणमित्येव न साधु सर्वम् | Not all that is old is good</p></div></div></div> <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, {
      icon: "heroicons:chat-bubble-left-right",
      class: "w-12 h-12 text-white/80"
    });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">कथा कहानी | Stories &amp; Tales</h3> <p class="text-white/90">"Stories connect generations, preserve wisdom, and strengthen the bonds that make us family."</p> <p class="text-sm text-white/70 mt-2">Tamil: "கதைகள் தலைமுறைகளை இணைக்கின்றன"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-amber-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-amber-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-amber-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between mb-6"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">📖 Family Story Collection</h3> <button class="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">`);
      Icon($$renderer2, { icon: "heroicons:plus", class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span>Add Story</span></button></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      const each_array_2 = ensure_array_like(stories);
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let story = each_array_2[$$index_3];
        $$renderer2.push(`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3">`);
        Icon($$renderer2, {
          icon: getCategoryIcon(story.category),
          class: `w-6 h-6 ${stringify(getCategoryColor(story.category))}`
        });
        $$renderer2.push(`<!----> <div><h4 class="font-bold text-gray-900 dark:text-white">${escape_html(story.title)}</h4> <p class="text-sm text-amber-600 dark:text-amber-400">by ${escape_html(story.storyteller)}</p></div></div></div> <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${escape_html(story.content)}</p> <div class="space-y-2 mb-4">`);
        if (story.date) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">`);
          Icon($$renderer2, { icon: "heroicons:calendar", class: "w-3 h-3" });
          $$renderer2.push(`<!----> <span>${escape_html(story.date)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (story.location) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">`);
          Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-3 h-3" });
          $$renderer2.push(`<!----> <span>${escape_html(story.location)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (story.tags && story.tags.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex flex-wrap gap-1 mb-4"><!--[-->`);
          const each_array_3 = ensure_array_like(story.tags);
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let tag = each_array_3[$$index_2];
            $$renderer2.push(`<span class="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded">#${escape_html(tag)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><button class="text-amber-500 hover:text-amber-600 transition-colors text-sm font-medium">Read Full Story</button> <span class="text-xs text-gray-400">${escape_html(new Date(story.createdAt).toLocaleDateString())}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (stories.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12">`);
        Icon($$renderer2, {
          icon: "heroicons:book-open",
          class: "w-16 h-16 mx-auto text-amber-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Stories Yet</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">Start preserving your family's precious memories</p> <button class="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors">Share Your First Story</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  FamilyStoriesPage($$renderer);
}
export {
  _page as default
};
