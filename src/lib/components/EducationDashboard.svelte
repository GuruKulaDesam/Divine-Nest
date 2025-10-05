<script>
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { _ } from "svelte-i18n";

  import StudyPlanner from "./StudyPlanner.svelte";
  import LibraryManager from "./LibraryManager.svelte";
  import ExamTracker from "./ExamTracker.svelte";

  import { initializeEducationData, getEducationStats, getStudyPlans, getBooks, getExams } from "../data/education.js";

  let activeTab = "overview";
  let stats = {};
  let recentPlans = [];
  let recentBooks = [];
  let upcomingExams = [];

  onMount(async () => {
    await initializeEducationData();
    await loadDashboardData();
  });

  async function loadDashboardData() {
    try {
      stats = await getEducationStats();
      recentPlans = await getStudyPlans();
      recentBooks = await getBooks();
      const allExams = await getExams();
      upcomingExams = allExams
        .filter((exam) => exam.date > new Date())
        .sort((a, b) => a.date - b.date)
        .slice(0, 3);
    } catch (error) {
      console.error("Error loading education dashboard data:", error);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getProgressColor(progress) {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    if (progress >= 40) return "bg-orange-500";
    return "bg-red-500";
  }

  function getCategoryIcon(category) {
    const icons = {
      spiritual: "heroicons:sparkles",
      comics: "heroicons:face-smile",
      historical: "heroicons:clock",
      mythics: "heroicons:star",
      mystics: "heroicons:eye",
      academic: "heroicons:academic-cap",
    };
    return icons[category] || "heroicons:book-open";
  }

  function getCategoryColor(category) {
    const colors = {
      spiritual: "text-purple-500",
      comics: "text-pink-500",
      historical: "text-amber-500",
      mythics: "text-indigo-500",
      mystics: "text-cyan-500",
      academic: "text-green-500",
    };
    return colors[category] || "text-gray-500";
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8" in:fade={{ duration: 500 }}>
      <h1 class="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
        <Icon icon="heroicons:academic-cap" class="text-indigo-600" />
        🎓 Education & Learning Dashboard
      </h1>
      <p class="text-gray-600 text-lg">Track studies, manage library, and prepare for exams</p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8" in:slide={{ duration: 400 }}>
      <div class="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-lg border border-gray-100">
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'overview' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "overview")}>
          <Icon icon="heroicons:home" class="text-lg" />
          Overview
        </button>
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'study' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "study")}>
          <Icon icon="heroicons:clipboard-document-list" class="text-lg" />
          Study Plans
        </button>
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'library' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "library")}>
          <Icon icon="heroicons:book-open" class="text-lg" />
          Library
        </button>
        <button class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'exams' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}" on:click={() => (activeTab = "exams")}>
          <Icon icon="heroicons:document-check" class="text-lg" />
          Exams
        </button>
      </div>
    </div>

    <!-- Overview Tab -->
    {#if activeTab === "overview"}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Stats Cards -->
        <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:book-open" class="text-blue-500 text-2xl" />
              <span class="text-2xl font-bold text-blue-600">{stats.totalBooks || 0}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Total Books</h3>
            <p class="text-xs text-gray-500 mt-1">In family library</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:clipboard-document-list" class="text-green-500 text-2xl" />
              <span class="text-2xl font-bold text-green-600">{stats.studyPlans || 0}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Study Plans</h3>
            <p class="text-xs text-gray-500 mt-1">Active plans</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:document-check" class="text-orange-500 text-2xl" />
              <span class="text-2xl font-bold text-orange-600">{stats.upcomingExams || 0}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Upcoming Exams</h3>
            <p class="text-xs text-gray-500 mt-1">This month</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div class="flex items-center justify-between mb-4">
              <Icon icon="heroicons:star" class="text-purple-500 text-2xl" />
              <span class="text-2xl font-bold text-purple-600">{stats.avgBookRating ? stats.avgBookRating.toFixed(1) : "0.0"}</span>
            </div>
            <h3 class="text-sm font-medium text-gray-600">Avg Rating</h3>
            <p class="text-xs text-gray-500 mt-1">Book reviews</p>
          </div>
        </div>

        <!-- Progress Overview -->
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:chart-bar" class="text-indigo-500" />
            Study Progress
          </h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">Chapters Completed</span>
                <span class="font-medium">{stats.completedChapters || 0}/{stats.totalChapters || 0}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-indigo-500 h-2 rounded-full transition-all duration-300" style="width: {stats.totalChapters ? ((stats.completedChapters || 0) / stats.totalChapters) * 100 : 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">Books Reading</span>
                <span class="font-medium">{stats.booksReading || 0}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full transition-all duration-300" style="width: {stats.totalBooks ? ((stats.booksReading || 0) / stats.totalBooks) * 100 : 0}%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Study Plans -->
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:clipboard-document-list" class="text-blue-500" />
            Recent Study Plans
          </h3>
          <div class="space-y-3">
            {#each recentPlans.slice(0, 3) as plan}
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-800">{plan.subject}</h4>
                  <p class="text-sm text-gray-600">Due: {formatDate(plan.dueDate)}</p>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium text-gray-600">
                    {plan.completedChapters.length}/{plan.chapters.length} chapters
                  </div>
                  <div class="w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div class="bg-blue-500 h-1 rounded-full" style="width: {(plan.completedChapters.length / plan.chapters.length) * 100}%"></div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Library Overview -->
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:book-open" class="text-green-500" />
            Library Collection
          </h3>
          <div class="space-y-3">
            {#each recentBooks.slice(0, 4) as book}
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div class="p-2 bg-white rounded-lg">
                  <Icon icon={getCategoryIcon(book.category)} class="{getCategoryColor(book.category)} text-lg" />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800 text-sm">{book.title}</h4>
                  <p class="text-xs text-gray-600">{book.author}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="flex-1 bg-gray-200 rounded-full h-1">
                      <div class="{getProgressColor(book.progress)} h-1 rounded-full transition-all duration-300" style="width: {book.progress}%"></div>
                    </div>
                    <span class="text-xs text-gray-500">{book.progress}%</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Upcoming Exams -->
      {#if upcomingExams.length > 0}
        <div class="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:calendar-days" class="text-orange-500" />
            Upcoming Exams
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {#each upcomingExams as exam}
              <div class="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 class="font-medium text-gray-800">{exam.subject}</h4>
                <p class="text-sm text-orange-600 mb-2">{formatDate(exam.date)}</p>
                <div class="text-xs text-gray-600">
                  Prep: {exam.completedPrep.length}/{exam.prepChecklist.length} items
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/if}

    <!-- Study Plans Tab -->
    {#if activeTab === "study"}
      <StudyPlanner {loadDashboardData} />
    {/if}

    <!-- Library Tab -->
    {#if activeTab === "library"}
      <LibraryManager {loadDashboardData} />
    {/if}

    <!-- Exams Tab -->
    {#if activeTab === "exams"}
      <ExamTracker {loadDashboardData} />
    {/if}
  </div>
</div>
