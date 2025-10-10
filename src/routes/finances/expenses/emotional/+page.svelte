<script lang="ts">
  import Icon from "@iconify/svelte";
  import { motionInView, motionHover } from "$lib/utils/motion.js";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // Page title and description
  const pageTitle = "Emotional Spending";
  const pageDescription = "Analyze spending patterns and emotional triggers";

  // Emotional tags with detailed descriptions
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

  // Sample emotional spending data
  let spendingData: any[] = [
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
      amount: 3000,
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

  // Analysis filters
  let selectedPeriod = "30days"; // 7days, 30days, 90days
  let selectedEmotion = "";

  // Behavioral insights
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

  // Calculate emotional spending analytics
  $: emotionalAnalytics = emotionalTags.map(tag => {
    const tagExpenses = spendingData.filter(exp => exp.emotionalTag === tag.id);
    const totalAmount = tagExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgSatisfaction = tagExpenses.length > 0
      ? tagExpenses.reduce((sum, exp) => sum + exp.satisfaction, 0) / tagExpenses.length
      : 0;
    const avgRegret = tagExpenses.length > 0
      ? tagExpenses.reduce((sum, exp) => sum + exp.regret, 0) / tagExpenses.length
      : 0;

    return {
      ...tag,
      count: tagExpenses.length,
      totalAmount,
      avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
      avgRegret: Math.round(avgRegret * 10) / 10,
      percentage: spendingData.length > 0 ? (tagExpenses.length / spendingData.length) * 100 : 0
    };
  }).filter(analytics => analytics.count > 0);

  // Top emotional triggers
  $: emotionalTriggers = spendingData.reduce((acc: Record<string, number>, exp) => {
    exp.triggers?.forEach(trigger => {
      acc[trigger] = (acc[trigger] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  $: topTriggers = Object.entries(emotionalTriggers)
  .sort(([,a]: [string, number], [,b]: [string, number]) => b[1] - a[1])
    .slice(0, 5)
    .map(([trigger, count]) => ({ trigger, count }));

  // Spending satisfaction analysis
  $: satisfactionAnalysis = {
    highSatisfaction: spendingData.filter(exp => exp.satisfaction >= 8).length,
    lowSatisfaction: spendingData.filter(exp => exp.satisfaction <= 4).length,
    highRegret: spendingData.filter(exp => exp.regret >= 6).length,
    totalTransactions: spendingData.length
  };

  // Financial impact assessment
  $: financialImpact = {
    healthySpending: emotionalAnalytics
      .filter(tag => ['joy', 'care', 'necessary'].includes(tag.id))
      .reduce((sum, tag) => sum + tag.totalAmount, 0),
    concerningSpending: emotionalAnalytics
      .filter(tag => ['stress', 'guilt', 'impulse'].includes(tag.id))
      .reduce((sum, tag) => sum + tag.totalAmount, 0),
    totalSpending: spendingData.reduce((sum, exp) => sum + exp.amount, 0)
  };

  function getEmotionalTagInfo(tagId: string) {
    return emotionalTags.find(tag => tag.id === tagId) || emotionalTags[emotionalTags.length - 1];
  }

  function getImpactColor(impact: string) {
    switch (impact) {
      case "high": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "positive": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  }

  function getSatisfactionColor(score: number) {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  }

  function getRegretColor(score: number) {
    if (score >= 6) return "text-red-600";
    if (score >= 4) return "text-yellow-600";
    return "text-green-600";
  }
</script>

<svelte:head>
  <title>{pageTitle} - South Indian Family App</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50 dark:from-slate-900 dark:to-pink-900 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" use:motionInView>
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
          <Icon icon="heroicons:heart" class="w-8 h-8 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-1">{pageDescription}</p>
        </div>
      </div>

      <!-- Financial Impact Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:currency-rupee" class="w-6 h-6 text-green-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Healthy Spending</p>
              <p class="text-2xl font-bold text-green-600">₹{financialImpact.healthySpending.toLocaleString()}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {((financialImpact.healthySpending / financialImpact.totalSpending) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:exclamation-triangle" class="w-6 h-6 text-red-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Concerning Spending</p>
              <p class="text-2xl font-bold text-red-600">₹{financialImpact.concerningSpending.toLocaleString()}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {((financialImpact.concerningSpending / financialImpact.totalSpending) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:face-smile" class="w-6 h-6 text-blue-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">High Satisfaction</p>
              <p class="text-2xl font-bold text-blue-600">{satisfactionAnalysis.highSatisfaction}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">transactions</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <Icon icon="heroicons:face-frown" class="w-6 h-6 text-orange-600" />
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">High Regret</p>
              <p class="text-2xl font-bold text-orange-600">{satisfactionAnalysis.highRegret}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Emotional Spending Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Emotional Breakdown -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Emotional Spending Breakdown</h3>
        <div class="space-y-4">
          {#each emotionalAnalytics as analytics}
            <div class="p-4 rounded-lg {analytics.bgColor}">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-lg" style="background: linear-gradient({analytics.color})">
                    <Icon icon={analytics.icon} class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 class="font-medium {analytics.textColor}">{analytics.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{analytics.count} transactions</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-semibold {analytics.textColor}">₹{analytics.totalAmount.toLocaleString()}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{analytics.percentage.toFixed(1)}%</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div class="text-gray-600 dark:text-gray-400">Avg Satisfaction</div>
                  <div class="font-medium {getSatisfactionColor(analytics.avgSatisfaction)}">
                    {analytics.avgSatisfaction}/10
                  </div>
                </div>
                <div>
                  <div class="text-gray-600 dark:text-gray-400">Avg Regret</div>
                  <div class="font-medium {getRegretColor(analytics.avgRegret)}">
                    {analytics.avgRegret}/10
                  </div>
                </div>
              </div>

              <div class="mt-3 text-xs text-gray-600 dark:text-gray-400">
                {analytics.insights}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Top Emotional Triggers -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Emotional Triggers</h3>
        <div class="space-y-3">
          {#each topTriggers as trigger}
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="flex items-center gap-3">
                <Icon icon="heroicons:light-bulb" class="w-5 h-5 text-yellow-600" />
                <span class="text-gray-900 dark:text-white capitalize">{trigger.trigger.replace(/_/g, ' ')}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-16 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                  <div
                    class="bg-yellow-600 h-2 rounded-full"
                    style="width: {(trigger.count / Math.max(...topTriggers.map(t => t.count))) * 100}%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">{trigger.count}</span>
              </div>
            </div>
          {/each}
        </div>

        <!-- Behavioral Insights -->
        <div class="mt-6">
          <h4 class="text-md font-semibold mb-3 text-gray-900 dark:text-white">Behavioral Insights</h4>
          <div class="space-y-3">
            {#each insights as insight}
              <div class="p-3 rounded-lg border border-gray-200 dark:border-slate-600">
                <div class="flex items-start gap-3">
                  <div class="p-1 rounded {getImpactColor(insight.impact)}">
                    {#if insight.type === 'positive'}
                      <Icon icon="heroicons:check-circle" class="w-4 h-4" />
                    {:else if insight.type === 'pattern'}
                      <Icon icon="heroicons:exclamation-circle" class="w-4 h-4" />
                    {:else}
                      <Icon icon="heroicons:light-bulb" class="w-4 h-4" />
                    {/if}
                  </div>
                  <div class="flex-1">
                    <h5 class="font-medium text-gray-900 dark:text-white text-sm">{insight.title}</h5>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{insight.description}</p>
                    <p class="text-xs font-medium text-blue-600 dark:text-blue-400 mt-2">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Emotional Transactions -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700" use:motionInView>
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Emotional Transactions</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Emotion</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Satisfaction</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Regret</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-slate-600">
            {#each spendingData.slice(0, 10) as transaction (transaction.id)}
              {@const emotionInfo = getEmotionalTagInfo(transaction.emotionalTag)}
              <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs">
                  <div class="font-medium">{transaction.description}</div>
                  {#if transaction.notes}
                    <div class="text-gray-500 dark:text-gray-400 text-xs mt-1">{transaction.notes}</div>
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  ₹{transaction.amount.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <div class="p-1 rounded" style="background: linear-gradient({emotionInfo.color})">
                      <Icon icon={emotionInfo.icon} class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-900 dark:text-white">{emotionInfo.name}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class={`font-medium ${getSatisfactionColor(transaction.satisfaction)}`}>
                    {transaction.satisfaction}/10
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class={`font-medium ${getRegretColor(transaction.regret)}`}>
                    {transaction.regret}/10
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Emotional Wellness Tips -->
    <div class="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800" use:motionInView>
      <div class="flex items-start gap-4">
        <div class="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
          <Icon icon="heroicons:sparkles" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Emotional Wellness Tips</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Mindful Spending</h4>
              <p class="text-gray-600 dark:text-gray-300">Pause before purchases and ask: "Does this align with my values?"</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Alternative Coping</h4>
              <p class="text-gray-600 dark:text-gray-300">Try walking, meditation, or talking to friends instead of retail therapy</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Gratitude Practice</h4>
              <p class="text-gray-600 dark:text-gray-300">Focus on what you have rather than what you want to buy</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Value Alignment</h4>
              <p class="text-gray-600 dark:text-gray-300">Ensure purchases reflect your personal values and long-term goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>