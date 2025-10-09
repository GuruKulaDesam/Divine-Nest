import { a as ensure_array_like, b as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import "./database.js";
import { e as escape_html } from "./context.js";
function EmotionsFeelingsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentTab = "dashboard";
    let moodEntries = [];
    const tabs = [
      {
        id: "dashboard",
        label: "Emotional Dashboard",
        icon: "heroicons:heart"
      },
      {
        id: "moods",
        label: "Mood Tracker",
        icon: "heroicons:face-smile"
      },
      {
        id: "support",
        label: "Family Support",
        icon: "heroicons:user-group"
      },
      {
        id: "wellness",
        label: "Emotional Wellness",
        icon: "heroicons:sparkles"
      },
      {
        id: "harmony",
        label: "Family Harmony",
        icon: "heroicons:peace"
      }
    ];
    const moods = [
      {
        id: "joyful",
        label: "Joyful",
        emoji: "😊",
        color: "text-yellow-500",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
      },
      {
        id: "content",
        label: "Content",
        emoji: "😌",
        color: "text-green-500",
        bgColor: "bg-green-100 dark:bg-green-900/20"
      },
      {
        id: "neutral",
        label: "Neutral",
        emoji: "😐",
        color: "text-gray-500",
        bgColor: "bg-gray-100 dark:bg-gray-900/20"
      },
      {
        id: "anxious",
        label: "Anxious",
        emoji: "😰",
        color: "text-orange-500",
        bgColor: "bg-orange-100 dark:bg-orange-900/20"
      },
      {
        id: "sad",
        label: "Sad",
        emoji: "😢",
        color: "text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/20"
      },
      {
        id: "frustrated",
        label: "Frustrated",
        emoji: "😤",
        color: "text-red-500",
        bgColor: "bg-red-100 dark:bg-red-900/20"
      },
      {
        id: "excited",
        label: "Excited",
        emoji: "🤩",
        color: "text-purple-500",
        bgColor: "bg-purple-100 dark:bg-purple-900/20"
      },
      {
        id: "peaceful",
        label: "Peaceful",
        emoji: "🧘‍♀️",
        color: "text-indigo-500",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
      }
    ];
    let emotionalWisdom = [
      {
        sanskrit: "क्रोधो हि शत्रुः प्रथमो नराणाम्",
        english: "Anger is indeed the first enemy of humans",
        tamil: "கோபம் மனிதர்களின் முதல் எதிரி",
        context: "Teaching emotional regulation",
        remedy: "Take 10 deep breaths before responding"
      },
      {
        sanskrit: "प्रसन्नमनसः सर्वं सुखं भवति",
        english: "Everything becomes pleasant for a cheerful mind",
        tamil: "மகிழ்ச்சியான மனதிற்கு அனைத்தும் இனிமையாகும்",
        context: "Maintaining positive outlook",
        remedy: "Practice gratitude daily"
      },
      {
        sanskrit: "सुखस्य मूलं धर्मः",
        english: "Righteousness is the root of happiness",
        tamil: "மகிழ்ச்சியின் வேர் தர்மம்",
        context: "Finding true contentment",
        remedy: "Act with compassion and integrity"
      }
    ];
    function getMoodData(moodId) {
      return moods.find((mood) => mood.id === moodId) || moods[2];
    }
    function calculateMoodStats() {
      const last7Days = moodEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        const weekAgo = /* @__PURE__ */ new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
      });
      const moodCounts = {};
      let totalIntensity = 0;
      last7Days.forEach((entry) => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        totalIntensity += entry.intensity;
      });
      const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, "neutral");
      const averageIntensity = last7Days.length > 0 ? totalIntensity / last7Days.length : 5;
      return {
        weeklyEntries: last7Days.length,
        mostCommonMood,
        averageIntensity: averageIntensity.toFixed(1),
        moodDistribution: moodCounts
      };
    }
    let moodStats = {};
    if (moodEntries.length >= 0) {
      moodStats = calculateMoodStats();
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-rose-900/20"><div class="container mx-auto px-4 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-3"><div class="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white">`);
    Icon($$renderer2, { icon: "heroicons:heart", class: "w-8 h-8" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Emotions &amp; Feelings</h1> <p class="text-gray-600 dark:text-gray-300">मनः शान्तिर्भवति | Let the mind find peace</p></div></div></div> <div class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white mb-6"><div class="flex items-center space-x-4">`);
    Icon($$renderer2, { icon: "heroicons:sparkles", class: "w-12 h-12 text-white/80" });
    $$renderer2.push(`<!----> <div><h3 class="text-xl font-bold mb-2">भावना संतुलन | Emotional Balance</h3> <p class="text-white/90">"Understanding and honoring our emotions leads to harmony within ourselves and our family."</p> <p class="text-sm text-white/70 mt-2">Tamil: "உணர்வுகளைப் புரிந்துகொள்வது குடும்பத்தில் நல்லிணக்கம் கொண்டுவரும்"</p></div></div></div></div> <div class="flex flex-wrap gap-2 mb-6"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${stringify(currentTab === tab.id ? "bg-pink-500 text-white shadow-lg" : "bg-white/80 text-gray-700 hover:bg-pink-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-pink-900/20")}`)}>`);
      Icon($$renderer2, { icon: tab.icon, class: "w-4 h-4" });
      $$renderer2.push(`<!----> <span class="font-medium">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"><div class="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:chart-bar",
        class: "w-8 h-8 mx-auto text-pink-600 dark:text-pink-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-pink-900 dark:text-pink-100">${escape_html(moodStats.weeklyEntries || 0)}</p> <p class="text-sm text-pink-700 dark:text-pink-300">This Week</p></div> <div class="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl p-4 text-center"><div class="w-8 h-8 mx-auto mb-2 text-2xl">${escape_html(getMoodData(moodStats.mostCommonMood)?.emoji || "😐")}</div> <p class="text-sm font-bold text-green-900 dark:text-green-100">${escape_html(getMoodData(moodStats.mostCommonMood)?.label || "Neutral")}</p> <p class="text-sm text-green-700 dark:text-green-300">Most Common</p></div> <div class="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:signal",
        class: "w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">${escape_html(moodStats.averageIntensity || "5.0")}</p> <p class="text-sm text-blue-700 dark:text-blue-300">Avg Intensity</p></div> <div class="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl p-4 text-center">`);
      Icon($$renderer2, {
        icon: "heroicons:heart",
        class: "w-8 h-8 mx-auto text-yellow-600 dark:text-yellow-400 mb-2"
      });
      $$renderer2.push(`<!----> <p class="text-2xl font-bold text-yellow-900 dark:text-yellow-100">${escape_html(Object.keys(moodStats.moodDistribution || {}).length)}</p> <p class="text-sm text-yellow-700 dark:text-yellow-300">Mood Variety</p></div></div> <div class="mb-8"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">💭 How are you feeling today?</h3> <div class="grid grid-cols-4 md:grid-cols-8 gap-3"><!--[-->`);
      const each_array_1 = ensure_array_like(moods);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let mood = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class(`p-4 rounded-xl border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-200 ${stringify(mood.bgColor)}`)}><div class="text-3xl mb-2">${escape_html(mood.emoji)}</div> <p${attr_class(`text-xs font-medium ${stringify(mood.color)}`)}>${escape_html(mood.label)}</p></button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="mb-8"><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">🌸 Daily Emotional Wisdom</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
      const each_array_2 = ensure_array_like(emotionalWisdom);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let wisdom = each_array_2[$$index_2];
        $$renderer2.push(`<div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700"><blockquote class="font-semibold text-orange-800 dark:text-orange-200 mb-2">"${escape_html(wisdom.english)}"</blockquote> <p class="text-sm text-orange-700 dark:text-orange-300 mb-1">${escape_html(wisdom.sanskrit)}</p> <p class="text-sm text-orange-600 dark:text-orange-400 mb-2">${escape_html(wisdom.tamil)}</p> <div class="mt-3 p-2 bg-orange-100 dark:bg-orange-800 rounded-lg"><p class="text-xs font-medium text-orange-800 dark:text-orange-200">Remedy: ${escape_html(wisdom.remedy)}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div><h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">📊 Recent Mood Entries</h3> <div class="space-y-3"><!--[-->`);
      const each_array_3 = ensure_array_like(moodEntries.slice(-5).reverse());
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let entry = each_array_3[$$index_3];
        $$renderer2.push(`<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex items-center space-x-4"><div class="text-2xl">${escape_html(getMoodData(entry.mood).emoji)}</div> <div><h4 class="font-medium text-gray-900 dark:text-white">${escape_html(getMoodData(entry.mood).label)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Intensity: ${escape_html(entry.intensity)}/10 `);
        if (entry.triggers && entry.triggers.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`• Triggers: ${escape_html(entry.triggers.slice(0, 2).join(", "))}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></p></div></div> <div class="text-right"><p class="text-xs text-gray-500 dark:text-gray-400">${escape_html(new Date(entry.date).toLocaleDateString())}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (moodEntries.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-8">`);
        Icon($$renderer2, {
          icon: "heroicons:heart",
          class: "w-16 h-16 mx-auto text-pink-400 mb-4"
        });
        $$renderer2.push(`<!----> <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Your Emotional Journey</h3> <p class="text-gray-500 dark:text-gray-400">Begin tracking your moods to understand patterns and improve wellbeing</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  EmotionsFeelingsPage as default
};
