<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import StudyPlanner from "../components/StudyPlanner.svelte";
  import ExamTracker from "../components/ExamTracker.svelte";
  import { db } from "../data/database.js";

  let currentTab = "study-planner";
  const tabs = [
    { id: "study-planner", label: "Study Planner", icon: "heroicons:calendar-days" },
    { id: "exam-tracker", label: "Exam Tracker", icon: "heroicons:clipboard-document-check" },
    { id: "progress", label: "Progress Analytics", icon: "heroicons:chart-bar" },
    { id: "achievements", label: "Achievements", icon: "heroicons:trophy" },
  ];

  let studyStats = {
    totalHours: 0,
    completedGoals: 0,
    upcomingExams: 0,
    averageScore: 0,
  };

  let achievements = [
    {
      id: 1,
      title: "श्रद्धावान् लभते ज्ञानम्",
      subtitle: "Knowledge Seeker",
      description: "Completed 100 hours of study",
      earned: true,
      date: "2024-09-15",
      icon: "heroicons:book-open",
      color: "text-yellow-500",
    },
    {
      id: 2,
      title: "गुरुर्ब्रह्मा गुरुर्विष्णुः",
      subtitle: "Devoted Student",
      description: "Perfect attendance for 30 days",
      earned: true,
      date: "2024-08-20",
      icon: "heroicons:academic-cap",
      color: "text-blue-500",
    },
    {
      id: 3,
      title: "विद्या ददाति विनयम्",
      subtitle: "Excellence Award",
      description: "Scored above 90% in all subjects",
      earned: false,
      date: null,
      icon: "heroicons:star",
      color: "text-purple-500",
    },
    {
      id: 4,
      title: "कर्मण्येवाधिकारस्ते",
      subtitle: "Consistent Performer",
      description: "Maintained study streak for 50 days",
      earned: false,
      date: null,
      icon: "heroicons:fire",
      color: "text-orange-500",
    },
  ];

  let motivationalQuotes = [
    {
      sanskrit: "अहिंसा परमो धर्मः",
      english: "Non-violence is the highest virtue",
      tamil: "அஹிம்சை பரமோ தர்ம:",
      context: "Study with compassion and patience",
    },
    {
      sanskrit: "सत्यमेव जयते",
      english: "Truth alone triumphs",
      tamil: "சத்யமேவ ஜயதே",
      context: "Honesty in learning leads to success",
    },
    {
      sanskrit: "श्रमेण सर्वमिच्छति",
      english: "Everything is achieved through effort",
      tamil: "ஸ்ரமேண சர்வமிச்சதி",
      context: "Hard work brings knowledge",
    },
  ];

  let currentQuote = motivationalQuotes[0];

  async function loadStudyStats() {
    try {
      // Load study statistics from database
      const exams = (await db.exams?.toArray()) || [];
      const studyPlans = (await db.studyPlans?.toArray()) || [];

      studyStats = {
        totalHours: studyPlans.reduce((sum, plan) => sum + (plan.hoursStudied || 0), 0),
        completedGoals: studyPlans.filter((plan) => plan.completed).length,
        upcomingExams: exams.filter((exam) => new Date(exam.date) > new Date()).length,
        averageScore: exams.length > 0 ? exams.reduce((sum, exam) => sum + (exam.score || 0), 0) / exams.length : 0,
      };
    } catch (error) {
      console.error("Error loading study stats:", error);
    }
  }

  function changeQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    currentQuote = motivationalQuotes[randomIndex];
  }

  onMount(() => {
    document.title = "Studies & Exams - Family App";
    loadStudyStats();

    // Change quote every 30 seconds
    const quoteInterval = setInterval(changeQuote, 30000);
    return () => clearInterval(quoteInterval);
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
  <div class="container mx-auto px-4 py-8">
    <!-- Header with Motivational Quote -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-6">
        <div class="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
          <Icon icon="heroicons:academic-cap" class="w-8 h-8" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Studies & Exams</h1>
          <p class="text-gray-600 dark:text-gray-300">Track your learning journey with wisdom</p>
        </div>
      </div>

      <!-- Daily Inspiration Card -->
      <div class="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white mb-6">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-2">दैनिक प्रेरणा | Daily Inspiration</h3>
            <p class="text-lg font-semibold mb-1">{currentQuote.sanskrit}</p>
            <p class="text-sm opacity-90 mb-1">{currentQuote.english}</p>
            <p class="text-sm opacity-80 mb-2">{currentQuote.tamil}</p>
            <p class="text-xs opacity-70 italic">{currentQuote.context}</p>
          </div>
          <button class="ml-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors" on:click={changeQuote}>
            <Icon icon="heroicons:arrow-path" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Study Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">
          <Icon icon="heroicons:clock" class="w-8 h-8 mx-auto text-blue-500 mb-2" />
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{studyStats.totalHours}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Study Hours</p>
        </div>
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">
          <Icon icon="heroicons:check-circle" class="w-8 h-8 mx-auto text-green-500 mb-2" />
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{studyStats.completedGoals}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</p>
        </div>
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">
          <Icon icon="heroicons:calendar" class="w-8 h-8 mx-auto text-orange-500 mb-2" />
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{studyStats.upcomingExams}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Upcoming Exams</p>
        </div>
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 text-center">
          <Icon icon="heroicons:star" class="w-8 h-8 mx-auto text-yellow-500 mb-2" />
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{studyStats.averageScore.toFixed(1)}%</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tabs as tab}
        <button class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {currentTab === tab.id ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/20'}" on:click={() => (currentTab = tab.id)}>
          <Icon icon={tab.icon} class="w-4 h-4" />
          <span class="font-medium">{tab.label}</span>
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      {#if currentTab === "study-planner"}
        <StudyPlanner />
      {:else if currentTab === "exam-tracker"}
        <ExamTracker />
      {:else if currentTab === "progress"}
        <div class="text-center py-12">
          <Icon icon="heroicons:chart-bar" class="w-16 h-16 mx-auto text-indigo-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Progress Analytics</h3>
          <p class="text-gray-500 dark:text-gray-400">Visual insights into your study patterns and improvements</p>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
              <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Weekly Study Trend</h4>
              <p class="text-sm text-blue-600 dark:text-blue-300">📈 Consistent improvement in focus time</p>
            </div>
            <div class="p-6 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Subject Performance</h4>
              <p class="text-sm text-green-600 dark:text-green-300">🎯 Mathematics showing strongest growth</p>
            </div>
          </div>
        </div>
      {:else if currentTab === "achievements"}
        <div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">🏆 Academic Achievements</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each achievements as achievement}
              <div class="relative p-6 border-2 rounded-xl transition-all duration-300 {achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-600' : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600'} hover:shadow-lg">
                {#if achievement.earned}
                  <div class="absolute top-2 right-2">
                    <Icon icon="heroicons:check-badge" class="w-6 h-6 text-green-500" />
                  </div>
                {/if}

                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-white rounded-full shadow-md">
                    <Icon icon={achievement.icon} class="w-6 h-6 {achievement.color}" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-1">{achievement.title}</h4>
                    <h5 class="font-semibold text-sm text-indigo-600 dark:text-indigo-400 mb-2">{achievement.subtitle}</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                    {#if achievement.earned && achievement.date}
                      <p class="text-xs text-green-600 dark:text-green-400">
                        <Icon icon="heroicons:calendar" class="w-3 h-3 inline mr-1" />
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    {:else}
                      <p class="text-xs text-gray-500 dark:text-gray-500">
                        <Icon icon="heroicons:lock-closed" class="w-3 h-3 inline mr-1" />
                        Not yet achieved
                      </p>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Sanskrit Wisdom Section -->
          <div class="mt-8 p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
            <h4 class="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center">
              <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-2" />
              शास्त्रीय ज्ञान | Classical Wisdom
            </h4>
            <div class="space-y-3">
              <blockquote class="italic text-amber-700 dark:text-amber-300">
                "अध्ययनं अध्यापनं च तपस्तप्यति यो नरः।<br />
                स एव लोके पूज्यते स एव गुरुरुच्यते॥"
              </blockquote>
              <p class="text-sm text-amber-600 dark:text-amber-400">"One who studies, teaches, and practices discipline is honored in the world and called a teacher."</p>
              <p class="text-xs text-amber-500 dark:text-amber-500">Tamil: "கற்பித்து, கற்று, தவம் செய்பவன் உலகில் மதிக்கப்படுகிறான்"</p>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
