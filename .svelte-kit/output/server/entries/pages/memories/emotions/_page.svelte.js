import "clsx";
import { a as ensure_array_like, b as attr_class, s as stringify, d as attr, j as attr_style } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as escape_html } from "../../../../chunks/context.js";
function EmotionsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredEmotions, categoryStats;
    let emotions = [
      {
        id: 1,
        emotion: "Happy",
        intensity: 8,
        trigger: "Family gathering",
        date: "2024-01-15",
        notes: "Great time with family",
        category: "Positive"
      },
      {
        id: 2,
        emotion: "Anxious",
        intensity: 6,
        trigger: "Work deadline",
        date: "2024-01-14",
        notes: "Feeling stressed about project",
        category: "Negative"
      },
      {
        id: 3,
        emotion: "Peaceful",
        intensity: 9,
        trigger: "Morning meditation",
        date: "2024-01-13",
        notes: "Very calm after yoga session",
        category: "Positive"
      }
    ];
    let searchQuery = "";
    let selectedCategory = "all";
    ({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    const categories = [
      {
        id: "all",
        name: "All Emotions",
        icon: "mdi:emoticon-outline"
      },
      {
        id: "Positive",
        name: "Positive",
        icon: "mdi:emoticon-happy-outline",
        color: "text-green-600"
      },
      {
        id: "Negative",
        name: "Negative",
        icon: "mdi:emoticon-sad-outline",
        color: "text-red-600"
      },
      {
        id: "Neutral",
        name: "Neutral",
        icon: "mdi:emoticon-neutral-outline",
        color: "text-yellow-600"
      }
    ];
    function getIntensityColor(intensity) {
      if (intensity >= 8) return "bg-green-500";
      if (intensity >= 6) return "bg-yellow-500";
      if (intensity >= 4) return "bg-orange-500";
      return "bg-red-500";
    }
    function getEmotionIcon(emotion) {
      const iconMap = {
        "Happy": "mdi:emoticon-happy",
        "Sad": "mdi:emoticon-sad",
        "Angry": "mdi:emoticon-angry",
        "Anxious": "mdi:emoticon-worried",
        "Peaceful": "mdi:emoticon-cool",
        "Excited": "mdi:emoticon-excited",
        "Frustrated": "mdi:emoticon-confused",
        "Calm": "mdi:emoticon-cool",
        "Joyful": "mdi:emoticon-happy",
        "Worried": "mdi:emoticon-worried",
        "Content": "mdi:emoticon-happy",
        "Stressed": "mdi:emoticon-sad",
        "Grateful": "mdi:emoticon-happy",
        "Overwhelmed": "mdi:emoticon-confused",
        "Confident": "mdi:emoticon-cool",
        "Insecure": "mdi:emoticon-sad"
      };
      return iconMap[emotion] || "mdi:emoticon-outline";
    }
    function getCategoryStats() {
      const stats = {};
      categories.forEach((cat) => {
        if (cat.id !== "all") {
          stats[cat.id] = emotions.filter((e) => e.category === cat.id).length;
        }
      });
      return stats;
    }
    filteredEmotions = emotions.filter((emotion) => {
      const matchesSearch = emotion.emotion.toLowerCase().includes(searchQuery.toLowerCase()) || emotion.trigger.toLowerCase().includes(searchQuery.toLowerCase()) || emotion.notes.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all";
      return matchesSearch && matchesCategory;
    });
    categoryStats = getCategoryStats();
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h1 class="text-3xl font-bold text-base-content">Emotions Tracker</h1> <p class="text-base-content/70 mt-1">Track and understand your emotional well-being</p></div> <button class="btn btn-primary">`);
    Icon($$renderer2, { icon: "mdi:plus", class: "w-5 h-5" });
    $$renderer2.push(`<!----> Add Emotion</button></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
    const each_array = ensure_array_like(categories.slice(1));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<div class="stat bg-base-100 rounded-xl shadow-sm"><div${attr_class(`stat-figure ${stringify(category.color)}`)}>`);
      Icon($$renderer2, { icon: category.icon, class: "w-8 h-8" });
      $$renderer2.push(`<!----></div> <div class="stat-title">${escape_html(category.name)} Emotions</div> <div class="stat-value">${escape_html(categoryStats[category.id] || 0)}</div> <div class="stat-desc">Total recorded</div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="label"><span class="label-text">Search Emotions</span></label> <input type="text"${attr("value", searchQuery)} placeholder="Search by emotion, trigger, or notes..." class="input input-bordered w-full"/></div> <div><label class="label"><span class="label-text">Category</span></label> `);
    $$renderer2.select(
      {
        value: selectedCategory,
        class: "select select-bordered w-full"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(categories);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let category = each_array_1[$$index_1];
          $$renderer3.option({ value: category.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredEmotions);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let emotion = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"><div class="card-body"><div class="flex items-start justify-between"><div class="flex items-center gap-3"><div class="avatar placeholder"><div class="bg-neutral text-neutral-content rounded-full w-12">`);
      Icon($$renderer2, { icon: getEmotionIcon(emotion.emotion), class: "w-6 h-6" });
      $$renderer2.push(`<!----></div></div> <div><h3 class="card-title text-lg">${escape_html(emotion.emotion)}</h3> <p class="text-sm text-base-content/70">${escape_html(emotion.date)}</p></div></div> <div class="dropdown dropdown-end"><button class="btn btn-ghost btn-sm">`);
      Icon($$renderer2, { icon: "mdi:dots-vertical", class: "w-5 h-5" });
      $$renderer2.push(`<!----></button> <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"><li><a>Edit</a></li> <li><a class="text-error">Delete</a></li></ul></div></div> <div class="space-y-3"><div><div class="flex justify-between items-center mb-1"><span class="text-sm font-medium">Intensity</span> <span class="text-sm">${escape_html(emotion.intensity)}/10</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full ${stringify(getIntensityColor(emotion.intensity))}`)}${attr_style(`width: ${stringify(emotion.intensity * 10)}%`)}></div></div></div> <div><span class="text-sm font-medium">Trigger:</span> <p class="text-sm text-base-content/80">${escape_html(emotion.trigger)}</p></div> `);
      if (emotion.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div><span class="text-sm font-medium">Notes:</span> <p class="text-sm text-base-content/80">${escape_html(emotion.notes)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div${attr_class(`badge ${stringify(emotion.category === "Positive" ? "badge-success" : emotion.category === "Negative" ? "badge-error" : "badge-warning")}`)}>${escape_html(emotion.category)}</div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredEmotions.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Icon($$renderer2, {
        icon: "mdi:emoticon-outline",
        class: "w-16 h-16 text-base-content/30 mx-auto mb-4"
      });
      $$renderer2.push(`<!----> <h3 class="text-lg font-medium text-base-content/70">No emotions found</h3> <p class="text-base-content/50">Start tracking your emotions to see them here.</p></div>`);
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
  EmotionsPage($$renderer);
}
export {
  _page as default
};
