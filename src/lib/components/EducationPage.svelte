<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  // Import education components (we'll create these)
  import StudentProfileCard from "../components/education/StudentProfileCard.svelte";
  import CurriculumTracker from "../components/education/CurriculumTracker.svelte";
  import StudyPlanner from "../components/education/StudyPlanner.svelte";
  import QuizGenerator from "../components/education/QuizGenerator.svelte";

  import { CurrentAcademicData, EducationSections, StudentProfiles, FamilyMentors, MotivationSystem } from "../data/educationData.js";

  let activeSection = "dashboard";
  let selectedStudent = "thambi";

  // Calculate current section info
  $: currentSection = EducationSections.find((s) => s.id === activeSection);

  // Handle URL-based section routing
  $: {
    const path = $page.url.pathname;
    if (path.startsWith("/education/")) {
      const section = path.split("/")[2];
      if (section && EducationSections.find((s) => s.id === section)) {
        activeSection = section;
      }
    }
  }

  function switchSection(sectionId) {
    activeSection = sectionId;
    window.history.pushState({}, "", `/education/${sectionId}`);
  }

  function switchStudent(studentId) {
    selectedStudent = studentId;
  }

  // Calculate overview stats
  let overviewStats = {
    totalStudents: Object.keys(StudentProfiles).length,
    activeStreaks: StudentProfiles.thambi.currentStreak + StudentProfiles.akka.currentStreak,
    totalStars: StudentProfiles.thambi.totalStars + StudentProfiles.akka.totalStars,
    totalBadges: StudentProfiles.thambi.badges.length + StudentProfiles.akka.badges.length,
    completedChapters: 0,
    totalChapters: 0,
  };

  // Calculate curriculum stats
  function calculateCurriculumStats() {
    let completed = 0;
    let total = 0;

    // Count Thambi's progress (Class 6)
    Object.values(CurrentAcademicData.class6).forEach((subject) => {
      total += subject.chapters.length;
      completed += subject.chapters.filter((ch) => ch.status === "completed").length;
    });

    // Count Akka's progress (Class 11)
    Object.values(CurrentAcademicData.class11).forEach((subject) => {
      total += subject.chapters.length;
      completed += subject.chapters.filter((ch) => ch.status === "completed").length;
    });

    overviewStats.completedChapters = completed;
    overviewStats.totalChapters = total;
  }

  onMount(() => {
    calculateCurriculumStats();
  });
</script>

<!-- Education & Learning Suite Header -->
<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="bg-blue-100 p-3 rounded-lg">
            <Icon icon="heroicons:academic-cap" class="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Education & Learning Suite</h1>
            <p class="text-lg text-gray-600">கல்வி மற்றும் கற்றல் தொகுப்பு</p>
            <p class="text-sm text-gray-500">Designed for South Indian CBSE families - Academic Year {CurrentAcademicData.year}</p>
          </div>
        </div>

        <!-- Student Selector -->
        <div class="flex space-x-2">
          {#each Object.entries(StudentProfiles) as [studentId, student]}
            <button on:click={() => switchStudent(studentId)} class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all {selectedStudent === studentId ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
              <Icon icon="heroicons:user-circle" class="w-5 h-5" />
              <span class="font-medium">{student.name}</span>
              <span class="text-sm opacity-75">({student.tamil})</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Quick Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Active Students</p>
              <p class="text-2xl font-bold">{overviewStats.totalStudents}</p>
              <p class="text-xs opacity-75">மாணவர்கள்</p>
            </div>
            <Icon icon="heroicons:user-group" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Study Streaks</p>
              <p class="text-2xl font-bold">{overviewStats.activeStreaks}</p>
              <p class="text-xs opacity-75">நாட்கள்</p>
            </div>
            <Icon icon="heroicons:fire" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Total Stars</p>
              <p class="text-2xl font-bold">{overviewStats.totalStars}</p>
              <p class="text-xs opacity-75">நட்சத்திரங்கள்</p>
            </div>
            <Icon icon="heroicons:star" class="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Progress</p>
              <p class="text-2xl font-bold">{overviewStats.completedChapters}/{overviewStats.totalChapters}</p>
              <p class="text-xs opacity-75">அத்தியாயங்கள்</p>
            </div>
            <Icon icon="heroicons:chart-bar" class="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon icon="heroicons:bars-3" class="w-5 h-5 mr-2" />
            Education Sections
            <span class="ml-2 text-sm text-gray-500">பிரிவுகள்</span>
          </h3>

          <nav class="space-y-2">
            {#each EducationSections as section}
              <button on:click={() => switchSection(section.id)} class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left {activeSection === section.id ? `bg-${section.color}-100 text-${section.color}-700 border-l-4 border-${section.color}-500` : 'text-gray-600 hover:bg-gray-50'}">
                <Icon icon={section.icon} class="w-5 h-5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{section.name}</p>
                  <p class="text-xs opacity-75 truncate">{section.tamil}</p>
                </div>
                {#if activeSection === section.id}
                  <Icon icon="heroicons:chevron-right" class="w-4 h-4" />
                {/if}
              </button>
            {/each}
          </nav>

          <!-- Family Mentors Quick Access -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Icon icon="heroicons:chat-bubble-left-right" class="w-4 h-4 mr-2" />
              Family Mentors
              <span class="ml-2 text-xs text-gray-500">வழிகாட்டிகள்</span>
            </h4>

            {#each Object.entries(FamilyMentors) as [mentorId, mentor]}
              <div class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{mentor.name[0]}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">{mentor.name}</p>
                  <p class="text-xs text-gray-500">{mentor.tamil}</p>
                </div>
                <Icon icon="heroicons:chat-bubble-bottom-center-text" class="w-4 h-4 text-gray-400" />
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-3">
        {#if activeSection === "dashboard"}
          <!-- Dashboard Overview -->
          <div class="space-y-6">
            <!-- Selected Student Profile -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              {#if selectedStudent}
                {@const student = StudentProfiles[selectedStudent]}
                <div class="flex items-start justify-between mb-6">
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Icon icon="heroicons:user" class="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold text-gray-900">{student.name} ({student.tamil})</h2>
                      <p class="text-lg text-gray-600">{student.grade}</p>
                      <div class="flex items-center space-x-4 mt-2">
                        <div class="flex items-center space-x-1">
                          <Icon icon="heroicons:fire" class="w-4 h-4 text-orange-500" />
                          <span class="text-sm text-gray-600">{student.currentStreak} day streak</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <Icon icon="heroicons:star" class="w-4 h-4 text-yellow-500" />
                          <span class="text-sm text-gray-600">{student.totalStars} stars</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="flex flex-wrap gap-2 justify-end mb-2">
                      {#each student.badges.slice(0, 3) as badge}
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{badge}</span>
                      {/each}
                      {#if student.badges.length > 3}
                        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+{student.badges.length - 3} more</span>
                      {/if}
                    </div>
                    <p class="text-sm text-gray-500">Age {student.age} • {student.achievements.length} achievements</p>
                  </div>
                </div>

                <!-- Quick Subject Overview -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {#each student.subjects.slice(0, 4) as subject}
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                      <Icon icon="heroicons:book-open" class="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <p class="text-sm font-medium text-gray-900">{subject}</p>
                      <p class="text-xs text-gray-500 mt-1">In Progress</p>
                    </div>
                  {/each}
                </div>

                <!-- Recent Achievement -->
                {#if student.achievements.length > 0}
                  {@const recentAchievement = student.achievements[student.achievements.length - 1]}
                  <div class="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center space-x-3">
                      <Icon icon="heroicons:trophy" class="w-6 h-6 text-green-600" />
                      <div>
                        <p class="font-medium text-green-900">Latest Achievement</p>
                        <p class="text-sm text-green-700">{recentAchievement.title} - {recentAchievement.position}</p>
                        <p class="text-xs text-green-600">{new Date(recentAchievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                {/if}
              {/if}
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button on:click={() => switchSection("planner")} class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left group">
                <div class="flex items-center justify-between mb-4">
                  <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-orange-500" />
                  <Icon icon="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Start Study Session</h3>
                <p class="text-sm text-gray-600">Plan today's learning schedule</p>
                <p class="text-xs text-gray-500 mt-1">படிப்பு திட்டம்</p>
              </button>

              <button on:click={() => switchSection("quiz")} class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left group">
                <div class="flex items-center justify-between mb-4">
                  <Icon icon="heroicons:puzzle-piece" class="w-8 h-8 text-pink-500" />
                  <Icon icon="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Take a Quiz</h3>
                <p class="text-sm text-gray-600">Practice with auto-generated questions</p>
                <p class="text-xs text-gray-500 mt-1">தானியங்கி வினாவிடை</p>
              </button>

              <button on:click={() => switchSection("curriculum")} class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left group">
                <div class="flex items-center justify-between mb-4">
                  <Icon icon="heroicons:book-open" class="w-8 h-8 text-purple-500" />
                  <Icon icon="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Track Progress</h3>
                <p class="text-sm text-gray-600">View curriculum completion</p>
                <p class="text-xs text-gray-500 mt-1">பாடத்திட்ட கண்காணிப்பு</p>
              </button>
            </div>
          </div>
        {:else if activeSection === "students"}
          <StudentProfileCard {selectedStudent} />
        {:else if activeSection === "curriculum"}
          <CurriculumTracker {selectedStudent} />
        {:else if activeSection === "planner"}
          <StudyPlanner {selectedStudent} />
        {:else if activeSection === "quiz"}
          <QuizGenerator {selectedStudent} />
        {:else}
          <!-- Placeholder for other sections -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="text-center py-12">
              <div class="text-6xl mb-4">
                <Icon icon={currentSection?.icon || "heroicons:cog"} class="w-16 h-16 mx-auto text-gray-400" />
              </div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">{currentSection?.name}</h2>
              <p class="text-gray-600 mb-1">{currentSection?.tamil}</p>
              <p class="text-gray-500 mb-6">{currentSection?.description}</p>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <p class="text-sm text-blue-800">
                  <strong>Coming Soon!</strong> This education section is being developed with Tamil-English interface and CBSE curriculum integration for South Indian families.
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
