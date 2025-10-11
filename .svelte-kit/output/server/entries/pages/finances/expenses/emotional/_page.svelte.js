import { h as head, a as ensure_array_like, b as attr_class, f as attr_style, s as stringify } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import "../../../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let emotionalAnalytics, emotionalTriggers, topTriggers, satisfactionAnalysis, financialImpact;
    const pageDescription = "Analyze spending patterns and emotional triggers";
    const emotionalTags = [
      {
        id: "joy",
        name: "Joy",
        description: "Happy purchases that bring genuine pleasure",
        color: "from-yellow-400 to-yellow-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-800 dark:text-yellow-200",
        icon: "heroicons:face-smile",
        insights: "Joy spending is healthy when it aligns with your values and brings lasting happiness."
      },
      {
        id: "stress",
        name: "Stress Relief",
        description: "Purchases made to cope with stress or anxiety",
        color: "from-red-400 to-red-500",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        textColor: "text-red-800 dark:text-red-200",
        icon: "heroicons:face-frown",
        insights: "Stress spending often provides temporary relief but can create long-term financial pressure."
      },
      {
        id: "guilt",
        name: "Guilt Compensation",
        description: "Buying things to make up for feeling inadequate",
        color: "from-purple-400 to-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-800 dark:text-purple-200",
        icon: "heroicons:face-frown",
        iconColor: "text-purple-600",
        insights: "Guilt spending rarely addresses the root cause and may perpetuate negative cycles."
      },
      {
        id: "pride",
        name: "Pride",
        description: "Purchases that boost self-esteem or social status",
        color: "from-blue-400 to-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-800 dark:text-blue-200",
        icon: "heroicons:star",
        insights: "Pride spending can be positive when it reflects genuine achievement and self-worth."
      },
      {
        id: "care",
        name: "Care & Love",
        description: "Gifts and purchases made out of love for others",
        color: "from-green-400 to-green-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-800 dark:text-green-200",
        icon: "heroicons:heart",
        insights: "Care spending strengthens relationships and creates positive emotional connections."
      },
      {
        id: "necessary",
        name: "Necessary",
        description: "Essential purchases for daily living",
        color: "from-gray-400 to-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-900/20",
        textColor: "text-gray-800 dark:text-gray-200",
        icon: "heroicons:check-circle",
        insights: "Necessary spending is unavoidable but can be optimized for better value."
      },
      {
        id: "impulse",
        name: "Impulse",
        description: "Spontaneous purchases without prior planning",
        color: "from-orange-400 to-orange-500",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-800 dark:text-orange-200",
        icon: "heroicons:bolt",
        insights: "Impulse spending can be reduced with mindful shopping habits and waiting periods."
      },
      {
        id: "neutral",
        name: "Neutral",
        description: "Routine purchases without strong emotional attachment",
        color: "from-slate-400 to-slate-500",
        bgColor: "bg-slate-50 dark:bg-slate-900/20",
        textColor: "text-slate-800 dark:text-slate-200",
        icon: "heroicons:minus-circle",
        insights: "Neutral spending represents balanced, practical consumption patterns."
      }
    ];
    let spendingData = [
      {
        id: 1,
        date: "2024-01-15",
        amount: 2500,
        category: "shopping",
        description: "New saree for family function",
        emotionalTag: "pride",
        triggers: ["social pressure", "family expectations"],
        satisfaction: 7,
        regret: 2,
        notes: "Felt good wearing it, but could have bought something more affordable"
      },
      {
        id: 2,
        date: "2024-01-14",
        amount: 800,
        category: "entertainment",
        description: "Movie tickets and snacks",
        emotionalTag: "joy",
        triggers: ["weekend relaxation", "family time"],
        satisfaction: 9,
        regret: 1,
        notes: "Great family outing, worth every rupee"
      },
      {
        id: 3,
        date: "2024-01-13",
        amount: 1500,
        category: "shopping",
        description: "Online shopping spree",
        emotionalTag: "stress",
        triggers: ["work pressure", "retail therapy"],
        satisfaction: 4,
        regret: 7,
        notes: "Bought things I don't really need. Should have talked to someone instead."
      },
      {
        id: 4,
        date: "2024-01-12",
        amount: 3e3,
        category: "home",
        description: "New kitchen gadgets",
        emotionalTag: "care",
        triggers: ["want to cook better for family", "home improvement"],
        satisfaction: 8,
        regret: 1,
        notes: "Family really appreciates the new cooking tools"
      },
      {
        id: 5,
        date: "2024-01-11",
        amount: 450,
        category: "food",
        description: "Expensive coffee and pastry",
        emotionalTag: "impulse",
        triggers: ["saw it while walking", "felt tired"],
        satisfaction: 6,
        regret: 4,
        notes: "Tasted good but could have made coffee at home"
      },
      {
        id: 6,
        date: "2024-01-10",
        amount: 1200,
        category: "shopping",
        description: "Children's toys and books",
        emotionalTag: "care",
        triggers: ["children's education", "parenting guilt"],
        satisfaction: 9,
        regret: 1,
        notes: "Kids love the new books. Good investment in their development"
      },
      {
        id: 7,
        date: "2024-01-09",
        amount: 2200,
        category: "entertainment",
        description: "Concert tickets",
        emotionalTag: "joy",
        triggers: ["love for music", "rare opportunity"],
        satisfaction: 10,
        regret: 0,
        notes: "Amazing experience! Would do it again."
      },
      {
        id: 8,
        date: "2024-01-08",
        amount: 1800,
        category: "shopping",
        description: "New phone accessories",
        emotionalTag: "pride",
        triggers: ["keep up with technology", "social status"],
        satisfaction: 5,
        regret: 5,
        notes: "Look good but not essential. Old accessories were fine."
      }
    ];
    let insights = [
      {
        type: "pattern",
        title: "Stress Shopping Pattern",
        description: "You tend to spend more on non-essential items during stressful periods",
        recommendation: "Try alternative stress-relief activities like walking or calling friends",
        impact: "high"
      },
      {
        type: "trigger",
        title: "Social Pressure Trigger",
        description: "Purchases influenced by social expectations are common in your spending",
        recommendation: "Focus on purchases that align with your personal values rather than others' expectations",
        impact: "medium"
      },
      {
        type: "positive",
        title: "Care Spending Strength",
        description: "Your care-motivated purchases show strong family orientation",
        recommendation: "Continue this positive pattern - it's emotionally and financially healthy",
        impact: "positive"
      },
      {
        type: "opportunity",
        title: "Impulse Control Opportunity",
        description: "Impulse purchases could be reduced with a 24-hour waiting period",
        recommendation: "Implement a waiting period for non-essential purchases over ₹500",
        impact: "medium"
      }
    ];
    function getEmotionalTagInfo(tagId) {
      return emotionalTags.find((tag) => tag.id === tagId) || emotionalTags[emotionalTags.length - 1];
    }
    function getImpactColor(impact) {
      switch (impact) {
        case "high":
          return "text-red-600 bg-red-100 dark:bg-red-900/20";
        case "medium":
          return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
        case "positive":
          return "text-green-600 bg-green-100 dark:bg-green-900/20";
        default:
          return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
      }
    }
    function getSatisfactionColor(score) {
      if (score >= 8) return "text-green-600";
      if (score >= 6) return "text-yellow-600";
      return "text-red-600";
    }
    function getRegretColor(score) {
      if (score >= 6) return "text-red-600";
      if (score >= 4) return "text-yellow-600";
      return "text-green-600";
    }
    emotionalAnalytics = emotionalTags.map((tag) => {
      const tagExpenses = spendingData.filter((exp) => exp.emotionalTag === tag.id);
      const totalAmount = tagExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const avgSatisfaction = tagExpenses.length > 0 ? tagExpenses.reduce((sum, exp) => sum + exp.satisfaction, 0) / tagExpenses.length : 0;
      const avgRegret = tagExpenses.length > 0 ? tagExpenses.reduce((sum, exp) => sum + exp.regret, 0) / tagExpenses.length : 0;
      return {
        ...tag,
        count: tagExpenses.length,
        totalAmount,
        avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
        avgRegret: Math.round(avgRegret * 10) / 10,
        percentage: spendingData.length > 0 ? tagExpenses.length / spendingData.length * 100 : 0
      };
    }).filter((analytics) => analytics.count > 0);
    emotionalTriggers = spendingData.reduce(
      (acc, exp) => {
        exp.triggers?.forEach((trigger) => {
          acc[trigger] = (acc[trigger] || 0) + 1;
        });
        return acc;
      },
      {}
    );
    topTriggers = Object.entries(emotionalTriggers).sort(([, a], [, b]) => b[1] - a[1]).slice(0, 5).map(([trigger, count]) => ({ trigger, count }));
    satisfactionAnalysis = {
      highSatisfaction: spendingData.filter((exp) => exp.satisfaction >= 8).length,
      lowSatisfaction: spendingData.filter((exp) => exp.satisfaction <= 4).length,
      highRegret: spendingData.filter((exp) => exp.regret >= 6).length,
      totalTransactions: spendingData.length
    };
    financialImpact = {
      healthySpending: emotionalAnalytics.filter((tag) => ["joy", "care", "necessary"].includes(tag.id)).reduce((sum, tag) => sum + tag.totalAmount, 0),
      concerningSpending: emotionalAnalytics.filter((tag) => ["stress", "guilt", "impulse"].includes(tag.id)).reduce((sum, tag) => sum + tag.totalAmount, 0),
      totalSpending: spendingData.reduce((sum, exp) => sum + exp.amount, 0)
    };
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Emotional Spending - South Indian Family App</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)}/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50 dark:from-slate-900 dark:to-pink-900 p-6"><div class="max-w-7xl mx-auto"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><div class="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:heart",
      class: "w-8 h-8 text-pink-600 dark:text-pink-400"
    });
    $$renderer2.push(`<!----></div> <div><h1 class="text-3xl font-bold text-gray-900 dark:text-white">Emotional Spending</h1> <p class="text-gray-600 dark:text-gray-300 mt-1">Analyze spending patterns and emotional triggers</p></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:currency-rupee",
      class: "w-6 h-6 text-green-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Healthy Spending</p> <p class="text-2xl font-bold text-green-600">₹${escape_html(financialImpact.healthySpending.toLocaleString())}</p> <p class="text-xs text-gray-500 dark:text-gray-400">${escape_html((financialImpact.healthySpending / financialImpact.totalSpending * 100).toFixed(1))}%</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:exclamation-triangle",
      class: "w-6 h-6 text-red-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">Concerning Spending</p> <p class="text-2xl font-bold text-red-600">₹${escape_html(financialImpact.concerningSpending.toLocaleString())}</p> <p class="text-xs text-gray-500 dark:text-gray-400">${escape_html((financialImpact.concerningSpending / financialImpact.totalSpending * 100).toFixed(1))}%</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, { icon: "heroicons:face-smile", class: "w-6 h-6 text-blue-600" });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">High Satisfaction</p> <p class="text-2xl font-bold text-blue-600">${escape_html(satisfactionAnalysis.highSatisfaction)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">transactions</p></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><div class="flex items-center gap-3">`);
    Icon($$renderer2, {
      icon: "heroicons:face-frown",
      class: "w-6 h-6 text-orange-600"
    });
    $$renderer2.push(`<!----> <div><p class="text-sm text-gray-600 dark:text-gray-400">High Regret</p> <p class="text-2xl font-bold text-orange-600">${escape_html(satisfactionAnalysis.highRegret)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">transactions</p></div></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Emotional Spending Breakdown</h3> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(emotionalAnalytics);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let analytics = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`p-4 rounded-lg ${stringify(analytics.bgColor)}`)}><div class="flex items-center justify-between mb-2"><div class="flex items-center gap-3"><div class="p-2 rounded-lg"${attr_style(`background: linear-gradient(${stringify(analytics.color)})`)}>`);
      Icon($$renderer2, { icon: analytics.icon, class: "w-5 h-5 text-white" });
      $$renderer2.push(`<!----></div> <div><h4${attr_class(`font-medium ${stringify(analytics.textColor)}`)}>${escape_html(analytics.name)}</h4> <p class="text-sm text-gray-600 dark:text-gray-400">${escape_html(analytics.count)} transactions</p></div></div> <div class="text-right"><div${attr_class(`font-semibold ${stringify(analytics.textColor)}`)}>₹${escape_html(analytics.totalAmount.toLocaleString())}</div> <div class="text-sm text-gray-500 dark:text-gray-400">${escape_html(analytics.percentage.toFixed(1))}%</div></div></div> <div class="grid grid-cols-2 gap-4 text-sm"><div><div class="text-gray-600 dark:text-gray-400">Avg Satisfaction</div> <div${attr_class(`font-medium ${stringify(getSatisfactionColor(analytics.avgSatisfaction))}`)}>${escape_html(analytics.avgSatisfaction)}/10</div></div> <div><div class="text-gray-600 dark:text-gray-400">Avg Regret</div> <div${attr_class(`font-medium ${stringify(getRegretColor(analytics.avgRegret))}`)}>${escape_html(analytics.avgRegret)}/10</div></div></div> <div class="mt-3 text-xs text-gray-600 dark:text-gray-400">${escape_html(analytics.insights)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Emotional Triggers</h3> <div class="space-y-3"><!--[-->`);
    const each_array_1 = ensure_array_like(topTriggers);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let trigger = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"><div class="flex items-center gap-3">`);
      Icon($$renderer2, {
        icon: "heroicons:light-bulb",
        class: "w-5 h-5 text-yellow-600"
      });
      $$renderer2.push(`<!----> <span class="text-gray-900 dark:text-white capitalize">${escape_html(trigger.trigger.replace(/_/g, " "))}</span></div> <div class="flex items-center gap-2"><div class="w-16 bg-gray-200 dark:bg-slate-600 rounded-full h-2"><div class="bg-yellow-600 h-2 rounded-full"${attr_style(`width: ${stringify(trigger.count / Math.max(...topTriggers.map((t) => t.count)) * 100)}%`)}></div></div> <span class="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">${escape_html(trigger.count)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-6"><h4 class="text-md font-semibold mb-3 text-gray-900 dark:text-white">Behavioral Insights</h4> <div class="space-y-3"><!--[-->`);
    const each_array_2 = ensure_array_like(insights);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let insight = each_array_2[$$index_2];
      $$renderer2.push(`<div class="p-3 rounded-lg border border-gray-200 dark:border-slate-600"><div class="flex items-start gap-3"><div${attr_class(`p-1 rounded ${stringify(getImpactColor(insight.impact))}`)}>`);
      if (insight.type === "positive") {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { icon: "heroicons:check-circle", class: "w-4 h-4" });
      } else {
        $$renderer2.push("<!--[!-->");
        if (insight.type === "pattern") {
          $$renderer2.push("<!--[-->");
          Icon($$renderer2, { icon: "heroicons:exclamation-circle", class: "w-4 h-4" });
        } else {
          $$renderer2.push("<!--[!-->");
          Icon($$renderer2, { icon: "heroicons:light-bulb", class: "w-4 h-4" });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="flex-1"><h5 class="font-medium text-gray-900 dark:text-white text-sm">${escape_html(insight.title)}</h5> <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">${escape_html(insight.description)}</p> <p class="text-xs font-medium text-blue-600 dark:text-blue-400 mt-2">${escape_html(insight.recommendation)}</p></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"><h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Emotional Transactions</h3> <div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 dark:bg-slate-700"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Emotion</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Satisfaction</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Regret</th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-slate-600"><!--[-->`);
    const each_array_3 = ensure_array_like(spendingData.slice(0, 10));
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let transaction = each_array_3[$$index_3];
      const emotionInfo = getEmotionalTagInfo(transaction.emotionalTag);
      $$renderer2.push(`<tr class="hover:bg-gray-50 dark:hover:bg-slate-700"><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${escape_html(new Date(transaction.date).toLocaleDateString())}</td><td class="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs"><div class="font-medium">${escape_html(transaction.description)}</div> `);
      if (transaction.notes) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-gray-500 dark:text-gray-400 text-xs mt-1">${escape_html(transaction.notes)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">₹${escape_html(transaction.amount.toLocaleString())}</td><td class="px-6 py-4 whitespace-nowrap text-sm"><div class="flex items-center gap-2"><div class="p-1 rounded"${attr_style(`background: linear-gradient(${stringify(emotionInfo.color)})`)}>`);
      Icon($$renderer2, { icon: emotionInfo.icon, class: "w-4 h-4 text-white" });
      $$renderer2.push(`<!----></div> <span class="text-gray-900 dark:text-white">${escape_html(emotionInfo.name)}</span></div></td><td class="px-6 py-4 whitespace-nowrap text-sm"><span${attr_class(`font-medium ${getSatisfactionColor(transaction.satisfaction)}`)}>${escape_html(transaction.satisfaction)}/10</span></td><td class="px-6 py-4 whitespace-nowrap text-sm"><span${attr_class(`font-medium ${getRegretColor(transaction.regret)}`)}>${escape_html(transaction.regret)}/10</span></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div class="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800"><div class="flex items-start gap-4"><div class="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">`);
    Icon($$renderer2, {
      icon: "heroicons:sparkles",
      class: "w-6 h-6 text-pink-600 dark:text-pink-400"
    });
    $$renderer2.push(`<!----></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Emotional Wellness Tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><h4 class="font-medium text-gray-900 dark:text-white mb-1">Mindful Spending</h4> <p class="text-gray-600 dark:text-gray-300">Pause before purchases and ask: "Does this align with my values?"</p></div> <div><h4 class="font-medium text-gray-900 dark:text-white mb-1">Alternative Coping</h4> <p class="text-gray-600 dark:text-gray-300">Try walking, meditation, or talking to friends instead of retail therapy</p></div> <div><h4 class="font-medium text-gray-900 dark:text-white mb-1">Gratitude Practice</h4> <p class="text-gray-600 dark:text-gray-300">Focus on what you have rather than what you want to buy</p></div> <div><h4 class="font-medium text-gray-900 dark:text-white mb-1">Value Alignment</h4> <p class="text-gray-600 dark:text-gray-300">Ensure purchases reflect your personal values and long-term goals</p></div></div></div></div></div></div></div>`);
  });
}
export {
  _page as default
};
