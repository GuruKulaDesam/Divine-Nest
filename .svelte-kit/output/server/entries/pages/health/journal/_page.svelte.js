import "clsx";
import { a as ensure_array_like, s as stringify } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function JournalPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let journals = [
      {
        id: 1,
        title: "Daily Reflections",
        content: "Today was a productive day. I completed my morning routine and spent quality time with family.",
        date: "2024-01-15",
        mood: "happy",
        tags: ["reflection", "family", "productivity"],
        category: "Personal"
      },
      {
        id: 2,
        title: "Learning Journey",
        content: "Started learning about sustainable living practices. The concepts are fascinating.",
        date: "2024-01-14",
        mood: "thoughtful",
        tags: ["learning", "sustainability"],
        category: "Education"
      },
      {
        id: 3,
        title: "Family Moments",
        content: "Had a wonderful dinner with the family. Everyone shared stories from their day.",
        date: "2024-01-13",
        mood: "joyful",
        tags: ["family", "dinner", "stories"],
        category: "Family"
      }
    ];
    let filteredJournals = journals;
    let searchQuery = "";
    let selectedCategory = "all";
    let selectedMood = "all";
    ({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    let categories = [
      "Personal",
      "Family",
      "Education",
      "Work",
      "Health",
      "Spirituality"
    ];
    let moods = [
      {
        id: "happy",
        name: "Happy",
        icon: "mdi:emoticon-happy",
        color: "text-yellow-500"
      },
      {
        id: "sad",
        name: "Sad",
        icon: "mdi:emoticon-sad",
        color: "text-blue-500"
      },
      {
        id: "angry",
        name: "Angry",
        icon: "mdi:emoticon-angry",
        color: "text-red-500"
      },
      {
        id: "thoughtful",
        name: "Thoughtful",
        icon: "mdi:emoticon-neutral",
        color: "text-purple-500"
      },
      {
        id: "joyful",
        name: "Joyful",
        icon: "mdi:emoticon-excited",
        color: "text-green-500"
      },
      {
        id: "neutral",
        name: "Neutral",
        icon: "mdi:emoticon-neutral",
        color: "text-gray-500"
      }
    ];
    function getMoodIcon(moodId) {
      const mood = moods.find((m) => m.id === moodId);
      return mood ? mood.icon : "mdi:emoticon-neutral";
    }
    function getMoodColor(moodId) {
      const mood = moods.find((m) => m.id === moodId);
      return mood ? mood.color : "text-gray-500";
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    }
    {
      filteredJournals = journals.filter((journal) => {
        const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) || journal.content.toLowerCase().includes(searchQuery.toLowerCase()) || journal.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "all";
        const matchesMood = selectedMood === "all";
        return matchesSearch && matchesCategory && matchesMood;
      });
    }
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-3xl font-bold text-base-content flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "mdi:book-open-variant",
      class: "text-3xl text-primary"
    });
    $$renderer2.push(`<!----> Journal</h1> <p class="text-base-content/70 mt-1">Record your thoughts, experiences, and reflections</p></div> <button class="btn btn-primary gap-2">`);
    Icon($$renderer2, { icon: "mdi:plus" });
    $$renderer2.push(`<!----> New Entry</button></div> <div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-control"><label class="label"><span class="label-text">Search Journals</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by title, content, or tags..." class="input input-bordered w-full"/></div> <div class="form-control"><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`All Categories`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-control"><label class="label"><span class="label-text">Mood</span></label> `);
    $$renderer2.select({ value: selectedMood, class: "select select-bordered w-full" }, ($$renderer3) => {
      $$renderer3.option({ value: "all" }, ($$renderer4) => {
        $$renderer4.push(`All Moods`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(moods);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let mood = each_array_1[$$index_1];
        $$renderer3.option({ value: mood.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(mood.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="flex items-end"><div class="stats stats-vertical lg:stats-horizontal shadow w-full"><div class="stat"><div class="stat-title">Total Entries</div> <div class="stat-value text-primary">${escape_html(journals.length)}</div></div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredJournals);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let journal = each_array_2[$$index_3];
      $$renderer2.push(`<div class="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6 hover:shadow-md transition-shadow"><div class="flex justify-between items-start mb-4"><div class="flex-1"><h3 class="text-xl font-semibold text-base-content mb-2">${escape_html(journal.title)}</h3> <div class="flex items-center gap-2 text-sm text-base-content/60 mb-2">`);
      Icon($$renderer2, { icon: "mdi:calendar" });
      $$renderer2.push(`<!----> ${escape_html(formatDate(journal.date))} <span class="mx-2">•</span> <span class="badge badge-outline">${escape_html(journal.category)}</span></div></div> <div class="flex items-center gap-2">`);
      Icon($$renderer2, {
        icon: getMoodIcon(journal.mood),
        class: `text-2xl ${stringify(getMoodColor(journal.mood))}`
      });
      $$renderer2.push(`<!----> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><button>Edit Entry</button></li> <li><button class="text-error">Delete</button></li></ul></div></div></div> <p class="text-base-content/80 mb-4 line-clamp-3 svelte-hrabyw">${escape_html(journal.content)}</p> `);
      if (journal.tags.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex flex-wrap gap-1 mb-4"><!--[-->`);
        const each_array_3 = ensure_array_like(journal.tags);
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let tag = each_array_3[$$index_2];
          $$renderer2.push(`<span class="badge badge-primary badge-sm">#${escape_html(tag)}</span>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex justify-between items-center pt-4 border-t border-base-300"><div class="text-sm text-base-content/60">${escape_html(journal.content.length)} characters</div> <button class="btn btn-ghost btn-sm text-primary">Read More</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredJournals.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:book-open-page-variant-outline",
        class: "text-6xl text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-base-content/60 mb-2">No journal entries found</h3> <p class="text-base-content/50 mb-4">Start writing your first journal entry to capture your thoughts and experiences.</p> <button class="btn btn-primary">Write Your First Entry</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer) {
  JournalPage($$renderer);
}
export {
  _page as default
};
